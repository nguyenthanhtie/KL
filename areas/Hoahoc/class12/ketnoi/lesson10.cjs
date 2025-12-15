module.exports = {
  classId: 12,
  curriculumType: 'ketnoi',
  chapterId: 3,
  chapterName: 'Chương 3: Hợp chất chứa nitrogen',
  lessonId: 10,
  title: 'Bài 10: Protein và enzyme',
  description: 'Cấp bậc cấu trúc protein, tính chất vật lí/hoá học, vai trò enzyme.',
  level: 'Intermediate',
  order: 10,
  theory: `
    <h2>Protein và enzyme</h2>
    <p style="margin:8px 0; color:#334155;">Từ cấu trúc bậc 1 đến bậc 4 và cơ chế xúc tác sinh học đặc hiệu của enzyme.</p>

    <div style="display:grid; gap:12px; grid-template-columns:repeat(auto-fit,minmax(260px,1fr)); margin:12px 0;">
      <div style="padding:12px; border:1px solid #e2e8f0; border-radius:10px; background:#f8fafc;">
        <h4 style="margin:0 0 6px; color:#0f172a;">Cấu trúc protein</h4>
        <ul style="margin:0; padding-left:18px; color:#475569;">
          <li>Bậc 1: trình tự amino acid; bậc 2: xoắn α, gấp β (liên kết H).</li>
          <li>Bậc 3: cuộn gấp không gian, ổn định bởi cầu disulfide, liên kết H, kỵ nước, ion.</li>
          <li>Bậc 4: nhiều tiểu đơn vị kết hợp (hemoglobin, insulin).</li>
        </ul>
      </div>
      <div style="padding:12px; border:1px solid #fde68a; border-radius:10px; background:#fffbeb; color:#92400e;">
        <h4 style="margin:0 0 6px;">Tính chất & phản ứng</h4>
        <ul style="margin:0; padding-left:18px;">
          <li>Đông tụ/biến tính khi nhiệt, pH, dung môi hữu cơ; mất cấu trúc bậc cao.</li>
          <li>Thử biuret (≥2 liên kết peptide) màu tím; xantoproteic (vòng thơm) màu vàng cam.</li>
          <li>Thuỷ phân: axit/bazơ/enzyme → peptide nhỏ/acid amin.</li>
        </ul>
      </div>
      <div style="padding:12px; border:1px dashed #cbd5e1; border-radius:10px; background:#f8fafc; color:#475569;">
        <h4 style="margin:0 0 6px;">Enzyme</h4>
        <ul style="margin:0; padding-left:18px;">
          <li>Xúc tác sinh học, giảm năng lượng hoạt hoá; đặc hiệu cơ chất.</li>
          <li>Hoạt tính phụ thuộc pH, nhiệt độ, nồng độ cơ chất; có vùng tối ưu.</li>
          <li>Ứng dụng: lên men, công nghiệp thực phẩm, y học (chẩn đoán, điều trị).</li>
        </ul>
      </div>
    </div>

    <div style="display:grid; gap:12px; grid-template-columns:repeat(auto-fit,minmax(260px,1fr)); margin:12px 0;">
      <div style="padding:12px; border-radius:12px; border:1px solid #cbd5e1; background:linear-gradient(135deg,#eef2ff,#f8fafc); color:#0f172a;">
        <h4 style="margin:0 0 6px;">So sánh & ghi nhớ</h4>
        <ul style="margin:0; padding-left:18px; color:#334155;">
          <li>Protein đơn giản vs tạp (có nhóm ngoại): hemoglobin (heme), glycoprotein (đường), metalloprotein (ion kim loại).</li>
          <li>Biến tính: nhiệt, pH cực trị, dung môi hữu cơ, muối kim loại nặng; thường không hồi phục.</li>
          <li>Biuret (+) kiểm tra chuỗi peptide; xantoproteic kiểm tra vòng thơm.</li>
        </ul>
      </div>
      <div style="padding:12px; border:1px dashed #cbd5e1; border-radius:10px; background:#fffaf0; color:#92400e;">
        <h4 style="margin:0 0 6px;">Case & ứng dụng</h4>
        <ul style="margin:0; padding-left:18px;">
          <li>Ứng dụng enzyme: amylase (đường hoá), protease (tẩy rửa enzyme, tender thịt), lactase (sữa không lactose).</li>
          <li>Kim loại nặng (Hg2+, Pb2+) gây ngộ độc do gắn –SH enzyme → mất hoạt tính; giải độc bằng tạo phức (EDTA, BAL).</li>
          <li>Bảo quản vaccine/men: đông khô, nhiệt độ thấp để giữ cấu trúc bậc 3/4.</li>
        </ul>
      </div>
      <div style="padding:12px; border:1px solid #e2e8f0; border-radius:10px; background:#f8fafc; color:#475569;">
        <h4 style="margin:0 0 6px;">Ôn bài tập</h4>
        <ul style="margin:0; padding-left:18px;">
          <li>Nhận dạng bậc cấu trúc: bậc 2 (xoắn/gấp), bậc 3 (cuộn gấp), bậc 4 (nhiều tiểu đơn vị).</li>
          <li>Đề trắc nghiệm hiệu ứng nhiệt/pH: nhớ đường cong hoạt tính có đỉnh (tối ưu), hai bên giảm.</li>
          <li>Tính hiệu suất thủy phân protein: số liên kết peptide = số acid amin – 1; mỗi liên kết cần 1 H2O.</li>
        </ul>
      </div>
    </div>
  `,
  game: [
    {
      type: 'multiple-choice',
      question: 'Cấu trúc bậc 2 của protein được ổn định bởi:',
      options: ['Liên kết ion', 'Liên kết H giữa các liên kết peptide', 'Cầu disulfide', 'Liên kết kim loại'],
      correctAnswer: 1,
      explanation: 'Xoắn α và gấp nếp β giữ bởi H giữa C=O và N–H.',
      points: 10
    },
    {
      type: 'multiple-choice',
      question: 'Phản ứng biuret dương tính yêu cầu:',
      options: ['Có vòng thơm', 'Có ít nhất 2 liên kết peptide', 'Có nhóm –SH', 'Có ion kim loại'],
      correctAnswer: 1,
      explanation: 'Tạo phức Cu2+ màu tím với –CO–NH– lặp lại.',
      points: 10
    },
    {
      type: 'true-false',
      question: 'Đun sôi lòng trắng trứng gây biến tính protein.',
      correctAnswer: true,
      explanation: 'Nhiệt phá vỡ cấu trúc bậc cao, protein đông tụ.',
      points: 10
    },
    {
      type: 'multiple-choice',
      question: 'Xantoproteic cho màu vàng với protein chứa:',
      options: ['Amino acid mạch thẳng', 'Vòng thơm (Tyr, Trp)', 'Nhiều lysine', 'Nhiều methionine'],
      correctAnswer: 1,
      explanation: 'Nitro hoá nhân thơm tạo hợp chất màu vàng.',
      points: 10
    },
    {
      type: 'multiple-choice',
      question: 'Enzyme bị ức chế mạnh khi:',
      options: ['Ở pH tối ưu', 'Ở nhiệt độ tối ưu', 'Bị kim loại nặng gắn với –SH', 'Cơ chất tăng nhẹ'],
      correctAnswer: 2,
      explanation: 'Ion Hg2+, Pb2+ gắn –SH làm mất hoạt tính.',
      points: 10
    },
    {
      type: 'true-false',
      question: 'Hemoglobin là protein bậc 4.',
      correctAnswer: true,
      explanation: 'Gồm 4 tiểu đơn vị (2α, 2β) và nhóm heme.',
      points: 10
    },
    {
      type: 'multiple-choice',
      question: 'Tác nhân nào dưới đây thường không gây biến tính protein?',
      options: ['Nhiệt độ cao', 'Ethanol', 'pH cực trị', 'Dung dịch NaCl loãng'],
      correctAnswer: 3,
      explanation: 'NaCl loãng ít ảnh hưởng, nhưng muối bão hòa có thể làm kết tủa salting-out.',
      points: 10
    },
    {
      type: 'fill-in-blank',
      question: 'Liên kết –S–S– trong protein gọi là cầu ______.',
      correctAnswer: 'disulfide',
      explanation: 'Liên kết giữa hai cysteine.',
      points: 10
    },
    {
      type: 'multiple-choice',
      question: 'Yếu tố ảnh hưởng mạnh đến tốc độ phản ứng enzyme:',
      options: ['Màu dung dịch', 'pH, nhiệt độ, nồng độ cơ chất', 'Khối lượng phân tử enzyme', 'Áp suất khí quyển'],
      correctAnswer: 1,
      explanation: 'Enzyme có pH/nhiệt độ tối ưu; tốc độ phụ thuộc cơ chất (động học Michaelis-Menten).',
      points: 10
    },
    {
      type: 'true-false',
      question: 'Protein bị thuỷ phân hoàn toàn cho hỗn hợp amino acid.',
      correctAnswer: true,
      explanation: 'Liên kết peptide bị cắt trả về acid amin đơn lẻ.',
      points: 10
    }
  ]
};
