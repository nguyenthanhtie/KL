import React, { useState, useCallback, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Trophy, Lightbulb, TestTube, FlaskConical, AlertCircle, RotateCcw, Check, X } from 'lucide-react';
import useChallengeProgress from '../../../../hooks/useChallengeProgress';
import ResumeDialog from '../../../../components/ResumeDialog';
import './CSS/Bai38_NhanBietDungDich.css';

// Dữ liệu về các hợp chất và dấu hiệu nhận biết
const ionDatabase = {
  'HCl': {
    name: 'Axit clohidric',
    formula: 'HCl',
    color: 'không màu',
    solutionColor: '#e3f2fd',
    reactions: [
      { reagent: 'Quỳ tím', result: 'Quỳ tím hóa đỏ', precipitateColor: '#ff6b9d', isLitmusTest: true, equation: 'HCl → H⁺ + Cl⁻' },
      { reagent: 'Dung dịch AgNO₃', result: 'Kết tủa bạc trắng', precipitateColor: '#fafafa', equation: 'HCl + AgNO₃ → AgCl↓ + HNO₃' },
      { reagent: 'Kim loại Zn', result: 'Sủi bọt khí H₂', precipitateColor: 'transparent', hasBubbles: true, equation: 'Zn + 2HCl → ZnCl₂ + H₂↑' }
    ]
  },
  'H2SO4': {
    name: 'Axit sunfuric',
    formula: 'H₂SO₄',
    color: 'không màu',
    solutionColor: '#e3f2fd',
    reactions: [
      { reagent: 'Quỳ tím', result: 'Quỳ tím hóa đỏ', precipitateColor: '#ff6b9d', isLitmusTest: true, equation: 'H₂SO₄ → 2H⁺ + SO₄²⁻' },
      { reagent: 'Dung dịch BaCl₂', result: 'Kết tủa trắng BaSO₄', precipitateColor: '#fefefe', equation: 'H₂SO₄ + BaCl₂ → BaSO₄↓ + 2HCl' },
      { reagent: 'Kim loại Zn', result: 'Sủi bọt khí H₂', precipitateColor: 'transparent', hasBubbles: true, equation: 'Zn + H₂SO₄ → ZnSO₄ + H₂↑' }
    ]
  },
  'NaOH': {
    name: 'Natri hidroxit',
    formula: 'NaOH',
    color: 'không màu',
    solutionColor: '#e8f5e9',
    reactions: [
      { reagent: 'Quỳ tím', result: 'Quỳ tím hóa xanh', precipitateColor: '#6b9dff', isLitmusTest: true, equation: 'NaOH → Na⁺ + OH⁻' },
      { reagent: 'Dung dịch CuSO₄', result: 'Kết tủa xanh lam', precipitateColor: '#2196f3', equation: '2NaOH + CuSO₄ → Cu(OH)₂↓ + Na₂SO₄' },
      { reagent: 'Dung dịch FeCl₃', result: 'Kết tủa nâu đỏ', precipitateColor: '#a0522d', equation: '3NaOH + FeCl₃ → Fe(OH)₃↓ + 3NaCl' }
    ]
  },
  'Ca(OH)2': {
    name: 'Canxi hidroxit (nước vôi trong)',
    formula: 'Ca(OH)₂',
    color: 'không màu',
    solutionColor: '#f0f8ff',
    reactions: [
      { reagent: 'Quỳ tím', result: 'Quỳ tím hóa xanh', precipitateColor: '#6b9dff', isLitmusTest: true, equation: 'Ca(OH)₂ → Ca²⁺ + 2OH⁻' },
      { reagent: 'Khí CO₂', result: 'Xuất hiện kết tủa trắng', precipitateColor: '#fcfcfc', equation: 'Ca(OH)₂ + CO₂ → CaCO₃↓ + H₂O' },
      { reagent: 'Dung dịch Na₂CO₃', result: 'Kết tủa trắng', precipitateColor: '#fcfcfc', equation: 'Ca(OH)₂ + Na₂CO₃ → CaCO₃↓ + 2NaOH' }
    ]
  },
  'NaCl': {
    name: 'Natri clorua (muối ăn)',
    formula: 'NaCl',
    color: 'không màu',
    solutionColor: '#e3f2fd',
    reactions: [
      { reagent: 'Quỳ tím', result: 'Quỳ tím không đổi màu', precipitateColor: 'transparent', isSolutionChange: false, equation: '' },
      { reagent: 'Dung dịch AgNO₃', result: 'Kết tủa bạc trắng', precipitateColor: '#fafafa', equation: 'NaCl + AgNO₃ → AgCl↓ + NaNO₃' }
    ]
  },
  'CuSO4': {
    name: 'Đồng(II) sunfat',
    formula: 'CuSO₄',
    color: 'xanh lam',
    solutionColor: '#42a5f5',
    reactions: [
      { reagent: 'Quỳ tím', result: 'Quỳ tím không đổi', precipitateColor: 'transparent', isSolutionChange: false, equation: '' },
      { reagent: 'Dung dịch NaOH', result: 'Kết tủa xanh lam', precipitateColor: '#2196f3', equation: 'CuSO₄ + 2NaOH → Cu(OH)₂↓ + Na₂SO₄' },
      { reagent: 'Dung dịch BaCl₂', result: 'Kết tủa trắng', precipitateColor: '#fefefe', equation: 'CuSO₄ + BaCl₂ → BaSO₄↓ + CuCl₂' },
      { reagent: 'Kim loại Fe', result: 'Bề mặt Fe phủ lớp màu đỏ', precipitateColor: '#d84315', isMetalReaction: true, equation: 'Fe + CuSO₄ → FeSO₄ + Cu' }
    ]
  },
  'FeCl3': {
    name: 'Sắt(III) clorua',
    formula: 'FeCl₃',
    color: 'vàng nâu',
    solutionColor: '#ffb74d',
    reactions: [
      { reagent: 'Quỳ tím', result: 'Quỳ tím hóa đỏ nhạt', precipitateColor: '#ff9999', isLitmusTest: true, equation: 'FeCl₃ + H₂O ⇌ Fe(OH)Cl₂ + HCl' },
      { reagent: 'Dung dịch NaOH', result: 'Kết tủa nâu đỏ', precipitateColor: '#a0522d', equation: 'FeCl₃ + 3NaOH → Fe(OH)₃↓ + 3NaCl' },
      { reagent: 'Dung dịch AgNO₃', result: 'Kết tủa bạc trắng', precipitateColor: '#fafafa', equation: 'FeCl₃ + 3AgNO₃ → 3AgCl↓ + Fe(NO₃)₃' }
    ]
  },
  'Na2CO3': {
    name: 'Natri cacbonat',
    formula: 'Na₂CO₃',
    color: 'không màu',
    solutionColor: '#e8f5e9',
    reactions: [
      { reagent: 'Quỳ tím', result: 'Quỳ tím hóa xanh nhạt', precipitateColor: '#9dc3ff', isLitmusTest: true, equation: 'Na₂CO₃ + H₂O ⇌ NaHCO₃ + NaOH' },
      { reagent: 'Dung dịch HCl', result: 'Sủi bọt khí CO₂', precipitateColor: 'transparent', hasBubbles: true, equation: 'Na₂CO₃ + 2HCl → 2NaCl + H₂O + CO₂↑' },
      { reagent: 'Dung dịch CaCl₂', result: 'Kết tủa trắng', precipitateColor: '#fcfcfc', equation: 'Na₂CO₃ + CaCl₂ → CaCO₃↓ + 2NaCl' },
      { reagent: 'Dung dịch BaCl₂', result: 'Kết tủa trắng', precipitateColor: '#f9f9f9', equation: 'Na₂CO₃ + BaCl₂ → BaCO₃↓ + 2NaCl' }
    ]
  },
  'BaCl2': {
    name: 'Bari clorua',
    formula: 'BaCl₂',
    color: 'không màu',
    solutionColor: '#e3f2fd',
    reactions: [
      { reagent: 'Quỳ tím', result: 'Quỳ tím không đổi', precipitateColor: 'transparent', isSolutionChange: false, equation: '' },
      { reagent: 'Dung dịch H₂SO₄', result: 'Kết tủa trắng', precipitateColor: '#fefefe', equation: 'BaCl₂ + H₂SO₄ → BaSO₄↓ + 2HCl' },
      { reagent: 'Dung dịch Na₂CO₃', result: 'Kết tủa trắng', precipitateColor: '#f9f9f9', equation: 'BaCl₂ + Na₂CO₃ → BaCO₃↓ + 2NaCl' },
      { reagent: 'Dung dịch Na₂SO₄', result: 'Kết tủa trắng', precipitateColor: '#fefefe', equation: 'BaCl₂ + Na₂SO₄ → BaSO₄↓ + 2NaCl' }
    ]
  }
};

// Các câu hỏi dạng thí nghiệm
const experimentQuestions = [
  {
    id: 1,
    unknownSolution: 'HCl',
    availableReagents: ['Quỳ tím', 'Dung dịch AgNO₃', 'Kim loại Zn'],
    minTests: 1,
    hint: 'Chất này làm quỳ tím chuyển màu và có phản ứng đặc trưng với bạc',
    difficulty: 'easy'
  },
  {
    id: 2,
    unknownSolution: 'NaOH',
    availableReagents: ['Quỳ tím', 'Dung dịch CuSO₄', 'Dung dịch FeCl₃'],
    minTests: 1,
    hint: 'Chất này là bazơ mạnh, dễ nhận biết với quỳ tím',
    difficulty: 'easy'
  },
  {
    id: 3,
    unknownSolution: 'Na2CO3',
    availableReagents: ['Quỳ tím', 'Dung dịch HCl', 'Dung dịch CaCl₂', 'Dung dịch BaCl₂'],
    minTests: 1,
    hint: 'Chất này tạo khí CO₂ với axit',
    difficulty: 'easy'
  },
  {
    id: 4,
    unknownSolution: 'CuSO4',
    availableReagents: ['Quỳ tím', 'Dung dịch NaOH', 'Dung dịch BaCl₂', 'Kim loại Fe'],
    minTests: 2,
    hint: 'Dung dịch có màu xanh lam đặc trưng',
    difficulty: 'medium'
  },
  {
    id: 5,
    unknownSolution: 'H2SO4',
    availableReagents: ['Quỳ tím', 'Dung dịch BaCl₂', 'Kim loại Zn'],
    minTests: 2,
    hint: 'Axit mạnh, tạo kết tủa trắng không tan với muối bari',
    difficulty: 'medium'
  },
  {
    id: 6,
    unknownSolution: 'BaCl2',
    availableReagents: ['Quỳ tím', 'Dung dịch H₂SO₄', 'Dung dịch Na₂CO₃', 'Dung dịch Na₂SO₄'],
    minTests: 2,
    hint: 'Muối bari, tạo kết tủa trắng với nhiều chất',
    difficulty: 'medium'
  },
  {
    id: 7,
    unknownSolution: 'FeCl3',
    availableReagents: ['Quỳ tím', 'Dung dịch NaOH', 'Dung dịch AgNO₃'],
    minTests: 2,
    hint: 'Dung dịch màu vàng nâu, muối sắt III',
    difficulty: 'hard'
  },
  {
    id: 8,
    unknownSolution: 'Ca(OH)2',
    availableReagents: ['Quỳ tím', 'Khí CO₂', 'Dung dịch Na₂CO₃'],
    minTests: 2,
    hint: 'Nước vôi trong, phản ứng đặc trưng với khí CO₂',
    difficulty: 'hard'
  }
];

const NhanBietDungDich = () => {
  const { hasProgress, saveProgress, clearProgress, getProgress, completeChallenge } = useChallengeProgress('nhan-biet-dung-dich');
  const [startTime] = useState(() => Date.now());
  const [isCompleted, setIsCompleted] = useState(false);
  
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [gameCompleted, setGameCompleted] = useState(false);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [showResumeDialog, setShowResumeDialog] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  
  // Lab experiment states
  const [selectedReagent, setSelectedReagent] = useState(null);
  const [testResults, setTestResults] = useState([]);
  const [isDropping, setIsDropping] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [showAnswer, setShowAnswer] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [canSubmit, setCanSubmit] = useState(false);
  const [ionOptions, setIonOptions] = useState([]);
  const [currentReaction, setCurrentReaction] = useState(null);
  
  const currentQ = experimentQuestions[currentQuestion];
  const unknownIon = ionDatabase[currentQ.unknownSolution];

  useEffect(() => {
    if (hasProgress && !gameStarted && !gameCompleted) {
      setShowResumeDialog(true);
    }
  }, []);

  const startGame = (fromBeginning = false) => {
    if (fromBeginning) {
      clearProgress();
      setCurrentQuestion(0);
      setScore(0);
      setCorrectAnswers(0);
      setGameStarted(true);
      setShowResumeDialog(false);
    } else {
      const saved = getProgress();
      if (saved) {
        setCurrentQuestion(saved.currentQuestion);
        setScore(saved.score);
        setCorrectAnswers(saved.correctAnswers);
        setGameStarted(true);
        setShowResumeDialog(false);
      } else {
        startGame(true);
      }
    }
    setTestResults([]);
    setSelectedAnswer(null);
    setShowAnswer(false);
    setShowHint(false);
    setCanSubmit(false);
  };

  // Tạo danh sách đáp án khi câu hỏi thay đổi
  useEffect(() => {
    const allCompounds = ['HCl', 'H2SO4', 'NaOH', 'Ca(OH)2', 'NaCl', 'CuSO4', 'FeCl3', 'Na2CO3', 'BaCl2'];
    const correctCompound = currentQ.unknownSolution;
    let options = [correctCompound];
    
    const otherCompounds = allCompounds.filter(compound => compound !== correctCompound);
    while (options.length < 4) {
      const randomCompound = otherCompounds[Math.floor(Math.random() * otherCompounds.length)];
      if (!options.includes(randomCompound)) {
        options.push(randomCompound);
      }
    }
    
    setIonOptions(options.sort(() => Math.random() - 0.5));
  }, [currentQuestion, currentQ.unknownSolution]);

  // Phân loại chất thử
  const getReagentType = (reagent) => {
    if (reagent.includes('Quỳ')) return 'litmus';
    if (reagent.includes('Kim loại')) return 'metal';
    if (reagent.includes('Khí')) return 'gas';
    return 'solution';
  };

  const getReagentColor = (reagent) => {
    if (reagent.includes('Quỳ tím')) return '#9c27b0';
    if (reagent.includes('Kim loại Zn')) return '#b0bec5';
    if (reagent.includes('Kim loại Fe')) return '#78909c';
    if (reagent.includes('AgNO₃')) return 'transparent';
    if (reagent.includes('CuSO₄')) return '#42a5f5';
    if (reagent.includes('FeCl₃')) return '#ffb74d';
    if (reagent.includes('NaOH')) return 'transparent';
    if (reagent.includes('BaCl₂')) return 'transparent';
    if (reagent.includes('CaCl₂')) return 'transparent';
    if (reagent.includes('Na₂CO₃')) return 'transparent';
    if (reagent.includes('Na₂SO₄')) return 'transparent';
    if (reagent.includes('HCl')) return 'transparent';
    if (reagent.includes('H₂SO₄')) return 'transparent';
    return 'transparent';
  };

  // Lấy màu quỳ sau khi phản ứng
  const getLitmusColorAfterReaction = (color) => {
    if (color === '#ff6b9d' || color === '#ff9999') return '#e91e63';
    if (color === '#6b9dff' || color === '#9dc3ff') return '#2196f3';
    return '#9c27b0';
  };

  // Xử lý nhỏ thuốc thử
  const handleDropReagent = (reagent) => {
    if (isDropping || showAnswer) return;
    
    setSelectedReagent(reagent);
    setIsDropping(true);
    
    const reaction = unknownIon.reactions.find(r => r.reagent === reagent);
    setCurrentReaction(reaction);
    
    setTimeout(() => {
      if (reaction) {
        setTestResults([...testResults, {
          reagent: reagent,
          result: reaction.result,
          color: reaction.precipitateColor,
          equation: reaction.equation,
          hasBubbles: reaction.hasBubbles === true,
          isSolutionChange: reaction.isSolutionChange === true,
          isLitmusTest: reaction.isLitmusTest === true,
          isMetalReaction: reaction.isMetalReaction === true
        }]);
      }
      setIsDropping(false);
      setSelectedReagent(null);
      setCurrentReaction(null);
      
      if (testResults.length + 1 >= currentQ.minTests) {
        setCanSubmit(true);
      }
    }, 1500);
  };

  const handleSelectAnswer = (ionKey) => {
    if (!canSubmit) return;
    setSelectedAnswer(ionKey);
  };

  const handleSubmitAnswer = () => {
    if (!selectedAnswer) return;
    
    setShowAnswer(true);
    const isCorrect = selectedAnswer === currentQ.unknownSolution;
    
    if (isCorrect) {
      const points = currentQ.difficulty === 'easy' ? 10 : currentQ.difficulty === 'medium' ? 15 : 20;
      setScore(score + points);
      setCorrectAnswers(correctAnswers + 1);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestion < experimentQuestions.length - 1) {
      const nextIndex = currentQuestion + 1;
      setCurrentQuestion(nextIndex);
      setTestResults([]);
      setSelectedAnswer(null);
      setShowAnswer(false);
      setShowHint(false);
      setCanSubmit(false);
      
      saveProgress({
        currentQuestion: nextIndex,
        score,
        correctAnswers
      });
    } else {
      setGameCompleted(true);
      clearProgress();
      
      // Lưu kết quả hoàn thành vào database
      if (!isCompleted) {
        setIsCompleted(true);
        const maxScore = experimentQuestions.reduce((sum, q) => {
          return sum + (q.difficulty === 'easy' ? 10 : q.difficulty === 'medium' ? 15 : 20);
        }, 0);
        const percentage = Math.round((score / maxScore) * 100);
        const stars = percentage >= 80 ? 3 : percentage >= 50 ? 2 : 1;
        completeChallenge({
          score,
          maxScore,
          percentage,
          stars,
          timeSpent: Math.floor((Date.now() - startTime) / 1000),
          correctAnswers,
          totalQuestions: experimentQuestions.length
        });
      }
    }
  };

  const handleReset = () => {
    setTestResults([]);
    setSelectedAnswer(null);
    setShowAnswer(false);
    setCanSubmit(false);
  };

  const handleRestart = () => {
    setCurrentQuestion(0);
    setScore(0);
    setTestResults([]);
    setSelectedAnswer(null);
    setShowAnswer(false);
    setShowHint(false);
    setGameCompleted(false);
    setCorrectAnswers(0);
    setCanSubmit(false);
  };

  // Màn hình hoàn thành
  if (gameCompleted) {
    const percentage = (correctAnswers / experimentQuestions.length * 100).toFixed(0);
    const maxScore = experimentQuestions.reduce((sum, q) => {
      return sum + (q.difficulty === 'easy' ? 10 : q.difficulty === 'medium' ? 15 : 20);
    }, 0);
    
    return (
      <div className="lab-fullscreen">
        <div className="completion-screen">
          <div className="completion-card">
            <div className="trophy-animation">
              <Trophy size={80} />
            </div>
            <h1>🎉 Hoàn thành xuất sắc!</h1>
            <div className="stats-grid">
              <div className="stat-item">
                <span className="stat-value">{score}</span>
                <span className="stat-label">Điểm số</span>
              </div>
              <div className="stat-item">
                <span className="stat-value">{percentage}%</span>
                <span className="stat-label">Độ chính xác</span>
              </div>
              <div className="stat-item">
                <span className="stat-value">{correctAnswers}/{experimentQuestions.length}</span>
                <span className="stat-label">Câu đúng</span>
              </div>
            </div>
            <div className="completion-message">
              {percentage >= 80 && <p>🏆 Xuất sắc! Bạn là chuyên gia nhận biết dung dịch!</p>}
              {percentage >= 60 && percentage < 80 && <p>👍 Tốt lắm! Tiếp tục rèn luyện nhé!</p>}
              {percentage >= 40 && percentage < 60 && <p>💪 Khá đấy! Hãy ôn lại kiến thức!</p>}
              {percentage < 40 && <p>📚 Cần cố gắng hơn! Hãy học lại phần nhận biết ion!</p>}
            </div>
            <div className="completion-actions">
              <button onClick={handleRestart} className="btn-restart">
                <RotateCcw size={20} />
                Chơi lại
              </button>
              <Link to="/advanced-challenge" className="btn-home">
                <ArrowLeft size={20} />
                Về trang chủ
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="lab-fullscreen">
      {/* Header */}
      <header className="lab-header">
        <Link to="/advanced-challenge" className="back-btn">
          <ArrowLeft size={20} />
          <span>Quay lại</span>
        </Link>
        <h1 className="lab-title">
          <FlaskConical size={24} />
          Nhận Biết Dung Dịch
        </h1>
        <div className="score-badge">
          <Trophy size={20} />
          <span>{score} điểm</span>
        </div>
      </header>

      {/* Main Content */}
      <main className="lab-main">
        {/* Left Panel - Reagents */}
        <aside className="reagents-panel">
          <div className="panel-header">
            <TestTube size={20} />
            <h2>Thuốc thử</h2>
          </div>
          <div className="reagents-list">
            {currentQ.availableReagents.map((reagent, idx) => {
              const reagentType = getReagentType(reagent);
              const reagentColor = getReagentColor(reagent);
              const isUsed = testResults.some(r => r.reagent === reagent);
              
              return (
                <button
                  key={idx}
                  className={`reagent-card ${selectedReagent === reagent ? 'active' : ''} ${isUsed ? 'used' : ''}`}
                  onClick={() => handleDropReagent(reagent)}
                  disabled={isDropping || showAnswer || isUsed}
                >
                  <div className="reagent-icon">
                    {reagentType === 'litmus' ? (
                      <div className="litmus-icon" style={{ backgroundColor: reagentColor }}></div>
                    ) : reagentType === 'metal' ? (
                      <div className="metal-icon" style={{ backgroundColor: reagentColor }}></div>
                    ) : (
                      <div className="tube-icon">
                        <div className="tube-liquid" style={{ backgroundColor: reagentColor || '#667eea' }}></div>
                      </div>
                    )}
                  </div>
                  <span className="reagent-name">{reagent}</span>
                  {isUsed && <Check size={16} className="check-icon" />}
                </button>
              );
            })}
          </div>
          
          {/* Hint Button */}
          <button 
            className={`hint-btn ${showHint ? 'active' : ''}`}
            onClick={() => setShowHint(!showHint)}
          >
            <Lightbulb size={18} />
            {showHint ? 'Ẩn gợi ý' : 'Xem gợi ý'}
          </button>
          {showHint && (
            <div className="hint-content">
              <p>{currentQ.hint}</p>
            </div>
          )}
        </aside>

        {/* Center - Experiment Area */}
        <section className="experiment-panel">
          {/* Progress */}
          <div className="experiment-progress">
            <div className="progress-info">
              <span>Thí nghiệm {currentQuestion + 1}/{experimentQuestions.length}</span>
              <span className={`difficulty-tag ${currentQ.difficulty}`}>
                {currentQ.difficulty === 'easy' ? '⭐ Dễ' : currentQ.difficulty === 'medium' ? '⭐⭐ Trung bình' : '⭐⭐⭐ Khó'}
              </span>
            </div>
            <div className="progress-bar">
              <div className="progress-fill" style={{ width: `${((currentQuestion + 1) / experimentQuestions.length) * 100}%` }}></div>
            </div>
          </div>

          {/* Instruction */}
          <div className="instruction-box">
            <AlertCircle size={18} />
            <p>Nhỏ thuốc thử vào dung dịch X để quan sát hiện tượng. <strong>Cần ít nhất {currentQ.minTests} lần thử!</strong></p>
          </div>

          {/* Flask Area - Multiple Flasks */}
          <div className="flask-area">
            <div className="flasks-row">
              {currentQ.availableReagents.map((reagent, idx) => {
                const testResult = testResults.find(r => r.reagent === reagent);
                const isCurrentlyDropping = isDropping && selectedReagent === reagent;
                
                return (
                  <div key={idx} className="flask-wrapper">
                    <div className="flask-container">
                      {/* Animation khi đang nhỏ */}
                      {isCurrentlyDropping && (
                        <div className="dropping-animation">
                          {getReagentType(selectedReagent) === 'litmus' ? (
                            <div className="litmus-dropping" style={{ 
                              '--litmus-color': currentReaction?.isLitmusTest ? getLitmusColorAfterReaction(currentReaction.precipitateColor) : '#9c27b0' 
                            }}>
                              <div className="litmus-paper-anim"></div>
                            </div>
                          ) : getReagentType(selectedReagent) === 'metal' ? (
                            <div className="metal-dropping">
                              <div className="metal-rod-anim" style={{ backgroundColor: getReagentColor(selectedReagent) }}></div>
                            </div>
                          ) : (
                            <div className="dropper-dropping">
                              <div className="dropper-anim">
                                <div className="drop-anim"></div>
                              </div>
                            </div>
                          )}
                        </div>
                      )}
                      
                      {/* Flask */}
                      <div className={`flask ${testResult ? 'tested' : ''}`}>
                        <div className="flask-neck"></div>
                        <div className="flask-body">
                          <div className="solution" style={{ backgroundColor: unknownIon.solutionColor }}>
                            {/* Bubbles */}
                            {testResult?.hasBubbles && (
                              <div className="bubbles">
                                {[...Array(8)].map((_, i) => (
                                  <div key={i} className="bubble" style={{
                                    left: `${10 + Math.random() * 80}%`,
                                    animationDelay: `${Math.random() * 2}s`,
                                    animationDuration: `${1.5 + Math.random() * 1}s`
                                  }}></div>
                                ))}
                              </div>
                            )}
                            
                            {/* Precipitate */}
                            {testResult && testResult.color !== 'transparent' && !testResult.hasBubbles && !testResult.isLitmusTest && !testResult.isMetalReaction && (
                              <div className="precipitate" style={{ backgroundColor: testResult.color }}></div>
                            )}
                            
                            {/* Litmus in solution */}
                            {testResult?.isLitmusTest && (
                              <div className="litmus-result-flask" style={{ backgroundColor: getLitmusColorAfterReaction(testResult.color) }}></div>
                            )}
                            
                            {/* Metal reaction */}
                            {testResult?.isMetalReaction && (
                              <div className="metal-result-flask" style={{ backgroundColor: testResult.color }}></div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className={`flask-label ${testResult ? 'has-result' : ''}`}>
                      {testResult ? reagent : `Bình ${idx + 1}`}
                    </div>
                    {/* Kết quả dưới bình */}
                    {testResult && (
                      <div className="flask-result">
                        <p className="result-phenomenon">{testResult.result}</p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Right Panel - Answer Only */}
        <aside className="results-panel">
          

          {/* Answer Section */}
          {canSubmit && !showAnswer && (
            <div className="results-panel bg-white">
              <h3>Dung dịch X là gì?</h3>
              <div className="options-grid">
                {ionOptions.map((ionKey) => {
                  const ion = ionDatabase[ionKey];
                  return (
                    <button
                      key={ionKey}
                      className={`option-btn ${selectedAnswer === ionKey ? 'selected' : ''}`}
                      onClick={() => handleSelectAnswer(ionKey)}
                    >
                      <span className="formula">{ion.formula}</span>
                      <span className="name">{ion.name}</span>
                    </button>
                  );
                })}
              </div>
              <div className="action-btns">
                <button className="reset-btn" onClick={handleReset}>
                  <RotateCcw size={18} />
                  Làm lại
                </button>
                <button 
                  className="submit-btn" 
                  onClick={handleSubmitAnswer}
                  disabled={!selectedAnswer}
                >
                  <Check size={18} />
                  Xác nhận
                </button>
              </div>
            </div>
          )}
          
          {/* Waiting for tests */}
          {!canSubmit && !showAnswer && (
            <div className="waiting-section">
              <p>Hãy thực hiện ít nhất <strong>{currentQ.minTests}</strong> thí nghiệm để trả lời</p>
              <div className="tests-progress">
                <span>{testResults.length}/{currentQ.minTests}</span>
                <div className="tests-bar">
                  <div className="tests-fill" style={{ width: `${(testResults.length / currentQ.minTests) * 100}%` }}></div>
                </div>
              </div>
            </div>
          )}

          {/* Show Result */}
          {showAnswer && (
            <div className={`answer-feedback ${selectedAnswer === currentQ.unknownSolution ? 'correct' : 'incorrect'}`}>
              <div className="feedback-header">
                {selectedAnswer === currentQ.unknownSolution ? (
                  <>
                    <Check size={24} />
                    <span>Chính xác!</span>
                  </>
                ) : (
                  <>
                    <X size={24} />
                    <span>Chưa đúng</span>
                  </>
                )}
              </div>
              <div className="correct-info">
                <p>Đáp án: <strong>{ionDatabase[currentQ.unknownSolution].formula}</strong></p>
                <p className="compound-name">{ionDatabase[currentQ.unknownSolution].name}</p>
              </div>
              <div className="explanation">
                <h4>Các phản ứng đặc trưng:</h4>
                <ul>
                  {ionDatabase[currentQ.unknownSolution].reactions.slice(0, 3).map((r, idx) => (
                    <li key={idx}>
                      <strong>{r.reagent}:</strong> {r.result}
                      {r.equation && <code>{r.equation}</code>}
                    </li>
                  ))}
                </ul>
              </div>
              <button className="next-btn" onClick={handleNextQuestion}>
                {currentQuestion < experimentQuestions.length - 1 ? 'Tiếp theo →' : 'Hoàn thành'}
              </button>
            </div>
          )}
        </aside>
      </main>

      <ResumeDialog
        show={showResumeDialog && !gameStarted}
        onResume={() => startGame(false)}
        onRestart={() => startGame(true)}
        progressInfo={getProgress() ? {
          current: getProgress().currentQuestion + 1,
          total: experimentQuestions.length,
          score: getProgress().score
        } : null}
      />
    </div>
  );
};

export default NhanBietDungDich;
