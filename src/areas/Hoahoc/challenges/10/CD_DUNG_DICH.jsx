import React, { useMemo, useState, useCallback } from 'react'
import './CSS/CD_DUNG_DICH.css'

/**
 * Stage Progress Bar Component - Compact Version
 */
function StageProgressBar({ currentStage, completedStages, totalStages = 6, onStageSelect }) {
  const stageIcons = ['🧪', '🌡️', '⚖️', '🔬', '💧', '🎨']
  
  
      
}

/**
 * Stage Requirements Display
 */
function StageRequirements({ requirements, currentProgress }) {
  return (
    <div className="stage-requirements">
      <h4>📋 Yêu cầu hoàn thành:</h4>
      <ul>
        {requirements.map((req, idx) => {
          const isCompleted = currentProgress[req.key] >= req.target
          return (
            <li key={idx} className={isCompleted ? 'completed' : ''}>
              <span className="req-icon">{isCompleted ? '✅' : '⬜'}</span>
              <span className="req-text">{req.text}</span>
              {req.showProgress && (
                <span className="req-progress">
                  ({currentProgress[req.key] || 0}/{req.target})
                </span>
              )}
            </li>
          )
        })}
      </ul>
    </div>
  )
}

/**
 * Locked Stage Overlay
 */
function LockedOverlay({ stageNumber, requiredStage }) {
  return (
    <div className="locked-overlay">
      <div className="locked-content">
        <div className="locked-icon">🔒</div>
        <h3>Màn {stageNumber} bị khóa</h3>
        <p>Hoàn thành Màn {requiredStage} để mở khóa</p>
      </div>
    </div>
  )
}

/**
 * Stage Complete Modal
 */
function StageCompleteModal({ stageNumber, stageName, onNext, onClose, isLastStage }) {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content stage-complete-modal" onClick={e => e.stopPropagation()}>
        <div className="celebration">🎉</div>
        <h2>Hoàn thành Màn {stageNumber}!</h2>
        <p className="stage-name">{stageName}</p>
        <div className="modal-actions">
          {!isLastStage ? (
            <button className="btn-primary" onClick={onNext}>
              ▶️ Màn tiếp theo
            </button>
          ) : (
            <button className="btn-success" onClick={onClose}>
              🏆 Hoàn thành tất cả!
            </button>
          )}
          <button className="btn-secondary" onClick={onClose}>
            Ở lại màn này
          </button>
        </div>
      </div>
    </div>
  )
}

/**
 * Realistic Beaker Component - Cốc thủy tinh 3D thực tế
 */
function RealisticBeaker({ waterLevel = 70, saltConcentration = 0, isStirring = false, saltParticles = [], showSpoon = false }) {
  const waterOpacity = 0.85 + (saltConcentration * 0.1)
  const waterColor = saltConcentration > 0 
    ? `rgba(200, 220, 255, ${waterOpacity})` 
    : 'rgba(180, 210, 250, 0.9)'
  
  return (
    <div className="realistic-beaker-container">
      {/* Lab Table Surface */}
      <div className="lab-table">
        <div className="table-reflection"></div>
      </div>
      
      {/* Beaker */}
      <div className="beaker-3d">
        {/* Glass body */}
        <div className="beaker-glass">
          {/* Glass reflection on left */}
          <div className="glass-reflection-left"></div>
          {/* Glass reflection on right */}
          <div className="glass-reflection-right"></div>
          
          {/* Measurement marks */}
          <div className="measurement-marks">
            <div className="mark mark-250">250 mL</div>
            <div className="mark mark-200">200</div>
            <div className="mark mark-150">150</div>
            <div className="mark mark-100">100</div>
            <div className="mark mark-50">50</div>
          </div>
          
          {/* Water */}
          <div 
            className="beaker-water"
            style={{
              height: `${waterLevel}%`,
              background: `linear-gradient(180deg, 
                ${waterColor} 0%, 
                rgba(150, 200, 255, ${waterOpacity}) 50%,
                rgba(120, 180, 240, ${waterOpacity}) 100%)`,
            }}
          >
            {/* Water surface shine */}
            <div className="water-surface"></div>
            
            {/* Ripple effect when stirring */}
            {isStirring && (
              <div className="water-ripples">
                <div className="ripple ripple-1"></div>
                <div className="ripple ripple-2"></div>
                <div className="ripple ripple-3"></div>
              </div>
            )}
            
            {/* Salt particles floating/dissolving */}
            {saltParticles.map((particle, idx) => (
              <div
                key={idx}
                className={`salt-particle ${particle.dissolving ? 'dissolving' : ''} ${isStirring ? 'stirring' : ''}`}
                style={{
                  left: `${particle.x}%`,
                  bottom: `${particle.y}%`,
                  animationDelay: `${idx * 0.1}s`,
                  opacity: particle.dissolving ? 0.3 : 0.9
                }}
              />
            ))}
            
            {/* Dissolved salt effect - subtle cloudiness */}
            {saltConcentration > 0 && (
              <div 
                className="dissolved-salt-cloud"
                style={{ opacity: saltConcentration * 0.15 }}
              ></div>
            )}
          </div>
          
          {/* Beaker spout */}
          <div className="beaker-spout"></div>
        </div>
        
        {/* Beaker base */}
        <div className="beaker-base"></div>
        
        {/* Shadow under beaker */}
        <div className="beaker-shadow"></div>
      </div>
      
      {/* Stirring rod */}
      {showSpoon && (
        <div className={`stirring-rod ${isStirring ? 'stirring' : ''}`}>
          <div className="rod-handle"></div>
          <div className="rod-tip"></div>
        </div>
      )}
      
      {/* Salt Spoon with salt */}
      <div className="salt-spoon-area">
        <div className="salt-container">
          <div className="salt-jar">
            <div className="jar-label">NaCl</div>
            <div className="jar-salt"></div>
          </div>
        </div>
      </div>
    </div>
  )
}

/**
 * Experiment 1: Dissolving Salt in Water - Interactive Lab
 * Flow: Thực hiện thí nghiệm → Quan sát kết quả → Trả lời câu hỏi
 */
function Experiment1_DissolvingSalt({ onComplete, isLocked }) {
  // Experiment states
  const [phase, setPhase] = useState('experiment') // 'experiment', 'observe', 'quiz', 'result'
  const [saltAdded, setSaltAdded] = useState(0)
  const [isStirring, setIsStirring] = useState(false)
  const [hasStirred, setHasStirred] = useState(false)
  const [isPouring, setIsPouring] = useState(false)
  const [saltParticles, setSaltParticles] = useState([])
  
  // Quiz states
  const [answers, setAnswers] = useState({})
  const [showResults, setShowResults] = useState(false)
  const [score, setScore] = useState(0)
  
  const maxSalt = 5 // Giảm xuống 5 để thí nghiệm nhanh hơn
  const saltConcentration = saltAdded / maxSalt
  
  // Questions based on experiment observation
  const questions = [
    {
      id: 'q1',
      question: 'Khi cho muối vào nước, hiện tượng gì xảy ra?',
      options: [
        { id: 'a', text: 'Muối nổi lên trên mặt nước' },
        { id: 'b', text: 'Muối chìm xuống và tan dần' },
        { id: 'c', text: 'Muối không thay đổi' },
        { id: 'd', text: 'Muối bốc cháy' }
      ],
      correct: 'b'
    },
    {
      id: 'q2', 
      question: 'Khi khuấy dung dịch, muối tan nhanh hơn hay chậm hơn?',
      options: [
        { id: 'a', text: 'Tan nhanh hơn' },
        { id: 'b', text: 'Tan chậm hơn' },
        { id: 'c', text: 'Không thay đổi' },
        { id: 'd', text: 'Muối kết tủa lại' }
      ],
      correct: 'a'
    },
    {
      id: 'q3',
      question: 'Sau khi muối tan hết, dung dịch có màu gì?',
      options: [
        { id: 'a', text: 'Màu trắng đục' },
        { id: 'b', text: 'Màu xanh' },
        { id: 'c', text: 'Trong suốt, không màu' },
        { id: 'd', text: 'Màu vàng' }
      ],
      correct: 'c'
    },
    {
      id: 'q4',
      question: 'Trong thí nghiệm này, chất nào là chất tan?',
      options: [
        { id: 'a', text: 'Nước (H₂O)' },
        { id: 'b', text: 'Muối (NaCl)' },
        { id: 'c', text: 'Cả hai' },
        { id: 'd', text: 'Không có chất tan' }
      ],
      correct: 'b'
    }
  ]
  
  // Check if experiment is complete
  const experimentComplete = saltAdded >= maxSalt && hasStirred
  
  // Handle adding salt
  const handleAddSalt = () => {
    if (saltAdded < maxSalt && !isPouring) {
      setIsPouring(true)
      
      const newParticles = []
      for (let i = 0; i < 4; i++) {
        newParticles.push({
          id: Date.now() + i,
          x: 30 + Math.random() * 40,
          y: 75 + Math.random() * 20,
          dissolving: false
        })
      }
      
      setSaltParticles(prev => [...prev, ...newParticles])
      
      setTimeout(() => {
        setSaltAdded(prev => prev + 1)
        setIsPouring(false)
        
        setTimeout(() => {
          setSaltParticles(prev => 
            prev.map(p => ({ ...p, dissolving: true, y: 10 + Math.random() * 60 }))
          )
        }, 500)
      }, 600)
    }
  }
  
  // Handle stirring
  const handleStir = () => {
    if (saltAdded > 0 && !isStirring) {
      setIsStirring(true)
      setHasStirred(true)
      
      setSaltParticles(prev => 
        prev.map(p => ({
          ...p,
          x: 15 + Math.random() * 70,
          y: 10 + Math.random() * 70,
          dissolving: true
        }))
      )
      
      setTimeout(() => {
        setIsStirring(false)
        setSaltParticles(prev => prev.slice(Math.floor(prev.length / 3)))
      }, 2000)
    }
  }
  
  // Go to observation phase
  const handleGoToObserve = () => {
    setPhase('observe')
  }
  
  // Go to quiz phase
  const handleGoToQuiz = () => {
    setPhase('quiz')
  }
  
  // Handle answer selection
  const handleSelectAnswer = (questionId, answerId) => {
    setAnswers(prev => ({ ...prev, [questionId]: answerId }))
  }
  
  // Submit quiz
  const handleSubmitQuiz = () => {
    let correct = 0
    questions.forEach(q => {
      if (answers[q.id] === q.correct) correct++
    })
    setScore(correct)
    setShowResults(true)
    setPhase('result')
    
    if (correct >= 3) { // Pass if 3/4 correct
      onComplete?.()
    }
  }
  
  // Reset everything
  const handleReset = () => {
    setPhase('experiment')
    setSaltAdded(0)
    setIsStirring(false)
    setHasStirred(false)
    setIsPouring(false)
    setSaltParticles([])
    setAnswers({})
    setShowResults(false)
    setScore(0)
  }
  
  if (isLocked) {
    return (
      <section className="card locked">
        <LockedOverlay stageNumber={1} requiredStage={0} />
        <div className="quiz-head">
          <div>
            <p className="eyebrow">Màn 1 — Thí nghiệm</p>
            <h3>🧪 Hòa Tan Muối vào Nước</h3>
          </div>
        </div>
      </section>
    )
  }
  
  return (
    <section className="card experiment-card">
      {/* Phase indicator */}
      <div className="phase-indicator">
        <div className={`phase-step ${phase === 'experiment' ? 'active' : experimentComplete ? 'done' : ''}`}>
          <span className="phase-num">1</span>
          <span className="phase-label">Thí nghiệm</span>
        </div>
        <div className="phase-connector"></div>
        <div className={`phase-step ${phase === 'observe' ? 'active' : phase === 'quiz' || phase === 'result' ? 'done' : ''}`}>
          <span className="phase-num">2</span>
          <span className="phase-label">Quan sát</span>
        </div>
        <div className="phase-connector"></div>
        <div className={`phase-step ${phase === 'quiz' ? 'active' : phase === 'result' ? 'done' : ''}`}>
          <span className="phase-num">3</span>
          <span className="phase-label">Trả lời</span>
        </div>
        <div className="phase-connector"></div>
        <div className={`phase-step ${phase === 'result' ? 'active' : ''}`}>
          <span className="phase-num">4</span>
          <span className="phase-label">Kết quả</span>
        </div>
      </div>
      
      <div className="experiment-layout-two-col">
        {/* Left - Lab Visualization (always visible) */}
        <div className="experiment-visual-panel realistic-lab">
          <div className="visual-panel-header">
            <h4>🔬 PHÒNG THÍ NGHIỆM</h4>
            <span className="lab-badge">
              {phase === 'experiment' && 'Đang thực hiện'}
              {phase === 'observe' && 'Quan sát'}
              {phase === 'quiz' && 'Trả lời câu hỏi'}
              {phase === 'result' && 'Hoàn thành'}
            </span>
          </div>
          
          <div className="visual-panel-content lab-workspace">
            <RealisticBeaker 
              waterLevel={70}
              saltConcentration={saltConcentration}
              isStirring={isStirring}
              saltParticles={saltParticles}
              showSpoon={hasStirred || isStirring}
            />
            
            {/* Status display */}
            <div className="lab-info-panel">
              <div className="info-item">
                <span className="info-icon">🧂</span>
                <span className="info-label">Muối:</span>
                <span className="info-value">{saltAdded}/{maxSalt} muỗi</span>
              </div>
              <div className="info-item">
                <span className="info-icon">💧</span>
                <span className="info-label">Nước:</span>
                <span className="info-value">200 mL</span>
              </div>
              <div className="info-item">
                <span className="info-icon">🌡️</span>
                <span className="info-label">Nhiệt độ:</span>
                <span className="info-value">25°C</span>
              </div>
            </div>
            
            {/* Concentration meter */}
            <div className="concentration-meter">
              <div className="meter-label">Nồng độ muối</div>
              <div className="meter-bar">
                <div 
                  className="meter-fill"
                  style={{ 
                    width: `${saltConcentration * 100}%`,
                    background: saltConcentration < 0.3 ? '#60a5fa' : 
                               saltConcentration < 0.7 ? '#34d399' : '#fbbf24'
                  }}
                ></div>
              </div>
              <div className="meter-value">{(saltConcentration * 100).toFixed(0)}%</div>
            </div>
          </div>
        </div>
        
        {/* Right - Interactive Panel */}
        <div className="experiment-form-panel control-panel">
          
          {/* PHASE 1: Experiment */}
          {phase === 'experiment' && (
            <>
              <div className="form-panel-header">
                <h4>🧪 THỰC HIỆN THÍ NGHIỆM</h4>
                <div className="completion-badge" style={{ 
                  background: experimentComplete ? '#22c55e' : '#94a3b8'
                }}>
                  {experimentComplete ? '✓ Sẵn sàng' : `${saltAdded}/${maxSalt}`}
                </div>
              </div>
              
              <div className="form-panel-content">
                <div className="experiment-instructions">
                  <h5>📋 Hướng dẫn thí nghiệm:</h5>
                  <ol>
                    <li className={saltAdded > 0 ? 'done' : ''}>
                      Cho muối NaCl vào cốc nước ({saltAdded}/{maxSalt} muỗi)
                    </li>
                    <li className={hasStirred ? 'done' : ''}>
                      Dùng đũa thủy tinh khuấy đều
                    </li>
                    <li>Quan sát hiện tượng xảy ra</li>
                  </ol>
                </div>
                
                {/* Action buttons */}
                <div className="control-action">
                  <div className="action-header">
                    <span className="action-step">1</span>
                    <span className="action-title">Thêm muối NaCl</span>
                  </div>
                  <button 
                    onClick={handleAddSalt}
                    disabled={saltAdded >= maxSalt || isPouring}
                    className={`lab-btn ${isPouring ? 'pouring' : ''}`}
                  >
                    <span className="btn-icon">{isPouring ? '⏳' : '🧂'}</span>
                    <span className="btn-text">
                      {saltAdded >= maxSalt ? 'Đã đủ muối' : isPouring ? 'Đang đổ...' : 'Thêm 1 muỗi muối'}
                    </span>
                  </button>
                </div>
                
                <div className="control-action">
                  <div className="action-header">
                    <span className="action-step">2</span>
                    <span className="action-title">Khuấy đều</span>
                  </div>
                  <button 
                    onClick={handleStir}
                    disabled={saltAdded === 0 || isStirring}
                    className={`lab-btn lab-btn-green ${isStirring ? 'stirring' : ''} ${hasStirred ? 'done' : ''}`}
                  >
                    <span className="btn-icon">{isStirring ? '🌀' : hasStirred ? '✓' : '🥄'}</span>
                    <span className="btn-text">
                      {hasStirred ? 'Đã khuấy' : isStirring ? 'Đang khuấy...' : 'Khuấy đều'}
                    </span>
                  </button>
                </div>
                
                {/* Real-time observation */}
                <div className="realtime-observation">
                  <h5>👁️ Quan sát hiện tượng:</h5>
                  <div className="observation-box">
                    {saltAdded === 0 && <p>💧 Cốc chứa nước trong suốt, không màu.</p>}
                    {saltAdded > 0 && !hasStirred && (
                      <p>🔹 Các hạt muối trắng chìm xuống đáy cốc và bắt đầu tan dần từ bề mặt.</p>
                    )}
                    {saltAdded > 0 && hasStirred && saltAdded < maxSalt && (
                      <p>🔹 Khi khuấy, muối tan nhanh hơn. Dung dịch vẫn trong suốt.</p>
                    )}
                    {saltAdded >= maxSalt && hasStirred && (
                      <p>✨ Muối đã tan hoàn toàn vào nước tạo thành dung dịch trong suốt!</p>
                    )}
                  </div>
                </div>
              </div>
              
              <div className="form-panel-actions">
                <button onClick={handleReset} className="action-btn-secondary">
                  <span>🔄</span> Làm lại
                </button>
                <button 
                  onClick={handleGoToObserve}
                  disabled={!experimentComplete}
                  className="action-btn-primary"
                >
                  <span>👁️</span> Tiếp tục quan sát
                </button>
              </div>
            </>
          )}
          
          {/* PHASE 2: Observation */}
          {phase === 'observe' && (
            <>
              <div className="form-panel-header">
                <h4>👁️ QUAN SÁT KẾT QUẢ</h4>
              </div>
              
              <div className="form-panel-content">
                <div className="observation-summary">
                  <h5>📝 Tổng kết quan sát:</h5>
                  
                  <div className="obs-card">
                    <div className="obs-card-icon">🧂</div>
                    <div className="obs-card-content">
                      <strong>Trước khi khuấy:</strong>
                      <p>Muối NaCl chìm xuống đáy cốc, tan từ từ từ bề mặt tinh thể.</p>
                    </div>
                  </div>
                  
                  <div className="obs-card">
                    <div className="obs-card-icon">🌀</div>
                    <div className="obs-card-content">
                      <strong>Sau khi khuấy:</strong>
                      <p>Muối tan nhanh hơn do tăng tiếp xúc giữa chất tan và dung môi.</p>
                    </div>
                  </div>
                  
                  <div className="obs-card">
                    <div className="obs-card-icon">💧</div>
                    <div className="obs-card-content">
                      <strong>Dung dịch thu được:</strong>
                      <p>Dung dịch muối trong suốt, không màu, có vị mặn.</p>
                    </div>
                  </div>
                </div>
                
                <div className="science-note">
                  <div className="note-icon">📚</div>
                  <div className="note-content">
                    <strong>Giải thích khoa học:</strong><br/>
                    Phân tử nước (H₂O) có tính phân cực, bao quanh các ion Na⁺ và Cl⁻, 
                    tách chúng ra khỏi tinh thể muối. Quá trình này gọi là <strong>sự hòa tan</strong>.
                  </div>
                </div>
              </div>
              
              <div className="form-panel-actions">
                <button onClick={() => setPhase('experiment')} className="action-btn-secondary">
                  <span>⬅️</span> Quay lại
                </button>
                <button onClick={handleGoToQuiz} className="action-btn-primary">
                  <span>📝</span> Trả lời câu hỏi
                </button>
              </div>
            </>
          )}
          
          {/* PHASE 3: Quiz */}
          {phase === 'quiz' && (
            <>
              <div className="form-panel-header">
                <h4>📝 TRẢ LỜI CÂU HỎI</h4>
                <div className="completion-badge" style={{ background: '#8b5cf6' }}>
                  {Object.keys(answers).length}/{questions.length}
                </div>
              </div>
              
              <div className="form-panel-content quiz-content">
                {questions.map((q, idx) => (
                  <div key={q.id} className="quiz-question">
                    <div className="question-header">
                      <span className="q-number">Câu {idx + 1}</span>
                      {answers[q.id] && <span className="q-answered">✓</span>}
                    </div>
                    <p className="q-text">{q.question}</p>
                    <div className="q-options">
                      {q.options.map(opt => (
                        <button
                          key={opt.id}
                          onClick={() => handleSelectAnswer(q.id, opt.id)}
                          className={`q-option ${answers[q.id] === opt.id ? 'selected' : ''}`}
                        >
                          <span className="opt-letter">{opt.id.toUpperCase()}</span>
                          <span className="opt-text">{opt.text}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="form-panel-actions">
                <button onClick={() => setPhase('observe')} className="action-btn-secondary">
                  <span>⬅️</span> Xem lại
                </button>
                <button 
                  onClick={handleSubmitQuiz}
                  disabled={Object.keys(answers).length < questions.length}
                  className="action-btn-primary"
                >
                  <span>✓</span> Nộp bài
                </button>
              </div>
            </>
          )}
          
          {/* PHASE 4: Result */}
          {phase === 'result' && (
            <>
              <div className="form-panel-header">
                <h4>🎯 KẾT QUẢ</h4>
              </div>
              
              <div className="form-panel-content">
                <div className={`result-summary ${score >= 3 ? 'pass' : 'fail'}`}>
                  <div className="result-icon">{score >= 3 ? '🎉' : '😢'}</div>
                  <div className="result-score">{score}/{questions.length}</div>
                  <div className="result-text">
                    {score >= 3 ? 'Xuất sắc! Bạn đã hiểu bài!' : 'Cần cố gắng thêm!'}
                  </div>
                </div>
                
                {/* Show correct answers */}
                <div className="answers-review">
                  <h5>📋 Đáp án chi tiết:</h5>
                  {questions.map((q, idx) => {
                    const isCorrect = answers[q.id] === q.correct
                    const userAnswer = q.options.find(o => o.id === answers[q.id])
                    const correctAnswer = q.options.find(o => o.id === q.correct)
                    
                    return (
                      <div key={q.id} className={`answer-item ${isCorrect ? 'correct' : 'incorrect'}`}>
                        <div className="answer-header">
                          <span>Câu {idx + 1}:</span>
                          <span className="answer-status">{isCorrect ? '✓' : '✗'}</span>
                        </div>
                        <p className="answer-question">{q.question}</p>
                        {!isCorrect && (
                          <p className="your-answer">Bạn chọn: {userAnswer?.text}</p>
                        )}
                        <p className="correct-answer">Đáp án đúng: {correctAnswer?.text}</p>
                      </div>
                    )
                  })}
                </div>
              </div>
              
              <div className="form-panel-actions">
                <button onClick={handleReset} className="action-btn-secondary full-width">
                  <span>🔄</span> Làm lại toàn bộ thí nghiệm
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  )
}

/**
 * Realistic Test Tube Component - Ống nghiệm 3D thực tế
 */
function RealisticTestTube({ solute, solvent, result, isMixing = false }) {
  const getSoluteColor = (soluteId) => {
    switch(soluteId) {
      case 'salt': return 'rgba(255, 255, 255, 0.9)'
      case 'sugar': return 'rgba(255, 248, 220, 0.9)'
      case 'oil': return 'rgba(255, 215, 0, 0.7)'
      default: return 'transparent'
    }
  }
  
  const getSolventColor = (solventId) => {
    switch(solventId) {
      case 'water': return 'rgba(180, 210, 250, 0.85)'
      case 'alcohol': return 'rgba(230, 240, 255, 0.8)'
      default: return 'rgba(200, 220, 255, 0.8)'
    }
  }

  const showSeparation = result && !result.dissolves
  
  return (
    <div className="test-tube-container">
      {/* Lab stand */}
      <div className="test-tube-stand">
        <div className="stand-base"></div>
        <div className="stand-pole"></div>
        <div className="stand-clamp">
          <div className="clamp-ring"></div>
        </div>
      </div>
      
      {/* Test tube */}
      <div className={`test-tube-3d ${isMixing ? 'mixing' : ''}`}>
        {/* Glass tube */}
        <div className="tube-glass">
          {/* Glass reflections */}
          <div className="tube-reflection-left"></div>
          <div className="tube-reflection-right"></div>
          
          {/* Liquid layers */}
          <div className="tube-liquid-container">
            {showSeparation ? (
              <>
                {/* Oil layer on top */}
                <div 
                  className="liquid-layer oil-layer"
                  style={{ background: getSoluteColor(solute) }}
                >
                  <div className="oil-droplets">
                    {[...Array(5)].map((_, i) => (
                      <div key={i} className="oil-droplet" style={{
                        left: `${20 + Math.random() * 60}%`,
                        animationDelay: `${i * 0.2}s`
                      }}></div>
                    ))}
                  </div>
                </div>
                {/* Water layer below */}
                <div 
                  className="liquid-layer water-layer"
                  style={{ background: getSolventColor(solvent) }}
                >
                  <div className="water-shine"></div>
                </div>
              </>
            ) : (
              /* Mixed solution */
              <div 
                className="liquid-layer mixed-solution"
                style={{ 
                  background: solute && solvent 
                    ? `linear-gradient(180deg, 
                        ${getSolventColor(solvent)} 0%,
                        rgba(200, 220, 255, 0.9) 100%)`
                    : getSolventColor(solvent),
                  height: solvent ? '75%' : '0%'
                }}
              >
                <div className="solution-shine"></div>
                {/* Dissolving particles */}
                {solute && result?.dissolves && (
                  <div className="dissolving-particles">
                    {[...Array(8)].map((_, i) => (
                      <div 
                        key={i} 
                        className="dissolve-particle"
                        style={{
                          left: `${10 + Math.random() * 80}%`,
                          bottom: `${10 + Math.random() * 70}%`,
                          animationDelay: `${i * 0.15}s`,
                          background: getSoluteColor(solute)
                        }}
                      ></div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
          
          {/* Tube opening */}
          <div className="tube-opening"></div>
        </div>
        
        {/* Tube bottom (rounded) */}
        <div className="tube-bottom"></div>
      </div>
      
      {/* Chemical labels */}
      <div className="chemical-labels">
        {solute && (
          <div className="chem-label solute-label">
            <span className="chem-formula">
              {solute === 'salt' && 'NaCl'}
              {solute === 'sugar' && 'C₁₂H₂₂O₁₁'}
              {solute === 'oil' && 'Dầu'}
            </span>
          </div>
        )}
        {solvent && (
          <div className="chem-label solvent-label">
            <span className="chem-formula">
              {solvent === 'water' && 'H₂O'}
              {solvent === 'alcohol' && 'C₂H₅OH'}
            </span>
          </div>
        )}
      </div>
    </div>
  )
}

/**
 * Experiment 2: Solute and Solvent (Chất tan - Dung môi) - Enhanced
 */
function Experiment2_SoluteAndSolvent({ onComplete, isLocked }) {
  // Phase: 'experiment' → 'observe' → 'quiz' → 'result'
  const [phase, setPhase] = useState('experiment')
  const [selectedSolute, setSelectedSolute] = useState(null)
  const [selectedSolvent, setSelectedSolvent] = useState(null)
  const [isMixing, setIsMixing] = useState(false)
  const [tested, setTested] = useState({
    saltWater: false,
    sugarWater: false,
    oilWater: false,
    saltAlcohol: false
  })
  const [isCompleted, setIsCompleted] = useState(false)
  const [answers, setAnswers] = useState({})
  const [score, setScore] = useState(0)
  
  const solutes = [
    { id: 'salt', name: 'Muối NaCl', icon: '🧂', color: '#f1f5f9' },
    { id: 'sugar', name: 'Đường', icon: '🍬', color: '#fef3c7' },
    { id: 'oil', name: 'Dầu ăn', icon: '🛢️', color: '#fde047' }
  ]
  
  const solvents = [
    { id: 'water', name: 'Nước H₂O', icon: '💧', color: '#bfdbfe' },
    { id: 'alcohol', name: 'Cồn', icon: '🧪', color: '#e0f2fe' }
  ]
  
  const solubility = {
    'salt-water': { dissolves: true, text: 'Muối tan hoàn toàn trong nước, tạo dung dịch trong suốt', detail: 'Ion Na⁺ và Cl⁻ được hydrat hóa' },
    'sugar-water': { dissolves: true, text: 'Đường tan hoàn toàn trong nước, dung dịch ngọt', detail: 'Phân tử đường liên kết với nước' },
    'oil-water': { dissolves: false, text: 'Dầu KHÔNG tan trong nước, tách thành 2 lớp', detail: 'Dầu kỵ nước, nổi lên trên' },
    'salt-alcohol': { dissolves: true, text: 'Muối tan một phần trong cồn', detail: 'Độ tan thấp hơn so với nước' }
  }
  
  // Quiz questions
  const questions = [
    {
      id: 'q1',
      question: 'Trong thí nghiệm trên, chất nào KHÔNG tan trong nước?',
      options: [
        { id: 'a', text: 'Muối NaCl' },
        { id: 'b', text: 'Đường C₁₂H₂₂O₁₁' },
        { id: 'c', text: 'Dầu ăn' },
        { id: 'd', text: 'Cả 3 đều tan' }
      ],
      correct: 'c'
    },
    {
      id: 'q2',
      question: 'Tại sao dầu không tan trong nước?',
      options: [
        { id: 'a', text: 'Dầu quá đặc' },
        { id: 'b', text: 'Dầu là chất kỵ nước (không phân cực)' },
        { id: 'c', text: 'Nước quá lạnh' },
        { id: 'd', text: 'Dầu nặng hơn nước' }
      ],
      correct: 'b'
    },
    {
      id: 'q3',
      question: 'Khi muối NaCl tan trong nước, hiện tượng gì xảy ra ở mức phân tử?',
      options: [
        { id: 'a', text: 'Muối bay hơi' },
        { id: 'b', text: 'Ion Na⁺ và Cl⁻ được phân tử nước bao quanh' },
        { id: 'c', text: 'Muối biến thành khí' },
        { id: 'd', text: 'Nước bốc cháy' }
      ],
      correct: 'b'
    },
    {
      id: 'q4',
      question: 'Trong dung dịch muối, đâu là chất tan và đâu là dung môi?',
      options: [
        { id: 'a', text: 'Muối là dung môi, nước là chất tan' },
        { id: 'b', text: 'Cả hai đều là chất tan' },
        { id: 'c', text: 'Muối là chất tan, nước là dung môi' },
        { id: 'd', text: 'Cả hai đều là dung môi' }
      ],
      correct: 'c'
    }
  ]
  
  const requirements = [
    { key: 'saltWater', target: 1, text: 'Muối + Nước', showProgress: false },
    { key: 'sugarWater', target: 1, text: 'Đường + Nước', showProgress: false },
    { key: 'oilWater', target: 1, text: 'Dầu + Nước', showProgress: false },
    { key: 'saltAlcohol', target: 1, text: 'Muối + Cồn', showProgress: false }
  ]
  
  const progress = {
    saltWater: tested.saltWater ? 1 : 0,
    sugarWater: tested.sugarWater ? 1 : 0,
    oilWater: tested.oilWater ? 1 : 0,
    saltAlcohol: tested.saltAlcohol ? 1 : 0
  }
  
  const allExperimentsDone = tested.saltWater && tested.sugarWater && tested.oilWater && tested.saltAlcohol
  
  const handleTest = () => {
    if (!selectedSolute || !selectedSolvent || isMixing) return
    
    setIsMixing(true)
    
    setTimeout(() => {
      const key = `${selectedSolute}-${selectedSolvent}`
      const testKey = key.replace('-', '')
      
      if (testKey === 'saltwater') setTested(prev => ({ ...prev, saltWater: true }))
      if (testKey === 'sugarwater') setTested(prev => ({ ...prev, sugarWater: true }))
      if (testKey === 'oilwater') setTested(prev => ({ ...prev, oilWater: true }))
      if (testKey === 'saltalcohol') setTested(prev => ({ ...prev, saltAlcohol: true }))
      
      setIsMixing(false)
    }, 1500)
  }
  
  const currentResult = selectedSolute && selectedSolvent ? 
    solubility[`${selectedSolute}-${selectedSolvent}`] : null
  
  const handleGoToObserve = () => {
    if (allExperimentsDone) setPhase('observe')
  }
  
  const handleGoToQuiz = () => setPhase('quiz')
  
  const handleSelectAnswer = (qId, optId) => {
    setAnswers(prev => ({ ...prev, [qId]: optId }))
  }
  
  const handleSubmitQuiz = () => {
    let correctCount = 0
    questions.forEach(q => {
      if (answers[q.id] === q.correct) correctCount++
    })
    setScore(correctCount)
    setPhase('result')
    
    if (correctCount >= 3 && !isCompleted) {
      setIsCompleted(true)
      onComplete?.()
    }
  }
  
  const handleReset = () => {
    setPhase('experiment')
    setSelectedSolute(null)
    setSelectedSolvent(null)
    setTested({ saltWater: false, sugarWater: false, oilWater: false, saltAlcohol: false })
    setAnswers({})
    setScore(0)
  }
  
  const phases = [
    { id: 'experiment', label: 'Thực hiện', icon: '🧪' },
    { id: 'observe', label: 'Quan sát', icon: '👁️' },
    { id: 'quiz', label: 'Trả lời', icon: '📝' },
    { id: 'result', label: 'Kết quả', icon: '🎯' }
  ]
  
  if (isLocked) {
    return (
      <section className="card locked">
        <LockedOverlay stageNumber={2} requiredStage={1} />
        <div className="quiz-head">
          <div>
            <p className="eyebrow">Màn 2 — Thí nghiệm</p>
            <h3>🧪 Chất Tan - Dung Môi</h3>
          </div>
        </div>
      </section>
    )
  }
  
  return (
    <section className="card experiment-card">
      {/* Phase Indicator */}
      <div className="phase-indicator">
        {phases.map((p, idx) => (
          <React.Fragment key={p.id}>
            <div className={`phase-step ${phase === p.id ? 'active' : ''} ${
              phases.findIndex(x => x.id === phase) > idx ? 'completed' : ''
            }`}>
              <span className="step-num">{idx + 1}</span>
              <span className="step-label">{p.icon} {p.label}</span>
            </div>
            {idx < phases.length - 1 && (
              <div className={`phase-connector ${phases.findIndex(x => x.id === phase) > idx ? 'completed' : ''}`} />
            )}
          </React.Fragment>
        ))}
      </div>
      
      <div className="experiment-layout-two-col">
        {/* Left - Lab Visualization */}
        <div className="experiment-visual-panel realistic-lab">
          <div className="visual-panel-header">
            <h4>🔬 PHÒNG THÍ NGHIỆM</h4>
            <span className="lab-badge">Chất tan - Dung môi</span>
          </div>
          
          <div className="visual-panel-content lab-workspace">
            <RealisticTestTube 
              solute={selectedSolute}
              solvent={selectedSolvent}
              result={currentResult}
              isMixing={isMixing}
            />
            
            {currentResult && !isMixing && (
              <div className={`result-indicator ${currentResult.dissolves ? 'success' : 'fail'}`}>
                <span className="result-icon">{currentResult.dissolves ? '✓' : '✗'}</span>
                <span className="result-text">{currentResult.dissolves ? 'TAN' : 'KHÔNG TAN'}</span>
              </div>
            )}
            
            {isMixing && (
              <div className="mixing-indicator">
                <div className="mixing-spinner"></div>
                <span>Đang trộn...</span>
              </div>
            )}
          </div>
          
          <div className="lab-info-bar">
            <div className="info-item">
              <span className="info-icon">🧪</span>
              <span className="info-label">Đã thử:</span>
              <span className="info-value">{Object.values(tested).filter(Boolean).length}/4</span>
            </div>
          </div>
        </div>
        
        {/* Right - Control/Content Panel */}
        <div className="experiment-form-panel control-panel">
          {/* PHASE 1: Experiment */}
          {phase === 'experiment' && (
            <>
              <div className="form-panel-header">
                <h4>🧪 CHỌN HÓA CHẤT</h4>
                <div className="completion-badge" style={{ background: allExperimentsDone ? '#22c55e' : '#0ea5e9' }}>
                  {Object.values(tested).filter(Boolean).length}/4
                </div>
              </div>
              
              <div className="form-panel-content">
                <div className="experiment-instructions">
                  <h5>📋 Yêu cầu thí nghiệm:</h5>
                  <ol>
                    <li>Chọn 1 chất tan (muối/đường/dầu)</li>
                    <li>Chọn 1 dung môi (nước/cồn)</li>
                    <li>Nhấn "Thử nghiệm" để xem kết quả</li>
                    <li>Hoàn thành cả 4 thí nghiệm</li>
                  </ol>
                </div>
                
                {/* Select Solute */}
                <div className="control-action">
                  <div className="action-header">
                    <span className="action-step">1</span>
                    <span className="action-title">Chọn chất tan</span>
                  </div>
                  <div className="chemical-selector">
                    {solutes.map(solute => (
                      <button
                        key={solute.id}
                        onClick={() => setSelectedSolute(solute.id)}
                        className={`chem-btn ${selectedSolute === solute.id ? 'selected' : ''}`}
                        style={{ '--chem-color': solute.color }}
                      >
                        <span className="chem-icon">{solute.icon}</span>
                        <span className="chem-name">{solute.name}</span>
                      </button>
                    ))}
                  </div>
                </div>
                
                {/* Select Solvent */}
                <div className="control-action">
                  <div className="action-header">
                    <span className="action-step">2</span>
                    <span className="action-title">Chọn dung môi</span>
                  </div>
                  <div className="chemical-selector two-cols">
                    {solvents.map(solvent => (
                      <button
                        key={solvent.id}
                        onClick={() => setSelectedSolvent(solvent.id)}
                        className={`chem-btn ${selectedSolvent === solvent.id ? 'selected' : ''}`}
                        style={{ '--chem-color': solvent.color }}
                      >
                        <span className="chem-icon">{solvent.icon}</span>
                        <span className="chem-name">{solvent.name}</span>
                      </button>
                    ))}
                  </div>
                </div>
                
                {/* Mix Button */}
                <button 
                  onClick={handleTest}
                  disabled={!selectedSolute || !selectedSolvent || isMixing}
                  className={`lab-btn lab-btn-purple ${isMixing ? 'mixing' : ''}`}
                >
                  <span className="btn-icon">{isMixing ? '🌀' : '🔬'}</span>
                  <span className="btn-text">{isMixing ? 'Đang thử nghiệm...' : 'Thử nghiệm'}</span>
                </button>
                
                {/* Progress checklist */}
                <div className="experiment-checklist">
                  <div className="checklist-title">📝 Thử nghiệm đã thực hiện:</div>
                  <div className="checklist-items">
                    <span className={tested.saltWater ? 'done' : ''}>🧂+💧</span>
                    <span className={tested.sugarWater ? 'done' : ''}>🍬+💧</span>
                    <span className={tested.oilWater ? 'done' : ''}>🛢️+💧</span>
                    <span className={tested.saltAlcohol ? 'done' : ''}>🧂+🧪</span>
                  </div>
                </div>
                
                {currentResult && (
                  <div className="realtime-observation">
                    <p>
                      <strong>👁️ Kết quả:</strong> {currentResult.text}
                    </p>
                  </div>
                )}
              </div>
              
              <div className="form-panel-actions">
                <button onClick={handleReset} className="action-btn-secondary">
                  <span>🔄</span> Làm lại
                </button>
                <button 
                  onClick={handleGoToObserve}
                  disabled={!allExperimentsDone}
                  className="action-btn-primary"
                >
                  <span>👁️</span> Quan sát kết quả
                </button>
              </div>
            </>
          )}
          
          {/* PHASE 2: Observe */}
          {phase === 'observe' && (
            <>
              <div className="form-panel-header">
                <h4>👁️ TỔNG KẾT QUAN SÁT</h4>
              </div>
              
              <div className="form-panel-content">
                <div className="observation-cards">
                  <div className="obs-card">
                    <div className="obs-card-icon">✅</div>
                    <div className="obs-card-content">
                      <strong>Chất tan trong nước:</strong>
                      <p>Muối NaCl và đường C₁₂H₂₂O₁₁ đều tan hoàn toàn trong nước, tạo dung dịch trong suốt.</p>
                    </div>
                  </div>
                  
                  <div className="obs-card">
                    <div className="obs-card-icon">❌</div>
                    <div className="obs-card-content">
                      <strong>Chất không tan:</strong>
                      <p>Dầu ăn không tan trong nước, tách thành 2 lớp - dầu nổi lên trên.</p>
                    </div>
                  </div>
                  
                  <div className="obs-card">
                    <div className="obs-card-icon">🧪</div>
                    <div className="obs-card-content">
                      <strong>Dung môi khác:</strong>
                      <p>Muối tan được trong cồn nhưng độ tan thấp hơn trong nước.</p>
                    </div>
                  </div>
                </div>
                
                <div className="science-note">
                  <div className="note-icon">📚</div>
                  <div className="note-content">
                    <strong>Nguyên tắc:</strong> "Tương tự tan tương tự" - Chất phân cực tan trong dung môi phân cực (nước), 
                    chất không phân cực tan trong dung môi không phân cực.
                  </div>
                </div>
              </div>
              
              <div className="form-panel-actions">
                <button onClick={() => setPhase('experiment')} className="action-btn-secondary">
                  <span>⬅️</span> Quay lại
                </button>
                <button onClick={handleGoToQuiz} className="action-btn-primary">
                  <span>📝</span> Trả lời câu hỏi
                </button>
              </div>
            </>
          )}
          
          {/* PHASE 3: Quiz */}
          {phase === 'quiz' && (
            <>
              <div className="form-panel-header">
                <h4>📝 TRẢ LỜI CÂU HỎI</h4>
                <div className="completion-badge" style={{ background: '#8b5cf6' }}>
                  {Object.keys(answers).length}/{questions.length}
                </div>
              </div>
              
              <div className="form-panel-content quiz-content">
                {questions.map((q, idx) => (
                  <div key={q.id} className="quiz-question">
                    <div className="question-header">
                      <span className="q-number">Câu {idx + 1}</span>
                      {answers[q.id] && <span className="q-answered">✓</span>}
                    </div>
                    <p className="q-text">{q.question}</p>
                    <div className="q-options">
                      {q.options.map(opt => (
                        <button
                          key={opt.id}
                          onClick={() => handleSelectAnswer(q.id, opt.id)}
                          className={`q-option ${answers[q.id] === opt.id ? 'selected' : ''}`}
                        >
                          <span className="opt-letter">{opt.id.toUpperCase()}</span>
                          <span className="opt-text">{opt.text}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="form-panel-actions">
                <button onClick={() => setPhase('observe')} className="action-btn-secondary">
                  <span>⬅️</span> Xem lại
                </button>
                <button 
                  onClick={handleSubmitQuiz}
                  disabled={Object.keys(answers).length < questions.length}
                  className="action-btn-primary"
                >
                  <span>✓</span> Nộp bài
                </button>
              </div>
            </>
          )}
          
          {/* PHASE 4: Result */}
          {phase === 'result' && (
            <>
              <div className="form-panel-header">
                <h4>🎯 KẾT QUẢ</h4>
              </div>
              
              <div className="form-panel-content">
                <div className={`result-summary ${score >= 3 ? 'pass' : 'fail'}`}>
                  <div className="result-icon">{score >= 3 ? '🎉' : '😢'}</div>
                  <div className="result-score">{score}/{questions.length}</div>
                  <div className="result-text">
                    {score >= 3 ? 'Xuất sắc! Bạn đã hiểu bài!' : 'Cần cố gắng thêm!'}
                  </div>
                </div>
                
                <div className="answers-review">
                  <h5>📋 Đáp án chi tiết:</h5>
                  {questions.map((q, idx) => {
                    const isCorrect = answers[q.id] === q.correct
                    const userAnswer = q.options.find(o => o.id === answers[q.id])
                    const correctAnswer = q.options.find(o => o.id === q.correct)
                    
                    return (
                      <div key={q.id} className={`answer-item ${isCorrect ? 'correct' : 'incorrect'}`}>
                        <div className="answer-header">
                          <span>Câu {idx + 1}:</span>
                          <span className="answer-status">{isCorrect ? '✓' : '✗'}</span>
                        </div>
                        <p className="answer-question">{q.question}</p>
                        {!isCorrect && (
                          <p className="your-answer">Bạn chọn: {userAnswer?.text}</p>
                        )}
                        <p className="correct-answer">Đáp án đúng: {correctAnswer?.text}</p>
                      </div>
                    )
                  })}
                </div>
              </div>
              
              <div className="form-panel-actions">
                <button onClick={handleReset} className="action-btn-secondary full-width">
                  <span>🔄</span> Làm lại toàn bộ thí nghiệm
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  )
}

/**
 * Experiment 3: Preparing Sugar Solution 10% - Enhanced with 4-phase flow
 */
function Experiment3_PreparingSolution({ onComplete, isLocked }) {
  const [phase, setPhase] = useState('experiment')
  const [sugarAdded, setSugarAdded] = useState(0)
  const [waterAdded, setWaterAdded] = useState(0)
  const [isStirring, setIsStirring] = useState(false)
  const [hasStirred, setHasStirred] = useState(false)
  const [isCompleted, setIsCompleted] = useState(false)
  const [answers, setAnswers] = useState({})
  const [score, setScore] = useState(0)
  
  const targetSugar = 10
  const targetWater = 90
  const totalMass = sugarAdded + waterAdded
  const percentage = totalMass > 0 ? ((sugarAdded / totalMass) * 100).toFixed(1) : 0
  const isCorrectConcentration = Math.abs(percentage - 10) < 0.5 && totalMass >= 100
  
  const questions = [
    {
      id: 'q1',
      question: 'Công thức tính nồng độ phần trăm (C%) là gì?',
      options: [
        { id: 'a', text: 'C% = (m chất tan / m dung môi) × 100%' },
        { id: 'b', text: 'C% = (m chất tan / m dung dịch) × 100%' },
        { id: 'c', text: 'C% = (m dung dịch / m chất tan) × 100%' },
        { id: 'd', text: 'C% = m chất tan × m dung dịch' }
      ],
      correct: 'b'
    },
    {
      id: 'q2',
      question: 'Để pha 100g dung dịch đường 10%, cần bao nhiêu gam đường?',
      options: [
        { id: 'a', text: '5g' },
        { id: 'b', text: '10g' },
        { id: 'c', text: '15g' },
        { id: 'd', text: '20g' }
      ],
      correct: 'b'
    },
    {
      id: 'q3',
      question: 'Nếu có 10g đường, cần thêm bao nhiêu nước để được dung dịch 10%?',
      options: [
        { id: 'a', text: '80g' },
        { id: 'b', text: '90g' },
        { id: 'c', text: '100g' },
        { id: 'd', text: '110g' }
      ],
      correct: 'b'
    },
    {
      id: 'q4',
      question: 'Tại sao phải khuấy đều khi pha dung dịch?',
      options: [
        { id: 'a', text: 'Để nước nóng lên' },
        { id: 'b', text: 'Để chất tan phân bố đều trong dung môi' },
        { id: 'c', text: 'Để bay hơi nước' },
        { id: 'd', text: 'Để dung dịch có màu' }
      ],
      correct: 'b'
    }
  ]
  
  const phases = [
    { id: 'experiment', label: 'Pha chế', icon: '⚗️' },
    { id: 'observe', label: 'Quan sát', icon: '👁️' },
    { id: 'quiz', label: 'Trả lời', icon: '📝' },
    { id: 'result', label: 'Kết quả', icon: '🎯' }
  ]
  
  const canProceedToObserve = sugarAdded === targetSugar && waterAdded >= targetWater && hasStirred
  
  const handleAddSugar = () => {
    if (sugarAdded < 15) {
      setSugarAdded(prev => prev + 1)
    }
  }
  
  const handleRemoveSugar = () => {
    if (sugarAdded > 0) {
      setSugarAdded(prev => prev - 1)
    }
  }
  
  const handleAddWater = () => {
    if (waterAdded < 120) {
      setWaterAdded(prev => prev + 10)
    }
  }
  
  const handleStir = () => {
    if (sugarAdded > 0 && waterAdded > 0 && !isStirring) {
      setIsStirring(true)
      setTimeout(() => {
        setIsStirring(false)
        setHasStirred(true)
      }, 1500)
    }
  }
  
  const handleSelectAnswer = (qId, optId) => {
    setAnswers(prev => ({ ...prev, [qId]: optId }))
  }
  
  const handleSubmitQuiz = () => {
    let correctCount = 0
    questions.forEach(q => {
      if (answers[q.id] === q.correct) correctCount++
    })
    setScore(correctCount)
    setPhase('result')
    
    if (correctCount >= 3 && isCorrectConcentration && !isCompleted) {
      setIsCompleted(true)
      onComplete?.()
    }
  }
  
  const handleReset = () => {
    setPhase('experiment')
    setSugarAdded(0)
    setWaterAdded(0)
    setHasStirred(false)
    setAnswers({})
    setScore(0)
  }
  
  if (isLocked) {
    return (
      <section className="card locked">
        <LockedOverlay stageNumber={3} requiredStage={2} />
        <div className="quiz-head">
          <div>
            <p className="eyebrow">Màn 3 — Thí nghiệm</p>
            <h3>⚖️ Pha Dung Dịch Đường 10%</h3>
          </div>
        </div>
      </section>
    )
  }
  
  return (
    <section className="card experiment-card">
      {/* Phase Indicator */}
      <div className="phase-indicator">
        {phases.map((p, idx) => (
          <React.Fragment key={p.id}>
            <div className={`phase-step ${phase === p.id ? 'active' : ''} ${
              phases.findIndex(x => x.id === phase) > idx ? 'completed' : ''
            }`}>
              <span className="step-num">{idx + 1}</span>
              <span className="step-label">{p.icon} {p.label}</span>
            </div>
            {idx < phases.length - 1 && (
              <div className={`phase-connector ${phases.findIndex(x => x.id === phase) > idx ? 'completed' : ''}`} />
            )}
          </React.Fragment>
        ))}
      </div>
      
      <div className="experiment-layout-two-col">
        {/* Left - Lab Visualization */}
        <div className="experiment-visual-panel realistic-lab">
          <div className="visual-panel-header">
            <h4>⚗️ PHÒNG PHA CHẾ</h4>
            <span className="lab-badge">Dung dịch đường 10%</span>
          </div>
          
          <div className="visual-panel-content lab-workspace">
            {/* Beaker visualization */}
            <div className="beaker-3d">
              <div className="beaker-glass">
                <div className="glass-reflection-left"></div>
                <div className="glass-reflection-right"></div>
                
                {/* Water level */}
                <div 
                  className={`beaker-water ${isStirring ? 'stirring' : ''}`}
                  style={{ 
                    height: `${Math.min((waterAdded / 120) * 75, 75)}%`,
                    background: waterAdded > 0 
                      ? `linear-gradient(180deg, 
                          rgba(200, 230, 255, 0.7) 0%,
                          rgba(180, 210, 250, ${0.5 + (sugarAdded/20) * 0.3}) 100%)`
                      : 'transparent'
                  }}
                >
                  {waterAdded > 0 && <div className="water-surface"></div>}
                  {isStirring && <div className="stir-vortex">🌀</div>}
                </div>
                
                {/* Sugar at bottom (before water) */}
                {sugarAdded > 0 && waterAdded === 0 && (
                  <div className="sugar-pile" style={{ height: `${Math.min(sugarAdded * 2, 20)}%` }}>
                    {[...Array(Math.min(sugarAdded, 8))].map((_, i) => (
                      <div key={i} className="sugar-crystal" style={{
                        left: `${10 + (i * 10) % 80}%`,
                        bottom: `${Math.random() * 50}%`
                      }}></div>
                    ))}
                  </div>
                )}
                
                {/* Measurement marks */}
                <div className="beaker-marks">
                  {[100, 75, 50, 25].map(mark => (
                    <div key={mark} className="mark" style={{ bottom: `${(mark / 120) * 75}%` }}>
                      <span>{mark}g</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="beaker-base"></div>
            </div>
          </div>
          
          <div className="lab-info-bar">
            <div className="info-item">
              <span className="info-icon">🍬</span>
              <span className="info-label">Đường:</span>
              <span className="info-value">{sugarAdded}g</span>
            </div>
            <div className="info-item">
              <span className="info-icon">💧</span>
              <span className="info-label">Nước:</span>
              <span className="info-value">{waterAdded}g</span>
            </div>
            <div className="info-item">
              <span className="info-icon">📊</span>
              <span className="info-label">C%:</span>
              <span className="info-value" style={{ color: isCorrectConcentration ? '#22c55e' : '#f59e0b' }}>
                {percentage}%
              </span>
            </div>
          </div>
        </div>
        
        {/* Right - Control Panel */}
        <div className="experiment-form-panel control-panel">
          {/* PHASE 1: Experiment */}
          {phase === 'experiment' && (
            <>
              <div className="form-panel-header">
                <h4>⚗️ PHA DUNG DỊCH</h4>
                <div className="completion-badge" style={{ 
                  background: canProceedToObserve ? '#22c55e' : '#0ea5e9' 
                }}>
                  {percentage}%
                </div>
              </div>
              
              <div className="form-panel-content">
                <div className="experiment-instructions">
                  <h5>🎯 Mục tiêu: Pha 100g dung dịch đường 10%</h5>
                  <ol>
                    <li>Cân chính xác 10g đường</li>
                    <li>Thêm 90g nước (tổng = 100g)</li>
                    <li>Khuấy đều cho đường tan</li>
                  </ol>
                </div>
                
                {/* Step 1: Add Sugar */}
                <div className="control-action">
                  <div className="action-header">
                    <span className="action-step">1</span>
                    <span className="action-title">Cân đường</span>
                    {sugarAdded === targetSugar && <span className="step-done">✓</span>}
                  </div>
                  <div className="action-controls">
                    <button onClick={handleRemoveSugar} disabled={sugarAdded === 0} className="ctrl-btn minus">−</button>
                    <span className="ctrl-value">{sugarAdded}g</span>
                    <button onClick={handleAddSugar} disabled={sugarAdded >= 15} className="ctrl-btn plus">+</button>
                  </div>
                  <p className="action-hint">Mục tiêu: 10g đường</p>
                </div>
                
                {/* Step 2: Add Water */}
                <div className="control-action">
                  <div className="action-header">
                    <span className="action-step">2</span>
                    <span className="action-title">Thêm nước</span>
                    {waterAdded >= targetWater && <span className="step-done">✓</span>}
                  </div>
                  <button 
                    onClick={handleAddWater}
                    disabled={waterAdded >= 120}
                    className="lab-btn"
                  >
                    <span className="btn-icon">💧</span>
                    <span className="btn-text">Thêm nước (+10g)</span>
                  </button>
                  <p className="action-hint">Đã thêm: {waterAdded}g (mục tiêu: 90g)</p>
                </div>
                
                {/* Step 3: Stir */}
                <div className="control-action">
                  <div className="action-header">
                    <span className="action-step">3</span>
                    <span className="action-title">Khuấy đều</span>
                    {hasStirred && <span className="step-done">✓</span>}
                  </div>
                  <button 
                    onClick={handleStir}
                    disabled={sugarAdded === 0 || waterAdded === 0 || isStirring}
                    className={`lab-btn lab-btn-green ${isStirring ? 'stirring' : ''}`}
                  >
                    <span className="btn-icon">{isStirring ? '🌀' : '🥄'}</span>
                    <span className="btn-text">{isStirring ? 'Đang khuấy...' : hasStirred ? 'Đã khuấy' : 'Khuấy đều'}</span>
                  </button>
                </div>
                
                {/* Real-time observation */}
                <div className="realtime-observation">
                  <p>
                    {totalMass === 0 && '⚪ Sẵn sàng pha dung dịch...'}
                    {sugarAdded > 0 && waterAdded === 0 && '🍬 Đường đã được cân, thêm nước để hòa tan.'}
                    {waterAdded > 0 && !hasStirred && '💧 Đã thêm nước, khuấy đều để đường tan hoàn toàn.'}
                    {hasStirred && isCorrectConcentration && '✅ Dung dịch đường 10% đã pha xong!'}
                    {hasStirred && !isCorrectConcentration && `⚠️ Nồng độ ${percentage}% chưa đạt 10%. Điều chỉnh lại!`}
                  </p>
                </div>
              </div>
              
              <div className="form-panel-actions">
                <button onClick={handleReset} className="action-btn-secondary">
                  <span>🔄</span> Làm lại
                </button>
                <button 
                  onClick={() => setPhase('observe')}
                  disabled={!canProceedToObserve}
                  className="action-btn-primary"
                >
                  <span>👁️</span> Quan sát kết quả
                </button>
              </div>
            </>
          )}
          
          {/* PHASE 2: Observe */}
          {phase === 'observe' && (
            <>
              <div className="form-panel-header">
                <h4>👁️ QUAN SÁT KẾT QUẢ</h4>
              </div>
              
              <div className="form-panel-content">
                <div className="observation-cards">
                  <div className="obs-card">
                    <div className="obs-card-icon">📊</div>
                    <div className="obs-card-content">
                      <strong>Thông số pha chế:</strong>
                      <p>Đường: {sugarAdded}g + Nước: {waterAdded}g = {totalMass}g dung dịch</p>
                    </div>
                  </div>
                  
                  <div className="obs-card">
                    <div className="obs-card-icon">🧮</div>
                    <div className="obs-card-content">
                      <strong>Tính nồng độ:</strong>
                      <p>C% = (m<sub>ct</sub> / m<sub>dd</sub>) × 100 = ({sugarAdded}/{totalMass}) × 100 = {percentage}%</p>
                    </div>
                  </div>
                  
                  <div className="obs-card">
                    <div className="obs-card-icon">✅</div>
                    <div className="obs-card-content">
                      <strong>Kết luận:</strong>
                      <p>Dung dịch đường {percentage}% trong suốt, không màu, có vị ngọt.</p>
                    </div>
                  </div>
                </div>
                
                <div className="science-note">
                  <div className="note-icon">📚</div>
                  <div className="note-content">
                    <strong>Công thức nồng độ %:</strong><br/>
                    C% = (m<sub>chất tan</sub> / m<sub>dung dịch</sub>) × 100%<br/>
                    Trong đó: m<sub>dung dịch</sub> = m<sub>chất tan</sub> + m<sub>dung môi</sub>
                  </div>
                </div>
              </div>
              
              <div className="form-panel-actions">
                <button onClick={() => setPhase('experiment')} className="action-btn-secondary">
                  <span>⬅️</span> Quay lại
                </button>
                <button onClick={() => setPhase('quiz')} className="action-btn-primary">
                  <span>📝</span> Trả lời câu hỏi
                </button>
              </div>
            </>
          )}
          
          {/* PHASE 3: Quiz */}
          {phase === 'quiz' && (
            <>
              <div className="form-panel-header">
                <h4>📝 TRẢ LỜI CÂU HỎI</h4>
                <div className="completion-badge" style={{ background: '#8b5cf6' }}>
                  {Object.keys(answers).length}/{questions.length}
                </div>
              </div>
              
              <div className="form-panel-content quiz-content">
                {questions.map((q, idx) => (
                  <div key={q.id} className="quiz-question">
                    <div className="question-header">
                      <span className="q-number">Câu {idx + 1}</span>
                      {answers[q.id] && <span className="q-answered">✓</span>}
                    </div>
                    <p className="q-text">{q.question}</p>
                    <div className="q-options">
                      {q.options.map(opt => (
                        <button
                          key={opt.id}
                          onClick={() => handleSelectAnswer(q.id, opt.id)}
                          className={`q-option ${answers[q.id] === opt.id ? 'selected' : ''}`}
                        >
                          <span className="opt-letter">{opt.id.toUpperCase()}</span>
                          <span className="opt-text">{opt.text}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="form-panel-actions">
                <button onClick={() => setPhase('observe')} className="action-btn-secondary">
                  <span>⬅️</span> Xem lại
                </button>
                <button 
                  onClick={handleSubmitQuiz}
                  disabled={Object.keys(answers).length < questions.length}
                  className="action-btn-primary"
                >
                  <span>✓</span> Nộp bài
                </button>
              </div>
            </>
          )}
          
          {/* PHASE 4: Result */}
          {phase === 'result' && (
            <>
              <div className="form-panel-header">
                <h4>🎯 KẾT QUẢ</h4>
              </div>
              
              <div className="form-panel-content">
                <div className={`result-summary ${score >= 3 ? 'pass' : 'fail'}`}>
                  <div className="result-icon">{score >= 3 ? '🎉' : '😢'}</div>
                  <div className="result-score">{score}/{questions.length}</div>
                  <div className="result-text">
                    {score >= 3 ? 'Xuất sắc! Bạn đã nắm vững cách pha dung dịch!' : 'Cần cố gắng thêm!'}
                  </div>
                </div>
                
                <div className="answers-review">
                  <h5>📋 Đáp án chi tiết:</h5>
                  {questions.map((q, idx) => {
                    const isCorrect = answers[q.id] === q.correct
                    const userAnswer = q.options.find(o => o.id === answers[q.id])
                    const correctAnswer = q.options.find(o => o.id === q.correct)
                    
                    return (
                      <div key={q.id} className={`answer-item ${isCorrect ? 'correct' : 'incorrect'}`}>
                        <div className="answer-header">
                          <span>Câu {idx + 1}:</span>
                          <span className="answer-status">{isCorrect ? '✓' : '✗'}</span>
                        </div>
                        <p className="answer-question">{q.question}</p>
                        {!isCorrect && (
                          <p className="your-answer">Bạn chọn: {userAnswer?.text}</p>
                        )}
                        <p className="correct-answer">Đáp án đúng: {correctAnswer?.text}</p>
                      </div>
                    )
                  })}
                </div>
              </div>
              
              <div className="form-panel-actions">
                <button onClick={handleReset} className="action-btn-secondary full-width">
                  <span>🔄</span> Làm lại toàn bộ thí nghiệm
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  )
}

/**
 * Experiment 4: Preparing Molar Solution - Enhanced with 4-phase flow
 */
function Experiment4_MolarSolution({ onComplete, isLocked }) {
  const [phase, setPhase] = useState('experiment')
  const [saltWeighed, setSaltWeighed] = useState(0)
  const [waterLevel, setWaterLevel] = useState(0)
  const [isStageCompleted, setIsStageCompleted] = useState(false)
  const [answers, setAnswers] = useState({})
  const [score, setScore] = useState(0)
  
  const targetMass = 0.584 // g for 0.1M in 100mL
  const actualMolarity = waterLevel > 0 ? ((saltWeighed / 58.44) / (waterLevel / 1000)).toFixed(3) : 0
  const isCorrectConcentration = Math.abs(actualMolarity - 0.1) < 0.02 && waterLevel >= 95
  
  const questions = [
    {
      id: 'q1',
      question: 'Công thức tính nồng độ mol (C_M) là gì?',
      options: [
        { id: 'a', text: 'C_M = n / m (mol/g)' },
        { id: 'b', text: 'C_M = n / V (mol/L)' },
        { id: 'c', text: 'C_M = m / V (g/L)' },
        { id: 'd', text: 'C_M = V / n (L/mol)' }
      ],
      correct: 'b'
    },
    {
      id: 'q2', 
      question: 'Để pha 100mL dung dịch NaCl 0.1M, cần bao nhiêu mol NaCl?',
      options: [
        { id: 'a', text: '0.001 mol' },
        { id: 'b', text: '0.01 mol' },
        { id: 'c', text: '0.1 mol' },
        { id: 'd', text: '1 mol' }
      ],
      correct: 'b'
    },
    {
      id: 'q3',
      question: 'Khối lượng mol của NaCl là 58.44 g/mol. 0.01 mol NaCl có khối lượng bao nhiêu?',
      options: [
        { id: 'a', text: '0.584g' },
        { id: 'b', text: '5.84g' },
        { id: 'c', text: '58.44g' },
        { id: 'd', text: '0.0584g' }
      ],
      correct: 'a'
    },
    {
      id: 'q4',
      question: 'Bình định mức dùng để làm gì?',
      options: [
        { id: 'a', text: 'Đo nhiệt độ dung dịch' },
        { id: 'b', text: 'Pha dung dịch với thể tích chính xác' },
        { id: 'c', text: 'Đun nóng dung dịch' },
        { id: 'd', text: 'Lọc kết tủa' }
      ],
      correct: 'b'
    }
  ]
  
  const phases = [
    { id: 'experiment', label: 'Pha chế', icon: '🧪' },
    { id: 'observe', label: 'Quan sát', icon: '👁️' },
    { id: 'quiz', label: 'Trả lời', icon: '📝' },
    { id: 'result', label: 'Kết quả', icon: '🎯' }
  ]
  
  const canProceedToObserve = Math.abs(saltWeighed - targetMass) < 0.1 && waterLevel >= 95
  
  const handleSelectAnswer = (qId, optId) => {
    setAnswers(prev => ({ ...prev, [qId]: optId }))
  }
  
  const handleSubmitQuiz = () => {
    let correctCount = 0
    questions.forEach(q => {
      if (answers[q.id] === q.correct) correctCount++
    })
    setScore(correctCount)
    setPhase('result')
    
    if (correctCount >= 3 && isCorrectConcentration && !isStageCompleted) {
      setIsStageCompleted(true)
      onComplete?.()
    }
  }
  
  const handleReset = () => {
    setPhase('experiment')
    setSaltWeighed(0)
    setWaterLevel(0)
    setAnswers({})
    setScore(0)
  }
  
  if (isLocked) {
    return (
      <section className="card locked">
        <LockedOverlay stageNumber={4} requiredStage={3} />
        <div className="quiz-head">
          <div>
            <p className="eyebrow">Màn 4 — Thí nghiệm</p>
            <h3>🧪 Pha Dung Dịch 0.1M NaCl</h3>
          </div>
        </div>
      </section>
    )
  }
  
  return (
    <section className="card experiment-card">
      {/* Phase Indicator */}
      <div className="phase-indicator">
        {phases.map((p, idx) => (
          <React.Fragment key={p.id}>
            <div className={`phase-step ${phase === p.id ? 'active' : ''} ${
              phases.findIndex(x => x.id === phase) > idx ? 'completed' : ''
            }`}>
              <span className="step-num">{idx + 1}</span>
              <span className="step-label">{p.icon} {p.label}</span>
            </div>
            {idx < phases.length - 1 && (
              <div className={`phase-connector ${phases.findIndex(x => x.id === phase) > idx ? 'completed' : ''}`} />
            )}
          </React.Fragment>
        ))}
      </div>
      
      <div className="experiment-layout-two-col">
        {/* Left - Lab Visualization */}
        <div className="experiment-visual-panel realistic-lab">
          <div className="visual-panel-header">
            <h4>🧪 BÌNH ĐỊNH MỨC</h4>
            <span className="lab-badge">100mL - Nồng độ mol</span>
          </div>
          
          <div className="visual-panel-content lab-workspace">
            {/* Volumetric flask visualization */}
            <div className="volumetric-flask">
              <div className="flask-neck"></div>
              <div className="flask-body">
                <div className="flask-mark" style={{ bottom: '80%' }}>
                  <span>100mL</span>
                </div>
                
                {/* Solution */}
                <div 
                  className="flask-solution"
                  style={{ 
                    height: `${Math.min((waterLevel / 100) * 80, 80)}%`,
                    background: `linear-gradient(180deg, 
                      rgba(180, 210, 250, 0.6) 0%,
                      rgba(200, 230, 255, ${0.4 + (saltWeighed * 0.5)}) 100%)`
                  }}
                >
                  {saltWeighed > 0 && waterLevel < 30 && (
                    <div className="salt-bottom">🧂</div>
                  )}
                </div>
              </div>
            </div>
          </div>
          
          <div className="lab-info-bar">
            <div className="info-item">
              <span className="info-icon">🧂</span>
              <span className="info-label">NaCl:</span>
              <span className="info-value">{saltWeighed.toFixed(3)}g</span>
            </div>
            <div className="info-item">
              <span className="info-icon">💧</span>
              <span className="info-label">V:</span>
              <span className="info-value">{waterLevel}mL</span>
            </div>
            <div className="info-item">
              <span className="info-icon">📊</span>
              <span className="info-label">C_M:</span>
              <span className="info-value" style={{ color: isCorrectConcentration ? '#22c55e' : '#f59e0b' }}>
                {actualMolarity}M
              </span>
            </div>
          </div>
        </div>
        
        {/* Right - Control Panel */}
        <div className="experiment-form-panel control-panel">
          {/* PHASE 1: Experiment */}
          {phase === 'experiment' && (
            <>
              <div className="form-panel-header">
                <h4>🧪 PHA DUNG DỊCH MOL</h4>
                <div className="completion-badge" style={{ 
                  background: canProceedToObserve ? '#22c55e' : '#0ea5e9' 
                }}>
                  {actualMolarity}M
                </div>
              </div>
              
              <div className="form-panel-content">
                <div className="experiment-instructions">
                  <h5>🎯 Mục tiêu: 100mL dung dịch NaCl 0.1M</h5>
                  <ol>
                    <li>Tính: n = C × V = 0.1 × 0.1 = 0.01 mol</li>
                    <li>Cân: m = n × M = 0.01 × 58.44 ≈ 0.584g NaCl</li>
                    <li>Định mức đến vạch 100mL</li>
                  </ol>
                </div>
                
                {/* Step 1: Weigh Salt */}
                <div className="control-action">
                  <div className="action-header">
                    <span className="action-step">1</span>
                    <span className="action-title">Cân NaCl</span>
                    {Math.abs(saltWeighed - targetMass) < 0.1 && <span className="step-done">✓</span>}
                  </div>
                  <div className="action-controls">
                    <button 
                      onClick={() => setSaltWeighed(prev => Math.max(prev - 0.1, 0))} 
                      disabled={saltWeighed <= 0} 
                      className="ctrl-btn minus"
                    >−0.1</button>
                    <span className="ctrl-value">{saltWeighed.toFixed(2)}g</span>
                    <button 
                      onClick={() => setSaltWeighed(prev => Math.min(prev + 0.1, 2))} 
                      disabled={saltWeighed >= 2} 
                      className="ctrl-btn plus"
                    >+0.1</button>
                  </div>
                  <p className="action-hint">Mục tiêu: ~0.584g (M = 58.44 g/mol)</p>
                </div>
                
                {/* Step 2: Add Water */}
                <div className="control-action">
                  <div className="action-header">
                    <span className="action-step">2</span>
                    <span className="action-title">Định mức nước</span>
                    {waterLevel >= 95 && <span className="step-done">✓</span>}
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    step="5"
                    value={waterLevel}
                    onChange={(e) => setWaterLevel(Number(e.target.value))}
                    className="water-slider"
                  />
                  <p className="action-hint">💧 Thể tích: {waterLevel}mL (mục tiêu: 100mL)</p>
                </div>
                
                {/* Calculation hint */}
                <div className="science-note">
                  <div className="note-icon">💡</div>
                  <div className="note-content">
                    <strong>Công thức:</strong> n = C_M × V<br/>
                    m = n × M = C_M × V × M
                  </div>
                </div>
                
                {/* Real-time observation */}
                <div className="realtime-observation">
                  <p>
                    {saltWeighed === 0 && waterLevel === 0 && '⚪ Sẵn sàng pha dung dịch...'}
                    {saltWeighed > 0 && waterLevel === 0 && '🧂 Đã cân muối, thêm nước để hòa tan.'}
                    {waterLevel > 0 && waterLevel < 95 && `💧 Thêm nước đến vạch 100mL. Hiện tại: ${waterLevel}mL`}
                    {canProceedToObserve && '✅ Dung dịch 0.1M đã pha xong!'}
                    {waterLevel >= 95 && !canProceedToObserve && `⚠️ Nồng độ ${actualMolarity}M chưa đạt 0.1M. Điều chỉnh khối lượng muối!`}
                  </p>
                </div>
              </div>
              
              <div className="form-panel-actions">
                <button onClick={handleReset} className="action-btn-secondary">
                  <span>🔄</span> Làm lại
                </button>
                <button 
                  onClick={() => setPhase('observe')}
                  disabled={!canProceedToObserve}
                  className="action-btn-primary"
                >
                  <span>👁️</span> Quan sát kết quả
                </button>
              </div>
            </>
          )}
          
          {/* PHASE 2: Observe */}
          {phase === 'observe' && (
            <>
              <div className="form-panel-header">
                <h4>👁️ QUAN SÁT KẾT QUẢ</h4>
              </div>
              
              <div className="form-panel-content">
                <div className="observation-cards">
                  <div className="obs-card">
                    <div className="obs-card-icon">🧮</div>
                    <div className="obs-card-content">
                      <strong>Tính số mol:</strong>
                      <p>n = m/M = {saltWeighed.toFixed(3)}/58.44 ≈ {(saltWeighed/58.44).toFixed(4)} mol</p>
                    </div>
                  </div>
                  
                  <div className="obs-card">
                    <div className="obs-card-icon">📊</div>
                    <div className="obs-card-content">
                      <strong>Tính nồng độ mol:</strong>
                      <p>C_M = n/V = {(saltWeighed/58.44).toFixed(4)}/{waterLevel/1000} = {actualMolarity}M</p>
                    </div>
                  </div>
                  
                  <div className="obs-card">
                    <div className="obs-card-icon">✅</div>
                    <div className="obs-card-content">
                      <strong>Kết luận:</strong>
                      <p>Dung dịch NaCl {actualMolarity}M trong suốt, không màu.</p>
                    </div>
                  </div>
                </div>
                
                <div className="science-note">
                  <div className="note-icon">📚</div>
                  <div className="note-content">
                    <strong>Nồng độ mol (C_M):</strong><br/>
                    C_M = n/V (mol/L)<br/>
                    Trong đó: n = số mol chất tan, V = thể tích dung dịch (L)
                  </div>
                </div>
              </div>
              
              <div className="form-panel-actions">
                <button onClick={() => setPhase('experiment')} className="action-btn-secondary">
                  <span>⬅️</span> Quay lại
                </button>
                <button onClick={() => setPhase('quiz')} className="action-btn-primary">
                  <span>📝</span> Trả lời câu hỏi
                </button>
              </div>
            </>
          )}
          
          {/* PHASE 3: Quiz */}
          {phase === 'quiz' && (
            <>
              <div className="form-panel-header">
                <h4>📝 TRẢ LỜI CÂU HỎI</h4>
                <div className="completion-badge" style={{ background: '#8b5cf6' }}>
                  {Object.keys(answers).length}/{questions.length}
                </div>
              </div>
              
              <div className="form-panel-content quiz-content">
                {questions.map((q, idx) => (
                  <div key={q.id} className="quiz-question">
                    <div className="question-header">
                      <span className="q-number">Câu {idx + 1}</span>
                      {answers[q.id] && <span className="q-answered">✓</span>}
                    </div>
                    <p className="q-text">{q.question}</p>
                    <div className="q-options">
                      {q.options.map(opt => (
                        <button
                          key={opt.id}
                          onClick={() => handleSelectAnswer(q.id, opt.id)}
                          className={`q-option ${answers[q.id] === opt.id ? 'selected' : ''}`}
                        >
                          <span className="opt-letter">{opt.id.toUpperCase()}</span>
                          <span className="opt-text">{opt.text}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="form-panel-actions">
                <button onClick={() => setPhase('observe')} className="action-btn-secondary">
                  <span>⬅️</span> Xem lại
                </button>
                <button 
                  onClick={handleSubmitQuiz}
                  disabled={Object.keys(answers).length < questions.length}
                  className="action-btn-primary"
                >
                  <span>✓</span> Nộp bài
                </button>
              </div>
            </>
          )}
          
          {/* PHASE 4: Result */}
          {phase === 'result' && (
            <>
              <div className="form-panel-header">
                <h4>🎯 KẾT QUẢ</h4>
              </div>
              
              <div className="form-panel-content">
                <div className={`result-summary ${score >= 3 ? 'pass' : 'fail'}`}>
                  <div className="result-icon">{score >= 3 ? '🎉' : '😢'}</div>
                  <div className="result-score">{score}/{questions.length}</div>
                  <div className="result-text">
                    {score >= 3 ? 'Xuất sắc! Bạn đã hiểu nồng độ mol!' : 'Cần cố gắng thêm!'}
                  </div>
                </div>
                
                <div className="answers-review">
                  <h5>📋 Đáp án chi tiết:</h5>
                  {questions.map((q, idx) => {
                    const isCorrect = answers[q.id] === q.correct
                    const userAnswer = q.options.find(o => o.id === answers[q.id])
                    const correctAnswer = q.options.find(o => o.id === q.correct)
                    
                    return (
                      <div key={q.id} className={`answer-item ${isCorrect ? 'correct' : 'incorrect'}`}>
                        <div className="answer-header">
                          <span>Câu {idx + 1}:</span>
                          <span className="answer-status">{isCorrect ? '✓' : '✗'}</span>
                        </div>
                        <p className="answer-question">{q.question}</p>
                        {!isCorrect && (
                          <p className="your-answer">Bạn chọn: {userAnswer?.text}</p>
                        )}
                        <p className="correct-answer">Đáp án đúng: {correctAnswer?.text}</p>
                      </div>
                    )
                  })}
                </div>
              </div>
              
              <div className="form-panel-actions">
                <button onClick={handleReset} className="action-btn-secondary full-width">
                  <span>🔄</span> Làm lại toàn bộ thí nghiệm
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  )
}

/**
 * Experiment 5: Dilution Practice - Enhanced with 4-phase flow
 */
function Experiment5_DilutionPractice({ onComplete, isLocked }) {
  const [phase, setPhase] = useState('experiment')
  const [stockVolume, setStockVolume] = useState(0)
  const [waterAdded, setWaterAdded] = useState(0)
  const [isPipetting, setIsPipetting] = useState(false)
  const [isStageCompleted, setIsStageCompleted] = useState(false)
  const [answers, setAnswers] = useState({})
  const [score, setScore] = useState(0)
  
  const stockConc = 1.0 // M
  const targetConc = 0.1 // M
  const requiredStockVolume = 10 // mL (C1V1 = C2V2)
  
  const totalVolume = stockVolume + waterAdded
  const actualConc = totalVolume > 0 ? ((stockConc * stockVolume) / totalVolume).toFixed(3) : 0
  const isCorrectConcentration = Math.abs(actualConc - targetConc) < 0.02 && totalVolume >= 95
  
  const questions = [
    {
      id: 'q1',
      question: 'Công thức pha loãng dung dịch là gì?',
      options: [
        { id: 'a', text: 'C₁ + V₁ = C₂ + V₂' },
        { id: 'b', text: 'C₁ × V₁ = C₂ × V₂' },
        { id: 'c', text: 'C₁ / V₁ = C₂ / V₂' },
        { id: 'd', text: 'C₁ - V₁ = C₂ - V₂' }
      ],
      correct: 'b'
    },
    {
      id: 'q2', 
      question: 'Pha loãng 1.0M thành 0.1M (100mL), cần lấy bao nhiêu mL dung dịch gốc?',
      options: [
        { id: 'a', text: '5mL' },
        { id: 'b', text: '10mL' },
        { id: 'c', text: '20mL' },
        { id: 'd', text: '50mL' }
      ],
      correct: 'b'
    },
    {
      id: 'q3',
      question: 'Khi pha loãng, số mol chất tan thay đổi như thế nào?',
      options: [
        { id: 'a', text: 'Tăng lên' },
        { id: 'b', text: 'Giảm đi' },
        { id: 'c', text: 'Không đổi' },
        { id: 'd', text: 'Bằng 0' }
      ],
      correct: 'c'
    },
    {
      id: 'q4',
      question: 'Pha loãng dung dịch 2M thành 0.5M (200mL), V₁ = ?',
      options: [
        { id: 'a', text: '25mL' },
        { id: 'b', text: '50mL' },
        { id: 'c', text: '100mL' },
        { id: 'd', text: '150mL' }
      ],
      correct: 'b'
    }
  ]
  
  const phases = [
    { id: 'experiment', label: 'Pha loãng', icon: '💧' },
    { id: 'observe', label: 'Quan sát', icon: '👁️' },
    { id: 'quiz', label: 'Trả lời', icon: '📝' },
    { id: 'result', label: 'Kết quả', icon: '🎯' }
  ]
  
  const canProceedToObserve = Math.abs(stockVolume - requiredStockVolume) <= 2 && totalVolume >= 95
  
  const handlePipette = () => {
    if (!isPipetting && stockVolume < 20) {
      setIsPipetting(true)
      setTimeout(() => {
        setStockVolume(prev => prev + 1)
        setIsPipetting(false)
      }, 500)
    }
  }
  
  const handleSelectAnswer = (qId, optId) => {
    setAnswers(prev => ({ ...prev, [qId]: optId }))
  }
  
  const handleSubmitQuiz = () => {
    let correctCount = 0
    questions.forEach(q => {
      if (answers[q.id] === q.correct) correctCount++
    })
    setScore(correctCount)
    setPhase('result')
    
    if (correctCount >= 3 && isCorrectConcentration && !isStageCompleted) {
      setIsStageCompleted(true)
      onComplete?.()
    }
  }
  
  const handleReset = () => {
    setPhase('experiment')
    setStockVolume(0)
    setWaterAdded(0)
    setAnswers({})
    setScore(0)
  }
  
  if (isLocked) {
    return (
      <section className="card locked">
        <LockedOverlay stageNumber={5} requiredStage={4} />
        <div className="quiz-head">
          <div>
            <p className="eyebrow">Màn 5 — Thí nghiệm</p>
            <h3>💧 Pha Loãng từ 1.0M → 0.1M</h3>
          </div>
        </div>
      </section>
    )
  }
  
  return (
    <section className="card experiment-card">
      {/* Phase Indicator */}
      <div className="phase-indicator">
        {phases.map((p, idx) => (
          <React.Fragment key={p.id}>
            <div className={`phase-step ${phase === p.id ? 'active' : ''} ${
              phases.findIndex(x => x.id === phase) > idx ? 'completed' : ''
            }`}>
              <span className="step-num">{idx + 1}</span>
              <span className="step-label">{p.icon} {p.label}</span>
            </div>
            {idx < phases.length - 1 && (
              <div className={`phase-connector ${phases.findIndex(x => x.id === phase) > idx ? 'completed' : ''}`} />
            )}
          </React.Fragment>
        ))}
      </div>
      
      <div className="experiment-layout-two-col">
        {/* Left - Lab Visualization */}
        <div className="experiment-visual-panel realistic-lab">
          <div className="visual-panel-header">
            <h4>💧 PHA LOÃNG DUNG DỊCH</h4>
            <span className="lab-badge">1.0M → 0.1M</span>
          </div>
          
          <div className="visual-panel-content lab-workspace">
            <div className="dilution-setup">
              {/* Stock solution bottle */}
              <div className="stock-bottle">
                <div className="bottle-label">1.0M</div>
                <div className="bottle-body">
                  <div 
                    className="bottle-liquid"
                    style={{ height: `${Math.max(70 - stockVolume * 3, 10)}%` }}
                  ></div>
                </div>
                {isPipetting && <div className="pipette-anim">💉</div>}
              </div>
              
              {/* Arrow */}
              <div className="dilution-arrow">→</div>
              
              {/* Target flask */}
              <div className="target-flask">
                <div className="flask-label">Bình định mức</div>
                <div className="flask-body-dilution">
                  <div className="flask-mark-100">100mL</div>
                  <div 
                    className="flask-liquid"
                    style={{ 
                      height: `${Math.min((totalVolume / 100) * 80, 80)}%`,
                      background: `rgba(59, 130, 246, ${stockVolume / (totalVolume || 1)})`
                    }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="lab-info-bar">
            <div className="info-item">
              <span className="info-icon">🧪</span>
              <span className="info-label">DD gốc:</span>
              <span className="info-value">{stockVolume}mL</span>
            </div>
            <div className="info-item">
              <span className="info-icon">💧</span>
              <span className="info-label">Nước:</span>
              <span className="info-value">{waterAdded}mL</span>
            </div>
            <div className="info-item">
              <span className="info-icon">📊</span>
              <span className="info-label">C:</span>
              <span className="info-value" style={{ color: isCorrectConcentration ? '#22c55e' : '#f59e0b' }}>
                {actualConc}M
              </span>
            </div>
          </div>
        </div>
        
        {/* Right - Control Panel */}
        <div className="experiment-form-panel control-panel">
          {/* PHASE 1: Experiment */}
          {phase === 'experiment' && (
            <>
              <div className="form-panel-header">
                <h4>💧 PHA LOÃNG</h4>
                <div className="completion-badge" style={{ 
                  background: canProceedToObserve ? '#22c55e' : '#0ea5e9' 
                }}>
                  {actualConc}M
                </div>
              </div>
              
              <div className="form-panel-content">
                <div className="experiment-instructions">
                  <h5>🎯 Mục tiêu: 100mL dung dịch 0.1M từ 1.0M</h5>
                  <ol>
                    <li>Tính: V₁ = C₂×V₂/C₁ = 0.1×100/1.0 = 10mL</li>
                    <li>Pipet 10mL dung dịch gốc 1.0M</li>
                    <li>Thêm nước đến vạch 100mL</li>
                  </ol>
                </div>
                
                {/* Step 1: Pipette stock */}
                <div className="control-action">
                  <div className="action-header">
                    <span className="action-step">1</span>
                    <span className="action-title">Lấy dung dịch gốc</span>
                    {Math.abs(stockVolume - requiredStockVolume) <= 2 && <span className="step-done">✓</span>}
                  </div>
                  <div className="action-controls">
                    <button 
                      onClick={() => setStockVolume(prev => Math.max(prev - 1, 0))} 
                      disabled={stockVolume <= 0} 
                      className="ctrl-btn minus"
                    >−</button>
                    <span className="ctrl-value">{stockVolume}mL</span>
                    <button 
                      onClick={handlePipette}
                      disabled={isPipetting || stockVolume >= 20} 
                      className="ctrl-btn plus"
                    >{isPipetting ? '...' : '+'}</button>
                  </div>
                  <p className="action-hint">Mục tiêu: 10mL (từ dd 1.0M)</p>
                </div>
                
                {/* Step 2: Add Water */}
                <div className="control-action">
                  <div className="action-header">
                    <span className="action-step">2</span>
                    <span className="action-title">Thêm nước cất</span>
                    {totalVolume >= 95 && <span className="step-done">✓</span>}
                  </div>
                  <button 
                    onClick={() => setWaterAdded(prev => Math.min(prev + 10, 120))}
                    disabled={waterAdded >= 120}
                    className="lab-btn"
                  >
                    <span className="btn-icon">💧</span>
                    <span className="btn-text">Thêm nước (+10mL)</span>
                  </button>
                  <p className="action-hint">Tổng: {totalVolume}mL (mục tiêu: 100mL)</p>
                </div>
                
                {/* Formula hint */}
                <div className="science-note">
                  <div className="note-icon">💡</div>
                  <div className="note-content">
                    <strong>Công thức:</strong> C₁V₁ = C₂V₂<br/>
                    1.0 × V₁ = 0.1 × 100 → V₁ = 10mL
                  </div>
                </div>
                
                {/* Real-time observation */}
                <div className="realtime-observation">
                  <p>
                    {stockVolume === 0 && '⚪ Sẵn sàng pha loãng...'}
                    {stockVolume > 0 && totalVolume < 95 && `🧪 Đã lấy ${stockVolume}mL dd gốc. Thêm nước!`}
                    {canProceedToObserve && '✅ Dung dịch 0.1M đã pha xong!'}
                    {totalVolume >= 95 && !canProceedToObserve && `⚠️ Nồng độ ${actualConc}M chưa đạt 0.1M.`}
                  </p>
                </div>
              </div>
              
              <div className="form-panel-actions">
                <button onClick={handleReset} className="action-btn-secondary">
                  <span>🔄</span> Làm lại
                </button>
                <button 
                  onClick={() => setPhase('observe')}
                  disabled={!canProceedToObserve}
                  className="action-btn-primary"
                >
                  <span>👁️</span> Quan sát kết quả
                </button>
              </div>
            </>
          )}
          
          {/* PHASE 2: Observe */}
          {phase === 'observe' && (
            <>
              <div className="form-panel-header">
                <h4>👁️ QUAN SÁT KẾT QUẢ</h4>
              </div>
              
              <div className="form-panel-content">
                <div className="observation-cards">
                  <div className="obs-card">
                    <div className="obs-card-icon">📐</div>
                    <div className="obs-card-content">
                      <strong>Áp dụng công thức:</strong>
                      <p>C₁V₁ = C₂V₂ → 1.0 × {stockVolume} = C₂ × {totalVolume}</p>
                    </div>
                  </div>
                  
                  <div className="obs-card">
                    <div className="obs-card-icon">🧮</div>
                    <div className="obs-card-content">
                      <strong>Tính nồng độ:</strong>
                      <p>C₂ = (1.0 × {stockVolume}) / {totalVolume} = {actualConc}M</p>
                    </div>
                  </div>
                  
                  <div className="obs-card">
                    <div className="obs-card-icon">✅</div>
                    <div className="obs-card-content">
                      <strong>Kết luận:</strong>
                      <p>Số mol không đổi: n = C₁V₁ = {(stockConc * stockVolume / 1000).toFixed(4)} mol</p>
                    </div>
                  </div>
                </div>
                
                <div className="science-note">
                  <div className="note-icon">📚</div>
                  <div className="note-content">
                    <strong>Nguyên tắc pha loãng:</strong><br/>
                    Khi pha loãng, số mol chất tan không đổi.<br/>
                    n₁ = n₂ → C₁V₁ = C₂V₂
                  </div>
                </div>
              </div>
              
              <div className="form-panel-actions">
                <button onClick={() => setPhase('experiment')} className="action-btn-secondary">
                  <span>⬅️</span> Quay lại
                </button>
                <button onClick={() => setPhase('quiz')} className="action-btn-primary">
                  <span>📝</span> Trả lời câu hỏi
                </button>
              </div>
            </>
          )}
          
          {/* PHASE 3: Quiz */}
          {phase === 'quiz' && (
            <>
              <div className="form-panel-header">
                <h4>📝 TRẢ LỜI CÂU HỎI</h4>
                <div className="completion-badge" style={{ background: '#8b5cf6' }}>
                  {Object.keys(answers).length}/{questions.length}
                </div>
              </div>
              
              <div className="form-panel-content quiz-content">
                {questions.map((q, idx) => (
                  <div key={q.id} className="quiz-question">
                    <div className="question-header">
                      <span className="q-number">Câu {idx + 1}</span>
                      {answers[q.id] && <span className="q-answered">✓</span>}
                    </div>
                    <p className="q-text">{q.question}</p>
                    <div className="q-options">
                      {q.options.map(opt => (
                        <button
                          key={opt.id}
                          onClick={() => handleSelectAnswer(q.id, opt.id)}
                          className={`q-option ${answers[q.id] === opt.id ? 'selected' : ''}`}
                        >
                          <span className="opt-letter">{opt.id.toUpperCase()}</span>
                          <span className="opt-text">{opt.text}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="form-panel-actions">
                <button onClick={() => setPhase('observe')} className="action-btn-secondary">
                  <span>⬅️</span> Xem lại
                </button>
                <button 
                  onClick={handleSubmitQuiz}
                  disabled={Object.keys(answers).length < questions.length}
                  className="action-btn-primary"
                >
                  <span>✓</span> Nộp bài
                </button>
              </div>
            </>
          )}
          
          {/* PHASE 4: Result */}
          {phase === 'result' && (
            <>
              <div className="form-panel-header">
                <h4>🎯 KẾT QUẢ</h4>
              </div>
              
              <div className="form-panel-content">
                <div className={`result-summary ${score >= 3 ? 'pass' : 'fail'}`}>
                  <div className="result-icon">{score >= 3 ? '🎉' : '😢'}</div>
                  <div className="result-score">{score}/{questions.length}</div>
                  <div className="result-text">
                    {score >= 3 ? 'Xuất sắc! Bạn đã hiểu cách pha loãng!' : 'Cần cố gắng thêm!'}
                  </div>
                </div>
                
                <div className="answers-review">
                  <h5>📋 Đáp án chi tiết:</h5>
                  {questions.map((q, idx) => {
                    const isCorrect = answers[q.id] === q.correct
                    const userAnswer = q.options.find(o => o.id === answers[q.id])
                    const correctAnswer = q.options.find(o => o.id === q.correct)
                    
                    return (
                      <div key={q.id} className={`answer-item ${isCorrect ? 'correct' : 'incorrect'}`}>
                        <div className="answer-header">
                          <span>Câu {idx + 1}:</span>
                          <span className="answer-status">{isCorrect ? '✓' : '✗'}</span>
                        </div>
                        <p className="answer-question">{q.question}</p>
                        {!isCorrect && (
                          <p className="your-answer">Bạn chọn: {userAnswer?.text}</p>
                        )}
                        <p className="correct-answer">Đáp án đúng: {correctAnswer?.text}</p>
                      </div>
                    )
                  })}
                </div>
              </div>
              
              <div className="form-panel-actions">
                <button onClick={handleReset} className="action-btn-secondary full-width">
                  <span>🔄</span> Làm lại toàn bộ thí nghiệm
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  )
}

/**
 * Experiment 6: pH Testing with Indicator - Enhanced with 4-phase flow
 */
function Experiment6_pHTesting({ onComplete, isLocked }) {
  const [phase, setPhase] = useState('experiment')
  const [selectedSolution, setSelectedSolution] = useState(null)
  const [paperDipped, setPaperDipped] = useState(false)
  const [testedSolutions, setTestedSolutions] = useState([])
  const [isStageCompleted, setIsStageCompleted] = useState(false)
  const [answers, setAnswers] = useState({})
  const [score, setScore] = useState(0)
  
  const solutions = [
    { name: 'HCl 0.01M', pH: 2, type: 'Axit mạnh', color: '#ef4444', paperColor: '#fca5a5' },
    { name: 'CH₃COOH 0.1M', pH: 3, type: 'Axit yếu', color: '#f97316', paperColor: '#fdba74' },
    { name: 'H₂O tinh khiết', pH: 7, type: 'Trung hòa', color: '#22c55e', paperColor: '#86efac' },
    { name: 'NH₃ 0.1M', pH: 11, type: 'Bazơ yếu', color: '#3b82f6', paperColor: '#93c5fd' },
    { name: 'NaOH 0.01M', pH: 12, type: 'Bazơ mạnh', color: '#8b5cf6', paperColor: '#c4b5fd' }
  ]
  
  const questions = [
    {
      id: 1,
      question: 'Dung dịch có pH = 7 có tính chất gì?',
      options: ['Axit mạnh', 'Axit yếu', 'Trung hòa', 'Bazơ yếu'],
      correct: 2
    },
    {
      id: 2,
      question: 'Dung dịch HCl loãng có pH khoảng bao nhiêu?',
      options: ['pH = 1-2', 'pH = 5-6', 'pH = 7', 'pH = 11-12'],
      correct: 0
    },
    {
      id: 3,
      question: 'Giấy quỳ chuyển màu tím/xanh khi nhúng vào dung dịch nào?',
      options: ['Dung dịch axit', 'Dung dịch bazơ', 'Nước cất', 'Dung dịch muối trung hòa'],
      correct: 1
    },
    {
      id: 4,
      question: 'Dải pH từ 0-14, giá trị nào thể hiện tính bazơ mạnh nhất?',
      options: ['pH = 1', 'pH = 7', 'pH = 10', 'pH = 14'],
      correct: 3
    }
  ]
  
  const phases = [
    { id: 'experiment', label: 'Thí nghiệm', icon: '🧪' },
    { id: 'observe', label: 'Quan sát', icon: '👀' },
    { id: 'quiz', label: 'Trắc nghiệm', icon: '❓' },
    { id: 'result', label: 'Kết quả', icon: '📊' }
  ]
  
  const handleDip = () => {
    setPaperDipped(true)
    if (selectedSolution !== null && !testedSolutions.includes(selectedSolution)) {
      setTestedSolutions(prev => [...prev, selectedSolution])
    }
    setTimeout(() => setPaperDipped(false), 2000)
  }
  
  const handleAnswer = (questionId, answerIndex) => {
    setAnswers(prev => ({ ...prev, [questionId]: answerIndex }))
  }
  
  const handleSubmitQuiz = () => {
    let correctCount = 0
    questions.forEach(q => {
      if (answers[q.id] === q.correct) correctCount++
    })
    setScore(correctCount)
    setPhase('result')
  }
  
  const handleStageComplete = () => {
    if (!isStageCompleted) {
      setIsStageCompleted(true)
      onComplete?.()
    }
  }
  
  const allTested = testedSolutions.length === 5
  const allAnswered = Object.keys(answers).length === questions.length
  
  if (isLocked) {
    return (
      <section className="card locked">
        <LockedOverlay stageNumber={6} requiredStage={5} />
        <div className="quiz-head">
          <div>
            <p className="eyebrow">Màn 6 — Thí nghiệm (Màn cuối)</p>
            <h3>🧪 Đo pH bằng Giấy Quỳ</h3>
          </div>
        </div>
      </section>
    )
  }
  
  return (
    <section className="card">
      <div className="quiz-head">
        <div>
          <p className="eyebrow">Màn 6 — Thí nghiệm (Màn cuối)</p>
          <h3>🧪 Đo pH bằng Giấy Quỳ</h3>
        </div>
        <div className="score-box" style={{ background: isStageCompleted ? '#22c55e' : '#0ea5e9' }}>
          {isStageCompleted ? '🏆 Hoàn thành' : `${testedSolutions.length}/5 mẫu`}
        </div>
      </div>
      
      {/* Phase Indicator */}
      <div className="phase-indicator">
        {phases.map((p, idx) => (
          <div 
            key={p.id} 
            className={`phase-step ${phase === p.id ? 'active' : ''} ${phases.findIndex(x => x.id === phase) > idx ? 'completed' : ''}`}
          >
            <div className="phase-icon">{p.icon}</div>
            <div className="phase-label">{p.label}</div>
          </div>
        ))}
      </div>
      
      {/* Phase: Experiment */}
      {phase === 'experiment' && (
        <div className="experiment-content">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '1.5rem', marginTop: '1rem' }}>
            {/* Testing area */}
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '0.85rem', fontWeight: 600, marginBottom: '1rem' }}>
                Nhúng giấy quỳ vào dung dịch
              </div>
              
              {selectedSolution !== null ? (
                <div style={{ position: 'relative' }}>
                  {/* Beaker */}
                  <div style={{
                    width: '120px',
                    height: '160px',
                    margin: '0 auto',
                    background: 'linear-gradient(to bottom, transparent 20%, #e0f2fe 20%)',
                    border: '3px solid #0284c7',
                    borderRadius: '0 0 20px 20px',
                    position: 'relative',
                    overflow: 'hidden'
                  }}>
                    <div style={{
                      position: 'absolute',
                      bottom: 0,
                      left: 0,
                      right: 0,
                      height: '80%',
                      background: solutions[selectedSolution].color,
                      opacity: 0.3
                    }} />
                    
                    {/* pH paper */}
                    {paperDipped && (
                      <div style={{
                        position: 'absolute',
                        top: '15%',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        width: '30px',
                        height: '100px',
                        background: solutions[selectedSolution].paperColor,
                        borderRadius: '3px',
                        border: '1px solid #64748b',
                        animation: 'dipPaper 2s ease-in-out'
                      }} />
                    )}
                  </div>
                  
                  <button
                    onClick={handleDip}
                    disabled={paperDipped}
                    className={`action-btn ${paperDipped ? 'disabled' : 'primary'}`}
                    style={{ marginTop: '1rem', width: '100%' }}
                  >
                    📄 Nhúng giấy quỳ
                  </button>
                  
                  {paperDipped && (
                    <div style={{
                      marginTop: '1rem',
                      padding: '0.75rem',
                      background: '#f0fdf4',
                      borderRadius: '8px',
                      fontSize: '0.85rem'
                    }}>
                      <div style={{ fontWeight: 700, fontSize: '1.2rem', marginBottom: '0.3rem' }}>
                        pH = {solutions[selectedSolution].pH}
                      </div>
                      <div>{solutions[selectedSolution].type}</div>
                    </div>
                  )}
                </div>
              ) : (
                <div style={{
                  padding: '2rem',
                  background: '#f8fafc',
                  borderRadius: '8px',
                  border: '2px dashed #cbd5e1',
                  color: '#64748b'
                }}>
                  Chọn dung dịch để kiểm tra →
                </div>
              )}
            </div>
            
            {/* Solution selection */}
            <div>
              <div style={{ fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.75rem' }}>
                Chọn dung dịch cần kiểm tra:
              </div>
              <div style={{ display: 'grid', gap: '0.75rem' }}>
                {solutions.map((sol, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setSelectedSolution(idx)
                      setPaperDipped(false)
                    }}
                    style={{
                      padding: '0.75rem 1rem',
                      border: selectedSolution === idx ? `3px solid ${sol.color}` : '2px solid #e5e7eb',
                      borderRadius: '8px',
                      cursor: 'pointer',
                      background: testedSolutions.includes(idx) ? '#f0fdf4' : selectedSolution === idx ? '#f0f9ff' : '#fff',
                      textAlign: 'left',
                      transition: 'all 0.2s ease',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.75rem'
                    }}
                  >
                    <div style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: '50%',
                      background: sol.color,
                      opacity: testedSolutions.includes(idx) ? 1 : 0.3,
                      flexShrink: 0,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'white',
                      fontWeight: 700
                    }}>
                      {testedSolutions.includes(idx) ? '✓' : ''}
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: 600, fontSize: '0.9rem' }}>{sol.name}</div>
                      <div style={{ fontSize: '0.75rem', color: '#64748b' }}>{sol.type}</div>
                    </div>
                  </button>
                ))}
              </div>
              
              {/* pH scale reference */}
              <div style={{
                marginTop: '1rem',
                padding: '0.75rem',
                background: '#fffbeb',
                borderRadius: '8px',
                fontSize: '0.8rem'
              }}>
                <strong>🌈 Bảng màu giấy quỳ:</strong>
                <div style={{ display: 'flex', gap: '2px', marginTop: '0.5rem', height: '30px', borderRadius: '4px', overflow: 'hidden' }}>
                  <div style={{ flex: 1, background: '#fca5a5' }} title="pH 1-3" />
                  <div style={{ flex: 1, background: '#fdba74' }} title="pH 4-6" />
                  <div style={{ flex: 1, background: '#86efac' }} title="pH 7" />
                  <div style={{ flex: 1, background: '#93c5fd' }} title="pH 8-11" />
                  <div style={{ flex: 1, background: '#c4b5fd' }} title="pH 12-14" />
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.7rem', marginTop: '0.3rem', color: '#64748b' }}>
                  <span>Axit mạnh</span>
                  <span>Trung hòa</span>
                  <span>Bazơ mạnh</span>
                </div>
              </div>
              
              {allTested && (
                <button
                  onClick={() => setPhase('observe')}
                  className="action-btn success"
                  style={{ marginTop: '1rem', width: '100%' }}
                >
                  ✓ Tiếp tục quan sát kết quả
                </button>
              )}
            </div>
          </div>
        </div>
      )}
      
      {/* Phase: Observe */}
      {phase === 'observe' && (
        <div className="observe-content">
          <h4 style={{ marginBottom: '1rem', color: '#0f766e' }}>👀 Kết quả đo pH các dung dịch</h4>
          
          <div className="observation-cards" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1rem' }}>
            {solutions.map((sol, idx) => (
              <div 
                key={idx}
                className="observation-card"
                style={{
                  padding: '1rem',
                  background: 'white',
                  borderRadius: '12px',
                  border: `2px solid ${sol.color}`,
                  textAlign: 'center'
                }}
              >
                <div style={{ 
                  width: '50px', 
                  height: '50px', 
                  margin: '0 auto 0.5rem',
                  borderRadius: '8px',
                  background: sol.paperColor,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 700,
                  fontSize: '1.2rem'
                }}>
                  {sol.pH}
                </div>
                <div style={{ fontWeight: 600, fontSize: '0.9rem' }}>{sol.name}</div>
                <div style={{ 
                  fontSize: '0.8rem', 
                  color: sol.pH < 7 ? '#dc2626' : sol.pH > 7 ? '#2563eb' : '#16a34a',
                  fontWeight: 500
                }}>
                  {sol.type}
                </div>
              </div>
            ))}
          </div>
          
          <div style={{
            marginTop: '1.5rem',
            padding: '1rem',
            background: '#f0fdfa',
            borderRadius: '12px',
            border: '1px solid #5eead4'
          }}>
            <h5 style={{ marginBottom: '0.75rem', color: '#0f766e' }}>📝 Tóm tắt kiến thức về pH</h5>
            <ul style={{ margin: 0, paddingLeft: '1.2rem', fontSize: '0.9rem', lineHeight: 1.8 }}>
              <li><strong>pH &lt; 7:</strong> Dung dịch có tính axit (càng nhỏ càng axit mạnh)</li>
              <li><strong>pH = 7:</strong> Dung dịch trung hòa</li>
              <li><strong>pH &gt; 7:</strong> Dung dịch có tính bazơ (càng lớn càng bazơ mạnh)</li>
              <li><strong>Giấy quỳ:</strong> Đỏ/cam trong axit, xanh/tím trong bazơ</li>
            </ul>
          </div>
          
          <button
            onClick={() => setPhase('quiz')}
            className="action-btn primary"
            style={{ marginTop: '1.5rem', width: '100%' }}
          >
            📝 Làm bài trắc nghiệm
          </button>
        </div>
      )}
      
      {/* Phase: Quiz */}
      {phase === 'quiz' && (
        <div className="quiz-content">
          <h4 style={{ marginBottom: '1rem' }}>❓ Trắc nghiệm về pH và chỉ thị</h4>
          
          {questions.map((q, qIdx) => (
            <div key={q.id} className="quiz-question" style={{
              marginBottom: '1.5rem',
              padding: '1rem',
              background: '#f8fafc',
              borderRadius: '12px'
            }}>
              <p style={{ fontWeight: 600, marginBottom: '0.75rem' }}>
                Câu {qIdx + 1}: {q.question}
              </p>
              <div className="quiz-options" style={{ display: 'grid', gap: '0.5rem' }}>
                {q.options.map((opt, optIdx) => (
                  <button
                    key={optIdx}
                    onClick={() => handleAnswer(q.id, optIdx)}
                    style={{
                      padding: '0.75rem 1rem',
                      border: answers[q.id] === optIdx ? '2px solid #0ea5e9' : '1px solid #e5e7eb',
                      borderRadius: '8px',
                      background: answers[q.id] === optIdx ? '#e0f2fe' : 'white',
                      cursor: 'pointer',
                      textAlign: 'left',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    {String.fromCharCode(65 + optIdx)}. {opt}
                  </button>
                ))}
              </div>
            </div>
          ))}
          
          <button
            onClick={handleSubmitQuiz}
            disabled={!allAnswered}
            className={`action-btn ${allAnswered ? 'success' : 'disabled'}`}
            style={{ width: '100%' }}
          >
            ✓ Nộp bài ({Object.keys(answers).length}/{questions.length} câu)
          </button>
        </div>
      )}
      
      {/* Phase: Result */}
      {phase === 'result' && (
        <div className="result-content">
          <div className="result-summary" style={{
            textAlign: 'center',
            padding: '2rem',
            background: score >= 3 ? 'linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%)' : 'linear-gradient(135deg, #fef2f2 0%, #fecaca 100%)',
            borderRadius: '16px',
            marginBottom: '1.5rem'
          }}>
            <div style={{ fontSize: '4rem', marginBottom: '0.5rem' }}>
              {score === 4 ? '🏆' : score >= 3 ? '🎉' : '💪'}
            </div>
            <h3 style={{ marginBottom: '0.5rem' }}>
              {score === 4 ? 'Xuất sắc!' : score >= 3 ? 'Tốt lắm!' : 'Cần cố gắng thêm!'}
            </h3>
            <p style={{ fontSize: '1.5rem', fontWeight: 700, color: score >= 3 ? '#16a34a' : '#dc2626' }}>
              {score}/4 câu đúng
            </p>
          </div>
          
          <h4 style={{ marginBottom: '1rem' }}>📋 Chi tiết kết quả</h4>
          {questions.map((q, qIdx) => {
            const isCorrect = answers[q.id] === q.correct
            return (
              <div key={q.id} style={{
                padding: '1rem',
                marginBottom: '0.75rem',
                background: isCorrect ? '#f0fdf4' : '#fef2f2',
                borderRadius: '8px',
                border: `1px solid ${isCorrect ? '#86efac' : '#fecaca'}`
              }}>
                <p style={{ fontWeight: 600, marginBottom: '0.5rem' }}>
                  {isCorrect ? '✓' : '✗'} Câu {qIdx + 1}: {q.question}
                </p>
                <p style={{ fontSize: '0.9rem', color: '#64748b' }}>
                  Đáp án đúng: <strong>{q.options[q.correct]}</strong>
                  {!isCorrect && (
                    <span style={{ color: '#dc2626' }}> (Bạn chọn: {q.options[answers[q.id]]})</span>
                  )}
                </p>
              </div>
            )
          })}
          
          {score >= 3 && !isStageCompleted && (
            <button
              onClick={handleStageComplete}
              className="action-btn success"
              style={{
                marginTop: '1.5rem',
                width: '100%',
                padding: '1rem',
                fontSize: '1.1rem',
                animation: 'pulse 1.5s infinite'
              }}
            >
              🏆 Hoàn thành tất cả màn chơi!
            </button>
          )}
          
          {score < 3 && (
            <button
              onClick={() => {
                setPhase('experiment')
                setAnswers({})
                setTestedSolutions([])
                setSelectedSolution(null)
              }}
              className="action-btn secondary"
              style={{ marginTop: '1rem', width: '100%' }}
            >
              🔄 Làm lại từ đầu
            </button>
          )}
        </div>
      )}
    </section>
  )
}

/**
 * Main Component
 */
export default function CD_DUNG_DICH() {
  const [currentStage, setCurrentStage] = useState(0)
  const [completedStages, setCompletedStages] = useState([])
  const [showCompleteModal, setShowCompleteModal] = useState(false)
  const [justCompletedStage, setJustCompletedStage] = useState(null)
  
  const stageNames = [
    'Hòa tan muối vào nước',
    'Độ tan và nhiệt độ',
    'Pha dung dịch đường 10%',
    'Pha dung dịch 0.1M NaCl',
    'Pha loãng từ 1.0M → 0.1M',
    'Đo pH bằng giấy quỳ'
  ]
  
  const handleStageComplete = useCallback((stageIndex) => {
    if (!completedStages.includes(stageIndex)) {
      setCompletedStages(prev => [...prev, stageIndex])
      setJustCompletedStage(stageIndex)
      setShowCompleteModal(true)
    }
  }, [completedStages])
  
  const handleNextStage = () => {
    if (justCompletedStage !== null && justCompletedStage < 5) {
      setCurrentStage(justCompletedStage + 1)
    }
    setShowCompleteModal(false)
  }
  
  const isStageUnlocked = (stageIndex) => {
    if (stageIndex === 0) return true
    return completedStages.includes(stageIndex - 1)
  }
  
  const handleStageSelect = (stageIndex) => {
    if (isStageUnlocked(stageIndex)) {
      setCurrentStage(stageIndex)
    }
  }
  
  // Render current experiment based on currentStage
  const renderCurrentExperiment = () => {
    const isLocked = !isStageUnlocked(currentStage)
    
    switch(currentStage) {
      case 0:
        return <Experiment1_DissolvingSalt 
          onComplete={() => handleStageComplete(0)}
          isLocked={isLocked}
        />
      case 1:
        return <Experiment2_SoluteAndSolvent 
          onComplete={() => handleStageComplete(1)}
          isLocked={isLocked}
        />
      case 2:
        return <Experiment3_PreparingSolution 
          onComplete={() => handleStageComplete(2)}
          isLocked={isLocked}
        />
      case 3:
        return <Experiment4_MolarSolution 
          onComplete={() => handleStageComplete(3)}
          isLocked={isLocked}
        />
      case 4:
        return <Experiment5_DilutionPractice 
          onComplete={() => handleStageComplete(4)}
          isLocked={isLocked}
        />
      case 5:
        return <Experiment6_pHTesting 
          onComplete={() => handleStageComplete(5)}
          isLocked={isLocked}
        />
      default:
        return null
    }
  }
  
  return (
    <div className="challenge cd-dung-dich">
      {/* Compact Header */}
      <header className="hero-compact">
        <div className="hero-compact-content">
          <div className="hero-compact-left">
            <h1>CD — DUNG DỊCH</h1>
            <p className="eyebrow">6 màn chơi thí nghiệm tương tác</p>
          </div>
          <div className="hero-compact-right">
            <span className="badge">🏆 {completedStages.length}/6</span>
          </div>
        </div>
      </header>
      
      {/* Stage Progress Bar */}
      <StageProgressBar 
        currentStage={currentStage}
        completedStages={completedStages}
        totalStages={6}
        onStageSelect={handleStageSelect}
      />

      {/* Experiment Area - Scrollable if needed */}
      <div className="experiment-area">
        {renderCurrentExperiment()}
      </div>
      
      {/* Fixed Navigation at Bottom */}
      <div className="navigation-footer">
        <button
          onClick={() => setCurrentStage(prev => Math.max(0, prev - 1))}
          disabled={currentStage === 0}
          className={`nav-btn ${currentStage === 0 ? 'disabled' : ''}`}
        >
          ⬅️ Màn trước
        </button>
        
        <div className="nav-info">
          Màn {currentStage + 1}/6 • {stageNames[currentStage]}
        </div>
        
        <button
          onClick={() => {
            if (currentStage < 5 && isStageUnlocked(currentStage + 1)) {
              setCurrentStage(prev => prev + 1)
            }
          }}
          disabled={currentStage === 5 || !isStageUnlocked(currentStage + 1)}
          className={`nav-btn ${(currentStage === 5 || !isStageUnlocked(currentStage + 1)) ? 'disabled' : ''}`}
        >
          Màn sau ➡️
        </button>
      </div>

      {/* Modals */}
      {completedStages.length === 6 && (
        <div className="victory-banner-modal">
          <div className="modal-overlay" onClick={() => {}}>
            <div className="modal-content victory-modal" onClick={e => e.stopPropagation()}>
              <div className="victory-icon">🏆</div>
              <h2>Chúc mừng!</h2>
              <p>Bạn đã hoàn thành tất cả 6 màn chơi thí nghiệm về Dung Dịch!</p>
              <div className="victory-stats">
                <div className="stat">
                  <div className="stat-value">6/6</div>
                  <div className="stat-label">Màn hoàn thành</div>
                </div>
                <div className="stat">
                  <div className="stat-value">100%</div>
                  <div className="stat-label">Tiến độ</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {showCompleteModal && justCompletedStage !== null && (
        <StageCompleteModal
          stageNumber={justCompletedStage + 1}
          stageName={stageNames[justCompletedStage]}
          onNext={handleNextStage}
          onClose={() => setShowCompleteModal(false)}
          isLastStage={justCompletedStage === 5}
        />
      )}
    </div>
  )
}
