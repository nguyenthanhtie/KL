import { useAuth } from '../contexts/AuthContext';
import { useState, useEffect } from 'react';
import Card from '../components/ui/Card';
import ProgressBar from '../components/ui/ProgressBar';
import api from '../config/api';

const Profile = () => {
  const { user } = useAuth();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedProgram, setSelectedProgram] = useState('chemistry'); // Default to chemistry

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
      <div className="min-h-screen bg-gray-50 py-8 px-4 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Đang tải thông tin...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 py-8 px-4 flex items-center justify-center">
        <Card className="max-w-md">
          <div className="text-center text-red-600">
            <p className="text-xl font-bold mb-2">⚠️ Lỗi</p>
            <p>{error}</p>
          </div>
        </Card>
      </div>
    );
  }

  // Program names mapping
  const programNames = {
    'chemistry': { name: 'Hóa học', icon: '🧪', color: 'bg-blue-500' },
    'physics': { name: 'Vật lý', icon: '⚛️', color: 'bg-purple-500' },
    'biology': { name: 'Sinh học', icon: '🧬', color: 'bg-green-500' },
    'math': { name: 'Toán học', icon: '📊', color: 'bg-orange-500' }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="container mx-auto max-w-6xl">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Hồ sơ của tôi</h1>

        {/* Program Selector */}
        {userData?.programs && userData.programs.length > 0 && (
          <div className="mb-6">
            <p className="text-sm text-gray-600 mb-2">Chọn chương trình:</p>
            <div className="flex flex-wrap gap-3">
              {userData.programs.map((program) => (
                <button
                  key={program.programId}
                  onClick={() => setSelectedProgram(program.programId)}
                  className={`px-4 py-2 rounded-lg font-medium transition-all ${
                    selectedProgram === program.programId
                      ? `${programNames[program.programId]?.color || 'bg-primary-600'} text-white shadow-lg scale-105`
                      : 'bg-white text-gray-700 border-2 border-gray-200 hover:border-primary-300'
                  }`}
                >
                  <span className="mr-2">{programNames[program.programId]?.icon || '📚'}</span>
                  {program.programName || programNames[program.programId]?.name || program.programId}
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {/* User Info Card */}
          <Card className="md:col-span-1">
            <div className="text-center">
              <div className="w-24 h-24 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                {userData?.avatar ? (
                  <img 
                    src={userData.avatar} 
                    alt="Avatar" 
                    className="w-full h-full rounded-full object-cover"
                  />
                ) : (
                  <span className="text-4xl">
                    {userData?.displayName?.[0]?.toUpperCase() || userData?.username?.[0]?.toUpperCase() || user?.email?.[0]?.toUpperCase() || '👤'}
                  </span>
                )}
              </div>
              <h2 className="text-xl font-bold text-gray-800 mb-1">
                {userData?.displayName || userData?.username || user?.email?.split('@')[0] || 'Học viên'}
              </h2>
              <p className="text-gray-600 text-sm mb-4">{userData?.email || user?.email}</p>
              <div className="bg-primary-50 rounded-lg p-3">
                <div className="text-3xl font-bold text-primary-600 mb-1">
                  Level {userData?.level || 1}
                </div>
                <ProgressBar 
                  progress={((userData?.xp || 0) % 100)} 
                  className="h-2"
                />
                <p className="text-xs text-gray-600 mt-2">
                  {userData?.xp || 0} XP - {100 - ((userData?.xp || 0) % 100)} XP nữa đến level tiếp theo
                </p>
              </div>
              {currentProgram && (
                <div className="mt-4 text-left">
                  <p className="text-sm text-gray-600">
                    <strong>Chương trình:</strong> {currentProgram.programName || programNames[selectedProgram]?.name}
                  </p>
                  <p className="text-sm text-gray-600">
                    <strong>Lớp:</strong> {currentProgram.currentClass}
                  </p>
                  {currentProgram.placementTestCompleted && (
                    <p className="text-sm text-gray-600">
                      <strong>Điểm kiểm tra đầu vào:</strong> {currentProgram.placementTestScore || 0}
                    </p>
                  )}
                </div>
              )}
            </div>
          </Card>

          {/* Stats Cards */}
          <div className="md:col-span-2 grid grid-cols-2 gap-4">
            <Card>
              <div className="text-center">
                <div className="text-4xl mb-2">📚</div>
                <div className="text-3xl font-bold text-gray-800 mb-1">
                  {stats.completedLessons}/{stats.totalLessons}
                </div>
                <div className="text-sm text-gray-600">Bài học hoàn thành</div>
              </div>
            </Card>

            <Card>
              <div className="text-center">
                <div className="text-4xl mb-2">🔥</div>
                <div className="text-3xl font-bold text-warning mb-1">
                  {stats.currentStreak}
                </div>
                <div className="text-sm text-gray-600">Chuỗi ngày hoạt động</div>
                {stats.longestStreak > 0 && (
                  <div className="text-xs text-gray-500 mt-1">
                    Cao nhất: {stats.longestStreak} ngày
                  </div>
                )}
              </div>
            </Card>

            <Card>
              <div className="text-center">
                <div className="text-4xl mb-2">⭐</div>
                <div className="text-3xl font-bold text-primary-600 mb-1">
                  {stats.totalPoints}
                </div>
                <div className="text-sm text-gray-600">Tổng điểm</div>
              </div>
            </Card>

            <Card>
              <div className="text-center">
                <div className="text-4xl mb-2">📊</div>
                <div className="text-3xl font-bold text-success mb-1">
                  {stats.averageScore}%
                </div>
                <div className="text-sm text-gray-600">Điểm trung bình</div>
              </div>
            </Card>
          </div>
        </div>

        {/* Progress by Level */}
        <Card className="mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            Tiến độ theo cấp độ - {programNames[selectedProgram]?.name || selectedProgram}
          </h2>
          
          <div className="space-y-6">
            {calculateProgressByLevel(currentProgram?.progress?.completedLessons || [], selectedProgram).map((levelData, index) => (
              <div key={index}>
                <div className="flex justify-between mb-2">
                  <span className="font-semibold text-gray-700">{levelData.name}</span>
                  <span className="text-gray-600">{levelData.percentage}%</span>
                </div>
                <ProgressBar progress={levelData.percentage} color={levelData.color} />
                <p className="text-sm text-gray-500 mt-1">
                  {levelData.completed}/{levelData.total} bài học hoàn thành
                </p>
              </div>
            ))}
          </div>
        </Card>

        {/* Achievements */}
        <Card>
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Thành tích</h2>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {achievements.map((achievement) => (
              <div
                key={achievement.id}
                className={`text-center p-4 rounded-lg border-2 transition-all ${
                  achievement.unlocked
                    ? 'border-primary-200 bg-primary-50'
                    : 'border-gray-200 bg-gray-50 opacity-50'
                }`}
              >
                <div className="text-4xl mb-2">{achievement.icon}</div>
                <p className="text-sm font-medium text-gray-700">{achievement.title}</p>
                {achievement.unlocked && (
                  <p className="text-xs text-success mt-1">✓ Đã mở khóa</p>
                )}
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Profile;
