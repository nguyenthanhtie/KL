import { useState, useEffect, useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { API_BASE_URL } from '../../config/api';
import { 
  Eye, Users, Clock, HelpCircle, Copy, Check, 
  ArrowLeft, Play, Trophy, Crown, Medal
} from 'lucide-react';

const PKSpectate = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { roomCode } = useParams();
  
  const [room, setRoom] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [gameState, setGameState] = useState('waiting');
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [gameResults, setGameResults] = useState(null);
  const [playersScores, setPlayersScores] = useState([]);
  const [copied, setCopied] = useState(false);

  // Fetch room data
  const fetchRoom = useCallback(async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/pk/${roomCode}`);
      if (response.ok) {
        const data = await response.json();
        setRoom(data);
        
        if (data.status === 'finished') {
          setGameState('finished');
          setGameResults(data.results);
          return;
        }
        
        setGameState(data.status);
        
        if (data.status === 'playing' && data.questions) {
          setCurrentQuestion(data.currentQuestion || 0);
          setTimeLeft(data.timePerQuestion);
        }
      } else {
        const data = await response.json();
        setError(data.message || 'Không tìm thấy phòng');
      }
    } catch (err) {
      setError('Lỗi kết nối server');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [roomCode]);

  // Fetch scores
  const fetchScores = useCallback(async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/pk/${roomCode}/scores`);
      if (response.ok) {
        const data = await response.json();
        setPlayersScores(data.scores || []);
      }
    } catch (err) {
      console.error('Fetch scores error:', err);
    }
  }, [roomCode]);

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
    
    if (user.role !== 'teacher' && user.role !== 'admin') {
      setError('Bạn không có quyền quan sát phòng này');
      return;
    }
    
    fetchRoom();

    const interval = setInterval(() => {
      fetchRoom();
      if (gameState === 'playing') {
        fetchScores();
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [user, navigate, fetchRoom, fetchScores, gameState]);

  // Timer countdown
  useEffect(() => {
    if (gameState !== 'playing' || timeLeft <= 0) return;
    
    const timer = setInterval(() => {
      setTimeLeft(prev => Math.max(0, prev - 1));
    }, 1000);
    
    return () => clearInterval(timer);
  }, [gameState, timeLeft]);

  // Handle start game
  const handleStartGame = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/pk/${roomCode}/start`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: user._id || user.id })
      });
      
      if (response.ok) {
        setGameState('playing');
        fetchRoom();
      } else {
        const data = await response.json();
        setError(data.message);
      }
    } catch (err) {
      setError('Lỗi kết nối');
    }
  };

  // Copy room code
  const copyRoomCode = () => {
    navigator.clipboard.writeText(roomCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-purple-500 mx-auto mb-4"></div>
          <p className="text-white/70">Đang tải phòng...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-slate-900 flex items-center justify-center p-6">
        <div className="bg-red-500/20 border border-red-500/30 rounded-2xl p-8 text-center max-w-md">
          <div className="text-5xl mb-4">❌</div>
          <h2 className="text-xl font-bold text-white mb-2">{error}</h2>
          <button
            onClick={() => navigate('/teacher/classes')}
            className="mt-4 px-6 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors"
          >
            Quay lại quản lý lớp
          </button>
        </div>
      </div>
    );
  }

  // Waiting room view
  if (gameState === 'waiting') {
    const readyCount = room?.players?.filter(p => p.isReady).length || 0;
    const totalCount = room?.players?.length || 0;
    const canStart = totalCount >= 2 && readyCount === totalCount;

    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-slate-900 p-4 md:p-6">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <button
              onClick={() => navigate('/teacher/classes')}
              className="flex items-center gap-2 text-white/60 hover:text-white transition-colors"
            >
              <ArrowLeft className="h-5 w-5" />
              <span className="hidden sm:inline">Quay lại</span>
            </button>
            <div className="flex items-center gap-2 px-3 py-1.5 bg-purple-500/30 rounded-full text-purple-200 text-sm">
              <Eye className="h-4 w-4" />
              Chế độ quan sát
            </div>
          </div>

          {/* Main Card */}
          <div className="bg-white/10 backdrop-blur-xl rounded-3xl overflow-hidden border border-white/10">
            {/* Room Info Header */}
            <div className="bg-gradient-to-r from-purple-600 to-indigo-600 p-6 md:p-8">
              <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">
                {room?.name || 'Phòng PK Lớp học'}
              </h1>
              
              {/* Room Code */}
              <div 
                onClick={copyRoomCode}
                className="inline-flex items-center gap-3 bg-white/20 hover:bg-white/30 rounded-xl px-4 py-3 cursor-pointer transition-colors mt-4"
              >
                <div>
                  <p className="text-white/70 text-xs">Mã phòng</p>
                  <p className="text-2xl font-mono font-bold text-white tracking-wider">{roomCode}</p>
                </div>
                <div className="p-2 bg-white/20 rounded-lg">
                  {copied ? <Check className="h-5 w-5 text-green-300" /> : <Copy className="h-5 w-5 text-white" />}
                </div>
              </div>

              {/* Settings */}
              <div className="flex flex-wrap gap-4 mt-4">
                <div className="flex items-center gap-2 text-white/80">
                  <Clock className="h-4 w-4" />
                  <span>{room?.timePerQuestion || 30}s/câu</span>
                </div>
                <div className="flex items-center gap-2 text-white/80">
                  <HelpCircle className="h-4 w-4" />
                  <span>{room?.questionCount || 10} câu hỏi</span>
                </div>
                <div className="flex items-center gap-2 text-white/80">
                  <Users className="h-4 w-4" />
                  <span>Không giới hạn người chơi</span>
                </div>
              </div>
            </div>

            {/* Teacher Notice */}
            <div className="bg-blue-500/20 border-b border-white/10 px-6 py-4">
              <p className="text-blue-200 text-center">
                👨‍🏫 Chia sẻ mã phòng <strong className="text-white">{roomCode}</strong> cho học sinh. 
                Học sinh vào <strong>PK Đối kháng</strong> → Nhập mã để tham gia.
              </p>
            </div>

            {/* Players Section */}
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-white flex items-center gap-2">
                  <Users className="h-5 w-5 text-purple-400" />
                  Học sinh đã vào phòng
                </h2>
                <span className="px-3 py-1 bg-purple-500/30 rounded-full text-purple-200 text-sm">
                  {readyCount}/{totalCount} sẵn sàng
                </span>
              </div>

              {totalCount === 0 ? (
                <div className="text-center py-12 bg-white/5 rounded-2xl">
                  <Users className="h-16 w-16 text-white/20 mx-auto mb-4" />
                  <p className="text-white/60 text-lg mb-2">Chưa có học sinh nào</p>
                  <p className="text-white/40 text-sm">Đang chờ học sinh tham gia...</p>
                </div>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                  {room?.players?.map((player, index) => (
                    <div 
                      key={player.oderId || index}
                      className={`p-4 rounded-xl border transition-all ${
                        player.isReady 
                          ? 'bg-green-500/20 border-green-500/50' 
                          : 'bg-white/5 border-white/10'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center text-lg font-bold ${
                          player.isReady ? 'bg-green-500/30 text-green-300' : 'bg-white/10 text-white/60'
                        }`}>
                          {player.avatar ? (
                            <img src={player.avatar} alt="" className="w-full h-full rounded-full object-cover" />
                          ) : (
                            (player.odername || 'U')[0].toUpperCase()
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-white font-medium truncate">{player.odername}</p>
                          <p className={`text-xs ${player.isReady ? 'text-green-400' : 'text-white/40'}`}>
                            {player.isReady ? '✓ Sẵn sàng' : 'Đang chờ...'}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="p-6 pt-0">
              {canStart ? (
                <button
                  onClick={handleStartGame}
                  className="w-full py-4 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white rounded-xl font-bold text-lg flex items-center justify-center gap-3 transition-all shadow-lg shadow-green-500/25"
                >
                  <Play className="h-6 w-6" />
                  Bắt đầu trận đấu ({totalCount} học sinh)
                </button>
              ) : (
                <div className="w-full py-4 bg-white/5 text-white/50 rounded-xl text-center">
                  {totalCount < 2 
                    ? `⏳ Cần ít nhất 2 học sinh để bắt đầu (hiện có ${totalCount})`
                    : `⏳ Đang chờ ${totalCount - readyCount} học sinh sẵn sàng...`
                  }
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Playing state - spectator view
  if (gameState === 'playing') {
    const question = room?.questions?.[currentQuestion];
    const sortedPlayers = [...(playersScores.length > 0 ? playersScores : room?.players || [])]
      .sort((a, b) => (b.score || 0) - (a.score || 0));
    
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-slate-900 p-4">
        <div className="max-w-6xl mx-auto">
          {/* Top Bar */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 px-3 py-1.5 bg-purple-500/30 rounded-full text-purple-200 text-sm">
                <Eye className="h-4 w-4" />
                Đang quan sát
              </div>
              <span className="text-white/60">{room?.name}</span>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-white">
                <HelpCircle className="h-5 w-5 text-purple-400" />
                <span className="font-bold">Câu {currentQuestion + 1}/{room?.questionCount || 10}</span>
              </div>
              <div className={`flex items-center gap-2 px-4 py-2 rounded-xl font-bold text-lg ${
                timeLeft <= 5 ? 'bg-red-500 text-white animate-pulse' : 'bg-white/10 text-white'
              }`}>
                <Clock className="h-5 w-5" />
                {timeLeft}s
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {/* Question Panel */}
            <div className="lg:col-span-2 bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
              <h2 className="text-xl md:text-2xl font-bold text-white mb-6">
                {question?.question || 'Đang tải câu hỏi...'}
              </h2>
              
              {question?.type === 'multiple-choice' && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {question.options?.map((option, index) => (
                    <div 
                      key={index}
                      className={`p-4 rounded-xl border-2 transition-all ${
                        timeLeft === 0 && index === question.correctAnswer
                          ? 'bg-green-500/30 border-green-500'
                          : 'bg-white/5 border-white/10'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold ${
                          timeLeft === 0 && index === question.correctAnswer
                            ? 'bg-green-500 text-white'
                            : 'bg-white/10 text-white/60'
                        }`}>
                          {String.fromCharCode(65 + index)}
                        </span>
                        <span className="text-white flex-1">{option}</span>
                        {timeLeft === 0 && index === question.correctAnswer && (
                          <Check className="h-5 w-5 text-green-400" />
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {timeLeft === 0 && question?.explanation && (
                <div className="mt-4 p-4 bg-blue-500/20 rounded-xl border border-blue-500/30">
                  <p className="text-blue-200">
                    <strong>💡 Giải thích:</strong> {question.explanation}
                  </p>
                </div>
              )}
            </div>

            {/* Leaderboard Panel */}
            <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-4 border border-white/10">
              <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                <Trophy className="h-5 w-5 text-yellow-400" />
                Bảng xếp hạng
              </h3>
              
              <div className="space-y-2 max-h-[60vh] overflow-y-auto">
                {sortedPlayers.map((player, index) => (
                  <div 
                    key={player.oderId || index}
                    className={`flex items-center gap-3 p-3 rounded-xl transition-all ${
                      index === 0 ? 'bg-yellow-500/20 border border-yellow-500/30' :
                      index === 1 ? 'bg-gray-400/20 border border-gray-400/30' :
                      index === 2 ? 'bg-orange-500/20 border border-orange-500/30' :
                      'bg-white/5'
                    }`}
                  >
                    <div className="w-8 text-center">
                      {index === 0 ? <Crown className="h-5 w-5 text-yellow-400 mx-auto" /> :
                       index === 1 ? <Medal className="h-5 w-5 text-gray-400 mx-auto" /> :
                       index === 2 ? <Medal className="h-5 w-5 text-orange-400 mx-auto" /> :
                       <span className="text-white/40">#{index + 1}</span>
                      }
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-white font-medium truncate">{player.odername}</p>
                      <p className="text-white/40 text-xs">
                        {player.correctAnswers || 0} câu đúng
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold text-purple-400">{player.score || 0}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Finished state
  if (gameState === 'finished') {
    const sortedResults = [...(gameResults || [])].sort((a, b) => (a.rank || 999) - (b.rank || 999));
    
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-slate-900 p-4 md:p-6">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="text-6xl mb-4">🏆</div>
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">Kết thúc trận đấu!</h1>
            <p className="text-white/60">{room?.name}</p>
          </div>

          {/* Results */}
          <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-6 border border-white/10">
            <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <Trophy className="h-6 w-6 text-yellow-400" />
              Bảng xếp hạng cuối cùng
            </h2>

            <div className="space-y-3">
              {sortedResults.map((result, index) => (
                <div 
                  key={result.oderId || index}
                  className={`flex items-center gap-4 p-4 rounded-2xl transition-all ${
                    index === 0 ? 'bg-gradient-to-r from-yellow-500/30 to-amber-500/30 border-2 border-yellow-500/50' :
                    index === 1 ? 'bg-gradient-to-r from-gray-400/20 to-gray-500/20 border border-gray-400/30' :
                    index === 2 ? 'bg-gradient-to-r from-orange-500/20 to-amber-600/20 border border-orange-500/30' :
                    'bg-white/5'
                  }`}
                >
                  <div className="text-3xl">
                    {index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : `#${index + 1}`}
                  </div>
                  
                  <div className="flex-1">
                    <p className={`font-bold text-lg ${index === 0 ? 'text-yellow-300' : 'text-white'}`}>
                      {result.odername}
                    </p>
                    <div className="flex items-center gap-3 text-sm text-white/60">
                      <span>{result.correctAnswers}/{room?.questionCount || 10} câu đúng</span>
                      {result.timeTaken && <span>• {Math.round(result.timeTaken / 1000)}s</span>}
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <p className={`text-2xl font-bold ${index === 0 ? 'text-yellow-400' : 'text-purple-400'}`}>
                      {result.score}
                    </p>
                    <p className="text-white/40 text-sm">điểm</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Back Button */}
            <button
              onClick={() => navigate('/teacher/classes')}
              className="w-full mt-6 py-4 bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 text-white rounded-xl font-bold flex items-center justify-center gap-2 transition-all"
            >
              <ArrowLeft className="h-5 w-5" />
              Quay lại quản lý lớp học
            </button>
          </div>
        </div>
      </div>
    );
  }

  return null;
};

export default PKSpectate;
