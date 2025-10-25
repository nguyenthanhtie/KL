import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../contexts/AuthContext';
import { API_URL } from '../config/api';
import Card from '../components/ui/Card';
import ProgressBar from '../components/ui/ProgressBar';
import Button from '../components/ui/Button';

const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [userProgress, setUserProgress] = useState({
    totalLessons: 0,
    completedLessons: 0,
    currentStreak: 0,
    totalPoints: 0
  });
  const [lessonsProgress, setLessonsProgress] = useState({}); // Store progress by lessonId

  // Fetch user progress from API
  useEffect(() => {
    const fetchProgress = async () => {
      if (!user?.uid) return;
      
      try {
        const response = await axios.get(`${API_URL}/progress/user/${user.uid}`);
        const progressData = response.data;
        
        // Convert array to object keyed by lessonId
        const progressMap = {};
        progressData.forEach(p => {
          progressMap[p.lessonId] = p;
        });
        setLessonsProgress(progressMap);
        
        // Calculate stats
        const completed = progressData.filter(p => p.completed).length;
        setUserProgress({
          totalLessons: 28,
          completedLessons: completed,
          currentStreak: 0, // TODO: implement streak logic
          totalPoints: progressData.reduce((sum, p) => sum + (p.score || 0), 0)
        });
      } catch (error) {
        console.error('Error fetching progress:', error);
      }
    };

    fetchProgress();
  }, [user]);

  // Chương trình Hóa học lớp 8 - 28 bài (Tối ưu)
  const classes = [
    {
      classId: 8,
      title: 'Lớp 8 - Hóa học cơ bản',
      level: 'Grade 8',
      progress: 0,
      color: 'from-blue-500 to-purple-600',
      chapters: [
        {
          chapterId: 1,
          title: 'Chương 1: Chất - Nguyên tử - Phân tử',
          description: '6 bài học cơ bản',
          lessons: [
            { lessonId: 1, title: 'Bài 1: Mở đầu môn Hoá học', completed: false, type: 'theory', icon: '📚', description: 'Giới thiệu về môn Hoá học' },
            { lessonId: 2, title: 'Bài 2: Chất và tính chất vật lý', completed: false, type: 'lab', icon: '🔬', description: 'Chất, phân loại và thực hành' },
            { lessonId: 3, title: 'Bài 3: Nguyên tử', completed: false, type: 'theory', icon: '⚛️', description: 'Cấu tạo nguyên tử' },
            { lessonId: 4, title: 'Bài 4: Nguyên tố hoá học', completed: false, type: 'theory', icon: '🔤', description: 'Nguyên tố và ký hiệu hóa học' },
            { lessonId: 5, title: 'Bài 5: Đơn chất, Hợp chất và Phân tử', completed: false, type: 'theory', icon: '🧩', description: 'Phân loại và tính chất' },
            { lessonId: 6, title: 'Bài 6: Công thức hoá học và Hoá trị', completed: false, type: 'exercise', icon: '📝', description: 'Viết CTHH và tính hóa trị' }
          ]
        },
        {
          chapterId: 2,
          title: 'Chương 2: Phản ứng hóa học',
          description: '3 bài học về phản ứng',
          lessons: [
            { lessonId: 7, title: 'Bài 7: Sự biến đổi chất và PƯHH', completed: false, type: 'theory', icon: '🔄', description: 'Hiện tượng và phản ứng hóa học' },
            { lessonId: 8, title: 'Bài 8: Định luật bảo toàn khối lượng', completed: false, type: 'lab', icon: '⚖️', description: 'ĐLBTK và thực hành' },
            { lessonId: 9, title: 'Bài 9: Phương trình hoá học', completed: false, type: 'exercise', icon: '📐', description: 'Lập và cân bằng PTHH' }
          ]
        },
        {
          chapterId: 3,
          title: 'Chương 3: Mol và tính toán hóa học',
          description: '4 bài học tính toán',
          lessons: [
            { lessonId: 10, title: 'Bài 10: Mol và số Avogadro', completed: false, type: 'theory', icon: '🔢', description: 'Đơn vị mol và số Avogadro' },
            { lessonId: 11, title: 'Bài 11: Chuyển đổi và Tỉ khối', completed: false, type: 'theory', icon: '⚡', description: 'Chuyển đổi các đại lượng' },
            { lessonId: 12, title: 'Bài 12: Tính theo công thức', completed: false, type: 'exercise', icon: '🧮', description: 'Bài tập tính theo CTHH' },
            { lessonId: 13, title: 'Bài 13: Tính theo phương trình', completed: false, type: 'exercise', icon: '📊', description: 'Bài tập tính theo PTHH' }
          ]
        },
        {
          chapterId: 4,
          title: 'Chương 4: Oxi - Không khí',
          description: '4 bài học về oxi',
          lessons: [
            { lessonId: 14, title: 'Bài 14: Tính chất của Oxi', completed: false, type: 'theory', icon: '💨', description: 'Tính chất và ứng dụng' },
            { lessonId: 15, title: 'Bài 15: Sự oxi hoá và Oxit', completed: false, type: 'theory', icon: '🔥', description: 'Phản ứng oxi hóa' },
            { lessonId: 16, title: 'Bài 16: Điều chế khí Oxi', completed: false, type: 'lab', icon: '🧪', description: 'Phương pháp điều chế' },
            { lessonId: 17, title: 'Bài 17: Không khí và Sự cháy', completed: false, type: 'exercise', icon: '🌬️', description: 'Không khí và điều kiện cháy' }
          ]
        },
        {
          chapterId: 5,
          title: 'Chương 5: Hiđro - Nước',
          description: '5 bài học về hiđro',
          lessons: [
            { lessonId: 18, title: 'Bài 18: Tính chất của Hiđro', completed: false, type: 'theory', icon: '⚗️', description: 'Tính chất vật lý và hóa học' },
            { lessonId: 19, title: 'Bài 19: Phản ứng oxi hoá - khử', completed: false, type: 'theory', icon: '🔬', description: 'Chất khử và chất oxi hóa' },
            { lessonId: 20, title: 'Bài 20: Điều chế khí Hiđro', completed: false, type: 'lab', icon: '🧪', description: 'Phương pháp điều chế H₂' },
            { lessonId: 21, title: 'Bài 21: Nước và tính chất', completed: false, type: 'lab', icon: '💧', description: 'Tính chất của nước' },
            { lessonId: 22, title: 'Bài 22: Axit - Bazơ - Muối', completed: false, type: 'exercise', icon: '🧫', description: 'Khái niệm cơ bản' }
          ]
        },
        {
          chapterId: 6,
          title: 'Chương 6: Dung dịch',
          description: '4 bài học về dung dịch',
          lessons: [
            { lessonId: 23, title: 'Bài 23: Dung dịch và phân loại', completed: false, type: 'theory', icon: '🥤', description: 'Khái niệm dung dịch' },
            { lessonId: 24, title: 'Bài 24: Nồng độ dung dịch', completed: false, type: 'theory', icon: '📏', description: 'C% và CM' },
            { lessonId: 25, title: 'Bài 25: Pha chế dung dịch', completed: false, type: 'lab', icon: '🧪', description: 'Cách pha loãng và pha trộn' },
            { lessonId: 26, title: 'Bài 26: Luyện tập chương 6', completed: false, type: 'exercise', icon: '💪', description: 'Bài tập tổng hợp' }
          ]
        },
        {
          chapterId: 7,
          title: 'Ôn tập cuối năm',
          description: '2 bài ôn tập',
          lessons: [
            { lessonId: 27, title: 'Bài 27: Ôn tập lý thuyết', completed: false, type: 'theory', icon: '📖', description: 'Tổng hợp lý thuyết các chương' },
            { lessonId: 28, title: 'Bài 28: Ôn tập bài tập', completed: false, type: 'exercise', icon: '🎯', description: 'Bài tập tổng hợp cuối năm' }
          ]
        }
      ]
    }
  ];

  const handleStartLesson = (pathId, lessonId) => {
    navigate(`/lesson/${pathId}/${lessonId}`);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="container mx-auto max-w-7xl">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
            Xin chào, {user?.email?.split('@')[0] || 'Học viên'}! 👋
          </h1>
          <p className="text-gray-600">Tiếp tục hành trình học tập của bạn</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card className="text-center">
            <div className="text-3xl font-bold text-primary-600 mb-1">
              {userProgress.completedLessons}
            </div>
            <div className="text-gray-600 text-sm">Bài học hoàn thành</div>
          </Card>
          
          <Card className="text-center">
            <div className="text-3xl font-bold text-success mb-1">
              {userProgress.currentStreak}
            </div>
            <div className="text-gray-600 text-sm">Ngày liên tục</div>
          </Card>
          
          <Card className="text-center">
            <div className="text-3xl font-bold text-warning mb-1">
              {userProgress.totalPoints}
            </div>
            <div className="text-gray-600 text-sm">Điểm tích lũy</div>
          </Card>
          
          <Card className="text-center">
            <div className="text-3xl font-bold text-purple-600 mb-1">
              {classes.reduce((acc, cls) => acc + cls.chapters.reduce((a, ch) => a + ch.lessons.length, 0), 0)}
            </div>
            <div className="text-gray-600 text-sm">Tổng bài học</div>
          </Card>
        </div>

        {/* Learning Paths */}
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Lộ trình học tập</h2>
        
        <div className="space-y-6">
          {classes.map((cls) => (
            <Card key={cls.classId} className="overflow-hidden">
              {/* Header */}
              <div className={`bg-gradient-to-r ${cls.color} text-white p-6 -m-6 mb-6`}>
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="text-2xl font-bold mb-1">{cls.title}</h3>
                    <span className="text-sm opacity-90">{cls.level}</span>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold">{cls.progress}%</div>
                    <div className="text-sm opacity-90">Hoàn thành</div>
                  </div>
                </div>
                <ProgressBar 
                  progress={cls.progress} 
                  className="bg-white/20"
                  color="white"
                />
              </div>

              {/* Chapters */}
              <div className="space-y-4">
                {cls.chapters.map((ch) => (
                  <div key={ch.chapterId} className="p-4 bg-gray-50 rounded-lg">
                    <h4 className="font-semibold text-gray-800 mb-3">{ch.title}</h4>
                    <div className="space-y-3">
                      {ch.lessons.map((lesson, index) => {
                        // Lấy progress data cho bài học này
                        const progress = lessonsProgress[lesson.lessonId] || {
                          stars: { basic: false, intermediate: false, advanced: false },
                          totalStars: 0,
                          completed: false
                        };
                        
                        // Xác định màu sắc và badge theo loại bài
                        const lessonTypeConfig = {
                          lab: { color: 'from-green-400 to-teal-500', badge: 'Thực hành', badgeColor: 'bg-green-100 text-green-700' },
                          exercise: { color: 'from-orange-400 to-red-500', badge: 'Luyện tập', badgeColor: 'bg-orange-100 text-orange-700' },
                          theory: { color: 'from-blue-400 to-purple-500', badge: 'Lý thuyết', badgeColor: 'bg-blue-100 text-blue-700' }
                        };
                        const config = lessonTypeConfig[lesson.type] || lessonTypeConfig.theory;

                        return (
                          <div 
                            key={lesson.lessonId}
                            className="flex items-center justify-between p-3 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
                          >
                            <div className="flex items-center space-x-4">
                              <div className={`w-12 h-12 rounded-full flex items-center justify-center text-2xl ${
                                progress.completed 
                                  ? 'bg-success text-white' 
                                  : `bg-gradient-to-r ${config.color} text-white`
                              }`}>
                                {progress.completed ? '✓' : lesson.icon}
                              </div>
                              <div className="flex-1">
                                <div className="flex items-center gap-2 mb-1">
                                  <h5 className="font-medium text-gray-800">{lesson.title}</h5>
                                  <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${config.badgeColor}`}>
                                    {config.badge}
                                  </span>
                                </div>
                                <p className="text-sm text-gray-500">{lesson.description}</p>
                                <div className="flex items-center gap-3 mt-2">
                                  {/* Hiển thị sao theo cấp độ */}
                                  <div className="flex items-center gap-1">
                                    <span className={`text-lg ${progress.stars?.basic ? 'text-yellow-400' : 'text-gray-300'}`}>⭐</span>
                                    <span className="text-xs text-gray-500">Cơ bản</span>
                                  </div>
                                  <div className="flex items-center gap-1">
                                    <span className={`text-lg ${progress.stars?.intermediate ? 'text-yellow-400' : 'text-gray-300'}`}>⭐</span>
                                    <span className="text-xs text-gray-500">Trung bình</span>
                                  </div>
                                  <div className="flex items-center gap-1">
                                    <span className={`text-lg ${progress.stars?.advanced ? 'text-yellow-400' : 'text-gray-300'}`}>⭐</span>
                                    <span className="text-xs text-gray-500">Nâng cao</span>
                                  </div>
                                  <span className="text-xs font-medium text-gray-600 ml-2">
                                    ({progress.totalStars || 0}/3 ⭐)
                                  </span>
                                </div>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <Button
                                onClick={() => navigate(`/lesson/${cls.classId}/${ch.chapterId}/${lesson.lessonId}`)}
                                variant={progress.completed ? 'secondary' : 'primary'}
                                className="text-sm"
                              >
                                {progress.completed ? '🔄 Ôn tập' : '▶️ Bắt đầu'}
                              </Button>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
