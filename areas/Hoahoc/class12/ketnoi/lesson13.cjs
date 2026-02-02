module.exports = {
  classId: 12,
  curriculumType: 'ketnoi',
  chapterId: 4,
  chapterName: 'Chương 4: Polymer',
  lessonId: 13,
  title: 'Bài 13: Vật liệu polymer',
  description: 'Ứng dụng và tính chất của nhựa, cao su, tơ sợi; môi trường và tái chế.',
  level: 'Intermediate',
  order: 13,
  theoryModules: [
    {
        id: 'mod-1',
        type: 'heading',
        content: {
            text: 'Vật liệu polymer',
            level: 'h2'
        }
    },
    {
        id: 'mod-2',
        type: 'paragraph',
        content: {
            text: 'Khám phá nhựa, cao su, tơ sợi - tính chất, ứng dụng và xu hướng bền vững.'
        }
    },
    {
        id: 'mod-3',
        type: 'infoBox',
        content: {
            title: 'Nhựa',
            content: 'Nhiệt dẻo: PE, PP, PVC, PS, PET - nóng chảy khi gia nhiệt, tái chế được.\nNhiệt rắn: Bakelit (PF), nhựa epoxy - mạng không gian, khó tái chế, chịu nhiệt tốt.\nThuộc tính: độ bền kéo, độ cứng, Tg, Tm, khả năng chống hoá chất.',
            color: 'gray',
            listType: 'bullet'
        }
    },
    {
        id: 'mod-4',
        type: 'infoBox',
        content: {
            title: 'Cao su',
            content: 'Thiên nhiên: polyisopren cis; lưu hoá với S tạo cầu nối -S-S- tăng đàn hồi, bền nhiệt.\nTổng hợp: Buna (SBR), butyl, neopren - dùng lốp, gioăng, găng tay.\nTính đàn hồi nhờ mạch dài cuộn tự do, phục hồi khi bỏ lực.',
            color: 'blue',
            listType: 'bullet'
        }
    },
    {
        id: 'mod-5',
        type: 'infoBox',
        content: {
            title: 'Tơ sợi',
            content: 'Tơ tổng hợp: nylon-6,6; tơ polyeste (PET); tơ acrylic.\nTơ nhân tạo: visco, axetat từ xenlulozơ.\nTính chất: bền kéo, hút ẩm (visco tốt, nylon kém), chịu nhiệt (polyester cao).',
            color: 'gray',
            listType: 'bullet'
        }
    },
    {
        id: 'mod-6',
        type: 'infoBox',
        content: {
            title: 'Môi trường & bền vững',
            content: 'Vấn đề: vi nhựa, khó phân huỷ, phát thải khi đốt.\nGiải pháp: tái chế cơ học/hoá học, polymer phân huỷ sinh học (PLA), tái sử dụng.\nPhân loại nhựa tái chế theo ký hiệu 1-7; ưu tiên sử dụng R-PET, R-PP.',
            color: 'purple',
            listType: 'bullet'
        }
    },
    {
        id: 'mod-7',
        type: 'infoBox',
        content: {
            title: 'So sánh nhanh',
            content: 'Nhựa: đàn hồi thấp, định hình tốt; cao su: đàn hồi cao; tơ: bền kéo, dạng sợi.\nNhiệt dẻo (PE/PP/PET) tái chế được; nhiệt rắn (Bakelit/epoxy) khó tái chế.\nHút ẩm: visco > nylon > polyester; chịu nhiệt: polyester ≈ nylon > visco.',
            color: 'gray',
            listType: 'bullet'
        }
    },
    {
        id: 'mod-8',
        type: 'infoBox',
        content: {
            title: 'Case & ứng dụng',
            content: 'Chọn nhựa bao bì: PET cho chai nước (trong, rào cản), PP cho hộp vi sóng (chịu nhiệt).\nCao su chịu dầu: nitrile; chịu thời tiết/ozon: EPDM; găng tay y tế: latex/nitrile.\nTơ may: polyester ít nhăn, nylon bền mài mòn, visco mát và hút ẩm.',
            color: 'blue',
            listType: 'bullet'
        }
    },
    {
        id: 'mod-9',
        type: 'infoBox',
        content: {
            title: 'Ôn bài tập',
            content: 'Xác định loại vật liệu từ gợi ý tính chất (Tg, Tm, đàn hồi, hút ẩm).\nNhận diện mã nhựa 1-7; liên hệ monomer (PET: etylen glycol + terephtalat; PS: styren).\nTính % lưu hoá cao su: dựa vào lượng S thêm và khối lượng sản phẩm.',
            color: 'gray',
            listType: 'bullet'
        }
    }
  ],
  game: [
    {
      type: 'multiple-choice',
      question: 'Nhựa nhiệt dẻo có đặc điểm:',
      options: ['Không nóng chảy', 'Nóng chảy khi gia nhiệt, tái chế được', 'Luôn đàn hồi', 'Chịu nhiệt cao và không tái chế'],
      correctAnswer: 1,
      explanation: 'Nhiệt dẻo mềm chảy khi nóng, đông lại khi nguội.',
      points: 10
    },
    {
      type: 'multiple-choice',
      question: 'Cầu nối lưu hoá cao su là:',
      options: ['C-C', 'C-O', 'S-S', 'H-bond'],
      correctAnswer: 2,
      explanation: 'Lưu huá tạo cầu disulfide giữa các mạch polyisopren.',
      points: 10
    },
    {
      type: 'true-false',
      question: 'Bakelit là nhựa nhiệt rắn.',
      correctAnswer: true,
      explanation: 'Phenol-formaldehyde tạo mạng không gian không nóng chảy lại.',
      points: 10
    },
    {
      type: 'multiple-choice',
      question: 'Tơ nào có nguồn gốc từ xenlulozơ?',
      options: ['Nylon-6,6', 'Visco', 'Acrylic', 'Polyester'],
      correctAnswer: 1,
      explanation: 'Visco (rayon) từ dung dịch xenlulozơ.',
      points: 10
    },
    {
      type: 'multiple-choice',
      question: 'Nhựa PET thuộc nhóm ký hiệu tái chế:',
      options: ['1', '2', '4', '6'],
      correctAnswer: 0,
      explanation: 'PET có mã số 1 (triangular chasing arrows).',
      points: 10
    },
    {
      type: 'true-false',
      question: 'Polymer phân huỷ sinh học luôn an toàn tuyệt đối cho môi trường.',
      correctAnswer: false,
      explanation: 'Cần điều kiện thích hợp; phụ gia và sản phẩm phân huỷ vẫn phải được đánh giá.',
      points: 10
    },
    {
      type: 'multiple-choice',
      question: 'Tính đàn hồi của cao su do:',
      options: ['Mạch cứng thẳng', 'Mạch linh động cuộn xoắn', 'Liên kết ion', 'Tính kết tinh cao'],
      correctAnswer: 1,
      explanation: 'Mạch dài cuộn xoắn, khi kéo duỗi, sau đó trở lại nhờ lực đàn hồi entropy.',
      points: 10
    },
    {
      type: 'fill-in-blank',
      question: 'Nhựa polystyren có mã tái chế số ___ .',
      correctAnswer: '6',
      explanation: 'PS được ký hiệu 6.',
      points: 10
    },
    {
      type: 'multiple-choice',
      question: 'Quy trình tái chế hoá học nhắm tới:',
      options: ['Nghiền, nấu chảy', 'Phân cắt polymer về monomer/oligomer', 'Đốt lấy năng lượng', 'Chôn lấp'],
      correctAnswer: 1,
      explanation: 'Depolymerization thu monomer (ví dụ PET → BHET).',
      points: 10
    },
    {
      type: 'true-false',
      question: 'Nylon-6,6 là polyamid.',
      correctAnswer: true,
      explanation: 'Nhóm -CO-NH- lặp lại trong chuỗi.',
      points: 10
    }
  ]
};
