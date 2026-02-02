module.exports = {
  classId: 10,
  curriculumType: 'ketnoi',
  chapterId: 2,
  chapterName: 'Chương 2: Bảng tuần hoàn các nguyên tố hóa học và định luật tuần hoàn',
  lessonId: 5,
  title: 'Bài 5: Cấu tạo của bảng tuần hoàn các nguyên tố hóa học',
  description: 'Khối, chu kỳ, nhóm; cách sắp xếp theo Z tăng dần và ý nghĩa cấu hình e.',
  level: 'Beginner',
  order: 1,
  theoryModules: [
    {
        id: 'mod-1',
        type: 'heading',
        content: {
            text: 'Cấu tạo bảng tuần hoàn',
            level: 'h2'
        }
    },
    {
        id: 'mod-2',
        type: 'paragraph',
        content: {
            text: 'Mục tiêu: hiểu cách sắp xếp theo Z, nhận diện chu kỳ/nhóm/khối, suy luận cấu hình e và xu hướng tính chất.'
        }
    },
    {
        id: 'mod-3',
        type: 'infoBox',
        content: {
            title: 'Nguyên tắc sắp xếp',
            content: 'Sắp theo số hiệu nguyên tử Z tăng dần (không còn xếp theo khối lượng như Mendeleev).\nCấu hình e lớp ngoài lặp lại tuần hoàn → tính chất tuần hoàn.\nChu kỳ ngắn (1-3) có 2, 8, 8 nguyên tố; chu kỳ dài (4-7) có 18 hoặc 32 (do xen khối d, f).',
            color: 'gray',
            listType: 'bullet'
        }
    },
    {
        id: 'mod-4',
        type: 'warningBox',
        content: {
            title: 'Chu kỳ & nhóm',
            content: 'Chu kỳ = số lớp e đã điền (giá trị n lớn nhất có e).\nNhóm A: số e hoá trị = số thứ tự nhóm (1-8); nhóm B (khối d) có e ngoài cùng (n-1)d và ns.\nTrong nhóm: cấu hình ngoài cùng giống nhau → hoá tính tương tự.',
            color: 'orange',
            listType: 'bullet'
        }
    },
    {
        id: 'mod-5',
        type: 'infoBox',
        content: {
            title: 'Các khối',
            content: 'Khối s (ns1-2), p (ns2 np1-6), d (n-1)d1-10 ns0-2, f (n-2)f1-14... → hỗ trợ dự đoán tính kim loại/phi kim và hoá trị phổ biến.',
            color: 'blue',
            listType: 'bullet'
        }
    },
    {
        id: 'mod-6',
        type: 'infoBox',
        content: {
            title: 'Dùng vị trí để suy ra',
            content: 'Chu kỳ → số lớp e; nhóm A → số e hoá trị → số oxi hoá cao nhất.\nVị trí khối → kiểu liên kết và mức độ kim loại/phi kim.\nTừ nhóm/chu kỳ suy ra tính axit-bazơ của oxit/hiđroxit.',
            color: 'purple',
            listType: 'bullet'
        }
    },
    {
        id: 'mod-7',
        type: 'infoBox',
        content: {
            title: 'Tránh nhầm lẫn',
            content: 'Không dùng A (số khối) để xác định vị trí; chỉ dùng Z và cấu hình e.\nKhối d bắt đầu ở chu kỳ 4 (Sc), khối f ở chu kỳ 6 (La/Ac).\nNhóm B không lấy số thứ tự nhóm làm số e hoá trị trực tiếp.',
            color: 'gray',
            listType: 'bullet'
        }
    }
  ],
  game: [
    {
      type: 'multiple-choice',
      question: 'Cơ sở sắp xếp các nguyên tố trong bảng tuần hoàn là?',
      options: ['Khối lượng nguyên tử tăng', 'Số proton tăng', 'Số nơtron tăng', 'Độ âm điện tăng'],
      correctAnswer: 1,
      explanation: 'BTH sắp theo số hiệu nguyên tử Z (số proton) tăng.'
    },
    {
      type: 'multiple-choice',
      question: 'Nguyên tố thuộc nhóm A có đặc điểm chung?',
      options: ['Cùng số lớp e', 'Cùng số e hoá trị', 'Cùng khối lượng mol', 'Cùng độ âm điện'],
      correctAnswer: 1,
      explanation: 'Nhóm A: số electron lớp ngoài cùng bằng số thứ tự nhóm.'
    },
    {
      type: 'true-false',
      question: 'Khối d gồm các nguyên tố có e cuối cùng vào phân lớp d.',
      correctAnswer: true,
      explanation: 'Đúng, đó là các nguyên tố chuyển tiếp.'
    }
  ]
};
