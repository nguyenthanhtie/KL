module.exports = {
  classId: 12,
  curriculumType: 'ketnoi',
  chapterId: 6,
  chapterName: 'Chương 6: Đại cương về kim loại',
  lessonId: 20,
  title: 'Bài 20: Sự phân bố và điều chế kim loại',
  description: 'Quặng, tinh chế, các phương pháp nhiệt luyện, thuỷ luyện, điện phân.',
  level: 'Intermediate',
  order: 20,
  theory: `
    <h2>Sự phân bố và điều chế kim loại</h2>
    <p style="margin:8px 0; color:#334155;">Từ quặng đến kim loại: làm giàu, chọn phương pháp khử phù hợp với mức độ hoạt động kim loại.</p>

    <div style="display:grid; gap:12px; grid-template-columns:repeat(auto-fit,minmax(260px,1fr)); margin:12px 0;">
      <div style="padding:12px; border:1px solid #e2e8f0; border-radius:10px; background:#f8fafc;">
        <h4 style="margin:0 0 6px; color:#0f172a;">Quặng & làm giàu</h4>
        <ul style="margin:0; padding-left:18px; color:#475569;">
          <li>Oxit (hematit Fe2O3, bauxit Al2O3), sunfua (ZnS), cacbonat (CaCO3), silicat.</li>
          <li>Làm giàu: tuyển nổi, tuyển từ, rửa, tuyển trọng lực.</li>
        </ul>
      </div>
      <div style="padding:12px; border:1px solid #fde68a; border-radius:10px; background:#fffbeb; color:#92400e;">
        <h4 style="margin:0 0 6px;">Phương pháp điều chế</h4>
        <ul style="margin:0; padding-left:18px;">
          <li>Kim loại hoạt động mạnh (K, Na, Ca, Al): điện phân nóng chảy muối/oxit (NaCl, Al2O3/cryolit).</li>
          <li>Trung bình (Zn, Fe, Sn): nhiệt luyện với C/CO/H2; khử oxit trong lò cao (Fe).</li>
          <li>Yếu (Cu, Ag, Au): thuỷ luyện, khử hoá học nhẹ.</li>
        </ul>
      </div>
      <div style="padding:12px; border:1px dashed #cbd5e1; border-radius:10px; background:#f8fafc; color:#475569;">
        <h4 style="margin:0 0 6px;">Ví dụ công nghệ</h4>
        <ul style="margin:0; padding-left:18px;">
          <li>Lò cao: quặng Fe2O3 + C/CO + đá vôi (khử, tạo xỉ CaSiO3).</li>
          <li>Điện phân Al: bauxit → Al2O3 → hòa tan cryolit, điện phân Hall–Héroult.</li>
          <li>Điện phân dung dịch: Cu tinh luyện điện phân; sản phẩm phụ Ag, Au ở bùn anot.</li>
        </ul>
      </div>
    </div>

    <div style="display:grid; gap:12px; grid-template-columns:repeat(auto-fit,minmax(260px,1fr)); margin:12px 0;">
      <div style="padding:12px; border-radius:12px; border:1px solid #cbd5e1; background:linear-gradient(135deg,#fef9c3,#fff); color:#0f172a;">
        <h4 style="margin:0 0 6px;">Nhận diện nhanh</h4>
        <ul style="margin:0; padding-left:18px; color:#334155;">
          <li>N2: trơ, không duy trì sự cháy; lỏng hoá làm lạnh sâu.</li>
          <li>NH3: mùi khai, làm xanh quỳ ẩm, tan mạnh trong nước.</li>
          <li>NO: không màu, hoá nâu ngoài không khí (thành NO2); N2O: khí cười, không hỗ trợ cháy mạnh bằng O2.</li>
        </ul>
      </div>
      <div style="padding:12px; border:1px dashed #cbd5e1; border-radius:10px; background:#ecfeff; color:#0ea5e9;">
        <h4 style="margin:0 0 6px;">Case & ứng dụng</h4>
        <ul style="margin:0; padding-left:18px;">
          <li>Quy trình Haber: tăng p, xt Fe–K–Al; cân bằng thuận nghịch bị ức chế bởi H2O, CO.</li>
          <li>Kiểm soát ô nhiễm NOx: dùng bộ lọc 3 chức năng (khử NOx, oxi hoá CO, HC).</li>
          <li>N2 lỏng vận chuyển mẫu sinh học; NH3 làm phân bón và chất hấp thụ CO2 trong một số quy trình lạnh.</li>
        </ul>
      </div>
      <div style="padding:12px; border:1px solid #e2e8f0; border-radius:10px; background:#f8fafc; color:#475569;">
        <h4 style="margin:0 0 6px;">Ôn bài tập</h4>
        <ul style="margin:0; padding-left:18px;">
          <li>Tính hiệu suất Haber khi thay đổi áp suất/nhiệt độ theo nguyên lí Lê Chatelier.</li>
          <li>Lập PTHH minh hoạ: chuyển NO ↔ NO2 ↔ HNO3 trong quy trình Ostwald.</li>
          <li>So sánh tính oxi hoá/khử của N2O, NO, NO2 trong phản ứng với KI/H2S.</li>
        </ul>
      </div>
    </div>
  `,
  game: [
    {
      type: 'multiple-choice',
      question: 'Kim loại nào bắt buộc điện phân nóng chảy để điều chế?',
      options: ['Fe', 'Zn', 'Al', 'Cu'],
      correctAnswer: 2,
      explanation: 'Al hoạt động mạnh, không khử bằng C/CO được.',
      points: 10
    },
    {
      type: 'multiple-choice',
      question: 'Trong lò cao, chất tạo xỉ là:',
      options: ['Coke', 'Không khí nóng', 'Đá vôi CaCO3', 'Fe2O3'],
      correctAnswer: 2,
      explanation: 'CaCO3 phân huỷ → CaO, kết hợp SiO2 tạo xỉ CaSiO3.',
      points: 10
    },
    {
      type: 'true-false',
      question: 'ZnS thường được chuyển thành ZnO trước khi khử bằng C.',
      correctAnswer: true,
      explanation: 'Nung quặng sunfua thành oxit để khử dễ hơn.',
      points: 10
    },
    {
      type: 'multiple-choice',
      question: 'Điện phân dung dịch CuSO4 với anot Cu thu được:',
      options: ['Cu tan dần ở anot, bám catot', 'Cu bám cả hai', 'Cu tan catot', 'Không đổi'],
      correctAnswer: 0,
      explanation: 'Anot tan cung Cu2+, catot thu Cu tinh khiết.',
      points: 10
    },
    {
      type: 'multiple-choice',
      question: 'Quặng chính của nhôm là:',
      options: ['Criolit', 'Bauxit', 'Manhetit', 'Pirit'],
      correctAnswer: 1,
      explanation: 'Bauxit chứa Al2O3·nH2O.',
      points: 10
    },
    {
      type: 'true-false',
      question: 'Kim loại quý như Au, Ag thường điều chế bằng thuỷ luyện.',
      correctAnswer: true,
      explanation: 'Dùng dung dịch cyanide/thuỷ ngân chiết hoặc điện phân.',
      points: 10
    },
    {
      type: 'multiple-choice',
      question: 'Trong quy trình Hall–Héroult, cryolit (Na3AlF6) có vai trò:',
      options: ['Chất khử', 'Hạ điểm nóng chảy Al2O3 và dẫn điện', 'Tăng điểm nóng chảy', 'Chất oxi hoá'],
      correctAnswer: 1,
      explanation: 'Cryolit hạ nhiệt độ nóng chảy và tăng dẫn điện của hỗn hợp.',
      points: 10
    },
    {
      type: 'fill-in-blank',
      question: 'C/CO khử Fe2O3 trong lò cao tạo Fe và khí ______.',
      correctAnswer: 'CO2',
      explanation: 'Fe2O3 + 3CO → 2Fe + 3CO2.',
      points: 10
    },
    {
      type: 'multiple-choice',
      question: 'Phương pháp nào phù hợp điều chế Na?',
      options: ['Nhiệt luyện Na2CO3', 'Điện phân NaCl nóng chảy', 'Điện phân NaCl dung dịch', 'Khử NaOH bằng H2'],
      correctAnswer: 1,
      explanation: 'Na phải điện phân nóng chảy vì quá hoạt động.',
      points: 10
    },
    {
      type: 'true-false',
      question: 'Bùn anot trong tinh luyện Cu thường chứa kim loại quý.',
      correctAnswer: true,
      explanation: 'Ag, Au, Pt không tan, lắng lại bùn anot.',
      points: 10
    }
  ]
};
