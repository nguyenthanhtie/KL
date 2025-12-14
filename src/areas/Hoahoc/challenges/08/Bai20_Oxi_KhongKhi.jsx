import React, { useState, useEffect, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {ArrowLeft, Beaker, Trophy, Play, RotateCcw, Lightbulb,FlaskConical, Flame, Wind, Droplets, CheckCircle2, XCircle, Sparkles, Zap, ChevronRight, ChevronLeft, Eye, HelpCircle, Star, Target, Award} from 'lucide-react';
import useChallengeProgress from '../../../../hooks/useChallengeProgress';
import ResumeDialog from '../../../../components/ResumeDialog';
import './CSS/Bai20_Oxi_KhongKhi.css';


// Cấu hình challenges
const CHALLENGES = [
  {
    id: 1,
    title: 'Điều chế Oxi từ KMnO₄',
    description: 'Nung nóng thuốc tím để tạo khí Oxi',
    difficulty: 'easy',
    difficultyLabel: 'Dễ',
    points: 12,
    type: 'produce-oxygen',
    icon: FlaskConical,
    color: '#8b5cf6',
    gradient: 'linear-gradient(135deg, #8b5cf6 0%, #a78bfa 100%)',
    question: 'Khi dùng KMnO₄ để điều chế khí O₂ trong phòng thí nghiệm, hiện tượng nào được quan sát?',
    options: [
      'KMnO₄ tan dần tạo dung dịch màu xanh và không có khí thoát ra',
      'Chất rắn KMnO₄ nóng chảy thành chất lỏng màu tím đậm và bay hơi',
      'KMnO₄ chuyển từ màu tím sang màu nâu đen và có khí thoát ra liên tục',
      'KMnO₄ bị phân hủy tạo chất rắn màu trắng và dung dịch vàng'
    ],
    correctAnswer: 'KMnO₄ chuyển từ màu tím sang màu nâu đen và có khí thoát ra liên tục',

    hint: 'Nung KMnO₄ tạo K₂MnO₄ (màu xanh), MnO₂ (màu đen) và khí O₂',
    phenomenon: 'Thuốc tím chuyển từ màu tím sang màu xanh lục, đồng thời xuất hiện bột đen MnO₂ và có bọt khí O₂ thoát ra.'
  },
  {
    id: 2,
    title: 'Đốt cháy Than trong Oxi',
    description: 'Quan sát hiện tượng khi đốt than trong oxi nguyên chất',
    difficulty: 'easy',
    difficultyLabel: 'Dễ',
    points: 12,
    type: 'burn-carbon',
    icon: Flame,
    color: '#f97316',
    gradient: 'linear-gradient(135deg, #f97316 0%, #fb923c 100%)',
    question: 'Sản phẩm chính khi đốt than (C) trong O₂ là gì?',
    options: ['C₂O', 'H₂O', 'CO', 'CO₂'],
    correctAnswer: 'CO₂',
    hint: 'C + O₂ → CO₂ (khí không màu, làm đục nước vôi trong)',
    phenomenon: 'Than bùng cháy sáng chói với ánh sáng trắng trong oxi nguyên chất, tạo ra khí CO₂ không màu.'
  },
  {
    id: 3,
    title: 'So sánh Đốt Nến',
    description: 'So sánh cường độ cháy trong không khí và trong oxi',
    difficulty: 'medium',
    difficultyLabel: 'Trung bình',
    points: 12,
    type: 'compare-burning',
    icon: Wind,
    color: '#3b82f6',
    gradient: 'linear-gradient(135deg, #3b82f6 0%, #60a5fa 100%)',
    question: 'Nến cháy trong oxi nguyên chất thì như thế nào?',
    options: [
      'Cháy mạnh hơn, sáng hơn',
      'Cháy chậm hơn',
      'Không cháy',
      'Giống nhau'
    ],
    correctAnswer: 'Cháy mạnh hơn, sáng hơn',
    hint: 'Không khí chỉ có ~21% O₂, oxi nguyên chất là 100% O₂',
    phenomenon: 'Ngọn nến trong oxi nguyên chất cháy mạnh hơn 4-5 lần, ngọn lửa lớn hơn và sáng hơn rõ rệt.'
  },
  {
    id: 4,
    title: 'Oxi Hóa Chậm - Gỉ Sắt',
    description: 'Tìm hiểu quá trình sắt bị gỉ trong tự nhiên',
    difficulty: 'medium',
    difficultyLabel: 'Trung bình',
    points: 12,
    type: 'rust-iron',
    icon: Droplets,
    color: '#ef4444',
    gradient: 'linear-gradient(135deg, #ef4444 0%, #f87171 100%)',
    question: 'Điều kiện nào cần để sắt bị gỉ?',
    options: [
      'Chỉ cần oxi',
      'Chỉ cần nước',
      'Cần cả oxi và nước',
      'Không cần gì'
    ],
    correctAnswer: 'Cần cả oxi và nước',
    hint: 'Gỉ sắt là quá trình oxi hóa chậm, cần cả O₂ và H₂O',
    phenomenon: 'Sắt dần chuyển sang màu nâu đỏ (gỉ sắt Fe₂O₃), quá trình này xảy ra chậm và cần có cả oxi lẫn hơi nước.'
  },
  {
    id: 5,
    title: 'Tam Giác Cháy',
    description: 'Ba điều kiện cần thiết cho sự cháy',
    difficulty: 'hard',
    difficultyLabel: 'Khó',
    points: 13,
    type: 'fire-triangle',
    icon: Target,
    color: '#ec4899',
    gradient: 'linear-gradient(135deg, #ec4899 0%, #f472b6 100%)',
    question: 'Ba điều kiện cần thiết để có sự cháy là?',
    options: [
      'Chất cháy, O₂, nhiệt độ cháy',
      'Chất cháy, H₂O, ánh sáng',
      'Chất cháy, N₂, nhiệt độ',
      'CO₂, O₂, nhiệt độ cháy'
    ],
    correctAnswer: 'Chất cháy, O₂, nhiệt độ cháy',
    hint: 'Thiếu một trong ba yếu tố này, sự cháy không xảy ra',
    phenomenon: 'Sự cháy cần đủ 3 yếu tố: Nhiên liệu (chất cháy), Oxi (chất oxi hóa), và Nhiệt độ đạt điểm cháy.'
  }
];

// Tính tổng điểm
const TOTAL_POINTS = CHALLENGES.reduce((sum, c) => sum + c.points, 0);

const Bai20_Oxi_KhongKhi = () => {
  const navigate = useNavigate();
  const { hasProgress, saveProgress, clearProgress, getProgress, completeChallenge } = useChallengeProgress('oxi-khong-khi', {
    challengeId: 20,
    programId: 'chemistry',
    grade: 8
  });
  const [startTime] = useState(() => Date.now());
  const [isCompleted, setIsCompleted] = useState(false);
  
  // State chính
  const [currentChallenge, setCurrentChallenge] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [showResumeDialog, setShowResumeDialog] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [completedChallenges, setCompletedChallenges] = useState([]);
  const [answeredCorrectly, setAnsweredCorrectly] = useState([]);

  // Experiment state
  const [experimentProgress, setExperimentProgress] = useState(0);
  const [isExperimentRunning, setIsExperimentRunning] = useState(false);
  const [isExperimentComplete, setIsExperimentComplete] = useState(false);

  // Kiểm tra progress khi load
  useEffect(() => {
    if (hasProgress && !gameStarted && !showResults) {
      setShowResumeDialog(true);
    }
  }, [hasProgress, gameStarted, showResults]);

  // Current challenge data
  const challenge = CHALLENGES[currentChallenge] || CHALLENGES[0];
  const ChallengeIcon = challenge.icon;

  // Bắt đầu game
  const startGame = (fromBeginning = false) => {
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
    setShowResumeDialog(false);
    resetQuestion();
  };

  // Reset câu hỏi hiện tại
  const resetQuestion = () => {
    setSelectedAnswer('');
    setIsAnswerSubmitted(false);
    setExperimentProgress(0);
    setIsExperimentRunning(false);
    setIsExperimentComplete(false);
    setShowHint(false);
  };

  // Chạy thí nghiệm
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
    }, 50);
  };

  // Reset thí nghiệm
  const resetExperiment = () => {
    setExperimentProgress(0);
    setIsExperimentRunning(false);
    setIsExperimentComplete(false);
  };

  // Kiểm tra đáp án
  const checkAnswer = () => {
    if (!selectedAnswer || isAnswerSubmitted) return;
    
    const isCorrect = selectedAnswer === challenge.correctAnswer;
    setIsAnswerSubmitted(true);
    
    if (isCorrect) {
      setScore(prev => prev + challenge.points);
      setAnsweredCorrectly(prev => [...prev, currentChallenge]);
    }
    setCompletedChallenges(prev => [...prev, currentChallenge]);
    
    // Save progress
    saveProgress({
      currentChallenge,
      score: isCorrect ? score + challenge.points : score,
      completedChallenges: [...completedChallenges, currentChallenge],
      answeredCorrectly: isCorrect ? [...answeredCorrectly, currentChallenge] : answeredCorrectly
    });
  };

  // Chuyển câu tiếp theo
  const nextChallenge = () => {
    if (currentChallenge < CHALLENGES.length - 1) {
      setCurrentChallenge(prev => prev + 1);
      resetQuestion();
    } else {
      setShowResults(true);
      clearProgress();
      
      // Lưu kết quả hoàn thành vào database
      if (!isCompleted) {
        setIsCompleted(true);
        const percentage = Math.round((score / TOTAL_POINTS) * 100);
        const stars = percentage >= 80 ? 3 : percentage >= 50 ? 2 : 1;
        completeChallenge({
          score,
          maxScore: TOTAL_POINTS,
          percentage,
          stars,
          timeSpent: Math.floor((Date.now() - startTime) / 1000),
          correctAnswers: answeredCorrectly.length,
          totalQuestions: CHALLENGES.length
        });
      }
    }
  };

  // Quay lại câu trước
  const prevChallenge = () => {
    if (currentChallenge > 0) {
      setCurrentChallenge(prev => prev - 1);
      resetQuestion();
    }
  };

  // Chơi lại
  const restartGame = () => {
    setShowResults(false);
    setGameStarted(false);
    setCurrentChallenge(0);
    setScore(0);
    setCompletedChallenges([]);
    setAnsweredCorrectly([]);
    resetQuestion();
  };

  // Sediments cho thí nghiệm KMnO4
  const sediments = useMemo(() => {
    if (experimentProgress < 100) return { crystals: [], powders: [] };
    const rand = (min, max) => Math.random() * (max - min) + min;

    const crystals = Array.from({ length: 5 }).map((_, i) => ({
      left: `${rand(15 + i * 15, 25 + i * 15).toFixed(1)}%`,
      bottom: `${rand(0, 8).toFixed(1)}px`,
      rotate: `${rand(-30, 30).toFixed(1)}deg`,
      scale: (rand(0.8, 1.2)).toFixed(2),
      delay: `${(i * 0.15).toFixed(2)}s`
    }));

    const powders = Array.from({ length: 4 }).map((_, i) => ({
      left: `${rand(12 + i * 18, 20 + i * 18).toFixed(1)}%`,
      bottom: `${rand(0, 5).toFixed(1)}px`,
      rotate: `${rand(-15, 15).toFixed(1)}deg`,
      scale: (rand(0.85, 1.1)).toFixed(2),
      delay: `${(i * 0.1 + 0.3).toFixed(2)}s`
    }));

    return { crystals, powders };
  }, [experimentProgress, currentChallenge]);

  // ================== RESULTS SCREEN ==================
  if (showResults) {
    const percentage = Math.round((score / TOTAL_POINTS) * 100);
    const correctCount = answeredCorrectly.length;
    
    const getResultData = () => {
      if (percentage >= 90) return { 
        title: 'Xuất sắc!', 
        subtitle: 'Bạn là nhà hóa học tài ba!',
        emoji: '🏆', 
        grade: 'A+',
        color: '#f59e0b',
        bgGradient: 'linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)'
      };
      if (percentage >= 70) return { 
        title: 'Giỏi lắm!', 
        subtitle: 'Kiến thức hóa học vững vàng',
        emoji: '🎉', 
        grade: 'A',
        color: '#10b981',
        bgGradient: 'linear-gradient(135deg, #d1fae5 0%, #a7f3d0 100%)'
      };
      if (percentage >= 50) return { 
        title: 'Khá tốt!', 
        subtitle: 'Tiếp tục cố gắng nhé',
        emoji: '👍', 
        grade: 'B',
        color: '#3b82f6',
        bgGradient: 'linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%)'
      };
      return { 
        title: 'Cần cải thiện', 
        subtitle: 'Hãy ôn lại bài học',
        emoji: '💪', 
        grade: 'C',
        color: '#6366f1',
        bgGradient: 'linear-gradient(135deg, #e0e7ff 0%, #c7d2fe 100%)'
      };
    };
    
    const result = getResultData();

    return (
      <div className="oxi-game">
        <div className="oxi-results">
          <div className="results-card" style={{ '--accent': result.color }}>
            {/* Animated background */}
            <div className="results-bg">
              <div className="bg-circle c1" />
              <div className="bg-circle c2" />
              <div className="bg-circle c3" />
            </div>

            {/* Trophy & Grade */}
            <div className="results-trophy">
              <div className="trophy-ring" style={{ background: result.bgGradient }}>
                <span className="trophy-emoji">{result.emoji}</span>
              </div>
              <div className="grade-badge" style={{ background: result.color }}>
                {result.grade}
              </div>
            </div>

            {/* Title */}
            <h1 className="results-title">{result.title}</h1>
            <p className="results-subtitle">{result.subtitle}</p>

            {/* Score Display */}
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

            {/* Stats */}
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

            {/* Actions */}
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
      <div className="oxi-game">
        <div className="oxi-start">
          {/* Header */}
          <header className="game-header">
            <Link to="/advanced-challenge" className="back-btn">
              <ArrowLeft size={20} />
              <span>Quay lại</span>
            </Link>
            <div className="header-info">
              <Beaker size={28} className="header-icon" />
              <h1>Oxi & Không Khí</h1>
            </div>
            <div className="header-score">
              <Trophy size={18} />
              <span>0/{TOTAL_POINTS}</span>
            </div>
          </header>

          {/* Main Content */}
          <div className="start-content">
            <div className="start-card">
              {/* Visual */}
              <div className="start-visual">
                <div className="lab-icon">
                  <FlaskConical size={48} />
                  <div className="bubbles">
                    <span className="bubble" style={{ '--delay': '0s' }} />
                    <span className="bubble" style={{ '--delay': '0.3s' }} />
                    <span className="bubble" style={{ '--delay': '0.6s' }} />
                  </div>
                </div>
              </div>

              {/* Info */}
              <h2 className="start-title">Phòng Thí Nghiệm Hóa Học</h2>
              <p className="start-desc">
                Khám phá 8 thí nghiệm thú vị về Oxi và quá trình cháy. 
                Quan sát hiện tượng, phân tích kết quả và trả lời câu hỏi!
              </p>

              {/* Challenge Preview */}
              <div className="challenges-preview">
                {CHALLENGES.map((c, idx) => {
                  const Icon = c.icon;
                  return (
                    <div 
                      key={c.id} 
                      className="preview-chip"
                      style={{ '--color': c.color }}
                    >
                      <Icon size={16} />
                      <span>{idx + 1}</span>
                    </div>
                  );
                })}
              </div>

              {/* Instructions */}
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

              {/* Start Button */}
              <button className="btn-start" onClick={() => startGame(true)}>
                <Play size={22} />
                <span>Bắt đầu thí nghiệm</span>
              </button>
            </div>
          </div>

          {/* Resume Dialog */}
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
    <div className="oxi-game">
      <div className="oxi-main">
        {/* Header */}
        <header className="game-header">
          <Link to="/advanced-challenge" className="back-btn">
            <ArrowLeft size={20} />
            <span>Quay lại</span>
          </Link>
          <div className="header-info">
            <Beaker size={24} />
            <h1>Oxi & Không Khí</h1>
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
                  {isDone ? (
                    <CheckCircle2 size={16} />
                  ) : isPast ? (
                    <XCircle size={16} />
                  ) : (
                    <Icon size={16} />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="game-grid">
          {/* Left Panel - Experiment */}
          <div className="experiment-section">
            {/* Challenge Info Card */}
            <div className="challenge-info" style={{ '--accent': challenge.color }}>
              <div className="info-header">
                <div className="info-icon" style={{ background: challenge.gradient }}>
                  <ChallengeIcon size={24} />
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

            {/* Experiment Visualization */}
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
                {/* Render experiment based on type */}
                <ExperimentVisual 
                  type={challenge.type} 
                  progress={experimentProgress}
                  sediments={sediments}
                />
              </div>

              {/* Controls */}
              <div className="exp-controls">
                <button 
                  className={`btn-exp ${isExperimentRunning ? 'running' : ''} ${isExperimentComplete ? 'complete' : ''}`}
                  onClick={runExperiment}
                  disabled={isExperimentRunning}
                >
                  {isExperimentComplete ? (
                    <>
                      <CheckCircle2 size={18} />
                      <span>Hoàn tất</span>
                    </>
                  ) : isExperimentRunning ? (
                    <>
                      <div className="spinner" />
                      <span>Đang chạy...</span>
                    </>
                  ) : (
                    <>
                      <Play size={18} />
                      <span>Bắt đầu TN</span>
                    </>
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

              {/* Phenomenon */}
              <div className={`phenomenon ${isExperimentComplete ? 'show' : ''}`}>
                <div className="phenomenon-header">
                  <Eye size={16} />
                  <span>Hiện tượng quan sát</span>
                </div>
                <p className="phenomenon-text">
                  {isExperimentComplete 
                    ? challenge.phenomenon 
                    : 'Chạy thí nghiệm để quan sát hiện tượng...'}
                </p>
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

              {/* Options */}
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
                    else optionClass += ' disabled';
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
                      {showFeedback && isCorrectOption && (
                        <CheckCircle2 size={20} className="option-icon correct" />
                      )}
                      {showFeedback && isSelected && !isCorrectOption && (
                        <XCircle size={20} className="option-icon wrong" />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Hint */}
              {showHint && !isAnswerSubmitted && (
                <div className="hint-box">
                  <Lightbulb size={18} />
                  <p>{challenge.hint}</p>
                </div>
              )}

              {/* Result Feedback */}
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

              {/* Actions */}
              <div className="question-actions">
                {!isAnswerSubmitted ? (
                  <>
                    <button 
                      className="btn-hint"
                      onClick={() => setShowHint(!showHint)}
                    >
                      <Lightbulb size={18} />
                      {showHint ? 'Ẩn gợi ý' : 'Gợi ý'}
                    </button>
                    <button 
                      className="btn-submit"
                      onClick={checkAnswer}
                      disabled={!selectedAnswer}
                    >
                      Kiểm tra
                      <ChevronRight size={18} />
                    </button>
                  </>
                ) : (
                  <>
                    <button 
                      className="btn-nav prev"
                      onClick={prevChallenge}
                      disabled={currentChallenge === 0}
                    >
                      <ChevronLeft size={18} />
                      Trước
                    </button>
                    <button 
                      className="btn-nav next"
                      onClick={nextChallenge}
                    >
                      {currentChallenge === CHALLENGES.length - 1 ? (
                        <>
                          Hoàn thành
                          <Award size={18} />
                        </>
                      ) : (
                        <>
                          Tiếp theo
                          <ChevronRight size={18} />
                        </>
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
const ExperimentVisual = ({ type, progress, sediments }) => {
  switch (type) {
    case 'produce-oxygen':
      return (
        <div className="exp-produce-oxygen">
          <div className="beaker">
            <div 
              className="liquid kmno4" 
              style={{ 
                height: `${Math.max(30, 60 - progress * 0.3)}%`,
                opacity: progress > 70 ? 0.8 : 1,
                filter: progress > 70 ? 'brightness(1.1)' : 'none'
              }}
            >
              {progress > 20 && [...Array(8)].map((_, i) => (
                <div 
                  key={i} 
                  className="bubble" 
                  style={{ 
                    animationDelay: `${i * 0.15}s`, 
                    left: `${15 + i * 10}%` 
                  }} 
                />
              ))}
              {progress >= 100 && (
                <div className="sediment">
                  {sediments.crystals?.map((c, i) => (
                    <div 
                      key={`c-${i}`} 
                      className="crystal" 
                      style={{ 
                        left: c.left, 
                        bottom: c.bottom,
                        transform: `rotate(${c.rotate}) scale(${c.scale})`,
                        animationDelay: c.delay
                      }} 
                    />
                  ))}
                  {sediments.powders?.map((p, i) => (
                    <div 
                      key={`p-${i}`} 
                      className="powder" 
                      style={{ 
                        left: p.left, 
                        bottom: p.bottom,
                        transform: `rotate(${p.rotate}) scale(${p.scale})`,
                        animationDelay: p.delay
                      }} 
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
          {progress > 0 && (
            <div className="heat-source">
              <div className="flame" style={{ animationDelay: '0s' }} />
              <div className="flame" style={{ animationDelay: '0.1s' }} />
              <div className="flame" style={{ animationDelay: '0.2s' }} />
            </div>
          )}
          {progress > 50 && (
            <div className="gas-release">
              {[...Array(5)].map((_, i) => (
                <span 
                  key={i} 
                  className="o2" 
                  style={{ animationDelay: `${i * 0.3}s` }}
                >
                  O₂
                </span>
              ))}
            </div>
          )}
          {progress >= 100 && (
            <div className="equation">Khi đun nóng KMnO₄, chất này bị phân hủy tạo ra muối màu xanh (K₂MnO₄), chất rắn nâu đen (MnO₂) và giải phóng khí oxi.</div>
          )}
        </div>
      );

    case 'burn-carbon':
      return (
        <div className="exp-burn-carbon">
          <div 
            className="carbon-piece" 
            style={{ 
              transform: `scale(${Math.max(0.7, 1 - progress * 0.003)})`,
              filter: progress > 15 ? `brightness(${1 + progress * 0.005})` : 'none'
            }}
          >
            <span style={{ opacity: Math.max(0.3, 1 - progress * 0.007) }}>C</span>
            {progress > 15 && (
              <div className="fire">
                <div className="fire-inner" />
                <div className="fire-outer" />
              </div>
            )}
          </div>
          {progress > 40 && (
            <div className="co2-clouds">
              {[...Array(6)].map((_, i) => (
                <div 
                  key={i} 
                  className="co2" 
                  style={{ 
                    animationDelay: `${i * 0.25}s`,
                    left: `${45 + (i % 3) * 5}%`
                  }}
                >
                  CO₂
                </div>
              ))}
            </div>
          )}
          <div className="equation">C + O₂ → CO₂</div>
        </div>
      );

    case 'compare-burning':
      return (
        <div className="exp-compare">
          <div className="compare-box air-box">
            <div className="env-label">
              <Wind size={16} />
              Không khí (21% O₂)
            </div>
            <div className="candle-container">
              <div className="candle">
                <div className="candle-body">
                  <div className="candle-wick" />
                </div>
                {progress > 20 && (
                  <div className="flame small active">
                    <div className="flame-core" />
                    <div className="flame-glow" />
                  </div>
                )}
              </div>
              {progress > 30 && (
                <div className="smoke-particles">
                  {[...Array(3)].map((_, i) => (
                    <div key={i} className="smoke" style={{ animationDelay: `${i * 0.4}s` }} />
                  ))}
                </div>
              )}
            </div>
            <div className="intensity-bar">
              <div className="bar-fill" style={{ width: progress > 20 ? '35%' : '0%' }} />
            </div>
          </div>
          <div className="vs-divider">
            <div className="vs-circle">VS</div>
            <div className="comparison-arrow">→</div>
          </div>
          <div className="compare-box oxygen-box highlight">
            <div className="env-label primary">
              <Sparkles size={16} />
              Oxi nguyên chất
            </div>
            <div className="candle-container">
              <div className="candle">
                <div className="candle-body">
                  <div className="candle-wick" />
                </div>
                {progress > 40 && (
                  <div className="flame large active intense">
                    <div className="flame-core" />
                    <div className="flame-middle" />
                    <div className="flame-outer" />
                    <div className="flame-glow intense" />
                    {[...Array(5)].map((_, i) => (
                      <div 
                        key={i} 
                        className="spark" 
                        style={{ 
                          '--angle': `${i * 72}deg`,
                          animationDelay: `${i * 0.15}s` 
                        }} 
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>
            <div className="intensity-bar">
              <div className="bar-fill intense" style={{ width: progress > 40 ? '95%' : '0%' }} />
            </div>
          </div>
        </div>
      );

    case 'rust-iron':
      return (
        <div className="exp-rust">
          <div className="iron-block" style={{ '--rust': `${progress}%` }}>
            <div 
              className="iron-surface" 
              style={{ opacity: Math.max(0, 1 - progress * 0.01) }}
            />
            <div 
              className="rust-layer" 
              style={{ 
                opacity: Math.min(1, progress * 0.01),
                clipPath: `circle(${progress}% at 50% 50%)`
              }}
            />
            <span className="label">Fe</span>
          </div>
          <div className="conditions">
            <div className={`condition ${progress > 10 ? 'active' : ''}`}>
              <Droplets size={22} />
              <span>H₂O</span>
            </div>
            <span className="plus">+</span>
            <div className={`condition ${progress > 10 ? 'active' : ''}`}>
              <Wind size={22} />
              <span>O₂</span>
            </div>
          </div>
          {progress >= 100 && (
            <div className="result">
              <span className="arrow">→</span>
              <span className="formula">Fe₂O₃ (Gỉ sắt)</span>
            </div>
          )}
        </div>
      );

    case 'fire-triangle':
      return (
        <div className="exp-triangle">
          <div className="triangle-container">
            <svg viewBox="0 0 200 180" className="triangle-svg">
              {/* Triangle Border */}
              <polygon 
                className={`outline ${progress > 10 ? 'show' : ''}`}
                points="100,15 185,165 15,165" 
              />
              {/* Inner Fill with Gradient */}
              {progress > 90 && (
                <polygon 
                  className="triangle-fill"
                  points="100,15 185,165 15,165" 
                />
              )}
              {/* Connection Lines */}
              {progress > 90 && (
                <>
                  <line x1="100" y1="15" x2="100" y2="110" className="connection-line" />
                  <line x1="185" y1="165" x2="100" y2="110" className="connection-line" />
                  <line x1="15" y1="165" x2="100" y2="110" className="connection-line" />
                </>
              )}
            </svg>
            
            {/* Vertex: Nhiên liệu (Top) */}
            <div className={`vertex top ${progress > 25 ? 'active' : ''}`}>
              <div className="vertex-icon fuel">
                <Flame size={24} />
              </div>
              <div className="vertex-label">
                <span className="label-title">Nhiên liệu</span>
                <span className="label-subtitle">Chất cháy</span>
              </div>
              {progress > 30 && (
                <div className="vertex-pulse" />
              )}
            </div>
            
            {/* Vertex: Oxi (Left) */}
            <div className={`vertex left ${progress > 50 ? 'active' : ''}`}>
              <div className="vertex-icon oxygen">
                <Wind size={24} />
              </div>
              <div className="vertex-label">
                <span className="label-title">Oxi</span>
                <span className="label-subtitle">Chất oxi hóa</span>
              </div>
              {progress > 55 && (
                <div className="vertex-pulse" />
              )}
            </div>
            
            {/* Vertex: Nhiệt độ (Right) */}
            <div className={`vertex right ${progress > 75 ? 'active' : ''}`}>
              <div className="vertex-icon heat">
                <Zap size={24} />
              </div>
              <div className="vertex-label">
                <span className="label-title">Nhiệt độ</span>
                <span className="label-subtitle">Năng lượng</span>
              </div>
              {progress > 80 && (
                <div className="vertex-pulse" />
              )}
            </div>
            
            {/* Center Fire Effect */}
            {progress >= 90 && (
              <div className="center-fire-effect">
                <div className="fire-animation">
                  <div className="fire-layer fire-1" />
                  <div className="fire-layer fire-2" />
                  <div className="fire-layer fire-3" />
                  <div className="fire-core" />
                </div>
                <div className="fire-label-container">
                  <Sparkles size={18} className="fire-sparkle" />
                  <span className="fire-label">SỰ CHÁY</span>
                </div>
                {/* Particles emanating from center */}
                {[...Array(8)].map((_, i) => (
                  <div
                    key={i}
                    className="fire-particle"
                    style={{
                      '--angle': `${i * 45}deg`,
                      animationDelay: `${i * 0.1}s`
                    }}
                  />
                ))}
              </div>
            )}
          </div>
          
          {/* Info Tip */}
          {progress >= 100 && (
            <div className="triangle-info">
              <HelpCircle size={16} />
              <span>Thiếu 1 yếu tố = Không cháy</span>
            </div>
          )}
        </div>
      );

    default:
      return <div className="exp-placeholder">Đang tải thí nghiệm...</div>;
  }
};

export default Bai20_Oxi_KhongKhi;
