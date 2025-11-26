import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Sparkles, Trophy, Zap, BookOpen, CheckCircle2, XCircle, Lightbulb, Calculator, Atom, Plus, Minus } from 'lucide-react';
import './CSS/Bai18_TinhKhoiLuongMol.css';

// Danh sách các chất hóa học
const CHEMICALS = [
  { formula: 'NaCl', name: 'Natri clorua', molarMass: 58.5, color: '#6366f1' },
  { formula: 'CaCO₃', name: 'Canxi cacbonat', molarMass: 100, color: '#8b5cf6' },
  { formula: 'Fe₂O₃', name: 'Sắt(III) oxit', molarMass: 160, color: '#ec4899' },
  { formula: 'Al₂O₃', name: 'Nhôm oxit', molarMass: 102, color: '#f59e0b' },
  { formula: 'CuO', name: 'Đồng(II) oxit', molarMass: 80, color: '#10b981' },
  { formula: 'MgO', name: 'Magie oxit', molarMass: 40, color: '#06b6d4' },
  { formula: 'CuSO₄', name: 'Đồng(II) sunfat', molarMass: 160, color: '#3b82f6' },
  { formula: 'KNO₃', name: 'Kali nitrat', molarMass: 101, color: '#a855f7' },
];

const AVOGADRO = 6.022e23;

// Các câu hỏi thử thách
const challenges = [
  {
    id: 1,
    level: 1,
    type: 'mass-to-mol',
    question: 'Tính số mol của 117g NaCl',
    chemical: 'NaCl',
    given: { mass: 117 },
    answer: 2.0,
    unit: 'mol',
    tolerance: 0.05,
    points: 100,
    hint: 'Sử dụng công thức: n = m/M'
  },
  {
    id: 2,
    level: 1,
    type: 'mol-to-mass',
    question: 'Tính khối lượng của 2.5 mol CaCO₃',
    chemical: 'CaCO₃',
    given: { mol: 2.5 },
    answer: 250,
    unit: 'g',
    tolerance: 2,
    points: 100,
    hint: 'Sử dụng công thức: m = n × M'
  },
  {
    id: 3,
    level: 2,
    type: 'mass-to-molecules',
    question: 'Tính số phân tử trong 160g Fe₂O₃',
    chemical: 'Fe₂O₃',
    given: { mass: 160 },
    answer: 6.022e23,
    unit: 'molecules',
    tolerance: 0.3e23,
    points: 150,
    hint: 'Bước 1: Tính n = m/M, Bước 2: N = n × Nₐ'
  },
  {
    id: 4,
    level: 2,
    type: 'molecules-to-mass',
    question: 'Tính khối lượng của 3.011×10²³ phân tử MgO',
    chemical: 'MgO',
    given: { molecules: 3.011e23 },
    answer: 20,
    unit: 'g',
    tolerance: 1,
    points: 150,
    hint: 'Bước 1: Tính n = N/Nₐ, Bước 2: m = n × M'
  },
  {
    id: 5,
    level: 3,
    type: 'complex',
    question: 'Có 320g CuO. Tính số mol trong 320g CuO',
    chemical: 'CuO',
    given: { mass: 320 },
    answer: 4.0,
    unit: 'mol',
    tolerance: 0.1,
    points: 200,
    hint: 'Tính số mol: n = m/M = 320/80 = 4 mol'
  },
  {
    id: 6,
    level: 3,
    type: 'complex',
    question: 'Tính khối lượng của 0.5 mol CuSO₄',
    chemical: 'CuSO₄',
    given: { mol: 0.5 },
    answer: 80,
    unit: 'g',
    tolerance: 2,
    points: 200,
    hint: 'Sử dụng công thức: m = n × M'
  },
  {
    id: 7,
    level: 1,
    type: 'mass-to-mol',
    question: 'Tính số mol của 58.5g NaCl',
    chemical: 'NaCl',
    given: { mass: 58.5 },
    answer: 1.0,
    unit: 'mol',
    tolerance: 0.02,
    points: 100,
    hint: 'n = m / M (58.5 / 58.5 = 1 mol)'
  },
  {
    id: 8,
    level: 1,
    type: 'mol-to-mass',
    question: 'Tính khối lượng của 0.2 mol KNO₃',
    chemical: 'KNO₃',
    given: { mol: 0.2 },
    answer: 20.2,
    unit: 'g',
    tolerance: 0.5,
    points: 100,
    hint: 'm = n × M (0.2 × 101 = 20.2 g)'
  },
  {
    id: 9,
    level: 2,
    type: 'mass-to-molecules',
    question: 'Tính số phân tử trong 80g MgO',
    chemical: 'MgO',
    given: { mass: 80 },
    answer: 1.2044e24,
    unit: 'molecules',
    tolerance: 0.1e24,
    points: 150,
    hint: 'n = m/M = 80/40 = 2 mol → N = n × Nₐ = 2 × 6.022e23'
  },
  {
    id: 10,
    level: 2,
    type: 'molecules-to-mass',
    question: 'Tính khối lượng của 6.022×10²³ phân tử NaCl',
    chemical: 'NaCl',
    given: { molecules: 6.022e23 },
    answer: 58.5,
    unit: 'g',
    tolerance: 1,
    points: 150,
    hint: '6.022×10²³ là 1 mol → m = n × M = 1 × 58.5 g'
  },
  {
    id: 11,
    level: 3,
    type: 'mass-to-mol',
    question: 'Tính số mol của 102g Al₂O₃',
    chemical: 'Al₂O₃',
    given: { mass: 102 },
    answer: 1.0,
    unit: 'mol',
    tolerance: 0.05,
    points: 200,
    hint: 'n = m/M = 102/102 = 1 mol'
  },
  {
    id: 12,
    level: 3,
    type: 'mol-to-mass',
    question: 'Tính khối lượng của 0.25 mol CuSO₄',
    chemical: 'CuSO₄',
    given: { mol: 0.25 },
    answer: 40,
    unit: 'g',
    tolerance: 1,
    points: 200,
    hint: 'm = n × M = 0.25 × 160 = 40 g'
  },
];

const MolQuickCalc = () => {
  const [gameState, setGameState] = useState('welcome'); // welcome, playing, completed
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [showHint, setShowHint] = useState(false);
  const [feedback, setFeedback] = useState(null); // { correct: boolean, message: string }
  const [score, setScore] = useState(0);
  const [completedChallenges, setCompletedChallenges] = useState([]);
  const [streak, setStreak] = useState(0);
  const [failedChallenges, setFailedChallenges] = useState([]);
  const [isReviewMode, setIsReviewMode] = useState(false);
  const [activeIds, setActiveIds] = useState(challenges.map(c => c.id));
  
  // Simulation states
  const [mass, setMass] = useState(0);
  const [moles, setMoles] = useState(0);
  const [showSimulation, setShowSimulation] = useState(true);

  const currentChallenge = challenges.find(c => c.id === activeIds[currentIndex]);
  const currentChemical = CHEMICALS.find(c => c.formula === currentChallenge?.chemical);
  const progress = ((currentIndex + 1) / activeIds.length) * 100;
  // Display unit for the answer input; prefer explicit unit in challenge data
  const displayUnit = currentChallenge?.unit ?? (
    currentChallenge?.type?.includes('mol') && !currentChallenge?.type?.includes('molecules') ? 'mol' :
    currentChallenge?.type?.includes('mass') ? 'g' :
    currentChallenge?.type?.includes('molecules') ? 'molecules' :
    ''
  );
  // Calculate number of particles N when moles available
  const computedN = mass > 0 ? moles * AVOGADRO : 0;
  const formattedN = computedN > 0 ? (computedN >= 1e6 ? computedN.toExponential(3) : computedN.toLocaleString()) : '0';
  // Cube size for 3D cube visualization (scales with mass)
  const cubeSize = Math.max(40, Math.min(120, 40 + (mass / 500) * 80));
  // faceOffset slightly less than half size to prevent visible gaps when cube is small
  const faceOffset = Math.max(1, cubeSize / 2 - 1);

  // Tính toán mol khi khối lượng thay đổi
  useEffect(() => {
    if (currentChemical && mass > 0) {
      const calculatedMoles = mass / currentChemical.molarMass;
      setMoles(calculatedMoles);
    } else {
      setMoles(0);
    }
  }, [mass, currentChemical]);

  useEffect(() => {
    if (feedback) {
      const timer = setTimeout(() => {
        // Advance to next in activeIds or switch modes
        if (currentIndex < activeIds.length - 1) {
          setCurrentIndex(currentIndex + 1);
          setUserAnswer('');
          setFeedback(null);
          setShowHint(false);
        } else {
          // End of this pass
          if (!isReviewMode) {
            // First pass finished
            if (failedChallenges.length > 0) {
              setIsReviewMode(true);
              setActiveIds([...failedChallenges]);
              setCurrentIndex(0);
              setUserAnswer('');
              setFeedback(null);
              setShowHint(false);
            } else {
              setGameState('completed');
            }
          } else {
            // Review pass finished
            if (failedChallenges.length > 0) {
              // Start another review pass with remaining failed ones
              setActiveIds([...failedChallenges]);
              setCurrentIndex(0);
              setUserAnswer('');
              setFeedback(null);
              setShowHint(false);
            } else {
              setGameState('completed');
            }
          }
        }
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [feedback, currentIndex, activeIds, failedChallenges, isReviewMode]);

  // Reset simulation khi chuyển câu hỏi
  useEffect(() => {
    setMass(0);
    setMoles(0);
    setUserAnswer('');
    setFeedback(null);
    setShowHint(false);
  }, [currentIndex]);

  // Điều chỉnh khối lượng
  const adjustMass = (delta) => {
    const newMass = Math.max(0, Math.min(mass + delta, 500));
    setMass(parseFloat(newMass.toFixed(1)));
  };

  const handleSubmit = () => {
    const answer = parseFloat(userAnswer);
    if (isNaN(answer)) {
      setFeedback({ correct: false, message: 'Vui lòng nhập một số hợp lệ!' });
      return;
    }

    const isCorrect = Math.abs(answer - currentChallenge.answer) <= currentChallenge.tolerance;

    if (isCorrect) {
      // If in review mode, do not award points for corrections
      if (!isReviewMode) {
        const bonusPoints = streak >= 3 ? currentChallenge.points * 0.5 : 0;
        const totalPoints = currentChallenge.points + bonusPoints;
        setScore(score + totalPoints);
        setFeedback({ 
          correct: true, 
          message: `Chính xác! +${totalPoints} điểm${bonusPoints > 0 ? ' (Streak Bonus!)' : ''}` 
        });
        setStreak(streak + 1);
        // Add to completed only once
        setCompletedChallenges(prev => prev.includes(currentChallenge.id) ? prev : [...prev, currentChallenge.id]);
      } else {
        // Review mode: correct but no points
        setFeedback({ correct: true, message: 'Đúng (không tính điểm trong lần làm lại).' });
        // Remove from failedChallenges
        setFailedChallenges(prev => prev.filter(id => id !== currentChallenge.id));
      }
    } else {
      setStreak(0);
      setFeedback({ correct: false, message: 'Chưa đúng! Câu này sẽ được lưu vào bộ làm lại.' });
      // Record failed id (avoid duplicates)
      setFailedChallenges(prev => prev.includes(currentChallenge.id) ? prev : [...prev, currentChallenge.id]);
    }
  };

  const handleRestart = () => {
    setGameState('playing');
    setCurrentIndex(0);
    setActiveIds(challenges.map(c => c.id));
    setIsReviewMode(false);
    setUserAnswer('');
    setFeedback(null);
    setShowHint(false);
    setScore(0);
    setCompletedChallenges([]);
    setStreak(0);
    setFailedChallenges([]);
  };

  // Welcome Screen
  if (gameState === 'welcome') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
        <div className="container mx-auto px-4 py-6">
          <Link to="/advanced-challenge" className="inline-flex items-center text-gray-600 hover:text-gray-900 transition-colors group">
            <ArrowLeft className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" />
            Quay lại
          </Link>
        </div>

        <div className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto">
            {/* Hero Card */}
            <div className="bg-white rounded-3xl shadow-2xl overflow-hidden transform hover:scale-[1.02] transition-all duration-300">
              {/* Gradient Header */}
              <div className="relative h-48 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 p-8 flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 bg-black opacity-10"></div>
                <div className="absolute inset-0 animate-pulse-slow">
                  <div className="absolute top-10 left-10 w-20 h-20 bg-white rounded-full opacity-10 animate-float"></div>
                  <div className="absolute bottom-10 right-20 w-32 h-32 bg-white rounded-full opacity-10 animate-float-delayed"></div>
                  <div className="absolute top-20 right-10 w-16 h-16 bg-white rounded-full opacity-10 animate-float"></div>
                </div>
                <div className="relative z-10 text-center">
                  <div className="flex items-center justify-center mb-4">
                    <Atom className="w-16 h-16 text-white animate-spin-slow" />
                  </div>
                  <h1 className="text-4xl md:text-5xl font-bold text-white mb-2 drop-shadow-lg">
                    Mol Quick Calc
                  </h1>
                  <p className="text-white/90 text-lg">Thử thách tính toán Hóa học</p>
                </div>
              </div>

              {/* Content */}
              <div className="p-8 md:p-12">
                <div className="grid md:grid-cols-3 gap-6 mb-8">
                  <div className="text-center p-6 bg-gradient-to-br from-indigo-50 to-indigo-100 rounded-2xl transform hover:scale-105 transition-all">
                    <div className="w-12 h-12 bg-indigo-600 rounded-full flex items-center justify-center mx-auto mb-3">
                      <BookOpen className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="font-bold text-gray-800 mb-1">{challenges.length} Thử thách</h3>
                    <p className="text-sm text-gray-600">3 cấp độ khó</p>
                  </div>

                  <div className="text-center p-6 bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl transform hover:scale-105 transition-all">
                    <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Calculator className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="font-bold text-gray-800 mb-1">Tính toán Mol</h3>
                    <p className="text-sm text-gray-600">Khối lượng & số phân tử</p>
                  </div>

                  <div className="text-center p-6 bg-gradient-to-br from-pink-50 to-pink-100 rounded-2xl transform hover:scale-105 transition-all">
                    <div className="w-12 h-12 bg-pink-600 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Trophy className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="font-bold text-gray-800 mb-1">Hệ thống điểm</h3>
                    <p className="text-sm text-gray-600">Streak bonus</p>
                  </div>
                </div>

                <div className="text-center">
                  <button
                    onClick={() => setGameState('playing')}
                    className="group relative inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white font-bold text-lg rounded-full shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300 overflow-hidden"
                  >
                    <span className="absolute inset-0 bg-gradient-to-r from-pink-600 via-purple-600 to-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                    <Sparkles className="w-6 h-6 relative z-10 group-hover:animate-spin" />
                    <span className="relative z-10">Bắt đầu thử thách</span>
                    <Zap className="w-6 h-6 relative z-10 group-hover:animate-bounce" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Completed Screen
  if (gameState === 'completed') {
    const maxScore = challenges.reduce((sum, c) => sum + c.points, 0);
    const percentage = ((score / maxScore) * 100).toFixed(1);
    const rank = percentage >= 90 ? 'Xuất sắc' : percentage >= 70 ? 'Giỏi' : percentage >= 50 ? 'Khá' : 'Cần cố gắng';

    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 flex items-center justify-center p-4">
        <div className="max-w-2xl w-full bg-white rounded-3xl shadow-2xl overflow-hidden animate-scale-in">
          {/* Gradient Header */}
          <div className="relative h-32 bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 flex items-center justify-center">
            <Trophy className="w-20 h-20 text-white animate-bounce" />
          </div>

          <div className="p-8 text-center">
            <h2 className="text-3xl font-bold mb-2 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              🎉 Hoàn thành xuất sắc!
            </h2>
            <p className="text-gray-600 mb-8">Bạn đã hoàn thành tất cả thử thách</p>

            {/* Score Card */}
            <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl p-6 mb-8">
              <div className="text-6xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-2">
                {score}
              </div>
              <p className="text-gray-600 mb-4">Tổng điểm đạt được</p>
              
              <div className="flex items-center justify-center gap-2 mb-4">
                <div className="flex-1 h-3 bg-gray-200 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full transition-all duration-1000"
                    style={{ width: `${percentage}%` }}
                  ></div>
                </div>
                <span className="text-sm font-bold text-gray-700">{percentage}%</span>
              </div>

              <div className="inline-block px-4 py-2 bg-gradient-to-r from-yellow-100 to-orange-100 rounded-full">
                <span className="text-sm font-bold text-orange-700">🏆 {rank}</span>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="bg-green-50 rounded-xl p-4">
                <CheckCircle2 className="w-8 h-8 text-green-600 mx-auto mb-2" />
                <div className="text-2xl font-bold text-green-600">{completedChallenges.length}</div>
                <div className="text-sm text-gray-600">Hoàn thành</div>
              </div>
              <div className="bg-blue-50 rounded-xl p-4">
                <Zap className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                <div className="text-2xl font-bold text-blue-600">{streak}</div>
                <div className="text-sm text-gray-600">Streak cao nhất</div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-4">
              <button
                onClick={handleRestart}
                className="flex-1 px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold rounded-xl hover:shadow-lg transform hover:scale-105 transition-all"
              >
                Chơi lại
              </button>
              <Link
                to="/advanced-challenge"
                className="flex-1 px-6 py-3 bg-gray-100 text-gray-700 font-bold rounded-xl hover:bg-gray-200 transform hover:scale-105 transition-all text-center"
              >
                Về trang chủ
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Playing Screen
  return (
    <div className="h-screen overflow-hidden bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 flex flex-col">
      {/* Inline styles for 360° cube spin animation (only during playing) */}
      <style>{`
        .cube-360 { animation: spin360 6s linear infinite; transform-style: preserve-3d; }
        .cube-360.paused { animation-play-state: paused; }
        .cube-face { backface-visibility: hidden; -webkit-backface-visibility: hidden; }
        @keyframes spin360 {
          from { transform: rotateX(20deg) rotateY(-25deg) rotateZ(0deg); }
          to   { transform: rotateX(20deg) rotateY(-25deg) rotateZ(360deg); }
        }
      `}</style>
      {/* Header */}
      <div className="flex-shrink-0 bg-white/80 backdrop-blur-sm shadow-sm">
        <div className="container mx-auto px-4 py-2">
          <div className="flex items-center justify-between mb-2">
            <Link to="/advanced-challenge" className="flex items-center text-gray-600 hover:text-gray-900 transition-colors group">
              <ArrowLeft className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" />
              Quay lại
            </Link>

            <div className="flex items-center gap-4">
              {/* Streak */}
              {streak > 0 && (
                <div className="flex items-center gap-2 px-3 py-1 bg-gradient-to-r from-orange-100 to-red-100 rounded-full animate-pulse-subtle">
                  <Zap className="w-4 h-4 text-orange-600" />
                  <span className="font-bold text-orange-700">{streak}x Streak</span>
                </div>
              )}

              {/* Score */}
              <div className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-indigo-100 to-purple-100 rounded-full">
                <Trophy className="w-5 h-5 text-indigo-600" />
                <span className="font-bold text-indigo-700">{score}</span>
              </div>
            </div>
          </div>

          {/* Progress */}
          <div className="flex items-center gap-3">
            <span className="text-sm font-medium text-gray-600 whitespace-nowrap">
              Câu {currentIndex + 1}/{activeIds.length}
            </span>
            {isReviewMode && (
              <span className="text-xs font-semibold text-yellow-700 bg-yellow-100 px-2 py-0.5 rounded-full">
                Làm lại (không tính điểm)
              </span>
            )}
            <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 rounded-full transition-all duration-500"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            <span className="text-sm font-medium text-gray-600">{Math.round(progress)}%</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-hidden">
        <div className="container mx-auto px-4 h-full">
          <div className="max-w-6xl mx-auto h-full py-2">
            <div className="grid md:grid-cols-2 gap-4 h-full">
              {/* Left: Chemical Info & Simulation */}
              <div className="space-y-2 overflow-y-auto max-h-full">
              {/* Chemical Card */}
              <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                <div 
                  className="h-20 flex items-center justify-center relative overflow-hidden"
                  style={{ background: `linear-gradient(135deg, ${currentChemical?.color}dd, ${currentChemical?.color})` }}
                >
                  <div className="absolute inset-0 bg-black/10"></div>
                  <div className="absolute top-4 right-4 w-20 h-20 bg-white/20 rounded-full animate-pulse-slow"></div>
                  <div className="absolute bottom-4 left-4 w-16 h-16 bg-white/20 rounded-full animate-float"></div>
                  
                  <div className="relative z-10 text-center">
                    <Atom className="w-8 h-8 text-white mx-auto mb-1 animate-spin-slow" />
                    <div className="text-2xl font-bold text-white drop-shadow-lg">
                      {currentChemical?.formula}
                    </div>
                  </div>
                </div>
                
                <div className="p-3">
                  <h3 className="text-sm font-bold text-gray-800 mb-2">{currentChemical?.name}</h3>
                  
                  <div className="space-y-1 text-xs">
                    <div className="flex justify-between items-center p-2 bg-gray-50 rounded-lg">
                      <span className="text-gray-600">Khối lượng mol (M)</span>
                      <span className="font-bold text-gray-800">{currentChemical?.molarMass} g/mol</span>
                    </div>
                   
                  </div>
                </div>
              </div>

              {/* Level Badge */}
              <div className={`p-2 rounded-lg text-center text-sm font-bold shadow-lg transform hover:scale-105 transition-all ${
                currentChallenge.level === 1 ? 'bg-gradient-to-r from-green-400 to-emerald-500 text-white' :
                currentChallenge.level === 2 ? 'bg-gradient-to-r from-yellow-400 to-orange-500 text-white' :
                'bg-gradient-to-r from-red-400 to-pink-500 text-white'
              }`}>
                <div className="flex items-center justify-center gap-2">
                  {currentChallenge.level === 1 && '⭐'}
                  {currentChallenge.level === 2 && '⭐⭐'}
                  {currentChallenge.level === 3 && '⭐⭐⭐'}
                  <span>Cấp độ {currentChallenge.level}</span>
                </div>
              </div>

              {/* Interactive Simulation */}
              <div className="bg-white rounded-lg shadow-lg p-3">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-sm font-bold text-gray-800 flex items-center gap-1">
                    <Atom className="w-4 h-4 text-indigo-600" />
                    Mô phỏng tương tác
                  </h4>
                  <button
                    onClick={() => setShowSimulation(!showSimulation)}
                    className="text-sm text-indigo-600 hover:text-indigo-700 font-medium"
                  >
                    {showSimulation ? 'Ẩn' : 'Hiện'}
                  </button>
                </div>

                {showSimulation && (
                  <div className="space-y-2">
                    {/* Visual representation */}
                    <div className="relative h-24 bg-gradient-to-b from-gray-50 to-gray-100 rounded-lg p-2 flex items-end justify-center overflow-hidden">
                      {/* Base container */}
                      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-32 h-2 bg-gray-300 rounded-full"></div>
                      
                      {/* 3D Cube representation */}
                      {mass > 0 && (
                        <div className="relative w-full h-full flex items-center justify-center">
                          <div
                            className="relative"
                            style={{
                              width: `${cubeSize}px`,
                              height: `${cubeSize}px`,
                              perspective: 800,
                            }}
                          >
                            <div
                              className="relative transform-style-preserve-3d cube-360"
                              style={{
                                width: '100%',
                                height: '100%',
                                transformStyle: 'preserve-3d',
                                transition: 'transform 400ms ease',
                              }}
                            >
                              {/* front (show N inside) */}
                              <div
                                className="cube-face"
                                style={{
                                  position: 'absolute',
                                  width: '100%',
                                  height: '100%',
                                  backgroundColor: currentChemical?.color,
                                  opacity: 0.98,
                                  boxShadow: `0 8px 20px ${currentChemical?.color}66`,
                                  transform: `translateZ(${faceOffset}px)`,
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  borderRadius: '6px',
                                  color: 'white',
                                  textAlign: 'center',
                                  padding: '6px',
                                }}
                              >
                                <div style={{pointerEvents: 'none'}}>
                                  <div style={{fontSize: `${Math.max(10, Math.round(cubeSize/12))}px`, opacity: 0.9}}>
                                    N
                                  </div>
                                  <div style={{fontSize: `${Math.max(12, Math.round(cubeSize/6))}px`, fontWeight: 700, textShadow: '0 2px 6px rgba(0,0,0,0.4)'}}>
                                    {formattedN}
                                  </div>
                                  
                                </div>
                              </div>

                              {/* back */}
                              <div
                                className="cube-face"
                                style={{
                                  position: 'absolute',
                                  width: '100%',
                                  height: '100%',
                                  backgroundColor: currentChemical?.color,
                                  opacity: 0.85,
                                  transform: `rotateY(180deg) translateZ(${faceOffset}px)`,
                                  borderRadius: '6px',
                                }}
                              />

                              {/* right */}
                              <div
                                className="cube-face"
                                style={{
                                  position: 'absolute',
                                  width: '100%',
                                  height: '100%',
                                  backgroundColor: currentChemical?.color,
                                  opacity: 0.9,
                                  transform: `rotateY(90deg) translateZ(${faceOffset}px)`,
                                  borderRadius: '6px',
                                }}
                              />

                              {/* left */}
                              <div
                                className="cube-face"
                                style={{
                                  position: 'absolute',
                                  width: '100%',
                                  height: '100%',
                                  backgroundColor: currentChemical?.color,
                                  opacity: 0.8,
                                  transform: `rotateY(-90deg) translateZ(${faceOffset}px)`,
                                  borderRadius: '6px',
                                }}
                              />

                              {/* top */}
                              <div
                                className="cube-face"
                                style={{
                                  position: 'absolute',
                                  width: '100%',
                                  height: '100%',
                                  backgroundColor: currentChemical?.color,
                                  opacity: 0.92,
                                  transform: `rotateX(90deg) translateZ(${faceOffset}px)`,
                                  borderRadius: '6px',
                                }}
                              />

                              {/* bottom */}
                              <div
                                className="cube-face"
                                style={{
                                  position: 'absolute',
                                  width: '100%',
                                  height: '100%',
                                  backgroundColor: currentChemical?.color,
                                  opacity: 0.75,
                                  transform: `rotateX(-90deg) translateZ(${faceOffset}px)`,
                                  borderRadius: '6px',
                                }}
                              />
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Empty state */}
                      {mass === 0 && (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <p className="text-gray-400 text-sm">Thêm chất để bắt đầu</p>
                        </div>
                      )}
                    </div>

                    {/* Mass control */}
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                        <Calculator className="w-4 h-4" />
                        Khối lượng chất (m)
                      </label>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => adjustMass(-1)}
                          className="w-8 h-8 bg-gray-100 hover:bg-gray-200 rounded-lg flex items-center justify-center transition-colors"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <div className="flex-1">
                          <input
                            type="range"
                            min="0"
                            max="500"
                            step="1"
                            value={mass}
                            onChange={(e) => setMass(parseFloat(e.target.value))}
                            className="w-full"
                          />
                        </div>
                        <button
                          onClick={() => adjustMass(1)}
                          className="w-8 h-8 bg-gray-100 hover:bg-gray-200 rounded-lg flex items-center justify-center transition-colors"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Khối lượng:</span>
                        <span className="font-bold" style={{ color: currentChemical?.color }}>{mass.toFixed(1)} g</span>
                      </div>
                    </div>

                    {/* Calculated values */}
                    {mass > 0 && (
                      <div className="space-y-2 pt-3 border-t border-gray-200">
                        <div className="flex justify-between items-center p-2 bg-indigo-50 rounded-lg">
                          <span className="text-sm text-gray-600">Số mol (n):</span>
                          <span className="text-sm font-bold text-indigo-600">{moles.toFixed(3)} mol</span>
                        </div>

                      

                        <div className="p-2 bg-gray-50 rounded-lg">
                          <code className="text-xs text-gray-600">n = m/M = {mass}/{currentChemical?.molarMass} = {moles.toFixed(3)} mol</code>
                        </div>

                        <div className="p-2 bg-gray-50 rounded-lg">
                          <code className="text-xs text-gray-600">N = n × Nₐ = {moles.toFixed(3)} × {AVOGADRO} = {formattedN}</code>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>

            </div>

              {/* Right: Challenge Card */}
              <div className="space-y-2 overflow-y-auto max-h-full">
              {/* Question Card */}
              <div className="bg-white rounded-lg shadow-lg p-3 transform hover:shadow-2xl transition-all">
                <div className="flex items-start gap-2 mb-3">
                  <div className="w-7 h-7 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-white text-xs font-bold">{currentIndex + 1}</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-base font-bold text-gray-800 mb-1.5">
                      {currentChallenge.question}
                    </h3>
                    <div className="inline-block px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-sm font-medium">
                      +{currentChallenge.points} điểm
                    </div>
                  </div>
                </div>

                {/* Formulas Reference (moved from left) */}
                <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-lg p-3 shadow-sm mb-3">
                  <h4 className="font-bold text-gray-800 mb-2 flex items-center gap-2 text-sm">
                    <Calculator className="w-4 h-4 text-indigo-600" />
                    Công thức tham khảo
                  </h4>
                  <div className="space-y-2 text-xs">
                    <div className="p-2 bg-white rounded-md">
                      <code className="text-indigo-600 font-mono">n = m/M</code>
                      <span className="text-gray-600 ml-2">(mol)</span>
                    </div>
                    <div className="p-2 bg-white rounded-md">
                      <code className="text-purple-600 font-mono">m = n × M</code>
                      <span className="text-gray-600 ml-2">(gam)</span>
                    </div>
                    <div className="p-2 bg-white rounded-md">
                      <code className="text-pink-600 font-mono">N = n × Nₐ</code>
                      <span className="text-gray-600 ml-2">(phân tử)</span>
                    </div>
                  </div>
                </div>

                {/* Answer Input */}
                <div className="mb-3">
                  <label className="block text-xs font-medium text-gray-700 mb-1.5">
                    Nhập đáp án của bạn
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      step="any"
                      value={userAnswer}
                      onChange={(e) => setUserAnswer(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && !feedback && handleSubmit()}
                      disabled={feedback !== null}
                      placeholder="Nhập kết quả..."
                      className="w-full px-4 py-2 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 outline-none transition-all text-base font-medium disabled:bg-gray-50 disabled:text-gray-500"
                    />
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">
                      {displayUnit}
                    </div>
                  </div>
                </div>

                {/* Hint */}
                {!feedback && (
                  <button
                    onClick={() => setShowHint(!showHint)}
                    className="w-full mb-2 px-3 py-1.5 bg-yellow-50 hover:bg-yellow-100 border-2 border-yellow-200 text-yellow-700 text-sm font-medium rounded-lg transition-all flex items-center justify-center gap-2"
                  >
                    <Lightbulb className="w-4 h-4" />
                    {showHint ? 'Ẩn gợi ý' : 'Xem gợi ý'}
                  </button>
                )}

                {showHint && !feedback && (
                  <div className="mb-4 p-4 bg-yellow-50 border-2 border-yellow-200 rounded-xl animate-slide-down">
                    <div className="flex gap-3">
                      <Lightbulb className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                      <p className="text-sm text-yellow-800">{currentChallenge.hint}</p>
                    </div>
                  </div>
                )}

                {/* Feedback */}
                {feedback && (
                  <div className={`p-4 rounded-xl mb-4 animate-slide-down ${
                    feedback.correct 
                      ? 'bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-200' 
                      : 'bg-gradient-to-r from-red-50 to-pink-50 border-2 border-red-200'
                  }`}>
                    <div className="flex items-start gap-3">
                      {feedback.correct ? (
                        <CheckCircle2 className="w-6 h-6 text-green-600 flex-shrink-0 animate-bounce" />
                      ) : (
                        <XCircle className="w-6 h-6 text-red-600 flex-shrink-0 animate-shake" />
                      )}
                      <div>
                        <p className={`font-bold mb-1 ${feedback.correct ? 'text-green-700' : 'text-red-700'}`}>
                          {feedback.correct ? '🎉 Chính xác!' : '❌ Chưa đúng!'}
                        </p>
                        <p className={`text-sm ${feedback.correct ? 'text-green-600' : 'text-red-600'}`}>
                          {feedback.message}
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Submit Button */}
                {!feedback && (
                  <button
                    onClick={handleSubmit}
                    disabled={!userAnswer}
                    className="w-full px-4 py-2.5 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white font-bold rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2 group"
                  >
                    <span>Kiểm tra đáp án</span>
                    <Sparkles className="w-5 h-5 group-hover:animate-spin" />
                  </button>
                )}
              </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MolQuickCalc;
