import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useEffect, useState } from 'react';
import { BookOpen, Trophy, Star, Flame, Play, ChevronDown, Scale, ChevronRight, Sparkles, Target, Award, Swords, GraduationCap, Beaker, ArrowRight } from 'lucide-react';
import api from '../../config/api';

const ChemistryHome = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [programData, setProgramData] = useState(null);
  const [showProgramDropdown, setShowProgramDropdown] = useState(false);
  const [grades, setGrades] = useState([]);
  const [loading, setLoading] = useState(true);
  const [computedStats, setComputedStats] = useState(null);

  const availablePrograms = [
    { id: 'chemistry', name: 'Hóa học', icon: '🧪', path: '/program/chemistry', available: true },
    { id: 'physics', name: 'Vật lý', icon: '⚛️', path: '/program/physics', available: false },
    { id: 'biology', name: 'Sinh học', icon: '🧬', path: '/program/biology', available: false },
    { id: 'math', name: 'Toán học', icon: '📐', path: '/program/math', available: false }
  ];

  const handleProgramChange = (program) => {
    if (!program.available) {
      alert(`Chương trình ${program.name} sắp ra mắt!`);
      return;
    }
    const hasProgram = user.programs?.some(p => p.programId === program.id && p.isActive);
    if (hasProgram) {
      navigate(program.path);
    } else {
      navigate(`/placement-test/${program.id}`);
    }
    setShowProgramDropdown(false);
  };

  const topicMapping = {
    8: { topics: ['Nguyên tử', 'Phản ứng', 'Mol', 'Oxi', 'Hiđro', 'Dung dịch'], icon: '⚗️', gradient: 'from-blue-500 to-cyan-500' },
    9: { topics: ['Phi kim', 'Kim loại', 'Hữu cơ', 'Đời sống'], icon: '🔬', gradient: 'from-emerald-500 to-teal-500' },
    10: { topics: ['Nguyên tử', 'Bảng tuần hoàn', 'Liên kết', 'Oxi hóa khử'], icon: '⚛️', gradient: 'from-violet-500 to-purple-500' },
    11: { topics: ['Điện li', 'Halogen', 'Oxi', 'Tốc độ', 'Nitơ'], icon: '🧪', gradient: 'from-amber-500 to-orange-500' },
    12: { topics: ['Este', 'Cacbohiđrat', 'Amin', 'Polime', 'Kim loại'], icon: '🧬', gradient: 'from-rose-500 to-pink-500' }
  };

  useEffect(() => {
    const initializeData = async () => {
      if (!user) { navigate('/login'); return; }

      const chemistryProgram = user.programs?.find(p => p.programId === 'chemistry' && p.isActive);
      if (!chemistryProgram) {
        localStorage.setItem('selectedCurriculum', JSON.stringify({ programId: 'chemistry', curriculumType: 'ketnoi', curriculumName: 'Kết nối tri thức' }));
        navigate('/placement-test/chemistry');
        return;
      }

      setProgramData(chemistryProgram);

      try {
        setLoading(true);
        const userUid = user?.firebaseUid || user?.uid;
        if (!userUid) throw new Error('User UID not found');
        
        const userResponse = await api.get(`/users/firebase/${userUid}`);
        const userData = userResponse.data;
        const chemProgram = userData.programs?.find(p => p.programId === 'chemistry');
        const response = await api.get('/lessons/statistics');
        const raw = response.data;
        const list = Array.isArray(raw) ? raw : (raw.data || raw.grades || []);

        const completedLessonsByClass = {};
        const lessonStarsMap = chemProgram?.progress?.lessonStars || {};
        
        if (chemProgram?.progress?.completedLessons) {
          chemProgram.progress.completedLessons.forEach(uniqueId => {
            const lessonClassId = Math.floor(uniqueId / 1000);
            completedLessonsByClass[lessonClassId] = (completedLessonsByClass[lessonClassId] || 0) + 1;
          });
        }

        const gradesWithTopics = list.map(g => {
          const gradeNum = Number(g.grade ?? g.class ?? g.classId);
          return {
            grade: Number.isNaN(gradeNum) ? 0 : gradeNum,
            chapters: g.chapters ?? g.totalChapters ?? 0,
            lessons: g.lessons ?? g.totalLessons ?? 0,
            completedLessons: completedLessonsByClass[gradeNum] || 0,
            topics: topicMapping[gradeNum]?.topics || [],
            icon: topicMapping[gradeNum]?.icon || '📚',
            gradient: topicMapping[gradeNum]?.gradient || 'from-gray-500 to-gray-600',
            ...g
          };
        });

        setGrades(gradesWithTopics);

        if (chemProgram?.progress) {
          const completedCount = chemProgram.progress.completedLessons?.length || 0;
          const totalScore = chemProgram.progress.totalScore || 0;
          const totalStars = Object.values(lessonStarsMap).reduce((sum, stars) => sum + (stars || 0), 0);
          setComputedStats({
            totalLessons: gradesWithTopics.reduce((sum, g) => sum + Number(g.lessons || 0), 0),
            completedLessons: completedCount,
            totalStars,
            totalPoints: totalScore
          });
        } else {
          setComputedStats({ totalLessons: gradesWithTopics.reduce((sum, g) => sum + Number(g.lessons || 0), 0), completedLessons: 0, totalStars: 0, totalPoints: 0 });
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        setGrades([]);
        setComputedStats({ totalLessons: 0, completedLessons: 0, totalStars: 0, totalPoints: 0 });
      } finally {
        setLoading(false);
      }
    };
    initializeData();
  }, [user, navigate]);

  if (!programData || loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-violet-50/30 flex items-center justify-center">
        <div className="text-center">
          <div className="relative w-14 h-14 mx-auto mb-4">
            <div className="absolute inset-0 rounded-full border-2 border-slate-200"></div>
            <div className="absolute inset-0 rounded-full border-2 border-violet-500 border-t-transparent animate-spin"></div>
            <div className="absolute inset-2 rounded-full border-2 border-violet-300/50 border-b-transparent animate-spin" style={{animationDirection: 'reverse', animationDuration: '1.5s'}}></div>
          </div>
          <p className="text-slate-400 text-sm">Đang tải...</p>
        </div>
      </div>
    );
  }

  const stats = computedStats || { totalLessons: 0, completedLessons: 0, totalStars: 0, totalPoints: 0 };
  const currentClassId = Number(programData.currentClass ?? 8);
  const currentGradeData = grades.find(g => Number(g.grade) === currentClassId);
  const currentClassTotalLessons = currentGradeData?.lessons || 0;
  const currentClassCompletedLessons = currentGradeData?.completedLessons || 0;
  const completionRate = currentClassTotalLessons > 0 ? Math.round((currentClassCompletedLessons / currentClassTotalLessons) * 100) : 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-violet-50/30">
      {/* Background Effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-violet-200/40 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-blue-200/30 rounded-full blur-[100px]"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-100/40 rounded-full blur-[150px]"></div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 py-6">
        {/* Header */}
        <header className="flex items-center justify-between mb-8">
          <div className="relative">
            <button
              onClick={() => setShowProgramDropdown(!showProgramDropdown)}
              className="flex items-center gap-2.5 px-4 py-2.5 bg-white/80 backdrop-blur-xl hover:bg-white rounded-xl text-sm font-medium transition-all border border-slate-200 hover:border-slate-300 shadow-sm hover:shadow"
            >
              <Beaker className="w-4 h-4 text-violet-600" />
              <span className="text-slate-700">Hóa học</span>
              <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${showProgramDropdown ? 'rotate-180' : ''}`} />
            </button>

            {showProgramDropdown && (
              <>
                <div className="fixed inset-0 z-40" onClick={() => setShowProgramDropdown(false)}></div>
                <div className="absolute top-full left-0 mt-2 w-56 bg-white/95 backdrop-blur-xl rounded-xl border border-slate-200 overflow-hidden z-50 shadow-xl">
                  <div className="p-1.5">
                    {availablePrograms.map((program) => (
                      <button
                        key={program.id}
                        onClick={() => handleProgramChange(program)}
                        disabled={!program.available}
                        className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all ${
                          program.id === 'chemistry' ? 'bg-violet-50 text-violet-700' : program.available ? 'hover:bg-slate-50 text-slate-700' : 'opacity-40 cursor-not-allowed text-slate-400'
                        }`}
                      >
                        <span className="text-lg">{program.icon}</span>
                        <span className="font-medium">{program.name}</span>
                        {program.id === 'chemistry' && <div className="ml-auto w-2 h-2 rounded-full bg-violet-500"></div>}
                        {!program.available && <span className="ml-auto text-[10px] text-slate-400">Sắp ra mắt</span>}
                      </button>
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>
          
          <div className="flex items-center gap-3">
            <div className="text-right hidden sm:block">
              <p className="text-slate-400 text-xs">Xin chào</p>
              <p className="text-slate-700 font-medium text-sm">{user?.displayName || 'Học sinh'}</p>
            </div>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center text-lg font-bold text-white">
              {(user?.displayName || 'H')[0]}
            </div>
          </div>
        </header>

        {/* Hero Section */}
        <div className="grid lg:grid-cols-3 gap-4 mb-6">
          {/* Main Progress Card */}
          <div className="lg:col-span-2 relative overflow-hidden rounded-2xl bg-gradient-to-br from-violet-600 via-purple-600 to-indigo-600">
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDM0djItSDI0di0yaDEyek0zNiAzMHYySDI0di0yaDEyeiIvPjwvZz48L2c+PC9zdmc+')] opacity-50"></div>
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-32 -mt-32"></div>
            
            <div className="relative p-6">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <GraduationCap className="w-5 h-5 text-white/70" />
                    <span className="text-white/70 text-sm">Đang học</span>
                  </div>
                  <h1 className="text-3xl font-bold text-white">Lớp {currentClassId}</h1>
                </div>
                <div className="text-right">
                  <div className="text-4xl font-bold text-white">{completionRate}%</div>
                  <p className="text-white/60 text-xs">hoàn thành</p>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-white/70">{currentClassCompletedLessons} / {currentClassTotalLessons} bài học</span>
                  <span className="text-yellow-300 flex items-center gap-1 font-medium">
                    <Star className="w-4 h-4 fill-current" /> {stats.totalStars}
                  </span>
                </div>
                <div className="h-2 bg-white/20 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-emerald-400 to-green-400 rounded-full transition-all duration-1000"
                    style={{ width: `${completionRate}%` }}
                  ></div>
                </div>
              </div>

              <button 
                onClick={() => navigate('/program/chemistry/dashboard')}
                className="mt-6 w-full py-3 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-xl font-semibold text-sm flex items-center justify-center gap-2 transition-all group text-white"
              >
                <Play className="w-4 h-4" />
                Tiếp tục học
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>

          {/* Stats Panel */}
          <div className="space-y-4">
            {[
              { icon: BookOpen, label: 'Bài hoàn thành', value: stats.completedLessons, gradient: 'from-blue-500 to-cyan-500', bg: 'bg-blue-50' },
              { icon: Star, label: 'Sao tích lũy', value: stats.totalStars, gradient: 'from-amber-500 to-orange-500', bg: 'bg-amber-50' },
              { icon: Trophy, label: 'Điểm thành tích', value: stats.totalPoints, gradient: 'from-violet-500 to-purple-500', bg: 'bg-violet-50' },
            ].map((stat, i) => (
              <div key={i} className="flex items-center gap-4 p-4 bg-white/80 backdrop-blur-sm rounded-xl border border-slate-200/60 hover:border-slate-300 hover:shadow-md transition-all">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.gradient} flex items-center justify-center flex-shrink-0`}>
                  <stat.icon className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-2xl font-bold text-slate-800">{stat.value}</p>
                  <p className="text-slate-500 text-xs">{stat.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
          {[
            { icon: Target, title: 'Thử thách', desc: 'Bài tập nâng cao', gradient: 'from-violet-600 to-purple-600', path: '/advanced-challenge' },
            { icon: Scale, title: 'Cân bằng PT', desc: 'Phương trình hóa học', gradient: 'from-cyan-600 to-blue-600', path: '/equation-balancer' },
            { icon: Swords, title: 'PK Battle', desc: 'Đấu trường 1v1', gradient: 'from-orange-600 to-rose-600', path: '/chemistry/pk', hot: true },
            { icon: Award, title: 'Hồ sơ', desc: 'Thành tích của bạn', gradient: 'from-emerald-600 to-teal-600', path: '/profile' },
          ].map((action, i) => (
            <button
              key={i}
              onClick={() => navigate(action.path)}
              className="group relative overflow-hidden rounded-xl p-4 text-left transition-all hover:-translate-y-1 hover:shadow-xl"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${action.gradient} opacity-90 group-hover:opacity-100 transition-opacity`}></div>
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_-20%,rgba(255,255,255,0.2),transparent)]"></div>
              
              <div className="relative">
                {action.hot && (
                  <span className="absolute -top-1 -right-1 px-1.5 py-0.5 bg-yellow-400 text-yellow-900 text-[9px] font-bold rounded animate-pulse">HOT</span>
                )}
                <action.icon className="w-6 h-6 mb-3 text-white/90" />
                <h3 className="font-bold text-white text-sm mb-0.5">{action.title}</h3>
                <p className="text-white/60 text-[11px]">{action.desc}</p>
              </div>
            </button>
          ))}
        </div>

        {/* Learning Path */}
        <section>
          <div className="flex items-center gap-3 mb-5">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-600 to-purple-600 flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-800">Lộ trình học tập</h2>
              <p className="text-slate-500 text-xs">Hóa học từ lớp 8 đến lớp 12</p>
            </div>
          </div>

          <div className="grid gap-3">
            {grades.map(({ grade, topics, chapters, lessons, icon, gradient, completedLessons = 0 }) => {
              const isCurrentGrade = currentClassId === grade;
              const isPastGrade = grade < currentClassId;
              const isUnlocked = grade <= currentClassId;
              const progress = lessons > 0 ? Math.round((completedLessons / lessons) * 100) : 0;
              const displayProgress = isPastGrade ? 100 : progress;

              return (
                <div 
                  key={grade}
                  onClick={() => isUnlocked && navigate(`/class/${grade}`)}
                  className={`relative overflow-hidden rounded-xl border transition-all cursor-pointer ${
                    isCurrentGrade 
                      ? 'bg-white border-violet-300 shadow-lg shadow-violet-100 hover:shadow-xl' 
                      : isUnlocked 
                        ? 'bg-white/80 border-slate-200 hover:border-slate-300 hover:shadow-md' 
                        : 'bg-slate-50/50 border-slate-200/50 opacity-60 cursor-not-allowed'
                  }`}
                >
                  {isCurrentGrade && <div className="absolute inset-0 bg-gradient-to-r from-violet-50/50 via-transparent to-purple-50/50"></div>}
                  
                  <div className="relative p-4">
                    <div className="flex items-center gap-4">
                      <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${isUnlocked ? gradient : 'from-slate-300 to-slate-400'} flex items-center justify-center text-2xl flex-shrink-0 ${isCurrentGrade ? 'shadow-lg shadow-violet-200' : ''}`}>
                        {icon}
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-bold text-slate-800">Lớp {grade}</h3>
                          {isCurrentGrade && (
                            <span className="px-2 py-0.5 bg-violet-100 text-violet-700 text-[10px] font-semibold rounded-full flex items-center gap-1">
                              <Flame className="w-3 h-3" /> Đang học
                            </span>
                          )}
                          {isPastGrade && (
                            <span className="px-2 py-0.5 bg-emerald-100 text-emerald-700 text-[10px] font-semibold rounded-full">✓ Xong</span>
                          )}
                          {!isUnlocked && (
                            <span className="px-2 py-0.5 bg-slate-100 text-slate-500 text-[10px] font-semibold rounded-full">🔒 Khóa</span>
                          )}
                        </div>
                        <p className="text-slate-500 text-xs mb-2">{chapters} chương • {lessons} bài</p>
                        
                        {isUnlocked && (
                          <div className="flex items-center gap-2">
                            <div className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                              <div className={`h-full rounded-full bg-gradient-to-r ${gradient}`} style={{ width: `${displayProgress}%` }}></div>
                            </div>
                            <span className="text-xs text-slate-500 font-medium w-8">{displayProgress}%</span>
                          </div>
                        )}
                      </div>

                      {isUnlocked && (
                        <ChevronRight className="w-5 h-5 text-slate-400 flex-shrink-0" />
                      )}
                    </div>

                    {isUnlocked && (
                      <div className="flex flex-wrap gap-1.5 mt-3 pl-[72px]">
                        {topics.slice(0, 4).map((topic, idx) => (
                          <span key={idx} className="px-2 py-0.5 bg-slate-100 text-slate-600 text-[10px] rounded-md">{topic}</span>
                        ))}
                        {topics.length > 4 && <span className="px-2 py-0.5 bg-slate-50 text-slate-400 text-[10px] rounded-md">+{topics.length - 4}</span>}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Footer */}
        <footer className="mt-12 py-6 border-t border-slate-200 text-center">
          <p className="text-slate-400 text-xs">© 2024 KL Learning • Học Hóa học thông minh</p>
        </footer>
      </div>
    </div>
  );
};

export default ChemistryHome;
