module.exports = {
  classId: 12,
  curriculumType: 'ketnoi',
  chapterId: 1,
  chapterName: 'Chương 1: Ester - lipid',
  lessonId: 3,
  title: 'Bài 3: Ôn tập chương 1',
  description: 'Tóm tắt ester, lipid, xà phòng và chất giặt rửa; bài tập áp dụng.',
  level: 'Intermediate',
  order: 3,
  theory: `
    <h2>Ôn tập chương 1: Ester - lipid</h2>
    <p style="margin:8px 0; color:#334155;">Hệ thống hoá công thức, phản ứng đặc trưng, chỉ số đánh giá chất béo và kỹ năng nhận biết/giải bài tập.</p>

    <div style="display:grid; gap:12px; grid-template-columns:repeat(auto-fit,minmax(260px,1fr)); margin:12px 0;">
      <div style="padding:12px; border:1px solid #e2e8f0; border-radius:10px; background:#f8fafc;">
        <h4 style="margin:0 0 6px; color:#0f172a;">Nhận diện & danh pháp</h4>
        <ul style="margin:0; padding-left:18px; color:#475569;">
          <li>Este đơn chức: RCOOR'; vòng lacton: nội este; trieste (lipid) từ glixerol.</li>
          <li>Danh pháp: alkyl + anion axit (-ate), ưu tiên đánh số mạch dài trong axit béo.</li>
          <li>Phân biệt mùi ester nhỏ (hương liệu) vs lipid (không bay hơi, không mùi mạnh).</li>
        </ul>
      </div>
      <div style="padding:12px; border:1px solid #fde68a; border-radius:10px; background:#fffbeb; color:#92400e;">
        <h4 style="margin:0 0 6px;">Phản ứng trọng tâm</h4>
        <ul style="margin:0; padding-left:18px;">
          <li>Thuỷ phân axit (thuận nghịch) vs kiềm (một chiều); xà phòng hoá lipid → muối + glixerol.</li>
          <li>Hydro hoá liên kết đôi axit béo; cháy; khử ester mạnh bằng LiAlH4 → ancol.</li>
          <li>Chỉ số: xà phòng hoá (KOH/g), axit (KOH trung hoà axit tự do), iot (mức độ không no).</li>
        </ul>
      </div>
      <div style="padding:12px; border:1px dashed #cbd5e1; border-radius:10px; background:#f8fafc; color:#475569;">
        <h4 style="margin:0 0 6px;">Kỹ năng bài tập</h4>
        <ul style="margin:0; padding-left:18px;">
          <li>Lập PT xà phòng hoá triglycerid; bảo toàn khối lượng/ion Na<sup>+</sup> để tính hiệu suất.</li>
          <li>Nhận biết: mùi ester, tạo xà phòng, phản ứng với nước brom (đánh giá không no).</li>
          <li>So sánh tác dụng tẩy: xà phòng vs chất giặt tổng hợp trong nước cứng.</li>
        </ul>
      </div>
    </div>

    <div style="display:grid; gap:12px; grid-template-columns:repeat(auto-fit,minmax(260px,1fr)); margin:12px 0;">
      <div style="padding:12px; border-radius:12px; border:1px solid #cbd5e1; background:linear-gradient(135deg,#eef2ff,#f8fafc); color:#0f172a;">
        <h4 style="margin:0 0 6px;">Checklist ôn tập nhanh</h4>
        <ul style="margin:0; padding-left:18px; color:#334155;">
          <li>Nhớ 3 chỉ số: xà phòng hoá, axit, iot; biết ý nghĩa và cách suy mạch dài/ngắn, mức không no.</li>
          <li>Phân biệt: thuỷ phân axit (thuận nghịch) vs kiềm (một chiều); hydro hoá nối đôi; phản ứng cháy.</li>
          <li>Nhận dạng mùi: este nhỏ; tính tẩy: muối axit béo; nhũ hoá: chất hoạt động bề mặt.</li>
        </ul>
      </div>
      <div style="padding:12px; border:1px dashed #cbd5e1; border-radius:10px; background:#fffaf0; color:#92400e;">
        <h4 style="margin:0 0 6px;">Case áp dụng</h4>
        <ul style="margin:0; padding-left:18px;">
          <li>Tính khối lượng xà phòng: bảo toàn mol Na<sup>+</sup>; khối lượng glixerol = 92 g/mol × số mol triglycerid.</li>
          <li>Xác định chỉ số iot từ lượng Br2 phản ứng; suy số liên kết đôi → đánh giá độ bền khi chiên rán.</li>
          <li>So sánh hiệu quả tẩy rửa trong nước cứng: giải thích bằng kết tủa Ca/ Mg của xà phòng.</li>
        </ul>
      </div>
      <div style="padding:12px; border:1px solid #e2e8f0; border-radius:10px; background:#f8fafc; color:#475569;">
        <h4 style="margin:0 0 6px;">Mẹo trình bày bài thi</h4>
        <ul style="margin:0; padding-left:18px;">
          <li>Luôn vẽ mũi tên cân bằng cho este hoá/thuỷ phân axit, ghi rõ xúc tác H<sub>2</sub>SO<sub>4</sub> đặc, đun nóng.</li>
          <li>Liệt kê số carbon của axit béo khi đặt ẩn, tránh sai tổng carbon trong triglycerid.</li>
          <li>Với câu trắc nghiệm, nhìn vào “không no/khử/oxi hoá” để loại nhanh phương án.</li>
        </ul>
      </div>
    </div>
  `,
  game: [
    {
      type: 'multiple-choice',
      question: 'Chỉ số iot dùng để:',
      options: ['Đo độ dài mạch axit béo', 'Đo mức độ không no của lipid', 'Đo hàm lượng glixerol', 'Đo độ tan'],
      correctAnswer: 1,
      explanation: 'Chỉ số iot (g I2/100 g) phản ánh số liên kết đôi trong lipid.',
      points: 10
    },
    {
      type: 'multiple-choice',
      question: 'Thuỷ phân etyl butirat trong môi trường axit cho sản phẩm:',
      options: ['Ethanol + axit butiric', 'Propanol + axit propionic', 'Ethanol + axit axetic', 'Butanol + axit fomic'],
      correctAnswer: 0,
      explanation: 'Etyl butirat → etanol + butiric (C3H7COOH).',
      points: 10
    },
    {
      type: 'true-false',
      question: 'Chỉ số xà phòng hoá cao chứng tỏ trung bình mạch axit béo ngắn.',
      correctAnswer: true,
      explanation: 'Mạch ngắn → nhiều nhóm este trên 1 g → cần nhiều KOH.',
      points: 10
    },
    {
      type: 'multiple-choice',
      question: 'Sản phẩm xà phòng hoá tristearin với KOH là:',
      options: ['Glixerol + 3C17H35COOK', 'Glixerol + 3C17H35COOH', 'Glixerol + 3C17H33COOK', 'Glixerol + 3C15H31COONa'],
      correctAnswer: 0,
      explanation: 'Tristearin no → muối kali stearat.',
      points: 10
    },
    {
      type: 'multiple-choice',
      question: 'Phản ứng đặc trưng để nhận biết liên kết đôi trong axit béo không no:',
      options: ['Tác dụng HCl', 'Phản ứng với Br2 làm mất màu', 'Tráng bạc', 'Kết tủa với Ca(OH)2'],
      correctAnswer: 1,
      explanation: 'Liên kết đôi cộng Br2 làm mất màu dung dịch brom.',
      points: 10
    },
    {
      type: 'true-false',
      question: 'Ester nhỏ thường có mùi trái cây đặc trưng.',
      correctAnswer: true,
      explanation: 'Nhiều hương liệu là ester của axit và ancol mạch ngắn.',
      points: 10
    },
    {
      type: 'multiple-choice',
      question: 'Phương trình tổng quát xà phòng hoá trieste với NaOH tạo ra:',
      options: ['Ancol + este', 'Ancol + muối natri axit béo', 'Axit + muối natri', 'Axit + ancol'],
      correctAnswer: 1,
      explanation: 'Trieste + 3NaOH → 3RCOONa + ancol (glixerol).',
      points: 10
    },
    {
      type: 'fill-in-blank',
      question: 'Tên gọi của (CH3)2CHCOOCH3 là metyl ______.',
      correctAnswer: 'isobutirat',
      explanation: 'Axit (CH3)2CHCOOH là isobutyric → metyl isobutirat.',
      points: 10
    },
    {
      type: 'multiple-choice',
      question: 'Xà phòng hoá là phản ứng:',
      options: ['Cộng', 'Thế', 'Thuỷ phân kiềm của ester', 'Oxi hoá'],
      correctAnswer: 2,
      explanation: 'Thuỷ phân trong môi trường kiềm sinh xà phòng.',
      points: 10
    },
    {
      type: 'true-false',
      question: 'Ester có thể điều chế bằng phản ứng giữa axit cacboxylic và ancol có xúc tác H2SO4 đặc.',
      correctAnswer: true,
      explanation: 'Phản ứng este hoá kinh điển cần loại nước để dịch chuyển cân bằng.',
      points: 10
    }
  ]
};
