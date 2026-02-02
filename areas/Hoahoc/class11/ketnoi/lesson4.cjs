module.exports = {
  classId: 11,
  curriculumType: 'ketnoi',
  chapterId: 2,
  chapterName: 'Chương 2: Nitrogen - sulfur',
  lessonId: 4,
  title: 'Bài 4: Nitrogen',
  description: 'Tính chất vật lí, hoá học của N2; điều chế, ứng dụng.',
  level: 'Intermediate',
  order: 4,
  theoryModules: [
    {
        id: 'mod-1',
        type: 'heading',
        content: {
            text: 'Nitrogen',
            level: 'h2'
        }
    },
    {
        id: 'mod-2',
        type: 'paragraph',
        content: {
            text: 'Hiểu tính trơ của N2, điều kiện phản ứng, chu trình điều chế và ứng dụng làm môi trường trơ.'
        }
    },
    {
        id: 'mod-3',
        type: 'infoBox',
        content: {
            title: 'Cấu trúc & tính trơ',
            content: 'N≡N ba liên kết, năng lượng liên kết lớn (~941 kJ/mol) → khó phản ứng ở điều kiện thường.\nPhản ứng khi có T, p cao hoặc xúc tác (Fe-Mo trong Haberman; tia lửa điện tạo NO).',
            color: 'gray',
            listType: 'bullet'
        }
    },
    {
        id: 'mod-4',
        type: 'warningBox',
        content: {
            title: 'Tính oxi hoá/khử',
            content: 'Tính oxi hoá khi tác dụng kim loại hoạt động: 6Li + N2 → 2Li3N.\nTính khử nhẹ: N2 + O2 ⇌ 2NO (ở 3000°C, tia lửa điện).\nChủ yếu trơ, dùng làm dung môi khí trơ, đệm phòng cháy.',
            color: 'orange',
            listType: 'bullet'
        }
    },
    {
        id: 'mod-5',
        type: 'infoBox',
        content: {
            title: 'Điều chế & ứng dụng',
            content: 'Công nghiệp: chưng cất phân đoạn không khí lỏng.\nPhòng thí nghiệm: nhiệt phân NaN3 (túi khí) hoặc phân huỷ NH4NO2.\nỨng dụng: môi trường trơ (bảo quản thực phẩm, hàn, sản xuất linh kiện), sản xuất NH3.',
            color: 'purple',
            listType: 'bullet'
        }
    },
    {
        id: 'mod-6',
        type: 'infoBox',
        content: {
            title: 'Lưu ý an toàn & môi trường',
            content: 'N2 không độc nhưng có thể gây thiếu oxy trong không gian kín.\nNOx (sản phẩm oxy hoá N2) gây ô nhiễm không khí, tạo mưa axit.',
            color: 'gray',
            listType: 'bullet'
        }
    }
  ],
  game: [
    {
      type: 'multiple-choice',
      question: 'Nguyên nhân chính làm N2 trơ ở điều kiện thường là:',
      options: ['Khối lượng phân tử nhỏ', 'Liên kết ba có năng lượng lớn', 'Phân tử không phân cực', 'Tồn tại ở dạng khí'],
      correctAnswer: 1,
      explanation: 'N≡N có năng lượng liên kết rất cao, khó bị phá vỡ.',
      points: 10
    },
    {
      type: 'multiple-choice',
      question: 'Phản ứng công nghiệp tổng hợp NH3 dùng xúc tác:',
      options: ['V2O5', 'Fe - Mo/K2O', 'Pt - Rh', 'Ni'],
      correctAnswer: 1,
      explanation: 'Quá trình Haber dùng xúc tác Fe (có chất trợ Mo/K2O).',
      points: 10
    },
    {
      type: 'true-false',
      question: 'N2 có thể bị oxy hoá thành NO trong tia lửa điện.',
      correctAnswer: true,
      explanation: 'Nhiệt độ cao ~3000°C phá vỡ liên kết ba, tạo NO.',
      points: 10
    },
    {
      type: 'multiple-choice',
      question: 'Điều chế N2 tinh khiết trong phòng thí nghiệm có thể từ:',
      options: ['Điện phân nước', 'Chưng cất rượu', 'Phân huỷ NH4NO2', 'Cracking metan'],
      correctAnswer: 2,
      explanation: 'NH4NO2 → N2 + 2H2O (đun nóng).',
      points: 10
    },
    {
      type: 'multiple-choice',
      question: 'Phản ứng thể hiện tính oxi hoá của N2 là:',
      options: ['N2 + 3H2 ⇌ 2NH3', '6Li + N2 → 2Li3N', 'N2 + O2 ⇌ 2NO', 'N2 + CO2 →'],
      correctAnswer: 1,
      explanation: 'N2 nhận e từ kim loại hoạt động → Li3N, đóng vai trò oxi hoá.',
      points: 10
    },
    {
      type: 'multiple-choice',
      question: 'Ứng dụng quan trọng nhất của N2 trong công nghiệp hoá chất là:',
      options: ['Làm lạnh', 'Sản xuất NH3', 'Thổi bóng bay', 'Tạo pháo hoa'],
      correctAnswer: 1,
      explanation: 'NH3 là sản phẩm lớn nhất từ N2 (phân bón, hoá chất).',
      points: 10
    },
    {
      type: 'true-false',
      question: 'N2 là khí độc với người.',
      correctAnswer: false,
      explanation: 'N2 trơ, không độc; nguy cơ là chiếm chỗ oxy trong không gian kín.',
      points: 10
    },
    {
      type: 'multiple-choice',
      question: 'Không khí sau khi hoá lỏng tách N2 dựa trên:',
      options: ['Nhiệt độ nóng chảy khác nhau', 'Độ tan trong nước', 'Khối lượng riêng', 'Tính khử'],
      correctAnswer: 0,
      explanation: 'Chưng cất phân đoạn dựa vào điểm sôi khác nhau của O2, N2, Ar.',
      points: 10
    },
    {
      type: 'multiple-choice',
      question: 'Phản ứng nào không thực tế ở điều kiện thường?',
      options: ['N2 + 3H2 ⇌ 2NH3', 'N2 + O2 ⇌ 2NO', 'N2 + 3Mg → Mg3N2', 'N2 + 3H2O →'],
      correctAnswer: 3,
      explanation: 'N2 không phản ứng trực tiếp với nước.',
      points: 10
    },
    {
      type: 'fill-in-blank',
      question: 'N2 phản ứng với O2 trong tia lửa điện tạo sản phẩm khí ____.',
      correctAnswer: 'NO',
      explanation: 'Tia lửa điện: N2 + O2 → 2NO.',
      points: 10
    }
  ]
};
