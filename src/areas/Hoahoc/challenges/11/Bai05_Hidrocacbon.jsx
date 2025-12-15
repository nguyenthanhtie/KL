import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowLeft, Trophy, RotateCcw, ChevronRight,
  CheckCircle2, XCircle, Lightbulb, Zap, Award,
  FlaskConical, Flame, Atom, Layers, Hexagon, Fuel,
  Clock, Target, AlertTriangle
} from 'lucide-react';
import useChallengeProgress from '../../../../hooks/useChallengeProgress';
import ResumeDialog from '../../../../components/ResumeDialog';
import './CSS/Bai05_Hidrocacbon.css';

// ================== DATA - HIDROCACBON ==================
const CATEGORIES = [
  {
    id: 'alkan',
    name: 'Ankan (Parafin)',
    icon: Layers,
    color: '#6366f1',
    description: 'Hidrocacbon no, mạch hở (CnH2n+2)',
    bgGradient: 'from-indigo-500 to-blue-500'
  },
  {
    id: 'unsaturated',
    name: 'Anken & Ankin',
    icon: Flame,
    color: '#f43f5e',
    description: 'Hidrocacbon không no (C=C, C≡C)',
    bgGradient: 'from-rose-500 to-red-500'
  },
  {
    id: 'aromatic',
    name: 'Hidrocacbon Thơm',
    icon: Hexagon,
    color: '#8b5cf6',
    description: 'Benzen và đồng đẳng (Vòng benzen)',
    bgGradient: 'from-violet-500 to-purple-500'
  },
  {
    id: 'sources',
    name: 'Nguồn Hidrocacbon',
    icon: Fuel,
    color: '#10b981',
    description: 'Dầu mỏ, khí thiên nhiên, than đá',
    bgGradient: 'from-emerald-500 to-green-500'
  }
];

const CHALLENGES = [
  // ========== ANKAN ==========
  {
    id: 1,
    category: 'alkan',
    type: 'multiple-choice',
    difficulty: 1,
    question: 'Công thức tổng quát của ankan là gì?',
    options: ['CnH2n', 'CnH2n+2', 'CnH2n-2', 'CnH2n-6'],
    correctAnswer: 'CnH2n+2',
    explanation: 'Ankan là hidrocacbon no, mạch hở có công thức chung là CnH2n+2 (n ≥ 1).',
    hint: 'Số nguyên tử H gấp đôi số C cộng thêm 2.'
  },
  {
    id: 2,
    category: 'alkan',
    type: 'multiple-choice',
    difficulty: 1,
    question: 'Phản ứng đặc trưng của ankan là...',
    options: ['Phản ứng cộng', 'Phản ứng thế', 'Phản ứng trùng hợp', 'Phản ứng tráng gương'],
    correctAnswer: 'Phản ứng thế',
    explanation: 'Do chỉ chứa liên kết đơn bền vững, ankan tham gia phản ứng thế (đặc biệt với halogen) là chủ yếu.',
    hint: 'Thay thế nguyên tử H bằng nguyên tử khác.'
  },
  {
    id: 3,
    category: 'alkan',
    type: 'fill-blank',
    difficulty: 2,
    question: 'Tên gọi của ankan có công thức CH3-CH(CH3)-CH3 là ___',
    correctAnswer: '2-metylpropan',
    acceptedAnswers: ['2-metylpropan', 'isobutan'],
    explanation: 'Mạch chính 3C (propan), nhánh metyl ở vị trí số 2 => 2-metylpropan (tên thường là isobutan).',
    hint: 'Chọn mạch chính dài nhất, đánh số từ phía gần nhánh hơn.'
  },

  // ========== ANKEN & ANKIN ==========
  {
    id: 4,
    category: 'unsaturated',
    type: 'multiple-choice',
    difficulty: 1,
    question: 'Anken là hidrocacbon không no mạch hở có chứa...',
    options: ['1 liên kết đôi C=C', '1 liên kết ba C≡C', '2 liên kết đôi C=C', 'Vòng benzen'],
    correctAnswer: '1 liên kết đôi C=C',
    explanation: 'Anken có 1 liên kết đôi C=C trong phân tử. CTTQ: CnH2n (n ≥ 2).',
    hint: 'Etylen (CH2=CH2) là anken đơn giản nhất.'
  },
  {
    id: 5,
    category: 'unsaturated',
    type: 'multiple-choice',
    difficulty: 2,
    question: 'Để phân biệt etan (C2H6) và etilen (C2H4), ta dùng thuốc thử nào?',
    options: ['Dung dịch NaCl', 'Dung dịch Brom', 'Quỳ tím', 'Dung dịch NaOH'],
    correctAnswer: 'Dung dịch Brom',
    explanation: 'Etilen (anken) làm mất màu dung dịch brom (nâu đỏ) do phản ứng cộng, còn etan (ankan) thì không.',
    hint: 'Chất nào phản ứng được với liên kết pi?'
  },
  {
    id: 6,
    category: 'unsaturated',
    type: 'fill-blank',
    difficulty: 2,
    question: 'Sục khí axetilen (C2H2) vào dung dịch AgNO3/NH3 thấy xuất hiện kết tủa màu ___',
    correctAnswer: 'vàng nhạt',
    acceptedAnswers: ['vàng', 'vàng nhạt'],
    explanation: 'HC≡CH + 2AgNO3 + 2NH3 → AgC≡CAg↓ (vàng nhạt) + 2NH4NO3.',
    hint: 'Màu của bạc axetilua.'
  },

  // ========== HIDROCACBON THƠM ==========
  {
    id: 7,
    category: 'aromatic',
    type: 'multiple-choice',
    difficulty: 2,
    question: 'Công thức phân tử của benzen là...',
    options: ['C6H12', 'C6H14', 'C6H6', 'C6H10'],
    correctAnswer: 'C6H6',
    explanation: 'Benzen có công thức phân tử C6H6, cấu trúc vòng lục giác đều với hệ liên kết pi liên hợp bền vững.',
    hint: 'Độ bất bão hòa k = 4.'
  },
  {
    id: 8,
    category: 'aromatic',
    type: 'multiple-choice',
    difficulty: 3,
    question: 'Quy tắc thế vào vòng benzen: Nhóm thế loại I (đẩy e) định hướng thế vào vị trí nào?',
    options: ['Ortho và Para', 'Meta', 'Chỉ Ortho', 'Chỉ Para'],
    correctAnswer: 'Ortho và Para',
    explanation: 'Nhóm thế loại I (-OH, -NH2, -R, -X...) đẩy electron làm tăng mật độ e ở vị trí ortho và para, định hướng thế vào các vị trí này.',
    hint: 'Vị trí 2, 4, 6.'
  },

  // ========== NGUỒN HIDROCACBON ==========
  {
    id: 9,
    category: 'sources',
    type: 'multiple-choice',
    difficulty: 1,
    question: 'Phương pháp chủ yếu để chế biến dầu mỏ là...',
    options: ['Chưng cất phân đoạn', 'Nhiệt phân', 'Điện phân', 'Thủy phân'],
    correctAnswer: 'Chưng cất phân đoạn',
    explanation: 'Dầu mỏ là hỗn hợp nhiều hidrocacbon có nhiệt độ sôi khác nhau, nên được tách bằng phương pháp chưng cất phân đoạn.',
    hint: 'Dựa vào sự khác nhau về nhiệt độ sôi.'
  },
  {
    id: 10,
    category: 'sources',
    type: 'multiple-choice',
    difficulty: 2,
    question: 'Thành phần chính của khí thiên nhiên là...',
    options: ['Etan', 'Propan', 'Metan', 'Butan'],
    correctAnswer: 'Metan',
    explanation: 'Khí thiên nhiên chứa chủ yếu là metan (CH4), chiếm khoảng 95% thể tích.',
    hint: 'Hidrocacbon đơn giản nhất.'
  }
];

const Bai05_Hidrocacbon = () => {
  const [activeCategory, setActiveCategory] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [isCorrect, setIsCorrect] = useState(null);
  const [streak, setStreak] = useState(0);
  const [showExplanation, setShowExplanation] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30);
  const [isTimerActive, setIsTimerActive] = useState(false);
  const [showResumeDialog, setShowResumeDialog] = useState(false);
  const [completedCategories, setCompletedCategories] = useState([]);
  const [highScore, setHighScore] = useState(0);

  const { hasProgress, savedProgress, saveProgress, clearProgress } = useChallengeProgress('hidrocacbon_11', {
    challengeId: 'hidrocacbon_11',
    programId: 'chemistry',
    grade: 11
  });

  // Filter questions by category
  const filteredQuestions = activeCategory 
    ? CHALLENGES.filter(q => q.category === activeCategory)
    : [];

  const currentQuestion = filteredQuestions[currentQuestionIndex];

  // Load saved progress
  useEffect(() => {
    if (savedProgress) {
      if (savedProgress.savedCompletedCategories) {
        setCompletedCategories(savedProgress.savedCompletedCategories);
      }
      if (savedProgress.savedHighScore) {
        setHighScore(savedProgress.savedHighScore);
      }
      
      if (savedProgress.category && !showResult) {
        setShowResumeDialog(true);
      }
    }
  }, [savedProgress, showResult]);

  const handleResume = () => {
    if (savedProgress) {
      const { category, index, currentScore, currentStreak, savedCompletedCategories, savedHighScore } = savedProgress;
      setActiveCategory(category);
      setCurrentQuestionIndex(index || 0);
      setScore(currentScore || 0);
      setStreak(currentStreak || 0);
      setCompletedCategories(savedCompletedCategories || []);
      setHighScore(savedHighScore || 0);
      setShowResumeDialog(false);
      setIsTimerActive(true);
    }
  };

  const handleRestart = () => {
    setShowResumeDialog(false);
    clearProgress();
    resetGame();
  };

  const resetGame = () => {
    clearProgress();
    setActiveCategory(null);
    setCurrentQuestionIndex(0);
    setScore(0);
    setShowResult(false);
    setSelectedAnswer('');
    setIsCorrect(null);
    setStreak(0);
    setShowExplanation(false);
    setTimeLeft(30);
    setIsTimerActive(false);
  };

  // Timer logic
  useEffect(() => {
    let timer;
    if (isTimerActive && timeLeft > 0 && !showResult && !isCorrect && activeCategory) {
      timer = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            handleTimeOut();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isTimerActive, timeLeft, showResult, isCorrect, activeCategory]);

  const handleTimeOut = () => {
    setIsCorrect(false);
    setShowExplanation(true);
    setStreak(0);
    setIsTimerActive(false);
  };

  const handleCategorySelect = (categoryId) => {
    setActiveCategory(categoryId);
    setCurrentQuestionIndex(0);
    setScore(0);
    setShowResult(false);
    setStreak(0);
    setTimeLeft(30);
    setIsTimerActive(true);
  };

  const handleAnswerSubmit = (answer) => {
    if (isCorrect !== null) return;

    const isRight = answer.toLowerCase() === currentQuestion.correctAnswer.toLowerCase() || 
                    (currentQuestion.acceptedAnswers && currentQuestion.acceptedAnswers.includes(answer.toLowerCase()));
    
    setSelectedAnswer(answer);
    setIsCorrect(isRight);
    setShowExplanation(true);
    setIsTimerActive(false);

    if (isRight) {
      const points = Math.round((10 + currentQuestion.difficulty * 5) * (1 + timeLeft / 60));
      setScore(prev => prev + points);
      setStreak(prev => prev + 1);
    } else {
      setStreak(0);
    }

    saveProgress({
      category: activeCategory,
      index: currentQuestionIndex,
      currentScore: score + (isRight ? 10 : 0),
      currentStreak: isRight ? streak + 1 : 0,
      savedCompletedCategories: completedCategories,
      savedHighScore: highScore
    });
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < filteredQuestions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setSelectedAnswer('');
      setIsCorrect(null);
      setShowExplanation(false);
      setTimeLeft(30);
      setIsTimerActive(true);
    } else {
      finishCategory();
    }
  };

  const finishCategory = () => {
    setShowResult(true);
    setIsTimerActive(false);
    
    const maxScore = filteredQuestions.length * 20;
    const percentage = (score / maxScore) * 100;
    
    const newCompletedCategories = percentage >= 80 && !completedCategories.includes(activeCategory)
      ? [...completedCategories, activeCategory]
      : completedCategories;
    const newHighScore = Math.max(highScore, score);
    
    if (percentage >= 80 && !completedCategories.includes(activeCategory)) {
      setCompletedCategories(newCompletedCategories);
    }
    if (score > highScore) {
      setHighScore(newHighScore);
    }
    
    saveProgress({
      savedCompletedCategories: newCompletedCategories,
      savedHighScore: newHighScore
    });
  };

  if (showResumeDialog) {
    return <ResumeDialog show={true} onResume={handleResume} onRestart={handleRestart} />;
  }

  return (
    <div className="hidrocacbon-bg min-h-screen p-4 md:p-8 font-sans">
      <div className="max-w-6xl mx-auto">
        {/* HEADER */}
        <header className="flex items-center justify-between mb-8 bg-white/10 backdrop-blur rounded-2xl p-4 border border-white/20">
          <div className="flex items-center gap-4">
            <Link to="/hoahoc/11" className="p-2 hover:bg-white/10 rounded-full transition-colors text-white">
              <ArrowLeft className="w-6 h-6" />
            </Link>
            <div>
              <h1 className="text-2xl font-bold text-white">
                Hidrocacbon
              </h1>
              <p className="text-indigo-200 text-sm">Hóa học 11 • Chương 5, 6, 7</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 px-4 py-2 bg-yellow-500/20 rounded-full border border-yellow-500/30">
              <Trophy className="w-5 h-5 text-yellow-400" />
              <span className="font-bold text-yellow-200">{score} XP</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-orange-500/20 rounded-full border border-orange-500/30">
              <Flame className="w-5 h-5 text-orange-400" />
              <span className="font-bold text-orange-200">{streak} Chuỗi</span>
            </div>
          </div>
        </header>

        {!activeCategory ? (
          // CATEGORY SELECTION
          <div className="animate-fadeIn">
            <div className="stats-bar-hidro mb-8">
              <div className="stat-item-hidro">
                <CheckCircle2 className="w-5 h-5 text-green-400" />
                <span>Đã hoàn thành: <strong>{completedCategories.length || 0}/{CATEGORIES.length}</strong></span>
              </div>
              <div className="stat-item-hidro">
                <Award className="w-5 h-5 text-yellow-400" />
                <span>Điểm cao nhất: <strong>{highScore || 0}</strong></span>
              </div>
            </div>

            <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <Target className="w-6 h-6" />
              Chọn chủ đề thử thách
            </h2>

            <div className="category-grid-hidro">
              {CATEGORIES.map((cat) => {
                const Icon = cat.icon;
                const isCompleted = completedCategories.includes(cat.id);
                
                return (
                  <div 
                    key={cat.id}
                    onClick={() => handleCategorySelect(cat.id)}
                    className="category-card-hidro group"
                  >
                    <div className={`category-icon-wrapper-hidro ${isCompleted ? 'bg-green-500/20 text-green-400' : ''}`}>
                      <Icon className="w-8 h-8" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-white mb-1 group-hover:text-indigo-300 transition-colors">
                        {cat.name}
                      </h3>
                      <p className="text-sm text-indigo-200 mb-3">{cat.description}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-semibold px-2 py-1 rounded bg-white/10 text-indigo-200">
                          {CHALLENGES.filter(c => c.category === cat.id).length} câu hỏi
                        </span>
                        {isCompleted && <CheckCircle2 className="w-5 h-5 text-green-400" />}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ) : !showResult ? (
          // GAMEPLAY
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center justify-between mb-6 text-white">
              <div className="flex items-center gap-4">
                <button onClick={() => setActiveCategory(null)} className="hover:bg-white/10 p-2 rounded-full transition-colors">
                  <RotateCcw className="w-5 h-5" />
                </button>
                <span className="font-medium text-lg">
                  Câu {currentQuestionIndex + 1}/{filteredQuestions.length}
                </span>
              </div>
              <div className={`flex items-center gap-2 px-4 py-2 rounded-full ${timeLeft < 10 ? 'bg-red-500/20 text-red-200' : 'bg-white/10'}`}>
                <Clock className="w-4 h-4" />
                <span className="font-mono font-bold">{timeLeft}s</span>
              </div>
            </div>

            <div className="progress-track-hidro mb-6">
              <div 
                className="progress-fill-hidro"
                style={{ width: `${((currentQuestionIndex) / filteredQuestions.length) * 100}%` }}
              />
            </div>

            <div className="question-card-hidro">
              <div className="question-header-hidro">
                <span className={`difficulty-badge-hidro ${
                  currentQuestion.difficulty === 1 ? 'difficulty-easy' :
                  currentQuestion.difficulty === 2 ? 'difficulty-medium' : 'difficulty-hard'
                }`}>
                  {currentQuestion.difficulty === 1 ? 'Dễ' :
                   currentQuestion.difficulty === 2 ? 'Trung bình' : 'Khó'}
                </span>
                <div className="flex gap-1">
                  {[...Array(currentQuestion.difficulty)].map((_, i) => (
                    <Zap key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                  ))}
                </div>
              </div>

              <h3 className="text-xl md:text-2xl font-bold text-white mb-6 leading-relaxed">
                {currentQuestion.question}
              </h3>

              {currentQuestion.type === 'multiple-choice' ? (
                <div className="options-grid-hidro">
                  {currentQuestion.options.map((option, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleAnswerSubmit(option)}
                      disabled={isCorrect !== null}
                      className={`option-btn-hidro ${
                        selectedAnswer === option 
                          ? (isCorrect ? 'correct' : 'wrong')
                          : (isCorrect !== null && option === currentQuestion.correctAnswer ? 'correct' : '')
                      }`}
                    >
                      <span className="font-medium">{String.fromCharCode(65 + idx)}. {option}</span>
                      {selectedAnswer === option && (
                        isCorrect ? <CheckCircle2 className="w-5 h-5" /> : <XCircle className="w-5 h-5" />
                      )}
                    </button>
                  ))}
                </div>
              ) : (
                <div className="mb-8">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={selectedAnswer}
                      onChange={(e) => setSelectedAnswer(e.target.value)}
                      disabled={isCorrect !== null}
                      placeholder="Nhập câu trả lời của bạn..."
                      className="flex-1 p-4 bg-white/5 border border-white/20 rounded-xl text-lg text-white focus:border-indigo-500 focus:outline-none"
                      onKeyDown={(e) => e.key === 'Enter' && handleAnswerSubmit(selectedAnswer)}
                    />
                    <button
                      onClick={() => handleAnswerSubmit(selectedAnswer)}
                      disabled={!selectedAnswer || isCorrect !== null}
                      className="px-6 py-2 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Kiểm tra
                    </button>
                  </div>
                </div>
              )}

              {showExplanation && (
                <div className={`feedback-container-hidro ${isCorrect ? 'feedback-correct' : 'feedback-wrong'}`}>
                  <div className="flex items-start gap-3 mb-2">
                    {isCorrect ? <Lightbulb className="w-6 h-6" /> : <AlertTriangle className="w-6 h-6" />}
                    <div>
                      <h4 className="font-bold text-lg mb-1">
                        {isCorrect ? 'Chính xác!' : 'Chưa chính xác'}
                      </h4>
                      <p className="text-sm opacity-90 mb-2">
                        Đáp án đúng: <strong>{currentQuestion.correctAnswer}</strong>
                      </p>
                      <p className="leading-relaxed">{currentQuestion.explanation}</p>
                    </div>
                  </div>
                  
                  <div className="mt-4 flex justify-end">
                    <button
                      onClick={handleNextQuestion}
                      className="flex items-center gap-2 px-6 py-2 bg-white/10 text-white rounded-lg font-bold hover:bg-white/20 transition-colors"
                    >
                      {currentQuestionIndex < filteredQuestions.length - 1 ? 'Câu tiếp theo' : 'Hoàn thành'}
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        ) : (
          // RESULTS SCREEN
          <div className="max-w-2xl mx-auto text-center animate-fadeIn">
            <div className="bg-white/10 backdrop-blur rounded-3xl p-8 shadow-2xl mb-8 border border-white/20">
              <div className="w-24 h-24 bg-yellow-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <Award className="w-12 h-12 text-yellow-400" />
              </div>
              
              <h2 className="text-3xl font-bold text-white mb-2">Hoàn thành xuất sắc!</h2>
              <p className="text-indigo-200 mb-8">Bạn đã hoàn thành chủ đề {CATEGORIES.find(c => c.id === activeCategory)?.name}</p>
              
              <div className="grid grid-cols-3 gap-4 mb-8">
                <div className="p-4 bg-white/5 rounded-2xl border border-white/10">
                  <div className="text-sm text-indigo-200 mb-1">Điểm số</div>
                  <div className="text-2xl font-bold text-green-400">{score}</div>
                </div>
                <div className="p-4 bg-white/5 rounded-2xl border border-white/10">
                  <div className="text-sm text-indigo-200 mb-1">Đúng</div>
                  <div className="text-2xl font-bold text-blue-400">
                    {Math.round((score / (filteredQuestions.length * 20)) * 100)}%
                  </div>
                </div>
                <div className="p-4 bg-white/5 rounded-2xl border border-white/10">
                  <div className="text-sm text-indigo-200 mb-1">Thời gian</div>
                  <div className="text-2xl font-bold text-purple-400">
                    {Math.floor((filteredQuestions.length * 30 - timeLeft) / 60)}m
                  </div>
                </div>
              </div>

              <div className="flex gap-4 justify-center">
                <button
                  onClick={resetGame}
                  className="flex items-center gap-2 px-6 py-3 bg-white/10 text-white rounded-xl font-bold hover:bg-white/20 transition-colors"
                >
                  <RotateCcw className="w-5 h-5" />
                  Làm lại
                </button>
                <button
                  onClick={() => setActiveCategory(null)}
                  className="flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-500/30"
                >
                  Chủ đề khác
                  <ArrowLeft className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Bai05_Hidrocacbon;
