import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../config/api';
import { useAuth } from '../../contexts/AuthContext';

const MyClasses = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  
  // States
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showJoinModal, setShowJoinModal] = useState(false);
  const [classCode, setClassCode] = useState('');
  const [joining, setJoining] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [selectedClass, setSelectedClass] = useState(null);
  const [showLeaveConfirm, setShowLeaveConfirm] = useState(false);

  // Grade info for display
  const gradeInfo = {
    8: { color: 'from-blue-500 to-blue-600', icon: '🧪' },
    9: { color: 'from-green-500 to-green-600', icon: '⚗️' },
    10: { color: 'from-purple-500 to-purple-600', icon: '🔬' },
    11: { color: 'from-orange-500 to-orange-600', icon: '⚛️' },
    12: { color: 'from-pink-500 to-pink-600', icon: '🎓' }
  };

  // Fetch user's classes
  const fetchClasses = async () => {
    try {
      setLoading(true);
      const response = await api.get('/users/classes');
      
      if (response.data.success) {
        setClasses(response.data.data);
      }
    } catch (err) {
      console.error('Error fetching classes:', err);
      setError('Không thể tải danh sách lớp học');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      fetchClasses();
    }
  }, [user]);

  // Join class
  const handleJoinClass = async (e) => {
    e.preventDefault();
    
    if (!classCode.trim()) {
      setError('Vui lòng nhập mã lớp');
      return;
    }

    try {
      setJoining(true);
      setError('');
      
      const response = await api.post('/users/classes/join', {
        classCode: classCode.trim()
      });

      if (response.data.success) {
        setSuccessMessage(response.data.message);
        setClassCode('');
        setShowJoinModal(false);
        fetchClasses(); // Refresh list
        
        setTimeout(() => setSuccessMessage(''), 3000);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Không thể tham gia lớp học');
    } finally {
      setJoining(false);
    }
  };

  // Leave class
  const handleLeaveClass = async () => {
    if (!selectedClass) return;

    try {
      const response = await api.delete(
        `/users/classes/${selectedClass._id}/leave`
      );

      if (response.data.success) {
        setSuccessMessage('Đã rời khỏi lớp học');
        setShowLeaveConfirm(false);
        setSelectedClass(null);
        fetchClasses();
        
        setTimeout(() => setSuccessMessage(''), 3000);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Không thể rời khỏi lớp');
    }
  };

  // Navigate to class detail
  const handleClassClick = (classRoom) => {
    if (classRoom.enrollmentStatus === 'active') {
      navigate(`/student/classes/${classRoom._id}`);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-purple-500 mx-auto mb-4"></div>
          <p className="text-white/70">Đang tải...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 p-6">
      {/* Header */}
      <div className="max-w-6xl mx-auto mb-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-white flex items-center gap-3">
              <span className="text-4xl">🏫</span>
              Lớp học của tôi
            </h1>
            <p className="text-white/60 mt-2">
              Quản lý và theo dõi các lớp học bạn đã tham gia
            </p>
          </div>
          
          <button
            onClick={() => setShowJoinModal(true)}
            className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-purple-500/30 transition-all duration-300 flex items-center gap-2"
          >
            <span className="text-xl">➕</span>
            Tham gia lớp học
          </button>
        </div>
      </div>

      {/* Success Message */}
      {successMessage && (
        <div className="max-w-6xl mx-auto mb-6">
          <div className="bg-green-500/20 border border-green-500/30 text-green-400 px-4 py-3 rounded-xl flex items-center gap-2">
            <span>✅</span>
            {successMessage}
          </div>
        </div>
      )}

      {/* Error Message */}
      {error && !showJoinModal && (
        <div className="max-w-6xl mx-auto mb-6">
          <div className="bg-red-500/20 border border-red-500/30 text-red-400 px-4 py-3 rounded-xl flex items-center gap-2">
            <span>❌</span>
            {error}
            <button onClick={() => setError('')} className="ml-auto">✕</button>
          </div>
        </div>
      )}

      {/* Classes Grid */}
      <div className="max-w-6xl mx-auto">
        {classes.length === 0 ? (
          <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-12 text-center">
            <div className="text-6xl mb-4">📚</div>
            <h3 className="text-xl font-semibold text-white mb-2">
              Chưa có lớp học nào
            </h3>
            <p className="text-white/60 mb-6">
              Nhập mã lớp từ giáo viên để bắt đầu tham gia học cùng bạn bè!
            </p>
            <button
              onClick={() => setShowJoinModal(true)}
              className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all"
            >
              Tham gia lớp học ngay
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {classes.map((classRoom) => {
              const grade = gradeInfo[classRoom.grade] || gradeInfo[8];
              const isPending = classRoom.enrollmentStatus === 'pending';
              
              return (
                <div
                  key={classRoom._id}
                  onClick={() => !isPending && handleClassClick(classRoom)}
                  className={`bg-white/5 backdrop-blur-lg rounded-2xl overflow-hidden border border-white/10 hover:border-purple-500/50 transition-all duration-300 ${
                    isPending ? 'opacity-75' : 'cursor-pointer hover:shadow-lg hover:shadow-purple-500/20 hover:scale-[1.02]'
                  }`}
                >
                  {/* Header */}
                  <div className={`bg-gradient-to-r ${grade.color} p-4`}>
                    <div className="flex items-center justify-between">
                      <span className="text-3xl">{grade.icon}</span>
                      <span className="bg-white/20 px-3 py-1 rounded-full text-sm text-white font-medium">
                        Lớp {classRoom.grade}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold text-white mt-2 line-clamp-1">
                      {classRoom.name}
                    </h3>
                    <p className="text-white/80 text-sm">
                      Mã lớp: <span className="font-mono font-bold">{classRoom.code}</span>
                    </p>
                  </div>

                  {/* Content */}
                  <div className="p-4 space-y-4">
                    {/* Teacher Info */}
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-purple-500/20 rounded-full flex items-center justify-center">
                        <span className="text-xl">👨‍🏫</span>
                      </div>
                      <div>
                        <p className="text-sm text-white/60">Giáo viên</p>
                        <p className="text-white font-medium">
                          {classRoom.teacher?.displayName || classRoom.teacher?.username}
                        </p>
                      </div>
                    </div>

                    {/* Status */}
                    {isPending ? (
                      <div className="bg-yellow-500/20 border border-yellow-500/30 rounded-lg p-3 flex items-center gap-2">
                        <span className="animate-pulse">⏳</span>
                        <span className="text-yellow-400 text-sm">
                          Đang chờ duyệt
                        </span>
                      </div>
                    ) : (
                      <>
                        {/* Stats */}
                        <div className="grid grid-cols-2 gap-3">
                          <div className="bg-white/5 rounded-lg p-3 text-center">
                            <p className="text-2xl font-bold text-white">
                              {classRoom.studentCount || 0}
                            </p>
                            <p className="text-xs text-white/60">Học sinh</p>
                          </div>
                          <div className="bg-white/5 rounded-lg p-3 text-center">
                            <p className="text-2xl font-bold text-white">
                              {classRoom.statistics?.activeStudents || 0}
                            </p>
                            <p className="text-xs text-white/60">Hoạt động</p>
                          </div>
                        </div>

                        {/* Recent Announcement */}
                        {classRoom.announcements?.[0] && (
                          <div className="bg-blue-500/10 rounded-lg p-3">
                            <p className="text-xs text-blue-400 mb-1">📢 Thông báo mới</p>
                            <p className="text-sm text-white/80 line-clamp-2">
                              {classRoom.announcements[0].title}
                            </p>
                          </div>
                        )}
                      </>
                    )}

                    {/* Actions */}
                    <div className="flex gap-2 pt-2">
                      {!isPending && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleClassClick(classRoom);
                          }}
                          className="flex-1 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg text-sm font-medium transition-colors"
                        >
                          Vào lớp
                        </button>
                      )}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedClass(classRoom);
                          setShowLeaveConfirm(true);
                        }}
                        className="px-4 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded-lg text-sm font-medium transition-colors"
                      >
                        Rời
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Join Class Modal */}
      {showJoinModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 rounded-2xl p-6 w-full max-w-md border border-white/10">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <span>🔑</span>
                Tham gia lớp học
              </h2>
              <button
                onClick={() => {
                  setShowJoinModal(false);
                  setClassCode('');
                  setError('');
                }}
                className="text-white/60 hover:text-white"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleJoinClass}>
              <div className="mb-6">
                <label className="block text-sm text-white/70 mb-2">
                  Mã lớp học
                </label>
                <input
                  type="text"
                  value={classCode}
                  onChange={(e) => setClassCode(e.target.value.toUpperCase())}
                  placeholder="Nhập mã lớp (VD: ABC123)"
                  className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white placeholder-white/40 focus:outline-none focus:border-purple-500 font-mono text-lg text-center tracking-widest uppercase"
                  maxLength={6}
                  autoFocus
                />
                <p className="text-xs text-white/50 mt-2">
                  💡 Hỏi giáo viên của bạn để lấy mã lớp
                </p>
              </div>

              {error && showJoinModal && (
                <div className="mb-4 p-3 bg-red-500/20 border border-red-500/30 rounded-lg text-red-400 text-sm">
                  {error}
                </div>
              )}

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setShowJoinModal(false);
                    setClassCode('');
                    setError('');
                  }}
                  className="flex-1 py-3 bg-white/10 hover:bg-white/20 text-white rounded-xl font-medium transition-colors"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  disabled={joining || !classCode.trim()}
                  className="flex-1 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg transition-all flex items-center justify-center gap-2"
                >
                  {joining ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-2 border-white/30 border-t-white"></div>
                      Đang xử lý...
                    </>
                  ) : (
                    <>
                      <span>🚀</span>
                      Tham gia
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Leave Confirmation Modal */}
      {showLeaveConfirm && selectedClass && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 rounded-2xl p-6 w-full max-w-md border border-white/10">
            <div className="text-center mb-6">
              <div className="text-5xl mb-4">😢</div>
              <h2 className="text-xl font-bold text-white mb-2">
                Rời khỏi lớp học?
              </h2>
              <p className="text-white/60">
                Bạn có chắc muốn rời khỏi lớp <span className="text-white font-semibold">{selectedClass.name}</span>?
              </p>
              <p className="text-sm text-orange-400 mt-2">
                ⚠️ Bạn sẽ không thể xem bài tập và thông báo của lớp nữa
              </p>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => {
                  setShowLeaveConfirm(false);
                  setSelectedClass(null);
                }}
                className="flex-1 py-3 bg-white/10 hover:bg-white/20 text-white rounded-xl font-medium transition-colors"
              >
                Hủy
              </button>
              <button
                onClick={handleLeaveClass}
                className="flex-1 py-3 bg-red-600 hover:bg-red-700 text-white rounded-xl font-medium transition-colors"
              >
                Rời lớp
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyClasses;
