module.exports = {
  classId: 10,
  curriculumType: 'ketnoi',
  chapterId: 4,
  chapterName: 'Chương 4: Phản ứng oxi hóa - khử',
  lessonId: 16,
  title: 'Bài 16: Ôn tập chương 4',
  description: 'Ôn chương 4: tính SOX nhanh, phân vai oxi hóa/khử, cân bằng e theo bước.',
  level: 'Intermediate',
  order: 2,
  theoryModules: [
    {
        id: 'mod-1',
        type: 'heading',
        content: {
            text: 'Ôn tập chương 4',
            level: 'h2'
        }
    },
    {
        id: 'mod-2',
        type: 'infoBox',
        content: {
            title: 'SOX nhanh & phân vai',
            content: 'Nhớ giá trị cố định: F = -1; O ≈ -2 (trừ peroxit -1, OF2: +2); H = +1 (trừ hydrua kim loại: -1); kim loại kiềm/kiềm thổ: +1/+2.\nXác định nguyên tố đổi SOX → gán vai: tăng SOX → chất khử; giảm SOX → chất oxi hóa.',
            color: 'blue',
            listType: 'bullet'
        }
    },
    {
        id: 'mod-3',
        type: 'infoBox',
        content: {
            title: 'Cân bằng e theo bước',
            content: 'Viết bán phản ứng oxi hóa/khử, thêm e, H2O, H+, OH- tuỳ môi trường.\nNhân hệ số để e nhường = e nhận, ghép hai bán phản ứng.\nCân bằng nguyên tử còn lại, kiểm tra điện tích cuối.',
            color: 'blue',
            listType: 'bullet'
        }
    },
    {
        id: 'mod-4',
        type: 'infoBox',
        content: {
            title: 'Ứng dụng & lỗi thường gặp',
            content: 'Ứng dụng: ăn mòn kim loại, luyện kim, pin điện hoá, xử lý nước thải (Cl2, O3).\nLỗi: quên cân bằng điện tích, dùng sai môi trường (axit vs bazơ), bỏ sót e khi ghép bán phản ứng.',
            color: 'blue',
            listType: 'bullet'
        }
    }
  ],
  game: [
    {
      type: 'multiple-choice',
      question: 'SOX của S trong H2SO4 là?',
      options: ['-2', '0', '+4', '+6'],
      correctAnswer: 3,
      explanation: 'Tổng SOX = 0 → 2(+1) + S + 4(-2) = 0 → S = +6.',
      points: 10
    },
    {
      type: 'multiple-choice',
      question: 'Cặp nào mô tả đúng quá trình khử?',
      options: ['Fe3+ → Fe2+', 'Cl- → Cl2', 'Zn → Zn2+', 'Fe2+ → Fe3+'],
      correctAnswer: 0,
      explanation: 'Fe3+ nhận 1e thành Fe2+ (SOX giảm) là khử.',
      points: 10
    },
    {
      type: 'true-false',
      question: 'Trong phản ứng oxi hóa - khử, chất nhường e luôn là chất khử.',
      correctAnswer: true,
      explanation: 'Định nghĩa: chất khử nhường electron.',
      points: 10
    },
    {
      type: 'multiple-choice',
      question: 'SOX của N trong NH3 là:',
      options: ['-3', '-2', '+3', '+5'],
      correctAnswer: 0,
      explanation: 'Tổng SOX = 0 → N + 3(+1) = 0 ⇒ N = -3.',
      points: 10
    },
    {
      type: 'multiple-choice',
      question: 'Trong phản ứng MnO4^- (môi trường axit) → Mn^{2+}, Mn:',
      options: ['Bị oxi hóa', 'Bị khử', 'Không đổi SOX', 'Bị trung hòa'],
      correctAnswer: 1,
      explanation: 'Mn từ +7 xuống +2 → giảm SOX → bị khử.',
      points: 10
    },
    {
      type: 'multiple-choice',
      question: 'Chất oxi hóa mạnh thường có SOX:',
      options: ['Rất thấp', 'Rất cao hoặc chứa O, halogen', 'Bằng 0', 'Âm'],
      correctAnswer: 1,
      explanation: 'SOX cao/halogen dễ nhận e → oxi hóa mạnh.',
      points: 10
    },
    {
      type: 'true-false',
      question: 'Trong môi trường bazơ, cân bằng O bằng cách thêm H2O rồi OH-.',
      correctAnswer: true,
      explanation: 'Thêm H2O để bổ sung O, thêm OH- để cân bằng H và điện tích.',
      points: 10
    },
    {
      type: 'multiple-choice',
      question: 'Phản ứng nào là tự oxi hoá - khử (disproportionation)?',
      options: ['2Fe^{2+} + Cl2 → 2Fe^{3+} + 2Cl^-', '2H2O2 → 2H2O + O2', 'Zn + Cu^{2+} → Zn^{2+} + Cu', 'NaOH + HCl → NaCl + H2O'],
      correctAnswer: 1,
      explanation: 'O trong H2O2 vừa -1 → 0 (oxi hóa) vừa -2 (khử).',
      points: 10
    },
    {
      type: 'multiple-choice',
      question: 'Khi ghép hai bán phản ứng, bước nào cần kiểm tra cuối cùng?',
      options: ['Electron đã triệt tiêu', 'Khối lượng mol', 'Màu dung dịch', 'Áp suất khí'],
      correctAnswer: 0,
      explanation: 'Đảm bảo e cho = e nhận và đã triệt tiêu.',
      points: 10
    },
    {
      type: 'true-false',
      question: 'SOX của O trong OF2 là +2.',
      correctAnswer: true,
      explanation: 'F = -1 mạnh hơn → O mang +2 trong OF2.',
      points: 10
    }
  ]
};
