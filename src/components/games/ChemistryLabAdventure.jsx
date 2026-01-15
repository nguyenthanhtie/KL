import React, { useState } from 'react';
import useGameProgress from '../../hooks/useGameProgress';
import KnowledgeCrafting from './KnowledgeCrafting';
import QuestBoard from './QuestBoard';
import { chemicals, reactions, reactionRewards } from '../../data/chemicalsData';
import { knowledgeIngredients, rarityInfo } from '../../data/knowledgeIngredientsData';

const ChemistryLabAdventure = () => {
  const [activeView, setActiveView] = useState('dashboard');
  const [selectedReaction, setSelectedReaction] = useState(null);
  const [showReactionModal, setShowReactionModal] = useState(false);

  const {
    playerLevel,
    experience,
    knowledgeInventory,
    chemicalInventory,
    unlockedChemicals,
    unlockedReactions,
    completedReactions,
    completedQuests,
    questProgress,
    dailyQuestStatus,
    statistics,
    notifications,
    craftChemical,
    performReaction,
    startQuest,
    claimQuestReward,
    showNotification,
    saveGame,
    resetGame,
    isLoading
  } = useGameProgress();

  // Tính toán EXP
  const expToNextLevel = ((playerLevel) * 100) - experience;
  const expProgress = (experience % 100);

  // Lấy thông tin hóa chất
  const getChemicalById = (id) => chemicals.find(c => c.id === id);
  const getReactionById = (id) => reactions.find(r => r.id === id);

  // Kiểm tra có thể thực hiện phản ứng không
  const canPerformReaction = (reaction) => {
    return reaction.reactants.every(reactantId => 
      chemicalInventory[reactantId] && chemicalInventory[reactantId] > 0
    );
  };

  // Xử lý chế tạo
  const handleCraft = (recipe) => {
    craftChemical(recipe);
  };

  // Xử lý phản ứng
  const handleReaction = (reaction) => {
    if (performReaction(reaction)) {
      const reward = reactionRewards[reaction.id];
      if (reward) {
        showNotification(`✨ +${reward.points} EXP`, 'success');
      }
      setShowReactionModal(false);
      setSelectedReaction(null);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-white text-xl">Đang tải...</p>
        </div>
      </div>
    );
  }

  // Render sub-views
  if (activeView === 'crafting') {
    return (
      <KnowledgeCrafting
        ingredientInventory={knowledgeInventory}
        chemicalInventory={chemicalInventory}
        playerLevel={playerLevel}
        onCraft={handleCraft}
        onClose={() => setActiveView('dashboard')}
      />
    );
  }

  if (activeView === 'quests') {
    return (
      <QuestBoard
        playerLevel={playerLevel}
        completedQuests={completedQuests}
        questProgress={questProgress}
        dailyQuestStatus={dailyQuestStatus}
        onStartQuest={startQuest}
        onClaimReward={claimQuestReward}
        onClose={() => setActiveView('dashboard')}
      />
    );
  }

  // Main Dashboard
  return (
    <div className="chemistry-lab-adventure min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 p-4 md:p-6">
      {/* Notifications */}
      <div className="fixed top-4 right-4 z-50 space-y-2">
        {notifications.map(notif => (
          <div
            key={notif.id}
            className={`px-4 py-3 rounded-lg shadow-lg animate-bounce text-white font-semibold ${
              notif.type === 'success' ? 'bg-green-500' :
              notif.type === 'error' ? 'bg-red-500' :
              'bg-blue-500'
            }`}
          >
            {notif.message}
          </div>
        ))}
      </div>

      {/* Header */}
      <div className="header bg-white/10 backdrop-blur-md rounded-2xl p-4 md:p-6 mb-6 border border-white/20">
        <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-white flex items-center gap-3">
              <span className="text-5xl">🧪</span>
              Phòng Thí Nghiệm Phiêu Lưu
            </h1>
            <p className="text-purple-200 mt-1">
              Thu thập kiến thức - Chế tạo hóa chất - Khám phá phản ứng
            </p>
          </div>
          
          <div className="flex items-center gap-4">
            {/* Player Stats */}
            <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-4 rounded-xl">
              <div className="flex items-center gap-4">
                <div className="text-center">
                  <div className="text-3xl font-bold text-white">{playerLevel}</div>
                  <div className="text-xs text-purple-200">LEVEL</div>
                </div>
                <div className="w-px h-10 bg-white/30"></div>
                <div>
                  <div className="text-sm text-purple-200 mb-1">EXP: {experience}</div>
                  <div className="w-32 bg-white/20 rounded-full h-2">
                    <div 
                      className="bg-yellow-400 h-full rounded-full transition-all"
                      style={{ width: `${expProgress}%` }}
                    />
                  </div>
                  <div className="text-xs text-purple-200 mt-1">
                    {expToNextLevel} EXP đến level tiếp
                  </div>
                </div>
              </div>
            </div>

            {/* Save/Reset buttons */}
            <div className="flex flex-col gap-2">
              <button
                onClick={saveGame}
                className="px-4 py-2 bg-green-500/50 hover:bg-green-500 text-white rounded-lg transition text-sm"
              >
                💾 Lưu
              </button>
              <button
                onClick={resetGame}
                className="px-4 py-2 bg-red-500/30 hover:bg-red-500 text-white rounded-lg transition text-sm"
              >
                🔄 Reset
              </button>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex gap-3 mt-6 flex-wrap">
          <button
            onClick={() => setActiveView('dashboard')}
            className={`px-6 py-3 rounded-xl font-bold transition flex items-center gap-2 ${
              activeView === 'dashboard'
                ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg'
                : 'bg-white/10 text-white/70 hover:bg-white/20'
            }`}
          >
            🏠 Tổng quan
          </button>
          <button
            onClick={() => setActiveView('quests')}
            className={`px-6 py-3 rounded-xl font-bold transition flex items-center gap-2 ${
              activeView === 'quests'
                ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg'
                : 'bg-white/10 text-white/70 hover:bg-white/20'
            }`}
          >
            📜 Nhiệm vụ
            {completedQuests.length > 0 && (
              <span className="bg-green-500 text-white text-xs px-2 py-0.5 rounded-full">
                {completedQuests.length}
              </span>
            )}
          </button>
          <button
            onClick={() => setActiveView('crafting')}
            className={`px-6 py-3 rounded-xl font-bold transition flex items-center gap-2 ${
              activeView === 'crafting'
                ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg'
                : 'bg-white/10 text-white/70 hover:bg-white/20'
            }`}
          >
            ⚗️ Chế tạo
          </button>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Left Column - Knowledge Inventory */}
        <div className="lg:col-span-1 space-y-6">
          {/* Kho Kiến thức */}
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 md:p-6 border border-white/20">
            <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <span className="text-2xl">📚</span>
              Kho Kiến thức
            </h3>
            <div className="space-y-2 max-h-64 overflow-y-auto pr-2">
              {knowledgeIngredients.slice(0, 10).map(ingredient => {
                const quantity = knowledgeInventory[ingredient.id] || 0;
                if (quantity === 0) return null;
                
                const rarityData = rarityInfo[ingredient.rarity];
                
                return (
                  <div 
                    key={ingredient.id}
                    className="flex items-center justify-between p-2 rounded-lg bg-white/10"
                    style={{ borderLeft: `3px solid ${ingredient.color}` }}
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-xl">{ingredient.icon}</span>
                      <div>
                        <div className="text-sm text-white">{ingredient.name}</div>
                        <div className="text-xs" style={{ color: rarityData.color }}>
                          {rarityData.name}
                        </div>
                      </div>
                    </div>
                    <span className="text-green-400 font-bold">×{quantity}</span>
                  </div>
                );
              })}
            </div>
            <button
              onClick={() => setActiveView('crafting')}
              className="w-full mt-4 py-2 bg-purple-500/50 hover:bg-purple-500 text-white rounded-lg transition"
            >
              Xem tất cả →
            </button>
          </div>

          {/* Kho Hóa chất */}
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 md:p-6 border border-white/20">
            <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <span className="text-2xl">🧪</span>
              Kho Hóa chất
            </h3>
            <div className="space-y-2 max-h-64 overflow-y-auto pr-2">
              {unlockedChemicals.map(chemId => {
                const chemical = getChemicalById(chemId);
                const quantity = chemicalInventory[chemId] || 0;
                
                return (
                  <div 
                    key={chemId}
                    className={`flex items-center justify-between p-2 rounded-lg transition ${
                      quantity > 0 ? 'bg-white/20' : 'bg-white/5 opacity-50'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <div 
                        className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold"
                        style={{ 
                          backgroundColor: chemical?.color === 'colorless' || chemical?.color === 'transparent'
                            ? '#9CA3AF'
                            : chemical?.color || '#6B7280'
                        }}
                      >
                        {chemical?.formula?.charAt(0)}
                      </div>
                      <div>
                        <div className="text-sm text-white font-mono">{chemical?.formula}</div>
                        <div className="text-xs text-purple-300">{chemical?.name}</div>
                      </div>
                    </div>
                    <span className={`font-bold ${quantity > 0 ? 'text-green-400' : 'text-gray-500'}`}>
                      ×{quantity}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Middle & Right Columns - Reactions Lab */}
        <div className="lg:col-span-2">
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 md:p-6 border border-white/20">
            <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <span className="text-2xl">⚗️</span>
              Bảng Thí nghiệm
              <span className="text-sm font-normal text-purple-300">
                (Thực hiện phản ứng hóa học)
              </span>
            </h3>

            <div className="grid sm:grid-cols-2 gap-4">
              {unlockedReactions.map(reactionId => {
                const reaction = getReactionById(reactionId);
                if (!reaction) return null;
                
                const canDo = canPerformReaction(reaction);
                const isCompleted = completedReactions.includes(reactionId);
                const reward = reactionRewards[reactionId];

                return (
                  <div
                    key={reactionId}
                    onClick={() => {
                      if (canDo) {
                        setSelectedReaction(reaction);
                        setShowReactionModal(true);
                      }
                    }}
                    className={`reaction-card p-4 rounded-xl cursor-pointer transition-all ${
                      canDo 
                        ? 'bg-gradient-to-br from-green-500/20 to-emerald-600/20 hover:scale-105 border-green-500/50' 
                        : 'bg-white/5 border-white/10'
                    } border-2`}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-bold text-white">{reaction.name}</h4>
                      {isCompleted && <span className="text-xl">✅</span>}
                    </div>

                    {/* Phương trình */}
                    <div className="text-sm font-mono text-purple-200 bg-white/10 p-2 rounded mb-3">
                      {reaction.equation}
                    </div>

                    {/* Nguyên liệu */}
                    <div className="mb-2">
                      <div className="text-xs text-purple-400 mb-1">Cần:</div>
                      <div className="flex flex-wrap gap-1">
                        {reaction.reactants.map(reactantId => {
                          const chemical = getChemicalById(reactantId);
                          const hasEnough = (chemicalInventory[reactantId] || 0) > 0;
                          return (
                            <span 
                              key={reactantId}
                              className={`text-xs px-2 py-0.5 rounded ${
                                hasEnough ? 'bg-green-500/30 text-green-300' : 'bg-red-500/30 text-red-300'
                              }`}
                            >
                              {chemical?.formula}
                            </span>
                          );
                        })}
                      </div>
                    </div>

                    {/* Sản phẩm */}
                    <div className="mb-2">
                      <div className="text-xs text-purple-400 mb-1">Tạo ra:</div>
                      <div className="flex flex-wrap gap-1">
                        {reaction.products.map(productId => {
                          const chemical = getChemicalById(productId);
                          return (
                            <span 
                              key={productId}
                              className="text-xs px-2 py-0.5 rounded bg-blue-500/30 text-blue-300"
                            >
                              {chemical?.formula}
                            </span>
                          );
                        })}
                      </div>
                    </div>

                    {/* Rewards */}
                    {reward && (
                      <div className="text-xs text-yellow-400 font-semibold">
                        ⭐ +{reward.points} EXP
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Hint */}
            <div className="mt-6 p-4 bg-yellow-500/20 border border-yellow-500/50 rounded-xl">
              <h4 className="font-bold text-yellow-300 mb-2">💡 Mẹo</h4>
              <p className="text-sm text-yellow-100">
                Hoàn thành <strong>nhiệm vụ học tập</strong> để thu thập <strong>kiến thức</strong>, 
                sau đó sử dụng kiến thức trong <strong>xưởng chế tạo</strong> để tạo ra hóa chất mới. 
                Có đủ hóa chất? Thực hiện các phản ứng ở đây để nhận điểm kinh nghiệm!
              </p>
            </div>
          </div>

          {/* Statistics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20 text-center">
              <div className="text-3xl mb-1">🧪</div>
              <div className="text-2xl font-bold text-white">{statistics.totalReactions}</div>
              <div className="text-sm text-purple-300">Phản ứng</div>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20 text-center">
              <div className="text-3xl mb-1">⚗️</div>
              <div className="text-2xl font-bold text-white">{statistics.totalCrafts}</div>
              <div className="text-sm text-purple-300">Chế tạo</div>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20 text-center">
              <div className="text-3xl mb-1">📜</div>
              <div className="text-2xl font-bold text-white">{statistics.totalQuestsCompleted}</div>
              <div className="text-sm text-purple-300">Nhiệm vụ</div>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20 text-center">
              <div className="text-3xl mb-1">🔥</div>
              <div className="text-2xl font-bold text-white">{statistics.loginStreak}</div>
              <div className="text-sm text-purple-300">Streak ngày</div>
            </div>
          </div>
        </div>
      </div>

      {/* Reaction Modal */}
      {showReactionModal && selectedReaction && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-gradient-to-br from-indigo-900 to-purple-900 rounded-2xl max-w-lg w-full p-6 border border-white/20">
            <h3 className="text-2xl font-bold text-white mb-4">
              ⚗️ Thực hiện phản ứng
            </h3>
            
            <div className="mb-4">
              <h4 className="font-bold text-lg text-white mb-2">{selectedReaction.name}</h4>
              <div className="text-lg font-mono text-purple-200 bg-white/10 p-3 rounded-lg mb-3">
                {selectedReaction.equation}
              </div>
              <p className="text-purple-300 mb-2">{selectedReaction.description}</p>
              <p className="text-sm text-purple-400">
                <strong>Điều kiện:</strong> {selectedReaction.conditions}
              </p>
              <p className="text-sm text-purple-400">
                <strong>Năng lượng:</strong> {selectedReaction.energy} kJ/mol
                {selectedReaction.energy < 0 ? ' (tỏa nhiệt 🔥)' : ' (thu nhiệt ❄️)'}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6 p-4 bg-white/10 rounded-lg">
              <div>
                <h5 className="font-bold text-red-400 mb-2">Tiêu tốn:</h5>
                {selectedReaction.reactants.map(id => {
                  const chemical = getChemicalById(id);
                  return (
                    <div key={id} className="text-sm text-white">
                      - 1 {chemical?.formula}
                    </div>
                  );
                })}
              </div>
              <div>
                <h5 className="font-bold text-green-400 mb-2">Nhận được:</h5>
                {selectedReaction.products.map(id => {
                  const chemical = getChemicalById(id);
                  return (
                    <div key={id} className="text-sm text-white">
                      + 1 {chemical?.formula}
                    </div>
                  );
                })}
                {reactionRewards[selectedReaction.id] && (
                  <div className="text-sm text-yellow-400 mt-2">
                    + {reactionRewards[selectedReaction.id].points} EXP ⭐
                  </div>
                )}
              </div>
            </div>

            <div className="flex gap-4">
              <button
                onClick={() => handleReaction(selectedReaction)}
                className="flex-1 py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-lg font-bold hover:from-green-600 hover:to-emerald-600 transition"
              >
                ⚗️ Thực hiện
              </button>
              <button
                onClick={() => {
                  setShowReactionModal(false);
                  setSelectedReaction(null);
                }}
                className="px-6 py-3 bg-gray-600 text-white rounded-lg font-bold hover:bg-gray-700 transition"
              >
                Hủy
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChemistryLabAdventure;
