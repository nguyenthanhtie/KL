module.exports = {
  classId: 9,
  curriculumType: 'ketnoi',
  chapterId: 9,
  chapterName: 'Chương 9: Lipid. Carbohydrate. Protein. Polymer',
  lessonId: 31,
  title: 'Bài 31: Prôtêin',
  description: 'Cấu trúc amino acid, liên kết peptit và vai trò protein.',
  level: 'Intermediate',
  order: 14,
  theory: `
    <h2>🍗 Protein</h2>
    <p style="margin:10px 0; color:#334155;">Mục tiêu: hiểu cấu trúc amino acid, các bậc cấu trúc protein, tính chất hoá học và vai trò sinh học.</p>

    <div style="display:grid; gap:12px; grid-template-columns:repeat(auto-fit,minmax(240px,1fr)); margin:12px 0;">
      <div style="padding:14px; border:1px solid #e2e8f0; border-radius:10px; background:#f8fafc;">
        <h4 style="margin:0 0 8px; color:#0f172a;">Thành phần &amp; liên kết</h4>
        <ul style="margin:0; padding-left:18px; color:#475569;">
          <li>Đơn vị cấu tạo: amino acid (có –NH₂ và –COOH) nối bằng liên kết peptit –CO–NH–.</li>
          <li>Chuỗi polypeptit có chiều dài từ vài chục đến hàng nghìn gốc amino acid.</li>
          <li>Liên kết hydro, ion, kỵ nước giữ ổn định cấu trúc bậc cao.</li>
        </ul>
      </div>
      <div style="padding:14px; border:1px solid #e2e8f0; border-radius:10px; background:#fff7ed;">
        <h4 style="margin:0 0 8px; color:#9a3412;">Bậc cấu trúc</h4>
        <ul style="margin:0; padding-left:18px; color:#7c2d12;">
          <li>Sơ cấp: trình tự amino acid.</li>
          <li>Thứ cấp: xoắn α, tấm β nhờ liên kết H.</li>
          <li>Tam cấp: gấp cuộn 3D của một chuỗi.</li>
          <li>Tứ cấp: nhiều tiểu đơn vị (ví dụ hemoglobin 4 chuỗi).</li>
        </ul>
      </div>
    </div>

    <div style="display:grid; gap:12px; grid-template-columns:repeat(auto-fit,minmax(240px,1fr)); margin:12px 0;">
      <div style="padding:14px; border:1px solid #e2e8f0; border-radius:10px; background:#ecfeff;">
        <h4 style="margin:0 0 8px; color:#0e7490;">Tính chất &amp; nhận biết</h4>
        <ul style="margin:0; padding-left:18px; color:#0f172a;">
          <li>Thuỷ phân → amino acid (axit/bazơ/enzym).</li>
          <li>Biến tính bởi nhiệt, pH mạnh, muối kim loại nặng.</li>
          <li>Phản ứng Biuret: Cu(OH)₂ kiềm → màu tím (nhận biết liên kết peptit).</li>
        </ul>
      </div>
      <div style="padding:14px; border:1px solid #e2e8f0; border-radius:10px; background:#f0f9ff;">
        <h4 style="margin:0 0 8px; color:#0f172a;">Vai trò &amp; dinh dưỡng</h4>
        <ul style="margin:0; padding-left:18px; color:#334155;">
          <li>Cấu trúc (cơ, da), enzyme, hormone, vận chuyển (hemoglobin), miễn dịch (kháng thể).</li>
          <li>Protein hoàn chỉnh chứa đủ acid amin thiết yếu.</li>
          <li>Cần cân bằng hấp thu; thiếu → suy dinh dưỡng, thừa → gánh nặng chuyển hoá.</li>
        </ul>
      </div>
    </div>

    <div style="margin:14px 0; padding:14px; border-radius:12px; border:1px solid #cbd5e1; background:linear-gradient(135deg,#eef2ff,#f8fafc);">
      <h3 style="margin:0 0 8px; color:#312e81;">Bảng tóm tắt nhanh</h3>
      <ul style="margin:0; padding-left:18px; color:#334155;">
        <li>Đơn vị: amino acid; liên kết peptit –CO–NH– tạo polypeptit.</li>
        <li>4 bậc cấu trúc quyết định hình dạng và chức năng.</li>
        <li>Nhận biết: phản ứng Biuret; tính chất: thuỷ phân, biến tính.</li>
      </ul>
    </div>

    <div style="margin:14px 0; padding:12px; border:1px dashed #cbd5e1; border-radius:10px; background:#f8fafc; color:#475569;">
      <p style="margin:0 0 6px;"><strong>Gợi ý hình</strong>:</p>
      <p style="margin:0 0 4px;">Mô hình xoắn α và tấm β: <em>/images/hoahoc9/lesson31-secondary.png</em></p>
      <p style="margin:0;">Phản ứng Biuret đổi màu tím: <em>/images/hoahoc9/lesson31-biuret.png</em></p>
    </div>

    <div style="margin:14px 0; padding:14px; border:1px solid #e2e8f0; border-radius:10px; background:#fff7ed;">
      <h3 style="margin:0 0 8px; color:#9a3412;">Mini quiz đọc nhanh</h3>
      <ul style="margin:0; padding-left:18px; color:#7c2d12;">
        <li>Liên kết nào tạo khung polypeptit?</li>
        <li>Vì sao đun sôi làm trứng chín (liên quan biến tính)?</li>
        <li>Thử Biuret cho hiện tượng gì với dung dịch protein?</li>
      </ul>
      <p style="margin:8px 0 0; font-size:13px; color:#854d0e;">Tự trả lời trước khi làm bộ câu hỏi.</p>
    </div>
  `,
  game: [
    {
      type: 'multiple-choice',
      question: 'Liên kết peptit có dạng:',
      options: ['C-O-C', 'C-N', 'CO-NH', 'C=C'],
      correctAnswer: 2,
      explanation: 'Liên kết peptit là -CO-NH-.'
    },
    {
      type: 'true-false',
      question: 'Thử Biuret tạo màu tím khi có protein.',
      correctAnswer: true,
      explanation: 'Cu(OH)2 trong môi kiềm tác dụng với liên kết peptit tạo màu tím.'
    },
    {
      type: 'multiple-choice',
      question: 'Protein bị thuỷ phân cuối cùng thành:',
      options: ['Đường', 'Amino acid', 'Axit béo', 'Tinh bột'],
      correctAnswer: 1,
      explanation: 'Thuỷ phân hoàn toàn protein → amino acid.'
    },
    {
      type: 'fill-in-blank',
      question: 'Vai trò protein: enzyme, vận chuyển, cơ bắp, ___',
      correctAnswer: 'miễn dịch',
      explanation: 'Protein làm kháng thể trong hệ miễn dịch.'
    },
    {
      type: 'multiple-choice',
      question: 'Yếu tố nào không gây biến tính (denaturation) protein?',
      options: ['Nhiệt cao', 'pH quá thấp/cao', 'Muối kim loại nặng', 'Nước ngâm'],
      correctAnswer: 3,
      explanation: 'Nước ngâm không gây biến tính; nhiệt/pH/muối có thể gây biến tính.'
    },
    {
      type: 'multiple-choice',
      question: 'Bậc cấu trúc nào mô tả sự sắp xếp 3D của một chuỗi polypeptit?',
      options: ['Sơ cấp', 'Thứ cấp', 'Tam cấp', 'Tứ cấp'],
      correctAnswer: 2,
      explanation: 'Tam cấp là sự gấp cuộn 3D của một chuỗi polypeptit.'
    },
    {
      type: 'true-false',
      question: 'Amino acid liên kết với nhau thông qua nhóm -COOH và -NH2 tạo liên kết peptit.',
      correctAnswer: true,
      explanation: 'Phản ứng tạo -CO-NH- giải phóng H2O.'
    },
    {
      type: 'fill-in-blank',
      question: 'Protein có thể bị thuỷ phân khi gặp ___ (nhiệt, axit, bazơ mạnh).',
      correctAnswer: 'nhiệt cao',
      explanation: 'Nhiệt cao/axit/bazơ làm mất cấu trúc bậc cao của protein.'
    },
    {
      type: 'multiple-choice',
      question: 'Xét nghiệm nào nhận biết liên kết peptit?',
      options: ['Thử iod', 'Thử Benedict', 'Thử Biuret', 'Thử AgNO3'],
      correctAnswer: 2,
      explanation: 'Thử Biuret tạo màu tím với liên kết peptit trong môi kiềm.'
    },
    {
      type: 'multiple-choice',
      question: 'Vai trò nào không thuộc protein?',
      options: ['Enzyme', 'Hormone/vận chuyển', 'Cấu trúc tế bào', 'Nguồn cung cấp DNA'],
      correctAnswer: 3,
      explanation: 'DNA là axit nucleic, không phải protein.'
    }
  ]
};
