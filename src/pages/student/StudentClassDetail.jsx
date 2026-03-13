import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../../config/api';
import { useAuth } from '../../contexts/AuthContext';

const StudentClassDetail = () => {
  const { classId } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const [classData, setClassData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('overview');
  const [pkRooms, setPkRooms] = useState([]);

  // Grade info
  const gradeInfo = {
    8: { color: 'from-blue-500 to-blue-600', icon: '🧪', title: 'Hóa học 8' },
    9: { color: 'from-green-500 to-green-600', icon: '⚗️', title: 'Hóa học 9' },
    10: { color: 'from-purple-500 to-purple-600', icon: '🔬', title: 'Hóa học 10' },
    11: { color: 'from-orange-500 to-orange-600', icon: '⚛️', title: 'Hóa học 11' },
    12: { color: 'from-pink-500 to-pink-600', icon: '🎓', title: 'Hóa học 12' }
  };

  // Fetch class detail
  useEffect(() => {
    const fetchClassDetail = async () => {
      try {
        setLoading(true);
        const response = await api.get(`/users/classes/${classId}`);
        
        if (response.data.success) {
          setClassData(response.data.data);
        }
      } catch (err) {
        console.error('Error fetching class:', err);
        setError(err.response?.data?.message || 'Không thể tải thông tin lớp học');
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchClassDetail();
    }
  }, [classId, user]);

  // Fetch PK rooms
  const fetchPKRooms = async () => {
    try {
      const response = await api.get(`/users/classes/${classId}/pk-rooms`);
      
      if (response.data.success) {
        setPkRooms(response.data.data);
      }
    } catch (err) {
      console.error('Error fetching PK rooms:', err);
    }
  };

  // Fetch PK rooms when tab changes to pkroom
  useEffect(() => {
    if (activeTab === 'pkroom' && user) {
      fetchPKRooms();
    }
  }, [activeTab, classId, user]);

  // Format date
  const formatDate = (date) => {
    if (!date) return '';
    return new Date(date).toLocaleDateString('vi-VN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  // Format full datetime
  const formatDateTime = (date) => {
    if (!date) return '';
    return new Date(date).toLocaleString('vi-VN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Format relative time with hours
  const formatRelativeTime = (date) => {
    if (!date) return '';
    const now = new Date();
    const target = new Date(date);
    const diffMs = target - now;
    
    // If overdue
    if (diffMs < 0) return 'Đã quá hạn';
    
    const diffMinutes = Math.floor(diffMs / (1000 * 60));
    const diffHours = Math.floor(diffMinutes / 60);
    const diffDays = Math.floor(diffHours / 24);
    
    if (diffMinutes < 60) return `Còn ${diffMinutes} phút`;
    if (diffHours < 24) {
      const mins = diffMinutes % 60;
      if (mins > 0) return `Còn ${diffHours} giờ ${mins} phút`;
      return `Còn ${diffHours} giờ`;
    }
    if (diffDays === 1) return 'Còn 1 ngày';
    return `Còn ${diffDays} ngày`;
  };

  // Get urgency level
  const getUrgencyLevel = (date) => {
    if (!date) return 'normal';
    const now = new Date();
    const target = new Date(date);
    const diffMs = target - now;
    const diffHours = diffMs / (1000 * 60 * 60);
    
    if (diffMs < 0) return 'overdue';
    if (diffHours <= 3) return 'urgent'; // Less than 3 hours
    if (diffHours <= 24) return 'soon'; // Less than 24 hours
    return 'normal';
  };

  // Handle start assignment
  const handleStartAssignment = (assignment) => {
    if (assignment.type === 'lesson' && assignment.lessonId) {
      // Navigate to lesson
      const lessonClassId = Math.floor(assignment.lessonId / 1000);
      const lessonId = assignment.lessonId % 1000;
      navigate(`/lesson/${lessonClassId}/1/${lessonId}`);
    } else if (assignment.type === 'challenge' && assignment.challengeSlug) {
      // Navigate to challenge
      navigate(`/chemistry/challenge/${assignment.challengeSlug}`);
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

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 flex items-center justify-center p-6">
        <div className="bg-red-500/20 border border-red-500/30 rounded-2xl p-8 text-center max-w-md">
          <div className="text-5xl mb-4">❌</div>
          <h2 className="text-xl font-bold text-white mb-2">{error}</h2>
          <button
            onClick={() => navigate('/student/classes')}
            className="mt-4 px-6 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors"
          >
            Quay lại
          </button>
        </div>
      </div>
    );
  }

  if (!classData) return null;

  // Check if pending
  if (classData.enrollmentStatus === 'pending') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 flex items-center justify-center p-6">
        <div className="bg-yellow-500/20 border border-yellow-500/30 rounded-2xl p-8 text-center max-w-md">
          <div className="text-5xl mb-4">⏳</div>
          <h2 className="text-xl font-bold text-white mb-2">Đang chờ duyệt</h2>
          <p className="text-white/60 mb-4">
            Yêu cầu tham gia lớp <span className="text-white font-semibold">{classData.name}</span> đang chờ giáo viên phê duyệt.
          </p>
          <button
            onClick={() => navigate('/student/classes')}
            className="px-6 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors"
          >
            Quay lại
          </button>
        </div>
      </div>
    );
  }

  const grade = gradeInfo[classData.grade] || gradeInfo[8];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 p-6">
      {/* Header */}
      <div className="max-w-6xl mx-auto mb-8">
        <button
          onClick={() => navigate('/student/classes')}
          className="text-white/60 hover:text-white mb-4 flex items-center gap-2 transition-colors"
        >
          <span>←</span> Quay lại danh sách lớp
        </button>

        <div className={`bg-gradient-to-r ${grade.color} rounded-2xl p-6 md:p-8`}>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="text-5xl">{grade.icon}</div>
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-white">
                  {classData.name}
                </h1>
                <p className="text-white/80">
                  Mã lớp: <span className="font-mono font-bold">{classData.code}</span>
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="bg-white/20 rounded-xl p-4 text-center">
                <p className="text-2xl font-bold text-white">{classData.studentCount}</p>
                <p className="text-sm text-white/80">Học sinh</p>
              </div>
              <div className="bg-white/20 rounded-xl p-4 text-center">
                <p className="text-2xl font-bold text-white">Lớp {classData.grade}</p>
                <p className="text-sm text-white/80">{grade.title}</p>
              </div>
            </div>
          </div>

          {/* Teacher info */}
          <div className="mt-6 flex items-center gap-3 bg-white/10 rounded-xl p-4">
            <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center text-2xl">
              👨‍🏫
            </div>
            <div>
              <p className="text-sm text-white/60">Giáo viên phụ trách</p>
              <p className="text-lg font-semibold text-white">
                {classData.teacher?.displayName || classData.teacher?.username}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="max-w-6xl mx-auto mb-6">
        <div className="flex gap-2 bg-white/5 p-1 rounded-xl overflow-x-auto">
          {[
            { id: 'overview', label: 'Tổng quan', icon: '📊' },
            { id: 'assignments', label: 'Bài tập', icon: '📝' },
            { id: 'pkroom', label: 'Phòng PK', icon: '⚔️' },
            { id: 'announcements', label: 'Thông báo', icon: '📢' },
            { id: 'classmates', label: 'Bạn học', icon: '👥' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 py-3 px-4 rounded-lg font-medium transition-all flex items-center justify-center gap-2 whitespace-nowrap ${
                activeTab === tab.id
                  ? 'bg-purple-600 text-white'
                  : 'text-white/60 hover:text-white hover:bg-white/10'
              }`}
            >
              <span>{tab.icon}</span>
              <span className="hidden sm:inline">{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto">
        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 gap-6">
            {/* Class Info */}
            <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10">
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <span>ℹ️</span> Thông tin lớp học
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-white/60">Môn học</span>
                  <span className="text-white">Hóa học</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/60">Chương trình</span>
                  <span className="text-white capitalize">{classData.curriculumType || 'Kết nối'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/60">Ngày tham gia</span>
                  <span className="text-white">{formatDate(classData.enrolledAt)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/60">Số học sinh</span>
                  <span className="text-white">{classData.studentCount || 0}</span>
                </div>
                {classData.description && (
                  <div className="pt-3 border-t border-white/10">
                    <p className="text-white/60 text-sm mb-1">Mô tả</p>
                    <p className="text-white">{classData.description}</p>
                  </div>
                )}
              </div>
            </div>

            {/* Upcoming Assignments */}
            <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10">
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <span>⏰</span> Bài tập sắp đến hạn
              </h3>
              {classData.assignments?.filter(a => !a.isCompleted && a.dueDate).length > 0 ? (
                <div className="space-y-3">
                  {classData.assignments
                    .filter(a => !a.isCompleted && a.dueDate)
                    .slice(0, 3)
                    .map(assignment => {
                      const urgency = getUrgencyLevel(assignment.dueDate);
                      return (
                        <div
                          key={assignment._id}
                          className={`flex items-center justify-between rounded-xl p-4 transition-colors cursor-pointer ${
                            urgency === 'overdue' 
                              ? 'bg-red-500/20 border border-red-500/30' 
                              : urgency === 'urgent'
                              ? 'bg-orange-500/20 border border-orange-500/30 animate-pulse'
                              : urgency === 'soon'
                              ? 'bg-yellow-500/20 border border-yellow-500/30'
                              : 'bg-white/5 hover:bg-white/10'
                          }`}
                          onClick={() => handleStartAssignment(assignment)}
                        >
                          <div className="flex items-center gap-3">
                            <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                              urgency === 'overdue' ? 'bg-red-500/30' :
                              urgency === 'urgent' ? 'bg-orange-500/30' :
                              urgency === 'soon' ? 'bg-yellow-500/30' :
                              'bg-orange-500/20'
                            }`}>
                              {urgency === 'overdue' ? '⚠️' : assignment.type === 'lesson' ? '📖' : '🎮'}
                            </div>
                            <div>
                              <p className="text-white font-medium">{assignment.title}</p>
                              <p className="text-sm text-white/60">{assignment.points} điểm</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className={`font-medium ${
                              urgency === 'overdue' ? 'text-red-400' :
                              urgency === 'urgent' ? 'text-orange-400' :
                              urgency === 'soon' ? 'text-yellow-400' :
                              'text-orange-400'
                            }`}>
                              {formatRelativeTime(assignment.dueDate)}
                            </p>
                            <p className="text-sm text-white/60">{formatDateTime(assignment.dueDate)}</p>
                          </div>
                        </div>
                      );
                    })}
                </div>
              ) : (
                <p className="text-white/60 text-center py-4">
                  Không có bài tập nào sắp đến hạn 🎉
                </p>
              )}
            </div>
          </div>
        )}

        {/* Assignments Tab */}
        {activeTab === 'assignments' && (
          <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10">
            <h3 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
              <span>📝</span> Danh sách bài tập
            </h3>
            
            {classData.assignments?.length > 0 ? (
              <div className="space-y-4">
                {classData.assignments.map(assignment => {
                  const urgency = getUrgencyLevel(assignment.dueDate);
                  return (
                    <div
                      key={assignment._id}
                      className={`rounded-xl p-4 border transition-all ${
                        assignment.isCompleted
                          ? 'bg-green-500/10 border-green-500/30'
                          : urgency === 'overdue'
                          ? 'bg-red-500/10 border-red-500/30'
                          : urgency === 'urgent'
                          ? 'bg-orange-500/10 border-orange-500/30 animate-pulse'
                          : 'bg-white/5 border-white/10 hover:border-purple-500/50 cursor-pointer'
                      }`}
                      onClick={() => !assignment.isCompleted && handleStartAssignment(assignment)}
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex items-start gap-4">
                          <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl ${
                            assignment.isCompleted ? 'bg-green-500/20' : 
                            urgency === 'overdue' ? 'bg-red-500/20' :
                            urgency === 'urgent' ? 'bg-orange-500/20' :
                            'bg-purple-500/20'
                          }`}>
                            {assignment.isCompleted ? '✅' : 
                             urgency === 'overdue' ? '⚠️' :
                             assignment.type === 'lesson' ? '📖' : '🎮'}
                          </div>
                          <div>
                            <h4 className="text-white font-semibold">{assignment.title}</h4>
                            {assignment.description && (
                              <p className="text-sm text-white/60 mt-1">{assignment.description}</p>
                            )}
                            <div className="flex flex-wrap gap-2 mt-2">
                              <span className="px-2 py-1 bg-white/10 rounded text-xs text-white/70">
                                {assignment.type === 'lesson' ? '📖 Bài học' : 
                                 assignment.type === 'challenge' ? '🎮 Thử thách' : '📝 Bài tập'}
                              </span>
                              <span className="px-2 py-1 bg-white/10 rounded text-xs text-white/70">
                                💰 {assignment.points} điểm
                              </span>
                              {assignment.dueDate && (
                                <span className={`px-2 py-1 rounded text-xs font-medium ${
                                  urgency === 'overdue'
                                    ? 'bg-red-500/20 text-red-400'
                                    : urgency === 'urgent'
                                    ? 'bg-orange-500/20 text-orange-400'
                                    : urgency === 'soon'
                                    ? 'bg-yellow-500/20 text-yellow-400'
                                    : 'bg-white/10 text-white/70'
                                }`}>
                                  ⏰ {formatRelativeTime(assignment.dueDate)}
                                </span>
                              )}
                            </div>
                            {/* Detailed deadline */}
                            {assignment.dueDate && (
                              <p className="text-xs text-white/50 mt-2">
                                📅 Hạn nộp: {formatDateTime(assignment.dueDate)}
                              </p>
                            )}
                          </div>
                        </div>
                        
                        {assignment.isCompleted ? (
                          <div className="text-right">
                            <div className="flex items-center gap-1 text-green-400">
                              {[...Array(assignment.myStars || 0)].map((_, i) => (
                                <span key={i}>⭐</span>
                              ))}
                            </div>
                            <p className="text-sm text-white/60">
                              {assignment.myScore} điểm
                            </p>
                          </div>
                        ) : urgency === 'overdue' ? (
                          <div className="text-right">
                            <span className="px-3 py-1 bg-red-500/30 text-red-400 rounded text-xs font-medium">
                              Quá hạn
                            </span>
                          </div>
                        ) : (
                          <button className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg text-sm font-medium transition-colors">
                            Làm bài
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="text-5xl mb-4">📭</div>
                <p className="text-white/60">Chưa có bài tập nào được giao</p>
              </div>
            )}
          </div>
        )}

        {/* PK Room Tab */}
        {activeTab === 'pkroom' && (
          <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                <span>⚔️</span> Phòng PK của lớp
              </h3>
              <button
                onClick={fetchPKRooms}
                className="px-3 py-1.5 bg-white/10 hover:bg-white/20 text-white rounded-lg text-sm transition-colors flex items-center gap-2"
              >
                🔄 Làm mới
              </button>
            </div>
            
            {pkRooms.length > 0 ? (
              <div className="space-y-4">
                {pkRooms.map(room => (
                  <div
                    key={room._id}
                    className="bg-gradient-to-r from-red-500/10 to-orange-500/10 border border-red-500/30 rounded-xl p-4 hover:from-red-500/20 hover:to-orange-500/20 transition-all"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-orange-500 rounded-xl flex items-center justify-center text-2xl">
                          ⚔️
                        </div>
                        <div>
                          <h4 className="text-white font-semibold">{room.name || 'Phòng PK'}</h4>
                          <p className="text-white/60 text-sm flex items-center gap-2">
                            <span className="font-mono bg-white/10 px-2 py-0.5 rounded">{room.code}</span>
                            <span>•</span>
                            <span>Chủ phòng: {room.host?.displayName}</span>
                          </p>
                          <div className="flex flex-wrap gap-2 mt-2">
                            <span className={`px-2 py-0.5 rounded text-xs font-medium ${
                              room.status === 'waiting' 
                                ? 'bg-green-500/20 text-green-400'
                                : 'bg-yellow-500/20 text-yellow-400'
                            }`}>
                              {room.status === 'waiting' ? '🟢 Đang chờ' : '🟡 Đang chơi'}
                            </span>
                            <span className="px-2 py-0.5 bg-white/10 rounded text-xs text-white/70">
                              👥 {room.playerCount}/{room.maxPlayers}
                            </span>
                            <span className="px-2 py-0.5 bg-white/10 rounded text-xs text-white/70">
                              ❓ {room.questionCount} câu
                            </span>
                            <span className="px-2 py-0.5 bg-white/10 rounded text-xs text-white/70">
                              ⏱️ {room.timePerQuestion}s/câu
                            </span>
                          </div>
                        </div>
                      </div>
                      
                      {room.status === 'waiting' && (
                        <button
                        onClick={() => navigate(`/chemistry/pk/room/${room.code}`)}
                          className="px-6 py-2.5 bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white rounded-lg font-medium transition-all shadow-lg shadow-red-500/25"
                        >
                          Vào phòng
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="text-5xl mb-4">⚔️</div>
                <p className="text-white/60 mb-2">Chưa có phòng PK nào đang hoạt động</p>
                <p className="text-sm text-white/40">
                  Chờ giáo viên tạo phòng hoặc vào PK Đối kháng để chơi với mọi người
                </p>
                <button
                  onClick={() => navigate('/pk')}
                  className="mt-4 px-6 py-2 bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white rounded-lg font-medium transition-all"
                >
                  Vào PK Đối kháng
                </button>
              </div>
            )}
          </div>
        )}

        {/* Announcements Tab */}
        {activeTab === 'announcements' && (
          <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10">
            <h3 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
              <span>📢</span> Thông báo từ giáo viên
            </h3>
            
            {classData.announcements?.length > 0 ? (
              <div className="space-y-4">
                {classData.announcements.map((announcement, index) => (
                  <div
                    key={index}
                    className={`rounded-xl p-4 border ${
                      announcement.isPinned
                        ? 'bg-yellow-500/10 border-yellow-500/30'
                        : 'bg-white/5 border-white/10'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      {announcement.isPinned && (
                        <span className="text-xl">📌</span>
                      )}
                      <div className="flex-1">
                        <h4 className="text-white font-semibold">{announcement.title}</h4>
                        <p className="text-white/70 mt-2 whitespace-pre-wrap">{announcement.content}</p>
                        <p className="text-sm text-white/40 mt-3">
                          {formatDate(announcement.createdAt)}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="text-5xl mb-4">🔔</div>
                <p className="text-white/60">Chưa có thông báo nào</p>
              </div>
            )}
          </div>
        )}

        {/* Classmates Tab */}
        {activeTab === 'classmates' && (
          <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10">
            <h3 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
              <span>👥</span> Bạn học trong lớp ({classData.classmates?.length || 0})
            </h3>
            
            {classData.classmates?.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {classData.classmates.map(classmate => (
                  <div
                    key={classmate._id}
                    className="bg-white/5 rounded-xl p-4 text-center hover:bg-white/10 transition-colors"
                  >
                    <div className="w-16 h-16 mx-auto bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-2xl mb-3">
                      {classmate.avatar || '👤'}
                    </div>
                    <p className="text-white font-medium truncate">{classmate.displayName}</p>
                    <p className="text-sm text-white/60">Level {classmate.level || 1}</p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="text-5xl mb-4">👋</div>
                <p className="text-white/60">Bạn là thành viên đầu tiên của lớp!</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentClassDetail;
