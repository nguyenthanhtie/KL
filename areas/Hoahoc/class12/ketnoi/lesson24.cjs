module.exports = {
  classId: 12,
  curriculumType: 'ketnoi',
  chapterId: 7,
  chapterName: 'Chương 7: Kim loại nhóm IA và IIA',
  lessonId: 24,
  title: 'Bài 24: Kim loại nhóm IA',
  description: 'Tính chất, dãy hoạt động, hợp chất đặc trưng của kim loại kiềm.',
  level: 'Intermediate',
  order: 24,
  theory: `
    <h2>Kim loại nhóm IA</h2>
    <p style="margin:8px 0; color:#334155;">Nhận diện tính khử cực mạnh, phản ứng với nước/phi kim và hợp chất quan trọng của kim loại kiềm.</p>

    <div style="display:grid; gap:12px; grid-template-columns:repeat(auto-fit,minmax(260px,1fr)); margin:12px 0;">
      <div style="padding:12px; border:1px solid #e2e8f0; border-radius:10px; background:#f8fafc;">
        <h4 style="margin:0 0 6px; color:#0f172a;">Tính chất & phản ứng</h4>
        <ul style="margin:0; padding-left:18px; color:#475569;">
          <li>1e hoá trị (ns1) → tính khử mạnh; hoạt động tăng Li → Cs.</li>
          <li>Phản ứng mãnh liệt với nước: 2M + 2H2O → 2MOH + H2↑.</li>
          <li>Dễ bị oxi hoá trong không khí → bảo quản trong dầu hoả.</li>
        </ul>
      </div>
      <div style="padding:12px; border:1px solid #cbd5e1; border-radius:10px; background:#fff7ed; color:#92400e;">
        <h4 style="margin:0 0 6px;">Hợp chất đặc trưng</h4>
        <ul style="margin:0; padding-left:18px;">
          <li>Oxit, peoxit (Na2O2), superoxit (KO2) có tính oxi hoá/khử mạnh.</li>
          <li>Hiđroxit (kiềm mạnh), muối halogenua tan, muối cacbonat bền nhiệt.</li>
          <li>NaHCO3 (thuốc muối), Na2CO3 (soda), NaCl (muối ăn), KNO3 (phân bón).</li>
        </ul>
      </div>
      <div style="padding:12px; border:1px dashed #cbd5e1; border-radius:10px; background:#f8fafc; color:#475569;">
        <h4 style="margin:0 0 6px;">Ứng dụng & nhận biết</h4>
        <ul style="margin:0; padding-left:18px;">
          <li>Pin kiềm, trao đổi ion làm mềm nước, tổng hợp hữu cơ.</li>
          <li>Màu ngọn lửa: Li đỏ, Na vàng, K tím, Rb đỏ tím, Cs xanh lam.</li>
          <li>Bảo quản và vận chuyển cần tránh ẩm, tránh tiếp xúc trực tiếp.</li>
        </ul>
      </div>
    </div>

    <div style="display:grid; gap:12px; grid-template-columns:repeat(auto-fit,minmax(260px,1fr)); margin:12px 0;">
      <div style="padding:12px; border-radius:12px; border:1px solid #cbd5e1; background:linear-gradient(135deg,#fef9c3,#fff); color:#0f172a;">
        <h4 style="margin:0 0 6px;">So sánh nhanh</h4>
        <ul style="margin:0; padding-left:18px; color:#334155;">
          <li>Hoạt động: Li < Na < K < Rb < Cs (mạnh dần, nóng chảy giảm dần).</li>
          <li>Sản phẩm với O2: Li2O, Na2O2, KO2 (bẫy đề phổ biến).</li>
          <li>Kiềm: LiOH yếu nhất, CsOH mạnh nhất; đều tan và ăn mòn.</li>
        </ul>
      </div>
      <div style="padding:12px; border:1px dashed #cbd5e1; border-radius:10px; background:#ecfeff; color:#0ea5e9;">
        <h4 style="margin:0 0 6px;">Case & ứng dụng</h4>
        <ul style="margin:0; padding-left:18px;">
          <li>KO2 trong mặt nạ cứu hoả: hấp thụ CO2, nhả O2 (2KO2 + CO2 → K2CO3 + O2).</li>
          <li>NaHCO3 chữa đau dạ dày, Na2CO3 công nghiệp thủy tinh, xà phòng.</li>
          <li>Pin Na/K lỏng dùng trong trao đổi nhiệt; Li dùng trong pin Li-ion.</li>
        </ul>
      </div>
      <div style="padding:12px; border:1px solid #e2e8f0; border-radius:10px; background:#f8fafc; color:#475569;">
        <h4 style="margin:0 0 6px;">Ôn bài tập</h4>
        <ul style="margin:0; padding-left:18px;">
          <li>Viết PTHH với nước/halogen/oxy; xác định sản phẩm chính theo kim loại.</li>
          <li>Bài nhận biết: dùng màu ngọn lửa, kết tủa carbonat/hidroxit.</li>
          <li>Tính khối lượng NaOH/KO2 sinh ra khi điện phân hoặc đốt; chú ý cân bằng điện tích và e.</li>
        </ul>
      </div>
    </div>
  `,
  game: [
    {
      type: 'multiple-choice',
      question: 'Phản ứng của Na với nước tạo:',
      options: ['Na2O + H2', 'NaOH + H2', 'Na2O2 + H2', 'NaCl + H2'],
      correctAnswer: 1,
      explanation: '2Na + 2H2O → 2NaOH + H2.',
      points: 10
    },
    {
      type: 'true-false',
      question: 'Khi đốt K trong không khí tạo chủ yếu KO2.',
      correctAnswer: true,
      explanation: 'K tạo superoxit KO2 với O2 dư.',
      points: 10
    },
    {
      type: 'multiple-choice',
      question: 'Tính khử tăng dần theo dãy:',
      options: ['Cs < K < Na < Li', 'Li < Na < K < Cs', 'Na < Li < K < Cs', 'Li < K < Na < Cs'],
      correctAnswer: 1,
      explanation: 'Bán kính tăng, e tách dễ hơn → Li < Na < K < Rb < Cs.',
      points: 10
    },
    {
      type: 'multiple-choice',
      question: 'Muối nào bị nhiệt phân tạo Na2CO3, H2O, CO2?',
      options: ['Na2CO3', 'NaHCO3', 'NaCl', 'NaNO3'],
      correctAnswer: 1,
      explanation: '2NaHCO3 → Na2CO3 + CO2 + H2O (nhiệt).',
      points: 10
    },
    {
      type: 'true-false',
      question: 'Na2O2 có thể dùng để tạo O2 khi cho tác dụng với nước.',
      correctAnswer: true,
      explanation: '2Na2O2 + 2H2O → 4NaOH + O2.',
      points: 10
    },
    {
      type: 'multiple-choice',
      question: 'Ngọn lửa vàng đặc trưng dùng nhận biết ion:',
      options: ['Li+', 'Na+', 'K+', 'Cs+'],
      correctAnswer: 1,
      explanation: 'Na+ cho màu vàng cam đặc trưng.',
      points: 10
    },
    {
      type: 'multiple-choice',
      question: 'Ứng dụng của NaHCO3 là:',
      options: ['Thuốc muối dạ dày', 'Pin nhiệt', 'Sơn chống gỉ', 'Thủy tinh quang học'],
      correctAnswer: 0,
      explanation: 'NaHCO3 trung hoà axit nhẹ, dùng làm thuốc muối.',
      points: 10
    },
    {
      type: 'fill-in-blank',
      question: 'Công thức superoxit của kali: ____.',
      correctAnswer: 'KO2',
      explanation: 'Superoxit chứa ion O2-.',
      points: 10
    },
    {
      type: 'multiple-choice',
      question: 'Kim loại kiềm được điều chế công nghiệp bằng:',
      options: ['Điện phân nóng chảy muối halogenua', 'Điện phân dung dịch muối', 'Thuỷ luyện từ quặng', 'Nhiệt luyện với CO'],
      correctAnswer: 0,
      explanation: 'Điện phân nóng chảy NaCl/KCl/LiCl vì tính khử quá mạnh.',
      points: 10
    },
    {
      type: 'true-false',
      question: 'KOH là bazơ mạnh, tan nhiều trong nước.',
      correctAnswer: true,
      explanation: 'Tất cả hiđroxit kim loại kiềm đều là kiềm mạnh, tan.',
      points: 10
    }
  ]
};
