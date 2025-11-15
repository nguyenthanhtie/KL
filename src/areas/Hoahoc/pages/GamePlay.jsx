import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { API_URL } from '../../../config/api';
import Card from '../../../components/ui/Card';
import Button from '../../../components/ui/Button';
import QuizHeader from '../gamelist/QuizHeader';
import QuizTypeBadge from '../gamelist/QuizTypeBadge';
import MultipleChoice from '../gamelist/MultipleChoice';
import TrueFalse from '../gamelist/TrueFalse';
import FillInBlank from '../gamelist/FillInBlank';
import Matching from '../gamelist/Matching';
import Ordering from '../gamelist/Ordering';
import DragDrop from '../gamelist/DragDrop';
import ResultModal from '../gamelist/ResultModal';

const GamePlay = () => {
  const { classId, chapterId, lessonId, level } = useParams(); // Thêm level param
  const navigate = useNavigate();
  
  const [lesson, setLesson] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedLevel, setSelectedLevel] = useState(level || 'basic'); // Cấp độ hiện tại
  const [allLessons, setAllLessons] = useState([]); // Danh sách tất cả bài học
  const [nextLesson, setNextLesson] = useState(null); // Bài học tiếp theo
  
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
    fetchAllLessons();
  }, [classId, chapterId, lessonId]);

  const fetchLesson = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${API_URL}/lessons/class/${classId}/chapter/${chapterId}/lesson/${lessonId}`
      );
      setLesson(response.data);
      
      // Lấy quiz theo cấp độ
      const quizzes = getQuizzesByLevel(response.data, selectedLevel);
      
      // Initialize first quiz state
      initializeQuiz(quizzes?.[0]);
      
      setLoading(false);
    } catch (err) {
      setError(err.response?.data?.message || 'Không thể tải bài học');
      setLoading(false);
    }
  };

  // Lấy tất cả bài học để tìm bài học tiếp theo
  const fetchAllLessons = async () => {
    try {
      const response = await axios.get(`${API_URL}/lessons`);
      setAllLessons(response.data);
      
      // Tìm bài học tiếp theo
      const currentLessonIndex = response.data.findIndex(
        (l) => l.classId === parseInt(classId) && 
               l.chapterId === parseInt(chapterId) && 
               l.lessonId === parseInt(lessonId)
      );
      
      if (currentLessonIndex !== -1 && currentLessonIndex < response.data.length - 1) {
        const next = response.data[currentLessonIndex + 1];
        setNextLesson(next);
      } else {
        setNextLesson(null);
      }
    } catch (err) {
      console.error('Error fetching all lessons:', err);
    }
  };

  // Chuyển đến bài học tiếp theo
  const goToNextLesson = () => {
    if (nextLesson) {
      navigate(`/gameplay/${nextLesson.classId}/${nextLesson.chapterId}/${nextLesson.lessonId}`);
      // Reset game state
      setShowResult(false);
      setCurrentQuizIndex(0);
      setScore(0);
      setIsAnswered(false);
      setUserAnswer(null);
    }
  };

  // Helper: Lấy quiz theo cấp độ
  const getQuizzesByLevel = (lessonData, level) => {
    if (!lessonData?.game) return [];
    
    // Ưu tiên quiz theo cấp độ, fallback về quizzes chung
    if (lessonData.game[level] && lessonData.game[level].length > 0) {
      return lessonData.game[level];
    }
    
    // Fallback: dùng quizzes chung (backward compatibility)
    return lessonData.game.quizzes || [];
  };

  const shuffle = (array) => {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
  };

  const initializeQuiz = (quiz) => {
    if (!quiz) return;
    
    if (quiz.type === 'ordering') {
      setOrderedItems(shuffle([...quiz.options]));
    }
    if (quiz.type === 'matching') {
      const options = (quiz.pairs || []).map(p => p.right);
      setMatchingPool(shuffle(options));
      setMatchingAnswers({});
    }
    if (quiz.type === 'drag-drop' && quiz.inline) {
      setInlineSlots((quiz.slots || []).map(s => ({ ...s, value: null })));
      setInlineOptions(shuffle(quiz.options || []));
    }
  };

  const currentQuiz = lesson?.game?.[selectedLevel]?.[currentQuizIndex] || 
                     lesson?.game?.quizzes?.[currentQuizIndex]; // Fallback

  // Lấy danh sách quiz theo cấp độ
  const currentLevelQuizzes = lesson?.game?.[selectedLevel] || lesson?.game?.quizzes || [];

  // Determine if the current quiz has sufficient input to allow checking
  const canCheck = (() => {
    if (!currentQuiz) return false;
    switch (currentQuiz.type) {
      case 'multiple-choice':
      case 'true-false':
        return userAnswer !== null && userAnswer !== undefined;
      case 'fill-in-blank':
        return (userAnswer ?? '').toString().trim().length > 0;
      case 'matching':
        return Array.isArray(currentQuiz.pairs) && Object.keys(matchingAnswers).length === currentQuiz.pairs.length;
      case 'ordering':
        return true;
      case 'drag-drop':
        if (currentQuiz.inline) {
          return Array.isArray(inlineSlots) && inlineSlots.every(s => s.value !== null);
        }
        return Array.isArray(currentQuiz.pairs) && Object.keys(matchingAnswers).length === currentQuiz.pairs.length;
      default:
        return false;
    }
  })();

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

  const nextQuiz = async () => {
    if (currentQuizIndex < currentLevelQuizzes.length - 1) {
      const nextIndex = currentQuizIndex + 1;
      setCurrentQuizIndex(nextIndex);
      setUserAnswer(null);
      setIsAnswered(false);
      setMatchingAnswers({});
      setMatchingPool([]);
      
      // Initialize next quiz
      initializeQuiz(currentLevelQuizzes[nextIndex]);
    } else {
      // Tính tổng điểm và gửi kết quả
      const totalPoints = currentLevelQuizzes.reduce((sum, q) => sum + q.points, 0);
      await submitProgress(score, totalPoints);
      setShowResult(true);
    }
  };

  // Gửi kết quả lên server
  const submitProgress = async (currentScore, totalPoints) => {
    try {
      const user = JSON.parse(localStorage.getItem('user'));
      if (!user?.uid) return;

      await axios.post(`${API_URL}/progress/submit`, {
        firebaseUid: user.uid,
        pathId: parseInt(classId),
        lessonId: parseInt(lessonId),
        score: currentScore,
        totalQuestions: totalPoints,
        correctAnswers: currentScore,
        level: selectedLevel // Gửi cấp độ hiện tại
      });
    } catch (error) {
      console.error('Error submitting progress:', error);
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
    
    // Re-initialize first quiz
    initializeQuiz(lesson?.game?.quizzes?.[0]);
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
      <QuizHeader
        onBack={() => navigate(-1)}
        currentIndex={currentQuizIndex}
        totalQuizzes={currentLevelQuizzes.length}
        score={score}
        totalPoints={currentLevelQuizzes.reduce((sum, q) => sum + q.points, 0)}
      />

      {/* Quiz Card */}
      <Card className="p-6">
        <QuizTypeBadge type={currentQuiz.type} points={currentQuiz.points} />
        
        <h3 className="text-xl font-bold mb-6">{currentQuiz.question}</h3>

        {/* Multiple Choice */}
        {currentQuiz.type === 'multiple-choice' && (
          <MultipleChoice
            quiz={currentQuiz}
            userAnswer={userAnswer}
            isAnswered={isAnswered}
            onAnswer={(value) => !isAnswered && setUserAnswer(value)}
          />
        )}

        {/* True/False */}
        {currentQuiz.type === 'true-false' && (
          <TrueFalse
            quiz={currentQuiz}
            userAnswer={userAnswer}
            isAnswered={isAnswered}
            onAnswer={(value) => !isAnswered && setUserAnswer(value)}
          />
        )}

        {/* Fill in Blank */}
        {currentQuiz.type === 'fill-in-blank' && (
          <FillInBlank
            quiz={currentQuiz}
            userAnswer={userAnswer}
            isAnswered={isAnswered}
            onAnswer={setUserAnswer}
          />
        )}

  {/* Matching */}
        {currentQuiz.type === 'matching' && (
          <Matching
            quiz={currentQuiz}
            isAnswered={isAnswered}
            matchingAnswers={matchingAnswers}
            matchingPool={matchingPool}
            onDragStart={onDragStartOption}
            onDropToLeft={onDropToLeft}
            onDragOverLeft={onDragOverLeft}
            onRemoveAssigned={removeAssigned}
          />
        )}

        {/* Drag-Drop */}
        {currentQuiz.type === 'drag-drop' && (
          <DragDrop
            quiz={currentQuiz}
            isAnswered={isAnswered}
            matchingAnswers={matchingAnswers}
            inlineSlots={inlineSlots}
            inlineOptions={inlineOptions}
            onDragStartOption={onDragStartOption}
            onDropToLeft={onDropToLeft}
            onDragOverLeft={onDragOverLeft}
            onRemoveAssigned={removeAssigned}
            onDragStartInline={onDragStartInline}
            onDropToSlot={onDropToSlot}
            onDragOverSlot={onDragOverSlot}
            onRemoveInlineAssigned={removeInlineAssigned}
          />
        )}

        {/* Ordering */}
        {currentQuiz.type === 'ordering' && (
          <Ordering
            quiz={currentQuiz}
            orderedItems={orderedItems}
            isAnswered={isAnswered}
            onDragStart={onDragStartOrder}
            onDragOver={onDragOverOrder}
            onDrop={onDropOrder}
          />
        )}

        {/* Action Buttons */}
        <div className="mt-6 flex justify-end gap-3">
          {!isAnswered ? (
            <Button onClick={checkAnswer} disabled={!canCheck}>
              Kiểm tra đáp án
            </Button>
          ) : (
            <Button onClick={nextQuiz}>
              {currentQuizIndex < currentLevelQuizzes.length - 1 ? 'Câu tiếp theo →' : 'Xem kết quả'}
            </Button>
          )}
        </div>
      </Card>

      {/* Result Modal */}
      <ResultModal
        isOpen={showResult}
        onClose={() => setShowResult(false)}
        score={score}
        totalPoints={currentLevelQuizzes.reduce((sum, q) => sum + q.points, 0)}
        level={selectedLevel}
        onRestart={restartGame}
        onBack={() => navigate('/dashboard')}
        onNext={goToNextLesson}
        hasNextLesson={!!nextLesson}
      />
    </div>
  );
};

export default GamePlay;
