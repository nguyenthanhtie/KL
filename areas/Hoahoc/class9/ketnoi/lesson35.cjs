module.exports = {
  classId: 9,
  curriculumType: 'ketnoi',
  chapterId: 10,
  chapterName: 'Chương 10: Khai thác tài nguyên từ vỏ trái đất',
  lessonId: 35,
  title: 'Bài 35: Khai thác nhiên liệu hóa thạch - Chu trình cacbon - Sự ấm lên toàn cầu',
  description: 'Liên hệ khai thác nhiên liệu, khí nhà kính và biến đổi khí hậu.',
  level: 'Intermediate',
  order: 18,
  theoryModules: [
    {
        id: 'mod-1',
        type: 'heading',
        content: {
            text: '🌡️ Nhiên liệu hoá thạch, chu trình carbon & khí hậu',
            level: 'h2'
        }
    },
    {
        id: 'mod-2',
        type: 'paragraph',
        content: {
            text: 'Mục tiêu: hiểu liên hệ giữa đốt nhiên liệu, chu trình carbon và hiệu ứng nhà kính; gợi ý giải pháp giảm phát thải.'
        }
    },
    {
        id: 'mod-3',
        type: 'infoBox',
        content: {
            title: 'Khai thác & phát thải',
            content: 'Đốt than, dầu, khí → CO₂, NOₓ, SO₂, bụi mịn.\nSản xuất điện, giao thông, công nghiệp là nguồn phát thải lớn.\nRò rỉ CH₄ từ khai thác khí, bãi rác, chăn nuôi.',
            color: 'gray',
            listType: 'bullet'
        }
    },
    {
        id: 'mod-4',
        type: 'warningBox',
        content: {
            title: 'Chu trình carbon',
            content: 'CO₂ luân chuyển giữa khí quyển ↔ sinh khối (quang hợp/hô hấp) ↔ đại dương ↔ đất/đá.\nĐốt nhiên liệu + phá rừng → tăng CO₂, phá vỡ cân bằng.\nĐại dương hấp thụ CO₂ gây axit hoá nước biển.',
            color: 'orange',
            listType: 'bullet'
        }
    },
    {
        id: 'mod-5',
        type: 'infoBox',
        content: {
            title: 'Hiệu ứng nhà kính',
            content: 'Khí nhà kính: CO₂, CH₄, N₂O, hơi nước giữ nhiệt từ bức xạ hồng ngoại.\nHậu quả: ấm lên toàn cầu, băng tan, mực biển dâng, thời tiết cực đoan.\nMục tiêu toàn cầu: giảm phát thải để hạn chế tăng nhiệt độ trung bình.',
            color: 'blue',
            listType: 'bullet'
        }
    },
    {
        id: 'mod-6',
        type: 'infoBox',
        content: {
            title: 'Giải pháp giảm phát thải',
            content: 'Chuyển dịch năng lượng tái tạo (gió, mặt trời), tiết kiệm năng lượng.\nCCS: thu giữ, nén, lưu trữ CO₂ từ nhà máy nhiệt điện.\nTrồng rừng, bảo vệ rừng; giao thông xanh (xe điện, công cộng).\nTiêu dùng bền vững: giảm dùng nhựa, tiết kiệm điện, tái chế.',
            color: 'blue',
            listType: 'bullet'
        }
    },
    {
        id: 'mod-7',
        type: 'infoBox',
        content: {
            title: 'Bảng tóm tắt nhanh',
            content: 'Đốt nhiên liệu hoá thạch tăng CO₂/CH₄ → hiệu ứng nhà kính mạnh hơn.\nChu trình carbon bị mất cân bằng khi phát thải vượt hấp thụ.\nGiải pháp: tái tạo năng lượng, CCS, trồng rừng, tiết kiệm, giao thông xanh.',
            color: 'purple',
            listType: 'bullet'
        }
    },
    {
        id: 'mod-8',
        type: 'infoBox',
        content: {
            title: '',
            content: '**Gợi ý hình**:\nSơ đồ chu trình carbon: */images/hoahoc9/lesson35-carboncycle.png*\nHiệu ứng nhà kính và bẫy nhiệt: */images/hoahoc9/lesson35-greenhouse.png*\nQuy trình CCS thu giữ CO₂: */images/hoahoc9/lesson35-ccs.png*',
            color: 'gray',
            listType: 'bullet'
        }
    },
    {
        id: 'mod-9',
        type: 'warningBox',
        content: {
            title: 'Mini quiz đọc nhanh',
            content: 'Khí nhà kính chính phát ra khi đốt than đá là gì?\nCO₂ được hấp thụ vào sinh khối qua quá trình nào?\nNêu một biện pháp giảm phát thải trong giao thông.\nTrả lời nhanh rồi làm bộ trắc nghiệm.',
            color: 'orange',
            listType: 'bullet'
        }
    }
  ],
  game: [
    {
      type: 'multiple-choice',
      question: 'Khí nhà kính chính gây ấm lên toàn cầu là:',
      options: ['O2', 'CO2 và CH4', 'N2', 'He'],
      correctAnswer: 1,
      explanation: 'CO2, CH4, N2O là khí nhà kính quan trọng.'
    },
    {
      type: 'true-false',
      question: 'Chu trình carbon bị ảnh hưởng khi phát thải CO2 tăng.',
      correctAnswer: true,
      explanation: 'Phát thải tăng phá vỡ cân bằng hấp thu - phát thải carbon.'
    },
    {
      type: 'multiple-choice',
      question: 'Biện pháp nào giảm phát thải CO2 từ điện than?',
      options: ['Tăng đốt than', 'CCS (thu giữ CO2)', 'Đốt mỏ dầu', 'Không lọc bụi'],
      correctAnswer: 1,
      explanation: 'CCS thu giữ CO2 và lưu trữ/xử lí lại.'
    },
    {
      type: 'fill-in-blank',
      question: 'Cây xanh hấp thụ CO2 thông qua quá trình ___',
      correctAnswer: 'quang hop',
      explanation: 'Quang hợp dùng CO2 để tạo chất hữu cơ.'
    },
    {
      type: 'multiple-choice',
      question: 'Hậu quả của ấm lên toàn cầu không phải là:',
      options: ['Nước biển dâng', 'Băng tan', 'Tăng tần suất thiên tai cực đoan', 'Làm tăng pH đá vôi'],
      correctAnswer: 3,
      explanation: 'Ấm lên không làm tăng pH đá vôi; có thể làm axit hoá đại dương (giảm pH).' 
    },
    {
      type: 'multiple-choice',
      question: 'Nguồn phát thải CH4 lớn tự nhiên nhất trong lựa chọn sau:',
      options: ['Lúa nước', 'Trồng rừng', 'Gió', 'Năng lượng mặt trời'],
      correctAnswer: 0,
      explanation: 'Lúa nước, bãi rác, chăn nuôi phát thải methane đáng kể.'
    },
    {
      type: 'true-false',
      question: 'Đốt nhiên liệu hoá thạch là nguồn chính tăng CO2 khí hậu.',
      correctAnswer: true,
      explanation: 'Phát điện, giao thông, công nghiệp đốt than/dầu/khí tạo CO2 lớn.'
    },
    {
      type: 'fill-in-blank',
      question: 'Công nghệ ___ giúp bắt, nén và lưu trữ CO2 từ nguồn phát thải lớn.',
      correctAnswer: 'CCS',
      explanation: 'CCS (Carbon Capture and Storage) giảm phát thải CO2.'
    },
    {
      type: 'multiple-choice',
      question: 'Biện pháp nào góp phần giảm khí nhà kính từ giao thông?',
      options: ['Tăng sử dụng xe điện', 'Tăng tốc độ xe', 'Sử dụng xe máy cũ', 'Bớt sử dụng giao thông công cộng'],
      correctAnswer: 0,
      explanation: 'Xe điện và giao thông công cộng giảm đốt xăng dầu.'
    },
    {
      type: 'multiple-choice',
      question: 'Chu trình carbon bao gồm các kho dự trữ chính:',
      options: ['Khí quyển, sinh khối, đại dương, đất', 'Chỉ khí quyển', 'Chỉ dung nham', 'Chỉ ranh giới mảng trượt'],
      correctAnswer: 0,
      explanation: 'Carbon phân bố giữa khí quyển, sinh khối, đại dương, đất, đá.'
    }
  ]
};
