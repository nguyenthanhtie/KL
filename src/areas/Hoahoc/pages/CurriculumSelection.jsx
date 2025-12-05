import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../../../contexts/AuthContext';
import { API_BASE_URL } from '../../../config/api';
import Button from '../../../components/ui/Button';
import Card from '../../../components/ui/Card';

const CurriculumSelection = () => {
  const { user, setUser } = useAuth();
  const navigate = useNavigate();
  const { programId } = useParams(); // Đổi từ classId sang programId
  const [selectedCurriculum, setSelectedCurriculum] = useState(null);
  const [loading, setLoading] = useState(false);

  // Map programId to program name
  const programNames = {
    chemistry: 'Hóa học',
    physics: 'Vật lý',
    biology: 'Sinh học',
    math: 'Toán học'
  };

  const curriculums = [
    {
      id: 'ketnoi',
      name: 'Kết nối tri thức',
      shortName: 'Kết nối tri thức với cuộc sống',
      icon: '🔗',
      description: 'Chương trình Kết nối tri thức với cuộc sống - Tích hợp kiến thức với thực tế, phát triển năng lực và phẩm chất người học.',
      gradient: 'from-blue-500 to-cyan-600',
      hoverGradient: 'from-blue-600 to-cyan-700',
      color: 'blue',
      features: [
        'Tích hợp liên môn',
        'Gắn liền thực tế',
        'Phát triển năng lực',
        'Học qua dự án'
      ],
      publisher: 'NXB Giáo dục Việt Nam',
      year: '2022'
    },
    {
      id: 'canhdieu',
      name: 'Cánh diều',
      shortName: 'Cánh diều',
      icon: '🪁',
      description: 'Chương trình Cánh diều - Khuyến khích sáng tạo, tư duy phản biện và học tập chủ động.',
      gradient: 'from-orange-500 to-red-600',
      hoverGradient: 'from-orange-600 to-red-700',
      color: 'orange',
      features: [
        'Học chủ động',
        'Tư duy phản biện',
        'Sáng tạo',
        'Hợp tác nhóm'
      ],
      publisher: 'NXB Đại học Sư phạm',
      year: '2022'
    },
    {
      id: 'chantroicangtao',
      name: 'Chân trời sáng tạo',
      shortName: 'Chân trời sáng tạo',
      icon: '🌅',
      description: 'Chương trình Chân trời sáng tạo - Phát triển tư duy sáng tạo, giải quyết vấn đề và tinh thần khởi nghiệp.',
      gradient: 'from-purple-500 to-pink-600',
      hoverGradient: 'from-purple-600 to-pink-700',
      color: 'purple',
      features: [
        'Tư duy sáng tạo',
        'Giải quyết vấn đề',
        'Khởi nghiệp',
        'Công nghệ số'
      ],
      publisher: 'NXB Giáo dục Việt Nam',
      year: '2022'
    }
  ];

  useEffect(() => {
    // Không cần kiểm tra đã chọn curriculum hay chưa
    // vì đây là bước đầu tiên trước placement test
  }, []);

  const handleSelectCurriculum = async (curriculum) => {
    setSelectedCurriculum(curriculum);
    setLoading(true);

    try {
      const userUid = user?.firebaseUid || user?.uid || user?.email;
      if (!userUid) {
        throw new Error('Vui lòng đăng nhập để tiếp tục');
      }

      // Lưu lựa chọn curriculum vào localStorage tạm thời
      // sẽ được lưu vào database sau khi hoàn thành placement test
      localStorage.setItem('selectedCurriculum', JSON.stringify({
        programId: programId,
        curriculumType: curriculum.id,
        curriculumName: curriculum.name
      }));

      // Chuyển đến trang placement test ngay lập tức
      navigate(`/placement-test/${programId}`);
      
    } catch (error) {
      console.error('Error selecting curriculum:', error);
      alert(`❌ Có lỗi xảy ra: ${error.message}`);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      {/* Compact Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-6xl mx-auto text-center">
            <div className="flex items-center justify-center gap-4 mb-3">
              <span className="text-5xl">📚</span>
              <h1 className="text-4xl font-bold text-gray-800">
                Chọn Chương Trình Học
              </h1>
            </div>
            {programId && (
              <p className="text-gray-600 flex items-center justify-center gap-2 text-lg">
                <span className="font-semibold text-blue-600">{programNames[programId]}</span>
                <span className="text-gray-400">•</span>
                <span>Chọn sách giáo khoa phù hợp với bạn</span>
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-10">
        <div className="max-w-6xl mx-auto">
          
          {/* Compact Info Banner */}
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-2xl p-5 mb-8 shadow-lg">
            <div className="flex items-center gap-4">
              <div className="bg-white/20 rounded-full p-3 backdrop-blur-sm">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
              </div>
              <p className="text-base">
                Chọn chương trình phù hợp với sách bạn đang học. Bạn có thể thay đổi sau trong Cài đặt.
              </p>
            </div>
          </div>

          {/* Curriculum Grid - Compact Design */}
          <div className="grid md:grid-cols-3 gap-5 mb-8">
            {curriculums.map((curriculum) => (
              <div
                key={curriculum.id}
                onClick={() => !loading && handleSelectCurriculum(curriculum)}
                className={`relative bg-white rounded-2xl p-6 cursor-pointer transition-all duration-300 border-2 ${
                  loading
                    ? 'opacity-50 cursor-not-allowed'
                    : 'border-gray-200 hover:border-blue-400 hover:shadow-xl hover:scale-[1.02]'
                }`}
              >
                {/* Selection Indicator */}
                {selectedCurriculum?.id === curriculum.id && (
                  <div className="absolute top-3 right-3">
                    <div className="bg-blue-500 text-white rounded-full p-1">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </div>
                )}

                {/* Header with Icon and Title */}
                <div className="flex items-start gap-4 mb-4">
                  <div className={`w-16 h-16 bg-gradient-to-br ${curriculum.gradient} rounded-xl flex items-center justify-center text-4xl shadow-md flex-shrink-0`}>
                    {curriculum.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-2xl font-bold text-gray-800 mb-1 truncate">
                      {curriculum.name}
                    </h3>
                    <p className="text-sm text-gray-500">{curriculum.publisher} • {curriculum.year}</p>
                  </div>
                </div>

                {/* Description */}
                <p className="text-base text-gray-600 mb-4 line-clamp-2">
                  {curriculum.description}
                </p>

                {/* Features - Compact */}
                <div className="flex flex-wrap gap-2">
                  {curriculum.features.map((feature, idx) => (
                    <span
                      key={idx}
                      className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-sm font-medium ${
                        selectedCurriculum?.id === curriculum.id
                          ? 'bg-blue-100 text-blue-700'
                          : 'bg-gray-100 text-gray-600'
                      }`}
                    >
                      <span className="text-green-500">✓</span>
                      {feature}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Action Section */}
          <div className="bg-white rounded-2xl shadow-lg p-7">
            <div className="flex items-center justify-between gap-4">
              <div className="text-center sm:text-left">
                {loading ? (
                  <div className="flex items-center gap-3 text-gray-600">
                    <span className="animate-spin text-2xl">⏳</span>
                    <span className="font-medium text-lg">Đang chuyển trang...</span>
                  </div>
                ) : (
                  <p className="text-gray-500 text-lg">Nhấn vào một chương trình để bắt đầu</p>
                )}
              </div>
              
              <Button
                onClick={() => navigate(-1)}
                className="px-8 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl font-medium text-base transition-colors"
              >
                ← Quay lại
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CurriculumSelection;
