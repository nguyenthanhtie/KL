module.exports = {
  classId: 12,
  curriculumType: 'ketnoi',
  chapterId: 6,
  chapterName: 'Chương 6: Đại cương về kim loại',
  lessonId: 23,
  title: 'Bài 23: Ôn tập chương 6',
  description: 'Tóm tắt cấu tạo, tính chất, điều chế, hợp kim và ăn mòn kim loại.',
  level: 'Intermediate',
  order: 23,
  theoryModules: [
    {
        id: 'mod-1',
        type: 'heading',
        content: {
            text: 'Ôn tập đại cương kim loại',
            level: 'h2'
        }
    },
    {
        id: 'mod-2',
        type: 'paragraph',
        content: {
            text: 'Tóm tắt cấu trúc, tính chất, phản ứng, điều chế, hợp kim và chống ăn mòn.'
        }
    },
    {
        id: 'mod-3',
        type: 'infoBox',
        content: {
            title: 'Cấu trúc & tính chất',
            content: 'Liên kết kim loại tạo "biển e" → dẫn điện, dẻo, ánh kim.\nTính khử tăng theo hoạt động hoá học; xét dãy điện hoá.\nHợp kim: thay thế/xen kẽ, điều chỉnh độ cứng, chống gỉ.',
            color: 'gray',
            listType: 'bullet'
        }
    },
    {
        id: 'mod-4',
        type: 'warningBox',
        content: {
            title: 'Phản ứng chính',
            content: 'Với phi kim: O2 (tạo oxit), S, Cl2 (toả nhiệt).\nVới nước: mạnh (K, Na, Ca), yếu/nóng (Mg), không (Cu, Ag).\nVới axit: giải phóng H2 trừ HNO3, H2SO4 đặc (tạo muối + sản phẩm khử).\nPhản ứng thế dựa trên dãy điện hoá: kim loại mạnh đẩy kim loại yếu.',
            color: 'orange',
            listType: 'bullet'
        }
    },
    {
        id: 'mod-5',
        type: 'infoBox',
        content: {
            title: 'Điều chế & bảo vệ',
            content: 'Điện phân nóng chảy: kim loại hoạt động (Na, Mg, Al).\nKhử oxit bằng CO, H2 (Fe, Cu, Pb) hoặc nhiệt nhôm.\nChống ăn mòn: sơn phủ, mạ, thụ động hoá, bảo vệ catot (anot hi sinh).',
            color: 'gray',
            listType: 'bullet'
        }
    },
    {
        id: 'mod-6',
        type: 'infoBox',
        content: {
            title: 'Bảng nhớ nhanh',
            content: 'Dãy hoạt động: K > Na > Ca > Mg > Al > Zn > Fe > Ni > Sn > Pb > (H) > Cu > Ag > Au.\nĐiện phân nóng chảy: Na, Mg, Al; khử CO/H2: Fe, Zn; thuỷ luyện: Cu, Ag, Au.\nĐộ tan kiềm/kiềm thổ: IA tan, IIA tăng dần từ Mg(OH)2 → Ba(OH)2.',
            color: 'blue',
            listType: 'bullet'
        }
    },
    {
        id: 'mod-7',
        type: 'infoBox',
        content: {
            title: 'Case & bẫy đề',
            content: 'Fe trong HNO3 đặc nguội: thụ động, không thoát H2 → tránh nhầm.\nĐẩy kim loại yếu khỏi muối: chỉ kim loại trước trong dãy hoạt động mới đẩy được.\nNước cứng: nhận dạng tạm thời vs toàn phần; chọn xử lí đun sôi/Na2CO3/ion-exchange.',
            color: 'blue',
            listType: 'bullet'
        }
    },
    {
        id: 'mod-8',
        type: 'infoBox',
        content: {
            title: 'Ôn bài tập',
            content: 'Lập PTHH: thế kim loại, phản ứng với nước/axit, nhiệt phân muối cacbonat, chuyển Fe2+ ⇌ Fe3+.\nTính hiệu suất điện phân (m, V khí) dùng Faraday, chú ý anot tan/không tan.\nPhân tích chuỗi biến đổi: quặng → kim loại → hợp chất → hợp kim; chỉ ra oxi hoá/khử ở từng bước.',
            color: 'gray',
            listType: 'bullet'
        }
    }
  ],
  game: [
    {
      type: 'multiple-choice',
      question: 'Tính chất đặc trưng của liên kết kim loại là:',
      options: ['Không dẫn điện', 'Dẫn điện do e tự do', 'Không có ánh kim', 'Giòn'],
      correctAnswer: 1,
      explanation: 'Biển electron tự do cho phép dẫn điện và nhiệt tốt.',
      points: 10
    },
    {
      type: 'true-false',
      question: 'Kim loại đứng sau H trong dãy điện hoá không đẩy được H2 từ axit loãng.',
      correctAnswer: true,
      explanation: 'Kim loại yếu (Cu, Ag) không khử được H+ của axit loãng.',
      points: 10
    },
    {
      type: 'multiple-choice',
      question: 'Điện phân nóng chảy Al2O3 cần:',
      options: ['Nhiệt độ thấp và dung môi nước', 'Criolit giảm nhiệt độ nóng chảy', 'Chỉ điện cực than chì âm', 'Không cần chất dẫn điện'],
      correctAnswer: 1,
      explanation: 'Thêm criolit để hạ nhiệt độ và tăng dẫn điện.',
      points: 10
    },
    {
      type: 'multiple-choice',
      question: 'Phản ứng thế xảy ra khi:',
      options: ['Kim loại yếu đẩy kim loại mạnh', 'Kim loại mạnh đẩy kim loại yếu khỏi muối', 'Chỉ trong dung dịch kiềm', 'Chỉ với phi kim'],
      correctAnswer: 1,
      explanation: 'Kim loại hoạt động hơn khử ion kim loại yếu hơn.',
      points: 10
    },
    {
      type: 'true-false',
      question: 'Fe bị thụ động trong HNO3 đặc nguội.',
      correctAnswer: true,
      explanation: 'Lớp oxit bền hình thành, hạn chế hoà tan.',
      points: 10
    },
    {
      type: 'multiple-choice',
      question: 'Hợp kim thay thế hình thành khi:',
      options: ['Nguyên tử nhỏ chui vào lỗ trống mạng', 'Nguyên tử có kích thước tương đương thay cho nhau', 'Kim loại bị oxi hoá', 'Có phản ứng axit-bazơ'],
      correctAnswer: 1,
      explanation: 'Kích thước gần nhau cho phép thay thế trong mạng tinh thể.',
      points: 10
    },
    {
      type: 'multiple-choice',
      question: 'Anot hi sinh phù hợp để bảo vệ thép tàu là:',
      options: ['Cu', 'Ag', 'Zn', 'Hg'],
      correctAnswer: 2,
      explanation: 'Zn hoạt động hơn Fe, bị oxi hoá trước.',
      points: 10
    },
    {
      type: 'fill-in-blank',
      question: 'Phương trình điều chế Fe trong lò cao: Fe2O3 + 3CO → 2Fe + 3_____.',
      correctAnswer: 'CO2',
      explanation: 'CO bị oxi hoá thành CO2, khử Fe2O3 thành Fe.',
      points: 10
    },
    {
      type: 'multiple-choice',
      question: 'Kim loại không phản ứng với nước ở nhiệt độ thường là:',
      options: ['Na', 'K', 'Ca', 'Al'],
      correctAnswer: 3,
      explanation: 'Al thụ động do lớp oxit, không phản ứng ở điều kiện thường.',
      points: 10
    },
    {
      type: 'true-false',
      question: 'Hợp kim thường cứng hơn và nóng chảy thấp hơn kim loại thành phần.',
      correctAnswer: true,
      explanation: 'Sắp xếp mạng tinh thể biến dạng làm cứng và hạ nhiệt độ nóng chảy.',
      points: 10
    }
  ]
};
