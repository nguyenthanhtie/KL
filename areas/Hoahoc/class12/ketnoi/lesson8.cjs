module.exports = {
  classId: 12,
  curriculumType: 'ketnoi',
  chapterId: 3,
  chapterName: 'Chương 3: Hợp chất chứa nitrogen',
  lessonId: 8,
  title: 'Bài 8: Amine',
  description: 'Phân loại amine, tính bazơ, phản ứng thế, ankyl hoá và điều chế.',
  level: 'Intermediate',
  order: 8,
  theoryModules: [
    {
        id: 'mod-1',
        type: 'heading',
        content: {
            text: 'Amine',
            level: 'h2'
        }
    },
    {
        id: 'mod-2',
        type: 'paragraph',
        content: {
            text: 'Nắm cấu trúc, tính bazơ và các phản ứng đặc trưng của amine, đặc biệt anilin và dẫn xuất thơm.'
        }
    },
    {
        id: 'mod-3',
        type: 'infoBox',
        content: {
            title: 'Phân loại & danh pháp',
            content: 'Bậc 1/2/3 dựa vào số gốc alkyl/aryl gắn N; amoni bậc 4 là muối.\nDanh pháp: alkyl amine; anilin cho nhân thơm.\nTính bazơ: amine béo > amoniac > anilin (do -M của vòng benzene).',
            color: 'gray',
            listType: 'bullet'
        }
    },
    {
        id: 'mod-4',
        type: 'infoBox',
        content: {
            title: 'Tính chất & phản ứng',
            content: 'Bazơ yếu, tạo muối amoni với axit; tan tốt khi proton hoá.\nAlkyl hoá/acyl hoá: R-X, anhiđrit/ClOCOR.\nAnilin dễ bị brom hoá: C6H5NH2 + 3Br2 → 2,4,6-tribromanilin (kết tủa trắng).\nDiazoni hoá anilin (≤5°C, HCl + NaNO2) → muối diazoni, thuận lợi cho phản ứng ghép azo.',
            color: 'blue',
            listType: 'bullet'
        }
    },
    {
        id: 'mod-5',
        type: 'infoBox',
        content: {
            title: 'Điều chế & ứng dụng',
            content: 'Khử hợp chất nitro (nitrobenzene → anilin), khử oxime, Hofmann (amide → amine bậc 1).\nAmine thơm: nguyên liệu thuốc nhuộm azo, dược phẩm, cao su lưu hoá.\nPhân tích: thử nhóm NH2 bằng nitrit/axit → khí N2 (amine bậc 1 thơm tạo muối diazoni).',
            color: 'gray',
            listType: 'bullet'
        }
    },
    {
        id: 'mod-6',
        type: 'infoBox',
        content: {
            title: 'So sánh bazơ & phản ứng',
            content: 'Bazơ: amine béo > NH3 > anilin; do +I alkyl vs -M vòng benzene.\nAlkyl hoá dễ quá đà → bậc cao; muốn dừng ở bậc 1 dùng phương pháp Gabriel/Hofmann.\nAnilin phản ứng điện ly kém → khi cần thế trên vòng, phải bảo vệ NH2 (acyl hoá) rồi brom hoá/chlor hoá.',
            color: 'purple',
            listType: 'bullet'
        }
    },
    {
        id: 'mod-7',
        type: 'infoBox',
        content: {
            title: 'Case & mẹo',
            content: 'Nhận biết anilin: dung dịch Br2 → kết tủa trắng vàng tribromanilin + mất màu.\nKiềm yếu: anilin tan tốt trong HCl (tạo muối), tách ra bằng NaOH; mẹo tách hỗn hợp amine béo/anilin.\nMuối diazoni dùng ngay ở 0-5°C; ghép azo với phenol/amine hoạt hoá tạo phẩm nhuộm.',
            color: 'blue',
            listType: 'bullet'
        }
    },
    {
        id: 'mod-8',
        type: 'infoBox',
        content: {
            title: 'Ôn bài tập',
            content: 'Tính lượng AgNO2/NaNO2 cần diazoni hóa: 1 mol anilin ↔ 1 mol nitrit.\nChuỗi tổng hợp: nitrobenzene → anilin (khử) → acetanilide (bảo vệ) → brom hoá → thu hydrolysis.\nPhân biệt bậc amine: thử Hinsberg (benzensulfonyl chloride) để tách 1°, 2°, 3°.',
            color: 'gray',
            listType: 'bullet'
        }
    }
  ],
  game: [
    {
      type: 'multiple-choice',
      question: 'Nguyên nhân anilin bazơ yếu hơn metylamin:',
      options: ['Hiệu ứng +I mạnh', 'Hiệu ứng -M của vòng benzene kéo e khỏi N', 'Do trọng lượng phân tử lớn', 'Do có nhiều NH2'],
      correctAnswer: 1,
      explanation: 'M- làm giảm mật độ e trên N, giảm khả năng nhận H+. ',
      points: 10
    },
    {
      type: 'multiple-choice',
      question: 'Thuốc thử nhận biết anilin bằng kết tủa trắng là:',
      options: ['Br2 (dung dịch)', 'AgNO3', 'Cu(OH)2', 'KMnO4'],
      correctAnswer: 0,
      explanation: 'Anilin bị brom hoá mạnh tạo 2,4,6-tribromanilin kết tủa trắng vàng.',
      points: 10
    },
    {
      type: 'true-false',
      question: 'Muối diazoni bền ở nhiệt độ phòng.',
      correctAnswer: false,
      explanation: 'Muối diazoni thơm bền ở 0-5°C, phân huỷ khi nóng.',
      points: 10
    },
    {
      type: 'multiple-choice',
      question: 'Phản ứng Hofmann cho sản phẩm chính là:',
      options: ['Amine bậc 3', 'Amine bậc 1 có số C giảm 1', 'Amide', 'Axit cacboxylic'],
      correctAnswer: 1,
      explanation: 'Khử amide bằng Br2/NaOH loại nhóm C=O, tạo amine bậc 1.',
      points: 10
    },
    {
      type: 'multiple-choice',
      question: 'Anilin tác dụng với HCl tạo:',
      options: ['Muối anilinium chloride tan', 'Kết tủa anilin', 'Anhydrit', 'Diazoni'],
      correctAnswer: 0,
      explanation: 'C6H5NH2 + HCl → C6H5NH3+Cl- tan tốt.',
      points: 10
    },
    {
      type: 'true-false',
      question: 'Axit mạnh làm giảm độ tan của muối amoni trong nước.',
      correctAnswer: false,
      explanation: 'Muối amoni tan tốt trong nước do tính ion.',
      points: 10
    },
    {
      type: 'multiple-choice',
      question: 'Phản ứng tạo azo thường bắt đầu từ:',
      options: ['Amine bậc 2', 'Muối diazoni của anilin', 'Ancol', 'Phenol'],
      correctAnswer: 1,
      explanation: 'Diazoni ghép với nhân thơm hoạt hoá (phenol/amine thơm) tạo thuốc nhuộm azo.',
      points: 10
    },
    {
      type: 'fill-in-blank',
      question: 'CH3CH2Br + NH3 dư (đun) tạo chủ yếu ______ amin.',
      correctAnswer: 'ethyl',
      explanation: 'Alkyl hoá tạo etylamin (và sản phẩm bậc cao khi NH3 không dư).',
      points: 10
    },
    {
      type: 'multiple-choice',
      question: 'Dãy giảm dần tính bazơ trong dung dịch nước:',
      options: ['Anilin > NH3 > C2H5NH2', 'C2H5NH2 > NH3 > anilin', 'NH3 > C2H5NH2 > anilin', 'Anilin > C2H5NH2 > NH3'],
      correctAnswer: 1,
      explanation: 'Hiệu ứng +I alkyl tăng bazơ, anilin yếu do -M.',
      points: 10
    },
    {
      type: 'true-false',
      question: 'Muối amoni bị NaOH giải phóng amine tự do.',
      correctAnswer: true,
      explanation: 'Bazơ mạnh tách H+ tạo amine và muối.',
      points: 10
    }
  ]
};
