module.exports = {
  classId: 8,
  curriculumType: 'canhdieu',
  chapterId: 1,
  lessonId: 2,
  title: 'Phân tử',
  theory: `
    <h2>Bài 2: Phân tử</h2>
    
    <h3>1. Khái niệm phân tử</h3>
    <p><strong>Phân tử</strong> là hạt đại diện cho chất, gồm một số nguyên tử liên kết với nhau.</p>
    
    <h3>2. Đặc điểm của phân tử</h3>
    <ul>
      <li>Phân tử rất nhỏ, không thể nhìn thấy bằng mắt thường</li>
      <li>Phân tử chuyển động không ngừng</li>
      <li>Giữa các phân tử có khoảng cách</li>
      <li>Phân tử quyết định tính chất hóa học của chất</li>
    </ul>
    
    <h3>3. Khối lượng phân tử</h3>
    <p><strong>Khối lượng phân tử</strong> bằng tổng khối lượng các nguyên tử tạo nên phân tử.</p>
    
    <div class="example">
      <h4>Ví dụ:</h4>
      <p>Phân tử H₂O gồm 2 nguyên tử H và 1 nguyên tử O</p>
      <p>Khối lượng phân tử H₂O = 2 × 1 + 16 = 18u</p>
    </div>
    
    <h3>4. Công thức hóa học</h3>
    <p><strong>Công thức hóa học</strong> biểu diễn thành phần của phân tử bằng các ký hiệu nguyên tố.</p>
    
    <p>Cách viết công thức:</p>
    <ul>
      <li>Viết ký hiệu các nguyên tố</li>
      <li>Viết chỉ số (số nguyên tử) ở phía dưới bên phải mỗi ký hiệu</li>
      <li>Chỉ số 1 không viết</li>
    </ul>
    
    <div class="example">
      <h4>Ví dụ:</h4>
      <ul>
        <li>O₂: 1 phân tử gồm 2 nguyên tử O</li>
        <li>H₂O: 1 phân tử gồm 2 nguyên tử H và 1 nguyên tử O</li>
        <li>CO₂: 1 phân tử gồm 1 nguyên tử C và 2 nguyên tử O</li>
        <li>H₂SO₄: 1 phân tử gồm 2 nguyên tử H, 1 nguyên tử S và 4 nguyên tử O</li>
      </ul>
    </div>
    
    <h3>5. Ý nghĩa của công thức hóa học</h3>
    <p>Công thức H₂O cho biết:</p>
    <ul>
      <li>Chất nước</li>
      <li>1 phân tử nước</li>
      <li>Phân tử nước gồm 2 nguyên tử H và 1 nguyên tử O</li>
      <li>Khối lượng phân tử nước là 18u</li>
    </ul>
  `,
  game: [
    {
      question: 'Phân tử là gì?',
      options: ['Hạt nhỏ nhất', 'Hạt đại diện cho chất', 'Nguyên tử', 'Electron'],
      correctAnswer: 1
    },
    {
      question: 'Khối lượng phân tử CO₂ (C=12, O=16) là:',
      options: ['28u', '44u', '32u', '16u'],
      correctAnswer: 1
    },
    {
      question: 'Công thức H₂SO₄ cho biết phân tử gồm:',
      options: ['2H, 1S, 4O', '1H, 2S, 4O', '2H, 4S, 1O', '4H, 2S, 1O'],
      correctAnswer: 0
    },
    {
      question: 'Đặc điểm nào KHÔNG đúng với phân tử?',
      options: ['Phân tử rất nhỏ', 'Phân tử chuyển động không ngừng', 'Phân tử không có khoảng cách', 'Phân tử quyết định tính chất hóa học'],
      correctAnswer: 2
    },
    {
      question: 'Phân tử CH₄ gồm bao nhiêu nguyên tử?',
      options: ['4', '5', '1', '3'],
      correctAnswer: 1
    }
  ]
};
