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
  theory: `
    <h2>Ester và lipid</h2>
    <p style="margin:8px 0; color:#334155;">Đào sâu cấu tạo, danh pháp, tính chất và ứng dụng của ester, lipid (trieste của glixerol) để hiểu hương liệu, xà phòng, trans-fat và bảo quản thực phẩm.</p>

    <div style="display:grid; gap:12px; grid-template-columns:repeat(auto-fit,minmax(260px,1fr)); margin:12px 0;">
      <div style="padding:12px; border:1px solid #e2e8f0; border-radius:10px; background:#f8fafc;">
        <h4 style="margin:0 0 6px; color:#0f172a;">Cấu tạo & danh pháp</h4>
        <ul style="margin:0; padding-left:18px; color:#475569;">
          <li>Ester: RCOOR'; danh pháp: alkyl + anion axit (đổi -ic → -ate; axit Việt hoá: axetat, fomat...).</li>
          <li>Lipid: trieste của glixerol với axit béo (mạch C15–C19); có thể chứa nối đôi cis (dầu lỏng).</li>
          <li>Đồng phân: vị trí nhóm COO, chiều dài và nhánh mạch alkyl/acy, tạo khác biệt mùi và nhiệt độ sôi.</li>
        </ul>
      </div>
      <div style="padding:12px; border:1px solid #e2e8f0; border-radius:10px; background:#fff7ed; color:#7c2d12;">
        <h4 style="margin:0 0 6px;">Tính chất trọng tâm</h4>
        <ul style="margin:0; padding-left:18px;">
          <li>Vật lí: mùi trái cây (este nhỏ), ít tan nước; T sôi tăng theo M, giảm khi phân nhánh.</li>
          <li>Hoá học: thuỷ phân axit (thuận nghịch); xà phòng hoá kiềm một chiều → muối axit béo + ancol.</li>
          <li>Hydro hoá nối đôi (dầu → mỡ); phản ứng cháy toả nhiệt lớn; LiAlH4 khử este → ancol.</li>
        </ul>
      </div>
      <div style="padding:12px; border:1px dashed #cbd5e1; border-radius:10px; background:#f8fafc; color:#475569;">
        <h4 style="margin:0 0 6px;">Chỉ số & kiểm soát chất lượng</h4>
        <ul style="margin:0; padding-left:18px;">
          <li>Chỉ số xà phòng hoá (mg KOH/1 g lipid) ∝ 1/độ dài mạch axit béo.</li>
          <li>Chỉ số axit đo axit béo tự do (mức ôi thiu); chỉ số iot phản ánh mức độ không no (khả năng bị oxy hoá).</li>
          <li>Vận dụng: chọn dầu ít không no cho chiên rán (giảm ôi thiu); kiểm tra chất lượng dầu/mỡ.</li>
        </ul>
      </div>
    </div>

    <div style="display:grid; gap:12px; grid-template-columns:repeat(auto-fit,minmax(260px,1fr)); margin:12px 0;">
      <div style="padding:12px; border-radius:12px; border:1px solid #cbd5e1; background:linear-gradient(135deg,#eef2ff,#f8fafc);">
        <h4 style="margin:0 0 6px; color:#312e81;">Phản ứng & quy trình công nghiệp</h4>
        <ul style="margin:0; padding-left:18px; color:#334155;">
          <li>Xà phòng hoá: triglycerid + 3NaOH → 3RCOONa (xà phòng) + glixerol (tận dụng sản xuất dược).</li>
          <li>Transester hoá làm biodiesel: triglycerid + MeOH (NaOCH3) → methyl ester (nhiên liệu sinh học) + glixerol.</li>
          <li>Hydro hoá từng phần → chuyển cis thành trans-fat (cần kiểm soát để hạn chế rủi ro sức khoẻ tim mạch).</li>
        </ul>
      </div>
      <div style="padding:12px; border:1px dashed #cbd5e1; border-radius:10px; background:#f8fafc; color:#475569;">
        <h4 style="margin:0 0 6px;">Nhận biết & bảo quản</h4>
        <ul style="margin:0; padding-left:18px;">
          <li>Nhận biết este nhỏ: mùi thơm đặc trưng, thuỷ phân nhẹ trong Na2CO3 cho mùi axit (giấm, bơ).</li>
          <li>Lipid dễ oxy hoá khi có ánh sáng/kim loại chuyển tiếp → cần chống oxy hoá (BHT, vitamin E), bảo quản mát, kín.</li>
          <li>Khử mùi dầu bằng hấp phụ, chưng cất chân không; kiểm soát peroxit để tránh ôi khét.</li>
        </ul>
      </div>
      <div style="padding:12px; border:1px solid #e2e8f0; border-radius:10px; background:#fffaf0; color:#7c2d12;">
        <h4 style="margin:0 0 6px;">Ứng dụng mở rộng</h4>
        <ul style="margin:0; padding-left:18px;">
          <li>Hương liệu: isoamyl axetat (chuối), etyl butirat (dứa), benzyl axetat (hoa nhài).</li>
          <li>Vật liệu: sơn, vecni (este dung môi), nhựa alkyd (ngưng tụ dầu + anhidrit).</li>
          <li>Sinh học: phospholipid tạo màng tế bào; omega-3 (este ethyl) bổ trợ tim mạch.</li>
        </ul>
      </div>
    </div>
  `,
  game: [
    {
      type: 'multiple-choice',
      question: 'Tên gọi của CH3COOCH2CH3 là:',
      options: ['Etyl axetat', 'Metyl propionat', 'Etyl fomat', 'Propyl axetat'],
      correctAnswer: 0,
      explanation: 'CH3COO– là anion axetat, gắn với nhóm etyl → etyl axetat.',
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
      options: ['–COOH', '–COO–', '–CHO', '–OH'],
      correctAnswer: 1,
      explanation: 'Ester chứa nhóm –COO– nối giữa gốc axyl và gốc alkyl/aryl.',
      points: 10
    }
  ]
};
