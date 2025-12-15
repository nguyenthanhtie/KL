module.exports = {
  classId: 12,
  curriculumType: 'ketnoi',
  chapterId: 5,
  chapterName: 'Chương 5: Pin điện và điện phân',
  lessonId: 16,
  title: 'Bài 16: Điện phân',
  description: 'Nguyên tắc điện phân, định luật Faraday, tính toán khối lượng chất thoát ra.',
  level: 'Intermediate',
  order: 16,
  theory: `
    <h2>Điện phân</h2>
    <p style="margin:8px 0; color:#334155;">Quá trình phi tự phát dùng dòng điện một chiều để gây oxi hoá/khử tại điện cực, tính toán bằng định luật Faraday.</p>

    <div style="display:grid; gap:12px; grid-template-columns:repeat(auto-fit,minmax(260px,1fr)); margin:12px 0;">
      <div style="padding:12px; border:1px solid #e2e8f0; border-radius:10px; background:#f8fafc;">
        <h4 style="margin:0 0 6px; color:#0f172a;">Nguyên tắc & ưu tiên phóng điện</h4>
        <ul style="margin:0; padding-left:18px; color:#475569;">
          <li>Anot: oxi hoá; catot: khử. Dòng electron đi từ nguồn về catot.</li>
          <li>Ưu tiên phóng điện (dung dịch nước): catot ưu tiên ion kim loại có E° cao hơn H+/H2; anot ưu tiên ion dễ oxi hoá (halogen, H2O → O2).</li>
          <li>Điện cực trơ (graphit, Pt) vs điện cực tan (Cu trong tinh luyện Cu).</li>
        </ul>
      </div>
      <div style="padding:12px; border:1px solid #fde68a; border-radius:10px; background:#fffbeb; color:#92400e;">
        <h4 style="margin:0 0 6px;">Định luật Faraday</h4>
        <ul style="margin:0; padding-left:18px;">
          <li>m = (AIt)/(nF); V khí = (It)/(nF) · 22.4 ở đktc.</li>
          <li>1 Faraday (F) = 96500 C ứng với 1 mol e.</li>
          <li>Ảnh hưởng: cường độ dòng, thời gian, số electron trao đổi n.</li>
        </ul>
      </div>
      <div style="padding:12px; border:1px dashed #cbd5e1; border-radius:10px; background:#f8fafc; color:#475569;">
        <h4 style="margin:0 0 6px;">Ứng dụng</h4>
        <ul style="margin:0; padding-left:18px;">
          <li>Mạ điện (Cu, Ni, Cr) cải thiện chống ăn mòn, thẩm mỹ.</li>
          <li>Tinh luyện Cu: anot Cu thô → catot Cu tinh khiết, bùn anot chứa Ag, Au.</li>
          <li>Điện phân NaCl: dung dịch (màng trao đổi ion) → Cl2, H2, NaOH; nóng chảy → Na, Cl2.</li>
        </ul>
      </div>
    </div>

    <div style="display:grid; gap:12px; grid-template-columns:repeat(auto-fit,minmax(260px,1fr)); margin:12px 0;">
      <div style="padding:12px; border-radius:12px; border:1px solid #cbd5e1; background:linear-gradient(135deg,#eef2ff,#f8fafc); color:#0f172a;">
        <h4 style="margin:0 0 6px;">Checklist ưu tiên phóng điện</h4>
        <ul style="margin:0; padding-left:18px; color:#334155;">
          <li>Catot dung dịch: cation quý/ít hoạt động (Cu2+, Ag+) &gt; H2O/H+ &gt; kim loại rất âm (Na+, K+ không khử).</li>
          <li>Anot dung dịch: anion oxi hoá dễ (Cl-, Br-) &gt; H2O/OH- (tạo O2); anion bền (SO4 2-, NO3-) không phóng.</li>
          <li>Điện cực tan: anot cung cấp kim loại → nồng độ ion giữ ổn định (tinh luyện, mạ điện đồng đều).</li>
        </ul>
      </div>
      <div style="padding:12px; border:1px dashed #cbd5e1; border-radius:10px; background:#fffaf0; color:#92400e;">
        <h4 style="margin:0 0 6px;">Case & mẹo</h4>
        <ul style="margin:0; padding-left:18px;">
          <li>Tính khí thoát: xác định n e/ mol khí (H2: 2e, O2: 4e, Cl2: 2e) rồi áp dụng Faraday.</li>
          <li>Mạ đều: giữ I ổn định, khuấy dung dịch, chọn anot cùng kim loại để bù ion.</li>
          <li>Điện phân nhiều ngăn (màng trao đổi ion) để tách sản phẩm, tránh tái hợp Cl2 với NaOH.</li>
        </ul>
      </div>
      <div style="padding:12px; border:1px solid #e2e8f0; border-radius:10px; background:#f8fafc; color:#475569;">
        <h4 style="margin:0 0 6px;">Ôn bài tập</h4>
        <ul style="margin:0; padding-left:18px;">
          <li>Q = I·t (C); n e = Q/F; mol chất = n e / số e trao đổi; m = n·M.</li>
          <li>Điện phân nối tiếp nhiều ion: ưu tiên phóng → xác định thứ tự sản phẩm theo E°, nồng độ.</li>
          <li>Kiểm tra bảo toàn điện tích: lượng ion rời/đến điện cực phải phù hợp với số e đã trao đổi.</li>
        </ul>
      </div>
    </div>
  `,
  game: [
    {
      type: 'multiple-choice',
      question: 'Trong điện phân dung dịch CuSO4 với điện cực trơ, catot xảy ra:',
      options: ['Cu2+ + 2e → Cu', '2H2O + 2e → H2 + 2OH-', 'SO4 2- bị khử', 'Cu bị oxi hoá'],
      correctAnswer: 0,
      explanation: 'Cu2+ ưu tiên khử hơn nước.',
      points: 10
    },
    {
      type: 'multiple-choice',
      question: 'Định luật Faraday: m =',
      options: ['MIt/F', 'AIt/(nF)', 'nF/It', 'It/A'],
      correctAnswer: 1,
      explanation: 'A là khối lượng mol nguyên tử/tác nhân, n số e trao đổi.',
      points: 10
    },
    {
      type: 'true-false',
      question: '1 mol e tương ứng 96500 coulomb.',
      correctAnswer: true,
      explanation: 'Hằng số Faraday F ≈ 96500 C/mol e.',
      points: 10
    },
    {
      type: 'multiple-choice',
      question: 'Trong điện phân NaCl dung dịch có màng trao đổi ion, sản phẩm tại catot là:',
      options: ['Na', 'H2', 'Cl2', 'O2'],
      correctAnswer: 1,
      explanation: 'Nước bị khử ưu tiên, tạo H2 và OH-.',
      points: 10
    },
    {
      type: 'multiple-choice',
      question: 'Điện lượng 193000 C tương ứng số mol electron:',
      options: ['1 mol', '2 mol', '0.5 mol', '3 mol'],
      correctAnswer: 1,
      explanation: '193000/96500 ≈ 2 mol e.',
      points: 10
    },
    {
      type: 'true-false',
      question: 'Điện cực tan có thể cung cấp ion kim loại cho dung dịch trong quá trình điện phân.',
      correctAnswer: true,
      explanation: 'Anot tan (Cu) oxi hoá cung cấp Cu2+ bổ sung.',
      points: 10
    },
    {
      type: 'multiple-choice',
      question: 'Tại anot điện phân dung dịch NaCl (điện cực trơ) ưu tiên xảy ra:',
      options: ['2Cl- → Cl2 + 2e', '2H2O → O2 + 4H+ + 4e', 'Na+ + e → Na', '2OH- → H2O + 2e'],
      correctAnswer: 0,
      explanation: 'Cl- bị oxi hoá dễ hơn H2O trong dung dịch đậm.',
      points: 10
    },
    {
      type: 'fill-in-blank',
      question: 'Điện lượng Q = I × ____ (đơn vị giây).',
      correctAnswer: 't',
      explanation: 'Q=It với t tính bằng giây.',
      points: 10
    },
    {
      type: 'multiple-choice',
      question: 'Điện phân nóng chảy NaCl thu được kim loại Na vì:',
      options: ['Na+ dễ khử hơn H2O', 'Không có nước, Na+ nhận e trực tiếp', 'Cl- không bị oxi hoá', 'E°Na+/Na lớn hơn H2O'],
      correctAnswer: 1,
      explanation: 'Không có H2O nên Na+ bị khử.',
      points: 10
    },
    {
      type: 'true-false',
      question: 'Khối lượng chất thoát ra tỉ lệ thuận với điện lượng Q.',
      correctAnswer: true,
      explanation: 'Định luật Faraday 1: m ∝ Q.',
      points: 10
    }
  ]
};
