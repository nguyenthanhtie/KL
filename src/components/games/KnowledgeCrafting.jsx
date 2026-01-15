import React, { useState, useEffect, useMemo } from 'react';
import { 
  knowledgeIngredients, 
  craftingRecipes, 
  rarityInfo,
  getIngredientById,
  canCraftRecipe 
} from '../../data/knowledgeIngredientsData';
import { chemicals } from '../../data/chemicalsData';

const KnowledgeCrafting = ({ 
  ingredientInventory, 
  chemicalInventory,
  playerLevel,
  onCraft,
  onClose 
}) => {
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [isCrafting, setIsCrafting] = useState(false);
  const [craftProgress, setCraftProgress] = useState(0);
  const [filter, setFilter] = useState('all');
  const [showIngredients, setShowIngredients] = useState(true);

  // Lọc công thức theo điều kiện
  const filteredRecipes = useMemo(() => {
    let filtered = [...craftingRecipes];
    
    if (filter === 'available') {
      filtered = filtered.filter(recipe => 
        canCraftRecipe(recipe, ingredientInventory, playerLevel).canCraft
      );
    } else if (filter === 'level') {
      filtered = filtered.filter(recipe => recipe.requiredLevel <= playerLevel);
    }
    
    return filtered.sort((a, b) => a.requiredLevel - b.requiredLevel);
  }, [filter, ingredientInventory, playerLevel]);

  // Xử lý chế tạo
  const handleCraft = async (recipe) => {
    const { canCraft, reason } = canCraftRecipe(recipe, ingredientInventory, playerLevel);
    
    if (!canCraft) {
      alert(reason);
      return;
    }

    setIsCrafting(true);
    setCraftProgress(0);

    // Animation tiến trình
    const duration = recipe.craftTime || 2000;
    const interval = 50;
    const steps = duration / interval;
    let currentStep = 0;

    const progressInterval = setInterval(() => {
      currentStep++;
      setCraftProgress((currentStep / steps) * 100);
      
      if (currentStep >= steps) {
        clearInterval(progressInterval);
        setIsCrafting(false);
        setCraftProgress(0);
        
        // Gọi callback để cập nhật inventory
        if (onCraft) {
          onCraft(recipe);
        }
        
        setSelectedRecipe(null);
      }
    }, interval);
  };

  const getChemicalById = (id) => {
    return chemicals.find(c => c.id === id);
  };

  return (
    <div className="knowledge-crafting bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 min-h-screen p-4 md:p-6">
      {/* Header */}
      <div className="header bg-white/10 backdrop-blur-md rounded-2xl p-4 md:p-6 mb-6 border border-white/20">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-white flex items-center gap-3">
              <span className="text-4xl">🧪</span>
              Xưởng Chế tạo Kiến thức
            </h2>
            <p className="text-purple-200 mt-1">
              Kết hợp kiến thức để tạo ra các hóa chất mới
            </p>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="bg-purple-600/50 px-4 py-2 rounded-lg">
              <span className="text-white font-bold">Level {playerLevel}</span>
            </div>
            {onClose && (
              <button 
                onClick={onClose}
                className="p-2 rounded-lg bg-red-500/50 hover:bg-red-500 text-white transition"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* Filter tabs */}
        <div className="flex gap-2 mt-4 flex-wrap">
          <button
            onClick={() => setFilter('all')}
            className={`px-4 py-2 rounded-lg transition ${
              filter === 'all' 
                ? 'bg-purple-500 text-white' 
                : 'bg-white/10 text-white/70 hover:bg-white/20'
            }`}
          >
            Tất cả
          </button>
          <button
            onClick={() => setFilter('available')}
            className={`px-4 py-2 rounded-lg transition ${
              filter === 'available' 
                ? 'bg-green-500 text-white' 
                : 'bg-white/10 text-white/70 hover:bg-white/20'
            }`}
          >
            Có thể chế tạo
          </button>
          <button
            onClick={() => setFilter('level')}
            className={`px-4 py-2 rounded-lg transition ${
              filter === 'level' 
                ? 'bg-blue-500 text-white' 
                : 'bg-white/10 text-white/70 hover:bg-white/20'
            }`}
          >
            Theo level
          </button>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Kho nguyên liệu kiến thức */}
        <div className="lg:col-span-1">
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 md:p-6 border border-white/20">
            <button
              onClick={() => setShowIngredients(!showIngredients)}
              className="w-full flex justify-between items-center text-xl font-bold text-white mb-4"
            >
              <span className="flex items-center gap-2">
                <span className="text-2xl">📚</span>
                Kho Kiến thức
              </span>
              <span className="text-lg">{showIngredients ? '▼' : '▶'}</span>
            </button>
            
            {showIngredients && (
              <div className="space-y-2 max-h-[60vh] overflow-y-auto pr-2">
                {knowledgeIngredients.map(ingredient => {
                  const quantity = ingredientInventory[ingredient.id] || 0;
                  const rarityData = rarityInfo[ingredient.rarity];
                  
                  return (
                    <div 
                      key={ingredient.id}
                      className={`ingredient-item p-3 rounded-lg transition ${
                        quantity > 0 
                          ? 'bg-white/20 hover:bg-white/30' 
                          : 'bg-white/5 opacity-50'
                      }`}
                      style={{
                        borderLeft: `4px solid ${ingredient.color}`,
                        boxShadow: quantity > 0 ? `0 0 10px ${rarityData.glowColor}` : 'none'
                      }}
                    >
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-3">
                          <span className="text-2xl">{ingredient.icon}</span>
                          <div>
                            <div className="font-semibold text-white text-sm">
                              {ingredient.name}
                            </div>
                            <div 
                              className="text-xs"
                              style={{ color: rarityData.color }}
                            >
                              {rarityData.name}
                            </div>
                          </div>
                        </div>
                        <div 
                          className={`text-xl font-bold ${
                            quantity > 0 ? 'text-green-400' : 'text-gray-500'
                          }`}
                        >
                          ×{quantity}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* Danh sách công thức chế tạo */}
        <div className="lg:col-span-2">
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 md:p-6 border border-white/20">
            <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <span className="text-2xl">⚗️</span>
              Công thức Chế tạo
              <span className="text-sm font-normal text-purple-300">
                ({filteredRecipes.length} công thức)
              </span>
            </h3>

            <div className="grid sm:grid-cols-2 gap-4 max-h-[70vh] overflow-y-auto pr-2">
              {filteredRecipes.map(recipe => {
                const chemical = getChemicalById(recipe.resultChemical);
                const { canCraft, reason } = canCraftRecipe(recipe, ingredientInventory, playerLevel);
                const isSelected = selectedRecipe?.id === recipe.id;

                return (
                  <div
                    key={recipe.id}
                    onClick={() => setSelectedRecipe(isSelected ? null : recipe)}
                    className={`recipe-card p-4 rounded-xl cursor-pointer transition-all transform ${
                      canCraft 
                        ? 'bg-gradient-to-br from-green-500/20 to-emerald-600/20 hover:scale-105 border-green-500/50' 
                        : 'bg-white/5 border-white/10'
                    } border-2 ${isSelected ? 'ring-2 ring-yellow-400 scale-105' : ''}`}
                  >
                    {/* Header */}
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex items-center gap-3">
                        <div 
                          className="w-12 h-12 rounded-lg flex items-center justify-center text-xl font-bold"
                          style={{ 
                            backgroundColor: chemical?.color === 'colorless' || chemical?.color === 'transparent'
                              ? '#E5E7EB' 
                              : chemical?.color || '#6B7280'
                          }}
                        >
                          {chemical?.formula?.charAt(0) || '?'}
                        </div>
                        <div>
                          <h4 className="font-bold text-white">{chemical?.formula}</h4>
                          <p className="text-xs text-purple-300">{chemical?.name}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-green-400 font-bold">×{recipe.resultAmount}</div>
                        <div className="text-xs text-purple-300">Level {recipe.requiredLevel}</div>
                      </div>
                    </div>

                    {/* Nguyên liệu cần */}
                    <div className="ingredients mb-3">
                      <div className="text-xs text-purple-400 mb-1">Nguyên liệu cần:</div>
                      <div className="flex flex-wrap gap-1">
                        {recipe.ingredients.map(ing => {
                          const ingredient = getIngredientById(ing.ingredientId);
                          const owned = ingredientInventory[ing.ingredientId] || 0;
                          const hasEnough = owned >= ing.amount;
                          
                          return (
                            <div 
                              key={ing.ingredientId}
                              className={`flex items-center gap-1 px-2 py-1 rounded text-xs ${
                                hasEnough 
                                  ? 'bg-green-500/30 text-green-300' 
                                  : 'bg-red-500/30 text-red-300'
                              }`}
                              title={ingredient?.name}
                            >
                              <span>{ingredient?.icon}</span>
                              <span>{owned}/{ing.amount}</span>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* Phần thưởng */}
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-yellow-400">
                        ⭐ +{recipe.expReward} EXP
                      </span>
                      {!canCraft && (
                        <span className="text-xs text-red-400">
                          {reason}
                        </span>
                      )}
                    </div>

                    {/* Expanded view */}
                    {isSelected && (
                      <div className="mt-4 pt-4 border-t border-white/20">
                        <p className="text-sm text-purple-200 mb-3">
                          {recipe.description}
                        </p>
                        
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleCraft(recipe);
                          }}
                          disabled={!canCraft || isCrafting}
                          className={`w-full py-3 rounded-lg font-bold transition ${
                            canCraft && !isCrafting
                              ? 'bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white'
                              : 'bg-gray-600 text-gray-400 cursor-not-allowed'
                          }`}
                        >
                          {isCrafting ? (
                            <div className="flex items-center justify-center gap-2">
                              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                              Đang chế tạo...
                            </div>
                          ) : canCraft ? (
                            '⚗️ Chế tạo ngay'
                          ) : (
                            '🔒 Chưa đủ điều kiện'
                          )}
                        </button>

                        {/* Progress bar khi đang chế tạo */}
                        {isCrafting && selectedRecipe?.id === recipe.id && (
                          <div className="mt-3">
                            <div className="w-full bg-white/20 rounded-full h-2 overflow-hidden">
                              <div 
                                className="bg-gradient-to-r from-purple-500 to-pink-500 h-full transition-all duration-100"
                                style={{ width: `${craftProgress}%` }}
                              />
                            </div>
                            <p className="text-center text-xs text-purple-300 mt-1">
                              {Math.round(craftProgress)}%
                            </p>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {filteredRecipes.length === 0 && (
              <div className="text-center py-12 text-purple-300">
                <div className="text-4xl mb-3">🔍</div>
                <p>Không có công thức nào phù hợp</p>
                <p className="text-sm mt-1">Thử thay đổi bộ lọc hoặc thu thập thêm kiến thức</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20 text-center">
          <div className="text-3xl mb-1">📚</div>
          <div className="text-2xl font-bold text-white">
            {Object.values(ingredientInventory).reduce((a, b) => a + b, 0)}
          </div>
          <div className="text-sm text-purple-300">Kiến thức thu thập</div>
        </div>
        
        <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20 text-center">
          <div className="text-3xl mb-1">🧪</div>
          <div className="text-2xl font-bold text-white">
            {Object.values(chemicalInventory).reduce((a, b) => a + b, 0)}
          </div>
          <div className="text-sm text-purple-300">Hóa chất trong kho</div>
        </div>
        
        <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20 text-center">
          <div className="text-3xl mb-1">⚗️</div>
          <div className="text-2xl font-bold text-white">
            {filteredRecipes.filter(r => 
              canCraftRecipe(r, ingredientInventory, playerLevel).canCraft
            ).length}
          </div>
          <div className="text-sm text-purple-300">Có thể chế tạo</div>
        </div>
        
        <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20 text-center">
          <div className="text-3xl mb-1">🔓</div>
          <div className="text-2xl font-bold text-white">
            {craftingRecipes.filter(r => r.requiredLevel <= playerLevel).length}
          </div>
          <div className="text-sm text-purple-300">Công thức đã mở</div>
        </div>
      </div>
    </div>
  );
};

export default KnowledgeCrafting;
