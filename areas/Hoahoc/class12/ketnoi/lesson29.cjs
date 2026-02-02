module.exports = {
  classId: 12,
  curriculumType: 'ketnoi',
  chapterId: 8,
  chapterName: 'Chương 8: Kim loại chuyển tiếp và phức chất',
  lessonId: 29,
  title: 'Bài 29: Tính chất và ứng dụng của kim loại chuyển tiếp và phức chất',
  description: 'Màu sắc, từ tính, xúc tác của kim loại chuyển tiếp và vai trò của phức chất.',
  level: 'Intermediate',
  order: 29,
  theoryModules: [
    {
        id: 'mod-1',
        type: 'heading',
        content: {
            text: 'Tính chất và ứng dụng của kim loại chuyển tiếp & phức chất',
            level: 'h2'
        }
    },
    {
        id: 'mod-2',
        type: 'paragraph',
        content: {
            text: 'Liên hệ màu sắc, từ tính, xúc tác với ứng dụng công nghiệp và y sinh của kim loại chuyển tiếp/phức chất.'
        }
    },
    {
        id: 'mod-3',
        type: 'infoBox',
        content: {
            title: 'Màu sắc & từ tính',
            content: 'Màu do hấp thụ ánh sáng khi e chuyển mức d-d; phụ thuộc phối tử.\nThuận từ: e độc thân (Fe3+, Mn2+); nghịch từ: e ghép đôi (Zn2+, Cu+).\nDải màu: Cu2+ xanh, Ni2+ lục, Cr3+ lục tím, MnO4- tím.',
            color: 'gray',
            listType: 'bullet'
        }
    },
    {
        id: 'mod-4',
        type: 'warningBox',
        content: {
            title: 'Phức chất & ổn định',
            content: 'Phức làm ổn định trạng thái oxi hoá (Fe2+/Fe3+ trong cyanoferrat).\nTăng độ tan: [Ag(NH3)2]+ hoà tan AgCl; [CuCl4]2- tan trong HCl.\nThuốc: cis-platin (điều trị ung thư), EDTA tạo phức làm mềm nước.',
            color: 'orange',
            listType: 'bullet'
        }
    },
    {
        id: 'mod-5',
        type: 'infoBox',
        content: {
            title: 'Xúc tác & công nghệ',
            content: 'V2O5 (quá trình tiếp xúc SO2 → SO3), Fe (Haber), Ni/Pt (hydro hoá).\nCu/ZnO/Al2O3 (Metan hóa, methanol), Cr2O3 (oxi hoá amoniac).\nMạ điện: phức Ni, Cr dùng để mạ trang trí/chống gỉ.',
            color: 'gray',
            listType: 'bullet'
        }
    },
    {
        id: 'mod-6',
        type: 'infoBox',
        content: {
            title: 'So sánh nhanh',
            content: 'Màu: phụ thuộc phối tử; d10 (Zn2+, Cu+) thường không màu, d5 cao spin (Mn2+) nhạt.\nTừ tính: e độc thân → thuận từ (Fe3+, Mn2+); ghép đôi → nghịch từ (Zn2+, [Fe(CN)6]4- thấp spin).\nỔn định phức: phối tử càng mạnh (CN-, CO, en) → Δo lớn, màu thay đổi.',
            color: 'blue',
            listType: 'bullet'
        }
    },
    {
        id: 'mod-7',
        type: 'infoBox',
        content: {
            title: 'Case & ứng dụng',
            content: 'Điều trị: cis-platin phá DNA; ferrocene bền nhờ liên kết sandwich; EDTA chống cứng nước.\nPhân tích: chuẩn độ complexon với EDTA xác định Ca2+, Mg2+; thuốc thử SCN- cho màu đỏ máu với Fe3+.\nCông nghệ: xúc tác ba chức năng ô tô (Pt/Rh) khử NOx, oxi hoá CO/HC.',
            color: 'blue',
            listType: 'bullet'
        }
    },
    {
        id: 'mod-8',
        type: 'infoBox',
        content: {
            title: 'Ôn bài tập',
            content: 'Giải thích màu/từ tính của phức dựa trên cấu hình e và phối tử mạnh/yếu (thuyết trường tinh thể).\nTính nồng độ ion Ca2+ còn lại sau khi thêm lượng EDTA, áp dụng bảo toàn mol phức.\nLập sơ đồ xúc tác: viết bậc oxi hoá và phản ứng đi kèm cho Haber, tiếp xúc, hydro hoá.',
            color: 'gray',
            listType: 'bullet'
        }
    }
  ],
  game: [
    {
      type: 'multiple-choice',
      question: 'Ion nào nghịch từ?',
      options: ['Fe3+', 'Mn2+', 'Zn2+', 'Ni2+'],
      correctAnswer: 2,
      explanation: 'Zn2+ có d10 ghép đôi hoàn toàn → nghịch từ.',
      points: 10
    },
    {
      type: 'true-false',
      question: 'Màu phức phụ thuộc phối tử bao quanh kim loại.',
      correctAnswer: true,
      explanation: 'Trường phối tử làm tách mức d khác nhau → màu thay đổi.',
      points: 10
    },
    {
      type: 'multiple-choice',
      question: 'Xúc tác sản xuất H2SO4 tiếp xúc là:',
      options: ['Fe', 'V2O5', 'Ni', 'Cu'],
      correctAnswer: 1,
      explanation: 'V2O5 xúc tác SO2 oxi hoá thành SO3.',
      points: 10
    },
    {
      type: 'multiple-choice',
      question: 'Cis-platin thuộc loại:',
      options: ['Phức chất Pt(II) chữa ung thư', 'Muối Pt(IV) oxi hoá', 'Hợp kim Pt-Pd', 'Ion PtCl6 2-'],
      correctAnswer: 0,
      explanation: 'Cis-[PtCl2(NH3)2] là thuốc hoá trị.',
      points: 10
    },
    {
      type: 'true-false',
      question: 'EDTA làm mềm nước do tạo phức với Ca2+, Mg2+. ',
      correctAnswer: true,
      explanation: 'EDTA4- kẹp ion kim loại, giảm độ cứng.',
      points: 10
    },
    {
      type: 'multiple-choice',
      question: 'Ion mang màu tím mạnh là:',
      options: ['MnO4-', 'Cu2+', 'Ni2+', 'Fe2+'],
      correctAnswer: 0,
      explanation: 'Permanganat tím đậm do chuyển e Mn(VII).',
      points: 10
    },
    {
      type: 'fill-in-blank',
      question: 'Phức hòa tan AgCl: [Ag(NH3)2]____.',
      correctAnswer: '+',
      explanation: 'Phức cation giúp AgCl tan.',
      points: 10
    },
    {
      type: 'multiple-choice',
      question: 'Hệ xúc tác Cu/ZnO/Al2O3 dùng để:',
      options: ['Tổng hợp NH3', 'Oxi hoá SO2', 'Sản xuất methanol', 'Thủy luyện Al'],
      correctAnswer: 2,
      explanation: 'Bộ xúc tác phổ biến cho CO + H2 → CH3OH.',
      points: 10
    },
    {
      type: 'multiple-choice',
      question: 'Nguyên nhân kim loại chuyển tiếp làm xúc tác tốt:',
      options: ['Có điện tích cao', 'Có obitan d trống/bán đầy hấp phụ chất phản ứng', 'Khối lượng lớn', 'Tan tốt trong nước'],
      correctAnswer: 1,
      explanation: 'Obitan d cho phép hấp phụ/hoạt hoá phân tử.',
      points: 10
    },
    {
      type: 'true-false',
      question: 'Fe2+ luôn màu xanh nhạt trong dung dịch.',
      correctAnswer: false,
      explanation: 'Màu phụ thuộc phối tử, pH; có thể xanh lục hoặc không màu nhạt.',
      points: 10
    }
  ]
};
