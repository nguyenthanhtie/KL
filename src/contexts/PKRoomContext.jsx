import { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react';
import { useAuth } from './AuthContext';

const PKRoomContext = createContext();

export const usePKRoom = () => useContext(PKRoomContext);

export const PKRoomProvider = ({ children }) => {
  const { user } = useAuth();
  const [pkRoom, setPKRoom] = useState(null);
  const prevUserIdRef = useRef(null);

  // Lấy userId từ user object
  const getUserId = useCallback((userData) => {
    if (!userData) return null;
    return userData._id || userData.id || userData.firebaseUid || userData.uid;
  }, []);

  // Load phòng PK từ localStorage và kiểm tra userId
  useEffect(() => {
    const currentUserId = getUserId(user);
    const prevUserId = prevUserIdRef.current;
    
    // Nếu user thay đổi (đăng xuất hoặc đổi tài khoản), xóa phòng PK ngay lập tức
    if (prevUserId !== null && prevUserId !== currentUserId) {
      console.log('🔄 User changed, clearing PK room. Previous:', prevUserId, 'Current:', currentUserId);
      localStorage.removeItem('pkRoom');
      setPKRoom(null);
      prevUserIdRef.current = currentUserId;
      return;
    }
    
    // Cập nhật ref
    prevUserIdRef.current = currentUserId;
    
    // Nếu chưa đăng nhập, không restore phòng và xóa nếu có
    if (!currentUserId) {
      const stored = localStorage.getItem('pkRoom');
      if (stored) {
        console.log('🚫 No user logged in, clearing stored PK room');
        localStorage.removeItem('pkRoom');
      }
      setPKRoom(null);
      return;
    }
    
    const stored = localStorage.getItem('pkRoom');
    
    if (stored) {
      try {
        const roomData = JSON.parse(stored);
        
        // Chỉ restore phòng nếu userId khớp với user hiện tại
        if (roomData.userId === currentUserId) {
          console.log('✅ Restoring PK room for user:', currentUserId);
          setPKRoom(roomData);
        } else {
          // Xóa phòng cũ nếu không khớp userId
          console.log('⚠️ PK room userId mismatch. Room:', roomData.userId, 'Current:', currentUserId);
          localStorage.removeItem('pkRoom');
          setPKRoom(null);
        }
      } catch (e) {
        console.error('❌ Error parsing PK room data:', e);
        localStorage.removeItem('pkRoom');
        setPKRoom(null);
      }
    } else {
      setPKRoom(null);
    }
  }, [user, getUserId]); // Chạy lại khi user thay đổi

  const joinRoom = useCallback((room) => {
    const currentUserId = getUserId(user);
    if (!currentUserId) {
      console.warn('Cannot join room: No user logged in');
      return;
    }
    
    // Lưu cả userId để kiểm tra sau này
    const roomWithUser = { ...room, userId: currentUserId };
    setPKRoom(roomWithUser);
    localStorage.setItem('pkRoom', JSON.stringify(roomWithUser));
  }, [user, getUserId]);

  const leaveRoom = useCallback(() => {
    console.log('👋 Leaving PK room');
    setPKRoom(null);
    localStorage.removeItem('pkRoom');
  }, []);

  // Hàm clear để dùng khi đăng xuất hoặc cần reset
  const clearRoom = useCallback(() => {
    console.log('🧹 Clearing PK room (forced)');
    setPKRoom(null);
    localStorage.removeItem('pkRoom');
    prevUserIdRef.current = null;
  }, []);

  return (
    <PKRoomContext.Provider value={{ pkRoom, joinRoom, leaveRoom, clearRoom }}>
      {children}
    </PKRoomContext.Provider>
  );
};
