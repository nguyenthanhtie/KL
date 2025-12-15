module.exports = {
  classId: 11,
  curriculumType: 'ketnoi',
  chapterId: 1,
  chapterName: 'Chương 1: Cân bằng hoá học',
  lessonId: 1,
  title: 'Bài 1: Khái niệm về cân bằng hoá học',
  description: 'Khái niệm hệ cân bằng, hằng số cân bằng K và điều kiện thiết lập.',
  level: 'Intermediate',
  order: 1,
  theory: `
    <h2>Khái niệm cân bằng hoá học</h2>
    <p style="margin:8px 0; color:#334155;">Trạng thái cân bằng động: tốc độ thuận = tốc độ nghịch, nồng độ cân bằng không đổi. Hằng số K mô tả mức độ tiến triển của phản ứng, chỉ phụ thuộc nhiệt độ.</p>

    <div style="display:grid; gap:12px; grid-template-columns:repeat(auto-fit,minmax(260px,1fr)); margin:12px 0;">
      <div style="padding:12px; border:1px solid #e2e8f0; border-radius:10px; background:#f8fafc;">
        <h4 style="margin:0 0 6px; color:#0f172a;">Cân bằng động</h4>
        <ul style="margin:0; padding-left:18px; color:#475569;">
          <li>Hệ phải kín; phản ứng thuận nghịch (ví dụ: N2 + 3H2 ⇌ 2NH3).</li>
          <li>Ở cân bằng: tốc độ thuận = tốc độ nghịch, đại lượng vĩ mô (nồng độ, áp suất) ổn định.</li>
          <li>Không phải “dừng phản ứng” mà vẫn có chuyển hoá hai chiều liên tục.</li>
        </ul>
      </div>
      <div style="padding:12px; border:1px solid #e2e8f0; border-radius:10px; background:#fff7ed;">
        <h4 style="margin:0 0 6px; color:#9a3412;">Hằng số cân bằng</h4>
        <ul style="margin:0; padding-left:18px; color:#7c2d12;">
          <li>Phản ứng aA + bB ⇌ cC + dD: $K_c = \dfrac{[C]^c[D]^d}{[A]^a[B]^b}$ (không ghi chất rắn/tinh khiết).</li>
          <li>Khí: $K_p$ tính theo áp suất riêng phần; liên hệ $K_p = K_c(RT)^{\Delta n}$.</li>
          <li>K chỉ đổi khi nhiệt độ đổi; không đổi theo nồng độ ban đầu.</li>
        </ul>
      </div>
    </div>

    <div style="display:grid; gap:12px; grid-template-columns:repeat(auto-fit,minmax(260px,1fr)); margin:12px 0;">
      <div style="padding:12px; border-radius:12px; border:1px solid #cbd5e1; background:linear-gradient(135deg,#eef2ff,#f8fafc);">
        <h4 style="margin:0 0 6px; color:#312e81;">Đánh giá vị trí cân bằng</h4>
        <ul style="margin:0; padding-left:18px; color:#334155;">
          <li>Tính thương số phản ứng $Q = \dfrac{[C]^c[D]^d}{[A]^a[B]^b}$ tại thời điểm bất kì.</li>
          <li>So sánh: Q &lt; K → chuyển dịch thuận; Q &gt; K → chuyển dịch nghịch; Q = K → cân bằng.</li>
          <li>K rất lớn (\(K \gg 1\)) → sản phẩm ưu thế; K rất nhỏ → chất phản ứng ưu thế.</li>
        </ul>
      </div>
      <div style="padding:12px; border:1px dashed #cbd5e1; border-radius:10px; background:#f8fafc; color:#475569;">
        <h4 style="margin:0 0 6px;">Lưu ý & ngoại lệ</h4>
        <ul style="margin:0; padding-left:18px;">
          <li>Không đưa chất rắn, lỏng tinh khiết vào biểu thức K (hoạt độ = 1).</li>
          <li>Nhân/chia phương trình phản ứng → số mũ của K thay đổi tương ứng.</li>
          <li>Khi cộng phản ứng, nhân các K (hệ quả từ log). Đây là cách suy K tổng từ K thành phần.</li>
        </ul>
      </div>
    </div>
  `,
  game: [
    {
      type: 'multiple-choice',
      question: 'Điều kiện để phản ứng đạt cân bằng hoá học là:',
      options: ['Hệ mở, phản ứng một chiều', 'Hệ kín, phản ứng thuận nghịch', 'Có xúc tác là đủ', 'Nồng độ chất đầu bằng nhau'],
      correctAnswer: 1,
      explanation: 'Cần hệ kín và phản ứng thuận nghịch để thiết lập cân bằng động.',
      points: 10
    },
    {
      type: 'multiple-choice',
      question: 'Biểu thức $K_c$ của phản ứng 2SO2 + O2 ⇌ 2SO3 là:',
      options: [
        '[SO3]^2 / ([SO2]^2[O2])',
        '[SO2]^2[O2] / [SO3]^2',
        '[SO3] / ([SO2][O2])',
        '[SO2][O2] / [SO3]'
      ],
      correctAnswer: 0,
      explanation: 'Hệ số cân bằng thành số mũ: $K_c = \dfrac{[SO3]^2}{[SO2]^2[O2]}$.',
      points: 10
    },
    {
      type: 'multiple-choice',
      question: 'Khi Q &lt; K, hệ sẽ:',
      options: ['Chuyển dịch thuận tạo thêm sản phẩm', 'Chuyển dịch nghịch', 'Đã ở cân bằng', 'Không thể xác định'],
      correctAnswer: 0,
      explanation: 'Q &lt; K nghĩa là chưa đủ sản phẩm, hệ tiến về phải để đạt K.',
      points: 10
    },
    {
      type: 'true-false',
      question: 'Chất rắn tinh khiết không xuất hiện trong biểu thức hằng số cân bằng.',
      correctAnswer: true,
      explanation: 'Hoạt độ của chất rắn/tinh khiết xem như 1 nên bỏ khỏi K.',
      points: 10
    },
    {
      type: 'multiple-choice',
      question: 'Với phản ứng N2 + 3H2 ⇌ 2NH3, nếu nhân đôi toàn bộ phương trình, hằng số cân bằng K mới bằng:',
      options: ['K', 'K^2', '√K', '1/K'],
      correctAnswer: 1,
      explanation: 'Nhân hệ số phản ứng → số mũ trong K tăng gấp đôi → K mới = K^2.',
      points: 10
    },
    {
      type: 'multiple-choice',
      question: 'Ý nghĩa của K rất lớn (\(K \gg 1\)) là:',
      options: ['Hầu như không tạo sản phẩm', 'Cân bằng nghiêng mạnh về sản phẩm', 'Cân bằng ở giữa', 'Phản ứng không thuận nghịch'],
      correctAnswer: 1,
      explanation: 'K lớn → nồng độ sản phẩm tại cân bằng cao so với chất đầu.',
      points: 10
    },
    {
      type: 'multiple-choice',
      question: 'Đại lượng nào thay đổi khi thay đổi nồng độ đầu?',
      options: ['Giá trị K', 'Nhiệt độ cân bằng', 'Thời gian đạt cân bằng và giá trị Q', 'Hệ số cân bằng'],
      correctAnswer: 2,
      explanation: 'K chỉ phụ thuộc T; nồng độ đầu làm Q khác K và thời gian đạt cân bằng thay đổi.',
      points: 10
    },
    {
      type: 'true-false',
      question: 'Ở cân bằng, tốc độ thuận bằng tốc độ nghịch.',
      correctAnswer: true,
      explanation: 'Định nghĩa trạng thái cân bằng động.',
      points: 10
    },
    {
      type: 'multiple-choice',
      question: 'Chất xúc tác ảnh hưởng lên K như thế nào?',
      options: ['Làm K tăng', 'Làm K giảm', 'Không làm đổi K, chỉ rút ngắn thời gian đạt cân bằng', 'Làm phản ứng chỉ đi một chiều'],
      correctAnswer: 2,
      explanation: 'Xúc tác hạ năng lượng hoạt hoá cả hai chiều nên không đổi K.',
      points: 10
    },
    {
      type: 'fill-in-blank',
      question: 'Ở 25°C, K chỉ phụ thuộc ______ của hệ phản ứng.',
      correctAnswer: 'nhiệt độ',
      explanation: 'Hằng số cân bằng là hàm của nhiệt độ.',
      points: 10
    }
  ]
};
