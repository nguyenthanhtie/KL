module.exports = {
  classId: 12,
  curriculumType: 'ketnoi',
  chapterId: 5,
  chapterName: 'Chương 5: Pin điện và điện phân',
  lessonId: 15,
  title: 'Bài 15: Thế điện cực và nguồn điện hoá học',
  description: 'Thế điện cực chuẩn, pin Galvani, suất điện động, ứng dụng tính toán.',
  level: 'Intermediate',
  order: 15,
  theoryModules: [
    {
        id: 'mod-1',
        type: 'heading',
        content: {
            text: 'Thế điện cực và nguồn điện hoá học',
            level: 'h2'
        }
    },
    {
        id: 'mod-2',
        type: 'paragraph',
        content: {
            text: 'Nắm cách sắp xếp dãy điện hoá, xác định chiều dòng electron, tính suất điện động và liên hệ năng lượng.'
        }
    },
    {
        id: 'mod-3',
        type: 'infoBox',
        content: {
            title: 'Thế điện cực',
            content: 'E° đo so với điện cực hydro chuẩn (SHE = 0 V).\nCặp oxi hoá/khử viết dạng oxi hoá/khử; E° càng lớn càng dễ khử.\nChiều tự phát: điện cực có E° lớn hơn đóng vai trò catot (bị khử).',
            color: 'gray',
            listType: 'bullet'
        }
    },
    {
        id: 'mod-4',
        type: 'infoBox',
        content: {
            title: 'Pin Galvani',
            content: 'Suất điện động: E = E°₍catot₎ - E°₍anot₎ (hiệu thế chuẩn).\nAnot: oxi hoá, catot: khử; electron chạy từ anot → catot qua mạch ngoài.\nVí dụ: Pin Daniell (Zn/Cu); pin khô Leclanché; pin nhiên liệu H2/O2.',
            color: 'blue',
            listType: 'bullet'
        }
    },
    {
        id: 'mod-5',
        type: 'infoBox',
        content: {
            title: 'Nhiệt động & ứng dụng',
            content: 'Liên hệ: ΔG° = -nFE°, K = 10^(nE°/0.059) ở 25°C.\nỨng dụng đo pH, cảm biến ion, mạ điện (ngược lại pin: điện phân).\nTính toán: suất điện động thực dùng phương trình Nernst khi [ion] ≠ 1 M.',
            color: 'gray',
            listType: 'bullet'
        }
    },
    {
        id: 'mod-6',
        type: 'infoBox',
        content: {
            title: 'Sơ đồ nhớ nhanh',
            content: 'E° lớn → dễ khử → catot; E° nhỏ → dễ oxi hoá → anot.\nE°pin = E°(catot) - E°(anot); ΔG° = -nFE°; K liên hệ E° qua Nernst.\nDòng e chạy ngoài: anot → catot; dòng ion trong dung dịch/bắc cầu muối cân bằng điện tích.',
            color: 'purple',
            listType: 'bullet'
        }
    },
    {
        id: 'mod-7',
        type: 'infoBox',
        content: {
            title: 'Case & mẹo',
            content: 'Đề bài đổi nồng độ: dùng Nernst; nếu ion catot giảm → Ecatot giảm; nếu ion anot giảm → |Eanot| giảm.\nPin tập thể dục: nhớ “ANOT mòn” (oxi hoá kim loại) với pin kim loại hoạt động; kiểm tra phương trình để khẳng định.\nKhi ghép pin: tăng [ion catot] hoặc giảm [ion anot] để tăng E (theo Nernst).',
            color: 'blue',
            listType: 'bullet'
        }
    },
    {
        id: 'mod-8',
        type: 'infoBox',
        content: {
            title: 'Ôn bài tập',
            content: 'Tính E thực: E = E° - (0.059/n)logQ; xác định Q đúng chiều phản ứng viết.\nChuyển đổi ΔG, K, E: ΔG° = -nFE°; K = 10^{nE°/0.059} (25°C); chọn n (mol e chuyển).\nViết sơ đồ pin đầy đủ: anot | ion anot || ion catot | catot, kèm cầu muối.',
            color: 'gray',
            listType: 'bullet'
        }
    }
  ],
  game: [
    {
      type: 'multiple-choice',
      question: 'Trong pin Galvani, anot là điện cực xảy ra:',
      options: ['Khử', 'Oxi hoá', 'Không phản ứng', 'Cả khử và oxi hoá'],
      correctAnswer: 1,
      explanation: 'Anot oxi hoá, catot khử.',
      points: 10
    },
    {
      type: 'multiple-choice',
      question: 'Suất điện động chuẩn E°pin =',
      options: ['E°anot - E°catot', 'E°catot - E°anot', 'E°catot + E°anot', 'E°anot / E°catot'],
      correctAnswer: 1,
      explanation: 'Lấy thế chuẩn của cực khử trừ cực oxi hoá.',
      points: 10
    },
    {
      type: 'true-false',
      question: 'Pin Daniell sử dụng điện cực Zn/Zn2+ và Cu/Cu2+.',
      correctAnswer: true,
      explanation: 'Zn là anot, Cu là catot.',
      points: 10
    },
    {
      type: 'multiple-choice',
      question: 'Nếu E°Cu2+/Cu = +0.34 V và E°Ag+/Ag = +0.80 V, trong pin Cu-Ag catot là:',
      options: ['Cu', 'Ag', 'Cả hai', 'Không xác định'],
      correctAnswer: 1,
      explanation: 'Ag có E° lớn hơn → bị khử → catot.',
      points: 10
    },
    {
      type: 'multiple-choice',
      question: 'Liên hệ ΔG° và E° đúng:',
      options: ['ΔG° = nFE°', 'ΔG° = -nFE°', 'ΔG° = E°/nF', 'ΔG° = RT ln E°'],
      correctAnswer: 1,
      explanation: 'ΔG° = -nFE° (J).',
      points: 10
    },
    {
      type: 'true-false',
      question: 'Electron trong pin Galvani di chuyển qua dung dịch.',
      correctAnswer: false,
      explanation: 'Electron đi trong dây dẫn; ion di chuyển trong dung dịch/bắc cầu muối.',
      points: 10
    },
    {
      type: 'multiple-choice',
      question: 'Bắc cầu muối có vai trò:',
      options: ['Cung cấp electron', 'Hoàn mạch ion, giữ trung hoà điện tích', 'Tăng E°', 'Sinh khí'],
      correctAnswer: 1,
      explanation: 'Ion trong cầu muối cân bằng điện tích hai nửa pin.',
      points: 10
    },
    {
      type: 'fill-in-blank',
      question: 'Phương trình Nernst: E = E° - (0.059/n) log ______.',
      correctAnswer: 'Q',
      explanation: 'E phụ thuộc thương số phản ứng Q.',
      points: 10
    },
    {
      type: 'multiple-choice',
      question: 'Pin nhiên liệu H2/O2 sản phẩm chính là:',
      options: ['CO2', 'H2O', 'H2O2', 'CH4'],
      correctAnswer: 1,
      explanation: 'H2 bị oxi hoá, O2 bị khử → H2O.',
      points: 10
    },
    {
      type: 'true-false',
      question: 'E° càng lớn, phản ứng càng tự phát theo chiều được viết (oxy hóa → khử).',
      correctAnswer: true,
      explanation: 'E° dương → ΔG° âm.',
      points: 10
    }
  ]
};