module.exports = {
  classId: 8,
  curriculumType: 'chantroicangtao',
  chapterId: 1,
  lessonId: 6,
  title: 'Bài 6: Tính theo phương trình hóa học',
  theory: `
    <h2>📐 Bài 6: Tính theo phương trình hóa học</h2>
    <p style="margin:10px 0; color:#334155;">Mục tiêu: dùng PTHH cân bằng để tính số mol/khối lượng/thể tích, nhận diện chất dư – chất hết.</p>

    <div style="display:grid; gap:12px; grid-template-columns:repeat(auto-fit,minmax(240px,1fr)); margin:14px 0;">
      <div style="padding:12px; border:1px solid #e2e8f0; border-radius:10px; background:#f8fafc;">
        <h4 style="margin:0 0 8px; color:#0f172a;">Cơ sở tính toán</h4>
        <ul style="margin:0; padding-left:18px; color:#475569;">
          <li>PTHH đã cân bằng cho tỉ lệ mol giữa các chất.</li>
          <li>Dùng quan hệ <strong>n = m/M</strong>, <strong>V = 22,4n</strong> (khí đktc).</li>
          <li>Từ tỉ lệ mol ⇒ suy ra khối lượng/thể tích.</li>
        </ul>
      </div>
      <div style="padding:12px; border:1px solid #e2e8f0; border-radius:10px; background:#ecfeff;">
        <h4 style="margin:0 0 8px; color:#0e7490;">Quy trình 4 bước</h4>
        <ol style="margin:0; padding-left:18px; color:#0f172a;">
          <li>Viết và cân bằng PTHH.</li>
          <li>Đổi dữ liệu về mol (n = m/M).</li>
          <li>Lập tỉ lệ mol theo hệ số PTHH.</li>
          <li>Quy đổi về khối lượng/thể tích cần tìm.</li>
        </ol>
      </div>
    </div>

    <div style="margin:16px 0; padding:14px; border-radius:12px; border:1px solid #cbd5e1; background:linear-gradient(135deg,#eef2ff,#f8fafc);">
      <h3 style="margin:0 0 8px; color:#312e81;">Ví dụ minh họa</h3>
      <ul style="margin:0; padding-left:18px; color:#334155;">
        <li>2H₂ + O₂ → 2H₂O: 2 mol H₂ sinh 2 mol H₂O.</li>
        <li>CaCO₃ → CaO + CO₂: 0,2 mol CaCO₃ ⇒ 0,2 mol CO₂ ⇒ m = 8,8 g.</li>
        <li>Zn + 2HCl → ZnCl₂ + H₂: từ n Zn tính n H₂ theo tỉ lệ 1:1.</li>
      </ul>
    </div>

    <div style="margin:14px 0; display:grid; gap:12px; grid-template-columns:repeat(auto-fit,minmax(240px,1fr));">
      <div style="padding:12px; border:1px solid #e2e8f0; border-radius:10px; background:#fff7ed;">
        <h4 style="margin:0 0 8px; color:#9a3412;">Mẹo & lưu ý</h4>
        <ul style="margin:0; padding-left:18px; color:#7c2d12;">
          <li>Đổi đơn vị ngay đầu bài.</li>
          <li>Kiểm tra chất dư bằng so sánh tỉ lệ mol thực tế / lý thuyết.</li>
          <li>Khí ở đktc dùng 22,4 L/mol.</li>
        </ul>
      </div>
      <div style="padding:12px; border:1px solid #e2e8f0; border-radius:10px; background:#f0f9ff;">
        <h4 style="margin:0 0 8px; color:#0f172a;">Mini quiz đọc nhanh</h4>
        <ol style="margin:0; padding-left:18px; color:#334155;">
          <li>2 mol H₂ tạo bao nhiêu mol H₂O?</li>
          <li>m 0,2 mol CaCO₃ (M=100) là bao nhiêu?</li>
          <li>Khí thu được 5,6 L ở đktc thì n bằng?</li>
        </ol>
        <p style="margin:8px 0 0; font-size:13px; color:#475569;">Tự trả lời rồi làm 10 câu test.</p>
      </div>
    </div>

    <div style="margin:16px 0; padding:12px; border:1px dashed #cbd5e1; border-radius:10px; background:#f8fafc; text-align:center; color:#475569;">
      <p style="margin:0 0 6px;"><strong>Placeholder hình/sơ đồ</strong>:</p>
      <p style="margin:0 0 4px;">Sơ đồ 4 bước tính PTHH: <em>/images/hoahoc/lesson6-steps.png</em></p>
      <p style="margin:0;">Bảng chuyển đổi n–m–V: <em>/images/hoahoc/lesson6-convert.png</em></p>
    </div>
  `,
  game: [
    {
      question: 'Phản ứng hóa học là gì?',
      options: ['Sự tan của chất trong nước', 'Quá trình biến đổi từ chất này sang chất khác', 'Sự thay đổi trạng thái', 'Sự bay hơi của chất lỏng'],
      correctAnswer: 1
    },
    {
      question: 'Dấu hiệu nào KHÔNG phải của phản ứng hóa học?',
      options: ['Có chất mới tạo thành', 'Có khí thoát ra', 'Nước đá tan chảy', 'Có kết tủa xuất hiện'],
      correctAnswer: 2
    },
    {
      question: 'Phản ứng 2H₂ + O₂ → 2H₂O thuộc loại:',
      options: ['Phản ứng phân hủy', 'Phản ứng hóa hợp', 'Phản ứng thế', 'Phản ứng trao đổi'],
      correctAnswer: 1
    },
    {
      question: 'Điều kiện để phản ứng hóa học xảy ra là:',
      options: ['Chỉ cần các chất tiếp xúc', 'Chỉ cần nhiệt độ cao', 'Các chất tiếp xúc và đủ điều kiện', 'Chỉ cần có xúc tác'],
      correctAnswer: 2
    },
    {
      question: 'Trong phản ứng CaCO₃ + 2HCl → CaCl₂ + H₂O + CO₂, hiện tượng quan sát được là:',
      options: ['Có màu xuất hiện', 'Có khí thoát ra', 'Có kết tủa', 'Không có hiện tượng gì'],
      correctAnswer: 1
    },
    {
      question: 'Tính theo phương trình hóa học cần căn cứ vào:',
      options: ['Tên chất', 'Hệ số tỉ lệ mol trong PTHH đã cân bằng', 'Màu sắc dung dịch', 'Trạng thái vật lý'],
      correctAnswer: 1
    },
    {
      question: 'Nếu 2 mol H₂ phản ứng hết với O₂, số mol H₂O thu được (PTHH: 2H₂ + O₂ → 2H₂O) là:',
      options: ['1 mol', '2 mol', '3 mol', '4 mol'],
      correctAnswer: 1
    },
    {
      question: 'Khối lượng CaCO₃ (M=100) cần để tạo 0,2 mol CO₂ theo PTHH CaCO₃ → CaO + CO₂ là:',
      options: ['10 g', '20 g', '40 g', '5 g'],
      correctAnswer: 1
    },
    {
      question: 'Bước đầu khi giải bài tính theo PTHH là:',
      options: ['Đổi đơn vị trước, không cần PTHH', 'Viết và cân bằng phương trình phản ứng', 'Tính khối lượng sản phẩm ngay', 'Bỏ qua chất dư/thừa'],
      correctAnswer: 1
    },
    {
      question: 'Muốn biết chất nào dư thiếu, cần:',
      options: ['Chỉ nhìn khối lượng', 'So sánh tỉ lệ mol thực tế với tỉ lệ mol theo PTHH', 'Chọn ngẫu nhiên', 'Bỏ qua vì không ảnh hưởng'],
      correctAnswer: 1
    }
  ]
};
