import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, Play, RotateCcw, CheckCircle2, XCircle, 
  Trophy, HelpCircle, ChevronRight, Flame,
  FlaskConical, Droplets, Fuel, Zap, Award
} from 'lucide-react';
import useChallengeProgress from '../../../../hooks/useChallengeProgress';
import ResumeDialog from '../../../../components/ResumeDialog';
import './CSS/Bai26_HIDROCACBON.css';

// ================== DATA ==================
const CHALLENGES = [
  {
    id: 1,
    type: 'methane',
    title: 'Metan (CH₄)',
    description: 'Đốt cháy khí metan trong không khí và quan sát sản phẩm.',
    question: 'Khi đốt cháy hoàn toàn metan, sản phẩm tạo thành là gì?',
    options: [ 'CO₂ và H₂','CO₂ và H₂O', 'CO và H₂O', 'C và H₂O'],
    correctAnswer: 'CO₂ và H₂O',
    equation: 'CH₄ + 2O₂ →(t°)→ CO₂ + 2H₂O',
    phenomenon: 'Metan cháy với ngọn lửa màu xanh nhạt, tỏa nhiều nhiệt.',
    hint: 'Hidrocacbon cháy hoàn toàn tạo CO₂ và H₂O.',
    difficulty: 'easy',
    points: 15,
    color: '#3b82f6',
    gradient: 'linear-gradient(135deg, #3b82f6, #60a5fa)',
    icon: Flame
  },
  {
    id: 2,
    type: 'ethylene',
    title: 'Etilen (C₂H₄)',
    description: 'Dẫn khí etilen qua dung dịch brom và quan sát hiện tượng.',
    question: 'Hiện tượng gì xảy ra khi dẫn etilen qua dung dịch brom?',
    options: ['Có kết tủa trắng','Dung dịch brom mất màu',  'Có khí bay lên', 'Không hiện tượng'],
    correctAnswers: ['Dung dịch brom mất màu', 'Có khí bay lên'],
    equation: 'C₂H₄ + Br₂ → C₂H₄Br₂',
    phenomenon: 'Etilen có liên kết đôi C=C nên phản ứng cộng với brom, làm mất màu da cam.',
    hint: 'Liên kết đôi C=C dễ tham gia phản ứng cộng.',
    difficulty: 'medium',
    points: 15,
    color: '#10b981',
    gradient: 'linear-gradient(135deg, #10b981, #34d399)',
    icon: FlaskConical
  },
  {
    id: 3,
    type: 'benzene',
    title: 'Benzen (C₆H₆)',
    description: 'Tìm hiểu cấu trúc và tính chất của benzen.',
    question: 'Benzen có cấu trúc đặc biệt gì và phản ứng chủ yếu là gì?',
    options: [ 'Mạch thẳng, phản ứng cộng', 'Vòng 6 cạnh, phản ứng thế','Vòng 5 cạnh, phản ứng cháy', 'Mạch nhánh, phản ứng trùng hợp'],
    correctAnswer: 'Vòng 6 cạnh, phản ứng thế',
    equation: 'C₆H₆ + Br₂ →(Fe, t°)→ C₆H₅Br + HBr',
    phenomenon: 'Benzen có vòng thơm bền vững, ưu tiên phản ứng thế hơn phản ứng cộng.',
    hint: 'Vòng benzen có cấu trúc cộng hưởng đặc biệt.',
    difficulty: 'hard',
    points: 20,
    color: '#8b5cf6',
    gradient: 'linear-gradient(135deg, #8b5cf6, #a78bfa)',
    icon: Droplets
  },
  {
    id: 4,
    type: 'fuel',
    title: 'Nhiên liệu',
    description: 'Tìm hiểu về các loại nhiên liệu: than, dầu mỏ, khí thiên nhiên.',
    question: 'Thành phần chính của khí thiên nhiên là gì?',
    options: [ 'Etilen (C₂H₄)', 'Benzen (C₆H₆)','Metan (CH₄)', 'Axetilen (C₂H₂)'],
    correctAnswer: 'Metan (CH₄)',
    phenomenon: 'Khí thiên nhiên chứa 95% metan, là nhiên liệu sạch và hiệu quả.',
    hint: 'Metan là hidrocacbon đơn giản nhất.',
    difficulty: 'easy',
    points: 15,
    color: '#64748b',
    gradient: 'linear-gradient(135deg, #64748b, #94a3b8)',
    icon: Fuel
  },
  {
    id: 5,
    type: 'practice',
    title: 'Luyện tập Hidrocacbon',
    description: 'Câu hỏi tổng hợp về các hidrocacbon đã học.',
    question: 'Hidrocacbon nào sau đây làm mất màu dung dịch brom ở điều kiện thường?',
    options: ['Etilen và Axetilen', 'Metan và Benzen', 'Chỉ có Metan', 'Tất cả các chất trên'],
    correctAnswer: 'Etilen và Axetilen',
    phenomenon: 'Chỉ hidrocacbon không no (có liên kết đôi/ba) mới phản ứng cộng với brom ở điều kiện thường.',
    hint: 'Metan no, benzen có vòng thơm bền.',
    difficulty: 'hard',
    points: 15,
    color: '#ec4899',
    gradient: 'linear-gradient(135deg, #ec4899, #f472b6)',
    icon: Award
  }
];

const TOTAL_POINTS = CHALLENGES.reduce((sum, c) => sum + c.points, 0);

// ================== EXPERIMENT COMPONENTS ==================

// Thí nghiệm đốt cháy Metan
const MethaneExperiment = ({ progress, isComplete }) => {
  const stage = progress < 30 ? 'ready' : progress < 70 ? 'burning' : 'complete';
  
  return (
    <div className="experiment-container methane-exp">
      <div className="methane-setup-v3">
        {/* Ống dẫn khí Metan */}
        <div className="gas-pipe-system">
          <div className="gas-label">Khí metan (CH₄) →</div>
          <div className="pipe-horizontal"></div>
          <div className="pipe-curve"></div>
          <div className="pipe-vertical">
             <div className="pipe-tip"></div>
             {/* Ngọn lửa */}
             {stage !== 'ready' && (
              <div className="methane-flame-v3">
                <div className="flame-core"></div>
                <div className="flame-middle"></div>
                <div className="flame-outer"></div>
              </div>
            )}
          </div>
        </div>

        {/* Ống nghiệm úp ngược mới */}
        <div className="new-test-tube-container">
          <div className="test-tube-glass">
            <div className="tube-rim"></div>
            <div className="tube-reflection"></div>
            <div className="tube-reflection-right"></div>
            
            {/* Giọt nước ngưng tụ */}
            {(stage === 'burning' || stage === 'complete') && (
              <>
                <div className="condensation-droplets-v3">
                  {[...Array(12)].map((_, i) => (
                    <div key={i} className="water-drop-v3" style={{ '--i': i }}></div>
                  ))}
                </div>
                
                {/* Khí CO2 thoát ra */}
                <div className="co2-gas-system">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className="co2-particle" style={{ '--i': i }}>CO₂</div>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
      
      
    </div>
  );
};

// Thí nghiệm Etilen + Brom (ống sục dạng chữ U)
const EthyleneExperiment = ({ progress, isComplete }) => {
  const stage = progress < 30 ? 'ready' : progress < 70 ? 'reacting' : 'complete';
  const bromColor = stage === 'complete' ? 'rgba(251, 191, 36, 0.1)' :
                    stage === 'reacting' ? 'rgba(251, 191, 36, 0.45)' :
                    'rgba(251, 191, 36, 0.9)';

  return (
    <div className="experiment-container ethylene-exp">
      <div className="ethylene-apparatus">
        <div className="inlet-assembly">
          <div className="inlet-label-inline">Etilen →</div>
          <div className="inlet-curve"></div>
          <div className="inlet-vertical">
            {stage !== 'ready' && [...Array(6)].map((_, i) => (
              <div key={i} className="inlet-bubble" style={{ '--i': i }}></div>
            ))}
          </div>
        </div>

        <div className="ethylene-tube">
          <div className="tube-glass-body">
            <div className="tube-liquid" style={{ background: bromColor }}></div>

            {stage === 'reacting' && (
              <div className="tube-reaction-bubbles">
                {[...Array(8)].map((_, i) => (
                  <div key={i} className="tube-bubble" style={{ '--i': i }}></div>
                ))}
              </div>
            )}

            {(stage === 'reacting' || stage === 'complete') && (
              <div className="tube-rising-gas">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="gas-bubble" style={{ '--i': i }}></div>
                ))}
              </div>
            )}
          </div>
          <div className="tube-caption">
            {stage === 'ready' && 'Br₂ (dd) da cam'}
            {stage === 'reacting' && 'Đang phản ứng...'}
            {stage === 'complete' && 'Mất màu (C₂H₄Br₂)'}
          </div>
        </div>
      </div>

      
    </div>
  );
};

// Thí nghiệm Benzen
const BenzeneExperiment = ({ progress, isComplete }) => {
  const stage = progress < 40 ? 'structure' : progress < 80 ? 'reaction' : 'complete';
  
  return (
    <div className="experiment-container benzene-exp">
      <div className="benzene-showcase">
        {/* Cấu trúc vòng benzen */}
        <div className={`benzene-ring ${stage}`}>
          <svg viewBox="0 0 100 100" className="ring-svg">
            {/* Vòng 6 cạnh */}
            <polygon 
              points="50,10 90,30 90,70 50,90 10,70 10,30" 
              fill="none" 
              stroke="#8b5cf6" 
              strokeWidth="2"
            />
            {/* Vòng trong (liên kết đôi luân phiên) */}
            <circle cx="50" cy="50" r="25" fill="none" stroke="#8b5cf6" strokeWidth="2" strokeDasharray="5,5" />
            
            {/* Các nguyên tử C */}
            {[
              [50, 10], [90, 30], [90, 70], [50, 90], [10, 70], [10, 30]
            ].map(([x, y], i) => (
              <g key={i}>
                <circle cx={x} cy={y} r="8" fill="#1e293b" stroke="#8b5cf6" strokeWidth="2" />
                <text x={x} y={y + 4} textAnchor="middle" fill="#e2e8f0" fontSize="8">C</text>
              </g>
            ))}
          </svg>
          <span className="ring-label">Vòng benzen C₆H₆</span>
        </div>

        {/* Phản ứng thế */}
        {(stage === 'reaction' || stage === 'complete') && (
          <div className="substitution-reaction">
            <div className="reaction-arrow">→</div>
            <div className="reagents">
              <span className="reagent br2">+ Br₂</span>
              <span className="catalyst">(Fe, t°)</span>
            </div>
            <div className="reaction-arrow">→</div>
            <div className="products-box">
              <span className="product">C₆H₅Br</span>
              <span className="product">+ HBr</span>
            </div>
          </div>
        )}
      </div>

      {/* Thông tin */}
      <div className="exp-info-list">
        <div className={`info-row ${stage !== 'ready' ? 'show' : ''}`}>
          Vòng thơm 6 cạnh đều
        </div>
        <div className={`info-row ${stage === 'reaction' || stage === 'complete' ? 'show' : ''}`}>
          Phản ứng thế (không phải cộng)
        </div>
        <div className={`info-row ${stage === 'complete' ? 'show' : ''}`}>
          Vòng benzen bền vững
        </div>
      </div>
    </div>
  );
};

// Thí nghiệm Nhiên liệu
const FuelExperiment = ({ progress, isComplete }) => {
  const showCoal = progress > 20;
  const showOil = progress > 50;
  const showGas = progress > 80;
  
  return (
    <div className="experiment-container fuel-exp">
      <div className="fuel-showcase">
        {/* Than đá */}
        <div className={`fuel-card coal ${showCoal ? 'show' : ''}`}>
          <div className="fuel-icon">⬛</div>
          <div className="fuel-info">
            <strong>Than đá</strong>
            <span>Chủ yếu là C</span>
            <span className="usage">Nhiệt điện, luyện kim</span>
          </div>
        </div>

        {/* Dầu mỏ */}
        <div className={`fuel-card oil ${showOil ? 'show' : ''}`}>
          <div className="fuel-icon">🛢️</div>
          <div className="fuel-info">
            <strong>Dầu mỏ</strong>
            <span>Hỗn hợp hidrocacbon</span>
            <span className="usage">Xăng, dầu, nhựa đường</span>
          </div>
        </div>

        {/* Khí thiên nhiên */}
        <div className={`fuel-card gas ${showGas ? 'show' : ''}`}>
          <div className="fuel-icon">💨</div>
          <div className="fuel-info">
            <strong>Khí thiên nhiên</strong>
            <span>95% là CH₄</span>
            <span className="usage">Nhiên liệu sạch</span>
          </div>
        </div>
      </div>

      {/* Thông tin */}
      <div className="exp-info-list">
        <div className={`info-row ${showCoal ? 'show' : ''}`}>
          ⛏️ Than: nhiên liệu rắn lâu đời
        </div>
        <div className={`info-row ${showOil ? 'show' : ''}`}>
          🛢️ Dầu mỏ: "vàng đen"
        </div>
        <div className={`info-row ${showGas ? 'show' : ''}`}>
          💨 Khí thiên nhiên: sạch nhất
        </div>
      </div>
    </div>
  );
};

// Thí nghiệm Luyện tập
const PracticeExperiment = ({ progress, isComplete }) => {
  const compounds = [
    { name: 'CH₄', type: 'Metan', bond: 'C-C đơn', reactive: false, color: '#3b82f6' },
    { name: 'C₂H₄', type: 'Etilen', bond: 'C=C đôi', reactive: true, color: '#10b981' },
    { name: 'C₂H₂', type: 'Axetilen', bond: 'C≡C ba', reactive: true, color: '#f59e0b' },
    { name: 'C₆H₆', type: 'Benzen', bond: 'Vòng thơm', reactive: false, color: '#8b5cf6' }
  ];

  return (
    <div className="experiment-container practice-exp">
      <div className="compounds-grid">
        {compounds.map((compound, idx) => {
          const isShown = progress > (idx + 1) * 20;
          return (
            <div 
              key={compound.name}
              className={`compound-card ${isShown ? 'show' : ''} ${compound.reactive ? 'reactive' : 'stable'}`}
              style={{ '--color': compound.color }}
            >
              <div className="compound-formula">{compound.name}</div>
              <div className="compound-name">{compound.type}</div>
              <div className="compound-bond">{compound.bond}</div>
              {isShown && (
                <div className={`brom-test ${compound.reactive ? 'decolor' : 'no-react'}`}>
                  {compound.reactive ? '✓ Mất màu Br₂' : '✗ Không mất màu'}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Kết luận */}
      {isComplete && (
        <div className="practice-conclusion">
          💡 Chỉ hidrocacbon không no (C=C, C≡C) mới làm mất màu Br₂
        </div>
      )}
    </div>
  );
};

// Render experiment based on type
const ExperimentRenderer = ({ challenge, progress, isComplete }) => {
  switch (challenge.type) {
    case 'methane':
      return <MethaneExperiment progress={progress} isComplete={isComplete} />;
    case 'ethylene':
      return <EthyleneExperiment progress={progress} isComplete={isComplete} />;
    case 'benzene':
      return <BenzeneExperiment progress={progress} isComplete={isComplete} />;
    case 'fuel':
      return <FuelExperiment progress={progress} isComplete={isComplete} />;
    case 'practice':
      return <PracticeExperiment progress={progress} isComplete={isComplete} />;
    default:
      return null;
  }
};

// ================== MAIN COMPONENT ==================
const Bai26_HIDROCACBON = () => {
  const navigate = useNavigate();
  const { hasProgress, saveProgress, clearProgress, getProgress } = useChallengeProgress('hidrocacbon-9-bai26');

  const [gameStarted, setGameStarted] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [showResumeDialog, setShowResumeDialog] = useState(false);
  const [currentChallenge, setCurrentChallenge] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(
    Array.isArray(CHALLENGES[0]?.correctAnswers) ? [] : null
  );
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [completedChallenges, setCompletedChallenges] = useState([]);
  const [answeredCorrectly, setAnsweredCorrectly] = useState([]);
  
  const [retryQueue, setRetryQueue] = useState([]);
  const [isRetryMode, setIsRetryMode] = useState(false);
  const [retryIndex, setRetryIndex] = useState(0);

  const [experimentProgress, setExperimentProgress] = useState(0);
  const [isExperimentRunning, setIsExperimentRunning] = useState(false);
  const [isExperimentComplete, setIsExperimentComplete] = useState(false);
  const [prefersReducedMotion] = useState(() =>
    typeof window !== 'undefined' && window.matchMedia
      ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
      : false
  );
  const experimentIntervalRef = useRef(null);

  const clearExperimentInterval = () => {
    if (experimentIntervalRef.current) {
      clearInterval(experimentIntervalRef.current);
      experimentIntervalRef.current = null;
    }
  };

  const challenge = CHALLENGES[currentChallenge];
  const ChallengeIcon = challenge?.icon || FlaskConical;
  const isMultiSelect = Array.isArray(challenge.correctAnswers);
  const correctOptions = isMultiSelect ? challenge.correctAnswers : [challenge.correctAnswer];
  const selectedList = Array.isArray(selectedAnswer)
    ? selectedAnswer
    : selectedAnswer
      ? [selectedAnswer]
      : [];
  const requiredSelections = correctOptions.length;

  useEffect(() => {
    if (hasProgress && !gameStarted && !showResults) {
      setShowResumeDialog(true);
    }
  }, [hasProgress, gameStarted, showResults]);

  useEffect(() => {
    if (gameStarted && !showResults) {
      saveProgress({
        currentChallenge,
        score,
        completedChallenges,
        answeredCorrectly,
        experimentProgress,
        isExperimentComplete,
        selectedAnswer,
        isAnswerSubmitted,
        showHint,
        retryQueue,
        isRetryMode,
        retryIndex
      });
    }
  }, [currentChallenge, score, completedChallenges, answeredCorrectly, gameStarted, showResults, experimentProgress, isExperimentComplete, selectedAnswer, isAnswerSubmitted, showHint, retryQueue, isRetryMode, retryIndex]);

  useEffect(() => () => clearExperimentInterval(), []);

  const resetQuestion = (targetIndex = currentChallenge) => {
    clearExperimentInterval();
    const targetChallenge = CHALLENGES[targetIndex] || challenge;
    setSelectedAnswer(Array.isArray(targetChallenge.correctAnswers) ? [] : null);
    setIsAnswerSubmitted(false);
    setShowHint(false);
    setExperimentProgress(0);
    setIsExperimentRunning(false);
    setIsExperimentComplete(false);
  };

  const startGame = useCallback((fromBeginning = false) => {
    if (fromBeginning) {
      clearProgress();
      setCurrentChallenge(0);
      setScore(0);
      setCompletedChallenges([]);
      setAnsweredCorrectly([]);
      setRetryQueue([]);
      setIsRetryMode(false);
      setRetryIndex(0);
      resetQuestion(0);
    } else {
      const saved = getProgress();
      if (saved) {
        setCurrentChallenge(saved.currentChallenge || 0);
        setScore(saved.score || 0);
        setCompletedChallenges(saved.completedChallenges || []);
        setAnsweredCorrectly(saved.answeredCorrectly || []);
        setExperimentProgress(saved.experimentProgress || 0);
        setIsExperimentComplete(saved.isExperimentComplete || false);
        const targetChallenge = CHALLENGES[saved.currentChallenge || 0];
        const defaultAnswer = Array.isArray(targetChallenge?.correctAnswers) ? [] : null;
        const normalizedSavedAnswer = Array.isArray(saved.selectedAnswer)
          ? saved.selectedAnswer
          : targetChallenge?.correctAnswers && saved.selectedAnswer
            ? [saved.selectedAnswer]
            : saved.selectedAnswer;
        setSelectedAnswer(normalizedSavedAnswer ?? defaultAnswer);
        setIsAnswerSubmitted(saved.isAnswerSubmitted || false);
        setShowHint(saved.showHint || false);
        setRetryQueue(saved.retryQueue || []);
        setIsRetryMode(saved.isRetryMode || false);
        setRetryIndex(saved.retryIndex || 0);
      }
    }
    setGameStarted(true);
    setShowResults(false);
    setShowResumeDialog(false);
  }, [clearProgress, getProgress]);

  const runExperiment = () => {
    if (isExperimentRunning || isExperimentComplete) return;
    if (prefersReducedMotion) {
      setExperimentProgress(100);
      setIsExperimentComplete(true);
      return;
    }
    clearExperimentInterval();
    setIsExperimentRunning(true);
    setExperimentProgress(0);

    experimentIntervalRef.current = setInterval(() => {
      setExperimentProgress(prev => {
        if (prev >= 100) {
          clearExperimentInterval();
          setIsExperimentRunning(false);
          setIsExperimentComplete(true);
          return 100;
        }
        return prev + 2;
      });
    }, 50);
  };

  const resetExperiment = () => {
    clearExperimentInterval();
    setExperimentProgress(0);
    setIsExperimentRunning(false);
    setIsExperimentComplete(false);
  };

  const handleOptionSelect = (option) => {
    if (isAnswerSubmitted) return;

    if (isMultiSelect) {
      setSelectedAnswer(prev => {
        const current = Array.isArray(prev) ? prev : [];
        if (current.includes(option)) {
          return current.filter(item => item !== option);
        }
        if (current.length >= requiredSelections) {
          return current;
        }
        return [...current, option];
      });
    } else {
      setSelectedAnswer(option);
    }
  };

  const checkAnswer = () => {
    if (selectedList.length === 0) return;
    setIsAnswerSubmitted(true);

    const isCorrect = isMultiSelect
      ? selectedList.length === correctOptions.length &&
        correctOptions.every(option => selectedList.includes(option))
      : selectedList[0] === challenge.correctAnswer;
    
    if (isRetryMode) {
      if (isCorrect) {
        setScore(prev => prev + Math.floor(challenge.points / 2));
        setAnsweredCorrectly(prev => [...prev, currentChallenge]);
      }
    } else {
      if (isCorrect) {
        setScore(prev => prev + challenge.points);
        setAnsweredCorrectly(prev => [...prev, currentChallenge]);
      } else {
        setRetryQueue(prev => [...prev, currentChallenge]);
      }
    }
    setCompletedChallenges(prev => 
      prev.includes(currentChallenge) ? prev : [...prev, currentChallenge]
    );
  };

  const nextChallenge = () => {
    if (isRetryMode) {
      const nextRetryIdx = retryIndex + 1;
      if (nextRetryIdx < retryQueue.length) {
        setRetryIndex(nextRetryIdx);
        setCurrentChallenge(retryQueue[nextRetryIdx]);
        resetQuestion(retryQueue[nextRetryIdx]);
      } else {
        setShowResults(true);
        clearProgress();
      }
    } else {
      if (currentChallenge < CHALLENGES.length - 1) {
        setCurrentChallenge(prev => prev + 1);
        resetQuestion(currentChallenge + 1);
      } else if (retryQueue.length > 0) {
        setIsRetryMode(true);
        setRetryIndex(0);
        setCurrentChallenge(retryQueue[0]);
        resetQuestion(retryQueue[0]);
      } else {
        setShowResults(true);
        clearProgress();
      }
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
    setRetryQueue([]);
    setIsRetryMode(false);
    setRetryIndex(0);
    resetQuestion(0);
  };

  // ================== RESULTS SCREEN ==================
  if (showResults) {
    const percentage = Math.round((score / TOTAL_POINTS) * 100);
    const correctCount = answeredCorrectly.length;
    
    const getResult = () => {
      if (percentage >= 90) return { emoji: '🏆', title: 'Xuất sắc!', grade: 'A+', color: '#10b981' };
      if (percentage >= 70) return { emoji: '🌟', title: 'Giỏi!', grade: 'A', color: '#3b82f6' };
      if (percentage >= 50) return { emoji: '👍', title: 'Khá!', grade: 'B', color: '#f59e0b' };
      return { emoji: '💪', title: 'Cố gắng thêm!', grade: 'C', color: '#ef4444' };
    };
    const result = getResult();

    return (
      <div className="hidrocacbon-game">
        <div className="results-container">
          <div className="results-card" style={{ '--accent': result.color }}>
            <div className="trophy-section">
              <span className="trophy-emoji">{result.emoji}</span>
              <div className="grade-badge" style={{ background: result.color }}>{result.grade}</div>
            </div>
            
            <h1>{result.title}</h1>
            
            <div className="score-display">
              <div className="score-circle" style={{ '--progress': percentage }}>
                <span className="score-value">{score}</span>
                <span className="score-total">/ {TOTAL_POINTS}</span>
              </div>
              <p>{percentage}% - Đúng {correctCount}/{CHALLENGES.length} câu</p>
            </div>

            <div className="result-actions">
              <button className="btn-primary" onClick={restartGame}>
                <RotateCcw size={18} /> Làm lại
              </button>
              <button className="btn-secondary" onClick={() => navigate('/advanced-challenge')}>
                <ArrowLeft size={18} /> Về danh sách
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
      <div className="hidrocacbon-game">
        <div className="start-container">
          <Link to="/advanced-challenge" className="back-link">
            <ArrowLeft size={18} /> Quay lại
          </Link>
          
          <div className="start-card">
            <div className="start-header">
              <div className="start-icon">⛽</div>
              <h1>Hidrocacbon</h1>
              <p>Khám phá thế giới hợp chất hữu cơ</p>
            </div>

            <div className="challenge-info">
              <div className="info-item">
                <FlaskConical size={16} />
                <span>{CHALLENGES.length} thí nghiệm</span>
              </div>
              <div className="info-item">
                <Trophy size={16} />
                <span>{TOTAL_POINTS} điểm</span>
              </div>
              <div className="info-item">
                <Zap size={16} />
                <span>Lớp 9</span>
              </div>
            </div>

            <div className="topics-list">
              <h3>📚 Nội dung bài học:</h3>
              <ul>
                <li>🔥 Metan - khí đầm lầy</li>
                <li>🧪 Etilen - phản ứng cộng</li>
                <li>🔷 Benzen - vòng thơm</li>
                <li>⛽ Nhiên liệu hóa thạch</li>
                <li>📝 Luyện tập tổng hợp</li>
              </ul>
            </div>

            <button className="btn-start" onClick={() => startGame(true)}>
              <Play size={20} /> Bắt đầu thử thách
            </button>
          </div>
        </div>

        {showResumeDialog && (
          <ResumeDialog
            onResume={() => startGame(false)}
            onStartNew={() => startGame(true)}
            savedProgress={{
              current: (getProgress()?.currentChallenge || 0) + 1,
              total: CHALLENGES.length,
              score: getProgress()?.score || 0
            }}
          />
        )}
      </div>
    );
  }

  // ================== GAME SCREEN ==================
  return (
    <div className="hidrocacbon-game fullscreen">
      {/* Top Bar */}
      <div className="top-bar">
        <Link to="/advanced-challenge" className="back-link">
          <ArrowLeft size={18} /> Quay lại
        </Link>
        
        <div className="challenge-badge" style={{ background: challenge.gradient }}>
          <ChallengeIcon size={18} color="white" />
          <span>{challenge.title}</span>
        </div>
        
        <div className="top-bar-right">
          <div className="progress-compact">
            <span>{currentChallenge + 1}/{CHALLENGES.length}</span>
            <div className="progress-dots">
              {CHALLENGES.map((_, idx) => (
                <div 
                  key={idx} 
                  className={`dot ${idx === currentChallenge ? 'active' : ''} ${completedChallenges.includes(idx) ? 'done' : ''}`}
                ></div>
              ))}
            </div>
          </div>
          <div className="score-badge">
            <Trophy size={14} />
            <span>{score}</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="game-main">
        {/* Left Panel - Experiment */}
        <div className="panel-left">
          <div className="panel-header">
            <FlaskConical size={18} />
            <span>Thí nghiệm mô phỏng</span>
            <div className={`difficulty-tag ${challenge.difficulty}`}>
              {challenge.difficulty === 'easy' && 'Dễ'}
              {challenge.difficulty === 'medium' && 'TB'}
              {challenge.difficulty === 'hard' && 'Khó'}
            </div>
          </div>
          
          <div className="experiment-area">
            <ExperimentRenderer 
              challenge={challenge}
              progress={experimentProgress}
              isComplete={isExperimentComplete}
            />
            {isExperimentComplete && (
              <div className="exp-hint-badge">
                <div className="exp-hint-label">Gợi ý</div>
                <div className="exp-hint-text">{challenge.phenomenon}</div>
              </div>
            )}
          </div>
          
          <div className="experiment-controls">
            {!isExperimentComplete ? (
              <button 
                className="btn-experiment"
                onClick={runExperiment}
                disabled={isExperimentRunning}
              >
                {isExperimentRunning ? (
                  <>Đang chạy... {experimentProgress}%</>
                ) : (
                  <><Play size={16} /> Chạy thí nghiệm</>
                )}
              </button>
            ) : (
              <button className="btn-reset" onClick={resetExperiment}>
                <RotateCcw size={16} /> Chạy lại
              </button>
            )}
          </div>
        </div>

        {/* Right Panel - Question */}
        <div className="panel-right">
          <div className="panel-header">
            <HelpCircle size={18} />
            <span>Câu hỏi</span>
            <span className="points-badge">+{challenge.points} điểm</span>
          </div>
          
          <div className="question-area">
            {!isExperimentComplete ? (
              <div className="waiting-message">
                <Play size={40} />
                <p>Chạy thí nghiệm để xem câu hỏi</p>
              </div>
            ) : (
              <>
                <p className="question-text">{challenge.question}</p>
                {isMultiSelect && (
                  <p className="multi-select-note">Chọn {requiredSelections} đáp án đúng</p>
                )}
                
                <div className="options-grid">
                  {challenge.options.map((option, idx) => {
                    const isSelected = isMultiSelect
                      ? selectedList.includes(option)
                      : selectedAnswer === option;
                    const isCorrectOption = correctOptions.includes(option);

                    let optionClass = 'option-btn';
                    if (isAnswerSubmitted) {
                      if (isCorrectOption) {
                        optionClass += ' correct';
                      } else if (isSelected) {
                        optionClass += ' incorrect';
                      }
                    } else if (isSelected) {
                      optionClass += ' selected';
                    }
                    
                    return (
                      <button
                        key={idx}
                        className={optionClass}
                        onClick={() => handleOptionSelect(option)}
                        disabled={isAnswerSubmitted}
                      >
                        <span className="option-letter">{String.fromCharCode(65 + idx)}</span>
                        <span className="option-text">{option}</span>
                        {isAnswerSubmitted && isCorrectOption && (
                          <CheckCircle2 size={18} className="icon-correct" />
                        )}
                        {isAnswerSubmitted && isSelected && !isCorrectOption && (
                          <XCircle size={18} className="icon-incorrect" />
                        )}
                      </button>
                    );
                  })}
                </div>
                
                {!isAnswerSubmitted && (
                  <button className="btn-hint-inline" onClick={() => setShowHint(!showHint)}>
                    <HelpCircle size={14} />
                    {showHint ? 'Ẩn gợi ý' : 'Gợi ý'}
                  </button>
                )}
                {showHint && !isAnswerSubmitted && (
                  <p className="hint-text">{challenge.hint}</p>
                )}
                
                {isAnswerSubmitted && challenge.equation && (
                  <div className="equation-box">
                    <strong>PT:</strong> {challenge.equation}
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="bottom-bar">
        <div className="bottom-left">
          {isRetryMode && (
            <div className="retry-badge">
              🔄 Làm lại ({retryQueue.length} câu)
            </div>
          )}
        </div>
        
        <div className="action-buttons">
          {!isAnswerSubmitted && isExperimentComplete ? (
            <button 
              className="btn-submit"
              onClick={checkAnswer}
              disabled={selectedList.length === 0}
            >
              <CheckCircle2 size={18} /> Kiểm tra
            </button>
          ) : isAnswerSubmitted ? (
            <button className="btn-next" onClick={nextChallenge}>
              {isRetryMode ? (
                retryQueue.length > 1 ? (
                  <>Câu tiếp <ChevronRight size={18} /></>
                ) : (
                  <>Xem kết quả <Trophy size={18} /></>
                )
              ) : currentChallenge < CHALLENGES.length - 1 ? (
                <>Tiếp theo <ChevronRight size={18} /></>
              ) : retryQueue.length > 0 ? (
                <>Làm lại câu sai <RotateCcw size={18} /></>
              ) : (
                <>Xem kết quả <Trophy size={18} /></>
              )}
            </button>
          ) : (
            <div className="status-hint">
              <Play size={16} /> Chạy thí nghiệm để tiếp tục
            </div>
          )}
        </div>
        
        <div className="bottom-right">
          {!isRetryMode && (
            <div className="progress-text">
              {currentChallenge + 1}/{CHALLENGES.length}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Bai26_HIDROCACBON;
