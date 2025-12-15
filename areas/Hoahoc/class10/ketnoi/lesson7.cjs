module.exports = {
  classId: 10,
  curriculumType: 'ketnoi',
  chapterId: 2,
  chapterName: 'Chương 2: Bảng tuần hoàn các nguyên tố hóa học và định luật tuần hoàn',
  lessonId: 7,
  title: 'Bài 7: Xu hướng biến đổi thành phần và một số tính chất của hợp chất trong một chu kì',
  description: 'So sánh oxit/hiđroxit, độ axit-bazơ và tính kim loại/phi kim theo chu kì.',
  level: 'Intermediate',
  order: 3,
  theory: `
    <h2>Xu hướng theo chu kì</h2>
    <p style="margin:10px 0; color:#334155;">Mục tiêu: nắm xu hướng Z hiệu dụng, bán kính, IE, độ âm điện, chuyển hoá tính kim loại/phi kim và sự biến đổi oxit/hiđroxit trong một chu kì.</p>

    <div style="display:grid; gap:12px; grid-template-columns:repeat(auto-fit,minmax(240px,1fr)); margin:12px 0;">
      <div style="padding:12px; border:1px solid #e2e8f0; border-radius:10px; background:#f8fafc;">
        <h4 style="margin:0 0 6px; color:#0f172a;">Kích thước & năng lượng</h4>
        <ul style="margin:0; padding-left:18px; color:#475569;">
          <li>Bán kính giảm từ trái → phải do Z hiệu dụng tăng (lực hút hạt nhân lên e ngoài mạnh hơn).</li>
          <li>Năng lượng ion hoá (IE1) tăng, độ âm điện tăng; có ngoại lệ nhỏ ở nhóm III (B, Al) và VI (O, S) do cấu hình e bán bão hòa/bão hòa.</li>
          <li>Ái lực e tăng dần với phi kim (đặc biệt nhóm VIA, VIIA) trừ một số lệch nhỏ ở O, F.</li>
        </ul>
      </div>
      <div style="padding:12px; border:1px solid #e2e8f0; border-radius:10px; background:#fff7ed;">
        <h4 style="margin:0 0 6px; color:#9a3412;">Tính kim loại/phi kim</h4>
        <p style="margin:0; color:#7c2d12;">Kim loại → á kim → phi kim; oxit/hiđroxit chuyển dần từ bazơ (Na2O, MgO) → lưỡng tính (Al2O3) → axit (SiO2, P2O5, SO3, Cl2O7).</p>
        <p style="margin:6px 0 0; color:#7c2d12;">Tính oxi hóa tăng dần (mạnh nhất ở halogen), tính khử giảm dần trong chu kì.</p>
      </div>
      <div style="padding:12px; border:1px solid #e2e8f0; border-radius:10px; background:#ecfeff;">
        <h4 style="margin:0 0 6px; color:#0e7490;">Số oxi hóa cao nhất</h4>
        <p style="margin:0; color:#0f172a;">Tăng dần bằng số e hoá trị (chu kì ngắn: +1 → +7). Với phi kim, số oxi hóa âm thường -1 (VIIA), -2 (VIA).</p>
      </div>
    </div>

    <div style="display:grid; gap:12px; grid-template-columns:repeat(auto-fit,minmax(260px,1fr)); margin:12px 0;">
      <div style="padding:12px; border-radius:12px; border:1px solid #cbd5e1; background:linear-gradient(135deg,#eef2ff,#f8fafc);">
        <h4 style="margin:0 0 6px; color:#312e81;">Biến đổi hợp chất</h4>
        <ul style="margin:0; padding-left:18px; color:#334155;">
          <li>Oxit: bazơ mạnh (Na2O) → bazơ yếu (MgO) → lưỡng tính (Al2O3) → axit yếu (SiO2) → axit mạnh (P2O5, SO3, Cl2O7).</li>
          <li>Hiđroxit: bazơ mạnh (NaOH) → bazơ yếu (Mg(OH)2) → lưỡng tính (Al(OH)3) → axit (H2SiO3, H3PO4, H2SO4, HClO4).</li>
        </ul>
      </div>
      <div style="padding:12px; border:1px dashed #cbd5e1; border-radius:10px; background:#f8fafc; color:#475569;">
        <h4 style="margin:0 0 6px;">Tránh nhầm lẫn</h4>
        <ul style="margin:0; padding-left:18px;">
          <li>Nhóm III, VI có ngoại lệ IE1 nhỏ (B so với Be; O so với N).</li>
          <li>SiO2 là oxit axit yếu nhưng rất bền, không tan kiềm loãng thường.</li>
          <li>Cl2O7 là oxit axit mạnh nhất của Cl trong chu kì 3.</li>
        </ul>
      </div>
    </div>
  `,
  game: [
    {
      type: 'multiple-choice',
      question: 'Trong một chu kì, tính axit của oxit biến đổi thế nào?',
      options: ['Tăng dần', 'Giảm dần', 'Không đổi', 'Biến thiên bất thường'],
      correctAnswer: 0,
      explanation: 'Từ kim loại → phi kim, oxit chuyển bazơ → axit.',
      points: 10
    },
    {
      type: 'multiple-choice',
      question: 'Bán kính nguyên tử trong chu kì thay đổi ra sao?',
      options: ['Tăng dần', 'Giảm dần', 'Không đổi', 'Tăng rồi giảm'],
      correctAnswer: 1,
      explanation: 'Hiệu ứng hạt nhân tăng, kéo electron mạnh hơn.',
      points: 10
    },
    {
      type: 'true-false',
      question: 'Độ âm điện giảm từ trái sang phải trong một chu kì.',
      correctAnswer: false,
      explanation: 'Độ âm điện tăng dần từ trái sang phải.',
      points: 10
    },
    {
      type: 'multiple-choice',
      question: 'Số oxi hoá cao nhất của nguyên tố nhóm VA (chu kì ngắn) là:',
      options: ['+3', '+4', '+5', '+7'],
      correctAnswer: 2,
      explanation: 'Nhóm VA có 5 e hoá trị → Số oxi hoá cao nhất +5.',
      points: 10
    },
    {
      type: 'multiple-choice',
      question: 'Trong chu kỳ 3, oxit nào có tính bazơ mạnh nhất?',
      options: ['Na2O', 'MgO', 'Al2O3', 'SiO2'],
      correctAnswer: 0,
      explanation: 'Đi từ trái sang phải bazơ giảm; Na2O bazơ mạnh nhất.',
      points: 10
    },
    {
      type: 'multiple-choice',
      question: 'Trong chu kỳ, năng lượng ion hóa thứ nhất biến đổi:',
      options: ['Giảm dần', 'Tăng dần (có ngoại lệ nhỏ)', 'Không đổi', 'Giảm rồi tăng'],
      correctAnswer: 1,
      explanation: 'Z hiệu dụng tăng → IE1 tăng, có ngoại lệ nhóm III, VI.',
      points: 10
    },
    {
      type: 'true-false',
      question: 'Tính kim loại giảm dần từ trái qua phải trong cùng chu kỳ.',
      correctAnswer: true,
      explanation: 'Z hiệu dụng tăng → khó nhường e hơn → kim loại yếu dần.',
      points: 10
    },
    {
      type: 'multiple-choice',
      question: 'Oxit lưỡng tính điển hình trong chu kỳ 3 là:',
      options: ['Na2O', 'MgO', 'Al2O3', 'P2O5'],
      correctAnswer: 2,
      explanation: 'Al2O3 thể hiện tính lưỡng tính.',
      points: 10
    },
    {
      type: 'multiple-choice',
      question: 'Cặp hiđroxit có tính chất tăng dần axit trong chu kỳ 3:',
      options: ['Mg(OH)2 → NaOH', 'Al(OH)3 → Mg(OH)2', 'Al(OH)3 → Si(OH)4 → H3PO4', 'NaOH → Mg(OH)2 → Al(OH)3'],
      correctAnswer: 2,
      explanation: 'Bazơ mạnh → lưỡng tính → axit (giả định Si(OH)4).',
      points: 10
    },
    {
      type: 'multiple-choice',
      question: 'Nguyên tử nào trong chu kỳ 2 có bán kính nhỏ nhất?',
      options: ['Li', 'C', 'F', 'Ne'],
      correctAnswer: 3,
      explanation: 'Từ Li → Ne bán kính giảm; khí hiếm Ne nhỏ nhất trong chu kỳ.',
      points: 10
    }
  ]
};
