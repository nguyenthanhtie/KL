module.exports = {
  classId: 8,
  curriculumType: 'ketnoi',
  chapterId: 2,
  chapterName: "Chương 2: Phản ứng hóa học",
  lessonId: 6,
  title: 'Bài 6: Tính theo phương trình hóa học',
  theoryModules: [
    {
        id: 'mod-1',
        type: 'heading',
        content: {
            text: '📐 Bài 6: Tính theo phương trình hóa học',
            level: 'h2'
        }
    },
    {
        id: 'mod-2',
        type: 'paragraph',
        content: {
            text: 'Mục tiêu: dùng PTHH cân bằng để tính số mol/khối lượng/thể tích, nhận diện chất dư - chất hết.'
        }
    },
    {
        id: 'mod-3',
        type: 'infoBox',
        content: {
            title: 'Cơ sở tính toán',
            content: 'PTHH đã cân bằng cho tỉ lệ mol giữa các chất.\nDùng quan hệ **n = m/M**, **V = 22,4n** (khí đktc).\nTừ tỉ lệ mol ⇒ suy ra khối lượng/thể tích.',
            color: 'gray',
            listType: 'bullet'
        }
    },
    {
        id: 'mod-4',
        type: 'infoBox',
        content: {
            title: 'Quy trình 4 bước',
            content: 'Viết và cân bằng PTHH.\nĐổi dữ liệu về mol (n = m/M).\nLập tỉ lệ mol theo hệ số PTHH.\nQuy đổi về khối lượng/thể tích cần tìm.',
            color: 'blue',
            listType: 'number'
        }
    },
    {
        id: 'mod-5',
        type: 'infoBox',
        content: {
            title: 'Ví dụ minh họa',
            content: '2H₂ + O₂ → 2H₂O: 2 mol H₂ sinh 2 mol H₂O.\nCaCO₃ → CaO + CO₂: 0,2 mol CaCO₃ ⇒ 0,2 mol CO₂ ⇒ m = 8,8 g.\nZn + 2HCl → ZnCl₂ + H₂: từ n Zn tính n H₂ theo tỉ lệ 1:1.',
            color: 'purple',
            listType: 'bullet'
        }
    },
    {
        id: 'mod-6',
        type: 'warningBox',
        content: {
            title: 'Mẹo & lưu ý',
            content: 'Đổi đơn vị ngay đầu bài.\nKiểm tra chất dư bằng so sánh tỉ lệ mol thực tế / lý thuyết.\nKhí ở đktc dùng 22,4 L/mol.',
            color: 'orange',
            listType: 'bullet'
        }
    },
    {
        id: 'mod-7',
        type: 'infoBox',
        content: {
            title: 'Mini quiz đọc nhanh',
            content: '2 mol H₂ tạo bao nhiêu mol H₂O?\nm 0,2 mol CaCO₃ (M=100) là bao nhiêu?\nKhí thu được 5,6 L ở đktc thì n bằng?\nTự trả lời rồi làm 10 câu test.',
            color: 'blue',
            listType: 'number'
        }
    }
  ],
  game: [
    {
      question: 'Phản ứng hóa học là gì?',
      options: ['Sự tan của chất trong nước', 'Quá trình biến đổi từ chất này sang chất khác', 'Sự thay đổi trạng thái', 'Sự bay hơi của chất lỏng'],
      correctAnswer: 1
    },
    {
      question: 'Dấu hiệu nào KHÔNG phải của phản ứng hóa học?',
      options: ['Có chất mới tạo thành', 'Có khí thoát ra', 'Nước đá tan chảy', 'Có kết tủa xuất hiện'],
      correctAnswer: 2
    },
    {
      question: 'Phản ứng 2H₂ + O₂ → 2H₂O thuộc loại:',
      options: ['Phản ứng phân hủy', 'Phản ứng hóa hợp', 'Phản ứng thế', 'Phản ứng trao đổi'],
      correctAnswer: 1
    },
    {
      question: 'Điều kiện để phản ứng hóa học xảy ra là:',
      options: ['Chỉ cần các chất tiếp xúc', 'Chỉ cần nhiệt độ cao', 'Các chất tiếp xúc và đủ điều kiện', 'Chỉ cần có xúc tác'],
      correctAnswer: 2
    },
    {
      question: 'Trong phản ứng CaCO₃ + 2HCl → CaCl₂ + H₂O + CO₂, hiện tượng quan sát được là:',
      options: ['Có màu xuất hiện', 'Có khí thoát ra', 'Có kết tủa', 'Không có hiện tượng gì'],
      correctAnswer: 1
    },
    {
      question: 'Tính theo phương trình hóa học cần căn cứ vào:',
      options: ['Tên chất', 'Hệ số tỉ lệ mol trong PTHH đã cân bằng', 'Màu sắc dung dịch', 'Trạng thái vật lý'],
      correctAnswer: 1
    },
    {
      question: 'Nếu 2 mol H₂ phản ứng hết với O₂, số mol H₂O thu được (PTHH: 2H₂ + O₂ → 2H₂O) là:',
      options: ['1 mol', '2 mol', '3 mol', '4 mol'],
      correctAnswer: 1
    },
    {
      question: 'Khối lượng CaCO₃ (M=100) cần để tạo 0,2 mol CO₂ theo PTHH CaCO₃ → CaO + CO₂ là:',
      options: ['10 g', '20 g', '40 g', '5 g'],
      correctAnswer: 1
    },
    {
      question: 'Bước đầu khi giải bài tính theo PTHH là:',
      options: ['Đổi đơn vị trước, không cần PTHH', 'Viết và cân bằng phương trình phản ứng', 'Tính khối lượng sản phẩm ngay', 'Bỏ qua chất dư/thừa'],
      correctAnswer: 1
    },
    {
      question: 'Muốn biết chất nào dư thiếu, cần:',
      options: ['Chỉ nhìn khối lượng', 'So sánh tỉ lệ mol thực tế với tỉ lệ mol theo PTHH', 'Chọn ngẫu nhiên', 'Bỏ qua vì không ảnh hưởng'],
      correctAnswer: 1
    }
  ]
};
