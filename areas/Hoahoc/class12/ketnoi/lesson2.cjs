module.exports = {
  classId: 12,
  curriculumType: 'ketnoi',
  chapterId: 1,
  chapterName: 'Chương 1: Ester - lipid',
  lessonId: 2,
  title: 'Bài 2: Xà phòng và chất giặt rửa',
  description: 'Cơ chế tẩy rửa, thành phần, điều chế xà phòng và chất hoạt động bề mặt.',
  level: 'Intermediate',
  order: 2,
  theoryModules: [
    {
        id: 'mod-1',
        type: 'heading',
        content: {
            text: 'Xà phòng và chất giặt rửa',
            level: 'h2'
        }
    },
    {
        id: 'mod-2',
        type: 'paragraph',
        content: {
            text: 'Hiểu cấu tạo chất hoạt động bề mặt, cơ chế micelle, khác biệt xà phòng và chất tẩy tổng hợp để chọn sản phẩm thân thiện.'
        }
    },
    {
        id: 'mod-3',
        type: 'infoBox',
        content: {
            title: 'Xà phòng',
            content: 'Muối natri/kali của axit béo (RCOO⁽-⁾Na⁽+⁾/K⁽+⁾); sản xuất bằng xà phòng hoá mỡ/dầu.\nCơ chế micelle: đuôi kị nước bám chất bẩn, đầu ưa nước hướng ra ngoài → nhũ hoá, cuốn trôi.\nHạn chế: kết tủa với Ca⁽2+⁾, Mg⁽2+⁾ trong nước cứng tạo "cặn xà phòng".',
            color: 'gray',
            listType: 'bullet'
        }
    },
    {
        id: 'mod-4',
        type: 'infoBox',
        content: {
            title: 'Chất giặt rửa tổng hợp',
            content: 'Hoạt chất: anion (alkylbenzen sulfonat), cation, lưỡng cực; dùng được trong nước cứng.\nPhụ gia: chất độn (Na2SO4), builders (polyphosphate, zeolit), enzyme, chất tẩy trắng quang học.\nƯu tiên công thức dễ phân huỷ sinh học (ABS tuyến tính), giảm phosphate để hạn chế phú dưỡng.',
            color: 'blue',
            listType: 'bullet'
        }
    },
    {
        id: 'mod-5',
        type: 'infoBox',
        content: {
            title: 'An toàn & môi trường',
            content: 'Tránh pha trộn hoá chất tẩy chứa clo với axit → khí độc Cl2.\nChọn sản phẩm nhãn sinh học, giảm bao bì nhựa; dùng đúng liều để giảm COD/BOD nước thải.\nXử lý nước thải: bể hiếu khí, keo tụ, than hoạt tính để loại tenside và phosphate.',
            color: 'gray',
            listType: 'bullet'
        }
    },
    {
        id: 'mod-6',
        type: 'infoBox',
        content: {
            title: 'Case thực tế',
            content: 'Giặt nước cứng: ưu tiên bột giặt anion + zeolit, hạn chế xà phòng để tránh cặn.\nVết dầu mỡ: ngâm ấm + chất hoạt động bề mặt không ion (Tween) ít bọt, ít kích ứng.\nĐồ trẻ em/da nhạy cảm: chọn công thức không hương liệu mạnh, không chất tẩy quang.',
            color: 'purple',
            listType: 'bullet'
        }
    },
    {
        id: 'mod-7',
        type: 'infoBox',
        content: {
            title: 'Mẹo ghi nhớ nhanh',
            content: '“Xà phòng sợ cứng” → Ca/Mg kết tủa; “tổng hợp kệ cứng” → LAS vẫn hoạt động.\nCMC: càng thấp → tạo micelle dễ → bọt nhanh; nhưng ít bọt ≠ kém tẩy (do công thức ít tạo bọt).\nBuilders = bắt Ca/Mg + đệm pH: phosphate (mạnh nhưng ô nhiễm) → thay bằng zeolit, citrate.',
            color: 'blue',
            listType: 'bullet'
        }
    },
    {
        id: 'mod-8',
        type: 'infoBox',
        content: {
            title: 'Ôn bài tập nhanh',
            content: 'Cân bằng xà phòng hoá: 1 triglycerid + 3 kiềm → 3 muối + glixerol; bảo toàn Na⁽+⁾ để tính khối lượng.\nNhận biết nước cứng: tạo cặn, ít bọt; xử lý: đun sôi (tạm thời) hoặc trao đổi ion.\nSo sánh hiệu quả tẩy: dựa chuỗi alkyl (C12-C18 tối ưu) và đầu phân cực (anion > không ion ~ cation cho khử khuẩn).',
            color: 'gray',
            listType: 'bullet'
        }
    }
  ],
  game: [
    {
      type: 'multiple-choice',
      question: 'Thành phần hoạt động chính của xà phòng là:',
      options: ['Axit béo', 'Muối natri/kali của axit béo', 'Ancol béo', 'Axit sunfonic'],
      correctAnswer: 1,
      explanation: 'Xà phòng là muối RCOO- Na+/K+ thu từ xà phòng hoá triglycerid.',
      points: 10
    },
    {
      type: 'multiple-choice',
      question: 'Chất hoạt động bề mặt anion phổ biến trong bột giặt là:',
      options: ['LAS (alkylbenzen sulfonat)', 'CTAB (cetyl trimetyl amoni bromide)', 'Tween 80', 'PEG'],
      correctAnswer: 0,
      explanation: 'LAS tuyến tính dễ phân huỷ sinh học, tạo bọt tốt.',
      points: 10
    },
    {
      type: 'true-false',
      question: 'Xà phòng bị giảm tác dụng trong nước cứng do tạo muối không tan với Ca2+, Mg2+. ',
      correctAnswer: true,
      explanation: 'Ca2+/Mg2+ kết tủa RCOO- → "cặn xà phòng".',
      points: 10
    },
    {
      type: 'multiple-choice',
      question: 'Builders trong bột giặt có vai trò chính là:',
      options: ['Tạo màu', 'Làm mềm nước, tăng hiệu tẩy', 'Tạo mùi', 'Khử trùng'],
      correctAnswer: 1,
      explanation: 'Polyphosphate/zeolit bắt giữ Ca2+, Mg2+, nâng pH giúp tenside hoạt động.',
      points: 10
    },
    {
      type: 'multiple-choice',
      question: 'Micelle hình thành khi nồng độ chất hoạt động bề mặt vượt:',
      options: ['Nhiệt độ sôi', 'Điểm đông đặc', 'CMC (nồng độ tới hạn micelle)', 'pH = 7'],
      correctAnswer: 2,
      explanation: 'CMC là ngưỡng tạo cấu trúc micelle ổn định.',
      points: 10
    },
    {
      type: 'true-false',
      question: 'Chất hoạt động bề mặt cationic thường dùng làm chất diệt khuẩn, xả vải.',
      correctAnswer: true,
      explanation: 'Hợp chất amoni bậc bốn có tính diệt khuẩn và bám tốt trên sợi.',
      points: 10
    },
    {
      type: 'multiple-choice',
      question: 'Phản ứng xà phòng hoá triglycerid cần:',
      options: ['NaOH hoặc KOH, đun nóng', 'H2SO4 đặc, lạnh', 'KMnO4', 'H2/Pt'],
      correctAnswer: 0,
      explanation: 'Đun với kiềm để thu muối axit béo và glixerol.',
      points: 10
    },
    {
      type: 'multiple-choice',
      question: 'Tác động môi trường chính của phosphate trong bột giặt là:',
      options: ['Tăng độ mặn', 'Gây phú dưỡng nguồn nước', 'Tăng độ pH đất', 'Tạo mùi khó chịu'],
      correctAnswer: 1,
      explanation: 'Phosphate là dinh dưỡng mạnh, kích thích tảo nở hoa gây thiếu oxy.',
      points: 10
    },
    {
      type: 'fill-in-blank',
      question: 'Trong cơ chế micelle, đuôi hydrocarbon của chất hoạt động bề mặt có tính ______.',
      correctAnswer: 'kị nước',
      explanation: 'Đuôi không phân cực kị nước bám vào dầu mỡ.',
      points: 10
    },
    {
      type: 'multiple-choice',
      question: 'Biện pháp thân thiện hơn với môi trường khi chọn bột giặt:',
      options: ['Chọn nhiều phosphate', 'Chọn ít bọt, dễ phân huỷ sinh học', 'Chọn mùi càng mạnh càng tốt', 'Dùng quá liều khuyến cáo'],
      correctAnswer: 1,
      explanation: 'Công thức dễ phân huỷ, dùng đúng liều giúp giảm tải ô nhiễm.',
      points: 10
    }
  ]
};
