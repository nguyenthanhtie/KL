module.exports = {
  classId: 9,
  curriculumType: 'ketnoi',
  chapterId: 10,
  chapterName: 'Chương 10: Khai thác tài nguyên từ vỏ trái đất',
  lessonId: 34,
  title: 'Bài 34: Khai thác đá vôi và công nghiệp silicat',
  description: 'Chu trình khai thác đá vôi, sản xuất vôi sống, xi măng, thuỷ tinh.',
  level: 'Intermediate',
  order: 17,
  theory: `
    <h2>🏗️ Đá vôi &amp; công nghiệp silicat</h2>
    <p style="margin:10px 0; color:#334155;">Mục tiêu: nắm quy trình nung vôi, sản xuất xi măng, thuỷ tinh và lưu ý môi trường.</p>

    <div style="display:grid; gap:12px; grid-template-columns:repeat(auto-fit,minmax(240px,1fr)); margin:12px 0;">
      <div style="padding:14px; border:1px solid #e2e8f0; border-radius:10px; background:#f8fafc;">
        <h4 style="margin:0 0 8px; color:#0f172a;">Nung vôi &amp; vôi tôi</h4>
        <ul style="margin:0; padding-left:18px; color:#475569;">
          <li>CaCO₃ (đá vôi) nung 900–1000°C → CaO + CO₂.</li>
          <li>CaO + H₂O → Ca(OH)₂ (vôi tôi), tỏa nhiệt mạnh.</li>
          <li>Ứng dụng: xây dựng, xử lí nước, điều chỉnh pH đất.</li>
        </ul>
      </div>
      <div style="padding:14px; border:1px solid #e2e8f0; border-radius:10px; background:#fff7ed;">
        <h4 style="margin:0 0 8px; color:#9a3412;">Xi măng</h4>
        <ul style="margin:0; padding-left:18px; color:#7c2d12;">
          <li>Nghiền đá vôi + đất sét, nung lò quay → clinker (C₃S, C₂S...).</li>
          <li>Nghiền clinker + chút thạch cao → xi măng Portland.</li>
          <li>Thạch cao điều chỉnh thời gian đông kết; cần bảo quản khô.</li>
        </ul>
      </div>
    </div>

    <div style="display:grid; gap:12px; grid-template-columns:repeat(auto-fit,minmax(240px,1fr)); margin:12px 0;">
      <div style="padding:14px; border:1px solid #e2e8f0; border-radius:10px; background:#ecfeff;">
        <h4 style="margin:0 0 8px; color:#0e7490;">Thuỷ tinh</h4>
        <ul style="margin:0; padding-left:18px; color:#0f172a;">
          <li>Phối liệu: SiO₂ (cát) + Na₂CO₃ (soda) + CaCO₃ (đá vôi) + phụ gia.</li>
          <li>Nung chảy → khối thuỷ tinh, tạo hình rồi làm nguội.</li>
          <li>Điều chỉnh phụ gia để có thuỷ tinh màu, chịu nhiệt, an toàn.</li>
        </ul>
      </div>
      <div style="padding:14px; border:1px solid #e2e8f0; border-radius:10px; background:#f0f9ff;">
        <h4 style="margin:0 0 8px; color:#0f172a;">Môi trường &amp; an toàn</h4>
        <ul style="margin:0; padding-left:18px; color:#334155;">
          <li>Phát thải CO₂, bụi; cần lọc bụi tay áo/cyclon, thu hồi nhiệt.</li>
          <li>Tái dùng phế liệu xây dựng, mảnh thuỷ tinh để giảm nguyên liệu.</li>
          <li>An toàn: tránh hít bụi vôi/xi măng, cẩn thận khi tôi vôi vì toả nhiệt.</li>
        </ul>
      </div>
    </div>

    <div style="margin:14px 0; padding:14px; border-radius:12px; border:1px solid #cbd5e1; background:linear-gradient(135deg,#eef2ff,#f8fafc);">
      <h3 style="margin:0 0 8px; color:#312e81;">Bảng tóm tắt nhanh</h3>
      <ul style="margin:0; padding-left:18px; color:#334155;">
        <li>Nung vôi: CaCO₃ → CaO + CO₂; tôi vôi: CaO + H₂O → Ca(OH)₂.</li>
        <li>Xi măng: clinker + thạch cao nghiền mịn.</li>
        <li>Thuỷ tinh soda-lime: SiO₂ + Na₂CO₃ + CaCO₃ + phụ gia.</li>
      </ul>
    </div>

    <div style="margin:14px 0; padding:12px; border:1px dashed #cbd5e1; border-radius:10px; background:#f8fafc; color:#475569;">
      <p style="margin:0 0 6px;"><strong>Gợi ý hình</strong>:</p>
      <p style="margin:0 0 4px;">Sơ đồ lò quay xi măng và dòng nguyên liệu: <em>/images/hoahoc9/lesson34-cement.png</em></p>
      <p style="margin:0 0 4px;">Quy trình nấu thuỷ tinh soda-lime: <em>/images/hoahoc9/lesson34-glass.png</em></p>
      <p style="margin:0;">Chu trình vôi sống → vôi tôi → vôi chết: <em>/images/hoahoc9/lesson34-limecycle.png</em></p>
    </div>

    <div style="margin:14px 0; padding:14px; border:1px solid #e2e8f0; border-radius:10px; background:#fff7ed;">
      <h3 style="margin:0 0 8px; color:#9a3412;">Mini quiz đọc nhanh</h3>
      <ul style="margin:0; padding-left:18px; color:#7c2d12;">
        <li>Viết PTHH nung vôi và tôi vôi.</li>
        <li>Thạch cao có vai trò gì trong xi măng?</li>
        <li>Biện pháp giảm bụi trong nhà máy xi măng?</li>
      </ul>
      <p style="margin:8px 0 0; font-size:13px; color:#854d0e;">Trả lời nhanh trước khi làm trắc nghiệm.</p>
    </div>
  `,
  game: [
    {
      type: 'multiple-choice',
      question: 'Phản ứng nung vôi tạo ra khí nào?',
      options: ['SO2', 'CO2', 'N2', 'O2'],
      correctAnswer: 1,
      explanation: 'CaCO3 → CaO + CO2.'
    },
    {
      type: 'true-false',
      question: 'Clinker là sản phẩm trung gian trong sản xuất xi măng.',
      correctAnswer: true,
      explanation: 'Clinker nghiền với thạch cao tạo xi măng.'
    },
    {
      type: 'multiple-choice',
      question: 'Thành phần chính của thuỷ tinh soda-lime là:',
      options: ['SiO2, Na2CO3, CaCO3', 'SiO2, NaCl', 'Al2O3, Fe2O3', 'C và H'],
      correctAnswer: 0,
      explanation: 'Thuỷ tinh thường dùng SiO2 + soda + đá vôi.'
    },
    {
      type: 'fill-in-blank',
      question: 'Sản xuất xi măng: nghiền clinker + ___ thạch cao',
      correctAnswer: 'một chút',
      explanation: 'Thêm lượng nhỏ thạch cao điều chỉnh đông kết.'
    },
    {
      type: 'multiple-choice',
      question: 'Biện pháp giảm bụi nhà máy xi măng:',
      options: ['Lọc bụi tay áo', 'Không cần', 'Chỉ phun nước', 'Tăng nhiệt'],
      correctAnswer: 0,
      explanation: 'Sử dụng hệ thống lọc bụi, lọc tay áo, cyclone.'
    },
    {
      type: 'multiple-choice',
      question: 'Sản phẩm nào thu được khi vôi sống tác dụng với nước?',
      options: ['Ca(OH)2', 'CaCO3', 'CaSO4', 'NaOH'],
      correctAnswer: 0,
      explanation: 'CaO + H2O → Ca(OH)2 (vôi tôi).' 
    },
    {
      type: 'true-false',
      question: 'Thuỷ tinh có thể tái chế nhiều lần.',
      correctAnswer: true,
      explanation: 'Thuỷ tinh tái chế giảm năng lượng và chất thải.'
    },
    {
      type: 'fill-in-blank',
      question: 'Trong lò cao xi măng, CaCO3 bị ___ sinh CaO.',
      correctAnswer: 'phân huỷ',
      explanation: 'CaCO3 bị nhiệt phân sinh CaO và CO2.'
    },
    {
      type: 'multiple-choice',
      question: 'Thành phần nào điều chỉnh thời gian đông kết của xi măng?',
      options: ['Thạch cao', 'NaCl', 'Cát', 'Than đá'],
      correctAnswer: 0,
      explanation: 'Thêm lượng nhỏ thạch cao để điều chỉnh đông kết.'
    },
    {
      type: 'multiple-choice',
      question: 'Tác động môi trường chính khi nung vôi là:',
      options: ['CO2 và bụi', 'SO3', 'O3', 'N2'],
      correctAnswer: 0,
      explanation: 'Phát thải CO2 và bụi cần được xử lí.'
    }
  ]
};
