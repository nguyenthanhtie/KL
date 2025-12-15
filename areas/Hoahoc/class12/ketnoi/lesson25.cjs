module.exports = {
  classId: 12,
  curriculumType: 'ketnoi',
  chapterId: 7,
  chapterName: 'Chương 7: Kim loại nhóm IA và IIA',
  lessonId: 25,
  title: 'Bài 25: Kim loại nhóm IIA',
  description: 'Tính chất, phản ứng đặc trưng, hợp chất của kim loại kiềm thổ.',
  level: 'Intermediate',
  order: 25,
  theory: `
    <h2>Kim loại nhóm IIA</h2>
    <p style="margin:8px 0; color:#334155;">Phân tích tính khử, phản ứng với nước/axit, hợp chất và ứng dụng thực tế của kim loại kiềm thổ.</p>

    <div style="display:grid; gap:12px; grid-template-columns:repeat(auto-fit,minmax(260px,1fr)); margin:12px 0;">
      <div style="padding:12px; border:1px solid #e2e8f0; border-radius:10px; background:#f8fafc;">
        <h4 style="margin:0 0 6px; color:#0f172a;">Tính chất & phản ứng</h4>
        <ul style="margin:0; padding-left:18px; color:#475569;">
          <li>2e hoá trị (ns2) → tính khử mạnh, nhưng kém IA.</li>
          <li>Phản ứng với nước tăng Mg (nóng) < Ca < Sr < Ba.</li>
          <li>Dễ bị oxi hoá tạo oxit/hidroxit; Ca, Ba cần bảo quản dầu.</li>
        </ul>
      </div>
      <div style="padding:12px; border:1px solid #cbd5e1; border-radius:10px; background:#fff7ed; color:#92400e;">
        <h4 style="margin:0 0 6px;">Hợp chất quan trọng</h4>
        <ul style="margin:0; padding-left:18px;">
          <li>Oxit, hiđroxit bazơ mạnh: Ca(OH)2, Ba(OH)2 tan; Mg(OH)2 ít tan.</li>
          <li>Muối cacbonat/nhiệt phân: MCO3 → MO + CO2 (nhiệt).</li>
          <li>Muối sunfat: CaSO4 ít tan, BaSO4 hầu như không tan (cản quang).</li>
        </ul>
      </div>
      <div style="padding:12px; border:1px dashed #cbd5e1; border-radius:10px; background:#f8fafc; color:#475569;">
        <h4 style="margin:0 0 6px;">Ứng dụng & nhận biết</h4>
        <ul style="margin:0; padding-left:18px;">
          <li>CaCO3 (đá vôi, xi măng), CaSO4·2H2O (thạch cao), CaO (vôi sống).</li>
          <li>Mg hợp kim nhẹ, pháo sáng (ánh sáng trắng), thuốc kháng axit Mg(OH)2.</li>
          <li>BaSO4 cản quang; màu ngọn lửa: Ca đỏ gạch, Sr đỏ, Ba xanh lục.</li>
        </ul>
      </div>
    </div>

    <div style="display:grid; gap:12px; grid-template-columns:repeat(auto-fit,minmax(260px,1fr)); margin:12px 0;">
      <div style="padding:12px; border-radius:12px; border:1px solid #cbd5e1; background:linear-gradient(135deg,#f0f9ff,#f8fafc); color:#0f172a;">
        <h4 style="margin:0 0 6px;">So sánh nhanh</h4>
        <ul style="margin:0; padding-left:18px; color:#334155;">
          <li>Hoạt động: Mg < Ca < Sr < Ba (tăng dần); màu ngọn lửa đỏ gạch → xanh lục.</li>
          <li>Độ tan: MOH tăng dần; MCO3 kém bền nhiệt từ MgCO3 → BaCO3.</li>
          <li>Phản ứng với nước: Mg (nóng, chậm), Ca/Sr/Ba mạnh hơn.</li>
        </ul>
      </div>
      <div style="padding:12px; border:1px dashed #cbd5e1; border-radius:10px; background:#fffaf0; color:#92400e;">
        <h4 style="margin:0 0 6px;">Case & ứng dụng</h4>
        <ul style="margin:0; padding-left:18px;">
          <li>Nước cứng tạm thời (HCO3-): đun sôi kết tủa CaCO3; lâu bền (SO4/Cl) cần Na2CO3 hay trao đổi ion.</li>
          <li>Xi măng: Ca3SiO5, Ca2SiO4 thuỷ hoá tạo gel C-S-H bền.</li>
          <li>BaSO4 chụp X-quang: không tan nên an toàn; Ba2+ tự do lại độc → bẫy đề.</li>
        </ul>
      </div>
      <div style="padding:12px; border:1px solid #e2e8f0; border-radius:10px; background:#f8fafc; color:#475569;">
        <h4 style="margin:0 0 6px;">Ôn bài tập</h4>
        <ul style="margin:0; padding-left:18px;">
          <li>Viết PTHH: nhiệt phân MCO3, phản ứng với nước/axit, nhận biết Ca2+, Ba2+ bằng SO4 2-.</li>
          <li>Tính khối lượng vôi sống/vôi tôi cần cho xử lí nước; cân bằng CaO + CO2 + H2O → CaCO3.</li>
          <li>Bài nhận biết: màu ngọn lửa, kết tủa trắng (BaSO4 bền, CaCO3 tan trong axit loãng). </li>
        </ul>
      </div>
    </div>
  `,
  game: [
    {
      type: 'multiple-choice',
      question: 'Tính khử tăng theo dãy:',
      options: ['Mg < Ca < Sr < Ba', 'Ba < Sr < Ca < Mg', 'Ca < Ba < Sr < Mg', 'Mg < Sr < Ba < Ca'],
      correctAnswer: 0,
      explanation: 'Bán kính tăng từ Mg → Ba, e nhường dễ hơn.',
      points: 10
    },
    {
      type: 'true-false',
      question: 'Mg phản ứng với nước lạnh nhanh như Ca.',
      correctAnswer: false,
      explanation: 'Mg gần như không phản ứng với nước lạnh, phản ứng chậm khi đun nóng.',
      points: 10
    },
    {
      type: 'multiple-choice',
      question: 'Muối nào ít tan và dùng làm thạch cao Paris?',
      options: ['CaSO4·2H2O', 'BaSO4', 'MgSO4', 'CaCO3'],
      correctAnswer: 0,
      explanation: 'Thạch cao nung nhẹ CaSO4·2H2O → CaSO4·0.5H2O dùng đúc khuôn.',
      points: 10
    },
    {
      type: 'multiple-choice',
      question: 'Nhiệt phân CaCO3 cho sản phẩm:',
      options: ['Ca + CO2', 'CaO + CO2', 'Ca(OH)2 + CO2', 'CaO + CO'],
      correctAnswer: 1,
      explanation: 'CaCO3 → CaO + CO2 ở nhiệt độ cao.',
      points: 10
    },
    {
      type: 'true-false',
      question: 'BaSO4 gần như không tan và an toàn cho chụp X-quang tiêu hoá.',
      correctAnswer: true,
      explanation: 'BaSO4 không tan nên không hấp thu vào máu.',
      points: 10
    },
    {
      type: 'multiple-choice',
      question: 'Dung dịch nào làm mềm nước cứng tạm thời?',
      options: ['Sôi nước', 'Thêm Ca(OH)2 dư', 'Thêm Na2CO3', 'Cả 3 cách'],
      correctAnswer: 3,
      explanation: 'Đun sôi kết tủa CaCO3; kiềm hoá hoặc trao đổi ion cũng loại Ca2+.',
      points: 10
    },
    {
      type: 'fill-in-blank',
      question: 'Phản ứng tạo sữa vôi: CaO + H2O → ______.',
      correctAnswer: 'Ca(OH)2',
      explanation: 'Ca(OH)2 tạo dung dịch sữa vôi.',
      points: 10
    },
    {
      type: 'multiple-choice',
      question: 'Màu ngọn lửa của Ba2+ là:',
      options: ['Đỏ', 'Tím', 'Vàng', 'Xanh lục'],
      correctAnswer: 3,
      explanation: 'Ba2+ cho màu xanh lục nhạt.',
      points: 10
    },
    {
      type: 'multiple-choice',
      question: 'Kim loại kiềm thổ được điều chế bằng:',
      options: ['Điện phân dung dịch clorua', 'Điện phân nóng chảy muối halogenua', 'Nhiệt luyện với CO', 'Thuỷ luyện'],
      correctAnswer: 1,
      explanation: 'Tính khử mạnh, cần điện phân nóng chảy MgCl2, CaCl2.',
      points: 10
    },
    {
      type: 'true-false',
      question: 'Mg(OH)2 ít tan nên có thể làm thuốc kháng axit.',
      correctAnswer: true,
      explanation: 'Ít tan, trung hoà axit dạ dày nhẹ.',
      points: 10
    }
  ]
};
