module.exports = {
  classId: 12,
  curriculumType: 'ketnoi',
  chapterId: 6,
  chapterName: 'Chương 6: Đại cương về kim loại',
  lessonId: 20,
  title: 'Bài 20: Sự phân bố và điều chế kim loại',
  description: 'Quặng, tinh chế, các phương pháp nhiệt luyện, thuỷ luyện, điện phân.',
  level: 'Intermediate',
  order: 20,
  theoryModules: [
    {
        id: 'mod-1',
        type: 'heading',
        content: {
            text: 'Sự phân bố và điều chế kim loại',
            level: 'h2'
        }
    },
    {
        id: 'mod-2',
        type: 'paragraph',
        content: {
            text: 'Từ quặng đến kim loại: làm giàu, chọn phương pháp khử phù hợp với mức độ hoạt động kim loại.'
        }
    },
    {
        id: 'mod-3',
        type: 'infoBox',
        content: {
            title: 'Quặng & làm giàu',
            content: 'Oxit (hematit Fe2O3, bauxit Al2O3), sunfua (ZnS), cacbonat (CaCO3), silicat.\nLàm giàu: tuyển nổi, tuyển từ, rửa, tuyển trọng lực.',
            color: 'gray',
            listType: 'bullet'
        }
    },
    {
        id: 'mod-4',
        type: 'infoBox',
        content: {
            title: 'Phương pháp điều chế',
            content: 'Kim loại hoạt động mạnh (K, Na, Ca, Al): điện phân nóng chảy muối/oxit (NaCl, Al2O3/cryolit).\nTrung bình (Zn, Fe, Sn): nhiệt luyện với C/CO/H2; khử oxit trong lò cao (Fe).\nYếu (Cu, Ag, Au): thuỷ luyện, khử hoá học nhẹ.',
            color: 'blue',
            listType: 'bullet'
        }
    },
    {
        id: 'mod-5',
        type: 'infoBox',
        content: {
            title: 'Ví dụ công nghệ',
            content: 'Lò cao: quặng Fe2O3 + C/CO + đá vôi (khử, tạo xỉ CaSiO3).\nĐiện phân Al: bauxit → Al2O3 → hòa tan cryolit, điện phân Hall-Héroult.\nĐiện phân dung dịch: Cu tinh luyện điện phân; sản phẩm phụ Ag, Au ở bùn anot.',
            color: 'gray',
            listType: 'bullet'
        }
    },
    {
        id: 'mod-6',
        type: 'infoBox',
        content: {
            title: 'Nhận diện nhanh',
            content: 'N2: trơ, không duy trì sự cháy; lỏng hoá làm lạnh sâu.\nNH3: mùi khai, làm xanh quỳ ẩm, tan mạnh trong nước.\nNO: không màu, hoá nâu ngoài không khí (thành NO2); N2O: khí cười, không hỗ trợ cháy mạnh bằng O2.',
            color: 'purple',
            listType: 'bullet'
        }
    },
    {
        id: 'mod-7',
        type: 'infoBox',
        content: {
            title: 'Case & ứng dụng',
            content: 'Quy trình Haber: tăng p, xt Fe-K-Al; cân bằng thuận nghịch bị ức chế bởi H2O, CO.\nKiểm soát ô nhiễm NOx: dùng bộ lọc 3 chức năng (khử NOx, oxi hoá CO, HC).\nN2 lỏng vận chuyển mẫu sinh học; NH3 làm phân bón và chất hấp thụ CO2 trong một số quy trình lạnh.',
            color: 'blue',
            listType: 'bullet'
        }
    },
    {
        id: 'mod-8',
        type: 'infoBox',
        content: {
            title: 'Ôn bài tập',
            content: 'Tính hiệu suất Haber khi thay đổi áp suất/nhiệt độ theo nguyên lí Lê Chatelier.\nLập PTHH minh hoạ: chuyển NO ↔ NO2 ↔ HNO3 trong quy trình Ostwald.\nSo sánh tính oxi hoá/khử của N2O, NO, NO2 trong phản ứng với KI/H2S.',
            color: 'gray',
            listType: 'bullet'
        }
    }
  ],
  game: [
    {
      type: 'multiple-choice',
      question: 'Kim loại nào bắt buộc điện phân nóng chảy để điều chế?',
      options: ['Fe', 'Zn', 'Al', 'Cu'],
      correctAnswer: 2,
      explanation: 'Al hoạt động mạnh, không khử bằng C/CO được.',
      points: 10
    },
    {
      type: 'multiple-choice',
      question: 'Trong lò cao, chất tạo xỉ là:',
      options: ['Coke', 'Không khí nóng', 'Đá vôi CaCO3', 'Fe2O3'],
      correctAnswer: 2,
      explanation: 'CaCO3 phân huỷ → CaO, kết hợp SiO2 tạo xỉ CaSiO3.',
      points: 10
    },
    {
      type: 'true-false',
      question: 'ZnS thường được chuyển thành ZnO trước khi khử bằng C.',
      correctAnswer: true,
      explanation: 'Nung quặng sunfua thành oxit để khử dễ hơn.',
      points: 10
    },
    {
      type: 'multiple-choice',
      question: 'Điện phân dung dịch CuSO4 với anot Cu thu được:',
      options: ['Cu tan dần ở anot, bám catot', 'Cu bám cả hai', 'Cu tan catot', 'Không đổi'],
      correctAnswer: 0,
      explanation: 'Anot tan cung Cu2+, catot thu Cu tinh khiết.',
      points: 10
    },
    {
      type: 'multiple-choice',
      question: 'Quặng chính của nhôm là:',
      options: ['Criolit', 'Bauxit', 'Manhetit', 'Pirit'],
      correctAnswer: 1,
      explanation: 'Bauxit chứa Al2O3·nH2O.',
      points: 10
    },
    {
      type: 'true-false',
      question: 'Kim loại quý như Au, Ag thường điều chế bằng thuỷ luyện.',
      correctAnswer: true,
      explanation: 'Dùng dung dịch cyanide/thuỷ ngân chiết hoặc điện phân.',
      points: 10
    },
    {
      type: 'multiple-choice',
      question: 'Trong quy trình Hall-Héroult, cryolit (Na3AlF6) có vai trò:',
      options: ['Chất khử', 'Hạ điểm nóng chảy Al2O3 và dẫn điện', 'Tăng điểm nóng chảy', 'Chất oxi hoá'],
      correctAnswer: 1,
      explanation: 'Cryolit hạ nhiệt độ nóng chảy và tăng dẫn điện của hỗn hợp.',
      points: 10
    },
    {
      type: 'fill-in-blank',
      question: 'C/CO khử Fe2O3 trong lò cao tạo Fe và khí ______.',
      correctAnswer: 'CO2',
      explanation: 'Fe2O3 + 3CO → 2Fe + 3CO2.',
      points: 10
    },
    {
      type: 'multiple-choice',
      question: 'Phương pháp nào phù hợp điều chế Na?',
      options: ['Nhiệt luyện Na2CO3', 'Điện phân NaCl nóng chảy', 'Điện phân NaCl dung dịch', 'Khử NaOH bằng H2'],
      correctAnswer: 1,
      explanation: 'Na phải điện phân nóng chảy vì quá hoạt động.',
      points: 10
    },
    {
      type: 'true-false',
      question: 'Bùn anot trong tinh luyện Cu thường chứa kim loại quý.',
      correctAnswer: true,
      explanation: 'Ag, Au, Pt không tan, lắng lại bùn anot.',
      points: 10
    }
  ]
};
