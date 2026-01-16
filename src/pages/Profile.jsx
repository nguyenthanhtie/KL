import { useAuth } from '../contexts/AuthContext';
import { useState, useEffect } from 'react';
import ProgressBar from '../components/ui/ProgressBar';
import api from '../config/api';
import { 
  User, 
  Mail, 
  Trophy, 
  Flame, 
  Star, 
  BookOpen, 
  Target, 
  Clock,
  TrendingUp,
  Award,
  Zap,
  ChevronRight,
  Sparkles,
  MessageCircle
} from 'lucide-react';
import { showMissionBubble } from '../components/MissionBubble';

const Profile = () => {
  const { user } = useAuth();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedProgram, setSelectedProgram] = useState('chemistry');

  useEffect(() => {
    const fetchUserProfile = async () => {
      if (!user?.uid) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);
        
        // Fetch user by Firebase UID
        const response = await api.get(`/users/firebase/${user.uid}`);
        console.log('📊 User data from DB:', response.data);
        setUserData(response.data);
        
        // Set default selected program to the active one
        const activeProgram = response.data?.programs?.find(p => p.isActive);
        if (activeProgram) {
          setSelectedProgram(activeProgram.programId);
        }
      } catch (err) {
        console.error('❌ Error fetching user profile:', err);
        setError(err.response?.data?.message || 'Không thể tải thông tin người dùng');
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, [user]);

  // Get the selected program
  const getCurrentProgram = () => {
    return userData?.programs?.find(p => p.programId === selectedProgram);
  };

  const currentProgram = getCurrentProgram();
  
  // Get total lessons based on program
  const getTotalLessons = (programId) => {
    const totals = {
      'chemistry': 42,
      'physics': 40,
      'biology': 38,
      'math': 45
    };
    return totals[programId] || 40;
  };
  
  const stats = userData && currentProgram ? {
    totalLessons: getTotalLessons(selectedProgram),
    completedLessons: currentProgram.progress?.completedLessons?.length || 0,
    totalPoints: currentProgram.progress?.totalScore || 0,
    currentStreak: currentProgram.studyStreak?.currentStreak || 0,
    longestStreak: currentProgram.studyStreak?.longestStreak || 0,
    averageScore: currentProgram.progress?.completedLessons?.length > 0
      ? Math.round(currentProgram.progress.totalScore / currentProgram.progress.completedLessons.length)
      : 0,
    studyTime: currentProgram.studyTime || 0 // Thời gian học (phút)
  } : {
    totalLessons: getTotalLessons(selectedProgram),
    completedLessons: 0,
    totalPoints: 0,
    currentStreak: 0,
    longestStreak: 0,
    averageScore: 0,
    studyTime: 0
  };

  // Helper function to format study time
  function formatStudyTime(seconds) {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    return `${hours}h ${minutes}m`;
  }

  // Helper function to calculate progress by level/difficulty
  function calculateProgressByLevel(completedLessonIds = [], programId = 'chemistry') {
    // Get lesson ranges based on program
    const programRanges = {
      'chemistry': [
        { name: 'Cấp độ Cơ bản', range: [8001, 8014], color: 'success', total: 14 },
        { name: 'Cấp độ Trung cấp', range: [8015, 8028], color: 'primary', total: 14 },
        { name: 'Cấp độ Nâng cao', range: [8029, 8042], color: 'warning', total: 14 },
      ],
      'physics': [
        { name: 'Cơ học', range: [8001, 8013], color: 'success', total: 13 },
        { name: 'Nhiệt học', range: [8014, 8027], color: 'primary', total: 14 },
        { name: 'Điện học', range: [8028, 8040], color: 'warning', total: 13 },
      ],
      'biology': [
        { name: 'Tế bào học', range: [8001, 8013], color: 'success', total: 13 },
        { name: 'Di truyền học', range: [8014, 8025], color: 'primary', total: 12 },
        { name: 'Sinh thái học', range: [8026, 8038], color: 'warning', total: 13 },
      ],
      'math': [
        { name: 'Đại số', range: [8001, 8015], color: 'success', total: 15 },
        { name: 'Hình học', range: [8016, 8030], color: 'primary', total: 15 },
        { name: 'Giải tích', range: [8031, 8045], color: 'warning', total: 15 },
      ]
    };

    const levels = programRanges[programId] || programRanges['chemistry'];

    return levels.map(level => {
      const completed = completedLessonIds.filter(lessonId => {
        const id = Number(lessonId);
        return id >= level.range[0] && id <= level.range[1];
      }).length;
      const percentage = level.total > 0 ? Math.round((completed / level.total) * 100) : 0;
      
      return {
        ...level,
        completed,
        percentage
      };
    });
  }

  // Dynamic achievements based on user stats
  const achievements = [
    { 
      id: 1, 
      title: 'Bắt đầu hành trình', 
      icon: '🎯', 
      unlocked: stats.completedLessons >= 1 
    },
    { 
      id: 2, 
      title: 'Hoàn thành 5 bài', 
      icon: '⭐', 
      unlocked: stats.completedLessons >= 5 
    },
    { 
      id: 3, 
      title: 'Hoàn thành 10 bài', 
      icon: '🎓', 
      unlocked: stats.completedLessons >= 10 
    },
    { 
      id: 4, 
      title: 'Hoàn thành 20 bài', 
      icon: '🏆', 
      unlocked: stats.completedLessons >= 20 
    },
    { 
      id: 5, 
      title: '500 điểm', 
      icon: '💎', 
      unlocked: stats.totalPoints >= 500 
    },
    { 
      id: 6, 
      title: '1000 điểm', 
      icon: '👑', 
      unlocked: stats.totalPoints >= 1000 
    },
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex items-center justify-center">
        <div className="text-center">
          <div className="relative">
            <div className="w-20 h-20 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin mx-auto"></div>
            <Sparkles className="w-8 h-8 text-purple-600 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
          </div>
          <p className="mt-4 text-gray-600 font-medium">Đang tải thông tin...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl shadow-xl p-8 max-w-md w-full text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-3xl">⚠️</span>
          </div>
          <h2 className="text-xl font-bold text-gray-800 mb-2">Có lỗi xảy ra</h2>
          <p className="text-gray-600">{error}</p>
        </div>
      </div>
    );
  }

  // Program names mapping
  const programNames = {
    'chemistry': { name: 'Hóa học', icon: '🧪', color: 'from-blue-500 to-indigo-600', bgLight: 'bg-blue-50' },
    'physics': { name: 'Vật lý', icon: '⚛️', color: 'from-purple-500 to-violet-600', bgLight: 'bg-purple-50' },
    'biology': { name: 'Sinh học', icon: '🧬', color: 'from-green-500 to-emerald-600', bgLight: 'bg-green-50' },
    'math': { name: 'Toán học', icon: '📐', color: 'from-orange-500 to-amber-600', bgLight: 'bg-orange-50' }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Floating Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-64 h-64 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-1/2 w-72 h-72 bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative z-10 py-8 px-4">
        <div className="mx-auto w-[90%]">
   

          {/* Program Selector */}
          {userData?.programs && userData.programs.length > 0 && (
            <div className="mb-8">
              <p className="text-sm font-medium text-gray-600 mb-3">Chọn chương trình:</p>
              <div className="flex flex-wrap gap-3">
                {userData.programs.map((program) => {
                  const programInfo = programNames[program.programId] || { name: program.programId, icon: '📚', color: 'from-gray-500 to-gray-600' };
                  const isSelected = selectedProgram === program.programId;
                  
                  return (
                    <button
                      key={program.programId}
                      onClick={() => setSelectedProgram(program.programId)}
                      className={`
                        flex items-center gap-3 px-5 py-3 rounded-2xl font-medium transition-all duration-300
                        ${isSelected 
                          ? `bg-gradient-to-r ${programInfo.color} text-white shadow-lg scale-105` 
                          : 'bg-white text-gray-700 border-2 border-gray-200 hover:border-gray-300 hover:shadow-md'
                        }
                      `}
                    >
                      <span className="text-xl">{programInfo.icon}</span>
                      <span>{programInfo.name}</span>
                      {isSelected && <ChevronRight className="w-4 h-4" />}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          <div className="grid lg:grid-cols-3 gap-6 mb-8">
            {/* User Info Card */}
            <div className="lg:col-span-1">
              <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-6 border border-white/50">
                <div className="text-center">
                  {/* Avatar */}
                  <div className="relative inline-block mb-4">
                    <div className="w-28 h-28 rounded-3xl bg-gradient-to-br from-purple-500 via-pink-500 to-rose-500 flex items-center justify-center shadow-xl">
                      {userData?.avatar ? (
                        <img 
                          src={userData.avatar} 
                          alt="Avatar" 
                          className="w-full h-full rounded-3xl object-cover"
                        />
                      ) : (
                        <span className="text-5xl text-white">
                          {userData?.displayName?.[0]?.toUpperCase() || userData?.username?.[0]?.toUpperCase() || '👤'}
                        </span>
                      )}
                    </div>
                    <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-gradient-to-r from-amber-400 to-orange-500 rounded-xl flex items-center justify-center shadow-lg">
                      <span className="text-white font-bold text-sm">Lv{userData?.level || 1}</span>
                    </div>
                  </div>

                  {/* Name & Email */}
                  <h2 className="text-2xl font-bold text-gray-800 mb-1">
                    {userData?.displayName || userData?.username || 'Học viên'}
                  </h2>
                  <p className="text-gray-500 text-sm flex items-center justify-center gap-2 mb-6">
                    <Mail className="w-4 h-4" />
                    {userData?.email || user?.email}
                  </p>

                  {/* XP Progress - New Mission-based EXP System */}
                  <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-4 mb-6">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-700">🎯 Kinh nghiệm</span>
                      <span className="text-sm text-purple-600 font-semibold">{userData?.xp || 0} XP</span>
                    </div>
                    <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full transition-all duration-500"
                        style={{ width: `${(userData?.xp || 0) % 100}%` }}
                      />
                    </div>
                    <p className="text-xs text-gray-500 mt-2 text-center">
                      Còn {100 - ((userData?.xp || 0) % 100)} XP để lên level tiếp theo
                    </p>
                    <div className="mt-3 p-2 bg-white/50 rounded-lg">
                      <p className="text-xs text-gray-600 text-center">
                        💡 Hoàn thành bài học: <span className="font-semibold text-green-600">+20-60 XP</span>
                      </p>
                      <p className="text-xs text-gray-600 text-center">
                        🏆 Hoàn thành thử thách: <span className="font-semibold text-purple-600">+30-95 XP</span>
                      </p>
                    </div>
                  </div>

                  {/* Current Program Info */}
                  {currentProgram && (
                    <div className="text-left space-y-3">
                      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                        <span className="text-sm text-gray-600">Chương trình</span>
                        <span className="font-semibold text-gray-800">{programNames[selectedProgram]?.name}</span>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                        <span className="text-sm text-gray-600">Lớp hiện tại</span>
                        <span className="font-semibold text-gray-800">Lớp {currentProgram.currentClass}</span>
                      </div>
                      {currentProgram.placementTestCompleted && (
                        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                          <span className="text-sm text-gray-600">Điểm đầu vào</span>
                          <span className="font-semibold text-purple-600">{currentProgram.placementTestScore || 0} điểm</span>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Stats Cards */}
            <div className="lg:col-span-2">
              <div className="grid grid-cols-2 gap-4">
                {/* Lessons Completed */}
                <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-6 border border-white/50 group hover:shadow-2xl transition-all duration-300">
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                      <BookOpen className="w-7 h-7 text-white" />
                    </div>
                    <span className="text-xs font-medium text-blue-600 bg-blue-50 px-3 py-1 rounded-full">Bài học</span>
                  </div>
                  <div className="text-4xl font-bold text-gray-800 mb-1">
                    {stats.completedLessons}<span className="text-lg text-gray-400">/{stats.totalLessons}</span>
                  </div>
                  <p className="text-gray-500 text-sm">Bài học hoàn thành</p>
                  <div className="mt-3 h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full"
                      style={{ width: `${(stats.completedLessons / stats.totalLessons) * 100}%` }}
                    />
                  </div>
                </div>

                {/* Streak */}
                <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-6 border border-white/50 group hover:shadow-2xl transition-all duration-300">
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-14 h-14 bg-gradient-to-br from-orange-500 to-red-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                      <Flame className="w-7 h-7 text-white" />
                    </div>
                    <span className="text-xs font-medium text-orange-600 bg-orange-50 px-3 py-1 rounded-full">Streak</span>
                  </div>
                  <div className="text-4xl font-bold text-gray-800 mb-1">
                    {stats.currentStreak}<span className="text-lg text-gray-400"> ngày</span>
                  </div>
                  <p className="text-gray-500 text-sm">Chuỗi ngày hoạt động</p>
                  {stats.longestStreak > 0 && (
                    <p className="text-xs text-orange-600 mt-2">
                      🏆 Kỷ lục: {stats.longestStreak} ngày
                    </p>
                  )}
                </div>

                {/* Total Points */}
                <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-6 border border-white/50 group hover:shadow-2xl transition-all duration-300">
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-14 h-14 bg-gradient-to-br from-amber-500 to-yellow-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                      <Star className="w-7 h-7 text-white" />
                    </div>
                    <span className="text-xs font-medium text-amber-600 bg-amber-50 px-3 py-1 rounded-full">Điểm</span>
                  </div>
                  <div className="text-4xl font-bold text-gray-800 mb-1">
                    {stats.totalPoints.toLocaleString()}
                  </div>
                  <p className="text-gray-500 text-sm">Tổng điểm tích lũy</p>
                </div>

                {/* Average Score */}
                <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-6 border border-white/50 group hover:shadow-2xl transition-all duration-300">
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-14 h-14 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                      <TrendingUp className="w-7 h-7 text-white" />
                    </div>
                    <span className="text-xs font-medium text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full">Trung bình</span>
                  </div>
                  <div className="text-4xl font-bold text-gray-800 mb-1">
                    {stats.averageScore}<span className="text-lg text-gray-400">%</span>
                  </div>
                  <p className="text-gray-500 text-sm">Điểm trung bình</p>
                </div>
              </div>
            </div>
          </div>

          {/* Progress by Level */}
          <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-8 border border-white/50 mb-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center">
                <Target className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-800">Tiến độ học tập</h2>
                <p className="text-gray-500 text-sm">{programNames[selectedProgram]?.name}</p>
              </div>
            </div>
            
            <div className="space-y-6">
              {calculateProgressByLevel(currentProgram?.progress?.completedLessons || [], selectedProgram).map((levelData, index) => (
                <div key={index} className="group">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                        levelData.color === 'success' ? 'bg-emerald-100 text-emerald-600' :
                        levelData.color === 'primary' ? 'bg-blue-100 text-blue-600' :
                        'bg-amber-100 text-amber-600'
                      }`}>
                        {index === 0 ? '🌱' : index === 1 ? '🌿' : '🌳'}
                      </div>
                      <span className="font-semibold text-gray-700">{levelData.name}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-500">{levelData.completed}/{levelData.total}</span>
                      <span className={`text-sm font-bold ${
                        levelData.percentage >= 80 ? 'text-emerald-600' :
                        levelData.percentage >= 50 ? 'text-blue-600' :
                        'text-gray-600'
                      }`}>{levelData.percentage}%</span>
                    </div>
                  </div>
                  <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                    <div 
                      className={`h-full rounded-full transition-all duration-500 ${
                        levelData.color === 'success' ? 'bg-gradient-to-r from-emerald-400 to-emerald-600' :
                        levelData.color === 'primary' ? 'bg-gradient-to-r from-blue-400 to-blue-600' :
                        'bg-gradient-to-r from-amber-400 to-amber-600'
                      }`}
                      style={{ width: `${levelData.percentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Achievements */}
          <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-8 border border-white/50">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-orange-600 rounded-2xl flex items-center justify-center">
                <Award className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-800">Thành tích</h2>
                <p className="text-gray-500 text-sm">{achievements.filter(a => a.unlocked).length}/{achievements.length} đã mở khóa</p>
              </div>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {achievements.map((achievement) => (
                <div
                  key={achievement.id}
                  className={`
                    relative text-center p-5 rounded-2xl transition-all duration-300
                    ${achievement.unlocked
                      ? 'bg-gradient-to-br from-amber-50 to-orange-50 border-2 border-amber-200 hover:shadow-lg hover:scale-105'
                      : 'bg-gray-50 border-2 border-gray-200 opacity-60'
                    }
                  `}
                >
                  <div className="text-4xl mb-3">{achievement.icon}</div>
                  <p className="text-sm font-medium text-gray-700">{achievement.title}</p>
                  {achievement.unlocked && (
                    <div className="absolute -top-2 -right-2 w-6 h-6 bg-emerald-500 rounded-full flex items-center justify-center">
                      <Zap className="w-3 h-3 text-white" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Show Mission Bubble Button */}
        <div className="bg-white rounded-3xl p-6 shadow-lg border border-gray-100">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center">
                <Target className="w-7 h-7 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-800">Nhiệm vụ</h2>
                <p className="text-gray-500 text-sm">Xem danh sách nhiệm vụ và tiến độ</p>
              </div>
            </div>
            <button
              onClick={showMissionBubble}
              className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-xl hover:opacity-90 transition-opacity flex items-center gap-2"
            >
              <MessageCircle className="w-5 h-5" />
              Mở bảng nhiệm vụ
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
