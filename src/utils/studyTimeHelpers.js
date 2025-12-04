// Ví dụ về cách sử dụng Study Time và Streak API trong Frontend

import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

// 1. Gửi thời gian học khi hoàn thành bài học
export const submitLessonWithStudyTime = async (lessonData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/users/submit-lesson`, {
      firebaseUid: lessonData.firebaseUid,
      programId: lessonData.programId,
      pathId: lessonData.pathId,
      lessonId: lessonData.lessonId,
      score: lessonData.score,
      totalQuestions: lessonData.totalQuestions,
      studyDuration: lessonData.studyDuration // Thời gian học bài này (phút)
    });

    console.log('Lesson completed:', response.data);
    console.log('Study stats:', response.data.studyStats);
    // {
    //   studyTime: 120, // Tổng thời gian học (phút)
    //   currentStreak: 5, // Số ngày học liên tiếp
    //   longestStreak: 10 // Chuỗi dài nhất
    // }

    return response.data;
  } catch (error) {
    console.error('Error submitting lesson:', error);
    throw error;
  }
};

// 2. Cập nhật thời gian học thủ công (khi user đang học)
export const updateStudyTime = async (firebaseUid, programId, durationMinutes) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/users/update-study-time`, {
      firebaseUid,
      programId,
      durationMinutes
    });

    console.log('Study time updated:', response.data.studyStats);
    return response.data;
  } catch (error) {
    console.error('Error updating study time:', error);
    throw error;
  }
};

// 3. Lấy thống kê thời gian học và streak
export const getStudyStats = async (firebaseUid, programId) => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/users/study-stats/${firebaseUid}/${programId}`
    );

    console.log('Study statistics:', response.data);
    // {
    //   studyTime: 120, // Tổng thời gian học (phút)
    //   studyStreak: {
    //     currentStreak: 5,
    //     longestStreak: 10,
    //     lastStudyDate: '2025-11-23T00:00:00.000Z',
    //     streakHistory: [
    //       { date: '2025-11-23T00:00:00.000Z', duration: 30 },
    //       { date: '2025-11-22T00:00:00.000Z', duration: 45 }
    //     ]
    //   },
    //   streakStatus: {
    //     reset: false,
    //     currentStreak: 5,
    //     longestStreak: 10
    //   }
    // }

    return response.data;
  } catch (error) {
    console.error('Error getting study stats:', error);
    throw error;
  }
};

// 4. Hook React để tracking thời gian học trong bài học
import { useState, useEffect, useRef } from 'react';

export const useStudyTimer = (firebaseUid, programId) => {
  const [studyTime, setStudyTime] = useState(0); // seconds
  const [isStudying, setIsStudying] = useState(false);
  const timerRef = useRef(null);
  const startTimeRef = useRef(null);

  // Bắt đầu đếm thời gian
  const startTimer = () => {
    if (!isStudying) {
      setIsStudying(true);
      startTimeRef.current = Date.now();
      
      timerRef.current = setInterval(() => {
        const elapsed = Math.floor((Date.now() - startTimeRef.current) / 1000);
        setStudyTime(elapsed);
      }, 1000);
    }
  };

  // Dừng đếm thời gian
  const stopTimer = () => {
    if (isStudying) {
      setIsStudying(false);
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    }
  };

  // Gửi thời gian học lên server (khi hoàn thành bài học)
  const submitStudyTime = async () => {
    stopTimer();
    const durationMinutes = Math.floor(studyTime / 60);
    
    if (durationMinutes > 0) {
      try {
        await updateStudyTime(firebaseUid, programId, durationMinutes);
      } catch (error) {
        console.error('Error submitting study time:', error);
      }
    }
    
    return durationMinutes;
  };

  // Reset timer
  const resetTimer = () => {
    stopTimer();
    setStudyTime(0);
  };

  // Cleanup khi component unmount
  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, []);

  // Format thời gian hiển thị (mm:ss)
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return {
    studyTime,
    isStudying,
    formattedTime: formatTime(studyTime),
    startTimer,
    stopTimer,
    resetTimer,
    submitStudyTime
  };
};

// 5. Component ví dụ sử dụng trong Lesson
export const LessonWithTimer = ({ lesson, user }) => {
  const { studyTime, formattedTime, startTimer, submitStudyTime } = useStudyTimer(
    user.firebaseUid,
    'chemistry'
  );

  useEffect(() => {
    // Bắt đầu đếm thời gian khi vào bài học
    startTimer();
  }, []);

  const handleCompleteLesson = async (score, totalQuestions) => {
    const durationMinutes = await submitStudyTime();
    
    // Gửi kết quả bài học kèm thời gian học
    await submitLessonWithStudyTime({
      firebaseUid: user.firebaseUid,
      programId: 'chemistry',
      pathId: lesson.classId,
      lessonId: lesson.id,
      score,
      totalQuestions,
      studyDuration: durationMinutes
    });
  };

  return (
    <div>
      <div className="timer">
        ⏱️ Thời gian học: {formattedTime}
      </div>
      
      {/* Nội dung bài học */}
      
      <button onClick={() => handleCompleteLesson(8, 10)}>
        Hoàn thành bài học
      </button>
    </div>
  );
};

// 6. Component hiển thị thống kê streak
export const StreakDisplay = ({ firebaseUid, programId }) => {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    const loadStats = async () => {
      const data = await getStudyStats(firebaseUid, programId);
      setStats(data);
    };
    loadStats();
  }, [firebaseUid, programId]);

  if (!stats) return <div>Loading...</div>;

  const { studyTime, studyStreak } = stats;
  const hours = Math.floor(studyTime / 60);
  const minutes = studyTime % 60;

  return (
    <div className="stats-container">
      <div className="stat-card">
        <h3>🔥 Chuỗi học liên tiếp</h3>
        <p className="stat-value">{studyStreak.currentStreak} ngày</p>
        <p className="stat-subtitle">Cao nhất: {studyStreak.longestStreak} ngày</p>
      </div>

      <div className="stat-card">
        <h3>⏱️ Tổng thời gian học</h3>
        <p className="stat-value">
          {hours}h {minutes}m
        </p>
      </div>

      {/* Hiển thị lịch sử học */}
      <div className="streak-calendar">
        <h3>📅 Lịch sử học tập</h3>
        {studyStreak.streakHistory.slice(0, 7).map((entry, index) => (
          <div key={index} className="calendar-day">
            <span>{new Date(entry.date).toLocaleDateString()}</span>
            <span>{entry.duration} phút</span>
          </div>
        ))}
      </div>
    </div>
  );
};
