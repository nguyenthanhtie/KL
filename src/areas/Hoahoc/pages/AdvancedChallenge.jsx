import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Button from '../../../components/ui/Button';
import Card from '../../../components/ui/Card';
import ProgressBar from '../../../components/ui/ProgressBar';
import { Trophy, Lock, Clock, Award, CheckCircle2 } from 'lucide-react';
import api from '../../../config/api';
import { useAuth } from '../../../contexts/AuthContext';

const AdvancedChallenge = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [selectedChallenge, setSelectedChallenge] = useState(null);
  const [challenges, setChallenges] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedGrade, setSelectedGrade] = useState(8);

  // Grade configuration - similar to Dashboard
  const gradeInfo = {
    8: { title: 'Hóa học 8', color: 'from-blue-500 to-blue-600', icon: '🧪', description: 'Các thử thách cơ bản về chất, nguyên tử, phản ứng hóa học' },
    9: { title: 'Hóa học 9', color: 'from-green-500 to-green-600', icon: '⚗️', description: 'Thử thách về kim loại, phi kim, hữu cơ cơ bản' },
    10: { title: 'Hóa học 10', color: 'from-purple-500 to-purple-600', icon: '🔬', description: 'Cấu tạo nguyên tử, bảng tuần hoàn, liên kết hóa học' },
    11: { title: 'Hóa học 11', color: 'from-orange-500 to-orange-600', icon: '⚛️', description: 'Điện ly, nitơ-photpho, cacbon-silic, hữu cơ' },
    12: { title: 'Hóa học 12', color: 'from-pink-500 to-pink-600', icon: '🎓', description: 'Este, amin, polime, kim loại kiềm, kiềm thổ' }
  };

  const grades = [8, 9, 10, 11, 12];

  useEffect(() => {
    // Set default grade from user's current class
    if (user) {
      const chemistryProgram = user.programs?.find(p => p.programId === 'chemistry');
      if (chemistryProgram && chemistryProgram.currentClass) {
        setSelectedGrade(chemistryProgram.currentClass);
      } else if (user.profile?.grade) {
        setSelectedGrade(user.profile.grade);
      }
    }
  }, [user]);

  useEffect(() => {
    const fetchChallenges = async () => {
      try {
        setLoading(true);
        console.log('🔍 Fetching challenges for user:', user);
        // If user is logged in, fetch challenges with unlock status
        const userId = user?._id || user?.id;
        if (user && userId) {
          console.log('✅ User logged in, fetching with unlock status:', userId);
          const response = await api.get(`/challenges/user/${userId}`);
          console.log('📊 Challenges received:', response.data);
          setChallenges(response.data);
        } else {
          console.log('⚠️ No user, fetching all challenges as locked');
          const response = await api.get('/challenges');
          setChallenges(response.data.map(c => ({ ...c, isUnlocked: false })));
        }
        setError(null);
      } catch (error) {
        console.error('❌ Error fetching challenges:', error);
        setError('Không thể tải dữ liệu thử thách. Vui lòng thử lại sau.');
      } finally {
        setLoading(false);
      }
    };

    fetchChallenges();
  }, [user]);

  // Group challenges by grade
  const getChallengesByGrade = (grade) => {
    return challenges.filter(challenge => challenge.grade === grade);
  };

  // Get stats for a specific grade
  const getGradeStats = (grade) => {
    const gradeChallenges = getChallengesByGrade(grade);
    const total = gradeChallenges.length;
    const unlocked = gradeChallenges.filter(c => c.isUnlocked).length;
    const completed = gradeChallenges.filter(c => c.completed).length;
    return { total, unlocked, completed };
  };

  // Current grade challenges
  const currentGradeChallenges = getChallengesByGrade(selectedGrade);
  const currentGradeInfo = gradeInfo[selectedGrade];
  const currentStats = getGradeStats(selectedGrade);

  const getDifficultyBadge = (difficulty, color) => {
    return (
      <span className={`${color} text-white text-xs font-bold px-3 py-1 rounded-full`}>
        {difficulty}
      </span>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-8 px-4">
      <div className="container mx-auto max-w-7xl">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <button
              onClick={() => navigate('/program/chemistry/dashboard')}
              className="text-gray-600 hover:text-gray-800 flex items-center"
            >
              ← Quay lại Dashboard
            </button>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-xl flex items-center justify-center shadow-lg">
              <Trophy className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-1">
                Thử Thách Nâng Cao
              </h1>
              <p className="text-gray-600">Kiểm tra và nâng cao kỹ năng Hóa học của bạn!</p>
            </div>
          </div>
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
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
            {error}
          </div>
        )}

        {/* Content */}
        {!loading && !error && (
          <>
            {/* Grade Tabs */}
            <div className="flex flex-wrap gap-3 mb-6">
              {grades.map((grade) => {
                const info = gradeInfo[grade];
                const stats = getGradeStats(grade);
                const isSelected = selectedGrade === grade;
                
                return (
                  <button
                    key={grade}
                    onClick={() => setSelectedGrade(grade)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-xl font-semibold transition-all ${
                      isSelected
                        ? `bg-gradient-to-r ${info.color} text-white shadow-lg scale-105`
                        : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
                    }`}
                  >
                    <span className="text-xl">{info.icon}</span>
                    <span>Lớp {grade}</span>
                    {stats.total > 0 && (
                      <span className={`text-xs px-2 py-0.5 rounded-full ${
                        isSelected ? 'bg-white/20' : 'bg-gray-100'
                      }`}>
                        {stats.total}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Current Grade Section */}
            <Card className="overflow-hidden mb-6">
              {/* Grade Header */}
              <div className={`bg-gradient-to-r ${currentGradeInfo.color} text-white p-6 -m-6 mb-6`}>
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-4xl">{currentGradeInfo.icon}</span>
                      <div>
                        <h2 className="text-2xl font-bold">{currentGradeInfo.title} - Thử Thách</h2>
                        <p className="text-sm opacity-90">{currentGradeInfo.description}</p>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-bold">{currentStats.total}</div>
                    <div className="text-sm opacity-90">thử thách</div>
                  </div>
                </div>
                {currentStats.total > 0 && (
                  <div className="mt-4">
                    <div className="flex justify-between text-sm mb-1">
                      <span>{currentStats.unlocked} đã mở khóa</span>
                      <span>{Math.round((currentStats.unlocked / currentStats.total) * 100)}%</span>
                    </div>
                    <ProgressBar 
                      progress={(currentStats.unlocked / currentStats.total) * 100}
                      className="bg-white/20"
                      color="white"
                    />
                  </div>
                )}
              </div>

              {/* Challenges Grid */}
              {currentGradeChallenges.length === 0 ? (
                <div className="text-center py-12">
                  <div className="text-6xl mb-4">🔍</div>
                  <h3 className="text-2xl font-bold text-gray-700 mb-2">
                    Chưa có thử thách nào
                  </h3>
                  <p className="text-gray-500">
                    Các thử thách cho Lớp {selectedGrade} đang được chuẩn bị
                  </p>
                </div>
              ) : (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {currentGradeChallenges.map((challenge) => {
                    const isLocked = !challenge.isUnlocked && challenge.prerequisite?.classId;
                    
                    return (
                      <div
                        key={challenge.id}
                        className={`bg-white rounded-xl shadow-md border transition-all duration-300 overflow-hidden ${
                          isLocked 
                            ? 'opacity-75 cursor-not-allowed border-gray-200' 
                            : 'hover:shadow-xl cursor-pointer border-gray-100 hover:border-primary-200'
                        }`}
                        onClick={() => !isLocked && setSelectedChallenge(challenge)}
                      >
                        {/* Card Header */}
                        <div className={`p-4 ${isLocked ? 'bg-gray-100' : 'bg-gradient-to-r from-primary-50 to-purple-50'}`}>
                          <div className="flex items-start justify-between">
                            <div className="text-4xl mb-2">{challenge.icon}</div>
                            <div className="flex items-center gap-2">
                              {isLocked && <Lock className="w-4 h-4 text-gray-400" />}
                              {getDifficultyBadge(challenge.difficulty, challenge.difficultyColor)}
                            </div>
                          </div>
                          <h3 className="text-lg font-bold text-gray-800">{challenge.name}</h3>
                        </div>

                        {/* Card Body */}
                        <div className="p-4">
                          <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                            {challenge.description}
                          </p>

                          {/* Info */}
                          <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                            <div className="flex items-center gap-1">
                              <Clock className="w-4 h-4" />
                              {challenge.time}
                            </div>
                            <div className="flex items-center gap-1">
                              <Award className="w-4 h-4" />
                              {challenge.points} điểm
                            </div>
                          </div>

                          {/* Features Preview */}
                          {challenge.features && challenge.features.length > 0 && (
                            <div className="flex flex-wrap gap-1 mb-4">
                              {challenge.features.slice(0, 2).map((feature, idx) => (
                                <span key={idx} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                                  {feature.length > 20 ? feature.substring(0, 20) + '...' : feature}
                                </span>
                              ))}
                              {challenge.features.length > 2 && (
                                <span className="text-xs text-gray-400">+{challenge.features.length - 2}</span>
                              )}
                            </div>
                          )}

                          {/* Action Button */}
                          {isLocked ? (
                            <div>
                              <button
                                disabled
                                className="w-full bg-gray-200 text-gray-500 py-2 px-4 rounded-lg font-semibold cursor-not-allowed flex items-center justify-center gap-2"
                              >
                                <Lock className="w-4 h-4" />
                                Đã khóa
                              </button>
                              {challenge.prerequisiteInfo && (
                                <p className="text-xs text-gray-500 text-center mt-2">
                                  Hoàn thành bài {challenge.prerequisiteInfo.lessonId} lớp {challenge.prerequisiteInfo.classId}
                                </p>
                              )}
                            </div>
                          ) : challenge.status === 'coming-soon' ? (
                            <button
                              disabled
                              className="w-full bg-gray-200 text-gray-500 py-2 px-4 rounded-lg font-semibold cursor-not-allowed"
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
                    );
                  })}
                </div>
              )}
            </Card>

            {/* All Grades Overview */}
            <div className="mt-8">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Tổng quan các lớp</h3>
              <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-4">
                {grades.map((grade) => {
                  const info = gradeInfo[grade];
                  const stats = getGradeStats(grade);
                  const isSelected = selectedGrade === grade;
                  
                  return (
                    <div
                      key={grade}
                      onClick={() => setSelectedGrade(grade)}
                      className={`p-4 rounded-xl cursor-pointer transition-all ${
                        isSelected
                          ? `bg-gradient-to-r ${info.color} text-white shadow-lg`
                          : 'bg-white hover:shadow-md border border-gray-200'
                      }`}
                    >
                      <div className="text-center">
                        <span className="text-3xl">{info.icon}</span>
                        <h4 className={`font-bold mt-2 ${isSelected ? 'text-white' : 'text-gray-800'}`}>
                          Lớp {grade}
                        </h4>
                        <div className={`text-sm mt-1 ${isSelected ? 'text-white/80' : 'text-gray-500'}`}>
                          {stats.total} thử thách
                        </div>
                        {stats.total > 0 && (
                          <div className={`text-xs mt-2 ${isSelected ? 'text-white/70' : 'text-gray-400'}`}>
                            {stats.unlocked}/{stats.total} mở khóa
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Back Button */}
            <div className="text-center mt-8">
              <Link to="/">
                <Button variant="secondary" className="px-8 py-3">
                  ← Quay về trang chủ
                </Button>
              </Link>
            </div>
          </>
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

              {/* Lock info if challenge is locked */}
              {!selectedChallenge.isUnlocked && selectedChallenge.prerequisiteInfo && (
                <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <div className="flex items-start gap-3">
                    <Lock className="w-5 h-5 text-yellow-600 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-yellow-800 mb-1">Thử thách đã khóa</h4>
                      <p className="text-sm text-yellow-700">
                        Bạn cần hoàn thành <strong>Bài {selectedChallenge.prerequisiteInfo.lessonId} - Lớp {selectedChallenge.prerequisiteInfo.classId}</strong> để mở khóa thử thách này.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              <div className="flex gap-3">
                {!selectedChallenge.isUnlocked && selectedChallenge.prerequisite?.classId ? (
                  <button
                    disabled
                    className="flex-1 bg-gray-300 text-gray-500 py-3 px-6 rounded-lg font-semibold cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    <Lock className="w-4 h-4" />
                    Đã khóa
                  </button>
                ) : selectedChallenge.status === 'coming-soon' ? (
                  <button
                    disabled
                    className="flex-1 bg-gray-300 text-gray-500 py-3 px-6 rounded-lg font-semibold cursor-not-allowed"
                  >
                    Sắp ra mắt
                  </button>
                ) : selectedChallenge.link ? (
                  <Link to={selectedChallenge.link} className="flex-1">
                    <button className="w-full bg-primary-600 hover:bg-primary-700 text-white py-3 px-6 rounded-lg font-semibold transition-colors">
                      Bắt đầu ngay
                    </button>
                  </Link>
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
