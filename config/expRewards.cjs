// Hệ thống EXP Rewards - Phần thưởng kinh nghiệm cho các nhiệm vụ (Backend version)
// EXP được tính dựa trên việc hoàn thành nhiệm vụ, không phải điểm số trong game

// ================== LESSON REWARDS ==================
const LESSON_EXP_REWARDS = {
  COMPLETE_LESSON: 20,
  STAR_BONUS: {
    1: 0,
    2: 10,
    3: 30,
  },
  FIRST_TIME_BONUS: 10,
};

// ================== CHALLENGE REWARDS ==================
const CHALLENGE_EXP_REWARDS = {
  COMPLETE_CHALLENGE: 30,
  STAR_BONUS: {
    1: 0,
    2: 15,
    3: 45,
  },
  FIRST_TIME_BONUS: 20,
  DIFFICULTY_MULTIPLIER: {
    easy: 1.0,
    medium: 1.5,
    hard: 2.0,
  },
};

// ================== PK ROOM REWARDS ==================
const PK_EXP_REWARDS = {
  PARTICIPATE: 10,
  WIN: 50,
  TOP_3: 30,
  CORRECT_ANSWER: 5,
};

// ================== DAILY REWARDS ==================
const DAILY_EXP_REWARDS = {
  DAILY_LOGIN: 5,
  STREAK_MULTIPLIER: 1,
  MAX_STREAK_BONUS: 7,
  DAILY_LESSON: 10,
  DAILY_3_LESSONS: 25,
  DAILY_5_LESSONS: 50,
};

// ================== ACHIEVEMENT REWARDS ==================
const ACHIEVEMENT_EXP_REWARDS = {
  COMPLETE_CHAPTER: 100,
  COMPLETE_GRADE: 500,
  PERFECT_CHAPTER: 200,
  WEEK_STREAK: 50,
  MONTH_STREAK: 200,
};

// ================== HELPER FUNCTIONS ==================

/**
 * Tính EXP cho việc hoàn thành bài học
 */
const calculateLessonExp = (stars, isFirstTime = false) => {
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
 */
const calculateChallengeExp = (stars, isFirstTime = false, difficulty = 'medium') => {
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
 */
const calculateDailyLoginExp = (streakDays = 1) => {
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
 */
const calculateLevelFromXP = (xp) => {
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

module.exports = {
  LESSON_EXP_REWARDS,
  CHALLENGE_EXP_REWARDS,
  PK_EXP_REWARDS,
  DAILY_EXP_REWARDS,
  ACHIEVEMENT_EXP_REWARDS,
  calculateLessonExp,
  calculateChallengeExp,
  calculateDailyLoginExp,
  calculateLevelFromXP,
};
