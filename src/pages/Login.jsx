import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import Button from '../components/ui/Button';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { login, loginWithGoogle } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      setError('');
      setLoading(true);
      await login(email, password);
      navigate('/dashboard');
    } catch (error) {
      setError('Đăng nhập thất bại. Vui lòng kiểm tra lại email và mật khẩu.');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      setError('');
      setLoading(true);
      await loginWithGoogle();
      navigate('/dashboard');
    } catch (error) {
      setError('Đăng nhập với Google thất bại.');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center bg-gradient-to-br from-blue-100 via-indigo-50 to-sky-50 px-4 py-6 relative overflow-hidden">
      {/* Enhanced floating particles with chemistry elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Chemistry molecules floating */}
        <div className="absolute top-1/4 left-1/4 text-2xl animate-float-slow opacity-60">⚛️</div>
        <div className="absolute top-1/3 right-1/3 text-xl animate-float-medium opacity-50">🧪</div>
        <div className="absolute bottom-1/4 left-1/3 text-3xl animate-float-fast opacity-40">🔬</div>
        <div className="absolute top-2/3 right-1/4 text-lg animate-float-slow opacity-70">⚗️</div>
        <div className="absolute bottom-1/3 right-1/2 text-2xl animate-float-medium opacity-30">🌐</div>
        <div className="absolute top-1/2 left-1/6 text-sm animate-float-fast opacity-60">💎</div>
        
        {/* Colored particles */}
        <div className="absolute top-1/5 right-1/5 w-2 h-2 bg-gradient-to-r from-blue-400 to-indigo-400 rounded-full animate-float-slow opacity-60"></div>
        <div className="absolute bottom-1/5 left-1/5 w-3 h-3 bg-gradient-to-r from-indigo-400 to-sky-400 rounded-full animate-float-medium opacity-50"></div>
        <div className="absolute top-3/5 left-3/4 w-1.5 h-1.5 bg-gradient-to-r from-sky-400 to-blue-400 rounded-full animate-float-fast opacity-70"></div>
      </div>
      
      {/* Enhanced wave effect with gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-blue-200/30 via-indigo-100/20 to-transparent wave-animation"></div>
      
      <div className="bg-white/85 backdrop-blur-md p-5 rounded-3xl shadow-2xl w-full max-w-md border border-white/20 relative z-10 hover:shadow-3xl transition-all duration-300">
        {/* Header with chemistry icon */}
        <div className="text-center mb-5">
          <h1 className="text-2xl font-bold text-gray-800 mb-1">Đăng nhập</h1>
          <p className="text-sm text-gray-600">Chào mừng trở lại với <span className="font-semibold text-blue-600">ChemLearn!</span></p>
        </div>
        
        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 text-red-700 px-3 py-2 rounded-lg mb-4 flex items-center text-sm">
            <span className="mr-2">⚠️</span>
            {error}
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <label className="block text-gray-700 font-medium mb-1 text-sm">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 hover:border-indigo-300 text-sm"
              placeholder="example@email.com"
              required
            />
          </div>
          
          <div>
            <label className="block text-gray-700 font-medium mb-1 text-sm">
              Mật khẩu
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 hover:border-indigo-300 text-sm"
              placeholder="••••••••"
              required
            />
          </div>
          
          <Button 
            type="submit" 
            className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white py-2.5 px-6 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-[1.02] text-sm" 
            disabled={loading}
          >
            {loading ? (
              <div className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                Đang đăng nhập...
              </div>
            ) : (
              <div className="flex items-center justify-center">
                Đăng nhập
              </div>
            )}
          </Button>
        </form>
        
        <div className="mt-5">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white text-gray-500 font-medium">Hoặc</span>
            </div>
          </div>
          
          <button
            onClick={handleGoogleLogin}
            disabled={loading}
            className="w-full mt-4 px-4 py-2.5 border border-gray-300 rounded-xl hover:bg-gradient-to-r hover:from-red-50 hover:to-orange-50 transition-all duration-200 flex items-center justify-center space-x-3 disabled:opacity-50 hover:border-red-300 hover:shadow-md text-sm"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            <span className="font-medium">Đăng nhập với Google</span>
          </button>
        </div>
        
        <div className="mt-5 text-center">
          <p className="text-gray-600 text-sm">
            Chưa có tài khoản?{' '}
            <Link to="/register" className="text-blue-600 font-semibold hover:text-indigo-600 transition-colors duration-200 hover:underline">
              Đăng ký ngay 📝
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
