import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  Play,
  RotateCcw,
  CheckCircle2,
  XCircle,
  Trophy,
  HelpCircle,
  FlaskConical,
  Beaker,
  Sparkles,
  Atom,
  Droplet,
  Layers,
  Leaf,
  GraduationCap,
  Zap
} from 'lucide-react';
import useChallengeProgress from '../../../../hooks/useChallengeProgress';
import ResumeDialog from '../../../../components/ResumeDialog';
import './CSS/Bai34_HIDROCACBON_POLIME.css';

// ================== DATA ==================
const CHALLENGES = [
  {
    id: 1,
    type: 'ethanol',
    title: 'Ancol etylic (C₂H₅OH)',
    description: 'Quan sát phản ứng của ancol etylic với natri và khi cháy.',
    question: 'Hiện tượng chính khi nhỏ vài giọt ancol etylic vào mẩu natri kim loại là gì?',
    options: [
      'Natri tan dần và có khí H₂ thoát ra',
      'Xuất hiện kết tủa trắng',
      'Dung dịch chuyển đỏ quỳ tím',
      'Không có hiện tượng'
    ],
    correctAnswer: 'Natri tan dần và có khí H₂ thoát ra',
    equation: '2C₂H₅OH + 2Na → 2C₂H₅ONa + H₂↑',
    phenomenon: 'Ancol có nhóm –OH (axit rất yếu) nên đẩy được H₂ khỏi kim loại kiềm, giải phóng bọt khí.',
    hint: 'Phản ứng giống nước nhưng chậm hơn; thu được muối natri etylat.',
    difficulty: 'easy',
    points: 15,
    gradient: 'linear-gradient(135deg, #38bdf8, #0ea5e9)',
    icon: Droplet
  },
  {
    id: 2,
    type: 'acetic',
    title: 'Axit axetic (CH₃COOH)',
    description: 'Tác dụng với muối cacbonat và chỉ thị phenolphtalein.',
    question: 'Khi nhỏ giấm ăn (CH₃COOH) vào muối NaHCO₃, hiện tượng nào xảy ra?',
    options: [
      'Có khí CO₂ sủi bọt và dung dịch muối tạo thành',
      'Xuất hiện kết tủa vàng',
      'Dung dịch chuyển sang màu tím đậm',
      'Không phản ứng ở điều kiện thường'
    ],
    correctAnswer: 'Có khí CO₂ sủi bọt và dung dịch muối tạo thành',
    equation: 'CH₃COOH + NaHCO₃ → CH₃COONa + CO₂↑ + H₂O',
    phenomenon: 'Bọt CO₂ thoát ra, pH tăng nên phenolphtalein dần hồng nhạt.',
    hint: 'Axit + muối cacbonat luôn tạo khí CO₂.',
    difficulty: 'easy',
    points: 15,
    gradient: 'linear-gradient(135deg, #fb7185, #f97316)',
    icon: Beaker
  },
  
    /* Experiment 3 (ester) removed per request */
  {
    id: 3,
    type: 'glucose',
    title: 'Glucozơ',
    description: 'Tính khử mạnh: phản ứng tráng bạc.',
    question: 'Glucozơ cho hiện tượng gì với thuốc thử Tollens (AgNO₃/NH₃)?',
    options: [
      'Tạo lớp bạc sáng bám trên thành ống nghiệm',
      'Xuất hiện kết tủa xanh lam',
      'Dung dịch mất màu brom ở nhiệt độ thường',
      'Không phản ứng'
    ],
    correctAnswer: 'Tạo lớp bạc sáng bám trên thành ống nghiệm',
    equation: 'C₆H₁₂O₆ + 2Ag₂O → C₆H₁₂O₇ + 4Ag↓',
    phenomenon: 'Thành ống nghiệm phủ lớp bạc sáng (phản ứng tráng bạc).',
    hint: 'Nhóm –CHO trong glucozơ có tính khử.',
    difficulty: 'medium',
    points: 20,
    gradient: 'linear-gradient(135deg, #22c55e, #16a34a)',
    icon: Atom
  },
  {
    id: 4,
    type: 'sucrose',
    title: 'Saccarozơ',
    description: 'So sánh với glucozơ và phản ứng thủy phân.',
    question: 'Chọn các nhận định ĐÚNG về saccarozơ.',
    options: [
      'Không tham gia phản ứng tráng bạc',
      'Thủy phân tạo glucozơ và fructozơ',
      'Tạo màu xanh với dung dịch iot',
      'Có vị ngọt nhưng không lên men được'
    ],
    correctAnswers: [
      'Không tham gia phản ứng tráng bạc',
      'Thủy phân tạo glucozơ và fructozơ'
    ],
    phenomenon: 'Dung dịch saccarozơ không tráng bạc; sau thủy phân thành glucozơ + fructozơ thì có tính khử.',
    hint: 'Saccarozơ là đisunfit (không có nhóm –CHO tự do).',
    difficulty: 'hard',
    points: 20,
    gradient: 'linear-gradient(135deg, #f97316, #facc15)',
    icon: GraduationCap
  },
  {
    id: 5,
    type: 'starch-cellulose',
    title: 'Tinh bột & Xenlulozơ',
    description: 'Thử iot và ứng dụng vật liệu.',
    question: 'Nhận xét nào đúng khi nhỏ dung dịch I₂/KI vào hai mẫu tinh bột và xenlulozơ?',
    options: [
      'Tinh bột chuyển xanh tím, xenlulozơ không đổi màu',
      'Cả hai đều chuyển xanh tím',
      'Cả hai đều không đổi màu',
      'Xenlulozơ chuyển nâu đỏ còn tinh bột không đổi màu'
    ],
    correctAnswer: 'Tinh bột chuyển xanh tím, xenlulozơ không đổi màu',
    phenomenon: 'Cấu trúc xoắn amylozơ giữ phức iot tạo màu xanh; xenlulozơ mạch thẳng không tạo phức.',
    hint: 'Thử iot là phản ứng đặc trưng nhận biết tinh bột.',
    difficulty: 'medium',
    points: 15,
    gradient: 'linear-gradient(135deg, #0ea5e9, #22d3ee)',
    icon: Leaf
  }
];

const TOTAL_POINTS = CHALLENGES.reduce((sum, c) => sum + c.points, 0);

// ================== EXPERIMENT COMPONENTS ==================
const EthanolExperiment = ({ progress }) => {
  const stage = progress < 30 ? 'ready' : progress < 70 ? 'reacting' : 'complete';

  return (
    <div className="exp-card ethanol">
      <div className="exp-title">Ancol etylic + Na (mẩu kim loại)</div>

      <div className="ethanol-container">
        {/* Pipet positioned above */}
        <div className="pipet-holder">
          <div className="pipet-body">
            <div className="pipet-bulb" />
            <div className="pipet-tube" />
            <div className="pipet-tip" />
          </div>
          {stage !== 'ready' && (
            <div className="ethanol-drops">
              <div className="drop drop-1" />
              <div className="drop drop-2" />
            </div>
          )}
        </div>

        {/* Na block below */}
        <div className="na-block-container">
          <div className={`na-block ${stage !== 'ready' ? 'reacting' : ''}`}>
            <span className="na-symbol">Na</span>
          </div>
          
          {/* H2 bubbles */}
          {(stage === 'reacting' || stage === 'complete') && (
            <div className="h2-bubbles">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="h2-bubble" />
              ))}
            </div>
          )}
        </div>
      </div>

     
    </div>
  );
};

const AceticExperiment = ({ progress }) => {
  const stage = progress < 25 ? 'ready' : progress < 65 ? 'reacting' : 'complete';
  return (
    <div className="exp-card acetic">
      <div className="exp-title">Cho bột NaHCO₃ vào giấm</div>
      
      <div className="acetic-container">
        {/* Beaker with vinegar */}
        <div className="reaction-beaker">
          {/* Vinegar liquid at bottom */}
          <div className="vinegar-liquid">
            <span className="vinegar-label">CH₃COOH</span>
          </div>
          
          {/* Powder falling */}
          {stage !== 'ready' && (
            <>
              <div className="powder-particle p1" />
              <div className="powder-particle p2" />
              <div className="powder-particle p3" />
              <div className="powder-particle p4" />
            </>
          )}
          
          {/* CO2 bubbles rising */}
          {(stage === 'reacting' || stage === 'complete') && (
            <div className="co2-bubbles-container">
              {[...Array(12)].map((_, i) => (
                <div key={i} className="co2-bubble" />
              ))}
            </div>
          )}
          
          {/* Foam layer */}
          {(stage === 'reacting' || stage === 'complete') && (
            <div className="foam-layer">
              <div className="foam-bubble" />
              <div className="foam-bubble" />
              <div className="foam-bubble" />
            </div>
          )}
        </div>
        
        {/* Spoon with powder */}
        <div className={`powder-spoon ${stage !== 'ready' ? 'tilting' : ''}`}>
          {stage === 'ready' && (
            <div className="spoon-powder">
              <span>NaHCO₃</span>
            </div>
          )}
        </div>
      </div>
      
      <div className="note">CH₃COOH + NaHCO₃ → CH₃COONa + H₂O + CO₂↑</div>
    </div>
  );
};

/* Ester experiment removed */

const GlucoseExperiment = ({ progress }) => {
  const stage = progress < 35 ? 'ready' : progress < 75 ? 'reaction' : 'mirror';
  
  return (
    <div className="exp-card glucose">
      <div className="exp-title">Thí nghiệm tráng bạc</div>
      
      <div className="glucose-experiment-container">
        {/* Test tube with realistic shape */}
        <div className={`test-tube-glucose ${stage}`}>
         
          
          {/* Main tube body */}
          <div className="tube-body">
            {/* Tollens reagent + Glucose solution */}
            <div className="tollens-solution">
              <div className="solution-surface">
                <div className="surface-wave" />
                <div className="surface-wave" style={{ animationDelay: '0.5s' }} />
              </div>
              
              {/* Ag+ ions in solution (ready state) */}
              {stage === 'ready' && (
                <div className="floating-ions">
                  {[...Array(16)].map((_, i) => (
                    <div key={i} className="ag-ion-real" style={{
                      left: `${8 + (i % 4) * 21}%`,
                      top: `${15 + Math.floor(i / 4) * 18}%`,
                      animationDelay: `${i * 0.12}s`
                    }}>
                      Ag⁺
                    </div>
                  ))}
                </div>
              )}
              
              {/* Reaction in progress: Ag+ → Ag particles forming */}
              {stage === 'reaction' && (
                <div className="reaction-zone">
                  {/* Silver particles precipitating */}
                  {[...Array(20)].map((_, i) => (
                    <div key={i} className="ag-precipitate" style={{
                      left: `${5 + (i % 5) * 18}%`,
                      top: `${10 + Math.floor(i / 5) * 15}%`,
                      animationDelay: `${i * 0.08}s`
                    }}>
                      <span className="ion-state">Ag⁺</span>
                      <span className="metal-state">Ag</span>
                    </div>
                  ))}
                  
                  {/* Silver depositing on walls */}
                  <div className="depositing-silver">
                    {[...Array(6)].map((_, i) => (
                      <div key={i} className="silver-stream" style={{
                        left: `${10 + i * 15}%`,
                        animationDelay: `${i * 0.15}s`
                      }} />
                    ))}
                  </div>
                </div>
              )}
              
            </div>
            
            {/* Silver mirror coating on inner walls */}
            <div className="silver-coating" />
            
            {/* Shine/reflection effects */}
            {stage === 'mirror' && (
              <>
                <div className="tube-shine shine-1" />
                <div className="tube-shine shine-2" />
                <div className="tube-shine shine-3" />
              </>
            )}
          </div>
          
          {/* Rounded bottom */}
          
        </div>
        
        {/* Water bath (beaker with warm water) */}
        <div className="water-bath">
          <div className="beaker-water">
            <div className="water-level" />
            <div className="heat-indicator">
              <span>60-70°C</span>
            </div>
            <div className="steam-bubble b1" />
            <div className="steam-bubble b2" />
            <div className="steam-bubble b3" />
          </div>
        </div>
      </div>
      
      <div className="reaction-info">
        <div className="info-step">
          <strong>Thuốc thử:</strong> AgNO₃/NH₃ (Tollens)
        </div>
        <div className="info-step">
          <strong>Phản ứng:</strong> C₆H₁₂O₆ + 2Ag⁺ → Ag↓ + ...
        </div>
        <div className="info-status">
          {stage === 'ready' && '① Dung dịch không màu chứa ion Ag⁺'}
          {stage === 'reaction' && '② Đang gia nhiệt - Ag⁺ bị khử → Ag kim loại'}
          {stage === 'mirror' && '③ Hoàn thành - Lớp bạc sáng bám thành ống'}
        </div>
      </div>
    </div>
  );
};

const SucroseExperiment = ({ progress }) => {
  const stage = progress < 30 ? 'setup' : progress < 65 ? 'hydrolysis' : 'tollens';
  const hydrolyzed = stage !== 'setup';
  const silvered = stage === 'tollens';

  return (
    <div className="exp-card sucrose">
      <div className="exp-title">Thủy phân saccarozơ rồi thử Tollens</div>

      <div className="sucrose-lab">
        <div className={`bath-rig ${stage !== 'setup' ? 'heated' : ''}`}>
          <div className="bath-water">
            <div className="temp-chip">60-70°C</div>
            {[...Array(6)].map((_, i) => (
              <div key={i} className={`bath-bubble b${i + 1}`} />
            ))}
          </div>

          <div className="flask">
            <div className="flask-neck">
              {stage !== 'setup' && <div className="acid-drop" />}
            </div>
            <div className={`flask-body ${hydrolyzed ? 'acidified' : ''}`}>
              <div className="solution sucrose">
                <span>Saccarozơ</span>
              </div>
              {hydrolyzed && (
                <div className={`hydrolysis-layer ${stage === 'hydrolysis' ? 'active' : ''}`}>
                  <span>H₂SO₄ loãng</span>
                </div>
              )}
              <div className={`steam ${stage === 'hydrolysis' ? 'on' : ''}`} />
            </div>
          </div>

          <div className="hot-plate">
            <span>Gia nhiệt cách thủy</span>
          </div>
        </div>

        <div className="tollens-rack">
          <div className="tollens-label">Thuốc thử Tollens (AgNO₃/NH₃)</div>
          <div className="tube-card control">
            <div className="tube-head">Mẫu chưa thủy phân + Tollens</div>
            <div className="tube-glass">
              <div className="tube-liquid control" />
              <div className="tube-wall" />
            </div>
            <div className="tube-note">Không có –CHO tự do → Không bám bạc</div>
          </div>

          <div className={`tube-card product ${silvered ? 'silvered' : ''}`}>
            <div className="tube-head">Mẫu sau thủy phân + Tollens</div>
            <div className="tube-glass">
              <div className={`tube-liquid product ${silvered ? 'reacting' : ''}`} />
              <div className={`tube-wall ${silvered ? 'mirror' : ''}`} />
              {silvered && <div className="silver-specks" />}
            </div>
            <div className="tube-note">Glucozơ + Fructozơ khử Ag⁺ → bạc bám thành ống</div>
          </div>
        </div>
      </div>

      <div className="step-legend">
        <div className={`step-chip ${stage === 'setup' ? 'active' : ''}`}>
          B1: Thêm H₂SO₄ loãng vào dung dịch saccarozơ
        </div>
        <div className={`step-chip ${stage === 'hydrolysis' ? 'active' : ''}`}>
          B2: Đun cách thủy 60-70°C vài phút → saccarozơ thủy phân
        </div>
        <div className={`step-chip ${stage === 'tollens' ? 'active' : ''}`}>
          B3: Thêm thuốc thử Tollens → chỉ mẫu đã thủy phân tráng bạc
        </div>
        <div className="step-chip subtle">Tóm tắt: Saccarozơ → (H₂SO₄, đun) → Glucozơ + Fructozơ → Tollens → bạc bám</div>
      </div>
    </div>
  );
};

const StarchCelluloseExperiment = ({ progress }) => {
  // Stages based on progress 0-100
  const stage = progress < 10 ? 'ready' 
              : progress < 45 ? 'dropping-starch' 
              : progress < 55 ? 'reacting-starch'
              : progress < 85 ? 'dropping-cellulose'
              : 'complete';

  const starchBlue = stage === 'reacting-starch' || stage === 'dropping-cellulose' || stage === 'complete';
  const celluloseIodine = stage === 'complete';

  return (
    <div className="exp-card bio-tubes">
      <div className="exp-title">Phân biệt Tinh bột & Xenlulozơ bằng Iot</div>
      
      <div className="tube-rack-container">
        {/* Moving Dropper */}
        <div className={`moving-dropper ${stage}`}>
          <div className="dropper-body">
            <div className="dropper-bulb" />
            <div className="dropper-glass" />
            <div className="dropper-liquid-fill">I₂</div>
          </div>
          {(stage === 'dropping-starch' || stage === 'dropping-cellulose') && (
            <div className="iodine-drops">
              <div className="i-drop d1" />
              <div className="i-drop d2" />
            </div>
          )}
        </div>

        {/* Tube Rack */}
        <div className="tube-rack">
          {/* Tube 1: Starch */}
          <div className="test-tube-slot">
            <div className="test-tube">
              <div className="tube-mouth" />
              <div className={`tube-liquid starch ${starchBlue ? 'turned-blue' : ''}`}>
                <span className="liquid-label">Tinh bột</span>
              </div>
              <div className="tube-glass-overlay" />
            </div>
            <div className="tube-label-bottom">Tinh bột</div>
            <div className="tube-result">
              {starchBlue && <span className="res-blue">→ Xanh tím</span>}
            </div>
          </div>

          {/* Tube 2: Cellulose */}
          <div className="test-tube-slot">
            <div className="test-tube">
              <div className="tube-mouth" />
              <div className={`tube-liquid cellulose ${celluloseIodine ? 'added-iodine' : ''}`}>
                <span className="liquid-label">Xenlulozơ</span>
              </div>
              <div className="tube-glass-overlay" />
            </div>
            <div className="tube-label-bottom">Xenlulozơ</div>
            <div className="tube-result">
              {celluloseIodine && <span className="res-none">→ Không đổi</span>}
            </div>
          </div>
        </div>
      </div>

      <div className="bio-summary">
        <div className="summary-step">
          <strong>Hiện tượng:</strong> Iot gặp tinh bột tạo phức màu xanh tím. Xenlulozơ không có cấu trúc xoắn lò xo nên không tạo phức màu với Iot.
        </div>
      </div>
    </div>
  );
};

const ExperimentRenderer = ({ challenge, progress }) => {
  switch (challenge.type) {
    case 'ethanol':
      return <EthanolExperiment progress={progress} />;
    case 'acetic':
      return <AceticExperiment progress={progress} />;
    case 'glucose':
      return <GlucoseExperiment progress={progress} />;
    case 'sucrose':
      return <SucroseExperiment progress={progress} />;
    case 'starch-cellulose':
      return <StarchCelluloseExperiment progress={progress} />;
    default:
      return null;
  }
};

// ================== MAIN COMPONENT ==================
const Bai34_HIDROCACBON_POLIME = () => {
  const navigate = useNavigate();
  const { hasProgress, saveProgress, clearProgress, getProgress } = useChallengeProgress('hidrocacbon-polime-9-bai34');

  const [gameStarted, setGameStarted] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [showResumeDialog, setShowResumeDialog] = useState(false);
  const [currentChallenge, setCurrentChallenge] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(
    Array.isArray(CHALLENGES[0]?.correctAnswers) ? [] : null
  );
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [completedChallenges, setCompletedChallenges] = useState([]);
  const [answeredCorrectly, setAnsweredCorrectly] = useState([]);
  const [retryQueue, setRetryQueue] = useState([]);
  const [isRetryMode, setIsRetryMode] = useState(false);
  const [retryIndex, setRetryIndex] = useState(0);

  const [experimentProgress, setExperimentProgress] = useState(0);
  const [isExperimentRunning, setIsExperimentRunning] = useState(false);
  const [isExperimentComplete, setIsExperimentComplete] = useState(false);
  const experimentIntervalRef = useRef(null);

  const challenge = CHALLENGES[currentChallenge];
  const ChallengeIcon = challenge?.icon || FlaskConical;
  const isMultiSelect = Array.isArray(challenge.correctAnswers);
  const correctOptions = isMultiSelect ? challenge.correctAnswers : [challenge.correctAnswer];
  const selectedList = Array.isArray(selectedAnswer)
    ? selectedAnswer
    : selectedAnswer
      ? [selectedAnswer]
      : [];
  const requiredSelections = correctOptions.length;

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
  }, [currentChallenge, score, completedChallenges, answeredCorrectly, gameStarted, showResults, experimentProgress, isExperimentComplete, selectedAnswer, isAnswerSubmitted, showHint, retryQueue, isRetryMode, retryIndex, saveProgress]);

  useEffect(() => () => {
    if (experimentIntervalRef.current) clearInterval(experimentIntervalRef.current);
  }, []);

  const resetQuestion = (targetIndex = currentChallenge) => {
    if (experimentIntervalRef.current) clearInterval(experimentIntervalRef.current);
    const targetChallenge = CHALLENGES[targetIndex] || challenge;
    setSelectedAnswer(Array.isArray(targetChallenge.correctAnswers) ? [] : null);
    setIsAnswerSubmitted(false);
    setShowHint(false);
    setExperimentProgress(0);
    setIsExperimentRunning(false);
    setIsExperimentComplete(false);
  };

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
      resetQuestion(0);
    } else {
      const saved = getProgress();
      if (saved) {
        setCurrentChallenge(saved.currentChallenge || 0);
        setScore(saved.score || 0);
        setCompletedChallenges(saved.completedChallenges || []);
        setAnsweredCorrectly(saved.answeredCorrectly || []);
        setExperimentProgress(saved.experimentProgress || 0);
        setIsExperimentComplete(saved.isExperimentComplete || false);
        const targetChallenge = CHALLENGES[saved.currentChallenge || 0];
        const defaultAnswer = Array.isArray(targetChallenge?.correctAnswers) ? [] : null;
        const normalizedSavedAnswer = Array.isArray(saved.selectedAnswer)
          ? saved.selectedAnswer
          : targetChallenge?.correctAnswers && saved.selectedAnswer
            ? [saved.selectedAnswer]
            : saved.selectedAnswer;
        setSelectedAnswer(normalizedSavedAnswer ?? defaultAnswer);
        setIsAnswerSubmitted(saved.isAnswerSubmitted || false);
        setShowHint(saved.showHint || false);
        setRetryQueue(saved.retryQueue || []);
        setIsRetryMode(saved.isRetryMode || false);
        setRetryIndex(saved.retryIndex || 0);
      }
    }
    setGameStarted(true);
    setShowResults(false);
    setShowResumeDialog(false);
  }, [clearProgress, getProgress]);

  const runExperiment = () => {
    if (isExperimentRunning || isExperimentComplete) return;
    setIsExperimentRunning(true);
    setExperimentProgress(0);

    experimentIntervalRef.current = setInterval(() => {
      setExperimentProgress(prev => {
        if (prev >= 100) {
          clearInterval(experimentIntervalRef.current);
          setIsExperimentRunning(false);
          setIsExperimentComplete(true);
          return 100;
        }
        return prev + 3;
      });
    }, 45);
  };

  const resetExperiment = () => {
    if (experimentIntervalRef.current) clearInterval(experimentIntervalRef.current);
    setExperimentProgress(0);
    setIsExperimentRunning(false);
    setIsExperimentComplete(false);
  };

  const handleOptionSelect = (option) => {
    if (isAnswerSubmitted) return;

    if (isMultiSelect) {
      setSelectedAnswer(prev => {
        const current = Array.isArray(prev) ? prev : [];
        if (current.includes(option)) {
          return current.filter(item => item !== option);
        }
        if (current.length >= requiredSelections) return current;
        return [...current, option];
      });
    } else {
      setSelectedAnswer(option);
    }
  };

  const checkAnswer = () => {
    if (selectedList.length === 0) return;
    setIsAnswerSubmitted(true);

    const isCorrect = isMultiSelect
      ? selectedList.length === correctOptions.length && correctOptions.every(o => selectedList.includes(o))
      : selectedList[0] === challenge.correctAnswer;

    if (isRetryMode) {
      if (isCorrect) {
        setScore(prev => prev + Math.floor(challenge.points / 2));
        setAnsweredCorrectly(prev => [...prev, currentChallenge]);
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
      const nextRetryIdx = retryIndex + 1;
      if (nextRetryIdx < retryQueue.length) {
        setRetryIndex(nextRetryIdx);
        setCurrentChallenge(retryQueue[nextRetryIdx]);
        resetQuestion(retryQueue[nextRetryIdx]);
      } else {
        setShowResults(true);
        clearProgress();
      }
    } else {
      if (currentChallenge < CHALLENGES.length - 1) {
        setCurrentChallenge(prev => prev + 1);
        resetQuestion(currentChallenge + 1);
      } else if (retryQueue.length > 0) {
        setIsRetryMode(true);
        setRetryIndex(0);
        setCurrentChallenge(retryQueue[0]);
        resetQuestion(retryQueue[0]);
      } else {
        setShowResults(true);
        clearProgress();
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
    resetQuestion(0);
  };

  // ================== RESULTS SCREEN ==================
  if (showResults) {
    const percentage = Math.round((score / TOTAL_POINTS) * 100);
    const correctCount = answeredCorrectly.length;
    const getResult = () => {
      if (percentage >= 90) return { emoji: '🏆', title: 'Xuất sắc!', grade: 'A+', color: '#22c55e' };
      if (percentage >= 70) return { emoji: '🌟', title: 'Giỏi!', grade: 'A', color: '#0ea5e9' };
      if (percentage >= 50) return { emoji: '👍', title: 'Khá!', grade: 'B', color: '#f59e0b' };
      return { emoji: '💪', title: 'Cố gắng thêm!', grade: 'C', color: '#ef4444' };
    };
    const result = getResult();

    return (
      <div className="polime-game">
        <div className="results-shell">
          <div className="results-card" style={{ '--accent': result.color }}>
            <div className="results-icon">{result.emoji}</div>
            <div className="results-grade">{result.grade}</div>
            <h1>{result.title}</h1>
            <p className="results-score">{score} / {TOTAL_POINTS} điểm ({percentage}%)</p>
            <p className="results-sub">Đúng {correctCount}/{CHALLENGES.length} câu</p>
            <div className="result-actions">
              <button className="btn-primary" onClick={restartGame}>
                <RotateCcw size={16} /> Làm lại
              </button>
              <button className="btn-secondary" onClick={() => navigate('/advanced-challenge')}>
                <ArrowLeft size={16} /> Quay về danh sách
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
      <div className="polime-game">
        <div className="start-shell">
          <Link to="/advanced-challenge" className="back-link">
            <ArrowLeft size={18} /> Quay lại
          </Link>

          <div className="start-card">
            <div className="start-head">
              <div className="start-badge">🧬</div>
              <div>
                <h1>Dẫn xuất & Polime</h1>
                <p>Ôn tập nhanh: ancol → este → polisaccarit → polime</p>
              </div>
            </div>

            <div className="start-grid">
              <div className="start-item">⚗️ Ancol, Axit, Este</div>
              <div className="start-item">🍯 Glucozơ, Saccarozơ</div>
              <div className="start-item">🌾 Tinh bột, Xenlulozơ</div>
              <div className="start-item">🧱 Polime & vật liệu</div>
            </div>

            <div className="start-meta">
              <span><FlaskConical size={14} /> {CHALLENGES.length} thí nghiệm mini</span>
              <span><Trophy size={14} /> {TOTAL_POINTS} điểm</span>
              <span><GraduationCap size={14} /> Lớp 9</span>
            </div>

            <button className="btn-start" onClick={() => startGame(true)}>
              <Play size={18} /> Bắt đầu thử thách
            </button>
          </div>
        </div>

        {showResumeDialog && (
          <ResumeDialog
            onResume={() => startGame(false)}
            onStartNew={() => startGame(true)}
            savedProgress={{
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
    <div className="polime-game">
      {/* Top Bar */}
      <div className="top-bar">
        <Link to="/advanced-challenge" className="back-link">
          <ArrowLeft size={18} /> Quay lại
        </Link>
        <div className="badge" style={{ background: challenge.gradient }}>
          <ChallengeIcon size={16} />
          <span>{challenge.title}</span>
        </div>
        <div className="top-right">
          <div className="progress-text">{currentChallenge + 1}/{CHALLENGES.length}</div>
          <div className="score-chip">
            <Trophy size={14} /> {score}
          </div>
        </div>
      </div>

      <div className="game-layout">
        {/* Experiment */}
        <div className="panel">
          <div className="panel-head">
            <FlaskConical size={16} />
            <span>Thí nghiệm mô phỏng</span>
            <span className={`diff ${challenge.difficulty}`}>{challenge.difficulty}</span>
          </div>
          <div className="panel-body">
            <ExperimentRenderer challenge={challenge} progress={experimentProgress} />
            
            <div className="experiment-actions">
              {!isExperimentComplete ? (
                <button className="btn-primary" onClick={runExperiment} disabled={isExperimentRunning}>
                  {isExperimentRunning ? `Đang chạy... ${experimentProgress}%` : (<><Play size={14} /> Chạy mô phỏng</>)}
                </button>
              ) : (
                <button className="btn-secondary" onClick={resetExperiment}>
                  <RotateCcw size={14} /> Chạy lại
                </button>
              )}
              <div className="progress-bar">
                <div className="progress-fill" style={{ width: `${experimentProgress}%` }} />
              </div>
            </div>
          </div>
        </div>

        {/* Question */}
        <div className="panel">
          <div className="panel-head">
            <HelpCircle size={16} />
            <span>Câu hỏi</span>
            <span className="points">+{challenge.points}đ</span>
          </div>
          <div className="panel-body">
            {!isExperimentComplete ? (
              <div className="waiting">
                <Play size={28} />
                <p>Chạy thí nghiệm trước khi trả lời</p>
              </div>
            ) : (
              <>
                <p className="question">{challenge.question}</p>
                {isMultiSelect && (
                  <p className="note-inline">Chọn {requiredSelections} đáp án đúng</p>
                )}

                <div className="options">
                  {challenge.options.map((option, idx) => {
                    const isSelected = isMultiSelect
                      ? selectedList.includes(option)
                      : selectedAnswer === option;
                    const isCorrectOption = correctOptions.includes(option);

                    let optionClass = 'option';
                    if (isAnswerSubmitted) {
                      if (isCorrectOption) optionClass += ' correct';
                      else if (isSelected) optionClass += ' incorrect';
                    } else if (isSelected) optionClass += ' selected';

                    return (
                      <button
                        key={idx}
                        className={optionClass}
                        onClick={() => handleOptionSelect(option)}
                        disabled={isAnswerSubmitted}
                      >
                        <span className="option-label">{String.fromCharCode(65 + idx)}</span>
                        <span className="option-text">{option}</span>
                        {isAnswerSubmitted && isCorrectOption && <CheckCircle2 size={16} />}
                        {isAnswerSubmitted && isSelected && !isCorrectOption && <XCircle size={16} />}
                      </button>
                    );
                  })}
                </div>

                {!isAnswerSubmitted && (
                  <button className="hint-btn" onClick={() => setShowHint(!showHint)}>
                    <HelpCircle size={14} /> {showHint ? 'Ẩn gợi ý' : 'Gợi ý'}
                  </button>
                )}
                {showHint && !isAnswerSubmitted && (
                  <p className="hint">{challenge.hint}</p>
                )}

                {isAnswerSubmitted && challenge.equation && (
                  <div className="equation"><strong>PT:</strong> {challenge.equation}</div>
                )}
              </>
            )}
          </div>
        </div>
      </div>

      <div className="footer">
        <div className="left">
          {isRetryMode && (
            <div className="retry">🔄 Làm lại ({retryQueue.length})</div>
          )}
        </div>
        <div className="center">
          {!isAnswerSubmitted && isExperimentComplete ? (
            <button className="btn-primary" onClick={checkAnswer} disabled={selectedList.length === 0}>
              <CheckCircle2 size={16} /> Kiểm tra
            </button>
          ) : isAnswerSubmitted ? (
            <button className="btn-primary" onClick={nextChallenge}>
              {isRetryMode ? 'Câu tiếp' : currentChallenge < CHALLENGES.length - 1 ? 'Tiếp theo' : retryQueue.length > 0 ? 'Làm lại câu sai' : 'Xem kết quả'}
            </button>
          ) : (
            <div className="waiting-text"><Play size={14} /> Chạy thí nghiệm để trả lời</div>
          )}
        </div>
        <div className="right">
          <div className="chip">{currentChallenge + 1}/{CHALLENGES.length}</div>
        </div>
      </div>
    </div>
  );
};

export default Bai34_HIDROCACBON_POLIME;
