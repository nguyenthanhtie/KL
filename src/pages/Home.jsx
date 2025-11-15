import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import Button from '../components/ui/Button';

const Home = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleProgramSelect = (program) => {
    if (user) {
      if (program === 'chemistry') {
        navigate('/placement-test');
      } else {
        alert('Chương trình học Vật lý sắp ra mắt!');
      }
    } else {
      navigate('/login');
    }
  };

  // Check if user has selected a program (has grade)
  const hasSelectedProgram = user?.profile?.grade;

  // If user has selected program, show program info
  if (hasSelectedProgram) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
        {/* Hero Section */}
        <section className="py-16 px-4 text-center bg-gradient-to-r from-blue-500 to-indigo-600 text-white">
          <div className="container mx-auto">
            <div className="flex justify-center mb-6">
              <div className="w-32 h-32 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-7xl">
                🧪
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Chương trình Hóa học THCS
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 mb-8">
              Lớp {user.profile.grade} - Hành trình khám phá thế giới hóa học
            </p>
            <div className="flex justify-center gap-4">
              <Button
                onClick={() => navigate('/dashboard')}
                className="bg-white text-blue-600 hover:bg-blue-50 px-8 py-3 rounded-xl font-semibold shadow-lg transform hover:scale-105 transition-all"
              >
                Vào học ngay
              </Button>
              <Button
                onClick={() => navigate('/profile')}
                className="bg-blue-700 hover:bg-blue-800 text-white px-8 py-3 rounded-xl font-semibold shadow-lg transform hover:scale-105 transition-all"
              >
                Xem hồ sơ
              </Button>
            </div>
          </div>
        </section>

        {/* Program Details */}
        <section className="container mx-auto px-4 py-16">
          <div className="max-w-6xl mx-auto">
            {/* Overview */}
            <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
              <h2 className="text-3xl font-bold text-gray-800 mb-6 flex items-center gap-3">
                <span className="text-4xl">📚</span>
                Về chương trình
              </h2>
              <p className="text-lg text-gray-700 leading-relaxed mb-4">
                Chương trình Hóa học THCS được thiết kế để giúp học sinh từ lớp 8 đến lớp 12 
                nắm vững kiến thức nền tảng và phát triển tư duy khoa học. Thông qua các bài học 
                tương tác, thí nghiệm ảo và bài tập thực hành, học sinh sẽ khám phá thế giới 
                hấp dẫn của hóa học một cách sinh động và hiệu quả.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                Chương trình được xây dựng theo chuẩn kiến thức kỹ năng của Bộ Giáo dục và Đào tạo,
                phù hợp với từng cấp độ học sinh, giúp các em tự tin chinh phục mọi kỳ thi.
              </p>
            </div>

            {/* Features Grid */}
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-xl p-6 shadow-lg">
                <div className="text-5xl mb-4">🎯</div>
                <h3 className="text-xl font-bold mb-2">Học theo cấp độ</h3>
                <p className="text-blue-100">
                  Nội dung được phân chia theo từng lớp học, từ cơ bản đến nâng cao
                </p>
              </div>

              <div className="bg-gradient-to-br from-purple-500 to-purple-600 text-white rounded-xl p-6 shadow-lg">
                <div className="text-5xl mb-4">🔬</div>
                <h3 className="text-xl font-bold mb-2">Thực hành tương tác</h3>
                <p className="text-purple-100">
                  Thí nghiệm ảo và bài tập thực hành giúp học sinh trải nghiệm thực tế
                </p>
              </div>

              <div className="bg-gradient-to-br from-green-500 to-green-600 text-white rounded-xl p-6 shadow-lg">
                <div className="text-5xl mb-4">⭐</div>
                <h3 className="text-xl font-bold mb-2">Theo dõi tiến độ</h3>
                <p className="text-green-100">
                  Hệ thống đánh giá và thống kê tiến độ học tập chi tiết
                </p>
              </div>
            </div>

            {/* Curriculum by Grade */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-3xl font-bold text-gray-800 mb-6 flex items-center gap-3">
                <span className="text-4xl">📖</span>
                Nội dung chương trình
              </h2>
              
              <div className="space-y-4">
                {[
                  { grade: 8, topics: ['Chất - Nguyên tử - Phân tử', 'Phản ứng hóa học', 'Mol và tính toán', 'Oxi - Không khí', 'Hiđro - Nước'], chapters: 7, lessons: 28 },
                  { grade: 9, topics: ['Phi kim', 'Kim loại', 'Hợp chất hữu cơ', 'Hóa học và cuộc sống'], chapters: 6, lessons: 24 },
                  { grade: 10, topics: ['Nguyên tử', 'Bảng tuần hoàn', 'Liên kết hóa học', 'Phản ứng oxi hóa khử'], chapters: 8, lessons: 32 },
                  { grade: 11, topics: ['Sự điện li', 'Nhóm Halogen', 'Nhóm Oxi', 'Tốc độ phản ứng', 'Nitơ - Photpho'], chapters: 7, lessons: 30 },
                  { grade: 12, topics: ['Este - Lipit', 'Cacbohiđrat', 'Amin - Amino axit', 'Polime', 'Kim loại', 'Hóa học hữu cơ tổng hợp'], chapters: 9, lessons: 36 }
                ].map(({ grade, topics, chapters, lessons }) => (
                  <div 
                    key={grade}
                    className={`border-2 rounded-xl p-6 transition-all ${
                      user.profile.grade === grade 
                        ? 'border-blue-500 bg-blue-50' 
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                        Lớp {grade}
                        {user.profile.grade === grade && (
                          <span className="bg-blue-500 text-white text-sm px-3 py-1 rounded-full">
                            Đang học
                          </span>
                        )}
                      </h3>
                      <div className="text-sm text-gray-600">
                        {chapters} chương • {lessons} bài học
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {topics.map((topic, idx) => (
                        <span 
                          key={idx}
                          className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm"
                        >
                          {topic}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }

  // Default view for users without selected program
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <section className="py-20 px-4 text-center">
        <h1 className="text-5xl md:text-6xl font-bold text-gray-800 mb-4">
          Chọn chương trình học của bạn
        </h1>
        <p className="text-xl md:text-2xl text-gray-600 mb-12">
          Bắt đầu hành trình chinh phục kiến thức với các môn học yêu thích.
        </p>
      </section>

      {/* Program Selection Section */}
      <section className="container mx-auto px-4 pb-20">
        <div className="grid md:grid-cols-2 gap-10 max-w-4xl mx-auto">
          {/* Chemistry Program */}
          <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-shadow duration-300 overflow-hidden group">
            <div className="p-8">
              <div className="flex justify-center mb-6">
                <div className="w-24 h-24 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-full flex items-center justify-center text-white text-4xl transform group-hover:scale-110 transition-transform duration-300">
                  🧪
                </div>
              </div>
              <h3 className="text-3xl font-bold text-center mb-4 text-gray-800">
                Hóa học
              </h3>
              <p className="text-gray-600 text-center mb-8 h-24">
                Khám phá thế giới của các nguyên tố, phản ứng và các hợp chất hóa học qua các bài học tương tác và thí nghiệm ảo.
              </p>
              <Button
                onClick={() => handleProgramSelect('chemistry')}
                className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white py-3 px-6 rounded-xl font-semibold shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105"
              >
                Chọn chương trình Hóa học
              </Button>
            </div>
          </div>

          {/* Physics Program */}
          <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-shadow duration-300 overflow-hidden group">
            <div className="p-8">
              <div className="flex justify-center mb-6">
                <div className="w-24 h-24 bg-gradient-to-br from-green-400 to-teal-500 rounded-full flex items-center justify-center text-white text-4xl transform group-hover:scale-110 transition-transform duration-300">
                  ⚛️
                </div>
              </div>
              <h3 className="text-3xl font-bold text-center mb-4 text-gray-800">
                Vật lý
              </h3>
              <p className="text-gray-600 text-center mb-8 h-24">
                Tìm hiểu về các định luật cơ bản của vũ trụ, từ chuyển động, năng lượng cho đến các hiện tượng điện từ và quang học.
              </p>
              <Button
                onClick={() => handleProgramSelect('physics')}
                className="w-full bg-gradient-to-r from-gray-400 to-gray-500 text-white py-3 px-6 rounded-xl font-semibold shadow-md cursor-not-allowed"
                disabled
              >
                Sắp ra mắt
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA for login/register if not logged in */}
      {!user && (
        <section className="bg-gray-100 py-16">
          <div className="container mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4 text-gray-800">
              Bạn chưa đăng nhập?
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              Hãy đăng nhập hoặc tạo tài khoản để lưu lại tiến trình học tập của bạn.
            </p>
            <div className="flex justify-center gap-4">
              <Link to="/login">
                <Button className="bg-blue-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-600 transition-colors">
                  Đăng nhập
                </Button>
              </Link>
              <Link to="/register">
                <Button variant="secondary" className="bg-white text-blue-500 border border-blue-500 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors">
                  Đăng ký
                </Button>
              </Link>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default Home;
