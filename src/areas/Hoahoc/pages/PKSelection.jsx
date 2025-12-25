import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../contexts/AuthContext';
import { API_BASE_URL } from '../../../config/api';
import './CSS/PKSelection.css';

const PKSelection = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('create'); // 'create' or 'join'
  const [mode, setMode] = useState('v1v1');
  const [roomCode, setRoomCode] = useState('');
  const [roomName, setRoomName] = useState('');
  const [grade, setGrade] = useState(8);
  const [questionCount, setQuestionCount] = useState(10);
  const [timePerQuestion, setTimePerQuestion] = useState(30);
  const [maxPlayers, setMaxPlayers] = useState(4);
  const [availableRooms, setAvailableRooms] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

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
          grade,
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

  const handleJoinRoom = async (code) => {
    if (!user) {
      setError('Vui lòng đăng nhập để tham gia');
      return;
    }

    const joinCode = code || roomCode;
    if (!joinCode) {
      setError('Vui lòng nhập mã phòng');
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
    <div className="pk-selection-container">
      {/* Background decoration */}
      <div className="pk-bg-decoration">
        <div className="pk-bg-circle pk-bg-circle-1"></div>
        <div className="pk-bg-circle pk-bg-circle-2"></div>
        <div className="pk-bg-circle pk-bg-circle-3"></div>
      </div>

      {/* Header */}
      <div className="pk-header">
        <button className="pk-back-btn" onClick={() => navigate('/chemistry')}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
          Quay lại
        </button>
        <h1 className="pk-title">
          <span className="pk-title-icon">⚔️</span>
          Đấu Trường Hóa Học
          <span className="pk-title-icon">⚔️</span>
        </h1>
        <p className="pk-subtitle">Thách đấu cùng bạn bè, chinh phục đỉnh cao!</p>
      </div>

      {/* Mode Selection */}
      <div className="pk-mode-selection">
        <div 
          className={`pk-mode-card ${mode === 'v1v1' ? 'active' : ''}`}
          onClick={() => setMode('v1v1')}
        >
          <div className="pk-mode-icon">👤⚔️👤</div>
          <h3>PK 1 vs 1</h3>
          <p>Đối đầu trực tiếp, 2 người chơi</p>
          <ul>
            <li>✅ Thi đấu nhanh</li>
            <li>✅ Căng thẳng, kịch tính</li>
            <li>✅ Phù hợp thách đấu bạn bè</li>
          </ul>
        </div>

        <div 
          className={`pk-mode-card ${mode === 'multiplayer' ? 'active' : ''}`}
          onClick={() => setMode('multiplayer')}
        >
          <div className="pk-mode-icon">👥⚔️👥</div>
          <h3>Nhiều Người Chơi</h3>
          <p>Từ 2-10 người chơi cùng lúc</p>
          <ul>
            <li>✅ Vui nhộn, sôi động</li>
            <li>✅ Bảng xếp hạng theo thời gian thực</li>
            <li>✅ Thi đấu nhóm bạn</li>
          </ul>
        </div>
      </div>

      {/* Tabs */}
      <div className="pk-tabs">
        <button 
          className={`pk-tab ${activeTab === 'create' ? 'active' : ''}`}
          onClick={() => setActiveTab('create')}
        >
          🏠 Tạo Phòng
        </button>
        <button 
          className={`pk-tab ${activeTab === 'join' ? 'active' : ''}`}
          onClick={() => setActiveTab('join')}
        >
          🚪 Tham Gia
        </button>
      </div>

      {/* Content */}
      <div className="pk-content">
        {activeTab === 'create' ? (
          <div className="pk-create-form">
            <div className="pk-form-group">
              <label>Tên phòng (tùy chọn)</label>
              <input
                type="text"
                value={roomName}
                onChange={(e) => setRoomName(e.target.value)}
                placeholder={`Phòng của ${user?.username || 'bạn'}`}
                maxLength={50}
              />
            </div>

            <div className="pk-form-row">
              <div className="pk-form-group">
                <label>Lớp</label>
                <select value={grade} onChange={(e) => setGrade(Number(e.target.value))}>
                  {[8, 9, 10, 11, 12].map(g => (
                    <option key={g} value={g}>Lớp {g}</option>
                  ))}
                </select>
              </div>

              <div className="pk-form-group">
                <label>Số câu hỏi</label>
                <select value={questionCount} onChange={(e) => setQuestionCount(Number(e.target.value))}>
                  {[5, 10, 15, 20, 25, 30].map(n => (
                    <option key={n} value={n}>{n} câu</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="pk-form-row">
              <div className="pk-form-group">
                <label>Thời gian/câu</label>
                <select value={timePerQuestion} onChange={(e) => setTimePerQuestion(Number(e.target.value))}>
                  {[10, 15, 20, 30, 45, 60].map(t => (
                    <option key={t} value={t}>{t} giây</option>
                  ))}
                </select>
              </div>

              {mode === 'multiplayer' && (
                <div className="pk-form-group">
                  <label>Số người tối đa</label>
                  <select value={maxPlayers} onChange={(e) => setMaxPlayers(Number(e.target.value))}>
                    {[2, 3, 4, 5, 6, 8, 10].map(n => (
                      <option key={n} value={n}>{n} người</option>
                    ))}
                  </select>
                </div>
              )}
            </div>

            {error && <div className="pk-error">{error}</div>}

            <button 
              className="pk-create-btn"
              onClick={handleCreateRoom}
              disabled={loading}
            >
              {loading ? (
                <>
                  <span className="pk-spinner"></span>
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
          <div className="pk-join-section">
            <div className="pk-join-code">
              <h3>Nhập mã phòng</h3>
              <div className="pk-code-input-wrapper">
                <input
                  type="text"
                  value={roomCode}
                  onChange={(e) => setRoomCode(e.target.value.toUpperCase())}
                  placeholder="VD: ABC123"
                  maxLength={6}
                />
                <button 
                  className="pk-join-btn"
                  onClick={() => handleJoinRoom()}
                  disabled={loading || !roomCode}
                >
                  {loading ? <span className="pk-spinner"></span> : '🚀 Vào'}
                </button>
              </div>
              {error && <div className="pk-error">{error}</div>}
            </div>

            <div className="pk-divider">
              <span>hoặc chọn phòng có sẵn</span>
            </div>

            <div className="pk-room-list">
              {availableRooms.length === 0 ? (
                <div className="pk-no-rooms">
                  <span>🏠</span>
                  <p>Chưa có phòng nào đang chờ</p>
                  <button onClick={() => setActiveTab('create')}>Tạo phòng mới</button>
                </div>
              ) : (
                availableRooms.map(room => (
                  <div key={room._id} className="pk-room-item">
                    <div className="pk-room-info">
                      <div className="pk-room-name">
                        {room.name}
                        <span className={`pk-room-mode ${room.mode}`}>
                          {room.mode === 'v1v1' ? '1v1' : 'Multi'}
                        </span>
                      </div>
                      <div className="pk-room-details">
                        <span>📚 Lớp {room.grade}</span>
                        <span>❓ {room.questionCount} câu</span>
                        <span>⏱️ {room.timePerQuestion}s</span>
                        <span>👥 {room.players.length}/{room.maxPlayers}</span>
                      </div>
                    </div>
                    <button 
                      className="pk-join-room-btn"
                      onClick={() => handleJoinRoom(room.roomCode)}
                      disabled={loading}
                    >
                      Tham gia
                    </button>
                  </div>
                ))
              )}
            </div>

            <button className="pk-refresh-btn" onClick={fetchAvailableRooms}>
              🔄 Làm mới danh sách
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PKSelection;
