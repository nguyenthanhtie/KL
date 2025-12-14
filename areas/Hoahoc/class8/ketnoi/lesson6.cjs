module.exports = {
  classId: 8,
  curriculumType: 'ketnoi',
  chapterId: 1,
  lessonId: 6,
  title: 'Phản ứng hóa học',
  theory: `
    <h2>Bài 6: Phản ứng hóa học</h2>
    
    <h3>1. Định nghĩa phản ứng hóa học</h3>
    <p><strong>Phản ứng hóa học</strong> là quá trình biến đổi từ chất này thành chất khác.</p>
    
    <h3>2. Dấu hiệu nhận biết phản ứng hóa học</h3>
    <ul>
      <li>Có chất mới tạo thành (khác với chất ban đầu)</li>
      <li>Có sự thay đổi màu sắc</li>
      <li>Có khí thoát ra</li>
      <li>Có kết tủa xuất hiện</li>
      <li>Tỏa nhiệt hoặc thu nhiệt</li>
      <li>Phát sáng</li>
    </ul>
    
    <h3>3. Điều kiện xảy ra phản ứng hóa học</h3>
    <p>Để phản ứng hóa học xảy ra cần:</p>
    <ul>
      <li>Các chất tiếp xúc với nhau</li>
      <li>Đủ điều kiện: nhiệt độ, áp suất, xúc tác...</li>
    </ul>
    
    <h3>4. Ví dụ về phản ứng hóa học</h3>
    <div class="example">
      <h4>a) Sắt cháy trong không khí:</h4>
      <p>3Fe + 2O₂ → Fe₃O₄</p>
      <p>Hiện tượng: sắt cháy sáng, tạo chất rắn màu đen</p>
      
      <h4>b) Cho acid vào đá vôi:</h4>
      <p>CaCO₃ + 2HCl → CaCl₂ + H₂O + CO₂↑</p>
      <p>Hiện tượng: có khí CO₂ thoát ra, sủi bọt</p>
      
      <h4>c) Phản ứng trung hòa:</h4>
      <p>NaOH + HCl → NaCl + H₂O</p>
      <p>Hiện tượng: dung dịch nóng lên (tỏa nhiệt)</p>
    </div>
    
    <h3>5. Phân loại phản ứng hóa học</h3>
    <ul>
      <li><strong>Phản ứng hóa hợp</strong>: A + B → AB</li>
      <li><strong>Phản ứng phân hủy</strong>: AB → A + B</li>
      <li><strong>Phản ứng thế</strong>: AB + C → AC + B</li>
      <li><strong>Phản ứng trao đổi</strong>: AB + CD → AD + CB</li>
    </ul>
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
    }
  ]
};
