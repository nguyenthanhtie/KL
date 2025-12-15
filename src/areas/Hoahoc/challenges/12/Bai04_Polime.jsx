import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowLeft, Trophy, RotateCcw, ChevronRight,
  CheckCircle2, XCircle, Lightbulb, Zap, Award,
  FlaskConical, Layers, Recycle, Factory, Shirt,
  Clock, Target, AlertTriangle, Flame
} from 'lucide-react';
import useChallengeProgress from '../../../../hooks/useChallengeProgress';
import ResumeDialog from '../../../../components/ResumeDialog';
import './CSS/Bai04_Polime.css';

// ================== DATA - POLIME ==================
const CATEGORIES = [
  {
    id: 'khainiemcautruc',
    name: 'Khái niệm & Cấu trúc',
    icon: Layers,
    color: '#6366f1',
    description: 'Định nghĩa, phân loại, cấu trúc polime',
    bgGradient: 'from-indigo-500 to-purple-500'
  },
  {
    id: 'phanungtonghoip',
    name: 'Phản ứng tổng hợp',
    icon: FlaskConical,
    color: '#f59e0b',
    description: 'Trùng hợp, trùng ngưng, đồng trùng hợp',
    bgGradient: 'from-amber-500 to-orange-500'
  },
  {
    id: 'chatdeo',
    name: 'Chất dẻo',
    icon: Recycle,
    color: '#10b981',
    description: 'PE, PP, PVC, PS, và các loại nhựa',
    bgGradient: 'from-emerald-500 to-green-500'
  },
  {
    id: 'tovaocaosu',
    name: 'Tơ & Cao su',
    icon: Shirt,
    color: '#ec4899',
    description: 'Tơ tổng hợp, tơ bán tổng hợp, cao su',
    bgGradient: 'from-pink-500 to-rose-500'
  }
];

const CHALLENGES = [
  // ========== KHÁI NIỆM & CẤU TRÚC (12 câu) ==========
  {
    id: 1,
    category: 'khainiemcautruc',
    type: 'multiple-choice',
    difficulty: 1,
    question: 'Polime là những hợp chất có phân tử khối...',
    options: ['Rất lớn do nhiều đơn vị nhỏ (mắt xích) liên kết', 'Nhỏ', 'Trung bình', 'Không xác định'],
    correctAnswer: 'Rất lớn do nhiều đơn vị nhỏ (mắt xích) liên kết',
    explanation: 'Polime là những hợp chất có phân tử khối rất lớn, được tạo thành từ nhiều đơn vị cấu trúc nhỏ (mắt xích) liên kết với nhau.',
    hint: 'Poly = nhiều.'
  },
  {
    id: 2,
    category: 'khainiemcautruc',
    type: 'fill-blank',
    difficulty: 1,
    question: 'Các phân tử nhỏ tạo nên polime gọi là ___',
    correctAnswer: 'monome',
    acceptedAnswers: ['monome', 'monomer', 'mô-nô-me'],
    explanation: 'Monome là các phân tử nhỏ (đơn phân tử) kết hợp với nhau tạo thành polime.',
    hint: 'Mono = một.'
  },
  {
    id: 3,
    category: 'khainiemcautruc',
    type: 'multiple-choice',
    difficulty: 1,
    question: 'Hệ số n trong công thức polime (-A-)n gọi là...',
    options: ['Hệ số trùng hợp', 'Hệ số phân tử', 'Hệ số monome', 'Hệ số mắt xích'],
    correctAnswer: 'Hệ số trùng hợp',
    explanation: 'Hệ số n gọi là hệ số trùng hợp (hoặc độ polime hóa), cho biết số mắt xích trong một phân tử polime.',
    hint: 'Liên quan đến quá trình tạo polime.'
  },
  {
    id: 4,
    category: 'khainiemcautruc',
    type: 'multiple-choice',
    difficulty: 2,
    question: 'Polime nào sau đây là polime thiên nhiên?',
    options: ['Cao su thiên nhiên', 'Polietilen (PE)', 'Polivinyl clorua (PVC)', 'Polistiren (PS)'],
    correctAnswer: 'Cao su thiên nhiên',
    explanation: 'Cao su thiên nhiên được lấy từ mủ cây cao su, là polime thiên nhiên. PE, PVC, PS đều là polime tổng hợp.',
    hint: 'Có nguồn gốc từ tự nhiên.'
  },
  {
    id: 5,
    category: 'khainiemcautruc',
    type: 'multiple-choice',
    difficulty: 2,
    question: 'Polime có cấu trúc mạch phân nhánh là...',
    options: ['Amilopectin', 'Amilozơ', 'Xenlulozơ', 'Polietilen (PE)'],
    correctAnswer: 'Amilopectin',
    explanation: 'Amilopectin (thành phần của tinh bột) có cấu trúc mạch phân nhánh. Amilozơ có mạch không phân nhánh.',
    hint: 'Thành phần của tinh bột.'
  },
  {
    id: 6,
    category: 'khainiemcautruc',
    type: 'multiple-choice',
    difficulty: 2,
    question: 'Polime có cấu trúc mạng không gian là...',
    options: ['Nhựa bakelit', 'Polietilen', 'Cao su thiên nhiên', 'Nilon-6,6'],
    correctAnswer: 'Nhựa bakelit',
    explanation: 'Nhựa bakelit (phenol-fomanđehit) có cấu trúc mạng không gian ba chiều, không tan trong dung môi, không nóng chảy.',
    hint: 'Không nóng chảy, rất cứng.'
  },
  {
    id: 7,
    category: 'khainiemcautruc',
    type: 'fill-blank',
    difficulty: 2,
    question: 'Polime có khả năng biến dạng khi chịu lực và giữ nguyên biến dạng khi lực thôi tác dụng gọi là polime ___',
    correctAnswer: 'nhiệt dẻo',
    acceptedAnswers: ['nhiệt dẻo', 'thermoplastic'],
    explanation: 'Polime nhiệt dẻo mềm khi đun nóng, cứng lại khi nguội, có thể tái chế. Polime nhiệt rắn thì không.',
    hint: 'Liên quan đến nhiệt độ.'
  },
  {
    id: 8,
    category: 'khainiemcautruc',
    type: 'multiple-choice',
    difficulty: 3,
    question: 'Phân tử khối trung bình của polietilen là 420000 đvC. Hệ số trùng hợp n của PE là...',
    options: ['15000', '14000', '16000', '12000'],
    correctAnswer: '15000',
    explanation: 'PE: (-CH2-CH2-)n có M mắt xích = 28. n = 420000/28 = 15000.',
    hint: 'n = M polime / M mắt xích.'
  },
  {
    id: 9,
    category: 'khainiemcautruc',
    type: 'multiple-choice',
    difficulty: 2,
    question: 'Tính chất nào sau đây KHÔNG phải của polime?',
    options: ['Có nhiệt độ nóng chảy xác định', 'Không bay hơi', 'Không tan trong nước', 'Một số tan trong dung môi hữu cơ'],
    correctAnswer: 'Có nhiệt độ nóng chảy xác định',
    explanation: 'Do polime là hỗn hợp nhiều phân tử có độ dài khác nhau nên không có nhiệt độ nóng chảy xác định (khoảng nhiệt độ).',
    hint: 'Liên quan đến tính đồng nhất.'
  },
  {
    id: 10,
    category: 'khainiemcautruc',
    type: 'multiple-choice',
    difficulty: 3,
    question: 'Polime nào sau đây là polime bán tổng hợp?',
    options: ['Tơ visco', 'Polietilen', 'Cao su thiên nhiên', 'Protein'],
    correctAnswer: 'Tơ visco',
    explanation: 'Tơ visco được điều chế từ xenlulozơ (thiên nhiên) qua xử lý hóa học nên là polime bán tổng hợp (nhân tạo).',
    hint: 'Nguyên liệu thiên nhiên + xử lý hóa học.'
  },
  {
    id: 11,
    category: 'khainiemcautruc',
    type: 'fill-blank',
    difficulty: 2,
    question: 'Mắt xích của polietilen (PE) là ___',
    correctAnswer: '-CH2-CH2-',
    acceptedAnswers: ['-CH2-CH2-', '-ch2-ch2-', 'CH2CH2', '-CH2CH2-'],
    explanation: 'PE được tạo từ monome etilen CH2=CH2. Mắt xích sau trùng hợp là -CH2-CH2-.',
    hint: 'Từ etilen CH2=CH2.'
  },
  {
    id: 12,
    category: 'khainiemcautruc',
    type: 'multiple-choice',
    difficulty: 3,
    question: 'Polime nào có tính đàn hồi tốt nhất?',
    options: ['Cao su lưu hóa', 'Polietilen', 'PVC', 'Polistiren'],
    correctAnswer: 'Cao su lưu hóa',
    explanation: 'Cao su lưu hóa có các cầu nối -S-S- giữa các mạch polime tạo cấu trúc mạng không gian, cho tính đàn hồi tốt.',
    hint: 'Xử lý cao su với lưu huỳnh.'
  },

  // ========== PHẢN ỨNG TỔNG HỢP (12 câu) ==========
  {
    id: 13,
    category: 'phanungtonghoip',
    type: 'multiple-choice',
    difficulty: 1,
    question: 'Phản ứng trùng hợp là phản ứng...',
    options: ['Nhiều monome kết hợp thành polime, không tạo sản phẩm phụ', 'Tạo polime và nước', 'Tạo polime và CO2', 'Phân hủy polime'],
    correctAnswer: 'Nhiều monome kết hợp thành polime, không tạo sản phẩm phụ',
    explanation: 'Phản ứng trùng hợp: nM → (-M-)n. Các monome cộng hợp với nhau không giải phóng phân tử nhỏ.',
    hint: 'Không tạo sản phẩm phụ.'
  },
  {
    id: 14,
    category: 'phanungtonghoip',
    type: 'multiple-choice',
    difficulty: 1,
    question: 'Monome để trùng hợp thành polietilen (PE) là...',
    options: ['Etilen CH2=CH2', 'Etan C2H6', 'Axetilen C2H2', 'Propilen CH3-CH=CH2'],
    correctAnswer: 'Etilen CH2=CH2',
    explanation: 'PE được trùng hợp từ etilen: nCH2=CH2 → (-CH2-CH2-)n',
    hint: 'Tên polime = poli + tên monome.'
  },
  {
    id: 15,
    category: 'phanungtonghoip',
    type: 'multiple-choice',
    difficulty: 2,
    question: 'Điều kiện để monome tham gia phản ứng trùng hợp là...',
    options: ['Có liên kết đôi hoặc vòng kém bền', 'Có nhóm -OH', 'Có nhóm -COOH', 'Có nhóm -NH2'],
    correctAnswer: 'Có liên kết đôi hoặc vòng kém bền',
    explanation: 'Để trùng hợp, monome cần có liên kết bội (C=C, C≡C) hoặc vòng kém bền để mở ra và nối với nhau.',
    hint: 'Liên kết có thể mở ra.'
  },
  {
    id: 16,
    category: 'phanungtonghoip',
    type: 'fill-blank',
    difficulty: 2,
    question: 'Phản ứng tạo polime kèm theo giải phóng phân tử nhỏ (H2O, NH3...) gọi là phản ứng ___',
    correctAnswer: 'trùng ngưng',
    acceptedAnswers: ['trùng ngưng', 'polycondensation', 'ngưng tụ'],
    explanation: 'Phản ứng trùng ngưng: các monome kết hợp và giải phóng phân tử nhỏ như H2O, HCl...',
    hint: 'Khác với trùng hợp.'
  },
  {
    id: 17,
    category: 'phanungtonghoip',
    type: 'multiple-choice',
    difficulty: 2,
    question: 'Điều kiện để monome tham gia phản ứng trùng ngưng là...',
    options: ['Có ít nhất 2 nhóm chức có khả năng phản ứng', 'Chỉ cần 1 nhóm chức', 'Có liên kết đôi', 'Có vòng benzen'],
    correctAnswer: 'Có ít nhất 2 nhóm chức có khả năng phản ứng',
    explanation: 'Để trùng ngưng, monome phải có ít nhất 2 nhóm chức có thể phản ứng với nhau (như -OH và -COOH, -NH2 và -COOH...).',
    hint: 'Cần phản ứng được ở 2 đầu.'
  },
  {
    id: 18,
    category: 'phanungtonghoip',
    type: 'multiple-choice',
    difficulty: 2,
    question: 'Polime nào sau đây được tổng hợp bằng phản ứng trùng ngưng?',
    options: ['Nilon-6,6', 'Polietilen', 'Polivinyl clorua', 'Polipropilen'],
    correctAnswer: 'Nilon-6,6',
    explanation: 'Nilon-6,6 được trùng ngưng từ axit ađipic và hexametylenđiamin: nHOOC-(CH2)4-COOH + nH2N-(CH2)6-NH2 → Nilon-6,6 + 2nH2O',
    hint: 'Tạo ra nước khi trùng hợp.'
  },
  {
    id: 19,
    category: 'phanungtonghoip',
    type: 'multiple-choice',
    difficulty: 3,
    question: 'Monome để trùng hợp tạo PVC (polivinyl clorua) là...',
    options: ['CH2=CHCl', 'CH2=CH2', 'CH2=CHCH3', 'CH2=C(CH3)2'],
    correctAnswer: 'CH2=CHCl',
    explanation: 'PVC: nCH2=CHCl → (-CH2-CHCl-)n. Vinyl clorua CH2=CHCl là monome.',
    hint: 'Vinyl clorua có chứa Cl.'
  },
  {
    id: 20,
    category: 'phanungtonghoip',
    type: 'multiple-choice',
    difficulty: 3,
    question: 'Trùng hợp 5,6 kg etilen với hiệu suất 80%, khối lượng PE thu được là...',
    options: ['4,48 kg', '5,6 kg', '7 kg', '4 kg'],
    correctAnswer: '4,48 kg',
    explanation: 'Phản ứng trùng hợp không giảm khối lượng (M sản phẩm = M nguyên liệu). m PE = 5,6 × 80% = 4,48 kg.',
    hint: 'Khối lượng bảo toàn theo hiệu suất.'
  },
  {
    id: 21,
    category: 'phanungtonghoip',
    type: 'fill-blank',
    difficulty: 2,
    question: 'Cao su buna được trùng hợp từ monome ___',
    correctAnswer: 'buta-1,3-đien',
    acceptedAnswers: ['buta-1,3-đien', 'butadien', 'buta-1,3-dien', 'CH2=CH-CH=CH2'],
    explanation: 'Cao su buna: nCH2=CH-CH=CH2 → (-CH2-CH=CH-CH2-)n (trùng hợp 1,4).',
    hint: 'Có 4 cacbon và 2 liên kết đôi.'
  },
  {
    id: 22,
    category: 'phanungtonghoip',
    type: 'multiple-choice',
    difficulty: 3,
    question: 'Đồng trùng hợp buta-1,3-đien với stiren tạo thành...',
    options: ['Cao su buna-S', 'Cao su buna', 'Cao su buna-N', 'Cao su isopren'],
    correctAnswer: 'Cao su buna-S',
    explanation: 'Cao su buna-S: Buta-1,3-đien + Stiren → Cao su buna-S (S = Styren). Có tính đàn hồi tốt, dùng làm lốp xe.',
    hint: 'S = Stiren.'
  },
  {
    id: 23,
    category: 'phanungtonghoip',
    type: 'multiple-choice',
    difficulty: 3,
    question: 'Đồng trùng hợp buta-1,3-đien với acrilonitrin tạo thành...',
    options: ['Cao su buna-N', 'Cao su buna-S', 'Cao su buna', 'PVC'],
    correctAnswer: 'Cao su buna-N',
    explanation: 'Cao su buna-N: Buta-1,3-đien + Acrilonitrin (CH2=CH-CN) → Cao su buna-N. Bền với dầu mỡ.',
    hint: 'N = Nitril (CN).'
  },
  {
    id: 24,
    category: 'phanungtonghoip',
    type: 'multiple-choice',
    difficulty: 3,
    question: 'Tơ nilon-6 được tổng hợp bằng cách nào?',
    options: ['Trùng ngưng axit ε-aminocaproic', 'Trùng hợp caprolactam', 'Cả A và B đều đúng', 'Trùng hợp etilen'],
    correctAnswer: 'Cả A và B đều đúng',
    explanation: 'Nilon-6 có thể điều chế bằng trùng ngưng axit ε-aminocaproic hoặc trùng hợp mở vòng caprolactam.',
    hint: 'Có 2 cách điều chế.'
  },

  // ========== CHẤT DẺO (11 câu) ==========
  {
    id: 25,
    category: 'chatdeo',
    type: 'multiple-choice',
    difficulty: 1,
    question: 'Chất dẻo là vật liệu...',
    options: ['Polime có tính dẻo', 'Polime có tính đàn hồi', 'Polime có tính dai', 'Polime có tính cứng'],
    correctAnswer: 'Polime có tính dẻo',
    explanation: 'Chất dẻo là vật liệu polime có tính dẻo (biến dạng khi chịu lực và giữ nguyên biến dạng khi lực thôi).',
    hint: 'Đặc tính chính là dẻo.'
  },
  {
    id: 26,
    category: 'chatdeo',
    type: 'multiple-choice',
    difficulty: 1,
    question: 'Polietilen (PE) được dùng để làm...',
    options: ['Túi đựng, màng mỏng', 'Lốp xe', 'Vải may quần áo', 'Đệm mút'],
    correctAnswer: 'Túi đựng, màng mỏng',
    explanation: 'PE mềm dẻo, trong suốt, không thấm nước, dùng làm túi nilon, màng bọc thực phẩm...',
    hint: 'Sản phẩm phổ biến hàng ngày.'
  },
  {
    id: 27,
    category: 'chatdeo',
    type: 'multiple-choice',
    difficulty: 2,
    question: 'PVC (polivinyl clorua) có tính chất nào sau đây?',
    options: ['Cách điện tốt, bền với axit', 'Đàn hồi tốt', 'Tan trong nước', 'Dẫn điện'],
    correctAnswer: 'Cách điện tốt, bền với axit',
    explanation: 'PVC cách điện, cách nhiệt, bền hóa học với nhiều axit, kiềm. Dùng làm ống nước, vỏ dây điện...',
    hint: 'Ứng dụng trong điện.'
  },
  {
    id: 28,
    category: 'chatdeo',
    type: 'fill-blank',
    difficulty: 2,
    question: 'Polipropilen (PP) được trùng hợp từ monome ___',
    correctAnswer: 'propilen',
    acceptedAnswers: ['propilen', 'propen', 'CH2=CHCH3', 'CH3CH=CH2'],
    explanation: 'PP: nCH2=CH-CH3 → (-CH2-CH(CH3)-)n. Propilen là monome.',
    hint: 'Có 3 cacbon.'
  },
  {
    id: 29,
    category: 'chatdeo',
    type: 'multiple-choice',
    difficulty: 2,
    question: 'Polistiren (PS) được dùng để làm...',
    options: ['Hộp xốp, đồ chơi, dụng cụ văn phòng', 'Túi nilon', 'Lốp xe', 'Vải may mặc'],
    correctAnswer: 'Hộp xốp, đồ chơi, dụng cụ văn phòng',
    explanation: 'PS cứng, trong suốt, dễ tạo hình. Xốp PS dùng làm hộp đựng thức ăn, đồ chơi, dụng cụ văn phòng...',
    hint: 'Xốp trắng quen thuộc.'
  },
  {
    id: 30,
    category: 'chatdeo',
    type: 'multiple-choice',
    difficulty: 2,
    question: 'Teflon (PTFE) có đặc tính nổi bật là...',
    options: ['Bền nhiệt, chống dính', 'Đàn hồi tốt', 'Dẫn điện', 'Tan trong nước'],
    correctAnswer: 'Bền nhiệt, chống dính',
    explanation: 'Teflon (-CF2-CF2-)n rất bền nhiệt (đến 300°C), chống dính tuyệt đối, dùng phủ chảo, nồi không dính.',
    hint: 'Chảo không dính.'
  },
  {
    id: 31,
    category: 'chatdeo',
    type: 'fill-blank',
    difficulty: 2,
    question: 'Nhựa bakelit được tổng hợp từ ___ và fomanđehit',
    correctAnswer: 'phenol',
    acceptedAnswers: ['phenol', 'C6H5OH'],
    explanation: 'Nhựa bakelit = Phenol + Fomanđehit (trùng ngưng). Là nhựa nhiệt rắn, cứng, cách điện.',
    hint: 'Hợp chất có vòng benzen và OH.'
  },
  {
    id: 32,
    category: 'chatdeo',
    type: 'multiple-choice',
    difficulty: 3,
    question: 'Nhựa nào sau đây là nhựa nhiệt rắn?',
    options: ['Nhựa bakelit', 'PE', 'PP', 'PS'],
    correctAnswer: 'Nhựa bakelit',
    explanation: 'Nhựa bakelit có cấu trúc mạng không gian, khi đốt nóng không mềm mà phân hủy. PE, PP, PS là nhựa nhiệt dẻo.',
    hint: 'Không thể tái chế bằng nấu chảy.'
  },
  {
    id: 33,
    category: 'chatdeo',
    type: 'multiple-choice',
    difficulty: 3,
    question: 'PMMA (thủy tinh hữu cơ) được trùng hợp từ monome nào?',
    options: ['Metyl metacrylat', 'Etilen', 'Vinyl clorua', 'Stiren'],
    correctAnswer: 'Metyl metacrylat',
    explanation: 'PMMA (Plexiglass): nCH2=C(CH3)COOCH3 → (-CH2-C(CH3)(COOCH3)-)n. Trong suốt, cứng, nhẹ.',
    hint: 'Có nhóm este -COOCH3.'
  },
  {
    id: 34,
    category: 'chatdeo',
    type: 'multiple-choice',
    difficulty: 2,
    question: 'Nhựa PET (polyetylen terephthalat) được dùng chủ yếu để làm...',
    options: ['Chai nước giải khát', 'Túi nilon', 'Ống nước', 'Vỏ dây điện'],
    correctAnswer: 'Chai nước giải khát',
    explanation: 'PET trong suốt, bền, an toàn thực phẩm. Dùng làm chai nước, hộp đựng thực phẩm. Có thể tái chế.',
    hint: 'Chai nhựa trong suốt phổ biến.'
  },
  {
    id: 35,
    category: 'chatdeo',
    type: 'multiple-choice',
    difficulty: 3,
    question: 'Loại nhựa nào có thể phân hủy sinh học?',
    options: ['PLA (axit polilactic)', 'PE', 'PVC', 'PS'],
    correctAnswer: 'PLA (axit polilactic)',
    explanation: 'PLA được tổng hợp từ axit lactic (từ ngô, sắn), có thể phân hủy sinh học. PE, PVC, PS khó phân hủy.',
    hint: 'Thân thiện môi trường.'
  },

  // ========== TƠ VÀ CAO SU (10 câu) ==========
  {
    id: 36,
    category: 'tovaocaosu',
    type: 'multiple-choice',
    difficulty: 1,
    question: 'Tơ là vật liệu polime có dạng...',
    options: ['Sợi dài, mảnh, mềm', 'Khối cứng', 'Dạng bột', 'Dạng lỏng'],
    correctAnswer: 'Sợi dài, mảnh, mềm',
    explanation: 'Tơ là polime dạng sợi dài, mảnh, mềm mại, có thể kéo sợi và dệt vải.',
    hint: 'Dùng dệt vải.'
  },
  {
    id: 37,
    category: 'tovaocaosu',
    type: 'multiple-choice',
    difficulty: 1,
    question: 'Tơ nào sau đây là tơ thiên nhiên?',
    options: ['Tơ tằm', 'Tơ nilon', 'Tơ capron', 'Tơ visco'],
    correctAnswer: 'Tơ tằm',
    explanation: 'Tơ tằm do tằm nhả ra, là protein (fibroin), thuộc loại tơ thiên nhiên. Nilon, capron là tơ tổng hợp.',
    hint: 'Từ con tằm.'
  },
  {
    id: 38,
    category: 'tovaocaosu',
    type: 'multiple-choice',
    difficulty: 2,
    question: 'Tơ visco thuộc loại...',
    options: ['Tơ bán tổng hợp (nhân tạo)', 'Tơ thiên nhiên', 'Tơ tổng hợp', 'Tơ hóa học'],
    correctAnswer: 'Tơ bán tổng hợp (nhân tạo)',
    explanation: 'Tơ visco được điều chế từ xenlulozơ (thiên nhiên) qua xử lý hóa học, nên là tơ bán tổng hợp.',
    hint: 'Nguyên liệu từ gỗ.'
  },
  {
    id: 39,
    category: 'tovaocaosu',
    type: 'fill-blank',
    difficulty: 2,
    question: 'Tơ nilon-6,6 được trùng ngưng từ hexametylenđiamin và axit ___',
    correctAnswer: 'ađipic',
    acceptedAnswers: ['ađipic', 'adipic', 'axit adipic', 'axit ađipic'],
    explanation: 'Nilon-6,6: H2N-(CH2)6-NH2 + HOOC-(CH2)4-COOH → (-NH-(CH2)6-NH-CO-(CH2)4-CO-)n + 2nH2O',
    hint: 'Axit 6 cacbon.'
  },
  {
    id: 40,
    category: 'tovaocaosu',
    type: 'multiple-choice',
    difficulty: 2,
    question: 'Cao su thiên nhiên là polime của monome nào?',
    options: ['Isopren', 'Butađien', 'Stiren', 'Etilen'],
    correctAnswer: 'Isopren',
    explanation: 'Cao su thiên nhiên: (-CH2-C(CH3)=CH-CH2-)n. Monome là isopren CH2=C(CH3)-CH=CH2.',
    hint: 'Có nhóm CH3 trong mắt xích.'
  },
  {
    id: 41,
    category: 'tovaocaosu',
    type: 'multiple-choice',
    difficulty: 2,
    question: 'Cao su lưu hóa có đặc điểm gì so với cao su thô?',
    options: ['Đàn hồi tốt hơn, bền hơn', 'Mềm hơn', 'Dễ tan trong xăng', 'Kém bền nhiệt'],
    correctAnswer: 'Đàn hồi tốt hơn, bền hơn',
    explanation: 'Lưu hóa cao su (đun với S): tạo cầu nối -S-S- giữa các mạch, tăng tính đàn hồi, bền nhiệt, bền với dung môi.',
    hint: 'Xử lý với lưu huỳnh.'
  },
  {
    id: 42,
    category: 'tovaocaosu',
    type: 'fill-blank',
    difficulty: 2,
    question: 'Quá trình đun nóng cao su với lưu huỳnh gọi là quá trình ___',
    correctAnswer: 'lưu hóa',
    acceptedAnswers: ['lưu hóa', 'vulcanization', 'lưu hoá'],
    explanation: 'Lưu hóa: Cao su + S (t°, p) → Cao su lưu hóa có cầu nối -S-S-.',
    hint: 'Tên liên quan đến lưu huỳnh.'
  },
  {
    id: 43,
    category: 'tovaocaosu',
    type: 'multiple-choice',
    difficulty: 3,
    question: 'Tơ lapsan (PET fiber) thuộc loại...',
    options: ['Tơ polieste', 'Tơ poliamit', 'Tơ vinylic', 'Tơ xenlulozơ'],
    correctAnswer: 'Tơ polieste',
    explanation: 'Tơ lapsan là dạng sợi của PET (polyetylen terephthalat), thuộc loại tơ polieste do có liên kết este.',
    hint: 'Cùng loại với chai nhựa PET.'
  },
  {
    id: 44,
    category: 'tovaocaosu',
    type: 'multiple-choice',
    difficulty: 3,
    question: 'Tơ nitron (olon) được trùng hợp từ monome nào?',
    options: ['Acrilonitrin', 'Caprolactam', 'Vinyl clorua', 'Metyl metacrylat'],
    correctAnswer: 'Acrilonitrin',
    explanation: 'Tơ nitron: nCH2=CH-CN → (-CH2-CH(CN)-)n. Bền, giữ nhiệt, dùng dệt áo len, chăn...',
    hint: 'Có nhóm -CN (nitril).'
  },
  {
    id: 45,
    category: 'tovaocaosu',
    type: 'multiple-choice',
    difficulty: 3,
    question: 'Sợi cacbon (carbon fiber) có đặc tính nổi bật là...',
    options: ['Nhẹ, cứng, chịu nhiệt cao', 'Mềm, đàn hồi', 'Dẫn điện kém', 'Tan trong nước'],
    correctAnswer: 'Nhẹ, cứng, chịu nhiệt cao',
    explanation: 'Sợi cacbon rất nhẹ nhưng cứng và bền, chịu nhiệt tốt. Dùng trong hàng không, xe đua, dụng cụ thể thao cao cấp.',
    hint: 'Vật liệu cao cấp.'
  }
];

const Bai04_Polime = () => {
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

  const { hasProgress, savedProgress, saveProgress, clearProgress } = useChallengeProgress('polime_12', {
    challengeId: 'polime_12',
    programId: 'chemistry',
    grade: 12
  });

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
                    (currentQuestion.acceptedAnswers && currentQuestion.acceptedAnswers.some(a => a.toLowerCase() === answer.toLowerCase()));
    
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
    const percentage = (score / maxScore) * 100;
    
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
  };

  if (showResumeDialog) {
    return <ResumeDialog show={true} onResume={handleResume} onRestart={handleRestart} />;
  }

  return (
    <div className="polime-bg min-h-screen p-4 md:p-8 font-sans">
      <div className="max-w-6xl mx-auto">
        {/* HEADER */}
        <header className="flex items-center justify-between mb-8 bg-white/10 backdrop-blur rounded-2xl p-4 border border-white/20">
          <div className="flex items-center gap-4">
            <Link to="/hoahoc/12" className="p-2 hover:bg-white/10 rounded-full transition-colors text-white">
              <ArrowLeft className="w-6 h-6" />
            </Link>
            <div>
              <h1 className="text-2xl font-bold text-white">
                Polime và Vật liệu Polime
              </h1>
              <p className="text-indigo-200 text-sm">Hóa học 12 • Chương 4</p>
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
            <div className="stats-bar-polime mb-8">
              <div className="stat-item-polime">
                <CheckCircle2 className="w-5 h-5 text-green-400" />
                <span>Đã hoàn thành: <strong>{completedCategories.length || 0}/{CATEGORIES.length}</strong></span>
              </div>
              <div className="stat-item-polime">
                <Award className="w-5 h-5 text-yellow-400" />
                <span>Điểm cao nhất: <strong>{highScore || 0}</strong></span>
              </div>
            </div>

            <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <Target className="w-6 h-6" />
              Chọn chủ đề thử thách
            </h2>

            <div className="category-grid-polime">
              {CATEGORIES.map((cat) => {
                const Icon = cat.icon;
                const isCompleted = completedCategories.includes(cat.id);
                
                return (
                  <div 
                    key={cat.id}
                    onClick={() => handleCategorySelect(cat.id)}
                    className="category-card-polime group"
                  >
                    <div className={`category-icon-wrapper-polime ${isCompleted ? 'bg-green-500/20 text-green-400' : ''}`}
                         style={{ color: isCompleted ? undefined : cat.color }}>
                      <Icon className="w-8 h-8" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-white mb-1 group-hover:text-indigo-300 transition-colors">
                        {cat.name}
                      </h3>
                      <p className="text-sm text-indigo-200 mb-3">{cat.description}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-semibold px-2 py-1 rounded bg-white/10 text-indigo-200">
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

            <div className="progress-track-polime mb-6">
              <div 
                className="progress-fill-polime"
                style={{ width: `${((currentQuestionIndex) / filteredQuestions.length) * 100}%` }}
              />
            </div>

            <div className="question-card-polime">
              <div className="question-header-polime">
                <span className={`difficulty-badge-polime ${
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
                <div className="options-grid-polime">
                  {currentQuestion.options.map((option, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleAnswerSubmit(option)}
                      disabled={isCorrect !== null}
                      className={`option-btn-polime ${
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
                      className="flex-1 p-4 bg-white/5 border border-white/20 rounded-xl text-lg text-white focus:border-indigo-500 focus:outline-none"
                      onKeyDown={(e) => e.key === 'Enter' && handleAnswerSubmit(selectedAnswer)}
                    />
                    <button
                      onClick={() => handleAnswerSubmit(selectedAnswer)}
                      disabled={!selectedAnswer || isCorrect !== null}
                      className="px-6 py-2 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Kiểm tra
                    </button>
                  </div>
                </div>
              )}

              {showExplanation && (
                <div className={`feedback-container-polime ${isCorrect ? 'feedback-correct' : 'feedback-wrong'}`}>
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
              <div className="w-24 h-24 bg-indigo-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <Award className="w-12 h-12 text-indigo-400" />
              </div>
              
              <h2 className="text-3xl font-bold text-white mb-2">Hoàn thành xuất sắc!</h2>
              <p className="text-indigo-200 mb-8">Bạn đã hoàn thành chủ đề {CATEGORIES.find(c => c.id === activeCategory)?.name}</p>
              
              <div className="grid grid-cols-3 gap-4 mb-8">
                <div className="p-4 bg-white/5 rounded-2xl border border-white/10">
                  <div className="text-sm text-indigo-200 mb-1">Điểm số</div>
                  <div className="text-2xl font-bold text-green-400">{score}</div>
                </div>
                <div className="p-4 bg-white/5 rounded-2xl border border-white/10">
                  <div className="text-sm text-indigo-200 mb-1">Đúng</div>
                  <div className="text-2xl font-bold text-indigo-400">
                    {Math.round((score / (filteredQuestions.length * 20)) * 100)}%
                  </div>
                </div>
                <div className="p-4 bg-white/5 rounded-2xl border border-white/10">
                  <div className="text-sm text-indigo-200 mb-1">Thời gian</div>
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
                  className="flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-500/30"
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

export default Bai04_Polime;
