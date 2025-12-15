module.exports = {
  classId: 12,
  curriculumType: 'ketnoi',
  chapterId: 8,
  chapterName: 'Chương 8: Kim loại chuyển tiếp và phức chất',
  lessonId: 28,
  title: 'Bài 28: Phức chất (giới thiệu)',
  description: 'Khái niệm, thành phần, số phối trí, danh pháp cơ bản của phức chất.',
  level: 'Intermediate',
  order: 28,
  theory: `
    <h2>Phức chất</h2>
    <p style="margin:8px 0; color:#334155;">Hiểu cấu trúc, phối tử, số phối trí và danh pháp cơ bản của phức chất đơn giản.</p>

    <div style="display:grid; gap:12px; grid-template-columns:repeat(auto-fit,minmax(260px,1fr)); margin:12px 0;">
      <div style="padding:12px; border:1px solid #e2e8f0; border-radius:10px; background:#f8fafc;">
        <h4 style="margin:0 0 6px; color:#0f172a;">Thành phần & số phối trí</h4>
        <ul style="margin:0; padding-left:18px; color:#475569;">
          <li>Kim loại trung tâm (thường chuyển tiếp) + phối tử (H2O, NH3, Cl-, CN-, en...).</li>
          <li>Số phối trí phổ biến: 4 (vuông phẳng/tứ diện), 6 (bát diện).</li>
          <li>Liên kết cho-nhận: phối tử cho cặp e, KL nhận tạo liên kết phối trí.</li>
        </ul>
      </div>
      <div style="padding:12px; border:1px solid #cbd5e1; border-radius:10px; background:#fff7ed; color:#92400e;">
        <h4 style="margin:0 0 6px;">Danh pháp cơ bản</h4>
        <ul style="margin:0; padding-left:18px;">
          <li>Đọc phối tử (alphabet) + tên kim loại (anion thêm -at) + số oxi hoá bằng số La Mã.</li>
          <li>Phối tử trung hoà: aquo (H2O), ammin (NH3), CO: carbonyl, en: ethylenediamin.</li>
          <li>Phối tử anion: Cl- chloro, CN- cyano, OH- hydroxo.</li>
        </ul>
      </div>
      <div style="padding:12px; border:1px dashed #cbd5e1; border-radius:10px; background:#f8fafc; color:#475569;">
        <h4 style="margin:0 0 6px;">Ví dụ & ứng dụng</h4>
        <ul style="margin:0; padding-left:18px;">
          <li>[Cu(NH3)4]2+ xanh đậm; [Fe(CN)6]4-/3- vàng/xanh thẫm.</li>
          <li>[CoCl2(en)2]+ bát diện méo; [Ag(NH3)2]+ hòa tan AgCl.</li>
          <li>Ứng dụng: mạ điện, phân tích trắc quang, vận chuyển O2 (hemoglobin là phức porphyrin-Fe).</li>
        </ul>
      </div>
    </div>

    <div style="display:grid; gap:12px; grid-template-columns:repeat(auto-fit,minmax(260px,1fr)); margin:12px 0;">
      <div style="padding:12px; border-radius:12px; border:1px solid #cbd5e1; background:linear-gradient(135deg,#eef2ff,#f8fafc); color:#0f172a;">
        <h4 style="margin:0 0 6px;">So sánh nhanh</h4>
        <ul style="margin:0; padding-left:18px; color:#334155;">
          <li>Số phối trí 4: tứ diện (Ni(CO)4) vs vuông phẳng (Pt/Pd, [Ni(CN)4]2-).</li>
          <li>Số phối trí 6: bát diện phổ biến ([Fe(CN)6]3-, [Co(NH3)6]3+).</li>
          <li>Danh pháp: phức anion thêm -at (ferrate, cuprate); trung hoà/cation giữ tên thường.</li>
        </ul>
      </div>
      <div style="padding:12px; border:1px dashed #cbd5e1; border-radius:10px; background:#fffaf0; color:#92400e;">
        <h4 style="margin:0 0 6px;">Case & ứng dụng</h4>
        <ul style="margin:0; padding-left:18px;">
          <li>Hòa tan kết tủa: AgCl tan trong NH3 (tạo [Ag(NH3)2]+); Cu(OH)2 tan trong NH3 đậm đặc.</li>
          <li>Phát hiện ion: [Fe(SCN)]2+ đỏ máu để nhận Fe3+; [Cu(NH3)4]2+ xanh đậm.</li>
          <li>Phối tử cứng/mềm: CN- mềm, tạo phức bền với Ag+, Au+; F- cứng, ưu tiên Al3+, Fe3+.</li>
        </ul>
      </div>
      <div style="padding:12px; border:1px solid #e2e8f0; border-radius:10px; background:#f8fafc; color:#475569;">
        <h4 style="margin:0 0 6px;">Ôn bài tập</h4>
        <ul style="margin:0; padding-left:18px;">
          <li>Viết tên/công thức phức cho trước số oxi hoá và phối tử; chú ý thứ tự alphabet.</li>
          <li>Tính số oxi hoá KL trung tâm từ điện tích phức và phối tử.</li>
          <li>Nhận dạng hình học từ số phối trí và phối tử (vd: d8 kim loại nặng thường vuông phẳng).</li>
        </ul>
      </div>
    </div>
  `,
  game: [
    {
      type: 'multiple-choice',
      question: 'Số phối trí phổ biến nhất của phức chất đơn giản là:',
      options: ['2 và 3', '4 và 6', '5 và 7', '6 và 8'],
      correctAnswer: 1,
      explanation: 'Phổ biến là 4 (vuông phẳng/tứ diện) và 6 (bát diện).',
      points: 10
    },
    {
      type: 'true-false',
      question: 'Liên kết trong phức chất là liên kết cho-nhận.',
      correctAnswer: true,
      explanation: 'Phối tử cho cặp e vào obitan trống của kim loại trung tâm.',
      points: 10
    },
    {
      type: 'multiple-choice',
      question: 'Tên phối tử NH3 trong danh pháp phức là:',
      options: ['Ammonia', 'Ammin', 'Aquo', 'Amid'],
      correctAnswer: 1,
      explanation: 'NH3 được gọi là ammin khi làm phối tử.',
      points: 10
    },
    {
      type: 'multiple-choice',
      question: 'Tên phức [Cu(NH3)4]SO4 là:',
      options: ['Tetraammoniacopper(II) sulfate', 'Copper tetraammine sulfate', 'Tetraamminecopper(II) sulfate', 'Copper(II) sulfate ammonia'],
      correctAnswer: 2,
      explanation: 'Đọc phối tử trước: tetraammine + copper(II) + sulfate.',
      points: 10
    },
    {
      type: 'true-false',
      question: '[Fe(CN)6]4- và [Fe(CN)6]3- có số oxi hoá Fe khác nhau.',
      correctAnswer: true,
      explanation: 'Fe(II) cho anion 4-, Fe(III) cho anion 3-.',
      points: 10
    },
    {
      type: 'multiple-choice',
      question: 'Phối tử en có tính chất:',
      options: ['Đơn càng', 'Lưỡng càng (bidentate)', 'Ba càng', 'Không phải phối tử'],
      correctAnswer: 1,
      explanation: 'Ethylenediamin có hai nguyên tử N cho e → bidentate.',
      points: 10
    },
    {
      type: 'fill-in-blank',
      question: 'Công thức ion hòa tan AgCl trong NH3: [Ag(NH3)2]____.',
      correctAnswer: '+',
      explanation: 'Ag+ phối trí 2 NH3 tạo phức cation.',
      points: 10
    },
    {
      type: 'multiple-choice',
      question: 'Trong tên phức anion, tên kim loại thêm hậu tố:',
      options: ['-ite', '-ate', '-ide', '-ine'],
      correctAnswer: 1,
      explanation: 'Ví dụ: ferrate, cuprate.',
      points: 10
    },
    {
      type: 'multiple-choice',
      question: 'Số oxi hoá của Co trong [CoCl2(en)2]+ là:',
      options: ['+1', '+2', '+3', '+4'],
      correctAnswer: 2,
      explanation: 'en trung hoà, 2Cl- tổng -2, tổng điện tích +1 → Co + (-2) = +1 ⇒ Co = +3.',
      points: 10
    },
    {
      type: 'true-false',
      question: 'Hemoglobin là một phức chất của Fe.',
      correctAnswer: true,
      explanation: 'Fe phối trí với porphyrin và O2 tạm thời.',
      points: 10
    }
  ]
};
