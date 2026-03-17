import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { PKRoomProvider } from './contexts/PKRoomContext';
import Sidebar from './components/Sidebar';
import { AdminRoute, TeacherRoute, PrivateRoute } from './components/ProtectedRoute';
import Home from './pages/Home';
import ProgramSelection from './pages/ProgramSelection';
import Profile from './pages/Profile';
import PlacementTest from './pages/PlacementTest';
import Login from './pages/Login';
import Register from './pages/Register';

// Admin pages
import AdminDashboard from './pages/admin/AdminDashboard';
import UserManagement from './pages/admin/UserManagement';
import TeacherApproval from './pages/admin/TeacherApproval';
import ChallengeManagement from './pages/admin/ChallengeManagement';
import AdminReports from './pages/admin/AdminReports';
import AnnouncementManagement from './pages/admin/AnnouncementManagement';

// Teacher pages
import TeacherDashboard from './pages/teacher/TeacherDashboard';
import ClassManagement from './pages/teacher/ClassManagement';
import LessonManagement from './pages/teacher/LessonManagement';
import LessonEditor from './pages/teacher/LessonEditor';
import AssignmentManagement from './pages/teacher/AssignmentManagement';

// Student pages
import MyClasses from './pages/student/MyClasses';
import StudentClassDetail from './pages/student/StudentClassDetail';

// Chemistry pages
import ChemistryHome from './pages/chemistry/ChemistryHome';
import Dashboard from './pages/chemistry/Dashboard';
import ClassDashboard from './pages/chemistry/ClassDashboard';
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
import PKSpectate from './pages/chemistry/PKSpectate';

// Chemistry Lab Interactive
import ChemistryLab from './pages/ChemistryLab';
import LabAdventure from './pages/LabAdventure';
import MagicLab3D from './pages/MagicLab3D';

// Game Floating Bar (Mission + Notifications)
import GameFloatingBar from './components/GameFloatingBar';


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
        <Route path="/program/chemistry" element={<PrivateRoute><ChemistryHome /></PrivateRoute>} />
        <Route path="/equation-balancer" element={<PrivateRoute><EquationBalancer /></PrivateRoute>} />
        <Route path="/advanced-challenge" element={<PrivateRoute><AdvancedChallenge /></PrivateRoute>} />
        <Route path="/advanced-challenge/ghep-nguyen-tu" element={<PrivateRoute><GhepNguyenTu /></PrivateRoute>} />
        <Route path="/advanced-challenge/can-bang" element={<PrivateRoute><TroChoiCanBang /></PrivateRoute>} />
        <Route path="/advanced-challenge/suy-luan" element={<PrivateRoute><SuyLuanPhanUng /></PrivateRoute>} />
        <Route path="/advanced-challenge/duoi-hinh" element={<PrivateRoute><DuoiHinhBatChu /></PrivateRoute>} />
        <Route path="/advanced-challenge/nhan-biet-dung-dich" element={<PrivateRoute><NhanBietDungDich /></PrivateRoute>} />
        <Route path="/advanced-challenge/xay-dung-phan-tu" element={<PrivateRoute><XayDungPhanTu /></PrivateRoute>} />
        <Route path="/advanced-challenge/pha-che-dung-dich" element={<PrivateRoute><PhaCheDungDich /></PrivateRoute>} />
        <Route path="/advanced-challenge/pha-che-dung-dich-nang-cao" element={<PrivateRoute><PhaCheDungDichNangCao /></PrivateRoute>} />
        <Route path="/advanced-challenge/nhom-halogen" element={<PrivateRoute><Bai08_NhomHalogen /></PrivateRoute>} />
        <Route path="/advanced-challenge/oxi-luu-huynh" element={<PrivateRoute><Bai09_Oxi_LuuHuynh /></PrivateRoute>} />
        <Route path="/advanced-challenge/cau-truc-nguyen-tu" element={<PrivateRoute><CauTrucNguyenTu /></PrivateRoute>} />
        <Route path="/advanced-challenge/phong-thi-nghiem" element={<PrivateRoute><PhongThiNghiem /></PrivateRoute>} />
        <Route path="/advanced-challenge/tinh-oxi-hoa" element={<PrivateRoute><TinhOxiHoa /></PrivateRoute>} />
        <Route path="/advanced-challenge/oxi-khong-khi" element={<PrivateRoute><Bai20_Oxi_KhongKhi /></PrivateRoute>} />
        <Route path="/advanced-challenge/hop-chat-vo-co" element={<PrivateRoute><HopChatVoCo /></PrivateRoute>} />
        <Route path="/advanced-challenge/kim-loai" element={<PrivateRoute><Bai15_KIM_LOAI /></PrivateRoute>} />
        <Route path="/advanced-challenge/phi-kim-halogen" element={<PrivateRoute><Bai20_PHI_KIM_HALOGEN /></PrivateRoute>} />
        <Route path="/advanced-challenge/hidrocacbon" element={<PrivateRoute><Bai26_HIDROCACBON /></PrivateRoute>} />
        <Route path="/advanced-challenge/hidrocacbon-polime" element={<PrivateRoute><Bai34_HIDROCACBON_POLIME /></PrivateRoute>} />
        <Route path="/advanced-challenge/mol-quick-calc" element={<PrivateRoute><MolQuickCalc /></PrivateRoute>} />
        <Route path="/advanced-challenge/quan-sat-phan-ung" element={<PrivateRoute><QuanSatPhanUng /></PrivateRoute>} />
        <Route path="/advanced-challenge/bai06-chat-tan-dung-moi" element={<PrivateRoute><Bai06_ChatTan_DungMoi /></PrivateRoute>} />
        <Route path="/advanced-challenge/tong-ket-lop-8" element={<PrivateRoute><TongKetLop8 /></PrivateRoute>} />
        <Route path="/advanced-challenge/tong-hop-lop-9" element={<PrivateRoute><Baitonghop /></PrivateRoute>} />
        <Route path="/advanced-challenge/can-bang-phan-ung-nang-cao" element={<PrivateRoute><CanBangPhanUngNangCao /></PrivateRoute>} />
        <Route path="/advanced-challenge/nito-luu-huynh" element={<PrivateRoute><NitoLuuHuynh /></PrivateRoute>} />
        <Route path="/advanced-challenge/dai-cuong-hoa-huu-co" element={<PrivateRoute><DaiCuongHoaHuuCo /></PrivateRoute>} />
        <Route path="/advanced-challenge/hidrocacbon-11" element={<PrivateRoute><Hidrocacbon11 /></PrivateRoute>} />
        <Route path="/advanced-challenge/dan-xuat-halogen-ancol-phenol" element={<PrivateRoute><DanXuatHalogenAncolPhenol /></PrivateRoute>} />
        <Route path="/advanced-challenge/hop-chat-carbonyl-carboxylic" element={<PrivateRoute><HopChatCarbonylCarboxylic /></PrivateRoute>} />
        <Route path="/advanced-challenge/hoa-hoc-voi-cuoc-song" element={<PrivateRoute><HoaHocVoiCuocSong /></PrivateRoute>} />
        <Route path="/advanced-challenge/dai-cuong-kim-loai" element={<PrivateRoute><Bai05_DaiCuongKimLoai /></PrivateRoute>} />
        <Route path="/advanced-challenge/dai-cuong-sat-dong-hop-kim" element={<PrivateRoute><Bai06_DaiCuongSatDong_HopKim /></PrivateRoute>} />
        <Route path="/advanced-challenge/kim-loai-kiem-kiem-tho-nhom" element={<PrivateRoute><Bai07_KimLoaiKiem_KiemTho_Nhom /></PrivateRoute>} />
        <Route path="/advanced-challenge/este-lipit" element={<PrivateRoute><Bai01_Este_Lipit /></PrivateRoute>} />
        <Route path="/advanced-challenge/cacbohidrat" element={<PrivateRoute><Bai02_Cacbohidrat /></PrivateRoute>} />
        <Route path="/advanced-challenge/amin-aminoaxit-protein" element={<PrivateRoute><Bai03_Amin_Aminoaxit_Protein /></PrivateRoute>} />
        <Route path="/advanced-challenge/polime" element={<PrivateRoute><Bai04_Polime /></PrivateRoute>} />
        
        {/* PK Routes */}
        <Route path="/chemistry/pk" element={<PrivateRoute><PKSelection /></PrivateRoute>} />
        <Route path="/chemistry/pk/room/:roomCode" element={<PrivateRoute><PKRoom /></PrivateRoute>} />
        <Route path="/chemistry/pk/spectate/:roomCode" element={<PrivateRoute><PKSpectate /></PrivateRoute>} />
        
        <Route 
          path="/program/chemistry/dashboard" 
          element={<PrivateRoute><Dashboard /></PrivateRoute>} 
        />
        <Route 
          path="/class/:classId" 
          element={<PrivateRoute><ClassDashboard /></PrivateRoute>}
        />
        <Route 
          path="/lesson/:classId/:chapterId/:lessonId" 
          element={<PrivateRoute><LessonSimple /></PrivateRoute>}
        />
        <Route 
          path="/gameplay/:classId/:chapterId/:lessonId/:level?" 
          element={<PrivateRoute><GamePlay /></PrivateRoute>}
        />
        <Route 
          path="/profile" 
          element={<PrivateRoute><Profile /></PrivateRoute>} 
        />
        <Route 
          path="/placement-test/:programId?" 
          element={<PrivateRoute><PlacementTest /></PrivateRoute>}
        />
        <Route path="/chemistry-lab" element={<PrivateRoute><ChemistryLab /></PrivateRoute>} />
        <Route path="/lab-adventure" element={<PrivateRoute><LabAdventure /></PrivateRoute>} />
          <Route path="/magic-lab-3d" element={<PrivateRoute><MagicLab3D /></PrivateRoute>} />
        <Route path="/admin" element={<AdminRoute><AdminDashboard /></AdminRoute>} />
        <Route path="/admin/users" element={<AdminRoute><UserManagement /></AdminRoute>} />
        <Route path="/admin/student" element={<AdminRoute><UserManagement initialRole="student" /></AdminRoute>} />
        <Route path="/admin/students" element={<AdminRoute><UserManagement initialRole="student" /></AdminRoute>} />
        <Route path="/admin/teachers" element={<AdminRoute><UserManagement initialRole="teacher" /></AdminRoute>} />
        <Route path="/admin/teacher-requests" element={<AdminRoute><TeacherApproval /></AdminRoute>} />
        <Route path="/admin/classes" element={<AdminRoute><ClassManagement /></AdminRoute>} />
        <Route path="/admin/lessons" element={<AdminRoute><LessonManagement /></AdminRoute>} />
        <Route path="/admin/assignments" element={<AdminRoute><AssignmentManagement /></AdminRoute>} />
        <Route path="/admin/challenges" element={<AdminRoute><ChallengeManagement /></AdminRoute>} />
        <Route path="/admin/reports" element={<AdminRoute><AdminReports /></AdminRoute>} />
        <Route path="/admin/announcements" element={<AdminRoute><AnnouncementManagement /></AdminRoute>} />
        
        {/* Teacher Routes */}
        <Route path="/teacher" element={<TeacherRoute><TeacherDashboard /></TeacherRoute>} />
        <Route path="/teacher/classes" element={<TeacherRoute><ClassManagement /></TeacherRoute>} />
        <Route path="/teacher/classes/new" element={<TeacherRoute><ClassManagement /></TeacherRoute>} />
        <Route path="/teacher/classes/:classId" element={<TeacherRoute><ClassManagement /></TeacherRoute>} />
        <Route path="/teacher/lessons" element={<TeacherRoute><LessonManagement /></TeacherRoute>} />
        <Route path="/teacher/lessons/new" element={<TeacherRoute><LessonEditor /></TeacherRoute>} />
        <Route path="/teacher/lessons/:lessonId/edit" element={<TeacherRoute><LessonEditor /></TeacherRoute>} />
        <Route path="/teacher/assignments" element={<TeacherRoute><AssignmentManagement /></TeacherRoute>} />
        
        {/* Student Classroom Routes */}
        <Route path="/student/classes" element={<PrivateRoute><MyClasses /></PrivateRoute>} />
        <Route path="/student/classes/:classId" element={<PrivateRoute><StudentClassDetail /></PrivateRoute>} />
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
          <GameFloatingBar />
        </PKRoomProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
