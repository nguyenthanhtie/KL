module.exports = {
  classId: 8,
  curriculumType: 'ketnoi',
  chapterId: 4,
  lessonId: 17,
  title: 'Độ tan của chất trong nước',
  theory: `
    <h2>Bài 17: Độ tan của chất trong nước</h2>
    
    <h3>1. Khái niệm độ tan</h3>
    <p><strong>Độ tan (S)</strong> của một chất trong nước ở nhiệt độ xác định là số gam chất đó tan tối đa trong 100g nước để tạo thành dung dịch bão hòa.</p>
    
    <p>Đơn vị: g hoặc g/100g nước</p>
    
    <h3>2. Dung dịch bão hòa và chưa bão hòa</h3>
    
    <h4>a) Dung dịch bão hòa:</h4>
    <p>Là dung dịch không thể hòa tan thêm chất tan nữa ở nhiệt độ đó.</p>
    <p>Dấu hiệu: Còn chất rắn không tan khi khuấy đều</p>
    
    <h4>b) Dung dịch chưa bão hòa:</h4>
    <p>Là dung dịch vẫn còn hòa tan thêm chất tan được.</p>
    
    <h3>3. Các yếu tố ảnh hưởng đến độ tan</h3>
    
    <h4>a) Nhiệt độ:</h4>
    <ul>
      <li><strong>Chất rắn:</strong> Hầu hết độ tan tăng khi nhiệt độ tăng</li>
      <li><strong>Chất khí:</strong> Độ tan giảm khi nhiệt độ tăng</li>
    </ul>
    
    <div class="example">
      <h4>Ví dụ:</h4>
      <table border="1">
        <tr>
          <th>Chất</th>
          <th>Độ tan ở 20°C</th>
          <th>Độ tan ở 60°C</th>
        </tr>
        <tr>
          <td>NaCl</td>
          <td>36g</td>
          <td>37g</td>
        </tr>
        <tr>
          <td>KNO₃</td>
          <td>32g</td>
          <td>110g</td>
        </tr>
        <tr>
          <td>CuSO₄</td>
          <td>20g</td>
          <td>40g</td>
        </tr>
      </table>
    </div>
    
    <h4>b) Bản chất của chất tan:</h4>
    <p>Mỗi chất có độ tan riêng trong cùng một dung môi:</p>
    <ul>
      <li>Dễ tan: NaCl, KNO₃, đường...</li>
      <li>Ít tan: CaSO₄, Ca(OH)₂...</li>
      <li>Không tan: AgCl, BaSO₄...</li>
    </ul>
    
    <h3>4. Đường cong độ tan</h3>
    <p>Biểu diễn sự phụ thuộc của độ tan vào nhiệt độ bằng đồ thị.</p>
    <p>Ứng dụng:</p>
    <ul>
      <li>Xác định độ tan ở nhiệt độ bất kỳ</li>
      <li>So sánh độ tan của các chất</li>
      <li>Tách chất bằng kết tinh</li>
    </ul>
    
    <h3>5. Tính toán liên quan đến độ tan</h3>
    
    <h4>Công thức:</h4>
    <p class="formula">Độ tan S = (m(chất tan) / 100g nước)</p>
    
    <div class="example">
      <h4>Ví dụ:</h4>
      <p><strong>Bài toán:</strong> Hòa tan tối đa 36g NaCl vào 100g nước ở 20°C. Tính độ tan của NaCl ở 20°C.</p>
      <p><strong>Giải:</strong></p>
      <p>Độ tan S = 36g/100g nước = 36g</p>
    </div>
    
    <div class="example">
      <p><strong>Bài toán:</strong> Biết độ tan của KNO₃ ở 60°C là 110g. Tính khối lượng KNO₃ cần thiết để pha chế dung dịch bão hòa với 200g nước ở 60°C.</p>
      <p><strong>Giải:</strong></p>
      <p>Với 100g nước cần: 110g KNO₃</p>
      <p>Với 200g nước cần: m = (110 × 200) / 100 = 220g KNO₃</p>
    </div>
    
    <h3>6. Ứng dụng</h3>
    <ul>
      <li>Tách và tinh chế chất bằng kết tinh</li>
      <li>Pha chế dung dịch có nồng độ xác định</li>
      <li>Bảo quản thực phẩm (dung dịch muối bão hòa)</li>
      <li>Điều chế các chất hóa học</li>
    </ul>
  `,
  game: [
    {
      type: 'multiple-choice',
      question: 'Độ tan của một chất là:',
      options: ['Khối lượng chất tan trong 1 lít nước', 'Khối lượng chất tan tối đa trong 100g nước', 'Khối lượng chất tan trong dung dịch', 'Thể tích chất tan trong nước'],
      correctAnswer: 1
    },
    {
      type: 'multiple-choice',
      question: 'Dung dịch bão hòa là dung dịch:',
      options: ['Có nhiều chất tan', 'Không thể hòa tan thêm chất tan ở nhiệt độ đó', 'Có ít chất tan', 'Loãng'],
      correctAnswer: 1
    },
    {
      type: 'multiple-choice',
      question: 'Khi tăng nhiệt độ, độ tan của hầu hết chất rắn:',
      options: ['Giảm', 'Tăng', 'Không đổi', 'Bằng 0'],
      correctAnswer: 1
    },
    {
      type: 'multiple-choice',
      question: 'Độ tan của NaCl ở 20°C là 36g. Để pha dung dịch bão hòa với 50g nước cần:',
      options: ['36g NaCl', '18g NaCl', '72g NaCl', '50g NaCl'],
      correctAnswer: 1
    },
    {
      type: 'multiple-choice',
      question: 'Đường cong độ tan biểu diễn:',
      options: ['Khối lượng chất tan', 'Sự phụ thuộc độ tan vào nhiệt độ', 'Thể tích dung dịch', 'Nồng độ dung dịch'],
      correctAnswer: 1
    }
  ]
};
