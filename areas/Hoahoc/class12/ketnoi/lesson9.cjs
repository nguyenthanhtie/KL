module.exports = {
  classId: 12,
  curriculumType: 'ketnoi',
  chapterId: 3,
  chapterName: 'Chương 3: Hợp chất chứa nitrogen',
  lessonId: 9,
  title: 'Bài 9: Amino acid và peptide',
  description: 'Cấu tạo lưỡng tính, điểm đẳng điện, phản ứng tạo muối/este, hình thành peptide.',
  level: 'Intermediate',
  order: 9,
  theory: `
    <h2>Amino acid và peptide</h2>
    <p style="margin:8px 0; color:#334155;">Khám phá tính lưỡng tính, điểm đẳng điện của amino acid và liên kết peptide tạo nên protein.</p>

    <div style="display:grid; gap:12px; grid-template-columns:repeat(auto-fit,minmax(260px,1fr)); margin:12px 0;">
      <div style="padding:12px; border:1px solid #e2e8f0; border-radius:10px; background:#f8fafc;">
        <h4 style="margin:0 0 6px; color:#0f172a;">Cấu tạo & tính lưỡng tính</h4>
        <ul style="margin:0; padding-left:18px; color:#475569;">
          <li>Chứa –NH2 và –COOH trên cùng mạch → tồn tại dạng ion lưỡng cực <sup>+</sup>H3N–CHR–COO<sup>-</sup>.</li>
          <li>Điểm đẳng điện (pI): pH tại đó amino acid có điện tích tổng bằng 0, ít tan, dễ kết tinh.</li>
          <li>Danh pháp: alpha-amino acid (gly, ala, val...); góc quay quang học (trừ gly) do C*.</li>
        </ul>
      </div>
      <div style="padding:12px; border:1px solid #fde68a; border-radius:10px; background:#fffbeb; color:#92400e;">
        <h4 style="margin:0 0 6px;">Phản ứng đặc trưng</h4>
        <ul style="margin:0; padding-left:18px;">
          <li>Tạo muối với axit/bazơ; tạo este (–COOH) với ancol/H<sub>2</sub>SO<sub>4</sub> đặc.</li>
          <li>Phản ứng ninhydrin → màu tím (trừ proline cho vàng) dùng định tính/định lượng.</li>
          <li>Liên kết peptide: –CO–NH– giữa nhóm –COOH và –NH2; đầu N (N-terminus) và đầu C.</li>
        </ul>
      </div>
      <div style="padding:12px; border:1px dashed #cbd5e1; border-radius:10px; background:#f8fafc; color:#475569;">
        <h4 style="margin:0 0 6px;">Peptide & sinh học</h4>
        <ul style="margin:0; padding-left:18px;">
          <li>Dipeptide/tripeptide đặt tên từ trái sang phải: glycyl-alanine...</li>
          <li>Thuỷ phân: axit/bazơ/enzyme → giải phóng amino acid; thử biuret (+) nếu ≥2 liên kết peptide.</li>
          <li>Peptide hormone nhỏ: oxytocin, vasopressin; thuốc: aspartam (chất ngọt). </li>
        </ul>
      </div>
    </div>

    <div style="display:grid; gap:12px; grid-template-columns:repeat(auto-fit,minmax(260px,1fr)); margin:12px 0;">
      <div style="padding:12px; border-radius:12px; border:1px solid #cbd5e1; background:linear-gradient(135deg,#eef2ff,#f8fafc); color:#0f172a;">
        <h4 style="margin:0 0 6px;">So sánh & ghi nhớ</h4>
        <ul style="margin:0; padding-left:18px; color:#334155;">
          <li>Dạng tồn tại: pH &lt; pI → cation (tăng tan); pH ~ pI → lưỡng cực (ít tan); pH &gt; pI → anion.</li>
          <li>Biuret (+) khi ≥2 liên kết peptide; Ninhydrin tím (trừ Pro vàng).</li>
          <li>Peptide đặt tên: đầu N đọc trước, hậu tố -yl cho tất cả trừ amino acid cuối. </li>
        </ul>
      </div>
      <div style="padding:12px; border:1px dashed #cbd5e1; border-radius:10px; background:#fffaf0; color:#92400e;">
        <h4 style="margin:0 0 6px;">Case & ứng dụng</h4>
        <ul style="margin:0; padding-left:18px;">
          <li>Điện di: ở pH = pI peptide đứng yên; pH &gt; pI → chạy về cực dương.</li>
          <li>Bảo quản amino acid dạng muối (HCl) để ổn định và tan tốt.</li>
          <li>Chất ngọt aspartam: dipeptide, nên tránh nhiệt cao để không phân huỷ mất vị.</li>
        </ul>
      </div>
      <div style="padding:12px; border:1px solid #e2e8f0; border-radius:10px; background:#f8fafc; color:#475569;">
        <h4 style="margin:0 0 6px;">Ôn bài tập</h4>
        <ul style="margin:0; padding-left:18px;">
          <li>Tính pI amino acid trung tính: (pKa1 + pKa2)/2; amino acid có nhóm ion hoá bên cạnh cần cân nhắc thêm.</li>
          <li>Thuỷ phân peptide: xác định số mol liên kết = số mol nước tiêu thụ; đếm số mắt xích = số liên kết + 1.</li>
          <li>Đặt tên dipeptide cụ thể, xác định đầu N/C và viết trình tự đúng hướng.</li>
        </ul>
      </div>
    </div>
  `,
  game: [
    {
      type: 'multiple-choice',
      question: 'Dạng chủ yếu của amino acid trong nước gần pH trung tính là:',
      options: ['Phân tử không ion', 'Ion lưỡng cực +H3N–CHR–COO-', 'Ion âm', 'Ion dương'],
      correctAnswer: 1,
      explanation: 'Tồn tại dạng zwitterion nên tan tốt, nhiệt độ nóng chảy cao.',
      points: 10
    },
    {
      type: 'multiple-choice',
      question: 'Phản ứng tạo màu tím với ninhydrin dùng để phát hiện:',
      options: ['Axit béo', 'Amino acid/peptide', 'Ester', 'Ancol'],
      correctAnswer: 1,
      explanation: 'Ninhydrin phản ứng với nhóm –NH2 α cho màu tím.',
      points: 10
    },
    {
      type: 'true-false',
      question: 'Liên kết peptide là liên kết –CO–NH–.',
      correctAnswer: true,
      explanation: 'Hình thành giữa –COOH của acid amin này và –NH2 của acid amin kia.',
      points: 10
    },
    {
      type: 'multiple-choice',
      question: 'Điểm đẳng điện (pI) là pH tại đó:',
      options: ['Amino acid tan mạnh nhất', 'Amino acid có tổng điện tích 0', 'Amino acid bị phân huỷ', 'Amino acid không phản ứng'],
      correctAnswer: 1,
      explanation: 'pI → dạng lưỡng cực, ít di chuyển trong điện trường.',
      points: 10
    },
    {
      type: 'multiple-choice',
      question: 'Tên gọi của dipeptide gồm glycine và alanine với đầu N là glycine:',
      options: ['Glycylalanine', 'Alanylglycine', 'Glycylglycine', 'Alanylalanine'],
      correctAnswer: 0,
      explanation: 'Đầu N đặt trước trong tên dipeptide.',
      points: 10
    },
    {
      type: 'true-false',
      question: 'Amino acid có thể vừa phản ứng với HCl vừa với NaOH.',
      correctAnswer: true,
      explanation: 'Do tính lưỡng tính, tạo muối amoni hoặc muối carboxylat.',
      points: 10
    },
    {
      type: 'multiple-choice',
      question: 'Aspartam (chất ngọt) là dipeptide của:',
      options: ['Aspartic acid và phenylalanine', 'Glycine và alanine', 'Glutamic acid và lysine', 'Serine và threonine'],
      correctAnswer: 0,
      explanation: 'Aspartam = L-Asp-L-Phe methyl ester.',
      points: 10
    },
    {
      type: 'fill-in-blank',
      question: 'Thử biuret dương tính khi phân tử có từ ___ liên kết peptide trở lên.',
      correctAnswer: '2',
      explanation: 'Cần ít nhất 2 liên kết peptide (tripeptide).',
      points: 10
    },
    {
      type: 'multiple-choice',
      question: 'Sản phẩm este hoá alanine với CH3OH/H2SO4 đặc:',
      options: ['Alanine metyl este hydrochloride', 'Alanine ethyl ester', 'Axit lactic', 'Anhydrit alanin'],
      correctAnswer: 0,
      explanation: '–COOH este hoá; –NH2 bị proton hoá thành muối.',
      points: 10
    },
    {
      type: 'true-false',
      question: 'Glycine không quay mặt phẳng ánh sáng phân cực.',
      correctAnswer: true,
      explanation: 'Gly không có C bất đối (R=H).',
      points: 10
    }
  ]
};
