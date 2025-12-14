module.exports = {
  classId: 8,
  curriculumType: 'ketnoi',
  chapterId: 2,
  lessonId: 9,
  title: 'Oxygen - Ozone',
  theory: `
    <h2>Bài 9: Oxygen - Ozone</h2>
    
    <h3>I. OXYGEN (O₂)</h3>
    
    <h4>1. Tính chất vật lý</h4>
    <ul>
      <li>Chất khí không màu, không mùi, không vị</li>
      <li>Ít tan trong nước</li>
      <li>Nặng hơn không khí (d(O₂/kk) = 32/29 ≈ 1,1)</li>
      <li>Hóa lỏng ở -183°C, có màu xanh nhạt</li>
    </ul>
    
    <h4>2. Tính chất hóa học</h4>
    <p><strong>Oxygen là chất oxi hóa mạnh, tác dụng với hầu hết các đơn chất (trừ khí hiếm, vàng, platinum)</strong></p>
    
    <p>a) <strong>Tác dụng với kim loại:</strong></p>
    <p class="reaction">3Fe + 2O₂ → Fe₃O₄ (sắt từ oxide)</p>
    <p class="reaction">2Cu + O₂ → 2CuO (đồng(II) oxide)</p>
    
    <p>b) <strong>Tác dụng với phi kim:</strong></p>
    <p class="reaction">S + O₂ → SO₂ (sulfur dioxide)</p>
    <p class="reaction">C + O₂ → CO₂ (carbon dioxide)</p>
    
    <p>c) <strong>Tác dụng với hợp chất:</strong></p>
    <p class="reaction">CH₄ + 2O₂ → CO₂ + 2H₂O</p>
    <p class="reaction">2H₂S + 3O₂ → 2H₂O + 2SO₂</p>
    
    <h4>3. Điều chế oxygen</h4>
    <p>a) <strong>Trong phòng thí nghiệm:</strong></p>
    <p>Nhiệt phân potassium permanganate:</p>
    <p class="reaction">2KMnO₄ -to→ K₂MnO₄ + MnO₂ + O₂↑</p>
    
    <p>Nhiệt phân potassium chlorate có xúc tác MnO₂:</p>
    <p class="reaction">2KClO₃ -MnO₂,to→ 2KCl + 3O₂↑</p>
    
    <p>b) <strong>Trong công nghiệp:</strong></p>
    <p>Chưng cất phân đoạn không khí lỏng</p>
    
    <h4>4. Ứng dụng</h4>
    <ul>
      <li>Hô hấp (y tế, lặn, leo núi cao)</li>
      <li>Đốt cháy nhiên liệu (công nghiệp luyện kim, hàn cắt kim loại)</li>
      <li>Sản xuất hóa chất</li>
      <li>Xử lý nước thải</li>
    </ul>
    
    <h3>II. OZONE (O₃)</h3>
    
    <h4>1. Cấu tạo và tính chất</h4>
    <ul>
      <li>Phân tử O₃ gồm 3 nguyên tử oxygen</li>
      <li>Chất khí màu xanh nhạt, mùi đặc trưng</li>
      <li>Tan nhiều trong nước hơn O₂</li>
      <li>Tính oxi hóa mạnh hơn O₂</li>
    </ul>
    
    <h4>2. Ứng dụng</h4>
    <ul>
      <li>Khử trùng nước, không khí</li>
      <li>Tẩy trắng</li>
      <li>Tổng hợp hóa chất</li>
    </ul>
    
    <h4>3. Tầng ozone</h4>
    <p>Tầng ozone ở tầng bình lưu (độ cao 15-30 km) bảo vệ Trái Đất khỏi tia UV có hại.</p>
  `,
  game: [
    {
      question: 'Oxygen có tính chất vật lý nào sau đây?',
      options: ['Khí màu xanh nhạt', 'Khí không màu, không mùi', 'Khí màu vàng', 'Khí có mùi hắc'],
      correctAnswer: 1
    },
    {
      question: 'Phản ứng nào sau đây là phản ứng của oxygen với kim loại?',
      options: ['C + O₂ → CO₂', '3Fe + 2O₂ → Fe₃O₄', 'S + O₂ → SO₂', 'CH₄ + 2O₂ → CO₂ + 2H₂O'],
      correctAnswer: 1
    },
    {
      question: 'Trong phòng thí nghiệm, có thể điều chế O₂ bằng cách:',
      options: ['Đun nóng nước', 'Nhiệt phân KMnO₄', 'Cho acid vào kim loại', 'Chưng cất không khí'],
      correctAnswer: 1
    },
    {
      question: 'Phân tử ozone gồm:',
      options: ['2 nguyên tử O', '3 nguyên tử O', '4 nguyên tử O', '1 nguyên tử O'],
      correctAnswer: 1
    },
    {
      question: 'Tầng ozone có vai trò gì?',
      options: ['Tạo mưa', 'Bảo vệ Trái Đất khỏi tia UV', 'Tạo gió', 'Giữ ấm Trái Đất'],
      correctAnswer: 1
    }
  ]
};
