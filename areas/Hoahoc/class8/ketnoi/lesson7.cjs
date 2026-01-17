module.exports = {
  classId: 8,
  curriculumType: 'ketnoi',
  chapterId: 2,
  chapterName: "Chương 2: Phản ứng hóa học",
  lessonId: 7,
  title: 'Bài 7: Tốc độ phản ứng và chất xúc tác',
  theory: `
    <h2>🚀 Bài 7: Tốc độ phản ứng và chất xúc tác</h2>
    <p style="margin:10px 0; color:#334155;">Mục tiêu: hiểu tốc độ phản ứng, yếu tố ảnh hưởng và vai trò của xúc tác.</p>

    <div style="display:grid; gap:12px; grid-template-columns:repeat(auto-fit,minmax(240px,1fr)); margin:14px 0;">
      <div style="padding:12px; border:1px solid #e2e8f0; border-radius:10px; background:#f8fafc;">
        <h4 style="margin:0 0 8px; color:#0f172a;">Tốc độ phản ứng</h4>
        <p style="margin:0 0 8px; color:#475569;">Mức độ biến đổi nồng độ chất theo thời gian.</p>
        <ul style="margin:0; padding-left:18px; color:#475569;">
          <li>Nồng độ ↑ ⇒ tốc độ ↑.</li>
          <li>Nhiệt độ ↑ ⇒ tốc độ ↑ (hạt va chạm mạnh hơn).</li>
          <li>Diện tích tiếp xúc ↑ (nghiền mịn) ⇒ tốc độ ↑.</li>
        </ul>
      </div>
      <div style="padding:12px; border:1px solid #e2e8f0; border-radius:10px; background:#ecfeff;">
        <h4 style="margin:0 0 8px; color:#0e7490;">Chất xúc tác</h4>
        <ul style="margin:0; padding-left:18px; color:#0f172a;">
          <li>Thay đổi tốc độ (thường làm tăng), <strong>không bị tiêu hao</strong>.</li>
          <li>Giảm năng lượng hoạt hóa, thay đổi cơ chế.</li>
          <li>Ví dụ: MnO₂ (phân hủy KClO₃), V₂O₅ (H₂SO₄), enzym trong cơ thể.</li>
        </ul>
      </div>
    </div>

    <div style="margin:16px 0; padding:14px; border-radius:12px; border:1px solid #cbd5e1; background:linear-gradient(135deg,#eef2ff,#f8fafc);">
      <h3 style="margin:0 0 8px; color:#312e81;">Ứng dụng</h3>
      <ul style="margin:0; padding-left:18px; color:#334155;">
        <li>Công nghiệp: V₂O₅ (tiếp xúc H₂SO₄), Ni (hidro hóa dầu).</li>
        <li>Đời sống: men tiêu hóa; làm lạnh thực phẩm để giảm tốc độ phân hủy.</li>
      </ul>
    </div>

    <div style="margin:14px 0; display:grid; gap:12px; grid-template-columns:repeat(auto-fit,minmax(240px,1fr));">
      <div style="padding:12px; border:1px solid #e2e8f0; border-radius:10px; background:#fff7ed;">
        <h4 style="margin:0 0 8px; color:#9a3412;">Ghi nhớ nhanh</h4>
        <ul style="margin:0; padding-left:18px; color:#7c2d12;">
          <li>Nhiệt độ, nồng độ, diện tích tiếp xúc, xúc tác là 4 đòn bẩy.</li>
          <li>Xúc tác không làm đổi cân bằng khối lượng sản phẩm.</li>
          <li>Giảm nhiệt độ để làm chậm hư hỏng thực phẩm.</li>
        </ul>
      </div>
      <div style="padding:12px; border:1px solid #e2e8f0; border-radius:10px; background:#f0f9ff;">
        <h4 style="margin:0 0 8px; color:#0f172a;">Mini quiz đọc nhanh</h4>
        <ol style="margin:0; padding-left:18px; color:#334155;">
          <li>Vì sao nghiền bột giúp phản ứng nhanh?</li>
          <li>Xúc tác có bị tiêu hao không?</li>
          <li>Biện pháp đơn giản để làm chậm phản ứng phân hủy thực phẩm?</li>
        </ol>
        <p style="margin:8px 0 0; font-size:13px; color:#475569;">Tự trả lời trước khi làm test 10 câu.</p>
      </div>
    </div>
  `,
  game: [
    {
      question: 'Yếu tố nào không làm tăng tốc độ phản ứng?',
      options: ['Tăng nhiệt độ', 'Tăng nồng độ', 'Giảm diện tích tiếp xúc', 'Dùng xúc tác'],
      correctAnswer: 2
    },
    {
      question: 'Chất xúc tác là:',
      options: ['Chất bị tiêu hao', 'Chất làm tăng tốc độ và không bị tiêu hao sau phản ứng', 'Chất làm giảm khối lượng', 'Chất sản phẩm'],
      correctAnswer: 1
    },
    {
      question: 'Tăng diện tích tiếp xúc nghĩa là:',
      options: ['Dùng khối rắn lớn', 'Nghiền nhỏ chất rắn', 'Giảm nồng độ', 'Hạ nhiệt độ'],
      correctAnswer: 1
    },
    {
      question: 'Ví dụ về xúc tác vô cơ:',
      options: ['Men amylase', 'MnO₂ trong phân hủy KClO₃', 'Ánh sáng Mặt Trời', 'Nước'],
      correctAnswer: 1
    },
    {
      question: 'Để giảm tốc độ hư hỏng thực phẩm, biện pháp hiệu quả là:',
      options: ['Tăng nhiệt', 'Giảm nhiệt (bảo quản lạnh)', 'Tăng pH', 'Thêm kim loại'],
      correctAnswer: 1
    },
    {
      question: 'Tăng nhiệt độ thường làm phản ứng:',
      options: ['Chậm hơn', 'Nhanh hơn', 'Không đổi', 'Dừng lại'],
      correctAnswer: 1
    },
    {
      question: 'Ví dụ xúc tác sinh học là:',
      options: ['MnO₂', 'Enzym/men tiêu hóa', 'V₂O₅', 'Fe₂O₃'],
      correctAnswer: 1
    },
    {
      question: 'Để tăng tốc độ phản ứng rắn – dung dịch, nên:',
      options: ['Dùng khối rắn lớn', 'Nghiền mịn rắn để tăng diện tích tiếp xúc', 'Giảm nhiệt độ', 'Pha loãng tối đa'],
      correctAnswer: 1
    },
    {
      question: 'Phát biểu đúng về xúc tác:',
      options: ['Thay đổi cơ chế, giảm năng lượng hoạt hóa', 'Tạo sản phẩm khác', 'Luôn là kim loại', 'Chỉ dùng cho phản ứng phân hủy'],
      correctAnswer: 0
    },
    {
      question: 'Trong công nghiệp H₂SO₄ tiếp xúc, xúc tác dùng là:',
      options: ['V₂O₅', 'MnO₂', 'Ni', 'Ag'],
      correctAnswer: 0
    }
  ]
};
