import React, { useState, useCallback, useEffect, useRef } from 'react';
import '../common-theme.css';
import './TroChoiLatThe.css';
import periodic from '../periodic.json';

const valencyMap = {
  H: 1,
  O: 2,
  N: 3,
  Cl: 1,
  Na: 1,
  K: 1,
  Ca: 2,
  Mg: 2,
  Al: 3,
  Fe: 2,
  Cu: 2,
  Zn: 2,
  C: 4,
  S: 2,
  P: 3
};

const parseFormula = (formula) => {
  let i = 0;
  const len = formula.length;
  
  const parseNumber = () => {
    let num = '';
    while (i < len && /\d/.test(formula[i])) { num += formula[i++]; }
    return num ? parseInt(num, 10) : 1;
  };
  
  const mergeCounts = (target, source, mult = 1) => {
    for (const k in source) { target[k] = (target[k] || 0) + source[k] * mult; }
    return target;
  };
  
  const parseGroup = () => {
    const counts = {};
    while (i < len) {
      const ch = formula[i];
      if (ch === '(') {
        i++;
        const inner = parseGroup();
        if (formula[i] !== ')') throw new Error('Unmatched ( in formula');
        i++;
        const mult = parseNumber();
        mergeCounts(counts, inner, mult);
      } else if (ch === ')') {
        break;
      } else if (/[A-Z]/.test(ch)) {
        let sym = formula[i++];
        if (i < len && /[a-z]/.test(formula[i])) sym += formula[i++];
        const mult = parseNumber();
        counts[sym] = (counts[sym] || 0) + mult;
      } else if (ch === '·' || ch === '.') {
        i++;
      } else if (/\s/.test(ch)) {
        i++;
      } else {
        i++;
      }
    }
    return counts;
  };
  
  try {
    i = 0;
    return parseGroup();
  } catch {
    // Fallback parser
    const parts = formula.match(/[A-Z][a-z]?\d*/g) || [];
    const atoms = {};
    for (const p of parts) {
      const m = p.match(/^([A-Z][a-z]?)(\d*)$/);
      if (!m) continue;
      const el = m[1];
      const n = m[2] ? parseInt(m[2], 10) : 1;
      atoms[el] = (atoms[el] || 0) + n;
    }
    return atoms;
  }
};

const calculateMolarMass = (formula) => {
  const atoms = parseFormula(formula);
  let sum = 0;
  for (const el in atoms) {
    sum += (periodic[el]?.mass || 0) * atoms[el];
  }
  return Math.round(sum * 1000) / 1000;
};

const toPretty = (f) => f.replace(/(\d+)/g, '<sub>$1</sub>');

// Increase pair counts per level (difficulty increases). Positions are randomized via shuffle when building the deck.
const levelsMass = [
  ['H2', 'O2'], // 2 pairs
  ['H2O', 'CO2', 'NH3'], // 3 pairs
  ['CH4', 'C2H6', 'H2O', 'NO2'], // 4 pairs
  ['Fe2O3', 'CaCO3', 'H2SO4', 'NaOH'], // 4 pairs
  ['C6H12O6', 'C2H5OH', 'HNO3', 'KCl', 'MgO'], // 5 pairs
  ['Al2O3', 'ZnCl2', 'Na2SO4', 'NaHCO3', 'Ca(OH)2', 'CuSO4'] // 6 pairs
];

const levelsValency = [
  ['H', 'O'], // 2 pairs
  ['H', 'O', 'N'], // 3 pairs
  ['Na', 'K', 'Ca', 'Mg'], // 4 pairs
  ['Al', 'Fe', 'Cu', 'Zn'], // 4 pairs
  ['C', 'S', 'P', 'O', 'Cl'], // 5 pairs
  ['H', 'Cl', 'Na', 'O', 'K', 'Ca'] // 6 pairs
];

const shuffle = (array) => {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
};

const Card = ({ card, isFlipped, isMatched, onClick, mode }) => {
  const frontEmoji = mode === 'mass' ? '🔬' : '⚛️';
  return (
    <div 
      className={`card ${(isFlipped || isMatched) ? 'flipped' : ''} ${isMatched ? 'matched' : ''}`}
      onClick={onClick}
      role="button"
      aria-pressed={isFlipped}
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick();
        }
      }}
    >
      <div className="card-inner">
        <div className="card-face front"><span className="emoji">{frontEmoji}</span></div>
        <div className="card-face back" dangerouslySetInnerHTML={{ __html: card.label }} />
      </div>
    </div>
  );
};

const TroChoiLatThe = () => {
  const [level, setLevel] = useState(0);
  const [mode, setMode] = useState('mass'); // 'mass' or 'valency'
  const [cards, setCards] = useState([]);
  const gridRef = useRef(null);
  const [gridStyle, setGridStyle] = useState({});
  const advanceScheduledRef = useRef(false);
  const [flippedCards, setFlippedCards] = useState([]);
  const [matchedPairs, setMatchedPairs] = useState(new Set());
  const [moves, setMoves] = useState(0);
  const [isLocked, setIsLocked] = useState(false);
  const [status, setStatus] = useState('');
  const [statusKind, setStatusKind] = useState('');

  const updateStatus = (msg, kind = '') => {
    setStatus(msg);
    setStatusKind(kind);
  };

  const buildDeck = useCallback((items) => {
    const deck = [];
    if (mode === 'mass') {
      for (const formula of items) {
        const mass = calculateMolarMass(formula).toFixed(3);
        deck.push({ type: 'F', key: formula, label: toPretty(formula) });
        deck.push({ type: 'M', key: formula, label: `${mass} g/mol` });
      }
    } else {
      for (const element of items) {
        const valency = valencyMap[element];
        deck.push({ type: 'E', key: element, label: element });
        deck.push({ type: 'V', key: element, label: String(valency) });
      }
    }
    return shuffle(deck);
  }, [mode]);

  const initializeLevel = useCallback(() => {
    const pool = mode === 'mass' ? levelsMass : levelsValency;
    const items = pool[level];
    const deck = buildDeck(items);
    
    setCards(deck.map((card, index) => ({ ...card, id: index })));
    setFlippedCards([]);
    setMatchedPairs(new Set());
    setMoves(0);
    setIsLocked(false);
    advanceScheduledRef.current = false;
    updateStatus('Lật 2 thẻ để ghép công thức với khối lượng mol tương ứng.');
  }, [level, mode, buildDeck]);

  useEffect(() => {
    initializeLevel();
  }, [initializeLevel]);

  // compute responsive grid: choose columns (2..6) and card size; level 0 => 100% size, last level => 50% size
  const computeGridLayout = () => {
    const grid = gridRef.current;
    if (!grid) return;
    const total = cards.length || 0;
    if (total === 0) return;
    const gap = 14; // grid gap in px (matches CSS)
    const aspect = 16 / 11; // width/height
    const minCardH = 36; // minimum acceptable card height

    const gridRect = grid.getBoundingClientRect();
    const containerWidth = Math.max(200, gridRect.width);
    const containerTop = gridRect.top;
    const availableHeight = Math.max(200, window.innerHeight - containerTop - 120); // reserve room for header/footer

    const pairs = Math.max(1, Math.floor(total / 2));
    // enforce columns equal to number of pairs (capped at 6) so rows are balanced: pairs=5 -> cols=5 -> rows=2 (5:5)
    const cols = Math.min(Math.max(2, pairs), 6);
    const rows = Math.ceil(total / cols);

    // compute base card size to fit available width
    const wPerCard = Math.floor((containerWidth - gap * (cols - 1)) / cols);
    let cardW = Math.max(40, Math.min(wPerCard, 240));
    let cardH = Math.floor(cardW / aspect);

    // if vertical space insufficient, scale base size down to fit height
    const maxHByHeight = Math.floor((availableHeight - gap * (rows - 1)) / rows);
    if (cardH > maxHByHeight) {
      cardH = Math.max(minCardH, maxHByHeight);
      cardW = Math.floor(cardH * aspect);
    }

    // level-based scale: level 0 => 1.0, last level => 0.5
    const totalLevels = (mode === 'mass' ? levelsMass.length : levelsValency.length) || 1;
    const levelIndex = Math.max(0, Math.min(level, totalLevels - 1));
    const desiredScale = totalLevels <= 1 ? 1 : 1 - (levelIndex / (totalLevels - 1)) * 0.5;

    // apply scale to both width and height
    let scaledW = Math.max(36, Math.floor(cardW * desiredScale));
    let scaledH = Math.max(36, Math.floor(cardH * desiredScale));

    // apply global multiplier (increase sizes by 50%)
    const globalMultiplier = 1.5;
    scaledW = Math.max(36, Math.floor(scaledW * globalMultiplier));
    scaledH = Math.max(36, Math.floor(scaledH * globalMultiplier));

    // re-check horizontal fit and reduce proportionally if needed
    let totalWidthNeeded = scaledW * cols + gap * (cols - 1);
    if (totalWidthNeeded > containerWidth) {
      const fitW = Math.floor((containerWidth - gap * (cols - 1)) / cols);
      const fitScale = Math.max(0.2, fitW / cardW);
      scaledW = Math.max(36, fitW);
      scaledH = Math.max(36, Math.floor(cardH * fitScale * globalMultiplier));
      totalWidthNeeded = scaledW * cols + gap * (cols - 1);
    }

    setGridStyle({ gridTemplateColumns: `repeat(${cols}, ${scaledW}px)`, gap: `${gap}px`, justifyContent: 'center', ['--card-w']: `${scaledW}px`, ['--card-h']: `${scaledH}px` });
  };

  useEffect(() => {
    computeGridLayout();
    const onResize = () => computeGridLayout();
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cards]);

  const handleCardClick = (cardIndex) => {
    if (isLocked || flippedCards.includes(cardIndex) || matchedPairs.has(cards[cardIndex].key)) {
      return;
    }

    const newFlippedCards = [...flippedCards, cardIndex];
    setFlippedCards(newFlippedCards);

    if (newFlippedCards.length === 2) {
      setIsLocked(true);
      setMoves(prev => prev + 1);

      const [firstIndex, secondIndex] = newFlippedCards;
      const firstCard = cards[firstIndex];
      const secondCard = cards[secondIndex];

      const isMatch = firstCard.key === secondCard.key && firstCard.type !== secondCard.type;

      if (isMatch) {
        setTimeout(() => {
          // use functional update so we can inspect the new set immediately
          setMatchedPairs(prev => {
            const next = new Set(prev);
            next.add(firstCard.key);

            const totalPairs = (mode === 'mass' ? levelsMass : levelsValency)[level].length;
            if (next.size === totalPairs && !advanceScheduledRef.current) {
              // show success and advance to next level after a short delay
              advanceScheduledRef.current = true;
              updateStatus('Hoàn thành cấp! ✅', 'success');
              setTimeout(() => {
                const pool = mode === 'mass' ? levelsMass : levelsValency;
                setLevel(l => (l < pool.length - 1 ? l + 1 : l));
                advanceScheduledRef.current = false;
              }, 700);
            }

            return next;
          });

          setFlippedCards([]);
          setIsLocked(false);
        }, 250);
      } else {
        setTimeout(() => {
          setFlippedCards([]);
          setIsLocked(false);
          updateStatus('Chưa đúng, thử lại nhé.');
        }, 650);
      }
    }
  };

  const resetLevel = () => {
    initializeLevel();
  };

  const goToPrevLevel = () => {
    if (level > 0) {
      setLevel(level - 1);
    }
  };

  const goToNextLevel = () => {
    const pool = mode === 'mass' ? levelsMass : levelsValency;
    if (level < pool.length - 1) {
      setLevel(level + 1);
    }
  };

  const switchMode = (newMode) => {
    setMode(newMode);
    setLevel(0);
  };

  const currentPool = mode === 'mass' ? levelsMass : levelsValency;

  return (
    <div className="game-container">
      <header className="game-header">
        <h1>💫 Trò chơi Lật thẻ</h1>
        <p className="subtitle">
          Ghép cặp giữa công thức hóa học và khối lượng mol (g/mol). Lật 2 thẻ để tìm cặp đúng.
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
            <h2>{`Cấp độ ${level + 1}/${currentPool.length}${mode === 'valency' ? ' – Hóa trị' : ''}`}</h2>
            <div className="level-controls">
              <button 
                className="btn" 
                disabled={level === currentPool.length - 1}
                onClick={goToNextLevel}
              >
                Tiếp →
              </button>
            </div>
          </div>

          <div className="game-tabs">
            <button 
              className={`tab-btn ${mode === 'mass' ? 'active' : ''}`}
              onClick={() => switchMode('mass')}
            >
              🔬 Khối lượng mol
            </button>
            <button 
              className={`tab-btn ${mode === 'valency' ? 'active' : ''}`}
              onClick={() => switchMode('valency')}
            >
              ⚛️ Hóa trị
            </button>
          </div>

          <div className="memory-stats">
            <span>Cặp đúng: {matchedPairs.size}</span>
            ·
            <span>Lượt lật: {moves}</span>
            ·
            <button className="btn" onClick={resetLevel}>
              Chơi lại cấp này
            </button>
          </div>

          {/* Arrange grid columns based on number of pairs for a predictable layout */}
          {(() => {
            const pairs = Math.max(1, Math.floor(cards.length / 2));
            return (
              <>
                <div className="progress-row">
                  <div className="progress-text">Cặp đúng: {matchedPairs.size} / {pairs}</div>
                  <div className="progress-bar" aria-hidden>
                    <div className="progress-fill" style={{ width: `${(matchedPairs.size / pairs) * 100}%` }} />
                  </div>
                </div>
                {/* Use computed grid style to enforce balanced rows (e.g., 5:5) */}
                <div className="memory-grid" ref={gridRef} style={gridStyle}>
                  {cards.map((card, index) => (
                    <Card
                      key={card.id}
                      card={card}
                      isFlipped={flippedCards.includes(index)}
                      isMatched={matchedPairs.has(card.key)}
                      onClick={() => handleCardClick(index)}
                      mode={mode}
                    />
                  ))}
                </div>
              </>
            );
          })()}

          <p className={`status ${statusKind}`}>{status}</p>
        </div>
      </main>
    </div>
  );
};

export default TroChoiLatThe;
