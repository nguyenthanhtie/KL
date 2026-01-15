import React, { useState, useEffect, useCallback } from 'react';
import { chemicals, reactions, unlockRequirements, reactionRewards } from '../data/chemicalsData';

const ChemistryLabGame = () => {
  const [playerLevel, setPlayerLevel] = useState(1);
  const [experience, setExperience] = useState(0);
  const [inventory, setInventory] = useState({
    'H2O': 5,
    'HCl': 3,
    'NaOH': 3,
    'O2': 5,
    'H2': 5
  });
  const [unlockedChemicals, setUnlockedChemicals] = useState(['H2O', 'HCl', 'NaOH', 'O2', 'H2']);
  const [unlockedReactions, setUnlockedReactions] = useState(['neutralization_1', 'synthesis_1']);
  const [completedReactions, setCompletedReactions] = useState([]);
  const [selectedReaction, setSelectedReaction] = useState(null);
  const [showCraftModal, setShowCraftModal] = useState(false);
  const [notification, setNotification] = useState(null);

  const showNotification = useCallback((message, type = 'info') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  }, []);

  const checkUnlocks = useCallback((level) => {
    // Mở khóa hóa chất mới
    Object.entries(unlockRequirements.chemicals).forEach(([chemId, req]) => {
      if (req.level <= level && !unlockedChemicals.includes(chemId)) {
        const allRequirementsMet = req.required.every(reqReaction => 
          completedReactions.includes(reqReaction)
        );
        
        if (allRequirementsMet) {
          setUnlockedChemicals(prev => [...prev, chemId]);
          const chemical = chemicals.find(c => c.id === chemId);
          showNotification(`🔓 Đã mở khóa: ${chemical.name}`, 'success');
        }
      }
    });

    // Mở khóa phản ứng mới
    Object.entries(unlockRequirements.reactions).forEach(([reactionId, req]) => {
      if (req.level <= level && !unlockedReactions.includes(reactionId)) {
        const hasAllChemicals = req.requiredChemicals.every(chemId =>
          unlockedChemicals.includes(chemId) || inventory[chemId] > 0
        );
        
        if (hasAllChemicals) {
          setUnlockedReactions(prev => [...prev, reactionId]);
          const reaction = reactions.find(r => r.id === reactionId);
          showNotification(`🔓 Đã mở khóa phản ứng: ${reaction.name}`, 'success');
        }
      }
    });
  }, [unlockedChemicals, completedReactions, inventory, unlockedReactions, showNotification]);

  // Tính toán level từ experience
  useEffect(() => {
    const newLevel = Math.floor(experience / 100) + 1;
    if (newLevel > playerLevel) {
      setPlayerLevel(newLevel);
      showNotification(`🎉 Chúc mừng! Bạn đã lên cấp ${newLevel}!`, 'success');
      checkUnlocks(newLevel);
    }
  }, [experience, playerLevel, showNotification, checkUnlocks]);

  const canPerformReaction = (reaction) => {
    return reaction.reactants.every(reactantId => {
      return inventory[reactantId] && inventory[reactantId] > 0;
    });
  };

  const performReaction = (reaction) => {
    if (!canPerformReaction(reaction)) {
      showNotification('❌ Không đủ nguyên liệu!', 'error');
      return;
    }

    // Trừ nguyên liệu
    const newInventory = { ...inventory };
    reaction.reactants.forEach(reactantId => {
      newInventory[reactantId] = (newInventory[reactantId] || 0) - 1;
    });

    // Thêm sản phẩm
    reaction.products.forEach(productId => {
      newInventory[productId] = (newInventory[productId] || 0) + 1;
    });

    setInventory(newInventory);

    // Thêm điểm kinh nghiệm
    const reward = reactionRewards[reaction.id];
    if (reward) {
      setExperience(prev => prev + reward.points);
      showNotification(`✨ +${reward.points} EXP`, 'success');
    }

    // Đánh dấu hoàn thành
    if (!completedReactions.includes(reaction.id)) {
      setCompletedReactions(prev => [...prev, reaction.id]);
    }

    setShowCraftModal(false);
    setSelectedReaction(null);
  };

  const getChemicalById = (id) => {
    return chemicals.find(c => c.id === id);
  };

  const getReactionById = (id) => {
    return reactions.find(r => r.id === id);
  };

  const expToNextLevel = ((playerLevel) * 100) - experience;
  const expProgress = (experience % 100);

  return (
    <div className="chemistry-lab-game min-h-screen bg-gradient-to-br from-indigo-900 via-purple-800 to-pink-700 p-6">
      {/* Header với thông tin người chơi */}
      <div className="player-info bg-white bg-opacity-90 rounded-2xl p-6 mb-6 shadow-2xl">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h2 className="text-3xl font-bold text-purple-900">Phòng Thí Nghiệm Hóa Học</h2>
            <p className="text-gray-600">Thu thập và chế tạo các chất hóa học</p>
          </div>
          <div className="text-right">
            <div className="text-4xl font-bold text-purple-700">Level {playerLevel}</div>
            <div className="text-sm text-gray-600">{experience} EXP</div>
          </div>
        </div>
        
        {/* Thanh kinh nghiệm */}
        <div className="exp-bar">
          <div className="flex justify-between text-sm mb-1">
            <span className="text-gray-600">Tiến trình</span>
            <span className="text-gray-600">{expProgress}/100 ({expToNextLevel} EXP còn lại)</span>
          </div>
          <div className="w-full bg-gray-300 rounded-full h-4 overflow-hidden">
            <div 
              className="bg-gradient-to-r from-purple-500 to-pink-500 h-full transition-all duration-500 rounded-full"
              style={{ width: `${expProgress}%` }}
            />
          </div>
        </div>
      </div>

      {/* Notification */}
      {notification && (
        <div className={`notification fixed top-20 right-6 z-50 p-4 rounded-lg shadow-lg animate-bounce ${
          notification.type === 'success' ? 'bg-green-500' : 
          notification.type === 'error' ? 'bg-red-500' : 'bg-blue-500'
        } text-white font-semibold`}>
          {notification.message}
        </div>
      )}

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Kho nguyên liệu */}
        <div className="inventory-section lg:col-span-1">
          <div className="bg-white bg-opacity-95 rounded-2xl p-6 shadow-xl">
            <h3 className="text-2xl font-bold mb-4 text-purple-900 flex items-center gap-2">
              🧪 Kho Nguyên Liệu
            </h3>
            <div className="space-y-2 max-h-96 overflow-y-auto">
              {unlockedChemicals.map(chemId => {
                const chemical = getChemicalById(chemId);
                const quantity = inventory[chemId] || 0;
                return (
                  <div 
                    key={chemId}
                    className={`inventory-item p-3 rounded-lg border-2 transition ${
                      quantity > 0 
                        ? 'bg-gradient-to-r from-purple-50 to-pink-50 border-purple-300' 
                        : 'bg-gray-50 border-gray-300 opacity-60'
                    }`}
                  >
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-3">
                        <div 
                          className="w-8 h-8 rounded-full border-2 border-gray-300"
                          style={{ 
                            backgroundColor: chemical.color === 'transparent' || chemical.color === 'colorless' 
                              ? '#e5e7eb' 
                              : chemical.color 
                          }}
                        />
                        <div>
                          <div className="font-bold text-gray-900">{chemical.formula}</div>
                          <div className="text-xs text-gray-600">{chemical.name}</div>
                        </div>
                      </div>
                      <div className={`text-2xl font-bold ${quantity > 0 ? 'text-purple-700' : 'text-gray-400'}`}>
                        ×{quantity}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Bảng chế tạo */}
        <div className="crafting-section lg:col-span-2">
          <div className="bg-white bg-opacity-95 rounded-2xl p-6 shadow-xl">
            <h3 className="text-2xl font-bold mb-4 text-purple-900 flex items-center gap-2">
              ⚗️ Bảng Chế Tạo
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              {unlockedReactions.map(reactionId => {
                const reaction = getReactionById(reactionId);
                const canPerform = canPerformReaction(reaction);
                const isCompleted = completedReactions.includes(reactionId);
                
                return (
                  <div 
                    key={reactionId}
                    className={`reaction-card p-4 rounded-lg border-2 transition-all cursor-pointer ${
                      canPerform 
                        ? 'bg-gradient-to-br from-green-50 to-emerald-50 border-green-400 hover:shadow-lg hover:scale-105' 
                        : 'bg-gray-50 border-gray-300 opacity-70'
                    }`}
                    onClick={() => {
                      if (canPerform) {
                        setSelectedReaction(reaction);
                        setShowCraftModal(true);
                      }
                    }}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-bold text-purple-900">{reaction.name}</h4>
                      {isCompleted && <span className="text-2xl">✓</span>}
                    </div>
                    
                    {/* Nguyên liệu cần */}
                    <div className="ingredients mb-2">
                      <div className="text-xs text-gray-600 mb-1">Cần:</div>
                      <div className="flex flex-wrap gap-2">
                        {reaction.reactants.map(reactantId => {
                          const chemical = getChemicalById(reactantId);
                          const hasEnough = inventory[reactantId] > 0;
                          return (
                            <div 
                              key={reactantId}
                              className={`text-sm px-2 py-1 rounded ${
                                hasEnough ? 'bg-green-200 text-green-800' : 'bg-red-200 text-red-800'
                              }`}
                            >
                              {chemical.formula}
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* Sản phẩm */}
                    <div className="products">
                      <div className="text-xs text-gray-600 mb-1">Tạo ra:</div>
                      <div className="flex flex-wrap gap-2">
                        {reaction.products.map(productId => {
                          const chemical = getChemicalById(productId);
                          return (
                            <div 
                              key={productId}
                              className="text-sm px-2 py-1 rounded bg-blue-200 text-blue-800"
                            >
                              {chemical.formula}
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* Phần thưởng */}
                    {reactionRewards[reactionId] && (
                      <div className="reward mt-2 text-xs text-purple-700 font-semibold">
                        ⭐ +{reactionRewards[reactionId].points} EXP
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Thông tin về phản ứng bị khóa */}
            <div className="locked-info mt-6 p-4 bg-yellow-50 border-2 border-yellow-300 rounded-lg">
              <h4 className="font-bold text-yellow-800 mb-2">💡 Mở khóa thêm phản ứng</h4>
              <p className="text-sm text-gray-700">
                Hoàn thành các phản ứng và nâng cấp để mở khóa thêm nhiều phản ứng mới!
              </p>
              <div className="mt-2 text-sm">
                <strong>Tiếp theo:</strong> Level {playerLevel + 1}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal xác nhận chế tạo */}
      {showCraftModal && selectedReaction && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-6 shadow-2xl">
            <h3 className="text-2xl font-bold mb-4 text-purple-900">
              Thực hiện phản ứng
            </h3>
            
            <div className="reaction-details mb-6">
              <h4 className="font-bold text-lg mb-2">{selectedReaction.name}</h4>
              <div className="equation text-xl font-mono mb-3 p-3 bg-gray-100 rounded">
                {selectedReaction.equation}
              </div>
              <p className="text-gray-700 mb-2">{selectedReaction.description}</p>
              <p className="text-sm text-gray-600">
                <strong>Điều kiện:</strong> {selectedReaction.conditions}
              </p>
              <p className="text-sm text-gray-600">
                <strong>Năng lượng:</strong> {selectedReaction.energy} kJ/mol
                {selectedReaction.energy < 0 ? ' (tỏa nhiệt 🔥)' : ' (thu nhiệt ❄️)'}
              </p>
            </div>

            <div className="confirmation p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg mb-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h5 className="font-bold mb-2 text-red-700">Tiêu tốn:</h5>
                  {selectedReaction.reactants.map(reactantId => {
                    const chemical = getChemicalById(reactantId);
                    return (
                      <div key={reactantId} className="text-sm">
                        - 1 {chemical.formula} ({chemical.name})
                      </div>
                    );
                  })}
                </div>
                <div>
                  <h5 className="font-bold mb-2 text-green-700">Nhận được:</h5>
                  {selectedReaction.products.map(productId => {
                    const chemical = getChemicalById(productId);
                    return (
                      <div key={productId} className="text-sm">
                        + 1 {chemical.formula} ({chemical.name})
                      </div>
                    );
                  })}
                  {reactionRewards[selectedReaction.id] && (
                    <div className="text-sm text-purple-700 font-semibold mt-2">
                      + {reactionRewards[selectedReaction.id].points} EXP ⭐
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="flex gap-4">
              <button
                onClick={() => performReaction(selectedReaction)}
                className="flex-1 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:from-purple-700 hover:to-pink-700 transition font-semibold"
              >
                ⚗️ Thực hiện phản ứng
              </button>
              <button
                onClick={() => {
                  setShowCraftModal(false);
                  setSelectedReaction(null);
                }}
                className="px-6 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition font-semibold"
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

export default ChemistryLabGame;
