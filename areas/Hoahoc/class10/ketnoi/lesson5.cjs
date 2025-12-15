module.exports = {
  classId: 10,
  curriculumType: 'ketnoi',
  chapterId: 2,
  chapterName: 'Chương 2: Bảng tuần hoàn các nguyên tố hóa học và định luật tuần hoàn',
  lessonId: 5,
  title: 'Bài 5: Cấu tạo của bảng tuần hoàn các nguyên tố hóa học',
  description: 'Khối, chu kỳ, nhóm; cách sắp xếp theo Z tăng dần và ý nghĩa cấu hình e.',
  level: 'Beginner',
  order: 1,
  theory: `
    <h2>Cấu tạo bảng tuần hoàn</h2>
    <p style="margin:10px 0; color:#334155;">Mục tiêu: hiểu cách sắp xếp theo Z, nhận diện chu kỳ/nhóm/khối, suy luận cấu hình e và xu hướng tính chất.</p>

    <div style="display:grid; gap:12px; grid-template-columns:repeat(auto-fit,minmax(240px,1fr)); margin:12px 0;">
      <div style="padding:12px; border:1px solid #e2e8f0; border-radius:10px; background:#f8fafc;">
        <h4 style="margin:0 0 6px; color:#0f172a;">Nguyên tắc sắp xếp</h4>
        <ul style="margin:0; padding-left:18px; color:#475569;">
          <li>Sắp theo số hiệu nguyên tử Z tăng dần (không còn xếp theo khối lượng như Mendeleev).</li>
          <li>Cấu hình e lớp ngoài lặp lại tuần hoàn → tính chất tuần hoàn.</li>
          <li>Chu kỳ ngắn (1-3) có 2, 8, 8 nguyên tố; chu kỳ dài (4-7) có 18 hoặc 32 (do xen khối d, f).</li>
        </ul>
      </div>
      <div style="padding:12px; border:1px solid #e2e8f0; border-radius:10px; background:#fff7ed;">
        <h4 style="margin:0 0 6px; color:#9a3412;">Chu kỳ & nhóm</h4>
        <ul style="margin:0; padding-left:18px; color:#7c2d12;">
          <li>Chu kỳ = số lớp e đã điền (giá trị n lớn nhất có e).</li>
          <li>Nhóm A: số e hoá trị = số thứ tự nhóm (1-8); nhóm B (khối d) có e ngoài cùng (n-1)d và ns.</li>
          <li>Trong nhóm: cấu hình ngoài cùng giống nhau → hoá tính tương tự.</li>
        </ul>
      </div>
      <div style="padding:12px; border:1px solid #e2e8f0; border-radius:10px; background:#ecfeff;">
        <h4 style="margin:0 0 6px; color:#0e7490;">Các khối</h4>
        <p style="margin:0; color:#0f172a;">Khối s (ns1-2), p (ns2 np1-6), d (n-1)d1-10 ns0-2, f (n-2)f1-14... → hỗ trợ dự đoán tính kim loại/phi kim và hoá trị phổ biến.</p>
      </div>
    </div>

    <div style="display:grid; gap:12px; grid-template-columns:repeat(auto-fit,minmax(260px,1fr)); margin:12px 0;">
      <div style="padding:12px; border-radius:12px; border:1px solid #cbd5e1; background:linear-gradient(135deg,#eef2ff,#f8fafc);">
        <h4 style="margin:0 0 6px; color:#312e81;">Dùng vị trí để suy ra</h4>
        <ul style="margin:0; padding-left:18px; color:#334155;">
          <li>Chu kỳ → số lớp e; nhóm A → số e hoá trị → số oxi hoá cao nhất.</li>
          <li>Vị trí khối → kiểu liên kết và mức độ kim loại/phi kim.</li>
          <li>Từ nhóm/chu kỳ suy ra tính axit-bazơ của oxit/hiđroxit.</li>
        </ul>
      </div>
      <div style="padding:12px; border:1px dashed #cbd5e1; border-radius:10px; background:#f8fafc; color:#475569;">
        <h4 style="margin:0 0 6px;">Tránh nhầm lẫn</h4>
        <ul style="margin:0; padding-left:18px;">
          <li>Không dùng A (số khối) để xác định vị trí; chỉ dùng Z và cấu hình e.</li>
          <li>Khối d bắt đầu ở chu kỳ 4 (Sc), khối f ở chu kỳ 6 (La/Ac).</li>
          <li>Nhóm B không lấy số thứ tự nhóm làm số e hoá trị trực tiếp.</li>
        </ul>
      </div>
    </div>
  `,
  game: [
    {
      type: 'multiple-choice',
      question: 'Cơ sở sắp xếp các nguyên tố trong bảng tuần hoàn là?',
      options: ['Khối lượng nguyên tử tăng', 'Số proton tăng', 'Số nơtron tăng', 'Độ âm điện tăng'],
      correctAnswer: 1,
      explanation: 'BTH sắp theo số hiệu nguyên tử Z (số proton) tăng.'
    },
    {
      type: 'multiple-choice',
      question: 'Nguyên tố thuộc nhóm A có đặc điểm chung?',
      options: ['Cùng số lớp e', 'Cùng số e hoá trị', 'Cùng khối lượng mol', 'Cùng độ âm điện'],
      correctAnswer: 1,
      explanation: 'Nhóm A: số electron lớp ngoài cùng bằng số thứ tự nhóm.'
    },
    {
      type: 'true-false',
      question: 'Khối d gồm các nguyên tố có e cuối cùng vào phân lớp d.',
      correctAnswer: true,
      explanation: 'Đúng, đó là các nguyên tố chuyển tiếp.'
    }
  ]
};
