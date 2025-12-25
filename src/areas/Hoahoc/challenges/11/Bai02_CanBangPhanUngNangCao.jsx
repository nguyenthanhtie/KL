import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Trophy, Target, Zap, Flame, Atom, Beaker, FlaskConical, Star, Award, ChevronRight, ChevronLeft, HelpCircle, RotateCcw } from 'lucide-react';
import useChallengeProgress from '../../../../hooks/useChallengeProgress';
import ResumeDialog from '../../../../components/ResumeDialog';
import periodicData from '../../../../data/periodic.json';
import './CSS/Bai02_CanBangPhanUngNangCao.css';

// ================== PHẢN ỨNG LỚP 11 - TỪ CƠ BẢN ĐẾN NÂNG CAO ==================
const REACTION_CATEGORIES = [
  {
    id: 'oxidation',
    name: 'Phản ứng Oxi hóa - Khử',
    icon: Zap,
    color: '#ef4444',
    description: 'Cân bằng electron trong phản ứng oxi hóa khử'
  },
  {
    id: 'acid-base',
    name: 'Phản ứng Axit - Bazơ',
    icon: Beaker,
    color: '#8b5cf6',
    description: 'Phản ứng trung hòa và trao đổi ion'
  },
  {
    id: 'organic',
    name: 'Phản ứng Hữu cơ',
    icon: FlaskConical,
    color: '#10b981',
    description: 'Phản ứng đốt cháy và tổng hợp hữu cơ'
  },
  {
    id: 'complex',
    name: 'Phản ứng Phức tạp',
    icon: Atom,
    color: '#f59e0b',
    description: 'Phản ứng nhiều chất và đa giai đoạn'
  }
];

const REACTIONS = [
  // ========== PHẢN ỨNG OXI HÓA - KHỬ ==========
  {
    category: 'oxidation',
    difficulty: 1,
    name: 'Đốt cháy sắt',
    hint: 'Fe mất e, O2 nhận e. Cân bằng Fe và O trước.',
    reactants: [
      { formula: 'Fe', coeff: 4 },
      { formula: 'O2', coeff: 3 }
    ],
    products: [
      { formula: 'Fe2O3', coeff: 2 }
    ]
  },
  {
    category: 'oxidation',
    difficulty: 2,
    name: 'Khử oxit sắt bằng CO',
    hint: 'CO khử Fe2O3 thành Fe, CO bị oxi hóa thành CO2.',
    reactants: [
      { formula: 'Fe2O3', coeff: 1 },
      { formula: 'CO', coeff: 3 }
    ],
    products: [
      { formula: 'Fe', coeff: 2 },
      { formula: 'CO2', coeff: 3 }
    ]
  },
  {
    category: 'oxidation',
    difficulty: 2,
    name: 'Phản ứng nhiệt nhôm',
    hint: 'Al khử Fe2O3, phản ứng tỏa nhiều nhiệt.',
    reactants: [
      { formula: 'Al', coeff: 2 },
      { formula: 'Fe2O3', coeff: 1 }
    ],
    products: [
      { formula: 'Al2O3', coeff: 1 },
      { formula: 'Fe', coeff: 2 }
    ]
  },
  {
    category: 'oxidation',
    difficulty: 3,
    name: 'Oxi hóa Amoniac',
    hint: 'NH3 bị oxi hóa thành NO (có xúc tác Pt).',
    reactants: [
      { formula: 'NH3', coeff: 4 },
      { formula: 'O2', coeff: 5 }
    ],
    products: [
      { formula: 'NO', coeff: 4 },
      { formula: 'H2O', coeff: 6 }
    ]
  },
  {
    category: 'oxidation',
    difficulty: 3,
    name: 'KMnO4 trong môi trường axit',
    hint: 'Mn+7 bị khử về Mn+2, Fe+2 bị oxi hóa lên Fe+3.',
    reactants: [
      { formula: 'KMnO4', coeff: 2 },
      { formula: 'FeSO4', coeff: 10 },
      { formula: 'H2SO4', coeff: 8 }
    ],
    products: [
      { formula: 'K2SO4', coeff: 1 },
      { formula: 'MnSO4', coeff: 2 },
      { formula: 'Fe2(SO4)3', coeff: 5 },
      { formula: 'H2O', coeff: 8 }
    ]
  },

  // ========== PHẢN ỨNG AXIT - BAZƠ ==========
  {
    category: 'acid-base',
    difficulty: 1,
    name: 'Trung hòa HCl và NaOH',
    hint: 'Phản ứng trung hòa cơ bản nhất.',
    reactants: [
      { formula: 'HCl', coeff: 1 },
      { formula: 'NaOH', coeff: 1 }
    ],
    products: [
      { formula: 'NaCl', coeff: 1 },
      { formula: 'H2O', coeff: 1 }
    ]
  },
  {
    category: 'acid-base',
    difficulty: 2,
    name: 'Axit sunfuric và Bari hidroxit',
    hint: 'H2SO4 tạo kết tủa BaSO4 với Ba(OH)2.',
    reactants: [
      { formula: 'H2SO4', coeff: 1 },
      { formula: 'Ba(OH)2', coeff: 1 }
    ],
    products: [
      { formula: 'BaSO4', coeff: 1 },
      { formula: 'H2O', coeff: 2 }
    ]
  },
  {
    category: 'acid-base',
    difficulty: 2,
    name: 'Axit photphoric và NaOH',
    hint: 'H3PO4 là axit 3 nấc, cần 3 mol NaOH.',
    reactants: [
      { formula: 'H3PO4', coeff: 1 },
      { formula: 'NaOH', coeff: 3 }
    ],
    products: [
      { formula: 'Na3PO4', coeff: 1 },
      { formula: 'H2O', coeff: 3 }
    ]
  },
  {
    category: 'acid-base',
    difficulty: 3,
    name: 'Kim loại tác dụng với axit',
    hint: 'Zn đẩy H2 ra khỏi HCl loãng.',
    reactants: [
      { formula: 'Zn', coeff: 1 },
      { formula: 'HCl', coeff: 2 }
    ],
    products: [
      { formula: 'ZnCl2', coeff: 1 },
      { formula: 'H2', coeff: 1 }
    ]
  },
  {
    category: 'acid-base',
    difficulty: 3,
    name: 'CaCO3 và HCl',
    hint: 'Đá vôi tác dụng với axit tạo CO2.',
    reactants: [
      { formula: 'CaCO3', coeff: 1 },
      { formula: 'HCl', coeff: 2 }
    ],
    products: [
      { formula: 'CaCl2', coeff: 1 },
      { formula: 'H2O', coeff: 1 },
      { formula: 'CO2', coeff: 1 }
    ]
  },

  // ========== PHẢN ỨNG HỮU CƠ ==========
  {
    category: 'organic',
    difficulty: 1,
    name: 'Đốt cháy Metan',
    hint: 'CH4 + O2 → CO2 + H2O, cân bằng C, H rồi O.',
    reactants: [
      { formula: 'CH4', coeff: 1 },
      { formula: 'O2', coeff: 2 }
    ],
    products: [
      { formula: 'CO2', coeff: 1 },
      { formula: 'H2O', coeff: 2 }
    ]
  },
  {
    category: 'organic',
    difficulty: 2,
    name: 'Đốt cháy Etanol',
    hint: 'C2H5OH cháy tạo CO2 và H2O.',
    reactants: [
      { formula: 'C2H5OH', coeff: 1 },
      { formula: 'O2', coeff: 3 }
    ],
    products: [
      { formula: 'CO2', coeff: 2 },
      { formula: 'H2O', coeff: 3 }
    ]
  },
  {
    category: 'organic',
    difficulty: 2,
    name: 'Đốt cháy Propan',
    hint: 'C3H8 là ankan, sản phẩm là CO2 và H2O.',
    reactants: [
      { formula: 'C3H8', coeff: 1 },
      { formula: 'O2', coeff: 5 }
    ],
    products: [
      { formula: 'CO2', coeff: 3 },
      { formula: 'H2O', coeff: 4 }
    ]
  },
  {
    category: 'organic',
    difficulty: 3,
    name: 'Đốt cháy Benzen',
    hint: 'C6H6 cần nhiều O2 để cháy hoàn toàn.',
    reactants: [
      { formula: 'C6H6', coeff: 2 },
      { formula: 'O2', coeff: 15 }
    ],
    products: [
      { formula: 'CO2', coeff: 12 },
      { formula: 'H2O', coeff: 6 }
    ]
  },
  {
    category: 'organic',
    difficulty: 3,
    name: 'Đốt cháy Glucose',
    hint: 'C6H12O6 - phương trình hô hấp tế bào.',
    reactants: [
      { formula: 'C6H12O6', coeff: 1 },
      { formula: 'O2', coeff: 6 }
    ],
    products: [
      { formula: 'CO2', coeff: 6 },
      { formula: 'H2O', coeff: 6 }
    ]
  },

  // ========== PHẢN ỨNG PHỨC TẠP ==========
  {
    category: 'complex',
    difficulty: 2,
    name: 'Tổng hợp Amoniac',
    hint: 'N2 + H2 ⇌ NH3 - quy trình Haber.',
    reactants: [
      { formula: 'N2', coeff: 1 },
      { formula: 'H2', coeff: 3 }
    ],
    products: [
      { formula: 'NH3', coeff: 2 }
    ]
  },
  {
    category: 'complex',
    difficulty: 2,
    name: 'Sản xuất axit sunfuric',
    hint: 'SO2 bị oxi hóa thành SO3.',
    reactants: [
      { formula: 'SO2', coeff: 2 },
      { formula: 'O2', coeff: 1 }
    ],
    products: [
      { formula: 'SO3', coeff: 2 }
    ]
  },
  {
    category: 'complex',
    difficulty: 3,
    name: 'Phân hủy KClO3',
    hint: 'KClO3 phân hủy tạo O2 (có MnO2 xúc tác).',
    reactants: [
      { formula: 'KClO3', coeff: 2 }
    ],
    products: [
      { formula: 'KCl', coeff: 2 },
      { formula: 'O2', coeff: 3 }
    ]
  },
  {
    category: 'complex',
    difficulty: 3,
    name: 'Điều chế Clo',
    hint: 'MnO2 oxi hóa HCl đặc tạo Cl2.',
    reactants: [
      { formula: 'MnO2', coeff: 1 },
      { formula: 'HCl', coeff: 4 }
    ],
    products: [
      { formula: 'MnCl2', coeff: 1 },
      { formula: 'Cl2', coeff: 1 },
      { formula: 'H2O', coeff: 2 }
    ]
  },
  {
    category: 'complex',
    difficulty: 4,
    name: 'Cu và HNO3 loãng',
    hint: 'Cu bị oxi hóa bởi HNO3 loãng tạo NO.',
    reactants: [
      { formula: 'Cu', coeff: 3 },
      { formula: 'HNO3', coeff: 8 }
    ],
    products: [
      { formula: 'Cu(NO3)2', coeff: 3 },
      { formula: 'NO', coeff: 2 },
      { formula: 'H2O', coeff: 4 }
    ]
  }
];

// Parse formula để tính nguyên tử
function parseFormula(formula) {
  const parts = [];
  // Xử lý công thức có ngoặc đơn như Ba(OH)2, Fe2(SO4)3, Cu(NO3)2
  let expandedFormula = formula;
  
  // Tìm và mở rộng các nhóm trong ngoặc
  const bracketRegex = /\(([A-Za-z0-9]+)\)(\d+)/g;
  let match;
  while ((match = bracketRegex.exec(formula)) !== null) {
    const [fullMatch, group, multiplier] = match;
    // Mở rộng nhóm trong ngoặc
    const mult = parseInt(multiplier);
    let expandedGroup = '';
    const groupRegex = /([A-Z][a-z]?)(\d*)/g;
    let groupMatch;
    while ((groupMatch = groupRegex.exec(group)) !== null) {
      const [, el, countStr] = groupMatch;
      if (el) {
        const count = parseInt(countStr || '1') * mult;
        expandedGroup += el + (count > 1 ? count : '');
      }
    }
    expandedFormula = expandedFormula.replace(fullMatch, expandedGroup);
  }
  
  const regex = /([A-Z][a-z]?)(\d*)/g;
  while ((match = regex.exec(expandedFormula)) !== null) {
    const [, el, countStr] = match;
    if (el) {
      const existingPart = parts.find(p => p.element === el);
      const count = parseInt(countStr || '1');
      if (existingPart) {
        existingPart.count += count;
      } else {
        parts.push({ element: el, count });
      }
    }
  }
  return parts;
}

function calculateMolarMass(formula) {
  const parsed = parseFormula(formula);
  let total = 0;
  for (let { element, count } of parsed) {
    const data = periodicData[element];
    const mass = data && (data.atomicMass || data.mass || data.massNumber || data.atomic_mass);
    if (mass) total += mass * count;
  }
  return total;
}

function CoefficientControl({ value, onChange, disabled, size = 'normal' }) {
  const sizeClasses = size === 'small' ? 'coeff-control-small' : '';
  return (
    <div className={`coeff-control-advanced ${sizeClasses}`}>
      <button onClick={() => onChange(Math.max(1, value - 1))} disabled={disabled}>−</button>
      <input
        type="number"
        min="1"
        max="20"
        value={value}
        onChange={(e) => onChange(Math.max(1, Math.min(20, parseInt(e.target.value) || 1)))}
        disabled={disabled}
      />
      <button onClick={() => onChange(Math.min(20, value + 1))} disabled={disabled}>+</button>
    </div>
  );
}

function DifficultyStars({ level }) {
  return (
    <div className="difficulty-stars">
      {[1, 2, 3, 4].map(i => (
        <Star
          key={i}
          className={`w-4 h-4 ${i <= level ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
        />
      ))}
    </div>
  );
}

// Watermark component hiển thị tiến độ các giai đoạn
function ProgressWatermark({ completedByCategory }) {
  return (
    <div className="progress-watermark">
      <div className="watermark-title">
        <Trophy className="w-5 h-5 text-yellow-500" />
        <span>Tiến độ các giai đoạn</span>
      </div>
      <div className="watermark-grid">
        {REACTION_CATEGORIES.map(cat => {
          const Icon = cat.icon;
          const completed = completedByCategory[cat.id] || 0;
          const total = REACTIONS.filter(r => r.category === cat.id).length;
          const percentage = Math.round((completed / total) * 100);
          const isComplete = percentage === 100;
          
          return (
            <div 
              key={cat.id} 
              className={`watermark-item ${isComplete ? 'completed' : ''}`}
              style={{ '--cat-color': cat.color }}
            >
              <div className="watermark-icon" style={{ backgroundColor: isComplete ? '#10b981' : cat.color }}>
                <Icon className="w-4 h-4 text-white" />
                {isComplete && (
                  <div className="complete-badge">✓</div>
                )}
              </div>
              <div className="watermark-info">
                <div className="watermark-name">{cat.name}</div>
                <div className="watermark-progress-bar">
                  <div 
                    className="watermark-progress-fill"
                    style={{ 
                      width: `${percentage}%`, 
                      backgroundColor: isComplete ? '#10b981' : cat.color 
                    }}
                  />
                </div>
                <div className="watermark-stats">
                  <span className="watermark-percentage">{percentage}%</span>
                  <span className="watermark-count">{completed}/{total}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      {/* Tổng tiến độ */}
      <div className="watermark-total">
        <div className="total-label">Tổng tiến độ:</div>
        <div className="total-progress-bar">
          <div 
            className="total-progress-fill"
            style={{ 
              width: `${Math.round((Object.values(completedByCategory).reduce((a, b) => a + b, 0) / REACTIONS.length) * 100)}%`
            }}
          />
        </div>
        <div className="total-stats">
          {Object.values(completedByCategory).reduce((a, b) => a + b, 0)}/{REACTIONS.length} phản ứng
          ({Math.round((Object.values(completedByCategory).reduce((a, b) => a + b, 0) / REACTIONS.length) * 100)}%)
        </div>
      </div>
    </div>
  );
}

function CategorySelector({ selectedCategory, onSelect, completedByCategory }) {
  return (
    <div className="category-selector">
      <h3 className="text-lg font-bold text-gray-700 mb-3">Chọn loại phản ứng:</h3>
      <div className="category-grid">
        {REACTION_CATEGORIES.map(cat => {
          const Icon = cat.icon;
          const completed = completedByCategory[cat.id] || 0;
          const total = REACTIONS.filter(r => r.category === cat.id).length;
          const percentage = Math.round((completed / total) * 100);
          const isComplete = percentage === 100;
          return (
            <button
              key={cat.id}
              className={`category-card ${selectedCategory === cat.id ? 'selected' : ''} ${isComplete ? 'category-complete' : ''}`}
              onClick={() => onSelect(cat.id)}
              style={{ '--category-color': cat.color }}
            >
              {isComplete && (
                <div className="category-complete-badge">
                  <Star className="w-4 h-4 fill-current" />
                  Hoàn thành!
                </div>
              )}
              <div className="category-icon" style={{ backgroundColor: isComplete ? '#10b981' : cat.color }}>
                <Icon className="w-6 h-6 text-white" />
              </div>
              <div className="category-info">
                <h4>{cat.name}</h4>
                <p>{cat.description}</p>
                <div className="category-progress">
                  <div className="progress-bar">
                    <div
                      className="progress-fill"
                      style={{ width: `${percentage}%`, backgroundColor: isComplete ? '#10b981' : cat.color }}
                    />
                  </div>
                  <span>{completed}/{total} ({percentage}%)</span>
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default function CanBangPhanUngNangCao() {
  const { hasProgress, saveProgress, clearProgress, getProgress, completeChallenge } = useChallengeProgress('can-bang-phan-ung-nang-cao-11', {
    challengeId: 2, // ID trong seed.cjs
    programId: 'chemistry',
    grade: 11
  });
  const [showResumeDialog, setShowResumeDialog] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [startTime, setStartTime] = useState(null);
  const [gameMode, setGameMode] = useState('menu'); // 'menu', 'practice', 'challenge'
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [currentReactionIndex, setCurrentReactionIndex] = useState(0);
  const [coeffs, setCoeffs] = useState({});
  const [message, setMessage] = useState('');
  const [showHint, setShowHint] = useState(false);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [completedReactions, setCompletedReactions] = useState([]);
  const [attempts, setAttempts] = useState(0);
  const [showAtomCount, setShowAtomCount] = useState(true);

  // Filter reactions by category
  const filteredReactions = selectedCategory
    ? REACTIONS.filter(r => r.category === selectedCategory)
    : REACTIONS;

  const currentReaction = filteredReactions[currentReactionIndex];

  // Count completed reactions by category
  const completedByCategory = REACTION_CATEGORIES.reduce((acc, cat) => {
    acc[cat.id] = completedReactions.filter(id => {
      const reaction = REACTIONS.find((r, i) => i === id);
      return reaction && reaction.category === cat.id;
    }).length;
    return acc;
  }, {});

  // Initialize coefficients when reaction changes
  useEffect(() => {
    if (!currentReaction) return;
    const initialCoeffs = {};
    currentReaction.reactants.forEach((r, i) => { initialCoeffs[`r${i}`] = 1; });
    currentReaction.products.forEach((p, i) => { initialCoeffs[`p${i}`] = 1; });
    setCoeffs(initialCoeffs);
    setMessage('');
    setShowHint(false);
    setAttempts(0);
  }, [currentReactionIndex, selectedCategory]);

  // Check for saved progress on mount
  useEffect(() => {
    if (hasProgress && !gameStarted) {
      setShowResumeDialog(true);
    } else if (!gameStarted) {
      setGameStarted(true);
    }
  }, [hasProgress, gameStarted]);

  const startGame = (fromBeginning = false) => {
    setShowResumeDialog(false);
    setStartTime(Date.now());
    setIsCompleted(false);
    if (fromBeginning) {
      clearProgress();
      setScore(0);
      setStreak(0);
      setCompletedReactions([]);
      setCurrentReactionIndex(0);
      setGameStarted(true);
    } else {
      const savedData = getProgress();
      if (savedData) {
        setScore(savedData.score || 0);
        setStreak(savedData.streak || 0);
        setCompletedReactions(savedData.completedReactions || []);
        setCurrentReactionIndex(savedData.currentReactionIndex || 0);
        setSelectedCategory(savedData.selectedCategory || null);
        setGameMode(savedData.gameMode || 'menu');
      }
      setGameStarted(true);
    }
  };

  const countAtoms = (side) => {
    const atoms = {};
    const items = side === 'reactants' ? currentReaction.reactants : currentReaction.products;
    items.forEach((item, i) => {
      const coeff = coeffs[`${side === 'reactants' ? 'r' : 'p'}${i}`] || 1;
      const parsed = parseFormula(item.formula);
      parsed.forEach(({ element, count }) => {
        atoms[element] = (atoms[element] || 0) + count * coeff;
      });
    });
    return atoms;
  };

  const isBalanced = () => {
    if (!currentReaction) return false;
    const leftAtoms = countAtoms('reactants');
    const rightAtoms = countAtoms('products');

    const allElements = new Set([...Object.keys(leftAtoms), ...Object.keys(rightAtoms)]);
    for (let el of allElements) {
      if ((leftAtoms[el] || 0) !== (rightAtoms[el] || 0)) return false;
    }
    return true;
  };

  const getTotalMass = (side) => {
    if (!currentReaction) return 0;
    const items = side === 'reactants' ? currentReaction.reactants : currentReaction.products;
    return items.reduce((sum, item, i) => {
      const coeff = coeffs[`${side === 'reactants' ? 'r' : 'p'}${i}`] || 1;
      const mass = calculateMolarMass(item.formula);
      return sum + coeff * mass;
    }, 0);
  };

  const leftMass = getTotalMass('reactants');
  const rightMass = getTotalMass('products');
  const balanced = isBalanced();
  const massDiff = leftMass - rightMass;
  const tiltAngle = Math.max(-15, Math.min(15, massDiff / 50));

  const handleCheck = () => {
    setAttempts(prev => prev + 1);

    if (balanced) {
      const reactionGlobalIndex = REACTIONS.indexOf(currentReaction);
      const basePoints = currentReaction.difficulty * 10;
      const bonusPoints = Math.max(0, 20 - attempts * 5);
      const streakBonus = streak >= 3 ? 15 : streak >= 2 ? 10 : 0;
      const earnedPoints = basePoints + bonusPoints + streakBonus;

      const newScore = score + earnedPoints;
      const newCompletedReactions = [...new Set([...completedReactions, reactionGlobalIndex])];

      setScore(newScore);
      setStreak(prev => prev + 1);
      setCompletedReactions(newCompletedReactions);
      setMessage(`✅ Chính xác! +${earnedPoints} điểm ${streakBonus > 0 ? `(combo x${streak + 1}!)` : ''}`);

      // Check if all reactions completed - save to database
      if (newCompletedReactions.length === REACTIONS.length && !isCompleted) {
        setIsCompleted(true);
        const timeSpent = startTime ? Math.floor((Date.now() - startTime) / 1000) : 0;
        const maxScore = REACTIONS.reduce((sum, r) => sum + r.difficulty * 10 + 20, 0);
        completeChallenge({
          score: newScore,
          maxScore: maxScore,
          timeSpent: timeSpent,
          attempts: newCompletedReactions.length,
          hintsUsed: 0
        });
        console.log('🎉 Challenge completed! Score:', newScore, '/', maxScore);
      } else {
        // Save progress during gameplay
        saveProgress({
          score: newScore,
          streak: streak + 1,
          completedReactions: newCompletedReactions,
          currentReactionIndex,
          selectedCategory,
          gameMode
        });
      }
    } else {
      setStreak(0);
      setMessage('❌ Chưa cân bằng! Kiểm tra số nguyên tử mỗi nguyên tố.');
      saveProgress({
        score,
        streak: 0,
        completedReactions,
        currentReactionIndex,
        selectedCategory,
        gameMode
      });
    }
  };

  const handleNext = () => {
    if (currentReactionIndex < filteredReactions.length - 1) {
      setCurrentReactionIndex(prev => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentReactionIndex > 0) {
      setCurrentReactionIndex(prev => prev - 1);
    }
  };

  const handleReset = () => {
    if (!currentReaction) return;
    const resetCoeffs = {};
    currentReaction.reactants.forEach((r, i) => { resetCoeffs[`r${i}`] = 1; });
    currentReaction.products.forEach((p, i) => { resetCoeffs[`p${i}`] = 1; });
    setCoeffs(resetCoeffs);
    setMessage('');
    setShowHint(false);
    setAttempts(0);
  };

  const goToMenu = () => {
    setGameMode('menu');
    setSelectedCategory(null);
    setCurrentReactionIndex(0);
  };

  const selectCategoryAndStart = (catId) => {
    setSelectedCategory(catId);
    setCurrentReactionIndex(0);
    setGameMode('practice');
  };

  // Render atom count comparison
  const renderAtomComparison = () => {
    if (!currentReaction || !showAtomCount) return null;
    const leftAtoms = countAtoms('reactants');
    const rightAtoms = countAtoms('products');
    const allElements = [...new Set([...Object.keys(leftAtoms), ...Object.keys(rightAtoms)])].sort();

    return (
      <div className="atom-comparison">
        <h4>So sánh số nguyên tử:</h4>
        <div className="atom-table">
          {allElements.map(el => {
            const left = leftAtoms[el] || 0;
            const right = rightAtoms[el] || 0;
            const isBalanced = left === right;
            return (
              <div key={el} className={`atom-row ${isBalanced ? 'balanced' : 'unbalanced'}`}>
                <span className="element-symbol">{el}</span>
                <span className="count left">{left}</span>
                <span className="comparison-icon">
                  {isBalanced ? '=' : left > right ? '>' : '<'}
                </span>
                <span className="count right">{right}</span>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  if (!gameStarted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600">
        <div className="bg-white shadow-md">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <Link to="/hoa-hoc/lop-11" className="flex items-center text-gray-600 hover:text-gray-900">
                <ArrowLeft className="w-5 h-5 mr-2" />
                Quay lại
              </Link>
              <h1 className="text-2xl font-bold text-gray-800 flex items-center">
                <span className="mr-2">⚖️</span>
                Cân Bằng Phản Ứng Nâng Cao
              </h1>
              <div className="w-24"></div>
            </div>
          </div>
        </div>
        <div className="container mx-auto px-4 py-8">
          <div className="bg-white rounded-2xl shadow-2xl p-12 text-center">
            <p className="text-gray-600">Đang tải...</p>
          </div>
        </div>
        <ResumeDialog
          show={showResumeDialog}
          onResume={() => startGame(false)}
          onRestart={() => startGame(true)}
          progressInfo={{
            current: completedReactions.length,
            total: REACTIONS.length,
            score: score
          }}
        />
      </div>
    );
  }

  // Menu mode
  if (gameMode === 'menu') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600">
        <div className="bg-white shadow-md">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <Link to="/hoa-hoc/lop-11" className="flex items-center text-gray-600 hover:text-gray-900">
                <ArrowLeft className="w-5 h-5 mr-2" />
                Quay lại
              </Link>
              <h1 className="text-2xl font-bold text-gray-800 flex items-center">
                <span className="mr-2">⚖️</span>
                Cân Bằng Phản Ứng Nâng Cao
              </h1>
              <div className="flex items-center gap-2 text-yellow-600">
                <Trophy className="w-6 h-6" />
                <span className="font-bold">{score} điểm</span>
              </div>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-8">
          <div className="bg-white rounded-2xl shadow-2xl p-6">
            {/* Stats */}
            <div className="stats-bar mb-6">
              <div className="stat-item">
                <Award className="w-5 h-5 text-yellow-500" />
                <span>Điểm: <strong>{score}</strong></span>
              </div>
              <div className="stat-item">
                <Target className="w-5 h-5 text-green-500" />
                <span>Hoàn thành: <strong>{completedReactions.length}/{REACTIONS.length}</strong></span>
              </div>
              <div className="stat-item">
                <Flame className="w-5 h-5 text-orange-500" />
                <span>Combo: <strong>x{streak}</strong></span>
              </div>
            </div>

            {/* Progress Watermark */}
            <ProgressWatermark completedByCategory={completedByCategory} />

            <CategorySelector
              selectedCategory={selectedCategory}
              onSelect={selectCategoryAndStart}
              completedByCategory={completedByCategory}
            />

            {/* Challenge Mode Button */}
            <div className="mt-6 text-center">
              <button
                className="challenge-mode-btn"
                onClick={() => {
                  setSelectedCategory(null);
                  setCurrentReactionIndex(0);
                  setGameMode('challenge');
                }}
              >
                <Zap className="w-5 h-5" />
                Chế độ Thử thách (Tất cả phản ứng)
              </button>
            </div>
          </div>
        </div>

        <ResumeDialog
          show={showResumeDialog}
          onResume={() => startGame(false)}
          onRestart={() => startGame(true)}
          progressInfo={{
            current: completedReactions.length,
            total: REACTIONS.length,
            score: score
          }}
        />
      </div>
    );
  }

  // Practice/Challenge mode
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600">
      {/* Header */}
      <div className="bg-white shadow-md">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <button onClick={goToMenu} className="flex items-center text-gray-600 hover:text-gray-900">
              <ArrowLeft className="w-5 h-5 mr-2" />
              Menu
            </button>
            <h1 className="text-xl font-bold text-gray-800 flex items-center">
              <span className="mr-2">⚖️</span>
              {gameMode === 'challenge' ? 'Thử thách' : REACTION_CATEGORIES.find(c => c.id === selectedCategory)?.name}
            </h1>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1 text-orange-500">
                <Flame className="w-5 h-5" />
                <span className="font-bold">x{streak}</span>
              </div>
              <div className="flex items-center gap-1 text-yellow-600">
                <Trophy className="w-5 h-5" />
                <span className="font-bold">{score}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-4">
        {!currentReaction || Object.keys(coeffs).length === 0 ? (
          <div className="bg-white rounded-2xl shadow-2xl p-6 text-center">
            <p>Đang tải phương trình...</p>
          </div>
        ) : (
          <div className="bg-white rounded-2xl shadow-2xl p-5">
            {/* Reaction Info */}
            <div className="reaction-header mb-4">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-bold text-gray-800">{currentReaction.name}</h2>
                  <div className="flex items-center gap-2 mt-1">
                    <DifficultyStars level={currentReaction.difficulty} />
                    <span className="text-sm text-gray-500">
                      ({currentReactionIndex + 1}/{filteredReactions.length})
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    className="icon-btn"
                    onClick={() => setShowHint(!showHint)}
                    title="Gợi ý"
                  >
                    <HelpCircle className="w-5 h-5" />
                  </button>
                  <button
                    className="icon-btn"
                    onClick={() => setShowAtomCount(!showAtomCount)}
                    title="Hiện/ẩn số nguyên tử"
                  >
                    <Atom className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {showHint && (
                <div className="hint-box mt-3">
                  <HelpCircle className="w-4 h-4" />
                  <span>{currentReaction.hint}</span>
                </div>
              )}
            </div>

            {/* Balance Scale */}
            <div className="scale-container-advanced mb-4">
              <div className="scale-base-advanced"></div>
              <div className="scale-beam-advanced" style={{ transform: `rotate(${tiltAngle}deg)` }}>
                <div className="scale-center-advanced"></div>
                
                <div className="scale-pan-advanced left">
                  <div className="scale-chain-advanced"></div>
                  <div className={`scale-plate-advanced ${balanced ? 'balanced' : leftMass > rightMass ? 'heavier' : ''}`}>
                    <div className="plate-label">Chất phản ứng</div>
                    <div className="plate-mass">{leftMass.toFixed(1)} g/mol</div>
                  </div>
                </div>

                <div className="scale-pan-advanced right">
                  <div className="scale-chain-advanced"></div>
                  <div className={`scale-plate-advanced ${balanced ? 'balanced' : rightMass > leftMass ? 'heavier' : ''}`}>
                    <div className="plate-label">Sản phẩm</div>
                    <div className="plate-mass">{rightMass.toFixed(1)} g/mol</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Atom Count Comparison */}
            {renderAtomComparison()}

            {/* Equation Display */}
            <div className="equation-display-advanced mb-4">
              <div className="equation-wrapper">
                {/* Reactants */}
                <div className="equation-side">
                  {currentReaction.reactants.map((r, i) => (
                    <React.Fragment key={`r${i}`}>
                      {i > 0 && <span className="operator">+</span>}
                      <div className="species-card-advanced">
                        <CoefficientControl
                          value={coeffs[`r${i}`] || 1}
                          onChange={(v) => setCoeffs({ ...coeffs, [`r${i}`]: v })}
                          disabled={false}
                        />
                        <div className="formula-advanced">{r.formula}</div>
                        <div className="molar-mass-advanced">
                          {calculateMolarMass(r.formula).toFixed(1)} g/mol
                        </div>
                      </div>
                    </React.Fragment>
                  ))}
                </div>

                <span className="arrow-symbol">→</span>

                {/* Products */}
                <div className="equation-side">
                  {currentReaction.products.map((p, i) => (
                    <React.Fragment key={`p${i}`}>
                      {i > 0 && <span className="operator">+</span>}
                      <div className="species-card-advanced">
                        <CoefficientControl
                          value={coeffs[`p${i}`] || 1}
                          onChange={(v) => setCoeffs({ ...coeffs, [`p${i}`]: v })}
                          disabled={false}
                        />
                        <div className="formula-advanced">{p.formula}</div>
                        <div className="molar-mass-advanced">
                          {calculateMolarMass(p.formula).toFixed(1)} g/mol
                        </div>
                      </div>
                    </React.Fragment>
                  ))}
                </div>
              </div>
            </div>

            {/* Controls */}
            <div className="controls-bar mb-3">
              <button onClick={handlePrev} disabled={currentReactionIndex === 0} className="nav-btn">
                <ChevronLeft className="w-5 h-5" />
              </button>
              
              <button onClick={handleReset} className="reset-btn">
                <RotateCcw className="w-4 h-4" />
                Đặt lại
              </button>

              <button onClick={handleCheck} className="check-btn">
                Kiểm tra
              </button>

              <button onClick={handleNext} disabled={currentReactionIndex === filteredReactions.length - 1} className="nav-btn">
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            {/* Message */}
            {message && (
              <div className={`message-box ${
                message.includes('✅') ? 'success' :
                message.includes('❌') ? 'error' : 'info'
              }`}>
                {message}
                {message.includes('✅') && currentReactionIndex < filteredReactions.length - 1 && (
                  <button onClick={handleNext} className="next-after-success">
                    Tiếp theo <ChevronRight className="w-4 h-4" />
                  </button>
                )}
              </div>
            )}
          </div>
        )}
      </div>

      <ResumeDialog
        show={showResumeDialog}
        onResume={() => startGame(false)}
        onRestart={() => startGame(true)}
        progressInfo={{
          current: completedReactions.length,
          total: REACTIONS.length,
          score: score
        }}
      />
    </div>
  );
}
