module.exports = {
  classId: 10,
  curriculumType: 'ketnoi',
  chapterId: 1,
  chapterName: 'Chương 1: Cấu tạo nguyên tử',
  lessonId: 2,
  title: 'Bài 2: Nguyên tố hóa học',
  description: 'Khái niệm nguyên tố, số hiệu nguyên tử, kí hiệu nuclit và đồng vị.',
  level: 'Beginner',
  order: 2,
  theory: `
    <h2>Nguyên tố hóa học và kí hiệu</h2>
    <p style="margin:10px 0; color:#334155;">Mục tiêu: phân biệt Z, A, đồng vị; đọc/viết kí hiệu nuclit, tính khối lượng nguyên tử trung bình và liên hệ vị trí trong bảng tuần hoàn.</p>

    <div style="display:grid; gap:12px; grid-template-columns:repeat(auto-fit,minmax(240px,1fr)); margin:12px 0;">
      <div style="padding:12px; border:1px solid #e2e8f0; border-radius:10px; background:#f8fafc;">
        <h4 style="margin:0 0 6px; color:#0f172a;">Định nghĩa & Z</h4>
        <ul style="margin:0; padding-left:18px; color:#475569;">
          <li>Nguyên tố: tập hợp nguyên tử cùng số proton (Z).</li>
          <li>Z = p = e (nguyên tử trung hòa) → quyết định vị trí trong BTH và cấu hình e.</li>
          <li>Z tăng → tính kim loại giảm dần trong cùng chu kì (do lực hút hạt nhân mạnh hơn).</li>
        </ul>
      </div>
      <div style="padding:12px; border:1px solid #e2e8f0; border-radius:10px; background:#fff7ed;">
        <h4 style="margin:0 0 6px; color:#9a3412;">Kí hiệu nuclit</h4>
        <p style="margin:0; color:#7c2d12;">^{A}_{Z}X với A = Z + n. Đồng vị: cùng Z, khác A (khác n). Ví dụ: ^{35}_{17}Cl và ^{37}_{17}Cl.</p>
      </div>
      <div style="padding:12px; border:1px solid #e2e8f0; border-radius:10px; background:#ecfeff;">
        <h4 style="margin:0 0 6px; color:#0e7490;">Ý nghĩa hóa học</h4>
        <ul style="margin:0; padding-left:18px; color:#0f172a;">
          <li>Dự đoán số e hoá trị, hoá trị phổ biến từ Z và cấu hình e.</li>
          <li>Tính chất hoá học của đồng vị gần như giống nhau vì Z giống nhau.</li>
        </ul>
      </div>
    </div>

    <div style="display:grid; gap:12px; grid-template-columns:repeat(auto-fit,minmax(260px,1fr)); margin:12px 0;">
      <div style="padding:12px; border-radius:12px; border:1px solid #cbd5e1; background:linear-gradient(135deg,#eef2ff,#f8fafc);">
        <h4 style="margin:0 0 8px; color:#312e81;">Khối lượng nguyên tử trung bình</h4>
        <p style="margin:0 0 6px; color:#334155;">Nếu có các đồng vị A1 (t1%), A2 (t2%), ...:</p>
        <p style="margin:0; color:#334155;"><em>M</em> = (A1×t1 + A2×t2 + ...)/100.</p>
        <p style="margin:6px 0 0; color:#475569;">Giá trị trung bình lệch về đồng vị có % cao hơn.</p>
      </div>
      <div style="padding:12px; border:1px dashed #cbd5e1; border-radius:10px; background:#f8fafc; color:#475569;">
        <h4 style="margin:0 0 6px;">Liên hệ BTH</h4>
        <ul style="margin:0; padding-left:18px;">
          <li>Z quyết định ô, chu kì, nhóm; A chỉ dùng để tính khối lượng.</li>
          <li>Nguyên tố cùng nhóm có số e hoá trị giống nhau → hoá tính tương tự.</li>
        </ul>
      </div>
    </div>

    <div style="margin:12px 0; padding:12px; border:1px solid #e2e8f0; border-radius:10px; background:#fff7ed; color:#7c2d12;">
      <h4 style="margin:0 0 6px;">Tránh nhầm lẫn</h4>
      <ul style="margin:0; padding-left:18px;">
        <li>Không dùng A để xác định nhóm/chu kì; dùng Z và cấu hình e.</li>
        <li>Đồng vị phóng xạ thường có n/p lệch xa vùng bền.</li>
        <li>Tính M phải quy đổi t% về dạng phân số (t/100).</li>
      </ul>
    </div>
  `,
  game: [
    {
      type: 'multiple-choice',
      question: 'Định nghĩa nguyên tố hóa học đúng là gì?',
      options: [
        'Tập hợp nguyên tử có cùng số proton',
        'Tập hợp nguyên tử có cùng số khối',
        'Tập hợp phân tử giống nhau',
        'Tập hợp ion dương giống nhau'
      ],
      correctAnswer: 0,
      explanation: 'Nguyên tố được xác định bởi số proton Z trong hạt nhân.',
      points: 10
    },
    {
      type: 'multiple-choice',
      question: 'Kí hiệu ^{35}_{17}Cl cho biết điều gì?',
      options: [
        'Z = 35, A = 17',
        'Z = 17, A = 35',
        '17 nơtron, 35 proton',
        '35 electron, 17 proton'
      ],
      correctAnswer: 1,
      explanation: 'Chỉ số dưới là Z=17, trên là A=35 → n = A - Z = 18.',
      points: 10
    },
    {
      type: 'true-false',
      question: 'Các đồng vị của một nguyên tố có cùng số proton.',
      correctAnswer: true,
      explanation: 'Đồng vị chỉ khác số nơtron nên A khác, Z giống nhau.',
      points: 10
    },
    {
      type: 'multiple-choice',
      question: 'Số khối A cho biết:',
      options: ['Tổng số proton', 'Tổng số proton và nơtron', 'Tổng số electron', 'Hiệu p - n'],
      correctAnswer: 1,
      explanation: 'A = p + n (số nuclôn).',
      points: 10
    },
    {
      type: 'multiple-choice',
      question: 'Nếu nguyên tử X có Z = 12, ở trạng thái trung hòa số electron là:',
      options: ['10', '11', '12', '24'],
      correctAnswer: 2,
      explanation: 'Trung hòa → e = p = Z = 12.',
      points: 10
    },
    {
      type: 'multiple-choice',
      question: 'Cặp nào là đồng vị của cùng nguyên tố?',
      options: ['^{12}_{6}X và ^{13}_{6}Y', '^{14}_{7}X và ^{14}_{6}X', '^{35}_{17}Cl và ^{37}_{17}Cl', '^{23}_{11}Na và ^{23}_{12}Mg'],
      correctAnswer: 2,
      explanation: 'Cùng Z=17, khác A → đồng vị của Cl.',
      points: 10
    },
    {
      type: 'multiple-choice',
      question: 'Nếu một nguyên tố có hai đồng vị A (75%) và B (25%), khối lượng nguyên tử trung bình nằm:',
      options: ['Gần đồng vị B', 'Giữa A và B, nghiêng về A', 'Giữa A và B, nghiêng về B', 'Bằng trung bình cộng đơn giản'],
      correctAnswer: 1,
      explanation: 'Tỉ lệ 75% khiến giá trị trung bình lệch về đồng vị A.',
      points: 10
    },
    {
      type: 'true-false',
      question: 'Các đồng vị có tính chất hóa học gần như giống nhau.',
      correctAnswer: true,
      explanation: 'Tính chất hoá học phụ thuộc cấu hình e (Z), không phụ thuộc số n.',
      points: 10
    },
    {
      type: 'multiple-choice',
      question: 'Trong kí hiệu ^{A}_{Z}X, Z còn được gọi là:',
      options: ['Số nơtron', 'Số nguyên tử', 'Số proton/số hiệu nguyên tử', 'Số khối'],
      correctAnswer: 2,
      explanation: 'Z là số hiệu nguyên tử, bằng số proton.',
      points: 10
    },
    {
      type: 'multiple-choice',
      question: 'Nguyên tố X có Z = 8, A = 18. Số nơtron là:',
      options: ['8', '10', '18', '26'],
      correctAnswer: 1,
      explanation: 'n = A - Z = 18 - 8 = 10.',
      points: 10
    }
  ]
};
