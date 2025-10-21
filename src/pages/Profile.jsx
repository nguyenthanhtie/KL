import { useAuth } from '../contexts/AuthContext';
import Card from '../components/ui/Card';
import ProgressBar from '../components/ui/ProgressBar';

const Profile = () => {
  const { user } = useAuth();

  const stats = {
    totalLessons: 12,
    completedLessons: 8,
    totalPoints: 850,
    currentStreak: 7,
    averageScore: 85,
    studyTime: '12h 30m'
  };

  const achievements = [
    { id: 1, title: '7 ngày liên tục', icon: '🔥', unlocked: true },
    { id: 2, title: 'Hoàn thành 5 bài', icon: '⭐', unlocked: true },
    { id: 3, title: '100% một bài', icon: '🏆', unlocked: true },
    { id: 4, title: 'Hoàn thành cấp Cơ bản', icon: '🎓', unlocked: false },
    { id: 5, title: '14 ngày liên tục', icon: '💪', unlocked: false },
    { id: 6, title: '1000 điểm', icon: '💎', unlocked: false },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="container mx-auto max-w-6xl">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Hồ sơ của tôi</h1>

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {/* User Info Card */}
          <Card className="md:col-span-1">
            <div className="text-center">
              <div className="w-24 h-24 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-4xl">{user?.email?.[0].toUpperCase()}</span>
              </div>
              <h2 className="text-xl font-bold text-gray-800 mb-1">
                {user?.email?.split('@')[0] || 'Học viên'}
              </h2>
              <p className="text-gray-600 text-sm mb-4">{user?.email}</p>
              <div className="bg-primary-50 rounded-lg p-3">
                <div className="text-3xl font-bold text-primary-600 mb-1">
                  Level {Math.floor(stats.totalPoints / 100)}
                </div>
                <ProgressBar 
                  progress={(stats.totalPoints % 100)} 
                  className="h-2"
                />
                <p className="text-xs text-gray-600 mt-2">
                  {100 - (stats.totalPoints % 100)} điểm nữa đến level tiếp theo
                </p>
              </div>
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
                <div className="text-sm text-gray-600">Ngày liên tục</div>
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
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Tiến độ theo cấp độ</h2>
          
          <div className="space-y-6">
            <div>
              <div className="flex justify-between mb-2">
                <span className="font-semibold text-gray-700">Cấp độ Cơ bản</span>
                <span className="text-gray-600">75%</span>
              </div>
              <ProgressBar progress={75} color="success" />
              <p className="text-sm text-gray-500 mt-1">3/4 bài học hoàn thành</p>
            </div>

            <div>
              <div className="flex justify-between mb-2">
                <span className="font-semibold text-gray-700">Cấp độ Trung cấp</span>
                <span className="text-gray-600">50%</span>
              </div>
              <ProgressBar progress={50} color="primary" />
              <p className="text-sm text-gray-500 mt-1">2/4 bài học hoàn thành</p>
            </div>

            <div>
              <div className="flex justify-between mb-2">
                <span className="font-semibold text-gray-700">Cấp độ Nâng cao</span>
                <span className="text-gray-600">25%</span>
              </div>
              <ProgressBar progress={25} color="warning" />
              <p className="text-sm text-gray-500 mt-1">1/4 bài học hoàn thành</p>
            </div>
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
