import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowLeft, Trophy, RotateCcw, ChevronRight,
  CheckCircle2, XCircle, Lightbulb, Zap, Award,
  Wheat, Apple, Candy, Cookie, Leaf,
  Clock, Target, AlertTriangle, Flame
} from 'lucide-react';
import useChallengeProgress from '../../../hooks/useChallengeProgress';
import ResumeDialog from '../../../components/ResumeDialog';
import './CSS/Bai02_Cacbohidrat.css';

// ================== DATA - CACBOHIĐRAT ==================
const CATEGORIES = [
  {
    id: 'glucose',
    name: 'Glucozơ',
    icon: Apple,
    color: '#ef4444',
    description: 'Cấu tạo, tính chất của glucozơ',
    bgGradient: 'from-red-500 to-orange-500'
  },
  {
    id: 'saccharose',
    name: 'Saccarozơ',
    icon: Candy,
    color: '#ec4899',
    description: 'Đường mía - disaccarit',
    bgGradient: 'from-pink-500 to-rose-500'
  },
  {
    id: 'starch',
    name: 'Tinh bột',
    icon: Wheat,
    color: '#f59e0b',
    description: 'Polisaccarit dự trữ năng lượng',
    bgGradient: 'from-amber-500 to-yellow-500'
  },
  {
    id: 'cellulose',
    name: 'Xenlulozơ',
    icon: Leaf,
    color: '#22c55e',
    description: 'Polisaccarit cấu trúc',
    bgGradient: 'from-green-500 to-emerald-500'
  }
];

const CHALLENGES = [
  // ========== GLUCOZƠ (12 câu) ==========
  {
    id: 1,
    category: 'glucose',
    type: 'multiple-choice',
    difficulty: 1,
    question: 'Công thức phân tử của glucozơ là...',
    options: ['C6H12O6', 'C12H22O11', 'C6H10O5', 'C5H10O5'],
    correctAnswer: 'C6H12O6',
    explanation: 'Glucozơ có công thức phân tử C6H12O6, là monosaccarit quan trọng nhất. Glucozơ còn gọi là đường nho vì có nhiều trong quả nho chín.',
    hint: 'Monosaccarit 6 cacbon.'
  },
  {
    id: 2,
    category: 'glucose',
    type: 'multiple-choice',
    difficulty: 1,
    question: 'Glucozơ còn được gọi là...',
    options: ['Đường nho', 'Đường mía', 'Đường mạch nha', 'Đường sữa'],
    correctAnswer: 'Đường nho',
    explanation: 'Glucozơ còn gọi là đường nho vì có nhiều trong quả nho chín. Trong máu người cũng có glucozơ với nồng độ khoảng 0,1%.',
    hint: 'Có nhiều trong quả nho.'
  },
  {
    id: 3,
    category: 'glucose',
    type: 'multiple-choice',
    difficulty: 2,
    question: 'Glucozơ có cấu tạo mạch hở chứa nhóm chức nào?',
    options: ['1 nhóm -CHO và 5 nhóm -OH', '2 nhóm -CHO và 4 nhóm -OH', '1 nhóm -CO- và 5 nhóm -OH', '6 nhóm -OH'],
    correctAnswer: '1 nhóm -CHO và 5 nhóm -OH',
    explanation: 'Glucozơ có cấu tạo mạch hở: CH2OH-[CHOH]4-CHO, chứa 1 nhóm anđehit (-CHO) và 5 nhóm hiđroxyl (-OH).',
    hint: 'Glucozơ là anđehit đa chức.'
  },
  {
    id: 4,
    category: 'glucose',
    type: 'multiple-choice',
    difficulty: 2,
    question: 'Phản ứng tráng bạc của glucozơ chứng tỏ glucozơ có nhóm chức...',
    options: ['-CHO', '-COOH', '-OH', '-CO-'],
    correctAnswer: '-CHO',
    explanation: 'Phản ứng tráng bạc là phản ứng đặc trưng của nhóm anđehit (-CHO). Glucozơ tham gia phản ứng này chứng tỏ phân tử có nhóm -CHO.',
    hint: 'Nhóm chức của anđehit.'
  },
  {
    id: 5,
    category: 'glucose',
    type: 'fill-blank',
    difficulty: 2,
    question: 'Khi cho glucozơ tác dụng với dung dịch AgNO3/NH3 dư, đun nóng, tỉ lệ mol glucozơ : Ag là...',
    correctAnswer: '1:2',
    acceptedAnswers: ['1:2', '1 : 2', '1/2'],
    explanation: 'Phản ứng: C6H12O6 + 2AgNO3 + 2NH3 → C6H12O7 + 2Ag↓ + 2NH4NO3. Tỉ lệ mol glucozơ : Ag = 1 : 2.',
    hint: 'Mỗi nhóm -CHO khử được 2 ion Ag⁺.'
  },
  {
    id: 6,
    category: 'glucose',
    type: 'multiple-choice',
    difficulty: 2,
    question: 'Glucozơ tác dụng với Cu(OH)2 ở nhiệt độ thường tạo...',
    options: ['Dung dịch màu xanh lam', 'Kết tủa đỏ gạch', 'Dung dịch không màu', 'Kết tủa trắng'],
    correctAnswer: 'Dung dịch màu xanh lam',
    explanation: 'Ở nhiệt độ thường, glucozơ (polyol) hòa tan Cu(OH)2 tạo phức đồng-glucozơ có màu xanh lam đặc trưng.',
    hint: 'Phản ứng đặc trưng của polyol.'
  },
  {
    id: 7,
    category: 'glucose',
    type: 'multiple-choice',
    difficulty: 3,
    question: 'Glucozơ tác dụng với Cu(OH)2 khi đun nóng tạo...',
    options: ['Kết tủa đỏ gạch Cu2O', 'Dung dịch xanh lam', 'Kết tủa xanh Cu(OH)2', 'Khí CO2'],
    correctAnswer: 'Kết tủa đỏ gạch Cu2O',
    explanation: 'Khi đun nóng, nhóm -CHO của glucozơ khử Cu(OH)2 trong môi trường kiềm thành Cu2O (đỏ gạch): CH2OH-[CHOH]4-CHO + 2Cu(OH)2 → CH2OH-[CHOH]4-COOH + Cu2O↓ + 2H2O',
    hint: 'Phản ứng khử Cu²⁺ thành Cu⁺.'
  },
  {
    id: 8,
    category: 'glucose',
    type: 'multiple-choice',
    difficulty: 2,
    question: 'Sản phẩm của phản ứng lên men rượu từ glucozơ là...',
    options: ['C2H5OH và CO2', 'CH3COOH và H2O', 'C2H5OH và H2O', 'CH3OH và CO2'],
    correctAnswer: 'C2H5OH và CO2',
    explanation: 'Phản ứng lên men rượu: C6H12O6 →(enzim, 30-35°C) 2C2H5OH + 2CO2↑. Đây là phản ứng quan trọng trong sản xuất rượu.',
    hint: 'Lên men tạo etanol.'
  },
  {
    id: 9,
    category: 'glucose',
    type: 'fill-blank',
    difficulty: 3,
    question: 'Lên men 180g glucozơ với hiệu suất 80%, thu được bao nhiêu gam ancol etylic?',
    correctAnswer: '73,6',
    acceptedAnswers: ['73,6', '73.6', '73,6g', '73.6g'],
    explanation: 'C6H12O6 → 2C2H5OH + 2CO2. n(glucozơ) = 180/180 = 1 mol → n(C2H5OH) = 2 mol. m(C2H5OH) = 2 × 46 × 0,8 = 73,6g.',
    hint: 'Áp dụng công thức: m = n × M × H.'
  },
  {
    id: 10,
    category: 'glucose',
    type: 'multiple-choice',
    difficulty: 1,
    question: 'Fructozơ là đồng phân của...',
    options: ['Glucozơ', 'Saccarozơ', 'Tinh bột', 'Xenlulozơ'],
    correctAnswer: 'Glucozơ',
    explanation: 'Fructozơ và glucozơ đều có công thức phân tử C6H12O6, nhưng khác nhau về cấu tạo. Fructozơ là xeton, glucozơ là anđehit.',
    hint: 'Cùng công thức phân tử.'
  },
  {
    id: 11,
    category: 'glucose',
    type: 'multiple-choice',
    difficulty: 2,
    question: 'Fructozơ khác glucozơ ở điểm nào?',
    options: ['Fructozơ chứa nhóm -CO-, glucozơ chứa nhóm -CHO', 'Fructozơ không tan trong nước', 'Fructozơ không tác dụng với Cu(OH)2', 'Fructozơ có 5 nguyên tử cacbon'],
    correctAnswer: 'Fructozơ chứa nhóm -CO-, glucozơ chứa nhóm -CHO',
    explanation: 'Fructozơ có nhóm xeton (-CO-) ở C2, còn glucozơ có nhóm anđehit (-CHO) ở C1. Tuy nhiên, trong môi trường kiềm, fructozơ chuyển thành glucozơ.',
    hint: 'Khác nhau về nhóm chức.'
  },
  {
    id: 12,
    category: 'glucose',
    type: 'multiple-choice',
    difficulty: 3,
    question: 'Trong công nghiệp, glucozơ được điều chế bằng cách...',
    options: ['Thủy phân tinh bột bằng axit loãng hoặc enzim', 'Lên men rượu', 'Tổng hợp từ CO2 và H2O', 'Khử fructozơ'],
    correctAnswer: 'Thủy phân tinh bột bằng axit loãng hoặc enzim',
    explanation: 'Trong công nghiệp: (C6H10O5)n + nH2O →(H⁺ hoặc enzim) nC6H12O6. Phương pháp này dùng nguyên liệu rẻ tiền như ngô, khoai, sắn.',
    hint: 'Từ polisaccarit.'
  },

  // ========== SACCAROZƠ (12 câu) ==========
  {
    id: 13,
    category: 'saccharose',
    type: 'multiple-choice',
    difficulty: 1,
    question: 'Saccarozơ là đường có nhiều trong...',
    options: ['Mía, củ cải đường', 'Sữa động vật', 'Mạch nha', 'Quả nho'],
    correctAnswer: 'Mía, củ cải đường',
    explanation: 'Saccarozơ (đường mía) có nhiều trong cây mía (khoảng 13-15%) và củ cải đường (khoảng 15-20%). Đây là loại đường phổ biến nhất trong đời sống.',
    hint: 'Đường mía.'
  },
  {
    id: 14,
    category: 'saccharose',
    type: 'multiple-choice',
    difficulty: 1,
    question: 'Công thức phân tử của saccarozơ là...',
    options: ['C12H22O11', 'C6H12O6', 'C6H10O5', 'C12H24O12'],
    correctAnswer: 'C12H22O11',
    explanation: 'Saccarozơ có công thức C12H22O11, thuộc loại disaccarit (đường đôi), được cấu tạo từ 1 gốc α-glucozơ và 1 gốc β-fructozơ.',
    hint: 'Disaccarit 12 cacbon.'
  },
  {
    id: 15,
    category: 'saccharose',
    type: 'multiple-choice',
    difficulty: 2,
    question: 'Saccarozơ được cấu tạo từ...',
    options: ['1 gốc α-glucozơ và 1 gốc β-fructozơ', '2 gốc α-glucozơ', '2 gốc β-fructozơ', '1 gốc glucozơ và 1 gốc galactozơ'],
    correctAnswer: '1 gốc α-glucozơ và 1 gốc β-fructozơ',
    explanation: 'Saccarozơ gồm 1 gốc α-glucozơ liên kết với 1 gốc β-fructozơ qua liên kết 1,2-glicozit. Đây là liên kết giữa C1 của glucozơ và C2 của fructozơ.',
    hint: 'Gồm 2 monosaccarit khác nhau.'
  },
  {
    id: 16,
    category: 'saccharose',
    type: 'multiple-choice',
    difficulty: 2,
    question: 'Saccarozơ KHÔNG có phản ứng tráng bạc vì...',
    options: ['Không còn nhóm -CHO tự do', 'Không tan trong nước', 'Không có nhóm -OH', 'Là chất rắn'],
    correctAnswer: 'Không còn nhóm -CHO tự do',
    explanation: 'Trong phân tử saccarozơ, nhóm -CHO của glucozơ và nhóm -CO- của fructozơ đã tham gia liên kết glicozit nên saccarozơ không còn tính khử.',
    hint: 'Liên kết glicozit khóa nhóm chức.'
  },
  {
    id: 17,
    category: 'saccharose',
    type: 'multiple-choice',
    difficulty: 2,
    question: 'Sản phẩm thủy phân saccarozơ là...',
    options: ['Glucozơ và fructozơ', 'Chỉ glucozơ', 'Chỉ fructozơ', 'Glucozơ và galactozơ'],
    correctAnswer: 'Glucozơ và fructozơ',
    explanation: 'Phản ứng thủy phân: C12H22O11 + H2O →(H⁺ hoặc enzim) C6H12O6 (glucozơ) + C6H12O6 (fructozơ). Hỗn hợp này gọi là đường nghịch chuyển.',
    hint: '2 loại monosaccarit.'
  },
  {
    id: 18,
    category: 'saccharose',
    type: 'fill-blank',
    difficulty: 2,
    question: 'Thủy phân hoàn toàn 342g saccarozơ, thu được tổng khối lượng sản phẩm là... gam.',
    correctAnswer: '360',
    acceptedAnswers: ['360', '360g', '360 gam'],
    explanation: 'C12H22O11 + H2O → C6H12O6 + C6H12O6. n(saccarozơ) = 342/342 = 1 mol. m(sản phẩm) = 180 + 180 = 360g (hoặc 342 + 18 = 360g).',
    hint: 'Bảo toàn khối lượng: m(saccarozơ) + m(H2O) = m(sản phẩm).'
  },
  {
    id: 19,
    category: 'saccharose',
    type: 'multiple-choice',
    difficulty: 1,
    question: 'Saccarozơ thuộc loại cacbohiđrat nào?',
    options: ['Disaccarit', 'Monosaccarit', 'Polisaccarit', 'Oligosaccarit'],
    correctAnswer: 'Disaccarit',
    explanation: 'Saccarozơ thuộc loại disaccarit (đường đôi) vì phân tử được tạo từ 2 gốc monosaccarit liên kết với nhau.',
    hint: 'Đường đôi.'
  },
  {
    id: 20,
    category: 'saccharose',
    type: 'multiple-choice',
    difficulty: 2,
    question: 'Saccarozơ tác dụng với Cu(OH)2 ở nhiệt độ thường cho...',
    options: ['Dung dịch màu xanh lam', 'Không phản ứng', 'Kết tủa đỏ gạch', 'Khí bay lên'],
    correctAnswer: 'Dung dịch màu xanh lam',
    explanation: 'Saccarozơ có nhiều nhóm -OH liền kề nên hòa tan được Cu(OH)2 tạo phức đồng-saccarozơ màu xanh lam ở nhiệt độ thường.',
    hint: 'Tính chất của polyol.'
  },
  {
    id: 21,
    category: 'saccharose',
    type: 'multiple-choice',
    difficulty: 3,
    question: 'Saccarozơ tác dụng với Cu(OH)2 khi đun nóng...',
    options: ['Không tạo kết tủa đỏ gạch', 'Tạo kết tủa đỏ gạch Cu2O', 'Tạo kết tủa trắng', 'Tạo khí CO2'],
    correctAnswer: 'Không tạo kết tủa đỏ gạch',
    explanation: 'Saccarozơ không có nhóm -CHO tự do nên không khử được Cu(OH)2 khi đun nóng, không tạo kết tủa Cu2O đỏ gạch.',
    hint: 'Saccarozơ không có tính khử.'
  },
  {
    id: 22,
    category: 'saccharose',
    type: 'multiple-choice',
    difficulty: 1,
    question: 'Đường kính (đường trắng) thường dùng trong gia đình là...',
    options: ['Saccarozơ', 'Glucozơ', 'Fructozơ', 'Mantozơ'],
    correctAnswer: 'Saccarozơ',
    explanation: 'Đường kính (đường trắng tinh luyện) chủ yếu là saccarozơ, được sản xuất từ mía hoặc củ cải đường.',
    hint: 'Đường phổ biến nhất.'
  },
  {
    id: 23,
    category: 'saccharose',
    type: 'fill-blank',
    difficulty: 3,
    question: 'Để phân biệt glucozơ và saccarozơ, ta dùng phản ứng...',
    correctAnswer: 'tráng bạc',
    acceptedAnswers: ['tráng bạc', 'tráng gương', 'AgNO3/NH3', 'trang bac', 'trang guong'],
    explanation: 'Glucozơ có phản ứng tráng bạc (tạo kết tủa Ag), còn saccarozơ không có phản ứng này vì không có nhóm -CHO tự do.',
    hint: 'Phản ứng của nhóm anđehit.'
  },
  {
    id: 24,
    category: 'saccharose',
    type: 'multiple-choice',
    difficulty: 3,
    question: 'Hỗn hợp sản phẩm thủy phân saccarozơ được gọi là...',
    options: ['Đường nghịch chuyển', 'Đường mạch nha', 'Mật ong', 'Siro'],
    correctAnswer: 'Đường nghịch chuyển',
    explanation: 'Hỗn hợp glucozơ và fructozơ từ thủy phân saccarozơ gọi là đường nghịch chuyển vì góc quay cực của dung dịch đã thay đổi.',
    hint: 'Do thay đổi góc quay cực.'
  },

  // ========== TINH BỘT (12 câu) ==========
  {
    id: 25,
    category: 'starch',
    type: 'multiple-choice',
    difficulty: 1,
    question: 'Tinh bột thuộc loại cacbohiđrat nào?',
    options: ['Polisaccarit', 'Monosaccarit', 'Disaccarit', 'Oligosaccarit'],
    correctAnswer: 'Polisaccarit',
    explanation: 'Tinh bột là polisaccarit (đa đường), được cấu tạo từ nhiều gốc α-glucozơ liên kết với nhau.',
    hint: 'Đường đa.'
  },
  {
    id: 26,
    category: 'starch',
    type: 'multiple-choice',
    difficulty: 1,
    question: 'Công thức chung của tinh bột là...',
    options: ['(C6H10O5)n', 'C6H12O6', 'C12H22O11', 'C6H10O5'],
    correctAnswer: '(C6H10O5)n',
    explanation: 'Tinh bột có công thức (C6H10O5)n với n rất lớn (hàng nghìn đến hàng triệu). Mỗi mắt xích C6H10O5 tương ứng với 1 gốc α-glucozơ.',
    hint: 'Công thức của polisaccarit.'
  },
  {
    id: 27,
    category: 'starch',
    type: 'multiple-choice',
    difficulty: 2,
    question: 'Tinh bột được cấu tạo từ 2 thành phần là...',
    options: ['Amilozơ và amilopectin', 'Glucozơ và fructozơ', 'Xenlulozơ và glucozơ', 'Saccarozơ và mantozơ'],
    correctAnswer: 'Amilozơ và amilopectin',
    explanation: 'Tinh bột gồm amilozơ (20-30%, mạch không phân nhánh) và amilopectin (70-80%, mạch phân nhánh). Tỉ lệ này thay đổi tùy nguồn tinh bột.',
    hint: '2 thành phần của tinh bột.'
  },
  {
    id: 28,
    category: 'starch',
    type: 'multiple-choice',
    difficulty: 2,
    question: 'Amilozơ có cấu trúc mạch...',
    options: ['Không phân nhánh, xoắn', 'Phân nhánh', 'Thẳng không xoắn', 'Vòng kín'],
    correctAnswer: 'Không phân nhánh, xoắn',
    explanation: 'Amilozơ có cấu trúc mạch không phân nhánh, xoắn theo hình xoắn ốc. Mỗi vòng xoắn có khoảng 6 gốc glucozơ.',
    hint: 'Mạch thẳng, cuộn xoắn.'
  },
  {
    id: 29,
    category: 'starch',
    type: 'multiple-choice',
    difficulty: 2,
    question: 'Thuốc thử đặc trưng để nhận biết tinh bột là...',
    options: ['Dung dịch iot (I2)', 'Dung dịch AgNO3/NH3', 'Cu(OH)2', 'Dung dịch Br2'],
    correctAnswer: 'Dung dịch iot (I2)',
    explanation: 'Tinh bột tạo màu xanh tím đặc trưng với iot (I2). Màu này mất đi khi đun nóng và xuất hiện lại khi để nguội.',
    hint: 'Phản ứng tạo màu xanh tím.'
  },
  {
    id: 30,
    category: 'starch',
    type: 'multiple-choice',
    difficulty: 1,
    question: 'Khi nhỏ dung dịch iot vào hồ tinh bột, hiện tượng xảy ra là...',
    options: ['Xuất hiện màu xanh tím', 'Xuất hiện kết tủa trắng', 'Không có hiện tượng', 'Xuất hiện màu đỏ'],
    correctAnswer: 'Xuất hiện màu xanh tím',
    explanation: 'Iot bị hấp phụ vào các vòng xoắn của phân tử amilozơ trong tinh bột, tạo hợp chất có màu xanh tím đặc trưng.',
    hint: 'Phản ứng đặc trưng của tinh bột.'
  },
  {
    id: 31,
    category: 'starch',
    type: 'multiple-choice',
    difficulty: 2,
    question: 'Thủy phân hoàn toàn tinh bột thu được sản phẩm là...',
    options: ['Glucozơ', 'Fructozơ', 'Saccarozơ', 'Mantozơ'],
    correctAnswer: 'Glucozơ',
    explanation: 'Thủy phân hoàn toàn: (C6H10O5)n + nH2O →(H⁺, t°) nC6H12O6 (glucozơ). Tinh bột chỉ chứa các gốc α-glucozơ.',
    hint: 'Monosaccarit duy nhất.'
  },
  {
    id: 32,
    category: 'starch',
    type: 'multiple-choice',
    difficulty: 3,
    question: 'Thủy phân từng phần tinh bột thu được...',
    options: ['Đextrin và mantozơ', 'Chỉ glucozơ', 'Saccarozơ', 'Fructozơ và glucozơ'],
    correctAnswer: 'Đextrin và mantozơ',
    explanation: 'Thủy phân từng phần: Tinh bột → đextrin (polisaccarit ngắn hơn) → mantozơ (C12H22O11) → glucozơ. Đây là quá trình xảy ra khi nhai cơm.',
    hint: 'Sản phẩm trung gian.'
  },
  {
    id: 33,
    category: 'starch',
    type: 'fill-blank',
    difficulty: 2,
    question: 'Tinh bột có nhiều trong các loại hạt như lúa, ngô, khoai, sắn. Trong gạo, hàm lượng tinh bột khoảng...%.',
    correctAnswer: '80',
    acceptedAnswers: ['80', '80%', 'khoảng 80', '75-80', '80 %'],
    explanation: 'Gạo chứa khoảng 75-80% tinh bột. Đây là nguồn năng lượng chính trong khẩu phần ăn của người Việt Nam.',
    hint: 'Hàm lượng cao nhất trong các loại hạt.'
  },
  {
    id: 34,
    category: 'starch',
    type: 'multiple-choice',
    difficulty: 1,
    question: 'Tinh bột KHÔNG tan trong...',
    options: ['Nước lạnh', 'Nước nóng', 'Dung dịch axit loãng nóng', 'Dung dịch kiềm loãng'],
    correctAnswer: 'Nước lạnh',
    explanation: 'Tinh bột không tan trong nước lạnh, chỉ tan trong nước nóng tạo hồ tinh bột (dung dịch keo).',
    hint: 'Tính chất vật lý của tinh bột.'
  },
  {
    id: 35,
    category: 'starch',
    type: 'multiple-choice',
    difficulty: 3,
    question: 'Trong cơ thể người, tinh bột được thủy phân bởi enzim...',
    options: ['Amilaza', 'Lipaza', 'Proteaza', 'Mantaza'],
    correctAnswer: 'Amilaza',
    explanation: 'Enzim amilaza (trong nước bọt và dịch tụy) thủy phân tinh bột thành mantozơ. Mantaza sau đó chuyển mantozơ thành glucozơ.',
    hint: 'Enzim trong nước bọt.'
  },
  {
    id: 36,
    category: 'starch',
    type: 'fill-blank',
    difficulty: 3,
    question: 'Thủy phân 162g tinh bột với hiệu suất 75%, thu được bao nhiêu gam glucozơ?',
    correctAnswer: '135',
    acceptedAnswers: ['135', '135g', '135 gam'],
    explanation: '(C6H10O5)n + nH2O → nC6H12O6. n(gốc glucozơ) = 162/162 = 1 mol → m(glucozơ) = 180 × 0,75 = 135g.',
    hint: 'Áp dụng hiệu suất vào khối lượng sản phẩm.'
  },

  // ========== XENLULOZƠ (12 câu) ==========
  {
    id: 37,
    category: 'cellulose',
    type: 'multiple-choice',
    difficulty: 1,
    question: 'Xenlulozơ là thành phần chính của...',
    options: ['Bông, gỗ, tre, nứa', 'Khoai, sắn', 'Mía, củ cải', 'Sữa động vật'],
    correctAnswer: 'Bông, gỗ, tre, nứa',
    explanation: 'Xenlulozơ là polisaccarit cấu trúc, là thành phần chính của vách tế bào thực vật. Bông chứa khoảng 98% xenlulozơ.',
    hint: 'Polisaccarit cấu trúc thực vật.'
  },
  {
    id: 38,
    category: 'cellulose',
    type: 'multiple-choice',
    difficulty: 1,
    question: 'Công thức chung của xenlulozơ là...',
    options: ['(C6H10O5)n', 'C6H12O6', 'C12H22O11', '(C6H12O6)n'],
    correctAnswer: '(C6H10O5)n',
    explanation: 'Xenlulozơ có công thức (C6H10O5)n với n rất lớn (10.000-14.000). Công thức này giống tinh bột nhưng cấu trúc khác nhau.',
    hint: 'Công thức giống tinh bột.'
  },
  {
    id: 39,
    category: 'cellulose',
    type: 'multiple-choice',
    difficulty: 2,
    question: 'Xenlulozơ khác tinh bột ở điểm nào?',
    options: ['Cấu tạo từ các gốc β-glucozơ', 'Công thức phân tử', 'Sản phẩm thủy phân', 'Đều tan trong nước nóng'],
    correctAnswer: 'Cấu tạo từ các gốc β-glucozơ',
    explanation: 'Xenlulozơ cấu tạo từ các gốc β-glucozơ (tinh bột là α-glucozơ). Liên kết β-1,4-glicozit tạo mạch thẳng, không xoắn.',
    hint: 'Khác nhau về cấu hình của gốc glucozơ.'
  },
  {
    id: 40,
    category: 'cellulose',
    type: 'multiple-choice',
    difficulty: 2,
    question: 'Xenlulozơ tác dụng với HNO3 đặc/H2SO4 đặc tạo ra...',
    options: ['Xenlulozơ trinitrat', 'Xenlulozơ axetat', 'Glucozơ', 'Tinh bột'],
    correctAnswer: 'Xenlulozơ trinitrat',
    explanation: '[C6H7O2(OH)3]n + 3nHNO3 →(H2SO4 đặc) [C6H7O2(ONO2)3]n + 3nH2O. Xenlulozơ trinitrat là thuốc nổ (thuốc súng không khói).',
    hint: 'Phản ứng este hóa với axit nitric.'
  },
  {
    id: 41,
    category: 'cellulose',
    type: 'multiple-choice',
    difficulty: 2,
    question: 'Xenlulozơ trinitrat (thuốc súng không khói) có công thức là...',
    options: ['[C6H7O2(ONO2)3]n', '[C6H7O2(OH)3]n', '[C6H7O2(OCOCH3)3]n', 'C6H12O6'],
    correctAnswer: '[C6H7O2(ONO2)3]n',
    explanation: 'Xenlulozơ trinitrat được điều chế khi cho xenlulozơ tác dụng với HNO3 đặc/H2SO4 đặc. Đây là chất nổ quan trọng.',
    hint: '3 nhóm -OH được thay bằng 3 nhóm -ONO2.'
  },
  {
    id: 42,
    category: 'cellulose',
    type: 'multiple-choice',
    difficulty: 2,
    question: 'Tơ axetat được điều chế từ xenlulozơ bằng phản ứng với...',
    options: ['Anhiđrit axetic (CH3CO)2O', 'Axit axetic CH3COOH', 'Axit nitric HNO3', 'Axit sunfuric H2SO4'],
    correctAnswer: 'Anhiđrit axetic (CH3CO)2O',
    explanation: 'Xenlulozơ + (CH3CO)2O → Xenlulozơ triaxetat [C6H7O2(OCOCH3)3]n. Tơ axetat là tơ bán tổng hợp (tơ nhân tạo).',
    hint: 'Phản ứng với chất chứa nhóm axetyl.'
  },
  {
    id: 43,
    category: 'cellulose',
    type: 'multiple-choice',
    difficulty: 1,
    question: 'Xenlulozơ KHÔNG tan trong...',
    options: ['Nước và các dung môi hữu cơ thông thường', 'Nước Svayde (Cu(OH)2/NH3)', 'Dung dịch HNO3 đặc', 'Dung dịch H2SO4 đặc'],
    correctAnswer: 'Nước và các dung môi hữu cơ thông thường',
    explanation: 'Xenlulozơ không tan trong nước và hầu hết dung môi hữu cơ do cấu trúc mạch thẳng, liên kết hiđro bền chặt giữa các mạch.',
    hint: 'Tính chất vật lý của xenlulozơ.'
  },
  {
    id: 44,
    category: 'cellulose',
    type: 'multiple-choice',
    difficulty: 3,
    question: 'Xenlulozơ tan được trong dung dịch nào?',
    options: ['Nước Svayde [Cu(OH)2/NH3]', 'Nước cất', 'Etanol', 'Benzen'],
    correctAnswer: 'Nước Svayde [Cu(OH)2/NH3]',
    explanation: 'Xenlulozơ tan trong nước Svayde (dung dịch Cu(OH)2 trong NH3 đặc) tạo dung dịch nhớt dùng để kéo sợi tơ visco.',
    hint: 'Dung môi đặc biệt chứa đồng.'
  },
  {
    id: 45,
    category: 'cellulose',
    type: 'multiple-choice',
    difficulty: 2,
    question: 'Xenlulozơ KHÔNG có phản ứng tráng bạc vì...',
    options: ['Không có nhóm -CHO tự do', 'Là chất rắn', 'Không tan trong nước', 'Có khối lượng phân tử lớn'],
    correctAnswer: 'Không có nhóm -CHO tự do',
    explanation: 'Trong phân tử xenlulozơ, các nhóm -CHO đã tham gia liên kết glicozit nên xenlulozơ không có tính khử, không tráng bạc.',
    hint: 'Giống saccarozơ.'
  },
  {
    id: 46,
    category: 'cellulose',
    type: 'multiple-choice',
    difficulty: 2,
    question: 'Thủy phân hoàn toàn xenlulozơ thu được...',
    options: ['Glucozơ', 'Fructozơ', 'Saccarozơ', 'Mantozơ'],
    correctAnswer: 'Glucozơ',
    explanation: 'Thủy phân hoàn toàn: (C6H10O5)n + nH2O →(H⁺, t°) nC6H12O6 (glucozơ). Xenlulozơ chỉ chứa các gốc β-glucozơ.',
    hint: 'Giống tinh bột.'
  },
  {
    id: 47,
    category: 'cellulose',
    type: 'fill-blank',
    difficulty: 3,
    question: 'Trong bông tự nhiên, hàm lượng xenlulozơ khoảng...%.',
    correctAnswer: '98',
    acceptedAnswers: ['98', '98%', 'khoảng 98', '95-98', '98 %'],
    explanation: 'Bông tự nhiên chứa khoảng 95-98% xenlulozơ, là nguồn nguyên liệu quan trọng trong công nghiệp dệt.',
    hint: 'Hàm lượng rất cao.'
  },
  {
    id: 48,
    category: 'cellulose',
    type: 'multiple-choice',
    difficulty: 3,
    question: 'Tơ visco được điều chế từ xenlulozơ theo quy trình nào?',
    options: ['Hòa tan trong nước Svayde rồi ép qua lỗ nhỏ vào dung dịch axit', 'Đun nóng xenlulozơ với HNO3', 'Trùng hợp các phân tử glucozơ', 'Nhiệt phân xenlulozơ'],
    correctAnswer: 'Hòa tan trong nước Svayde rồi ép qua lỗ nhỏ vào dung dịch axit',
    explanation: 'Xenlulozơ tan trong nước Svayde tạo dung dịch nhớt, ép qua lỗ nhỏ vào dung dịch axit loãng sẽ tái tạo xenlulozơ dạng sợi (tơ visco).',
    hint: 'Quy trình sản xuất tơ nhân tạo.'
  }
];

// ================== PROGRESS WATERMARK ==================
function ProgressWatermark({ categoryProgress, challenges }) {
  const completedCount = Object.values(categoryProgress).filter(p => p >= 80).length;
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
          const questionsCompleted = Math.round((percentage / 100) * total);
          return (
            <div key={cat.id} className={`watermark-item ${isComplete ? 'completed' : ''}`}>
              <div className="watermark-icon" style={{ backgroundColor: isComplete ? '#10b981' : cat.color }}>
                <Icon className="w-4 h-4 text-white" />
                {isComplete && <div className="complete-badge">✓</div>}
              </div>
              <div className="watermark-info">
                <div className="watermark-name">{cat.name}</div>
                <div className="watermark-progress-bar">
                  <div className="watermark-progress-fill" style={{ width: `${percentage}%`, backgroundColor: isComplete ? '#10b981' : cat.color }} />
                </div>
                <div className="watermark-stats">
                  <span className="watermark-percentage">{percentage}%</span>
                  <span className="watermark-count">{questionsCompleted}/{total}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div className="watermark-total">
        <div className="total-label">Tổng tiến độ:</div>
        <div className="total-progress-bar">
          <div className="total-progress-fill" style={{ width: `${Math.round((completedCount / CATEGORIES.length) * 100)}%` }} />
        </div>
        <div className="total-stats">
          {completedCount}/{CATEGORIES.length} chủ đề ({Math.round((completedCount / CATEGORIES.length) * 100)}%)
        </div>
      </div>
    </div>
  );
}

// Hàm xáo trộn mảng (Fisher-Yates shuffle)
const shuffleArray = (array) => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

const Bai02_Cacbohidrat = () => {
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
  const [categoryProgress, setCategoryProgress] = useState({});
  const [highScore, setHighScore] = useState(0);
  const [hasStartedNewGame, setHasStartedNewGame] = useState(false);
  const [gameInProgress, setGameInProgress] = useState(false);
  const [totalCorrectAnswers, setTotalCorrectAnswers] = useState(0);
  const [totalScore, setTotalScore] = useState(0);
  const [shuffledQuestions, setShuffledQuestions] = useState([]); // Câu hỏi đã xáo trộn

  const { hasProgress, savedProgress, saveProgress, clearProgress, completeChallenge } = useChallengeProgress('cacbohidrat_12', {
    challengeId: 2,
    programId: 'chemistry',
    grade: 12
  });

  // States for completion tracking
  const [startTime] = useState(() => Date.now());
  const [isCompleted, setIsCompleted] = useState(false);

  // Sử dụng câu hỏi đã xáo trộn thay vì filter trực tiếp
  const filteredQuestions = shuffledQuestions.length > 0 
    ? shuffledQuestions 
    : (activeCategory ? CHALLENGES.filter(q => q.category === activeCategory) : []);

  const currentQuestion = filteredQuestions[currentQuestionIndex];

  // Load saved progress
  useEffect(() => {
    if (savedProgress && !hasStartedNewGame && !gameInProgress) {
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
      
      if (savedProgress.category && !showResult && !activeCategory) {
        setShowResumeDialog(true);
      }
    }
  }, [savedProgress, showResult, activeCategory, hasStartedNewGame, gameInProgress]);

  const handleResume = () => {
    if (savedProgress) {
      const { category, index, currentScore, currentStreak, savedCategoryProgress, savedHighScore, savedTotalCorrectAnswers, savedTotalScore, savedShuffledQuestions } = savedProgress;
      setActiveCategory(category);
      setCurrentQuestionIndex(index || 0);
      setScore(currentScore || 0);
      setStreak(currentStreak || 0);
      setCategoryProgress(savedCategoryProgress || {});
      setHighScore(savedHighScore || 0);
      setTotalCorrectAnswers(savedTotalCorrectAnswers || 0);
      setTotalScore(savedTotalScore || 0);
      // Khôi phục câu hỏi đã xáo trộn nếu có, nếu không thì xáo trộn mới
      if (savedShuffledQuestions && savedShuffledQuestions.length > 0) {
        setShuffledQuestions(savedShuffledQuestions);
      } else {
        const categoryQuestions = CHALLENGES.filter(q => q.category === category);
        setShuffledQuestions(shuffleArray(categoryQuestions));
      }
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
    setHasStartedNewGame(true);
    setTotalCorrectAnswers(0);
    setTotalScore(0);
    setCategoryProgress({});
    setIsCompleted(false);
    setGameInProgress(false);
    setShuffledQuestions([]); // Reset câu hỏi đã xáo trộn
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
    // Xáo trộn câu hỏi mỗi lần chọn chủ đề
    const categoryQuestions = CHALLENGES.filter(q => q.category === categoryId);
    const shuffled = shuffleArray(categoryQuestions);
    setShuffledQuestions(shuffled);
    
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
      savedTotalScore: totalScore,
      savedShuffledQuestions: shuffledQuestions // Lưu câu hỏi đã xáo trộn
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
    
    const newCategoryProgress = {
      ...categoryProgress,
      [activeCategory]: Math.max(categoryProgress[activeCategory] || 0, percentage)
    };
    const completedCount = Object.values(newCategoryProgress).filter(p => p >= 80).length;
    const newHighScore = Math.max(highScore, score);
    const newTotalCorrectAnswers = totalCorrectAnswers + categoryCorrectAnswers;
    const newTotalScore = totalScore + score;
    
    setCategoryProgress(newCategoryProgress);
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
    <div className="carbo-bg min-h-screen p-4 md:p-8 font-sans">
      <div className="max-w-6xl mx-auto">
        {/* HEADER */}
        <header className="flex items-center justify-between mb-8 bg-white/10 backdrop-blur rounded-2xl p-4 border border-white/20">
          <div className="flex items-center gap-4">
            <Link to="/hoahoc/12" className="p-2 hover:bg-white/10 rounded-full transition-colors text-white">
              <ArrowLeft className="w-6 h-6" />
            </Link>
            <div>
              <h1 className="text-2xl font-bold text-white">
                Cacbohiđrat
              </h1>
              <p className="text-amber-200 text-sm">Hóa học 12 • Chương 2</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 px-4 py-2 bg-yellow-500/20 rounded-full border border-yellow-500/30">
              <Trophy className="w-5 h-5 text-yellow-400" />
              <span className="font-bold text-yellow-200">{score} XP</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-orange-500/20 rounded-full border border-orange-500/30">
              <Flame className="w-5 h-5 text-orange-400" />
              <span className="font-bold text-orange-200">{streak} Chuỗi</span>
            </div>
          </div>
        </header>

        {!activeCategory ? (
          // CATEGORY SELECTION
          <div className="animate-fadeIn">
            <div className="stats-bar-carbo mb-8">
              <div className="stat-item-carbo">
                <CheckCircle2 className="w-5 h-5 text-green-400" />
                <span>Đã hoàn thành: <strong>{Object.values(categoryProgress).filter(p => p >= 80).length}/{CATEGORIES.length}</strong></span>
              </div>
              <div className="stat-item-carbo">
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

            <div className="category-grid-carbo">
              {CATEGORIES.map((cat) => {
                const Icon = cat.icon;
                const catPercentage = categoryProgress[cat.id] || 0;
                const isCompleted = catPercentage >= 80;
                const hasProgress = catPercentage > 0 && catPercentage < 80;
                
                return (
                  <div 
                    key={cat.id}
                    onClick={() => handleCategorySelect(cat.id)}
                    className="category-card-carbo group"
                  >
                    <div className={`category-icon-wrapper-carbo ${isCompleted ? 'bg-green-500/20 text-green-400' : ''}`}
                         style={{ color: isCompleted ? undefined : cat.color }}>
                      <Icon className="w-8 h-8" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-white mb-1 group-hover:text-amber-300 transition-colors">
                        {cat.name}
                      </h3>
                      <p className="text-sm text-amber-200 mb-3">{cat.description}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-semibold px-2 py-1 rounded bg-white/10 text-amber-200">
                          {CHALLENGES.filter(c => c.category === cat.id).length} câu hỏi
                        </span>
                        {isCompleted && <CheckCircle2 className="w-5 h-5 text-green-400" />}
                        {hasProgress && <span className="text-xs font-semibold px-2 py-1 rounded bg-yellow-500/20 text-yellow-300">{catPercentage}%</span>}
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

            <div className="progress-track-carbo mb-6">
              <div 
                className="progress-fill-carbo"
                style={{ width: `${((currentQuestionIndex) / filteredQuestions.length) * 100}%` }}
              />
            </div>

            <div className="question-card-carbo">
              <div className="question-header-carbo">
                <span className={`difficulty-badge-carbo ${
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
                <div className="options-grid-carbo">
                  {currentQuestion.options.map((option, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleAnswerSubmit(option)}
                      disabled={isCorrect !== null}
                      className={`option-btn-carbo ${
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
                      className="flex-1 p-4 bg-white/5 border border-white/20 rounded-xl text-lg text-white focus:border-amber-500 focus:outline-none"
                      onKeyDown={(e) => e.key === 'Enter' && handleAnswerSubmit(selectedAnswer)}
                    />
                    <button
                      onClick={() => handleAnswerSubmit(selectedAnswer)}
                      disabled={!selectedAnswer || isCorrect !== null}
                      className="px-6 py-2 bg-amber-600 text-white rounded-xl font-bold hover:bg-amber-700 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Kiểm tra
                    </button>
                  </div>
                </div>
              )}

              {showExplanation && (
                <div className={`feedback-container-carbo ${isCorrect ? 'feedback-correct' : 'feedback-wrong'}`}>
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
              <p className="text-amber-200 mb-8">Bạn đã hoàn thành chủ đề {CATEGORIES.find(c => c.id === activeCategory)?.name}</p>
              
              <div className="grid grid-cols-3 gap-4 mb-8">
                <div className="p-4 bg-white/5 rounded-2xl border border-white/10">
                  <div className="text-sm text-amber-200 mb-1">Điểm số</div>
                  <div className="text-2xl font-bold text-green-400">{score}</div>
                </div>
                <div className="p-4 bg-white/5 rounded-2xl border border-white/10">
                  <div className="text-sm text-amber-200 mb-1">Đúng</div>
                  <div className="text-2xl font-bold text-amber-400">
                    {Math.min(100, Math.round((score / (filteredQuestions.length * 20)) * 100))}%
                  </div>
                </div>
                <div className="p-4 bg-white/5 rounded-2xl border border-white/10">
                  <div className="text-sm text-amber-200 mb-1">Thời gian</div>
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
                    setShuffledQuestions([]); // Reset câu hỏi đã xáo trộn
                  }}
                  className="flex items-center gap-2 px-6 py-3 bg-amber-600 text-white rounded-xl font-bold hover:bg-amber-700 transition-colors shadow-lg shadow-amber-500/30"
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

export default Bai02_Cacbohidrat;
