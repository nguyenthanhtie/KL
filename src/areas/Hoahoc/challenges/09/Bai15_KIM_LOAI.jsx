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
    type: 'chemical-oxygen',
    title: 'Kim loại tác dụng với Oxi',
    description: 'Đốt dây sắt trong bình chứa oxi và quan sát phản ứng.',
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
      metal: { name: 'Fe', fullName: 'Dây sắt', color: '#71717a' },
      oxygen: { name: 'O₂', color: '#93c5fd' },
      product: { name: 'Fe₃O₄', fullName: 'Oxit sắt từ', color: '#1f2937' }
    }
  },
  {
    id: 2,
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
    id: 3,
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
    id: 4,
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
    id: 5,
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
    id: 6,
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

// Thí nghiệm đốt kim loại trong oxi - Đơn giản: khối sắt đổi màu
const BurnMetalExperiment = ({ experiment, progress, isComplete }) => {
  const stage = progress < 30 ? 'ready' : progress < 70 ? 'burning' : 'complete';
  
  return (
    <div className="experiment-container burn-exp-simple">
      {/* Khu vực đốt - Layout dọc */}
      <div className="burn-area-vertical">
        {/* Các phân tử O₂ bay xung quanh */}
        <div className="oxygen-molecules">
          {[...Array(8)].map((_, i) => (
            <div 
              key={i} 
              className={`o2-molecule ${stage !== 'ready' ? 'active' : ''}`}
              style={{ '--i': i }}
            >
              O₂
            </div>
          ))}
        </div>

        {/* Khối sắt ở giữa */}
        <div className={`iron-block ${stage}`}>
          <div className="iron-surface">
            <span className="iron-symbol">{stage === 'complete' ? 'Fe₃O₄' : 'Fe'}</span>
          </div>
          
          {/* Hiệu ứng lửa khi đang đốt */}
          {stage === 'burning' && (
            <div className="burning-sparks">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="spark-particle" style={{ '--i': i }}></div>
              ))}
            </div>
          )}
          
          {/* Nhãn */}
          <div className="iron-label">
            {stage === 'ready' && 'Dây sắt'}
            {stage === 'burning' && 'Đang cháy...'}
            {stage === 'complete' && 'Oxit sắt từ'}
          </div>
        </div>

        {/* Đèn cồn ở dưới */}
        <div className="alcohol-lamp-bottom">
          {stage !== 'ready' && (
            <div className="lamp-flame-bottom">
              <div className="flame-core"></div>
              <div className="flame-outer-bottom"></div>
              <div className="flame-glow"></div>
            </div>
          )}
          <div className="lamp-wick-bottom"></div>
          <div className="lamp-body-bottom"></div>
          <div className="lamp-base"></div>
          <div className="lamp-label-bottom">Đèn cồn</div>
        </div>
      </div>

      {/* Thông tin màu sắc */}
      <div className="color-info">
        <div className={`color-box before ${stage === 'ready' ? 'active' : ''}`}>
          <div className="color-sample iron-color"></div>
          <span>Trước: Xám bạc</span>
        </div>
        <div className="color-arrow">→</div>
        <div className={`color-box after ${stage === 'complete' ? 'active' : ''}`}>
          <div className="color-sample oxide-color"></div>
          <span>Sau: Đen</span>
        </div>
      </div>

      {/* Hiện tượng */}
      {stage !== 'ready' && (
        <div className="phenomenon-box">
          <div className={`phenom-item ${progress > 30 ? 'show' : ''}`}>
            💡 Sắt cháy sáng chói
          </div>
          <div className={`phenom-item ${progress > 50 ? 'show' : ''}`}>
            ✨ Tóe nhiều tia lửa
          </div>
          <div className={`phenom-item ${stage === 'complete' ? 'show' : ''}`}>
            ⚫ Chuyển thành màu đen
          </div>
        </div>
      )}
    </div>
  );
};

// Thí nghiệm kim loại + axit - Thiết kế mới đơn giản
const MetalAcidExperiment = ({ experiment, progress, isComplete }) => {
  const stage = progress < 20 ? 'ready' : progress < 80 ? 'reacting' : 'complete';
  
  return (
    <div className="experiment-container acid-exp-simple">
      {/* Cốc thủy tinh chứa axit */}
      <div className="acid-beaker-container">
        <div className="beaker-glass">
          {/* Dung dịch axit */}
          <div className="acid-solution" style={{ '--acid-color': experiment.acid.color }}>
            <span className="acid-name">{experiment.acid.name}</span>
          </div>
          
          {/* Miếng kim loại Zn */}
          <div 
            className={`zinc-piece ${stage}`}
            style={{ '--metal-color': experiment.metal.color }}
          >
            <span>{experiment.metal.name}</span>
          </div>
          
          {/* Bọt khí H₂ bay lên */}
          {stage !== 'ready' && (
            <div className="hydrogen-bubbles">
              {[...Array(12)].map((_, i) => (
                <div 
                  key={i} 
                  className="h2-bubble-new"
                  style={{ 
                    '--delay': `${i * 0.15}s`,
                    '--left': `${25 + (i % 4) * 15}%`,
                    '--size': `${6 + (i % 3) * 3}px`
                  }}
                >
                  <span>H₂</span>
                </div>
              ))}
            </div>
          )}
        </div>
        
        {/* Nhãn trạng thái */}
        <div className="beaker-label">
          {stage === 'ready' && 'Cốc axit HCl'}
          {stage === 'reacting' && 'Đang phản ứng...'}
          {stage === 'complete' && 'Phản ứng xong'}
        </div>
      </div>

      {/* Hiện tượng quan sát */}
      {stage !== 'ready' && (
        <div className="acid-observation">
          <div className={`obs-item ${progress > 20 ? 'show' : ''}`}>
            💨 Có bọt khí H₂ sủi lên
          </div>
          <div className={`obs-item ${progress > 50 ? 'show' : ''}`}>
            🔩 Kẽm tan dần trong axit
          </div>
          <div className={`obs-item ${stage === 'complete' ? 'show' : ''}`}>
            💧 Tạo dung dịch ZnCl₂
          </div>
        </div>
      )}

      {/* Phương trình khi hoàn thành */}
      {isComplete && (
        <div className="acid-equation">
          Zn + 2HCl → ZnCl₂ + H₂↑
        </div>
      )}
    </div>
  );
};

// Thí nghiệm so sánh dãy hoạt động - 4 ống nghiệm với HCl
const ActivitySeriesExperiment = ({ experiment, progress, isComplete }) => {
  const testTubes = [
    { name: 'Na', color: '#e5e5e5', activity: 'very-high', label: 'Rất mạnh', bubbleCount: 12 },
    { name: 'Fe', color: '#71717a', activity: 'medium', label: 'Trung bình', bubbleCount: 5 },
    { name: 'Cu', color: '#b87333', activity: 'low', label: 'Không PƯ', bubbleCount: 0 },
    { name: 'Ag', color: '#c0c0c0', activity: 'very-low', label: 'Không PƯ', bubbleCount: 0 }
  ];

  return (
    <div className="experiment-container activity-exp-simple">
      {/* Tiêu đề */}
      <div className="activity-title">Cho kim loại vào dung dịch HCl loãng</div>
      
      {/* 4 ống nghiệm */}
      <div className="test-tubes-row">
        {testTubes.map((metal, idx) => {
          const isActive = progress > (idx + 1) * 20;
          return (
            <div key={metal.name} className="test-tube-item">
              {/* Ống nghiệm */}
              <div className={`test-tube ${isActive ? 'active' : ''}`}>
                {/* Dung dịch HCl */}
                <div className="hcl-solution">
                  {/* Kim loại */}
                  <div 
                    className={`metal-piece-tube ${isActive ? 'dropped' : ''}`}
                    style={{ '--metal-color': metal.color }}
                  >
                    {metal.name}
                  </div>
                  
                  {/* Bọt khí H₂ */}
                  {isActive && metal.bubbleCount > 0 && (
                    <div className="bubbles-container">
                      {[...Array(metal.bubbleCount)].map((_, i) => (
                        <div 
                          key={i} 
                          className="h2-bubble"
                          style={{ 
                            '--delay': `${i * 0.15}s`,
                            '--left': `${15 + (i % 4) * 20}%`,
                            '--size': `${4 + (i % 3) * 2}px`
                          }}
                        />
                      ))}
                    </div>
                  )}
                </div>
              </div>
              
              {/* Nhãn */}
              <div className="tube-label">{metal.name}</div>
              <div className={`activity-badge ${metal.activity}`}>
                {metal.label}
              </div>
            </div>
          );
        })}
      </div>
      
      {/* Dãy hoạt động */}
      {isComplete && (
        <div className="series-result">
          <div className="series-line">
            <span className="strong-side">Mạnh</span>
            <div className="series-metals">
              <span className="active-metal">K</span>
              <span className="active-metal">Na</span>
              <span className="active-metal">Ca</span>
              <span className="active-metal">Mg</span>
              <span className="active-metal">Al</span>
              <span className="active-metal">Zn</span>
              <span className="active-metal">Fe</span>
              <span className="h-divider">H</span>
              <span className="inactive-metal">Cu</span>
              <span className="inactive-metal">Ag</span>
              <span className="inactive-metal">Au</span>
            </div>
            <span className="weak-side">Yếu</span>
          </div>
          <div className="series-note">Kim loại đứng trước H đẩy được H₂ ra khỏi axit</div>
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
    case 'summary':
      return <AcidTestExperiment experiment={experiment} progress={progress} isComplete={isComplete} />;
    default:
      return null;
  }
};

// ================== MAIN COMPONENT ==================
const Bai15_KIM_LOAI = () => {
  const navigate = useNavigate();
  const { hasProgress, saveProgress, clearProgress, getProgress, completeChallenge } = useChallengeProgress('kim-loai-9-bai15', {
    challengeId: 15,
    programId: 'chemistry',
    grade: 9
  });

  // States for completion tracking
  const [startTime] = useState(() => Date.now());
  const [isCompleted, setIsCompleted] = useState(false);

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
  
  // Hàng đợi làm lại các câu sai
  const [retryQueue, setRetryQueue] = useState([]);
  const [isRetryMode, setIsRetryMode] = useState(false);
  const [retryIndex, setRetryIndex] = useState(0);

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
        answeredCorrectly,
        // Lưu thêm trạng thái thí nghiệm và câu trả lời
        experimentProgress,
        isExperimentComplete,
        selectedAnswer,
        isAnswerSubmitted,
        showHint,
        // Lưu trạng thái retry
        retryQueue,
        isRetryMode,
        retryIndex
      });
    }
  }, [currentChallenge, score, completedChallenges, answeredCorrectly, gameStarted, showResults, experimentProgress, isExperimentComplete, selectedAnswer, isAnswerSubmitted, showHint, retryQueue, isRetryMode, retryIndex]);

  const startGame = useCallback((fromBeginning = false) => {
    if (fromBeginning) {
      clearProgress();
      setCurrentChallenge(0);
      setScore(0);
      setCompletedChallenges([]);
      setAnsweredCorrectly([]);
      setRetryQueue([]);
      setIsRetryMode(false);
      setRetryIndex(0);
      resetQuestion();
    } else {
      const saved = getProgress();
      if (saved) {
        setCurrentChallenge(saved.currentChallenge || 0);
        setScore(saved.score || 0);
        setCompletedChallenges(saved.completedChallenges || []);
        setAnsweredCorrectly(saved.answeredCorrectly || []);
        // Khôi phục trạng thái thí nghiệm và câu trả lời
        setExperimentProgress(saved.experimentProgress || 0);
        setIsExperimentComplete(saved.isExperimentComplete || false);
        setIsExperimentRunning(false);
        setSelectedAnswer(saved.selectedAnswer || null);
        setIsAnswerSubmitted(saved.isAnswerSubmitted || false);
        setShowHint(saved.showHint || false);
        // Khôi phục trạng thái retry
        setRetryQueue(saved.retryQueue || []);
        setIsRetryMode(saved.isRetryMode || false);
        setRetryIndex(saved.retryIndex || 0);
      } else {
        resetQuestion();
      }
    }
    setGameStarted(true);
    setShowResults(false);
    setShowResumeDialog(false);
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
    if (!selectedAnswer || !isExperimentComplete) return;
    setIsAnswerSubmitted(true);

    const isCorrect = selectedAnswer === challenge.correctAnswer;
    
    if (isRetryMode) {
      // Trong chế độ làm lại - không tính điểm
      if (isCorrect) {
        // Đúng rồi - xóa khỏi hàng đợi
        setRetryQueue(prev => prev.filter((_, idx) => idx !== retryIndex));
      }
      // Sai vẫn giữ trong hàng đợi, sẽ làm lại
    } else {
      // Chế độ bình thường
      if (isCorrect) {
        setScore(prev => prev + challenge.points);
        setAnsweredCorrectly(prev => [...prev, currentChallenge]);
      } else {
        // Sai - thêm vào hàng đợi làm lại
        setRetryQueue(prev => [...prev, currentChallenge]);
      }
    }
    setCompletedChallenges(prev => 
      prev.includes(currentChallenge) ? prev : [...prev, currentChallenge]
    );
  };

  const nextChallenge = () => {
    if (isRetryMode) {
      // Đang trong chế độ làm lại
      if (retryQueue.length === 0) {
        // Đã làm lại hết - hiện kết quả
        setShowResults(true);
        setGameStarted(false);
        clearProgress();
        // Lưu kết quả khi hoàn thành
        if (!isCompleted) {
          setIsCompleted(true);
          const percentage = Math.round((score / TOTAL_POINTS) * 100);
          const stars = percentage >= 80 ? 3 : percentage >= 50 ? 2 : 1;
          completeChallenge({
            score,
            maxScore: TOTAL_POINTS,
            percentage,
            stars,
            timeSpent: Math.floor((Date.now() - startTime) / 1000),
            correctAnswers: answeredCorrectly.length,
            totalQuestions: CHALLENGES.length
          });
        }
      } else {
        // Chuyển sang câu tiếp theo trong hàng đợi
        const nextRetryIdx = retryIndex >= retryQueue.length ? 0 : retryIndex;
        setRetryIndex(nextRetryIdx);
        setCurrentChallenge(retryQueue[nextRetryIdx]);
        resetQuestion();
      }
    } else {
      // Chế độ bình thường
      if (currentChallenge < CHALLENGES.length - 1) {
        setCurrentChallenge(prev => prev + 1);
        resetQuestion();
      } else {
        // Đã hoàn thành tất cả câu hỏi
        if (retryQueue.length > 0) {
          // Có câu sai - vào chế độ làm lại
          setIsRetryMode(true);
          setRetryIndex(0);
          setCurrentChallenge(retryQueue[0]);
          resetQuestion();
        } else {
          // Không có câu sai - hiện kết quả
          setShowResults(true);
          setGameStarted(false);
          clearProgress();
          // Lưu kết quả khi hoàn thành
          if (!isCompleted) {
            setIsCompleted(true);
            const percentage = Math.round((score / TOTAL_POINTS) * 100);
            const stars = percentage >= 80 ? 3 : percentage >= 50 ? 2 : 1;
            completeChallenge({
              score,
              maxScore: TOTAL_POINTS,
              percentage,
              stars,
              timeSpent: Math.floor((Date.now() - startTime) / 1000),
              correctAnswers: answeredCorrectly.length,
              totalQuestions: CHALLENGES.length
            });
          }
        }
      }
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
    setRetryQueue([]);
    setIsRetryMode(false);
    setRetryIndex(0);
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
            show={showResumeDialog}
            onResume={() => startGame(false)}
            onRestart={() => startGame(true)}
            progressInfo={{
              current: (getProgress()?.currentChallenge || 0) + 1,
              total: CHALLENGES.length,
              score: getProgress()?.score || 0
            }}
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
           
            {isExperimentComplete && (
              <div className="phenomenon-box">
                <Lightbulb size={16} />
                <span>{challenge.phenomenon}</span>
              </div>
            )}
            
            <p className="question-text">{challenge.question}</p>
            
            <div className={`options-grid ${!isExperimentComplete ? 'pre-experiment' : ''}`}>
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
          </div>
        </div>
      </div>

      {/* Bottom Navigation Bar */}
      <div className="bottom-bar">
        <div className="bottom-left">
          {isRetryMode && (
            <div className="retry-badge">
              🔄 Làm lại ({retryQueue.length} câu)
            </div>
          )}
        </div>
        
        <div className="action-buttons">
          {!isAnswerSubmitted ? (
            <>
              <button 
                className="btn-submit"
                onClick={checkAnswer}
                disabled={!selectedAnswer || !isExperimentComplete}
              >
                <CheckCircle2 size={18} /> Kiểm tra
              </button>
              {!isExperimentComplete && (
                <div className="action-hint">
                  <Play size={16} /> Chạy thí nghiệm để kiểm tra đáp án
                </div>
              )}
            </>
          ) : (
            <button className="btn-next" onClick={nextChallenge}>
              {isRetryMode ? (
                retryQueue.length > 1 ? (
                  <>Câu tiếp <ChevronRight size={18} /></>
                ) : (
                  <>Xem kết quả <Trophy size={18} /></>
                )
              ) : currentChallenge < CHALLENGES.length - 1 ? (
                <>Tiếp theo <ChevronRight size={18} /></>
              ) : retryQueue.length > 0 ? (
                <>Làm lại câu sai <RotateCcw size={18} /></>
              ) : (
                <>Xem kết quả <Trophy size={18} /></>
              )}
            </button>
          )}
        </div>
        
        <div className="bottom-right">
          {!isRetryMode && (
            <div className="progress-text">
              {currentChallenge + 1}/{CHALLENGES.length}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Bai15_KIM_LOAI;
