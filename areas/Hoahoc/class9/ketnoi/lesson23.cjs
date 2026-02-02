module.exports = {
  classId: 9,
  curriculumType: 'ketnoi',
  chapterId: 7,
  chapterName: 'Chương 7: Giới thiệu về chất hữu cơ. Hydrocarbon và nguồn nhiên liệu',
  lessonId: 23,
  title: 'Bài 23: Ankan',
  description: 'Cấu tạo, tính chất và ứng dụng của dãy đồng đẳng ankan.',
  level: 'Intermediate',
  order: 6,
  theoryModules: [
    {
        id: 'mod-1',
        type: 'heading',
        content: {
            text: '🛢️ Ankan (paraffin)',
            level: 'h2'
        }
    },
    {
        id: 'mod-2',
        type: 'paragraph',
        content: {
            text: 'Mục tiêu: nhận dạng ankan, nắm trạng thái vật lí theo số C, phản ứng đặc trưng và nguồn gốc.'
        }
    },
    {
        id: 'mod-3',
        type: 'infoBox',
        content: {
            title: 'Cấu tạo & công thức',
            content: 'Công thức chung: C₍n₎H₍2n+2₎ (n ≥ 1).\nLiên kết đơn σ C-C, C-H → no, ít phản ứng cộng.\nMạch thẳng/nhánh; đồng phân xuất hiện từ C₄H₁₀.',
            color: 'gray',
            listType: 'bullet'
        }
    },
    {
        id: 'mod-4',
        type: 'infoBox',
        content: {
            title: 'Tính chất vật lí',
            content: 'C₁-C₄: khí; C₅-C₁₇: lỏng; >C₁₈: rắn sáp.\nKhông tan nước, nhẹ hơn nước; tăng C → tăng nhiệt độ sôi/nóng chảy.\nKhí hoá lỏng (LPG: propan-butan) dùng làm nhiên liệu.',
            color: 'blue',
            listType: 'bullet'
        }
    },
    {
        id: 'mod-5',
        type: 'warningBox',
        content: {
            title: 'Tính chất hoá học',
            content: '**Cháy:** toả nhiều nhiệt → CO₂ + H₂O.\n**Thế halogen (ánh sáng):** CH₄ + Cl₂ → CH₃Cl + HCl.\n**Cracking:** cắt mạch dài thành mạch ngắn/anken (công nghiệp dầu khí).',
            color: 'orange',
            listType: 'bullet'
        }
    },
    {
        id: 'mod-6',
        type: 'infoBox',
        content: {
            title: 'Nguồn gốc & ứng dụng',
            content: 'Nguồn: khí tự nhiên, dầu mỏ, khí đồng hành mỏ dầu.\nỨng dụng: nhiên liệu (gas, xăng), dung môi không phân cực, nguyên liệu hoá dầu.\nMôi trường: cháy không hoàn toàn → CO, muội; cần đốt đủ oxi.',
            color: 'blue',
            listType: 'bullet'
        }
    },
    {
        id: 'mod-7',
        type: 'infoBox',
        content: {
            title: 'Bảng tóm tắt nhanh',
            content: 'CTPT chung: C₍n₎H₍2n+2₎; góc lai hoá sp³, cấu trúc tứ diện.\nPhản ứng chủ yếu: cháy, thế (halogen), cracking (công nghiệp).\nỨng dụng: LPG (C₃-C₄), xăng (C₅-C₁₀), dầu hoả (C₁₀-C₁₆), parafin (nến).',
            color: 'purple',
            listType: 'bullet'
        }
    },
    {
        id: 'mod-8',
        type: 'infoBox',
        content: {
            title: '',
            content: '**Gợi ý hình/infographic**:\nBiểu đồ nhiệt độ sôi vs số C: */images/hoahoc9/lesson23-boiling.png*\nSơ đồ cracking ankan dài: */images/hoahoc9/lesson23-cracking.png*',
            color: 'gray',
            listType: 'bullet'
        }
    },
    {
        id: 'mod-9',
        type: 'warningBox',
        content: {
            title: 'Mini quiz đọc nhanh',
            content: 'Vì sao ankan ít phản ứng cộng so với anken?\nGiải thích vì sao LPG cần mùi cảnh báo dù khí sạch.\nCó bao nhiêu đồng phân cấu tạo của C₄H₁₀?\nTự trả lời trước khi làm bộ 10 câu quiz bên dưới.',
            color: 'orange',
            listType: 'bullet'
        }
    }
  ],
  game: [
    {
      type: 'multiple-choice',
      question: 'Công thức phân tử của propan là:',
      options: ['C2H6', 'C3H8', 'C4H10', 'C5H12'],
      correctAnswer: 1,
      explanation: 'Propan n = 3 → C3H8.'
    },
    {
      type: 'true-false',
      question: 'Ankan chỉ có liên kết đơn nên gọi là hydrocarbon no.',
      correctAnswer: true,
      explanation: 'Đúng, không có liên kết đôi/ba.'
    },
    {
      type: 'multiple-choice',
      question: 'Phạm vi trạng thái lỏng của ankan là:',
      options: ['C1-C4', 'C5-C17', 'C18 trở lên', 'Tất cả khí'],
      correctAnswer: 1,
      explanation: 'C5-C17 thường ở trạng thái lỏng.'
    },
    {
      type: 'fill-in-blank',
      question: 'Phản ứng thế: CH4 + Cl2 (ánh sáng) → ___ + HCl',
      correctAnswer: 'CH3Cl',
      explanation: 'Metyl clorua được tạo thành.'
    },
    {
      type: 'multiple-choice',
      question: 'Nguồn chính cung cấp ankan:',
      options: ['Đường mía', 'Khí tự nhiên, dầu mỏ', 'Than gỗ', 'Đá vôi'],
      correctAnswer: 1,
      explanation: 'Ankan có nhiều trong khí tự nhiên và dầu mỏ thô.'
    },
    {
      type: 'multiple-choice',
      question: 'Công thức chung của ankan là ___',
      options: ['CnH2n', 'CnH2n+2', 'CnH2n-2', 'CnH2n+1'],
      correctAnswer: 1,
      explanation: 'Ankan có công thức CnH2n+2.'
    },
    {
      type: 'true-false',
      question: 'Ankan không phản ứng cộng do chỉ có liên kết đơn.',
      correctAnswer: true,
      explanation: 'Liên kết sigma C-C, C-H ổn định, chủ yếu tham gia thế và oxi hoá mạnh.'
    },
    {
      type: 'fill-in-blank',
      question: 'Butan có công thức là C4H__',
      correctAnswer: '10',
      explanation: 'n = 4 → C4H10.'
    },
    {
      type: 'multiple-choice',
      question: 'Sản phẩm cháy đầy đủ của ankan trong oxi là:',
      options: ['CO + H2', 'CO2 + H2O', 'CO2 + CO', 'C + H2O'],
      correctAnswer: 1,
      explanation: 'Cháy đầy đủ tạo CO2 và H2O giải phóng nhiều nhiệt.'
    },
    {
      type: 'multiple-choice',
      question: 'Ankan nào ở trạng thái khí ở điều kiện thường?',
      options: ['Hexan', 'Propan', 'Dodecan', 'Octan'],
      correctAnswer: 1,
      explanation: 'C1-C4 là khí: metan, etan, propan, butan.'
    }
  ]
};
