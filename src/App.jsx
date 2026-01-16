import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { PKRoomProvider } from './contexts/PKRoomContext';
import Sidebar from './components/Sidebar';
import Home from './pages/Home';
import ProgramSelection from './pages/ProgramSelection';
import Profile from './pages/Profile';
import PlacementTest from './pages/PlacementTest';
import Login from './pages/Login';
import Register from './pages/Register';

// Chemistry pages
import ChemistryHome from './pages/chemistry/ChemistryHome';
import Dashboard from './pages/chemistry/Dashboard';
import ClassDashboard from './pages/chemistry/ClassDashboard';
import Lesson from './pages/chemistry/Lesson';
import LessonSimple from './pages/chemistry/LessonSimple';
import GamePlay from './pages/chemistry/GamePlay';
import AdvancedChallenge from './pages/chemistry/AdvancedChallenge';
import EquationBalancer from './pages/chemistry/EquationBalancer';

// Grade 8 challenges
import DuoiHinhBatChu from './pages/challenges/grade08/Bai01_DoanHinhBatChu';
import PhongThiNghiem from './pages/challenges/grade08/Bai05_PhongThiNghiem';
import PhaCheDungDich from './pages/challenges/grade08/Bai06_PhaCheDungDich';
import QuanSatPhanUng from './pages/challenges/grade08/Bai12_QuanSatPhanUng';
import TroChoiCanBang from './pages/challenges/grade08/Bai15_CanBangPhuongTrinh';
import MolQuickCalc from './pages/challenges/grade08/Bai18_TinhKhoiLuongMol';
import Bai20_Oxi_KhongKhi from './pages/challenges/grade08/Bai20_Oxi_KhongKhi';
import NhanBietDungDich from './pages/challenges/grade08/Bai38_NhanBietDungDich';
import TongKetLop8 from './pages/challenges/grade08/Bai99_TongKetLop8';

// Grade 9 challenges
import HopChatVoCo from './pages/challenges/grade09/Bai07_HopChatVoCo';
import Bai15_KIM_LOAI from './pages/challenges/grade09/Bai15_KIM_LOAI';
import Bai20_PHI_KIM_HALOGEN from './pages/challenges/grade09/Bai20_PHI_KIM_HALOGEN';
import Bai26_HIDROCACBON from './pages/challenges/grade09/Bai26_HIDROCACBON';
import Bai34_HIDROCACBON_POLIME from './pages/challenges/grade09/Bai34_HIDROCACBON_POLIME';
import Baitonghop from './pages/challenges/grade09/Baitonghop';

// Grade 10 challenges
import CauTrucNguyenTu from './pages/challenges/grade10/Bai01_CauTrucNguyenTu';
import GhepNguyenTu from './pages/challenges/grade10/Bai02_GhepNguyenTu';
import XayDungPhanTu from './pages/challenges/grade10/Bai03_XayDungPhanTu';
import TinhOxiHoa from './pages/challenges/grade10/Bai04_TinhOxiHoa';
import SuyLuanPhanUng from './pages/challenges/grade10/Bai05_SuyLuanPhanUng';
import Bai06_ChatTan_DungMoi from './pages/challenges/grade10/Bai06_ChatTan_DungMoi';
import PhaCheDungDichNangCao from './pages/challenges/grade10/Bai07_PhaCheDungDich_NangCao';
import Bai08_NhomHalogen from './pages/challenges/grade10/Bai08_NhomHalogen';
import Bai09_Oxi_LuuHuynh from './pages/challenges/grade10/Bai09_Oxi_LuuHuynh';

// Grade 11 challenges
import CanBangPhanUngNangCao from './pages/challenges/grade11/Bai02_CanBangPhanUngNangCao';
import NitoLuuHuynh from './pages/challenges/grade11/Bai03_Nito_LuuHuynh';
import DaiCuongHoaHuuCo from './pages/challenges/grade11/Bai04_DaiCuongHoaHuuCo';
import Hidrocacbon11 from './pages/challenges/grade11/Bai05_Hidrocacbon';
import DanXuatHalogenAncolPhenol from './pages/challenges/grade11/Bai06_DanXuatHalogen_Ancol_Phenol';
import HopChatCarbonylCarboxylic from './pages/challenges/grade11/Bai07_HopChatCarbonyl_Carboxylic';
import HoaHocVoiCuocSong from './pages/challenges/grade11/Bai08_HoaHocVoiCuocSong';

// Grade 12 challenges
import Bai01_Este_Lipit from './pages/challenges/grade12/Bai01_Este_Lipit';
import Bai02_Cacbohidrat from './pages/challenges/grade12/Bai02_Cacbohidrat';
import Bai03_Amin_Aminoaxit_Protein from './pages/challenges/grade12/Bai03_Amin_Aminoaxit_Protein';
import Bai04_Polime from './pages/challenges/grade12/Bai04_Polime';
import Bai05_DaiCuongKimLoai from './pages/challenges/grade12/Bai05_DaiCuongKimLoai';
import Bai06_DaiCuongSatDong_HopKim from './pages/challenges/grade12/Bai06_DaiCuongSatDong_HopKim';
import Bai07_KimLoaiKiem_KiemTho_Nhom from './pages/challenges/grade12/Bai07_KimLoaiKiem_KiemTho_Nhom';

// PK (Player vs Player)
import PKSelection from './pages/chemistry/PKSelection';
import PKRoom from './pages/chemistry/PKRoom';

// Chemistry Lab Interactive
import ChemistryLab from './pages/ChemistryLab';
import LabAdventure from './pages/LabAdventure';


const AppContent = () => {
  const location = useLocation();

  return (
    <Sidebar>
      <div className="min-h-screen">
        <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<ProgramSelection />} />
        <Route path="/home" element={<Home />} />
        <Route path="/program/chemistry" element={<ChemistryHome />} />
        <Route path="/equation-balancer" element={<EquationBalancer />} />
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
        <Route path="/chemistry-lab" element={<ChemistryLab />} />
        <Route path="/lab-adventure" element={<LabAdventure />} />
      </Routes>
      </div>
    </Sidebar>
  )
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <PKRoomProvider>
          <AppContent />
        </PKRoomProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
