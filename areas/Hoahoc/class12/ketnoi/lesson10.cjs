module.exports = {
  classId: 12,
  curriculumType: 'ketnoi',
  chapterId: 3,
  chapterName: 'Chương 3: Hợp chất chứa nitrogen',
  lessonId: 10,
  title: 'Bài 10: Protein và enzyme',
  description: 'Cấp bậc cấu trúc protein, tính chất vật lí/hoá học, vai trò enzyme.',
  level: 'Intermediate',
  order: 10,
  theoryModules: [
    {
        id: 'mod-1',
        type: 'heading',
        content: {
            text: 'Protein và enzyme',
            level: 'h2'
        }
    },
    {
        id: 'mod-2',
        type: 'paragraph',
        content: {
            text: 'Từ cấu trúc bậc 1 đến bậc 4 và cơ chế xúc tác sinh học đặc hiệu của enzyme.'
        }
    },
    {
        id: 'mod-3',
        type: 'infoBox',
        content: {
            title: 'Cấu trúc protein',
            content: 'Bậc 1: trình tự amino acid; bậc 2: xoắn α, gấp β (liên kết H).\nBậc 3: cuộn gấp không gian, ổn định bởi cầu disulfide, liên kết H, kỵ nước, ion.\nBậc 4: nhiều tiểu đơn vị kết hợp (hemoglobin, insulin).',
            color: 'gray',
            listType: 'bullet'
        }
    },
    {
        id: 'mod-4',
        type: 'infoBox',
        content: {
            title: 'Tính chất & phản ứng',
            content: 'Đông tụ/biến tính khi nhiệt, pH, dung môi hữu cơ; mất cấu trúc bậc cao.\nThử biuret (≥2 liên kết peptide) màu tím; xantoproteic (vòng thơm) màu vàng cam.\nThuỷ phân: axit/bazơ/enzyme → peptide nhỏ/acid amin.',
            color: 'blue',
            listType: 'bullet'
        }
    },
    {
        id: 'mod-5',
        type: 'infoBox',
        content: {
            title: 'Enzyme',
            content: 'Xúc tác sinh học, giảm năng lượng hoạt hoá; đặc hiệu cơ chất.\nHoạt tính phụ thuộc pH, nhiệt độ, nồng độ cơ chất; có vùng tối ưu.\nỨng dụng: lên men, công nghiệp thực phẩm, y học (chẩn đoán, điều trị).',
            color: 'gray',
            listType: 'bullet'
        }
    },
    {
        id: 'mod-6',
        type: 'infoBox',
        content: {
            title: 'So sánh & ghi nhớ',
            content: 'Protein đơn giản vs tạp (có nhóm ngoại): hemoglobin (heme), glycoprotein (đường), metalloprotein (ion kim loại).\nBiến tính: nhiệt, pH cực trị, dung môi hữu cơ, muối kim loại nặng; thường không hồi phục.\nBiuret (+) kiểm tra chuỗi peptide; xantoproteic kiểm tra vòng thơm.',
            color: 'purple',
            listType: 'bullet'
        }
    },
    {
        id: 'mod-7',
        type: 'infoBox',
        content: {
            title: 'Case & ứng dụng',
            content: 'Ứng dụng enzyme: amylase (đường hoá), protease (tẩy rửa enzyme, tender thịt), lactase (sữa không lactose).\nKim loại nặng (Hg2+, Pb2+) gây ngộ độc do gắn -SH enzyme → mất hoạt tính; giải độc bằng tạo phức (EDTA, BAL).\nBảo quản vaccine/men: đông khô, nhiệt độ thấp để giữ cấu trúc bậc 3/4.',
            color: 'blue',
            listType: 'bullet'
        }
    },
    {
        id: 'mod-8',
        type: 'infoBox',
        content: {
            title: 'Ôn bài tập',
            content: 'Nhận dạng bậc cấu trúc: bậc 2 (xoắn/gấp), bậc 3 (cuộn gấp), bậc 4 (nhiều tiểu đơn vị).\nĐề trắc nghiệm hiệu ứng nhiệt/pH: nhớ đường cong hoạt tính có đỉnh (tối ưu), hai bên giảm.\nTính hiệu suất thủy phân protein: số liên kết peptide = số acid amin - 1; mỗi liên kết cần 1 H2O.',
            color: 'gray',
            listType: 'bullet'
        }
    }
  ],
  game: [
    {
      type: 'multiple-choice',
      question: 'Cấu trúc bậc 2 của protein được ổn định bởi:',
      options: ['Liên kết ion', 'Liên kết H giữa các liên kết peptide', 'Cầu disulfide', 'Liên kết kim loại'],
      correctAnswer: 1,
      explanation: 'Xoắn α và gấp nếp β giữ bởi H giữa C=O và N-H.',
      points: 10
    },
    {
      type: 'multiple-choice',
      question: 'Phản ứng biuret dương tính yêu cầu:',
      options: ['Có vòng thơm', 'Có ít nhất 2 liên kết peptide', 'Có nhóm -SH', 'Có ion kim loại'],
      correctAnswer: 1,
      explanation: 'Tạo phức Cu2+ màu tím với -CO-NH- lặp lại.',
      points: 10
    },
    {
      type: 'true-false',
      question: 'Đun sôi lòng trắng trứng gây biến tính protein.',
      correctAnswer: true,
      explanation: 'Nhiệt phá vỡ cấu trúc bậc cao, protein đông tụ.',
      points: 10
    },
    {
      type: 'multiple-choice',
      question: 'Xantoproteic cho màu vàng với protein chứa:',
      options: ['Amino acid mạch thẳng', 'Vòng thơm (Tyr, Trp)', 'Nhiều lysine', 'Nhiều methionine'],
      correctAnswer: 1,
      explanation: 'Nitro hoá nhân thơm tạo hợp chất màu vàng.',
      points: 10
    },
    {
      type: 'multiple-choice',
      question: 'Enzyme bị ức chế mạnh khi:',
      options: ['Ở pH tối ưu', 'Ở nhiệt độ tối ưu', 'Bị kim loại nặng gắn với -SH', 'Cơ chất tăng nhẹ'],
      correctAnswer: 2,
      explanation: 'Ion Hg2+, Pb2+ gắn -SH làm mất hoạt tính.',
      points: 10
    },
    {
      type: 'true-false',
      question: 'Hemoglobin là protein bậc 4.',
      correctAnswer: true,
      explanation: 'Gồm 4 tiểu đơn vị (2α, 2β) và nhóm heme.',
      points: 10
    },
    {
      type: 'multiple-choice',
      question: 'Tác nhân nào dưới đây thường không gây biến tính protein?',
      options: ['Nhiệt độ cao', 'Ethanol', 'pH cực trị', 'Dung dịch NaCl loãng'],
      correctAnswer: 3,
      explanation: 'NaCl loãng ít ảnh hưởng, nhưng muối bão hòa có thể làm kết tủa salting-out.',
      points: 10
    },
    {
      type: 'fill-in-blank',
      question: 'Liên kết -S-S- trong protein gọi là cầu ______.',
      correctAnswer: 'disulfide',
      explanation: 'Liên kết giữa hai cysteine.',
      points: 10
    },
    {
      type: 'multiple-choice',
      question: 'Yếu tố ảnh hưởng mạnh đến tốc độ phản ứng enzyme:',
      options: ['Màu dung dịch', 'pH, nhiệt độ, nồng độ cơ chất', 'Khối lượng phân tử enzyme', 'Áp suất khí quyển'],
      correctAnswer: 1,
      explanation: 'Enzyme có pH/nhiệt độ tối ưu; tốc độ phụ thuộc cơ chất (động học Michaelis-Menten).',
      points: 10
    },
    {
      type: 'true-false',
      question: 'Protein bị thuỷ phân hoàn toàn cho hỗn hợp amino acid.',
      correctAnswer: true,
      explanation: 'Liên kết peptide bị cắt trả về acid amin đơn lẻ.',
      points: 10
    }
  ]
};
