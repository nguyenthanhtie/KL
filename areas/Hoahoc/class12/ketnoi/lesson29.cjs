module.exports = {
  classId: 12,
  curriculumType: 'ketnoi',
  chapterId: 8,
  chapterName: 'Chương 8: Kim loại chuyển tiếp và phức chất',
  lessonId: 29,
  title: 'Bài 29: Tính chất và ứng dụng của kim loại chuyển tiếp và phức chất',
  description: 'Màu sắc, từ tính, xúc tác của kim loại chuyển tiếp và vai trò của phức chất.',
  level: 'Intermediate',
  order: 29,
  theory: `
    <h2>Tính chất và ứng dụng của kim loại chuyển tiếp & phức chất</h2>
    <p style="margin:8px 0; color:#334155;">Liên hệ màu sắc, từ tính, xúc tác với ứng dụng công nghiệp và y sinh của kim loại chuyển tiếp/phức chất.</p>

    <div style="display:grid; gap:12px; grid-template-columns:repeat(auto-fit,minmax(260px,1fr)); margin:12px 0;">
      <div style="padding:12px; border:1px solid #e2e8f0; border-radius:10px; background:#f8fafc;">
        <h4 style="margin:0 0 6px; color:#0f172a;">Màu sắc & từ tính</h4>
        <ul style="margin:0; padding-left:18px; color:#475569;">
          <li>Màu do hấp thụ ánh sáng khi e chuyển mức d–d; phụ thuộc phối tử.</li>
          <li>Thuận từ: e độc thân (Fe3+, Mn2+); nghịch từ: e ghép đôi (Zn2+, Cu+).</li>
          <li>Dải màu: Cu2+ xanh, Ni2+ lục, Cr3+ lục tím, MnO4- tím.</li>
        </ul>
      </div>
      <div style="padding:12px; border:1px solid #cbd5e1; border-radius:10px; background:#fff7ed; color:#92400e;">
        <h4 style="margin:0 0 6px;">Phức chất & ổn định</h4>
        <ul style="margin:0; padding-left:18px;">
          <li>Phức làm ổn định trạng thái oxi hoá (Fe2+/Fe3+ trong cyanoferrat).</li>
          <li>Tăng độ tan: [Ag(NH3)2]+ hoà tan AgCl; [CuCl4]2- tan trong HCl.</li>
          <li>Thuốc: cis-platin (điều trị ung thư), EDTA tạo phức làm mềm nước.</li>
        </ul>
      </div>
      <div style="padding:12px; border:1px dashed #cbd5e1; border-radius:10px; background:#f8fafc; color:#475569;">
        <h4 style="margin:0 0 6px;">Xúc tác & công nghệ</h4>
        <ul style="margin:0; padding-left:18px;">
          <li>V2O5 (quá trình tiếp xúc SO2 → SO3), Fe (Haber), Ni/Pt (hydro hoá).</li>
          <li>Cu/ZnO/Al2O3 (Metan hóa, methanol), Cr2O3 (oxi hoá amoniac).</li>
          <li>Mạ điện: phức Ni, Cr dùng để mạ trang trí/chống gỉ.</li>
        </ul>
      </div>
    </div>

    <div style="display:grid; gap:12px; grid-template-columns:repeat(auto-fit,minmax(260px,1fr)); margin:12px 0;">
      <div style="padding:12px; border-radius:12px; border:1px solid #cbd5e1; background:linear-gradient(135deg,#f0f9ff,#f8fafc); color:#0f172a;">
        <h4 style="margin:0 0 6px;">So sánh nhanh</h4>
        <ul style="margin:0; padding-left:18px; color:#334155;">
          <li>Màu: phụ thuộc phối tử; d10 (Zn2+, Cu+) thường không màu, d5 cao spin (Mn2+) nhạt.</li>
          <li>Từ tính: e độc thân → thuận từ (Fe3+, Mn2+); ghép đôi → nghịch từ (Zn2+, [Fe(CN)6]4- thấp spin).</li>
          <li>Ổn định phức: phối tử càng mạnh (CN-, CO, en) → Δo lớn, màu thay đổi.</li>
        </ul>
      </div>
      <div style="padding:12px; border:1px dashed #cbd5e1; border-radius:10px; background:#fffaf0; color:#92400e;">
        <h4 style="margin:0 0 6px;">Case & ứng dụng</h4>
        <ul style="margin:0; padding-left:18px;">
          <li>Điều trị: cis-platin phá DNA; ferrocene bền nhờ liên kết sandwich; EDTA chống cứng nước.</li>
          <li>Phân tích: chuẩn độ complexon với EDTA xác định Ca2+, Mg2+; thuốc thử SCN- cho màu đỏ máu với Fe3+.</li>
          <li>Công nghệ: xúc tác ba chức năng ô tô (Pt/Rh) khử NOx, oxi hoá CO/HC.</li>
        </ul>
      </div>
      <div style="padding:12px; border:1px solid #e2e8f0; border-radius:10px; background:#f8fafc; color:#475569;">
        <h4 style="margin:0 0 6px;">Ôn bài tập</h4>
        <ul style="margin:0; padding-left:18px;">
          <li>Giải thích màu/từ tính của phức dựa trên cấu hình e và phối tử mạnh/yếu (thuyết trường tinh thể).</li>
          <li>Tính nồng độ ion Ca2+ còn lại sau khi thêm lượng EDTA, áp dụng bảo toàn mol phức.</li>
          <li>Lập sơ đồ xúc tác: viết bậc oxi hoá và phản ứng đi kèm cho Haber, tiếp xúc, hydro hoá.</li>
        </ul>
      </div>
    </div>
  `,
  game: [
    {
      type: 'multiple-choice',
      question: 'Ion nào nghịch từ?',
      options: ['Fe3+', 'Mn2+', 'Zn2+', 'Ni2+'],
      correctAnswer: 2,
      explanation: 'Zn2+ có d10 ghép đôi hoàn toàn → nghịch từ.',
      points: 10
    },
    {
      type: 'true-false',
      question: 'Màu phức phụ thuộc phối tử bao quanh kim loại.',
      correctAnswer: true,
      explanation: 'Trường phối tử làm tách mức d khác nhau → màu thay đổi.',
      points: 10
    },
    {
      type: 'multiple-choice',
      question: 'Xúc tác sản xuất H2SO4 tiếp xúc là:',
      options: ['Fe', 'V2O5', 'Ni', 'Cu'],
      correctAnswer: 1,
      explanation: 'V2O5 xúc tác SO2 oxi hoá thành SO3.',
      points: 10
    },
    {
      type: 'multiple-choice',
      question: 'Cis-platin thuộc loại:',
      options: ['Phức chất Pt(II) chữa ung thư', 'Muối Pt(IV) oxi hoá', 'Hợp kim Pt-Pd', 'Ion PtCl6 2-'],
      correctAnswer: 0,
      explanation: 'Cis-[PtCl2(NH3)2] là thuốc hoá trị.',
      points: 10
    },
    {
      type: 'true-false',
      question: 'EDTA làm mềm nước do tạo phức với Ca2+, Mg2+. ',
      correctAnswer: true,
      explanation: 'EDTA4- kẹp ion kim loại, giảm độ cứng.',
      points: 10
    },
    {
      type: 'multiple-choice',
      question: 'Ion mang màu tím mạnh là:',
      options: ['MnO4-', 'Cu2+', 'Ni2+', 'Fe2+'],
      correctAnswer: 0,
      explanation: 'Permanganat tím đậm do chuyển e Mn(VII).',
      points: 10
    },
    {
      type: 'fill-in-blank',
      question: 'Phức hòa tan AgCl: [Ag(NH3)2]____.',
      correctAnswer: '+',
      explanation: 'Phức cation giúp AgCl tan.',
      points: 10
    },
    {
      type: 'multiple-choice',
      question: 'Hệ xúc tác Cu/ZnO/Al2O3 dùng để:',
      options: ['Tổng hợp NH3', 'Oxi hoá SO2', 'Sản xuất methanol', 'Thủy luyện Al'],
      correctAnswer: 2,
      explanation: 'Bộ xúc tác phổ biến cho CO + H2 → CH3OH.',
      points: 10
    },
    {
      type: 'multiple-choice',
      question: 'Nguyên nhân kim loại chuyển tiếp làm xúc tác tốt:',
      options: ['Có điện tích cao', 'Có obitan d trống/bán đầy hấp phụ chất phản ứng', 'Khối lượng lớn', 'Tan tốt trong nước'],
      correctAnswer: 1,
      explanation: 'Obitan d cho phép hấp phụ/hoạt hoá phân tử.',
      points: 10
    },
    {
      type: 'true-false',
      question: 'Fe2+ luôn màu xanh nhạt trong dung dịch.',
      correctAnswer: false,
      explanation: 'Màu phụ thuộc phối tử, pH; có thể xanh lục hoặc không màu nhạt.',
      points: 10
    }
  ]
};
