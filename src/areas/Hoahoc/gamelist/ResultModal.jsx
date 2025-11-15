import Modal from '../../../components/ui/Modal';
import Button from '../../../components/ui/Button';

const ResultModal = ({ 
  isOpen, 
  onClose, 
  score, 
  totalPoints, 
  onRestart, 
  onBack,
  onNext, // Thêm callback cho bài học tiếp theo
  hasNextLesson = false, // Kiểm tra có bài học tiếp theo không
  level = 'basic' // Thêm prop level
}) => {
  const percentage = (score / totalPoints) * 100;
  const isPassed = percentage >= 80; // 80% để đạt sao
  const canProgress = percentage >= 60; // 60% để qua cấp độ tiếp theo

  // Thông tin cấp độ
  const levelInfo = {
    basic: { name: 'Cơ bản', icon: '🌱', color: 'text-green-600' },
    intermediate: { name: 'Trung bình', icon: '🔥', color: 'text-orange-600' },
    advanced: { name: 'Nâng cao', icon: '⚡', color: 'text-purple-600' }
  };

  const currentLevelInfo = levelInfo[level] || levelInfo.basic;

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="text-center">
        {/* Hiển thị sao nếu đạt */}
        {isPassed && (
          <div className="text-6xl mb-4 animate-bounce">
            ⭐
          </div>
        )}
        
        <h2 className="text-3xl font-bold mb-2">
          {isPassed ? '🎉 Xuất sắc!' : '💪 Cố gắng lên!'}
        </h2>
        
        {/* Hiển thị cấp độ */}
        <div className={`flex items-center justify-center gap-2 mb-4 ${currentLevelInfo.color}`}>
          <span className="text-2xl">{currentLevelInfo.icon}</span>
          <span className="text-lg font-semibold">Cấp độ: {currentLevelInfo.name}</span>
        </div>

        <div className="text-6xl font-bold text-blue-600 mb-4">
          {score} / {totalPoints}
        </div>
        
        <div className="mb-4">
          <div className="text-lg font-medium text-gray-700 mb-2">
            Tỷ lệ hoàn thành: {percentage.toFixed(0)}%
          </div>
          <div className="w-full bg-gray-200 rounded-full h-4">
            <div 
              className={`h-4 rounded-full transition-all ${isPassed ? 'bg-success' : 'bg-orange-500'}`}
              style={{ width: `${percentage}%` }}
            />
          </div>
        </div>

        <p className="text-lg mb-6">
          {isPassed
            ? `🎊 Chúc mừng! Bạn đã đạt sao ở cấp độ ${currentLevelInfo.name}!`
            : canProgress
            ? `✅ Bạn đã đạt ${percentage.toFixed(0)}%! Có thể tiếp tục bài học tiếp theo.`
            : `📚 Đạt ≥60% để tiếp tục. Hãy thử lại!`}
        </p>
        
        <div className="flex gap-3 justify-center">
          {canProgress ? (
            // Nếu đạt ≥60%, cho phép tiếp tục hoặc về dashboard
            <>
              <Button onClick={onRestart} variant="outline">
                🔄 Chơi lại
              </Button>
              {hasNextLesson ? (
                <Button onClick={onNext}>
                  ➡️ Bài học tiếp theo
                </Button>
              ) : (
                <Button onClick={onBack}>
                  🏠 Trở về Dashboard
                </Button>
              )}
            </>
          ) : (
            // Nếu <60%, chỉ cho chơi lại hoặc về dashboard
            <>
              <Button onClick={onRestart}>
                🔄 Chơi lại
              </Button>
              <Button variant="outline" onClick={onBack}>
                🏠 Trở về Dashboard
              </Button>
            </>
          )}
        </div>
      </div>
    </Modal>
  );
};

export default ResultModal;
