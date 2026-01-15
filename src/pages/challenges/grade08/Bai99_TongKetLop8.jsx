import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Trophy, Target, Timer, CheckCircle, XCircle, Award, Brain, Zap } from 'lucide-react';
import useChallengeProgress from '../../../hooks/useChallengeProgress';
import ResumeDialog from '../../../components/ResumeDialog';
import './CSS/Bai99_TongKetLop8.css';

const TongKetLop8 = () => {
  const { hasProgress, saveProgress, clearProgress, getProgress, completeChallenge } = useChallengeProgress('tong-ket-lop-8');
  const [startTime] = useState(() => Date.now());
  const [isCompleted, setIsCompleted] = useState(false);
  
  // Ngân hàng câu hỏi tổng hợp toàn bộ chương trình lớp 8
  const questionBank = [
    // PHẦN 1: CHẤT - NGUYÊN TỬ - PHÂN TỬ
    {
      id: 1,
      type: 'multiple-choice',
      chapter: 'Chất - Nguyên tử - Phân tử',
      question: 'Chất nào sau đây là đơn chất?',
      options: ['H₂O', 'O₂', 'CO₂', 'NaCl'],
      correctAnswer: 1,
      explanation: 'O₂ là đơn chất vì chỉ được tạo thành từ một nguyên tố hóa học duy nhất (Oxygen).'
    },
    {
      id: 2,
      type: 'multiple-choice',
      chapter: 'Chất - Nguyên tử - Phân tử',
      question: 'Nguyên tử gồm những hạt cơ bản nào?',
      options: ['Proton, neutron, electron', 'Chỉ có proton và electron', 'Chỉ có neutron', 'Proton và neutron'],
      correctAnswer: 0,
      explanation: 'Nguyên tử gồm 3 loại hạt cơ bản: proton (mang điện +), neutron (trung hòa) ở hạt nhân, và electron (mang điện -) quay xung quanh hạt nhân.'
    },
    {
      id: 3,
      type: 'fill-blank',
      chapter: 'Chất - Nguyên tử - Phân tử',
      question: 'Khối lượng nguyên tử được tập trung chủ yếu ở _____.',
      correctAnswer: ['hạt nhân', 'hat nhan'],
      explanation: 'Khối lượng nguyên tử tập trung chủ yếu ở hạt nhân vì proton và neutron có khối lượng lớn hơn electron rất nhiều.'
    },
    
    // PHẦN 2: PHẢN ỨNG HÓA HỌC
    {
      id: 4,
      type: 'multiple-choice',
      chapter: 'Phản ứng hóa học',
      question: 'Dấu hiệu nào chứng tỏ đã có phản ứng hóa học xảy ra?',
      options: [
        'Chất rắn tan trong nước',
        'Xuất hiện chất mới có tính chất khác chất ban đầu',
        'Nước đá tan chảy',
        'Đường hòa tan trong nước'
      ],
      correctAnswer: 1,
      explanation: 'Dấu hiệu của phản ứng hóa học là xuất hiện chất mới có tính chất khác với chất ban đầu. Các trường hợp khác chỉ là biến đổi vật lý.'
    },
    {
      id: 5,
      type: 'balance-equation',
      chapter: 'Phản ứng hóa học',
      question: 'Cân bằng phương trình: Fe + O₂ → Fe₃O₄',
      equation: { reactants: ['Fe', 'O₂'], products: ['Fe₃O₄'] },
      correctCoeffs: [3, 2, 1],
      explanation: '3Fe + 2O₂ → Fe₃O₄. Cần 3 nguyên tử Fe và 4 nguyên tử O (từ 2 phân tử O₂) để tạo 1 phân tử Fe₃O₄.'
    },
    {
      id: 6,
      type: 'multiple-choice',
      chapter: 'Phản ứng hóa học',
      question: 'Định luật bảo toàn khối lượng phát biểu: "Trong một phản ứng hóa học, _____ bằng _____ của các chất sản phẩm."',
      options: [
        'Khối lượng các chất tham gia; thể tích',
        'Thể tích các chất tham gia; khối lượng',
        'Khối lượng các chất tham gia; khối lượng',
        'Số mol các chất tham gia; số mol'
      ],
      correctAnswer: 2,
      explanation: 'Định luật bảo toàn khối lượng: Tổng khối lượng các chất tham gia phản ứng bằng tổng khối lượng các chất sản phẩm.'
    },

    // PHẦN 3: MOL - TÍNH TOÁN HÓA HỌC
    {
      id: 7,
      type: 'calculation',
      chapter: 'Mol - Tính toán',
      question: 'Tính khối lượng mol của H₂O. Cho H=1, O=16.',
      correctAnswer: 18,
      unit: 'g/mol',
      tolerance: 0.1,
      explanation: 'M(H₂O) = 2×1 + 16 = 18 g/mol'
    },
    {
      id: 8,
      type: 'calculation',
      chapter: 'Mol - Tính toán',
      question: 'Có bao nhiêu mol trong 44g CO₂? Cho C=12, O=16.',
      correctAnswer: 1,
      unit: 'mol',
      tolerance: 0.01,
      explanation: 'M(CO₂) = 12 + 2×16 = 44 g/mol. n = m/M = 44/44 = 1 mol'
    },
    {
      id: 9,
      type: 'multiple-choice',
      chapter: 'Mol - Tính toán',
      question: '1 mol bất kỳ chất khí nào ở đktc đều có thể tích là:',
      options: ['11.2 lít', '22.4 lít', '33.6 lít', '44.8 lít'],
      correctAnswer: 1,
      explanation: 'Ở điều kiện tiêu chuẩn (đktc: 0°C, 1 atm), 1 mol bất kỳ chất khí nào cũng có thể tích 22.4 lít.'
    },

    // PHẦN 4: OXYGEN - KHÔNG KHÍ
    {
      id: 10,
      type: 'multiple-choice',
      chapter: 'Oxygen - Không khí',
      question: 'Oxygen chiếm bao nhiêu phần trăm thể tích không khí?',
      options: ['78%', '21%', '1%', '0.03%'],
      correctAnswer: 1,
      explanation: 'Không khí gồm khoảng 78% Nitrogen, 21% Oxygen, và 1% các khí khác.'
    },
    {
      id: 11,
      type: 'multiple-choice',
      chapter: 'Oxygen - Không khí',
      question: 'Phản ứng cháy là phản ứng:',
      options: [
        'Tỏa nhiệt, tỏa ánh sáng',
        'Thu nhiệt, tỏa ánh sáng',
        'Tỏa nhiệt, không có ánh sáng',
        'Thu nhiệt, thu ánh sáng'
      ],
      correctAnswer: 0,
      explanation: 'Phản ứng cháy là phản ứng oxi hóa xảy ra nhanh, tỏa nhiệt và tỏa ánh sáng.'
    },
    {
      id: 12,
      type: 'fill-blank',
      chapter: 'Oxygen - Không khí',
      question: 'Công thức hóa học của oxit sắt từ là _____.',
      correctAnswer: ['Fe₃O₄', 'Fe3O4'],
      explanation: 'Oxit sắt từ có công thức Fe₃O₄, đây là một loại oxit đặc biệt của sắt.'
    },

    // PHẦN 5: HYDROGEN
    {
      id: 13,
      type: 'multiple-choice',
      chapter: 'Hydrogen',
      question: 'Hydrogen là khí:',
      options: [
        'Nhẹ nhất, không màu, không mùi, không vị',
        'Nặng nhất, có màu, có mùi',
        'Trung bình, không màu',
        'Nhẹ nhất, có màu vàng'
      ],
      correctAnswer: 0,
      explanation: 'Hydrogen (H₂) là khí nhẹ nhất trong tất cả các khí, không màu, không mùi, không vị.'
    },
    {
      id: 14,
      type: 'balance-equation',
      chapter: 'Hydrogen',
      question: 'Cân bằng phương trình: H₂ + O₂ → H₂O',
      equation: { reactants: ['H₂', 'O₂'], products: ['H₂O'] },
      correctCoeffs: [2, 1, 2],
      explanation: '2H₂ + O₂ → 2H₂O. Cần 2 phân tử H₂ và 1 phân tử O₂ để tạo ra 2 phân tử H₂O.'
    },
    {
      id: 15,
      type: 'multiple-choice',
      chapter: 'Hydrogen',
      question: 'Để điều chế khí H₂ trong phòng thí nghiệm, ta cho kim loại Zn tác dụng với:',
      options: ['H₂O', 'H₂SO₄ loãng', 'NaOH', 'O₂'],
      correctAnswer: 1,
      explanation: 'Zn + H₂SO₄ → ZnSO₄ + H₂↑. Đây là phương pháp phổ biến điều chế H₂ trong phòng thí nghiệm.'
    },

    // PHẦN 6: NƯỚC
    {
      id: 16,
      type: 'fill-blank',
      chapter: 'Nước',
      question: 'Nước cất là nước _____, không chứa tạp chất.',
      correctAnswer: ['tinh khiết', 'tinh khiet', 'nguyên chất', 'nguyen chat'],
      explanation: 'Nước cất là nước tinh khiết thu được bằng phương pháp chưng cất, không chứa các tạp chất.'
    },
    {
      id: 17,
      type: 'multiple-choice',
      chapter: 'Nước',
      question: 'Nước cứng là nước có chứa nhiều:',
      options: [
        'Muối của Ca và Mg',
        'Muối của Na và K',
        'Axit',
        'Bazơ'
      ],
      correctAnswer: 0,
      explanation: 'Nước cứng là nước có chứa nhiều muối canxi (Ca) và magie (Mg), đặc biệt là muối clorua, sunfat, hidrocacbonat.'
    },
    {
      id: 18,
      type: 'multiple-choice',
      chapter: 'Nước',
      question: 'Phương pháp nào dùng để làm mềm nước cứng tạm thời?',
      options: ['Đun sôi', 'Thêm muối ăn', 'Thêm đường', 'Lọc qua giấy'],
      correctAnswer: 0,
      explanation: 'Nước cứng tạm thời (chứa Ca(HCO₃)₂, Mg(HCO₃)₂) có thể làm mềm bằng cách đun sôi để các muối này phân hủy và kết tủa.'
    },

    // PHẦN 7: DUNG DỊCH
    {
      id: 19,
      type: 'calculation',
      chapter: 'Dung dịch',
      question: 'Tính nồng độ phần trăm của dung dịch có 20g muối hòa tan trong 80g nước.',
      correctAnswer: 20,
      unit: '%',
      tolerance: 0.5,
      explanation: 'C% = (m_chất tan / m_dung dịch) × 100% = (20 / (20+80)) × 100% = 20%'
    },
    {
      id: 20,
      type: 'calculation',
      chapter: 'Dung dịch',
      question: 'Cần bao nhiêu gam NaCl để pha chế 200g dung dịch có nồng độ 10%?',
      correctAnswer: 20,
      unit: 'g',
      tolerance: 0.5,
      explanation: 'm_chất tan = (C% × m_dung dịch) / 100% = (10 × 200) / 100 = 20g'
    },
    {
      id: 21,
      type: 'multiple-choice',
      chapter: 'Dung dịch',
      question: 'Khi pha loãng dung dịch, đại lượng nào không thay đổi?',
      options: ['Nồng độ dung dịch', 'Khối lượng dung môi', 'Khối lượng chất tan', 'Khối lượng dung dịch'],
      correctAnswer: 2,
      explanation: 'Khi pha loãng, ta chỉ thêm dung môi nên khối lượng chất tan không đổi, còn nồng độ và khối lượng dung dịch thì thay đổi.'
    },

    // PHẦN 8: AXIT - BAZƠ - MUỐI
    {
      id: 22,
      type: 'multiple-choice',
      chapter: 'Axit - Bazơ - Muối',
      question: 'Chất nào sau đây là axit?',
      options: ['NaOH', 'HCl', 'NaCl', 'Ca(OH)₂'],
      correctAnswer: 1,
      explanation: 'HCl (axit clohidric) là axit. NaOH và Ca(OH)₂ là bazơ, NaCl là muối.'
    },
    {
      id: 23,
      type: 'fill-blank',
      chapter: 'Axit - Bazơ - Muối',
      question: 'Dung dịch axit làm quỳ tím chuyển sang màu _____.',
      correctAnswer: ['đỏ', 'do'],
      explanation: 'Dung dịch axit làm quỳ tím chuyển sang màu đỏ. Dung dịch bazơ làm quỳ tím chuyển sang màu xanh.'
    },
    {
      id: 24,
      type: 'multiple-choice',
      chapter: 'Axit - Bazơ - Muối',
      question: 'Phản ứng giữa axit và bazơ được gọi là phản ứng:',
      options: ['Trung hòa', 'Thế', 'Phân hủy', 'Hóa hợp'],
      correctAnswer: 0,
      explanation: 'Phản ứng giữa axit và bazơ tạo ra muối và nước được gọi là phản ứng trung hòa. Ví dụ: HCl + NaOH → NaCl + H₂O'
    },
    {
      id: 25,
      type: 'balance-equation',
      chapter: 'Axit - Bazơ - Muối',
      question: 'Cân bằng phương trình: HCl + Ca(OH)₂ → CaCl₂ + H₂O',
      equation: { reactants: ['HCl', 'Ca(OH)₂'], products: ['CaCl₂', 'H₂O'] },
      correctCoeffs: [2, 1, 1, 2],
      explanation: '2HCl + Ca(OH)₂ → CaCl₂ + 2H₂O. Cần 2 phân tử HCl để trung hòa 1 phân tử Ca(OH)₂.'
    },

    // PHẦN 9: PHÂN BÓN HÓA HỌC
    {
      id: 26,
      type: 'multiple-choice',
      chapter: 'Phân bón hóa học',
      question: 'Ba nguyên tố chính trong phân bón hóa học là:',
      options: ['N, P, K', 'C, H, O', 'Ca, Mg, Fe', 'Na, Cl, S'],
      correctAnswer: 0,
      explanation: 'Ba nguyên tố dinh dưỡng chính trong phân bón hóa học là Nitrogen (N), Phosphorus (P), và Potassium (K).'
    },
    {
      id: 27,
      type: 'fill-blank',
      chapter: 'Phân bón hóa học',
      question: 'Ure có công thức hóa học là _____.',
      correctAnswer: ['CO(NH₂)₂', 'CO(NH2)2', '(NH₂)₂CO', '(NH2)2CO'],
      explanation: 'Ure - phân đạm phổ biến nhất có công thức CO(NH₂)₂, chứa hàm lượng N cao (~46%).'
    },
    {
      id: 28,
      type: 'multiple-choice',
      chapter: 'Phân bón hóa học',
      question: 'Phân lân giúp cây trồng:',
      options: [
        'Phát triển lá xanh',
        'Phát triển bộ rễ, tăng sức đề kháng',
        'Phát triển hoa quả',
        'Tăng chiều cao'
      ],
      correctAnswer: 1,
      explanation: 'Phân lân (P) giúp phát triển bộ rễ, tăng sức đề kháng cho cây. Phân đạm (N) giúp phát triển lá, phân kali (K) giúp phát triển hoa quả.'
    },

    // PHẦN 10: TỔNG HỢP
    {
      id: 29,
      type: 'multiple-choice',
      chapter: 'Tổng hợp',
      question: 'Kim loại nào sau đây phản ứng mạnh nhất với nước ở nhiệt độ thường?',
      options: ['Fe', 'Cu', 'Na', 'Ag'],
      correctAnswer: 2,
      explanation: 'Natri (Na) là kim loại kiềm, phản ứng rất mạnh với nước ở nhiệt độ thường: 2Na + 2H₂O → 2NaOH + H₂↑'
    },
    {
      id: 30,
      type: 'multiple-choice',
      chapter: 'Tổng hợp',
      question: 'Hiện tượng gỉ sắt là do sắt bị:',
      options: ['Khử', 'Oxi hóa', 'Trung hòa', 'Pha loãng'],
      correctAnswer: 1,
      explanation: 'Gỉ sắt xảy ra khi sắt bị oxi hóa bởi oxygen và hơi nước trong không khí, tạo thành oxit sắt màu nâu đỏ.'
    }
  ];

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [userInput, setUserInput] = useState('');
  const [showExplanation, setShowExplanation] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameCompleted, setGameCompleted] = useState(false);
  const [history, setHistory] = useState([]);
  const [timeLeft, setTimeLeft] = useState(60); // 60 seconds per question
  const [showResumeDialog, setShowResumeDialog] = useState(false);
  const [coefficients, setCoefficients] = useState([1, 1, 1, 1]);
  const mountedRef = useRef(true);

  // Check for saved progress on mount
  useEffect(() => {
    if (hasProgress && !gameStarted && !gameCompleted) {
      setShowResumeDialog(true);
    }
  }, []);

  // Timer
  useEffect(() => {
    let timer;
    if (gameStarted && timeLeft > 0 && !answered) {
      timer = setTimeout(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
    } else if (timeLeft === 0 && !answered) {
      handleTimeout();
    }
    return () => clearTimeout(timer);
  }, [timeLeft, gameStarted, answered]);

  // Track mounted state
  useEffect(() => {
    mountedRef.current = true;
    return () => { mountedRef.current = false; };
  }, []);

  const startGame = (fromBeginning = false) => {
    if (fromBeginning) {
      clearProgress();
      setGameStarted(true);
      setCurrentQuestion(0);
      setScore(0);
      setHistory([]);
      setTimeLeft(60);
      setAnswered(false);
      setSelectedAnswer(null);
      setUserInput('');
      setShowExplanation(false);
      setGameCompleted(false);
      setShowResumeDialog(false);
      setCoefficients([1, 1, 1, 1]);
    } else {
      const saved = getProgress();
      if (saved) {
        setCurrentQuestion(saved.currentQuestion);
        setScore(saved.score);
        setHistory(saved.history);
        setTimeLeft(60);
        setAnswered(false);
        setSelectedAnswer(null);
        setUserInput('');
        setShowExplanation(false);
        setGameCompleted(false);
        setGameStarted(true);
        setShowResumeDialog(false);
        setCoefficients([1, 1, 1, 1]);
      } else {
        startGame(true);
      }
    }
  };

  const handleTimeout = () => {
    setAnswered(true);
    setShowExplanation(true);
    const question = questionBank[currentQuestion];
    setHistory(prev => [...prev, {
      question,
      userAnswer: null,
      correct: false,
      timedOut: true
    }]);
  };

  const normalize = (str) => {
    return str.toString().normalize('NFD').replace(/\p{Diacritic}/gu, '').toLowerCase().trim();
  };

  const handleAnswer = () => {
    if (answered) return;
    
    const question = questionBank[currentQuestion];
    let isCorrect = false;
    let userAnswer = null;

    switch (question.type) {
      case 'multiple-choice':
        userAnswer = selectedAnswer;
        isCorrect = selectedAnswer === question.correctAnswer;
        break;
      
      case 'fill-blank':
        userAnswer = userInput;
        isCorrect = question.correctAnswer.some(ans => 
          normalize(userInput) === normalize(ans)
        );
        break;
      
      case 'calculation':
        userAnswer = parseFloat(userInput);
        const correctVal = question.correctAnswer;
        isCorrect = Math.abs(userAnswer - correctVal) <= question.tolerance;
        break;
      
      case 'balance-equation':
        userAnswer = coefficients.join(', ');
        isCorrect = coefficients.every((coeff, idx) => 
          coeff === question.correctCoeffs[idx]
        );
        break;
      
      default:
        break;
    }

    if (isCorrect) {
      const timeBonus = Math.floor(timeLeft / 10);
      setScore(score + 10 + timeBonus);
    }

    setAnswered(true);
    setShowExplanation(true);
    setHistory(prev => [...prev, {
      question,
      userAnswer,
      correct: isCorrect,
      timedOut: false
    }]);
  };

  const nextQuestion = () => {
    if (currentQuestion < questionBank.length - 1) {
      const nextIdx = currentQuestion + 1;
      setCurrentQuestion(nextIdx);
      setAnswered(false);
      setSelectedAnswer(null);
      setUserInput('');
      setShowExplanation(false);
      setTimeLeft(60);
      setCoefficients([1, 1, 1, 1]);
      
      saveProgress({
        currentQuestion: nextIdx,
        score,
        history
      });
    } else {
      setGameStarted(false);
      setGameCompleted(true);
      clearProgress();
      
      // Lưu kết quả hoàn thành vào database
      if (!isCompleted) {
        setIsCompleted(true);
        const correctCount = history.filter(h => h.correct).length;
        const maxScore = questionBank.length * 10;
        const percentage = Math.round((score / maxScore) * 100);
        const stars = percentage >= 80 ? 3 : percentage >= 50 ? 2 : 1;
        completeChallenge({
          score,
          maxScore,
          percentage,
          stars,
          timeSpent: Math.floor((Date.now() - startTime) / 1000),
          correctAnswers: correctCount,
          totalQuestions: questionBank.length
        });
      }
    }
  };

  const playAgain = () => {
    clearProgress();
    setGameStarted(false);
    setGameCompleted(false);
    setCurrentQuestion(0);
    setScore(0);
    setHistory([]);
    setTimeLeft(60);
    setAnswered(false);
    setSelectedAnswer(null);
    setUserInput('');
    setShowExplanation(false);
    setCoefficients([1, 1, 1, 1]);
  };

  const question = questionBank[currentQuestion];
  const progressPercent = Math.round(((currentQuestion + 1) / questionBank.length) * 100);
  const timePercent = Math.max(0, Math.round((timeLeft / 60) * 100));

  // Render question based on type
  const renderQuestion = () => {
    switch (question.type) {
      case 'multiple-choice':
        return (
          <div className="options-grid">
            {question.options.map((option, idx) => (
              <button
                key={idx}
                onClick={() => !answered && setSelectedAnswer(idx)}
                disabled={answered}
                className={`option-btn ${selectedAnswer === idx ? 'selected' : ''} 
                  ${answered && idx === question.correctAnswer ? 'correct' : ''} 
                  ${answered && idx === selectedAnswer && idx !== question.correctAnswer ? 'wrong' : ''}`}
              >
                <span className="option-label">{String.fromCharCode(65 + idx)}</span>
                <span className="option-text">{option}</span>
              </button>
            ))}
          </div>
        );
      
      case 'fill-blank':
      case 'calculation':
        return (
          <div className="input-section">
            <input
              type="text"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              disabled={answered}
              placeholder={question.type === 'calculation' ? 'Nhập số...' : 'Nhập câu trả lời...'}
              className="answer-input"
              onKeyPress={(e) => e.key === 'Enter' && !answered && handleAnswer()}
            />
            {question.unit && <span className="unit-label">{question.unit}</span>}
          </div>
        );
      
      case 'balance-equation':
        return (
          <div className="equation-section">
            <div className="equation-display">
              {question.equation.reactants.map((reactant, idx) => (
                <React.Fragment key={`r${idx}`}>
                  <input
                    type="number"
                    min="1"
                    max="10"
                    value={coefficients[idx]}
                    onChange={(e) => {
                      const newCoeffs = [...coefficients];
                      newCoeffs[idx] = parseInt(e.target.value) || 1;
                      setCoefficients(newCoeffs);
                    }}
                    disabled={answered}
                    className="coeff-input"
                  />
                  <span className="formula">{reactant}</span>
                  {idx < question.equation.reactants.length - 1 && <span className="operator">+</span>}
                </React.Fragment>
              ))}
              <span className="arrow">→</span>
              {question.equation.products.map((product, idx) => (
                <React.Fragment key={`p${idx}`}>
                  <input
                    type="number"
                    min="1"
                    max="10"
                    value={coefficients[question.equation.reactants.length + idx]}
                    onChange={(e) => {
                      const newCoeffs = [...coefficients];
                      newCoeffs[question.equation.reactants.length + idx] = parseInt(e.target.value) || 1;
                      setCoefficients(newCoeffs);
                    }}
                    disabled={answered}
                    className="coeff-input"
                  />
                  <span className="formula">{product}</span>
                  {idx < question.equation.products.length - 1 && <span className="operator">+</span>}
                </React.Fragment>
              ))}
            </div>
          </div>
        );
      
      default:
        return null;
    }
  };

  // Start screen
  if (!gameStarted && !gameCompleted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-600 via-blue-600 to-cyan-600">
        <div className="bg-white shadow-md">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <Link to="/advanced-challenge" className="flex items-center text-gray-600 hover:text-gray-900">
                <ArrowLeft className="w-5 h-5 mr-2" />
                Quay lại
              </Link>
              <h1 className="text-2xl font-bold text-gray-800 flex items-center">
                <Trophy className="w-6 h-6 mr-2 text-yellow-500" />
                Tổng Kết Hóa Học Lớp 8
              </h1>
              <div className="w-24"></div>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-12">
          <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-2xl p-8">
            <div className="text-center mb-8">
              <div className="text-6xl mb-4">🎓</div>
              <h2 className="text-3xl font-bold text-gray-800 mb-4">Thử Thách Tổng Hợp</h2>
              <p className="text-gray-600 text-lg">
                Kiểm tra toàn bộ kiến thức Hóa học lớp 8 qua 30 câu hỏi đa dạng
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-4 mb-8">
              <div className="flex items-start gap-3 p-4 bg-blue-50 rounded-lg">
                <div className="text-2xl">📚</div>
                <div>
                  <h3 className="font-bold text-gray-800 mb-1">Nội dung</h3>
                  <p className="text-gray-600 text-sm">Chất, nguyên tử, phản ứng, mol, oxygen, hydrogen, nước, dung dịch, axit-bazơ-muối, phân bón</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 bg-green-50 rounded-lg">
                <div className="text-2xl">🎯</div>
                <div>
                  <h3 className="font-bold text-gray-800 mb-1">Dạng câu hỏi</h3>
                  <p className="text-gray-600 text-sm">Trắc nghiệm, điền từ, tính toán, cân bằng phương trình</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 bg-yellow-50 rounded-lg">
                <div className="text-2xl">⏱️</div>
                <div>
                  <h3 className="font-bold text-gray-800 mb-1">Thời gian</h3>
                  <p className="text-gray-600 text-sm">60 giây/câu. Trả lời nhanh để được điểm thưởng!</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 bg-purple-50 rounded-lg">
                <div className="text-2xl">🏆</div>
                <div>
                  <h3 className="font-bold text-gray-800 mb-1">Điểm số</h3>
                  <p className="text-gray-600 text-sm">10 điểm/câu + điểm thưởng theo thời gian</p>
                </div>
              </div>
            </div>

            <button 
              onClick={() => startGame(true)}
              className="w-full py-4 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white rounded-xl font-bold text-lg transition-all transform hover:scale-105 shadow-lg"
            >
              🚀 Bắt đầu thử thách
            </button>
          </div>
        </div>

        <ResumeDialog
          show={showResumeDialog}
          onResume={() => startGame(false)}
          onRestart={() => startGame(true)}
          progressInfo={getProgress() ? {
            current: getProgress().currentQuestion + 1,
            total: questionBank.length,
            score: getProgress().score
          } : null}
        />
      </div>
    );
  }

  // Result screen
  if (gameCompleted) {
    const correctCount = history.filter(h => h.correct).length;
    const accuracyRate = Math.round((correctCount / history.length) * 100);
    
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-600 via-blue-600 to-cyan-600">
        <div className="bg-white shadow-md">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <Link to="/advanced-challenge" className="flex items-center text-gray-600 hover:text-gray-900">
                <ArrowLeft className="w-5 h-5 mr-2" />
                Quay lại
              </Link>
              <h1 className="text-2xl font-bold text-gray-800 flex items-center">
                <Award className="w-6 h-6 mr-2 text-yellow-500" />
                Kết quả
              </h1>
              <div className="w-24"></div>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-2xl p-8">
            <div className="text-center mb-8">
              <div className="text-6xl mb-4">
                {accuracyRate >= 90 ? '🏆' : accuracyRate >= 70 ? '🎖️' : accuracyRate >= 50 ? '👍' : '💪'}
              </div>
              <h2 className="text-3xl font-bold text-gray-800 mb-2">
                {accuracyRate >= 90 ? 'Xuất sắc!' : 
                 accuracyRate >= 70 ? 'Giỏi lắm!' : 
                 accuracyRate >= 50 ? 'Khá tốt!' : 'Cố gắng thêm!'}
              </h2>
              <p className="text-gray-600">
                {accuracyRate >= 90 ? 'Bạn đã nắm vững kiến thức Hóa học lớp 8!' : 
                 accuracyRate >= 70 ? 'Kiến thức của bạn rất tốt, tiếp tục phát huy!' : 
                 accuracyRate >= 50 ? 'Bạn đã hiểu được phần lớn kiến thức cơ bản!' : 
                 'Hãy ôn lại các phần kiến thức còn yếu nhé!'}
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-4 mb-8">
              <div className="flex items-center justify-between p-4 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-lg">
                <span className="text-gray-700 font-semibold">Tổng điểm:</span>
                <span className="text-3xl font-bold text-orange-600">{score}</span>
              </div>

              <div className="flex items-center justify-between p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg">
                <span className="text-gray-700 font-semibold">Số câu đúng:</span>
                <span className="text-2xl font-bold text-green-600">{correctCount}/{history.length}</span>
              </div>

              <div className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-lg">
                <span className="text-gray-700 font-semibold">Độ chính xác:</span>
                <span className="text-2xl font-bold text-blue-600">{accuracyRate}%</span>
              </div>
            </div>

            <div className="mb-8">
              <h3 className="text-xl font-bold text-gray-800 mb-4">📊 Chi tiết theo chương</h3>
              <div className="space-y-2">
                {Array.from(new Set(questionBank.map(q => q.chapter))).map(chapter => {
                  const chapterQuestions = history.filter(h => h.question.chapter === chapter);
                  const chapterCorrect = chapterQuestions.filter(h => h.correct).length;
                  const chapterRate = Math.round((chapterCorrect / chapterQuestions.length) * 100);
                  
                  return (
                    <div key={chapter} className="p-3 bg-gray-50 rounded-lg">
                      <div className="flex justify-between items-center mb-1">
                        <span className="font-medium text-gray-700">{chapter}</span>
                        <span className="text-sm font-bold text-gray-600">{chapterCorrect}/{chapterQuestions.length}</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all"
                          style={{ width: `${chapterRate}%` }}
                        ></div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="flex gap-4">
              <button 
                onClick={playAgain}
                className="flex-1 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl font-bold hover:from-purple-700 hover:to-blue-700 transition-all"
              >
                🔄 Làm lại
              </button>
              <Link 
                to="/advanced-challenge"
                className="flex-1 py-3 bg-gray-100 text-gray-700 rounded-xl font-bold text-center hover:bg-gray-200 transition-all"
              >
                🏠 Về trang chủ
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Game screen
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-blue-600 to-cyan-600">
      <div className="bg-white shadow-md">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link to="/advanced-challenge" className="flex items-center text-gray-600 hover:text-gray-900">
                <ArrowLeft className="w-5 h-5 mr-2" />
                Thoát
              </Link>
              <div className="flex items-center gap-2">
                <Target className="w-5 h-5 text-purple-600" />
                <span className="font-bold text-gray-800">Câu {currentQuestion + 1}/{questionBank.length}</span>
              </div>
            </div>
            
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <Timer className={`w-5 h-5 ${timeLeft <= 10 ? 'text-red-500' : 'text-blue-600'}`} />
                <span className={`font-bold ${timeLeft <= 10 ? 'text-red-500' : 'text-gray-800'}`}>
                  {timeLeft}s
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Trophy className="w-5 h-5 text-yellow-500" />
                <span className="font-bold text-gray-800">{score}</span>
              </div>
            </div>
          </div>
          
          <div className="mt-3">
            <div className="flex gap-2 mb-2">
              <div className="flex-1 bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-gradient-to-r from-purple-500 to-blue-500 h-2 rounded-full transition-all"
                  style={{ width: `${progressPercent}%` }}
                ></div>
              </div>
              <div className="flex-1 bg-gray-200 rounded-full h-2">
                <div 
                  className={`h-2 rounded-full transition-all ${timeLeft <= 10 ? 'bg-red-500' : 'bg-green-500'}`}
                  style={{ width: `${timePercent}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          <div className="bg-white rounded-2xl shadow-2xl p-8 mb-6">
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-4">
                <Brain className="w-5 h-5 text-purple-600" />
                <span className="text-sm font-medium text-purple-600">{question.chapter}</span>
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                {question.question}
              </h2>
            </div>

            {renderQuestion()}

            {!answered && (
              <button
                onClick={handleAnswer}
                disabled={
                  (question.type === 'multiple-choice' && selectedAnswer === null) ||
                  ((question.type === 'fill-blank' || question.type === 'calculation') && !userInput.trim())
                }
                className="w-full mt-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl font-bold hover:from-purple-700 hover:to-blue-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Trả lời
              </button>
            )}

            {showExplanation && (
              <div className={`mt-6 p-4 rounded-lg ${history[history.length - 1]?.correct ? 'bg-green-50' : 'bg-red-50'}`}>
                <div className="flex items-start gap-3">
                  {history[history.length - 1]?.correct ? 
                    <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" /> : 
                    <XCircle className="w-6 h-6 text-red-600 flex-shrink-0 mt-1" />
                  }
                  <div>
                    <h3 className={`font-bold mb-2 ${history[history.length - 1]?.correct ? 'text-green-800' : 'text-red-800'}`}>
                      {history[history.length - 1]?.timedOut ? 'Hết giờ!' : 
                       history[history.length - 1]?.correct ? 'Chính xác!' : 'Chưa đúng!'}
                    </h3>
                    <p className="text-gray-700">{question.explanation}</p>
                  </div>
                </div>
                
                <button
                  onClick={nextQuestion}
                  className="w-full mt-4 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl font-bold hover:from-purple-700 hover:to-blue-700 transition-all"
                >
                  {currentQuestion < questionBank.length - 1 ? 'Câu tiếp theo →' : 'Xem kết quả 🏆'}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TongKetLop8;
