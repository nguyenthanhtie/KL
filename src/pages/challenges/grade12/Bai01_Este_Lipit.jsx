import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowLeft, Trophy, RotateCcw, ChevronRight,
  CheckCircle2, XCircle, Lightbulb, Zap, Award,
  FlaskConical, Droplets, Beaker, Leaf, Apple,
  Clock, Target, AlertTriangle, Flame
} from 'lucide-react';
import useChallengeProgress from '../../../hooks/useChallengeProgress';
import ResumeDialog from '../../../components/ResumeDialog';
import './CSS/Bai01_Este_Lipit.css';

// ================== DATA - ESTE VÀ LIPIT ==================
const CATEGORIES = [
  {
    id: 'este',
    name: 'Este',
    icon: FlaskConical,
    color: '#3b82f6',
    description: 'Cấu tạo, danh pháp, tính chất của este',
    bgGradient: 'from-blue-500 to-cyan-500'
  },
  {
    id: 'reactions',
    name: 'Phản ứng Este',
    icon: Beaker,
    color: '#f59e0b',
    description: 'Thủy phân, xà phòng hóa, điều chế',
    bgGradient: 'from-amber-500 to-orange-500'
  },
  {
    id: 'lipid',
    name: 'Chất béo (Lipit)',
    icon: Droplets,
    color: '#10b981',
    description: 'Cấu tạo, tính chất của triglixerit',
    bgGradient: 'from-emerald-500 to-green-500'
  },
  {
    id: 'applications',
    name: 'Ứng dụng thực tế',
    icon: Apple,
    color: '#8b5cf6',
    description: 'Xà phòng, chất tẩy rửa, thực phẩm',
    bgGradient: 'from-violet-500 to-purple-500'
  }
];

const CHALLENGES = [
  // ========== ESTE - 12 câu ==========
  {
    id: 1,
    category: 'este',
    type: 'multiple-choice',
    difficulty: 1,
    question: 'Công thức tổng quát của este no, đơn chức, mạch hở là...',
    options: ['CnH2nO2 (n ≥ 2)', 'CnH2n+2O2 (n ≥ 2)', 'CnH2n-2O2 (n ≥ 2)', 'CnH2nO (n ≥ 2)'],
    correctAnswer: 'CnH2nO2 (n ≥ 2)',
    explanation: 'Este no, đơn chức, mạch hở có công thức tổng quát CnH2nO2 với n ≥ 2. Este đơn giản nhất là HCOOCH3 (metyl fomat).',
    hint: 'Este có nhóm chức -COO-.'
  },
  {
    id: 2,
    category: 'este',
    type: 'multiple-choice',
    difficulty: 1,
    question: 'Este nào sau đây có mùi chuối chín?',
    options: ['Isoamyl axetat', 'Etyl axetat', 'Metyl fomat', 'Benzyl axetat'],
    correctAnswer: 'Isoamyl axetat',
    explanation: 'Isoamyl axetat (CH3COOCH2CH2CH(CH3)2) có mùi thơm đặc trưng của chuối chín, được dùng làm hương liệu trong thực phẩm.',
    hint: 'Tên thường gọi là "dầu chuối".'
  },
  {
    id: 3,
    category: 'este',
    type: 'multiple-choice',
    difficulty: 1,
    question: 'Nhóm chức đặc trưng của este là...',
    options: ['-COO-', '-COOH', '-CHO', '-OH'],
    correctAnswer: '-COO-',
    explanation: 'Nhóm chức -COO- (nhóm este) là nhóm chức đặc trưng của este, được tạo thành từ nhóm -CO- của axit và -O- của ancol.',
    hint: 'Là sự kết hợp giữa nhóm cacbonyl và oxi.'
  },
  {
    id: 4,
    category: 'este',
    type: 'fill-blank',
    difficulty: 1,
    question: 'Este đơn giản nhất là HCOOCH3, có tên gọi là metyl ___',
    options: [],
    correctAnswer: 'fomat',
    acceptedAnswers: ['fomat', 'formate', 'fomiat'],
    explanation: 'HCOOCH3 là metyl fomat, este của axit fomic (HCOOH) với ancol metylic (CH3OH).',
    hint: 'Tên este = tên gốc ancol + tên gốc axit (đuôi -at).'
  },
  {
    id: 5,
    category: 'este',
    type: 'multiple-choice',
    difficulty: 2,
    question: 'Số đồng phân este có công thức phân tử C4H8O2 là...',
    options: ['4', '3', '2', '5'],
    correctAnswer: '4',
    explanation: 'C4H8O2 có 4 đồng phân este: HCOOC3H7 (2 đồng phân: n-propyl fomat, isopropyl fomat), CH3COOC2H5 (etyl axetat), C2H5COOCH3 (metyl propionat).',
    hint: 'Xét các cách ghép gốc axit và gốc ancol khác nhau.'
  },
  {
    id: 6,
    category: 'este',
    type: 'multiple-choice',
    difficulty: 2,
    question: 'Este CH3COOC2H5 có tên gọi là...',
    options: ['Etyl axetat', 'Metyl axetat', 'Etyl fomat', 'Metyl propionat'],
    correctAnswer: 'Etyl axetat',
    explanation: 'CH3COOC2H5 được tạo từ axit axetic (CH3COOH) và ancol etylic (C2H5OH), tên gọi là etyl axetat.',
    hint: 'Tên este = tên gốc ancol + tên gốc axit (đuôi -at).'
  },
  {
    id: 7,
    category: 'este',
    type: 'multiple-choice',
    difficulty: 2,
    question: 'So với axit và ancol có cùng số nguyên tử C, este có nhiệt độ sôi...',
    options: ['Thấp hơn', 'Cao hơn', 'Bằng nhau', 'Không xác định'],
    correctAnswer: 'Thấp hơn',
    explanation: 'Este không có liên kết hidro giữa các phân tử (khác với axit và ancol), nên nhiệt độ sôi thấp hơn.',
    hint: 'Xét khả năng tạo liên kết hidro.'
  },
  {
    id: 8,
    category: 'este',
    type: 'fill-blank',
    difficulty: 2,
    question: 'Este có công thức HCOOCH3 được điều chế từ axit fomic và ancol ___',
    options: [],
    correctAnswer: 'metylic',
    acceptedAnswers: ['metylic', 'metyl', 'CH3OH', 'methanol'],
    explanation: 'HCOOCH3 (metyl fomat) được điều chế từ axit fomic HCOOH và ancol metylic CH3OH.',
    hint: 'Xét gốc -CH3 trong công thức este.'
  },
  {
    id: 9,
    category: 'este',
    type: 'multiple-choice',
    difficulty: 2,
    question: 'Este nào sau đây có mùi táo?',
    options: ['Etyl butirat', 'Isoamyl axetat', 'Geranyl axetat', 'Benzyl axetat'],
    correctAnswer: 'Etyl butirat',
    explanation: 'Etyl butirat (C3H7COOC2H5) có mùi thơm đặc trưng của táo, được dùng làm hương liệu.',
    hint: 'Este của axit butiric.'
  },
  {
    id: 10,
    category: 'este',
    type: 'multiple-choice',
    difficulty: 3,
    question: 'Este X có công thức C4H6O2. Số đồng phân este mạch hở của X là...',
    options: ['5', '4', '3', '6'],
    correctAnswer: '5',
    explanation: 'C4H6O2 (k=2) có 5 đồng phân este: HCOOCH=CHCH3 (cis, trans), HCOOCH2CH=CH2, CH2=CHCOOCH3, HCOOC(CH3)=CH2.',
    hint: 'Este không no có thể có nối đôi C=C hoặc trong vòng.'
  },
  {
    id: 11,
    category: 'este',
    type: 'multiple-choice',
    difficulty: 3,
    question: 'Vinyl axetat có công thức cấu tạo là...',
    options: ['CH3COOCH=CH2', 'CH2=CHCOOCH3', 'HCOOCH=CHCH3', 'CH3COOCH2CH=CH2'],
    correctAnswer: 'CH3COOCH=CH2',
    explanation: 'Vinyl axetat là este của axit axetic với ancol vinylic (CH2=CHOH - không bền). Công thức: CH3COOCH=CH2.',
    hint: 'Vinyl là nhóm CH2=CH-.'
  },
  {
    id: 12,
    category: 'este',
    type: 'fill-blank',
    difficulty: 3,
    question: 'Este phenyl axetat có công thức CH3COO___ (điền công thức gốc)',
    options: [],
    correctAnswer: 'C6H5',
    acceptedAnswers: ['C6H5', 'phenyl', 'Ph'],
    explanation: 'Phenyl axetat là este của axit axetic với phenol, công thức CH3COOC6H5.',
    hint: 'Phenyl là gốc của benzen.'
  },

  // ========== PHẢN ỨNG ESTE - 12 câu ==========
  {
    id: 13,
    category: 'reactions',
    type: 'multiple-choice',
    difficulty: 1,
    question: 'Phản ứng thủy phân este trong môi trường kiềm còn gọi là phản ứng...',
    options: ['Xà phòng hóa', 'Este hóa', 'Crackinh', 'Polime hóa'],
    correctAnswer: 'Xà phòng hóa',
    explanation: 'Phản ứng thủy phân este trong môi trường kiềm gọi là phản ứng xà phòng hóa vì sản phẩm là muối của axit (xà phòng nếu là axit béo).',
    hint: 'Sản phẩm dùng để tạo xà phòng.'
  },
  {
    id: 14,
    category: 'reactions',
    type: 'multiple-choice',
    difficulty: 1,
    question: 'Phản ứng giữa axit cacboxylic và ancol tạo este gọi là phản ứng...',
    options: ['Este hóa', 'Xà phòng hóa', 'Trùng hợp', 'Oxi hóa'],
    correctAnswer: 'Este hóa',
    explanation: 'Phản ứng este hóa là phản ứng giữa axit cacboxylic và ancol tạo este và nước, xúc tác H2SO4 đặc, đun nóng.',
    hint: 'Phản ứng tạo este.'
  },
  {
    id: 15,
    category: 'reactions',
    type: 'multiple-choice',
    difficulty: 1,
    question: 'Phản ứng thủy phân este trong môi trường axit là phản ứng...',
    options: ['Thuận nghịch', 'Một chiều', 'Không xảy ra', 'Tỏa nhiệt'],
    correctAnswer: 'Thuận nghịch',
    explanation: 'Thủy phân este trong môi trường axit là phản ứng thuận nghịch, cần H2SO4 loãng làm xúc tác và đun nóng.',
    hint: 'Ngược với phản ứng este hóa.'
  },
  {
    id: 16,
    category: 'reactions',
    type: 'fill-blank',
    difficulty: 1,
    question: 'Thủy phân CH3COOC2H5 trong môi trường kiềm thu được muối CH3COONa và ancol ___',
    options: [],
    correctAnswer: 'etylic',
    acceptedAnswers: ['etylic', 'etyl', 'C2H5OH', 'ethanol'],
    explanation: 'CH3COOC2H5 + NaOH → CH3COONa + C2H5OH. Sản phẩm là muối natri axetat và ancol etylic.',
    hint: 'Gốc C2H5- trong este.'
  },
  {
    id: 17,
    category: 'reactions',
    type: 'multiple-choice',
    difficulty: 2,
    question: 'Để tăng hiệu suất phản ứng este hóa, cần...',
    options: ['Tất cả các biện pháp trên', 'Dùng dư một trong hai chất đầu', 'Chưng cất este ra khỏi hỗn hợp', 'Dùng H2SO4 đặc hút nước'],
    correctAnswer: 'Tất cả các biện pháp trên',
    explanation: 'Phản ứng este hóa thuận nghịch, để tăng hiệu suất cần: dùng dư chất phản ứng, tách sản phẩm, dùng H2SO4 đặc làm xúc tác và hút nước.',
    hint: 'Áp dụng nguyên lí Le Chatelier.'
  },
  {
    id: 18,
    category: 'reactions',
    type: 'multiple-choice',
    difficulty: 2,
    question: 'Thủy phân este X trong môi trường kiềm thu được natri axetat và anđehit axetic. X là...',
    options: ['Vinyl axetat', 'Etyl axetat', 'Metyl axetat', 'Anlyl axetat'],
    correctAnswer: 'Vinyl axetat',
    explanation: 'Vinyl axetat (CH3COOCH=CH2) thủy phân cho CH3COONa và ancol vinylic (CH2=CHOH) không bền, chuyển thành anđehit CH3CHO.',
    hint: 'Ancol vinylic không bền, đồng phân hóa thành anđehit.'
  },
  {
    id: 19,
    category: 'reactions',
    type: 'multiple-choice',
    difficulty: 2,
    question: 'Xà phòng hóa hoàn toàn 8,8 gam etyl axetat cần dùng bao nhiêu ml dung dịch NaOH 1M?',
    options: ['100 ml', '200 ml', '50 ml', '150 ml'],
    correctAnswer: '100 ml',
    explanation: 'nCH3COOC2H5 = 8,8/88 = 0,1 mol. Phản ứng tỉ lệ 1:1 với NaOH nên cần 0,1 mol NaOH → V = 0,1/1 = 0,1 L = 100 ml.',
    hint: 'M(CH3COOC2H5) = 88 g/mol.'
  },
  {
    id: 20,
    category: 'reactions',
    type: 'fill-blank',
    difficulty: 2,
    question: 'Phản ứng xà phòng hóa là phản ứng ___ chiều',
    options: [],
    correctAnswer: 'một',
    acceptedAnswers: ['một', '1', 'mot'],
    explanation: 'Phản ứng xà phòng hóa (thủy phân trong kiềm) là phản ứng một chiều, khác với thủy phân trong axit (thuận nghịch).',
    hint: 'Khác với thủy phân trong axit.'
  },
  {
    id: 21,
    category: 'reactions',
    type: 'multiple-choice',
    difficulty: 2,
    question: 'Este nào sau đây khi thủy phân trong kiềm tạo ra 2 muối?',
    options: ['Phenyl axetat', 'Etyl axetat', 'Vinyl axetat', 'Metyl fomat'],
    correctAnswer: 'Phenyl axetat',
    explanation: 'CH3COOC6H5 + 2NaOH → CH3COONa + C6H5ONa + H2O. Phenol có tính axit yếu nên tác dụng với NaOH tạo muối.',
    hint: 'Este của phenol.'
  },
  {
    id: 22,
    category: 'reactions',
    type: 'multiple-choice',
    difficulty: 3,
    question: 'Thủy phân este X trong môi trường kiềm thu được hỗn hợp 2 muối và không thu được ancol. X có thể là...',
    options: ['Este của phenol với axit cacboxylic', 'Este no, đơn chức', 'Este của ancol với axit vô cơ', 'Este vòng'],
    correctAnswer: 'Este của phenol với axit cacboxylic',
    explanation: 'Este của phenol khi thủy phân trong kiềm cho 2 muối (muối của axit và muối phenolat), không tạo ancol vì phenol có tính axit.',
    hint: 'Phenol phản ứng được với NaOH.'
  },
  {
    id: 23,
    category: 'reactions',
    type: 'multiple-choice',
    difficulty: 3,
    question: 'Cho 0,1 mol este X tác dụng vừa đủ với 0,2 mol NaOH, thu được 1 muối và 1 ancol. X là este...',
    options: ['Hai chức', 'Đơn chức', 'Ba chức', 'Của phenol'],
    correctAnswer: 'Hai chức',
    explanation: 'Tỉ lệ neste : nNaOH = 1:2 chứng tỏ este có 2 nhóm -COO- (este hai chức).',
    hint: 'Xét tỉ lệ mol.'
  },
  {
    id: 24,
    category: 'reactions',
    type: 'fill-blank',
    difficulty: 3,
    question: 'Thủy phân este trong môi trường kiềm luôn tạo ra muối và ___ (hoặc phenol)',
    options: [],
    correctAnswer: 'ancol',
    acceptedAnswers: ['ancol', 'rượu', 'alcohol'],
    explanation: 'Thủy phân este trong kiềm: RCOOR\' + NaOH → RCOONa + R\'OH (ancol) hoặc R\'ONa (nếu R\'OH là phenol).',
    hint: 'Sản phẩm từ phần -OR\' của este.'
  },

  // ========== LIPIT - 12 câu ==========
  {
    id: 25,
    category: 'lipid',
    type: 'multiple-choice',
    difficulty: 1,
    question: 'Chất béo là este của...',
    options: ['Glixerol và axit béo', 'Glixerol và axit vô cơ', 'Ancol etylic và axit béo', 'Ancol metylic và axit béo'],
    correctAnswer: 'Glixerol và axit béo',
    explanation: 'Chất béo (triglixerit) là este của glixerol (ancol 3 chức C3H5(OH)3) với các axit béo (axit cacboxylic mạch dài).',
    hint: 'Glixerol có 3 nhóm -OH.'
  },
  {
    id: 26,
    category: 'lipid',
    type: 'multiple-choice',
    difficulty: 1,
    question: 'Axit béo no phổ biến nhất trong mỡ động vật là...',
    options: ['Axit stearic (C17H35COOH)', 'Axit oleic (C17H33COOH)', 'Axit linoleic', 'Axit fomic'],
    correctAnswer: 'Axit stearic (C17H35COOH)',
    explanation: 'Axit stearic C17H35COOH (C18H36O2) là axit béo no, có nhiều trong mỡ động vật, có nhiệt độ nóng chảy cao.',
    hint: 'Axit béo no có công thức CnH2nO2.'
  },
  {
    id: 27,
    category: 'lipid',
    type: 'multiple-choice',
    difficulty: 1,
    question: 'Dầu thực vật ở thể lỏng vì chứa nhiều...',
    options: ['Gốc axit béo không no', 'Gốc axit béo no', 'Glixerol', 'Nước'],
    correctAnswer: 'Gốc axit béo không no',
    explanation: 'Dầu thực vật chứa nhiều gốc axit béo không no (có nối đôi C=C) nên có nhiệt độ nóng chảy thấp, ở thể lỏng ở nhiệt độ thường.',
    hint: 'Nối đôi làm giảm nhiệt độ nóng chảy.'
  },
  {
    id: 28,
    category: 'lipid',
    type: 'fill-blank',
    difficulty: 1,
    question: 'Công thức tổng quát của glixerol là C3H5(OH)___ (điền số)',
    options: [],
    correctAnswer: '3',
    acceptedAnswers: ['3', 'ba'],
    explanation: 'Glixerol (propan-1,2,3-triol) có công thức C3H5(OH)3 với 3 nhóm -OH.',
    hint: 'Glixerol là ancol 3 chức.'
  },
  {
    id: 29,
    category: 'lipid',
    type: 'multiple-choice',
    difficulty: 2,
    question: 'Tristearin có công thức là...',
    options: ['(C17H35COO)3C3H5', '(C17H33COO)3C3H5', '(C15H31COO)3C3H5', '(C17H31COO)3C3H5'],
    correctAnswer: '(C17H35COO)3C3H5',
    explanation: 'Tristearin là trieste của glixerol với axit stearic (C17H35COOH), công thức (C17H35COO)3C3H5.',
    hint: 'Stearin từ axit stearic (no, 18C).'
  },
  {
    id: 30,
    category: 'lipid',
    type: 'multiple-choice',
    difficulty: 2,
    question: 'Chỉ số xà phòng hóa của chất béo là...',
    options: ['Số mg KOH cần để xà phòng hóa 1 gam chất béo', 'Số gam NaOH cần để xà phòng hóa 1 mol chất béo', 'Số ml NaOH 1M cần để xà phòng hóa 1 gam chất béo', 'Số mol KOH cần để xà phòng hóa 1 gam chất béo'],
    correctAnswer: 'Số mg KOH cần để xà phòng hóa 1 gam chất béo',
    explanation: 'Chỉ số xà phòng hóa là số mg KOH cần dùng để xà phòng hóa hoàn toàn 1 gam chất béo.',
    hint: 'Đơn vị là mg KOH/g chất béo.'
  },
  {
    id: 31,
    category: 'lipid',
    type: 'multiple-choice',
    difficulty: 2,
    question: 'Chỉ số iot của chất béo dùng để...',
    options: ['Xác định độ không no của chất béo', 'Xác định độ axit của chất béo', 'Xác định khối lượng phân tử', 'Xác định hàm lượng glixerol'],
    correctAnswer: 'Xác định độ không no của chất béo',
    explanation: 'Chỉ số iot là số gam I2 cộng vào 100 gam chất béo. Chỉ số càng cao, chất béo càng không no (nhiều nối đôi C=C).',
    hint: 'I2 cộng vào nối đôi C=C.'
  },
  {
    id: 32,
    category: 'lipid',
    type: 'fill-blank',
    difficulty: 2,
    question: 'Axit oleic có công thức C17H33COOH, có ___ nối đôi C=C',
    options: [],
    correctAnswer: '1',
    acceptedAnswers: ['1', 'một', 'mot'],
    explanation: 'C17H33COOH so với axit no C17H35COOH thiếu 2H, tương ứng với 1 nối đôi C=C.',
    hint: 'So sánh với axit stearic C17H35COOH.'
  },
  {
    id: 33,
    category: 'lipid',
    type: 'multiple-choice',
    difficulty: 2,
    question: 'Phản ứng hidro hóa dầu thực vật nhằm mục đích...',
    options: ['Chuyển dầu thành mỡ rắn', 'Tăng độ không no', 'Giảm nhiệt độ nóng chảy', 'Tạo glixerol'],
    correctAnswer: 'Chuyển dầu thành mỡ rắn',
    explanation: 'Hidro hóa dầu (cộng H2 vào nối đôi C=C) làm tăng độ no, tăng nhiệt độ nóng chảy, chuyển dầu lỏng thành mỡ rắn.',
    hint: 'H2 cộng vào nối đôi C=C.'
  },
  {
    id: 34,
    category: 'lipid',
    type: 'multiple-choice',
    difficulty: 3,
    question: 'Xà phòng hóa hoàn toàn 89 gam tristearin cần dùng bao nhiêu gam NaOH?',
    options: ['12 gam', '10 gam', '15 gam', '8 gam'],
    correctAnswer: '12 gam',
    explanation: 'M(tristearin) = 890 g/mol. n = 89/890 = 0,1 mol. Cần 3×0,1 = 0,3 mol NaOH = 0,3×40 = 12 gam.',
    hint: '1 mol triglixerit cần 3 mol NaOH.'
  },
  {
    id: 35,
    category: 'lipid',
    type: 'multiple-choice',
    difficulty: 3,
    question: 'Một chất béo có chỉ số axit bằng 7. Để trung hòa 10 gam chất béo cần bao nhiêu gam NaOH?',
    options: ['0,05 gam', '0,07 gam', '0,5 gam', '0,7 gam'],
    correctAnswer: '0,05 gam',
    explanation: 'Chỉ số axit = 7 mg KOH/g chất béo. Với 10g cần 70 mg KOH. mNaOH = 70 × 40/56 = 50 mg = 0,05 gam.',
    hint: 'Chỉ số axit tính theo KOH, cần quy đổi sang NaOH.'
  },
  {
    id: 36,
    category: 'lipid',
    type: 'fill-blank',
    difficulty: 3,
    question: 'Triolein phản ứng với H2 (Ni, t°) theo tỉ lệ mol 1:___ tạo tristearin',
    options: [],
    correctAnswer: '3',
    acceptedAnswers: ['3', 'ba'],
    explanation: 'Triolein có 3 gốc oleic, mỗi gốc có 1 nối đôi C=C. Cần 3 mol H2 để hidro hóa hoàn toàn 1 mol triolein.',
    hint: 'Mỗi nối đôi C=C cần 1 mol H2.'
  },

  // ========== ỨNG DỤNG - 12 câu ==========
  {
    id: 37,
    category: 'applications',
    type: 'multiple-choice',
    difficulty: 1,
    question: 'Xà phòng là muối của...',
    options: ['Axit béo với natri hoặc kali', 'Axit vô cơ với natri', 'Axit hữu cơ nhẹ với natri', 'Kim loại kiềm với axit clohidric'],
    correctAnswer: 'Axit béo với natri hoặc kali',
    explanation: 'Xà phòng là muối natri hoặc kali của axit béo (ví dụ: C17H35COONa - natri stearat). Xà phòng natri cứng hơn xà phòng kali.',
    hint: 'Được tạo từ phản ứng xà phòng hóa.'
  },
  {
    id: 38,
    category: 'applications',
    type: 'multiple-choice',
    difficulty: 1,
    question: 'Etyl axetat được dùng làm...',
    options: ['Dung môi', 'Nhiên liệu', 'Chất bảo quản', 'Phân bón'],
    correctAnswer: 'Dung môi',
    explanation: 'Etyl axetat (CH3COOC2H5) là dung môi phổ biến trong công nghiệp sơn, vecni, keo dán, mỹ phẩm nhờ khả năng hòa tan tốt.',
    hint: 'Este có khả năng hòa tan nhiều chất.'
  },
  {
    id: 39,
    category: 'applications',
    type: 'multiple-choice',
    difficulty: 1,
    question: 'Isoamyl axetat được dùng làm...',
    options: ['Hương liệu (mùi chuối)', 'Nhiên liệu', 'Dung môi công nghiệp', 'Thuốc trừ sâu'],
    correctAnswer: 'Hương liệu (mùi chuối)',
    explanation: 'Isoamyl axetat có mùi thơm đặc trưng của chuối chín, được dùng làm hương liệu trong thực phẩm và mỹ phẩm.',
    hint: 'Còn gọi là "dầu chuối".'
  },
  {
    id: 40,
    category: 'applications',
    type: 'fill-blank',
    difficulty: 1,
    question: 'Xà phòng có tính chất giặt rửa nhờ cấu trúc có đầu ___ nước và đầu kị nước',
    options: [],
    correctAnswer: 'ưa',
    acceptedAnswers: ['ưa', 'ua', 'thích'],
    explanation: 'Xà phòng có cấu trúc lưỡng tính: đầu ưa nước (-COONa) và đuôi kị nước (mạch hidrocacbon dài), giúp hòa tan chất bẩn.',
    hint: 'Một đầu tan trong nước, một đầu tan trong dầu mỡ.'
  },
  {
    id: 41,
    category: 'applications',
    type: 'multiple-choice',
    difficulty: 2,
    question: 'Nhược điểm của xà phòng so với chất tẩy rửa tổng hợp là...',
    options: ['Không dùng được trong nước cứng', 'Độc hại với môi trường', 'Giá thành cao', 'Khó sản xuất'],
    correctAnswer: 'Không dùng được trong nước cứng',
    explanation: 'Trong nước cứng (có Ca2+, Mg2+), xà phòng tạo kết tủa (2RCOONa + Ca2+ → (RCOO)2Ca↓), mất khả năng tẩy rửa.',
    hint: 'Xà phòng tạo kết tủa với ion Ca2+, Mg2+.'
  },
  {
    id: 42,
    category: 'applications',
    type: 'multiple-choice',
    difficulty: 2,
    question: 'Biodiesel được điều chế từ...',
    options: ['Phản ứng của dầu thực vật với metanol', 'Chưng cất dầu mỏ', 'Lên men tinh bột', 'Nhiệt phân than đá'],
    correctAnswer: 'Phản ứng của dầu thực vật với metanol',
    explanation: 'Biodiesel (metyl este của axit béo) được điều chế bằng phản ứng chuyển este hóa dầu thực vật với metanol, xúc tác kiềm.',
    hint: 'Là nhiên liệu sinh học từ dầu thực vật.'
  },
  {
    id: 43,
    category: 'applications',
    type: 'multiple-choice',
    difficulty: 2,
    question: 'Dầu ăn bị ôi do...',
    options: ['Bị oxi hóa bởi oxi không khí', 'Bị thủy phân', 'Bị polime hóa', 'Bị khử'],
    correctAnswer: 'Bị oxi hóa bởi oxi không khí',
    explanation: 'Dầu ăn chứa axit béo không no, nối đôi C=C bị oxi hóa bởi O2 không khí tạo anđehit, xeton có mùi khó chịu (mùi ôi).',
    hint: 'Nối đôi C=C dễ bị oxi hóa.'
  },
  {
    id: 44,
    category: 'applications',
    type: 'fill-blank',
    difficulty: 2,
    question: 'Margarin (bơ thực vật) được sản xuất bằng phản ứng ___ hóa dầu thực vật',
    options: [],
    correctAnswer: 'hidro',
    acceptedAnswers: ['hidro', 'hydrogen', 'H2', 'hyđro'],
    explanation: 'Margarin được sản xuất bằng hidro hóa dầu thực vật (cộng H2 vào nối đôi) để chuyển dầu lỏng thành chất rắn.',
    hint: 'Làm no hóa các nối đôi C=C.'
  },
  {
    id: 45,
    category: 'applications',
    type: 'multiple-choice',
    difficulty: 2,
    question: 'Chất tẩy rửa tổng hợp khác xà phòng ở điểm nào?',
    options: ['Dùng được trong nước cứng', 'Có nguồn gốc tự nhiên', 'Không có tính tẩy rửa', 'Rẻ hơn xà phòng'],
    correctAnswer: 'Dùng được trong nước cứng',
    explanation: 'Chất tẩy rửa tổng hợp (như ankyl benzen sunfonat) không tạo kết tủa với Ca2+, Mg2+ nên dùng được trong nước cứng.',
    hint: 'Không tạo kết tủa với ion Ca2+, Mg2+.'
  },
  {
    id: 46,
    category: 'applications',
    type: 'multiple-choice',
    difficulty: 3,
    question: 'Ưu điểm của biodiesel so với diesel từ dầu mỏ là...',
    options: ['Phân hủy sinh học, ít ô nhiễm', 'Năng lượng cao hơn', 'Giá thành rẻ hơn', 'Dễ bảo quản hơn'],
    correctAnswer: 'Phân hủy sinh học, ít ô nhiễm',
    explanation: 'Biodiesel có nguồn gốc sinh học, có thể tái tạo, phân hủy sinh học được, cháy sạch hơn diesel từ dầu mỏ.',
    hint: 'Nguồn gốc từ thực vật.'
  },
  {
    id: 47,
    category: 'applications',
    type: 'multiple-choice',
    difficulty: 3,
    question: 'Để bảo quản dầu ăn lâu ngày, cần...',
    options: ['Đậy kín, tránh ánh sáng và không khí', 'Để nơi thoáng mát', 'Cho thêm nước', 'Đun sôi định kỳ'],
    correctAnswer: 'Đậy kín, tránh ánh sáng và không khí',
    explanation: 'Dầu ăn bị ôi do oxi hóa, cần bảo quản trong chai kín, tránh ánh sáng và tiếp xúc với không khí để kéo dài thời hạn sử dụng.',
    hint: 'Hạn chế tiếp xúc với O2 và ánh sáng.'
  },
  {
    id: 48,
    category: 'applications',
    type: 'fill-blank',
    difficulty: 3,
    question: 'Công thức tổng quát của chất tẩy rửa tổng hợp dạng ankyl sunfat là R-O-SO3___ (điền nguyên tố)',
    options: [],
    correctAnswer: 'Na',
    acceptedAnswers: ['Na', 'natri', 'sodium'],
    explanation: 'Ankyl sunfat natri (R-O-SO3Na) là chất tẩy rửa tổng hợp phổ biến, ví dụ: natri lauryl sunfat trong dầu gội.',
    hint: 'Muối natri của axit ankyl sunfuric.'
  }
];

// ================== PROGRESS WATERMARK ==================
function ProgressWatermark({ categoryProgress, challenges }) {
  // categoryProgress is an object like { 'este': 75, 'phanung': 90, ... }
  const completedCount = Object.values(categoryProgress).filter(p => p >= 80).length;
  const totalProgress = Object.values(categoryProgress).reduce((sum, p) => sum + p, 0) / CATEGORIES.length;
  
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
          const correctCount = Math.round((percentage / 100) * total);
          return (
            <div key={cat.id} className={`watermark-item ${isComplete ? 'completed' : ''}`}>
              <div className="watermark-icon" style={{ backgroundColor: isComplete ? '#10b981' : percentage > 0 ? cat.color : '#64748b' }}>
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
                  <span className="watermark-count">{correctCount}/{total}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div className="watermark-total">
        <div className="total-label">Tổng tiến độ:</div>
        <div className="total-progress-bar">
          <div className="total-progress-fill" style={{ width: `${Math.round(totalProgress)}%` }} />
        </div>
        <div className="total-stats">
          {completedCount}/{CATEGORIES.length} chủ đề hoàn thành ({Math.round(totalProgress)}%)
        </div>
      </div>
    </div>
  );
}

const Bai01_Este_Lipit = () => {
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
  const [categoryProgress, setCategoryProgress] = useState({}); // { 'este': 75, 'phanung': 90, ... }
  const [highScore, setHighScore] = useState(0);
  const [hasStartedNewGame, setHasStartedNewGame] = useState(false);
  const [gameInProgress, setGameInProgress] = useState(false);
  const [totalCorrectAnswers, setTotalCorrectAnswers] = useState(0);
  const [totalScore, setTotalScore] = useState(0);

  const { hasProgress, savedProgress, saveProgress, clearProgress, completeChallenge } = useChallengeProgress('este_lipit_12', {
    challengeId: 1,
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
    
    // Chỉ cập nhật nếu điểm mới cao hơn điểm cũ
    const oldPercentage = categoryProgress[activeCategory] || 0;
    const newCategoryProgress = percentage > oldPercentage 
      ? { ...categoryProgress, [activeCategory]: percentage }
      : categoryProgress;
    
    const newHighScore = Math.max(highScore, score);
    const newTotalCorrectAnswers = totalCorrectAnswers + categoryCorrectAnswers;
    const newTotalScore = totalScore + score;
    
    // Luôn cập nhật nếu điểm cao hơn
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

    // Chỉ gọi completeChallenge khi hoàn thành TẤT CẢ categories (>=80%)
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
    <div className="este-bg min-h-screen p-4 md:p-8 font-sans">
      <div className="max-w-6xl mx-auto">
        {/* HEADER */}
        <header className="flex items-center justify-between mb-8 bg-white/10 backdrop-blur rounded-2xl p-4 border border-white/20">
          <div className="flex items-center gap-4">
            <Link to="/hoahoc/12" className="p-2 hover:bg-white/10 rounded-full transition-colors text-white">
              <ArrowLeft className="w-6 h-6" />
            </Link>
            <div>
              <h1 className="text-2xl font-bold text-white">
                Este - Lipit
              </h1>
              <p className="text-blue-200 text-sm">Hóa học 12 • Chương 1</p>
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
            <div className="stats-bar-este mb-8">
              <div className="stat-item-este">
                <CheckCircle2 className="w-5 h-5 text-green-400" />
                <span>Đã hoàn thành: <strong>{Object.values(categoryProgress).filter(p => p >= 80).length}/{CATEGORIES.length}</strong></span>
              </div>
              <div className="stat-item-este">
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

            <div className="category-grid-este">
              {CATEGORIES.map((cat) => {
                const Icon = cat.icon;
                const catPercentage = categoryProgress[cat.id] || 0;
                const isCompleted = catPercentage >= 80;
                
                return (
                  <div 
                    key={cat.id}
                    onClick={() => handleCategorySelect(cat.id)}
                    className="category-card-este group"
                  >
                    <div className={`category-icon-wrapper-este ${isCompleted ? 'bg-green-500/20 text-green-400' : catPercentage > 0 ? 'bg-blue-500/20 text-blue-400' : ''}`}>
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
                        {catPercentage > 0 && (
                          <span className={`text-xs font-bold px-2 py-1 rounded ${isCompleted ? 'bg-green-500/20 text-green-400' : 'bg-blue-500/20 text-blue-400'}`}>
                            {catPercentage}%
                          </span>
                        )}
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

            <div className="progress-track-este mb-6">
              <div 
                className="progress-fill-este"
                style={{ width: `${((currentQuestionIndex) / filteredQuestions.length) * 100}%` }}
              />
            </div>

            <div className="question-card-este">
              <div className="question-header-este">
                <span className={`difficulty-badge-este ${
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
                <div className="options-grid-este">
                  {currentQuestion.options.map((option, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleAnswerSubmit(option)}
                      disabled={isCorrect !== null}
                      className={`option-btn-este ${
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
                <div className={`feedback-container-este ${isCorrect ? 'feedback-correct' : 'feedback-wrong'}`}>
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

export default Bai01_Este_Lipit;
