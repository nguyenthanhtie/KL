module.exports = {
  classId: 8,
  chapterId: 1,
  lessonId: 2,
  title: "Bài 2: Chất và tính chất vật lý",
  description: "Tìm hiểu về chất, phân loại chất, tính chất vật lý và thực hành",
  level: "Beginner",
  order: 2,
  theory: "\n      <h2>Thế nào là chất?</h2>\n      <p><strong>Chất</strong> là những gì cấu tạo nên các vật thể xung quanh chúng ta.</p>\n      <p><em>Ví dụ:</em> Nước, muối ăn, sắt, nhôm, đường, không khí...</p>\n      \n      <h3>Phân loại chất</h3>\n      <div style=\"background: #f0f9ff; padding: 15px; border-left: 4px solid #0284c7; margin: 15px 0;\">\n        <h4>Chất tinh khiết</h4>\n        <p>Là chất chỉ gồm một loại chất duy nhất.</p>\n        <p><strong>Ví dụ:</strong> Nước cất, muối ăn nguyên chất, vàng 24k</p>\n      </div>\n      \n      <div style=\"background: #fef3c7; padding: 15px; border-left: 4px solid #d97706; margin: 15px 0;\">\n        <h4>Hỗn hợp</h4>\n        <p>Là chất gồm hai hay nhiều chất tinh khiết trộn lẫn với nhau.</p>\n        <p><strong>Ví dụ:</strong> Không khí, nước biển, nước đường, đất</p>\n      </div>\n\n      <h3>Tính chất của chất</h3>\n      <table style=\"width: 100%; border-collapse: collapse; margin: 15px 0;\">\n        <tr style=\"background: #e5e7eb;\">\n          <th style=\"border: 1px solid #9ca3af; padding: 10px;\">Tính chất vật lý</th>\n          <th style=\"border: 1px solid #9ca3af; padding: 10px;\">Tính chất hóa học</th>\n        </tr>\n        <tr>\n          <td style=\"border: 1px solid #9ca3af; padding: 10px;\">\n            • Màu sắc, mùi vị<br>\n            • Trạng thái (rắn, lỏng, khí)<br>\n            • Nhiệt độ nóng chảy, sôi<br>\n            • Tính dẫn điện, dẫn nhiệt\n          </td>\n          <td style=\"border: 1px solid #9ca3af; padding: 10px;\">\n            • Khả năng tham gia phản ứng<br>\n            • Tính oxi hóa, khử<br>\n            • Tính axit, bazơ<br>\n            • Khả năng cháy\n          </td>\n        </tr>\n      </table>\n    ",
  game: {
    // 🌱 CẤP ĐỘ CƠ BẢN
    basic: [
      {
        type: "multiple-choice",
        question: "Chất là gì?",
        options: [
          "Chỉ là nước",
          "Những gì cấu tạo nên các vật thể xung quanh chúng ta",
          "Chỉ là kim loại",
          "Chỉ là không khí"
        ],
        correctAnswer: 1,
        explanation: "✅ Chất là những gì cấu tạo nên các vật thể xung quanh chúng ta như nước, muối, sắt, nhôm...",
        points: 10
      },
      {
        type: "true-false",
        question: "Nước cất là một chất tinh khiết.",
        correctAnswer: true,
        explanation: "✅ Đúng! Nước cất chỉ gồm một loại chất duy nhất nên là chất tinh khiết.",
        points: 10
      },
      {
        type: "multiple-choice",
        question: "Đâu là ví dụ về hỗn hợp?",
        options: [
          "Muối ăn nguyên chất",
          "Nước cất",
          "Không khí",
          "Vàng 24k"
        ],
        correctAnswer: 2,
        explanation: "✅ Không khí là hỗn hợp gồm nhiều chất: oxy, nitơ, CO2...",
        points: 10
      },
      {
        type: "true-false",
        question: "Màu sắc và trạng thái (rắn, lỏng, khí) là tính chất vật lý.",
        correctAnswer: true,
        explanation: "✅ Đúng! Màu sắc, mùi vị, trạng thái đều là tính chất vật lý của chất.",
        points: 10
      },
      {
        type: "multiple-choice",
        question: "Chất tinh khiết là gì?",
        options: [
          "Chất gồm nhiều loại chất trộn lẫn",
          "Chất chỉ gồm một loại chất duy nhất",
          "Chất không tồn tại trong tự nhiên",
          "Chất chỉ có ở phòng thí nghiệm"
        ],
        correctAnswer: 1,
        explanation: "✅ Chất tinh khiết là chất chỉ gồm một loại chất duy nhất, ví dụ: nước cất, muối ăn nguyên chất.",
        points: 10
      }
    ],

    // 🔥 CẤP ĐỘ TRUNG BÌNH
    intermediate: [
      {
        type: "matching",
        question: "🔗 Ghép loại chất với ví dụ tương ứng",
        pairs: [
          { left: "Chất tinh khiết", right: "Nước cất" },
          { left: "Hỗn hợp", right: "Nước biển" },
          { left: "Chất tinh khiết", right: "Muối ăn nguyên chất" },
          { left: "Hỗn hợp", right: "Không khí" }
        ],
        explanation: "✅ Tuyệt vời! Bạn đã phân biệt được chất tinh khiết và hỗn hợp.",
        points: 15
      },
      {
        type: "fill-in-blank",
        question: "Chất tinh khiết là chất chỉ gồm ___ loại chất duy nhất.",
        correctAnswer: "một",
        hint: "💡 Gợi ý: Số lượng loại chất trong chất tinh khiết",
        explanation: "✅ Chính xác! Chất tinh khiết chỉ gồm MỘT loại chất duy nhất.",
        points: 15
      },
      {
        type: "ordering",
        question: "📋 Sắp xếp các đặc điểm sau theo thứ tự: Vật lý → Hóa học",
        options: [
          "Màu sắc của chất",
          "Khả năng cháy",
          "Nhiệt độ sôi",
          "Tính axit"
        ],
        correctOrder: [
          "Màu sắc của chất",
          "Nhiệt độ sôi",
          "Khả năng cháy",
          "Tính axit"
        ],
        explanation: "✅ Đúng! Màu sắc và nhiệt độ sôi là tính chất vật lý, khả năng cháy và tính axit là tính chất hóa học.",
        points: 15
      },
      {
        type: "multiple-choice",
        question: "Đâu KHÔNG phải là tính chất vật lý?",
        options: [
          "Màu sắc",
          "Trạng thái (rắn, lỏng, khí)",
          "Khả năng cháy",
          "Nhiệt độ nóng chảy"
        ],
        correctAnswer: 2,
        explanation: "✅ Khả năng cháy là tính chất hóa học (có phản ứng xảy ra), không phải tính chất vật lý.",
        points: 15
      },
      {
        type: "fill-in-blank",
        question: "Hỗn hợp là chất gồm hai hay nhiều ___ trộn lẫn với nhau.",
        correctAnswer: "chất tinh khiết",
        hint: "💡 Loại chất tạo nên hỗn hợp",
        explanation: "✅ Đúng! Hỗn hợp gồm hai hay nhiều CHẤT TINH KHIẾT trộn lẫn.",
        points: 15
      }
    ],

    // ⚡ CẤP ĐỘ NÂNG CAO
    advanced: [
      {
        type: "drag-drop",
        question: "🧩 Hoàn thành định nghĩa: Chất ___ là chất chỉ gồm ___ loại chất, còn hỗn hợp gồm ___ loại chất.",
        inline: true,
        slots: [
          { id: 1, label: "Loại chất thứ nhất", correct: "tinh khiết" },
          { id: 2, label: "Số lượng trong chất tinh khiết", correct: "một" },
          { id: 3, label: "Số lượng trong hỗn hợp", correct: "nhiều" }
        ],
        options: ["tinh khiết", "một", "nhiều", "hai"],
        explanation: "✅ Hoàn hảo! Chất TINH KHIẾT chỉ có MỘT loại chất, hỗn hợp có NHIỀU loại chất.",
        points: 20
      },
      {
        type: "multiple-choice",
        question: "Tìm phát biểu SAI về tính chất của chất:",
        options: [
          "Tính chất vật lý bao gồm màu sắc, mùi vị, trạng thái",
          "Nhiệt độ nóng chảy và sôi là tính chất hóa học",
          "Tính chất hóa học liên quan đến phản ứng của chất",
          "Tính dẫn điện, dẫn nhiệt là tính chất vật lý"
        ],
        correctAnswer: 1,
        explanation: "❌ SAI! Nhiệt độ nóng chảy và sôi là TÍNH CHẤT VẬT LÝ, không phải hóa học.",
        points: 20
      },
      {
        type: "fill-in-blank",
        question: "Trong nước biển, muối ăn và nước là hai chất ___ trộn lẫn tạo thành ___.",
        correctAnswer: "tinh khiết, hỗn hợp",
        hint: "💡 Gợi ý: Loại chất thành phần và loại chất tổng thể",
        explanation: "✅ Xuất sắc! Muối và nước là hai CHẤT TINH KHIẾT tạo thành HỖN HỢP nước biển.",
        points: 20
      },
      {
        type: "matching",
        question: "🧠 Ghép tính chất với loại tính chất tương ứng",
        pairs: [
          { left: "Màu đỏ của đồng", right: "Tính chất vật lý" },
          { left: "Sắt bị gỉ trong không khí ẩm", right: "Tính chất hóa học" },
          { left: "Nước đóng băng ở 0°C", right: "Tính chất vật lý" },
          { left: "Gỗ cháy khi có lửa", right: "Tính chất hóa học" }
        ],
        explanation: "✅ Tuyệt vời! Bạn phân biệt rõ tính chất vật lý (không có phản ứng) và hóa học (có phản ứng).",
        points: 20
      },
      {
        type: "multiple-choice",
        question: "Tại sao không khí được coi là hỗn hợp chứ không phải chất tinh khiết?",
        options: [
          "Vì không khí không có màu sắc",
          "Vì không khí gồm nhiều chất: N₂ (78%), O₂ (21%), CO₂...",
          "Vì không khí không thể nhìn thấy",
          "Vì không khí ở khắp nơi"
        ],
        correctAnswer: 1,
        explanation: "✅ Chính xác! Không khí là HỖN HỢP vì chứa nhiều chất khác nhau như nitơ, oxy, CO₂...",
        points: 20
      }
    ]
  }
};
