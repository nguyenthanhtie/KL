import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowLeft, Trophy, RotateCcw, ChevronRight,
  CheckCircle2, XCircle, Lightbulb, Zap, Award,
  FlaskConical, Flame, Atom, Layers, Hexagon, Fuel,
  Clock, Target, AlertTriangle
} from 'lucide-react';
import useChallengeProgress from '../../../hooks/useChallengeProgress';
import ResumeDialog from '../../../components/ResumeDialog';
import './CSS/Bai05_Hidrocacbon.css';

// ================== DATA - HIDROCACBON ==================
const CATEGORIES = [
  {
    id: 'alkan',
    name: 'Ankan (Parafin)',
    icon: Layers,
    color: '#6366f1',
    description: 'Hidrocacbon no, mạch hở (CnH2n+2)',
    bgGradient: 'from-indigo-500 to-blue-500'
  },
  {
    id: 'unsaturated',
    name: 'Anken & Ankin',
    icon: Flame,
    color: '#f43f5e',
    description: 'Hidrocacbon không no (C=C, C≡C)',
    bgGradient: 'from-rose-500 to-red-500'
  },
  {
    id: 'aromatic',
    name: 'Hidrocacbon Thơm',
    icon: Hexagon,
    color: '#8b5cf6',
    description: 'Benzen và đồng đẳng (Vòng benzen)',
    bgGradient: 'from-violet-500 to-purple-500'
  },
  {
    id: 'sources',
    name: 'Nguồn Hidrocacbon',
    icon: Fuel,
    color: '#10b981',
    description: 'Dầu mỏ, khí thiên nhiên, than đá',
    bgGradient: 'from-emerald-500 to-green-500'
  }
];

// Bộ câu hỏi tĩnh
const CHALLENGES = [
  // ========== ANKAN (12 câu) ==========
  {
    id: 1,
    category: 'alkan',
    type: 'multiple-choice',
    difficulty: 1,
    question: 'Công thức tổng quát của ankan là gì?',
    options: ['CnH2n', 'CnH2n+2', 'CnH2n-2', 'CnH2n-6'],
    correctAnswer: 'CnH2n+2',
    explanation: 'Ankan là hidrocacbon no, mạch hở có công thức chung là CnH2n+2 (n ≥ 1).',
    hint: 'Số nguyên tử H gấp đôi số C cộng thêm 2.'
  },
  {
    id: 2,
    category: 'alkan',
    type: 'multiple-choice',
    difficulty: 1,
    question: 'Ankan đơn giản nhất là chất nào?',
    options: ['Etan', 'Metan', 'Propan', 'Butan'],
    correctAnswer: 'Metan',
    explanation: 'Metan (CH4) là ankan đơn giản nhất với n = 1 trong công thức CnH2n+2.',
    hint: 'Chỉ có 1 nguyên tử cacbon.'
  },
  {
    id: 3,
    category: 'alkan',
    type: 'multiple-choice',
    difficulty: 2,
    question: 'Phản ứng đặc trưng của ankan là gì?',
    options: ['Phản ứng cộng', 'Phản ứng thế', 'Phản ứng trùng hợp', 'Phản ứng oxi hóa khử'],
    correctAnswer: 'Phản ứng thế',
    explanation: 'Ankan là hidrocacbon no nên phản ứng đặc trưng là phản ứng thế (thay thế H bằng halogen).',
    hint: 'Do liên kết đơn C-C và C-H bền vững.'
  },
  {
    id: 4,
    category: 'alkan',
    type: 'multiple-choice',
    difficulty: 2,
    question: 'Khi clo hóa metan trong điều kiện ánh sáng, sản phẩm chính đầu tiên là gì?',
    options: ['CH2Cl2', 'CHCl3', 'CH3Cl', 'CCl4'],
    correctAnswer: 'CH3Cl',
    explanation: 'CH4 + Cl2 → CH3Cl + HCl. Sản phẩm thế monohalogen được tạo thành đầu tiên.',
    hint: 'Thế 1 nguyên tử H bằng Cl.'
  },
  {
    id: 5,
    category: 'alkan',
    type: 'multiple-choice',
    difficulty: 2,
    question: 'Crackinh ankan là quá trình nào?',
    options: ['Bẻ gãy mạch cacbon thành các phân tử nhỏ hơn', 'Ghép các mạch cacbon ngắn thành dài', 'Chuyển mạch thẳng thành mạch nhánh', 'Tách hidro từ ankan'],
    correctAnswer: 'Bẻ gãy mạch cacbon thành các phân tử nhỏ hơn',
    explanation: 'Crackinh là quá trình bẻ gãy liên kết C-C trong ankan mạch dài thành các phân tử nhỏ hơn (ankan + anken).',
    hint: 'Cracking nghĩa là "bẻ gãy".'
  },
  {
    id: 6,
    category: 'alkan',
    type: 'multiple-choice',
    difficulty: 2,
    question: 'Sản phẩm crackinh butan có thể là những chất nào?',
    options: ['Metan + propilen', 'Etan + etilen', 'Cả A và B đều đúng', 'Pentan + hidro'],
    correctAnswer: 'Cả A và B đều đúng',
    explanation: 'C4H10 → CH4 + C3H6 hoặc C4H10 → C2H6 + C2H4. Crackinh tạo ra hỗn hợp ankan + anken.',
    hint: 'Tổng số cacbon ở 2 vế phải bằng nhau.'
  },
  {
    id: 7,
    category: 'alkan',
    type: 'multiple-choice',
    difficulty: 1,
    question: 'Ankan có bao nhiêu đồng phân mạch cacbon khi n = 4?',
    options: ['1', '2', '3', '4'],
    correctAnswer: '2',
    explanation: 'C4H10 có 2 đồng phân: n-butan (mạch thẳng) và iso-butan (mạch nhánh).',
    hint: 'Butan có thể có mạch thẳng hoặc nhánh.'
  },
  {
    id: 8,
    category: 'alkan',
    type: 'multiple-choice',
    difficulty: 3,
    question: 'Đốt cháy hoàn toàn 1 mol ankan X thu được 5 mol CO2. X là chất nào?',
    options: ['Butan', 'Pentan', 'Hexan', 'Heptan'],
    correctAnswer: 'Pentan',
    explanation: 'Số mol CO2 = số nguyên tử C trong ankan. 5 mol CO2 → C5H12 (Pentan).',
    hint: 'Số mol CO2 bằng số cacbon.'
  },
  {
    id: 9,
    category: 'alkan',
    type: 'multiple-choice',
    difficulty: 2,
    question: 'Phản ứng thế halogen của ankan xảy ra theo cơ chế nào?',
    options: ['Cơ chế ion', 'Cơ chế gốc tự do', 'Cơ chế cộng', 'Cơ chế nucleophin'],
    correctAnswer: 'Cơ chế gốc tự do',
    explanation: 'Phản ứng halogen hóa ankan xảy ra theo cơ chế gốc tự do (SR) với 3 giai đoạn: khơi mào, phát triển mạch, tắt mạch.',
    hint: 'Cần ánh sáng hoặc nhiệt độ cao để khơi mào.'
  },
  {
    id: 10,
    category: 'alkan',
    type: 'multiple-choice',
    difficulty: 3,
    question: 'Reforming ankan là quá trình nào?',
    options: ['Chuyển ankan mạch thẳng thành mạch nhánh hoặc vòng', 'Bẻ gãy mạch cacbon', 'Cộng hidro vào ankan', 'Tách nước từ ancol'],
    correctAnswer: 'Chuyển ankan mạch thẳng thành mạch nhánh hoặc vòng',
    explanation: 'Reforming là quá trình chuyển đổi cấu trúc ankan mạch thẳng thành mạch nhánh (isomer hóa) hoặc vòng hóa để tăng chỉ số octan của xăng.',
    hint: 'Re-form nghĩa là "tái cấu trúc".'
  },
  {
    id: 11,
    category: 'alkan',
    type: 'multiple-choice',
    difficulty: 1,
    question: 'Ở điều kiện thường, metan tồn tại ở trạng thái nào?',
    options: ['Rắn', 'Lỏng', 'Khí', 'Huyền phù'],
    correctAnswer: 'Khí',
    explanation: 'Metan (CH4) có phân tử khối nhỏ (M = 16), lực Van der Waals yếu nên ở điều kiện thường là chất khí.',
    hint: 'Các ankan từ C1 đến C4 đều là chất khí.'
  },
  {
    id: 12,
    category: 'alkan',
    type: 'multiple-choice',
    difficulty: 2,
    question: 'Đốt cháy ankan thu được số mol H2O so với CO2 như thế nào?',
    options: ['nH2O < nCO2', 'nH2O = nCO2', 'nH2O > nCO2', 'Không xác định được'],
    correctAnswer: 'nH2O > nCO2',
    explanation: 'CnH2n+2 + O2 → nCO2 + (n+1)H2O. Số mol H2O = n+1, số mol CO2 = n, nên nH2O > nCO2.',
    hint: 'Xét công thức CnH2n+2, số H = 2n+2.'
  },

  // ========== ANKEN & ANKIN (14 câu) ==========
  {
    id: 13,
    category: 'unsaturated',
    type: 'multiple-choice',
    difficulty: 1,
    question: 'Anken là hidrocacbon không no mạch hở có chứa...',
    options: ['1 liên kết đôi C=C', '1 liên kết ba C≡C', '2 liên kết đôi C=C', 'Vòng benzen'],
    correctAnswer: '1 liên kết đôi C=C',
    explanation: 'Anken có 1 liên kết đôi C=C trong phân tử. CTTQ: CnH2n (n ≥ 2).',
    hint: 'Etylen (CH2=CH2) là anken đơn giản nhất.'
  },
  {
    id: 14,
    category: 'unsaturated',
    type: 'multiple-choice',
    difficulty: 1,
    question: 'Công thức tổng quát của ankin là gì?',
    options: ['CnH2n', 'CnH2n+2', 'CnH2n-2', 'CnH2n-6'],
    correctAnswer: 'CnH2n-2',
    explanation: 'Ankin có 1 liên kết ba C≡C, công thức tổng quát CnH2n-2 (n ≥ 2).',
    hint: 'Liên kết ba làm giảm 4H so với ankan.'
  },
  {
    id: 15,
    category: 'unsaturated',
    type: 'multiple-choice',
    difficulty: 2,
    question: 'Phản ứng đặc trưng của anken và ankin là gì?',
    options: ['Phản ứng thế', 'Phản ứng cộng', 'Phản ứng tách', 'Phản ứng trùng ngưng'],
    correctAnswer: 'Phản ứng cộng',
    explanation: 'Do có liên kết π kém bền, anken và ankin dễ tham gia phản ứng cộng (H2, X2, HX, H2O...).',
    hint: 'Liên kết π dễ bị phá vỡ.'
  },
  {
    id: 16,
    category: 'unsaturated',
    type: 'multiple-choice',
    difficulty: 2,
    question: 'Theo quy tắc Markovnikov, khi cộng HBr vào propilen, sản phẩm chính là gì?',
    options: ['CH3-CHBr-CH3', 'CH3-CH2-CH2Br', 'CH2Br-CH=CH2', 'CHBr=CH-CH3'],
    correctAnswer: 'CH3-CHBr-CH3',
    explanation: 'Quy tắc Markovnikov: H cộng vào C mang nhiều H hơn, Br cộng vào C mang ít H hơn. CH3-CH=CH2 + HBr → CH3-CHBr-CH3.',
    hint: 'H đi vào C có nhiều H hơn.'
  },
  {
    id: 17,
    category: 'unsaturated',
    type: 'multiple-choice',
    difficulty: 2,
    question: 'Ankin nào phản ứng được với dung dịch AgNO3/NH3?',
    options: ['Ankin có liên kết ba ở đầu mạch', 'Mọi ankin', 'Ankin có liên kết ba ở giữa mạch', 'Không ankin nào'],
    correctAnswer: 'Ankin có liên kết ba ở đầu mạch',
    explanation: 'Chỉ ankin-1 (RC≡CH) có H linh động mới phản ứng với AgNO3/NH3 tạo kết tủa vàng nhạt RC≡CAg.',
    hint: 'Cần có nguyên tử H liên kết trực tiếp với C≡C.'
  },
  {
    id: 18,
    category: 'unsaturated',
    type: 'multiple-choice',
    difficulty: 2,
    question: 'Axetilen (C2H2) phản ứng với dung dịch AgNO3/NH3 tạo kết tủa màu gì?',
    options: ['Trắng', 'Vàng nhạt', 'Xanh lam', 'Đỏ nâu'],
    correctAnswer: 'Vàng nhạt',
    explanation: 'CH≡CH + 2AgNO3 + 2NH3 → Ag-C≡C-Ag↓ (vàng nhạt) + 2NH4NO3. Đây là phản ứng đặc trưng nhận biết ankin-1.',
    hint: 'Bạc axetilua có màu vàng nhạt.'
  },
  {
    id: 19,
    category: 'unsaturated',
    type: 'multiple-choice',
    difficulty: 1,
    question: 'Etilen (C2H4) làm mất màu dung dịch brom vì xảy ra phản ứng nào?',
    options: ['Phản ứng thế', 'Phản ứng cộng', 'Phản ứng oxi hóa khử', 'Phản ứng trùng hợp'],
    correctAnswer: 'Phản ứng cộng',
    explanation: 'CH2=CH2 + Br2 → CH2Br-CH2Br. Phản ứng cộng brom làm mất màu dung dịch brom là phản ứng nhận biết anken.',
    hint: 'Br2 cộng vào liên kết đôi C=C.'
  },
  {
    id: 20,
    category: 'unsaturated',
    type: 'multiple-choice',
    difficulty: 3,
    question: 'Đốt cháy hoàn toàn anken thu được số mol H2O so với CO2 như thế nào?',
    options: ['nH2O < nCO2', 'nH2O = nCO2', 'nH2O > nCO2', 'Không xác định được'],
    correctAnswer: 'nH2O = nCO2',
    explanation: 'CnH2n + 3n/2 O2 → nCO2 + nH2O. Đốt cháy anken: số mol H2O = số mol CO2.',
    hint: 'Xét công thức CnH2n.'
  },
  {
    id: 21,
    category: 'unsaturated',
    type: 'multiple-choice',
    difficulty: 2,
    question: 'Sản phẩm chính khi hidrat hóa propilen (H2O, H2SO4) theo quy tắc Markovnikov là gì?',
    options: ['Propan-1-ol', 'Propan-2-ol', 'Propanal', 'Axeton'],
    correctAnswer: 'Propan-2-ol',
    explanation: 'CH3-CH=CH2 + H2O → CH3-CHOH-CH3 (propan-2-ol). H đi vào C có nhiều H, OH đi vào C có ít H hơn.',
    hint: 'Áp dụng quy tắc Markovnikov.'
  },
  {
    id: 22,
    category: 'unsaturated',
    type: 'multiple-choice',
    difficulty: 2,
    question: 'Phản ứng trùng hợp etilen tạo ra sản phẩm gì?',
    options: ['Polietilen (PE)', 'Polivinyl clorua (PVC)', 'Polipropilen (PP)', 'Cao su buna'],
    correctAnswer: 'Polietilen (PE)',
    explanation: 'nCH2=CH2 → (-CH2-CH2-)n. Polietilen là chất dẻo phổ biến, dùng làm túi nhựa, màng bọc...',
    hint: 'Poly + etilen = polietilen.'
  },
  {
    id: 23,
    category: 'unsaturated',
    type: 'multiple-choice',
    difficulty: 3,
    question: 'Cho 2,479 lít (đktc) hỗn hợp anken qua dung dịch brom dư, khối lượng brom phản ứng là bao nhiêu?',
    options: ['8 gam', '16 gam', '24 gam', '32 gam'],
    correctAnswer: '16 gam',
    explanation: 'n(anken) = 2,479/24,79 = 0,1 mol (theo đktc mới: 25°C, 1 bar). Anken + Br2 (tỉ lệ 1:1). m(Br2) = 0,1 × 160 = 16 gam.',
    hint: 'Tỉ lệ mol anken : Br2 = 1 : 1. Lưu ý: Thể tích mol khí ở đktc (25°C, 1 bar) = 24,79 lít.'
  },
  {
    id: 24,
    category: 'unsaturated',
    type: 'multiple-choice',
    difficulty: 1,
    question: 'Anken có đồng phân hình học khi thỏa mãn điều kiện nào?',
    options: ['Có 2 nhóm thế khác nhau ở mỗi C mang liên kết đôi', 'Có mạch cacbon dài', 'Có vòng benzen', 'Có liên kết ba'],
    correctAnswer: 'Có 2 nhóm thế khác nhau ở mỗi C mang liên kết đôi',
    explanation: 'Đồng phân cis-trans của anken xuất hiện khi mỗi C của liên kết đôi liên kết với 2 nhóm thế khác nhau.',
    hint: 'Điều kiện để có đồng phân hình học.'
  },
  {
    id: 25,
    category: 'unsaturated',
    type: 'multiple-choice',
    difficulty: 2,
    question: 'But-2-en có bao nhiêu đồng phân hình học?',
    options: ['0', '1', '2', '3'],
    correctAnswer: '2',
    explanation: 'CH3-CH=CH-CH3 có 2 đồng phân: cis-but-2-en (2 nhóm CH3 cùng phía) và trans-but-2-en (2 nhóm CH3 khác phía).',
    hint: 'Xét vị trí 2 nhóm CH3.'
  },
  {
    id: 26,
    category: 'unsaturated',
    type: 'multiple-choice',
    difficulty: 3,
    question: 'Axetilen được điều chế trong công nghiệp bằng cách nào?',
    options: ['Nhiệt phân metan ở 1500°C', 'Cho canxi cacbua tác dụng với nước', 'Cả A và B đều đúng', 'Crackinh dầu mỏ'],
    correctAnswer: 'Cả A và B đều đúng',
    explanation: '2CH4 --1500°C--> C2H2 + 3H2 (công nghiệp). CaC2 + 2H2O → C2H2 + Ca(OH)2 (phòng thí nghiệm).',
    hint: 'Có nhiều cách điều chế axetilen.'
  },

  // ========== HIDROCACBON THƠM (10 câu) ==========
  {
    id: 27,
    category: 'aromatic',
    type: 'multiple-choice',
    difficulty: 2,
    question: 'Công thức phân tử của benzen là...',
    options: ['C6H12', 'C6H14', 'C6H6', 'C6H10'],
    correctAnswer: 'C6H6',
    explanation: 'Benzen có công thức phân tử C6H6, cấu trúc vòng lục giác đều với hệ liên kết pi liên hợp bền vững.',
    hint: 'Độ bất bão hòa k = 4.'
  },
  {
    id: 28,
    category: 'aromatic',
    type: 'multiple-choice',
    difficulty: 2,
    question: 'Phản ứng đặc trưng của benzen là gì?',
    options: ['Phản ứng cộng', 'Phản ứng thế', 'Phản ứng tách', 'Phản ứng trùng hợp'],
    correctAnswer: 'Phản ứng thế',
    explanation: 'Do hệ liên hợp bền vững, benzen ưu tiên phản ứng thế (giữ nguyên vòng) hơn phản ứng cộng.',
    hint: 'Vòng benzen bền, khó bị phá vỡ.'
  },
  {
    id: 29,
    category: 'aromatic',
    type: 'multiple-choice',
    difficulty: 2,
    question: 'Nitro hóa benzen bằng hỗn hợp HNO3 đặc và H2SO4 đặc tạo ra sản phẩm gì?',
    options: ['Phenol', 'Nitrobenzen', 'Anilin', 'Axit benzoic'],
    correctAnswer: 'Nitrobenzen',
    explanation: 'C6H6 + HNO3 --H2SO4, t°--> C6H5NO2 + H2O. Nitrobenzen là chất lỏng màu vàng, mùi hạnh nhân.',
    hint: 'Nhóm -NO2 thế vào vòng benzen.'
  },
  {
    id: 30,
    category: 'aromatic',
    type: 'multiple-choice',
    difficulty: 2,
    question: 'Toluen (C6H5-CH3) có thể phản ứng với dung dịch KMnO4 loãng không?',
    options: ['Có, tạo axit benzoic', 'Có, tạo phenol', 'Không phản ứng', 'Có, tạo benzaldehit'],
    correctAnswer: 'Có, tạo axit benzoic',
    explanation: 'C6H5-CH3 + 2KMnO4 → C6H5-COOK + 2MnO2 + KOH + H2O. Nhóm -CH3 bị oxi hóa thành -COOH.',
    hint: 'Nhóm metyl bị oxi hóa bởi KMnO4.'
  },
  {
    id: 31,
    category: 'aromatic',
    type: 'multiple-choice',
    difficulty: 1,
    question: 'Benzen có làm mất màu dung dịch brom (trong CCl4) không?',
    options: ['Có', 'Không', 'Chỉ khi có xúc tác', 'Chỉ ở nhiệt độ cao'],
    correctAnswer: 'Không',
    explanation: 'Benzen không phản ứng cộng với brom trong dung dịch (do vòng benzen bền). Cần xúc tác Fe hoặc FeBr3 để xảy ra phản ứng thế.',
    hint: 'Benzen bền hơn anken.'
  },
  {
    id: 32,
    category: 'aromatic',
    type: 'multiple-choice',
    difficulty: 3,
    question: 'Khi brom hóa toluen với xúc tác Fe, sản phẩm chính là gì?',
    options: ['o-bromtoluen và p-bromtoluen', 'm-bromtoluen', 'Benzyl bromua', 'Tribromtoluen'],
    correctAnswer: 'o-bromtoluen và p-bromtoluen',
    explanation: 'Nhóm -CH3 là nhóm đẩy electron, định hướng thế vào vị trí ortho và para. Sản phẩm chính: o- và p-bromtoluen.',
    hint: 'Nhóm -CH3 định hướng ortho-para.'
  },
  {
    id: 33,
    category: 'aromatic',
    type: 'multiple-choice',
    difficulty: 2,
    question: 'Stiren có công thức cấu tạo là gì?',
    options: ['C6H5-CH3', 'C6H5-CH=CH2', 'C6H5-CH2-CH3', 'C6H5-C≡CH'],
    correctAnswer: 'C6H5-CH=CH2',
    explanation: 'Stiren (vinylbenzen) có công thức C6H5-CH=CH2, là monome để trùng hợp tạo polistiren.',
    hint: 'Stiren có nhóm vinyl (-CH=CH2) gắn vào vòng benzen.'
  },
  {
    id: 34,
    category: 'aromatic',
    type: 'multiple-choice',
    difficulty: 3,
    question: 'Số liên kết pi (π) trong phân tử benzen là bao nhiêu?',
    options: ['3', '4', '6', 'Hệ liên hợp 6 electron π'],
    correctAnswer: 'Hệ liên hợp 6 electron π',
    explanation: 'Benzen có hệ 6 electron π liên hợp trong vòng, không phải 3 liên kết đôi độc lập. Đây là đặc điểm của tính thơm.',
    hint: 'Electron π trong benzen được giải tỏa.'
  },
  {
    id: 35,
    category: 'aromatic',
    type: 'multiple-choice',
    difficulty: 2,
    question: 'Naphtalen có công thức phân tử là gì?',
    options: ['C10H8', 'C10H10', 'C8H8', 'C12H10'],
    correctAnswer: 'C10H8',
    explanation: 'Naphtalen gồm 2 vòng benzen chung cạnh, công thức C10H8. Được dùng làm băng phiến chống gián.',
    hint: '2 vòng benzen chung 2 cacbon.'
  },
  {
    id: 36,
    category: 'aromatic',
    type: 'multiple-choice',
    difficulty: 1,
    question: 'Benzen tan trong dung môi nào?',
    options: ['Nước', 'Các dung môi hữu cơ', 'Dung dịch NaOH', 'Dung dịch axit'],
    correctAnswer: 'Các dung môi hữu cơ',
    explanation: 'Benzen là chất không phân cực nên không tan trong nước, tan tốt trong các dung môi hữu cơ như ete, xăng, cloroform...',
    hint: 'Like dissolves like - chất không phân cực tan trong dung môi không phân cực.'
  },

  // ========== NGUỒN HIDROCACBON (8 câu) ==========
  {
    id: 37,
    category: 'sources',
    type: 'multiple-choice',
    difficulty: 1,
    question: 'Phương pháp chủ yếu để chế biến dầu mỏ là...',
    options: ['Chưng cất phân đoạn', 'Nhiệt phân', 'Điện phân', 'Thủy phân'],
    correctAnswer: 'Chưng cất phân đoạn',
    explanation: 'Dầu mỏ là hỗn hợp nhiều hidrocacbon có nhiệt độ sôi khác nhau, nên được tách bằng phương pháp chưng cất phân đoạn.',
    hint: 'Dựa vào sự khác nhau về nhiệt độ sôi.'
  },
  {
    id: 38,
    category: 'sources',
    type: 'multiple-choice',
    difficulty: 1,
    question: 'Thành phần chính của khí thiên nhiên là gì?',
    options: ['Etan', 'Metan', 'Propan', 'Butan'],
    correctAnswer: 'Metan',
    explanation: 'Khí thiên nhiên chứa chủ yếu metan (CH4), chiếm khoảng 95%. Đây là nguồn năng lượng sạch.',
    hint: 'Khí đốt gia đình chủ yếu là metan.'
  },
  {
    id: 39,
    category: 'sources',
    type: 'multiple-choice',
    difficulty: 2,
    question: 'Khí hóa lỏng (LPG) chứa chủ yếu các khí nào?',
    options: ['Metan và etan', 'Propan và butan', 'Etilen và propilen', 'Axetilen và metan'],
    correctAnswer: 'Propan và butan',
    explanation: 'LPG (Liquefied Petroleum Gas) chủ yếu là propan và butan, được nén thành lỏng để tiện vận chuyển và sử dụng.',
    hint: 'Gas nấu ăn thường chứa 2 khí này.'
  },
  {
    id: 40,
    category: 'sources',
    type: 'multiple-choice',
    difficulty: 2,
    question: 'Quá trình chưng cất dầu mỏ thu được phân đoạn nào có nhiệt độ sôi thấp nhất?',
    options: ['Dầu diesel', 'Xăng', 'Khí đốt', 'Dầu mazut'],
    correctAnswer: 'Khí đốt',
    explanation: 'Thứ tự nhiệt độ sôi tăng dần: khí đốt < xăng < dầu hỏa < dầu diesel < dầu mazut < nhựa đường.',
    hint: 'Phân đoạn nhẹ có nhiệt độ sôi thấp.'
  },
  {
    id: 41,
    category: 'sources',
    type: 'multiple-choice',
    difficulty: 2,
    question: 'Than đá được hình thành từ nguồn gì?',
    options: ['Sinh vật biển', 'Thực vật cổ đại', 'Động vật cổ đại', 'Khoáng chất'],
    correctAnswer: 'Thực vật cổ đại',
    explanation: 'Than đá được hình thành từ xác thực vật (cây cối) chôn vùi hàng triệu năm dưới áp suất và nhiệt độ cao.',
    hint: 'Than = cacbon từ thực vật.'
  },
  {
    id: 42,
    category: 'sources',
    type: 'multiple-choice',
    difficulty: 2,
    question: 'Chưng cất khô than đá thu được sản phẩm nào?',
    options: ['Than cốc, nhựa than đá, khí than', 'Xăng, dầu hỏa, dầu diesel', 'Metan, etan, propan', 'Benzen, toluen, xilen'],
    correctAnswer: 'Than cốc, nhựa than đá, khí than',
    explanation: 'Chưng cất khô than đá (nung than đá không có không khí) thu được: than cốc (dùng trong luyện kim), nhựa than đá, khí than.',
    hint: 'Không phải chưng cất dầu mỏ.'
  },
  {
    id: 43,
    category: 'sources',
    type: 'multiple-choice',
    difficulty: 3,
    question: 'Chỉ số octan của xăng cho biết điều gì?',
    options: ['Nhiệt độ sôi của xăng', 'Khả năng chống kích nổ', 'Hàm lượng benzen', 'Độ nhớt của xăng'],
    correctAnswer: 'Khả năng chống kích nổ',
    explanation: 'Chỉ số octan càng cao, xăng càng chống kích nổ tốt. Xăng A95 có chỉ số octan 95, tốt hơn A92.',
    hint: 'Liên quan đến chất lượng xăng.'
  },
  {
    id: 44,
    category: 'sources',
    type: 'multiple-choice',
    difficulty: 3,
    question: 'Nguồn gốc hình thành dầu mỏ chủ yếu từ đâu?',
    options: ['Xác thực vật', 'Xác sinh vật biển (phiêu sinh)', 'Khoáng chất vô cơ', 'Than đá phân hủy'],
    correctAnswer: 'Xác sinh vật biển (phiêu sinh)',
    explanation: 'Dầu mỏ hình thành từ xác sinh vật phù du (plankton) biển chôn vùi hàng triệu năm dưới lớp trầm tích.',
    hint: 'Dầu mỏ thường tìm thấy ở vùng biển cổ đại.'
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
            <div key={cat.id} className={`watermark-item ${isComplete ? 'completed' : ''}`}>
              <div className="watermark-icon" style={{ backgroundColor: isComplete ? '#10b981' : hasProgress ? '#3b82f6' : cat.color }}>
                <Icon className="w-4 h-4 text-white" />
                {isComplete && <div className="complete-badge">✓</div>}
              </div>
              <div className="watermark-info">
                <div className="watermark-name">{cat.name}</div>
                <div className="watermark-progress-bar">
                  <div className="watermark-progress-fill" style={{ width: `${percentage}%`, backgroundColor: isComplete ? '#10b981' : hasProgress ? '#3b82f6' : cat.color }} />
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
          <div className="total-progress-fill" style={{ width: `${avgProgress}%` }} />
        </div>
        <div className="total-stats">
          {completedCount}/{CATEGORIES.length} chủ đề ({avgProgress}%)
        </div>
      </div>
    </div>
  );
}

const Bai05_Hidrocacbon = () => {
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

  const { hasProgress, savedProgress, saveProgress, clearProgress, completeChallenge } = useChallengeProgress('hidrocacbon_11', {
    challengeId: 5,
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
    <div className="hidrocacbon-bg min-h-screen p-4 md:p-8 font-sans">
      <div className="max-w-6xl mx-auto">
        {/* HEADER */}
        <header className="flex items-center justify-between mb-8 bg-white/10 backdrop-blur rounded-2xl p-4 border border-white/20">
          <div className="flex items-center gap-4">
            <Link to="/hoahoc/11" className="p-2 hover:bg-white/10 rounded-full transition-colors text-white">
              <ArrowLeft className="w-6 h-6" />
            </Link>
            <div>
              <h1 className="text-2xl font-bold text-white">
                Hidrocacbon
              </h1>
              <p className="text-indigo-200 text-sm">Hóa học 11 • Chương 5, 6, 7</p>
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
            <div className="stats-bar-hidro mb-8">
              <div className="stat-item-hidro">
                <CheckCircle2 className="w-5 h-5 text-green-400" />
                <span>Đã hoàn thành: <strong>{Object.values(categoryProgress).filter(p => p >= 80).length}/{CATEGORIES.length}</strong></span>
              </div>
              <div className="stat-item-hidro">
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

            <div className="category-grid-hidro">
              {CATEGORIES.map((cat) => {
                const Icon = cat.icon;
                const catPercentage = categoryProgress[cat.id] || 0;
                const isCompleted = catPercentage >= 80;
                const hasProgress = catPercentage > 0 && !isCompleted;
                
                return (
                  <div 
                    key={cat.id}
                    onClick={() => handleCategorySelect(cat.id)}
                    className="category-card-hidro group"
                  >
                    <div className={`category-icon-wrapper-hidro ${isCompleted ? 'bg-green-500/20 text-green-400' : hasProgress ? 'bg-blue-500/20 text-blue-400' : ''}`}>
                      <Icon className="w-8 h-8" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-white mb-1 group-hover:text-indigo-300 transition-colors">
                        {cat.name}
                      </h3>
                      <p className="text-sm text-indigo-200 mb-3">{cat.description}</p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-semibold px-2 py-1 rounded bg-white/10 text-indigo-200">
                            {CHALLENGES.filter(c => c.category === cat.id).length} câu hỏi
                          </span>
                          {catPercentage > 0 && (
                            <span className={`text-xs font-semibold px-2 py-1 rounded ${isCompleted ? 'bg-green-500/20 text-green-300' : 'bg-blue-500/20 text-blue-300'}`}>
                              {catPercentage}%
                            </span>
                          )}
                        </div>
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

            <div className="progress-track-hidro mb-6">
              <div 
                className="progress-fill-hidro"
                style={{ width: `${((currentQuestionIndex) / filteredQuestions.length) * 100}%` }}
              />
            </div>

            <div className="question-card-hidro">
              <div className="question-header-hidro">
                <span className={`difficulty-badge-hidro ${
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
                <div className="options-grid-hidro">
                  {currentQuestion.options.map((option, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleAnswerSubmit(option)}
                      disabled={isCorrect !== null}
                      className={`option-btn-hidro ${
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
                <div className={`feedback-container-hidro ${isCorrect ? 'feedback-correct' : 'feedback-wrong'}`}>
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
              <p className="text-indigo-200 mb-8">Bạn đã hoàn thành chủ đề {CATEGORIES.find(c => c.id === activeCategory)?.name}</p>
              
              <div className="grid grid-cols-3 gap-4 mb-8">
                <div className="p-4 bg-white/5 rounded-2xl border border-white/10">
                  <div className="text-sm text-indigo-200 mb-1">Điểm số</div>
                  <div className="text-2xl font-bold text-green-400">{score}</div>
                </div>
                <div className="p-4 bg-white/5 rounded-2xl border border-white/10">
                  <div className="text-sm text-indigo-200 mb-1">Đúng</div>
                  <div className="text-2xl font-bold text-blue-400">
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

export default Bai05_Hidrocacbon;
