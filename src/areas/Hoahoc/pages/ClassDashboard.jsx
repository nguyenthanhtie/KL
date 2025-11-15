import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { API_URL } from '../../../config/api';
import { useAuth } from '../../../contexts/AuthContext';
import Card from '../../../components/ui/Card';
import ProgressBar from '../../../components/ui/ProgressBar';

const ClassDashboard = () => {
  const { classId } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [chapters, setChapters] = useState([]);
  const [lessonsProgress, setLessonsProgress] = useState({});
  const [loading, setLoading] = useState(true);

  const gradeInfo = {
    8: { title: 'Hóa học 8', color: 'blue', icon: '🧪' },
    9: { title: 'Hóa học 9', color: 'green', icon: '⚗️' },
    10: { title: 'Hóa học 10', color: 'purple', icon: '🔬' },
    11: { title: 'Hóa học 11', color: 'orange', icon: '⚛️' },
    12: { title: 'Hóa học 12', color: 'pink', icon: '🎓' }
  };

  const currentGrade = gradeInfo[classId] || gradeInfo[8];

  // Fetch lessons for this class
  useEffect(() => {
    const fetchLessons = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${API_URL}/lessons/grouped`);
        
        // Filter lessons for current class
        const classData = response.data.find(c => c.classId === parseInt(classId));
        
        if (classData) {
          setChapters(classData.chapters);
        } else {
          setChapters([]);
        }
      } catch (error) {
        console.error('Error fetching lessons:', error);
        setChapters([]);
      } finally {
        setLoading(false);
      }
    };

    fetchLessons();
  }, [classId]);

  // Fetch user progress
  useEffect(() => {
    const fetchProgress = async () => {
      if (!user?.uid) return;
      
      try {
        const response = await axios.get(`${API_URL}/progress/user/${user.uid}`);
        const progressData = response.data;
        
        const progressMap = {};
        progressData.forEach(p => {
          progressMap[p.lessonId] = p;
        });
        setLessonsProgress(progressMap);
      } catch (error) {
        console.error('Error fetching progress:', error);
      }
    };

    fetchProgress();
  }, [user]);

  const handleStartLesson = (chapterId, lessonId) => {
    navigate(`/lesson/${classId}/${chapterId}/${lessonId}`);
  };

  const getLessonIcon = (lesson) => {
    if (lesson.title.includes('Mở đầu')) return '📚';
    if (lesson.title.includes('Chất')) return '🔬';
    if (lesson.title.includes('Nguyên tử')) return '⚛️';
    if (lesson.title.includes('Oxit') || lesson.title.includes('Oxi')) return '💨';
    if (lesson.title.includes('Axit')) return '🧪';
    if (lesson.title.includes('Bazơ')) return '🧫';
    if (lesson.title.includes('Muối')) return '⚪';
    if (lesson.title.includes('Kim loại')) return '🔨';
    if (lesson.title.includes('Ankan') || lesson.title.includes('Alkane')) return '⛽';
    if (lesson.title.includes('Este')) return '🍎';
    if (lesson.title.includes('Điện li')) return '⚡';
    return '📖';
  };

  const getChapterProgress = (chapter) => {
    if (!chapter.lessons || chapter.lessons.length === 0) return 0;
    
    const completedCount = chapter.lessons.filter(
      lesson => lessonsProgress[lesson.lessonId]?.completed
    ).length;
    
    return (completedCount / chapter.lessons.length) * 100;
  };

  const getTotalProgress = () => {
    let totalLessons = 0;
    let completedLessons = 0;

    chapters.forEach(chapter => {
      totalLessons += chapter.lessons?.length || 0;
      completedLessons += chapter.lessons?.filter(
        lesson => lessonsProgress[lesson.lessonId]?.completed
      ).length || 0;
    });

    return totalLessons > 0 ? (completedLessons / totalLessons) * 100 : 0;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-8 px-4 flex items-center justify-center">
        <div className="text-center">
          <div className="text-5xl mb-4">⏳</div>
          <h2 className="text-2xl font-bold text-gray-700">Đang tải dữ liệu...</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-8 px-4">
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => navigate('/')}
            className="text-gray-600 hover:text-gray-800 mb-4 flex items-center"
          >
            ← Quay lại chọn lớp
          </button>
          
          <div className="flex items-center mb-4">
            <div className="text-5xl mr-4">{currentGrade.icon}</div>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
                {currentGrade.title}
              </h1>
              <p className="text-gray-600">
                {chapters.length} chương • {chapters.reduce((sum, ch) => sum + (ch.lessons?.length || 0), 0)} bài học
              </p>
            </div>
          </div>

          {/* Overall Progress */}
          {user && (
            <Card className="bg-white p-6">
              <div className="flex items-center justify-between mb-2">
                <span className="font-semibold text-gray-700">Tiến độ học tập</span>
                <span className="text-sm text-gray-600">{Math.round(getTotalProgress())}%</span>
              </div>
              <ProgressBar progress={getTotalProgress()} />
            </Card>
          )}
        </div>

        {/* Chapters and Lessons */}
        {chapters.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-12 text-center">
            <div className="text-6xl mb-4">📚</div>
            <h3 className="text-2xl font-bold text-gray-700 mb-2">
              Chưa có bài học nào
            </h3>
            <p className="text-gray-600 mb-6">
              Dữ liệu bài học cho lớp {classId} đang được cập nhật
            </p>
            <button
              onClick={() => navigate('/')}
              className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600"
            >
              Quay lại trang chủ
            </button>
          </div>
        ) : (
          <div className="space-y-8">
            {chapters.map((chapter) => (
              <div key={chapter.chapterId} className="bg-white rounded-xl shadow-lg p-6">
                {/* Chapter Header */}
                <div className="mb-6">
                  <h2 className="text-2xl font-bold text-gray-800 mb-3">
                    Chương {chapter.chapterId}
                  </h2>
                  
                  {user && chapter.lessons && chapter.lessons.length > 0 && (
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-gray-600">
                          {chapter.lessons.filter(l => lessonsProgress[l.lessonId]?.completed).length}/{chapter.lessons.length} bài hoàn thành
                        </span>
                        <span className="text-sm text-gray-600">
                          {Math.round(getChapterProgress(chapter))}%
                        </span>
                      </div>
                      <ProgressBar progress={getChapterProgress(chapter)} />
                    </div>
                  )}
                </div>

                {/* Lessons Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {chapter.lessons && chapter.lessons.map((lesson) => {
                    const progress = lessonsProgress[lesson.lessonId];
                    const isCompleted = progress?.completed;
                    const score = progress?.score || 0;

                    return (
                      <div
                        key={lesson.lessonId}
                        onClick={() => handleStartLesson(chapter.chapterId, lesson.lessonId)}
                        className={`border-2 rounded-lg p-4 cursor-pointer transition-all duration-300 hover:shadow-lg ${
                          isCompleted
                            ? 'border-green-400 bg-green-50'
                            : 'border-gray-200 bg-white hover:border-blue-400'
                        }`}
                      >
                        <div className="flex items-start justify-between mb-3">
                          <div className="text-3xl">{getLessonIcon(lesson)}</div>
                          {isCompleted && (
                            <div className="bg-green-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm">
                              ✓
                            </div>
                          )}
                        </div>

                        <h3 className="font-bold text-gray-800 mb-2 line-clamp-2">
                          {lesson.title}
                        </h3>
                        
                        {lesson.description && (
                          <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                            {lesson.description}
                          </p>
                        )}

                        {isCompleted && (
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-green-600 font-semibold">
                              Điểm: {score}
                            </span>
                          </div>
                        )}

                        <div className="mt-3 text-blue-600 font-semibold text-sm">
                          {isCompleted ? 'Ôn tập lại →' : 'Bắt đầu học →'}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ClassDashboard;
