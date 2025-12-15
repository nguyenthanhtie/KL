module.exports = {
  classId: 12,
  curriculumType: 'ketnoi',
  chapterId: 5,
  chapterName: 'Chương 5: Pin điện và điện phân',
  lessonId: 15,
  title: 'Bài 15: Thế điện cực và nguồn điện hoá học',
  description: 'Thế điện cực chuẩn, pin Galvani, suất điện động, ứng dụng tính toán.',
  level: 'Intermediate',
  order: 15,
  theory: `
    <h2>Thế điện cực và nguồn điện hoá học</h2>
    <p style="margin:8px 0; color:#334155;">Nắm cách sắp xếp dãy điện hoá, xác định chiều dòng electron, tính suất điện động và liên hệ năng lượng.</p>

    <div style="display:grid; gap:12px; grid-template-columns:repeat(auto-fit,minmax(260px,1fr)); margin:12px 0;">
      <div style="padding:12px; border:1px solid #e2e8f0; border-radius:10px; background:#f8fafc;">
        <h4 style="margin:0 0 6px; color:#0f172a;">Thế điện cực</h4>
        <ul style="margin:0; padding-left:18px; color:#475569;">
          <li>E° đo so với điện cực hydro chuẩn (SHE = 0 V).</li>
          <li>Cặp oxi hoá/khử viết dạng oxi hoá/khử; E° càng lớn càng dễ khử.</li>
          <li>Chiều tự phát: điện cực có E° lớn hơn đóng vai trò catot (bị khử).</li>
        </ul>
      </div>
      <div style="padding:12px; border:1px solid #fde68a; border-radius:10px; background:#fffbeb; color:#92400e;">
        <h4 style="margin:0 0 6px;">Pin Galvani</h4>
        <ul style="margin:0; padding-left:18px;">
          <li>Suất điện động: E = E°<sub>catot</sub> – E°<sub>anot</sub> (hiệu thế chuẩn).</li>
          <li>Anot: oxi hoá, catot: khử; electron chạy từ anot → catot qua mạch ngoài.</li>
          <li>Ví dụ: Pin Daniell (Zn/Cu); pin khô Leclanché; pin nhiên liệu H2/O2.</li>
        </ul>
      </div>
      <div style="padding:12px; border:1px dashed #cbd5e1; border-radius:10px; background:#f8fafc; color:#475569;">
        <h4 style="margin:0 0 6px;">Nhiệt động & ứng dụng</h4>
        <ul style="margin:0; padding-left:18px;">
          <li>Liên hệ: ΔG° = –nFE°, K = 10^(nE°/0.059) ở 25°C.</li>
          <li>Ứng dụng đo pH, cảm biến ion, mạ điện (ngược lại pin: điện phân).</li>
          <li>Tính toán: suất điện động thực dùng phương trình Nernst khi [ion] ≠ 1 M.</li>
        </ul>
      </div>
    </div>

    <div style="display:grid; gap:12px; grid-template-columns:repeat(auto-fit,minmax(260px,1fr)); margin:12px 0;">
      <div style="padding:12px; border-radius:12px; border:1px solid #cbd5e1; background:linear-gradient(135deg,#eef2ff,#f8fafc); color:#0f172a;">
        <h4 style="margin:0 0 6px;">Sơ đồ nhớ nhanh</h4>
        <ul style="margin:0; padding-left:18px; color:#334155;">
          <li>E° lớn → dễ khử → catot; E° nhỏ → dễ oxi hoá → anot.</li>
          <li>E°pin = E°(catot) – E°(anot); ΔG° = –nFE°; K liên hệ E° qua Nernst.</li>
          <li>Dòng e chạy ngoài: anot → catot; dòng ion trong dung dịch/bắc cầu muối cân bằng điện tích.</li>
        </ul>
      </div>
      <div style="padding:12px; border:1px dashed #cbd5e1; border-radius:10px; background:#fffaf0; color:#92400e;">
        <h4 style="margin:0 0 6px;">Case & mẹo</h4>
        <ul style="margin:0; padding-left:18px;">
          <li>Đề bài đổi nồng độ: dùng Nernst; nếu ion catot giảm → Ecatot giảm; nếu ion anot giảm → |Eanot| giảm.</li>
          <li>Pin tập thể dục: nhớ “ANOT mòn” (oxi hoá kim loại) với pin kim loại hoạt động; kiểm tra phương trình để khẳng định.</li>
          <li>Khi ghép pin: tăng [ion catot] hoặc giảm [ion anot] để tăng E (theo Nernst).</li>
        </ul>
      </div>
      <div style="padding:12px; border:1px solid #e2e8f0; border-radius:10px; background:#f8fafc; color:#475569;">
        <h4 style="margin:0 0 6px;">Ôn bài tập</h4>
        <ul style="margin:0; padding-left:18px;">
          <li>Tính E thực: E = E° – (0.059/n)logQ; xác định Q đúng chiều phản ứng viết.</li>
          <li>Chuyển đổi ΔG, K, E: ΔG° = –nFE°; K = 10^{nE°/0.059} (25°C); chọn n (mol e chuyển).</li>
          <li>Viết sơ đồ pin đầy đủ: anot | ion anot || ion catot | catot, kèm cầu muối.</li>
        </ul>
      </div>
    </div>
  `,
  game: [
    {
      type: 'multiple-choice',
      question: 'Trong pin Galvani, anot là điện cực xảy ra:',
      options: ['Khử', 'Oxi hoá', 'Không phản ứng', 'Cả khử và oxi hoá'],
      correctAnswer: 1,
      explanation: 'Anot oxi hoá, catot khử.',
      points: 10
    },
    {
      type: 'multiple-choice',
      question: 'Suất điện động chuẩn E°pin =',
      options: ['E°anot - E°catot', 'E°catot - E°anot', 'E°catot + E°anot', 'E°anot / E°catot'],
      correctAnswer: 1,
      explanation: 'Lấy thế chuẩn của cực khử trừ cực oxi hoá.',
      points: 10
    },
    {
      type: 'true-false',
      question: 'Pin Daniell sử dụng điện cực Zn/Zn2+ và Cu/Cu2+.',
      correctAnswer: true,
      explanation: 'Zn là anot, Cu là catot.',
      points: 10
    },
    {
      type: 'multiple-choice',
      question: 'Nếu E°Cu2+/Cu = +0.34 V và E°Ag+/Ag = +0.80 V, trong pin Cu–Ag catot là:',
      options: ['Cu', 'Ag', 'Cả hai', 'Không xác định'],
      correctAnswer: 1,
      explanation: 'Ag có E° lớn hơn → bị khử → catot.',
      points: 10
    },
    {
      type: 'multiple-choice',
      question: 'Liên hệ ΔG° và E° đúng:',
      options: ['ΔG° = nFE°', 'ΔG° = –nFE°', 'ΔG° = E°/nF', 'ΔG° = RT ln E°'],
      correctAnswer: 1,
      explanation: 'ΔG° = –nFE° (J).',
      points: 10
    },
    {
      type: 'true-false',
      question: 'Electron trong pin Galvani di chuyển qua dung dịch.',
      correctAnswer: false,
      explanation: 'Electron đi trong dây dẫn; ion di chuyển trong dung dịch/bắc cầu muối.',
      points: 10
    },
    {
      type: 'multiple-choice',
      question: 'Bắc cầu muối có vai trò:',
      options: ['Cung cấp electron', 'Hoàn mạch ion, giữ trung hoà điện tích', 'Tăng E°', 'Sinh khí'],
      correctAnswer: 1,
      explanation: 'Ion trong cầu muối cân bằng điện tích hai nửa pin.',
      points: 10
    },
    {
      type: 'fill-in-blank',
      question: 'Phương trình Nernst: E = E° - (0.059/n) log ______.',
      correctAnswer: 'Q',
      explanation: 'E phụ thuộc thương số phản ứng Q.',
      points: 10
    },
    {
      type: 'multiple-choice',
      question: 'Pin nhiên liệu H2/O2 sản phẩm chính là:',
      options: ['CO2', 'H2O', 'H2O2', 'CH4'],
      correctAnswer: 1,
      explanation: 'H2 bị oxi hoá, O2 bị khử → H2O.',
      points: 10
    },
    {
      type: 'true-false',
      question: 'E° càng lớn, phản ứng càng tự phát theo chiều được viết (oxy hóa → khử).',
      correctAnswer: true,
      explanation: 'E° dương → ΔG° âm.',
      points: 10
    }
  ]
};