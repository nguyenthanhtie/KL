module.exports = {
  classId: 8,
  curriculumType: 'ketnoi',
  chapterId: 2,
  chapterName: "Chương 2: Phản ứng hóa học",
  lessonId: 7,
  title: 'Bài 7: Tốc độ phản ứng và chất xúc tác',
  theoryModules: [
    {
        id: 'mod-1',
        type: 'heading',
        content: {
            text: '🚀 Bài 7: Tốc độ phản ứng và chất xúc tác',
            level: 'h2'
        }
    },
    {
        id: 'mod-2',
        type: 'paragraph',
        content: {
            text: 'Mục tiêu: hiểu tốc độ phản ứng, yếu tố ảnh hưởng và vai trò của xúc tác.'
        }
    },
    {
        id: 'mod-3',
        type: 'infoBox',
        content: {
            title: 'Tốc độ phản ứng',
            content: 'Nồng độ ↑ ⇒ tốc độ ↑.\nNhiệt độ ↑ ⇒ tốc độ ↑ (hạt va chạm mạnh hơn).\nDiện tích tiếp xúc ↑ (nghiền mịn) ⇒ tốc độ ↑.\nMức độ biến đổi nồng độ chất theo thời gian.',
            color: 'gray',
            listType: 'bullet'
        }
    },
    {
        id: 'mod-4',
        type: 'infoBox',
        content: {
            title: 'Chất xúc tác',
            content: 'Thay đổi tốc độ (thường làm tăng), **không bị tiêu hao**.\nGiảm năng lượng hoạt hóa, thay đổi cơ chế.\nVí dụ: MnO₂ (phân hủy KClO₃), V₂O₅ (H₂SO₄), enzym trong cơ thể.',
            color: 'blue',
            listType: 'bullet'
        }
    },
    {
        id: 'mod-5',
        type: 'infoBox',
        content: {
            title: 'Ứng dụng',
            content: 'Công nghiệp: V₂O₅ (tiếp xúc H₂SO₄), Ni (hidro hóa dầu).\nĐời sống: men tiêu hóa; làm lạnh thực phẩm để giảm tốc độ phân hủy.',
            color: 'purple',
            listType: 'bullet'
        }
    },
    {
        id: 'mod-6',
        type: 'warningBox',
        content: {
            title: 'Ghi nhớ nhanh',
            content: 'Nhiệt độ, nồng độ, diện tích tiếp xúc, xúc tác là 4 đòn bẩy.\nXúc tác không làm đổi cân bằng khối lượng sản phẩm.\nGiảm nhiệt độ để làm chậm hư hỏng thực phẩm.',
            color: 'orange',
            listType: 'bullet'
        }
    },
    {
        id: 'mod-7',
        type: 'infoBox',
        content: {
            title: 'Mini quiz đọc nhanh',
            content: 'Vì sao nghiền bột giúp phản ứng nhanh?\nXúc tác có bị tiêu hao không?\nBiện pháp đơn giản để làm chậm phản ứng phân hủy thực phẩm?\nTự trả lời trước khi làm test 10 câu.',
            color: 'blue',
            listType: 'number'
        }
    }
  ],
  game: [
    {
      question: 'Yếu tố nào không làm tăng tốc độ phản ứng?',
      options: ['Tăng nhiệt độ', 'Tăng nồng độ', 'Giảm diện tích tiếp xúc', 'Dùng xúc tác'],
      correctAnswer: 2
    },
    {
      question: 'Chất xúc tác là:',
      options: ['Chất bị tiêu hao', 'Chất làm tăng tốc độ và không bị tiêu hao sau phản ứng', 'Chất làm giảm khối lượng', 'Chất sản phẩm'],
      correctAnswer: 1
    },
    {
      question: 'Tăng diện tích tiếp xúc nghĩa là:',
      options: ['Dùng khối rắn lớn', 'Nghiền nhỏ chất rắn', 'Giảm nồng độ', 'Hạ nhiệt độ'],
      correctAnswer: 1
    },
    {
      question: 'Ví dụ về xúc tác vô cơ:',
      options: ['Men amylase', 'MnO₂ trong phân hủy KClO₃', 'Ánh sáng Mặt Trời', 'Nước'],
      correctAnswer: 1
    },
    {
      question: 'Để giảm tốc độ hư hỏng thực phẩm, biện pháp hiệu quả là:',
      options: ['Tăng nhiệt', 'Giảm nhiệt (bảo quản lạnh)', 'Tăng pH', 'Thêm kim loại'],
      correctAnswer: 1
    },
    {
      question: 'Tăng nhiệt độ thường làm phản ứng:',
      options: ['Chậm hơn', 'Nhanh hơn', 'Không đổi', 'Dừng lại'],
      correctAnswer: 1
    },
    {
      question: 'Ví dụ xúc tác sinh học là:',
      options: ['MnO₂', 'Enzym/men tiêu hóa', 'V₂O₅', 'Fe₂O₃'],
      correctAnswer: 1
    },
    {
      question: 'Để tăng tốc độ phản ứng rắn - dung dịch, nên:',
      options: ['Dùng khối rắn lớn', 'Nghiền mịn rắn để tăng diện tích tiếp xúc', 'Giảm nhiệt độ', 'Pha loãng tối đa'],
      correctAnswer: 1
    },
    {
      question: 'Phát biểu đúng về xúc tác:',
      options: ['Thay đổi cơ chế, giảm năng lượng hoạt hóa', 'Tạo sản phẩm khác', 'Luôn là kim loại', 'Chỉ dùng cho phản ứng phân hủy'],
      correctAnswer: 0
    },
    {
      question: 'Trong công nghiệp H₂SO₄ tiếp xúc, xúc tác dùng là:',
      options: ['V₂O₅', 'MnO₂', 'Ni', 'Ag'],
      correctAnswer: 0
    }
  ]
};
