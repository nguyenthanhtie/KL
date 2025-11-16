import React, { useState } from 'react';
import { signInWithPopup, GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../config/firebase';
import './LoginRegister.css';

const LoginRegister = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    selectedProgram: 'chemistry'
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const programs = [
    { id: 'chemistry', name: 'Hóa học', icon: '🧪' },
    { id: 'physics', name: 'Vật lý', icon: '⚛️' },
    { id: 'biology', name: 'Sinh học', icon: '🧬' },
    { id: 'math', name: 'Toán học', icon: '📐' }
  ];

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError('');
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    setError('');
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      // Gửi thông tin đến backend
      const response = await fetch('/api/auth/google-login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firebaseUid: user.uid,
          email: user.email,
          displayName: user.displayName,
          avatar: user.photoURL,
          selectedProgram: formData.selectedProgram
        })
      });

      const data = await response.json();
      
      if (data.success) {
        localStorage.setItem('user', JSON.stringify(data.user));
        // Kiểm tra xem user đã có programs chưa
        if (data.user.programs && data.user.programs.length > 0) {
          window.location.href = '/dashboard';
        } else {
          window.location.href = '/';
        }
      } else {
        setError(data.message || 'Đăng nhập thất bại');
      }
    } catch (err) {
      setError(err.message || 'Đăng nhập với Google thất bại');
    } finally {
      setLoading(false);
    }
  };

  const handleEmailRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Validate
    if (!isLogin && formData.password !== formData.confirmPassword) {
      setError('Mật khẩu xác nhận không khớp');
      setLoading(false);
      return;
    }

    if (formData.password.length < 6) {
      setError('Mật khẩu phải có ít nhất 6 ký tự');
      setLoading(false);
      return;
    }

    try {
      if (isLogin) {
        // Đăng nhập
        const userCredential = await signInWithEmailAndPassword(auth, formData.email, formData.password);
        const user = userCredential.user;

        const response = await fetch('/api/auth/email-login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            firebaseUid: user.uid,
            email: user.email
          })
        });

        const data = await response.json();
        
        if (data.success) {
          localStorage.setItem('user', JSON.stringify(data.user));
          // Kiểm tra xem user đã có programs chưa
          if (data.user.programs && data.user.programs.length > 0) {
            window.location.href = '/dashboard';
          } else {
            window.location.href = '/';
          }
        } else {
          setError(data.message || 'Đăng nhập thất bại');
        }
      } else {
        // Đăng ký
        const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
        const user = userCredential.user;

        const response = await fetch('/api/auth/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            username: formData.username,
            email: formData.email,
            firebaseUid: user.uid,
            selectedProgram: formData.selectedProgram
          })
        });

        const data = await response.json();
        
        if (data.success) {
          localStorage.setItem('user', JSON.stringify(data.user));
          // Chuyển đến program selection để chọn môn học và làm placement test
          window.location.href = '/';
        } else {
          setError(data.message || 'Đăng ký thất bại');
        }
      }
    } catch (err) {
      setError(err.message || (isLogin ? 'Đăng nhập thất bại' : 'Đăng ký thất bại'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <h1>{isLogin ? 'Đăng nhập' : 'Đăng ký'}</h1>
          <p>{isLogin ? 'Chào mừng bạn trở lại!' : 'Tạo tài khoản mới'}</p>
        </div>

        {error && <div className="error-message">{error}</div>}

        <form onSubmit={handleEmailRegister}>
          {!isLogin && (
            <div className="form-group">
              <label>Tên người dùng</label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleInputChange}
                placeholder="Nhập tên người dùng"
                required
                minLength={3}
                maxLength={30}
              />
            </div>
          )}

          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Nhập email"
              required
            />
          </div>

          <div className="form-group">
            <label>Mật khẩu</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              placeholder="Nhập mật khẩu"
              required
              minLength={6}
            />
          </div>

          {!isLogin && (
            <>
              <div className="form-group">
                <label>Xác nhận mật khẩu</label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  placeholder="Nhập lại mật khẩu"
                  required
                />
              </div>

              <div className="form-group">
                <label>Chọn chương trình học</label>
                <div className="program-selection">
                  {programs.map(program => (
                    <div
                      key={program.id}
                      className={`program-card ${formData.selectedProgram === program.id ? 'selected' : ''}`}
                      onClick={() => setFormData({ ...formData, selectedProgram: program.id })}
                    >
                      <span className="program-icon">{program.icon}</span>
                      <span className="program-name">{program.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}

          <button type="submit" className="btn-primary" disabled={loading}>
            {loading ? 'Đang xử lý...' : (isLogin ? 'Đăng nhập' : 'Đăng ký')}
          </button>
        </form>

        <div className="divider">
          <span>hoặc</span>
        </div>

        <button onClick={handleGoogleLogin} className="btn-google" disabled={loading}>
          <img src="/google-icon.svg" alt="Google" />
          {isLogin ? 'Đăng nhập với Google' : 'Đăng ký với Google'}
        </button>

        <div className="auth-footer">
          <p>
            {isLogin ? 'Chưa có tài khoản?' : 'Đã có tài khoản?'}
            <button onClick={() => setIsLogin(!isLogin)} className="link-button">
              {isLogin ? 'Đăng ký ngay' : 'Đăng nhập'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginRegister;
