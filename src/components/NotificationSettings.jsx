// ==================== NOTIFICATION SETTINGS COMPONENT ====================
// Component để cài đặt thông báo trong trang Profile

import { useState, useEffect } from 'react';
import { 
  Bell, Mail, Smartphone, Clock, Calendar, 
  Flame, Trophy, Sparkles, FileText, Send,
  Check, AlertCircle, Loader2, Trash2
} from 'lucide-react';
import useNotifications from '../hooks/useNotifications';
import { useAuth } from '../contexts/AuthContext';
import api from '../config/api';

const NotificationSettings = () => {
  const { user } = useAuth();
  const {
    settings,
    permissionStatus,
    fetchSettings,
    updateSettings,
    requestPermission,
    sendTestNotification
  } = useNotifications();

  const [localSettings, setLocalSettings] = useState(null);
  const [saving, setSaving] = useState(false);
  const [sendingTest, setSendingTest] = useState(false);
  const [message, setMessage] = useState(null);
  const [devices, setDevices] = useState([]);
  const [loadingDevices, setLoadingDevices] = useState(false);

  // Initialize local settings
  useEffect(() => {
    if (settings) {
      setLocalSettings(settings);
    }
  }, [settings]);

  // Fetch devices
  useEffect(() => {
    if (user?._id) {
      fetchDevices();
    }
  }, [user?._id]);

  const fetchDevices = async () => {
    if (!user?._id) return;
    
    setLoadingDevices(true);
    try {
      const response = await api.get('/notifications/devices', {
        params: { userId: user._id }
      });
      if (response.data.success) {
        setDevices(response.data.devices);
      }
    } catch (error) {
      console.error('Fetch devices error:', error);
    } finally {
      setLoadingDevices(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    setMessage(null);
    
    const success = await updateSettings(localSettings);
    
    if (success) {
      setMessage({ type: 'success', text: 'Đã lưu cài đặt thông báo!' });
    } else {
      setMessage({ type: 'error', text: 'Có lỗi xảy ra. Vui lòng thử lại.' });
    }
    
    setSaving(false);
    
    // Clear message after 3 seconds
    setTimeout(() => setMessage(null), 3000);
  };

  const handleTestNotification = async () => {
    setSendingTest(true);
    const success = await sendTestNotification();
    
    if (success) {
      setMessage({ type: 'success', text: 'Đã gửi thông báo thử nghiệm!' });
    } else {
      setMessage({ type: 'error', text: 'Không thể gửi thông báo. Vui lòng kiểm tra cài đặt.' });
    }
    
    setSendingTest(false);
    setTimeout(() => setMessage(null), 3000);
  };

  const handleEnablePush = async () => {
    const success = await requestPermission();
    if (success) {
      setMessage({ type: 'success', text: 'Đã bật thông báo đẩy thành công!' });
      fetchDevices();
    } else {
      setMessage({ type: 'error', text: 'Không thể bật thông báo. Vui lòng kiểm tra quyền trong trình duyệt.' });
    }
  };

  const handleRemoveDevice = async (deviceId) => {
    if (!user?._id) return;
    
    try {
      const response = await api.delete(`/notifications/devices/${deviceId}`, {
        params: { userId: user._id }
      });
      if (response.data.success) {
        setDevices(devices.filter(d => d.id !== deviceId));
        setMessage({ type: 'success', text: 'Đã xóa thiết bị!' });
      }
    } catch (error) {
      console.error('Remove device error:', error);
    }
  };

  const updateLocalSetting = (path, value) => {
    setLocalSettings(prev => {
      const newSettings = { ...prev };
      const keys = path.split('.');
      let current = newSettings;
      
      for (let i = 0; i < keys.length - 1; i++) {
        if (!current[keys[i]]) current[keys[i]] = {};
        current = current[keys[i]];
      }
      current[keys[keys.length - 1]] = value;
      
      return newSettings;
    });
  };

  if (!localSettings) {
    return (
      <div className="flex items-center justify-center py-8">
        <Loader2 className="w-8 h-8 animate-spin text-purple-500" />
      </div>
    );
  }

  const days = [
    { value: 1, label: 'T2' },
    { value: 2, label: 'T3' },
    { value: 3, label: 'T4' },
    { value: 4, label: 'T5' },
    { value: 5, label: 'T6' },
    { value: 6, label: 'T7' },
    { value: 0, label: 'CN' }
  ];

  return (
    <div className="space-y-6">
      {/* Message */}
      {message && (
        <div className={`flex items-center gap-2 p-4 rounded-lg ${
          message.type === 'success' 
            ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
            : 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
        }`}>
          {message.type === 'success' ? <Check className="w-5 h-5" /> : <AlertCircle className="w-5 h-5" />}
          {message.text}
        </div>
      )}

      {/* Push Notification Permission */}
      {permissionStatus !== 'granted' && (
        <div className="bg-gradient-to-r from-purple-500 to-indigo-600 rounded-xl p-6 text-white">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-white/20 rounded-lg">
              <Bell className="w-8 h-8" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold mb-2">Bật thông báo đẩy</h3>
              <p className="text-white/80 text-sm mb-4">
                Nhận thông báo nhắc nhở học tập, cảnh báo streak và nhiều hơn nữa ngay trên trình duyệt!
              </p>
              <button
                onClick={handleEnablePush}
                className="bg-white text-purple-600 px-6 py-2 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
              >
                Bật thông báo
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Settings */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
        {/* Header */}
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-bold text-gray-800 dark:text-white flex items-center gap-2">
            <Bell className="w-6 h-6 text-purple-500" />
            Cài đặt thông báo
          </h2>
          <p className="text-gray-500 text-sm mt-1">
            Tùy chỉnh cách bạn nhận thông báo từ ChemLearn
          </p>
        </div>

        <div className="p-6 space-y-8">
          {/* Channels */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4 flex items-center gap-2">
              <Smartphone className="w-5 h-5" />
              Kênh thông báo
            </h3>
            
            <div className="space-y-4">
              {/* Push Notifications */}
              <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                <div className="flex items-center gap-3">
                  <Bell className="w-5 h-5 text-purple-500" />
                  <div>
                    <p className="font-medium text-gray-800 dark:text-white">Thông báo đẩy</p>
                    <p className="text-sm text-gray-500">Nhận thông báo trên trình duyệt</p>
                  </div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={localSettings.pushEnabled}
                    onChange={(e) => updateLocalSetting('pushEnabled', e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 dark:peer-focus:ring-purple-800 rounded-full peer dark:bg-gray-600 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-500 peer-checked:bg-purple-600"></div>
                </label>
              </div>

              {/* Email Notifications */}
              <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-blue-500" />
                  <div>
                    <p className="font-medium text-gray-800 dark:text-white">Thông báo qua email</p>
                    <p className="text-sm text-gray-500">Nhận email nhắc nhở và báo cáo</p>
                  </div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={localSettings.emailEnabled}
                    onChange={(e) => updateLocalSetting('emailEnabled', e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 dark:peer-focus:ring-purple-800 rounded-full peer dark:bg-gray-600 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-500 peer-checked:bg-purple-600"></div>
                </label>
              </div>
            </div>
          </div>

          {/* Study Reminder */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4 flex items-center gap-2">
              <Clock className="w-5 h-5" />
              Nhắc nhở học tập
            </h3>
            
            <div className="space-y-4 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-800 dark:text-white">Bật nhắc nhở hàng ngày</p>
                  <p className="text-sm text-gray-500">Nhận thông báo nhắc học vào giờ đã chọn</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={localSettings.studyReminder?.enabled}
                    onChange={(e) => updateLocalSetting('studyReminder.enabled', e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 dark:peer-focus:ring-purple-800 rounded-full peer dark:bg-gray-600 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-500 peer-checked:bg-purple-600"></div>
                </label>
              </div>

              {localSettings.studyReminder?.enabled && (
                <>
                  <div className="flex items-center gap-4">
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      Giờ nhắc:
                    </label>
                    <input
                      type="time"
                      value={localSettings.studyReminder?.time || '18:00'}
                      onChange={(e) => updateLocalSetting('studyReminder.time', e.target.value)}
                      className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300 block mb-2">
                      Các ngày nhắc:
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {days.map((day) => (
                        <button
                          key={day.value}
                          onClick={() => {
                            const currentDays = localSettings.studyReminder?.days || [];
                            const newDays = currentDays.includes(day.value)
                              ? currentDays.filter(d => d !== day.value)
                              : [...currentDays, day.value];
                            updateLocalSetting('studyReminder.days', newDays);
                          }}
                          className={`px-3 py-1.5 rounded-lg font-medium transition-colors ${
                            (localSettings.studyReminder?.days || []).includes(day.value)
                              ? 'bg-purple-500 text-white'
                              : 'bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300'
                          }`}
                        >
                          {day.label}
                        </button>
                      ))}
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Other Notifications */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4 flex items-center gap-2">
              <Sparkles className="w-5 h-5" />
              Loại thông báo khác
            </h3>
            
            <div className="space-y-3">
              {/* Streak Reminder */}
              <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                <div className="flex items-center gap-3">
                  <Flame className="w-5 h-5 text-orange-500" />
                  <div>
                    <p className="font-medium text-gray-800 dark:text-white">Cảnh báo streak</p>
                    <p className="text-sm text-gray-500">Nhắc khi sắp mất chuỗi học</p>
                  </div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={localSettings.streakReminder?.enabled}
                    onChange={(e) => updateLocalSetting('streakReminder.enabled', e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 dark:peer-focus:ring-purple-800 rounded-full peer dark:bg-gray-600 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-500 peer-checked:bg-purple-600"></div>
                </label>
              </div>

              {/* Achievement */}
              <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                <div className="flex items-center gap-3">
                  <Trophy className="w-5 h-5 text-yellow-500" />
                  <div>
                    <p className="font-medium text-gray-800 dark:text-white">Thành tựu</p>
                    <p className="text-sm text-gray-500">Thông báo khi đạt thành tựu mới</p>
                  </div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={localSettings.achievementNotification?.enabled}
                    onChange={(e) => updateLocalSetting('achievementNotification.enabled', e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 dark:peer-focus:ring-purple-800 rounded-full peer dark:bg-gray-600 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-500 peer-checked:bg-purple-600"></div>
                </label>
              </div>

              {/* New Content */}
              <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                <div className="flex items-center gap-3">
                  <Sparkles className="w-5 h-5 text-green-500" />
                  <div>
                    <p className="font-medium text-gray-800 dark:text-white">Nội dung mới</p>
                    <p className="text-sm text-gray-500">Thông báo khi có bài học/thử thách mới</p>
                  </div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={localSettings.newContentNotification?.enabled}
                    onChange={(e) => updateLocalSetting('newContentNotification.enabled', e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 dark:peer-focus:ring-purple-800 rounded-full peer dark:bg-gray-600 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-500 peer-checked:bg-purple-600"></div>
                </label>
              </div>

              {/* Weekly Report */}
              <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                <div className="flex items-center gap-3">
                  <FileText className="w-5 h-5 text-blue-500" />
                  <div>
                    <p className="font-medium text-gray-800 dark:text-white">Báo cáo tuần</p>
                    <p className="text-sm text-gray-500">Nhận tổng kết học tập hàng tuần</p>
                  </div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={localSettings.weeklyReport?.enabled}
                    onChange={(e) => updateLocalSetting('weeklyReport.enabled', e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 dark:peer-focus:ring-purple-800 rounded-full peer dark:bg-gray-600 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-500 peer-checked:bg-purple-600"></div>
                </label>
              </div>
            </div>
          </div>

          {/* Registered Devices */}
          {devices.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4 flex items-center gap-2">
                <Smartphone className="w-5 h-5" />
                Thiết bị đã đăng ký ({devices.length})
              </h3>
              
              <div className="space-y-2">
                {devices.map((device) => (
                  <div
                    key={device.id}
                    className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg"
                  >
                    <div>
                      <p className="font-medium text-gray-800 dark:text-white">
                        {device.deviceInfo || 'Thiết bị không xác định'}
                      </p>
                      <p className="text-xs text-gray-500">
                        Đăng ký: {new Date(device.createdAt).toLocaleDateString('vi-VN')}
                      </p>
                    </div>
                    <button
                      onClick={() => handleRemoveDevice(device.id)}
                      className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                      title="Xóa thiết bị"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="p-6 bg-gray-50 dark:bg-gray-700/50 border-t border-gray-200 dark:border-gray-700 flex flex-wrap gap-4 justify-between">
          <button
            onClick={handleTestNotification}
            disabled={sendingTest}
            className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors disabled:opacity-50"
          >
            {sendingTest ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Send className="w-4 h-4" />
            )}
            Gửi thông báo thử
          </button>

          <button
            onClick={handleSave}
            disabled={saving}
            className="flex items-center gap-2 px-6 py-2 bg-gradient-to-r from-purple-500 to-indigo-600 text-white rounded-lg font-semibold hover:from-purple-600 hover:to-indigo-700 transition-colors disabled:opacity-50"
          >
            {saving ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Check className="w-4 h-4" />
            )}
            Lưu cài đặt
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotificationSettings;
