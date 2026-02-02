import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import api from '../../config/api';
import { 
  School, Users, BookOpen, Clock, TrendingUp, 
  Plus, ChevronRight, Calendar, Bell, Award,
  AlertCircle, BarChart3, ClipboardList
} from 'lucide-react';

const TeacherDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [dashboard, setDashboard] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!user || (user.role !== 'teacher' && user.role !== 'admin')) {
      navigate('/');
      return;
    }
    fetchDashboard();
  }, [user, navigate]);

  const fetchDashboard = async () => {
    try {
      setLoading(true);
      const response = await api.get('/teacher/dashboard');
      if (response.data.success) {
        setDashboard(response.data.data);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Không thể tải dữ liệu');
      console.error('Teacher dashboard error:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Đang tải dữ liệu...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center text-red-600">
          <AlertCircle className="h-12 w-12 mx-auto mb-4" />
          <p>{error}</p>
        </div>
      </div>
    );
  }

  const StatCard = ({ icon: Icon, title, value, subtitle, color }) => (
    <div className={`bg-white rounded-xl shadow-sm p-6 border-l-4 ${color}`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-500 text-sm font-medium">{title}</p>
          <p className="text-3xl font-bold text-gray-800 mt-1">{value}</p>
          {subtitle && <p className="text-sm text-gray-400 mt-1">{subtitle}</p>}
        </div>
        <div className={`p-3 rounded-full bg-opacity-10 ${color.replace('border-', 'bg-')}`}>
          <Icon className={`h-6 w-6 ${color.replace('border-', 'text-')}`} />
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
              <School className="h-8 w-8 text-purple-600" />
              Xin chào, {user?.displayName || user?.username}
            </h1>
            <p className="text-gray-600 mt-1">Quản lý lớp học và theo dõi tiến trình học sinh</p>
          </div>
          <button
            onClick={() => navigate('/teacher/classes/new')}
            className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
          >
            <Plus className="h-5 w-5" />
            Tạo lớp mới
          </button>
        </div>

        {/* Overview Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard 
            icon={School} 
            title="Lớp học" 
            value={dashboard?.overview?.totalClasses || 0}
            color="border-purple-500"
          />
          <StatCard 
            icon={Users} 
            title="Học sinh" 
            value={dashboard?.overview?.totalStudents || 0}
            subtitle={`${dashboard?.overview?.activeStudents || 0} hoạt động`}
            color="border-blue-500"
          />
          <StatCard 
            icon={ClipboardList} 
            title="Bài tập" 
            value={dashboard?.overview?.totalAssignments || 0}
            subtitle={`${dashboard?.overview?.activeAssignments || 0} đang hoạt động`}
            color="border-green-500"
          />
          <StatCard 
            icon={Clock} 
            title="Chờ chấm điểm" 
            value={dashboard?.overview?.pendingGrading || 0}
            color="border-orange-500"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* My Classes */}
          <div className="lg:col-span-2 bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-purple-600" />
                Lớp học của tôi
              </h2>
              <button
                onClick={() => navigate('/teacher/classes')}
                className="text-purple-600 hover:text-purple-700 text-sm font-medium flex items-center gap-1"
              >
                Xem tất cả <ChevronRight className="h-4 w-4" />
              </button>
            </div>
            
            {dashboard?.classes?.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <School className="h-12 w-12 mx-auto mb-3 text-gray-300" />
                <p>Chưa có lớp học nào</p>
                <button
                  onClick={() => navigate('/teacher/classes/new')}
                  className="mt-3 text-purple-600 hover:text-purple-700 font-medium"
                >
                  Tạo lớp đầu tiên
                </button>
              </div>
            ) : (
              <div className="space-y-3">
                {dashboard?.classes?.slice(0, 5).map(cls => (
                  <div 
                    key={cls._id}
                    onClick={() => navigate(`/teacher/classes/${cls._id}`)}
                    className="p-4 border rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium text-gray-800">{cls.name}</h3>
                        <p className="text-sm text-gray-500">
                          Mã lớp: <span className="font-mono font-medium text-purple-600">{cls.code}</span>
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium text-gray-800">
                          {cls.studentCount} học sinh
                        </p>
                        <p className="text-xs text-gray-500">Lớp {cls.grade}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Upcoming Deadlines */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2 mb-4">
              <Calendar className="h-5 w-5 text-orange-500" />
              Deadline sắp tới
            </h2>
            
            {dashboard?.upcomingDeadlines?.length === 0 ? (
              <p className="text-gray-500 text-sm">Không có deadline trong 3 ngày tới</p>
            ) : (
              <div className="space-y-3">
                {dashboard?.upcomingDeadlines?.map((item, index) => (
                  <div key={index} className="p-3 bg-orange-50 rounded-lg">
                    <p className="font-medium text-gray-800 text-sm">{item.title}</p>
                    <p className="text-xs text-gray-500 mt-1">
                      {item.assignedTo?.classRoom?.name || 'Chưa gán lớp'}
                    </p>
                    <p className="text-xs text-orange-600 mt-1">
                      {new Date(item.schedule?.dueDate).toLocaleDateString('vi-VN', {
                        weekday: 'short',
                        day: 'numeric',
                        month: 'short',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Students Needing Attention & Recent Achievements */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
          {/* Students Needing Attention */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2 mb-4">
              <AlertCircle className="h-5 w-5 text-red-500" />
              Học sinh cần chú ý
            </h2>
            
            {dashboard?.studentsNeedingAttention?.length === 0 ? (
              <p className="text-gray-500 text-sm">Tất cả học sinh đang hoạt động tốt!</p>
            ) : (
              <div className="space-y-3 max-h-64 overflow-y-auto">
                {dashboard?.studentsNeedingAttention?.map(student => (
                  <div 
                    key={student._id}
                    className="flex items-center justify-between p-3 bg-red-50 rounded-lg"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center">
                        <span className="text-red-600 font-medium text-sm">
                          {student.displayName?.[0] || student.username?.[0]}
                        </span>
                      </div>
                      <div>
                        <p className="font-medium text-gray-800 text-sm">
                          {student.displayName || student.username}
                        </p>
                        <p className="text-xs text-gray-500">{student.email}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-red-600 font-medium">{student.xp || 0} XP</p>
                      <p className="text-xs text-gray-500">Level {student.level || 1}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Recent Achievements */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2 mb-4">
              <Award className="h-5 w-5 text-yellow-500" />
              Thành tích gần đây
            </h2>
            
            {dashboard?.recentAchievements?.length === 0 ? (
              <p className="text-gray-500 text-sm">Chưa có thành tích mới trong tuần</p>
            ) : (
              <div className="space-y-3 max-h-64 overflow-y-auto">
                {dashboard?.recentAchievements?.map((achievement, index) => (
                  <div 
                    key={index}
                    className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-yellow-100 flex items-center justify-center">
                        <Award className="h-4 w-4 text-yellow-600" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-800 text-sm">
                          {achievement.displayName || achievement.username}
                        </p>
                        <p className="text-xs text-gray-500">
                          {achievement.challengeSlug}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center gap-1">
                        {[...Array(achievement.stars || 0)].map((_, i) => (
                          <span key={i} className="text-yellow-400">⭐</span>
                        ))}
                      </div>
                      <p className="text-xs text-gray-500">{achievement.score} điểm</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-6 bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Thao tác nhanh</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <button 
              onClick={() => navigate('/teacher/classes')}
              className="p-4 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors text-left"
            >
              <School className="h-6 w-6 text-purple-600 mb-2" />
              <p className="font-medium text-gray-800">Quản lý lớp</p>
              <p className="text-xs text-gray-500">Xem và chỉnh sửa lớp học</p>
            </button>
            
            <button 
              onClick={() => navigate('/teacher/assignments')}
              className="p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors text-left"
            >
              <ClipboardList className="h-6 w-6 text-blue-600 mb-2" />
              <p className="font-medium text-gray-800">Bài tập</p>
              <p className="text-xs text-gray-500">Giao và chấm bài tập</p>
            </button>
            
            <button 
              onClick={() => navigate('/teacher/reports')}
              className="p-4 bg-green-50 rounded-lg hover:bg-green-100 transition-colors text-left"
            >
              <BarChart3 className="h-6 w-6 text-green-600 mb-2" />
              <p className="font-medium text-gray-800">Báo cáo</p>
              <p className="text-xs text-gray-500">Xem tiến trình học sinh</p>
            </button>
            
            <button 
              onClick={() => navigate('/teacher/classes/new')}
              className="p-4 bg-orange-50 rounded-lg hover:bg-orange-100 transition-colors text-left"
            >
              <Plus className="h-6 w-6 text-orange-600 mb-2" />
              <p className="font-medium text-gray-800">Tạo lớp mới</p>
              <p className="text-xs text-gray-500">Thêm lớp học mới</p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherDashboard;
