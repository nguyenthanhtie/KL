import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowLeft, Trophy, Play, RotateCcw, ChevronRight, ChevronLeft,
  CheckCircle2, XCircle, Lightbulb, HelpCircle, Zap, Award,
  FlaskConical, Beaker, Thermometer, Wind, Droplets, Flame,
  AlertTriangle, Star, Target, Clock, Atom, RefreshCw, Sparkles, Loader2, WifiOff
} from 'lucide-react';
import useChallengeProgress from '../../../../hooks/useChallengeProgress';
import { useAIQuestions } from '../../../../hooks/useAIQuestions';
import ResumeDialog from '../../../../components/ResumeDialog';
import './CSS/Bai03_Nito_LuuHuynh.css';

// ================== DATA - NITƠ VÀ LƯU HUỲNH ==================
const CATEGORIES = [
  {
    id: 'nitrogen',
    name: 'Nitơ & Hợp chất',
    icon: Wind,
    color: '#3b82f6',
    description: 'N₂, NH₃, HNO₃ và muối nitrat',
    bgGradient: 'from-blue-500 to-cyan-500'
  },
  {
    id: 'sulfur',
    name: 'Lưu huỳnh & Hợp chất',
    icon: Flame,
    color: '#f59e0b',
    description: 'S, H₂S, SO₂, H₂SO₄',
    bgGradient: 'from-yellow-500 to-orange-500'
  },
  {
    id: 'reactions',
    name: 'Phản ứng đặc trưng',
    icon: FlaskConical,
    color: '#8b5cf6',
    description: 'Phản ứng oxi hóa-khử, nhiệt phân',
    bgGradient: 'from-purple-500 to-pink-500'
  },
  {
    id: 'applications',
    name: 'Ứng dụng thực tế',
    icon: Beaker,
    color: '#10b981',
    description: 'Công nghiệp, nông nghiệp, đời sống',
    bgGradient: 'from-green-500 to-teal-500'
  }
];

// FALLBACK_CHALLENGES - Sử dụng khi không có AI questions
const FALLBACK_CHALLENGES = [
  // ========== NITƠ & HỢP CHẤT (2 câu) ==========
  {
    id: 1,
    category: 'nitrogen',
    type: 'multiple-choice',
    difficulty: 1,
    question: 'Nitơ chiếm bao nhiêu phần trăm thể tích không khí?',
    options: ['21%', '78%', '1%', '0.03%'],
    correctAnswer: '78%',
    explanation: 'Không khí gồm khoảng 78% N₂, 21% O₂, 1% các khí khác (Ar, CO₂, Ne...).',
    hint: 'Nitơ là thành phần chính của không khí.'
  },
  {
    id: 2,
    category: 'nitrogen',
    type: 'multiple-choice',
    difficulty: 2,
    question: 'Amoniac (NH₃) có tính chất hóa học đặc trưng nào?',
    options: ['Tính axit mạnh', 'Tính bazơ yếu và tính khử', 'Tính oxi hóa mạnh', 'Tính trung tính'],
    correctAnswer: 'Tính bazơ yếu và tính khử',
    explanation: 'NH₃ có cặp electron tự do nên có tính bazơ yếu. N trong NH₃ có số oxi hóa -3 (thấp nhất) nên chỉ thể hiện tính khử.',
    hint: 'Xét số oxi hóa của N trong NH₃.'
  },

  // ========== LƯU HUỲNH & HỢP CHẤT (2 câu) ==========
  {
    id: 3,
    category: 'sulfur',
    type: 'multiple-choice',
    difficulty: 1,
    question: 'Khí H₂S có mùi gì đặc trưng?',
    options: ['Mùi khai', 'Mùi trứng thối', 'Mùi hắc', 'Không mùi'],
    correctAnswer: 'Mùi trứng thối',
    explanation: 'H₂S có mùi trứng thối đặc trưng, rất độc.',
    hint: 'Đây là mùi quen thuộc khi trứng bị hỏng.'
  },
  {
    id: 4,
    category: 'sulfur',
    type: 'multiple-choice',
    difficulty: 2,
    question: 'SO₂ có tính chất hóa học đặc trưng nào?',
    options: ['Chỉ có tính oxi hóa', 'Chỉ có tính khử', 'Vừa có tính oxi hóa, vừa có tính khử', 'Không có tính oxi hóa-khử'],
    correctAnswer: 'Vừa có tính oxi hóa, vừa có tính khử',
    explanation: 'S trong SO₂ có số oxi hóa +4 (trung gian giữa -2 và +6) nên vừa có tính oxi hóa, vừa có tính khử.',
    hint: 'Số oxi hóa +4 của S là trung gian.'
  },

  // ========== PHẢN ỨNG ĐẶC TRƯNG (2 câu) ==========
  {
    id: 5,
    category: 'reactions',
    type: 'multiple-choice',
    difficulty: 2,
    question: 'Phản ứng nào sau đây dùng để nhận biết ion SO₄²⁻?',
    options: ['Tác dụng với NaOH', 'Tác dụng với BaCl₂ tạo kết tủa trắng', 'Tác dụng với AgNO₃', 'Tác dụng với HCl'],
    correctAnswer: 'Tác dụng với BaCl₂ tạo kết tủa trắng',
    explanation: 'SO₄²⁻ + Ba²⁺ → BaSO₄↓ (trắng, không tan trong axit). Đây là phản ứng đặc trưng để nhận biết ion sunfat.',
    hint: 'Kết tủa trắng không tan trong axit.'
  },
  {
    id: 6,
    category: 'reactions',
    type: 'multiple-choice',
    difficulty: 2,
    question: 'Để nhận biết ion NH₄⁺, ta cho tác dụng với:',
    options: ['HCl', 'BaCl₂', 'AgNO₃', 'NaOH đun nóng'],
    correctAnswer: 'NaOH đun nóng',
    explanation: 'NH₄⁺ + OH⁻ → NH₃↑ + H₂O. Khí NH₃ có mùi khai, làm xanh giấy quỳ ẩm.',
    hint: 'Tạo khí có mùi khai khi đun nóng với bazơ.'
  },

  // ========== ỨNG DỤNG THỰC TẾ (2 câu) ==========
  {
    id: 7,
    category: 'applications',
    type: 'multiple-choice',
    difficulty: 1,
    question: 'Phân đạm urê có công thức hóa học là:',
    options: ['NH₄NO₃', '(NH₂)₂CO', 'NH₄Cl', '(NH₄)₂SO₄'],
    correctAnswer: '(NH₂)₂CO',
    explanation: 'Urê (NH₂)₂CO chứa 46% N, là loại phân đạm có hàm lượng đạm cao nhất.',
    hint: 'Phân đạm có hàm lượng N cao nhất.'
  },
  {
    id: 8,
    category: 'applications',
    type: 'multiple-choice',
    difficulty: 2,
    question: 'Hiện tượng "mưa axit" chủ yếu do khí nào gây ra?',
    options: ['CO₂', 'SO₂ và NOₓ', 'CH₄', 'O₃'],
    correctAnswer: 'SO₂ và NOₓ',
    explanation: 'SO₂ + H₂O → H₂SO₃; NO₂ + H₂O → HNO₃ + HNO₂. Các khí này từ nhà máy, xe cộ hòa tan trong nước mưa tạo axit.',
    hint: 'Khí thải công nghiệp và giao thông.'
  }
];

// ================== GAME COMPONENT ==================
function QuestionCard({ challenge, userAnswer, setUserAnswer, showResult, isCorrect }) {
  const renderQuestion = () => {
    switch (challenge.type) {
      case 'multiple-choice':
        return (
          <div className="options-grid">
            {challenge.options.map((option, idx) => (
              <button
                key={idx}
                className={`option-btn ${userAnswer === option ? 'selected' : ''} 
                  ${showResult && option === challenge.correctAnswer ? 'correct' : ''}
                  ${showResult && userAnswer === option && option !== challenge.correctAnswer ? 'incorrect' : ''}`}
                onClick={() => !showResult && setUserAnswer(option)}
                disabled={showResult}
              >
                <span className="option-letter">{String.fromCharCode(65 + idx)}</span>
                <span className="option-text">{option}</span>
              </button>
            ))}
          </div>
        );

      case 'true-false':
        return (
          <div className="true-false-options">
            <button
              className={`tf-btn ${userAnswer === true ? 'selected' : ''} 
                ${showResult && challenge.correctAnswer === true ? 'correct' : ''}
                ${showResult && userAnswer === true && challenge.correctAnswer !== true ? 'incorrect' : ''}`}
              onClick={() => !showResult && setUserAnswer(true)}
              disabled={showResult}
            >
              <CheckCircle2 className="w-6 h-6" />
              <span>Đúng</span>
            </button>
            <button
              className={`tf-btn ${userAnswer === false ? 'selected' : ''} 
                ${showResult && challenge.correctAnswer === false ? 'correct' : ''}
                ${showResult && userAnswer === false && challenge.correctAnswer !== false ? 'incorrect' : ''}`}
              onClick={() => !showResult && setUserAnswer(false)}
              disabled={showResult}
            >
              <XCircle className="w-6 h-6" />
              <span>Sai</span>
            </button>
          </div>
        );

      case 'fill-blank':
      case 'calculation':
        return (
          <div className="fill-blank-container">
            <input
              type="text"
              value={userAnswer || ''}
              onChange={(e) => !showResult && setUserAnswer(e.target.value)}
              placeholder={challenge.type === 'calculation' ? 'Nhập kết quả...' : 'Nhập câu trả lời...'}
              className={`fill-input ${showResult ? (isCorrect ? 'correct' : 'incorrect') : ''}`}
              disabled={showResult}
            />
            {challenge.unit && <span className="unit-label">{challenge.unit}</span>}
          </div>
        );

      case 'ordering':
        return (
          <OrderingQuestion
            items={challenge.items}
            userAnswer={userAnswer}
            setUserAnswer={setUserAnswer}
            showResult={showResult}
            correctOrder={challenge.correctOrder}
          />
        );

      case 'matching':
        return (
          <MatchingQuestion
            pairs={challenge.pairs}
            userAnswer={userAnswer}
            setUserAnswer={setUserAnswer}
            showResult={showResult}
          />
        );

      default:
        return <p>Loại câu hỏi không hỗ trợ</p>;
    }
  };

  return (
    <div className="question-card">
      <div className="question-header">
        <span className={`difficulty-badge diff-${challenge.difficulty}`}>
          {'⭐'.repeat(challenge.difficulty)}
        </span>
        <span className="question-type">{getQuestionTypeName(challenge.type)}</span>
      </div>
      <h3 className="question-text">{challenge.question}</h3>
      {renderQuestion()}
    </div>
  );
}

function OrderingQuestion({ items, userAnswer, setUserAnswer, showResult, correctOrder }) {
  const [orderedItems, setOrderedItems] = useState([]);

  useEffect(() => {
    if (!userAnswer || userAnswer.length === 0) {
      setOrderedItems(items.map((item, idx) => ({ text: item, originalIndex: idx })));
    }
  }, [items, userAnswer]);

  const moveItem = (fromIndex, toIndex) => {
    if (showResult) return;
    const newOrder = [...orderedItems];
    const [removed] = newOrder.splice(fromIndex, 1);
    newOrder.splice(toIndex, 0, removed);
    setOrderedItems(newOrder);
    setUserAnswer(newOrder.map(item => item.originalIndex));
  };

  return (
    <div className="ordering-container">
      {orderedItems.map((item, idx) => (
        <div
          key={item.originalIndex}
          className={`ordering-item ${showResult ? (correctOrder[idx] === item.originalIndex ? 'correct' : 'incorrect') : ''}`}
        >
          <span className="order-number">{idx + 1}</span>
          <span className="order-text">{item.text}</span>
          {!showResult && (
            <div className="order-controls">
              <button onClick={() => moveItem(idx, Math.max(0, idx - 1))} disabled={idx === 0}>↑</button>
              <button onClick={() => moveItem(idx, Math.min(orderedItems.length - 1, idx + 1))} disabled={idx === orderedItems.length - 1}>↓</button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

function MatchingQuestion({ pairs, userAnswer, setUserAnswer, showResult }) {
  const [matches, setMatches] = useState({});
  const [selectedLeft, setSelectedLeft] = useState(null);

  useEffect(() => {
    if (userAnswer) {
      setMatches(userAnswer);
    }
  }, [userAnswer]);

  const handleLeftClick = (idx) => {
    if (showResult) return;
    setSelectedLeft(idx);
  };

  const handleRightClick = (idx) => {
    if (showResult || selectedLeft === null) return;
    const newMatches = { ...matches, [selectedLeft]: idx };
    setMatches(newMatches);
    setUserAnswer(newMatches);
    setSelectedLeft(null);
  };

  const isMatchCorrect = (leftIdx) => {
    return matches[leftIdx] === leftIdx;
  };

  return (
    <div className="matching-container">
      <div className="matching-column left">
        {pairs.map((pair, idx) => (
          <div
            key={idx}
            className={`matching-item ${selectedLeft === idx ? 'selected' : ''} 
              ${matches[idx] !== undefined ? 'matched' : ''}
              ${showResult ? (isMatchCorrect(idx) ? 'correct' : 'incorrect') : ''}`}
            onClick={() => handleLeftClick(idx)}
          >
            {pair.left}
          </div>
        ))}
      </div>
      <div className="matching-lines">
        {Object.entries(matches).map(([leftIdx, rightIdx]) => (
          <div key={leftIdx} className="match-line">
            {parseInt(leftIdx) + 1} → {rightIdx + 1}
          </div>
        ))}
      </div>
      <div className="matching-column right">
        {pairs.map((pair, idx) => (
          <div
            key={idx}
            className={`matching-item ${Object.values(matches).includes(idx) ? 'matched' : ''}
              ${showResult && Object.entries(matches).some(([l, r]) => r === idx && parseInt(l) === idx) ? 'correct' : ''}
              ${showResult && Object.entries(matches).some(([l, r]) => r === idx && parseInt(l) !== idx) ? 'incorrect' : ''}`}
            onClick={() => handleRightClick(idx)}
          >
            {pair.right}
          </div>
        ))}
      </div>
    </div>
  );
}

function getQuestionTypeName(type) {
  const types = {
    'multiple-choice': 'Trắc nghiệm',
    'true-false': 'Đúng/Sai',
    'fill-blank': 'Điền từ',
    'calculation': 'Tính toán',
    'ordering': 'Sắp xếp',
    'matching': 'Ghép đôi',
    'experiment': 'Thí nghiệm',
    'balance': 'Cân bằng'
  };
  return types[type] || type;
}

// ================== PROGRESS WATERMARK ==================
function ProgressWatermark({ completedByCategory, challenges }) {
  return (
    <div className="progress-watermark">
      <div className="watermark-title">
        <Trophy className="w-5 h-5 text-yellow-500" />
        <span>Tiến độ các giai đoạn</span>
      </div>
      <div className="watermark-grid">
        {CATEGORIES.map(cat => {
          const Icon = cat.icon;
          const completed = completedByCategory[cat.id] || 0;
          const total = challenges.filter(c => c.category === cat.id).length;
          const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;
          const isComplete = percentage === 100;
          
          return (
            <div 
              key={cat.id} 
              className={`watermark-item ${isComplete ? 'completed' : ''}`}
            >
              <div className="watermark-icon" style={{ backgroundColor: isComplete ? '#10b981' : cat.color }}>
                <Icon className="w-4 h-4 text-white" />
                {isComplete && <div className="complete-badge">✓</div>}
              </div>
              <div className="watermark-info">
                <div className="watermark-name">{cat.name}</div>
                <div className="watermark-progress-bar">
                  <div 
                    className="watermark-progress-fill"
                    style={{ width: `${percentage}%`, backgroundColor: isComplete ? '#10b981' : cat.color }}
                  />
                </div>
                <div className="watermark-stats">
                  <span className="watermark-percentage">{percentage}%</span>
                  <span className="watermark-count">{completed}/{total}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div className="watermark-total">
        <div className="total-label">Tổng tiến độ:</div>
        <div className="total-progress-bar">
          <div 
            className="total-progress-fill"
            style={{ width: `${challenges.length > 0 ? Math.round((Object.values(completedByCategory).reduce((a, b) => a + b, 0) / challenges.length) * 100) : 0}%` }}
          />
        </div>
        <div className="total-stats">
          {Object.values(completedByCategory).reduce((a, b) => a + b, 0)}/{challenges.length} câu hỏi
          ({challenges.length > 0 ? Math.round((Object.values(completedByCategory).reduce((a, b) => a + b, 0) / challenges.length) * 100) : 0}%)
        </div>
      </div>
    </div>
  );
}

// ================== MAIN COMPONENT ==================
export default function Nito_LuuHuynh() {
  const { hasProgress, saveProgress, clearProgress, getProgress, completeChallenge } = useChallengeProgress('nito-luu-huynh-11', {
    challengeId: 3, // ID trong seed.cjs
    programId: 'chemistry',
    grade: 11
  });

  // AI Questions Hook
  const { 
    questions: aiQuestions, 
    loading: aiLoading, 
    error: aiError, 
    refetch: refetchAI,
    clearCache: clearAICache 
  } = useAIQuestions('nito_luu_huynh_11', { autoFetch: true, useCache: true });

  // Sử dụng AI questions nếu có, fallback về static data
  const CHALLENGES = useMemo(() => {
    if (aiQuestions && aiQuestions.length > 0) return aiQuestions;
    return FALLBACK_CHALLENGES;
  }, [aiQuestions]);

  const isUsingAI = aiQuestions && aiQuestions.length > 0;

  const [showResumeDialog, setShowResumeDialog] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [startTime, setStartTime] = useState(null);
  const [gameMode, setGameMode] = useState('menu'); // 'menu', 'practice', 'challenge'
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [completedQuestions, setCompletedQuestions] = useState([]);
  const [showHint, setShowHint] = useState(false);
  const [timeLeft, setTimeLeft] = useState(null);
  const [isTimerActive, setIsTimerActive] = useState(false);

  // Filter challenges by category
  const filteredChallenges = selectedCategory
    ? CHALLENGES.filter(c => c.category === selectedCategory)
    : CHALLENGES;

  const currentChallenge = filteredChallenges[currentIndex];

  // Count completed by category (using current CHALLENGES which may be AI or fallback)
  const completedByCategory = useMemo(() => {
    return CATEGORIES.reduce((acc, cat) => {
      acc[cat.id] = completedQuestions.filter(id => {
        const challenge = CHALLENGES.find(c => c.id === id);
        return challenge && challenge.category === cat.id;
      }).length;
      return acc;
    }, {});
  }, [completedQuestions, CHALLENGES]);

  // Timer effect
  useEffect(() => {
    if (isTimerActive && timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && isTimerActive) {
      handleSubmit();
    }
  }, [timeLeft, isTimerActive]);

  // Check saved progress on mount
  useEffect(() => {
    if (hasProgress && !gameStarted) {
      setShowResumeDialog(true);
    } else if (!gameStarted) {
      setGameStarted(true);
    }
  }, [hasProgress, gameStarted]);

  const startGame = (fromBeginning = false) => {
    setShowResumeDialog(false);
    setStartTime(Date.now());
    setIsCompleted(false);
    if (fromBeginning) {
      clearProgress();
      setScore(0);
      setStreak(0);
      setCompletedQuestions([]);
      setCurrentIndex(0);
      setGameStarted(true);
    } else {
      const savedData = getProgress();
      if (savedData) {
        setScore(savedData.score || 0);
        setStreak(savedData.streak || 0);
        setCompletedQuestions(savedData.completedQuestions || []);
        setSelectedCategory(savedData.selectedCategory || null);
        setGameMode(savedData.gameMode || 'menu');
      }
      setGameStarted(true);
    }
  };

  const checkAnswer = () => {
    if (!currentChallenge || userAnswer === null) return false;

    switch (currentChallenge.type) {
      case 'multiple-choice':
      case 'experiment':
        return userAnswer === currentChallenge.correctAnswer;
      case 'true-false':
        return userAnswer === currentChallenge.correctAnswer;
      case 'fill-blank':
      case 'calculation':
        const acceptedAnswers = currentChallenge.acceptedAnswers || [currentChallenge.correctAnswer];
        return acceptedAnswers.some(ans => 
          ans.toLowerCase().trim() === String(userAnswer).toLowerCase().trim()
        );
      case 'ordering':
        if (!userAnswer || !currentChallenge.correctOrder) return false;
        return JSON.stringify(userAnswer) === JSON.stringify(currentChallenge.correctOrder);
      case 'matching':
        if (!userAnswer) return false;
        return Object.entries(userAnswer).every(([left, right]) => parseInt(left) === right);
      default:
        return false;
    }
  };

  const handleSubmit = () => {
    const isCorrect = checkAnswer();
    setShowResult(true);
    setIsTimerActive(false);

    if (isCorrect) {
      const basePoints = currentChallenge.difficulty * 10;
      const streakBonus = streak >= 3 ? 15 : streak >= 2 ? 10 : streak >= 1 ? 5 : 0;
      const earnedPoints = basePoints + streakBonus;

      const newScore = score + earnedPoints;
      const newCompletedQuestions = [...new Set([...completedQuestions, currentChallenge.id])];

      setScore(newScore);
      setStreak(prev => prev + 1);
      setCompletedQuestions(newCompletedQuestions);

      // Check if all questions completed - save to database
      if (newCompletedQuestions.length === CHALLENGES.length && !isCompleted) {
        setIsCompleted(true);
        const timeSpent = startTime ? Math.floor((Date.now() - startTime) / 1000) : 0;
        const maxScore = CHALLENGES.reduce((sum, c) => sum + c.difficulty * 10 + 15, 0);
        completeChallenge({
          score: newScore,
          maxScore: maxScore,
          timeSpent: timeSpent,
          attempts: newCompletedQuestions.length,
          hintsUsed: 0
        });
        console.log('🎉 Challenge completed! Score:', newScore, '/', maxScore);
      } else {
        saveProgress({
          score: newScore,
          streak: streak + 1,
          completedQuestions: newCompletedQuestions,
          selectedCategory,
          gameMode
        });
      }
    } else {
      setStreak(0);
      saveProgress({
        score,
        streak: 0,
        completedQuestions,
        selectedCategory,
        gameMode
      });
    }
  };

  const handleNext = () => {
    if (currentIndex < filteredChallenges.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setUserAnswer(null);
      setShowResult(false);
      setShowHint(false);
      if (gameMode === 'challenge') {
        setTimeLeft(60);
        setIsTimerActive(true);
      }
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
      setUserAnswer(null);
      setShowResult(false);
      setShowHint(false);
    }
  };

  const goToMenu = () => {
    setGameMode('menu');
    setSelectedCategory(null);
    setCurrentIndex(0);
    setUserAnswer(null);
    setShowResult(false);
    setIsTimerActive(false);
  };

  const selectCategoryAndStart = (catId, mode = 'practice') => {
    setSelectedCategory(catId);
    setCurrentIndex(0);
    setUserAnswer(null);
    setShowResult(false);
    setGameMode(mode);
    if (mode === 'challenge') {
      setTimeLeft(60);
      setIsTimerActive(true);
    }
  };

  const startChallengeMode = () => {
    setSelectedCategory(null);
    setCurrentIndex(0);
    setUserAnswer(null);
    setShowResult(false);
    setGameMode('challenge');
    setTimeLeft(60);
    setIsTimerActive(true);
  };

  const isCorrect = checkAnswer();

  // Loading state
  if (!gameStarted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-600 via-purple-600 to-orange-500">
        <div className="bg-white shadow-md">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <Link to="/hoa-hoc/lop-11" className="flex items-center text-gray-600 hover:text-gray-900">
                <ArrowLeft className="w-5 h-5 mr-2" />
                Quay lại
              </Link>
              <h1 className="text-2xl font-bold text-gray-800">⚗️ Nitơ - Lưu huỳnh</h1>
              <div className="w-24"></div>
            </div>
          </div>
        </div>
        <div className="container mx-auto px-4 py-8">
          <div className="bg-white rounded-2xl shadow-2xl p-12 text-center">
            <p className="text-gray-600">Đang tải...</p>
          </div>
        </div>
        <ResumeDialog
          show={showResumeDialog}
          onResume={() => startGame(false)}
          onRestart={() => startGame(true)}
          progressInfo={{
            current: completedQuestions.length,
            total: CHALLENGES.length,
            score: score
          }}
        />
      </div>
    );
  }

  // Menu mode
  if (gameMode === 'menu') {
    return (
      <div className="min-h-screen nito-bg">
        <div className="bg-white shadow-md">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <Link to="/advanced-challenge" className="flex items-center text-gray-600 hover:text-gray-900">
                <ArrowLeft className="w-5 h-5 mr-2" />
                Quay lại
              </Link>
              <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                <span>⚗️</span>
                Nitơ - Lưu huỳnh
              </h1>
              <div className="flex items-center gap-2 text-yellow-600">
                <Trophy className="w-6 h-6" />
                <span className="font-bold">{score} điểm</span>
              </div>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-6">
          <div className="bg-white rounded-2xl shadow-2xl p-6">
            {/* AI Status Banners */}
            {aiLoading && (
              <div className="ai-status-banner loading mb-4">
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>Đang tải câu hỏi AI...</span>
              </div>
            )}
            
            {aiError && (
              <div className="ai-status-banner error mb-4">
                <WifiOff className="w-5 h-5" />
                <span>Không thể tải câu hỏi AI. Đang sử dụng câu hỏi dự phòng.</span>
                <button onClick={refetchAI} className="retry-btn">
                  <RefreshCw className="w-4 h-4" />
                  Thử lại
                </button>
              </div>
            )}
            
            {isUsingAI && !aiLoading && (
              <div className="ai-status-banner active mb-4">
                <Sparkles className="w-5 h-5" />
                <span>Đang sử dụng {CHALLENGES.length} câu hỏi AI</span>
                <button onClick={clearAICache} className="refresh-btn" title="Làm mới câu hỏi">
                  <RefreshCw className="w-4 h-4" />
                </button>
              </div>
            )}

            {/* Stats */}
            <div className="stats-bar-nito mb-6">
              <div className="stat-item-nito">
                <Award className="w-5 h-5 text-yellow-500" />
                <span>Điểm: <strong>{score}</strong></span>
              </div>
              <div className="stat-item-nito">
                <Target className="w-5 h-5 text-green-500" />
                <span>Hoàn thành: <strong>{completedQuestions.length}/{CHALLENGES.length}</strong></span>
              </div>
              <div className="stat-item-nito">
                <Zap className="w-5 h-5 text-orange-500" />
                <span>Combo: <strong>x{streak}</strong></span>
              </div>
            </div>

            {/* Progress Watermark */}
            <ProgressWatermark completedByCategory={completedByCategory} challenges={CHALLENGES} />

            {/* Categories */}
            <h3 className="text-lg font-bold text-gray-700 mb-4">Chọn chủ đề:</h3>
            <div className="category-grid-nito">
              {CATEGORIES.map(cat => {
                const Icon = cat.icon;
                const completed = completedByCategory[cat.id] || 0;
                const total = CHALLENGES.filter(c => c.category === cat.id).length;
                return (
                  <button
                    key={cat.id}
                    className="category-card-nito"
                    onClick={() => selectCategoryAndStart(cat.id)}
                    style={{ '--cat-color': cat.color }}
                  >
                    <div className={`category-icon-nito bg-gradient-to-br ${cat.bgGradient}`}>
                      <Icon className="w-8 h-8 text-white" />
                      {isUsingAI && (
                        <div className="ai-badge" title="Câu hỏi AI">
                          <Sparkles className="w-3 h-3" />
                        </div>
                      )}
                    </div>
                    <div className="category-info-nito">
                      <h4>{cat.name}</h4>
                      <p>{cat.description}</p>
                      <div className="category-progress-nito">
                        <div className="progress-bar-nito">
                          <div
                            className="progress-fill-nito"
                            style={{ width: `${total > 0 ? (completed / total) * 100 : 0}%`, backgroundColor: cat.color }}
                          />
                        </div>
                        <span>{completed}/{total}</span>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Challenge Mode */}
            <div className="mt-6 text-center">
              <button className="challenge-btn-nito" onClick={startChallengeMode}>
                <Zap className="w-5 h-5" />
                Chế độ Thử thách (Giới hạn thời gian)
              </button>
            </div>
          </div>
        </div>

        <ResumeDialog
          show={showResumeDialog}
          onResume={() => startGame(false)}
          onRestart={() => startGame(true)}
          progressInfo={{
            current: completedQuestions.length,
            total: CHALLENGES.length,
            score: score
          }}
        />
      </div>
    );
  }

  // Practice/Challenge mode
  return (
    <div className="min-h-screen nito-bg">
      {/* Header */}
      <div className="bg-white shadow-md">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <button onClick={goToMenu} className="flex items-center text-gray-600 hover:text-gray-900">
              <ArrowLeft className="w-5 h-5 mr-2" />
              Menu
            </button>
            <h1 className="text-lg font-bold text-gray-800 flex items-center gap-2">
              <span>⚗️</span>
              {gameMode === 'challenge' ? 'Thử thách' : CATEGORIES.find(c => c.id === selectedCategory)?.name || 'Tất cả'}
            </h1>
            <div className="flex items-center gap-3">
              {gameMode === 'challenge' && timeLeft !== null && (
                <div className={`timer-badge ${timeLeft <= 10 ? 'warning' : ''}`}>
                  <Clock className="w-4 h-4" />
                  <span>{timeLeft}s</span>
                </div>
              )}
              <div className="flex items-center gap-1 text-orange-500">
                <Zap className="w-5 h-5" />
                <span className="font-bold">x{streak}</span>
              </div>
              <div className="flex items-center gap-1 text-yellow-600">
                <Trophy className="w-5 h-5" />
                <span className="font-bold">{score}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-4">
        {!currentChallenge ? (
          <div className="bg-white rounded-2xl shadow-2xl p-6 text-center">
            <Trophy className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-800 mb-2">🎉 Hoàn thành!</h2>
            <p className="text-gray-600 mb-4">Bạn đã hoàn thành tất cả câu hỏi trong phần này.</p>
            <p className="text-2xl font-bold text-yellow-600 mb-4">Điểm số: {score}</p>
            <button onClick={goToMenu} className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700">
              Quay lại Menu
            </button>
          </div>
        ) : (
          <div className="bg-white rounded-2xl shadow-2xl p-5">
            {/* Progress */}
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm text-gray-500">
                Câu {currentIndex + 1}/{filteredChallenges.length}
              </span>
              <button
                className="hint-btn"
                onClick={() => setShowHint(!showHint)}
              >
                <Lightbulb className={`w-5 h-5 ${showHint ? 'text-yellow-500' : 'text-gray-400'}`} />
              </button>
            </div>

            {/* Hint */}
            {showHint && currentChallenge.hint && (
              <div className="hint-box-nito mb-4">
                <Lightbulb className="w-4 h-4 text-yellow-600" />
                <span>{currentChallenge.hint}</span>
              </div>
            )}

            {/* Question Card */}
            <QuestionCard
              challenge={currentChallenge}
              userAnswer={userAnswer}
              setUserAnswer={setUserAnswer}
              showResult={showResult}
              isCorrect={isCorrect}
            />

            {/* Result Explanation */}
            {showResult && (
              <div className={`result-box ${isCorrect ? 'correct' : 'incorrect'}`}>
                <div className="result-header">
                  {isCorrect ? (
                    <><CheckCircle2 className="w-6 h-6" /> Chính xác!</>
                  ) : (
                    <><XCircle className="w-6 h-6" /> Chưa đúng!</>
                  )}
                </div>
                <p className="result-explanation">{currentChallenge.explanation}</p>
                {!isCorrect && currentChallenge.correctAnswer && (
                  <p className="correct-answer">
                    Đáp án đúng: <strong>{String(currentChallenge.correctAnswer)}</strong>
                  </p>
                )}
              </div>
            )}

            {/* Controls */}
            <div className="controls-nito mt-4">
              <button
                onClick={handlePrev}
                disabled={currentIndex === 0}
                className="nav-btn-nito"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              {!showResult ? (
                <button
                  onClick={handleSubmit}
                  disabled={userAnswer === null}
                  className="submit-btn-nito"
                >
                  Kiểm tra
                </button>
              ) : (
                <button onClick={handleNext} className="next-btn-nito">
                  {currentIndex < filteredChallenges.length - 1 ? 'Tiếp theo' : 'Hoàn thành'}
                  <ChevronRight className="w-5 h-5" />
                </button>
              )}

              <button
                onClick={handleNext}
                disabled={currentIndex === filteredChallenges.length - 1}
                className="nav-btn-nito"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}
      </div>

      <ResumeDialog
        show={showResumeDialog}
        onResume={() => startGame(false)}
        onRestart={() => startGame(true)}
        progressInfo={{
          current: completedQuestions.length,
          total: CHALLENGES.length,
          score: score
        }}
      />
    </div>
  );
}
