import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Trophy, Eye, Flame, Droplet, Sparkles, Wind } from 'lucide-react';
import useChallengeProgress from '../../../../hooks/useChallengeProgress';
import ResumeDialog from '../../../../components/ResumeDialog';
import './CSS/Bai12_QuanSatPhanUng.css';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, info) {
    // You can log error to an error reporting service here
    // console.error(error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{padding:20}}>
          <h2>Đã xảy ra lỗi trong trò chơi.</h2>
          <pre style={{whiteSpace: 'pre-wrap'}}>{String(this.state.error)}</pre>
        </div>
      );
    }
    return this.props.children;
  }
}

const QuanSatPhanUngInner = () => {
  // Dữ liệu các phản ứng hóa học với hiện tượng
  const cacPhanUng = [
    {
      id: 1,
      ten: "Magie cháy trong không khí",
      phuongTrinh: "2Mg + O₂ → 2MgO",
      moTa: "Dây magie được đốt cháy trong không khí",
      animation: "🔥",
      hienTuong: ["Cháy sáng chói", "Tỏa nhiệt mạnh", "Tạo khói trắng"],
      hienTuongDung: ["Cháy sáng chói", "Tỏa nhiệt mạnh", "Tạo khói trắng"],
      giaiThich: "Magie cháy trong oxi tạo MgO (magie oxit) dạng bột trắng, phản ứng tỏa nhiệt mạnh và có ánh sáng chói.",
      difficulty: "easy"
    },
    {
      id: 2,
      ten: "Sắt tác dụng với dung dịch axit clohidric",
      phuongTrinh: "Fe + 2HCl → FeCl₂ + H₂↑",
      moTa: "Cho đinh sắt vào ống nghiệm chứa dung dịch HCl",
      animation: "⚗️",
      hienTuong: ["Có khí bay lên", "Dung dịch chuyển màu xanh nhạt", "Sắt tan dần", "Có kết tủa trắng"],
      hienTuongDung: ["Có khí bay lên", "Dung dịch chuyển màu xanh nhạt", "Sắt tan dần"],
      giaiThich: "Sắt tác dụng với HCl tạo muối FeCl₂ (màu xanh nhạt) và giải phóng khí H₂ thoát ra dạng bọt khí.",
      difficulty: "easy"
    },
    {
      id: 3,
      ten: "Đốt cháy lưu huỳnh trong oxi",
      phuongTrinh: "S + O₂ → SO₂",
      moTa: "Đốt cháy bột lưu huỳnh màu vàng trong bình chứa khí oxi",
      animation: "🔥",
      hienTuong: ["Cháy với ngọn lửa màu xanh", "Có khí mùi hắc thoát ra", "Tỏa nhiệt", "Tạo chất rắn màu đen"],
      hienTuongDung: ["Cháy với ngọn lửa màu xanh", "Có khí mùi hắc thoát ra", "Tỏa nhiệt"],
      giaiThich: "Lưu huỳnh cháy trong oxi tạo khí SO₂ (lưu huỳnh đioxit) có mùi hắc đặc trưng và ngọn lửa màu xanh nhạt.",
      difficulty: "medium"
    },
    {
      id: 4,
      ten: "Đồng(II) oxit tác dụng với khí hiđro",
      phuongTrinh: "CuO + H₂ → Cu + H₂O",
      moTa: "Cho luồng khí H₂ đi qua ống nghiệm chứa bột CuO đen và đun nóng",
      animation: "🧪",
      hienTuong: ["Bột đen chuyển sang màu đỏ", "Có hơi nước ngưng tụ", "Thu nhiệt", "Có khí thoát ra"],
      hienTuongDung: ["Bột đen chuyển sang màu đỏ", "Có hơi nước ngưng tụ"],
      giaiThich: "H₂ khử CuO thành Cu (đồng kim loại màu đỏ) và tạo hơi nước ngưng tụ ở thành ống nghiệm.",
      difficulty: "medium"
    },
    {
      id: 5,
      ten: "Natri hiđroxit tác dụng với axit clohidric",
      phuongTrinh: "NaOH + HCl → NaCl + H₂O",
      moTa: "Nhỏ từ từ dung dịch NaOH vào cốc chứa dung dịch HCl có quỳ tím",
      animation: "💧",
      hienTuong: ["Quỳ tím chuyển từ đỏ sang tím", "Dung dịch nóng lên", "Có khí thoát ra", "Xuất hiện kết tủa trắng"],
      hienTuongDung: ["Quỳ tím chuyển từ đỏ sang tím", "Dung dịch nóng lên"],
      giaiThich: "Phản ứng trung hòa giữa bazơ và axit, tỏa nhiệt. Quỳ tím từ đỏ (axit dư) chuyển sang tím (trung tính).",
      difficulty: "medium"
    },
    {
      id: 6,
      ten: "Canxi cacbonat tác dụng với axit clohidric",
      phuongTrinh: "CaCO₃ + 2HCl → CaCl₂ + H₂O + CO₂↑",
      moTa: "Cho vôi đá (CaCO₃) vào dung dịch HCl",
      animation: "🫧",
      hienTuong: ["Có khí thoát ra sủi bọt", "Chất rắn tan dần", "Dung dịch trong suốt", "Có kết tủa trắng"],
      hienTuongDung: ["Có khí thoát ra sủi bọt", "Chất rắn tan dần", "Dung dịch trong suốt"],
      giaiThich: "CaCO₃ tan trong HCl tạo muối CaCl₂ tan, nước và khí CO₂ thoát ra dạng bọt khí.",
      difficulty: "easy"
    },
    {
      id: 7,
      ten: "Bạc nitrat tác dụng với đồng",
      phuongTrinh: "Cu + 2AgNO₃ → Cu(NO₃)₂ + 2Ag",
      moTa: "Nhúng thanh đồng vào dung dịch AgNO₃ không màu",
      animation: "✨",
      hienTuong: ["Bề mặt đồng phủ lớp bạc trắng", "Dung dịch chuyển màu xanh", "Có khí thoát ra", "Xuất hiện kết tủa đen"],
      hienTuongDung: ["Bề mặt đồng phủ lớp bạc trắng", "Dung dịch chuyển màu xanh"],
      giaiThich: "Đồng đẩy bạc ra khỏi dung dịch, tạo lớp bạc phủ trên đồng. Dung dịch có màu xanh do muối Cu(NO₃)₂.",
      difficulty: "hard"
    },
    {
      id: 8,
      ten: "Nhiệt phân đồng(II) hiđroxit",
      phuongTrinh: "Cu(OH)₂ → CuO + H₂O",
      moTa: "Đun nóng chất rắn Cu(OH)₂ màu xanh lam trong ống nghiệm",
      animation: "🔥",
      hienTuong: ["Chất rắn chuyển từ xanh sang đen", "Có hơi nước ngưng tụ", "Thu nhiệt", "Có khí màu nâu thoát ra"],
      hienTuongDung: ["Chất rắn chuyển từ xanh sang đen", "Có hơi nước ngưng tụ"],
      giaiThich: "Khi đun nóng, Cu(OH)₂ bị phân hủy thành CuO (màu đen) và hơi nước.",
      difficulty: "medium"
    }
  ];

  const { hasProgress, saveProgress, clearProgress, getProgress } = useChallengeProgress('quan-sat-phan-ung');
  
  const [currentReaction, setCurrentReaction] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedPhenomena, setSelectedPhenomena] = useState([]);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameCompleted, setGameCompleted] = useState(false);
  const [history, setHistory] = useState([]);
  const [showResumeDialog, setShowResumeDialog] = useState(false);
  const [failedChallenges, setFailedChallenges] = useState([]);
  const [isReviewMode, setIsReviewMode] = useState(false);
  const [reviewQueue, setReviewQueue] = useState([]);
  const [reviewIndex, setReviewIndex] = useState(0);

  // Kiểm tra tiến trình khi component mount
  useEffect(() => {
    if (hasProgress && !gameStarted && !gameCompleted) {
      setShowResumeDialog(true);
    }
  }, []);

  const startGame = (fromBeginning = false) => {
    if (fromBeginning) {
      clearProgress();
    }
    
    const progress = fromBeginning ? null : getProgress();
    
    if (progress && !fromBeginning) {
      setCurrentReaction(progress.currentReaction || 0);
      setScore(progress.score || 0);
      setHistory(progress.history || []);
    }
    
    setGameStarted(true);
    setShowResumeDialog(false);
    setIsSubmitted(false);
    setShowExplanation(false);
    setSelectedPhenomena([]);
  };

  const handlePhenomenaToggle = (phenomenon) => {
    if (isSubmitted) return;
    
    setSelectedPhenomena(prev => {
      if (prev.includes(phenomenon)) {
        return prev.filter(p => p !== phenomenon);
      } else {
        return [...prev, phenomenon];
      }
    });
  };

  const handleSubmit = () => {
    if (selectedPhenomena.length === 0) return;
    
    const reaction = cacPhanUng[currentReaction];
    const correctPhenomena = reaction.hienTuongDung;
    
    // Tính điểm
    let correctCount = 0;
    let incorrectCount = 0;
    
    selectedPhenomena.forEach(selected => {
      if (correctPhenomena.includes(selected)) {
        correctCount++;
      } else {
        incorrectCount++;
      }
    });
    
    // In review mode, do not award points for corrections
    const earnedPoints = isReviewMode ? 0 : Math.max(0, correctCount * 10 - incorrectCount * 5);
    const newScore = score + earnedPoints;

    setScore(newScore);
    setIsSubmitted(true);
    setShowExplanation(true);

    // Lưu lịch sử (points may be 0 in review)
    const newHistory = [...history, {
      reaction: reaction.ten,
      selected: selectedPhenomena,
      correct: correctPhenomena,
      points: earnedPoints
    }];
    setHistory(newHistory);

    // Nếu sai trong lượt chính, lưu id để làm lại sau
    const correctCountTotal = correctCount;
    const isCorrectOverall = (correctCountTotal > 0 && incorrectCount === 0) || (correctPhenomena.length === 0 && selectedPhenomena.length === 0);
    if (!isReviewMode && !isCorrectOverall) {
      setFailedChallenges(prev => prev.includes(reaction.id) ? prev : [...prev, reaction.id]);
    }

    // In review mode, if answered correctly, remove from failed list
    if (isReviewMode && isCorrectOverall) {
      setFailedChallenges(prev => prev.filter(id => id !== reaction.id));
      setReviewQueue(prev => prev.filter(id => id !== reaction.id));
      // if no more failed left, finish
      if (failedChallenges.length <= 1 && reviewQueue.length <= 1) {
        setGameCompleted(true);
        clearProgress();
      }
    }

    // Lưu tiến trình cho lượt chính (tránh lưu trong review passes)
    if (!isReviewMode && currentReaction < cacPhanUng.length - 1) {
      saveProgress({
        currentReaction: currentReaction + 1,
        score: newScore,
        history: newHistory
      });
    }
  };

  // Auto-advance removed: user will manually press 'Tiếp theo'.

  const handleNext = () => {
    if (!isReviewMode) {
      if (currentReaction < cacPhanUng.length - 1) {
        setCurrentReaction(currentReaction + 1);
        setSelectedPhenomena([]);
        setIsSubmitted(false);
        setShowExplanation(false);
      } else {
        // End of initial pass
        if (failedChallenges.length > 0) {
          setIsReviewMode(true);
          setReviewQueue([...failedChallenges]);
          setReviewIndex(0);
          const firstId = failedChallenges[0];
          const idx = cacPhanUng.findIndex(c => c.id === firstId);
          if (idx >= 0) setCurrentReaction(idx);
          setSelectedPhenomena([]);
          setIsSubmitted(false);
          setShowExplanation(false);
        } else {
          setGameCompleted(true);
          clearProgress();
        }
      }
    } else {
      // Review mode: move to next failed item in reviewQueue
      if (reviewQueue.length === 0) {
        setGameCompleted(true);
        clearProgress();
        return;
      }

      const currentId = cacPhanUng[currentReaction].id;
      const pos = reviewQueue.findIndex(id => id === currentId);
      const nextPos = pos + 1;

      if (nextPos < reviewQueue.length) {
        const nextId = reviewQueue[nextPos];
        const idx2 = cacPhanUng.findIndex(c => c.id === nextId);
        if (idx2 >= 0) setCurrentReaction(idx2);
        setSelectedPhenomena([]);
        setIsSubmitted(false);
        setShowExplanation(false);
      } else {
        // reached end of review round
        if (failedChallenges.length > 0) {
          // restart review with remaining failed ones
          setReviewQueue([...failedChallenges]);
          const firstId2 = failedChallenges[0];
          const idx3 = cacPhanUng.findIndex(c => c.id === firstId2);
          if (idx3 >= 0) setCurrentReaction(idx3);
          setSelectedPhenomena([]);
          setIsSubmitted(false);
          setShowExplanation(false);
        } else {
          setGameCompleted(true);
          clearProgress();
        }
      }
    }
  };

  const handleRestart = () => {
    clearProgress();
    setCurrentReaction(0);
    setScore(0);
    setSelectedPhenomena([]);
    setIsSubmitted(false);
    setShowExplanation(false);
    setGameStarted(false);
    setGameCompleted(false);
    setHistory([]);
  };

  const handleResumeChoice = (continueGame) => {
    startGame(!continueGame);
  };
  if (showResumeDialog) {
    return (
      <ResumeDialog
        show={true}
        onResume={() => handleResumeChoice(true)}
        onRestart={() => handleResumeChoice(false)}
        progressInfo={getProgress() ? {
          current: getProgress().currentReaction + 1,
          total: cacPhanUng.length,
          score: getProgress().score
        } : null}
      />
    );
  }

  if (!gameStarted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
        <div className="container mx-auto px-4 py-6">
          <Link to="/advanced-challenge" className="inline-flex items-center text-gray-600 hover:text-gray-900 transition-colors">
            <ArrowLeft className="w-5 h-5 mr-2" />
            Quay lại
          </Link>
        </div>

        <div className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-2xl p-8">
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="text-center p-6 bg-gradient-to-br from-indigo-50 to-indigo-100 rounded-2xl">
                <div className="w-12 h-12 bg-indigo-600 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Flame className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-bold text-gray-800 mb-1">{cacPhanUng.length} Phản ứng</h3>
                <p className="text-sm text-gray-600">Quan sát & chọn hiện tượng</p>
              </div>

              <div className="text-center p-6 bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl">
                <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Droplet className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-bold text-gray-800 mb-1">Hiện tượng đa dạng</h3>
                <p className="text-sm text-gray-600">Phân loại chính xác</p>
              </div>

              <div className="text-center p-6 bg-gradient-to-br from-pink-50 to-pink-100 rounded-2xl">
                <div className="w-12 h-12 bg-pink-600 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-bold text-gray-800 mb-1">Giải thích chi tiết</h3>
                <p className="text-sm text-gray-600">Học nhanh hơn qua lời giải</p>
              </div>
            </div>

            <div className="text-center">
              <button
                onClick={() => startGame(true)}
                className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-indigo-600 to-pink-600 text-white font-bold text-lg rounded-full shadow-lg"
              >
                Bắt đầu thử thách
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (gameCompleted) {
    const averageScore = Math.round(score / cacPhanUng.length);
    const perfectCount = history.filter(h => h.points >= 10 * h.correct.length).length;

    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 flex items-center justify-center p-4">
        <div className="max-w-2xl w-full bg-white rounded-3xl shadow-2xl overflow-hidden">
          <div className="relative h-32 bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 flex items-center justify-center">
            <Trophy className="w-20 h-20 text-white" />
          </div>

          <div className="p-8 text-center">
            <h2 className="text-3xl font-bold mb-2">Hoàn thành!</h2>
            <p className="text-gray-600 mb-8">Bạn đã hoàn thành tất cả phản ứng</p>

            <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl p-6 mb-8">
              <div className="text-6xl font-bold mb-2">{score}</div>
              <p className="text-gray-600">Tổng điểm</p>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="bg-green-50 rounded-xl p-4">
                <div className="text-2xl font-bold text-green-600">{history.filter(h => h.points>0).length}</div>
                <div className="text-sm text-gray-600">Phản ứng đúng</div>
              </div>
              <div className="bg-blue-50 rounded-xl p-4">
                <div className="text-2xl font-bold text-blue-600">{averageScore}</div>
                <div className="text-sm text-gray-600">Điểm trung bình</div>
              </div>
            </div>

            <div className="flex gap-4">
              <button onClick={handleRestart} className="flex-1 px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold rounded-xl">Chơi lại</button>
              <Link to="/advanced-challenge" className="flex-1 px-6 py-3 bg-gray-100 text-gray-700 font-bold rounded-xl">Về trang chủ</Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const reaction = cacPhanUng[currentReaction];
  const correctPhenomena = reaction.hienTuongDung;

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
      <div className="container mx-auto px-4 py-6">
        <Link to="/advanced-challenge" className="inline-flex items-center text-gray-600 hover:text-gray-900 transition-colors">
          <ArrowLeft className="w-5 h-5 mr-2" />
          Quay lại
        </Link>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-2xl p-8">
          <div className="text-center mb-6">
            <div className="text-6xl mb-4">{reaction.animation}</div>
            <div className="text-2xl font-bold text-gray-800 mb-2">{reaction.ten}</div>
            <div className="text-sm text-gray-600 mb-4">{reaction.phuongTrinh}</div>
            <p className="text-gray-600 mb-6">{reaction.moTa}</p>
          </div>

          <div className="mb-4">
            <h3 className="font-bold mb-2">Chọn các hiện tượng xuất hiện:</h3>
            <div className="grid grid-cols-2 gap-3">
              {reaction.hienTuong.map((phenomenon, index) => {
                const isSelected = selectedPhenomena.includes(phenomenon);
                const isCorrect = correctPhenomena.includes(phenomenon);
                const showResult = isSubmitted;
                
                let className = 'phenomenon-option';
                if (isSelected) className += ' selected';
                if (showResult && isSelected && isCorrect) className += ' correct';
                if (showResult && isSelected && !isCorrect) className += ' incorrect';
                if (showResult && !isSelected && isCorrect) className += ' missed';

                return (
                  <button key={index} className={className} onClick={() => handlePhenomenaToggle(phenomenon)} disabled={isSubmitted} style={{padding:12, textAlign:'left', borderRadius:8, border:'1px solid #e5e7eb', background:isSelected?'#eef2ff':'#fff'}}>
                    <div className="flex justify-between items-center">
                      <span>{phenomenon}</span>
                      {showResult && isSelected && isCorrect && <span className="text-green-600">✓</span>}
                      {showResult && isSelected && !isCorrect && <span className="text-red-600">✗</span>}
                      {showResult && !isSelected && isCorrect && <span className="text-yellow-600">!</span>}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {showExplanation && (
            <div className="mb-4 p-4 bg-yellow-50 rounded-lg">
              <h4 className="font-bold mb-2">Giải thích</h4>
              <p className="text-sm text-yellow-800">{reaction.giaiThich}</p>
              <div className="mt-2">
                <strong>Hiện tượng đúng:</strong>
                <ul className="ml-4 mt-1">
                  {correctPhenomena.map((p,i) => <li key={i}>{p}</li>)}
                </ul>
              </div>
            </div>
          )}

          <div className="flex gap-3">
            {!isSubmitted ? (
              <button onClick={handleSubmit} disabled={selectedPhenomena.length===0} className="flex-1 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg font-bold">Kiểm tra</button>
            ) : (
              <button onClick={handleNext} className="flex-1 py-3 bg-white border rounded-lg">{currentReaction < cacPhanUng.length - 1 ? 'Tiếp theo' : 'Xem kết quả'}</button>
            )}
            <button onClick={handleRestart} className="py-3 px-4 bg-gray-100 rounded-lg">Bắt đầu lại</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function QuanSatPhanUng() {
  return (
    <ErrorBoundary>
      <QuanSatPhanUngInner />
    </ErrorBoundary>
  );
}
