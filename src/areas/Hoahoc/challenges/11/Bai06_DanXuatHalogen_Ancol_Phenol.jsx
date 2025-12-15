import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowLeft, Trophy, RotateCcw, ChevronRight,
  CheckCircle2, XCircle, Lightbulb, Zap, Award,
  FlaskConical, Droplets, Atom, TestTube, Beaker,
  Clock, Target, AlertTriangle, Microscope
} from 'lucide-react';
import useChallengeProgress from '../../../../hooks/useChallengeProgress';
import ResumeDialog from '../../../../components/ResumeDialog';
import './CSS/Bai06_DanXuatHalogen_Ancol_Phenol.css';

// ================== DATA - DẪN XUẤT HALOGEN - ANCOL - PHENOL ==================
const CATEGORIES = [
  {
    id: 'halogen',
    name: 'Dẫn xuất Halogen',
    icon: Atom,
    color: '#22d3ee',
    description: 'R-X, tính chất và ứng dụng',
    bgGradient: 'from-cyan-500 to-blue-500'
  },
  {
    id: 'alcohol',
    name: 'Ancol (Rượu)',
    icon: Droplets,
    color: '#34d399',
    description: 'R-OH, phân loại, đồng phân, danh pháp',
    bgGradient: 'from-emerald-500 to-green-500'
  },
  {
    id: 'phenol',
    name: 'Phenol',
    icon: FlaskConical,
    color: '#f472b6',
    description: 'C6H5OH, tính axit, phản ứng thế',
    bgGradient: 'from-pink-500 to-rose-500'
  },
  {
    id: 'reactions',
    name: 'Phản ứng & Nhận biết',
    icon: TestTube,
    color: '#fbbf24',
    description: 'Phản ứng đặc trưng, thuốc thử',
    bgGradient: 'from-amber-500 to-yellow-500'
  }
];

const CHALLENGES = [
  // ========== DẪN XUẤT HALOGEN ==========
  {
    id: 1,
    category: 'halogen',
    type: 'multiple-choice',
    difficulty: 1,
    question: 'Dẫn xuất halogen là sản phẩm khi thay thế nguyên tử hidro trong phân tử hidrocacbon bằng nguyên tử...',
    options: ['Oxi', 'Nitơ', 'Halogen', 'Lưu huỳnh'],
    correctAnswer: 'Halogen',
    explanation: 'Dẫn xuất halogen là hợp chất hữu cơ có chứa nguyên tố halogen (F, Cl, Br, I) liên kết với gốc hidrocacbon.',
    hint: 'Tên gọi đã gợi ý câu trả lời.'
  },
  {
    id: 2,
    category: 'halogen',
    type: 'multiple-choice',
    difficulty: 2,
    question: 'Phản ứng đặc trưng của dẫn xuất halogen là...',
    options: ['Phản ứng thế nguyên tử halogen bằng nhóm -OH', 'Phản ứng cộng', 'Phản ứng trùng hợp', 'Phản ứng este hóa'],
    correctAnswer: 'Phản ứng thế nguyên tử halogen bằng nhóm -OH',
    explanation: 'Dẫn xuất halogen dễ tham gia phản ứng thế nguyên tử halogen bằng nhóm -OH khi đun nóng với dung dịch kiềm (NaOH, KOH).',
    hint: 'Thủy phân trong môi trường kiềm.'
  },

  // ========== ANCOL ==========
  {
    id: 3,
    category: 'alcohol',
    type: 'multiple-choice',
    difficulty: 1,
    question: 'Nhóm chức của ancol là...',
    options: ['-COOH', '-CHO', '-OH', '-NH2'],
    correctAnswer: '-OH',
    explanation: 'Ancol là hợp chất hữu cơ có nhóm hiđroxyl (-OH) liên kết trực tiếp với nguyên tử cacbon no.',
    hint: 'Nhóm hiđroxyl.'
  },
  {
    id: 4,
    category: 'alcohol',
    type: 'fill-blank',
    difficulty: 2,
    question: 'Tên thay thế của ancol etylic (C2H5OH) là ___',
    correctAnswer: 'etanol',
    acceptedAnswers: ['etanol', 'ethanol'],
    explanation: 'Tên thay thế = Tên hidrocacbon tương ứng + ol. Etan + ol = Etanol.',
    hint: 'Bỏ đuôi -an thêm đuôi -ol.'
  },
  {
    id: 5,
    category: 'alcohol',
    type: 'multiple-choice',
    difficulty: 2,
    question: 'Ancol nào sau đây là ancol đa chức?',
    options: ['Metanol', 'Etanol', 'Glixerol', 'Propan-1-ol'],
    correctAnswer: 'Glixerol',
    explanation: 'Glixerol (C3H5(OH)3) có 3 nhóm -OH nên là ancol đa chức (poliancol).',
    hint: 'Có nhiều hơn 1 nhóm -OH.'
  },

  // ========== PHENOL ==========
  {
    id: 6,
    category: 'phenol',
    type: 'multiple-choice',
    difficulty: 2,
    question: 'Phenol (C6H5OH) có tính chất hóa học nào khác biệt so với ancol?',
    options: ['Tính bazơ', 'Tính axit yếu', 'Tính oxi hóa', 'Tính khử mạnh'],
    correctAnswer: 'Tính axit yếu',
    explanation: 'Do ảnh hưởng của vòng benzen, liên kết O-H trong phenol phân cực mạnh hơn ancol, làm cho phenol có tính axit yếu (tác dụng được với NaOH).',
    hint: 'Phenol làm quỳ tím hóa đỏ không?'
  },
  {
    id: 7,
    category: 'phenol',
    type: 'multiple-choice',
    difficulty: 2,
    question: 'Hiện tượng khi cho nước brom vào dung dịch phenol là...',
    options: ['Không có hiện tượng', 'Dung dịch chuyển màu xanh', 'Xuất hiện kết tủa trắng', 'Có khí thoát ra'],
    correctAnswer: 'Xuất hiện kết tủa trắng',
    explanation: 'Phenol phản ứng thế với dung dịch brom tạo thành 2,4,6-tribromphenol kết tủa trắng.',
    hint: 'Phản ứng dùng để nhận biết phenol.'
  },

  // ========== PHẢN ỨNG & NHẬN BIẾT ==========
  {
    id: 8,
    category: 'reactions',
    type: 'multiple-choice',
    difficulty: 3,
    question: 'Để phân biệt etanol và glixerol, ta dùng thuốc thử nào?',
    options: ['Na', 'Cu(OH)2', 'Dung dịch Brom', 'AgNO3/NH3'],
    correctAnswer: 'Cu(OH)2',
    explanation: 'Glixerol là ancol đa chức có các nhóm -OH liền kề nên hòa tan được Cu(OH)2 tạo dung dịch màu xanh lam đặc trưng. Etanol không có phản ứng này.',
    hint: 'Phản ứng tạo phức màu xanh lam.'
  },
  {
    id: 9,
    category: 'reactions',
    type: 'fill-blank',
    difficulty: 2,
    question: 'Sản phẩm chính khi tách nước từ butan-2-ol ở 170°C, xúc tác H2SO4 đặc là ___',
    correctAnswer: 'but-2-en',
    acceptedAnswers: ['but-2-en', '2-buten'],
    explanation: 'Theo quy tắc Zaitsev, nhóm -OH tách cùng với H ở cacbon bậc cao hơn bên cạnh để tạo anken có nhiều nhóm thế hơn (bền hơn).',
    hint: 'Quy tắc Zaitsev.'
  },
  {
    id: 10,
    category: 'reactions',
    type: 'multiple-choice',
    difficulty: 2,
    question: 'Ancol etylic có thể được điều chế trực tiếp từ chất nào sau đây bằng một phản ứng?',
    options: ['Metan', 'Etilen', 'Axetilen', 'Benzen'],
    correctAnswer: 'Etilen',
    explanation: 'C2H4 + H2O (xúc tác axit) → C2H5OH. Đây là phương pháp hidrat hóa anken.',
    hint: 'Cộng nước vào anken.'
  }
];

const Bai06_DanXuatHalogen_Ancol_Phenol = () => {
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

  const { hasProgress, savedProgress, saveProgress, clearProgress } = useChallengeProgress('dan_xuat_halogen_ancol_phenol_11', {
    challengeId: 'dan_xuat_halogen_ancol_phenol_11',
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
    <div className="ancol-bg min-h-screen p-4 md:p-8 font-sans">
      <div className="max-w-6xl mx-auto">
        {/* HEADER */}
        <header className="flex items-center justify-between mb-8 bg-white/10 backdrop-blur rounded-2xl p-4 border border-white/20">
          <div className="flex items-center gap-4">
            <Link to="/hoahoc/11" className="p-2 hover:bg-white/10 rounded-full transition-colors text-white">
              <ArrowLeft className="w-6 h-6" />
            </Link>
            <div>
              <h1 className="text-2xl font-bold text-white">
                Dẫn xuất Halogen - Ancol - Phenol
              </h1>
              <p className="text-cyan-100 text-sm">Hóa học 11 • Chương 8</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 px-4 py-2 bg-yellow-500/20 rounded-full border border-yellow-500/30">
              <Trophy className="w-5 h-5 text-yellow-400" />
              <span className="font-bold text-yellow-200">{score} XP</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-orange-500/20 rounded-full border border-orange-500/30">
              <Zap className="w-5 h-5 text-orange-400" />
              <span className="font-bold text-orange-200">{streak} Chuỗi</span>
            </div>
          </div>
        </header>

        {!activeCategory ? (
          // CATEGORY SELECTION
          <div className="animate-fadeIn">
            <div className="stats-bar-ancol mb-8">
              <div className="stat-item-ancol">
                <CheckCircle2 className="w-5 h-5 text-green-400" />
                <span>Đã hoàn thành: <strong>{completedCategories.length || 0}/{CATEGORIES.length}</strong></span>
              </div>
              <div className="stat-item-ancol">
                <Award className="w-5 h-5 text-yellow-400" />
                <span>Điểm cao nhất: <strong>{highScore || 0}</strong></span>
              </div>
            </div>

            <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <Target className="w-6 h-6" />
              Chọn chủ đề thử thách
            </h2>

            <div className="category-grid-ancol">
              {CATEGORIES.map((cat) => {
                const Icon = cat.icon;
                const isCompleted = completedCategories.includes(cat.id);
                
                return (
                  <div 
                    key={cat.id}
                    onClick={() => handleCategorySelect(cat.id)}
                    className="category-card-ancol group"
                  >
                    <div className={`category-icon-wrapper-ancol ${isCompleted ? 'bg-green-500/20 text-green-400' : ''}`}>
                      <Icon className="w-8 h-8" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-white mb-1 group-hover:text-cyan-300 transition-colors">
                        {cat.name}
                      </h3>
                      <p className="text-sm text-cyan-100 mb-3">{cat.description}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-semibold px-2 py-1 rounded bg-white/10 text-cyan-100">
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

            <div className="progress-track-ancol mb-6">
              <div 
                className="progress-fill-ancol"
                style={{ width: `${((currentQuestionIndex) / filteredQuestions.length) * 100}%` }}
              />
            </div>

            <div className="question-card-ancol">
              <div className="question-header-ancol">
                <span className={`difficulty-badge-ancol ${
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
                <div className="options-grid-ancol">
                  {currentQuestion.options.map((option, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleAnswerSubmit(option)}
                      disabled={isCorrect !== null}
                      className={`option-btn-ancol ${
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
                      className="flex-1 p-4 bg-white/5 border border-white/20 rounded-xl text-lg text-white focus:border-cyan-500 focus:outline-none"
                      onKeyDown={(e) => e.key === 'Enter' && handleAnswerSubmit(selectedAnswer)}
                    />
                    <button
                      onClick={() => handleAnswerSubmit(selectedAnswer)}
                      disabled={!selectedAnswer || isCorrect !== null}
                      className="px-6 py-2 bg-cyan-600 text-white rounded-xl font-bold hover:bg-cyan-700 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Kiểm tra
                    </button>
                  </div>
                </div>
              )}

              {showExplanation && (
                <div className={`feedback-container-ancol ${isCorrect ? 'feedback-correct' : 'feedback-wrong'}`}>
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
              <p className="text-cyan-100 mb-8">Bạn đã hoàn thành chủ đề {CATEGORIES.find(c => c.id === activeCategory)?.name}</p>
              
              <div className="grid grid-cols-3 gap-4 mb-8">
                <div className="p-4 bg-white/5 rounded-2xl border border-white/10">
                  <div className="text-sm text-cyan-100 mb-1">Điểm số</div>
                  <div className="text-2xl font-bold text-green-400">{score}</div>
                </div>
                <div className="p-4 bg-white/5 rounded-2xl border border-white/10">
                  <div className="text-sm text-cyan-100 mb-1">Đúng</div>
                  <div className="text-2xl font-bold text-blue-400">
                    {Math.round((score / (filteredQuestions.length * 20)) * 100)}%
                  </div>
                </div>
                <div className="p-4 bg-white/5 rounded-2xl border border-white/10">
                  <div className="text-sm text-cyan-100 mb-1">Thời gian</div>
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
                  className="flex items-center gap-2 px-6 py-3 bg-cyan-600 text-white rounded-xl font-bold hover:bg-cyan-700 transition-colors shadow-lg shadow-cyan-500/30"
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

export default Bai06_DanXuatHalogen_Ancol_Phenol;
