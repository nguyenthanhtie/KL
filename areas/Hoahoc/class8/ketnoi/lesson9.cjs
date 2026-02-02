module.exports = {
  classId: 8,
  curriculumType: 'ketnoi',
  chapterId: 3,
  chapterName: "Chương 3: Một số hợp chất thông dụng",
  lessonId: 9,
  order: 9,
  title: 'Bài 9: Base. Thang pH',
  theoryModules: [
    {
        id: 'mod-1',
        type: 'heading',
        content: {
            text: '🧪 Bài 9: Base và thang pH',
            level: 'h2'
        }
    },
    {
        id: 'mod-2',
        type: 'paragraph',
        content: {
            text: 'Mục tiêu: hiểu bazơ, phản ứng đặc trưng và đọc thang pH.'
        }
    },
    {
        id: 'mod-3',
        type: 'infoBox',
        content: {
            title: 'Khái niệm',
            content: 'Bazơ phân li ra OH⁻ trong nước (NaOH, KOH, Ca(OH)₂).\nThường nhờn tay, vị đắng (không thử!).',
            color: 'gray',
            listType: 'bullet'
        }
    },
    {
        id: 'mod-4',
        type: 'warningBox',
        content: {
            title: 'Tính chất',
            content: 'Quỳ tím → xanh.\nPhản ứng với acid → muối + nước (trung hòa).\nPhản ứng với oxide acid → muối + nước (vd: Ca(OH)₂ + CO₂).',
            color: 'orange',
            listType: 'bullet'
        }
    },
    {
        id: 'mod-5',
        type: 'infoBox',
        content: {
            title: 'Thang pH',
            content: 'pH 7: bazơ.\nDùng giấy quỳ, chỉ thị universal, pH-mét.\nBazơ mạnh thường có pH 12-14; nước tinh khiết pH ≈ 7.',
            color: 'purple',
            listType: 'bullet'
        }
    },
    {
        id: 'mod-6',
        type: 'infoBox',
        content: {
            title: 'Phản ứng tiêu biểu',
            content: 'NaOH + HCl → NaCl + H₂O.\nCa(OH)₂ + CO₂ → CaCO₃↓ + H₂O (ứng dụng nước vôi trong).',
            color: 'blue',
            listType: 'bullet'
        }
    },
    {
        id: 'mod-7',
        type: 'infoBox',
        content: {
            title: 'Ứng dụng nhanh',
            content: 'NaOH: xà phòng, giấy.\nCa(OH)₂: xử lý nước, vữa xây.\nĐiều chỉnh pH trong nuôi trồng, nông nghiệp.',
            color: 'blue',
            listType: 'bullet'
        }
    },
    {
        id: 'mod-8',
        type: 'infoBox',
        content: {
            title: 'Mini quiz đọc nhanh',
            content: 'pH = 9 biểu thị môi trường gì?\nIon đặc trưng của bazơ?\nHiện tượng Ca(OH)₂ gặp CO₂?\nTự trả lời trước khi làm test 10 câu.',
            color: 'blue',
            listType: 'number'
        }
    }
  ],
  game: [
    {
      question: 'Bazơ làm quỳ tím đổi thành màu:',
      options: ['Đỏ', 'Xanh', 'Vàng', 'Không đổi'],
      correctAnswer: 1
    },
    {
      question: 'Dung dịch có pH &gt; 7 là:',
      options: ['Acid', 'Trung tính', 'Bazơ', 'Không xác định'],
      correctAnswer: 2
    },
    {
      question: 'Ion đặc trưng của bazơ là:',
      options: ['H⁺', 'OH⁻', 'Na⁺', 'Cl⁻'],
      correctAnswer: 1
    },
    {
      question: 'Phản ứng trung hòa là phản ứng giữa:',
      options: ['Acid và kim loại', 'Bazơ và muối', 'Acid và bazơ', 'Hai bazơ'],
      correctAnswer: 2
    },
    {
      question: 'pH = 7 biểu thị:',
      options: ['Acid mạnh', 'Trung tính', 'Bazơ mạnh', 'Rất bazơ'],
      correctAnswer: 1
    },
    {
      question: 'Dung dịch nào có thể làm quỳ tím hóa xanh?',
      options: ['NaOH', 'HCl', 'NaCl', 'CO₂ hòa tan'],
      correctAnswer: 0
    },
    {
      question: 'Phản ứng Ca(OH)₂ + CO₂ → CaCO₃ + H₂O minh họa tính chất nào?',
      options: ['Bazơ + oxide bazơ', 'Bazơ + oxide acid', 'Bazơ + muối', 'Bazơ + kim loại'],
      correctAnswer: 1
    },
    {
      question: 'pH giấy quỳ đo được 9. Điều đó nghĩa là:',
      options: ['Môi trường acid', 'Trung tính', 'Môi trường bazơ', 'Không xác định'],
      correctAnswer: 2
    },
    {
      question: 'Khi pha loãng dung dịch NaOH, cần lưu ý:',
      options: ['Đổ nước vào NaOH rắn từ từ, khuấy nhẹ', 'Đổ nước vào axit', 'Không cần khuấy', 'Đun sôi nước trước'],
      correctAnswer: 0
    },
    {
      question: 'Ứng dụng đúng của Ca(OH)₂ là:',
      options: ['Ắc quy', 'Xử lý nước, vữa xây', 'Làm lạnh', 'Thêm vào xăng'],
      correctAnswer: 1
    }
  ]
};
