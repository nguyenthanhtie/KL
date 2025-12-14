module.exports = {
  classId: 8,
  curriculumType: 'ketnoi',
  chapterId: 2,
  lessonId: 11,
  title: 'Phản ứng thế',
  theory: `
    <h2>Bài 11: Phản ứng thế</h2>
    
    <h3>1. Định nghĩa</h3>
    <p><strong>Phản ứng thế</strong> là phản ứng hóa học trong đó nguyên tử của đơn chất thay thế nguyên tử của nguyên tố trong hợp chất.</p>
    
    <p class="formula">AB + C → AC + B</p>
    
    <h3>2. Các loại phản ứng thế</h3>
    
    <h4>a) Kim loại thế hydrogen trong acid</h4>
    <p>Kim loại hoạt động mạnh có thể thay thế hydrogen trong acid.</p>
    <div class="example">
      <p>Zn + 2HCl → ZnCl₂ + H₂↑</p>
      <p>Fe + H₂SO₄ (loãng) → FeSO₄ + H₂↑</p>
      <p>2Al + 6HCl → 2AlCl₃ + 3H₂↑</p>
    </div>
    
    <h4>b) Kim loại thế kim loại khác trong muối</h4>
    <p>Kim loại hoạt động mạnh hơn có thể đẩy kim loại yếu hơn ra khỏi dung dịch muối.</p>
    <div class="example">
      <p>Fe + CuSO₄ → FeSO₄ + Cu</p>
      <p>Cu + 2AgNO₃ → Cu(NO₃)₂ + 2Ag</p>
      <p>Zn + CuCl₂ → ZnCl₂ + Cu</p>
    </div>
    
    <h4>c) Hydrogen thế oxygen trong oxide kim loại (phản ứng khử)</h4>
    <p>Hydrogen khử được oxide của kim loại kém hoạt động.</p>
    <div class="example">
      <p>CuO + H₂ -to→ Cu + H₂O</p>
      <p>Fe₃O₄ + 4H₂ -to→ 3Fe + 4H₂O</p>
      <p>PbO + H₂ -to→ Pb + H₂O</p>
    </div>
    
    <h3>3. Dãy hoạt động hóa học của kim loại</h3>
    <p>Kim loại xếp trước có tính hoạt động mạnh hơn kim loại xếp sau:</p>
    <p class="formula">K > Na > Ca > Mg > Al > Zn > Fe > Pb > (H) > Cu > Ag > Au</p>
    
    <p><strong>Lưu ý:</strong></p>
    <ul>
      <li>Kim loại đứng trước H đẩy được H ra khỏi acid</li>
      <li>Kim loại đứng trước đẩy được kim loại đứng sau ra khỏi dung dịch muối</li>
      <li>Kim loại từ K đến Na không dùng để đẩy kim loại khác vì phản ứng với nước</li>
    </ul>
    
    <h3>4. Ứng dụng</h3>
    <ul>
      <li>Điều chế hydrogen trong phòng thí nghiệm</li>
      <li>Luyện kim (khử oxide kim loại bằng H₂, CO, C...)</li>
      <li>Mạ kim loại</li>
      <li>Tái chế kim loại</li>
    </ul>
  `,
  game: [
    {
      type: 'multiple-choice',
      question: 'Phản ứng thế là phản ứng:',
      options: ['Nhiều chất tạo thành một chất', 'Một chất phân hủy thành nhiều chất', 'Nguyên tố này thay thế nguyên tố khác trong hợp chất', 'Trao đổi thành phần giữa các chất'],
      correctAnswer: 2
    },
    {
      type: 'multiple-choice',
      question: 'Phản ứng Zn + 2HCl → ZnCl₂ + H₂ là phản ứng:',
      options: ['Hóa hợp', 'Phân hủy', 'Thế', 'Trao đổi'],
      correctAnswer: 2
    },
    {
      type: 'multiple-choice',
      question: 'Kim loại nào sau đây không đẩy được Cu ra khỏi dung dịch CuSO₄?',
      options: ['Fe', 'Zn', 'Al', 'Ag'],
      correctAnswer: 3
    },
    {
      type: 'multiple-choice',
      question: 'Để điều chế H₂ trong phòng thí nghiệm, có thể cho Zn tác dụng với:',
      options: ['H₂O', 'HCl', 'NaOH', 'CuSO₄'],
      correctAnswer: 1
    },
    {
      type: 'multiple-choice',
      question: 'Phản ứng CuO + H₂ → Cu + H₂O thuộc loại phản ứng:',
      options: ['Hóa hợp', 'Phân hủy', 'Thế', 'Trao đổi'],
      correctAnswer: 2
    }
  ]
};
