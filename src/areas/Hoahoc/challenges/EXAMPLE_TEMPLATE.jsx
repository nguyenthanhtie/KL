/**
 * VÍ DỤ: Cách sử dụng tính năng lưu tiến trình challenge
 * 
 * File này là template mẫu để áp dụng cho các challenge khác
 */

import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import useChallengeProgress from '../hooks/useChallengeProgress';
import ResumeDialog from '../components/ResumeDialog';

const ExampleChallenge = () => {
  // ============ AUTH & PROGRESS HOOK ============
  const { user } = useContext(AuthContext);
  
  const { 
    hasProgress,
    isLoading,
    saveProgress,
    clearProgress,
    getProgress,
    completeChallenge
  } = useChallengeProgress('example-challenge-slug', {
    challengeId: 1,
    programId: 'chemistry',
    grade: 8
  });

  // ============ GAME STATES ============
  const [gameStarted, setGameStarted] = useState(false);
  const [showResumeDialog, setShowResumeDialog] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [hintsUsed, setHintsUsed] = useState(0);

  const totalQuestions = 10;
  const maxScore = 100;

  // ============ CHECK FOR SAVED PROGRESS ON MOUNT ============
  useEffect(() => {
    // Nếu có tiến trình đã lưu và chưa bắt đầu game, hiện dialog
    if (hasProgress && !gameStarted && !showResults) {
      setShowResumeDialog(true);
    }
  }, [hasProgress]);

  // ============ AUTO-SAVE PROGRESS ============
  useEffect(() => {
    // Tự động lưu khi có thay đổi trong game (đang chơi, chưa kết thúc)
    if (gameStarted && !showResults && user) {
      const progressData = {
        currentQuestion,
        score,
        answers,
        timeElapsed,
        hintsUsed
      };
      
      // Debounce: chỉ lưu khi có thay đổi thực sự
      const saveTimeout = setTimeout(() => {
        saveProgress(progressData);
      }, 500); // Đợi 500ms sau thay đổi mới lưu

      return () => clearTimeout(saveTimeout);
    }
  }, [currentQuestion, score, answers, timeElapsed, hintsUsed, gameStarted, showResults]);

  // ============ START GAME ============
  const startGame = async (fromBeginning = false) => {
    if (fromBeginning) {
      // Bắt đầu từ đầu - xóa tiến trình cũ
      clearProgress();
      resetGameStates();
    } else {
      // Tiếp tục từ vị trí đã lưu
      const saved = await getProgress();
      if (saved) {
        setCurrentQuestion(saved.currentQuestion || 0);
        setScore(saved.score || 0);
        setAnswers(saved.answers || []);
        setTimeElapsed(saved.timeElapsed || 0);
        setHintsUsed(saved.hintsUsed || 0);
      } else {
        // Nếu không load được, bắt đầu từ đầu
        resetGameStates();
      }
    }
    
    setGameStarted(true);
    setShowResumeDialog(false);
  };

  const resetGameStates = () => {
    setCurrentQuestion(0);
    setScore(0);
    setAnswers([]);
    setTimeElapsed(0);
    setHintsUsed(0);
  };

  // ============ NEXT QUESTION ============
  const handleNextQuestion = () => {
    if (currentQuestion < totalQuestions - 1) {
      setCurrentQuestion(prev => prev + 1);
    } else {
      // Hết câu hỏi - hoàn thành challenge
      handleCompleteChallenge();
    }
  };

  // ============ COMPLETE CHALLENGE ============
  const handleCompleteChallenge = async () => {
    setShowResults(true);
    
    // Clear progress đã lưu
    clearProgress();

    // Lưu kết quả hoàn thành vào database
    if (user) {
      const result = await completeChallenge({
        score: score,
        maxScore: maxScore,
        timeSpent: timeElapsed,
        attempts: 1,
        hintsUsed: hintsUsed
      });

      if (result) {
        console.log('🎉 Challenge completed!');
        console.log('Stars earned:', result.stars);
        console.log('Percentage:', result.percentage);
      }
    }
  };

  // ============ ANSWER QUESTION ============
  const handleAnswer = (isCorrect) => {
    if (isCorrect) {
      const points = 10; // 10 điểm mỗi câu đúng
      setScore(prev => prev + points);
    }
    
    setAnswers(prev => [...prev, {
      questionIndex: currentQuestion,
      isCorrect,
      timestamp: new Date()
    }]);

    // Tự động chuyển câu sau 1 giây
    setTimeout(() => {
      handleNextQuestion();
    }, 1000);
  };

  // ============ USE HINT ============
  const handleUseHint = () => {
    setHintsUsed(prev => prev + 1);
    // Show hint logic here
  };

  // ============ TIMER ============
  useEffect(() => {
    let interval;
    if (gameStarted && !showResults) {
      interval = setInterval(() => {
        setTimeElapsed(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [gameStarted, showResults]);

  // ============ RENDER ============
  return (
    <div className="challenge-container">
      {!gameStarted ? (
        // Landing Screen
        <div className="landing-screen">
          <h1>Example Challenge</h1>
          <p>Test your knowledge with {totalQuestions} questions!</p>
          <button onClick={() => startGame(true)}>
            Start Challenge
          </button>
          
          {hasProgress && (
            <button onClick={() => setShowResumeDialog(true)}>
              Continue from saved progress
            </button>
          )}
        </div>
      ) : showResults ? (
        // Results Screen
        <div className="results-screen">
          <h2>Challenge Completed! 🎉</h2>
          <p>Score: {score} / {maxScore}</p>
          <p>Time: {Math.floor(timeElapsed / 60)}:{(timeElapsed % 60).toString().padStart(2, '0')}</p>
          <p>Hints Used: {hintsUsed}</p>
          <button onClick={() => {
            setGameStarted(false);
            setShowResults(false);
            resetGameStates();
          }}>
            Play Again
          </button>
        </div>
      ) : (
        // Game Screen
        <div className="game-screen">
          <div className="header">
            <div>Question {currentQuestion + 1} / {totalQuestions}</div>
            <div>Score: {score}</div>
            <div>Time: {timeElapsed}s</div>
          </div>

          <div className="question">
            {/* Question content here */}
            <h3>Question {currentQuestion + 1}</h3>
            <p>Your question content goes here...</p>
          </div>

          <div className="answers">
            <button onClick={() => handleAnswer(true)}>
              Correct Answer
            </button>
            <button onClick={() => handleAnswer(false)}>
              Wrong Answer
            </button>
          </div>

          <button onClick={handleUseHint}>
            💡 Use Hint ({hintsUsed} used)
          </button>
        </div>
      )}

      {/* Resume Dialog */}
      <ResumeDialog
        show={showResumeDialog && !gameStarted}
        onResume={() => startGame(false)}
        onRestart={() => startGame(true)}
        progressInfo={hasProgress ? {
          current: currentQuestion + 1,
          total: totalQuestions,
          score: score
        } : null}
      />
    </div>
  );
};

export default ExampleChallenge;


/**
 * CHECKLIST KHI ÁP DỤNG VÀO CHALLENGE KHÁC:
 * 
 * ✅ 1. Import useChallengeProgress hook
 * ✅ 2. Import AuthContext để lấy user
 * ✅ 3. Đặt tên challengeSlug duy nhất (ví dụ: 'can-bang-phan-ung-11')
 * ✅ 4. Cung cấp metadata đúng (challengeId, programId, grade)
 * ✅ 5. Lưu tất cả states cần thiết vào progressData
 * ✅ 6. Auto-save trong useEffect khi states thay đổi
 * ✅ 7. Restore states khi resume từ saved progress
 * ✅ 8. Call completeChallenge khi hoàn thành
 * ✅ 9. Clear progress khi restart hoặc complete
 * ✅ 10. Hiển thị ResumeDialog nếu có saved progress
 * 
 * TIPS:
 * - Debounce auto-save để tránh lưu quá nhiều lần
 * - Lưu progressData sau mỗi câu hỏi/level hoàn thành
 * - Test kỹ trường hợp resume progress
 * - Xử lý trường hợp user chưa login (fallback localStorage)
 */
