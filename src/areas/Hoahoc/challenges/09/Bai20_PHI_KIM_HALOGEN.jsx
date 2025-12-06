import React, { useState, useEffect, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  ArrowLeft, Trophy, Play, RotateCcw, ChevronRight,
  CheckCircle2, XCircle, Lightbulb, HelpCircle, Zap, Award,
  FlaskConical, Beaker, Flame, Sparkles, Droplet, Wind
} from 'lucide-react';
import useChallengeProgress from '../../../../hooks/useChallengeProgress';
import ResumeDialog from '../../../../components/ResumeDialog';
import './CSS/Bai20_PHI_KIM_HALOGEN.css';

// ================== DATA ==================
const CHALLENGES = [
  {
    id: 1,
    type: 'chlorine-properties',
    title: 'Tính chất của Clo (Cl₂)',
    description: 'Quan sát khí clo và tính chất hóa học cơ bản.',
    question: 'Khí Clo có màu gì và mùi như thế nào?',
    options: ['Không màu, không mùi', 'Vàng lục, mùi hắc', 'Nâu đỏ, mùi thơm', 'Tím, không mùi'],
    correctAnswer: 'Vàng lục, mùi hắc',
    equation: 'Cl₂ - Chất khí màu vàng lục',
    phenomenon: 'Clo là chất khí màu vàng lục, mùi hắc, độc, nặng hơn không khí 2,5 lần.',
    hint: 'Khí clo có màu đặc trưng, dễ nhận biết qua màu sắc.',
    difficulty: 'easy',
    points: 15,
    color: '#84cc16',
    gradient: 'linear-gradient(135deg, #84cc16, #a3e635)',
    icon: Wind,
    experiment: {
      type: 'chlorine-gas',
      gas: { name: 'Cl₂', color: '#bef264' }
    }
  },
  {
    id: 2,
    type: 'chlorine-bromide',
    title: 'Clo đẩy Brom ra khỏi muối',
    description: 'Sục khí Clo vào dung dịch NaBr - phản ứng thế halogen.',
    question: 'Khi sục khí Cl₂ vào dung dịch NaBr, hiện tượng quan sát được là gì?',
    options: ['Dung dịch chuyển sang màu xanh', 'Dung dịch chuyển sang màu nâu đỏ', 'Dung dịch mất màu', 'Không có hiện tượng'],
    correctAnswer: 'Dung dịch chuyển sang màu nâu đỏ',
    equation: 'Cl₂ + 2NaBr → 2NaCl + Br₂',
    phenomenon: 'Dung dịch NaBr (không màu) chuyển dần sang màu nâu đỏ do Br₂ được giải phóng. Clo mạnh hơn đẩy brom ra khỏi muối.',
    hint: 'Halogen mạnh hơn đẩy halogen yếu hơn ra khỏi dung dịch muối: Cl₂ > Br₂ > I₂.',
    difficulty: 'medium',
    points: 20,
    color: '#06b6d4',
    gradient: 'linear-gradient(135deg, #06b6d4, #22d3ee)',
    icon: Beaker,
    experiment: {
      type: 'cl2-nabr-reaction',
      reactants: [
        { name: 'Cl₂', color: '#bef264' },
        { name: 'NaBr (dd)', color: 'transparent' }
      ],
      product: { name: 'Br₂', color: '#dc2626' }
    }
  },
  {
    id: 3,
    type: 'chlorine-metal',
    title: 'Clo tác dụng với Kim loại',
    description: 'Đốt bột sắt trong khí clo.',
    question: 'Khi đốt nóng bột sắt trong khí clo, sản phẩm tạo thành là gì?',
    options: ['FeCl₂', 'FeCl₃', 'Fe₂O₃', 'FeO'],
    correctAnswer: 'FeCl₃',
    equation: '2Fe + 3Cl₂ →(t°)→ 2FeCl₃',
    phenomenon: 'Sắt cháy sáng trong khí clo, tạo khói nâu đỏ FeCl₃.',
    hint: 'Clo có tính oxi hóa mạnh, đưa Fe lên hóa trị cao nhất.',
    difficulty: 'medium',
    points: 20,
    color: '#ef4444',
    gradient: 'linear-gradient(135deg, #ef4444, #f87171)',
    icon: Sparkles,
    experiment: {
      type: 'fe-cl2-reaction',
      metal: { name: 'Fe', color: '#71717a' },
      gas: { name: 'Cl₂', color: '#bef264' },
      product: { name: 'FeCl₃', color: '#b45309' }
    }
  },
  {
    id: 4,
    type: 'hcl-properties',
    title: 'Axit Clohiđric (HCl)',
    description: 'Tìm hiểu về tính chất của axit HCl.',
    question: 'Axit HCl tác dụng với kim loại nào sau đây?',
    options: ['Cu', 'Ag', 'Zn', 'Au'],
    correctAnswer: 'Zn',
    equation: 'Zn + 2HCl → ZnCl₂ + H₂↑',
    phenomenon: 'Zn tan dần, có bọt khí H₂ sủi lên. Cu, Ag, Au không phản ứng vì đứng sau H.',
    hint: 'Chỉ kim loại đứng trước H trong dãy hoạt động mới đẩy được H₂.',
    difficulty: 'easy',
    points: 15,
    color: '#f97316',
    gradient: 'linear-gradient(135deg, #f97316, #fb923c)',
    icon: Beaker,
    experiment: {
      type: 'hcl-metal',
      metals: [
        { name: 'Zn', color: '#a1a1aa', reacts: true },
        { name: 'Cu', color: '#b87333', reacts: false },
        { name: 'Ag', color: '#c0c0c0', reacts: false }
      ],
      acid: { name: 'HCl', color: '#fecaca' }
    }
  },
  {
    id: 5,
    type: 'nacl-electrolysis',
    title: 'Muối NaCl và điện phân',
    description: 'Điện phân dung dịch NaCl để điều chế Cl₂.',
    question: 'Khi điện phân dung dịch NaCl có màng ngăn, sản phẩm thu được là?',
    options: ['Na và Cl₂', 'NaOH, Cl₂ và H₂', 'HCl và NaOH', 'Chỉ có Cl₂'],
    correctAnswer: 'NaOH, Cl₂ và H₂',
    equation: '2NaCl + 2H₂O →(đp có màng ngăn)→ 2NaOH + Cl₂↑ + H₂↑',
    phenomenon: 'Ở catot: thoát khí H₂. Ở anot: thoát khí Cl₂ màu vàng lục.',
    hint: 'Điện phân dung dịch NaCl tạo 3 sản phẩm, không phải kim loại Na.',
    difficulty: 'hard',
    points: 25,
    color: '#8b5cf6',
    gradient: 'linear-gradient(135deg, #8b5cf6, #a78bfa)',
    icon: Zap,
    experiment: {
      type: 'electrolysis',
      reactant: { name: 'NaCl (dd)', color: '#e0e7ff' },
      products: [
        { name: 'NaOH', location: 'catot', color: '#dbeafe' },
        { name: 'H₂', location: 'catot', color: '#93c5fd' },
        { name: 'Cl₂', location: 'anot', color: '#bef264' }
      ]
    }
  },
  {
    id: 6,
    type: 'halogen-compare',
    title: 'So sánh các Halogen',
    description: 'So sánh tính chất của F, Cl, Br, I.',
    question: 'Trong nhóm Halogen, nguyên tố nào có tính oxi hóa mạnh nhất?',
    options: ['Flo (F₂)', 'Clo (Cl₂)', 'Brom (Br₂)', 'Iot (I₂)'],
    correctAnswer: 'Flo (F₂)',
    equation: 'Tính oxi hóa: F₂ > Cl₂ > Br₂ > I₂',
    phenomenon: 'F₂ là phi kim mạnh nhất, oxi hóa được cả H₂O. Tính oxi hóa giảm dần từ F đến I.',
    hint: 'Halogen càng nhỏ (số hiệu nguyên tử nhỏ) càng hoạt động mạnh.',
    difficulty: 'medium',
    points: 20,
    color: '#ec4899',
    gradient: 'linear-gradient(135deg, #ec4899, #f472b6)',
    icon: Award,
    experiment: {
      type: 'halogen-series',
      halogens: [
        { name: 'F₂', color: '#fef3c7', state: 'Khí vàng nhạt', activity: 'Rất mạnh' },
        { name: 'Cl₂', color: '#bef264', state: 'Khí vàng lục', activity: 'Mạnh' },
        { name: 'Br₂', color: '#dc2626', state: 'Lỏng nâu đỏ', activity: 'TB' },
        { name: 'I₂', color: '#7c3aed', state: 'Rắn tím', activity: 'Yếu' }
      ]
    }
  }
];

const TOTAL_POINTS = CHALLENGES.reduce((sum, c) => sum + c.points, 0);

// ================== EXPERIMENT COMPONENTS ==================

// Thí nghiệm quan sát khí Clo
const ChlorineGasExperiment = ({ experiment, progress, isComplete }) => {
  const stage = progress < 30 ? 'ready' : progress < 70 ? 'filling' : 'complete';
  
  return (
    <div className="experiment-container chlorine-exp">
      <div className="gas-jar-area">
        {/* Bình chứa khí Clo */}
        <div className={`gas-jar ${stage}`}>
          <div className="jar-glass">
            {/* Khí Clo màu vàng lục */}
            <div 
              className="chlorine-gas-fill"
              style={{ 
                '--fill-height': stage === 'ready' ? '0%' : stage === 'filling' ? `${progress}%` : '100%',
                '--gas-color': experiment.gas.color
              }}
            >
              {stage !== 'ready' && (
                <div className="gas-particles">
                  {[...Array(8)].map((_, i) => (
                    <div key={i} className="cl2-particle" style={{ '--i': i }}>Cl₂</div>
                  ))}
                </div>
              )}
            </div>
          </div>
          <div className="jar-cap"></div>
         
        </div>

        
      </div>

      {isComplete && (
        <div className="warning-box">
          ⚠️ Clo là chất khí độc - không ngửi trực tiếp!
        </div>
      )}
    </div>
  );
};

// Thí nghiệm Cl₂ + NaBr (phản ứng thế halogen)
const Cl2NaBrReactionExperiment = ({ experiment, progress, isComplete }) => {
  const stage = progress < 25 ? 'ready' : progress < 60 ? 'bubbling' : progress < 85 ? 'reacting' : 'complete';
  const colorIntensity = Math.min(progress, 100);
  
  return (
    <div className="experiment-container cl2nabr-exp">
      <div className="displacement-setup">
        {/* Ống sục khí từ trên xuống vào dung dịch */}
        <div className={`gas-tube-vertical ${stage !== 'ready' ? 'active' : ''}`}>
          <div className="tube-top">
            <span className="gas-source">Cl₂</span>
          </div>
          <div className="tube-pipe"></div>
          <div className="tube-end">
            {stage !== 'ready' && (
              <div className="bubbles-from-tube">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="bubble-out" style={{ animationDelay: `${i * 0.2}s` }}></div>
                ))}
              </div>
            )}
          </div>
        </div>
        
        {/* Cốc chứa dung dịch NaBr */}
        <div className="water-container-below">
          <div className="beaker-body-mix large">
            <div 
              className="liquid-mix" 
              style={{ 
                background: stage === 'ready' ? 'transparent' : 
                           stage === 'bubbling' ? 'rgba(252, 165, 165, 0.3)' :
                           stage === 'reacting' ? 'rgba(220, 38, 38, 0.6)' :
                           experiment.product.color,
                height: '70%',
                transition: 'background 0.8s ease'
              }}
            >
              {stage === 'ready' && (
                <span className="solution-label-center">NaBr (dd)</span>
              )}
              
              {(stage === 'bubbling' || stage === 'reacting') && (
                <div className="bubbles-container">
                  {[...Array(8)].map((_, i) => (
                    <div 
                      key={i} 
                      className="bubble-rise small" 
                      style={{ 
                        left: `${40 + (i % 3) * 6}%`,
                        animationDelay: `${i * 0.15}s` 
                      }}
                    >
                      {i % 3 === 0 && <span className="bubble-label">Cl₂</span>}
                    </div>
                  ))}
                </div>
              )}
              
              {(stage === 'reacting' || stage === 'complete') && (
                <div className="br2-diffusion">
                  {[...Array(10)].map((_, i) => (
                    <div 
                      key={i} 
                      className="br2-particle-float"
                      style={{ 
                        left: `${15 + (i % 4) * 20}%`,
                        top: `${25 + Math.floor(i / 4) * 25}%`,
                        animationDelay: `${i * 0.18}s`
                      }}
                    >
                      Br₂
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
          <span className="beaker-name">Dung dịch NaBr</span>
        </div>
      </div>

      {/* Hiện tượng quan sát */}
      <div className="reaction-observations">
        <div className={`obs-item ${progress > 25 ? 'show' : ''}`}>
          🧪 Khí Cl₂ sục từ trên xuống
        </div>
        <div className={`obs-item ${progress > 50 ? 'show' : ''}`}>
          🟤 Dung dịch chuyển dần sang màu nâu đỏ
        </div>
        <div className={`obs-item ${isComplete ? 'show' : ''}`}>
          ✅ Br₂ được giải phóng (Cl₂  Br₂)
        </div>
      </div>
    </div>



  );
};

// Thí nghiệm Fe + Cl₂ (đốt bột sắt trong bình khí Clo)
const FeCl2ReactionExperiment = ({ experiment, progress, isComplete }) => {
  const stage = progress < 25 ? 'ready' : progress < 50 ? 'falling' : progress < 75 ? 'burning' : 'complete';
  
  return (
    <div className="experiment-container fecl-exp">
      <div className="fecl-setup-vertical">
        {/* Bột sắt rơi từ trên xuống */}
        <div className={`falling-iron ${stage !== 'ready' ? 'falling' : ''} ${stage === 'complete' ? 'dissolved' : ''}`}>
          <div className="iron-piece-falling" style={{ '--metal-color': experiment.metal.color }}>
            <span className="iron-name">Fe</span>
          </div>
        </div>
        
        {/* Bình khí Clo bên dưới */}
        <div className="cl2-flask-below">
          <div className="flask-body-mix large">
            <div 
              className="cl2-gas-mix" 
              style={{ 
                background: stage === 'ready' ? 'linear-gradient(180deg, #d9f99d, #a3e635)' :
                           stage === 'falling' ? 'linear-gradient(180deg, #d9f99d, #a3e635)' :
                           stage === 'burning' ? 'linear-gradient(180deg, #facc15, #f97316)' :
                           `linear-gradient(180deg, ${experiment.product.color}, #4a2f0c)`,
                height: '75%',
                transition: 'background 0.8s ease'
              }}
            >
              {stage !== 'complete' && (
                <span className="gas-label-inside" style={{ color: '#14532d' }}>Cl₂</span>
              )}
              
              {/* Hiệu ứng cháy sáng */}
              {stage === 'burning' && (
                <div className="burning-effect-center">
                  {[...Array(8)].map((_, i) => (
                    <div key={i} className="spark-particle" style={{ 
                      '--angle': `${i * 45}deg`,
                      animationDelay: `${i * 0.1}s` 
                    }}></div>
                  ))}
                  <div className="fire-glow">🔥</div>
                </div>
              )}
              
              {/* Khói FeCl₃ */}
              {(stage === 'burning' || stage === 'complete') && (
                <div className="fecl3-smoke-rise">
                  {[...Array(15)].map((_, i) => (
                    <div key={i} className="smoke-particle-rise" style={{ 
                      left: `${10 + (i * 13) % 80}%`,
                      animationDelay: `${i * 0.15}s` 
                    }}></div>
                  ))}
                </div>
              )}
            </div>
          </div>
          <span className="flask-name">Bình khí Clo</span>
        </div>
      </div>

      <div className="fecl-observations">
        <div className={`obs-item ${progress > 25 ? 'show' : ''}`}>
          ⬇️ Đốt bột Fe rơi vào bình Cl₂
        </div>
        <div className={`obs-item ${progress > 50 ? 'show' : ''}`}>
          🔥 Sắt cháy sáng mạnh, tỏa nhiệt
        </div>
        <div className={`obs-item ${isComplete ? 'show' : ''}`}>
          🟤 Khói nâu đỏ FeCl₃
        </div>
      </div>
    </div>
  );
};

// Thí nghiệm HCl + Kim loại
const HClMetalExperiment = ({ experiment, progress, isComplete }) => {
  return (
    <div className="experiment-container hcl-metal-exp">
      <div className="hcl-title">Cho kim loại vào dung dịch HCl</div>
      
      <div className="test-tubes-row">
        {experiment.metals.map((metal, idx) => {
          const isActive = progress > (idx + 1) * 30;
          return (
            <div key={metal.name} className="test-tube-item">
              <div className={`test-tube ${isActive ? 'active' : ''}`}>
                {/* Dung dịch HCl */}
                <div className="hcl-solution" style={{ '--acid-color': experiment.acid.color }}>
                  {/* Kim loại */}
                  <div 
                    className={`metal-piece-tube ${isActive ? 'dropped' : ''}`}
                    style={{ '--metal-color': metal.color }}
                  >
                    {metal.name}
                  </div>
                  
                  {/* Bọt khí H₂ nếu phản ứng */}
                  {isActive && metal.reacts && (
                    <div className="bubbles-container">
                      {[...Array(8)].map((_, i) => (
                        <div 
                          key={i} 
                          className="h2-bubble"
                          style={{ 
                            '--delay': `${i * 0.15}s`,
                            '--left': `${20 + (i % 4) * 18}%`,
                            '--size': `${5 + (i % 3) * 2}px`
                          }}
                        />
                      ))}
                    </div>
                  )}
                </div>
              </div>
              
              <div className="tube-label">{metal.name}</div>
              <div className={`reaction-badge ${metal.reacts ? 'reacts' : 'no-react'}`}>
                {isActive && (metal.reacts ? '✓ Có H₂' : '✗ Không PƯ')}
              </div>
            </div>
          );
        })}
      </div>
      
      {isComplete && (
        <div className="hcl-conclusion">
          💡 Chỉ kim loại đứng trước H trong dãy hoạt động mới đẩy được H₂
        </div>
      )}
    </div>
  );
};

// Thí nghiệm điện phân NaCl
const ElectrolysisExperiment = ({ experiment, progress, isComplete }) => {
  const stage = progress < 20 ? 'ready' : progress < 80 ? 'running' : 'complete';
  
  return (
    <div className="experiment-container electrolysis-exp">
      <div className="electrolysis-cell">
        {/* Nguồn điện */}
        <div className="power-source">
          <div className="battery">
            <span className="plus">+</span>
            <span className="minus">−</span>
          </div>
          <div className="wires">
            <div className="wire left"></div>
            <div className="wire right"></div>
          </div>
        </div>

        {/* Bể điện phân */}
        <div className="electrolysis-tank">
          <div className="nacl-solution" style={{ '--solution-color': experiment.reactant.color }}>
            <span className="solution-label">NaCl (dd)</span>
            
            {/* Màng ngăn */}
            <div className="membrane">
              <span>Màng ngăn</span>
            </div>
            
            {/* Catot (−) */}
            <div className="electrode catot">
              <div className="electrode-rod"></div>
              <span className="electrode-label">Catot (−)</span>
              {stage !== 'ready' && (
                <div className="electrode-bubbles h2-bubbles">
                  {[...Array(6)].map((_, i) => (
                    <div key={i} className="e-bubble" style={{ '--i': i }}>H₂</div>
                  ))}
                </div>
              )}
            </div>
            
            {/* Anot (+) */}
            <div className="electrode anot">
              <div className="electrode-rod"></div>
              <span className="electrode-label">Anot (+)</span>
              {stage !== 'ready' && (
                <div className="electrode-bubbles cl2-bubbles">
                  {[...Array(6)].map((_, i) => (
                    <div key={i} className="e-bubble cl2" style={{ '--i': i }}>Cl₂</div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="electrolysis-products">
        <div className={`product-item ${progress > 30 ? 'show' : ''}`}>
          <div className="product-icon h2">H₂</div>
          <span>Catot: Khí H₂</span>
        </div>
        <div className={`product-item ${progress > 50 ? 'show' : ''}`}>
          <div className="product-icon cl2">Cl₂</div>
          <span>Anot: Khí Cl₂</span>
        </div>
        <div className={`product-item ${isComplete ? 'show' : ''}`}>
          <div className="product-icon naoh">NaOH</div>
          <span>Catot: NaOH</span>
        </div>
      </div>
    </div>
  );
};

// Thí nghiệm so sánh các Halogen
const HalogenSeriesExperiment = ({ experiment, progress, isComplete }) => {
  return (
    <div className="experiment-container halogen-series-exp">
      <div className="halogen-title">Các nguyên tố Halogen</div>
      
      <div className="halogen-cards">
        {experiment.halogens.map((halogen, idx) => {
          const isRevealed = progress > (idx + 1) * 20;
          return (
            <div 
              key={halogen.name} 
              className={`halogen-card ${isRevealed ? 'revealed' : ''}`}
              style={{ '--halogen-color': halogen.color, '--delay': `${idx * 0.15}s` }}
            >
              <div className="halogen-sample">
                <span>{halogen.name}</span>
              </div>
              <div className="halogen-info">
                <div className="halogen-state">{halogen.state}</div>
                <div className={`halogen-activity ${halogen.activity.toLowerCase().replace(' ', '-')}`}>
                  {halogen.activity}
                </div>
              </div>
            </div>
          );
        })}
      </div>
      
      {isComplete && (
        <div className="halogen-order">
          <div className="order-label">Tính oxi hóa giảm dần:</div>
          <div className="order-sequence">
            <span className="h-strong">F₂</span>
            <span className="arrow">→</span>
            <span className="h-medium">Cl₂</span>
            <span className="arrow">→</span>
            <span className="h-weak">Br₂</span>
            <span className="arrow">→</span>
            <span className="h-very-weak">I₂</span>
          </div>
        </div>
      )}
    </div>
  );
};

// Render experiment based on type
const ExperimentRenderer = ({ challenge, progress, isComplete }) => {
  const { experiment, type } = challenge;
  
  switch (type) {
    case 'chlorine-properties':
      return <ChlorineGasExperiment experiment={experiment} progress={progress} isComplete={isComplete} />;
    case 'chlorine-bromide':
      return <Cl2NaBrReactionExperiment experiment={experiment} progress={progress} isComplete={isComplete} />;
    case 'chlorine-metal':
      return <FeCl2ReactionExperiment experiment={experiment} progress={progress} isComplete={isComplete} />;
    case 'hcl-properties':
      return <HClMetalExperiment experiment={experiment} progress={progress} isComplete={isComplete} />;
    case 'nacl-electrolysis':
      return <ElectrolysisExperiment experiment={experiment} progress={progress} isComplete={isComplete} />;
    case 'halogen-compare':
      return <HalogenSeriesExperiment experiment={experiment} progress={progress} isComplete={isComplete} />;
    default:
      return null;
  }
};

// ================== MAIN COMPONENT ==================
const Bai20_PHI_KIM_HALOGEN = () => {
  const navigate = useNavigate();
  const { hasProgress, saveProgress, clearProgress, getProgress } = useChallengeProgress('phi-kim-halogen-9-bai20');

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
        experimentProgress,
        isExperimentComplete,
        selectedAnswer,
        isAnswerSubmitted,
        showHint,
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
        setExperimentProgress(saved.experimentProgress || 0);
        setIsExperimentComplete(saved.isExperimentComplete || false);
        setIsExperimentRunning(false);
        setSelectedAnswer(saved.selectedAnswer || null);
        setIsAnswerSubmitted(saved.isAnswerSubmitted || false);
        setShowHint(saved.showHint || false);
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
    if (!selectedAnswer) return;
    setIsAnswerSubmitted(true);

    const isCorrect = selectedAnswer === challenge.correctAnswer;
    
    if (isRetryMode) {
      if (isCorrect) {
        setRetryQueue(prev => prev.filter((_, idx) => idx !== retryIndex));
      }
    } else {
      if (isCorrect) {
        setScore(prev => prev + challenge.points);
        setAnsweredCorrectly(prev => [...prev, currentChallenge]);
      } else {
        setRetryQueue(prev => [...prev, currentChallenge]);
      }
    }
    setCompletedChallenges(prev => 
      prev.includes(currentChallenge) ? prev : [...prev, currentChallenge]
    );
  };

  const nextChallenge = () => {
    if (isRetryMode) {
      if (retryQueue.length === 0) {
        setShowResults(true);
        setGameStarted(false);
        clearProgress();
      } else {
        const nextRetryIdx = retryIndex >= retryQueue.length ? 0 : retryIndex;
        setRetryIndex(nextRetryIdx);
        setCurrentChallenge(retryQueue[nextRetryIdx]);
        resetQuestion();
      }
    } else {
      if (currentChallenge < CHALLENGES.length - 1) {
        setCurrentChallenge(prev => prev + 1);
        resetQuestion();
      } else {
        if (retryQueue.length > 0) {
          setIsRetryMode(true);
          setRetryIndex(0);
          setCurrentChallenge(retryQueue[0]);
          resetQuestion();
        } else {
          setShowResults(true);
          setGameStarted(false);
          clearProgress();
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
      <div className="halogen-game">
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
      <div className="halogen-game">
        <div className="start-container">
          <Link to="/advanced-challenge" className="back-link">
            <ArrowLeft size={20} /> Quay lại
          </Link>
          
          <div className="start-card">
            <div className="start-header">
              <div className="start-icon">🧪</div>
              <h1>Phi Kim - Halogen</h1>
              <p>Khám phá tính chất của phi kim và nhóm Halogen qua thí nghiệm mô phỏng</p>
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
                <span>Lớp 9 - Chương Phi kim</span>
              </div>
            </div>
            
            <div className="topics-list">
              <h3>Các chủ đề:</h3>
              <ul>
                <li>✓ Tính chất của Clo (Cl₂)</li>
                <li>✓ Clo tác dụng với H₂ và kim loại</li>
                <li>✓ Axit Clohiđric (HCl)</li>
                <li>✓ Muối NaCl và điện phân</li>
                <li>✓ So sánh các Halogen (F, Cl, Br, I)</li>
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
    <div className="halogen-game fullscreen">
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
        <div className="bottom-left">
          {isRetryMode && (
            <div className="retry-badge">
              🔄 Làm lại ({retryQueue.length} câu)
            </div>
          )}
        </div>
        
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
          ) : (
            <div className="status-hint">
              <Play size={16} /> Chạy thí nghiệm để tiếp tục
            </div>
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

export default Bai20_PHI_KIM_HALOGEN;
