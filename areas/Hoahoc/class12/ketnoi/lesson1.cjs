module.exports = {
  classId: 12,
  curriculumType: 'ketnoi',
  chapterId: 1,
  chapterName: 'Chương 1: Ester - lipid',
  lessonId: 1,
  title: 'Bài 1: Ester - lipid',
  description: 'Khái quát cấu tạo, tính chất, điều chế ester và lipid; liên hệ thực phẩm.',
  level: 'Intermediate',
  order: 1,
  theoryModules: [
    {
        id: 'mod-1',
        type: 'heading',
        content: {
            text: 'Ester và lipid',
            level: 'h2'
        }
    },
    {
        id: 'mod-2',
        type: 'paragraph',
        content: {
            text: 'Đào sâu cấu tạo, danh pháp, tính chất và ứng dụng của ester, lipid (trieste của glixerol) để hiểu hương liệu, xà phòng, trans-fat và bảo quản thực phẩm.'
        }
    },
    {
        id: 'mod-3',
        type: 'infoBox',
        content: {
            title: 'Cấu tạo & danh pháp',
            content: 'Ester: RCOOR\\\'; danh pháp: alkyl + anion axit (đổi -ic → -ate; axit Việt hoá: axetat, fomat...).\nLipid: trieste của glixerol với axit béo (mạch C15-C19); có thể chứa nối đôi cis (dầu lỏng).\nĐồng phân: vị trí nhóm COO, chiều dài và nhánh mạch alkyl/acy, tạo khác biệt mùi và nhiệt độ sôi.',
            color: 'gray',
            listType: 'bullet'
        }
    },
    {
        id: 'mod-4',
        type: 'warningBox',
        content: {
            title: 'Tính chất trọng tâm',
            content: 'Vật lí: mùi trái cây (este nhỏ), ít tan nước; T sôi tăng theo M, giảm khi phân nhánh.\nHoá học: thuỷ phân axit (thuận nghịch); xà phòng hoá kiềm một chiều → muối axit béo + ancol.\nHydro hoá nối đôi (dầu → mỡ); phản ứng cháy toả nhiệt lớn; LiAlH4 khử este → ancol.',
            color: 'orange',
            listType: 'bullet'
        }
    },
    {
        id: 'mod-5',
        type: 'infoBox',
        content: {
            title: 'Chỉ số & kiểm soát chất lượng',
            content: 'Chỉ số xà phòng hoá (mg KOH/1 g lipid) ∝ 1/độ dài mạch axit béo.\nChỉ số axit đo axit béo tự do (mức ôi thiu); chỉ số iot phản ánh mức độ không no (khả năng bị oxy hoá).\nVận dụng: chọn dầu ít không no cho chiên rán (giảm ôi thiu); kiểm tra chất lượng dầu/mỡ.',
            color: 'gray',
            listType: 'bullet'
        }
    },
    {
        id: 'mod-6',
        type: 'infoBox',
        content: {
            title: 'Phản ứng & quy trình công nghiệp',
            content: 'Xà phòng hoá: triglycerid + 3NaOH → 3RCOONa (xà phòng) + glixerol (tận dụng sản xuất dược).\nTransester hoá làm biodiesel: triglycerid + MeOH (NaOCH3) → methyl ester (nhiên liệu sinh học) + glixerol.\nHydro hoá từng phần → chuyển cis thành trans-fat (cần kiểm soát để hạn chế rủi ro sức khoẻ tim mạch).',
            color: 'purple',
            listType: 'bullet'
        }
    },
    {
        id: 'mod-7',
        type: 'infoBox',
        content: {
            title: 'Nhận biết & bảo quản',
            content: 'Nhận biết este nhỏ: mùi thơm đặc trưng, thuỷ phân nhẹ trong Na2CO3 cho mùi axit (giấm, bơ).\nLipid dễ oxy hoá khi có ánh sáng/kim loại chuyển tiếp → cần chống oxy hoá (BHT, vitamin E), bảo quản mát, kín.\nKhử mùi dầu bằng hấp phụ, chưng cất chân không; kiểm soát peroxit để tránh ôi khét.',
            color: 'gray',
            listType: 'bullet'
        }
    },
    {
        id: 'mod-8',
        type: 'warningBox',
        content: {
            title: 'Ứng dụng mở rộng',
            content: 'Hương liệu: isoamyl axetat (chuối), etyl butirat (dứa), benzyl axetat (hoa nhài).\nVật liệu: sơn, vecni (este dung môi), nhựa alkyd (ngưng tụ dầu + anhidrit).\nSinh học: phospholipid tạo màng tế bào; omega-3 (este ethyl) bổ trợ tim mạch.',
            color: 'orange',
            listType: 'bullet'
        }
    }
  ],
  game: [
    {
      type: 'multiple-choice',
      question: 'Tên gọi của CH3COOCH2CH3 là:',
      options: ['Etyl axetat', 'Metyl propionat', 'Etyl fomat', 'Propyl axetat'],
      correctAnswer: 0,
      explanation: 'CH3COO- là anion axetat, gắn với nhóm etyl → etyl axetat.',
      points: 10
    },
    {
      type: 'multiple-choice',
      question: 'Phản ứng xà phòng hoá là thuỷ phân ester trong môi trường:',
      options: ['Axit, thuận nghịch', 'Kiềm, gần như một chiều', 'Trung tính, rất chậm', 'Không cần xúc tác'],
      correctAnswer: 1,
      explanation: 'Kiềm đẩy cân bằng về phía muối + ancol, phản ứng coi như không thuận nghịch.',
      points: 10
    },
    {
      type: 'true-false',
      question: 'Dầu thực vật thường chứa nhiều liên kết đôi cis nên ở trạng thái lỏng.',
      correctAnswer: true,
      explanation: 'Liên kết đôi cis làm gập mạch, giảm lực tương tác → giảm nhiệt độ nóng chảy.',
      points: 10
    },
    {
      type: 'multiple-choice',
      question: 'Chỉ số xà phòng hoá càng lớn thì:',
      options: ['Mạch axit béo càng dài', 'Mạch axit béo càng ngắn', 'Không liên quan độ dài mạch', 'Lipid càng no'],
      correctAnswer: 1,
      explanation: 'Mạch ngắn → nhiều nhóm este trên 1 g → cần nhiều KOH hơn.',
      points: 10
    },
    {
      type: 'multiple-choice',
      question: 'Hiện tượng ôi thiu dầu mỡ chủ yếu do:',
      options: ['Thuỷ phân kiềm', 'Oxi hoá tự động liên kết đôi', 'Bay hơi ancol', 'Trùng hợp anion'],
      correctAnswer: 1,
      explanation: 'Oxi hoá liên kết đôi tạo peroxit, aldehyde gây mùi ôi.',
      points: 10
    },
    {
      type: 'true-false',
      question: 'Hydro hoá dầu thực vật có thể làm tăng chất béo bão hoà.',
      correctAnswer: true,
      explanation: 'Bổ sung H2 vào liên kết đôi làm giảm mức độ không no, dầu trở nên rắn hơn.',
      points: 10
    },
    {
      type: 'multiple-choice',
      question: 'Lipid là trieste của glixerol với:',
      options: ['Axit vô cơ', 'Axit béo mạch dài', 'Ancol béo', 'Phenol'],
      correctAnswer: 1,
      explanation: 'Glixerol kết hợp các axit béo (RCOOH mạch dài) tạo triglycerid.',
      points: 10
    },
    {
      type: 'multiple-choice',
      question: 'Sản phẩm thuỷ phân hoàn toàn chất béo trong kiềm là:',
      options: ['Glixerol + axit béo', 'Glixerol + muối axit béo', 'Ancol béo + xà phòng', 'Glixerol + anđehit'],
      correctAnswer: 1,
      explanation: 'Thuỷ phân kiềm cho glixerol và muối natri/kali của axit béo (xà phòng).',
      points: 10
    },
    {
      type: 'fill-in-blank',
      question: 'Etyl axetat phản ứng NaOH thu được ______ và C2H5OH.',
      correctAnswer: 'CH3COONa',
      explanation: 'Xà phòng hoá tạo muối natri axetat và ancol etylic.',
      points: 10
    },
    {
      type: 'multiple-choice',
      question: 'Nhóm chức đặc trưng của ester là:',
      options: ['-COOH', '-COO-', '-CHO', '-OH'],
      correctAnswer: 1,
      explanation: 'Ester chứa nhóm -COO- nối giữa gốc axyl và gốc alkyl/aryl.',
      points: 10
    }
  ]
};
