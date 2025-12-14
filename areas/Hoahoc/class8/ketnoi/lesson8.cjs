module.exports = {
  classId: 8,
  curriculumType: 'ketnoi',
  chapterId: 1,
  lessonId: 8,
  title: 'Tính theo phương trình hóa học',
  theory: `
    <h2>Bài 8: Tính theo phương trình hóa học</h2>
    
    <h3>1. Phương trình hóa học</h3>
    <p><strong>Phương trình hóa học</strong> là biểu diễn ngắn gọn phản ứng hóa học bằng công thức hóa học.</p>
    <p>Cấu trúc: Chất tham gia → Sản phẩm</p>
    <p>Ví dụ: 2H₂ + O₂ → 2H₂O</p>
    
    <h3>2. Ý nghĩa của phương trình hóa học</h3>
    <p>Phương trình: 2H₂ + O₂ → 2H₂O cho biết:</p>
    <ul>
      <li><strong>Về chất:</strong> H₂ tác dụng với O₂ tạo ra H₂O</li>
      <li><strong>Về tỉ lệ số phân tử:</strong> 2 phân tử H₂ + 1 phân tử O₂ → 2 phân tử H₂O</li>
      <li><strong>Về tỉ lệ số mol:</strong> 2 mol H₂ + 1 mol O₂ → 2 mol H₂O</li>
      <li><strong>Về khối lượng:</strong> 4g H₂ + 32g O₂ → 36g H₂O</li>
    </ul>
    
    <h3>3. Các bước tính theo phương trình hóa học</h3>
    <p><strong>Bước 1:</strong> Viết phương trình hóa học và cân bằng</p>
    <p><strong>Bước 2:</strong> Tính số mol của chất đã biết (từ khối lượng, thể tích...)</p>
    <p><strong>Bước 3:</strong> Dựa vào tỉ lệ mol trong phương trình, tính số mol chất cần tìm</p>
    <p><strong>Bước 4:</strong> Tính đại lượng cần tìm (khối lượng, thể tích...)</p>
    
    <h3>4. Ví dụ minh họa</h3>
    <div class="example">
      <h4>Bài toán:</h4>
      <p>Đốt cháy hoàn toàn 12g carbon trong oxygen. Tính:</p>
      <p>a) Khối lượng CO₂ tạo thành</p>
      <p>b) Thể tích O₂ (đktc) cần dùng</p>
      
      <p><strong>Giải:</strong></p>
      <p>a) PTHH: C + O₂ → CO₂</p>
      <p>n(C) = 12/12 = 1 mol</p>
      <p>Theo PT: n(CO₂) = n(C) = 1 mol</p>
      <p>m(CO₂) = 1 × 44 = 44g</p>
      
      <p>b) Theo PT: n(O₂) = n(C) = 1 mol</p>
      <p>V(O₂) = 1 × 22,4 = 22,4 lít</p>
    </div>
    
    <h3>5. Các công thức thường dùng</h3>
    <ul>
      <li>n = m / M (mol = khối lượng / khối lượng mol)</li>
      <li>n = V / 22,4 (ở đktc, với khí)</li>
      <li>m = n × M</li>
      <li>V = n × 22,4 (ở đktc)</li>
    </ul>
  `,
  game: [
    {
      question: 'Phương trình hóa học cho biết thông tin gì?',
      options: ['Chỉ về chất tham gia và sản phẩm', 'Chỉ về tỉ lệ mol', 'Cả về chất, tỉ lệ mol và khối lượng', 'Chỉ về khối lượng'],
      correctAnswer: 2
    },
    {
      question: 'Trong PTHH: 2H₂ + O₂ → 2H₂O, tỉ lệ mol H₂ : O₂ là:',
      options: ['1:1', '2:1', '1:2', '2:2'],
      correctAnswer: 1
    },
    {
      question: 'Số mol của 44g CO₂ (M = 44) là:',
      options: ['1 mol', '2 mol', '0,5 mol', '44 mol'],
      correctAnswer: 0
    },
    {
      question: 'Thể tích của 2 mol khí O₂ ở đktc là:',
      options: ['22,4 lít', '44,8 lít', '11,2 lít', '32 lít'],
      correctAnswer: 1
    },
    {
      question: 'Đốt cháy 2 mol Mg trong O₂ theo PT: 2Mg + O₂ → 2MgO. Số mol O₂ cần dùng là:',
      options: ['2 mol', '1 mol', '4 mol', '0,5 mol'],
      correctAnswer: 1
    }
  ]
};
