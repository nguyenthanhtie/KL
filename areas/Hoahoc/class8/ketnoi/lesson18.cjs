module.exports = {
  classId: 8,
  curriculumType: 'ketnoi',
  chapterId: 4,
  lessonId: 18,
  title: 'Nồng độ dung dịch',
  theory: `
    <h2>Bài 18: Nồng độ dung dịch</h2>
    
    <h3>1. Khái niệm nồng độ dung dịch</h3>
    <p><strong>Nồng độ dung dịch</strong> là đại lượng biểu thị lượng chất tan có trong một lượng dung dịch hoặc dung môi nhất định.</p>
    
    <h3>2. Nồng độ phần trăm (C%)</h3>
    
    <h4>a) Định nghĩa:</h4>
    <p><strong>Nồng độ phần trăm</strong> cho biết số gam chất tan có trong 100g dung dịch.</p>
    
    <h4>b) Công thức:</h4>
    <p class="formula">C% = (m(chất tan) / m(dung dịch)) × 100%</p>
    
    <p>Trong đó:</p>
    <ul>
      <li>m(dung dịch) = m(chất tan) + m(dung môi)</li>
      <li>C%: nồng độ phần trăm (%)</li>
      <li>m: khối lượng (g)</li>
    </ul>
    
    <h4>c) Ví dụ:</h4>
    <div class="example">
      <p><strong>Bài 1:</strong> Hòa tan 20g muối vào 180g nước. Tính nồng độ phần trăm của dung dịch.</p>
      <p><strong>Giải:</strong></p>
      <p>m(dung dịch) = 20 + 180 = 200g</p>
      <p>C% = (20 / 200) × 100% = 10%</p>
    </div>
    
    <h3>3. Pha chế và pha loãng dung dịch</h3>
    
    <h4>a) Pha chế dung dịch từ chất tan và nước:</h4>
    <p>Công thức: C% = (m(ct) / [m(ct) + m(nước)]) × 100%</p>
    
    <div class="example">
      <p><strong>Bài 2:</strong> Cần bao nhiêu gam NaCl và nước để pha 500g dung dịch NaCl 15%?</p>
      <p><strong>Giải:</strong></p>
      <p>m(NaCl) = (500 × 15) / 100 = 75g</p>
      <p>m(nước) = 500 - 75 = 425g</p>
    </div>
    
    <h4>b) Pha loãng dung dịch:</h4>
    <p>Khi pha loãng, khối lượng chất tan không đổi:</p>
    <p class="formula">m(ct) = m₁ × C₁% / 100 = m₂ × C₂% / 100</p>
    
    <div class="example">
      <p><strong>Bài 3:</strong> Pha loãng 200g dung dịch H₂SO₄ 49% bằng nước để được dung dịch 20%. Tính khối lượng nước cần thêm.</p>
      <p><strong>Giải:</strong></p>
      <p>m(H₂SO₄) = (200 × 49) / 100 = 98g</p>
      <p>m(dd 20%) = (98 × 100) / 20 = 490g</p>
      <p>m(nước thêm) = 490 - 200 = 290g</p>
    </div>
    
    <h4>c) Cô đặc dung dịch:</h4>
    <p>Khi cô đặc (làm bay hơi dung môi), khối lượng chất tan không đổi.</p>
    
    <div class="example">
      <p><strong>Bài 4:</strong> Cô đặc 300g dung dịch NaCl 10% để được dung dịch 15%. Tính khối lượng nước cần làm bay hơi.</p>
      <p><strong>Giải:</strong></p>
      <p>m(NaCl) = (300 × 10) / 100 = 30g</p>
      <p>m(dd 15%) = (30 × 100) / 15 = 200g</p>
      <p>m(nước bay hơi) = 300 - 200 = 100g</p>
    </div>
    
    <h3>4. Trộn các dung dịch</h3>
    <p>Khi trộn các dung dịch cùng chất tan:</p>
    <p class="formula">m(ct tổng) = m(ct₁) + m(ct₂)</p>
    <p class="formula">m(dd tổng) = m(dd₁) + m(dd₂)</p>
    
    <div class="example">
      <p><strong>Bài 5:</strong> Trộn 100g dung dịch NaCl 10% với 200g dung dịch NaCl 25%. Tính nồng độ % dung dịch thu được.</p>
      <p><strong>Giải:</strong></p>
      <p>m(NaCl₁) = (100 × 10) / 100 = 10g</p>
      <p>m(NaCl₂) = (200 × 25) / 100 = 50g</p>
      <p>m(NaCl tổng) = 10 + 50 = 60g</p>
      <p>m(dd tổng) = 100 + 200 = 300g</p>
      <p>C% = (60 / 300) × 100% = 20%</p>
    </div>
    
    <h3>5. Ứng dụng</h3>
    <ul>
      <li>Pha chế dung dịch trong phòng thí nghiệm</li>
      <li>Sản xuất dược phẩm</li>
      <li>Công nghiệp thực phẩm</li>
      <li>Nông nghiệp (phân bón, thuốc trừ sâu)</li>
    </ul>
  `,
  game: [
    {
      type: 'multiple-choice',
      question: 'Nồng độ phần trăm của dung dịch cho biết:',
      options: ['Số gam chất tan trong 100g dung dịch', 'Số gam chất tan trong 1 lít dung dịch', 'Số mol chất tan trong 1 lít dung dịch', 'Thể tích chất tan'],
      correctAnswer: 0
    },
    {
      type: 'multiple-choice',
      question: 'Hòa tan 10g đường vào 90g nước, nồng độ % dung dịch là:',
      options: ['10%', '11,1%', '9%', '10,1%'],
      correctAnswer: 0
    },
    {
      type: 'multiple-choice',
      question: 'Khi pha loãng dung dịch bằng nước, đại lượng nào không đổi?',
      options: ['Khối lượng dung dịch', 'Khối lượng chất tan', 'Nồng độ dung dịch', 'Khối lượng nước'],
      correctAnswer: 1
    },
    {
      type: 'multiple-choice',
      question: 'Để pha 200g dung dịch muối 5% cần bao nhiêu gam muối?',
      options: ['5g', '10g', '15g', '20g'],
      correctAnswer: 1
    },
    {
      type: 'multiple-choice',
      question: 'Khi cô đặc dung dịch:',
      options: ['Khối lượng chất tan tăng', 'Khối lượng chất tan giảm', 'Nồng độ giảm', 'Nồng độ tăng'],
      correctAnswer: 3
    }
  ]
};
