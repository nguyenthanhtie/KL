import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { signInWithPopup } from 'firebase/auth';
import { auth, googleProvider } from '../config/firebase';
import api, { API_BASE_URL } from '../config/api';
import {
  Mail, Lock, Eye, EyeOff, User, GraduationCap, ArrowRight, ArrowLeft, Loader2, CheckCircle2,
  School, BookOpen, Briefcase, FileText, Upload, X, Clock, Check
} from 'lucide-react';

const Register = () => {
  const navigate = useNavigate();
  const { register, setUser } = useAuth();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [selectedRole, setSelectedRole] = useState('student');
  const [teacherData, setTeacherData] = useState({
    school: '',
    subject: 'chemistry',
    department: '',
    yearsOfExperience: '',
    qualification: '',
    bio: ''
  });
  const [teacherDocuments, setTeacherDocuments] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [registrationSuccess, setRegistrationSuccess] = useState(false);

  // Stepper state
  const [currentStep, setCurrentStep] = useState(1);
  const teacherSteps = [
    { number: 1, title: 'Tài khoản' },
    { number: 2, title: 'Chuyên môn' },
    { number: 3, title: 'Hồ sơ' }
  ];

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError('');
  };

  const handleTeacherChange = (e) => {
    setTeacherData({
      ...teacherData,
      [e.target.name]: e.target.value
    });
  };

  const handleRoleChange = (role) => {
    if (role !== selectedRole) {
      setSelectedRole(role);
      setCurrentStep(1);
      setError('');
    }
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    const maxFiles = 5;
    const maxSize = 10 * 1024 * 1024;

    const validFiles = files.filter(file => {
      if (file.size > maxSize) {
        setError(`File "${file.name}" vượt quá 10MB`);
        return false;
      }
      return true;
    });

    if (teacherDocuments.length + validFiles.length > maxFiles) {
      setError(`Tối đa ${maxFiles} file`);
      return;
    }

    setTeacherDocuments(prev => [...prev, ...validFiles]);
    setError('');
  };

  const removeFile = (index) => {
    setTeacherDocuments(prev => prev.filter((_, i) => i !== index));
  };

  const handleGoogleRegister = async () => {
    setLoading(true);
    setError('');

    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;

      const response = await fetch(`${API_BASE_URL}/auth/google-login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firebaseUid: user.uid,
          email: user.email,
          displayName: user.displayName,
          avatar: user.photoURL,
          selectedProgram: 'chemistry'
        })
      });

      const data = await response.json();

      if (data.success) {
        setUser(data.user);
        localStorage.setItem('user', JSON.stringify(data.user));
        localStorage.setItem('token', data.token || '');
        navigate('/home');
      } else {
        setError(data.message || 'Đăng ký thất bại');
      }
    } catch (err) {
      let errorMessage = 'Đăng ký với Google thất bại';
      if (err.code === 'auth/popup-closed-by-user') {
        errorMessage = 'Bạn đã đóng cửa sổ đăng nhập';
      } else if (err.code === 'auth/popup-blocked') {
        errorMessage = 'Trình duyệt đã chặn popup. Vui lòng cho phép popup';
      }
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const validateStudentForm = () => {
    if (formData.username.length < 3) {
      setError('Tên người dùng phải có ít nhất 3 ký tự');
      return false;
    }
    if (!formData.email) {
      setError('Vui lòng nhập email');
      return false;
    }
    if (formData.password.length < 6) {
      setError('Mật khẩu phải có ít nhất 6 ký tự');
      return false;
    }
    if (formData.password !== formData.confirmPassword) {
      setError('Mật khẩu xác nhận không khớp');
      return false;
    }
    return true;
  };

  const handleNextStep = () => {
    setError('');
    
    if (currentStep === 1) {
      if (!validateStudentForm()) return;
    } else if (currentStep === 2) {
      if (!teacherData.school.trim()) {
        setError('Vui lòng nhập tên trường');
        return;
      }
      if (!teacherData.qualification.trim()) {
        setError('Vui lòng nhập bằng cấp/chứng chỉ');
        return;
      }
    }

    setCurrentStep(prev => prev + 1);
  };

  const handlePrevStep = () => {
    setError('');
    setCurrentStep(prev => prev - 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (selectedRole === 'student') {
      if (!validateStudentForm()) return;
    }

    setLoading(true);

    try {
      if (selectedRole === 'teacher') {
        const formDataObj = new FormData();
        formDataObj.append('username', formData.username);
        formDataObj.append('email', formData.email);
        formDataObj.append('password', formData.password);
        formDataObj.append('role', 'teacher');
        formDataObj.append('school', teacherData.school);
        formDataObj.append('subject', teacherData.subject);
        formDataObj.append('department', teacherData.department);
        formDataObj.append('yearsOfExperience', teacherData.yearsOfExperience);
        formDataObj.append('qualification', teacherData.qualification);
        formDataObj.append('bio', teacherData.bio);
        teacherDocuments.forEach(file => {
          formDataObj.append('documents', file);
        });

        const response = await api.post('/users/register', formDataObj, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });

        if (response.data.token) {
          localStorage.setItem('token', response.data.token);
          localStorage.setItem('user', JSON.stringify(response.data.user));
          setUser(response.data.user);
        }
        setRegistrationSuccess(true);
      } else {
        await register(formData.username, formData.email, formData.password);
        navigate('/');
      }
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Đăng ký thất bại. Vui lòng thử lại.');
    } finally {
      setLoading(false);
    }
  };

  const getPasswordStrength = () => {
    const password = formData.password;
    if (!password) return { strength: 0, text: '', color: '' };

    let strength = 0;
    if (password.length >= 6) strength++;
    if (password.length >= 8) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;

    const levels = [
      { text: 'Rất yếu', color: 'bg-red-500' },
      { text: 'Yếu', color: 'bg-orange-500' },
      { text: 'Trung bình', color: 'bg-yellow-500' },
      { text: 'Mạnh', color: 'bg-green-500' },
      { text: 'Rất mạnh', color: 'bg-emerald-500' }
    ];

    return { strength, ...levels[Math.min(strength, 4)] };
  };

  const passwordStrength = getPasswordStrength();

  // Hiện thông báo chờ duyệt sau khi đăng ký GV thành công
  if (registrationSuccess) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-50 to-teal-50 p-4">
        <div className="bg-white rounded-3xl shadow-xl p-8 max-w-md w-full text-center">
          <div className="w-20 h-20 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Clock className="w-10 h-10 text-amber-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-3">Đăng ký thành công!</h2>
          <p className="text-gray-600 mb-6">
            Tài khoản giáo viên của bạn đã được tạo và đang chờ admin phê duyệt.
            Bạn sẽ nhận được thông báo khi tài khoản được phê duyệt.
          </p>
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-6">
            <p className="text-sm text-amber-700">
              Trong thời gian chờ đợi, bạn chưa thể truy cập các tính năng giáo viên.
            </p>
          </div>
          <Link
            to="/login"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-xl font-semibold hover:opacity-90 transition-opacity"
          >
            Đi đến trang đăng nhập
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Decorative */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-emerald-600 via-teal-600 to-cyan-600 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-72 h-72 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-white/10 rounded-full blur-3xl animate-pulse animation-delay-2000"></div>
        </div>

        <div className="relative z-10 flex flex-col justify-center items-center text-white p-12 w-full">
          <div className="mb-8">
            <div className="w-20 h-20 bg-white/20 backdrop-blur-xl rounded-2xl flex items-center justify-center mb-6 mx-auto shadow-2xl">
              <GraduationCap className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-center mb-4">Bắt đầu hành trình</h1>
            <p className="text-xl text-white/80 text-center max-w-md">
              Tạo tài khoản miễn phí và khám phá thế giới học tập thú vị
            </p>
          </div>

          <div className="space-y-4 max-w-sm">
            {[
              { icon: <CheckCircle2 className="w-6 h-6" />, text: 'Miễn phí hoàn toàn' },
              { icon: <CheckCircle2 className="w-6 h-6" />, text: 'Lưu tiến độ học tập' },
              { icon: <CheckCircle2 className="w-6 h-6" />, text: 'Nhận thành tích & phần thưởng' },
              { icon: <CheckCircle2 className="w-6 h-6" />, text: 'Tham gia cộng đồng học tập' }
            ].map((item, idx) => (
              <div key={idx} className="flex items-center gap-4 bg-white/10 backdrop-blur-sm rounded-xl p-4">
                <span className="text-emerald-200">{item.icon}</span>
                <span className="text-white/90">{item.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right Side - Register Form */}
      <div className="flex-1 flex items-center justify-center p-8 bg-gray-50 overflow-y-auto">
        <div className="w-full max-w-md py-8">
          {/* Mobile Logo */}
          <div className="lg:hidden text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-emerald-500 via-teal-500 to-cyan-500 rounded-2xl mb-4 shadow-lg">
              <GraduationCap className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 bg-clip-text text-transparent">
              KL Learning
            </h1>
          </div>

          {/* Form Card */}
          <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100">
            <div className="text-center mb-6">
              <h2 className="text-3xl font-bold text-gray-800 mb-2">Đăng Ký</h2>
              <p className="text-gray-500">Tạo tài khoản mới để bắt đầu</p>
            </div>

            {/* Role Selector */}
            <div className="mb-6">
              <label className="text-sm font-medium text-gray-700 mb-2 block">Bạn là</label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => handleRoleChange('student')}
                  className={`flex items-center gap-3 p-4 rounded-xl border-2 transition-all ${
                    selectedRole === 'student'
                      ? 'border-teal-500 bg-teal-50 text-teal-700'
                      : 'border-gray-200 hover:border-gray-300 text-gray-600'
                  }`}
                >
                  <BookOpen className="w-5 h-5" />
                  <div className="text-left">
                    <p className="font-semibold text-sm">Học sinh</p>
                    <p className="text-xs opacity-70">Học tập & luyện thi</p>
                  </div>
                </button>
                <button
                  type="button"
                  onClick={() => handleRoleChange('teacher')}
                  className={`flex items-center gap-3 p-4 rounded-xl border-2 transition-all ${
                    selectedRole === 'teacher'
                      ? 'border-purple-500 bg-purple-50 text-purple-700'
                      : 'border-gray-200 hover:border-gray-300 text-gray-600'
                  }`}
                >
                  <GraduationCap className="w-5 h-5" />
                  <div className="text-left">
                    <p className="font-semibold text-sm">Giáo viên</p>
                    <p className="text-xs opacity-70">Quản lý & giảng dạy</p>
                  </div>
                </button>
              </div>
            </div>

            {/* Stepper for Teacher */}
            {selectedRole === 'teacher' && (
              <div className="mb-8 relative px-2">
                <div className="absolute top-1/2 left-4 right-4 h-1 bg-gray-200 -translate-y-1/2 rounded-full z-0"></div>
                <div 
                  className="absolute top-1/2 left-4 h-1 bg-purple-500 -translate-y-1/2 rounded-full z-0 transition-all duration-300"
                  style={{ width: `calc(${((currentStep - 1) / (teacherSteps.length - 1)) * 100}% - ${currentStep === 1 ? '0px' : currentStep === teacherSteps.length ? '2rem' : '1rem'})` }}
                ></div>
                
                <div className="relative z-10 flex justify-between">
                  {teacherSteps.map((step) => (
                    <div key={step.number} className="flex flex-col items-center">
                      <div 
                        className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-300 ${
                          currentStep === step.number 
                            ? 'bg-purple-600 text-white ring-4 ring-purple-100' 
                            : currentStep > step.number
                              ? 'bg-purple-500 text-white'
                              : 'bg-white border-2 border-gray-300 text-gray-400'
                        }`}
                      >
                        {currentStep > step.number ? <Check className="w-4 h-4" /> : step.number}
                      </div>
                      <span className={`text-xs mt-2 font-medium absolute -bottom-5 w-max text-center ${
                        currentStep >= step.number ? 'text-purple-700' : 'text-gray-400'
                      }`}>
                        {step.title}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className={`space-y-4 ${selectedRole === 'teacher' ? 'mt-8' : ''}`}>
              {error && (
                <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl text-sm flex items-center gap-2">
                  <span>⚠️</span>
                  {error}
                </div>
              )}

              {/* ===== STEP 1: ACCOUNT INFO (For Student & Teacher Step 1) ===== */}
              {(selectedRole === 'student' || currentStep === 1) && (
                <div className="space-y-4 animate-in fade-in duration-300">
                  {/* Username Input */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Tên người dùng</label>
                    <div className="relative">
                      <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="text"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        required
                        className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all outline-none"
                        placeholder="Nhập tên của bạn"
                      />
                    </div>
                  </div>

                  {/* Email Input */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Email</label>
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all outline-none"
                        placeholder="example@email.com"
                      />
                    </div>
                  </div>

                  {/* Password Input */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Mật khẩu</label>
                    <div className="relative">
                      <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type={showPassword ? 'text' : 'password'}
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                        className="w-full pl-12 pr-12 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all outline-none"
                        placeholder="••••••••"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                      >
                        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                    </div>
                    {formData.password && (
                      <div className="space-y-1">
                        <div className="flex gap-1">
                          {[...Array(5)].map((_, i) => (
                            <div
                              key={i}
                              className={`h-1 flex-1 rounded-full transition-all ${
                                i < passwordStrength.strength ? passwordStrength.color : 'bg-gray-200'
                              }`}
                            />
                          ))}
                        </div>
                        <p className="text-xs text-gray-500">Độ mạnh: {passwordStrength.text}</p>
                      </div>
                    )}
                  </div>

                  {/* Confirm Password */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Xác nhận mật khẩu</label>
                    <div className="relative">
                      <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type={showConfirmPassword ? 'text' : 'password'}
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        required
                        className="w-full pl-12 pr-12 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all outline-none"
                        placeholder="••••••••"
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                      >
                        {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                    </div>
                    {formData.confirmPassword && formData.password !== formData.confirmPassword && (
                      <p className="text-xs text-red-500">Mật khẩu không khớp</p>
                    )}
                  </div>
                </div>
              )}

              {/* ===== STEP 2: PROFESSIONAL INFO (For Teacher Step 2) ===== */}
              {selectedRole === 'teacher' && currentStep === 2 && (
                <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
                  {/* School */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Trường *</label>
                    <div className="relative">
                      <School className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="text"
                        name="school"
                        value={teacherData.school}
                        onChange={handleTeacherChange}
                        required={currentStep === 2}
                        className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all outline-none"
                        placeholder="Tên trường"
                      />
                    </div>
                  </div>

                  {/* Subject & Department */}
                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">Môn giảng dạy</label>
                      <select
                        name="subject"
                        value={teacherData.subject}
                        onChange={handleTeacherChange}
                        className="w-full py-3 px-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all outline-none"
                      >
                        <option value="chemistry">Hóa học</option>
                        <option value="physics">Vật lý</option>
                        <option value="biology">Sinh học</option>
                        <option value="math">Toán học</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">Tổ bộ môn</label>
                      <input
                        type="text"
                        name="department"
                        value={teacherData.department}
                        onChange={handleTeacherChange}
                        className="w-full py-3 px-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all outline-none"
                        placeholder="Tổ bộ môn"
                      />
                    </div>
                  </div>

                  {/* Experience & Qualification */}
                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">Kinh nghiệm (năm)</label>
                      <input
                        type="number"
                        name="yearsOfExperience"
                        value={teacherData.yearsOfExperience}
                        onChange={handleTeacherChange}
                        min="0"
                        className="w-full py-3 px-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all outline-none"
                        placeholder="Số năm"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">Bằng cấp *</label>
                      <input
                        type="text"
                        name="qualification"
                        value={teacherData.qualification}
                        onChange={handleTeacherChange}
                        required={currentStep === 2}
                        className="w-full py-3 px-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all outline-none"
                        placeholder="VD: Thạc sĩ"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* ===== STEP 3: BIO & DOCUMENTS (For Teacher Step 3) ===== */}
              {selectedRole === 'teacher' && currentStep === 3 && (
                <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
                  {/* Bio */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Giới thiệu bản thân</label>
                    <textarea
                      name="bio"
                      value={teacherData.bio}
                      onChange={handleTeacherChange}
                      rows={3}
                      className="w-full py-3 px-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all outline-none resize-none"
                      placeholder="Mô tả ngắn về kinh nghiệm giảng dạy..."
                    />
                  </div>

                  {/* Document Upload */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">
                      Chứng từ xác minh (Thẻ giáo viên, bằng cấp, v.v.)
                    </label>
                    <div className="border-2 border-dashed border-gray-300 rounded-xl p-4 text-center hover:border-purple-400 transition-colors">
                      <input
                        type="file"
                        multiple
                        accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.gif,.webp"
                        onChange={handleFileChange}
                        className="hidden"
                        id="teacher-docs"
                      />
                      <label htmlFor="teacher-docs" className="cursor-pointer">
                        <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                        <p className="text-sm text-gray-600">Nhấn để tải lên hoặc kéo thả file</p>
                        <p className="text-xs text-gray-400 mt-1">PDF, DOCX, hình ảnh (tối đa 10MB/file, 5 file)</p>
                      </label>
                    </div>

                    {/* File List */}
                    {teacherDocuments.length > 0 && (
                      <div className="space-y-2 mt-2">
                        {teacherDocuments.map((file, index) => (
                          <div key={index} className="flex items-center justify-between bg-gray-50 rounded-lg px-3 py-2">
                            <div className="flex items-center gap-2 min-w-0">
                              <FileText className="w-4 h-4 text-purple-500 flex-shrink-0" />
                              <span className="text-sm text-gray-700 truncate">{file.name}</span>
                              <span className="text-xs text-gray-400 flex-shrink-0">
                                ({(file.size / 1024 / 1024).toFixed(1)}MB)
                              </span>
                            </div>
                            <button
                              type="button"
                              onClick={() => removeFile(index)}
                              className="p-1 hover:bg-gray-200 rounded text-gray-400 hover:text-red-500"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="bg-amber-50 border border-amber-200 rounded-xl p-3">
                    <p className="text-xs text-amber-700">
                      Tài khoản giáo viên cần được admin phê duyệt. Vui lòng cung cấp chứng từ xác minh để quá trình duyệt nhanh hơn.
                    </p>
                  </div>
                </div>
              )}

              {/* Terms Checkbox */}
              {(selectedRole === 'student' || (selectedRole === 'teacher' && currentStep === 3)) && (
                <div className="flex items-start gap-3 mt-4">
                  <input
                    type="checkbox"
                    id="terms"
                    required
                    className={`w-4 h-4 mt-1 rounded border-gray-300 focus:ring-offset-0 ${
                      selectedRole === 'teacher' ? 'text-purple-600 focus:ring-purple-500' : 'text-teal-600 focus:ring-teal-500'
                    }`}
                  />
                  <label htmlFor="terms" className="text-sm text-gray-600">
                    Tôi đồng ý với{' '}
                    <a href="#" className={`font-medium ${selectedRole === 'teacher' ? 'text-purple-600 hover:text-purple-700' : 'text-teal-600 hover:text-teal-700'}`}>Điều khoản sử dụng</a>
                    {' '}và{' '}
                    <a href="#" className={`font-medium ${selectedRole === 'teacher' ? 'text-purple-600 hover:text-purple-700' : 'text-teal-600 hover:text-teal-700'}`}>Chính sách bảo mật</a>
                  </label>
                </div>
              )}

              {/* Submit / Navigation Buttons */}
              <div className="pt-2">
                {selectedRole === 'student' ? (
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full text-white py-4 rounded-xl font-semibold hover:opacity-90 transition-all duration-300 disabled:opacity-50 flex items-center justify-center gap-2 shadow-lg bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 shadow-teal-500/25"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Đang đăng ký...
                      </>
                    ) : (
                      <>
                        Tạo tài khoản
                        <ArrowRight className="w-5 h-5" />
                      </>
                    )}
                  </button>
                ) : (
                  <div className="flex gap-3">
                    {currentStep > 1 && (
                      <button
                        type="button"
                        onClick={handlePrevStep}
                        className="flex-shrink-0 px-6 py-4 rounded-xl font-semibold border-2 border-gray-200 text-gray-600 hover:bg-gray-50 hover:border-gray-300 transition-all flex items-center justify-center gap-2"
                      >
                        <ArrowLeft className="w-5 h-5" />
                        Trở lại
                      </button>
                    )}
                    
                    {currentStep < 3 ? (
                      <button
                        type="button"
                        onClick={handleNextStep}
                        className="flex-1 text-white py-4 rounded-xl font-semibold hover:opacity-90 transition-all duration-300 flex items-center justify-center gap-2 shadow-lg bg-gradient-to-r from-purple-500 via-violet-500 to-indigo-500 shadow-purple-500/25"
                      >
                        Tiếp tục
                        <ArrowRight className="w-5 h-5" />
                      </button>
                    ) : (
                      <button
                        type="submit"
                        disabled={loading}
                        className="flex-1 text-white py-4 rounded-xl font-semibold hover:opacity-90 transition-all duration-300 disabled:opacity-50 flex items-center justify-center gap-2 shadow-lg bg-gradient-to-r from-purple-500 via-violet-500 to-indigo-500 shadow-purple-500/25"
                      >
                        {loading ? (
                          <>
                            <Loader2 className="w-5 h-5 animate-spin" />
                            Đang xử lý...
                          </>
                        ) : (
                          <>
                            Đăng ký
                            <Check className="w-5 h-5" />
                          </>
                        )}
                      </button>
                    )}
                  </div>
                )}
              </div>
            </form>

            {/* Divider */}
            {selectedRole === 'student' && (
              <>
                <div className="relative my-7">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-200"></div>
                  </div>
                  <div className="relative flex justify-center">
                    <span className="px-4 bg-white text-sm text-gray-500">hoặc đăng ký với</span>
                  </div>
                </div>

                {/* Google Register */}
                <button
                  type="button"
                  onClick={handleGoogleRegister}
                  disabled={loading}
                  className="w-full flex items-center justify-center gap-3 px-4 py-3.5 bg-white border-2 border-gray-200 rounded-xl hover:bg-gray-50 hover:border-gray-300 transition-all disabled:opacity-50 group"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                  <span className="text-gray-700 font-medium group-hover:text-gray-900">
                    Đăng ký với Google
                  </span>
                </button>
              </>
            )}

            {/* Login Link */}
            <p className="mt-8 text-center text-gray-600">
              Đã có tài khoản?{' '}
              <Link to="/login" className={`font-semibold ${selectedRole === 'teacher' ? 'text-purple-600 hover:text-purple-700' : 'text-teal-600 hover:text-teal-700'}`}>
                Đăng nhập ngay
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
