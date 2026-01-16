import { useState, useEffect, useCallback, useRef } from 'react';
import { useAuth } from '../contexts/AuthContext';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

/**
 * Hook để quản lý tiến trình challenge
 * @param {string} challengeSlug - Unique identifier cho challenge
 * @param {object} options - { challengeId, programId, grade }
 */
const useChallengeProgress = (challengeSlug, options = {}) => {
  const { user } = useAuth();
  const [hasProgress, setHasProgress] = useState(false);
  const [savedProgress, setSavedProgress] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const isMounted = useRef(true);
  
  const { challengeId, programId = 'chemistry', grade = 8 } = options;

  // Kiểm tra tiến trình đã lưu khi mount
  useEffect(() => {
    isMounted.current = true;
    
    const checkProgress = async () => {
      if (!user?.id) {
        setIsLoading(false);
        setHasProgress(false);
        setSavedProgress(null);
        return;
      }
      
      try {
        const response = await fetch(
          `${API_BASE}/challenges/attempts/active/${user.id}/${challengeSlug}`
        );
        
        if (!response.ok) {
          console.error(`Failed to fetch progress: ${response.status} ${response.statusText}`);
          if (isMounted.current) {
            setHasProgress(false);
            setSavedProgress(null);
            setIsLoading(false);
          }
          return;
        }
        
        const data = await response.json();
        
        if (isMounted.current) {
          setHasProgress(data.hasProgress || false);
          setSavedProgress(data.progressData || null);
          setIsLoading(false);
        }
      } catch (error) {
        console.error('Error checking challenge progress:', error);
        if (isMounted.current) {
          setHasProgress(false);
          setSavedProgress(null);
          setIsLoading(false);
        }
      }
    };

    checkProgress();
    
    return () => {
      isMounted.current = false;
    };
  }, [user?.id, challengeSlug]);

  // Lưu tiến trình (auto-save)
  const saveProgress = useCallback(async (progressData) => {
    if (!user?.id) {
      console.warn('Cannot save progress: No user logged in');
      return false;
    }
    
    try {
      console.log('💾 Saving progress:', { challengeSlug, progressData });
      
      const response = await fetch(`${API_BASE}/challenges/attempts/save`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: user.id,
          challengeId,
          challengeSlug,
          programId,
          grade,
          progressData
        })
      });
      
      const data = await response.json();
      
      if (data.success) {
        setHasProgress(true);
        setSavedProgress(progressData);
        console.log('✅ Progress saved successfully');
        return true;
      } else {
        console.error('❌ Failed to save progress:', data.message);
        return false;
      }
    } catch (error) {
      console.error('❌ Error saving progress:', error);
      return false;
    }
  }, [user?.id, challengeSlug, challengeId, programId, grade]);

  // Xóa tiến trình
  const clearProgress = useCallback(async () => {
    if (!user?.id) return false;
    
    try {
      console.log('🗑️ Clearing progress:', challengeSlug);
      
      const response = await fetch(
        `${API_BASE}/challenges/attempts/${user.id}/${challengeSlug}`,
        { method: 'DELETE' }
      );
      
      const data = await response.json();
      
      if (data.success) {
        setHasProgress(false);
        setSavedProgress(null);
        console.log('✅ Progress cleared');
        return true;
      }
      return false;
    } catch (error) {
      console.error('❌ Error clearing progress:', error);
      return false;
    }
  }, [user?.id, challengeSlug]);

  // Lấy tiến trình đã lưu
  const getProgress = useCallback(() => {
    return savedProgress;
  }, [savedProgress]);

  // Hoàn thành challenge
  const completeChallenge = useCallback(async (result) => {
    if (!user?.id) {
      console.warn('Cannot complete challenge: No user logged in');
      return null;
    }
    
    const {
      score = 0,
      maxScore = 100,
      percentage,
      stars,
      timeSpent = 0,
      correctAnswers,
      totalQuestions
    } = result;
    
    console.log('🏆 Completing challenge:', { 
      challengeSlug, 
      score, 
      maxScore, 
      stars,
      percentage,
      userId: user.id 
    });
    
    try {
      const response = await fetch(`${API_BASE}/challenges/attempts/complete`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: user.id,
          challengeId,
          challengeSlug,
          programId,
          grade,
          score,
          maxScore,
          percentage,
          stars,
          timeSpent,
          correctAnswers,
          totalQuestions
        })
      });
      
      const data = await response.json();
      
      if (data.success) {
        // Clear local progress state after completion
        setHasProgress(false);
        setSavedProgress(null);
        
        console.log('✅ Challenge completed:', {
          stars: data.stars,
          xpReward: data.xpReward,
          xpBreakdown: data.xpBreakdown,
          isFirstTime: data.isFirstTime,
          completedChallenges: data.completedChallenges
        });
        
        return {
          success: true,
          stars: data.stars,
          xpReward: data.xpReward,
          xpBreakdown: data.xpBreakdown,
          isFirstTime: data.isFirstTime,
          percentage: data.percentage
        };
      } else {
        console.error('❌ Failed to complete challenge:', data.message);
        return null;
      }
    } catch (error) {
      console.error('❌ Error completing challenge:', error);
      return null;
    }
  }, [user?.id, challengeSlug, challengeId, programId, grade]);

  // Lấy kết quả tốt nhất
  const getBestAttempt = useCallback(async () => {
    if (!user?.id) return null;
    
    try {
      const response = await fetch(
        `${API_BASE}/challenges/attempts/best/${user.id}/${challengeSlug}`
      );
      const data = await response.json();
      
      if (data.hasBestAttempt) {
        return {
          ...data.bestAttempt,
          stars: data.stars
        };
      }
      return null;
    } catch (error) {
      console.error('Error getting best attempt:', error);
      return null;
    }
  }, [user?.id, challengeSlug]);

  return {
    hasProgress,
    savedProgress,
    isLoading,
    saveProgress,
    clearProgress,
    getProgress,
    completeChallenge,
    getBestAttempt
  };
};

export default useChallengeProgress;
