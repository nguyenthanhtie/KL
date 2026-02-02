module.exports = {
  classId: 8,
  curriculumType: 'ketnoi',
  chapterId: 2,
  chapterName: "Chương 2: Phản ứng hóa học",
  lessonId: 5,
  title: 'Bài 5: Định luật bảo toàn khối lượng và phương trình hóa học',
  theoryModules: [
    {
        id: 'mod-1',
        type: 'heading',
        content: {
            text: '⚖️ Bài 5: Định luật bảo toàn khối lượng & phương trình hóa học',
            level: 'h2'
        }
    },
    {
        id: 'mod-2',
        type: 'paragraph',
        content: {
            text: 'Mục tiêu: nắm phát biểu định luật, cách viết/cân bằng PTHH và ứng dụng tính khối lượng.'
        }
    },
    {
        id: 'mod-3',
        type: 'infoBox',
        content: {
            title: 'Định luật bảo toàn khối lượng',
            content: 'Dựa trên bảo toàn số nguyên tử mỗi nguyên tố.\nÁp dụng cho mọi phản ứng trong hệ kín.\n**Tổng khối lượng chất tham gia = tổng khối lượng sản phẩm** (trong hệ kín).',
            color: 'gray',
            listType: 'bullet'
        }
    },
    {
        id: 'mod-4',
        type: 'infoBox',
        content: {
            title: 'Phương trình hóa học (PTHH)',
            content: 'Biểu diễn phản ứng bằng công thức hóa học.\nCần **cân bằng** để bảo toàn nguyên tử.\nVí dụ: 2H₂ + O₂ → 2H₂O.',
            color: 'blue',
            listType: 'bullet'
        }
    },
    {
        id: 'mod-5',
        type: 'infoBox',
        content: {
            title: 'Quy trình cân bằng PTHH',
            content: 'Viết sơ đồ phản ứng, xác định chất tham gia/sản phẩm.\nChọn hệ số sao cho số nguyên tử từng nguyên tố hai vế bằng nhau.\nKiểm tra lại tổng khối lượng theo hệ số mol.\nVí dụ: Đốt 12 g C thu 44 g CO₂ ⇒ m(O₂) = 44 − 12 = 32 g.',
            color: 'purple',
            listType: 'number'
        }
    },
    {
        id: 'mod-6',
        type: 'warningBox',
        content: {
            title: 'Ghi nhớ nhanh',
            content: 'Cân bằng trước, tính toán sau.\nHệ số PTHH thể hiện tỉ lệ mol.\nKiểm tra nguyên tử và khối lượng để tránh sai sót.',
            color: 'orange',
            listType: 'bullet'
        }
    },
    {
        id: 'mod-7',
        type: 'infoBox',
        content: {
            title: 'Mini quiz đọc nhanh',
            content: 'Tổng khối lượng hai vế có thể khác nhau không?\nHệ số 2 trong 2H₂O biểu diễn điều gì?\nĐốt 5,6 g Fe (M=56) cần bao nhiêu g O₂ nếu thu Fe₂O₃?\nTự kiểm tra rồi làm 10 câu test.',
            color: 'blue',
            listType: 'number'
        }
    }
  ],
  game: [
    {
      question: 'Định luật bảo toàn khối lượng phát biểu:',
      options: ['m tham gia = 0', 'm tham gia = m sản phẩm', 'm sản phẩm gấp đôi', 'm giảm dần'],
      correctAnswer: 1
    },
    {
      question: 'Phương trình 2H₂ + O₂ → 2H₂O đã cân bằng vì:',
      options: ['H không bằng', 'O không bằng', 'Số nguyên tử H, O hai vế bằng nhau', 'Không có hệ số'],
      correctAnswer: 2
    },
    {
      question: 'Đốt 12 g C thu 44 g CO₂. Khối lượng O₂ phản ứng là:',
      options: ['12 g', '32 g', '44 g', '56 g'],
      correctAnswer: 1
    },
    {
      question: 'Bước quan trọng khi viết PTHH là:',
      options: ['Ghi tên phản ứng', 'Cân bằng số nguyên tử', 'Bỏ hệ số', 'Chỉ cần sản phẩm'],
      correctAnswer: 1
    },
    {
      question: 'Định luật bảo toàn khối lượng áp dụng cho:',
      options: ['Mọi biến đổi', 'Phản ứng hóa học trong hệ kín', 'Chỉ phản ứng tỏa nhiệt', 'Chỉ chất rắn'],
      correctAnswer: 1
    },
    {
      question: 'Khi cân bằng phương trình, mục tiêu là:',
      options: ['Số nguyên tử mỗi nguyên tố hai vế bằng nhau', 'Tăng hệ số lớn nhất', 'Đổi tên chất', 'Thêm sản phẩm mới'],
      correctAnswer: 0
    },
    {
      question: 'Hệ số trong PTHH biểu thị:',
      options: ['Số hạt', 'Số mol tỉ lệ các chất', 'Khối lượng tuyệt đối', 'Thể tích cố định'],
      correctAnswer: 1
    },
    {
      question: 'Đốt 5,6 g Fe (M=56) hoàn toàn thành Fe₂O₃. Khối lượng O tham gia là gần nhất:',
      options: ['1,6 g', '2,4 g', '4,8 g', '8,0 g'],
      correctAnswer: 1
    },
    {
      question: 'Trong phản ứng Zn + 2HCl → ZnCl₂ + H₂, tổng khối lượng hai vế:',
      options: ['Vế trái lớn hơn', 'Vế phải lớn hơn', 'Bằng nhau', 'Không xác định'],
      correctAnswer: 2
    },
    {
      question: 'Bước kiểm tra sau khi cân bằng PTHH là:',
      options: ['Đổi tên chất', 'So sánh tổng nguyên tử từng nguyên tố và khối lượng tương đối hai vế', 'Xóa hệ số', 'Thêm chất xúc tác'],
      correctAnswer: 1
    }
  ]
};
