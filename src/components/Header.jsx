import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { usePKRoom } from '../contexts/PKRoomContext';
import { LogOut, GraduationCap, Sparkles, Bell, Search, User } from 'lucide-react';

const Header = () => {
  const { user, logout } = useAuth();
  const { clearRoom } = usePKRoom();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      // Clear PK room trước khi logout để tránh race condition
      clearRoom();
      
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <header className="w-full bg-white/80 backdrop-blur-xl border-b border-gray-100 sticky top-0 z-40">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="relative">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-105">
                <GraduationCap className="w-6 h-6 text-white" />
              </div>
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r from-amber-400 to-orange-500 rounded-full flex items-center justify-center animate-pulse">
                <Sparkles className="w-2.5 h-2.5 text-white" />
              </div>
            </div>
            <div className="hidden sm:block">
              <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                KL Learning
              </h1>
              <p className="text-xs text-gray-500 -mt-0.5">Học tập thông minh</p>
            </div>
          </Link>

          {/* Center - Search (optional) */}
          <div className="hidden md:flex flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Tìm kiếm bài học..."
                className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all duration-200"
              />
            </div>
          </div>

          {/* Right side */}
          {user ? (
            <div className="flex items-center gap-2 sm:gap-4">
              {/* Notifications */}
              <button className="relative p-2.5 hover:bg-gray-100 rounded-xl transition-all duration-200 group">
                <Bell className="w-5 h-5 text-gray-600 group-hover:text-gray-800" />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>

              {/* User Menu */}
              <div className="flex items-center gap-3 pl-3 border-l border-gray-200">
                <Link 
                  to="/profile"
                  className="flex items-center gap-3 p-1.5 pr-3 hover:bg-gray-100 rounded-xl transition-all duration-200 group"
                >
                  <div className="relative">
                    <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold shadow-md group-hover:shadow-lg transition-all">
                      {user.displayName?.charAt(0)?.toUpperCase() || user.email?.charAt(0)?.toUpperCase() || 'U'}
                    </div>
                    <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
                  </div>
                  <div className="hidden sm:block">
                    <p className="text-sm font-semibold text-gray-800 group-hover:text-gray-900 truncate max-w-[120px]">
                      {user.displayName || 'Người dùng'}
                    </p>
                    <p className="text-xs text-gray-500 truncate max-w-[120px]">
                      {user.email}
                    </p>
                  </div>
                </Link>

                {/* Logout */}
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 px-3 py-2.5 rounded-xl text-gray-600 hover:text-red-600 hover:bg-red-50 transition-all duration-200 group"
                  title="Đăng xuất"
                >
                  <LogOut className="w-5 h-5" />
                  <span className="hidden sm:inline text-sm font-medium">Đăng xuất</span>
                </button>
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <Link
                to="/login"
                className="px-4 py-2.5 text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors"
              >
                Đăng nhập
              </Link>
              <Link
                to="/register"
                className="px-5 py-2.5 text-sm font-medium text-white bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl hover:shadow-lg hover:scale-105 transition-all duration-200"
              >
                Đăng ký
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
