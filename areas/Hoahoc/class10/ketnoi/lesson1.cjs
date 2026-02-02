module.exports = {
  classId: 10,
  curriculumType: 'ketnoi',
  chapterId: 1,
  chapterName: 'Chương 1: Cấu tạo nguyên tử',
  lessonId: 1,
  title: 'Bài 1: Thành phần của nguyên tử',
  description: 'Ôn vai trò proton, nơtron, electron và ý nghĩa số hiệu nguyên tử, số khối.',
  level: 'Beginner',
  order: 1,
  theoryModules: [
    {
        id: 'mod-1',
        type: 'heading',
        content: {
            text: 'Thành phần và cấu trúc nguyên tử',
            level: 'h2'
        }
    },
    {
        id: 'mod-2',
        type: 'paragraph',
        content: {
            text: 'Mục tiêu: nhận diện ba hạt cơ bản, tính p/n/e, giải thích số hiệu nguyên tử (Z), số khối (A) và liên hệ độ bền hạt nhân.'
        }
    },
    {
        id: 'mod-3',
        type: 'infoBox',
        content: {
            title: 'Hạt proton (p)',
            content: 'Điện tích +1e, khối lượng xấp xỉ 1u (1u ≈ 1,66 × 10^{-27} kg).\nSố proton = số hiệu nguyên tử Z → định danh nguyên tố và điện tích hạt nhân +Ze.\nTăng Z → lực hút e lớn hơn → bán kính nguyên tử thường giảm trong cùng chu kì.',
            color: 'gray',
            listType: 'bullet'
        }
    },
    {
        id: 'mod-4',
        type: 'warningBox',
        content: {
            title: 'Hạt nơtron (n)',
            content: 'Không mang điện; khối lượng xấp xỉ 1u.\nSố n = A - Z → làm thay đổi số khối, tạo đồng vị.\nTỉ lệ n/p ảnh hưởng độ bền hạt nhân: hạt nhân nhẹ bền khi n/p xấp xỉ 1; hạt nhân nặng cần n/p > 1.',
            color: 'orange',
            listType: 'bullet'
        }
    },
    {
        id: 'mod-5',
        type: 'infoBox',
        content: {
            title: 'Hạt electron (e)',
            content: 'Điện tích -1e, khối lượng rất nhỏ (~1/1836 proton).\nChuyển động quanh hạt nhân theo lớp/phân lớp; quyết định tính chất hoá học.\nNguyên tử trung hoà: p = e; khi nhường/nhận e → ion dương/ion âm.',
            color: 'blue',
            listType: 'bullet'
        }
    },
    {
        id: 'mod-6',
        type: 'infoBox',
        content: {
            title: 'Công thức nhanh',
            content: 'Kí hiệu nuclit: *^{A}_{Z}X*; n = A - Z; e = Z (trung hoà).\nTổng khối lượng xấp xỉ A (đvC); m nguyên tử ≈ A × 1u.\nTỉ lệ n/p: nhẹ ~1; trung bình như *^{56}Fe* ~1,15; lệch xa → dễ phóng xạ.',
            color: 'purple',
            listType: 'bullet'
        }
    },
    {
        id: 'mod-7',
        type: 'infoBox',
        content: {
            title: 'Cách tính nhanh p, n, e',
            content: 'Đọc Z từ kí hiệu nuclit → p = Z.\nTính n = A - Z.\nNguyên tử trung hoà: e = Z; ion: e = Z ± |q|.',
            color: 'gray',
            listType: 'number'
        }
    },
    {
        id: 'mod-8',
        type: 'warningBox',
        content: {
            title: '',
            content: 'Không cộng electron vào số khối: A chỉ gồm p + n.\nIon dương không thay đổi Z, chỉ giảm số e.\nKhi so sánh n/p, dùng giá trị gần 1 hoặc >1 để dự đoán bền/không bền.\n**Tránh nhầm lẫn**:',
            color: 'orange',
            listType: 'bullet'
        }
    },
    {
        id: 'mod-9',
        type: 'infoBox',
        content: {
            title: 'Ôn nhanh trước quiz',
            content: 'Tính n từ kí hiệu nuclit và dự đoán n/p.\nLiên hệ Z với tên nguyên tố và vị trí trong BTH.\nNhận biết khi nào nguyên tử/ion giữ nguyên p nhưng đổi e.',
            color: 'gray',
            listType: 'bullet'
        }
    }
  ],
  game: {
    basic: [
      {
        type: 'multiple-choice',
        question: 'Nguyên tố được xác định bởi đại lượng nào?',
        options: ['Số nơtron', 'Số electron', 'Số proton (Z)', 'Số khối (A)'],
        correctAnswer: 2,
        explanation: 'Số hiệu nguyên tử Z = số proton định danh nguyên tố.',
        points: 10
      },
      {
        type: 'multiple-choice',
        question: 'Kí hiệu ^{23}_{11}Na cho biết số nơtron là?',
        options: ['11', '12', '23', '34'],
        correctAnswer: 1,
        explanation: 'n = A - Z = 23 - 11 = 12.',
        points: 10
      },
      {
        type: 'true-false',
        question: 'Nguyên tử trung hòa luôn có p = e.',
        correctAnswer: true,
        explanation: 'Điện tích tổng bằng 0 khi số proton bằng số electron.',
        points: 10
      },
      {
        type: 'multiple-choice',
        question: 'Số khối A của nguyên tử bằng:',
        options: ['p + e', 'p + n', 'e + n', 'p + n + e'],
        correctAnswer: 1,
        explanation: 'A = p + n (số nuclôn), e rất nhỏ không tính vào khối lượng hạt nhân.',
        points: 10
      }
    ],
    intermediate: [
      {
        type: 'multiple-choice',
        question: 'Đồng vị là những nguyên tử có:',
        options: ['Cùng A, khác Z', 'Cùng Z, khác A', 'Khác Z, khác A', 'Cùng số n, khác Z'],
        correctAnswer: 1,
        explanation: 'Đồng vị: cùng số proton (Z), khác số n → khác A.',
        points: 10
      },
      {
        type: 'multiple-choice',
        question: 'Với ^{56}_{26}Fe, tỉ lệ n/p xấp xỉ?',
        options: ['1,00', '1,15', '1,50', '2,00'],
        correctAnswer: 1,
        explanation: 'n = 30, p = 26 → n/p ≈ 30/26 ≈ 1,15.',
        points: 10
      },
      {
        type: 'fill-in-blank',
        question: 'Electron có điện tích ______ và khối lượng rất nhỏ so với proton.',
        correctAnswer: 'âm',
        explanation: 'Electron mang điện tích âm -1e.',
        points: 10
      }
    ],
    advanced: [
      {
        type: 'multiple-choice',
        question: 'Hạt nhân ^{14}_{7}N biến đổi thành ^{14}_{6}C qua quá trình?',
        options: ['Bức xạ alpha', 'Bức xạ beta trừ (β−)', 'Bức xạ gamma', 'Bức xạ beta cộng (β+) hoặc bắt e'],
        correctAnswer: 3,
        explanation: 'Giảm Z từ 7 xuống 6 cần biến p → n, đặc trưng cho phân rã β+ hoặc bắt electron (EC).',
        hint: 'β+ làm Z giảm 1; β− làm Z tăng 1.',
        points: 10
      },
      {
        type: 'multiple-choice',
        question: 'Tổng khối lượng hạt p+n trong ^{35}_{17}Cl (đơn vị u) xấp xỉ:',
        options: ['17u', '35u', '52u', '70u'],
        correctAnswer: 1,
        explanation: 'A ≈ số nuclôn = 35u.',
        points: 10
      },
      {
        type: 'true-false',
        question: 'Tỉ lệ n/p ảnh hưởng đến độ bền hạt nhân.',
        correctAnswer: true,
        explanation: 'n/p phù hợp giúp cân bằng lực hút-hạt nhân; lệch nhiều dễ phóng xạ.',
        points: 10
      }
    ]
  }
};
