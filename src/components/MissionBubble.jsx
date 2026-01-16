import { useState, useEffect, useRef } from 'react';
import { useAuth } from '../contexts/AuthContext';
import api from '../config/api';
import {
  MessageCircle,
  X,
  Target,
  CheckCircle2,
  Circle,
  Gift,
  GripVertical,
  Minimize2,
  Sun,
  Trophy
} from 'lucide-react';
import {
  LESSON_EXP_REWARDS,
  CHALLENGE_EXP_REWARDS,
  PK_EXP_REWARDS,
  DAILY_EXP_REWARDS
} from '../constants/expRewards';

// Nhiệm vụ ngày (reset mỗi ngày)
const DAILY_MISSIONS = [
  { id: 'daily_1_lesson', name: 'Hoàn thành 1 bài học hôm nay', exp: 15, type: 'daily_lesson', target: 1 },
  { id: 'daily_3_lessons', name: 'Hoàn thành 3 bài học hôm nay', exp: 30, type: 'daily_lesson', target: 3 },
  { id: 'daily_1_challenge', name: 'Hoàn thành 1 thử thách hôm nay', exp: 20, type: 'daily_challenge', target: 1 },
  { id: 'daily_perfect', name: 'Đạt 3 sao trong 1 bài hôm nay', exp: 25, type: 'daily_perfect', target: 1 },
  { id: 'daily_login', name: 'Đăng nhập hôm nay', exp: 5, type: 'daily_login', target: 1 },
];

// Nhiệm vụ thường (không reset)
const REGULAR_MISSIONS = [
  { id: 'complete_5_lessons', name: 'Hoàn thành 5 bài học', exp: 50, type: 'lesson', target: 5 },
  { id: 'complete_10_lessons', name: 'Hoàn thành 10 bài học', exp: 100, type: 'lesson', target: 10 },
  { id: 'complete_20_lessons', name: 'Hoàn thành 20 bài học', exp: 200, type: 'lesson', target: 20 },
  { id: 'complete_5_challenges', name: 'Hoàn thành 5 thử thách', exp: 75, type: 'challenge', target: 5 },
  { id: 'complete_10_challenges', name: 'Hoàn thành 10 thử thách', exp: 150, type: 'challenge', target: 10 },
  { id: 'get_5_perfect', name: 'Đạt 3 sao trong 5 bài', exp: 100, type: 'stars', target: 5 },
  { id: 'get_10_perfect', name: 'Đạt 3 sao trong 10 bài', exp: 200, type: 'stars', target: 10 },
  { id: 'streak_3_days', name: 'Học liên tục 3 ngày', exp: 30, type: 'streak', target: 3 },
  { id: 'streak_7_days', name: 'Học liên tục 7 ngày', exp: 70, type: 'streak', target: 7 },
  { id: 'streak_14_days', name: 'Học liên tục 14 ngày', exp: 150, type: 'streak', target: 14 },
  { id: 'pk_participate_5', name: 'Tham gia 5 trận PK', exp: 50, type: 'pk', target: 5 },
  { id: 'pk_win_3', name: 'Thắng 3 trận PK', exp: 100, type: 'pk_win', target: 3 },
  { id: 'reach_level_5', name: 'Đạt Level 5', exp: 100, type: 'level', target: 5 },
  { id: 'reach_level_10', name: 'Đạt Level 10', exp: 200, type: 'level', target: 10 },
  { id: 'earn_500_xp', name: 'Tích lũy 500 XP', exp: 50, type: 'xp', target: 500 },
  { id: 'earn_1000_xp', name: 'Tích lũy 1000 XP', exp: 100, type: 'xp', target: 1000 },
];

const MissionBubble = () => {
  const { user } = useAuth();
  const [userData, setUserData] = useState(null);
  const [showMissions, setShowMissions] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [claimedMissions, setClaimedMissions] = useState([]);
  const [dailyClaimedMissions, setDailyClaimedMissions] = useState([]);
  const [todayProgress, setTodayProgress] = useState({ lessons: 0, challenges: 0, perfectLessons: 0, login: 1 });
  const [claimingMission, setClaimingMission] = useState(null);
  const [activeTab, setActiveTab] = useState('daily'); // 'daily' or 'regular'
  const dragRef = useRef(null);
  const dragStartPos = useRef({ x: 0, y: 0 });

  // Load visibility and position from localStorage
  useEffect(() => {
    const savedVisible = localStorage.getItem('missionBubbleVisible');
    const savedPosition = localStorage.getItem('missionBubblePosition');
    const userSettings = localStorage.getItem('userSettings');
    
    // Check user settings for showMissionBubble
    if (userSettings) {
      try {
        const settings = JSON.parse(userSettings);
        if (settings.showMissionBubble === false) {
          setIsVisible(false);
        } else if (savedVisible !== null) {
          setIsVisible(savedVisible === 'true');
        }
      } catch (e) {
        if (savedVisible !== null) {
          setIsVisible(savedVisible === 'true');
        }
      }
    } else if (savedVisible !== null) {
      setIsVisible(savedVisible === 'true');
    }
    
    if (savedPosition) {
      try {
        const pos = JSON.parse(savedPosition);
        setPosition(pos);
      } catch (e) {
        // Default position (bottom right)
        setPosition({ x: window.innerWidth - 80, y: window.innerHeight - 80 });
      }
    } else {
      // Default position
      setPosition({ x: window.innerWidth - 80, y: window.innerHeight - 80 });
    }
  }, []);

  // Listen for settings changes from Profile page
  useEffect(() => {
    const handleSettingsChange = (event) => {
      const settings = event.detail;
      if (settings.showMissionBubble === false) {
        setIsVisible(false);
        setShowMissions(false);
      } else {
        setIsVisible(true);
      }
    };

    window.addEventListener('settingsChanged', handleSettingsChange);
    return () => window.removeEventListener('settingsChanged', handleSettingsChange);
  }, []);

  // Save visibility to localStorage
  useEffect(() => {
    localStorage.setItem('missionBubbleVisible', isVisible.toString());
  }, [isVisible]);

  // Save position to localStorage
  useEffect(() => {
    if (position.x !== 0 || position.y !== 0) {
      localStorage.setItem('missionBubblePosition', JSON.stringify(position));
    }
  }, [position]);

  // Fetch user data
  useEffect(() => {
    const fetchUserData = async () => {
      if (!user?.uid) return;
      
      try {
        const response = await api.get(`/users/firebase/${user.uid}`);
        setUserData(response.data);
        // Load claimed missions from user data
        setClaimedMissions(response.data.claimedMissions || []);
        setDailyClaimedMissions(response.data.dailyClaimedMissions || []);
        setTodayProgress(response.data.todayProgress || { lessons: 0, challenges: 0, perfectLessons: 0, login: 1 });
      } catch (err) {
        console.error('Error fetching user data for missions:', err);
      }
    };

    fetchUserData();
    
    // Refresh every 30 seconds
    const interval = setInterval(fetchUserData, 30000);
    return () => clearInterval(interval);
  }, [user]);

  // Claim mission reward (for both daily and regular)
  const claimMission = async (mission, isDaily = false) => {
    const claimedList = isDaily ? dailyClaimedMissions : claimedMissions;
    if (!userData?._id || claimedList.includes(mission.id)) return;
    
    setClaimingMission(mission.id);
    try {
      const response = await api.post(`/users/${userData._id}/missions/claim`, {
        missionId: mission.id,
        missionExp: mission.exp,
        isDaily
      });
      
      if (response.data.success) {
        if (isDaily) {
          setDailyClaimedMissions(prev => [...prev, mission.id]);
        } else {
          setClaimedMissions(prev => [...prev, mission.id]);
        }
        setUserData(prev => ({
          ...prev,
          xp: response.data.totalXp,
          level: response.data.level
        }));
        console.log(`🎁 Claimed ${isDaily ? 'daily' : 'regular'} mission: ${mission.id} | +${mission.exp} XP`);
      }
    } catch (err) {
      console.error('Error claiming mission:', err);
    } finally {
      setClaimingMission(null);
    }
  };

  // Handle drag start
  const handleDragStart = (e) => {
    if (e.target.closest('.mission-panel')) return;
    
    setIsDragging(true);
    const clientX = e.type === 'touchstart' ? e.touches[0].clientX : e.clientX;
    const clientY = e.type === 'touchstart' ? e.touches[0].clientY : e.clientY;
    
    dragStartPos.current = {
      x: clientX - position.x,
      y: clientY - position.y
    };
  };

  // Handle drag move
  const handleDragMove = (e) => {
    if (!isDragging) return;
    
    e.preventDefault();
    const clientX = e.type === 'touchmove' ? e.touches[0].clientX : e.clientX;
    const clientY = e.type === 'touchmove' ? e.touches[0].clientY : e.clientY;
    
    let newX = clientX - dragStartPos.current.x;
    let newY = clientY - dragStartPos.current.y;
    
    // Keep within viewport bounds
    const bubbleSize = 64;
    newX = Math.max(0, Math.min(newX, window.innerWidth - bubbleSize));
    newY = Math.max(0, Math.min(newY, window.innerHeight - bubbleSize));
    
    setPosition({ x: newX, y: newY });
  };

  // Handle drag end
  const handleDragEnd = () => {
    setIsDragging(false);
  };

  // Add/remove event listeners for dragging
  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleDragMove);
      window.addEventListener('mouseup', handleDragEnd);
      window.addEventListener('touchmove', handleDragMove, { passive: false });
      window.addEventListener('touchend', handleDragEnd);
    }
    
    return () => {
      window.removeEventListener('mousemove', handleDragMove);
      window.removeEventListener('mouseup', handleDragEnd);
      window.removeEventListener('touchmove', handleDragMove);
      window.removeEventListener('touchend', handleDragEnd);
    };
  }, [isDragging]);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      setPosition(prev => ({
        x: Math.min(prev.x, window.innerWidth - 64),
        y: Math.min(prev.y, window.innerHeight - 64)
      }));
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Get current program
  const currentProgram = userData?.programs?.find(p => p.isActive) || userData?.programs?.[0];

  // Calculate mission status
  const getMissionStatus = (mission) => {
    const completedLessons = currentProgram?.progress?.completedLessons?.length || 0;
    const completedChallenges = currentProgram?.progress?.completedChallenges?.length || 0;
    const lessonStars = currentProgram?.progress?.lessonStars;
    
    // Handle lessonStars which could be a Map, object, or array
    let perfectLessons = 0;
    if (lessonStars) {
      try {
        if (lessonStars instanceof Map) {
          perfectLessons = [...lessonStars.values()].filter(s => s === 3).length;
        } else if (Array.isArray(lessonStars)) {
          perfectLessons = lessonStars.filter(([_, s]) => s === 3).length;
        } else if (typeof lessonStars === 'object') {
          perfectLessons = Object.values(lessonStars).filter(s => s === 3).length;
        }
      } catch (e) {
        console.error('Error processing lessonStars:', e);
        perfectLessons = 0;
      }
    }
    
    const currentStreak = currentProgram?.studyStreak?.currentStreak || 0;
    const userLevel = userData?.level || 1;
    const userXp = userData?.xp || 0;

    let current = 0;
    switch (mission.type) {
      case 'lesson':
        current = completedLessons;
        break;
      case 'challenge':
        current = completedChallenges;
        break;
      case 'stars':
        current = perfectLessons;
        break;
      case 'streak':
        current = currentStreak;
        break;
      case 'pk':
      case 'pk_win':
        current = 0;
        break;
      case 'level':
        current = userLevel;
        break;
      case 'xp':
        current = userXp;
        break;
      // Daily mission types
      case 'daily_lesson':
        current = todayProgress.lessons || 0;
        break;
      case 'daily_challenge':
        current = todayProgress.challenges || 0;
        break;
      case 'daily_perfect':
        current = todayProgress.perfectLessons || 0;
        break;
      case 'daily_login':
        current = todayProgress.login || 1;
        break;
      default:
        current = 0;
    }

    const completed = current >= mission.target;
    const progress = Math.min((current / mission.target) * 100, 100);
    
    // Check claimed status based on mission type (daily vs regular)
    const isDaily = mission.id.startsWith('daily_');
    const claimed = isDaily 
      ? dailyClaimedMissions.includes(mission.id)
      : claimedMissions.includes(mission.id);

    return { completed, current, progress, claimed, isDaily };
  };

  // Separate DAILY missions into categories
  const dailyReadyToClaim = DAILY_MISSIONS.filter(m => {
    const status = getMissionStatus(m);
    return status.completed && !status.claimed;
  });
  const dailyClaimed = DAILY_MISSIONS.filter(m => {
    const status = getMissionStatus(m);
    return status.claimed;
  });
  const dailyIncomplete = DAILY_MISSIONS.filter(m => {
    const status = getMissionStatus(m);
    return !status.completed;
  });

  // Separate REGULAR missions into categories
  const regularReadyToClaim = REGULAR_MISSIONS.filter(m => {
    const status = getMissionStatus(m);
    return status.completed && !status.claimed;
  });
  const regularClaimed = REGULAR_MISSIONS.filter(m => {
    const status = getMissionStatus(m);
    return status.claimed;
  });
  const regularIncomplete = REGULAR_MISSIONS.filter(m => {
    const status = getMissionStatus(m);
    return !status.completed;
  });

  // Total ready to claim
  const totalReadyToClaim = dailyReadyToClaim.length + regularReadyToClaim.length;

  // Public method to show bubble (called from Profile)
  useEffect(() => {
    const handleShowBubble = () => {
      setIsVisible(true);
    };
    
    window.addEventListener('showMissionBubble', handleShowBubble);
    return () => window.removeEventListener('showMissionBubble', handleShowBubble);
  }, []);

  // Don't render if not logged in
  if (!user) return null;

  // Don't render if hidden
  if (!isVisible) return null;

  // Render mission list for a category
  const renderMissionList = (missions, isDaily) => {
    const readyToClaim = missions.filter(m => {
      const status = getMissionStatus(m);
      return status.completed && !status.claimed;
    });
    const claimed = missions.filter(m => {
      const status = getMissionStatus(m);
      return status.claimed;
    });
    const incomplete = missions.filter(m => {
      const status = getMissionStatus(m);
      return !status.completed;
    });

    return (
      <div className="space-y-4">
        {/* Ready to Claim */}
        {readyToClaim.length > 0 && (
          <div>
            <h3 className="text-sm font-semibold text-yellow-600 uppercase tracking-wider mb-2 flex items-center gap-2">
              <Gift className="w-4 h-4" />
              Sẵn sàng nhận ({readyToClaim.length})
            </h3>
            <div className="space-y-2">
              {readyToClaim.map(mission => (
                <div
                  key={mission.id}
                  className="bg-gradient-to-r from-yellow-50 to-amber-50 border-2 border-yellow-300 rounded-xl p-3"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-yellow-500 rounded-lg flex items-center justify-center">
                        <Gift className="w-4 h-4 text-white" />
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-800 text-sm">{mission.name}</h4>
                        <p className="text-xs text-yellow-600 font-medium">+{mission.exp} EXP</p>
                      </div>
                    </div>
                    <button
                      onClick={() => claimMission(mission, isDaily)}
                      disabled={claimingMission === mission.id}
                      className="px-3 py-1.5 bg-gradient-to-r from-yellow-500 to-amber-500 text-white text-sm font-semibold rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50"
                    >
                      {claimingMission === mission.id ? '...' : 'Nhận'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Incomplete */}
        {incomplete.length > 0 && (
          <div>
            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2 flex items-center gap-2">
              <Circle className="w-4 h-4" />
              Đang thực hiện ({incomplete.length})
            </h3>
            <div className="space-y-2">
              {incomplete.map(mission => {
                const status = getMissionStatus(mission);
                return (
                  <div
                    key={mission.id}
                    className="bg-white border border-gray-200 rounded-xl p-3"
                  >
                    <div className="flex items-start justify-between mb-1">
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-800 text-sm">{mission.name}</h4>
                        <p className="text-xs text-purple-600 font-medium">+{mission.exp} EXP</p>
                      </div>
                      <span className="text-xs font-medium text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">
                        {status.current}/{mission.target}
                      </span>
                    </div>
                    <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-purple-400 to-pink-400 rounded-full transition-all duration-500"
                        style={{ width: `${status.progress}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Claimed */}
        {claimed.length > 0 && (
          <div>
            <h3 className="text-sm font-semibold text-emerald-600 uppercase tracking-wider mb-2 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4" />
              Đã nhận ({claimed.length})
            </h3>
            <div className="space-y-2">
              {claimed.map(mission => (
                <div
                  key={mission.id}
                  className="bg-gradient-to-r from-emerald-50 to-green-50 border border-emerald-200 rounded-xl p-3 opacity-75"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center">
                        <CheckCircle2 className="w-4 h-4 text-white" />
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-800 text-sm">{mission.name}</h4>
                        <p className="text-xs text-emerald-600">+{mission.exp} EXP ✓</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Empty State */}
        {missions.length === 0 && (
          <div className="text-center py-8">
            <div className="text-4xl mb-2">🎯</div>
            <p className="text-gray-500 text-sm">Không có nhiệm vụ nào</p>
          </div>
        )}
      </div>
    );
  };

  return (
    <>
      {/* Draggable Bubble Button */}
      <div
        ref={dragRef}
        className={`fixed z-50 ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
        style={{
          left: position.x,
          top: position.y,
          touchAction: 'none'
        }}
        onMouseDown={handleDragStart}
        onTouchStart={handleDragStart}
      >
        <div className="relative group">
          {/* Main Button */}
          <button
            onClick={() => !isDragging && setShowMissions(true)}
            className={`w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full shadow-2xl flex items-center justify-center hover:scale-110 transition-all duration-300 ${isDragging ? 'scale-95' : ''}`}
          >
            <MessageCircle className="w-7 h-7 text-white" />
            {/* Show ready to claim count (priority) */}
            {totalReadyToClaim > 0 ? (
              <span className="absolute -top-1 -right-1 w-6 h-6 bg-yellow-500 rounded-full text-white text-xs font-bold flex items-center justify-center animate-bounce">
                {totalReadyToClaim}
              </span>
            ) : (dailyIncomplete.length + regularIncomplete.length) > 0 && (
              <span className="absolute -top-1 -right-1 w-6 h-6 bg-gray-500 rounded-full text-white text-xs font-bold flex items-center justify-center">
                {dailyIncomplete.length + regularIncomplete.length}
              </span>
            )}
          </button>
          
          {/* Close Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              setIsVisible(false);
            }}
            className="absolute -top-2 -left-2 w-6 h-6 bg-gray-700 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-gray-600"
          >
            <X className="w-3 h-3 text-white" />
          </button>
          
          {/* Drag Indicator */}
          <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
            <GripVertical className="w-4 h-4 text-gray-400" />
          </div>
        </div>
      </div>

      {/* Mission Panel Modal */}
      {showMissions && (
        <div className="fixed inset-0 z-[60] flex items-end sm:items-center justify-center p-4">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setShowMissions(false)}
          />

          {/* Panel */}
          <div className="mission-panel relative w-full max-w-lg max-h-[85vh] bg-white rounded-3xl shadow-2xl overflow-hidden animate-in slide-in-from-bottom-5 duration-300">
            {/* Header */}
            <div className="sticky top-0 bg-gradient-to-r from-purple-500 to-pink-500 p-4 text-white">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                    <Target className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="text-lg font-bold">Nhiệm vụ</h2>
                    <p className="text-purple-100 text-xs">
                      {userData?.xp || 0} XP • Level {userData?.level || 1}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      setShowMissions(false);
                      setIsVisible(false);
                    }}
                    className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center hover:bg-white/30 transition-colors"
                    title="Ẩn bong bóng"
                  >
                    <Minimize2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setShowMissions(false)}
                    className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center hover:bg-white/30 transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Tabs */}
              <div className="flex gap-2">
                <button
                  onClick={() => setActiveTab('daily')}
                  className={`flex-1 py-2 px-3 rounded-xl text-sm font-medium transition-all flex items-center justify-center gap-2 ${
                    activeTab === 'daily'
                      ? 'bg-white text-purple-600'
                      : 'bg-white/20 text-white hover:bg-white/30'
                  }`}
                >
                  <Sun className="w-4 h-4" />
                  Hàng ngày
                  {dailyReadyToClaim.length > 0 && (
                    <span className="w-5 h-5 bg-yellow-500 rounded-full text-white text-xs flex items-center justify-center">
                      {dailyReadyToClaim.length}
                    </span>
                  )}
                </button>
                <button
                  onClick={() => setActiveTab('regular')}
                  className={`flex-1 py-2 px-3 rounded-xl text-sm font-medium transition-all flex items-center justify-center gap-2 ${
                    activeTab === 'regular'
                      ? 'bg-white text-purple-600'
                      : 'bg-white/20 text-white hover:bg-white/30'
                  }`}
                >
                  <Trophy className="w-4 h-4" />
                  Thường
                  {regularReadyToClaim.length > 0 && (
                    <span className="w-5 h-5 bg-yellow-500 rounded-full text-white text-xs flex items-center justify-center">
                      {regularReadyToClaim.length}
                    </span>
                  )}
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="overflow-y-auto max-h-[calc(85vh-140px)] p-4">
              {activeTab === 'daily' && (
                <div>
                  <div className="mb-3 p-3 bg-gradient-to-r from-orange-50 to-yellow-50 border border-orange-200 rounded-xl">
                    <p className="text-xs text-orange-700 flex items-center gap-2">
                      <Sun className="w-4 h-4" />
                      <span>Nhiệm vụ ngày sẽ reset vào 00:00 mỗi ngày</span>
                    </p>
                  </div>
                  {renderMissionList(DAILY_MISSIONS, true)}
                </div>
              )}
              {activeTab === 'regular' && (
                <div>
                  <div className="mb-3 p-3 bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200 rounded-xl">
                    <p className="text-xs text-purple-700 flex items-center gap-2">
                      <Trophy className="w-4 h-4" />
                      <span>Nhiệm vụ thường không reset, hoàn thành để nhận thưởng lớn!</span>
                    </p>
                  </div>
                  {renderMissionList(REGULAR_MISSIONS, false)}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

// Export function to show bubble from other components
export const showMissionBubble = () => {
  window.dispatchEvent(new Event('showMissionBubble'));
};

export default MissionBubble;
