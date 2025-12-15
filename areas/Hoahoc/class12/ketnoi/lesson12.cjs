module.exports = {
  classId: 12,
  curriculumType: 'ketnoi',
  chapterId: 4,
  chapterName: 'Chương 4: Polymer',
  lessonId: 12,
  title: 'Bài 12: Đại cương về polymer',
  description: 'Khái niệm, phân loại, cơ chế trùng hợp/trùng ngưng và thông số đặc trưng.',
  level: 'Intermediate',
  order: 12,
  theory: `
    <h2>Đại cương về polymer</h2>
    <p style="margin:8px 0; color:#334155;">Nền tảng về monomer, phản ứng tạo mạch, phân loại và các thông số đặc trưng của vật liệu polymer.</p>

    <div style="display:grid; gap:12px; grid-template-columns:repeat(auto-fit,minmax(260px,1fr)); margin:12px 0;">
      <div style="padding:12px; border:1px solid #e2e8f0; border-radius:10px; background:#f8fafc;">
        <h4 style="margin:0 0 6px; color:#0f172a;">Khái niệm & phân loại</h4>
        <ul style="margin:0; padding-left:18px; color:#475569;">
          <li>Polymer: chất có phân tử khối rất lớn, gồm các mắt xích (đơn vị lặp) từ monomer.</li>
          <li>Phân loại: tự nhiên (tinh bột, ADN), nhân tạo (tơ visco), tổng hợp (PE, PVC).</li>
          <li>Cấu trúc: mạch thẳng, nhánh, mạng không gian; ảnh hưởng cơ học và nhiệt.</li>
        </ul>
      </div>
      <div style="padding:12px; border:1px solid #fde68a; border-radius:10px; background:#fffbeb; color:#92400e;">
        <h4 style="margin:0 0 6px;">Phản ứng tạo polymer</h4>
        <ul style="margin:0; padding-left:18px;">
          <li>Trùng hợp cộng: monomer chứa liên kết bội (PE, PP, PS).</li>
          <li>Trùng ngưng: kèm tách nhỏ phân tử (H2O, HCl) giữa monomer đa chức (PA, PET, phenol-formaldehyde).</li>
          <li>Ghép khối/mẫu: block copolymer, random, alternating.</li>
        </ul>
      </div>
      <div style="padding:12px; border:1px dashed #cbd5e1; border-radius:10px; background:#f8fafc; color:#475569;">
        <h4 style="margin:0 0 6px;">Thông số đặc trưng</h4>
        <ul style="margin:0; padding-left:18px;">
          <li>Độ trùng hợp (DP) ≈ M<sub>w</sub>/M<sub>đơn vị lặp</sub>; phân bố khối lượng (PDI).</li>
          <li>Nhiệt độ hoá thuỷ tinh (Tg), nhiệt độ nóng chảy (Tm) ảnh hưởng gia công.</li>
          <li>Độ kết tinh: mạch thẳng dễ kết tinh (PE), mạch nhánh khó kết tinh (LDPE).</li>
        </ul>
      </div>
    </div>

    <div style="display:grid; gap:12px; grid-template-columns:repeat(auto-fit,minmax(260px,1fr)); margin:12px 0;">
      <div style="padding:12px; border-radius:12px; border:1px solid #cbd5e1; background:linear-gradient(135deg,#eef2ff,#f8fafc); color:#0f172a;">
        <h4 style="margin:0 0 6px;">So sánh cơ chế</h4>
        <ul style="margin:0; padding-left:18px; color:#334155;">
          <li>Trùng hợp gốc → khơi mào, truyền, chấm dứt; dễ PDI rộng.</li>
          <li>Trùng ngưng → cần nhóm đa chức, tách phân tử nhỏ, DP tăng dần.</li>
          <li>Ghép khối (block) cải thiện tính chất: đàn hồi (SBS), pha trộn mềm-cứng.</li>
        </ul>
      </div>
      <div style="padding:12px; border:1px dashed #cbd5e1; border-radius:10px; background:#fffaf0; color:#92400e;">
        <h4 style="margin:0 0 6px;">Case & ứng dụng</h4>
        <ul style="margin:0; padding-left:18px;">
          <li>Chọn polymer: cần trong, nhẹ → PP/PC; cần rào cản khí → PET/EVOH.</li>
          <li>Điều chỉnh Tg: thêm chất hoá dẻo (PVC mềm) hoặc tăng kết tinh (kéo sợi PET).</li>
          <li>Nhận biết loại phản ứng: có H2O/HCl tách ra → trùng ngưng; không tách → trùng hợp cộng.</li>
        </ul>
      </div>
      <div style="padding:12px; border:1px solid #e2e8f0; border-radius:10px; background:#f8fafc; color:#475569;">
        <h4 style="margin:0 0 6px;">Ôn bài tập</h4>
        <ul style="margin:0; padding-left:18px;">
          <li>Tính DP từ khối lượng: DP ≈ M mẫu / M mắt xích; chú ý đơn vị g/mol.</li>
          <li>Dự đoán Tg/Tm: mạch cứng, tương tác mạnh (aromatic, H-bond) → Tg/Tm cao.</li>
          <li>Vẽ đơn vị lặp từ monomer: xoá liên kết bội, giữ khung chính; với trùng ngưng, ghép qua nhóm chức còn lại.</li>
        </ul>
      </div>
    </div>
  `,
  game: [
    {
      type: 'multiple-choice',
      question: 'Trùng hợp etilen tạo:',
      options: ['PVC', 'PE', 'PP', 'PS'],
      correctAnswer: 1,
      explanation: 'Etilen (CH2=CH2) trùng hợp → polyetylen.',
      points: 10
    },
    {
      type: 'multiple-choice',
      question: 'Phản ứng trùng ngưng đặc trưng bởi:',
      options: ['Không tách sản phẩm phụ', 'Tách phân tử nhỏ như H2O, HCl', 'Chỉ xảy ra với anken', 'Không cần monomer đa chức'],
      correctAnswer: 1,
      explanation: 'Trùng ngưng cần nhóm chức hai hay nhiều để tách phân tử nhỏ.',
      points: 10
    },
    {
      type: 'true-false',
      question: 'Polymer mạch nhánh thường có độ kết tinh thấp hơn mạch thẳng.',
      correctAnswer: true,
      explanation: 'Nhánh cản trở sắp xếp, giảm kết tinh.',
      points: 10
    },
    {
      type: 'multiple-choice',
      question: 'Tg là nhiệt độ:',
      options: ['Nóng chảy kết tinh', 'Chuyển trạng thái thủy tinh → cao su', 'Sôi', 'Phân huỷ'],
      correctAnswer: 1,
      explanation: 'Tg: chuyển từ trạng thái giòn kính sang mềm dẻo.',
      points: 10
    },
    {
      type: 'multiple-choice',
      question: 'PDI (Mw/Mn) càng gần 1 cho thấy:',
      options: ['Phân bố khối lượng hẹp', 'Phân bố rất rộng', 'Polymer nhánh', 'Polymer dễ phân huỷ'],
      correctAnswer: 0,
      explanation: 'PDI ~1 nghĩa chuỗi có kích thước đồng đều.',
      points: 10
    },
    {
      type: 'true-false',
      question: 'Polymer tự nhiên bao gồm tinh bột, cellulose, protein.',
      correctAnswer: true,
      explanation: 'Chúng đều là macromolecule có nguồn gốc sinh học.',
      points: 10
    },
    {
      type: 'multiple-choice',
      question: 'Monomer của nylon-6,6 là:',
      options: ['Caprolactam', 'Hexametylen diamine và axit adipic', 'Etilen glycol và axit terephtalic', 'Styrene'],
      correctAnswer: 1,
      explanation: 'Nylon-6,6 = HMDA + adipic acid (trùng ngưng).',
      points: 10
    },
    {
      type: 'fill-in-blank',
      question: 'Độ trùng hợp xấp xỉ DP ≈ M phân tử / M ______.',
      correctAnswer: 'đơn vị lặp',
      explanation: 'Chia khối lượng trung bình cho khối lượng một mắt xích.',
      points: 10
    },
    {
      type: 'multiple-choice',
      question: 'Polymer kết tinh cao thường có tính chất:',
      options: ['Trong suốt, mềm', 'Đục, bền kéo cao', 'Dễ tan nước', 'Nhiệt độ nóng chảy thấp'],
      correctAnswer: 1,
      explanation: 'Vùng kết tinh tăng độ bền, độ đục.',
      points: 10
    },
    {
      type: 'true-false',
      question: 'Trùng hợp khơi mào gốc tự do thường dùng benzoil peroxit.',
      correctAnswer: true,
      explanation: 'BPO phân huỷ cho gốc tự do khởi động phản ứng cộng chuỗi.',
      points: 10
    }
  ]
};
