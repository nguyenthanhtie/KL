import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Button from '../components/ui/Button';
import { Trophy, Star, Lock, Clock, Target } from 'lucide-react';
import api from '../config/api';

const AdvancedChallenge = () => {
  const [selectedChallenge, setSelectedChallenge] = useState(null);
  const [challenges, setChallenges] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  const getDifficultyBadge = (difficulty, color) => {
    return (
      <span className={`${color} text-white text-xs font-bold px-3 py-1 rounded-full`}>
        {difficulty}
      </span>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full mb-6 shadow-lg">
            <Trophy className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-5xl font-bold text-gray-800 mb-4">
            Thử Thách Nâng Cao
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Kiểm tra và nâng cao kỹ năng Hóa học của bạn qua các thử thách đa dạng và thú vị!
          </p>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
            <p className="mt-4 text-gray-600">Đang tải thử thách...</p>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-8">
            {error}
          </div>
        )}

        {/* Content */}
        {!loading && !error && (
          <>
            {/* Stats Bar */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-12">
              <div className="bg-white rounded-lg p-6 shadow-md text-center">
                <div className="text-3xl font-bold text-primary-600">{challenges.length}</div>
                <div className="text-gray-600 mt-1">Thử thách</div>
              </div>
              <div className="bg-white rounded-lg p-6 shadow-md text-center">
                <div className="text-3xl font-bold text-green-600">0</div>
                <div className="text-gray-600 mt-1">Đã hoàn thành</div>
              </div>
              <div className="bg-white rounded-lg p-6 shadow-md text-center">
                <div className="text-3xl font-bold text-yellow-600">0</div>
                <div className="text-gray-600 mt-1">Điểm cao nhất</div>
              </div>
              <div className="bg-white rounded-lg p-6 shadow-md text-center">
                <div className="text-3xl font-bold text-purple-600">-</div>
                <div className="text-gray-600 mt-1">Xếp hạng</div>
              </div>
            </div>

            {/* Challenges Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {challenges.map((challenge) => (
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
                        <Star className="w-4 h-4 mr-2 text-yellow-500" />
                        {challenge.points} điểm
                      </div>
                    </div>

                    {/* Features */}
                    <div className="space-y-2 mb-4">
                      {challenge.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center text-sm text-gray-600">
                          <Target className="w-3 h-3 mr-2 text-green-500" />
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
              ))}
            </div>

            {/* Back Button */}
            <div className="text-center">
              <Link to="/">
                <Button variant="secondary" className="px-8 py-3">
                  ← Quay về trang chủ
                </Button>
              </Link>
            </div>
          </>
        )}

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
                      <Target className="w-4 h-4 mr-2 text-green-500" />
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
    </div>
  );
};

export default AdvancedChallenge;
