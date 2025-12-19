import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowLeft, Trophy, RotateCcw, ChevronRight,
  CheckCircle2, XCircle, Lightbulb, Zap, Award,
  FlaskConical, Egg, Drumstick, Leaf, Apple,
  Clock, Target, AlertTriangle, Flame
} from 'lucide-react';
import useChallengeProgress from '../../../../hooks/useChallengeProgress';
import ResumeDialog from '../../../../components/ResumeDialog';
import './CSS/Bai03_Amin_Aminoaxit_Protein.css';

// ================== DATA - AMIN, AMINO AXIT, PROTEIN ==================
const CATEGORIES = [
  {
    id: 'amin',
    name: 'Amin',
    icon: FlaskConical,
    color: '#0ea5e9',
    description: 'Cấu tạo, tính chất, phân loại amin',
    bgGradient: 'from-sky-500 to-blue-500'
  },
  {
    id: 'aminoaxit',
    name: 'Amino axit',
    icon: Apple,
    color: '#f59e42',
    description: 'Cấu tạo, tính chất, phản ứng amino axit',
    bgGradient: 'from-amber-500 to-orange-500'
  },
  {
    id: 'protein',
    name: 'Protein',
    icon: Drumstick,
    color: '#a21caf',
    description: 'Cấu trúc, vai trò, thủy phân protein',
    bgGradient: 'from-purple-700 to-fuchsia-500'
  }
];

const CHALLENGES = [
  // ========== AMIN (15 câu) ==========
  {
    id: 1,
    category: 'amin',
    type: 'multiple-choice',
    difficulty: 1,
    question: 'Công thức tổng quát của amin no, đơn chức, mạch hở là...',
    options: ['CnH2n+3N (n ≥ 1)', 'CnH2n+1N (n ≥ 1)', 'CnH2n+2N (n ≥ 1)', 'CnH2n-1N (n ≥ 1)'],
    correctAnswer: 'CnH2n+3N (n ≥ 1)',
    explanation: 'Amin no, đơn chức, mạch hở có công thức tổng quát CnH2n+3N với n ≥ 1. Ví dụ: metylamin CH3NH2.',
    hint: 'Tương tự ankan nhưng thay 1 H bằng NH2.'
  },
  {
    id: 2,
    category: 'amin',
    type: 'multiple-choice',
    difficulty: 1,
    question: 'Amin bậc 1 là amin có...',
    options: ['1 nhóm ankyl gắn vào N', '2 nhóm ankyl gắn vào N', '3 nhóm ankyl gắn vào N', 'Không có nhóm ankyl'],
    correctAnswer: '1 nhóm ankyl gắn vào N',
    explanation: 'Amin bậc 1: R-NH2 (1 nhóm ankyl gắn vào N). Bậc 2: R2NH, bậc 3: R3N.',
    hint: 'Bậc = số nhóm ankyl gắn vào N.'
  },
  {
    id: 3,
    category: 'amin',
    type: 'multiple-choice',
    difficulty: 2,
    question: 'Amin có tính bazơ vì...',
    options: ['Có cặp electron tự do trên N', 'Có nhóm -OH', 'Có nhóm -COOH', 'Có liên kết đôi'],
    correctAnswer: 'Có cặp electron tự do trên N',
    explanation: 'Nguyên tử N trong amin có cặp electron tự do, có thể nhận proton (H+), nên amin có tính bazơ.',
    hint: 'Liên quan đến cấu hình electron của N.'
  },
  {
    id: 4,
    category: 'amin',
    type: 'fill-blank',
    difficulty: 2,
    question: 'Amin bậc 2 có công thức tổng quát là ___',
    correctAnswer: 'R2NH',
    acceptedAnswers: ['r2nh', 'R2NH'],
    explanation: 'Amin bậc 2: R2NH (hai nhóm ankyl gắn vào N).',
    hint: 'Có 2 nhóm ankyl.'
  },
  {
    id: 5,
    category: 'amin',
    type: 'multiple-choice',
    difficulty: 3,
    question: 'Anilin (C6H5NH2) là amin thơm vì...',
    options: ['Nhóm NH2 gắn vào vòng benzen', 'Có mùi thơm', 'Có nhóm -OH', 'Có nhóm -COOH'],
    correctAnswer: 'Nhóm NH2 gắn vào vòng benzen',
    explanation: 'Anilin là amin thơm vì nhóm NH2 gắn trực tiếp vào vòng benzen (C6H5-).',
    hint: 'Liên kết với nhân thơm.'
  },
  {
    id: 6,
    category: 'amin',
    type: 'multiple-choice',
    difficulty: 2,
    question: 'Tên gọi của hợp chất CH3-NH-CH3 là...',
    options: ['Đimetylamin', 'Etylamin', 'Metylamin', 'Trimetylamin'],
    correctAnswer: 'Đimetylamin',
    explanation: 'CH3-NH-CH3 có 2 nhóm metyl gắn vào N nên gọi là đimetylamin, là amin bậc 2.',
    hint: 'Đếm số nhóm metyl.'
  },
  {
    id: 7,
    category: 'amin',
    type: 'multiple-choice',
    difficulty: 2,
    question: 'Sắp xếp tính bazơ theo thứ tự tăng dần: C6H5NH2, NH3, CH3NH2, (CH3)2NH',
    options: ['C6H5NH2 < NH3 < CH3NH2 < (CH3)2NH', 'NH3 < C6H5NH2 < CH3NH2 < (CH3)2NH', '(CH3)2NH < CH3NH2 < NH3 < C6H5NH2', 'CH3NH2 < (CH3)2NH < NH3 < C6H5NH2'],
    correctAnswer: 'C6H5NH2 < NH3 < CH3NH2 < (CH3)2NH',
    explanation: 'Anilin yếu nhất do hiệu ứng liên hợp với vòng benzen. Nhóm ankyl đẩy electron làm tăng tính bazơ theo số nhóm ankyl.',
    hint: 'Hiệu ứng +I của nhóm ankyl tăng tính bazơ.'
  },
  {
    id: 8,
    category: 'amin',
    type: 'multiple-choice',
    difficulty: 2,
    question: 'Anilin (C6H5NH2) không làm đổi màu quỳ tím vì...',
    options: ['Tính bazơ rất yếu', 'Tính axit mạnh', 'Không tan trong nước', 'Có tính lưỡng tính'],
    correctAnswer: 'Tính bazơ rất yếu',
    explanation: 'Do hiệu ứng liên hợp -C của nhóm NH2 với vòng benzen, cặp electron tự do của N bị hút mạnh vào vòng benzen, làm giảm tính bazơ.',
    hint: 'Vòng benzen hút electron.'
  },
  {
    id: 9,
    category: 'amin',
    type: 'fill-blank',
    difficulty: 2,
    question: 'Sản phẩm của phản ứng CH3NH2 + HCl là ___',
    correctAnswer: 'CH3NH3Cl',
    acceptedAnswers: ['CH3NH3Cl', 'ch3nh3cl', 'metylamoni clorua', 'metylamin hidroclorua'],
    explanation: 'Amin tác dụng với axit tạo muối: CH3NH2 + HCl → CH3NH3Cl (metylamoni clorua).',
    hint: 'Phản ứng với axit tạo muối.'
  },
  {
    id: 10,
    category: 'amin',
    type: 'multiple-choice',
    difficulty: 3,
    question: 'Đốt cháy hoàn toàn amin no, đơn chức, mạch hở thu được CO2 và H2O với tỉ lệ số mol nCO2 : nH2O là...',
    options: ['< 1', '= 1', '> 1', 'Không xác định'],
    correctAnswer: '< 1',
    explanation: 'Amin no, đơn chức CnH2n+3N khi đốt: nH2O > nCO2 do số H > 2×số C, nên tỉ lệ nCO2/nH2O < 1.',
    hint: 'So sánh số H và C trong công thức.'
  },
  {
    id: 11,
    category: 'amin',
    type: 'multiple-choice',
    difficulty: 3,
    question: 'Amin nào sau đây có đồng phân cis-trans?',
    options: ['Propylamin', 'Không amin nào', 'Metylamin', 'Etylamin'],
    correctAnswer: 'Không amin nào',
    explanation: 'Amin no không có liên kết đôi C=C nên không có đồng phân hình học (cis-trans).',
    hint: 'Đồng phân hình học cần liên kết đôi.'
  },
  {
    id: 12,
    category: 'amin',
    type: 'multiple-choice',
    difficulty: 3,
    question: 'Số đồng phân amin bậc 1 có công thức C4H11N là...',
    options: ['4', '3', '5', '2'],
    correctAnswer: '4',
    explanation: 'Các đồng phân amin bậc 1 C4H11N: CH3CH2CH2CH2NH2 (butylamin), (CH3)2CHCH2NH2 (isobutylamin), CH3CH2CH(NH2)CH3 (sec-butylamin), (CH3)3CNH2 (tert-butylamin).',
    hint: 'Xét các mạch cacbon khác nhau.'
  },
  {
    id: 13,
    category: 'amin',
    type: 'multiple-choice',
    difficulty: 2,
    question: 'Anilin tác dụng với nước brom tạo kết tủa màu...',
    options: ['Trắng', 'Vàng', 'Đỏ nâu', 'Xanh'],
    correctAnswer: 'Trắng',
    explanation: 'Anilin + 3Br2 → C6H2Br3NH2 (2,4,6-tribromanilin) ↓ trắng. Đây là phản ứng đặc trưng để nhận biết anilin.',
    hint: 'Phản ứng thế vào vòng benzen.'
  },
  {
    id: 14,
    category: 'amin',
    type: 'fill-blank',
    difficulty: 3,
    question: 'Phản ứng của amin bậc 1 với HNO2 ở nhiệt độ thường tạo ra ___ và N2',
    correctAnswer: 'ancol',
    acceptedAnswers: ['ancol', 'rượu', 'alcohol'],
    explanation: 'R-NH2 + HNO2 → R-OH + N2↑ + H2O. Amin bậc 1 tác dụng với axit nitrơ tạo ancol và giải phóng khí N2.',
    hint: 'Nhóm -NH2 bị thay thế.'
  },
  {
    id: 15,
    category: 'amin',
    type: 'multiple-choice',
    difficulty: 3,
    question: 'Để phân biệt anilin và phenol, có thể dùng thuốc thử nào?',
    options: ['Dung dịch NaOH', 'Dung dịch HCl', 'Nước brom', 'Dung dịch H2SO4'],
    correctAnswer: 'Dung dịch NaOH',
    explanation: 'Phenol tan trong NaOH (do có tính axit yếu): C6H5OH + NaOH → C6H5ONa + H2O. Anilin không phản ứng với NaOH.',
    hint: 'Dựa vào tính axit-bazơ.'
  },

  // ========== AMINO AXIT (15 câu) ==========
  {
    id: 16,
    category: 'aminoaxit',
    type: 'multiple-choice',
    difficulty: 1,
    question: 'Amino axit là hợp chất hữu cơ chứa đồng thời nhóm...',
    options: ['-NH2 và -COOH', '-OH và -COOH', '-NH2 và -OH', '-COOH và -CHO'],
    correctAnswer: '-NH2 và -COOH',
    explanation: 'Amino axit là hợp chất hữu cơ chứa đồng thời nhóm amino (-NH2) và nhóm cacboxyl (-COOH) trong phân tử.',
    hint: 'Hai nhóm chức quan trọng.'
  },
  {
    id: 17,
    category: 'aminoaxit',
    type: 'multiple-choice',
    difficulty: 2,
    question: 'Axit aminoaxetic (glyxin) có công thức là...',
    options: ['NH2CH2COOH', 'CH3COOH', 'NH2CH2CH2COOH', 'C6H5NH2'],
    correctAnswer: 'NH2CH2COOH',
    explanation: 'Axit aminoaxetic (glyxin, ký hiệu Gly) có công thức NH2CH2COOH, là amino axit đơn giản nhất.',
    hint: 'Amino axit đơn giản nhất.'
  },
  {
    id: 18,
    category: 'aminoaxit',
    type: 'multiple-choice',
    difficulty: 2,
    question: 'Amino axit có tính lưỡng tính vì...',
    options: ['Có cả nhóm -NH2 (bazơ) và -COOH (axit)', 'Có nhóm -OH', 'Có vòng benzen', 'Có nhóm -CHO'],
    correctAnswer: 'Có cả nhóm -NH2 (bazơ) và -COOH (axit)',
    explanation: 'Amino axit có tính lưỡng tính vì trong phân tử có cả nhóm -NH2 (tính bazơ) và -COOH (tính axit).',
    hint: 'Hai nhóm chức đối lập.'
  },
  {
    id: 19,
    category: 'aminoaxit',
    type: 'fill-blank',
    difficulty: 2,
    question: 'Phản ứng đặc trưng của amino axit là phản ứng tạo ___',
    correctAnswer: 'peptit',
    acceptedAnswers: ['peptit', 'peptide'],
    explanation: 'Amino axit có thể trùng ngưng tạo liên kết peptit: -COOH + -NH2 → -CO-NH- (liên kết peptit).',
    hint: 'Liên kết -CO-NH-.'
  },
  {
    id: 20,
    category: 'aminoaxit',
    type: 'multiple-choice',
    difficulty: 3,
    question: 'Dung dịch glyxin (H2N-CH2-COOH) làm quỳ tím...',
    options: ['Không đổi màu', 'Hóa xanh', 'Hóa đỏ', 'Hóa vàng'],
    correctAnswer: 'Không đổi màu',
    explanation: 'Glyxin có 1 nhóm -NH2 và 1 nhóm -COOH, tính axit và bazơ cân bằng nhau nên không làm đổi màu quỳ tím.',
    hint: 'Lưỡng tính cân bằng.'
  },
  {
    id: 21,
    category: 'aminoaxit',
    type: 'multiple-choice',
    difficulty: 2,
    question: 'Alanin có công thức cấu tạo là...',
    options: ['CH3CH(NH2)COOH', 'NH2CH2COOH', 'NH2CH2CH2COOH', 'C6H5CH(NH2)COOH'],
    correctAnswer: 'CH3CH(NH2)COOH',
    explanation: 'Alanin (Ala) có công thức CH3CH(NH2)COOH, là α-amino axit có nhóm metyl.',
    hint: 'Có thêm nhóm CH3.'
  },
  {
    id: 22,
    category: 'aminoaxit',
    type: 'multiple-choice',
    difficulty: 2,
    question: 'Amino axit nào sau đây làm quỳ tím hóa xanh?',
    options: ['Lysin (có 2 nhóm -NH2)', 'Glyxin', 'Alanin', 'Axit glutamic'],
    correctAnswer: 'Lysin (có 2 nhóm -NH2)',
    explanation: 'Lysin có 2 nhóm -NH2 và 1 nhóm -COOH, tính bazơ trội hơn nên làm quỳ tím hóa xanh.',
    hint: 'Số nhóm -NH2 nhiều hơn -COOH.'
  },
  {
    id: 23,
    category: 'aminoaxit',
    type: 'multiple-choice',
    difficulty: 2,
    question: 'Amino axit nào sau đây làm quỳ tím hóa đỏ?',
    options: ['Axit glutamic (có 2 nhóm -COOH)', 'Glyxin', 'Alanin', 'Lysin'],
    correctAnswer: 'Axit glutamic (có 2 nhóm -COOH)',
    explanation: 'Axit glutamic (Glu) có 1 nhóm -NH2 và 2 nhóm -COOH, tính axit trội hơn nên làm quỳ tím hóa đỏ.',
    hint: 'Số nhóm -COOH nhiều hơn -NH2.'
  },
  {
    id: 24,
    category: 'aminoaxit',
    type: 'fill-blank',
    difficulty: 2,
    question: 'Sản phẩm của glyxin với NaOH là ___',
    correctAnswer: 'NH2CH2COONa',
    acceptedAnswers: ['NH2CH2COONa', 'nh2ch2coona', 'natri glyxinat', 'muối natri của glyxin'],
    explanation: 'NH2CH2COOH + NaOH → NH2CH2COONa + H2O. Nhóm -COOH phản ứng với NaOH tạo muối.',
    hint: 'Phản ứng của nhóm -COOH.'
  },
  {
    id: 25,
    category: 'aminoaxit',
    type: 'fill-blank',
    difficulty: 2,
    question: 'Sản phẩm của glyxin với HCl là ___',
    correctAnswer: 'ClH3NCH2COOH',
    acceptedAnswers: ['ClH3NCH2COOH', 'clh3nch2cooh', 'NH3ClCH2COOH', 'glyxin hidroclorua'],
    explanation: 'NH2CH2COOH + HCl → ClH3N+CH2COOH. Nhóm -NH2 phản ứng với HCl tạo muối.',
    hint: 'Phản ứng của nhóm -NH2.'
  },
  {
    id: 26,
    category: 'aminoaxit',
    type: 'multiple-choice',
    difficulty: 3,
    question: 'Amino axit tồn tại ở dạng nào trong dung dịch?',
    options: ['Ion lưỡng cực (zwitterion)', 'Phân tử trung hòa', 'Cation', 'Anion'],
    correctAnswer: 'Ion lưỡng cực (zwitterion)',
    explanation: 'Trong dung dịch, amino axit tồn tại chủ yếu ở dạng ion lưỡng cực: H3N+-CHR-COO- do sự chuyển proton nội phân tử.',
    hint: 'Proton chuyển từ -COOH sang -NH2.'
  },
  {
    id: 27,
    category: 'aminoaxit',
    type: 'multiple-choice',
    difficulty: 3,
    question: 'Số đồng phân amino axit có công thức C3H7NO2 là...',
    options: ['2', '1', '3', '4'],
    correctAnswer: '2',
    explanation: 'C3H7NO2 có 2 đồng phân: CH3CH(NH2)COOH (alanin) và H2NCH2CH2COOH (β-alanin).',
    hint: 'Vị trí nhóm -NH2 khác nhau.'
  },
  {
    id: 28,
    category: 'aminoaxit',
    type: 'multiple-choice',
    difficulty: 3,
    question: 'α-amino axit thiên nhiên đều có đặc điểm chung là...',
    options: ['Nhóm -NH2 ở vị trí α (carbon kế cận -COOH)', 'Nhóm -NH2 ở vị trí β', 'Không có đặc điểm chung', 'Có vòng thơm'],
    correctAnswer: 'Nhóm -NH2 ở vị trí α (carbon kế cận -COOH)',
    explanation: 'Các amino axit thiên nhiên cấu tạo nên protein đều là α-amino axit, với nhóm -NH2 gắn vào carbon α (carbon liền kề nhóm -COOH).',
    hint: 'Vị trí carbon α.'
  },
  {
    id: 29,
    category: 'aminoaxit',
    type: 'multiple-choice',
    difficulty: 3,
    question: 'Phản ứng este hóa của glyxin với ancol etylic (xúc tác HCl khan) tạo ra sản phẩm là...',
    options: ['H2NCH2COOC2H5', 'C2H5OOCCH2NH2', 'ClH3NCH2COOC2H5', 'Cả A và C'],
    correctAnswer: 'ClH3NCH2COOC2H5',
    explanation: 'Trong môi trường HCl khan, nhóm -NH2 bị proton hóa: H2NCH2COOH + C2H5OH + HCl → ClH3N+CH2COOC2H5 + H2O',
    hint: 'HCl khan vừa làm xúc tác vừa phản ứng.'
  },
  {
    id: 30,
    category: 'aminoaxit',
    type: 'fill-blank',
    difficulty: 3,
    question: 'Số liên kết peptit trong tripeptit là ___',
    correctAnswer: '2',
    acceptedAnswers: ['2', 'hai'],
    explanation: 'Tripeptit gồm 3 gốc amino axit liên kết bằng 2 liên kết peptit: AA1-CO-NH-AA2-CO-NH-AA3.',
    hint: 'Số liên kết = số gốc - 1.'
  },

  // ========== PROTEIN (15 câu) ==========
  {
    id: 31,
    category: 'protein',
    type: 'multiple-choice',
    difficulty: 1,
    question: 'Protein là polipeptit cao phân tử gồm nhiều gốc...',
    options: ['Amino axit', 'Amin', 'Ancol', 'Axit béo'],
    correctAnswer: 'Amino axit',
    explanation: 'Protein là polipeptit cao phân tử, được tạo thành từ nhiều gốc amino axit liên kết với nhau qua liên kết peptit.',
    hint: 'Đơn phân là amino axit.'
  },
  {
    id: 32,
    category: 'protein',
    type: 'multiple-choice',
    difficulty: 2,
    question: 'Thủy phân hoàn toàn protein thu được...',
    options: ['Hỗn hợp các amino axit', 'Amin', 'Ancol', 'Axit béo'],
    correctAnswer: 'Hỗn hợp các amino axit',
    explanation: 'Thủy phân hoàn toàn protein (trong môi trường axit hoặc bazơ hoặc enzim) thu được hỗn hợp các α-amino axit.',
    hint: 'Đơn phân của protein.'
  },
  {
    id: 33,
    category: 'protein',
    type: 'multiple-choice',
    difficulty: 2,
    question: 'Protein có vai trò gì trong cơ thể sống?',
    options: ['Cấu trúc, xúc tác, vận chuyển', 'Chỉ cung cấp năng lượng', 'Chỉ dự trữ', 'Chỉ bảo vệ'],
    correctAnswer: 'Cấu trúc, xúc tác, vận chuyển',
    explanation: 'Protein có nhiều vai trò: cấu trúc tế bào, xúc tác (enzim), vận chuyển (hemoglobin), bảo vệ (kháng thể), điều hòa (hormone).',
    hint: 'Nhiều vai trò sinh học.'
  },
  {
    id: 34,
    category: 'protein',
    type: 'fill-blank',
    difficulty: 2,
    question: 'Liên kết đặc trưng trong phân tử protein là liên kết ___',
    correctAnswer: 'peptit',
    acceptedAnswers: ['peptit', 'peptide'],
    explanation: 'Liên kết peptit (-CO-NH-) là liên kết đặc trưng nối các gốc amino axit trong protein.',
    hint: 'Liên kết -CO-NH-.'
  },
  {
    id: 35,
    category: 'protein',
    type: 'multiple-choice',
    difficulty: 3,
    question: 'Enzim là loại protein có vai trò...',
    options: ['Xúc tác sinh học', 'Vận chuyển', 'Bảo vệ', 'Điều hòa'],
    correctAnswer: 'Xúc tác sinh học',
    explanation: 'Enzim là protein có vai trò xúc tác sinh học, tăng tốc độ các phản ứng hóa học trong cơ thể lên hàng triệu lần.',
    hint: 'Tăng tốc phản ứng sinh hóa.'
  },
  {
    id: 36,
    category: 'protein',
    type: 'multiple-choice',
    difficulty: 1,
    question: 'Phản ứng biure là phản ứng của protein với...',
    options: ['Cu(OH)2 trong môi trường kiềm', 'HNO3 đặc', 'NaOH', 'Nước brom'],
    correctAnswer: 'Cu(OH)2 trong môi trường kiềm',
    explanation: 'Phản ứng biure: Protein + Cu(OH)2 → phức màu tím đặc trưng. Đây là phản ứng nhận biết protein có từ 2 liên kết peptit trở lên.',
    hint: 'Tạo phức màu tím.'
  },
  {
    id: 37,
    category: 'protein',
    type: 'multiple-choice',
    difficulty: 2,
    question: 'Khi nhỏ HNO3 đặc vào lòng trắng trứng, hiện tượng xảy ra là...',
    options: ['Xuất hiện màu vàng', 'Xuất hiện màu tím', 'Không có hiện tượng', 'Xuất hiện màu xanh'],
    correctAnswer: 'Xuất hiện màu vàng',
    explanation: 'HNO3 đặc phản ứng với vòng benzen trong các amino axit thơm (như tyrosin, phenylalanin) tạo hợp chất nitro có màu vàng.',
    hint: 'Phản ứng xanthoprotein.'
  },
  {
    id: 38,
    category: 'protein',
    type: 'fill-blank',
    difficulty: 2,
    question: 'Số amino axit tối thiểu để tạo thành một chuỗi polipeptit gọi là protein là khoảng ___',
    correctAnswer: '50',
    acceptedAnswers: ['50', '50 amino axit', 'năm mươi'],
    explanation: 'Protein thường chứa từ 50 amino axit trở lên. Chuỗi ngắn hơn gọi là oligopeptit hoặc polipeptit.',
    hint: 'Con số hàng chục.'
  },
  {
    id: 39,
    category: 'protein',
    type: 'multiple-choice',
    difficulty: 2,
    question: 'Hiện tượng protein bị biến tính xảy ra khi...',
    options: ['Đun nóng, thêm axit, kiềm mạnh hoặc muối kim loại nặng', 'Chỉ khi đun nóng', 'Chỉ khi thêm nước', 'Không có hiện tượng gì'],
    correctAnswer: 'Đun nóng, thêm axit, kiềm mạnh hoặc muối kim loại nặng',
    explanation: 'Protein bị biến tính (mất cấu trúc không gian) khi đun nóng, gặp axit/kiềm mạnh, muối kim loại nặng, tia UV... làm mất hoạt tính sinh học.',
    hint: 'Nhiều tác nhân gây biến tính.'
  },
  {
    id: 40,
    category: 'protein',
    type: 'multiple-choice',
    difficulty: 3,
    question: 'Hemoglobin là protein có chức năng...',
    options: ['Vận chuyển O2 và CO2', 'Xúc tác phản ứng', 'Bảo vệ cơ thể', 'Điều hòa hoạt động'],
    correctAnswer: 'Vận chuyển O2 và CO2',
    explanation: 'Hemoglobin (huyết sắc tố) là protein trong hồng cầu, có chức năng vận chuyển O2 từ phổi đến các mô và CO2 từ mô về phổi.',
    hint: 'Có trong hồng cầu.'
  },
  {
    id: 41,
    category: 'protein',
    type: 'multiple-choice',
    difficulty: 2,
    question: 'Cấu trúc bậc 1 của protein được quy định bởi...',
    options: ['Trình tự sắp xếp các amino axit', 'Liên kết hidro', 'Liên kết disunfua', 'Tương tác kỵ nước'],
    correctAnswer: 'Trình tự sắp xếp các amino axit',
    explanation: 'Cấu trúc bậc 1 là trình tự (thứ tự) sắp xếp các amino axit trong chuỗi polipeptit, được liên kết bằng liên kết peptit.',
    hint: 'Chuỗi amino axit.'
  },
  {
    id: 42,
    category: 'protein',
    type: 'multiple-choice',
    difficulty: 3,
    question: 'Cấu trúc bậc 2 của protein được ổn định chủ yếu nhờ...',
    options: ['Liên kết hidro', 'Liên kết peptit', 'Liên kết ion', 'Liên kết cộng hóa trị'],
    correctAnswer: 'Liên kết hidro',
    explanation: 'Cấu trúc bậc 2 (xoắn α, gấp nếp β) được ổn định chủ yếu nhờ liên kết hidro giữa các nhóm C=O và N-H của liên kết peptit.',
    hint: 'Liên kết yếu nhưng nhiều.'
  },
  {
    id: 43,
    category: 'protein',
    type: 'fill-blank',
    difficulty: 3,
    question: 'Số liên kết peptit trong một polipeptit có n gốc amino axit là ___',
    correctAnswer: 'n-1',
    acceptedAnswers: ['n-1', 'n - 1', '(n-1)'],
    explanation: 'Một polipeptit có n gốc amino axit sẽ có (n-1) liên kết peptit nối các gốc lại với nhau.',
    hint: 'Giống số đoạn nối.'
  },
  {
    id: 44,
    category: 'protein',
    type: 'multiple-choice',
    difficulty: 3,
    question: 'Phản ứng màu biure dương tính với hợp chất nào sau đây?',
    options: ['Tripeptit trở lên', 'Đipeptit', 'Amino axit', 'Amin'],
    correctAnswer: 'Tripeptit trở lên',
    explanation: 'Phản ứng biure cần ít nhất 2 liên kết peptit (-CO-NH-) liền kề, nên chỉ tripeptit trở lên mới cho phản ứng dương tính.',
    hint: 'Cần ít nhất 2 liên kết peptit.'
  },
  {
    id: 45,
    category: 'protein',
    type: 'multiple-choice',
    difficulty: 3,
    question: 'Protein nào sau đây thuộc loại protein đơn giản?',
    options: ['Albumin (lòng trắng trứng)', 'Hemoglobin', 'Nucleoprotein', 'Glycoprotein'],
    correctAnswer: 'Albumin (lòng trắng trứng)',
    explanation: 'Albumin là protein đơn giản chỉ chứa amino axit. Hemoglobin, nucleoprotein, glycoprotein là protein phức tạp có thêm nhóm ngoại (hem, axit nucleic, cacbohidrat).',
    hint: 'Chỉ chứa amino axit.'
  }
];

const Bai03_Amin_Aminoaxit_Protein = () => {
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
  const [completedCategories, setCompletedCategories] = useState([]);
  const [highScore, setHighScore] = useState(0);
  const [hasStartedNewGame, setHasStartedNewGame] = useState(false);

  const { hasProgress, savedProgress, saveProgress, clearProgress, completeChallenge } = useChallengeProgress('amin_aminoaxit_protein_12', {
    challengeId: 3,
    programId: 'chemistry',
    grade: 12
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
    if (savedProgress && !hasStartedNewGame) {
      if (savedProgress.savedCompletedCategories) {
        setCompletedCategories(savedProgress.savedCompletedCategories);
      }
      if (savedProgress.savedHighScore) {
        setHighScore(savedProgress.savedHighScore);
      }
      
      if (savedProgress.category && !showResult && !activeCategory) {
        setShowResumeDialog(true);
      }
    }
  }, [savedProgress, showResult, activeCategory, hasStartedNewGame]);

  const handleResume = () => {
    if (savedProgress) {
      const { category, index, currentScore, currentStreak, savedCompletedCategories, savedHighScore } = savedProgress;
      setActiveCategory(category);
      setCurrentQuestionIndex(index || 0);
      setScore(currentScore || 0);
      setStreak(currentStreak || 0);
      setCompletedCategories(savedCompletedCategories || []);
      setHighScore(savedHighScore || 0);
      setShowResumeDialog(false);
      setIsTimerActive(true);
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
      const points = Math.round((10 + currentQuestion.difficulty * 5) * (1 + timeLeft / 60));
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
      savedCompletedCategories: completedCategories,
      savedHighScore: highScore
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
    const percentage = Math.round((score / maxScore) * 100);
    
    const newCompletedCategories = percentage >= 80 && !completedCategories.includes(activeCategory)
      ? [...completedCategories, activeCategory]
      : completedCategories;
    const newHighScore = Math.max(highScore, score);
    
    if (percentage >= 80 && !completedCategories.includes(activeCategory)) {
      setCompletedCategories(newCompletedCategories);
    }
    if (score > highScore) {
      setHighScore(newHighScore);
    }
    
    saveProgress({
      savedCompletedCategories: newCompletedCategories,
      savedHighScore: newHighScore
    });

    // Lưu kết quả khi hoàn thành category
    if (!isCompleted) {
      setIsCompleted(true);
      const stars = percentage >= 80 ? 3 : percentage >= 50 ? 2 : 1;
      completeChallenge({
        score,
        maxScore,
        percentage,
        stars,
        timeSpent: Math.floor((Date.now() - startTime) / 1000),
        correctAnswers: Math.round(score / 10),
        totalQuestions: filteredQuestions.length
      });
    }
  };

  if (showResumeDialog) {
    return <ResumeDialog show={true} onResume={handleResume} onRestart={handleRestart} />;
  }

  return (
    <div className="amin-bg min-h-screen p-4 md:p-8 font-sans">
      <div className="max-w-6xl mx-auto">
        {/* HEADER */}
        <header className="flex items-center justify-between mb-8 bg-white/10 backdrop-blur rounded-2xl p-4 border border-white/20">
          <div className="flex items-center gap-4">
            <Link to="/hoahoc/12" className="p-2 hover:bg-white/10 rounded-full transition-colors text-white">
              <ArrowLeft className="w-6 h-6" />
            </Link>
            <div>
              <h1 className="text-2xl font-bold text-white">
                Amin - Amino axit - Protein
              </h1>
              <p className="text-fuchsia-200 text-sm">Hóa học 12 • Chương 3</p>
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
            <div className="stats-bar-amin mb-8">
              <div className="stat-item-amin">
                <CheckCircle2 className="w-5 h-5 text-green-400" />
                <span>Đã hoàn thành: <strong>{completedCategories.length || 0}/{CATEGORIES.length}</strong></span>
              </div>
              <div className="stat-item-amin">
                <Award className="w-5 h-5 text-yellow-400" />
                <span>Điểm cao nhất: <strong>{highScore || 0}</strong></span>
              </div>
            </div>

            <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <Target className="w-6 h-6" />
              Chọn chủ đề thử thách
            </h2>

            <div className="category-grid-amin">
              {CATEGORIES.map((cat) => {
                const Icon = cat.icon;
                const isCompleted = completedCategories.includes(cat.id);
                
                return (
                  <div 
                    key={cat.id}
                    onClick={() => handleCategorySelect(cat.id)}
                    className="category-card-amin group"
                  >
                    <div className={`category-icon-wrapper-amin ${isCompleted ? 'bg-green-500/20 text-green-400' : ''}`}
                         style={{ color: isCompleted ? undefined : cat.color }}>
                      <Icon className="w-8 h-8" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-white mb-1 group-hover:text-fuchsia-300 transition-colors">
                        {cat.name}
                      </h3>
                      <p className="text-sm text-fuchsia-200 mb-3">{cat.description}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-semibold px-2 py-1 rounded bg-white/10 text-fuchsia-200">
                          {CHALLENGES.filter(c => c.category === cat.id).length} câu hỏi
                        </span>
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

            <div className="progress-track-amin mb-6">
              <div 
                className="progress-fill-amin"
                style={{ width: `${((currentQuestionIndex) / filteredQuestions.length) * 100}%` }}
              />
            </div>

            <div className="question-card-amin">
              <div className="question-header-amin">
                <span className={`difficulty-badge-amin ${
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
                <div className="options-grid-amin">
                  {currentQuestion.options.map((option, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleAnswerSubmit(option)}
                      disabled={isCorrect !== null}
                      className={`option-btn-amin ${
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
                      className="flex-1 p-4 bg-white/5 border border-white/20 rounded-xl text-lg text-white focus:border-fuchsia-500 focus:outline-none"
                      onKeyDown={(e) => e.key === 'Enter' && handleAnswerSubmit(selectedAnswer)}
                    />
                    <button
                      onClick={() => handleAnswerSubmit(selectedAnswer)}
                      disabled={!selectedAnswer || isCorrect !== null}
                      className="px-6 py-2 bg-fuchsia-600 text-white rounded-xl font-bold hover:bg-fuchsia-700 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Kiểm tra
                    </button>
                  </div>
                </div>
              )}

              {showExplanation && (
                <div className={`feedback-container-amin ${isCorrect ? 'feedback-correct' : 'feedback-wrong'}`}>
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
              <div className="w-24 h-24 bg-fuchsia-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <Award className="w-12 h-12 text-fuchsia-400" />
              </div>
              
              <h2 className="text-3xl font-bold text-white mb-2">Hoàn thành xuất sắc!</h2>
              <p className="text-fuchsia-200 mb-8">Bạn đã hoàn thành chủ đề {CATEGORIES.find(c => c.id === activeCategory)?.name}</p>
              
              <div className="grid grid-cols-3 gap-4 mb-8">
                <div className="p-4 bg-white/5 rounded-2xl border border-white/10">
                  <div className="text-sm text-fuchsia-200 mb-1">Điểm số</div>
                  <div className="text-2xl font-bold text-green-400">{score}</div>
                </div>
                <div className="p-4 bg-white/5 rounded-2xl border border-white/10">
                  <div className="text-sm text-fuchsia-200 mb-1">Đúng</div>
                  <div className="text-2xl font-bold text-fuchsia-400">
                    {Math.round((score / (filteredQuestions.length * 20)) * 100)}%
                  </div>
                </div>
                <div className="p-4 bg-white/5 rounded-2xl border border-white/10">
                  <div className="text-sm text-fuchsia-200 mb-1">Thời gian</div>
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
                  onClick={() => setActiveCategory(null)}
                  className="flex items-center gap-2 px-6 py-3 bg-fuchsia-600 text-white rounded-xl font-bold hover:bg-fuchsia-700 transition-colors shadow-lg shadow-fuchsia-500/30"
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

export default Bai03_Amin_Aminoaxit_Protein;
