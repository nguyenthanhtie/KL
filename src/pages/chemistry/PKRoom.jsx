import { useState, useEffect, useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { usePKRoom } from '../../contexts/PKRoomContext';
import { API_BASE_URL } from '../../config/api';
import './CSS/PKRoom.css';

// Import game components
import MultipleChoice from '../../components/games/MultipleChoice';
import TrueFalse from '../../components/games/TrueFalse';
import FillInBlank from '../../components/games/FillInBlank';
import Matching from '../../components/games/Matching';
import Ordering from '../../components/games/Ordering';
import DragDrop from '../../components/games/DragDrop';

const PKRoom = () => {
  const { user } = useAuth();
  const { joinRoom, leaveRoom } = usePKRoom();
  const navigate = useNavigate();
  const { roomCode } = useParams();
  
  const [room, setRoom] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [gameState, setGameState] = useState('waiting'); // waiting, playing, finished
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [timeLeft, setTimeLeft] = useState(30);
  const [showResult, setShowResult] = useState(false);
  const [answerResult, setAnswerResult] = useState(null);
  const [myScore, setMyScore] = useState(0);
  const [myCorrectAnswers, setMyCorrectAnswers] = useState(0);
  const [gameResults, setGameResults] = useState(null);
  const [answerStartTime, setAnswerStartTime] = useState(null);
  const [playersScores, setPlayersScores] = useState([]); // Realtime scores of all players
  
  // States for different game types
  const [userAnswer, setUserAnswer] = useState(null);
  const [matchingAnswers, setMatchingAnswers] = useState({});
  const [matchingPool, setMatchingPool] = useState([]);
  const [orderedItems, setOrderedItems] = useState([]);
  const [draggedIndex, setDraggedIndex] = useState(null);
  const [inlineSlots, setInlineSlots] = useState([]);
  const [inlineOptions, setInlineOptions] = useState([]);

  // Reset game state for new question
  const resetGameState = useCallback((question) => {
    setUserAnswer(null);
    setSelectedAnswer(null);
    setMatchingAnswers({});
    setDraggedIndex(null);
    
    if (question) {
      // Initialize based on question type
      if (question.type === 'matching' && question.pairs) {
        const pool = question.pairs.map(p => p.right).sort(() => Math.random() - 0.5);
        setMatchingPool(pool);
      }
      
      if (question.type === 'ordering' && question.correctOrder) {
        const shuffled = [...question.correctOrder].sort(() => Math.random() - 0.5);
        setOrderedItems(shuffled);
      }
      
      if (question.type === 'drag-drop' && question.inline && question.slots) {
        setInlineSlots(question.slots.map(s => ({ ...s, value: null })));
        setInlineOptions([...question.options].sort(() => Math.random() - 0.5));
      }
    }
  }, []);

  // Fetch room data
  const fetchRoom = useCallback(async (currentGameState) => {
    try {
      const response = await fetch(`${API_BASE_URL}/pk/${roomCode}`);
      if (response.ok) {
        const data = await response.json();
        setRoom(data);
        
        // Lưu trạng thái phòng vào context để persist khi chuyển tab
        if (data.status !== 'finished') {
          joinRoom({ roomCode: data.roomCode || roomCode, status: data.status });
        }
        
        // Always update to finished state when room is finished
        if (data.status === 'finished') {
          // Xóa trạng thái phòng khi game kết thúc
          leaveRoom();
          // If was waiting for others, reload the page to show results
          if (currentGameState === 'waiting-others') {
            window.location.reload();
            return;
          }
          setGameState('finished');
          setGameResults(data.results);
          return;
        }
        
        // Only update gameState if not in waiting-others state (to preserve it)
        if (currentGameState !== 'waiting-others') {
          setGameState(data.status);
        }
        
        if (data.status === 'playing' && data.questions && currentGameState !== 'waiting-others') {
          setTimeLeft(data.timePerQuestion);
          setAnswerStartTime(Date.now());
        }
      } else {
        const data = await response.json();
        setError(data.message || 'Không tìm thấy phòng');
        // Xóa trạng thái phòng nếu phòng không còn tồn tại
        leaveRoom();
      }
    } catch (err) {
      setError('Lỗi kết nối server');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [roomCode, joinRoom, leaveRoom]);

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
    fetchRoom(gameState);

    // Poll for updates - faster when waiting for others
    const interval = setInterval(() => {
      if (gameState === 'waiting') {
        fetchRoom(gameState);
      } else if (gameState === 'waiting-others') {
        // Poll faster when waiting for others to finish
        fetchRoom(gameState);
      }
    }, gameState === 'waiting-others' ? 1000 : 2000);

    return () => clearInterval(interval);
  }, [user, navigate, fetchRoom, gameState]);

  // Poll for realtime scores during gameplay
  useEffect(() => {
    if (gameState !== 'playing') return;

    const fetchScores = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/pk/${roomCode}/scores`);
        if (response.ok) {
          const data = await response.json();
          setPlayersScores(data.players);
        }
      } catch (err) {
        console.error('Error fetching scores:', err);
      }
    };

    // Fetch immediately
    fetchScores();

    // Poll every 1.5 seconds
    const interval = setInterval(fetchScores, 1500);

    return () => clearInterval(interval);
  }, [gameState, roomCode]);

  // Timer countdown
  useEffect(() => {
    if (gameState !== 'playing' || showResult) return;

    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          handleTimeUp();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [gameState, showResult, currentQuestion]);

  const handleTimeUp = async () => {
    if (gameState !== 'playing') return;
    if (selectedAnswer === null && !showResult) {
      // Auto submit wrong answer if time runs out
      await submitAnswer(-1);
    }
  };

  const handleReady = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/pk/${roomCode}/ready`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: user._id || user.id,
          isReady: true
        })
      });

      if (response.ok) {
        fetchRoom();
      }
    } catch (err) {
      console.error('Error updating ready status:', err);
    }
  };

  const handleStartGame = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/pk/${roomCode}/start`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: user._id || user.id })
      });

      const data = await response.json();
      
      if (response.ok) {
        setRoom(data.room);
        setGameState('playing');
        setTimeLeft(data.room.timePerQuestion);
        setAnswerStartTime(Date.now());
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError('Lỗi bắt đầu trận đấu');
      console.error(err);
    }
  };

  const submitAnswer = async (answer) => {
    // Don't submit if game is not playing
    if (gameState !== 'playing') return;
    
    const timeTaken = Math.floor((Date.now() - answerStartTime) / 1000);
    
    try {
      const response = await fetch(`${API_BASE_URL}/pk/${roomCode}/answer`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: user._id || user.id,
          questionIndex: currentQuestion,
          answer,
          timeTaken
        })
      });

      // If room is finished or not found, stop trying
      if (response.status === 404) {
        console.log('Game already finished or room not found');
        return;
      }

      const data = await response.json();
      
      if (response.ok) {
        setAnswerResult(data);
        setMyScore(data.playerScore);
        setMyCorrectAnswers(data.playerCorrectAnswers);
        setShowResult(true);

        // Move to next question after 3 seconds
        setTimeout(() => {
          // Check again if game is still playing
          if (gameState !== 'playing') return;
          
          if (currentQuestion < room.questions.length - 1) {
            const nextQuestion = room.questions[currentQuestion + 1];
            setCurrentQuestion(prev => prev + 1);
            setSelectedAnswer(null);
            setShowResult(false);
            setAnswerResult(null);
            setTimeLeft(room.timePerQuestion);
            setAnswerStartTime(Date.now());
            resetGameState(nextQuestion);
          } else {
            finishGame();
          }
        }, 3000);
      }
    } catch (err) {
      console.error('Error submitting answer:', err);
    }
  };

  const handleSelectAnswer = (answerIndex) => {
    if (selectedAnswer !== null || showResult) return;
    setSelectedAnswer(answerIndex);
    submitAnswer(answerIndex);
  };

  // Handler for different game types
  const handleGameAnswer = (answer) => {
    if (showResult) return;
    setUserAnswer(answer);
  };

  // Submit answer for various game types
  const handleSubmitGameAnswer = () => {
    if (showResult || userAnswer === null) return;
    submitAnswer(userAnswer);
  };

  // Matching game handlers
  const handleMatchingDragStart = (e, item) => {
    e.dataTransfer.setData('text/plain', item);
  };

  const handleMatchingDropToLeft = (leftItem, e) => {
    e.preventDefault();
    const draggedItem = e.dataTransfer.getData('text/plain');
    setMatchingAnswers(prev => ({ ...prev, [leftItem]: draggedItem }));
    setMatchingPool(prev => prev.filter(item => item !== draggedItem));
  };

  const handleMatchingDragOver = (e) => {
    e.preventDefault();
  };

  const handleMatchingRemove = (leftItem) => {
    const removedItem = matchingAnswers[leftItem];
    setMatchingAnswers(prev => {
      const newAnswers = { ...prev };
      delete newAnswers[leftItem];
      return newAnswers;
    });
    setMatchingPool(prev => [...prev, removedItem]);
  };

  // Check if matching is complete
  const isMatchingComplete = useCallback(() => {
    const question = room?.questions?.[currentQuestion];
    if (!question || question.type !== 'matching') return false;
    return question.pairs?.length === Object.keys(matchingAnswers).length;
  }, [room, currentQuestion, matchingAnswers]);

  // Ordering game handlers
  const handleOrderingDragStart = (index) => {
    setDraggedIndex(index);
  };

  const handleOrderingDragOver = (e) => {
    e.preventDefault();
  };

  const handleOrderingDrop = (dropIndex) => {
    if (draggedIndex === null) return;
    const newItems = [...orderedItems];
    const [draggedItem] = newItems.splice(draggedIndex, 1);
    newItems.splice(dropIndex, 0, draggedItem);
    setOrderedItems(newItems);
    setDraggedIndex(null);
  };

  // Inline drag-drop handlers
  const handleInlineDragStart = (e, item) => {
    e.dataTransfer.setData('text/plain', item);
  };

  const handleInlineDropToSlot = (slotId, e) => {
    e.preventDefault();
    const item = e.dataTransfer.getData('text/plain');
    setInlineSlots(prev => prev.map(s => s.id === slotId ? { ...s, value: item } : s));
    setInlineOptions(prev => prev.filter(o => o !== item));
  };

  const handleInlineDragOver = (e) => {
    e.preventDefault();
  };

  const handleInlineRemove = (slotId) => {
    const slot = inlineSlots.find(s => s.id === slotId);
    if (slot?.value) {
      setInlineOptions(prev => [...prev, slot.value]);
      setInlineSlots(prev => prev.map(s => s.id === slotId ? { ...s, value: null } : s));
    }
  };

  // Submit matching/ordering answers
  const submitMatchingAnswer = () => {
    if (showResult) return;
    submitAnswer(matchingAnswers);
  };

  const submitOrderingAnswer = () => {
    if (showResult) return;
    submitAnswer(orderedItems);
  };

  const submitInlineAnswer = () => {
    if (showResult) return;
    const answer = inlineSlots.reduce((acc, slot) => {
      acc[slot.id] = slot.value;
      return acc;
    }, {});
    submitAnswer(answer);
  };

  const finishGame = async () => {
    try {
      // Mark this player as finished
      const response = await fetch(`${API_BASE_URL}/pk/${roomCode}/player-finish`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: user._id || user.id })
      });

      const data = await response.json();
      
      if (response.ok) {
        if (data.allFinished) {
          // All players finished, reload to show fresh results for everyone
          window.location.reload();
        } else {
          // Waiting for other players
          setGameState('waiting-others');
        }
      }
    } catch (err) {
      console.error('Error finishing game:', err);
    }
  };

  const handleLeaveRoom = async () => {
    try {
      await fetch(`${API_BASE_URL}/pk/${roomCode}/leave`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: user._id || user.id })
      });
    } catch (err) {
      console.error('Error leaving room:', err);
    }
    // Xóa trạng thái phòng khỏi context và localStorage
    leaveRoom();
    navigate('/chemistry/pk');
  };

  const copyRoomCode = () => {
    navigator.clipboard.writeText(roomCode);
    // Could add a toast notification here
  };

  if (loading) {
    return (
      <div className="pkroom-loading">
        <div className="pkroom-spinner"></div>
        <p>Đang tải phòng...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="pkroom-error">
        <span>❌</span>
        <h2>{error}</h2>
        <button onClick={() => navigate('/chemistry/pk')}>Quay lại</button>
      </div>
    );
  }

  if (!room) return null;

  const userId = user._id || user.id;
  const isHost = room.host.toString() === userId;
  const currentPlayer = room.players.find(p => p.userId?.toString() === userId || p.userId === userId);
  const allReady = room.players.length >= 2 && room.players.every(p => p.isReady);

  // Waiting state
  if (gameState === 'waiting') {
    return (
      <div className="pkroom-container">
        <div className="pkroom-waiting">
          <div className="pkroom-header">
            <button className="pkroom-leave-btn" onClick={handleLeaveRoom}>
              ← Rời phòng
            </button>
            <h1>{room.name}</h1>
            <div className="pkroom-code" onClick={copyRoomCode}>
              <span>Mã phòng:</span>
              <strong>{roomCode}</strong>
              <span className="pkroom-copy-icon">📋</span>
            </div>
          </div>

          <div className="pkroom-info">
            <div className="pkroom-info-item">
              <span>📚</span>
              <span>Lớp {room.grade}</span>
            </div>
            <div className="pkroom-info-item">
              <span>❓</span>
              <span>{room.questionCount} câu hỏi</span>
            </div>
            <div className="pkroom-info-item">
              <span>⏱️</span>
              <span>{room.timePerQuestion}s/câu</span>
            </div>
            <div className="pkroom-info-item">
              <span>🎮</span>
              <span>{room.mode === 'v1v1' ? '1 vs 1' : 'Nhiều người'}</span>
            </div>
          </div>

          <div className="pkroom-players">
            <h3>Người chơi ({room.players.length}/{room.maxPlayers})</h3>
            <div className="pkroom-player-list">
              {room.players.map((player, index) => (
                <div key={player.oderId || index} className={`pkroom-player ${player.isReady ? 'ready' : ''}`}>
                  <div className="pkroom-player-avatar">
                    {player.avatar ? (
                      <img src={player.avatar} alt={player.odername} />
                    ) : (
                      <span>{player.odername?.charAt(0) || '?'}</span>
                    )}
                  </div>
                  <div className="pkroom-player-info">
                    <span className="pkroom-player-name">
                      {player.odername}
                      {player.oderId?.toString() === room.host.toString() && (
                        <span className="pkroom-host-badge">👑 Host</span>
                      )}
                    </span>
                    <span className={`pkroom-player-status ${player.isReady ? 'ready' : ''}`}>
                      {player.isReady ? '✅ Sẵn sàng' : '⏳ Đang chờ'}
                    </span>
                  </div>
                </div>
              ))}

              {/* Empty slots */}
              {Array.from({ length: room.maxPlayers - room.players.length }).map((_, index) => (
                <div key={`empty-${index}`} className="pkroom-player empty">
                  <div className="pkroom-player-avatar empty">
                    <span>?</span>
                  </div>
                  <div className="pkroom-player-info">
                    <span className="pkroom-player-name">Đang chờ...</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="pkroom-actions">
            {!currentPlayer?.isReady && (
              <button className="pkroom-ready-btn" onClick={handleReady}>
                ✋ Sẵn sàng
              </button>
            )}
            
            {isHost && (
              <button 
                className="pkroom-start-btn"
                onClick={handleStartGame}
                disabled={!allReady || room.players.length < 2}
              >
                {room.players.length < 2 
                  ? '⏳ Chờ thêm người chơi...'
                  : !allReady 
                    ? '⏳ Chờ mọi người sẵn sàng...'
                    : '🚀 Bắt đầu trận đấu!'}
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  // Playing state
  if (gameState === 'playing' && room.questions) {
    const question = room.questions[currentQuestion];
    const questionType = question.type || 'multiple-choice';
    
    // Render game component based on type
    const renderGameComponent = () => {
      switch (questionType) {
        case 'multiple-choice':
          return (
            <div className="pkroom-options">
              {question.options.map((option, index) => (
                <button
                  key={index}
                  className={`pkroom-option ${
                    selectedAnswer === index ? 'selected' : ''
                  } ${
                    showResult && index === question.correctAnswer ? 'correct' : ''
                  } ${
                    showResult && selectedAnswer === index && selectedAnswer !== question.correctAnswer ? 'wrong' : ''
                  }`}
                  onClick={() => handleSelectAnswer(index)}
                  disabled={selectedAnswer !== null}
                >
                  <span className="pkroom-option-letter">
                    {String.fromCharCode(65 + index)}
                  </span>
                  <span className="pkroom-option-text">{option}</span>
                </button>
              ))}
            </div>
          );

        case 'true-false':
          return (
            <div className="pkroom-game-wrapper">
              <TrueFalse
                quiz={question}
                userAnswer={userAnswer}
                isAnswered={showResult}
                onAnswer={(answer) => {
                  setUserAnswer(answer);
                  submitAnswer(answer);
                }}
              />
            </div>
          );

        case 'fill-in-blank':
          return (
            <div className="pkroom-game-wrapper">
              <FillInBlank
                quiz={question}
                userAnswer={userAnswer}
                isAnswered={showResult}
                onAnswer={setUserAnswer}
              />
              {!showResult && userAnswer && (
                <button 
                  className="pkroom-submit-btn"
                  onClick={() => submitAnswer(userAnswer)}
                >
                  Xác nhận
                </button>
              )}
            </div>
          );

        case 'matching':
          return (
            <div className="pkroom-game-wrapper">
              <Matching
                quiz={question}
                isAnswered={showResult}
                matchingAnswers={matchingAnswers}
                matchingPool={matchingPool}
                onDragStart={handleMatchingDragStart}
                onDropToLeft={handleMatchingDropToLeft}
                onDragOverLeft={handleMatchingDragOver}
                onRemoveAssigned={handleMatchingRemove}
              />
              {!showResult && isMatchingComplete() && (
                <button 
                  className="pkroom-submit-btn"
                  onClick={submitMatchingAnswer}
                >
                  Xác nhận
                </button>
              )}
            </div>
          );

        case 'ordering':
          return (
            <div className="pkroom-game-wrapper">
              <Ordering
                quiz={question}
                orderedItems={orderedItems}
                isAnswered={showResult}
                onDragStart={handleOrderingDragStart}
                onDragOver={handleOrderingDragOver}
                onDrop={handleOrderingDrop}
              />
              {!showResult && orderedItems.length > 0 && (
                <button 
                  className="pkroom-submit-btn"
                  onClick={submitOrderingAnswer}
                >
                  Xác nhận
                </button>
              )}
            </div>
          );

        case 'drag-drop':
          return (
            <div className="pkroom-game-wrapper">
              <DragDrop
                quiz={question}
                isAnswered={showResult}
                matchingAnswers={matchingAnswers}
                inlineSlots={inlineSlots}
                inlineOptions={inlineOptions}
                onDragStartOption={handleMatchingDragStart}
                onDropToLeft={handleMatchingDropToLeft}
                onDragOverLeft={handleMatchingDragOver}
                onRemoveAssigned={handleMatchingRemove}
                onDragStartInline={handleInlineDragStart}
                onDropToSlot={handleInlineDropToSlot}
                onDragOverSlot={handleInlineDragOver}
                onRemoveInlineAssigned={handleInlineRemove}
              />
              {!showResult && (
                <button 
                  className="pkroom-submit-btn"
                  onClick={question.inline ? submitInlineAnswer : submitMatchingAnswer}
                >
                  Xác nhận
                </button>
              )}
            </div>
          );

        default:
          return (
            <div className="pkroom-options">
              {question.options?.map((option, index) => (
                <button
                  key={index}
                  className={`pkroom-option ${
                    selectedAnswer === index ? 'selected' : ''
                  } ${
                    showResult && index === question.correctAnswer ? 'correct' : ''
                  } ${
                    showResult && selectedAnswer === index && selectedAnswer !== question.correctAnswer ? 'wrong' : ''
                  }`}
                  onClick={() => handleSelectAnswer(index)}
                  disabled={selectedAnswer !== null}
                >
                  <span className="pkroom-option-letter">
                    {String.fromCharCode(65 + index)}
                  </span>
                  <span className="pkroom-option-text">{option}</span>
                </button>
              ))}
            </div>
          );
      }
    };

    // Get game type badge
    const getGameTypeBadge = () => {
      const types = {
        'multiple-choice': { label: 'Trắc nghiệm', icon: '📝', color: 'blue' },
        'true-false': { label: 'Đúng/Sai', icon: '✓✗', color: 'green' },
        'fill-in-blank': { label: 'Điền khuyết', icon: '✏️', color: 'purple' },
        'matching': { label: 'Ghép đôi', icon: '🔗', color: 'orange' },
        'ordering': { label: 'Sắp xếp', icon: '📊', color: 'pink' },
        'drag-drop': { label: 'Kéo thả', icon: '🎯', color: 'cyan' }
      };
      return types[questionType] || types['multiple-choice'];
    };

    const typeBadge = getGameTypeBadge();
    
    return (
      <div className="pkroom-container">
        <div className="pkroom-playing">
          {/* Game Header */}
          <div className="pkroom-game-header">
            <div className="pkroom-progress">
              <span>Câu {currentQuestion + 1}/{room.questions.length}</span>
              <div className="pkroom-progress-bar">
                <div 
                  className="pkroom-progress-fill"
                  style={{ width: `${((currentQuestion + 1) / room.questions.length) * 100}%` }}
                ></div>
              </div>
            </div>
            <div className={`pkroom-game-type-badge ${typeBadge.color}`}>
              <span>{typeBadge.icon}</span>
              <span>{typeBadge.label}</span>
            </div>
            <div className={`pkroom-timer ${timeLeft <= 5 ? 'warning' : ''}`}>
              <span>⏱️</span>
              <span>{timeLeft}s</span>
            </div>
            <div className="pkroom-score">
              <span>⭐</span>
              <span>{myScore} điểm</span>
            </div>
          </div>

          {/* Question */}
          <div className="pkroom-question-card">
            {/* Don't show question text for fill-in-blank as it's rendered inside the component */}
            {question.type !== 'fill-in-blank' && (
              <h2 className="pkroom-question-text">{question.question}</h2>
            )}
            
            {renderGameComponent()}

            {/* Result Overlay */}
            {showResult && answerResult && (
              <div className={`pkroom-result-overlay ${answerResult.isCorrect ? 'correct' : 'wrong'}`}>
                <div className="pkroom-result-icon">
                  {answerResult.isCorrect ? '✅' : '❌'}
                </div>
                <h3>{answerResult.isCorrect ? 'Chính xác!' : 'Sai rồi!'}</h3>
                <p>{answerResult.explanation}</p>
              </div>
            )}
          </div>

          {/* Live Scoreboard - Realtime */}
          <div className="pkroom-live-scores">
            {(playersScores.length > 0 ? playersScores : room.players).map((player, index) => {
              const isMe = player.oderId?.toString() === userId;
              const displayScore = isMe ? myScore : player.score;
              
              return (
                <div 
                  key={player.oderId || index} 
                  className={`pkroom-live-player ${isMe ? 'me' : ''} ${player.isFinished ? 'finished' : ''}`}
                >
                  <span className="pkroom-live-rank">#{index + 1}</span>
                  <span className="pkroom-live-name">
                    {player.odername}
                    {player.isFinished && <span className="pkroom-finished-badge">✓</span>}
                  </span>
                  <span className="pkroom-live-score">
                    {displayScore} ⭐
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  // Waiting for other players to finish
  if (gameState === 'waiting-others') {
    return (
      <div className="pkroom-container">
        <div className="pkroom-waiting-others">
          <div className="pkroom-waiting-others-content">
            <div className="pkroom-waiting-others-icon">✅</div>
            <h2>Bạn đã hoàn thành!</h2>
            <p>Đang chờ người chơi khác hoàn thành...</p>
            <div className="pkroom-waiting-others-spinner"></div>
            <div className="pkroom-waiting-others-score">
              <span>Điểm của bạn:</span>
              <strong>{myScore} ⭐</strong>
            </div>
            <div className="pkroom-waiting-others-correct">
              <span>Số câu đúng:</span>
              <strong>{myCorrectAnswers}/{room?.questions?.length || 0}</strong>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Finished state
  if (gameState === 'finished' && gameResults) {
    const myResult = gameResults.find(r => r.oderId?.toString() === userId);
    
    return (
      <div className="pkroom-container">
        <div className="pkroom-finished">
          <div className="pkroom-finish-header">
            <h1>🏆 Kết Quả Trận Đấu 🏆</h1>
          </div>

          {/* Podium for top 3 */}
          <div className="pkroom-podium">
            {gameResults.slice(0, 3).map((result, index) => (
              <div key={result.oderId} className={`pkroom-podium-place place-${index + 1}`}>
                <div className="pkroom-podium-crown">
                  {index === 0 ? '👑' : index === 1 ? '🥈' : '🥉'}
                </div>
                <div className="pkroom-podium-avatar">
                  <span>{result.odername?.charAt(0) || '?'}</span>
                </div>
                <div className="pkroom-podium-name">{result.odername}</div>
                <div className="pkroom-podium-score">{result.score} ⭐</div>
                <div className="pkroom-podium-correct">{result.correctAnswers}/{room.questionCount} đúng</div>
              </div>
            ))}
          </div>

          {/* Full Results */}
          <div className="pkroom-results-table">
            <h3>Bảng xếp hạng đầy đủ</h3>
            {gameResults.map((result, index) => (
              <div 
                key={result.oderId} 
                className={`pkroom-result-row ${result.oderId?.toString() === userId ? 'me' : ''}`}
              >
                <span className="pkroom-result-rank">#{result.rank}</span>
                <span className="pkroom-result-name">{result.odername}</span>
                <span className="pkroom-result-correct">{result.correctAnswers}/{room.questionCount}</span>
                <span className="pkroom-result-score">{result.score} ⭐</span>
              </div>
            ))}
          </div>

          {/* My Stats */}
          {myResult && (
            <div className="pkroom-my-stats">
              <h3>Thành tích của bạn</h3>
              <div className="pkroom-stats-grid">
                <div className="pkroom-stat">
                  <span className="pkroom-stat-value">#{myResult.rank}</span>
                  <span className="pkroom-stat-label">Xếp hạng</span>
                </div>
                <div className="pkroom-stat">
                  <span className="pkroom-stat-value">{myResult.score}</span>
                  <span className="pkroom-stat-label">Điểm số</span>
                </div>
                <div className="pkroom-stat">
                  <span className="pkroom-stat-value">{myResult.correctAnswers}/{room.questionCount}</span>
                  <span className="pkroom-stat-label">Trả lời đúng</span>
                </div>
                <div className="pkroom-stat">
                  <span className="pkroom-stat-value">+{myResult.xpGained || (10 + myResult.correctAnswers * 5 + (myResult.rank <= 3 ? 30 : 0) + (myResult.rank === 1 ? 50 : 0))}</span>
                  <span className="pkroom-stat-label">🎯 EXP nhiệm vụ</span>
                </div>
              </div>
            </div>
          )}

          <div className="pkroom-finish-actions">
            <button className="pkroom-new-game-btn" onClick={() => navigate('/chemistry/pk')}>
              🎮 Chơi tiếp
            </button>
            <button className="pkroom-home-btn" onClick={() => navigate('/chemistry')}>
              🏠 Về trang chủ
            </button>
          </div>
        </div>
      </div>
    );
  }

  return null;
};

export default PKRoom;
