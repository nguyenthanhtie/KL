import { useLocation, Link } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

const ROUTE_LABELS = {
  'program': 'Chương trình',
  'chemistry': 'Hóa học',
  'advanced-challenge': 'Thử thách',
  'pk': 'PK Đối kháng',
  'room': 'Phòng',
  'chemistry-lab': 'Phòng thí nghiệm',
  'teacher': 'Giáo viên',
  'admin': 'Quản trị',
  'student': 'Học sinh',
  'classes': 'Lớp học',
  'lessons': 'Bài học',
  'assignments': 'Bài tập',
  'dashboard': 'Bảng điều khiển',
  'profile': 'Hồ sơ',
  'settings': 'Cài đặt',
  'users': 'Người dùng',
  'login': 'Đăng nhập',
  'register': 'Đăng ký',
  'home': 'Trang chủ',
  'spectate': 'Xem trận',
};

const Breadcrumb = () => {
  const location = useLocation();
  const pathSegments = location.pathname.split('/').filter(Boolean);

  if (pathSegments.length <= 1) return null;

  const crumbs = pathSegments.map((segment, index) => {
    const path = '/' + pathSegments.slice(0, index + 1).join('/');
    const label = ROUTE_LABELS[segment] || decodeURIComponent(segment);
    const isLast = index === pathSegments.length - 1;

    return { path, label, isLast };
  });

  return (
    <nav className="flex items-center gap-1 text-sm text-gray-500 px-4 py-2 bg-white/50 backdrop-blur-sm rounded-lg mb-3">
      <Link to="/program/chemistry" className="flex items-center gap-1 hover:text-indigo-600 transition-colors">
        <Home className="w-3.5 h-3.5" />
        <span>Trang chủ</span>
      </Link>
      {crumbs.map(({ path, label, isLast }) => (
        <span key={path} className="flex items-center gap-1">
          <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
          {isLast ? (
            <span className="text-gray-800 font-medium">{label}</span>
          ) : (
            <Link to={path} className="hover:text-indigo-600 transition-colors">
              {label}
            </Link>
          )}
        </span>
      ))}
    </nav>
  );
};

export default Breadcrumb;
