import React, { useState, useCallback, useEffect } from 'react';
import '../common-theme.css';
import './TroChoiCanBang.css';
import periodic from '../periodic.json';

// Calculate molar mass of a chemical formula
const calculateMolarMass = (formula) => {
  const parsed = parseFormula(formula);
  let totalMass = 0;
  for (const element in parsed) {
    totalMass += (periodic[element]?.mass || 0) * parsed[element];
  }
  return Math.round(totalMass * 100) / 100; // Round to 2 decimal places
};

const reactions = [
  { left: ['H2', 'O2'], right: ['H2O'], coeffs: [2, 1, 2], title: 'Đốt cháy hidro' },
  { left: ['N2', 'H2'], right: ['NH3'], coeffs: [1, 3, 2], title: 'Tổng hợp amoniac' },
  { left: ['Na', 'Cl2'], right: ['NaCl'], coeffs: [2, 1, 2], title: 'Tạo muối ăn' },
  { left: ['Fe', 'O2'], right: ['Fe2O3'], coeffs: [4, 3, 2], title: 'Tạo gỉ sắt' },
  { left: ['CaCO3'], right: ['CaO', 'CO2'], coeffs: [1, 1, 1], title: 'Nhiệt phân đá vôi' },
  { left: ['HCl', 'NaOH'], right: ['NaCl', 'H2O'], coeffs: [1, 1, 1, 1], title: 'Trung hòa axit–bazơ' },
  { left: ['CH4', 'O2'], right: ['CO2', 'H2O'], coeffs: [1, 2, 1, 2], title: 'Cháy metan' },
  { left: ['C2H6', 'O2'], right: ['CO2', 'H2O'], coeffs: [2, 7, 4, 6], title: 'Cháy etan' },
];

const toPretty = (f) => f.replace(/(\d+)/g, '<sub>$1</sub>');

const parseFormula = (formula) => {
  const tokens = formula.match(/[A-Z][a-z]?\d*/g) || [];
  const counts = {};
  for (const t of tokens) {
    const m = t.match(/^([A-Z][a-z]?)(\d*)$/);
    if (!m) continue;
    const el = m[1];
    const n = m[2] ? parseInt(m[2], 10) : 1;
    counts[el] = (counts[el] || 0) + n;
  }
  return counts;
};

const multiplyCounts = (counts, k) => {
  const out = {};
  for (const el in counts) out[el] = (out[el] || 0) + counts[el] * k;
  return out;
};

const addCounts = (a, b, sign = 1) => {
  const out = { ...a };
  for (const el in b) {
    out[el] = (out[el] || 0) + sign * b[el];
    if (out[el] === 0) delete out[el];
  }
  return out;
};

const isBalanced = (r, coeffs) => {
  let idx = 0;
  let leftCounts = {};
  let rightCounts = {};
  
  r.left.forEach(f => {
    const c = parseInt(coeffs[idx++] || '0', 10);
    leftCounts = addCounts(leftCounts, multiplyCounts(parseFormula(f), c), +1);
  });
  
  r.right.forEach(f => {
    const c = parseInt(coeffs[idx++] || '0', 10);
    rightCounts = addCounts(rightCounts, multiplyCounts(parseFormula(f), c), +1);
  });
  
  const keys = new Set([...Object.keys(leftCounts), ...Object.keys(rightCounts)]);
  for (const el of keys) {
    if ((leftCounts[el] || 0) !== (rightCounts[el] || 0)) return false;
  }
  return true;
};

const CoefficientControl = ({ value, onDecrement, onIncrement }) => (
  <div className="coef-control">
    <button className="small-btn" onClick={onDecrement} aria-label="decrement">−</button>
    <div className="coef-display">{value}</div>
    <button className="small-btn" onClick={onIncrement} aria-label="increment">+</button>
  </div>
);

const Species = ({ formula, children }) => (
  <div className="species">
    <div className="molar-mass">{calculateMolarMass(formula)} g/mol</div>
    {children}
  </div>
);

const TroChoiCanBang = () => {
  const [level, setLevel] = useState(0);
  const [inputs, setInputs] = useState([]);
  const [status, setStatus] = useState('');
  const [statusKind, setStatusKind] = useState('');

  const currentReaction = reactions[level];

  const updateStatus = (msg, kind = '') => {
    setStatus(msg);
    setStatusKind(kind);
  };

  const initializeInputs = useCallback(() => {
    const totalSpecies = currentReaction.left.length + currentReaction.right.length;
    const newInputs = Array(totalSpecies).fill(1);
    setInputs(newInputs);
  }, [currentReaction]);

  useEffect(() => {
    initializeInputs();
    updateStatus('Điền hệ số để cân bằng phương trình.');
  }, [level, initializeInputs]);

  const handleSet = (index, value) => {
    const newInputs = [...inputs];
    newInputs[index] = Math.max(0, Math.floor(Number(value) || 0));
    setInputs(newInputs);
  };

  const handleInc = (index) => handleSet(index, (inputs[index] || 0) + 1);
  const handleDec = (index) => handleSet(index, Math.max(0, (inputs[index] || 0) - 1));

  const validate = () => {
    if (inputs.some(v => isNaN(Number(v)) || v < 0)) {
      updateStatus('Hệ số phải là số nguyên không âm.', 'error');
      return;
    }

    if (isBalanced(currentReaction, inputs.map(String))) {
      updateStatus('Chính xác! ✅', 'success');
    } else {
      updateStatus('Chưa cân bằng đúng. Thử lại nhé.', 'error');
    }
  };

  const reset = () => {
    initializeInputs();
    updateStatus('Đã đặt lại hệ số về 1.');
  };

  const goToPrevLevel = () => {
    if (level > 0) {
      setLevel(level - 1);
    }
  };

  const goToNextLevel = () => {
    if (level < reactions.length - 1) {
      setLevel(level + 1);
    }
  };

  const renderEquation = () => {
    const elements = [];
    let inputIndex = 0;

    // Render left side
    currentReaction.left.forEach((formula, i) => {
      const idx = inputIndex;
      elements.push(
        <Species key={`left-${i}`} formula={formula}>
          <CoefficientControl
            value={inputs[idx] || 0}
            onDecrement={() => handleDec(idx)}
            onIncrement={() => handleInc(idx)}
          />
          <div 
            className="tile"
            dangerouslySetInnerHTML={{ __html: toPretty(formula) }}
          />
        </Species>
      );
      inputIndex++;

      if (i < currentReaction.left.length - 1) {
        elements.push(
          <div key={`plus-${i}`} className="operator">+</div>
        );
      }
    });

    // Arrow
    elements.push(
      <div key="arrow" className="operator">→</div>
    );

    // Render right side
    currentReaction.right.forEach((formula, i) => {
      const idx = inputIndex;
      elements.push(
        <Species key={`right-${i}`} formula={formula}>
          <CoefficientControl
            value={inputs[idx] || 0}
            onDecrement={() => handleDec(idx)}
            onIncrement={() => handleInc(idx)}
          />
          <div 
            className="tile"
            dangerouslySetInnerHTML={{ __html: toPretty(formula) }}
          />
        </Species>
      );
      inputIndex++;

      if (i < currentReaction.right.length - 1) {
        elements.push(
          <div key={`plus-right-${i}`} className="operator">+</div>
        );
      }
    });

    return elements;
  };

  // compute imbalance value for visual tilt based on molar mass difference
  const computeImbalance = () => {
    // sum molar mass weighted by coefficients for each side
    let leftMass = 0;
    let rightMass = 0;
    let idx = 0;
    
    currentReaction.left.forEach(formula => {
      const coef = inputs[idx++] || 0;
      leftMass += coef * calculateMolarMass(formula);
    });
    
    currentReaction.right.forEach(formula => {
      const coef = inputs[idx++] || 0;
      rightMass += coef * calculateMolarMass(formula);
    });
    
    const diff = leftMass - rightMass;
    // Convert mass difference to degrees, clamp to reasonable range
    const deg = diff / 2;
    return Math.max(-25, Math.min(25, deg));
  };

  return (
    <div className="game-container">
      <header className="game-header">
        <h1>⚖️ Cân bằng phương trình hóa học</h1>
        <p className="subtitle">
          Điền hệ số nguyên nhỏ nhất vào các ô để cân bằng phương trình.
        </p>
      </header>

      <main className="game-main">
        <div className="game-board">
          <div className="level-bar">
            <div className="level-controls">
              <button 
                className="btn" 
                disabled={level === 0}
                onClick={goToPrevLevel}
              >
                ← Trước
              </button>
            </div>
            <h2>{`Cấp độ ${level + 1}/8 – ${currentReaction.title}`}</h2>
            <div className="level-controls">
              <button 
                className="btn" 
                disabled={level === reactions.length - 1}
                onClick={goToNextLevel}
              >
                Tiếp →
              </button>
            </div>
          </div>

          <div className="equation">
            <div className="scale-row">
              <div className="scale">
                <div className="scale-beam" style={{ transform: `translateX(-50%) rotate(${computeImbalance()}deg)` }}>
                  <div className="scale-pan left" />
                  <div className="scale-pan right" />
                </div>
                <div className="scale-fulcrum" />
              </div>
            </div>

            {renderEquation()}
          </div>

          <div className="controls">
            <button className="btn primary" onClick={validate}>
              Kiểm tra
            </button>
            <button className="btn" onClick={reset}>
              Đặt lại
            </button>
          </div>

          <p className={`status ${statusKind}`}>{status}</p>
        </div>
      </main>
    </div>
  );
};

export default TroChoiCanBang;