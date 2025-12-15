module.exports = {
  classId: 11,
  curriculumType: 'ketnoi',
  chapterId: 3,
  chapterName: 'Chương 3: Đại cương về hoá học hữu cơ',
  lessonId: 13,
  title: 'Bài 13: Cấu tạo hoá học hợp chất hữu cơ',
  description: 'Khái niệm cấu tạo, đồng phân, ảnh hưởng cấu trúc đến tính chất.',
  level: 'Intermediate',
  order: 13,
  theory: `
    <h2>Cấu tạo hoá học</h2>
    <p style="margin:8px 0; color:#334155;">Xem xét cấu trúc (trật tự liên kết) và cấu hình (không gian) để giải thích tính chất hoá học hữu cơ.</p>

    <div style="display:grid; gap:12px; grid-template-columns:repeat(auto-fit,minmax(260px,1fr)); margin:12px 0;">
      <div style="padding:12px; border:1px solid #e2e8f0; border-radius:10px; background:#f8fafc;">
        <h4 style="margin:0 0 6px; color:#0f172a;">Khái niệm cấu tạo</h4>
        <ul style="margin:0; padding-left:18px; color:#475569;">
          <li>Thứ tự liên kết giữa các nguyên tử (liên kết đơn/đôi/ba, nhóm chức).</li>
          <li>Hướng liên kết trong không gian (góc, hình học cis/trans, E/Z).</li>
          <li>Cấu tạo quyết định tính chất và phản ứng đặc trưng.</li>
        </ul>
      </div>
      <div style="padding:12px; border:1px solid #e2e8f0; border-radius:10px; background:#fff7ed;">
        <h4 style="margin:0 0 6px; color:#9a3412;">Các loại đồng phân</h4>
        <ul style="margin:0; padding-left:18px; color:#7c2d12;">
          <li>Đồng phân cấu tạo: mạch carbon, vị trí nhóm chức/nối đôi, nhóm chức khác nhau.</li>
          <li>Đồng phân hình học (cis/trans hoặc E/Z) ở nối đôi, vòng nhỏ.</li>
          <li>Đồng phân quang học: có nguyên tử bất đối (C*), quay mặt phẳng ánh sáng phân cực.</li>
        </ul>
      </div>
    </div>

    <div style="display:grid; gap:12px; grid-template-columns:repeat(auto-fit,minmax(260px,1fr)); margin:12px 0;">
      <div style="padding:12px; border-radius:12px; border:1px solid #cbd5e1; background:#f8fafc; color:#475569;">
        <h4 style="margin:0 0 6px;">Hiệu ứng điện tử</h4>
        <ul style="margin:0; padding-left:18px;">
          <li>Cảm ứng (-I/+I): nhóm rút đẩy e theo sigma (–Cl, –NO2 rút; –alkyl đẩy).</li>
          <li>Liên hợp (+M/-M): nhóm cho nhận e theo hệ π (–OH, –NH2 đẩy; –CHO, –NO2 rút).</li>
          <li>Ổn định carbocation/anion phụ thuộc hiệu ứng này.</li>
        </ul>
      </div>
      <div style="padding:12px; border-radius:12px; border:1px solid #cbd5e1; background:linear-gradient(135deg,#eef2ff,#f8fafc); color:#334155;">
        <h4 style="margin:0 0 6px; color:#312e81;">Ảnh hưởng tới tính chất</h4>
        <ul style="margin:0; padding-left:18px;">
          <li>Mạch nhánh: giảm nhiệt độ sôi (giảm diện tích tiếp xúc), thường giảm hoạt tính.</li>
          <li>Nhóm chức quyết định phản ứng đặc trưng (–OH: thế/oxi hoá; –COOH: axit, este hoá).</li>
          <li>Đồng phân hình học khác tính chất (cis-2-butene sôi cao hơn trans do moment lưỡng cực).</li>
        </ul>
      </div>
    </div>
  `,
  game: [
    {
      type: 'multiple-choice',
      question: 'Đồng phân xuất hiện do khác:',
      options: ['Khối lượng mol', 'Thành phần nguyên tố', 'Cách sắp xếp nguyên tử hoặc không gian', 'Trạng thái tập hợp'],
      correctAnswer: 2,
      explanation: 'Cùng CTPT nhưng sắp xếp khác → đồng phân.',
      points: 10
    },
    {
      type: 'multiple-choice',
      question: 'Cis/trans tồn tại khi:',
      options: ['Có nối đơn', 'Có nối đôi bị cố định và mỗi C nối đôi gắn 2 nhóm khác nhau', 'Mạch thẳng', 'Có nhóm chức –OH'],
      correctAnswer: 1,
      explanation: 'Nối đôi không quay tự do; cần hai nhóm khác nhau trên mỗi C.',
      points: 10
    },
    {
      type: 'true-false',
      question: 'Nhóm –NO2 thể hiện hiệu ứng -M và -I.',
      correctAnswer: true,
      explanation: '–NO2 rút e mạnh qua sigma (-I) và rút qua liên hợp (-M).',
      points: 10
    },
    {
      type: 'multiple-choice',
      question: 'Carbocation bậc 3 bền hơn bậc 1 vì:',
      options: ['Hiệu ứng +I của nhóm alkyl ổn định điện tích dương', 'Khối lượng lớn', 'Có liên kết hiđro', 'Do cộng hưởng'],
      correctAnswer: 0,
      explanation: 'Nhóm ankyl đẩy e (cảm ứng) và hiệu ứng siêu liên hợp ổn định carbocation.',
      points: 10
    },
    {
      type: 'multiple-choice',
      question: 'Đồng phân quang học cần có:',
      options: ['Liên kết ba', 'Vòng thơm', 'Nguyên tử bất đối (C*) và không có mặt phẳng đối xứng', 'Nhiều halogen'],
      correctAnswer: 2,
      explanation: 'Trung tâm bất đối tạo hai ảnh gương không chồng khít (enantiomer).',
      points: 10
    },
    {
      type: 'true-false',
      question: 'Mạch nhánh thường làm giảm nhiệt độ sôi so với mạch thẳng đồng phân.',
      correctAnswer: true,
      explanation: 'Mạch nhánh giảm diện tích tiếp xúc → lực London yếu hơn.',
      points: 10
    },
    {
      type: 'multiple-choice',
      question: 'Hiệu ứng liên hợp (+M) thường gặp ở nhóm:',
      options: ['–NO2', '–CHO', '–NH2', '–CF3'],
      correctAnswer: 2,
      explanation: '–NH2 có cặp e tự do đẩy vào hệ π (hiệu ứng +M).',
      points: 10
    },
    {
      type: 'multiple-choice',
      question: 'Với but-2-ene, đồng phân nào có moment lưỡng cực lớn hơn?',
      options: ['Cis', 'Trans', 'Như nhau', 'Không có moment'],
      correctAnswer: 0,
      explanation: 'Cis tạo moment cộng hưởng, trans triệt tiêu phần lớn.',
      points: 10
    },
    {
      type: 'true-false',
      question: 'Đồng phân cấu tạo có thể khác nhóm chức.',
      correctAnswer: true,
      explanation: 'Ví dụ: C2H6O có ancol (etanol) và ete (đimetyl ete).',
      points: 10
    },
    {
      type: 'fill-in-blank',
      question: 'Chỉ số bất đối thường ký hiệu là ______',
      correctAnswer: 'C*',
      explanation: 'Nguyên tử carbon gắn 4 nhóm khác nhau được ký hiệu C*.',
      points: 10
    }
  ]
};
