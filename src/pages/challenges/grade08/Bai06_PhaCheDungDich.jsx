import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Trophy, Target, Lightbulb, Beaker, Droplet, FlaskConical, Plus, Minus, RotateCcw } from 'lucide-react';
import useChallengeProgress from '../../../hooks/useChallengeProgress';
import ResumeDialog from '../../../components/ResumeDialog';
import './CSS/Bai06_PhaCheDungDich.css';

// Dữ liệu chất tan
const SOLUTES = {
  'nacl': { name: 'Natri clorua', formula: 'NaCl', color: '#3b82f6', molarMass: 58.5 },
  'cuso4': { name: 'Đồng(II) sunfat', formula: 'CuSO₄', color: '#2563eb', molarMass: 160 },
  'kmno4': { name: 'Kali pemanganat', formula: 'KMnO₄', color: '#7c3aed', molarMass: 158 },
  'h2so4': { name: 'Axit sunfuric', formula: 'H₂SO₄', color: '#dc2626', molarMass: 98 },
  'naoh': { name: 'Natri hidroxit', formula: 'NaOH', color: '#16a34a', molarMass: 40 },
  'glucose': { name: 'Glucose', formula: 'C₆H₁₂O₆', color: '#f59e0b', molarMass: 180 },
};

// Các thử thách
const CHALLENGES = [
  {
    id: 1, level: 1, type: 'find-concentration', points: 10,
    title: 'Tính nồng độ mol',
    question: 'Hòa tan 0.5 mol NaCl vào nước, thu được 1 lít dung dịch. Tính nồng độ mol của dung dịch?',
    solute: 'nacl', answer: 0.5, unit: 'M', tolerance: 0.05,
    hint: 'C = n/V = 0.5/1 = ?'
  },
  {
    id: 2, level: 1, type: 'find-concentration', points: 10,
    title: 'Tính nồng độ mol',
    question: 'Hòa tan 2 mol glucose vào 0.5 lít nước. Nồng độ mol là bao nhiêu?',
    solute: 'glucose', answer: 4.0, unit: 'M', tolerance: 0.1,
    hint: 'C = n/V = 2/0.5 = ?'
  },
  {
    id: 3, level: 1, type: 'find-moles', points: 12,
    title: 'Tính số mol chất tan',
    question: 'Pha 2 lít dung dịch CuSO₄ 0.3M. Cần bao nhiêu mol CuSO₄?',
    solute: 'cuso4', answer: 0.6, unit: 'mol', tolerance: 0.05,
    hint: 'n = C × V = 0.3 × 2 = ?'
  },
  {
    id: 4, level: 1, type: 'find-volume', points: 12,
    title: 'Tính thể tích dung dịch',
    question: 'Hòa tan 1.5 mol NaOH để được dung dịch 3M. Tính thể tích dung dịch?',
    solute: 'naoh', answer: 0.5, unit: 'L', tolerance: 0.05,
    hint: 'V = n/C = 1.5/3 = ?'
  },
  {
    id: 5, level: 2, type: 'dilution', points: 15,
    title: 'Pha loãng dung dịch',
    question: 'Có 100ml dung dịch H₂SO₄ 2M. Pha loãng thành 0.5M. Thể tích dung dịch sau pha loãng?',
    solute: 'h2so4', answer: 0.4, unit: 'L', tolerance: 0.05,
    hint: 'C₁V₁ = C₂V₂ → V₂ = C₁V₁/C₂ = 2×0.1/0.5 = ?'
  },
  {
    id: 6, level: 2, type: 'dilution', points: 15,
    title: 'Pha loãng dung dịch',
    question: 'Có 200ml dung dịch NaCl 3M. Pha loãng thành 1.5M. Thể tích dung dịch sau pha loãng?',
    solute: 'nacl', answer: 0.4, unit: 'L', tolerance: 0.05,
    hint: 'C₁V₁ = C₂V₂ → V₂ = 3×0.2/1.5 = ?'
  },
  {
    id: 7, level: 2, type: 'mass-calculation', points: 18,
    title: 'Tính khối lượng chất tan',
    question: 'Pha 500ml dung dịch KMnO₄ 0.2M. Cần bao nhiêu gam KMnO₄? (M = 158 g/mol)',
    solute: 'kmno4', answer: 15.8, unit: 'g', tolerance: 1.0,
    hint: 'n = C×V = 0.2×0.5 = 0.1 mol → m = n×M = 0.1×158 = ?'
  },
  {
    id: 8, level: 2, type: 'mass-calculation', points: 18,
    title: 'Tính khối lượng chất tan',
    question: 'Pha 250ml dung dịch CuSO₄ 0.4M. Cần bao nhiêu gam CuSO₄? (M = 160 g/mol)',
    solute: 'cuso4', answer: 16.0, unit: 'g', tolerance: 1.0,
    hint: 'n = 0.4×0.25 = 0.1 mol → m = 0.1×160 = ?'
  },
  {
    id: 9, level: 3, type: 'mixing', points: 20,
    title: 'Trộn dung dịch',
    question: 'Trộn 100ml NaCl 2M với 200ml NaCl 1M. Nồng độ sau khi trộn?',
    solute: 'nacl', answer: 1.33, unit: 'M', tolerance: 0.05,
    hint: 'C = (C₁V₁ + C₂V₂)/(V₁+V₂) = (2×0.1 + 1×0.2)/0.3 = ?'
  },
  {
    id: 10, level: 3, type: 'mixing', points: 20,
    title: 'Trộn dung dịch',
    question: 'Trộn 150ml H₂SO₄ 3M với 350ml H₂SO₄ 1M. Nồng độ sau khi trộn?',
    solute: 'h2so4', answer: 1.6, unit: 'M', tolerance: 0.05,
    hint: 'n_tổng = 3×0.15 + 1×0.35 = 0.8 mol, V_tổng = 0.5L → C = ?'
  },
  {
    id: 11, level: 3, type: 'complex', points: 25,
    title: 'Bài tập tổng hợp',
    question: 'Hòa tan 23.4g NaCl (M = 58.5 g/mol) vào nước được 400ml dung dịch. Nồng độ mol?',
    solute: 'nacl', answer: 1.0, unit: 'M', tolerance: 0.05,
    hint: 'n = m/M = 23.4/58.5 = 0.4 mol → C = n/V = 0.4/0.4 = ?'
  },
  {
    id: 12, level: 3, type: 'complex', points: 25,
    title: 'Bài tập tổng hợp',
    question: 'Có 50ml H₂SO₄ 4M. Thêm nước đến 200ml. Lấy 100ml pha loãng đến 500ml. Nồng độ cuối?',
    solute: 'h2so4', answer: 0.2, unit: 'M', tolerance: 0.05,
    hint: 'Bước 1: C₂=4×0.05/0.2=1M. Bước 2: C₃=1×0.1/0.5=0.2M'
  }
];

const PhaCheDungDich = () => {
  const { hasProgress, saveProgress, clearProgress, getProgress, completeChallenge } = useChallengeProgress('pha-che-dung-dich', {
    challengeId: 6,
    programId: 'chemistry',
    grade: 8
  });
  const [startTime] = useState(() => Date.now());
  const [isCompleted, setIsCompleted] = useState(false);
  const [showResumeDialog, setShowResumeDialog] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [totalScore, setTotalScore] = useState(0);
  const [completedIds, setCompletedIds] = useState([]);
  const [gameCompleted, setGameCompleted] = useState(false);

  // Lab simulation
  const [moles, setMoles] = useState(0);
  const [volume, setVolume] = useState(0.5);
  const [showValues, setShowValues] = useState(false);

  // Answer state
  const [userAnswer, setUserAnswer] = useState('');
  const [showHint, setShowHint] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  const challenge = CHALLENGES[currentIndex];
  const solute = SOLUTES[challenge?.solute] || SOLUTES.nacl;
  const concentration = volume > 0 ? moles / volume : 0;

  // Check for saved progress
  useEffect(() => {
    if (hasProgress && !gameStarted) {
      setShowResumeDialog(true);
    } else if (!gameStarted) {
      setGameStarted(true);
    }
  }, [hasProgress, gameStarted]);

  // Reset on challenge change
  useEffect(() => {
    setMoles(0);
    setVolume(0.5);
    setUserAnswer('');
    setShowHint(false);
    setShowResult(false);
  }, [currentIndex]);

  const startGame = (fromBeginning = false) => {
    setShowResumeDialog(false);
    if (fromBeginning) {
      clearProgress();
    } else {
      const saved = getProgress();
      if (saved) {
        setCurrentIndex(saved.currentIndex || 0);
        setTotalScore(saved.totalScore || 0);
        setCompletedIds(saved.completedIds || []);
      }
    }
    setGameStarted(true);
  };

  const adjustMoles = (delta) => {
    setMoles(prev => Math.max(0, Math.min(prev + delta, 10)));
  };

  const adjustVolume = (delta) => {
    setVolume(prev => Math.max(0.1, Math.min(prev + delta, 5)));
  };

  const checkAnswer = () => {
    const answer = parseFloat(userAnswer);
    if (isNaN(answer)) {
      alert('Vui lòng nhập một số hợp lệ!');
      return;
    }

    const correct = Math.abs(answer - challenge.answer) <= challenge.tolerance;
    setIsCorrect(correct);
    setShowResult(true);

    if (correct) {
      setTotalScore(prev => prev + challenge.points);
      setCompletedIds(prev => [...prev, challenge.id]);
    }
  };

  const handleNext = () => {
    if (currentIndex < CHALLENGES.length - 1) {
      const newIndex = currentIndex + 1;
      setCurrentIndex(newIndex);
      saveProgress({ currentIndex: newIndex, totalScore, completedIds });
    } else {
      setGameCompleted(true);
      clearProgress();
      
      // Lưu kết quả hoàn thành vào database
      if (!isCompleted) {
        setIsCompleted(true);
        const maxScore = CHALLENGES.reduce((sum, c) => sum + c.points, 0);
        const percentage = Math.round((totalScore / maxScore) * 100);
        const stars = percentage >= 80 ? 3 : percentage >= 50 ? 2 : 1;
        completeChallenge({
          score: totalScore,
          maxScore,
          percentage,
          stars,
          timeSpent: Math.floor((Date.now() - startTime) / 1000),
          correctAnswers: completedIds.length,
          totalQuestions: CHALLENGES.length
        });
      }
    }
  };

  const handleReset = () => {
    setMoles(0);
    setVolume(0.5);
    setUserAnswer('');
    setShowResult(false);
    setShowHint(false);
  };

  const handleRestart = () => {
    clearProgress();
    setCurrentIndex(0);
    setTotalScore(0);
    setCompletedIds([]);
    setGameCompleted(false);
  };

  // Calculate display values
  const fillPercent = Math.min((volume / 5) * 100, 100);
  const colorOpacity = Math.min(concentration / 5, 1) * 0.7 + 0.3;

  // Game completed screen
  if (gameCompleted) {
    const maxScore = CHALLENGES.reduce((sum, c) => sum + c.points, 0);
    const percent = Math.round((totalScore / maxScore) * 100);

    return (
      <div className="molarity-game">
        <div className="game-complete-overlay">
          <div className="game-complete-modal">
            <Trophy className="trophy-icon" size={72} />
            <h2>🎉 Hoàn thành!</h2>
            <div className="stats">
              <p className="score">Điểm: {totalScore}/{maxScore}</p>
              <p>Hoàn thành: {percent}%</p>
              <p>Số câu đúng: {completedIds.length}/{CHALLENGES.length}</p>
            </div>
            <p className="message">
              {percent >= 80 ? '🏆 Xuất sắc! Bạn là chuyên gia!' :
               percent >= 60 ? '👍 Rất tốt! Tiếp tục phát huy!' :
               '📚 Hãy ôn lại và thử lại nhé!'}
            </p>
            <div className="modal-actions">
              <button onClick={handleRestart} className="btn-replay">Chơi lại</button>
              <Link to="/advanced-challenge" className="btn-home">Về trang chủ</Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Loading screen
  if (!gameStarted) {
    return (
      <div className="molarity-game">
        <div className="loading-screen">
          <FlaskConical size={64} />
          <h2>Pha Chế Dung Dịch</h2>
          <p>Đang tải...</p>
        </div>
        <ResumeDialog
          show={showResumeDialog}
          onResume={() => startGame(false)}
          onRestart={() => startGame(true)}
          progressInfo={{
            current: (getProgress()?.currentIndex || 0) + 1,
            total: CHALLENGES.length,
            score: getProgress()?.totalScore || 0
          }}
        />
      </div>
    );
  }

  return (
    <div className="molarity-game">
      {/* Header with Progress */}
      <header className="molarity-header">
        <Link to="/advanced-challenge" className="btn-back">
          <ArrowLeft size={18} />
          <span>Quay lại</span>
        </Link>
        <div className="header-center">
          <h1 className="title">
            <FlaskConical size={24} />
            Pha Chế Dung Dịch
          </h1>
          
        </div>
        <div className="score-box">
          <Trophy size={20} />
          <span>{totalScore} điểm</span>
        </div>
      </header>

      {/* Main */}
      <main className="molarity-main">
        {/* Lab Panel */}
        <div className="lab-panel">
          <div className="solute-card">
            <p className="name">{solute.name}</p>
           
            <p className="mass">M = {solute.molarMass} g/mol</p>
          </div>

          <div className="beaker-visual">
            <div className="beaker">
              <div
                className="liquid"
                style={{
                  height: `${fillPercent}%`,
                  backgroundColor: solute.color,
                  opacity: colorOpacity
                }}
              />
              <span className="scale" style={{ bottom: '80%' }}>4L</span>
              <span className="scale" style={{ bottom: '60%' }}>3L</span>
              <span className="scale" style={{ bottom: '40%' }}>2L</span>
              <span className="scale" style={{ bottom: '20%' }}>1L</span>
            </div>
            <div className="concentration-badge">
              <Beaker size={20} />
              <span className="val">{concentration.toFixed(3)}</span>
              <span className="unit">M</span>
            </div>
          </div>

          <div className="control-row">
            <div className="label">
              <Droplet size={14} />
              Số mol (n)
            </div>
            <div className="adjust">
              <button onClick={() => adjustMoles(-0.1)}><Minus size={16} /></button>
              <span className="value">{moles.toFixed(2)} mol</span>
              <button onClick={() => adjustMoles(0.1)}><Plus size={16} /></button>
            </div>
            <input
              type="range" min="0" max="10" step="0.1"
              value={moles}
              onChange={(e) => setMoles(parseFloat(e.target.value))}
            />
          </div>

          <div className="control-row">
            <div className="label">
              <Beaker size={14} />
              Thể tích (V)
            </div>
            <div className="adjust">
              <button onClick={() => adjustVolume(-0.1)}><Minus size={16} /></button>
              <span className="value">{volume.toFixed(2)} L</span>
              <button onClick={() => adjustVolume(0.1)}><Plus size={16} /></button>
            </div>
            <input
              type="range" min="0.1" max="5" step="0.1"
              value={volume}
              onChange={(e) => setVolume(parseFloat(e.target.value))}
            />
          </div>

          <div className="values-toggle">
            <label>
              <input type="checkbox" checked={showValues} onChange={(e) => setShowValues(e.target.checked)} />
              Hiển thị giá trị
            </label>
            {showValues && (
              <div className="values-list">
                <p>n = {moles.toFixed(3)} mol</p>
                <p>V = {volume.toFixed(3)} L</p>
                <p>C = {concentration.toFixed(3)} M</p>
              </div>
            )}
          </div>
        </div>

        {/* Challenge Panel */}
        <div className="challenge-panel">
          <h2 className="challenge-title">{challenge.title}</h2>

          <div className="question-box">
            <Target size={20} />
            <p>{challenge.question}</p>
          </div>

          <div className="formula-ref">
            <h4>📐 Công thức:</h4>
            <ul>
              <li>Nồng độ mol: <code>C = n/V</code> (M)</li>
              <li>Số mol: <code>n = C × V</code> (mol)</li>
              <li>Thể tích: <code>V = n/C</code> (L)</li>
              <li>Khối lượng: <code>m = n × M</code> (g)</li>
              <li>Pha loãng: <code>C₁V₁ = C₂V₂</code></li>
            </ul>
          </div>

          <div className="answer-row">
            <label>Đáp án của bạn:</label>
            <div className="input-wrap">
              <input
                type="number"
                step="0.01"
                value={userAnswer}
                onChange={(e) => setUserAnswer(e.target.value)}
                placeholder="Nhập kết quả..."
                disabled={showResult}
              />
              <span className="unit-label">{challenge.unit}</span>
            </div>
          </div>

          {!showResult && (
            <div className="hint-section">
              <button className="btn-hint" onClick={() => setShowHint(!showHint)}>
                <Lightbulb size={18} />
                {showHint ? 'Ẩn gợi ý' : 'Xem gợi ý'}
              </button>
              {showHint && (
                <div className="hint-content">
                  <Lightbulb size={16} />
                  <p>{challenge.hint}</p>
                </div>
              )}
            </div>
          )}

          <div className="action-row">
            <button className="btn-reset" onClick={handleReset}>
              <RotateCcw size={18} />
              Làm lại
            </button>
            {!showResult && (
              <button className="btn-check" onClick={checkAnswer}>
                Kiểm tra
              </button>
            )}
          </div>

          {showResult && (
            <div className={`result-box ${isCorrect ? 'correct' : 'incorrect'}`}>
              {isCorrect ? (
                <>
                  <h3>✓ Chính xác!</h3>
                  <p className="points">+{challenge.points} điểm</p>
                </>
              ) : (
                <>
                  <h3>✗ Chưa đúng!</h3>
                  <div className="correct-answer">
                    <p className="label">Đáp án đúng:</p>
                    <p className="value">{challenge.answer} {challenge.unit}</p>
                  </div>
                  <p style={{ fontSize: '14px', color: '#78350f', marginTop: '12px' }}>
                    💡 {challenge.hint}
                  </p>
                </>
              )}
              <div className="result-actions">
                {!isCorrect && (
                  <button className="btn-retry" onClick={handleReset}>
                    <RotateCcw size={16} />
                    Thử lại
                  </button>
                )}
                <button className="btn-next" onClick={handleNext}>
                  {currentIndex < CHALLENGES.length - 1 ? 'Câu tiếp theo →' : 'Hoàn thành'}
                </button>
              </div>
            </div>
          )}
        </div>
      </main>

      <ResumeDialog
        show={showResumeDialog}
        onResume={() => startGame(false)}
        onRestart={() => startGame(true)}
        progressInfo={{
          current: (getProgress()?.currentIndex || 0) + 1,
          total: CHALLENGES.length,
          score: getProgress()?.totalScore || 0
        }}
      />
    </div>
  );
};

export default PhaCheDungDich;
