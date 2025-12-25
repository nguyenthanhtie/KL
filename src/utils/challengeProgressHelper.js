import API_BASE_URL from '../config/api';

/**
 * Helper functions for managing challenge progress and completion
 */

/**
 * Save challenge progress to database
 * @param {string} userId - User ID
 * @param {string} challengeSlug - Challenge slug identifier
 * @param {object} progressData - Progress data to save
 * @param {object} metadata - Challenge metadata { challengeId, programId, grade }
 */
export const saveChallengeProgress = async (userId, challengeSlug, progressData, metadata = {}) => {
  if (!userId || !challengeSlug) {
    console.error('Missing userId or challengeSlug');
    return null;
  }

  try {
    const response = await fetch(`${API_BASE_URL}/challenges/attempts/save`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userId,
        challengeSlug,
        progressData,
        challengeId: metadata.challengeId,
        programId: metadata.programId || 'chemistry',
        grade: metadata.grade || 8
      })
    });

    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      console.error('Failed to save challenge progress');
      return null;
    }
  } catch (error) {
    console.error('Error saving challenge progress:', error);
    return null;
  }
};

/**
 * Load active challenge progress from database
 * @param {string} userId - User ID
 * @param {string} challengeSlug - Challenge slug identifier
 */
export const loadChallengeProgress = async (userId, challengeSlug) => {
  if (!userId || !challengeSlug) {
    return null;
  }

  try {
    const response = await fetch(
      `${API_BASE_URL}/challenges/attempts/active/${userId}/${challengeSlug}`
    );
    
    if (response.ok) {
      const data = await response.json();
      return data.hasProgress ? data.progressData : null;
    }
  } catch (error) {
    console.error('Error loading challenge progress:', error);
  }
  return null;
};

/**
 * Complete a challenge and save result to database
 * @param {string} userId - User ID
 * @param {string} challengeSlug - Challenge slug identifier
 * @param {object} resultData - Result data { score, maxScore, timeSpent, attempts, hintsUsed }
 * @param {object} metadata - Challenge metadata { challengeId, programId, grade }
 */
export const completeChallenge = async (userId, challengeSlug, resultData, metadata = {}) => {
  if (!userId || !challengeSlug) {
    console.error('Missing userId or challengeSlug');
    return null;
  }

  try {
    const response = await fetch(`${API_BASE_URL}/challenges/attempts/complete`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userId,
        challengeSlug,
        challengeId: metadata.challengeId,
        programId: metadata.programId || 'chemistry',
        grade: metadata.grade || 8,
        score: resultData.score,
        maxScore: resultData.maxScore,
        timeSpent: resultData.timeSpent || 0,
        attempts: resultData.attempts || 1,
        hintsUsed: resultData.hintsUsed || 0,
        progressData: resultData.progressData || {}
      })
    });

    if (response.ok) {
      const data = await response.json();
      console.log('🎉 Challenge completed successfully!', data);
      return data;
    } else {
      console.error('Failed to complete challenge');
      return null;
    }
  } catch (error) {
    console.error('Error completing challenge:', error);
    return null;
  }
};

/**
 * Clear/abandon challenge progress
 * @param {string} userId - User ID
 * @param {string} challengeSlug - Challenge slug identifier
 */
export const clearChallengeProgress = async (userId, challengeSlug) => {
  if (!userId || !challengeSlug) {
    return false;
  }

  try {
    const response = await fetch(
      `${API_BASE_URL}/challenges/attempts/${userId}/${challengeSlug}`,
      { method: 'DELETE' }
    );
    
    return response.ok;
  } catch (error) {
    console.error('Error clearing challenge progress:', error);
    return false;
  }
};

/**
 * Get user's challenge history
 * @param {string} userId - User ID
 * @param {object} filters - Optional filters { programId, grade, status, limit }
 */
export const getChallengeHistory = async (userId, filters = {}) => {
  if (!userId) {
    return [];
  }

  try {
    const queryParams = new URLSearchParams();
    if (filters.programId) queryParams.append('programId', filters.programId);
    if (filters.grade) queryParams.append('grade', filters.grade);
    if (filters.status) queryParams.append('status', filters.status);
    if (filters.limit) queryParams.append('limit', filters.limit);

    const response = await fetch(
      `${API_BASE_URL}/challenges/attempts/history/${userId}?${queryParams}`
    );
    
    if (response.ok) {
      const data = await response.json();
      return data.attempts || [];
    }
  } catch (error) {
    console.error('Error fetching challenge history:', error);
  }
  return [];
};

/**
 * Get best attempt for a specific challenge
 * @param {string} userId - User ID
 * @param {string} challengeSlug - Challenge slug identifier
 */
export const getBestAttempt = async (userId, challengeSlug) => {
  if (!userId || !challengeSlug) {
    return null;
  }

  try {
    const response = await fetch(
      `${API_BASE_URL}/challenges/attempts/best/${userId}/${challengeSlug}`
    );
    
    if (response.ok) {
      const data = await response.json();
      return data.hasBestAttempt ? data.bestAttempt : null;
    }
  } catch (error) {
    console.error('Error fetching best attempt:', error);
  }
  return null;
};

/**
 * Calculate stars based on score percentage
 * @param {number} percentage - Score percentage (0-100)
 */
export const calculateStars = (percentage) => {
  if (percentage >= 100) return 3;
  if (percentage >= 80) return 2;
  if (percentage >= 50) return 1;
  return 0;
};

/**
 * Format time in seconds to readable string
 * @param {number} seconds - Time in seconds
 */
export const formatTime = (seconds) => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs.toString().padStart(2, '0')}`;
};

/**
 * Get star emoji based on star count
 * @param {number} stars - Number of stars (0-3)
 */
export const getStarEmoji = (stars) => {
  const emojis = ['❌', '⭐', '⭐⭐', '⭐⭐⭐'];
  return emojis[stars] || emojis[0];
};

// Challenge IDs for easy reference
export const CHALLENGE_IDS = {
  DUOI_HINH: 'duoi-hinh-bat-chu',
  CAU_TRUC: 'cau-truc-nguyen-tu',
  GHEP_NGUYEN_TU: 'ghep-nguyen-tu',
  PHONG_THI_NGHIEM: 'phong-thi-nghiem',
  NHAN_BIET: 'nhan-biet-dung-dich',
  XAY_DUNG: 'xay-dung-phan-tu',
  PHA_CHE: 'pha-che-dung-dich',
  CAN_BANG: 'tro-choi-can-bang',
  SUY_LUAN: 'suy-luan-phan-ung',
  TINH_OXI_HOA: 'tinh-oxi-hoa'
};
