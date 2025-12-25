import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowLeft, Trophy, RotateCcw, ChevronRight,
  CheckCircle2, XCircle, Lightbulb, Zap, Award,
  FlaskConical, Droplets, Globe, Shield, Atom,
  Clock, Target, AlertTriangle, Flame, Beaker,
  RefreshCw, Sparkles, Loader2, WifiOff
} from 'lucide-react';
import useChallengeProgress from '../../../../hooks/useChallengeProgress';
import { useAIQuestions } from '../../../../hooks/useAIQuestions';
import ResumeDialog from '../../../../components/ResumeDialog';
import './CSS/Bai07_KimLoaiKiem_KiemTho_Nhom.css';

const CATEGORIES = [
  { id: 'kiem', name: '🔥 Kim loại Kiềm', icon: Flame, color: '#8b5cf6', description: 'Nhóm IA: Li, Na, K, Rb, Cs - Tính chất và ứng dụng', bgGradient: 'from-violet-600 to-indigo-600', emoji: '💥' },
  { id: 'kiemtho', name: '🧱 Kim loại Kiềm thổ', icon: Shield, color: '#ec4899', description: 'Nhóm IIA: Be, Mg, Ca, Sr, Ba - Tính chất và hợp chất', bgGradient: 'from-pink-600 to-rose-500', emoji: '🏗️' },
  { id: 'nhom', name: '✈️ Nhôm & Hợp chất', icon: Globe, color: '#3b82f6', description: 'Nhôm, Al2O3, Al(OH)3, Phèn chua và phản ứng nhiệt nhôm', bgGradient: 'from-blue-600 to-cyan-500', emoji: '🥫' },
  { id: 'nuoc', name: '💧 Nước cứng & Nhận biết', icon: Droplets, color: '#10b981', description: 'Phân loại, làm mềm nước cứng và nhận biết ion kim loại', bgGradient: 'from-emerald-600 to-teal-500', emoji: '🚿' }
];

// Fallback questions khi không có AI
const FALLBACK_CHALLENGES = [
  // ===== KIM LOẠI KIỀM (12 câu) =====
  { id: 1, category: 'kiem', type: 'multiple-choice', difficulty:1, question: 'Kim loại kiềm thuộc nhóm nào trong bảng tuần hoàn?', options: ['Nhóm IA', 'Nhóm IIA', 'Nhóm IIIA', 'Nhóm VIIA'], correctAnswer: 'Nhóm IA', explanation: 'Kim loại kiềm gồm Li, Na, K, Rb, Cs, Fr thuộc nhóm IA.', hint: 'Nhóm 1'},
  { id: 2, category: 'kiem', type: 'multiple-choice', difficulty:1, question: 'Cấu hình electron lớp ngoài cùng của kim loại kiềm là?', options: ['ns1', 'ns2', 'ns2np1', 'ns2np5'], correctAnswer: 'ns1', explanation: 'Kim loại kiềm có 1 electron ở lớp ngoài cùng (ns1).', hint: '1 electron hóa trị'},
  { id: 3, category: 'kiem', type: 'multiple-choice', difficulty:2, question: 'Để bảo quản Natri (Na), người ta ngâm nó trong?', options: ['Dầu hỏa', 'Nước', 'Rượu', 'Giấm'], correctAnswer: 'Dầu hỏa', explanation: 'Na phản ứng mãnh liệt với nước và oxi không khí, nên bảo quản trong dầu hỏa.', hint: 'Chất lỏng không chứa oxi/nước'},
  { id: 4, category: 'kiem', type: 'fill-blank', difficulty:2, question: 'Khi đốt cháy, Natri cho ngọn lửa màu ___', correctAnswer: 'vàng', acceptedAnswers:['vàng','màu vàng'], explanation: 'Ion Na+ khi bị kích thích nhiệt phát ra ánh sáng màu vàng đặc trưng.', hint: 'Màu của đèn đường'},
  { id: 5, category: 'kiem', type: 'multiple-choice', difficulty:2, question: 'Phương pháp duy nhất để điều chế kim loại kiềm là?', options: ['Điện phân nóng chảy muối halogenua', 'Điện phân dung dịch', 'Nhiệt luyện', 'Thủy luyện'], correctAnswer: 'Điện phân nóng chảy muối halogenua', explanation: 'Do tính khử rất mạnh, kim loại kiềm chỉ được điều chế bằng cách điện phân nóng chảy muối của chúng.', hint: 'Không có nước'},
  { id: 6, category: 'kiem', type: 'multiple-choice', difficulty:3, question: 'Kim loại nào sau đây được dùng trong tế bào quang điện?', options: ['Cs (Xesi)', 'Li (Liti)', 'Na (Natri)', 'K (Kali)'], correctAnswer: 'Cs (Xesi)', explanation: 'Xesi có năng lượng ion hóa thấp nhất, dễ mất electron dưới tác dụng của ánh sáng.', hint: 'Kim loại kiềm nặng nhất ổn định'},
  { id: 7, category: 'kiem', type: 'fill-blank', difficulty:2, question: 'Công thức của xút ăn da là ___', correctAnswer: 'NaOH', acceptedAnswers:['NaOH','Natri hidroxit'], explanation: 'NaOH (Natri hidroxit) được gọi là xút ăn da.', hint: 'Bazơ mạnh của Na'},
  { id: 8, category: 'kiem', type: 'multiple-choice', difficulty:2, question: 'Dung dịch Na2CO3 có môi trường gì?', options: ['Kiềm (Bazơ)', 'Axit', 'Trung tính', 'Lưỡng tính'], correctAnswer: 'Kiềm (Bazơ)', explanation: 'Na2CO3 là muối của axit yếu và bazơ mạnh, thủy phân tạo môi trường kiềm (pH > 7).', hint: 'Muối soda'},
  { id: 9, category: 'kiem', type: 'multiple-choice', difficulty:3, question: 'Phản ứng nào sau đây KHÔNG xảy ra?', options: ['Na + MgCl2 (dd) → NaCl + Mg', 'Na + H2O → NaOH + 1/2H2', '2Na + Cl2 → 2NaCl', '4Na + O2 → 2Na2O'], correctAnswer: 'Na + MgCl2 (dd) → NaCl + Mg', explanation: 'Trong dung dịch, Na phản ứng với nước trước: Na + H2O → NaOH + H2, sau đó NaOH + MgCl2 → Mg(OH)2 + NaCl.', hint: 'Na gặp nước trước'},
  { id: 10, category: 'kiem', type: 'fill-blank', difficulty:3, question: 'Baking soda (thuốc muối) dùng làm bột nở có công thức là ___', correctAnswer: 'NaHCO3', acceptedAnswers:['NaHCO3','Natri hidrocacbonat'], explanation: 'NaHCO3 bị nhiệt phân tạo CO2 giúp bánh nở xốp.', hint: 'Muối axit của Na'},
  { id: 11, category: 'kiem', type: 'multiple-choice', difficulty:2, question: 'Kim loại kiềm có mạng tinh thể gì?', options: ['Lập phương tâm khối', 'Lập phương tâm diện', 'Lục phương', 'Tứ diện'], correctAnswer: 'Lập phương tâm khối', explanation: 'Các kim loại kiềm đều có mạng tinh thể lập phương tâm khối (rỗng), nên khối lượng riêng nhỏ.', hint: 'Kém đặc khít'},
  { id: 12, category: 'kiem', type: 'multiple-choice', difficulty:3, question: 'Hợp chất nào của Kali được dùng làm phân bón (phân đạm)?', options: ['KNO3', 'KCl', 'K2CO3', 'K2SO4'], correctAnswer: 'KNO3', explanation: 'KNO3 chứa cả K và N, là phân bón kép (vừa là đạm vừa là kali).', hint: 'Diêm tiêu'},

  // ===== KIM LOẠI KIỀM THỔ (12 câu) =====
  { id: 13, category: 'kiemtho', type: 'multiple-choice', difficulty:1, question: 'Kim loại kiềm thổ có hóa trị mấy trong hợp chất?', options: ['II', 'I', 'III', 'IV'], correctAnswer: 'II', explanation: 'Kim loại kiềm thổ (Nhóm IIA) luôn có số oxi hóa +2 trong hợp chất.', hint: 'Nhóm 2'},
  { id: 14, category: 'kiemtho', type: 'multiple-choice', difficulty:2, question: 'Kim loại nào sau đây KHÔNG tác dụng với nước ở nhiệt độ thường?', options: ['Be và Mg', 'Ca', 'Sr', 'Ba'], correctAnswer: 'Be và Mg', explanation: 'Be không tác dụng với nước; Mg phản ứng chậm với nước nóng; Ca, Sr, Ba phản ứng mạnh ở nhiệt độ thường.', hint: 'Hai kim loại đầu nhóm'},
  { id: 15, category: 'kiemtho', type: 'fill-blank', difficulty:2, question: 'Thạch cao nung dùng để nặn tượng, bó bột có công thức là CaSO4.___H2O', correctAnswer: '1', acceptedAnswers:['1','0.5','0,5'], explanation: 'Thạch cao nung là CaSO4.H2O (hoặc CaSO4.0,5H2O). Thạch cao sống là CaSO4.2H2O.', hint: 'Mất bớt nước'},
  { id: 16, category: 'kiemtho', type: 'multiple-choice', difficulty:2, question: 'Vôi tôi là tên gọi của chất nào?', options: ['Ca(OH)2', 'CaO', 'CaCO3', 'CaSO4'], correctAnswer: 'Ca(OH)2', explanation: 'CaO là vôi sống, Ca(OH)2 là vôi tôi, CaCO3 là đá vôi.', hint: 'Canxi hidroxit'},
  { id: 17, category: 'kiemtho', type: 'multiple-choice', difficulty:3, question: 'Để dập tắt đám cháy Magie (Mg), ta có thể dùng?', options: ['Cát khô', 'Nước', 'Bình khí CO2', 'Bình bọt'], correctAnswer: 'Cát khô', explanation: 'Mg cháy được trong CO2 và phản ứng với nước nóng, nên chỉ dùng cát khô để dập.', hint: 'Mg khử được CO2'},
  { id: 18, category: 'kiemtho', type: 'fill-blank', difficulty:2, question: 'Đá vôi có thành phần chính là ___ (công thức)', correctAnswer: 'CaCO3', acceptedAnswers:['CaCO3','canxi cacbonat'], explanation: 'CaCO3 là thành phần chính của đá vôi, đá phấn, đá hoa.', hint: 'Canxi cacbonat'},
  { id: 19, category: 'kiemtho', type: 'multiple-choice', difficulty:3, question: 'Hiện tượng tạo thạch nhũ trong hang động là do phản ứng nào?', options: ['Ca(HCO3)2 → CaCO3 + CO2 + H2O', 'CaCO3 + CO2 + H2O → Ca(HCO3)2', 'CaO + CO2 → CaCO3', 'Ca(OH)2 + CO2 → CaCO3 + H2O'], correctAnswer: 'Ca(HCO3)2 → CaCO3 + CO2 + H2O', explanation: 'Phản ứng phân hủy Ca(HCO3)2 tạo lại kết tủa CaCO3 bồi tụ thành thạch nhũ.', hint: 'Kết tủa lại'},
  { id: 20, category: 'kiemtho', type: 'multiple-choice', difficulty:2, question: 'Kim loại kiềm thổ nào cháy cho ngọn lửa màu đỏ cam?', options: ['Ca (Canxi)', 'Ba (Bari)', 'Mg (Magie)', 'Sr (Stronti)'], correctAnswer: 'Ca (Canxi)', explanation: 'Ca cháy cho màu đỏ cam (hoặc đỏ gạch), Ba màu lục, Sr màu đỏ son.', hint: 'Màu của Canxi'},
  { id: 21, category: 'kiemtho', type: 'fill-blank', difficulty:3, question: 'Quặng dolomit có công thức là CaCO3.___', correctAnswer: 'MgCO3', acceptedAnswers:['MgCO3'], explanation: 'Dolomit là muối kép CaCO3.MgCO3.', hint: 'Muối cacbonat của Mg'},
  { id: 22, category: 'kiemtho', type: 'multiple-choice', difficulty:2, question: 'Chất nào dùng để khử chua đất trồng?', options: ['Vôi sống (CaO)', 'Thạch cao', 'Muối ăn', 'Phèn chua'], correctAnswer: 'Vôi sống (CaO)', explanation: 'Vôi sống (CaO) hoặc vôi tôi (Ca(OH)2) phản ứng với axit trong đất, làm tăng pH.', hint: 'Vôi'},
  { id: 23, category: 'kiemtho', type: 'multiple-choice', difficulty:3, question: 'Trong nhóm IIA, theo chiều tăng điện tích hạt nhân, tính khử biến đổi thế nào?', options: ['Tăng dần', 'Giảm dần', 'Không đổi', 'Tăng rồi giảm'], correctAnswer: 'Tăng dần', explanation: 'Bán kính nguyên tử tăng, năng lượng ion hóa giảm => tính khử tăng dần từ Be đến Ba.', hint: 'Dễ mất e hơn'},
  { id: 24, category: 'kiemtho', type: 'multiple-choice', difficulty:2, question: 'Nước vôi trong là dung dịch của chất nào?', options: ['Ca(OH)2', 'Ca(HCO3)2', 'CaCl2', 'CaCO3'], correctAnswer: 'Ca(OH)2', explanation: 'Dung dịch Ca(OH)2 trong suốt gọi là nước vôi trong.', hint: 'Bazơ tan của Ca'},

  // ===== NHÔM & HỢP CHẤT (12 câu) =====
  { id: 25, category: 'nhom', type: 'multiple-choice', difficulty:1, question: 'Nhôm (Al) thuộc nhóm nào?', options: ['IIIA', 'IA', 'IIA', 'IVA'], correctAnswer: 'IIIA', explanation: 'Nhôm có cấu hình [Ne]3s2 3p1, thuộc nhóm IIIA.', hint: 'Hóa trị III'},
  { id: 26, category: 'nhom', type: 'multiple-choice', difficulty:2, question: 'Nhôm bền trong không khí và nước là do?', options: ['Có lớp màng oxit Al2O3 bền bảo vệ', 'Nhôm là kim loại quý', 'Nhôm không tác dụng với oxi', 'Nhôm không tác dụng với nước'], correctAnswer: 'Có lớp màng oxit Al2O3 bền bảo vệ', explanation: 'Lớp màng oxit mỏng, mịn, bền chắc ngăn cản nhôm tiếp xúc với môi trường.', hint: 'Lớp áo giáp'},
  { id: 27, category: 'nhom', type: 'fill-blank', difficulty:2, question: 'Quặng chính để sản xuất nhôm là ___', correctAnswer: 'bauxite', acceptedAnswers:['bauxite','boxit','quặng boxit'], explanation: 'Quặng bauxite chứa chủ yếu Al2O3.2H2O.', hint: 'Boxit'},
  { id: 28, category: 'nhom', type: 'multiple-choice', difficulty:3, question: 'Phản ứng nhiệt nhôm là phản ứng của Al với?', options: ['Oxit kim loại (như Fe2O3)', 'Axit', 'Bazơ', 'Muối'], correctAnswer: 'Oxit kim loại (như Fe2O3)', explanation: 'Al khử oxit kim loại yếu hơn ở nhiệt độ cao, tỏa nhiều nhiệt.', hint: 'Hàn đường ray'},
  { id: 29, category: 'nhom', type: 'multiple-choice', difficulty:2, question: 'Chất nào sau đây có tính lưỡng tính?', options: ['Al2O3 và Al(OH)3', 'Al và Al2O3', 'AlCl3', 'NaAlO2'], correctAnswer: 'Al2O3 và Al(OH)3', explanation: 'Al2O3 và Al(OH)3 vừa tác dụng với axit mạnh, vừa tác dụng với bazơ mạnh.', hint: 'Oxit và hidroxit'},
  { id: 30, category: 'nhom', type: 'fill-blank', difficulty:3, question: 'Phèn chua có công thức thu gọn là KAl(SO4)2.___H2O', correctAnswer: '12', acceptedAnswers:['12'], explanation: 'Phèn chua: K2SO4.Al2(SO4)3.24H2O hay thu gọn là KAl(SO4)2.12H2O.', hint: 'Ngậm 12 nước'},
  { id: 31, category: 'nhom', type: 'multiple-choice', difficulty:2, question: 'Nhôm KHÔNG tan trong dung dịch nào?', options: ['HNO3 đặc nguội', 'HCl', 'NaOH', 'H2SO4 loãng'], correctAnswer: 'HNO3 đặc nguội', explanation: 'Al (và Fe, Cr) bị thụ động hóa trong HNO3 đặc nguội và H2SO4 đặc nguội.', hint: 'Thụ động hóa'},
  { id: 32, category: 'nhom', type: 'multiple-choice', difficulty:3, question: 'Để điều chế nhôm, người ta điện phân nóng chảy Al2O3 với chất xúc tác nào?', options: ['Criolit (Na3AlF6)', 'NaCl', 'CaCl2', 'Than cốc'], correctAnswer: 'Criolit (Na3AlF6)', explanation: 'Criolit giúp hạ nhiệt độ nóng chảy của Al2O3 từ 2050°C xuống ~900°C và tăng độ dẫn điện.', hint: 'Na3AlF6'},
  { id: 33, category: 'nhom', type: 'fill-blank', difficulty:2, question: 'Dung dịch muối NaAlO2 có môi trường ___', correctAnswer: 'kiềm', acceptedAnswers:['kiềm','bazơ'], explanation: 'AlO2- thủy phân tạo môi trường kiềm: AlO2- + 2H2O ⇌ Al(OH)3 + OH-.', hint: 'pH > 7'},
  { id: 34, category: 'nhom', type: 'multiple-choice', difficulty:3, question: 'Hiện tượng khi nhỏ từ từ dung dịch NaOH đến dư vào dung dịch AlCl3?', options: ['Xuất hiện kết tủa trắng keo, sau đó kết tủa tan', 'Kết tủa trắng keo không tan', 'Không có hiện tượng', 'Sủi bọt khí'], correctAnswer: 'Xuất hiện kết tủa trắng keo, sau đó kết tủa tan', explanation: 'Al3+ + 3OH- → Al(OH)3↓; Al(OH)3 + OH- → AlO2- + 2H2O.', hint: 'Lưỡng tính tan trong kiềm dư'},
  { id: 35, category: 'nhom', type: 'multiple-choice', difficulty:2, question: 'Hợp kim Đuyra (Duralumin) gồm Al và?', options: ['Cu, Mg, Mn', 'Fe, C', 'Zn, Sn', 'Pb'], correctAnswer: 'Cu, Mg, Mn', explanation: 'Đuyra nhẹ và bền, dùng trong công nghiệp hàng không.', hint: 'Hợp kim máy bay'},
  { id: 36, category: 'nhom', type: 'multiple-choice', difficulty:3, question: 'Phèn chua được dùng để làm gì?', options: ['Làm trong nước đục', 'Sát trùng', 'Làm gia vị', 'Tẩy trắng'], correctAnswer: 'Làm trong nước đục', explanation: 'Al3+ thủy phân tạo Al(OH)3 dạng keo kéo theo chất bẩn lắng xuống.', hint: 'Lắng tụ chất bẩn'},

  // ===== NƯỚC CỨNG & NHẬN BIẾT (12 câu) =====
  { id: 37, category: 'nuoc', type: 'multiple-choice', difficulty:1, question: 'Nước cứng là nước chứa nhiều ion nào?', options: ['Ca2+, Mg2+', 'Na+, K+', 'Fe2+, Fe3+', 'Al3+, Zn2+'], correctAnswer: 'Ca2+, Mg2+', explanation: 'Nước cứng chứa hàm lượng cao ion Ca2+ và Mg2+.', hint: 'Canxi và Magie'},
  { id: 38, category: 'nuoc', type: 'multiple-choice', difficulty:2, question: 'Nước cứng tạm thời chứa các anion nào?', options: ['HCO3-', 'Cl-, SO4 2-', 'NO3-', 'PO4 3-'], correctAnswer: 'HCO3-', explanation: 'Nước cứng tạm thời chứa muối Ca(HCO3)2, Mg(HCO3)2.', hint: 'Hidrocacbonat'},
  { id: 39, category: 'nuoc', type: 'multiple-choice', difficulty:2, question: 'Cách đơn giản nhất để làm mềm nước cứng tạm thời là?', options: ['Đun sôi', 'Dùng giấm', 'Dùng muối ăn', 'Lọc'], correctAnswer: 'Đun sôi', explanation: 'Đun sôi làm phân hủy hidrocacbonat thành kết tủa cacbonat, loại bỏ Ca2+, Mg2+.', hint: 'Nhiệt phân'},
  { id: 40, category: 'nuoc', type: 'fill-blank', difficulty:3, question: 'Chất làm mềm nước cứng vĩnh cửu và toàn phần phổ biến là Na2CO3 và ___', correctAnswer: 'Na3PO4', acceptedAnswers:['Na3PO4','natri photphat'], explanation: 'Na2CO3 và Na3PO4 tạo kết tủa với Ca2+, Mg2+.', hint: 'Muối photphat'},
  { id: 41, category: 'nuoc', type: 'multiple-choice', difficulty:2, question: 'Thuốc thử để nhận biết ion Ba2+ là?', options: ['Dung dịch H2SO4 (tạo kết tủa trắng)', 'Dung dịch NaOH', 'Dung dịch HCl', 'Quỳ tím'], correctAnswer: 'Dung dịch H2SO4 (tạo kết tủa trắng)', explanation: 'Ba2+ + SO4 2- → BaSO4↓ (trắng, không tan trong axit).', hint: 'Tạo BaSO4'},
  { id: 42, category: 'nuoc', type: 'multiple-choice', difficulty:3, question: 'Để phân biệt 3 chất rắn: Mg, Al, Al2O3 chỉ dùng một thuốc thử là?', options: ['Dung dịch KOH', 'Dung dịch HCl', 'Nước', 'Dung dịch NaCl'], correctAnswer: 'Dung dịch KOH', explanation: 'Mg không tan; Al tan sủi bọt khí; Al2O3 tan không sủi bọt khí.', hint: 'Kiềm'},
  { id: 43, category: 'nuoc', type: 'fill-blank', difficulty:2, question: 'Hiện tượng xâm thực của nước mưa vào đá vôi tạo thành hang động là do phản ứng hòa tan ___', correctAnswer: 'CaCO3', acceptedAnswers:['CaCO3','đá vôi'], explanation: 'CaCO3 + CO2 + H2O → Ca(HCO3)2 (tan).', hint: 'Đá vôi'},
  { id: 44, category: 'nuoc', type: 'multiple-choice', difficulty:3, question: 'Dung dịch nào sau đây làm quỳ tím hóa xanh?', options: ['NaAlO2', 'AlCl3', 'MgCl2', 'NaCl'], correctAnswer: 'NaAlO2', explanation: 'NaAlO2 thủy phân tạo môi trường kiềm mạnh. AlCl3 tạo môi trường axit.', hint: 'Muối của bazơ mạnh axit yếu'},
  { id: 45, category: 'nuoc', type: 'multiple-choice', difficulty:2, question: 'Tác hại của nước cứng là?', options: ['Làm tốn xà phòng, đóng cặn nồi hơi', 'Gây ngộ độc', 'Làm nước có mùi hôi', 'Làm nước bị đục'], correctAnswer: 'Làm tốn xà phòng, đóng cặn nồi hơi', explanation: 'Nước cứng tạo kết tủa với xà phòng và đóng cặn CaCO3 khi đun nóng.', hint: 'Tắc ống nước'},
  { id: 46, category: 'nuoc', type: 'multiple-choice', difficulty:3, question: 'Để nhận biết ion Al3+ trong dung dịch, ta dùng?', options: ['Dung dịch NaOH dư (kết tủa rồi tan)', 'Dung dịch NH3 dư (kết tủa không tan)', 'Dung dịch HCl', 'Dung dịch BaCl2'], correctAnswer: 'Dung dịch NaOH dư (kết tủa rồi tan)', explanation: 'Al3+ tạo kết tủa keo trắng với OH-, tan trong OH- dư. (NH3 dư không hòa tan được Al(OH)3).', hint: 'Lưỡng tính'},
  { id: 47, category: 'nuoc', type: 'fill-blank', difficulty:2, question: 'Nước cứng vĩnh cửu chứa các ion âm là Cl- và ___', correctAnswer: 'SO4 2-', acceptedAnswers:['SO4 2-','SO4','sunfat'], explanation: 'Nước cứng vĩnh cửu chứa muối clorua và sunfat của Ca, Mg.', hint: 'Gốc axit mạnh'},
  { id: 48, category: 'nuoc', type: 'multiple-choice', difficulty:3, question: 'Sục khí CO2 đến dư vào dung dịch NaAlO2, hiện tượng là?', options: ['Xuất hiện kết tủa trắng keo không tan', 'Kết tủa trắng rồi tan', 'Không hiện tượng', 'Dung dịch chuyển màu'], correctAnswer: 'Xuất hiện kết tủa trắng keo không tan', explanation: 'NaAlO2 + CO2 + H2O → Al(OH)3↓ + NaHCO3. Al(OH)3 không tan trong H2CO3 (axit yếu).', hint: 'Axit yếu đẩy axit yếu hơn'}
];

// Hằng số cấu hình game
const GAME_CONFIG = {
  BASE_POINTS: 10,           // Điểm cơ bản
  DIFFICULTY_MULTIPLIER: 5,   // Nhân với độ khó (1-3)
  TIME_BONUS_FACTOR: 0.5,     // Hệ số bonus thời gian
  STREAK_BONUS: 5,            // Điểm bonus mỗi streak
  MAX_STREAK_BONUS: 50,       // Giới hạn bonus streak
  TIME_PER_QUESTION: {        // Thời gian theo độ khó
    1: 25,  // Dễ: 25 giây
    2: 35,  // Trung bình: 35 giây  
    3: 45   // Khó: 45 giây
  },
  PASS_PERCENTAGE: 70         // % để pass chủ đề
};

// ================== PROGRESS WATERMARK ==================
function ProgressWatermark({ categoryProgress }) {
  const completedCount = Object.values(categoryProgress).filter(p => p >= 80).length;
  const totalProgress = CATEGORIES.length > 0 ? Math.round((Object.values(categoryProgress).reduce((sum, p) => sum + p, 0) / (CATEGORIES.length * 100)) * 100) : 0;
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
          return (
            <div key={cat.id} className={`watermark-item ${isComplete ? 'completed' : percentage > 0 ? 'in-progress' : ''}`}>
              <div className="watermark-icon" style={{ backgroundColor: isComplete ? '#10b981' : percentage > 0 ? '#f59e0b' : cat.color }}>
                <Icon className="w-4 h-4 text-white" />
                {isComplete && <div className="complete-badge">✓</div>}
              </div>
              <div className="watermark-info">
                <div className="watermark-name">{cat.name}</div>
                <div className="watermark-progress-bar">
                  <div className="watermark-progress-fill" style={{ width: `${percentage}%`, backgroundColor: isComplete ? '#10b981' : percentage > 0 ? '#f59e0b' : cat.color }} />
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
          <div className="total-progress-fill" style={{ width: `${totalProgress}%` }} />
        </div>
        <div className="total-stats">
          {completedCount}/{CATEGORIES.length} chủ đề ({totalProgress}%)
        </div>
      </div>
    </div>
  );
}

const Bai07_KimLoaiKiem_KiemTho_Nhom = () => {
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
  const [totalCorrect, setTotalCorrect] = useState(0);
  const [bonusPoints, setBonusPoints] = useState(0);
  const [showBonusAnimation, setShowBonusAnimation] = useState(false);
  const [hasStartedNewGame, setHasStartedNewGame] = useState(false);
  const [gameInProgress, setGameInProgress] = useState(false);
  const [totalCorrectAnswers, setTotalCorrectAnswers] = useState(0);
  const [totalScore, setTotalScore] = useState(0);

  // ========== AI QUESTIONS HOOK ==========
  const { 
    questions: aiQuestions, 
    loading: aiLoading, 
    error: aiError, 
    refetch: refetchAI,
    clearCache: clearAICache 
  } = useAIQuestions('kim_loai_kiem_kiem_tho_nhom_12', { autoFetch: true, useCache: true });

  const CHALLENGES = useMemo(() => {
    if (aiQuestions && aiQuestions.length > 0) return aiQuestions;
    return FALLBACK_CHALLENGES;
  }, [aiQuestions]);

  const isUsingAI = aiQuestions && aiQuestions.length > 0;

  const { hasProgress, savedProgress, saveProgress, clearProgress, completeChallenge } = useChallengeProgress('kiem_kiemtho_nhom_12', { challengeId: 7, programId: 'chemistry', grade: 12 });

  // States for completion tracking
  const [startTime] = useState(() => Date.now());
  const [isCompleted, setIsCompleted] = useState(false);

  const filteredQuestions = activeCategory ? CHALLENGES.filter(q => q.category === activeCategory) : [];
  const currentQuestion = filteredQuestions[currentQuestionIndex];

  useEffect(() => {
    if (savedProgress && !hasStartedNewGame && !gameInProgress) {
      if (savedProgress.savedCategoryProgress) setCategoryProgress(savedProgress.savedCategoryProgress);
      if (savedProgress.savedHighScore) setHighScore(savedProgress.savedHighScore);
      if (savedProgress.savedTotalCorrectAnswers) setTotalCorrectAnswers(savedProgress.savedTotalCorrectAnswers);
      if (savedProgress.savedTotalScore) setTotalScore(savedProgress.savedTotalScore);
      if (savedProgress.category && !showResult && !activeCategory) setShowResumeDialog(true);
    }
  }, [savedProgress, showResult, activeCategory, hasStartedNewGame, gameInProgress]);

  const handleResume = () => {
    if (savedProgress) {
      const { category, index, currentScore, currentStreak, savedCategoryProgress, savedHighScore, savedTotalCorrectAnswers, savedTotalScore, totalCorrect: savedTotalCorrect } = savedProgress;
      setActiveCategory(category); setCurrentQuestionIndex(index || 0); setScore(currentScore || 0); setStreak(currentStreak || 0); setCategoryProgress(savedCategoryProgress || {}); setHighScore(savedHighScore || 0); setTotalCorrectAnswers(savedTotalCorrectAnswers || 0); setTotalScore(savedTotalScore || 0); setTotalCorrect(savedTotalCorrect || 0); setShowResumeDialog(false); setIsTimerActive(true); setGameInProgress(true);
    }
  };

  const resetGame = () => { clearProgress(); setActiveCategory(null); setCurrentQuestionIndex(0); setScore(0); setShowResult(false); setSelectedAnswer(''); setIsCorrect(null); setStreak(0); setShowExplanation(false); setTimeLeft(30); setIsTimerActive(false); setTotalCorrect(0); setBonusPoints(0); setHasStartedNewGame(true); setTotalCorrectAnswers(0); setTotalScore(0); setCategoryProgress({}); setIsCompleted(false); setGameInProgress(false); };
  const handleRestart = () => { setShowResumeDialog(false); clearProgress(); resetGame(); };

  // Hàm tính điểm cải tiến - giới hạn tối đa 20 điểm/câu
  const calculatePoints = (difficulty, timeRemaining, currentStreak) => {
    const basePoints = GAME_CONFIG.BASE_POINTS + (difficulty * GAME_CONFIG.DIFFICULTY_MULTIPLIER);
    const timeBonus = Math.round(timeRemaining * GAME_CONFIG.TIME_BONUS_FACTOR);
    const streakBonus = Math.min(currentStreak * GAME_CONFIG.STREAK_BONUS, GAME_CONFIG.MAX_STREAK_BONUS);
    const total = Math.min(20, basePoints + timeBonus + streakBonus); // Cap at 20
    return { basePoints, timeBonus, streakBonus, total };
  };

  // Lấy thời gian theo độ khó của câu hỏi
  const getTimeForQuestion = (difficulty) => {
    return GAME_CONFIG.TIME_PER_QUESTION[difficulty] || 30;
  };

  useEffect(() => { let timer; if (isTimerActive && timeLeft > 0 && !showResult && !isCorrect && activeCategory) { timer = setInterval(() => { setTimeLeft(prev => { if (prev <= 1) { setIsCorrect(false); setShowExplanation(true); setStreak(0); setIsTimerActive(false); return 0; } return prev - 1; }); }, 1000); } return () => clearInterval(timer); }, [isTimerActive, timeLeft, showResult, isCorrect, activeCategory]);

  const handleCategorySelect = (categoryId) => { 
    const questions = CHALLENGES.filter(q => q.category === categoryId);
    const firstQuestion = questions[0];
    const initialTime = getTimeForQuestion(firstQuestion?.difficulty || 2);
    setActiveCategory(categoryId); 
    setCurrentQuestionIndex(0); 
    setScore(0); 
    setShowResult(false); 
    setStreak(0); 
    setTimeLeft(initialTime); 
    setIsTimerActive(true); 
    setTotalCorrect(0);
    setBonusPoints(0);
    setGameInProgress(true);
  };

  const handleAnswerSubmit = (answer) => {
    if (isCorrect !== null) return;
    const isRight = answer.toLowerCase().trim() === currentQuestion.correctAnswer.toLowerCase().trim() || 
      (currentQuestion.acceptedAnswers && currentQuestion.acceptedAnswers.some(a => a.toLowerCase().trim() === answer.toLowerCase().trim()));
    
    setSelectedAnswer(answer); 
    setIsCorrect(isRight); 
    setShowExplanation(true); 
    setIsTimerActive(false);
    
    if (isRight) { 
      const pointsData = calculatePoints(currentQuestion.difficulty, timeLeft, streak);
      setScore(prev => prev + pointsData.total); 
      setStreak(prev => prev + 1); 
      setTotalCorrect(prev => prev + 1);
      setBonusPoints(pointsData.timeBonus + pointsData.streakBonus);
      setShowBonusAnimation(true);
      setTimeout(() => setShowBonusAnimation(false), 800);
    } else {
      setStreak(0);
      setBonusPoints(0);
    }
    
    saveProgress({ 
      category: activeCategory, 
      index: currentQuestionIndex, 
      currentScore: score + (isRight ? calculatePoints(currentQuestion.difficulty, timeLeft, streak).total : 0), 
      currentStreak: isRight ? streak + 1 : 0, 
      savedCategoryProgress: categoryProgress, 
      savedHighScore: highScore,
      totalCorrect: totalCorrect + (isRight ? 1 : 0),
      savedTotalCorrectAnswers: totalCorrectAnswers,
      savedTotalScore: totalScore
    });
  };

  const handleNextQuestion = () => { 
    if (currentQuestionIndex < filteredQuestions.length - 1) { 
      const nextQuestion = filteredQuestions[currentQuestionIndex + 1];
      const nextTime = getTimeForQuestion(nextQuestion.difficulty);
      setCurrentQuestionIndex(prev => prev + 1); 
      setSelectedAnswer(''); 
      setIsCorrect(null); 
      setShowExplanation(false); 
      setTimeLeft(nextTime); 
      setIsTimerActive(true); 
    } else { 
      setShowResult(true); 
      setIsTimerActive(false); 
      const percentage = Math.round((totalCorrect / filteredQuestions.length) * 100);
      const oldPercentage = categoryProgress[activeCategory] || 0;
      const newCategoryProgress = { ...categoryProgress, [activeCategory]: Math.max(oldPercentage, percentage) };
      const completedCount = Object.values(newCategoryProgress).filter(p => p >= 80).length;
      const newHighScore = Math.max(highScore, score);
      const newTotalCorrectAnswers = totalCorrectAnswers + totalCorrect;
      const newTotalScore = totalScore + score;
      
      setCategoryProgress(newCategoryProgress);
      if (score > highScore) setHighScore(newHighScore);
      setTotalCorrectAnswers(newTotalCorrectAnswers);
      setTotalScore(newTotalScore);
      
      saveProgress({ savedCategoryProgress: newCategoryProgress, savedHighScore: newHighScore, totalCorrect, savedTotalCorrectAnswers: newTotalCorrectAnswers, savedTotalScore: newTotalScore });
      // Lưu kết quả khi hoàn thành tất cả categories
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
    } 
  };

  if (showResumeDialog) return <ResumeDialog show={true} onResume={handleResume} onRestart={handleRestart} />;

  return (
    <div className="kiem-bg min-h-screen p-4 md:p-8 font-sans">
      <div className="max-w-6xl mx-auto">
        <header className="flex items-center justify-between mb-8 bg-white/10 backdrop-blur rounded-2xl p-4 border border-white/20">
          <div className="flex items-center gap-4">
            <Link to="/hoahoc/12" className="p-2 hover:bg-white/10 rounded-full transition-colors text-white"><ArrowLeft className="w-6 h-6" /></Link>
            <div>
              <h1 className="text-2xl font-bold text-white">Kim loại Kiềm - Kiềm thổ - Nhôm</h1>
              <p className="text-blue-200 text-sm">Hóa học 12 • Chương 6</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 px-4 py-2 bg-yellow-500/20 rounded-full border border-yellow-500/30"><Trophy className="w-5 h-5 text-yellow-400" /><span className="font-bold text-yellow-200">{score} XP</span></div>
            <div className="flex items-center gap-2 px-4 py-2 bg-orange-500/20 rounded-full border border-orange-500/30"><Flame className="w-5 h-5 text-orange-400" /><span className="font-bold text-orange-200">{streak} Chuỗi</span></div>
          </div>
        </header>

        {!activeCategory ? (
          <div className="animate-fadeIn">
            <div className="stats-bar-kiem mb-8">
              <div className="stat-item-kiem"><CheckCircle2 className="w-5 h-5 text-green-400" /><span>Đã hoàn thành: <strong>{Object.values(categoryProgress).filter(p => p >= 80).length}/{CATEGORIES.length}</strong></span></div>
              <div className="stat-item-kiem"><Award className="w-5 h-5 text-yellow-400" /><span>Điểm cao nhất: <strong>{highScore || 0}</strong></span></div>
            </div>
            {/* Progress Watermark */}
            <ProgressWatermark categoryProgress={categoryProgress} />
            <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2"><Target className="w-6 h-6" />Chọn chủ đề thử thách</h2>
            <div className="category-grid-kiem">
              {CATEGORIES.map(cat => {
                const Icon = cat.icon; const catPercentage = categoryProgress[cat.id] || 0; const isCompleted = catPercentage >= 80; const isInProgress = catPercentage > 0 && catPercentage < 80;
                return (
                  <div key={cat.id} onClick={() => handleCategorySelect(cat.id)} className="category-card-kiem group">
                    <div className={`category-icon-wrapper-kiem ${isCompleted ? 'bg-green-500/20 text-green-400' : isInProgress ? 'bg-yellow-500/20 text-yellow-400' : ''}`} style={{ color: isCompleted || isInProgress ? undefined : cat.color }}><Icon className="w-8 h-8" />{catPercentage > 0 && <span className={`absolute -top-1 -right-1 text-xs font-bold px-1.5 py-0.5 rounded-full ${isCompleted ? 'bg-green-500 text-white' : 'bg-yellow-500 text-black'}`}>{catPercentage}%</span>}</div>
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-white mb-1 group-hover:text-blue-300 transition-colors">{cat.name}</h3>
                      <p className="text-sm text-blue-200 mb-3">{cat.description}</p>
                      <div className="flex items-center justify-between"><span className="text-xs font-semibold px-2 py-1 rounded bg-white/10 text-blue-200">{CHALLENGES.filter(c => c.category === cat.id).length} câu hỏi</span>{isCompleted ? <CheckCircle2 className="w-5 h-5 text-green-400" /> : isInProgress && <span className="text-xs text-yellow-400">Đang học</span>}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ) : !showResult ? (
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center justify-between mb-6 text-white">
              <div className="flex items-center gap-4"><button onClick={() => setActiveCategory(null)} className="hover:bg-white/10 p-2 rounded-full transition-colors"><RotateCcw className="w-5 h-5" /></button><span className="font-medium text-lg">Câu {currentQuestionIndex + 1}/{filteredQuestions.length}</span></div>
              <div className={`flex items-center gap-2 px-4 py-2 rounded-full ${timeLeft < 10 ? 'bg-red-500/20 text-red-200' : 'bg-white/10'}`}><Clock className="w-4 h-4" /><span className="font-mono font-bold">{timeLeft}s</span></div>
            </div>
            <div className="progress-track-kiem mb-6"><div className="progress-fill-kiem" style={{ width: `${((currentQuestionIndex) / filteredQuestions.length) * 100}%` }} /></div>
            <div className="question-card-kiem">
              <div className="question-header-kiem"><span className={`difficulty-badge-kiem ${currentQuestion.difficulty ===1 ? 'difficulty-easy' : currentQuestion.difficulty===2 ? 'difficulty-medium' : 'difficulty-hard'}`}>{currentQuestion.difficulty===1 ? 'Dễ' : currentQuestion.difficulty===2 ? 'Trung bình' : 'Khó'}</span><div className="flex gap-1">{[...Array(currentQuestion.difficulty)].map((_,i)=>(<Zap key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400"/>))}</div></div>
              <h3 className="text-xl md:text-2xl font-bold text-white mb-6 leading-relaxed">{currentQuestion.question}</h3>
              {currentQuestion.type === 'multiple-choice' ? (
                <div className="options-grid-kiem">{currentQuestion.options.map((option, idx) => (<button key={idx} onClick={() => handleAnswerSubmit(option)} disabled={isCorrect !== null} className={`option-btn-kiem ${selectedAnswer === option ? (isCorrect ? 'correct' : 'wrong') : (isCorrect !== null && option === currentQuestion.correctAnswer ? 'correct' : '')}`}><span className="font-medium">{String.fromCharCode(65+idx)}. {option}</span>{selectedAnswer === option && (isCorrect ? <CheckCircle2 className="w-5 h-5" /> : <XCircle className="w-5 h-5" />)}</button>))}</div>
              ) : (
                <div className="mb-8"><div className="flex gap-2"><input type="text" value={selectedAnswer} onChange={(e) => setSelectedAnswer(e.target.value)} disabled={isCorrect !== null} placeholder="Nhập câu trả lời của bạn..." className="flex-1 p-4 bg-white/5 border border-white/20 rounded-xl text-lg text-white focus:border-blue-500 focus:outline-none" onKeyDown={(e) => e.key === 'Enter' && handleAnswerSubmit(selectedAnswer)} /><button onClick={() => handleAnswerSubmit(selectedAnswer)} disabled={!selectedAnswer || isCorrect !== null} className="px-6 py-2 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed">Kiểm tra</button></div></div>
              )}
              {showExplanation && (
                <div className={`feedback-container-kiem ${isCorrect ? 'feedback-correct' : 'feedback-wrong'}`}>
                  <div className="flex items-start gap-3 mb-2">
                    {isCorrect ? <Lightbulb className="w-6 h-6 text-green-400" /> : <AlertTriangle className="w-6 h-6 text-red-400" />}
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <h4 className="font-bold text-lg">{isCorrect ? '✨ Chính xác!' : '❌ Chưa chính xác'}</h4>
                        {isCorrect && bonusPoints > 0 && (
                          <span className="text-yellow-400 font-bold animate-pulse">+{bonusPoints} bonus!</span>
                        )}
                      </div>
                      <p className="text-sm opacity-90 mb-2">
                        Đáp án đúng: <strong className="text-green-300">{currentQuestion.correctAnswer}</strong>
                      </p>
                      <p className="leading-relaxed opacity-90">{currentQuestion.explanation}</p>
                      {isCorrect && (
                        <div className="mt-3 flex gap-3 text-xs">
                          <span className="px-2 py-1 bg-green-500/20 rounded text-green-300">
                            +{calculatePoints(currentQuestion.difficulty, timeLeft, streak - 1).basePoints} điểm cơ bản
                          </span>
                          {bonusPoints > 0 && (
                            <>
                              <span className="px-2 py-1 bg-blue-500/20 rounded text-blue-300">
                                +{calculatePoints(currentQuestion.difficulty, timeLeft, streak - 1).timeBonus} bonus thời gian
                              </span>
                              <span className="px-2 py-1 bg-orange-500/20 rounded text-orange-300">
                                +{calculatePoints(currentQuestion.difficulty, timeLeft, streak - 1).streakBonus} bonus chuỗi
                              </span>
                            </>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="mt-4 flex justify-end">
                    <button onClick={handleNextQuestion} className="flex items-center gap-2 px-6 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg font-bold hover:from-blue-700 hover:to-indigo-700 transition-all hover:scale-105 shadow-lg">
                      {currentQuestionIndex < filteredQuestions.length - 1 ? 'Câu tiếp theo' : '🎯 Hoàn thành'}
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="max-w-2xl mx-auto text-center animate-fadeIn">
            <div className="bg-white/10 backdrop-blur rounded-3xl p-8 shadow-2xl mb-8 border border-white/20">
              {/* Icon và tiêu đề */}
              <div className={`w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6 ${
                (totalCorrect / filteredQuestions.length) * 100 >= GAME_CONFIG.PASS_PERCENTAGE 
                  ? 'bg-green-500/20' 
                  : 'bg-yellow-500/20'
              }`}>
                {(totalCorrect / filteredQuestions.length) * 100 >= GAME_CONFIG.PASS_PERCENTAGE 
                  ? <Trophy className="w-12 h-12 text-green-400" />
                  : <Award className="w-12 h-12 text-yellow-400" />
                }
              </div>
              <h2 className="text-3xl font-bold text-white mb-2">
                {(totalCorrect / filteredQuestions.length) * 100 >= GAME_CONFIG.PASS_PERCENTAGE 
                  ? '🎉 Xuất sắc!' 
                  : '💪 Cố gắng thêm!'
                }
              </h2>
              <p className="text-blue-200 mb-8">
                Bạn đã hoàn thành chủ đề {CATEGORIES.find(c => c.id === activeCategory)?.name}
              </p>
              
              {/* Stats grid cải tiến */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                <div className="p-4 bg-gradient-to-br from-green-500/20 to-green-500/5 rounded-2xl border border-green-500/20">
                  <div className="text-sm text-green-200 mb-1">💰 Tổng điểm</div>
                  <div className="text-2xl font-bold text-green-400">{score} XP</div>
                </div>
                <div className="p-4 bg-gradient-to-br from-blue-500/20 to-blue-500/5 rounded-2xl border border-blue-500/20">
                  <div className="text-sm text-blue-200 mb-1">✅ Trả lời đúng</div>
                  <div className="text-2xl font-bold text-blue-400">{totalCorrect}/{filteredQuestions.length}</div>
                </div>
                <div className="p-4 bg-gradient-to-br from-purple-500/20 to-purple-500/5 rounded-2xl border border-purple-500/20">
                  <div className="text-sm text-purple-200 mb-1">📊 Tỉ lệ</div>
                  <div className="text-2xl font-bold text-purple-400">{Math.round((totalCorrect / filteredQuestions.length) * 100)}%</div>
                </div>
                <div className="p-4 bg-gradient-to-br from-orange-500/20 to-orange-500/5 rounded-2xl border border-orange-500/20">
                  <div className="text-sm text-orange-200 mb-1">🏆 Kỷ lục</div>
                  <div className="text-2xl font-bold text-orange-400">{Math.max(highScore, score)} XP</div>
                </div>
              </div>
              
              {/* Progress bar */}
              <div className="mb-6">
                <div className="flex justify-between text-sm text-blue-200 mb-2">
                  <span>Tiến độ hoàn thành</span>
                  <span>{Math.round((totalCorrect / filteredQuestions.length) * 100)}% (Yêu cầu: {GAME_CONFIG.PASS_PERCENTAGE}%)</span>
                </div>
                <div className="h-3 bg-white/10 rounded-full overflow-hidden">
                  <div 
                    className={`h-full rounded-full transition-all duration-1000 ${
                      (totalCorrect / filteredQuestions.length) * 100 >= GAME_CONFIG.PASS_PERCENTAGE 
                        ? 'bg-gradient-to-r from-green-500 to-emerald-400' 
                        : 'bg-gradient-to-r from-yellow-500 to-orange-400'
                    }`}
                    style={{ width: `${(totalCorrect / filteredQuestions.length) * 100}%` }}
                  />
                </div>
              </div>
              
              {/* Buttons */}
              <div className="flex gap-4 justify-center flex-wrap">
                <button onClick={resetGame} className="flex items-center gap-2 px-6 py-3 bg-white/10 text-white rounded-xl font-bold hover:bg-white/20 transition-all hover:scale-105">
                  <RotateCcw className="w-5 h-5" />Làm lại
                </button>
                <button onClick={() => {
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
                  }} className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-bold hover:from-blue-700 hover:to-indigo-700 transition-all shadow-lg shadow-blue-500/30 hover:scale-105">
                  Chủ đề khác<ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        ) }
      </div>
    </div>
  );
};

export default Bai07_KimLoaiKiem_KiemTho_Nhom;
