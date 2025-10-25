import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import Button from '../components/ui/Button';

const Home = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-600 to-primary-800 text-white py-20 px-4">
        <div className="container mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Học Hóa học Dễ dàng
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-primary-100">
            Nền tảng học tập Hóa học tương tác, theo lộ trình từng bước
          </p>
          {!user ? (
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/register">
                <Button className="bg-white text-primary-600 hover:bg-gray-100 text-lg px-8 py-3">
                  Bắt đầu học ngay
                </Button>
              </Link>
              <Link to="/login">
                <Button variant="secondary" className="text-lg px-8 py-3 bg-primary-500 hover:bg-primary-400 text-white">
                  Đăng nhập
                </Button>
              </Link>
            </div>
          ) : (
            <Link to="/dashboard">
              <Button className="bg-white text-primary-600 hover:bg-gray-100 text-lg px-8 py-3">
                Tiếp tục học tập
              </Button>
            </Link>
          )}
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">
            Tính năng nổi bật
          </h2>
          
          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">📚</span>
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-800">Lộ trình học rõ ràng</h3>
              <p className="text-gray-600">
                Học tập theo cấp độ từ cơ bản đến nâng cao, phù hợp với mọi trình độ
              </p>
            </div>
            
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">✓</span>
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-800">Quiz đa dạng</h3>
              <p className="text-gray-600">
                Trắc nghiệm, điền từ, đúng/sai - nhiều dạng bài tập thú vị
              </p>
            </div>

            <div className="text-center p-6">
              <div className="w-16 h-16 bg-error/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">🏆</span>
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-800">Thử thách nâng cao</h3>
              <p className="text-gray-600">
                Kiểm tra kiến thức tổng hợp qua các bài kiểm tra định kỳ.
              </p>
            </div>
            
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-warning/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">📊</span>
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-800">Theo dõi tiến độ</h3>
              <p className="text-gray-600">
                Xem chi tiết quá trình học tập và thành tích đạt được
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Topics Section */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">
            Lộ trình của bạn
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Link to="/dashboard" className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all block">
                <div className="w-12 h-12 bg-blue-500 rounded-lg mb-3 flex items-center justify-center">
                    <span className="text-2xl text-white">🚀</span>
                </div>
                <h3 className="text-lg font-bold text-gray-800">Lộ trình chính</h3>
                <p className="text-gray-600 mt-1">Bắt đầu từ con số 0, chinh phục các khái niệm Hóa học.</p>
            </Link>
            <Link to="/advanced-challenge" className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all block">
                <div className="w-12 h-12 bg-purple-500 rounded-lg mb-3 flex items-center justify-center">
                    <span className="text-2xl text-white">🏆</span>
                </div>
                <h3 className="text-lg font-bold text-gray-800">Thử thách nâng cao</h3>
                <p className="text-gray-600 mt-1">Kiểm tra kiến thức và giải các bài tập khó.</p>
            </Link>
            
            {[
              { title: 'Hóa hữu cơ', color: 'bg-green-500', icon: '🔬' },
              { title: 'Điện hóa', color: 'bg-red-500', icon: '⚡' },
            ].map((topic, index) => (
              <div key={index} className="bg-gray-200 rounded-xl p-6 shadow-md cursor-not-allowed relative">
                <div className="absolute top-2 right-2 bg-gray-500 text-white text-xs font-bold px-2 py-1 rounded">Sắp ra mắt</div>
                <div className={`w-12 h-12 ${topic.color} rounded-lg mb-3 flex items-center justify-center opacity-50`}>
                    <span className="text-2xl text-white">{topic.icon}</span>
                </div>
                <h3 className="text-lg font-bold text-gray-500">{topic.title}</h3>
                <p className="text-gray-400 mt-1">Chuyên đề chuyên sâu sắp được cập nhật.</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      {!user && (
        <section className="bg-primary-600 text-white py-16 px-4">
          <div className="container mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Sẵn sàng bắt đầu chưa?
            </h2>
            <p className="text-xl mb-8 text-primary-100">
              Tham gia cùng hàng ngàn học viên đang học Hóa học hiệu quả
            </p>
            <Link to="/register">
              <Button className="bg-white text-primary-600 hover:bg-gray-100 text-lg px-8 py-3">
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
