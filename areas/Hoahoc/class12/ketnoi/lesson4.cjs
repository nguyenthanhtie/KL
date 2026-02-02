module.exports = {
  classId: 12,
  curriculumType: 'ketnoi',
  chapterId: 2,
  chapterName: 'Chương 2: Carbohydrate',
  lessonId: 4,
  title: 'Bài 4: Giới thiệu carbohydrate. Glucose và fructose',
  description: 'Cấu tạo, tính chất hoá học cơ bản của glucose, fructose; thử Tollens/Fehling.',
  level: 'Intermediate',
  order: 4,
  theoryModules: [
    {
        id: 'mod-1',
        type: 'heading',
        content: {
            text: 'Glucose và fructose',
            level: 'h2'
        }
    },
    {
        id: 'mod-2',
        type: 'paragraph',
        content: {
            text: 'Hai monosaccharide quan trọng: nguồn năng lượng, chất khử, tham gia nhiều phản ứng đặc trưng của nhóm carbonyl và polyol.'
        }
    },
    {
        id: 'mod-3',
        type: 'infoBox',
        content: {
            title: 'Cấu trúc & dạng tồn tại',
            content: 'Glucose: aldose C6H12O6; tồn tại mạch hở và vòng pyranose (α/β-glucose).\nFructose: ketohexose; vòng furanose chủ yếu; có thể chuyển hoá kiềm → enediol → glucose.\nNhiều nhóm -OH tạo liên kết H → tan mạnh trong nước, vị ngọt.',
            color: 'gray',
            listType: 'bullet'
        }
    },
    {
        id: 'mod-4',
        type: 'infoBox',
        content: {
            title: 'Tính chất hoá học',
            content: 'Tính khử: tráng bạc, Fehling (glucose trực tiếp; fructose sau đồng phân hoá trong kiềm).\nOxi hoá: Br₍2₎ nước → gluconic; HNO3 → glucozic (mất hai đầu).\nKhử: NaBH4/H2 → sobitol (sorbitol) từ glucose; manitol từ fructose.\nPhản ứng với anhidric axetic: tạo este penta-/hexa-acetat (chứng minh có nhiều -OH).',
            color: 'blue',
            listType: 'bullet'
        }
    },
    {
        id: 'mod-5',
        type: 'infoBox',
        content: {
            title: 'Sinh học & công nghệ',
            content: 'Lên men: nấm men chuyển glucose → etanol + CO2; lên men lactic trong cơ.\nỨng dụng fructose (HFCS) làm chất tạo ngọt; kiểm soát sức khoẻ (GI thấp hơn glucose).\nĐịnh tính định lượng: phản ứng Molisch, Barfoed, thuốc thử Tollens/Fehling.',
            color: 'gray',
            listType: 'bullet'
        }
    },
    {
        id: 'mod-6',
        type: 'infoBox',
        content: {
            title: 'Nhận biết nhanh',
            content: 'Molisch: vòng hoa tím → mọi carbohydrate; Barfoed: monosaccharide khử nhanh hơn disaccharide.\nCu(OH)2 ở nhiệt độ thường: tạo dung dịch xanh lam chứng tỏ nhiều -OH liền kề (đa polyol).\nTollens/Fehling: glucose (+), fructose (+) sau đồng phân hoá; saccharose (-) nếu không thuỷ phân.',
            color: 'purple',
            listType: 'bullet'
        }
    },
    {
        id: 'mod-7',
        type: 'infoBox',
        content: {
            title: 'Sức khoẻ & dinh dưỡng',
            content: 'Fructose ngọt hơn, GI thấp hơn → hấp thu chậm hơn glucose; nhưng dùng quá nhiều HFCS vẫn gây rối loạn chuyển hoá lipid.\nSorbitol dùng cho thực phẩm “không đường” nhưng có thể gây nhuận tràng nếu dùng nhiều.\nKiểm soát đường huyết: ưu tiên tinh bột hấp thu chậm; hạn chế dung nạp đường đơn nhanh.',
            color: 'blue',
            listType: 'bullet'
        }
    },
    {
        id: 'mod-8',
        type: 'infoBox',
        content: {
            title: 'Ôn bài tập',
            content: 'Tính hiệu suất lên men: bảo toàn C và khối lượng; chú ý khí CO2 thoát.\nBài tráng bạc: 1 mol glucose tạo 2 mol Ag; fructose trong kiềm → 2 Ag sau đồng phân hoá.\nTừ lượng HNO3 tiêu thụ khi oxi hoá hoàn toàn → suy số nhóm -CHO/-CH2OH bị oxi hoá thành -COOH.',
            color: 'gray',
            listType: 'bullet'
        }
    }
  ],
  game: [
    {
      type: 'multiple-choice',
      question: 'Trong môi trường kiềm, fructose có thể cho phản ứng tráng bạc vì:',
      options: ['Có nhóm -CHO sẵn', 'Đồng phân hoá thành glucose/aldose', 'Bị oxi hoá bởi kiềm', 'Do chứa nhóm -COOH'],
      correctAnswer: 1,
      explanation: 'Fructose chuyển thành enediol rồi thành glucose → tạo Ag gương.',
      points: 10
    },
    {
      type: 'multiple-choice',
      question: 'Sản phẩm khử hoàn toàn glucose bằng NaBH4 là:',
      options: ['Gluconic acid', 'Sorbitol', 'Gluconolacton', 'Mannitol'],
      correctAnswer: 1,
      explanation: 'NaBH4 khử nhóm -CHO → -CH2OH tạo sobitol (sorbitol).',
      points: 10
    },
    {
      type: 'true-false',
      question: 'Glucose tạo kết tủa Cu2O đỏ gạch với thuốc thử Fehling.',
      correctAnswer: true,
      explanation: 'Do tính khử của nhóm -CHO (aldose).',
      points: 10
    },
    {
      type: 'multiple-choice',
      question: 'Phản ứng chứng minh có 5 nhóm -OH trong glucose thường dùng:',
      options: ['Tollens', 'Ester hoá với anhidric axetic', 'Brom hóa', 'Nitr hoá'],
      correctAnswer: 1,
      explanation: 'Tạo penta-/hexa-axetat cho thấy nhiều nhóm -OH.',
      points: 10
    },
    {
      type: 'multiple-choice',
      question: 'Thuốc thử Barfoed phân biệt:',
      options: ['Monosaccharide khử và disaccharide khử', 'Aldose và ketose', 'Glucose và fructose', 'Tinh bột và xenlulozơ'],
      correctAnswer: 0,
      explanation: 'Monosaccharide khử Cu2+ nhanh hơn disaccharide khử.',
      points: 10
    },
    {
      type: 'true-false',
      question: 'Fructose ngọt hơn glucose.',
      correctAnswer: true,
      explanation: 'Fructose có độ ngọt cao hơn, dùng trong HFCS.',
      points: 10
    },
    {
      type: 'multiple-choice',
      question: 'Glucose tác dụng với Br2 nước tạo:',
      options: ['Gluconic acid', 'Gluconolacton', 'Sorbitol', 'CO2'],
      correctAnswer: 0,
      explanation: 'Br2 là chất oxi hoá nhẹ → axit gluconic (oxi hoá nhóm -CHO).',
      points: 10
    },
    {
      type: 'fill-in-blank',
      question: 'Phương trình lên men rượu: C6H12O6 → 2C2H5OH + 2_____',
      correctAnswer: 'CO2',
      explanation: 'Glucose lên men etylic cho ethanol và khí CO2.',
      points: 10
    },
    {
      type: 'multiple-choice',
      question: 'Dạng vòng chủ yếu của fructose trong dung dịch là:',
      options: ['Pyranose', 'Furanose', 'Cả hai như nhau', 'Không vòng'],
      correctAnswer: 1,
      explanation: 'Fructose ưu tiên tạo vòng 5 cạnh (furanose).',
      points: 10
    },
    {
      type: 'true-false',
      question: 'Glucose là chất rắn kết tinh, vị ngọt, dễ tan nước.',
      correctAnswer: true,
      explanation: 'Nhiều nhóm -OH tạo liên kết H với nước → tan tốt.',
      points: 10
    }
  ]
};
