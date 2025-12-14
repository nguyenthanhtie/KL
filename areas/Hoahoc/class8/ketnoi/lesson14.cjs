module.exports = {
  classId: 8,
  curriculumType: 'ketnoi',
  chapterId: 3,
  lessonId: 14,
  title: 'Hydrogen',
  theory: `
    <h2>Bài 14: Hydrogen</h2>
    
    <h3>1. Tính chất vật lý</h3>
    <ul>
      <li>Chất khí không màu, không mùi, không vị</li>
      <li>Nhẹ nhất trong các chất khí (d(H₂/kk) = 2/29 ≈ 0,07)</li>
      <li>Ít tan trong nước</li>
      <li>Hóa lỏng ở -253°C</li>
    </ul>
    
    <h3>2. Tính chất hóa học</h3>
    
    <h4>a) Tác dụng với oxygen (phản ứng cháy):</h4>
    <p class="reaction">2H₂ + O₂ → 2H₂O</p>
    <p>Điều kiện: nhiệt độ cao hoặc tia lửa điện</p>
    <p>Hiện tượng: cháy với ngọn lửa màu xanh nhạt</p>
    <p><strong>Lưu ý:</strong> Hỗn hợp H₂ và O₂ (hoặc không khí) nổ mạnh khi đốt → cần thử độ tinh khiết trước khi đốt</p>
    
    <h4>b) Tác dụng với oxide kim loại (tính khử):</h4>
    <p class="reaction">CuO + H₂ -to→ Cu + H₂O</p>
    <p class="reaction">Fe₃O₄ + 4H₂ -to→ 3Fe + 4H₂O</p>
    <p>Hydrogen khử được oxide của các kim loại kém hoạt động (đứng sau Al)</p>
    
    <h3>3. Điều chế hydrogen</h3>
    
    <h4>a) Trong phòng thí nghiệm:</h4>
    <p>Kim loại + acid:</p>
    <p class="reaction">Zn + 2HCl → ZnCl₂ + H₂↑</p>
    <p class="reaction">Fe + H₂SO₄ (loãng) → FeSO₄ + H₂↑</p>
    
    <h4>b) Trong công nghiệp:</h4>
    <p>Điện phân nước:</p>
    <p class="reaction">2H₂O -điện phân→ 2H₂↑ + O₂↑</p>
    
    <p>Khí thiên nhiên + hơi nước:</p>
    <p class="reaction">CH₄ + H₂O -to, xt→ CO + 3H₂</p>
    
    <h3>4. Ứng dụng</h3>
    <ul>
      <li>Tổng hợp ammonia (NH₃) làm phân bón</li>
      <li>Tổng hợp methanol (CH₃OH)</li>
      <li>Nhiên liệu sạch (tên lửa, ô tô hydrogen)</li>
      <li>Luyện kim (khử oxide kim loại)</li>
      <li>Làm cứng dầu mỡ (margarine)</li>
      <li>Bơm khí cầu, khinh khí cầu (do nhẹ nhất)</li>
    </ul>
    
    <h3>5. Thử độ tinh khiết của hydrogen</h3>
    <p>Bật lửa gần miệng ống nghiệm chứa H₂:</p>
    <ul>
      <li>Nếu H₂ tinh khiết: cháy êm, ngọn lửa xanh nhạt</li>
      <li>Nếu H₂ lẫn không khí: nổ với tiếng "poóng" nhỏ</li>
    </ul>
  `,
  game: [
    {
      question: 'Hydrogen là chất khí:',
      options: ['Nặng nhất', 'Nhẹ nhất', 'Nặng bằng không khí', 'Nặng hơn oxygen'],
      correctAnswer: 1
    },
    {
      question: 'Phản ứng nào chứng minh hydrogen có tính khử?',
      options: ['2H₂ + O₂ → 2H₂O', 'CuO + H₂ → Cu + H₂O', 'Zn + 2HCl → ZnCl₂ + H₂', 'H₂O → H₂ + O₂'],
      correctAnswer: 1
    },
    {
      question: 'Trong phòng thí nghiệm, điều chế H₂ bằng phản ứng:',
      options: ['Đốt cháy nước', 'Zn + HCl', 'Nhiệt phân nước', 'CH₄ + H₂O'],
      correctAnswer: 1
    },
    {
      question: 'Tại sao phải thử độ tinh khiết H₂ trước khi đốt?',
      options: ['Để biết H₂ có cháy không', 'Vì hỗn hợp H₂ + không khí có thể nổ', 'Để biết H₂ có màu gì', 'Để đo khối lượng H₂'],
      correctAnswer: 1
    },
    {
      question: 'Ứng dụng nào KHÔNG phải của hydrogen?',
      options: ['Tổng hợp ammonia', 'Nhiên liệu tên lửa', 'Làm chất tẩy rửa', 'Luyện kim'],
      correctAnswer: 2
    }
  ]
};
