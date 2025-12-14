module.exports = {
  classId: 8,
  curriculumType: 'ketnoi',
  chapterId: 1,
  lessonId: 7,
  title: 'Bảo toàn khối lượng trong phản ứng hóa học',
  theory: `
    <h2>Bài 7: Bảo toàn khối lượng trong phản ứng hóa học</h2>
    
    <h3>1. Định luật bảo toàn khối lượng</h3>
    <p><strong>Định luật bảo toàn khối lượng (Lomonosov - Lavoisier):</strong></p>
    <p class="important">"Trong một phản ứng hóa học, tổng khối lượng các chất sản phẩm bằng tổng khối lượng các chất tham gia phản ứng."</p>
    
    <h3>2. Công thức</h3>
    <p class="formula">m(chất tham gia) = m(sản phẩm)</p>
    <p>Hay: m(A) + m(B) = m(C) + m(D)</p>
    
    <h3>3. Giải thích</h3>
    <p>Trong phản ứng hóa học:</p>
    <ul>
      <li>Các nguyên tử chỉ tách ra khỏi phân tử này và kết hợp thành phân tử khác</li>
      <li>Số lượng và loại nguyên tử trước và sau phản ứng không thay đổi</li>
      <li>Khối lượng của mỗi loại nguyên tử không đổi</li>
      <li>→ Tổng khối lượng các chất được bảo toàn</li>
    </ul>
    
    <h3>4. Ví dụ minh họa</h3>
    <div class="example">
      <h4>Ví dụ 1:</h4>
      <p>Đốt cháy 12g carbon trong oxygen, thu được 44g CO₂.</p>
      <p>Tính khối lượng oxygen đã phản ứng.</p>
      <p><strong>Giải:</strong></p>
      <p>C + O₂ → CO₂</p>
      <p>Theo định luật bảo toàn khối lượng:</p>
      <p>m(C) + m(O₂) = m(CO₂)</p>
      <p>12 + m(O₂) = 44</p>
      <p>m(O₂) = 44 - 12 = 32g</p>
    </div>
    
    <div class="example">
      <h4>Ví dụ 2:</h4>
      <p>Cho 56g sắt tác dụng với 32g sulfur, thu được sản phẩm là sắt(II) sulfide.</p>
      <p>Tính khối lượng sắt(II) sulfide tạo thành.</p>
      <p><strong>Giải:</strong></p>
      <p>Fe + S → FeS</p>
      <p>m(Fe) + m(S) = m(FeS)</p>
      <p>56 + 32 = m(FeS)</p>
      <p>m(FeS) = 88g</p>
    </div>
    
    <h3>5. Lưu ý khi áp dụng</h3>
    <ul>
      <li>Phản ứng phải xảy ra trong hệ kín (không có chất thoát ra hoặc vào)</li>
      <li>Nếu có khí thoát ra hoặc bay hơi, cần tính đến khối lượng của chất khí</li>
      <li>Định luật chỉ áp dụng cho phản ứng hóa học, không áp dụng cho biến đổi vật lý</li>
    </ul>
  `,
  game: [
    {
      question: 'Định luật bảo toàn khối lượng do ai phát hiện?',
      options: ['Newton', 'Einstein', 'Lomonosov - Lavoisier', 'Mendeleev'],
      correctAnswer: 2
    },
    {
      question: 'Theo định luật bảo toàn khối lượng, trong phản ứng A + B → C + D thì:',
      options: ['m(A) = m(C)', 'm(A) + m(B) = m(C) + m(D)', 'm(A) = m(B)', 'm(C) = m(D)'],
      correctAnswer: 1
    },
    {
      question: 'Đốt cháy 4g hydrogen trong oxygen thu được 36g nước. Khối lượng oxygen đã phản ứng là:',
      options: ['32g', '40g', '8g', '36g'],
      correctAnswer: 0
    },
    {
      question: 'Tại sao khối lượng được bảo toàn trong phản ứng hóa học?',
      options: ['Vì số phân tử không đổi', 'Vì số nguyên tử và khối lượng mỗi nguyên tử không đổi', 'Vì nhiệt độ không đổi', 'Vì áp suất không đổi'],
      correctAnswer: 1
    },
    {
      question: 'Cho 12g Mg tác dụng với 8g O₂. Khối lượng MgO tạo thành là:',
      options: ['4g', '20g', '12g', '8g'],
      correctAnswer: 1
    }
  ]
};
