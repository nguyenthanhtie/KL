const express = require('express');
const router = express.Router();
const Room = require('../models/Room.cjs');
const User = require('../models/User.cjs');

// Ngân hàng câu hỏi PK theo lớp
const questionBanks = {
  8: [
    {
      question: "Nguyên tử được cấu tạo bởi các hạt nào?",
      options: ["Proton và neutron", "Proton, neutron và electron", "Electron và neutron", "Chỉ có proton"],
      correctAnswer: 1,
      explanation: "Nguyên tử gồm hạt nhân (chứa proton và neutron) và vỏ electron."
    },
    {
      question: "Công thức hóa học của nước là gì?",
      options: ["HO", "H2O", "H2O2", "OH"],
      correctAnswer: 1,
      explanation: "Nước có công thức H2O, gồm 2 nguyên tử Hydro và 1 nguyên tử Oxy."
    },
    {
      question: "Phản ứng hóa học là gì?",
      options: ["Sự thay đổi trạng thái của chất", "Sự biến đổi chất này thành chất khác", "Sự hòa tan chất vào nước", "Sự bay hơi của chất"],
      correctAnswer: 1,
      explanation: "Phản ứng hóa học là quá trình biến đổi chất này thành chất khác."
    },
    {
      question: "Khối lượng mol của H2SO4 là bao nhiêu?",
      options: ["96 g/mol", "98 g/mol", "100 g/mol", "94 g/mol"],
      correctAnswer: 1,
      explanation: "M(H2SO4) = 2×1 + 32 + 4×16 = 98 g/mol"
    },
    {
      question: "Chất nào sau đây là oxit bazơ?",
      options: ["CO2", "SO2", "CaO", "P2O5"],
      correctAnswer: 2,
      explanation: "CaO là oxit bazơ vì tác dụng với nước tạo bazơ Ca(OH)2."
    },
    {
      question: "Axit clohidric có công thức là gì?",
      options: ["HCl", "H2SO4", "HNO3", "H3PO4"],
      correctAnswer: 0,
      explanation: "Axit clohidric có công thức HCl."
    },
    {
      question: "Phương trình hóa học nào sau đây đã cân bằng?",
      options: ["H2 + O2 → H2O", "2H2 + O2 → 2H2O", "H2 + O → H2O", "H + O2 → H2O"],
      correctAnswer: 1,
      explanation: "2H2 + O2 → 2H2O có số nguyên tử mỗi nguyên tố bằng nhau ở 2 vế."
    },
    {
      question: "Khí nào chiếm tỉ lệ lớn nhất trong không khí?",
      options: ["Oxi", "Nitơ", "Cacbon dioxit", "Argon"],
      correctAnswer: 1,
      explanation: "Nitơ chiếm khoảng 78% thể tích không khí."
    },
    {
      question: "Chất nào là bazơ?",
      options: ["HCl", "NaCl", "NaOH", "Na2SO4"],
      correctAnswer: 2,
      explanation: "NaOH (Natri hidroxit) là một bazơ mạnh."
    },
    {
      question: "Muối ăn có công thức hóa học là gì?",
      options: ["NaCl", "KCl", "CaCl2", "MgCl2"],
      correctAnswer: 0,
      explanation: "Muối ăn là Natri clorua, công thức NaCl."
    }
  ],
  9: [
    {
      question: "Kim loại nào dẫn điện tốt nhất?",
      options: ["Vàng", "Bạc", "Đồng", "Nhôm"],
      correctAnswer: 1,
      explanation: "Bạc là kim loại dẫn điện tốt nhất."
    },
    {
      question: "Phi kim nào có tính oxi hóa mạnh nhất?",
      options: ["Oxi", "Clo", "Flo", "Brom"],
      correctAnswer: 2,
      explanation: "Flo có độ âm điện lớn nhất nên có tính oxi hóa mạnh nhất."
    },
    {
      question: "Công thức của metan là gì?",
      options: ["C2H6", "CH4", "C2H4", "C2H2"],
      correctAnswer: 1,
      explanation: "Metan là hidrocacbon đơn giản nhất với công thức CH4."
    },
    {
      question: "Axit axetic có công thức là gì?",
      options: ["HCOOH", "CH3COOH", "C2H5OH", "CH3OH"],
      correctAnswer: 1,
      explanation: "Axit axetic (giấm) có công thức CH3COOH."
    },
    {
      question: "Chất nào là polime?",
      options: ["Etilen", "Glucozơ", "Polietilen", "Axit axetic"],
      correctAnswer: 2,
      explanation: "Polietilen là polime được tạo từ nhiều phân tử etilen."
    },
    {
      question: "Sắt tác dụng với dung dịch CuSO4 tạo ra sản phẩm gì?",
      options: ["FeSO4 + Cu", "Fe2(SO4)3 + Cu", "FeSO4 + CuO", "Không phản ứng"],
      correctAnswer: 0,
      explanation: "Fe + CuSO4 → FeSO4 + Cu (Sắt đẩy đồng ra khỏi dung dịch muối)."
    },
    {
      question: "Canxi cacbonat bị nhiệt phân tạo ra sản phẩm gì?",
      options: ["CaO + CO", "CaO + CO2", "Ca + CO2", "Ca(OH)2 + CO2"],
      correctAnswer: 1,
      explanation: "CaCO3 --nhiệt--> CaO + CO2"
    },
    {
      question: "Chất nào dùng để khử chua đất?",
      options: ["NaCl", "CaO", "NaOH", "HCl"],
      correctAnswer: 1,
      explanation: "Vôi sống CaO được dùng để khử chua đất (trung hòa axit trong đất)."
    },
    {
      question: "Etanol có công thức là gì?",
      options: ["CH3OH", "C2H5OH", "C3H7OH", "C6H5OH"],
      correctAnswer: 1,
      explanation: "Etanol (rượu etylic) có công thức C2H5OH."
    },
    {
      question: "Glucozơ thuộc loại hợp chất nào?",
      options: ["Protein", "Lipit", "Cacbohidrat", "Axit nucleic"],
      correctAnswer: 2,
      explanation: "Glucozơ là một monosaccarit, thuộc nhóm cacbohidrat."
    }
  ],
  10: [
    {
      question: "Số hiệu nguyên tử cho biết điều gì?",
      options: ["Số neutron", "Số proton", "Số electron hóa trị", "Khối lượng nguyên tử"],
      correctAnswer: 1,
      explanation: "Số hiệu nguyên tử Z = số proton = số electron (nguyên tử trung hòa)."
    },
    {
      question: "Nguyên tố nào thuộc nhóm halogen?",
      options: ["Oxi", "Clo", "Nitơ", "Lưu huỳnh"],
      correctAnswer: 1,
      explanation: "Clo thuộc nhóm VIIA (halogen) gồm F, Cl, Br, I, At."
    },
    {
      question: "Liên kết cộng hóa trị là gì?",
      options: ["Liên kết do lực hút tĩnh điện", "Liên kết do dùng chung electron", "Liên kết do cho nhận electron", "Liên kết kim loại"],
      correctAnswer: 1,
      explanation: "Liên kết cộng hóa trị hình thành do sự dùng chung cặp electron."
    },
    {
      question: "Số oxi hóa của Mn trong KMnO4 là bao nhiêu?",
      options: ["+4", "+5", "+6", "+7"],
      correctAnswer: 3,
      explanation: "K(+1) + Mn(x) + 4×O(-2) = 0 → x = +7"
    },
    {
      question: "Phản ứng oxi hóa khử là phản ứng có đặc điểm gì?",
      options: ["Có sự thay đổi màu sắc", "Có sự thay đổi số oxi hóa", "Có chất khí thoát ra", "Có kết tủa tạo thành"],
      correctAnswer: 1,
      explanation: "Phản ứng oxi hóa khử là phản ứng có sự thay đổi số oxi hóa của các nguyên tố."
    },
    {
      question: "Cấu hình electron của Na (Z=11) là gì?",
      options: ["1s²2s²2p⁶3s¹", "1s²2s²2p⁶3s²", "1s²2s²2p⁶", "1s²2s²2p⁵3s²"],
      correctAnswer: 0,
      explanation: "Na có 11 electron, cấu hình: 1s²2s²2p⁶3s¹"
    },
    {
      question: "Axit nào sau đây là axit mạnh?",
      options: ["CH3COOH", "H2CO3", "HCl", "H2S"],
      correctAnswer: 2,
      explanation: "HCl là axit mạnh, phân li hoàn toàn trong nước."
    },
    {
      question: "Tốc độ phản ứng phụ thuộc vào yếu tố nào?",
      options: ["Chỉ nhiệt độ", "Chỉ nồng độ", "Chỉ áp suất", "Nhiệt độ, nồng độ, áp suất, xúc tác, diện tích tiếp xúc"],
      correctAnswer: 3,
      explanation: "Tốc độ phản ứng phụ thuộc vào nhiều yếu tố: nhiệt độ, nồng độ, áp suất, xúc tác, diện tích tiếp xúc."
    },
    {
      question: "Clo có thể tác dụng với chất nào sau đây?",
      options: ["O2", "N2", "H2", "CO2"],
      correctAnswer: 2,
      explanation: "Cl2 + H2 --ánh sáng--> 2HCl"
    },
    {
      question: "Lưu huỳnh có các số oxi hóa phổ biến nào?",
      options: ["-2, 0, +4, +6", "-1, 0, +2, +4", "-2, +2, +4", "-1, +1, +3, +5"],
      correctAnswer: 0,
      explanation: "Lưu huỳnh có các số oxi hóa: -2 (H2S), 0 (S), +4 (SO2), +6 (H2SO4)."
    }
  ],
  11: [
    {
      question: "Nitơ có số oxi hóa bao nhiêu trong NH3?",
      options: ["+3", "-3", "0", "+5"],
      correctAnswer: 1,
      explanation: "Trong NH3: N(x) + 3×H(+1) = 0 → x = -3"
    },
    {
      question: "Sản phẩm của phản ứng este hóa giữa axit axetic và etanol là gì?",
      options: ["Etyl axetat", "Metyl axetat", "Etyl fomat", "Metyl fomat"],
      correctAnswer: 0,
      explanation: "CH3COOH + C2H5OH → CH3COOC2H5 (etyl axetat) + H2O"
    },
    {
      question: "Anken là hidrocacbon có đặc điểm gì?",
      options: ["Có liên kết ba", "Có liên kết đôi C=C", "Chỉ có liên kết đơn", "Có vòng benzen"],
      correctAnswer: 1,
      explanation: "Anken là hidrocacbon không no có một liên kết đôi C=C trong phân tử."
    },
    {
      question: "Phenol có tính chất gì đặc trưng?",
      options: ["Tính bazơ mạnh", "Tính axit yếu", "Tính trung tính", "Tính oxi hóa mạnh"],
      correctAnswer: 1,
      explanation: "Phenol C6H5OH có tính axit yếu do nhóm -OH liên kết với vòng benzen."
    },
    {
      question: "Andehit axetic có công thức là gì?",
      options: ["HCHO", "CH3CHO", "CH3COCH3", "CH3COOH"],
      correctAnswer: 1,
      explanation: "Andehit axetic có công thức CH3CHO."
    },
    {
      question: "Axit cacboxylic có nhóm chức gì?",
      options: ["-OH", "-CHO", "-COOH", "-CO-"],
      correctAnswer: 2,
      explanation: "Axit cacboxylic có nhóm chức -COOH (cacboxyl)."
    },
    {
      question: "Phản ứng cộng của anken với Br2 tạo sản phẩm gì?",
      options: ["Dẫn xuất monohalogen", "Dẫn xuất đihalogen", "Ancol", "Andehit"],
      correctAnswer: 1,
      explanation: "CH2=CH2 + Br2 → CH2Br-CH2Br (dẫn xuất đihalogen)"
    },
    {
      question: "NH3 có tính chất gì đặc trưng?",
      options: ["Tính axit", "Tính bazơ", "Tính trung tính", "Tính oxi hóa"],
      correctAnswer: 1,
      explanation: "NH3 có tính bazơ do có cặp electron tự do trên nguyên tử N."
    },
    {
      question: "Axit nitric đặc nguội có tác dụng với kim loại nào?",
      options: ["Fe", "Al", "Cu", "Cả Fe và Al đều không phản ứng"],
      correctAnswer: 3,
      explanation: "HNO3 đặc nguội làm thụ động hóa Fe và Al."
    },
    {
      question: "Phản ứng tráng gương dùng để nhận biết chất nào?",
      options: ["Ancol", "Andehit", "Axit cacboxylic", "Xeton"],
      correctAnswer: 1,
      explanation: "Phản ứng tráng gương đặc trưng cho andehit (nhóm -CHO)."
    }
  ],
  12: [
    {
      question: "Este có công thức tổng quát là gì?",
      options: ["R-OH", "R-CHO", "R-COOR'", "R-COOH"],
      correctAnswer: 2,
      explanation: "Este có công thức tổng quát RCOOR' (R-COO-R')."
    },
    {
      question: "Phản ứng thủy phân este trong môi trường kiềm gọi là gì?",
      options: ["Este hóa", "Xà phòng hóa", "Trùng hợp", "Trùng ngưng"],
      correctAnswer: 1,
      explanation: "Phản ứng thủy phân este trong môi trường kiềm gọi là phản ứng xà phòng hóa."
    },
    {
      question: "Tinh bột thuộc loại cacbohidrat nào?",
      options: ["Monosaccarit", "Đisaccarit", "Polisaccarit", "Oligosaccarit"],
      correctAnswer: 2,
      explanation: "Tinh bột là polisaccarit, gồm nhiều gốc glucozơ liên kết với nhau."
    },
    {
      question: "Amino axit có tính chất gì đặc biệt?",
      options: ["Chỉ có tính axit", "Chỉ có tính bazơ", "Có tính lưỡng tính", "Không có tính chất đặc biệt"],
      correctAnswer: 2,
      explanation: "Amino axit có cả nhóm -NH2 (bazơ) và -COOH (axit) nên có tính lưỡng tính."
    },
    {
      question: "Polime được tạo thành bằng phản ứng gì?",
      options: ["Phản ứng thế", "Phản ứng cộng", "Phản ứng trùng hợp hoặc trùng ngưng", "Phản ứng phân hủy"],
      correctAnswer: 2,
      explanation: "Polime được tạo thành bằng phản ứng trùng hợp hoặc trùng ngưng."
    },
    {
      question: "Kim loại kiềm thuộc nhóm nào trong bảng tuần hoàn?",
      options: ["IA", "IIA", "IIIA", "IVA"],
      correctAnswer: 0,
      explanation: "Kim loại kiềm (Li, Na, K, Rb, Cs, Fr) thuộc nhóm IA."
    },
    {
      question: "Sắt có thể tạo ra mấy loại oxit?",
      options: ["1 loại", "2 loại", "3 loại", "4 loại"],
      correctAnswer: 2,
      explanation: "Sắt tạo 3 loại oxit: FeO, Fe2O3, Fe3O4."
    },
    {
      question: "Điện phân dung dịch CuSO4 với điện cực trơ, ở catot thu được gì?",
      options: ["Cu", "O2", "H2", "SO2"],
      correctAnswer: 0,
      explanation: "Catot (-): Cu²⁺ + 2e → Cu"
    },
    {
      question: "Protein bị thủy phân hoàn toàn tạo ra sản phẩm gì?",
      options: ["Glucozơ", "Amino axit", "Axit béo", "Nucleotit"],
      correctAnswer: 1,
      explanation: "Protein thủy phân hoàn toàn tạo ra các amino axit."
    },
    {
      question: "Nhôm có tính chất hóa học gì đặc trưng?",
      options: ["Tính oxi hóa", "Tính khử mạnh", "Tính trung tính", "Tính lưỡng tính của oxit và hidroxit"],
      correctAnswer: 3,
      explanation: "Al2O3 và Al(OH)3 có tính lưỡng tính, tác dụng được với cả axit và bazơ."
    }
  ]
};

// Lấy câu hỏi ngẫu nhiên cho phòng
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

    const player = room.players.find(p => p.oderId.toString() === oderId);
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

    const isCorrect = answer === question.correctAnswer;
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
      correctAnswer: question.correctAnswer,
      explanation: question.explanation,
      playerScore: player.score,
      playerCorrectAnswers: player.correctAnswers
    });
  } catch (error) {
    console.error('Error submitting answer:', error);
    res.status(500).json({ message: 'Lỗi gửi câu trả lời', error: error.message });
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
