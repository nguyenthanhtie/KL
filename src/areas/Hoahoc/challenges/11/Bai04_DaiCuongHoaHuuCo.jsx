import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowLeft, Trophy, Play, RotateCcw, ChevronRight, ChevronLeft,
  CheckCircle2, XCircle, Lightbulb, HelpCircle, Zap, Award,
  FlaskConical, Beaker, Thermometer, Wind, Droplets, Flame,
  AlertTriangle, Star, Target, Clock, Atom, BookOpen, Share2, Search, Microscope
} from 'lucide-react';
import useChallengeProgress from '../../../../hooks/useChallengeProgress';
import ResumeDialog from '../../../../components/ResumeDialog';
import './CSS/Bai04_DaiCuongHoaHuuCo.css';

// ================== DATA - ĐẠI CƯƠNG HÓA HỮU CƠ ==================
const CATEGORIES = [
  {
    id: 'concepts',
    name: 'Khái niệm & Phân loại',
    icon: BookOpen,
    color: '#10b981',
    description: 'Hợp chất hữu cơ, nhóm chức, đồng đẳng',
    bgGradient: 'from-green-500 to-emerald-500'
  },
  {
    id: 'structure',
    name: 'Cấu trúc phân tử',
    icon: Share2,
    color: '#3b82f6',
    description: 'Liên kết hóa học, đồng phân, cấu tạo',
    bgGradient: 'from-blue-500 to-cyan-500'
  },
  {
    id: 'reactions',
    name: 'Phản ứng hữu cơ',
    icon: FlaskConical,
    color: '#f59e0b',
    description: 'Phản ứng thế, cộng, tách',
    bgGradient: 'from-yellow-500 to-orange-500'
  },
  {
    id: 'analysis',
    name: 'Phân tích nguyên tố',
    icon: Microscope,
    color: '#8b5cf6',
    description: 'Công thức đơn giản nhất, CTPT',
    bgGradient: 'from-purple-500 to-pink-500'
  }
];

// Bộ câu hỏi tĩnh - Đại cương Hóa học Hữu cơ (40+ câu)
const CHALLENGES = [
  // ========== CONCEPTS - Khái niệm & Phân loại (10 câu) ==========
  {
    id: 1,
    category: 'concepts',
    type: 'multiple-choice',
    difficulty: 1,
    question: 'Hợp chất hữu cơ là hợp chất của nguyên tố nào?',
    options: ['Oxi', 'Nitơ', 'Cacbon', 'Hidro'],
    correctAnswer: 'Cacbon',
    explanation: 'Hợp chất hữu cơ là hợp chất của cacbon (trừ CO, CO₂, muối cacbonat, xianua...).',
    hint: 'Nguyên tố chính tạo nên mạch cacbon.'
  },
  {
    id: 2,
    category: 'concepts',
    type: 'multiple-choice',
    difficulty: 1,
    question: 'Nhóm chức -OH là nhóm chức đặc trưng của loại hợp chất nào?',
    options: ['Anđehit', 'Axit cacboxylic', 'Ancol', 'Este'],
    correctAnswer: 'Ancol',
    explanation: 'Ancol là hợp chất hữu cơ có nhóm -OH liên kết với gốc hidrocacbon (R-OH).',
    hint: 'Rượu etylic là một ví dụ.'
  },
  {
    id: 3,
    category: 'concepts',
    type: 'multiple-choice',
    difficulty: 1,
    question: 'Nhóm chức -CHO là nhóm chức đặc trưng của loại hợp chất nào?',
    options: ['Ancol', 'Anđehit', 'Xeton', 'Este'],
    correctAnswer: 'Anđehit',
    explanation: 'Anđehit có nhóm -CHO (nhóm cacbanđehit) liên kết với gốc hidrocacbon hoặc H.',
    hint: 'Fomanđehit HCHO là ví dụ điển hình.'
  },
  {
    id: 4,
    category: 'concepts',
    type: 'multiple-choice',
    difficulty: 1,
    question: 'Nhóm chức -COOH là nhóm chức đặc trưng của loại hợp chất nào?',
    options: ['Ancol', 'Anđehit', 'Axit cacboxylic', 'Este'],
    correctAnswer: 'Axit cacboxylic',
    explanation: 'Axit cacboxylic chứa nhóm -COOH (nhóm cacboxyl), ví dụ CH₃COOH (axit axetic).',
    hint: 'Giấm ăn chứa axit này.'
  },
  {
    id: 5,
    category: 'concepts',
    type: 'multiple-choice',
    difficulty: 2,
    question: 'Chất nào sau đây KHÔNG phải là hợp chất hữu cơ?',
    options: ['CH₄', 'C₂H₅OH', 'Na₂CO₃', 'CH₃COOH'],
    correctAnswer: 'Na₂CO₃',
    explanation: 'Na₂CO₃ (natri cacbonat) là muối cacbonat, thuộc hợp chất vô cơ dù chứa cacbon.',
    hint: 'Muối cacbonat là ngoại lệ.'
  },
  {
    id: 6,
    category: 'concepts',
    type: 'multiple-choice',
    difficulty: 2,
    question: 'Công thức tổng quát của ankan (hidrocacbon no) là gì?',
    options: ['CₙH₂ₙ', 'CₙH₂ₙ₊₂', 'CₙH₂ₙ₋₂', 'CₙH₂ₙ₋₆'],
    correctAnswer: 'CₙH₂ₙ₊₂',
    explanation: 'Ankan có công thức tổng quát CₙH₂ₙ₊₂ với n ≥ 1. Ví dụ: CH₄, C₂H₆, C₃H₈.',
    hint: 'Metan CH₄: n=1, H=4=2×1+2.'
  },
  {
    id: 7,
    category: 'concepts',
    type: 'multiple-choice',
    difficulty: 2,
    question: 'Công thức tổng quát của anken là gì?',
    options: ['CₙH₂ₙ (n≥2)', 'CₙH₂ₙ₊₂', 'CₙH₂ₙ₋₂', 'CₙH₂ₙ₋₆'],
    correctAnswer: 'CₙH₂ₙ (n≥2)',
    explanation: 'Anken có một liên kết đôi C=C, công thức tổng quát CₙH₂ₙ với n ≥ 2. Ví dụ: C₂H₄ (etilen).',
    hint: 'Etilen C₂H₄: n=2, H=4=2×2.'
  },
  {
    id: 8,
    category: 'concepts',
    type: 'multiple-choice',
    difficulty: 2,
    question: 'Công thức tổng quát của ankin là gì?',
    options: ['CₙH₂ₙ', 'CₙH₂ₙ₊₂', 'CₙH₂ₙ₋₂ (n≥2)', 'CₙH₂ₙ₋₆'],
    correctAnswer: 'CₙH₂ₙ₋₂ (n≥2)',
    explanation: 'Ankin có một liên kết ba C≡C, công thức tổng quát CₙH₂ₙ₋₂ với n ≥ 2. Ví dụ: C₂H₂ (axetilen).',
    hint: 'Axetilen C₂H₂: n=2, H=2=2×2-2.'
  },
  {
    id: 9,
    category: 'concepts',
    type: 'fill-blank',
    difficulty: 2,
    question: 'Nhóm chức -CO- nằm giữa 2 gốc hidrocacbon là nhóm chức của ___',
    correctAnswer: 'xeton',
    acceptedAnswers: ['xeton', 'Xeton', 'XETON', 'ketone'],
    explanation: 'Xeton có nhóm >C=O (nhóm cacbonyl) nằm giữa 2 gốc R. Ví dụ: CH₃-CO-CH₃ (axeton).',
    hint: 'Axeton là chất tẩy sơn móng tay.'
  },
  {
    id: 10,
    category: 'concepts',
    type: 'multiple-choice',
    difficulty: 3,
    question: 'Dãy đồng đẳng của metan gồm các chất nào?',
    options: ['CH₄, C₂H₄, C₃H₆', 'CH₄, C₂H₆, C₃H₈', 'CH₄, C₂H₂, C₃H₄', 'C₂H₄, C₃H₆, C₄H₈'],
    correctAnswer: 'CH₄, C₂H₆, C₃H₈',
    explanation: 'Dãy đồng đẳng của metan (ankan) có công thức CₙH₂ₙ₊₂: CH₄, C₂H₆, C₃H₈, C₄H₁₀...',
    hint: 'Các ankan hơn kém nhau nhóm CH₂.'
  },

  // ========== STRUCTURE - Cấu trúc phân tử & Đồng phân (12 câu) ==========
  {
    id: 11,
    category: 'structure',
    type: 'multiple-choice',
    difficulty: 1,
    question: 'Đồng đẳng là hiện tượng các chất có cùng công thức chung và hơn kém nhau bao nhiêu nhóm CH₂?',
    options: ['1 nhóm CH₂', 'Một hay nhiều nhóm CH₂', '2 nhóm CH₂', '3 nhóm CH₂'],
    correctAnswer: 'Một hay nhiều nhóm CH₂',
    explanation: 'Các chất đồng đẳng có cùng công thức tổng quát, cùng tính chất hóa học tương tự, hơn kém nhau một hay nhiều nhóm CH₂.',
    hint: 'Không nhất thiết chỉ 1 nhóm.'
  },
  {
    id: 12,
    category: 'structure',
    type: 'multiple-choice',
    difficulty: 2,
    question: 'Đồng phân là hiện tượng các chất có cùng...',
    options: ['Công thức cấu tạo', 'Công thức phân tử nhưng khác công thức cấu tạo', 'Tính chất hóa học', 'Tính chất vật lý'],
    correctAnswer: 'Công thức phân tử nhưng khác công thức cấu tạo',
    explanation: 'Đồng phân là các chất có cùng công thức phân tử nhưng khác nhau về công thức cấu tạo, do đó có tính chất khác nhau.',
    hint: 'Cùng CTPT, khác CTCT.'
  },
  {
    id: 13,
    category: 'structure',
    type: 'multiple-choice',
    difficulty: 2,
    question: 'C₄H₁₀ có bao nhiêu đồng phân cấu tạo?',
    options: ['1', '2', '3', '4'],
    correctAnswer: '2',
    explanation: 'C₄H₁₀ có 2 đồng phân: n-butan (mạch thẳng) và isobutan (2-metylpropan, mạch nhánh).',
    hint: 'Mạch thẳng và mạch nhánh.'
  },
  {
    id: 14,
    category: 'structure',
    type: 'multiple-choice',
    difficulty: 2,
    question: 'Nguyên tử cacbon trong metan (CH₄) ở trạng thái lai hóa nào?',
    options: ['sp', 'sp²', 'sp³', 'Không lai hóa'],
    correctAnswer: 'sp³',
    explanation: 'Trong CH₄, C tạo 4 liên kết đơn với H, sử dụng 4 orbital lai hóa sp³, góc liên kết 109,5°.',
    hint: 'Tứ diện đều.'
  },
  {
    id: 15,
    category: 'structure',
    type: 'multiple-choice',
    difficulty: 2,
    question: 'Nguyên tử cacbon trong etilen (C₂H₄) ở trạng thái lai hóa nào?',
    options: ['sp', 'sp²', 'sp³', 'Không lai hóa'],
    correctAnswer: 'sp²',
    explanation: 'Trong C₂H₄, mỗi C tạo 3 liên kết σ (2 với H, 1 với C), dùng 3 orbital sp². Orbital p còn lại tạo liên kết π.',
    hint: 'Phân tử phẳng, góc 120°.'
  },
  {
    id: 16,
    category: 'structure',
    type: 'multiple-choice',
    difficulty: 2,
    question: 'Nguyên tử cacbon trong axetilen (C₂H₂) ở trạng thái lai hóa nào?',
    options: ['sp', 'sp²', 'sp³', 'Không lai hóa'],
    correctAnswer: 'sp',
    explanation: 'Trong C₂H₂, mỗi C tạo 2 liên kết σ (1 với H, 1 với C), dùng 2 orbital sp. 2 orbital p còn lại tạo 2 liên kết π.',
    hint: 'Phân tử thẳng, góc 180°.'
  },
  {
    id: 17,
    category: 'structure',
    type: 'multiple-choice',
    difficulty: 3,
    question: 'Liên kết đôi C=C gồm những loại liên kết nào?',
    options: ['2 liên kết σ', '2 liên kết π', '1 liên kết σ và 1 liên kết π', '1 liên kết σ và 2 liên kết π'],
    correctAnswer: '1 liên kết σ và 1 liên kết π',
    explanation: 'Liên kết đôi gồm 1 liên kết σ (xen phủ trục) và 1 liên kết π (xen phủ bên). Liên kết π yếu hơn nên dễ bị phá vỡ.',
    hint: 'σ bền hơn π.'
  },
  {
    id: 18,
    category: 'structure',
    type: 'multiple-choice',
    difficulty: 3,
    question: 'Liên kết ba C≡C gồm những loại liên kết nào?',
    options: ['3 liên kết σ', '3 liên kết π', '1 liên kết σ và 2 liên kết π', '2 liên kết σ và 1 liên kết π'],
    correctAnswer: '1 liên kết σ và 2 liên kết π',
    explanation: 'Liên kết ba gồm 1 liên kết σ và 2 liên kết π. Phân tử có liên kết ba thường có dạng thẳng.',
    hint: 'Axetilen là phân tử thẳng.'
  },
  {
    id: 19,
    category: 'structure',
    type: 'multiple-choice',
    difficulty: 2,
    question: 'Đồng phân hình học (cis-trans) xuất hiện khi nào?',
    options: ['Có liên kết đơn', 'Có liên kết đôi và 2 nhóm thế khác nhau ở mỗi C', 'Có vòng benzen', 'Có cacbon bất đối'],
    correctAnswer: 'Có liên kết đôi và 2 nhóm thế khác nhau ở mỗi C',
    explanation: 'Đồng phân hình học xuất hiện khi có liên kết đôi C=C và mỗi cacbon của liên kết đôi gắn với 2 nhóm thế khác nhau.',
    hint: 'Cis = cùng phía, trans = khác phía.'
  },
  {
    id: 20,
    category: 'structure',
    type: 'multiple-choice',
    difficulty: 3,
    question: 'Đồng phân quang học xuất hiện khi phân tử có...',
    options: ['Liên kết đôi', 'Cacbon bất đối (C*)', 'Vòng benzen', 'Liên kết ba'],
    correctAnswer: 'Cacbon bất đối (C*)',
    explanation: 'Cacbon bất đối là C liên kết với 4 nhóm thế khác nhau. Phân tử có C* sẽ có tính quang hoạt.',
    hint: 'C gắn với 4 nhóm khác nhau.'
  },
  {
    id: 21,
    category: 'structure',
    type: 'fill-blank',
    difficulty: 2,
    question: 'Góc liên kết H-C-H trong phân tử metan xấp xỉ ___°',
    correctAnswer: '109,5',
    acceptedAnswers: ['109,5', '109.5', '109'],
    explanation: 'Metan có cấu trúc tứ diện đều với góc liên kết H-C-H = 109,5° (góc tứ diện).',
    hint: 'Lai hóa sp³ → tứ diện.'
  },
  {
    id: 22,
    category: 'structure',
    type: 'multiple-choice',
    difficulty: 3,
    question: 'C₅H₁₂ có bao nhiêu đồng phân cấu tạo?',
    options: ['2', '3', '4', '5'],
    correctAnswer: '3',
    explanation: 'C₅H₁₂ có 3 đồng phân: n-pentan, isopentan (2-metylbutan), neopentan (2,2-đimetylpropan).',
    hint: 'Mạch thẳng và các kiểu mạch nhánh.'
  },

  // ========== REACTIONS - Phản ứng hữu cơ (10 câu) ==========
  {
    id: 23,
    category: 'reactions',
    type: 'multiple-choice',
    difficulty: 1,
    question: 'Phản ứng thế là phản ứng trong đó...',
    options: ['Nguyên tử này thay thế nguyên tử khác', 'Các phân tử kết hợp lại', 'Một chất tách thành nhiều chất', 'Không có sự thay đổi'],
    correctAnswer: 'Nguyên tử này thay thế nguyên tử khác',
    explanation: 'Phản ứng thế là phản ứng trong đó một nguyên tử hoặc nhóm nguyên tử trong phân tử bị thay thế bởi nguyên tử hoặc nhóm nguyên tử khác.',
    hint: 'Thay thế = substitution.'
  },
  {
    id: 24,
    category: 'reactions',
    type: 'multiple-choice',
    difficulty: 2,
    question: 'Phản ứng cộng là phản ứng đặc trưng của hợp chất có...',
    options: ['Liên kết đôi hoặc liên kết ba', 'Chỉ liên kết đơn', 'Nhóm -OH', 'Nhóm -COOH'],
    correctAnswer: 'Liên kết đôi hoặc liên kết ba',
    explanation: 'Phản ứng cộng xảy ra khi liên kết π trong liên kết đôi hoặc ba bị phá vỡ để cộng thêm các nguyên tử mới.',
    hint: 'Liên kết không no.'
  },
  {
    id: 25,
    category: 'reactions',
    type: 'multiple-choice',
    difficulty: 2,
    question: 'Phản ứng tách (elimination) thường tạo ra sản phẩm có...',
    options: ['Liên kết đơn mới', 'Liên kết đôi hoặc ba mới', 'Vòng mới', 'Nhóm chức mới'],
    correctAnswer: 'Liên kết đôi hoặc ba mới',
    explanation: 'Phản ứng tách loại bỏ các nguyên tử/nhóm từ phân tử, tạo liên kết bội (đôi hoặc ba) mới.',
    hint: 'Ngược với phản ứng cộng.'
  },
  {
    id: 26,
    category: 'reactions',
    type: 'multiple-choice',
    difficulty: 2,
    question: 'Ankan chủ yếu tham gia loại phản ứng nào?',
    options: ['Phản ứng cộng', 'Phản ứng thế', 'Phản ứng trùng hợp', 'Phản ứng oxi hóa-khử'],
    correctAnswer: 'Phản ứng thế',
    explanation: 'Ankan là hidrocacbon no, chỉ có liên kết đơn nên tham gia phản ứng thế (với halogen, khi chiếu sáng hoặc đun nóng).',
    hint: 'Hidrocacbon no, bão hòa.'
  },
  {
    id: 27,
    category: 'reactions',
    type: 'multiple-choice',
    difficulty: 2,
    question: 'Anken chủ yếu tham gia loại phản ứng nào?',
    options: ['Phản ứng thế', 'Phản ứng cộng', 'Chỉ phản ứng cháy', 'Không phản ứng'],
    correctAnswer: 'Phản ứng cộng',
    explanation: 'Anken có liên kết đôi C=C, liên kết π dễ bị phá vỡ nên ưu tiên tham gia phản ứng cộng.',
    hint: 'Liên kết π kém bền.'
  },
  {
    id: 28,
    category: 'reactions',
    type: 'multiple-choice',
    difficulty: 2,
    question: 'Sản phẩm của phản ứng CH₄ + Cl₂ (as) → ... + HCl là gì?',
    options: ['CH₃Cl', 'CH₂Cl₂', 'CCl₄', 'C₂H₆'],
    correctAnswer: 'CH₃Cl',
    explanation: 'Metan phản ứng thế với clo (ánh sáng): CH₄ + Cl₂ → CH₃Cl + HCl. Sản phẩm đầu tiên là clorua metan.',
    hint: 'Thế 1 nguyên tử H bằng Cl.'
  },
  {
    id: 29,
    category: 'reactions',
    type: 'multiple-choice',
    difficulty: 2,
    question: 'Sản phẩm chính của phản ứng C₂H₄ + HBr → ... là gì?',
    options: ['CH₃-CH₂Br', 'CH₂Br-CH₂Br', 'CH₃-CHBr₂', 'CH₂=CHBr'],
    correctAnswer: 'CH₃-CH₂Br',
    explanation: 'Etilen cộng HBr: C₂H₄ + HBr → CH₃-CH₂Br (bromoetan). Đây là phản ứng cộng electrophin.',
    hint: 'H cộng vào C này, Br cộng vào C kia.'
  },
  {
    id: 30,
    category: 'reactions',
    type: 'multiple-choice',
    difficulty: 3,
    question: 'Quy tắc Markovnikov áp dụng cho phản ứng nào?',
    options: ['Ankan + halogen', 'Anken + HX (X là halogen)', 'Ancol + axit', 'Ankin + H₂'],
    correctAnswer: 'Anken + HX (X là halogen)',
    explanation: 'Quy tắc Markovnikov: Khi cộng HX vào anken bất đối xứng, H cộng vào C có nhiều H hơn, X cộng vào C có ít H hơn.',
    hint: 'Giàu càng giàu, nghèo càng nghèo.'
  },
  {
    id: 31,
    category: 'reactions',
    type: 'multiple-choice',
    difficulty: 3,
    question: 'Phản ứng oxi hóa hoàn toàn hidrocacbon tạo ra sản phẩm gì?',
    options: ['CO và H₂', 'CO₂ và H₂O', 'C và H₂O', 'CO₂ và H₂'],
    correctAnswer: 'CO₂ và H₂O',
    explanation: 'Hidrocacbon cháy hoàn toàn trong oxi tạo CO₂ và H₂O: CₓHᵧ + O₂ → CO₂ + H₂O.',
    hint: 'Phản ứng cháy hoàn toàn.'
  },
  {
    id: 32,
    category: 'reactions',
    type: 'fill-blank',
    difficulty: 2,
    question: 'Phản ứng cộng H₂ vào anken gọi là phản ứng ___',
    correctAnswer: 'hidro hóa',
    acceptedAnswers: ['hidro hóa', 'hidro hoa', 'hiđro hóa', 'hyđro hóa', 'hidrohoa', 'hydrogenation'],
    explanation: 'Phản ứng cộng H₂ vào liên kết đôi gọi là phản ứng hidro hóa (hydrogenation), cần xúc tác Ni, Pt hoặc Pd.',
    hint: 'Cộng hidro.'
  },

  // ========== ANALYSIS - Phân tích nguyên tố (10 câu) ==========
  {
    id: 33,
    category: 'analysis',
    type: 'multiple-choice',
    difficulty: 2,
    question: 'Công thức đơn giản nhất cho biết...',
    options: ['Tỉ lệ tối giản số nguyên tử của các nguyên tố', 'Số nguyên tử thực tế', 'Khối lượng phân tử', 'Cấu trúc phân tử'],
    correctAnswer: 'Tỉ lệ tối giản số nguyên tử của các nguyên tố',
    explanation: 'Công thức đơn giản nhất (CTĐGN) biểu thị tỉ lệ tối giản về số nguyên tử của các nguyên tố trong phân tử.',
    hint: 'Tỉ lệ đơn giản nhất.'
  },
  {
    id: 34,
    category: 'analysis',
    type: 'fill-blank',
    difficulty: 2,
    question: 'Hợp chất hữu cơ có 40% C, 6,67% H, còn lại là O. CTĐGN của hợp chất là ___',
    correctAnswer: 'CH2O',
    acceptedAnswers: ['CH2O', 'ch2o', 'CH₂O'],
    explanation: 'C: 40/12 = 3,33; H: 6,67/1 = 6,67; O: 53,33/16 = 3,33. Tỉ lệ C:H:O = 1:2:1 → CTĐGN: CH₂O.',
    hint: 'Tính số mol mỗi nguyên tố.'
  },
  {
    id: 35,
    category: 'analysis',
    type: 'multiple-choice',
    difficulty: 2,
    question: 'Để xác định sự có mặt của C và H trong hợp chất hữu cơ, ta đốt cháy và dẫn sản phẩm qua...',
    options: ['CuSO₄ khan và Ca(OH)₂', 'NaOH và H₂SO₄', 'HCl và NaCl', 'CaCO₃ và MgO'],
    correctAnswer: 'CuSO₄ khan và Ca(OH)₂',
    explanation: 'CuSO₄ khan hút nước (chuyển từ trắng sang xanh) → có H. Ca(OH)₂ tạo kết tủa trắng CaCO₃ → có C.',
    hint: 'CuSO₄ khan màu trắng, ngậm nước màu xanh.'
  },
  {
    id: 36,
    category: 'analysis',
    type: 'multiple-choice',
    difficulty: 3,
    question: 'Đốt cháy hoàn toàn 0,1 mol hidrocacbon thu được 0,3 mol CO₂ và 0,4 mol H₂O. CTPT của hidrocacbon là?',
    options: ['C₃H₆', 'C₃H₈', 'C₃H₄', 'C₂H₆'],
    correctAnswer: 'C₃H₈',
    explanation: 'nC = nCO₂ = 0,3 mol → C = 3. nH = 2×nH₂O = 0,8 mol → H = 8. CTPT: C₃H₈.',
    hint: 'Số mol CO₂ = số nguyên tử C.'
  },
  {
    id: 37,
    category: 'analysis',
    type: 'multiple-choice',
    difficulty: 3,
    question: 'Hợp chất hữu cơ X có %C = 54,55%, %H = 9,09%, còn lại là O. CTĐGN của X là?',
    options: ['CHO', 'C₂H₄O', 'CH₂O', 'C₃H₆O'],
    correctAnswer: 'C₂H₄O',
    explanation: 'C: 54,55/12 = 4,55; H: 9,09/1 = 9,09; O: 36,36/16 = 2,27. Tỉ lệ = 2:4:1 → CTĐGN: C₂H₄O.',
    hint: 'Chia cho số nhỏ nhất rồi làm tròn.'
  },
  {
    id: 38,
    category: 'analysis',
    type: 'multiple-choice',
    difficulty: 2,
    question: 'Công thức phân tử cho biết điều gì?',
    options: ['Chỉ loại nguyên tố', 'Số nguyên tử thực tế của mỗi nguyên tố', 'Cấu trúc không gian', 'Thứ tự liên kết'],
    correctAnswer: 'Số nguyên tử thực tế của mỗi nguyên tố',
    explanation: 'Công thức phân tử (CTPT) cho biết số nguyên tử thực tế của mỗi nguyên tố trong một phân tử.',
    hint: 'CTPT = (CTĐGN)ₙ với n là hệ số.'
  },
  {
    id: 39,
    category: 'analysis',
    type: 'multiple-choice',
    difficulty: 3,
    question: 'CTĐGN của glucozơ là CH₂O, M = 180. CTPT của glucozơ là?',
    options: ['C₃H₆O₃', 'C₆H₁₂O₆', 'C₄H₈O₄', 'C₂H₄O₂'],
    correctAnswer: 'C₆H₁₂O₆',
    explanation: 'M(CH₂O) = 30. n = 180/30 = 6. CTPT = (CH₂O)₆ = C₆H₁₂O₆.',
    hint: 'n = M(thực)/M(CTĐGN).'
  },
  {
    id: 40,
    category: 'analysis',
    type: 'fill-blank',
    difficulty: 3,
    question: 'Độ bất bão hòa (k) của C₆H₆ là ___',
    correctAnswer: '4',
    acceptedAnswers: ['4', 'bốn'],
    explanation: 'k = (2×6 + 2 - 6)/2 = (12 + 2 - 6)/2 = 8/2 = 4. C₆H₆ là benzen có 3 liên kết đôi + 1 vòng.',
    hint: 'k = (2C + 2 - H)/2 cho CₓHᵧ.'
  },
  {
    id: 41,
    category: 'analysis',
    type: 'multiple-choice',
    difficulty: 2,
    question: 'Công thức tính độ bất bão hòa (k) cho hợp chất CₓHᵧOᵤNᵥ là?',
    options: ['k = (2x + 2 - y + v)/2', 'k = (2x + 2 + y - v)/2', 'k = (2x - y)/2', 'k = x + y/2'],
    correctAnswer: 'k = (2x + 2 - y + v)/2',
    explanation: 'Độ bất bão hòa k = (2C + 2 - H + N)/2. Oxi không ảnh hưởng đến k. Mỗi k = 1 liên kết π hoặc 1 vòng.',
    hint: 'O không tính, N cộng thêm.'
  },
  {
    id: 42,
    category: 'analysis',
    type: 'multiple-choice',
    difficulty: 3,
    question: 'Hợp chất X có CTĐGN là CH₃O và M = 62. CTPT của X là?',
    options: ['CH₃O', 'C₂H₆O₂', 'C₃H₉O₃', 'C₄H₁₂O₄'],
    correctAnswer: 'C₂H₆O₂',
    explanation: 'M(CH₃O) = 12 + 3 + 16 = 31. n = 62/31 = 2. CTPT = (CH₃O)₂ = C₂H₆O₂ (etylen glycol).',
    hint: 'Nhân đôi CTĐGN.'
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
            <div 
              key={cat.id} 
              className={`watermark-item ${isComplete ? 'completed' : ''}`}
            >
              <div className="watermark-icon" style={{ backgroundColor: isComplete ? '#10b981' : hasProgress ? '#3b82f6' : cat.color }}>
                <Icon className="w-4 h-4 text-white" />
                {isComplete && <div className="complete-badge">✓</div>}
              </div>
              <div className="watermark-info">
                <div className="watermark-name">{cat.name}</div>
                <div className="watermark-progress-bar">
                  <div 
                    className="watermark-progress-fill"
                    style={{ width: `${percentage}%`, backgroundColor: isComplete ? '#10b981' : hasProgress ? '#3b82f6' : cat.color }}
                  />
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
          <div 
            className="total-progress-fill"
            style={{ width: `${avgProgress}%` }}
          />
        </div>
        <div className="total-stats">
          {completedCount}/{CATEGORIES.length} chủ đề
          ({avgProgress}%)
        </div>
      </div>
    </div>
  );
}

const Bai04_DaiCuongHoaHuuCo = () => {
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

  const { hasProgress, savedProgress, saveProgress, clearProgress, getProgress, completeChallenge } = useChallengeProgress('dai_cuong_hoa_huu_co_11', {
    challengeId: 4,
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
    // Load persistent data (categoryProgress, highScore)
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
      
      // Only show resume dialog if there's an active category (not finished)
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
    if (isCorrect !== null) return; // Prevent multiple submissions

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
      
      // Play sound effect here if available
    } else {
      setStreak(0);
    }

    // Save progress
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
    const categoryCorrectAnswers = Math.round(score / 15); // Ước tính số câu đúng của category này
    
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
    
    // Save progress with accumulated data
    saveProgress({
      savedCategoryProgress: newCategoryProgress,
      savedHighScore: newHighScore,
      savedTotalCorrectAnswers: newTotalCorrectAnswers,
      savedTotalScore: newTotalScore
    });

    // Chỉ gọi completeChallenge khi hoàn thành TẤT CẢ categories
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
    <div className="huuco-bg min-h-screen p-4 md:p-8 font-sans text-slate-800">
      <div className="max-w-6xl mx-auto">
        {/* HEADER */}
        <header className="flex items-center justify-between mb-8 bg-white/90 backdrop-blur rounded-2xl p-4 shadow-lg">
          <div className="flex items-center gap-4">
            <Link to="/hoahoc/11" className="p-2 hover:bg-slate-100 rounded-full transition-colors">
              <ArrowLeft className="w-6 h-6 text-slate-600" />
            </Link>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-green-600 to-teal-600 bg-clip-text text-transparent">
                Đại Cương Hóa Hữu Cơ
              </h1>
              <p className="text-slate-500 text-sm">Hóa học 11 • Chương 4</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 px-4 py-2 bg-yellow-50 rounded-full border border-yellow-200">
              <Trophy className="w-5 h-5 text-yellow-500" />
              <span className="font-bold text-yellow-700">{score} XP</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-orange-50 rounded-full border border-orange-200">
              <Flame className="w-5 h-5 text-orange-500" />
              <span className="font-bold text-orange-700">{streak} Chuỗi</span>
            </div>
          </div>
        </header>

        {!activeCategory ? (
          // CATEGORY SELECTION
          <div className="animate-fadeIn">
            <div className="stats-bar-huuco mb-8">
              <div className="stat-item-huuco">
                <CheckCircle2 className="w-5 h-5 text-green-500" />
                <span>Đã hoàn thành: <strong>{Object.values(categoryProgress).filter(p => p >= 80).length}/{CATEGORIES.length}</strong></span>
              </div>
              <div className="stat-item-huuco">
                <Star className="w-5 h-5 text-yellow-500" />
                <span>Điểm cao nhất: <strong>{highScore || 0}</strong></span>
              </div>
            </div>

            {/* Progress Watermark */}
            <ProgressWatermark categoryProgress={categoryProgress} challenges={CHALLENGES} />

            <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <Target className="w-6 h-6" />
              Chọn chủ đề thử thách
            </h2>

            <div className="category-grid-huuco">
              {CATEGORIES.map((cat) => {
                const Icon = cat.icon;
                const catPercentage = categoryProgress[cat.id] || 0;
                const isCompleted = catPercentage >= 80;
                const hasProgress = catPercentage > 0 && !isCompleted;
                
                return (
                  <div 
                    key={cat.id}
                    onClick={() => handleCategorySelect(cat.id)}
                    className="category-card-huuco group"
                  >
                    <div className={`category-icon-wrapper-huuco ${isCompleted ? 'bg-green-100 text-green-600' : hasProgress ? 'bg-blue-100 text-blue-600' : ''}`}>
                      <Icon className="w-8 h-8" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-slate-800 mb-1 group-hover:text-green-600 transition-colors">
                        {cat.name}
                      </h3>
                      <p className="text-sm text-slate-500 mb-3">{cat.description}</p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-semibold px-2 py-1 rounded bg-slate-100 text-slate-600">
                            {CHALLENGES.filter(c => c.category === cat.id).length} câu hỏi
                          </span>
                          {catPercentage > 0 && (
                            <span className={`text-xs font-semibold px-2 py-1 rounded ${isCompleted ? 'bg-green-100 text-green-600' : 'bg-blue-100 text-blue-600'}`}>
                              {catPercentage}%
                            </span>
                          )}
                        </div>
                        {isCompleted && <CheckCircle2 className="w-5 h-5 text-green-500" />}
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
            {/* Progress & Timer */}
            <div className="flex items-center justify-between mb-6 text-white">
              <div className="flex items-center gap-4">
                <button onClick={() => setActiveCategory(null)} className="hover:bg-white/10 p-2 rounded-full transition-colors">
                  <RotateCcw className="w-5 h-5" />
                </button>
                <span className="font-medium text-lg">
                  Câu {currentQuestionIndex + 1}/{filteredQuestions.length}
                </span>
              </div>
              <div className={`flex items-center gap-2 px-4 py-2 rounded-full ${timeLeft < 10 ? 'bg-red-500/20 text-red-100' : 'bg-white/20'}`}>
                <Clock className="w-4 h-4" />
                <span className="font-mono font-bold">{timeLeft}s</span>
              </div>
            </div>

            <div className="progress-track-huuco mb-6">
              <div 
                className="progress-fill-huuco"
                style={{ width: `${((currentQuestionIndex) / filteredQuestions.length) * 100}%` }}
              />
            </div>

            <div className="question-card-huuco">
              <div className="question-header-huuco">
                <span className={`difficulty-badge-huuco ${
                  currentQuestion.difficulty === 1 ? 'difficulty-easy' :
                  currentQuestion.difficulty === 2 ? 'difficulty-medium' : 'difficulty-hard'
                }`}>
                  {currentQuestion.difficulty === 1 ? 'Dễ' :
                   currentQuestion.difficulty === 2 ? 'Trung bình' : 'Khó'}
                </span>
                <div className="flex gap-1">
                  {[...Array(currentQuestion.difficulty)].map((_, i) => (
                    <Zap key={i} className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                  ))}
                </div>
              </div>

              <h3 className="text-xl md:text-2xl font-bold text-slate-800 mb-6 leading-relaxed">
                {currentQuestion.question}
              </h3>

              {currentQuestion.type === 'multiple-choice' ? (
                <div className="options-grid-huuco">
                  {currentQuestion.options.map((option, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleAnswerSubmit(option)}
                      disabled={isCorrect !== null}
                      className={`option-btn-huuco ${
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
                      className="flex-1 p-4 border-2 border-slate-200 rounded-xl text-lg focus:border-green-500 focus:outline-none"
                      onKeyDown={(e) => e.key === 'Enter' && handleAnswerSubmit(selectedAnswer)}
                    />
                    <button
                      onClick={() => handleAnswerSubmit(selectedAnswer)}
                      disabled={!selectedAnswer || isCorrect !== null}
                      className="px-6 py-2 bg-green-600 text-white rounded-xl font-bold hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Kiểm tra
                    </button>
                  </div>
                </div>
              )}

              {/* Explanation */}
              {showExplanation && (
                <div className={`feedback-container-huuco ${isCorrect ? 'feedback-correct' : 'feedback-wrong'}`}>
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
                      className="flex items-center gap-2 px-6 py-2 bg-slate-800 text-white rounded-lg font-bold hover:bg-slate-700 transition-colors"
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
            <div className="bg-white rounded-3xl p-8 shadow-2xl mb-8">
              <div className="w-24 h-24 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Award className="w-12 h-12 text-yellow-600" />
              </div>
              
              <h2 className="text-3xl font-bold text-slate-800 mb-2">Hoàn thành xuất sắc!</h2>
              <p className="text-slate-500 mb-8">Bạn đã hoàn thành chủ đề {CATEGORIES.find(c => c.id === activeCategory)?.name}</p>
              
              <div className="grid grid-cols-3 gap-4 mb-8">
                <div className="p-4 bg-slate-50 rounded-2xl">
                  <div className="text-sm text-slate-500 mb-1">Điểm số</div>
                  <div className="text-2xl font-bold text-green-600">{score}</div>
                </div>
                <div className="p-4 bg-slate-50 rounded-2xl">
                  <div className="text-sm text-slate-500 mb-1">Đúng</div>
                  <div className="text-2xl font-bold text-blue-600">
                    {Math.min(100, Math.round((score / (filteredQuestions.length * 20)) * 100))}%
                  </div>
                </div>
                <div className="p-4 bg-slate-50 rounded-2xl">
                  <div className="text-sm text-slate-500 mb-1">Thời gian</div>
                  <div className="text-2xl font-bold text-purple-600">
                    {Math.floor((filteredQuestions.length * 30 - timeLeft) / 60)}m
                  </div>
                </div>
              </div>

              <div className="flex gap-4 justify-center">
                <button
                  onClick={resetGame}
                  className="flex items-center gap-2 px-6 py-3 bg-slate-100 text-slate-700 rounded-xl font-bold hover:bg-slate-200 transition-colors"
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
                  className="flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-xl font-bold hover:bg-green-700 transition-colors shadow-lg shadow-green-200"
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

export default Bai04_DaiCuongHoaHuuCo;
