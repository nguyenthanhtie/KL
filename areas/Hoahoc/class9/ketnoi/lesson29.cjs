module.exports = {
  classId: 9,
  curriculumType: 'ketnoi',
  chapterId: 9,
  chapterName: 'Chương 9: Lipid. Carbohydrate. Protein. Polymer',
  lessonId: 29,
  title: 'Bài 29: Carbohydrate - Glucose và saccharose',
  description: 'Đặc điểm, tính chất của đường đơn và đường đôi.',
  level: 'Beginner',
  order: 12,
  theory: `
    <h2>🍯 Glucose &amp; Saccharose</h2>
    <p style="margin:10px 0; color:#334155;">Mục tiêu: phân biệt đường đơn (glucose) và đường đôi (saccharose), tính chất nhận biết và ứng dụng.</p>

    <div style="display:grid; gap:12px; grid-template-columns:repeat(auto-fit,minmax(240px,1fr)); margin:12px 0;">
      <div style="padding:14px; border:1px solid #e2e8f0; border-radius:10px; background:#f8fafc;">
        <h4 style="margin:0 0 8px; color:#0f172a;">Glucose (C₆H₁₂O₆)</h4>
        <ul style="margin:0; padding-left:18px; color:#475569;">
          <li>Đường đơn, tan tốt, vị ngọt dịu; nguồn: quả chín, máu.</li>
          <li>Có nhóm –CHO dạng mạch hở → tính khử (Fehling/Benedict → đỏ gạch).</li>
          <li>Lên men rượu: C₆H₁₂O₆ → 2C₂H₅OH + 2CO₂.</li>
          <li>Vai trò: nhiên liệu trực tiếp của tế bào (hô hấp).</li>
        </ul>
      </div>
      <div style="padding:14px; border:1px solid #e2e8f0; border-radius:10px; background:#fff7ed;">
        <h4 style="margin:0 0 8px; color:#9a3412;">Saccharose (C₁₂H₂₂O₁₁)</h4>
        <ul style="margin:0; padding-left:18px; color:#7c2d12;">
          <li>Đường đôi = glucose + fructose; tinh thể trắng, tan tốt.</li>
          <li>Không có nhóm –CHO tự do → không khử Fehling khi chưa thuỷ phân.</li>
          <li>Thuỷ phân (H⁺/enzym) → glucose + fructose (đường nghịch chuyển).</li>
          <li>Nguồn chính: mía, củ cải đường.</li>
        </ul>
      </div>
    </div>

    <div style="display:grid; gap:12px; grid-template-columns:repeat(auto-fit,minmax(240px,1fr)); margin:12px 0;">
      <div style="padding:14px; border:1px solid #e2e8f0; border-radius:10px; background:#ecfeff;">
        <h4 style="margin:0 0 8px; color:#0e7490;">Nhận biết &amp; phản ứng</h4>
        <ul style="margin:0; padding-left:18px; color:#0f172a;">
          <li>Glucose + Cu(OH)₂/kiềm + đun → Cu₂O đỏ gạch.</li>
          <li>Saccharose không phản ứng trên; nhưng sau thuỷ phân sẽ cho kết quả như glucose.</li>
          <li>Cả hai đều lên men → etanol + CO₂ (men rượu).</li>
        </ul>
      </div>
      <div style="padding:14px; border:1px solid #e2e8f0; border-radius:10px; background:#f0f9ff;">
        <h4 style="margin:0 0 8px; color:#0f172a;">Ứng dụng &amp; sức khoẻ</h4>
        <ul style="margin:0; padding-left:18px; color:#334155;">
          <li>Thực phẩm, tạo ngọt, lên men rượu/bánh mì.</li>
          <li>Glucose truyền tĩnh mạch cung cấp năng lượng nhanh.</li>
          <li>Kiểm soát hấp thu đường để tránh tăng đường huyết.</li>
        </ul>
      </div>
    </div>

    <div style="margin:14px 0; padding:14px; border-radius:12px; border:1px solid #cbd5e1; background:linear-gradient(135deg,#eef2ff,#f8fafc);">
      <h3 style="margin:0 0 8px; color:#312e81;">Bảng tóm tắt nhanh</h3>
      <ul style="margin:0; padding-left:18px; color:#334155;">
        <li>Glucose: đường đơn, có tính khử, lên men rượu.</li>
        <li>Saccharose: đường đôi, không khử Fehling trừ khi thuỷ phân.</li>
        <li>Nhận biết: thuốc thử Benedict/Fehling cho glucose; saccharose cần thuỷ phân trước.</li>
      </ul>
    </div>

    <div style="margin:14px 0; padding:12px; border:1px dashed #cbd5e1; border-radius:10px; background:#f8fafc; color:#475569;">
      <p style="margin:0 0 6px;"><strong>Gợi ý hình</strong>:</p>
      <p style="margin:0 0 4px;">Chuỗi phản ứng Fehling với glucose: <em>/images/hoahoc9/lesson29-fehling.png</em></p>
      <p style="margin:0;">Sơ đồ thuỷ phân saccharose: <em>/images/hoahoc9/lesson29-hydrolysis.png</em></p>
    </div>

    <div style="margin:14px 0; padding:14px; border:1px solid #e2e8f0; border-radius:10px; background:#fff7ed;">
      <h3 style="margin:0 0 8px; color:#9a3412;">Mini quiz đọc nhanh</h3>
      <ul style="margin:0; padding-left:18px; color:#7c2d12;">
        <li>Vì sao saccharose không tráng gương nhưng lại tráng gương sau thuỷ phân?</li>
        <li>Viết PTHH lên men glucose thành etanol.</li>
        <li>Nguồn thực phẩm giàu saccharose nào phổ biến nhất ở Việt Nam?</li>
      </ul>
      <p style="margin:8px 0 0; font-size:13px; color:#854d0e;">Suy nghĩ nhanh rồi luyện tập bộ câu hỏi.</p>
    </div>
  `,
  game: [
    {
      type: 'multiple-choice',
      question: 'CTPT glucose là:',
      options: ['C6H12O6', 'C12H22O11', 'C6H10O5', 'CH2O'],
      correctAnswer: 0,
      explanation: 'Glucose có CTPT C6H12O6.'
    },
    {
      type: 'true-false',
      question: 'Saccharose là đường đôi của glucose và fructose.',
      correctAnswer: true,
      explanation: 'Đúng, saccharose gồm 1 gốc glucose + 1 gốc fructose.'
    },
    {
      type: 'multiple-choice',
      question: 'Thử thử Benedict/Fehling nhận biết được:',
      options: ['Saccharose', 'Glucose', 'Saccharose và NaCl', 'Tinh bột'],
      correctAnswer: 1,
      explanation: 'Glucose khử được Cu(OH)2 tạo kết tủa đỏ gạch.'
    },
    {
      type: 'fill-in-blank',
      question: 'Lên men glucose: C6H12O6 → 2C2H5OH + ___ CO2',
      correctAnswer: '2',
      explanation: 'Sinh 2 mol CO2.'
    },
    {
      type: 'multiple-choice',
      question: 'Nguồn thu saccharose chủ yếu:',
      options: ['Khoai tây', 'Mía/đường riềng', 'Ngô', 'Khoai lang'],
      correctAnswer: 1,
      explanation: 'Mía đường và đường riềng là nguồn saccharose chính.'
    },
    {
      type: 'multiple-choice',
      question: 'Saccharose có khả năng khử dung dịch Cu(OH)2 trong môi trường kiềm?',
      options: ['Có', 'Không'],
      correctAnswer: 1,
      explanation: 'Saccharose không có nhóm -CHO tự do nên không khử Fehling.'
    },
    {
      type: 'true-false',
      question: 'Glucose thuộc nhóm monosaccharide.',
      correctAnswer: true,
      explanation: 'Glucose là đường đơn (mono).' 
    },
    {
      type: 'fill-in-blank',
      question: 'Thuỷ phân saccharose thu được glucose và ___',
      correctAnswer: 'fructose',
      explanation: 'Saccharose + H2O (xt) → glucose + fructose.'
    },
    {
      type: 'multiple-choice',
      question: 'Tính chất vật lí nào đúng với saccharose?',
      options: ['Ít tan nước', 'Tan tốt trong nước, tinh thể trắng', 'Bay hơi dễ', 'Có mùi khai'],
      correctAnswer: 1,
      explanation: 'Saccharose tinh thể trắng, tan tốt trong nước, vị ngọt.'
    },
    {
      type: 'multiple-choice',
      question: 'Vai trò sinh học chính của glucose:',
      options: ['Dự trữ trong da', 'Năng lượng nhanh cho tế bào', 'Cấu trúc DNA', 'Thành phần lipid'],
      correctAnswer: 1,
      explanation: 'Glucose là nguồn năng lượng trực tiếp trong tế bào.'
    }
  ]
};
