import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Trophy, Lightbulb, Beaker, Sparkles, AlertCircle } from 'lucide-react';
import './PhongThiNghiem.css';

const PhongThiNghiem = () => {
  const [currentLevel, setCurrentLevel] = useState(1);
  const [selectedChemical, setSelectedChemical] = useState(null);
  const [beakerChemicals, setBeakerChemicals] = useState([]);
  const [isReacting, setIsReacting] = useState(false);
  const [isPouring, setIsPouring] = useState(false);
  const [pouringChemical, setPouringChemical] = useState(null);
  const [resultMessage, setResultMessage] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);
  const [totalScore, setTotalScore] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameCompleted, setGameCompleted] = useState(false);

  // Định nghĩa 10 màn chơi
  const levels = [
    {
      level: 1,
      title: 'Phản ứng trung hòa',
      description: 'Tạo muối ăn (NaCl) bằng cách trung hòa axit và bazơ',
      required: ['hcl', 'naoh'],
      targetName: 'NaCl + H₂O',
      targetColor: '#98FB98',
      hint: 'Trộn HCl với NaOH để tạo muối và nước'
    },
    {
      level: 2,
      title: 'Kết tủa trắng',
      description: 'Tạo kết tủa trắng bạc clorua',
      required: ['agno3', 'hcl'],
      targetName: 'AgCl↓',
      targetColor: '#F5F5F5',
      hint: 'Trộn AgNO₃ với HCl tạo kết tủa trắng'
    },
    {
      level: 3,
      title: 'Kết tủa xanh',
      description: 'Tạo kết tủa xanh đồng hidroxit',
      required: ['cuso4', 'naoh'],
      targetName: 'Cu(OH)₂↓',
      targetColor: '#4682B4',
      hint: 'Trộn CuSO₄ với NaOH tạo kết tủa xanh'
    },
    {
      level: 4,
      title: 'Phản ứng tạo khí',
      description: 'Tạo khí hydro từ kim loại và axit',
      required: ['zn', 'hcl'],
      targetName: 'ZnCl₂ + H₂↑',
      targetColor: '#E0F7FA',
      hint: 'Trộn Zn với HCl để tạo khí H₂'
    },
    {
      level: 5,
      title: 'Chất chỉ thị trong bazơ',
      description: 'Tạo dung dịch hồng với phenolphthalein',
      required: ['naoh', 'phenolphthalein'],
      targetName: 'Dung dịch hồng',
      targetColor: '#FF69B4',
      hint: 'Thêm Phenolphthalein vào NaOH'
    },
    {
      level: 6,
      title: 'Phản ứng thế',
      description: 'Sắt đẩy đồng ra khỏi dung dịch',
      required: ['cuso4', 'fe'],
      targetName: 'FeSO₄ + Cu',
      targetColor: '#B0C4DE',
      hint: 'Cho Fe vào CuSO₄'
    },
    {
      level: 7,
      title: 'Muối sunfat',
      description: 'Tạo natri sunfat từ phản ứng trung hòa',
      required: ['h2so4', 'naoh'],
      targetName: 'Na₂SO₄ + H₂O',
      targetColor: '#90EE90',
      hint: 'Trộn H₂SO₄ với NaOH'
    },
    {
      level: 8,
      title: 'Chất chỉ thị trong axit',
      description: 'Methyl Orange chuyển màu đỏ trong axit',
      required: ['hcl', 'methyl-orange'],
      targetName: 'Dung dịch đỏ',
      targetColor: '#FF4500',
      hint: 'Thêm Methyl Orange vào HCl'
    },
    {
      level: 9,
      title: 'Khí từ sắt',
      description: 'Tạo khí hydro từ sắt và axit',
      required: ['h2so4', 'fe'],
      targetName: 'FeSO₄ + H₂↑',
      targetColor: '#D3D3D3',
      hint: 'Trộn Fe với H₂SO₄'
    },
    {
      level: 10,
      title: 'Thử thách cuối',
      description: 'Tạo kết tủa bạc từ muối',
      required: ['agno3', 'nacl'],
      targetName: 'AgCl↓ + NaNO₃',
      targetColor: '#F0F0F0',
      hint: 'Trộn AgNO₃ với NaCl'
    }
  ];

  const currentLevelData = levels[currentLevel - 1];

  const chemicals = [
    { id: 'hcl', name: 'HCl', fullName: 'Axit Clohidric', color: '#FFE4B5', icon: '🧪' },
    { id: 'h2so4', name: 'H₂SO₄', fullName: 'Axit Sunfuric', color: '#FFD700', icon: '🧪' },
    { id: 'naoh', name: 'NaOH', fullName: 'Natri Hidroxit', color: '#87CEEB', icon: '⚗️' },
    { id: 'nacl', name: 'NaCl', fullName: 'Natri Clorua', color: '#F0F8FF', icon: '🧂' },
    { id: 'agno3', name: 'AgNO₃', fullName: 'Bạc Nitrat', color: '#E8E8E8', icon: '✨' },
    { id: 'cuso4', name: 'CuSO₄', fullName: 'Đồng(II) Sunfat', color: '#4169E1', icon: '💎' },
    { id: 'fe', name: 'Fe', fullName: 'Sắt', color: '#A9A9A9', icon: '⚙️' },
    { id: 'zn', name: 'Zn', fullName: 'Kẽm', color: '#C0C0C0', icon: '⚙️' },
    { id: 'phenolphthalein', name: 'Phenol', fullName: 'Phenolphthalein', color: '#FFC0CB', icon: '🌸' },
    { id: 'methyl-orange', name: 'Methyl', fullName: 'Methyl Orange', color: '#FFA500', icon: '🍊' }
  ];

  const checkLevelComplete = (chemicals) => {
    if (chemicals.length !== currentLevelData.required.length) return false;
    return currentLevelData.required.every(req => chemicals.some(chem => chem.id === req));
  };

  const handleChemicalClick = (chemical) => {
    setSelectedChemical(chemical);
  };

  const handleBeakerClick = () => {
    if (!selectedChemical) {
      setResultMessage('⚠️ Vui lòng chọn một hóa chất!');
      setTimeout(() => setResultMessage(''), 2000);
      return;
    }

    if (beakerChemicals.length >= 3) {
      setResultMessage('⚠️ Cốc đã đầy! Vui lòng làm sạch trước.');
      setTimeout(() => setResultMessage(''), 2000);
      return;
    }

    if (beakerChemicals.some(c => c.id === selectedChemical.id)) {
      setResultMessage('⚠️ Hóa chất này đã có trong cốc!');
      setTimeout(() => setResultMessage(''), 2000);
      return;
    }

    // Start pouring animation
    setPouringChemical(selectedChemical);
    setIsPouring(true);

    setTimeout(() => {
      const newChemicals = [...beakerChemicals, selectedChemical];
      setBeakerChemicals(newChemicals);
      setIsPouring(false);
      setPouringChemical(null);

      if (checkLevelComplete(newChemicals)) {
        setTimeout(() => {
          setIsReacting(true);
          setResultMessage(`🎉 Chính xác! Bạn đã tạo ra ${currentLevelData.targetName}!`);
          setTotalScore(prev => prev + 100);
          setShowSuccess(true);
          setTimeout(() => setIsReacting(false), 2000);
        }, 300);
      } else if (newChemicals.length === currentLevelData.required.length) {
        setResultMessage('❌ Sai rồi! Hãy thử lại.');
        setTimeout(() => {
          setResultMessage('');
          clearBeaker();
        }, 2000);
      }
    }, 1000);

    setSelectedChemical(null);
  };

  const clearBeaker = () => {
    setBeakerChemicals([]);
    setIsReacting(false);
    setIsPouring(false);
    setPouringChemical(null);
    setShowSuccess(false);
  };

  const nextLevel = () => {
    if (currentLevel < levels.length) {
      setCurrentLevel(prev => prev + 1);
      clearBeaker();
      setResultMessage('');
      setShowSuccess(false);
    } else {
      setGameCompleted(true);
    }
  };

  const restartGame = () => {
    setCurrentLevel(1);
    clearBeaker();
    setTotalScore(0);
    setResultMessage('');
    setShowSuccess(false);
    setGameStarted(true);
    setGameCompleted(false);
  };

  const getBeakerColor = () => {
    if (beakerChemicals.length === 0) return 'transparent';
    if (isReacting && checkLevelComplete(beakerChemicals)) return currentLevelData.targetColor;
    if (beakerChemicals.length === 1) return beakerChemicals[0].color;
    return beakerChemicals[beakerChemicals.length - 1].color;
  };

  const getEffect = () => {
    if (!isReacting) return null;
    const levelNum = currentLevel;
    if (levelNum === 2 || levelNum === 3 || levelNum === 10) return 'precipitate';
    if (levelNum === 4 || levelNum === 9) return 'gas';
    if (levelNum === 5 || levelNum === 8) return 'color-change';
    if (levelNum === 6) return 'displacement';
    return 'neutralization';
  };

  const effect = getEffect();
  const liquidHeight = beakerChemicals.length > 0 ? 30 + (beakerChemicals.length * 25) : 0;
  const progressPercent = Math.round((currentLevel / levels.length) * 100);

  // Start screen
  if (!gameStarted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-600 via-indigo-600 to-blue-700">
        <div className="bg-white shadow-md">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <Link to="/advanced-challenge" className="flex items-center text-gray-600 hover:text-gray-900">
                <ArrowLeft className="w-5 h-5 mr-2" />
                Quay lại
              </Link>
              <h1 className="text-2xl font-bold text-gray-800 flex items-center">
                <Beaker className="w-6 h-6 mr-2" />
                Phòng Thí Nghiệm
              </h1>
              <div className="w-24"></div>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-12">
          <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-2xl p-8">
            <div className="text-center mb-8">
              <div className="text-6xl mb-4">🧪</div>
              <h2 className="text-3xl font-bold text-gray-800 mb-4">Cách chơi</h2>
            </div>

            <div className="space-y-4 mb-8">
              <div className="flex items-start gap-3 p-4 bg-purple-50 rounded-lg">
                <div className="text-2xl">🎯</div>
                <div>
                  <h3 className="font-bold text-gray-800 mb-1">Mục tiêu</h3>
                  <p className="text-gray-600">Hoàn thành 10 thí nghiệm hóa học bằng cách trộn đúng hóa chất</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 bg-blue-50 rounded-lg">
                <div className="text-2xl">🧪</div>
                <div>
                  <h3 className="font-bold text-gray-800 mb-1">Cách thực hiện</h3>
                  <p className="text-gray-600">Chọn hóa chất từ tủ, sau đó click vào cốc thủy tinh để đổ vào</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 bg-green-50 rounded-lg">
                <div className="text-2xl">⚗️</div>
                <div>
                  <h3 className="font-bold text-gray-800 mb-1">Quan sát</h3>
                  <p className="text-gray-600">Xem hiệu ứng hóa học: kết tủa, khí, đổi màu khi phản ứng thành công</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 bg-yellow-50 rounded-lg">
                <div className="text-2xl">🏆</div>
                <div>
                  <h3 className="font-bold text-gray-800 mb-1">Điểm số</h3>
                  <p className="text-gray-600">Mỗi thí nghiệm thành công được 100 điểm. Tối đa 1000 điểm!</p>
                </div>
              </div>
            </div>

            <button 
              onClick={() => setGameStarted(true)}
              className="w-full py-4 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white rounded-xl font-bold text-lg transition-all transform hover:scale-105 shadow-lg"
            >
              🚀 Bắt đầu thí nghiệm
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Result screen
  if (gameCompleted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-600 via-indigo-600 to-blue-700">
        <div className="bg-white shadow-md">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <Link to="/advanced-challenge" className="flex items-center text-gray-600 hover:text-gray-900">
                <ArrowLeft className="w-5 h-5 mr-2" />
                Quay lại
              </Link>
              <h1 className="text-2xl font-bold text-gray-800 flex items-center">
                <Trophy className="w-6 h-6 mr-2 text-yellow-500" />
                Hoàn thành!
              </h1>
              <div className="w-24"></div>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-12">
          <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-2xl p-8">
            <div className="text-center mb-8">
              <div className="text-6xl mb-4">🏆</div>
              <h2 className="text-3xl font-bold text-gray-800 mb-2">Xuất sắc!</h2>
              <p className="text-gray-600">Bạn đã hoàn thành tất cả 10 thí nghiệm</p>
            </div>

            <div className="space-y-4 mb-8">
              <div className="flex items-center justify-between p-4 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-lg">
                <span className="text-gray-700 font-semibold">Tổng điểm:</span>
                <span className="text-3xl font-bold text-orange-600">{totalScore}</span>
              </div>

              <div className="flex items-center justify-between p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg">
                <span className="text-gray-700 font-semibold">Thí nghiệm hoàn thành:</span>
                <span className="text-2xl font-bold text-green-600">10/10</span>
              </div>
            </div>

            <div className="flex gap-4">
              <button 
                onClick={restartGame}
                className="flex-1 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white rounded-lg font-semibold transition-all"
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
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-indigo-600 to-blue-700">
      {/* Header */}
      <div className="bg-white shadow-md">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <span className="font-bold text-gray-700">Màn {currentLevel}/10</span>
              <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full font-bold">
                {totalScore} điểm
              </span>
            </div>
            <h2 className="text-xl font-bold text-gray-800">{currentLevelData.title}</h2>
            <div className="w-32"></div>
          </div>
          
          {/* Progress bar */}
          <div className="mt-3 h-2 bg-gray-200 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-purple-500 to-indigo-500 transition-all duration-500"
              style={{ width: `${progressPercent}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Result Message */}
      {resultMessage && (
        <div className="container mx-auto px-4 mt-4">
          <div className={`max-w-2xl mx-auto p-4 rounded-lg font-semibold text-center ${
            showSuccess ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
          }`}>
            {resultMessage}
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Chemical Shelf - Left */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-lg p-4">
              <h3 className="font-bold text-lg mb-3 flex items-center gap-2">
                <span>📦</span>
                Tủ Hóa Chất
              </h3>
              <div className="space-y-2">
                {chemicals.map(chemical => (
                  <div
                    key={chemical.id}
                    className={`lab-chemical-bottle ${selectedChemical?.id === chemical.id ? 'selected' : ''}`}
                    onClick={() => handleChemicalClick(chemical)}
                    style={{ borderColor: chemical.color }}
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-2xl">{chemical.icon}</span>
                      <div className="flex-1">
                        <div className="font-bold text-sm">{chemical.name}</div>
                        <div className="text-xs text-gray-600">{chemical.fullName}</div>
                      </div>
                    </div>
                    <div className="lab-bottle-liquid" style={{ background: chemical.color }}></div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Beaker Area - Center */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="text-center mb-4">
                <p className="text-gray-700">{currentLevelData.description}</p>
              </div>

              <div className="lab-beaker-container">
                {/* Pouring Flask */}
                {pouringChemical && (
                  <div className="lab-pouring-flask">
                    <div className="lab-flask-body" style={{ borderColor: pouringChemical.color }}>
                      <div className="lab-flask-liquid" style={{ background: pouringChemical.color }}></div>
                      <div className="lab-flask-neck">
                        <div className="lab-liquid-stream" style={{ background: pouringChemical.color }}></div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Beaker */}
                <div className={`lab-beaker ${effect ? `lab-effect-${effect}` : ''}`}
                     onClick={handleBeakerClick}>
                  <div className="lab-beaker-glass">
                    {beakerChemicals.length > 0 && (
                      <div className="lab-beaker-liquid"
                           style={{ height: `${liquidHeight}%`, background: getBeakerColor() }}>
                        {effect === 'gas' && (
                          <div className="lab-bubbles">
                            {[...Array(5)].map((_, i) => <div key={i} className="lab-bubble"></div>)}
                          </div>
                        )}
                        {effect === 'precipitate' && (
                          <div className="lab-precipitate-particles">
                            {[...Array(6)].map((_, i) => <div key={i} className="lab-particle"></div>)}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>

                {beakerChemicals.length > 0 && (
                  <div className="lab-chemical-tags">
                    {beakerChemicals.map((chem, idx) => (
                      <span key={idx} className="lab-chem-tag" style={{ background: chem.color }}>
                        {chem.name}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              <div className="flex gap-3 mt-6">
                <button 
                  className="flex-1 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg font-semibold transition-colors"
                  onClick={clearBeaker}
                >
                  🧹 Làm sạch
                </button>
                {showSuccess && (
                  <button 
                    className="flex-1 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-semibold transition-colors"
                    onClick={nextLevel}
                  >
                    {currentLevel < 10 ? '➡️ Màn tiếp theo' : '🏆 Hoàn thành'}
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Hint Panel - Right */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-lg p-4">
              <h3 className="font-bold text-lg mb-3 flex items-center gap-2">
                <Lightbulb className="w-5 h-5 text-yellow-500" />
                Gợi ý
              </h3>
              <p className="text-sm text-gray-700 mb-4">{currentLevelData.hint}</p>

              <div className="mb-4">
                <h4 className="font-semibold text-sm mb-2 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-purple-500" />
                  Mục tiêu:
                </h4>
                <div className="flex items-center gap-2 p-3 bg-gradient-to-r from-purple-50 to-indigo-50 rounded-lg">
                  <div className="w-6 h-6 rounded-full border-2 border-gray-300" style={{ background: currentLevelData.targetColor }}></div>
                  <span className="text-sm font-semibold">{currentLevelData.targetName}</span>
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-sm mb-2 flex items-center gap-2">
                  <Trophy className="w-4 h-4 text-yellow-500" />
                  Tiến độ:
                </h4>
                <div className="space-y-2">
                  <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-yellow-400 to-orange-500 transition-all duration-500"
                      style={{ width: `${progressPercent}%` }}
                    ></div>
                  </div>
                  <p className="text-sm text-gray-600 text-center">{currentLevel} / 10 màn</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PhongThiNghiem;
