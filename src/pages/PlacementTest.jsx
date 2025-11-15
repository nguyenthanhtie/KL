import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Button from '../components/ui/Button';
import { useAuth } from '../contexts/AuthContext';
import { API_BASE_URL } from '../config/api';

// Sample questions - in a real app, these would come from a database
const questions = [
  // Lớp 8 (5 câu)
  {
    question: "Chất nào sau đây là đơn chất?",
    options: ["H2O", "O2", "NaCl", "CO2"],
    answer: "O2",
    level: 8
  },
  {
    question: "Công thức hóa học của axit sunfuric là gì?",
    options: ["H2SO4", "HCl", "NaOH", "H2O"],
    answer: "H2SO4",
    level: 8
  },
  {
    question: "Phản ứng hóa học là gì?",
    options: ["Quá trình chất biến đổi tạo ra chất mới", "Quá trình hòa tan một chất", "Quá trình thay đổi trạng thái", "Quá trình vật lý"],
    answer: "Quá trình chất biến đổi tạo ra chất mới",
    level: 8
  },
  {
    question: "Ký hiệu hóa học của Sắt là gì?",
    options: ["S", "Fe", "Si", "Na"],
    answer: "Fe",
    level: 8
  },
  {
    question: "Trong không khí, khí nào chiếm tỉ lệ lớn nhất?",
    options: ["Oxi", "Cacbonic", "Nito", "Heli"],
    answer: "Nito",
    level: 8
  },
  // Lớp 9 (5 câu)
  {
    question: "Dung dịch làm quỳ tím hóa xanh là?",
    options: ["Axit", "Bazo", "Muối", "Nước"],
    answer: "Bazo",
    level: 9
  },
  {
    question: "Kim loại nào sau đây tác dụng được với nước ở nhiệt độ thường?",
    options: ["Cu", "Fe", "Na", "Ag"],
    answer: "Na",
    level: 9
  },
  {
    question: "Chất nào được dùng để sản xuất vôi sống?",
    options: ["CaCO3", "NaCl", "H2SO4", "SO2"],
    answer: "CaCO3",
    level: 9
  },
  {
    question: "Dãy kim loại nào sau đây được sắp xếp theo chiều hoạt động hóa học giảm dần?",
    options: ["K, Na, Mg, Al", "Al, Mg, Na, K", "Na, K, Al, Mg", "Mg, Al, K, Na"],
    answer: "K, Na, Mg, Al",
    level: 9
  },
  {
    question: "Khí metan (CH4) có nhiều trong đâu?",
    options: ["Mỏ than", "Không khí", "Nước biển", "Mỏ đá vôi"],
    answer: "Mỏ than",
    level: 9
  },
  // Lớp 10 (10 câu)
  {
    question: "Số electron tối đa ở lớp M (n=3) là?",
    options: ["2", "8", "18", "32"],
    answer: "18",
    level: 10
  },
  {
    question: "Nguyên tử của nguyên tố X có Z=11. Cấu hình electron của X là?",
    options: ["1s2 2s2 2p6 3s1", "1s2 2s2 2p5 3s2", "1s2 2s2 2p6", "1s2 2s2 2p6 3s2"],
    answer: "1s2 2s2 2p6 3s1",
    level: 10
  },
  {
    question: "Liên kết trong phân tử NaCl là liên kết gì?",
    options: ["Cộng hóa trị", "Ion", "Kim loại", "Hydro"],
    answer: "Ion",
    level: 10
  },
  {
    question: "Số oxi hóa của S trong H2SO4 là?",
    options: ["+2", "+4", "+6", "-2"],
    answer: "+6",
    level: 10
  },
  {
    question: "Trong bảng tuần hoàn, Flo (F) thuộc nhóm nào?",
    options: ["IA", "IIA", "VIIA", "VIIIA"],
    answer: "VIIA",
    level: 10
  },
  {
    question: "Phản ứng tỏa nhiệt là phản ứng có Delta H...?",
    options: ["< 0", "> 0", "= 0", "Không xác định"],
    answer: "< 0",
    level: 10
  },
  {
    question: "Tốc độ phản ứng KHÔNG phụ thuộc vào yếu tố nào sau đây?",
    options: ["Nồng độ", "Nhiệt độ", "Chất xúc tác", "Màu sắc chất"],
    answer: "Màu sắc chất",
    level: 10
  },
  {
    question: "Chất nào sau đây là chất điện li mạnh?",
    options: ["H2O", "CH3COOH", "HCl", "C2H5OH"],
    answer: "HCl",
    level: 10
  },
  {
    question: "Halogen nào có tính oxi hóa mạnh nhất?",
    options: ["Flo", "Clo", "Brom", "Iot"],
    answer: "Flo",
    level: 10
  },
  {
    question: "Khí SO2 là nguyên nhân chính gây ra hiện tượng gì?",
    options: ["Hiệu ứng nhà kính", "Mưa axit", "Thủng tầng ozon", "Thủy triều đỏ"],
    answer: "Mưa axit",
    level: 10
  },
  // Lớp 11 (5 câu)
  {
    question: "Công thức chung của ankan là?",
    options: ["CnH2n+2 (n>=1)", "CnH2n (n>=2)", "CnH2n-2 (n>=2)", "CnH2n-6 (n>=6)"],
    answer: "CnH2n+2 (n>=1)",
    level: 11
  },
  {
    question: "Chất nào sau đây là anken?",
    options: ["CH4", "C2H4", "C2H2", "C6H6"],
    answer: "C2H4",
    level: 11
  },
  {
    question: "Dẫn xuất halogen nào được dùng làm chất gây mê?",
    options: ["Freon", "Cloroform", "DDT", "Teflon"],
    answer: "Cloroform",
    level: 11
  },
  {
    question: "Ancol etylic có công thức là?",
    options: ["CH3OH", "C2H5OH", "C3H7OH", "CH3COOH"],
    answer: "C2H5OH",
    level: 11
  },
  {
    question: "Phenol (C6H5OH) có tính chất hóa học đặc trưng là?",
    options: ["Tính axit yếu", "Tính bazo yếu", "Trung tính", "Lưỡng tính"],
    answer: "Tính axit yếu",
    level: 11
  },
  // Lớp 12 (5 câu)
  {
    question: "Chất nào sau đây là este?",
    options: ["CH3COOH", "CH3COOCH3", "C2H5OH", "HCHO"],
    answer: "CH3COOCH3",
    level: 12
  },
  {
    question: "Chất béo là trieste của axit béo với chất nào sau đây?",
    options: ["Etanol", "Glixerol", "Metanol", "Phenol"],
    answer: "Glixerol",
    level: 12
  },
  {
    question: "Saccarozơ và glucozơ đều có phản ứng nào?",
    options: ["Tráng gương", "Thủy phân", "Với Cu(OH)2", "Màu với iot"],
    answer: "Với Cu(OH)2",
    level: 12
  },
  {
    question: "Polime nào sau đây được điều chế bằng phản ứng trùng hợp?",
    options: ["Tơ nilon-6,6", "Poli(etylen terephtalat)", "Poli(vinyl clorua)", "Tơ lapsan"],
    answer: "Poli(vinyl clorua)",
    level: 12
  },
  {
    question: "Kim loại nào sau đây có tính khử mạnh nhất?",
    options: ["K", "Mg", "Cu", "Ag"],
    answer: "K",
    level: 12
  }
];


const PlacementTest = () => {
  const [answers, setAnswers] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { programId } = useParams();
  const { user, setUser } = useAuth();

  const handleOptionChange = (questionIndex, option) => {
    setAnswers(prev => ({
      ...prev,
      [questionIndex]: option
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

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
    const gradeLevels = [8, 9, 10, 11];

    for (const level of gradeLevels) {
      const levelScore = scoresByLevel[level];
      if (levelScore && levelScore.total > 0) {
        const percentage = (levelScore.correct / levelScore.total);
        if (percentage > 0.6) {
          assignedGrade = level + 1;
        } else {
          assignedGrade = level;
          break;
        }
      }
    }
    
    const totalScore = Object.values(scoresByLevel).reduce((acc, level) => acc + level.correct, 0);

    try {
      // 1. Cập nhật grade cho user
      const gradeResponse = await fetch(`${API_BASE_URL}/users/update-grade`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ grade: assignedGrade, userId: user.uid }),
      });

      const gradeData = await gradeResponse.json();

      if (!gradeResponse.ok) {
        throw new Error(gradeData.message || 'Cập nhật lớp thất bại');
      }

      // 2. Đăng ký chương trình học (nếu có programId)
      if (programId) {
        const programNames = {
          chemistry: 'Hóa học',
          physics: 'Vật lý',
          biology: 'Sinh học',
          math: 'Toán học'
        };

        const enrollResponse = await fetch(`${API_BASE_URL}/users/enroll-program`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ 
            userId: user.uid,
            programId: programId,
            programName: programNames[programId] || programId,
            initialClassId: assignedGrade
          }),
        });

        const enrollData = await enrollResponse.json();

        if (!enrollResponse.ok) {
          throw new Error(enrollData.message || 'Đăng ký chương trình thất bại');
        }

        // Cập nhật user trong context
        setUser(prevUser => ({
          ...prevUser, 
          profile: { ...prevUser.profile, grade: assignedGrade },
          programs: enrollData.user.programs
        }));
      } else {
        // Chỉ cập nhật grade nếu không có programId
        setUser(prevUser => ({
          ...prevUser, 
          profile: { ...prevUser.profile, grade: assignedGrade }
        }));
      }

      alert(`Bạn đã hoàn thành bài kiểm tra! Điểm của bạn là ${totalScore}/${questions.length}. Lớp đề xuất cho bạn là: Lớp ${assignedGrade}`);
      
      // 3. Chuyển đến trang home của chương trình
      if (programId) {
        navigate(`/program/${programId}`);
      } else {
        // Fallback nếu không có programId
        navigate('/');
      }

    } catch (error) {
      console.error("Error updating grade:", error);
      alert(`Có lỗi xảy ra: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-xl p-8">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-2">Bài kiểm tra đánh giá năng lực</h1>
        <p className="text-center text-gray-600 mb-8">Hoàn thành 30 câu hỏi để chúng tôi có thể đề xuất lộ trình học phù hợp nhất cho bạn.</p>
        
        <form onSubmit={handleSubmit}>
          <div className="space-y-8">
            {questions.map((q, index) => (
              <div key={index} className="border-b border-gray-200 pb-6">
                <p className="text-lg font-semibold text-gray-800 mb-4">{index + 1}. {q.question}</p>
                <div className="space-y-2">
                  {q.options.map((option, i) => (
                    <label key={i} className="flex items-center p-3 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer">
                      <input
                        type="radio"
                        name={`question-${index}`}
                        value={option}
                        checked={answers[index] === option}
                        onChange={() => handleOptionChange(index, option)}
                        className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300"
                      />
                      <span className="ml-3 text-gray-700">{option}</span>
                    </label>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10">
            <Button
              type="submit"
              disabled={loading || Object.keys(answers).length < questions.length}
              className="w-full bg-gradient-to-r from-green-500 to-teal-600 hover:from-green-600 hover:to-teal-700 text-white py-3 px-6 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Đang nộp bài...' : `Hoàn thành và xem kết quả (${Object.keys(answers).length}/${questions.length})`}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PlacementTest;
