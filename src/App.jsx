import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Header from './components/Header';
import Home from './pages/Home';
import ProgramSelection from './pages/ProgramSelection';
import Profile from './pages/Profile';
import PlacementTest from './pages/PlacementTest';
import Login from './pages/Login';
import Register from './pages/Register';

// Hóa học area
import ChemistryHome from './areas/Hoahoc/pages/ChemistryHome';
import CurriculumSelection from './areas/Hoahoc/pages/CurriculumSelection';
import Dashboard from './areas/Hoahoc/pages/Dashboard';
import ClassDashboard from './areas/Hoahoc/pages/ClassDashboard';
import Lesson from './areas/Hoahoc/pages/Lesson';
import LessonSimple from './areas/Hoahoc/pages/LessonSimple';
import GamePlay from './areas/Hoahoc/pages/GamePlay';
import AdvancedChallenge from './areas/Hoahoc/pages/AdvancedChallenge';
import GhepNguyenTu from './areas/Hoahoc/challenges/10/Bai02_GhepNguyenTu';
import TroChoiCanBang from './areas/Hoahoc/challenges/08/Bai15_CanBangPhuongTrinh';
import SuyLuanPhanUng from './areas/Hoahoc/challenges/10/Bai05_SuyLuanPhanUng';
import DuoiHinhBatChu from './areas/Hoahoc/challenges/08/Bai01_DoanHinhBatChu';
import NhanBietDungDich from './areas/Hoahoc/challenges/08/Bai38_NhanBietDungDich';
import XayDungPhanTu from './areas/Hoahoc/challenges/10/Bai03_XayDungPhanTu';
import PhaCheDungDich from './areas/Hoahoc/challenges/08/Bai06_PhaCheDungDich';
import CauTrucNguyenTu from './areas/Hoahoc/challenges/10/Bai01_CauTrucNguyenTu';
import PhongThiNghiem from './areas/Hoahoc/challenges/08/Bai05_PhongThiNghiem';
import TinhOxiHoa from './areas/Hoahoc/challenges/10/Bai04_TinhOxiHoa';
import MolQuickCalc from './areas/Hoahoc/challenges/08/Bai18_TinhKhoiLuongMol';
import QuanSatPhanUng from './areas/Hoahoc/challenges/08/Bai12_QuanSatPhanUng';
import TongKetLop8 from './areas/Hoahoc/challenges/08/Bai99_TongKetLop8';
import Bai20_Oxi_KhongKhi from './areas/Hoahoc/challenges/08/Bai20_Oxi_KhongKhi';
import HopChatVoCo from './areas/Hoahoc/challenges/09/Bai07_HopChatVoCo';
import Bai15_KIM_LOAI from './areas/Hoahoc/challenges/09/Bai15_KIM_LOAI';



const AppContent = () => {
  const location = useLocation();
  const showHeader = location.pathname === '/home' || location.pathname === '/';

  return (
    <div className="min-h-screen">
      {showHeader && <Header />}
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<ProgramSelection />} />
        <Route path="/home" element={<Home />} />
        <Route path="/program/chemistry" element={<ChemistryHome />} />
        <Route path="/curriculum-selection/:programId" element={<CurriculumSelection />} />
        <Route path="/advanced-challenge" element={<AdvancedChallenge />} />
        <Route path="/advanced-challenge/ghep-nguyen-tu" element={<GhepNguyenTu />} />
        <Route path="/advanced-challenge/can-bang" element={<TroChoiCanBang />} />
        <Route path="/advanced-challenge/suy-luan" element={<SuyLuanPhanUng />} />
        <Route path="/advanced-challenge/duoi-hinh" element={<DuoiHinhBatChu />} />
        <Route path="/advanced-challenge/nhan-biet-dung-dich" element={<NhanBietDungDich />} />
        <Route path="/advanced-challenge/xay-dung-phan-tu" element={<XayDungPhanTu />} />
        <Route path="/advanced-challenge/pha-che-dung-dich" element={<PhaCheDungDich />} />
        <Route path="/advanced-challenge/cau-truc-nguyen-tu" element={<CauTrucNguyenTu />} />
        <Route path="/advanced-challenge/phong-thi-nghiem" element={<PhongThiNghiem />} />
        <Route path="/advanced-challenge/tinh-oxi-hoa" element={<TinhOxiHoa />} />
        <Route path="/advanced-challenge/oxi-khong-khi" element={<Bai20_Oxi_KhongKhi />} />
        <Route path="/advanced-challenge/hop-chat-vo-co" element={<HopChatVoCo />} />
        <Route path="/advanced-challenge/kim-loai" element={<Bai15_KIM_LOAI />} />
        <Route path="/advanced-challenge/mol-quick-calc" element={<MolQuickCalc />} />
        <Route path="/advanced-challenge/quan-sat-phan-ung" element={<QuanSatPhanUng />} />
        <Route path="/advanced-challenge/tong-ket-lop-8" element={<TongKetLop8 />} />
        <Route 
          path="/program/chemistry/dashboard" 
          element={
              <Dashboard />
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
              <Profile />
          } 
        />
        <Route 
          path="/placement-test/:programId?" 
          element={<PlacementTest />}
        />
      </Routes>
    </div>
  )
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </Router>
  );
}

export default App;
