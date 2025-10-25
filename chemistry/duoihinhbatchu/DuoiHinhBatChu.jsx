import React, { useState, useEffect, useRef } from 'react';
import './duoihinhbatchu.css';

const DuoiHinhBatChu = () => {
  // Dữ liệu các chất hóa học với hình ảnh
  const chatHoaHoc = [
    {
      id: 1,
      ten: "Nước",
      congThuc: "H₂O",
      hinhAnh: "💧",
      moTa: "Chất lỏng trong suốt, không màu, không mùi",
      goiY: ["Nước", "Hydro", "Oxygen", "Muối"]
    },
    {
      id: 2,
      ten: "Muối ăn",
      congThuc: "NaCl",
      hinhAnh: "🧂",
      moTa: "Tinh thể trắng, vị mặn, tan trong nước",
      goiY: ["Đường", "Muối ăn", "Baking soda", "Phấn"]
    },
    {
      id: 3,
      ten: "Đường",
      congThuc: "C₁₂H₂₂O₁₁",
      hinhAnh: "🍯",
      moTa: "Tinh thể trắng, vị ngọt, tan trong nước",
      goiY: ["Muối", "Đường", "Bột mì", "Tinh bột"]
    },
    {
      id: 4,
      ten: "Canxi",
      congThuc: "Ca",
      hinhAnh: "🦴",
      moTa: "Kim loại màu bạc, cần thiết cho xương",
      goiY: ["Sắt", "Canxi", "Magie", "Kẽm"]
    },
    {
      id: 5,
      ten: "Oxygen",
      congThuc: "O₂",
      hinhAnh: "🫁",
      moTa: "Khí không màu, không mùi, cần thiết cho hô hấp",
      goiY: ["Nitrogen", "Oxygen", "Carbon", "Hydro"]
    },
    {
      id: 6,
      ten: "Carbon dioxide",
      congThuc: "CO₂",
      hinhAnh: "🌬️",
      moTa: "Khí không màu, nặng hơn không khí",
      goiY: ["Oxygen", "Nitrogen", "Carbon dioxide", "Hydro"]
    },
    {
      id: 7,
      ten: "Sắt",
      congThuc: "Fe",
      hinhAnh: "🔩",
      moTa: "Kim loại màu xám, có từ tính",
      goiY: ["Đồng", "Sắt", "Nhôm", "Kẽm"]
    },
    {
      id: 8,
      ten: "Vàng",
      congThuc: "Au",
      hinhAnh: "🏆",
      moTa: "Kim loại màu vàng, không bị gỉ",
      goiY: ["Bạc", "Đồng", "Vàng", "Platin"]
    },
    {
      id: 9,
      ten: "Axit",
      congThuc: "HCl",
      hinhAnh: "⚠️",
      moTa: "Dung dịch có tính ăn mòn, pH < 7",
      goiY: ["Bazơ", "Axit", "Muối", "Nước"]
    },
    {
      id: 10,
      ten: "Ethanol",
      congThuc: "C₂H₅OH",
      hinhAnh: "🍷",
      moTa: "Chất lỏng không màu, có trong rượu",
      goiY: ["Methanol", "Ethanol", "Acetone", "Benzene"]
    }
  ];

  const [cauHienTai, setCauHienTai] = useState(0);
  const [diem, setDiem] = useState(0);
  const [luaChon, setLuaChon] = useState('');
  const [ketQua, setKetQua] = useState('');
  const [daTraLoi, setDaTraLoi] = useState(false);
  const [thoiGian, setThoiGian] = useState(30);
  const [gameDangChay, setGameDangChay] = useState(false);
  const [lichSu, setLichSu] = useState([]);
  const [highScore, setHighScore] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);
  const timerBase = 30;
  const mountedRef = useRef(true);
  const [questionOrder, setQuestionOrder] = useState([]);
  const [answerInput, setAnswerInput] = useState('');
  const [showHint, setShowHint] = useState(false);

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

  // Load high score once
  useEffect(() => {
    const hs = parseInt(localStorage.getItem('duoihinh_highscore') || '0', 10);
    setHighScore(isNaN(hs) ? 0 : hs);
  }, []);

  // track mounted state to avoid state updates on unmounted component
  useEffect(() => {
    mountedRef.current = true;
    return () => { mountedRef.current = false; };
  }, []);

  // keyboard: Enter submits when typing
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

  const batDauGame = () => {
    setGameDangChay(true);
    // generate a random order of question indices
    const indices = Array.from({ length: chatHoaHoc.length }, (_, i) => i);
    setQuestionOrder(shuffleArray(indices));
    setCauHienTai(0);
    setDiem(0);
    setLichSu([]);
    setThoiGian(30);
    setDaTraLoi(false);
    setKetQua('');
    setLuaChon('');
    setAnswerInput('');
    setShowHint(false);
  };

  const handleTimeout = () => {
    setKetQua('timeout');
    setDaTraLoi(true);
    const idx = questionOrder && questionOrder.length ? questionOrder[cauHienTai] : cauHienTai;
    setLichSu(prev => [...prev, {
      cau: chatHoaHoc[idx],
      luaChon: '',
      ketQua: 'timeout'
    }]);
  };

  const chonDapAn = (dapAn) => {
    if (daTraLoi) return;
    
    setLuaChon(dapAn);
    setDaTraLoi(true);
    
  const idx = questionOrder && questionOrder.length ? questionOrder[cauHienTai] : cauHienTai;
  const chatHienTai = chatHoaHoc[idx];
    const dungHayKhong = dapAn === chatHienTai.ten;
    
    if (dungHayKhong) {
      const newScore = diem + 10;
      setDiem(newScore);
      if (newScore > highScore) {
        setHighScore(newScore);
        localStorage.setItem('duoihinh_highscore', String(newScore));
      }
      // show confetti briefly
      setShowConfetti(true);
      setTimeout(() => { if (mountedRef.current) setShowConfetti(false); }, 1400);
      setKetQua('dung');
    } else {
      setKetQua('sai');
    }

    setLichSu(prev => [...prev, {
      cau: chatHienTai,
      luaChon: dapAn,
      ketQua: dungHayKhong ? 'dung' : 'sai'
    }]);
  };

  // New: submit typed answer (case and diacritics insensitive)
  const normalize = (s = '') => s.toString().normalize('NFD').replace(/\p{Diacritic}/gu, '').toLowerCase().trim();

  const handleSubmit = () => {
    if (daTraLoi || !gameDangChay) return;
    const chat = chatHoaHoc[cauHienTai];
    const typed = answerInput || '';
    const correct = normalize(typed) === normalize(chat.ten);
    setLuaChon(typed);
    setDaTraLoi(true);
    if (correct) {
      const newScore = diem + 10;
      setDiem(newScore);
      if (newScore > highScore) {
        setHighScore(newScore);
        localStorage.setItem('duoihinh_highscore', String(newScore));
      }
      setShowConfetti(true);
      setTimeout(() => { if (mountedRef.current) setShowConfetti(false); }, 1400);
      setKetQua('dung');
    } else {
      setKetQua('sai');
    }

    setLichSu(prev => [...prev, { cau: chat, luaChon: typed, ketQua: correct ? 'dung' : 'sai' }]);
  };

  const cauTiepTheo = () => {
    const total = questionOrder && questionOrder.length ? questionOrder.length : chatHoaHoc.length;
    if (cauHienTai < total - 1) {
      setCauHienTai(cauHienTai + 1);
      setDaTraLoi(false);
      setKetQua('');
      setLuaChon('');
      setThoiGian(30);
    } else {
      setGameDangChay(false);
    }
  };

  const progressPercent = Math.max(0, Math.round((thoiGian / timerBase) * 100));

  function shuffleArray(arr) {
    const copy = [...arr];
    for (let i = copy.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
  }

  const choiLai = () => {
    setGameDangChay(false);
    setCauHienTai(0);
    setDiem(0);
    setLichSu([]);
    setThoiGian(30);
    setDaTraLoi(false);
    setKetQua('');
    setLuaChon('');
  };

  const currentIdx = questionOrder && questionOrder.length ? questionOrder[cauHienTai] : cauHienTai;
  const chatHienTai = chatHoaHoc[currentIdx];

  if (!gameDangChay && lichSu.length === 0) {
    return (
      <div className="duoi-hinh-bat-chu">
        <div className="game-header">
          <h1>🎯 Đuổi Hình Bắt Chữ</h1>
          <p>Nhận diện chất qua hình ảnh và tính chất — phiên bản hiện đại</p>
        </div>

        <div className="game-intro">
          <div className="intro-content">
            <h2>Cách chơi:</h2>
            <ul>
              <li>🖼️ Quan sát hình ảnh và mô tả của chất</li>
              <li>❓ Chọn tên đúng từ 4 gợi ý (Phím 1-4 để chọn nhanh)</li>
              <li>⏱ Mỗi câu có 30 giây - thanh thời gian hiển thị trực quan</li>
              <li>🏆 Mỗi câu đúng được 10 điểm. Điểm cao nhất được lưu lại</li>
            </ul>
            <div className="intro-footer">
              <button className="btn-start" onClick={batDauGame}>
                🚀 Bắt đầu chơi
              </button>
              <div className="highscore">Highscore: <strong>{highScore}</strong></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!gameDangChay && lichSu.length > 0) {
    const soCauDung = lichSu.filter(item => item.ketQua === 'dung').length;
    const tyLeDung = Math.round((soCauDung / lichSu.length) * 100);
    
    return (
      <div className="duoi-hinh-bat-chu">
        <div className="game-header">
          <h1>🎯 Kết quả trò chơi</h1>
        </div>
        
        <div className="ket-qua-cuoi">
          <div className="thong-ke">
            <h2>📊 Thống kê</h2>
            <div className="stat-item">
              <span>Tổng điểm:</span>
              <span className="diem-so">{diem}</span>
            </div>
            <div className="stat-item">
              <span>Số câu đúng:</span>
              <span>{soCauDung}/{lichSu.length}</span>
            </div>
            <div className="stat-item">
              <span>Tỷ lệ đúng:</span>
              <span>{tyLeDung}%</span>
            </div>
          </div>

          <div className="danh-gia">
            <h3>
              {tyLeDung >= 80 ? '🏆 Xuất sắc!' : 
               tyLeDung >= 60 ? '👍 Khá tốt!' : 
               tyLeDung >= 40 ? '😊 Cần cố gắng!' : '💪 Hãy học thêm!'}
            </h3>
          </div>

          <div className="action-buttons">
            <button className="btn-primary" onClick={choiLai}>
              🔄 Chơi lại
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="duoi-hinh-bat-chu">
      <div className="game-header">
        <div className="game-info">
          <span>Câu {cauHienTai + 1}/{chatHoaHoc.length}</span>
          <span className="diem">Điểm: {diem}</span>
          <span className={`timer ${thoiGian <= 10 ? 'warning' : ''}`}>
            ⏰ {thoiGian}s
          </span>
        </div>
      </div>

      <div className="game-content">
        <div className="cau-hoi">
          <div className="hinh-anh">
            <div className="emoji-display">
              {chatHienTai.hinhAnh}
            </div>
            <div className="cong-thuc">
              {chatHienTai.congThuc}
            </div>
          </div>
          
          <div className="mo-ta">
            <p>{chatHienTai.moTa}</p>
          </div>
          
          <h3>Đây là chất gì?</h3>
        </div>

        <div className="lua-chon">
          <div className="answer-form">
            <input
              className="answer-input"
              type="text"
              placeholder="Nhập tên chất (ví dụ: Nước) và nhấn Enter"
              value={answerInput}
              onChange={e => setAnswerInput(e.target.value)}
              disabled={daTraLoi}
              aria-label="Nhập đáp án"
            />
            <button className="btn-submit" onClick={handleSubmit} disabled={daTraLoi}>Gửi</button>
          </div>
          <div className="hint-row">
            <button className="btn-hint" onClick={() => setShowHint(s => !s)}>Gợi ý</button>
            <div className="hint">{showHint ? `Bắt đầu bằng: '${chatHienTai.ten[0]}' • Độ dài: ${chatHienTai.ten.length}` : ''}</div>
          </div>
        </div>

        {daTraLoi && (
          <div className="phan-hoi">
            {ketQua === 'dung' && (
              <div className="phan-hoi-dung">
                <span className="icon">🎉</span>
                <p>Chính xác! <strong>{chatHienTai.ten}</strong> ({chatHienTai.congThuc})</p>
              </div>
            )}
            {ketQua === 'sai' && (
              <div className="phan-hoi-sai">
                <span className="icon">❌</span>
                <p>Không đúng! Đáp án là <strong>{chatHienTai.ten}</strong> ({chatHienTai.congThuc})</p>
              </div>
            )}
            {ketQua === 'timeout' && (
              <div className="phan-hoi-timeout">
                <span className="icon">⏰</span>
                <p>Hết thời gian! Đáp án là <strong>{chatHienTai.ten}</strong> ({chatHienTai.congThuc})</p>
              </div>
            )}
            
            <button className="btn-next" onClick={cauTiepTheo}>
              {cauHienTai < chatHoaHoc.length - 1 ? 'Câu tiếp theo' : 'Xem kết quả'}
            </button>
          </div>
        )}
        {showConfetti && (
          <div className="confetti" aria-hidden />
        )}
      </div>

      <div className="progress-bar">
        <div 
          className="progress-fill"
          style={{ width: `${((cauHienTai + 1) / chatHoaHoc.length) * 100}%` }}
        ></div>
      </div>
    </div>
  );
};

export default DuoiHinhBatChu;