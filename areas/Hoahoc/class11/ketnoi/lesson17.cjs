module.exports = {
  classId: 11,
  curriculumType: 'ketnoi',
  chapterId: 4,
  chapterName: 'Chương 4: Hydrocarbon',
  lessonId: 17,
  title: 'Bài 17: Arene (Hydrocarbon thơm)',
  description: 'Benzen và đồng đẳng: cấu trúc vòng thơm, phản ứng thế, định hướng thế.',
  level: 'Intermediate',
  order: 17,
  theoryModules: [
    {
        id: 'mod-1',
        type: 'heading',
        content: {
            text: 'Hiđrocacbon thơm',
            level: 'h2'
        }
    },
    {
        id: 'mod-2',
        type: 'paragraph',
        content: {
            text: 'Nhấn mạnh tính thơm (quy tắc Hückel), phản ứng thế điện ly và quy tắc định hướng thay thế.'
        }
    },
    {
        id: 'mod-3',
        type: 'infoBox',
        content: {
            title: 'Cấu trúc benzen',
            content: 'Phẳng, sáu C lai hoá sp2, góc 120°; hệ π liên hợp vòng, 6e π thỏa Hückel (4n+2, n=1).\nLiên kết C-C bằng nhau (~1,39 Å), năng lượng cộng hưởng lớn → ổn định thơm.',
            color: 'gray',
            listType: 'bullet'
        }
    },
    {
        id: 'mod-4',
        type: 'warningBox',
        content: {
            title: 'Phản ứng đặc trưng',
            content: 'Thế electrophin (SEAr): halogen hoá (Cl2/FeCl3), nitro hoá (HNO3 đặc/H2SO4), sulfo hoá (fuming H2SO4), Friedel-Crafts (RCl/AlCl3 hoặc RCOCl/AlCl3).\nHiđro hoá khó: cần Ni, t° cao → cyclohexan.\nCháy toả nhiệt, muội than do C/H cao.',
            color: 'orange',
            listType: 'bullet'
        }
    },
    {
        id: 'mod-5',
        type: 'infoBox',
        content: {
            title: 'Định hướng thế',
            content: 'Nhóm hoạt hoá/đẩy e (+I, +M) định hướng ortho, para: -OH, -NH2, -CH3, -OCH3.\nNhóm rút e mạnh (-NO2, -CF3, -COOH, -SO3H, -CHO) định hướng meta.\nHalogen rút e cảm ứng nhưng cho e liên hợp (+M) → định hướng o,p và làm giảm hoạt tính.',
            color: 'gray',
            listType: 'bullet'
        }
    },
    {
        id: 'mod-6',
        type: 'infoBox',
        content: {
            title: 'Ứng dụng & an toàn',
            content: 'Nguyên liệu hoá dầu: styren (→ polystyren), cumen (→ phenol, axeton), nitrobenzen (→ anilin).\nBenzen độc, dễ bay hơi; thao tác nơi thoáng, tránh hít/hấp thụ qua da.',
            color: 'purple',
            listType: 'bullet'
        }
    }
  ],
  game: [
    {
      type: 'multiple-choice',
      question: 'Điều kiện thơm của Hückel áp dụng cho benzen là:',
      options: ['4e π, phẳng', '6e π, phẳng, vòng liên hợp', '8e π, không phẳng', '10e π, vòng bị bão hoà'],
      correctAnswer: 1,
      explanation: 'Benzen có 6e π, phẳng, liên hợp, thoả 4n+2 (n=1).',
      points: 10
    },
    {
      type: 'multiple-choice',
      question: 'Chất xúc tác nitro hoá benzen:',
      options: ['FeCl3', 'H2SO4 đặc cùng HNO3', 'Ni', 'KMnO4'],
      correctAnswer: 1,
      explanation: 'Hỗn hợp HNO3 đặc/H2SO4 đặc tạo ion nitronium NO2+. ',
      points: 10
    },
    {
      type: 'true-false',
      question: 'Halogen trên vòng benzen định hướng nhóm thế mới vào vị trí ortho/para.',
      correctAnswer: true,
      explanation: 'Halogen rút e cảm ứng nhưng cho e liên hợp, nên định hướng o,p.',
      points: 10
    },
    {
      type: 'multiple-choice',
      question: 'Phản ứng Friedel-Crafts ankyl hoá cần xúc tác:',
      options: ['AlCl3', 'FeSO4', 'Ni', 'KMnO4'],
      correctAnswer: 0,
      explanation: 'AlCl3 (hoặc FeCl3) hoạt hoá halogenua ankyl tạo cation.',
      points: 10
    },
    {
      type: 'multiple-choice',
      question: 'Nhóm nào định hướng meta?',
      options: ['-CH3', '-NH2', '-OH', '-NO2'],
      correctAnswer: 3,
      explanation: '-NO2 rút e mạnh → định hướng meta.',
      points: 10
    },
    {
      type: 'true-false',
      question: 'Benzen dễ cộng Br2 giống anken khi có ánh sáng.',
      correctAnswer: false,
      explanation: 'Vòng thơm ưu tiên phản ứng thế; cộng cần điều kiện khắc nghiệt/hydrogenation.',
      points: 10
    },
    {
      type: 'multiple-choice',
      question: 'Sản phẩm chính khi brom hoá toluen (Br2/FeBr3) là:',
      options: ['p-bromotoluen và o-bromotoluen', 'm-bromotoluen', '1,3,5-tribromotoluen', 'Brom benzen'],
      correctAnswer: 0,
      explanation: '-CH3 hoạt hoá, định hướng o,p → hỗn hợp o, p ưu thế p.',
      points: 10
    },
    {
      type: 'multiple-choice',
      question: 'Hiđro hoá hoàn toàn benzen cần:',
      options: ['Ni, 25°C', 'Ni, áp suất cao, t° cao', 'KMnO4', 'Ánh sáng'],
      correctAnswer: 1,
      explanation: 'Vòng thơm bền, cần Ni/Pt, T cao, P cao để thành cyclohexan.',
      points: 10
    },
    {
      type: 'true-false',
      question: 'Benzen cháy cho nhiều muội than do tỉ lệ C/H cao.',
      correctAnswer: true,
      explanation: 'Hàm lượng C cao → dễ tạo muội khi cháy.',
      points: 10
    },
    {
      type: 'fill-in-blank',
      question: 'Ion điện li tham gia SEAr nitro hoá là ______',
      correctAnswer: 'NO2+',
      explanation: 'Ion nitronium NO2+ sinh ra từ HNO3/H2SO4.',
      points: 10
    }
  ]
};
