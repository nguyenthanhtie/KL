module.exports = {
  classId: 11,
  curriculumType: 'ketnoi',
  chapterId: 2,
  chapterName: 'Chương 2: Nitrogen - sulfur',
  lessonId: 6,
  title: 'Bài 6: Một số hợp chất của nitrogen với oxygen',
  description: 'NO, NO2, N2O, N2O5: cấu tạo, tính oxi hoá/khử, điều chế, ứng dụng.',
  level: 'Intermediate',
  order: 6,
  theoryModules: [
    {
        id: 'mod-1',
        type: 'heading',
        content: {
            text: 'Hợp chất nitrogen - oxygen',
            level: 'h2'
        }
    },
    {
        id: 'mod-2',
        type: 'paragraph',
        content: {
            text: 'So sánh cấu tạo, hoá trị, tính oxi hoá/khử và các phản ứng quan trọng của dãy oxit nitrogen.'
        }
    },
    {
        id: 'mod-3',
        type: 'infoBox',
        content: {
            title: 'NO (nitric oxide)',
            content: 'Khí không màu, tan ít; hoá nâu ngoài không khí do oxi hoá: 2NO + O2 → 2NO2.\nCấu tạo: phân tử có electron lẻ (gốc tự do) → hoạt động.\nTính khử nhẹ: 3Cu + 8HNO3(loãng) → 3Cu(NO3)2 + 2NO↑ + 4H2O.',
            color: 'gray',
            listType: 'bullet'
        }
    },
    {
        id: 'mod-4',
        type: 'warningBox',
        content: {
            title: 'NO2 / N2O4',
            content: 'NO2: khí nâu đỏ, mùi hắc; dimer hoá thuận nghịch: 2NO2 ⇌ N2O4 (khí không màu, ưu thế ở nhiệt độ thấp).\nTính oxi hoá mạnh, đồng thời có tính axit: NO2 + H2O + O2 → 2HNO3.\nTrong phòng thí nghiệm tạo từ Cu + HNO3 đặc; công nghiệp: từ oxi hoá xúc tác NH3 (quá trình Ostwald).',
            color: 'orange',
            listType: 'bullet'
        }
    },
    {
        id: 'mod-5',
        type: 'infoBox',
        content: {
            title: 'N2O (dinitrogen monoxide)',
            content: 'Khí không màu, vị ngọt, gây mê nhẹ ("khí cười").\nOxi hoá ở nhiệt độ cao: 2N2O + O2 → 2N2 + 2O2 (phân huỷ) hoặc O2 cung cấp cho đốt nhiên liệu.\nĐiều chế: đun nóng (NH4)2NO3 cẩn thận: (NH4)2NO3 → N2O + 2H2O (tránh quá nhiệt gây nổ).',
            color: 'gray',
            listType: 'bullet'
        }
    },
    {
        id: 'mod-6',
        type: 'infoBox',
        content: {
            title: 'N2O5 (dinitrogen pentoxide)',
            content: 'Rắn trắng, hút ẩm, là anhiđrit axit của HNO3: N2O5 + H2O → 2HNO3.\nTính oxi hoá rất mạnh; không bền nhiệt, phân huỷ tạo NO2 và O2.\nDùng sản xuất HNO3 khan, thuốc tẩy trắng; xử lí phải khô ráo, mát.',
            color: 'purple',
            listType: 'bullet'
        }
    },
    {
        id: 'mod-7',
        type: 'infoBox',
        content: {
            title: 'Chuỗi phản ứng - sản xuất HNO3 (Ostwald)',
            content: '4NH3 + 5O2 (Pt, 800°C) → 4NO + 6H2O.\n2NO + O2 → 2NO2.\n4NO2 + O2 + 2H2O → 4HNO3.\nNO tái sinh trong hấp thụ, quay lại oxi hoá → tăng hiệu suất.',
            color: 'blue',
            listType: 'number'
        }
    },
    {
        id: 'mod-8',
        type: 'infoBox',
        content: {
            title: 'An toàn & môi trường',
            content: 'NO2 độc, gây kích ứng phổi; thao tác trong tủ hút, tránh hít phải.\nNOx là tiền chất mưa axit, sương mù quang hoá; cần kiểm soát khí thải (SCR, hấp thụ HNO3).\nN2O là khí nhà kính mạnh; hạn chế rò rỉ trong y tế và công nghiệp.',
            color: 'blue',
            listType: 'bullet'
        }
    }
  ],
  game: [
    {
      type: 'multiple-choice',
      question: 'Phản ứng làm NO hoá nâu ngoài không khí là:',
      options: ['2NO + O2 → 2NO2', 'NO + H2O → HNO2', 'NO + Cl2 → NOCl', '2NO → N2 + O2'],
      correctAnswer: 0,
      explanation: 'NO bị oxi hoá chậm bởi O2 thành NO2 màu nâu đỏ.',
      points: 10
    },
    {
      type: 'multiple-choice',
      question: 'Ở nhiệt độ thấp, NO2 chuyển một phần thành:',
      options: ['N2O', 'N2O4', 'NO', 'N2O5'],
      correctAnswer: 1,
      explanation: '2NO2 ⇌ N2O4, cân bằng chuyển phải khi hạ nhiệt độ.',
      points: 10
    },
    {
      type: 'true-false',
      question: 'N2O được gọi là khí cười và có thể gây mê nhẹ.',
      correctAnswer: true,
      explanation: 'N2O không màu, vị ngọt, dùng liều nhỏ gây cảm giác hưng phấn/gây mê.',
      points: 10
    },
    {
      type: 'multiple-choice',
      question: 'Anhiđrit axit của HNO3 là:',
      options: ['NO', 'N2O', 'N2O5', 'NO2'],
      correctAnswer: 2,
      explanation: 'N2O5 + H2O → 2HNO3, nên N2O5 là anhiđrit của HNO3.',
      points: 10
    },
    {
      type: 'multiple-choice',
      question: 'Bước đầu của quá trình Ostwald oxi hoá NH3 tạo:',
      options: ['NO', 'NO2', 'N2O', 'N2O5'],
      correctAnswer: 0,
      explanation: '4NH3 + 5O2 (Pt, 800°C) → 4NO + 6H2O.',
      points: 10
    },
    {
      type: 'true-false',
      question: 'NO2 là chất khử mạnh hơn NO.',
      correctAnswer: false,
      explanation: 'NO2 chủ yếu thể hiện tính oxi hoá; NO thiên về tính khử nhẹ.',
      points: 10
    },
    {
      type: 'multiple-choice',
      question: 'Tính chất nào đúng với N2O5?',
      options: ['Bền nhiệt cao', 'Tính oxi hoá mạnh, hút ẩm', 'Tạo kết tủa với BaCl2', 'Là khí nâu đỏ'],
      correctAnswer: 1,
      explanation: 'N2O5 hút ẩm, oxi hoá mạnh, phân huỷ khi đun nóng.',
      points: 10
    },
    {
      type: 'multiple-choice',
      question: 'Khi hấp thụ NO2 vào nước có oxi, sản phẩm chính là:',
      options: ['HNO2', 'HNO3', 'NH4NO3', 'N2O'],
      correctAnswer: 1,
      explanation: '4NO2 + O2 + 2H2O → 4HNO3.',
      points: 10
    },
    {
      type: 'true-false',
      question: 'N2O phát thải là một nguyên nhân gây hiệu ứng nhà kính mạnh.',
      correctAnswer: true,
      explanation: 'N2O có hệ số gây ấm cao hơn CO2 nhiều lần.',
      points: 10
    },
    {
      type: 'fill-in-blank',
      question: 'Phương trình dimer hoá: 2NO2 ⇌ ______',
      correctAnswer: 'N2O4',
      explanation: 'NO2 dimer hoá thuận nghịch tạo N2O4 không màu.',
      points: 10
    }
  ]
};
