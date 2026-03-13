import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Trophy, Timer, Lightbulb, CheckCircle, XCircle, Clock } from 'lucide-react';
import useChallengeProgress from '../../../hooks/useChallengeProgress';
import ResumeDialog from '../../../components/ResumeDialog';
import './CSS/Bai01_DoanHinhBatChu.css';

const DuoiHinhBatChu = () => {
  // Dữ liệu các chất hóa học với hình ảnh
  const chatHoaHoc = [
    {
      id: 1,
      ten: "Nước",
      congThuc: "H₂O",
      hinhAnh: "💧",
      moTa: "Chất lỏng trong suốt, không màu, không mùi, cần thiết cho sự sống",
      goiY: "Bắt đầu bằng 'N', 4 chữ cái"
    },
    {
      id: 2,
      ten: "Muối",
      congThuc: "NaCl",
      hinhAnh: "🧂",
      moTa: "Tinh thể trắng, vị mặn, tan trong nước, dùng trong nấu ăn",
      goiY: "Bắt đầu bằng 'M', 8 chữ cái (có dấu cách)"
    },
    {
      id: 3,
      ten: "Đường",
      congThuc: "C₁₂H₂₂O₁₁",
      hinhAnh: "🍯",
      moTa: "Tinh thể trắng, vị ngọt, tan trong nước, nguồn năng lượng",
      goiY: "Bắt đầu bằng 'Đ', 5 chữ cái"
    },
    {
      id: 4,
      ten: "Canxi",
      congThuc: "Ca",
      hinhAnh: "🦴",
      moTa: "Kim loại màu bạc, cần thiết cho xương và răng chắc khỏe",
      goiY: "Bắt đầu bằng 'C', 5 chữ cái"
    },
    {
      id: 5,
      ten: "Oxygen",
      congThuc: "O₂",
      hinhAnh: "🫁",
      moTa: "Khí không màu, không mùi, cần thiết cho hô hấp và cháy",
      goiY: "Bắt đầu bằng 'O', 6 chữ cái"
    },
    {
      id: 6,
      ten: "Carbon dioxide",
      congThuc: "CO₂",
      hinhAnh: "🌬️",
      moTa: "Khí không màu, nặng hơn không khí, gây hiệu ứng nhà kính",
      goiY: "Bắt đầu bằng 'C', 15 chữ cái (có dấu cách)"
    },
    {
      id: 7,
      ten: "Sắt",
      congThuc: "Fe",
      hinhAnh: "🔩",
      moTa: "Kim loại màu xám, có từ tính, dùng làm thép",
      goiY: "Bắt đầu bằng 'S', 3 chữ cái"
    },
    {
      id: 8,
      ten: "Vàng",
      congThuc: "Au",
      hinhAnh: "🏆",
      moTa: "Kim loại màu vàng, không bị gỉ, kim loại quý",
      goiY: "Bắt đầu bằng 'V', 4 chữ cái"
    },
    {
      id: 9,
      ten: "Axit clohidric",
      congThuc: "HCl",
      hinhAnh: "⚠️",
      moTa: "Dung dịch có tính ăn mòn mạnh, pH < 7, có trong dịch vị dạ dày",
      goiY: "Bắt đầu bằng 'A', 15 chữ cái (có dấu cách)"
    },
    {
      id: 10,
      ten: "Ethanol",
      congThuc: "C₂H₅OH",
      hinhAnh: "🍷",
      moTa: "Chất lỏng không màu, có trong rượu, nhiên liệu sinh học",
      goiY: "Bắt đầu bằng 'E', 7 chữ cái"
    }
  ];

  const { hasProgress, saveProgress, clearProgress, getProgress, completeChallenge } = useChallengeProgress('duoi-hinh-bat-chu', {
    challengeId: 1,
    programId: 'chemistry',
    grade: 8
  });
  
  const [startTime] = useState(() => Date.now());
  const [isCompleted, setIsCompleted] = useState(false);
  const [cauHienTai, setCauHienTai] = useState(0);
  const [diem, setDiem] = useState(0);
  const [ketQua, setKetQua] = useState('');
  const [daTraLoi, setDaTraLoi] = useState(false);
  const [thoiGian, setThoiGian] = useState(30);
  const [gameDangChay, setGameDangChay] = useState(false);
  const [lichSu, setLichSu] = useState([]);
  const [answerInput, setAnswerInput] = useState('');
  const [showHint, setShowHint] = useState(false);
  const [gameCompleted, setGameCompleted] = useState(false);
  const [showResumeDialog, setShowResumeDialog] = useState(false);
  const mountedRef = useRef(true);

  // Kiểm tra tiến trình khi component mount
  useEffect(() => {
    if (hasProgress && !gameDangChay && !gameCompleted) {
      setShowResumeDialog(true);
    }
  }, []);

  // Timer
  useEffect(() => {
    let timer;
    if (gameDangChay && thoiGian > 0 && !daTraLoi) {
      timer = setTimeout(() => {
        setThoiGian(thoiGian - 1);
      }, 1000);
    } else if (thoiGian === 0 && !daTraLoi) {
      handleTimeout();
    }
    return () => clearTimeout(timer);
  }, [thoiGian, gameDangChay, daTraLoi]);

  // Track mounted state
  useEffect(() => {
    mountedRef.current = true;
    return () => { mountedRef.current = false; };
  }, []);

  // Keyboard: Enter submits
  useEffect(() => {
    const handler = (e) => {
      if (!gameDangChay || daTraLoi) return;
      if (e.key === 'Enter') {
        handleSubmit();
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [gameDangChay, daTraLoi, answerInput]);

  const batDauGame = (fromBeginning = false) => {
    if (fromBeginning) {
      clearProgress();
      setGameDangChay(true);
      setCauHienTai(0);
      setDiem(0);
      setLichSu([]);
      setThoiGian(30);
      setDaTraLoi(false);
      setKetQua('');
      setAnswerInput('');
      setShowHint(false);
      setGameCompleted(false);
      setShowResumeDialog(false);
    } else {
      // Khôi phục tiến trình
      const saved = getProgress();
      if (saved) {
        setCauHienTai(saved.cauHienTai);
        setDiem(saved.diem);
        setLichSu(saved.lichSu);
        setThoiGian(30);
        setDaTraLoi(false);
        setKetQua('');
        setAnswerInput('');
        setShowHint(false);
        setGameCompleted(false);
        setGameDangChay(true);
        setShowResumeDialog(false);
      } else {
        // Không có tiến trình, bắt đầu mới
        batDauGame(true);
      }
    }
  };

  const handleTimeout = () => {
    setKetQua('timeout');
    setDaTraLoi(true);
    const chatHienTai = chatHoaHoc[cauHienTai];
    setLichSu(prev => [...prev, {
      cau: chatHienTai,
      luaChon: '',
      ketQua: 'timeout'
    }]);
  };

  // Normalize for comparison (case and diacritics insensitive)
  const normalize = (s = '') => s.toString().normalize('NFD').replace(/\p{Diacritic}/gu, '').toLowerCase().trim();

  const handleSubmit = () => {
    if (daTraLoi || !gameDangChay || !answerInput.trim()) return;
    
    const chat = chatHoaHoc[cauHienTai];
    const typed = answerInput.trim();
    const correct = normalize(typed) === normalize(chat.ten);
    
    setDaTraLoi(true);
    
    if (correct) {
      const newScore = diem + 10;
      setDiem(newScore);
      setKetQua('dung');
    } else {
      setKetQua('sai');
    }

    setLichSu(prev => [...prev, { 
      cau: chat, 
      luaChon: typed, 
      ketQua: correct ? 'dung' : 'sai' 
    }]);
  };

  const cauTiepTheo = () => {
    if (cauHienTai < chatHoaHoc.length - 1) {
      const nextIndex = cauHienTai + 1;
      setCauHienTai(nextIndex);
      setDaTraLoi(false);
      setKetQua('');
      setAnswerInput('');
      setThoiGian(30);
      setShowHint(false);
      
      // Lưu tiến trình
      saveProgress({
        cauHienTai: nextIndex,
        diem,
        lichSu
      });
    } else {
      setGameDangChay(false);
      setGameCompleted(true);
      // Không cần gọi clearProgress() ở đây vì completeChallenge sẽ tự xóa
      
      // Lưu kết quả hoàn thành vào database
      if (!isCompleted) {
        setIsCompleted(true);
        // Tính điểm cuối cùng: cộng thêm 10 nếu câu cuối đúng
        const lastCorrect = ketQua === 'dung' ? 1 : 0;
        const finalScore = diem + (lastCorrect * 10);
        const maxScore = chatHoaHoc.length * 10;
        const percentage = Math.round((finalScore / maxScore) * 100);
        const stars = percentage >= 80 ? 3 : percentage >= 50 ? 2 : 1;
        
        // Tính số câu đúng: lichSu hiện tại + câu cuối (nếu đúng)
        const correctInHistory = lichSu.filter(h => h.ketQua === 'dung').length;
        const totalCorrect = correctInHistory + lastCorrect;
        
        console.log('🎮 Completing challenge:', {
          finalScore,
          maxScore,
          percentage,
          stars,
          correctAnswers: totalCorrect,
          totalQuestions: chatHoaHoc.length
        });
        
        completeChallenge({
          score: finalScore,
          maxScore,
          percentage,
          stars,
          timeSpent: Math.floor((Date.now() - startTime) / 1000),
          correctAnswers: totalCorrect,
          totalQuestions: chatHoaHoc.length
        });
      }
    }
  };

  const choiLai = () => {
    clearProgress(); // Xóa tiến trình khi chơi lại
    setGameDangChay(false);
    setGameCompleted(false);
    setCauHienTai(0);
    setDiem(0);
    setLichSu([]);
    setThoiGian(30);
    setDaTraLoi(false);
    setKetQua('');
    setAnswerInput('');
    setShowHint(false);
  };

  const chatHienTai = chatHoaHoc[cauHienTai];
  const progressPercent = Math.round(((cauHienTai + 1) / chatHoaHoc.length) * 100);
  const timePercent = Math.max(0, Math.round((thoiGian / 30) * 100));

  // Start screen
  if (!gameDangChay && !gameCompleted) {
    return (
      <div className="h-screen max-h-screen overflow-hidden flex flex-col bg-gradient-to-br from-blue-600 via-cyan-600 to-teal-600">
        <div className="flex-shrink-0 bg-white shadow-md">
          <div className="container mx-auto px-4 py-3">
            <div className="flex items-center justify-between">
              
              <h1 className="text-2xl font-bold text-gray-800 flex items-center">
                <span className="mr-2">🎯</span>
                Đoán Hình Bắt Chữ Hóa Học
              </h1>
              <div className="w-24"></div>
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-auto px-4 py-6">
          <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-2xl p-6">
            <div className="text-center mb-4">
              <div className="text-5xl mb-3">🧪</div>
              <h2 className="text-2xl font-bold text-gray-800 mb-3">Cách chơi</h2>
            </div>

            <div className="space-y-3 mb-6">
              <div className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg">
                <div className="text-xl">🖼️</div>
                <div>
                  <h3 className="font-bold text-gray-800 mb-1 text-sm">Quan sát</h3>
                  <p className="text-gray-600 text-sm">Xem hình ảnh emoji và đọc mô tả tính chất của chất hóa học</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 bg-green-50 rounded-lg">
                <div className="text-xl">✍️</div>
                <div>
                  <h3 className="font-bold text-gray-800 mb-1 text-sm">Trả lời</h3>
                  <p className="text-gray-600 text-sm">Nhập tên chất hóa học vào ô và nhấn Enter hoặc nút Gửi</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 bg-yellow-50 rounded-lg">
                <div className="text-xl">⏱️</div>
                <div>
                  <h3 className="font-bold text-gray-800 mb-1 text-sm">Thời gian</h3>
                  <p className="text-gray-600 text-sm">Mỗi câu có 30 giây - thanh thời gian hiển thị trực quan</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 bg-purple-50 rounded-lg">
                <div className="text-xl">🏆</div>
                <div>
                  <h3 className="font-bold text-gray-800 mb-1 text-sm">Điểm số</h3>
                  <p className="text-gray-600 text-sm">Mỗi câu đúng được 10 điểm. Tổng điểm tối đa: 100 điểm</p>
                </div>
              </div>
            </div>

            <button 
              onClick={() => batDauGame(true)}
              className="w-full py-3 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white rounded-xl font-bold text-lg transition-all transform hover:scale-105 shadow-lg"
            >
              🚀 Bắt đầu chơi
            </button>
          </div>
        </div>

        {/* Resume Dialog */}
        <ResumeDialog
          show={showResumeDialog}
          onResume={() => batDauGame(false)}
          onRestart={() => batDauGame(true)}
          progressInfo={getProgress() ? {
            current: getProgress().cauHienTai + 1,
            total: chatHoaHoc.length,
            score: getProgress().diem
          } : null}
        />
      </div>
    );
  }

  // Result screen
  if (gameCompleted) {
    const soCauDung = lichSu.filter(item => item.ketQua === 'dung').length;
    const tyLeDung = Math.round((soCauDung / lichSu.length) * 100);
    
    return (
      <div className="h-screen max-h-screen overflow-hidden flex flex-col bg-gradient-to-br from-blue-600 via-cyan-600 to-teal-600">
        <div className="flex-shrink-0 bg-white shadow-md">
          <div className="container mx-auto px-4 py-3">
            <div className="flex items-center justify-between">
              <h1 className="text-xl font-bold text-gray-800 flex items-center">
                <Trophy className="w-5 h-5 mr-2 text-yellow-500" />
                Kết quả
              </h1>
              <div className="w-24"></div>
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-auto px-4 py-6">
          <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-2xl p-6">
            <div className="text-center mb-4">
              <div className="text-5xl mb-3">
                {tyLeDung >= 80 ? '🏆' : tyLeDung >= 60 ? '👍' : tyLeDung >= 40 ? '😊' : '💪'}
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                {tyLeDung >= 80 ? 'Xuất sắc!' : 
                 tyLeDung >= 60 ? 'Khá tốt!' : 
                 tyLeDung >= 40 ? 'Cần cố gắng!' : 'Hãy học thêm!'}
              </h2>
            </div>

            <div className="space-y-3 mb-6">
              <div className="flex items-center justify-between p-3 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-lg">
                <span className="text-gray-700 font-semibold">Tổng điểm:</span>
                <span className="text-2xl font-bold text-orange-600">{diem}</span>
              </div>

              <div className="flex items-center justify-between p-3 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg">
                <span className="text-gray-700 font-semibold">Số câu đúng:</span>
                <span className="text-xl font-bold text-green-600">{soCauDung}/{lichSu.length}</span>
              </div>

              <div className="flex items-center justify-between p-3 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-lg">
                <span className="text-gray-700 font-semibold">Tỷ lệ đúng:</span>
                <span className="text-xl font-bold text-blue-600">{tyLeDung}%</span>
              </div>
            </div>

            <div className="flex gap-4">
              <button 
                onClick={choiLai}
                className="flex-1 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white rounded-lg font-semibold transition-all"
              >
                🔄 Chơi lại
              </button>
              <Link to="/advanced-challenge" className="flex-1">
                <button className="w-full py-3 bg-gray-600 hover:bg-gray-700 text-white rounded-lg font-semibold transition-all">
                  🏠 Về trang chủ
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Game screen
  return (
    <div className="h-screen max-h-screen overflow-hidden flex flex-col bg-gradient-to-br from-blue-600 via-cyan-600 to-teal-600">
      {/* Header */}
      <div className="flex-shrink-0 bg-white shadow-md">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between mb-2">

            <h1 className="text-lg font-bold text-gray-800 flex items-center">
              <span className="mr-2">🎯</span>
              Đoán Hình Bắt Chữ Hóa Học
            </h1>
            <div className="w-24"></div>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <span className="font-bold text-gray-700">Câu {cauHienTai + 1}/{chatHoaHoc.length}</span>
              <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full font-bold">
                {diem} điểm
              </span>
            </div>
            <div className={`flex items-center gap-2 px-3 py-1 rounded-full font-bold ${
              thoiGian <= 10 ? 'bg-red-100 text-red-600' : 'bg-blue-100 text-blue-600'
            }`}>
              <Timer className="w-4 h-4" />
              {thoiGian}s
            </div>
          </div>
          
          {/* Timer bar */}
          <div className="mt-3 h-2 bg-gray-200 rounded-full overflow-hidden">
            <div 
              className={`h-full transition-all duration-1000 ${
                thoiGian <= 10 ? 'bg-red-500' : 'bg-blue-500'
              }`}
              style={{ width: `${timePercent}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto px-4 py-4">
        <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-2xl p-6">
          {/* Question */}
          <div className="text-center mb-4">
            <div className="text-6xl mb-4 animate-bounce">
              {chatHienTai.hinhAnh}
            </div>
            <div className="text-2xl font-bold text-blue-600 mb-3 font-mono">
              {chatHienTai.congThuc}
            </div>
            <p className="text-lg text-gray-700 mb-6 leading-relaxed">
              {chatHienTai.moTa}
            </p>
            <h3 className="text-2xl font-bold text-gray-800">Đây là chất gì?</h3>
          </div>

          {/* Answer Input */}
          {!daTraLoi && (
            <div className="space-y-4 mb-6">
              <div className="flex gap-3">
                <input
                  className="flex-1 px-4 py-3 text-lg border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none transition-colors"
                  type="text"
                  placeholder="Nhập tên chất (ví dụ: Nước)"
                  value={answerInput}
                  onChange={e => setAnswerInput(e.target.value)}
                  autoFocus
                />
                <button 
                  className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-colors"
                  onClick={handleSubmit}
                >
                  Gửi
                </button>
              </div>

              <div className="flex items-center gap-3">
                <button 
                  className="flex items-center gap-2 px-4 py-2 bg-yellow-100 hover:bg-yellow-200 text-yellow-800 rounded-lg font-semibold transition-colors"
                  onClick={() => setShowHint(!showHint)}
                >
                  <Lightbulb className="w-4 h-4" />
                  Gợi ý
                </button>
                {showHint && (
                  <span className="text-sm text-gray-600 italic">
                    {chatHienTai.goiY}
                  </span>
                )}
              </div>
            </div>
          )}

          {/* Result */}
          {daTraLoi && (
            <div className="space-y-4">
              {ketQua === 'dung' && (
                <div className="p-6 bg-green-100 border-2 border-green-500 rounded-lg">
                  <div className="flex items-center gap-3 mb-2">
                    <CheckCircle className="w-8 h-8 text-green-600" />
                    <p className="text-xl font-bold text-green-800">Chính xác!</p>
                  </div>
                  <p className="text-lg text-green-700">
                    <strong>{chatHienTai.ten}</strong> ({chatHienTai.congThuc})
                  </p>
                </div>
              )}
              {ketQua === 'sai' && (
                <div className="p-6 bg-red-100 border-2 border-red-500 rounded-lg">
                  <div className="flex items-center gap-3 mb-2">
                    <XCircle className="w-8 h-8 text-red-600" />
                    <p className="text-xl font-bold text-red-800">Không đúng!</p>
                  </div>
                  <p className="text-lg text-red-700">
                    Đáp án là <strong>{chatHienTai.ten}</strong> ({chatHienTai.congThuc})
                  </p>
                </div>
              )}
              {ketQua === 'timeout' && (
                <div className="p-6 bg-orange-100 border-2 border-orange-500 rounded-lg">
                  <div className="flex items-center gap-3 mb-2">
                    <Clock className="w-8 h-8 text-orange-600" />
                    <p className="text-xl font-bold text-orange-800">Hết thời gian!</p>
                  </div>
                  <p className="text-lg text-orange-700">
                    Đáp án là <strong>{chatHienTai.ten}</strong> ({chatHienTai.congThuc})
                  </p>
                </div>
              )}
              
              <button 
                className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold text-lg transition-colors"
                onClick={cauTiepTheo}
              >
                {cauHienTai < chatHoaHoc.length - 1 ? 'Câu tiếp theo →' : 'Xem kết quả 🏆'}
              </button>
            </div>
          )}

          {/* Progress */}
          <div className="mt-8">
            <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
              <span>Tiến độ</span>
              <span>{progressPercent}%</span>
            </div>
            <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-blue-500 to-cyan-500 transition-all duration-500"
                style={{ width: `${progressPercent}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DuoiHinhBatChu;
