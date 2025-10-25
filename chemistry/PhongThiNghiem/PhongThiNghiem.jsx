import React, { useState } from 'react';
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

  // Định nghĩa 10 màn chơi
  const levels = [
    {
      level: 1,
      title: 'Màn 1: Phản ứng trung hòa',
      description: 'Tạo muối ăn (NaCl) bằng cách trung hòa axit và bazơ',
      required: ['hcl', 'naoh'],
      targetName: 'NaCl + H₂O',
      targetColor: '#98FB98',
      hint: 'Trộn HCl với NaOH'
    },
    {
      level: 2,
      title: 'Màn 2: Kết tủa trắng',
      description: 'Tạo kết tủa trắng bạc clorua',
      required: ['agno3', 'hcl'],
      targetName: 'AgCl↓',
      targetColor: '#F5F5F5',
      hint: 'Trộn AgNO₃ với HCl'
    },
    {
      level: 3,
      title: 'Màn 3: Kết tủa xanh',
      description: 'Tạo kết tủa xanh đồng hidroxit',
      required: ['cuso4', 'naoh'],
      targetName: 'Cu(OH)₂↓',
      targetColor: '#4682B4',
      hint: 'Trộn CuSO₄ với NaOH'
    },
    {
      level: 4,
      title: 'Màn 4: Phản ứng tạo khí',
      description: 'Tạo khí hydro từ kim loại và axit',
      required: ['zn', 'hcl'],
      targetName: 'ZnCl₂ + H₂↑',
      targetColor: '#E0F7FA',
      hint: 'Trộn Zn với HCl'
    },
    {
      level: 5,
      title: 'Màn 5: Chất chỉ thị trong bazơ',
      description: 'Tạo dung dịch hồng với phenolphthalein',
      required: ['naoh', 'phenolphthalein'],
      targetName: 'Dung dịch hồng',
      targetColor: '#FF69B4',
      hint: 'Thêm Phenolphthalein vào NaOH'
    },
    {
      level: 6,
      title: 'Màn 6: Phản ứng thế',
      description: 'Sắt đẩy đồng ra khỏi dung dịch',
      required: ['cuso4', 'fe'],
      targetName: 'FeSO₄ + Cu',
      targetColor: '#B0C4DE',
      hint: 'Cho Fe vào CuSO₄'
    },
    {
      level: 7,
      title: 'Màn 7: Muối sunfat',
      description: 'Tạo natri sunfat từ phản ứng trung hòa',
      required: ['h2so4', 'naoh'],
      targetName: 'Na₂SO₄ + H₂O',
      targetColor: '#90EE90',
      hint: 'Trộn H₂SO₄ với NaOH'
    },
    {
      level: 8,
      title: 'Màn 8: Chất chỉ thị trong axit',
      description: 'Methyl Orange chuyển màu đỏ trong axit',
      required: ['hcl', 'methyl-orange'],
      targetName: 'Dung dịch đỏ',
      targetColor: '#FF4500',
      hint: 'Thêm Methyl Orange vào HCl'
    },
    {
      level: 9,
      title: 'Màn 9: Khí từ sắt',
      description: 'Tạo khí hydro từ sắt và axit',
      required: ['h2so4', 'fe'],
      targetName: 'FeSO₄ + H₂↑',
      targetColor: '#D3D3D3',
      hint: 'Trộn Fe với H₂SO₄'
    },
    {
      level: 10,
      title: 'Màn 10: Thử thách cuối',
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
    }
  };

  const restartGame = () => {
    setCurrentLevel(1);
    clearBeaker();
    setTotalScore(0);
    setResultMessage('');
    setShowSuccess(false);
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

  return (
    <div className="phong-thi-nghiem-container">
      {/* Header */}
      <div className="lab-header">
        <div className="level-info">
          <h2>{currentLevelData.title}</h2>
          <p>{currentLevelData.description}</p>
        </div>
        <div className="score-display">
          <div className="level-badge">Màn {currentLevel}/10</div>
          <div className="total-score">
            <span>Điểm: </span>
            <strong>{totalScore}</strong>
          </div>
        </div>
      </div>

      {/* Result Message */}
      {resultMessage && (
        <div className={`result-message ${showSuccess ? 'success' : 'warning'}`}>
          {resultMessage}
        </div>
      )}

      <div className="game-workspace">
        {/* Chemical Shelf */}
        <div className="chemical-shelf">
          <h3>📦 Tủ Hóa Chất</h3>
          <div className="chemicals-grid">
            {chemicals.map(chemical => (
              <div
                key={chemical.id}
                className={`chemical-bottle ${selectedChemical?.id === chemical.id ? 'selected' : ''}`}
                onClick={() => handleChemicalClick(chemical)}
                style={{ borderColor: chemical.color }}
              >
                <div className="bottle-icon">{chemical.icon}</div>
                <div className="bottle-liquid" style={{ background: chemical.color }}></div>
                <div className="bottle-label">
                  <div className="chemical-formula">{chemical.name}</div>
                  <div className="chemical-name">{chemical.fullName}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Beaker Area */}
        <div className="beaker-area">
          <div className="beaker-container">
            {/* Pouring Flask */}
            {pouringChemical && (
              <div className="pouring-flask">
                <div className="flask-body" style={{ borderColor: pouringChemical.color }}>
                  <div className="flask-liquid" style={{ background: pouringChemical.color }}></div>
                  <div className="flask-neck">
                    <div className="liquid-stream" style={{ background: pouringChemical.color }}></div>
                  </div>
                </div>
                <div className="flask-label">{pouringChemical.name}</div>
              </div>
            )}

            {/* Beaker */}
            <div className={`beaker ${effect ? `effect-${effect}` : ''} ${isPouring ? 'receiving' : ''}`}
                 onClick={handleBeakerClick}>
              <div className="beaker-glass">
                <div className="measurement-line" style={{ bottom: '70%' }}>
                  <span>200 mL</span>
                </div>
                <div className="measurement-line" style={{ bottom: '40%' }}>
                  <span>100 mL</span>
                </div>
                <div className="measurement-line" style={{ bottom: '10%' }}>
                  <span>50 mL</span>
                </div>

                {beakerChemicals.length > 0 && (
                  <div className="beaker-liquid"
                       style={{ height: `${liquidHeight}%`, background: getBeakerColor() }}>
                    {effect === 'gas' && (
                      <div className="bubbles">
                        {[...Array(5)].map((_, i) => <div key={i} className="bubble"></div>)}
                      </div>
                    )}
                    {effect === 'precipitate' && (
                      <div className="precipitate-particles">
                        {[...Array(6)].map((_, i) => <div key={i} className="particle"></div>)}
                      </div>
                    )}
                  </div>
                )}
              </div>
              <div className="beaker-base"></div>
            </div>

            <div className="chemical-tags">
              {beakerChemicals.map((chem, idx) => (
                <span key={idx} className="chem-tag" style={{ background: chem.color }}>
                  {chem.name}
                </span>
              ))}
            </div>
          </div>

          <div className="controls">
            <button className="btn-clear" onClick={clearBeaker}>🧹 Làm sạch</button>
            {showSuccess && currentLevel < 10 && (
              <button className="btn-next" onClick={nextLevel}>➡️ Màn tiếp theo</button>
            )}
            {currentLevel === 10 && showSuccess && (
              <button className="btn-restart" onClick={restartGame}>🔄 Chơi lại</button>
            )}
          </div>
        </div>

        {/* Hint Panel */}
        <div className="hint-panel">
          <h3>💡 Gợi ý</h3>
          <p className="hint-text">{currentLevelData.hint}</p>
          <div className="target-info">
            <h4>Mục tiêu:</h4>
            <div className="target-product">
              <div className="target-color" style={{ background: currentLevelData.targetColor }}></div>
              <span>{currentLevelData.targetName}</span>
            </div>
          </div>
          <div className="progress-info">
            <h4>Tiến độ:</h4>
            <div className="progress-bar">
              <div className="progress-fill" style={{ width: `${(currentLevel / 10) * 100}%` }}></div>
            </div>
            <p>{currentLevel} / 10 màn</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PhongThiNghiem;
