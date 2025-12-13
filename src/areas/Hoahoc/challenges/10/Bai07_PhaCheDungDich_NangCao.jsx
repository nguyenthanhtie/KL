import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Trophy, Target, Lightbulb, Beaker, Droplet, FlaskConical, Plus, Minus, RotateCcw, Calculator, Percent, Scale, Thermometer, RefreshCw } from 'lucide-react';
import useChallengeProgress from '../../../../hooks/useChallengeProgress';
import ResumeDialog from '../../../../components/ResumeDialog';
import './CSS/Bai07_PhaCheDungDich_NangCao.css';

// Dữ liệu chất tan mở rộng cho lớp 10
const SOLUTES = {
  'nacl': { name: 'Natri clorua', formula: 'NaCl', color: '#3b82f6', molarMass: 58.5, density: 2.16 },
  'cuso4': { name: 'Đồng(II) sunfat', formula: 'CuSO₄', color: '#2563eb', molarMass: 160, density: 3.6 },
  'kmno4': { name: 'Kali pemanganat', formula: 'KMnO₄', color: '#7c3aed', molarMass: 158, density: 2.7 },
  'h2so4': { name: 'Axit sunfuric', formula: 'H₂SO₄', color: '#dc2626', molarMass: 98, density: 1.84 },
  'naoh': { name: 'Natri hidroxit', formula: 'NaOH', color: '#16a34a', molarMass: 40, density: 2.13 },
  'hcl': { name: 'Axit clohidric', formula: 'HCl', color: '#f97316', molarMass: 36.5, density: 1.19 },
  'glucose': { name: 'Glucose', formula: 'C₆H₁₂O₆', color: '#f59e0b', molarMass: 180, density: 1.54 },
  'sucrose': { name: 'Saccarozơ', formula: 'C₁₂H₂₂O₁₁', color: '#eab308', molarMass: 342, density: 1.59 },
  'kno3': { name: 'Kali nitrat', formula: 'KNO₃', color: '#06b6d4', molarMass: 101, density: 2.11 },
  'na2co3': { name: 'Natri cacbonat', formula: 'Na₂CO₃', color: '#8b5cf6', molarMass: 106, density: 2.54 },
  'cacl2': { name: 'Canxi clorua', formula: 'CaCl₂', color: '#ec4899', molarMass: 111, density: 2.15 },
  'agno3': { name: 'Bạc nitrat', formula: 'AgNO₃', color: '#64748b', molarMass: 170, density: 4.35 },
};

// Các thử thách nâng cao cho lớp 10
const CHALLENGES = [
  // === PHẦN 1: NỒNG ĐỘ PHẦN TRĂM (C%) ===
  {
    id: 1, level: 1, type: 'percent-concentration', points: 10, category: 'percent',
    title: 'Nồng độ phần trăm - Cơ bản',
    question: 'Hòa tan 20g NaCl vào 180g nước. Tính nồng độ phần trăm của dung dịch?',
    solute: 'nacl', answer: 10, unit: '%', tolerance: 0.5,
    hint: 'C% = (m_ct / m_dd) × 100% = (20 / (20+180)) × 100% = ?',
    formula: 'C% = (m_ct / m_dd) × 100%',
    given: { m_ct: 20, m_dm: 180 }
  },
  {
    id: 2, level: 1, type: 'percent-mass-solute', points: 12, category: 'percent',
    title: 'Tính khối lượng chất tan từ C%',
    question: 'Cần bao nhiêu gam đường để pha 500g dung dịch đường 15%?',
    solute: 'sucrose', answer: 75, unit: 'g', tolerance: 1,
    hint: 'm_ct = (C% × m_dd) / 100 = (15 × 500) / 100 = ?',
    formula: 'm_ct = (C% × m_dd) / 100',
    given: { C_percent: 15, m_dd: 500 }
  },
  {
    id: 3, level: 1, type: 'percent-mass-solution', points: 12, category: 'percent',
    title: 'Tính khối lượng dung dịch',
    question: 'Hòa tan 30g KNO₃ vào nước, được dung dịch 12%. Khối lượng dung dịch là bao nhiêu?',
    solute: 'kno3', answer: 250, unit: 'g', tolerance: 5,
    hint: 'm_dd = (m_ct × 100) / C% = (30 × 100) / 12 = ?',
    formula: 'm_dd = (m_ct × 100) / C%',
    given: { m_ct: 30, C_percent: 12 }
  },

  // === PHẦN 2: NỒNG ĐỘ MOL (CM) - Nâng cao ===
  {
    id: 4, level: 1, type: 'molar-concentration', points: 12, category: 'molar',
    title: 'Nồng độ mol - Cơ bản',
    question: 'Hòa tan 9.8g H₂SO₄ (M = 98) vào nước được 500ml dung dịch. Tính CM?',
    solute: 'h2so4', answer: 0.2, unit: 'M', tolerance: 0.02,
    hint: 'n = m/M = 9.8/98 = 0.1 mol → CM = n/V = 0.1/0.5 = ?',
    formula: 'CM = n/V = m/(M×V)',
    given: { m: 9.8, M: 98, V: 0.5 }
  },
  {
    id: 5, level: 2, type: 'molar-mass-calc', points: 15, category: 'molar',
    title: 'Tính khối lượng từ CM',
    question: 'Pha 2 lít dung dịch NaOH 0.5M. Cần bao nhiêu gam NaOH (M = 40)?',
    solute: 'naoh', answer: 40, unit: 'g', tolerance: 1,
    hint: 'n = CM × V = 0.5 × 2 = 1 mol → m = n × M = 1 × 40 = ?',
    formula: 'm = CM × V × M',
    given: { CM: 0.5, V: 2, M: 40 }
  },
  {
    id: 6, level: 2, type: 'molar-volume-calc', points: 15, category: 'molar',
    title: 'Tính thể tích dung dịch',
    question: 'Hòa tan 10.6g Na₂CO₃ (M = 106) vào nước được dung dịch 0.25M. Tính V dung dịch?',
    solute: 'na2co3', answer: 0.4, unit: 'L', tolerance: 0.02,
    hint: 'n = m/M = 10.6/106 = 0.1 mol → V = n/CM = 0.1/0.25 = ?',
    formula: 'V = n/CM = m/(M×CM)',
    given: { m: 10.6, M: 106, CM: 0.25 }
  },

  // === PHẦN 3: CHUYỂN ĐỔI GIỮA C% VÀ CM ===
  {
    id: 7, level: 2, type: 'percent-to-molar', points: 18, category: 'conversion',
    title: 'Chuyển C% sang CM',
    question: 'Dung dịch NaCl 11.7% có khối lượng riêng D = 1.1 g/ml. Tính CM? (M = 58.5)',
    solute: 'nacl', answer: 2.2, unit: 'M', tolerance: 0.1,
    hint: 'CM = (10 × C% × D) / M = (10 × 11.7 × 1.1) / 58.5 = ?',
    formula: 'CM = (10 × C% × D) / M',
    given: { C_percent: 11.7, D: 1.1, M: 58.5 }
  },
  {
    id: 8, level: 2, type: 'molar-to-percent', points: 18, category: 'conversion',
    title: 'Chuyển CM sang C%',
    question: 'Dung dịch H₂SO₄ 2M có D = 1.12 g/ml. Tính C%? (M = 98)',
    solute: 'h2so4', answer: 17.5, unit: '%', tolerance: 0.5,
    hint: 'C% = (CM × M × 100) / (D × 1000) = (2 × 98 × 100) / (1.12 × 1000) = ?',
    formula: 'C% = (CM × M) / (10 × D)',
    given: { CM: 2, M: 98, D: 1.12 }
  },

  // === PHẦN 4: PHA LOÃNG DUNG DỊCH ===
  {
    id: 9, level: 2, type: 'dilution-molar', points: 18, category: 'dilution',
    title: 'Pha loãng - Nồng độ mol',
    question: 'Có 200ml HCl 3M. Thêm nước để được dung dịch 0.5M. Tính V dung dịch sau pha loãng?',
    solute: 'hcl', answer: 1.2, unit: 'L', tolerance: 0.05,
    hint: 'C₁V₁ = C₂V₂ → V₂ = C₁V₁/C₂ = (3 × 0.2) / 0.5 = ?',
    formula: 'C₁V₁ = C₂V₂',
    given: { C1: 3, V1: 0.2, C2: 0.5 }
  },
  {
    id: 10, level: 2, type: 'dilution-percent', points: 18, category: 'dilution',
    title: 'Pha loãng - Nồng độ phần trăm',
    question: 'Có 100g dung dịch NaCl 20%. Thêm 150g nước. Tính C% sau pha loãng?',
    solute: 'nacl', answer: 8, unit: '%', tolerance: 0.5,
    hint: 'm_ct = (20 × 100)/100 = 20g. C%₂ = 20/(100+150) × 100 = ?',
    formula: 'C%₂ = m_ct / (m_dd₁ + m_nước) × 100',
    given: { C1: 20, m_dd1: 100, m_water: 150 }
  },
  {
    id: 11, level: 2, type: 'dilution-water-volume', points: 20, category: 'dilution',
    title: 'Tính lượng nước cần thêm',
    question: 'Có 300ml CuSO₄ 0.8M. Cần thêm bao nhiêu ml nước để được dd 0.2M?',
    solute: 'cuso4', answer: 900, unit: 'ml', tolerance: 20,
    hint: 'V₂ = C₁V₁/C₂ = (0.8 × 300)/0.2 = 1200ml → V_nước = 1200 - 300 = ?',
    formula: 'V_nước = V₂ - V₁ = (C₁V₁/C₂) - V₁',
    given: { C1: 0.8, V1: 300, C2: 0.2 }
  },

  // === PHẦN 5: PHA TRỘN DUNG DỊCH ===
  {
    id: 12, level: 3, type: 'mixing-same-solute', points: 22, category: 'mixing',
    title: 'Trộn 2 dung dịch cùng chất tan',
    question: 'Trộn 200ml NaOH 1M với 300ml NaOH 2M. Tính CM sau khi trộn?',
    solute: 'naoh', answer: 1.6, unit: 'M', tolerance: 0.05,
    hint: 'n_tổng = C₁V₁ + C₂V₂ = 1×0.2 + 2×0.3 = 0.8 mol. CM = 0.8/0.5 = ?',
    formula: 'CM = (C₁V₁ + C₂V₂) / (V₁ + V₂)',
    given: { C1: 1, V1: 0.2, C2: 2, V2: 0.3 }
  },
  {
    id: 13, level: 3, type: 'mixing-percent', points: 22, category: 'mixing',
    title: 'Trộn theo nồng độ phần trăm',
    question: 'Trộn 200g dd đường 10% với 300g dd đường 20%. Tính C% sau trộn?',
    solute: 'sucrose', answer: 16, unit: '%', tolerance: 0.5,
    hint: 'm_ct = (10×200 + 20×300)/100 = 80g. C% = 80/500 × 100 = ?',
    formula: 'C% = (C₁%×m₁ + C₂%×m₂) / (m₁ + m₂)',
    given: { C1: 10, m1: 200, C2: 20, m2: 300 }
  },
  {
    id: 14, level: 3, type: 'mixing-ratio', points: 25, category: 'mixing',
    title: 'Tính tỉ lệ trộn (Quy tắc đường chéo)',
    question: 'Trộn dd NaCl 5% với dd NaCl 15% để được dd 12%. Tính tỷ lệ m₁:m₂?',
    solute: 'nacl', answer: 0.43, unit: '', tolerance: 0.05,
    hint: 'Quy tắc đường chéo: m₁/m₂ = |C₂-C| / |C₁-C| = |15-12|/|5-12| = 3/7 ≈ ?',
    formula: 'm₁/m₂ = |C₂ - C| / |C₁ - C|',
    given: { C1: 5, C2: 15, C: 12 },
    answerDisplay: '3:7'
  },

  // === PHẦN 6: BÀI TẬP TỔNG HỢP NÂNG CAO ===
  {
    id: 15, level: 3, type: 'complex-percent-molar', points: 28, category: 'complex',
    title: 'Bài tổng hợp - C% và CM',
    question: 'Pha 500ml dung dịch HCl 2M từ dd HCl 36.5% (D = 1.19 g/ml). Tính V dd HCl đậm đặc cần dùng?',
    solute: 'hcl', answer: 84, unit: 'ml', tolerance: 2,
    hint: 'n = 2 × 0.5 = 1 mol → m_HCl = 36.5g. m_dd = 36.5/0.365 = 100g → V = m/D = 100/1.19 ≈ ?',
    formula: 'V = (CM × V_cần × M) / (C% × D × 10)',
    given: { CM: 2, V_need: 500, M: 36.5, C_percent: 36.5, D: 1.19 }
  },
  {
    id: 16, level: 3, type: 'complex-mass-volume', points: 28, category: 'complex',
    title: 'Bài tổng hợp - Khối lượng và thể tích',
    question: 'Hòa tan 16g CuSO₄ (M=160) vào 184g nước. Tính: a) C%? b) CM nếu D = 1.05 g/ml?',
    solute: 'cuso4', 
    answer: 0.525, unit: 'M', tolerance: 0.02,
    subAnswers: [
      { label: 'C%', value: 8, unit: '%' },
      { label: 'CM', value: 0.525, unit: 'M' }
    ],
    hint: 'C% = 16/200 × 100 = 8%. V = 200/1.05 = 190.5ml. n = 0.1 mol → CM = 0.1/0.1905 ≈ ?',
    formula: 'CM = (10 × C% × D) / M',
    given: { m_ct: 16, m_dm: 184, M: 160, D: 1.05 }
  },
  {
    id: 17, level: 3, type: 'complex-sequential', points: 30, category: 'complex',
    title: 'Pha chế nhiều bước',
    question: 'Có 100ml H₂SO₄ 4M. Thêm nước thành 400ml. Lấy 200ml pha loãng đến 1L. Tính CM cuối?',
    solute: 'h2so4', answer: 0.2, unit: 'M', tolerance: 0.02,
    hint: 'Bước 1: CM₂ = 4×0.1/0.4 = 1M. Bước 2: CM₃ = 1×0.2/1 = 0.2M',
    formula: 'C₁V₁ = C₂V₂ (áp dụng 2 lần)',
    given: { C1: 4, V1: 100, V2_step1: 400, V_take: 200, V_final: 1000 }
  },
  {
    id: 18, level: 3, type: 'complex-stoichiometry', points: 30, category: 'complex',
    title: 'Tính theo phương trình phản ứng',
    question: 'Cho 200ml NaOH 1M tác dụng vừa đủ với HCl. Tính V HCl 0.5M cần dùng?',
    solute: 'hcl', answer: 400, unit: 'ml', tolerance: 10,
    hint: 'n_NaOH = 1×0.2 = 0.2 mol. PT: NaOH + HCl → NaCl + H₂O. n_HCl = 0.2 mol → V = n/C = 0.2/0.5 = ?',
    formula: 'V_HCl = n_HCl / C_HCl (với n_HCl = n_NaOH theo PT)',
    given: { C_NaOH: 1, V_NaOH: 0.2, C_HCl: 0.5 }
  },

  // === PHẦN 7: BÀI TẬP NÂNG CAO - Thực tế ===
  {
    id: 19, level: 3, type: 'practical', points: 32, category: 'practical',
    title: 'Pha dung dịch chuẩn trong PTN',
    question: 'Pha 250ml AgNO₃ 0.1M từ AgNO₃ rắn (M=170). Tính khối lượng AgNO₃ cần cân?',
    solute: 'agno3', answer: 4.25, unit: 'g', tolerance: 0.1,
    hint: 'n = CM × V = 0.1 × 0.25 = 0.025 mol → m = n × M = 0.025 × 170 = ?',
    formula: 'm = CM × V × M',
    given: { CM: 0.1, V: 0.25, M: 170 }
  },
  {
    id: 20, level: 3, type: 'practical-dilution', points: 35, category: 'practical',
    title: 'Pha loãng axit đậm đặc',
    question: 'Pha 1L H₂SO₄ 1M từ dd H₂SO₄ 98% (D = 1.84 g/ml, M = 98). Tính V axit đặc cần lấy?',
    solute: 'h2so4', answer: 54.35, unit: 'ml', tolerance: 1,
    hint: 'n = 1 mol → m_H₂SO₄ = 98g. m_dd = 98/0.98 = 100g → V = 100/1.84 ≈ ?',
    formula: 'V = (CM × V_cần × M) / (C% × D × 10)',
    given: { CM: 1, V_need: 1, M: 98, C_percent: 98, D: 1.84 }
  }
];

// Phân loại thử thách theo category
const CATEGORY_INFO = {
  'percent': { name: 'Nồng độ %', icon: Percent, color: '#f59e0b' },
  'molar': { name: 'Nồng độ mol', icon: FlaskConical, color: '#3b82f6' },
  'conversion': { name: 'Chuyển đổi', icon: RefreshCw, color: '#8b5cf6' },
  'dilution': { name: 'Pha loãng', icon: Droplet, color: '#06b6d4' },
  'mixing': { name: 'Pha trộn', icon: Beaker, color: '#22c55e' },
  'complex': { name: 'Tổng hợp', icon: Calculator, color: '#ec4899' },
  'practical': { name: 'Thực hành', icon: Scale, color: '#f97316' }
};

const PhaCheDungDichNangCao = () => {
  const { hasProgress, saveProgress, clearProgress, getProgress } = useChallengeProgress('pha-che-dung-dich-10');
  const [showResumeDialog, setShowResumeDialog] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [totalScore, setTotalScore] = useState(0);
  const [completedIds, setCompletedIds] = useState([]);
  const [gameCompleted, setGameCompleted] = useState(false);

  // Lab simulation
  const [massСТ, setMassCT] = useState(0);
  const [massDM, setMassDM] = useState(100);
  const [volume, setVolume] = useState(0.5);
  const [showValues, setShowValues] = useState(false);

  // Answer state
  const [userAnswer, setUserAnswer] = useState('');
  const [showHint, setShowHint] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [showFormula, setShowFormula] = useState(false);

  const challenge = CHALLENGES[currentIndex];
  const solute = SOLUTES[challenge?.solute] || SOLUTES.nacl;
  
  // Tính toán các giá trị
  const massSolution = massСТ + massDM;
  const concentrationPercent = massSolution > 0 ? (massСТ / massSolution) * 100 : 0;
  const moles = solute.molarMass > 0 ? massСТ / solute.molarMass : 0;
  const concentrationMolar = volume > 0 ? moles / volume : 0;

  // Check for saved progress
  useEffect(() => {
    if (hasProgress && !gameStarted) {
      setShowResumeDialog(true);
    } else {
      setGameStarted(true);
    }
  }, [hasProgress, gameStarted]);

  // Reset on challenge change
  useEffect(() => {
    setMassCT(0);
    setMassDM(100);
    setVolume(0.5);
    setUserAnswer('');
    setShowHint(false);
    setShowResult(false);
    setShowFormula(false);
  }, [currentIndex]);

  const startGame = (fromBeginning = false) => {
    setShowResumeDialog(false);
    if (fromBeginning) {
      clearProgress();
    } else {
      const saved = getProgress();
      if (saved) {
        setCurrentIndex(saved.currentIndex || 0);
        setTotalScore(saved.totalScore || 0);
        setCompletedIds(saved.completedIds || []);
      }
    }
    setGameStarted(true);
  };

  const adjustMassCT = (delta) => {
    setMassCT(prev => Math.max(0, Math.min(prev + delta, 500)));
  };

  const adjustMassDM = (delta) => {
    setMassDM(prev => Math.max(0, Math.min(prev + delta, 1000)));
  };

  const adjustVolume = (delta) => {
    setVolume(prev => Math.max(0.01, Math.min(prev + delta, 5)));
  };

  const checkAnswer = () => {
    const answer = parseFloat(userAnswer);
    if (isNaN(answer)) {
      alert('Vui lòng nhập số hợp lệ!');
      return;
    }

    const correct = Math.abs(answer - challenge.answer) <= challenge.tolerance;
    setIsCorrect(correct);
    setShowResult(true);

    if (correct) {
      setTotalScore(prev => prev + challenge.points);
      setCompletedIds(prev => [...prev, challenge.id]);
    }
  };

  const handleNext = () => {
    if (currentIndex < CHALLENGES.length - 1) {
      const nextIndex = currentIndex + 1;
      setCurrentIndex(nextIndex);
      saveProgress({ currentIndex: nextIndex, totalScore, completedIds });
    } else {
      setGameCompleted(true);
      clearProgress();
    }
  };

  const handleReset = () => {
    setMassCT(0);
    setMassDM(100);
    setVolume(0.5);
    setUserAnswer('');
    setShowResult(false);
    setShowHint(false);
    setShowFormula(false);
  };

  const handleRestart = () => {
    clearProgress();
    setCurrentIndex(0);
    setTotalScore(0);
    setCompletedIds([]);
    setGameCompleted(false);
  };

  // Calculate display values
  const fillPercent = Math.min((volume / 5) * 100, 100);
  const colorOpacity = Math.min(concentrationPercent / 30, 1) * 0.7 + 0.3;
  const categoryInfo = CATEGORY_INFO[challenge?.category] || CATEGORY_INFO.percent;
  const CategoryIcon = categoryInfo.icon;

  // Game completed screen
  if (gameCompleted) {
    const maxScore = CHALLENGES.reduce((sum, c) => sum + c.points, 0);
    const percent = Math.round((totalScore / maxScore) * 100);

    return (
      <div className="molarity-game-advanced">
        <div className="game-complete-overlay">
          <div className="game-complete-modal">
            <Trophy className="trophy-icon" size={72} />
            <h2>🎉 Hoàn thành xuất sắc!</h2>
            <div className="stats">
              <p className="score">Điểm: {totalScore}/{maxScore}</p>
              <p>Hoàn thành: {percent}%</p>
              <p>Số câu đúng: {completedIds.length}/{CHALLENGES.length}</p>
            </div>
            <p className="message">
              {percent >= 90 ? '🏆 Xuất sắc! Bạn là chuyên gia hóa học!' :
               percent >= 70 ? '🌟 Rất giỏi! Tiếp tục phát huy!' :
               percent >= 50 ? '👍 Khá tốt! Hãy ôn lại kiến thức nhé!' :
               '📚 Cần cố gắng hơn! Xem lại bài học và thử lại!'}
            </p>
            <div className="modal-actions">
              <button onClick={handleRestart} className="btn-replay">
                <RotateCcw size={18} />
                Chơi lại
              </button>
              <Link to="/hoa-hoc/lop-10" className="btn-home">
                <ArrowLeft size={18} />
                Về trang chủ
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Loading screen
  if (!gameStarted) {
    return (
      <div className="molarity-game-advanced">
        <div className="loading-screen">
          <FlaskConical size={64} />
          <h2>Pha Chế Dung Dịch - Lớp 10</h2>
          <p>Đang tải thử thách nâng cao...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="molarity-game-advanced">
      {/* HEADER */}
      <header className="molarity-header">
        <Link to="/hoa-hoc/lop-10" className="btn-back">
          <ArrowLeft size={18} />
          <span>Quay lại</span>
        </Link>
        <div className="header-center">
          <h1 className="title">
            <FlaskConical size={24} />
            Pha Chế Dung Dịch - Nâng Cao
          </h1>
          <div className="header-info">
            <span className={`level-tag lv${challenge.level}`}>
              Cấp {challenge.level}
            </span>
            <span className="category-tag" style={{ background: categoryInfo.color }}>
              <CategoryIcon size={14} />
              {categoryInfo.name}
            </span>
            <span className="progress-text">
              {currentIndex + 1}/{CHALLENGES.length}
            </span>
            <div className="progress-track">
              <div className="fill" style={{ width: `${((currentIndex + 1) / CHALLENGES.length) * 100}%` }} />
            </div>
            <span className="points-tag">+{challenge.points} điểm</span>
          </div>
        </div>
        <div className="score-box">
          <Trophy size={20} />
          <span>{totalScore} điểm</span>
        </div>
      </header>

      {/* MAIN CONTENT */}
      <main className="molarity-main">
        {/* LEFT: LAB PANEL */}
        <div className="lab-panel">
          <div className="solute-card">
            <p className="name">{solute.name}</p>
            <p className="formula">{solute.formula}</p>
            <p className="mass">M = {solute.molarMass} g/mol</p>
          </div>

          <div className="beaker-visual">
            <div className="beaker-container">
              {/* Beaker Spout */}
             
              
              {/* Main Beaker Body */}
              <div className="beaker">
                {/* Liquid */}
                <div
                  className="liquid"
                  style={{
                    height: `${fillPercent}%`,
                    background: `linear-gradient(180deg, 
                      ${solute.color}dd 0%, 
                      ${solute.color} 50%, 
                      ${solute.color}cc 100%)`,
                    opacity: colorOpacity
                  }}
                />
                
                {/* Measurement Marks */}
                <div className="scale scale-5L">5L</div>
                <div className="scale scale-4L">4L</div>
                <div className="scale scale-3L">3L</div>
                <div className="scale scale-2L">2L</div>
                <div className="scale scale-1L">1L</div>
              </div>
              
            
            </div>
            
            {/* Dual concentration display */}
            <div className="concentration-badges">
              <div className="concentration-badge percent">
                <Percent size={16} />
                <span className="val">{concentrationPercent.toFixed(2)}</span>
                <span className="unit">%</span>
              </div>
              <div className="concentration-badge molar">
                <FlaskConical size={16} />
                <span className="val">{concentrationMolar.toFixed(3)}</span>
                <span className="unit">M</span>
              </div>
            </div>
          </div>

          {/* Control: Mass of solute */}
          <div className="control-row">
            <div className="label">
              <Scale size={14} />
              Khối lượng chất tan (m<sub>ct</sub>)
            </div>
            <div className="adjust">
              <button onClick={() => adjustMassCT(-5)}><Minus size={16} /></button>
              <span className="value">{massСТ.toFixed(1)} g</span>
              <button onClick={() => adjustMassCT(5)}><Plus size={16} /></button>
            </div>
            <input
              type="range" min="0" max="500" step="1"
              value={massСТ}
              onChange={(e) => setMassCT(parseFloat(e.target.value))}
            />
          </div>

          {/* Control: Mass of solvent */}
          <div className="control-row">
            <div className="label">
              <Droplet size={14} />
              Khối lượng dung môi (m<sub>dm</sub>)
            </div>
            <div className="adjust">
              <button onClick={() => adjustMassDM(-10)}><Minus size={16} /></button>
              <span className="value">{massDM.toFixed(1)} g</span>
              <button onClick={() => adjustMassDM(10)}><Plus size={16} /></button>
            </div>
            <input
              type="range" min="0" max="1000" step="5"
              value={massDM}
              onChange={(e) => setMassDM(parseFloat(e.target.value))}
            />
          </div>

          {/* Control: Volume */}
          <div className="control-row">
            <div className="label">
              <Beaker size={14} />
              Thể tích dung dịch (V)
            </div>
            <div className="adjust">
              <button onClick={() => adjustVolume(-0.05)}><Minus size={16} /></button>
              <span className="value">{volume.toFixed(2)} L</span>
              <button onClick={() => adjustVolume(0.05)}><Plus size={16} /></button>
            </div>
            <input
              type="range" min="0.01" max="5" step="0.01"
              value={volume}
              onChange={(e) => setVolume(parseFloat(e.target.value))}
            />
          </div>

          {/* Values Toggle */}
          <div className="values-toggle">
            <label>
              <input type="checkbox" checked={showValues} onChange={(e) => setShowValues(e.target.checked)} />
              Hiển thị giá trị tính toán
            </label>
            {showValues && (
              <div className="values-list">
                <p>m<sub>ct</sub> = {massСТ.toFixed(2)} g</p>
                <p>m<sub>dm</sub> = {massDM.toFixed(2)} g</p>
                <p>m<sub>dd</sub> = {massSolution.toFixed(2)} g</p>
                <p>n = {moles.toFixed(4)} mol</p>
                <p>V = {volume.toFixed(3)} L = {(volume * 1000).toFixed(1)} ml</p>
                <hr />
                <p><strong>C% = {concentrationPercent.toFixed(2)}%</strong></p>
                <p><strong>C<sub>M</sub> = {concentrationMolar.toFixed(3)} M</strong></p>
              </div>
            )}
          </div>
        </div>

        {/* RIGHT: CHALLENGE PANEL */}
        <div className="challenge-panel">
          <h2 className="challenge-title">
            <CategoryIcon size={20} style={{ color: categoryInfo.color }} />
            {challenge.title}
          </h2>

          <div className="question-box">
            <Target size={20} />
            <p>{challenge.question}</p>
          </div>

          {/* Formula Reference */}
          <div className="formula-section">
            <button className="btn-formula" onClick={() => setShowFormula(!showFormula)}>
              <Calculator size={16} />
              {showFormula ? 'Ẩn công thức' : 'Xem công thức tham khảo'}
            </button>
            {showFormula && (
              <div className="formula-ref">
                <h4>📐 Công thức quan trọng:</h4>
                <div className="formula-grid">
                  <div className="formula-item">
                    <span className="formula-name">Nồng độ %:</span>
                    <code>C% = (m<sub>ct</sub> / m<sub>dd</sub>) × 100%</code>
                  </div>
                  <div className="formula-item">
                    <span className="formula-name">Nồng độ mol:</span>
                    <code>C<sub>M</sub> = n / V = m / (M × V)</code>
                  </div>
                  <div className="formula-item">
                    <span className="formula-name">Chuyển đổi:</span>
                    <code>C<sub>M</sub> = (10 × C% × D) / M</code>
                  </div>
                  <div className="formula-item">
                    <span className="formula-name">Pha loãng:</span>
                    <code>C₁V₁ = C₂V₂</code>
                  </div>
                  <div className="formula-item">
                    <span className="formula-name">Trộn dd:</span>
                    <code>C = (C₁V₁ + C₂V₂) / (V₁ + V₂)</code>
                  </div>
                  <div className="formula-item">
                    <span className="formula-name">Đường chéo:</span>
                    <code>m₁/m₂ = |C₂-C| / |C₁-C|</code>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Given data */}
          {challenge.given && (
            <div className="given-data">
              <h4>📋 Dữ kiện đề bài:</h4>
              <div className="given-list">
                {Object.entries(challenge.given).map(([key, value]) => (
                  <span key={key} className="given-item">
                    {key.replace(/_/g, ' ')}: <strong>{value}</strong>
                  </span>
                ))}
              </div>
            </div>
          )}

          <div className="answer-row">
            <label>Đáp án của bạn:</label>
            <div className="input-wrap">
              <input
                type="number"
                step="0.01"
                value={userAnswer}
                onChange={(e) => setUserAnswer(e.target.value)}
                placeholder="Nhập kết quả..."
                disabled={showResult}
              />
              <span className="unit-label">{challenge.unit}</span>
            </div>
            {challenge.answerDisplay && (
              <p className="answer-hint">Kết quả dạng: {challenge.answerDisplay}</p>
            )}
          </div>

          {!showResult && (
            <div className="hint-section">
              <button className="btn-hint" onClick={() => setShowHint(!showHint)}>
                <Lightbulb size={18} />
                {showHint ? 'Ẩn gợi ý' : 'Xem gợi ý (-2 điểm)'}
              </button>
              {showHint && (
                <div className="hint-content">
                  <Lightbulb size={16} />
                  <div>
                    <p><strong>Công thức áp dụng:</strong> {challenge.formula}</p>
                    <p><strong>Gợi ý:</strong> {challenge.hint}</p>
                  </div>
                </div>
              )}
            </div>
          )}

          <div className="action-row">
            <button className="btn-reset" onClick={handleReset}>
              <RotateCcw size={18} />
              Làm lại
            </button>
            {!showResult && (
              <button className="btn-check" onClick={checkAnswer}>
                Kiểm tra
              </button>
            )}
          </div>

          {showResult && (
            <div className={`result-box ${isCorrect ? 'correct' : 'incorrect'}`}>
              {isCorrect ? (
                <>
                  <h3>✓ Chính xác!</h3>
                  <p className="points">+{challenge.points} điểm</p>
                </>
              ) : (
                <>
                  <h3>✗ Chưa đúng!</h3>
                  <div className="correct-answer">
                    <p className="label">Đáp án đúng:</p>
                    <p className="value">{challenge.answer} {challenge.unit}</p>
                    {challenge.answerDisplay && (
                      <p className="display">({challenge.answerDisplay})</p>
                    )}
                  </div>
                  <div className="explanation">
                    <p><strong>Cách giải:</strong></p>
                    <p>{challenge.hint}</p>
                  </div>
                </>
              )}
              <div className="result-actions">
                {!isCorrect && (
                  <button className="btn-retry" onClick={handleReset}>
                    <RotateCcw size={16} />
                    Thử lại
                  </button>
                )}
                <button className="btn-next" onClick={handleNext}>
                  {currentIndex < CHALLENGES.length - 1 ? 'Câu tiếp theo →' : 'Hoàn thành'}
                </button>
              </div>
            </div>
          )}
        </div>
      </main>

      <ResumeDialog
        show={showResumeDialog}
        onResume={() => startGame(false)}
        onRestart={() => startGame(true)}
        progressInfo={{
          current: (getProgress()?.currentIndex || 0) + 1,
          total: CHALLENGES.length,
          score: getProgress()?.totalScore || 0
        }}
      />
    </div>
  );
};

export default PhaCheDungDichNangCao;
