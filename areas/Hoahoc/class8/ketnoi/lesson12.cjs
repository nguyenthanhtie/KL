module.exports = {
  classId: 8,
  curriculumType: 'ketnoi',
  chapterId: 3,
  chapterName: "Chương 3: Một số hợp chất thông dụng",
  lessonId: 12,
  order: 12,
  title: 'Bài 12: Phân bón hóa học',
  theoryModules: [
    {
        id: 'mod-1',
        type: 'heading',
        content: {
            text: '🌾 Bài 12: Phân bón hóa học',
            level: 'h2'
        }
    },
    {
        id: 'mod-2',
        type: 'paragraph',
        content: {
            text: 'Mục tiêu: nhận biết nhóm phân đạm, lân, kali, NPK; hiểu vai trò và lưu ý an toàn/môi trường.'
        }
    },
    {
        id: 'mod-3',
        type: 'infoBox',
        content: {
            title: 'Phân đơn',
            content: 'Phân đạm (N): Ure (NH₂)₂CO, NH₄NO₃, (NH₄)₂SO₄ → thúc lá, xanh cây.\nPhân lân (P): Supe lân Ca(H₂PO₄)₂, lân nung chảy → phát triển rễ, ra hoa.\nPhân kali (K): KCl, K₂SO₄ → chắc hạt, tăng chống chịu.',
            color: 'blue',
            listType: 'bullet'
        }
    },
    {
        id: 'mod-4',
        type: 'infoBox',
        content: {
            title: 'Phân đa nguyên tố',
            content: 'NPK: phối trộn N, P, K với tỉ lệ khác nhau.\nTrung vi lượng: bổ sung Ca, Mg, S, Fe, Zn,... theo nhu cầu.\nDạng bón: rải gốc, hòa nước tưới, viên nén chậm tan.',
            color: 'gray',
            listType: 'bullet'
        }
    },
    {
        id: 'mod-5',
        type: 'infoBox',
        content: {
            title: 'Lưu ý sử dụng & an toàn',
            content: 'Bón đúng loại/đúng giai đoạn; tránh bón đạm sát ngày thu hoạch.\nKhông lạm dụng → chua đất, ô nhiễm nước (phú dưỡng hóa).\nBảo hộ khi tiếp xúc phân đạm, kali; tránh hít bụi, tránh dính mắt.\nBảo quản khô ráo; NPK/urea hút ẩm dễ vón.',
            color: 'purple',
            listType: 'bullet'
        }
    },
    {
        id: 'mod-6',
        type: 'warningBox',
        content: {
            title: 'Hiệu quả & nhận biết',
            content: 'Thiếu N: lá vàng nhạt; thừa N: lá rậm, dễ đổ.\nThiếu P: lá tím, rễ kém; thừa P: cản hấp thu vi lượng.\nThiếu K: mép lá cháy; đủ K: quả chắc, ngọt.',
            color: 'red',
            listType: 'bullet'
        }
    },
    {
        id: 'mod-7',
        type: 'infoBox',
        content: {
            title: 'Mini quiz đọc nhanh',
            content: 'Vai trò chính của đạm? của kali?\nVì sao không bón nhiều phân đạm sát thu hoạch?\nHiện tượng phú dưỡng hóa đến từ đâu?\nTrả lời nhanh trước khi làm bài.',
            color: 'blue',
            listType: 'number'
        }
    }
  ],
  game: [
    {
      type: 'multiple-choice',
      question: 'Phân đạm cung cấp nguyên tố:',
      options: ['P', 'K', 'N', 'Ca'],
      correctAnswer: 2
    },
    {
      type: 'multiple-choice',
      question: 'Hàm lượng N trong ure khoảng:',
      options: ['16%', '30%', '46%', '60%'],
      correctAnswer: 2
    },
    {
      type: 'multiple-choice',
      question: 'Phân kali điển hình là:',
      options: ['KCl, K₂SO₄', 'NH₄NO₃', 'Ca(H₂PO₄)₂', 'NaCl'],
      correctAnswer: 0
    },
    {
      type: 'multiple-choice',
      question: 'Supe lân thuộc nhóm:',
      options: ['Phân đạm', 'Phân lân', 'Phân kali', 'Vi lượng'],
      correctAnswer: 1
    },
    {
      type: 'multiple-choice',
      question: 'Nguyên tắc “4 đúng” khi bón phân gồm:',
      options: ['Đúng loại, liều, lúc, cách', 'Đúng giá, chỗ, người, mùa', 'Đúng màu, mùi, vị, pH', 'Đúng đất, nước, khí, nhiệt'],
      correctAnswer: 0
    },
    {
      type: 'multiple-choice',
      question: 'Công thức NPK 16-16-8 có ý nghĩa:',
      options: ['16% N, 16% P₂O₅, 8% K₂O', '16% N, 8% P₂O₅, 16% K₂O', '8% N, 16% P₂O₅, 16% K₂O', 'Tổng 40% chất trơ'],
      correctAnswer: 0
    },
    {
      type: 'multiple-choice',
      question: 'Phân lân nung chảy tan tốt trong:',
      options: ['Nước lạnh', 'Dung dịch kiềm', 'Axit yếu trong đất chua', 'Rượu etylic'],
      correctAnswer: 2
    },
    {
      type: 'multiple-choice',
      question: 'Lạm dụng phân đạm dễ gây hậu quả:',
      options: ['Đất kiềm hóa mạnh', 'Tích lũy nitrat, ô nhiễm nước', 'Thiếu vi lượng Fe', 'Giảm năng suất lá'],
      correctAnswer: 1
    },
    {
      type: 'multiple-choice',
      question: 'Khi bón phân kali cho cây củ (khoai, sắn) thường giúp:',
      options: ['Tăng protein hạt', 'Cứng cây, tăng chất lượng củ', 'Tăng màu xanh lá', 'Giảm đường trong củ'],
      correctAnswer: 1
    },
    {
      type: 'multiple-choice',
      question: 'Bón lót thường áp dụng cho:',
      options: ['Phân lân và một phần đạm', 'Chỉ phân đạm', 'Chỉ phân kali', 'Tất cả đều bón thúc'],
      correctAnswer: 0
    }
  ]
};
