module.exports = {
  classId: 10,
  curriculumType: 'ketnoi',
  chapterId: 1,
  chapterName: 'Chương 1: Cấu tạo nguyên tử',
  lessonId: 4,
  title: 'Bài 4: Ôn tập chương 1',
  description: 'Tổng hợp cấu trúc hạt nhân, lớp vỏ electron, đồng vị và quy tắc điền e.',
  level: 'Intermediate',
  order: 4,
  theory: `
    <h2>Ôn tập chương 1</h2>
    <div style="display:grid; gap:12px; grid-template-columns:repeat(auto-fit,minmax(240px,1fr)); margin:12px 0;">
      <div style="padding:12px; border:1px solid #e2e8f0; border-radius:10px; background:#f8fafc;">
        <h4 style="margin:0 0 6px; color:#0f172a;">Hạt nhân & lớp vỏ</h4>
        <ul style="margin:0; padding-left:18px; color:#475569;">
          <li>p, n khối lượng ~1u; e rất nhỏ, quay quanh hạt nhân.</li>
          <li>Z = p = e (trung hòa); A = Z + n; n/p chi phối độ bền hạt nhân.</li>
          <li>Bán kính nguyên tử thường giảm theo chu kì và tăng theo nhóm.</li>
        </ul>
      </div>
      <div style="padding:12px; border:1px solid #e2e8f0; border-radius:10px; background:#fff7ed;">
        <h4 style="margin:0 0 6px; color:#9a3412;">Đồng vị & nuclit</h4>
        <p style="margin:0; color:#7c2d12;">Cùng Z khác A; kí hiệu ^{A}_{Z}X; n = A - Z; M trung bình = ∑(A_i × %)/100.</p>
      </div>
      <div style="padding:12px; border:1px solid #e2e8f0; border-radius:10px; background:#ecfeff;">
        <h4 style="margin:0 0 6px; color:#0e7490;">Cấu hình e</h4>
        <p style="margin:0; color:#0f172a;">Tuân Aufbau, Pauli, Hund; dạng chuẩn: 1s^2 2s^2 2p^6 ...; rút gọn theo khí hiếm.</p>
      </div>
    </div>

    <div style="display:grid; gap:12px; grid-template-columns:repeat(auto-fit,minmax(240px,1fr)); margin:12px 0;">
      <div style="padding:12px; border:1px dashed #cbd5e1; border-radius:10px; background:#f8fafc; color:#475569;">
        <h4 style="margin:0 0 6px;">Check-list nhanh</h4>
        <ul style="margin:0; padding-left:18px;">
          <li>Đọc đúng Z, A; tính p, n, e.</li>
          <li>Viết cấu hình e và xác định nhóm/chu kì.</li>
          <li>Dự đoán tính kim loại/phi kim theo cấu hình ngoài.</li>
        </ul>
      </div>
      <div style="padding:12px; border:1px solid #e2e8f0; border-radius:10px; background:#fff7ed; color:#7c2d12;">
        <h4 style="margin:0 0 6px;">Dạng bài tập hay gặp</h4>
        <ul style="margin:0; padding-left:18px;">
          <li>Tính n, p, e từ kí hiệu nuclit hoặc tên đồng vị.</li>
          <li>Viết cấu hình e cho nguyên tử/ion, phát hiện vi phạm Pauli/Hund.</li>
          <li>Sắp xếp bán kính, hoá tính theo chu kì/nhóm dựa trên Z.</li>
        </ul>
      </div>
    </div>

    <p style="margin:8px 0 0; color:#334155;">Nhớ số Avogadro N = 6,02×10^{23}; điện tích hạt nhân = +Ze; e ngoài cùng quyết định hoá tính.</p>
  `,
  game: [
    {
      type: 'multiple-choice',
      question: 'Nguyên tử trung hòa có 11 electron. Số proton bằng?',
      options: ['10', '11', '12', '23'],
      correctAnswer: 1,
      explanation: 'Trung hòa → p = e = 11 (Na).',
      points: 10
    },
    {
      type: 'multiple-choice',
      question: 'Số nơtron của ^{37}_{17}Cl là?',
      options: ['17', '18', '20', '37'],
      correctAnswer: 2,
      explanation: 'n = A - Z = 37 - 17 = 20 nơtron.',
      points: 10
    },
    {
      type: 'true-false',
      question: 'Một obitan d có thể chứa tối đa 10 electron.',
      correctAnswer: false,
      explanation: 'Một obitan tối đa 2e; phân lớp d gồm 5 obitan chứa tối đa 10e.',
      points: 10
    },
    {
      type: 'multiple-choice',
      question: 'Kí hiệu ^{A}_{Z}X cho biết A là:',
      options: ['Số proton', 'Số nơtron', 'Số khối = p + n', 'Số electron'],
      correctAnswer: 2,
      explanation: 'A là số khối bằng tổng số nuclôn.',
      points: 10
    },
    {
      type: 'multiple-choice',
      question: 'Cấu hình electron của Mg (Z=12) là:',
      options: ['1s2 2s2 2p6 3s2', '1s2 2s2 2p6 3s1', '1s2 2s2 2p5 3s2', '1s2 2s2 2p6 3p2'],
      correctAnswer: 0,
      explanation: 'Điền theo Aufbau: 1s2 2s2 2p6 3s2.',
      points: 10
    },
    {
      type: 'true-false',
      question: 'Đồng vị có tính chất hóa học gần như giống nhau.',
      correctAnswer: true,
      explanation: 'Hoá học phụ thuộc cấu hình e (Z), đồng vị chỉ khác n.',
      points: 10
    },
    {
      type: 'multiple-choice',
      question: 'Nhóm nào chứa các phân lớp theo sức chứa electron đúng?',
      options: ['s(4), p(6), d(10)', 's(2), p(6), d(10), f(14)', 's(2), p(4), d(8)', 's(2), p(6), d(12)'],
      correctAnswer: 1,
      explanation: 'Sức chứa tối đa: s2, p6, d10, f14.',
      points: 10
    },
    {
      type: 'multiple-choice',
      question: 'Tỉ lệ n/p của ^{40}_{20}Ca là:',
      options: ['1,0', '1,5', '2,0', '0,5'],
      correctAnswer: 0,
      explanation: 'n = 20, p = 20 → n/p = 1.',
      points: 10
    },
    {
      type: 'multiple-choice',
      question: 'Electron lớp ngoài cùng quyết định chủ yếu:',
      options: ['Khối lượng nguyên tử', 'Tính chất hóa học', 'Tính phóng xạ', 'Khối lượng riêng'],
      correctAnswer: 1,
      explanation: 'Hóa tính phụ thuộc cấu hình e lớp ngoài.',
      points: 10
    },
    {
      type: 'true-false',
      question: 'Ion dương được tạo khi nguyên tử nhận electron.',
      correctAnswer: false,
      explanation: 'Ion dương hình thành khi nguyên tử nhường electron.',
      points: 10
    }
  ]
};
