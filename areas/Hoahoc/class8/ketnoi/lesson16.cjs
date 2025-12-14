module.exports = {
  classId: 8,
  curriculumType: 'ketnoi',
  chapterId: 4,
  lessonId: 16,
  title: 'Dung dịch',
  theory: `
    <h2>Bài 16: Dung dịch</h2>
    
    <h3>1. Khái niệm dung dịch</h3>
    <p><strong>Dung dịch</strong> là hỗn hợp đồng nhất của hai hay nhiều chất.</p>
    
    <p>Dung dịch gồm:</p>
    <ul>
      <li><strong>Dung môi:</strong> chất có khối lượng lớn hơn (thường là nước)</li>
      <li><strong>Chất tan:</strong> chất có khối lượng nhỏ hơn</li>
    </ul>
    
    <h3>2. Phân loại dung dịch</h3>
    <p>Theo trạng thái:</p>
    <ul>
      <li><strong>Dung dịch lỏng:</strong> nước đường, nước muối...</li>
      <li><strong>Dung dịch rắn:</strong> hợp kim (đồng thau, thép...)</li>
      <li><strong>Dung dịch khí:</strong> không khí</li>
    </ul>
    
    <h3>3. Sự tan</h3>
    <p><strong>Sự tan</strong> là quá trình một chất phân tán đồng nhất vào dung môi tạo thành dung dịch.</p>
    
    <h4>Các yếu tố ảnh hưởng đến sự tan:</h4>
    <ul>
      <li><strong>Nhiệt độ:</strong> Hầu hết chất rắn tan nhiều hơn khi tăng nhiệt độ</li>
      <li><strong>Khuấy trộn:</strong> Khuấy giúp chất tan nhanh hơn</li>
      <li><strong>Diện tích tiếp xúc:</strong> Chất rắn dạng bột tan nhanh hơn dạng cục</li>
    </ul>
    
    <h3>4. Độ tan (S)</h3>
    <p><strong>Độ tan</strong> của một chất trong nước là số gam chất đó tan tối đa trong 100g nước ở nhiệt độ xác định.</p>
    
    <p>Ví dụ: Ở 20°C, độ tan của muối ăn (NaCl) là 36g</p>
    <p>→ Có thể hòa tan tối đa 36g NaCl vào 100g nước ở 20°C</p>
    
    <h3>5. Dung dịch bão hòa và chưa bão hòa</h3>
    <ul>
      <li><strong>Dung dịch bão hòa:</strong> Dung dịch không thể hòa tan thêm chất tan ở nhiệt độ đó</li>
      <li><strong>Dung dịch chưa bão hòa:</strong> Dung dịch vẫn còn hòa tan thêm chất tan được</li>
    </ul>
    
    <h3>6. Ứng dụng</h3>
    <ul>
      <li>Pha chế thuốc, dung dịch hóa chất</li>
      <li>Nấu ăn (nước mắm, nước đường...)</li>
      <li>Sản xuất công nghiệp</li>
      <li>Chiết xuất chất từ nguyên liệu thiên nhiên</li>
    </ul>
  `,
  game: [
    {
      question: 'Dung dịch là gì?',
      options: ['Hỗn hợp của hai chất', 'Hỗn hợp đồng nhất của hai hay nhiều chất', 'Chất lỏng', 'Chất tan trong nước'],
      correctAnswer: 1
    },
    {
      question: 'Trong dung dịch nước muối, dung môi là:',
      options: ['Muối', 'Nước', 'Cả muối và nước', 'Không có dung môi'],
      correctAnswer: 1
    },
    {
      question: 'Yếu tố nào KHÔNG ảnh hưởng đến tốc độ tan?',
      options: ['Nhiệt độ', 'Khuấy trộn', 'Ánh sáng', 'Diện tích tiếp xúc'],
      correctAnswer: 2
    },
    {
      question: 'Độ tan của NaCl ở 20°C là 36g nghĩa là:',
      options: ['36g NaCl tan trong 1 lít nước', '36g NaCl tan trong 100g nước', '100g NaCl tan trong 36g nước', '36g NaCl tan trong 36g nước'],
      correctAnswer: 1
    },
    {
      question: 'Dung dịch bão hòa là dung dịch:',
      options: ['Có nhiều chất tan', 'Không thể hòa tan thêm chất tan ở nhiệt độ đó', 'Có ít chất tan', 'Không có chất tan'],
      correctAnswer: 1
    }
  ]
};
