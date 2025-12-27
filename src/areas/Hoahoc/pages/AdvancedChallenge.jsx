import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Button from '../../../components/ui/Button';
import ProgressBar from '../../../components/ui/ProgressBar';
import { Trophy, Lock, Clock, Award, CheckCircle2, Star, Sparkles, Loader2, Download, AlertCircle } from 'lucide-react';
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
  const [aiDataLoading, setAiDataLoading] = useState({}); // Track AI data loading/generating state per challenge
  const [aiDataReady, setAiDataReady] = useState({}); // Track which challenges have AI data ready
  const [generatingProgress, setGeneratingProgress] = useState({}); // Track generating progress message

  // Cache key prefix for localStorage (same as useAIQuestions hook)
  const AI_CACHE_KEY_PREFIX = 'ai_questions_';
  const CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 hours

  // Mapping từ challenge link slug sang AI lesson ID (defined early for use in checkLocalStorageCache)
  const SLUG_TO_AI_LESSON = {
    // Lớp 11
    'can-bang-phan-ung': 'can_bang_phan_ung_11',
    'nito-luu-huynh': 'nito_luu_huynh_11',
    'dai-cuong-hoa-huu-co': 'dai_cuong_hoa_huu_co_11',
    'hidrocacbon-11': 'hidrocacbon_11',
    'dan-xuat-halogen-ancol-phenol': 'dan_xuat_halogen_ancol_phenol_11',
    'hop-chat-carbonyl-carboxylic': 'hop_chat_carbonyl_carboxylic_11',
    'hoa-hoc-voi-cuoc-song': 'hoa_hoc_cuoc_song_11',
    'hoa-hoc-cuoc-song-11': 'hoa_hoc_cuoc_song_11',
    // Lớp 12
    'este-lipit': 'este_lipit_12',
    'cacbohidrat': 'cacbohidrat_12',
    'amin-aminoaxit-protein': 'amin_aminoaxit_protein_12',
    'polime': 'polime_12',
    'dai-cuong-kim-loai': 'dai_cuong_kim_loai_12',
    'dai-cuong-sat-dong-hop-kim': 'sat_dong_hop_kim_12',
    'sat-dong-hop-kim': 'sat_dong_hop_kim_12',
    'kim-loai-kiem-kiem-tho-nhom': 'kim_loai_kiem_kiem_tho_nhom_12',
  };

  // Helper function to get AI lesson ID from challenge
  const getAILessonId = (challenge) => {
    // If challenge has explicit aiLessonId, use it
    if (challenge.aiLessonId) return challenge.aiLessonId;
    
    // Extract slug from challenge link (e.g., '/advanced-challenge/nito-luu-huynh' -> 'nito-luu-huynh')
    if (challenge.link) {
      const slug = challenge.link.split('/').pop();
      if (SLUG_TO_AI_LESSON[slug]) {
        return SLUG_TO_AI_LESSON[slug];
      }
    }
    
    // Fallback: try to construct from challenge name
    if (challenge.slug) {
      return SLUG_TO_AI_LESSON[challenge.slug] || challenge.slug;
    }
    
    return null; // No valid AI lesson ID found
  };

  // Check if AI data exists in localStorage cache
  const checkLocalStorageCache = (aiLessonId) => {
    if (!aiLessonId) return false;
    
    try {
      const cached = localStorage.getItem(`${AI_CACHE_KEY_PREFIX}${aiLessonId}`);
      if (!cached) return false;
      
      const { data, timestamp } = JSON.parse(cached);
      
      // Check if cache is still valid (not expired)
      if (Date.now() - timestamp > CACHE_DURATION) {
        return false;
      }
      
      // Check if cache has questions
      if (data && data.questions && data.questions.length > 0) {
        return true;
      }
      
      return false;
    } catch {
      return false;
    }
  };

  // Check if a challenge has AI data ready (from state or localStorage)
  const hasAIDataForChallenge = (challenge) => {
    // First check state
    if (aiDataReady[challenge.id]) return true;
    if (challenge.hasAIData) return true;
    
    // Then check localStorage cache
    const aiLessonId = getAILessonId(challenge);
    return checkLocalStorageCache(aiLessonId);
  };

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
    const completed = gradeChallenges.filter(c => c.completed || c.stars > 0).length;
    const totalStars = gradeChallenges.reduce((sum, c) => sum + (c.stars || 0), 0);
    const maxStars = total * 3;
    return { total, unlocked, completed, totalStars, maxStars };
  };

  // Current grade challenges
  const currentGradeChallenges = getChallengesByGrade(selectedGrade);
  const currentGradeInfo = gradeInfo[selectedGrade];
  const currentStats = getGradeStats(selectedGrade);

  // Handle AI challenge click - check if data exists, if not generate it
  const handleAIChallengeStart = async (challenge) => {
    const usesAI = challenge.usesAI || challenge.dataSource === 'ai' || challenge.grade >= 11;
    const hasData = hasAIDataForChallenge(challenge);
    
    if (usesAI && !hasData) {
      // Need to generate AI data first
      setAiDataLoading(prev => ({ ...prev, [challenge.id]: true }));
      setGeneratingProgress(prev => ({ ...prev, [challenge.id]: 'Đang khởi tạo...' }));
      
      try {
        // Get the lesson/challenge ID for AI generation using mapping
        const aiLessonId = getAILessonId(challenge);
        
        if (!aiLessonId) {
          setGeneratingProgress(prev => ({ ...prev, [challenge.id]: 'Không tìm thấy cấu hình AI' }));
          setError('Thử thách này chưa được cấu hình cho AI. Vui lòng thử lại sau.');
          setAiDataLoading(prev => ({ ...prev, [challenge.id]: false }));
          return;
        }
        
        console.log(`🤖 Generating AI questions for: ${aiLessonId}`);
        setGeneratingProgress(prev => ({ ...prev, [challenge.id]: 'Đang tạo câu hỏi từ AI...' }));
        
        // Call API to generate AI questions
        const response = await api.get(`/ai-questions/generate/${aiLessonId}`, {
          timeout: 60000 // 60 seconds timeout for AI generation
        });
        
        if (response.data.success && response.data.questions?.length > 0) {
          setGeneratingProgress(prev => ({ ...prev, [challenge.id]: 'Hoàn tất!' }));
          setAiDataReady(prev => ({ ...prev, [challenge.id]: true }));
          
          // Wait a moment to show success, then navigate
          await new Promise(resolve => setTimeout(resolve, 500));
          
          if (challenge.link) {
            navigate(challenge.link);
          }
        } else if (response.data.aiUnavailable) {
          setGeneratingProgress(prev => ({ ...prev, [challenge.id]: 'AI tạm thời không khả dụng' }));
          setError('Dịch vụ AI tạm thời không khả dụng. Vui lòng thử lại sau.');
        } else {
          setGeneratingProgress(prev => ({ ...prev, [challenge.id]: 'Không thể tạo dữ liệu' }));
          setError('Không thể tạo dữ liệu câu hỏi. Vui lòng thử lại.');
        }
      } catch (error) {
        console.error('Error generating AI data:', error);
        setGeneratingProgress(prev => ({ ...prev, [challenge.id]: 'Lỗi khi tạo dữ liệu' }));
        setError('Không thể tạo dữ liệu AI. Vui lòng thử lại sau.');
      } finally {
        setAiDataLoading(prev => ({ ...prev, [challenge.id]: false }));
        // Clear progress after a delay
        setTimeout(() => {
          setGeneratingProgress(prev => ({ ...prev, [challenge.id]: null }));
        }, 3000);
      }
    } else if (usesAI && hasData) {
      // AI data already generated, can proceed
      if (challenge.link) {
        navigate(challenge.link);
      }
    } else {
      // Non-AI challenge, navigate directly
      if (challenge.link) {
        navigate(challenge.link);
      }
    }
  };

  const getDifficultyBadge = (difficulty, color) => {
    return (
      <span className={`${color} text-white text-xs font-bold px-3 py-1 rounded-full`}>
        {difficulty}
      </span>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-yellow-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute top-40 -left-40 w-96 h-96 bg-orange-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-40 left-1/2 w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative z-10 py-8 px-4">
        <div className="container mx-auto max-w-7xl">
          {/* Header Section */}
          <div className="mb-8">
            <button
              onClick={() => navigate('/program/chemistry')}
              className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-800 mb-4 px-4 py-2 bg-white/60 backdrop-blur-sm rounded-xl hover:bg-white/80 transition-all"
            >
              ← Quay lại trang chủ
            </button>
            <div className="bg-white/70 backdrop-blur-xl rounded-3xl p-6 shadow-xl border border-white/50">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-2xl flex items-center justify-center shadow-lg">
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
          </div>

          {/* Loading State */}
          {loading && (
            <div className="text-center py-12 bg-white/70 backdrop-blur-xl rounded-3xl shadow-xl">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
              <p className="mt-4 text-gray-600">Đang tải thử thách...</p>
            </div>
          )}

          {/* Error State */}
          {error && (
            <div className="bg-red-50/80 backdrop-blur-sm border border-red-200 text-red-700 px-4 py-3 rounded-2xl mb-6 flex items-center gap-3">
              <AlertCircle className="w-5 h-5" />
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
                      className={`flex items-center gap-2 px-5 py-3 rounded-2xl font-semibold transition-all duration-300 ${
                        isSelected
                          ? `bg-gradient-to-r ${info.color} text-white shadow-lg shadow-${info.color.split('-')[1]}-500/30 scale-105`
                          : 'bg-white/70 backdrop-blur-sm text-gray-700 hover:bg-white border border-white/50 hover:shadow-md'
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
              <div className="bg-white/70 backdrop-blur-xl rounded-3xl shadow-xl border border-white/50 overflow-hidden mb-6">
                {/* Grade Header */}
                <div className={`bg-gradient-to-r ${currentGradeInfo.color} text-white p-6`}>
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
                  <div className="mt-4 space-y-3">
                    {/* Progress bar */}
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>{currentStats.completed}/{currentStats.total} hoàn thành</span>
                        <span>{Math.round((currentStats.completed / currentStats.total) * 100)}%</span>
                      </div>
                      <ProgressBar 
                        progress={(currentStats.completed / currentStats.total) * 100}
                        className="bg-white/20"
                        color="white"
                      />
                    </div>
                    {/* Stars earned */}
                    <div className="flex items-center justify-between bg-white/10 rounded-lg px-3 py-2">
                      <div className="flex items-center gap-2">
                        <Star className="w-5 h-5 text-yellow-300 fill-yellow-300" />
                        <span className="text-sm font-medium">Sao đã đạt</span>
                      </div>
                      <span className="font-bold">{currentStats.totalStars}/{currentStats.maxStars}</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Challenges Grid */}
              {currentGradeChallenges.length === 0 ? (
                <div className="text-center py-12 px-6">
                  <div className="text-6xl mb-4">🔍</div>
                  <h3 className="text-2xl font-bold text-gray-700 mb-2">
                    Chưa có thử thách nào
                  </h3>
                  <p className="text-gray-500">
                    Các thử thách cho Lớp {selectedGrade} đang được chuẩn bị
                  </p>
                </div>
              ) : (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
                  {currentGradeChallenges.map((challenge) => {
                    const isLocked = !challenge.isUnlocked && challenge.prerequisite?.classId;
                    const isCompleted = challenge.completed || challenge.stars > 0;
                    const stars = challenge.stars || 0;
                    // Check if challenge uses AI (explicit flag or grade 11-12)
                    const usesAI = challenge.usesAI || challenge.dataSource === 'ai' || challenge.grade >= 11;
                    const isAiLoading = usesAI && aiDataLoading[challenge.id];
                    // Use the helper function to check localStorage cache
                    const hasAIData = hasAIDataForChallenge(challenge);
                    const needsDataGeneration = usesAI && !hasAIData && !isCompleted;
                    const progressMsg = generatingProgress[challenge.id];
                    
                    return (
                      <div
                        key={challenge.id}
                        className={`relative bg-white/90 backdrop-blur-sm rounded-2xl shadow-md border transition-all duration-300 overflow-hidden ${
                          isLocked 
                            ? 'opacity-75 cursor-not-allowed border-gray-200' 
                            : isAiLoading
                              ? 'cursor-wait border-purple-300 ring-2 ring-purple-200'
                              : needsDataGeneration
                                ? 'hover:shadow-xl cursor-pointer border-amber-300 hover:border-amber-400 hover:-translate-y-1'
                                : isCompleted
                                  ? 'hover:shadow-xl cursor-pointer border-green-300 ring-2 ring-green-100 hover:-translate-y-1'
                                  : 'hover:shadow-xl cursor-pointer border-gray-100 hover:border-primary-200 hover:-translate-y-1'
                        }`}
                        onClick={() => !isLocked && !isAiLoading && setSelectedChallenge(challenge)}
                      >
                        {/* AI Watermark Badge - Need to generate data */}
                        {needsDataGeneration && !isAiLoading && (
                          <div className="absolute top-2 left-2 z-10">
                            <div className="flex items-center gap-1 px-2 py-1 rounded-full text-xs font-semibold shadow-md bg-gradient-to-r from-amber-500 to-orange-500 text-white">
                              <Download className="w-3 h-3" />
                              <span>Cần tải dữ liệu</span>
                            </div>
                          </div>
                        )}
                        
                        {/* AI Loading/Generating Badge */}
                        {isAiLoading && (
                          <div className="absolute top-2 left-2 z-10">
                            <div className="flex items-center gap-1 px-2 py-1 rounded-full text-xs font-semibold shadow-md bg-gradient-to-r from-purple-500 to-pink-500 text-white animate-pulse">
                              <Loader2 className="w-3 h-3 animate-spin" />
                              <span>{progressMsg || 'Đang tạo AI...'}</span>
                            </div>
                          </div>
                        )}
                        
                        {/* AI Ready Badge */}
                        {usesAI && hasAIData && !isCompleted && !isAiLoading && (
                          <div className="absolute top-2 left-2 z-10">
                            <div className="flex items-center gap-1 px-2 py-1 rounded-full text-xs font-semibold shadow-md bg-gradient-to-r from-green-500 to-emerald-500 text-white">
                              <Sparkles className="w-3 h-3" />
                              <span>AI Sẵn sàng</span>
                            </div>
                          </div>
                        )}
                        {/* Watermark for completed challenges */}
                        {isCompleted && (
                          <div className="absolute top-2 right-2 z-10">
                            <div className="relative">
                              {/* Stamp background */}
                              <div className="w-16 h-16 rounded-full border-4 border-green-500 bg-white/95 flex flex-col items-center justify-center shadow-lg transform rotate-12">
                                <div className="flex gap-0.5">
                                  {[1, 2, 3].map((starNum) => (
                                    <Star
                                      key={starNum}
                                      className={`w-4 h-4 ${
                                        starNum <= stars
                                          ? 'text-yellow-400 fill-yellow-400'
                                          : 'text-gray-300'
                                      }`}
                                    />
                                  ))}
                                </div>
                                <span className="text-[8px] font-bold text-green-600 mt-0.5">HOÀN THÀNH</span>
                              </div>
                            </div>
                          </div>
                        )}

                        {/* Card Header */}
                        <div className={`p-4 ${isLocked ? 'bg-gray-100' : isCompleted ? 'bg-gradient-to-r from-green-50 to-emerald-50' : 'bg-gradient-to-r from-primary-50 to-purple-50'}`}>
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
                          ) : isAiLoading ? (
                            <div>
                              <button
                                disabled
                                className="w-full bg-gradient-to-r from-purple-400 to-pink-400 text-white py-2 px-4 rounded-lg font-semibold cursor-wait flex items-center justify-center gap-2"
                              >
                                <Loader2 className="w-4 h-4 animate-spin" />
                                {progressMsg || 'Đang tạo dữ liệu...'}
                              </button>
                              <p className="text-xs text-purple-600 text-center mt-2">
                                Vui lòng chờ AI tạo câu hỏi...
                              </p>
                            </div>
                          ) : challenge.status === 'coming-soon' ? (
                            <button
                              disabled
                              className="w-full bg-gray-200 text-gray-500 py-2 px-4 rounded-lg font-semibold cursor-not-allowed"
                            >
                              Sắp ra mắt
                            </button>
                          ) : needsDataGeneration ? (
                            <button 
                              onClick={(e) => {
                                e.stopPropagation();
                                handleAIChallengeStart(challenge);
                              }}
                              className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white py-2 px-4 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2"
                            >
                              <Download className="w-4 h-4" />
                              Tải dữ liệu AI
                            </button>
                          ) : usesAI && hasAIData ? (
                            <button 
                              onClick={(e) => {
                                e.stopPropagation();
                                handleAIChallengeStart(challenge);
                              }}
                              className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white py-2 px-4 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2"
                            >
                              <Sparkles className="w-4 h-4" />
                              Bắt đầu (AI)
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
            </div>

            {/* All Grades Overview */}
            <div className="mt-8 bg-white/70 backdrop-blur-xl rounded-3xl shadow-xl border border-white/50 p-6">
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
                      className={`p-4 rounded-2xl cursor-pointer transition-all duration-300 ${
                        isSelected
                          ? `bg-gradient-to-r ${info.color} text-white shadow-lg`
                          : 'bg-white/80 hover:shadow-md border border-gray-200 hover:-translate-y-1'
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
                          <>
                            <div className={`text-xs mt-2 ${isSelected ? 'text-white/70' : 'text-gray-400'}`}>
                              {stats.completed}/{stats.total} hoàn thành
                            </div>
                            <div className={`flex items-center justify-center gap-1 mt-1 ${isSelected ? 'text-yellow-200' : 'text-yellow-500'}`}>
                              <Star className={`w-3 h-3 ${isSelected ? 'fill-yellow-200' : 'fill-yellow-500'}`} />
                              <span className="text-xs font-medium">{stats.totalStars}/{stats.maxStars}</span>
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Back Button */}
            <div className="text-center mt-8">
              <Link to="/program/chemistry">
                <Button variant="secondary" className="px-8 py-3 bg-white/70 backdrop-blur-sm hover:bg-white rounded-2xl">
                  ← Quay về trang chủ
                </Button>
              </Link>
            </div>
          </>
        )}
      </div>
      </div>

      {/* CSS Animations */}
      <style>{`
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>

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
                  <div className="flex items-center gap-2">
                    {getDifficultyBadge(selectedChallenge.difficulty, selectedChallenge.difficultyColor)}
                    {/* AI Badge in Modal */}
                    {(selectedChallenge.usesAI || selectedChallenge.dataSource === 'ai') && (
                      <span className="bg-gradient-to-r from-violet-500 to-purple-600 text-white text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1">
                        <Sparkles className="w-3 h-3" />
                        AI Powered
                      </span>
                    )}
                  </div>
                </div>
                <button 
                  onClick={() => setSelectedChallenge(null)}
                  className="text-gray-500 hover:text-gray-700 text-2xl"
                >
                  ×
                </button>
              </div>
              
              <p className="text-gray-600 mb-6">{selectedChallenge.description}</p>
              
              {/* Show completion status if completed */}
              {(selectedChallenge.completed || selectedChallenge.stars > 0) && (
                <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <CheckCircle2 className="w-6 h-6 text-green-600" />
                      <div>
                        <h4 className="font-semibold text-green-800">Đã hoàn thành!</h4>
                        <p className="text-sm text-green-600">
                          Điểm cao nhất: {selectedChallenge.bestScore || selectedChallenge.score || 0} điểm
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-1">
                      {[1, 2, 3].map((starNum) => (
                        <Star
                          key={starNum}
                          className={`w-8 h-8 ${
                            starNum <= (selectedChallenge.stars || 0)
                              ? 'text-yellow-400 fill-yellow-400'
                              : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              )}

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

              {/* AI Data Info */}
              {(() => {
                const modalUsesAI = selectedChallenge.usesAI || selectedChallenge.dataSource === 'ai' || selectedChallenge.grade >= 11;
                // Use the helper function to check localStorage cache
                const modalHasAIData = hasAIDataForChallenge(selectedChallenge);
                const modalNeedsGeneration = modalUsesAI && !modalHasAIData && !(selectedChallenge.completed || selectedChallenge.stars > 0);
                const modalIsLoading = aiDataLoading[selectedChallenge.id];
                const modalProgress = generatingProgress[selectedChallenge.id];
                
                if (modalIsLoading) {
                  return (
                    <div className="mb-6 p-4 bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200 rounded-lg">
                      <div className="flex items-start gap-3">
                        <Loader2 className="w-5 h-5 text-purple-600 mt-0.5 animate-spin" />
                        <div className="flex-1">
                          <h4 className="font-semibold text-purple-800 mb-1">Đang tạo dữ liệu AI...</h4>
                          <p className="text-sm text-purple-700 mb-2">
                            {modalProgress || 'Vui lòng chờ trong giây lát...'}
                          </p>
                          <div className="w-full bg-purple-200 rounded-full h-2">
                            <div className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full animate-pulse" style={{width: '60%'}}></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                }
                
                if (modalNeedsGeneration) {
                  return (
                    <div className="mb-6 p-4 bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-lg">
                      <div className="flex items-start gap-3">
                        <Download className="w-5 h-5 text-amber-600 mt-0.5" />
                        <div>
                          <h4 className="font-semibold text-amber-800 mb-1">Cần tải dữ liệu AI</h4>
                          <p className="text-sm text-amber-700">
                            Thử thách này sử dụng câu hỏi AI. Nhấn "Tải dữ liệu" để tạo câu hỏi trước khi chơi.
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                }
                
                if (modalUsesAI && modalHasAIData) {
                  return (
                    <div className="mb-6 p-4 bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-lg">
                      <div className="flex items-start gap-3">
                        <Sparkles className="w-5 h-5 text-green-600 mt-0.5" />
                        <div>
                          <h4 className="font-semibold text-green-800 mb-1">AI Sẵn sàng!</h4>
                          <p className="text-sm text-green-700">
                            Dữ liệu AI đã được tạo. Bạn có thể bắt đầu thử thách ngay.
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                }
                
                return null;
              })()}

              <div className="flex gap-3">
                {(() => {
                  const modalUsesAI = selectedChallenge.usesAI || selectedChallenge.dataSource === 'ai' || selectedChallenge.grade >= 11;
                  // Use the helper function to check localStorage cache
                  const modalHasAIData = hasAIDataForChallenge(selectedChallenge);
                  const modalNeedsGeneration = modalUsesAI && !modalHasAIData && !(selectedChallenge.completed || selectedChallenge.stars > 0);
                  const modalIsLoading = aiDataLoading[selectedChallenge.id];
                  const modalProgress = generatingProgress[selectedChallenge.id];
                  
                  if (!selectedChallenge.isUnlocked && selectedChallenge.prerequisite?.classId) {
                    return (
                      <button
                        disabled
                        className="flex-1 bg-gray-300 text-gray-500 py-3 px-6 rounded-lg font-semibold cursor-not-allowed flex items-center justify-center gap-2"
                      >
                        <Lock className="w-4 h-4" />
                        Đã khóa
                      </button>
                    );
                  }
                  
                  if (modalIsLoading) {
                    return (
                      <button
                        disabled
                        className="flex-1 bg-gradient-to-r from-purple-400 to-pink-400 text-white py-3 px-6 rounded-lg font-semibold cursor-wait flex items-center justify-center gap-2"
                      >
                        <Loader2 className="w-4 h-4 animate-spin" />
                        {modalProgress || 'Đang tạo dữ liệu...'}
                      </button>
                    );
                  }
                  
                  if (selectedChallenge.status === 'coming-soon') {
                    return (
                      <button
                        disabled
                        className="flex-1 bg-gray-300 text-gray-500 py-3 px-6 rounded-lg font-semibold cursor-not-allowed"
                      >
                        Sắp ra mắt
                      </button>
                    );
                  }
                  
                  if (modalNeedsGeneration) {
                    return (
                      <button 
                        onClick={() => handleAIChallengeStart(selectedChallenge)}
                        className="flex-1 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white py-3 px-6 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2"
                      >
                        <Download className="w-4 h-4" />
                        Tải dữ liệu AI
                      </button>
                    );
                  }
                  
                  if (modalUsesAI && modalHasAIData) {
                    return (
                      <button 
                        onClick={() => handleAIChallengeStart(selectedChallenge)}
                        className="flex-1 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white py-3 px-6 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2"
                      >
                        <Sparkles className="w-4 h-4" />
                        Bắt đầu ngay (AI)
                      </button>
                    );
                  }
                  
                  if (selectedChallenge.link) {
                    return (
                      <Link to={selectedChallenge.link} className="flex-1">
                        <button className="w-full bg-primary-600 hover:bg-primary-700 text-white py-3 px-6 rounded-lg font-semibold transition-colors">
                          Bắt đầu ngay
                        </button>
                      </Link>
                    );
                  }
                  
                  return (
                    <button className="flex-1 bg-primary-600 hover:bg-primary-700 text-white py-3 px-6 rounded-lg font-semibold transition-colors">
                      Bắt đầu ngay
                    </button>
                  );
                })()}
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
