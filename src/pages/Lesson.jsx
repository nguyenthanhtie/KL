import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { API_URL } from '../config/api';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Modal from '../components/ui/Modal';

const Lesson = () => {
  const { classId, chapterId, lessonId } = useParams();
  const navigate = useNavigate();
  const [lessonData, setLessonData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentQuizIndex, setCurrentQuizIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const [activeTab, setActiveTab] = useState('theory');

  // Fetch lesson data from API
  useEffect(() => {
    const fetchLesson = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `${API_URL}/lessons/class/${classId}/chapter/${chapterId}/lesson/${lessonId}`
        );
        setLessonData(response.data);
        setError(null);
      } catch (err) {
        console.error('Error fetching lesson:', err);
        setError(err.response?.data?.message || 'Không thể tải bài học. Vui lòng thử lại.');
      } finally {
        setLoading(false);
      }
    };

    if (classId && chapterId && lessonId) {
      fetchLesson();
    }
  }, [classId, chapterId, lessonId]);

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-8 px-4 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Đang tải bài học...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 py-8 px-4">
        <div className="container mx-auto max-w-4xl">
          <Card className="text-center py-8">
            <div className="text-6xl mb-4">⚠️</div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Có lỗi xảy ra</h2>
            <p className="text-gray-600 mb-6">{error}</p>
            <Button onClick={() => navigate('/dashboard')}>
              Quay về Dashboard
            </Button>
          </Card>
        </div>
      </div>
    );
  }

  // No data state
  if (!lessonData) {
    return (
      <div className="min-h-screen bg-gray-50 py-8 px-4">
        <div className="container mx-auto max-w-4xl">
          <Card className="text-center py-8">
            <div className="text-6xl mb-4">📚</div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Không tìm thấy bài học</h2>
            <p className="text-gray-600 mb-6">Bài học này không tồn tại hoặc đã bị xóa.</p>
            <Button onClick={() => navigate('/dashboard')}>
              Quay về Dashboard
            </Button>
          </Card>
        </div>
      </div>
    );
  }

  // prefer quizzes in game, fallback to legacy quizzes
  const quizzes = (lessonData.game && lessonData.game.quizzes && lessonData.game.quizzes.length)
    ? lessonData.game.quizzes
    : lessonData.quizzes || [];

  const currentQuiz = quizzes[currentQuizIndex] || {};

  const handleAnswerSelect = (answerIndex) => {
    setSelectedAnswer(answerIndex);
  };

  const handleCheckAnswer = () => {
    let isCorrect = false;
    
    if (currentQuiz.type === 'multiple-choice') {
      isCorrect = selectedAnswer === currentQuiz.correctAnswer;
    } else if (currentQuiz.type === 'true-false') {
      isCorrect = selectedAnswer === currentQuiz.correctAnswer;
    }
    
    if (isCorrect) {
      setScore(score + 1);
    }
    
    setShowResult(true);
  };

  const handleNextQuestion = () => {
    if (currentQuizIndex < quizzes.length - 1) {
      setCurrentQuizIndex(currentQuizIndex + 1);
      setSelectedAnswer(null);
      setShowResult(false);
    } else {
      setIsCompleted(true);
    }
  };

  const handleFinish = () => {
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="container mx-auto max-w-4xl">
        {/* Header */}
        <div className="mb-8">
          <button 
            onClick={() => navigate('/dashboard')}
            className="text-primary-600 hover:text-primary-700 mb-4 flex items-center"
          >
            ← Quay lại Dashboard
          </button>
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-3xl font-bold text-gray-800">{lessonData.title}</h1>
            {lessonData.type === 'lab' && (
              <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                🧪 Thực hành
              </span>
            )}
            {lessonData.type === 'exercise' && (
              <span className="px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-sm font-medium">
                💪 Luyện tập
              </span>
            )}
            {lessonData.type === 'theory' && (
              <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                📚 Lý thuyết
              </span>
            )}
          </div>
          <p className="text-gray-600">{lessonData.description}</p>
        </div>

        {/* Content & Game Tabs */}
        <Card className="mb-8">
          <div className="flex gap-3 mb-4">
            <button
              onClick={() => setActiveTab('theory')}
              className={`px-4 py-2 rounded ${activeTab === 'theory' ? 'bg-primary-600 text-white' : 'bg-white border'}`}
            >
              Lý thuyết
            </button>
            <button
              onClick={() => setActiveTab('game')}
              className={`px-4 py-2 rounded ${activeTab === 'game' ? 'bg-primary-600 text-white' : 'bg-white border'}`}
            >
              Trò chơi
            </button>
          </div>

          {activeTab === 'theory' && (
            <div>
              {lessonData.type === 'lab' && (
                <div className="mb-6 p-4 bg-green-50 border-l-4 border-green-500 rounded">
                  <div className="flex items-start">
                    <span className="text-2xl mr-3">🧪</span>
                    <div>
                      <h3 className="font-bold text-green-800 mb-1">Bài thực hành mô phỏng</h3>
                      <p className="text-green-700 text-sm">
                        Đây là bài thực hành dạng mô phỏng phòng thí nghiệm. Hãy đọc kỹ hướng dẫn và thực hiện các bước quan sát.
                      </p>
                    </div>
                  </div>
                </div>
              )}
              {lessonData.type === 'exercise' && (
                <div className="mb-6 p-4 bg-orange-50 border-l-4 border-orange-500 rounded">
                  <div className="flex items-start">
                    <span className="text-2xl mr-3">💪</span>
                    <div>
                      <h3 className="font-bold text-orange-800 mb-1">Bài luyện tập tổng hợp</h3>
                      <p className="text-orange-700 text-sm">
                        Ôn tập và củng cố kiến thức đã học thông qua các bài tập đa dạng.
                      </p>
                    </div>
                  </div>
                </div>
              )}
              <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: lessonData.theory }} />
            </div>
          )}

          {activeTab === 'game' && (
            <div>
              {!quizzes || quizzes.length === 0 ? (
                <p className="text-gray-600">Chưa có nội dung trò chơi cho bài này.</p>
              ) : (
                <Card>
                  <h2 className="text-2xl font-bold text-gray-800 mb-6">Kiểm tra kiến thức</h2>

                  <div className="mb-6">
                    <div className="flex justify-between text-sm text-gray-600 mb-2">
                      <span>Câu hỏi {currentQuizIndex + 1}/{quizzes.length}</span>
                      <span>Điểm: {score}/{quizzes.length}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-primary-600 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${((currentQuizIndex + 1) / quizzes.length) * 100}%` }}
                      />
                    </div>
                  </div>

                  <div className="mb-6">
                    <h3 className="text-xl font-semibold text-gray-800 mb-4">{currentQuiz.question}</h3>

                    {currentQuiz.type === 'multiple-choice' && (
                      <div className="space-y-3">
                        {currentQuiz.options.map((option, index) => (
                          <button
                            key={index}
                            onClick={() => !showResult && handleAnswerSelect(index)}
                            disabled={showResult}
                            className={`w-full p-4 text-left rounded-lg border-2 transition-all ${
                              selectedAnswer === index
                                ? showResult
                                  ? index === currentQuiz.correctAnswer
                                    ? 'border-success bg-green-50'
                                    : 'border-danger bg-red-50'
                                  : 'border-primary-600 bg-primary-50'
                                : showResult && index === currentQuiz.correctAnswer
                                ? 'border-success bg-green-50'
                                : 'border-gray-300 hover:border-primary-400'
                            } ${showResult ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                          >
                            <div className="flex items-center">
                              <span className="font-medium mr-2">{String.fromCharCode(65 + index)}.</span>
                              <span>{option}</span>
                            </div>
                          </button>
                        ))}
                      </div>
                    )}

                    {currentQuiz.type === 'true-false' && (
                      <div className="flex gap-4">
                        <button
                          onClick={() => !showResult && handleAnswerSelect(true)}
                          disabled={showResult}
                          className={`flex-1 p-6 text-lg font-semibold rounded-lg border-2 transition-all ${
                            selectedAnswer === true
                              ? showResult
                                ? currentQuiz.correctAnswer === true
                                  ? 'border-success bg-green-50'
                                  : 'border-danger bg-red-50'
                                : 'border-primary-600 bg-primary-50'
                              : showResult && currentQuiz.correctAnswer === true
                              ? 'border-success bg-green-50'
                              : 'border-gray-300 hover:border-primary-400'
                          } ${showResult ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                        >
                          Đúng
                        </button>
                        <button
                          onClick={() => !showResult && handleAnswerSelect(false)}
                          disabled={showResult}
                          className={`flex-1 p-6 text-lg font-semibold rounded-lg border-2 transition-all ${
                            selectedAnswer === false
                              ? showResult
                                ? currentQuiz.correctAnswer === false
                                  ? 'border-success bg-green-50'
                                  : 'border-danger bg-red-50'
                                : 'border-primary-600 bg-primary-50'
                              : showResult && currentQuiz.correctAnswer === false
                              ? 'border-success bg-green-50'
                              : 'border-gray-300 hover:border-primary-400'
                          } ${showResult ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                        >
                          Sai
                        </button>
                      </div>
                    )}

                    {/* Fill in Blank Quiz */}
                    {currentQuiz.type === 'fill-in-blank' && (
                      <div className="space-y-4">
                        <input
                          type="text"
                          value={selectedAnswer || ''}
                          onChange={(e) => !showResult && setSelectedAnswer(e.target.value)}
                          disabled={showResult}
                          placeholder="Nhập câu trả lời của bạn..."
                          className="w-full p-4 text-lg border-2 border-gray-300 rounded-lg focus:border-primary-600 focus:outline-none disabled:bg-gray-100"
                        />
                        {currentQuiz.hint && !showResult && (
                          <p className="text-sm text-gray-500 italic">💡 Gợi ý: {currentQuiz.hint}</p>
                        )}
                      </div>
                    )}

                    {/* Matching Quiz */}
                    {currentQuiz.type === 'matching' && (
                      <div className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <h4 className="font-semibold text-gray-700 mb-2">Cột A:</h4>
                            {currentQuiz.pairs?.map((pair, index) => (
                              <div key={index} className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                                <span className="font-medium">{index + 1}. {pair.left}</span>
                              </div>
                            ))}
                          </div>
                          <div className="space-y-2">
                            <h4 className="font-semibold text-gray-700 mb-2">Cột B:</h4>
                            {currentQuiz.pairs?.map((pair, index) => (
                              <div key={index} className="p-3 bg-green-50 border border-green-200 rounded-lg">
                                <span>{pair.right}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                        <p className="text-sm text-gray-600 italic text-center">
                          📝 Ghi nhớ các cặp tương ứng và click "Kiểm tra" khi sẵn sàng
                        </p>
                      </div>
                    )}

                    {/* Ordering Quiz */}
                    {currentQuiz.type === 'ordering' && (
                      <div className="space-y-3">
                        <p className="text-sm text-gray-600 mb-3">Sắp xếp các mục sau theo thứ tự đúng:</p>
                        {currentQuiz.correctOrder?.map((item, index) => (
                          <div
                            key={index}
                            className="p-4 bg-gray-50 border border-gray-300 rounded-lg flex items-center"
                          >
                            <span className="bg-primary-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold mr-3">
                              {index + 1}
                            </span>
                            <span>{item}</span>
                          </div>
                        ))}
                        <p className="text-sm text-gray-600 italic text-center">
                          📋 Ghi nhớ thứ tự và click "Kiểm tra"
                        </p>
                      </div>
                    )}

                    {/* Drag-Drop Quiz (Simplified as Matching) */}
                    {currentQuiz.type === 'drag-drop' && (
                      <div className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <h4 className="font-semibold text-gray-700 mb-2">Các mục:</h4>
                            {currentQuiz.pairs?.map((pair, index) => (
                              <div key={index} className="p-3 bg-purple-50 border border-purple-200 rounded-lg cursor-move">
                                <span className="font-medium">🔸 {pair.left}</span>
                              </div>
                            ))}
                          </div>
                          <div className="space-y-2">
                            <h4 className="font-semibold text-gray-700 mb-2">Nhóm:</h4>
                            {currentQuiz.pairs?.map((pair, index) => (
                              <div key={index} className="p-3 bg-orange-50 border border-orange-200 rounded-lg">
                                <span>📦 {pair.right}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                        <p className="text-sm text-gray-600 italic text-center">
                          🎯 Ghi nhớ cách phân loại và click "Kiểm tra"
                        </p>
                      </div>
                    )}
                  </div>

                  {showResult && (
                    <div className={`p-4 rounded-lg mb-6 ${
                      (currentQuiz.type === 'multiple-choice' && selectedAnswer === currentQuiz.correctAnswer) ||
                      (currentQuiz.type === 'true-false' && selectedAnswer === currentQuiz.correctAnswer)
                        ? 'bg-green-50 border border-green-200'
                        : 'bg-red-50 border border-red-200'
                    }`}>
                      <p className="font-semibold mb-2">
                        {(currentQuiz.type === 'multiple-choice' && selectedAnswer === currentQuiz.correctAnswer) ||
                         (currentQuiz.type === 'true-false' && selectedAnswer === currentQuiz.correctAnswer)
                          ? '✓ Chính xác!'
                          : '✗ Chưa đúng'}
                      </p>
                      <p className="text-gray-700">{currentQuiz.explanation}</p>
                    </div>
                  )}

                  <div className="flex justify-between">
                    {!showResult ? (
                      <Button
                        onClick={handleCheckAnswer}
                        disabled={selectedAnswer === null}
                        className="ml-auto"
                      >
                        Kiểm tra
                      </Button>
                    ) : (
                      <Button onClick={handleNextQuestion} className="ml-auto">
                        {currentQuizIndex < quizzes.length - 1 ? 'Câu tiếp theo' : 'Hoàn thành'}
                      </Button>
                    )}
                  </div>
                </Card>
              )}
            </div>
          )}
        </Card>

        {/* Completion Modal */}
        <Modal
          isOpen={isCompleted}
          onClose={handleFinish}
          title="🎉 Hoàn thành bài học!"
        >
          <div className="text-center py-6">
            <div className="text-6xl mb-4">
              {score === lessonData.quizzes.length ? '🏆' : score >= lessonData.quizzes.length * 0.7 ? '⭐' : '📝'}
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-2">
              Điểm của bạn: {score}/{quizzes.length}
            </h3>
            <p className="text-gray-600 mb-6">
              {score === quizzes.length 
                ? 'Xuất sắc! Bạn đã trả lời đúng tất cả!'
                : score >= quizzes.length * 0.7
                ? 'Tốt lắm! Tiếp tục phát huy!'
                : 'Cố gắng lên! Hãy thử lại nhé!'}
            </p>
            <Button onClick={handleFinish} variant="success">
              Quay về Dashboard
            </Button>
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default Lesson;
