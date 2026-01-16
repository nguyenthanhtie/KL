import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  quests, 
  dailyQuests, 
  specialChallenges,
  questTypes,
  questStatus,
  getQuestById,
  getAvailableQuests,
  getDifficultyInfo,
  getObjectiveGuide 
} from '../../data/questsData';
import { getIngredientById } from '../../data/knowledgeIngredientsData';

const QuestBoard = ({ 
  playerLevel,
  completedQuests = [],
  questProgress = {},
  dailyQuestStatus = {},
  onStartQuest,
  onClaimReward,
  onClose 
}) => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('available');
  const [selectedQuest, setSelectedQuest] = useState(null);
  const [selectedChapter, setSelectedChapter] = useState(0);

  // Lấy danh sách nhiệm vụ có thể làm
  const availableQuests = useMemo(() => {
    return getAvailableQuests(completedQuests, playerLevel);
  }, [completedQuests, playerLevel]);

  // Lấy nhiệm vụ theo chapter
  const questsByChapter = useMemo(() => {
    const chapters = {};
    quests.forEach(quest => {
      if (!chapters[quest.chapter]) {
        chapters[quest.chapter] = [];
      }
      chapters[quest.chapter].push(quest);
    });
    return chapters;
  }, []);

  // Tính toán tiến trình nhiệm vụ
  const getQuestProgress = (quest) => {
    const progress = questProgress[quest.id];
    if (!progress) return { completed: 0, total: quest.objectives.length, percentage: 0 };
    
    const completed = quest.objectives.filter(obj => 
      progress.completedObjectives?.includes(obj.id)
    ).length;
    
    return {
      completed,
      total: quest.objectives.length,
      percentage: (completed / quest.objectives.length) * 100
    };
  };

  // Kiểm tra trạng thái nhiệm vụ
  const getQuestStatus = (quest) => {
    if (completedQuests.includes(quest.id)) {
      const claimed = questProgress[quest.id]?.claimed;
      return claimed ? questStatus.CLAIMED : questStatus.COMPLETED;
    }
    
    if (questProgress[quest.id]?.started) {
      return questStatus.IN_PROGRESS;
    }
    
    if (availableQuests.find(q => q.id === quest.id)) {
      return questStatus.AVAILABLE;
    }
    
    return questStatus.LOCKED;
  };

  // Icon cho loại nhiệm vụ
  const getQuestTypeIcon = (type) => {
    const icons = {
      [questTypes.LEARN]: '📖',
      [questTypes.QUIZ]: '❓',
      [questTypes.EXPERIMENT]: '🧪',
      [questTypes.DISCOVERY]: '🔍',
      [questTypes.DAILY]: '📅',
      [questTypes.CHALLENGE]: '🏆'
    };
    return icons[type] || '📋';
  };

  // Status badge
  const StatusBadge = ({ status }) => {
    const badges = {
      [questStatus.LOCKED]: { text: '🔒 Chưa mở khóa', color: 'bg-gray-500/50' },
      [questStatus.AVAILABLE]: { text: '✨ Có thể làm', color: 'bg-green-500/50' },
      [questStatus.IN_PROGRESS]: { text: '⏳ Đang làm', color: 'bg-yellow-500/50' },
      [questStatus.COMPLETED]: { text: '✅ Hoàn thành', color: 'bg-blue-500/50' },
      [questStatus.CLAIMED]: { text: '🎁 Đã nhận thưởng', color: 'bg-purple-500/50' }
    };
    
    const badge = badges[status] || badges[questStatus.LOCKED];
    
    return (
      <span className={`px-2 py-1 rounded-full text-xs text-white ${badge.color}`}>
        {badge.text}
      </span>
    );
  };

  // Render danh sách nhiệm vụ
  const renderQuestList = (questList, showProgress = true) => {
    return (
      <div className="space-y-3">
        {questList.map(quest => {
          const status = getQuestStatus(quest);
          const progress = getQuestProgress(quest);
          const difficulty = getDifficultyInfo(quest.difficulty);
          const isLocked = status === questStatus.LOCKED;
          const isSelected = selectedQuest?.id === quest.id;

          return (
            <div
              key={quest.id}
              onClick={() => !isLocked && setSelectedQuest(isSelected ? null : quest)}
              className={`quest-card p-4 rounded-xl cursor-pointer transition-all ${
                isLocked 
                  ? 'bg-white/5 opacity-50 cursor-not-allowed' 
                  : 'bg-white/10 hover:bg-white/20'
              } ${isSelected ? 'ring-2 ring-yellow-400' : ''}`}
            >
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-3">
                  <div className="text-3xl">{quest.icon || getQuestTypeIcon(quest.type)}</div>
                  <div>
                    <h4 className="font-bold text-white flex items-center gap-2">
                      {quest.name}
                      {quest.chapter > 0 && (
                        <span className="text-xs text-purple-300 bg-purple-500/30 px-2 py-0.5 rounded">
                          Ch.{quest.chapter}
                        </span>
                      )}
                    </h4>
                    <p className="text-sm text-purple-300">{quest.description}</p>
                  </div>
                </div>
                <StatusBadge status={status} />
              </div>

              {/* Độ khó và thời gian */}
              <div className="flex items-center gap-4 mt-3 text-sm">
                <div className="flex items-center gap-1">
                  {[...Array(difficulty.stars)].map((_, i) => (
                    <span key={i} style={{ color: difficulty.color }}>★</span>
                  ))}
                  <span className="text-purple-300 ml-1">{difficulty.name}</span>
                </div>
                <div className="text-purple-300">
                  ⏱️ {quest.estimatedTime}
                </div>
                <div className="text-purple-300">
                  Level {quest.requiredLevel}
                </div>
              </div>

              {/* Progress bar */}
              {showProgress && status === questStatus.IN_PROGRESS && (
                <div className="mt-3">
                  <div className="flex justify-between text-xs text-purple-300 mb-1">
                    <span>Tiến trình</span>
                    <span>{progress.completed}/{progress.total}</span>
                  </div>
                  <div className="w-full bg-white/20 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-purple-500 to-pink-500 h-full rounded-full transition-all"
                      style={{ width: `${progress.percentage}%` }}
                    />
                  </div>
                </div>
              )}

              {/* Expanded view */}
              {isSelected && !isLocked && (
                <div className="mt-4 pt-4 border-t border-white/20">
                  {/* Mục tiêu với đường dẫn trực tiếp */}
                  <div className="mb-4">
                    <h5 className="font-semibold text-white mb-2">📋 Mục tiêu:</h5>
                    <ul className="space-y-3">
                      {quest.objectives.map(obj => {
                        const isCompleted = questProgress[quest.id]?.completedObjectives?.includes(obj.id);
                        const guide = getObjectiveGuide(obj.type);
                        return (
                          <li 
                            key={obj.id}
                            className={`p-3 rounded-lg transition ${
                              isCompleted ? 'bg-green-500/20' : 'bg-white/5 hover:bg-white/10'
                            }`}
                          >
                            <div className="flex items-start gap-3">
                              <span className="text-xl">{isCompleted ? '✅' : guide.icon}</span>
                              <div className="flex-1">
                                <div className={`font-medium ${isCompleted ? 'text-green-400' : 'text-white'}`}>
                                  {obj.text}
                                  {obj.count && (
                                    <span className="text-xs text-purple-400 ml-2">
                                      (×{obj.count})
                                    </span>
                                  )}
                                </div>
                                <div className="text-xs text-purple-300 mt-1">
                                  {guide.description}
                                </div>
                                {!isCompleted && guide.actionPath && (
                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      navigate(guide.actionPath);
                                    }}
                                    className="mt-2 px-3 py-1.5 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white text-sm rounded-lg flex items-center gap-2 transition-all"
                                  >
                                    🚀 {guide.actionLabel}
                                  </button>
                                )}
                              </div>
                            </div>
                          </li>
                        );
                      })}
                    </ul>
                  </div>

                  {/* Phần thưởng */}
                  <div className="mb-4">
                    <h5 className="font-semibold text-white mb-2">🎁 Phần thưởng:</h5>
                    <div className="flex flex-wrap gap-2">
                      {quest.rewards.map((reward, index) => {
                        if (reward.type === 'exp') {
                          return (
                            <span key={index} className="px-3 py-1 bg-yellow-500/30 text-yellow-300 rounded-lg text-sm">
                              ⭐ +{reward.amount} EXP
                            </span>
                          );
                        }
                        if (reward.ingredientId) {
                          const ingredient = getIngredientById(reward.ingredientId);
                          return (
                            <span 
                              key={index} 
                              className="px-3 py-1 bg-purple-500/30 text-purple-200 rounded-lg text-sm flex items-center gap-1"
                            >
                              {ingredient?.icon} {ingredient?.name} ×{reward.amount}
                            </span>
                          );
                        }
                        if (reward.type === 'title') {
                          return (
                            <span key={index} className="px-3 py-1 bg-pink-500/30 text-pink-200 rounded-lg text-sm">
                              🏅 Danh hiệu: {reward.title}
                            </span>
                          );
                        }
                        return null;
                      })}
                    </div>
                  </div>

                  {/* Nhiệm vụ yêu cầu */}
                  {quest.requiredQuests?.length > 0 && (
                    <div className="mb-4">
                      <h5 className="font-semibold text-white mb-2">🔗 Yêu cầu hoàn thành trước:</h5>
                      <div className="flex flex-wrap gap-2">
                        {quest.requiredQuests.map(reqId => {
                          const reqQuest = getQuestById(reqId);
                          const isComplete = completedQuests.includes(reqId);
                          return (
                            <span 
                              key={reqId}
                              className={`px-2 py-1 rounded text-xs ${
                                isComplete 
                                  ? 'bg-green-500/30 text-green-300' 
                                  : 'bg-red-500/30 text-red-300'
                              }`}
                            >
                              {isComplete ? '✓' : '✗'} {reqQuest?.name || reqId}
                            </span>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* Action buttons */}
                  <div className="flex gap-3">
                    {status === questStatus.AVAILABLE && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onStartQuest && onStartQuest(quest);
                        }}
                        className="flex-1 py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-lg font-bold hover:from-green-600 hover:to-emerald-600 transition"
                      >
                        🚀 Bắt đầu nhiệm vụ
                      </button>
                    )}
                    {status === questStatus.IN_PROGRESS && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          // Redirect to quest content
                        }}
                        className="flex-1 py-3 bg-gradient-to-r from-yellow-500 to-orange-500 text-white rounded-lg font-bold hover:from-yellow-600 hover:to-orange-600 transition"
                      >
                        ▶️ Tiếp tục
                      </button>
                    )}
                    {status === questStatus.COMPLETED && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onClaimReward && onClaimReward(quest);
                        }}
                        className="flex-1 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg font-bold hover:from-purple-600 hover:to-pink-600 transition animate-pulse"
                      >
                        🎁 Nhận thưởng
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className="quest-board bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 min-h-screen p-4 md:p-6">
      {/* Header */}
      <div className="header bg-white/10 backdrop-blur-md rounded-2xl p-4 md:p-6 mb-6 border border-white/20">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-white flex items-center gap-3">
              <span className="text-4xl">📜</span>
              Bảng Nhiệm vụ
            </h2>
            <p className="text-purple-200 mt-1">
              Hoàn thành nhiệm vụ để thu thập kiến thức và phần thưởng
            </p>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="text-center bg-purple-600/50 px-4 py-2 rounded-lg">
              <div className="text-2xl font-bold text-white">{completedQuests.length}</div>
              <div className="text-xs text-purple-200">Hoàn thành</div>
            </div>
            <div className="text-center bg-green-600/50 px-4 py-2 rounded-lg">
              <div className="text-2xl font-bold text-white">{availableQuests.length}</div>
              <div className="text-xs text-green-200">Có thể làm</div>
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

        {/* Hướng dẫn nhanh */}
        <div className="mt-4 p-4 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border border-yellow-500/30 rounded-xl">
          <h4 className="font-bold text-yellow-300 mb-2 flex items-center gap-2">
            <span>📖</span> Hướng dẫn hoàn thành nhiệm vụ
          </h4>
          <div className="grid md:grid-cols-4 gap-3 text-sm">
            <div className="flex items-center gap-2 text-yellow-100">
              <span className="text-lg">1️⃣</span>
              <span>Chọn nhiệm vụ phù hợp level</span>
            </div>
            <div className="flex items-center gap-2 text-yellow-100">
              <span className="text-lg">2️⃣</span>
              <span>Click "Bắt đầu" để nhận nhiệm vụ</span>
            </div>
            <div className="flex items-center gap-2 text-yellow-100">
              <span className="text-lg">3️⃣</span>
              <span>Hoàn thành từng mục tiêu</span>
            </div>
            <div className="flex items-center gap-2 text-yellow-100">
              <span className="text-lg">4️⃣</span>
              <span>Nhận thưởng khi hoàn tất</span>
            </div>
          </div>
          <p className="text-xs text-yellow-200/70 mt-2">
            💡 Click vào nhiệm vụ để xem chi tiết • Click "Xem hướng dẫn chi tiết" để biết cách hoàn thành từng mục tiêu
          </p>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mt-4 flex-wrap">
          <button
            onClick={() => setActiveTab('available')}
            className={`px-4 py-2 rounded-lg transition ${
              activeTab === 'available' 
                ? 'bg-green-500 text-white' 
                : 'bg-white/10 text-white/70 hover:bg-white/20'
            }`}
          >
            ✨ Có thể làm ({availableQuests.length})
          </button>
          <button
            onClick={() => setActiveTab('daily')}
            className={`px-4 py-2 rounded-lg transition ${
              activeTab === 'daily' 
                ? 'bg-blue-500 text-white' 
                : 'bg-white/10 text-white/70 hover:bg-white/20'
            }`}
          >
            📅 Hàng ngày
          </button>
          <button
            onClick={() => setActiveTab('chapters')}
            className={`px-4 py-2 rounded-lg transition ${
              activeTab === 'chapters' 
                ? 'bg-purple-500 text-white' 
                : 'bg-white/10 text-white/70 hover:bg-white/20'
            }`}
          >
            📚 Theo chương
          </button>
          <button
            onClick={() => setActiveTab('challenges')}
            className={`px-4 py-2 rounded-lg transition ${
              activeTab === 'challenges' 
                ? 'bg-yellow-500 text-white' 
                : 'bg-white/10 text-white/70 hover:bg-white/20'
            }`}
          >
            🏆 Thử thách
          </button>
          <button
            onClick={() => setActiveTab('completed')}
            className={`px-4 py-2 rounded-lg transition ${
              activeTab === 'completed' 
                ? 'bg-gray-500 text-white' 
                : 'bg-white/10 text-white/70 hover:bg-white/20'
            }`}
          >
            ✅ Đã hoàn thành
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="content bg-white/10 backdrop-blur-md rounded-2xl p-4 md:p-6 border border-white/20">
        {/* Available quests */}
        {activeTab === 'available' && (
          <div>
            <h3 className="text-xl font-bold text-white mb-4">
              ✨ Nhiệm vụ có thể làm
            </h3>
            {availableQuests.length > 0 ? (
              renderQuestList(availableQuests)
            ) : (
              <div className="text-center py-12 text-purple-300">
                <div className="text-4xl mb-3">🎉</div>
                <p>Bạn đã hoàn thành tất cả nhiệm vụ có sẵn!</p>
                <p className="text-sm mt-1">Nâng cấp để mở khóa thêm nhiệm vụ mới</p>
              </div>
            )}
          </div>
        )}

        {/* Daily quests */}
        {activeTab === 'daily' && (
          <div>
            <h3 className="text-xl font-bold text-white mb-4">
              📅 Nhiệm vụ hàng ngày
            </h3>
            <p className="text-sm text-purple-300 mb-4">
              Reset vào 00:00 mỗi ngày
            </p>
            {renderQuestList(dailyQuests, false)}
          </div>
        )}

        {/* Chapters */}
        {activeTab === 'chapters' && (
          <div>
            <h3 className="text-xl font-bold text-white mb-4">
              📚 Nhiệm vụ theo chương
            </h3>
            
            {/* Chapter selector */}
            <div className="flex gap-2 mb-4 flex-wrap">
              <button
                onClick={() => setSelectedChapter(0)}
                className={`px-3 py-1 rounded-lg text-sm transition ${
                  selectedChapter === 0
                    ? 'bg-purple-500 text-white'
                    : 'bg-white/10 text-white/70 hover:bg-white/20'
                }`}
              >
                An toàn
              </button>
              {[1, 2, 3, 4, 5, 6, 7, 8].map(chapter => (
                <button
                  key={chapter}
                  onClick={() => setSelectedChapter(chapter)}
                  className={`px-3 py-1 rounded-lg text-sm transition ${
                    selectedChapter === chapter
                      ? 'bg-purple-500 text-white'
                      : 'bg-white/10 text-white/70 hover:bg-white/20'
                  }`}
                >
                  Chương {chapter}
                </button>
              ))}
            </div>

            {questsByChapter[selectedChapter] ? (
              renderQuestList(questsByChapter[selectedChapter])
            ) : (
              <div className="text-center py-12 text-purple-300">
                <p>Không có nhiệm vụ nào trong chương này</p>
              </div>
            )}
          </div>
        )}

        {/* Special challenges */}
        {activeTab === 'challenges' && (
          <div>
            <h3 className="text-xl font-bold text-white mb-4">
              🏆 Thử thách đặc biệt
            </h3>
            <p className="text-sm text-purple-300 mb-4">
              Hoàn thành thử thách để nhận phần thưởng lớn
            </p>
            {renderQuestList(specialChallenges)}
          </div>
        )}

        {/* Completed quests */}
        {activeTab === 'completed' && (
          <div>
            <h3 className="text-xl font-bold text-white mb-4">
              ✅ Nhiệm vụ đã hoàn thành ({completedQuests.length})
            </h3>
            {completedQuests.length > 0 ? (
              renderQuestList(
                quests.filter(q => completedQuests.includes(q.id))
              )
            ) : (
              <div className="text-center py-12 text-purple-300">
                <div className="text-4xl mb-3">📋</div>
                <p>Bạn chưa hoàn thành nhiệm vụ nào</p>
                <p className="text-sm mt-1">Hãy bắt đầu với nhiệm vụ đầu tiên!</p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Progress Overview */}
      <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
        {[1, 2, 3, 4].map(chapter => {
          const chapterQuests = questsByChapter[chapter] || [];
          const completedCount = chapterQuests.filter(q => 
            completedQuests.includes(q.id)
          ).length;
          const percentage = chapterQuests.length > 0 
            ? (completedCount / chapterQuests.length) * 100 
            : 0;
          
          return (
            <div 
              key={chapter}
              className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20"
            >
              <div className="text-sm text-purple-300 mb-1">Chương {chapter}</div>
              <div className="text-xl font-bold text-white mb-2">
                {completedCount}/{chapterQuests.length}
              </div>
              <div className="w-full bg-white/20 rounded-full h-2">
                <div 
                  className="bg-gradient-to-r from-purple-500 to-pink-500 h-full rounded-full transition-all"
                  style={{ width: `${percentage}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default QuestBoard;
