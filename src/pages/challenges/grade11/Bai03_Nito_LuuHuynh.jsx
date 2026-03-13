import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowLeft, Trophy, Play, RotateCcw, ChevronRight, ChevronLeft,
  CheckCircle2, XCircle, Lightbulb, HelpCircle, Zap, Award,
  FlaskConical, Beaker, Thermometer, Wind, Droplets, Flame,
  AlertTriangle, Star, Target, Clock, Atom
} from 'lucide-react';
import useChallengeProgress from '../../../hooks/useChallengeProgress';
import ResumeDialog from '../../../components/ResumeDialog';
import './CSS/Bai03_Nito_LuuHuynh.css';

// ================== DATA - NITƠ VÀ LƯU HUỲNH ==================
const CATEGORIES = [
  {
    id: 'nitrogen',
    name: 'Nitơ & Hợp chất',
    icon: Wind,
    color: '#3b82f6',
    description: 'N₂, NH₃, HNO₃ và muối nitrat',
    bgGradient: 'from-blue-500 to-cyan-500'
  },
  {
    id: 'sulfur',
    name: 'Lưu huỳnh & Hợp chất',
    icon: Flame,
    color: '#f59e0b',
    description: 'S, H₂S, SO₂, H₂SO₄',
    bgGradient: 'from-yellow-500 to-orange-500'
  },
  {
    id: 'reactions',
    name: 'Phản ứng đặc trưng',
    icon: FlaskConical,
    color: '#8b5cf6',
    description: 'Phản ứng oxi hóa-khử, nhiệt phân',
    bgGradient: 'from-purple-500 to-pink-500'
  },
  {
    id: 'applications',
    name: 'Ứng dụng thực tế',
    icon: Beaker,
    color: '#10b981',
    description: 'Công nghiệp, nông nghiệp, đời sống',
    bgGradient: 'from-green-500 to-teal-500'
  }
];

// Bộ câu hỏi tĩnh - NITƠ VÀ LƯU HUỲNH (45 câu)
const CHALLENGES = [
  // ========== NITƠ & HỢP CHẤT (12 câu) ==========
  {
    id: 1,
    category: 'nitrogen',
    type: 'multiple-choice',
    difficulty: 1,
    question: 'Nitơ chiếm bao nhiêu phần trăm thể tích không khí?',
    options: ['21%', '78%', '1%', '0.03%'],
    correctAnswer: '78%',
    explanation: 'Không khí gồm khoảng 78% N₂, 21% O₂, 1% các khí khác (Ar, CO₂, Ne...).',
    hint: 'Nitơ là thành phần chính của không khí.'
  },
  {
    id: 2,
    category: 'nitrogen',
    type: 'multiple-choice',
    difficulty: 2,
    question: 'Amoniac (NH₃) có tính chất hóa học đặc trưng nào?',
    options: ['Tính axit mạnh', 'Tính bazơ yếu và tính khử', 'Tính oxi hóa mạnh', 'Tính trung tính'],
    correctAnswer: 'Tính bazơ yếu và tính khử',
    explanation: 'NH₃ có cặp electron tự do nên có tính bazơ yếu. N trong NH₃ có số oxi hóa -3 (thấp nhất) nên chỉ thể hiện tính khử.',
    hint: 'Xét số oxi hóa của N trong NH₃.'
  },
  {
    id: 3,
    category: 'nitrogen',
    type: 'multiple-choice',
    difficulty: 1,
    question: 'Tại sao N₂ được gọi là khí trơ ở điều kiện thường?',
    options: ['Vì N₂ không màu, không mùi', 'Vì liên kết N≡N rất bền vững', 'Vì N₂ nhẹ hơn không khí', 'Vì N₂ không tan trong nước'],
    correctAnswer: 'Vì liên kết N≡N rất bền vững',
    explanation: 'Phân tử N₂ có liên kết ba (N≡N) với năng lượng liên kết rất lớn (946 kJ/mol), nên N₂ rất bền và khó phản ứng ở điều kiện thường.',
    hint: 'Liên kết ba trong phân tử N₂.'
  },
  {
    id: 4,
    category: 'nitrogen',
    type: 'multiple-choice',
    difficulty: 2,
    question: 'Số oxi hóa của N trong HNO₃ là:',
    options: ['-3', '0', '+3', '+5'],
    correctAnswer: '+5',
    explanation: 'Trong HNO₃: H có số oxi hóa +1, O có số oxi hóa -2. Ta có: +1 + x + 3×(-2) = 0 → x = +5.',
    hint: 'Tính theo quy tắc: tổng số oxi hóa = 0.'
  },
  {
    id: 5,
    category: 'nitrogen',
    type: 'multiple-choice',
    difficulty: 2,
    question: 'HNO₃ đặc nguội thụ động hóa kim loại nào?',
    options: ['Cu, Ag', 'Fe, Al, Cr', 'Zn, Mg', 'Na, K'],
    correctAnswer: 'Fe, Al, Cr',
    explanation: 'HNO₃ đặc nguội tạo lớp oxit bảo vệ bền vững trên bề mặt Fe, Al, Cr khiến chúng bị thụ động hóa.',
    hint: 'Các kim loại tạo lớp oxit bảo vệ.'
  },
  {
    id: 6,
    category: 'nitrogen',
    type: 'multiple-choice',
    difficulty: 3,
    question: 'Sản phẩm khử của HNO₃ loãng khi tác dụng với Mg là:',
    options: ['NO₂', 'NO', 'N₂O', 'NH₄NO₃'],
    correctAnswer: 'NH₄NO₃',
    explanation: 'Mg là kim loại hoạt động mạnh, HNO₃ rất loãng có thể bị khử sâu đến NH₄⁺: 4Mg + 10HNO₃ → 4Mg(NO₃)₂ + NH₄NO₃ + 3H₂O.',
    hint: 'Kim loại mạnh + HNO₃ rất loãng.'
  },
  {
    id: 7,
    category: 'nitrogen',
    type: 'true-false',
    difficulty: 1,
    question: 'NH₃ làm quỳ tím ẩm chuyển sang màu xanh.',
    correctAnswer: true,
    explanation: 'NH₃ tan trong nước tạo dung dịch bazơ yếu: NH₃ + H₂O ⇌ NH₄⁺ + OH⁻, làm quỳ tím hóa xanh.',
    hint: 'NH₃ có tính bazơ.'
  },
  {
    id: 8,
    category: 'nitrogen',
    type: 'multiple-choice',
    difficulty: 2,
    question: 'Phương pháp công nghiệp điều chế NH₃ là:',
    options: ['Nhiệt phân muối amoni', 'Tổng hợp từ N₂ và H₂ (Haber)', 'Cho muối amoni tác dụng với kiềm', 'Đốt cháy các hợp chất chứa N'],
    correctAnswer: 'Tổng hợp từ N₂ và H₂ (Haber)',
    explanation: 'Quy trình Haber: N₂ + 3H₂ ⇌ 2NH₃ (xúc tác Fe, 450-500°C, 200-300 atm).',
    hint: 'Quy trình công nghiệp nổi tiếng.'
  },
  {
    id: 9,
    category: 'nitrogen',
    type: 'multiple-choice',
    difficulty: 2,
    question: 'Khi nhiệt phân Cu(NO₃)₂, sản phẩm thu được là:',
    options: ['Cu + NO₂ + O₂', 'CuO + NO₂ + O₂', 'Cu₂O + NO₂ + O₂', 'Cu(NO₂)₂ + O₂'],
    correctAnswer: 'CuO + NO₂ + O₂',
    explanation: '2Cu(NO₃)₂ → 2CuO + 4NO₂↑ + O₂↑. Muối nitrat của kim loại từ Mg đến Cu cho oxit kim loại.',
    hint: 'Cu đứng sau Mg trong dãy hoạt động.'
  },
  {
    id: 10,
    category: 'nitrogen',
    type: 'fill-blank',
    difficulty: 2,
    question: 'Số oxi hóa của N trong NH₄⁺ là bao nhiêu?',
    correctAnswer: '-3',
    explanation: 'Trong NH₄⁺: 4H có số oxi hóa +4, ion có điện tích +1. Ta có: x + 4 = +1 → x = -3.',
    hint: 'N trong NH₄⁺ có số oxi hóa thấp nhất.'
  },
  {
    id: 11,
    category: 'nitrogen',
    type: 'multiple-choice',
    difficulty: 3,
    question: 'Phản ứng nào sau đây chứng minh tính khử của NH₃?',
    options: ['NH₃ + HCl → NH₄Cl', 'NH₃ + H₂O ⇌ NH₄⁺ + OH⁻', '4NH₃ + 3O₂ → 2N₂ + 6H₂O', 'NH₃ + H₃PO₄ → (NH₄)₃PO₄'],
    correctAnswer: '4NH₃ + 3O₂ → 2N₂ + 6H₂O',
    explanation: 'Trong phản ứng này, N từ -3 (trong NH₃) lên 0 (trong N₂), NH₃ bị oxi hóa nên thể hiện tính khử.',
    hint: 'Phản ứng làm thay đổi số oxi hóa của N.'
  },
  {
    id: 12,
    category: 'nitrogen',
    type: 'true-false',
    difficulty: 2,
    question: 'HNO₃ có thể oxi hóa được hầu hết các kim loại, kể cả Au và Pt.',
    correctAnswer: false,
    explanation: 'HNO₃ không oxi hóa được Au và Pt. Chỉ nước cường toan (3HCl + HNO₃) mới hòa tan được Au và Pt.',
    hint: 'Au và Pt cần nước cường toan.'
  },

  // ========== LƯU HUỲNH & HỢP CHẤT (12 câu) ==========
  {
    id: 13,
    category: 'sulfur',
    type: 'multiple-choice',
    difficulty: 1,
    question: 'Khí H₂S có mùi gì đặc trưng?',
    options: ['Mùi khai', 'Mùi trứng thối', 'Mùi hắc', 'Không mùi'],
    correctAnswer: 'Mùi trứng thối',
    explanation: 'H₂S có mùi trứng thối đặc trưng, rất độc.',
    hint: 'Đây là mùi quen thuộc khi trứng bị hỏng.'
  },
  {
    id: 14,
    category: 'sulfur',
    type: 'multiple-choice',
    difficulty: 2,
    question: 'SO₂ có tính chất hóa học đặc trưng nào?',
    options: ['Chỉ có tính oxi hóa', 'Chỉ có tính khử', 'Vừa có tính oxi hóa, vừa có tính khử', 'Không có tính oxi hóa-khử'],
    correctAnswer: 'Vừa có tính oxi hóa, vừa có tính khử',
    explanation: 'S trong SO₂ có số oxi hóa +4 (trung gian giữa -2 và +6) nên vừa có tính oxi hóa, vừa có tính khử.',
    hint: 'Số oxi hóa +4 của S là trung gian.'
  },
  {
    id: 15,
    category: 'sulfur',
    type: 'multiple-choice',
    difficulty: 1,
    question: 'Lưu huỳnh có các dạng thù hình nào?',
    options: ['S tà phương và S đơn tà', 'S trắng và S đỏ', 'S alpha và S beta', 'S tinh thể và S vô định hình'],
    correctAnswer: 'S tà phương và S đơn tà',
    explanation: 'Lưu huỳnh có hai dạng thù hình chính: S tà phương (Sα, bền ở t° < 95.5°C) và S đơn tà (Sβ, bền ở t° > 95.5°C).',
    hint: 'Hai dạng tinh thể của lưu huỳnh.'
  },
  {
    id: 16,
    category: 'sulfur',
    type: 'multiple-choice',
    difficulty: 2,
    question: 'H₂S chỉ thể hiện tính khử vì:',
    options: ['H₂S là axit yếu', 'S trong H₂S có số oxi hóa -2 (thấp nhất)', 'H₂S có mùi khó chịu', 'H₂S ít tan trong nước'],
    correctAnswer: 'S trong H₂S có số oxi hóa -2 (thấp nhất)',
    explanation: 'S có các số oxi hóa: -2, 0, +4, +6. Trong H₂S, S có số oxi hóa -2 (thấp nhất) nên chỉ có thể tăng, tức chỉ thể hiện tính khử.',
    hint: 'Số oxi hóa thấp nhất chỉ có thể tăng.'
  },
  {
    id: 17,
    category: 'sulfur',
    type: 'multiple-choice',
    difficulty: 2,
    question: 'Sản phẩm khi đốt cháy H₂S trong điều kiện thiếu oxi là:',
    options: ['S + H₂O', 'SO₂ + H₂O', 'SO₃ + H₂O', 'H₂SO₄'],
    correctAnswer: 'S + H₂O',
    explanation: '2H₂S + O₂ (thiếu) → 2S↓ + 2H₂O. Khi thiếu oxi, H₂S bị oxi hóa không hoàn toàn tạo S.',
    hint: 'Oxi hóa không hoàn toàn.'
  },
  {
    id: 18,
    category: 'sulfur',
    type: 'multiple-choice',
    difficulty: 3,
    question: 'H₂SO₄ đặc nóng có thể oxi hóa được chất nào sau đây?',
    options: ['NaCl', 'Cu', 'Au', 'Pt'],
    correctAnswer: 'Cu',
    explanation: 'Cu + 2H₂SO₄ đặc nóng → CuSO₄ + SO₂↑ + 2H₂O. H₂SO₄ đặc nóng oxi hóa được các kim loại đứng sau H trong dãy hoạt động.',
    hint: 'Kim loại kém hoạt động nhưng không phải quý.'
  },
  {
    id: 19,
    category: 'sulfur',
    type: 'true-false',
    difficulty: 2,
    question: 'H₂SO₄ loãng có thể tác dụng với Cu.',
    correctAnswer: false,
    explanation: 'Cu đứng sau H trong dãy hoạt động nên không thể đẩy H ra khỏi H₂SO₄ loãng. Chỉ H₂SO₄ đặc nóng mới oxi hóa được Cu.',
    hint: 'Cu đứng sau H trong dãy điện hóa.'
  },
  {
    id: 20,
    category: 'sulfur',
    type: 'multiple-choice',
    difficulty: 2,
    question: 'Oleum là:',
    options: ['Dung dịch H₂SO₄ đặc', 'H₂SO₄ hòa tan SO₃', 'Hỗn hợp H₂SO₄ và HNO₃', 'H₂SO₄ khan'],
    correctAnswer: 'H₂SO₄ hòa tan SO₃',
    explanation: 'Oleum (H₂SO₄.nSO₃) là hỗn hợp H₂SO₄ đậm đặc có hòa tan thêm SO₃, dùng trong công nghiệp sản xuất axit.',
    hint: 'Dạng đậm đặc hơn cả H₂SO₄ khan.'
  },
  {
    id: 21,
    category: 'sulfur',
    type: 'fill-blank',
    difficulty: 2,
    question: 'Số oxi hóa của S trong H₂SO₄ là bao nhiêu?',
    correctAnswer: '+6',
    explanation: 'Trong H₂SO₄: 2H có số oxi hóa +2, 4O có số oxi hóa -8. Ta có: +2 + x + (-8) = 0 → x = +6.',
    hint: 'Số oxi hóa cao nhất của S.'
  },
  {
    id: 22,
    category: 'sulfur',
    type: 'multiple-choice',
    difficulty: 2,
    question: 'Phản ứng nào chứng minh SO₂ có tính khử?',
    options: ['SO₂ + NaOH → NaHSO₃', 'SO₂ + H₂O → H₂SO₃', 'SO₂ + Br₂ + 2H₂O → H₂SO₄ + 2HBr', 'SO₂ + 2H₂S → 3S + 2H₂O'],
    correctAnswer: 'SO₂ + Br₂ + 2H₂O → H₂SO₄ + 2HBr',
    explanation: 'Trong phản ứng này, S từ +4 (SO₂) lên +6 (H₂SO₄), SO₂ bị oxi hóa nên thể hiện tính khử.',
    hint: 'Phản ứng làm mất màu nước brom.'
  },
  {
    id: 23,
    category: 'sulfur',
    type: 'multiple-choice',
    difficulty: 3,
    question: 'Khi cho S tác dụng với H₂SO₄ đặc nóng, sản phẩm là:',
    options: ['H₂S + H₂O', 'SO₂ + H₂O', 'SO₃ + H₂O', 'S không phản ứng'],
    correctAnswer: 'SO₂ + H₂O',
    explanation: 'S + 2H₂SO₄ đặc nóng → 3SO₂↑ + 2H₂O. H₂SO₄ đặc nóng oxi hóa S từ 0 lên +4.',
    hint: 'S bị oxi hóa bởi H₂SO₄ đặc nóng.'
  },
  {
    id: 24,
    category: 'sulfur',
    type: 'true-false',
    difficulty: 2,
    question: 'H₂SO₄ đặc có tính háo nước rất mạnh.',
    correctAnswer: true,
    explanation: 'H₂SO₄ đặc hút nước mạnh, có thể làm than hóa đường, gỗ, giấy. Đây là tính chất vật lý đặc trưng của H₂SO₄ đặc.',
    hint: 'Tính chất đặc trưng của H₂SO₄ đặc.'
  },

  // ========== PHẢN ỨNG ĐẶC TRƯNG (11 câu) ==========
  {
    id: 25,
    category: 'reactions',
    type: 'multiple-choice',
    difficulty: 2,
    question: 'Phản ứng nào sau đây dùng để nhận biết ion SO₄²⁻?',
    options: ['Tác dụng với NaOH', 'Tác dụng với BaCl₂ tạo kết tủa trắng', 'Tác dụng với AgNO₃', 'Tác dụng với HCl'],
    correctAnswer: 'Tác dụng với BaCl₂ tạo kết tủa trắng',
    explanation: 'SO₄²⁻ + Ba²⁺ → BaSO₄↓ (trắng, không tan trong axit). Đây là phản ứng đặc trưng để nhận biết ion sunfat.',
    hint: 'Kết tủa trắng không tan trong axit.'
  },
  {
    id: 26,
    category: 'reactions',
    type: 'multiple-choice',
    difficulty: 2,
    question: 'Để nhận biết ion NH₄⁺, ta cho tác dụng với:',
    options: ['HCl', 'BaCl₂', 'AgNO₃', 'NaOH đun nóng'],
    correctAnswer: 'NaOH đun nóng',
    explanation: 'NH₄⁺ + OH⁻ → NH₃↑ + H₂O. Khí NH₃ có mùi khai, làm xanh giấy quỳ ẩm.',
    hint: 'Tạo khí có mùi khai khi đun nóng với bazơ.'
  },
  {
    id: 27,
    category: 'reactions',
    type: 'multiple-choice',
    difficulty: 2,
    question: 'Khi nhiệt phân AgNO₃, sản phẩm thu được là:',
    options: ['Ag₂O + NO₂ + O₂', 'Ag + NO₂ + O₂', 'Ag + NO + O₂', 'AgNO₂ + O₂'],
    correctAnswer: 'Ag + NO₂ + O₂',
    explanation: '2AgNO₃ → 2Ag + 2NO₂↑ + O₂↑. Muối nitrat của kim loại sau Cu cho kim loại tự do.',
    hint: 'Ag đứng sau Cu trong dãy hoạt động.'
  },
  {
    id: 28,
    category: 'reactions',
    type: 'multiple-choice',
    difficulty: 2,
    question: 'Khi nhiệt phân KNO₃, sản phẩm thu được là:',
    options: ['K + NO₂ + O₂', 'K₂O + NO₂ + O₂', 'KNO₂ + O₂', 'K₂O + N₂ + O₂'],
    correctAnswer: 'KNO₂ + O₂',
    explanation: '2KNO₃ → 2KNO₂ + O₂↑. Muối nitrat của kim loại trước Mg cho muối nitrit và O₂.',
    hint: 'K đứng trước Mg trong dãy hoạt động.'
  },
  {
    id: 29,
    category: 'reactions',
    type: 'multiple-choice',
    difficulty: 3,
    question: 'Cho Fe tác dụng với HNO₃ loãng dư, sản phẩm muối thu được là:',
    options: ['Fe(NO₃)₂', 'Fe(NO₃)₃', 'Fe₂O₃', 'FeO'],
    correctAnswer: 'Fe(NO₃)₃',
    explanation: 'Fe + 4HNO₃ loãng dư → Fe(NO₃)₃ + NO↑ + 2H₂O. HNO₃ có tính oxi hóa mạnh nên oxi hóa Fe lên Fe³⁺.',
    hint: 'HNO₃ oxi hóa Fe đến mức cao nhất.'
  },
  {
    id: 30,
    category: 'reactions',
    type: 'multiple-choice',
    difficulty: 3,
    question: 'Cho Fe dư tác dụng với HNO₃ loãng, sản phẩm muối thu được là:',
    options: ['Fe(NO₃)₂', 'Fe(NO₃)₃', 'Hỗn hợp Fe(NO₃)₂ và Fe(NO₃)₃', 'FeNO₃'],
    correctAnswer: 'Fe(NO₃)₂',
    explanation: '3Fe + 8HNO₃ loãng → 3Fe(NO₃)₂ + 2NO↑ + 4H₂O. Fe dư khử Fe³⁺ về Fe²⁺.',
    hint: 'Fe dư sẽ khử Fe³⁺.'
  },
  {
    id: 31,
    category: 'reactions',
    type: 'true-false',
    difficulty: 2,
    question: 'Phản ứng SO₂ + 2H₂S → 3S + 2H₂O chứng minh SO₂ có tính oxi hóa.',
    correctAnswer: true,
    explanation: 'Trong phản ứng này, S trong SO₂ từ +4 xuống 0 (trong S), SO₂ bị khử nên thể hiện tính oxi hóa.',
    hint: 'Số oxi hóa của S giảm.'
  },
  {
    id: 32,
    category: 'reactions',
    type: 'multiple-choice',
    difficulty: 2,
    question: 'Để nhận biết ion NO₃⁻ trong dung dịch, ta dùng:',
    options: ['Dung dịch BaCl₂', 'Dung dịch AgNO₃', 'Cu và H₂SO₄ loãng đun nóng', 'Dung dịch NaOH'],
    correctAnswer: 'Cu và H₂SO₄ loãng đun nóng',
    explanation: '3Cu + 8H⁺ + 2NO₃⁻ → 3Cu²⁺ + 2NO↑ + 4H₂O. Khí NO không màu, hóa nâu trong không khí.',
    hint: 'Tạo khí không màu hóa nâu.'
  },
  {
    id: 33,
    category: 'reactions',
    type: 'multiple-choice',
    difficulty: 2,
    question: 'Phản ứng nào sau đây là phản ứng oxi hóa-khử?',
    options: ['NaOH + HCl → NaCl + H₂O', 'BaCl₂ + H₂SO₄ → BaSO₄↓ + 2HCl', '2NO₂ + 2NaOH → NaNO₃ + NaNO₂ + H₂O', 'CaCO₃ + 2HCl → CaCl₂ + CO₂ + H₂O'],
    correctAnswer: '2NO₂ + 2NaOH → NaNO₃ + NaNO₂ + H₂O',
    explanation: 'N trong NO₂ có số oxi hóa +4, sau phản ứng: N trong NaNO₃ (+5), N trong NaNO₂ (+3). Đây là phản ứng tự oxi hóa-khử.',
    hint: 'N vừa tăng vừa giảm số oxi hóa.'
  },
  {
    id: 34,
    category: 'reactions',
    type: 'fill-blank',
    difficulty: 3,
    question: 'Trong phản ứng: Cu + HNO₃ loãng → Cu(NO₃)₂ + NO + H₂O. Hệ số cân bằng của HNO₃ là bao nhiêu?',
    correctAnswer: '8',
    explanation: '3Cu + 8HNO₃ loãng → 3Cu(NO₃)₂ + 2NO↑ + 4H₂O. Cân bằng theo phương pháp thăng bằng electron.',
    hint: 'Cân bằng phương trình oxi hóa-khử.'
  },
  {
    id: 35,
    category: 'reactions',
    type: 'multiple-choice',
    difficulty: 3,
    question: 'Nhiệt phân NH₄NO₃ thu được sản phẩm là:',
    options: ['N₂ + H₂O', 'N₂O + H₂O', 'NO + H₂O', 'NO₂ + H₂O'],
    correctAnswer: 'N₂O + H₂O',
    explanation: 'NH₄NO₃ → N₂O↑ + 2H₂O. Đây là phản ứng nội oxi hóa-khử của NH₄NO₃.',
    hint: 'Muối amoni của axit oxi hóa.'
  },

  // ========== ỨNG DỤNG THỰC TẾ (10 câu) ==========
  {
    id: 36,
    category: 'applications',
    type: 'multiple-choice',
    difficulty: 1,
    question: 'Phân đạm urê có công thức hóa học là:',
    options: ['NH₄NO₃', '(NH₂)₂CO', 'NH₄Cl', '(NH₄)₂SO₄'],
    correctAnswer: '(NH₂)₂CO',
    explanation: 'Urê (NH₂)₂CO chứa 46% N, là loại phân đạm có hàm lượng đạm cao nhất.',
    hint: 'Phân đạm có hàm lượng N cao nhất.'
  },
  {
    id: 37,
    category: 'applications',
    type: 'multiple-choice',
    difficulty: 2,
    question: 'Hiện tượng "mưa axit" chủ yếu do khí nào gây ra?',
    options: ['CO₂', 'SO₂ và NOₓ', 'CH₄', 'O₃'],
    correctAnswer: 'SO₂ và NOₓ',
    explanation: 'SO₂ + H₂O → H₂SO₃; NO₂ + H₂O → HNO₃ + HNO₂. Các khí này từ nhà máy, xe cộ hòa tan trong nước mưa tạo axit.',
    hint: 'Khí thải công nghiệp và giao thông.'
  },
  {
    id: 38,
    category: 'applications',
    type: 'multiple-choice',
    difficulty: 1,
    question: 'H₂SO₄ được gọi là "hóa chất hàng đầu" vì:',
    options: ['Có giá rẻ nhất', 'Sản lượng lớn nhất, ứng dụng rộng rãi nhất', 'Độc hại nhất', 'Phát minh đầu tiên'],
    correctAnswer: 'Sản lượng lớn nhất, ứng dụng rộng rãi nhất',
    explanation: 'H₂SO₄ được sản xuất với sản lượng lớn nhất và có nhiều ứng dụng trong công nghiệp: phân bón, luyện kim, sản xuất hóa chất...',
    hint: 'Dùng trong nhiều ngành công nghiệp.'
  },
  {
    id: 39,
    category: 'applications',
    type: 'multiple-choice',
    difficulty: 2,
    question: 'Quy trình sản xuất H₂SO₄ trong công nghiệp được gọi là:',
    options: ['Quy trình Haber', 'Quy trình tiếp xúc', 'Quy trình Solvay', 'Quy trình điện phân'],
    correctAnswer: 'Quy trình tiếp xúc',
    explanation: 'Quy trình tiếp xúc: S → SO₂ → SO₃ → H₂SO₄. Xúc tác V₂O₅ ở giai đoạn SO₂ → SO₃.',
    hint: 'Xúc tác V₂O₅.'
  },
  {
    id: 40,
    category: 'applications',
    type: 'multiple-choice',
    difficulty: 2,
    question: 'Phân đạm amoni nitrat có công thức là:',
    options: ['NH₄NO₃', '(NH₄)₂SO₄', 'NH₄Cl', '(NH₂)₂CO'],
    correctAnswer: 'NH₄NO₃',
    explanation: 'NH₄NO₃ chứa 35% N (cả trong NH₄⁺ và NO₃⁻), là phân đạm phổ biến.',
    hint: 'Chứa cả ion amoni và ion nitrat.'
  },
  {
    id: 41,
    category: 'applications',
    type: 'true-false',
    difficulty: 2,
    question: 'Nitơ lỏng được dùng để bảo quản mẫu sinh học vì có nhiệt độ sôi rất thấp (-196°C).',
    correctAnswer: true,
    explanation: 'N₂ lỏng (-196°C) được dùng để đông lạnh nhanh và bảo quản tinh trùng, trứng, tế bào gốc, mô...',
    hint: 'Nhiệt độ cực thấp để bảo quản.'
  },
  {
    id: 42,
    category: 'applications',
    type: 'multiple-choice',
    difficulty: 2,
    question: 'Tại sao không được bón phân đạm amoni cùng với vôi?',
    options: ['Vì tạo kết tủa', 'Vì giải phóng NH₃ làm mất đạm', 'Vì tạo hợp chất độc', 'Vì làm cây chết'],
    correctAnswer: 'Vì giải phóng NH₃ làm mất đạm',
    explanation: '2NH₄⁺ + Ca(OH)₂ → Ca²⁺ + 2NH₃↑ + 2H₂O. NH₃ bay hơi làm mất đạm.',
    hint: 'Vôi là chất kiềm.'
  },
  {
    id: 43,
    category: 'applications',
    type: 'multiple-choice',
    difficulty: 1,
    question: 'SO₂ được dùng để:',
    options: ['Làm phân bón', 'Tẩy trắng bột giấy, đường', 'Điều chế thuốc nổ', 'Sản xuất xi măng'],
    correctAnswer: 'Tẩy trắng bột giấy, đường',
    explanation: 'SO₂ có tính khử, dùng để tẩy trắng bột giấy, đường, diệt nấm mốc trong thực phẩm.',
    hint: 'Tính tẩy màu của SO₂.'
  },
  {
    id: 44,
    category: 'applications',
    type: 'multiple-choice',
    difficulty: 2,
    question: 'Diêm tiêu (KNO₃) được dùng để:',
    options: ['Làm phân bón', 'Sản xuất thuốc nổ đen', 'Tẩy trắng vải', 'Diệt khuẩn'],
    correctAnswer: 'Sản xuất thuốc nổ đen',
    explanation: 'Thuốc nổ đen = KNO₃ + C + S. KNO₃ cung cấp oxi cho phản ứng cháy nổ.',
    hint: 'Thành phần của thuốc nổ đen.'
  },
  {
    id: 45,
    category: 'applications',
    type: 'multiple-choice',
    difficulty: 2,
    question: 'Trong công nghiệp, axit nitric được điều chế từ:',
    options: ['N₂ và O₂', 'NH₃ (quy trình Ostwald)', 'NaNO₃ và H₂SO₄', 'NO₂ và H₂O'],
    correctAnswer: 'NH₃ (quy trình Ostwald)',
    explanation: 'Quy trình Ostwald: 4NH₃ + 5O₂ → 4NO + 6H₂O; 2NO + O₂ → 2NO₂; 4NO₂ + O₂ + 2H₂O → 4HNO₃.',
    hint: 'Oxi hóa NH₃ trên xúc tác Pt.'
  }
];

// ================== GAME COMPONENT ==================
function QuestionCard({ challenge, userAnswer, setUserAnswer, showResult, isCorrect }) {
  const renderQuestion = () => {
    switch (challenge.type) {
      case 'multiple-choice':
        return (
          <div className="options-grid">
            {challenge.options.map((option, idx) => (
              <button
                key={idx}
                className={`option-btn ${userAnswer === option ? 'selected' : ''} 
                  ${showResult && option === challenge.correctAnswer ? 'correct' : ''}
                  ${showResult && userAnswer === option && option !== challenge.correctAnswer ? 'incorrect' : ''}`}
                onClick={() => !showResult && setUserAnswer(option)}
                disabled={showResult}
              >
                <span className="option-letter">{String.fromCharCode(65 + idx)}</span>
                <span className="option-text">{option}</span>
              </button>
            ))}
          </div>
        );

      case 'true-false':
        return (
          <div className="true-false-options">
            <button
              className={`tf-btn ${userAnswer === true ? 'selected' : ''} 
                ${showResult && challenge.correctAnswer === true ? 'correct' : ''}
                ${showResult && userAnswer === true && challenge.correctAnswer !== true ? 'incorrect' : ''}`}
              onClick={() => !showResult && setUserAnswer(true)}
              disabled={showResult}
            >
              <CheckCircle2 className="w-6 h-6" />
              <span>Đúng</span>
            </button>
            <button
              className={`tf-btn ${userAnswer === false ? 'selected' : ''} 
                ${showResult && challenge.correctAnswer === false ? 'correct' : ''}
                ${showResult && userAnswer === false && challenge.correctAnswer !== false ? 'incorrect' : ''}`}
              onClick={() => !showResult && setUserAnswer(false)}
              disabled={showResult}
            >
              <XCircle className="w-6 h-6" />
              <span>Sai</span>
            </button>
          </div>
        );

      case 'fill-blank':
      case 'calculation':
        return (
          <div className="fill-blank-container">
            <input
              type="text"
              value={userAnswer || ''}
              onChange={(e) => !showResult && setUserAnswer(e.target.value)}
              placeholder={challenge.type === 'calculation' ? 'Nhập kết quả...' : 'Nhập câu trả lời...'}
              className={`fill-input ${showResult ? (isCorrect ? 'correct' : 'incorrect') : ''}`}
              disabled={showResult}
            />
            {challenge.unit && <span className="unit-label">{challenge.unit}</span>}
          </div>
        );

      case 'ordering':
        return (
          <OrderingQuestion
            items={challenge.items}
            userAnswer={userAnswer}
            setUserAnswer={setUserAnswer}
            showResult={showResult}
            correctOrder={challenge.correctOrder}
          />
        );

      case 'matching':
        return (
          <MatchingQuestion
            pairs={challenge.pairs}
            userAnswer={userAnswer}
            setUserAnswer={setUserAnswer}
            showResult={showResult}
          />
        );

      default:
        return <p>Loại câu hỏi không hỗ trợ</p>;
    }
  };

  return (
    <div className="question-card">
      <div className="question-header">
        <span className={`difficulty-badge diff-${challenge.difficulty}`}>
          {'⭐'.repeat(challenge.difficulty)}
        </span>
        <span className="question-type">{getQuestionTypeName(challenge.type)}</span>
      </div>
      <h3 className="question-text">{challenge.question}</h3>
      {renderQuestion()}
    </div>
  );
}

function OrderingQuestion({ items, userAnswer, setUserAnswer, showResult, correctOrder }) {
  const [orderedItems, setOrderedItems] = useState([]);

  useEffect(() => {
    if (!userAnswer || userAnswer.length === 0) {
      setOrderedItems(items.map((item, idx) => ({ text: item, originalIndex: idx })));
    }
  }, [items, userAnswer]);

  const moveItem = (fromIndex, toIndex) => {
    if (showResult) return;
    const newOrder = [...orderedItems];
    const [removed] = newOrder.splice(fromIndex, 1);
    newOrder.splice(toIndex, 0, removed);
    setOrderedItems(newOrder);
    setUserAnswer(newOrder.map(item => item.originalIndex));
  };

  return (
    <div className="ordering-container">
      {orderedItems.map((item, idx) => (
        <div
          key={item.originalIndex}
          className={`ordering-item ${showResult ? (correctOrder[idx] === item.originalIndex ? 'correct' : 'incorrect') : ''}`}
        >
          <span className="order-number">{idx + 1}</span>
          <span className="order-text">{item.text}</span>
          {!showResult && (
            <div className="order-controls">
              <button onClick={() => moveItem(idx, Math.max(0, idx - 1))} disabled={idx === 0}>↑</button>
              <button onClick={() => moveItem(idx, Math.min(orderedItems.length - 1, idx + 1))} disabled={idx === orderedItems.length - 1}>↓</button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

function MatchingQuestion({ pairs, userAnswer, setUserAnswer, showResult }) {
  const [matches, setMatches] = useState({});
  const [selectedLeft, setSelectedLeft] = useState(null);

  useEffect(() => {
    if (userAnswer) {
      setMatches(userAnswer);
    }
  }, [userAnswer]);

  const handleLeftClick = (idx) => {
    if (showResult) return;
    setSelectedLeft(idx);
  };

  const handleRightClick = (idx) => {
    if (showResult || selectedLeft === null) return;
    const newMatches = { ...matches, [selectedLeft]: idx };
    setMatches(newMatches);
    setUserAnswer(newMatches);
    setSelectedLeft(null);
  };

  const isMatchCorrect = (leftIdx) => {
    return matches[leftIdx] === leftIdx;
  };

  return (
    <div className="matching-container">
      <div className="matching-column left">
        {pairs.map((pair, idx) => (
          <div
            key={idx}
            className={`matching-item ${selectedLeft === idx ? 'selected' : ''} 
              ${matches[idx] !== undefined ? 'matched' : ''}
              ${showResult ? (isMatchCorrect(idx) ? 'correct' : 'incorrect') : ''}`}
            onClick={() => handleLeftClick(idx)}
          >
            {pair.left}
          </div>
        ))}
      </div>
      <div className="matching-lines">
        {Object.entries(matches).map(([leftIdx, rightIdx]) => (
          <div key={leftIdx} className="match-line">
            {parseInt(leftIdx) + 1} → {rightIdx + 1}
          </div>
        ))}
      </div>
      <div className="matching-column right">
        {pairs.map((pair, idx) => (
          <div
            key={idx}
            className={`matching-item ${Object.values(matches).includes(idx) ? 'matched' : ''}
              ${showResult && Object.entries(matches).some(([l, r]) => r === idx && parseInt(l) === idx) ? 'correct' : ''}
              ${showResult && Object.entries(matches).some(([l, r]) => r === idx && parseInt(l) !== idx) ? 'incorrect' : ''}`}
            onClick={() => handleRightClick(idx)}
          >
            {pair.right}
          </div>
        ))}
      </div>
    </div>
  );
}

function getQuestionTypeName(type) {
  const types = {
    'multiple-choice': 'Trắc nghiệm',
    'true-false': 'Đúng/Sai',
    'fill-blank': 'Điền từ',
    'calculation': 'Tính toán',
    'ordering': 'Sắp xếp',
    'matching': 'Ghép đôi',
    'experiment': 'Thí nghiệm',
    'balance': 'Cân bằng'
  };
  return types[type] || type;
}

// ================== PROGRESS WATERMARK ==================
function ProgressWatermark({ completedByCategory, challenges }) {
  return (
    <div className="progress-watermark">
      <div className="watermark-title">
        <Trophy className="w-5 h-5 text-yellow-500" />
        <span>Tiến độ các giai đoạn</span>
      </div>
      <div className="watermark-grid">
        {CATEGORIES.map(cat => {
          const Icon = cat.icon;
          const completed = completedByCategory[cat.id] || 0;
          const total = challenges.filter(c => c.category === cat.id).length;
          const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;
          const isComplete = percentage === 100;
          
          return (
            <div 
              key={cat.id} 
              className={`watermark-item ${isComplete ? 'completed' : ''}`}
            >
              <div className="watermark-icon" style={{ backgroundColor: isComplete ? '#10b981' : cat.color }}>
                <Icon className="w-4 h-4 text-white" />
                {isComplete && <div className="complete-badge">✓</div>}
              </div>
              <div className="watermark-info">
                <div className="watermark-name">{cat.name}</div>
                <div className="watermark-progress-bar">
                  <div 
                    className="watermark-progress-fill"
                    style={{ width: `${percentage}%`, backgroundColor: isComplete ? '#10b981' : cat.color }}
                  />
                </div>
                <div className="watermark-stats">
                  <span className="watermark-percentage">{percentage}%</span>
                  <span className="watermark-count">{completed}/{total}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div className="watermark-total">
        <div className="total-label">Tổng tiến độ:</div>
        <div className="total-progress-bar">
          <div 
            className="total-progress-fill"
            style={{ width: `${challenges.length > 0 ? Math.round((Object.values(completedByCategory).reduce((a, b) => a + b, 0) / challenges.length) * 100) : 0}%` }}
          />
        </div>
        <div className="total-stats">
          {Object.values(completedByCategory).reduce((a, b) => a + b, 0)}/{challenges.length} câu hỏi
          ({challenges.length > 0 ? Math.round((Object.values(completedByCategory).reduce((a, b) => a + b, 0) / challenges.length) * 100) : 0}%)
        </div>
      </div>
    </div>
  );
}

// ================== MAIN COMPONENT ==================
export default function Nito_LuuHuynh() {
  const { hasProgress, saveProgress, clearProgress, getProgress, completeChallenge } = useChallengeProgress('nito-luu-huynh-11', {
    challengeId: 3, // ID trong seed.cjs
    programId: 'chemistry',
    grade: 11
  });

  const [showResumeDialog, setShowResumeDialog] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [startTime, setStartTime] = useState(null);
  const [gameMode, setGameMode] = useState('menu'); // 'menu', 'practice', 'challenge'
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [completedQuestions, setCompletedQuestions] = useState([]);
  const [showHint, setShowHint] = useState(false);
  const [timeLeft, setTimeLeft] = useState(null);
  const [isTimerActive, setIsTimerActive] = useState(false);

  // Filter challenges by category
  const filteredChallenges = selectedCategory
    ? CHALLENGES.filter(c => c.category === selectedCategory)
    : CHALLENGES;

  const currentChallenge = filteredChallenges[currentIndex];

  // Count completed by category (using current CHALLENGES which may be AI or fallback)
  const completedByCategory = useMemo(() => {
    return CATEGORIES.reduce((acc, cat) => {
      acc[cat.id] = completedQuestions.filter(id => {
        const challenge = CHALLENGES.find(c => c.id === id);
        return challenge && challenge.category === cat.id;
      }).length;
      return acc;
    }, {});
  }, [completedQuestions, CHALLENGES]);

  // Timer effect
  useEffect(() => {
    if (isTimerActive && timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && isTimerActive) {
      handleSubmit();
    }
  }, [timeLeft, isTimerActive]);

  // Check saved progress on mount
  useEffect(() => {
    if (hasProgress && !gameStarted) {
      setShowResumeDialog(true);
    } else if (!gameStarted) {
      setGameStarted(true);
    }
  }, [hasProgress, gameStarted]);

  const startGame = (fromBeginning = false) => {
    setShowResumeDialog(false);
    setStartTime(Date.now());
    setIsCompleted(false);
    if (fromBeginning) {
      clearProgress();
      setScore(0);
      setStreak(0);
      setCompletedQuestions([]);
      setCurrentIndex(0);
      setGameStarted(true);
    } else {
      const savedData = getProgress();
      if (savedData) {
        setScore(savedData.score || 0);
        setStreak(savedData.streak || 0);
        setCompletedQuestions(savedData.completedQuestions || []);
        setSelectedCategory(savedData.selectedCategory || null);
        setGameMode(savedData.gameMode || 'menu');
      }
      setGameStarted(true);
    }
  };

  const checkAnswer = () => {
    if (!currentChallenge || userAnswer === null) return false;

    switch (currentChallenge.type) {
      case 'multiple-choice':
      case 'experiment':
        return userAnswer === currentChallenge.correctAnswer;
      case 'true-false':
        return userAnswer === currentChallenge.correctAnswer;
      case 'fill-blank':
      case 'calculation': {
        const acceptedAnswers = currentChallenge.acceptedAnswers || [currentChallenge.correctAnswer];
        return acceptedAnswers.some(ans => 
          ans.toLowerCase().trim() === String(userAnswer).toLowerCase().trim()
        );
      }
      case 'ordering':
        if (!userAnswer || !currentChallenge.correctOrder) return false;
        return JSON.stringify(userAnswer) === JSON.stringify(currentChallenge.correctOrder);
      case 'matching':
        if (!userAnswer) return false;
        return Object.entries(userAnswer).every(([left, right]) => parseInt(left) === right);
      default:
        return false;
    }
  };

  const handleSubmit = () => {
    const isCorrect = checkAnswer();
    setShowResult(true);
    setIsTimerActive(false);

    if (isCorrect) {
      const basePoints = currentChallenge.difficulty * 10;
      const streakBonus = streak >= 3 ? 15 : streak >= 2 ? 10 : streak >= 1 ? 5 : 0;
      const earnedPoints = basePoints + streakBonus;

      const newScore = score + earnedPoints;
      const newCompletedQuestions = [...new Set([...completedQuestions, currentChallenge.id])];

      setScore(newScore);
      setStreak(prev => prev + 1);
      setCompletedQuestions(newCompletedQuestions);

      // Check if all questions completed - save to database
      if (newCompletedQuestions.length === CHALLENGES.length && !isCompleted) {
        setIsCompleted(true);
        const timeSpent = startTime ? Math.floor((Date.now() - startTime) / 1000) : 0;
        const maxScore = CHALLENGES.reduce((sum, c) => sum + c.difficulty * 10 + 15, 0);
        completeChallenge({
          score: newScore,
          maxScore: maxScore,
          timeSpent: timeSpent,
          attempts: newCompletedQuestions.length,
          hintsUsed: 0
        });
        console.log('🎉 Challenge completed! Score:', newScore, '/', maxScore);
      } else {
        saveProgress({
          score: newScore,
          streak: streak + 1,
          completedQuestions: newCompletedQuestions,
          selectedCategory,
          gameMode
        });
      }
    } else {
      setStreak(0);
      saveProgress({
        score,
        streak: 0,
        completedQuestions,
        selectedCategory,
        gameMode
      });
    }
  };

  const handleNext = () => {
    if (currentIndex < filteredChallenges.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setUserAnswer(null);
      setShowResult(false);
      setShowHint(false);
      if (gameMode === 'challenge') {
        setTimeLeft(60);
        setIsTimerActive(true);
      }
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
      setUserAnswer(null);
      setShowResult(false);
      setShowHint(false);
    }
  };

  const goToMenu = () => {
    setGameMode('menu');
    setSelectedCategory(null);
    setCurrentIndex(0);
    setUserAnswer(null);
    setShowResult(false);
    setIsTimerActive(false);
  };

  const selectCategoryAndStart = (catId, mode = 'practice') => {
    setSelectedCategory(catId);
    setCurrentIndex(0);
    setUserAnswer(null);
    setShowResult(false);
    setGameMode(mode);
    if (mode === 'challenge') {
      setTimeLeft(60);
      setIsTimerActive(true);
    }
  };

  const startChallengeMode = () => {
    setSelectedCategory(null);
    setCurrentIndex(0);
    setUserAnswer(null);
    setShowResult(false);
    setGameMode('challenge');
    setTimeLeft(60);
    setIsTimerActive(true);
  };

  const isCorrect = checkAnswer();

  // Loading state
  if (!gameStarted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-600 via-purple-600 to-orange-500">
        <div className="bg-white shadow-md">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <Link to="/hoa-hoc/lop-11" className="flex items-center text-gray-600 hover:text-gray-900">
                <ArrowLeft className="w-5 h-5 mr-2" />
                Quay lại
              </Link>
              <h1 className="text-2xl font-bold text-gray-800">⚗️ Nitơ - Lưu huỳnh</h1>
              <div className="w-24"></div>
            </div>
          </div>
        </div>
        <div className="container mx-auto px-4 py-8">
          <div className="bg-white rounded-2xl shadow-2xl p-12 text-center">
            <p className="text-gray-600">Đang tải...</p>
          </div>
        </div>
        <ResumeDialog
          show={showResumeDialog}
          onResume={() => startGame(false)}
          onRestart={() => startGame(true)}
          progressInfo={{
            current: completedQuestions.length,
            total: CHALLENGES.length,
            score: score
          }}
        />
      </div>
    );
  }

  // Menu mode
  if (gameMode === 'menu') {
    return (
      <div className="min-h-screen nito-bg">
        <div className="bg-white shadow-md">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <Link to="/advanced-challenge" className="flex items-center text-gray-600 hover:text-gray-900">
                <ArrowLeft className="w-5 h-5 mr-2" />
                Quay lại
              </Link>
              <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                <span>⚗️</span>
                Nitơ - Lưu huỳnh
              </h1>
              <div className="flex items-center gap-2 text-yellow-600">
                <Trophy className="w-6 h-6" />
                <span className="font-bold">{score} điểm</span>
              </div>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-6">
          <div className="bg-white rounded-2xl shadow-2xl p-6">
            {/* Stats */}
            <div className="stats-bar-nito mb-6">
              <div className="stat-item-nito">
                <Award className="w-5 h-5 text-yellow-500" />
                <span>Điểm: <strong>{score}</strong></span>
              </div>
              <div className="stat-item-nito">
                <Target className="w-5 h-5 text-green-500" />
                <span>Hoàn thành: <strong>{completedQuestions.length}/{CHALLENGES.length}</strong></span>
              </div>
              <div className="stat-item-nito">
                <Zap className="w-5 h-5 text-orange-500" />
                <span>Combo: <strong>x{streak}</strong></span>
              </div>
            </div>

            {/* Progress Watermark */}
            <ProgressWatermark completedByCategory={completedByCategory} challenges={CHALLENGES} />

            {/* Categories */}
            <h3 className="text-lg font-bold text-gray-700 mb-4">Chọn chủ đề:</h3>
            <div className="category-grid-nito">
              {CATEGORIES.map(cat => {
                const Icon = cat.icon;
                const completed = completedByCategory[cat.id] || 0;
                const total = CHALLENGES.filter(c => c.category === cat.id).length;
                return (
                  <button
                    key={cat.id}
                    className="category-card-nito"
                    onClick={() => selectCategoryAndStart(cat.id)}
                    style={{ '--cat-color': cat.color }}
                  >
                    <div className={`category-icon-nito bg-gradient-to-br ${cat.bgGradient}`}>
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <div className="category-info-nito">
                      <h4>{cat.name}</h4>
                      <p>{cat.description}</p>
                      <div className="category-progress-nito">
                        <div className="progress-bar-nito">
                          <div
                            className="progress-fill-nito"
                            style={{ width: `${total > 0 ? (completed / total) * 100 : 0}%`, backgroundColor: cat.color }}
                          />
                        </div>
                        <span>{completed}/{total}</span>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Challenge Mode */}
            <div className="mt-6 text-center">
              <button className="challenge-btn-nito" onClick={startChallengeMode}>
                <Zap className="w-5 h-5" />
                Chế độ Thử thách (Giới hạn thời gian)
              </button>
            </div>
          </div>
        </div>

        <ResumeDialog
          show={showResumeDialog}
          onResume={() => startGame(false)}
          onRestart={() => startGame(true)}
          progressInfo={{
            current: completedQuestions.length,
            total: CHALLENGES.length,
            score: score
          }}
        />
      </div>
    );
  }

  // Practice/Challenge mode
  return (
    <div className="min-h-screen nito-bg">
      {/* Header */}
      <div className="bg-white shadow-md">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <button onClick={goToMenu} className="flex items-center text-gray-600 hover:text-gray-900">
              <ArrowLeft className="w-5 h-5 mr-2" />
              Menu
            </button>
            <h1 className="text-lg font-bold text-gray-800 flex items-center gap-2">
              <span>⚗️</span>
              {gameMode === 'challenge' ? 'Thử thách' : CATEGORIES.find(c => c.id === selectedCategory)?.name || 'Tất cả'}
            </h1>
            <div className="flex items-center gap-3">
              {gameMode === 'challenge' && timeLeft !== null && (
                <div className={`timer-badge ${timeLeft <= 10 ? 'warning' : ''}`}>
                  <Clock className="w-4 h-4" />
                  <span>{timeLeft}s</span>
                </div>
              )}
              <div className="flex items-center gap-1 text-orange-500">
                <Zap className="w-5 h-5" />
                <span className="font-bold">x{streak}</span>
              </div>
              <div className="flex items-center gap-1 text-yellow-600">
                <Trophy className="w-5 h-5" />
                <span className="font-bold">{score}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-4">
        {!currentChallenge ? (
          <div className="bg-white rounded-2xl shadow-2xl p-6 text-center">
            <Trophy className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-800 mb-2">🎉 Hoàn thành!</h2>
            <p className="text-gray-600 mb-4">Bạn đã hoàn thành tất cả câu hỏi trong phần này.</p>
            <p className="text-2xl font-bold text-yellow-600 mb-4">Điểm số: {score}</p>
            <button onClick={goToMenu} className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700">
              Quay lại Menu
            </button>
          </div>
        ) : (
          <div className="bg-white rounded-2xl shadow-2xl p-5">
            {/* Progress */}
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm text-gray-500">
                Câu {currentIndex + 1}/{filteredChallenges.length}
              </span>
              <button
                className="hint-btn"
                onClick={() => setShowHint(!showHint)}
              >
                <Lightbulb className={`w-5 h-5 ${showHint ? 'text-yellow-500' : 'text-gray-400'}`} />
              </button>
            </div>

            {/* Hint */}
            {showHint && currentChallenge.hint && (
              <div className="hint-box-nito mb-4">
                <Lightbulb className="w-4 h-4 text-yellow-600" />
                <span>{currentChallenge.hint}</span>
              </div>
            )}

            {/* Question Card */}
            <QuestionCard
              challenge={currentChallenge}
              userAnswer={userAnswer}
              setUserAnswer={setUserAnswer}
              showResult={showResult}
              isCorrect={isCorrect}
            />

            {/* Result Explanation */}
            {showResult && (
              <div className={`result-box ${isCorrect ? 'correct' : 'incorrect'}`}>
                <div className="result-header">
                  {isCorrect ? (
                    <><CheckCircle2 className="w-6 h-6" /> Chính xác!</>
                  ) : (
                    <><XCircle className="w-6 h-6" /> Chưa đúng!</>
                  )}
                </div>
                <p className="result-explanation">{currentChallenge.explanation}</p>
                {!isCorrect && currentChallenge.correctAnswer && (
                  <p className="correct-answer">
                    Đáp án đúng: <strong>{String(currentChallenge.correctAnswer)}</strong>
                  </p>
                )}
              </div>
            )}

            {/* Controls */}
            <div className="controls-nito mt-4">
              <button
                onClick={handlePrev}
                disabled={currentIndex === 0}
                className="nav-btn-nito"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              {!showResult ? (
                <button
                  onClick={handleSubmit}
                  disabled={userAnswer === null}
                  className="submit-btn-nito"
                >
                  Kiểm tra
                </button>
              ) : (
                <button onClick={handleNext} className="next-btn-nito">
                  {currentIndex < filteredChallenges.length - 1 ? 'Tiếp theo' : 'Hoàn thành'}
                  <ChevronRight className="w-5 h-5" />
                </button>
              )}

              <button
                onClick={handleNext}
                disabled={currentIndex === filteredChallenges.length - 1}
                className="nav-btn-nito"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}
      </div>

      <ResumeDialog
        show={showResumeDialog}
        onResume={() => startGame(false)}
        onRestart={() => startGame(true)}
        progressInfo={{
          current: completedQuestions.length,
          total: CHALLENGES.length,
          score: score
        }}
      />
    </div>
  );
}
