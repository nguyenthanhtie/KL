module.exports = {
  classId: 10,
  curriculumType: 'ketnoi',
  chapterId: 3,
  chapterName: 'Chương 3: Liên kết hóa học',
  lessonId: 10,
  title: 'Bài 10: Quy tắc octet',
  description: 'Quy tắc octet, ngoại lệ và ứng dụng dự đoán liên kết/hoá trị.',
  level: 'Beginner',
  order: 1,
  theory: `
    <h2>Quy tắc octet</h2>
    <p style="margin:10px 0; color:#334155;">Mục tiêu: hiểu bản chất quy tắc octet, nhận diện ngoại lệ (thiếu/giãn), vận dụng viết Lewis và dự đoán loại liên kết.</p>

    <div style="display:grid; gap:12px; grid-template-columns:repeat(auto-fit,minmax(250px,1fr)); margin:12px 0;">
      <div style="padding:12px; border:1px solid #e2e8f0; border-radius:10px; background:#f8fafc;">
        <h4 style="margin:0 0 6px; color:#0f172a;">Nội dung quy tắc</h4>
        <ul style="margin:0; padding-left:18px; color:#475569;">
          <li>Nguyên tử có xu hướng đạt 8e lớp ngoài (He ổn định với 2e).</li>
          <li>Thực hiện bằng nhường/nhận e (tạo ion) hoặc dùng chung e (cộng hoá trị).</li>
          <li>Ứng dụng: dự đoán công thức Lewis, hoá trị, kiểu liên kết.</li>
        </ul>
      </div>
      <div style="padding:12px; border:1px solid #e2e8f0; border-radius:10px; background:#fff7ed;">
        <h4 style="margin:0 0 6px; color:#9a3412;">Ngoại lệ thường gặp</h4>
        <ul style="margin:0; padding-left:18px; color:#7c2d12;">
          <li>Thiếu octet: H (2e), Be (4e), B (6e), phân tử e lẻ (NO).</li>
          <li>Giãn octet (chu kỳ ≥ 3, có obitan trống d): PCl5 (10e), SF6 (12e), SO3 (12e).</li>
          <li>Hạn chế: nguyên tố chu kỳ 2 không giãn octet (C, N, O, F).</li>
        </ul>
      </div>
    </div>

    <div style="display:grid; gap:12px; grid-template-columns:repeat(auto-fit,minmax(260px,1fr)); margin:12px 0;">
      <div style="padding:12px; border-radius:12px; border:1px solid #cbd5e1; background:linear-gradient(135deg,#eef2ff,#f8fafc);">
        <h4 style="margin:0 0 6px; color:#312e81;">Cách viết nhanh công thức Lewis</h4>
        <ol style="margin:0; padding-left:18px; color:#334155;">
          <li>Tính tổng e hoá trị (điều chỉnh theo điện tích).</li>
          <li>Chọn nguyên tử trung tâm (thường kém âm điện, không phải H, F).</li>
          <li>Vẽ liên kết đơn trước, phân bổ e còn lại cho nguyên tử ngoài, sau đó trung tâm.</li>
          <li>Thiếu octet → tăng bậc liên kết (đôi/ba) nếu cần; kiểm tra điện tích hình thức hợp lí.</li>
        </ol>
      </div>
      <div style="padding:12px; border:1px dashed #cbd5e1; border-radius:10px; background:#f8fafc; color:#475569;">
        <h4 style="margin:0 0 6px;">Tránh nhầm lẫn</h4>
        <ul style="margin:0; padding-left:18px;">
          <li>Không cố ép B, Be lên 8e trong BF3, BeCl2; chúng chấp nhận thiếu.</li>
          <li>Chu kỳ 2 không mở rộng lên 10e/12e.</li>
          <li>Gốc tự do (NO, NO2) không thể đủ 8e cho mọi nguyên tử.</li>
        </ul>
      </div>
    </div>
  `,
  game: [
    {
      type: 'multiple-choice',
      question: 'Quy tắc octet nói về?',
      options: ['8 proton trong hạt nhân', '8 electron lớp ngoài cùng', '8 nơtron', '8 liên kết cộng hóa trị'],
      correctAnswer: 1,
      explanation: 'Octet: đạt 8 e lớp ngoài như khí hiếm.',
      points: 10
    },
    {
      type: 'multiple-choice',
      question: 'Nguyên tử Na tuân theo octet bằng cách?',
      options: ['Nhận 1e', 'Nhường 1e', 'Dùng chung 1e', 'Không thay đổi'],
      correctAnswer: 1,
      explanation: 'Na (1s2 2s2 2p6 3s1) nhường 1e → Na+ đạt cấu hình Ne.',
      points: 10
    },
    {
      type: 'true-false',
      question: 'Tất cả nguyên tố đều tuân thủ tuyệt đối quy tắc octet.',
      correctAnswer: false,
      explanation: 'Có ngoại lệ: B, Be thiếu octet; P, S có thể mở rộng lên 10,12e.',
      points: 10
    },
    {
      type: 'multiple-choice',
      question: 'Nguyên tử Be (Z=4) thường tạo liên kết nào để ổn định?',
      options: ['Nhường 4e', 'Nhận 4e', 'Dùng chung 2e tạo 4e lớp ngoài (thiếu octet)', 'Luôn đạt 8e'],
      correctAnswer: 2,
      explanation: 'Be thường tạo liên kết cộng hoá trị, đạt 4e lớp ngoài (ngoại lệ thiếu octet).',
      points: 10
    },
    {
      type: 'multiple-choice',
      question: 'SO2 hay SO3 thỏa mãn octet cho S?',
      options: ['Cả hai đều 8e', 'SO2 mở rộng lên 10e', 'SO3 mở rộng lên 12e', 'SO2 10e, SO3 12e (giãn octet)'],
      correctAnswer: 3,
      explanation: 'S chu kỳ 3 có thể dùng obitan trống mở rộng octet: SO2 ~10e, SO3 ~12e.',
      points: 10
    },
    {
      type: 'multiple-choice',
      question: 'Phân tử nào vi phạm octet do thiếu e?',
      options: ['CO2', 'BF3', 'CH4', 'H2O'],
      correctAnswer: 1,
      explanation: 'BF3: B chỉ có 6e lớp ngoài.',
      points: 10
    },
    {
      type: 'multiple-choice',
      question: 'Khí hiếm He ổn định với:',
      options: ['2e lớp ngoài', '4e lớp ngoài', '6e lớp ngoài', '8e lớp ngoài'],
      correctAnswer: 0,
      explanation: 'He là ngoại lệ, bền với 2e lớp K.',
      points: 10
    },
    {
      type: 'true-false',
      question: 'Khi nguyên tử nhường/nhận e để đạt octet, liên kết ion có thể hình thành.',
      correctAnswer: true,
      explanation: 'Trao đổi e → cation/anion → liên kết ion.',
      points: 10
    },
    {
      type: 'multiple-choice',
      question: 'Liên kết cộng hoá trị giúp thỏa mãn octet bằng cách:',
      options: ['Chia sẻ cặp e chung', 'Nhường e', 'Nhận e', 'Không liên quan tới e'],
      correctAnswer: 0,
      explanation: 'Các nguyên tử dùng chung cặp e để đạt 8e lớp ngoài.',
      points: 10
    },
    {
      type: 'multiple-choice',
      question: 'Phân tử có số electron lẻ (NO) xử lý octet thế nào?',
      options: ['Luôn phá vỡ hình học', 'Một nguyên tử không đủ 8e (radical)', 'Bổ sung e từ môi trường', 'Không tồn tại bền'],
      correctAnswer: 1,
      explanation: 'NO có 11e → một nguyên tử (N) không đủ 8e, dạng tự do gốc tự do.',
      points: 10
    }
  ]
};
