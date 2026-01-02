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

// Fallback questions khi không có AI
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
    explanation: 'Thủy ngân (Hg) là kim loại duy nhất ở trạng thái lỏng ở điều kiện thường (nhiệt độ nóng chảy -39°C).',
    hint: 'Dùng trong nhiệt kế.'
  },
  {
    id: 2,
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
    id: 3,
    category: 'cautao',
    type: 'multiple-choice',
    difficulty: 1,
    question: 'Kim loại nào có tính dẫn điện tốt nhất?',
    options: ['Bạc (Ag)', 'Đồng (Cu)', 'Vàng (Au)', 'Nhôm (Al)'],
    correctAnswer: 'Bạc (Ag)',
    explanation: 'Bạc (Ag) có tính dẫn điện tốt nhất trong các kim loại. Thứ tự: Ag > Cu > Au > Al.',
    hint: 'Kim loại quý.'
  },
  {
    id: 4,
    category: 'cautao',
    type: 'multiple-choice',
    difficulty: 1,
    question: 'Kim loại nào có khối lượng riêng nhỏ nhất?',
    options: ['Liti (Li)', 'Natri (Na)', 'Kali (K)', 'Magie (Mg)'],
    correctAnswer: 'Liti (Li)',
    explanation: 'Liti (Li) có khối lượng riêng 0,53 g/cm³, nhỏ nhất trong các kim loại, nhẹ hơn cả nước.',
    hint: 'Kim loại kiềm đầu tiên.'
  },
  {
    id: 5,
    category: 'cautao',
    type: 'multiple-choice',
    difficulty: 2,
    question: 'Kim loại có nhiệt độ nóng chảy cao nhất là:',
    options: ['Vonfram (W)', 'Sắt (Fe)', 'Crom (Cr)', 'Titan (Ti)'],
    correctAnswer: 'Vonfram (W)',
    explanation: 'Vonfram (W) có nhiệt độ nóng chảy cao nhất (3422°C), nên được dùng làm dây tóc bóng đèn.',
    hint: 'Dùng trong bóng đèn sợi đốt.'
  },
  {
    id: 6,
    category: 'cautao',
    type: 'multiple-choice',
    difficulty: 2,
    question: 'Kim loại có độ cứng lớn nhất là:',
    options: ['Crom (Cr)', 'Sắt (Fe)', 'Vonfram (W)', 'Titan (Ti)'],
    correctAnswer: 'Crom (Cr)',
    explanation: 'Crom (Cr) là kim loại cứng nhất, có thể cắt được kính. Độ cứng của Cr = 9 theo thang Mohs.',
    hint: 'Dùng để mạ bảo vệ.'
  },
  {
    id: 7,
    category: 'cautao',
    type: 'fill-blank',
    difficulty: 1,
    question: 'Kim loại có tính dẻo cao nhất là ___.',
    correctAnswer: 'vàng',
    acceptedAnswers: ['vàng', 'Au', 'gold'],
    explanation: 'Vàng (Au) là kim loại dẻo nhất, có thể dát mỏng thành lá vàng 0,0001 mm.',
    hint: 'Kim loại quý màu vàng.'
  },
  {
    id: 8,
    category: 'cautao',
    type: 'multiple-choice',
    difficulty: 2,
    question: 'Liên kết kim loại được hình thành do:',
    options: ['Lực hút giữa các ion dương và các electron tự do', 'Sự góp chung electron', 'Lực hút tĩnh điện giữa ion dương và ion âm', 'Lực Van der Waals'],
    correctAnswer: 'Lực hút giữa các ion dương và các electron tự do',
    explanation: 'Liên kết kim loại là liên kết được hình thành do lực hút tĩnh điện giữa các ion dương kim loại và các electron tự do.',
    hint: 'Đặc trưng cho kim loại.'
  },
  {
    id: 9,
    category: 'cautao',
    type: 'multiple-choice',
    difficulty: 3,
    question: 'Trong mạng tinh thể kim loại, các nguyên tử kim loại:',
    options: ['Nhường electron hóa trị thành ion dương', 'Nhận electron để thành ion âm', 'Góp chung electron', 'Giữ nguyên electron'],
    correctAnswer: 'Nhường electron hóa trị thành ion dương',
    explanation: 'Trong tinh thể kim loại, các nguyên tử kim loại nhường electron hóa trị để tạo thành ion dương và các electron tự do.',
    hint: 'Kim loại dễ mất electron.'
  },
  {
    id: 10,
    category: 'cautao',
    type: 'fill-blank',
    difficulty: 2,
    question: 'Kim loại dẫn nhiệt tốt nhất là ___.',
    correctAnswer: 'bạc',
    acceptedAnswers: ['bạc', 'Ag', 'silver'],
    explanation: 'Bạc (Ag) có khả năng dẫn nhiệt tốt nhất trong các kim loại, tiếp theo là đồng (Cu).',
    hint: 'Cùng kim loại dẫn điện tốt nhất.'
  },
  {
    id: 11,
    category: 'cautao',
    type: 'multiple-choice',
    difficulty: 3,
    question: 'Tính ánh kim của kim loại do:',
    options: ['Electron tự do hấp thụ và phát lại ánh sáng', 'Bề mặt nhẵn bóng', 'Ion dương phản xạ ánh sáng', 'Mật độ cao của kim loại'],
    correctAnswer: 'Electron tự do hấp thụ và phát lại ánh sáng',
    explanation: 'Các electron tự do trong kim loại hấp thụ năng lượng ánh sáng rồi bức xạ lại, tạo nên ánh kim đặc trưng.',
    hint: 'Liên quan đến electron.'
  },
  {
    id: 12,
    category: 'cautao',
    type: 'multiple-choice',
    difficulty: 1,
    question: 'Các mạng tinh thể kim loại phổ biến gồm:',
    options: ['Lập phương tâm khối, lập phương tâm diện, lục phương', 'Lập phương đơn giản, tứ diện, bát diện', 'Hình thoi, hình hộp, hình cầu', 'Lục giác, tam giác, ngũ giác'],
    correctAnswer: 'Lập phương tâm khối, lập phương tâm diện, lục phương',
    explanation: 'Ba kiểu mạng tinh thể kim loại phổ biến: lập phương tâm khối (Na, K, Fe-α), lập phương tâm diện (Cu, Ag, Au, Al), lục phương (Mg, Zn).',
    hint: 'Ba kiểu cấu trúc.'
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
    explanation: 'Kim loại dễ nhường electron để trở thành ion dương, nên tính chất đặc trưng là tính khử: M → M^n+ + ne.',
    hint: 'Dễ nhường electron.'
  },
  {
    id: 14,
    category: 'tinhchathoahoc',
    type: 'multiple-choice',
    difficulty: 2,
    question: 'Kim loại nào bị thụ động hóa trong HNO₃ đặc nguội và H₂SO₄ đặc nguội?',
    options: ['Al, Fe, Cr', 'Cu, Ag, Au', 'Zn, Mg, Pb', 'Na, K, Ca'],
    correctAnswer: 'Al, Fe, Cr',
    explanation: 'Nhôm (Al), Sắt (Fe), Crom (Cr) bị thụ động hóa trong HNO₃ đặc nguội và H₂SO₄ đặc nguội do tạo màng oxit bảo vệ.',
    hint: 'Ba kim loại phổ biến.'
  },
  {
    id: 15,
    category: 'tinhchathoahoc',
    type: 'multiple-choice',
    difficulty: 1,
    question: 'Kim loại nào KHÔNG tác dụng với nước ở điều kiện thường?',
    options: ['Đồng (Cu)', 'Natri (Na)', 'Kali (K)', 'Canxi (Ca)'],
    correctAnswer: 'Đồng (Cu)',
    explanation: 'Cu đứng sau H trong dãy điện hóa nên không tác dụng với nước. Các kim loại kiềm, kiềm thổ phản ứng mãnh liệt với nước.',
    hint: 'Kim loại yếu.'
  },
  {
    id: 16,
    category: 'tinhchathoahoc',
    type: 'multiple-choice',
    difficulty: 2,
    question: 'Khi cho Na vào dung dịch CuSO₄, hiện tượng quan sát được là:',
    options: ['Có khí thoát ra và kết tủa xanh lam', 'Có kim loại Cu màu đỏ bám vào Na', 'Dung dịch chuyển sang màu xanh đậm hơn', 'Không có hiện tượng gì'],
    correctAnswer: 'Có khí thoát ra và kết tủa xanh lam',
    explanation: 'Na phản ứng với H₂O trước tạo NaOH và H₂↑, sau đó NaOH phản ứng với CuSO₄ tạo Cu(OH)₂ kết tủa xanh lam.',
    hint: 'Na tác dụng với nước trước.'
  },
  {
    id: 17,
    category: 'tinhchathoahoc',
    type: 'multiple-choice',
    difficulty: 2,
    question: 'Sản phẩm khi Fe tác dụng với Cl₂ là:',
    options: ['FeCl₃', 'FeCl₂', 'Fe₂O₃', 'FeO'],
    correctAnswer: 'FeCl₃',
    explanation: 'Cl₂ là chất oxi hóa mạnh nên oxi hóa Fe lên số oxi hóa cao nhất (+3): 2Fe + 3Cl₂ → 2FeCl₃.',
    hint: 'Cl₂ là chất oxi hóa mạnh.'
  },
  {
    id: 18,
    category: 'tinhchathoahoc',
    type: 'multiple-choice',
    difficulty: 3,
    question: 'Khi cho Fe vào dung dịch HNO₃ loãng dư, sản phẩm muối thu được là:',
    options: ['Fe(NO₃)₃', 'Fe(NO₃)₂', 'Fe₂O₃', 'FeO'],
    correctAnswer: 'Fe(NO₃)₃',
    explanation: 'HNO₃ dư nên Fe bị oxi hóa lên Fe³⁺: Fe + 4HNO₃ loãng → Fe(NO₃)₃ + NO↑ + 2H₂O.',
    hint: 'HNO₃ dư.'
  },
  {
    id: 19,
    category: 'tinhchathoahoc',
    type: 'fill-blank',
    difficulty: 2,
    question: 'Khi đốt cháy sắt trong khí oxi, sản phẩm tạo thành là ___.',
    correctAnswer: 'Fe₃O₄',
    acceptedAnswers: ['Fe3O4', 'Fe₃O₄', 'oxit sắt từ'],
    explanation: 'Khi đốt Fe trong O₂: 3Fe + 2O₂ → Fe₃O₄ (oxit sắt từ, có tính từ).',
    hint: 'Oxit sắt từ.'
  },
  {
    id: 20,
    category: 'tinhchathoahoc',
    type: 'multiple-choice',
    difficulty: 1,
    question: 'Kim loại nào tác dụng với HCl giải phóng khí H₂?',
    options: ['Kẽm (Zn)', 'Đồng (Cu)', 'Bạc (Ag)', 'Vàng (Au)'],
    correctAnswer: 'Kẽm (Zn)',
    explanation: 'Zn đứng trước H trong dãy điện hóa nên tác dụng với HCl: Zn + 2HCl → ZnCl₂ + H₂↑.',
    hint: 'Kim loại đứng trước H.'
  },
  {
    id: 21,
    category: 'tinhchathoahoc',
    type: 'multiple-choice',
    difficulty: 3,
    question: 'Kim loại nào sau đây tác dụng được với dung dịch NaOH?',
    options: ['Al', 'Fe', 'Cu', 'Ag'],
    correctAnswer: 'Al',
    explanation: 'Al là kim loại lưỡng tính, tác dụng với dung dịch kiềm: 2Al + 2NaOH + 2H₂O → 2NaAlO₂ + 3H₂↑.',
    hint: 'Kim loại lưỡng tính.'
  },
  {
    id: 22,
    category: 'tinhchathoahoc',
    type: 'fill-blank',
    difficulty: 2,
    question: 'Phản ứng giữa kim loại và axit là phản ứng ___.',
    correctAnswer: 'oxi hóa - khử',
    acceptedAnswers: ['oxi hóa - khử', 'oxi hóa khử', 'oxi hoá khử', 'oxi hoá - khử', 'redox'],
    explanation: 'Trong phản ứng kim loại + axit, kim loại bị oxi hóa (nhường e) và H⁺ bị khử (nhận e) thành H₂.',
    hint: 'Có sự thay đổi số oxi hóa.'
  },
  {
    id: 23,
    category: 'tinhchathoahoc',
    type: 'multiple-choice',
    difficulty: 2,
    question: 'Kim loại nào KHÔNG tan trong dung dịch H₂SO₄ loãng?',
    options: ['Cu', 'Fe', 'Zn', 'Mg'],
    correctAnswer: 'Cu',
    explanation: 'Cu đứng sau H trong dãy điện hóa nên không tác dụng với H₂SO₄ loãng. Chỉ tan trong H₂SO₄ đặc nóng.',
    hint: 'Kim loại đứng sau H.'
  },
  {
    id: 24,
    category: 'tinhchathoahoc',
    type: 'multiple-choice',
    difficulty: 3,
    question: 'Khi cho Fe dư tác dụng với dung dịch HNO₃ loãng, sản phẩm muối thu được là:',
    options: ['Fe(NO₃)₂', 'Fe(NO₃)₃', 'Hỗn hợp Fe(NO₃)₂ và Fe(NO₃)₃', 'Không phản ứng'],
    correctAnswer: 'Fe(NO₃)₂',
    explanation: 'Fe dư nên Fe³⁺ bị khử về Fe²⁺: Fe + 2Fe(NO₃)₃ → 3Fe(NO₃)₂.',
    hint: 'Fe dư khử Fe³⁺.'
  },

  // ========== DÃY ĐIỆN HÓA (12 câu) ==========
  {
    id: 25,
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
    id: 26,
    category: 'daydienhoa',
    type: 'multiple-choice',
    difficulty: 3,
    question: 'Phản ứng nào sau đây KHÔNG xảy ra?',
    options: ['Cu + FeSO₄', 'Fe + CuSO₄', 'Zn + CuSO₄', 'Cu + 2AgNO₃'],
    correctAnswer: 'Cu + FeSO₄',
    explanation: 'Cu đứng sau Fe trong dãy điện hóa nên không đẩy được Fe ra khỏi muối (tính khử Cu < Fe).',
    hint: 'Kim loại yếu không đẩy được kim loại mạnh.'
  },
  {
    id: 27,
    category: 'daydienhoa',
    type: 'multiple-choice',
    difficulty: 1,
    question: 'Trong dãy điện hóa, kim loại có tính khử mạnh nhất là:',
    options: ['K', 'Na', 'Ca', 'Mg'],
    correctAnswer: 'K',
    explanation: 'Trong dãy điện hóa, K đứng đầu tiên nên có tính khử mạnh nhất. Dãy: K, Na, Ca, Mg, Al, Zn, Fe...',
    hint: 'Đứng đầu dãy điện hóa.'
  },
  {
    id: 28,
    category: 'daydienhoa',
    type: 'multiple-choice',
    difficulty: 2,
    question: 'Trong pin điện hóa Zn-Cu, cực âm là:',
    options: ['Kẽm (Zn)', 'Đồng (Cu)', 'Cả hai', 'Không xác định'],
    correctAnswer: 'Kẽm (Zn)',
    explanation: 'Zn có tính khử mạnh hơn Cu nên Zn là cực âm (anot), bị oxi hóa: Zn → Zn²⁺ + 2e.',
    hint: 'Kim loại mạnh hơn là cực âm.'
  },
  {
    id: 29,
    category: 'daydienhoa',
    type: 'fill-blank',
    difficulty: 2,
    question: 'Trong pin điện hóa, cực dương còn gọi là ___.',
    correctAnswer: 'catot',
    acceptedAnswers: ['catot', 'cathode', 'catốt', 'cực dương'],
    explanation: 'Cực dương (catot) là nơi xảy ra quá trình khử: M^n+ + ne → M.',
    hint: 'Nơi xảy ra quá trình khử.'
  },
  {
    id: 30,
    category: 'daydienhoa',
    type: 'multiple-choice',
    difficulty: 3,
    question: 'Cho các kim loại: Fe, Cu, Ag, Al. Sắp xếp theo thứ tự tính khử giảm dần:',
    options: ['Al > Fe > Cu > Ag', 'Fe > Al > Cu > Ag', 'Ag > Cu > Fe > Al', 'Al > Cu > Fe > Ag'],
    correctAnswer: 'Al > Fe > Cu > Ag',
    explanation: 'Theo dãy điện hóa: K Na Ca Mg Al Zn Fe Ni Sn Pb H Cu Ag Au. Tính khử: Al > Fe > Cu > Ag.',
    hint: 'Theo thứ tự trong dãy điện hóa.'
  },
  {
    id: 31,
    category: 'daydienhoa',
    type: 'multiple-choice',
    difficulty: 2,
    question: 'Cho Fe vào dung dịch chứa AgNO₃ và Cu(NO₃)₂. Kim loại nào bị đẩy ra trước?',
    options: ['Ag', 'Cu', 'Cả hai cùng lúc', 'Không kim loại nào'],
    correctAnswer: 'Ag',
    explanation: 'Ag⁺ có tính oxi hóa mạnh hơn Cu²⁺ nên bị khử trước: Fe + 2Ag⁺ → Fe²⁺ + 2Ag.',
    hint: 'Ion nào có tính oxi hóa mạnh hơn.'
  },
  {
    id: 32,
    category: 'daydienhoa',
    type: 'multiple-choice',
    difficulty: 1,
    question: 'Cặp oxi hóa - khử của kim loại là:',
    options: ['M^n+/M', 'M/M^n+', 'M^n+/M^(n-1)+', 'M/M^(n+1)+'],
    correctAnswer: 'M^n+/M',
    explanation: 'Cặp oxi hóa - khử gồm dạng oxi hóa (M^n+) và dạng khử (M): M^n+ + ne ⇌ M.',
    hint: 'Dạng oxi hóa viết trước.'
  },
  {
    id: 33,
    category: 'daydienhoa',
    type: 'fill-blank',
    difficulty: 3,
    question: 'Suất điện động của pin Zn-Cu có giá trị khoảng ___ V.',
    correctAnswer: '1,1',
    acceptedAnswers: ['1,1', '1.1', '1,10', '1.10'],
    explanation: 'E°(pin) = E°(catot) - E°(anot) = E°(Cu²⁺/Cu) - E°(Zn²⁺/Zn) = 0,34 - (-0,76) = 1,10 V.',
    hint: 'Hiệu của hai thế điện cực chuẩn.'
  },
  {
    id: 34,
    category: 'daydienhoa',
    type: 'multiple-choice',
    difficulty: 2,
    question: 'Phản ứng nào sau đây xảy ra?',
    options: ['Fe + CuSO₄ → FeSO₄ + Cu', 'Cu + FeSO₄ → CuSO₄ + Fe', 'Ag + CuSO₄ → Ag₂SO₄ + Cu', 'Au + HCl → AuCl₃ + H₂'],
    correctAnswer: 'Fe + CuSO₄ → FeSO₄ + Cu',
    explanation: 'Fe đứng trước Cu trong dãy điện hóa nên đẩy được Cu ra khỏi dung dịch muối.',
    hint: 'Kim loại mạnh đẩy kim loại yếu.'
  },
  {
    id: 35,
    category: 'daydienhoa',
    type: 'multiple-choice',
    difficulty: 3,
    question: 'Trong cầu muối của pin điện hóa, vai trò chính là:',
    options: ['Dẫn ion, hoàn thành mạch điện', 'Dẫn electron', 'Cung cấp chất phản ứng', 'Làm tăng tốc độ phản ứng'],
    correctAnswer: 'Dẫn ion, hoàn thành mạch điện',
    explanation: 'Cầu muối cho phép ion di chuyển giữa hai nửa pin, trung hòa điện tích và hoàn thành mạch điện.',
    hint: 'Liên quan đến ion.'
  },
  {
    id: 36,
    category: 'daydienhoa',
    type: 'multiple-choice',
    difficulty: 2,
    question: 'Thế điện cực chuẩn của cặp Cu²⁺/Cu là +0,34V. Điều này có nghĩa:',
    options: ['Cu²⁺ có tính oxi hóa mạnh hơn H⁺', 'Cu có tính khử mạnh hơn H₂', 'Cu tan được trong HCl loãng', 'Cu²⁺ dễ bị khử hơn H⁺'],
    correctAnswer: 'Cu²⁺ có tính oxi hóa mạnh hơn H⁺',
    explanation: 'E° > 0 nghĩa là Cu²⁺ có tính oxi hóa mạnh hơn H⁺, Cu có tính khử yếu hơn H₂.',
    hint: 'So sánh với điện cực hydro chuẩn.'
  },

  // ========== ĂN MÒN & ĐIỀU CHẾ (12 câu) ==========
  {
    id: 37,
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
    id: 38,
    category: 'anmon',
    type: 'multiple-choice',
    difficulty: 2,
    question: 'Kim loại kiềm, kiềm thổ, nhôm được điều chế bằng phương pháp...',
    options: ['Điện phân nóng chảy', 'Điện phân dung dịch', 'Nhiệt luyện', 'Thủy luyện'],
    correctAnswer: 'Điện phân nóng chảy',
    explanation: 'Các kim loại mạnh (K, Na, Ca, Mg, Al) chỉ có thể điều chế bằng cách điện phân nóng chảy muối hoặc oxit.',
    hint: 'Kim loại mạnh.'
  },
  {
    id: 39,
    category: 'anmon',
    type: 'multiple-choice',
    difficulty: 1,
    question: 'Ăn mòn hóa học là:',
    options: ['Quá trình oxi hóa - khử trực tiếp', 'Quá trình điện hóa', 'Quá trình cơ học', 'Quá trình vật lý'],
    correctAnswer: 'Quá trình oxi hóa - khử trực tiếp',
    explanation: 'Ăn mòn hóa học là quá trình oxi hóa - khử, trong đó kim loại phản ứng trực tiếp với chất oxi hóa trong môi trường.',
    hint: 'Phản ứng trực tiếp.'
  },
  {
    id: 40,
    category: 'anmon',
    type: 'multiple-choice',
    difficulty: 2,
    question: 'Trong ăn mòn điện hóa, kim loại có tính khử mạnh hơn đóng vai trò:',
    options: ['Cực âm, bị ăn mòn', 'Cực dương, được bảo vệ', 'Không tham gia phản ứng', 'Xúc tác cho phản ứng'],
    correctAnswer: 'Cực âm, bị ăn mòn',
    explanation: 'Kim loại có tính khử mạnh hơn là anot (cực âm), bị oxi hóa và ăn mòn: M → M^n+ + ne.',
    hint: 'Anot bị oxi hóa.'
  },
  {
    id: 41,
    category: 'anmon',
    type: 'fill-blank',
    difficulty: 2,
    question: 'Phương pháp điều chế kim loại bằng cách dùng kim loại mạnh khử ion kim loại yếu gọi là phương pháp ___.',
    correctAnswer: 'thủy luyện',
    acceptedAnswers: ['thủy luyện', 'thuy luyen', 'thuỷ luyện'],
    explanation: 'Thủy luyện: dùng kim loại có tính khử mạnh đẩy kim loại yếu ra khỏi dung dịch muối.',
    hint: 'Liên quan đến dung dịch nước.'
  },
  {
    id: 42,
    category: 'anmon',
    type: 'multiple-choice',
    difficulty: 3,
    question: 'Để bảo vệ vỏ tàu biển bằng thép, người ta gắn vào vỏ tàu:',
    options: ['Các tấm kẽm', 'Các tấm đồng', 'Các tấm thiếc', 'Các tấm chì'],
    correctAnswer: 'Các tấm kẽm',
    explanation: 'Zn có tính khử mạnh hơn Fe nên Zn sẽ bị ăn mòn thay cho Fe (bảo vệ điện hóa).',
    hint: 'Kim loại mạnh hơn Fe.'
  },
  {
    id: 43,
    category: 'anmon',
    type: 'multiple-choice',
    difficulty: 2,
    question: 'Điều chế Cu từ CuSO₄ bằng phương pháp:',
    options: ['Điện phân dung dịch hoặc thủy luyện', 'Chỉ điện phân nóng chảy', 'Chỉ nhiệt luyện', 'Chỉ thủy luyện'],
    correctAnswer: 'Điện phân dung dịch hoặc thủy luyện',
    explanation: 'Cu có thể điều chế bằng điện phân dung dịch CuSO₄ hoặc dùng Fe đẩy Cu ra khỏi dung dịch (thủy luyện).',
    hint: 'Cu là kim loại trung bình.'
  },
  {
    id: 44,
    category: 'anmon',
    type: 'multiple-choice',
    difficulty: 3,
    question: 'Phản ứng nhiệt nhôm dùng để điều chế:',
    options: ['Kim loại có nhiệt độ nóng chảy cao như Fe, Cr', 'Kim loại kiềm như Na, K', 'Kim loại kiềm thổ như Ca, Mg', 'Kim loại quý như Au, Pt'],
    correctAnswer: 'Kim loại có nhiệt độ nóng chảy cao như Fe, Cr',
    explanation: 'Phản ứng nhiệt nhôm: 2Al + Fe₂O₃ → 2Fe + Al₂O₃, dùng điều chế kim loại có t°nc cao và hàn đường ray.',
    hint: 'Phản ứng tỏa nhiệt mạnh.'
  },
  {
    id: 45,
    category: 'anmon',
    type: 'fill-blank',
    difficulty: 1,
    question: 'Sắt tráng kẽm còn gọi là tôn ___.',
    correctAnswer: 'tráng kẽm',
    acceptedAnswers: ['tráng kẽm', 'mạ kẽm', 'kẽm'],
    explanation: 'Tôn tráng kẽm (tôn mạ kẽm) là sắt được phủ lớp kẽm bảo vệ khỏi ăn mòn.',
    hint: 'Phủ kim loại nào?'
  },
  {
    id: 46,
    category: 'anmon',
    type: 'multiple-choice',
    difficulty: 2,
    question: 'Khi điện phân dung dịch NaCl có màng ngăn, sản phẩm thu được là:',
    options: ['NaOH, H₂, Cl₂', 'Na, Cl₂', 'NaCl, O₂, H₂', 'Na, O₂, Cl₂'],
    correctAnswer: 'NaOH, H₂, Cl₂',
    explanation: 'Điện phân dung dịch NaCl có màng ngăn: 2NaCl + 2H₂O → 2NaOH + H₂↑ + Cl₂↑.',
    hint: 'Sản xuất xút.'
  },
  {
    id: 47,
    category: 'anmon',
    type: 'multiple-choice',
    difficulty: 3,
    question: 'Trong điện phân dung dịch CuSO₄ với điện cực trơ, ở catot xảy ra:',
    options: ['Cu²⁺ + 2e → Cu', '2H₂O → O₂ + 4H⁺ + 4e', 'SO₄²⁻ → SO₂ + O₂ + 2e', '2H₂O + 2e → H₂ + 2OH⁻'],
    correctAnswer: 'Cu²⁺ + 2e → Cu',
    explanation: 'Ở catot (cực âm) xảy ra quá trình khử: Cu²⁺ + 2e → Cu (kim loại Cu bám vào catot).',
    hint: 'Catot là nơi xảy ra khử.'
  },
  {
    id: 48,
    category: 'anmon',
    type: 'multiple-choice',
    difficulty: 2,
    question: 'Hợp kim là:',
    options: ['Chất rắn thu được khi nấu chảy kim loại với nguyên tố khác', 'Kim loại nguyên chất', 'Hỗn hợp các kim loại ở dạng bột', 'Dung dịch kim loại trong nước'],
    correctAnswer: 'Chất rắn thu được khi nấu chảy kim loại với nguyên tố khác',
    explanation: 'Hợp kim là chất rắn thu được sau khi làm nguội hỗn hợp nóng chảy của kim loại với kim loại hoặc phi kim khác.',
    hint: 'Kết hợp nhiều nguyên tố.'
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
  const [categoryProgress, setCategoryProgress] = useState({});
  const [highScore, setHighScore] = useState(0);
  const [hasStartedNewGame, setHasStartedNewGame] = useState(false);
  const [gameInProgress, setGameInProgress] = useState(false);
  const [totalCorrectAnswers, setTotalCorrectAnswers] = useState(0);
  const [totalScore, setTotalScore] = useState(0);

  // ========== CHALLENGE PROGRESS ==========
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
                <span>Đã hoàn thành: <strong>{Object.values(categoryProgress).filter(p => p >= 80).length}/{CATEGORIES.length}</strong></span>
              </div>
              <div className="stat-item-kimloai">
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

            <div className="category-grid-kimloai">
              {CATEGORIES.map((cat) => {
                const Icon = cat.icon;
                const catPercentage = categoryProgress[cat.id] || 0;
                const isCompleted = catPercentage >= 80;
                const hasProgress = catPercentage > 0 && catPercentage < 80;
                
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
                    {Math.min(100, Math.round((score / (filteredQuestions.length * 20)) * 100))}%
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
