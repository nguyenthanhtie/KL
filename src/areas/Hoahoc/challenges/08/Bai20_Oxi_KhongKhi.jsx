import React, { useState, useEffect, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Beaker, Trophy, Play, RotateCcw, Lightbulb } from 'lucide-react';
import useChallengeProgress from '../../../../hooks/useChallengeProgress';
import ResumeDialog from '../../../../components/ResumeDialog';
import './CSS/Bai20_Oxi_KhongKhi.css';

const CHALLENGES = [
  {
    id: 1,
    title: 'Điều chế Oxi từ KMnO₄',
    description: 'Nung nóng thuốc tím để tạo khí Oxi',
    difficulty: 'Dễ',
    points: 25,
    type: 'produce-oxygen',
    question: 'Phương trình phản ứng đúng là?',
    options: [
      '2KMnO₄ → K₂MnO₄ + MnO₂ + O₂',
      'KMnO₄ → K + Mn + O₂',
      '2KMnO₄ + H₂O → O₂ + 2KOH',
      'KMnO₄ → KO + MnO + O'
    ],
    correctAnswer: '2KMnO₄ → K₂MnO₄ + MnO₂ + O₂',
    hint: 'Nung KMnO₄ tạo K₂MnO₄ (màu xanh), MnO₂ (màu đen) và khí O₂',
    phenomenon: '🔥 Thuốc tím phân hủy, thu được khí O₂ không màu'
  },
  {
    id: 2,
    title: 'Đốt cháy Than trong Oxi',
    description: 'Quan sát hiện tượng khi đốt than trong oxi',
    difficulty: 'Dễ',
    points: 25,
    type: 'burn-carbon',
    question: 'Sản phẩm chính khi đốt than (C) trong O₂ là gì?',
    options: ['CO', 'CO₂', 'C₂O', 'H₂O'],
    correctAnswer: 'CO₂',
    hint: 'C + O₂ → CO₂ (khí không màu, làm đục nước vôi trong)',
    phenomenon: '🔥 Than cháy sáng chói, tạo khí CO₂'
  },
  {
    id: 3,
    title: 'So sánh Đốt Nến',
    description: 'So sánh cháy trong không khí và trong oxi',
    difficulty: 'Trung bình',
    points: 25,
    type: 'compare-burning',
    question: 'Nến cháy trong oxi nguyên chất thì như thế nào?',
    options: [
      'Cháy mạnh hơn, sáng hơn',
      'Cháy chậm hơn',
      'Không cháy',
      'Giống nhau'
    ],
    correctAnswer: 'Cháy mạnh hơn, sáng hơn',
    hint: 'Không khí chỉ có ~21% O₂, oxi nguyên chất là 100% O₂',
    phenomenon: '🕯️ Nến cháy mạnh và sáng hơn trong oxi'
  },
  {
    id: 4,
    title: 'Oxi Hóa Chậm - Gỉ Sắt',
    description: 'Quá trình sắt bị gỉ theo thời gian',
    difficulty: 'Trung bình',
    points: 25,
    type: 'rust-iron',
    question: 'Điều kiện nào cần để sắt bị gỉ?',
    options: [
      'Chỉ cần oxi',
      'Chỉ cần nước',
      'Cần cả oxi và nước',
      'Không cần gì'
    ],
    correctAnswer: 'Cần cả oxi và nước',
    hint: 'Gỉ sắt là quá trình oxi hóa chậm, cần O₂ và H₂O',
    phenomenon: '🧪 Sắt biến thành gỉ sắt màu nâu đỏ (Fe₂O₃)'
  }
];

const Bai20_Oxi_KhongKhi = () => {
  const navigate = useNavigate();
  const { hasProgress, saveProgress, clearProgress, getProgress } = useChallengeProgress('oxi-khong-khi');
  
  const [currentChallenge, setCurrentChallenge] = useState(0);
  const [score, setScore] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [showResumeDialog, setShowResumeDialog] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [showHint, setShowHint] = useState(false);

  // Experiment control
  const [expProgress, setExpProgress] = useState(0);
  const [expRunning, setExpRunning] = useState(false);
  const [renderError, setRenderError] = useState(null);

  useEffect(() => {
    if (hasProgress && !gameStarted && !showResults) {
      setShowResumeDialog(true);
    }
  }, [hasProgress, gameStarted, showResults]);

  // Global error capture to avoid white screen — show message instead
  useEffect(() => {
    const onError = (event) => {
      const msg = event?.message || event?.reason?.message || String(event);
      // eslint-disable-next-line no-console
      console.error('Captured error in Bai20_Oxi_KhongKhi:', event);
      setRenderError(msg);
    };

    window.addEventListener('error', onError);
    window.addEventListener('unhandledrejection', onError);
    return () => {
      window.removeEventListener('error', onError);
      window.removeEventListener('unhandledrejection', onError);
    };
  }, []);

  // If any render/runtime error captured, show friendly UI instead of blank screen
  if (renderError) {
    return (
      <div className="oxi-lab-page">
        <div className="oxi-lab-header">
          <Link to="/advanced-challenge" className="back-button">
            <ArrowLeft size={20} />
            <span>Quay lại</span>
          </Link>
          <div className="header-title">
            <Beaker size={32} />
            <h1>Oxi — Không Khí</h1>
          </div>
          <div className="score-display">
            <Trophy size={20} />
            <span>{score}/100</span>
          </div>
        </div>
        <div className="game-content">
          <div className="start-screen">
            <h2>Có lỗi xảy ra</h2>
            <p style={{color:'#b91c1c'}}>Đã phát hiện lỗi khi hiển thị thử nghiệm. Nội dung lỗi:</p>
            <pre style={{background:'#f8fafc',padding:12,borderRadius:8,overflowX:'auto'}}>{String(renderError)}</pre>
            <div style={{marginTop:16,display:'flex',gap:8}}>
              <button className="btn-start" onClick={() => { window.location.reload(); }}>Tải lại trang</button>
              <button className="btn-exp reset" onClick={() => { setRenderError(null); setGameStarted(false); }}>Quay lại</button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const startGame = (fromBeginning = false) => {
    if (fromBeginning) {
      clearProgress();
      setCurrentChallenge(0);
      setScore(0);
      setGameStarted(true);
      setShowResumeDialog(false);
    } else {
      const saved = getProgress();
      if (saved) {
        setCurrentChallenge(saved.currentChallenge);
        setScore(saved.score);
        setGameStarted(true);
        setShowResumeDialog(false);
      } else {
        startGame(true);
      }
    }
    setUserAnswer('');
    setIsSubmitted(false);
    setExpProgress(0);
    setShowHint(false);
  };

  // challenges moved to top-level CHALLENGES constant

  const currentQ = CHALLENGES[currentChallenge] || CHALLENGES[0];

  const startExperiment = () => {
    setExpRunning(true);
    setExpProgress(0);
    
    const interval = setInterval(() => {
      setExpProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setExpRunning(false);
          return 100;
        }
        return prev + 2;
      });
    }, 80);
  };

  const resetExperiment = () => {
    setExpProgress(0);
    setExpRunning(false);
  };

  // Generate randomized sediment positions once reaction completes
  const sediments = useMemo(() => {
    if (expProgress < 100) return { crystals: [], powders: [] };

    const rand = (min, max) => Math.random() * (max - min) + min;

    const crystals = Array.from({ length: 4 }).map(() => ({
      left: `${rand(8, 88).toFixed(1)}%`,
      bottom: `${rand(0, 6).toFixed(1)}px`,
      rotate: `${rand(-25, 25).toFixed(1)}deg`,
      scale: (rand(0.85, 1.15)).toFixed(2),
    }));

    const powders = Array.from({ length: 3 }).map(() => ({
      left: `${rand(10, 86).toFixed(1)}%`,
      bottom: `${rand(0, 4).toFixed(1)}px`,
      rotate: `${rand(-10, 10).toFixed(1)}deg`,
      scale: (rand(0.9, 1.05)).toFixed(2),
    }));

    return { crystals, powders };
  }, [expProgress, currentChallenge]);

  const normalizeAnswer = (answer) => {
    return answer.trim();
  };

  const checkAnswer = () => {
    const isCorrect = normalizeAnswer(userAnswer) === normalizeAnswer(currentQ.correctAnswer);
    
    if (isCorrect) {
      setScore(score + currentQ.points);
    }
    setIsSubmitted(true);
  };

  const nextChallenge = () => {
    if (currentChallenge < CHALLENGES.length - 1) {
      const nextIndex = currentChallenge + 1;
      setCurrentChallenge(nextIndex);
      setUserAnswer('');
      setIsSubmitted(false);
      setExpProgress(0);
      setExpRunning(false);
      setShowHint(false);
      
      saveProgress({
        currentChallenge: nextIndex,
        score
      });
    } else {
      setShowResults(true);
      clearProgress();
    }
  };

  const prevChallenge = () => {
    if (currentChallenge > 0) {
      setCurrentChallenge(currentChallenge - 1);
      setUserAnswer('');
      setIsSubmitted(false);
      setExpProgress(0);
      setExpRunning(false);
      setShowHint(false);
    }
  };

  // Results screen
  if (showResults) {
    return (
      <div className="oxi-lab-page">
        <div className="results-modal-overlay">
          <div className="results-modal">
            <div className="trophy-icon">
              <Trophy size={80} color="#fbbf24" />
            </div>
            <h2>🎉 Hoàn thành!</h2>
            <div className="final-score">
              {score} / {CHALLENGES.reduce((sum, c) => sum + c.points, 0)} điểm
            </div>
            <div className="results-summary">
              <p>Bạn đã hoàn thành {CHALLENGES.length} thí nghiệm về Oxi!</p>
              <p>Tỷ lệ: {((score / CHALLENGES.reduce((sum, c) => sum + c.points, 0)) * 100).toFixed(1)}%</p>
            </div>
            <button onClick={() => navigate('/advanced-challenge')} className="btn-return">
              Quay lại
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Start screen
  if (!gameStarted) {
    return (
      <div className="oxi-lab-page">
        <div className="oxi-lab-header">
          <Link to="/advanced-challenge" className="back-button">
            <ArrowLeft size={20} />
            <span>Quay lại</span>
          </Link>
          <div className="header-title">
            <Beaker size={32} />
            <h1>Thí Nghiệm: Oxi — Không Khí</h1>
          </div>
          <div className="score-display">
            <Trophy size={20} />
            <span>0/100</span>
          </div>
        </div>

        <div className="start-screen">
          <div className="start-content">
            <h2>Cách chơi</h2>
            <ul className="instructions">
              <li>🧪 Làm 4 thí nghiệm về Oxi và không khí</li>
              <li>🔬 Quan sát hiện tượng và chạy mô phỏng</li>
              <li>✏️ Trả lời câu hỏi sau mỗi thí nghiệm</li>
              <li>🏆 Mỗi câu đúng được 25 điểm</li>
            </ul>
            <button className="btn-start" onClick={() => startGame(true)}>
              Bắt đầu
            </button>
          </div>
        </div>

        <ResumeDialog
          show={showResumeDialog}
          onResume={() => startGame(false)}
          onRestart={() => startGame(true)}
          progressInfo={getProgress() ? {
            current: getProgress().currentChallenge + 1,
            total: CHALLENGES.length,
            score: getProgress().score
          } : null}
        />
      </div>
    );
  }

  // Main game
  return (
    <div className="oxi-lab-page">
      {/* Header */}
      <div className="oxi-lab-header">
        <Link to="/advanced-challenge" className="back-button">
          <ArrowLeft size={20} />
          <span>Quay lại</span>
        </Link>
        <div className="header-title">
          <Beaker size={32} />
          <h1>Oxi — Không Khí</h1>
        </div>
        <div className="score-display">
          <Trophy size={20} />
          <span>{score}/100</span>
        </div>
      </div>

      <div className="game-content">
        {/* Progress */}
        <div className="progress-section">
          <div className="challenge-info">
            <span className={`difficulty-badge ${currentQ.difficulty === 'Dễ' ? 'easy' : 'medium'}`}>
              {currentQ.difficulty}
            </span>
            <span className="challenge-counter">
              Thí nghiệm {currentChallenge + 1}/{CHALLENGES.length}
            </span>
            <span className="points-badge">+{currentQ.points} điểm</span>
          </div>
          <div className="progress-bar">
            <div 
              className="progress-fill" 
              style={{ width: `${((currentChallenge + 1) / CHALLENGES.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Challenge Title */}
        <div className="challenge-title">
          <h2>{currentQ.title}</h2>
          <p>{currentQ.description}</p>
        </div>

        {/* Main Layout: Left (Experiment) + Right (Questions) */}
        <div className="main-layout">
          {/* Left Column - Experiment (2 sections stacked) */}
          <div className="left-experiment">
            {/* Visualization Section - Top */}
            <div className="visualization-section">
              <h3>Mô phỏng thí nghiệm</h3>
              <div className="experiment-visual">
                {currentQ.type === 'produce-oxygen' && (
                      <div className="exp-visual-box">
                        <div className="test-tube-simple">
                          <div className="flask-bulb">
                            <div className="kmno4-layer" style={{ 
                              height: `${Math.max(40, 70 - expProgress * 0.3)}%`,
                              opacity: expProgress > 50 ? 0.85 : 1
                            }}>
                              {expProgress > 20 && (
                                <>
                                  <div className="liquid-bubble"></div>
                                  <div className="liquid-bubble"></div>
                                  <div className="liquid-bubble"></div>
                                  <div className="liquid-bubble"></div>
                                  <div className="liquid-bubble"></div>
                                </>
                              )}
                              {expProgress >= 100 && (
                                <div className="sediment-layer">
                                  {sediments.crystals.map((c, i) => (
                                    <div
                                      key={`cr-${i}`}
                                      className="sediment-crystal"
                                      style={{
                                        left: c.left,
                                        bottom: c.bottom,
                                        transform: `translateX(-50%) rotate(${c.rotate}) scale(${c.scale})`
                                      }}
                                    />
                                  ))}

                                  {sediments.powders.map((p, i) => (
                                    <div
                                      key={`pw-${i}`}
                                      className="sediment-powder"
                                      style={{
                                        left: p.left,
                                        bottom: p.bottom,
                                        transform: `translateX(-50%) rotate(${p.rotate}) scale(${p.scale})`
                                      }}
                                    />
                                  ))}
                                </div>
                              )}
                            </div>
                          </div>
                          {expProgress > 0 && <div className="heat-icon">🔥</div>}
                        </div>
                      </div>
                    )}

                    {currentQ.type === 'burn-carbon' && (
                      <div className="exp-visual-box">
                        <div className="burning-visual">
                          <div className="burn-subject">
                            <div className="material-icon log" />
                            {expProgress > 20 && <div className="flame-icon burning">🔥</div>}
                          </div>

                          {expProgress > 60 && (
                            <div className="co2-cloud" aria-hidden>
                              <div className="co2-puff" style={{ left: '30%', animationDelay: '0s' }} />
                              <div className="co2-puff" style={{ left: '50%', animationDelay: '0.3s' }} />
                              <div className="co2-puff" style={{ left: '70%', animationDelay: '0.6s' }} />
                              <div className="co2-puff" style={{ left: '40%', animationDelay: '0.9s' }} />
                              <div className="co2-puff" style={{ left: '60%', animationDelay: '1.2s' }} />
                            </div>
                          )}
                        </div>
                      </div>
                    )}

                    {currentQ.type === 'compare-burning' && (
                      <div className="exp-visual-box">
                        <div className="comparison-visual">
                          <div className="candle-demo">
                            <div className="candle-icon">🕯️</div>
                            {expProgress > 30 && <div className="flame-icon">🔥</div>}
                          </div>
                          <div className="environment-label">
                            {expProgress < 50 ? 'Không khí' : 'Oxi nguyên chất'}
                          </div>
                        </div>
                      </div>
                    )}

                {currentQ.type === 'rust-iron' && (
                  <div className="exp-visual-box">
                    <div className="rust-visual">
                      <div className="iron-bar" style={{
                        background: `linear-gradient(to bottom, #71717a ${100-expProgress}%, #cd853f ${100-expProgress}%)`
                      }}>
                        Fe
                      </div>
                      <div className="rust-label">Gỉ sắt: {expProgress}%</div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Controls Section - Bottom */}
            <div className="controls-section">
              <div className="exp-controls">
                <button
                  onClick={startExperiment}
                  disabled={expRunning || expProgress === 100}
                  className="btn-exp start"
                >
                  <Play size={16} />
                  Chạy TN
                </button>
                <button onClick={resetExperiment} className="btn-exp reset">
                  <RotateCcw size={16} />
                  Làm lại
                </button>
              </div>

              <div className="progress-info">
                <div className="progress-label">
                  Tiến trình: {expProgress}%
                </div>
                <div className="progress-bar-exp">
                  <div className="progress-fill" style={{ width: `${expProgress}%` }} />
                </div>
              </div>

              <div className={`phenomenon-box ${expProgress < 100 ? 'dimmed' : ''}`}>
                <strong>Hiện tượng:</strong>
                <p>{expProgress >= 100 ? currentQ.phenomenon : 'Chạy thí nghiệm để quan sát hiện tượng'}</p>
              </div>
            </div>
          </div>

          {/* Right Column - Questions */}
          <div className="question-container">
          <div className="question-section">
            <h3>Câu hỏi</h3>
            <p className="question-text">{currentQ.question}</p>

            {/* Options */}
            <div className="options-list">
              {currentQ.options.map((option, idx) => (
                <button
                  key={idx}
                  className={`option-btn ${userAnswer === option ? 'selected' : ''} ${
                    isSubmitted ? (option === currentQ.correctAnswer ? 'correct' : userAnswer === option ? 'wrong' : '') : ''
                  }`}
                  onClick={() => !isSubmitted && setUserAnswer(option)}
                  disabled={isSubmitted}
                >
                  {option}
                </button>
              ))}
            </div>

            {/* Hint */}
            {showHint && !isSubmitted && (
              <div className="hint-box">
                <Lightbulb size={16} />
                <span>{currentQ.hint}</span>
              </div>
            )}

            {/* Result */}
            {isSubmitted && (
              <div className={`answer-result ${userAnswer === currentQ.correctAnswer ? 'correct' : 'wrong'}`}>
                {userAnswer === currentQ.correctAnswer 
                  ? '✅ Chính xác!' 
                  : `❌ Sai. Đáp án đúng: ${currentQ.correctAnswer}`}
              </div>
            )}

            {/* Action buttons */}
            <div className="action-buttons">
              {!isSubmitted && (
                <>
                  <button onClick={() => setShowHint(!showHint)} className="btn-hint">
                    <Lightbulb size={16} />
                    Gợi ý
                  </button>
                  <button 
                    onClick={checkAnswer} 
                    className="btn-submit"
                    disabled={!userAnswer}
                  >
                    Kiểm tra
                  </button>
                </>
              )}

              {isSubmitted && (
                <div className="nav-buttons">
                  <button 
                    onClick={prevChallenge} 
                    className="btn-nav prev"
                    disabled={currentChallenge === 0}
                  >
                    ← Trước
                  </button>
                  <button 
                    onClick={nextChallenge} 
                    className="btn-nav next"
                  >
                    {currentChallenge === CHALLENGES.length - 1 ? 'Hoàn thành' : 'Tiếp →'}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
        </div>
      </div>
    </div>
  );
};

export default Bai20_Oxi_KhongKhi;
