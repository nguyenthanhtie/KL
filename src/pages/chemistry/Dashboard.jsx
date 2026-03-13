import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../../contexts/AuthContext';
import { API_URL } from '../../config/api';
import Card from '../../components/ui/Card';
import ProgressBar from '../../components/ui/ProgressBar';
import Button from '../../components/ui/Button';

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
  const [selectedClass, setSelectedClass] = useState(null);
  const [_userGrade, setUserGrade] = useState(8); // Track user grade (used to initialize selectedClass)

  useEffect(() => {
    if (user) {
      // Lấy thông tin grade từ user.programs nếu có
      const chemistryProgram = user.programs?.find(p => p.programId === 'chemistry');
      if (chemistryProgram && chemistryProgram.currentClass) {
        setUserGrade(chemistryProgram.currentClass);
        setSelectedClass(chemistryProgram.currentClass);
      } else {
        // Mặc định là lớp 8 nếu chưa có thông tin
        setUserGrade(8);
        setSelectedClass(8);
      }
    }
  }, [user]);


  // Fetch user progress from API
  useEffect(() => {
    const fetchProgress = async () => {
      const userUid = user?.firebaseUid || user?.uid;
      if (!userUid) return;
      
      try {
        const response = await axios.get(`${API_URL}/users/firebase/${userUid}`);
        const userData = response.data;
        
        // Find chemistry program
        const chemProgram = userData.programs?.find(p => p.programId === 'chemistry');
        
        if (!chemProgram) {
          console.log('No chemistry program found for user');
          return;
        }
        
        // Parse completedLessons from format [8001, 8002] to lessonId map
        const progressMap = {};
        
        // Get lessonStars Map
        const lessonStarsMap = chemProgram.progress.lessonStars || {};
        
        console.log('🔍 Dashboard - Debug lessonStars:', {
          raw: chemProgram.progress.lessonStars,
          type: typeof chemProgram.progress.lessonStars,
          keys: Object.keys(lessonStarsMap),
          values: Object.values(lessonStarsMap)
        });
        
        chemProgram.progress.completedLessons?.forEach(uniqueId => {
          // uniqueId format: classId * 1000 + lessonId
          // Example: 8001 = class 8, lesson 1
          const lessonClassId = Math.floor(uniqueId / 1000);
          const lessonId = uniqueId % 1000;
          
          const stars = lessonStarsMap[uniqueId.toString()] || 0;
          // Use uniqueId as key to avoid overwriting lessons with same lessonId
          progressMap[uniqueId] = {
            uniqueId: uniqueId,
            lessonId: lessonId,
            classId: lessonClassId,
            completed: true,
            score: chemProgram.progress.totalScore,
            stars: stars
          };
        });
        
        setLessonsProgress(progressMap);
        
        // Calculate stats
        const completedCount = chemProgram.progress.completedLessons?.length || 0;
        const currentStreak = chemProgram.studyStreak?.currentStreak || 0;
        
        setUserProgress({
          totalLessons: 51, // Total across all classes
          completedLessons: completedCount,
          currentStreak: currentStreak,
          totalPoints: chemProgram.progress.totalScore || 0
        });
        
        console.log('📊 Dashboard progress loaded:', {
          completedLessons: chemProgram.progress.completedLessons,
          totalScore: chemProgram.progress.totalScore,
          lessonStarsMap: lessonStarsMap,
          parsedProgress: progressMap
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

  const handleStartLesson = (classId, chapterId, lessonId, isLocked) => {
    if (isLocked) return;
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

  // Function to get chapter title from chapterId
  const getChapterTitle = (chapterId) => {
    return `Chương ${chapterId}`;
  };

  // Compute current-class specific statistics (used by UI cards)
  const currentClassData = classes.find(c => c.classId === selectedClass) || null;
  const totalLessonsInSelectedClass = currentClassData
    ? currentClassData.chapters.reduce((sum, ch) => sum + (ch.lessons?.length || 0), 0)
    : 0;

  const completedLessonsInSelectedClass = currentClassData
    ? currentClassData.chapters.reduce((sum, ch) => {
        return sum + ch.lessons.filter(lesson => {
          const uniqueId = currentClassData.classId * 1000 + lesson.lessonId;
          return lessonsProgress[uniqueId]?.completed;
        }).length;
      }, 0)
    : 0;

  // Sum stars for the selected class from lessonsProgress
  const totalStarsInSelectedClass = currentClassData
    ? Object.keys(lessonsProgress).reduce((acc, key) => {
        const p = lessonsProgress[key];
        const classId = Math.floor(Number(key) / 1000);
        if (classId === currentClassData.classId) {
          return acc + (p.stars || 0);
        }
        return acc;
      }, 0)
    : 0;

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="mx-auto w-[90%]">
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
              {completedLessonsInSelectedClass}
            </div>
            <div className="text-gray-600 text-sm">Bài đã hoàn thành</div>
          </Card>
          
          <Card className="text-center">
            <div className="text-3xl font-bold text-success mb-1">
              {userProgress.currentStreak}
            </div>
            <div className="text-gray-600 text-sm">Ngày liên tục</div>
          </Card>
          
          <Card className="text-center">
            <div className="text-3xl font-bold text-warning mb-1">
              {totalStarsInSelectedClass}
            </div>
            <div className="text-gray-600 text-sm">Sao tích lũy</div>
          </Card>
          
          <Card className="text-center">
            <div className="text-3xl font-bold text-purple-600 mb-1">
              {totalLessonsInSelectedClass}
            </div>
            <div className="text-gray-600 text-sm">Tổng bài học</div>
          </Card>
        </div>
        {/* Learning Paths */}
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Lộ trình học tập của bạn</h2>
        
        <div className="space-y-6">
          {classes.filter(c => c.classId === selectedClass).map((classData) => {
            // Build unlocked lesson set (same rule: after first incomplete, lock subsequent unless already completed)
            const allLessonsOrdered = classData.chapters
              .flatMap(ch => ch.lessons.map(ls => ({ ...ls, chapterRef: ch.chapterId })))
              .sort((a, b) => a.lessonId - b.lessonId);
            const unlocked = new Set();
            let lockAfterFirstIncomplete = false;
            for (const l of allLessonsOrdered) {
              // Calculate uniqueId for progress lookup
              const uniqueId = classData.classId * 1000 + l.lessonId;
              if (!lockAfterFirstIncomplete) {
                unlocked.add(l.lessonId);
                const prog = lessonsProgress[uniqueId];
                if (!prog?.completed) lockAfterFirstIncomplete = true;
              } else {
                const prog = lessonsProgress[uniqueId];
                if (prog?.completed) unlocked.add(l.lessonId);
              }
            }
            
            // Calculate completion for THIS class only
            const totalLessonsInClass = classData.chapters.reduce((sum, ch) => sum + ch.lessons.length, 0);
            const completedLessonsInClass = classData.chapters.reduce((sum, ch) => {
              return sum + ch.lessons.filter(lesson => {
                const uniqueId = classData.classId * 1000 + lesson.lessonId;
                return lessonsProgress[uniqueId]?.completed;
              }).length;
            }, 0);
            const classCompletionRate = totalLessonsInClass > 0 
              ? Math.round((completedLessonsInClass / totalLessonsInClass) * 100) 
              : 0;
            
            return (
            <Card key={classData.classId} className="overflow-hidden">
              {/* Header */}
              <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-6 -m-6 mb-6">
                <div className="flex justify-between items-start mb-3">
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold mb-1">Lớp {classData.classId} - Hóa học</h3>
                    <span className="text-sm opacity-90">{classData.chapters.length} chương • {totalLessonsInClass} bài học</span>
                  </div>
                  <div className="flex gap-2">
                   
                    <button
                      onClick={() => navigate(`/class/${classData.classId}`)}
                      className="bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg text-sm font-semibold transition-colors"
                    >
                      Xem tất cả →
                    </button>
                  </div>
                  <div className="text-right ml-4">
                    <div className="text-2xl font-bold">{classCompletionRate}%</div>
                    <div className="text-sm opacity-90">Hoàn thành</div>
                  </div>
                </div>
                <ProgressBar 
                  progress={classCompletionRate} 
                  className="bg-white/20"
                  color="white"
                />
                <div className="mt-2 text-sm opacity-90">
                  {completedLessonsInClass} / {totalLessonsInClass} bài học đã hoàn thành
                </div>
              </div>

              {/* Chapters */}
              <div className="space-y-4">
                {classData.chapters.map((chapter) => (
                  <div key={chapter.chapterId} className="p-4 bg-gray-50 rounded-lg">
                    <h4 className="font-semibold text-gray-800 mb-3">{chapter.chapterName || getChapterTitle(chapter.chapterId)}</h4>
                    <div className="space-y-3">
                      {chapter.lessons.map((lesson) => {
                        // Calculate uniqueId for this lesson
                        const uniqueId = classData.classId * 1000 + lesson.lessonId;
                        
                        // Get progress data for this lesson using uniqueId
                        const progress = lessonsProgress[uniqueId] || {
                          star: false,
                          highestScore: 0,
                          completed: false,
                          stars: 0
                        };
                        
                        // Debug log for lesson 2
                        if (lesson.lessonId === 2) {
                          console.log('🐛 Lesson 2 Debug:', {
                            lessonId: lesson.lessonId,
                            classId: classData.classId,
                            uniqueId: uniqueId,
                            progress: progress,
                            allProgress: lessonsProgress
                          });
                        }
                        
                        const isLocked = !unlocked.has(lesson.lessonId);
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
                            className={`relative flex items-center justify-between p-3 rounded-lg shadow-sm transition-shadow ${isLocked ? 'bg-gray-100 opacity-60 cursor-not-allowed' : 'bg-white hover:shadow-md cursor-pointer'}`}
                            onClick={() => handleStartLesson(classData.classId, chapter.chapterId, lesson.lessonId, isLocked)}
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
                                  {/* Display stars earned - only show actual stars earned */}
                                  {progress.completed && progress.stars > 0 && (
                                    <div className="flex items-center gap-1">
                                      {[...Array(progress.stars)].map((_, i) => (
                                        <span key={i} className="text-lg text-yellow-400">
                                          ⭐
                                        </span>
                                      ))}
                                    </div>
                                  )}
                                </div>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <Button
                                onClick={() => handleStartLesson(classData.classId, chapter.chapterId, lesson.lessonId, isLocked)}
                                variant={isLocked ? 'secondary' : (progress.completed ? 'secondary' : 'primary')}
                                disabled={isLocked}
                                className="text-sm"
                              >
                                {isLocked ? '🔒 Khóa' : (progress.completed ? '🔄 Ôn tập' : '▶️ Bắt đầu')}
                              </Button>
                            </div>
                            {isLocked && (
                              <div className="absolute inset-0 rounded-lg bg-white/40 backdrop-blur-[1px]" />
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          );
          })}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
