module.exports = {
  classId: 11,
  curriculumType: 'ketnoi',
  chapterId: 3,
  chapterName: 'Chương 3: Đại cương về hoá học hữu cơ',
  lessonId: 14,
  title: 'Bài 14: Ôn tập chương 3',
  description: 'Tổng hợp khái niệm hữu cơ, phân loại, công thức, đồng phân và tách tinh chế.',
  level: 'Intermediate',
  order: 14,
  theory: `
    <h2>Ôn tập đại cương hữu cơ</h2>
    <p style="margin:8px 0; color:#334155;">Tóm lược phân loại, xác định CTPT, đồng phân và chọn phương pháp tinh chế thích hợp.</p>

    <div style="display:grid; gap:12px; grid-template-columns:repeat(auto-fit,minmax(260px,1fr)); margin:12px 0;">
      <div style="padding:12px; border:1px solid #e2e8f0; border-radius:10px; background:#f8fafc;">
        <h4 style="margin:0 0 6px; color:#0f172a;">Phân loại & nhóm chức</h4>
        <ul style="margin:0; padding-left:18px; color:#475569;">
          <li>Hiđrocacbon: ankan, anken, ankin, thơm; dẫn xuất: halogen, ancol, anđehit, axit, este...</li>
          <li>Mạch thẳng/nhánh/vòng; dị vòng có dị tố.</li>
        </ul>
      </div>
      <div style="padding:12px; border:1px solid #e2e8f0; border-radius:10px; background:#fff7ed;">
        <h4 style="margin:0 0 6px; color:#9a3412;">CTPT & IHD</h4>
        <ul style="margin:0; padding-left:18px; color:#7c2d12;">
          <li>Từ % khối lượng → CTĐG → dùng M xác định CTPT.</li>
          <li>IHD = (2C + 2 + N - H - X)/2 để suy vòng/nối π.</li>
        </ul>
      </div>
    </div>

    <div style="display:grid; gap:12px; grid-template-columns:repeat(auto-fit,minmax(260px,1fr)); margin:12px 0;">
      <div style="padding:12px; border-radius:12px; border:1px solid #cbd5e1; background:#f8fafc; color:#475569;">
        <h4 style="margin:0 0 6px;">Đồng phân</h4>
        <ul style="margin:0; padding-left:18px;">
          <li>Cấu tạo: mạch, vị trí, nhóm chức.</li>
          <li>Lập công thức và đếm nhanh: ankan từ C4 xuất hiện nhánh; nối đôi có đồng phân vị trí/hình học.</li>
        </ul>
      </div>
      <div style="padding:12px; border-radius:12px; border:1px solid #cbd5e1; background:linear-gradient(135deg,#eef2ff,#f8fafc); color:#334155;">
        <h4 style="margin:0 0 6px; color:#312e81;">Tách & tinh chế</h4>
        <ul style="margin:0; padding-left:18px;">
          <li>Chưng cất (đơn/phân đoạn/chân không), chiết, kết tinh lại, sắc kí mỏng theo dõi.</li>
          <li>Chọn phương pháp dựa trên điểm sôi, độ tan, bền nhiệt, hệ số phân bố.</li>
        </ul>
      </div>
    </div>
  `,
  game: [
    {
      type: 'multiple-choice',
      question: 'IHD của C5H10 là:',
      options: ['0', '1', '2', '3'],
      correctAnswer: 1,
      explanation: 'IHD=(2*5+2-10)/2=1 (1 vòng hoặc 1 nối đôi).',
      points: 10
    },
    {
      type: 'multiple-choice',
      question: 'Dẫn xuất nào thuộc nhóm chức halogen?',
      options: ['CH3CH2OH', 'CH3CH2Cl', 'CH3COOH', 'CH3CHO'],
      correctAnswer: 1,
      explanation: 'Halogenoalkan có halogen gắn với C.',
      points: 10
    },
    {
      type: 'true-false',
      question: 'Ankan từ C4 trở lên có thể có đồng phân mạch.',
      correctAnswer: true,
      explanation: 'C4H10 là ankan đầu tiên có nhánh.',
      points: 10
    },
    {
      type: 'multiple-choice',
      question: 'Phương pháp phù hợp tách hỗn hợp benzen–toluen:',
      options: ['Chiết nước', 'Chưng cất phân đoạn', 'Kết tinh', 'Sắc kí giấy'],
      correctAnswer: 1,
      explanation: 'Điểm sôi gần nhưng vẫn tách bằng cột chưng phân đoạn.',
      points: 10
    },
    {
      type: 'multiple-choice',
      question: 'Nhận định đúng về IHD:',
      options: ['Tính luôn cần O', 'Mỗi liên kết đôi tăng 1 IHD', 'Halogen làm giảm IHD 2 đơn vị', 'Mỗi vòng tăng 2 IHD'],
      correctAnswer: 1,
      explanation: 'Mỗi nối π hoặc mỗi vòng tăng 1 đơn vị IHD.',
      points: 10
    },
    {
      type: 'true-false',
      question: 'Kết tinh lại cần dung môi tan tốt lạnh, tan kém nóng.',
      correctAnswer: false,
      explanation: 'Ngược lại: tan tốt nóng, tan kém lạnh để kết tinh khi nguội.',
      points: 10
    },
    {
      type: 'multiple-choice',
      question: 'Hỗn hợp etanol – nước tách bằng:',
      options: ['Chiết với hexan', 'Chưng cất thường', 'Chưng cất azeotrop hoặc thêm chất tách nước', 'Kết tinh'],
      correctAnswer: 2,
      explanation: 'Ethanol–nước tạo azeotrop 95%, cần phương pháp đặc biệt để vượt.',
      points: 10
    },
    {
      type: 'multiple-choice',
      question: 'Cặp đồng phân chức là:',
      options: ['CH3OCH3 và C2H5OH', 'But-1-ene và cis-but-2-ene', 'Cyclopentan và pent-1-ene', 'n-hexan và 2-metylpentan'],
      correctAnswer: 0,
      explanation: 'C2H6O có ancol và ete là đồng phân nhóm chức.',
      points: 10
    },
    {
      type: 'true-false',
      question: 'Silica gel là pha tĩnh phổ biến trong TLC.',
      correctAnswer: true,
      explanation: 'Silica gel hấp phụ phân cực, dùng rộng rãi.',
      points: 10
    },
    {
      type: 'fill-in-blank',
      question: 'CTPT xác định từ CTĐG bằng hệ số n = M thực nghiệm / M ______',
      correctAnswer: 'công thức đơn giản',
      explanation: 'Nhân chỉ số CTĐG với n để ra CTPT.',
      points: 10
    }
  ]
};
