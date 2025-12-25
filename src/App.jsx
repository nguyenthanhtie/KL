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
import PhaCheDungDichNangCao from './areas/Hoahoc/challenges/10/Bai07_PhaCheDungDich_NangCao';
import Bai08_NhomHalogen from './areas/Hoahoc/challenges/10/Bai08_NhomHalogen';
import Bai09_Oxi_LuuHuynh from './areas/Hoahoc/challenges/10/Bai09_Oxi_LuuHuynh';
import CauTrucNguyenTu from './areas/Hoahoc/challenges/10/Bai01_CauTrucNguyenTu';
import PhongThiNghiem from './areas/Hoahoc/challenges/08/Bai05_PhongThiNghiem';
import TinhOxiHoa from './areas/Hoahoc/challenges/10/Bai04_TinhOxiHoa';
import MolQuickCalc from './areas/Hoahoc/challenges/08/Bai18_TinhKhoiLuongMol';
import QuanSatPhanUng from './areas/Hoahoc/challenges/08/Bai12_QuanSatPhanUng';
import TongKetLop8 from './areas/Hoahoc/challenges/08/Bai99_TongKetLop8';
import Bai20_Oxi_KhongKhi from './areas/Hoahoc/challenges/08/Bai20_Oxi_KhongKhi';
import Bai06_ChatTan_DungMoi from './areas/Hoahoc/challenges/10/Bai06_ChatTan_DungMoi';
import HopChatVoCo from './areas/Hoahoc/challenges/09/Bai07_HopChatVoCo';
import Bai15_KIM_LOAI from './areas/Hoahoc/challenges/09/Bai15_KIM_LOAI';
import Bai20_PHI_KIM_HALOGEN from './areas/Hoahoc/challenges/09/Bai20_PHI_KIM_HALOGEN';
import Bai26_HIDROCACBON from './areas/Hoahoc/challenges/09/Bai26_HIDROCACBON';
import Bai34_HIDROCACBON_POLIME from './areas/Hoahoc/challenges/09/Bai34_HIDROCACBON_POLIME';
import Baitonghop from './areas/Hoahoc/challenges/09/Baitonghop';
import CanBangPhanUngNangCao from './areas/Hoahoc/challenges/11/Bai02_CanBangPhanUngNangCao';
import NitoLuuHuynh from './areas/Hoahoc/challenges/11/Bai03_Nito_LuuHuynh';
import DaiCuongHoaHuuCo from './areas/Hoahoc/challenges/11/Bai04_DaiCuongHoaHuuCo';
import Hidrocacbon11 from './areas/Hoahoc/challenges/11/Bai05_Hidrocacbon';
import DanXuatHalogenAncolPhenol from './areas/Hoahoc/challenges/11/Bai06_DanXuatHalogen_Ancol_Phenol';
import HopChatCarbonylCarboxylic from './areas/Hoahoc/challenges/11/Bai07_HopChatCarbonyl_Carboxylic';
import HoaHocVoiCuocSong from './areas/Hoahoc/challenges/11/Bai08_HoaHocVoiCuocSong';
import Bai05_DaiCuongKimLoai from './areas/Hoahoc/challenges/12/Bai05_DaiCuongKimLoai';
import Bai06_DaiCuongSatDong_HopKim from './areas/Hoahoc/challenges/12/Bai06_DaiCuongSatDong_HopKim';
import Bai07_KimLoaiKiem_KiemTho_Nhom from './areas/Hoahoc/challenges/12/Bai07_KimLoaiKiem_KiemTho_Nhom';
import Bai01_Este_Lipit from './areas/Hoahoc/challenges/12/Bai01_Este_Lipit';
import Bai02_Cacbohidrat from './areas/Hoahoc/challenges/12/Bai02_Cacbohidrat';
import Bai03_Amin_Aminoaxit_Protein from './areas/Hoahoc/challenges/12/Bai03_Amin_Aminoaxit_Protein';
import Bai04_Polime from './areas/Hoahoc/challenges/12/Bai04_Polime';

// PK (Player vs Player)
import PKSelection from './areas/Hoahoc/pages/PKSelection';
import PKRoom from './areas/Hoahoc/pages/PKRoom';


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
        <Route path="/advanced-challenge/pha-che-dung-dich-nang-cao" element={<PhaCheDungDichNangCao />} />
        <Route path="/advanced-challenge/nhom-halogen" element={<Bai08_NhomHalogen />} />
        <Route path="/advanced-challenge/oxi-luu-huynh" element={<Bai09_Oxi_LuuHuynh />} />
        <Route path="/advanced-challenge/cau-truc-nguyen-tu" element={<CauTrucNguyenTu />} />
        <Route path="/advanced-challenge/phong-thi-nghiem" element={<PhongThiNghiem />} />
        <Route path="/advanced-challenge/tinh-oxi-hoa" element={<TinhOxiHoa />} />
        <Route path="/advanced-challenge/oxi-khong-khi" element={<Bai20_Oxi_KhongKhi />} />
        <Route path="/advanced-challenge/hop-chat-vo-co" element={<HopChatVoCo />} />
        <Route path="/advanced-challenge/kim-loai" element={<Bai15_KIM_LOAI />} />
        <Route path="/advanced-challenge/phi-kim-halogen" element={<Bai20_PHI_KIM_HALOGEN />} />
        <Route path="/advanced-challenge/hidrocacbon" element={<Bai26_HIDROCACBON />} />
        <Route path="/advanced-challenge/hidrocacbon-polime" element={<Bai34_HIDROCACBON_POLIME />} />
        <Route path="/advanced-challenge/mol-quick-calc" element={<MolQuickCalc />} />
        <Route path="/advanced-challenge/quan-sat-phan-ung" element={<QuanSatPhanUng />} />
        <Route path="/advanced-challenge/bai06-chat-tan-dung-moi" element={<Bai06_ChatTan_DungMoi />} />
        <Route path="/advanced-challenge/tong-ket-lop-8" element={<TongKetLop8 />} />
        <Route path="/advanced-challenge/tong-hop-lop-9" element={<Baitonghop />} />
        <Route path="/advanced-challenge/can-bang-phan-ung-nang-cao" element={<CanBangPhanUngNangCao />} />
        <Route path="/advanced-challenge/nito-luu-huynh" element={<NitoLuuHuynh />} />
        <Route path="/advanced-challenge/dai-cuong-hoa-huu-co" element={<DaiCuongHoaHuuCo />} />
        <Route path="/advanced-challenge/hidrocacbon-11" element={<Hidrocacbon11 />} />
        <Route path="/advanced-challenge/dan-xuat-halogen-ancol-phenol" element={<DanXuatHalogenAncolPhenol />} />
        <Route path="/advanced-challenge/hop-chat-carbonyl-carboxylic" element={<HopChatCarbonylCarboxylic />} />
        <Route path="/advanced-challenge/hoa-hoc-voi-cuoc-song" element={<HoaHocVoiCuocSong />} />
        <Route path="/advanced-challenge/dai-cuong-kim-loai" element={<Bai05_DaiCuongKimLoai />} />
        <Route path="/advanced-challenge/dai-cuong-sat-dong-hop-kim" element={<Bai06_DaiCuongSatDong_HopKim />} />
        <Route path="/advanced-challenge/kim-loai-kiem-kiem-tho-nhom" element={<Bai07_KimLoaiKiem_KiemTho_Nhom />} />
        <Route path="/advanced-challenge/este-lipit" element={<Bai01_Este_Lipit />} />
        <Route path="/advanced-challenge/cacbohidrat" element={<Bai02_Cacbohidrat />} />
        <Route path="/advanced-challenge/amin-aminoaxit-protein" element={<Bai03_Amin_Aminoaxit_Protein />} />
        <Route path="/advanced-challenge/polime" element={<Bai04_Polime />} />
        
        {/* PK Routes */}
        <Route path="/chemistry/pk" element={<PKSelection />} />
        <Route path="/chemistry/pk/room/:roomCode" element={<PKRoom />} />
        
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
