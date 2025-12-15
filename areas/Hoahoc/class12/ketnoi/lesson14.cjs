module.exports = {
  classId: 12,
  curriculumType: 'ketnoi',
  chapterId: 4,
  chapterName: 'Chương 4: Polymer',
  lessonId: 14,
  title: 'Bài 14: Ôn tập chương 4',
  description: 'Tổng hợp kiến thức polymer: cơ chế tạo chuỗi, tính chất, ứng dụng và môi trường.',
  level: 'Intermediate',
  order: 14,
  theory: `
    <h2>Ôn tập chương 4: Polymer</h2>
    <p style="margin:8px 0; color:#334155;">Tổng hợp loại phản ứng, nhận diện monomer, phân tích tính chất vật liệu và bài tập tính toán.</p>

    <div style="display:grid; gap:12px; grid-template-columns:repeat(auto-fit,minmax(260px,1fr)); margin:12px 0;">
      <div style="padding:12px; border:1px solid #e2e8f0; border-radius:10px; background:#f8fafc;">
        <h4 style="margin:0 0 6px; color:#0f172a;">Nhận diện & phản ứng</h4>
        <ul style="margin:0; padding-left:18px; color:#475569;">
          <li>Trùng hợp cộng: anken, vinylic (PE, PP, PVC, PS).</li>
          <li>Trùng ngưng: monomer đa chức (–COOH, –OH, –NH2) tách phân tử nhỏ (PA, PET, PF).</li>
          <li>Đơn vị lặp xác định từ monomer; DP ước tính khối lượng polymer.</li>
        </ul>
      </div>
      <div style="padding:12px; border:1px solid #fde68a; border-radius:10px; background:#fffbeb; color:#92400e;">
        <h4 style="margin:0 0 6px;">So sánh vật liệu</h4>
        <ul style="margin:0; padding-left:18px;">
          <li>Nhựa: nhiệt dẻo/tái chế vs nhiệt rắn bền nhiệt.</li>
          <li>Cao su: đàn hồi; cần lưu hoá; chịu dầu/ozon tùy loại.</li>
          <li>Tơ: độ bền kéo, hút ẩm; tơ tổng hợp ít hút ẩm hơn tơ tự nhiên.</li>
        </ul>
      </div>
      <div style="padding:12px; border:1px dashed #cbd5e1; border-radius:10px; background:#f8fafc; color:#475569;">
        <h4 style="margin:0 0 6px;">Bền vững & tính toán</h4>
        <ul style="margin:0; padding-left:18px;">
          <li>Tái chế cơ học/hoá học, phân huỷ sinh học, giảm vi nhựa.</li>
          <li>Bài tập: tính DP, khối lượng polymer từ monomer; dự đoán tính chất từ cấu trúc.</li>
          <li>Phân tích Tg/Tm liên quan tới mạch thẳng/nhánh, lực tương tác.</li>
        </ul>
      </div>
    </div>

    <div style="display:grid; gap:12px; grid-template-columns:repeat(auto-fit,minmax(260px,1fr)); margin:12px 0;">
      <div style="padding:12px; border-radius:12px; border:1px solid #cbd5e1; background:linear-gradient(135deg,#eef2ff,#f8fafc); color:#0f172a;">
        <h4 style="margin:0 0 6px;">Mindmap ôn tập</h4>
        <ul style="margin:0; padding-left:18px; color:#334155;">
          <li>Cộng (PE, PP, PS, PVC) vs ngưng (PA, PET, PF); dấu hiệu: có/không tách H2O/HCl.</li>
          <li>Tính chất quyết định bởi: mạch (thẳng/nhánh/mạng), nhóm chức (este, amide), độ kết tinh.</li>
          <li>Tái chế: mã 1–7; nhiệt dẻo ưu tiên tái chế, nhiệt rắn khó.</li>
        </ul>
      </div>
      <div style="padding:12px; border:1px dashed #cbd5e1; border-radius:10px; background:#fffaf0; color:#92400e;">
        <h4 style="margin:0 0 6px;">Case & mẹo</h4>
        <ul style="margin:0; padding-left:18px;">
          <li>Đề bài “tính DP”: nhớ DP = Mpolymer / M mắt xích; nếu có phân tử nhỏ tách ra, tính khối lượng mắt xích sau khi tách.</li>
          <li>Phân biệt PE nhánh vs thẳng: dựa mật độ, Tm, độ bền kéo; nhánh mềm, Tm thấp.</li>
          <li>Nhận monomer từ polymer: cắt đôi liên kết lặp (vinyl), hoặc phá nhóm –CO–NH– (PA), –COO– (PET) để suy ra monomer.</li>
        </ul>
      </div>
      <div style="padding:12px; border:1px solid #e2e8f0; border-radius:10px; background:#f8fafc; color:#475569;">
        <h4 style="margin:0 0 6px;">Ôn bài tập</h4>
        <ul style="margin:0; padding-left:18px;">
          <li>Viết phương trình trùng ngưng: đặt n monomer, trừ (n–1) phân tử nhỏ; cân bằng nguyên tử.</li>
          <li>Tính E, Tg, Tm không yêu cầu nhưng liên hệ cấu trúc để chọn vật liệu phù hợp tình huống.</li>
          <li>So sánh nhựa/ cao su/ tơ trong đề nhận biết: xét tính đàn hồi, nóng chảy, tan chảy khi đun.</li>
        </ul>
      </div>
    </div>
  `,
  game: [
    {
      type: 'multiple-choice',
      question: 'Monomer của PVC là:',
      options: ['CH2=CH2', 'CH2=CHCl', 'CH2=CHCN', 'CH2=C(CH3)2'],
      correctAnswer: 1,
      explanation: 'PVC từ vinyl chloride.',
      points: 10
    },
    {
      type: 'multiple-choice',
      question: 'Trùng ngưng cần điều kiện:',
      options: ['Monomer một chức', 'Tách phân tử nhỏ', 'Nhiệt độ thấp bắt buộc', 'Xúc tác kim loại'],
      correctAnswer: 1,
      explanation: 'Phải có nhóm chức đa chức để tách H2O/HCl...',
      points: 10
    },
    {
      type: 'true-false',
      question: 'PE là polymer mạch no thu từ anken.',
      correctAnswer: true,
      explanation: 'Etilen cộng mở vòng tạo chuỗi no.',
      points: 10
    },
    {
      type: 'multiple-choice',
      question: 'Nylon-6,6 thuộc loại:',
      options: ['Polyamit trùng hợp', 'Polyamit trùng ngưng', 'Polyete', 'Polyeste'],
      correctAnswer: 1,
      explanation: 'Từ diamine + diacid → trùng ngưng, nhóm –CO–NH–.',
      points: 10
    },
    {
      type: 'multiple-choice',
      question: 'Khi DP tăng, tính chất nào thường tăng:',
      options: ['Độ bền kéo', 'Độ bay hơi', 'Độ tan', 'Tốc độ kết tinh'],
      correctAnswer: 0,
      explanation: 'Chuỗi dài tăng bền cơ nhưng giảm tan.',
      points: 10
    },
    {
      type: 'true-false',
      question: 'Nhựa nhiệt rắn có thể tái nóng chảy nhiều lần.',
      correctAnswer: false,
      explanation: 'Mạng không gian không chảy lại.',
      points: 10
    },
    {
      type: 'multiple-choice',
      question: 'Đơn vị lặp của PET chứa nhóm:',
      options: ['–CO–NH–', '–O–CH2–CH2–O–CO–Ph–CO–', '–CH2–CHCl–', '–CH2–CH2–'],
      correctAnswer: 1,
      explanation: 'PET có nhóm este với nhân thơm terephtalat.',
      points: 10
    },
    {
      type: 'fill-in-blank',
      question: 'DP ≈ Mpolymer / M ______ lặp.',
      correctAnswer: 'đơn vị',
      explanation: 'Chia khối lượng cho khối lượng mắt xích.',
      points: 10
    },
    {
      type: 'multiple-choice',
      question: 'PE nhánh (LDPE) so với PE thẳng (HDPE):',
      options: ['Kết tinh cao hơn', 'Mềm hơn, Tg thấp hơn', 'Cứng hơn', 'Nhiệt độ nóng chảy cao hơn'],
      correctAnswer: 1,
      explanation: 'Nhánh làm giảm kết tinh, tăng mềm dẻo.',
      points: 10
    },
    {
      type: 'true-false',
      question: 'Cao su thiên nhiên là polyisopren cis.',
      correctAnswer: true,
      explanation: 'Đơn vị lặp isopren nối 1,4-cis.',
      points: 10
    }
  ]
};
