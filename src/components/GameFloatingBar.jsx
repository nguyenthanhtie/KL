import { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import api from '../config/api';
import useNotifications from '../hooks/useNotifications';
import {
  Target,
  CheckCircle2,
  Circle,
  Gift,
  X,
  Sun,
  Trophy,
  Bell,
  Check,
  CheckCheck,
  Trash2,
  Settings,
  Clock,
  AlertTriangle
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

const GameFloatingBar = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  
  // Mission states
  const [userData, setUserData] = useState(null);
  const [showMissions, setShowMissions] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [claimedMissions, setClaimedMissions] = useState([]);
  const [dailyClaimedMissions, setDailyClaimedMissions] = useState([]);
  const [todayProgress, setTodayProgress] = useState({ lessons: 0, challenges: 0, perfectLessons: 0, login: 1 });
  const [claimingMission, setClaimingMission] = useState(null);
  const [activeTab, setActiveTab] = useState('daily');
  
  // Notification states
  const [showNotifications, setShowNotifications] = useState(false);
  const notificationButtonRef = useRef(null);
  const notificationDropdownRef = useRef(null);
  
  // Time tracking states
  const [sessionMinutes, setSessionMinutes] = useState(0);
  const [showTimeWarning, setShowTimeWarning] = useState(false);
  
  const {
    notifications,
    unreadCount,
    loading: notifLoading,
    fetchNotifications,
    markAsRead,
    markAllAsRead,
    deleteNotification
  } = useNotifications();

  // Load visibility from localStorage
  useEffect(() => {
    const userSettings = localStorage.getItem('userSettings');
    if (userSettings) {
      try {
        const settings = JSON.parse(userSettings);
        if (settings.showMissionBubble === false) {
          setIsVisible(false);
        }
      } catch (e) {}
    }
  }, []);

  // Listen for settings changes
  useEffect(() => {
    const handleSettingsChange = (event) => {
      const settings = event.detail;
      if (settings.showMissionBubble === false) {
        setIsVisible(false);
        setShowMissions(false);
        setShowNotifications(false);
      } else {
        setIsVisible(true);
      }
    };

    window.addEventListener('settingsChanged', handleSettingsChange);
    return () => window.removeEventListener('settingsChanged', handleSettingsChange);
  }, []);

  // Track session time
  useEffect(() => {
    const savedStartTime = sessionStorage.getItem('sessionStartTime');
    if (!savedStartTime) {
      sessionStorage.setItem('sessionStartTime', Date.now().toString());
    }
    
    const updateSessionTime = () => {
      const startTime = parseInt(sessionStorage.getItem('sessionStartTime') || Date.now().toString());
      const minutes = Math.floor((Date.now() - startTime) / 60000);
      setSessionMinutes(minutes);
    };
    
    updateSessionTime();
    const interval = setInterval(updateSessionTime, 60000);
    return () => clearInterval(interval);
  }, []);

  // Fetch user data
  useEffect(() => {
    const fetchUserData = async () => {
      if (!user?.uid) return;
      
      try {
        const response = await api.get(`/users/firebase/${user.uid}`);
        setUserData(response.data);
        setClaimedMissions(response.data.claimedMissions || []);
        setDailyClaimedMissions(response.data.dailyClaimedMissions || []);
        setTodayProgress(response.data.todayProgress || { lessons: 0, challenges: 0, perfectLessons: 0, login: 1 });
      } catch (err) {
        console.error('Error fetching user data for missions:', err);
      }
    };

    fetchUserData();
    const interval = setInterval(fetchUserData, 30000);
    return () => clearInterval(interval);
  }, [user]);

  // Fetch notifications when dropdown opens
  useEffect(() => {
    if (showNotifications) {
      fetchNotifications(1, false);
    }
  }, [showNotifications, fetchNotifications]);

  // Close notification dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        notificationDropdownRef.current && 
        !notificationDropdownRef.current.contains(event.target) &&
        notificationButtonRef.current &&
        !notificationButtonRef.current.contains(event.target)
      ) {
        setShowNotifications(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Claim mission reward
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
      }
    } catch (err) {
      console.error('Error claiming mission:', err);
    } finally {
      setClaimingMission(null);
    }
  };

  // Get current program
  const currentProgram = userData?.programs?.find(p => p.isActive) || userData?.programs?.[0];

  // Calculate mission status
  const getMissionStatus = (mission) => {
    const completedLessons = currentProgram?.progress?.completedLessons?.length || 0;
    const completedChallenges = currentProgram?.progress?.completedChallenges?.length || 0;
    const lessonStars = currentProgram?.progress?.lessonStars;
    
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
        perfectLessons = 0;
      }
    }
    
    const currentStreak = currentProgram?.studyStreak?.currentStreak || 0;
    const userLevel = userData?.level || 1;
    const userXp = userData?.xp || 0;

    let current = 0;
    switch (mission.type) {
      case 'lesson': current = completedLessons; break;
      case 'challenge': current = completedChallenges; break;
      case 'stars': current = perfectLessons; break;
      case 'streak': current = currentStreak; break;
      case 'pk':
      case 'pk_win': current = 0; break;
      case 'level': current = userLevel; break;
      case 'xp': current = userXp; break;
      case 'daily_lesson': current = todayProgress.lessons || 0; break;
      case 'daily_challenge': current = todayProgress.challenges || 0; break;
      case 'daily_perfect': current = todayProgress.perfectLessons || 0; break;
      case 'daily_login': current = todayProgress.login || 1; break;
      default: current = 0;
    }

    const completed = current >= mission.target;
    const progress = Math.min((current / mission.target) * 100, 100);
    const isDaily = mission.id.startsWith('daily_');
    const claimed = isDaily 
      ? dailyClaimedMissions.includes(mission.id)
      : claimedMissions.includes(mission.id);

    return { completed, current, progress, claimed, isDaily };
  };

  // Calculate ready to claim missions
  const dailyReadyToClaim = DAILY_MISSIONS.filter(m => {
    const status = getMissionStatus(m);
    return status.completed && !status.claimed;
  });
  const regularReadyToClaim = REGULAR_MISSIONS.filter(m => {
    const status = getMissionStatus(m);
    return status.completed && !status.claimed;
  });
  const totalReadyToClaim = dailyReadyToClaim.length + regularReadyToClaim.length;

  // Format time ago for notifications
  const formatTimeAgo = (date) => {
    const now = new Date();
    const diff = now - new Date(date);
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 1) return 'Vừa xong';
    if (minutes < 60) return `${minutes} phút trước`;
    if (hours < 24) return `${hours} giờ trước`;
    if (days < 7) return `${days} ngày trước`;
    return new Date(date).toLocaleDateString('vi-VN');
  };

  // Get icon for notification type
  const getNotificationIcon = (type) => {
    const icons = {
      study_reminder: '📚',
      streak_warning: '🔥',
      streak_lost: '😢',
      achievement: '🏆',
      level_up: '⬆️',
      new_content: '✨',
      challenge_unlock: '🔓',
      weekly_report: '📊',
      system: '📢',
      promotion: '🎁'
    };
    return icons[type] || '🔔';
  };

  // Handle notification click
  const handleNotificationClick = (notification) => {
    if (!notification.isRead) {
      markAsRead(notification._id);
    }
    if (notification.actionUrl) {
      navigate(notification.actionUrl);
      setShowNotifications(false);
    }
  };

  // Render mission list
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
            <h3 className="text-sm font-semibold text-yellow-400 uppercase tracking-wider mb-2 flex items-center gap-2">
              <Gift className="w-4 h-4" />
              Sẵn sàng nhận ({readyToClaim.length})
            </h3>
            <div className="space-y-2">
              {readyToClaim.map(mission => (
                <div
                  key={mission.id}
                  className="bg-gradient-to-r from-yellow-900/50 to-amber-900/50 border border-yellow-500/50 rounded-lg p-3"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-yellow-500 rounded-lg flex items-center justify-center">
                        <Gift className="w-4 h-4 text-black" />
                      </div>
                      <div>
                        <h4 className="font-medium text-yellow-100 text-sm">{mission.name}</h4>
                        <p className="text-xs text-yellow-400 font-medium">+{mission.exp} EXP</p>
                      </div>
                    </div>
                    <button
                      onClick={() => claimMission(mission, isDaily)}
                      disabled={claimingMission === mission.id}
                      className="px-3 py-1.5 bg-gradient-to-r from-yellow-500 to-amber-500 text-black text-sm font-bold rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50"
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
            <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-2 flex items-center gap-2">
              <Circle className="w-4 h-4" />
              Đang thực hiện ({incomplete.length})
            </h3>
            <div className="space-y-2">
              {incomplete.map(mission => {
                const status = getMissionStatus(mission);
                return (
                  <div
                    key={mission.id}
                    className="bg-gray-800/80 border border-gray-600/50 rounded-lg p-3"
                  >
                    <div className="flex items-start justify-between mb-1">
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-200 text-sm">{mission.name}</h4>
                        <p className="text-xs text-purple-400 font-medium">+{mission.exp} EXP</p>
                      </div>
                      <span className="text-xs font-medium text-gray-400 bg-gray-700 px-2 py-0.5 rounded-full">
                        {status.current}/{mission.target}
                      </span>
                    </div>
                    <div className="h-1.5 bg-gray-700 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full transition-all duration-500"
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
            <h3 className="text-sm font-semibold text-emerald-400 uppercase tracking-wider mb-2 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4" />
              Đã nhận ({claimed.length})
            </h3>
            <div className="space-y-2">
              {claimed.map(mission => (
                <div
                  key={mission.id}
                  className="bg-emerald-900/30 border border-emerald-500/30 rounded-lg p-3 opacity-75"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-emerald-600 rounded-lg flex items-center justify-center">
                        <CheckCircle2 className="w-4 h-4 text-white" />
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-300 text-sm">{mission.name}</h4>
                        <p className="text-xs text-emerald-400">+{mission.exp} EXP ✓</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  };

  // Public method to show bubble
  useEffect(() => {
    const handleShowBubble = () => {
      setIsVisible(true);
    };
    
    window.addEventListener('showMissionBubble', handleShowBubble);
    return () => window.removeEventListener('showMissionBubble', handleShowBubble);
  }, []);

  // Don't render if not logged in or hidden
  if (!user || !isVisible) return null;

  return (
    <>
      {/* Floating Bar - Game Style */}
      <div className="fixed bottom-4 right-4 z-50">
        <div className="flex items-center gap-1 bg-gradient-to-r from-gray-900/95 to-gray-800/95 backdrop-blur-sm rounded-2xl p-1.5 border border-gray-600/50 shadow-2xl shadow-black/50">
          
        

          

          {/* Notification Button */}
          <button
            ref={notificationButtonRef}
            onClick={() => {
              setShowNotifications(!showNotifications);
              setShowMissions(false);
              setShowTimeWarning(false);
            }}
            className={`relative w-11 h-11 rounded-xl flex items-center justify-center transition-all ${
              showNotifications 
                ? 'bg-purple-500 text-white' 
                : 'bg-gray-700/50 text-gray-300 hover:bg-gray-600/50'
            }`}
          >
            <Bell className="w-5 h-5" />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center animate-pulse">
                {unreadCount > 9 ? '9+' : unreadCount}
              </span>
            )}
          </button>

          {/* Mission Button */}
          <button
            onClick={() => {
              setShowMissions(!showMissions);
              setShowNotifications(false);
              setShowTimeWarning(false);
            }}
            className={`relative w-11 h-11 rounded-xl flex items-center justify-center transition-all ${
              showMissions 
                ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white ring-2 ring-yellow-400 ring-offset-2 ring-offset-gray-900' 
                : 'bg-gray-700/50 text-gray-300 hover:bg-gray-600/50'
            }`}
          >
            <Target className="w-5 h-5" />
            {totalReadyToClaim > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-yellow-500 text-black text-xs font-bold rounded-full flex items-center justify-center animate-bounce">
                {totalReadyToClaim}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Notification Dropdown */}
      {showNotifications && createPortal(
        <div 
          ref={notificationDropdownRef}
          className="fixed bottom-20 right-4 w-80 bg-gray-900/95 backdrop-blur-sm rounded-2xl shadow-2xl border border-gray-600/50 z-[9999] overflow-hidden"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white">
            <h3 className="font-semibold flex items-center gap-2">
              <Bell className="w-5 h-5" />
              Thông báo
              {unreadCount > 0 && (
                <span className="bg-white text-purple-600 text-xs font-bold px-2 py-0.5 rounded-full">
                  {unreadCount} mới
                </span>
              )}
            </h3>
            <div className="flex items-center gap-2">
              {unreadCount > 0 && (
                <button
                  onClick={markAllAsRead}
                  className="p-1.5 hover:bg-white/20 rounded-full transition-colors"
                  title="Đánh dấu tất cả đã đọc"
                >
                  <CheckCheck className="w-4 h-4" />
                </button>
              )}
              <button
                onClick={() => {
                  navigate('/profile?tab=notifications');
                  setShowNotifications(false);
                }}
                className="p-1.5 hover:bg-white/20 rounded-full transition-colors"
                title="Cài đặt thông báo"
              >
                <Settings className="w-4 h-4" />
              </button>
              <button
                onClick={() => setShowNotifications(false)}
                className="p-1.5 hover:bg-white/20 rounded-full transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Notification List */}
          <div className="max-h-80 overflow-y-auto">
            {notifLoading ? (
              <div className="flex items-center justify-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-500"></div>
              </div>
            ) : notifications.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <Bell className="w-12 h-12 mx-auto mb-2 opacity-30" />
                <p>Không có thông báo nào</p>
              </div>
            ) : (
              <div className="divide-y divide-gray-700/50">
                {notifications.map((notification) => (
                  <div
                    key={notification._id}
                    className={`flex items-start gap-3 p-4 cursor-pointer hover:bg-gray-800/50 transition-colors ${
                      !notification.isRead ? 'bg-purple-900/20' : ''
                    }`}
                    onClick={() => handleNotificationClick(notification)}
                  >
                    <div className="text-2xl flex-shrink-0">
                      {getNotificationIcon(notification.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className={`text-sm ${!notification.isRead ? 'font-semibold' : ''} text-gray-200`}>
                        {notification.title}
                      </p>
                      <p className="text-xs text-gray-400 mt-1 line-clamp-2">
                        {notification.body}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        {formatTimeAgo(notification.createdAt)}
                      </p>
                    </div>
                    <div className="flex flex-col gap-1 flex-shrink-0">
                      {!notification.isRead && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            markAsRead(notification._id);
                          }}
                          className="p-1 hover:bg-gray-700 rounded transition-colors"
                          title="Đánh dấu đã đọc"
                        >
                          <Check className="w-4 h-4 text-green-400" />
                        </button>
                      )}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          deleteNotification(notification._id);
                        }}
                        className="p-1 hover:bg-gray-700 rounded transition-colors"
                        title="Xóa thông báo"
                      >
                        <Trash2 className="w-4 h-4 text-red-400" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          {notifications.length > 0 && (
            <div className="border-t border-gray-700/50 p-2">
              <button
                onClick={() => {
                  navigate('/profile?tab=notifications');
                  setShowNotifications(false);
                }}
                className="w-full text-center text-sm text-purple-400 hover:underline py-2"
              >
                Xem tất cả thông báo
              </button>
            </div>
          )}
        </div>,
        document.body
      )}

      {/* Mission Panel Modal */}
      {showMissions && (
        <div className="fixed inset-0 z-[60] flex items-end sm:items-center justify-center p-4">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={() => setShowMissions(false)}
          />

          {/* Panel */}
          <div className="mission-panel relative w-full max-w-lg max-h-[85vh] bg-gray-900/95 rounded-2xl shadow-2xl border border-gray-600/50 overflow-hidden animate-in slide-in-from-bottom-5 duration-300">
            {/* Header */}
            <div className="sticky top-0 bg-gradient-to-r from-purple-600 to-pink-600 p-4 text-white">
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
                <button
                  onClick={() => setShowMissions(false)}
                  className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center hover:bg-white/30 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
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
                    <span className="w-5 h-5 bg-yellow-500 rounded-full text-black text-xs flex items-center justify-center font-bold">
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
                    <span className="w-5 h-5 bg-yellow-500 rounded-full text-black text-xs flex items-center justify-center font-bold">
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
                  <div className="mb-3 p-3 bg-orange-900/30 border border-orange-500/30 rounded-xl">
                    <p className="text-xs text-orange-300 flex items-center gap-2">
                      <Sun className="w-4 h-4" />
                      <span>Nhiệm vụ ngày sẽ reset vào 00:00 mỗi ngày</span>
                    </p>
                  </div>
                  {renderMissionList(DAILY_MISSIONS, true)}
                </div>
              )}
              {activeTab === 'regular' && (
                <div>
                  <div className="mb-3 p-3 bg-purple-900/30 border border-purple-500/30 rounded-xl">
                    <p className="text-xs text-purple-300 flex items-center gap-2">
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

export default GameFloatingBar;
