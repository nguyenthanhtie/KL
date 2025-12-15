module.exports = {
  classId: 12,
  curriculumType: 'ketnoi',
  chapterId: 8,
  chapterName: 'Chương 8: Kim loại chuyển tiếp và phức chất',
  lessonId: 27,
  title: 'Bài 27: Kim loại chuyển tiếp',
  description: 'Đặc điểm cấu hình e, tính chất đặc trưng của dãy 3d.',
  level: 'Intermediate',
  order: 27,
  theory: `
    <h2>Kim loại chuyển tiếp (dãy 3d)</h2>
    <p style="margin:8px 0; color:#334155;">Khám phá cấu hình e đặc trưng, mức oxi hoá đa dạng, ion màu và ứng dụng công nghiệp.</p>

    <div style="display:grid; gap:12px; grid-template-columns:repeat(auto-fit,minmax(260px,1fr)); margin:12px 0;">
      <div style="padding:12px; border:1px solid #e2e8f0; border-radius:10px; background:#f8fafc;">
        <h4 style="margin:0 0 6px; color:#0f172a;">Cấu hình & hoá trị</h4>
        <ul style="margin:0; padding-left:18px; color:#475569;">
          <li>Obitan d chưa bão hoà → nhiều mức oxi hoá (Fe2+/Fe3+, Cu+/Cu2+).</li>
          <li>Ion màu do chuyển d–d; lực trường phối tử quyết định màu.</li>
          <li>Từ tính: electron độc thân → thuận từ (Fe3+, Mn2+); cặp đôi → nghịch từ.</li>
        </ul>
      </div>
      <div style="padding:12px; border:1px solid #cbd5e1; border-radius:10px; background:#fff7ed; color:#92400e;">
        <h4 style="margin:0 0 6px;">Tính chất vật lí & hoá học</h4>
        <ul style="margin:0; padding-left:18px;">
          <li>Độ cứng cao, điểm nóng chảy/boiling lớn (Fe, Ni, Cr).</li>
          <li>Dẫn điện tốt (Cu), dẫn nhiệt, dễ tạo hợp kim (thép, đồng thau).</li>
          <li>Xúc tác: Fe (Haber), V2O5 (tiếp xúc), Ni/Pt (hydro hoá).</li>
        </ul>
      </div>
      <div style="padding:12px; border:1px dashed #cbd5e1; border-radius:10px; background:#f8fafc; color:#475569;">
        <h4 style="margin:0 0 6px;">Ứng dụng tiêu biểu</h4>
        <ul style="margin:0; padding-left:18px;">
          <li>Fe thép xây dựng; Cr/Ni thép không gỉ; Mn thép bền.</li>
          <li>Cu dây dẫn, hợp kim đồng thau/bronz, xúc tác CuO/ZnO.</li>
          <li>Ti (dãy 3d mở rộng) vật liệu y sinh, bền ăn mòn.</li>
        </ul>
      </div>
    </div>

    <div style="display:grid; gap:12px; grid-template-columns:repeat(auto-fit,minmax(260px,1fr)); margin:12px 0;">
      <div style="padding:12px; border-radius:12px; border:1px solid #cbd5e1; background:linear-gradient(135deg,#f0f9ff,#f8fafc); color:#0f172a;">
        <h4 style="margin:0 0 6px;">So sánh nhanh</h4>
        <ul style="margin:0; padding-left:18px; color:#334155;">
          <li>Số oxi hoá: Sc(+3) ổn định; Mn đa dạng +2 → +7; Cu ổn định +1/+2; Zn thường +2.</li>
          <li>Màu: phụ thuộc phối tử; d10 (Zn2+, Cu+) thường không màu/nhạt.</li>
          <li>Từ tính: e độc thân → thuận từ (Fe3+, Mn2+); ghép đôi → nghịch từ (Zn2+).</li>
        </ul>
      </div>
      <div style="padding:12px; border:1px dashed #cbd5e1; border-radius:10px; background:#fffaf0; color:#92400e;">
        <h4 style="margin:0 0 6px;">Case & ứng dụng</h4>
        <ul style="margin:0; padding-left:18px;">
          <li>Haber: Fe/K/Al2O3 xúc tác; tiếp xúc: V2O5; hydro hoá: Ni/Pt; cải hóa metan: Cu/ZnO/Al2O3.</li>
          <li>Inox: cần ≥10,5% Cr để thụ động hoá; thêm Ni tăng dẻo, Mn có thể thay Ni.</li>
          <li>Ion màu trong phân tích: dung dịch Cu2+ xanh, Cr2O7 2- da cam, MnO4- tím. </li>
        </ul>
      </div>
      <div style="padding:12px; border:1px solid #e2e8f0; border-radius:10px; background:#f8fafc; color:#475569;">
        <h4 style="margin:0 0 6px;">Ôn bài tập</h4>
        <ul style="margin:0; padding-left:18px;">
          <li>Xác định số oxi hoá trong hỗn hợp muối chuyển tiếp; cân bằng phản ứng oxi hoá khử có nhiều mức.</li>
          <li>Phân biệt ion màu: thử với NH3, NaOH để quan sát kết tủa/phức (Cu(OH)2 xanh, [Cu(NH3)4]2+ xanh đậm).</li>
          <li>Tính khối lượng thép không gỉ cần thêm Cr/Ni dựa trên phần trăm khối lượng yêu cầu.</li>
        </ul>
      </div>
    </div>
  `,
  game: [
    {
      type: 'multiple-choice',
      question: 'Nguyên nhân ion chuyển tiếp thường có màu là:',
      options: ['Kích thước nhỏ', 'Chuyển d–d trong obitan d', 'Có nhiều proton', 'Lượng điện tích cao'],
      correctAnswer: 1,
      explanation: 'Sự tách mức năng lượng d khi phối trí gây hấp thụ ánh sáng.',
      points: 10
    },
    {
      type: 'true-false',
      question: 'Fe2+ và Fe3+ cùng tồn tại ở nhiều hợp chất.',
      correctAnswer: true,
      explanation: 'Fe có nhiều mức oxi hoá phổ biến 2+ và 3+. ',
      points: 10
    },
    {
      type: 'multiple-choice',
      question: 'Xúc tác trong quá trình Haber là:',
      options: ['Cu', 'Fe', 'Ni', 'Pt'],
      correctAnswer: 1,
      explanation: 'Sắt (thường có K2O, Al2O3) làm xúc tác tổng hợp NH3.',
      points: 10
    },
    {
      type: 'multiple-choice',
      question: 'Ion nào thuận từ mạnh nhất?',
      options: ['Zn2+', 'Cu+', 'Mn2+', 'Ni2+'],
      correctAnswer: 2,
      explanation: 'Mn2+ (d5) có 5 e độc thân, thuận từ mạnh.',
      points: 10
    },
    {
      type: 'true-false',
      question: 'Cu2+ cho màu xanh trong dung dịch.',
      correctAnswer: true,
      explanation: 'Cu2+ hydrat hoá cho màu xanh đặc trưng.',
      points: 10
    },
    {
      type: 'multiple-choice',
      question: 'Fe được làm thép không gỉ khi pha thêm:',
      options: ['C và Mn', 'Cr và Ni', 'Al và Zn', 'Cu và Ag'],
      correctAnswer: 1,
      explanation: 'Cr tạo màng thụ động, Ni tăng dẻo dai → inox.',
      points: 10
    },
    {
      type: 'fill-in-blank',
      question: 'Xúc tác tiếp xúc SO2 → SO3: _____.',
      correctAnswer: 'V2O5',
      explanation: 'V2O5 xúc tác trong sản xuất H2SO4.',
      points: 10
    },
    {
      type: 'multiple-choice',
      question: 'Obitan d bắt đầu điền từ chu kì:',
      options: ['3', '4', '5', '6'],
      correctAnswer: 1,
      explanation: 'Dãy 3d thuộc chu kì 4 (Sc → Zn).',
      points: 10
    },
    {
      type: 'multiple-choice',
      question: 'Từ tính nghịch từ xuất hiện khi:',
      options: ['Có e độc thân', 'Tất cả e ghép đôi', 'Có obitan p trống', 'Có lớp f đầy'],
      correctAnswer: 1,
      explanation: 'Ghép đôi hoàn toàn → bị đẩy yếu bởi từ trường.',
      points: 10
    },
    {
      type: 'true-false',
      question: 'Cu là kim loại chuyển tiếp vì lớp d chưa bão hoà ở trạng thái nguyên tử.',
      correctAnswer: false,
      explanation: 'Cu (3d10 4s1) có d bão hoà; vẫn được xếp nhóm chuyển tiếp nhờ ion Cu2+ có d9.',
      points: 10
    }
  ]
};
