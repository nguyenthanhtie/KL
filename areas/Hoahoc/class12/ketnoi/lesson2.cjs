module.exports = {
  classId: 12,
  curriculumType: 'ketnoi',
  chapterId: 1,
  chapterName: 'Chương 1: Ester - lipid',
  lessonId: 2,
  title: 'Bài 2: Xà phòng và chất giặt rửa',
  description: 'Cơ chế tẩy rửa, thành phần, điều chế xà phòng và chất hoạt động bề mặt.',
  level: 'Intermediate',
  order: 2,
  theory: `
    <h2>Xà phòng và chất giặt rửa</h2>
    <p style="margin:8px 0; color:#334155;">Hiểu cấu tạo chất hoạt động bề mặt, cơ chế micelle, khác biệt xà phòng và chất tẩy tổng hợp để chọn sản phẩm thân thiện.</p>

    <div style="display:grid; gap:12px; grid-template-columns:repeat(auto-fit,minmax(260px,1fr)); margin:12px 0;">
      <div style="padding:12px; border:1px solid #e2e8f0; border-radius:10px; background:#f8fafc;">
        <h4 style="margin:0 0 6px; color:#0f172a;">Xà phòng</h4>
        <ul style="margin:0; padding-left:18px; color:#475569;">
          <li>Muối natri/kali của axit béo (RCOO<sup>-</sup>Na<sup>+</sup>/K<sup>+</sup>); sản xuất bằng xà phòng hoá mỡ/dầu.</li>
          <li>Cơ chế micelle: đuôi kị nước bám chất bẩn, đầu ưa nước hướng ra ngoài → nhũ hoá, cuốn trôi.</li>
          <li>Hạn chế: kết tủa với Ca<sup>2+</sup>, Mg<sup>2+</sup> trong nước cứng tạo "cặn xà phòng".</li>
        </ul>
      </div>
      <div style="padding:12px; border:1px solid #fde68a; border-radius:10px; background:#fffbeb; color:#92400e;">
        <h4 style="margin:0 0 6px;">Chất giặt rửa tổng hợp</h4>
        <ul style="margin:0; padding-left:18px;">
          <li>Hoạt chất: anion (alkylbenzen sulfonat), cation, lưỡng cực; dùng được trong nước cứng.</li>
          <li>Phụ gia: chất độn (Na2SO4), builders (polyphosphate, zeolit), enzyme, chất tẩy trắng quang học.</li>
          <li>Ưu tiên công thức dễ phân huỷ sinh học (ABS tuyến tính), giảm phosphate để hạn chế phú dưỡng.</li>
        </ul>
      </div>
      <div style="padding:12px; border:1px dashed #cbd5e1; border-radius:10px; background:#f8fafc; color:#475569;">
        <h4 style="margin:0 0 6px;">An toàn & môi trường</h4>
        <ul style="margin:0; padding-left:18px;">
          <li>Tránh pha trộn hoá chất tẩy chứa clo với axit → khí độc Cl2.</li>
          <li>Chọn sản phẩm nhãn sinh học, giảm bao bì nhựa; dùng đúng liều để giảm COD/BOD nước thải.</li>
          <li>Xử lý nước thải: bể hiếu khí, keo tụ, than hoạt tính để loại tenside và phosphate.</li>
        </ul>
      </div>
    </div>

    <div style="display:grid; gap:12px; grid-template-columns:repeat(auto-fit,minmax(260px,1fr)); margin:12px 0;">
      <div style="padding:12px; border-radius:12px; border:1px solid #cbd5e1; background:linear-gradient(135deg,#eef2ff,#f8fafc); color:#0f172a;">
        <h4 style="margin:0 0 6px;">Case thực tế</h4>
        <ul style="margin:0; padding-left:18px; color:#334155;">
          <li>Giặt nước cứng: ưu tiên bột giặt anion + zeolit, hạn chế xà phòng để tránh cặn.</li>
          <li>Vết dầu mỡ: ngâm ấm + chất hoạt động bề mặt không ion (Tween) ít bọt, ít kích ứng.</li>
          <li>Đồ trẻ em/da nhạy cảm: chọn công thức không hương liệu mạnh, không chất tẩy quang.</li>
        </ul>
      </div>
      <div style="padding:12px; border:1px dashed #cbd5e1; border-radius:10px; background:#fffaf0; color:#92400e;">
        <h4 style="margin:0 0 6px;">Mẹo ghi nhớ nhanh</h4>
        <ul style="margin:0; padding-left:18px;">
          <li>“Xà phòng sợ cứng” → Ca/Mg kết tủa; “tổng hợp kệ cứng” → LAS vẫn hoạt động.</li>
          <li>CMC: càng thấp → tạo micelle dễ → bọt nhanh; nhưng ít bọt ≠ kém tẩy (do công thức ít tạo bọt).</li>
          <li>Builders = bắt Ca/Mg + đệm pH: phosphate (mạnh nhưng ô nhiễm) → thay bằng zeolit, citrate.</li>
        </ul>
      </div>
      <div style="padding:12px; border:1px solid #e2e8f0; border-radius:10px; background:#f8fafc; color:#475569;">
        <h4 style="margin:0 0 6px;">Ôn bài tập nhanh</h4>
        <ul style="margin:0; padding-left:18px;">
          <li>Cân bằng xà phòng hoá: 1 triglycerid + 3 kiềm → 3 muối + glixerol; bảo toàn Na<sup>+</sup> để tính khối lượng.</li>
          <li>Nhận biết nước cứng: tạo cặn, ít bọt; xử lý: đun sôi (tạm thời) hoặc trao đổi ion.</li>
          <li>So sánh hiệu quả tẩy: dựa chuỗi alkyl (C12–C18 tối ưu) và đầu phân cực (anion > không ion ~ cation cho khử khuẩn).</li>
        </ul>
      </div>
    </div>
  `,
  game: [
    {
      type: 'multiple-choice',
      question: 'Thành phần hoạt động chính của xà phòng là:',
      options: ['Axit béo', 'Muối natri/kali của axit béo', 'Ancol béo', 'Axit sunfonic'],
      correctAnswer: 1,
      explanation: 'Xà phòng là muối RCOO- Na+/K+ thu từ xà phòng hoá triglycerid.',
      points: 10
    },
    {
      type: 'multiple-choice',
      question: 'Chất hoạt động bề mặt anion phổ biến trong bột giặt là:',
      options: ['LAS (alkylbenzen sulfonat)', 'CTAB (cetyl trimetyl amoni bromide)', 'Tween 80', 'PEG'],
      correctAnswer: 0,
      explanation: 'LAS tuyến tính dễ phân huỷ sinh học, tạo bọt tốt.',
      points: 10
    },
    {
      type: 'true-false',
      question: 'Xà phòng bị giảm tác dụng trong nước cứng do tạo muối không tan với Ca2+, Mg2+. ',
      correctAnswer: true,
      explanation: 'Ca2+/Mg2+ kết tủa RCOO- → "cặn xà phòng".',
      points: 10
    },
    {
      type: 'multiple-choice',
      question: 'Builders trong bột giặt có vai trò chính là:',
      options: ['Tạo màu', 'Làm mềm nước, tăng hiệu tẩy', 'Tạo mùi', 'Khử trùng'],
      correctAnswer: 1,
      explanation: 'Polyphosphate/zeolit bắt giữ Ca2+, Mg2+, nâng pH giúp tenside hoạt động.',
      points: 10
    },
    {
      type: 'multiple-choice',
      question: 'Micelle hình thành khi nồng độ chất hoạt động bề mặt vượt:',
      options: ['Nhiệt độ sôi', 'Điểm đông đặc', 'CMC (nồng độ tới hạn micelle)', 'pH = 7'],
      correctAnswer: 2,
      explanation: 'CMC là ngưỡng tạo cấu trúc micelle ổn định.',
      points: 10
    },
    {
      type: 'true-false',
      question: 'Chất hoạt động bề mặt cationic thường dùng làm chất diệt khuẩn, xả vải.',
      correctAnswer: true,
      explanation: 'Hợp chất amoni bậc bốn có tính diệt khuẩn và bám tốt trên sợi.',
      points: 10
    },
    {
      type: 'multiple-choice',
      question: 'Phản ứng xà phòng hoá triglycerid cần:',
      options: ['NaOH hoặc KOH, đun nóng', 'H2SO4 đặc, lạnh', 'KMnO4', 'H2/Pt'],
      correctAnswer: 0,
      explanation: 'Đun với kiềm để thu muối axit béo và glixerol.',
      points: 10
    },
    {
      type: 'multiple-choice',
      question: 'Tác động môi trường chính của phosphate trong bột giặt là:',
      options: ['Tăng độ mặn', 'Gây phú dưỡng nguồn nước', 'Tăng độ pH đất', 'Tạo mùi khó chịu'],
      correctAnswer: 1,
      explanation: 'Phosphate là dinh dưỡng mạnh, kích thích tảo nở hoa gây thiếu oxy.',
      points: 10
    },
    {
      type: 'fill-in-blank',
      question: 'Trong cơ chế micelle, đuôi hydrocarbon của chất hoạt động bề mặt có tính ______.',
      correctAnswer: 'kị nước',
      explanation: 'Đuôi không phân cực kị nước bám vào dầu mỡ.',
      points: 10
    },
    {
      type: 'multiple-choice',
      question: 'Biện pháp thân thiện hơn với môi trường khi chọn bột giặt:',
      options: ['Chọn nhiều phosphate', 'Chọn ít bọt, dễ phân huỷ sinh học', 'Chọn mùi càng mạnh càng tốt', 'Dùng quá liều khuyến cáo'],
      correctAnswer: 1,
      explanation: 'Công thức dễ phân huỷ, dùng đúng liều giúp giảm tải ô nhiễm.',
      points: 10
    }
  ]
};
