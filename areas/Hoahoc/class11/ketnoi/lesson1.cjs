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
  theoryModules: [
    {
        id: 'mod-1',
        type: 'heading',
        content: {
            text: 'Khái niệm cân bằng hoá học',
            level: 'h2'
        }
    },
    {
        id: 'mod-2',
        type: 'paragraph',
        content: {
            text: 'Trạng thái cân bằng động: tốc độ thuận = tốc độ nghịch, nồng độ cân bằng không đổi. Hằng số K mô tả mức độ tiến triển của phản ứng, chỉ phụ thuộc nhiệt độ.'
        }
    },
    {
        id: 'mod-3',
        type: 'infoBox',
        content: {
            title: 'Cân bằng động',
            content: 'Hệ phải kín; phản ứng thuận nghịch (ví dụ: N2 + 3H2 ⇌ 2NH3).\nỞ cân bằng: tốc độ thuận = tốc độ nghịch, đại lượng vĩ mô (nồng độ, áp suất) ổn định.\nKhông phải “dừng phản ứng” mà vẫn có chuyển hoá hai chiều liên tục.',
            color: 'gray',
            listType: 'bullet'
        }
    },
    {
        id: 'mod-4',
        type: 'warningBox',
        content: {
            title: 'Hằng số cân bằng',
            content: 'Phản ứng aA + bB ⇌ cC + dD: $K_c = \\dfrac{[C]^c[D]^d}{[A]^a[B]^b}$ (không ghi chất rắn/tinh khiết).\nKhí: $K_p$ tính theo áp suất riêng phần; liên hệ $K_p = K_c(RT)^{\\Delta n}$.\nK chỉ đổi khi nhiệt độ đổi; không đổi theo nồng độ ban đầu.',
            color: 'orange',
            listType: 'bullet'
        }
    },
    {
        id: 'mod-5',
        type: 'infoBox',
        content: {
            title: 'Đánh giá vị trí cân bằng',
            content: 'Tính thương số phản ứng $Q = \\dfrac{[C]^c[D]^d}{[A]^a[B]^b}$ tại thời điểm bất kì.\nSo sánh: Q K → chuyển dịch nghịch; Q = K → cân bằng.\nK rất lớn (\\(K \\gg 1\\)) → sản phẩm ưu thế; K rất nhỏ → chất phản ứng ưu thế.',
            color: 'purple',
            listType: 'bullet'
        }
    },
    {
        id: 'mod-6',
        type: 'infoBox',
        content: {
            title: 'Lưu ý & ngoại lệ',
            content: 'Không đưa chất rắn, lỏng tinh khiết vào biểu thức K (hoạt độ = 1).\nNhân/chia phương trình phản ứng → số mũ của K thay đổi tương ứng.\nKhi cộng phản ứng, nhân các K (hệ quả từ log). Đây là cách suy K tổng từ K thành phần.',
            color: 'gray',
            listType: 'bullet'
        }
    }
  ],
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
