module.exports = {
  classId: 8,
  curriculumType: 'ketnoi',
  chapterId: 2,
  lessonId: 13,
  title: 'Không khí',
  theory: `
    <h2>Bài 13: Không khí</h2>
    
    <h3>1. Thành phần không khí</h3>
    <p>Không khí là hỗn hợp của nhiều khí, chủ yếu gồm:</p>
    
    <table border="1">
      <tr>
        <th>Thành phần</th>
        <th>Tỉ lệ thể tích (%)</th>
        <th>Vai trò</th>
      </tr>
      <tr>
        <td>Nitrogen (N₂)</td>
        <td>~78%</td>
        <td>Tạo protein, làm trơ</td>
      </tr>
      <tr>
        <td>Oxygen (O₂)</td>
        <td>~21%</td>
        <td>Hô hấp, đốt cháy</td>
      </tr>
      <tr>
        <td>Carbon dioxide (CO₂)</td>
        <td>~0,03%</td>
        <td>Quang hợp</td>
      </tr>
      <tr>
        <td>Khí hiếm (Ar, Ne, He...)</td>
        <td>~1%</td>
        <td>Đèn chiếu sáng, hàn</td>
      </tr>
      <tr>
        <td>Hơi nước, bụi...</td>
        <td>Thay đổi</td>
        <td>-</td>
      </tr>
    </table>
    
    <h3>2. Tính chất của không khí</h3>
    
    <h4>Tính chất vật lý:</h4>
    <ul>
      <li>Không màu, không mùi, không vị</li>
      <li>Có khối lượng: 1 lít không khí ở đktc nặng khoảng 1,29g</li>
      <li>Hóa lỏng ở nhiệt độ rất thấp (-196°C)</li>
    </ul>
    
    <h4>Tính chất hóa học:</h4>
    <p>Không khí gồm nhiều chất nên có nhiều tính chất hóa học khác nhau:</p>
    <ul>
      <li>Oxygen trong không khí giúp sự cháy và hô hấp</li>
      <li>Nitrogen tương đối trơ ở nhiệt độ thường</li>
      <li>CO₂ cần thiết cho quang hợp</li>
    </ul>
    
    <h3>3. Sự cháy trong không khí</h3>
    <p>Sự cháy là phản ứng hóa học tỏa nhiệt kèm theo phát sáng.</p>
    
    <h4>Điều kiện để xảy ra sự cháy:</h4>
    <ul>
      <li>Có chất cháy (nhiên liệu)</li>
      <li>Có oxygen (hoặc chất oxi hóa)</li>
      <li>Nhiệt độ đạt nhiệt độ cháy</li>
    </ul>
    
    <h4>Ví dụ về sự cháy:</h4>
    <div class="example">
      <p>C + O₂ → CO₂ (tỏa nhiệt, phát sáng)</p>
      <p>2H₂ + O₂ → 2H₂O (tỏa nhiệt, phát sáng)</p>
      <p>CH₄ + 2O₂ → CO₂ + 2H₂O (tỏa nhiệt, phát sáng)</p>
    </div>
    
    <h3>4. Chữa cháy</h3>
    <p>Để dập tắt đám cháy, cần loại bỏ một trong ba điều kiện:</p>
    <ul>
      <li><strong>Hạ nhiệt độ:</strong> Dùng nước, cát...</li>
      <li><strong>Cách ly oxygen:</strong> Đậy nắp, phủ chăn, dùng CO₂...</li>
      <li><strong>Loại bỏ chất cháy:</strong> Cắt nguồn nhiên liệu</li>
    </ul>
    
    <h3>5. Ô nhiễm không khí</h3>
    
    <h4>Nguyên nhân:</h4>
    <ul>
      <li>Khí thải công nghiệp, phương tiện giao thông</li>
      <li>Đốt rác, đốt rừng</li>
      <li>Sử dụng nhiên liệu hóa thạch</li>
    </ul>
    
    <h4>Hậu quả:</h4>
    <ul>
      <li>Gây bệnh hô hấp, tim mạch</li>
      <li>Mưa acid</li>
      <li>Hiệu ứng nhà kính, biến đổi khí hậu</li>
      <li>Thủng tầng ozone</li>
    </ul>
    
    <h4>Biện pháp:</h4>
    <ul>
      <li>Sử dụng năng lượng sạch (mặt trời, gió...)</li>
      <li>Trồng cây xanh</li>
      <li>Xử lý khí thải</li>
      <li>Giảm sử dụng phương tiện cá nhân</li>
    </ul>
  `,
  game: [
    {
      type: 'multiple-choice',
      question: 'Thành phần chính của không khí là:',
      options: ['O₂ và CO₂', 'N₂ và O₂', 'N₂ và CO₂', 'O₂ và H₂'],
      correctAnswer: 1
    },
    {
      type: 'multiple-choice',
      question: 'Tỉ lệ oxygen trong không khí khoảng:',
      options: ['78%', '21%', '1%', '0,03%'],
      correctAnswer: 1
    },
    {
      type: 'multiple-choice',
      question: 'Điều kiện nào KHÔNG cần thiết để xảy ra sự cháy?',
      options: ['Có chất cháy', 'Có oxygen', 'Nhiệt độ đạt nhiệt độ cháy', 'Có ánh sáng'],
      correctAnswer: 3
    },
    {
      type: 'multiple-choice',
      question: 'Để dập tắt đám cháy, có thể:',
      options: ['Thổi gió mạnh', 'Phủ chăn hoặc đậy nắp', 'Tăng nhiệt độ', 'Thêm nhiên liệu'],
      correctAnswer: 1
    },
    {
      type: 'multiple-choice',
      question: 'Nguyên nhân chính gây ô nhiễm không khí là:',
      options: ['Mưa', 'Gió', 'Khí thải công nghiệp và phương tiện', 'Cây xanh'],
      correctAnswer: 2
    }
  ]
};
