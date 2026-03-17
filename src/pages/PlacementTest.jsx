import { useState, useEffect, useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { API_BASE_URL } from '../config/api';
import { Sparkles, Trophy, Zap, Clock, Target, ChevronRight, Star, CheckCircle, XCircle, Award, Lightbulb, ArrowRight, BookOpen, Timer } from 'lucide-react';

// True/False Quiz Component
const TrueFalseQuiz = ({ question, userAnswer, isAnswered, onAnswer }) => {
  return (
    <div className="flex gap-4 justify-center">
      {[
        { value: true, label: '✓ Đúng', color: 'emerald' },
        { value: false, label: '✗ Sai', color: 'rose' }
      ].map(({ value, label, color }) => {
        const isSelected = userAnswer === value;
        const isCorrectAnswer = question.answer === value;
        const showCorrect = isAnswered && isCorrectAnswer;
        const showWrong = isAnswered && isSelected && !isCorrectAnswer;

        return (
          <button
            key={String(value)}
            onClick={() => onAnswer(value)}
            disabled={isAnswered}
            className={`flex-1 max-w-[200px] py-5 text-lg font-bold rounded-2xl border transition-all duration-300 ${
              showCorrect
                ? 'border-emerald-400 bg-emerald-500/20 text-emerald-300 scale-105 shadow-lg shadow-emerald-500/20'
                : showWrong
                ? 'border-red-400 bg-red-500/20 text-red-300 shake'
                : isSelected && !isAnswered
                ? 'border-blue-400 bg-blue-500/20 text-blue-300'
                : 'border-white/10 bg-white/[0.03] text-white/80 hover:bg-white/[0.08] hover:border-white/20'
            }`}
          >
            <div className="flex items-center justify-center gap-2">
              {showCorrect && <CheckCircle className="w-5 h-5" />}
              {showWrong && <XCircle className="w-5 h-5" />}
              <span>{label}</span>
            </div>
          </button>
        );
      })}
    </div>
  );
};

// Questions data
const questions = [
  // Lớp 8 (5 câu)
  {
    question: "Chất nào sau đây là đơn chất?",
    options: ["H2O", "O2", "NaCl", "CO2"],
    answer: "O2",
    level: 8,
    emoji: "🧪",
    hint: "Đơn chất chỉ chứa một loại nguyên tố",
    type: "multiple"
  },
  {
    question: "Axit sunfuric có công thức là H2SO4",
    answer: true,
    level: 8,
    emoji: "⚗️",
    hint: "Axit mạnh chứa lưu huỳnh",
    type: "truefalse"
  },
  {
    question: "Phản ứng hóa học là gì?",
    options: ["Quá trình chất biến đổi tạo ra chất mới", "Quá trình hòa tan một chất", "Quá trình thay đổi trạng thái", "Quá trình vật lý"],
    answer: "Quá trình chất biến đổi tạo ra chất mới",
    level: 8,
    emoji: "💥",
    hint: "Tạo ra chất mới khác với chất ban đầu",
    type: "multiple"
  },
  {
    question: "Ký hiệu hóa học của Sắt là?",
    options: ["S", "Fe", "Si", "Na"],
    answer: "Fe",
    level: 8,
    emoji: "🔩",
    hint: "Ferrum trong tiếng Latin",
    type: "multiple"
  },
  {
    question: "Nito chiếm khoảng 78% trong không khí",
    answer: true,
    level: 8,
    emoji: "🌬️",
    hint: "Đây là khí chính trong không khí",
    type: "truefalse"
  },
  // Lớp 9 (5 câu)
  {
    question: "Dung dịch làm quỳ tím hóa xanh là?",
    options: ["Axit", "Bazo", "Muối", "Nước"],
    answer: "Bazo",
    level: 9,
    emoji: "🔵",
    hint: "Chất có tính kiềm",
    type: "multiple"
  },
  {
    question: "Natri (Na) tác dụng được với nước ở nhiệt độ thường",
    answer: true,
    level: 9,
    emoji: "💧",
    hint: "Kim loại kiềm rất hoạt động",
    type: "truefalse"
  },
  {
    question: "Vôi sống (CaO) được sản xuất từ?",
    options: ["CaCO3", "NaCl", "H2SO4", "SO2"],
    answer: "CaCO3",
    level: 9,
    emoji: "🏗️",
    hint: "Đá vôi hay đá phite",
    type: "multiple"
  },
  {
    question: "Sắp xếp theo chiều hoạt động hóa học giảm dần?",
    options: ["K, Na, Mg, Al", "Al, Mg, Na, K", "Na, K, Al, Mg", "Mg, Al, K, Na"],
    answer: "K, Na, Mg, Al",
    level: 9,
    emoji: "📊",
    hint: "Kali hoạt động mạnh nhất",
    type: "multiple"
  },
  {
    question: "Metan (CH4) là khí gây nổ nguy hiểm trong hầm mỏ than",
    answer: true,
    level: 9,
    emoji: "⛏️",
    hint: "Khí cữu hỏa mỏ",
    type: "truefalse"
  },
  // Lớp 10 (10 câu)
  {
    question: "Số electron tối đa ở lớp M (n=3) là?",
    options: ["2", "8", "18", "32"],
    answer: "18",
    level: 10,
    emoji: "⚛️",
    hint: "Công thức 2n²",
    type: "multiple"
  },
  {
    question: "Nguyên tử của nguyên tố X có Z=11. Cấu hình electron của X là?",
    options: ["1s2 2s2 2p6 3s1", "1s2 2s2 2p5 3s2", "1s2 2s2 2p6", "1s2 2s2 2p6 3s2"],
    answer: "1s2 2s2 2p6 3s1",
    level: 10,
    emoji: "🔬",
    hint: "Natri có 11 electron",
    type: "multiple"
  },
  {
    question: "Liên kết trong NaCl là liên kết ion",
    answer: true,
    level: 10,
    emoji: "🔗",
    hint: "Kim loại + phi kim",
    type: "truefalse"
  },
  {
    question: "Số oxi hóa của S trong H2SO4 là?",
    options: ["+2", "+4", "+6", "-2"],
    answer: "+6",
    level: 10,
    emoji: "🎯",
    hint: "H: +1, O: -2, tổng = 0",
    type: "multiple"
  },
  {
    question: "Flo (F) thuộc nhóm VIIA (Halogen) trong bảng tuần hoàn",
    answer: true,
    level: 10,
    emoji: "📋",
    hint: "Nhóm halogen là VIIA",
    type: "truefalse"
  },
  {
    question: "Phản ứng tỏa nhiệt có Delta H...?",
    options: ["< 0", "> 0", "= 0", "Không xác định"],
    answer: "< 0",
    level: 10,
    emoji: "🔥",
    hint: "Năng lượng thoát ra môi trường",
    type: "multiple"
  },
  {
    question: "Tốc độ phản ứng KHÔNG phụ thuộc vào yếu tố nào?",
    options: ["Nồng độ", "Nhiệt độ", "Chất xúc tác", "Màu sắc chất"],
    answer: "Màu sắc chất",
    level: 10,
    emoji: "⏱️",
    hint: "Màu sắc là tính chất vật lý",
    type: "multiple"
  },
  {
    question: "Chất nào sau đây là chất điện li mạnh?",
    options: ["H2O", "CH3COOH", "HCl", "C2H5OH"],
    answer: "HCl",
    level: 10,
    emoji: "⚡",
    hint: "Axit mạnh phân li hoàn toàn",
    type: "multiple"
  },
  {
    question: "Halogen nào có tính oxi hóa mạnh nhất?",
    options: ["Flo", "Clo", "Brom", "Iot"],
    answer: "Flo",
    level: 10,
    emoji: "🌟",
    hint: "Độ âm điện cao nhất",
    type: "multiple"
  },
  {
    question: "SO2 gây ra mưa axit",
    answer: true,
    level: 10,
    emoji: "🌧️",
    hint: "Ô nhiễm không khí từ nhà máy",
    type: "truefalse"
  },
  // Lớp 11 (5 câu)
  {
    question: "Công thức chung của ankan là?",
    options: ["CnH2n+2 (n>=1)", "CnH2n (n>=2)", "CnH2n-2 (n>=2)", "CnH2n-6 (n>=6)"],
    answer: "CnH2n+2 (n>=1)",
    level: 11,
    emoji: "🛢️",
    hint: "Hydrocacbon no, mạch hở",
    type: "multiple"
  },
  {
    question: "C2H4 là một anken",
    answer: true,
    level: 11,
    emoji: "🧬",
    hint: "Có liên kết đôi C=C",
    type: "truefalse"
  },
  {
    question: "Cloroform (CHCl3) được dùng làm chất gây mê",
    options: ["Đúng, dùng làm mê", "Sai, dùng Freon", "Sai, dùng DDT", "Sai, dùng Teflon"],
    answer: "Đúng, dùng làm mê",
    level: 11,
    emoji: "💉",
    hint: "CHCl3 - dùng trong y tế",
    type: "multiple"
  },
  {
    question: "Ancol etylic có công thức C2H5OH",
    answer: true,
    level: 11,
    emoji: "🍷",
    hint: "Có trong rượu, bia",
    type: "truefalse"
  },
  {
    question: "Phenol (C6H5OH) có tính chất?",
    options: ["Tính axit yếu", "Tính bazo yếu", "Trung tính", "Lưỡng tính"],
    answer: "Tính axit yếu",
    level: 11,
    emoji: "🧴",
    hint: "Vòng benzen + nhóm OH",
    type: "multiple"
  },
  // Lớp 12 (5 câu)
  {
    question: "Chất nào là este?",
    options: ["CH3COOH", "CH3COOCH3", "C2H5OH", "HCHO"],
    answer: "CH3COOCH3",
    level: 12,
    emoji: "🍌",
    hint: "Có nhóm -COO- trong phân tử",
    type: "multiple"
  },
  {
    question: "Chất béo là trieste của glixerol",
    answer: true,
    level: 12,
    emoji: "🧈",
    hint: "Rượu 3 chức C3H5(OH)3",
    type: "truefalse"
  },
  {
    question: "Cả saccarozơ và glucozơ phản ứng với Cu(OH)2",
    options: ["Đúng, cùng tráng gương", "Sai, chỉ glucozơ", "Sai, chỉ saccarozơ", "Sai, không phản ứng"],
    answer: "Đúng, cùng tráng gương",
    level: 12,
    emoji: "🍬",
    hint: "Đều có nhóm OH liền kề",
    type: "multiple"
  },
  {
    question: "PVC được tạo bằng phản ứng trùng hợp",
    answer: true,
    level: 12,
    emoji: "🧵",
    hint: "Poli(vinyl clorua) - nhựa phổ biến",
    type: "truefalse"
  },
  {
    question: "Kim loại nào có tính khử mạnh nhất?",
    options: ["K", "Mg", "Cu", "Ag"],
    answer: "K",
    level: 12,
    emoji: "🥇",
    hint: "Kim loại kiềm nhóm IA",
    type: "multiple"
  }
];

// Shuffle array function
const shuffleArray = (array) => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

// Confetti component
const Confetti = ({ show }) => {
  if (!show) return null;
  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      {[...Array(50)].map((_, i) => (
        <div
          key={i}
          className="absolute animate-confetti"
          style={{
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 0.5}s`,
            backgroundColor: ['#f59e0b', '#10b981', '#3b82f6', '#ef4444', '#8b5cf6'][Math.floor(Math.random() * 5)]
          }}
        />
      ))}
    </div>
  );
};

// Shared styles
const globalStyles = `
  @keyframes blob {
    0% { transform: translate(0px, 0px) scale(1); }
    33% { transform: translate(30px, -50px) scale(1.1); }
    66% { transform: translate(-20px, 20px) scale(0.9); }
    100% { transform: translate(0px, 0px) scale(1); }
  }
  @keyframes shake {
    0%, 100% { transform: translateX(0); }
    25% { transform: translateX(-5px); }
    75% { transform: translateX(5px); }
  }
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(-10px); }
    to { opacity: 1; transform: translateY(0); }
  }
  @keyframes slideUp {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }
  @keyframes confetti {
    0% { transform: translateY(-100vh) rotate(0deg); opacity: 1; }
    100% { transform: translateY(100vh) rotate(720deg); opacity: 0; }
  }
  @keyframes timerPulse {
    0%, 100% { box-shadow: 0 0 0 0 rgba(239, 68, 68, 0.4); }
    50% { box-shadow: 0 0 0 8px rgba(239, 68, 68, 0); }
  }
  @keyframes float {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-10px); }
  }
  @keyframes shimmer {
    0% { background-position: -200% 0; }
    100% { background-position: 200% 0; }
  }
  .animate-blob { animation: blob 7s infinite; }
  .animation-delay-2000 { animation-delay: 2s; }
  .animation-delay-4000 { animation-delay: 4s; }
  .shake { animation: shake 0.5s ease-in-out; }
  .animate-fadeIn { animation: fadeIn 0.3s ease-out; }
  .animate-slideUp { animation: slideUp 0.5s ease-out forwards; }
  .animate-confetti { width: 10px; height: 10px; animation: confetti 3s ease-in-out forwards; }
  .animate-timerPulse { animation: timerPulse 1s infinite; }
  .animate-float { animation: float 3s ease-in-out infinite; }
  .shimmer-text {
    background: linear-gradient(90deg, #fff 0%, #a78bfa 25%, #818cf8 50%, #a78bfa 75%, #fff 100%);
    background-size: 200% auto;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    animation: shimmer 3s linear infinite;
  }
`;

// Level color mapping
const levelColors = {
  8: { gradient: 'from-cyan-500 to-blue-600', text: 'text-cyan-400', bg: 'bg-cyan-500/10', border: 'border-cyan-500/30' },
  9: { gradient: 'from-emerald-500 to-teal-600', text: 'text-emerald-400', bg: 'bg-emerald-500/10', border: 'border-emerald-500/30' },
  10: { gradient: 'from-violet-500 to-purple-600', text: 'text-violet-400', bg: 'bg-violet-500/10', border: 'border-violet-500/30' },
  11: { gradient: 'from-orange-500 to-amber-600', text: 'text-orange-400', bg: 'bg-orange-500/10', border: 'border-orange-500/30' },
  12: { gradient: 'from-rose-500 to-pink-600', text: 'text-rose-400', bg: 'bg-rose-500/10', border: 'border-rose-500/30' },
};

const PlacementTest = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [answers, setAnswers] = useState({});
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [isAnswered, setIsAnswered] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30);
  const [totalTime, setTotalTime] = useState(0);
  const [loading, setLoading] = useState(false);
  const [selectedCurriculum, setSelectedCurriculum] = useState(null);
  const [shuffledOptions, setShuffledOptions] = useState([]);
  const [showHint, setShowHint] = useState(false);
  const [hintsUsed, setHintsUsed] = useState(0);
  const [quizStarted, setQuizStarted] = useState(false);
  const navigate = useNavigate();
  const { programId } = useParams();
  const { user, setUser } = useAuth();

  useEffect(() => {
    if (quizStarted && questions[currentQuestion]) {
      const q = questions[currentQuestion];
      if (q.type === 'multiple' && q.options) {
        setShuffledOptions(shuffleArray(q.options));
      } else if (q.type === 'truefalse') {
        setShuffledOptions([]);
      }
    }
  }, [currentQuestion, quizStarted]);

  useEffect(() => {
    const selectedCurriculumData = localStorage.getItem('selectedCurriculum');
    if (selectedCurriculumData) {
      try {
        const curriculumInfo = JSON.parse(selectedCurriculumData);
        setSelectedCurriculum(curriculumInfo);
      } catch (e) {
        console.error('Error parsing curriculum data:', e);
      }
    }
  }, []);

  useEffect(() => {
    if (!quizStarted || showResult || isAnswered || currentQuestion >= questions.length) return;
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          handleTimeUp();
          return 30;
        }
        return prev - 1;
      });
      setTotalTime((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [quizStarted, showResult, isAnswered, currentQuestion]);

  const handleTimeUp = useCallback(() => {
    if (!isAnswered) {
      setIsAnswered(true);
      setStreak(0);
      setTimeout(() => { goToNextQuestion(); }, 1500);
    }
  }, [isAnswered, currentQuestion]);

  const handleAnswerSelect = (option) => {
    if (isAnswered) return;
    setSelectedAnswer(option);
    setIsAnswered(true);
    const q = questions[currentQuestion];
    const isCorrect = option === q.answer;
    setAnswers(prev => ({ ...prev, [currentQuestion]: option }));

    if (isCorrect) {
      const timeBonus = Math.floor(timeLeft / 3);
      const streakBonus = Math.min(streak, 5);
      const pointsEarned = 10 + timeBonus + streakBonus;
      setScore(prev => prev + pointsEarned);
      setStreak(prev => prev + 1);
      if (streak >= 2) {
        setShowConfetti(true);
        setTimeout(() => setShowConfetti(false), 2000);
      }
    } else {
      setStreak(0);
    }
    setTimeout(() => { goToNextQuestion(); }, 1500);
  };

  const goToNextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
      setSelectedAnswer(null);
      setIsAnswered(false);
      setTimeLeft(30);
      setShowHint(false);
    } else {
      setShowResult(true);
    }
  };

  const useHint = () => {
    if (!showHint && hintsUsed < 5) {
      setShowHint(true);
      setHintsUsed(prev => prev + 1);
    }
  };

  const startQuiz = () => {
    setQuizStarted(true);
    setTimeLeft(30);
  };

  const handleSubmit = async () => {
    setLoading(true);
    const scoresByLevel = {};
    questions.forEach((q, index) => {
      if (!scoresByLevel[q.level]) scoresByLevel[q.level] = { correct: 0, total: 0 };
      scoresByLevel[q.level].total++;
      if (answers[index] === q.answer) scoresByLevel[q.level].correct++;
    });

    let assignedGrade = 8;
    for (const level of [8, 9, 10, 11, 12]) {
      const levelScore = scoresByLevel[level];
      if (levelScore && levelScore.total > 0) {
        if ((levelScore.correct / levelScore.total) >= 0.7) {
          assignedGrade = Math.min(level + 1, 12);
        } else {
          assignedGrade = level;
          break;
        }
      }
    }
    const totalScore = Object.values(scoresByLevel).reduce((acc, level) => acc + level.correct, 0);

    try {
      if (!user || !user.email) throw new Error('Bạn cần đăng nhập để hoàn thành bài kiểm tra');
      const programNames = { chemistry: 'Hóa học', physics: 'Vật lý', biology: 'Sinh học', math: 'Toán học' };
      const selectedCurriculumData = localStorage.getItem('selectedCurriculum');
      let curriculumType = null;
      if (selectedCurriculumData) {
        try { curriculumType = JSON.parse(selectedCurriculumData).curriculumType; } catch (e) {}
      }

      const token = localStorage.getItem('token');
      const response = await fetch(`${API_BASE_URL}/users/enroll-program`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          ...(token && { 'Authorization': `Bearer ${token}` })
        },
        body: JSON.stringify({
          userId: user.email, programId, programName: programNames[programId] || 'Chương trình học',
          initialClassId: assignedGrade, placementTestScore: totalScore, placementTestTotal: questions.length,
          curriculumType
        }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Không thể lưu kết quả kiểm tra');
      if (data.user) { setUser(data.user); localStorage.setItem('user', JSON.stringify(data.user)); }
      localStorage.removeItem('selectedCurriculum');
      navigate(`/program/${programId}`);
    } catch (error) {
      alert(`❌ Có lỗi xảy ra: ${error.message}\n\nVui lòng thử lại sau.`);
    } finally {
      setLoading(false);
    }
  };

  const getStats = () => {
    let correct = 0;
    questions.forEach((q, index) => { if (answers[index] === q.answer) correct++; });
    return { correct, total: questions.length, percentage: Math.round((correct / questions.length) * 100), avgTime: Math.round(totalTime / questions.length) };
  };

  const getAssignedGrade = () => {
    const scoresByLevel = {};
    questions.forEach((q, index) => {
      if (!scoresByLevel[q.level]) scoresByLevel[q.level] = { correct: 0, total: 0 };
      scoresByLevel[q.level].total++;
      if (answers[index] === q.answer) scoresByLevel[q.level].correct++;
    });
    let assignedGrade = 8;
    for (const level of [8, 9, 10, 11, 12]) {
      const levelScore = scoresByLevel[level];
      if (levelScore && levelScore.total > 0) {
        if ((levelScore.correct / levelScore.total) >= 0.7) assignedGrade = Math.min(level + 1, 12);
        else { assignedGrade = level; break; }
      }
    }
    return assignedGrade;
  };

  const currentQ = questions[currentQuestion];
  const progress = ((currentQuestion) / questions.length) * 100;
  const currentLevelColor = currentQ ? levelColors[currentQ.level] : levelColors[8];

  // ========== START SCREEN ==========
  if (!quizStarted) {
    return (
      <div className="min-h-screen bg-[#0a0a1a] flex items-center justify-center p-4 relative overflow-hidden">
        <style>{globalStyles}</style>

        {/* Background */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 left-20 w-80 h-80 bg-blue-600/8 rounded-full blur-[120px] animate-blob" />
          <div className="absolute top-40 right-20 w-72 h-72 bg-purple-600/8 rounded-full blur-[100px] animate-blob animation-delay-2000" />
          <div className="absolute bottom-20 left-1/2 w-64 h-64 bg-cyan-600/5 rounded-full blur-[80px] animate-blob animation-delay-4000" />
        </div>

        <div className="relative z-10 max-w-xl w-full">
          <div className="bg-white/[0.03] backdrop-blur-xl rounded-3xl p-8 md:p-10 border border-white/10 shadow-2xl">
            <div className="text-center">
              {/* Icon */}
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-2xl mb-6 shadow-lg shadow-blue-500/20 animate-float">
                <Sparkles className="w-10 h-10 text-white" />
              </div>

              <h1 className="text-3xl md:text-4xl font-extrabold text-white mb-3">
                Đánh giá năng lực
              </h1>
              <p className="text-white/50 mb-8 leading-relaxed">
                Trả lời {questions.length} câu hỏi để xác định trình độ và nhận lộ trình học tập phù hợp
              </p>

              {selectedCurriculum && (
                <div className="bg-white/[0.03] rounded-xl p-3 mb-6 border border-white/10 inline-flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-blue-400" />
                  <span className="text-white/70 text-sm">{selectedCurriculum.curriculumName}</span>
                </div>
              )}

              {/* Stats */}
              <div className="grid grid-cols-3 gap-3 mb-8">
                {[
                  { value: questions.length, label: 'Câu hỏi', icon: Target, color: 'text-cyan-400' },
                  { value: '30s', label: 'Mỗi câu', icon: Timer, color: 'text-emerald-400' },
                  { value: 5, label: 'Gợi ý', icon: Lightbulb, color: 'text-amber-400' },
                ].map((s, i) => (
                  <div key={i} className="bg-white/[0.03] rounded-xl p-4 border border-white/5">
                    <s.icon className={`w-5 h-5 ${s.color} mx-auto mb-2`} />
                    <div className="text-2xl font-bold text-white">{s.value}</div>
                    <div className="text-xs text-white/40">{s.label}</div>
                  </div>
                ))}
              </div>

              {/* Rules */}
              <div className="space-y-2.5 text-left mb-8">
                {[
                  { icon: Zap, text: 'Trả lời nhanh để nhận điểm thưởng thời gian', color: 'text-yellow-400' },
                  { icon: Target, text: 'Streak bonus khi trả lời đúng liên tiếp', color: 'text-emerald-400' },
                  { icon: Lightbulb, text: 'Sử dụng gợi ý khi cần (tối đa 5 lần)', color: 'text-blue-400' },
                ].map((r, i) => (
                  <div key={i} className="flex items-center gap-3 bg-white/[0.02] rounded-lg px-4 py-3 border border-white/5">
                    <r.icon className={`w-5 h-5 ${r.color} flex-shrink-0`} />
                    <span className="text-sm text-white/60">{r.text}</span>
                  </div>
                ))}
              </div>

              <button
                onClick={startQuiz}
                className="w-full py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold text-lg rounded-2xl shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/30 transform hover:scale-[1.02] transition-all duration-300 flex items-center justify-center gap-3"
              >
                <Sparkles className="w-5 h-5" />
                Bắt đầu đánh giá
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ========== RESULT SCREEN ==========
  if (showResult) {
    const stats = getStats();
    const assignedGrade = getAssignedGrade();
    const gradeColor = levelColors[assignedGrade];

    return (
      <div className="min-h-screen bg-[#0a0a1a] flex items-center justify-center p-4 relative overflow-hidden">
        <style>{globalStyles}</style>
        <Confetti show={true} />

        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 left-20 w-72 h-72 bg-yellow-500/8 rounded-full blur-[120px] animate-pulse" />
          <div className="absolute bottom-20 right-20 w-72 h-72 bg-emerald-500/8 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: '1s' }} />
        </div>

        <div className="relative z-10 max-w-xl w-full">
          <div className="bg-white/[0.03] backdrop-blur-xl rounded-3xl p-8 md:p-10 border border-white/10 shadow-2xl">
            <div className="text-center">
              {/* Trophy */}
              <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full mb-6 shadow-lg shadow-orange-500/20 animate-float">
                <Trophy className="w-12 h-12 text-white" />
              </div>

              <h1 className="text-3xl font-extrabold text-white mb-2">Hoàn thành xuất sắc!</h1>
              <p className="text-white/50 mb-8">Bạn đã hoàn thành bài đánh giá năng lực</p>

              {/* Score */}
              <div className="bg-gradient-to-r from-yellow-500/10 to-orange-500/10 rounded-2xl p-6 mb-6 border border-yellow-500/20">
                <div className="text-5xl font-extrabold shimmer-text mb-1">{score}</div>
                <div className="text-white/40 text-sm">Tổng điểm</div>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-3 gap-3 mb-6">
                <div className="bg-white/[0.03] rounded-xl p-4 border border-white/5">
                  <CheckCircle className="w-5 h-5 text-emerald-400 mx-auto mb-1" />
                  <div className="text-xl font-bold text-white">{stats.correct}/{stats.total}</div>
                  <div className="text-xs text-white/40">Câu đúng</div>
                </div>
                <div className="bg-white/[0.03] rounded-xl p-4 border border-white/5">
                  <div className="text-xl font-bold text-white">{stats.percentage}%</div>
                  <div className="text-xs text-white/40 mt-1">Chính xác</div>
                </div>
                <div className="bg-white/[0.03] rounded-xl p-4 border border-white/5">
                  <Clock className="w-5 h-5 text-blue-400 mx-auto mb-1" />
                  <div className="text-xl font-bold text-white">{stats.avgTime}s</div>
                  <div className="text-xs text-white/40">TB/câu</div>
                </div>
              </div>

              {/* Assigned Grade */}
              <div className={`${gradeColor.bg} rounded-2xl p-6 mb-8 border ${gradeColor.border}`}>
                <div className="flex items-center justify-center gap-3 mb-2">
                  <Award className={`w-7 h-7 ${gradeColor.text}`} />
                  <span className="text-3xl font-extrabold text-white">Lớp {assignedGrade}</span>
                </div>
                <div className="text-white/50 text-sm">Trình độ được đề xuất cho bạn</div>
              </div>

              {/* Level breakdown */}
              <div className="space-y-2 mb-8">
                {[8, 9, 10, 11, 12].map(level => {
                  const levelQs = questions.filter(q => q.level === level);
                  const correct = levelQs.filter((q, i) => {
                    const qIndex = questions.indexOf(q);
                    return answers[qIndex] === q.answer;
                  }).length;
                  const total = levelQs.length;
                  const pct = total > 0 ? Math.round((correct / total) * 100) : 0;
                  const lc = levelColors[level];
                  return (
                    <div key={level} className="flex items-center gap-3">
                      <span className={`text-xs font-medium w-12 ${lc.text}`}>Lớp {level}</span>
                      <div className="flex-1 h-2 bg-white/5 rounded-full overflow-hidden">
                        <div className={`h-full bg-gradient-to-r ${lc.gradient} rounded-full transition-all duration-700`} style={{ width: `${pct}%` }} />
                      </div>
                      <span className="text-xs text-white/40 w-12 text-right">{correct}/{total}</span>
                    </div>
                  );
                })}
              </div>

              <button
                onClick={handleSubmit}
                disabled={loading}
                className="w-full py-4 bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-bold text-lg rounded-2xl shadow-lg shadow-emerald-500/25 hover:shadow-xl transform hover:scale-[1.02] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
              >
                {loading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Đang xử lý...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5" />
                    Bắt đầu học ngay
                    <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ========== QUIZ SCREEN ==========
  const timerPercentage = (timeLeft / 30) * 100;
  const timerColor = timeLeft <= 5 ? 'text-red-400' : timeLeft <= 10 ? 'text-orange-400' : 'text-white';
  const timerBarColor = timeLeft <= 5 ? 'from-red-500 to-red-600' : timeLeft <= 10 ? 'from-orange-500 to-amber-500' : `${currentLevelColor.gradient}`;

  return (
    <div className="min-h-screen bg-[#0a0a1a] p-4 md:p-6 relative overflow-hidden">
      <style>{globalStyles}</style>
      <Confetti show={showConfetti} />

      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-10 left-10 w-48 h-48 bg-blue-600/5 rounded-full blur-[100px] animate-blob" />
        <div className="absolute bottom-10 right-10 w-48 h-48 bg-purple-600/5 rounded-full blur-[80px] animate-blob animation-delay-2000" />
      </div>

      <div className="relative z-10 max-w-2xl mx-auto">
        {/* Top Bar */}
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-3">
            {/* Score */}
            <div className="bg-white/[0.03] backdrop-blur-sm rounded-xl px-4 py-2.5 border border-white/10 flex items-center gap-2">
              <Star className="w-4 h-4 text-yellow-400" />
              <span className="text-white font-bold text-sm">{score}</span>
            </div>

            {/* Streak */}
            {streak > 0 && (
              <div className="bg-gradient-to-r from-orange-500/20 to-red-500/20 rounded-xl px-4 py-2.5 border border-orange-500/30 flex items-center gap-2 animate-fadeIn">
                <Zap className="w-4 h-4 text-orange-400" />
                <span className="text-orange-300 font-bold text-sm">{streak}x</span>
              </div>
            )}
          </div>

          {/* Timer */}
          <div className={`rounded-xl px-4 py-2.5 border flex items-center gap-2 transition-all ${
            timeLeft <= 5 ? 'bg-red-500/10 border-red-500/30 animate-timerPulse' :
            timeLeft <= 10 ? 'bg-orange-500/10 border-orange-500/30' :
            'bg-white/[0.03] border-white/10'
          }`}>
            <Clock className={`w-4 h-4 ${timerColor}`} />
            <span className={`font-bold text-sm tabular-nums ${timerColor}`}>{timeLeft}s</span>
          </div>
        </div>

        {/* Progress */}
        <div className="mb-6">
          <div className="flex justify-between items-center text-xs mb-2">
            <span className="text-white/40">Câu {currentQuestion + 1} / {questions.length}</span>
            <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${currentLevelColor.bg} ${currentLevelColor.text} border ${currentLevelColor.border}`}>
              Lớp {currentQ.level}
            </span>
          </div>
          <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
            <div
              className={`h-full bg-gradient-to-r ${currentLevelColor.gradient} rounded-full transition-all duration-500 ease-out`}
              style={{ width: `${progress}%` }}
            />
          </div>
          {/* Timer bar */}
          <div className="h-0.5 bg-white/5 rounded-full overflow-hidden mt-1.5">
            <div
              className={`h-full bg-gradient-to-r ${timerBarColor} rounded-full transition-all duration-1000 ease-linear`}
              style={{ width: `${timerPercentage}%` }}
            />
          </div>
        </div>

        {/* Question Card */}
        <div className="bg-white/[0.03] backdrop-blur-xl rounded-3xl p-7 md:p-9 border border-white/10 shadow-2xl animate-fadeIn" key={currentQuestion}>
          {/* Question */}
          <div className="text-center mb-8">
            <div className="text-5xl mb-4">{currentQ.emoji}</div>
            <h2 className="text-xl md:text-2xl font-bold text-white leading-relaxed">
              {currentQ.question}
            </h2>
          </div>

          {/* Hint */}
          {showHint && (
            <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-4 mb-6 animate-fadeIn">
              <div className="flex items-center gap-2 text-amber-300">
                <Lightbulb className="w-5 h-5 flex-shrink-0" />
                <span className="text-sm font-medium">{currentQ.hint}</span>
              </div>
            </div>
          )}

          {/* Options */}
          {currentQ.type === 'truefalse' ? (
            <TrueFalseQuiz
              question={currentQ}
              userAnswer={selectedAnswer}
              isAnswered={isAnswered}
              onAnswer={handleAnswerSelect}
            />
          ) : (
            <div className="grid gap-3">
              {shuffledOptions.map((option, index) => {
                const isSelected = selectedAnswer === option;
                const isCorrect = option === currentQ.answer;
                const showCorrect = isAnswered && isCorrect;
                const showWrong = isAnswered && isSelected && !isCorrect;

                return (
                  <button
                    key={index}
                    onClick={() => handleAnswerSelect(option)}
                    disabled={isAnswered}
                    className={`w-full p-4 rounded-2xl text-left font-medium transition-all duration-300 border ${
                      showCorrect
                        ? 'bg-emerald-500/15 border-emerald-400/50 text-emerald-300 scale-[1.02] shadow-lg shadow-emerald-500/10'
                        : showWrong
                        ? 'bg-red-500/15 border-red-400/50 text-red-300 shake'
                        : isSelected && !isAnswered
                        ? 'bg-blue-500/15 border-blue-400/50 text-blue-300'
                        : 'bg-white/[0.02] border-white/5 text-white/80 hover:bg-white/[0.06] hover:border-white/15'
                    } ${isAnswered && !isSelected && !isCorrect ? 'opacity-30' : ''}`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold ${
                          showCorrect ? 'bg-emerald-500/30 text-emerald-300' :
                          showWrong ? 'bg-red-500/30 text-red-300' :
                          'bg-white/5 text-white/50'
                        }`}>
                          {String.fromCharCode(65 + index)}
                        </span>
                        <span className="text-sm md:text-base">{option}</span>
                      </div>
                      {showCorrect && <CheckCircle className="w-5 h-5 text-emerald-400" />}
                      {showWrong && <XCircle className="w-5 h-5 text-red-400" />}
                    </div>
                  </button>
                );
              })}
            </div>
          )}

          {/* Hint Button */}
          {!showHint && !isAnswered && hintsUsed < 5 && (
            <button
              onClick={useHint}
              className="mt-6 w-full py-3 bg-white/[0.02] hover:bg-white/[0.05] text-white/40 hover:text-white/60 rounded-xl border border-white/5 hover:border-white/10 transition-all duration-300 flex items-center justify-center gap-2 text-sm"
            >
              <Lightbulb className="w-4 h-4" />
              Dùng gợi ý ({5 - hintsUsed} còn lại)
            </button>
          )}
        </div>

        {/* Question dots */}
        <div className="flex justify-center gap-1 mt-6 flex-wrap">
          {questions.map((q, i) => {
            const isCompleted = i < currentQuestion;
            const isCurrent = i === currentQuestion;
            const wasCorrect = isCompleted && answers[i] === q.answer;
            const lc = levelColors[q.level];
            return (
              <div
                key={i}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  isCurrent ? `w-6 bg-gradient-to-r ${lc.gradient}` :
                  isCompleted && wasCorrect ? 'bg-emerald-500/60' :
                  isCompleted ? 'bg-red-500/40' :
                  'bg-white/10'
                }`}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default PlacementTest;
