// Hệ thống EXP Rewards - Phần thưởng kinh nghiệm cho các nhiệm vụ
// EXP được tính dựa trên việc hoàn thành nhiệm vụ, không phải điểm số trong game

// ================== LESSON REWARDS ==================
// Phần thưởng khi hoàn thành bài học
export const LESSON_EXP_REWARDS = {
  // Hoàn thành bài học cơ bản
  COMPLETE_LESSON: 20,
  
  // Bonus dựa trên số sao đạt được
  STAR_BONUS: {
    1: 0,    // 1 sao: không có bonus thêm
    2: 10,   // 2 sao: +10 EXP
    3: 30,   // 3 sao: +30 EXP (perfect)
  },
  
  // First-time bonus (lần đầu hoàn thành)
  FIRST_TIME_BONUS: 10,
};

// ================== CHALLENGE REWARDS ==================
// Phần thưởng khi hoàn thành thử thách
export const CHALLENGE_EXP_REWARDS = {
  // Hoàn thành thử thách cơ bản
  COMPLETE_CHALLENGE: 30,
  
  // Bonus dựa trên số sao đạt được
  STAR_BONUS: {
    1: 0,    // 1 sao: không có bonus thêm
    2: 15,   // 2 sao: +15 EXP
    3: 45,   // 3 sao: +45 EXP (perfect)
  },
  
  // First-time bonus (lần đầu hoàn thành)
  FIRST_TIME_BONUS: 20,
  
  // Bonus dựa vào độ khó thử thách
  DIFFICULTY_MULTIPLIER: {
    easy: 1.0,
    medium: 1.5,
    hard: 2.0,
  },
};

// ================== PK ROOM REWARDS ==================
// Phần thưởng khi thi đấu PK
export const PK_EXP_REWARDS = {
  // Tham gia PK
  PARTICIPATE: 10,
  
  // Thắng PK
  WIN: 50,
  
  // Top 3
  TOP_3: 30,
  
  // Trả lời đúng mỗi câu
  CORRECT_ANSWER: 5,
};

// ================== DAILY REWARDS ==================
// Phần thưởng hàng ngày
export const DAILY_EXP_REWARDS = {
  // Đăng nhập hàng ngày
  DAILY_LOGIN: 5,
  
  // Streak bonus (nhân với số ngày liên tiếp, tối đa x7)
  STREAK_MULTIPLIER: 1,
  MAX_STREAK_BONUS: 7,
  
  // Hoàn thành 1 bài học trong ngày
  DAILY_LESSON: 10,
  
  // Hoàn thành 3 bài học trong ngày
  DAILY_3_LESSONS: 25,
  
  // Hoàn thành 5 bài học trong ngày
  DAILY_5_LESSONS: 50,
};

// ================== ACHIEVEMENT REWARDS ==================
// Phần thưởng đạt thành tựu
export const ACHIEVEMENT_EXP_REWARDS = {
  // Hoàn thành chương
  COMPLETE_CHAPTER: 100,
  
  // Hoàn thành tất cả bài học một lớp
  COMPLETE_GRADE: 500,
  
  // Perfect (3 sao) tất cả bài trong chương
  PERFECT_CHAPTER: 200,
  
  // Chuỗi học 7 ngày liên tiếp
  WEEK_STREAK: 50,
  
  // Chuỗi học 30 ngày liên tiếp
  MONTH_STREAK: 200,
};

// ================== HELPER FUNCTIONS ==================

/**
 * Tính EXP cho việc hoàn thành bài học
 * @param {number} stars - Số sao đạt được (1-3)
 * @param {boolean} isFirstTime - Có phải lần đầu hoàn thành không
 * @returns {object} - { totalExp, breakdown }
 */
export const calculateLessonExp = (stars, isFirstTime = false) => {
  const breakdown = {
    base: LESSON_EXP_REWARDS.COMPLETE_LESSON,
    starBonus: LESSON_EXP_REWARDS.STAR_BONUS[stars] || 0,
    firstTimeBonus: isFirstTime ? LESSON_EXP_REWARDS.FIRST_TIME_BONUS : 0,
  };
  
  const totalExp = breakdown.base + breakdown.starBonus + breakdown.firstTimeBonus;
  
  return { totalExp, breakdown };
};

/**
 * Tính EXP cho việc hoàn thành thử thách
 * @param {number} stars - Số sao đạt được (1-3)
 * @param {boolean} isFirstTime - Có phải lần đầu hoàn thành không
 * @param {string} difficulty - Độ khó: 'easy', 'medium', 'hard'
 * @returns {object} - { totalExp, breakdown }
 */
export const calculateChallengeExp = (stars, isFirstTime = false, difficulty = 'medium') => {
  const multiplier = CHALLENGE_EXP_REWARDS.DIFFICULTY_MULTIPLIER[difficulty] || 1;
  
  const breakdown = {
    base: Math.round(CHALLENGE_EXP_REWARDS.COMPLETE_CHALLENGE * multiplier),
    starBonus: Math.round((CHALLENGE_EXP_REWARDS.STAR_BONUS[stars] || 0) * multiplier),
    firstTimeBonus: isFirstTime ? CHALLENGE_EXP_REWARDS.FIRST_TIME_BONUS : 0,
  };
  
  const totalExp = breakdown.base + breakdown.starBonus + breakdown.firstTimeBonus;
  
  return { totalExp, breakdown };
};

/**
 * Tính EXP cho daily login với streak
 * @param {number} streakDays - Số ngày học liên tiếp
 * @returns {object} - { totalExp, breakdown }
 */
export const calculateDailyLoginExp = (streakDays = 1) => {
  const streakBonus = Math.min(streakDays, DAILY_EXP_REWARDS.MAX_STREAK_BONUS) * DAILY_EXP_REWARDS.STREAK_MULTIPLIER;
  
  const breakdown = {
    base: DAILY_EXP_REWARDS.DAILY_LOGIN,
    streakBonus,
  };
  
  const totalExp = breakdown.base + breakdown.streakBonus;
  
  return { totalExp, breakdown };
};

/**
 * Tính level từ XP
 * @param {number} xp - Số XP hiện tại
 * @returns {object} - { level, currentXp, xpForNextLevel, progress }
 */
export const calculateLevelFromXP = (xp) => {
  // Level = floor(xp / 100) + 1
  // Level 1: 0-99 XP
  // Level 2: 100-199 XP
  // ...
  const level = Math.floor(xp / 100) + 1;
  const currentLevelXp = xp % 100;
  const xpForNextLevel = 100;
  const progress = (currentLevelXp / xpForNextLevel) * 100;
  
  return {
    level,
    currentXp: currentLevelXp,
    xpForNextLevel,
    progress: Math.round(progress),
    totalXp: xp,
  };
};

// Export tất cả constants cho backend sử dụng
export const EXP_CONSTANTS = {
  LESSON: LESSON_EXP_REWARDS,
  CHALLENGE: CHALLENGE_EXP_REWARDS,
  PK: PK_EXP_REWARDS,
  DAILY: DAILY_EXP_REWARDS,
  ACHIEVEMENT: ACHIEVEMENT_EXP_REWARDS,
};

export default EXP_CONSTANTS;
