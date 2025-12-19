import React, { useState, useEffect, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  ArrowLeft, Trophy, Play, RotateCcw, ChevronRight, ChevronLeft,
  CheckCircle2, XCircle, Lightbulb, HelpCircle, Zap, Award,
  FlaskConical, Beaker, Droplets, Flame, Eye, Atom, TestTube
} from 'lucide-react';
import useChallengeProgress from '../../../../hooks/useChallengeProgress';
import ResumeDialog from '../../../../components/ResumeDialog';
import './CSS/Baitonghop.css';

// ================== DATA (Quiz: tổng hợp chương trình lớp 9) ==================
const CHALLENGES = [
  { id: 1, title: 'Nhận biết axit', question: 'Quỳ tím chuyển sang màu đỏ khi nhúng vào dung dịch nào?', options: ['NaOH', 'HCl', 'NaCl', 'KCl'], correctAnswer: 'HCl', points: 10, phenomenon: 'Quỳ tím chuyển đỏ là dấu hiệu của axit.' },
  { id: 2, title: 'Cacbonat + Axit', question: 'Khi cho CaCO₃ tác dụng với HCl, sản phẩm chính tạo ra là?', options: ['CO₂ + H₂O + CaCl₂', 'O₂ + CaCl₂', 'CaO + H₂O', 'Ca(OH)₂'], correctAnswer: 'CO₂ + H₂O + CaCl₂', points: 10, phenomenon: 'Muối cacbonat + axit → muối + nước + CO₂↑.' },
  { id: 3, title: 'Fe + Axit', question: 'Phản ứng giữa kim loại Fe và HCl sinh ra khí gì?', options: ['O₂', 'CO₂', 'H₂', 'Cl₂'], correctAnswer: 'H₂', points: 10, phenomenon: 'Kim loại phản ứng với axit tạo muối và giải phóng H₂.' },
  { id: 4, title: 'Trung hòa', question: 'Muối nào sau đây là muối trung hòa của NaOH và HCl?', options: ['NaCl', 'Na₂CO₃', 'KCl', 'CaCl₂'], correctAnswer: 'NaCl', points: 10, phenomenon: 'Axit + Bazơ → Muối + Nước.' },
  { id: 5, title: 'Cháy metan', question: 'Khi đốt CH₄ (metan) trong không khí, sản phẩm chính là?', options: ['CO₂ và H₂O', 'CO và H₂', 'C và H₂O', 'CO₂ và H₂'], correctAnswer: 'CO₂ và H₂O', points: 10, phenomenon: 'Đốt cháy hoàn toàn hidrocacbon tạo CO₂ và nước.' },
  { id: 6, title: 'Etilen', question: 'Etilen (C₂H₄) có đặc điểm nào?', options: ['Là ankan', 'Có liên kết đôi C=C', 'Là ankin', 'Chứa nhóm -OH'], correctAnswer: 'Có liên kết đôi C=C', points: 10, phenomenon: 'Etilen là hidrocacbon có liên kết đôi (olefin).' },
  { id: 7, title: 'Brom + etilen', question: 'Khi dung dịch Br₂ tiếp xúc với etilen, hiện tượng gì xảy ra?', options: ['Dung dịch mất màu', 'Tạo kết tủa trắng', 'Có khí thoát ra', 'Dung dịch chuyển sang xanh'], correctAnswer: 'Dung dịch mất màu', points: 10, phenomenon: 'Phản ứng cộng Br₂ vào liên kết đôi làm mất màu dung dịch Brom.' },
  { id: 8, title: 'Nhóm IA', question: 'Nguyên tố nhóm IA (Li, Na, K) có tên gọi là?', options: ['Kim loại kiềm', 'Kim loại kiềm thổ', 'Halogen', 'Khí hiếm'], correctAnswer: 'Kim loại kiềm', points: 10, phenomenon: 'Nhóm IA là kim loại kiềm, hoạt động mạnh.' },
  { id: 9, title: 'BaSO₄ kết tủa', question: 'BaCl₂ + H₂SO₄ tạo ra chất kết tủa nào?', options: ['BaSO₄', 'AgCl', 'CuO', 'Fe(OH)₃'], correctAnswer: 'BaSO₄', points: 10, phenomenon: 'Bari + sunfat tạo kết tủa trắng BaSO₄.' },
  { id: 10, title: 'Phân đạm', question: 'Phân đạm chính cung cấp nguyên tố nào cho cây trồng?', options: ['Nitơ (N)', 'Photpho (P)', 'Kali (K)', 'Canxi (Ca)'], correctAnswer: 'Nitơ (N)', points: 10, phenomenon: 'Đạm cung cấp nitơ giúp cây phát triển lá.' },
  { id: 11, title: 'Metan', question: 'Công thức phân tử của ankan đơn giản nhất là?', options: ['CH₄', 'C₂H₄', 'C₂H₂', 'C₆H₆'], correctAnswer: 'CH₄', points: 10, phenomenon: 'Metan (CH₄) là ankan đơn giản nhất.' },
  { id: 12, title: 'Khử oxit', question: 'Khi tinh chế kim loại, phản ứng khử oxit kim loại bằng H₂ tạo ra chất gì?', options: ['Kim loại rắn', 'Oxit mới', 'Muối', 'Axit'], correctAnswer: 'Kim loại rắn', points: 10, phenomenon: 'H₂ khử oxit kim loại → kim loại nguyên chất.' },
  { id: 13, title: 'Bazơ mạnh', question: 'Chất nào sau đây là bazơ mạnh?', options: ['NaOH', 'CH₃COOH', 'HCl', 'CO₂'], correctAnswer: 'NaOH', points: 10, phenomenon: 'NaOH là bazơ mạnh, làm quỳ tím chuyển xanh.' },
  { id: 14, title: 'Trung hòa HCl/NaOH', question: 'Phản ứng trung hòa giữa HCl và NaOH tạo ra?', options: ['NaCl và H₂O', 'H₂ và O₂', 'Na₂O', 'H₂O₂'], correctAnswer: 'NaCl và H₂O', points: 10, phenomenon: 'Axit + Bazơ → Muối + Nước.' },
  { id: 15, title: 'Halogen', question: 'Tính chất chung của halogen (Cl₂, Br₂, I₂) là gì?', options: ['Là phi kim, có tính oxi hóa mạnh', 'Là kim loại', 'Là bazơ mạnh', 'Là khí trơ'], correctAnswer: 'Là phi kim, có tính oxi hóa mạnh', points: 10, phenomenon: 'Halogen là phi kim, dễ nhận electron.' },
  { id: 16, title: 'Thế AgNO₃', question: 'Khi cho Cu vào dung dịch AgNO₃, hiện tượng là?', options: ['Ag kết tủa trắng/kim loại bám lên Cu', 'Cu tan hoàn toàn', 'Dung dịch đổi màu đỏ', 'Không phản ứng'], correctAnswer: 'Ag kết tủa trắng/kim loại bám lên Cu', points: 10, phenomenon: 'Phản ứng thế: Cu + 2AgNO₃ → Cu(NO₃)₂ + 2Ag↓.' },
  { id: 17, title: 'H₂ + Cl₂', question: 'Phương trình cân bằng đơn giản: H₂ + Cl₂ → ?', options: ['2HCl', 'HCl', 'H₂Cl', 'H₂ + Cl₂'], correctAnswer: '2HCl', points: 10, phenomenon: 'Phản ứng hợp thành tạo axit clohidric: H₂ + Cl₂ → 2HCl.' },
  { id: 18, title: 'Oxit axit', question: 'Chất nào là oxit axit?', options: ['CO₂', 'Na₂O', 'CaO', 'Fe₂O₃'], correctAnswer: 'CO₂', points: 10, phenomenon: 'CO₂ là oxit axit khi tan trong nước tạo H₂CO₃.' },
  { id: 19, title: 'Cháy không hoàn toàn', question: 'Trong phản ứng cháy không hoàn toàn, sản phẩm độc hại nào có thể tạo thành?', options: ['CO', 'CO₂', 'H₂O', 'N₂'], correctAnswer: 'CO', points: 10, phenomenon: 'Cháy không đủ oxi sinh ra CO (khí độc).' },
  { id: 20, title: 'Na + nước', question: 'Khi cho Na vào nước, hiện tượng nào xảy ra?', options: ['Tạo dung dịch kiềm và giải phóng H₂', 'Không phản ứng', 'Tạo cái dạng sủi bọt CO₂', 'Dung dịch chuyển màu đỏ'], correctAnswer: 'Tạo dung dịch kiềm và giải phóng H₂', points: 10, phenomenon: 'Na + H₂O → NaOH + 1/2 H₂ (tạo bazơ và H₂).' }
];

const Baitonghop = () => {
  const navigate = useNavigate();
  const { completeChallenge } = useChallengeProgress('tonghop-hoa-9', {
    challengeId: 99,
    programId: 'chemistry',
    grade: 9
  });
  
  // States for completion tracking
  const [startTime] = useState(() => Date.now());
  const [isCompleted, setIsCompleted] = useState(false);
  
  // Game State
  const [gameState, setGameState] = useState('start'); // start, playing, completed
  const [currentStep, setCurrentStep] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [showResume, setShowResume] = useState(false);
  const [animating, setAnimating] = useState(false);
  const [timeLeft, setTimeLeft] = useState(20);

  // Current Challenge Data
  const currentChallenge = CHALLENGES[currentStep];
  const experimentTitle = currentChallenge?.title || `Câu hỏi ${currentStep + 1}`;

  // Check for saved progress
  useEffect(() => {
    const saved = localStorage.getItem('chemistry_tonghop_9_progress');
    if (saved) {
      setShowResume(true);
    }
  }, []);

  // Countdown timer: 20s each question
  useEffect(() => {
    if (gameState !== 'playing') return;
    setTimeLeft(20);
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          // Auto-submit as incorrect if time runs out and no selection yet
          if (selectedOption === null) {
            setIsCorrect(false);
            setSelectedOption('__timeout__');
            setShowExplanation(true);
            setAnimating(false);
          }
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [gameState, currentStep]);

  const handleStart = () => {
    setGameState('playing');
    setTimeLeft(20);
  };

  const handleResume = () => {
    const saved = JSON.parse(localStorage.getItem('chemistry_tonghop_9_progress'));
    if (saved) {
      setCurrentStep(saved.step);
      setScore(saved.score);
      setGameState('playing');
      setTimeLeft(20);
    }
    setShowResume(false);
  };

  const handleRestart = () => {
    localStorage.removeItem('chemistry_tonghop_9_progress');
    setCurrentStep(0);
    setScore(0);
    setGameState('playing');
    setShowResume(false);
    setTimeLeft(20);
  };

  const handleOptionSelect = (option) => {
    if (selectedOption || animating) return;
    
    setSelectedOption(option);
    setAnimating(true);
    
    const correct = option === currentChallenge.correctAnswer;
    setIsCorrect(correct);

    if (correct) {
      setScore(prev => prev + currentChallenge.points);
      // Play success sound/animation here if needed
    }

    setTimeout(() => {
      setShowExplanation(true);
      setAnimating(false);
    }, 1000);
  };

  const handleNext = () => {
    if (currentStep < CHALLENGES.length - 1) {
      const nextStep = currentStep + 1;
      setCurrentStep(nextStep);
      setSelectedOption(null);
      setIsCorrect(null);
      setShowExplanation(false);
      setTimeLeft(20);
      
      // Save progress
      localStorage.setItem('chemistry_tonghop_9_progress', JSON.stringify({
        step: nextStep,
        score: score
      }));
    } else {
      handleComplete();
    }
  };

  const handleComplete = () => {
    setGameState('completed');
    localStorage.removeItem('chemistry_tonghop_9_progress');
    
    // Calculate stars (max 3)
    const maxScore = CHALLENGES.reduce((acc, curr) => acc + curr.points, 0);
    const percentage = Math.round((score / maxScore) * 100);
    let stars = 0;
    if (percentage >= 90) stars = 3;
    else if (percentage >= 70) stars = 2;
    else if (percentage >= 50) stars = 1;

    // Lưu kết quả khi hoàn thành
    if (!isCompleted) {
      setIsCompleted(true);
      completeChallenge({
        score,
        maxScore,
        percentage,
        stars,
        timeSpent: Math.floor((Date.now() - startTime) / 1000),
        correctAnswers: Math.round(score / 10), // mỗi câu 10 điểm
        totalQuestions: CHALLENGES.length
      });
    }
  };

  // Render Start Screen
  if (gameState === 'start') {
    return (
      <div className="tonghop-game">
        <ResumeDialog 
          isOpen={showResume}
          onResume={handleResume}
          onRestart={handleRestart}
          onClose={() => setShowResume(false)}
        />
        
        <div className="game-header">
          <div className="header-left">
            <Link to="/hoahoc/9" className="back-btn">
              <ArrowLeft size={24} />
            </Link>
            <div className="level-badge">Lớp 9</div>
          </div>
        </div>

        <div className="tonghop-start">
          <div className="start-content">
            <div className="start-card">
              <div className="start-visual">
                <div className="lab-icon">
                  <FlaskConical size={48} />
                </div>
              </div>
              <h1 className="start-title">Tổng Hợp Hóa Học 9</h1>
              <p className="start-desc">
                Kiểm tra kiến thức tổng hợp về Hóa học Vô cơ và Hữu cơ lớp 9.
                Vượt qua các thử thách để chứng tỏ bản lĩnh nhà hóa học trẻ!
              </p>
              <button className="start-btn" onClick={handleStart}>
                <Play size={24} fill="currentColor" />
                Bắt đầu ngay
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Render Completion Screen
  if (gameState === 'completed') {
    const maxScore = CHALLENGES.reduce((acc, curr) => acc + curr.points, 0);
    return (
      <div className="tonghop-game">
        <div className="game-header">
          <div className="header-left">
            <Link to="/hoahoc/9" className="back-btn">
              <ArrowLeft size={24} />
            </Link>
          </div>
        </div>

        <div className="completion-screen">
          <div className="completion-card">
            <div className="completion-icon">
              <Trophy size={40} />
            </div>
            <h2 className="completion-title">Hoàn thành xuất sắc!</h2>
            <div className="completion-score">
              {score} / {maxScore}
            </div>
            <p className="start-desc">
              Bạn đã hoàn thành bài kiểm tra tổng hợp kiến thức Hóa học 9.
            </p>
            <div className="completion-actions">
              <button className="action-btn secondary" onClick={() => navigate('/hoahoc/9')}>
                <ArrowLeft size={20} />
                Quay lại
              </button>
              <button className="action-btn primary" onClick={handleRestart}>
                <RotateCcw size={20} />
                Làm lại
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Render Game Screen
  return (
    <div className="tonghop-game">
      {/* Header */}
      <div className="game-header">
        <div className="header-left">
          <button onClick={() => setGameState('start')} className="back-btn">
            <ArrowLeft size={24} />
          </button>
          <div className="level-badge">Câu {currentStep + 1}/{CHALLENGES.length}</div>
        </div>
        <div className="header-right">
          <div className="score-display" style={{ background: 'rgba(16,185,129,0.12)', borderColor: 'rgba(16,185,129,0.3)', color: '#34d399' }}>
            <Zap size={18} />
            <span>{timeLeft}s</span>
          </div>
          <div className="score-display">
            <Award size={20} />
            <span>{score}</span>
          </div>
        </div>
      </div>

      <div className="game-main" style={{ display: 'flex', justifyContent: 'center', padding: '1rem' }}>
        <div className="game-sidebar" style={{ width: '100%', maxWidth: 720 }}>
          <div className="question-card">
            <div className="flex items-center gap-2 mb-2 text-blue-400">
              <HelpCircle size={18} />
              <span className="text-sm font-semibold">Câu hỏi {currentStep + 1}/{CHALLENGES.length}</span>
            </div>
            <h2 className="question-text" style={{ fontWeight: 700, marginBottom: '0.5rem' }}>{experimentTitle}</h2>
            <p className="question-text">{currentChallenge.question}</p>
            
            <div className="options-grid">
              {currentChallenge.options.map((option, idx) => (
                <button
                  key={idx}
                  className={`option-btn ${
                    selectedOption === option 
                      ? (isCorrect ? 'correct' : 'wrong')
                      : ''
                  } ${selectedOption && option === currentChallenge.correctAnswer ? 'correct' : ''}`}
                  onClick={() => handleOptionSelect(option)}
                  disabled={selectedOption !== null}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>

          {showExplanation && (
            <div className="feedback-area">
              <div className={`feedback-title ${isCorrect ? 'text-green-400' : 'text-red-400'}`}>
                {isCorrect ? <CheckCircle2 size={20} /> : <XCircle size={20} />}
                {isCorrect ? 'Chính xác!' : 'Chưa chính xác'}
              </div>
              <p className="feedback-text">{currentChallenge.phenomenon}</p>
              {currentChallenge.equation && (
                <div className="mt-2 p-2 bg-slate-800 rounded text-center font-mono text-sm text-yellow-400">
                  {currentChallenge.equation}
                </div>
              )}
              <button className="next-btn" onClick={handleNext}>
                {currentStep < CHALLENGES.length - 1 ? 'Câu tiếp theo' : 'Hoàn thành'}
                <ChevronRight size={20} />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Baitonghop;
