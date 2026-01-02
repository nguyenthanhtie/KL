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

// Fallback questions khi không có AI
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
    difficulty: 2,
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
    question: 'Hệ số n trong công thức polime (-M-)n được gọi là gì?',
    options: ['Hệ số polime hóa (độ polime hóa)', 'Hệ số mol', 'Hệ số cân bằng', 'Hệ số tỉ lượng'],
    correctAnswer: 'Hệ số polime hóa (độ polime hóa)',
    explanation: 'Hệ số n cho biết số mắt xích trong phân tử polime, được gọi là hệ số polime hóa hay độ polime hóa.',
    hint: 'Cho biết số lượng mắt xích.'
  },
  {
    id: 4,
    category: 'khainiemcautruc',
    type: 'multiple-choice',
    difficulty: 2,
    question: 'Polime nào sau đây có nguồn gốc thiên nhiên?',
    options: ['Tinh bột, xenlulozơ, protein', 'PE, PP, PVC', 'Tơ nilon, tơ capron', 'Cao su buna, cao su buna-S'],
    correctAnswer: 'Tinh bột, xenlulozơ, protein',
    explanation: 'Polime thiên nhiên có trong tự nhiên: tinh bột, xenlulozơ (từ thực vật), protein, axit nucleic (từ động vật), cao su thiên nhiên.',
    hint: 'Có sẵn trong tự nhiên.'
  },
  {
    id: 5,
    category: 'khainiemcautruc',
    type: 'fill-blank',
    difficulty: 2,
    question: 'Polime có cấu trúc mạch không phân nhánh gọi là polime mạch ___',
    correctAnswer: 'thẳng',
    acceptedAnswers: ['thẳng', 'thang'],
    explanation: 'Polime mạch thẳng: các mắt xích nối với nhau thành mạch dài không phân nhánh. VD: PE, PVC, xenlulozơ.',
    hint: 'Không có nhánh.'
  },
  {
    id: 6,
    category: 'khainiemcautruc',
    type: 'multiple-choice',
    difficulty: 2,
    question: 'Polime nào sau đây có cấu trúc mạng không gian?',
    options: ['Cao su lưu hóa, nhựa bakelit', 'PE, PP', 'Tinh bột, xenlulozơ', 'Tơ nilon-6,6'],
    correctAnswer: 'Cao su lưu hóa, nhựa bakelit',
    explanation: 'Polime mạng không gian: các mạch polime nối với nhau bằng cầu nối tạo mạng lưới 3 chiều. VD: cao su lưu hóa (cầu -S-), nhựa bakelit.',
    hint: 'Có cầu nối giữa các mạch.'
  },
  {
    id: 7,
    category: 'khainiemcautruc',
    type: 'multiple-choice',
    difficulty: 1,
    question: 'Tính chất vật lý chung của polime là gì?',
    options: ['Chất rắn, không bay hơi, không tan trong nước', 'Chất lỏng, dễ bay hơi', 'Chất khí, tan trong nước', 'Chất rắn, tan trong nước'],
    correctAnswer: 'Chất rắn, không bay hơi, không tan trong nước',
    explanation: 'Polime thường là chất rắn, không bay hơi, hầu hết không tan trong nước. Một số polime tan trong dung môi hữu cơ.',
    hint: 'Phân tử khối lớn nên khó bay hơi.'
  },
  {
    id: 8,
    category: 'khainiemcautruc',
    type: 'multiple-choice',
    difficulty: 3,
    question: 'Polime có hệ số polime hóa n = 1500, khối lượng mắt xích M = 28. Phân tử khối của polime là:',
    options: ['42000', '28000', '1528', '1472'],
    correctAnswer: '42000',
    explanation: 'Phân tử khối polime = n × M (khối lượng mắt xích) = 1500 × 28 = 42000.',
    hint: 'M(polime) = n × M(mắt xích).'
  },
  {
    id: 9,
    category: 'khainiemcautruc',
    type: 'fill-blank',
    difficulty: 1,
    question: 'Polime được tổng hợp bằng phản ứng hóa học gọi là polime ___',
    correctAnswer: 'tổng hợp',
    acceptedAnswers: ['tổng hợp', 'tong hop', 'nhân tạo'],
    explanation: 'Polime tổng hợp: được điều chế bằng phản ứng hóa học. VD: PE, PP, PVC, PS, cao su buna...',
    hint: 'Đối lập với polime thiên nhiên.'
  },
  {
    id: 10,
    category: 'khainiemcautruc',
    type: 'multiple-choice',
    difficulty: 2,
    question: 'Polime bán tổng hợp (nhân tạo) là gì?',
    options: ['Polime thiên nhiên được biến đổi hóa học', 'Polime tổng hợp hoàn toàn', 'Polime thiên nhiên không biến đổi', 'Polime vô cơ'],
    correctAnswer: 'Polime thiên nhiên được biến đổi hóa học',
    explanation: 'Polime bán tổng hợp: xuất phát từ polime thiên nhiên, được biến đổi một phần bằng phản ứng hóa học. VD: tơ visco, tơ xenlulozơ axetat.',
    hint: 'Thiên nhiên + biến đổi hóa học.'
  },
  {
    id: 11,
    category: 'khainiemcautruc',
    type: 'multiple-choice',
    difficulty: 3,
    question: 'Polietilen có phân tử khối M = 56000. Biết khối lượng mắt xích là 28. Hệ số polime hóa n bằng:',
    options: ['2000', '1000', '500', '2800'],
    correctAnswer: '2000',
    explanation: 'n = M(polime) / M(mắt xích) = 56000 / 28 = 2000.',
    hint: 'n = M(polime) / M(mắt xích).'
  },
  {
    id: 12,
    category: 'khainiemcautruc',
    type: 'multiple-choice',
    difficulty: 2,
    question: 'Đặc điểm nào sau đây KHÔNG phải của polime?',
    options: ['Có nhiệt độ nóng chảy xác định', 'Không bay hơi', 'Phân tử khối rất lớn', 'Hầu hết không tan trong nước'],
    correctAnswer: 'Có nhiệt độ nóng chảy xác định',
    explanation: 'Polime không có nhiệt độ nóng chảy xác định vì chúng là hỗn hợp nhiều phân tử có hệ số n khác nhau. Polime nóng chảy trong một khoảng nhiệt độ.',
    hint: 'Polime là hỗn hợp nhiều phân tử.'
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
    difficulty: 2,
    question: 'Monome để trùng hợp thành polietilen (PE) là...',
    options: ['Etilen CH₂=CH₂', 'Etan C₂H₆', 'Axetilen C₂H₂', 'Propilen CH₃-CH=CH₂'],
    correctAnswer: 'Etilen CH₂=CH₂',
    explanation: 'PE được trùng hợp từ etilen: nCH₂=CH₂ → (-CH₂-CH₂-)n',
    hint: 'Tên polime = poli + tên monome.'
  },
  {
    id: 15,
    category: 'phanungtonghoip',
    type: 'multiple-choice',
    difficulty: 1,
    question: 'Phản ứng trùng ngưng là phản ứng...',
    options: ['Nhiều monome kết hợp thành polime và giải phóng phân tử nhỏ', 'Nhiều monome kết hợp không tạo sản phẩm phụ', 'Phân hủy polime', 'Cộng hợp đơn giản'],
    correctAnswer: 'Nhiều monome kết hợp thành polime và giải phóng phân tử nhỏ',
    explanation: 'Phản ứng trùng ngưng: nhiều monome kết hợp với nhau tạo polime đồng thời giải phóng phân tử nhỏ như H₂O, HCl...',
    hint: 'Có sản phẩm phụ.'
  },
  {
    id: 16,
    category: 'phanungtonghoip',
    type: 'fill-blank',
    difficulty: 2,
    question: 'Điều kiện để monome tham gia phản ứng trùng hợp là phải có liên kết ___ hoặc vòng không bền',
    correctAnswer: 'bội',
    acceptedAnswers: ['bội', 'đôi', 'ba', 'pi'],
    explanation: 'Monome trùng hợp phải có liên kết bội (đôi hoặc ba) hoặc vòng không bền để mở ra khi phản ứng.',
    hint: 'Liên kết có thể mở ra.'
  },
  {
    id: 17,
    category: 'phanungtonghoip',
    type: 'multiple-choice',
    difficulty: 2,
    question: 'Monome nào sau đây có thể tham gia phản ứng trùng ngưng?',
    options: ['Axit ε-aminocaproic H₂N-(CH₂)₅-COOH', 'Etilen CH₂=CH₂', 'Propilen CH₂=CH-CH₃', 'Stiren C₆H₅-CH=CH₂'],
    correctAnswer: 'Axit ε-aminocaproic H₂N-(CH₂)₅-COOH',
    explanation: 'Monome trùng ngưng phải có ít nhất 2 nhóm chức có thể phản ứng. Axit ε-aminocaproic có cả -NH₂ và -COOH.',
    hint: 'Cần có 2 nhóm chức khác nhau.'
  },
  {
    id: 18,
    category: 'phanungtonghoip',
    type: 'multiple-choice',
    difficulty: 2,
    question: 'Polistiren (PS) được tổng hợp từ monome nào?',
    options: ['Stiren C₆H₅-CH=CH₂', 'Benzen C₆H₆', 'Toluen C₆H₅-CH₃', 'Etylbenzen C₆H₅-C₂H₅'],
    correctAnswer: 'Stiren C₆H₅-CH=CH₂',
    explanation: 'PS được trùng hợp từ stiren: nC₆H₅-CH=CH₂ → (-CH₂-CH(C₆H₅)-)n',
    hint: 'Có vòng benzen và liên kết đôi.'
  },
  {
    id: 19,
    category: 'phanungtonghoip',
    type: 'fill-blank',
    difficulty: 2,
    question: 'Tơ nilon-6,6 được tổng hợp bằng phản ứng trùng ngưng giữa hexametylenđiamin và axit ___',
    correctAnswer: 'ađipic',
    acceptedAnswers: ['ađipic', 'adipic', 'a-đi-pic'],
    explanation: 'Tơ nilon-6,6: trùng ngưng H₂N-(CH₂)₆-NH₂ (hexametylenđiamin) với HOOC-(CH₂)₄-COOH (axit ađipic).',
    hint: 'Axit có 6 cacbon.'
  },
  {
    id: 20,
    category: 'phanungtonghoip',
    type: 'multiple-choice',
    difficulty: 3,
    question: 'Sản phẩm phụ của phản ứng trùng ngưng tạo tơ nilon-6,6 là gì?',
    options: ['H₂O', 'CO₂', 'HCl', 'NH₃'],
    correctAnswer: 'H₂O',
    explanation: 'Khi trùng ngưng, nhóm -NH₂ và -COOH phản ứng tạo liên kết peptit -CO-NH- và giải phóng H₂O.',
    hint: 'Phản ứng giữa -NH₂ và -COOH.'
  },
  {
    id: 21,
    category: 'phanungtonghoip',
    type: 'multiple-choice',
    difficulty: 2,
    question: 'Polimetyl metacrylat (PMMA - thủy tinh hữu cơ) được trùng hợp từ monome:',
    options: ['CH₂=C(CH₃)-COOCH₃', 'CH₂=CH-COOCH₃', 'CH₃-COOCH=CH₂', 'CH₂=CH-OCOCH₃'],
    correctAnswer: 'CH₂=C(CH₃)-COOCH₃',
    explanation: 'PMMA được trùng hợp từ metyl metacrylat CH₂=C(CH₃)-COOCH₃.',
    hint: 'Metacrylat có nhóm CH₃ ở C=.'
  },
  {
    id: 22,
    category: 'phanungtonghoip',
    type: 'multiple-choice',
    difficulty: 3,
    question: 'Đồng trùng hợp butađien-1,3 với stiren tạo ra cao su:',
    options: ['Cao su buna-S', 'Cao su buna', 'Cao su buna-N', 'Cao su isopren'],
    correctAnswer: 'Cao su buna-S',
    explanation: 'Cao su buna-S = butađien + stiren. Chữ S từ stiren. Cao su này có tính đàn hồi tốt, bền với dầu mỡ.',
    hint: 'S = stiren.'
  },
  {
    id: 23,
    category: 'phanungtonghoip',
    type: 'fill-blank',
    difficulty: 3,
    question: 'Cao su buna-N được tổng hợp từ butađien-1,3 và ___',
    correctAnswer: 'acrilonitrin',
    acceptedAnswers: ['acrilonitrin', 'acrylonitrin', 'acrylonitrile'],
    explanation: 'Cao su buna-N = butađien + acrilonitrin (CH₂=CH-CN). Chữ N từ nitrin. Cao su này bền với dầu mỡ.',
    hint: 'Có nhóm -CN (nitrin).'
  },
  {
    id: 24,
    category: 'phanungtonghoip',
    type: 'multiple-choice',
    difficulty: 2,
    question: 'Phản ứng nào sau đây là phản ứng trùng hợp?',
    options: ['nCH₂=CHCl → (-CH₂-CHCl-)n', 'nH₂N-(CH₂)₅-COOH → (-NH-(CH₂)₅-CO-)n + nH₂O', 'C₆H₁₀O₅ + HNO₃ → xenlulozơ trinitrat', 'Tinh bột + H₂O → glucozơ'],
    correctAnswer: 'nCH₂=CHCl → (-CH₂-CHCl-)n',
    explanation: 'Trùng hợp vinyl clorua tạo PVC không có sản phẩm phụ. Các phản ứng khác có sản phẩm phụ hoặc không phải polime hóa.',
    hint: 'Không tạo sản phẩm phụ.'
  },

  // ========== CHẤT DẺO (12 câu) ==========
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
    difficulty: 2,
    question: 'PVC (polivinyl clorua) có tính chất nào sau đây?',
    options: ['Cách điện tốt, bền với axit', 'Đàn hồi tốt', 'Tan trong nước', 'Dẫn điện'],
    correctAnswer: 'Cách điện tốt, bền với axit',
    explanation: 'PVC cách điện, cách nhiệt, bền hóa học với nhiều axit, kiềm. Dùng làm ống nước, vỏ dây điện...',
    hint: 'Ứng dụng trong điện.'
  },
  {
    id: 27,
    category: 'chatdeo',
    type: 'multiple-choice',
    difficulty: 1,
    question: 'Polietilen (PE) được dùng làm gì?',
    options: ['Túi đựng, màng mỏng, chai lọ', 'Vỏ dây điện', 'Kính chống đạn', 'Lốp xe'],
    correctAnswer: 'Túi đựng, màng mỏng, chai lọ',
    explanation: 'PE mềm dẻo, trong suốt, không độc, dùng làm túi đựng, màng bọc thực phẩm, chai lọ nhựa.',
    hint: 'Nhựa phổ biến nhất.'
  },
  {
    id: 28,
    category: 'chatdeo',
    type: 'fill-blank',
    difficulty: 2,
    question: 'Polipropilen (PP) được tổng hợp từ monome ___',
    correctAnswer: 'propilen',
    acceptedAnswers: ['propilen', 'propylen', 'CH2=CH-CH3'],
    explanation: 'PP được trùng hợp từ propilen CH₂=CH-CH₃: nCH₂=CH-CH₃ → (-CH₂-CH(CH₃)-)n',
    hint: 'Có 3 cacbon.'
  },
  {
    id: 29,
    category: 'chatdeo',
    type: 'multiple-choice',
    difficulty: 2,
    question: 'PMMA (thủy tinh hữu cơ, plexiglass) có đặc điểm gì?',
    options: ['Trong suốt, cứng, không vỡ thành mảnh sắc', 'Mềm dẻo, đục', 'Giòn, dễ vỡ', 'Đàn hồi tốt'],
    correctAnswer: 'Trong suốt, cứng, không vỡ thành mảnh sắc',
    explanation: 'PMMA trong suốt như thủy tinh nhưng nhẹ hơn, bền va đập, không vỡ thành mảnh sắc. Dùng làm kính máy bay, kính bảo hộ.',
    hint: 'Thay thế thủy tinh.'
  },
  {
    id: 30,
    category: 'chatdeo',
    type: 'multiple-choice',
    difficulty: 2,
    question: 'Nhựa bakelit thuộc loại polime nào?',
    options: ['Polime nhiệt rắn', 'Polime nhiệt dẻo', 'Polime đàn hồi', 'Polime thiên nhiên'],
    correctAnswer: 'Polime nhiệt rắn',
    explanation: 'Nhựa bakelit (nhựa phenol-fomanđehit) là polime nhiệt rắn: khi nung nóng sẽ cứng lại, không nóng chảy được nữa.',
    hint: 'Không nóng chảy khi đun.'
  },
  {
    id: 31,
    category: 'chatdeo',
    type: 'multiple-choice',
    difficulty: 1,
    question: 'Polime nhiệt dẻo là polime có tính chất gì?',
    options: ['Nóng chảy khi đun, đông cứng khi nguội, có thể tái chế', 'Cứng lại khi đun nóng', 'Không thể tái chế', 'Phân hủy khi đun'],
    correctAnswer: 'Nóng chảy khi đun, đông cứng khi nguội, có thể tái chế',
    explanation: 'Polime nhiệt dẻo: nóng chảy khi đun, đông rắn khi nguội, có thể lặp lại nhiều lần → tái chế được. VD: PE, PP, PS.',
    hint: 'Có thể tái chế.'
  },
  {
    id: 32,
    category: 'chatdeo',
    type: 'fill-blank',
    difficulty: 2,
    question: 'Monome dùng để tổng hợp PVC là vinyl ___',
    correctAnswer: 'clorua',
    acceptedAnswers: ['clorua', 'chloride', 'clo'],
    explanation: 'PVC = Polivinyl clorua, được trùng hợp từ vinyl clorua CH₂=CHCl.',
    hint: 'PVC có chứa nguyên tử Cl.'
  },
  {
    id: 33,
    category: 'chatdeo',
    type: 'multiple-choice',
    difficulty: 3,
    question: 'Vật liệu compozit là gì?',
    options: ['Vật liệu tổ hợp từ polime với chất độn vô cơ hoặc hữu cơ', 'Polime nguyên chất', 'Kim loại', 'Hợp kim'],
    correctAnswer: 'Vật liệu tổ hợp từ polime với chất độn vô cơ hoặc hữu cơ',
    explanation: 'Compozit = polime nền + chất độn (sợi thủy tinh, sợi cacbon, bột kim loại...). VD: nhựa gia cường sợi thủy tinh.',
    hint: 'Hỗn hợp polime với chất khác.'
  },
  {
    id: 34,
    category: 'chatdeo',
    type: 'multiple-choice',
    difficulty: 2,
    question: 'Polistiren (PS) có ứng dụng chính nào?',
    options: ['Hộp xốp đựng thực phẩm, vỏ thiết bị điện', 'Lốp xe', 'Vải may mặc', 'Dây cáp điện'],
    correctAnswer: 'Hộp xốp đựng thực phẩm, vỏ thiết bị điện',
    explanation: 'PS có thể tạo xốp (styrofoam), dùng làm hộp đựng thực phẩm, xốp cách nhiệt, vỏ thiết bị điện tử.',
    hint: 'Dạng xốp phổ biến.'
  },
  {
    id: 35,
    category: 'chatdeo',
    type: 'multiple-choice',
    difficulty: 3,
    question: 'Teflon (PTFE) có đặc tính gì đặc biệt?',
    options: ['Bền nhiệt cao, chống dính, trơ hóa học', 'Dẫn điện tốt', 'Tan trong nước', 'Dễ phân hủy'],
    correctAnswer: 'Bền nhiệt cao, chống dính, trơ hóa học',
    explanation: 'Teflon (politetrafloetilen) rất bền nhiệt (đến 300°C), chống dính, trơ hóa học. Dùng tráng chảo, thiết bị hóa học.',
    hint: 'Dùng tráng chảo chống dính.'
  },
  {
    id: 36,
    category: 'chatdeo',
    type: 'fill-blank',
    difficulty: 3,
    question: 'Teflon (PTFE) được tổng hợp từ monome tetraflo___',
    correctAnswer: 'etilen',
    acceptedAnswers: ['etilen', 'etylen', 'ethylene'],
    explanation: 'PTFE = Politetrafloetilen, trùng hợp từ CF₂=CF₂ (tetrafloetilen).',
    hint: 'Gốc là etilen.'
  },

  // ========== TƠ VÀ CAO SU (12 câu) ==========
  {
    id: 37,
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
    id: 38,
    category: 'tovaocaosu',
    type: 'multiple-choice',
    difficulty: 2,
    question: 'Cao su thiên nhiên là polime của monome nào?',
    options: ['Isopren', 'Butađien', 'Stiren', 'Etilen'],
    correctAnswer: 'Isopren',
    explanation: 'Cao su thiên nhiên: (-CH₂-C(CH₃)=CH-CH₂-)n. Monome là isopren CH₂=C(CH₃)-CH=CH₂.',
    hint: 'Có nhóm CH₃ trong mắt xích.'
  },
  {
    id: 39,
    category: 'tovaocaosu',
    type: 'multiple-choice',
    difficulty: 2,
    question: 'Tơ nilon-6,6 được tổng hợp từ những monome nào?',
    options: ['Hexametylenđiamin và axit ađipic', 'Axit ε-aminocaproic', 'Etylen glicol và axit terephtalic', 'Caprolactam'],
    correctAnswer: 'Hexametylenđiamin và axit ađipic',
    explanation: 'Tơ nilon-6,6 = H₂N-(CH₂)₆-NH₂ + HOOC-(CH₂)₄-COOH. Số 6,6 chỉ số cacbon của 2 monome.',
    hint: 'Hai loại monome khác nhau.'
  },
  {
    id: 40,
    category: 'tovaocaosu',
    type: 'fill-blank',
    difficulty: 2,
    question: 'Tơ capron (nilon-6) được tổng hợp từ ___',
    correctAnswer: 'caprolactam',
    acceptedAnswers: ['caprolactam', 'ε-caprolactam', 'axit ε-aminocaproic'],
    explanation: 'Tơ capron = tơ nilon-6, trùng hợp hoặc trùng ngưng từ caprolactam hoặc axit ε-aminocaproic.',
    hint: 'Vòng lactam 6 cạnh.'
  },
  {
    id: 41,
    category: 'tovaocaosu',
    type: 'multiple-choice',
    difficulty: 1,
    question: 'Tơ nào sau đây là tơ thiên nhiên?',
    options: ['Tơ tằm, bông, len', 'Tơ nilon, tơ capron', 'Tơ visco', 'Tơ axetat'],
    correctAnswer: 'Tơ tằm, bông, len',
    explanation: 'Tơ thiên nhiên: có sẵn trong tự nhiên. Tơ tằm (protein), bông (xenlulozơ), len (protein từ lông cừu).',
    hint: 'Có sẵn trong tự nhiên.'
  },
  {
    id: 42,
    category: 'tovaocaosu',
    type: 'multiple-choice',
    difficulty: 2,
    question: 'Tơ visco thuộc loại tơ nào?',
    options: ['Tơ bán tổng hợp (nhân tạo)', 'Tơ tổng hợp', 'Tơ thiên nhiên', 'Tơ vô cơ'],
    correctAnswer: 'Tơ bán tổng hợp (nhân tạo)',
    explanation: 'Tơ visco: sản xuất từ xenlulozơ (gỗ, tre) qua xử lý hóa học → tơ bán tổng hợp.',
    hint: 'Xuất phát từ xenlulozơ thiên nhiên.'
  },
  {
    id: 43,
    category: 'tovaocaosu',
    type: 'multiple-choice',
    difficulty: 2,
    question: 'Cao su buna được tổng hợp từ monome nào?',
    options: ['Butađien-1,3', 'Isopren', 'Stiren', 'Acrilonitrin'],
    correctAnswer: 'Butađien-1,3',
    explanation: 'Cao su buna: trùng hợp butađien-1,3 với xúc tác Na: nCH₂=CH-CH=CH₂ → (-CH₂-CH=CH-CH₂-)n. Buna = Bu(tađien) + Na.',
    hint: 'Buna = Bu + Na.'
  },
  {
    id: 44,
    category: 'tovaocaosu',
    type: 'fill-blank',
    difficulty: 2,
    question: 'Quá trình đun nóng cao su với lưu huỳnh gọi là quá trình lưu ___',
    correctAnswer: 'hóa',
    acceptedAnswers: ['hóa', 'hoá'],
    explanation: 'Lưu hóa cao su: đun cao su với S ở 150°C. Các cầu -S-S- tạo liên kết ngang, cao su trở nên bền, đàn hồi hơn.',
    hint: 'Thêm lưu huỳnh vào cao su.'
  },
  {
    id: 45,
    category: 'tovaocaosu',
    type: 'multiple-choice',
    difficulty: 3,
    question: 'Tơ xenlulozơ axetat được điều chế bằng cách:',
    options: ['Este hóa xenlulozơ với anhiđrit axetic', 'Trùng ngưng axit axetic', 'Trùng hợp vinyl axetat', 'Thủy phân xenlulozơ'],
    correctAnswer: 'Este hóa xenlulozơ với anhiđrit axetic',
    explanation: 'Tơ xenlulozơ axetat: [C₆H₇O₂(OH)₃]n + 3n(CH₃CO)₂O → [C₆H₇O₂(OCOCH₃)₃]n + 3nCH₃COOH',
    hint: 'Phản ứng este hóa.'
  },
  {
    id: 46,
    category: 'tovaocaosu',
    type: 'multiple-choice',
    difficulty: 2,
    question: 'Tơ lapsan (PET) được tổng hợp từ những monome nào?',
    options: ['Etylen glicol và axit terephtalic', 'Hexametylenđiamin và axit ađipic', 'Axit ε-aminocaproic', 'Vinyl clorua'],
    correctAnswer: 'Etylen glicol và axit terephtalic',
    explanation: 'Tơ lapsan (polyeste) = HOCH₂-CH₂OH (etylen glicol) + HOOC-C₆H₄-COOH (axit terephtalic).',
    hint: 'Tơ polyeste.'
  },
  {
    id: 47,
    category: 'tovaocaosu',
    type: 'multiple-choice',
    difficulty: 3,
    question: 'Cao su isopren nhân tạo khác cao su thiên nhiên ở điểm nào?',
    options: ['Cấu hình cis-trans khác nhau', 'Công thức phân tử khác nhau', 'Monome khác nhau', 'Màu sắc khác nhau'],
    correctAnswer: 'Cấu hình cis-trans khác nhau',
    explanation: 'Cao su thiên nhiên: 100% đồng phân cis. Cao su isopren nhân tạo: hỗn hợp cis và trans → tính đàn hồi kém hơn.',
    hint: 'Về cấu trúc lập thể.'
  },
  {
    id: 48,
    category: 'tovaocaosu',
    type: 'fill-blank',
    difficulty: 3,
    question: 'Tơ nitron (olon) được trùng hợp từ monome ___ (CH₂=CH-CN)',
    correctAnswer: 'acrilonitrin',
    acceptedAnswers: ['acrilonitrin', 'acrylonitrin', 'acrylonitrile', 'vinyl xianua'],
    explanation: 'Tơ nitron = tơ acrylic, trùng hợp từ acrilonitrin CH₂=CH-CN.',
    hint: 'Có nhóm -CN.'
  }
];

// ================== PROGRESS WATERMARK ==================
function ProgressWatermark({ categoryProgress }) {
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
          const total = CHALLENGES.filter(c => c.category === cat.id).length;
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
  const [categoryProgress, setCategoryProgress] = useState({});
  const [highScore, setHighScore] = useState(0);
  const [hasStartedNewGame, setHasStartedNewGame] = useState(false);
  const [gameInProgress, setGameInProgress] = useState(false);
  const [totalCorrectAnswers, setTotalCorrectAnswers] = useState(0);
  const [totalScore, setTotalScore] = useState(0);

  // ========== CHALLENGE PROGRESS ==========
  const { hasProgress, savedProgress, saveProgress, clearProgress, completeChallenge } = useChallengeProgress('polime_12', {
    challengeId: 4,
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
                    (currentQuestion.acceptedAnswers && currentQuestion.acceptedAnswers.some(a => a.toLowerCase() === answer.toLowerCase()));
    
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
                <span>Đã hoàn thành: <strong>{Object.values(categoryProgress).filter(p => p >= 80).length}/{CATEGORIES.length}</strong></span>
              </div>
              <div className="stat-item-polime">
                <Award className="w-5 h-5 text-yellow-400" />
                <span>Điểm cao nhất: <strong>{highScore || 0}</strong></span>
              </div>
            </div>

            {/* Progress Watermark */}
            <ProgressWatermark categoryProgress={categoryProgress} />

            <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <Target className="w-6 h-6" />
              Chọn chủ đề thử thách
            </h2>

            <div className="category-grid-polime">
              {CATEGORIES.map((cat) => {
                const Icon = cat.icon;
                const catPercentage = categoryProgress[cat.id] || 0;
                const isCompleted = catPercentage >= 80;
                const hasProgress = catPercentage > 0 && catPercentage < 80;
                
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
                    {Math.min(100, Math.round((score / (filteredQuestions.length * 20)) * 100))}%
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
