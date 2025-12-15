module.exports = {
  classId: 12,
  curriculumType: 'ketnoi',
  chapterId: 2,
  chapterName: 'Chương 2: Carbohydrate',
  lessonId: 5,
  title: 'Bài 5: Saccharose và maltose',
  description: 'Liên kết glycosid, tính khử/không khử, phản ứng thuỷ phân saccharose và maltose.',
  level: 'Intermediate',
  order: 5,
  theory: `
    <h2>Saccharose và maltose</h2>
    <p style="margin:8px 0; color:#334155;">Hai disaccharide quen thuộc: một không khử (saccharose), một khử (maltose); hiểu cấu trúc glycosid và phản ứng thuỷ phân.</p>

    <div style="display:grid; gap:12px; grid-template-columns:repeat(auto-fit,minmax(260px,1fr)); margin:12px 0;">
      <div style="padding:12px; border:1px solid #e2e8f0; border-radius:10px; background:#f8fafc;">
        <h4 style="margin:0 0 6px; color:#0f172a;">Cấu trúc & tính khử</h4>
        <ul style="margin:0; padding-left:18px; color:#475569;">
          <li>Saccharose: α-Glucose (C1) liên kết β-Fructose (C2) → không còn nhóm hemiacetal → không khử.</li>
          <li>Maltose: α-1,4-glucose dimer; đầu khử còn hemiacetal → tráng bạc/Fehling dương tính.</li>
          <li>Tính tan cao, vị ngọt; saccharose ngọt hơn maltose.</li>
        </ul>
      </div>
      <div style="padding:12px; border:1px solid #fde68a; border-radius:10px; background:#fffbeb; color:#92400e;">
        <h4 style="margin:0 0 6px;">Phản ứng & thuỷ phân</h4>
        <ul style="margin:0; padding-left:18px;">
          <li>Thuỷ phân saccharose (axit/enzym invertase) → glucose + fructose (đường nghịch đảo).</li>
          <li>Thuỷ phân maltose (men maltase) → 2 glucose.</li>
          <li>Không tham gia phản ứng tráng bạc: saccharose; tham gia: maltose.</li>
        </ul>
      </div>
      <div style="padding:12px; border:1px dashed #cbd5e1; border-radius:10px; background:#f8fafc; color:#475569;">
        <h4 style="margin:0 0 6px;">Ứng dụng & công nghệ</h4>
        <ul style="margin:0; padding-left:18px;">
          <li>Sản xuất đường trắng từ mía/ củ cải: làm sạch, kết tinh saccharose.</li>
          <li>Đường nghịch đảo dùng trong bánh kẹo vì giữ ẩm, hạn chế kết tinh.</li>
          <li>Maltose hình thành trong ươm mạch nha, cung cấp đường lên men bia.</li>
        </ul>
      </div>
    </div>

    <div style="display:grid; gap:12px; grid-template-columns:repeat(auto-fit,minmax(260px,1fr)); margin:12px 0;">
      <div style="padding:12px; border-radius:12px; border:1px solid #cbd5e1; background:linear-gradient(135deg,#eef2ff,#f8fafc); color:#0f172a;">
        <h4 style="margin:0 0 6px;">Phân biệt nhanh</h4>
        <ul style="margin:0; padding-left:18px; color:#334155;">
          <li>Saccharose: không khử, không tráng bạc; maltose: khử → tráng bạc/Fehling dương.</li>
          <li>Thuỷ phân saccharose → góc quay quang học đổi từ dương sang âm (đường nghịch đảo).</li>
          <li>Maltose phản ứng Cu(OH)2 ở nhiệt độ thường cho dung dịch xanh lam như glucose (đa –OH liền kề).</li>
        </ul>
      </div>
      <div style="padding:12px; border:1px dashed #cbd5e1; border-radius:10px; background:#fffaf0; color:#92400e;">
        <h4 style="margin:0 0 6px;">Ứng dụng thực tế</h4>
        <ul style="margin:0; padding-left:18px;">
          <li>Đường nghịch đảo hạn chế kết tinh → kẹo mềm, siro; tăng độ ngọt nhờ fructose.</li>
          <li>Maltose từ mạch nha cung cấp đường dễ lên men cho bia, bánh mì (men nở nhanh).</li>
          <li>Kiểm soát độ ngọt: saccharose ~1, maltose ~0.5, glucose ~0.74, fructose ~1.7.</li>
        </ul>
      </div>
      <div style="padding:12px; border:1px solid #e2e8f0; border-radius:10px; background:#f8fafc; color:#475569;">
        <h4 style="margin:0 0 6px;">Ôn tập bài tập</h4>
        <ul style="margin:0; padding-left:18px;">
          <li>Bảo toàn khối lượng khi thuỷ phân saccharose: m(H2O) thêm vào = m(glucose+fructose) - m(saccharose).</li>
          <li>Tính góc quay hỗn hợp sau thuỷ phân dựa trên tỉ lệ glucose/fructose và [α] riêng.</li>
          <li>Trắc nghiệm nhận biết: thuỷ phân + Tollens/Fehling; hoặc đo góc quay quang học.</li>
        </ul>
      </div>
    </div>
  `,
  game: [
    {
      type: 'multiple-choice',
      question: 'Saccharose không tham gia phản ứng tráng bạc vì:',
      options: ['Không tan trong nước', 'Không có nhóm hemiacetal tự do', 'Quá bền với kiềm', 'Không có nhóm –OH'],
      correctAnswer: 1,
      explanation: 'Liên kết glycosid khoá cả C1 glucose và C2 fructose.',
      points: 10
    },
    {
      type: 'multiple-choice',
      question: 'Sản phẩm thuỷ phân hoàn toàn maltose là:',
      options: ['Glucose + fructose', '2 phân tử glucose', 'Glucose + galactose', '2 fructose'],
      correctAnswer: 1,
      explanation: 'Maltose gồm hai đơn vị glucose liên kết α-1,4.',
      points: 10
    },
    {
      type: 'true-false',
      question: 'Saccharose là disaccharide khử.',
      correctAnswer: false,
      explanation: 'Saccharose không khử do không còn nhóm hemiacetal tự do.',
      points: 10
    },
    {
      type: 'multiple-choice',
      question: 'Enzym chuyển saccharose thành đường nghịch đảo là:',
      options: ['Amylase', 'Invertase (sucrase)', 'Maltase', 'Lactase'],
      correctAnswer: 1,
      explanation: 'Invertase cắt liên kết glycosid saccharose.',
      points: 10
    },
    {
      type: 'multiple-choice',
      question: 'Lý do đường nghịch đảo dùng nhiều trong kẹo mềm:',
      options: ['Vì rẻ hơn', 'Vì giữ ẩm, ít kết tinh', 'Vì không ngọt', 'Vì màu đẹp'],
      correctAnswer: 1,
      explanation: 'Glucose + fructose hút ẩm, hạn chế kết tinh lại của saccharose.',
      points: 10
    },
    {
      type: 'true-false',
      question: 'Maltose cho kết tủa Cu2O đỏ gạch với dung dịch Fehling.',
      correctAnswer: true,
      explanation: 'Maltose là đường khử.',
      points: 10
    },
    {
      type: 'multiple-choice',
      question: 'Saccharose khi thuỷ phân trong môi trường axit tạo hỗn hợp có góc quay quang học:',
      options: ['Vẫn dương', 'Chuyển từ dương sang âm (inversion)', 'Vẫn âm', 'Bằng 0'],
      correctAnswer: 1,
      explanation: 'Fructose quay trái mạnh hơn glucose quay phải → tổng âm.',
      points: 10
    },
    {
      type: 'fill-in-blank',
      question: 'Liên kết glycosid trong maltose nối C1 của glucose thứ nhất với C__ của glucose thứ hai.',
      correctAnswer: '4',
      explanation: 'Maltose có liên kết α-1,4-glucosid.',
      points: 10
    },
    {
      type: 'multiple-choice',
      question: 'Thử nghiệm nhận biết saccharose nhanh nhất trong phòng học:',
      options: ['Tráng bạc', 'Thuỷ phân rồi tráng bạc', 'Thử iot', 'Tạo phức với Cu(OH)2 ở nhiệt độ thường'],
      correctAnswer: 1,
      explanation: 'Saccharose không khử, cần thuỷ phân thành glucose + fructose rồi thử Tollens/Fehling.',
      points: 10
    },
    {
      type: 'true-false',
      question: 'Maltose có vị ngọt kém saccharose.',
      correctAnswer: true,
      explanation: 'Độ ngọt: fructose > saccharose > glucose > maltose.',
      points: 10
    }
  ]
};
