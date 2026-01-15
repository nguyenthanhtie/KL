import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowLeft, Trophy, Star, Zap, CheckCircle, XCircle, 
  Beaker, FlaskConical, Atom, Sparkles, ChevronRight,
  RotateCcw, HelpCircle, Play, Award, AlertCircle
} from 'lucide-react';
import useChallengeProgress from '../../../hooks/useChallengeProgress';
import ResumeDialog from '../../../components/ResumeDialog';
import './CSS/Bai08_NhomHalogen.css';

// ==================== DỮ LIỆU CÁC CÂU HỎI ====================
const QUIZ_DATA = [
  // === PHẦN 1: TÍNH CHẤT VẬT LÝ ===
  {
    id: 1,
    type: 'color-match',
    category: 'physical',
    title: 'Nhận diện Halogen',
    question: 'Nối mỗi nguyên tố halogen với màu sắc đặc trưng của nó:',
    points: 10,
    items: [
      { id: 'F2', name: 'F₂ (Flo)', correctColor: 'pale-yellow' },
      { id: 'Cl2', name: 'Cl₂ (Clo)', correctColor: 'yellow-green' },
      { id: 'Br2', name: 'Br₂ (Brom)', correctColor: 'red-brown' },
      { id: 'I2', name: 'I₂ (Iot)', correctColor: 'purple-black' }
    ],
    colors: [
      { id: 'pale-yellow', name: 'Vàng nhạt', hex: '#FFFACD' },
      { id: 'yellow-green', name: 'Vàng lục', hex: '#9ACD32' },
      { id: 'red-brown', name: 'Nâu đỏ', hex: '#A52A2A' },
      { id: 'purple-black', name: 'Tím đen', hex: '#4B0082' }
    ],
    explanation: 'Màu sắc các halogen đậm dần từ F₂ đến I₂ do kích thước nguyên tử tăng, năng lượng kích thích electron giảm.'
  },
  {
    id: 2,
    type: 'sort-order',
    category: 'physical',
    title: 'Nhiệt độ sôi Halogen',
    question: 'Sắp xếp các halogen theo chiều TĂNG DẦN nhiệt độ sôi:',
    points: 10,
    items: ['I₂', 'Br₂', 'Cl₂', 'F₂'],
    correctOrder: ['F₂', 'Cl₂', 'Br₂', 'I₂'],
    explanation: 'Nhiệt độ sôi tăng từ F₂ → I₂ do khối lượng phân tử và lực Van der Waals tăng dần.'
  },
  {
    id: 3,
    type: 'multiple-choice',
    category: 'physical',
    title: 'Trạng thái vật chất',
    question: 'Ở điều kiện thường, halogen nào tồn tại ở trạng thái LỎNG?',
    points: 8,
    options: [
      { id: 'A', text: 'F₂', correct: false },
      { id: 'B', text: 'Cl₂', correct: false },
      { id: 'C', text: 'Br₂', correct: true },
      { id: 'D', text: 'I₂', correct: false }
    ],
    explanation: 'Br₂ là halogen duy nhất ở trạng thái lỏng (màu nâu đỏ) ở điều kiện thường. F₂ và Cl₂ là khí, I₂ là rắn.'
  },

  // === PHẦN 2: TÍNH CHẤT HÓA HỌC ===
  {
    id: 4,
    type: 'reaction-predict',
    category: 'chemical',
    title: 'Phản ứng với Kim loại',
    question: 'Khi đốt nóng dây sắt trong khí Clo, sản phẩm tạo thành là:',
    points: 10,
    reactants: ['Fe', 'Cl₂'],
    options: [
      { id: 'A', text: 'FeCl₂ (Sắt II clorua)', correct: false },
      { id: 'B', text: 'FeCl₃ (Sắt III clorua)', correct: true },
      { id: 'C', text: 'Fe₂Cl₃', correct: false },
      { id: 'D', text: 'FeClO₃', correct: false }
    ],
    equation: '2Fe + 3Cl₂ → 2FeCl₃',
    explanation: 'Cl₂ là chất oxi hóa mạnh, oxi hóa Fe lên mức oxi hóa cao nhất (+3), tạo FeCl₃.'
  },
  {
    id: 5,
    type: 'sort-order',
    category: 'chemical',
    title: 'Tính oxi hóa Halogen',
    question: 'Sắp xếp các halogen theo chiều GIẢM DẦN tính oxi hóa:',
    points: 12,
    items: ['Br₂', 'I₂', 'F₂', 'Cl₂'],
    correctOrder: ['F₂', 'Cl₂', 'Br₂', 'I₂'],
    explanation: 'Tính oxi hóa giảm từ F₂ → I₂ do bán kính nguyên tử tăng, khả năng nhận electron giảm.'
  },
  {
    id: 6,
    type: 'true-false',
    category: 'chemical',
    title: 'Phản ứng đẩy Halogen',
    question: 'Xác định các phát biểu sau là ĐÚNG hay SAI:',
    points: 12,
    statements: [
      { id: 1, text: 'Cl₂ có thể đẩy Br₂ ra khỏi dung dịch NaBr', correct: true },
      { id: 2, text: 'I₂ có thể đẩy Cl₂ ra khỏi dung dịch NaCl', correct: false },
      { id: 3, text: 'Br₂ có thể đẩy I₂ ra khỏi dung dịch KI', correct: true },
      { id: 4, text: 'F₂ có thể đẩy được tất cả các halogen khác', correct: true }
    ],
    explanation: 'Halogen mạnh hơn (tính oxi hóa cao hơn) sẽ đẩy halogen yếu hơn ra khỏi dung dịch muối.'
  },

  // === PHẦN 3: NHẬN BIẾT ION HALOGENUA ===
  {
    id: 7,
    type: 'color-match',
    category: 'identification',
    title: 'Nhận biết ion Halogenua',
    question: 'Nối mỗi ion halogenua với màu kết tủa khi tác dụng với AgNO₃:',
    points: 12,
    items: [
      { id: 'Cl-', name: 'Cl⁻ (Clorua)', correctColor: 'white' },
      { id: 'Br-', name: 'Br⁻ (Bromua)', correctColor: 'light-yellow' },
      { id: 'I-', name: 'I⁻ (Iodua)', correctColor: 'yellow' }
    ],
    colors: [
      { id: 'white', name: 'Trắng (AgCl)', hex: '#FFFFFF' },
      { id: 'light-yellow', name: 'Vàng nhạt (AgBr)', hex: '#FFFACD' },
      { id: 'yellow', name: 'Vàng đậm (AgI)', hex: '#FFD700' }
    ],
    explanation: 'Các kết tủa bạc halogenua: AgCl (trắng), AgBr (vàng nhạt), AgI (vàng đậm). F⁻ không tạo kết tủa với Ag⁺.'
  },
  {
    id: 8,
    type: 'lab-simulation',
    category: 'identification',
    title: 'Thí nghiệm nhận biết',
    question: 'Bạn có 3 lọ mất nhãn chứa NaCl, NaBr, NaI. Chọn đúng thứ tự các bước nhận biết:',
    points: 15,
    steps: [
      { id: 1, text: 'Lấy mẫu thử vào 3 ống nghiệm' },
      { id: 2, text: 'Nhỏ dung dịch AgNO₃ vào từng ống' },
      { id: 3, text: 'Quan sát màu kết tủa' },
      { id: 4, text: 'Kết luận: Trắng-NaCl, Vàng nhạt-NaBr, Vàng đậm-NaI' }
    ],
    correctOrder: [1, 2, 3, 4],
    explanation: 'Phương pháp nhận biết ion halogenua bằng AgNO₃ dựa vào màu sắc đặc trưng của kết tủa.'
  },

  // === PHẦN 4: ỨNG DỤNG VÀ ĐIỀU CHẾ ===
  {
    id: 9,
    type: 'multiple-choice',
    category: 'application',
    title: 'Ứng dụng của Halogen',
    question: 'Clo được sử dụng phổ biến nhất trong lĩnh vực nào?',
    points: 8,
    options: [
      { id: 'A', text: 'Sản xuất nhiên liệu', correct: false },
      { id: 'B', text: 'Khử trùng nước', correct: true },
      { id: 'C', text: 'Làm phân bón', correct: false },
      { id: 'D', text: 'Chế tạo pin', correct: false }
    ],
    explanation: 'Clo được dùng rộng rãi để khử trùng nước sinh hoạt, nước bể bơi do có tính oxi hóa mạnh, tiêu diệt vi khuẩn.'
  },
  {
    id: 10,
    type: 'fill-blank',
    category: 'application',
    title: 'Điều chế Clo',
    question: 'Hoàn thành phương trình điều chế Clo trong phòng thí nghiệm:',
    points: 15,
    template: 'MnO₂ + 4HCl(đặc) →(t°) ___ + Cl₂↑ + 2H₂O',
    blanks: [
      { id: 1, answer: 'MnCl₂', position: 0 }
    ],
    hint: 'MnO₂ là chất oxi hóa, HCl là chất khử. Mn bị khử từ +4 xuống +2.',
    explanation: 'Phản ứng: MnO₂ + 4HCl(đặc) → MnCl₂ + Cl₂ + 2H₂O. Đây là phản ứng oxi hóa - khử.'
  }
];

// ==================== COMPONENTS PHỤ ====================

// Component hiệu ứng đốm sáng
const SparkleEffect = ({ show }) => {
  if (!show) return null;
  return (
    <div className="sparkle-container">
      {[...Array(12)].map((_, i) => (
        <div key={i} className="sparkle" style={{ '--delay': `${i * 0.1}s`, '--angle': `${i * 30}deg` }} />
      ))}
    </div>
  );
};

// Component thanh tiến trình
const ProgressBar = ({ current, total, score, maxScore }) => (
  <div className="quiz-progress-bar">
    <div className="progress-info">
      <span className="progress-text">Câu {current + 1}/{total}</span>
      <span className="score-text"><Star size={16} /> {score}/{maxScore}</span>
    </div>
    <div className="progress-track">
      <div className="progress-fill" style={{ width: `${((current + 1) / total) * 100}%` }} />
      {[...Array(total)].map((_, i) => (
        <div 
          key={i} 
          className={`progress-dot ${i < current ? 'completed' : i === current ? 'current' : ''}`}
          style={{ left: `${((i + 0.5) / total) * 100}%` }}
        />
      ))}
    </div>
  </div>
);

// Component câu hỏi Multiple Choice
const MultipleChoiceQuestion = ({ data, selected, onSelect, disabled, result }) => (
  <div className="mc-options">
    {data.options.map(opt => (
      <button
        key={opt.id}
        className={`mc-option ${selected === opt.id ? 'selected' : ''} 
          ${result !== null ? (opt.correct ? 'correct' : selected === opt.id ? 'wrong' : '') : ''}`}
        onClick={() => !disabled && onSelect(opt.id)}
        disabled={disabled}
      >
        <span className="option-letter">{opt.id}</span>
        <span className="option-text">{opt.text}</span>
        {result !== null && opt.correct && <CheckCircle size={20} className="icon-correct" />}
        {result !== null && selected === opt.id && !opt.correct && <XCircle size={20} className="icon-wrong" />}
      </button>
    ))}
  </div>
);

// Component câu hỏi Color Match
const ColorMatchQuestion = ({ data, matches, onMatch, disabled, result }) => {
  const [selectedItem, setSelectedItem] = useState(null);

  const handleItemClick = (itemId) => {
    if (disabled) return;
    setSelectedItem(itemId);
  };

  const handleColorClick = (colorId) => {
    if (disabled || !selectedItem) return;
    onMatch(selectedItem, colorId);
    setSelectedItem(null);
  };

  return (
    <div className="color-match-container">
      <div className="match-items">
        {data.items.map(item => (
          <div 
            key={item.id}
            className={`match-item ${selectedItem === item.id ? 'selected' : ''} 
              ${matches[item.id] ? 'matched' : ''}
              ${result !== null ? (matches[item.id] === item.correctColor ? 'correct' : 'wrong') : ''}`}
            onClick={() => handleItemClick(item.id)}
          >
            <Atom size={18} />
            <span>{item.name}</span>
            {matches[item.id] && (
              <div 
                className="matched-color-dot" 
                style={{ backgroundColor: data.colors.find(c => c.id === matches[item.id])?.hex }}
              />
            )}
          </div>
        ))}
      </div>
      <div className="match-colors">
        {data.colors.map(color => (
          <button
            key={color.id}
            className={`color-btn ${Object.values(matches).includes(color.id) ? 'used' : ''}`}
            style={{ '--color': color.hex }}
            onClick={() => handleColorClick(color.id)}
            disabled={disabled || Object.values(matches).includes(color.id)}
          >
            <div className="color-preview" style={{ backgroundColor: color.hex }} />
            <span>{color.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

// Component câu hỏi Sort Order
const SortOrderQuestion = ({ data, order, onOrderChange, disabled, result }) => {
  const handleItemClick = (item) => {
    if (disabled) return;
    if (order.includes(item)) {
      onOrderChange(order.filter(i => i !== item));
    } else {
      onOrderChange([...order, item]);
    }
  };

  const clearOrder = () => {
    if (!disabled) onOrderChange([]);
  };

  return (
    <div className="sort-order-container">
      <div className="available-items">
        <span className="label">Chọn theo thứ tự:</span>
        <div className="items-row">
          {data.items.map(item => (
            <button
              key={item}
              className={`sort-item ${order.includes(item) ? 'selected' : ''}`}
              onClick={() => handleItemClick(item)}
              disabled={disabled}
            >
              {item}
              {order.includes(item) && <span className="order-badge">{order.indexOf(item) + 1}</span>}
            </button>
          ))}
        </div>
      </div>
      <div className="selected-order">
        <span className="label">Thứ tự đã chọn:</span>
        <div className="order-display">
          {order.length > 0 ? (
            order.map((item, idx) => (
              <React.Fragment key={item}>
                <span className={`order-item ${result !== null ? (item === data.correctOrder[idx] ? 'correct' : 'wrong') : ''}`}>
                  {item}
                </span>
                {idx < order.length - 1 && <ChevronRight size={16} />}
              </React.Fragment>
            ))
          ) : (
            <span className="placeholder">Nhấn vào các mục để sắp xếp</span>
          )}
        </div>
        {order.length > 0 && !disabled && (
          <button className="btn-clear" onClick={clearOrder}>
            <RotateCcw size={14} /> Xóa
          </button>
        )}
      </div>
    </div>
  );
};

// Component câu hỏi True/False
const TrueFalseQuestion = ({ data, answers, onAnswer, disabled, result }) => (
  <div className="tf-container">
    {data.statements.map(stmt => (
      <div 
        key={stmt.id} 
        className={`tf-statement ${result !== null ? (answers[stmt.id] === stmt.correct ? 'correct' : 'wrong') : ''}`}
      >
        <span className="statement-text">{stmt.text}</span>
        <div className="tf-buttons">
          <button
            className={`tf-btn ${answers[stmt.id] === true ? 'selected true' : ''}`}
            onClick={() => !disabled && onAnswer(stmt.id, true)}
            disabled={disabled}
          >
            Đúng
          </button>
          <button
            className={`tf-btn ${answers[stmt.id] === false ? 'selected false' : ''}`}
            onClick={() => !disabled && onAnswer(stmt.id, false)}
            disabled={disabled}
          >
            Sai
          </button>
        </div>
      </div>
    ))}
  </div>
);

// Component câu hỏi Fill Blank
const FillBlankQuestion = ({ data, answers, onAnswer, disabled, result }) => {
  const parts = data.template.split('___');
  
  return (
    <div className="fill-blank-container">
      <div className="equation-display">
        {parts.map((part, idx) => (
          <React.Fragment key={idx}>
            <span className="equation-part">{part}</span>
            {idx < parts.length - 1 && (
              <input
                type="text"
                className={`blank-input ${result !== null ? (answers[idx]?.toLowerCase() === data.blanks[idx].answer.toLowerCase() ? 'correct' : 'wrong') : ''}`}
                value={answers[idx] || ''}
                onChange={(e) => !disabled && onAnswer(idx, e.target.value)}
                placeholder="?"
                disabled={disabled}
              />
            )}
          </React.Fragment>
        ))}
      </div>
      {data.hint && <div className="hint-text"><HelpCircle size={14} /> {data.hint}</div>}
    </div>
  );
};

// Component câu hỏi Lab Simulation
const LabSimulationQuestion = ({ data, order, onOrderChange, disabled, result }) => {
  const handleStepClick = (stepId) => {
    if (disabled) return;
    if (order.includes(stepId)) {
      onOrderChange(order.filter(id => id !== stepId));
    } else {
      onOrderChange([...order, stepId]);
    }
  };

  return (
    <div className="lab-sim-container">
      <div className="lab-visual">
        <div className="lab-bench">
          <FlaskConical size={40} className="flask-icon" />
          <Beaker size={40} className="beaker-icon" />
        </div>
      </div>
      <div className="steps-list">
        {data.steps.map(step => (
          <button
            key={step.id}
            className={`step-btn ${order.includes(step.id) ? 'selected' : ''}
              ${result !== null ? (order.indexOf(step.id) === data.correctOrder.indexOf(step.id) && order.includes(step.id) ? 'correct' : order.includes(step.id) ? 'wrong' : '') : ''}`}
            onClick={() => handleStepClick(step.id)}
            disabled={disabled}
          >
            {order.includes(step.id) && <span className="step-number">{order.indexOf(step.id) + 1}</span>}
            <span className="step-text">{step.text}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

// Component hiển thị phương trình
const EquationDisplay = ({ equation }) => (
  <div className="equation-box">
    <Zap size={16} />
    <span>Phương trình: <strong>{equation}</strong></span>
  </div>
);

// ==================== COMPONENT CHÍNH ====================
const Bai08_NhomHalogen = () => {
  const { hasProgress, saveProgress, clearProgress, getProgress, completeChallenge } = useChallengeProgress('halogen-10-v2', {
    challengeId: 8,
    programId: 'chemistry',
    grade: 10
  });
  
  // States
  const [startTime] = useState(() => Date.now());
  const [isCompleted, setIsCompleted] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [completed, setCompleted] = useState([]);
  const [showResult, setShowResult] = useState(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);
  const [showResumeDialog, setShowResumeDialog] = useState(false);
  const [savedProgress, setSavedProgress] = useState(null);
  
  // Answer states
  const [mcAnswer, setMcAnswer] = useState(null);
  const [colorMatches, setColorMatches] = useState({});
  const [sortOrder, setSortOrder] = useState([]);
  const [tfAnswers, setTfAnswers] = useState({});
  const [fillAnswers, setFillAnswers] = useState({});
  const [labOrder, setLabOrder] = useState([]);

  const currentQuestion = QUIZ_DATA[currentIndex];
  const totalPoints = QUIZ_DATA.reduce((sum, q) => sum + q.points, 0);

  // Load saved progress - chỉ chạy 1 lần khi mount
  useEffect(() => {
    if (hasProgress) {
      const saved = getProgress();
      if (saved) {
        setSavedProgress(saved);
        setShowResumeDialog(true);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Handle resume dialog actions
  const handleResume = () => {
    if (savedProgress) {
      setCurrentIndex(savedProgress.currentIndex || 0);
      setScore(savedProgress.score || 0);
      setCompleted(savedProgress.completed || []);
    }
    setShowResumeDialog(false);
  };

  const handleRestart = () => {
    clearProgress();
    setCurrentIndex(0);
    setScore(0);
    setCompleted([]);
    resetAnswerStates();
    setShowResumeDialog(false);
  };

  // Reset answer states when changing question
  const resetAnswerStates = useCallback(() => {
    setMcAnswer(null);
    setColorMatches({});
    setSortOrder([]);
    setTfAnswers({});
    setFillAnswers({});
    setLabOrder([]);
    setShowResult(null);
    setShowExplanation(false);
  }, []);

  // Check answer
  const checkAnswer = () => {
    let isCorrect = false;
    const q = currentQuestion;

    switch (q.type) {
      case 'multiple-choice':
      case 'reaction-predict':
        const correctOpt = q.options.find(o => o.correct);
        isCorrect = mcAnswer === correctOpt?.id;
        break;

      case 'color-match':
        isCorrect = q.items.every(item => colorMatches[item.id] === item.correctColor);
        break;

      case 'sort-order':
        isCorrect = JSON.stringify(sortOrder) === JSON.stringify(q.correctOrder);
        break;

      case 'true-false':
        isCorrect = q.statements.every(stmt => tfAnswers[stmt.id] === stmt.correct);
        break;

      case 'fill-blank':
        isCorrect = q.blanks.every((blank, idx) => 
          fillAnswers[idx]?.toLowerCase().trim() === blank.answer.toLowerCase()
        );
        break;

      case 'lab-simulation':
        isCorrect = JSON.stringify(labOrder) === JSON.stringify(q.correctOrder);
        break;

      default:
        break;
    }

    setShowResult(isCorrect);
    
    if (isCorrect && !completed.includes(q.id)) {
      const newScore = score + q.points;
      const newCompleted = [...completed, q.id];
      setScore(newScore);
      setCompleted(newCompleted);
      setShowCelebration(true);
      setTimeout(() => setShowCelebration(false), 1500);
      saveProgress({ currentIndex, score: newScore, completed: newCompleted });
    }
  };

  // Go to next question
  const nextQuestion = () => {
    resetAnswerStates();
    if (currentIndex < QUIZ_DATA.length - 1) {
      const nextIdx = currentIndex + 1;
      setCurrentIndex(nextIdx);
      saveProgress({ currentIndex: nextIdx, score, completed });
    }
  };

  // Restart quiz
  const restartQuiz = () => {
    resetAnswerStates();
    setCurrentIndex(0);
    setScore(0);
    setCompleted([]);
    clearProgress();
  };

  // Render question content based on type
  const renderQuestionContent = () => {
    const q = currentQuestion;
    const disabled = showResult !== null;

    switch (q.type) {
      case 'multiple-choice':
      case 'reaction-predict':
        return (
          <>
            {q.reactants && (
              <div className="reactants-display">
                <Beaker size={20} />
                <span>Chất phản ứng: {q.reactants.join(' + ')}</span>
              </div>
            )}
            <MultipleChoiceQuestion
              data={q}
              selected={mcAnswer}
              onSelect={setMcAnswer}
              disabled={disabled}
              result={showResult}
            />
          </>
        );

      case 'color-match':
        return (
          <ColorMatchQuestion
            data={q}
            matches={colorMatches}
            onMatch={(itemId, colorId) => setColorMatches(prev => ({ ...prev, [itemId]: colorId }))}
            disabled={disabled}
            result={showResult}
          />
        );

      case 'sort-order':
        return (
          <SortOrderQuestion
            data={q}
            order={sortOrder}
            onOrderChange={setSortOrder}
            disabled={disabled}
            result={showResult}
          />
        );

      case 'true-false':
        return (
          <TrueFalseQuestion
            data={q}
            answers={tfAnswers}
            onAnswer={(stmtId, value) => setTfAnswers(prev => ({ ...prev, [stmtId]: value }))}
            disabled={disabled}
            result={showResult}
          />
        );

      case 'fill-blank':
        return (
          <FillBlankQuestion
            data={q}
            answers={fillAnswers}
            onAnswer={(idx, value) => setFillAnswers(prev => ({ ...prev, [idx]: value }))}
            disabled={disabled}
            result={showResult}
          />
        );

      case 'lab-simulation':
        return (
          <LabSimulationQuestion
            data={q}
            order={labOrder}
            onOrderChange={setLabOrder}
            disabled={disabled}
            result={showResult}
          />
        );

      default:
        return null;
    }
  };

  // Check if answer is ready to submit
  const canSubmit = () => {
    const q = currentQuestion;
    switch (q.type) {
      case 'multiple-choice':
      case 'reaction-predict':
        return mcAnswer !== null;
      case 'color-match':
        return Object.keys(colorMatches).length === q.items.length;
      case 'sort-order':
        return sortOrder.length === q.items.length;
      case 'true-false':
        return Object.keys(tfAnswers).length === q.statements.length;
      case 'fill-blank':
        return q.blanks.every((_, idx) => fillAnswers[idx]?.trim());
      case 'lab-simulation':
        return labOrder.length === q.steps.length;
      default:
        return false;
    }
  };

  const isLastQuestion = currentIndex === QUIZ_DATA.length - 1;
  const isQuizComplete = isLastQuestion && showResult !== null;

  return (
    <div className="halogen-quiz-game">
      {/* Resume Dialog */}
      {showResumeDialog && savedProgress && (
        <ResumeDialog
          show={showResumeDialog}
          onResume={handleResume}
          onRestart={handleRestart}
          progressInfo={{
            current: savedProgress.currentIndex + 1,
            total: QUIZ_DATA.length,
            score: savedProgress.score
          }}
        />
      )}

      {/* Header */}
      <header className="quiz-header">
        <Link to="/hoa-hoc/lop-10" className="back-btn">
          <ArrowLeft size={20} />
          <span>Quay lại</span>
        </Link>
        <h1>
          <Atom size={28} className="icon-spin" />
          Nhóm Halogen
        </h1>
        <div className="header-score">
          <Trophy size={20} />
          <span>{score}</span>
        </div>
      </header>

      {/* Progress */}
      <ProgressBar 
        current={currentIndex} 
        total={QUIZ_DATA.length} 
        score={score}
        maxScore={totalPoints}
      />

      {/* Main Content */}
      <main className="quiz-main">
        <div className="question-card">
          {/* Question Header */}
          <div className="question-header">
            <span className={`category-badge ${currentQuestion.category}`}>
              {currentQuestion.category === 'physical' && '🔬 Tính chất vật lý'}
              {currentQuestion.category === 'chemical' && '⚗️ Tính chất hóa học'}
              {currentQuestion.category === 'identification' && '🧪 Nhận biết'}
              {currentQuestion.category === 'application' && '🏭 Ứng dụng'}
            </span>
            <span className="points-badge">
              <Sparkles size={14} />
              +{currentQuestion.points} điểm
            </span>
          </div>

          {/* Question Title & Content */}
          <h2 className="question-title">{currentQuestion.title}</h2>
          <p className="question-text">{currentQuestion.question}</p>

          {/* Question Content */}
          <div className="question-content">
            {renderQuestionContent()}
          </div>

          {/* Equation (if any) */}
          {currentQuestion.equation && showResult !== null && (
            <EquationDisplay equation={currentQuestion.equation} />
          )}

          {/* Result & Explanation */}
          {showResult !== null && (
            <div className={`result-box ${showResult ? 'correct' : 'wrong'}`}>
              {showResult ? (
                <>
                  <CheckCircle size={24} />
                  <span>Chính xác! +{currentQuestion.points} điểm</span>
                </>
              ) : (
                <>
                  <XCircle size={24} />
                  <span>Chưa đúng! Thử xem giải thích nhé.</span>
                </>
              )}
            </div>
          )}

          {showResult !== null && (
            <div className="explanation-box">
              <button 
                className="explanation-toggle"
                onClick={() => setShowExplanation(!showExplanation)}
              >
                <HelpCircle size={16} />
                {showExplanation ? 'Ẩn giải thích' : 'Xem giải thích'}
              </button>
              {showExplanation && (
                <p className="explanation-text">{currentQuestion.explanation}</p>
              )}
            </div>
          )}

          {/* Actions */}
          <div className="question-actions">
            {showResult === null ? (
              <button 
                className="btn-check"
                onClick={checkAnswer}
                disabled={!canSubmit()}
              >
                <Play size={18} />
                Kiểm tra
              </button>
            ) : (
              <button 
                className="btn-next"
                onClick={isLastQuestion ? restartQuiz : nextQuestion}
              >
                {isLastQuestion ? (
                  <>
                    <RotateCcw size={18} />
                    Làm lại
                  </>
                ) : (
                  <>
                    Câu tiếp
                    <ChevronRight size={18} />
                  </>
                )}
              </button>
            )}
          </div>
        </div>

        {/* Celebration Effect */}
        <SparkleEffect show={showCelebration} />
      </main>

      {/* Completion Summary */}
      {isQuizComplete && (() => {
        // Lưu kết quả khi hoàn thành
        if (!isCompleted) {
          setIsCompleted(true);
          const percentage = Math.round((score / totalPoints) * 100);
          const stars = percentage >= 80 ? 3 : percentage >= 50 ? 2 : 1;
          completeChallenge({
            score,
            maxScore: totalPoints,
            percentage,
            stars,
            timeSpent: Math.floor((Date.now() - startTime) / 1000),
            correctAnswers: completed.length,
            totalQuestions: QUIZ_DATA.length
          });
        }
        return null;
      })()}
      {isQuizComplete && (
        <div className="completion-modal">
          <div className="completion-content">
            <Award size={64} className="trophy-icon" />
            <h2>🎉 Hoàn thành!</h2>
            <div className="final-score">
              <span className="score-label">Tổng điểm</span>
              <span className="score-value">{score}/{totalPoints}</span>
            </div>
            <div className="completion-stats">
              <div className="stat">
                <span className="stat-value">{completed.length}</span>
                <span className="stat-label">Câu đúng</span>
              </div>
              <div className="stat">
                <span className="stat-value">{QUIZ_DATA.length - completed.length}</span>
                <span className="stat-label">Câu sai</span>
              </div>
              <div className="stat">
                <span className="stat-value">{Math.round((score / totalPoints) * 100)}%</span>
                <span className="stat-label">Tỷ lệ</span>
              </div>
            </div>
            <div className="completion-actions">
              <button className="btn-restart" onClick={restartQuiz}>
                <RotateCcw size={18} />
                Làm lại
              </button>
              <Link to="/hoa-hoc/lop-10" className="btn-back">
                Về trang chủ
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Bai08_NhomHalogen;
