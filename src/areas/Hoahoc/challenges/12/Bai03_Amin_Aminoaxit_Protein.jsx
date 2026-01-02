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

// Static questions data
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
    question: 'Amin có tính bazơ vì...',
    options: ['Có cặp electron tự do trên N', 'Có nhóm -OH', 'Có nhóm -COOH', 'Có liên kết đôi'],
    correctAnswer: 'Có cặp electron tự do trên N',
    explanation: 'Nguyên tử N trong amin có cặp electron tự do, có thể nhận proton (H+), nên amin có tính bazơ.',
    hint: 'Liên quan đến cấu hình electron của N.'
  },
  {
    id: 3,
    category: 'amin',
    type: 'multiple-choice',
    difficulty: 1,
    question: 'Metylamin (CH3NH2) thuộc loại amin bậc mấy?',
    options: ['Bậc 1', 'Bậc 2', 'Bậc 3', 'Bậc 4'],
    correctAnswer: 'Bậc 1',
    explanation: 'Metylamin CH3NH2 có 1 nguyên tử H trong NH3 được thay thế bởi gốc metyl, nên là amin bậc 1.',
    hint: 'Bậc amin = số nguyên tử H trong NH3 bị thay thế bởi gốc hiđrocacbon.'
  },
  {
    id: 4,
    category: 'amin',
    type: 'multiple-choice',
    difficulty: 1,
    question: 'Anilin có công thức phân tử là...',
    options: ['C6H5NH2', 'CH3NH2', 'C2H5NH2', 'C6H5OH'],
    correctAnswer: 'C6H5NH2',
    explanation: 'Anilin là amin thơm đơn giản nhất, có công thức C6H5NH2 (phenylamin).',
    hint: 'Amin thơm có vòng benzen.'
  },
  {
    id: 5,
    category: 'amin',
    type: 'multiple-choice',
    difficulty: 2,
    question: 'So sánh tính bazơ: CH3NH2, (CH3)2NH, (CH3)3N trong dung dịch nước, thứ tự tăng dần là...',
    options: ['(CH3)3N < CH3NH2 < (CH3)2NH', 'CH3NH2 < (CH3)2NH < (CH3)3N', '(CH3)2NH < CH3NH2 < (CH3)3N', 'CH3NH2 < (CH3)3N < (CH3)2NH'],
    correctAnswer: '(CH3)3N < CH3NH2 < (CH3)2NH',
    explanation: 'Trong nước: (CH3)2NH có tính bazơ mạnh nhất do cân bằng giữa hiệu ứng +I của nhóm CH3 và khả năng solvat hóa.',
    hint: 'Amin bậc 2 có tính bazơ mạnh nhất trong nước.'
  },
  {
    id: 6,
    category: 'amin',
    type: 'multiple-choice',
    difficulty: 2,
    question: 'Anilin (C6H5NH2) có tính bazơ yếu hơn metylamin vì...',
    options: ['Cặp electron của N liên hợp với vòng benzen', 'Anilin có khối lượng phân tử lớn hơn', 'Anilin không tan trong nước', 'Anilin có vòng thơm'],
    correctAnswer: 'Cặp electron của N liên hợp với vòng benzen',
    explanation: 'Cặp electron tự do trên N của anilin liên hợp với hệ π của vòng benzen, làm giảm mật độ electron trên N, nên tính bazơ yếu.',
    hint: 'Hiệu ứng liên hợp p-π.'
  },
  {
    id: 7,
    category: 'amin',
    type: 'multiple-choice',
    difficulty: 2,
    question: 'Sản phẩm của phản ứng giữa metylamin với dung dịch HCl là...',
    options: ['CH3NH3Cl', 'CH3Cl + NH3', 'CH3OH + NH4Cl', 'CH3COOH'],
    correctAnswer: 'CH3NH3Cl',
    explanation: 'CH3NH2 + HCl → CH3NH3Cl (metylamoni clorua). Amin phản ứng với axit tạo muối.',
    hint: 'Amin là bazơ, phản ứng với axit tạo muối.'
  },
  {
    id: 8,
    category: 'amin',
    type: 'multiple-choice',
    difficulty: 2,
    question: 'Đimetylamin (CH3)2NH thuộc loại amin...',
    options: ['Bậc 2, no, đơn chức', 'Bậc 1, no, đơn chức', 'Bậc 3, no, đơn chức', 'Bậc 2, thơm, đơn chức'],
    correctAnswer: 'Bậc 2, no, đơn chức',
    explanation: 'Đimetylamin có 2 nhóm CH3 gắn vào N, nên là amin bậc 2, no (không có liên kết bội), đơn chức (1 nhóm -NH-).',
    hint: 'Đếm số gốc hiđrocacbon gắn vào N.'
  },
  {
    id: 9,
    category: 'amin',
    type: 'fill-blank',
    difficulty: 2,
    question: 'Amin bậc 3 đơn giản nhất có công thức là (CH3)3N, tên gọi là...',
    options: [],
    correctAnswer: 'trimetylamin',
    acceptedAnswers: ['trimetylamin', 'tri metyl amin', 'trimethylamine'],
    explanation: 'Trimetylamin (CH3)3N là amin bậc 3 đơn giản nhất, có 3 nhóm metyl gắn vào nguyên tử N.',
    hint: 'Tên = tiền tố "tri" + tên gốc + "amin".'
  },
  {
    id: 10,
    category: 'amin',
    type: 'multiple-choice',
    difficulty: 3,
    question: 'Cho các chất: NH3, CH3NH2, C6H5NH2, (CH3)2NH. Chất có tính bazơ mạnh nhất là...',
    options: ['(CH3)2NH', 'CH3NH2', 'NH3', 'C6H5NH2'],
    correctAnswer: '(CH3)2NH',
    explanation: 'Trong dung dịch nước: (CH3)2NH > CH3NH2 > NH3 > C6H5NH2. Đimetylamin có tính bazơ mạnh nhất do hiệu ứng +I của 2 nhóm CH3.',
    hint: 'So sánh hiệu ứng cảm ứng của các nhóm thế.'
  },
  {
    id: 11,
    category: 'amin',
    type: 'multiple-choice',
    difficulty: 3,
    question: 'Để phân biệt anilin và phenol, có thể dùng...',
    options: ['Dung dịch HCl', 'Dung dịch NaOH', 'Nước brom', 'Kim loại Na'],
    correctAnswer: 'Dung dịch HCl',
    explanation: 'Anilin có tính bazơ yếu, tan trong dung dịch HCl tạo muối. Phenol không phản ứng với HCl loãng.',
    hint: 'Anilin là amin (bazơ), phenol là axit yếu.'
  },
  {
    id: 12,
    category: 'amin',
    type: 'multiple-choice',
    difficulty: 3,
    question: 'Số đồng phân amin bậc 1 có công thức C3H9N là...',
    options: ['2', '1', '3', '4'],
    correctAnswer: '2',
    explanation: 'Có 2 đồng phân amin bậc 1: CH3CH2CH2NH2 (propan-1-amin) và (CH3)2CHNH2 (propan-2-amin).',
    hint: 'Viết các cách sắp xếp mạch cacbon với nhóm -NH2.'
  },
  {
    id: 13,
    category: 'amin',
    type: 'fill-blank',
    difficulty: 2,
    question: 'Phản ứng của amin với axit tạo thành muối được gọi là phản ứng...',
    options: [],
    correctAnswer: 'trung hòa',
    acceptedAnswers: ['trung hòa', 'trung hoà', 'tạo muối'],
    explanation: 'Amin có tính bazơ, phản ứng với axit theo phản ứng trung hòa tạo muối amoni.',
    hint: 'Bazơ + axit → ?'
  },
  {
    id: 14,
    category: 'amin',
    type: 'multiple-choice',
    difficulty: 3,
    question: 'Etylamin tác dụng với HNO2 ở nhiệt độ thường tạo ra...',
    options: ['C2H5OH + N2 + H2O', 'C2H5NO2 + H2O', 'C2H5Cl + N2', 'C2H5ONO + H2'],
    correctAnswer: 'C2H5OH + N2 + H2O',
    explanation: 'Amin bậc 1 + HNO2 → ancol + N2 + H2O. C2H5NH2 + HNO2 → C2H5OH + N2 + H2O.',
    hint: 'Amin bậc 1 với HNO2 giải phóng khí N2.'
  },
  {
    id: 15,
    category: 'amin',
    type: 'multiple-choice',
    difficulty: 3,
    question: 'Cho anilin tác dụng với nước brom dư thu được kết tủa có công thức là...',
    options: ['C6H2Br3NH2', 'C6H5Br', 'C6H4BrNH2', 'C6H3Br2NH2'],
    correctAnswer: 'C6H2Br3NH2',
    explanation: 'Anilin + 3Br2 → C6H2Br3NH2↓ (2,4,6-tribromanilin) + 3HBr. Nhóm -NH2 hoạt hóa vòng benzen mạnh.',
    hint: 'Nhóm -NH2 định hướng thế vào vị trí ortho và para.'
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
    difficulty: 1,
    question: 'Amino axit có tính lưỡng tính vì...',
    options: ['Có cả nhóm -NH2 (bazơ) và -COOH (axit)', 'Có nhóm -OH', 'Có vòng benzen', 'Có nhóm -CHO'],
    correctAnswer: 'Có cả nhóm -NH2 (bazơ) và -COOH (axit)',
    explanation: 'Amino axit có tính lưỡng tính vì trong phân tử có cả nhóm -NH2 (tính bazơ) và -COOH (tính axit).',
    hint: 'Hai nhóm chức đối lập.'
  },
  {
    id: 18,
    category: 'aminoaxit',
    type: 'multiple-choice',
    difficulty: 1,
    question: 'Glyxin có công thức cấu tạo là...',
    options: ['H2N-CH2-COOH', 'H2N-CH(CH3)-COOH', 'H2N-(CH2)2-COOH', 'CH3-NH-CH2-COOH'],
    correctAnswer: 'H2N-CH2-COOH',
    explanation: 'Glyxin (axit aminoaxetic) là amino axit đơn giản nhất với công thức H2N-CH2-COOH.',
    hint: 'Amino axit đơn giản nhất.'
  },
  {
    id: 19,
    category: 'aminoaxit',
    type: 'multiple-choice',
    difficulty: 1,
    question: 'Alanin có công thức cấu tạo là...',
    options: ['H2N-CH(CH3)-COOH', 'H2N-CH2-COOH', 'H2N-(CH2)2-COOH', 'HOOC-CH2-CH(NH2)-COOH'],
    correctAnswer: 'H2N-CH(CH3)-COOH',
    explanation: 'Alanin (axit α-aminopropionic) có công thức H2N-CH(CH3)-COOH, là amino axit có 3 carbon.',
    hint: 'Alanin có thêm một nhóm -CH3 so với glyxin.'
  },
  {
    id: 20,
    category: 'aminoaxit',
    type: 'multiple-choice',
    difficulty: 2,
    question: 'Trong dung dịch, amino axit tồn tại chủ yếu ở dạng...',
    options: ['Ion lưỡng cực', 'Phân tử trung hòa', 'Ion dương', 'Ion âm'],
    correctAnswer: 'Ion lưỡng cực',
    explanation: 'Trong dung dịch, amino axit tồn tại chủ yếu ở dạng ion lưỡng cực: H3N+-CHR-COO- do sự chuyển proton nội phân tử.',
    hint: 'Nhóm -NH2 nhận H+, nhóm -COOH cho H+.'
  },
  {
    id: 21,
    category: 'aminoaxit',
    type: 'multiple-choice',
    difficulty: 2,
    question: 'Amino axit phản ứng với dung dịch NaOH tạo thành...',
    options: ['Muối và nước', 'Ester', 'Amin', 'Axit'],
    correctAnswer: 'Muối và nước',
    explanation: 'Amino axit + NaOH → Muối + H2O. Ví dụ: H2N-CH2-COOH + NaOH → H2N-CH2-COONa + H2O.',
    hint: 'Nhóm -COOH phản ứng với bazơ.'
  },
  {
    id: 22,
    category: 'aminoaxit',
    type: 'multiple-choice',
    difficulty: 2,
    question: 'Amino axit phản ứng với dung dịch HCl tạo thành...',
    options: ['Muối', 'Ester', 'Ancol', 'Anđehit'],
    correctAnswer: 'Muối',
    explanation: 'Amino axit + HCl → Muối. Ví dụ: H2N-CH2-COOH + HCl → ClH3N-CH2-COOH.',
    hint: 'Nhóm -NH2 phản ứng với axit.'
  },
  {
    id: 23,
    category: 'aminoaxit',
    type: 'multiple-choice',
    difficulty: 2,
    question: 'Liên kết peptit là liên kết...',
    options: ['-CO-NH-', '-CO-O-', '-C-N-', '-NH-NH-'],
    correctAnswer: '-CO-NH-',
    explanation: 'Liên kết peptit là liên kết -CO-NH- được hình thành khi nhóm -COOH của amino axit này kết hợp với nhóm -NH2 của amino axit khác và loại đi một phân tử H2O.',
    hint: 'Liên kết amit trong peptit.'
  },
  {
    id: 24,
    category: 'aminoaxit',
    type: 'fill-blank',
    difficulty: 2,
    question: 'Phản ứng trùng ngưng các amino axit tạo thành hợp chất cao phân tử gọi là...',
    options: [],
    correctAnswer: 'polipeptit',
    acceptedAnswers: ['polipeptit', 'polypeptit', 'polypeptide', 'peptit'],
    explanation: 'Phản ứng trùng ngưng nhiều amino axit tạo thành polipeptit (chuỗi peptit dài).',
    hint: 'Poly + peptit.'
  },
  {
    id: 25,
    category: 'aminoaxit',
    type: 'multiple-choice',
    difficulty: 2,
    question: 'Số liên kết peptit trong một tripeptit là...',
    options: ['2', '1', '3', '4'],
    correctAnswer: '2',
    explanation: 'Tripeptit gồm 3 gốc amino axit liên kết với nhau qua 2 liên kết peptit.',
    hint: 'Số liên kết peptit = số gốc amino axit - 1.'
  },
  {
    id: 26,
    category: 'aminoaxit',
    type: 'multiple-choice',
    difficulty: 3,
    question: 'Axit glutamic có công thức HOOC-CH2-CH2-CH(NH2)-COOH. Axit này có...',
    options: ['2 nhóm -COOH, 1 nhóm -NH2', '1 nhóm -COOH, 2 nhóm -NH2', '1 nhóm -COOH, 1 nhóm -NH2', '2 nhóm -COOH, 2 nhóm -NH2'],
    correctAnswer: '2 nhóm -COOH, 1 nhóm -NH2',
    explanation: 'Axit glutamic có 2 nhóm cacboxyl (-COOH) và 1 nhóm amino (-NH2), nên có tính axit trội hơn.',
    hint: 'Đếm số nhóm -COOH và -NH2 trong công thức.'
  },
  {
    id: 27,
    category: 'aminoaxit',
    type: 'multiple-choice',
    difficulty: 3,
    question: 'Lysin có công thức H2N-(CH2)4-CH(NH2)-COOH. Lysin có môi trường...',
    options: ['Bazơ', 'Axit', 'Trung tính', 'Lưỡng tính'],
    correctAnswer: 'Bazơ',
    explanation: 'Lysin có 2 nhóm -NH2 và 1 nhóm -COOH, số nhóm bazơ nhiều hơn nên có môi trường bazơ.',
    hint: 'So sánh số nhóm -NH2 và -COOH.'
  },
  {
    id: 28,
    category: 'aminoaxit',
    type: 'fill-blank',
    difficulty: 1,
    question: 'Amino axit thiên nhiên quan trọng nhất là α-amino axit, trong đó nhóm -NH2 gắn vào carbon ở vị trí...',
    options: [],
    correctAnswer: 'alpha',
    acceptedAnswers: ['alpha', 'α', 'anpha', 'số 2'],
    explanation: 'Trong α-amino axit, nhóm -NH2 gắn vào carbon α (carbon liền kề nhóm -COOH).',
    hint: 'Carbon liền kề nhóm -COOH.'
  },
  {
    id: 29,
    category: 'aminoaxit',
    type: 'multiple-choice',
    difficulty: 3,
    question: 'Khi đun nóng glyxin với alanin có thể thu được tối đa bao nhiêu đipeptit?',
    options: ['4', '2', '3', '1'],
    correctAnswer: '4',
    explanation: 'Có 4 đipeptit: Gly-Gly, Ala-Ala, Gly-Ala, Ala-Gly. Mỗi amino axit có thể ở đầu N hoặc đầu C.',
    hint: 'Xét cả đipeptit đồng loại và khác loại.'
  },
  {
    id: 30,
    category: 'aminoaxit',
    type: 'multiple-choice',
    difficulty: 3,
    question: 'Amino axit có khả năng tham gia phản ứng este hóa với ancol vì có nhóm...',
    options: ['-COOH', '-NH2', '-OH', '-CHO'],
    correctAnswer: '-COOH',
    explanation: 'Nhóm -COOH trong amino axit có thể phản ứng este hóa với ancol (có xúc tác) tạo este.',
    hint: 'Phản ứng đặc trưng của axit cacboxylic.'
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
    difficulty: 1,
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
    difficulty: 1,
    question: 'Protein có trong thực phẩm nào sau đây?',
    options: ['Thịt, trứng, sữa', 'Gạo, khoai', 'Dầu ăn, mỡ', 'Đường, mật ong'],
    correctAnswer: 'Thịt, trứng, sữa',
    explanation: 'Thịt, trứng, sữa là các nguồn protein động vật quan trọng trong chế độ ăn uống.',
    hint: 'Thực phẩm giàu đạm.'
  },
  {
    id: 34,
    category: 'protein',
    type: 'multiple-choice',
    difficulty: 2,
    question: 'Phản ứng màu biure là phản ứng của protein với...',
    options: ['Cu(OH)2 trong môi trường kiềm', 'HNO3 đặc', 'Dung dịch AgNO3', 'Dung dịch I2'],
    correctAnswer: 'Cu(OH)2 trong môi trường kiềm',
    explanation: 'Phản ứng màu biure: Protein + Cu(OH)2 → phức màu tím đặc trưng (do có ≥ 2 liên kết peptit).',
    hint: 'Phản ứng đặc trưng với Cu(OH)2.'
  },
  {
    id: 35,
    category: 'protein',
    type: 'multiple-choice',
    difficulty: 2,
    question: 'Sản phẩm của phản ứng màu biure có màu...',
    options: ['Tím', 'Xanh', 'Đỏ', 'Vàng'],
    correctAnswer: 'Tím',
    explanation: 'Phản ứng màu biure tạo phức màu tím đặc trưng, dùng để nhận biết protein và peptit có từ 2 liên kết peptit trở lên.',
    hint: 'Màu đặc trưng của phức Cu.'
  },
  {
    id: 36,
    category: 'protein',
    type: 'multiple-choice',
    difficulty: 2,
    question: 'Cấu trúc bậc 1 của protein là...',
    options: ['Trình tự sắp xếp các amino axit', 'Xoắn α hoặc gấp nếp β', 'Cấu trúc không gian 3 chiều', 'Tập hợp nhiều chuỗi polipeptit'],
    correctAnswer: 'Trình tự sắp xếp các amino axit',
    explanation: 'Cấu trúc bậc 1 là trình tự sắp xếp các gốc amino axit trong chuỗi polipeptit, quyết định cấu trúc bậc cao hơn.',
    hint: 'Thứ tự các amino axit.'
  },
  {
    id: 37,
    category: 'protein',
    type: 'multiple-choice',
    difficulty: 2,
    question: 'Cấu trúc xoắn α và gấp nếp β thuộc cấu trúc bậc mấy của protein?',
    options: ['Bậc 2', 'Bậc 1', 'Bậc 3', 'Bậc 4'],
    correctAnswer: 'Bậc 2',
    explanation: 'Cấu trúc bậc 2 của protein gồm xoắn α và gấp nếp β, được giữ vững bởi liên kết hiđro giữa các nhóm peptit.',
    hint: 'Hình dạng cục bộ của chuỗi polipeptit.'
  },
  {
    id: 38,
    category: 'protein',
    type: 'fill-blank',
    difficulty: 2,
    question: 'Hiện tượng protein bị đông tụ không thuận nghịch dưới tác dụng của nhiệt độ, axit, bazơ, muối kim loại nặng gọi là sự...',
    options: [],
    correctAnswer: 'biến tính',
    acceptedAnswers: ['biến tính', 'bien tinh', 'đông tụ', 'denaturation'],
    explanation: 'Sự biến tính protein là quá trình protein bị thay đổi cấu trúc không gian, mất hoạt tính sinh học.',
    hint: 'Protein mất cấu trúc và hoạt tính.'
  },
  {
    id: 39,
    category: 'protein',
    type: 'multiple-choice',
    difficulty: 2,
    question: 'Enzim là chất xúc tác sinh học có bản chất là...',
    options: ['Protein', 'Lipit', 'Cacbohiđrat', 'Axit nucleic'],
    correctAnswer: 'Protein',
    explanation: 'Enzim (enzyme) là các chất xúc tác sinh học có bản chất protein, xúc tác cho các phản ứng sinh hóa trong cơ thể.',
    hint: 'Chất xúc tác trong cơ thể sống.'
  },
  {
    id: 40,
    category: 'protein',
    type: 'multiple-choice',
    difficulty: 3,
    question: 'Protein có phản ứng với HNO3 đặc tạo sản phẩm màu vàng, phản ứng này gọi là...',
    options: ['Phản ứng xanthoprotein', 'Phản ứng biure', 'Phản ứng thủy phân', 'Phản ứng đông tụ'],
    correctAnswer: 'Phản ứng xanthoprotein',
    explanation: 'Phản ứng xanthoprotein: HNO3 đặc nitro hóa vòng benzen trong các amino axit thơm (Phe, Tyr, Trp) tạo màu vàng.',
    hint: 'Phản ứng với HNO3 đặc.'
  },
  {
    id: 41,
    category: 'protein',
    type: 'multiple-choice',
    difficulty: 3,
    question: 'Cấu trúc bậc 3 của protein được giữ vững nhờ...',
    options: ['Liên kết đisunfua, liên kết ion, tương tác kị nước', 'Chỉ liên kết peptit', 'Chỉ liên kết hiđro', 'Chỉ liên kết ion'],
    correctAnswer: 'Liên kết đisunfua, liên kết ion, tương tác kị nước',
    explanation: 'Cấu trúc bậc 3 được ổn định bởi nhiều loại liên kết: disunfua (-S-S-), liên kết ion, liên kết hiđro và tương tác kị nước.',
    hint: 'Nhiều loại tương tác khác nhau.'
  },
  {
    id: 42,
    category: 'protein',
    type: 'multiple-choice',
    difficulty: 3,
    question: 'Hemoglobin là protein có cấu trúc bậc...',
    options: ['Bậc 4', 'Bậc 1', 'Bậc 2', 'Bậc 3'],
    correctAnswer: 'Bậc 4',
    explanation: 'Hemoglobin gồm 4 chuỗi polipeptit (2α + 2β) kết hợp với nhau, nên có cấu trúc bậc 4.',
    hint: 'Protein gồm nhiều chuỗi polipeptit.'
  },
  {
    id: 43,
    category: 'protein',
    type: 'fill-blank',
    difficulty: 2,
    question: 'Protein có vai trò xúc tác các phản ứng sinh hóa được gọi là...',
    options: [],
    correctAnswer: 'enzim',
    acceptedAnswers: ['enzim', 'enzyme', 'en zim', 'men'],
    explanation: 'Enzim (enzyme) là protein có vai trò xúc tác sinh học, làm tăng tốc độ các phản ứng sinh hóa.',
    hint: 'Chất xúc tác sinh học.'
  },
  {
    id: 44,
    category: 'protein',
    type: 'multiple-choice',
    difficulty: 3,
    question: 'Khi đun nóng lòng trắng trứng, protein bị đông tụ vì...',
    options: ['Cấu trúc không gian bị phá hủy', 'Liên kết peptit bị đứt', 'Protein bị thủy phân', 'Protein bị oxi hóa'],
    correctAnswer: 'Cấu trúc không gian bị phá hủy',
    explanation: 'Nhiệt độ cao phá vỡ các liên kết yếu (liên kết hiđro, liên kết ion...) giữ cấu trúc không gian, protein bị biến tính.',
    hint: 'Không phải đứt liên kết peptit.'
  },
  {
    id: 45,
    category: 'protein',
    type: 'multiple-choice',
    difficulty: 3,
    question: 'Chất nào sau đây KHÔNG gây biến tính protein?',
    options: ['Dung dịch NaCl loãng', 'Axit HNO3 đặc', 'Nhiệt độ cao', 'Muối kim loại nặng (Pb2+, Hg2+)'],
    correctAnswer: 'Dung dịch NaCl loãng',
    explanation: 'Dung dịch NaCl loãng không làm biến tính protein. Các tác nhân gây biến tính: nhiệt độ cao, axit/bazơ đặc, muối kim loại nặng, cồn...',
    hint: 'Muối của kim loại kiềm ở nồng độ thấp.'
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
  const [categoryProgress, setCategoryProgress] = useState({});
  const [highScore, setHighScore] = useState(0);
  const [hasStartedNewGame, setHasStartedNewGame] = useState(false);
  const [gameInProgress, setGameInProgress] = useState(false);
  const [totalCorrectAnswers, setTotalCorrectAnswers] = useState(0);
  const [totalScore, setTotalScore] = useState(0);

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
    setHasStartedNewGame(true);
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
                <span>Đã hoàn thành: <strong>{Object.values(categoryProgress).filter(p => p >= 80).length}/{CATEGORIES.length}</strong></span>
              </div>
              <div className="stat-item-amin">
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

            <div className="category-grid-amin">
              {CATEGORIES.map((cat) => {
                const Icon = cat.icon;
                const catPercentage = categoryProgress[cat.id] || 0;
                const isCompleted = catPercentage >= 80;
                const hasProgress = catPercentage > 0 && catPercentage < 80;
                
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
                    {Math.min(100, Math.round((score / (filteredQuestions.length * 20)) * 100))}%
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
