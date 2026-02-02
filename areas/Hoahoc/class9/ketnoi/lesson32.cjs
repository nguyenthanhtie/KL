module.exports = {
  classId: 9,
  curriculumType: 'ketnoi',
  chapterId: 9,
  chapterName: 'Chương 9: Lipid. Carbohydrate. Protein. Polymer',
  lessonId: 32,
  title: 'Bài 32: Polime',
  description: 'Khái niệm polime, ví dụ và ứng dụng thông dụng.',
  level: 'Beginner',
  order: 15,
  theoryModules: [
    {
        id: 'mod-1',
        type: 'heading',
        content: {
            text: '🧵 Polime',
            level: 'h2'
        }
    },
    {
        id: 'mod-2',
        type: 'paragraph',
        content: {
            text: 'Mục tiêu: hiểu khái niệm, phân loại, phương pháp tạo, tính chất và tác động môi trường của polime.'
        }
    },
    {
        id: 'mod-3',
        type: 'infoBox',
        content: {
            title: 'Khái niệm & phân loại',
            content: 'Phân tử rất lớn từ nhiều monome lặp lại.\nTự nhiên: xenlulozơ, protein, tinh bột.\nNhân tạo/tổng hợp: PE, PP, PVC, PS, nylon; bán tổng hợp: cao su buna-N.',
            color: 'gray',
            listType: 'bullet'
        }
    },
    {
        id: 'mod-4',
        type: 'warningBox',
        content: {
            title: 'Phản ứng tạo polime',
            content: '**Trùng hợp:** mở liên kết đôi/ba của monome không no (CH₂=CH₂ → -CH₂-CH₂-)ₙ.\n**Trùng ngưng:** monome có nhóm -COOH, -NH₂... tách nhỏ H₂O/HCl (VD: hexametylen điamin + axit adipic → nylon-6,6).\nĐồng trùng hợp: ghép 2+ monome khác nhau (butadien + acrylonitrin → buna-N).',
            color: 'orange',
            listType: 'bullet'
        }
    },
    {
        id: 'mod-5',
        type: 'infoBox',
        content: {
            title: 'Tính chất & ví dụ',
            content: 'Thường bền, nhẹ, cách điện, không tan nước.\nPE mềm, dẻo; PVC bền, chống cháy; PS cứng, trong; cao su đàn hồi.\nPLA từ tinh bột: có thể phân huỷ sinh học.',
            color: 'blue',
            listType: 'bullet'
        }
    },
    {
        id: 'mod-6',
        type: 'infoBox',
        content: {
            title: 'Môi trường & ứng dụng',
            content: 'Vấn đề: rác nhựa khó phân huỷ → cần tái chế, phân loại, dùng vật liệu sinh học.\nỨng dụng: nhựa bao bì, sợi (nylon, polyester), cao su, keo dán, y sinh.\nGiải pháp: giảm dùng nhựa dùng một lần, tăng tái chế, phát triển biopolymer.',
            color: 'blue',
            listType: 'bullet'
        }
    },
    {
        id: 'mod-7',
        type: 'infoBox',
        content: {
            title: 'Bảng tóm tắt nhanh',
            content: 'Polime = chuỗi monome; có trùng hợp, trùng ngưng, đồng trùng hợp.\nTính chất: bền, nhẹ, cách điện; một số khó phân huỷ → rác nhựa.\nƯu tiên tái chế, chọn vật liệu sinh học khi có thể.',
            color: 'purple',
            listType: 'bullet'
        }
    },
    {
        id: 'mod-8',
        type: 'infoBox',
        content: {
            title: '',
            content: '**Gợi ý hình**:\nSo sánh trùng hợp vs trùng ngưng: */images/hoahoc9/lesson32-polymerization.png*\nVòng đời nhựa và tái chế: */images/hoahoc9/lesson32-recycle.png*',
            color: 'gray',
            listType: 'bullet'
        }
    },
    {
        id: 'mod-9',
        type: 'warningBox',
        content: {
            title: 'Mini quiz đọc nhanh',
            content: 'PE sinh ra từ monome nào và thuộc phản ứng gì?\nVì sao nhựa PVC không nên đốt bừa bãi?\nBiện pháp nào giúp giảm rác nhựa khó phân huỷ?\nTự trả lời rồi luyện bộ trắc nghiệm.',
            color: 'orange',
            listType: 'bullet'
        }
    }
  ],
  game: [
    {
      type: 'multiple-choice',
      question: 'Polietilen (PE) được tạo từ monome nào?',
      options: ['Etilen', 'Propylen', 'Vinyl clorua', 'Styren'],
      correctAnswer: 0,
      explanation: 'PE trùng hợp từ etilen (CH2=CH2).' 
    },
    {
      type: 'true-false',
      question: 'Xenlulozơ là polime tự nhiên.',
      correctAnswer: true,
      explanation: 'Xenlulozơ là polisaccarit tự nhiên.'
    },
    {
      type: 'multiple-choice',
      question: 'Nylon-6,6 là ví dụ polime được tạo bởi phản ứng:',
      options: ['Trùng hợp', 'Trùng ngưng', 'Điện phân', 'Ngưng tụ với kim loại'],
      correctAnswer: 1,
      explanation: 'Nylon-6,6 hình thành qua trùng ngưng giữa điamin và điacid.'
    },
    {
      type: 'fill-in-blank',
      question: 'PVC có monome là vinyl ___',
      correctAnswer: 'clorua',
      explanation: 'Monome: CH2=CHCl.'
    },
    {
      type: 'multiple-choice',
      question: 'Vấn đề môi trường của polime nhân tạo là:',
      options: ['Phát tia UV', 'Khó phân huỷ, rác thải nhựa', 'Phát mùi thơm', 'Không tồn tại'],
      correctAnswer: 1,
      explanation: 'Nhiều polime khó phân huỷ, gây ô nhiễm nhựa.'
    },
    {
      type: 'multiple-choice',
      question: 'Loại polime nào phân huỷ sinh học tốt hơn?',
      options: ['PE thông thường', 'PVC', 'PLA từ tinh bột', 'PS (xốp)'],
      correctAnswer: 2,
      explanation: 'PLA (polylactic acid) từ nguồn tái tạo có khả năng phân huỷ sinh học.'
    },
    {
      type: 'true-false',
      question: 'Trùng hợp là phản ứng ghép các monome không no thành chuỗi dài.',
      correctAnswer: true,
      explanation: 'Monome có liên kết đôi/ba được mở ra tạo polime (VD etilen → PE).' 
    },
    {
      type: 'fill-in-blank',
      question: 'Polystyren được tạo từ monome styren (C6H5-CH=CH2) qua phản ứng ___ hợp.',
      correctAnswer: 'trùng',
      explanation: 'Trùng hợp mở liên kết đôi tạo chuỗi polystyren.'
    },
    {
      type: 'multiple-choice',
      question: 'Cao su buna-N được tạo từ butadien và:',
      options: ['Etylen', 'Vinyl clorua', 'Acrylonitrin', 'Cloroform'],
      correctAnswer: 2,
      explanation: 'Buna-N là đồng trùng hợp butadien và acrylonitrin.'
    },
    {
      type: 'multiple-choice',
      question: 'Tính chất chung của đa số polime:',
      options: ['Dẫn điện tốt', 'Bền, nhẹ, dễ gia công', 'Dễ bay hơi', 'Tan tốt trong nước'],
      correctAnswer: 1,
      explanation: 'Polime thường bền, nhẹ, dễ gia công nhưng không dẫn điện và khó tan nước.'
    }
  ]
};
