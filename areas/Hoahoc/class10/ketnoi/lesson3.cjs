module.exports = {
  classId: 10,
  curriculumType: 'ketnoi',
  chapterId: 1,
  chapterName: 'Chương 1: Cấu tạo nguyên tử',
  lessonId: 3,
  title: 'Bài 3: Cấu trúc lớp vỏ electron nguyên tử',
  description: 'Phân bố electron theo lớp/phân lớp và ba nguyên tắc Aufbau - Pauli - Hund.',
  level: 'Beginner',
  order: 3,
  theory: `
    <h2>Cấu trúc lớp vỏ electron</h2>
    <div style="display:grid; gap:12px; grid-template-columns:repeat(auto-fit,minmax(240px,1fr)); margin:12px 0;">
      <div style="padding:12px; border:1px solid #e2e8f0; border-radius:10px; background:#f8fafc;">
        <h4 style="margin:0 0 6px; color:#0f172a;">Lớp & phân lớp</h4>
        <ul style="margin:0; padding-left:18px; color:#475569;">
          <li>Sức chứa lớp n: 2n^2 e.</li>
          <li>Phân lớp: s(2), p(6), d(10), f(14); số obitan: s(1), p(3), d(5), f(7).</li>
          <li>Thứ tự năng lượng: 1s < 2s < 2p < 3s < 3p < 4s < 3d < 4p < 5s ...</li>
        </ul>
      </div>
      <div style="padding:12px; border:1px solid #e2e8f0; border-radius:10px; background:#fff7ed;">
        <h4 style="margin:0 0 6px; color:#9a3412;">Ba nguyên tắc</h4>
        <ul style="margin:0; padding-left:18px; color:#7c2d12;">
          <li>Aufbau: điền từ mức năng lượng thấp → cao.</li>
          <li>Pauli: mỗi obitan tối đa 2e, spin ngược.</li>
          <li>Hund: obitan suy biến điền e đơn với spin song song trước.</li>
        </ul>
      </div>
      <div style="padding:12px; border:1px solid #e2e8f0; border-radius:10px; background:#ecfeff;">
        <h4 style="margin:0 0 6px; color:#0e7490;">Ví dụ cấu hình</h4>
        <p style="margin:0; color:#0f172a;">O (Z=8): 1s^2 2s^2 2p^4. Na (Z=11): 1s^2 2s^2 2p^6 3s^1.</p>
      </div>
    </div>

    <div style="display:grid; gap:12px; grid-template-columns:repeat(auto-fit,minmax(260px,1fr)); margin:12px 0;">
      <div style="padding:12px; border-radius:12px; border:1px solid #cbd5e1; background:linear-gradient(135deg,#eef2ff,#f8fafc);">
        <h4 style="margin:0 0 6px; color:#312e81;">Số lượng tử (tóm tắt)</h4>
        <ul style="margin:0; padding-left:18px; color:#334155;">
          <li>n: số lớp chính (1,2,3,...).</li>
          <li>l: dạng obitan (0=s, 1=p, 2=d, 3=f).</li>
          <li>m: định hướng obitan (từ -l đến +l).</li>
          <li>ms: spin (+1/2 hoặc -1/2).</li>
        </ul>
      </div>
      <div style="padding:12px; border:1px dashed #cbd5e1; border-radius:10px; background:#f8fafc; color:#475569;">
        <h4 style="margin:0 0 6px;">Mẹo viết cấu hình</h4>
        <ol style="margin:0; padding-left:18px;">
          <li>Điền theo thứ tự năng lượng (sơ đồ chéo 1s → 7p).</li>
          <li>Kiểm tổng e = Z; nếu ion: điều chỉnh e.</li>
          <li>Viết rút gọn theo khí hiếm gần nhất: [Ne], [Ar]...</li>
        </ol>
        <p style="margin:8px 0 0;">Ngoại lệ thường gặp: Cr ([Ar] 3d5 4s1), Cu ([Ar] 3d10 4s1).</p>
      </div>
    </div>

    <div style="margin:12px 0; padding:12px; border:1px solid #e2e8f0; border-radius:10px; background:#fff7ed; color:#7c2d12;">
      <h4 style="margin:0 0 6px;">Liên hệ nhóm/chu kì</h4>
      <ul style="margin:0; padding-left:18px;">
        <li>Chu kì = số lớp e đã điền (giá trị n lớn nhất có e).</li>
        <li>Nhóm chính (A): số e hoá trị = tổng e lớp ngoài cùng (ns, np).</li>
        <li>Hóa tính: nhiều e hoá trị → phi kim; ít e hoá trị → kim loại.</li>
      </ul>
    </div>
  `,
  game: [
    {
      type: 'multiple-choice',
      question: 'Phân lớp p tối đa chứa bao nhiêu electron?',
      options: ['2', '4', '6', '10'],
      correctAnswer: 2,
      explanation: 'Phân lớp p gồm 3 obitan, tối đa 6 electron.',
      points: 10
    },
    {
      type: 'multiple-choice',
      question: 'Quy tắc Hund mô tả điều gì?',
      options: [
        'Điền electron theo mức năng lượng thấp trước',
        'Mỗi obitan tối đa 2e spin ngược',
        'Các obitan cùng mức được điền electron đơn với spin song song trước',
        'Tổng số electron bằng số proton'
      ],
      correctAnswer: 2,
      explanation: 'Hund: điền electron đơn vào obitan suy biến trước khi ghép đôi.',
      points: 10
    },
    {
      type: 'true-false',
      question: 'Cấu hình electron của O: 1s2 2s2 2p4.',
      correctAnswer: true,
      explanation: 'Z=8 → 1s^2 2s^2 2p^4 đúng theo Aufbau.',
      points: 10
    },
    {
      type: 'multiple-choice',
      question: 'Thứ tự năng lượng đúng của các phân lớp đầu tiên là:',
      options: ['1s < 2s < 2p < 3s < 3p < 3d < 4s', '1s < 2p < 2s < 3p < 3s', '1s < 2s < 3s < 2p < 3p', '1s < 3s < 2p < 3p < 4s'],
      correctAnswer: 0,
      explanation: 'Tuân thứ tự Aufbau phổ biến 1s 2s 2p 3s 3p 4s 3d...',
      points: 10
    },
    {
      type: 'multiple-choice',
      question: 'Nguyên tắc Pauli phát biểu:',
      options: ['Điền e vào mức năng lượng thấp trước', 'Obitan chứa tối đa 2e với spin ngược nhau', 'Điền e đơn vào obitan suy biến trước', 'Tổng số e bằng số p'],
      correctAnswer: 1,
      explanation: 'Không có hai electron trong một nguyên tử có cùng 4 số lượng tử.',
      points: 10
    },
    {
      type: 'multiple-choice',
      question: 'Cấu hình rút gọn của Na (Z=11) viết theo khí hiếm gần nhất:',
      options: ['[He]2s2 2p6 3s1', '[Ne]3s1', '[Ar]3s1', '[He]2s2 2p5 3s2'],
      correctAnswer: 1,
      explanation: 'Na sau Ne (Z=10) → [Ne]3s1.',
      points: 10
    },
    {
      type: 'multiple-choice',
      question: 'Số obitan có trong phân lớp d là:',
      options: ['1', '3', '5', '7'],
      correctAnswer: 2,
      explanation: 'Phân lớp d có 5 obitan, chứa tối đa 10e.',
      points: 10
    },
    {
      type: 'true-false',
      question: 'Nguyên tố có cấu hình ngoài cùng ns2 np1 thuộc nhóm IIIA.',
      correctAnswer: true,
      explanation: '3 electron hoá trị → nhóm 13 (IIIA).',
      points: 10
    },
    {
      type: 'multiple-choice',
      question: 'Cấu hình nào vi phạm quy tắc Hund?',
      options: ['2p6', '2p4 viết là ↑↓ ↑ ↑', '2p3 viết là ↑ ↑ ↑', '2p4 viết là ↑↓ ↑↓'],
      correctAnswer: 3,
      explanation: '2p4 phải điền đơn trước khi ghép đôi: ↑↓ ↑ ↑; viết cả hai cặp đôi sớm vi phạm Hund.',
      points: 10
    },
    {
      type: 'multiple-choice',
      question: 'Nguyên tử X có 16 electron. Cấu hình ngoài cùng là:',
      options: ['3s2 3p4', '3s2 3p5', '3s2 3p6', '2s2 2p6'],
      correctAnswer: 0,
      explanation: 'Z=16 (S) → ...3s2 3p4.',
      points: 10
    }
  ]
};
