import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../contexts/AuthContext';
import { usePKRoom } from '../../../contexts/PKRoomContext';
import { API_BASE_URL } from '../../../config/api';
import { 
  ArrowLeft, 
  Swords, 
  Users, 
  User, 
  Plus, 
  LogIn, 
  Loader2, 
  RefreshCw,
  Clock,
  HelpCircle,
  BookOpen,
  CheckCircle2
} from 'lucide-react';

const PKSelection = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { pkRoom } = usePKRoom();
  const [activeTab, setActiveTab] = useState('create');
  const [mode, setMode] = useState('v1v1');
  const [roomCode, setRoomCode] = useState('');
  const [roomName, setRoomName] = useState('');
  const [questionCount, setQuestionCount] = useState(10);
  const [timePerQuestion, setTimePerQuestion] = useState(30);
  const [maxPlayers, setMaxPlayers] = useState(4);
  const [availableRooms, setAvailableRooms] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Lấy lớp hiện tại của người dùng từ chương trình hóa học
  const getUserGrade = () => {
    if (!user) return 10; // Default grade
    
    // Ưu tiên lấy từ chương trình hóa học
    const chemistryProgram = user.programs?.find(p => p.programId === 'chemistry');
    if (chemistryProgram && chemistryProgram.currentClass) {
      return chemistryProgram.currentClass;
    }
    
    // Fallback về profile grade
    if (user.profile?.grade) {
      return user.profile.grade;
    }
    
    // Default
    return 10;
  };

  const userGrade = getUserGrade();

  // Kiểm tra nếu đã trong phòng PK thì redirect về phòng đó
  useEffect(() => {
    if (pkRoom && pkRoom.roomCode) {
      navigate(`/chemistry/pk/room/${pkRoom.roomCode}`);
    }
  }, [pkRoom, navigate]);

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
    fetchAvailableRooms();
  }, [user, navigate]);

  const fetchAvailableRooms = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/pk/available`);
      if (response.ok) {
        const rooms = await response.json();
        setAvailableRooms(rooms);
      } else {
        console.warn('Failed to fetch rooms:', response.status);
      }
    } catch (err) {
      console.error('Error fetching rooms:', err);
      setAvailableRooms([]);
    }
  };

  const handleCreateRoom = async () => {
    if (!user) {
      setError('Vui lòng đăng nhập để tạo phòng');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const userName = user.username || user.displayName || user.email?.split('@')[0] || 'Player';
      const response = await fetch(`${API_BASE_URL}/pk/create`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: user._id || user.id,
          username: userName,
          avatar: user.avatar || '',
          mode,
          name: roomName || `Phòng của ${userName}`,
          grade: userGrade,
          questionCount,
          timePerQuestion,
          maxPlayers: mode === 'v1v1' ? 2 : maxPlayers
        })
      });

      if (!response.ok) {
        throw new Error(`Server error: ${response.status}`);
      }

      const data = await response.json();
      
      if (data.room && data.room.roomCode) {
        navigate(`/chemistry/pk/room/${data.room.roomCode}`);
      } else {
        setError(data.message || 'Lỗi tạo phòng');
      }
    } catch (err) {
      setError('Không thể kết nối đến server. Vui lòng kiểm tra server đã chạy chưa.');
      console.error('Create room error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleJoinRoom = async (code, roomGrade = null) => {
    if (!user) {
      setError('Vui lòng đăng nhập để tham gia');
      return;
    }

    const joinCode = code || roomCode;
    if (!joinCode) {
      setError('Vui lòng nhập mã phòng');
      return;
    }

    // Kiểm tra lớp nếu biết trước grade của phòng
    if (roomGrade && roomGrade !== userGrade) {
      setError(`Phòng này dành cho lớp ${roomGrade}. Bạn đang ở lớp ${userGrade} nên không thể tham gia.`);
      return;
    }

    setLoading(true);
    setError('');

    try {
      const userName = user.username || user.displayName || user.email?.split('@')[0] || 'Player';
      const response = await fetch(`${API_BASE_URL}/pk/join`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          roomCode: joinCode,
          userId: user._id || user.id,
          username: userName,
          avatar: user.avatar || ''
        })
      });

      if (!response.ok) {
        throw new Error(`Server error: ${response.status}`);
      }

      const data = await response.json();
      
      if (data.room && data.room.roomCode) {
        navigate(`/chemistry/pk/room/${data.room.roomCode}`);
      } else {
        setError(data.message || 'Lỗi tham gia phòng');
      }
    } catch (err) {
      setError('Không thể kết nối đến server. Vui lòng kiểm tra server đã chạy chưa.');
      console.error('Join room error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Animated Background Decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-br from-orange-500/20 to-red-500/20 rounded-full mix-blend-screen filter blur-3xl animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full mix-blend-screen filter blur-3xl animate-blob animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-gradient-to-br from-emerald-500/15 to-teal-500/15 rounded-full mix-blend-screen filter blur-3xl animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative z-10 mx-auto px-4 py-8 w-[90%]">
        {/* Header */}
        <div className="text-center mb-10">
        
          
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
            <span className="bg-gradient-to-r from-orange-400 via-red-500 to-pink-500 bg-clip-text text-transparent animate-pulse">
              ⚔️ Đấu Trường Hóa Học ⚔️
            </span>
          </h1>
          <p className="text-white/70 text-lg">
            Thách đấu cùng bạn bè, chinh phục đỉnh cao!
          </p>
        </div>

        {/* Mode Selection */}
        <div className="grid md:grid-cols-2 gap-4 mb-8">
          <div 
            onClick={() => setMode('v1v1')}
            className={`relative p-6 rounded-2xl cursor-pointer transition-all duration-300 border-2 ${
              mode === 'v1v1' 
                ? 'bg-gradient-to-br from-orange-500/30 to-red-500/30 border-orange-400 shadow-lg shadow-orange-500/20' 
                : 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20'
            }`}
          >
            {mode === 'v1v1' && (
              <div className="absolute top-3 right-3">
                <CheckCircle2 className="w-6 h-6 text-orange-400" />
              </div>
            )}
            <div className="text-5xl mb-4 text-center">👤⚔️👤</div>
            <h3 className="text-xl font-bold text-white mb-2 text-center">PK 1 vs 1</h3>
            <p className="text-white/60 text-sm text-center mb-4">Đối đầu trực tiếp, 2 người chơi</p>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-white/80 text-sm">
                <span className="text-green-400">✓</span> Thi đấu nhanh
              </div>
              <div className="flex items-center gap-2 text-white/80 text-sm">
                <span className="text-green-400">✓</span> Căng thẳng, kịch tính
              </div>
              <div className="flex items-center gap-2 text-white/80 text-sm">
                <span className="text-green-400">✓</span> Phù hợp thách đấu bạn bè
              </div>
            </div>
          </div>

          <div 
            onClick={() => setMode('multiplayer')}
            className={`relative p-6 rounded-2xl cursor-pointer transition-all duration-300 border-2 ${
              mode === 'multiplayer' 
                ? 'bg-gradient-to-br from-purple-500/30 to-blue-500/30 border-purple-400 shadow-lg shadow-purple-500/20' 
                : 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20'
            }`}
          >
            {mode === 'multiplayer' && (
              <div className="absolute top-3 right-3">
                <CheckCircle2 className="w-6 h-6 text-purple-400" />
              </div>
            )}
            <div className="text-5xl mb-4 text-center">👥⚔️👥</div>
            <h3 className="text-xl font-bold text-white mb-2 text-center">Nhiều Người Chơi</h3>
            <p className="text-white/60 text-sm text-center mb-4">Từ 2-10 người chơi cùng lúc</p>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-white/80 text-sm">
                <span className="text-green-400">✓</span> Vui nhộn, sôi động
              </div>
              <div className="flex items-center gap-2 text-white/80 text-sm">
                <span className="text-green-400">✓</span> Bảng xếp hạng theo thời gian thực
              </div>
              <div className="flex items-center gap-2 text-white/80 text-sm">
                <span className="text-green-400">✓</span> Thi đấu nhóm bạn
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex justify-center gap-2 mb-6">
          <button 
            onClick={() => setActiveTab('create')}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all ${
              activeTab === 'create'
                ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg shadow-purple-500/30'
                : 'bg-white/10 text-white/70 hover:bg-white/20 hover:text-white'
            }`}
          >
            <Plus className="w-5 h-5" />
            Tạo Phòng
          </button>
          <button 
            onClick={() => setActiveTab('join')}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all ${
              activeTab === 'join'
                ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg shadow-purple-500/30'
                : 'bg-white/10 text-white/70 hover:bg-white/20 hover:text-white'
            }`}
          >
            <LogIn className="w-5 h-5" />
            Tham Gia
          </button>
        </div>

        {/* Content Card */}
        <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-6 md:p-8">
          {activeTab === 'create' ? (
            <div className="space-y-6">
              {/* Room Name */}
              <div>
                <label className="block text-white/80 text-sm font-medium mb-2">
                  Tên phòng (tùy chọn)
                </label>
                <input
                  type="text"
                  value={roomName}
                  onChange={(e) => setRoomName(e.target.value)}
                  placeholder={`Phòng của ${user?.username || 'bạn'}`}
                  maxLength={50}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/40 focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-400/30 transition-all"
                />
              </div>

              {/* Questions & Time Settings */}
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-white/80 text-sm font-medium mb-2">
                    <HelpCircle className="w-4 h-4 inline mr-2" />
                    Số câu hỏi
                  </label>
                  <select 
                    value={questionCount} 
                    onChange={(e) => setQuestionCount(Number(e.target.value))}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-400/30 transition-all appearance-none cursor-pointer"
                  >
                    {[5, 10, 15, 20, 25, 30].map(n => (
                      <option key={n} value={n} className="bg-slate-800 text-white">{n} câu</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Row 2: Time & Players */}
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-white/80 text-sm font-medium mb-2">
                    <Clock className="w-4 h-4 inline mr-2" />
                    Thời gian/câu
                  </label>
                  <select 
                    value={timePerQuestion} 
                    onChange={(e) => setTimePerQuestion(Number(e.target.value))}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-400/30 transition-all appearance-none cursor-pointer"
                  >
                    {[10, 15, 20, 30, 45, 60].map(t => (
                      <option key={t} value={t} className="bg-slate-800 text-white">{t} giây</option>
                    ))}
                  </select>
                </div>

                {mode === 'multiplayer' && (
                  <div>
                    <label className="block text-white/80 text-sm font-medium mb-2">
                      <Users className="w-4 h-4 inline mr-2" />
                      Số người tối đa
                    </label>
                    <select 
                      value={maxPlayers} 
                      onChange={(e) => setMaxPlayers(Number(e.target.value))}
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-400/30 transition-all appearance-none cursor-pointer"
                    >
                      {[2, 3, 4, 5, 6, 8, 10].map(n => (
                        <option key={n} value={n} className="bg-slate-800 text-white">{n} người</option>
                      ))}
                    </select>
                  </div>
                )}
              </div>

              {/* Error Message */}
              {error && (
                <div className="bg-red-500/20 border border-red-500/50 rounded-xl px-4 py-3 text-red-300 text-sm text-center">
                  {error}
                </div>
              )}

              {/* Create Button */}
              <button 
                onClick={handleCreateRoom}
                disabled={loading}
                className="w-full py-4 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 disabled:from-gray-500 disabled:to-gray-600 text-white font-bold text-lg rounded-xl transition-all duration-300 transform hover:scale-[1.02] hover:shadow-lg hover:shadow-orange-500/30 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-3"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Đang tạo...
                  </>
                ) : (
                  <>
                    🎮 Tạo Phòng & Bắt Đầu
                  </>
                )}
              </button>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Join by Code */}
              <div>
                <h3 className="text-white font-semibold text-center mb-4">Nhập mã phòng</h3>
                <div className="flex gap-3">
                  <input
                    type="text"
                    value={roomCode}
                    onChange={(e) => setRoomCode(e.target.value.toUpperCase())}
                    placeholder="VD: ABC123"
                    maxLength={6}
                    className="flex-1 px-4 py-4 bg-white/10 border-2 border-white/20 rounded-xl text-white text-center text-2xl font-bold tracking-widest placeholder-white/30 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400/30 transition-all uppercase"
                  />
                  <button 
                    onClick={() => handleJoinRoom()}
                    disabled={loading || !roomCode}
                    className="px-6 py-4 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 disabled:from-gray-500 disabled:to-gray-600 text-white font-bold rounded-xl transition-all disabled:cursor-not-allowed flex items-center gap-2"
                  >
                    {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : '🚀 Vào'}
                  </button>
                </div>
                {error && (
                  <div className="mt-3 bg-red-500/20 border border-red-500/50 rounded-xl px-4 py-3 text-red-300 text-sm text-center">
                    {error}
                  </div>
                )}
              </div>

              {/* Divider */}
              <div className="flex items-center gap-4">
                <div className="flex-1 h-px bg-white/20"></div>
                <span className="text-white/50 text-sm">hoặc chọn phòng có sẵn</span>
                <div className="flex-1 h-px bg-white/20"></div>
              </div>

              {/* Room List */}
              <div className="space-y-3 max-h-72 overflow-y-auto custom-scrollbar">
                {availableRooms.length === 0 ? (
                  <div className="text-center py-10">
                    <div className="text-5xl mb-4">🏠</div>
                    <p className="text-white/60 mb-4">Chưa có phòng nào đang chờ</p>
                    <button 
                      onClick={() => setActiveTab('create')}
                      className="px-6 py-2 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-semibold rounded-xl transition-all"
                    >
                      Tạo phòng mới
                    </button>
                  </div>
                ) : (
                  availableRooms.map(room => {
                    const canJoin = room.grade === userGrade;
                    return (
                      <div 
                        key={room._id} 
                        className={`flex items-center justify-between p-4 border rounded-xl transition-all ${
                          canJoin 
                            ? 'bg-white/5 hover:bg-white/10 border-white/10 hover:border-white/20' 
                            : 'bg-red-500/5 border-red-500/20 opacity-60'
                        }`}
                      >
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <span className="text-white font-semibold">{room.name}</span>
                            <span className={`px-2 py-0.5 text-xs font-bold rounded-full ${
                              room.mode === 'v1v1' 
                                ? 'bg-gradient-to-r from-orange-500 to-red-500' 
                                : 'bg-gradient-to-r from-purple-500 to-blue-500'
                            } text-white`}>
                              {room.mode === 'v1v1' ? '1v1' : 'Multi'}
                            </span>
                            {!canJoin && (
                              <span className="px-2 py-0.5 text-xs font-medium rounded-full bg-red-500/20 text-red-300 border border-red-500/30">
                                Khác lớp
                              </span>
                            )}
                          </div>
                          <div className="flex flex-wrap gap-3 text-white/60 text-sm">
                            <span className={`flex items-center gap-1 ${!canJoin ? 'text-red-400' : ''}`}>
                              <BookOpen className="w-3 h-3" />
                              Lớp {room.grade}
                              {!canJoin && <span className="text-xs">(Bạn: Lớp {userGrade})</span>}
                            </span>
                            <span className="flex items-center gap-1">
                              <HelpCircle className="w-3 h-3" />
                              {room.questionCount} câu
                            </span>
                            <span className="flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              {room.timePerQuestion}s
                            </span>
                            <span className="flex items-center gap-1">
                              <Users className="w-3 h-3" />
                              {room.players.length}/{room.maxPlayers}
                            </span>
                          </div>
                        </div>
                        {canJoin ? (
                          <button 
                            onClick={() => handleJoinRoom(room.roomCode, room.grade)}
                            disabled={loading}
                            className="px-5 py-2 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white font-semibold rounded-xl transition-all disabled:opacity-50"
                          >
                            Tham gia
                          </button>
                        ) : (
                          <div className="px-4 py-2 bg-gray-500/30 text-gray-400 font-medium rounded-xl cursor-not-allowed text-sm">
                            🔒 Khác lớp
                          </div>
                        )}
                      </div>
                    );
                  })
                )}
              </div>

              {/* Refresh Button */}
              <button 
                onClick={fetchAvailableRooms}
                className="w-full py-3 bg-white/10 hover:bg-white/20 border border-white/20 text-white/80 hover:text-white font-medium rounded-xl transition-all flex items-center justify-center gap-2"
              >
                <RefreshCw className="w-4 h-4" />
                Làm mới danh sách
              </button>
            </div>
          )}
        </div>
      </div>

      {/* CSS Animations */}
      <style>{`
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.3);
          border-radius: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.5);
        }
      `}</style>
    </div>
  );
};

export default PKSelection;
