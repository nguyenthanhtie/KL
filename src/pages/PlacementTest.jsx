import { useState, useEffect, useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { API_BASE_URL } from '../config/api';
import { Sparkles, Trophy, Zap, Clock, Target, ChevronRight, Star, CheckCircle, XCircle, Award } from 'lucide-react';

// Questions data với emoji và hints
const questions = [
  // Lớp 8 (5 câu)
  {
    question: "Chất nào sau đây là đơn chất?",
    options: ["H2O", "O2", "NaCl", "CO2"],
    answer: "O2",
    level: 8,
    emoji: "🧪",
    hint: "Đơn chất chỉ chứa một loại nguyên tố"
  },
  {
    question: "Công thức hóa học của axit sunfuric là gì?",
    options: ["H2SO4", "HCl", "NaOH", "H2O"],
    answer: "H2SO4",
    level: 8,
    emoji: "⚗️",
    hint: "Axit mạnh chứa lưu huỳnh"
  },
  {
    question: "Phản ứng hóa học là gì?",
    options: ["Quá trình chất biến đổi tạo ra chất mới", "Quá trình hòa tan một chất", "Quá trình thay đổi trạng thái", "Quá trình vật lý"],
    answer: "Quá trình chất biến đổi tạo ra chất mới",
    level: 8,
    emoji: "💥",
    hint: "Tạo ra chất mới khác với chất ban đầu"
  },
  {
    question: "Ký hiệu hóa học của Sắt là gì?",
    options: ["S", "Fe", "Si", "Na"],
    answer: "Fe",
    level: 8,
    emoji: "🔩",
    hint: "Ferrum trong tiếng Latin"
  },
  {
    question: "Trong không khí, khí nào chiếm tỉ lệ lớn nhất?",
    options: ["Oxi", "Cacbonic", "Nito", "Heli"],
    answer: "Nito",
    level: 8,
    emoji: "🌬️",
    hint: "Chiếm khoảng 78% không khí"
  },
  // Lớp 9 (5 câu)
  {
    question: "Dung dịch làm quỳ tím hóa xanh là?",
    options: ["Axit", "Bazo", "Muối", "Nước"],
    answer: "Bazo",
    level: 9,
    emoji: "🔵",
    hint: "Chất có tính kiềm"
  },
  {
    question: "Kim loại nào sau đây tác dụng được với nước ở nhiệt độ thường?",
    options: ["Cu", "Fe", "Na", "Ag"],
    answer: "Na",
    level: 9,
    emoji: "💧",
    hint: "Kim loại kiềm rất hoạt động"
  },
  {
    question: "Chất nào được dùng để sản xuất vôi sống?",
    options: ["CaCO3", "NaCl", "H2SO4", "SO2"],
    answer: "CaCO3",
    level: 9,
    emoji: "🏗️",
    hint: "Đá vôi hay đá phite"
  },
  {
    question: "Dãy kim loại nào sau đây được sắp xếp theo chiều hoạt động hóa học giảm dần?",
    options: ["K, Na, Mg, Al", "Al, Mg, Na, K", "Na, K, Al, Mg", "Mg, Al, K, Na"],
    answer: "K, Na, Mg, Al",
    level: 9,
    emoji: "📊",
    hint: "Kali hoạt động mạnh nhất"
  },
  {
    question: "Khí metan (CH4) có nhiều trong đâu?",
    options: ["Mỏ than", "Không khí", "Nước biển", "Mỏ đá vôi"],
    answer: "Mỏ than",
    level: 9,
    emoji: "⛏️",
    hint: "Khí gây nổ nguy hiểm trong hầm mỏ"
  },
  // Lớp 10 (10 câu)
  {
    question: "Số electron tối đa ở lớp M (n=3) là?",
    options: ["2", "8", "18", "32"],
    answer: "18",
    level: 10,
    emoji: "⚛️",
    hint: "Công thức 2n²"
  },
  {
    question: "Nguyên tử của nguyên tố X có Z=11. Cấu hình electron của X là?",
    options: ["1s2 2s2 2p6 3s1", "1s2 2s2 2p5 3s2", "1s2 2s2 2p6", "1s2 2s2 2p6 3s2"],
    answer: "1s2 2s2 2p6 3s1",
    level: 10,
    emoji: "🔬",
    hint: "Natri có 11 electron"
  },
  {
    question: "Liên kết trong phân tử NaCl là liên kết gì?",
    options: ["Cộng hóa trị", "Ion", "Kim loại", "Hydro"],
    answer: "Ion",
    level: 10,
    emoji: "🔗",
    hint: "Kim loại + phi kim"
  },
  {
    question: "Số oxi hóa của S trong H2SO4 là?",
    options: ["+2", "+4", "+6", "-2"],
    answer: "+6",
    level: 10,
    emoji: "🎯",
    hint: "H: +1, O: -2, tổng = 0"
  },
  {
    question: "Trong bảng tuần hoàn, Flo (F) thuộc nhóm nào?",
    options: ["IA", "IIA", "VIIA", "VIIIA"],
    answer: "VIIA",
    level: 10,
    emoji: "📋",
    hint: "Nhóm halogen"
  },
  {
    question: "Phản ứng tỏa nhiệt là phản ứng có Delta H...?",
    options: ["< 0", "> 0", "= 0", "Không xác định"],
    answer: "< 0",
    level: 10,
    emoji: "🔥",
    hint: "Năng lượng thoát ra môi trường"
  },
  {
    question: "Tốc độ phản ứng KHÔNG phụ thuộc vào yếu tố nào sau đây?",
    options: ["Nồng độ", "Nhiệt độ", "Chất xúc tác", "Màu sắc chất"],
    answer: "Màu sắc chất",
    level: 10,
    emoji: "⏱️",
    hint: "Màu sắc là tính chất vật lý"
  },
  {
    question: "Chất nào sau đây là chất điện li mạnh?",
    options: ["H2O", "CH3COOH", "HCl", "C2H5OH"],
    answer: "HCl",
    level: 10,
    emoji: "⚡",
    hint: "Axit mạnh phân li hoàn toàn"
  },
  {
    question: "Halogen nào có tính oxi hóa mạnh nhất?",
    options: ["Flo", "Clo", "Brom", "Iot"],
    answer: "Flo",
    level: 10,
    emoji: "🌟",
    hint: "Độ âm điện cao nhất"
  },
  {
    question: "Khí SO2 là nguyên nhân chính gây ra hiện tượng gì?",
    options: ["Hiệu ứng nhà kính", "Mưa axit", "Thủng tầng ozon", "Thủy triều đỏ"],
    answer: "Mưa axit",
    level: 10,
    emoji: "🌧️",
    hint: "Ô nhiễm không khí từ nhà máy"
  },
  // Lớp 11 (5 câu)
  {
    question: "Công thức chung của ankan là?",
    options: ["CnH2n+2 (n>=1)", "CnH2n (n>=2)", "CnH2n-2 (n>=2)", "CnH2n-6 (n>=6)"],
    answer: "CnH2n+2 (n>=1)",
    level: 11,
    emoji: "🛢️",
    hint: "Hydrocacbon no, mạch hở"
  },
  {
    question: "Chất nào sau đây là anken?",
    options: ["CH4", "C2H4", "C2H2", "C6H6"],
    answer: "C2H4",
    level: 11,
    emoji: "🧬",
    hint: "Có liên kết đôi C=C"
  },
  {
    question: "Dẫn xuất halogen nào được dùng làm chất gây mê?",
    options: ["Freon", "Cloroform", "DDT", "Teflon"],
    answer: "Cloroform",
    level: 11,
    emoji: "💉",
    hint: "CHCl3 - dùng trong y tế"
  },
  {
    question: "Ancol etylic có công thức là?",
    options: ["CH3OH", "C2H5OH", "C3H7OH", "CH3COOH"],
    answer: "C2H5OH",
    level: 11,
    emoji: "🍷",
    hint: "Có trong rượu, bia"
  },
  {
    question: "Phenol (C6H5OH) có tính chất hóa học đặc trưng là?",
    options: ["Tính axit yếu", "Tính bazo yếu", "Trung tính", "Lưỡng tính"],
    answer: "Tính axit yếu",
    level: 11,
    emoji: "🧴",
    hint: "Vòng benzen + nhóm OH"
  },
  // Lớp 12 (5 câu)
  {
    question: "Chất nào sau đây là este?",
    options: ["CH3COOH", "CH3COOCH3", "C2H5OH", "HCHO"],
    answer: "CH3COOCH3",
    level: 12,
    emoji: "🍌",
    hint: "Có nhóm -COO- trong phân tử"
  },
  {
    question: "Chất béo là trieste của axit béo với chất nào sau đây?",
    options: ["Etanol", "Glixerol", "Metanol", "Phenol"],
    answer: "Glixerol",
    level: 12,
    emoji: "🧈",
    hint: "Rượu 3 chức C3H5(OH)3"
  },
  {
    question: "Saccarozơ và glucozơ đều có phản ứng nào?",
    options: ["Tráng gương", "Thủy phân", "Với Cu(OH)2", "Màu với iot"],
    answer: "Với Cu(OH)2",
    level: 12,
    emoji: "🍬",
    hint: "Đều có nhóm OH liền kề"
  },
  {
    question: "Polime nào sau đây được điều chế bằng phản ứng trùng hợp?",
    options: ["Tơ nilon-6,6", "Poli(etylen terephtalat)", "Poli(vinyl clorua)", "Tơ lapsan"],
    answer: "Poli(vinyl clorua)",
    level: 12,
    emoji: "🧵",
    hint: "PVC - nhựa phổ biến"
  },
  {
    question: "Kim loại nào sau đây có tính khử mạnh nhất?",
    options: ["K", "Mg", "Cu", "Ag"],
    answer: "K",
    level: 12,
    emoji: "🥇",
    hint: "Kim loại kiềm nhóm IA"
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

  // Initialize shuffled options for current question
  useEffect(() => {
    if (quizStarted && questions[currentQuestion]) {
      setShuffledOptions(shuffleArray(questions[currentQuestion].options));
    }
  }, [currentQuestion, quizStarted]);

  // Lấy curriculum đã chọn khi component mount
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

  // Timer countdown
  useEffect(() => {
    if (!quizStarted || showResult || isAnswered) return;
    
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
      setTimeout(() => {
        goToNextQuestion();
      }, 1500);
    }
  }, [isAnswered]);

  const handleAnswerSelect = (option) => {
    if (isAnswered) return;
    
    setSelectedAnswer(option);
    setIsAnswered(true);
    
    const isCorrect = option === questions[currentQuestion].answer;
    
    setAnswers(prev => ({
      ...prev,
      [currentQuestion]: option
    }));

    if (isCorrect) {
      const timeBonus = Math.floor(timeLeft / 3);
      const streakBonus = Math.min(streak, 5);
      const basePoints = 10;
      const pointsEarned = basePoints + timeBonus + streakBonus;
      
      setScore(prev => prev + pointsEarned);
      setStreak(prev => prev + 1);
      
      if (streak >= 2) {
        setShowConfetti(true);
        setTimeout(() => setShowConfetti(false), 2000);
      }
    } else {
      setStreak(0);
    }

    setTimeout(() => {
      goToNextQuestion();
    }, 1500);
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

    // Tính điểm theo từng cấp độ
    const scoresByLevel = {};
    questions.forEach((q, index) => {
      if (!scoresByLevel[q.level]) {
        scoresByLevel[q.level] = { correct: 0, total: 0 };
      }
      scoresByLevel[q.level].total++;
      if (answers[index] === q.answer) {
        scoresByLevel[q.level].correct++;
      }
    });

    // Xác định lớp phù hợp dựa trên kết quả
    let assignedGrade = 8;
    const gradeLevels = [8, 9, 10, 11, 12];

    for (const level of gradeLevels) {
      const levelScore = scoresByLevel[level];
      if (levelScore && levelScore.total > 0) {
        const percentage = (levelScore.correct / levelScore.total);
        if (percentage >= 0.7) {
          assignedGrade = Math.min(level + 1, 12);
        } else {
          assignedGrade = level;
          break;
        }
      }
    }
    
    const totalScore = Object.values(scoresByLevel).reduce((acc, level) => acc + level.correct, 0);
    const totalQuestions = questions.length;

    try {
      if (!user || !user.email) {
        console.error('User object:', user);
        throw new Error('Bạn cần đăng nhập để hoàn thành bài kiểm tra');
      }

      console.log('Submitting placement test for user:', user.email);

      const programNames = {
        chemistry: 'Hóa học',
        physics: 'Vật lý',
        biology: 'Sinh học',
        math: 'Toán học'
      };

      const selectedProgramName = programNames[programId] || 'Chương trình học';

      const selectedCurriculumData = localStorage.getItem('selectedCurriculum');
      let curriculumType = null;
      let curriculumName = null;
      
      if (selectedCurriculumData) {
        try {
          const curriculumInfo = JSON.parse(selectedCurriculumData);
          curriculumType = curriculumInfo.curriculumType;
          curriculumName = curriculumInfo.curriculumName;
          console.log('Found selected curriculum:', curriculumInfo);
        } catch (e) {
          console.error('Error parsing curriculum data:', e);
        }
      }

      const response = await fetch(`${API_BASE_URL}/users/enroll-program`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          userId: user.email,
          programId: programId,
          programName: selectedProgramName,
          initialClassId: assignedGrade,
          placementTestScore: totalScore,
          placementTestTotal: totalQuestions,
          curriculumType: curriculumType
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        console.error('API Error:', data);
        throw new Error(data.message || 'Không thể lưu kết quả kiểm tra');
      }

      if (data.user) {
        setUser(data.user);
        localStorage.setItem('user', JSON.stringify(data.user));
      }

      localStorage.removeItem('selectedCurriculum');
      navigate(`/program/${programId}`);

    } catch (error) {
      console.error("Error submitting placement test:", error);
      alert(`❌ Có lỗi xảy ra: ${error.message}\n\nVui lòng thử lại sau.`);
    } finally {
      setLoading(false);
    }
  };

  // Calculate stats for result screen
  const getStats = () => {
    let correct = 0;
    questions.forEach((q, index) => {
      if (answers[index] === q.answer) correct++;
    });
    return {
      correct,
      total: questions.length,
      percentage: Math.round((correct / questions.length) * 100),
      avgTime: Math.round(totalTime / questions.length)
    };
  };

  // Get assigned grade based on answers
  const getAssignedGrade = () => {
    const scoresByLevel = {};
    questions.forEach((q, index) => {
      if (!scoresByLevel[q.level]) {
        scoresByLevel[q.level] = { correct: 0, total: 0 };
      }
      scoresByLevel[q.level].total++;
      if (answers[index] === q.answer) {
        scoresByLevel[q.level].correct++;
      }
    });

    let assignedGrade = 8;
    const gradeLevels = [8, 9, 10, 11, 12];

    for (const level of gradeLevels) {
      const levelScore = scoresByLevel[level];
      if (levelScore && levelScore.total > 0) {
        const percentage = (levelScore.correct / levelScore.total);
        if (percentage >= 0.7) {
          assignedGrade = Math.min(level + 1, 12);
        } else {
          assignedGrade = level;
          break;
        }
      }
    }
    return assignedGrade;
  };

  const currentQ = questions[currentQuestion];
  const progress = ((currentQuestion) / questions.length) * 100;

  // Start Screen
  if (!quizStarted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 flex items-center justify-center p-4 relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-20 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob" />
          <div className="absolute top-40 right-20 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000" />
          <div className="absolute bottom-20 left-1/2 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000" />
        </div>

        <div className="relative z-10 max-w-2xl w-full">
          <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 border border-white/20 shadow-2xl">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-2xl mb-6 shadow-lg">
                <Sparkles className="w-10 h-10 text-white" />
              </div>
              
              <h1 className="text-4xl font-bold text-white mb-4">
                Bài Quiz Đánh Giá Năng Lực
              </h1>
              <p className="text-lg text-white/80 mb-8">
                Trả lời 30 câu hỏi để khám phá trình độ của bạn và nhận lộ trình học tập phù hợp nhất!
              </p>

              {selectedCurriculum && (
                <div className="bg-white/10 rounded-xl p-4 mb-6 border border-white/20">
                  <p className="text-white/90">
                    <span className="font-semibold">📖 Chương trình:</span> {selectedCurriculum.curriculumName}
                  </p>
                </div>
              )}

              <div className="grid grid-cols-3 gap-4 mb-8">
                <div className="bg-white/10 rounded-xl p-4 border border-white/10">
                  <div className="text-3xl font-bold text-yellow-400 mb-1">30</div>
                  <div className="text-sm text-white/70">Câu hỏi</div>
                </div>
                <div className="bg-white/10 rounded-xl p-4 border border-white/10">
                  <div className="text-3xl font-bold text-green-400 mb-1">30s</div>
                  <div className="text-sm text-white/70">Mỗi câu</div>
                </div>
                <div className="bg-white/10 rounded-xl p-4 border border-white/10">
                  <div className="text-3xl font-bold text-blue-400 mb-1">5</div>
                  <div className="text-sm text-white/70">Gợi ý</div>
                </div>
              </div>

              <div className="space-y-3 text-left mb-8 bg-white/5 rounded-xl p-4">
                <div className="flex items-center gap-3 text-white/80">
                  <Zap className="w-5 h-5 text-yellow-400" />
                  <span>Trả lời nhanh để nhận điểm thưởng thời gian</span>
                </div>
                <div className="flex items-center gap-3 text-white/80">
                  <Target className="w-5 h-5 text-green-400" />
                  <span>Streak bonus: Trả lời đúng liên tiếp để nhân điểm</span>
                </div>
                <div className="flex items-center gap-3 text-white/80">
                  <Star className="w-5 h-5 text-purple-400" />
                  <span>Sử dụng gợi ý khi cần thiết (tối đa 5 lần)</span>
                </div>
              </div>

              <button
                onClick={startQuiz}
                className="w-full py-4 bg-gradient-to-r from-green-400 to-emerald-500 hover:from-green-500 hover:to-emerald-600 text-white font-bold text-xl rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center justify-center gap-3"
              >
                <Sparkles className="w-6 h-6" />
                Bắt đầu Quiz
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>

        <style>{`
          @keyframes blob {
            0% { transform: translate(0px, 0px) scale(1); }
            33% { transform: translate(30px, -50px) scale(1.1); }
            66% { transform: translate(-20px, 20px) scale(0.9); }
            100% { transform: translate(0px, 0px) scale(1); }
          }
          .animate-blob { animation: blob 7s infinite; }
          .animation-delay-2000 { animation-delay: 2s; }
          .animation-delay-4000 { animation-delay: 4s; }
        `}</style>
      </div>
    );
  }

  // Result Screen
  if (showResult) {
    const stats = getStats();
    const assignedGrade = getAssignedGrade();
    
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 flex items-center justify-center p-4 relative overflow-hidden">
        <Confetti show={true} />
        
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-20 w-72 h-72 bg-yellow-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" />
          <div className="absolute bottom-20 right-20 w-72 h-72 bg-green-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse animation-delay-2000" />
        </div>

        <div className="relative z-10 max-w-2xl w-full">
          <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 border border-white/20 shadow-2xl">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full mb-6 shadow-lg animate-bounce">
                <Trophy className="w-12 h-12 text-white" />
              </div>
              
              <h1 className="text-4xl font-bold text-white mb-2">
                🎉 Hoàn Thành Xuất Sắc!
              </h1>
              <p className="text-lg text-white/80 mb-8">
                Bạn đã hoàn thành bài quiz đánh giá năng lực
              </p>

              {/* Score Display */}
              <div className="bg-gradient-to-r from-yellow-400/20 to-orange-500/20 rounded-2xl p-6 mb-6 border border-yellow-400/30">
                <div className="text-6xl font-bold text-yellow-400 mb-2">{score}</div>
                <div className="text-white/70">Điểm Quiz</div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-white/10 rounded-xl p-4 border border-white/10">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <CheckCircle className="w-5 h-5 text-green-400" />
                    <span className="text-2xl font-bold text-white">{stats.correct}/{stats.total}</span>
                  </div>
                  <div className="text-sm text-white/70">Câu đúng</div>
                </div>
                <div className="bg-white/10 rounded-xl p-4 border border-white/10">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <Clock className="w-5 h-5 text-blue-400" />
                    <span className="text-2xl font-bold text-white">{stats.avgTime}s</span>
                  </div>
                  <div className="text-sm text-white/70">TB/câu</div>
                </div>
              </div>

              {/* Assigned Grade */}
              <div className="bg-gradient-to-r from-green-400/20 to-emerald-500/20 rounded-2xl p-6 mb-8 border border-green-400/30">
                <div className="flex items-center justify-center gap-3 mb-2">
                  <Award className="w-8 h-8 text-green-400" />
                  <span className="text-3xl font-bold text-white">Lớp {assignedGrade}</span>
                </div>
                <div className="text-white/80">Trình độ phù hợp của bạn</div>
              </div>

              <button
                onClick={handleSubmit}
                disabled={loading}
                className="w-full py-4 bg-gradient-to-r from-green-400 to-emerald-500 hover:from-green-500 hover:to-emerald-600 text-white font-bold text-xl rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
              >
                {loading ? (
                  <>
                    <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Đang xử lý...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-6 h-6" />
                    Bắt đầu học ngay
                    <ChevronRight className="w-6 h-6" />
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        <style>{`
          @keyframes confetti {
            0% { transform: translateY(-100vh) rotate(0deg); opacity: 1; }
            100% { transform: translateY(100vh) rotate(720deg); opacity: 0; }
          }
          .animate-confetti {
            width: 10px;
            height: 10px;
            animation: confetti 3s ease-in-out forwards;
          }
        `}</style>
      </div>
    );
  }

  // Quiz Screen
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 p-4 relative overflow-hidden">
      <Confetti show={showConfetti} />
      
      {/* Background effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-10 w-40 h-40 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob" />
        <div className="absolute bottom-10 right-10 w-40 h-40 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-2000" />
      </div>

      <div className="relative z-10 max-w-3xl mx-auto">
        {/* Header Stats */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            {/* Score */}
            <div className="bg-white/10 backdrop-blur-sm rounded-xl px-4 py-2 border border-white/20">
              <div className="flex items-center gap-2">
                <Star className="w-5 h-5 text-yellow-400" />
                <span className="text-white font-bold">{score}</span>
              </div>
            </div>
            
            {/* Streak */}
            {streak > 0 && (
              <div className="bg-gradient-to-r from-orange-500 to-red-500 rounded-xl px-4 py-2 animate-pulse">
                <div className="flex items-center gap-2">
                  <Zap className="w-5 h-5 text-white" />
                  <span className="text-white font-bold">{streak}x Streak!</span>
                </div>
              </div>
            )}
          </div>

          {/* Timer */}
          <div className={`rounded-xl px-4 py-2 border ${
            timeLeft <= 10 
              ? 'bg-red-500/20 border-red-400/50 animate-pulse' 
              : 'bg-white/10 border-white/20'
          }`}>
            <div className="flex items-center gap-2">
              <Clock className={`w-5 h-5 ${timeLeft <= 10 ? 'text-red-400' : 'text-white'}`} />
              <span className={`font-bold ${timeLeft <= 10 ? 'text-red-400' : 'text-white'}`}>{timeLeft}s</span>
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-6">
          <div className="flex justify-between text-sm text-white/70 mb-2">
            <span>Câu {currentQuestion + 1}/{questions.length}</span>
            <span>Lớp {currentQ.level}</span>
          </div>
          <div className="h-3 bg-white/10 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-green-400 to-emerald-500 rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Question Card */}
        <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 border border-white/20 shadow-2xl">
          {/* Question */}
          <div className="text-center mb-8">
            <div className="text-6xl mb-4">{currentQ.emoji}</div>
            <h2 className="text-2xl font-bold text-white leading-relaxed">
              {currentQ.question}
            </h2>
          </div>

          {/* Hint */}
          {showHint && (
            <div className="bg-yellow-400/20 border border-yellow-400/50 rounded-xl p-4 mb-6 animate-fadeIn">
              <div className="flex items-center gap-2 text-yellow-300">
                <Sparkles className="w-5 h-5" />
                <span className="font-medium">Gợi ý: {currentQ.hint}</span>
              </div>
            </div>
          )}

          {/* Options */}
          <div className="grid gap-4">
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
                  className={`w-full p-4 rounded-2xl text-left font-medium transition-all duration-300 transform ${
                    showCorrect
                      ? 'bg-green-500 text-white scale-105 shadow-lg shadow-green-500/30'
                      : showWrong
                        ? 'bg-red-500 text-white shake'
                        : isSelected
                          ? 'bg-white/30 text-white border-2 border-white'
                          : 'bg-white/10 text-white hover:bg-white/20 hover:scale-102 border border-white/10'
                  } ${isAnswered && !isSelected && !isCorrect ? 'opacity-50' : ''}`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                        showCorrect 
                          ? 'bg-white text-green-500' 
                          : showWrong 
                            ? 'bg-white text-red-500'
                            : 'bg-white/20 text-white'
                      }`}>
                        {String.fromCharCode(65 + index)}
                      </span>
                      <span>{option}</span>
                    </div>
                    {showCorrect && <CheckCircle className="w-6 h-6" />}
                    {showWrong && <XCircle className="w-6 h-6" />}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Hint Button */}
          {!showHint && !isAnswered && hintsUsed < 5 && (
            <button
              onClick={useHint}
              className="mt-6 w-full py-3 bg-white/5 hover:bg-white/10 text-white/70 hover:text-white rounded-xl border border-white/10 transition-all duration-300 flex items-center justify-center gap-2"
            >
              <Sparkles className="w-5 h-5" />
              Dùng gợi ý ({5 - hintsUsed} còn lại)
            </button>
          )}
        </div>
      </div>

      <style>{`
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
        @keyframes confetti {
          0% { transform: translateY(-100vh) rotate(0deg); opacity: 1; }
          100% { transform: translateY(100vh) rotate(720deg); opacity: 0; }
        }
        .animate-blob { animation: blob 7s infinite; }
        .animation-delay-2000 { animation-delay: 2s; }
        .shake { animation: shake 0.5s ease-in-out; }
        .animate-fadeIn { animation: fadeIn 0.3s ease-out; }
        .animate-confetti {
          width: 10px;
          height: 10px;
          animation: confetti 3s ease-in-out forwards;
        }
        .hover\\:scale-102:hover { transform: scale(1.02); }
      `}</style>
    </div>
  );
};

export default PlacementTest;
