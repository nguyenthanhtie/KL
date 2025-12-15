module.exports = {
  classId: 10,
  curriculumType: 'ketnoi',
  chapterId: 2,
  chapterName: 'Chương 2: Bảng tuần hoàn các nguyên tố hóa học và định luật tuần hoàn',
  lessonId: 6,
  title: 'Bài 6: Xu hướng biến đổi một số tính chất của nguyên tố trong nhóm',
  description: 'Diễn biến bán kính, độ âm điện, tính kim loại/phi kim theo chiều nhóm.',
  level: 'Beginner',
  order: 2,
  theory: `
    <h2>Xu hướng tính chất trong một nhóm</h2>
    <div style="display:grid; gap:12px; grid-template-columns:repeat(auto-fit,minmax(240px,1fr)); margin:12px 0;">
      <div style="padding:12px; border:1px solid #e2e8f0; border-radius:10px; background:#f8fafc;">
        <h4 style="margin:0 0 6px; color:#0f172a;">Kích thước & năng lượng</h4>
        <ul style="margin:0; padding-left:18px; color:#475569;">
          <li>Bán kính tăng xuống nhóm do thêm lớp e (lực hút hạt nhân hiệu dụng giảm).</li>
          <li>Năng lượng ion hoá giảm → càng xuống dưới càng dễ mất e.</li>
          <li>Ái lực electron thường giảm (trừ một vài ngoại lệ halogen nặng).</li>
        </ul>
      </div>
      <div style="padding:12px; border:1px solid #e2e8f0; border-radius:10px; background:#fff7ed;">
        <h4 style="margin:0 0 6px; color:#9a3412;">Độ âm điện & tính chất</h4>
        <ul style="margin:0; padding-left:18px; color:#7c2d12;">
          <li>Độ âm điện giảm dần → tính phi kim giảm, tính kim loại tăng.</li>
          <li>SOX cao nhất của phi kim nhóm (VIIA, VIA) không đổi nhưng tính oxi hóa giảm.</li>
        </ul>
      </div>
      <div style="padding:12px; border:1px solid #e2e8f0; border-radius:10px; background:#ecfeff;">
        <h4 style="margin:0 0 6px; color:#0e7490;">Cấu hình lớp ngoài</h4>
        <p style="margin:0; color:#0f172a;">Giữ nguyên dạng ns^a np^b → tính chất hóa học trong nhóm tương tự; thay đổi chủ yếu do bán kính và Z hiệu dụng.</p>
      </div>
    </div>

    <div style="margin:12px 0; display:grid; gap:12px; grid-template-columns:repeat(auto-fit,minmax(240px,1fr));">
      <div style="padding:12px; border:1px solid #e2e8f0; border-radius:10px; background:#eef2ff;">
        <h4 style="margin:0 0 6px; color:#312e81;">Oxit/hiđroxit trong nhóm</h4>
        <ul style="margin:0; padding-left:18px; color:#1e3a8a;">
          <li>Kim loại: oxit/hiđroxit bazơ mạnh dần xuống dưới (Li2O &lt; Cs2O).</li>
          <li>Phi kim: oxit axit giảm dần, tính khử tăng (Cl2O7 &gt; Br2O5 &gt; I2O5).</li>
        </ul>
      </div>
      <div style="padding:12px; border:1px solid #e2e8f0; border-radius:10px; background:#f0f9ff;">
        <h4 style="margin:0 0 6px; color:#0f172a;">Ví dụ nhanh</h4>
        <ul style="margin:0; padding-left:18px; color:#334155;">
          <li>Nhóm IA: Li &lt; Na &lt; K &lt; Rb &lt; Cs (kim loại mạnh dần, phản ứng với H2O dữ dội hơn).</li>
          <li>Nhóm VIIA: F2 oxi hóa mạnh nhất; I2 yếu hơn, dễ bị khử.</li>
        </ul>
      </div>
      <div style="padding:12px; border:1px solid #e2e8f0; border-radius:10px; background:#fff7ed;">
        <h4 style="margin:0 0 6px; color:#9a3412;">Lỗi thường gặp</h4>
        <ul style="margin:0; padding-left:18px; color:#7c2d12;">
          <li>Nhầm “kim loại tăng xuống nhóm” với “phi kim tăng”.</li>
          <li>Bỏ qua ngoại lệ nhẹ của ái lực e/IE1 (O, F có giá trị lệch nhỏ).</li>
        </ul>
      </div>
    </div>
  `,
  game: [
    {
      type: 'multiple-choice',
      question: 'Trong một nhóm A, tính kim loại biến đổi thế nào khi đi từ trên xuống?',
      options: ['Giảm', 'Tăng', 'Không đổi', 'Biến thiên không quy luật'],
      correctAnswer: 1,
      explanation: 'Thêm lớp e làm electron dễ tách → tính kim loại tăng.',
      points: 10
    },
    {
      type: 'multiple-choice',
      question: 'Bán kính nguyên tử thay đổi ra sao trong nhóm?',
      options: ['Giảm dần', 'Tăng dần', 'Không đổi', 'Tăng rồi giảm'],
      correctAnswer: 1,
      explanation: 'Mỗi chu kỳ thêm một lớp e → bán kính tăng.',
      points: 10
    },
    {
      type: 'true-false',
      question: 'Độ âm điện tăng dần từ trên xuống trong cùng nhóm.',
      correctAnswer: false,
      explanation: 'Độ âm điện giảm dần theo chiều từ trên xuống.',
      points: 10
    },
    {
      type: 'multiple-choice',
      question: 'Năng lượng ion hoá thứ nhất trong nhóm thường:',
      options: ['Tăng dần', 'Giảm dần', 'Không đổi', 'Lúc tăng lúc giảm'],
      correctAnswer: 1,
      explanation: 'Lớp e xa hạt nhân hơn, lực hút giảm → IE1 giảm.',
      points: 10
    },
    {
      type: 'multiple-choice',
      question: 'Nguyên tố nào trong nhóm IA có tính kim loại mạnh nhất?',
      options: ['Li', 'Na', 'K', 'Cs'],
      correctAnswer: 3,
      explanation: 'Xuống nhóm kim loại mạnh dần; Cs mạnh nhất.',
      points: 10
    },
    {
      type: 'multiple-choice',
      question: 'Trong nhóm VIIA, độ âm điện giảm nhanh nhất ở bước chuyển nào?',
      options: ['F → Cl', 'Cl → Br', 'Br → I', 'I → At'],
      correctAnswer: 0,
      explanation: 'F rất âm điện; xuống Cl giảm rõ rệt nhất.',
      points: 10
    },
    {
      type: 'true-false',
      question: 'Cùng nhóm, oxit kim loại xuống dưới thường bazơ mạnh hơn.',
      correctAnswer: true,
      explanation: 'Tính kim loại tăng → oxit bazơ mạnh hơn.',
      points: 10
    },
    {
      type: 'multiple-choice',
      question: 'Nguyên tử nhóm IIA nào dễ bị oxi hóa nhất?',
      options: ['Mg', 'Ca', 'Ba', 'Be'],
      correctAnswer: 2,
      explanation: 'Ba ở cuối nhóm, mất e dễ nhất → bị oxi hóa mạnh nhất.',
      points: 10
    },
    {
      type: 'multiple-choice',
      question: 'Trong nhóm, tính phi kim thay đổi thế nào?',
      options: ['Tăng dần', 'Giảm dần', 'Không đổi', 'Tăng rồi giảm'],
      correctAnswer: 1,
      explanation: 'Tính phi kim giảm dần khi xuống nhóm.',
      points: 10
    },
    {
      type: 'true-false',
      question: 'Cùng nhóm, bán kính ion dương M+ nhỏ hơn bán kính nguyên tử M.',
      correctAnswer: true,
      explanation: 'Mất e làm giảm đẩy tĩnh điện, bán kính ion nhỏ hơn nguyên tử.',
      points: 10
    }
  ]
};
