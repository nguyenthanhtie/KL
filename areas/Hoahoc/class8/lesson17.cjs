module.exports = {
  classId: 8,
  chapterId: 4,
  lessonId: 17,
  title: "Bài 17: Dung dịch",
  description: "Tìm hiểu về dung dịch, dung môi, chất tan, nồng độ phần trăm và nồng độ mol của dung dịch.",
  level: "Intermediate",
  order: 17,
  theory: `
    <h2>🥤 Dung dịch</h2>
    <p>Dung dịch là một khái niệm quen thuộc trong hóa học và đời sống, ví dụ như nước đường, nước muối, nước chanh...</p>
    
    <h3>1. Dung môi, chất tan và dung dịch</h3>
    <div style="background: #f0f9ff; padding: 15px; border-left: 4px solid #0284c7; margin: 15px 0;">
      <ul>
        <li><strong>Dung môi:</strong> Là chất có khả năng hòa tan chất khác để tạo thành dung dịch. Nước là dung môi phổ biến nhất.</li>
        <li><strong>Chất tan:</strong> Là chất bị hòa tan trong dung môi. Ví dụ: đường, muối.</li>
        <li><strong>Dung dịch:</strong> Là hỗn hợp đồng nhất của dung môi và chất tan.</li>
      </ul>
      <p style="text-align: center; font-weight: bold; font-size: 1.2em;">Dung dịch = Dung môi + Chất tan</p>
    </div>

    <h3>2. Dung dịch chưa bão hòa và dung dịch bão hòa</h3>
    <ul>
      <li><strong>Dung dịch chưa bão hòa:</strong> Là dung dịch có thể hòa tan thêm chất tan.</li>
      <li><strong>Dung dịch bão hòa:</strong> Là dung dịch không thể hòa tan thêm chất tan ở một nhiệt độ xác định.</li>
    </ul>

    <h3>3. Nồng độ dung dịch</h3>
    <p>Nồng độ dung dịch cho biết lượng chất tan có trong một lượng dung dịch hoặc dung môi xác định. Có hai loại nồng độ thường dùng:</p>
    
    <h4>a. Nồng độ phần trăm (C%)</h4>
    <div style="background: #fefce8; padding: 15px; border-left: 4px solid #eab308; margin: 15px 0;">
      <p><strong>Định nghĩa:</strong> Nồng độ phần trăm của một dung dịch cho biết khối lượng chất tan có trong 100g dung dịch.</p>
      <p><strong>Công thức:</strong></p>
      <div style="text-align: center; font-size: 1.2em; font-weight: bold; margin: 15px 0; padding: 10px; background: #fffbeb;">
        C% = (m<sub>ct</sub> / m<sub>dd</sub>) × 100%
      </div>
      <p>Trong đó:</p>
      <ul>
        <li><strong>m<sub>ct</sub>:</strong> khối lượng chất tan (g)</li>
        <li><strong>m<sub>dd</sub>:</strong> khối lượng dung dịch (g)</li>
        <li><strong>m<sub>dd</sub> = m<sub>ct</sub> + m<sub>dm</sub></strong> (m<sub>dm</sub> là khối lượng dung môi)</li>
      </ul>
      <p><em>Ví dụ: Dung dịch NaCl 20% nghĩa là trong 100g dung dịch có chứa 20g NaCl và 80g H₂O.</em></p>
    </div>

    <h4>b. Nồng độ mol (Cₘ)</h4>
    <div style="background: #ecfdf5; padding: 15px; border-left: 4px solid #10b981; margin: 15px 0;">
      <p><strong>Định nghĩa:</strong> Nồng độ mol của một dung dịch cho biết số mol chất tan có trong 1 lít dung dịch.</p>
      <p><strong>Công thức:</strong></p>
      <div style="text-align: center; font-size: 1.2em; font-weight: bold; margin: 15px 0; padding: 10px; background: #f0fdf4;">
        Cₘ = n / V
      </div>
      <p>Trong đó:</p>
      <ul>
        <li><strong>n:</strong> số mol chất tan (mol)</li>
        <li><strong>V:</strong> thể tích dung dịch (lít)</li>
      </ul>
      <p><em>Ví dụ: Dung dịch NaOH 2M (hoặc 2 mol/l) nghĩa là trong 1 lít dung dịch có chứa 2 mol NaOH.</em></p>
    </div>
  `,
  game: {
    // 🌱 CẤP ĐỘ CƠ BẢN
    basic: [
      {
        type: "multiple-choice",
        question: "Trong dung dịch nước đường, nước đóng vai trò là gì?",
        options: ["Chất tan", "Dung môi", "Dung dịch", "Chất điện li"],
        correctAnswer: 1,
        explanation: "✅ Nước là chất hòa tan đường, nên nước là dung môi.",
        points: 10
      },
      {
        type: "true-false",
        question: "Dung dịch là hỗn hợp đồng nhất của dung môi và chất tan.",
        correctAnswer: true,
        explanation: "✅ Đúng, đây là định nghĩa của dung dịch.",
        points: 10
      },
      {
        type: "multiple-choice",
        question: "Đơn vị của nồng độ mol là gì?",
        options: ["g/mol", "%", "mol/lít", "g/lít"],
        correctAnswer: 2,
        explanation: "✅ Nồng độ mol (Cₘ) được tính bằng số mol chất tan trên một lít dung dịch.",
        points: 10
      },
      {
        type: "fill-in-blank",
        question: "Khối lượng dung dịch bằng tổng khối lượng chất tan và khối lượng ___.",
        correctAnswer: "dung môi",
        explanation: "✅ m(dung dịch) = m(chất tan) + m(dung môi).",
        points: 10
      },
      {
        type: "true-false",
        question: "Dung dịch bão hòa có thể hòa tan thêm chất tan.",
        correctAnswer: false,
        explanation: "❌ Sai, dung dịch bão hòa đã chứa lượng chất tan tối đa ở nhiệt độ đó.",
        points: 10
      }
    ],
    // 🔥 CẤP ĐỘ TRUNG BÌNH
    intermediate: [
      {
        type: "multiple-choice",
        question: "Hòa tan 10g NaCl vào 40g nước. Nồng độ phần trăm của dung dịch thu được là:",
        options: ["10%", "20%", "25%", "40%"],
        correctAnswer: 1,
        explanation: "✅ m(dd) = 10 + 40 = 50g. C% = (10 / 50) * 100% = 20%.",
        points: 15
      },
      {
        type: "matching",
        question: "🔗 Ghép công thức với tên đại lượng tương ứng.",
        pairs: [
          { left: "C% = (m_ct / m_dd) × 100%", right: "Nồng độ phần trăm" },
          { left: "Cₘ = n / V", right: "Nồng độ mol" },
          { left: "m_dd = m_ct + m_dm", right: "Khối lượng dung dịch" }
        ],
        explanation: "✅ Bạn đã thuộc hết các công thức quan trọng rồi đấy!",
        points: 15
      },
      {
        type: "ordering",
        question: "📋 Sắp xếp các bước để pha chế 100g dung dịch NaCl 10%.",
        options: [
          "Cân 10g NaCl",
          "Cân 90g (hoặc đong 90ml) nước cất",
          "Cho NaCl vào cốc chứa nước, khuấy đều cho tan hết"
        ],
        correctOrder: [
          "Cân 10g NaCl",
          "Cân 90g (hoặc đong 90ml) nước cất",
          "Cho NaCl vào cốc chứa nước, khuấy đều cho tan hết"
        ],
        explanation: "✅ Đây là quy trình chuẩn để pha chế một dung dịch theo nồng độ phần trăm.",
        points: 15
      },
       {
        type: "drag-drop",
        question: "🧩 Tính C% của dung dịch khi hòa tan 25g đường vào 75g nước.",
        slots: [
          { id: 1, label: "m_ct =", accepts: ["25g"] },
          { id: 2, label: "m_dd =", accepts: ["100g"] },
          { id: 3, label: "C% =", accepts: ["25%"] }
        ],
        options: ["25g", "100g", "25%", "75g"],
        explanation: "✅ m_dd = 25 + 75 = 100g. C% = (25/100)*100 = 25%.",
        points: 15
      },
      {
        type: "fill-in-blank",
        question: "Hòa tan 0.5 mol NaOH vào nước để được 2 lít dung dịch. Nồng độ mol của dung dịch là ___ M.",
        correctAnswer: "0.25",
        hint: "💡 Cₘ = n / V",
        explanation: "✅ Cₘ = 0.5 mol / 2 lít = 0.25 mol/l hay 0.25M.",
        points: 15
      }
    ],
    // ⚡ CẤP ĐỘ NÂNG CAO
    advanced: [
      {
        type: "multiple-choice",
        question: "Cần bao nhiêu gam NaOH để pha chế 200ml dung dịch NaOH 2M? (Na=23, O=16, H=1)",
        options: ["8g", "16g", "40g", "80g"],
        correctAnswer: 1,
        explanation: "✅ V = 200ml = 0.2 lít. n = Cₘ * V = 2 * 0.2 = 0.4 mol. m = n * M = 0.4 * 40 = 16g.",
        points: 20
      },
      {
        type: "true-false",
        question: "Độ tan của một chất rắn trong nước luôn tăng khi nhiệt độ tăng.",
        correctAnswer: false,
        explanation: "❌ Sai, đa số các chất rắn có độ tan tăng theo nhiệt độ, nhưng có một số trường hợp ngoại lệ, ví dụ như Na₂SO₄ có độ tan giảm khi nhiệt độ tăng quá 32.4°C.",
        points: 20
      },
      {
        type: "multiple-choice",
        question: "Trộn 200g dung dịch H₂SO₄ 10% với 300g dung dịch H₂SO₄ 25%. Dung dịch mới có nồng độ là:",
        options: ["19%", "17.5%", "15%", "20%"],
        correctAnswer: 0,
        explanation: "✅ m_ct1 = 200*10% = 20g. m_ct2 = 300*25% = 75g. m_ct(tổng) = 95g. m_dd(tổng) = 500g. C% = (95/500)*100% = 19%.",
        points: 20
      },
      {
        type: "fill-in-blank",
        question: "Một dung dịch H₂SO₄ có nồng độ 98% và khối lượng riêng D = 1.84 g/ml. Nồng độ mol của dung dịch này là ___ M.",
        correctAnswer: "18.4",
        hint: "💡 Xét 1 lít dung dịch. Cₘ = (10 × C% × D) / M",
        explanation: "✅ Cₘ = (10 * 98 * 1.84) / 98 = 18.4M. Đây là dung dịch H₂SO₄ đậm đặc.",
        points: 20
      },
      {
        type: "matching",
        question: "🧠 Ghép bài toán với công thức áp dụng chính.",
        pairs: [
          { left: "Pha loãng dung dịch", right: "V₁C₁ = V₂C₂ (C là Cₘ hoặc C%)" },
          { left: "Tính C% từ Cₘ", right: "C% = (Cₘ × M) / (10 × D)" },
          { left: "Trộn 2 dung dịch cùng chất tan", right: "Áp dụng quy tắc đường chéo" },
          { left: "Tính khối lượng chất tan cần thêm", right: "m_ct = m_dd × (C%_sau - C%_trước) / (100 - C%_sau)" }
        ],
        explanation: "✅ Nắm vững các công thức biến đổi này sẽ giúp bạn giải quyết nhanh các bài toán phức tạp về dung dịch.",
        points: 20
      }
    ]
  }
};
