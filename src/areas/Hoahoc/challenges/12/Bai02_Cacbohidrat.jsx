import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowLeft, Trophy, RotateCcw, ChevronRight,
  CheckCircle2, XCircle, Lightbulb, Zap, Award,
  Wheat, Apple, Candy, Cookie, Leaf,
  Clock, Target, AlertTriangle, Flame
} from 'lucide-react';
import useChallengeProgress from '../../../../hooks/useChallengeProgress';
import ResumeDialog from '../../../../components/ResumeDialog';
import './CSS/Bai02_Cacbohidrat.css';

// ================== DATA - CACBOHIĐRAT ==================
const CATEGORIES = [
  {
    id: 'glucose',
    name: 'Glucozơ',
    icon: Apple,
    color: '#ef4444',
    description: 'Cấu tạo, tính chất của glucozơ',
    bgGradient: 'from-red-500 to-orange-500'
  },
  {
    id: 'saccharose',
    name: 'Saccarozơ',
    icon: Candy,
    color: '#ec4899',
    description: 'Đường mía - disaccarit',
    bgGradient: 'from-pink-500 to-rose-500'
  },
  {
    id: 'starch',
    name: 'Tinh bột',
    icon: Wheat,
    color: '#f59e0b',
    description: 'Polisaccarit dự trữ năng lượng',
    bgGradient: 'from-amber-500 to-yellow-500'
  },
  {
    id: 'cellulose',
    name: 'Xenlulozơ',
    icon: Leaf,
    color: '#22c55e',
    description: 'Polisaccarit cấu trúc',
    bgGradient: 'from-green-500 to-emerald-500'
  }
];

const CHALLENGES = [
  // ========== GLUCOZƠ ==========
  {
    id: 1,
    category: 'glucose',
    type: 'multiple-choice',
    difficulty: 1,
    question: 'Công thức phân tử của glucozơ là...',
    options: ['C6H12O6', 'C12H22O11', 'C6H10O5', 'C5H10O5'],
    correctAnswer: 'C6H12O6',
    explanation: 'Glucozơ có công thức phân tử C6H12O6, là monosaccarit quan trọng nhất. Glucozơ còn gọi là đường nho vì có nhiều trong quả nho chín.',
    hint: 'Monosaccarit 6 cacbon.'
  },
  {
    id: 2,
    category: 'glucose',
    type: 'multiple-choice',
    difficulty: 1,
    question: 'Glucozơ thuộc loại cacbohiđrat nào?',
    options: ['Monosaccarit', 'Disaccarit', 'Polisaccarit', 'Oligosaccarit'],
    correctAnswer: 'Monosaccarit',
    explanation: 'Glucozơ là monosaccarit (đường đơn) vì không thể thủy phân thành cacbohiđrat đơn giản hơn.',
    hint: 'Đường đơn giản nhất.'
  },
  {
    id: 3,
    category: 'glucose',
    type: 'multiple-choice',
    difficulty: 2,
    question: 'Glucozơ có phản ứng tráng bạc vì trong phân tử có nhóm...',
    options: ['-CHO (anđehit)', '-COOH (cacboxyl)', '-CO- (xeton)', '-OH (hiđroxyl)'],
    correctAnswer: '-CHO (anđehit)',
    explanation: 'Glucozơ là anđehit đa chức, có nhóm -CHO nên có phản ứng tráng bạc (tráng gương): CH2OH-(CHOH)4-CHO + 2AgNO3 + 3NH3 + H2O → CH2OH-(CHOH)4-COONH4 + 2Ag↓ + 2NH4NO3',
    hint: 'Nhóm chức đặc trưng của anđehit.'
  },
  {
    id: 4,
    category: 'glucose',
    type: 'fill-blank',
    difficulty: 2,
    question: 'Glucozơ lên men rượu tạo thành ___ và CO2',
    correctAnswer: 'ancol etylic',
    acceptedAnswers: ['ancol etylic', 'etanol', 'rượu etylic', 'C2H5OH', 'ethanol'],
    explanation: 'C6H12O6 --enzim--> 2C2H5OH + 2CO2↑. Đây là quá trình lên men rượu, xảy ra nhờ enzim trong men rượu.',
    hint: 'Sản phẩm chính của quá trình lên men.'
  },
  {
    id: 5,
    category: 'glucose',
    type: 'multiple-choice',
    difficulty: 3,
    question: 'Cho 18 gam glucozơ phản ứng hoàn toàn với AgNO3/NH3 dư. Khối lượng Ag thu được là...',
    options: ['21,6 gam', '10,8 gam', '43,2 gam', '5,4 gam'],
    correctAnswer: '21,6 gam',
    explanation: 'nglucozơ = 18/180 = 0,1 mol. Glucozơ + 2Ag+ → 2Ag. nAg = 2 × 0,1 = 0,2 mol. mAg = 0,2 × 108 = 21,6 gam.',
    hint: 'Tỉ lệ mol glucozơ : Ag = 1 : 2.'
  },

  // ========== SACCAROZƠ ==========
  {
    id: 6,
    category: 'saccharose',
    type: 'multiple-choice',
    difficulty: 1,
    question: 'Saccarozơ là đường có nhiều trong...',
    options: ['Mía, củ cải đường', 'Sữa động vật', 'Mạch nha', 'Quả nho'],
    correctAnswer: 'Mía, củ cải đường',
    explanation: 'Saccarozơ (đường mía) có nhiều trong cây mía (khoảng 13-15%) và củ cải đường (khoảng 15-20%). Đây là loại đường phổ biến nhất trong đời sống.',
    hint: 'Đường mía.'
  },
  {
    id: 7,
    category: 'saccharose',
    type: 'multiple-choice',
    difficulty: 2,
    question: 'Saccarozơ được cấu tạo từ...',
    options: [
      '1 gốc α-glucozơ và 1 gốc β-fructozơ',
      '2 gốc α-glucozơ',
      '1 gốc glucozơ và 1 gốc galactozơ',
      '2 gốc fructozơ'
    ],
    correctAnswer: '1 gốc α-glucozơ và 1 gốc β-fructozơ',
    explanation: 'Saccarozơ là disaccarit được tạo thành từ 1 gốc α-glucozơ và 1 gốc β-fructozơ liên kết với nhau qua liên kết 1,2-glicozit.',
    hint: 'Có 2 loại monosaccarit khác nhau.'
  },
  {
    id: 8,
    category: 'saccharose',
    type: 'multiple-choice',
    difficulty: 2,
    question: 'Saccarozơ KHÔNG có phản ứng tráng bạc vì...',
    options: [
      'Không có nhóm -CHO tự do',
      'Không tan trong nước',
      'Là polisaccarit',
      'Có cấu trúc vòng bền'
    ],
    correctAnswer: 'Không có nhóm -CHO tự do',
    explanation: 'Saccarozơ không có nhóm -CHO tự do (nhóm -CHO của glucozơ và nhóm -CO của fructozơ đã tham gia liên kết glicozit), nên không có tính khử, không phản ứng tráng bạc.',
    hint: 'Liên quan đến nhóm chức.'
  },
  {
    id: 9,
    category: 'saccharose',
    type: 'fill-blank',
    difficulty: 2,
    question: 'Thủy phân saccarozơ thu được glucozơ và ___',
    correctAnswer: 'fructozơ',
    acceptedAnswers: ['fructozơ', 'fructose', 'fructozo'],
    explanation: 'C12H22O11 + H2O --H+, t°--> C6H12O6 (glucozơ) + C6H12O6 (fructozơ). Sản phẩm thủy phân là hỗn hợp glucozơ và fructozơ gọi là đường nghịch đảo.',
    hint: 'Đường có trong mật ong.'
  },

  // ========== TINH BỘT ==========
  {
    id: 10,
    category: 'starch',
    type: 'multiple-choice',
    difficulty: 1,
    question: 'Tinh bột thuộc loại cacbohiđrat nào?',
    options: ['Polisaccarit', 'Monosaccarit', 'Disaccarit', 'Oligosaccarit'],
    correctAnswer: 'Polisaccarit',
    explanation: 'Tinh bột là polisaccarit (đa đường), được cấu tạo từ nhiều gốc α-glucozơ liên kết với nhau.',
    hint: 'Đường đa.'
  },
  {
    id: 11,
    category: 'starch',
    type: 'multiple-choice',
    difficulty: 2,
    question: 'Tinh bột gồm 2 thành phần là...',
    options: ['Amilozơ và amilopectin', 'Glucozơ và fructozơ', 'Xenlulozơ và lignin', 'Mantozơ và glucozơ'],
    correctAnswer: 'Amilozơ và amilopectin',
    explanation: 'Tinh bột gồm: Amilozơ (20-30%): mạch không phân nhánh, tan trong nước nóng. Amilopectin (70-80%): mạch phân nhánh, không tan trong nước.',
    hint: 'Hai cấu trúc khác nhau.'
  },
  {
    id: 12,
    category: 'starch',
    type: 'fill-blank',
    difficulty: 1,
    question: 'Tinh bột tác dụng với dung dịch iot cho màu ___',
    correctAnswer: 'xanh tím',
    acceptedAnswers: ['xanh tím', 'xanh', 'tím', 'xanh-tím'],
    explanation: 'Phản ứng màu với iot là phản ứng đặc trưng để nhận biết tinh bột. Amilozơ tạo màu xanh đậm, amilopectin tạo màu tím đỏ.',
    hint: 'Phản ứng nhận biết tinh bột.'
  },
  {
    id: 13,
    category: 'starch',
    type: 'multiple-choice',
    difficulty: 3,
    question: 'Thủy phân hoàn toàn 1 mol tinh bột thu được bao nhiêu mol glucozơ?',
    options: ['n mol (n là số mắt xích)', '1 mol', '2 mol', 'n/2 mol'],
    correctAnswer: 'n mol (n là số mắt xích)',
    explanation: '(C6H10O5)n + nH2O → nC6H12O6. Mỗi mắt xích C6H10O5 thủy phân cho 1 phân tử glucozơ.',
    hint: 'Mỗi mắt xích cho 1 glucozơ.'
  },

  // ========== XENLULOZƠ ==========
  {
    id: 14,
    category: 'cellulose',
    type: 'multiple-choice',
    difficulty: 1,
    question: 'Xenlulozơ là thành phần chính của...',
    options: ['Bông, gỗ, tre, nứa', 'Khoai, sắn', 'Mía, củ cải', 'Sữa động vật'],
    correctAnswer: 'Bông, gỗ, tre, nứa',
    explanation: 'Xenlulozơ là polisaccarit cấu trúc, là thành phần chính của vách tế bào thực vật. Bông chứa khoảng 98% xenlulozơ.',
    hint: 'Polisaccarit cấu trúc thực vật.'
  },
  {
    id: 15,
    category: 'cellulose',
    type: 'multiple-choice',
    difficulty: 2,
    question: 'Xenlulozơ khác tinh bột ở điểm...',
    options: [
      'Cấu tạo từ gốc β-glucozơ, không phản ứng với I2',
      'Có công thức phân tử khác',
      'Tan được trong nước',
      'Có phản ứng tráng bạc'
    ],
    correctAnswer: 'Cấu tạo từ gốc β-glucozơ, không phản ứng với I2',
    explanation: 'Xenlulozơ cấu tạo từ gốc β-glucozơ (tinh bột từ α-glucozơ), mạch không xoắn nên không tạo phức với I2 (không đổi màu).',
    hint: 'Sự khác biệt về cấu trúc.'
  },
  {
    id: 16,
    category: 'cellulose',
    type: 'fill-blank',
    difficulty: 2,
    question: 'Xenlulozơ tác dụng với HNO3 đặc/H2SO4 đặc tạo thành xenlulozơ ___',
    correctAnswer: 'trinitrat',
    acceptedAnswers: ['trinitrat', 'tri nitrat', 'trinitrate'],
    explanation: '[C6H7O2(OH)3]n + 3nHNO3 → [C6H7O2(ONO2)3]n + 3nH2O. Xenlulozơ trinitrat (thuốc súng không khói) dùng làm thuốc nổ.',
    hint: 'Phản ứng nitrat hóa.'
  },
  {
    id: 17,
    category: 'cellulose',
    type: 'multiple-choice',
    difficulty: 2,
    question: 'Tơ visco và tơ axetat được điều chế từ...',
    options: ['Xenlulozơ', 'Tinh bột', 'Protein', 'Cao su'],
    correctAnswer: 'Xenlulozơ',
    explanation: 'Tơ visco (tơ nhân tạo) được điều chế từ xenlulozơ qua phản ứng với NaOH và CS2. Tơ axetat từ xenlulozơ + anhiđrit axetic.',
    hint: 'Tơ nhân tạo từ nguyên liệu tự nhiên.'
  },
  {
    id: 18,
    category: 'cellulose',
    type: 'multiple-choice',
    difficulty: 3,
    question: 'Mỗi gốc glucozơ trong xenlulozơ có bao nhiêu nhóm -OH tự do?',
    options: ['3 nhóm', '2 nhóm', '4 nhóm', '5 nhóm'],
    correctAnswer: '3 nhóm',
    explanation: 'Mỗi gốc C6H10O5 trong xenlulozơ có 3 nhóm -OH tự do (ở C2, C3, C6), có thể tham gia phản ứng với axit, tạo este. Công thức viết gọn: [C6H7O2(OH)3]n.',
    hint: 'Liên quan đến công thức [C6H7O2(OH)3]n.'
  }
];

const Bai02_Cacbohidrat = () => {
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
  const [hasStartedNewGame, setHasStartedNewGame] = useState(false);

  const { hasProgress, savedProgress, saveProgress, clearProgress } = useChallengeProgress('cacbohidrat_12', {
    challengeId: 'cacbohidrat_12',
    programId: 'chemistry',
    grade: 12
  });

  // Filter questions by category
  const filteredQuestions = activeCategory 
    ? CHALLENGES.filter(q => q.category === activeCategory)
    : [];

  const currentQuestion = filteredQuestions[currentQuestionIndex];

  // Load saved progress
  useEffect(() => {
    if (savedProgress && !hasStartedNewGame) {
      if (savedProgress.savedCompletedCategories) {
        setCompletedCategories(savedProgress.savedCompletedCategories);
      }
      if (savedProgress.savedHighScore) {
        setHighScore(savedProgress.savedHighScore);
      }
      
      if (savedProgress.category && !showResult && !activeCategory) {
        setShowResumeDialog(true);
      }
    }
  }, [savedProgress, showResult, activeCategory, hasStartedNewGame]);

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
    setHasStartedNewGame(true);
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
    <div className="carbo-bg min-h-screen p-4 md:p-8 font-sans">
      <div className="max-w-6xl mx-auto">
        {/* HEADER */}
        <header className="flex items-center justify-between mb-8 bg-white/10 backdrop-blur rounded-2xl p-4 border border-white/20">
          <div className="flex items-center gap-4">
            <Link to="/hoahoc/12" className="p-2 hover:bg-white/10 rounded-full transition-colors text-white">
              <ArrowLeft className="w-6 h-6" />
            </Link>
            <div>
              <h1 className="text-2xl font-bold text-white">
                Cacbohiđrat
              </h1>
              <p className="text-amber-200 text-sm">Hóa học 12 • Chương 2</p>
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
            <div className="stats-bar-carbo mb-8">
              <div className="stat-item-carbo">
                <CheckCircle2 className="w-5 h-5 text-green-400" />
                <span>Đã hoàn thành: <strong>{completedCategories.length || 0}/{CATEGORIES.length}</strong></span>
              </div>
              <div className="stat-item-carbo">
                <Award className="w-5 h-5 text-yellow-400" />
                <span>Điểm cao nhất: <strong>{highScore || 0}</strong></span>
              </div>
            </div>

            <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <Target className="w-6 h-6" />
              Chọn chủ đề thử thách
            </h2>

            <div className="category-grid-carbo">
              {CATEGORIES.map((cat) => {
                const Icon = cat.icon;
                const isCompleted = completedCategories.includes(cat.id);
                
                return (
                  <div 
                    key={cat.id}
                    onClick={() => handleCategorySelect(cat.id)}
                    className="category-card-carbo group"
                  >
                    <div className={`category-icon-wrapper-carbo ${isCompleted ? 'bg-green-500/20 text-green-400' : ''}`}
                         style={{ color: isCompleted ? undefined : cat.color }}>
                      <Icon className="w-8 h-8" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-white mb-1 group-hover:text-amber-300 transition-colors">
                        {cat.name}
                      </h3>
                      <p className="text-sm text-amber-200 mb-3">{cat.description}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-semibold px-2 py-1 rounded bg-white/10 text-amber-200">
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

            <div className="progress-track-carbo mb-6">
              <div 
                className="progress-fill-carbo"
                style={{ width: `${((currentQuestionIndex) / filteredQuestions.length) * 100}%` }}
              />
            </div>

            <div className="question-card-carbo">
              <div className="question-header-carbo">
                <span className={`difficulty-badge-carbo ${
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
                <div className="options-grid-carbo">
                  {currentQuestion.options.map((option, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleAnswerSubmit(option)}
                      disabled={isCorrect !== null}
                      className={`option-btn-carbo ${
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
                      className="flex-1 p-4 bg-white/5 border border-white/20 rounded-xl text-lg text-white focus:border-amber-500 focus:outline-none"
                      onKeyDown={(e) => e.key === 'Enter' && handleAnswerSubmit(selectedAnswer)}
                    />
                    <button
                      onClick={() => handleAnswerSubmit(selectedAnswer)}
                      disabled={!selectedAnswer || isCorrect !== null}
                      className="px-6 py-2 bg-amber-600 text-white rounded-xl font-bold hover:bg-amber-700 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Kiểm tra
                    </button>
                  </div>
                </div>
              )}

              {showExplanation && (
                <div className={`feedback-container-carbo ${isCorrect ? 'feedback-correct' : 'feedback-wrong'}`}>
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
              <p className="text-amber-200 mb-8">Bạn đã hoàn thành chủ đề {CATEGORIES.find(c => c.id === activeCategory)?.name}</p>
              
              <div className="grid grid-cols-3 gap-4 mb-8">
                <div className="p-4 bg-white/5 rounded-2xl border border-white/10">
                  <div className="text-sm text-amber-200 mb-1">Điểm số</div>
                  <div className="text-2xl font-bold text-green-400">{score}</div>
                </div>
                <div className="p-4 bg-white/5 rounded-2xl border border-white/10">
                  <div className="text-sm text-amber-200 mb-1">Đúng</div>
                  <div className="text-2xl font-bold text-amber-400">
                    {Math.round((score / (filteredQuestions.length * 20)) * 100)}%
                  </div>
                </div>
                <div className="p-4 bg-white/5 rounded-2xl border border-white/10">
                  <div className="text-sm text-amber-200 mb-1">Thời gian</div>
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
                  className="flex items-center gap-2 px-6 py-3 bg-amber-600 text-white rounded-xl font-bold hover:bg-amber-700 transition-colors shadow-lg shadow-amber-500/30"
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

export default Bai02_Cacbohidrat;
