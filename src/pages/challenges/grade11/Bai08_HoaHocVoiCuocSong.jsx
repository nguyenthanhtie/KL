import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowLeft, Trophy, RotateCcw, ChevronRight,
  CheckCircle2, XCircle, Lightbulb, Zap, Award,
  Leaf, Battery, Layers, HeartPulse, Globe,
  Clock, Target, AlertTriangle, Recycle
} from 'lucide-react';
import useChallengeProgress from '../../../hooks/useChallengeProgress';
import ResumeDialog from '../../../components/ResumeDialog';
import './CSS/Bai08_HoaHocVoiCuocSong.css';

// ================== DATA - HÓA HỌC VỚI CUỘC SỐNG ==================
const CATEGORIES = [
  {
    id: 'environment',
    name: 'Hóa học & Môi trường',
    icon: Leaf,
    color: '#22c55e',
    description: 'Ô nhiễm, xử lý chất thải, hóa học xanh',
    bgGradient: 'from-green-500 to-emerald-500'
  },
  {
    id: 'energy',
    name: 'Năng lượng & Nhiên liệu',
    icon: Battery,
    color: '#eab308',
    description: 'Nhiên liệu hóa thạch, năng lượng tái tạo',
    bgGradient: 'from-yellow-500 to-amber-500'
  },
  {
    id: 'materials',
    name: 'Vật liệu mới',
    icon: Layers,
    color: '#3b82f6',
    description: 'Polime, compozit, vật liệu nano',
    bgGradient: 'from-blue-500 to-indigo-500'
  },
  {
    id: 'health',
    name: 'Hóa học & Sức khỏe',
    icon: HeartPulse,
    color: '#ef4444',
    description: 'Thuốc, thực phẩm, an toàn vệ sinh',
    bgGradient: 'from-red-500 to-rose-500'
  }
];

// Bộ câu hỏi tĩnh
const CHALLENGES = [
  // ========== HÓA HỌC & MÔI TRƯỜNG (10 câu) ==========
  {
    id: 1,
    category: 'environment',
    type: 'multiple-choice',
    difficulty: 1,
    question: 'Khí nào sau đây là nguyên nhân chính gây ra hiệu ứng nhà kính?',
    options: ['N2', 'O2', 'CO2', 'H2'],
    correctAnswer: 'CO2',
    explanation: 'CO2 (Cacbon đioxit) là khí nhà kính chính, giữ nhiệt trong khí quyển và gây nóng lên toàn cầu.',
    hint: 'Sinh ra khi đốt cháy nhiên liệu.'
  },
  {
    id: 2,
    category: 'environment',
    type: 'multiple-choice',
    difficulty: 2,
    question: 'Mưa axit chủ yếu do các khí nào gây ra?',
    options: ['CO2 và CO', 'SO2 và NOx', 'CH4 và NH3', 'H2S và Cl2'],
    correctAnswer: 'SO2 và NOx',
    explanation: 'SO2 và các oxit nitơ (NOx) phản ứng với nước trong khí quyển tạo thành axit H2SO4 và HNO3, gây mưa axit.',
    hint: 'Oxit của lưu huỳnh và nitơ.'
  },
  {
    id: 3,
    category: 'environment',
    type: 'fill-blank',
    difficulty: 2,
    question: 'Nguyên tắc của Hóa học ___ là giảm thiểu chất thải và sử dụng nguyên liệu tái tạo.',
    correctAnswer: 'xanh',
    acceptedAnswers: ['xanh', 'green'],
    explanation: 'Hóa học xanh (Green Chemistry) hướng tới thiết kế các sản phẩm và quy trình giảm thiểu việc sử dụng và sinh ra các chất độc hại.',
    hint: 'Màu của lá cây.'
  },
  {
    id: 4,
    category: 'environment',
    type: 'multiple-choice',
    difficulty: 2,
    question: 'Khí CFC (Chlorofluorocarbons) gây ra tác hại gì cho môi trường?',
    options: ['Gây mưa axit', 'Phá hủy tầng ozon', 'Gây ô nhiễm nguồn nước', 'Gây ô nhiễm đất'],
    correctAnswer: 'Phá hủy tầng ozon',
    explanation: 'CFC phân hủy dưới tác dụng của tia UV tạo ra gốc Cl tự do, phá hủy O3 trong tầng ozon bảo vệ Trái Đất.',
    hint: 'Lớp bảo vệ trong khí quyển.'
  },
  {
    id: 5,
    category: 'environment',
    type: 'multiple-choice',
    difficulty: 1,
    question: 'Hiện tượng phú dưỡng hóa nguồn nước chủ yếu do nguyên nhân nào?',
    options: ['Xả dầu thải', 'Dư thừa phân bón N, P', 'Xả chất phóng xạ', 'Nhiệt độ nước tăng'],
    correctAnswer: 'Dư thừa phân bón N, P',
    explanation: 'Phú dưỡng hóa xảy ra khi nước dư thừa các chất dinh dưỡng (N, P) từ phân bón, gây tảo nở hoa, làm cạn kiệt oxy.',
    hint: 'Liên quan đến nông nghiệp.'
  },
  {
    id: 6,
    category: 'environment',
    type: 'multiple-choice',
    difficulty: 3,
    question: 'Phương pháp xử lý nước thải nào sử dụng vi sinh vật phân hủy chất hữu cơ?',
    options: ['Phương pháp cơ học', 'Phương pháp hóa học', 'Phương pháp sinh học', 'Phương pháp vật lý'],
    correctAnswer: 'Phương pháp sinh học',
    explanation: 'Phương pháp sinh học sử dụng vi sinh vật (vi khuẩn, nấm) để phân hủy các chất hữu cơ trong nước thải.',
    hint: 'Dùng sinh vật sống.'
  },
  {
    id: 7,
    category: 'environment',
    type: 'fill-blank',
    difficulty: 2,
    question: 'Khí ___ (CH4) là một trong những khí nhà kính có hiệu ứng mạnh hơn CO2.',
    correctAnswer: 'metan',
    acceptedAnswers: ['metan', 'methane', 'CH4'],
    explanation: 'Metan có hiệu ứng nhà kính mạnh gấp 25 lần CO2, sinh ra từ chăn nuôi, bãi rác và khai thác nhiên liệu hóa thạch.',
    hint: 'Khí biogas.'
  },
  {
    id: 8,
    category: 'environment',
    type: 'multiple-choice',
    difficulty: 2,
    question: 'Chất nào được dùng để khử trùng nước sinh hoạt phổ biến nhất?',
    options: ['NaCl', 'Cl2', 'NaOH', 'H2SO4'],
    correctAnswer: 'Cl2',
    explanation: 'Clo (Cl2) có tính oxi hóa mạnh, diệt khuẩn hiệu quả, được dùng phổ biến để khử trùng nước sinh hoạt.',
    hint: 'Nguyên tố halogen.'
  },
  {
    id: 9,
    category: 'environment',
    type: 'multiple-choice',
    difficulty: 3,
    question: 'Trong xử lý ô nhiễm kim loại nặng, phương pháp nào thường được sử dụng?',
    options: ['Kết tủa dạng hidroxit', 'Đốt cháy', 'Bay hơi', 'Lọc cơ học'],
    correctAnswer: 'Kết tủa dạng hidroxit',
    explanation: 'Kim loại nặng được kết tủa dưới dạng hidroxit hoặc sunfua không tan, sau đó lắng đọng và loại bỏ khỏi nước thải.',
    hint: 'Tạo chất không tan.'
  },
  {
    id: 10,
    category: 'environment',
    type: 'fill-blank',
    difficulty: 1,
    question: 'Ô nhiễm không khí do bụi mịn được ký hiệu là PM___',
    correctAnswer: '2.5',
    acceptedAnswers: ['2.5', '2,5'],
    explanation: 'PM2.5 là bụi mịn có đường kính nhỏ hơn 2,5 micromet, có thể xâm nhập sâu vào phổi và máu, rất nguy hại.',
    hint: 'Số thập phân nhỏ hơn 3.'
  },

  // ========== NĂNG LƯỢNG & NHIÊN LIỆU (10 câu) ==========
  {
    id: 11,
    category: 'energy',
    type: 'multiple-choice',
    difficulty: 1,
    question: 'Nguồn năng lượng nào sau đây là năng lượng tái tạo?',
    options: ['Than đá', 'Dầu mỏ', 'Khí tự nhiên', 'Năng lượng mặt trời'],
    correctAnswer: 'Năng lượng mặt trời',
    explanation: 'Năng lượng mặt trời, gió, thủy điện là các nguồn năng lượng tái tạo. Than đá, dầu mỏ là nhiên liệu hóa thạch (không tái tạo).',
    hint: 'Đến từ ánh sáng.'
  },
  {
    id: 12,
    category: 'energy',
    type: 'multiple-choice',
    difficulty: 2,
    question: 'Xăng sinh học E5 chứa 5% thể tích là chất nào?',
    options: ['Metanol', 'Etanol', 'Propanol', 'Butanol'],
    correctAnswer: 'Etanol',
    explanation: 'Xăng E5 chứa 95% xăng khoáng và 5% etanol (cồn sinh học).',
    hint: 'C2H5OH.'
  },
  {
    id: 13,
    category: 'energy',
    type: 'fill-blank',
    difficulty: 3,
    question: 'Pin nhiên liệu (Fuel Cell) hoạt động dựa trên phản ứng oxi hóa ___ để sinh điện.',
    correctAnswer: 'hidro',
    acceptedAnswers: ['hidro', 'hydro', 'hydrogen', 'H2'],
    explanation: 'Pin nhiên liệu hydro sử dụng phản ứng giữa Hidro và Oxi để tạo ra điện năng và nước, không gây ô nhiễm.',
    hint: 'Nguyên tố nhẹ nhất.'
  },
  {
    id: 14,
    category: 'energy',
    type: 'multiple-choice',
    difficulty: 2,
    question: 'Khí hóa lỏng (LPG) sử dụng trong sinh hoạt chủ yếu gồm các khí nào?',
    options: ['H2 và O2', 'CO và CO2', 'C3H8 và C4H10', 'N2 và O2'],
    correctAnswer: 'C3H8 và C4H10',
    explanation: 'LPG (Liquefied Petroleum Gas) chủ yếu là hỗn hợp propan (C3H8) và butan (C4H10).',
    hint: 'Hai ankan liền kề.'
  },
  {
    id: 15,
    category: 'energy',
    type: 'multiple-choice',
    difficulty: 1,
    question: 'Chỉ số octan của xăng biểu thị tính chất gì?',
    options: ['Nhiệt độ sôi', 'Khả năng chống kích nổ', 'Độ nhớt', 'Mật độ'],
    correctAnswer: 'Khả năng chống kích nổ',
    explanation: 'Chỉ số octan càng cao, xăng càng chống kích nổ tốt, động cơ hoạt động êm và hiệu quả hơn.',
    hint: 'Liên quan đến động cơ xăng.'
  },
  {
    id: 16,
    category: 'energy',
    type: 'multiple-choice',
    difficulty: 3,
    question: 'Biodiesel được sản xuất từ nguyên liệu nào?',
    options: ['Dầu mỏ', 'Than đá', 'Dầu thực vật hoặc mỡ động vật', 'Khí tự nhiên'],
    correctAnswer: 'Dầu thực vật hoặc mỡ động vật',
    explanation: 'Biodiesel được điều chế bằng phản ứng este hóa dầu thực vật hoặc mỡ động vật với metanol.',
    hint: 'Nguồn gốc sinh học.'
  },
  {
    id: 17,
    category: 'energy',
    type: 'fill-blank',
    difficulty: 2,
    question: 'Dầu diesel có chỉ số ___ để đánh giá khả năng tự cháy.',
    correctAnswer: 'cetan',
    acceptedAnswers: ['cetan', 'cetane'],
    explanation: 'Chỉ số cetan đánh giá khả năng tự bốc cháy của dầu diesel. Chỉ số cao thì động cơ khởi động dễ, ít ồn.',
    hint: 'Tương tự octan nhưng cho diesel.'
  },
  {
    id: 18,
    category: 'energy',
    type: 'multiple-choice',
    difficulty: 2,
    question: 'Năng lượng hạt nhân được sinh ra từ phản ứng nào?',
    options: ['Phản ứng oxi hóa - khử', 'Phản ứng phân hạch hoặc nhiệt hạch', 'Phản ứng axit - bazơ', 'Phản ứng kết tủa'],
    correctAnswer: 'Phản ứng phân hạch hoặc nhiệt hạch',
    explanation: 'Năng lượng hạt nhân sinh ra từ phản ứng phân hạch (tách hạt nhân nặng) hoặc nhiệt hạch (tổng hợp hạt nhân nhẹ).',
    hint: 'Liên quan đến hạt nhân nguyên tử.'
  },
  {
    id: 19,
    category: 'energy',
    type: 'multiple-choice',
    difficulty: 1,
    question: 'Khí thiên nhiên (natural gas) thành phần chính là khí gì?',
    options: ['H2', 'CO2', 'CH4', 'N2'],
    correctAnswer: 'CH4',
    explanation: 'Khí thiên nhiên chủ yếu là metan (CH4), chiếm khoảng 70-90%, là nhiên liệu sạch hơn than và dầu.',
    hint: 'Ankan đơn giản nhất.'
  },
  {
    id: 20,
    category: 'energy',
    type: 'fill-blank',
    difficulty: 3,
    question: 'Hiệu suất của động cơ nhiệt bị giới hạn bởi định luật nhiệt động lực học thứ ___.',
    correctAnswer: 'hai',
    acceptedAnswers: ['hai', '2', 'II'],
    explanation: 'Định luật nhiệt động lực học thứ hai cho thấy không thể có động cơ nhiệt hiệu suất 100%, luôn có năng lượng thất thoát.',
    hint: 'Số sau số một.'
  },

  // ========== VẬT LIỆU MỚI (10 câu) ==========
  {
    id: 21,
    category: 'materials',
    type: 'multiple-choice',
    difficulty: 2,
    question: 'Vật liệu Compozit là gì?',
    options: ['Một kim loại tinh khiết', 'Hợp kim của sắt', 'Vật liệu tổ hợp từ hai hay nhiều vật liệu khác nhau', 'Một loại nhựa dẻo'],
    correctAnswer: 'Vật liệu tổ hợp từ hai hay nhiều vật liệu khác nhau',
    explanation: 'Compozit là vật liệu được tổ hợp từ ít nhất hai loại vật liệu khác nhau nhằm tạo ra vật liệu mới có tính chất ưu việt hơn.',
    hint: 'Kết hợp nhiều thành phần.'
  },
  {
    id: 22,
    category: 'materials',
    type: 'multiple-choice',
    difficulty: 3,
    question: 'Vật liệu Nano có kích thước trong khoảng nào?',
    options: ['1 - 100 mm', '1 - 100 μm', '1 - 100 nm', '1 - 100 pm'],
    correctAnswer: '1 - 100 nm',
    explanation: 'Vật liệu nano là vật liệu có cấu trúc hạt ở kích thước nanomet (1 nm = 10^-9 m), thường từ 1 đến 100 nm.',
    hint: 'Nanomet.'
  },
  {
    id: 23,
    category: 'materials',
    type: 'fill-blank',
    difficulty: 2,
    question: 'Tơ nilon-6,6 thuộc loại tơ ___',
    correctAnswer: 'tổng hợp',
    acceptedAnswers: ['tổng hợp', 'poliamit'],
    explanation: 'Tơ nilon-6,6 là tơ tổng hợp, được điều chế từ hexametylenđiamin và axit ađipic.',
    hint: 'Do con người tạo ra hoàn toàn.'
  },
  {
    id: 24,
    category: 'materials',
    type: 'multiple-choice',
    difficulty: 2,
    question: 'Polime nào được dùng làm ống dẫn nước, vỏ dây điện phổ biến nhất?',
    options: ['Polietilen (PE)', 'Poli(vinyl clorua) (PVC)', 'Polistiren (PS)', 'Polipropilen (PP)'],
    correctAnswer: 'Poli(vinyl clorua) (PVC)',
    explanation: 'PVC có tính cách điện tốt, bền với nước và hóa chất, giá rẻ nên được dùng rộng rãi làm ống nước và vỏ dây điện.',
    hint: 'Chứa clo trong phân tử.'
  },
  {
    id: 25,
    category: 'materials',
    type: 'multiple-choice',
    difficulty: 1,
    question: 'Cao su lưu hóa khác cao su thường ở điểm nào?',
    options: ['Có thêm clo', 'Có cầu nối lưu huỳnh giữa các mạch', 'Mềm hơn', 'Tan trong nước'],
    correctAnswer: 'Có cầu nối lưu huỳnh giữa các mạch',
    explanation: 'Lưu hóa cao su tạo các cầu nối -S-S- giữa các mạch polime, làm cao su đàn hồi tốt hơn, bền hơn với nhiệt và hóa chất.',
    hint: 'Nguyên tố S.'
  },
  {
    id: 26,
    category: 'materials',
    type: 'multiple-choice',
    difficulty: 3,
    question: 'Ống nano cacbon (carbon nanotube) có tính chất đặc biệt gì?',
    options: ['Dẫn điện kém', 'Độ bền cơ học rất cao', 'Dễ bị ăn mòn', 'Nặng hơn thép'],
    correctAnswer: 'Độ bền cơ học rất cao',
    explanation: 'Ống nano cacbon có độ bền kéo gấp ~100 lần thép nhưng nhẹ hơn nhiều, dẫn điện và nhiệt tốt.',
    hint: 'Siêu bền.'
  },
  {
    id: 27,
    category: 'materials',
    type: 'fill-blank',
    difficulty: 2,
    question: 'Sợi quang học được làm từ vật liệu ___ có độ tinh khiết rất cao.',
    correctAnswer: 'thủy tinh',
    acceptedAnswers: ['thủy tinh', 'silica', 'SiO2'],
    explanation: 'Sợi quang được làm từ thủy tinh siêu tinh khiết (SiO2), truyền ánh sáng với tổn hao rất nhỏ.',
    hint: 'Vật liệu trong suốt phổ biến.'
  },
  {
    id: 28,
    category: 'materials',
    type: 'multiple-choice',
    difficulty: 2,
    question: 'Vật liệu siêu dẫn có tính chất đặc biệt gì?',
    options: ['Điện trở rất cao', 'Điện trở bằng 0', 'Không dẫn nhiệt', 'Tan chảy ở nhiệt độ thường'],
    correctAnswer: 'Điện trở bằng 0',
    explanation: 'Vật liệu siêu dẫn có điện trở bằng 0 dưới nhiệt độ tới hạn, cho phép dòng điện chạy không tổn hao.',
    hint: 'Không có sự cản trở.'
  },
  {
    id: 29,
    category: 'materials',
    type: 'multiple-choice',
    difficulty: 1,
    question: 'Tơ tằm là loại tơ gì?',
    options: ['Tơ tổng hợp', 'Tơ bán tổng hợp', 'Tơ thiên nhiên', 'Tơ nhân tạo'],
    correctAnswer: 'Tơ thiên nhiên',
    explanation: 'Tơ tằm là tơ thiên nhiên, có bản chất protein (fibroin), do con tằm nhả ra để tạo kén.',
    hint: 'Từ động vật.'
  },
  {
    id: 30,
    category: 'materials',
    type: 'fill-blank',
    difficulty: 3,
    question: 'Vật liệu compozit dùng trong máy bay thường có nền là ___ gia cường bằng sợi cacbon.',
    correctAnswer: 'epoxy',
    acceptedAnswers: ['epoxy', 'nhựa epoxy', 'epoxi'],
    explanation: 'Compozit sợi cacbon/epoxy có độ bền cao, nhẹ, được dùng nhiều trong hàng không vũ trụ.',
    hint: 'Một loại nhựa nhiệt rắn.'
  },

  // ========== HÓA HỌC & SỨC KHỎE (12 câu) ==========
  {
    id: 31,
    category: 'health',
    type: 'multiple-choice',
    difficulty: 1,
    question: 'Vitamin C có tên hóa học là gì?',
    options: ['Axit axetic', 'Axit ascorbic', 'Axit citric', 'Axit lactic'],
    correctAnswer: 'Axit ascorbic',
    explanation: 'Vitamin C là tên thông thường của axit ascorbic, có vai trò quan trọng trong tăng cường hệ miễn dịch.',
    hint: 'Bắt đầu bằng chữ A.'
  },
  {
    id: 32,
    category: 'health',
    type: 'multiple-choice',
    difficulty: 2,
    question: 'Chất gây nghiện có trong thuốc lá là...',
    options: ['Caffeine', 'Nicotine', 'Morphine', 'Aspirin'],
    correctAnswer: 'Nicotine',
    explanation: 'Nicotine là chất ancaloit có trong cây thuốc lá, gây nghiện và ảnh hưởng xấu đến tim mạch, phổi.',
    hint: 'Bắt đầu bằng chữ N.'
  },
  {
    id: 33,
    category: 'health',
    type: 'fill-blank',
    difficulty: 2,
    question: 'Bột ngọt (mì chính) là muối natri của axit ___',
    correctAnswer: 'glutamic',
    acceptedAnswers: ['glutamic'],
    explanation: 'Mì chính là mononatri glutamat, muối của axit glutamic (một loại amino axit).',
    hint: 'Một loại amino axit.'
  },
  {
    id: 34,
    category: 'health',
    type: 'multiple-choice',
    difficulty: 1,
    question: 'Thuốc giảm đau Aspirin có công thức nào?',
    options: ['CH3COOH', 'C9H8O4', 'C2H5OH', 'C6H12O6'],
    correctAnswer: 'C9H8O4',
    explanation: 'Aspirin (axit axetylsalixylic) có công thức C9H8O4, là thuốc giảm đau, hạ sốt, chống viêm phổ biến.',
    hint: 'Công thức phân tử phức tạp nhất.'
  },
  {
    id: 35,
    category: 'health',
    type: 'multiple-choice',
    difficulty: 2,
    question: 'Chất bảo quản thực phẩm E211 là chất gì?',
    options: ['Natri clorua', 'Natri benzoat', 'Natri axetat', 'Natri cacbonat'],
    correctAnswer: 'Natri benzoat',
    explanation: 'Natri benzoat (E211) là chất bảo quản thực phẩm phổ biến, ức chế sự phát triển của nấm mốc và vi khuẩn.',
    hint: 'Muối của axit benzoic.'
  },
  {
    id: 36,
    category: 'health',
    type: 'multiple-choice',
    difficulty: 3,
    question: 'Chất nào sau đây là kháng sinh tự nhiên đầu tiên được phát hiện?',
    options: ['Streptomycin', 'Penicillin', 'Tetracyclin', 'Ampicillin'],
    correctAnswer: 'Penicillin',
    explanation: 'Penicillin được Alexander Fleming phát hiện năm 1928 từ nấm mốc Penicillium, là kháng sinh đầu tiên.',
    hint: 'Từ nấm Penicillium.'
  },
  {
    id: 37,
    category: 'health',
    type: 'fill-blank',
    difficulty: 2,
    question: 'Vitamin ___ (retinol) cần thiết cho thị lực và da khỏe mạnh.',
    correctAnswer: 'A',
    acceptedAnswers: ['A', 'a'],
    explanation: 'Vitamin A (retinol) cần cho thị lực, đặc biệt nhìn trong ánh sáng yếu, và duy trì da, niêm mạc khỏe mạnh.',
    hint: 'Chữ cái đầu tiên.'
  },
  {
    id: 38,
    category: 'health',
    type: 'multiple-choice',
    difficulty: 2,
    question: 'Chất độc trong khoai tây mọc mầm là gì?',
    options: ['Aflatoxin', 'Solanin', 'Capsaicin', 'Caffeine'],
    correctAnswer: 'Solanin',
    explanation: 'Solanin là ancaloit độc tích tụ trong khoai tây mọc mầm, vỏ xanh, gây ngộ độc nếu ăn nhiều.',
    hint: 'Từ họ cà (Solanum).'
  },
  {
    id: 39,
    category: 'health',
    type: 'multiple-choice',
    difficulty: 1,
    question: 'I-ốt được bổ sung vào muối ăn nhằm mục đích gì?',
    options: ['Tăng vị mặn', 'Phòng bệnh bướu cổ', 'Bảo quản muối', 'Tạo màu trắng'],
    correctAnswer: 'Phòng bệnh bướu cổ',
    explanation: 'I-ốt cần cho tuyến giáp sản xuất hormone. Thiếu i-ốt gây bướu cổ, vì vậy muối được bổ sung KI hoặc KIO3.',
    hint: 'Liên quan đến tuyến giáp.'
  },
  {
    id: 40,
    category: 'health',
    type: 'fill-blank',
    difficulty: 3,
    question: 'Chất ___ trong rượu bia gây say và ảnh hưởng đến hệ thần kinh.',
    correctAnswer: 'etanol',
    acceptedAnswers: ['etanol', 'ethanol', 'cồn', 'C2H5OH'],
    explanation: 'Etanol (C2H5OH) trong rượu bia tác động lên hệ thần kinh trung ương, gây say, lạm dụng lâu dài gây tổn thương gan.',
    hint: 'Rượu etylic.'
  },
  {
    id: 41,
    category: 'health',
    type: 'multiple-choice',
    difficulty: 2,
    question: 'Chất tạo ngọt nhân tạo nào có độ ngọt gấp 200-300 lần đường saccarozơ?',
    options: ['Glucozơ', 'Aspartam', 'Fructozơ', 'Mantozơ'],
    correctAnswer: 'Aspartam',
    explanation: 'Aspartam (E951) là chất tạo ngọt nhân tạo, ngọt gấp 200-300 lần đường, dùng trong thực phẩm ít calo.',
    hint: 'Chất tạo ngọt E951.'
  },
  {
    id: 42,
    category: 'health',
    type: 'multiple-choice',
    difficulty: 3,
    question: 'Formaldehyde (HCHO) được dùng bất hợp pháp trong thực phẩm gây hại gì?',
    options: ['Tăng cân', 'Gây ung thư', 'Thiếu vitamin', 'Dị ứng nhẹ'],
    correctAnswer: 'Gây ung thư',
    explanation: 'Formaldehyde là chất gây ung thư nhóm 1 (IARC). Việc dùng trong thực phẩm là bất hợp pháp và rất nguy hiểm.',
    hint: 'Tác hại nghiêm trọng nhất.'
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

const Bai08_HoaHocVoiCuocSong = () => {
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
  const [gameInProgress, setGameInProgress] = useState(false);
  const [totalCorrectAnswers, setTotalCorrectAnswers] = useState(0);
  const [totalScore, setTotalScore] = useState(0);

  const { hasProgress, savedProgress, saveProgress, clearProgress, completeChallenge } = useChallengeProgress('hoa_hoc_cuoc_song_11', {
    challengeId: 8,
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
    <div className="life-chem-bg min-h-screen p-4 md:p-8 font-sans">
      <div className="max-w-6xl mx-auto">
        {/* HEADER */}
        <header className="flex items-center justify-between mb-8 bg-white/10 backdrop-blur rounded-2xl p-4 border border-white/20">
          <div className="flex items-center gap-4">
            <Link to="/hoahoc/11" className="p-2 hover:bg-white/10 rounded-full transition-colors text-white">
              <ArrowLeft className="w-6 h-6" />
            </Link>
            <div>
              <h1 className="text-2xl font-bold text-white">
                Hóa học với Cuộc sống
              </h1>
              <p className="text-orange-100 text-sm">Hóa học 11 • Chuyên đề thực tiễn</p>
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
            <div className="stats-bar-life mb-8">
              <div className="stat-item-life">
                <CheckCircle2 className="w-5 h-5 text-green-400" />
                <span>Đã hoàn thành: <strong>{Object.values(categoryProgress).filter(p => p >= 80).length}/{CATEGORIES.length}</strong></span>
              </div>
              <div className="stat-item-life">
                <Award className="w-5 h-5 text-yellow-400" />
                <span>Điểm cao nhất: <strong>{highScore || 0}</strong></span>
              </div>
            </div>

            {/* Progress Watermark */}
            <ProgressWatermark categoryProgress={categoryProgress} challenges={CHALLENGES} />

            <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <Globe className="w-6 h-6" />
              Chọn chủ đề khám phá
            </h2>

            <div className="category-grid-life">
              {CATEGORIES.map((cat) => {
                const Icon = cat.icon;
                const catPercentage = categoryProgress[cat.id] || 0;
                const isCompleted = catPercentage >= 80;
                const hasProgress = catPercentage > 0 && catPercentage < 80;
                
                return (
                  <div 
                    key={cat.id}
                    onClick={() => handleCategorySelect(cat.id)}
                    className="category-card-life group"
                  >
                    <div className={`category-icon-wrapper-life ${isCompleted ? 'bg-green-500/20 text-green-400' : ''}`}>
                      <Icon className="w-8 h-8" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-white mb-1 group-hover:text-orange-300 transition-colors">
                        {cat.name}
                      </h3>
                      <p className="text-sm text-orange-100 mb-3">{cat.description}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-semibold px-2 py-1 rounded bg-white/10 text-orange-100">
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

            <div className="progress-track-life mb-6">
              <div 
                className="progress-fill-life"
                style={{ width: `${((currentQuestionIndex) / filteredQuestions.length) * 100}%` }}
              />
            </div>

            <div className="question-card-life">
              <div className="question-header-life">
                <span className={`difficulty-badge-life ${
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

              <h3 className="text-xl md:text-2xl font-bold text-gray-800 mb-6 leading-relaxed">
                {currentQuestion.question}
              </h3>

              {currentQuestion.type === 'multiple-choice' ? (
                <div className="options-grid-life">
                  {currentQuestion.options.map((option, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleAnswerSubmit(option)}
                      disabled={isCorrect !== null}
                      className={`option-btn-life ${
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
                      className="flex-1 p-4 bg-gray-50 border border-gray-300 rounded-xl text-lg text-gray-800 focus:border-orange-500 focus:outline-none"
                      onKeyDown={(e) => e.key === 'Enter' && handleAnswerSubmit(selectedAnswer)}
                    />
                    <button
                      onClick={() => handleAnswerSubmit(selectedAnswer)}
                      disabled={!selectedAnswer || isCorrect !== null}
                      className="px-6 py-2 bg-orange-600 text-white rounded-xl font-bold hover:bg-orange-700 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Kiểm tra
                    </button>
                  </div>
                </div>
              )}

              {showExplanation && (
                <div className={`feedback-container-life ${isCorrect ? 'feedback-correct' : 'feedback-wrong'}`}>
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
                      className="flex items-center gap-2 px-6 py-2 bg-gray-800 text-white rounded-lg font-bold hover:bg-gray-700 transition-colors"
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
              <p className="text-orange-100 mb-8">Bạn đã hoàn thành chủ đề {CATEGORIES.find(c => c.id === activeCategory)?.name}</p>
              
              <div className="grid grid-cols-3 gap-4 mb-8">
                <div className="p-4 bg-white/5 rounded-2xl border border-white/10">
                  <div className="text-sm text-orange-100 mb-1">Điểm số</div>
                  <div className="text-2xl font-bold text-green-400">{score}</div>
                </div>
                <div className="p-4 bg-white/5 rounded-2xl border border-white/10">
                  <div className="text-sm text-orange-100 mb-1">Đúng</div>
                  <div className="text-2xl font-bold text-blue-400">
                    {Math.min(100, Math.round((score / (filteredQuestions.length * 20)) * 100))}%
                  </div>
                </div>
                <div className="p-4 bg-white/5 rounded-2xl border border-white/10">
                  <div className="text-sm text-orange-100 mb-1">Thời gian</div>
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
                  className="flex items-center gap-2 px-6 py-3 bg-orange-600 text-white rounded-xl font-bold hover:bg-orange-700 transition-colors shadow-lg shadow-orange-500/30"
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

export default Bai08_HoaHocVoiCuocSong;
