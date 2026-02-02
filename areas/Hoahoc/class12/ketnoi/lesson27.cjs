module.exports = {
  classId: 12,
  curriculumType: 'ketnoi',
  chapterId: 8,
  chapterName: 'Chương 8: Kim loại chuyển tiếp và phức chất',
  lessonId: 27,
  title: 'Bài 27: Kim loại chuyển tiếp',
  description: 'Đặc điểm cấu hình e, tính chất đặc trưng của dãy 3d.',
  level: 'Intermediate',
  order: 27,
  theoryModules: [
    {
        id: 'mod-1',
        type: 'heading',
        content: {
            text: 'Kim loại chuyển tiếp (dãy 3d)',
            level: 'h2'
        }
    },
    {
        id: 'mod-2',
        type: 'paragraph',
        content: {
            text: 'Khám phá cấu hình e đặc trưng, mức oxi hoá đa dạng, ion màu và ứng dụng công nghiệp.'
        }
    },
    {
        id: 'mod-3',
        type: 'infoBox',
        content: {
            title: 'Cấu hình & hoá trị',
            content: 'Obitan d chưa bão hoà → nhiều mức oxi hoá (Fe2+/Fe3+, Cu+/Cu2+).\nIon màu do chuyển d-d; lực trường phối tử quyết định màu.\nTừ tính: electron độc thân → thuận từ (Fe3+, Mn2+); cặp đôi → nghịch từ.',
            color: 'gray',
            listType: 'bullet'
        }
    },
    {
        id: 'mod-4',
        type: 'warningBox',
        content: {
            title: 'Tính chất vật lí & hoá học',
            content: 'Độ cứng cao, điểm nóng chảy/boiling lớn (Fe, Ni, Cr).\nDẫn điện tốt (Cu), dẫn nhiệt, dễ tạo hợp kim (thép, đồng thau).\nXúc tác: Fe (Haber), V2O5 (tiếp xúc), Ni/Pt (hydro hoá).',
            color: 'orange',
            listType: 'bullet'
        }
    },
    {
        id: 'mod-5',
        type: 'infoBox',
        content: {
            title: 'Ứng dụng tiêu biểu',
            content: 'Fe thép xây dựng; Cr/Ni thép không gỉ; Mn thép bền.\nCu dây dẫn, hợp kim đồng thau/bronz, xúc tác CuO/ZnO.\nTi (dãy 3d mở rộng) vật liệu y sinh, bền ăn mòn.',
            color: 'gray',
            listType: 'bullet'
        }
    },
    {
        id: 'mod-6',
        type: 'infoBox',
        content: {
            title: 'So sánh nhanh',
            content: 'Số oxi hoá: Sc(+3) ổn định; Mn đa dạng +2 → +7; Cu ổn định +1/+2; Zn thường +2.\nMàu: phụ thuộc phối tử; d10 (Zn2+, Cu+) thường không màu/nhạt.\nTừ tính: e độc thân → thuận từ (Fe3+, Mn2+); ghép đôi → nghịch từ (Zn2+).',
            color: 'blue',
            listType: 'bullet'
        }
    },
    {
        id: 'mod-7',
        type: 'infoBox',
        content: {
            title: 'Case & ứng dụng',
            content: 'Haber: Fe/K/Al2O3 xúc tác; tiếp xúc: V2O5; hydro hoá: Ni/Pt; cải hóa metan: Cu/ZnO/Al2O3.\nInox: cần ≥10,5% Cr để thụ động hoá; thêm Ni tăng dẻo, Mn có thể thay Ni.\nIon màu trong phân tích: dung dịch Cu2+ xanh, Cr2O7 2- da cam, MnO4- tím.',
            color: 'blue',
            listType: 'bullet'
        }
    },
    {
        id: 'mod-8',
        type: 'infoBox',
        content: {
            title: 'Ôn bài tập',
            content: 'Xác định số oxi hoá trong hỗn hợp muối chuyển tiếp; cân bằng phản ứng oxi hoá khử có nhiều mức.\nPhân biệt ion màu: thử với NH3, NaOH để quan sát kết tủa/phức (Cu(OH)2 xanh, [Cu(NH3)4]2+ xanh đậm).\nTính khối lượng thép không gỉ cần thêm Cr/Ni dựa trên phần trăm khối lượng yêu cầu.',
            color: 'gray',
            listType: 'bullet'
        }
    }
  ],
  game: [
    {
      type: 'multiple-choice',
      question: 'Nguyên nhân ion chuyển tiếp thường có màu là:',
      options: ['Kích thước nhỏ', 'Chuyển d-d trong obitan d', 'Có nhiều proton', 'Lượng điện tích cao'],
      correctAnswer: 1,
      explanation: 'Sự tách mức năng lượng d khi phối trí gây hấp thụ ánh sáng.',
      points: 10
    },
    {
      type: 'true-false',
      question: 'Fe2+ và Fe3+ cùng tồn tại ở nhiều hợp chất.',
      correctAnswer: true,
      explanation: 'Fe có nhiều mức oxi hoá phổ biến 2+ và 3+. ',
      points: 10
    },
    {
      type: 'multiple-choice',
      question: 'Xúc tác trong quá trình Haber là:',
      options: ['Cu', 'Fe', 'Ni', 'Pt'],
      correctAnswer: 1,
      explanation: 'Sắt (thường có K2O, Al2O3) làm xúc tác tổng hợp NH3.',
      points: 10
    },
    {
      type: 'multiple-choice',
      question: 'Ion nào thuận từ mạnh nhất?',
      options: ['Zn2+', 'Cu+', 'Mn2+', 'Ni2+'],
      correctAnswer: 2,
      explanation: 'Mn2+ (d5) có 5 e độc thân, thuận từ mạnh.',
      points: 10
    },
    {
      type: 'true-false',
      question: 'Cu2+ cho màu xanh trong dung dịch.',
      correctAnswer: true,
      explanation: 'Cu2+ hydrat hoá cho màu xanh đặc trưng.',
      points: 10
    },
    {
      type: 'multiple-choice',
      question: 'Fe được làm thép không gỉ khi pha thêm:',
      options: ['C và Mn', 'Cr và Ni', 'Al và Zn', 'Cu và Ag'],
      correctAnswer: 1,
      explanation: 'Cr tạo màng thụ động, Ni tăng dẻo dai → inox.',
      points: 10
    },
    {
      type: 'fill-in-blank',
      question: 'Xúc tác tiếp xúc SO2 → SO3: _____.',
      correctAnswer: 'V2O5',
      explanation: 'V2O5 xúc tác trong sản xuất H2SO4.',
      points: 10
    },
    {
      type: 'multiple-choice',
      question: 'Obitan d bắt đầu điền từ chu kì:',
      options: ['3', '4', '5', '6'],
      correctAnswer: 1,
      explanation: 'Dãy 3d thuộc chu kì 4 (Sc → Zn).',
      points: 10
    },
    {
      type: 'multiple-choice',
      question: 'Từ tính nghịch từ xuất hiện khi:',
      options: ['Có e độc thân', 'Tất cả e ghép đôi', 'Có obitan p trống', 'Có lớp f đầy'],
      correctAnswer: 1,
      explanation: 'Ghép đôi hoàn toàn → bị đẩy yếu bởi từ trường.',
      points: 10
    },
    {
      type: 'true-false',
      question: 'Cu là kim loại chuyển tiếp vì lớp d chưa bão hoà ở trạng thái nguyên tử.',
      correctAnswer: false,
      explanation: 'Cu (3d10 4s1) có d bão hoà; vẫn được xếp nhóm chuyển tiếp nhờ ion Cu2+ có d9.',
      points: 10
    }
  ]
};
