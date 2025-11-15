import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import { API_BASE_URL } from '../config/api';

const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    displayName: '',
  });
  
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  
  const { signup, loginWithGoogle } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'grade' ? parseInt(value) : value
    }));
    
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.username.trim()) {
      newErrors.username = 'Tên người dùng là bắt buộc';
    } else if (formData.username.length < 3) {
      newErrors.username = 'Tên người dùng phải có ít nhất 3 ký tự';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email là bắt buộc';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email không hợp lệ';
    }

    if (!formData.password) {
      newErrors.password = 'Mật khẩu là bắt buộc';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Mật khẩu phải có ít nhất 6 ký tự';
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Mật khẩu xác nhận không khớp';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setLoading(true);
    try {
      // 1. Tạo tài khoản Firebase
      const userCredential = await signup(formData.email, formData.password);
      
      // 2. Tạo profile trong database
      try {
        const response = await fetch(`${API_BASE_URL}/users/profile`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: formData.email,
            firebaseUid: userCredential.user.uid,
            displayName: formData.displayName || formData.username,
            username: formData.username
          }),
        });

        if (!response.ok) {
          const data = await response.json();
          throw new Error(data.message || 'Không thể tạo profile người dùng');
        }
      } catch (profileError) {
        console.error('Profile creation error:', profileError);
        // Nếu tạo profile thất bại, vẫn cho đăng nhập
        // AuthContext sẽ tự động tạo profile khi sync
      }

      // 3. User mới đăng ký -> chưa có chương trình học -> đến trang chọn chương trình
      setTimeout(() => {
        navigate('/');
      }, 500);
    } catch (error) {
      console.error('Registration error:', error);
      let errorMessage = 'Đăng ký thất bại';
      
      if (error.code === 'auth/email-already-in-use') {
        errorMessage = 'Email này đã được sử dụng';
      } else if (error.code === 'auth/invalid-email') {
        errorMessage = 'Email không hợp lệ';
      } else if (error.code === 'auth/weak-password') {
        errorMessage = 'Mật khẩu quá yếu';
      } else if (error.message) {
        errorMessage = error.message;
      }
      
      setErrors({ submit: errorMessage });
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignup = async () => {
    try {
      setErrors({});
      setLoading(true);
      const result = await loginWithGoogle();
      
      // Đợi AuthContext sync user với database
      setTimeout(async () => {
        try {
          // Lấy user profile từ API để có thông tin mới nhất
          const response = await fetch(`${API_BASE_URL}/users/profile/${result.user.uid}`);
          if (response.ok) {
            const userData = await response.json();
            
            // Kiểm tra xem user đã có chương trình học chưa
            if (userData.programs && userData.programs.length > 0) {
              const activeProgram = userData.programs.find(p => p.isActive);
              if (activeProgram) {
                // Đã có chương trình học -> đến trang home của chương trình đó
                navigate(`/program/${activeProgram.programId}`);
                return;
              }
            }
          }
        } catch (err) {
          console.error('Error fetching user profile:', err);
        }
        
        // Chưa có chương trình học -> đến trang chọn chương trình
        navigate('/');
      }, 500);
    } catch (error) {
      setErrors({ submit: 'Đăng ký với Google thất bại.' });
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[90vh] bg-gradient-to-br from-blue-100 via-indigo-50 to-sky-50 flex items-center justify-center py-6 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Enhanced floating particles with chemistry elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Chemistry molecules floating */}
        <div className="absolute top-1/5 left-1/5 text-2xl animate-float-slow opacity-60">⚛️</div>
        <div className="absolute top-1/4 right-1/4 text-xl animate-float-medium opacity-50">🧪</div>
        <div className="absolute bottom-1/5 left-1/2 text-3xl animate-float-fast opacity-40">🔬</div>
        <div className="absolute top-3/5 right-1/5 text-lg animate-float-slow opacity-70">⚗️</div>
        <div className="absolute bottom-1/4 right-2/3 text-2xl animate-float-medium opacity-30">🌐</div>
        <div className="absolute top-2/5 left-1/4 text-sm animate-float-fast opacity-60">💎</div>
        <div className="absolute bottom-2/5 left-3/4 text-xl animate-float-slow opacity-45">🧬</div>
        
        {/* Colored particles */}
        <div className="absolute top-1/6 right-1/6 w-2 h-2 bg-gradient-to-r from-blue-400 to-indigo-400 rounded-full animate-float-slow opacity-60"></div>
        <div className="absolute bottom-1/6 left-1/6 w-3 h-3 bg-gradient-to-r from-indigo-400 to-sky-400 rounded-full animate-float-medium opacity-50"></div>
        <div className="absolute top-4/5 left-4/5 w-1.5 h-1.5 bg-gradient-to-r from-sky-400 to-blue-400 rounded-full animate-float-fast opacity-70"></div>
      </div>
      
      {/* Enhanced gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-tr from-blue-100/20 via-transparent to-indigo-100/20"></div>
      
      <div className="max-w-md w-full space-y-5 relative z-10">
        {/* Enhanced header */}


        <Card className="p-5 bg-white/85 backdrop-blur-md border border-white/20 shadow-2xl rounded-3xl hover:shadow-3xl transition-all duration-300">
          <form onSubmit={handleSubmit}>
            <div className="space-y-3">
                      <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-1">
            Tạo tài khoản mới
          </h2>
          <p className="text-gray-600 text-sm">
            Bắt đầu hành trình học <span className="font-semibold text-blue-600">Hóa học</span> cùng chúng tôi
          </p>
        </div>
              <div>
                <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                  <span className="mr-2">👤</span>
                  Tên người dùng *
                </label>
                <input
                  id="username"
                  name="username"
                  type="text"
                  value={formData.username}
                  onChange={handleChange}
                  className="w-full px-3 py-2.5 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 hover:border-indigo-300 text-sm"
                  placeholder="Nhập tên người dùng"
                />
                {errors.username && (
                  <p className="mt-1 text-xs text-red-600 flex items-center">
                    <span className="mr-1">⚠️</span>
                    {errors.username}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                  <span className="mr-2">📧</span>
                  Email *
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-3 py-2.5 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 hover:border-indigo-300 text-sm"
                  placeholder="Nhập email"
                />
                {errors.email && (
                  <p className="mt-1 text-xs text-red-600 flex items-center">
                    <span className="mr-1">⚠️</span>
                    {errors.email}
                  </p>
                )}
              </div>
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                  <span className="mr-2">🔐</span>
                  Mật khẩu *
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full px-3 py-2.5 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 hover:border-indigo-300 text-sm"
                  placeholder="Nhập mật khẩu (ít nhất 6 ký tự)"
                />
                {errors.password && (
                  <p className="mt-1 text-xs text-red-600 flex items-center">
                    <span className="mr-1">⚠️</span>
                    {errors.password}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                  <span className="mr-2">🔒</span>
                  Xác nhận mật khẩu *
                </label>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="w-full px-3 py-2.5 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 hover:border-indigo-300 text-sm"
                  placeholder="Nhập lại mật khẩu"
                />
                {errors.confirmPassword && (
                  <p className="mt-1 text-xs text-red-600 flex items-center">
                    <span className="mr-1">⚠️</span>
                    {errors.confirmPassword}
                  </p>
                )}
              </div>
            </div>

            {errors.submit && (
              <div className="mt-3 p-3 bg-red-50 border-l-4 border-red-500 rounded-lg">
                <p className="text-xs text-red-600 flex items-center">
                  {errors.submit}
                </p>
              </div>
            )}

            <div className="mt-5">
              <Button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white py-2.5 px-6 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-[1.02] text-sm"
              >
                {loading ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Đang tạo tài khoản...
                  </div>
                ) : (
                  <div className="flex items-center justify-center">
                    Tạo tài khoản
                  </div>
                )}
              </Button>
            </div>

            <div className="mt-3">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-white text-gray-500 font-medium">Hoặc</span>
                </div>
              </div>

              <button
                type="button"
                onClick={handleGoogleSignup}
                disabled={loading}
                className="mt-3 w-full flex justify-center items-center px-4 py-2.5 border border-gray-300 rounded-xl shadow-sm text-xs font-medium text-gray-700 bg-white hover:bg-gradient-to-r hover:from-red-50 hover:to-orange-50 transition-all duration-200 hover:border-red-300 hover:shadow-md"
              >
                <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                Đăng ký với Google
              </button>
            </div>

            <div className="mt-3 text-center">
              <p className="text-xs text-gray-600">
                Đã có tài khoản?{' '}
                <Link
                  to="/login"
                  className="font-semibold text-blue-600 hover:text-indigo-600 transition-colors duration-200 hover:underline"
                >
                  Đăng nhập ngay 🔑
                </Link>
              </p>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default Register;