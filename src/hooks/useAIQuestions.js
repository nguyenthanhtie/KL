// ==================== HOOK: useAIQuestions ====================
// Hook để fetch câu hỏi được sinh bởi AI

import { useState, useEffect, useCallback } from 'react';
import { API_BASE_URL } from '../config/api';

const CACHE_KEY_PREFIX = 'ai_questions_';

/**
 * Hook để lấy câu hỏi từ AI
 * @param {string} lessonId - ID của bài học (vd: 'dai_cuong_hoa_huu_co_11')
 * @param {Object} options - Tùy chọn
 * @param {boolean} options.autoFetch - Tự động fetch khi mount (default: true)
 * @param {boolean} options.useCache - Sử dụng cache localStorage (default: true)
 * @param {number} options.cacheDuration - Thời gian cache (ms) (default: 24h)
 * @returns {Object} { questions, categories, loading, error, refetch, generateForCategory }
 */
export function useAIQuestions(lessonId, options = {}) {
  const {
    autoFetch = true,
    useCache = true,
    cacheDuration = 24 * 60 * 60 * 1000, // 24 giờ
  } = options;

  const [questions, setQuestions] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [generatedAt, setGeneratedAt] = useState(null);

  // Lấy từ localStorage cache
  const getFromCache = useCallback(() => {
    if (!useCache) return null;
    
    try {
      const cached = localStorage.getItem(`${CACHE_KEY_PREFIX}${lessonId}`);
      if (!cached) return null;
      
      const { data, timestamp } = JSON.parse(cached);
      if (Date.now() - timestamp > cacheDuration) {
        localStorage.removeItem(`${CACHE_KEY_PREFIX}${lessonId}`);
        return null;
      }
      
      // Check if cache has enough questions (at least 8 per category)
      // If not, invalidate cache to fetch fresh AI questions
      if (data.questions && data.categories) {
        const minQuestionsPerCategory = 8;
        const hasEnoughQuestions = data.categories.every(cat => {
          const catQuestions = data.questions.filter(q => q.category === cat.id);
          return catQuestions.length >= minQuestionsPerCategory;
        });
        
        if (!hasEnoughQuestions) {
          console.log('Cache has insufficient questions, fetching fresh data...');
          localStorage.removeItem(`${CACHE_KEY_PREFIX}${lessonId}`);
          return null;
        }
      }
      
      return data;
    } catch {
      return null;
    }
  }, [lessonId, useCache, cacheDuration]);

  // Lưu vào localStorage cache
  const saveToCache = useCallback((data) => {
    if (!useCache) return;
    
    try {
      localStorage.setItem(`${CACHE_KEY_PREFIX}${lessonId}`, JSON.stringify({
        data,
        timestamp: Date.now()
      }));
    } catch (e) {
      console.warn('Failed to cache questions:', e);
    }
  }, [lessonId, useCache]);

  // Fetch tất cả câu hỏi cho lesson
  const fetchQuestions = useCallback(async (forceRefresh = false) => {
    // Check cache first
    if (!forceRefresh) {
      const cached = getFromCache();
      if (cached) {
        setQuestions(cached.questions);
        setCategories(cached.categories);
        setGeneratedAt(cached.generatedAt);
        return cached;
      }
    }

    setLoading(true);
    setError(null);

    try {
      const url = `${API_BASE_URL}/ai-questions/generate/${lessonId}${forceRefresh ? '?refresh=true' : ''}`;
      const response = await fetch(url);
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to fetch questions');
      }

      const data = await response.json();
      
      if (data.success) {
        setQuestions(data.questions);
        setCategories(data.categories);
        setGeneratedAt(data.generatedAt);
        
        saveToCache({
          questions: data.questions,
          categories: data.categories,
          generatedAt: data.generatedAt
        });

        return data;
      } else {
        throw new Error(data.error || 'Unknown error');
      }
    } catch (err) {
      setError(err.message);
      console.error('AI Questions fetch error:', err);
      return null;
    } finally {
      setLoading(false);
    }
  }, [lessonId, getFromCache, saveToCache]);

  // Fetch câu hỏi cho 1 category cụ thể
  const generateForCategory = useCallback(async (categoryId, count = 5, forceRefresh = false) => {
    setLoading(true);
    setError(null);

    try {
      const url = `${API_BASE_URL}/ai-questions/generate/${lessonId}/${categoryId}?count=${count}${forceRefresh ? '&refresh=true' : ''}`;
      const response = await fetch(url);
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to generate questions');
      }

      const data = await response.json();
      
      if (data.success) {
        // Merge với existing questions
        setQuestions(prev => {
          const filtered = prev.filter(q => q.category !== categoryId);
          const newQuestions = [...filtered, ...data.questions];
          // Re-number
          return newQuestions.map((q, i) => ({ ...q, id: i + 1 }));
        });
        
        return data.questions;
      } else {
        throw new Error(data.error || 'Unknown error');
      }
    } catch (err) {
      setError(err.message);
      console.error('AI Category generation error:', err);
      return null;
    } finally {
      setLoading(false);
    }
  }, [lessonId]);

  // Xóa cache
  const clearCache = useCallback(() => {
    localStorage.removeItem(`${CACHE_KEY_PREFIX}${lessonId}`);
    setQuestions([]);
    setCategories([]);
    setGeneratedAt(null);
  }, [lessonId]);

  // Auto-fetch on mount
  useEffect(() => {
    if (autoFetch && lessonId) {
      fetchQuestions();
    }
  }, [autoFetch, lessonId, fetchQuestions]);

  return {
    questions,
    categories,
    loading,
    error,
    generatedAt,
    refetch: fetchQuestions,
    generateForCategory,
    clearCache,
    isFromCache: !!getFromCache()
  };
}

/**
 * Hook đơn giản hơn - trả về questions như static data
 * Fallback về static data nếu AI không khả dụng
 */
export function useAIQuestionsWithFallback(lessonId, staticQuestions = [], staticCategories = []) {
  const { 
    questions: aiQuestions, 
    categories: aiCategories,
    loading, 
    error 
  } = useAIQuestions(lessonId, { autoFetch: true });

  // Trả về AI questions nếu có, không thì dùng static
  const questions = aiQuestions.length > 0 ? aiQuestions : staticQuestions;
  const categories = aiCategories.length > 0 ? aiCategories : staticCategories;

  return {
    questions,
    categories,
    loading,
    error,
    isAIGenerated: aiQuestions.length > 0
  };
}

export default useAIQuestions;
