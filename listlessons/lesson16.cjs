module.exports = {
  classId: 8,
  chapterId: 4,
  lessonId: 16,
  title: "Bài 16: Axit - Bazơ - Muối",
  description: "Phân biệt các khái niệm cơ bản về axit, bazơ, muối và cách gọi tên chúng.",
  level: "Intermediate",
  order: 16,
  theory: `
    <h2>🧪 Axit - Bazơ - Muối</h2>
    <p>Đây là ba loại hợp chất vô cơ quan trọng và phổ biến nhất, có nhiều ứng dụng trong đời sống và công nghiệp.</p>
    
    <h3>1. Axit</h3>
    <div style="background: #fff1f2; padding: 15px; border-left: 4px solid #e11d48; margin: 15px 0;">
      <p><strong>Khái niệm:</strong> Phân tử axit gồm có một hay nhiều nguyên tử hiđro liên kết với gốc axit. Các nguyên tử hiđro này có thể thay thế bằng nguyên tử kim loại.</p>
      <p><strong>Công thức chung:</strong> HₙA (với A là gốc axit, n là hóa trị của gốc A).</p>
      <p><strong>Tính chất:</strong> Dung dịch axit làm quỳ tím hóa <strong>đỏ</strong>.</p>
      <h4>Phân loại và gọi tên:</h4>
      <ul>
        <li><strong>Axit không có Oxi:</strong> Tên axit = "axit" + tên phi kim + "hiđric".
          <br><em>Ví dụ: HCl - axit clohiđric, H₂S - axit sunfuhiđric.</em>
        </li>
        <li><strong>Axit có Oxi:</strong>
          <ul>
            <li>Axit có nhiều Oxi: Tên axit = "axit" + tên phi kim + "ic".
              <br><em>Ví dụ: H₂SO₄ - axit sunfuric, HNO₃ - axit nitric.</em>
            </li>
            <li>Axit có ít Oxi: Tên axit = "axit" + tên phi kim + "ơ".
              <br><em>Ví dụ: H₂SO₃ - axit sunfurơ.</em>
            </li>
          </ul>
        </li>
      </ul>
    </div>

    <h3>2. Bazơ</h3>
    <div style="background: #f0f9ff; padding: 15px; border-left: 4px solid #0284c7; margin: 15px 0;">
      <p><strong>Khái niệm:</strong> Phân tử bazơ gồm có một nguyên tử kim loại liên kết với một hay nhiều nhóm hiđroxit (-OH).</p>
      <p><strong>Công thức chung:</strong> M(OH)ₙ (với M là kim loại, n là hóa trị của M).</p>
      <p><strong>Tính chất:</strong> Dung dịch bazơ (kiềm) làm quỳ tím hóa <strong>xanh</strong>, làm phenolphtalein hóa <strong>hồng</strong>.</p>
      <h4>Phân loại và gọi tên:</h4>
      <ul>
        <li><strong>Bazơ tan (Kiềm):</strong> NaOH, KOH, Ca(OH)₂, Ba(OH)₂...</li>
        <li><strong>Bazơ không tan:</strong> Cu(OH)₂, Fe(OH)₃, Mg(OH)₂...</li>
      </ul>
      <p><strong>Cách gọi tên:</strong> Tên bazơ = Tên kim loại (+ hóa trị nếu kim loại có nhiều hóa trị) + "hiđroxit".</p>
      <p><em>Ví dụ: NaOH - Natri hiđroxit, Fe(OH)₂ - Sắt(II) hiđroxit, Fe(OH)₃ - Sắt(III) hiđroxit.</em></p>
    </div>

    <h3>3. Muối</h3>
    <div style="background: #fefce8; padding: 15px; border-left: 4px solid #eab308; margin: 15px 0;">
      <p><strong>Khái niệm:</strong> Phân tử muối gồm có một hay nhiều nguyên tử kim loại liên kết với một hay nhiều gốc axit.</p>
      <p><strong>Công thức chung:</strong> MₓAᵧ (M là kim loại, A là gốc axit).</p>
      <h4>Phân loại và gọi tên:</h4>
      <ul>
        <li><strong>Muối trung hòa:</strong> Gốc axit không còn hiđro có khả năng thay thế.
          <br><em>Ví dụ: NaCl, K₂SO₄, CaCO₃.</em>
        </li>
        <li><strong>Muối axit:</strong> Gốc axit vẫn còn hiđro chưa được thay thế.
          <br><em>Ví dụ: NaHCO₃, KHSO₄.</em>
        </li>
      </ul>
      <p><strong>Cách gọi tên:</strong> Tên muối = Tên kim loại (+ hóa trị) + Tên gốc axit.</p>
      <p><em>Ví dụ: NaCl - Natri clorua, Fe₂(SO₄)₃ - Sắt(III) sunfat, NaHCO₃ - Natri hiđrocacbonat.</em></p>
    </div>
  `,
  game: {
    // 🌱 CẤP ĐỘ CƠ BẢN
    basic: [
      {
        type: "multiple-choice",
        question: "Dung dịch axit làm quỳ tím chuyển sang màu gì?",
        options: ["Xanh", "Đỏ", "Tím", "Không đổi màu"],
        correctAnswer: 1,
        explanation: "✅ Đây là tính chất nhận biết đặc trưng của axit.",
        points: 10
      },
      {
        type: "true-false",
        question: "NaOH là một axit.",
        correctAnswer: false,
        explanation: "❌ Sai, NaOH là một bazơ (Natri hiđroxit) vì có nhóm -OH.",
        points: 10
      },
      {
        type: "multiple-choice",
        question: "Hợp chất nào sau đây là muối?",
        options: ["HCl", "KOH", "NaCl", "H₂O"],
        correctAnswer: 2,
        explanation: "✅ NaCl (Natri clorua) được tạo từ kim loại Na và gốc axit Cl.",
        points: 10
      },
      {
        type: "fill-in-blank",
        question: "Công thức chung của bazơ là M(OH)ₙ, trong đó M là ___.",
        correctAnswer: "kim loại",
        explanation: "✅ Bazơ được cấu tạo từ kim loại và nhóm hiđroxit (-OH).",
        points: 10
      },
      {
        type: "true-false",
        question: "Dung dịch bazơ làm quỳ tím hóa xanh.",
        correctAnswer: true,
        explanation: "✅ Đúng, đây là tính chất nhận biết của dung dịch kiềm (bazơ tan).",
        points: 10
      }
    ],
    // 🔥 CẤP ĐỘ TRUNG BÌNH
    intermediate: [
      {
        type: "matching",
        question: "🔗 Ghép công thức với tên gọi đúng.",
        pairs: [
          { left: "H₂SO₄", right: "Axit sunfuric" },
          { left: "Fe(OH)₂", right: "Sắt(II) hiđroxit" },
          { left: "CaCO₃", right: "Canxi cacbonat" },
          { left: "H₂S", right: "Axit sunfuhiđric" }
        ],
        explanation: "✅ Tuyệt vời! Bạn đã nắm vững cách gọi tên các hợp chất.",
        points: 15
      },
      {
        type: "multiple-choice",
        question: "Dãy chất nào sau đây chỉ gồm các bazơ không tan?",
        options: ["NaOH, KOH, Ba(OH)₂", "Cu(OH)₂, Fe(OH)₃, Mg(OH)₂", "Ca(OH)₂, Al(OH)₃, Zn(OH)₂", "Fe(OH)₂, KOH, Al(OH)₃"],
        correctAnswer: 1,
        explanation: "✅ Cu(OH)₂, Fe(OH)₃, và Mg(OH)₂ đều là các bazơ không tan trong nước.",
        points: 15
      },
      {
        type: "ordering",
        question: "📋 Sắp xếp các axit sau theo thứ tự mạnh dần.",
        options: ["H₂CO₃ (axit cacbonic)", "HCl (axit clohiđric)", "H₂SO₄ (axit sunfuric)", "H₂S (axit sunfuhiđric)"],
        correctOrder: ["H₂S (axit sunfuhiđric)", "H₂CO₃ (axit cacbonic)", "HCl (axit clohiđric)", "H₂SO₄ (axit sunfuric)"],
        explanation: "✅ H₂SO₄ và HCl là các axit mạnh, trong khi H₂CO₃ và H₂S là các axit rất yếu.",
        points: 15
      },
       {
        type: "drag-drop",
        question: "🧩 Phân loại các hợp chất sau vào đúng nhóm.",
        slots: [
          { id: 1, label: "Axit", accepts: ["HNO₃"] },
          { id: 2, label: "Bazơ", accepts: ["KOH"] },
          { id: 3, label: "Muối", accepts: ["KNO₃"] }
        ],
        options: ["HNO₃", "KOH", "KNO₃"],
        explanation: "✅ HNO₃ là axit nitric, KOH là kali hiđroxit (bazơ), KNO₃ là kali nitrat (muối).",
        points: 15
      },
      {
        type: "fill-in-blank",
        question: "Muối NaHCO₃ có tên gọi là Natri hiđrocacbonat, đây là một muối ___.",
        correctAnswer: "axit",
        hint: "💡 Gốc axit vẫn còn nguyên tử H.",
        explanation: "✅ Gốc axit -HCO₃ vẫn còn hiđro có thể phân li ra ion H⁺.",
        points: 15
      }
    ],
    // ⚡ CẤP ĐỘ NÂNG CAO
    advanced: [
      {
        type: "multiple-choice",
        question: "Để phân biệt dung dịch HCl và dung dịch H₂SO₄ loãng, ta có thể dùng thuốc thử nào?",
        options: ["Quỳ tím", "Dung dịch BaCl₂", "Dung dịch NaOH", "Bột Sắt"],
        correctAnswer: 1,
        explanation: "✅ Dùng BaCl₂, H₂SO₄ sẽ tạo kết tủa trắng BaSO₄, còn HCl thì không. Quỳ tím, NaOH, Fe đều cho hiện tượng giống nhau với cả hai axit.",
        points: 20
      },
      {
        type: "true-false",
        question: "Tất cả các bazơ đều là chất điện li mạnh.",
        correctAnswer: false,
        explanation: "❌ Sai, chỉ có các bazơ tan (kiềm) như NaOH, KOH, Ba(OH)₂ mới là chất điện li mạnh. Các bazơ không tan là chất điện li yếu.",
        points: 20
      },
      {
        type: "multiple-choice",
        question: "Gốc axit nào sau đây có hóa trị II?",
        options: ["-Cl", "-NO₃", "=SO₄", "-HSO₄"],
        correctAnswer: 2,
        explanation: "✅ Gốc sunfat (=SO₄) có hóa trị II. Gốc -Cl, -NO₃, -HSO₄ đều có hóa trị I.",
        points: 20
      },
      {
        type: "fill-in-blank",
        question: "Khi cho Fe(OH)₃ tác dụng với HCl, sản phẩm muối thu được là ___.",
        correctAnswer: "FeCl₃",
        hint: "💡 Fe trong Fe(OH)₃ có hóa trị III.",
        explanation: "✅ Phản ứng: Fe(OH)₃ + 3HCl → FeCl₃ + 3H₂O. Muối tạo thành là Sắt(III) clorua.",
        points: 20
      },
      {
        type: "matching",
        question: "🧠 Ghép tên gốc axit với công thức và hóa trị.",
        pairs: [
          { left: "Clorua", right: "-Cl (I)" },
          { left: "Sunfat", right: "=SO₄ (II)" },
          { left: "Nitrat", right: "-NO₃ (I)" },
          { left: "Cacbonat", right: "=CO₃ (II)" }
        ],
        explanation: "✅ Nắm vững gốc axit là chìa khóa để viết đúng công thức và gọi tên muối!",
        points: 20
      }
    ]
  }
};
