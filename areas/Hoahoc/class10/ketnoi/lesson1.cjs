module.exports = {
  classId: 10,
  curriculumType: 'ketnoi',
  chapterId: 1,
  chapterName: 'Chương 1: Cấu tạo nguyên tử',
  lessonId: 1,
  title: 'Bài 1: Thành phần của nguyên tử',
  description: 'Ôn vai trò proton, nơtron, electron và ý nghĩa số hiệu nguyên tử, số khối.',
  level: 'Beginner',
  order: 1,
  theory: `
    <h2>Thành phần và cấu trúc nguyên tử</h2>
    <p style="margin:10px 0; color:#334155;">Mục tiêu: nhận diện ba hạt cơ bản, tính p/n/e, giải thích số hiệu nguyên tử (Z), số khối (A) và liên hệ độ bền hạt nhân.</p>

    <div style="display:grid; gap:12px; grid-template-columns:repeat(auto-fit,minmax(240px,1fr)); margin:14px 0;">
      <div style="padding:14px; border:1px solid #e2e8f0; border-radius:10px; background:#f8fafc;">
        <h4 style="margin:0 0 8px; color:#0f172a;">Hạt proton (p)</h4>
        <ul style="margin:0; padding-left:18px; color:#475569;">
          <li>Điện tích +1e, khối lượng xấp xỉ 1u (1u ≈ 1,66 × 10^{-27} kg).</li>
          <li>Số proton = số hiệu nguyên tử Z → định danh nguyên tố và điện tích hạt nhân +Ze.</li>
          <li>Tăng Z → lực hút e lớn hơn → bán kính nguyên tử thường giảm trong cùng chu kì.</li>
        </ul>
      </div>
      <div style="padding:14px; border:1px solid #e2e8f0; border-radius:10px; background:#fff7ed;">
        <h4 style="margin:0 0 8px; color:#9a3412;">Hạt nơtron (n)</h4>
        <ul style="margin:0; padding-left:18px; color:#7c2d12;">
          <li>Không mang điện; khối lượng xấp xỉ 1u.</li>
          <li>Số n = A - Z → làm thay đổi số khối, tạo đồng vị.</li>
          <li>Tỉ lệ n/p ảnh hưởng độ bền hạt nhân: hạt nhân nhẹ bền khi n/p xấp xỉ 1; hạt nhân nặng cần n/p > 1.</li>
        </ul>
      </div>
      <div style="padding:14px; border:1px solid #e2e8f0; border-radius:10px; background:#ecfeff;">
        <h4 style="margin:0 0 8px; color:#0e7490;">Hạt electron (e)</h4>
        <ul style="margin:0; padding-left:18px; color:#0f172a;">
          <li>Điện tích -1e, khối lượng rất nhỏ (~1/1836 proton).</li>
          <li>Chuyển động quanh hạt nhân theo lớp/phân lớp; quyết định tính chất hoá học.</li>
          <li>Nguyên tử trung hoà: p = e; khi nhường/nhận e → ion dương/ion âm.</li>
        </ul>
      </div>
    </div>

    <div style="display:grid; gap:12px; grid-template-columns:repeat(auto-fit,minmax(240px,1fr)); margin:14px 0;">
      <div style="padding:14px; border-radius:12px; border:1px solid #cbd5e1; background:linear-gradient(135deg,#eef2ff,#f8fafc);">
        <h3 style="margin:0 0 8px; color:#312e81;">Công thức nhanh</h3>
        <ul style="margin:0; padding-left:18px; color:#334155;">
          <li>Kí hiệu nuclit: <em>^{A}_{Z}X</em>; n = A - Z; e = Z (trung hoà).</li>
          <li>Tổng khối lượng xấp xỉ A (đvC); m nguyên tử ≈ A × 1u.</li>
          <li>Tỉ lệ n/p: nhẹ ~1; trung bình như <em>^{56}Fe</em> ~1,15; lệch xa → dễ phóng xạ.</li>
        </ul>
      </div>
      <div style="padding:14px; border:1px dashed #cbd5e1; border-radius:10px; background:#f8fafc; color:#475569;">
        <h4 style="margin:0 0 6px;">Cách tính nhanh p, n, e</h4>
        <ol style="margin:0; padding-left:18px;">
          <li>Đọc Z từ kí hiệu nuclit → p = Z.</li>
          <li>Tính n = A - Z.</li>
          <li>Nguyên tử trung hoà: e = Z; ion: e = Z ± |q|.</li>
        </ol>
      </div>
    </div>

    <div style="margin:14px 0; padding:12px; border:1px dashed #cbd5e1; border-radius:10px; background:#fff7ed; color:#7c2d12;">
      <p style="margin:0 0 6px;"><strong>Tránh nhầm lẫn</strong>:</p>
      <ul style="margin:0; padding-left:18px;">
        <li>Không cộng electron vào số khối: A chỉ gồm p + n.</li>
        <li>Ion dương không thay đổi Z, chỉ giảm số e.</li>
        <li>Khi so sánh n/p, dùng giá trị gần 1 hoặc >1 để dự đoán bền/không bền.</li>
      </ul>
    </div>

    <div style="margin:14px 0; padding:14px; border:1px solid #e2e8f0; border-radius:10px; background:#f8fafc;">
      <h3 style="margin:0 0 8px; color:#0f172a;">Ôn nhanh trước quiz</h3>
      <ul style="margin:0; padding-left:18px; color:#475569;">
        <li>Tính n từ kí hiệu nuclit và dự đoán n/p.</li>
        <li>Liên hệ Z với tên nguyên tố và vị trí trong BTH.</li>
        <li>Nhận biết khi nào nguyên tử/ion giữ nguyên p nhưng đổi e.</li>
      </ul>
    </div>
  `,
  game: {
    basic: [
      {
        type: 'multiple-choice',
        question: 'Nguyên tố được xác định bởi đại lượng nào?',
        options: ['Số nơtron', 'Số electron', 'Số proton (Z)', 'Số khối (A)'],
        correctAnswer: 2,
        explanation: 'Số hiệu nguyên tử Z = số proton định danh nguyên tố.',
        points: 10
      },
      {
        type: 'multiple-choice',
        question: 'Kí hiệu ^{23}_{11}Na cho biết số nơtron là?',
        options: ['11', '12', '23', '34'],
        correctAnswer: 1,
        explanation: 'n = A - Z = 23 - 11 = 12.',
        points: 10
      },
      {
        type: 'true-false',
        question: 'Nguyên tử trung hòa luôn có p = e.',
        correctAnswer: true,
        explanation: 'Điện tích tổng bằng 0 khi số proton bằng số electron.',
        points: 10
      },
      {
        type: 'multiple-choice',
        question: 'Số khối A của nguyên tử bằng:',
        options: ['p + e', 'p + n', 'e + n', 'p + n + e'],
        correctAnswer: 1,
        explanation: 'A = p + n (số nuclôn), e rất nhỏ không tính vào khối lượng hạt nhân.',
        points: 10
      }
    ],
    intermediate: [
      {
        type: 'multiple-choice',
        question: 'Đồng vị là những nguyên tử có:',
        options: ['Cùng A, khác Z', 'Cùng Z, khác A', 'Khác Z, khác A', 'Cùng số n, khác Z'],
        correctAnswer: 1,
        explanation: 'Đồng vị: cùng số proton (Z), khác số n → khác A.',
        points: 10
      },
      {
        type: 'multiple-choice',
        question: 'Với ^{56}_{26}Fe, tỉ lệ n/p xấp xỉ?',
        options: ['1,00', '1,15', '1,50', '2,00'],
        correctAnswer: 1,
        explanation: 'n = 30, p = 26 → n/p ≈ 30/26 ≈ 1,15.',
        points: 10
      },
      {
        type: 'fill-in-blank',
        question: 'Electron có điện tích ______ và khối lượng rất nhỏ so với proton.',
        correctAnswer: 'âm',
        explanation: 'Electron mang điện tích âm -1e.',
        points: 10
      }
    ],
    advanced: [
      {
        type: 'multiple-choice',
        question: 'Hạt nhân ^{14}_{7}N biến đổi thành ^{14}_{6}C qua quá trình?',
        options: ['Bức xạ alpha', 'Bức xạ beta trừ (β−)', 'Bức xạ gamma', 'Bức xạ beta cộng (β+) hoặc bắt e'],
        correctAnswer: 3,
        explanation: 'Giảm Z từ 7 xuống 6 cần biến p → n, đặc trưng cho phân rã β+ hoặc bắt electron (EC).',
        hint: 'β+ làm Z giảm 1; β− làm Z tăng 1.',
        points: 10
      },
      {
        type: 'multiple-choice',
        question: 'Tổng khối lượng hạt p+n trong ^{35}_{17}Cl (đơn vị u) xấp xỉ:',
        options: ['17u', '35u', '52u', '70u'],
        correctAnswer: 1,
        explanation: 'A ≈ số nuclôn = 35u.',
        points: 10
      },
      {
        type: 'true-false',
        question: 'Tỉ lệ n/p ảnh hưởng đến độ bền hạt nhân.',
        correctAnswer: true,
        explanation: 'n/p phù hợp giúp cân bằng lực hút-hạt nhân; lệch nhiều dễ phóng xạ.',
        points: 10
      }
    ]
  }
};
