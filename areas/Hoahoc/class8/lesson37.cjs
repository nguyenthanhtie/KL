module.exports = {
  classId: 8,
  chapterId: 5,
  lessonId: 37,
  title: "Bài 37: Bài thực hành 6 - Tổng hợp Chương 5",
  description: "Thực hành tổng hợp về hidro, nước, axit, bazơ, muối",
  level: "Advanced", // Đổi từ "Practice" thành "Advanced"
  order: 37,
  theory: `
      <h2>🧪 Thực hành tổng hợp Chương 5</h2>
      
      <h3>🎯 Mục tiêu</h3>
      <ul>
        <li>Ôn tập và thực hành các kiến thức về H₂, H₂O, axit, bazơ, muối</li>
        <li>Rèn luyện kỹ năng thí nghiệm và quan sát</li>
        <li>Nhận biết các chất bằng phương pháp hóa học</li>
      </ul>

      <h3>🔬 Thí nghiệm 1: Điều chế và nhận biết H₂</h3>
      <div style="background: #f0f9ff; padding: 15px; border-left: 4px solid #0284c7; margin: 15px 0;">
        <h4>Dụng cụ và hóa chất:</h4>
        <p>• Bình cầu, ống nghiệm, đèn cồn</p>
        <p>• Kẽm (Zn), dung dịch H₂SO₄ loãng</p>
        
        <h4>Tiến hành:</h4>
        <p>1. Cho Zn vào bình, thêm H₂SO₄</p>
        <p>2. Thu khí H₂ bằng đẩy nước</p>
        <p>3. Kiểm tra độ tinh khiết (kêu "pop" nhẹ)</p>
        <p>4. Đốt H₂, quan sát ngọn lửa xanh nhạt</p>
        
        <p><strong>Phương trình:</strong> Zn + H₂SO₄ → ZnSO₄ + H₂↑</p>
      </div>

      <h3>🔬 Thí nghiệm 2: Phản ứng của nước với oxit</h3>
      <div style="background: #dcfce7; padding: 15px; border-left: 4px solid #16a34a; margin: 15px 0;">
        <h4>a) Nước + Oxit bazơ (CaO)</h4>
        <p>1. Cho CaO vào ống nghiệm</p>
        <p>2. Thêm nước, lắc đều</p>
        <p>3. Nhỏ quỳ tím vào → Hóa xanh (tạo bazơ)</p>
        <p><strong>PT:</strong> CaO + H₂O → Ca(OH)₂</p>
        
        <h4>b) Nước + Oxit axit (SO₃ hoặc P₂O₅)</h4>
        <p>1. Hòa tan oxit vào nước</p>
        <p>2. Nhỏ quỳ tím → Hóa đỏ (tạo axit)</p>
        <p><strong>PT:</strong> SO₃ + H₂O → H₂SO₄</p>
      </div>

      <h3>🔬 Thí nghiệm 3: Phản ứng trung hòa</h3>
      <div style="background: #fef3c7; padding: 15px; border-left: 4px solid #d97706; margin: 15px 0;">
        <h4>Axit + Bazơ → Muối + Nước</h4>
        <p>1. Cho dd NaOH vào ống nghiệm</p>
        <p>2. Nhỏ quỳ tím → Xanh</p>
        <p>3. Thêm từ từ dd HCl</p>
        <p>4. Màu xanh nhạt dần → Tím (trung hòa)</p>
        <p><strong>PT:</strong> HCl + NaOH → NaCl + H₂O</p>
      </div>

      <h3>🔬 Thí nghiệm 4: Nhận biết axit và bazơ</h3>
      <div style="background: #f0f9ff; padding: 15px; border-left: 4px solid #0284c7; margin: 15px 0;">
        <p>Cho 3 ống nghiệm chứa: HCl, NaOH, H₂O</p>
        <p>Nhỏ quỳ tím vào từng ống:</p>
        <p>• Hóa đỏ → HCl (axit)</p>
        <p>• Hóa xanh → NaOH (bazơ)</p>
        <p>• Không đổi màu → H₂O (trung tính)</p>
      </div>

      <h3>⚠️ An toàn</h3>
      <div style="background: #fef2f2; padding: 15px; border-left: 4px solid #dc2626; margin: 15px 0;">
        <p>🔥 Kiểm tra độ tinh khiết H₂ trước khi đốt</p>
        <p>👓 Đeo kính bảo hộ, áo blouse</p>
        <p>🧤 Cẩn thận khi dùng axit và bazơ</p>
        <p>💧 Rửa tay sau khi thí nghiệm</p>
      </div>
    `,
  game: {
    basic: [
      {
        type: "multiple-choice",
        question: "Quỳ tím hóa đỏ khi gặp chất nào?",
        options: ["Bazơ", "Axit", "Muối", "Nước"],
        correctAnswer: 1,
        explanation: "✅ Quỳ tím hóa ĐỎ khi gặp AXIT.",
        points: 10
      },
      {
        type: "true-false",
        question: "CaO tác dụng với nước tạo ra bazơ Ca(OH)₂.",
        correctAnswer: true,
        explanation: "✅ Đúng! CaO + H₂O → Ca(OH)₂ (bazơ)",
        points: 10
      },
      {
        type: "multiple-choice",
        question: "Phản ứng HCl + NaOH → NaCl + H₂O là phản ứng gì?",
        options: [
          "Phản ứng thế",
          "Phản ứng trung hòa",
          "Phản ứng hóa hợp",
          "Phản ứng phân hủy"
        ],
        correctAnswer: 1,
        explanation: "✅ Axit + Bazơ → Muối + Nước là phản ứng TRUNG HÒA.",
        points: 10
      },
      {
        type: "fill-in-blank",
        question: "Để điều chế H₂, ta cho Zn tác dụng với dung dịch ___.",
        correctAnswer: "H₂SO₄",
        hint: "💡 Loại axit thường dùng",
        explanation: "✅ Zn + H₂SO₄ → ZnSO₄ + H₂",
        points: 10
      },
      {
        type: "true-false",
        question: "Quỳ tím hóa xanh khi gặp bazơ.",
        correctAnswer: true,
        explanation: "✅ Đúng! Bazơ làm quỳ tím hóa XANH.",
        points: 10
      }
    ],
    intermediate: [
      {
        type: "matching",
        question: "🔗 Ghép chất với hiện tượng khi gặp quỳ tím",
        pairs: [
          { left: "HCl", right: "Hóa đỏ" },
          { left: "NaOH", right: "Hóa xanh" },
          { left: "NaCl", right: "Không đổi màu" },
          { left: "H₂O", right: "Không đổi màu" }
        ],
        explanation: "✅ Tuyệt vời! Axit → đỏ, Bazơ → xanh, Trung tính → không đổi.",
        points: 15
      },
      {
        type: "fill-in-blank",
        question: "Khi CaO tác dụng với nước, quỳ tím chuyển sang màu ___ vì tạo ra ___.",
        correctAnswer: "xanh, bazơ",
        hint: "💡 Màu và loại chất tạo ra",
        explanation: "✅ Quỳ chuyển XANH vì tạo BAZƠ Ca(OH)₂.",
        points: 15
      },
      {
        type: "ordering",
        question: "📋 Sắp xếp các bước thí nghiệm trung hòa",
        options: [
          "Cho dd NaOH vào ống nghiệm",
          "Nhỏ quỳ tím (màu xanh)",
          "Thêm từ từ dd HCl",
          "Quan sát màu tím (trung hòa)"
        ],
        correctOrder: [
          "Cho dd NaOH vào ống nghiệm",
          "Nhỏ quỳ tím (màu xanh)",
          "Thêm từ từ dd HCl",
          "Quan sát màu tím (trung hòa)"
        ],
        explanation: "✅ Đúng trình tự thí nghiệm!",
        points: 15
      },
      {
        type: "multiple-choice",
        question: "Để nhận biết 3 lọ không nhãn: HCl, NaOH, H₂O, ta dùng:",
        options: [
          "Đun nóng",
          "Quỳ tím",
          "Đánh hơi ngửi",
          "Nếm thử"
        ],
        correctAnswer: 1,
        explanation: "✅ Dùng QUỲ TÍM: HCl→đỏ, NaOH→xanh, H₂O→không đổi.",
        points: 15
      },
      {
        type: "fill-in-blank",
        question: "Oxit axit tác dụng với nước tạo ra ___.",
        correctAnswer: "axit",
        hint: "💡 Loại chất tạo ra",
        explanation: "✅ Oxit axit + Nước → AXIT. VD: SO₃ + H₂O → H₂SO₄",
        points: 15
      }
    ],
    advanced: [
      {
        type: "drag-drop",
        question: "🧩 Hoàn thành: Trong phản ứng trung hòa, ___ + ___ → Muối + ___.",
        inline: true,
        slots: [
          { id: 1, label: "Chất 1", correct: "Axit" },
          { id: 2, label: "Chất 2", correct: "Bazơ" },
          { id: 3, label: "Chất 3", correct: "Nước" }
        ],
        options: ["Axit", "Bazơ", "Nước", "Khí"],
        explanation: "✅ AXIT + BAZƠ → Muối + NƯỚC",
        points: 20
      },
      {
        type: "multiple-choice",
        question: "Hiện tượng nào chứng tỏ phản ứng trung hòa đã hoàn toàn?",
        options: [
          "Có khí thoát ra",
          "Quỳ tím chuyển từ xanh/đỏ về tím",
          "Có kết tủa",
          "Có màu sắc đặc biệt"
        ],
        correctAnswer: 1,
        explanation: "✅ Quỳ về màu TÍM chứng tỏ dung dịch trung hòa (không còn axit hay bazơ dư).",
        points: 20
      },
      {
        type: "fill-in-blank",
        question: "Để phân biệt HCl và H₂SO₄, ta có thể dùng dung dịch ___ (tạo kết tủa trắng với H₂SO₄).",
        correctAnswer: "BaCl₂",
        hint: "💡 Muối bari",
        explanation: "✅ BaCl₂ + H₂SO₄ → BaSO₄↓ (trắng) + 2HCl",
        points: 20
      },
      {
        type: "matching",
        question: "🧠 Ghép thí nghiệm với mục đích",
        pairs: [
          { left: "Điều chế H₂ từ Zn", right: "Học phản ứng thế" },
          { left: "CaO + H₂O", right: "Tạo bazơ từ oxit" },
          { left: "HCl + NaOH", right: "Phản ứng trung hòa" },
          { left: "Nhỏ quỳ tím", right: "Nhận biết axit/bazơ" }
        ],
        explanation: "✅ Xuất sắc! Bạn hiểu rõ mục đích từng thí nghiệm.",
        points: 20
      },
      {
        type: "multiple-choice",
        question: "Tại sao phải thêm từ từ HCl vào NaOH trong thí nghiệm trung hòa?",
        options: [
          "Để tiết kiệm HCl",
          "Để quan sát rõ sự thay đổi màu quỳ và xác định điểm trung hòa",
          "Để phản ứng nhanh hơn",
          "Không cần thiết"
        ],
        correctAnswer: 1,
        explanation: "✅ Thêm từ từ để QUAN SÁT SỰ THAY ĐỔI và xác định chính xác điểm trung hòa.",
        points: 20
      }
    ]
  }
};
