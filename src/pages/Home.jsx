import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import Button from '../components/ui/Button';
import GradeSelector from '../components/ui/GradeSelector';

const Home = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen">
      {/* Hero Section - Lighter blue tones with animation */}
      <section className="bg-gradient-to-br from-blue-300 via-blue-400 to-indigo-400 text-white py-20 px-4 relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-white/8 rounded-full animate-pulse-soft"></div>
          <div className="absolute bottom-1/3 right-1/4 w-24 h-24 bg-blue-200/15 rounded-full animate-float-slow"></div>
          <div className="absolute top-1/2 right-1/3 w-16 h-16 bg-indigo-200/10 rounded-full animate-float-medium"></div>
        </div>
        
        <div className="container mx-auto text-center relative z-10">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 animate-fade-in-up">
            Học Hóa học Dễ dàng
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-blue-100 animate-fade-in-up animation-delay-200">
            Nền tảng học tập Hóa học tương tác, theo lộ trình từng bước
          </p>
          {!user ? (
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up animation-delay-400">
              <Link to="/register">
                <Button className="bg-white text-blue-500 hover:bg-blue-50 hover:scale-105 text-lg px-8 py-3 shadow-lg transition-all duration-300 transform">
                  Bắt đầu học ngay
                </Button>
              </Link>
              <Link to="/login">
                <Button variant="secondary" className="text-lg px-8 py-3 bg-blue-300/70 hover:bg-blue-300 hover:scale-105 text-white border-2 border-white/25 shadow-lg transition-all duration-300 transform">
                  Đăng nhập
                </Button>
              </Link>
            </div>
          ) : (
            <Link to="/dashboard">
              <Button className="bg-white text-blue-500 hover:bg-blue-50 hover:scale-105 text-lg px-8 py-3 shadow-lg transition-all duration-300 transform animate-fade-in-up animation-delay-400">
                Tiếp tục học tập
              </Button>
            </Link>
          )}
        </div>
      </section>

      {/* Features Section - Enhanced animations with lighter colors */}
      <section className="py-16 px-4 bg-gradient-to-b from-white to-blue-25">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12 text-gray-700 animate-fade-in">
            Tính năng nổi bật
          </h2>
          
          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center p-6 group hover:scale-105 transition-all duration-300 animate-slide-up bg-gradient-to-br from-green-50 to-green-100 rounded-xl shadow-sm hover:shadow-md">
              <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:shadow-lg transition-all duration-300">
                <span className="text-3xl text-white group-hover:scale-110 transition-transform duration-300">📚</span>
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-700 group-hover:text-green-600 transition-colors duration-300">Lộ trình học rõ ràng</h3>
              <p className="text-gray-600">
                Học tập theo cấp độ từ cơ bản đến nâng cao, phù hợp với mọi trình độ
              </p>
            </div>
            
            <div className="text-center p-6 group hover:scale-105 transition-all duration-300 animate-slide-up animation-delay-100 bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl shadow-sm hover:shadow-md">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-violet-500 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:shadow-lg transition-all duration-300">
                <span className="text-3xl text-white group-hover:scale-110 transition-transform duration-300">✓</span>
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-700 group-hover:text-purple-600 transition-colors duration-300">Quiz đa dạng</h3>
              <p className="text-gray-600">
                Trắc nghiệm, điền từ, đúng/sai - nhiều dạng bài tập thú vị
              </p>
            </div>

            <div className="text-center p-6 group hover:scale-105 transition-all duration-300 animate-slide-up animation-delay-200 bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl shadow-sm hover:shadow-md">
              <div className="w-16 h-16 bg-gradient-to-br from-orange-400 to-amber-500 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:shadow-lg transition-all duration-300">
                <span className="text-3xl text-white group-hover:scale-110 transition-transform duration-300">🏆</span>
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-700 group-hover:text-orange-600 transition-colors duration-300">Thử thách nâng cao</h3>
              <p className="text-gray-600">
                Kiểm tra kiến thức tổng hợp qua các bài kiểm tra định kỳ.
              </p>
            </div>
            
            <div className="text-center p-6 group hover:scale-105 transition-all duration-300 animate-slide-up animation-delay-300 bg-gradient-to-br from-pink-50 to-rose-100 rounded-xl shadow-sm hover:shadow-md">
              <div className="w-16 h-16 bg-gradient-to-br from-pink-400 to-rose-500 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:shadow-lg transition-all duration-300">
                <span className="text-3xl text-white group-hover:scale-110 transition-transform duration-300">📊</span>
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-700 group-hover:text-pink-600 transition-colors duration-300">Theo dõi tiến độ</h3>
              <p className="text-gray-600">
                Xem chi tiết quá trình học tập và thành tích đạt được
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Grade Selector Section */}
      <GradeSelector />

      {/* CTA Section - Lighter blue gradient with animations */}
      {!user && (
        <section className="bg-gradient-to-r from-blue-400 via-indigo-400 to-blue-500 text-white py-16 px-4 relative overflow-hidden">
          {/* Animated background elements */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-1/3 left-1/5 w-20 h-20 bg-white/8 rounded-full animate-float-slow"></div>
            <div className="absolute bottom-1/4 right-1/5 w-16 h-16 bg-blue-200/15 rounded-full animate-float-medium"></div>
            <div className="absolute top-1/2 left-1/2 w-12 h-12 bg-indigo-200/10 rounded-full animate-pulse-soft"></div>
          </div>
          
          <div className="container mx-auto text-center relative z-10">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 animate-fade-in-up">
              Sẵn sàng bắt đầu chưa?
            </h2>
            <p className="text-xl mb-8 text-blue-100 animate-fade-in-up animation-delay-200">
              Tham gia cùng hàng ngàn học viên đang học Hóa học hiệu quả
            </p>
            <Link to="/register">
              <Button className="bg-white text-blue-500 hover:bg-blue-50 hover:scale-105 text-lg px-8 py-3 shadow-lg transition-all duration-300 transform animate-fade-in-up animation-delay-400">
                Đăng ký miễn phí
              </Button>
            </Link>
          </div>
        </section>
      )}
    </div>
  );
};

export default Home;
