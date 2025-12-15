import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowLeft, Trophy, RotateCcw, ChevronRight,
  CheckCircle2, XCircle, Lightbulb, Zap, Award,
  FlaskConical, Droplets, Beaker, Leaf, Apple,
  Clock, Target, AlertTriangle, Flame
} from 'lucide-react';
import useChallengeProgress from '../../../../hooks/useChallengeProgress';
import ResumeDialog from '../../../../components/ResumeDialog';
import './CSS/Bai01_Este_Lipit.css';

// ================== DATA - ESTE VÀ LIPIT ==================
const CATEGORIES = [
  {
    id: 'este',
    name: 'Este',
    icon: FlaskConical,
    color: '#3b82f6',
    description: 'Cấu tạo, danh pháp, tính chất của este',
    bgGradient: 'from-blue-500 to-cyan-500'
  },
  {
    id: 'reactions',
    name: 'Phản ứng Este',
    icon: Beaker,
    color: '#f59e0b',
    description: 'Thủy phân, xà phòng hóa, điều chế',
    bgGradient: 'from-amber-500 to-orange-500'
  },
  {
    id: 'lipid',
    name: 'Chất béo (Lipit)',
    icon: Droplets,
    color: '#10b981',
    description: 'Cấu tạo, tính chất của triglixerit',
    bgGradient: 'from-emerald-500 to-green-500'
  },
  {
    id: 'applications',
    name: 'Ứng dụng thực tế',
    icon: Apple,
    color: '#8b5cf6',
    description: 'Xà phòng, chất tẩy rửa, thực phẩm',
    bgGradient: 'from-violet-500 to-purple-500'
  }
];

const CHALLENGES = [
  // ========== ESTE ==========
  {
    id: 1,
    category: 'este',
    type: 'multiple-choice',
    difficulty: 1,
    question: 'Công thức tổng quát của este no, đơn chức, mạch hở là...',
    options: ['CnH2nO2 (n ≥ 2)', 'CnH2n+2O2 (n ≥ 2)', 'CnH2n-2O2 (n ≥ 2)', 'CnH2nO (n ≥ 2)'],
    correctAnswer: 'CnH2nO2 (n ≥ 2)',
    explanation: 'Este no, đơn chức, mạch hở có công thức tổng quát CnH2nO2 với n ≥ 2. Este đơn giản nhất là HCOOCH3 (metyl fomat).',
    hint: 'Este có nhóm chức -COO-.'
  },
  {
    id: 2,
    category: 'este',
    type: 'multiple-choice',
    difficulty: 1,
    question: 'Este được tạo thành từ phản ứng giữa...',
    options: ['Axit và ancol', 'Axit và bazơ', 'Ancol và bazơ', 'Anđehit và ancol'],
    correctAnswer: 'Axit và ancol',
    explanation: 'Este được tạo thành từ phản ứng este hóa giữa axit cacboxylic và ancol: R-COOH + R\'-OH ⇌ R-COO-R\' + H2O',
    hint: 'Phản ứng este hóa.'
  },
  {
    id: 3,
    category: 'este',
    type: 'fill-blank',
    difficulty: 2,
    question: 'Tên gọi của este CH3COOC2H5 là ___',
    correctAnswer: 'etyl axetat',
    acceptedAnswers: ['etyl axetat', 'ethyl acetate', 'etyl acetat'],
    explanation: 'CH3COOC2H5: Gốc axit CH3COO- (axetat) + gốc ancol C2H5- (etyl) = etyl axetat.',
    hint: 'Tên este = tên gốc ancol + tên gốc axit (đuôi -at).'
  },
  {
    id: 4,
    category: 'este',
    type: 'multiple-choice',
    difficulty: 2,
    question: 'Este nào sau đây có mùi thơm của hoa nhài?',
    options: ['Etyl axetat', 'Benzyl axetat', 'Isoamyl axetat', 'Metyl salixylat'],
    correctAnswer: 'Benzyl axetat',
    explanation: 'Benzyl axetat (C6H5CH2OOCCH3) có mùi thơm của hoa nhài. Isoamyl axetat có mùi chuối chín, metyl salixylat có mùi dầu gió.',
    hint: 'Benzyl liên quan đến vòng benzen.'
  },
  {
    id: 5,
    category: 'este',
    type: 'multiple-choice',
    difficulty: 3,
    question: 'Este X có công thức phân tử C4H8O2. Số đồng phân cấu tạo của X là...',
    options: ['2', '3', '4', '5'],
    correctAnswer: '4',
    explanation: 'Các đồng phân: HCOOC3H7 (2 đồng phân: n-propyl fomat và iso-propyl fomat), CH3COOC2H5 (etyl axetat), C2H5COOCH3 (metyl propionat). Tổng: 4 đồng phân.',
    hint: 'Xét cả đồng phân mạch cacbon của gốc ancol.'
  },

  // ========== PHẢN ỨNG ESTE ==========
  {
    id: 6,
    category: 'reactions',
    type: 'multiple-choice',
    difficulty: 1,
    question: 'Phản ứng thủy phân este trong môi trường kiềm còn gọi là phản ứng...',
    options: ['Este hóa', 'Xà phòng hóa', 'Crackinh', 'Polime hóa'],
    correctAnswer: 'Xà phòng hóa',
    explanation: 'Phản ứng thủy phân este trong môi trường kiềm gọi là phản ứng xà phòng hóa vì sản phẩm là muối của axit béo (xà phòng).',
    hint: 'Sản phẩm dùng để tạo xà phòng.'
  },
  {
    id: 7,
    category: 'reactions',
    type: 'multiple-choice',
    difficulty: 2,
    question: 'Thủy phân hoàn toàn CH3COOC2H5 trong dung dịch NaOH thu được sản phẩm là...',
    options: [
      'CH3COONa và C2H5OH',
      'CH3COOH và C2H5ONa',
      'CH3COONa và C2H5ONa',
      'CH3COOH và C2H5OH'
    ],
    correctAnswer: 'CH3COONa và C2H5OH',
    explanation: 'CH3COOC2H5 + NaOH → CH3COONa + C2H5OH. Phản ứng xà phòng hóa tạo muối của axit và ancol.',
    hint: 'Kiềm phản ứng với phần axit của este.'
  },
  {
    id: 8,
    category: 'reactions',
    type: 'fill-blank',
    difficulty: 2,
    question: 'Phản ứng este hóa là phản ứng ___ (thuận nghịch/một chiều)',
    correctAnswer: 'thuận nghịch',
    acceptedAnswers: ['thuận nghịch', 'thuận-nghịch', 'thuận ngịch'],
    explanation: 'Phản ứng este hóa là phản ứng thuận nghịch, cần xúc tác H2SO4 đặc và đun nóng. Để tăng hiệu suất cần dùng dư một trong hai chất đầu hoặc lấy este ra khỏi hỗn hợp.',
    hint: 'Cần điều kiện đặc biệt để đạt hiệu suất cao.'
  },
  {
    id: 9,
    category: 'reactions',
    type: 'multiple-choice',
    difficulty: 3,
    question: 'Để điều chế este từ axit và ancol với hiệu suất cao, cần...',
    options: [
      'Dùng dư ancol hoặc axit, chưng cất este ra',
      'Thêm nhiều nước',
      'Dùng xúc tác NaOH',
      'Phản ứng ở nhiệt độ thấp'
    ],
    correctAnswer: 'Dùng dư ancol hoặc axit, chưng cất este ra',
    explanation: 'Vì phản ứng thuận nghịch, muốn tăng hiệu suất cần: dùng dư 1 chất (thường là ancol rẻ hơn), chưng cất este ra khỏi hỗn hợp phản ứng, dùng H2SO4 đặc làm xúc tác và hút nước.',
    hint: 'Nguyên lý Le Chatelier - dịch chuyển cân bằng.'
  },

  // ========== LIPIT ==========
  {
    id: 10,
    category: 'lipid',
    type: 'multiple-choice',
    difficulty: 1,
    question: 'Chất béo là este của...',
    options: [
      'Glixerol và axit béo',
      'Glixerol và axit vô cơ',
      'Ancol etylic và axit béo',
      'Ancol metylic và axit béo'
    ],
    correctAnswer: 'Glixerol và axit béo',
    explanation: 'Chất béo (triglixerit) là este của glixerol (ancol 3 chức) với các axit béo (axit cacboxylic có mạch cacbon dài).',
    hint: 'Glixerol có 3 nhóm -OH.'
  },
  {
    id: 11,
    category: 'lipid',
    type: 'multiple-choice',
    difficulty: 2,
    question: 'Dầu thực vật có thể chuyển thành mỡ rắn bằng phản ứng...',
    options: ['Thủy phân', 'Hidro hóa', 'Oxi hóa', 'Xà phòng hóa'],
    correctAnswer: 'Hidro hóa',
    explanation: 'Dầu thực vật chứa nhiều liên kết đôi C=C (không no). Khi hidro hóa (cộng H2, xúc tác Ni, đun nóng), các liên kết đôi bị bão hòa, chuyển thành mỡ rắn (bơ nhân tạo).',
    hint: 'Làm no hóa các liên kết đôi.'
  },
  {
    id: 12,
    category: 'lipid',
    type: 'fill-blank',
    difficulty: 2,
    question: 'Axit béo C17H35COOH có tên gọi là axit ___',
    correctAnswer: 'stearic',
    acceptedAnswers: ['stearic', 'stêaric'],
    explanation: 'C17H35COOH (C18H36O2) là axit stearic - axit béo no phổ biến trong mỡ động vật. Axit oleic (C17H33COOH) là axit béo không no có 1 liên kết đôi.',
    hint: 'Có 18 cacbon, no.'
  },
  {
    id: 13,
    category: 'lipid',
    type: 'multiple-choice',
    difficulty: 3,
    question: 'Xà phòng hóa hoàn toàn 17,8 gam chất béo X cần vừa đủ 60 ml dung dịch NaOH 1M. Khối lượng glixerol thu được là...',
    options: ['1,84 gam', '0,92 gam', '2,76 gam', '3,68 gam'],
    correctAnswer: '1,84 gam',
    explanation: 'nNaOH = 0,06 mol. Chất béo + 3NaOH → muối + glixerol. nglixerol = nNaOH/3 = 0,02 mol. mglixerol = 0,02 × 92 = 1,84 gam.',
    hint: 'Tỉ lệ mol NaOH : glixerol = 3 : 1.'
  },

  // ========== ỨNG DỤNG ==========
  {
    id: 14,
    category: 'applications',
    type: 'multiple-choice',
    difficulty: 1,
    question: 'Xà phòng là muối của...',
    options: [
      'Axit béo với natri hoặc kali',
      'Axit vô cơ với natri',
      'Axit hữu cơ nhẹ với natri',
      'Kim loại kiềm với axit clohidric'
    ],
    correctAnswer: 'Axit béo với natri hoặc kali',
    explanation: 'Xà phòng là muối natri hoặc kali của axit béo (ví dụ: C17H35COONa - natri stearat). Xà phòng natri cứng hơn xà phòng kali.',
    hint: 'Được tạo từ phản ứng xà phòng hóa.'
  },
  {
    id: 15,
    category: 'applications',
    type: 'multiple-choice',
    difficulty: 2,
    question: 'Tại sao xà phòng không dùng được trong nước cứng?',
    options: [
      'Tạo kết tủa với Ca2+, Mg2+',
      'Bị thủy phân',
      'Không tan trong nước',
      'Mất tính tẩy rửa do pH thấp'
    ],
    correctAnswer: 'Tạo kết tủa với Ca2+, Mg2+',
    explanation: 'Trong nước cứng, xà phòng tác dụng với Ca2+, Mg2+ tạo kết tủa: 2RCOONa + Ca2+ → (RCOO)2Ca↓ + 2Na+. Kết tủa này làm giảm khả năng tẩy rửa và tạo cặn bẩn.',
    hint: 'Nước cứng chứa Ca2+, Mg2+.'
  },
  {
    id: 16,
    category: 'applications',
    type: 'multiple-choice',
    difficulty: 2,
    question: 'Chất tẩy rửa tổng hợp có ưu điểm so với xà phòng là...',
    options: [
      'Dùng được trong nước cứng',
      'Có pH cao hơn',
      'Rẻ tiền hơn',
      'Tạo nhiều bọt hơn'
    ],
    correctAnswer: 'Dùng được trong nước cứng',
    explanation: 'Chất tẩy rửa tổng hợp (như các muối ankyl sunfat, ankyl benzen sunfonat) không bị kết tủa với Ca2+, Mg2+ nên dùng được trong nước cứng.',
    hint: 'Không tạo kết tủa.'
  },
  {
    id: 17,
    category: 'applications',
    type: 'fill-blank',
    difficulty: 2,
    question: 'Este có mùi chuối chín là ___ axetat',
    correctAnswer: 'isoamyl',
    acceptedAnswers: ['isoamyl', 'iso-amyl', 'isopentyl'],
    explanation: 'Isoamyl axetat (CH3COOCH2CH2CH(CH3)2) là este có mùi đặc trưng của chuối chín, thường được dùng làm hương liệu trong thực phẩm và mỹ phẩm.',
    hint: 'Gốc ancol có 5 cacbon, mạch nhánh.'
  },
  {
    id: 18,
    category: 'applications',
    type: 'multiple-choice',
    difficulty: 3,
    question: 'Biodiesel được điều chế bằng cách...',
    options: [
      'Chuyển hóa este của axit béo với metanol',
      'Crackinh dầu mỏ',
      'Lên men đường glucose',
      'Hidro hóa dầu thực vật'
    ],
    correctAnswer: 'Chuyển hóa este của axit béo với metanol',
    explanation: 'Biodiesel là nhiên liệu sinh học được điều chế bằng phản ứng chuyển hóa este (transesterification): chất béo + metanol (xúc tác kiềm) → metyl este của axit béo (biodiesel) + glixerol.',
    hint: 'Phản ứng trao đổi este.'
  }
];

const Bai01_Este_Lipit = () => {
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

  const { hasProgress, savedProgress, saveProgress, clearProgress } = useChallengeProgress('este_lipit_12', {
    challengeId: 'este_lipit_12',
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
    <div className="este-bg min-h-screen p-4 md:p-8 font-sans">
      <div className="max-w-6xl mx-auto">
        {/* HEADER */}
        <header className="flex items-center justify-between mb-8 bg-white/10 backdrop-blur rounded-2xl p-4 border border-white/20">
          <div className="flex items-center gap-4">
            <Link to="/hoahoc/12" className="p-2 hover:bg-white/10 rounded-full transition-colors text-white">
              <ArrowLeft className="w-6 h-6" />
            </Link>
            <div>
              <h1 className="text-2xl font-bold text-white">
                Este - Lipit
              </h1>
              <p className="text-blue-200 text-sm">Hóa học 12 • Chương 1</p>
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
            <div className="stats-bar-este mb-8">
              <div className="stat-item-este">
                <CheckCircle2 className="w-5 h-5 text-green-400" />
                <span>Đã hoàn thành: <strong>{completedCategories.length || 0}/{CATEGORIES.length}</strong></span>
              </div>
              <div className="stat-item-este">
                <Award className="w-5 h-5 text-yellow-400" />
                <span>Điểm cao nhất: <strong>{highScore || 0}</strong></span>
              </div>
            </div>

            <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <Target className="w-6 h-6" />
              Chọn chủ đề thử thách
            </h2>

            <div className="category-grid-este">
              {CATEGORIES.map((cat) => {
                const Icon = cat.icon;
                const isCompleted = completedCategories.includes(cat.id);
                
                return (
                  <div 
                    key={cat.id}
                    onClick={() => handleCategorySelect(cat.id)}
                    className="category-card-este group"
                  >
                    <div className={`category-icon-wrapper-este ${isCompleted ? 'bg-green-500/20 text-green-400' : ''}`}>
                      <Icon className="w-8 h-8" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-white mb-1 group-hover:text-blue-300 transition-colors">
                        {cat.name}
                      </h3>
                      <p className="text-sm text-blue-200 mb-3">{cat.description}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-semibold px-2 py-1 rounded bg-white/10 text-blue-200">
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

            <div className="progress-track-este mb-6">
              <div 
                className="progress-fill-este"
                style={{ width: `${((currentQuestionIndex) / filteredQuestions.length) * 100}%` }}
              />
            </div>

            <div className="question-card-este">
              <div className="question-header-este">
                <span className={`difficulty-badge-este ${
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
                <div className="options-grid-este">
                  {currentQuestion.options.map((option, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleAnswerSubmit(option)}
                      disabled={isCorrect !== null}
                      className={`option-btn-este ${
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
                      className="flex-1 p-4 bg-white/5 border border-white/20 rounded-xl text-lg text-white focus:border-blue-500 focus:outline-none"
                      onKeyDown={(e) => e.key === 'Enter' && handleAnswerSubmit(selectedAnswer)}
                    />
                    <button
                      onClick={() => handleAnswerSubmit(selectedAnswer)}
                      disabled={!selectedAnswer || isCorrect !== null}
                      className="px-6 py-2 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Kiểm tra
                    </button>
                  </div>
                </div>
              )}

              {showExplanation && (
                <div className={`feedback-container-este ${isCorrect ? 'feedback-correct' : 'feedback-wrong'}`}>
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
              <p className="text-blue-200 mb-8">Bạn đã hoàn thành chủ đề {CATEGORIES.find(c => c.id === activeCategory)?.name}</p>
              
              <div className="grid grid-cols-3 gap-4 mb-8">
                <div className="p-4 bg-white/5 rounded-2xl border border-white/10">
                  <div className="text-sm text-blue-200 mb-1">Điểm số</div>
                  <div className="text-2xl font-bold text-green-400">{score}</div>
                </div>
                <div className="p-4 bg-white/5 rounded-2xl border border-white/10">
                  <div className="text-sm text-blue-200 mb-1">Đúng</div>
                  <div className="text-2xl font-bold text-blue-400">
                    {Math.round((score / (filteredQuestions.length * 20)) * 100)}%
                  </div>
                </div>
                <div className="p-4 bg-white/5 rounded-2xl border border-white/10">
                  <div className="text-sm text-blue-200 mb-1">Thời gian</div>
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
                  className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-colors shadow-lg shadow-blue-500/30"
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

export default Bai01_Este_Lipit;
