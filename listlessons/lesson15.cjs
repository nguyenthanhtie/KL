module.exports = {
  classId: 8,
  chapterId: 4,
  lessonId: 15,
  title: "Bài 15: Nước",
  description: "Tìm hiểu về thành phần, tính chất vật lí, tính chất hóa học và vai trò của nước trong đời sống và sản xuất.",
  level: "Beginner",
  order: 15,
  theory: `
    <h2>💧 Nước - H₂O</h2>
    <p>Nước là một hợp chất hóa học quen thuộc và vô cùng quan trọng, có công thức hóa học là H₂O. Nó bao phủ khoảng 71% bề mặt Trái Đất.</p>
    
    <h3>1. Thành phần hóa học của Nước</h3>
    <p>Nước là hợp chất tạo bởi hai nguyên tố là Hiđro (H) và Oxi (O).</p>
    <ul>
      <li><strong>Sự tổng hợp nước:</strong> Đốt cháy khí hiđro trong khí oxi, ta thu được nước.
        <p style="text-align: center; font-weight: bold;">2H₂ + O₂ → 2H₂O</p>
      </li>
      <li><strong>Sự phân hủy nước:</strong> Dùng dòng điện để phân hủy nước, ta thu được khí hiđro và khí oxi.
        <p style-="text-align: center; font-weight: bold;">2H₂O --(điện phân)--> 2H₂ + O₂</p>
      </li>
      <li><strong>Tỉ lệ thành phần:</strong> Về khối lượng, tỉ lệ giữa H và O là 1:8. Về thể tích, 2 phần khí H₂ kết hợp với 1 phần khí O₂.</li>
    </ul>

    <h3>2. Tính chất của Nước</h3>
    <h4>a. Tính chất vật lí</h4>
    <div style="background: #f0f9ff; padding: 15px; border-left: 4px solid #0284c7; margin: 15px 0;">
      <ul>
        <li><strong>Trạng thái:</strong> Nước là chất lỏng, không màu, không mùi, không vị.</li>
        <li><strong>Nhiệt độ sôi:</strong> 100°C (ở áp suất 1 atm).</li>
        <li><strong>Nhiệt độ đông đặc:</strong> 0°C.</li>
        <li><strong>Khối lượng riêng:</strong> 1 g/ml (ở 4°C).</li>
        <li><strong>Tính hòa tan:</strong> Nước có thể hòa tan được nhiều chất rắn (muối, đường), lỏng (cồn, axit), và khí (amoniac, hiđro clorua).</li>
      </ul>
    </div>

    <h4>b. Tính chất hóa học</h4>
    <div style="background: #dcfce7; padding: 15px; border-left: 4px solid #16a34a; margin: 15px 0;">
      <p>Nước là một chất hóa học có hoạt động trung bình, có thể tác dụng với kim loại, oxit bazơ và oxit axit.</p>
      <ol>
        <li><strong>Tác dụng với kim loại:</strong> Nước tác dụng với một số kim loại ở nhiệt độ thường (Na, K, Ca, Ba...) tạo thành bazơ và giải phóng khí H₂.
          <p>Ví dụ: 2Na + 2H₂O → 2NaOH + H₂</p>
        </li>
        <li><strong>Tác dụng với oxit bazơ:</strong> Nhiều oxit bazơ tác dụng với nước tạo ra dung dịch bazơ (kiềm).
          <p>Ví dụ: CaO + H₂O → Ca(OH)₂</p>
        </li>
        <li><strong>Tác dụng với oxit axit:</strong> Nhiều oxit axit tác dụng với nước tạo ra dung dịch axit.
          <p>Ví dụ: P₂O₅ + 3H₂O → 2H₃PO₄</p>
        </li>
      </ol>
    </div>

    <h3>3. Vai trò của Nước</h3>
    <p>Nước có vai trò cực kỳ quan trọng:</p>
    <ul>
      <li>Là thành phần chính trong cơ thể sinh vật.</li>
      <li>Là dung môi cho nhiều phản ứng hóa học trong cơ thể.</li>
      <li>Tham gia vào quá trình sản xuất công nghiệp, nông nghiệp.</li>
      <li>Là nguồn năng lượng (thủy điện).</li>
    </ul>
    <p>Vì vậy, chúng ta cần phải bảo vệ nguồn nước sạch và sử dụng tiết kiệm.</p>
  `,
  game: {
    // 🌱 CẤP ĐỘ CƠ BẢN
    basic: [
      {
        type: "multiple-choice",
        question: "Công thức hóa học của nước là gì?",
        options: ["HO₂", "H₂O", "H₂O₂", "HO"],
        correctAnswer: 1,
        explanation: "✅ Nước được tạo thành từ 2 nguyên tử Hiđro và 1 nguyên tử Oxi.",
        points: 10
      },
      {
        type: "true-false",
        question: "Nước là một đơn chất.",
        correctAnswer: false,
        explanation: "❌ Sai, nước là một hợp chất vì nó được tạo thành từ hai nguyên tố hóa học là H và O.",
        points: 10
      },
      {
        type: "multiple-choice",
        question: "Ở điều kiện thường, nước ở trạng thái nào?",
        options: ["Rắn", "Lỏng", "Khí", "Plasma"],
        correctAnswer: 1,
        explanation: "✅ Nước tồn tại ở trạng thái lỏng trong khoảng nhiệt độ từ 0°C đến 100°C.",
        points: 10
      },
      {
        type: "fill-in-blank",
        question: "Nước sôi ở ___°C (tại áp suất 1 atm).",
        correctAnswer: "100",
        explanation: "✅ Đây là nhiệt độ sôi tiêu chuẩn của nước.",
        points: 10
      },
      {
        type: "true-false",
        question: "Nước có thể hòa tan được tất cả các chất.",
        correctAnswer: false,
        explanation: "❌ Sai, nước là một dung môi tốt nhưng không phải dung môi vạn năng. Ví dụ, dầu ăn không tan trong nước.",
        points: 10
      }
    ],
    // 🔥 CẤP ĐỘ TRUNG BÌNH
    intermediate: [
      {
        type: "multiple-choice",
        question: "Phản ứng nào sau đây chứng tỏ nước tác dụng với kim loại?",
        options: ["2H₂ + O₂ → 2H₂O", "CaO + H₂O → Ca(OH)₂", "2Na + 2H₂O → 2NaOH + H₂", "P₂O₅ + 3H₂O → 2H₃PO₄"],
        correctAnswer: 2,
        explanation: "✅ Phản ứng giữa Natri (kim loại) và nước tạo ra Natri hiđroxit và khí Hiđro.",
        points: 15
      },
      {
        type: "matching",
        question: "🔗 Ghép sản phẩm đúng với phản ứng của nước.",
        pairs: [
          { left: "Nước + K (Kali)", right: "Dung dịch bazơ + H₂" },
          { left: "Nước + SO₃ (Lưu huỳnh trioxit)", right: "Dung dịch axit" },
          { left: "Nước + BaO (Bari oxit)", right: "Dung dịch bazơ" }
        ],
        explanation: "✅ Bạn đã hiểu rõ các tính chất hóa học của nước.",
        points: 15
      },
      {
        type: "ordering",
        question: "📋 Sắp xếp các kim loại sau theo mức độ phản ứng với nước giảm dần.",
        options: ["Fe (Sắt)", "Na (Natri)", "Cu (Đồng)", "Ca (Canxi)"],
        correctOrder: ["Na (Natri)", "Ca (Canxi)", "Fe (Sắt)", "Cu (Đồng)"],
        explanation: "✅ Na và Ca phản ứng mạnh với nước ở nhiệt độ thường, Fe phản ứng ở nhiệt độ cao, Cu không phản ứng.",
        points: 15
      },
       {
        type: "drag-drop",
        question: "🧩 Hoàn thành phương trình điện phân nước.",
        slots: [
          { id: 1, label: "2H₂O →", accepts: ["2H₂"] },
          { id: 2, label: "+", accepts: ["O₂"] }
        ],
        options: ["2H₂", "O₂", "H₂O₂"],
        explanation: "✅ Điện phân nước tạo ra 2 thể tích khí Hiđro và 1 thể tích khí Oxi.",
        points: 15
      },
      {
        type: "fill-in-blank",
        question: "Khi cho CaO vào nước, dung dịch thu được làm quỳ tím chuyển sang màu ___.",
        correctAnswer: "xanh",
        hint: "💡 CaO + H₂O tạo ra Ca(OH)₂, là một bazơ.",
        explanation: "✅ Dung dịch bazơ làm quỳ tím hóa xanh.",
        points: 15
      }
    ],
    // ⚡ CẤP ĐỘ NÂNG CAO
    advanced: [
      {
        type: "multiple-choice",
        question: "Điện phân hoàn toàn 18g nước, thu được tổng thể tích khí H₂ và O₂ (đktc) là:",
        options: ["11.2 lít", "22.4 lít", "33.6 lít", "44.8 lít"],
        correctAnswer: 2,
        explanation: "✅ nH₂O = 18/18 = 1 mol. PTHH: 2H₂O → 2H₂ + O₂. Từ 1 mol H₂O tạo ra 1 mol H₂ và 0.5 mol O₂. Tổng số mol khí = 1.5 mol. V = 1.5 * 22.4 = 33.6 lít.",
        points: 20
      },
      {
        type: "true-false",
        question: "Nước đá (nước ở thể rắn) nặng hơn nước lỏng, nên nó chìm trong nước.",
        correctAnswer: false,
        explanation: "❌ Sai, do cấu trúc tinh thể đặc biệt, nước đá có khối lượng riêng nhỏ hơn nước lỏng, do đó nó nổi trên mặt nước.",
        points: 20
      },
      {
        type: "multiple-choice",
        question: "Dãy chất nào sau đây chỉ gồm các chất tan tốt trong nước?",
        options: ["NaCl, CaCO₃, C₂H₅OH", "C₆H₁₂O₆ (đường), NaOH, BaSO₄", "NaCl, C₁₂H₂₂O₁₁ (đường saccarozơ), HCl", "Fe(OH)₂, AgCl, CH₃COOH"],
        correctAnswer: 2,
        explanation: "✅ NaCl (muối ăn), đường saccarozơ và axit clohiđric đều tan tốt trong nước. CaCO₃, BaSO₄, Fe(OH)₂, AgCl là các chất kết tủa.",
        points: 20
      },
      {
        type: "fill-in-blank",
        question: "Để dập tắt đám cháy do xăng, dầu, người ta không dùng nước vì xăng, dầu nhẹ hơn nước và ___ trong nước.",
        correctAnswer: "không tan",
        explanation: "✅ Dùng nước sẽ làm đám cháy lan rộng hơn.",
        points: 20
      },
      {
        type: "matching",
        question: "🧠 Ghép vai trò của nước với ứng dụng thực tế.",
        pairs: [
          { left: "Dung môi hòa tan", right: "Pha nước chanh, nấu canh" },
          { left: "Tham gia phản ứng hóa học", right: "Sản xuất vôi tôi Ca(OH)₂" },
          { left: "Sinh hoạt con người", right: "Tắm, giặt, uống" },
          { left: "Sản xuất nông nghiệp", right: "Tưới tiêu cây trồng" }
        ],
        explanation: "✅ Nước thực sự là nguồn sống không thể thiếu!",
        points: 20
      }
    ]
  }
};
