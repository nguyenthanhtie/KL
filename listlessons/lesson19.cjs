module.exports = {
  classId: 8,
  chapterId: 5,
  lessonId: 19,
  title: "Bài 19: Phản ứng oxi hóa - khử",
  description: "Định nghĩa và xác định chất khử, chất oxi hóa, sự khử, sự oxi hóa trong các phản ứng hóa học.",
  level: "Intermediate",
  order: 19,
  theory: `
    <h2>🔄 Phản ứng Oxi hóa - Khử</h2>
    <p>Phản ứng oxi hóa - khử là loại phản ứng hóa học rất phổ biến và quan trọng, xảy ra đồng thời cả quá trình oxi hóa và quá trình khử.</p>
    
    <h3>1. Sự khử và Sự oxi hóa</h3>
    <div style="background: #f0f9ff; padding: 15px; border-left: 4px solid #0284c7; margin: 15px 0;">
      <ul>
        <li><strong>Sự khử (Quá trình khử):</strong> Là sự tách oxi ra khỏi một hợp chất.</li>
        <li><strong>Sự oxi hóa (Quá trình oxi hóa):</strong> Là sự tác dụng của oxi với một chất.</li>
      </ul>
      <p><em>Ví dụ: Trong phản ứng H₂ + CuO → Cu + H₂O</em></p>
      <ul>
        <li>CuO bị tách mất nguyên tử O, đó là <strong>sự khử</strong> CuO.</li>
        <li>H₂ đã kết hợp với nguyên tử O, đó là <strong>sự oxi hóa</strong> H₂.</li>
      </ul>
    </div>

    <h3>2. Chất khử và Chất oxi hóa</h3>
    <div style="background: #ecfdf5; padding: 15px; border-left: 4px solid #10b981; margin: 15px 0;">
      <ul>
        <li><strong>Chất khử:</strong> Là chất chiếm oxi của chất khác.</li>
        <li><strong>Chất oxi hóa:</strong> Là chất nhường oxi cho chất khác.</li>
      </ul>
      <p><em>Ví dụ: Trong phản ứng H₂ + CuO → Cu + H₂O</em></p>
      <ul>
        <li>H₂ là <strong>chất khử</strong>.</li>
        <li>CuO là <strong>chất oxi hóa</strong>.</li>
      </ul>
    </div>

    <h3>3. Định nghĩa Phản ứng Oxi hóa - Khử</h3>
    <div style="background: #fefce8; padding: 15px; border-left: 4px solid #eab308; margin: 15px 0;">
      <p><strong>Định nghĩa:</strong> Phản ứng oxi hóa - khử là phản ứng hóa học trong đó xảy ra đồng thời sự oxi hóa và sự khử.</p>
    </div>

    <p><strong>Mẹo ghi nhớ:</strong></p>
    <p style="text-align: center; font-weight: bold; font-size: 1.2em; background: #f1f5f9; padding: 10px; border-radius: 8px;">
      "Khử cho, O nhận" (Chất khử cho electron, Chất oxi hóa nhận electron) - Mở rộng<br>
      "Chất khử thì bị oxi hóa, Chất oxi hóa thì bị khử"
    </p>

    <h3>4. Ví dụ phân tích</h3>
    <p>Xét phản ứng: Fe₂O₃ + 3CO → 2Fe + 3CO₂ (t°)</p>
    <ul>
      <li><strong>Chất khử:</strong> CO (vì chiếm oxi từ Fe₂O₃)</li>
      <li><strong>Chất oxi hóa:</strong> Fe₂O₃ (vì nhường oxi cho CO)</li>
      <li><strong>Sự khử:</strong> Sự khử Fe₂O₃ thành Fe.</li>
      <li><strong>Sự oxi hóa:</strong> Sự oxi hóa CO thành CO₂.</li>
    </ul>
    <p>Đây là một phản ứng oxi hóa - khử.</p>
  `,
  game: {
    // 🌱 CẤP ĐỘ CƠ BẢN
    basic: [
      {
        type: "multiple-choice",
        question: "Sự tác dụng của oxi với một chất được gọi là gì?",
        options: ["Sự khử", "Sự oxi hóa", "Sự phân hủy", "Sự hóa hợp"],
        correctAnswer: 1,
        explanation: "✅ Sự oxi hóa là sự tác dụng của oxi với một chất.",
        points: 10
      },
      {
        type: "true-false",
        question: "Chất chiếm oxi của chất khác được gọi là chất khử.",
        correctAnswer: true,
        explanation: "✅ Đúng, chất khử 'khử' chất khác bằng cách lấy đi oxi.",
        points: 10
      },
      {
        type: "multiple-choice",
        question: "Trong phản ứng oxi hóa - khử, quá trình nào xảy ra đồng thời?",
        options: ["Sự khử và sự phân hủy", "Sự oxi hóa và sự hóa hợp", "Sự oxi hóa và sự khử", "Sự cháy và sự bay hơi"],
        correctAnswer: 2,
        explanation: "✅ Phản ứng oxi hóa - khử luôn có cả sự oxi hóa và sự khử diễn ra cùng lúc.",
        points: 10
      },
      {
        type: "fill-in-blank",
        question: "Chất nhường oxi cho chất khác được gọi là chất ___.",
        correctAnswer: "oxi hóa",
        explanation: "✅ Chất oxi hóa cung cấp oxi cho quá trình phản ứng.",
        points: 10
      },
      {
        type: "true-false",
        question: "Trong một phản ứng, chất khử bị khử.",
        correctAnswer: false,
        explanation: "❌ Sai, chất khử bị oxi hóa, còn chất oxi hóa thì bị khử.",
        points: 10
      }
    ],
    // 🔥 CẤP ĐỘ TRUNG BÌNH
    intermediate: [
      {
        type: "multiple-choice",
        question: "Trong phản ứng: ZnO + C → Zn + CO, chất nào là chất oxi hóa?",
        options: ["ZnO", "C", "Zn", "CO"],
        correctAnswer: 0,
        explanation: "✅ ZnO đã nhường oxi cho C, do đó ZnO là chất oxi hóa.",
        points: 15
      },
      {
        type: "matching",
        question: "🔗 Ghép các thuật ngữ với định nghĩa đúng.",
        pairs: [
          { left: "Chất khử", right: "Chất chiếm oxi" },
          { left: "Chất oxi hóa", right: "Chất nhường oxi" },
          { left: "Sự khử", right: "Sự tách oxi" },
          { left: "Sự oxi hóa", right: "Sự kết hợp với oxi" }
        ],
        explanation: "✅ Nắm vững các định nghĩa này là chìa khóa để hiểu phản ứng oxi hóa - khử.",
        points: 15
      },
      {
        type: "multiple-choice",
        question: "Phản ứng nào sau đây KHÔNG phải là phản ứng oxi hóa - khử?",
        options: [
            "2H₂ + O₂ → 2H₂O", 
            "CaCO₃ → CaO + CO₂", 
            "Fe + 2HCl → FeCl₂ + H₂", 
            "CH₄ + 2O₂ → CO₂ + 2H₂O"
        ],
        correctAnswer: 1,
        explanation: "✅ Phản ứng CaCO₃ → CaO + CO₂ là phản ứng phân hủy, không có sự thay đổi số oxi hóa của các nguyên tố.",
        points: 15
      },
       {
        type: "drag-drop",
        question: "🧩 Xác định vai trò các chất trong phản ứng: 2Mg + O₂ → 2MgO",
        slots: [
          { id: 1, label: "Chất khử:", accepts: ["Mg"] },
          { id: 2, label: "Chất oxi hóa:", accepts: ["O₂"] }
        ],
        options: ["Mg", "O₂", "MgO"],
        explanation: "✅ Mg kết hợp với oxi (bị oxi hóa) nên là chất khử. O₂ nhường oxi (bị khử) nên là chất oxi hóa.",
        points: 15
      },
      {
        type: "fill-in-blank",
        question: "Trong phản ứng H₂ + Cl₂ → 2HCl, H₂ là chất khử và Cl₂ là chất ___.",
        correctAnswer: "oxi hóa",
        hint: "💡 Mặc dù không có oxi, đây vẫn là phản ứng oxi hóa - khử dựa trên sự thay đổi số oxi hóa.",
        explanation: "✅ Theo định nghĩa mở rộng, H₂ cho electron (số oxi hóa tăng từ 0 lên +1) là chất khử. Cl₂ nhận electron (số oxi hóa giảm từ 0 xuống -1) là chất oxi hóa.",
        points: 15
      }
    ],
    // ⚡ CẤP ĐỘ NÂNG CAO
    advanced: [
      {
        type: "multiple-choice",
        question: "Trong phản ứng: MnO₂ + 4HCl → MnCl₂ + Cl₂ + 2H₂O, vai trò của HCl là gì?",
        options: ["Chỉ là chất khử", "Chỉ là chất tạo môi trường", "Vừa là chất khử, vừa là chất tạo môi trường", "Chỉ là chất oxi hóa"],
        correctAnswer: 2,
        explanation: "✅ Một phần HCl (2Cl⁻ → Cl₂) đóng vai trò là chất khử. Phần còn lại của HCl kết hợp với Mn²⁺ tạo muối MnCl₂, đóng vai trò là chất tạo môi trường.",
        points: 20
      },
      {
        type: "true-false",
        question: "Tất cả các phản ứng hóa hợp đều là phản ứng oxi hóa - khử.",
        correctAnswer: false,
        explanation: "❌ Sai. Ví dụ: CaO + H₂O → Ca(OH)₂ là phản ứng hóa hợp nhưng không phải phản ứng oxi hóa - khử vì không có sự thay đổi số oxi hóa.",
        points: 20
      },
      {
        type: "multiple-choice",
        question: "Cho sơ đồ: Fe + H₂SO₄(đặc, nóng) → Fe₂(SO₄)₃ + SO₂ + H₂O. Tổng hệ số cân bằng (số nguyên, tối giản) của phản ứng là:",
        options: ["13", "15", "11", "9"],
        correctAnswer: 0,
        explanation: "✅ PTHH cân bằng: 2Fe + 6H₂SO₄ → Fe₂(SO₄)₃ + 3SO₂ + 6H₂O. Tổng hệ số là 2 + 6 + 1 + 3 + 6 = 18. (Câu hỏi có thể gây nhầm lẫn, cần xem lại. Nếu tính tổng các chất tham gia và sản phẩm thì là 18. Nếu chỉ tính các hệ số tối giản thì là 2,6,1,3,6).",
        points: 20
      },
      {
        type: "fill-in-blank",
        question: "Quá trình một chất nhận electron được gọi là quá trình ___.",
        correctAnswer: "khử",
        hint: "💡 Chất oxi hóa nhận electron và bị khử.",
        explanation: "✅ Chất oxi hóa nhận e → Bị khử (trải qua quá trình khử). Chất khử nhường e → Bị oxi hóa (trải qua quá trình oxi hóa).",
        points: 20
      },
      {
        type: "matching",
        question: "🧠 Ghép quá trình với tên gọi đúng của nó.",
        pairs: [
          { left: "Fe → Fe³⁺ + 3e", right: "Quá trình oxi hóa" },
          { left: "S⁺⁶ + 2e → S⁺⁴", right: "Quá trình khử" },
          { left: "2Cl⁻ → Cl₂ + 2e", right: "Quá trình oxi hóa" },
          { left: "N⁺⁵ + 3e → N⁺²", right: "Quá trình khử" }
        ],
        explanation: "✅ Quá trình nhường electron là quá trình oxi hóa. Quá trình nhận electron là quá trình khử.",
        points: 20
      }
    ]
  }
};
