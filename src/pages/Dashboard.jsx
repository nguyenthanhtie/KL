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
  const [classes, setClasses] = useState([]);

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

  // Fetch lessons data from API
  useEffect(() => {
    const fetchLessons = async () => {
      try {
        console.log('Fetching lessons from API...');
        const response = await axios.get(`${API_URL}/lessons/grouped`);
        console.log('API Response:', response.data);
        
        // Find lessons 21 and 22 specifically
        response.data.forEach(classData => {
          classData.chapters.forEach(chapter => {
            const lesson21 = chapter.lessons.find(l => l.lessonId === 21);
            const lesson22 = chapter.lessons.find(l => l.lessonId === 22);
            if (lesson21) console.log('Found lesson 21:', lesson21.title, 'in chapter', chapter.chapterId);
            if (lesson22) console.log('Found lesson 22:', lesson22.title, 'in chapter', chapter.chapterId);
          });
        });
        
        setClasses(response.data);
      } catch (error) {
        console.error('Error fetching lessons:', error);
        // Fallback to empty array if API fails
        setClasses([]);
      }
    };

    fetchLessons();
  }, []);

  const handleStartLesson = (classId, chapterId, lessonId) => {
    navigate(`/lesson/${classId}/${chapterId}/${lessonId}`);
  };

  // Function to get icon based on lesson type or title
  const getLessonIcon = (lesson) => {
    if (lesson.title.includes('Mở đầu')) return '📚';
    if (lesson.title.includes('Chất')) return '🔬';
    if (lesson.title.includes('Nguyên tử')) return '⚛️';
    if (lesson.title.includes('Nguyên tố')) return '🔤';
    if (lesson.title.includes('Đơn chất') || lesson.title.includes('Hợp chất')) return '🧩';
    if (lesson.title.includes('Công thức') || lesson.title.includes('Hoá trị')) return '📝';
    if (lesson.title.includes('biến đổi') || lesson.title.includes('PƯHH')) return '🔄';
    if (lesson.title.includes('bảo toàn')) return '⚖️';
    if (lesson.title.includes('Phương trình')) return '📐';
    if (lesson.title.includes('Mol') || lesson.title.includes('Avogadro')) return '🔢';
    if (lesson.title.includes('Chuyển đổi') || lesson.title.includes('Tỉ khối')) return '⚡';
    if (lesson.title.includes('tính theo')) return '🧮';
    if (lesson.title.includes('Oxi')) return '💨';
    if (lesson.title.includes('oxi hoá') || lesson.title.includes('Oxit')) return '🔥';
    if (lesson.title.includes('Điều chế') && lesson.title.includes('Oxi')) return '🧪';
    if (lesson.title.includes('Không khí') || lesson.title.includes('cháy')) return '🌬️';
    if (lesson.title.includes('Hiđro')) return '⚗️';
    if (lesson.title.includes('khử')) return '🔬';
    if (lesson.title.includes('Điều chế') && lesson.title.includes('Hiđro')) return '🧪';
    if (lesson.title.includes('Nước')) return '💧';
    if (lesson.title.includes('Axit') || lesson.title.includes('Bazơ') || lesson.title.includes('Muối')) return '🧫';
    if (lesson.title.includes('Dung dịch')) return '🥤';
    if (lesson.title.includes('Nồng độ')) return '📏';
    if (lesson.title.includes('Pha chế')) return '🧪';
    if (lesson.title.includes('Luyện tập')) return '💪';
    if (lesson.title.includes('Ôn tập lý thuyết')) return '📖';
    if (lesson.title.includes('Ôn tập bài tập')) return '🎯';
    return '📖'; // default icon
  };

  const getChapterTitle = (chapterId) => {
    const chapterTitles = {
      1: 'Chương 1: Chất - Nguyên tử - Phân tử',
      2: 'Chương 2: Phản ứng hóa học',
      3: 'Chương 3: Mol và tính toán hóa học',
      4: 'Chương 4: Oxi - Không khí',
      5: 'Chương 5: Hiđro - Nước',
      6: 'Chương 6: Axit - Bazơ - Muối',
      7: 'Chương 7: Dung dịch',
      8: 'Ôn tập cuối năm'
    };
    return chapterTitles[chapterId] || `Chương ${chapterId}`;
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
          {classes.map((classData) => (
            <Card key={classData.classId} className="overflow-hidden">
              {/* Header */}
              <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-6 -m-6 mb-6">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="text-2xl font-bold mb-1">Lớp {classData.classId} - Hóa học cơ bản</h3>
                    <span className="text-sm opacity-90">Grade {classData.classId}</span>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold">{Math.round((userProgress.completedLessons / userProgress.totalLessons) * 100) || 0}%</div>
                    <div className="text-sm opacity-90">Hoàn thành</div>
                  </div>
                </div>
                <ProgressBar 
                  progress={Math.round((userProgress.completedLessons / userProgress.totalLessons) * 100) || 0} 
                  className="bg-white/20"
                  color="white"
                />
              </div>

              {/* Chapters */}
              <div className="space-y-4">
                {classData.chapters.map((chapter) => (
                  <div key={chapter.chapterId} className="p-4 bg-gray-50 rounded-lg">
                    <h4 className="font-semibold text-gray-800 mb-3">{getChapterTitle(chapter.chapterId)}</h4>
                    <div className="space-y-3">
                      {chapter.lessons.map((lesson, index) => {
                        // Lấy progress data cho bài học này
                        const progress = lessonsProgress[lesson.lessonId] || {
                          stars: { basic: false, intermediate: false, advanced: false },
                          totalStars: 0,
                          completed: false
                        };
                        // Xác định màu sắc và badge theo loại bài
                        const getLessonType = (lesson) => {
                          if (lesson.title.includes('Thực hành') || lesson.title.includes('Điều chế') || lesson.title.includes('Pha chế')) return 'lab';
                          if (lesson.title.includes('Luyện tập') || lesson.title.includes('Bài tập') || lesson.title.includes('Ôn tập bài tập')) return 'exercise';
                          return 'theory';
                        };
                        
                        const lessonTypeConfig = {
                          lab: { color: 'from-green-400 to-teal-500', badge: 'Thực hành', badgeColor: 'bg-green-100 text-green-700' },
                          exercise: { color: 'from-orange-400 to-red-500', badge: 'Luyện tập', badgeColor: 'bg-orange-100 text-orange-700' },
                          theory: { color: 'from-blue-400 to-purple-500', badge: 'Lý thuyết', badgeColor: 'bg-blue-100 text-blue-700' }
                        };
                        const lessonType = getLessonType(lesson);
                        const config = lessonTypeConfig[lessonType];

                        return (
                          <div 
                            key={lesson.lessonId}
                            className="flex items-center justify-between p-3 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
                          >
                            <div className="flex items-center space-x-4">
                              <div className={`w-12 h-12 rounded-full flex items-center justify-center text-2xl ${
                                progress.completed 
                                  ? 'bg-green-500 text-white' 
                                  : `bg-gradient-to-r ${config.color} text-white`
                              }`}>
                                {progress.completed ? '✓' : getLessonIcon(lesson)}
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
                                onClick={() => handleStartLesson(classData.classId, chapter.chapterId, lesson.lessonId)}
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
