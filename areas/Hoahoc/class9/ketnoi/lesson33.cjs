module.exports = {
  classId: 9,
  curriculumType: 'ketnoi',
  chapterId: 10,
  chapterName: 'Chương 10: Khai thác tài nguyên từ vỏ trái đất',
  lessonId: 33,
  title: 'Bài 33: Sơ lược hóa học vỏ Trái Đất và khai thác tài nguyên',
  description: 'Thành phần vỏ Trái Đất, quặng và khai thác tài nguyên hợp lí.',
  level: 'Beginner',
  order: 16,
  theoryModules: [
    {
        id: 'mod-1',
        type: 'heading',
        content: {
            text: '🌍 Vỏ Trái Đất & tài nguyên',
            level: 'h2'
        }
    },
    {
        id: 'mod-2',
        type: 'paragraph',
        content: {
            text: 'Mục tiêu: nhận diện thành phần chính vỏ Trái Đất, khái niệm quặng/khoáng sản và khai thác bền vững.'
        }
    },
    {
        id: 'mod-3',
        type: 'infoBox',
        content: {
            title: 'Thành phần chính',
            content: 'Khoáng vật phổ biến: SiO₂ (thạch anh, cát), Al₂O₃ (bôxit), Fe₂O₃ (hematit).\nĐá vôi CaCO₃, dolomit CaMg(CO₃)₂, các silicat (felspat, mica).\nNguồn vật liệu xây dựng, kim loại, thủy tinh từ các khoáng này.',
            color: 'gray',
            listType: 'bullet'
        }
    },
    {
        id: 'mod-4',
        type: 'warningBox',
        content: {
            title: 'Quặng & khoáng sản',
            content: 'Khoáng sản: tích tụ tự nhiên khoáng vật; quặng: khoáng sản có giá trị khai thác.\nVí dụ: bôxit (Al), hematit (Fe), pirit (FeS₂), đá vôi (CaCO₃).\nChất lượng quặng quyết định chi phí khai thác, luyện kim.',
            color: 'orange',
            listType: 'bullet'
        }
    },
    {
        id: 'mod-5',
        type: 'infoBox',
        content: {
            title: 'Khai thác & chế biến',
            content: 'Các bước: khảo sát → khai thác (lộ thiên/hầm lò) → tuyển → chế biến/luyện kim.\nVí dụ: bôxit → Al₂O₃ (quy trình Bayer) → điện phân nhôm.\nĐá vôi → nung vôi/xi măng; cát thạch anh → thuỷ tinh.',
            color: 'blue',
            listType: 'bullet'
        }
    },
    {
        id: 'mod-6',
        type: 'infoBox',
        content: {
            title: 'Khai thác bền vững',
            content: 'Giảm bụi/khí thải, xử lí nước thải; tái sử dụng chất thải rắn.\nPhục hồi mỏ: phủ đất, trồng cây; giám sát sụt lún, xói mòn.\nTiết kiệm tài nguyên: tái chế kim loại, dùng vật liệu thay thế.',
            color: 'blue',
            listType: 'bullet'
        }
    },
    {
        id: 'mod-7',
        type: 'infoBox',
        content: {
            title: 'Bảng tóm tắt nhanh',
            content: 'Thành phần vỏ: chủ yếu oxit/silicat của Si, Al, Fe, Ca, Mg.\nQuặng = khoáng sản có giá trị kinh tế; ví dụ bôxit, hematit, đá vôi.\nKhai thác bền vững: xử lí ô nhiễm, phục hồi mỏ, tái chế tài nguyên.',
            color: 'purple',
            listType: 'bullet'
        }
    },
    {
        id: 'mod-8',
        type: 'infoBox',
        content: {
            title: '',
            content: '**Gợi ý hình**:\nBản đồ thành phần khoáng sản phổ biến: */images/hoahoc9/lesson33-minerals.png*\nChu trình khai thác → tuyển → luyện kim: */images/hoahoc9/lesson33-extraction.png*',
            color: 'gray',
            listType: 'bullet'
        }
    },
    {
        id: 'mod-9',
        type: 'warningBox',
        content: {
            title: 'Mini quiz đọc nhanh',
            content: 'Khoáng sản nào là quặng chính của Al? Cần bước chế biến gì?\nVì sao khai thác lộ thiên gây bụi và biến đổi cảnh quan?\nNêu một biện pháp phục hồi môi trường sau khai thác.\nTự trả lời trước khi làm trắc nghiệm.',
            color: 'orange',
            listType: 'bullet'
        }
    }
  ],
  game: [
    {
      type: 'multiple-choice',
      question: 'Thành phần cơ bản của đá vôi là:',
      options: ['CaSO4', 'CaCO3', 'SiO2', 'NaCl'],
      correctAnswer: 1,
      explanation: 'Đá vôi chứa chủ yếu CaCO3.'
    },
    {
      type: 'true-false',
      question: 'Bôxit là quặng nhôm (Al).',
      correctAnswer: true,
      explanation: 'Bôxit chứa nhiều Al2O3·nH2O.'
    },
    {
      type: 'multiple-choice',
      question: 'Khoáng sản nào là nguồn sắt chính?',
      options: ['Hematit', 'Thạch anh', 'Halit', 'Vôi sống'],
      correctAnswer: 0,
      explanation: 'Hematit (Fe2O3) là quặng sắt quan trọng.'
    },
    {
      type: 'fill-in-blank',
      question: 'Thành phần chính của cát là SiO2, còn gọi là ___',
      correctAnswer: 'thạch anh',
      explanation: 'Cát chủ yếu là thạch anh (SiO2).' 
    },
    {
      type: 'multiple-choice',
      question: 'Biện pháp nào không giúp giảm tác động khai thác?',
      options: ['Phục hồi môi trường', 'Xử lí bụi/khí thải', 'Tận thu tài nguyên không kiểm soát', 'Khai thác trái phép'],
      correctAnswer: 2,
      explanation: 'Tận thu không kiểm soát làm cạn kiệt và tăng ô nhiễm.'
    },
    {
      type: 'multiple-choice',
      question: 'SiO2 được tìm thấy nhiều nhất ở dạng khoáng sản nào?',
      options: ['Hematit', 'Thạch anh', 'Bôxit', 'Manhêxit'],
      correctAnswer: 1,
      explanation: 'Thạch anh là dạng SiO2 phổ biến trong vỏ Trái Đất.'
    },
    {
      type: 'true-false',
      question: 'Khai thác mỏ lộ thiên thường gây bụi và tổn thương cảnh quan.',
      correctAnswer: true,
      explanation: 'Mỏ lộ thiên gây tác động môi trường nếu không xử lí tốt.'
    },
    {
      type: 'fill-in-blank',
      question: 'Quặng là khoáng sản có ___ về kinh tế.',
      correctAnswer: 'giá trị',
      explanation: 'Quặng được khai thác vì có giá trị sử dụng/kinh tế.'
    },
    {
      type: 'multiple-choice',
      question: 'Khoáng sản nào là nguồn nhôm quan trọng?',
      options: ['Bôxit', 'Hematit', 'Pirit', 'Thạch cao'],
      correctAnswer: 0,
      explanation: 'Bôxit cung cấp Al2O3 để điện phân sản xuất nhôm.'
    },
    {
      type: 'multiple-choice',
      question: 'Biện pháp nào nên làm sau khai thác để phục hồi sinh thái?',
      options: ['Bỏ mỏ trong tình trạng cũ', 'Phủ đất, trồng cây phủ xanh', 'Xả nước thải trực tiếp', 'Đốt chất thải'],
      correctAnswer: 1,
      explanation: 'Phủ đất, trồng cây giúp phục hồi hệ sinh thái và chống xói mòn.'
    }
  ]
};
