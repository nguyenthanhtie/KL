module.exports = {
  classId: 12,
  curriculumType: 'ketnoi',
  chapterId: 4,
  chapterName: 'Chương 4: Polymer',
  lessonId: 12,
  title: 'Bài 12: Đại cương về polymer',
  description: 'Khái niệm, phân loại, cơ chế trùng hợp/trùng ngưng và thông số đặc trưng.',
  level: 'Intermediate',
  order: 12,
  theoryModules: [
    {
        id: 'mod-1',
        type: 'heading',
        content: {
            text: 'Đại cương về polymer',
            level: 'h2'
        }
    },
    {
        id: 'mod-2',
        type: 'paragraph',
        content: {
            text: 'Nền tảng về monomer, phản ứng tạo mạch, phân loại và các thông số đặc trưng của vật liệu polymer.'
        }
    },
    {
        id: 'mod-3',
        type: 'infoBox',
        content: {
            title: 'Khái niệm & phân loại',
            content: 'Polymer: chất có phân tử khối rất lớn, gồm các mắt xích (đơn vị lặp) từ monomer.\nPhân loại: tự nhiên (tinh bột, ADN), nhân tạo (tơ visco), tổng hợp (PE, PVC).\nCấu trúc: mạch thẳng, nhánh, mạng không gian; ảnh hưởng cơ học và nhiệt.',
            color: 'gray',
            listType: 'bullet'
        }
    },
    {
        id: 'mod-4',
        type: 'infoBox',
        content: {
            title: 'Phản ứng tạo polymer',
            content: 'Trùng hợp cộng: monomer chứa liên kết bội (PE, PP, PS).\nTrùng ngưng: kèm tách nhỏ phân tử (H2O, HCl) giữa monomer đa chức (PA, PET, phenol-formaldehyde).\nGhép khối/mẫu: block copolymer, random, alternating.',
            color: 'blue',
            listType: 'bullet'
        }
    },
    {
        id: 'mod-5',
        type: 'infoBox',
        content: {
            title: 'Thông số đặc trưng',
            content: 'Độ trùng hợp (DP) ≈ M₍w₎/M₍đơn vị lặp₎; phân bố khối lượng (PDI).\nNhiệt độ hoá thuỷ tinh (Tg), nhiệt độ nóng chảy (Tm) ảnh hưởng gia công.\nĐộ kết tinh: mạch thẳng dễ kết tinh (PE), mạch nhánh khó kết tinh (LDPE).',
            color: 'gray',
            listType: 'bullet'
        }
    },
    {
        id: 'mod-6',
        type: 'infoBox',
        content: {
            title: 'So sánh cơ chế',
            content: 'Trùng hợp gốc → khơi mào, truyền, chấm dứt; dễ PDI rộng.\nTrùng ngưng → cần nhóm đa chức, tách phân tử nhỏ, DP tăng dần.\nGhép khối (block) cải thiện tính chất: đàn hồi (SBS), pha trộn mềm-cứng.',
            color: 'purple',
            listType: 'bullet'
        }
    },
    {
        id: 'mod-7',
        type: 'infoBox',
        content: {
            title: 'Case & ứng dụng',
            content: 'Chọn polymer: cần trong, nhẹ → PP/PC; cần rào cản khí → PET/EVOH.\nĐiều chỉnh Tg: thêm chất hoá dẻo (PVC mềm) hoặc tăng kết tinh (kéo sợi PET).\nNhận biết loại phản ứng: có H2O/HCl tách ra → trùng ngưng; không tách → trùng hợp cộng.',
            color: 'blue',
            listType: 'bullet'
        }
    },
    {
        id: 'mod-8',
        type: 'infoBox',
        content: {
            title: 'Ôn bài tập',
            content: 'Tính DP từ khối lượng: DP ≈ M mẫu / M mắt xích; chú ý đơn vị g/mol.\nDự đoán Tg/Tm: mạch cứng, tương tác mạnh (aromatic, H-bond) → Tg/Tm cao.\nVẽ đơn vị lặp từ monomer: xoá liên kết bội, giữ khung chính; với trùng ngưng, ghép qua nhóm chức còn lại.',
            color: 'gray',
            listType: 'bullet'
        }
    }
  ],
  game: [
    {
      type: 'multiple-choice',
      question: 'Trùng hợp etilen tạo:',
      options: ['PVC', 'PE', 'PP', 'PS'],
      correctAnswer: 1,
      explanation: 'Etilen (CH2=CH2) trùng hợp → polyetylen.',
      points: 10
    },
    {
      type: 'multiple-choice',
      question: 'Phản ứng trùng ngưng đặc trưng bởi:',
      options: ['Không tách sản phẩm phụ', 'Tách phân tử nhỏ như H2O, HCl', 'Chỉ xảy ra với anken', 'Không cần monomer đa chức'],
      correctAnswer: 1,
      explanation: 'Trùng ngưng cần nhóm chức hai hay nhiều để tách phân tử nhỏ.',
      points: 10
    },
    {
      type: 'true-false',
      question: 'Polymer mạch nhánh thường có độ kết tinh thấp hơn mạch thẳng.',
      correctAnswer: true,
      explanation: 'Nhánh cản trở sắp xếp, giảm kết tinh.',
      points: 10
    },
    {
      type: 'multiple-choice',
      question: 'Tg là nhiệt độ:',
      options: ['Nóng chảy kết tinh', 'Chuyển trạng thái thủy tinh → cao su', 'Sôi', 'Phân huỷ'],
      correctAnswer: 1,
      explanation: 'Tg: chuyển từ trạng thái giòn kính sang mềm dẻo.',
      points: 10
    },
    {
      type: 'multiple-choice',
      question: 'PDI (Mw/Mn) càng gần 1 cho thấy:',
      options: ['Phân bố khối lượng hẹp', 'Phân bố rất rộng', 'Polymer nhánh', 'Polymer dễ phân huỷ'],
      correctAnswer: 0,
      explanation: 'PDI ~1 nghĩa chuỗi có kích thước đồng đều.',
      points: 10
    },
    {
      type: 'true-false',
      question: 'Polymer tự nhiên bao gồm tinh bột, cellulose, protein.',
      correctAnswer: true,
      explanation: 'Chúng đều là macromolecule có nguồn gốc sinh học.',
      points: 10
    },
    {
      type: 'multiple-choice',
      question: 'Monomer của nylon-6,6 là:',
      options: ['Caprolactam', 'Hexametylen diamine và axit adipic', 'Etilen glycol và axit terephtalic', 'Styrene'],
      correctAnswer: 1,
      explanation: 'Nylon-6,6 = HMDA + adipic acid (trùng ngưng).',
      points: 10
    },
    {
      type: 'fill-in-blank',
      question: 'Độ trùng hợp xấp xỉ DP ≈ M phân tử / M ______.',
      correctAnswer: 'đơn vị lặp',
      explanation: 'Chia khối lượng trung bình cho khối lượng một mắt xích.',
      points: 10
    },
    {
      type: 'multiple-choice',
      question: 'Polymer kết tinh cao thường có tính chất:',
      options: ['Trong suốt, mềm', 'Đục, bền kéo cao', 'Dễ tan nước', 'Nhiệt độ nóng chảy thấp'],
      correctAnswer: 1,
      explanation: 'Vùng kết tinh tăng độ bền, độ đục.',
      points: 10
    },
    {
      type: 'true-false',
      question: 'Trùng hợp khơi mào gốc tự do thường dùng benzoil peroxit.',
      correctAnswer: true,
      explanation: 'BPO phân huỷ cho gốc tự do khởi động phản ứng cộng chuỗi.',
      points: 10
    }
  ]
};
