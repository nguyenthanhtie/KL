import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import api from '../../config/api';
import { 
  Users, BookOpen, Trophy, TrendingUp, School, 
  UserCheck, Clock, BarChart3, Settings, Shield,
  ChevronRight, AlertCircle, CheckCircle
} from 'lucide-react';

const AdminDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!user || user.role !== 'admin') {
      navigate('/');
      return;
    }
    fetchDashboardData();
  }, [user, navigate]);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const response = await api.get('/admin/dashboard');
      if (response.data.success) {
        setStats(response.data.data);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Không thể tải dữ liệu');
      console.error('Dashboard error:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
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

  const StatCard = ({ icon: Icon, title, value, subtitle, color, onClick }) => (
    <div 
      onClick={onClick}
      className={`bg-white rounded-xl shadow-sm p-6 border-l-4 ${color} ${onClick ? 'cursor-pointer hover:shadow-md transition-shadow' : ''}`}
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-500 text-sm font-medium">{title}</p>
          <p className="text-3xl font-bold text-gray-800 mt-1">{value?.toLocaleString() || 0}</p>
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
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <Shield className="h-8 w-8 text-indigo-600" />
            <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          </div>
          <p className="text-gray-600">Quản lý hệ thống học tập Hóa học</p>
        </div>

        {/* Pending Teacher Requests Alert */}
        {stats?.users?.pendingTeachers > 0 && (
          <div
            className="mb-8 bg-amber-50 border border-amber-200 rounded-xl p-6 cursor-pointer hover:bg-amber-100 transition-colors"
            onClick={() => navigate('/admin/teacher-requests')}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-full bg-amber-100">
                  <AlertCircle className="h-6 w-6 text-amber-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-amber-800 text-lg">
                    {stats.users.pendingTeachers} yêu cầu giáo viên đang chờ duyệt
                  </h3>
                  <p className="text-sm text-amber-600">Nhấn để xem và xử lý các yêu cầu</p>
                </div>
              </div>
              <ChevronRight className="h-6 w-6 text-amber-400" />
            </div>
          </div>
        )}

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard 
            icon={Users} 
            title="Tổng người dùng" 
            value={stats?.users?.total}
            subtitle={`+${stats?.users?.newThisMonth || 0} tháng này`}
            color="border-blue-500"
            onClick={() => navigate('/admin/users')}
          />
          <StatCard 
            icon={UserCheck} 
            title="Học sinh" 
            value={stats?.users?.students}
            subtitle={`${stats?.users?.activeThisWeek || 0} hoạt động tuần này`}
            color="border-green-500"
          />
          <StatCard 
            icon={School} 
            title="Giáo viên" 
            value={stats?.users?.teachers}
            color="border-purple-500"
            onClick={() => navigate('/admin/teachers')}
          />
          <StatCard 
            icon={BookOpen} 
            title="Lớp học" 
            value={stats?.classes?.total}
            subtitle={`${stats?.classes?.active || 0} đang hoạt động`}
            color="border-orange-500"
            onClick={() => navigate('/admin/classes')}
          />
        </div>

        {/* Content Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <StatCard 
            icon={BookOpen} 
            title="Bài học" 
            value={stats?.content?.lessons}
            color="border-cyan-500"
          />
          <StatCard 
            icon={Trophy} 
            title="Thử thách" 
            value={stats?.content?.challenges}
            color="border-yellow-500"
          />
          <StatCard 
            icon={Clock} 
            title="Bài tập" 
            value={stats?.assignments?.total}
            subtitle={`${stats?.assignments?.active || 0} đang hoạt động`}
            color="border-pink-500"
          />
        </div>

        {/* Performance Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* XP Statistics */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-indigo-600" />
              Thống kê XP & Level
            </h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-indigo-50 rounded-lg p-4">
                <p className="text-sm text-indigo-600 font-medium">XP trung bình</p>
                <p className="text-2xl font-bold text-indigo-700">
                  {Math.round(stats?.performance?.avgXP || 0)}
                </p>
              </div>
              <div className="bg-green-50 rounded-lg p-4">
                <p className="text-sm text-green-600 font-medium">Level trung bình</p>
                <p className="text-2xl font-bold text-green-700">
                  {Math.round(stats?.performance?.avgLevel || 1)}
                </p>
              </div>
              <div className="bg-purple-50 rounded-lg p-4">
                <p className="text-sm text-purple-600 font-medium">XP cao nhất</p>
                <p className="text-2xl font-bold text-purple-700">
                  {stats?.performance?.maxXP || 0}
                </p>
              </div>
              <div className="bg-orange-50 rounded-lg p-4">
                <p className="text-sm text-orange-600 font-medium">Level cao nhất</p>
                <p className="text-2xl font-bold text-orange-700">
                  {stats?.performance?.maxLevel || 1}
                </p>
              </div>
            </div>
          </div>

          {/* Top Students */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <Trophy className="h-5 w-5 text-yellow-500" />
              Top 10 học sinh
            </h2>
            <div className="space-y-3 max-h-64 overflow-y-auto">
              {stats?.topStudents?.map((student, index) => (
                <div 
                  key={student._id} 
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                      index === 0 ? 'bg-yellow-400 text-white' :
                      index === 1 ? 'bg-gray-300 text-gray-700' :
                      index === 2 ? 'bg-orange-400 text-white' :
                      'bg-gray-200 text-gray-600'
                    }`}>
                      {index + 1}
                    </span>
                    <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center">
                      {student.avatar ? (
                        <img src={student.avatar} alt="" className="w-8 h-8 rounded-full" />
                      ) : (
                        <span className="text-indigo-600 font-medium text-sm">
                          {student.displayName?.[0] || student.username?.[0]}
                        </span>
                      )}
                    </div>
                    <div>
                      <p className="font-medium text-gray-800 text-sm">
                        {student.displayName || student.username}
                      </p>
                      <p className="text-xs text-gray-500">Level {student.level}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-indigo-600">{student.xp?.toLocaleString()}</p>
                    <p className="text-xs text-gray-500">XP</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <Settings className="h-5 w-5 text-gray-600" />
            Quản lý nhanh
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
            <button 
              onClick={() => navigate('/admin/users')}
              className="flex items-center justify-between p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors group"
            >
              <div className="flex items-center gap-3">
                <Users className="h-5 w-5 text-blue-600" />
                <span className="font-medium text-gray-700">Quản lý người dùng</span>
              </div>
              <ChevronRight className="h-5 w-5 text-gray-400 group-hover:text-blue-600" />
            </button>
            
            <button
              onClick={() => navigate('/admin/teacher-requests')}
              className="flex items-center justify-between p-4 bg-amber-50 rounded-lg hover:bg-amber-100 transition-colors group"
            >
              <div className="flex items-center gap-3">
                <UserCheck className="h-5 w-5 text-amber-600" />
                <span className="font-medium text-gray-700">Duyệt giáo viên</span>
              </div>
              <div className="flex items-center gap-2">
                {stats?.users?.pendingTeachers > 0 && (
                  <span className="bg-amber-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                    {stats.users.pendingTeachers}
                  </span>
                )}
                <ChevronRight className="h-5 w-5 text-gray-400 group-hover:text-amber-600" />
              </div>
            </button>

            <button
              onClick={() => navigate('/admin/teachers')}
              className="flex items-center justify-between p-4 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors group"
            >
              <div className="flex items-center gap-3">
                <School className="h-5 w-5 text-purple-600" />
                <span className="font-medium text-gray-700">Quản lý giáo viên</span>
              </div>
              <ChevronRight className="h-5 w-5 text-gray-400 group-hover:text-purple-600" />
            </button>
            
            <button 
              onClick={() => navigate('/admin/classes')}
              className="flex items-center justify-between p-4 bg-orange-50 rounded-lg hover:bg-orange-100 transition-colors group"
            >
              <div className="flex items-center gap-3">
                <BookOpen className="h-5 w-5 text-orange-600" />
                <span className="font-medium text-gray-700">Quản lý lớp học</span>
              </div>
              <ChevronRight className="h-5 w-5 text-gray-400 group-hover:text-orange-600" />
            </button>
            
            <button 
              onClick={() => navigate('/admin/reports')}
              className="flex items-center justify-between p-4 bg-green-50 rounded-lg hover:bg-green-100 transition-colors group"
            >
              <div className="flex items-center gap-3">
                <BarChart3 className="h-5 w-5 text-green-600" />
                <span className="font-medium text-gray-700">Báo cáo</span>
              </div>
              <ChevronRight className="h-5 w-5 text-gray-400 group-hover:text-green-600" />
            </button>
            
            <button 
              onClick={() => navigate('/admin/settings')}
              className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors group"
            >
              <div className="flex items-center gap-3">
                <Settings className="h-5 w-5 text-gray-600" />
                <span className="font-medium text-gray-700">Cài đặt</span>
              </div>
              <ChevronRight className="h-5 w-5 text-gray-400 group-hover:text-gray-600" />
            </button>
          </div>
        </div>

        {/* Users by Month Chart (simplified) */}
        {stats?.usersByMonth && stats.usersByMonth.length > 0 && (
          <div className="bg-white rounded-xl shadow-sm p-6 mt-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-indigo-600" />
              Người dùng mới theo tháng
            </h2>
            <div className="flex items-end gap-2 h-40">
              {stats.usersByMonth.map((item, index) => {
                const maxCount = Math.max(...stats.usersByMonth.map(i => i.count));
                const height = maxCount > 0 ? (item.count / maxCount) * 100 : 0;
                return (
                  <div key={index} className="flex-1 flex flex-col items-center">
                    <div 
                      className="w-full bg-indigo-500 rounded-t-md transition-all duration-500"
                      style={{ height: `${Math.max(height, 5)}%` }}
                    ></div>
                    <span className="text-xs text-gray-500 mt-2">
                      {item._id.month}/{item._id.year}
                    </span>
                    <span className="text-xs font-medium text-gray-700">{item.count}</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
