module.exports = {
  classId: 12,
  curriculumType: 'ketnoi',
  chapterId: 3,
  chapterName: 'Chương 3: Hợp chất chứa nitrogen',
  lessonId: 11,
  title: 'Bài 11: Ôn tập chương 3',
  description: 'Tổng hợp amine, amino acid, peptide, protein; bài tập nhận biết và phản ứng.',
  level: 'Intermediate',
  order: 11,
  theoryModules: [
    {
        id: 'mod-1',
        type: 'heading',
        content: {
            text: 'Ôn tập chương 3: Hợp chất chứa nitrogen',
            level: 'h2'
        }
    },
    {
        id: 'mod-2',
        type: 'paragraph',
        content: {
            text: 'Tổng kết amine → amino acid → peptide/protein, các phản ứng nhận biết và ứng dụng.'
        }
    },
    {
        id: 'mod-3',
        type: 'infoBox',
        content: {
            title: 'Amine',
            content: 'Tính bazơ: amine béo > NH3 > anilin; bị proton hoá thành muối tan.\nPhản ứng: alkyl hoá, acyl hoá, diazoni hoá (anilin), ghép azo.\nNhận biết: kết tủa trắng 2,4,6-tribromanilin; mùi cá (amine bay hơi thấp).',
            color: 'gray',
            listType: 'bullet'
        }
    },
    {
        id: 'mod-4',
        type: 'infoBox',
        content: {
            title: 'Amino acid & peptide',
            content: 'Lưỡng tính, điểm đẳng điện; tạo muối, este; ninhydrin (+).\nPeptide: liên kết -CO-NH-; thử biuret, thứ tự đặt tên từ đầu N.\nThuỷ phân peptide → acid amin; protein → test biuret/xantoproteic.',
            color: 'blue',
            listType: 'bullet'
        }
    },
    {
        id: 'mod-5',
        type: 'infoBox',
        content: {
            title: 'Ứng dụng & bài tập',
            content: 'Thuốc nhuộm azo, dược phẩm (lidocain), chất ngọt (aspartam), phân tích protein.\nBảo toàn e trong phản ứng tráng bạc/Fehling với amino sugar; cân bằng khối lượng khi thuỷ phân.\nNhận biết hỗn hợp: dùng ninhydrin, biuret, xantoproteic, Br2.',
            color: 'gray',
            listType: 'bullet'
        }
    },
    {
        id: 'mod-6',
        type: 'infoBox',
        content: {
            title: 'Sơ đồ nhớ nhanh',
            content: 'Amine (bazơ) → diazoni (0-5°C) → ghép azo; amino acid (lưỡng tính) → peptide (biuret) → protein (biuret + xantoproteic).\nKiểm tra nhóm: Br2 (anilin), ninhydrin (-NH2 α), biuret (-CO-NH- lặp), Tollens/Fehling (đường khử).\nĐiểm đẳng điện: pH = pI → kết tinh; pH lệch → tan hơn (dùng để tách/điện di).',
            color: 'purple',
            listType: 'bullet'
        }
    },
    {
        id: 'mod-7',
        type: 'infoBox',
        content: {
            title: 'Case & mẹo thi',
            content: 'Tách hỗn hợp amine béo/anilin: hòa HCl → cả hai tan; thêm NaOH → anilin tách lớp, amine bay hơi nếu đun nhẹ.\nBiuret âm nhưng ninhydrin dương: acid amin/dipeptide; biuret dương: tripeptide trở lên/protein.\nPeptide tính mol nước thuỷ phân = số liên kết; dùng bảo toàn khối lượng để tính sản phẩm.',
            color: 'blue',
            listType: 'bullet'
        }
    },
    {
        id: 'mod-8',
        type: 'infoBox',
        content: {
            title: 'Ôn bài tập',
            content: 'Tính Δn khí N2 trong diazoni hóa/ghép azo để suy lượng nitrit cần dùng.\nBài tập pI: trung tính dùng (pKa1+pKa2)/2; có nhóm ion hoá bên: chọn hai pKa kẹp quanh dạng trung hòa.\nChuỗi tổng hợp: Nitro → amine → diazoni → azo; kiểm tra điều kiện nhiệt/axit để không làm phân huỷ.',
            color: 'gray',
            listType: 'bullet'
        }
    }
  ],
  game: [
    {
      type: 'multiple-choice',
      question: 'Thuốc thử biuret dương tính với:',
      options: ['Anilin', 'Glycine', 'Tripeptide', 'Methane'],
      correctAnswer: 2,
      explanation: 'Biuret cần ≥2 liên kết peptide (tripeptide trở lên).',
      points: 10
    },
    {
      type: 'multiple-choice',
      question: 'Điểm đẳng điện là pH tại đó:',
      options: ['Amino acid tan tối đa', 'Amino acid không tan', 'Tổng điện tích bằng 0', 'Amino acid bị oxi hoá'],
      correctAnswer: 2,
      explanation: 'pI → tổng điện tích 0, di chuyển chậm trong điện di.',
      points: 10
    },
    {
      type: 'true-false',
      question: 'Muối diazoni thơm bền ở 0-5°C.',
      correctAnswer: true,
      explanation: 'Nhiệt độ cao làm phân huỷ giải phóng N2.',
      points: 10
    },
    {
      type: 'multiple-choice',
      question: 'Amino acid phản ứng với HCl tạo:',
      options: ['Muối amoni', 'Este', 'Axit béo', 'Anhydrit'],
      correctAnswer: 0,
      explanation: '-NH2 nhận H+ → muối amoni tan.',
      points: 10
    },
    {
      type: 'multiple-choice',
      question: 'Thử nghiệm xantoproteic dùng để nhận biết:',
      options: ['Nhóm -NH2', 'Nhóm -COOH', 'Vòng thơm trong protein', 'Liên kết đôi C=C'],
      correctAnswer: 2,
      explanation: 'Nitro hoá nhân thơm trong Tyr/Trp/Phe cho màu vàng cam.',
      points: 10
    },
    {
      type: 'true-false',
      question: 'Anilin phản ứng ngay với nước brom cho kết tủa trắng.',
      correctAnswer: true,
      explanation: 'Tính hoạt hoá mạnh của -NH2 làm brom hoá 2,4,6-tribromanilin.',
      points: 10
    },
    {
      type: 'multiple-choice',
      question: 'Phản ứng Hofmann (Br2/NaOH) từ RCONH2 tạo:',
      options: ['Axit carboxylic', 'Amine bậc 1 mất 1C', 'Amide bậc cao', 'Este'],
      correctAnswer: 1,
      explanation: 'Mất nhóm -CO, giảm 1C, thu amine bậc 1.',
      points: 10
    },
    {
      type: 'fill-in-blank',
      question: 'Phản ứng ninhydrin tạo màu tím đặc trưng với đa số acid amin trừ ______ (cho vàng).',
      correctAnswer: 'proline',
      explanation: 'Proline là imino acid (vòng), cho màu vàng.',
      points: 10
    },
    {
      type: 'multiple-choice',
      question: 'Thuốc nhuộm azo hình thành khi muối diazoni ghép với:',
      options: ['Ankan', 'Phenol/amine thơm hoạt hoá', 'Axit béo', 'Ester'],
      correctAnswer: 1,
      explanation: 'Vòng thơm hoạt hoá (-OH, -NH2) tạo azo màu.',
      points: 10
    },
    {
      type: 'true-false',
      question: 'Glycylalanine và alanylglycine là hai dipeptide khác nhau.',
      correctAnswer: true,
      explanation: 'Thứ tự acid amin khác → tính chất khác.',
      points: 10
    }
  ]
};
