module.exports = {
  classId: 9,
  curriculumType: 'ketnoi',
  chapterId: 7,
  chapterName: 'Chương 7: Giới thiệu về chất hữu cơ. Hydrocarbon và nguồn nhiên liệu',
  lessonId: 24,
  title: 'Bài 24: Anken',
  description: 'Hydrocarbon không no có một liên kết đôi C=C, tính chất đặc trưng.',
  level: 'Intermediate',
  order: 7,
  theoryModules: [
    {
        id: 'mod-1',
        type: 'heading',
        content: {
            text: '🧪 Anken (alkene)',
            level: 'h2'
        }
    },
    {
        id: 'mod-2',
        type: 'paragraph',
        content: {
            text: 'Mục tiêu: nhận diện anken qua liên kết đôi, ghi nhớ phản ứng cộng/oxi hoá/trùng hợp và trạng thái vật lí.'
        }
    },
    {
        id: 'mod-3',
        type: 'infoBox',
        content: {
            title: 'Cấu tạo & công thức',
            content: 'Công thức chung: C₍n₎H₍2n₎ (n ≥ 2).\nCó liên kết đôi C=C (lai hoá sp²) → tạo đồng phân hình học (cis/trans từ C₄ trở lên).\nMạch thẳng/nhánh; etilen (C₂H₄) đơn giản nhất.',
            color: 'gray',
            listType: 'bullet'
        }
    },
    {
        id: 'mod-4',
        type: 'infoBox',
        content: {
            title: 'Tính chất vật lí',
            content: 'C₂-C₄: khí; C₅ trở lên: lỏng/rắn.\nKhông tan nước, nhẹ hơn nước; tan dung môi hữu cơ.\nKhí anken dễ cháy sáng, mùi nhẹ (nếu tinh khiết).',
            color: 'blue',
            listType: 'bullet'
        }
    },
    {
        id: 'mod-5',
        type: 'warningBox',
        content: {
            title: 'Tính chất hoá học chính',
            content: '**Cộng:** H₂ (Ni,t°) → ankan; Br₂ (mất màu); HX (quy tắc Markovnikov).\n**Trùng hợp:** nCH₂=CH₂ → (-CH₂-CH₂-)₍n₎ (PE).\n**Oxi hoá:** cháy toả nhiệt; KMnO₄ loãng làm mất màu (nhẹ) → diol.',
            color: 'orange',
            listType: 'bullet'
        }
    },
    {
        id: 'mod-6',
        type: 'infoBox',
        content: {
            title: 'Ứng dụng & nguồn',
            content: 'Nguồn: cracking ankan, khí dày đặc trong dầu khí.\nỨng dụng: nguyên liệu PE, PVC (từ vinyl clorua), ancol công nghiệp (từ cộng H₂O).\nMôi trường: cháy không hoàn toàn → muội; Br₂ kiểm tra liên kết đôi (mất màu dung dịch).',
            color: 'blue',
            listType: 'bullet'
        }
    },
    {
        id: 'mod-7',
        type: 'infoBox',
        content: {
            title: 'Bảng tóm tắt nhanh',
            content: 'CTPT chung: C₍n₎H₍2n₎; liên kết π tạo tính cộng đặc trưng.\nThử brom: dung dịch Br₂ nâu đỏ → mất màu nếu có C=C.\nỨng dụng: etilen → PE, PVC; propilen → PP.',
            color: 'purple',
            listType: 'bullet'
        }
    },
    {
        id: 'mod-8',
        type: 'infoBox',
        content: {
            title: '',
            content: '**Gợi ý hình**:\nSơ đồ cộng Br₂, HX theo Markovnikov: */images/hoahoc9/lesson24-addition.png*\nChuỗi trùng hợp etilen thành PE: */images/hoahoc9/lesson24-poly.png*',
            color: 'gray',
            listType: 'bullet'
        }
    },
    {
        id: 'mod-9',
        type: 'warningBox',
        content: {
            title: 'Mini quiz đọc nhanh',
            content: 'Vì sao dung dịch brom mất màu khi gặp anken?\nThế nào là quy tắc Markovnikov khi cộng HX?\nSo sánh mức độ phản ứng cộng: anken vs ankan.\nTự trả lời trước khi làm bộ 10 câu quiz bên dưới.',
            color: 'orange',
            listType: 'bullet'
        }
    }
  ],
  game: [
    {
      type: 'multiple-choice',
      question: 'Công thức phân tử của etilen:',
      options: ['C2H6', 'C2H4', 'C3H6', 'C4H8'],
      correctAnswer: 1,
      explanation: 'Etilen là anken đơn giản nhất: C2H4.'
    },
    {
      type: 'true-false',
      question: 'Anken dễ tham gia phản ứng cộng Br2 làm mất màu dung dịch brom.',
      correctAnswer: true,
      explanation: 'Liên kết đôi bị cộng Br2, dung dịch brom mất màu.'
    },
    {
      type: 'multiple-choice',
      question: 'Sản phẩm khi cộng HCl vào etilen:',
      options: ['CH3CH2Cl', 'CH3CH3', 'CH2Cl-CH2Cl', 'C2H5OH'],
      correctAnswer: 0,
      explanation: 'Cộng HCl theo quy tắc Markovnikov tạo etyl clorua.'
    },
    {
      type: 'fill-in-blank',
      question: 'Phản ứng trùng hợp: nCH2=CH2 → ___ (PE)',
      correctAnswer: '(-CH2-CH2-)n',
      explanation: 'Sinh polietilen với mắt xích (-CH2-CH2-).' 
    },
    {
      type: 'multiple-choice',
      question: 'Nhận dạng nhanh: Anken có công thức chung nào?',
      options: ['CnH2n+2', 'CnH2n', 'CnH2n-2', 'CnH2n+1'],
      correctAnswer: 1,
      explanation: 'Anken: CnH2n.'
    },
    {
      type: 'multiple-choice',
      question: 'Liên kết đôi trong anken thường tham gia phản ứng:',
      options: ['Thế Cl2', 'Cộng H2, Br2, HX', 'Hoà tan trong nước', 'Tạo muối'],
      correctAnswer: 1,
      explanation: 'Liên kết đôi dễ cộng các tác nhân như H2, Br2, HX.'
    },
    {
      type: 'true-false',
      question: 'Anken kém bền hơn ankan.',
      correctAnswer: true,
      explanation: 'Liên kết đôi kém bền hơn liên kết đơn nên hoạt động hơn.'
    },
    {
      type: 'fill-in-blank',
      question: 'Iso-buten có công thức là C4H__',
      correctAnswer: '8',
      explanation: 'Anken n = 4 → C4H8.'
    },
    {
      type: 'multiple-choice',
      question: 'Hiện tượng gì xảy ra khi dẫn dung dịch brom vào anken?',
      options: ['Xuất hiện kết tủa trắng', 'Dung dịch mất màu nâu đỏ', 'Tạo bọt khí', 'Tạo mùi khai'],
      correctAnswer: 1,
      explanation: 'Br2 cộng vào liên kết đôi làm dung dịch brom mất màu.'
    },
    {
      type: 'multiple-choice',
      question: 'Sản phẩm cộng H2 vào propene (Ni, t°) là:',
      options: ['Propan', 'Propadien', 'Propanol', 'Propenyl clorua'],
      correctAnswer: 0,
      explanation: 'Cộng H2 bão hoà liên kết đôi tạo propan.'
    }
  ]
};
