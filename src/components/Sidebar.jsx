import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { 
  LogOut, 
  Home, 
  BookOpen, 
  Trophy, 
  User, 
  Settings, 
  ChevronLeft, 
  ChevronRight,
  Beaker,
  Atom,
  Brain,
  Calculator,
  Swords,
  Menu,
  X,
  Sparkles,
  GraduationCap
} from 'lucide-react';

const Sidebar = ({ children }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileOpen(false);
  }, [location.pathname]);

  // Close mobile menu on escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        setIsMobileOpen(false);
      }
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, []);

  const handleLogout = async () => {
    try {
      const confirmed = window.confirm('Bạn có chắc muốn đăng xuất?');
      if (!confirmed) return;
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const menuItems = [
    {
      title: ' Trang chủ',
      icon: Beaker,
      path: '/program/chemistry',
      gradient: 'from-purple-500 to-pink-500'
    },
    {
      title: 'Thử thách',
      icon: Trophy,
      path: '/advanced-challenge',
      gradient: 'from-amber-500 to-orange-500'
    },
    {
      title: 'PK Đối kháng',
      icon: Swords,
      path: '/chemistry/pk',
      gradient: 'from-red-500 to-rose-500'
    },
    {
      title: 'Hồ sơ',
      icon: User,
      path: '/profile',
      gradient: 'from-emerald-500 to-teal-500'
    }
  ];

  const isActive = (path) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };

  const NavLink = ({ item }) => {
    const active = isActive(item.path);
    const Icon = item.icon;
    
    return (
      <Link
        to={item.path}
        className={`
          group flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-300 relative overflow-hidden
          ${active 
            ? `bg-gradient-to-r ${item.gradient} text-white shadow-lg` 
            : 'text-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800'
          }
          ${isCollapsed ? 'justify-center' : ''}
        `}
      >
        {/* Glow effect for active item */}
        {active && (
          <div className={`absolute inset-0 bg-gradient-to-r ${item.gradient} opacity-20 blur-xl`} />
        )}
        
        <div className={`
          relative z-10 p-2 rounded-lg transition-all duration-300
          ${active ? 'bg-white/20' : `group-hover:bg-gradient-to-r group-hover:${item.gradient} group-hover:text-white`}
        `}>
          <Icon className="w-5 h-5" />
        </div>
        
        {!isCollapsed && (
          <span className={`
            relative z-10 font-medium transition-all duration-300
            ${active ? '' : 'group-hover:text-gray-900'}
          `}>
            {item.title}
          </span>
        )}
        
        {/* Hover indicator */}
        {!active && !isCollapsed && (
          <div className={`
            absolute right-3 w-1.5 h-1.5 rounded-full bg-gradient-to-r ${item.gradient}
            opacity-0 group-hover:opacity-100 transition-opacity duration-300
          `} />
        )}
      </Link>
    );
  };

  // Don't show sidebar on login/register pages or if user hasn't selected a program
  const hideSidebar = ['/login', '/register'].includes(location.pathname);
  const hasActiveProgram = user?.programs?.some(p => p.isActive);
  
  if (hideSidebar || !user || !hasActiveProgram) {
    return <>{children}</>;
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsMobileOpen(true)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
      >
        <Menu className="w-6 h-6 text-gray-700" />
      </button>

      {/* Mobile Overlay */}
      {isMobileOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-40 transition-opacity duration-300"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed lg:sticky top-0 left-0 h-screen z-50
        bg-white/80 backdrop-blur-xl border-r border-gray-200/50
        transition-all duration-300 ease-in-out
        ${isCollapsed ? 'w-20' : 'w-72'}
        ${isMobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        flex flex-col
        shadow-xl lg:shadow-none
      `}>
        {/* Header */}
        <div className={`
          flex items-center ${isCollapsed ? 'justify-center' : 'justify-between'} 
          p-4 border-b border-gray-200/50
        `}>
          {!isCollapsed && (
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 flex items-center justify-center shadow-lg">
                  <GraduationCap className="w-6 h-6 text-white" />
                </div>
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r from-amber-400 to-orange-500 rounded-full flex items-center justify-center">
                  <Sparkles className="w-2.5 h-2.5 text-white" />
                </div>
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                  KL Learning
                </h1>
                <p className="text-xs text-gray-500">Học tập thông minh</p>
              </div>
            </div>
          )}
          
          {isCollapsed && (
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 flex items-center justify-center shadow-lg">
              <GraduationCap className="w-6 h-6 text-white" />
            </div>
          )}

          {/* Mobile Close Button */}
          <button
            onClick={() => setIsMobileOpen(false)}
            className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2 overflow-y-auto scrollbar-thin">
          <div className={`text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4 ${isCollapsed ? 'text-center' : 'px-3'}`}>
            {isCollapsed ? '•••' : 'Menu chính'}
          </div>
          
          {menuItems.map((item) => (
            <NavLink key={item.path} item={item} />
          ))}
        </nav>

        {/* User Info & Logout */}
        <div className="p-4 border-t border-gray-200/50 space-y-3">
          {/* User Card */}
          {!isCollapsed && user && (
            <div className="flex items-center gap-3 p-3 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl">
              <div className="relative">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold shadow-md">
                  {user.displayName?.charAt(0)?.toUpperCase() || user.email?.charAt(0)?.toUpperCase() || 'U'}
                </div>
                <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-green-500 border-2 border-white rounded-full"></div>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-gray-800 truncate">
                  {user.displayName || 'Người dùng'}
                </p>
                <p className="text-xs text-gray-500 truncate">
                  {user.email}
                </p>
              </div>
            </div>
          )}

          {isCollapsed && user && (
            <div className="flex justify-center">
              <div className="relative">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold shadow-md">
                  {user.displayName?.charAt(0)?.toUpperCase() || user.email?.charAt(0)?.toUpperCase() || 'U'}
                </div>
                <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-green-500 border-2 border-white rounded-full"></div>
              </div>
            </div>
          )}

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className={`
              w-full flex items-center gap-3 px-3 py-3 rounded-xl
              text-gray-600 hover:text-red-600 hover:bg-red-50
              transition-all duration-300 group
              ${isCollapsed ? 'justify-center' : ''}
            `}
          >
            <div className="p-2 rounded-lg bg-gray-100 group-hover:bg-red-100 transition-colors">
              <LogOut className="w-5 h-5" />
            </div>
            {!isCollapsed && <span className="font-medium">Đăng xuất</span>}
          </button>

          {/* Collapse Toggle - Desktop Only */}
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="hidden lg:flex w-full items-center justify-center gap-2 px-3 py-2 rounded-xl text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-all duration-300"
          >
            {isCollapsed ? (
              <ChevronRight className="w-5 h-5" />
            ) : (
              <>
                <ChevronLeft className="w-5 h-5" />
                <span className="text-sm">Thu gọn</span>
              </>
            )}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className={`
        flex-1 min-h-screen transition-all duration-300
        ${user ? 'lg:ml-0' : ''}
      `}>
        {/* Mobile Header Spacer */}
        <div className="lg:hidden h-16" />
        
        {children}
      </main>
    </div>
  );
};

export default Sidebar;
