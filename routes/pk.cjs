const express = require('express');
const router = express.Router();
const Room = require('../models/Room.cjs');
const User = require('../models/User.cjs');

// Ngân hàng câu hỏi PK theo lớp với nhiều loại game
const questionBanks = {
  8: [
    // Multiple Choice
    {
      type: 'multiple-choice',
      question: "Nguyên tử được cấu tạo bởi các hạt nào?",
      options: ["Proton và neutron", "Proton, neutron và electron", "Electron và neutron", "Chỉ có proton"],
      correctAnswer: 1,
      explanation: "Nguyên tử gồm hạt nhân (chứa proton và neutron) và vỏ electron."
    },
    {
      type: 'multiple-choice',
      question: "Công thức hóa học của nước là gì?",
      options: ["HO", "H2O", "H2O2", "OH"],
      correctAnswer: 1,
      explanation: "Nước có công thức H2O, gồm 2 nguyên tử Hydro và 1 nguyên tử Oxy."
    },
    {
      type: 'multiple-choice',
      question: "Phản ứng hóa học là gì?",
      options: ["Sự thay đổi trạng thái của chất", "Sự biến đổi chất này thành chất khác", "Sự hòa tan chất vào nước", "Sự bay hơi của chất"],
      correctAnswer: 1,
      explanation: "Phản ứng hóa học là quá trình biến đổi chất này thành chất khác."
    },
    // True/False
    {
      type: 'true-false',
      question: "Oxi chiếm tỉ lệ lớn nhất trong không khí?",
      correctAnswer: false,
      explanation: "Nitơ (N2) chiếm khoảng 78% không khí, còn Oxi chỉ chiếm khoảng 21%."
    },
    {
      type: 'true-false',
      question: "Nước là hợp chất được tạo từ Hydro và Oxi?",
      correctAnswer: true,
      explanation: "Nước H2O gồm 2 nguyên tử Hydro và 1 nguyên tử Oxi."
    },
    {
      type: 'true-false',
      question: "Fe là ký hiệu hóa học của Sắt?",
      correctAnswer: true,
      explanation: "Fe (Ferrum trong tiếng Latin) là ký hiệu hóa học của Sắt."
    },
    // True/False
    {
      type: 'true-false',
      question: "Khối lượng mol của H2SO4 là 98 g/mol",
      correctAnswer: true,
      explanation: "M(H2SO4) = 2×1 + 32 + 4×16 = 98 g/mol"
    },
    {
      type: 'true-false',
      question: "Công thức hóa học của muối ăn là KCl",
      correctAnswer: false,
      explanation: "Muối ăn là Natri clorua với công thức NaCl, không phải KCl."
    },
    // Ordering
    {
      type: 'ordering',
      question: "Sắp xếp theo thứ tự khối lượng mol tăng dần:",
      correctOrder: ["H2", "H2O", "CO2", "H2SO4"],
      explanation: "H2 (2) < H2O (18) < CO2 (44) < H2SO4 (98)"
    },
    // Matching
    {
      type: 'matching',
      question: "Ghép công thức với tên gọi đúng:",
      pairs: [
        { left: "H2O", right: "Nước" },
        { left: "NaCl", right: "Muối ăn" },
        { left: "HCl", right: "Axit clohidric" },
        { left: "NaOH", right: "Natri hidroxit" }
      ],
      explanation: "Đây là các công thức hóa học thường gặp trong chương trình lớp 8."
    },
    {
      type: 'multiple-choice',
      question: "Khối lượng mol của H2SO4 là bao nhiêu?",
      options: ["96 g/mol", "98 g/mol", "100 g/mol", "94 g/mol"],
      correctAnswer: 1,
      explanation: "M(H2SO4) = 2×1 + 32 + 4×16 = 98 g/mol"
    },
    {
      type: 'multiple-choice',
      question: "Chất nào sau đây là oxit bazơ?",
      options: ["CO2", "SO2", "CaO", "P2O5"],
      correctAnswer: 2,
      explanation: "CaO là oxit bazơ vì tác dụng với nước tạo bazơ Ca(OH)2."
    },
    {
      type: 'multiple-choice',
      question: "Axit clohidric có công thức là gì?",
      options: ["HCl", "H2SO4", "HNO3", "H3PO4"],
      correctAnswer: 0,
      explanation: "Axit clohidric có công thức HCl."
    },
    {
      type: 'multiple-choice',
      question: "Phương trình hóa học nào sau đây đã cân bằng?",
      options: ["H2 + O2 → H2O", "2H2 + O2 → 2H2O", "H2 + O → H2O", "H + O2 → H2O"],
      correctAnswer: 1,
      explanation: "2H2 + O2 → 2H2O có số nguyên tử mỗi nguyên tố bằng nhau ở 2 vế."
    },
    {
      type: 'multiple-choice',
      question: "Khí nào chiếm tỉ lệ lớn nhất trong không khí?",
      options: ["Oxi", "Nitơ", "Cacbon dioxit", "Argon"],
      correctAnswer: 1,
      explanation: "Nitơ chiếm khoảng 78% thể tích không khí."
    }
  ],
  9: [
    // Multiple Choice
    {
      type: 'multiple-choice',
      question: "Kim loại nào dẫn điện tốt nhất?",
      options: ["Vàng", "Bạc", "Đồng", "Nhôm"],
      correctAnswer: 1,
      explanation: "Bạc là kim loại dẫn điện tốt nhất."
    },
    {
      type: 'multiple-choice',
      question: "Phi kim nào có tính oxi hóa mạnh nhất?",
      options: ["Oxi", "Clo", "Flo", "Brom"],
      correctAnswer: 2,
      explanation: "Flo có độ âm điện lớn nhất nên có tính oxi hóa mạnh nhất."
    },
    // True/False
    {
      type: 'true-false',
      question: "Natri (Na) có thể tác dụng với nước ở nhiệt độ thường?",
      correctAnswer: true,
      explanation: "Na là kim loại kiềm, rất hoạt động, tác dụng mạnh với nước: 2Na + 2H2O → 2NaOH + H2."
    },
    {
      type: 'true-false',
      question: "Metan (CH4) là hidrocacbon không no?",
      correctAnswer: false,
      explanation: "Metan CH4 là hidrocacbon no (ankan) vì chỉ có liên kết đơn C-H."
    },
    // True/False
    {
      type: 'true-false',
      question: "Công thức của etanol (rượu etylic) là C2H5OH",
      correctAnswer: true,
      explanation: "Etanol có công thức C2H5OH."
    },
    // Matching
    {
      type: 'matching',
      question: "Ghép kim loại với tính chất đặc trưng:",
      pairs: [
        { left: "Bạc (Ag)", right: "Dẫn điện tốt nhất" },
        { left: "Vàng (Au)", right: "Không bị oxi hóa trong không khí" },
        { left: "Nhôm (Al)", right: "Nhẹ, bền với không khí" },
        { left: "Sắt (Fe)", right: "Dễ bị gỉ trong không khí ẩm" }
      ],
      explanation: "Mỗi kim loại có tính chất đặc trưng riêng."
    },
    // Ordering
    {
      type: 'ordering',
      question: "Sắp xếp dãy hoạt động hóa học của kim loại từ mạnh đến yếu:",
      correctOrder: ["K", "Na", "Mg", "Al", "Fe", "Cu"],
      explanation: "Dãy hoạt động hóa học: K > Na > Mg > Al > Zn > Fe > Ni > Sn > Pb > H > Cu > Hg > Ag > Pt > Au"
    },
    {
      type: 'multiple-choice',
      question: "Công thức của metan là gì?",
      options: ["C2H6", "CH4", "C2H4", "C2H2"],
      correctAnswer: 1,
      explanation: "Metan là hidrocacbon đơn giản nhất với công thức CH4."
    },
    {
      type: 'multiple-choice',
      question: "Axit axetic có công thức là gì?",
      options: ["HCOOH", "CH3COOH", "C2H5OH", "CH3OH"],
      correctAnswer: 1,
      explanation: "Axit axetic (giấm) có công thức CH3COOH."
    },
    {
      type: 'multiple-choice',
      question: "Chất nào là polime?",
      options: ["Etilen", "Glucozơ", "Polietilen", "Axit axetic"],
      correctAnswer: 2,
      explanation: "Polietilen là polime được tạo từ nhiều phân tử etilen."
    },
    {
      type: 'multiple-choice',
      question: "Sắt tác dụng với dung dịch CuSO4 tạo ra sản phẩm gì?",
      options: ["FeSO4 + Cu", "Fe2(SO4)3 + Cu", "FeSO4 + CuO", "Không phản ứng"],
      correctAnswer: 0,
      explanation: "Fe + CuSO4 → FeSO4 + Cu (Sắt đẩy đồng ra khỏi dung dịch muối)."
    }
  ],
  10: [
    // Multiple Choice
    {
      type: 'multiple-choice',
      question: "Số hiệu nguyên tử cho biết điều gì?",
      options: ["Số neutron", "Số proton", "Số electron hóa trị", "Khối lượng nguyên tử"],
      correctAnswer: 1,
      explanation: "Số hiệu nguyên tử Z = số proton = số electron (nguyên tử trung hòa)."
    },
    {
      type: 'multiple-choice',
      question: "Nguyên tố nào thuộc nhóm halogen?",
      options: ["Oxi", "Clo", "Nitơ", "Lưu huỳnh"],
      correctAnswer: 1,
      explanation: "Clo thuộc nhóm VIIA (halogen) gồm F, Cl, Br, I, At."
    },
    // True/False
    {
      type: 'true-false',
      question: "Liên kết ion được hình thành do sự dùng chung electron?",
      correctAnswer: false,
      explanation: "Liên kết ion hình thành do lực hút tĩnh điện giữa các ion trái dấu. Liên kết cộng hóa trị mới do dùng chung electron."
    },
    {
      type: 'true-false',
      question: "Phản ứng oxi hóa khử luôn có sự thay đổi số oxi hóa?",
      correctAnswer: true,
      explanation: "Đặc trưng của phản ứng oxi hóa khử là có sự thay đổi số oxi hóa của các nguyên tố."
    },
    // True/False
    {
      type: 'true-false',
      question: "Số oxi hóa của Mn trong KMnO4 là +7",
      correctAnswer: true,
      explanation: "K(+1) + Mn(x) + 4×O(-2) = 0 → x = +7"
    },
    {
      type: 'true-false',
      question: "Cấu hình electron của Na (Z=11) là 1s²2s²2p⁶3s²",
      correctAnswer: false,
      explanation: "Na có 11 electron, cấu hình đúng là: 1s²2s²2p⁶3s¹ (không phải 3s²)"
    },
    // Matching
    {
      type: 'matching',
      question: "Ghép loại liên kết với đặc điểm:",
      pairs: [
        { left: "Liên kết ion", right: "Cho nhận electron" },
        { left: "Liên kết cộng hóa trị", right: "Dùng chung electron" },
        { left: "Liên kết kim loại", right: "Electron tự do" },
        { left: "Liên kết hydrogen", right: "Tương tác yếu" }
      ],
      explanation: "Mỗi loại liên kết có cơ chế hình thành khác nhau."
    },
    // Ordering
    {
      type: 'ordering',
      question: "Sắp xếp các lớp electron theo thứ tự năng lượng tăng dần:",
      correctOrder: ["1s", "2s", "2p", "3s", "3p"],
      explanation: "Theo quy tắc Klechkowski: 1s < 2s < 2p < 3s < 3p < 4s < 3d..."
    },
    {
      type: 'multiple-choice',
      question: "Liên kết cộng hóa trị là gì?",
      options: ["Liên kết do lực hút tĩnh điện", "Liên kết do dùng chung electron", "Liên kết do cho nhận electron", "Liên kết kim loại"],
      correctAnswer: 1,
      explanation: "Liên kết cộng hóa trị hình thành do sự dùng chung cặp electron."
    },
    {
      type: 'multiple-choice',
      question: "Số oxi hóa của Mn trong KMnO4 là bao nhiêu?",
      options: ["+4", "+5", "+6", "+7"],
      correctAnswer: 3,
      explanation: "K(+1) + Mn(x) + 4×O(-2) = 0 → x = +7"
    },
    {
      type: 'multiple-choice',
      question: "Axit nào sau đây là axit mạnh?",
      options: ["CH3COOH", "H2CO3", "HCl", "H2S"],
      correctAnswer: 2,
      explanation: "HCl là axit mạnh, phân li hoàn toàn trong nước."
    }
  ],
  11: [
    // Multiple Choice
    {
      type: 'multiple-choice',
      question: "Nitơ có số oxi hóa bao nhiêu trong NH3?",
      options: ["+3", "-3", "0", "+5"],
      correctAnswer: 1,
      explanation: "Trong NH3: N(x) + 3×H(+1) = 0 → x = -3"
    },
    // True/False
    {
      type: 'true-false',
      question: "Anken có liên kết đôi C=C trong phân tử?",
      correctAnswer: true,
      explanation: "Anken là hidrocacbon không no có một liên kết đôi C=C."
    },
    {
      type: 'true-false',
      question: "Phenol có tính bazơ mạnh?",
      correctAnswer: false,
      explanation: "Phenol C6H5OH có tính axit yếu, không phải tính bazơ."
    },
    // True/False
    {
      type: 'true-false',
      question: "Công thức chung của ankan là CnH2n+2 (n≥1)",
      correctAnswer: true,
      explanation: "Ankan có công thức chung CnH2n+2 (n≥1)."
    },
    // Matching
    {
      type: 'matching',
      question: "Ghép hợp chất hữu cơ với nhóm chức:",
      pairs: [
        { left: "Ancol", right: "-OH (gắn với C no)" },
        { left: "Andehit", right: "-CHO" },
        { left: "Axit cacboxylic", right: "-COOH" },
        { left: "Este", right: "-COO-" }
      ],
      explanation: "Mỗi loại hợp chất hữu cơ có nhóm chức đặc trưng."
    },
    // Ordering
    {
      type: 'ordering',
      question: "Sắp xếp theo độ linh động của nguyên tử H trong nhóm -OH:",
      correctOrder: ["Phenol", "Ancol", "Nước"],
      explanation: "Phenol > Ancol > Nước (do ảnh hưởng của vòng benzen)."
    },
    {
      type: 'multiple-choice',
      question: "Sản phẩm của phản ứng este hóa giữa axit axetic và etanol là gì?",
      options: ["Etyl axetat", "Metyl axetat", "Etyl fomat", "Metyl fomat"],
      correctAnswer: 0,
      explanation: "CH3COOH + C2H5OH → CH3COOC2H5 (etyl axetat) + H2O"
    },
    {
      type: 'multiple-choice',
      question: "Anken là hidrocacbon có đặc điểm gì?",
      options: ["Có liên kết ba", "Có liên kết đôi C=C", "Chỉ có liên kết đơn", "Có vòng benzen"],
      correctAnswer: 1,
      explanation: "Anken là hidrocacbon không no có một liên kết đôi C=C trong phân tử."
    },
    {
      type: 'multiple-choice',
      question: "Phenol có tính chất gì đặc trưng?",
      options: ["Tính bazơ mạnh", "Tính axit yếu", "Tính trung tính", "Tính oxi hóa mạnh"],
      correctAnswer: 1,
      explanation: "Phenol C6H5OH có tính axit yếu do nhóm -OH liên kết với vòng benzen."
    },
    {
      type: 'multiple-choice',
      question: "Phản ứng tráng gương dùng để nhận biết chất nào?",
      options: ["Ancol", "Andehit", "Axit cacboxylic", "Xeton"],
      correctAnswer: 1,
      explanation: "Phản ứng tráng gương đặc trưng cho andehit (nhóm -CHO)."
    }
  ],
  12: [
    // Multiple Choice
    {
      type: 'multiple-choice',
      question: "Este có công thức tổng quát là gì?",
      options: ["R-OH", "R-CHO", "R-COOR'", "R-COOH"],
      correctAnswer: 2,
      explanation: "Este có công thức tổng quát RCOOR' (R-COO-R')."
    },
    // True/False
    {
      type: 'true-false',
      question: "Amino axit có tính lưỡng tính?",
      correctAnswer: true,
      explanation: "Amino axit có cả nhóm -NH2 (bazơ) và -COOH (axit) nên có tính lưỡng tính."
    },
    {
      type: 'true-false',
      question: "Kim loại kiềm thổ thuộc nhóm IA?",
      correctAnswer: false,
      explanation: "Kim loại kiềm thổ thuộc nhóm IIA. Kim loại kiềm mới thuộc nhóm IA."
    },
    // True/False
    {
      type: 'true-false',
      question: "Sắt có thể tạo ra 3 loại oxit: FeO, Fe2O3, Fe3O4",
      correctAnswer: true,
      explanation: "Sắt tạo 3 loại oxit: FeO, Fe2O3, Fe3O4."
    },
    // Matching
    {
      type: 'matching',
      question: "Ghép polime với phản ứng điều chế:",
      pairs: [
        { left: "PE (Polietilen)", right: "Trùng hợp" },
        { left: "PVC", right: "Trùng hợp" },
        { left: "Nilon-6,6", right: "Trùng ngưng" },
        { left: "Tơ lapsan", right: "Trùng ngưng" }
      ],
      explanation: "PE, PVC điều chế bằng trùng hợp. Nilon, tơ lapsan bằng trùng ngưng."
    },
    // Ordering
    {
      type: 'ordering',
      question: "Sắp xếp kim loại theo tính khử giảm dần:",
      correctOrder: ["K", "Na", "Mg", "Al", "Fe"],
      explanation: "K > Na > Mg > Al > Zn > Fe > Cu > Ag > Au"
    },
    {
      type: 'multiple-choice',
      question: "Phản ứng thủy phân este trong môi trường kiềm gọi là gì?",
      options: ["Este hóa", "Xà phòng hóa", "Trùng hợp", "Trùng ngưng"],
      correctAnswer: 1,
      explanation: "Phản ứng thủy phân este trong môi trường kiềm gọi là phản ứng xà phòng hóa."
    },
    {
      type: 'multiple-choice',
      question: "Tinh bột thuộc loại cacbohidrat nào?",
      options: ["Monosaccarit", "Đisaccarit", "Polisaccarit", "Oligosaccarit"],
      correctAnswer: 2,
      explanation: "Tinh bột là polisaccarit, gồm nhiều gốc glucozơ liên kết với nhau."
    },
    {
      type: 'multiple-choice',
      question: "Polime được tạo thành bằng phản ứng gì?",
      options: ["Phản ứng thế", "Phản ứng cộng", "Phản ứng trùng hợp hoặc trùng ngưng", "Phản ứng phân hủy"],
      correctAnswer: 2,
      explanation: "Polime được tạo thành bằng phản ứng trùng hợp hoặc trùng ngưng."
    },
    {
      type: 'multiple-choice',
      question: "Kim loại kiềm thuộc nhóm nào trong bảng tuần hoàn?",
      options: ["IA", "IIA", "IIIA", "IVA"],
      correctAnswer: 0,
      explanation: "Kim loại kiềm (Li, Na, K, Rb, Cs, Fr) thuộc nhóm IA."
    }
  ]
};

// Lấy câu hỏi ngẫu nhiên cho phòng với đa dạng loại game
function getRandomQuestions(grade, count) {
  const questions = questionBanks[grade] || questionBanks[8];
  const shuffled = [...questions].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, Math.min(count, shuffled.length));
}

// Tạo phòng mới
router.post('/create', async (req, res) => {
  try {
    const { userId, username, avatar, mode, name, grade, questionCount, timePerQuestion, maxPlayers } = req.body;
    
    console.log('📥 Create room request:', { userId, username, mode, name, grade });
    
    if (!userId || !username || !mode) {
      console.log('❌ Missing required fields:', { userId: !!userId, username: !!username, mode: !!mode });
      return res.status(400).json({ message: 'Thiếu thông tin bắt buộc' });
    }

    const roomCode = await Room.generateRoomCode();
    const questions = getRandomQuestions(grade || 8, questionCount || 10);

    const room = new Room({
      roomCode,
      name: name || `Phòng của ${username}`,
      host: userId,
      mode,
      maxPlayers: mode === 'v1v1' ? 2 : (maxPlayers || 4),
      grade: grade || 8,
      questionCount: questionCount || 10,
      timePerQuestion: timePerQuestion || 30,
      questions,
      players: [{
        oderId: userId,
        odername: username,
        avatar: avatar || '',
        isReady: true // Host luôn sẵn sàng
      }]
    });

    await room.save();

    res.status(201).json({
      message: 'Tạo phòng thành công',
      room: {
        _id: room._id,
        roomCode: room.roomCode,
        name: room.name,
        mode: room.mode,
        status: room.status,
        maxPlayers: room.maxPlayers,
        players: room.players,
        grade: room.grade,
        questionCount: room.questionCount,
        timePerQuestion: room.timePerQuestion,
        host: room.host
      }
    });
  } catch (error) {
    console.error('Error creating room:', error);
    // Check if it's a Mongoose validation error
    if (error.name === 'ValidationError') {
      return res.status(400).json({ message: 'Dữ liệu không hợp lệ', error: error.message });
    }
    res.status(500).json({ message: 'Lỗi tạo phòng', error: error.message });
  }
});

// Lấy danh sách phòng đang chờ
router.get('/available', async (req, res) => {
  try {
    const { mode, grade } = req.query;
    
    const query = { status: 'waiting' };
    if (mode) query.mode = mode;
    if (grade) query.grade = parseInt(grade);

    const rooms = await Room.find(query)
      .select('roomCode name mode maxPlayers players grade questionCount timePerQuestion host createdAt')
      .sort({ createdAt: -1 })
      .limit(20);

    // Filter out full rooms
    const availableRooms = rooms.filter(room => room.players.length < room.maxPlayers);

    res.json(availableRooms);
  } catch (error) {
    console.error('Error fetching rooms:', error);
    res.status(500).json({ message: 'Lỗi lấy danh sách phòng', error: error.message });
  }
});

// Tham gia phòng bằng mã
router.post('/join', async (req, res) => {
  try {
    const { roomCode, userId, username, avatar } = req.body;
    
    console.log('📥 Join room request:', { roomCode, userId, username });

    if (!roomCode || !userId || !username) {
      console.log('❌ Missing required fields for join:', { roomCode: !!roomCode, userId: !!userId, username: !!username });
      return res.status(400).json({ message: 'Thiếu thông tin bắt buộc' });
    }

    const room = await Room.findOne({ roomCode: roomCode.toUpperCase(), status: 'waiting' });

    if (!room) {
      return res.status(404).json({ message: 'Không tìm thấy phòng hoặc phòng đã bắt đầu' });
    }

    if (room.isFull()) {
      return res.status(400).json({ message: 'Phòng đã đầy' });
    }

    // Check if player already in room
    const existingPlayer = room.players.find(p => p.oderId?.toString() === userId);
    if (existingPlayer) {
      console.log('❌ Player already in room:', { oderId: existingPlayer.oderId, userId });
      return res.status(400).json({ message: 'Bạn đã ở trong phòng này' });
    }

    room.players.push({
      oderId: userId,
      odername: username,
      avatar: avatar || '',
      isReady: false
    });

    await room.save();

    res.json({
      message: 'Tham gia phòng thành công',
      room: {
        _id: room._id,
        roomCode: room.roomCode,
        name: room.name,
        mode: room.mode,
        status: room.status,
        maxPlayers: room.maxPlayers,
        players: room.players,
        grade: room.grade,
        questionCount: room.questionCount,
        timePerQuestion: room.timePerQuestion,
        host: room.host
      }
    });
  } catch (error) {
    console.error('Error joining room:', error);
    res.status(500).json({ message: 'Lỗi tham gia phòng', error: error.message });
  }
});

// Lấy thông tin phòng
router.get('/:roomCode', async (req, res) => {
  try {
    const room = await Room.findOne({ roomCode: req.params.roomCode.toUpperCase() });

    if (!room) {
      return res.status(404).json({ message: 'Không tìm thấy phòng' });
    }

    // Don't send questions to client if game hasn't started
    const roomData = room.toObject();
    if (room.status === 'waiting') {
      delete roomData.questions;
    }

    res.json(roomData);
  } catch (error) {
    console.error('Error fetching room:', error);
    res.status(500).json({ message: 'Lỗi lấy thông tin phòng', error: error.message });
  }
});

// Cập nhật trạng thái sẵn sàng
router.post('/:roomCode/ready', async (req, res) => {
  try {
    const { userId, isReady } = req.body;
    const room = await Room.findOne({ roomCode: req.params.roomCode.toUpperCase(), status: 'waiting' });

    if (!room) {
      return res.status(404).json({ message: 'Không tìm thấy phòng' });
    }

    const player = room.players.find(p => p.oderId.toString() === userId);
    if (!player) {
      return res.status(404).json({ message: 'Bạn không ở trong phòng này' });
    }

    player.isReady = isReady;
    await room.save();

    res.json({
      message: 'Cập nhật trạng thái thành công',
      players: room.players,
      allReady: room.allPlayersReady()
    });
  } catch (error) {
    console.error('Error updating ready status:', error);
    res.status(500).json({ message: 'Lỗi cập nhật trạng thái', error: error.message });
  }
});

// Bắt đầu trận đấu (chỉ host)
router.post('/:roomCode/start', async (req, res) => {
  try {
    const { userId } = req.body;
    const room = await Room.findOne({ roomCode: req.params.roomCode.toUpperCase(), status: 'waiting' });

    if (!room) {
      return res.status(404).json({ message: 'Không tìm thấy phòng' });
    }

    if (room.host.toString() !== userId) {
      return res.status(403).json({ message: 'Chỉ chủ phòng mới có thể bắt đầu trận đấu' });
    }

    if (room.players.length < 2) {
      return res.status(400).json({ message: 'Cần ít nhất 2 người chơi để bắt đầu' });
    }

    if (!room.allPlayersReady()) {
      return res.status(400).json({ message: 'Tất cả người chơi phải sẵn sàng' });
    }

    room.status = 'playing';
    room.startedAt = new Date();
    room.currentQuestion = 0;
    await room.save();

    res.json({
      message: 'Trận đấu bắt đầu',
      room: {
        ...room.toObject(),
        questions: room.questions // Send questions when game starts
      }
    });
  } catch (error) {
    console.error('Error starting game:', error);
    res.status(500).json({ message: 'Lỗi bắt đầu trận đấu', error: error.message });
  }
});

// Lấy điểm realtime của tất cả người chơi
router.get('/:roomCode/scores', async (req, res) => {
  try {
    const room = await Room.findOne({ roomCode: req.params.roomCode.toUpperCase() });

    if (!room) {
      return res.status(404).json({ message: 'Không tìm thấy phòng' });
    }

    // Return players with their scores, sorted by score descending
    const players = room.players
      .map(p => ({
        oderId: p.oderId,
        odername: p.odername,
        avatar: p.avatar,
        score: p.score,
        correctAnswers: p.correctAnswers,
        isFinished: p.isFinished
      }))
      .sort((a, b) => b.score - a.score);

    res.json({ players });
  } catch (error) {
    console.error('Error fetching scores:', error);
    res.status(500).json({ message: 'Lỗi lấy điểm', error: error.message });
  }
});

// Gửi câu trả lời
router.post('/:roomCode/answer', async (req, res) => {
  try {
    const { userId, questionIndex, answer, timeTaken } = req.body;
    const room = await Room.findOne({ roomCode: req.params.roomCode.toUpperCase(), status: 'playing' });

    if (!room) {
      return res.status(404).json({ message: 'Không tìm thấy phòng hoặc trận đấu chưa bắt đầu' });
    }

    const player = room.players.find(p => p.oderId.toString() === userId);
    if (!player) {
      return res.status(404).json({ message: 'Bạn không ở trong phòng này' });
    }

    const question = room.questions[questionIndex];
    if (!question) {
      return res.status(400).json({ message: 'Câu hỏi không hợp lệ' });
    }

    // Check answer based on question type
    let isCorrect = false;
    const questionType = question.type || 'multiple-choice';
    
    switch (questionType) {
      case 'multiple-choice':
      case 'true-false':
        isCorrect = answer === question.correctAnswer;
        break;
        
      case 'fill-in-blank':
        // Case-insensitive comparison, trim whitespace
        isCorrect = answer?.toString().trim().toLowerCase() === 
                   question.correctAnswer?.toString().trim().toLowerCase();
        break;
        
      case 'matching':
        // answer is an object like { "H2O": "Nước", "NaCl": "Muối ăn" }
        // pairs is an array like [{ left: "H2O", right: "Nước" }, ...]
        if (question.pairs && typeof answer === 'object') {
          const correctPairs = {};
          question.pairs.forEach(pair => {
            correctPairs[pair.left] = pair.right;
          });
          
          // Check if all pairs match
          isCorrect = Object.keys(correctPairs).length === Object.keys(answer).length &&
                     Object.keys(correctPairs).every(key => answer[key] === correctPairs[key]);
        }
        break;
        
      case 'ordering':
        // answer is an array, correctOrder is an array
        if (Array.isArray(answer) && Array.isArray(question.correctOrder)) {
          isCorrect = answer.length === question.correctOrder.length &&
                     answer.every((item, index) => item === question.correctOrder[index]);
        }
        break;
        
      case 'drag-drop':
        // answer is an object mapping slot IDs to values
        if (question.slots && question.choices && typeof answer === 'object') {
          // For inline drag-drop, check if slots are filled correctly
          // This depends on how correctAnswer is structured
          if (Array.isArray(question.correctAnswer)) {
            const answerValues = Object.values(answer);
            isCorrect = question.correctAnswer.every((correct, index) => 
              answerValues[index] === correct
            );
          } else if (typeof question.correctAnswer === 'object') {
            isCorrect = Object.keys(question.correctAnswer).every(key => 
              answer[key] === question.correctAnswer[key]
            );
          }
        }
        break;
        
      default:
        isCorrect = answer === question.correctAnswer;
    }
    
    if (isCorrect) {
      // Tính điểm dựa trên thời gian trả lời (càng nhanh càng nhiều điểm)
      const timeBonus = Math.max(0, room.timePerQuestion - timeTaken);
      const points = 100 + timeBonus * 2;
      player.score += points;
      player.correctAnswers += 1;
    }

    await room.save();

    res.json({
      isCorrect,
      correctAnswer: question.correctAnswer || question.correctOrder || question.pairs,
      explanation: question.explanation,
      playerScore: player.score,
      playerCorrectAnswers: player.correctAnswers
    });
  } catch (error) {
    console.error('Error submitting answer:', error);
    res.status(500).json({ message: 'Lỗi gửi câu trả lời', error: error.message });
  }
});

// Đánh dấu người chơi đã hoàn thành
router.post('/:roomCode/player-finish', async (req, res) => {
  try {
    const { userId } = req.body;
    const room = await Room.findOne({ roomCode: req.params.roomCode.toUpperCase(), status: 'playing' });

    if (!room) {
      return res.status(404).json({ message: 'Không tìm thấy phòng' });
    }

    const player = room.players.find(p => p.oderId.toString() === userId);
    if (!player) {
      return res.status(404).json({ message: 'Bạn không ở trong phòng này' });
    }

    player.isFinished = true;
    await room.save();

    // Check if all players finished
    const allFinished = room.players.every(p => p.isFinished);
    
    if (allFinished) {
      // Auto finish the room
      const results = room.players
        .map(p => ({
          oderId: p.oderId,
          odername: p.odername,
          score: p.score,
          correctAnswers: p.correctAnswers,
          timeTaken: Date.now() - room.startedAt.getTime()
        }))
        .sort((a, b) => b.score - a.score)
        .map((r, index) => ({ ...r, rank: index + 1 }));

      room.status = 'finished';
      room.finishedAt = new Date();
      room.results = results;
      await room.save();

      // Update user stats
      for (const result of results) {
        try {
          await User.findByIdAndUpdate(result.oderId, {
            $inc: {
              totalScore: result.score,
              xp: Math.floor(result.score / 10)
            }
          });
        } catch (e) {
          console.error('Error updating user stats:', e);
        }
      }

      return res.json({
        message: 'Tất cả đã hoàn thành',
        allFinished: true,
        results
      });
    }

    res.json({
      message: 'Đã đánh dấu hoàn thành',
      allFinished: false,
      finishedCount: room.players.filter(p => p.isFinished).length,
      totalPlayers: room.players.length
    });
  } catch (error) {
    console.error('Error marking player finish:', error);
    res.status(500).json({ message: 'Lỗi đánh dấu hoàn thành', error: error.message });
  }
});

// Kết thúc trận đấu
router.post('/:roomCode/finish', async (req, res) => {
  try {
    const room = await Room.findOne({ roomCode: req.params.roomCode.toUpperCase(), status: 'playing' });

    if (!room) {
      return res.status(404).json({ message: 'Không tìm thấy phòng' });
    }

    // Calculate results
    const results = room.players
      .map(p => ({
        oderId: p.oderId,
        odername: p.odername,
        score: p.score,
        correctAnswers: p.correctAnswers,
        timeTaken: Date.now() - room.startedAt.getTime()
      }))
      .sort((a, b) => b.score - a.score)
      .map((r, index) => ({ ...r, rank: index + 1 }));

    room.status = 'finished';
    room.finishedAt = new Date();
    room.results = results;
    await room.save();

    // Update user stats
    for (const result of results) {
      try {
        await User.findByIdAndUpdate(result.oderId, {
          $inc: {
            totalScore: result.score,
            xp: Math.floor(result.score / 10)
          }
        });
      } catch (e) {
        console.error('Error updating user stats:', e);
      }
    }

    res.json({
      message: 'Trận đấu kết thúc',
      results
    });
  } catch (error) {
    console.error('Error finishing game:', error);
    res.status(500).json({ message: 'Lỗi kết thúc trận đấu', error: error.message });
  }
});

// Rời phòng
router.post('/:roomCode/leave', async (req, res) => {
  try {
    const { userId } = req.body;
    const room = await Room.findOne({ roomCode: req.params.roomCode.toUpperCase() });

    if (!room) {
      return res.status(404).json({ message: 'Không tìm thấy phòng' });
    }

    // Remove player from room
    room.players = room.players.filter(p => p.oderId.toString() !== userId);

    // If host leaves, assign new host or delete room
    if (room.host.toString() === userId) {
      if (room.players.length > 0) {
        room.host = room.players[0].oderId;
      } else {
        await Room.deleteOne({ _id: room._id });
        return res.json({ message: 'Phòng đã bị xóa vì không còn người chơi' });
      }
    }

    await room.save();

    res.json({
      message: 'Rời phòng thành công',
      room: {
        ...room.toObject(),
        questions: undefined
      }
    });
  } catch (error) {
    console.error('Error leaving room:', error);
    res.status(500).json({ message: 'Lỗi rời phòng', error: error.message });
  }
});

module.exports = router;
