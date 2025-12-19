import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowLeft, Trophy, RotateCcw, ChevronRight,
  CheckCircle2, XCircle, Lightbulb, Zap, Award,
  FlaskConical, Hammer, Battery, Shield, Atom,
  Clock, Target, AlertTriangle, Flame
} from 'lucide-react';
import useChallengeProgress from '../../../../hooks/useChallengeProgress';
import ResumeDialog from '../../../../components/ResumeDialog';
import './CSS/Bai05_DaiCuongKimLoai.css';

// ================== DATA - ĐẠI CƯƠNG KIM LOẠI ==================
const CATEGORIES = [
  {
    id: 'cautao',
    name: 'Cấu tạo & Tính chất vật lý',
    icon: Atom,
    color: '#60a5fa',
    description: 'Vị trí, cấu tạo nguyên tử, tinh thể, tính chất vật lý chung',
    bgGradient: 'from-blue-400 to-cyan-400'
  },
  {
    id: 'tinhchathoahoc',
    name: 'Tính chất hóa học',
    icon: FlaskConical,
    color: '#f87171',
    description: 'Tác dụng với phi kim, axit, muối, nước',
    bgGradient: 'from-red-400 to-rose-400'
  },
  {
    id: 'daydienhoa',
    name: 'Dãy điện hóa',
    icon: Battery,
    color: '#fbbf24',
    description: 'Cặp oxi hóa - khử, quy tắc alpha, pin điện hóa',
    bgGradient: 'from-amber-400 to-yellow-400'
  },
  {
    id: 'anmon',
    name: 'Ăn mòn & Điều chế',
    icon: Shield,
    color: '#34d399',
    description: 'Ăn mòn hóa học, điện hóa, các phương pháp điều chế',
    bgGradient: 'from-emerald-400 to-green-400'
  }
];

const CHALLENGES = [
  // ========== CẤU TẠO & TÍNH CHẤT VẬT LÝ (12 câu) ==========
  {
    id: 1,
    category: 'cautao',
    type: 'multiple-choice',
    difficulty: 1,
    question: 'Ở nhiệt độ thường, kim loại nào sau đây ở trạng thái lỏng?',
    options: ['Thủy ngân (Hg)', 'Sắt (Fe)', 'Đồng (Cu)', 'Nhôm (Al)'],
    correctAnswer: 'Thủy ngân (Hg)',
    explanation: 'Thủy ngân (Hg) là kim loại duy nhất ở trạng thái lỏng ở điều kiện thường.',
    hint: 'Dùng trong nhiệt kế.'
  },
  {
    id: 2,
    category: 'cautao',
    type: 'multiple-choice',
    difficulty: 1,
    question: 'Kim loại có tính dẫn điện tốt nhất là...',
    options: ['Bạc (Ag)', 'Đồng (Cu)', 'Vàng (Au)', 'Nhôm (Al)'],
    correctAnswer: 'Bạc (Ag)',
    explanation: 'Thứ tự dẫn điện giảm dần: Ag > Cu > Au > Al > Fe.',
    hint: 'Ag > Cu > Au.'
  },
  {
    id: 3,
    category: 'cautao',
    type: 'multiple-choice',
    difficulty: 1,
    question: 'Kim loại cứng nhất là...',
    options: ['Crom (Cr)', 'Vonfram (W)', 'Sắt (Fe)', 'Kim cương'],
    correctAnswer: 'Crom (Cr)',
    explanation: 'Crom (Cr) là kim loại cứng nhất, có thể rạch được thủy tinh. Kim cương cứng nhất nhưng không phải kim loại.',
    hint: 'Ký hiệu Cr.'
  },
  {
    id: 4,
    category: 'cautao',
    type: 'multiple-choice',
    difficulty: 1,
    question: 'Kim loại có nhiệt độ nóng chảy cao nhất là...',
    options: ['Vonfram (W)', 'Sắt (Fe)', 'Crom (Cr)', 'Đồng (Cu)'],
    correctAnswer: 'Vonfram (W)',
    explanation: 'Vonfram (W) có nhiệt độ nóng chảy cao nhất (3410°C), dùng làm dây tóc bóng đèn.',
    hint: 'Dùng làm dây tóc bóng đèn.'
  },
  {
    id: 5,
    category: 'cautao',
    type: 'multiple-choice',
    difficulty: 2,
    question: 'Tính chất vật lý chung của kim loại (dẻo, dẫn điện, dẫn nhiệt, ánh kim) gây ra bởi...',
    options: ['Các electron tự do trong mạng tinh thể', 'Các ion dương', 'Các nguyên tử kim loại', 'Liên kết cộng hóa trị'],
    correctAnswer: 'Các electron tự do trong mạng tinh thể',
    explanation: 'Các electron tự do di chuyển tự do trong mạng tinh thể kim loại gây ra các tính chất vật lý chung.',
    hint: 'Electron tự do.'
  },
  {
    id: 6,
    category: 'cautao',
    type: 'multiple-choice',
    difficulty: 2,
    question: 'Kim loại nhẹ nhất là...',
    options: ['Liti (Li)', 'Natri (Na)', 'Nhôm (Al)', 'Magie (Mg)'],
    correctAnswer: 'Liti (Li)',
    explanation: 'Liti (Li) có khối lượng riêng nhỏ nhất (0,53 g/cm3), là kim loại nhẹ nhất.',
    hint: 'Kim loại kiềm đầu tiên.'
  },
  {
    id: 7,
    category: 'cautao',
    type: 'fill-blank',
    difficulty: 2,
    question: 'Liên kết hóa học trong tinh thể kim loại là liên kết ___',
    correctAnswer: 'kim loại',
    acceptedAnswers: ['kim loại', 'metallic'],
    explanation: 'Liên kết kim loại được hình thành do lực hút tĩnh điện giữa các ion dương kim loại và các electron tự do.',
    hint: 'Tên gọi giống tên loại chất.'
  },
  {
    id: 8,
    category: 'cautao',
    type: 'multiple-choice',
    difficulty: 2,
    question: 'Kim loại dẻo nhất, có thể dát mỏng thành lá cực mỏng là...',
    options: ['Vàng (Au)', 'Bạc (Ag)', 'Nhôm (Al)', 'Đồng (Cu)'],
    correctAnswer: 'Vàng (Au)',
    explanation: 'Vàng (Au) là kim loại dẻo nhất, có thể dát mỏng đến mức ánh sáng có thể xuyên qua.',
    hint: 'Kim loại quý màu vàng.'
  },
  {
    id: 9,
    category: 'cautao',
    type: 'multiple-choice',
    difficulty: 3,
    question: 'Cấu hình electron lớp ngoài cùng của nguyên tử kim loại kiềm thổ là...',
    options: ['ns2', 'ns1', 'ns2np1', 'ns2np2'],
    correctAnswer: 'ns2',
    explanation: 'Kim loại kiềm thổ (nhóm IIA) có 2 electron lớp ngoài cùng, cấu hình ns2.',
    hint: 'Nhóm IIA.'
  },
  {
    id: 10,
    category: 'cautao',
    type: 'multiple-choice',
    difficulty: 3,
    question: 'Trong bảng tuần hoàn, các nguyên tố kim loại có mặt ở...',
    options: ['Nhóm IA, IIA, IIIA và các nhóm B', 'Chỉ nhóm IA và IIA', 'Chỉ các nhóm B', 'Nhóm VA, VIA, VIIA'],
    correctAnswer: 'Nhóm IA, IIA, IIIA và các nhóm B',
    explanation: 'Kim loại bao gồm nhóm IA (trừ H), IIA, IIIA (trừ B), một phần nhóm IVA, VA, VIA và tất cả các nhóm B (kim loại chuyển tiếp).',
    hint: 'Chiếm phần lớn bảng tuần hoàn.'
  },
  {
    id: 11,
    category: 'cautao',
    type: 'fill-blank',
    difficulty: 2,
    question: 'Nguyên tử kim loại thường có ___ (ít/nhiều) electron lớp ngoài cùng',
    correctAnswer: 'ít',
    acceptedAnswers: ['ít', '1, 2 hoặc 3', '1,2,3'],
    explanation: 'Nguyên tử kim loại thường có ít electron lớp ngoài cùng (1, 2 hoặc 3e).',
    hint: 'Dễ nhường electron.'
  },
  {
    id: 12,
    category: 'cautao',
    type: 'multiple-choice',
    difficulty: 3,
    question: 'Mạng tinh thể lập phương tâm diện là cấu trúc của kim loại nào?',
    options: ['Cu, Ag, Au, Al', 'Na, K, Ba', 'Mg, Zn', 'Cr, Fe'],
    correctAnswer: 'Cu, Ag, Au, Al',
    explanation: 'Cu, Ag, Au, Al, Pb, Ni... có mạng tinh thể lập phương tâm diện (độ đặc khít 74%).',
    hint: 'Các kim loại dẻo.'
  },

  // ========== TÍNH CHẤT HÓA HỌC (12 câu) ==========
  {
    id: 13,
    category: 'tinhchathoahoc',
    type: 'multiple-choice',
    difficulty: 1,
    question: 'Tính chất hóa học đặc trưng của kim loại là tính...',
    options: ['Khử', 'Oxi hóa', 'Axit', 'Bazơ'],
    correctAnswer: 'Khử',
    explanation: 'Kim loại dễ nhường electron để trở thành ion dương, nên tính chất đặc trưng là tính khử (bị oxi hóa). M → Mn+ + ne.',
    hint: 'Dễ nhường electron.'
  },
  {
    id: 14,
    category: 'tinhchathoahoc',
    type: 'multiple-choice',
    difficulty: 1,
    question: 'Kim loại nào sau đây tác dụng với nước ở nhiệt độ thường?',
    options: ['Natri (Na)', 'Sắt (Fe)', 'Đồng (Cu)', 'Nhôm (Al)'],
    correctAnswer: 'Natri (Na)',
    explanation: 'Các kim loại kiềm (Li, Na, K...) và kiềm thổ (Ca, Sr, Ba) tác dụng mạnh với nước ở nhiệt độ thường.',
    hint: 'Kim loại kiềm.'
  },
  {
    id: 15,
    category: 'tinhchathoahoc',
    type: 'multiple-choice',
    difficulty: 2,
    question: 'Dung dịch HCl hòa tan được kim loại nào sau đây?',
    options: ['Fe', 'Cu', 'Ag', 'Au'],
    correctAnswer: 'Fe',
    explanation: 'HCl chỉ hòa tan được các kim loại đứng trước H trong dãy hoạt động hóa học. Fe đứng trước H, còn Cu, Ag, Au đứng sau.',
    hint: 'Đứng trước H.'
  },
  {
    id: 16,
    category: 'tinhchathoahoc',
    type: 'fill-blank',
    difficulty: 2,
    question: 'Sắt tác dụng với khí Clo dư tạo thành muối sắt (___)',
    correctAnswer: 'III',
    acceptedAnswers: ['III', '3', 'ba'],
    explanation: '2Fe + 3Cl2 → 2FeCl3. Clo là chất oxi hóa mạnh nên đưa sắt lên hóa trị cao nhất (III).',
    hint: 'Hóa trị cao nhất của sắt.'
  },
  {
    id: 17,
    category: 'tinhchathoahoc',
    type: 'multiple-choice',
    difficulty: 2,
    question: 'Kim loại nào bị thụ động hóa trong HNO3 đặc nguội và H2SO4 đặc nguội?',
    options: ['Al, Fe, Cr', 'Cu, Ag, Au', 'Zn, Mg, Pb', 'Na, K, Ca'],
    correctAnswer: 'Al, Fe, Cr',
    explanation: 'Nhôm (Al), Sắt (Fe), Crom (Cr) bị thụ động hóa (tạo màng oxit bảo vệ) trong HNO3 đặc nguội và H2SO4 đặc nguội.',
    hint: 'Ba kim loại phổ biến.'
  },
  {
    id: 18,
    category: 'tinhchathoahoc',
    type: 'multiple-choice',
    difficulty: 3,
    question: 'Cho Cu vào dung dịch AgNO3, hiện tượng xảy ra là...',
    options: ['Dung dịch chuyển màu xanh, có chất rắn màu xám bám vào Cu', 'Không có hiện tượng', 'Có khí thoát ra', 'Kết tủa trắng'],
    correctAnswer: 'Dung dịch chuyển màu xanh, có chất rắn màu xám bám vào Cu',
    explanation: 'Cu + 2AgNO3 → Cu(NO3)2 + 2Ag. Cu tan tạo dung dịch màu xanh (Cu2+), Ag kết tủa màu xám bám vào thanh Cu.',
    hint: 'Cu đẩy Ag.'
  },
  {
    id: 19,
    category: 'tinhchathoahoc',
    type: 'multiple-choice',
    difficulty: 3,
    question: 'Kim loại nào sau đây tác dụng được với dung dịch NaOH?',
    options: ['Al', 'Fe', 'Cu', 'Mg'],
    correctAnswer: 'Al',
    explanation: 'Nhôm (Al) và Kẽm (Zn) có thể tan trong dung dịch kiềm mạnh: 2Al + 2NaOH + 2H2O → 2NaAlO2 + 3H2.',
    hint: 'Kim loại lưỡng tính (theo nghĩa rộng).'
  },
  {
    id: 20,
    category: 'tinhchathoahoc',
    type: 'fill-blank',
    difficulty: 2,
    question: 'Sản phẩm khử duy nhất của phản ứng kim loại với HNO3 loãng mà không tạo khí là ___',
    correctAnswer: 'NH4NO3',
    acceptedAnswers: ['NH4NO3', 'amoni nitrat'],
    explanation: 'Với các kim loại mạnh (Mg, Al, Zn), HNO3 loãng có thể bị khử xuống mức thấp nhất là NH4NO3 (muối tan, không khí).',
    hint: 'Muối amoni.'
  },
  {
    id: 21,
    category: 'tinhchathoahoc',
    type: 'multiple-choice',
    difficulty: 3,
    question: 'Hỗn hợp tecmit dùng để hàn đường ray gồm bột nhôm và...',
    options: ['Fe2O3', 'CuO', 'Fe3O4', 'FeO'],
    correctAnswer: 'Fe2O3',
    explanation: 'Phản ứng nhiệt nhôm: 2Al + Fe2O3 → Al2O3 + 2Fe (tỏa nhiệt rất mạnh làm sắt nóng chảy).',
    hint: 'Oxit sắt.'
  },
  {
    id: 22,
    category: 'tinhchathoahoc',
    type: 'multiple-choice',
    difficulty: 2,
    question: 'Để làm sạch dung dịch ZnSO4 có lẫn tạp chất CuSO4, ta dùng kim loại...',
    options: ['Zn', 'Cu', 'Fe', 'Al'],
    correctAnswer: 'Zn',
    explanation: 'Dùng Zn dư: Zn + CuSO4 → ZnSO4 + Cu↓. Lọc bỏ Cu và Zn dư thu được ZnSO4 tinh khiết.',
    hint: 'Dùng chính kim loại của muối cần làm sạch.'
  },
  {
    id: 23,
    category: 'tinhchathoahoc',
    type: 'multiple-choice',
    difficulty: 3,
    question: 'Cho Fe vào dung dịch AgNO3 dư, sau phản ứng thu được muối nào?',
    options: ['Fe(NO3)3', 'Fe(NO3)2', 'Fe(NO3)2 và AgNO3', 'Fe(NO3)3 và Fe(NO3)2'],
    correctAnswer: 'Fe(NO3)3',
    explanation: 'Fe + 2AgNO3 → Fe(NO3)2 + 2Ag. Do AgNO3 dư: Fe(NO3)2 + AgNO3 → Fe(NO3)3 + Ag. Cuối cùng thu được Fe(NO3)3.',
    hint: 'Ag+ dư oxi hóa Fe2+ lên Fe3+.'
  },
  {
    id: 24,
    category: 'tinhchathoahoc',
    type: 'fill-blank',
    difficulty: 3,
    question: 'Kim loại M tác dụng với HCl sinh ra H2. M tác dụng với HNO3 đặc nguội không xảy ra phản ứng. M là ___',
    correctAnswer: 'Fe',
    acceptedAnswers: ['Fe', 'sắt', 'Al', 'nhôm', 'Cr', 'crom'],
    explanation: 'M đứng trước H (tác dụng HCl) và bị thụ động trong HNO3 đặc nguội. Có thể là Al, Fe, Cr. (Đáp án Fe phổ biến nhất).',
    hint: 'Bị thụ động hóa.'
  },

  // ========== DÃY ĐIỆN HÓA (10 câu) ==========
  {
    id: 25,
    category: 'daydienhoa',
    type: 'multiple-choice',
    difficulty: 1,
    question: 'Cặp oxi hóa - khử nào sau đây viết đúng?',
    options: ['Fe2+/Fe', 'Fe/Fe2+', 'Cu/Cu2+', 'Ag/Ag+'],
    correctAnswer: 'Fe2+/Fe',
    explanation: 'Ký hiệu cặp oxi hóa - khử: Dạng oxi hóa / Dạng khử (Mn+/M).',
    hint: 'Ion dương trên, kim loại dưới.'
  },
  {
    id: 26,
    category: 'daydienhoa',
    type: 'multiple-choice',
    difficulty: 2,
    question: 'Theo quy tắc alpha, phản ứng xảy ra theo chiều...',
    options: ['Chất oxi hóa mạnh + Chất khử mạnh → Chất oxi hóa yếu + Chất khử yếu', 'Chất oxi hóa yếu + Chất khử yếu → Chất oxi hóa mạnh + Chất khử mạnh', 'Kim loại mạnh đẩy kim loại yếu', 'Ion kim loại mạnh oxi hóa kim loại yếu'],
    correctAnswer: 'Chất oxi hóa mạnh + Chất khử mạnh → Chất oxi hóa yếu + Chất khử yếu',
    explanation: 'Quy tắc alpha: Phản ứng giữa chất oxi hóa mạnh và chất khử mạnh tạo ra chất oxi hóa yếu hơn và chất khử yếu hơn.',
    hint: 'Mạnh + Mạnh → Yếu + Yếu.'
  },
  {
    id: 27,
    category: 'daydienhoa',
    type: 'multiple-choice',
    difficulty: 2,
    question: 'Ion nào sau đây có tính oxi hóa mạnh nhất?',
    options: ['Ag+', 'Cu2+', 'Fe2+', 'Zn2+'],
    correctAnswer: 'Ag+',
    explanation: 'Trong dãy điện hóa, tính oxi hóa của ion kim loại tăng dần từ trái sang phải: Zn2+ < Fe2+ < Cu2+ < Ag+.',
    hint: 'Cuối dãy điện hóa.'
  },
  {
    id: 28,
    category: 'daydienhoa',
    type: 'fill-blank',
    difficulty: 2,
    question: 'Trong pin điện hóa Zn-Cu, cực dương (catot) là kim loại ___',
    correctAnswer: 'Cu',
    acceptedAnswers: ['Cu', 'đồng'],
    explanation: 'Trong pin Zn-Cu, Zn là cực âm (anot) bị oxi hóa, Cu là cực dương (catot) nơi xảy ra sự khử.',
    hint: 'Kim loại yếu hơn là cực dương.'
  },
  {
    id: 29,
    category: 'daydienhoa',
    type: 'multiple-choice',
    difficulty: 3,
    question: 'Cho các ion: Fe2+, Ag+, Cu2+. Thứ tự tính oxi hóa tăng dần là...',
    options: ['Fe2+ < Cu2+ < Ag+', 'Ag+ < Cu2+ < Fe2+', 'Cu2+ < Fe2+ < Ag+', 'Fe2+ < Ag+ < Cu2+'],
    correctAnswer: 'Fe2+ < Cu2+ < Ag+',
    explanation: 'Dựa vào dãy điện hóa: Fe2+/Fe đứng trước Cu2+/Cu đứng trước Ag+/Ag.',
    hint: 'Theo chiều dãy điện hóa.'
  },
  {
    id: 30,
    category: 'daydienhoa',
    type: 'multiple-choice',
    difficulty: 3,
    question: 'Phản ứng nào sau đây KHÔNG xảy ra?',
    options: ['Cu + FeSO4', 'Fe + CuSO4', 'Zn + CuSO4', 'Cu + 2AgNO3'],
    correctAnswer: 'Cu + FeSO4',
    explanation: 'Cu đứng sau Fe trong dãy hoạt động hóa học nên không đẩy được Fe ra khỏi muối.',
    hint: 'Kim loại yếu không đẩy được kim loại mạnh.'
  },
  {
    id: 31,
    category: 'daydienhoa',
    type: 'multiple-choice',
    difficulty: 3,
    question: 'Cho biết thứ tự cặp oxi hóa khử: Mg2+/Mg < Fe2+/Fe < Cu2+/Cu < Fe3+/Fe2+ < Ag+/Ag. Fe khử được ion nào?',
    options: ['Cu2+, Fe3+, Ag+', 'Mg2+, Cu2+', 'Ag+ chỉ', 'Cu2+ chỉ'],
    correctAnswer: 'Cu2+, Fe3+, Ag+',
    explanation: 'Fe là chất khử mạnh hơn cặp Cu2+/Cu, Fe3+/Fe2+, Ag+/Ag nên khử được các ion Cu2+, Fe3+, Ag+.',
    hint: 'Quy tắc alpha.'
  },
  {
    id: 32,
    category: 'daydienhoa',
    type: 'fill-blank',
    difficulty: 3,
    question: 'Trong pin điện hóa, dòng electron di chuyển từ cực ___ sang cực ___',
    correctAnswer: 'âm sang dương',
    acceptedAnswers: ['âm sang dương', 'anot sang catot', 'âm qua dương'],
    explanation: 'Electron di chuyển từ cực âm (anot - nơi nhường e) qua dây dẫn sang cực dương (catot - nơi nhận e).',
    hint: 'Từ nơi thừa e sang nơi thiếu e.'
  },
  {
    id: 33,
    category: 'daydienhoa',
    type: 'multiple-choice',
    difficulty: 3,
    question: 'Suất điện động chuẩn của pin điện hóa được tính bằng công thức...',
    options: ['E°pin = E°(+) - E°(-)', 'E°pin = E°(-) - E°(+)', 'E°pin = E°(+) + E°(-)', 'E°pin = E°oxh - E°khử'],
    correctAnswer: 'E°pin = E°(+) - E°(-)',
    explanation: 'Suất điện động chuẩn bằng thế điện cực chuẩn của cực dương (catot) trừ đi thế điện cực chuẩn của cực âm (anot).',
    hint: 'Dương trừ Âm.'
  },
  {
    id: 34,
    category: 'daydienhoa',
    type: 'multiple-choice',
    difficulty: 3,
    question: 'Cặp chất nào sau đây phản ứng tạo khí H2?',
    options: ['Na + H2O', 'Cu + HCl', 'Ag + H2SO4 loãng', 'Fe + HNO3 đặc nguội'],
    correctAnswer: 'Na + H2O',
    explanation: 'Na + H2O → NaOH + 1/2H2. Cu, Ag đứng sau H không tác dụng axit thường. Fe thụ động HNO3 đặc nguội.',
    hint: 'Kim loại kiềm với nước.'
  },

  // ========== ĂN MÒN & ĐIỀU CHẾ (11 câu) ==========
  {
    id: 35,
    category: 'anmon',
    type: 'multiple-choice',
    difficulty: 1,
    question: 'Ăn mòn kim loại là sự phá hủy kim loại do...',
    options: ['Tác dụng hóa học của môi trường', 'Tác động cơ học', 'Nhiệt độ cao', 'Va chạm vật lý'],
    correctAnswer: 'Tác dụng hóa học của môi trường',
    explanation: 'Ăn mòn kim loại là sự phá hủy kim loại hoặc hợp kim do tác dụng của các chất trong môi trường xung quanh.',
    hint: 'Do môi trường.'
  },
  {
    id: 36,
    category: 'anmon',
    type: 'multiple-choice',
    difficulty: 2,
    question: 'Điều kiện để xảy ra ăn mòn điện hóa học là...',
    options: ['2 điện cực khác nhau, tiếp xúc nhau, cùng nhúng trong dung dịch điện ly', 'Kim loại nguyên chất', 'Dung dịch không điện ly', 'Chỉ cần 2 kim loại tiếp xúc'],
    correctAnswer: '2 điện cực khác nhau, tiếp xúc nhau, cùng nhúng trong dung dịch điện ly',
    explanation: 'Cần 3 điều kiện: các điện cực khác chất, tiếp xúc trực tiếp hoặc gián tiếp, cùng tiếp xúc với dung dịch điện ly.',
    hint: '3 điều kiện.'
  },
  {
    id: 37,
    category: 'anmon',
    type: 'multiple-choice',
    difficulty: 2,
    question: 'Trong ăn mòn điện hóa học, kim loại mạnh hơn đóng vai trò là...',
    options: ['Anot (cực âm) và bị ăn mòn', 'Catot (cực dương) và được bảo vệ', 'Anot và được bảo vệ', 'Catot và bị ăn mòn'],
    correctAnswer: 'Anot (cực âm) và bị ăn mòn',
    explanation: 'Kim loại mạnh hơn đóng vai trò là Anot (cực âm), xảy ra quá trình oxi hóa (bị ăn mòn).',
    hint: 'Mạnh hơn thì hy sinh.'
  },
  {
    id: 38,
    category: 'anmon',
    type: 'fill-blank',
    difficulty: 2,
    question: 'Để bảo vệ vỏ tàu biển bằng thép, người ta gắn vào vỏ tàu các tấm kim loại ___',
    correctAnswer: 'kẽm',
    acceptedAnswers: ['kẽm', 'Zn', 'magie', 'Mg'],
    explanation: 'Dùng phương pháp điện hóa: gắn Zn (hoặc Mg) là kim loại mạnh hơn Fe để Zn bị ăn mòn thay cho thép (Fe).',
    hint: 'Kim loại mạnh hơn sắt.'
  },
  {
    id: 39,
    category: 'anmon',
    type: 'multiple-choice',
    difficulty: 2,
    question: 'Phương pháp chung để điều chế kim loại là...',
    options: ['Khử ion kim loại thành nguyên tử', 'Oxi hóa ion kim loại', 'Điện phân dung dịch', 'Nhiệt luyện'],
    correctAnswer: 'Khử ion kim loại thành nguyên tử',
    explanation: 'Nguyên tắc chung: Mn+ + ne → M. Thực hiện quá trình khử ion kim loại.',
    hint: 'Ngược với tính chất hóa học.'
  },
  {
    id: 40,
    category: 'anmon',
    type: 'multiple-choice',
    difficulty: 2,
    question: 'Kim loại kiềm, kiềm thổ, nhôm được điều chế bằng phương pháp...',
    options: ['Điện phân nóng chảy', 'Điện phân dung dịch', 'Nhiệt luyện', 'Thủy luyện'],
    correctAnswer: 'Điện phân nóng chảy',
    explanation: 'Các kim loại mạnh (K, Na, Ca, Mg, Al) chỉ có thể điều chế bằng cách điện phân nóng chảy muối hoặc oxit của chúng.',
    hint: 'Kim loại mạnh.'
  },
  {
    id: 41,
    category: 'anmon',
    type: 'multiple-choice',
    difficulty: 2,
    question: 'Phương pháp nhiệt luyện thường dùng để điều chế kim loại...',
    options: ['Sau Al trong dãy hoạt động', 'Trước Al', 'Kim loại kiềm', 'Tất cả kim loại'],
    correctAnswer: 'Sau Al trong dãy hoạt động',
    explanation: 'Nhiệt luyện (dùng C, CO, H2, Al khử oxit) dùng điều chế kim loại trung bình và yếu (sau Al): Fe, Cu, Pb...',
    hint: 'Kim loại trung bình.'
  },
  {
    id: 42,
    category: 'anmon',
    type: 'multiple-choice',
    difficulty: 3,
    question: 'Điện phân dung dịch CuSO4 với anot bằng đồng thì...',
    options: ['Nồng độ Cu2+ không đổi', 'Nồng độ Cu2+ giảm', 'Khối lượng catot giảm', 'Có khí O2 thoát ra ở anot'],
    correctAnswer: 'Nồng độ Cu2+ không đổi',
    explanation: 'Đây là hiện tượng dương cực tan. Anot Cu tan ra bù lại lượng Cu bám vào catot, nên nồng độ Cu2+ không đổi.',
    hint: 'Dương cực tan.'
  },
  {
    id: 43,
    category: 'anmon',
    type: 'fill-blank',
    difficulty: 3,
    question: 'Trong quá trình điện phân, cation di chuyển về cực ___',
    correctAnswer: 'âm',
    acceptedAnswers: ['âm', 'catot'],
    explanation: 'Cation (ion dương) di chuyển về cực âm (catot) để nhận electron.',
    hint: 'Trái dấu hút nhau.'
  },
  {
    id: 44,
    category: 'anmon',
    type: 'multiple-choice',
    difficulty: 3,
    question: 'Gang là hợp kim của sắt với cacbon, trong đó hàm lượng cacbon là...',
    options: ['2-5%', '< 2%', '> 5%', '0.01-2%'],
    correctAnswer: '2-5%',
    explanation: 'Gang chứa 2-5% C. Thép chứa < 2% C.',
    hint: 'Nhiều hơn thép.'
  },
  {
    id: 45,
    category: 'anmon',
    type: 'multiple-choice',
    difficulty: 3,
    question: 'Thép không gỉ (inox) có chứa thành phần chính là Fe và...',
    options: ['Cr, Ni', 'Cu, Zn', 'Al, Mg', 'Mn, Si'],
    correctAnswer: 'Cr, Ni',
    explanation: 'Thép không gỉ thường chứa Crom (Cr) và Niken (Ni) giúp chống ăn mòn.',
    hint: 'Crôm và Niken.'
  }
];

const Bai05_DaiCuongKimLoai = () => {
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

  const { hasProgress, savedProgress, saveProgress, clearProgress, completeChallenge } = useChallengeProgress('daicuongkimloai_12', {
    challengeId: 5,
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
    <div className="kimloai-bg min-h-screen p-4 md:p-8 font-sans">
      <div className="max-w-6xl mx-auto">
        {/* HEADER */}
        <header className="flex items-center justify-between mb-8 bg-white/10 backdrop-blur rounded-2xl p-4 border border-white/20">
          <div className="flex items-center gap-4">
            <Link to="/hoahoc/12" className="p-2 hover:bg-white/10 rounded-full transition-colors text-white">
              <ArrowLeft className="w-6 h-6" />
            </Link>
            <div>
              <h1 className="text-2xl font-bold text-white">
                Đại Cương Kim Loại
              </h1>
              <p className="text-blue-200 text-sm">Hóa học 12 • Chương 5</p>
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
            <div className="stats-bar-kimloai mb-8">
              <div className="stat-item-kimloai">
                <CheckCircle2 className="w-5 h-5 text-green-400" />
                <span>Đã hoàn thành: <strong>{completedCategories.length || 0}/{CATEGORIES.length}</strong></span>
              </div>
              <div className="stat-item-kimloai">
                <Award className="w-5 h-5 text-yellow-400" />
                <span>Điểm cao nhất: <strong>{highScore || 0}</strong></span>
              </div>
            </div>

            <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <Target className="w-6 h-6" />
              Chọn chủ đề thử thách
            </h2>

            <div className="category-grid-kimloai">
              {CATEGORIES.map((cat) => {
                const Icon = cat.icon;
                const isCompleted = completedCategories.includes(cat.id);
                
                return (
                  <div 
                    key={cat.id}
                    onClick={() => handleCategorySelect(cat.id)}
                    className="category-card-kimloai group"
                  >
                    <div className={`category-icon-wrapper-kimloai ${isCompleted ? 'bg-green-500/20 text-green-400' : ''}`}
                         style={{ color: isCompleted ? undefined : cat.color }}>
                      <Icon className="w-8 h-8" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-white mb-1 group-hover:text-blue-300 transition-colors">
                        {cat.name}
                      </h3>
                      <p className="text-sm text-blue-200 mb-3">{cat.description}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-semibold px-2 py-1 rounded bg-white/10 text-blue-200">
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

            <div className="progress-track-kimloai mb-6">
              <div 
                className="progress-fill-kimloai"
                style={{ width: `${((currentQuestionIndex) / filteredQuestions.length) * 100}%` }}
              />
            </div>

            <div className="question-card-kimloai">
              <div className="question-header-kimloai">
                <span className={`difficulty-badge-kimloai ${
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
                <div className="options-grid-kimloai">
                  {currentQuestion.options.map((option, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleAnswerSubmit(option)}
                      disabled={isCorrect !== null}
                      className={`option-btn-kimloai ${
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
                      className="flex-1 p-4 bg-white/5 border border-white/20 rounded-xl text-lg text-white focus:border-blue-500 focus:outline-none"
                      onKeyDown={(e) => e.key === 'Enter' && handleAnswerSubmit(selectedAnswer)}
                    />
                    <button
                      onClick={() => handleAnswerSubmit(selectedAnswer)}
                      disabled={!selectedAnswer || isCorrect !== null}
                      className="px-6 py-2 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Kiểm tra
                    </button>
                  </div>
                </div>
              )}

              {showExplanation && (
                <div className={`feedback-container-kimloai ${isCorrect ? 'feedback-correct' : 'feedback-wrong'}`}>
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
              <div className="w-24 h-24 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <Award className="w-12 h-12 text-blue-400" />
              </div>
              
              <h2 className="text-3xl font-bold text-white mb-2">Hoàn thành xuất sắc!</h2>
              <p className="text-blue-200 mb-8">Bạn đã hoàn thành chủ đề {CATEGORIES.find(c => c.id === activeCategory)?.name}</p>
              
              <div className="grid grid-cols-3 gap-4 mb-8">
                <div className="p-4 bg-white/5 rounded-2xl border border-white/10">
                  <div className="text-sm text-blue-200 mb-1">Điểm số</div>
                  <div className="text-2xl font-bold text-green-400">{score}</div>
                </div>
                <div className="p-4 bg-white/5 rounded-2xl border border-white/10">
                  <div className="text-sm text-blue-200 mb-1">Đúng</div>
                  <div className="text-2xl font-bold text-blue-400">
                    {Math.round((score / (filteredQuestions.length * 20)) * 100)}%
                  </div>
                </div>
                <div className="p-4 bg-white/5 rounded-2xl border border-white/10">
                  <div className="text-sm text-blue-200 mb-1">Thời gian</div>
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
                  className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-colors shadow-lg shadow-blue-500/30"
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

export default Bai05_DaiCuongKimLoai;
