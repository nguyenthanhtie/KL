import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Button from '../components/ui/Button';
import { Trophy, Lock, Clock, Award, CheckCircle2 } from 'lucide-react';
import api from '../config/api';

const AdvancedChallenge = () => {
  const [selectedChallenge, setSelectedChallenge] = useState(null);
  const [challenges, setChallenges] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState('all');

  // Danh mục thử thách
  const categories = [
    { id: 'all', name: 'Tất cả' },
    { id: 'molecule', name: 'Phân tử' },
    { id: 'experiment', name: 'Thí nghiệm' },
    { id: 'electrochemistry', name: 'Điện hóa' },
    { id: 'solution', name: 'Dung dịch' },
    { id: 'reaction', name: 'Phản ứng' },
    { id: 'structure', name: 'Cấu tạo' },
    { id: 'game', name: 'Trò chơi' }
  ];

  // Mức độ
  const difficulties = [
    { id: 'all', name: 'Tất cả', color: 'bg-gray-500' },
    { id: 'easy', name: 'Dễ', color: 'bg-green-500' },
    { id: 'medium', name: 'Vừa', color: 'bg-yellow-500' },
    { id: 'hard', name: 'Khó', color: 'bg-red-500' }
  ];

  useEffect(() => {
    const fetchChallenges = async () => {
      try {
        setLoading(true);
        const response = await api.get('/challenges');
        setChallenges(response.data);
        setError(null);
      } catch (error) {
        console.error('Error fetching challenges:', error);
        setError('Không thể tải dữ liệu thử thách. Vui lòng thử lại sau.');
      } finally {
        setLoading(false);
      }
    };

    fetchChallenges();
  }, []);

  // Lọc thử thách
  const filteredChallenges = challenges.filter(challenge => {
    const categoryMatch = selectedCategory === 'all' || challenge.category === selectedCategory;
    const difficultyMatch = selectedDifficulty === 'all' || challenge.difficultyLevel === selectedDifficulty;
    return categoryMatch && difficultyMatch;
  });

  const getDifficultyBadge = (difficulty, color) => {
    return (
      <span className={`${color} text-white text-xs font-bold px-3 py-1 rounded-full`}>
        {difficulty}
      </span>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <div className="relative border-b border-gray-200 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-[url('src/assets/images/bannerchallenge.jpg')] bg-cover bg-center"></div>
        <div className="absolute inset-0 bg-white/40"></div>
        
        {/* Content */}
        <div className="container mx-auto max-w-7xl px-4 py-12 relative z-10">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-white/90 backdrop-blur-sm rounded-full mb-4 shadow-2xl border-2 border-gray-200">
              <Trophy className="w-10 h-10 text-yellow-500" />
            </div>
            <h1 className="text-5xl font-bold text-gray-800 mb-3 drop-shadow-sm">
              Thử Thách Nâng Cao
            </h1>
            <p className="text-xl text-gray-700 max-w-2xl mx-auto">
              Kiểm tra và nâng cao kỹ năng Hóa học của bạn qua các thử thách đa dạng và thú vị!
            </p>
          </div>
        </div>
      </div>

      {/* Main Content Container */}
      <div className="container mx-auto max-w-7xl">
        {/* Loading State */}
        {loading && (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
            <p className="mt-4 text-gray-600">Đang tải thử thách...</p>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg m-4">
            {error}
          </div>
        )}

        {/* Content */}
        {!loading && !error && (
          <div className="flex gap-0">
            {/* Sidebar Filter */}
            <div className="w-64 flex-shrink-0 bg-white border-r border-gray-200">
              <div className="p-5 sticky top-0">
                {/* Category Filter */}
                <div className="mb-6">
                  <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-3">
                    Phân loại
                  </h3>
                  <div className="space-y-1">
                    {categories.map((category) => (
                      <button
                        key={category.id}
                        onClick={() => setSelectedCategory(category.id)}
                        className={`w-full text-left px-3 py-2 rounded-lg font-medium transition-all duration-200 flex items-center justify-between ${
                          selectedCategory === category.id
                            ? 'bg-primary-600 text-white shadow-sm'
                            : 'text-gray-700 hover:bg-gray-100'
                        }`}
                      >
                        <span className="text-sm">{category.name}</span>
                        {selectedCategory === category.id && (
                          <span className="bg-white bg-opacity-25 px-2 py-0.5 rounded text-xs font-semibold">
                            {filteredChallenges.length}
                          </span>
                        )}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Difficulty Filter */}
                <div className="mb-6">
                  <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-3">
                    Mức độ
                  </h3>
                  <div className="space-y-1">
                    {difficulties.map((difficulty) => (
                      <button
                        key={difficulty.id}
                        onClick={() => setSelectedDifficulty(difficulty.id)}
                        className={`w-full text-left px-3 py-2 rounded-lg font-medium transition-all duration-200 flex items-center justify-between ${
                          selectedDifficulty === difficulty.id
                            ? `${difficulty.color} text-white shadow-sm`
                            : 'text-gray-700 hover:bg-gray-100'
                        }`}
                      >
                        <span className="text-sm">{difficulty.name}</span>
                        {selectedDifficulty === difficulty.id && (
                          <span className="bg-white bg-opacity-25 px-2 py-0.5 rounded text-xs font-semibold">
                            {filteredChallenges.length}
                          </span>
                        )}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Active Filters */}
                {(selectedCategory !== 'all' || selectedDifficulty !== 'all') && (
                  <div className="pt-4 border-t border-gray-200">
                    <button
                      onClick={() => {
                        setSelectedCategory('all');
                        setSelectedDifficulty('all');
                      }}
                      className="w-full text-sm text-primary-600 hover:text-primary-800 font-medium py-2 hover:bg-primary-50 rounded-lg transition-colors"
                    >
                      Xóa tất cả bộ lọc
                    </button>
                  </div>
                )}

                {/* Stats */}
                <div className="mt-6 pt-6 border-t border-gray-200 space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Thử thách</span>
                    <span className="font-bold text-primary-600">{filteredChallenges.length}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Hoàn thành</span>
                    <span className="font-bold text-green-600">0</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Điểm cao</span>
                    <span className="font-bold text-yellow-600">0</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 p-6">
              {/* Challenges Grid */}
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {filteredChallenges.length === 0 ? (
                <div className="col-span-full text-center py-12">
                  <div className="text-6xl mb-4">🔍</div>
                  <h3 className="text-2xl font-bold text-gray-700 mb-2">
                    Không tìm thấy thử thách
                  </h3>
                  <p className="text-gray-500 mb-4">
                    Không có thử thách nào phù hợp với bộ lọc đã chọn
                  </p>
                  <button
                    onClick={() => {
                      setSelectedCategory('all');
                      setSelectedDifficulty('all');
                    }}
                    className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-2 rounded-lg font-semibold transition-colors"
                  >
                    Xóa bộ lọc
                  </button>
                </div>
              ) : (
                filteredChallenges.map((challenge) => (
                  <div
                    key={challenge.id}
                    className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group cursor-pointer"
                    onClick={() => setSelectedChallenge(challenge)}
                  >
                    {/* Card Header */}
                    <div className="bg-gradient-to-r from-primary-500 to-primary-700 p-6 text-white relative">
                      <div className="absolute top-2 right-2">
                        {challenge.status === 'coming-soon' && (
                          <Lock className="w-5 h-5 opacity-75" />
                        )}
                      </div>
                      <div className="text-5xl mb-3">{challenge.icon}</div>
                      <h3 className="text-xl font-bold mb-2">{challenge.name}</h3>
                      {getDifficultyBadge(challenge.difficulty, challenge.difficultyColor)}
                    </div>

                    {/* Card Body */}
                    <div className="p-6">
                      <p className="text-gray-600 mb-4 h-20">
                        {challenge.description}
                      </p>

                      {/* Info Grid */}
                      <div className="grid grid-cols-2 gap-3 mb-4">
                        <div className="flex items-center text-sm text-gray-500">
                          <Clock className="w-4 h-4 mr-2" />
                          {challenge.time}
                        </div>
                        <div className="flex items-center text-sm text-gray-500">
                          <Award className="w-4 h-4 mr-2" />
                          {challenge.points} điểm
                        </div>
                      </div>

                      {/* Features */}
                      <div className="space-y-2 mb-4">
                        {challenge.features.map((feature, idx) => (
                          <div key={idx} className="flex items-center text-sm text-gray-600">
                            <CheckCircle2 className="w-3.5 h-3.5 mr-2 flex-shrink-0 text-gray-400" />
                            {feature}
                          </div>
                        ))}
                      </div>

                      {/* Action Button */}
                      {challenge.status === 'coming-soon' ? (
                        <button
                          disabled
                          className="w-full bg-gray-300 text-gray-500 py-2 px-4 rounded-lg font-semibold cursor-not-allowed"
                        >
                          Sắp ra mắt
                        </button>
                      ) : challenge.link ? (
                        <Link to={challenge.link} className="block">
                          <button className="w-full bg-primary-600 hover:bg-primary-700 text-white py-2 px-4 rounded-lg font-semibold transition-colors">
                            Bắt đầu thử thách
                          </button>
                        </Link>
                      ) : (
                        <button className="w-full bg-primary-600 hover:bg-primary-700 text-white py-2 px-4 rounded-lg font-semibold transition-colors">
                          Bắt đầu thử thách
                        </button>
                      )}
                    </div>
                  </div>
                ))
              )}
              </div>

              {/* Back Button */}
              <div className="text-center mt-8">
                <Link to="/">
                  <Button variant="secondary" className="px-8 py-3">
                    ← Quay về trang chủ
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Challenge Detail Modal (Optional - for future) */}
      {selectedChallenge && (
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
            onClick={() => setSelectedChallenge(null)}
          >
            <div 
              className="bg-white rounded-xl max-w-2xl w-full p-8 max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-start justify-between mb-6">
                <div>
                  <div className="text-5xl mb-3">{selectedChallenge.icon}</div>
                  <h2 className="text-3xl font-bold text-gray-800 mb-2">
                    {selectedChallenge.name}
                  </h2>
                  {getDifficultyBadge(selectedChallenge.difficulty, selectedChallenge.difficultyColor)}
                </div>
                <button 
                  onClick={() => setSelectedChallenge(null)}
                  className="text-gray-500 hover:text-gray-700 text-2xl"
                >
                  ×
                </button>
              </div>
              
              <p className="text-gray-600 mb-6">{selectedChallenge.description}</p>
              
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="text-sm text-gray-500 mb-1">Thời gian</div>
                  <div className="font-bold text-lg">{selectedChallenge.time}</div>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="text-sm text-gray-500 mb-1">Điểm thưởng</div>
                  <div className="font-bold text-lg text-yellow-600">{selectedChallenge.points} điểm</div>
                </div>
              </div>

              <div className="mb-6">
                <h3 className="font-bold text-lg mb-3">Tính năng nổi bật:</h3>
                <ul className="space-y-2">
                  {selectedChallenge.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center text-gray-700">
                      <CheckCircle2 className="w-4 h-4 mr-2 text-gray-400" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex gap-3">
                {selectedChallenge.status === 'coming-soon' ? (
                  <button
                    disabled
                    className="flex-1 bg-gray-300 text-gray-500 py-3 px-6 rounded-lg font-semibold cursor-not-allowed"
                  >
                    Sắp ra mắt
                  </button>
                ) : (
                  <button className="flex-1 bg-primary-600 hover:bg-primary-700 text-white py-3 px-6 rounded-lg font-semibold transition-colors">
                    Bắt đầu ngay
                  </button>
                )}
                <button 
                  onClick={() => setSelectedChallenge(null)}
                  className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Đóng
                </button>
              </div>
            </div>
          </div>
        )}
    </div>
  );
};

export default AdvancedChallenge;
