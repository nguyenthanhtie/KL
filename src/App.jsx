import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Navbar from './components/layout/Navbar';
import ProtectedRoute from './components/ProtectedRoute';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import ClassDashboard from './pages/ClassDashboard';
import Lesson from './pages/Lesson';
import LessonSimple from './pages/LessonSimple';
import GamePlay from './pages/GamePlay';
import Profile from './pages/Profile';
import AdvancedChallenge from './pages/AdvancedChallenge';
import GhepNguyenTu from './pages/challenges/GhepNguyenTu';
import TroChoiCanBang from './pages/challenges/TroChoiCanBang';
import SuyLuanPhanUng from './pages/challenges/SuyLuanPhanUng';
import DuoiHinhBatChu from './pages/challenges/DuoiHinhBatChu';
import PhongThiNghiem from './pages/challenges/PhongThiNghiem';
import NhanBietDungDich from './pages/challenges/NhanBietDungDich';

function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="min-h-screen">
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/advanced-challenge" element={<AdvancedChallenge />} />
            <Route path="/advanced-challenge/ghep-nguyen-tu" element={<GhepNguyenTu />} />
            <Route path="/advanced-challenge/can-bang" element={<TroChoiCanBang />} />
            <Route path="/advanced-challenge/suy-luan" element={<SuyLuanPhanUng />} />
            <Route path="/advanced-challenge/duoi-hinh" element={<DuoiHinhBatChu />} />
            <Route path="/advanced-challenge/phong-thi-nghiem" element={<PhongThiNghiem />} />
            <Route path="/advanced-challenge/nhan-biet-dung-dich" element={<NhanBietDungDich />} />
            <Route 
              path="/dashboard" 
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/class/:classId" 
              element={<ClassDashboard />}
            />
            <Route 
              path="/lesson/:classId/:chapterId/:lessonId" 
              element={<LessonSimple />}
            />
           <Route 
             path="/gameplay/:classId/:chapterId/:lessonId/:level?" 
             element={<GamePlay />}
           />
            <Route 
              path="/profile" 
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              } 
            />
          </Routes>
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;
