import React, { useState, useEffect, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  ArrowLeft, Trophy, Play, RotateCcw, ChevronRight, ChevronLeft,
  CheckCircle2, XCircle, Lightbulb, HelpCircle, Zap, Award,
  FlaskConical, Beaker, Flame, Sparkles, Layers, Wrench
} from 'lucide-react';
import useChallengeProgress from '../../../../hooks/useChallengeProgress';
import ResumeDialog from '../../../../components/ResumeDialog';
import './CSS/Bai15_KIM_LOAI.css';

// ================== DATA ==================
const CHALLENGES = [
  {
    id: 1,
    type: 'physical-properties',
    title: 'Tính chất vật lí của kim loại',
    description: 'Quan sát và nhận biết các tính chất vật lí đặc trưng của kim loại.',
    question: 'Dựa vào thí nghiệm, tính chất nào KHÔNG phải của kim loại?',
    options: ['Dẫn điện tốt', 'Dẫn nhiệt tốt', 'Dễ vỡ như thủy tinh', 'Có ánh kim'],
    correctAnswer: 'Dễ vỡ như thủy tinh',
    phenomenon: 'Kim loại có ánh kim, dẫn điện và nhiệt tốt, có tính dẻo (uốn cong được).',
    hint: 'Kim loại có thể uốn cong, kéo sợi được.',
    difficulty: 'easy',
    points: 10,
    color: '#f59e0b',
    gradient: 'linear-gradient(135deg, #f59e0b, #fbbf24)',
    icon: Sparkles,
    experiment: {
      type: 'bend-metal',
      metal: { name: 'Dây đồng', color: '#b87333' },
      actions: ['Quan sát ánh kim', 'Uốn cong dây', 'Nối vào mạch điện']
    }
  },
  {
    id: 2,
    type: 'chemical-oxygen',
    title: 'Kim loại tác dụng với Oxi',
    description: 'Đốt dây sắt trong bình chứa oxi và quan sát hiện tượng.',
    question: 'Khi đốt dây sắt trong oxi, sản phẩm tạo thành là gì?',
    options: ['Fe₂O₃ (oxit sắt III)', 'FeO (oxit sắt II)', 'Fe₃O₄ (oxit sắt từ)', 'Không phản ứng'],
    correctAnswer: 'Fe₃O₄ (oxit sắt từ)',
    equation: '3Fe + 2O₂ →(t°)→ Fe₃O₄',
    phenomenon: 'Dây sắt cháy sáng chói, tóe hoa lửa, tạo Fe₃O₄ màu đen.',
    hint: 'Sắt cháy trong oxi tạo oxit sắt từ.',
    difficulty: 'medium',
    points: 15,
    color: '#ef4444',
    gradient: 'linear-gradient(135deg, #ef4444, #f87171)',
    icon: Flame,
    experiment: {
      type: 'burn-metal',
      metal: { name: 'Dây sắt', color: '#71717a' },
      oxygen: { name: 'O₂', color: '#93c5fd' }
    }
  },
  {
    id: 3,
    type: 'chemical-acid',
    title: 'Kim loại tác dụng với Axit',
    description: 'Cho kẽm vào dung dịch HCl loãng và quan sát.',
    question: 'Hiện tượng gì xảy ra khi cho Zn vào dung dịch HCl?',
    options: ['Không hiện tượng', 'Có khí H₂ thoát ra, Zn tan dần', 'Có kết tủa trắng', 'Dung dịch chuyển màu xanh'],
    correctAnswer: 'Có khí H₂ thoát ra, Zn tan dần',
    equation: 'Zn + 2HCl → ZnCl₂ + H₂↑',
    phenomenon: 'Kẽm tan dần, có bọt khí H₂ sủi lên mạnh.',
    hint: 'Kim loại đứng trước H trong dãy hoạt động sẽ đẩy H₂ ra khỏi axit.',
    difficulty: 'easy',
    points: 15,
    color: '#10b981',
    gradient: 'linear-gradient(135deg, #10b981, #34d399)',
    icon: Beaker,
    experiment: {
      type: 'metal-acid',
      metal: { name: 'Zn', color: '#a1a1aa' },
      acid: { name: 'HCl', color: '#fecaca' }
    }
  },
  {
    id: 4,
    type: 'activity-series',
    title: 'Dãy hoạt động hóa học',
    description: 'So sánh mức độ hoạt động của các kim loại qua thí nghiệm.',
    question: 'Trong dãy hoạt động, kim loại nào hoạt động mạnh nhất?',
    options: ['Cu', 'Fe', 'Na', 'Ag'],
    correctAnswer: 'Na',
    phenomenon: 'Na phản ứng mãnh liệt với nước, Fe phản ứng chậm với axit, Cu và Ag không phản ứng với HCl.',
    hint: 'K, Na, Ca, Mg, Al, Zn, Fe, Ni, Sn, Pb, H, Cu, Hg, Ag, Pt, Au',
    difficulty: 'medium',
    points: 15,
    color: '#8b5cf6',
    gradient: 'linear-gradient(135deg, #8b5cf6, #a78bfa)',
    icon: Zap,
    experiment: {
      type: 'compare-activity',
      metals: [
        { name: 'Na', color: '#e5e5e5', activity: 'very-high' },
        { name: 'Fe', color: '#71717a', activity: 'medium' },
        { name: 'Cu', color: '#b87333', activity: 'low' },
        { name: 'Ag', color: '#c0c0c0', activity: 'very-low' }
      ]
    }
  },
  {
    id: 5,
    type: 'displacement',
    title: 'Kim loại + Dung dịch muối',
    description: 'Cho đinh sắt vào dung dịch CuSO₄ màu xanh.',
    question: 'Hiện tượng gì xảy ra khi cho Fe vào CuSO₄?',
    options: ['Không phản ứng', 'Có khí thoát ra', 'Đinh sắt phủ lớp đồng đỏ, dung dịch nhạt màu', 'Có kết tủa xanh'],
    correctAnswer: 'Đinh sắt phủ lớp đồng đỏ, dung dịch nhạt màu',
    equation: 'Fe + CuSO₄ → FeSO₄ + Cu↓',
    phenomenon: 'Fe đẩy Cu ra khỏi muối vì Fe hoạt động mạnh hơn Cu.',
    hint: 'Kim loại mạnh hơn đẩy kim loại yếu hơn ra khỏi dung dịch muối.',
    difficulty: 'medium',
    points: 20,
    color: '#3b82f6',
    gradient: 'linear-gradient(135deg, #3b82f6, #60a5fa)',
    icon: FlaskConical,
    experiment: {
      type: 'displacement-reaction',
      metal: { name: 'Fe (đinh sắt)', color: '#71717a' },
      solution: { name: 'CuSO₄', color: '#3b82f6' },
      product: { name: 'Cu', color: '#b87333' }
    }
  },
  {
    id: 6,
    type: 'alloy',
    title: 'Hợp kim',
    description: 'Tìm hiểu về thành phần và tính chất của hợp kim.',
    question: 'Thép là hợp kim của sắt với nguyên tố nào?',
    options: ['Đồng (Cu)', 'Cacbon (C)', 'Nhôm (Al)', 'Kẽm (Zn)'],
    correctAnswer: 'Cacbon (C)',
    phenomenon: 'Thép = Fe + C (0.01-2%). Gang = Fe + C (2-5%). Đồng thau = Cu + Zn.',
    hint: 'Hợp kim thường cứng và bền hơn kim loại nguyên chất.',
    difficulty: 'easy',
    points: 15,
    color: '#64748b',
    gradient: 'linear-gradient(135deg, #64748b, #94a3b8)',
    icon: Layers,
    experiment: {
      type: 'alloy-compare',
      alloys: [
        { name: 'Thép', components: 'Fe + C', color: '#52525b' },
        { name: 'Gang', components: 'Fe + C (nhiều)', color: '#3f3f46' },
        { name: 'Đồng thau', components: 'Cu + Zn', color: '#ca8a04' }
      ]
    }
  },
  {
    id: 7,
    type: 'extraction',
    title: 'Điều chế kim loại',
    description: 'Các phương pháp điều chế kim loại từ quặng.',
    question: 'Phương pháp nào dùng để điều chế Na?',
    options: ['Nhiệt luyện', 'Thủy luyện', 'Điện phân nóng chảy NaCl', 'Dùng H₂ khử oxit'],
    correctAnswer: 'Điện phân nóng chảy NaCl',
    equation: '2NaCl →(đpnc)→ 2Na + Cl₂↑',
    phenomenon: 'Kim loại mạnh (K, Na, Ca, Mg, Al) phải điện phân nóng chảy. Kim loại trung bình (Zn, Fe, Sn, Pb) dùng nhiệt luyện hoặc điện phân dung dịch.',
    hint: 'Kim loại càng mạnh, càng khó điều chế.',
    difficulty: 'hard',
    points: 20,
    color: '#06b6d4',
    gradient: 'linear-gradient(135deg, #06b6d4, #22d3ee)',
    icon: Wrench,
    experiment: {
      type: 'electrolysis',
      compound: { name: 'NaCl nóng chảy', color: '#fef3c7' },
      products: [
        { name: 'Na', electrode: 'catot', color: '#e5e5e5' },
        { name: 'Cl₂', electrode: 'anot', color: '#86efac' }
      ]
    }
  },
  {
    id: 8,
    type: 'summary',
    title: 'Tổng hợp kiến thức',
    description: 'Câu hỏi tổng hợp về kim loại.',
    question: 'Kim loại nào KHÔNG tác dụng với dung dịch H₂SO₄ loãng?',
    options: ['Mg', 'Zn', 'Fe', 'Cu'],
    correctAnswer: 'Cu',
    phenomenon: 'Cu đứng sau H trong dãy hoạt động nên không đẩy được H₂ ra khỏi axit loãng.',
    hint: 'Xem lại vị trí các kim loại trong dãy hoạt động.',
    difficulty: 'medium',
    points: 20,
    color: '#ec4899',
    gradient: 'linear-gradient(135deg, #ec4899, #f472b6)',
    icon: Award,
    experiment: {
      type: 'acid-test',
      metals: [
        { name: 'Mg', reacts: true, color: '#d4d4d8' },
        { name: 'Zn', reacts: true, color: '#a1a1aa' },
        { name: 'Fe', reacts: true, color: '#71717a' },
        { name: 'Cu', reacts: false, color: '#b87333' }
      ],
      acid: { name: 'H₂SO₄ loãng', color: '#fecaca' }
    }
  }
];

const TOTAL_POINTS = CHALLENGES.reduce((sum, c) => sum + c.points, 0);

// ================== EXPERIMENT COMPONENTS ==================

// Thí nghiệm uốn kim loại - tính chất vật lí
const PhysicalPropertiesExperiment = ({ experiment, progress, isComplete }) => {
  return (
    <div className="experiment-container physical-exp">
      <div className="metal-showcase">
        <div 
          className={`metal-wire ${isComplete ? 'bent' : ''}`}
          style={{ '--metal-color': experiment.metal.color }}
        >
          <div className="wire-shine"></div>
        </div>
        
        <div className="properties-demo">
          <div className={`property-item ${progress > 30 ? 'active' : ''}`}>
            <Sparkles size={20} />
            <span>Ánh kim</span>
          </div>
          <div className={`property-item ${progress > 60 ? 'active' : ''}`}>
            <Zap size={20} />
            <span>Dẫn điện</span>
          </div>
          <div className={`property-item ${isComplete ? 'active' : ''}`}>
            <div className="flex-icon">↔️</div>
            <span>Tính dẻo</span>
          </div>
        </div>
      </div>
      
      {isComplete && (
        <div className="experiment-result">
          ✓ Kim loại có ánh kim, dẫn điện, dẫn nhiệt tốt và có tính dẻo!
        </div>
      )}
    </div>
  );
};

// Thí nghiệm đốt kim loại trong oxi
const BurnMetalExperiment = ({ experiment, progress, isComplete }) => {
  return (
    <div className="experiment-container burn-exp">
      <div className="burn-chamber">
        <div className="oxygen-jar" style={{ '--o2-color': experiment.oxygen.color }}>
          <span className="gas-label">O₂</span>
          <div className="oxygen-bubbles">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="bubble" style={{ '--delay': `${i * 0.3}s` }}></div>
            ))}
          </div>
        </div>
        
        <div 
          className={`iron-wire ${progress > 20 ? 'burning' : ''} ${isComplete ? 'burnt' : ''}`}
          style={{ '--metal-color': experiment.metal.color }}
        >
          {progress > 20 && progress < 100 && (
            <div className="sparks">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="spark" style={{ '--angle': `${i * 45}deg` }}></div>
              ))}
            </div>
          )}
        </div>
        
        {isComplete && (
          <div className="product-formed">
            <div className="fe3o4">Fe₃O₄</div>
            <span>Oxit sắt từ (đen)</span>
          </div>
        )}
      </div>
      
      {isComplete && (
        <div className="equation-display">
          3Fe + 2O₂ →(t°)→ Fe₃O₄
        </div>
      )}
    </div>
  );
};

// Thí nghiệm kim loại + axit
const MetalAcidExperiment = ({ experiment, progress, isComplete }) => {
  return (
    <div className="experiment-container acid-exp">
      <div className="beaker-setup">
        <div className="beaker" style={{ '--acid-color': experiment.acid.color }}>
          <div className="acid-liquid">
            <span className="acid-label">{experiment.acid.name}</span>
          </div>
          
          <div 
            className={`metal-piece ${progress > 10 ? 'dissolving' : ''}`}
            style={{ 
              '--metal-color': experiment.metal.color,
              opacity: isComplete ? 0.3 : 1
            }}
          >
            {experiment.metal.name}
          </div>
          
          {progress > 20 && (
            <div className="gas-bubbles">
              {[...Array(10)].map((_, i) => (
                <div 
                  key={i} 
                  className="h2-bubble"
                  style={{ 
                    '--delay': `${i * 0.2}s`,
                    '--x': `${20 + Math.random() * 60}%`
                  }}
                ></div>
              ))}
            </div>
          )}
        </div>
        
        {progress > 50 && (
          <div className="gas-collection">
            <div className="gas-tube"></div>
            <div className="collected-gas">
              H₂↑
            </div>
          </div>
        )}
      </div>
      
      {isComplete && (
        <div className="equation-display">
          Zn + 2HCl → ZnCl₂ + H₂↑
        </div>
      )}
    </div>
  );
};

// Thí nghiệm so sánh dãy hoạt động
const ActivitySeriesExperiment = ({ experiment, progress, isComplete }) => {
  return (
    <div className="experiment-container activity-exp">
      <div className="activity-series-visual">
        <div className="series-arrow">
          <span>Hoạt động mạnh</span>
          <div className="arrow-line"></div>
          <span>Hoạt động yếu</span>
        </div>
        
        <div className="metals-row">
          {experiment.metals.map((metal, idx) => (
            <div 
              key={metal.name}
              className={`metal-card ${progress > (idx + 1) * 25 ? 'revealed' : ''}`}
              style={{ '--metal-color': metal.color, '--delay': `${idx * 0.2}s` }}
            >
              <div className="metal-symbol">{metal.name}</div>
              <div className={`activity-level ${metal.activity}`}>
                {metal.activity === 'very-high' && '⚡⚡⚡'}
                {metal.activity === 'medium' && '⚡⚡'}
                {metal.activity === 'low' && '⚡'}
                {metal.activity === 'very-low' && '—'}
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {isComplete && (
        <div className="series-hint">
          K, Na, Ca, Mg, Al, Zn, Fe, Ni, Sn, Pb, <strong>H</strong>, Cu, Hg, Ag, Pt, Au
        </div>
      )}
    </div>
  );
};

// Thí nghiệm phản ứng thế - Fe + CuSO4
const DisplacementExperiment = ({ experiment, progress, isComplete }) => {
  return (
    <div className="experiment-container displacement-exp">
      <div className="displacement-setup">
        <div 
          className="solution-beaker"
          style={{ 
            '--solution-color': experiment.solution.color,
            '--solution-opacity': isComplete ? 0.3 : 1
          }}
        >
          <div className="solution-liquid">
            <span>{experiment.solution.name}</span>
          </div>
          
          <div 
            className={`iron-nail ${progress > 20 ? 'reacting' : ''}`}
            style={{ '--metal-color': experiment.metal.color }}
          >
            {progress > 50 && (
              <div 
                className="copper-coating"
                style={{ 
                  '--cu-color': experiment.product.color,
                  '--coating': `${Math.min((progress - 50) * 2, 100)}%`
                }}
              ></div>
            )}
          </div>
        </div>
        
        {isComplete && (
          <div className="reaction-result">
            <div className="result-item">
              <div className="cu-deposited" style={{ background: experiment.product.color }}></div>
              <span>Cu bám vào đinh</span>
            </div>
            <div className="result-item">
              <div className="feso4-solution"></div>
              <span>FeSO₄ (nhạt màu)</span>
            </div>
          </div>
        )}
      </div>
      
      {isComplete && (
        <div className="equation-display">
          Fe + CuSO₄ → FeSO₄ + Cu↓
        </div>
      )}
    </div>
  );
};

// Thí nghiệm hợp kim
const AlloyExperiment = ({ experiment, progress, isComplete }) => {
  return (
    <div className="experiment-container alloy-exp">
      <div className="alloys-showcase">
        {experiment.alloys.map((alloy, idx) => (
          <div 
            key={alloy.name}
            className={`alloy-card ${progress > (idx + 1) * 33 ? 'revealed' : ''}`}
            style={{ '--alloy-color': alloy.color, '--delay': `${idx * 0.3}s` }}
          >
            <div className="alloy-sample"></div>
            <div className="alloy-info">
              <strong>{alloy.name}</strong>
              <span>{alloy.components}</span>
            </div>
          </div>
        ))}
      </div>
      
      {isComplete && (
        <div className="alloy-note">
          💡 Hợp kim thường cứng và bền hơn kim loại nguyên chất!
        </div>
      )}
    </div>
  );
};

// Thí nghiệm điện phân
const ElectrolysisExperiment = ({ experiment, progress, isComplete }) => {
  return (
    <div className="experiment-container electrolysis-exp">
      <div className="electrolysis-cell">
        <div className="electrodes">
          <div className="electrode cathode">
            <span>Catot (−)</span>
            {progress > 50 && (
              <div 
                className="product-metal"
                style={{ '--product-color': experiment.products[0].color }}
              >
                {experiment.products[0].name}
              </div>
            )}
          </div>
          
          <div 
            className="molten-salt"
            style={{ '--salt-color': experiment.compound.color }}
          >
            <span>{experiment.compound.name}</span>
            {progress > 20 && (
              <div className="ion-flow">
                <div className="ion na-ion">Na⁺</div>
                <div className="ion cl-ion">Cl⁻</div>
              </div>
            )}
          </div>
          
          <div className="electrode anode">
            <span>Anot (+)</span>
            {progress > 50 && (
              <div 
                className="product-gas"
                style={{ '--product-color': experiment.products[1].color }}
              >
                {experiment.products[1].name}↑
              </div>
            )}
          </div>
        </div>
        
        <div className="power-source">
          <Zap size={24} />
          <span>Nguồn điện</span>
        </div>
      </div>
      
      {isComplete && (
        <div className="equation-display">
          2NaCl →(đpnc)→ 2Na + Cl₂↑
        </div>
      )}
    </div>
  );
};

// Thí nghiệm tổng hợp - test với axit
const AcidTestExperiment = ({ experiment, progress, isComplete }) => {
  return (
    <div className="experiment-container acid-test-exp">
      <div className="test-tubes-row">
        {experiment.metals.map((metal, idx) => (
          <div 
            key={metal.name}
            className={`test-tube-setup ${progress > (idx + 1) * 25 ? 'tested' : ''}`}
            style={{ '--delay': `${idx * 0.2}s` }}
          >
            <div className="test-tube" style={{ '--acid-color': experiment.acid.color }}>
              <div className="acid-in-tube">{experiment.acid.name}</div>
              <div 
                className="metal-sample"
                style={{ '--metal-color': metal.color }}
              >
                {metal.name}
              </div>
              
              {progress > (idx + 1) * 25 && metal.reacts && (
                <div className="reaction-bubbles">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className="tiny-bubble" style={{ '--delay': `${i * 0.15}s` }}></div>
                  ))}
                </div>
              )}
            </div>
            
            <div className={`result-label ${metal.reacts ? 'reacts' : 'no-react'}`}>
              {progress > (idx + 1) * 25 && (
                metal.reacts ? '✓ Có khí H₂' : '✗ Không phản ứng'
              )}
            </div>
          </div>
        ))}
      </div>
      
      {isComplete && (
        <div className="conclusion">
          Cu đứng sau H trong dãy hoạt động → không đẩy được H₂ ra khỏi axit loãng
        </div>
      )}
    </div>
  );
};

// Render experiment based on type
const ExperimentRenderer = ({ challenge, progress, isComplete }) => {
  const { experiment, type } = challenge;
  
  switch (type) {
    case 'physical-properties':
      return <PhysicalPropertiesExperiment experiment={experiment} progress={progress} isComplete={isComplete} />;
    case 'chemical-oxygen':
      return <BurnMetalExperiment experiment={experiment} progress={progress} isComplete={isComplete} />;
    case 'chemical-acid':
      return <MetalAcidExperiment experiment={experiment} progress={progress} isComplete={isComplete} />;
    case 'activity-series':
      return <ActivitySeriesExperiment experiment={experiment} progress={progress} isComplete={isComplete} />;
    case 'displacement':
      return <DisplacementExperiment experiment={experiment} progress={progress} isComplete={isComplete} />;
    case 'alloy':
      return <AlloyExperiment experiment={experiment} progress={progress} isComplete={isComplete} />;
    case 'extraction':
      return <ElectrolysisExperiment experiment={experiment} progress={progress} isComplete={isComplete} />;
    case 'summary':
      return <AcidTestExperiment experiment={experiment} progress={progress} isComplete={isComplete} />;
    default:
      return null;
  }
};

// ================== MAIN COMPONENT ==================
const Bai15_KIM_LOAI = () => {
  const navigate = useNavigate();
  const { hasProgress, saveProgress, clearProgress, getProgress } = useChallengeProgress('kim-loai-9-bai15');

  const [gameStarted, setGameStarted] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [showResumeDialog, setShowResumeDialog] = useState(false);
  const [currentChallenge, setCurrentChallenge] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [completedChallenges, setCompletedChallenges] = useState([]);
  const [answeredCorrectly, setAnsweredCorrectly] = useState([]);

  // Experiment states
  const [experimentProgress, setExperimentProgress] = useState(0);
  const [isExperimentRunning, setIsExperimentRunning] = useState(false);
  const [isExperimentComplete, setIsExperimentComplete] = useState(false);

  const challenge = CHALLENGES[currentChallenge];
  const ChallengeIcon = challenge?.icon || FlaskConical;

  useEffect(() => {
    if (hasProgress && !gameStarted && !showResults) {
      setShowResumeDialog(true);
    }
  }, [hasProgress, gameStarted, showResults]);

  useEffect(() => {
    if (gameStarted && !showResults) {
      saveProgress({
        currentChallenge,
        score,
        completedChallenges,
        answeredCorrectly
      });
    }
  }, [currentChallenge, score, completedChallenges, answeredCorrectly, gameStarted, showResults]);

  const startGame = useCallback((fromBeginning = false) => {
    if (fromBeginning) {
      clearProgress();
      setCurrentChallenge(0);
      setScore(0);
      setCompletedChallenges([]);
      setAnsweredCorrectly([]);
    } else {
      const saved = getProgress();
      if (saved) {
        setCurrentChallenge(saved.currentChallenge || 0);
        setScore(saved.score || 0);
        setCompletedChallenges(saved.completedChallenges || []);
        setAnsweredCorrectly(saved.answeredCorrectly || []);
      }
    }
    setGameStarted(true);
    setShowResults(false);
    setShowResumeDialog(false);
    resetQuestion();
  }, [clearProgress, getProgress]);

  const resetQuestion = () => {
    setSelectedAnswer(null);
    setIsAnswerSubmitted(false);
    setShowHint(false);
    setExperimentProgress(0);
    setIsExperimentRunning(false);
    setIsExperimentComplete(false);
  };

  const runExperiment = () => {
    if (isExperimentRunning || isExperimentComplete) return;
    setIsExperimentRunning(true);
    setExperimentProgress(0);

    const interval = setInterval(() => {
      setExperimentProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsExperimentRunning(false);
          setIsExperimentComplete(true);
          return 100;
        }
        return prev + 2;
      });
    }, 50);
  };

  const resetExperiment = () => {
    setExperimentProgress(0);
    setIsExperimentRunning(false);
    setIsExperimentComplete(false);
  };

  const checkAnswer = () => {
    if (!selectedAnswer) return;
    setIsAnswerSubmitted(true);

    const isCorrect = selectedAnswer === challenge.correctAnswer;
    if (isCorrect) {
      setScore(prev => prev + challenge.points);
      setAnsweredCorrectly(prev => [...prev, currentChallenge]);
    }
    setCompletedChallenges(prev => [...prev, currentChallenge]);
  };

  const nextChallenge = () => {
    if (currentChallenge < CHALLENGES.length - 1) {
      setCurrentChallenge(prev => prev + 1);
      resetQuestion();
    } else {
      setShowResults(true);
      setGameStarted(false);
      clearProgress();
    }
  };

  const prevChallenge = () => {
    if (currentChallenge > 0) {
      setCurrentChallenge(prev => prev - 1);
      resetQuestion();
    }
  };

  const restartGame = () => {
    clearProgress();
    setShowResults(false);
    setGameStarted(false);
    setCurrentChallenge(0);
    setScore(0);
    setCompletedChallenges([]);
    setAnsweredCorrectly([]);
    resetQuestion();
  };

  // ================== RESULTS SCREEN ==================
  if (showResults) {
    const percentage = Math.round((score / TOTAL_POINTS) * 100);
    const correctCount = answeredCorrectly.length;
    
    const getResult = () => {
      if (percentage >= 90) return { grade: 'A+', title: 'Xuất sắc!', emoji: '🏆', color: '#10b981' };
      if (percentage >= 75) return { grade: 'A', title: 'Giỏi lắm!', emoji: '🌟', color: '#3b82f6' };
      if (percentage >= 60) return { grade: 'B', title: 'Khá tốt!', emoji: '👍', color: '#f59e0b' };
      return { grade: 'C', title: 'Cố gắng hơn!', emoji: '💪', color: '#ef4444' };
    };
    const result = getResult();

    return (
      <div className="kimloai-game">
        <div className="results-container">
          <div className="results-card" style={{ '--accent': result.color }}>
            <div className="trophy-section">
              <span className="trophy-emoji">{result.emoji}</span>
              <div className="grade-badge" style={{ background: result.color }}>{result.grade}</div>
            </div>
            
            <h1>{result.title}</h1>
            
            <div className="score-display">
              <div className="score-circle" style={{ '--progress': percentage }}>
                <span className="score-value">{score}</span>
                <span className="score-total">/ {TOTAL_POINTS}</span>
              </div>
              <p>{percentage}% - Đúng {correctCount}/{CHALLENGES.length} câu</p>
            </div>

            <div className="result-actions">
              <button className="btn-primary" onClick={restartGame}>
                <RotateCcw size={18} /> Làm lại
              </button>
              <button className="btn-secondary" onClick={() => navigate('/advanced-challenge')}>
                <ArrowLeft size={18} /> Về danh sách
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ================== START SCREEN ==================
  if (!gameStarted) {
    return (
      <div className="kimloai-game">
        <div className="start-container">
          <Link to="/advanced-challenge" className="back-link">
            <ArrowLeft size={20} /> Quay lại
          </Link>
          
          <div className="start-card">
            <div className="start-header">
              <div className="start-icon">🔩</div>
              <h1>Kim Loại</h1>
              <p>Thử thách tương tác về tính chất và phản ứng của kim loại</p>
            </div>
            
            <div className="challenge-info">
              <div className="info-item">
                <FlaskConical size={20} />
                <span>{CHALLENGES.length} thí nghiệm mô phỏng</span>
              </div>
              <div className="info-item">
                <Trophy size={20} />
                <span>Tổng điểm: {TOTAL_POINTS}</span>
              </div>
              <div className="info-item">
                <Zap size={20} />
                <span>Lớp 9 - Chương Kim loại</span>
              </div>
            </div>
            
            <div className="topics-list">
              <h3>Các chủ đề:</h3>
              <ul>
                <li>✓ Tính chất vật lí của kim loại</li>
                <li>✓ Tính chất hóa học của kim loại</li>
                <li>✓ Dãy hoạt động hóa học</li>
                <li>✓ Phản ứng với dung dịch muối</li>
                <li>✓ Hợp kim</li>
                <li>✓ Điều chế kim loại</li>
              </ul>
            </div>
            
            <button className="btn-start" onClick={() => startGame(true)}>
              <Play size={22} /> Bắt đầu thử thách
            </button>
          </div>
        </div>
        
        {showResumeDialog && (
          <ResumeDialog
            onResume={() => startGame(false)}
            onStartNew={() => startGame(true)}
            onClose={() => setShowResumeDialog(false)}
          />
        )}
      </div>
    );
  }

  // ================== GAME SCREEN ==================
  return (
    <div className="kimloai-game fullscreen">
      {/* Top Bar */}
      <div className="top-bar">
        <Link to="/advanced-challenge" className="back-link">
          <ArrowLeft size={18} /> Quay lại
        </Link>
        
        <div className="challenge-badge" style={{ background: challenge.gradient }}>
          <ChallengeIcon size={18} color="white" />
          <span>{challenge.title}</span>
        </div>
        
        <div className="top-bar-right">
          <div className="progress-compact">
            <span>{currentChallenge + 1}/{CHALLENGES.length}</span>
            <div className="progress-dots">
              {CHALLENGES.map((_, idx) => (
                <div 
                  key={idx} 
                  className={`dot ${idx === currentChallenge ? 'active' : ''} ${completedChallenges.includes(idx) ? 'done' : ''}`}
                ></div>
              ))}
            </div>
          </div>
          <div className="score-badge">
            <Trophy size={14} />
            <span>{score}</span>
          </div>
        </div>
      </div>

      {/* Main Content - 2 Column Layout */}
      <div className="game-main">
        {/* Left Panel - Experiment */}
        <div className="panel-left">
          <div className="panel-header">
            <FlaskConical size={18} />
            <span>Thí nghiệm mô phỏng</span>
            <div className={`difficulty-tag ${challenge.difficulty}`}>
              {challenge.difficulty === 'easy' && 'Dễ'}
              {challenge.difficulty === 'medium' && 'TB'}
              {challenge.difficulty === 'hard' && 'Khó'}
            </div>
          </div>
          
          <div className="experiment-area">
            <ExperimentRenderer 
              challenge={challenge}
              progress={experimentProgress}
              isComplete={isExperimentComplete}
            />
          </div>
          
          <div className="experiment-controls">
            {!isExperimentComplete ? (
              <button 
                className="btn-experiment"
                onClick={runExperiment}
                disabled={isExperimentRunning}
              >
                {isExperimentRunning ? (
                  <>Đang chạy... {experimentProgress}%</>
                ) : (
                  <><Play size={16} /> Chạy thí nghiệm</>
                )}
              </button>
            ) : (
              <button className="btn-reset" onClick={resetExperiment}>
                <RotateCcw size={16} /> Chạy lại
              </button>
            )}
          </div>
        </div>

        {/* Right Panel - Question */}
        <div className="panel-right">
          <div className="panel-header">
            <HelpCircle size={18} />
            <span>Câu hỏi</span>
            <span className="points-badge">+{challenge.points} điểm</span>
          </div>
          
          <div className="question-area">
            {!isExperimentComplete ? (
              <div className="waiting-message">
                <Play size={40} />
                <p>Chạy thí nghiệm để xem câu hỏi</p>
              </div>
            ) : (
              <>
                <div className="phenomenon-box">
                  <Lightbulb size={16} />
                  <span>{challenge.phenomenon}</span>
                </div>
                
                <p className="question-text">{challenge.question}</p>
                
                <div className="options-grid">
                  {challenge.options.map((option, idx) => {
                    let optionClass = 'option-btn';
                    if (isAnswerSubmitted) {
                      if (option === challenge.correctAnswer) {
                        optionClass += ' correct';
                      } else if (option === selectedAnswer && option !== challenge.correctAnswer) {
                        optionClass += ' incorrect';
                      }
                    } else if (selectedAnswer === option) {
                      optionClass += ' selected';
                    }
                    
                    return (
                      <button
                        key={idx}
                        className={optionClass}
                        onClick={() => !isAnswerSubmitted && setSelectedAnswer(option)}
                        disabled={isAnswerSubmitted}
                      >
                        <span className="option-letter">{String.fromCharCode(65 + idx)}</span>
                        <span className="option-text">{option}</span>
                        {isAnswerSubmitted && option === challenge.correctAnswer && (
                          <CheckCircle2 size={18} className="icon-correct" />
                        )}
                        {isAnswerSubmitted && option === selectedAnswer && option !== challenge.correctAnswer && (
                          <XCircle size={18} className="icon-incorrect" />
                        )}
                      </button>
                    );
                  })}
                </div>
                
                {!isAnswerSubmitted && (
                  <button className="btn-hint-inline" onClick={() => setShowHint(!showHint)}>
                    <HelpCircle size={14} />
                    {showHint ? 'Ẩn gợi ý' : 'Gợi ý'}
                  </button>
                )}
                {showHint && !isAnswerSubmitted && (
                  <p className="hint-text">{challenge.hint}</p>
                )}
                
                {isAnswerSubmitted && challenge.equation && (
                  <div className="equation-box">
                    <strong>PT:</strong> {challenge.equation}
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>

      {/* Bottom Navigation Bar */}
      <div className="bottom-bar">
        <button 
          className="btn-nav"
          onClick={prevChallenge}
          disabled={currentChallenge === 0}
        >
          <ChevronLeft size={18} /> Trước
        </button>
        
        <div className="action-buttons">
          {!isAnswerSubmitted && isExperimentComplete ? (
            <button 
              className="btn-submit"
              onClick={checkAnswer}
              disabled={!selectedAnswer}
            >
              <CheckCircle2 size={18} /> Kiểm tra
            </button>
          ) : isAnswerSubmitted ? (
            <button className="btn-next" onClick={nextChallenge}>
              {currentChallenge < CHALLENGES.length - 1 ? (
                <>Tiếp theo <ChevronRight size={18} /></>
              ) : (
                <>Xem kết quả <Trophy size={18} /></>
              )}
            </button>
          ) : (
            <div className="status-hint">
              <Play size={16} /> Chạy thí nghiệm để tiếp tục
            </div>
          )}
        </div>
        
        <button 
          className="btn-nav"
          onClick={nextChallenge}
          disabled={currentChallenge === CHALLENGES.length - 1 || !isAnswerSubmitted}
        >
          Tiếp <ChevronRight size={18} />
        </button>
      </div>
    </div>
  );
};

export default Bai15_KIM_LOAI;
