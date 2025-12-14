module.exports = {
  classId: 8,
  curriculumType: 'chantroicangtao',
  chapterId: 1,
  chapterName: "Chủ đề 1: Phản ứng hóa học",
  lessonId: 4,
  title: 'Bài 4: Định luật bảo toàn khối lượng và phương trình hóa học',
  order: 4,
  theory: `
    <h2>⚖️ Bài 4: Định luật bảo toàn khối lượng & phương trình hóa học</h2>
    <p style="margin:10px 0; color:#334155;">Mục tiêu: nắm phát biểu định luật, cách viết/cân bằng PTHH và ứng dụng tính khối lượng.</p>

    <div style="display:grid; gap:12px; grid-template-columns:repeat(auto-fit,minmax(240px,1fr)); margin:14px 0;">
      <div style="padding:12px; border:1px solid #e2e8f0; border-radius:10px; background:#f8fafc;">
        <h4 style="margin:0 0 8px; color:#0f172a;">Định luật bảo toàn khối lượng</h4>
        <p style="margin:0 0 8px; color:#475569;"><strong>Tổng khối lượng chất tham gia = tổng khối lượng sản phẩm</strong> (trong hệ kín).</p>
        <ul style="margin:0; padding-left:18px; color:#475569;">
          <li>Dựa trên bảo toàn số nguyên tử mỗi nguyên tố.</li>
          <li>Áp dụng cho mọi phản ứng trong hệ kín.</li>
        </ul>
      </div>
      <div style="padding:12px; border:1px solid #e2e8f0; border-radius:10px; background:#ecfeff;">
        <h4 style="margin:0 0 8px; color:#0e7490;">Phương trình hóa học (PTHH)</h4>
        <ul style="margin:0; padding-left:18px; color:#0f172a;">
          <li>Biểu diễn phản ứng bằng công thức hóa học.</li>
          <li>Cần <strong>cân bằng</strong> để bảo toàn nguyên tử.</li>
          <li>Ví dụ: 2H₂ + O₂ → 2H₂O.</li>
        </ul>
      </div>
    </div>

    <div style="margin:16px 0; padding:14px; border-radius:12px; border:1px solid #cbd5e1; background:linear-gradient(135deg,#eef2ff,#f8fafc);">
      <h3 style="margin:0 0 8px; color:#312e81;">Quy trình cân bằng PTHH</h3>
      <ol style="margin:0; padding-left:18px; color:#334155;">
        <li>Viết sơ đồ phản ứng, xác định chất tham gia/sản phẩm.</li>
        <li>Chọn hệ số sao cho số nguyên tử từng nguyên tố hai vế bằng nhau.</li>
        <li>Kiểm tra lại tổng khối lượng theo hệ số mol.</li>
      </ol>
      <p style="margin:10px 0 0; color:#475569;">Ví dụ: Đốt 12 g C thu 44 g CO₂ ⇒ m(O₂) = 44 − 12 = 32 g.</p>
    </div>

    <div style="margin:14px 0; display:grid; gap:12px; grid-template-columns:repeat(auto-fit,minmax(240px,1fr));">
      <div style="padding:12px; border:1px solid #e2e8f0; border-radius:10px; background:#fff7ed;">
        <h4 style="margin:0 0 8px; color:#9a3412;">Ghi nhớ nhanh</h4>
        <ul style="margin:0; padding-left:18px; color:#7c2d12;">
          <li>Cân bằng trước, tính toán sau.</li>
          <li>Hệ số PTHH thể hiện tỉ lệ mol.</li>
          <li>Kiểm tra nguyên tử và khối lượng để tránh sai sót.</li>
        </ul>
      </div>
      <div style="padding:12px; border:1px solid #e2e8f0; border-radius:10px; background:#f0f9ff;">
        <h4 style="margin:0 0 8px; color:#0f172a;">Mini quiz đọc nhanh</h4>
        <ol style="margin:0; padding-left:18px; color:#334155;">
          <li>Tổng khối lượng hai vế có thể khác nhau không?</li>
          <li>Hệ số 2 trong 2H₂O biểu diễn điều gì?</li>
          <li>Đốt 5,6 g Fe (M=56) cần bao nhiêu g O₂ nếu thu Fe₂O₃?</li>
        </ol>
        <p style="margin:8px 0 0; font-size:13px; color:#475569;">Tự kiểm tra rồi làm 10 câu test.</p>
      </div>
    </div>

    <div style="margin:16px 0; padding:12px; border:1px dashed #cbd5e1; border-radius:10px; background:#f8fafc; text-align:center; color:#475569;">
      <p style="margin:0 0 6px;"><strong>Placeholder hình/sơ đồ</strong>:</p>
      <p style="margin:0 0 4px;">Sơ đồ cân bằng PTHH: <em>/images/hoahoc/lesson4-balancing.png</em></p>
      <p style="margin:0;">Minh họa bảo toàn khối lượng: <em>/images/hoahoc/lesson4-mass.png</em></p>
    </div>
  `,
  game: [
    {
      question: 'Định luật bảo toàn khối lượng phát biểu:',
      options: ['m tham gia = 0', 'm tham gia = m sản phẩm', 'm sản phẩm gấp đôi', 'm giảm dần'],
      correctAnswer: 1
    },
    {
      question: 'Phương trình 2H₂ + O₂ → 2H₂O đã cân bằng vì:',
      options: ['H không bằng', 'O không bằng', 'Số nguyên tử H, O hai vế bằng nhau', 'Không có hệ số'],
      correctAnswer: 2
    },
    {
      question: 'Đốt 12 g C thu 44 g CO₂. Khối lượng O₂ phản ứng là:',
      options: ['12 g', '32 g', '44 g', '56 g'],
      correctAnswer: 1
    },
    {
      question: 'Bước quan trọng khi viết PTHH là:',
      options: ['Ghi tên phản ứng', 'Cân bằng số nguyên tử', 'Bỏ hệ số', 'Chỉ cần sản phẩm'],
      correctAnswer: 1
    },
    {
      question: 'Định luật bảo toàn khối lượng áp dụng cho:',
      options: ['Mọi biến đổi', 'Phản ứng hóa học trong hệ kín', 'Chỉ phản ứng tỏa nhiệt', 'Chỉ chất rắn'],
      correctAnswer: 1
    },
    {
      question: 'Khi cân bằng phương trình, mục tiêu là:',
      options: ['Số nguyên tử mỗi nguyên tố hai vế bằng nhau', 'Tăng hệ số lớn nhất', 'Đổi tên chất', 'Thêm sản phẩm mới'],
      correctAnswer: 0
    },
    {
      question: 'Hệ số trong PTHH biểu thị:',
      options: ['Số hạt', 'Số mol tỉ lệ các chất', 'Khối lượng tuyệt đối', 'Thể tích cố định'],
      correctAnswer: 1
    },
    {
      question: 'Đốt 5,6 g Fe (M=56) hoàn toàn thành Fe₂O₃. Khối lượng O tham gia là gần nhất:',
      options: ['1,6 g', '2,4 g', '4,8 g', '8,0 g'],
      correctAnswer: 1
    },
    {
      question: 'Trong phản ứng Zn + 2HCl → ZnCl₂ + H₂, tổng khối lượng hai vế:',
      options: ['Vế trái lớn hơn', 'Vế phải lớn hơn', 'Bằng nhau', 'Không xác định'],
      correctAnswer: 2
    },
    {
      question: 'Bước kiểm tra sau khi cân bằng PTHH là:',
      options: ['Đổi tên chất', 'So sánh tổng nguyên tử từng nguyên tố và khối lượng tương đối hai vế', 'Xóa hệ số', 'Thêm chất xúc tác'],
      correctAnswer: 1
    }
  ]
};
