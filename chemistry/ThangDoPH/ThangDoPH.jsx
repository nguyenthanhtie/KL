import React, { useState } from 'react';
import './ThangDoPH.css';

const ThangDoPH = () => {
  const [selectedSolution, setSelectedSolution] = useState('water');
  const [volumeInBeaker, setVolumeInBeaker] = useState(0);
  const [isPouring, setIsPouring] = useState(false);

  const solutions = {
    water: { name: 'Water', ph: 7, color: '#ADD8E6' },
    vinegar: { name: 'Giấm ăn', ph: 2.4, color: '#FFE4B5' },
    lemonJuice: { name: 'Nước chanh', ph: 2.2, color: '#FFFACD' },
    sodaWater: { name: 'Nước soda', ph: 3.5, color: '#F0F8FF' },
    coffee: { name: 'Cà phê', ph: 5, color: '#8B4513' },
    milk: { name: 'Sữa', ph: 6.5, color: '#FFFEF0' },
    soap: { name: 'Nước xà phòng', ph: 9, color: '#E6F3FF' },
    ammonia: { name: 'Amoniac', ph: 11.5, color: '#B0E0E6' },
    bleach: { name: 'Nước tẩy', ph: 12.5, color: '#F5F5DC' },
    drainCleaner: { name: 'Dung dịch thông cống', ph: 14, color: '#FFE4E1' },
    batteryAcid: { name: 'Axit ắc quy', ph: 1, color: '#FFCC99' },
    handSoap: { name: 'Xà phòng rửa tay', ph: 10, color: '#FFCCFF' }
  };

  const currentSolution = solutions[selectedSolution];

  const handlePour = () => {
    if (volumeInBeaker < 1) {
      setIsPouring(true);
      const interval = setInterval(() => {
        setVolumeInBeaker(prev => {
          if (prev >= 1) {
            clearInterval(interval);
            setIsPouring(false);
            return 1;
          }
          return prev + 0.05;
        });
      }, 100);
    }
  };

  const handleReset = () => {
    setVolumeInBeaker(0);
    setIsPouring(false);
  };

  const getpHColor = (ph) => {
    if (ph <= 2) return '#ff0000';
    if (ph <= 4) return '#ff6666';
    if (ph <= 6) return '#ffcccc';
    if (ph === 7) return '#ccffcc';
    if (ph <= 9) return '#99ccff';
    if (ph <= 11) return '#6699ff';
    return '#0000ff';
  };

  const getpHLabel = (ph) => {
    if (ph < 7) return 'Acidic';
    if (ph === 7) return 'Basic';
    return 'Basic';
  };

  const pHMeterHeight = ((14 - currentSolution.ph) / 14) * 100;

  return (
    <div className="thang-do-ph-container">
      <div className="control-panel">
        <div className="solution-selector">
          <label htmlFor="solution-select">Chọn dung dịch:</label>
          <select
            id="solution-select"
            value={selectedSolution}
            onChange={(e) => {
              setSelectedSolution(e.target.value);
              handleReset();
            }}
          >
            {Object.entries(solutions).map(([key, value]) => (
              <option key={key} value={key}>
                {value.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="experiment-area">
        {/* pH Scale */}
        <div className="ph-scale">
          <div className="ph-label">14</div>
          <div className="ph-bar basic-zone">
            <span className="zone-label">Basic</span>
          </div>
          <div className="ph-label">7</div>
          <div className="ph-bar neutral-zone"></div>
          <div className="ph-label">0</div>
          <div className="ph-bar acidic-zone">
            <span className="zone-label">Acidic</span>
          </div>

          {/* pH Indicator */}
          <div 
            className="ph-indicator" 
            style={{ 
              bottom: `${(currentSolution.ph / 14) * 100}%`,
              backgroundColor: getpHColor(currentSolution.ph)
            }}
          >
            <div className="ph-pointer"></div>
          </div>
        </div>

        {/* pH Meter */}
        <div className="ph-meter">
          <div className="ph-display">
            <span className="ph-label-text">pH</span>
            <div className="ph-value">{currentSolution.ph.toFixed(1)}</div>
          </div>
          <div className="ph-meter-icon">
            <div className="probe-container">
              <div 
                className="probe" 
                style={{ 
                  top: volumeInBeaker > 0 ? '60%' : '20%',
                  transition: 'top 0.5s ease'
                }}
              >
                <div className="probe-tip"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Faucet and Beaker */}
        <div className="beaker-area">
          <div className="faucet-container">
            <div className="faucet">
              <div className="faucet-pipe"></div>
              <div className="faucet-handle" onClick={handlePour}>
                <div className={`handle-knob ${isPouring ? 'turning' : ''}`}></div>
              </div>
            </div>
            {isPouring && (
              <div 
                className="liquid-stream" 
                style={{ backgroundColor: currentSolution.color }}
              ></div>
            )}
          </div>

          <div className="beaker">
            <div className="beaker-glass">
              {/* Measurement lines */}
              <div className="measurement-line" style={{ bottom: '80%' }}>
                <span>1 L</span>
              </div>
              <div className="measurement-line" style={{ bottom: '40%' }}>
                <span>½ L</span>
              </div>
              <div className="measurement-line" style={{ bottom: '0%' }}>
                <span>0.00 L</span>
              </div>

              {/* Liquid in beaker */}
              {volumeInBeaker > 0 && (
                <div 
                  className="liquid-in-beaker"
                  style={{ 
                    height: `${volumeInBeaker * 80}%`,
                    backgroundColor: currentSolution.color
                  }}
                ></div>
              )}
            </div>
            <div className="beaker-base"></div>
          </div>

          <div className="volume-display">
            {volumeInBeaker.toFixed(2)} L
          </div>
        </div>

        {/* Reset Button */}
        <div className="reset-button-container">
          <button className="reset-button" onClick={handleReset}>
            🔄
          </button>
        </div>
      </div>

      <div className="info-panel">
        <h3>Thông tin</h3>
        <div className="info-item">
          <strong>Dung dịch:</strong> {currentSolution.name}
        </div>
        <div className="info-item">
          <strong>pH:</strong> {currentSolution.ph}
        </div>
        <div className="info-item">
          <strong>Tính chất:</strong> {getpHLabel(currentSolution.ph)}
        </div>
        <div className="info-description">
          <p>
            {currentSolution.ph < 7 && '🔴 Dung dịch có tính axit. Giá trị pH càng thấp, tính axit càng mạnh.'}
            {currentSolution.ph === 7 && '🟢 Dung dịch trung tính.'}
            {currentSolution.ph > 7 && '🔵 Dung dịch có tính bazơ. Giá trị pH càng cao, tính bazơ càng mạnh.'}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ThangDoPH;
