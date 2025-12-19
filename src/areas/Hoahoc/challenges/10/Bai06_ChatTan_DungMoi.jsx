import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Trophy, Beaker, Play, RotateCcw, Check, X, Lightbulb, FlaskConical, Droplets } from 'lucide-react';
import useChallengeProgress from '../../../../hooks/useChallengeProgress';
import ResumeDialog from '../../../../components/ResumeDialog';
import './CSS/Bai06_ChatTan_DungMoi.css';

// Danh sách dung dịch (dung môi)
const SOLVENTS = [
  { id: 'water', name: 'Nước', formula: 'H₂O', color: '#a8d5ff', icon: '💧' },
  { id: 'ethanol', name: 'Cồn', formula: 'C₂H₅OH', color: '#e8f4ff', icon: '🧴' },
  { id: 'oil', name: 'Dầu ăn', formula: '', color: '#ffe066', icon: '🫒' },
];

// Danh sách chất để thử nghiệm
const SOLUTES = [
  { id: 'salt', name: 'Muối ăn', formula: 'NaCl', color: '#ffffff', particleColor: '#e8e8e8', icon: '⬡', state: 'rắn' },
  { id: 'sugar', name: 'Đường', formula: 'C₁₂H₂₂O₁₁', color: '#fff4d9', particleColor: '#ffe4a3', icon: '◆', state: 'rắn' },
  { id: 'sand', name: 'Cát', formula: 'SiO₂', color: '#d4b896', particleColor: '#c4a676', icon: '●', state: 'rắn' },
  { id: 'iodine', name: 'Iot', formula: 'I₂', color: '#8b5cf6', particleColor: '#7c3aed', icon: '◉', state: 'rắn' },
];

// Kết quả thí nghiệm
const EXPERIMENT_RESULTS = {
  'water-salt': {
    dissolves: true,
    observation: 'Muối tan hoàn toàn trong nước, tạo dung dịch trong suốt.',
    resultColor: '#a8d5ff',
    solute: 'salt',
    solvent: 'water',
    explanation: 'Muối (NaCl) phân ly thành ion Na⁺ và Cl⁻ trong nước. Muối là CHẤT TAN, nước là DUNG MÔI.'
  },
  'water-sugar': {
    dissolves: true,
    observation: 'Đường tan dần trong nước, tạo dung dịch trong suốt có vị ngọt.',
    resultColor: '#c4e3ff',
    solute: 'sugar',
    solvent: 'water',
    explanation: 'Đường hoà tan vào nước nhờ liên kết hydrogen. Đường là CHẤT TAN, nước là DUNG MÔI.'
  },
  'water-sand': {
    dissolves: false,
    observation: 'Cát KHÔNG tan trong nước! Cát lắng xuống đáy cốc.',
    resultColor: '#a8d5ff',
    solute: null,
    solvent: null,
    explanation: 'Cát (SiO₂) có cấu trúc tinh thể bền vững, không tan trong nước. Không tạo dung dịch!'
  },
  'water-iodine': {
    dissolves: false,
    observation: 'Iot hầu như KHÔNG tan trong nước, chỉ tạo màu vàng nhạt.',
    resultColor: '#b8dcff',
    solute: null,
    solvent: null,
    explanation: 'Iot là chất không phân cực, nước là dung môi phân cực → không hoà tan tốt.'
  },
  'water-co2': {
    dissolves: true,
    observation: 'Khí CO₂ tan vào nước, tạo bọt khí và dung dịch axit cacbonic (nước có ga).',
    resultColor: '#a8d5ff',
    solute: 'co2',
    solvent: 'water',
    explanation: 'CO₂ + H₂O → H₂CO₃. Khí CO₂ là CHẤT TAN, nước là DUNG MÔI.'
  },
  'ethanol-salt': {
    dissolves: false,
    observation: 'Muối KHÔNG tan trong cồn! Muối lắng xuống đáy.',
    resultColor: '#e8f4ff',
    solute: null,
    solvent: null,
    explanation: 'Muối ion cần dung môi phân cực mạnh (nước). Cồn phân cực yếu hơn → không hoà tan muối.'
  },
  'ethanol-sugar': {
    dissolves: false,
    observation: 'Đường tan rất ít trong cồn, phần lớn lắng xuống đáy.',
    resultColor: '#e8f4ff',
    solute: null,
    solvent: null,
    explanation: 'Đường tan tốt trong nước hơn cồn do nước có khả năng tạo liên kết hydrogen mạnh hơn.'
  },
  'ethanol-sand': {
    dissolves: false,
    observation: 'Cát KHÔNG tan trong cồn! Cát lắng xuống đáy.',
    resultColor: '#e8f4ff',
    solute: null,
    solvent: null,
    explanation: 'Cát không tan trong bất kỳ dung môi thông thường nào.'
  },
  'ethanol-iodine': {
    dissolves: true,
    observation: 'Iot tan TỐT trong cồn, tạo dung dịch màu nâu đỏ (cồn iot y tế).',
    resultColor: '#8B4513',
    solute: 'iodine',
    solvent: 'ethanol',
    explanation: 'Iot không phân cực tan tốt trong cồn. Iot là CHẤT TAN, cồn là DUNG MÔI.'
  },
  'ethanol-co2': {
    dissolves: true,
    observation: 'Khí CO₂ tan được trong cồn, tạo bọt khí nhỏ.',
    resultColor: '#e8f4ff',
    solute: 'co2',
    solvent: 'ethanol',
    explanation: 'CO₂ có thể hoà tan trong cồn. CO₂ là CHẤT TAN, cồn là DUNG MÔI.'
  },
  'oil-salt': {
    dissolves: false,
    observation: 'Muối KHÔNG tan trong dầu! Muối lắng xuống đáy.',
    resultColor: '#ffe066',
    solute: null,
    solvent: null,
    explanation: 'Muối phân cực, dầu không phân cực → "like dissolves like" không áp dụng.'
  },
  'oil-sugar': {
    dissolves: false,
    observation: 'Đường KHÔNG tan trong dầu! Đường lắng xuống đáy.',
    resultColor: '#ffe066',
    solute: null,
    solvent: null,
    explanation: 'Đường phân cực, dầu không phân cực → không hoà tan được.'
  },
  'oil-sand': {
    dissolves: false,
    observation: 'Cát KHÔNG tan trong dầu! Cát lắng xuống đáy.',
    resultColor: '#ffe066',
    solute: null,
    solvent: null,
    explanation: 'Cát không tan trong dầu cũng như bất kỳ dung môi thông thường nào.'
  },
  'oil-iodine': {
    dissolves: true,
    observation: 'Iot tan TỐT trong dầu, tạo dung dịch màu tím đậm.',
    resultColor: '#8B008B',
    solute: 'iodine',
    solvent: 'oil',
    explanation: 'Iot không phân cực tan tốt trong dầu (cũng không phân cực). Iot là CHẤT TAN, dầu là DUNG MÔI.'
  },
  'oil-co2': {
    dissolves: false,
    observation: 'Khí CO₂ không tan trong dầu, bọt khí nổi lên trên.',
    resultColor: '#ffe066',
    solute: null,
    solvent: null,
    explanation: 'CO₂ tan tốt trong nước hơn trong dầu.'
  },
};

// Danh sách các câu hỏi thử thách
const challenges = [
  {
    id: 1,
    title: 'Thí nghiệm 1: Muối và Nước',
    difficulty: 'Dễ',
    points: 15,
    instruction: 'Cho muối ăn vào nước và quan sát hiện tượng.',
    requiredSolvent: 'water',
    requiredSolute: 'salt',
    hint: 'Muối ăn có tan trong nước không?'
  },
  {
    id: 2,
    title: 'Thí nghiệm 2: Đường và Nước',
    difficulty: 'Dễ',
    points: 15,
    instruction: 'Cho đường vào nước và quan sát hiện tượng.',
    requiredSolvent: 'water',
    requiredSolute: 'sugar',
    hint: 'Nước đường có vị gì?'
  },
  {
    id: 3,
    title: 'Thí nghiệm 3: Cát và Nước',
    difficulty: 'Dễ',
    points: 15,
    instruction: 'Cho cát vào nước và quan sát hiện tượng.',
    requiredSolvent: 'water',
    requiredSolute: 'sand',
    hint: 'Cát có tan trong nước không?'
  },
  {
    id: 4,
    title: 'Thí nghiệm 4: Iot và Cồn',
    difficulty: 'Trung bình',
    points: 20,
    instruction: 'Cho iot vào cồn và quan sát hiện tượng.',
    requiredSolvent: 'ethanol',
    requiredSolute: 'iodine',
    hint: 'Cồn iot y tế có màu gì?'
  },
  {
    id: 5,
    title: 'Thí nghiệm 5: CO₂ và Nước',
    difficulty: 'Trung bình',
    points: 20,
    instruction: 'Sục khí CO₂ vào nước và quan sát hiện tượng.',
    requiredSolvent: 'water',
    requiredSolute: 'co2',
    hint: 'Nước ngọt có ga chứa gì?'
  },
  {
    id: 6,
    title: 'Thí nghiệm 6: Iot và Dầu',
    difficulty: 'Khó',
    points: 25,
    instruction: 'Cho iot vào dầu ăn và quan sát hiện tượng.',
    requiredSolvent: 'oil',
    requiredSolute: 'iodine',
    hint: 'Chất không phân cực tan trong chất không phân cực.'
  },
];

const IdentifyCard = ({ substance, type, onSelectType, isSubmitted, correctType }) => {
  const isCorrect = isSubmitted && (
    (correctType && type === correctType) || 
    (!correctType && type === 'none')
  );
  
  return (
    <div className={`identify-card ${isSubmitted ? (isCorrect ? 'correct' : 'incorrect') : ''}`}>
      <div className="identify-substance">
        <span className="identify-icon">{substance?.icon}</span>
        <span className="identify-name">{substance?.name}</span>
      </div>
      <div className="type-buttons">
        <button
          className={`type-btn ${type === 'solute' ? 'active solute' : ''}`}
          onClick={() => onSelectType('solute')}
          disabled={isSubmitted}
        >
          Chất tan
        </button>
        <button
          className={`type-btn ${type === 'solvent' ? 'active solvent' : ''}`}
          onClick={() => onSelectType('solvent')}
          disabled={isSubmitted}
        >
          Dung môi
        </button>
        <button
          className={`type-btn ${type === 'none' ? 'active none' : ''}`}
          onClick={() => onSelectType('none')}
          disabled={isSubmitted}
        >
          Không tan
        </button>
      </div>
      {isSubmitted && (
        <div className="feedback">
          {isCorrect ? (
            <><Check size={16} /> Đúng!</>
          ) : (
            <><X size={16} /> Sai! Đáp án: {correctType === 'solute' ? 'Chất tan' : correctType === 'solvent' ? 'Dung môi' : 'Không tan'}</>
          )}
        </div>
      )}
    </div>
  );
};

const Bai06_ChatTan_DungMoi = () => {
  const { hasProgress, saveProgress, clearProgress, getProgress, completeChallenge } = useChallengeProgress('chat-tan-dung-moi', {
    challengeId: 6,
    programId: 'chemistry',
    grade: 10
  });
  const [startTime] = useState(() => Date.now());
  const [isCompleted, setIsCompleted] = useState(false);

  // Game states
  const [gameStarted, setGameStarted] = useState(false);
  const [showResumeDialog, setShowResumeDialog] = useState(false);
  const [currentChallenge, setCurrentChallenge] = useState(0);
  const [score, setScore] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [correctAnswers, setCorrectAnswers] = useState(0);

  // Experiment states  
  const [selectedSolvent, setSelectedSolvent] = useState(null);
  const [selectedSolute, setSelectedSolute] = useState(null);
  const [isExperimenting, setIsExperimenting] = useState(false);
  const [experimentResult, setExperimentResult] = useState(null);
  const [showIdentify, setShowIdentify] = useState(false);
  const [answers, setAnswers] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [isDroppingAnimation, setIsDroppingAnimation] = useState(false);
  const [spoonAnimation, setSpoonAnimation] = useState(null); // { startX, startY, endX, endY }

  const challenge = challenges[currentChallenge];

  // Check for saved progress on mount
  useEffect(() => {
    if (hasProgress && !gameStarted && !showResults) {
      setShowResumeDialog(true);
    }
  }, [hasProgress, gameStarted, showResults]);

  const startGame = (fromBeginning = false) => {
    if (fromBeginning) {
      clearProgress();
      setCurrentChallenge(0);
      setScore(0);
      setCorrectAnswers(0);
    } else {
      const saved = getProgress();
      if (saved) {
        setCurrentChallenge(saved.currentChallenge || 0);
        setScore(saved.score || 0);
        setCorrectAnswers(saved.correctAnswers || 0);
      }
    }
    resetExperiment();
    setGameStarted(true);
    setShowResumeDialog(false);
    setShowResults(false);
  };

  const resetExperiment = () => {
    setSelectedSolvent(null);
    setSelectedSolute(null);
    setIsExperimenting(false);
    setExperimentResult(null);
    setShowIdentify(false);
    setAnswers({});
    setIsSubmitted(false);
    setShowHint(false);
    setIsDroppingAnimation(false);
    setSpoonAnimation(null);
  };

  const handleSelectSolvent = (solventId) => {
    if (experimentResult) return;
    setSelectedSolvent(solventId);
  };
  const handleSelectSolute = (soluteId, event) => {
    if (experimentResult || isExperimenting || isDroppingAnimation || spoonAnimation) return;
    
    if (!selectedSolvent) {
      alert("Vui lòng chọn dung dịch (dung môi) trước!");
      return;
    }

    setSelectedSolute(soluteId);
    
    // Start Spoon Animation
    const jarRect = event.currentTarget.getBoundingClientRect();
    const beakerElement = document.querySelector('.beaker-body');
    
    if (!beakerElement) {
      console.error('Beaker element not found');
      return;
    }
    
    const beakerRect = beakerElement.getBoundingClientRect();
    
    setSpoonAnimation({
      active: true,
      startX: jarRect.left + jarRect.width / 2,
      startY: jarRect.top + jarRect.height / 2,
      endX: beakerRect.left + beakerRect.width / 2,
      endY: beakerRect.top - 20, // Above the beaker
    });

    // Sequence: Spoon Move -> Drop -> Mix -> Result
    setTimeout(() => {
      // Spoon arrived, start dropping
      setSpoonAnimation(null);
      setIsDroppingAnimation(true);
      
      setTimeout(() => {
        setIsDroppingAnimation(false);
        setIsExperimenting(true);
        
        setTimeout(() => {
          const resultKey = `${selectedSolvent}-${soluteId}`;
          const result = EXPERIMENT_RESULTS[resultKey];
          setExperimentResult(result);
          setIsExperimenting(false);
        }, 1500);
      }, 800);
    }, 1000);
  };

  const handlePerformExperiment = () => {
    // Deprecated in favor of spoon interaction
  };

  const isCorrectSelection = selectedSolvent === challenge.requiredSolvent && 
                             selectedSolute === challenge.requiredSolute;

  const handleProceedToIdentify = () => {
    setShowIdentify(true);
  };

  const handleSelectType = (substanceId, type) => {
    if (isSubmitted) return;
    setAnswers(prev => ({ ...prev, [substanceId]: type }));
  };

  const handleSubmitAnswer = () => {
    if (Object.keys(answers).length < 2) return;

    const result = experimentResult;
    let correct = true;
    
    if (result.solute === null && result.solvent === null) {
      // Không tan
      if (answers[selectedSolute] !== 'none' || answers[selectedSolvent] !== 'none') {
        correct = false;
      }
    } else {
      if (answers[selectedSolute] !== 'solute') correct = false;
      if (answers[selectedSolvent] !== 'solvent') correct = false;
    }

    if (correct) {
      setScore(prev => prev + challenge.points);
      setCorrectAnswers(prev => prev + 1);
    }
    setIsSubmitted(true);
  };

  const handleNext = () => {
    if (currentChallenge < challenges.length - 1) {
      const nextChallenge = currentChallenge + 1;
      setCurrentChallenge(nextChallenge);
      resetExperiment();
      saveProgress({
        currentChallenge: nextChallenge,
        score,
        correctAnswers
      });
    } else {
      setShowResults(true);
      clearProgress();
      
      // Lưu kết quả hoàn thành vào database
      if (!isCompleted) {
        setIsCompleted(true);
        const maxScore = challenges.reduce((sum, c) => sum + c.points, 0);
        const percentage = Math.round((score / maxScore) * 100);
        const stars = percentage >= 80 ? 3 : percentage >= 50 ? 2 : 1;
        completeChallenge({
          score,
          maxScore,
          percentage,
          stars,
          timeSpent: Math.floor((Date.now() - startTime) / 1000),
          correctAnswers,
          totalQuestions: challenges.length
        });
      }
    }
  };

  const handleRetry = () => {
    startGame(true);
  };

  // Get selected items data
  const selectedSolventData = SOLVENTS.find(s => s.id === selectedSolvent);
  const selectedSoluteData = SOLUTES.find(s => s.id === selectedSolute);

  if (showResumeDialog) {
    const saved = getProgress();
    const progressInfo = saved
      ? {
          current: (saved.currentChallenge || 0) + 1,
          total: challenges.length,
          score: saved.score || 0,
        }
      : { current: 1, total: challenges.length };

    return (
      <ResumeDialog
        show={true}
        onResume={() => startGame(false)}
        onRestart={() => startGame(true)}
        progressInfo={progressInfo}
      />
    );
  }

  if (!gameStarted) {
    return (
      <div className="chat-tan-dung-moi-container">
        <div className="game-header">
          <Link to="/advanced-challenge" className="back-button">
            <ArrowLeft size={20} />
            Quay lại
          </Link>
          <h1><Beaker size={28} /> Chất tan & Dung môi</h1>
          <div></div>
        </div>

        <div className="game-content intro-wrapper">
          <div className="intro-section">
            <div className="intro-hero">
              <div className="hero-icon">🧪</div>
              <h2>Khám phá Chất tan & Dung môi</h2>
              <p className="hero-subtitle">Thực hành thí nghiệm ảo để hiểu về quá trình hòa tan</p>
            </div>

            <div className="intro-cards">
              <div className="intro-card knowledge">
                <div className="card-icon">📚</div>
                <h3>Kiến thức cần nhớ</h3>
                <ul className="knowledge-list">
                  <li><span className="highlight">Chất tan:</span> Chất bị hoà tan (rắn, lỏng hoặc khí)</li>
                  <li><span className="highlight">Dung môi:</span> Chất có khả năng hoà tan chất khác</li>
                  <li><span className="highlight">Dung dịch:</span> Hỗn hợp đồng nhất của chất tan và dung môi</li>
                  <li>⚠️ Một số chất <strong>KHÔNG</strong> tan vào nhau</li>
                </ul>
              </div>

              <div className="intro-card challenge">
                <div className="card-icon">🎯</div>
                <h3>Nội dung thử thách</h3>
                <div className="challenge-stats">
                  <div className="stat">
                    <span className="stat-number">{challenges.length}</span>
                    <span className="stat-label">Thí nghiệm</span>
                  </div>
                  <div className="stat">
                    <span className="stat-number">{challenges.reduce((sum, c) => sum + c.points, 0)}</span>
                    <span className="stat-label">Tổng điểm</span>
                  </div>
                </div>
                <div className="steps">
                  <div className="step"><span className="step-num">1</span> Chọn dung dịch</div>
                  <div className="step"><span className="step-num">2</span> Cho chất vào</div>
                  <div className="step"><span className="step-num">3</span> Quan sát kết quả</div>
                  <div className="step"><span className="step-num">4</span> Xác định vai trò</div>
                </div>
              </div>
            </div>

            <button className="btn-start" onClick={() => startGame(true)}>
              <Play size={22} /> Bắt đầu thử thách
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (showResults) {
    const percentage = Math.round((correctAnswers / challenges.length) * 100);
    const getResultEmoji = () => {
      if (percentage === 100) return '🏆';
      if (percentage >= 70) return '🎉';
      if (percentage >= 50) return '👍';
      return '📚';
    };
    
    return (
      <div className="chat-tan-dung-moi-container">
        <div className="game-header">
          <Link to="/advanced-challenge" className="back-button">
            <ArrowLeft size={20} />
            Quay lại
          </Link>
          <h1><Trophy size={28} /> Kết quả</h1>
          <div></div>
        </div>

        <div className="game-content results-wrapper">
          <div className="results-section">
            <div className="results-card">
              <div className="trophy-icon">{getResultEmoji()}</div>
              <h2>Hoàn thành thử thách!</h2>
              
              <div className="score-display">
                <div className="score-circle">
                  <div className="score-number">{score}</div>
                  <div className="score-label">điểm</div>
                </div>
              </div>

              <div className="stats-row">
                <div className="stat-item correct">
                  <Check size={20} />
                  <span className="stat-value">{correctAnswers}/{challenges.length}</span>
                  <span className="stat-label">Đúng</span>
                </div>
                <div className="stat-item percentage">
                  <Trophy size={20} />
                  <span className="stat-value">{percentage}%</span>
                  <span className="stat-label">Tỉ lệ</span>
                </div>
              </div>

              <div className={`result-message ${percentage >= 70 ? 'success' : 'encourage'}`}>
                {percentage === 100 ? '🎊 Xuất sắc! Bạn đã nắm vững kiến thức về chất tan và dung môi!' :
                 percentage >= 70 ? '👏 Tốt lắm! Bạn hiểu rõ hầu hết các khái niệm. Ôn lại một chút nữa nhé!' :
                 percentage >= 50 ? '💪 Cố gắng hơn nữa! Hãy xem lại lý thuyết về độ tan.' :
                 '📖 Đừng nản! Hãy đọc lại lý thuyết và thử lại nhé!'}
              </div>

              <div className="result-actions">
                <button className="btn-secondary" onClick={handleRetry}>
                  <RotateCcw size={18} /> Làm lại
                </button>
                <Link to="/advanced-challenge" className="btn-primary">
                  <ArrowLeft size={18} /> Quay về
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="chat-tan-dung-moi-container">
      <div className="game-header">
        <Link to="/advanced-challenge" className="back-button">
          <ArrowLeft size={20} />
          Quay lại
        </Link>
        <h1><FlaskConical size={24} /> Thí nghiệm {currentChallenge + 1}/{challenges.length}</h1>
        <div className="header-stats">
          <span className="score-badge">
            <Trophy size={16} /> {score} điểm
          </span>
        </div>
      </div>

      <div className="game-content">
        {/* Progress Bar */}
        <div className="progress-bar-container">
          <div className="progress-bar">
            <div 
              className="progress-fill" 
              style={{ width: `${((currentChallenge) / challenges.length) * 100}%` }}
            ></div>
          </div>
          <span className="progress-text">{currentChallenge + 1}/{challenges.length}</span>
        </div>

        {/* Challenge Info */}
        <div className="challenge-header">
          <div className="challenge-title">
            <span className={`difficulty-badge ${challenge?.difficulty === 'Dễ' ? 'easy' : challenge?.difficulty === 'Trung bình' ? 'medium' : 'hard'}`}>
              {challenge?.difficulty}
            </span>
            <h2>{challenge?.title}</h2>
          </div>
          <div className="challenge-points">+{challenge?.points} điểm</div>
        </div>

        {/* Instruction */}
        <div className="instruction-box">
          <div className="instruction-icon">🔬</div>
          <div className="instruction-content">
            <strong>Yêu cầu:</strong> {challenge?.instruction}
          </div>
          {!experimentResult && (
            <button
              className="btn-hint-inline"
              onClick={() => setShowHint(!showHint)}
              title="Xem gợi ý"
            >
              <Lightbulb size={18} />
            </button>
          )}
        </div>

        {showHint && !experimentResult && (
          <div className="hint-box">
            <Lightbulb size={16} /> <strong>Gợi ý:</strong> {challenge?.hint}
          </div>
        )}

        {!showIdentify ? (
          <>
            {/* Step 1: Solvent Selection - Horizontal Tabs */}
            <div className="solvent-tabs-section">
              <h3 className="step-title"><Droplets size={16} /> Bước 1: Chọn dung dịch</h3>
              <div className="solvent-tabs">
                {SOLVENTS.map(solvent => (
                  <button
                    key={solvent.id}
                    className={`solvent-tab ${selectedSolvent === solvent.id ? 'active' : ''} ${experimentResult ? 'disabled' : ''}`}
                    onClick={() => handleSelectSolvent(solvent.id)}
                    disabled={!!experimentResult}
                  >
                    <span className="tab-icon">{solvent.icon}</span>
                    <div className="tab-info">
                      <span className="tab-name">{solvent.name}</span>
                      {solvent.formula && <span className="tab-formula">{solvent.formula}</span>}
                    </div>
                    {selectedSolvent === solvent.id && <Check size={16} className="tab-check" />}
                  </button>
                ))}
              </div>
            </div>

            {/* Main Lab Area - Beaker + Chemical Shelf */}
            <div className="experiment-lab">
              {/* Left - Beaker */}
              <div className="beaker-section">
                <div className="beaker-wrapper">
                  <div className="beaker">
                    {/* Beaker Glass Container */}
                    <div className="beaker-container-glass">
                      {/* Pour Spout */}
                      <div className="beaker-spout"></div>
                      
                      {/* Main Glass Body */}
                      <div className="beaker-body">
                        {/* Measurement Marks */}
                        <div className="measurement-marks">
                          <div className="mark mark-100"><span>100ml</span></div>
                          <div className="mark mark-75"><span>75ml</span></div>
                          <div className="mark mark-50"><span>50ml</span></div>
                          <div className="mark mark-25"><span>25ml</span></div>
                        </div>
                        
                        {/* Glass Shine Effect */}
                        <div className="glass-shine"></div>
                        
                        {/* Liquid Content */}
                        {selectedSolvent ? (
                          <div 
                            className={`beaker-liquid ${isExperimenting ? 'mixing' : ''}`}
                            style={{ 
                              backgroundColor: experimentResult ? experimentResult.resultColor : selectedSolventData?.color 
                            }}
                          >
                            {/* Liquid Surface */}
                            <div className="liquid-surface"></div>
                            
                            {isExperimenting && (
                              <div className="bubbles">
                                <span className="bubble"></span>
                                <span className="bubble"></span>
                                <span className="bubble"></span>
                              </div>
                            )}
                            {experimentResult && !experimentResult.dissolves && (
                              <div className="sediment">
                                {selectedSoluteData?.icon}
                              </div>
                            )}
                          </div>
                        ) : (
                          <div className="beaker-empty">
                            <Droplets size={32} />
                            <span>Chọn dung dịch</span>
                          </div>
                        )}
                      </div>
                      
                      {/* Base Stand */}
                      <div className="beaker-stand">
                        <div className="stand-top"></div>
                        <div className="stand-base"></div>
                      </div>
                    </div>
                    
                    {/* Dropping Particles Animation */}
                    {isDroppingAnimation && selectedSoluteData && (
                      <div className="particles-container">
                        {[...Array(12)].map((_, i) => (
                          <div 
                            key={i} 
                            className="particle"
                            style={{
                              left: `${45 + Math.random() * 10}%`,
                              animationDelay: `${i * 0.08}s`,
                              backgroundColor: selectedSoluteData.particleColor
                            }}
                          />
                        ))}
                      </div>
                    )}
                  </div>
                  
                  {/* Beaker Label */}
                  {selectedSolvent && (
                    <div className="beaker-label">
                      <span className="beaker-label-icon">{selectedSolventData?.icon}</span>
                      <span className="beaker-label-name">{selectedSolventData?.name}</span>
                      {selectedSolventData?.formula && (
                        <span className="beaker-label-formula">({selectedSolventData?.formula})</span>
                      )}
                    </div>
                  )}
                </div>
              </div>

              {/* Right - Chemical Shelf */}
              <div className="chemical-section">
                <h3 className="step-title"><Beaker size={16} /> Bước 2: Chọn chất thử nghiệm</h3>
                <p className="section-hint">
                  {selectedSolvent 
                    ? '👆 Click chọn chất để cho vào cốc' 
                    : '⬅️ Chọn dung dịch trước'}
                </p>
                <div className="chemical-grid">
                  {SOLUTES.map(solute => (
                    <button
                      key={solute.id}
                      id={`jar-${solute.id}`}
                      className={`chemical-card ${selectedSolute === solute.id ? 'selected' : ''} ${experimentResult || !selectedSolvent ? 'disabled' : ''}`}
                      onClick={(e) => handleSelectSolute(solute.id, e)}
                      disabled={!!experimentResult || !selectedSolvent}
                    >
                      <div className="card-icon-wrap" style={{ backgroundColor: solute.color + '30' }}>
                        <span className="card-icon">{solute.icon}</span>
                      </div>
                      <div className="card-info">
                        <span className="card-name">{solute.name}</span>
                        <span className="card-formula">{solute.formula}</span>
                      </div>
                      <span className="card-state">{solute.state}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Spoon Animation */}
            {spoonAnimation?.active && (
              <div 
                className="spoon-container"
                style={{
                  '--start-x': `${spoonAnimation?.startX || 0}px`,
                  '--start-y': `${spoonAnimation?.startY || 0}px`,
                  '--end-x': `${spoonAnimation?.endX || 0}px`,
                  '--end-y': `${spoonAnimation?.endY || 0}px`,
                }}
              >
                <div className="spoon" style={{ animation: 'spoonMove 1s forwards' }}>
                  <div className="spoon-handle"></div>
                  <div className="spoon-head">
                    <div 
                      className="spoon-substance"
                      style={{ 
                        backgroundColor: selectedSoluteData?.color || '#ccc',
                        animation: 'substanceAppear 1s forwards'
                      }}
                    ></div>
                  </div>
                </div>
              </div>
            )}

            {/* Experiment Result */}
            {experimentResult && (
              <div className="experiment-result-overlay">
                <div className="experiment-result">
                  <div className="result-header">
                    <span className="result-icon">{experimentResult.dissolves ? '✅' : '⚠️'}</span>
                    <h3>Kết quả thí nghiệm</h3>
                  </div>
                  
                  <div className={`observation-box ${experimentResult.dissolves ? 'dissolves' : 'not-dissolves'}`}>
                    <div className="observation-label">👁️ Quan sát:</div>
                    <p>{experimentResult.observation}</p>
                  </div>

                  {isCorrectSelection ? (
                    <button className="btn-next" onClick={handleProceedToIdentify}>
                      Tiếp tục: Xác định chất tan & dung môi <ArrowLeft size={18} style={{ transform: 'rotate(180deg)' }} />
                    </button>
                  ) : (
                    <div className="wrong-selection">
                      <div className="wrong-message">
                        <X size={20} />
                        <span>Bạn chọn sai thí nghiệm theo yêu cầu. Hãy đọc lại yêu cầu!</span>
                      </div>
                      <button className="btn-retry" onClick={resetExperiment}>
                        <RotateCcw size={18} /> Làm lại thí nghiệm
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}
          </>
        ) : (
          <>
            {/* Identify Phase */}
            <div className="identify-section">
              <div className="identify-header">
                <h3>🏷️ Xác định vai trò của mỗi chất</h3>
                <p>Dựa vào kết quả thí nghiệm, hãy xác định đâu là chất tan, dung môi hoặc không tan</p>
              </div>
              
              <div className="identify-grid">
                <IdentifyCard 
                  substance={selectedSoluteData}
                  type={answers[selectedSolute]}
                  onSelectType={(type) => handleSelectType(selectedSolute, type)}
                  isSubmitted={isSubmitted}
                  correctType={experimentResult?.solute ? 'solute' : 'none'}
                />

                <IdentifyCard 
                  substance={selectedSolventData}
                  type={answers[selectedSolvent]}
                  onSelectType={(type) => handleSelectType(selectedSolvent, type)}
                  isSubmitted={isSubmitted}
                  correctType={experimentResult?.solvent ? 'solvent' : 'none'}
                />
              </div>

              {/* Explanation */}
              {isSubmitted && (
                <div className="explanation-box">
                  <div className="explanation-icon">💡</div>
                  <div className="explanation-content">
                    <strong>Giải thích:</strong>
                    <p>{experimentResult?.explanation}</p>
                  </div>
                </div>
              )}

              {/* Actions */}
              <div className="identify-actions">
                {!isSubmitted ? (
                  <button
                    className="btn-submit"
                    onClick={handleSubmitAnswer}
                    disabled={Object.keys(answers).length < 2}
                  >
                    <Check size={18} /> Kiểm tra đáp án
                  </button>
                ) : (
                  <button className="btn-next" onClick={handleNext}>
                    {currentChallenge < challenges.length - 1 ? 'Thí nghiệm tiếp theo' : 'Xem kết quả'} 
                    <ArrowLeft size={18} style={{ transform: 'rotate(180deg)' }} />
                  </button>
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Bai06_ChatTan_DungMoi;
