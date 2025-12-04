module.exports = {
  classId: 8,
  chapterId: 0, // Mở đầu (dùng số 0)
  chapterName: "Mở đầu Hóa học", // Thêm tên chương
  lessonId: 1,
  title: "Bài 1: Mở đầu môn Hoá học",
  description: "Giới thiệu về môn Hoá học, tầm quan trọng và ứng dụng trong đời sống",
  level: "Beginner",
  order: 1,
  theory: `
      <h2>🧪 Chào mừng đến với thế giới Hóa học!</h2>
      <p><strong>Hóa học</strong> là khoa học nghiên cứu về chất, cấu tạo, tính chất và sự biến đổi của chúng.</p>
      
      <h3>🌟 Tại sao học Hóa học?</h3>
      <div style="background: #f0f9ff; padding: 15px; border-left: 4px solid #0284c7; margin: 15px 0;">
        <h4>🔬 Hiểu thế giới xung quanh</h4>
        <p>• Tại sao nước lại sôi ở 100°C?</p>
        <p>• Vì sao sắt bị gỉ?</p>
        <p>• Làm thế nào để chế tạo thuốc?</p>
      </div>
      
      <div style="background: #dcfce7; padding: 15px; border-left: 4px solid #16a34a; margin: 15px 0;">
        <h4>🏭 Ứng dụng trong đời sống</h4>
        <p>• <strong>Y học:</strong> Chế tạo thuốc chữa bệnh</p>
        <p>• <strong>Nông nghiệp:</strong> Phân bón, thuốc trừ sâu</p>
        <p>• <strong>Công nghiệp:</strong> Chế tạo vật liệu mới</p>
        <p>• <strong>Môi trường:</strong> Xử lý ô nhiễm</p>
      </div>

      <h3>🎯 Phương pháp học Hóa học hiệu quả</h3>
      <ul>
        <li>📚 <strong>Học lý thuyết:</strong> Hiểu khái niệm cơ bản</li>
        <li>🧪 <strong>Thực hành:</strong> Làm thí nghiệm quan sát</li>
        <li>💪 <strong>Luyện tập:</strong> Giải bài tập thường xuyên</li>
        <li>🔗 <strong>Liên hệ thực tế:</strong> Tìm hiểu ứng dụng</li>
      </ul>

      <h3>⚠️ An toàn trong phòng thí nghiệm</h3>
      <div style="background: #fef2f2; padding: 15px; border-left: 4px solid #dc2626; margin: 15px 0;">
        <p>• Luôn đeo kính bảo hộ và áo blouse</p>
        <p>• Không được nếm thử hóa chất</p>
        <p>• Rửa tay sau khi làm thí nghiệm</p>
        <p>• Báo cáo ngay khi có sự cố</p>
      </div>
    `,
  game: {
    // 🌱 CẤP ĐỘ CƠ BẢN - 5 câu dễ
    basic: [
      {
        type: "multiple-choice",
        question: "Hóa học là khoa học nghiên cứu về điều gì?",
        options: [
          "Chỉ nghiên cứu về nước",
          "Chất, cấu tạo và tính chất của chúng",
          "Chỉ nghiên cứu về kim loại",
          "Chỉ nghiên cứu về không khí"
        ],
        correctAnswer: 1,
        explanation: "✅ Hóa học nghiên cứu về chất, cấu tạo, tính chất và sự biến đổi của chúng.",
        points: 10
      },
      {
        type: "true-false",
        question: "Hóa học có ứng dụng trong y học để chế tạo thuốc.",
        correctAnswer: true,
        explanation: "✅ Đúng! Hóa học giúp chế tạo các loại thuốc chữa bệnh.",
        points: 10
      },
      {
        type: "multiple-choice",
        question: "Trong phòng thí nghiệm, chúng ta cần đeo gì để bảo vệ mắt?",
        options: [
          "Kính râm",
          "Kính bảo hộ",
          "Không cần đeo gì",
          "Mũ bảo hiểm"
        ],
        correctAnswer: 1,
        explanation: "✅ Luôn đeo kính bảo hộ để bảo vệ mắt khỏi hóa chất.",
        points: 10
      },
      {
        type: "true-false",
        question: "Chúng ta có thể nếm thử hóa chất trong phòng thí nghiệm.",
        correctAnswer: false,
        explanation: "❌ Tuyệt đối KHÔNG được nếm thử hóa chất vì có thể độc hại!",
        points: 10
      },
      {
        type: "multiple-choice",
        question: "Hóa học được ứng dụng trong lĩnh vực nào sau đây?",
        options: [
          "Chỉ trong y học",
          "Chỉ trong nông nghiệp",
          "Trong nhiều lĩnh vực: y học, nông nghiệp, công nghiệp",
          "Không có ứng dụng thực tế"
        ],
        correctAnswer: 2,
        explanation: "✅ Hóa học có ứng dụng rộng rãi trong rất nhiều lĩnh vực.",
        points: 10
      }
    ],

    // 🔥 CẤP ĐỘ TRUNG BÌNH - 5 câu vừa
    intermediate: [
      {
        type: "matching",
        question: "🔗 Ghép lĩnh vực với ứng dụng hóa học tương ứng",
        pairs: [
          { left: "Y học", right: "Chế tạo thuốc chữa bệnh" },
          { left: "Nông nghiệp", right: "Sản xuất phân bón" },
          { left: "Công nghiệp", right: "Chế tạo vật liệu mới" },
          { left: "Môi trường", right: "Xử lý ô nhiễm" }
        ],
        explanation: "✅ Tuyệt vời! Hóa học có ứng dụng đa dạng trong mọi lĩnh vực.",
        points: 15
      },
      {
        type: "fill-in-blank",
        question: "Hóa học nghiên cứu về chất, cấu tạo, tính chất và sự ___ của chúng.",
        correctAnswer: "biến đổi",
        hint: "💡 Gợi ý: Chất có thể thay đổi từ dạng này sang dạng khác",
        explanation: "✅ Hóa học nghiên cứu sự BIẾN ĐỔI của các chất.",
        points: 15
      },
      {
        type: "multiple-choice",
        question: "Phương pháp học Hóa học hiệu quả bao gồm những gì?",
        options: [
          "Chỉ học lý thuyết",
          "Chỉ làm thí nghiệm",
          "Kết hợp lý thuyết, thực hành và luyện tập",
          "Chỉ xem video"
        ],
        correctAnswer: 2,
        explanation: "✅ Học tốt cần kết hợp lý thuyết, thực hành và luyện tập đều đặn.",
        points: 15
      },
      {
        type: "ordering",
        question: "📋 Sắp xếp các bước học Hóa học theo thứ tự hợp lý",
        options: [
          "Học lý thuyết",
          "Thực hành thí nghiệm",
          "Luyện tập bài tập",
          "Liên hệ với thực tế"
        ],
        correctOrder: [
          "Học lý thuyết",
          "Thực hành thí nghiệm",
          "Luyện tập bài tập",
          "Liên hệ với thực tế"
        ],
        explanation: "✅ Đúng rồi! Học lý thuyết trước, sau đó thực hành và luyện tập.",
        points: 15
      },
      {
        type: "multiple-choice",
        question: "Tại sao phải rửa tay sau khi làm thí nghiệm?",
        options: [
          "Để tay sạch đẹp",
          "Để loại bỏ hóa chất có thể còn dính trên tay",
          "Không cần thiết",
          "Chỉ rửa khi tay bẩn"
        ],
        correctAnswer: 1,
        explanation: "✅ Rửa tay để loại bỏ hóa chất còn sót lại, tránh nguy hiểm.",
        points: 15
      }
    ],

    // ⚡ CẤP ĐỘ NÂNG CAO - 5 câu khó
    advanced: [
      {
        type: "drag-drop",
        question: "🧩 Hoàn thành câu: Kéo thả các từ vào đúng vị trí",
        inline: true,
        slots: [
          { id: 1, label: "Hóa học là khoa học nghiên cứu về", correct: "chất" },
          { id: 2, label: ", cấu tạo,", correct: "tính chất" },
          { id: 3, label: "và sự", correct: "biến đổi" },
          { id: 4, label: "của chúng trong", correct: "tự nhiên" }
        ],
        options: ["chất", "tính chất", "biến đổi", "tự nhiên"],
        explanation: "✅ Hoàn hảo! Bạn đã hiểu rõ định nghĩa Hóa học.",
        points: 20
      },
      {
        type: "multiple-choice",
        question: "Trong các quy tắc an toàn sau, quy tắc nào là QUAN TRỌNG NHẤT?",
        options: [
          "Luôn mặc áo blouse đẹp",
          "Không được nếm thử bất kỳ hóa chất nào",
          "Giữ phòng thí nghiệm sạch sẽ",
          "Xếp dụng cụ gọn gàng"
        ],
        correctAnswer: 1,
        explanation: "✅ Không nếm hóa chất là quy tắc QUAN TRỌNG NHẤT vì liên quan đến tính mạng.",
        points: 20
      },
      {
        type: "fill-in-blank",
        question: "Hóa học giúp xử lý vấn đề ___ môi trường như nước thải, khí thải.",
        correctAnswer: "ô nhiễm",
        hint: "💡 Vấn đề làm môi trường bị bẩn, độc hại",
        explanation: "✅ Hóa học môi trường giúp xử lý ÔNH NHIỄM nước, không khí, đất.",
        points: 20
      },
      {
        type: "matching",
        question: "🧠 Nâng cao: Ghép phương pháp học với mục đích",
        pairs: [
          { left: "Học lý thuyết", right: "Hiểu khái niệm và nguyên lý" },
          { left: "Thực hành", right: "Quan sát hiện tượng thực tế" },
          { left: "Luyện tập", right: "Củng cố kiến thức" },
          { left: "Liên hệ thực tế", right: "Áp dụng vào đời sống" }
        ],
        explanation: "✅ Xuất sắc! Bạn hiểu rõ mục đích của từng phương pháp học.",
        points: 20
      },
      {
        type: "multiple-choice",
        question: "Phát biểu nào SAI về vai trò của Hóa học?",
        options: [
          "Hóa học giúp chế tạo vật liệu mới phục vụ con người",
          "Hóa học chỉ quan trọng trong phòng thí nghiệm",
          "Hóa học giúp phát triển nông nghiệp qua phân bón",
          "Hóa học góp phần bảo vệ môi trường"
        ],
        correctAnswer: 1,
        explanation: "❌ SAI! Hóa học quan trọng trong MỌI lĩnh vực đời sống, không chỉ trong phòng thí nghiệm.",
        points: 20
      }
    ]
  }
};
