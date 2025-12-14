module.exports = {
  classId: 8,
  curriculumType: 'ketnoi',
  chapterId: 1,
  lessonId: 4,
  title: 'Đơn chất và hợp chất',
  theory: `
    <h2>Bài 4: Đơn chất và hợp chất</h2>
    
    <h3>1. Đơn chất</h3>
    <p><strong>Đơn chất</strong> là chất tạo nên từ một nguyên tố hóa học.</p>
    
    <h4>Phân loại đơn chất:</h4>
    <ul>
      <li><strong>Đơn chất kim loại</strong>: Fe, Cu, Al, Au, Ag...</li>
      <li><strong>Đơn chất phi kim</strong>: O₂, H₂, N₂, Cl₂, S, P...</li>
    </ul>
    
    <h3>2. Hợp chất</h3>
    <p><strong>Hợp chất</strong> là chất tạo nên từ hai nguyên tố hóa học trở lên.</p>
    
    <h4>Ví dụ về hợp chất:</h4>
    <ul>
      <li>H₂O (nước): gồm H và O</li>
      <li>CO₂ (carbon dioxide): gồm C và O</li>
      <li>NaCl (muối ăn): gồm Na và Cl</li>
      <li>H₂SO₄ (acid sulfuric): gồm H, S và O</li>
    </ul>
    
    <h3>3. Phân tử</h3>
    <p><strong>Phân tử</strong> là hạt đại diện cho chất, gồm một số nguyên tử liên kết với nhau.</p>
    <p>Công thức hóa học biểu diễn thành phần của phân tử:</p>
    <ul>
      <li>O₂: 1 phân tử gồm 2 nguyên tử O</li>
      <li>H₂O: 1 phân tử gồm 2 nguyên tử H và 1 nguyên tử O</li>
      <li>CO₂: 1 phân tử gồm 1 nguyên tử C và 2 nguyên tử O</li>
    </ul>
    
    <h3>4. So sánh đơn chất và hợp chất</h3>
    <table border="1">
      <tr>
        <th>Tiêu chí</th>
        <th>Đơn chất</th>
        <th>Hợp chất</th>
      </tr>
      <tr>
        <td>Số nguyên tố</td>
        <td>1 nguyên tố</td>
        <td>≥ 2 nguyên tố</td>
      </tr>
      <tr>
        <td>Ví dụ</td>
        <td>O₂, Fe, Cu</td>
        <td>H₂O, CO₂, NaCl</td>
      </tr>
    </table>
  `,
  game: [
    {
      question: 'Đơn chất là gì?',
      options: ['Chất tạo từ 1 nguyên tố', 'Chất tạo từ 2 nguyên tố', 'Chất tạo từ nhiều nguyên tố', 'Chất đơn giản'],
      correctAnswer: 0
    },
    {
      question: 'Trong các chất sau, chất nào là đơn chất?',
      options: ['H₂O', 'O₂', 'CO₂', 'NaCl'],
      correctAnswer: 1
    },
    {
      question: 'H₂SO₄ là:',
      options: ['Đơn chất kim loại', 'Đơn chất phi kim', 'Hợp chất', 'Nguyên tố'],
      correctAnswer: 2
    },
    {
      question: 'Phân tử H₂O gồm:',
      options: ['2 nguyên tử H', '1 nguyên tử H và 2 nguyên tử O', '2 nguyên tử H và 1 nguyên tử O', '3 nguyên tử O'],
      correctAnswer: 2
    },
    {
      question: 'Trong các chất sau, chất nào là hợp chất?',
      options: ['Fe', 'Cu', 'O₂', 'CO₂'],
      correctAnswer: 3
    }
  ]
};
