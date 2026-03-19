module.exports = {
  classId: 8,
  curriculumType: 'ketnoi',
  chapterId: 2,
  chapterName: "Chương 2: Phản ứng hóa học",
  lessonId: 5,
  title: 'Bài 5: Định luật bảo toàn khối lượng và phương trình hóa học',
  description: 'Tìm hiểu định luật bảo toàn khối lượng và cách cân bằng phương trình hóa học',
  level: 'Beginner',
  order: 4,

  // Cấu trúc module mới
  modules: [
    // ============ MODULE 1: Định luật bảo toàn khối lượng ============
    {
      id: 'module-1',
      title: 'Định luật bảo toàn khối lượng',
      description: 'Nắm vững định luật nền tảng của phản ứng hóa học',
      order: 1,
      items: [
        {
          id: 'item-1-1',
          type: 'theory',
          title: 'Phát biểu định luật',
          duration: '4 min',
          section: 'Định luật',
          theoryModules: [
            {
              id: 'tm-1-1',
              type: 'heading',
              content: {
                text: '⚖️ Định luật bảo toàn khối lượng',
                level: 'h2'
              }
            },
            {
              id: 'tm-1-2',
              type: 'infoBox',
              content: {
                title: 'Phát biểu định luật',
                content: '**"Trong một phản ứng hóa học, tổng khối lượng các chất tham gia bằng tổng khối lượng các sản phẩm."**\n\n📌 Công thức: m(A) + m(B) = m(C) + m(D)\n\n⚠️ Áp dụng cho hệ kín (không có chất thoát ra ngoài)',
                color: 'blue',
                listType: 'bullet'
              }
            },
            {
              id: 'tm-1-3',
              type: 'paragraph',
              content: {
                text: 'Định luật này được phát hiện bởi Lomonosov (1748) và Lavoisier (1774). Nó dựa trên nguyên lý: số nguyên tử của mỗi nguyên tố được bảo toàn trong phản ứng.'
              }
            }
          ]
        },
        {
          id: 'item-1-2',
          type: 'theory',
          title: 'Ứng dụng tính toán',
          duration: '4 min',
          section: 'Áp dụng',
          theoryModules: [
            {
              id: 'tm-1-4',
              type: 'tipBox',
              content: {
                title: 'Ví dụ áp dụng',
                content: '**Bài:** Đốt cháy 12g C thu được 44g CO₂. Tính khối lượng O₂ đã tham gia.\n\n**Giải:** C + O₂ → CO₂\n• m(C) + m(O₂) = m(CO₂)\n• 12 + m(O₂) = 44\n• m(O₂) = 44 - 12 = **32g**',
                color: 'green'
              }
            },
            {
              id: 'tm-1-5',
              type: 'warningBox',
              content: {
                title: 'Lưu ý quan trọng',
                content: '• Nếu có khí thoát ra (hệ hở) → khối lượng giảm\n• Nếu thu khí từ không khí → khối lượng tăng\n• Luôn xác định rõ hệ kín hay hệ hở!',
                color: 'orange'
              }
            }
          ]
        }
      ],
      // Quiz cho Module 1: 4 câu
      quizzes: [
        {
          type: 'multiple-choice',
          question: 'Định luật bảo toàn khối lượng phát biểu:',
          options: [
            'm tham gia = 0',
            'm tham gia = m sản phẩm',
            'm sản phẩm gấp đôi',
            'm giảm dần'
          ],
          correctAnswer: 1,
          explanation: 'Tổng khối lượng chất tham gia = tổng khối lượng sản phẩm (trong hệ kín).',
          points: 10
        },
        {
          type: 'multiple-choice',
          question: 'Đốt 12g C thu 44g CO₂. Khối lượng O₂ phản ứng là:',
          options: ['12 g', '32 g', '44 g', '56 g'],
          correctAnswer: 1,
          explanation: 'm(O₂) = m(CO₂) - m(C) = 44 - 12 = 32g',
          points: 10
        },
        {
          type: 'multiple-choice',
          question: 'Định luật bảo toàn khối lượng áp dụng cho:',
          options: [
            'Mọi biến đổi',
            'Phản ứng hóa học trong hệ kín',
            'Chỉ phản ứng tỏa nhiệt',
            'Chỉ chất rắn'
          ],
          correctAnswer: 1,
          explanation: 'Định luật áp dụng cho phản ứng hóa học trong hệ kín, không có chất thoát ra ngoài.',
          points: 10
        },
        {
          type: 'multiple-choice',
          question: 'Trong phản ứng Zn + 2HCl → ZnCl₂ + H₂, tổng khối lượng hai vế:',
          options: [
            'Vế trái lớn hơn',
            'Vế phải lớn hơn',
            'Bằng nhau',
            'Không xác định'
          ],
          correctAnswer: 2,
          explanation: 'Theo định luật bảo toàn khối lượng, tổng khối lượng hai vế luôn bằng nhau.',
          points: 10
        }
      ]
    },

    // ============ MODULE 2: Phương trình hóa học ============
    {
      id: 'module-2',
      title: 'Phương trình hóa học',
      description: 'Cách viết và ý nghĩa của phương trình hóa học',
      order: 2,
      items: [
        {
          id: 'item-2-1',
          type: 'theory',
          title: 'Khái niệm phương trình hóa học',
          duration: '4 min',
          section: 'PTHH',
          theoryModules: [
            {
              id: 'tm-2-1',
              type: 'heading',
              content: {
                text: '📝 Phương trình hóa học',
                level: 'h2'
              }
            },
            {
              id: 'tm-2-2',
              type: 'infoBox',
              content: {
                title: 'Định nghĩa',
                content: '**Phương trình hóa học (PTHH):** Biểu diễn phản ứng hóa học bằng công thức hóa học của các chất.\n\n**Ví dụ:** 2H₂ + O₂ → 2H₂O\n\n**Ý nghĩa:** Cho biết chất tham gia, sản phẩm và tỉ lệ mol.',
                color: 'blue',
                listType: 'bullet'
              }
            },
            {
              id: 'tm-2-3',
              type: 'tipBox',
              content: {
                title: 'Ý nghĩa hệ số',
                content: '**Hệ số trong PTHH** cho biết tỉ lệ mol các chất.\n\n2H₂ + O₂ → 2H₂O\n→ 2 mol H₂ phản ứng với 1 mol O₂ tạo 2 mol H₂O',
                color: 'purple'
              }
            }
          ]
        }
      ],
      // Quiz cho Module 2: 3 câu
      quizzes: [
        {
          type: 'multiple-choice',
          question: 'Hệ số trong PTHH biểu thị:',
          options: [
            'Số hạt',
            'Số mol tỉ lệ các chất',
            'Khối lượng tuyệt đối',
            'Thể tích cố định'
          ],
          correctAnswer: 1,
          explanation: 'Hệ số trong PTHH cho biết tỉ lệ số mol của các chất tham gia và sản phẩm.',
          points: 10
        },
        {
          type: 'multiple-choice',
          question: 'Phương trình 2H₂ + O₂ → 2H₂O đã cân bằng vì:',
          options: [
            'H không bằng',
            'O không bằng',
            'Số nguyên tử H, O hai vế bằng nhau',
            'Không có hệ số'
          ],
          correctAnswer: 2,
          explanation: 'PTHH cân bằng khi số nguyên tử của mỗi nguyên tố ở hai vế bằng nhau.',
          points: 10
        },
        {
          type: 'true-false',
          question: 'Phương trình hóa học phải tuân theo định luật bảo toàn khối lượng.',
          correctAnswer: true,
          explanation: 'Đúng! PTHH cân bằng đảm bảo số nguyên tử bảo toàn → khối lượng bảo toàn.',
          points: 10
        }
      ]
    },

    // ============ MODULE 3: Cân bằng phương trình ============
    {
      id: 'module-3',
      title: 'Cân bằng phương trình hóa học',
      description: 'Các bước cân bằng PTHH',
      order: 3,
      items: [
        {
          id: 'item-3-1',
          type: 'theory',
          title: 'Quy trình cân bằng',
          duration: '5 min',
          section: 'Cân bằng PTHH',
          theoryModules: [
            {
              id: 'tm-3-1',
              type: 'heading',
              content: {
                text: '🔧 Cân bằng phương trình hóa học',
                level: 'h2'
              }
            },
            {
              id: 'tm-3-2',
              type: 'infoBox',
              content: {
                title: '3 bước cân bằng PTHH',
                content: '**Bước 1:** Viết sơ đồ phản ứng (chất tham gia → sản phẩm)\n**Bước 2:** Đặt hệ số sao cho số nguyên tử mỗi nguyên tố ở hai vế bằng nhau\n**Bước 3:** Kiểm tra lại và viết PTHH hoàn chỉnh',
                color: 'green',
                listType: 'number'
              }
            },
            {
              id: 'tm-3-3',
              type: 'tipBox',
              content: {
                title: 'Ví dụ cân bằng',
                content: '**Bài:** Cân bằng: Fe + O₂ → Fe₂O₃\n\n**Giải:**\n• Đếm: Fe (1 → 2), O (2 → 3)\n• Cân bằng O: cần 3 O₂ để có 6 O\n• Cân bằng Fe: cần 4 Fe\n• **PTHH:** 4Fe + 3O₂ → 2Fe₂O₃',
                color: 'purple'
              }
            }
          ]
        },
        {
          id: 'item-3-2',
          type: 'theory',
          title: 'Mẹo cân bằng nhanh',
          duration: '3 min',
          section: 'Mẹo',
          theoryModules: [
            {
              id: 'tm-3-4',
              type: 'warningBox',
              content: {
                title: 'Mẹo cân bằng nhanh',
                content: '• Cân bằng kim loại trước, sau đó đến phi kim\n• Cân bằng O cuối cùng (thường khó nhất)\n• Nếu hệ số lẻ → nhân đôi toàn bộ\n• Luôn kiểm tra lại bằng cách đếm nguyên tử',
                color: 'orange'
              }
            }
          ]
        }
      ],
      // Quiz cho Module 3: 4 câu
      quizzes: [
        {
          type: 'multiple-choice',
          question: 'Bước quan trọng khi viết PTHH là:',
          options: [
            'Ghi tên phản ứng',
            'Cân bằng số nguyên tử',
            'Bỏ hệ số',
            'Chỉ cần sản phẩm'
          ],
          correctAnswer: 1,
          explanation: 'Phải cân bằng số nguyên tử của mỗi nguyên tố ở hai vế PTHH.',
          points: 10
        },
        {
          type: 'multiple-choice',
          question: 'Khi cân bằng phương trình, mục tiêu là:',
          options: [
            'Số nguyên tử mỗi nguyên tố hai vế bằng nhau',
            'Tăng hệ số lớn nhất',
            'Đổi tên chất',
            'Thêm sản phẩm mới'
          ],
          correctAnswer: 0,
          explanation: 'Cân bằng = đảm bảo số nguyên tử của mỗi nguyên tố bằng nhau ở hai vế.',
          points: 10
        },
        {
          type: 'multiple-choice',
          question: 'Bước kiểm tra sau khi cân bằng PTHH là:',
          options: [
            'Đổi tên chất',
            'So sánh số nguyên tử từng nguyên tố ở hai vế',
            'Xóa hệ số',
            'Thêm chất xúc tác'
          ],
          correctAnswer: 1,
          explanation: 'Sau khi cân bằng, phải kiểm tra lại bằng cách đếm số nguyên tử mỗi nguyên tố.',
          points: 10
        },
        {
          type: 'multiple-choice',
          question: 'Đốt 5,6g Fe (M=56) hoàn toàn thành Fe₂O₃. Khối lượng O tham gia gần nhất:',
          options: ['1,6 g', '2,4 g', '4,8 g', '8,0 g'],
          correctAnswer: 1,
          explanation: 'n(Fe) = 0,1 mol. PTHH: 4Fe + 3O₂ → 2Fe₂O₃. n(O₂) = 0,075 mol → m(O₂) = 2,4g',
          points: 10
        }
      ]
    }
  ],

  // Legacy game array - giữ để tương thích ngược
  game: [
    {
      type: 'multiple-choice',
      question: 'Định luật bảo toàn khối lượng phát biểu:',
      options: ['m tham gia = 0', 'm tham gia = m sản phẩm', 'm sản phẩm gấp đôi', 'm giảm dần'],
      correctAnswer: 1,
      points: 10
    },
    {
      type: 'multiple-choice',
      question: 'Đốt 12g C thu 44g CO₂. Khối lượng O₂ phản ứng là:',
      options: ['12 g', '32 g', '44 g', '56 g'],
      correctAnswer: 1,
      points: 10
    }
  ]
};
