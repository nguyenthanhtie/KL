module.exports = {
  classId: 8,
  curriculumType: 'ketnoi',
  chapterId: 2,
  lessonId: 12,
  title: 'Oxide',
  theory: `
    <h2>Bài 12: Oxide</h2>
    
    <h3>1. Định nghĩa</h3>
    <p><strong>Oxide</strong> là hợp chất của hai nguyên tố, trong đó có một nguyên tố là oxygen.</p>
    
    <h3>2. Phân loại oxide</h3>
    
    <h4>a) Oxide bazơ (Oxide kim loại)</h4>
    <p>Là oxide của kim loại, có thể tác dụng với acid tạo muối và nước.</p>
    <div class="example">
      <p><strong>Ví dụ:</strong> Na₂O, CaO, FeO, Fe₂O₃, CuO, Al₂O₃...</p>
      <p><strong>Tính chất:</strong></p>
      <p>CuO + 2HCl → CuCl₂ + H₂O</p>
      <p>Fe₂O₃ + 6HCl → 2FeCl₃ + 3H₂O</p>
    </div>
    
    <h4>b) Oxide acid (Oxide phi kim)</h4>
    <p>Là oxide của phi kim, có thể tác dụng với bazơ tạo muối và nước.</p>
    <div class="example">
      <p><strong>Ví dụ:</strong> CO₂, SO₂, SO₃, P₂O₅, N₂O₅...</p>
      <p><strong>Tính chất:</strong></p>
      <p>CO₂ + 2NaOH → Na₂CO₃ + H₂O</p>
      <p>SO₂ + Ca(OH)₂ → CaSO₃ + H₂O</p>
    </div>
    
    <h3>3. Cách gọi tên oxide</h3>
    <p><strong>Công thức chung:</strong> [Tên nguyên tố] + oxide</p>
    
    <p>Nếu nguyên tố có nhiều hóa trị, ghi hóa trị bằng số La Mã trong ngoặc:</p>
    <ul>
      <li>FeO: Sắt(II) oxide</li>
      <li>Fe₂O₃: Sắt(III) oxide</li>
      <li>Fe₃O₄: Sắt từ oxide</li>
      <li>CuO: Đồng(II) oxide</li>
      <li>Cu₂O: Đồng(I) oxide</li>
    </ul>
    
    <h3>4. Điều chế oxide</h3>
    
    <h4>a) Đốt cháy đơn chất trong oxygen</h4>
    <div class="example">
      <p>2Mg + O₂ → 2MgO</p>
      <p>S + O₂ → SO₂</p>
      <p>C + O₂ → CO₂</p>
    </div>
    
    <h4>b) Nhiệt phân muối hoặc bazơ</h4>
    <div class="example">
      <p>CaCO₃ -to→ CaO + CO₂↑</p>
      <p>Cu(OH)₂ -to→ CuO + H₂O</p>
    </div>
    
    <h3>5. Ứng dụng</h3>
    <ul>
      <li><strong>CaO (vôi sống):</strong> Xây dựng, sản xuất vôi tôi</li>
      <li><strong>Fe₂O₃, Fe₃O₄:</strong> Quặng sắt, sắc tố</li>
      <li><strong>Al₂O₃:</strong> Sản xuất nhôm, đá quý</li>
      <li><strong>CO₂:</strong> Nước giải khát, chữa cháy, quang hợp</li>
      <li><strong>SO₂:</strong> Tẩy trắng, sát trùng</li>
    </ul>
  `,
  game: [
    {
      type: 'multiple-choice',
      question: 'Oxide là hợp chất:',
      options: ['Của hai nguyên tố', 'Của hai nguyên tố trong đó có oxygen', 'Chỉ chứa kim loại và oxygen', 'Chỉ chứa phi kim và oxygen'],
      correctAnswer: 1
    },
    {
      type: 'multiple-choice',
      question: 'Chất nào sau đây là oxide bazơ?',
      options: ['CO₂', 'SO₂', 'CuO', 'P₂O₅'],
      correctAnswer: 2
    },
    {
      type: 'multiple-choice',
      question: 'Tên gọi của Fe₂O₃ là:',
      options: ['Sắt oxide', 'Sắt(II) oxide', 'Sắt(III) oxide', 'Sắt từ oxide'],
      correctAnswer: 2
    },
    {
      type: 'multiple-choice',
      question: 'Oxide acid có thể tác dụng với:',
      options: ['Acid', 'Bazơ', 'Muối', 'Kim loại'],
      correctAnswer: 1
    },
    {
      type: 'multiple-choice',
      question: 'Để điều chế CaO, có thể nhiệt phân:',
      options: ['CaCl₂', 'CaCO₃', 'Ca(OH)₂', 'CaSO₄'],
      correctAnswer: 1
    }
  ]
};
