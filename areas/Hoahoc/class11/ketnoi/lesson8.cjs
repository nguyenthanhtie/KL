module.exports = {
  classId: 11,
  curriculumType: 'ketnoi',
  chapterId: 2,
  chapterName: 'Chương 2: Nitrogen – sulfur',
  lessonId: 8,
  title: 'Bài 8: Sulfuric acid và muối sulfate',
  description: 'H2SO4 loãng/đặc, tính chất hoá học, điều chế, nhận biết muối sunfat.',
  level: 'Intermediate',
  order: 8,
  theory: `
    <h2>H2SO4 và muối sunfat</h2>
    <p style="margin:8px 0; color:#334155;">So sánh hành vi của H2SO4 loãng/đặc, tính oxi hoá, háo nước và cách nhận biết ion SO4^{2-}.</p>

    <div style="display:grid; gap:12px; grid-template-columns:repeat(auto-fit,minmax(260px,1fr)); margin:12px 0;">
      <div style="padding:12px; border:1px solid #e2e8f0; border-radius:10px; background:#f8fafc;">
        <h4 style="margin:0 0 6px; color:#0f172a;">H2SO4 loãng</h4>
        <ul style="margin:0; padding-left:18px; color:#475569;">
          <li>Axit mạnh, điện li hoàn toàn; phản ứng với bazơ, oxit bazơ, muối → tạo sunfat.</li>
          <li>Oxi hoá yếu: hiếm khi oxi hoá kim loại thường; giải phóng H2 với kim loại đứng trước H2.</li>
          <li>Ứng dụng: xử lí nước, điện phân, làm dung dịch chuẩn.</li>
        </ul>
      </div>
      <div style="padding:12px; border:1px solid #e2e8f0; border-radius:10px; background:#fff7ed;">
        <h4 style="margin:0 0 6px; color:#9a3412;">H2SO4 đặc</h4>
        <ul style="margin:0; padding-left:18px; color:#7c2d12;">
          <li>Háo nước mạnh: làm than hoá C6H12O6; hút ẩm khí.</li>
          <li>Oxi hoá mạnh ở nóng: Cu + 2H2SO4(đ) → CuSO4 + SO2↑ + 2H2O; không giải phóng H2.</li>
          <li>Tính axit vẫn mạnh, có thể proton hoá nhiều chất hữu cơ (este hoá).</li>
        </ul>
      </div>
    </div>

    <div style="padding:12px; border-radius:12px; border:1px solid #cbd5e1; background:linear-gradient(135deg,#eef2ff,#f8fafc); color:#334155; margin:12px 0;">
      <h4 style="margin:0 0 6px; color:#312e81;">Quy trình tiếp xúc (Contact)</h4>
      <ol style="margin:0; padding-left:20px;">
        <li>Đốt lưu huỳnh/quặng → SO2, làm sạch khí.</li>
        <li>Oxi hoá xúc tác V2O5: 2SO2 + O2 ⇌ 2SO3 (450°C, 1-2 atm).</li>
        <li>Hấp thụ SO3 vào H2SO4 đặc → oleum; pha loãng tạo H2SO4 mong muốn.</li>
      </ol>
      <p style="margin:6px 0 0;">Tránh hấp thụ trực tiếp SO3 vào nước vì tạo sương H2SO4 khó ngưng tụ.</p>
    </div>

    <div style="padding:12px; border:1px dashed #cbd5e1; border-radius:10px; background:#f8fafc; color:#475569;">
      <h4 style="margin:0 0 6px;">Muối sunfat</h4>
      <ul style="margin:0; padding-left:18px;">
        <li>Độ tan: BaSO4, PbSO4 kết tủa trắng; CaSO4 ít tan; còn lại phần lớn tan.</li>
        <li>Nhận biết SO4^{2-}: thêm BaCl2 trong môi trường axit loãng → BaSO4 trắng, bền với axit.</li>
        <li>Ứng dụng: thạch cao (CaSO4·2H2O), phân superphosphate Ca(H2PO4)2 + CaSO4.</li>
      </ul>
    </div>
  `,
  game: [
    {
      type: 'multiple-choice',
      question: 'H2SO4 loãng tác dụng với Zn tạo khí:',
      options: ['SO2', 'H2', 'O2', 'Cl2'],
      correctAnswer: 1,
      explanation: 'Axit mạnh nhưng không oxi hoá mạnh ở loãng → giải phóng H2.',
      points: 10
    },
    {
      type: 'multiple-choice',
      question: 'Tính háo nước thể hiện rõ nhất khi nhỏ H2SO4 đặc vào:',
      options: ['CuO', 'CS2', 'Đường mía rắn', 'NaCl'],
      correctAnswer: 2,
      explanation: 'H2SO4 đặc làm than hoá saccharose do hút nước mạnh.',
      points: 10
    },
    {
      type: 'true-false',
      question: 'H2SO4 đặc nóng có thể oxi hoá Cu tạo SO2.',
      correctAnswer: true,
      explanation: 'Cu + 2H2SO4(đ) → CuSO4 + SO2 + 2H2O.',
      points: 10
    },
    {
      type: 'multiple-choice',
      question: 'Bước xúc tác V2O5 trong quy trình tiếp xúc tạo sản phẩm:',
      options: ['SO2', 'SO3', 'H2SO4', 'Oleum'],
      correctAnswer: 1,
      explanation: 'Oxi hoá SO2 thành SO3 trên xúc tác V2O5.',
      points: 10
    },
    {
      type: 'multiple-choice',
      question: 'Thuốc thử nhận biết SO4^{2-} là:',
      options: ['AgNO3', 'BaCl2 trong HCl loãng', 'NaOH', 'KI'],
      correctAnswer: 1,
      explanation: 'Tạo kết tủa BaSO4 trắng, bền với axit loãng.',
      points: 10
    },
    {
      type: 'true-false',
      question: 'Hấp thụ trực tiếp SO3 vào nước là bước chuẩn trong sản xuất H2SO4.',
      correctAnswer: false,
      explanation: 'Tạo sương H2SO4 khó ngưng tụ; thực tế hấp thụ vào H2SO4 đặc tạo oleum.',
      points: 10
    },
    {
      type: 'multiple-choice',
      question: 'BaSO4 có tính chất:',
      options: ['Tan mạnh trong nước', 'Tan trong HCl loãng', 'Kết tủa trắng rất ít tan', 'Có màu vàng'],
      correctAnswer: 2,
      explanation: 'BaSO4 trắng, không tan trong axit loãng nên dùng nhận biết sunfat.',
      points: 10
    },
    {
      type: 'multiple-choice',
      question: 'Phản ứng nào thể hiện tính axit của H2SO4 loãng?',
      options: ['C + 2H2SO4(đ) → CO2 + 2SO2', 'Na2CO3 + H2SO4 → Na2SO4 + CO2 + H2O', 'Cu + 2H2SO4(đ) → CuSO4 + SO2', 'H2SO4 + HCl →'],
      correctAnswer: 1,
      explanation: 'Tạo muối sunfat và CO2, biểu hiện tính axit mạnh.',
      points: 10
    },
    {
      type: 'true-false',
      question: 'H2SO4 đặc có thể làm khô khí HCl.',
      correctAnswer: true,
      explanation: 'H2SO4 đặc hút ẩm; nhưng không dùng để làm khô NH3 do phản ứng axit-bazơ.',
      points: 10
    },
    {
      type: 'fill-in-blank',
      question: 'Phương trình oxi hoá Cu bởi H2SO4 đặc: Cu + 2H2SO4(đ) → CuSO4 + ______ + 2H2O',
      correctAnswer: 'SO2',
      explanation: 'Sản phẩm khí là SO2 do H2SO4 đặc đóng vai trò chất oxi hoá.',
      points: 10
    }
  ]
};
