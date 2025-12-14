module.exports = {
  classId: 8,
  curriculumType: 'ketnoi',
  chapterId: 2,
  lessonId: 10,
  title: 'Phản ứng hóa hợp - Phản ứng phân hủy',
  theory: `
    <h2>Bài 10: Phản ứng hóa hợp - Phản ứng phân hủy</h2>
    
    <h3>I. PHẢN ỨNG HÓA HỢP</h3>
    
    <h4>1. Định nghĩa</h4>
    <p><strong>Phản ứng hóa hợp</strong> là phản ứng hóa học trong đó có hai hay nhiều chất tham gia kết hợp với nhau tạo thành một chất mới.</p>
    
    <p class="formula">A + B → AB</p>
    
    <h4>2. Ví dụ</h4>
    <div class="example">
      <p><strong>a) Kim loại + Oxygen → Oxide kim loại</strong></p>
      <p>2Mg + O₂ → 2MgO</p>
      <p>4Al + 3O₂ → 2Al₂O₃</p>
      
      <p><strong>b) Phi kim + Oxygen → Oxide phi kim</strong></p>
      <p>S + O₂ → SO₂</p>
      <p>2H₂ + O₂ → 2H₂O</p>
      
      <p><strong>c) Oxide bazơ + Nước → Bazơ</strong></p>
      <p>CaO + H₂O → Ca(OH)₂</p>
      <p>Na₂O + H₂O → 2NaOH</p>
      
      <p><strong>d) Oxide acid + Nước → Acid</strong></p>
      <p>SO₂ + H₂O → H₂SO₃</p>
      <p>P₂O₅ + 3H₂O → 2H₃PO₄</p>
    </div>
    
    <h3>II. PHẢN ỨNG PHÂN HỦY</h3>
    
    <h4>1. Định nghĩa</h4>
    <p><strong>Phản ứng phân hủy</strong> là phản ứng hóa học trong đó một chất tham gia bị phân hủy thành hai hay nhiều chất mới.</p>
    
    <p class="formula">AB → A + B</p>
    
    <h4>2. Ví dụ</h4>
    <div class="example">
      <p><strong>a) Phân hủy nhiệt</strong></p>
      <p>2KMnO₄ -to→ K₂MnO₄ + MnO₂ + O₂↑</p>
      <p>2KClO₃ -to→ 2KCl + 3O₂↑</p>
      
      <p><strong>b) Phân hủy bằng điện</strong></p>
      <p>2H₂O -điện phân→ 2H₂↑ + O₂↑</p>
      
      <p><strong>c) Phân hủy bằng ánh sáng</strong></p>
      <p>2AgBr -ánh sáng→ 2Ag + Br₂</p>
    </div>
    
    <h3>III. SO SÁNH</h3>
    <table border="1">
      <tr>
        <th>Đặc điểm</th>
        <th>Phản ứng hóa hợp</th>
        <th>Phản ứng phân hủy</th>
      </tr>
      <tr>
        <td>Số chất tham gia</td>
        <td>≥ 2 chất</td>
        <td>1 chất</td>
      </tr>
      <tr>
        <td>Số sản phẩm</td>
        <td>1 chất</td>
        <td>≥ 2 chất</td>
      </tr>
      <tr>
        <td>Dạng tổng quát</td>
        <td>A + B → AB</td>
        <td>AB → A + B</td>
      </tr>
    </table>
  `,
  game: [
    {
      type: 'multiple-choice',
      question: 'Phản ứng nào sau đây là phản ứng hóa hợp?',
      options: ['2H₂O → 2H₂ + O₂', '2Mg + O₂ → 2MgO', 'CaCO₃ → CaO + CO₂', 'Zn + 2HCl → ZnCl₂ + H₂'],
      correctAnswer: 1
    },
    {
      type: 'multiple-choice',
      question: 'Phản ứng phân hủy là phản ứng:',
      options: ['Có nhiều chất tham gia tạo thành một chất mới', 'Có một chất phân hủy thành nhiều chất mới', 'Có trao đổi thành phần giữa các chất', 'Có thay thế nguyên tố này bằng nguyên tố khác'],
      correctAnswer: 1
    },
    {
      type: 'multiple-choice',
      question: 'Phản ứng 2KMnO₄ → K₂MnO₄ + MnO₂ + O₂ thuộc loại:',
      options: ['Phản ứng hóa hợp', 'Phản ứng phân hủy', 'Phản ứng thế', 'Phản ứng trao đổi'],
      correctAnswer: 1
    },
    {
      type: 'multiple-choice',
      question: 'Để điều chế oxygen trong phòng thí nghiệm, có thể dùng phản ứng:',
      options: ['H₂ + O₂ → H₂O', '2KClO₃ → 2KCl + 3O₂', 'C + O₂ → CO₂', '2H₂ + O₂ → 2H₂O'],
      correctAnswer: 1
    },
    {
      type: 'multiple-choice',
      question: 'Phản ứng CaO + H₂O → Ca(OH)₂ là phản ứng:',
      options: ['Phân hủy', 'Hóa hợp', 'Thế', 'Trao đổi'],
      correctAnswer: 1
    }
  ]
};
