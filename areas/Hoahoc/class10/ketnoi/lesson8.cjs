module.exports = {
  classId: 10,
  curriculumType: 'ketnoi',
  chapterId: 2,
  chapterName: 'Chương 2: Bảng tuần hoàn các nguyên tố hóa học và định luật tuần hoàn',
  lessonId: 8,
  title: 'Bài 8: Định luật tuần hoàn. Ý nghĩa của bảng tuần hoàn các nguyên tố hóa học',
  description: 'Định luật tuần hoàn và cách dự đoán tính chất từ vị trí trong bảng tuần hoàn.',
  level: 'Intermediate',
  order: 4,
  theory: `
    <h2>Định luật tuần hoàn</h2>
    <p style="margin:10px 0; color:#334155;">Tính chất nguyên tố biến đổi tuần hoàn theo chiều tăng của Z vì cấu hình e lớp ngoài lặp lại. Bản chất: khi Z tăng thêm 1, thêm 1 e theo thứ tự năng lượng → lặp lại kiểu cấu hình sau mỗi chu kỳ.</p>

    <div style="display:grid; gap:12px; grid-template-columns:repeat(auto-fit,minmax(240px,1fr)); margin:12px 0;">
      <div style="padding:12px; border:1px solid #e2e8f0; border-radius:10px; background:#f8fafc;">
        <h4 style="margin:0 0 6px; color:#0f172a;">Liên hệ vị trí → tính chất</h4>
        <ul style="margin:0; padding-left:18px; color:#475569;">
          <li>Nhóm: số e hoá trị (nhóm A) → hoá trị, số oxi hoá cao nhất, kiểu oxit/hiđroxit.</li>
          <li>Chu kỳ: số lớp e → kích thước, IE, EN biến đổi đều; chu kỳ dài có thêm khối d, f.</li>
          <li>Khối: phân lớp điền cuối (s/p/d/f) → dự đoán mức độ kim loại, khả năng tạo phức (khối d, f).</li>
        </ul>
      </div>
      <div style="padding:12px; border:1px solid #e2e8f0; border-radius:10px; background:#fff7ed;">
        <h4 style="margin:0 0 6px; color:#9a3412;">Ý nghĩa thực tiễn</h4>
        <ul style="margin:0; padding-left:18px; color:#7c2d12;">
          <li>Dự đoán tính chất nguyên tố/hợp chất chưa điều chế.</li>
          <li>Chọn nguyên tố thay thế trong vật liệu (ví dụ cùng nhóm halogen, kim loại kiềm thổ).</li>
          <li>Hiểu xu hướng oxi hóa/khử để chọn chất oxi hóa/khử phù hợp.</li>
        </ul>
      </div>
    </div>

    <div style="display:grid; gap:12px; grid-template-columns:repeat(auto-fit,minmax(260px,1fr)); margin:12px 0;">
      <div style="padding:12px; border-radius:12px; border:1px solid #cbd5e1; background:linear-gradient(135deg,#eef2ff,#f8fafc);">
        <h4 style="margin:0 0 6px; color:#312e81;">Cách suy luận nhanh</h4>
        <ul style="margin:0; padding-left:18px; color:#334155;">
          <li>Từ cấu hình ngoài ns2 np1 → nhóm IIIA, chu kỳ = n.</li>
          <li>Từ vị trí nhóm/chu kỳ → viết cấu hình e và hoá trị cao nhất.</li>
          <li>Nhóm càng phải (phi kim) → oxit càng axit, tính oxi hóa càng mạnh.</li>
        </ul>
      </div>
      <div style="padding:12px; border:1px dashed #cbd5e1; border-radius:10px; background:#f8fafc; color:#475569;">
        <h4 style="margin:0 0 6px;">Tránh nhầm lẫn</h4>
        <ul style="margin:0; padding-left:18px;">
          <li>Không dùng khối lượng nguyên tử để sắp xếp; dùng Z.</li>
          <li>Số oxi hóa cao nhất của nhóm chính = số thứ tự nhóm (trừ khí hiếm thường 0, F tối đa +1).</li>
          <li>Chu kỳ 6,7 có 32 nguyên tố vì có dãy lantan/actini (khối f) chen vào.</li>
        </ul>
      </div>
    </div>
  `,
  game: [
    {
      type: 'multiple-choice',
      question: 'Định luật tuần hoàn gắn với đại lượng cơ sở nào?',
      options: ['Khối lượng nguyên tử', 'Số nơtron', 'Số hiệu nguyên tử Z', 'Số electron hoá trị'],
      correctAnswer: 2,
      explanation: 'Biến đổi tuần hoàn theo Z tăng dần.',
      points: 10
    },
    {
      type: 'multiple-choice',
      question: 'Từ vị trí nhóm, có thể suy ra điều gì?',
      options: ['Số lớp e', 'Số e hoá trị (nhóm A)', 'Khối lượng mol', 'Bán kính nguyên tử chính xác'],
      correctAnswer: 1,
      explanation: 'Nhóm A: số e hoá trị = số thứ tự nhóm.',
      points: 10
    },
    {
      type: 'true-false',
      question: 'Bảng tuần hoàn cho phép dự đoán tính chất của nguyên tố chưa biết.',
      correctAnswer: true,
      explanation: 'Ý nghĩa lịch sử: Mendeleev dự đoán Ga, Ge...',
      points: 10
    },
    {
      type: 'multiple-choice',
      question: 'Định luật tuần hoàn phát biểu ngắn gọn:',
      options: ['Tính chất lặp lại theo khối lượng', 'Tính chất biến đổi tuần hoàn theo Z', 'Tính chất ngẫu nhiên theo Z', 'Tính chất không phụ thuộc Z'],
      correctAnswer: 1,
      explanation: 'Bản chất: phụ thuộc cấu hình e lớp ngoài lặp lại khi Z tăng.',
      points: 10
    },
    {
      type: 'multiple-choice',
      question: 'Nguyên tố thuộc chu kỳ 4, nhóm VIIA có:',
      options: ['4 lớp e, 7 e hoá trị', '7 lớp e, 4 e hoá trị', '4 e hoá trị, 7 lớp e', '7 e hoá trị, 5 lớp e'],
      correctAnswer: 0,
      explanation: 'Chu kỳ 4 → 4 lớp e; nhóm VIIA → 7 e hoá trị.',
      points: 10
    },
    {
      type: 'multiple-choice',
      question: 'Khi biết cấu hình ngoài ns2 np1, có thể dự đoán vị trí:',
      options: ['Nhóm IA', 'Nhóm IIA', 'Nhóm IIIA', 'Nhóm IVA'],
      correctAnswer: 2,
      explanation: '3 e hoá trị → nhóm 13 (IIIA).',
      points: 10
    },
    {
      type: 'true-false',
      question: 'Hai nguyên tố cùng nhóm thường có tính chất hóa học gần giống nhau.',
      correctAnswer: true,
      explanation: 'Do cùng số e hoá trị và kiểu cấu hình ngoài.',
      points: 10
    },
    {
      type: 'multiple-choice',
      question: 'Ý nghĩa thực tiễn của bảng tuần hoàn là:',
      options: ['Không dùng nữa', 'Dự đoán tính chất, hoá trị, vật liệu mới', 'Chỉ dùng để tra khối lượng', 'Chỉ dùng ở chương trình lớp 10'],
      correctAnswer: 1,
      explanation: 'BTH là công cụ dự đoán, thiết kế hoá chất, vật liệu.',
      points: 10
    },
    {
      type: 'multiple-choice',
      question: 'Câu đúng về chu kỳ:',
      options: ['Chu kỳ dài luôn 18 nguyên tố', 'Chu kỳ 6,7 có 32 nguyên tố do thêm khối f', 'Chu kỳ 2 có 10 nguyên tố', 'Chu kỳ 3 có 18 nguyên tố'],
      correctAnswer: 1,
      explanation: 'Chu kỳ 6,7 dài vì có xen khối f (lantan/actini).',
      points: 10
    },
    {
      type: 'true-false',
      question: 'Độ âm điện là đại lượng tuần hoàn, tăng dần trong một chu kỳ.',
      correctAnswer: true,
      explanation: 'Z hiệu dụng tăng → hút e mạnh hơn → độ âm điện tăng.',
      points: 10
    }
  ]
};
