import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowLeft, Trophy, RotateCcw, ChevronRight,
  CheckCircle2, XCircle, Lightbulb, Zap, Award,
  FlaskConical, Droplets, Atom, TestTube, Beaker,
  Clock, Target, AlertTriangle, Microscope
} from 'lucide-react';
import useChallengeProgress from '../../../hooks/useChallengeProgress';
import ResumeDialog from '../../../components/ResumeDialog';
import './CSS/Bai06_DanXuatHalogen_Ancol_Phenol.css';

// ================== DATA - DẪN XUẤT HALOGEN - ANCOL - PHENOL ==================
const CATEGORIES = [
  {
    id: 'halogen',
    name: 'Dẫn xuất Halogen',
    icon: Atom,
    color: '#22d3ee',
    description: 'R-X, tính chất và ứng dụng',
    bgGradient: 'from-cyan-500 to-blue-500'
  },
  {
    id: 'alcohol',
    name: 'Ancol (Rượu)',
    icon: Droplets,
    color: '#34d399',
    description: 'R-OH, phân loại, đồng phân, danh pháp',
    bgGradient: 'from-emerald-500 to-green-500'
  },
  {
    id: 'phenol',
    name: 'Phenol',
    icon: FlaskConical,
    color: '#f472b6',
    description: 'C6H5OH, tính axit, phản ứng thế',
    bgGradient: 'from-pink-500 to-rose-500'
  },
  {
    id: 'reactions',
    name: 'Phản ứng & Nhận biết',
    icon: TestTube,
    color: '#fbbf24',
    description: 'Phản ứng đặc trưng, thuốc thử',
    bgGradient: 'from-amber-500 to-yellow-500'
  }
];

// Bộ câu hỏi tĩnh
const CHALLENGES = [
  // ========== DẪN XUẤT HALOGEN (10 câu) ==========
  {
    id: 1,
    category: 'halogen',
    type: 'multiple-choice',
    difficulty: 1,
    question: 'Dẫn xuất halogen là sản phẩm khi thay thế nguyên tử hidro trong phân tử hidrocacbon bằng nguyên tử...',
    options: ['Oxi', 'Nitơ', 'Halogen', 'Lưu huỳnh'],
    correctAnswer: 'Halogen',
    explanation: 'Dẫn xuất halogen là hợp chất hữu cơ có chứa nguyên tố halogen (F, Cl, Br, I) liên kết với gốc hidrocacbon.',
    hint: 'Tên gọi đã gợi ý câu trả lời.'
  },
  {
    id: 2,
    category: 'halogen',
    type: 'multiple-choice',
    difficulty: 2,
    question: 'Phản ứng đặc trưng của dẫn xuất halogen là...',
    options: ['Phản ứng thế nguyên tử halogen bằng nhóm -OH', 'Phản ứng cộng', 'Phản ứng trùng hợp', 'Phản ứng este hóa'],
    correctAnswer: 'Phản ứng thế nguyên tử halogen bằng nhóm -OH',
    explanation: 'Dẫn xuất halogen dễ tham gia phản ứng thế nguyên tử halogen bằng nhóm -OH khi đun nóng với dung dịch kiềm (NaOH, KOH).',
    hint: 'Thủy phân trong môi trường kiềm.'
  },
  {
    id: 3,
    category: 'halogen',
    type: 'multiple-choice',
    difficulty: 2,
    question: 'Khi đun nóng C2H5Br với dung dịch NaOH loãng, sản phẩm hữu cơ thu được là:',
    options: ['C2H4', 'C2H5OH', 'CH3CHO', 'C2H5OC2H5'],
    correctAnswer: 'C2H5OH',
    explanation: 'C2H5Br + NaOH (loãng, đun nóng) → C2H5OH + NaBr. Đây là phản ứng thủy phân dẫn xuất halogen trong môi trường kiềm.',
    hint: 'Phản ứng thủy phân tạo ancol.'
  },
  {
    id: 4,
    category: 'halogen',
    type: 'multiple-choice',
    difficulty: 2,
    question: 'Phản ứng tách HX từ dẫn xuất halogen cần điều kiện:',
    options: ['Dung dịch NaOH loãng, đun nóng', 'Dung dịch NaOH đặc trong ancol, đun nóng', 'H2SO4 loãng, nhiệt độ thường', 'Nước cất, đun sôi'],
    correctAnswer: 'Dung dịch NaOH đặc trong ancol, đun nóng',
    explanation: 'Để tách HX từ dẫn xuất halogen, cần dùng dung dịch kiềm đặc trong ancol (KOH/C2H5OH) và đun nóng.',
    hint: 'Môi trường ancol ưu tiên phản ứng tách.'
  },
  {
    id: 5,
    category: 'halogen',
    type: 'fill-blank',
    difficulty: 2,
    question: 'Sản phẩm chính khi tách HBr từ CH3-CHBr-CH3 theo quy tắc Zaitsev là ___',
    correctAnswer: 'propen',
    acceptedAnswers: ['propen', 'propilen', 'CH2=CH-CH3'],
    explanation: 'Theo quy tắc Zaitsev, H ưu tiên tách ở C bậc cao hơn. CH3-CHBr-CH3 → CH3-CH=CH2 (propen).',
    hint: 'Áp dụng quy tắc Zaitsev.'
  },
  {
    id: 6,
    category: 'halogen',
    type: 'multiple-choice',
    difficulty: 3,
    question: 'Chất nào sau đây khi thủy phân trong môi trường kiềm tạo ra phenol?',
    options: ['C6H5CH2Cl', 'C6H5Cl', 'C6H5CH2OH', 'C6H5OCH3'],
    correctAnswer: 'C6H5Cl',
    explanation: 'C6H5Cl (clobenzen) khi thủy phân trong NaOH đặc, nhiệt độ cao, áp suất cao tạo C6H5OH (phenol).',
    hint: 'Liên kết C-Cl gắn trực tiếp với vòng benzen.'
  },
  {
    id: 7,
    category: 'halogen',
    type: 'multiple-choice',
    difficulty: 2,
    question: 'CHCl3 (clorofom) được sử dụng làm:',
    options: ['Nhiên liệu', 'Dung môi hữu cơ', 'Phân bón', 'Thuốc nổ'],
    correctAnswer: 'Dung môi hữu cơ',
    explanation: 'CHCl3 là dung môi hữu cơ quan trọng, dùng để hòa tan các chất hữu cơ, trước đây còn dùng làm thuốc gây mê.',
    hint: 'Ứng dụng phổ biến trong phòng thí nghiệm.'
  },
  {
    id: 8,
    category: 'halogen',
    type: 'multiple-choice',
    difficulty: 3,
    question: 'Khi cho 2-brombutan tác dụng với KOH/C2H5OH đun nóng, sản phẩm chính là:',
    options: ['But-1-en', 'But-2-en', 'Butan-1-ol', 'Butan-2-ol'],
    correctAnswer: 'But-2-en',
    explanation: 'Theo quy tắc Zaitsev, sản phẩm chính là anken có nhiều nhóm thế hơn ở C=C. But-2-en bền hơn but-1-en.',
    hint: 'KOH/ancol → phản ứng tách theo Zaitsev.'
  },
  {
    id: 9,
    category: 'halogen',
    type: 'fill-blank',
    difficulty: 2,
    question: 'Công thức của freon-12 dùng trong công nghiệp làm lạnh là ___',
    correctAnswer: 'CCl2F2',
    acceptedAnswers: ['CCl2F2', 'CF2Cl2'],
    explanation: 'Freon-12 (CCl2F2) là hợp chất CFC dùng làm chất làm lạnh, nhưng gây hại tầng ozon nên đang bị hạn chế sử dụng.',
    hint: 'Chứa cả Cl và F trong phân tử.'
  },
  {
    id: 10,
    category: 'halogen',
    type: 'multiple-choice',
    difficulty: 3,
    question: 'Thứ tự giảm dần khả năng phản ứng thế với OH⁻ của các dẫn xuất halogen:',
    options: ['R-I > R-Br > R-Cl > R-F', 'R-F > R-Cl > R-Br > R-I', 'R-Cl > R-Br > R-I > R-F', 'R-Br > R-I > R-Cl > R-F'],
    correctAnswer: 'R-I > R-Br > R-Cl > R-F',
    explanation: 'Liên kết C-X càng yếu thì càng dễ bị thế. Độ bền liên kết: C-F > C-Cl > C-Br > C-I, nên khả năng thế: R-I > R-Br > R-Cl > R-F.',
    hint: 'Liên kết càng yếu càng dễ phản ứng.'
  },

  // ========== ANCOL (12 câu) ==========
  {
    id: 11,
    category: 'alcohol',
    type: 'multiple-choice',
    difficulty: 1,
    question: 'Nhóm chức của ancol là...',
    options: ['-COOH', '-CHO', '-OH', '-NH2'],
    correctAnswer: '-OH',
    explanation: 'Ancol là hợp chất hữu cơ có nhóm hiđroxyl (-OH) liên kết trực tiếp với nguyên tử cacbon no.',
    hint: 'Nhóm hiđroxyl.'
  },
  {
    id: 12,
    category: 'alcohol',
    type: 'fill-blank',
    difficulty: 2,
    question: 'Tên thay thế của ancol etylic (C2H5OH) là ___',
    correctAnswer: 'etanol',
    acceptedAnswers: ['etanol', 'ethanol'],
    explanation: 'Tên thay thế = Tên hidrocacbon tương ứng + ol. Etan + ol = Etanol.',
    hint: 'Bỏ đuôi -an thêm đuôi -ol.'
  },
  {
    id: 13,
    category: 'alcohol',
    type: 'multiple-choice',
    difficulty: 2,
    question: 'Ancol nào sau đây là ancol đa chức?',
    options: ['Metanol', 'Etanol', 'Glixerol', 'Propan-1-ol'],
    correctAnswer: 'Glixerol',
    explanation: 'Glixerol (C3H5(OH)3) có 3 nhóm -OH nên là ancol đa chức (poliancol).',
    hint: 'Có nhiều hơn 1 nhóm -OH.'
  },
  {
    id: 14,
    category: 'alcohol',
    type: 'multiple-choice',
    difficulty: 2,
    question: 'Butan-2-ol là ancol bậc mấy?',
    options: ['Bậc 1', 'Bậc 2', 'Bậc 3', 'Bậc 4'],
    correctAnswer: 'Bậc 2',
    explanation: 'Bậc ancol = bậc của C liên kết với -OH. Trong butan-2-ol (CH3-CHOH-CH2-CH3), C mang -OH liên kết với 2 C khác → ancol bậc 2.',
    hint: 'Xem C mang -OH liên kết với mấy C khác.'
  },
  {
    id: 15,
    category: 'alcohol',
    type: 'multiple-choice',
    difficulty: 2,
    question: 'Khi cho natri tác dụng với ancol etylic, hiện tượng quan sát được là:',
    options: ['Có kết tủa trắng', 'Có khí thoát ra', 'Có màu xanh xuất hiện', 'Không có hiện tượng'],
    correctAnswer: 'Có khí thoát ra',
    explanation: '2C2H5OH + 2Na → 2C2H5ONa + H2↑. Khí H2 thoát ra làm sủi bọt.',
    hint: 'Na phản ứng với H linh động trong -OH.'
  },
  {
    id: 16,
    category: 'alcohol',
    type: 'multiple-choice',
    difficulty: 2,
    question: 'Đun ancol etylic với H2SO4 đặc ở 140°C thu được sản phẩm chính là:',
    options: ['Etilen', 'Đietyl ete', 'Etyl hidrosunfat', 'Axetilen'],
    correctAnswer: 'Đietyl ete',
    explanation: '2C2H5OH → C2H5-O-C2H5 + H2O (140°C, H2SO4 đặc). Đây là phản ứng tách nước liên phân tử tạo ete.',
    hint: '140°C → tách nước liên phân tử.'
  },
  {
    id: 17,
    category: 'alcohol',
    type: 'multiple-choice',
    difficulty: 2,
    question: 'Đun ancol etylic với H2SO4 đặc ở 170°C thu được sản phẩm chính là:',
    options: ['Etilen', 'Đietyl ete', 'Etyl hidrosunfat', 'Axetilen'],
    correctAnswer: 'Etilen',
    explanation: 'C2H5OH → C2H4 + H2O (170°C, H2SO4 đặc). Đây là phản ứng tách nước nội phân tử tạo anken.',
    hint: '170°C → tách nước nội phân tử.'
  },
  {
    id: 18,
    category: 'alcohol',
    type: 'fill-blank',
    difficulty: 2,
    question: 'Số đồng phân ancol có công thức C3H8O là ___',
    correctAnswer: '2',
    acceptedAnswers: ['2', 'hai'],
    explanation: 'C3H8O có 2 đồng phân ancol: propan-1-ol (CH3-CH2-CH2OH) và propan-2-ol (CH3-CHOH-CH3).',
    hint: 'Vị trí của nhóm -OH thay đổi.'
  },
  {
    id: 19,
    category: 'alcohol',
    type: 'multiple-choice',
    difficulty: 3,
    question: 'Oxi hóa không hoàn toàn ancol bậc 1 bằng CuO, đun nóng thu được:',
    options: ['Anđehit', 'Xeton', 'Axit cacboxylic', 'Anken'],
    correctAnswer: 'Anđehit',
    explanation: 'RCH2OH + CuO → RCHO + Cu + H2O. Ancol bậc 1 bị oxi hóa thành anđehit.',
    hint: 'Ancol bậc 1 → anđehit, ancol bậc 2 → xeton.'
  },
  {
    id: 20,
    category: 'alcohol',
    type: 'multiple-choice',
    difficulty: 3,
    question: 'Oxi hóa không hoàn toàn ancol bậc 2 bằng CuO, đun nóng thu được:',
    options: ['Anđehit', 'Xeton', 'Axit cacboxylic', 'Anken'],
    correctAnswer: 'Xeton',
    explanation: 'R-CHOH-R\' + CuO → R-CO-R\' + Cu + H2O. Ancol bậc 2 bị oxi hóa thành xeton.',
    hint: 'Ancol bậc 2 có nhóm -CHOH-.'
  },
  {
    id: 21,
    category: 'alcohol',
    type: 'multiple-choice',
    difficulty: 2,
    question: 'Ancol nào có nhiệt độ sôi cao nhất?',
    options: ['Metanol', 'Etanol', 'Propan-1-ol', 'Glixerol'],
    correctAnswer: 'Glixerol',
    explanation: 'Glixerol có 3 nhóm -OH nên có nhiều liên kết hiđro liên phân tử hơn, dẫn đến nhiệt độ sôi cao nhất.',
    hint: 'Liên kết hiđro càng nhiều, nhiệt độ sôi càng cao.'
  },
  {
    id: 22,
    category: 'alcohol',
    type: 'multiple-choice',
    difficulty: 3,
    question: 'Metanol (CH3OH) rất độc vì khi vào cơ thể bị oxi hóa thành:',
    options: ['Axit axetic', 'Axit fomic và fomanđehit', 'CO2 và H2O', 'Metan'],
    correctAnswer: 'Axit fomic và fomanđehit',
    explanation: 'Metanol bị oxi hóa thành fomanđehit (HCHO) và axit fomic (HCOOH), gây tổn thương hệ thần kinh và mù mắt.',
    hint: 'Sản phẩm oxi hóa của ancol bậc 1.'
  },

  // ========== PHENOL (10 câu) ==========
  {
    id: 23,
    category: 'phenol',
    type: 'multiple-choice',
    difficulty: 2,
    question: 'Phenol (C6H5OH) có tính chất hóa học nào khác biệt so với ancol?',
    options: ['Tính bazơ', 'Tính axit yếu', 'Tính oxi hóa', 'Tính khử mạnh'],
    correctAnswer: 'Tính axit yếu',
    explanation: 'Do ảnh hưởng của vòng benzen, liên kết O-H trong phenol phân cực mạnh hơn ancol, làm cho phenol có tính axit yếu (tác dụng được với NaOH).',
    hint: 'Phenol có thể tác dụng với NaOH.'
  },
  {
    id: 24,
    category: 'phenol',
    type: 'multiple-choice',
    difficulty: 2,
    question: 'Hiện tượng khi cho nước brom vào dung dịch phenol là...',
    options: ['Không có hiện tượng', 'Dung dịch chuyển màu xanh', 'Xuất hiện kết tủa trắng', 'Có khí thoát ra'],
    correctAnswer: 'Xuất hiện kết tủa trắng',
    explanation: 'Phenol phản ứng thế với dung dịch brom tạo thành 2,4,6-tribromphenol kết tủa trắng.',
    hint: 'Phản ứng dùng để nhận biết phenol.'
  },
  {
    id: 25,
    category: 'phenol',
    type: 'multiple-choice',
    difficulty: 2,
    question: 'Phenol phản ứng được với dung dịch NaOH vì:',
    options: ['Phenol có tính bazơ', 'Phenol có tính axit yếu', 'Phenol có tính oxi hóa', 'Phenol có tính khử'],
    correctAnswer: 'Phenol có tính axit yếu',
    explanation: 'C6H5OH + NaOH → C6H5ONa + H2O. Phenol có tính axit yếu nên tác dụng được với bazơ mạnh.',
    hint: 'Axit + bazơ → muối + nước.'
  },
  {
    id: 26,
    category: 'phenol',
    type: 'fill-blank',
    difficulty: 2,
    question: 'Sản phẩm khi cho phenol tác dụng với NaOH là ___',
    correctAnswer: 'natri phenolat',
    acceptedAnswers: ['natri phenolat', 'C6H5ONa', 'phenolat natri'],
    explanation: 'C6H5OH + NaOH → C6H5ONa (natri phenolat) + H2O.',
    hint: 'Muối của phenol với natri.'
  },
  {
    id: 27,
    category: 'phenol',
    type: 'multiple-choice',
    difficulty: 3,
    question: 'So sánh tính axit của phenol và axit cacbonic:',
    options: ['Phenol mạnh hơn H2CO3', 'Phenol yếu hơn H2CO3', 'Phenol bằng H2CO3', 'Không so sánh được'],
    correctAnswer: 'Phenol yếu hơn H2CO3',
    explanation: 'Phenol có tính axit yếu hơn H2CO3. Vì vậy, khi sục CO2 vào dung dịch C6H5ONa sẽ tạo lại phenol.',
    hint: 'CO2 + H2O + C6H5ONa → ?'
  },
  {
    id: 28,
    category: 'phenol',
    type: 'multiple-choice',
    difficulty: 2,
    question: 'Phenol KHÔNG tác dụng được với:',
    options: ['Na', 'NaOH', 'HCl', 'Br2'],
    correctAnswer: 'HCl',
    explanation: 'Phenol có tính axit yếu nên không tác dụng với axit mạnh như HCl. Phenol tác dụng được với Na, NaOH, Br2.',
    hint: 'Axit yếu không phản ứng với axit mạnh.'
  },
  {
    id: 29,
    category: 'phenol',
    type: 'multiple-choice',
    difficulty: 3,
    question: 'Số nguyên tử brom trong sản phẩm khi phenol phản ứng với nước brom dư là:',
    options: ['1', '2', '3', '4'],
    correctAnswer: '3',
    explanation: 'C6H5OH + 3Br2 → C6H2Br3OH↓ + 3HBr. Sản phẩm 2,4,6-tribromphenol có 3 nguyên tử Br.',
    hint: 'Các vị trí ortho và para đều bị thế.'
  },
  {
    id: 30,
    category: 'phenol',
    type: 'multiple-choice',
    difficulty: 2,
    question: 'Phenol được ứng dụng chủ yếu để sản xuất:',
    options: ['Xà phòng', 'Nhựa phenol-fomanđehit', 'Thuốc nổ TNT', 'Cao su'],
    correctAnswer: 'Nhựa phenol-fomanđehit',
    explanation: 'Phenol phản ứng với fomanđehit tạo nhựa phenol-fomanđehit (bakelit), dùng làm vỏ công tắc điện, ổ cắm...',
    hint: 'Nhựa nhiệt rắn phổ biến.'
  },
  {
    id: 31,
    category: 'phenol',
    type: 'fill-blank',
    difficulty: 3,
    question: 'Công thức của 2,4,6-trinitrophenol (axit picric) là ___',
    correctAnswer: 'C6H2(NO2)3OH',
    acceptedAnswers: ['C6H2(NO2)3OH', 'HOC6H2(NO2)3'],
    explanation: 'Phenol tác dụng với HNO3 đặc tạo 2,4,6-trinitrophenol (axit picric), một chất nổ mạnh.',
    hint: 'Thay 3H bằng 3 nhóm -NO2.'
  },
  {
    id: 32,
    category: 'phenol',
    type: 'multiple-choice',
    difficulty: 2,
    question: 'Nhóm -OH trong phenol ảnh hưởng đến vòng benzen như thế nào?',
    options: ['Hút electron, giảm hoạt tính', 'Đẩy electron, tăng hoạt tính', 'Không ảnh hưởng', 'Làm đứt vòng benzen'],
    correctAnswer: 'Đẩy electron, tăng hoạt tính',
    explanation: 'Nhóm -OH đẩy electron vào vòng benzen làm tăng mật độ electron, khiến phenol dễ phản ứng thế hơn benzen.',
    hint: 'Phenol phản ứng với Br2 ở điều kiện thường.'
  },

  // ========== PHẢN ỨNG & NHẬN BIẾT (12 câu) ==========
  {
    id: 33,
    category: 'reactions',
    type: 'multiple-choice',
    difficulty: 3,
    question: 'Để phân biệt etanol và glixerol, ta dùng thuốc thử nào?',
    options: ['Na', 'Cu(OH)2', 'Dung dịch Brom', 'AgNO3/NH3'],
    correctAnswer: 'Cu(OH)2',
    explanation: 'Glixerol là ancol đa chức có các nhóm -OH liền kề nên hòa tan được Cu(OH)2 tạo dung dịch màu xanh lam đặc trưng. Etanol không có phản ứng này.',
    hint: 'Phản ứng tạo phức màu xanh lam.'
  },
  {
    id: 34,
    category: 'reactions',
    type: 'fill-blank',
    difficulty: 2,
    question: 'Sản phẩm chính khi tách nước từ butan-2-ol ở 170°C, xúc tác H2SO4 đặc là ___',
    correctAnswer: 'but-2-en',
    acceptedAnswers: ['but-2-en', '2-buten'],
    explanation: 'Theo quy tắc Zaitsev, nhóm -OH tách cùng với H ở cacbon bậc cao hơn bên cạnh để tạo anken có nhiều nhóm thế hơn (bền hơn).',
    hint: 'Quy tắc Zaitsev.'
  },
  {
    id: 35,
    category: 'reactions',
    type: 'multiple-choice',
    difficulty: 2,
    question: 'Ancol etylic có thể được điều chế trực tiếp từ chất nào sau đây bằng một phản ứng?',
    options: ['Metan', 'Etilen', 'Axetilen', 'Benzen'],
    correctAnswer: 'Etilen',
    explanation: 'C2H4 + H2O (xúc tác axit) → C2H5OH. Đây là phương pháp hidrat hóa anken.',
    hint: 'Cộng nước vào anken.'
  },
  {
    id: 36,
    category: 'reactions',
    type: 'multiple-choice',
    difficulty: 2,
    question: 'Để nhận biết phenol và etanol, ta dùng thuốc thử nào?',
    options: ['Na kim loại', 'Dung dịch NaOH', 'Dung dịch Brom', 'CuO, đun nóng'],
    correctAnswer: 'Dung dịch Brom',
    explanation: 'Phenol tạo kết tủa trắng với dung dịch brom (2,4,6-tribromphenol), còn etanol không phản ứng.',
    hint: 'Chỉ phenol tạo kết tủa trắng.'
  },
  {
    id: 37,
    category: 'reactions',
    type: 'multiple-choice',
    difficulty: 3,
    question: 'Điều chế phenol trong công nghiệp theo phương pháp cumen, nguyên liệu ban đầu là:',
    options: ['Benzen và etilen', 'Benzen và propilen', 'Toluen và clo', 'Naphtalen và oxi'],
    correctAnswer: 'Benzen và propilen',
    explanation: 'C6H6 + C3H6 → C6H5CH(CH3)2 (cumen), sau đó oxi hóa cumen bằng O2 rồi phân hủy thu được phenol và axeton.',
    hint: 'Cumen là isopropylbenzen.'
  },
  {
    id: 38,
    category: 'reactions',
    type: 'multiple-choice',
    difficulty: 3,
    question: 'Để điều chế ancol từ dẫn xuất halogen, cần dùng:',
    options: ['NaOH loãng, đun nóng', 'NaOH đặc trong ancol, đun nóng', 'H2SO4 đặc', 'HCl đặc'],
    correctAnswer: 'NaOH loãng, đun nóng',
    explanation: 'R-X + NaOH (loãng, t°) → R-OH + NaX. Đây là phản ứng thủy phân dẫn xuất halogen tạo ancol.',
    hint: 'Môi trường nước ưu tiên tạo ancol.'
  },
  {
    id: 39,
    category: 'reactions',
    type: 'fill-blank',
    difficulty: 2,
    question: 'Sản phẩm phụ khi điều chế phenol theo phương pháp cumen là ___',
    correctAnswer: 'axeton',
    acceptedAnswers: ['axeton', 'propanon', 'CH3COCH3'],
    explanation: 'Oxi hóa cumen thu được phenol (C6H5OH) và axeton (CH3COCH3) với tỉ lệ 1:1.',
    hint: 'Một xeton 3 carbon.'
  },
  {
    id: 40,
    category: 'reactions',
    type: 'multiple-choice',
    difficulty: 2,
    question: 'Ancol etylic được điều chế trong công nghiệp bằng cách lên men chất nào?',
    options: ['Dầu mỏ', 'Tinh bột hoặc đường', 'Khí thiên nhiên', 'Than đá'],
    correctAnswer: 'Tinh bột hoặc đường',
    explanation: 'C6H12O6 (enzim) → 2C2H5OH + 2CO2. Đây là phương pháp lên men rượu từ đường hoặc tinh bột.',
    hint: 'Quá trình sinh học tạo rượu.'
  },
  {
    id: 41,
    category: 'reactions',
    type: 'multiple-choice',
    difficulty: 3,
    question: 'Cho các chất: etanol, glixerol, phenol. Số chất tác dụng được với Na là:',
    options: ['1', '2', '3', '0'],
    correctAnswer: '3',
    explanation: 'Cả 3 chất đều có nhóm -OH nên đều tác dụng được với Na giải phóng H2.',
    hint: 'Na phản ứng với H linh động trong -OH.'
  },
  {
    id: 42,
    category: 'reactions',
    type: 'multiple-choice',
    difficulty: 3,
    question: 'Cho các chất: etanol, glixerol, phenol. Số chất tác dụng được với NaOH là:',
    options: ['1', '2', '3', '0'],
    correctAnswer: '1',
    explanation: 'Chỉ phenol có tính axit yếu nên tác dụng được với NaOH. Etanol và glixerol không tác dụng.',
    hint: 'NaOH chỉ phản ứng với chất có tính axit.'
  },
  {
    id: 43,
    category: 'reactions',
    type: 'fill-blank',
    difficulty: 3,
    question: 'Khi đốt cháy hoàn toàn 1 mol ancol no, đơn chức, mạch hở cần ___ mol O2 (tổng quát)',
    correctAnswer: '3n/2',
    acceptedAnswers: ['3n/2', '1.5n', '3/2n'],
    explanation: 'CnH2n+2O + (3n/2)O2 → nCO2 + (n+1)H2O. Ancol no, đơn chức cần 3n/2 mol O2.',
    hint: 'Dựa vào phương trình đốt cháy ancol no, đơn chức.'
  },
  {
    id: 44,
    category: 'reactions',
    type: 'multiple-choice',
    difficulty: 3,
    question: 'Để phân biệt 3 lọ mất nhãn chứa: etanol, glixerol, phenol, cần dùng tối thiểu mấy thuốc thử?',
    options: ['1', '2', '3', '4'],
    correctAnswer: '2',
    explanation: 'Dùng Br2: phenol tạo kết tủa trắng. Dùng Cu(OH)2: glixerol tạo dung dịch xanh lam, etanol không phản ứng.',
    hint: 'Br2 nhận biết phenol, Cu(OH)2 phân biệt 2 chất còn lại.'
  }
];

// ================== PROGRESS WATERMARK ==================
function ProgressWatermark({ categoryProgress, challenges }) {
  const completedCount = Object.values(categoryProgress).filter(p => p >= 80).length;
  const avgProgress = CATEGORIES.length > 0 
    ? Math.round(Object.values(categoryProgress).reduce((sum, p) => sum + p, 0) / CATEGORIES.length) 
    : 0;
  
  return (
    <div className="progress-watermark">
      <div className="watermark-title">
        <Trophy className="w-5 h-5 text-yellow-500" />
        <span>Tiến độ các giai đoạn</span>
      </div>
      <div className="watermark-grid">
        {CATEGORIES.map(cat => {
          const Icon = cat.icon;
          const total = challenges.filter(c => c.category === cat.id).length;
          const percentage = categoryProgress[cat.id] || 0;
          const isComplete = percentage >= 80;
          const hasProgress = percentage > 0 && !isComplete;
          
          return (
            <div key={cat.id} className={`watermark-item ${isComplete ? 'completed' : ''}`}>
              <div className="watermark-icon" style={{ backgroundColor: isComplete ? '#10b981' : hasProgress ? '#3b82f6' : cat.color }}>
                <Icon className="w-4 h-4 text-white" />
                {isComplete && <div className="complete-badge">✓</div>}
              </div>
              <div className="watermark-info">
                <div className="watermark-name">{cat.name}</div>
                <div className="watermark-progress-bar">
                  <div className="watermark-progress-fill" style={{ width: `${percentage}%`, backgroundColor: isComplete ? '#10b981' : hasProgress ? '#3b82f6' : cat.color }} />
                </div>
                <div className="watermark-stats">
                  <span className="watermark-percentage">{percentage}%</span>
                  <span className="watermark-count">{Math.round(total * percentage / 100)}/{total}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div className="watermark-total">
        <div className="total-label">Tổng tiến độ:</div>
        <div className="total-progress-bar">
          <div className="total-progress-fill" style={{ width: `${avgProgress}%` }} />
        </div>
        <div className="total-stats">
          {completedCount}/{CATEGORIES.length} chủ đề ({avgProgress}%)
        </div>
      </div>
    </div>
  );
}

const Bai06_DanXuatHalogen_Ancol_Phenol = () => {
  const [activeCategory, setActiveCategory] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [isCorrect, setIsCorrect] = useState(null);
  const [streak, setStreak] = useState(0);
  const [showExplanation, setShowExplanation] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30);
  const [isTimerActive, setIsTimerActive] = useState(false);
  const [showResumeDialog, setShowResumeDialog] = useState(false);
  const [categoryProgress, setCategoryProgress] = useState({}); // { 'category_id': percentage, ... }
  const [highScore, setHighScore] = useState(0);
  const [gameInProgress, setGameInProgress] = useState(false);
  const [totalCorrectAnswers, setTotalCorrectAnswers] = useState(0);
  const [totalScore, setTotalScore] = useState(0);

  const { hasProgress, savedProgress, saveProgress, clearProgress, completeChallenge } = useChallengeProgress('dan_xuat_halogen_ancol_phenol_11', {
    challengeId: 6,
    programId: 'chemistry',
    grade: 11
  });

  // States for completion tracking
  const [startTime] = useState(() => Date.now());
  const [isCompleted, setIsCompleted] = useState(false);

  // Filter questions by category
  const filteredQuestions = activeCategory 
    ? CHALLENGES.filter(q => q.category === activeCategory)
    : [];

  const currentQuestion = filteredQuestions[currentQuestionIndex];

  // Load saved progress
  useEffect(() => {
    if (savedProgress && !gameInProgress) {
      if (savedProgress.savedCategoryProgress) {
        setCategoryProgress(savedProgress.savedCategoryProgress);
      }
      if (savedProgress.savedHighScore) {
        setHighScore(savedProgress.savedHighScore);
      }
      if (savedProgress.savedTotalCorrectAnswers) {
        setTotalCorrectAnswers(savedProgress.savedTotalCorrectAnswers);
      }
      if (savedProgress.savedTotalScore) {
        setTotalScore(savedProgress.savedTotalScore);
      }
      
      if (savedProgress.category && !showResult) {
        setShowResumeDialog(true);
      }
    }
  }, [savedProgress, showResult, gameInProgress]);

  const handleResume = () => {
    if (savedProgress) {
      const { category, index, currentScore, currentStreak, savedCategoryProgress, savedHighScore, savedTotalCorrectAnswers, savedTotalScore } = savedProgress;
      setActiveCategory(category);
      setCurrentQuestionIndex(index || 0);
      setScore(currentScore || 0);
      setStreak(currentStreak || 0);
      setCategoryProgress(savedCategoryProgress || {});
      setHighScore(savedHighScore || 0);
      setTotalCorrectAnswers(savedTotalCorrectAnswers || 0);
      setTotalScore(savedTotalScore || 0);
      setShowResumeDialog(false);
      setIsTimerActive(true);
      setGameInProgress(true);
    }
  };

  const handleRestart = () => {
    setShowResumeDialog(false);
    clearProgress();
    resetGame();
  };

  const resetGame = () => {
    clearProgress();
    setActiveCategory(null);
    setCurrentQuestionIndex(0);
    setScore(0);
    setShowResult(false);
    setSelectedAnswer('');
    setIsCorrect(null);
    setStreak(0);
    setShowExplanation(false);
    setTimeLeft(30);
    setIsTimerActive(false);
    setTotalCorrectAnswers(0);
    setTotalScore(0);
    setCategoryProgress({});
    setIsCompleted(false);
    setGameInProgress(false);
  };

  // Timer logic
  useEffect(() => {
    let timer;
    if (isTimerActive && timeLeft > 0 && !showResult && !isCorrect && activeCategory) {
      timer = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            handleTimeOut();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isTimerActive, timeLeft, showResult, isCorrect, activeCategory]);

  const handleTimeOut = () => {
    setIsCorrect(false);
    setShowExplanation(true);
    setStreak(0);
    setIsTimerActive(false);
  };

  const handleCategorySelect = (categoryId) => {
    setActiveCategory(categoryId);
    setCurrentQuestionIndex(0);
    setScore(0);
    setShowResult(false);
    setStreak(0);
    setTimeLeft(30);
    setIsTimerActive(true);
    setGameInProgress(true);
  };

  const handleAnswerSubmit = (answer) => {
    if (isCorrect !== null) return;

    const isRight = answer.toLowerCase() === currentQuestion.correctAnswer.toLowerCase() || 
                    (currentQuestion.acceptedAnswers && currentQuestion.acceptedAnswers.includes(answer.toLowerCase()));
    
    setSelectedAnswer(answer);
    setIsCorrect(isRight);
    setShowExplanation(true);
    setIsTimerActive(false);

    if (isRight) {
      // Fixed scoring: 10 base + difficulty bonus, capped at 20 max per question
      const basePoints = 10 + currentQuestion.difficulty * 3;
      const points = Math.min(20, basePoints);
      setScore(prev => prev + points);
      setStreak(prev => prev + 1);
    } else {
      setStreak(0);
    }

    saveProgress({
      category: activeCategory,
      index: currentQuestionIndex,
      currentScore: score + (isRight ? 10 : 0),
      currentStreak: isRight ? streak + 1 : 0,
      savedCategoryProgress: categoryProgress,
      savedHighScore: highScore,
      savedTotalCorrectAnswers: totalCorrectAnswers,
      savedTotalScore: totalScore
    });
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < filteredQuestions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setSelectedAnswer('');
      setIsCorrect(null);
      setShowExplanation(false);
      setTimeLeft(30);
      setIsTimerActive(true);
    } else {
      finishCategory();
    }
  };

  const finishCategory = () => {
    setShowResult(true);
    setIsTimerActive(false);
    
    const maxScore = filteredQuestions.length * 20;
    const percentage = Math.min(100, Math.round((score / maxScore) * 100));
    const categoryCorrectAnswers = Math.round(score / 15);
    
    // Only update if new score is higher
    const oldPercentage = categoryProgress[activeCategory] || 0;
    const newCategoryProgress = percentage > oldPercentage 
      ? { ...categoryProgress, [activeCategory]: percentage } 
      : categoryProgress;
    const newHighScore = Math.max(highScore, score);
    const newTotalCorrectAnswers = totalCorrectAnswers + categoryCorrectAnswers;
    const newTotalScore = totalScore + score;
    
    if (percentage > oldPercentage) {
      setCategoryProgress(newCategoryProgress);
    }
    if (score > highScore) {
      setHighScore(newHighScore);
    }
    setTotalCorrectAnswers(newTotalCorrectAnswers);
    setTotalScore(newTotalScore);
    
    saveProgress({
      savedCategoryProgress: newCategoryProgress,
      savedHighScore: newHighScore,
      savedTotalCorrectAnswers: newTotalCorrectAnswers,
      savedTotalScore: newTotalScore
    });

    const completedCount = Object.values(newCategoryProgress).filter(p => p >= 80).length;
    if (completedCount === CATEGORIES.length && !isCompleted) {
      setIsCompleted(true);
      const totalMaxScore = CHALLENGES.length * 20;
      const totalPercentage = Math.round((newTotalScore / totalMaxScore) * 100);
      const stars = totalPercentage >= 80 ? 3 : totalPercentage >= 50 ? 2 : 1;
      completeChallenge({
        score: newTotalScore,
        maxScore: totalMaxScore,
        percentage: totalPercentage,
        stars,
        timeSpent: Math.floor((Date.now() - startTime) / 1000),
        correctAnswers: newTotalCorrectAnswers,
        totalQuestions: CHALLENGES.length
      });
    }
  };

  if (showResumeDialog) {
    return <ResumeDialog show={true} onResume={handleResume} onRestart={handleRestart} />;
  }

  return (
    <div className="ancol-bg min-h-screen p-4 md:p-8 font-sans">
      <div className="max-w-6xl mx-auto">
        {/* HEADER */}
        <header className="flex items-center justify-between mb-8 bg-white/10 backdrop-blur rounded-2xl p-4 border border-white/20">
          <div className="flex items-center gap-4">
            <Link to="/hoahoc/11" className="p-2 hover:bg-white/10 rounded-full transition-colors text-white">
              <ArrowLeft className="w-6 h-6" />
            </Link>
            <div>
              <h1 className="text-2xl font-bold text-white">
                Dẫn xuất Halogen - Ancol - Phenol
              </h1>
              <p className="text-cyan-100 text-sm">Hóa học 11 • Chương 8</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 px-4 py-2 bg-yellow-500/20 rounded-full border border-yellow-500/30">
              <Trophy className="w-5 h-5 text-yellow-400" />
              <span className="font-bold text-yellow-200">{score} XP</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-orange-500/20 rounded-full border border-orange-500/30">
              <Zap className="w-5 h-5 text-orange-400" />
              <span className="font-bold text-orange-200">{streak} Chuỗi</span>
            </div>
          </div>
        </header>

        {!activeCategory ? (
          // CATEGORY SELECTION
          <div className="animate-fadeIn">
            <div className="stats-bar-ancol mb-8">
              <div className="stat-item-ancol">
                <CheckCircle2 className="w-5 h-5 text-green-400" />
                <span>Đã hoàn thành: <strong>{Object.values(categoryProgress).filter(p => p >= 80).length}/{CATEGORIES.length}</strong></span>
              </div>
              <div className="stat-item-ancol">
                <Award className="w-5 h-5 text-yellow-400" />
                <span>Điểm cao nhất: <strong>{highScore || 0}</strong></span>
              </div>
            </div>

            {/* Progress Watermark */}
            <ProgressWatermark categoryProgress={categoryProgress} challenges={CHALLENGES} />

            <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <Target className="w-6 h-6" />
              Chọn chủ đề thử thách
            </h2>

            <div className="category-grid-ancol">
              {CATEGORIES.map((cat) => {
                const Icon = cat.icon;
                const catPercentage = categoryProgress[cat.id] || 0;
                const isCompleted = catPercentage >= 80;
                const hasProgress = catPercentage > 0 && !isCompleted;
                
                return (
                  <div 
                    key={cat.id}
                    onClick={() => handleCategorySelect(cat.id)}
                    className="category-card-ancol group"
                  >
                    <div className={`category-icon-wrapper-ancol ${isCompleted ? 'bg-green-500/20 text-green-400' : hasProgress ? 'bg-blue-500/20 text-blue-400' : ''}`}>
                      <Icon className="w-8 h-8" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-white mb-1 group-hover:text-cyan-300 transition-colors">
                        {cat.name}
                      </h3>
                      <p className="text-sm text-cyan-100 mb-3">{cat.description}</p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-semibold px-2 py-1 rounded bg-white/10 text-cyan-100">
                            {CHALLENGES.filter(c => c.category === cat.id).length} câu hỏi
                          </span>
                          {catPercentage > 0 && (
                            <span className={`text-xs font-semibold px-2 py-1 rounded ${isCompleted ? 'bg-green-500/20 text-green-300' : 'bg-blue-500/20 text-blue-300'}`}>
                              {catPercentage}%
                            </span>
                          )}
                        </div>
                        {isCompleted && <CheckCircle2 className="w-5 h-5 text-green-400" />}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ) : !showResult ? (
          // GAMEPLAY
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center justify-between mb-6 text-white">
              <div className="flex items-center gap-4">
                <button onClick={() => setActiveCategory(null)} className="hover:bg-white/10 p-2 rounded-full transition-colors">
                  <RotateCcw className="w-5 h-5" />
                </button>
                <span className="font-medium text-lg">
                  Câu {currentQuestionIndex + 1}/{filteredQuestions.length}
                </span>
              </div>
              <div className={`flex items-center gap-2 px-4 py-2 rounded-full ${timeLeft < 10 ? 'bg-red-500/20 text-red-200' : 'bg-white/10'}`}>
                <Clock className="w-4 h-4" />
                <span className="font-mono font-bold">{timeLeft}s</span>
              </div>
            </div>

            <div className="progress-track-ancol mb-6">
              <div 
                className="progress-fill-ancol"
                style={{ width: `${((currentQuestionIndex) / filteredQuestions.length) * 100}%` }}
              />
            </div>

            <div className="question-card-ancol">
              <div className="question-header-ancol">
                <span className={`difficulty-badge-ancol ${
                  currentQuestion.difficulty === 1 ? 'difficulty-easy' :
                  currentQuestion.difficulty === 2 ? 'difficulty-medium' : 'difficulty-hard'
                }`}>
                  {currentQuestion.difficulty === 1 ? 'Dễ' :
                   currentQuestion.difficulty === 2 ? 'Trung bình' : 'Khó'}
                </span>
                <div className="flex gap-1">
                  {[...Array(currentQuestion.difficulty)].map((_, i) => (
                    <Zap key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                  ))}
                </div>
              </div>

              <h3 className="text-xl md:text-2xl font-bold text-white mb-6 leading-relaxed">
                {currentQuestion.question}
              </h3>

              {currentQuestion.type === 'multiple-choice' ? (
                <div className="options-grid-ancol">
                  {currentQuestion.options.map((option, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleAnswerSubmit(option)}
                      disabled={isCorrect !== null}
                      className={`option-btn-ancol ${
                        selectedAnswer === option 
                          ? (isCorrect ? 'correct' : 'wrong')
                          : (isCorrect !== null && option === currentQuestion.correctAnswer ? 'correct' : '')
                      }`}
                    >
                      <span className="font-medium">{String.fromCharCode(65 + idx)}. {option}</span>
                      {selectedAnswer === option && (
                        isCorrect ? <CheckCircle2 className="w-5 h-5" /> : <XCircle className="w-5 h-5" />
                      )}
                    </button>
                  ))}
                </div>
              ) : (
                <div className="mb-8">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={selectedAnswer}
                      onChange={(e) => setSelectedAnswer(e.target.value)}
                      disabled={isCorrect !== null}
                      placeholder="Nhập câu trả lời của bạn..."
                      className="flex-1 p-4 bg-white/5 border border-white/20 rounded-xl text-lg text-white focus:border-cyan-500 focus:outline-none"
                      onKeyDown={(e) => e.key === 'Enter' && handleAnswerSubmit(selectedAnswer)}
                    />
                    <button
                      onClick={() => handleAnswerSubmit(selectedAnswer)}
                      disabled={!selectedAnswer || isCorrect !== null}
                      className="px-6 py-2 bg-cyan-600 text-white rounded-xl font-bold hover:bg-cyan-700 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Kiểm tra
                    </button>
                  </div>
                </div>
              )}

              {showExplanation && (
                <div className={`feedback-container-ancol ${isCorrect ? 'feedback-correct' : 'feedback-wrong'}`}>
                  <div className="flex items-start gap-3 mb-2">
                    {isCorrect ? <Lightbulb className="w-6 h-6" /> : <AlertTriangle className="w-6 h-6" />}
                    <div>
                      <h4 className="font-bold text-lg mb-1">
                        {isCorrect ? 'Chính xác!' : 'Chưa chính xác'}
                      </h4>
                      <p className="text-sm opacity-90 mb-2">
                        Đáp án đúng: <strong>{currentQuestion.correctAnswer}</strong>
                      </p>
                      <p className="leading-relaxed">{currentQuestion.explanation}</p>
                    </div>
                  </div>
                  
                  <div className="mt-4 flex justify-end">
                    <button
                      onClick={handleNextQuestion}
                      className="flex items-center gap-2 px-6 py-2 bg-white/10 text-white rounded-lg font-bold hover:bg-white/20 transition-colors"
                    >
                      {currentQuestionIndex < filteredQuestions.length - 1 ? 'Câu tiếp theo' : 'Hoàn thành'}
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        ) : (
          // RESULTS SCREEN
          <div className="max-w-2xl mx-auto text-center animate-fadeIn">
            <div className="bg-white/10 backdrop-blur rounded-3xl p-8 shadow-2xl mb-8 border border-white/20">
              <div className="w-24 h-24 bg-yellow-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <Award className="w-12 h-12 text-yellow-400" />
              </div>
              
              <h2 className="text-3xl font-bold text-white mb-2">Hoàn thành xuất sắc!</h2>
              <p className="text-cyan-100 mb-8">Bạn đã hoàn thành chủ đề {CATEGORIES.find(c => c.id === activeCategory)?.name}</p>
              
              <div className="grid grid-cols-3 gap-4 mb-8">
                <div className="p-4 bg-white/5 rounded-2xl border border-white/10">
                  <div className="text-sm text-cyan-100 mb-1">Điểm số</div>
                  <div className="text-2xl font-bold text-green-400">{score}</div>
                </div>
                <div className="p-4 bg-white/5 rounded-2xl border border-white/10">
                  <div className="text-sm text-cyan-100 mb-1">Đúng</div>
                  <div className="text-2xl font-bold text-blue-400">
                    {Math.min(100, Math.round((score / (filteredQuestions.length * 20)) * 100))}%
                  </div>
                </div>
                <div className="p-4 bg-white/5 rounded-2xl border border-white/10">
                  <div className="text-sm text-cyan-100 mb-1">Thời gian</div>
                  <div className="text-2xl font-bold text-purple-400">
                    {Math.floor((filteredQuestions.length * 30 - timeLeft) / 60)}m
                  </div>
                </div>
              </div>

              <div className="flex gap-4 justify-center">
                <button
                  onClick={resetGame}
                  className="flex items-center gap-2 px-6 py-3 bg-white/10 text-white rounded-xl font-bold hover:bg-white/20 transition-colors"
                >
                  <RotateCcw className="w-5 h-5" />
                  Làm lại
                </button>
                <button
                  onClick={() => {
                    setShowResult(false);
                    setActiveCategory(null);
                    setCurrentQuestionIndex(0);
                    setScore(0);
                    setSelectedAnswer('');
                    setIsCorrect(null);
                    setStreak(0);
                    setShowExplanation(false);
                    setTimeLeft(30);
                    setIsTimerActive(false);
                    setGameInProgress(false);
                  }}
                  className="flex items-center gap-2 px-6 py-3 bg-cyan-600 text-white rounded-xl font-bold hover:bg-cyan-700 transition-colors shadow-lg shadow-cyan-500/30"
                >
                  Chủ đề khác
                  <ArrowLeft className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Bai06_DanXuatHalogen_Ancol_Phenol;
