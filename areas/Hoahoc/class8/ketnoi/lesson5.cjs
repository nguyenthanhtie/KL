module.exports = {
  classId: 8,
  curriculumType: 'ketnoi',
  chapterId: 1,
  lessonId: 5,
  title: 'Tỉ khối hơi và tính theo công thức hóa học',
  theory: `
    <h2>Bài 5: Tỉ khối hơi và tính theo công thức hóa học</h2>
    
    <h3>1. Khối lượng mol</h3>
    <p><strong>Khối lượng mol (M)</strong> là khối lượng của 1 mol chất, đơn vị: g/mol</p>
    <p>Khối lượng mol có giá trị bằng số với khối lượng phân tử/nguyên tử:</p>
    <ul>
      <li>O có khối lượng nguyên tử là 16u → M(O) = 16 g/mol</li>
      <li>H₂O có khối lượng phân tử là 18u → M(H₂O) = 18 g/mol</li>
    </ul>
    
    <h3>2. Công thức tính khối lượng</h3>
    <p><strong>m = n × M</strong></p>
    <p>Trong đó:</p>
    <ul>
      <li>m: khối lượng chất (g)</li>
      <li>n: số mol (mol)</li>
      <li>M: khối lượng mol (g/mol)</li>
    </ul>
    
    <h3>3. Tỉ khối hơi</h3>
    <p><strong>Tỉ khối hơi</strong> của khí A so với khí B:</p>
    <p class="formula">d(A/B) = M(A) / M(B)</p>
    
    <h4>Các tỉ khối thường dùng:</h4>
    <ul>
      <li><strong>d(A/H₂)</strong> = M(A) / 2</li>
      <li><strong>d(A/không khí)</strong> = M(A) / 29</li>
      <li><strong>d(A/O₂)</strong> = M(A) / 32</li>
    </ul>
    
    <h3>4. Thành phần phần trăm theo khối lượng</h3>
    <p>Phần trăm khối lượng của nguyên tố X trong hợp chất:</p>
    <p class="formula">%X = (n × M(X) / M(hợp chất)) × 100%</p>
    
    <div class="example">
      <h4>Ví dụ:</h4>
      <p>Tính thành phần phần trăm các nguyên tố trong H₂O:</p>
      <p>M(H₂O) = 2 × 1 + 16 = 18 g/mol</p>
      <p>%H = (2 × 1 / 18) × 100% ≈ 11,11%</p>
      <p>%O = (16 / 18) × 100% ≈ 88,89%</p>
    </div>
  `,
  game: [
    {
      question: 'Khối lượng mol của O₂ (biết O = 16) là:',
      options: ['16 g/mol', '32 g/mol', '8 g/mol', '64 g/mol'],
      correctAnswer: 1
    },
    {
      question: 'Công thức tính khối lượng chất là:',
      options: ['m = n / M', 'm = n × M', 'm = M / n', 'm = n + M'],
      correctAnswer: 1
    },
    {
      question: 'Tỉ khối hơi của CO₂ (M = 44) so với không khí là:',
      options: ['1,52', '22', '44', '0,66'],
      correctAnswer: 0
    },
    {
      question: 'Khối lượng của 0,5 mol H₂O (M = 18 g/mol) là:',
      options: ['9 g', '18 g', '36 g', '4,5 g'],
      correctAnswer: 0
    },
    {
      question: 'Công thức tính phần trăm khối lượng nguyên tố là:',
      options: ['%X = M(X) / M(hợp chất)', '%X = (n × M(X) / M(hợp chất)) × 100%', '%X = n × M(X) × 100%', '%X = M(hợp chất) / M(X)'],
      correctAnswer: 1
    }
  ]
};
