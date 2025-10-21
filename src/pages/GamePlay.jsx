import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { API_URL } from '../config/api';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Modal from '../components/ui/Modal';

const GamePlay = () => {
  const { classId, chapterId, lessonId } = useParams();
  const navigate = useNavigate();
  
  const [lesson, setLesson] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const [currentQuizIndex, setCurrentQuizIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  
  // For matching quiz
  const [matchingAnswers, setMatchingAnswers] = useState({});
  const [matchingPool, setMatchingPool] = useState([]); // available right-side options to drag
  
  // For ordering quiz
  const [orderedItems, setOrderedItems] = useState([]);
  // For inline drag-drop (Duolingo-style)
  const [inlineSlots, setInlineSlots] = useState([]); // array of {id, label, correct, value}
  const [inlineOptions, setInlineOptions] = useState([]); // available draggable options
  
  useEffect(() => {
    fetchLesson();
  }, [classId, chapterId, lessonId]);

  const fetchLesson = async () => {
    try {
      setLoading(true);
      console.log('Fetching lesson:', { classId, chapterId, lessonId });
      const response = await axios.get(
        `${API_URL}/lessons/class/${classId}/chapter/${chapterId}/lesson/${lessonId}`
      );
      console.log('Lesson data:', response.data);
      setLesson(response.data);
      
      // Initialize first quiz state
      const firstQuiz = response.data.game?.quizzes?.[0];
      if (firstQuiz?.type === 'ordering') {
        const items = [...firstQuiz.options];
        setOrderedItems(shuffle(items));
      }
      if (firstQuiz?.type === 'matching') {
        const options = (firstQuiz.pairs || []).map(p => p.right);
        setMatchingPool(shuffle(options));
        setMatchingAnswers({});
      }
      // Initialize inline drag-drop if provided
      if (firstQuiz?.type === 'drag-drop' && firstQuiz?.inline) {
        // Create slots with empty values
        const slots = (firstQuiz.slots || []).map(s => ({ ...s, value: null }));
        setInlineSlots(slots);
        setInlineOptions(shuffle(firstQuiz.options || []));
      }
      
      setLoading(false);
    } catch (err) {
      console.error('Error fetching lesson:', err);
      setError(err.response?.data?.message || 'Không thể tải bài học');
      setLoading(false);
    }
  };

  const shuffle = (array) => {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
  };

  const currentQuiz = lesson?.game?.quizzes?.[currentQuizIndex];

  // Determine if the current quiz has sufficient input to allow checking
  const canCheck = (() => {
    if (!currentQuiz) return false;
    switch (currentQuiz.type) {
      case 'multiple-choice':
        return userAnswer !== null && userAnswer !== undefined;
      case 'true-false':
        // Accept both true and false; only disallow when null/undefined
        return userAnswer !== null && userAnswer !== undefined;
      case 'fill-in-blank':
        return (userAnswer ?? '').toString().trim().length > 0;
      case 'matching':
        return Array.isArray(currentQuiz.pairs) && Object.keys(matchingAnswers).length === currentQuiz.pairs.length;
      case 'ordering':
        return true; // Can always check ordering
      case 'drag-drop':
        // For drag-drop we require every item to be assigned (similar to matching)
        return Array.isArray(currentQuiz.pairs) && Object.keys(matchingAnswers).length === currentQuiz.pairs.length;
      default:
        return false;
    }
  })();

  useEffect(() => {
    console.log('Current quiz index:', currentQuizIndex);
    console.log('Current quiz:', currentQuiz);
    console.log('Total quizzes:', lesson?.game?.quizzes?.length);
  }, [currentQuizIndex, currentQuiz, lesson]);

  const handleMultipleChoice = (value) => {
    if (isAnswered) return;
    setUserAnswer(value);
  };

  const handleTrueFalse = (value) => {
     console.log('handleTrueFalse called with:', value, 'isAnswered:', isAnswered, 'currentAnswer:', userAnswer);
    if (isAnswered) return;
     // Allow changing answer before checking
     setUserAnswer(value);
  };

  const handleFillInBlank = (e) => {
    setUserAnswer(e.target.value);
  };

  const handleMatching = (left, right) => {
    setMatchingAnswers(prev => ({
      ...prev,
      [left]: right
    }));
  };

  const moveItem = (fromIndex, toIndex) => {
    const newItems = [...orderedItems];
    const [movedItem] = newItems.splice(fromIndex, 1);
    newItems.splice(toIndex, 0, movedItem);
    setOrderedItems(newItems);
  };

  // Drag and drop reorder for ordering quiz
  const [dragIndex, setDragIndex] = useState(null);
  const onDragStartOrder = (index) => setDragIndex(index);
  const onDragOverOrder = (e) => e.preventDefault();
  const onDropOrder = (index) => {
    if (dragIndex === null || dragIndex === index) return;
    moveItem(dragIndex, index);
    setDragIndex(null);
  };

  // Drag-and-drop handlers for matching quiz
  const onDragStartOption = (e, value) => {
    e.dataTransfer.setData('text/plain', value);
  };
  const onDropToLeft = (left, e) => {
    e.preventDefault();
    const value = e.dataTransfer.getData('text/plain');
    if (!value) return;
    if (matchingAnswers[left]) return;
    setMatchingAnswers(prev => ({ ...prev, [left]: value }));
    setMatchingPool(prev => prev.filter(v => v !== value));
  };
  const onDragOverLeft = (e) => e.preventDefault();
  const removeAssigned = (left) => {
    const value = matchingAnswers[left];
    if (!value) return;
    setMatchingPool(prev => [...prev, value]);
    setMatchingAnswers(prev => {
      const copy = { ...prev };
      delete copy[left];
      return copy;
    });
  };

  // Inline drag-drop handlers
  const onDragStartInline = (e, option) => {
    e.dataTransfer.setData('text/plain', option);
  };

  const onDropToSlot = (slotId, e) => {
    e.preventDefault();
    const value = e.dataTransfer.getData('text/plain');
    if (!value) return;
    // Prevent assigning if slot already filled
    setInlineSlots(prev => prev.map(s => s.id === slotId ? { ...s, value } : s));
    setInlineOptions(prev => {
      const idx = prev.indexOf(value);
      if (idx === -1) return prev;
      const copy = [...prev];
      copy.splice(idx, 1);
      return copy;
    });
  };

  const onDragOverSlot = (e) => e.preventDefault();

  const removeInlineAssigned = (slotId) => {
    setInlineSlots(prev => {
      const copy = prev.map(s => s.id === slotId ? { ...s, value: null } : s);
      const removed = prev.find(s => s.id === slotId)?.value;
      if (removed) setInlineOptions(prevOpts => [...prevOpts, removed]);
      return copy;
    });
  };

  const checkAnswer = () => {
    let isCorrect = false;
    
    switch (currentQuiz.type) {
      case 'multiple-choice':
        // Handle both index (number) and string comparison
        if (typeof currentQuiz.correctAnswer === 'number') {
          const correctOption = currentQuiz.options[currentQuiz.correctAnswer];
          isCorrect = userAnswer === correctOption;
        } else {
          isCorrect = userAnswer === currentQuiz.correctAnswer;
        }
        break;
        
      case 'true-false':
        isCorrect = userAnswer === currentQuiz.correctAnswer;
        break;
        
      case 'fill-in-blank':
        // Handle both string and numeric answers
        const userAnswerStr = userAnswer?.toString().trim().toLowerCase() ?? '';
        const correctAnswerStr = currentQuiz.correctAnswer?.toString().trim().toLowerCase() ?? '';
        isCorrect = userAnswerStr === correctAnswerStr;
        break;
        
      case 'matching':
        isCorrect = currentQuiz.pairs.every(pair => 
          matchingAnswers[pair.left] === pair.right
        );
        break;
        
      case 'ordering':
        isCorrect = orderedItems.every((item, index) => 
          item === currentQuiz.correctOrder[index]
        );
        break;
        
      case 'drag-drop':
        if (currentQuiz.inline) {
          // All slots must be filled and match the expected 'correct' value
          isCorrect = Array.isArray(inlineSlots) && inlineSlots.length > 0 && inlineSlots.every(s => s.value === s.correct);
        } else {
          // Evaluate drag-drop by checking every pair mapping (left -> assigned right)
          isCorrect = Array.isArray(currentQuiz.pairs) && currentQuiz.pairs.every(pair =>
            matchingAnswers[pair.left] === pair.right
          );
        }
        break;
    }
    
    if (isCorrect) {
      setScore(prev => prev + currentQuiz.points);
    }
    
    setIsAnswered(true);
  };

  const nextQuiz = () => {
    if (currentQuizIndex < lesson.game.quizzes.length - 1) {
      setCurrentQuizIndex(prev => prev + 1);
      setUserAnswer(null);
      setIsAnswered(false);
      setMatchingAnswers({});
      setMatchingPool([]);
      
      // Initialize next quiz if it's ordering type
      const nextQuiz = lesson.game.quizzes[currentQuizIndex + 1];
      if (nextQuiz.type === 'ordering') {
        setOrderedItems(shuffle([...nextQuiz.options]));
      }
      if (nextQuiz.type === 'matching') {
        const options = (nextQuiz.pairs || []).map(p => p.right);
        setMatchingPool(shuffle(options));
      }
      if (nextQuiz.type === 'drag-drop' && nextQuiz.inline) {
        setInlineSlots((nextQuiz.slots || []).map(s => ({ ...s, value: null })));
        setInlineOptions(shuffle(nextQuiz.options || []));
      }
    } else {
      setShowResult(true);
    }
  };

  const restartGame = () => {
    setCurrentQuizIndex(0);
    setUserAnswer(null);
    setIsAnswered(false);
    setScore(0);
    setShowResult(false);
    setMatchingAnswers({});
    setMatchingPool([]);
    if (lesson?.game?.quizzes?.[0]?.type === 'ordering') {
      setOrderedItems(shuffle([...lesson.game.quizzes[0].options]));
    }
    if (lesson?.game?.quizzes?.[0]?.type === 'matching') {
      const options = (lesson.game.quizzes[0].pairs || []).map(p => p.right);
      setMatchingPool(shuffle(options));
    }
    if (lesson?.game?.quizzes?.[0]?.type === 'drag-drop' && lesson.game.quizzes[0].inline) {
      setInlineSlots((lesson.game.quizzes[0].slots || []).map(s => ({ ...s, value: null })));
      setInlineOptions(shuffle(lesson.game.quizzes[0].options || []));
    }
  };

  if (loading) {
    return (
      <div style={{ padding: '40px', textAlign: 'center', backgroundColor: '#e3f2fd', minHeight: '100vh' }}>
        <h2>⏳ Đang tải trò chơi...</h2>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ padding: '40px', textAlign: 'center', backgroundColor: '#ffebee', minHeight: '100vh' }}>
        <h2 style={{ color: '#c62828' }}>❌ Lỗi: {error}</h2>
        <button onClick={() => navigate(-1)} style={{ marginTop: '20px', padding: '10px 20px' }}>
          Quay lại
        </button>
      </div>
    );
  }

  if (!currentQuiz) {
    return (
      <div style={{ padding: '40px', textAlign: 'center' }}>
        <h2>Không có câu hỏi nào</h2>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      {/* Header */}
      <div className="mb-6 flex justify-between items-center">
        <Button variant="outline" onClick={() => navigate(-1)}>
          ← Quay lại
        </Button>
        <div className="text-right">
          <div className="text-sm text-gray-600">
            Câu {currentQuizIndex + 1} / {lesson.game.quizzes.length}
          </div>
          <div className="text-xl font-bold text-blue-600">
            Điểm: {score} / {lesson.game.quizzes.reduce((sum, q) => sum + q.points, 0)}
          </div>
        </div>
      </div>

      {/* Quiz Card */}
      <Card className="p-6">
        <div className="mb-4">
          <span className="inline-block px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium mb-2">
            {currentQuiz.type === 'multiple-choice' && '🔷 Trắc nghiệm'}
            {currentQuiz.type === 'true-false' && '🧠 Đúng/Sai'}
            {currentQuiz.type === 'fill-in-blank' && '📝 Điền từ'}
            {currentQuiz.type === 'matching' && '🔗 Nối cặp'}
            {currentQuiz.type === 'ordering' && '📊 Sắp xếp'}
            {currentQuiz.type === 'drag-drop' && '🎯 Kéo thả'}
          </span>
          <span className="ml-2 text-gray-600">{currentQuiz.points} điểm</span>
        </div>

        <h3 className="text-xl font-bold mb-6">{currentQuiz.question}</h3>

        {/* Multiple Choice */}
        {currentQuiz.type === 'multiple-choice' && (
          <div className="space-y-3">
            {currentQuiz.options.map((option, index) => {
              const correctOption = typeof currentQuiz.correctAnswer === 'number' 
                ? currentQuiz.options[currentQuiz.correctAnswer]
                : currentQuiz.correctAnswer;
              
              return (
                <button
                  key={index}
                  onClick={() => handleMultipleChoice(option)}
                  disabled={isAnswered}
                  className={`w-full p-4 text-left border-2 rounded-lg transition-all ${
                    userAnswer === option
                      ? isAnswered
                        ? option === correctOption
                          ? 'border-green-500 bg-green-50'
                          : 'border-red-500 bg-red-50'
                        : 'border-blue-500 bg-blue-50'
                      : isAnswered && option === correctOption
                      ? 'border-green-500 bg-green-50'
                      : 'border-gray-300 hover:border-blue-300'
                  }`}
                >
                  {option}
                </button>
              );
            })}
          </div>
        )}

        {/* True/False */}
        {currentQuiz.type === 'true-false' && (
          <div className="flex gap-4 justify-center">
            <button
              onClick={() => handleTrueFalse(true)}
              disabled={isAnswered}
              className={`px-8 py-4 text-lg font-bold rounded-lg border-2 transition-all ${
                userAnswer === true
                  ? isAnswered
                    ? currentQuiz.correctAnswer === true
                      ? 'border-green-500 bg-green-500 text-white'
                      : 'border-red-500 bg-red-500 text-white'
                    : 'border-blue-500 bg-blue-500 text-white'
                  : isAnswered && currentQuiz.correctAnswer === true
                  ? 'border-green-500 bg-green-50 text-green-700'
                  : 'border-gray-300 hover:border-blue-300'
              }`}
            >
              ✓ Đúng
            </button>
            <button
              onClick={() => handleTrueFalse(false)}
              disabled={isAnswered}
              className={`px-8 py-4 text-lg font-bold rounded-lg border-2 transition-all ${
                userAnswer === false
                  ? isAnswered
                    ? currentQuiz.correctAnswer === false
                      ? 'border-green-500 bg-green-500 text-white'
                      : 'border-red-500 bg-red-500 text-white'
                    : 'border-blue-500 bg-blue-500 text-white'
                  : isAnswered && currentQuiz.correctAnswer === false
                  ? 'border-green-500 bg-green-50 text-green-700'
                  : 'border-gray-300 hover:border-blue-300'
              }`}
            >
              ✗ Sai
            </button>
          </div>
        )}

        {/* Fill in Blank */}
        {currentQuiz.type === 'fill-in-blank' && (
          <div>
            <input
              type="text"
              value={userAnswer || ''}
              onChange={handleFillInBlank}
              disabled={isAnswered}
              placeholder="Nhập câu trả lời của bạn..."
              className="w-full p-4 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
            />
            {isAnswered && (
              <div className={`mt-3 p-3 rounded ${
                userAnswer?.toString().trim().toLowerCase() === currentQuiz.correctAnswer?.toString().trim().toLowerCase()
                  ? 'bg-green-50 text-green-700'
                  : 'bg-red-50 text-red-700'
              }`}>
                Đáp án đúng: <strong>{currentQuiz.correctAnswer}</strong>
              </div>
            )}
            {currentQuiz.hint && !isAnswered && (
              <div className="mt-3 p-3 bg-yellow-50 text-yellow-800 rounded">
                💡 Gợi ý: {currentQuiz.hint}
              </div>
            )}
          </div>
        )}

  {/* Matching */}
        {currentQuiz.type === 'matching' && (
          <div className="space-y-6">
            {/* Targets */}
            {currentQuiz.pairs.map((pair, index) => (
              <div key={index} className="flex items-center gap-4">
                <div className="flex-1 p-3 bg-blue-50 border-2 border-blue-300 rounded">
                  {pair.left}
                </div>
                <div
                  onDrop={(e) => !isAnswered && onDropToLeft(pair.left, e)}
                  onDragOver={onDragOverLeft}
                  className={`flex-1 min-h-[48px] p-3 border-2 rounded flex items-center justify-between ${
                    matchingAnswers[pair.left]
                      ? 'border-green-400 bg-green-50'
                      : 'border-dashed border-gray-300 bg-white'
                  }`}
                >
                  <span>{matchingAnswers[pair.left] || 'Kéo đáp án vào đây'}</span>
                  {matchingAnswers[pair.left] && !isAnswered && (
                    <button onClick={() => removeAssigned(pair.left)} className="text-sm text-red-600">Bỏ</button>
                  )}
                </div>
                {isAnswered && (
                  <div className="text-2xl">
                    {matchingAnswers[pair.left] === pair.right ? '✓' : '✗'}
                  </div>
                )}
              </div>
            ))}

            {/* Pool */}
            {!isAnswered && (
              <div className="p-3 bg-gray-50 border-2 border-gray-200 rounded">
                <div className="text-sm text-gray-600 mb-2">Kéo các đáp án sau đến vị trí phù hợp:</div>
                <div className="flex flex-wrap gap-2">
                  {matchingPool.map((opt, i) => (
                    <div
                      key={i}
                      draggable
                      onDragStart={(e) => onDragStartOption(e, opt)}
                      className="px-3 py-2 bg-white border-2 border-gray-300 rounded cursor-move hover:border-blue-400"
                    >
                      {opt}
                    </div>
                  ))}
                  {matchingPool.length === 0 && (
                    <div className="text-gray-500 text-sm">Đã kéo hết đáp án.</div>
                  )}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Inline Drag-Drop (Duolingo-style) */}
        {currentQuiz.type === 'drag-drop' && currentQuiz.inline && (
          <div className="space-y-6">
            <div className="flex justify-center items-center gap-6">
              {inlineSlots.map(slot => (
                <div key={slot.id} className={`w-32 h-32 rounded-full flex items-center justify-center border-2 ${isAnswered ? 'opacity-80' : 'bg-white'}`}>
                  <div
                    onDrop={(e) => !isAnswered && onDropToSlot(slot.id, e)}
                    onDragOver={onDragOverSlot}
                    className="w-28 h-28 rounded-full flex items-center justify-center"
                    style={{ background: slot.value ? (slot.correct === slot.value ? '#f0fff4' : '#fff5f5') : '#f8fafc' }}
                  >
                    {slot.value ? (
                      <div className="text-lg font-bold">{slot.value}</div>
                    ) : (
                      <div className="text-sm text-gray-600">{slot.label}</div>
                    )}
                  </div>
                  {!isAnswered && slot.value && (
                    <button onClick={() => removeInlineAssigned(slot.id)} className="text-sm text-red-600 mt-2">Bỏ</button>
                  )}
                </div>
              ))}
            </div>

            {!isAnswered && (
              <div className="mt-4 flex justify-center gap-3 flex-wrap">
                {inlineOptions.map((opt, i) => (
                  <div
                    key={i}
                    draggable
                    onDragStart={(e) => onDragStartInline(e, opt)}
                    className="px-4 py-2 bg-white border rounded shadow cursor-move"
                  >
                    {opt}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Drag-Drop (interactive) */}
        {currentQuiz.type === 'drag-drop' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-semibold text-gray-700 mb-2">Các mục (Kéo)</h4>
                <div className="space-y-2">
                  {currentQuiz.pairs?.map((pair, index) => {
                    const assigned = Object.values(matchingAnswers).includes(pair.right) ? null : pair.left;
                    // show item if not yet assigned
                    return (
                      <div
                        key={`drag-${index}`}
                        draggable={!isAnswered}
                        onDragStart={(e) => onDragStartOption(e, pair.right)}
                        className={`p-3 bg-purple-50 border border-purple-200 rounded-lg cursor-move ${isAnswered ? 'opacity-60' : ''}`}
                      >
                        <span className="font-medium">🔸 {pair.left}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-gray-700 mb-2">Nhóm (Thả vào)</h4>
                <div className="space-y-2">
                  {currentQuiz.pairs?.map((pair, index) => (
                    <div
                      key={`target-${index}`}
                      onDrop={(e) => !isAnswered && onDropToLeft(pair.left, e)}
                      onDragOver={onDragOverLeft}
                      className={`p-3 rounded-lg border-2 min-h-[48px] flex items-center justify-between ${matchingAnswers[pair.left] ? 'border-green-400 bg-green-50' : 'border-dashed border-gray-300 bg-white'}`}
                    >
                      <span>{matchingAnswers[pair.left] || pair.right}</span>
                      {matchingAnswers[pair.left] && !isAnswered && (
                        <button onClick={() => removeAssigned(pair.left)} className="text-sm text-red-600">Bỏ</button>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
            {!isAnswered && (
              <div className="text-sm text-gray-600 italic text-center">Kéo từng mục từ cột trái vào nhóm phù hợp ở cột phải, sau đó nhấn "Kiểm tra đáp án"</div>
            )}
          </div>
        )}

        {/* Ordering */}
        {currentQuiz.type === 'ordering' && (
          <div className="space-y-4">
            <div className="text-sm text-gray-600">Kéo để sắp xếp theo thứ tự đúng từ trái sang phải:</div>
            {(() => {
              const gridTemplate = orderedItems
                .map((_, i) => (i < orderedItems.length - 1 ? '1fr auto' : '1fr'))
                .join(' ');
              return (
                <div className="grid items-start gap-2" style={{ gridTemplateColumns: gridTemplate }}>
                  {orderedItems.map((item, index) => {
                    const correctAtPos = isAnswered ? item === currentQuiz.correctOrder[index] : null;
                    return (
                      <>
                        <div
                          key={`item-${index}`}
                          draggable={!isAnswered}
                          onDragStart={() => onDragStartOrder(index)}
                          onDragOver={onDragOverOrder}
                          onDrop={() => onDropOrder(index)}
                          className={`min-w-0 max-w-[240px] px-3 py-2 rounded-lg border-2 bg-white cursor-move select-none shadow-sm text-sm leading-snug whitespace-normal break-words ${
                            isAnswered
                              ? correctAtPos
                                ? 'border-green-500 bg-green-50'
                                : 'border-red-500 bg-red-50'
                              : 'border-gray-300 hover:border-blue-400'
                          }`}
                        >
                          {item}
                        </div>
                        {index < orderedItems.length - 1 && (
                          <div key={`arrow-${index}`} className="self-center text-gray-400">→</div>
                        )}
                      </>
                    );
                  })}
                </div>
              );
            })()}
            {isAnswered && (
              <div className="mt-4 p-4 bg-green-50 border-2 border-green-300 rounded">
                <div className="font-bold mb-2">Thứ tự đúng:</div>
                {(() => {
                  const gridTemplate = currentQuiz.correctOrder
                    .map((_, i) => (i < currentQuiz.correctOrder.length - 1 ? 'auto auto' : 'auto'))
                    .join(' ');
                  return (
                    <div className="grid items-start gap-2" style={{ gridTemplateColumns: gridTemplate }}>
                      {currentQuiz.correctOrder.map((item, index) => (
                        <>
                          <div key={`ans-${index}`} className="px-3 py-2 rounded-lg border-2 border-green-400 bg-white text-sm leading-snug">
                            {item}
                          </div>
                          {index < currentQuiz.correctOrder.length - 1 && (
                            <div key={`ans-arrow-${index}`} className="self-center text-gray-400">→</div>
                          )}
                        </>
                      ))}
                    </div>
                  );
                })()}
              </div>
            )}
          </div>
        )}

        {/* Action Buttons */}
        <div className="mt-6 flex justify-end gap-3">
          {!isAnswered ? (
            <Button onClick={checkAnswer} disabled={!canCheck}>
              Kiểm tra đáp án
            </Button>
          ) : (
            <Button onClick={nextQuiz}>
              {currentQuizIndex < lesson.game.quizzes.length - 1 ? 'Câu tiếp theo →' : 'Xem kết quả'}
            </Button>
          )}
        </div>
      </Card>

      {/* Result Modal */}
      {showResult && (
        <Modal isOpen={showResult} onClose={() => setShowResult(false)}>
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-4">
              {score >= lesson.game.quizzes.reduce((sum, q) => sum + q.points, 0) * 0.8 ? '🎉' : '💪'}
              {' '}Hoàn thành!
            </h2>
            <div className="text-6xl font-bold text-blue-600 mb-4">
              {score} / {lesson.game.quizzes.reduce((sum, q) => sum + q.points, 0)}
            </div>
            <p className="text-xl mb-6">
              {score >= lesson.game.quizzes.reduce((sum, q) => sum + q.points, 0) * 0.8
                ? 'Xuất sắc! Bạn đã nắm vững kiến thức!'
                : 'Cố gắng lên! Hãy thử lại để đạt điểm cao hơn!'}
            </p>
            <div className="flex gap-3 justify-center">
              <Button onClick={restartGame}>
                Chơi lại
              </Button>
              <Button variant="outline" onClick={() => navigate(-1)}>
                Quay lại bài học
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default GamePlay;
