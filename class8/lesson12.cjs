module.exports = {
  classId: 8,
  chapterId: 3,
  lessonId: 12,
  title: "Bài 12: Tính theo công thức hoá học",
  description: "Bài tập tính toán theo công thức hóa học",
  level: "Advanced",
  order: 12,
  theory: `
      <h2>📐 Tính theo công thức hóa học</h2>
      <p>Từ <strong>công thức hóa học</strong>, ta có thể tính được nhiều đại lượng quan trọng.</p>
      
      <h3>🧮 Các công thức tính toán</h3>
      <div style="background: #f0f9ff; padding: 15px; border-left: 4px solid #0284c7; margin: 15px 0;">
        <h4>1. Khối lượng mol phân tử (M)</h4>
        <p style="text-align: center; font-size: 18px; color: #0284c7;">
          <strong>M = Tổng khối lượng nguyên tử × số nguyên tử</strong>
        </p>
        <p><strong>Ví dụ:</strong> H₂O</p>
        <p>M<sub>H₂O</sub> = 2×1 + 16 = 18 (g/mol)</p>
      </div>

      <div style="background: #dcfce7; padding: 15px; border-left: 4px solid #16a34a; margin: 15px 0;">
        <h4>2. Thành phần phần trăm theo khối lượng (%)</h4>
        <p style="text-align: center; font-size: 18px; color: #16a34a;">
          <strong>%A = (n<sub>A</sub> × M<sub>A</sub>) / M × 100%</strong>
        </p>
        <p>Trong đó:</p>
        <p>• n<sub>A</sub>: số nguyên tử A trong phân tử</p>
        <p>• M<sub>A</sub>: khối lượng nguyên tử A</p>
        <p>• M: khối lượng mol phân tử</p>
      </div>

      <h3>� Ví dụ minh họa</h3>
      <div style="background: #fef3c7; padding: 15px; border-radius: 8px; margin: 15px 0;">
        <p><strong>Bài toán:</strong> Tính % khối lượng các nguyên tố trong H₂SO₄</p>
        <p><strong>Giải:</strong></p>
        <p>• M<sub>H₂SO₄</sub> = 2×1 + 32 + 4×16 = 98 (g/mol)</p>
        <p>• %H = (2×1)/98 × 100% ≈ 2,04%</p>
        <p>• %S = 32/98 × 100% ≈ 32,65%</p>
        <p>• %O = (4×16)/98 × 100% ≈ 65,31%</p>
      </div>

      <h3>📋 Các bước giải bài toán</h3>
      <ol>
        <li>Xác định công thức hóa học</li>
        <li>Tính khối lượng mol phân tử (M)</li>
        <li>Áp dụng công thức tính % khối lượng</li>
        <li>Kiểm tra: tổng % = 100%</li>
      </ol>
    `,
  game: {
    // 🌱 CẤP ĐỘ CƠ BẢN
    basic: [
      {
        type: "multiple-choice",
        question: "Khối lượng mol phân tử H₂O là bao nhiêu? (Biết H = 1, O = 16)",
        options: [
          "16 g/mol",
          "17 g/mol",
          "18 g/mol",
          "19 g/mol"
        ],
        correctAnswer: 2,
        explanation: "✅ M(H₂O) = 2×1 + 16 = 18 g/mol",
        points: 10
      },
      {
        type: "true-false",
        question: "Khối lượng mol phân tử được tính bằng tổng khối lượng các nguyên tử trong phân tử.",
        correctAnswer: true,
        explanation: "✅ Đúng! Khối lượng mol = tổng khối lượng nguyên tử × số nguyên tử",
        points: 10
      },
      {
        type: "multiple-choice",
        question: "Công thức tính % khối lượng nguyên tố A trong hợp chất là:",
        options: [
          "%A = (M_A / M) × 100%",
          "%A = (n_A × M_A) / M × 100%",
          "%A = M / M_A × 100%",
          "%A = n_A / M × 100%"
        ],
        correctAnswer: 1,
        explanation: "✅ %A = (n_A × M_A) / M × 100%, với n_A là số nguyên tử A",
        points: 10
      },
      {
        type: "true-false",
        question: "Tổng % khối lượng các nguyên tố trong một hợp chất luôn bằng 100%.",
        correctAnswer: true,
        explanation: "✅ Đúng! Đây là cách kiểm tra kết quả tính toán.",
        points: 10
      },
      {
        type: "multiple-choice",
        question: "Khối lượng mol của CO₂ là bao nhiêu? (C = 12, O = 16)",
        options: [
          "28 g/mol",
          "32 g/mol",
          "44 g/mol",
          "48 g/mol"
        ],
        correctAnswer: 2,
        explanation: "✅ M(CO₂) = 12 + 2×16 = 44 g/mol",
        points: 10
      }
    ],

    // 🔥 CẤP ĐỘ TRUNG BÌNH
    intermediate: [
      {
        type: "matching",
        question: "🔗 Ghép hợp chất với khối lượng mol đúng",
        pairs: [
          { left: "NaCl", right: "58,5 g/mol" },
          { left: "CaCO₃", right: "100 g/mol" },
          { left: "H₂SO₄", right: "98 g/mol" }
        ],
        explanation: "✅ Tuyệt vời! Bạn đã tính đúng khối lượng mol các hợp chất.",
        points: 15
      },
      {
        type: "fill-in-blank",
        question: "Trong CO₂, phần trăm khối lượng của C là ___% (làm tròn 1 chữ số thập phân). Biết C = 12, O = 16",
        correctAnswer: "27.3",
        hint: "💡 M(CO₂) = 44 g/mol, %C = 12/44 × 100%",
        explanation: "✅ %C = 12/44 × 100% ≈ 27,3%",
        points: 15
      },
      {
        type: "ordering",
        question: "📋 Sắp xếp các bước tính % khối lượng nguyên tố",
        options: [
          "Xác định công thức hóa học",
          "Tính khối lượng mol phân tử",
          "Áp dụng công thức %",
          "Kiểm tra tổng % = 100%"
        ],
        correctOrder: [
          "Xác định công thức hóa học",
          "Tính khối lượng mol phân tử",
          "Áp dụng công thức %",
          "Kiểm tra tổng % = 100%"
        ],
        explanation: "✅ Đúng rồi! Đây là trình tự giải bài toán chuẩn.",
        points: 15
      },
      {
        type: "multiple-choice",
        question: "Hợp chất nào có % khối lượng oxi cao nhất?",
        options: [
          "H₂O (M = 18)",
          "CO₂ (M = 44)",
          "SO₂ (M = 64)",
          "NO₂ (M = 46)"
        ],
        correctAnswer: 0,
        explanation: "✅ H₂O có %O = 16/18 × 100% ≈ 88,9% là cao nhất",
        points: 15
      },
      {
        type: "fill-in-blank",
        question: "Nếu %H trong hợp chất H_xO = 11,1%, thì x = ___",
        correctAnswer: "2",
        hint: "💡 %H = (x×1)/(x×1 + 16) × 100% = 11,1%",
        explanation: "✅ Giải phương trình: x/(x+16) = 0,111 → x = 2",
        points: 15
      }
    ],

    // ⚡ CẤP ĐỘ NÂNG CAO
    advanced: [
      {
        type: "drag-drop",
        question: "🧩 Hoàn thành công thức tính khối lượng mol",
        inline: true,
        slots: [
          { id: 1, label: "Công thức", correct: "M = Σ(n × M_nguyên tử)" },
          { id: 2, label: "Đơn vị", correct: "g/mol" },
          { id: 3, label: "Ứng dụng", correct: "Tính % khối lượng" }
        ],
        options: [
          "M = Σ(n × M_nguyên tử)",
          "g/mol",
          "Tính % khối lượng",
          "mol/L"
        ],
        explanation: "✅ Hoàn hảo! Bạn hiểu rõ về khối lượng mol.",
        points: 20
      },
      {
        type: "multiple-choice",
        question: "Một hợp chất có công thức Fe_xO_y, biết %Fe = 70%. Công thức của hợp chất là:",
        options: [
          "FeO",
          "Fe₂O₃",
          "Fe₃O₄",
          "FeO₂"
        ],
        correctAnswer: 2,
        explanation: "✅ %Fe = (x×56)/(x×56+y×16) = 70% → Fe₃O₄",
        points: 20
      },
      {
        type: "fill-in-blank",
        question: "Một oxit sắt có khối lượng mol là 160 g/mol và %Fe = 70%. Công thức của oxit là Fe___O___",
        correctAnswer: "3O4",
        hint: "💡 M = 160, %Fe = 70% → tính x và y",
        explanation: "✅ Khối lượng Fe = 112g → 112/56 = 2×1,5 = 3; Khối lượng O = 48g → 48/16 = 3×1,33 = 4",
        points: 20
      },
      {
        type: "matching",
        question: "🧠 Ghép hợp chất với thành phần % khối lượng",
        pairs: [
          { left: "H₂O", right: "%O ≈ 89%" },
          { left: "CO₂", right: "%O ≈ 73%" },
          { left: "SO₂", right: "%O = 50%" }
        ],
        explanation: "✅ Xuất sắc! Bạn tính toán chính xác.",
        points: 20
      },
      {
        type: "multiple-choice",
        question: "Hợp chất A có công thức Ca_xC_yO_z với %Ca = 40%, %C = 12%. Tỉ lệ x:y:z là:",
        options: [
          "1:1:2",
          "1:1:3",
          "2:1:3",
          "1:2:3"
        ],
        correctAnswer: 1,
        explanation: "✅ %O = 48% → x:y:z = (40/40):(12/12):(48/16) = 1:1:3 → CaCO₃",
        points: 20
      }
    ]
  }
};
