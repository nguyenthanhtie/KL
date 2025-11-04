import React, { useState, useCallback, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Trophy, Target, Lightbulb, Droplet, TestTube, Beaker, FlaskConical, AlertCircle } from 'lucide-react';
import './NhanBietDungDich.css';

// Dữ liệu về các ion và dấu hiệu nhận biết
const ionDatabase = {
  // Cation (ion dương)
  'Fe2+': {
    name: 'Sắt (II)',
    formula: 'Fe²⁺',
    color: 'lục nhạt',
    solutionColor: '#c8e6c9',
    reactions: [
      { reagent: 'NaOH', result: 'Kết tủa trắng xanh Fe(OH)₂, hóa nâu ngoài không khí', precipitateColor: '#b2dfdb', equation: 'Fe²⁺ + 2OH⁻ → Fe(OH)₂↓' },
      { reagent: 'K₃[Fe(CN)₆]', result: 'Kết tủa xanh đậm (xanh tím)', precipitateColor: '#1976d2', equation: '3Fe²⁺ + 2[Fe(CN)₆]³⁻ → Fe₃[Fe(CN)₆]₂↓' }
    ]
  },
  'Fe3+': {
    name: 'Sắt (III)',
    formula: 'Fe³⁺',
    color: 'vàng nâu',
    solutionColor: '#ffb74d',
    reactions: [
      { reagent: 'NaOH', result: 'Kết tủa nâu đỏ Fe(OH)₃', precipitateColor: '#8d6e63', equation: 'Fe³⁺ + 3OH⁻ → Fe(OH)₃↓' },
      { reagent: 'KSCN', result: 'Dung dịch chuyển màu đỏ máu', precipitateColor: '#c62828', equation: 'Fe³⁺ + SCN⁻ → [Fe(SCN)]²⁺' },
      { reagent: 'K₄[Fe(CN)₆]', result: 'Kết tủa xanh đậm (xanh tím)', precipitateColor: '#0d47a1', equation: '4Fe³⁺ + 3[Fe(CN)₆]⁴⁻ → Fe₄[Fe(CN)₆]₃↓' }
    ]
  },
  'Cu2+': {
    name: 'Đồng (II)',
    formula: 'Cu²⁺',
    color: 'xanh lam',
    solutionColor: '#42a5f5',
    reactions: [
      { reagent: 'NaOH', result: 'Kết tủa xanh lam Cu(OH)₂', precipitateColor: '#1976d2', equation: 'Cu²⁺ + 2OH⁻ → Cu(OH)₂↓' },
      { reagent: 'NH₃ (dư)', result: 'Dung dịch xanh thẫm [Cu(NH₃)₄]²⁺', precipitateColor: '#0d47a1', equation: 'Cu²⁺ + 4NH₃ → [Cu(NH₃)₄]²⁺' },
      { reagent: 'H₂S', result: 'Kết tủa đen CuS', precipitateColor: '#212121', equation: 'Cu²⁺ + H₂S → CuS↓ + 2H⁺' }
    ]
  },
  'Zn2+': {
    name: 'Kẽm',
    formula: 'Zn²⁺',
    color: 'không màu',
    solutionColor: '#e3f2fd',
    reactions: [
      { reagent: 'NaOH (vừa đủ)', result: 'Kết tủa trắng Zn(OH)₂', precipitateColor: '#ffffff', equation: 'Zn²⁺ + 2OH⁻ → Zn(OH)₂↓' },
      { reagent: 'NaOH (dư)', result: 'Kết tủa tan, tạo dung dịch không màu', precipitateColor: 'transparent', equation: 'Zn(OH)₂ + 2OH⁻ → [Zn(OH)₄]²⁻' },
      { reagent: 'H₂S', result: 'Kết tủa trắng ZnS', precipitateColor: '#f5f5f5', equation: 'Zn²⁺ + H₂S → ZnS↓ + 2H⁺' }
    ]
  },
  'Al3+': {
    name: 'Nhôm',
    formula: 'Al³⁺',
    color: 'không màu',
    solutionColor: '#e3f2fd',
    reactions: [
      { reagent: 'NaOH (vừa đủ)', result: 'Kết tủa trắng keo Al(OH)₃', precipitateColor: '#ffffff', equation: 'Al³⁺ + 3OH⁻ → Al(OH)₃↓' },
      { reagent: 'NaOH (dư)', result: 'Kết tủa tan, tạo dung dịch không màu', precipitateColor: 'transparent', equation: 'Al(OH)₃ + OH⁻ → [Al(OH)₄]⁻' }
    ]
  },
  'Ag+': {
    name: 'Bạc',
    formula: 'Ag⁺',
    color: 'không màu',
    solutionColor: '#e3f2fd',
    reactions: [
      { reagent: 'HCl', result: 'Kết tủa trắng AgCl, tan trong NH₃', precipitateColor: '#ffffff', equation: 'Ag⁺ + Cl⁻ → AgCl↓' },
      { reagent: 'NaOH', result: 'Kết tủa nâu đen Ag₂O', precipitateColor: '#3e2723', equation: '2Ag⁺ + 2OH⁻ → Ag₂O↓ + H₂O' },
      { reagent: 'H₂S', result: 'Kết tủa đen Ag₂S', precipitateColor: '#212121', equation: '2Ag⁺ + H₂S → Ag₂S↓ + 2H⁺' }
    ]
  },
  'Ba2+': {
    name: 'Bari',
    formula: 'Ba²⁺',
    color: 'không màu',
    solutionColor: '#e3f2fd',
    reactions: [
      { reagent: 'H₂SO₄', result: 'Kết tủa trắng BaSO₄', precipitateColor: '#ffffff', equation: 'Ba²⁺ + SO₄²⁻ → BaSO₄↓' },
      { reagent: 'Na₂CO₃', result: 'Kết tủa trắng BaCO₃', precipitateColor: '#ffffff', equation: 'Ba²⁺ + CO₃²⁻ → BaCO₃↓' }
    ]
  },
  'Ca2+': {
    name: 'Canxi',
    formula: 'Ca²⁺',
    color: 'không màu',
    solutionColor: '#e3f2fd',
    reactions: [
      { reagent: 'Na₂CO₃', result: 'Kết tủa trắng CaCO₃', precipitateColor: '#ffffff', equation: 'Ca²⁺ + CO₃²⁻ → CaCO₃↓' },
      { reagent: 'H₂C₂O₄', result: 'Kết tủa trắng CaC₂O₄', precipitateColor: '#ffffff', equation: 'Ca²⁺ + C₂O₄²⁻ → CaC₂O₄↓' }
    ]
  },
  'Pb2+': {
    name: 'Chì',
    formula: 'Pb²⁺',
    color: 'không màu',
    solutionColor: '#e3f2fd',
    reactions: [
      { reagent: 'HCl', result: 'Kết tủa trắng PbCl₂, tan trong nước nóng', precipitateColor: '#ffffff', equation: 'Pb²⁺ + 2Cl⁻ → PbCl₂↓' },
      { reagent: 'H₂SO₄', result: 'Kết tủa trắng PbSO₄', precipitateColor: '#ffffff', equation: 'Pb²⁺ + SO₄²⁻ → PbSO₄↓' },
      { reagent: 'H₂S', result: 'Kết tủa đen PbS', precipitateColor: '#212121', equation: 'Pb²⁺ + H₂S → PbS↓ + 2H⁺' }
    ]
  }
};

// Các câu hỏi dạng thí nghiệm
const experimentQuestions = [
  {
    id: 1,
    unknownSolution: 'Cu2+',
    availableReagents: ['NaOH', 'NH₃ (dư)', 'H₂S', 'HCl'],
    minTests: 1,
    hint: 'Dung dịch này có màu xanh lam đặc trưng',
    difficulty: 'easy'
  },
  {
    id: 2,
    unknownSolution: 'Fe3+',
    availableReagents: ['NaOH', 'KSCN', 'K₄[Fe(CN)₆]', 'HCl'],
    minTests: 1,
    hint: 'Dung dịch có màu vàng nâu',
    difficulty: 'easy'
  },
  {
    id: 3,
    unknownSolution: 'Ag+',
    availableReagents: ['HCl', 'NaOH', 'H₂S', 'NH₃'],
    minTests: 2,
    hint: 'Kim loại quý, dung dịch không màu',
    difficulty: 'medium'
  },
  {
    id: 4,
    unknownSolution: 'Ba2+',
    availableReagents: ['H₂SO₄', 'Na₂CO₃', 'HCl', 'NaOH'],
    minTests: 1,
    hint: 'Kim loại kiềm thổ, tạo kết tủa trắng với nhiều thuốc thử',
    difficulty: 'medium'
  },
  {
    id: 5,
    unknownSolution: 'Fe2+',
    availableReagents: ['NaOH', 'K₃[Fe(CN)₆]', 'KSCN', 'H₂SO₄'],
    minTests: 2,
    hint: 'Dung dịch lục nhạt, kết tủa dễ bị oxi hóa',
    difficulty: 'medium'
  },
  {
    id: 6,
    unknownSolution: 'Zn2+',
    availableReagents: ['NaOH (vừa đủ)', 'NaOH (dư)', 'H₂S', 'NH₃'],
    minTests: 2,
    hint: 'Kim loại lưỡng tính, dung dịch không màu',
    difficulty: 'hard'
  },
  {
    id: 7,
    unknownSolution: 'Al3+',
    availableReagents: ['NaOH (vừa đủ)', 'NaOH (dư)', 'NH₃', 'HCl'],
    minTests: 2,
    hint: 'Kim loại lưỡng tính, tạo kết tủa keo',
    difficulty: 'hard'
  },
  {
    id: 8,
    unknownSolution: 'Pb2+',
    availableReagents: ['HCl', 'H₂SO₄', 'H₂S', 'NaOH'],
    minTests: 2,
    hint: 'Kim loại nặng, độc, kết tủa có nhiều màu',
    difficulty: 'hard'
  }
];

// Câu hỏi trò chơi (giữ lại cho chế độ cũ nếu cần)
const gameQuestions = [
  {
    id: 1,
    question: "Nhỏ dung dịch NaOH vào dung dịch A, thấy xuất hiện kết tủa xanh lam. Dung dịch A chứa ion gì?",
    options: ['Fe2+', 'Cu2+', 'Zn2+', 'Al3+'],
    correctAnswer: 'Cu2+',
    explanation: "Kết tủa xanh lam Cu(OH)2 là dấu hiệu đặc trưng của ion Cu2+",
    hint: "Màu xanh lam đặc trưng của ion kim loại nào?"
  },
  {
    id: 2,
    question: "Cho dung dịch KSCN vào dung dịch B, dung dịch chuyển sang màu đỏ máu. Dung dịch B chứa ion nào?",
    options: ['Fe2+', 'Fe3+', 'Cu2+', 'Ag+'],
    correctAnswer: 'Fe3+',
    explanation: "Phản ứng tạo phức màu đỏ máu [Fe(SCN)]2+ là phản ứng đặc trưng nhận biết Fe3+",
    hint: "Phản ứng tạo màu đỏ máu đặc trưng với ion sắt"
  },
  {
    id: 3,
    question: "Thêm dung dịch AgNO3 vào dung dịch C, xuất hiện kết tủa trắng, tan trong dung dịch NH3. Ion nào có trong dung dịch C?",
    options: ['Br-', 'Cl-', 'I-', 'SO42-'],
    correctAnswer: 'Cl-',
    explanation: "Kết tủa trắng AgCl tan trong NH3, trong khi AgBr và AgI không tan",
    hint: "Kết tủa bạc halogenua nào tan trong amoniac?"
  },
  {
    id: 4,
    question: "Cho HCl vào dung dịch D, thấy sủi bọt khí làm đục nước vôi trong. Dung dịch D chứa ion gì?",
    options: ['SO42-', 'CO32-', 'NO3-', 'Cl-'],
    correctAnswer: 'CO32-',
    explanation: "CO32- + 2HCl → CO2↑ + H2O + 2Cl-. Khí CO2 làm đục nước vôi trong",
    hint: "Ion nào phản ứng với axit tạo khí làm đục nước vôi?"
  },
  {
    id: 5,
    question: "Nhỏ dung dịch NaOH vào dung dịch E, thấy kết tủa trắng xanh, để ngoài không khí chuyển nâu. Ion nào trong dung dịch E?",
    options: ['Fe2+', 'Fe3+', 'Zn2+', 'Al3+'],
    correctAnswer: 'Fe2+',
    explanation: "Fe(OH)2 màu trắng xanh bị oxi hóa thành Fe(OH)3 màu nâu đỏ ngoài không khí",
    hint: "Kết tủa hydroxit nào bị oxi hóa ngoài không khí?"
  },
  {
    id: 6,
    question: "Thêm BaCl2 vào dung dịch F, xuất hiện kết tủa trắng không tan trong axit. Dung dịch F chứa ion nào?",
    options: ['CO32-', 'SO42-', 'Cl-', 'NO3-'],
    correctAnswer: 'SO42-',
    explanation: "BaSO4 là kết tủa trắng không tan trong axit, còn BaCO3 tan trong axit",
    hint: "Muối bari nào không tan trong axit?"
  },
  {
    id: 7,
    question: "Cho dung dịch NH3 dư vào dung dịch G màu xanh lam, dung dịch chuyển sang màu xanh thẫm. Ion nào có trong G?",
    options: ['Ni2+', 'Cu2+', 'Co2+', 'Fe2+'],
    correctAnswer: 'Cu2+',
    explanation: "Cu2+ tạo phức [Cu(NH3)4]2+ màu xanh thẫm với NH3 dư",
    hint: "Ion nào tạo phức màu xanh thẫm với amoniac?"
  },
  {
    id: 8,
    question: "Thêm H2S vào dung dịch H, xuất hiện kết tủa đen. Ion kim loại nào có trong dung dịch H?",
    options: ['Zn2+', 'Al3+', 'Cu2+', 'Ca2+'],
    correctAnswer: 'Cu2+',
    explanation: "CuS là kết tủa màu đen. ZnS màu trắng, Al3+ và Ca2+ không tạo kết tủa với H2S",
    hint: "Sunfua kim loại nào có màu đen?"
  },
  {
    id: 9,
    question: "Cho NaOH vào dung dịch I, thấy kết tủa trắng, thêm NaOH dư thì kết tủa tan. Ion nào trong dung dịch I?",
    options: ['Cu2+', 'Fe3+', 'Al3+', 'Ag+'],
    correctAnswer: 'Al3+',
    explanation: "Al(OH)3 có tính lưỡng tính, tan trong NaOH dư tạo [Al(OH)4]-",
    hint: "Hidroxit kim loại nào có tính lưỡng tính?"
  },
  {
    id: 10,
    question: "Cho AgNO3 vào dung dịch J, thấy kết tủa vàng. Ion nào có trong dung dịch J?",
    options: ['Cl-', 'Br-', 'I-', 'SO42-'],
    correctAnswer: 'I-',
    explanation: "AgI có màu vàng, AgCl trắng, AgBr vàng nhạt",
    hint: "Muối bạc halogenua nào có màu vàng đậm nhất?"
  },
  {
    id: 11,
    question: "Nhỏ dung dịch NaOH vào dung dịch K, thấy kết tủa nâu đỏ. Dung dịch K chứa ion gì?",
    options: ['Fe2+', 'Fe3+', 'Cu2+', 'Zn2+'],
    correctAnswer: 'Fe3+',
    explanation: "Fe(OH)3 có màu nâu đỏ đặc trưng",
    hint: "Hidroxit sắt nào có màu nâu đỏ?"
  },
  {
    id: 12,
    question: "Cho HCl vào dung dịch L, có khí thoát ra mùi trứng thối. Ion nào trong dung dịch L?",
    options: ['SO42-', 'S2-', 'CO32-', 'NO3-'],
    correctAnswer: 'S2-',
    explanation: "S2- + 2HCl → H2S↑ + 2Cl-. H2S có mùi trứng thối đặc trưng",
    hint: "Khí nào có mùi trứng thối?"
  },
  {
    id: 13,
    question: "Thêm dung dịch Pb(NO3)2 vào dung dịch M, xuất hiện kết tủa đen. Ion nào có trong M?",
    options: ['Cl-', 'SO42-', 'S2-', 'CO32-'],
    correctAnswer: 'S2-',
    explanation: "PbS là kết tủa màu đen đặc trưng",
    hint: "Muối chì nào có màu đen?"
  },
  {
    id: 14,
    question: "Cho dung dịch Na2CO3 vào dung dịch N, thấy kết tủa trắng. Sau đó cho dung dịch H2SO4, kết tủa không tan. Ion nào trong N?",
    options: ['Ca2+', 'Ba2+', 'Mg2+', 'Zn2+'],
    correctAnswer: 'Ba2+',
    explanation: "BaCO3 + H2SO4 → BaSO4↓ + CO2 + H2O. BaSO4 không tan trong axit",
    hint: "Cacbonat kim loại nào chuyển thành sunfat không tan trong axit?"
  },
  {
    id: 15,
    question: "Cho dung dịch Cl2 vào dung dịch O không màu, dung dịch chuyển sang màu nâu đỏ. Ion nào trong dung dịch O?",
    options: ['Cl-', 'Br-', 'I-', 'SO42-'],
    correctAnswer: 'Br-',
    explanation: "Cl2 + 2Br- → Br2 + 2Cl-. Br2 có màu nâu đỏ",
    hint: "Halogen đơn chất nào có màu nâu đỏ?"
  }
];

const NhanBietDungDich = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [gameCompleted, setGameCompleted] = useState(false);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  
  // Lab experiment states
  const [selectedReagent, setSelectedReagent] = useState(null);
  const [testResults, setTestResults] = useState([]);
  const [isDropping, setIsDropping] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [showAnswer, setShowAnswer] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [canSubmit, setCanSubmit] = useState(false);
  
  const currentQ = experimentQuestions[currentQuestion];
  const unknownIon = ionDatabase[currentQ.unknownSolution];

  
  // Xử lý nhỏ thuốc thử
  const handleDropReagent = (reagent) => {
    if (isDropping || showAnswer) return;
    
    setSelectedReagent(reagent);
    setIsDropping(true);
    
    // Tìm phản ứng tương ứng
    const reaction = unknownIon.reactions.find(r => r.reagent === reagent);
    
    setTimeout(() => {
      if (reaction) {
        setTestResults([...testResults, {
          reagent: reagent,
          result: reaction.result,
          color: reaction.precipitateColor,
          equation: reaction.equation,
          hasBubbles: reaction.result.includes('Sủi bọt') || reaction.result.includes('khí')
        }]);
      }
      setIsDropping(false);
      setSelectedReagent(null);
      
      // Kiểm tra xem đã đủ số lần test chưa
      if (testResults.length + 1 >= currentQ.minTests) {
        setCanSubmit(true);
      }
    }, 1500);
  };

  // Xử lý chọn đáp án
  const handleSelectAnswer = (ionKey) => {
    if (!canSubmit) return;
    setSelectedAnswer(ionKey);
  };

  // Xử lý submit đáp án
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

  // Chuyển câu tiếp theo
  const handleNextQuestion = () => {
    if (currentQuestion < experimentQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setTestResults([]);
      setSelectedAnswer(null);
      setShowAnswer(false);
      setShowHint(false);
      setCanSubmit(false);
    } else {
      setGameCompleted(true);
    }
  };

  // Reset thí nghiệm
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

  // Lấy danh sách các ion có thể chọn
  const getIonOptions = () => {
    const allIons = ['Fe2+', 'Fe3+', 'Cu2+', 'Zn2+', 'Al3+', 'Ag+', 'Ba2+', 'Pb2+'];
    // Đảm bảo đáp án đúng luôn có trong danh sách
    const correctIon = currentQ.unknownSolution;
    let options = [correctIon];
    
    // Thêm 3 đáp án nhiễu ngẫu nhiên
    const otherIons = allIons.filter(ion => ion !== correctIon);
    while (options.length < 4) {
      const randomIon = otherIons[Math.floor(Math.random() * otherIons.length)];
      if (!options.includes(randomIon)) {
        options.push(randomIon);
      }
    }
    
    // Trộn ngẫu nhiên
    return options.sort(() => Math.random() - 0.5);
  };

  const ionOptions = getIonOptions();

  if (gameCompleted) {
    const percentage = (correctAnswers / experimentQuestions.length * 100).toFixed(0);
    const maxScore = experimentQuestions.reduce((sum, q) => {
      return sum + (q.difficulty === 'easy' ? 10 : q.difficulty === 'medium' ? 15 : 20);
    }, 0);
    
    return (
      <div className="suy-luan-container">
        <div className="result-modal show">
          <div className="result-content">
            <Trophy className="result-icon" size={80} />
            <h2>Hoàn thành!</h2>
            <div className="result-stats">
              <p className="result-score">Điểm số: {score}/{maxScore}</p>
              <p className="result-accuracy">Độ chính xác: {percentage}%</p>
              <p className="result-correct">Đúng: {correctAnswers}/{experimentQuestions.length}</p>
            </div>
            <div className="result-message">
              {percentage >= 80 && <p>🏆 Xuất sắc! Bạn là chuyên gia nhận biết dung dịch!</p>}
              {percentage >= 60 && percentage < 80 && <p>👍 Tốt lắm! Tiếp tục rèn luyện nhé!</p>}
              {percentage >= 40 && percentage < 60 && <p>💪 Khá đấy! Hãy ôn lại kiến thức!</p>}
              {percentage < 40 && <p>📚 Cần cố gắng hơn! Hãy học lại phần nhận biết ion!</p>}
            </div>
            <div className="result-actions">
              <button onClick={handleRestart} className="btn-restart">
                Chơi lại
              </button>
              <Link to="/dashboard" className="btn-home">
                Về trang chủ
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="suy-luan-container">
      <div className="suy-luan-header">
        <Link to="/dashboard" className="back-button">
          <ArrowLeft size={24} />
          <span>Quay lại</span>
        </Link>
        <h1 className="game-title">
          <FlaskConical className="title-icon" />
          Nhận Biết Dung Dịch - Phòng Thí Nghiệm
        </h1>
        <div className="score-display">
          <Trophy size={24} />
          <span>{score} điểm</span>
        </div>
      </div>

      <div className="game-content">
        <div className="progress-section">
          <div className="question-counter">
            Thí nghiệm {currentQuestion + 1}/{experimentQuestions.length}
            <span className={`difficulty-badge ${currentQ.difficulty}`}>
              {currentQ.difficulty === 'easy' ? '⭐ Dễ' : currentQ.difficulty === 'medium' ? '⭐⭐ Trung bình' : '⭐⭐⭐ Khó'}
            </span>
          </div>
          <div className="progress-bar">
            <div 
              className="progress-fill" 
              style={{ width: `${((currentQuestion + 1) / experimentQuestions.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Phần thí nghiệm */}
        <div className="lab-container">
          <div className="lab-instruction">
            <AlertCircle size={20} />
            <p>Nhỏ các thuốc thử vào dung dịch X để quan sát hiện tượng, sau đó đoán xem dung dịch X chứa ion gì. 
               <strong> Cần ít nhất {currentQ.minTests} lần thử nghiệm!</strong>
            </p>
          </div>

          {/* Khu vực thuốc thử */}
          <div className="reagents-section">
            <h3><TestTube size={20} /> Thuốc thử có sẵn:</h3>
            <div className="reagents-grid">
              {currentQ.availableReagents.map((reagent, idx) => (
                <button
                  key={idx}
                  className={`reagent-btn ${selectedReagent === reagent ? 'dropping' : ''} ${
                    testResults.some(r => r.reagent === reagent) ? 'used' : ''
                  }`}
                  onClick={() => handleDropReagent(reagent)}
                  disabled={isDropping || showAnswer || testResults.some(r => r.reagent === reagent)}
                >
                  <div className="reagent-tube">
                    <div className="reagent-liquid"></div>
                  </div>
                  <span className="reagent-name">{reagent}</span>
                  {testResults.some(r => r.reagent === reagent) && <span className="check-mark">✓</span>}
                </button>
              ))}
            </div>
          </div>

          {/* Khu vực thí nghiệm */}
          <div className="experiment-area">
            <div className="beaker-container">
              <div className="lab-stand">
                {/* Ống nhỏ giọt */}
                {selectedReagent && (
                  <div className="dropper-animation">
                    <div className="dropper">
                      <div className="dropper-bulb"></div>
                      <div className="dropper-tip"></div>
                      <div className="drop"></div>
                    </div>
                  </div>
                )}
                
                {/* Bình tam giác chứa dung dịch */}
                <div className="erlenmeyer-flask">
                  <div className="flask-neck"></div>
                  <div className="flask-body">
                    <div 
                      className="unknown-solution"
                      style={{ 
                        backgroundColor: unknownIon.solutionColor,
                        position: 'relative'
                      }}
                    >
                      {/* Hiệu ứng sủi bọt khí */}
                      {testResults.length > 0 && testResults[testResults.length - 1].hasBubbles && (
                        <div className="bubbles-container">
                          {[...Array(8)].map((_, i) => (
                            <div 
                              key={i}
                              className="bubble"
                              style={{
                                left: `${20 + Math.random() * 60}%`,
                                animationDelay: `${Math.random() * 2}s`,
                                animationDuration: `${2 + Math.random() * 1}s`
                              }}
                            />
                          ))}
                        </div>
                      )}
                      
                      {/* Hiệu ứng kết tủa/phản ứng */}
                      {testResults.length > 0 && testResults[testResults.length - 1].color !== 'transparent' && !testResults[testResults.length - 1].hasBubbles && (
                        <>
                          {/* Lớp kết tủa chính */}
                          <div 
                            className="precipitate"
                            style={{ backgroundColor: testResults[testResults.length - 1].color }}
                          >
                            {/* Các hạt kết tủa nhỏ lắng xuống */}
                            <div className="precipitate-particles">
                              {[...Array(12)].map((_, i) => (
                                <div 
                                  key={i}
                                  className="precipitate-particle"
                                  style={{
                                    left: `${Math.random() * 90 + 5}%`,
                                    animationDelay: `${Math.random() * 0.8}s`,
                                    animationDuration: `${1 + Math.random() * 0.5}s`,
                                    backgroundColor: testResults[testResults.length - 1].color
                                  }}
                                />
                              ))}
                            </div>
                          </div>
                        </>
                      )}
                    </div>
                    <div className="flask-label">Dung dịch X</div>
                  </div>
                </div>
              </div>
              
              <div className="solution-info">
                <Beaker size={24} />
                <div>
                  <p className="info-label">Màu sắc ban đầu:</p>
                  <p className="info-value">{unknownIon.color}</p>
                </div>
              </div>
            </div>

            {/* Kết quả thí nghiệm */}
            <div className="test-results">
              <h3>📋 Kết quả quan sát:</h3>
              {testResults.length === 0 ? (
                <p className="no-tests">Chưa có thí nghiệm nào. Hãy chọn thuốc thử để bắt đầu!</p>
              ) : (
                <div className="results-list">
                  {testResults.map((test, idx) => (
                    <div key={idx} className="result-item">
                      <div className="result-header">
                        <strong>Thí nghiệm {idx + 1}:</strong> Nhỏ {test.reagent}
                      </div>
                      <div className="result-phenomenon">
                        <span className="phenomenon-label">Hiện tượng:</span>
                        <span className="phenomenon-text">{test.result}</span>
                      </div>
                      {!showAnswer && (
                        <div className="result-equation">
                          <span className="equation-label">Phương trình:</span>
                          <code>{test.equation}</code>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Nút gợi ý */}
          {!showAnswer && (
            <div className="hint-section">
              <button 
                className="hint-button"
                onClick={() => setShowHint(!showHint)}
              >
                <Lightbulb size={20} />
                {showHint ? 'Ẩn gợi ý' : 'Xem gợi ý'}
              </button>
              {showHint && (
                <div className="hint-box">
                  <Lightbulb size={20} />
                  <p>{currentQ.hint}</p>
                </div>
              )}
            </div>
          )}

          {/* Phần chọn đáp án */}
          {canSubmit && !showAnswer && (
            <div className="answer-section">
              <h3>� Dung dịch X chứa ion nào?</h3>
              <div className="ion-options">
                {ionOptions.map((ionKey) => {
                  const ion = ionDatabase[ionKey];
                  return (
                    <button
                      key={ionKey}
                      className={`ion-option ${selectedAnswer === ionKey ? 'selected' : ''}`}
                      onClick={() => handleSelectAnswer(ionKey)}
                    >
                      <span className="ion-formula">{ion.formula}</span>
                      <span className="ion-name">{ion.name}</span>
                    </button>
                  );
                })}
              </div>
              <div className="submit-section">
                <button 
                  className="reset-btn"
                  onClick={handleReset}
                >
                  🔄 Làm lại thí nghiệm
                </button>
                <button 
                  className="submit-btn"
                  onClick={handleSubmitAnswer}
                  disabled={!selectedAnswer}
                >
                  ✓ Xác nhận đáp án
                </button>
              </div>
            </div>
          )}

          {/* Hiển thị kết quả */}
          {showAnswer && (
            <div className={`answer-result ${selectedAnswer === currentQ.unknownSolution ? 'correct' : 'incorrect'}`}>
              <h3>
                {selectedAnswer === currentQ.unknownSolution ? '✓ Chính xác!' : '✗ Chưa đúng'}
              </h3>
              <div className="correct-answer">
                <p>Đáp án đúng: <strong>{ionDatabase[currentQ.unknownSolution].formula} - {ionDatabase[currentQ.unknownSolution].name}</strong></p>
              </div>
              <div className="explanation-section">
                <h4>Giải thích:</h4>
                <div className="all-reactions">
                  <p><strong>Các phản ứng đặc trưng của {ionDatabase[currentQ.unknownSolution].name}:</strong></p>
                  <ul>
                    {ionDatabase[currentQ.unknownSolution].reactions.map((reaction, idx) => (
                      <li key={idx}>
                        <strong>{reaction.reagent}:</strong> {reaction.result}
                        <br />
                        <code>{reaction.equation}</code>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <button 
                onClick={handleNextQuestion}
                className="next-button"
              >
                {currentQuestion < experimentQuestions.length - 1 ? 'Thí nghiệm tiếp theo →' : 'Hoàn thành'}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NhanBietDungDich;
