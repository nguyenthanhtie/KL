import { useEffect, useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import api from '../config/api';
import { ArrowRight, Sparkles, BookOpen, BarChart3, Trophy, ChevronRight, Zap, Star, Users, GraduationCap } from 'lucide-react';

const ProgramSelection = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [systemAnnouncements, setSystemAnnouncements] = useState([]);
  const [hoveredCard, setHoveredCard] = useState(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (user) {
      if (user.role === 'admin') {
        navigate('/admin', { replace: true });
      } else if (user.role === 'teacher' && user.teacherStatus === 'approved') {
        navigate('/teacher', { replace: true });
      } else if (user.role === 'student' || !user.role) {
        // Redirection for students
        if (user.programs && user.programs.length > 0) {
          const activeProgram = user.programs.find(p => p.isActive) || user.programs[0];
          if (activeProgram) {
            navigate(`/program/${activeProgram.programId}`, { replace: true });
          } else {
            navigate('/student/classes', { replace: true });
          }
        } else {
          navigate('/student/classes', { replace: true });
        }
      }
    }
  }, [user, navigate]);

  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        const res = await api.get('/users/announcements/system');
        if (res.data.success) {
          setSystemAnnouncements(res.data.data);
        }
      } catch (err) {
        // silently ignore
      }
    };
    fetchAnnouncements();
  }, []);

  const programs = [
    {
      id: 'chemistry',
      name: 'Hóa học',
      icon: '🧪',
      description: 'Khám phá thế giới của các nguyên tố, phản ứng và hợp chất hóa học qua bài học tương tác.',
      gradient: 'from-cyan-500 via-blue-500 to-indigo-600',
      glowColor: 'rgba(59, 130, 246, 0.4)',
      bgAccent: 'bg-blue-500/10',
      borderAccent: 'border-blue-500/30',
      textAccent: 'text-blue-400',
      available: true,
      grades: [8, 9, 10, 11, 12],
      totalLessons: 42,
      highlights: ['Thí nghiệm ảo', 'Bảng tuần hoàn', 'Tự động chấm'],
      stats: { students: '2.5K+', rating: 4.8 }
    },
    {
      id: 'physics',
      name: 'Vật lý',
      icon: '⚛️',
      description: 'Tìm hiểu định luật cơ bản từ chuyển động, năng lượng đến điện từ và quang học.',
      gradient: 'from-emerald-500 via-teal-500 to-cyan-600',
      glowColor: 'rgba(20, 184, 166, 0.4)',
      bgAccent: 'bg-teal-500/10',
      borderAccent: 'border-teal-500/30',
      textAccent: 'text-teal-400',
      available: false,
      grades: [8, 9, 10, 11, 12],
      totalLessons: 40,
      highlights: ['Mô phỏng thực tế', 'Video thí nghiệm', 'Giải chi tiết'],
      stats: { students: '1.8K+', rating: 4.7 }
    },
    {
      id: 'biology',
      name: 'Sinh học',
      icon: '🧬',
      description: 'Khám phá sự sống từ tế bào đến sinh thái, di truyền và đa dạng sinh học.',
      gradient: 'from-green-500 via-emerald-500 to-teal-600',
      glowColor: 'rgba(16, 185, 129, 0.4)',
      bgAccent: 'bg-emerald-500/10',
      borderAccent: 'border-emerald-500/30',
      textAccent: 'text-emerald-400',
      available: false,
      grades: [8, 9, 10, 11, 12],
      totalLessons: 38,
      highlights: ['Hình ảnh 3D', 'Video sinh học', 'Thực hành'],
      stats: { students: '1.2K+', rating: 4.6 }
    },
    {
      id: 'math',
      name: 'Toán học',
      icon: '📐',
      description: 'Phát triển tư duy logic qua đại số, hình học, giải tích và xác suất.',
      gradient: 'from-violet-500 via-purple-500 to-fuchsia-600',
      glowColor: 'rgba(139, 92, 246, 0.4)',
      bgAccent: 'bg-purple-500/10',
      borderAccent: 'border-purple-500/30',
      textAccent: 'text-purple-400',
      available: false,
      grades: [8, 9, 10, 11, 12],
      totalLessons: 45,
      highlights: ['Vẽ đồ thị', 'Tự luyện', 'Lời giải chi tiết'],
      stats: { students: '3.1K+', rating: 4.9 }
    }
  ];

  const handleProgramSelect = (program) => {
    if (!program.available) {
      alert(`Chương trình ${program.name} sắp ra mắt!`);
      return;
    }

    if (!user) {
      navigate('/login', { state: { from: `/placement-test/${program.id}` } });
      return;
    }

    const userProgram = user.programs?.find(p => p.programId === program.id);

    if (userProgram && userProgram.placementTestCompleted) {
      navigate(`/program/${program.id}`);
    } else {
      localStorage.setItem('selectedCurriculum', JSON.stringify({
        programId: program.id,
        curriculumType: 'ketnoi',
        curriculumName: 'Kết nối tri thức'
      }));
      navigate(`/placement-test/${program.id}`);
    }
  };

  const features = [
    { icon: Zap, title: 'Học tương tác', desc: 'Thí nghiệm ảo, mô phỏng 3D và bài tập tự động chấm điểm', color: 'from-yellow-500 to-orange-500' },
    { icon: BarChart3, title: 'Theo dõi tiến độ', desc: 'Đánh giá chi tiết giúp bạn nắm rõ quá trình học tập', color: 'from-blue-500 to-cyan-500' },
    { icon: Trophy, title: 'Gamification', desc: 'Hệ thống XP, cấp độ và thành tích tạo động lực học tập', color: 'from-purple-500 to-pink-500' },
    { icon: Users, title: 'Lớp học online', desc: 'Tham gia lớp học, PK với bạn bè và nhận đánh giá từ giáo viên', color: 'from-emerald-500 to-teal-500' },
  ];

  return (
    <div className="min-h-screen bg-[#0a0a1a] text-white overflow-hidden">

      {/* Animated Background */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-purple-600/10 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 w-[300px] h-[300px] bg-cyan-600/5 rounded-full blur-[80px] animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      {/* Floating Particles */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white/20 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `float ${5 + Math.random() * 10}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 5}s`
            }}
          />
        ))}
      </div>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) translateX(0px); opacity: 0.2; }
          25% { transform: translateY(-20px) translateX(10px); opacity: 0.6; }
          50% { transform: translateY(-40px) translateX(-10px); opacity: 0.3; }
          75% { transform: translateY(-20px) translateX(15px); opacity: 0.5; }
        }
        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes glow {
          0%, 100% { opacity: 0.5; }
          50% { opacity: 1; }
        }
        .animate-slideUp { animation: slideUp 0.6s ease-out forwards; }
        .shimmer-text {
          background: linear-gradient(90deg, #fff 0%, #a78bfa 25%, #818cf8 50%, #a78bfa 75%, #fff 100%);
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: shimmer 3s linear infinite;
        }
      `}</style>

      {/* Hero Section */}
      <section className="relative pt-20 pb-16 px-4">
        <div className="max-w-6xl mx-auto text-center relative z-10">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-full mb-8 backdrop-blur-sm animate-slideUp">
            <Sparkles className="w-4 h-4 text-yellow-400" />
            <span className="text-sm text-white/70">Nền tảng học tập trực tuyến hàng đầu</span>
          </div>

          {/* Main Heading */}
          <h1 className="text-5xl md:text-7xl font-extrabold mb-6 leading-tight animate-slideUp" style={{ animationDelay: '0.1s' }}>
            <span className="block text-white">Chinh phục kiến thức</span>
            <span className="block shimmer-text mt-2">theo cách của bạn</span>
          </h1>

          <p className="text-lg md:text-xl text-white/50 max-w-2xl mx-auto mb-10 animate-slideUp" style={{ animationDelay: '0.2s' }}>
            Trải nghiệm học tập cá nhân hóa với hệ thống AI thông minh, thí nghiệm ảo và chế độ thi đấu cùng bạn bè
          </p>

          {/* Stats Bar */}
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12 animate-slideUp" style={{ animationDelay: '0.3s' }}>
            {[
              { value: '10K+', label: 'Học sinh', icon: Users },
              { value: '200+', label: 'Bài học', icon: BookOpen },
              { value: '50+', label: 'Thử thách', icon: Trophy },
              { value: '4.8', label: 'Đánh giá', icon: Star },
            ].map((stat, i) => (
              <div key={i} className="flex items-center gap-3 group">
                <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-white/10 transition-colors">
                  <stat.icon className="w-5 h-5 text-white/60" />
                </div>
                <div className="text-left">
                  <p className="text-xl font-bold text-white">{stat.value}</p>
                  <p className="text-xs text-white/40">{stat.label}</p>
                </div>
              </div>
            ))}
          </div>

          {user && user.programs && user.programs.length > 0 && (
            <div className="mt-8 inline-flex items-center gap-2 px-5 py-2.5 bg-green-500/10 border border-green-500/20 rounded-full animate-slideUp" style={{ animationDelay: '0.4s' }}>
              <GraduationCap className="w-5 h-5 text-green-400" />
              <span className="text-green-300">Bạn đã đăng ký {user.programs.filter(p => p.isActive).length} chương trình học</span>
            </div>
          )}
        </div>
      </section>

      {/* System Announcements */}
      {systemAnnouncements.length > 0 && (
        <section className="max-w-6xl mx-auto px-4 pb-8">
          <div className="space-y-3">
            {systemAnnouncements.map(ann => {
              const config = ann.priority === 'urgent'
                ? { border: 'border-red-500/40', bg: 'bg-red-500/5', glow: 'text-red-400', icon: '🚨' }
                : ann.priority === 'high'
                ? { border: 'border-orange-500/40', bg: 'bg-orange-500/5', glow: 'text-orange-400', icon: '⚡' }
                : { border: 'border-blue-500/40', bg: 'bg-blue-500/5', glow: 'text-blue-400', icon: '📢' };
              return (
                <div key={ann._id} className={`border rounded-xl p-4 backdrop-blur-sm ${config.border} ${config.bg}`}>
                  <div className="flex items-start gap-3">
                    <span className="text-xl">{config.icon}</span>
                    <div className="flex-1">
                      <h3 className={`font-bold ${config.glow}`}>{ann.title}</h3>
                      <p className="text-white/60 text-sm mt-1">{ann.content}</p>
                      <p className="text-xs text-white/30 mt-2">
                        {new Date(ann.createdAt).toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric' })}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* Programs Section */}
      <section className="max-w-6xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">Chọn chương trình học</h2>
          <p className="text-white/40 max-w-lg mx-auto">Bắt đầu hành trình chinh phục kiến thức với các môn học được thiết kế chuyên biệt</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {programs.map((program, index) => {
            const isEnrolled = user?.programs?.some(p => p.programId === program.id && p.isActive);
            const isHovered = hoveredCard === program.id;

            return (
              <div
                key={program.id}
                className="animate-slideUp"
                style={{ animationDelay: `${0.1 * index}s` }}
                onMouseEnter={() => setHoveredCard(program.id)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                <div
                  className={`relative group rounded-2xl border backdrop-blur-sm transition-all duration-500 cursor-pointer overflow-hidden ${
                    program.available
                      ? `border-white/10 hover:border-white/20 bg-white/[0.02] hover:bg-white/[0.04]`
                      : 'border-white/5 bg-white/[0.01] opacity-60'
                  }`}
                  onClick={() => handleProgramSelect(program)}
                >
                  {/* Glow Effect */}
                  {program.available && (
                    <div
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"
                      style={{
                        background: `radial-gradient(600px circle at 50% 50%, ${program.glowColor}, transparent 70%)`
                      }}
                    />
                  )}

                  <div className="relative p-7">
                    {/* Header Row */}
                    <div className="flex items-start justify-between mb-5">
                      <div className="flex items-center gap-4">
                        <div className={`w-16 h-16 bg-gradient-to-br ${program.gradient} rounded-2xl flex items-center justify-center text-3xl shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                          {program.icon}
                        </div>
                        <div>
                          <h3 className="text-2xl font-bold text-white">{program.name}</h3>
                          <div className="flex items-center gap-3 mt-1 text-sm text-white/40">
                            <span>Lớp {program.grades[0]}-{program.grades[program.grades.length - 1]}</span>
                            <span>•</span>
                            <span>{program.totalLessons}+ bài</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-col items-end gap-2">
                        {isEnrolled && (
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-green-500/10 border border-green-500/20 rounded-full text-xs text-green-400 font-medium">
                            <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
                            Đang học
                          </span>
                        )}
                        {!program.available && (
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs text-white/40 font-medium">
                            Sắp ra mắt
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-white/50 text-sm leading-relaxed mb-5">
                      {program.description}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-6">
                      {program.highlights.map((h, i) => (
                        <span key={i} className={`px-3 py-1 rounded-lg text-xs font-medium ${program.bgAccent} ${program.textAccent} border ${program.borderAccent}`}>
                          {h}
                        </span>
                      ))}
                    </div>

                    {/* Bottom Row */}
                    <div className="flex items-center justify-between pt-4 border-t border-white/5">
                      <div className="flex items-center gap-4 text-sm text-white/30">
                        <div className="flex items-center gap-1">
                          <Users className="w-4 h-4" />
                          <span>{program.stats.students}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 text-yellow-500" />
                          <span className="text-yellow-500/70">{program.stats.rating}</span>
                        </div>
                      </div>

                      {program.available && (
                        <button className={`inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r ${program.gradient} rounded-xl text-sm font-semibold text-white shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:gap-3`}>
                          {isEnrolled ? 'Tiếp tục' : 'Bắt đầu'}
                          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Features Section */}
      <section className="max-w-6xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">Tại sao chọn chúng tôi?</h2>
          <p className="text-white/40">Nền tảng được xây dựng bởi giáo viên, dành cho học sinh</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {features.map((f, i) => (
            <div
              key={i}
              className="group relative bg-white/[0.02] border border-white/10 hover:border-white/20 rounded-2xl p-6 transition-all duration-300 hover:bg-white/[0.04] animate-slideUp"
              style={{ animationDelay: `${0.1 * i}s` }}
            >
              <div className={`w-12 h-12 bg-gradient-to-br ${f.color} rounded-xl flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform`}>
                <f.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">{f.title}</h3>
              <p className="text-sm text-white/40 leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      {!user && (
        <section className="max-w-6xl mx-auto px-4 py-16">
          <div className="relative rounded-3xl overflow-hidden">
            {/* BG Glow */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-pink-600/20" />
            <div className="absolute inset-0 backdrop-blur-xl bg-white/[0.02] border border-white/10 rounded-3xl" />

            <div className="relative text-center py-16 px-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-full mb-6">
                <Sparkles className="w-4 h-4 text-yellow-400" />
                <span className="text-sm text-white/60">Miễn phí hoàn toàn</span>
              </div>

              <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-4">
                Sẵn sàng bắt đầu?
              </h2>
              <p className="text-lg text-white/50 max-w-xl mx-auto mb-8">
                Tạo tài khoản miễn phí để lưu tiến trình và mở khóa toàn bộ tính năng
              </p>

              <div className="flex justify-center gap-4 flex-wrap">
                <Link to="/register">
                  <button className="px-8 py-3.5 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl font-semibold shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/30 transition-all hover:scale-105">
                    Đăng ký ngay
                    <ArrowRight className="w-4 h-4 inline ml-2" />
                  </button>
                </Link>
                <Link to="/login">
                  <button className="px-8 py-3.5 bg-white/5 border border-white/20 text-white rounded-xl font-semibold hover:bg-white/10 transition-all">
                    Đăng nhập
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Footer spacer */}
      <div className="h-8" />
    </div>
  );
};

export default ProgramSelection;
