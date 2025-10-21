import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
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

  // Chương trình Hóa học lớp 8
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
          lessons: [
            { 
              lessonId: 1, 
              title: 'Bài 1: Chất – Tính chất của chất', 
              completed: false,
              level: 'Level 1',
              description: 'Tìm hiểu về chất, phân biệt chất tinh khiết và hỗn hợp'
            },
            { 
              lessonId: 2, 
              title: 'Bài 2: Nguyên tử – Phân tử', 
              completed: false,
              level: 'Level 2',
              description: 'Khám phá cấu tạo nguyên tử và phân tử'
            },
            { 
              lessonId: 3, 
              title: 'Bài 3: Nguyên tố hóa học', 
              completed: false,
              level: 'Level 3',
              description: 'Học về ký hiệu hóa học và số nguyên tử'
            },
            { 
              lessonId: 4, 
              title: 'Bài 4: Đơn chất & Hợp chất', 
              completed: false,
              level: 'Level 4',
              description: 'Phân biệt đơn chất và hợp chất'
            },
            { 
              lessonId: 5, 
              title: 'Bài 5: Phân tử khối', 
              completed: false,
              level: 'Level 5',
              description: 'Tính toán phân tử khối các chất'
            }
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
                      {ch.lessons.map((lesson, index) => (
                        <div 
                          key={lesson.lessonId}
                          className="flex items-center justify-between p-3 bg-white rounded-lg shadow-sm"
                        >
                          <div className="flex items-center space-x-4">
                            <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-xs ${
                              lesson.completed 
                                ? 'bg-success text-white' 
                                : 'bg-gradient-to-r from-blue-400 to-purple-500 text-white'
                            }`}>
                              {lesson.completed ? '✓' : lesson.level}
                            </div>
                            <div>
                              <h5 className="font-medium text-gray-800">{lesson.title}</h5>
                              <p className="text-sm text-gray-500">{lesson.description}</p>
                              <p className="text-xs text-gray-400">{lesson.completed ? 'Đã hoàn thành' : 'Chưa hoàn thành'}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Button
                              onClick={() => navigate(`/lesson/${cls.classId}/${ch.chapterId}/${lesson.lessonId}`)}
                              variant={lesson.completed ? 'secondary' : 'primary'}
                              className="text-sm"
                            >
                              {lesson.completed ? 'Ôn tập' : 'Bắt đầu'}
                            </Button>
                          </div>
                        </div>
                      ))}
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
