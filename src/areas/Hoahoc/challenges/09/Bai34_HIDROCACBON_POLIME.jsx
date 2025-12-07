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
  {
    id: 3,
    type: 'ester',
    title: 'Este (Etyl axetat)',
    description: 'Nhận biết mùi thơm của este và cách điều chế.',
    question: 'Phát biểu nào đúng về etyl axetat?',
    options: [
      'Có mùi thơm của dứa/chuối chín',
      'Được điều chế từ axit axetic và ancol etylic',
      'Làm xanh quỳ tím ẩm',
      'Cả 2 nhận xét đầu đều đúng'
    ],
    correctAnswer: 'Cả 2 nhận xét đầu đều đúng',
    phenomenon: 'Đun hỗn hợp axit axetic + ancol etylic (có H₂SO₄ đặc) tạo este thơm dễ bay hơi.',
    hint: 'Este trung tính, không đổi màu quỳ.',
    difficulty: 'medium',
    points: 20,
    gradient: 'linear-gradient(135deg, #a855f7, #ec4899)',
    icon: Sparkles
  },
  {
    id: 4,
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
    id: 5,
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
    id: 6,
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
  },
  {
    id: 7,
    type: 'polymer',
    title: 'Polime & vật liệu',
    description: 'Khái niệm mạch polime và nhựa ứng dụng.',
    question: 'Đặc điểm chung của polime là gì?',
    options: [
      'Phân tử khối rất lớn, gồm nhiều mắt xích lặp lại',
      'Là các hợp chất ion nên tan tốt trong nước',
      'Chỉ được tạo thành từ glucozơ',
      'Không thể gia công thành sợi hay màng'
    ],
    correctAnswer: 'Phân tử khối rất lớn, gồm nhiều mắt xích lặp lại',
    phenomenon: 'Polime có mạch dài (nhựa PE, PVC, cao su) tạo vật liệu dẻo, sợi, chất dẻo kỹ thuật.',
    hint: 'Polime tạo từ monome qua phản ứng trùng hợp/trùng ngưng.',
    difficulty: 'easy',
    points: 10,
    gradient: 'linear-gradient(135deg, #8b5cf6, #6366f1)',
    icon: Layers
  },
  {
    id: 8,
    type: 'practice',
    title: 'Luyện tập dẫn xuất – polime',
    description: 'Tổng hợp nhanh toàn chương.',
    question: 'Chọn các ý đúng về chương dẫn xuất – polime.',
    options: [
      'Ancol, axit, este đều chứa nhóm chức đặc trưng',
      'Glucozơ có thể lên men rượu và tráng bạc',
      'Tinh bột, xenlulozơ là polisaccarit thiên nhiên',
      'Polime đều có thể phân hủy sinh học nhanh'
    ],
    correctAnswers: [
      'Ancol, axit, este đều chứa nhóm chức đặc trưng',
      'Glucozơ có thể lên men rượu và tráng bạc',
      'Tinh bột, xenlulozơ là polisaccarit thiên nhiên'
    ],
    phenomenon: 'Nhận diện nhanh nhóm chức –OH, –COOH, –COO–; chất thiên nhiên (tinh bột, xenlulozơ) là polime sinh học; nhiều polime tổng hợp khó phân hủy.',
    hint: 'Nhớ liên hệ tính chất với nhóm chức và nguồn gốc polime.',
    difficulty: 'hard',
    points: 25,
    gradient: 'linear-gradient(135deg, #f43f5e, #22c55e)',
    icon: Zap
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

const EsterExperiment = ({ progress }) => {
  const stage = progress < 40 ? 'ready' : progress < 80 ? 'heating' : 'complete';
  return (
    <div className="exp-card ester">
      <div className="exp-title">Tạo etyl axetat</div>
      
      <div className="ester-apparatus">
        {/* Left side: Reaction tube with stand */}
        <div className="left-section">
          
          
          {/* Metal stand */}
          <div className="stand-base" />
          <div className="stand-vertical" />
          <div className="stand-clamp" />
          
          {/* Thermometer inserted in tube */}
          <div className="thermometer-insert">
            <div className="thermo-top" />
            <div className="thermo-body" />
          </div>
          
          {/* Reaction test tube - SMALLER */}
          <div className="test-tube-reaction">
            <div className="tube-liquid">
              <span className="reagent-info">Hỗn hợp<br/>phản ứng</span>
            </div>
            {/* Catalyst label */}
            <div className="catalyst-label">H₂SO₄ đặc</div>
            {stage !== 'ready' && (
              <>
                <div className="vapor-particle v1" />
                <div className="vapor-particle v2" />
              </>
            )}
          </div>
          
          {/* Alcohol burner under tube */}
          <div className={`burner ${stage !== 'ready' ? 'burning' : ''}`}>
            <div className="burner-body" />
            <div className="burner-wick" />
            {stage !== 'ready' && (
              <>
                <div className="fire-flame" />
                {/* Heat waves rising */}
                <div className="heat-wave hw1" />
                <div className="heat-wave hw2" />
                <div className="heat-wave hw3" />
              </>
            )}
          </div>
        </div>
        
        {/* Connecting tube (curved) */}
        <div className="connecting-tube">
          <svg className="tube-path" viewBox="0 0 120 80" preserveAspectRatio="none">
            {/* L-shaped path: horizontal (left->right) then vertical down into condenser */}
            <path
              d="M5 40 L95 40 L95 72"
              fill="none"
              stroke="rgba(150, 200, 255, 0.7)"
              strokeWidth="6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        
        </div>
        
        {/* Right side: Condenser in cold water */}
        <div className="right-section">
          {/* Water bath container */}
          <div className="water-container">
            <div className="cold-water">
              <span className="water-text">Nước lạnh</span>
            </div>
          </div>
          
          {/* Test tube inside water bath */}
          <div className="test-tube-collect">
            {stage === 'complete' && (
              <>
                <div className="ester-drop d1" />
                <div className="ester-drop d2" />
                <div className="ester-layer">
                  <span className="ester-name">CH₃COOC₂H₅</span>
                </div>
              </>
            )}
          </div>
          
          {/* Aroma indicator */}
          {stage === 'complete' && (
            <div className="aroma-smell">🍍 Mùi thơm</div>
          )}
        </div>
      </div>
      
      {/* Grouped process notes in one frame */}
      {stage !== 'ready' && (
        <div className="process-steps">
          <div className="step-item">
            <span className="step-number">1</span>
            <span className="step-text">Đun nóng hỗn hợp rượu + acid + H₂SO₄</span>
          </div>
          <div className="step-item">
            <span className="step-number">2</span>
            <span className="step-text">Hơi este đi qua ống dẫn</span>
          </div>
          <div className="step-item">
            <span className="step-number">3</span>
            <span className="step-text">Nước lạnh ngưng tụ hơi este</span>
          </div>
          {stage === 'complete' && (
            <div className="step-item">
              <span className="step-number">4</span>
              <span className="step-text">Este nhẹ hơn nước, nổi lên trên</span>
            </div>
          )}
        </div>
      )}
      
      {/* Connection arrow from apparatus to equation */}
      {stage !== 'ready' && (
        <div className="equation-connector">↓</div>
      )}
      
      {/* Chemical equation below */}
      <div className="chem-equation">
        <span className="reactant">C₂H₅OH</span> + <span className="reactant">CH₃COOH</span>
        <span className="eq-arrow">⇌</span>
        <span className="product">CH₃COOC₂H₅</span> + <span className="product">H₂O</span>
        <div className="eq-condition">H₂SO₄ đặc, t°</div>
      </div>
      
      <div className="note">Este có mùi thơm đặc trưng của trái cây</div>
    </div>
  );
};

const GlucoseExperiment = ({ progress }) => {
  const stage = progress < 35 ? 'ready' : progress < 75 ? 'reaction' : 'mirror';
  return (
    <div className="exp-card glucose">
      <div className="exp-title">Tráng bạc</div>
      <div className={`silver-tube ${stage}`}>
        <div className="warm-water" />
        <div className="mirror" />
      </div>
      <div className="note">Glucozơ khử Ag⁺ thành Ag</div>
    </div>
  );
};

const SucroseExperiment = ({ progress }) => {
  const hydrolyzed = progress > 50;
  return (
    <div className="exp-card sucrose">
      <div className="exp-title">Saccarozơ → thủy phân</div>
      <div className="dual-tubes">
        <div className={`tube ${hydrolyzed ? 'inactive' : 'active'}`}>
          <span className="tube-label">Trước</span>
          <span className="tube-content">Không tráng bạc</span>
        </div>
        <div className={`tube ${hydrolyzed ? 'active' : ''}`}>
          <span className="tube-label">Sau thủy phân</span>
          <span className="tube-content">Glucozơ + Fructozơ</span>
        </div>
      </div>
      <div className="note">Thuốc thử Tollens chỉ phản ứng sau thủy phân</div>
    </div>
  );
};

const StarchCelluloseExperiment = ({ progress }) => {
  const showColor = progress > 40;
  return (
    <div className="exp-card bio">
      <div className="exp-title">Thử iot</div>
      <div className="bio-row">
        <div className={`bio-card starch ${showColor ? 'colored' : ''}`}>
          <span>Tinh bột</span>
          <div className="iodine-drop">I₂</div>
        </div>
        <div className="bio-card cellulose">
          <span>Xenlulozơ</span>
          <div className="iodine-drop">I₂</div>
        </div>
      </div>
      <div className="note">Chỉ tinh bột đổi xanh tím</div>
    </div>
  );
};

const PolymerExperiment = ({ progress }) => {
  const blocks = [0, 1, 2, 3, 4, 5];
  return (
    <div className="exp-card polymer">
      <div className="exp-title">Mạch polime</div>
      <div className="chain">
        {blocks.map((b) => (
          <div key={b} className={`unit ${progress > b * 12 ? 'show' : ''}`}>
            –CH₂–CH₂–
          </div>
        ))}
      </div>
      <div className="note">Mắt xích lặp lại → phân tử khối rất lớn</div>
    </div>
  );
};

const PracticeExperiment = ({ progress }) => {
  const topics = [
    { title: 'Nhóm chức', doneAt: 15 },
    { title: 'Tính khử', doneAt: 40 },
    { title: 'Polisaccarit', doneAt: 65 },
    { title: 'Polime tổng hợp', doneAt: 85 }
  ];
  return (
    <div className="exp-card practice">
      <div className="exp-title">Checklist kiến thức</div>
      <div className="checklist">
        {topics.map((topic, idx) => (
          <div key={idx} className={`item ${progress > topic.doneAt ? 'done' : ''}`}>
            <CheckCircle2 size={16} /> {topic.title}
          </div>
        ))}
      </div>
      <div className="note">Ôn nhanh trước khi làm câu tổng hợp</div>
    </div>
  );
};

const ExperimentRenderer = ({ challenge, progress }) => {
  switch (challenge.type) {
    case 'ethanol':
      return <EthanolExperiment progress={progress} />;
    case 'acetic':
      return <AceticExperiment progress={progress} />;
    case 'ester':
      return <EsterExperiment progress={progress} />;
    case 'glucose':
      return <GlucoseExperiment progress={progress} />;
    case 'sucrose':
      return <SucroseExperiment progress={progress} />;
    case 'starch-cellulose':
      return <StarchCelluloseExperiment progress={progress} />;
    case 'polymer':
      return <PolymerExperiment progress={progress} />;
    case 'practice':
      return <PracticeExperiment progress={progress} />;
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
            {isExperimentComplete && (
              <div className="phenomenon">
                <strong>Hiện tượng:</strong> {challenge.phenomenon}
              </div>
            )}
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
