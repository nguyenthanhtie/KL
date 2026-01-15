import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowLeft, Trophy, Star, CheckCircle, XCircle, 
  Beaker, FlaskConical, Sparkles, ChevronRight,
  RotateCcw, Play, Award, Flame, TestTube, GripVertical
} from 'lucide-react';
import useChallengeProgress from '../../../hooks/useChallengeProgress';
import ResumeDialog from '../../../components/ResumeDialog';
import './CSS/Bai09_Oxi_LuuHuynh.css';

// ==================== GAME DATA ====================
const GAME_LEVELS = [
  // === LEVEL 1: Thí nghiệm đốt cháy (Drag & Drop + Trắc nghiệm) ===
  {
    id: 1,
    type: 'burn-experiment',
    title: '🔥 Thí Nghiệm Đốt Cháy',
    description: 'Kéo thả chất vào bình oxi, quan sát hiện tượng rồi trả lời câu hỏi!',
    points: 50,
    substances: [
      { id: 'S', name: 'Lưu huỳnh (S)', color: '#FFEB3B', icon: '🟡' },
      { id: 'Fe', name: 'Sắt (Fe)', color: '#9E9E9E', icon: '🔩' },
      { id: 'C', name: 'Than (C)', color: '#424242', icon: '⬛' },
      { id: 'Mg', name: 'Magie (Mg)', color: '#E0E0E0', icon: '✨' },
    ],
    reactions: {
      'S': { product: 'SO₂', flame: '#3B82F6', effect: 'Ngọn lửa màu XANH, tạo khí mùi hắc', equation: 'S + O₂ → SO₂' },
      'Fe': { product: 'Fe₃O₄', flame: '#FF5722', effect: 'Cháy sáng, bắn tia lửa, tạo chất rắn màu đen', equation: '3Fe + 2O₂ → Fe₃O₄' },
      'C': { product: 'CO₂', flame: '#FF9800', effect: 'Ngọn lửa đỏ, tạo khí không màu', equation: 'C + O₂ → CO₂' },
      'Mg': { product: 'MgO', flame: '#FFFFFF', effect: 'Cháy sáng chói (ánh sáng trắng), tạo chất rắn trắng', equation: '2Mg + O₂ → 2MgO' },
    },
    tasks: [
      { 
        substance: 'S', 
        question: 'Sản phẩm của phản ứng đốt cháy lưu huỳnh trong oxi là gì?',
        options: ['SO₂', 'SO₃', 'H₂SO₄', 'S₂O'],
        correct: 'SO₂'
      },
      { 
        substance: 'Fe', 
        question: 'Oxit sắt nào được tạo thành khi đốt sắt trong oxi tinh khiết?',
        options: ['FeO', 'Fe₂O₃', 'Fe₃O₄', 'FeO₂'],
        correct: 'Fe₃O₄'
      },
    ]
  },

  // === LEVEL 2: Nhận biết khí (Thí nghiệm + Trắc nghiệm) ===
  {
    id: 2,
    type: 'gas-identification',
    title: '🧪 Nhận Biết Khí',
    description: 'Kéo thuốc thử vào ống nghiệm, quan sát hiện tượng rồi trả lời câu hỏi!',
    points: 60,
    gases: [
      { id: 'O2', name: 'Oxi (O₂)', hint: 'Không màu, không mùi' },
      { id: 'SO2', name: 'Lưu huỳnh đioxit (SO₂)', hint: 'Không màu, mùi hắc' },
    ],
    reagents: [
      { id: 'fire-stick', name: 'Que đóm cháy dở', icon: '🔥' },
      { id: 'bromine', name: 'Nước brom', icon: '🟤' },
    ],
    tests: {
      'O2+fire-stick': { result: 'positive', effect: 'Que đóm BÙC CHÁY mãnh liệt', conclusion: 'Khí O₂ duy trì sự cháy' },
      'SO2+bromine': { result: 'positive', effect: 'Nước brom MẤT MÀU (từ nâu → không màu)', conclusion: 'Khí SO₂ có tính khử' },
      'O2+bromine': { result: 'negative', effect: 'Không có hiện tượng gì', conclusion: 'O₂ không phản ứng với nước brom' },
      'SO2+fire-stick': { result: 'negative', effect: 'Que đóm TẮT ngay', conclusion: 'SO₂ không duy trì sự cháy' },
    },
    tasks: [
      { 
        unknownGas: 'O2',
        correctReagent: 'fire-stick',
        question: 'Hiện tượng que đóm bùng cháy mãnh liệt chứng tỏ khí này là gì?',
        options: ['Oxi (O₂)', 'Cacbon đioxit (CO₂)', 'Nitơ (N₂)', 'Lưu huỳnh đioxit (SO₂)'],
        correct: 'Oxi (O₂)'
      },
      { 
        unknownGas: 'SO2',
        correctReagent: 'bromine',
        question: 'Khí làm mất màu nước brom là khí nào?',
        options: ['Oxi (O₂)', 'Lưu huỳnh đioxit (SO₂)', 'Cacbon đioxit (CO₂)', 'Hidro (H₂)'],
        correct: 'Lưu huỳnh đioxit (SO₂)'
      },
    ]
  },

  // === LEVEL 3: Pha chế H₂SO₄ (Drag & Drop thứ tự) ===
  {
    id: 3,
    type: 'acid-preparation',
    title: '⚗️ Điều Chế Axit Sunfuric',
    description: 'Sắp xếp đúng quy trình sản xuất H₂SO₄ công nghiệp!',
    points: 70,
    steps: [
      { id: 'step1', content: 'Đốt quặng pirit: 4FeS₂ + 11O₂ → 2Fe₂O₃ + 8SO₂', order: 1, icon: '🔥' },
      { id: 'step2', content: 'Oxi hóa SO₂ (xúc tác V₂O₅): 2SO₂ + O₂ ⇌ 2SO₃', order: 2, icon: '⚡' },
      { id: 'step3', content: 'Hấp thụ SO₃ vào H₂SO₄ đặc → oleum', order: 3, icon: '💧' },
      { id: 'step4', content: 'Pha loãng oleum → H₂SO₄ đặc', order: 4, icon: '🧪' },
    ],
    hint: 'Phương pháp tiếp xúc: S → SO₂ → SO₃ → H₂SO₄'
  },

  // === LEVEL 4: Tính chất H₂SO₄ đặc (Interactive Lab) ===
  {
    id: 4,
    type: 'acid-properties',
    title: '🧫 Tính Chất H₂SO₄ Đặc',
    description: 'Kéo thả chất vào bình H₂SO₄ đặc để khám phá tính chất!',
    points: 80,
    substances: [
      { id: 'sugar', name: 'Đường saccarozơ', icon: '🍬', color: '#FFFFFF' },
      { id: 'Cu', name: 'Đồng (Cu)', icon: '🟤', color: '#B87333' },
      { id: 'Fe-cold', name: 'Sắt (nguội)', icon: '🔩', color: '#808080' },
      { id: 'water', name: 'Nước', icon: '💧', color: '#87CEEB' },
    ],
    reactions: {
      'sugar': { 
        effect: 'Đường bị THAN HÓA → khối đen xốp phồng lên',
        explanation: 'C₁₂H₂₂O₁₁ → 12C + 11H₂O (H₂SO₄ hút nước)',
        property: 'Tính háo nước',
        visual: 'carbonize'
      },
      'Cu': { 
        effect: 'Tạo dung dịch XANH + khí SO₂ mùi hắc',
        explanation: 'Cu + 2H₂SO₄ đặc → CuSO₄ + SO₂ + 2H₂O',
        property: 'Tính oxi hóa mạnh (nóng)',
        visual: 'blue-gas'
      },
      'Fe-cold': { 
        effect: 'KHÔNG PHẢN ỨNG - Fe bị thụ động hóa',
        explanation: 'Fe tạo lớp oxit bảo vệ bề mặt',
        property: 'Tính thụ động hóa kim loại',
        visual: 'passive'
      },
      'water': { 
        effect: '⚠️ NGUY HIỂM! Tỏa nhiệt mạnh, bắn axit',
        explanation: 'Phải cho AXIT vào NƯỚC, không làm ngược!',
        property: 'Tính háo nước - tỏa nhiệt',
        visual: 'danger'
      },
    }
  },

  // === LEVEL 5: Điều chế O₂ trong PTN (Step-by-step Lab) ===
  {
    id: 5,
    type: 'lab-preparation',
    title: '🔬 Điều Chế Oxi Trong PTN',
    description: 'Thực hiện đúng các bước điều chế khí O₂ từ KMnO₄!',
    points: 90,
    equipment: [
      { id: 'kmno4', name: 'KMnO₄', icon: '💜' },
      { id: 'tube', name: 'Ống nghiệm', icon: '🧪' },
      { id: 'cotton', name: 'Bông', icon: '☁️' },
      { id: 'burner', name: 'Đèn cồn', icon: '🔥' },
      { id: 'trough', name: 'Chậu nước', icon: '🫧' },
      { id: 'collect', name: 'Thu khí', icon: '⭕' },
    ],
    correctSequence: ['kmno4', 'tube', 'cotton', 'burner', 'trough', 'collect'],
    steps: [
      'Cho KMnO₄ vào ống nghiệm',
      'Lắp ống nghiệm nghiêng trên giá',
      'Đặt bông ở miệng ống (ngăn bụi)',
      'Đun nóng bằng đèn cồn',
      'Đặt chậu nước để thu khí',
      'Thu O₂ bằng phương pháp đẩy nước',
    ],
    equation: '2KMnO₄ →(t°) K₂MnO₄ + MnO₂ + O₂↑'
  },

  // === LEVEL 6: Chuỗi phản ứng (Connect the chain) ===
  {
    id: 6,
    type: 'reaction-chain',
    title: '🔗 Chuỗi Phản Ứng Lưu Huỳnh',
    description: 'Kéo thả để hoàn thành chuỗi chuyển hóa của lưu huỳnh!',
    points: 100,
    chain: [
      { position: 0, substance: 'S', fixed: true },
      { position: 1, substance: '?', answer: 'SO₂', hint: 'Đốt S trong O₂' },
      { position: 2, substance: '?', answer: 'SO₃', hint: 'Oxi hóa với xúc tác' },
      { position: 3, substance: '?', answer: 'H₂SO₄', hint: 'Hấp thụ vào nước' },
      { position: 4, substance: '?', answer: 'BaSO₄', hint: 'Tác dụng với Ba²⁺' },
    ],
    options: ['SO₂', 'SO₃', 'H₂SO₄', 'BaSO₄', 'H₂S', 'Na₂SO₄'],
    arrows: [
      { from: 0, to: 1, reagent: '+O₂, t°' },
      { from: 1, to: 2, reagent: '+O₂, V₂O₅' },
      { from: 2, to: 3, reagent: '+H₂O' },
      { from: 3, to: 4, reagent: '+Ba(OH)₂' },
    ]
  },

  // === BOSS LEVEL ===
  {
    id: 7,
    type: 'boss-challenge',
    title: '🏆 Thử Thách Tổng Hợp',
    description: 'Vượt qua 5 câu hỏi nhanh để hoàn thành!',
    points: 150,
    questions: [
      {
        type: 'match-oxidation',
        question: 'Nối chất với số oxi hóa của S:',
        pairs: [
          { left: 'H₂S', right: '-2' },
          { left: 'S', right: '0' },
          { left: 'SO₂', right: '+4' },
          { left: 'H₂SO₄', right: '+6' },
        ]
      },
      {
        type: 'select',
        question: 'SO₂ vừa là chất khử vừa là chất oxi hóa vì S có số oxi hóa:',
        options: ['Trung gian (+4)', 'Thấp nhất (-2)', 'Cao nhất (+6)'],
        correct: 'Trung gian (+4)'
      },
      {
        type: 'order',
        question: 'Pha loãng H₂SO₄ đặc đúng cách:',
        steps: ['Lấy nước vào cốc', 'Cho từ từ axit vào', 'Khuấy đều'],
      },
      {
        type: 'fill',
        question: 'Cu + H₂SO₄ đặc nóng → ? + SO₂ + H₂O',
        answer: 'CuSO4',
        display: 'CuSO₄'
      },
      {
        type: 'select',
        question: 'Khí nào làm MẤT MÀU nước brom?',
        options: ['O₂', 'SO₂', 'CO₂'],
        correct: 'SO₂'
      }
    ]
  }
];

// ==================== DRAG & DROP COMPONENTS ====================
const DragItem = ({ id, children, onDragStart, className = '', disabled = false }) => {
  const handleDragStart = (e) => {
    if (disabled) return;
    e.dataTransfer.setData('text/plain', id);
    e.dataTransfer.effectAllowed = 'move';
    onDragStart?.(id);
  };

  return (
    <div
      draggable={!disabled}
      onDragStart={handleDragStart}
      className={`drag-item ${className} ${disabled ? 'disabled' : ''}`}
    >
      <GripVertical size={14} className="grip-icon" />
      {children}
    </div>
  );
};

const DropZone = ({ id, onDrop, children, className = '', highlight = false }) => {
  const [isOver, setIsOver] = useState(false);

  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    setIsOver(true);
  };

  const handleDragLeave = () => setIsOver(false);

  const handleDrop = (e) => {
    e.preventDefault();
    setIsOver(false);
    const draggedId = e.dataTransfer.getData('text/plain');
    onDrop?.(draggedId, id);
  };

  return (
    <div
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      className={`drop-zone ${className} ${isOver ? 'drag-over' : ''} ${highlight ? 'highlight' : ''}`}
    >
      {children}
    </div>
  );
};

// ==================== LEVEL COMPONENTS ====================

// Level 1: Burn Experiment (Thí nghiệm + Trắc nghiệm)
const BurnExperiment = ({ level, onComplete }) => {
  const [currentTask, setCurrentTask] = useState(0);
  const [droppedSubstance, setDroppedSubstance] = useState(null);
  const [isReacting, setIsReacting] = useState(false);
  const [showQuestion, setShowQuestion] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);

  const task = level.tasks[currentTask];
  const reaction = droppedSubstance ? level.reactions[droppedSubstance] : null;

  const handleDrop = (substanceId) => {
    if (isReacting || showQuestion) return;
    // Chỉ cho phép thả đúng chất được yêu cầu
    if (substanceId !== task.substance) {
      return; // Không làm gì nếu thả sai chất
    }
    setDroppedSubstance(substanceId);
    setIsReacting(true);
    // Sau 2.5s hiện tượng, hiển thị câu hỏi trắc nghiệm
    setTimeout(() => {
      setIsReacting(false);
      setShowQuestion(true);
    }, 2500);
  };

  const handleSelectAnswer = (answer) => {
    if (showResult) return;
    setSelectedAnswer(answer);
  };

  const handleSubmitAnswer = () => {
    if (!selectedAnswer) return;
    setShowResult(true);
    if (selectedAnswer === task.correct) {
      setScore(s => s + 25);
    }
  };

  const handleNext = () => {
    if (currentTask < level.tasks.length - 1) {
      setCurrentTask(c => c + 1);
      setDroppedSubstance(null);
      setIsReacting(false);
      setShowQuestion(false);
      setSelectedAnswer(null);
      setShowResult(false);
    } else {
      onComplete(score + (selectedAnswer === task.correct ? 25 : 0));
    }
  };

  return (
    <div className="burn-experiment">
      <div className="task-header">
        <span className="task-number">Nhiệm vụ {currentTask + 1}/{level.tasks.length}</span>
        <span className="task-score">⭐ {score} điểm</span>
      </div>
      
      <p className="task-instruction">
        {!droppedSubstance 
          ? `👉 Kéo thả "${level.substances.find(s => s.id === task.substance)?.name}" vào bình oxi để thực hiện thí nghiệm`
          : showQuestion 
            ? '📝 Quan sát hiện tượng và trả lời câu hỏi bên phải'
            : '🔬 Đang thực hiện phản ứng...'}
      </p>

      {/* Layout 2 cột: Thí nghiệm bên trái - Trắc nghiệm bên phải */}
      <div className="experiment-quiz-container">
        {/* BÊN TRÁI: Khu vực thí nghiệm */}
        <div className="experiment-side">
          <div className="experiment-area">
            <div className="substances-panel">
              <h4>🧪 Chất phản ứng</h4>
              <div className="substances-list">
                {level.substances.map(sub => (
                  <DragItem 
                    key={sub.id} 
                    id={sub.id} 
                    disabled={isReacting || showQuestion || sub.id !== task.substance} 
                    className={`substance-item ${sub.id === task.substance ? 'target-substance' : 'disabled-substance'}`}
                  >
                    <span className="substance-icon">{sub.icon}</span>
                    <span className="substance-name">{sub.name}</span>
                    {sub.id === task.substance && <span className="target-badge">← Chọn</span>}
                  </DragItem>
                ))}
              </div>
            </div>

            <DropZone id="flask" onDrop={handleDrop} className="oxygen-flask" highlight={!droppedSubstance}>
              <div className="flask-container">
                <div className="flask-label">Bình O₂</div>
                <div className={`flask-body ${isReacting ? 'reacting' : ''}`}>
                  {droppedSubstance && (
                    <div className="dropped-substance" style={{ backgroundColor: level.substances.find(s => s.id === droppedSubstance)?.color }}>
                      {level.substances.find(s => s.id === droppedSubstance)?.icon}
                    </div>
                  )}
                  {(isReacting || showQuestion) && reaction && (
                    <div className="flame-effect" style={{ '--flame-color': reaction.flame }}>
                      <Flame className={`flame-icon ${isReacting ? 'animated' : ''}`} />
                    </div>
                  )}
                </div>
                {!droppedSubstance && <p className="drop-hint">Kéo thả chất vào đây</p>}
              </div>
            </DropZone>
          </div>

          {/* Hiện tượng quan sát được */}
          {(isReacting || showQuestion) && reaction && (
            <div className="observation-panel">
              <h4>👁️ Hiện tượng quan sát</h4>
              <div className="observation-content">
                <p className="effect-text">🔬 {reaction.effect}</p>
                {showQuestion && <p className="equation-text">📝 Phương trình: {reaction.equation}</p>}
              </div>
            </div>
          )}
        </div>

        {/* BÊN PHẢI: Khu vực trắc nghiệm */}
        <div className="quiz-side">
          {!showQuestion ? (
            <div className="quiz-placeholder">
              <div className="placeholder-icon">📝</div>
              <p>Thực hiện thí nghiệm để mở khóa câu hỏi</p>
            </div>
          ) : (
            <div className="quiz-section">
              <h4>❓ Câu hỏi</h4>
              <p className="quiz-question">{task.question}</p>
              
              <div className="quiz-options">
                {task.options.map((option, idx) => (
                  <button
                    key={idx}
                    className={`quiz-option ${selectedAnswer === option ? 'selected' : ''} ${showResult ? (option === task.correct ? 'correct' : selectedAnswer === option ? 'wrong' : '') : ''}`}
                    onClick={() => handleSelectAnswer(option)}
                    disabled={showResult}
                  >
                    <span className="option-letter">{String.fromCharCode(65 + idx)}</span>
                    <span className="option-text">{option}</span>
                    {showResult && option === task.correct && <CheckCircle size={18} className="correct-icon" />}
                    {showResult && selectedAnswer === option && option !== task.correct && <XCircle size={18} className="wrong-icon" />}
                  </button>
                ))}
              </div>

              {!showResult && selectedAnswer && (
                <button className="btn-check" onClick={handleSubmitAnswer}>
                  <Play size={18} /> Xác nhận đáp án
                </button>
              )}

              {showResult && (
                <div className={`answer-result ${selectedAnswer === task.correct ? 'correct' : 'incorrect'}`}>
                  <div className="result-header">
                    {selectedAnswer === task.correct 
                      ? <><CheckCircle size={24} /> Chính xác! +25 điểm</>
                      : <><XCircle size={24} /> Sai rồi! Đáp án đúng: {task.correct}</>}
                  </div>
                  <button className="btn-next" onClick={handleNext}>
                    {currentTask < level.tasks.length - 1 ? 'Nhiệm vụ tiếp theo' : 'Hoàn thành Level'} <ChevronRight size={18} />
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Level 2: Gas Identification (Thí nghiệm + Trắc nghiệm)
const GasIdentification = ({ level, onComplete }) => {
  const [currentTask, setCurrentTask] = useState(0);
  const [droppedReagent, setDroppedReagent] = useState(null);
  const [isReacting, setIsReacting] = useState(false);
  const [showQuestion, setShowQuestion] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);

  const task = level.tasks[currentTask];
  const testKey = droppedReagent ? `${task.unknownGas}+${droppedReagent}` : null;
  const testResult = testKey ? level.tests[testKey] : null;

  const handleDropReagent = (reagentId) => {
    if (isReacting || showQuestion) return;
    // Chỉ cho phép thả đúng thuốc thử được yêu cầu
    if (reagentId !== task.correctReagent) {
      return;
    }
    setDroppedReagent(reagentId);
    setIsReacting(true);
    // Sau 2.5s hiện tượng, hiển thị câu hỏi
    setTimeout(() => {
      setIsReacting(false);
      setShowQuestion(true);
    }, 2500);
  };

  const handleSelectAnswer = (answer) => {
    if (showResult) return;
    setSelectedAnswer(answer);
  };

  const handleSubmitAnswer = () => {
    if (!selectedAnswer) return;
    setShowResult(true);
    if (selectedAnswer === task.correct) {
      setScore(s => s + 30);
    }
  };

  const handleNext = () => {
    if (currentTask < level.tasks.length - 1) {
      setCurrentTask(c => c + 1);
      setDroppedReagent(null);
      setIsReacting(false);
      setShowQuestion(false);
      setSelectedAnswer(null);
      setShowResult(false);
    } else {
      onComplete(score + (selectedAnswer === task.correct ? 30 : 0));
    }
  };

  return (
    <div className="gas-identification">
      <div className="task-header">
        <span className="task-number">Nhiệm vụ {currentTask + 1}/{level.tasks.length}</span>
        <span className="task-score">⭐ {score} điểm</span>
      </div>

      <p className="task-instruction">
        {!droppedReagent 
          ? `👉 Kéo thả "${level.reagents.find(r => r.id === task.correctReagent)?.name}" vào ống nghiệm chứa khí`
          : showQuestion 
            ? '📝 Quan sát hiện tượng và trả lời câu hỏi bên phải'
            : '🔬 Đang thực hiện phản ứng...'}
      </p>

      {/* Layout 2 cột */}
      <div className="experiment-quiz-container">
        {/* BÊN TRÁI: Khu vực thí nghiệm */}
        <div className="experiment-side">
          <div className="experiment-area">
            <div className="reagents-panel">
              <h4>🧪 Thuốc thử</h4>
              <div className="reagents-list">
                {level.reagents.map(reagent => (
                  <DragItem 
                    key={reagent.id} 
                    id={reagent.id} 
                    disabled={isReacting || showQuestion || reagent.id !== task.correctReagent}
                    className={`reagent-item ${reagent.id === task.correctReagent ? 'target-reagent' : 'disabled-reagent'}`}
                  >
                    <span className="reagent-icon">{reagent.icon}</span>
                    <span>{reagent.name}</span>
                    {reagent.id === task.correctReagent && <span className="target-badge">← Chọn</span>}
                  </DragItem>
                ))}
              </div>
            </div>

            <DropZone id="test-tube" onDrop={handleDropReagent} className="test-tube-zone" highlight={!droppedReagent}>
              <div className="test-tube">
                <div className="tube-label">Ống nghiệm chứa khí ?</div>
                <div className={`tube-body ${isReacting ? 'reacting' : ''}`}>
                  <TestTube size={70} />
                  {droppedReagent && (
                    <div className="reagent-in-tube">
                      {level.reagents.find(r => r.id === droppedReagent)?.icon}
                    </div>
                  )}
                  {isReacting && (
                    <div className="reaction-effect-gas">
                      <Sparkles className="sparkle-icon" />
                    </div>
                  )}
                </div>
                {!droppedReagent && <p className="drop-hint">Kéo thả thuốc thử vào đây</p>}
              </div>
            </DropZone>
          </div>

          {/* Hiện tượng quan sát được */}
          {(isReacting || showQuestion) && testResult && (
            <div className={`observation-panel ${testResult.result}`}>
              <h4>👁️ Hiện tượng quan sát</h4>
              <div className="observation-content">
                <p className="effect-text">🔬 {testResult.effect}</p>
                {showQuestion && <p className="conclusion-text">💡 {testResult.conclusion}</p>}
              </div>
            </div>
          )}
        </div>

        {/* BÊN PHẢI: Khu vực trắc nghiệm */}
        <div className="quiz-side">
          {!showQuestion ? (
            <div className="quiz-placeholder">
              <div className="placeholder-icon">📝</div>
              <p>Thực hiện thí nghiệm để mở khóa câu hỏi</p>
            </div>
          ) : (
            <div className="quiz-section">
              <h4>❓ Câu hỏi</h4>
              <p className="quiz-question">{task.question}</p>
              
              <div className="quiz-options">
                {task.options.map((option, idx) => (
                  <button
                    key={idx}
                    className={`quiz-option ${selectedAnswer === option ? 'selected' : ''} ${showResult ? (option === task.correct ? 'correct' : selectedAnswer === option ? 'wrong' : '') : ''}`}
                    onClick={() => handleSelectAnswer(option)}
                    disabled={showResult}
                  >
                    <span className="option-letter">{String.fromCharCode(65 + idx)}</span>
                    <span className="option-text">{option}</span>
                    {showResult && option === task.correct && <CheckCircle size={18} className="correct-icon" />}
                    {showResult && selectedAnswer === option && option !== task.correct && <XCircle size={18} className="wrong-icon" />}
                  </button>
                ))}
              </div>

              {!showResult && selectedAnswer && (
                <button className="btn-check" onClick={handleSubmitAnswer}>
                  <Play size={18} /> Xác nhận đáp án
                </button>
              )}

              {showResult && (
                <div className={`answer-result ${selectedAnswer === task.correct ? 'correct' : 'incorrect'}`}>
                  <div className="result-header">
                    {selectedAnswer === task.correct 
                      ? <><CheckCircle size={24} /> Chính xác! +30 điểm</>
                      : <><XCircle size={24} /> Sai rồi! Đáp án đúng: {task.correct}</>}
                  </div>
                  <button className="btn-next" onClick={handleNext}>
                    {currentTask < level.tasks.length - 1 ? 'Nhiệm vụ tiếp theo' : 'Hoàn thành Level'} <ChevronRight size={18} />
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Level 3: Acid Preparation
const AcidPreparation = ({ level, onComplete }) => {
  const [orderedSteps, setOrderedSteps] = useState([]);
  const [availableSteps, setAvailableSteps] = useState(() => [...level.steps].sort(() => Math.random() - 0.5));
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  const handleDropToOrder = (stepId) => {
    const step = availableSteps.find(s => s.id === stepId);
    if (step) {
      setAvailableSteps(prev => prev.filter(s => s.id !== stepId));
      setOrderedSteps(prev => [...prev, step]);
    }
  };

  const handleRemoveStep = (stepId) => {
    const step = orderedSteps.find(s => s.id === stepId);
    if (step) {
      setOrderedSteps(prev => prev.filter(s => s.id !== stepId));
      setAvailableSteps(prev => [...prev, step]);
    }
  };

  const checkAnswer = () => {
    const correct = orderedSteps.every((step, idx) => step.order === idx + 1);
    setIsCorrect(correct);
    setShowResult(true);
  };

  return (
    <div className="acid-preparation">
      <p className="level-hint">💡 {level.hint}</p>

      <div className="preparation-area">
        <div className="available-steps">
          <h4>📦 Các bước (kéo thả theo thứ tự)</h4>
          {availableSteps.map(step => (
            <DragItem key={step.id} id={step.id} className="step-item" disabled={showResult}>
              <span className="step-icon">{step.icon}</span>
              <span className="step-content">{step.content}</span>
            </DragItem>
          ))}
        </div>

        <div className="order-zone">
          <h4>📋 Quy trình sản xuất</h4>
          {[1, 2, 3, 4].map(num => (
            <DropZone key={num} id={`position-${num}`} onDrop={handleDropToOrder} className="order-slot">
              <span className="slot-number">{num}</span>
              {orderedSteps[num - 1] ? (
                <div 
                  className={`placed-step ${showResult ? (orderedSteps[num - 1].order === num ? 'correct' : 'wrong') : ''}`}
                  onClick={() => !showResult && handleRemoveStep(orderedSteps[num - 1].id)}
                >
                  <span>{orderedSteps[num - 1].icon}</span>
                  <span>{orderedSteps[num - 1].content}</span>
                </div>
              ) : (
                <span className="slot-placeholder">Kéo bước vào đây</span>
              )}
            </DropZone>
          ))}
        </div>
      </div>

      {!showResult && orderedSteps.length === 4 && (
        <button className="btn-check" onClick={checkAnswer}><Play size={18} /> Kiểm tra</button>
      )}

      {showResult && (
        <div className={`result-panel ${isCorrect ? 'correct' : 'incorrect'}`}>
          <div className="result-header">
            {isCorrect ? <><CheckCircle size={24} /> Hoàn hảo!</> : <><XCircle size={24} /> Chưa đúng thứ tự!</>}
          </div>
          <button className="btn-next" onClick={() => onComplete(isCorrect ? level.points : 20)}>
            Tiếp tục <ChevronRight size={18} />
          </button>
        </div>
      )}
    </div>
  );
};

// Level 4: Acid Properties
const AcidProperties = ({ level, onComplete }) => {
  const [droppedSubstance, setDroppedSubstance] = useState(null);
  const [isReacting, setIsReacting] = useState(false);
  const [testedSubstances, setTestedSubstances] = useState([]);
  const [showResult, setShowResult] = useState(false);

  const reaction = droppedSubstance ? level.reactions[droppedSubstance] : null;

  const handleDrop = (substanceId) => {
    if (isReacting || testedSubstances.includes(substanceId)) return;
    setDroppedSubstance(substanceId);
    setIsReacting(true);
    setTimeout(() => {
      setTestedSubstances(prev => [...prev, substanceId]);
      setShowResult(true);
    }, 2000);
  };

  const handleContinue = () => {
    setDroppedSubstance(null);
    setIsReacting(false);
    setShowResult(false);
  };

  return (
    <div className="acid-properties">
      <div className="experiment-area">
        <div className="substances-panel">
          <h4>🧪 Chất thử nghiệm</h4>
          {level.substances.map(sub => (
            <DragItem
              key={sub.id}
              id={sub.id}
              disabled={isReacting || testedSubstances.includes(sub.id)}
              className={`substance-item ${testedSubstances.includes(sub.id) ? 'tested' : ''}`}
            >
              <span className="substance-icon">{sub.icon}</span>
              <span>{sub.name}</span>
              {testedSubstances.includes(sub.id) && <CheckCircle size={16} className="tested-icon" />}
            </DragItem>
          ))}
        </div>

        <DropZone id="acid-beaker" onDrop={handleDrop} className={`acid-beaker ${reaction?.visual || ''}`}>
          <div className="beaker-container">
            <div className="beaker-label">H₂SO₄ đặc</div>
            <div className={`beaker-body ${isReacting ? 'reacting' : ''}`}>
              <Beaker size={80} />
              {droppedSubstance && (
                <div className="substance-in-beaker">{level.substances.find(s => s.id === droppedSubstance)?.icon}</div>
              )}
              {isReacting && (
                <div className={`reaction-effect ${reaction?.visual}`}>
                  {reaction?.visual === 'carbonize' && <div className="carbon-rise">🖤</div>}
                  {reaction?.visual === 'blue-gas' && <div className="blue-smoke">💨</div>}
                  {reaction?.visual === 'danger' && <div className="danger-splash">⚠️💥</div>}
                  {reaction?.visual === 'passive' && <div className="no-reaction">❌</div>}
                </div>
              )}
            </div>
            {!droppedSubstance && <p className="drop-hint">Kéo thả chất vào đây</p>}
          </div>
        </DropZone>
      </div>

      {showResult && reaction && (
        <div className={`property-result ${reaction.visual === 'danger' ? 'danger' : ''}`}>
          <h4>🔬 Kết quả thí nghiệm</h4>
          <p className="effect">{reaction.effect}</p>
          <p className="explanation">📝 {reaction.explanation}</p>
          <p className="property">✨ Tính chất: <strong>{reaction.property}</strong></p>
          
          {testedSubstances.length < level.substances.length ? (
            <button className="btn-continue" onClick={handleContinue}>Thử chất khác <ChevronRight size={18} /></button>
          ) : (
            <button className="btn-next" onClick={() => onComplete(testedSubstances.length * 20)}>
              Hoàn thành Level <Trophy size={18} />
            </button>
          )}
        </div>
      )}

      <div className="progress-indicator">Đã thử: {testedSubstances.length}/{level.substances.length} chất</div>
    </div>
  );
};

// Level 5: Lab Preparation
const LabPreparation = ({ level, onComplete }) => {
  const [sequence, setSequence] = useState([]);
  const [availableEquipment, setAvailableEquipment] = useState([...level.equipment]);
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  const handleDropEquipment = (equipId) => {
    const equip = availableEquipment.find(e => e.id === equipId);
    if (equip) {
      setAvailableEquipment(prev => prev.filter(e => e.id !== equipId));
      setSequence(prev => [...prev, equip]);
    }
  };

  const handleReset = () => {
    setSequence([]);
    setAvailableEquipment([...level.equipment]);
    setShowResult(false);
  };

  const checkAnswer = () => {
    const correct = sequence.every((item, idx) => item.id === level.correctSequence[idx]);
    setIsCorrect(correct);
    setShowResult(true);
  };

  return (
    <div className="lab-preparation">
      <p className="equation-display">⚗️ {level.equation}</p>

      <div className="lab-area">
        <div className="equipment-panel">
          <h4>🧰 Dụng cụ & Hóa chất</h4>
          {availableEquipment.map(equip => (
            <DragItem key={equip.id} id={equip.id} className="equipment-item" disabled={showResult}>
              <span className="equip-icon">{equip.icon}</span>
              <span>{equip.name}</span>
            </DragItem>
          ))}
        </div>

        <div className="procedure-zone">
          <h4>📋 Quy trình thực hiện</h4>
          {level.steps.map((step, idx) => (
            <DropZone key={idx} id={`step-${idx}`} onDrop={handleDropEquipment} className={`procedure-step ${sequence[idx] ? 'filled' : ''}`}>
              <span className="step-number">{idx + 1}</span>
              <div className="step-content">
                {sequence[idx] ? (
                  <div className={`placed-equip ${showResult ? (sequence[idx].id === level.correctSequence[idx] ? 'correct' : 'wrong') : ''}`}>
                    <span>{sequence[idx].icon}</span>
                    <span>{sequence[idx].name}</span>
                  </div>
                ) : (
                  <span className="step-text">{step}</span>
                )}
              </div>
            </DropZone>
          ))}
        </div>
      </div>

      <div className="action-buttons">
        <button className="btn-reset" onClick={handleReset} disabled={showResult}><RotateCcw size={18} /> Làm lại</button>
        {sequence.length === level.steps.length && !showResult && (
          <button className="btn-check" onClick={checkAnswer}><Play size={18} /> Kiểm tra</button>
        )}
      </div>

      {showResult && (
        <div className={`result-panel ${isCorrect ? 'correct' : 'incorrect'}`}>
          <div className="result-header">
            {isCorrect ? <><CheckCircle size={24} /> Tuyệt vời!</> : <><XCircle size={24} /> Chưa đúng quy trình!</>}
          </div>
          <button className="btn-next" onClick={() => onComplete(isCorrect ? level.points : 30)}>
            Tiếp tục <ChevronRight size={18} />
          </button>
        </div>
      )}
    </div>
  );
};

// Level 6: Reaction Chain
const ReactionChain = ({ level, onComplete }) => {
  const [filledChain, setFilledChain] = useState(level.chain.map(item => item.fixed ? item.substance : null));
  const [availableOptions, setAvailableOptions] = useState([...level.options]);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);

  const handleDrop = (option, position) => {
    const posIdx = parseInt(position.split('-')[1]);
    if (filledChain[posIdx] || level.chain[posIdx].fixed) return;
    
    const newChain = [...filledChain];
    newChain[posIdx] = option;
    setFilledChain(newChain);
    setAvailableOptions(prev => prev.filter(o => o !== option));
  };

  const handleRemove = (position) => {
    if (level.chain[position].fixed) return;
    const removed = filledChain[position];
    if (removed) {
      const newChain = [...filledChain];
      newChain[position] = null;
      setFilledChain(newChain);
      setAvailableOptions(prev => [...prev, removed]);
    }
  };

  const checkAnswer = () => {
    let correct = 0;
    level.chain.forEach((item, idx) => {
      if (!item.fixed && filledChain[idx] === item.answer) correct++;
    });
    setScore(correct * 25);
    setShowResult(true);
  };

  const allFilled = filledChain.every(item => item !== null);

  return (
    <div className="reaction-chain">
      <div className="chain-area">
        {level.chain.map((item, idx) => (
          <React.Fragment key={idx}>
            <DropZone
              id={`chain-${idx}`}
              onDrop={(opt) => handleDrop(opt, `chain-${idx}`)}
              className={`chain-node ${item.fixed ? 'fixed' : ''} ${showResult && !item.fixed ? (filledChain[idx] === item.answer ? 'correct' : 'wrong') : ''}`}
            >
              <div className="node-content" onClick={() => !item.fixed && !showResult && handleRemove(idx)}>
                {filledChain[idx] || '?'}
              </div>
              {!item.fixed && !filledChain[idx] && <div className="node-hint">{item.hint}</div>}
            </DropZone>
            {idx < level.arrows.length && (
              <div className="chain-arrow">
                <div className="arrow-reagent">{level.arrows[idx].reagent}</div>
                <ChevronRight size={24} />
              </div>
            )}
          </React.Fragment>
        ))}
      </div>

      <div className="options-panel">
        <h4>🧪 Các chất (kéo thả vào ?)</h4>
        <div className="options-list">
          {availableOptions.map(option => (
            <DragItem key={option} id={option} className="option-item" disabled={showResult}>{option}</DragItem>
          ))}
        </div>
      </div>

      {allFilled && !showResult && (
        <button className="btn-check" onClick={checkAnswer}><Play size={18} /> Kiểm tra chuỗi</button>
      )}

      {showResult && (
        <div className={`result-panel ${score === 100 ? 'correct' : 'partial'}`}>
          <div className="result-header">
            {score === 100 ? <><CheckCircle size={24} /> Hoàn hảo!</> : <><Star size={24} /> Đạt {score}/100 điểm</>}
          </div>
          <button className="btn-next" onClick={() => onComplete(score)}>Tiếp tục <ChevronRight size={18} /></button>
        </div>
      )}
    </div>
  );
};

// Boss Challenge
const BossChallenge = ({ level, onComplete }) => {
  const [currentQ, setCurrentQ] = useState(0);
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showQResult, setShowQResult] = useState(false);

  const question = level.questions[currentQ];

  const handleAnswer = (answer) => setAnswers(prev => ({ ...prev, [currentQ]: answer }));

  const checkCurrentAnswer = () => {
    let correct = false;
    const q = question;
    const answer = answers[currentQ];

    if (q.type === 'select' && answer === q.correct) correct = true;
    if (q.type === 'fill' && answer?.toLowerCase().replace(/[₄₂]/g, (m) => m === '₄' ? '4' : '2').trim() === q.answer.toLowerCase()) correct = true;

    if (correct) setScore(s => s + 30);
    setShowQResult(true);
  };

  const nextQuestion = () => {
    if (currentQ < level.questions.length - 1) {
      setCurrentQ(c => c + 1);
      setShowQResult(false);
    } else {
      onComplete(score);
    }
  };

  const renderQuestion = () => {
    const q = question;
    if (q.type === 'select') {
      return (
        <div className="boss-options">
          {q.options.map((opt, idx) => (
            <button
              key={idx}
              className={`boss-option ${answers[currentQ] === opt ? 'selected' : ''}`}
              onClick={() => handleAnswer(opt)}
              disabled={showQResult}
            >
              {opt}
            </button>
          ))}
        </div>
      );
    }
    if (q.type === 'fill') {
      return (
        <div className="fill-answer">
          <input
            type="text"
            placeholder="Nhập công thức..."
            value={answers[currentQ] || ''}
            onChange={(e) => handleAnswer(e.target.value)}
            disabled={showQResult}
          />
          {q.display && <span className="hint-display">Gợi ý: {q.display}</span>}
        </div>
      );
    }
    return <p>Câu hỏi đặc biệt - chọn đáp án đúng</p>;
  };

  return (
    <div className="boss-challenge">
      <div className="boss-header">
        <span>Câu {currentQ + 1}/{level.questions.length}</span>
        <span>⭐ {score} điểm</span>
      </div>

      <div className="boss-question">
        <p>{question.question}</p>
        {renderQuestion()}
      </div>

      {!showQResult && answers[currentQ] && (
        <button className="btn-check" onClick={checkCurrentAnswer}>Xác nhận</button>
      )}

      {showQResult && (
        <button className="btn-next" onClick={nextQuestion}>
          {currentQ < level.questions.length - 1 ? 'Câu tiếp' : 'Hoàn thành'} <ChevronRight size={18} />
        </button>
      )}
    </div>
  );
};

// ==================== MAIN COMPONENT ====================
const Bai09_Oxi_LuuHuynh = () => {
  const { hasProgress, saveProgress, clearProgress, getProgress, completeChallenge } = useChallengeProgress('oxi-sulfur-interactive-v2', {
    challengeId: 9,
    programId: 'chemistry',
    grade: 10
  });
  
  const [startTime] = useState(() => Date.now());
  const [isCompleted, setIsCompleted] = useState(false);
  const [currentLevel, setCurrentLevel] = useState(0);
  const [totalScore, setTotalScore] = useState(0);
  const [completedLevels, setCompletedLevels] = useState([]);
  const [showResumeDialog, setShowResumeDialog] = useState(false);
  const [savedProgress, setSavedProgress] = useState(null);
  const [gameComplete, setGameComplete] = useState(false);

  const level = GAME_LEVELS[currentLevel];
  const maxScore = GAME_LEVELS.reduce((sum, l) => sum + l.points, 0);

  useEffect(() => {
    if (hasProgress) {
      const saved = getProgress();
      if (saved) {
        setSavedProgress(saved);
        setShowResumeDialog(true);
      }
    }
  }, []);

  const handleResume = () => {
    if (savedProgress) {
      setCurrentLevel(savedProgress.currentLevel || 0);
      setTotalScore(savedProgress.totalScore || 0);
      setCompletedLevels(savedProgress.completedLevels || []);
    }
    setShowResumeDialog(false);
  };

  const handleRestart = () => {
    clearProgress();
    setCurrentLevel(0);
    setTotalScore(0);
    setCompletedLevels([]);
    setGameComplete(false);
    setShowResumeDialog(false);
  };

  const handleLevelComplete = (score) => {
    const newTotal = totalScore + score;
    const newCompleted = [...completedLevels, currentLevel];
    
    setTotalScore(newTotal);
    setCompletedLevels(newCompleted);

    if (currentLevel < GAME_LEVELS.length - 1) {
      setCurrentLevel(currentLevel + 1);
      saveProgress({ currentLevel: currentLevel + 1, totalScore: newTotal, completedLevels: newCompleted });
    } else {
      setGameComplete(true);
      clearProgress();
      
      // Lưu kết quả khi hoàn thành tất cả level
      if (!isCompleted) {
        setIsCompleted(true);
        const percentage = Math.round((newTotal / maxScore) * 100);
        const stars = percentage >= 80 ? 3 : percentage >= 50 ? 2 : 1;
        completeChallenge({
          score: newTotal,
          maxScore,
          percentage,
          stars,
          timeSpent: Math.floor((Date.now() - startTime) / 1000),
          correctAnswers: newCompleted.length,
          totalQuestions: GAME_LEVELS.length
        });
      }
    }
  };

  const renderLevel = () => {
    switch (level.type) {
      case 'burn-experiment': return <BurnExperiment level={level} onComplete={handleLevelComplete} />;
      case 'gas-identification': return <GasIdentification level={level} onComplete={handleLevelComplete} />;
      case 'acid-preparation': return <AcidPreparation level={level} onComplete={handleLevelComplete} />;
      case 'acid-properties': return <AcidProperties level={level} onComplete={handleLevelComplete} />;
      case 'lab-preparation': return <LabPreparation level={level} onComplete={handleLevelComplete} />;
      case 'reaction-chain': return <ReactionChain level={level} onComplete={handleLevelComplete} />;
      case 'boss-challenge': return <BossChallenge level={level} onComplete={handleLevelComplete} />;
      default: return <p>Level không xác định</p>;
    }
  };

  return (
    <div className="oxi-sulfur-game">
      {showResumeDialog && savedProgress && (
        <ResumeDialog
          show={showResumeDialog}
          onResume={handleResume}
          onRestart={handleRestart}
          progressInfo={{ current: savedProgress.currentLevel + 1, total: GAME_LEVELS.length, score: savedProgress.totalScore }}
        />
      )}

      <header className="game-header">
        <Link to="/hoa-hoc/lop-10" className="back-btn">
          <ArrowLeft size={20} /><span>Quay lại</span>
        </Link>
        <h1><Flame size={28} className="icon-flame" /> Oxi - Lưu Huỳnh</h1>
        <div className="header-score"><Trophy size={20} /><span>{totalScore}</span></div>
      </header>

      <div className="level-progress">
        <div className="progress-bar">
          <div className="progress-fill" style={{ width: `${((currentLevel + 1) / GAME_LEVELS.length) * 100}%` }} />
        </div>
        <div className="level-indicators">
          {GAME_LEVELS.map((l, idx) => (
            <div key={l.id} className={`level-dot ${idx < currentLevel ? 'completed' : idx === currentLevel ? 'current' : ''}`}>
              {idx < currentLevel ? <CheckCircle size={16} /> : idx + 1}
            </div>
          ))}
        </div>
      </div>

      {!gameComplete ? (
        <main className="game-main">
          <div className="level-card">
            <div className="level-header">
              <h2>{level.title}</h2>
              <span className="level-points"><Sparkles size={16} /> +{level.points} điểm</span>
            </div>
            <p className="level-description">{level.description}</p>
            <div className="level-content">{renderLevel()}</div>
          </div>
        </main>
      ) : (
        <div className="completion-screen">
          <div className="completion-content">
            <Award size={80} className="trophy-icon" />
            <h2>🎉 Xuất sắc!</h2>
            <p>Bạn đã hoàn thành tất cả thử thách!</p>
            <div className="final-score">
              <span className="score-label">Tổng điểm</span>
              <span className="score-value">{totalScore}/{maxScore}</span>
            </div>
            <div className="completion-stats">
              <div className="stat"><span className="stat-value">{completedLevels.length}</span><span className="stat-label">Level</span></div>
              <div className="stat"><span className="stat-value">{Math.round((totalScore / maxScore) * 100)}%</span><span className="stat-label">Chính xác</span></div>
            </div>
            <div className="completion-actions">
              <button className="btn-restart" onClick={handleRestart}><RotateCcw size={18} /> Chơi lại</button>
              <Link to="/hoa-hoc/lop-10" className="btn-back">Về trang chủ</Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Bai09_Oxi_LuuHuynh;
