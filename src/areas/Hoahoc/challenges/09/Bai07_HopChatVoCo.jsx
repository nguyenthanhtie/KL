import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowLeft, Trophy, Timer, Lightbulb, CheckCircle, XCircle, Clock, RefreshCw,
  Beaker, FlaskConical, Atom, Sparkles, Star, Zap, Play, Award, Target
} from 'lucide-react';
import useChallengeProgress from '../../../../hooks/useChallengeProgress';
import ResumeDialog from '../../../../components/ResumeDialog';
import './CSS/Bai07_HopChatVoCo.css';

const HopChatVoCo = () => {
  // Dữ liệu 10 thử thách thí nghiệm về hợp chất vô cơ (lớp 9)
  const danhSachCauHoi = [
    {
      id: 1,
      loai: 'experiment',
      ten: 'Nhận biết HCl bằng quỳ tím',
      cauHoi: 'Nhỏ dung dịch HCl vào giấy quỳ tím. Quan sát hiện tượng và chọn đáp án đúng.',
      chatA: { ten: 'HCl', mau: '#ef4444', icon: '🧪' },
      chatB: { ten: 'Quỳ tím', mau: '#a855f7', icon: '📜' },
      phuongTrinh: 'HCl → H⁺ + Cl⁻',
      hienTuong: ['Quỳ tím chuyển đỏ', 'Quỳ tím chuyển xanh', 'Không đổi màu', 'Quỳ tím tan'],
      dapAnDung: 0,
      visual: { type: 'litmus', from: 'purple', to: 'red' },
      giaiThich: 'HCl là axit mạnh, ion H⁺ làm quỳ tím chuyển sang màu đỏ. Đây là tính chất đặc trưng của axit.',
      difficulty: 'easy',
      points: 10
    },
    {
      id: 2,
      loai: 'experiment',
      ten: 'Nhận biết NaOH bằng quỳ tím',
      cauHoi: 'Nhỏ dung dịch NaOH vào giấy quỳ tím. Hiện tượng nào xảy ra?',
      chatA: { ten: 'NaOH', mau: '#3b82f6', icon: '💧' },
      chatB: { ten: 'Quỳ tím', mau: '#a855f7', icon: '📜' },
      phuongTrinh: 'NaOH → Na⁺ + OH⁻',
      hienTuong: ['Quỳ tím chuyển xanh', 'Quỳ tím chuyển đỏ', 'Không đổi màu', 'Có bọt khí'],
      dapAnDung: 0,
      visual: { type: 'litmus', from: 'purple', to: 'blue' },
      giaiThich: 'NaOH là bazơ mạnh, ion OH⁻ làm quỳ tím chuyển sang màu xanh. Đây là cách nhận biết bazơ.',
      difficulty: 'easy',
      points: 10
    },
    {
      id: 3,
      loai: 'experiment',
      ten: 'Phản ứng trung hòa',
      cauHoi: 'Cho dung dịch HCl vào ống nghiệm chứa NaOH. Phản ứng tạo sản phẩm gì?',
      chatA: { ten: 'HCl', mau: '#ef4444', icon: '🔴' },
      chatB: { ten: 'NaOH', mau: '#3b82f6', icon: '🔵' },
      phuongTrinh: 'HCl + NaOH → NaCl + H₂O',
      hienTuong: ['Tạo muối + nước, tỏa nhiệt', 'Có khí thoát ra', 'Có kết tủa', 'Không phản ứng'],
      dapAnDung: 0,
      visual: { type: 'neutralization', heat: true },
      giaiThich: 'Axit + Bazơ → Muối + Nước. Đây là phản ứng trung hòa, tỏa nhiệt. NaCl là muối, H₂O là nước.',
      difficulty: 'easy',
      points: 15
    },
    {
      id: 4,
      loai: 'experiment',
      ten: 'Axit + Muối cacbonat',
      cauHoi: 'Nhỏ dung dịch HCl vào CaCO₃. Quan sát hiện tượng.',
      chatA: { ten: 'HCl', mau: '#ef4444', icon: '🧪' },
      chatB: { ten: 'CaCO₃', mau: '#e5e7eb', icon: '🪨' },
      phuongTrinh: 'CaCO₃ + 2HCl → CaCl₂ + H₂O + CO₂↑',
      hienTuong: ['Có khí CO₂ sủi bọt mạnh', 'Có kết tủa trắng', 'Dung dịch chuyển màu', 'Không phản ứng'],
      dapAnDung: 0,
      visual: { type: 'bubbles', gas: 'CO₂', intensity: 'strong' },
      giaiThich: 'Axit mạnh đẩy axit yếu H₂CO₃ ra khỏi muối. H₂CO₃ không bền, phân hủy thành H₂O và CO₂↑.',
      difficulty: 'medium',
      points: 15
    },
    {
      id: 5,
      loai: 'experiment',
      ten: 'Oxit bazơ + Nước',
      cauHoi: 'Cho CaO vào nước. Thử dung dịch thu được bằng quỳ tím.',
      chatA: { ten: 'CaO', mau: '#fef3c7', icon: '⚪' },
      chatB: { ten: 'H₂O', mau: '#93c5fd', icon: '💧' },
      phuongTrinh: 'CaO + H₂O → Ca(OH)₂',
      hienTuong: ['Quỳ tím chuyển xanh (tạo bazơ)', 'Quỳ tím chuyển đỏ (tạo axit)', 'Có khí thoát ra', 'Không tan'],
      dapAnDung: 0,
      visual: { type: 'dissolution', result: 'base', heat: true },
      giaiThich: 'Oxit bazơ + Nước → Bazơ. CaO tác dụng với nước tạo Ca(OH)₂ (bazơ), làm quỳ tím chuyển xanh và tỏa nhiệt.',
      difficulty: 'medium',
      points: 15
    },
    {
      id: 6,
      loai: 'experiment',
      ten: 'Oxit axit + Nước',
      cauHoi: 'Sục khí CO₂ vào nước. Thử dung dịch bằng quỳ tím.',
      chatA: { ten: 'CO₂', mau: '#d1d5db', icon: '💨' },
      chatB: { ten: 'H₂O', mau: '#93c5fd', icon: '💧' },
      phuongTrinh: 'CO₂ + H₂O → H₂CO₃',
      hienTuong: ['Quỳ tím chuyển đỏ nhạt (axit yếu)', 'Quỳ tím chuyển xanh', 'Có kết tủa', 'Không tan'],
      dapAnDung: 0,
      visual: { type: 'gas-dissolve', result: 'acid' },
      giaiThich: 'Oxit axit + Nước → Axit. CO₂ tan tạo H₂CO₃ (axit cacbonic yếu), làm quỳ tím hóa đỏ nhạt.',
      difficulty: 'medium',
      points: 15
    },
    {
      id: 7,
      loai: 'experiment',
      ten: 'Bazơ + Muối (tạo kết tủa)',
      cauHoi: 'Cho dung dịch NaOH vào dung dịch CuSO₄. Hiện tượng gì xảy ra?',
      chatA: { ten: 'NaOH', mau: '#f9fafb', icon: '💧' },
      chatB: { ten: 'CuSO₄', mau: '#3b82f6', icon: '🔵' },
      phuongTrinh: '2NaOH + CuSO₄ → Cu(OH)₂↓ + Na₂SO₄',
      hienTuong: ['Kết tủa xanh lam Cu(OH)₂', 'Kết tủa trắng', 'Có khí thoát ra', 'Không phản ứng'],
      dapAnDung: 0,
      visual: { type: 'precipitate', color: 'blue', name: 'Cu(OH)₂' },
      giaiThich: 'Bazơ tan + Muối → Bazơ mới↓ + Muối mới. Cu(OH)₂ không tan, kết tủa màu xanh lam đặc trưng.',
      difficulty: 'medium',
      points: 20
    },
    {
      id: 8,
      loai: 'experiment',
      ten: 'Axit + Oxit bazơ',
      cauHoi: 'Cho dung dịch HCl vào CuO (đen). Quan sát màu sắc dung dịch.',
      chatA: { ten: 'HCl', mau: '#f9fafb', icon: '🧪' },
      chatB: { ten: 'CuO', mau: '#1f2937', icon: '⬛' },
      phuongTrinh: 'CuO + 2HCl → CuCl₂ + H₂O',
      hienTuong: ['Chất rắn tan, dd xanh lục', 'Dung dịch không màu', 'Có kết tủa', 'Có khí H₂'],
      dapAnDung: 0,
      visual: { type: 'color-change', from: 'black', to: 'green', solid: true },
      giaiThich: 'Axit + Oxit bazơ → Muối + Nước. CuO (đen) tan trong HCl tạo CuCl₂ có màu xanh lục.',
      difficulty: 'hard',
      points: 20
    },
    {
      id: 9,
      loai: 'experiment',
      ten: 'Muối + Muối (trao đổi ion)',
      cauHoi: 'Trộn dung dịch AgNO₃ với dung dịch NaCl. Hiện tượng?',
      chatA: { ten: 'AgNO₃', mau: '#f9fafb', icon: '🔬' },
      chatB: { ten: 'NaCl', mau: '#f9fafb', icon: '🧂' },
      phuongTrinh: 'AgNO₃ + NaCl → AgCl↓ + NaNO₃',
      hienTuong: ['Kết tủa trắng AgCl', 'Kết tủa xanh', 'Có khí thoát ra', 'Không phản ứng'],
      dapAnDung: 0,
      visual: { type: 'precipitate', color: 'white', name: 'AgCl' },
      giaiThich: 'Muối + Muối → Muối mới (nếu có chất kết tủa). AgCl không tan, kết tủa trắng đục.',
      difficulty: 'hard',
      points: 20
    },
    {
      id: 10,
      loai: 'experiment',
      ten: 'Chuỗi chuyển hóa: Muối → Oxit → Bazơ',
      cauHoi: 'CaCO₃ → (nung) → ? → (+H₂O) → Ca(OH)₂. Chất ? là gì?',
      chatA: { ten: 'CaCO₃', mau: '#e5e7eb', icon: '🪨' },
      chatB: { ten: 'Nhiệt độ', mau: '#f97316', icon: '🔥' },
      phuongTrinh: 'CaCO₃ →(t°)→ CaO + CO₂ →(+H₂O)→ Ca(OH)₂',
      hienTuong: ['CaO (vôi sống)', 'Ca (kim loại)', 'Ca(OH)₂ (vôi tôi)', 'CO₂ (khí)'],
      dapAnDung: 0,
      visual: { type: 'sequence', steps: [
        { name: 'CaCO₃', icon: '🪨', color: '#e5e7eb' },
        { name: 'CaO', icon: '⚪', color: '#fef3c7' },
        { name: 'Ca(OH)₂', icon: '💧', color: '#dbeafe' }
      ]},
      giaiThich: 'CaCO₃ nung → CaO + CO₂. CaO + H₂O → Ca(OH)₂. Sơ đồ: Muối cacbonat → Oxit bazơ → Bazơ.',
      difficulty: 'hard',
      points: 25
    }
  ];

  const { hasProgress, saveProgress, clearProgress, getProgress } = useChallengeProgress('hop-chat-vo-co');
  
  const [cauHienTai, setCauHienTai] = useState(0);
  const [diem, setDiem] = useState(0);
  const [ketQua, setKetQua] = useState('');
  const [daTraLoi, setDaTraLoi] = useState(false);
  const [thoiGian, setThoiGian] = useState(45);
  const [gameDangChay, setGameDangChay] = useState(false);
  const [lichSu, setLichSu] = useState([]);
  const [showHint, setShowHint] = useState(false);
  const [gameCompleted, setGameCompleted] = useState(false);
  const [showResumeDialog, setShowResumeDialog] = useState(false);
  
  // States cho experiment
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [experimentPerformed, setExperimentPerformed] = useState(false);
  const [showVisual, setShowVisual] = useState(false);
  const [animationPhase, setAnimationPhase] = useState(0);
  const [particles, setParticles] = useState([]);
  
  const mountedRef = useRef(true);
  const containerRef = useRef(null);

  // Particle generation for effects
  const generateParticles = useCallback((type, count = 15) => {
    const newParticles = [];
    for (let i = 0; i < count; i++) {
      newParticles.push({
        id: Date.now() + i,
        type,
        x: 50 + (Math.random() - 0.5) * 40,
        y: 50 + (Math.random() - 0.5) * 40,
        size: 4 + Math.random() * 8,
        delay: Math.random() * 0.5,
        duration: 1 + Math.random() * 1.5
      });
    }
    setParticles(newParticles);
  }, []);

  // Kiểm tra tiến trình
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

  useEffect(() => {
    mountedRef.current = true;
    return () => { mountedRef.current = false; };
  }, []);

  // Animation phases for experiments
  useEffect(() => {
    if (experimentPerformed && !showVisual) {
      const timer1 = setTimeout(() => setAnimationPhase(1), 300);
      const timer2 = setTimeout(() => setAnimationPhase(2), 800);
      const timer3 = setTimeout(() => {
        setShowVisual(true);
        setAnimationPhase(3);
        generateParticles('reaction');
      }, 1500);
      
      return () => {
        clearTimeout(timer1);
        clearTimeout(timer2);
        clearTimeout(timer3);
      };
    }
  }, [experimentPerformed, showVisual, generateParticles]);

  const batDauGame = (fromBeginning = false) => {
    if (fromBeginning) {
      clearProgress();
    }
    
    const savedProgress = fromBeginning ? null : getProgress();
    
    if (savedProgress && !fromBeginning) {
      setCauHienTai(savedProgress.cauHienTai || 0);
      setDiem(savedProgress.diem || 0);
      setLichSu(savedProgress.lichSu || []);
    } else {
      setCauHienTai(0);
      setDiem(0);
      setLichSu([]);
    }
    
    setGameDangChay(true);
    setGameCompleted(false);
    setShowResumeDialog(false);
    setDaTraLoi(false);
    setKetQua('');
    setThoiGian(45);
    resetAnswerStates();
  };

  const resetAnswerStates = () => {
    setSelectedAnswer(null);
    setExperimentPerformed(false);
    setShowVisual(false);
    setAnimationPhase(0);
    setParticles([]);
    setShowHint(false);
  };

  const handleTimeout = () => {
    if (!daTraLoi) {
      setDaTraLoi(true);
      setKetQua('timeout');
      const newLichSu = [...lichSu, { 
        cau: cauHienTai + 1, 
        dung: false, 
        lyDo: 'Hết giờ',
        cauHoi: danhSachCauHoi[cauHienTai].ten
      }];
      setLichSu(newLichSu);
      
      saveProgress({
        cauHienTai: cauHienTai + 1,
        diem: diem,
        lichSu: newLichSu,
        thoiGian: new Date().toISOString()
      });
    }
  };

  const kiemTraDapAn = () => {
    const cau = danhSachCauHoi[cauHienTai];
    const isCorrect = selectedAnswer === cau.dapAnDung;

    setDaTraLoi(true);
    
    if (isCorrect) {
      const diemThuong = Math.floor(thoiGian / 5) + cau.points;
      setDiem(diem + diemThuong);
      setKetQua('dung');
      generateParticles('success', 25);
      
      const newLichSu = [...lichSu, { 
        cau: cauHienTai + 1, 
        dung: true, 
        diemThuong,
        cauHoi: cau.ten
      }];
      setLichSu(newLichSu);
      
      saveProgress({
        cauHienTai: cauHienTai + 1,
        diem: diem + diemThuong,
        lichSu: newLichSu,
        thoiGian: new Date().toISOString()
      });
    } else {
      setKetQua('sai');
      const newLichSu = [...lichSu, { 
        cau: cauHienTai + 1, 
        dung: false, 
        lyDo: 'Trả lời sai',
        cauHoi: cau.ten
      }];
      setLichSu(newLichSu);
      
      saveProgress({
        cauHienTai: cauHienTai + 1,
        diem: diem,
        lichSu: newLichSu,
        thoiGian: new Date().toISOString()
      });
    }
  };

  const cauTiepTheo = () => {
    if (cauHienTai < danhSachCauHoi.length - 1) {
      setCauHienTai(cauHienTai + 1);
      setDaTraLoi(false);
      setKetQua('');
      setThoiGian(45);
      resetAnswerStates();
    } else {
      ketThucGame();
    }
  };

  const ketThucGame = () => {
    setGameCompleted(true);
    setGameDangChay(false);
    clearProgress();
  };

  const renderExperimentVisual = (cau) => {
    const visual = cau.visual;
    
    switch(visual.type) {
      case 'litmus':
        return (
          <div className="visual-litmus">
            <div className={`litmus-strip ${visual.from}`}>
              <span className="litmus-label">Quỳ tím</span>
            </div>
            <div className="reaction-arrow">
              <Zap className="arrow-icon" />
            </div>
            <div className={`litmus-strip ${visual.to} result`}>
              <span className="litmus-label">
                {visual.to === 'red' ? 'Đỏ' : visual.to === 'blue' ? 'Xanh' : 'Tím'}
              </span>
            </div>
          </div>
        );
      
      case 'bubbles':
        return (
          <div className="visual-bubbles">
            <div className="beaker-3d">
              <div className="liquid acid">
                <div className="bubbles-container">
                  {[...Array(12)].map((_, i) => (
                    <div 
                      key={i} 
                      className="bubble"
                      style={{
                        left: `${15 + Math.random() * 70}%`,
                        animationDelay: `${Math.random() * 2}s`,
                        width: `${6 + Math.random() * 10}px`,
                        height: `${6 + Math.random() * 10}px`
                      }}
                    />
                  ))}
                </div>
                <div className="solid-piece">CaCO₃</div>
              </div>
            </div>
            <div className="gas-label">
              <span className="gas-icon">💨</span>
              <span>Khí {visual.gas} thoát ra</span>
            </div>
          </div>
        );
      
      case 'precipitate':
        return (
          <div className="visual-precipitate">
            <div className="beaker-3d">
              <div className="liquid clear">
                <div className={`precipitate-particles ${visual.color}`}>
                  {[...Array(20)].map((_, i) => (
                    <div 
                      key={i}
                      className="precipitate-particle"
                      style={{
                        left: `${10 + Math.random() * 80}%`,
                        animationDelay: `${Math.random() * 1}s`
                      }}
                    />
                  ))}
                </div>
                <div className={`sediment ${visual.color}`}></div>
              </div>
            </div>
            <div className="precipitate-label">
              <span>⬇️ Kết tủa {visual.name}</span>
            </div>
          </div>
        );
      
      case 'neutralization':
        return (
          <div className="visual-neutralization">
            <div className="beaker-3d heat-effect">
              <div className="liquid neutralized">
                <div className="heat-waves">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className="heat-wave" style={{ animationDelay: `${i * 0.2}s` }} />
                  ))}
                </div>
              </div>
            </div>
            <div className="heat-indicator">
              <span className="heat-icon">🔥</span>
              <span>Tỏa nhiệt - Phản ứng trung hòa</span>
            </div>
          </div>
        );
      
      case 'color-change':
        return (
          <div className="visual-color-change">
            <div className="color-before">
              <div className={`color-sample ${visual.from}`}>
                <span>{visual.solid ? 'CuO' : 'Ban đầu'}</span>
              </div>
              <span className="color-name">Màu đen</span>
            </div>
            <div className="reaction-arrow">
              <Sparkles className="arrow-icon sparkle" />
            </div>
            <div className="color-after">
              <div className={`color-sample ${visual.to}`}>
                <span>CuCl₂</span>
              </div>
              <span className="color-name">Xanh lục</span>
            </div>
          </div>
        );
      
      case 'dissolution':
      case 'gas-dissolve':
        return (
          <div className="visual-dissolution">
            <div className="beaker-3d">
              <div className={`liquid dissolving ${visual.result}`}>
                {visual.type === 'gas-dissolve' && (
                  <div className="gas-bubbles">
                    {[...Array(8)].map((_, i) => (
                      <div key={i} className="gas-bubble" style={{ animationDelay: `${i * 0.15}s` }} />
                    ))}
                  </div>
                )}
                <div className={`ph-indicator ${visual.result}`}>
                  {visual.result === 'base' ? 'pH > 7' : 'pH < 7'}
                </div>
              </div>
            </div>
            <div className="dissolution-label">
              <span>{visual.result === 'base' ? '🔵 Tạo dung dịch bazơ' : '🔴 Tạo dung dịch axit'}</span>
            </div>
          </div>
        );
      
      case 'sequence':
        return (
          <div className="visual-sequence">
            {visual.steps.map((step, i) => (
              <React.Fragment key={i}>
                <div 
                  className="sequence-step"
                  style={{ 
                    animationDelay: `${i * 0.4}s`,
                    backgroundColor: step.color 
                  }}
                >
                  <span className="step-icon">{step.icon}</span>
                  <span className="step-name">{step.name}</span>
                </div>
                {i < visual.steps.length - 1 && (
                  <div className="sequence-arrow" style={{ animationDelay: `${i * 0.4 + 0.2}s` }}>
                    →
                  </div>
                )}
              </React.Fragment>
            ))}
          </div>
        );
      
      default:
        return null;
    }
  };

  const renderExperiment = () => {
    const cau = danhSachCauHoi[cauHienTai];
    
    return (
      <div className="experiment-container" ref={containerRef}>
        {/* Lab Header */}
        <div className="lab-header">
          <div className="experiment-title">
            <FlaskConical className="title-icon" />
            <h2>{cau.ten}</h2>
          </div>
          <div className={`difficulty-badge ${cau.difficulty}`}>
            {cau.difficulty === 'easy' ? '⭐ Dễ' : cau.difficulty === 'medium' ? '⭐⭐ Trung bình' : '⭐⭐⭐ Khó'}
            <span className="points-badge">+{cau.points}đ</span>
          </div>
        </div>

        {/* Question */}
        <div className="experiment-question">
          <Atom className="question-icon" />
          <p>{cau.cauHoi}</p>
        </div>

        {/* Lab Workspace */}
        <div className="lab-workspace">
          {/* Reagents Section */}
          <div className="reagents-panel">
            <h3>🧪 Hóa chất</h3>
            <div className="reagents-display">
              <div 
                className={`reagent-card ${animationPhase >= 1 ? 'active' : ''}`}
                style={{ '--reagent-color': cau.chatA.mau }}
              >
                <span className="reagent-icon">{cau.chatA.icon}</span>
                <span className="reagent-name">{cau.chatA.ten}</span>
              </div>
              <div className="plus-sign">+</div>
              <div 
                className={`reagent-card ${animationPhase >= 1 ? 'active' : ''}`}
                style={{ '--reagent-color': cau.chatB.mau }}
              >
                <span className="reagent-icon">{cau.chatB.icon}</span>
                <span className="reagent-name">{cau.chatB.ten}</span>
              </div>
            </div>
            
            <div className={`equation-display ${animationPhase >= 2 ? 'show' : ''}`}>
              <span className="equation-label">Phương trình:</span>
              <span className="equation-text">{cau.phuongTrinh}</span>
            </div>
          </div>

          {/* Experiment Button */}
          <button
            className={`start-experiment-btn ${experimentPerformed ? 'performed' : ''} ${animationPhase >= 1 ? 'mixing' : ''}`}
            onClick={() => {
              if (!experimentPerformed && !daTraLoi) {
                setExperimentPerformed(true);
              }
            }}
            disabled={experimentPerformed || daTraLoi}
          >
            {!experimentPerformed ? (
              <>
                <Play className="btn-icon" />
                <span>Tiến hành thí nghiệm</span>
              </>
            ) : animationPhase < 3 ? (
              <>
                <div className="loading-spinner"></div>
                <span>Đang phản ứng...</span>
              </>
            ) : (
              <>
                <CheckCircle className="btn-icon success" />
                <span>Thí nghiệm hoàn tất!</span>
              </>
            )}
          </button>

          {/* Visual Result */}
          {showVisual && (
            <div className="visual-result">
              <div className="visual-header">
                <Sparkles className="visual-icon" />
                <span>Kết quả quan sát</span>
              </div>
              <div className="visual-content">
                {renderExperimentVisual(cau)}
              </div>
            </div>
          )}

          {/* Particles Effect */}
          <div className="particles-container">
            {particles.map(p => (
              <div
                key={p.id}
                className={`particle ${p.type}`}
                style={{
                  left: `${p.x}%`,
                  top: `${p.y}%`,
                  width: `${p.size}px`,
                  height: `${p.size}px`,
                  animationDelay: `${p.delay}s`,
                  animationDuration: `${p.duration}s`
                }}
              />
            ))}
          </div>
        </div>

        {/* Answer Options */}
        {experimentPerformed && showVisual && (
          <div className="answer-section">
            <h3>
              <Target className="answer-icon" />
              Hiện tượng quan sát được:
            </h3>
            <div className="options-grid">
              {cau.hienTuong.map((option, index) => (
                <button
                  key={index}
                  onClick={() => !daTraLoi && setSelectedAnswer(index)}
                  disabled={daTraLoi}
                  className={`option-card ${selectedAnswer === index ? 'selected' : ''} 
                    ${daTraLoi && index === cau.dapAnDung ? 'correct' : ''}
                    ${daTraLoi && selectedAnswer === index && index !== cau.dapAnDung ? 'incorrect' : ''}`}
                >
                  <span className="option-letter">{String.fromCharCode(65 + index)}</span>
                  <span className="option-text">{option}</span>
                  {daTraLoi && index === cau.dapAnDung && <CheckCircle className="result-icon" />}
                  {daTraLoi && selectedAnswer === index && index !== cau.dapAnDung && <XCircle className="result-icon" />}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  };

  const canSubmit = () => {
    return experimentPerformed && showVisual && selectedAnswer !== null;
  };

  // Welcome Screen
  if (!gameDangChay && !gameCompleted) {
    return (
      <>
        {showResumeDialog && (
          <ResumeDialog
            onResume={() => batDauGame(false)}
            onRestart={() => batDauGame(true)}
            onClose={() => setShowResumeDialog(false)}
          />
        )}
        <div className="challenge-container lab-theme">
          <div className="challenge-header">
            <Link to="/hoa-hoc/9" className="back-button">
              <ArrowLeft size={20} />
              <span>Quay lại</span>
            </Link>
          </div>

          <div className="welcome-screen">
            <div className="welcome-content">
              <div className="welcome-icon-container">
                <div className="floating-icons">
                  <Beaker className="float-icon beaker" />
                  <FlaskConical className="float-icon flask" />
                  <Atom className="float-icon atom" />
                </div>
                <div className="main-icon">
                  <Trophy className="trophy" />
                </div>
              </div>
              
              <h1>🧪 Phòng thí nghiệm Hóa học</h1>
              <h2>Các loại hợp chất vô cơ</h2>
              
              <p className="welcome-description">
                Khám phá thế giới của Oxit, Axit, Bazơ và Muối qua các thí nghiệm mô phỏng tương tác!
              </p>
              
              <div className="feature-cards">
                <div className="feature-card">
                  <Beaker className="feature-icon" />
                  <span>10 Thí nghiệm</span>
                </div>
                <div className="feature-card">
                  <Timer className="feature-icon" />
                  <span>45 giây/câu</span>
                </div>
                <div className="feature-card">
                  <Star className="feature-icon" />
                  <span>Điểm thưởng</span>
                </div>
              </div>

              <div className="topics-preview">
                <span className="topic-tag">🔴 Axit</span>
                <span className="topic-tag">🔵 Bazơ</span>
                <span className="topic-tag">⚪ Oxit</span>
                <span className="topic-tag">🧂 Muối</span>
              </div>

              <button onClick={() => batDauGame(true)} className="start-button">
                <Play className="btn-icon" />
                <span>Bắt đầu thí nghiệm</span>
              </button>
            </div>
          </div>
        </div>
      </>
    );
  }

  // Completion Screen
  if (gameCompleted) {
    const diemToiDa = danhSachCauHoi.reduce((sum, c) => sum + c.points + 9, 0);
    const phanTram = Math.round((diem / diemToiDa) * 100);
    const soCauDung = lichSu.filter(ls => ls.dung).length;
    
    let rank = { name: 'Học sinh', icon: '📚', color: '#6b7280' };
    if (phanTram >= 90) rank = { name: 'Nhà Hóa học xuất sắc', icon: '🏆', color: '#fbbf24' };
    else if (phanTram >= 70) rank = { name: 'Nhà Hóa học giỏi', icon: '🥇', color: '#10b981' };
    else if (phanTram >= 50) rank = { name: 'Nhà Hóa học tiềm năng', icon: '🥈', color: '#3b82f6' };

    return (
      <div className="challenge-container lab-theme">
        <div className="challenge-header">
          <Link to="/hoa-hoc/9" className="back-button">
            <ArrowLeft size={20} />
            <span>Quay lại</span>
          </Link>
        </div>

        <div className="completion-screen">
          <div className="completion-content">
            <div className="completion-badge" style={{ '--rank-color': rank.color }}>
              <span className="rank-icon">{rank.icon}</span>
              <span className="rank-name">{rank.name}</span>
            </div>
            
            <h1>🎉 Hoàn thành thí nghiệm!</h1>
            
            <div className="score-display">
              <div className="score-circle">
                <svg viewBox="0 0 100 100">
                  <circle className="score-bg" cx="50" cy="50" r="45" />
                  <circle 
                    className="score-progress" 
                    cx="50" cy="50" r="45"
                    style={{ strokeDashoffset: `${283 - (283 * phanTram) / 100}` }}
                  />
                </svg>
                <div className="score-text">
                  <span className="score-number">{diem}</span>
                  <span className="score-label">điểm</span>
                </div>
              </div>
              <p className="score-percentage">{phanTram}% hoàn thành</p>
            </div>

            <div className="completion-stats">
              <div className="stat-card correct">
                <CheckCircle />
                <div>
                  <span className="stat-number">{soCauDung}</span>
                  <span className="stat-label">Câu đúng</span>
                </div>
              </div>
              <div className="stat-card incorrect">
                <XCircle />
                <div>
                  <span className="stat-number">{danhSachCauHoi.length - soCauDung}</span>
                  <span className="stat-label">Câu sai</span>
                </div>
              </div>
            </div>

            <div className="history-section">
              <h3>📋 Lịch sử thí nghiệm</h3>
              <div className="history-list">
                {lichSu.map((item, index) => (
                  <div key={index} className={`history-item ${item.dung ? 'correct' : 'incorrect'}`}>
                    <span className="history-number">#{item.cau}</span>
                    <span className="history-question">{item.cauHoi}</span>
                    <span className="history-result">
                      {item.dung ? (
                        <span className="points">+{item.diemThuong}</span>
                      ) : (
                        <span className="reason">{item.lyDo}</span>
                      )}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="completion-actions">
              <button onClick={() => batDauGame(true)} className="retry-button">
                <RefreshCw size={20} />
                <span>Thử lại</span>
              </button>
              <Link to="/hoa-hoc/9" className="home-button">
                <Award size={20} />
                <span>Về trang chủ</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Game Screen
  return (
    <div className="challenge-container lab-theme">
      <div className="challenge-header">
        <Link to="/hoa-hoc/9" className="back-button">
          <ArrowLeft size={20} />
          <span>Quay lại</span>
        </Link>
        
        <div className="header-stats">
          <div className="stat score">
            <Trophy size={18} />
            <span>{diem}</span>
          </div>
          <div className="stat progress-stat">
            <Target size={18} />
            <span>{cauHienTai + 1}/{danhSachCauHoi.length}</span>
          </div>
          <div className={`stat timer ${thoiGian <= 10 ? 'warning' : ''}`}>
            <Clock size={18} />
            <span>{thoiGian}s</span>
          </div>
        </div>
      </div>

      <div className="game-content">
        <div className="progress-bar">
          <div 
            className="progress-fill" 
            style={{ width: `${((cauHienTai + 1) / danhSachCauHoi.length) * 100}%` }}
          />
          <div className="progress-glow" />
        </div>

        {renderExperiment()}

        {daTraLoi && (
          <div className={`result-panel ${ketQua}`}>
            <div className="result-header">
              {ketQua === 'dung' ? (
                <>
                  <div className="result-icon-container success">
                    <CheckCircle className="result-icon" />
                  </div>
                  <h3>🎉 Chính xác!</h3>
                </>
              ) : ketQua === 'sai' ? (
                <>
                  <div className="result-icon-container error">
                    <XCircle className="result-icon" />
                  </div>
                  <h3>❌ Chưa đúng!</h3>
                </>
              ) : (
                <>
                  <div className="result-icon-container timeout">
                    <Timer className="result-icon" />
                  </div>
                  <h3>⏰ Hết giờ!</h3>
                </>
              )}
            </div>
            <div className="explanation-box">
              <Lightbulb className="explanation-icon" />
              <p>{danhSachCauHoi[cauHienTai].giaiThich}</p>
            </div>
            <button onClick={cauTiepTheo} className="next-button">
              {cauHienTai < danhSachCauHoi.length - 1 ? 'Thí nghiệm tiếp theo →' : 'Xem kết quả 🏆'}
            </button>
          </div>
        )}

        {!daTraLoi && experimentPerformed && showVisual && (
          <div className="action-buttons">
            <button 
              onClick={kiemTraDapAn} 
              disabled={!canSubmit()}
              className="submit-button"
            >
              <Zap className="btn-icon" />
              <span>Xác nhận câu trả lời</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default HopChatVoCo;
