module.exports = {
  classId: 12,
  curriculumType: 'ketnoi',
  chapterId: 3,
  chapterName: 'Chương 3: Hợp chất chứa nitrogen',
  lessonId: 9,
  title: 'Bài 9: Amino acid và peptide',
  description: 'Cấu tạo lưỡng tính, điểm đẳng điện, phản ứng tạo muối/este, hình thành peptide.',
  level: 'Intermediate',
  order: 9,
  theoryModules: [
    {
        id: 'mod-1',
        type: 'heading',
        content: {
            text: 'Amino acid và peptide',
            level: 'h2'
        }
    },
    {
        id: 'mod-2',
        type: 'paragraph',
        content: {
            text: 'Khám phá tính lưỡng tính, điểm đẳng điện của amino acid và liên kết peptide tạo nên protein.'
        }
    },
    {
        id: 'mod-3',
        type: 'infoBox',
        content: {
            title: 'Cấu tạo & tính lưỡng tính',
            content: 'Chứa -NH2 và -COOH trên cùng mạch → tồn tại dạng ion lưỡng cực ⁽+⁾H3N-CHR-COO⁽-⁾.\nĐiểm đẳng điện (pI): pH tại đó amino acid có điện tích tổng bằng 0, ít tan, dễ kết tinh.\nDanh pháp: alpha-amino acid (gly, ala, val...); góc quay quang học (trừ gly) do C*.',
            color: 'gray',
            listType: 'bullet'
        }
    },
    {
        id: 'mod-4',
        type: 'infoBox',
        content: {
            title: 'Phản ứng đặc trưng',
            content: 'Tạo muối với axit/bazơ; tạo este (-COOH) với ancol/H₍2₎SO₍4₎ đặc.\nPhản ứng ninhydrin → màu tím (trừ proline cho vàng) dùng định tính/định lượng.\nLiên kết peptide: -CO-NH- giữa nhóm -COOH và -NH2; đầu N (N-terminus) và đầu C.',
            color: 'blue',
            listType: 'bullet'
        }
    },
    {
        id: 'mod-5',
        type: 'infoBox',
        content: {
            title: 'Peptide & sinh học',
            content: 'Dipeptide/tripeptide đặt tên từ trái sang phải: glycyl-alanine...\nThuỷ phân: axit/bazơ/enzyme → giải phóng amino acid; thử biuret (+) nếu ≥2 liên kết peptide.\nPeptide hormone nhỏ: oxytocin, vasopressin; thuốc: aspartam (chất ngọt).',
            color: 'gray',
            listType: 'bullet'
        }
    },
    {
        id: 'mod-6',
        type: 'infoBox',
        content: {
            title: 'So sánh & ghi nhớ',
            content: 'Dạng tồn tại: pH pI → anion.\nBiuret (+) khi ≥2 liên kết peptide; Ninhydrin tím (trừ Pro vàng).\nPeptide đặt tên: đầu N đọc trước, hậu tố -yl cho tất cả trừ amino acid cuối.',
            color: 'purple',
            listType: 'bullet'
        }
    },
    {
        id: 'mod-7',
        type: 'infoBox',
        content: {
            title: 'Case & ứng dụng',
            content: 'Điện di: ở pH = pI peptide đứng yên; pH > pI → chạy về cực dương.\nBảo quản amino acid dạng muối (HCl) để ổn định và tan tốt.\nChất ngọt aspartam: dipeptide, nên tránh nhiệt cao để không phân huỷ mất vị.',
            color: 'blue',
            listType: 'bullet'
        }
    },
    {
        id: 'mod-8',
        type: 'infoBox',
        content: {
            title: 'Ôn bài tập',
            content: 'Tính pI amino acid trung tính: (pKa1 + pKa2)/2; amino acid có nhóm ion hoá bên cạnh cần cân nhắc thêm.\nThuỷ phân peptide: xác định số mol liên kết = số mol nước tiêu thụ; đếm số mắt xích = số liên kết + 1.\nĐặt tên dipeptide cụ thể, xác định đầu N/C và viết trình tự đúng hướng.',
            color: 'gray',
            listType: 'bullet'
        }
    }
  ],
  game: [
    {
      type: 'multiple-choice',
      question: 'Dạng chủ yếu của amino acid trong nước gần pH trung tính là:',
      options: ['Phân tử không ion', 'Ion lưỡng cực +H3N-CHR-COO-', 'Ion âm', 'Ion dương'],
      correctAnswer: 1,
      explanation: 'Tồn tại dạng zwitterion nên tan tốt, nhiệt độ nóng chảy cao.',
      points: 10
    },
    {
      type: 'multiple-choice',
      question: 'Phản ứng tạo màu tím với ninhydrin dùng để phát hiện:',
      options: ['Axit béo', 'Amino acid/peptide', 'Ester', 'Ancol'],
      correctAnswer: 1,
      explanation: 'Ninhydrin phản ứng với nhóm -NH2 α cho màu tím.',
      points: 10
    },
    {
      type: 'true-false',
      question: 'Liên kết peptide là liên kết -CO-NH-.',
      correctAnswer: true,
      explanation: 'Hình thành giữa -COOH của acid amin này và -NH2 của acid amin kia.',
      points: 10
    },
    {
      type: 'multiple-choice',
      question: 'Điểm đẳng điện (pI) là pH tại đó:',
      options: ['Amino acid tan mạnh nhất', 'Amino acid có tổng điện tích 0', 'Amino acid bị phân huỷ', 'Amino acid không phản ứng'],
      correctAnswer: 1,
      explanation: 'pI → dạng lưỡng cực, ít di chuyển trong điện trường.',
      points: 10
    },
    {
      type: 'multiple-choice',
      question: 'Tên gọi của dipeptide gồm glycine và alanine với đầu N là glycine:',
      options: ['Glycylalanine', 'Alanylglycine', 'Glycylglycine', 'Alanylalanine'],
      correctAnswer: 0,
      explanation: 'Đầu N đặt trước trong tên dipeptide.',
      points: 10
    },
    {
      type: 'true-false',
      question: 'Amino acid có thể vừa phản ứng với HCl vừa với NaOH.',
      correctAnswer: true,
      explanation: 'Do tính lưỡng tính, tạo muối amoni hoặc muối carboxylat.',
      points: 10
    },
    {
      type: 'multiple-choice',
      question: 'Aspartam (chất ngọt) là dipeptide của:',
      options: ['Aspartic acid và phenylalanine', 'Glycine và alanine', 'Glutamic acid và lysine', 'Serine và threonine'],
      correctAnswer: 0,
      explanation: 'Aspartam = L-Asp-L-Phe methyl ester.',
      points: 10
    },
    {
      type: 'fill-in-blank',
      question: 'Thử biuret dương tính khi phân tử có từ ___ liên kết peptide trở lên.',
      correctAnswer: '2',
      explanation: 'Cần ít nhất 2 liên kết peptide (tripeptide).',
      points: 10
    },
    {
      type: 'multiple-choice',
      question: 'Sản phẩm este hoá alanine với CH3OH/H2SO4 đặc:',
      options: ['Alanine metyl este hydrochloride', 'Alanine ethyl ester', 'Axit lactic', 'Anhydrit alanin'],
      correctAnswer: 0,
      explanation: '-COOH este hoá; -NH2 bị proton hoá thành muối.',
      points: 10
    },
    {
      type: 'true-false',
      question: 'Glycine không quay mặt phẳng ánh sáng phân cực.',
      correctAnswer: true,
      explanation: 'Gly không có C bất đối (R=H).',
      points: 10
    }
  ]
};
