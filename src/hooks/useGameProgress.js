import { useState, useEffect, useCallback } from 'react';
import { 
  knowledgeIngredients, 
  craftingRecipes, 
  getIngredientById,
  getRecipeById 
} from '../data/knowledgeIngredientsData';
import { 
  quests, 
  dailyQuests,
  getQuestById 
} from '../data/questsData';

const STORAGE_KEY = 'chemistry_lab_game_progress';

// Khởi tạo mặc định cho inventory kiến thức
const DEFAULT_KNOWLEDGE_INVENTORY = {
  'atom_knowledge': 5,
  'covalent_bond': 3,
  'ionic_bond': 3,
  'safety_basics': 2
};

// Khởi tạo mặc định cho inventory hóa chất
const DEFAULT_CHEMICAL_INVENTORY = {
  'H2O': 5,
  'HCl': 3,
  'NaOH': 3,
  'O2': 5,
  'H2': 5
};

// Khởi tạo mặc định cho state game
const DEFAULT_GAME_STATE = {
  playerLevel: 1,
  experience: 0,
  knowledgeInventory: DEFAULT_KNOWLEDGE_INVENTORY,
  chemicalInventory: DEFAULT_CHEMICAL_INVENTORY,
  unlockedChemicals: ['H2O', 'HCl', 'NaOH', 'O2', 'H2'],
  unlockedReactions: ['neutralization_1', 'synthesis_1'],
  completedReactions: [],
  completedQuests: [],
  questProgress: {},
  dailyQuestStatus: {},
  achievements: [],
  titles: [],
  currentTitle: null,
  statistics: {
    totalReactions: 0,
    totalCrafts: 0,
    totalQuestsCompleted: 0,
    totalPlayTime: 0,
    loginStreak: 0,
    lastLoginDate: null
  },
  settings: {
    soundEnabled: true,
    notificationsEnabled: true,
    autoSave: true
  },
  lastSaved: null
};

export const useGameProgress = () => {
  const [gameState, setGameState] = useState(DEFAULT_GAME_STATE);
  const [isLoading, setIsLoading] = useState(true);
  const [notifications, setNotifications] = useState([]);

  // Load game từ localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        setGameState(prev => ({
          ...DEFAULT_GAME_STATE,
          ...parsed,
          // Merge inventories với defaults để đảm bảo có data
          knowledgeInventory: {
            ...DEFAULT_KNOWLEDGE_INVENTORY,
            ...(parsed.knowledgeInventory || {})
          },
          chemicalInventory: {
            ...DEFAULT_CHEMICAL_INVENTORY,
            ...(parsed.chemicalInventory || {})
          }
        }));
      }
    } catch (error) {
      console.error('Error loading game progress:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Auto-save khi state thay đổi
  useEffect(() => {
    if (!isLoading && gameState.settings.autoSave) {
      const saveTimeout = setTimeout(() => {
        saveGame();
      }, 1000);
      return () => clearTimeout(saveTimeout);
    }
  }, [gameState, isLoading]);

  // Kiểm tra đăng nhập hàng ngày
  useEffect(() => {
    if (!isLoading) {
      checkDailyLogin();
    }
  }, [isLoading]);

  // Hàm thông báo
  const showNotification = useCallback((message, type = 'info') => {
    const id = Date.now();
    setNotifications(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setNotifications(prev => prev.filter(n => n.id !== id));
    }, 3000);
  }, []);

  // Lưu game
  const saveGame = useCallback(() => {
    try {
      const toSave = {
        ...gameState,
        lastSaved: new Date().toISOString()
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(toSave));
    } catch (error) {
      console.error('Error saving game:', error);
    }
  }, [gameState]);

  // Reset game
  const resetGame = useCallback(() => {
    if (window.confirm('Bạn có chắc muốn reset toàn bộ tiến trình? Hành động này không thể hoàn tác!')) {
      localStorage.removeItem(STORAGE_KEY);
      setGameState(DEFAULT_GAME_STATE);
      showNotification('Game đã được reset!', 'info');
    }
  }, [showNotification]);

  // Kiểm tra đăng nhập hàng ngày
  const checkDailyLogin = useCallback(() => {
    const today = new Date().toDateString();
    const lastLogin = gameState.statistics.lastLoginDate;
    
    if (lastLogin !== today) {
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      
      let newStreak = 1;
      if (lastLogin === yesterday.toDateString()) {
        newStreak = gameState.statistics.loginStreak + 1;
      }

      setGameState(prev => ({
        ...prev,
        statistics: {
          ...prev.statistics,
          lastLoginDate: today,
          loginStreak: newStreak
        },
        // Reset daily quests
        dailyQuestStatus: {}
      }));

      // Phần thưởng đăng nhập hàng ngày
      const dailyReward = Math.min(newStreak * 2, 10);
      addKnowledge('atom_knowledge', dailyReward);
      showNotification(`🎁 Đăng nhập ngày ${newStreak}! +${dailyReward} Kiến thức nguyên tử`, 'success');
    }
  }, [gameState.statistics, showNotification]);

  // Thêm experience
  const addExperience = useCallback((amount) => {
    setGameState(prev => {
      const newExp = prev.experience + amount;
      const newLevel = Math.floor(newExp / 100) + 1;
      
      if (newLevel > prev.playerLevel) {
        showNotification(`🎉 Lên level ${newLevel}!`, 'success');
      }
      
      return {
        ...prev,
        experience: newExp,
        playerLevel: newLevel
      };
    });
  }, [showNotification]);

  // Thêm kiến thức (nguyên liệu)
  const addKnowledge = useCallback((ingredientId, amount = 1) => {
    const ingredient = getIngredientById(ingredientId);
    if (!ingredient) return false;

    setGameState(prev => {
      const current = prev.knowledgeInventory[ingredientId] || 0;
      const newAmount = Math.min(current + amount, ingredient.maxStack);
      
      return {
        ...prev,
        knowledgeInventory: {
          ...prev.knowledgeInventory,
          [ingredientId]: newAmount
        }
      };
    });

    if (amount > 0) {
      showNotification(`📚 +${amount} ${ingredient.name}`, 'success');
    }
    return true;
  }, [showNotification]);

  // Trừ kiến thức
  const removeKnowledge = useCallback((ingredientId, amount = 1) => {
    setGameState(prev => {
      const current = prev.knowledgeInventory[ingredientId] || 0;
      if (current < amount) return prev;
      
      return {
        ...prev,
        knowledgeInventory: {
          ...prev.knowledgeInventory,
          [ingredientId]: current - amount
        }
      };
    });
    return true;
  }, []);

  // Thêm hóa chất
  const addChemical = useCallback((chemicalId, amount = 1) => {
    setGameState(prev => ({
      ...prev,
      chemicalInventory: {
        ...prev.chemicalInventory,
        [chemicalId]: (prev.chemicalInventory[chemicalId] || 0) + amount
      }
    }));
  }, []);

  // Trừ hóa chất
  const removeChemical = useCallback((chemicalId, amount = 1) => {
    setGameState(prev => {
      const current = prev.chemicalInventory[chemicalId] || 0;
      if (current < amount) return prev;
      
      return {
        ...prev,
        chemicalInventory: {
          ...prev.chemicalInventory,
          [chemicalId]: current - amount
        }
      };
    });
    return true;
  }, []);

  // Chế tạo hóa chất từ kiến thức
  const craftChemical = useCallback((recipe) => {
    // Kiểm tra level
    if (gameState.playerLevel < recipe.requiredLevel) {
      showNotification(`❌ Cần level ${recipe.requiredLevel}!`, 'error');
      return false;
    }

    // Kiểm tra nguyên liệu
    for (const ing of recipe.ingredients) {
      const owned = gameState.knowledgeInventory[ing.ingredientId] || 0;
      if (owned < ing.amount) {
        const ingredient = getIngredientById(ing.ingredientId);
        showNotification(`❌ Thiếu ${ingredient.name}!`, 'error');
        return false;
      }
    }

    // Thực hiện chế tạo
    setGameState(prev => {
      // Trừ nguyên liệu
      const newKnowledge = { ...prev.knowledgeInventory };
      recipe.ingredients.forEach(ing => {
        newKnowledge[ing.ingredientId] = (newKnowledge[ing.ingredientId] || 0) - ing.amount;
      });

      // Thêm hóa chất
      const newChemicals = { ...prev.chemicalInventory };
      newChemicals[recipe.resultChemical] = (newChemicals[recipe.resultChemical] || 0) + recipe.resultAmount;

      // Mở khóa hóa chất nếu chưa có
      const newUnlocked = prev.unlockedChemicals.includes(recipe.resultChemical)
        ? prev.unlockedChemicals
        : [...prev.unlockedChemicals, recipe.resultChemical];

      return {
        ...prev,
        knowledgeInventory: newKnowledge,
        chemicalInventory: newChemicals,
        unlockedChemicals: newUnlocked,
        experience: prev.experience + recipe.expReward,
        statistics: {
          ...prev.statistics,
          totalCrafts: prev.statistics.totalCrafts + 1
        }
      };
    });

    showNotification(`⚗️ Đã chế tạo ${recipe.resultAmount} ${recipe.resultChemical}! +${recipe.expReward} EXP`, 'success');
    return true;
  }, [gameState, showNotification]);

  // Thực hiện phản ứng
  const performReaction = useCallback((reaction) => {
    // Kiểm tra nguyên liệu
    for (const reactantId of reaction.reactants) {
      if ((gameState.chemicalInventory[reactantId] || 0) < 1) {
        showNotification(`❌ Thiếu ${reactantId}!`, 'error');
        return false;
      }
    }

    setGameState(prev => {
      // Trừ reactants
      const newInventory = { ...prev.chemicalInventory };
      reaction.reactants.forEach(id => {
        newInventory[id] = (newInventory[id] || 0) - 1;
      });

      // Thêm products
      reaction.products.forEach(id => {
        newInventory[id] = (newInventory[id] || 0) + 1;
      });

      // Đánh dấu hoàn thành
      const newCompleted = prev.completedReactions.includes(reaction.id)
        ? prev.completedReactions
        : [...prev.completedReactions, reaction.id];

      return {
        ...prev,
        chemicalInventory: newInventory,
        completedReactions: newCompleted,
        statistics: {
          ...prev.statistics,
          totalReactions: prev.statistics.totalReactions + 1
        }
      };
    });

    showNotification(`✨ Phản ứng thành công!`, 'success');
    return true;
  }, [gameState, showNotification]);

  // Bắt đầu nhiệm vụ
  const startQuest = useCallback((quest) => {
    setGameState(prev => ({
      ...prev,
      questProgress: {
        ...prev.questProgress,
        [quest.id]: {
          started: true,
          startedAt: new Date().toISOString(),
          completedObjectives: []
        }
      }
    }));
    showNotification(`🚀 Bắt đầu nhiệm vụ: ${quest.name}`, 'info');
  }, [showNotification]);

  // Cập nhật tiến trình nhiệm vụ
  const updateQuestProgress = useCallback((questId, objectiveId) => {
    setGameState(prev => {
      const questProg = prev.questProgress[questId] || { completedObjectives: [] };
      
      if (questProg.completedObjectives.includes(objectiveId)) {
        return prev;
      }

      const newCompletedObjectives = [...questProg.completedObjectives, objectiveId];
      const quest = getQuestById(questId);
      
      // Kiểm tra hoàn thành tất cả objectives
      const allCompleted = quest.objectives.every(obj => 
        newCompletedObjectives.includes(obj.id)
      );

      return {
        ...prev,
        questProgress: {
          ...prev.questProgress,
          [questId]: {
            ...questProg,
            completedObjectives: newCompletedObjectives
          }
        },
        completedQuests: allCompleted && !prev.completedQuests.includes(questId)
          ? [...prev.completedQuests, questId]
          : prev.completedQuests
      };
    });
  }, []);

  // Nhận phần thưởng nhiệm vụ
  const claimQuestReward = useCallback((quest) => {
    if (!gameState.completedQuests.includes(quest.id)) {
      showNotification('❌ Nhiệm vụ chưa hoàn thành!', 'error');
      return false;
    }

    if (gameState.questProgress[quest.id]?.claimed) {
      showNotification('❌ Đã nhận thưởng rồi!', 'error');
      return false;
    }

    // Phát phần thưởng
    quest.rewards.forEach(reward => {
      if (reward.type === 'exp') {
        addExperience(reward.amount);
      } else if (reward.ingredientId) {
        addKnowledge(reward.ingredientId, reward.amount);
      } else if (reward.type === 'title') {
        setGameState(prev => ({
          ...prev,
          titles: [...prev.titles, reward.title]
        }));
        showNotification(`🏅 Nhận danh hiệu: ${reward.title}`, 'success');
      }
    });

    // Đánh dấu đã nhận thưởng
    setGameState(prev => ({
      ...prev,
      questProgress: {
        ...prev.questProgress,
        [quest.id]: {
          ...prev.questProgress[quest.id],
          claimed: true,
          claimedAt: new Date().toISOString()
        }
      },
      statistics: {
        ...prev.statistics,
        totalQuestsCompleted: prev.statistics.totalQuestsCompleted + 1
      }
    }));

    showNotification(`🎁 Đã nhận phần thưởng từ: ${quest.name}!`, 'success');
    return true;
  }, [gameState, addExperience, addKnowledge, showNotification]);

  // Thêm thành tựu
  const unlockAchievement = useCallback((achievementId, title) => {
    if (gameState.achievements.includes(achievementId)) return;

    setGameState(prev => ({
      ...prev,
      achievements: [...prev.achievements, achievementId]
    }));
    
    showNotification(`🏆 Mở khóa thành tựu: ${title}!`, 'success');
  }, [gameState.achievements, showNotification]);

  // Export/Import save
  const exportSave = useCallback(() => {
    const data = JSON.stringify(gameState);
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `chemistry_lab_save_${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  }, [gameState]);

  const importSave = useCallback((file) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const imported = JSON.parse(e.target.result);
        setGameState({
          ...DEFAULT_GAME_STATE,
          ...imported
        });
        showNotification('Import thành công!', 'success');
      } catch (error) {
        showNotification('Lỗi import file!', 'error');
      }
    };
    reader.readAsText(file);
  }, [showNotification]);

  return {
    // State
    gameState,
    isLoading,
    notifications,
    
    // Getters
    playerLevel: gameState.playerLevel,
    experience: gameState.experience,
    knowledgeInventory: gameState.knowledgeInventory,
    chemicalInventory: gameState.chemicalInventory,
    unlockedChemicals: gameState.unlockedChemicals,
    unlockedReactions: gameState.unlockedReactions,
    completedReactions: gameState.completedReactions,
    completedQuests: gameState.completedQuests,
    questProgress: gameState.questProgress,
    dailyQuestStatus: gameState.dailyQuestStatus,
    achievements: gameState.achievements,
    statistics: gameState.statistics,
    
    // Actions
    saveGame,
    resetGame,
    addExperience,
    addKnowledge,
    removeKnowledge,
    addChemical,
    removeChemical,
    craftChemical,
    performReaction,
    startQuest,
    updateQuestProgress,
    claimQuestReward,
    unlockAchievement,
    showNotification,
    exportSave,
    importSave
  };
};

export default useGameProgress;
