import React, { useState, useEffect, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  ArrowLeft, Trophy, Play, RotateCcw, ChevronRight, ChevronLeft,
  CheckCircle2, XCircle, Lightbulb, HelpCircle, Zap, Award,
  FlaskConical, Beaker, Droplets, Flame, Eye
} from 'lucide-react';
import useChallengeProgress from '../../../../hooks/useChallengeProgress';
import ResumeDialog from '../../../../components/ResumeDialog';
import './CSS/Bai07_HopChatVoCo.css';

// ================== DATA ==================
const CHALLENGES = [
  {
    id: 1,
    type: 'dip-litmus-acid',
    title: 'Nhận biết dung dịch HCl',
    description: 'Nhúng mẫu giấy quỳ tím vào dung dịch HCl và quan sát hiện tượng.',
    question: 'Dựa vào hiện tượng quan sát được, dung dịch HCl thuộc loại hợp chất gì?',
    options: ['Axit', 'Bazơ', 'Muối', 'Oxit'],
    correctAnswer: 'Axit',
    phenomenon: 'Quỳ tím chuyển sang màu đỏ do ion H⁺. Đây là tính chất đặc trưng của axit.',
    hint: 'Chất nào làm quỳ tím chuyển đỏ?',
    difficulty: 'easy',
    difficultyLabel: 'Dễ',
    points: 10,
    color: '#ef4444',
    gradient: 'linear-gradient(135deg, #ef4444, #f87171)',
    icon: Droplets,
    reagentA: { name: 'Quỳ tím', color: '#a855f7' },
    reagentB: { name: 'HCl', color: '#fecaca' }
  },
  {
    id: 2,
    type: 'dip-litmus-base',
    title: 'Nhận biết dung dịch NaOH',
    description: 'Nhúng mẫu giấy quỳ tím vào dung dịch NaOH và quan sát hiện tượng.',
    question: 'Dựa vào hiện tượng quan sát được, dung dịch NaOH thuộc loại hợp chất gì?',
    options: ['Bazơ', 'Axit', 'Muối', 'Oxit'],
    correctAnswer: 'Bazơ',
    phenomenon: 'Quỳ tím chuyển sang màu xanh do ion OH⁻. Đây là tính chất đặc trưng của bazơ.',
    hint: 'Chất nào làm quỳ tím chuyển xanh?',
    difficulty: 'easy',
    difficultyLabel: 'Dễ',
    points: 10,
    color: '#3b82f6',
    gradient: 'linear-gradient(135deg, #3b82f6, #60a5fa)',
    icon: Droplets,
    reagentA: { name: 'Quỳ tím', color: '#a855f7' },
    reagentB: { name: 'NaOH', color: '#dbeafe' }
  },
  {
    id: 3,
    type: 'neutralization',
    title: 'Phản ứng trung hòa',
    description: 'Cho dung dịch HCl vào NaOH và quan sát phản ứng.',
    question: 'Phản ứng giữa HCl và NaOH tạo ra sản phẩm gì?',
    options: ['Muối NaCl + Nước, tỏa nhiệt', 'Có khí thoát ra', 'Có kết tủa', 'Không phản ứng'],
    correctAnswer: 'Muối NaCl + Nước, tỏa nhiệt',
    equation: 'HCl + NaOH → NaCl + H₂O',
    phenomenon: 'Phản ứng trung hòa tạo muối và nước, tỏa nhiệt.',
    hint: 'Axit + Bazơ → ? + ?',
    difficulty: 'easy',
    difficultyLabel: 'Dễ',
    points: 15,
    color: '#10b981',
    gradient: 'linear-gradient(135deg, #10b981, #34d399)',
    icon: FlaskConical,
    reagentA: { name: 'HCl', color: '#fecaca', icon: '🔴' },
    reagentB: { name: 'NaOH', color: '#dbeafe', icon: '🔵' }
  },
  {
    id: 4,
    type: 'carbonate-acid',
    title: 'Axit + Muối cacbonat',
    description: 'Nhỏ dung dịch HCl vào CaCO₃ và quan sát hiện tượng.',
    question: 'Khi nhỏ HCl vào CaCO₃, hiện tượng gì xảy ra?',
    options: ['Có khí CO₂ sủi bọt mạnh', 'Có kết tủa trắng', 'Dung dịch chuyển màu', 'Không phản ứng'],
    correctAnswer: 'Có khí CO₂ sủi bọt mạnh',
    equation: 'CaCO₃ + 2HCl → CaCl₂ + H₂O + CO₂↑',
    phenomenon: 'Khí CO₂ thoát ra mạnh tạo bọt sủi.',
    hint: 'Muối cacbonat + Axit tạo ra khí gì?',
    difficulty: 'medium',
    difficultyLabel: 'Trung bình',
    points: 15,
    color: '#f59e0b',
    gradient: 'linear-gradient(135deg, #f59e0b, #fbbf24)',
    icon: Beaker,
    reagentA: { name: 'HCl', color: '#fecaca', icon: '🧪' },
    reagentB: { name: 'CaCO₃', color: '#e5e7eb', icon: '🪨' }
  },
  {
    id: 5,
    type: 'oxide-water',
    title: 'Oxit bazơ + Nước',
    description: 'Cho CaO vào nước và thử dung dịch bằng quỳ tím.',
    question: 'Khi cho CaO vào nước, thử dung dịch bằng quỳ tím thì?',
    options: ['Quỳ tím chuyển xanh (tạo bazơ)', 'Quỳ tím chuyển đỏ (tạo axit)', 'Có khí thoát ra', 'Không tan'],
    correctAnswer: 'Quỳ tím chuyển xanh (tạo bazơ)',
    equation: 'CaO + H₂O → Ca(OH)₂',
    phenomenon: 'CaO tan tạo Ca(OH)₂ (bazơ), làm quỳ tím chuyển xanh, tỏa nhiệt.',
    hint: 'Oxit bazơ + Nước → ?',
    difficulty: 'medium',
    difficultyLabel: 'Trung bình',
    points: 15,
    color: '#8b5cf6',
    gradient: 'linear-gradient(135deg, #8b5cf6, #a78bfa)',
    icon: Flame,
    reagentA: { name: 'CaO', color: '#fef3c7', icon: '⚪' },
    reagentB: { name: 'H₂O', color: '#93c5fd', icon: '💧' }
  },
  {
    id: 6,
    type: 'gas-dissolve',
    title: 'Oxit axit + Nước',
    description: 'Sục khí CO₂ vào nước và thử dung dịch bằng quỳ tím.',
    question: 'Khi sục CO₂ vào nước, thử dung dịch bằng quỳ tím thì?',
    options: ['Quỳ tím chuyển đỏ nhạt (axit yếu)', 'Quỳ tím chuyển xanh', 'Có kết tủa', 'Không tan'],
    correctAnswer: 'Quỳ tím chuyển đỏ nhạt (axit yếu)',
    equation: 'CO₂ + H₂O → H₂CO₃',
    phenomenon: 'CO₂ tan tạo H₂CO₃ (axit yếu), làm quỳ tím hơi đỏ.',
    hint: 'Oxit axit + Nước → ?',
    difficulty: 'medium',
    difficultyLabel: 'Trung bình',
    points: 15,
    color: '#64748b',
    gradient: 'linear-gradient(135deg, #64748b, #94a3b8)',
    icon: Beaker,
    reagentA: { name: 'CO₂', color: '#d1d5db', icon: '💨' },
    reagentB: { name: 'H₂O', color: '#93c5fd', icon: '💧' }
  },
  {
    id: 7,
    type: 'precipitate-blue',
    title: 'Bazơ + Muối (kết tủa)',
    description: 'Cho dung dịch NaOH vào dung dịch CuSO₄.',
    question: 'Khi cho NaOH vào CuSO₄, hiện tượng gì xảy ra?',
    options: ['Kết tủa xanh lam Cu(OH)₂', 'Kết tủa trắng', 'Có khí thoát ra', 'Không phản ứng'],
    correctAnswer: 'Kết tủa xanh lam Cu(OH)₂',
    equation: '2NaOH + CuSO₄ → Cu(OH)₂↓ + Na₂SO₄',
    phenomenon: 'Xuất hiện kết tủa màu xanh lam Cu(OH)₂.',
    hint: 'Cu(OH)₂ có màu gì?',
    difficulty: 'medium',
    difficultyLabel: 'Trung bình',
    points: 20,
    color: '#0ea5e9',
    gradient: 'linear-gradient(135deg, #0ea5e9, #38bdf8)',
    icon: FlaskConical,
    reagentA: { name: 'NaOH', color: '#f9fafb', icon: '💧' },
    reagentB: { name: 'CuSO₄', color: '#3b82f6', icon: '🔵' }
  },
  {
    id: 8,
    type: 'oxide-acid',
    title: 'Axit + Oxit bazơ',
    description: 'Cho dung dịch HCl vào CuO (màu đen).',
    question: 'Khi cho HCl vào CuO, dung dịch có màu gì?',
    options: ['Xanh lục (CuCl₂)', 'Không màu', 'Có kết tủa', 'Có khí H₂'],
    correctAnswer: 'Xanh lục (CuCl₂)',
    equation: 'CuO + 2HCl → CuCl₂ + H₂O',
    phenomenon: 'CuO (đen) tan tạo dung dịch CuCl₂ màu xanh lục.',
    hint: 'Muối đồng (II) clorua có màu gì?',
    difficulty: 'hard',
    difficultyLabel: 'Khó',
    points: 20,
    color: '#059669',
    gradient: 'linear-gradient(135deg, #059669, #10b981)',
    icon: Beaker,
    reagentA: { name: 'HCl', color: '#fecaca', icon: '🧪' },
    reagentB: { name: 'CuO', color: '#1f2937', icon: '⬛' }
  },
  {
    id: 9,
    type: 'precipitate-white',
    title: 'Muối + Muối (trao đổi)',
    description: 'Trộn dung dịch AgNO₃ với dung dịch NaCl.',
    question: 'Khi trộn AgNO₃ với NaCl, hiện tượng gì xảy ra?',
    options: ['Kết tủa trắng AgCl', 'Kết tủa xanh', 'Có khí thoát ra', 'Không phản ứng'],
    correctAnswer: 'Kết tủa trắng AgCl',
    equation: 'AgNO₃ + NaCl → AgCl↓ + NaNO₃',
    phenomenon: 'Xuất hiện kết tủa trắng đục AgCl.',
    hint: 'AgCl có tan trong nước không?',
    difficulty: 'hard',
    difficultyLabel: 'Khó',
    points: 20,
    color: '#6366f1',
    gradient: 'linear-gradient(135deg, #6366f1, #818cf8)',
    icon: FlaskConical,
    reagentA: { name: 'AgNO₃', color: '#f9fafb', icon: '🔬' },
    reagentB: { name: 'NaCl', color: '#f9fafb', icon: '🧂' }
  },
  {
    id: 10,
    type: 'sequence',
    title: 'Chuỗi chuyển hóa',
    description: 'CaCO₃ → (nung) → ? → (+H₂O) → Ca(OH)₂',
    question: 'Trong chuỗi chuyển hóa trên, chất ? là gì?',
    options: ['CaO (vôi sống)', 'Ca (kim loại)', 'Ca(OH)₂ (vôi tôi)', 'CO₂ (khí)'],
    correctAnswer: 'CaO (vôi sống)',
    equation: 'CaCO₃ →(t°)→ CaO + CO₂↑ ; CaO + H₂O → Ca(OH)₂',
    phenomenon: 'CaCO₃ nung tạo CaO, CaO + nước tạo Ca(OH)₂.',
    hint: 'Nung đá vôi (CaCO₃) thu được chất gì?',
    difficulty: 'hard',
    difficultyLabel: 'Khó',
    points: 25,
    color: '#dc2626',
    gradient: 'linear-gradient(135deg, #dc2626, #ef4444)',
    icon: Flame,
    reagentA: { name: 'CaCO₃', color: '#e5e7eb', icon: '🪨' },
    reagentB: { name: 'Nhiệt', color: '#f97316', icon: '🔥' }
  }
];

const TOTAL_POINTS = CHALLENGES.reduce((sum, c) => sum + c.points, 0);

// ================== MAIN COMPONENT ==================
const HopChatVoCo = () => {
  const navigate = useNavigate();
  const { hasProgress, saveProgress, clearProgress, getProgress } = useChallengeProgress('hop-chat-vo-co-9');

  // Game states
  const [gameStarted, setGameStarted] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [showResumeDialog, setShowResumeDialog] = useState(false);
  const [currentChallenge, setCurrentChallenge] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [completedChallenges, setCompletedChallenges] = useState([]);
  const [answeredCorrectly, setAnsweredCorrectly] = useState([]);

  // Experiment states
  const [experimentProgress, setExperimentProgress] = useState(0);
  const [isExperimentRunning, setIsExperimentRunning] = useState(false);
  const [isExperimentComplete, setIsExperimentComplete] = useState(false);

  const challenge = CHALLENGES[currentChallenge];
  const ChallengeIcon = challenge?.icon || FlaskConical;

  // Check for saved progress
  useEffect(() => {
    if (hasProgress && !gameStarted && !showResults) {
      setShowResumeDialog(true);
    }
  }, [hasProgress, gameStarted, showResults]);

  // Save progress
  useEffect(() => {
    if (gameStarted && !showResults) {
      saveProgress({
        currentChallenge,
        score,
        completedChallenges,
        answeredCorrectly
      });
    }
  }, [currentChallenge, score, completedChallenges, answeredCorrectly, gameStarted, showResults]);

  const startGame = useCallback((fromBeginning = false) => {
    if (fromBeginning) {
      clearProgress();
      setCurrentChallenge(0);
      setScore(0);
      setCompletedChallenges([]);
      setAnsweredCorrectly([]);
    } else {
      const saved = getProgress();
      if (saved) {
        setCurrentChallenge(saved.currentChallenge || 0);
        setScore(saved.score || 0);
        setCompletedChallenges(saved.completedChallenges || []);
        setAnsweredCorrectly(saved.answeredCorrectly || []);
      }
    }
    setGameStarted(true);
    setShowResults(false);
    setShowResumeDialog(false);
    resetQuestion();
  }, [clearProgress, getProgress]);

  const resetQuestion = () => {
    setSelectedAnswer(null);
    setIsAnswerSubmitted(false);
    setShowHint(false);
    setExperimentProgress(0);
    setIsExperimentRunning(false);
    setIsExperimentComplete(false);
  };

  const runExperiment = () => {
    if (isExperimentRunning || isExperimentComplete) return;
    setIsExperimentRunning(true);
    setExperimentProgress(0);

    const interval = setInterval(() => {
      setExperimentProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsExperimentRunning(false);
          setIsExperimentComplete(true);
          return 100;
        }
        return prev + 2;
      });
    }, 40);
  };

  const resetExperiment = () => {
    setExperimentProgress(0);
    setIsExperimentRunning(false);
    setIsExperimentComplete(false);
  };

  const checkAnswer = () => {
    if (!selectedAnswer) return;
    setIsAnswerSubmitted(true);

    const isCorrect = selectedAnswer === challenge.correctAnswer;
    if (isCorrect) {
      setScore(prev => prev + challenge.points);
      setAnsweredCorrectly(prev => [...prev, currentChallenge]);
    }
    setCompletedChallenges(prev => [...prev, currentChallenge]);
  };

  const nextChallenge = () => {
    if (currentChallenge < CHALLENGES.length - 1) {
      setCurrentChallenge(prev => prev + 1);
      resetQuestion();
    } else {
      setShowResults(true);
      setGameStarted(false);
      clearProgress();
    }
  };

  const prevChallenge = () => {
    if (currentChallenge > 0) {
      setCurrentChallenge(prev => prev - 1);
      resetQuestion();
    }
  };

  const restartGame = () => {
    clearProgress();
    setShowResults(false);
    setGameStarted(false);
    setCurrentChallenge(0);
    setScore(0);
    setCompletedChallenges([]);
    setAnsweredCorrectly([]);
    resetQuestion();
  };

  // ================== RESULTS SCREEN ==================
  if (showResults) {
    const percentage = Math.round((score / TOTAL_POINTS) * 100);
    const correctCount = answeredCorrectly.length;
    
    const getResult = () => {
      if (percentage >= 90) return { grade: 'A+', title: 'Xuất sắc!', emoji: '🏆', color: '#10b981', subtitle: 'Bạn là nhà hóa học tài năng!' };
      if (percentage >= 75) return { grade: 'A', title: 'Giỏi lắm!', emoji: '🌟', color: '#3b82f6', subtitle: 'Kiến thức hóa học vững vàng!' };
      if (percentage >= 60) return { grade: 'B', title: 'Khá tốt!', emoji: '👍', color: '#f59e0b', subtitle: 'Cần ôn tập thêm một chút!' };
      return { grade: 'C', title: 'Cố gắng hơn!', emoji: '💪', color: '#ef4444', subtitle: 'Hãy xem lại lý thuyết nhé!' };
    };
    const result = getResult();

    return (
      <div className="voco-game">
        <div className="voco-results">
          <div className="results-card" style={{ '--accent': result.color }}>
            <div className="results-bg">
              <div className="bg-circle c1" />
              <div className="bg-circle c2" />
              <div className="bg-circle c3" />
            </div>

            <div className="results-trophy">
              <div className="trophy-ring" style={{ background: `linear-gradient(135deg, ${result.color}20, ${result.color}40)` }}>
                <span className="trophy-emoji">{result.emoji}</span>
              </div>
              <div className="grade-badge" style={{ background: result.color }}>
                {result.grade}
              </div>
            </div>

            <h1 className="results-title">{result.title}</h1>
            <p className="results-subtitle">{result.subtitle}</p>

            <div className="score-display-large">
              <div className="score-ring">
                <svg viewBox="0 0 120 120">
                  <circle className="ring-bg" cx="60" cy="60" r="52" />
                  <circle 
                    className="ring-progress" 
                    cx="60" cy="60" r="52" 
                    style={{ 
                      strokeDasharray: `${percentage * 3.27} 327`,
                      stroke: result.color
                    }} 
                  />
                </svg>
                <div className="score-inner">
                  <span className="score-value">{score}</span>
                  <span className="score-total">/{TOTAL_POINTS}</span>
                </div>
              </div>
            </div>

            <div className="results-stats">
              <div className="stat-box">
                <Target size={20} />
                <span className="stat-value">{correctCount}</span>
                <span className="stat-label">Câu đúng</span>
              </div>
              <div className="stat-box">
                <Beaker size={20} />
                <span className="stat-value">{CHALLENGES.length}</span>
                <span className="stat-label">Thí nghiệm</span>
              </div>
              <div className="stat-box">
                <Star size={20} />
                <span className="stat-value">{percentage}%</span>
                <span className="stat-label">Hoàn thành</span>
              </div>
            </div>

            <div className="results-actions">
              <button className="btn-secondary" onClick={restartGame}>
                <RotateCcw size={18} />
                Chơi lại
              </button>
              <button className="btn-primary" onClick={() => navigate('/advanced-challenge')}>
                Về trang chủ
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ================== START SCREEN ==================
  if (!gameStarted) {
    return (
      <div className="voco-game">
        <div className="voco-start">
          <header className="game-header">
            <Link to="/advanced-challenge" className="back-btn">
              <ArrowLeft size={20} />
              <span>Quay lại</span>
            </Link>
            <div className="header-info">
              <FlaskConical size={28} className="header-icon" />
              <h1>Hợp Chất Vô Cơ</h1>
            </div>
            <div className="header-score">
              <Trophy size={18} />
              <span>0/{TOTAL_POINTS}</span>
            </div>
          </header>

          <div className="start-content">
            <div className="start-card">
              <div className="start-visual">
                <div className="lab-icon">
                  <Beaker size={48} />
                  <div className="bubbles">
                    <span className="bubble" style={{ '--delay': '0s' }} />
                    <span className="bubble" style={{ '--delay': '0.3s' }} />
                    <span className="bubble" style={{ '--delay': '0.6s' }} />
                  </div>
                </div>
              </div>

              <h2 className="start-title">Phòng Thí Nghiệm Hóa Học</h2>
              <p className="start-desc">
                Khám phá 10 thí nghiệm thú vị về các hợp chất vô cơ. 
                Quan sát phản ứng, phân tích kết quả và trả lời câu hỏi!
              </p>

              <div className="challenges-preview">
                {CHALLENGES.slice(0, 5).map((c, idx) => {
                  const Icon = c.icon;
                  return (
                    <div key={c.id} className="preview-chip" style={{ '--color': c.color }}>
                      <Icon size={12} />
                      <span>{idx + 1}</span>
                    </div>
                  );
                })}
                <span className="preview-more">+5</span>
              </div>

              <div className="instructions">
                <div className="instruction">
                  <span className="inst-num">1</span>
                  <span>Chạy mô phỏng thí nghiệm</span>
                </div>
                <div className="instruction">
                  <span className="inst-num">2</span>
                  <span>Quan sát hiện tượng xảy ra</span>
                </div>
                <div className="instruction">
                  <span className="inst-num">3</span>
                  <span>Trả lời câu hỏi kiểm tra</span>
                </div>
              </div>

              <button className="btn-start" onClick={() => startGame(true)}>
                <Play size={22} />
                <span>Bắt đầu thí nghiệm</span>
              </button>
            </div>
          </div>

          <ResumeDialog
            show={showResumeDialog}
            onResume={() => startGame(false)}
            onRestart={() => startGame(true)}
            progressInfo={getProgress() ? {
              current: (getProgress().currentChallenge || 0) + 1,
              total: CHALLENGES.length,
              score: getProgress().score || 0
            } : null}
          />
        </div>
      </div>
    );
  }

  // ================== MAIN GAME SCREEN ==================
  return (
    <div className="voco-game">
      <div className="voco-main">
        {/* Header */}
        <header className="game-header">
          <Link to="/advanced-challenge" className="back-btn">
            <ArrowLeft size={20} />
            <span>Quay lại</span>
          </Link>
          <div className="header-info">
            <FlaskConical size={24} />
            <h1>Hợp Chất Vô Cơ</h1>
          </div>
          <div className="header-score">
            <Trophy size={18} />
            <span>{score}/{TOTAL_POINTS}</span>
          </div>
        </header>

        {/* Progress Bar */}
        <div className="progress-section">
          <div className="progress-bar">
            <div 
              className="progress-fill" 
              style={{ 
                width: `${((currentChallenge + 1) / CHALLENGES.length) * 100}%`,
                background: challenge.gradient
              }} 
            />
          </div>
          <div className="progress-steps">
            {CHALLENGES.map((c, idx) => {
              const Icon = c.icon;
              const isActive = idx === currentChallenge;
              const isDone = answeredCorrectly.includes(idx);
              const isPast = completedChallenges.includes(idx);
              
              return (
                <div 
                  key={c.id}
                  className={`step ${isActive ? 'active' : ''} ${isDone ? 'correct' : isPast ? 'wrong' : ''}`}
                  style={{ '--color': c.color }}
                  title={c.title}
                >
                  {isDone ? <CheckCircle2 size={14} /> : isPast ? <XCircle size={14} /> : <Icon size={14} />}
                </div>
              );
            })}
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="game-grid">
          {/* Left Panel - Experiment */}
          <div className="experiment-section">
            <div className="challenge-info" style={{ '--accent': challenge.color }}>
              <div className="info-header">
                <div className="info-icon" style={{ background: challenge.gradient }}>
                  <ChallengeIcon size={22} />
                </div>
                <div className="info-text">
                  <span className="info-number">Thí nghiệm {currentChallenge + 1}/{CHALLENGES.length}</span>
                  <h2 className="info-title">{challenge.title}</h2>
                </div>
                <div className="info-badges">
                  <span className={`badge-difficulty ${challenge.difficulty}`}>
                    {challenge.difficultyLabel}
                  </span>
                  <span className="badge-points">
                    <Zap size={14} />
                    {challenge.points}đ
                  </span>
                </div>
              </div>
              <p className="info-desc">{challenge.description}</p>
            </div>

            <div className="experiment-card">
              <div className="exp-header">
                <FlaskConical size={18} />
                <span>Mô phỏng thí nghiệm</span>
                {isExperimentComplete && (
                  <span className="exp-complete">
                    <CheckCircle2 size={14} />
                    Hoàn tất
                  </span>
                )}
              </div>

              <div className="exp-visual">
                {/* Hiện tượng quan sát - góc trái trên */}
                {isExperimentComplete && (
                  <div className="phenomenon-overlay show">
                    <div className="phenomenon-content">
                      <Eye size={14} />
                      <span className="phenomenon-label">Hiện tượng:</span>
                      {challenge.type === 'dip-litmus-acid' && (
                        <span className="color-result red">Quỳ tím → Đỏ</span>
                      )}
                      {challenge.type === 'dip-litmus-base' && (
                        <span className="color-result blue">Quỳ tím → Xanh</span>
                      )}
                      {challenge.type === 'neutralization' && (
                        <span className="color-result green">Tỏa nhiệt</span>
                      )}
                      {challenge.type === 'carbonate-acid' && (
                        <span className="color-result orange">Sủi bọt CO₂↑</span>
                      )}
                      {challenge.type === 'oxide-water' && (
                        <span className="color-result purple">Tỏa nhiệt, tan</span>
                      )}
                      {challenge.type === 'gas-dissolve' && (
                        <span className="color-result gray">Tan, tạo axit</span>
                      )}
                      {challenge.type === 'precipitate-blue' && (
                        <span className="color-result cyan">Kết tủa xanh lam</span>
                      )}
                      {challenge.type === 'oxide-acid' && (
                        <span className="color-result teal">DD xanh lục</span>
                      )}
                      {challenge.type === 'precipitate-white' && (
                        <span className="color-result white">Kết tủa trắng</span>
                      )}
                      {challenge.type === 'sequence' && (
                        <span className="color-result yellow">Chuyển hóa</span>
                      )}
                    </div>
                  </div>
                )}
                
                <ExperimentVisual 
                  type={challenge.type} 
                  progress={experimentProgress}
                  reagentA={challenge.reagentA}
                  reagentB={challenge.reagentB}
                  equation={challenge.equation}
                />
              </div>

              <div className="exp-controls">
                <button 
                  className={`btn-exp ${isExperimentRunning ? 'running' : ''} ${isExperimentComplete ? 'complete' : ''}`}
                  onClick={runExperiment}
                  disabled={isExperimentRunning}
                >
                  {isExperimentComplete ? (
                    <><CheckCircle2 size={18} /><span>Hoàn tất</span></>
                  ) : isExperimentRunning ? (
                    <><div className="spinner" /><span>Đang chạy...</span></>
                  ) : (
                    <><Play size={18} /><span>Bắt đầu TN</span></>
                  )}
                </button>
                <button className="btn-reset" onClick={resetExperiment}>
                  <RotateCcw size={18} />
                </button>
                <div className="exp-progress-bar">
                  <div 
                    className="exp-progress-fill" 
                    style={{ width: `${experimentProgress}%`, background: challenge.color }}
                  />
                </div>
                <span className="exp-percent">{experimentProgress}%</span>
              </div>
            </div>
          </div>

          {/* Right Panel - Question */}
          <div className="question-section">
            <div className="question-card">
              <div className="question-header">
                <HelpCircle size={20} />
                <span>Câu hỏi</span>
              </div>

              <p className="question-text">{challenge.question}</p>

              <div className="options-list">
                {challenge.options.map((option, idx) => {
                  const letters = ['A', 'B', 'C', 'D'];
                  const isSelected = selectedAnswer === option;
                  const isCorrectOption = option === challenge.correctAnswer;
                  const showFeedback = isAnswerSubmitted;
                  
                  let optionClass = 'option';
                  if (isSelected) optionClass += ' selected';
                  if (showFeedback) {
                    if (isCorrectOption) optionClass += ' correct';
                    else if (isSelected) optionClass += ' wrong';
                  }
                  
                  return (
                    <button
                      key={idx}
                      className={optionClass}
                      onClick={() => !isAnswerSubmitted && setSelectedAnswer(option)}
                      disabled={isAnswerSubmitted}
                    >
                      <span className="option-letter">{letters[idx]}</span>
                      <span className="option-text">{option}</span>
                      {showFeedback && isCorrectOption && <CheckCircle2 size={20} className="option-icon correct" />}
                      {showFeedback && isSelected && !isCorrectOption && <XCircle size={20} className="option-icon wrong" />}
                    </button>
                  );
                })}
              </div>

              {showHint && !isAnswerSubmitted && (
                <div className="hint-box">
                  <Lightbulb size={18} />
                  <p>{challenge.hint}</p>
                </div>
              )}

              {isAnswerSubmitted && (
                <div className={`result-feedback ${selectedAnswer === challenge.correctAnswer ? 'correct' : 'wrong'}`}>
                  {selectedAnswer === challenge.correctAnswer ? (
                    <>
                      <CheckCircle2 size={22} />
                      <div>
                        <strong>Chính xác!</strong>
                        <span>+{challenge.points} điểm</span>
                      </div>
                    </>
                  ) : (
                    <>
                      <XCircle size={22} />
                      <div>
                        <strong>Chưa đúng!</strong>
                        <span>Đáp án: {challenge.correctAnswer}</span>
                      </div>
                    </>
                  )}
                </div>
              )}

              <div className="question-actions">
                {!isAnswerSubmitted ? (
                  <>
                    <button className="btn-hint" onClick={() => setShowHint(!showHint)}>
                      <Lightbulb size={18} />
                      {showHint ? 'Ẩn gợi ý' : 'Gợi ý'}
                    </button>
                    <button className="btn-submit" onClick={checkAnswer} disabled={!selectedAnswer}>
                      Kiểm tra
                      <ChevronRight size={18} />
                    </button>
                  </>
                ) : (
                  <>
                    <button className="btn-nav prev" onClick={prevChallenge} disabled={currentChallenge === 0}>
                      <ChevronLeft size={18} />
                      Trước
                    </button>
                    <button className="btn-nav next" onClick={nextChallenge}>
                      {currentChallenge === CHALLENGES.length - 1 ? (
                        <>Hoàn thành<Award size={18} /></>
                      ) : (
                        <>Tiếp theo<ChevronRight size={18} /></>
                      )}
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// ================== EXPERIMENT VISUAL COMPONENT ==================
const ExperimentVisual = ({ type, progress, reagentA, reagentB, equation }) => {
  // Mô phỏng nhúng quỳ tím vào dung dịch
  const renderDipLitmus = (resultColor) => (
    <div className="exp-dip-litmus">
      {/* Kẹp giữ quỳ tím */}
      <div className="litmus-holder">
        <div className="holder-stick"></div>
        <div className="litmus-paper-dip" style={{ 
          background: progress > 50 
            ? (resultColor === 'red' ? '#ef4444' : '#3b82f6') 
            : '#a855f7',
          transform: progress > 20 ? 'translateY(35px)' : 'translateY(0)',
          transition: 'all 0.8s ease'
        }}>
          <span className="litmus-text">Quỳ tím</span>
        </div>
      </div>
      
      {/* Cốc đựng dung dịch */}
      <div className="beaker-dip">
        <div className="beaker-glass">
          <div className="solution-liquid" style={{ background: reagentB.color }}>
            {progress > 50 && <div className="ripple-effect"></div>}
          </div>
          <span className="solution-name">{reagentB.name}</span>
        </div>
      </div>
    </div>
  );

  // Mô phỏng phản ứng 2 chất
  const renderMixReaction = (resultType) => (
    <div className="exp-mix">
      <div className="mix-containers">
        {/* Cốc A - bên trái */}
        <div className={`mix-beaker beaker-a ${progress > 30 ? 'pouring' : ''}`}>
          <div className="beaker-body-mix">
            <div className="liquid-mix" style={{ 
              background: reagentA.color,
              height: progress > 30 ? `${Math.max(20, 70 - progress * 0.5)}%` : '70%'
            }}></div>
          </div>
          <span className="beaker-name">{reagentA.name}</span>
        </div>

        {/* Mũi tên */}
        <div className={`mix-arrow ${progress > 20 ? 'show' : ''}`}>
          <span>→</span>
        </div>

        {/* Cốc B - ở giữa (nhận phản ứng) */}
        <div className="mix-beaker beaker-b main">
          <div className="beaker-body-mix large">
            <div className="liquid-mix" style={{ 
              background: progress > 50 
                ? (resultType === 'heat' ? '#a7f3d0' 
                  : resultType === 'bubble' ? '#fef3c7'
                  : resultType === 'precipitate-blue' ? '#0ea5e9'
                  : resultType === 'precipitate-white' ? '#e2e8f0'
                  : resultType === 'color-green' ? '#10b981'
                  : reagentB.color)
                : reagentB.color,
              height: '70%',
              transition: 'background 0.5s ease'
            }}>
              {/* Hiệu ứng bọt khí */}
              {progress > 40 && resultType === 'bubble' && (
                <div className="bubbles-container">
                  {[...Array(8)].map((_, i) => (
                    <div key={i} className="bubble-rise" style={{ 
                      left: `${10 + i * 10}%`,
                      animationDelay: `${i * 0.2}s` 
                    }}></div>
                  ))}
                </div>
              )}
              
              {/* Hiệu ứng kết tủa */}
              {progress > 50 && (resultType === 'precipitate-blue' || resultType === 'precipitate-white') && (
                <div className={`precipitate-effect ${resultType === 'precipitate-blue' ? 'blue' : 'white'}`} 
                  style={{ opacity: Math.min(1, (progress - 50) / 50) }}>
                </div>
              )}
              
              {/* Hiệu ứng tỏa nhiệt */}
              {progress > 40 && resultType === 'heat' && (
                <div className="heat-waves">
                  {[...Array(3)].map((_, i) => (
                    <div key={i} className="heat-wave" style={{ animationDelay: `${i * 0.3}s` }}></div>
                  ))}
                </div>
              )}
            </div>
          </div>
          <span className="beaker-name">{reagentB.name}</span>
        </div>
      </div>
      
      {/* Chỉ báo kết quả */}
      {progress > 60 && (
        <div className="reaction-result">
          {resultType === 'heat' && <><Flame size={16} className="result-icon heat" /><span>Tỏa nhiệt</span></>}
          {resultType === 'bubble' && <><span className="result-icon bubble">💨</span><span>Khí CO₂↑</span></>}
          {resultType === 'precipitate-blue' && <><span className="result-icon precip-blue">⬇</span><span>Kết tủa xanh</span></>}
          {resultType === 'precipitate-white' && <><span className="result-icon precip-white">⬇</span><span>Kết tủa trắng</span></>}
          {resultType === 'color-green' && <><span className="result-icon color-change">🟢</span><span>Xanh lục</span></>}
        </div>
      )}
    </div>
  );

  // Mô phỏng oxit + nước (có thêm quỳ tím)
  const renderOxideWater = () => (
    <div className="exp-oxide-water">
      <div className="oxide-setup-vertical">
        {/* Chất rắn CaO rơi từ trên xuống */}
        <div className={`falling-solid ${progress > 20 ? 'falling' : ''} ${progress > 50 ? 'dissolved' : ''}`}>
          <div className="solid-piece" style={{ background: reagentA.color }}>
            <span>{reagentA.name}</span>
          </div>
        </div>
        
        {/* Cốc nước bên dưới */}
        <div className="water-beaker-below">
          <div className="beaker-body-mix large">
            <div className="liquid-mix water" style={{ 
              background: progress > 60 ? '#bfdbfe' : reagentB.color,
              height: '65%'
            }}>
              {progress > 30 && progress < 70 && (
                <div className="dissolve-effect">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className="dissolve-particle" style={{ 
                      left: `${20 + i * 15}%`,
                      animationDelay: `${i * 0.15}s` 
                    }}></div>
                  ))}
                </div>
              )}
              {progress > 50 && (
                <div className="heat-waves">
                  {[...Array(3)].map((_, i) => (
                    <div key={i} className="heat-wave" style={{ animationDelay: `${i * 0.3}s` }}></div>
                  ))}
                </div>
              )}
            </div>
          </div>
          <span className="beaker-name">{reagentB.name}</span>
        </div>
        
        {/* Quỳ tím kiểm tra */}
        {progress > 70 && (
          <div className="litmus-test-side">
            <div className="litmus-strip" style={{ background: '#3b82f6' }}>
              <span>Quỳ → Xanh</span>
            </div>
          </div>
        )}
      </div>
      
      {progress > 50 && (
        <div className="reaction-result">
          <Flame size={16} className="result-icon heat" />
          <span>Tỏa nhiệt mạnh</span>
        </div>
      )}
    </div>
  );

  // Mô phỏng sục khí vào nước - ống sục từ trên xuống
  const renderGasDissolve = () => (
    <div className="exp-gas-dissolve">
      <div className="gas-dissolve-setup">
        {/* Ống sục khí từ trên xuống vào dung dịch */}
        <div className={`gas-tube-vertical ${progress > 20 ? 'active' : ''}`}>
          <div className="tube-top">
            <span className="gas-source">{reagentA.name}</span>
          </div>
          <div className="tube-pipe"></div>
          <div className="tube-end">
            {progress > 20 && (
              <div className="bubbles-from-tube">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="bubble-out" style={{ animationDelay: `${i * 0.25}s` }}></div>
                ))}
              </div>
            )}
          </div>
        </div>
        
        {/* Cốc nước */}
        <div className="water-container-below">
          <div className="beaker-body-mix large">
            <div className="liquid-mix" style={{ 
              background: progress > 60 ? '#fecaca' : reagentB.color,
              height: '70%',
              transition: 'background 0.5s ease'
            }}>
              {progress > 30 && (
                <div className="bubbles-container">
                  {[...Array(6)].map((_, i) => (
                    <div key={i} className="bubble-rise small" style={{ 
                      left: `${15 + i * 12}%`,
                      animationDelay: `${i * 0.15}s` 
                    }}></div>
                  ))}
                </div>
              )}
            </div>
          </div>
          <span className="beaker-name">{reagentB.name}</span>
        </div>
        
        {/* Quỳ tím kiểm tra */}
        {progress > 70 && (
          <div className="litmus-test-right">
            <div className="litmus-strip" style={{ background: '#fca5a5' }}>
              <span>Quỳ → Đỏ nhạt</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );

  // Mô phỏng axit + oxit bazơ (CuO đen tan tạo dung dịch xanh)
  const renderOxideAcid = () => (
    <div className="exp-oxide-acid">
      <div className="oxide-acid-setup-vertical">
        {/* CuO - chất rắn đen rơi từ trên xuống */}
        <div className={`falling-oxide ${progress > 20 ? 'falling' : ''} ${progress > 60 ? 'dissolved' : ''}`}>
          <div className="oxide-piece-falling" style={{ background: '#1f2937' }}>
            <span className="oxide-name">{reagentB.name}</span>
          </div>
        </div>
        
        {/* Cốc axit bên dưới */}
        <div className="acid-beaker-below">
          <div className="beaker-body-mix large">
            <div className="liquid-mix" style={{ 
              background: progress > 50 ? '#10b981' : reagentA.color,
              height: '65%',
              transition: 'background 0.8s ease'
            }}>
              {progress > 30 && progress < 70 && (
                <div className="dissolve-effect">
                  {[...Array(4)].map((_, i) => (
                    <div key={i} className="dissolve-particle dark" style={{ 
                      left: `${20 + i * 20}%`,
                      animationDelay: `${i * 0.2}s` 
                    }}></div>
                  ))}
                </div>
              )}
            </div>
          </div>
          <span className="beaker-name">{reagentA.name}</span>
        </div>
        
        {/* Kết quả */}
        {progress > 70 && (
          <div className="result-side">
            <span className="result-icon color-change">🟢</span>
            <span>CuCl₂ xanh lục</span>
          </div>
        )}
      </div>
    </div>
  );

  const renderSequence = () => (
    <div className="exp-sequence">
      <div className="sequence-steps">
        <div className={`seq-step ${progress > 10 ? 'active' : ''}`}>
          <div className="seq-icon" style={{ background: '#e5e7eb' }}>🪨</div>
          <span>CaCO₃</span>
        </div>
        <div className={`seq-arrow ${progress > 30 ? 'show' : ''}`}>
          <span>🔥 nung</span>
          →
        </div>
        <div className={`seq-step ${progress > 50 ? 'active' : ''}`}>
          <div className="seq-icon" style={{ background: '#fef3c7' }}>⚪</div>
          <span>CaO</span>
          {progress > 50 && <span className="seq-gas">+ CO₂↑</span>}
        </div>
        <div className={`seq-arrow ${progress > 70 ? 'show' : ''}`}>
          <span>+ H₂O</span>
          →
        </div>
        <div className={`seq-step ${progress > 90 ? 'active' : ''}`}>
          <div className="seq-icon" style={{ background: '#dbeafe' }}>💧</div>
          <span>Ca(OH)₂</span>
        </div>
      </div>
    </div>
  );

  switch (type) {
    case 'dip-litmus-acid':
      return renderDipLitmus('red');
    case 'dip-litmus-base':
      return renderDipLitmus('blue');
    case 'neutralization':
      return renderMixReaction('heat');
    case 'carbonate-acid':
      return renderMixReaction('bubble');
    case 'oxide-water':
      return renderOxideWater();
    case 'gas-dissolve':
      return renderGasDissolve();
    case 'precipitate-blue':
      return renderMixReaction('precipitate-blue');
    case 'oxide-acid':
      return renderOxideAcid();
    case 'precipitate-white':
      return renderMixReaction('precipitate-white');
    case 'sequence':
      return renderSequence();
    default:
      return <div className="exp-placeholder">Đang tải thí nghiệm...</div>;
  }
};

export default HopChatVoCo;