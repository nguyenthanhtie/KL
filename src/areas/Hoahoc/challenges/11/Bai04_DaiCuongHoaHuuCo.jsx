import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowLeft, Trophy, Play, RotateCcw, ChevronRight, ChevronLeft,
  CheckCircle2, XCircle, Lightbulb, HelpCircle, Zap, Award,
  FlaskConical, Beaker, Thermometer, Wind, Droplets, Flame,
  AlertTriangle, Star, Target, Clock, Atom, BookOpen, Share2, Search, Microscope
} from 'lucide-react';
import useChallengeProgress from '../../../../hooks/useChallengeProgress';
import ResumeDialog from '../../../../components/ResumeDialog';
import './CSS/Bai04_DaiCuongHoaHuuCo.css';

// ================== DATA - ĐẠI CƯƠNG HÓA HỮU CƠ ==================
const CATEGORIES = [
  {
    id: 'concepts',
    name: 'Khái niệm & Phân loại',
    icon: BookOpen,
    color: '#10b981',
    description: 'Hợp chất hữu cơ, nhóm chức, đồng đẳng',
    bgGradient: 'from-green-500 to-emerald-500'
  },
  {
    id: 'structure',
    name: 'Cấu trúc phân tử',
    icon: Share2,
    color: '#3b82f6',
    description: 'Liên kết hóa học, đồng phân, cấu tạo',
    bgGradient: 'from-blue-500 to-cyan-500'
  },
  {
    id: 'reactions',
    name: 'Phản ứng hữu cơ',
    icon: FlaskConical,
    color: '#f59e0b',
    description: 'Phản ứng thế, cộng, tách',
    bgGradient: 'from-yellow-500 to-orange-500'
  },
  {
    id: 'analysis',
    name: 'Phân tích nguyên tố',
    icon: Microscope,
    color: '#8b5cf6',
    description: 'Công thức đơn giản nhất, CTPT',
    bgGradient: 'from-purple-500 to-pink-500'
  }
];

const CHALLENGES = [
  // ========== KHÁI NIỆM & PHÂN LOẠI ==========
  {
    id: 1,
    category: 'concepts',
    type: 'multiple-choice',
    difficulty: 1,
    question: 'Hóa học hữu cơ là ngành hóa học nghiên cứu về...',
    options: [
      'Các hợp chất của cacbon (trừ CO, CO2, muối cacbonat...)',
      'Tất cả các hợp chất của cacbon',
      'Các hợp chất của sinh vật sống',
      'Các hợp chất chỉ chứa C và H'
    ],
    correctAnswer: 'Các hợp chất của cacbon (trừ CO, CO2, muối cacbonat...)',
    explanation: 'Hóa học hữu cơ là ngành hóa học nghiên cứu các hợp chất của cacbon, trừ một số chất vô cơ như CO, CO2, muối cacbonat, xianua, cacbua...',
    hint: 'Không phải tất cả hợp chất chứa cacbon đều là hữu cơ.'
  },
  {
    id: 2,
    category: 'concepts',
    type: 'multiple-choice',
    difficulty: 1,
    question: 'Chất nào sau đây là hợp chất hữu cơ?',
    options: ['CaCO3', 'CO2', 'CH4', 'NaCN'],
    correctAnswer: 'CH4',
    explanation: 'CH4 (metan) là hợp chất hữu cơ đơn giản nhất. CaCO3, CO2, NaCN là các hợp chất vô cơ.',
    hint: 'Tìm hidrocacbon.'
  },
  {
    id: 3,
    category: 'concepts',
    type: 'multiple-choice',
    difficulty: 2,
    question: 'Nhóm chức là gì?',
    options: [
      'Nhóm nguyên tử gây ra phản ứng hóa học đặc trưng',
      'Nhóm nguyên tử chứa cacbon',
      'Nhóm nguyên tử liên kết với nhau',
      'Phần còn lại của phân tử sau khi bỏ hydro'
    ],
    correctAnswer: 'Nhóm nguyên tử gây ra phản ứng hóa học đặc trưng',
    explanation: 'Nhóm chức là nguyên tử hoặc nhóm nguyên tử gây ra những tính chất hóa học đặc trưng của hợp chất hữu cơ.',
    hint: 'Ví dụ: nhóm -OH trong ancol.'
  },
  
  // ========== CẤU TRÚC PHÂN TỬ ==========
  {
    id: 4,
    category: 'structure',
    type: 'fill-blank',
    difficulty: 1,
    question: 'Trong hợp chất hữu cơ, cacbon luôn có hóa trị ___',
    correctAnswer: '4',
    acceptedAnswers: ['4', 'IV', 'bốn'],
    explanation: 'Trong các hợp chất hữu cơ, nguyên tử cacbon luôn có hóa trị IV.',
    hint: 'Số liên kết tối đa mà một nguyên tử cacbon có thể tạo ra.'
  },
  {
    id: 5,
    category: 'structure',
    type: 'multiple-choice',
    difficulty: 2,
    question: 'Hiện tượng các chất có cùng công thức phân tử nhưng cấu tạo khác nhau gọi là...',
    options: ['Đồng đẳng', 'Đồng phân', 'Đồng vị', 'Đồng khối'],
    correctAnswer: 'Đồng phân',
    explanation: 'Đồng phân là hiện tượng các chất có cùng công thức phân tử nhưng cấu tạo hóa học khác nhau nên tính chất khác nhau.',
    hint: 'Cùng CTPT, khác CTCT.'
  },
  {
    id: 6,
    category: 'structure',
    type: 'multiple-choice',
    difficulty: 2,
    question: 'Liên kết hóa học chủ yếu trong hợp chất hữu cơ là...',
    options: ['Liên kết cộng hóa trị', 'Liên kết ion', 'Liên kết kim loại', 'Liên kết hydro'],
    correctAnswer: 'Liên kết cộng hóa trị',
    explanation: 'Liên kết trong phân tử hợp chất hữu cơ chủ yếu là liên kết cộng hóa trị.',
    hint: 'Liên kết giữa các phi kim.'
  },

  // ========== PHẢN ỨNG HỮU CƠ ==========
  {
    id: 7,
    category: 'reactions',
    type: 'multiple-choice',
    difficulty: 2,
    question: 'Phản ứng trong đó một nguyên tử hoặc nhóm nguyên tử trong phân tử hữu cơ bị thay thế bởi một nguyên tử hoặc nhóm nguyên tử khác gọi là...',
    options: ['Phản ứng thế', 'Phản ứng cộng', 'Phản ứng tách', 'Phản ứng phân hủy'],
    correctAnswer: 'Phản ứng thế',
    explanation: 'Đây là định nghĩa của phản ứng thế.',
    hint: 'Thay thế cái này bằng cái kia.'
  },
  {
    id: 8,
    category: 'reactions',
    type: 'multiple-choice',
    difficulty: 2,
    question: 'Phản ứng đặc trưng của liên kết đôi C=C là...',
    options: ['Phản ứng thế', 'Phản ứng cộng', 'Phản ứng tách', 'Phản ứng cháy'],
    correctAnswer: 'Phản ứng cộng',
    explanation: 'Liên kết đôi (gồm 1 liên kết sigma bền và 1 liên kết pi kém bền) dễ tham gia phản ứng cộng để phá vỡ liên kết pi.',
    hint: 'Làm no hóa liên kết.'
  },

  // ========== PHÂN TÍCH NGUYÊN TỐ ==========
  {
    id: 9,
    category: 'analysis',
    type: 'multiple-choice',
    difficulty: 2,
    question: 'Công thức đơn giản nhất cho biết...',
    options: [
      'Tỉ lệ tối giản về số nguyên tử của các nguyên tố',
      'Số lượng nguyên tử chính xác của mỗi nguyên tố',
      'Khối lượng phân tử',
      'Cấu trúc phân tử'
    ],
    correctAnswer: 'Tỉ lệ tối giản về số nguyên tử của các nguyên tố',
    explanation: 'Công thức đơn giản nhất biểu thị tỉ lệ tối giản về số nguyên tử của các nguyên tố trong phân tử.',
    hint: 'Ví dụ: CH là CTĐGN của C2H2 và C6H6.'
  },
  {
    id: 10,
    category: 'analysis',
    type: 'fill-blank',
    difficulty: 3,
    question: 'Một hợp chất hữu cơ có CTĐGN là CH2O và khối lượng mol là 60 g/mol. Công thức phân tử là ___',
    correctAnswer: 'C2H4O2',
    acceptedAnswers: ['C2H4O2', 'c2h4o2'],
    explanation: '(CH2O)n = 60 => (12 + 2 + 16)n = 60 => 30n = 60 => n = 2. CTPT là C2H4O2.',
    hint: 'Tính n từ phương trình: M(CH2O) * n = 60.'
  }
];

const Bai04_DaiCuongHoaHuuCo = () => {
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

  const { hasProgress, savedProgress, saveProgress, clearProgress, getProgress, completeChallenge } = useChallengeProgress('dai_cuong_hoa_huu_co_11', {
    challengeId: 4,
    programId: 'chemistry',
    grade: 11
  });

  // States for completion tracking
  const [startTime] = useState(() => Date.now());
  const [isCompleted, setIsCompleted] = useState(false);

  // Filter questions by category
  const filteredQuestions = activeCategory 
    ? CHALLENGES.filter(q => q.category === activeCategory)
    : [];

  const currentQuestion = filteredQuestions[currentQuestionIndex];

  // Load saved progress
  useEffect(() => {
    // Load persistent data (completedCategories, highScore)
    if (savedProgress) {
      if (savedProgress.savedCompletedCategories) {
        setCompletedCategories(savedProgress.savedCompletedCategories);
      }
      if (savedProgress.savedHighScore) {
        setHighScore(savedProgress.savedHighScore);
      }
      
      // Only show resume dialog if there's an active category (not finished)
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
    if (isCorrect !== null) return; // Prevent multiple submissions

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
      
      // Play sound effect here if available
    } else {
      setStreak(0);
    }

    // Save progress
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
    const percentage = Math.round((score / maxScore) * 100);
    
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
    
    // Save only persistent data, clear active progress
    saveProgress({
      savedCompletedCategories: newCompletedCategories,
      savedHighScore: newHighScore
    });

    // Lưu kết quả khi hoàn thành category
    if (!isCompleted) {
      setIsCompleted(true);
      const stars = percentage >= 80 ? 3 : percentage >= 50 ? 2 : 1;
      completeChallenge({
        score,
        maxScore,
        percentage,
        stars,
        timeSpent: Math.floor((Date.now() - startTime) / 1000),
        correctAnswers: Math.round(score / 10),
        totalQuestions: filteredQuestions.length
      });
    }
  };

  if (showResumeDialog) {
    return <ResumeDialog show={true} onResume={handleResume} onRestart={handleRestart} />;
  }

  return (
    <div className="huuco-bg min-h-screen p-4 md:p-8 font-sans text-slate-800">
      <div className="max-w-6xl mx-auto">
        {/* HEADER */}
        <header className="flex items-center justify-between mb-8 bg-white/90 backdrop-blur rounded-2xl p-4 shadow-lg">
          <div className="flex items-center gap-4">
            <Link to="/hoahoc/11" className="p-2 hover:bg-slate-100 rounded-full transition-colors">
              <ArrowLeft className="w-6 h-6 text-slate-600" />
            </Link>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-green-600 to-teal-600 bg-clip-text text-transparent">
                Đại Cương Hóa Hữu Cơ
              </h1>
              <p className="text-slate-500 text-sm">Hóa học 11 • Chương 4</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 px-4 py-2 bg-yellow-50 rounded-full border border-yellow-200">
              <Trophy className="w-5 h-5 text-yellow-500" />
              <span className="font-bold text-yellow-700">{score} XP</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-orange-50 rounded-full border border-orange-200">
              <Flame className="w-5 h-5 text-orange-500" />
              <span className="font-bold text-orange-700">{streak} Chuỗi</span>
            </div>
          </div>
        </header>

        {!activeCategory ? (
          // CATEGORY SELECTION
          <div className="animate-fadeIn">
            <div className="stats-bar-huuco mb-8">
              <div className="stat-item-huuco">
                <CheckCircle2 className="w-5 h-5 text-green-500" />
                <span>Đã hoàn thành: <strong>{completedCategories.length || 0}/{CATEGORIES.length}</strong></span>
              </div>
              <div className="stat-item-huuco">
                <Star className="w-5 h-5 text-yellow-500" />
                <span>Điểm cao nhất: <strong>{highScore || 0}</strong></span>
              </div>
            </div>

            <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <Target className="w-6 h-6" />
              Chọn chủ đề thử thách
            </h2>

            <div className="category-grid-huuco">
              {CATEGORIES.map((cat) => {
                const Icon = cat.icon;
                const isCompleted = completedCategories.includes(cat.id);
                
                return (
                  <div 
                    key={cat.id}
                    onClick={() => handleCategorySelect(cat.id)}
                    className="category-card-huuco group"
                  >
                    <div className={`category-icon-wrapper-huuco ${isCompleted ? 'bg-green-100 text-green-600' : ''}`}>
                      <Icon className="w-8 h-8" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-slate-800 mb-1 group-hover:text-green-600 transition-colors">
                        {cat.name}
                      </h3>
                      <p className="text-sm text-slate-500 mb-3">{cat.description}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-semibold px-2 py-1 rounded bg-slate-100 text-slate-600">
                          {CHALLENGES.filter(c => c.category === cat.id).length} câu hỏi
                        </span>
                        {isCompleted && <CheckCircle2 className="w-5 h-5 text-green-500" />}
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
            {/* Progress & Timer */}
            <div className="flex items-center justify-between mb-6 text-white">
              <div className="flex items-center gap-4">
                <button onClick={() => setActiveCategory(null)} className="hover:bg-white/10 p-2 rounded-full transition-colors">
                  <RotateCcw className="w-5 h-5" />
                </button>
                <span className="font-medium text-lg">
                  Câu {currentQuestionIndex + 1}/{filteredQuestions.length}
                </span>
              </div>
              <div className={`flex items-center gap-2 px-4 py-2 rounded-full ${timeLeft < 10 ? 'bg-red-500/20 text-red-100' : 'bg-white/20'}`}>
                <Clock className="w-4 h-4" />
                <span className="font-mono font-bold">{timeLeft}s</span>
              </div>
            </div>

            <div className="progress-track-huuco mb-6">
              <div 
                className="progress-fill-huuco"
                style={{ width: `${((currentQuestionIndex) / filteredQuestions.length) * 100}%` }}
              />
            </div>

            <div className="question-card-huuco">
              <div className="question-header-huuco">
                <span className={`difficulty-badge-huuco ${
                  currentQuestion.difficulty === 1 ? 'difficulty-easy' :
                  currentQuestion.difficulty === 2 ? 'difficulty-medium' : 'difficulty-hard'
                }`}>
                  {currentQuestion.difficulty === 1 ? 'Dễ' :
                   currentQuestion.difficulty === 2 ? 'Trung bình' : 'Khó'}
                </span>
                <div className="flex gap-1">
                  {[...Array(currentQuestion.difficulty)].map((_, i) => (
                    <Zap key={i} className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                  ))}
                </div>
              </div>

              <h3 className="text-xl md:text-2xl font-bold text-slate-800 mb-6 leading-relaxed">
                {currentQuestion.question}
              </h3>

              {currentQuestion.type === 'multiple-choice' ? (
                <div className="options-grid-huuco">
                  {currentQuestion.options.map((option, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleAnswerSubmit(option)}
                      disabled={isCorrect !== null}
                      className={`option-btn-huuco ${
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
                      className="flex-1 p-4 border-2 border-slate-200 rounded-xl text-lg focus:border-green-500 focus:outline-none"
                      onKeyDown={(e) => e.key === 'Enter' && handleAnswerSubmit(selectedAnswer)}
                    />
                    <button
                      onClick={() => handleAnswerSubmit(selectedAnswer)}
                      disabled={!selectedAnswer || isCorrect !== null}
                      className="px-6 py-2 bg-green-600 text-white rounded-xl font-bold hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Kiểm tra
                    </button>
                  </div>
                </div>
              )}

              {/* Explanation */}
              {showExplanation && (
                <div className={`feedback-container-huuco ${isCorrect ? 'feedback-correct' : 'feedback-wrong'}`}>
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
                      className="flex items-center gap-2 px-6 py-2 bg-slate-800 text-white rounded-lg font-bold hover:bg-slate-700 transition-colors"
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
            <div className="bg-white rounded-3xl p-8 shadow-2xl mb-8">
              <div className="w-24 h-24 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Award className="w-12 h-12 text-yellow-600" />
              </div>
              
              <h2 className="text-3xl font-bold text-slate-800 mb-2">Hoàn thành xuất sắc!</h2>
              <p className="text-slate-500 mb-8">Bạn đã hoàn thành chủ đề {CATEGORIES.find(c => c.id === activeCategory)?.name}</p>
              
              <div className="grid grid-cols-3 gap-4 mb-8">
                <div className="p-4 bg-slate-50 rounded-2xl">
                  <div className="text-sm text-slate-500 mb-1">Điểm số</div>
                  <div className="text-2xl font-bold text-green-600">{score}</div>
                </div>
                <div className="p-4 bg-slate-50 rounded-2xl">
                  <div className="text-sm text-slate-500 mb-1">Đúng</div>
                  <div className="text-2xl font-bold text-blue-600">
                    {Math.round((score / (filteredQuestions.length * 20)) * 100)}%
                  </div>
                </div>
                <div className="p-4 bg-slate-50 rounded-2xl">
                  <div className="text-sm text-slate-500 mb-1">Thời gian</div>
                  <div className="text-2xl font-bold text-purple-600">
                    {Math.floor((filteredQuestions.length * 30 - timeLeft) / 60)}m
                  </div>
                </div>
              </div>

              <div className="flex gap-4 justify-center">
                <button
                  onClick={resetGame}
                  className="flex items-center gap-2 px-6 py-3 bg-slate-100 text-slate-700 rounded-xl font-bold hover:bg-slate-200 transition-colors"
                >
                  <RotateCcw className="w-5 h-5" />
                  Làm lại
                </button>
                <button
                  onClick={() => setActiveCategory(null)}
                  className="flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-xl font-bold hover:bg-green-700 transition-colors shadow-lg shadow-green-200"
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

export default Bai04_DaiCuongHoaHuuCo;
