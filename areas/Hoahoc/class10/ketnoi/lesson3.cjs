module.exports = {
  classId: 10,
  curriculumType: 'ketnoi',
  chapterId: 1,
  chapterName: 'Chương 1: Cấu tạo nguyên tử',
  lessonId: 3,
  title: 'Bài 3: Cấu trúc lớp vỏ electron nguyên tử',
  description: 'Phân bố electron theo lớp/phân lớp và ba nguyên tắc Aufbau - Pauli - Hund.',
  level: 'Beginner',
  order: 3,
  theoryModules: [
    {
        id: 'mod-1',
        type: 'heading',
        content: {
            text: 'Cấu trúc lớp vỏ electron',
            level: 'h2'
        }
    },
    {
        id: 'mod-2',
        type: 'infoBox',
        content: {
            title: 'Lớp & phân lớp',
            content: 'Sức chứa lớp n: 2n^2 e.\nPhân lớp: s(2), p(6), d(10), f(14); số obitan: s(1), p(3), d(5), f(7).\nThứ tự năng lượng: 1s < 2s < 2p < 3s < 3p < 4s < 3d < 4p < 5s ...',
            color: 'gray',
            listType: 'bullet'
        }
    },
    {
        id: 'mod-3',
        type: 'warningBox',
        content: {
            title: 'Ba nguyên tắc',
            content: 'Aufbau: điền từ mức năng lượng thấp → cao.\nPauli: mỗi obitan tối đa 2e, spin ngược.\nHund: obitan suy biến điền e đơn với spin song song trước.',
            color: 'orange',
            listType: 'bullet'
        }
    },
    {
        id: 'mod-4',
        type: 'infoBox',
        content: {
            title: 'Ví dụ cấu hình',
            content: 'O (Z=8): 1s^2 2s^2 2p^4. Na (Z=11): 1s^2 2s^2 2p^6 3s^1.',
            color: 'blue',
            listType: 'bullet'
        }
    },
    {
        id: 'mod-5',
        type: 'infoBox',
        content: {
            title: 'Số lượng tử (tóm tắt)',
            content: 'n: số lớp chính (1,2,3,...).\nl: dạng obitan (0=s, 1=p, 2=d, 3=f).\nm: định hướng obitan (từ -l đến +l).\nms: spin (+1/2 hoặc -1/2).',
            color: 'purple',
            listType: 'bullet'
        }
    },
    {
        id: 'mod-6',
        type: 'infoBox',
        content: {
            title: 'Mẹo viết cấu hình',
            content: 'Điền theo thứ tự năng lượng (sơ đồ chéo 1s → 7p).\nKiểm tổng e = Z; nếu ion: điều chỉnh e.\nViết rút gọn theo khí hiếm gần nhất: [Ne], [Ar]...\nNgoại lệ thường gặp: Cr ([Ar] 3d5 4s1), Cu ([Ar] 3d10 4s1).',
            color: 'gray',
            listType: 'number'
        }
    },
    {
        id: 'mod-7',
        type: 'warningBox',
        content: {
            title: 'Liên hệ nhóm/chu kì',
            content: 'Chu kì = số lớp e đã điền (giá trị n lớn nhất có e).\nNhóm chính (A): số e hoá trị = tổng e lớp ngoài cùng (ns, np).\nHóa tính: nhiều e hoá trị → phi kim; ít e hoá trị → kim loại.',
            color: 'orange',
            listType: 'bullet'
        }
    }
  ],
  game: [
    {
      type: 'multiple-choice',
      question: 'Phân lớp p tối đa chứa bao nhiêu electron?',
      options: ['2', '4', '6', '10'],
      correctAnswer: 2,
      explanation: 'Phân lớp p gồm 3 obitan, tối đa 6 electron.',
      points: 10
    },
    {
      type: 'multiple-choice',
      question: 'Quy tắc Hund mô tả điều gì?',
      options: [
        'Điền electron theo mức năng lượng thấp trước',
        'Mỗi obitan tối đa 2e spin ngược',
        'Các obitan cùng mức được điền electron đơn với spin song song trước',
        'Tổng số electron bằng số proton'
      ],
      correctAnswer: 2,
      explanation: 'Hund: điền electron đơn vào obitan suy biến trước khi ghép đôi.',
      points: 10
    },
    {
      type: 'true-false',
      question: 'Cấu hình electron của O: 1s2 2s2 2p4.',
      correctAnswer: true,
      explanation: 'Z=8 → 1s^2 2s^2 2p^4 đúng theo Aufbau.',
      points: 10
    },
    {
      type: 'multiple-choice',
      question: 'Thứ tự năng lượng đúng của các phân lớp đầu tiên là:',
      options: ['1s < 2s < 2p < 3s < 3p < 3d < 4s', '1s < 2p < 2s < 3p < 3s', '1s < 2s < 3s < 2p < 3p', '1s < 3s < 2p < 3p < 4s'],
      correctAnswer: 0,
      explanation: 'Tuân thứ tự Aufbau phổ biến 1s 2s 2p 3s 3p 4s 3d...',
      points: 10
    },
    {
      type: 'multiple-choice',
      question: 'Nguyên tắc Pauli phát biểu:',
      options: ['Điền e vào mức năng lượng thấp trước', 'Obitan chứa tối đa 2e với spin ngược nhau', 'Điền e đơn vào obitan suy biến trước', 'Tổng số e bằng số p'],
      correctAnswer: 1,
      explanation: 'Không có hai electron trong một nguyên tử có cùng 4 số lượng tử.',
      points: 10
    },
    {
      type: 'multiple-choice',
      question: 'Cấu hình rút gọn của Na (Z=11) viết theo khí hiếm gần nhất:',
      options: ['[He]2s2 2p6 3s1', '[Ne]3s1', '[Ar]3s1', '[He]2s2 2p5 3s2'],
      correctAnswer: 1,
      explanation: 'Na sau Ne (Z=10) → [Ne]3s1.',
      points: 10
    },
    {
      type: 'multiple-choice',
      question: 'Số obitan có trong phân lớp d là:',
      options: ['1', '3', '5', '7'],
      correctAnswer: 2,
      explanation: 'Phân lớp d có 5 obitan, chứa tối đa 10e.',
      points: 10
    },
    {
      type: 'true-false',
      question: 'Nguyên tố có cấu hình ngoài cùng ns2 np1 thuộc nhóm IIIA.',
      correctAnswer: true,
      explanation: '3 electron hoá trị → nhóm 13 (IIIA).',
      points: 10
    },
    {
      type: 'multiple-choice',
      question: 'Cấu hình nào vi phạm quy tắc Hund?',
      options: ['2p6', '2p4 viết là ↑↓ ↑ ↑', '2p3 viết là ↑ ↑ ↑', '2p4 viết là ↑↓ ↑↓'],
      correctAnswer: 3,
      explanation: '2p4 phải điền đơn trước khi ghép đôi: ↑↓ ↑ ↑; viết cả hai cặp đôi sớm vi phạm Hund.',
      points: 10
    },
    {
      type: 'multiple-choice',
      question: 'Nguyên tử X có 16 electron. Cấu hình ngoài cùng là:',
      options: ['3s2 3p4', '3s2 3p5', '3s2 3p6', '2s2 2p6'],
      correctAnswer: 0,
      explanation: 'Z=16 (S) → ...3s2 3p4.',
      points: 10
    }
  ]
};
