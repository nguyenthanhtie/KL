module.exports = {
  classId: 8,
  curriculumType: 'ketnoi',
  chapterId: 3,
  lessonId: 15,
  title: 'Nước',
  theory: `
    <h2>Bài 15: Nước</h2>
    
    <h3>1. Thành phần và tính chất vật lý</h3>
    
    <h4>a) Thành phần:</h4>
    <p>Công thức: H₂O</p>
    <p>Phân tử nước gồm 2 nguyên tử H và 1 nguyên tử O</p>
    <p>Khối lượng phân tử: 18u</p>
    
    <h4>b) Tính chất vật lý:</h4>
    <ul>
      <li>Chất lỏng không màu, không mùi, không vị</li>
      <li>Sôi ở 100°C, đông đặc ở 0°C (ở 1 atm)</li>
      <li>Khối lượng riêng: 1g/cm³ ở 4°C</li>
      <li>Là dung môi phổ biến, hòa tan nhiều chất</li>
    </ul>
    
    <h3>2. Tính chất hóa học</h3>
    
    <h4>a) Tác dụng với kim loại hoạt động mạnh:</h4>
    <div class="example">
      <p>2Na + 2H₂O → 2NaOH + H₂↑</p>
      <p>Ca + 2H₂O → Ca(OH)₂ + H₂↑</p>
      <p>Hiện tượng: Phản ứng mạnh, tỏa nhiệt, có khí H₂ thoát ra</p>
    </div>
    
    <h4>b) Tác dụng với oxide bazơ:</h4>
    <div class="example">
      <p>CaO + H₂O → Ca(OH)₂</p>
      <p>Na₂O + H₂O → 2NaOH</p>
      <p>Ứng dụng: Pha chế dung dịch bazơ, sản xuất vôi tôi</p>
    </div>
    
    <h4>c) Tác dụng với oxide acid:</h4>
    <div class="example">
      <p>SO₂ + H₂O → H₂SO₃</p>
      <p>CO₂ + H₂O → H₂CO₃</p>
      <p>P₂O₅ + 3H₂O → 2H₃PO₄</p>
    </div>
    
    <h4>d) Phản ứng phân hủy:</h4>
    <div class="example">
      <p>2H₂O -điện phân→ 2H₂↑ + O₂↑</p>
      <p>Tỉ lệ thể tích: V(H₂) : V(O₂) = 2 : 1</p>
    </div>
    
    <h3>3. Vai trò của nước</h3>
    <ul>
      <li><strong>Trong cơ thể sinh vật:</strong> Cấu thành 70-90% khối lượng cơ thể, vận chuyển chất, điều hòa nhiệt độ</li>
      <li><strong>Trong sản xuất:</strong> Dung môi, nguyên liệu, làm mát</li>
      <li><strong>Trong sinh hoạt:</strong> Ăn uống, vệ sinh, giao thông</li>
      <li><strong>Trong tự nhiên:</strong> Điều hòa khí hậu, môi trường sống</li>
    </ul>
    
    <h3>4. Nước cứng và nước mềm</h3>
    
    <h4>a) Nước cứng:</h4>
    <p>Là nước có chứa nhiều ion Ca²⁺, Mg²⁺</p>
    <p><strong>Nhận biết:</strong> Không tạo bọt với xà phòng, tạo cặn khi đun sôi</p>
    <p><strong>Tác hại:</strong> Lãng phí xà phòng, tạo cặn trong nồi hơi</p>
    
    <h4>b) Nước mềm:</h4>
    <p>Là nước có ít hoặc không chứa ion Ca²⁺, Mg²⁺</p>
    
    <h4>c) Làm mềm nước:</h4>
    <ul>
      <li>Đun sôi (với nước cứng tạm thời)</li>
      <li>Dùng hóa chất: Na₂CO₃, Na₃PO₄</li>
      <li>Chưng cất</li>
    </ul>
    
    <h3>5. Bảo vệ nguồn nước</h3>
    <ul>
      <li>Không xả thải ra nguồn nước</li>
      <li>Xử lý nước thải trước khi thải ra môi trường</li>
      <li>Tiết kiệm nước, sử dụng nước hợp lý</li>
      <li>Bảo vệ rừng đầu nguồn</li>
    </ul>
  `,
  game: [
    {
      type: 'multiple-choice',
      question: 'Công thức hóa học của nước là:',
      options: ['HO', 'H₂O', 'H₃O', 'H₂O₂'],
      correctAnswer: 1
    },
    {
      type: 'multiple-choice',
      question: 'Nước sôi ở nhiệt độ:',
      options: ['0°C', '50°C', '100°C', '150°C'],
      correctAnswer: 2
    },
    {
      type: 'multiple-choice',
      question: 'Kim loại nào phản ứng với nước ở nhiệt độ thường?',
      options: ['Fe', 'Cu', 'Na', 'Ag'],
      correctAnswer: 2
    },
    {
      type: 'multiple-choice',
      question: 'Điện phân nước thu được H₂ và O₂ theo tỉ lệ thể tích:',
      options: ['1:1', '2:1', '1:2', '3:1'],
      correctAnswer: 1
    },
    {
      type: 'multiple-choice',
      question: 'Nước cứng là nước chứa nhiều:',
      options: ['NaCl', 'Ca²⁺, Mg²⁺', 'H⁺', 'OH⁻'],
      correctAnswer: 1
    }
  ]
};
