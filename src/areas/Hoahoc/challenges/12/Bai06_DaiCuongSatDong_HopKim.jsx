import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowLeft, Trophy, RotateCcw, ChevronRight,
  CheckCircle2, XCircle, Lightbulb, Zap, Award,
  FlaskConical, Hammer, Globe, Shield, Atom,
  Clock, Target, AlertTriangle, Flame
} from 'lucide-react';
import useChallengeProgress from '../../../../hooks/useChallengeProgress';
import ResumeDialog from '../../../../components/ResumeDialog';
import './CSS/Bai06_DaiCuongSatDong_HopKim.css';

const CATEGORIES = [
  { id: 'sat', name: '🔩 Sắt (Fe)', icon: Hammer, color: '#dc2626', description: 'Tính chất vật lý, hóa học, điều chế và ứng dụng của sắt', bgGradient: 'from-red-600 to-rose-600', emoji: '⚙️' },
  { id: 'dong', name: '🥉 Đồng (Cu)', icon: Globe, color: '#ea580c', description: 'Tính chất, hợp chất, phản ứng và ứng dụng của đồng', bgGradient: 'from-orange-500 to-amber-500', emoji: '⚡' },
  { id: 'hopkim', name: '🛡️ Hợp kim', icon: Shield, color: '#059669', description: 'Gang, thép, đồng thau, bronze và hợp kim đặc biệt', bgGradient: 'from-emerald-600 to-teal-500', emoji: '🏗️' },
  { id: 'ungdung', name: '🏭 Ứng dụng thực tiễn', icon: Atom, color: '#7c3aed', description: 'Ứng dụng kim loại trong đời sống và công nghiệp', bgGradient: 'from-violet-600 to-purple-500', emoji: '🔬' },
  { id: 'phanung', name: '⚗️ Chuỗi phản ứng & Nhận biết', icon: FlaskConical, color: '#db2777', description: 'Nhận biết ion, chuỗi phản ứng hóa học của Sắt và Đồng', bgGradient: 'from-pink-600 to-rose-500', emoji: '🧪' }
];

// Bộ câu hỏi tĩnh
const CHALLENGES = [
  // ===== SẮT (12 câu) =====
  { id: 1, category: 'sat', type: 'multiple-choice', difficulty:1, question: 'Sắt nguyên chất gọi là gì trong công nghiệp?', options: ['Sắt tinh khiết', 'Sắt xốp', 'Fe tinh', 'Sắt bọt'], correctAnswer: 'Sắt tinh khiết', explanation: 'Sắt tinh khiết là sắt gần như không chứa cacbon; thép và gang là hợp kim chứa cacbon.', hint: 'Không chứa cacbon.'},
  { id: 2, category: 'sat', type: 'multiple-choice', difficulty:1, question: 'Thép khác gang ở điểm nào chính?', options: ['Hàm lượng cacbon thấp hơn', 'Hàm lượng cacbon cao hơn', 'Thép có nhiều tạp chất hơn', 'Gang có ít cacbon'], correctAnswer: 'Hàm lượng cacbon thấp hơn', explanation: 'Thép có hàm lượng C < 2%, gang có 2-5% C.', hint: 'So sánh %C.'},
  { id: 3, category: 'sat', type: 'multiple-choice', difficulty:2, question: 'Quá trình nung oxit sắt với than cốc để điều chế sắt gọi là?', options: ['Quá trình xẩy luyện (luyện kim)', 'Điện phân', 'Tách từ', 'Lưu hóa'], correctAnswer: 'Quá trình xẩy luyện (luyện kim)', explanation: 'Trong lò cao, Fe2O3/Fe3O4 được khử bằng CO từ than cốc để tạo sắt nóng chảy.', hint: 'Lò cao.'},
  { id: 4, category: 'sat', type: 'fill-blank', difficulty:2, question: 'Hợp chất sắt có màu vàng nâu dễ tan trong axit là sắt (___)', correctAnswer: 'II', acceptedAnswers:['II','2'], explanation: 'FeO và các muối Fe2+ thường màu xanh lục hoặc xanh, Fe2+ là hóa trị II.', hint: 'Fe2+'},
  { id: 5, category: 'sat', type: 'multiple-choice', difficulty:2, question: 'Sắt dễ bị ăn mòn do tác dụng với?', options: ['O2 và H2O', 'H2', 'N2', 'CO2'], correctAnswer: 'O2 và H2O', explanation: 'Ăn mòn sắt thường xảy ra khi có sự hiện diện của oxy và nước (rỉ sét).', hint: 'Rỉ sét cần không khí và ẩm.'},
  { id: 6, category: 'sat', type: 'multiple-choice', difficulty:3, question: 'Để biến sắt thành thép chống gỉ (inox) thường thêm nguyên tố nào?', options: ['Cr và Ni', 'Cu và Zn', 'Mg và Al', 'Si và P'], correctAnswer: 'Cr và Ni', explanation: 'Crôm và niken giúp tạo lớp oxit bảo vệ và tăng độ chống ăn mòn.', hint: 'Inox = Stainless steel'},
  { id: 7, category: 'sat', type: 'multiple-choice', difficulty:3, question: 'Phương pháp nào sau đây dùng để tẩy bỏ lớp oxit trên bề mặt sắt?', options: ['Pickling (rửa axit)', 'Anod hóa', 'Điện phân nóng chảy', 'Lưu hóa'], correctAnswer: 'Pickling (rửa axit)', explanation: 'Pickling dùng HCl hoặc H2SO4 loãng để loại bỏ vết oxit trước khi xử lý bề mặt.', hint: 'Rửa axit.'},
  { id: 8, category: 'sat', type: 'fill-blank', difficulty:2, question: 'Công thức của hematit là Fe___O___', correctAnswer: '2,3', acceptedAnswers:['2,3','Fe2O3'], explanation: 'Hematit có công thức Fe2O3.', hint: 'Fe2O3'},
  { id: 9, category: 'sat', type: 'multiple-choice', difficulty:2, question: 'Một trong những ứng dụng chính của sắt là?', options: ['Kết cấu xây dựng', 'Đồ trang sức', 'Pin', 'Vật liệu cách điện'], correctAnswer: 'Kết cấu xây dựng', explanation: 'Sắt/ thép được dùng rộng rãi trong xây dựng, cầu, kết cấu.', hint: 'Xây dựng'},
  { id:10, category: 'sat', type: 'multiple-choice', difficulty:3, question: 'Phản ứng: 3Fe + 4H2O → Fe3O4 + 4H2 xảy ra khi?', options: ['Đun nóng với nước hơi', 'Ở nhiệt độ thường', 'Trong không khí khô', 'Khi hòa tan trong axit'], correctAnswer: 'Đun nóng với nước hơi', explanation: 'Phản ứng giữa sắt và hơi nước nóng tạo Fe3O4 và H2.', hint: 'Hơi nước'},
  { id:11, category: 'sat', type: 'fill-blank', difficulty:3, question: 'Sắt có thể được tinh luyện bằng phương pháp oxy hóa cacbon gọi là quá trình ___', correctAnswer: 'thổi oxy (basic oxygen)', acceptedAnswers:['thổi oxy','oxygenation','basic oxygen'], explanation: 'Thổi oxy được dùng trong lò LD/BOF để chuyển đổi Fe nóng chảy thành thép.', hint: 'BOF'},
  { id:12, category: 'sat', type: 'multiple-choice', difficulty:2, question: 'Phế liệu sắt được tái chế bằng phương pháp nào?', options: ['Lò điện hồ quang (EAF)', 'Lò cao', 'Điện phân', 'Điều chế bằng CO'], correctAnswer: 'Lò điện hồ quang (EAF)', explanation: 'EAF dùng phế liệu sắt/ thép và điện để nấu lại, tiết kiệm nguyên liệu.', hint: 'EAF uses scrap.'},

  // ===== ĐỒNG (12 câu) =====
  { id: 13, category: 'dong', type: 'multiple-choice', difficulty:1, question: 'Đồng nguyên chất có màu gì?', options: ['Đỏ ánh kim', 'Xám', 'Bạc', 'Vàng'], correctAnswer: 'Đỏ ánh kim', explanation: 'Đồng có màu đỏ ánh kim đặc trưng.', hint: 'Màu đồng.'},
  { id: 14, category: 'dong', type: 'multiple-choice', difficulty:1, question: 'Đồng có tính dẫn điện như thế nào?', options: ['Rất tốt, sau bạc', 'Kém', 'Trung bình', 'Không dẫn điện'], correctAnswer: 'Rất tốt, sau bạc', explanation: 'Đồng dẫn điện tốt, thường dùng trong dây điện.', hint: 'Dây dẫn điện'},
  { id: 15, category: 'dong', type: 'multiple-choice', difficulty:2, question: 'Khoáng sản chính của đồng là?', options: ['Chalcocite (Cu2S), Chalcopyrite (CuFeS2)', 'Hematit', 'Galena', 'Magnetit'], correctAnswer: 'Chalcocite (Cu2S), Chalcopyrite (CuFeS2)', explanation: 'Các quặng sulfide là nguồn chính để điều chế đồng.', hint: 'Quặng sulfide'},
  { id: 16, category: 'dong', type: 'multiple-choice', difficulty:2, question: 'Đồng phản ứng với dung dịch HNO3 loãng cho sản phẩm nào?', options: ['Cu + 4HNO3 loãng → Cu(NO3)2 + 2NO2 + 2H2O', 'Cu không phản ứng', 'Tạo Cu2O', 'Tạo NH4NO3'], correctAnswer: 'Cu + 4HNO3 loãng → Cu(NO3)2 + 2NO2 + 2H2O', explanation: 'Đồng bị oxi hóa bởi HNO3, giải phóng NO2 (khí nâu đỏ).', hint: 'NO2 gas'},
  { id: 17, category: 'dong', type: 'fill-blank', difficulty:2, question: 'Sản phẩm khi đồng tác dụng với AgNO3: Cu + 2AgNO3 → ___ + 2Ag', correctAnswer: 'Cu(NO3)2', acceptedAnswers:['Cu(NO3)2','cuno3','cuno2'], explanation: 'Đồng khử Ag+ thành Ag, bản thân bị oxi hóa thành Cu2+.', hint: 'Cu2+ nitrate'},
  { id: 18, category: 'dong', type: 'multiple-choice', difficulty:3, question: 'Để tinh luyện đồng sulfide, bước đầu tiên thường là?', options: ['Roasting (rang quặng) để tạo oxide', 'Điện phân ngay lập tức', 'Dùng HCl', 'Hòa tan trong nước'], correctAnswer: 'Roasting (rang quặng) để tạo oxide', explanation: 'Quặng sulfide thường được rang để chuyển thành oxide trước khi khử.', hint: 'Roasting'},
  { id: 19, category: 'dong', type: 'multiple-choice', difficulty:2, question: 'Hiện tượng xanh trên đồng lâu ngày gọi là gì?', options: ['Patina (xanh rêu)', 'Rỉ sắt', 'Lắng đọng muối', 'Ốxít đỏ'], correctAnswer: 'Patina (xanh rêu)', explanation: 'Patina là lớp carbonate/acetate trên đồng do ăn mòn lâu ngày.', hint: 'Patina'},
  { id: 20, category: 'dong', type: 'multiple-choice', difficulty:3, question: 'Đồng thau là hợp kim của đồng với nguyên tố nào?', options: ['Kẽm (Zn)', 'Thiếc (Sn)', 'Nhôm (Al)', 'Sắt (Fe)'], correctAnswer: 'Kẽm (Zn)', explanation: 'Đồng thau = Cu-Zn.', hint: 'Brass'},
  { id: 21, category: 'dong', type: 'fill-blank', difficulty:2, question: 'Điện phân dung dịch CuSO4 với catot là đồng, anot là đồng tinh khiết: hiện tượng gọi là ___.', correctAnswer: 'điện tinh (electrorefining)', acceptedAnswers:['điện tinh','electrorefining'], explanation: 'Phương pháp tinh luyện điện: anot tan, catot thu đồng tinh.', hint: 'Electrorefining'},
  { id: 22, category: 'dong', type: 'multiple-choice', difficulty:3, question: 'Đồng có ứng dụng lớn trong ngành nào?', options: ['Điện tử và xây dựng', 'Dệt may', 'Thực phẩm', 'Dược phẩm'], correctAnswer: 'Điện tử và xây dựng', explanation: 'Đồng dùng cho dây dẫn điện, ống nước, thiết bị điện tử.', hint: 'Dây điện'},
  { id: 23, category: 'dong', type: 'multiple-choice', difficulty:3, question: 'Dung dịch nào sau đây dùng để làm sạch đồng bị oxi hóa (patina)?', options: ['Giấm (axetic) pha muối', 'Nước cất', 'Dầu hỏa', 'NaOH đậm đặc'], correctAnswer: 'Giấm (axetic) pha muối', explanation: 'Giấm và muối giúp hòa tan lớp patina nhẹ.', hint: 'Giấm'},

  // ===== HỢP KIM (12 câu) =====
  { id: 24, category: 'hopkim', type: 'multiple-choice', difficulty:1, question: 'Gang thường chứa bao nhiêu phần trăm cacbon?', options: ['2-5%', '<2%', '>5%', '0.01-0.5%'], correctAnswer: '2-5%', explanation: 'Gang chứa 2-5% C, khiến nó giòn hơn thép.', hint: 'Nhiều cacbon'},
  { id: 25, category: 'hopkim', type: 'multiple-choice', difficulty:1, question: 'Thép cacbon chứa thành phần chính là?', options: ['Fe và C', 'Cu và Zn', 'Al và Mg', 'Fe và Cr'], correctAnswer: 'Fe và C', explanation: 'Thép cacbon chủ yếu là sắt với lượng cacbon nhỏ.', hint: 'Thép = sắt + cacbon'},
  { id: 26, category: 'hopkim', type: 'multiple-choice', difficulty:2, question: 'Inox (thép không gỉ) khác thép thường vì có thêm?', options: ['Crôm', 'Kẽm', 'Nhôm', 'Silic'], correctAnswer: 'Crôm', explanation: 'Crôm tạo lớp oxit bền bảo vệ bề mặt chống ăn mòn.', hint: 'Cr'},
  { id: 27, category: 'hopkim', type: 'multiple-choice', difficulty:2, question: 'Đồng thau (brass) chủ yếu dùng vì có đặc tính?', options: ['Độ dẻo tốt và kháng ăn mòn', 'Rất cứng', 'Dễ gãy', 'Dẫn điện kém'], correctAnswer: 'Độ dẻo tốt và kháng ăn mòn', explanation: 'Đồng thau dễ gia công, bền trong môi trường.', hint: 'Brass'},
  { id: 28, category: 'hopkim', type: 'fill-blank', difficulty:2, question: 'Hợp kim của Cu và Sn gọi là ___', correctAnswer: 'đồng thiếc (đồng đỏ, bronze)', acceptedAnswers:['đồng thiếc','bronze','bronze (đồng)'], explanation: 'Đồng + thiếc = đồng thiếc (bronze).', hint: 'Bronze'},
  { id: 29, category: 'hopkim', type: 'multiple-choice', difficulty:3, question: 'Quá trình làm cứng bề mặt thép bằng cách nung và làm nguội nhanh gọi là?', options: ['Tôi (quenching)', 'Ủ (annealing)', 'Tái nhiệt', 'Nung chậm'], correctAnswer: 'Tôi (quenching)', explanation: 'Tôi là tôi nguội nhanh để tăng độ cứng.', hint: 'Quenching'},
  { id: 30, category: 'hopkim', type: 'multiple-choice', difficulty:3, question: 'Hợp kim nào sau đây có tính từ đặc biệt (magnetic)?', options: ['Ferrite (Fe-based)', 'Bronze', 'Brass', 'Aluminum alloy'], correctAnswer: 'Ferrite (Fe-based)', explanation: 'Ferrite và các hợp kim sắt từ có tính từ.', hint: 'Magnetic alloys'},
  { id: 31, category: 'hopkim', type: 'fill-blank', difficulty:2, question: 'Độ cứng của hợp kim thường đo bằng thang ___', correctAnswer: 'Brinell', acceptedAnswers:['Brinell','HB','thang Brinell'], explanation: 'Thang Brinell (HB) là một phương pháp đo độ cứng phổ biến.', hint: 'HB'},
  { id: 32, category: 'hopkim', type: 'multiple-choice', difficulty:2, question: 'Hợp kim niken-crom được dùng trong lò vì có đặc tính?', options: ['Khả năng chịu nhiệt cao', 'Dẫn điện tốt', 'Dễ tan trong nước', 'Mềm và dẻo'], correctAnswer: 'Khả năng chịu nhiệt cao', explanation: 'Hợp kim Ni-Cr (nichrome) dùng làm điện trở chịu nhiệt.', hint: 'Nichrome'},
  { id: 33, category: 'hopkim', type: 'multiple-choice', difficulty:3, question: 'Gang xám khác gang trắng ở điểm nào?', options: ['Cấu trúc graphit trong gang xám', 'Hàm lượng C thấp hơn', 'Khả năng dẻo cao hơn', 'Không chứa Fe'], correctAnswer: 'Cấu trúc graphit trong gang xám', explanation: 'Gang xám có cacbon ở dạng graphit, làm cho nó giòn nhưng dễ gia công.', hint: 'Graphite'},
  { id: 34, category: 'hopkim', type: 'fill-blank', difficulty:3, question: 'Hợp kim chứa Fe-C có tỷ lệ cacbon lớn hơn 2% gọi là ___', correctAnswer: 'gang', acceptedAnswers:['gang','cast iron'], explanation: 'Vật liệu có >2% C được gọi là gang.', hint: '>2% C'},
  { id: 35, category: 'hopkim', type: 'multiple-choice', difficulty:3, question: 'Để giảm độ giòn của gang, người ta thường thêm nguyên tố nào?', options: ['Si, Mn, Ni', 'Au, Ag', 'Na, K', 'Hg, Pb'], correctAnswer: 'Si, Mn, Ni', explanation: 'Thêm các nguyên tố hợp kim có thể cải thiện tính chất cơ học.', hint: 'Hợp kim hóa'},
  { id: 36, category: 'hopkim', type: 'multiple-choice', difficulty:2, question: 'Ứng dụng chính của thép cường độ cao là?', options: ['Cấu trúc xe và cầu', 'Đồ trang sức', 'Thủy tinh', 'Gỗ'], correctAnswer: 'Cấu trúc xe và cầu', explanation: 'Thép cường độ cao dùng trong ô tô, cầu, kết cấu chịu lực.', hint: 'Kết cấu chịu lực'},

  // ===== SẮT - BỔ SUNG (6 câu mới) =====
  { id: 37, category: 'sat', type: 'multiple-choice', difficulty:2, question: 'Sắt có mấy số oxi hóa phổ biến?', options: ['2 (+2 và +3)', '1 (+3)', '3 (+2, +3, +6)', '4'], correctAnswer: '2 (+2 và +3)', explanation: 'Sắt thường có số oxi hóa +2 (Fe²⁺) và +3 (Fe³⁺) trong hầu hết hợp chất.', hint: 'Fe2+ và Fe3+' },
  { id: 38, category: 'sat', type: 'multiple-choice', difficulty:3, question: 'Phản ứng nào chứng minh Fe có tính khử yếu hơn Al?', options: ['2Al + Fe₂O₃ → Al₂O₃ + 2Fe', 'Fe + CuSO₄ → FeSO₄ + Cu', 'Fe + 2HCl → FeCl₂ + H₂', '3Fe + 2O₂ → Fe₃O₄'], correctAnswer: '2Al + Fe₂O₃ → Al₂O₃ + 2Fe', explanation: 'Phản ứng nhiệt nhôm chứng minh Al khử được oxit sắt, nên Al mạnh hơn Fe.', hint: 'Phản ứng nhiệt nhôm' },
  { id: 39, category: 'sat', type: 'fill-blank', difficulty:2, question: 'Màu của dung dịch FeCl₃ là màu ___', correctAnswer: 'vàng nâu', acceptedAnswers: ['vàng nâu', 'vàng', 'nâu vàng', 'cam'], explanation: 'Muối Fe³⁺ thường có màu vàng nâu đặc trưng.', hint: 'Fe3+ có màu' },
  { id: 40, category: 'sat', type: 'multiple-choice', difficulty:3, question: 'Sắt KHÔNG tan trong axit nào ở điều kiện thường?', options: ['HNO₃ đặc nguội', 'HCl loãng', 'H₂SO₄ loãng', 'HNO₃ loãng'], correctAnswer: 'HNO₃ đặc nguội', explanation: 'Fe bị thụ động hóa trong HNO₃ đặc nguội do tạo lớp oxit bảo vệ.', hint: 'Thụ động hóa' },
  { id: 41, category: 'sat', type: 'multiple-choice', difficulty:2, question: 'Magnetit có công thức hóa học là?', options: ['Fe₃O₄', 'Fe₂O₃', 'FeO', 'FeCO₃'], correctAnswer: 'Fe₃O₄', explanation: 'Magnetit (quặng từ) có công thức Fe₃O₄, là oxit hỗn hợp của Fe(II) và Fe(III).', hint: 'Quặng từ tính' },
  { id: 42, category: 'sat', type: 'fill-blank', difficulty:3, question: 'Phương trình: Fe + H₂SO₄ (đặc, nóng) → Fe₂(SO₄)₃ + SO₂ + H₂O. Hệ số cân bằng của Fe là ___', correctAnswer: '2', acceptedAnswers: ['2'], explanation: '2Fe + 6H₂SO₄ → Fe₂(SO₄)₃ + 3SO₂ + 6H₂O', hint: 'Cân bằng phản ứng oxi hóa khử' },

  // ===== ĐỒNG - BỔ SUNG (6 câu mới) =====
  { id: 43, category: 'dong', type: 'multiple-choice', difficulty:2, question: 'Đồng có số oxi hóa phổ biến nhất là?', options: ['+1 và +2', '+2 và +3', '+1 và +3', 'Chỉ +2'], correctAnswer: '+1 và +2', explanation: 'Đồng thường có số oxi hóa +1 (Cu₂O) và +2 (CuO, CuSO₄).', hint: 'Cu+ và Cu2+' },
  { id: 44, category: 'dong', type: 'multiple-choice', difficulty:3, question: 'Cu(OH)₂ có màu gì và tan trong dung dịch NH₃ tạo phức màu gì?', options: ['Xanh lơ → Xanh đậm', 'Trắng → Không màu', 'Nâu → Vàng', 'Xám → Xanh'], correctAnswer: 'Xanh lơ → Xanh đậm', explanation: 'Cu(OH)₂ màu xanh lơ, tan trong NH₃ dư tạo phức [Cu(NH₃)₄]²⁺ màu xanh đậm.', hint: 'Phức với amoniac' },
  { id: 45, category: 'dong', type: 'fill-blank', difficulty:2, question: 'Đồng sunfat ngậm nước (CuSO₄.5H₂O) có tên gọi khác là ___', correctAnswer: 'phèn xanh', acceptedAnswers: ['phèn xanh', 'đồng sunfat ngậm nước', 'blue vitriol'], explanation: 'CuSO₄.5H₂O được gọi là phèn xanh do màu xanh đặc trưng.', hint: 'Tên thông thường' },
  { id: 46, category: 'dong', type: 'multiple-choice', difficulty:3, question: 'Phản ứng: Cu + HNO₃ (loãng) → Cu(NO₃)₂ + NO + H₂O. Tỉ lệ mol Cu : HNO₃ là?', options: ['3 : 8', '1 : 4', '1 : 2', '2 : 6'], correctAnswer: '3 : 8', explanation: '3Cu + 8HNO₃(loãng) → 3Cu(NO₃)₂ + 2NO + 4H₂O', hint: 'Cân bằng phản ứng' },
  { id: 47, category: 'dong', type: 'multiple-choice', difficulty:2, question: 'Tại sao đồng được dùng làm dây điện?', options: ['Dẫn điện tốt, giá rẻ hơn bạc', 'Nhẹ hơn nhôm', 'Cứng hơn sắt', 'Không bị oxi hóa'], correctAnswer: 'Dẫn điện tốt, giá rẻ hơn bạc', explanation: 'Đồng có độ dẫn điện chỉ sau bạc nhưng giá thành rẻ hơn nhiều.', hint: 'Tính dẫn điện và giá thành' },
  { id: 48, category: 'dong', type: 'fill-blank', difficulty:3, question: 'Để nhận biết ion Cu²⁺, người ta thường dùng dung dịch ___ (tạo kết tủa xanh)', correctAnswer: 'NaOH', acceptedAnswers: ['NaOH', 'kiềm', 'KOH', 'Ba(OH)2'], explanation: 'Cu²⁺ + 2OH⁻ → Cu(OH)₂↓ (kết tủa xanh lơ)', hint: 'Tạo hidroxit' },

  // ===== HỢP KIM - BỔ SUNG (6 câu mới) =====
  { id: 49, category: 'hopkim', type: 'multiple-choice', difficulty:2, question: 'Duralumin là hợp kim của nhôm với những kim loại nào?', options: ['Cu, Mg, Mn', 'Fe, C', 'Zn, Sn', 'Ni, Cr'], correctAnswer: 'Cu, Mg, Mn', explanation: 'Duralumin (đuyra) = Al + Cu + Mg + Mn, nhẹ và bền, dùng trong hàng không.', hint: 'Hợp kim nhôm nhẹ' },
  { id: 50, category: 'hopkim', type: 'fill-blank', difficulty:2, question: 'Hợp kim của Cu với Ni được gọi là ___ , dùng làm tiền xu', correctAnswer: 'constantan', acceptedAnswers: ['constantan', 'đồng bạch', 'cupronickel'], explanation: 'Đồng bạch (Cu-Ni) có màu trắng bạc, dùng làm tiền xu.', hint: 'Tiền xu màu bạc' },
  { id: 51, category: 'hopkim', type: 'multiple-choice', difficulty:3, question: 'Thép không gỉ 304 chứa khoảng bao nhiêu % Cr và Ni?', options: ['18% Cr, 8% Ni', '10% Cr, 5% Ni', '25% Cr, 20% Ni', '5% Cr, 3% Ni'], correctAnswer: '18% Cr, 8% Ni', explanation: 'Thép không gỉ 304 (18/8) chứa 18% Cr và 8% Ni.', hint: '18-8 stainless' },
  { id: 52, category: 'hopkim', type: 'multiple-choice', difficulty:2, question: 'Ưu điểm chính của hợp kim so với kim loại nguyên chất là?', options: ['Cứng hơn, bền hơn', 'Mềm hơn', 'Dẫn điện tốt hơn', 'Nhẹ hơn'], correctAnswer: 'Cứng hơn, bền hơn', explanation: 'Hợp kim thường cứng và bền hơn do cấu trúc tinh thể bị xáo trộn.', hint: 'Tính cơ học' },
  { id: 53, category: 'hopkim', type: 'fill-blank', difficulty:3, question: 'Hợp kim có nhiệt độ nóng chảy thấp hơn kim loại thành phần gọi là hợp kim ___', correctAnswer: 'eutectic', acceptedAnswers: ['eutectic', 'ơtecti', 'cùng tinh'], explanation: 'Hợp kim eutectic có điểm nóng chảy thấp nhất trong hệ hợp kim.', hint: 'Điểm nóng chảy thấp' },
  { id: 54, category: 'hopkim', type: 'multiple-choice', difficulty:3, question: 'Để tăng độ cứng của thép mà không làm giòn, người ta thường?', options: ['Ram sau khi tôi', 'Ủ ở nhiệt độ cao', 'Thêm nhiều cacbon', 'Làm nguội chậm'], correctAnswer: 'Ram sau khi tôi', explanation: 'Ram (tempering) sau tôi giúp giảm độ giòn mà vẫn giữ độ cứng.', hint: 'Xử lý nhiệt 2 bước' },

  // ===== ỨNG DỤNG THỰC TIỄN (12 câu mới) =====
  { id: 55, category: 'ungdung', type: 'multiple-choice', difficulty:1, question: 'Kim loại nào được dùng làm vỏ tàu biển?', options: ['Thép', 'Nhôm', 'Đồng', 'Kẽm'], correctAnswer: 'Thép', explanation: 'Thép có độ bền cao và giá thành hợp lý cho đóng tàu lớn.', hint: 'Độ bền và giá' },
  { id: 56, category: 'ungdung', type: 'multiple-choice', difficulty:2, question: 'Tại sao ống nước đồng ít bị ăn mòn hơn ống sắt?', options: ['Đồng tạo lớp patina bảo vệ', 'Đồng cứng hơn sắt', 'Đồng nhẹ hơn sắt', 'Đồng dẫn nhiệt kém'], correctAnswer: 'Đồng tạo lớp patina bảo vệ', explanation: 'Lớp patina (cacbonat đồng) bám trên bề mặt bảo vệ đồng khỏi ăn mòn tiếp.', hint: 'Lớp bảo vệ tự nhiên' },
  { id: 57, category: 'ungdung', type: 'multiple-choice', difficulty:2, question: 'Gang được dùng làm nồi nấu vì?', options: ['Giữ nhiệt tốt, phân bố nhiệt đều', 'Nhẹ và dễ di chuyển', 'Không gỉ', 'Dẫn điện tốt'], correctAnswer: 'Giữ nhiệt tốt, phân bố nhiệt đều', explanation: 'Gang có khả năng giữ nhiệt và phân bố nhiệt đều, phù hợp nấu ăn.', hint: 'Tính chất nhiệt' },
  { id: 58, category: 'ungdung', type: 'fill-blank', difficulty:2, question: 'Thép được mạ kẽm để chống gỉ, quá trình này gọi là ___', correctAnswer: 'mạ kẽm nóng (galvanizing)', acceptedAnswers: ['mạ kẽm', 'galvanizing', 'mạ kẽm nóng', 'tôn'], explanation: 'Galvanizing tạo lớp kẽm bảo vệ thép khỏi ăn mòn.', hint: 'Tôn' },
  { id: 59, category: 'ungdung', type: 'multiple-choice', difficulty:3, question: 'Đồng thau được dùng làm khóa và van vì?', options: ['Không tạo tia lửa, kháng ăn mòn', 'Dẫn điện tốt', 'Rất cứng', 'Giá rẻ nhất'], correctAnswer: 'Không tạo tia lửa, kháng ăn mòn', explanation: 'Đồng thau an toàn (không tạo tia lửa) và bền trong môi trường ẩm.', hint: 'An toàn trong môi trường dễ cháy' },
  { id: 60, category: 'ungdung', type: 'multiple-choice', difficulty:2, question: 'Thép không gỉ được dùng trong y tế vì?', options: ['Không gỉ, dễ tiệt trùng', 'Nhẹ hơn nhôm', 'Dẫn điện tốt', 'Giá rẻ'], correctAnswer: 'Không gỉ, dễ tiệt trùng', explanation: 'Inox không gỉ, bền với hóa chất và dễ tiệt trùng.', hint: 'Vô trùng' },
  { id: 61, category: 'ungdung', type: 'fill-blank', difficulty:3, question: 'Hợp kim nhớ hình dạng (shape memory alloy) phổ biến nhất là Nitinol, gồm Ni và ___', correctAnswer: 'Ti (Titan)', acceptedAnswers: ['Ti', 'Titan', 'titanium'], explanation: 'Nitinol = Nickel + Titanium, có khả năng "nhớ" hình dạng ban đầu.', hint: 'Ni + ?' },
  { id: 62, category: 'ungdung', type: 'multiple-choice', difficulty:2, question: 'Tại sao cầu treo thường dùng cáp thép?', options: ['Chịu kéo tốt, độ bền cao', 'Nhẹ hơn nhôm', 'Không bị ăn mòn', 'Dẻo như cao su'], correctAnswer: 'Chịu kéo tốt, độ bền cao', explanation: 'Thép có độ bền kéo cao, phù hợp cho cáp chịu tải trọng lớn.', hint: 'Độ bền kéo' },
  { id: 63, category: 'ungdung', type: 'multiple-choice', difficulty:3, question: 'Đồng được dùng trong bộ tản nhiệt CPU vì?', options: ['Dẫn nhiệt rất tốt', 'Dẫn điện kém', 'Nhẹ hơn nhôm', 'Cách nhiệt tốt'], correctAnswer: 'Dẫn nhiệt rất tốt', explanation: 'Đồng có độ dẫn nhiệt cao (401 W/m·K), giúp tản nhiệt hiệu quả.', hint: 'Thermal conductivity' },
  { id: 64, category: 'ungdung', type: 'fill-blank', difficulty:2, question: 'Phương pháp bảo vệ sắt bằng cách nối với kim loại hoạt động hơn gọi là bảo vệ ___', correctAnswer: 'catot', acceptedAnswers: ['catot', 'cathodic', 'điện hóa'], explanation: 'Bảo vệ catot: kim loại hoạt động (như Zn) bị ăn mòn thay cho sắt.', hint: 'Cathodic protection' },
  { id: 65, category: 'ungdung', type: 'multiple-choice', difficulty:3, question: 'Tại sao dây dẫn điện cao thế dùng nhôm thay vì đồng?', options: ['Nhôm nhẹ hơn nhiều, tiết kiệm chi phí trụ', 'Nhôm dẫn điện tốt hơn đồng', 'Nhôm rẻ hơn 100 lần', 'Nhôm không bị ăn mòn'], correctAnswer: 'Nhôm nhẹ hơn nhiều, tiết kiệm chi phí trụ', explanation: 'Nhôm nhẹ hơn đồng ~3 lần, giảm tải trọng trụ điện và chi phí xây dựng.', hint: 'Trọng lượng và chi phí' },
  { id: 66, category: 'ungdung', type: 'multiple-choice', difficulty:2, question: 'Hợp kim nào được dùng làm dây mayso lò sưởi?', options: ['Nichrome (Ni-Cr)', 'Đồng thau', 'Thép cacbon', 'Bronze'], correctAnswer: 'Nichrome (Ni-Cr)', explanation: 'Nichrome có điện trở cao và chịu nhiệt tốt, phù hợp làm dây điện trở.', hint: 'Điện trở cao' },

  // ===== CHUỖI PHẢN ỨNG & NHẬN BIẾT (12 câu mới) =====
  { id: 67, category: 'phanung', type: 'multiple-choice', difficulty:2, question: 'Thuốc thử nào dùng để phân biệt dung dịch FeSO₄ và Fe₂(SO₄)₃?', options: ['Dung dịch NaOH', 'Dung dịch HCl', 'Dung dịch H₂SO₄', 'Quỳ tím'], correctAnswer: 'Dung dịch NaOH', explanation: 'NaOH tạo kết tủa trắng xanh với Fe²⁺ (hóa nâu trong không khí) và kết tủa nâu đỏ với Fe³⁺.', hint: 'Tạo kết tủa màu khác nhau' },
  { id: 68, category: 'phanung', type: 'fill-blank', difficulty:3, question: 'Trong chuỗi phản ứng: Fe → FeCl₂ → Fe(OH)₂ → Fe(OH)₃. Chất oxi hóa dùng để chuyển Fe(OH)₂ thành Fe(OH)₃ là ___ và H₂O.', correctAnswer: 'O2', acceptedAnswers: ['O2', 'oxi', 'oxygen', 'không khí'], explanation: '4Fe(OH)₂ + O₂ + 2H₂O → 4Fe(OH)₃ (kết tủa nâu đỏ).', hint: 'Có trong không khí' },
  { id: 69, category: 'phanung', type: 'multiple-choice', difficulty:2, question: 'Hiện tượng khi cho dây sắt vào dung dịch CuSO₄ là?', options: ['Dung dịch nhạt màu xanh, có kim loại đỏ bám vào sắt', 'Sắt tan, sủi bọt khí', 'Không có hiện tượng', 'Dung dịch chuyển sang màu vàng'], correctAnswer: 'Dung dịch nhạt màu xanh, có kim loại đỏ bám vào sắt', explanation: 'Fe + CuSO₄ → FeSO₄ + Cu. Fe tan, Cu đỏ bám vào, màu xanh của Cu²⁺ nhạt dần.', hint: 'Đẩy kim loại yếu hơn' },
  { id: 70, category: 'phanung', type: 'multiple-choice', difficulty:3, question: 'Để tách Ag ra khỏi hỗn hợp bột Ag và Cu, ta dùng dung dịch nào?', options: ['Fe(NO₃)₃ dư', 'HCl', 'HNO₃', 'AgNO₃'], correctAnswer: 'Fe(NO₃)₃ dư', explanation: 'Cu + 2Fe(NO₃)₃ → Cu(NO₃)₂ + 2Fe(NO₃)₂. Cu tan hết, Ag không phản ứng. Lọc lấy Ag.', hint: 'Hòa tan Cu mà không hòa tan Ag' },
  { id: 71, category: 'phanung', type: 'fill-blank', difficulty:2, question: 'Dung dịch làm quỳ tím hóa đỏ, tác dụng với Fe tạo khí H₂ là axit ___ (viết công thức)', correctAnswer: 'HCl', acceptedAnswers: ['HCl', 'H2SO4', 'H2SO4 loãng'], explanation: 'Axit mạnh như HCl hoặc H₂SO₄ loãng tác dụng với Fe giải phóng H₂.', hint: 'Axit clohidric' },
  { id: 72, category: 'phanung', type: 'multiple-choice', difficulty:3, question: 'Cho sơ đồ: Fe + X → FeCl₃. X là chất nào?', options: ['Cl₂', 'HCl', 'NaCl', 'CuCl₂'], correctAnswer: 'Cl₂', explanation: '2Fe + 3Cl₂ → 2FeCl₃. (Fe + HCl chỉ tạo FeCl₂).', hint: 'Chất oxi hóa mạnh' },
  { id: 73, category: 'phanung', type: 'multiple-choice', difficulty:2, question: 'Nhỏ từ từ dung dịch NH₃ đến dư vào dung dịch CuSO₄, hiện tượng là?', options: ['Kết tủa xanh lơ, sau đó tan tạo dung dịch xanh thẫm', 'Kết tủa xanh lơ không tan', 'Kết tủa trắng', 'Không hiện tượng'], correctAnswer: 'Kết tủa xanh lơ, sau đó tan tạo dung dịch xanh thẫm', explanation: 'Tạo Cu(OH)₂ kết tủa, sau đó tan tạo phức [Cu(NH₃)₄]²⁺ màu xanh thẫm.', hint: 'Tạo phức chất' },
  { id: 74, category: 'phanung', type: 'fill-blank', difficulty:3, question: 'Chất rắn màu đỏ thẫm, tan trong HCl tạo dung dịch màu xanh lá cây là ___ (công thức)', correctAnswer: 'Cu2O', acceptedAnswers: ['Cu2O'], explanation: 'Cu₂O (đỏ gạch) + 2HCl → 2CuCl (ít tan) + H₂O. Tuy nhiên trong môi trường HCl đặc/dư tạo phức H[CuCl₂] hoặc CuCl₂ do oxi hóa.', hint: 'Oxit đồng (I)' },
  { id: 75, category: 'phanung', type: 'multiple-choice', difficulty:2, question: 'Để bảo quản dung dịch FeSO₄ không bị chuyển thành Fe₂(SO₄)₃ trong không khí, người ta thêm vào?', options: ['Một đinh sắt sạch', 'Một lá đồng', 'Vài giọt HCl', 'Vài giọt NaOH'], correctAnswer: 'Một đinh sắt sạch', explanation: 'Fe + 2Fe³⁺ → 3Fe²⁺. Sắt dư sẽ khử Fe³⁺ (nếu sinh ra) trở lại Fe²⁺.', hint: 'Khử Fe3+ về Fe2+' },
  { id: 76, category: 'phanung', type: 'multiple-choice', difficulty:3, question: 'Phản ứng nào sau đây KHÔNG tạo ra muối sắt (III)?', options: ['Fe + S (t°)', 'Fe + Cl₂ (t°)', 'Fe + HNO₃ loãng dư', 'FeO + HNO₃ loãng'], correctAnswer: 'Fe + S (t°)', explanation: 'Fe + S → FeS (Sắt(II) sunfua). Các phản ứng còn lại đều tạo Fe(III).', hint: 'Lưu huỳnh là chất oxi hóa trung bình' },
  { id: 77, category: 'phanung', type: 'fill-blank', difficulty:2, question: 'Dung dịch muối sắt (III) làm quỳ tím hóa ___', correctAnswer: 'đỏ', acceptedAnswers: ['đỏ', 'hồng'], explanation: 'Muối Fe³⁺ bị thủy phân mạnh tạo môi trường axit: Fe³⁺ + 3H₂O ⇌ Fe(OH)₃ + 3H⁺.', hint: 'Môi trường axit' },
  { id: 78, category: 'phanung', type: 'multiple-choice', difficulty:3, question: 'Hỗn hợp tecmit dùng để hàn đường ray gồm bột nhôm và?', options: ['Fe₂O₃', 'CuO', 'Fe₃O₄', 'FeO'], correctAnswer: 'Fe₂O₃', explanation: 'Phản ứng nhiệt nhôm: 2Al + Fe₂O₃ → Al₂O₃ + 2Fe (nóng chảy).', hint: 'Oxit sắt' }
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

const Bai06_DaiCuongSatDong_HopKim = () => {
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
  const { hasProgress, savedProgress, saveProgress, clearProgress, completeChallenge } = useChallengeProgress('sat_dong_hopkim_12', { challengeId: 6, programId: 'chemistry', grade: 12 });

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
    <div className="kimloai-bg min-h-screen p-4 md:p-8 font-sans">
      <div className="max-w-6xl mx-auto">
        <header className="flex items-center justify-between mb-8 bg-white/10 backdrop-blur rounded-2xl p-4 border border-white/20">
          <div className="flex items-center gap-4">
            <Link to="/hoahoc/12" className="p-2 hover:bg-white/10 rounded-full transition-colors text-white"><ArrowLeft className="w-6 h-6" /></Link>
            <div>
              <h1 className="text-2xl font-bold text-white">Sắt - Đồng - Hợp kim</h1>
              <p className="text-blue-200 text-sm">Hóa học 12 • Chương 5</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 px-4 py-2 bg-yellow-500/20 rounded-full border border-yellow-500/30"><Trophy className="w-5 h-5 text-yellow-400" /><span className="font-bold text-yellow-200">{score} XP</span></div>
            <div className="flex items-center gap-2 px-4 py-2 bg-orange-500/20 rounded-full border border-orange-500/30"><Flame className="w-5 h-5 text-orange-400" /><span className="font-bold text-orange-200">{streak} Chuỗi</span></div>
          </div>
        </header>

        {!activeCategory ? (
          <div className="animate-fadeIn">
            <div className="stats-bar-kimloai mb-8">
              <div className="stat-item-kimloai"><CheckCircle2 className="w-5 h-5 text-green-400" /><span>Đã hoàn thành: <strong>{Object.values(categoryProgress).filter(p => p >= 80).length}/{CATEGORIES.length}</strong></span></div>
              <div className="stat-item-kimloai"><Award className="w-5 h-5 text-yellow-400" /><span>Điểm cao nhất: <strong>{highScore || 0}</strong></span></div>
            </div>
            {/* Progress Watermark */}
            <ProgressWatermark categoryProgress={categoryProgress} />
            <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2"><Target className="w-6 h-6" />Chọn chủ đề thử thách</h2>
            <div className="category-grid-kimloai">
              {CATEGORIES.map(cat => {
                const Icon = cat.icon; const catPercentage = categoryProgress[cat.id] || 0; const isCompleted = catPercentage >= 80; const isInProgress = catPercentage > 0 && catPercentage < 80;
                return (
                  <div key={cat.id} onClick={() => handleCategorySelect(cat.id)} className="category-card-kimloai group">
                    <div className={`category-icon-wrapper-kimloai ${isCompleted ? 'bg-green-500/20 text-green-400' : isInProgress ? 'bg-yellow-500/20 text-yellow-400' : ''}`} style={{ color: isCompleted || isInProgress ? undefined : cat.color }}><Icon className="w-8 h-8" />{catPercentage > 0 && <span className={`absolute -top-1 -right-1 text-xs font-bold px-1.5 py-0.5 rounded-full ${isCompleted ? 'bg-green-500 text-white' : 'bg-yellow-500 text-black'}`}>{catPercentage}%</span>}</div>
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
            <div className="progress-track-kimloai mb-6"><div className="progress-fill-kimloai" style={{ width: `${((currentQuestionIndex) / filteredQuestions.length) * 100}%` }} /></div>
            <div className="question-card-kimloai">
              <div className="question-header-kimloai"><span className={`difficulty-badge-kimloai ${currentQuestion.difficulty ===1 ? 'difficulty-easy' : currentQuestion.difficulty===2 ? 'difficulty-medium' : 'difficulty-hard'}`}>{currentQuestion.difficulty===1 ? 'Dễ' : currentQuestion.difficulty===2 ? 'Trung bình' : 'Khó'}</span><div className="flex gap-1">{[...Array(currentQuestion.difficulty)].map((_,i)=>(<Zap key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400"/>))}</div></div>
              <h3 className="text-xl md:text-2xl font-bold text-white mb-6 leading-relaxed">{currentQuestion.question}</h3>
              {currentQuestion.type === 'multiple-choice' ? (
                <div className="options-grid-kimloai">{currentQuestion.options.map((option, idx) => (<button key={idx} onClick={() => handleAnswerSubmit(option)} disabled={isCorrect !== null} className={`option-btn-kimloai ${selectedAnswer === option ? (isCorrect ? 'correct' : 'wrong') : (isCorrect !== null && option === currentQuestion.correctAnswer ? 'correct' : '')}`}><span className="font-medium">{String.fromCharCode(65+idx)}. {option}</span>{selectedAnswer === option && (isCorrect ? <CheckCircle2 className="w-5 h-5" /> : <XCircle className="w-5 h-5" />)}</button>))}</div>
              ) : (
                <div className="mb-8"><div className="flex gap-2"><input type="text" value={selectedAnswer} onChange={(e) => setSelectedAnswer(e.target.value)} disabled={isCorrect !== null} placeholder="Nhập câu trả lời của bạn..." className="flex-1 p-4 bg-white/5 border border-white/20 rounded-xl text-lg text-white focus:border-blue-500 focus:outline-none" onKeyDown={(e) => e.key === 'Enter' && handleAnswerSubmit(selectedAnswer)} /><button onClick={() => handleAnswerSubmit(selectedAnswer)} disabled={!selectedAnswer || isCorrect !== null} className="px-6 py-2 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed">Kiểm tra</button></div></div>
              )}
              {showExplanation && (
                <div className={`feedback-container-kimloai ${isCorrect ? 'feedback-correct' : 'feedback-wrong'}`}>
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

export default Bai06_DaiCuongSatDong_HopKim;
