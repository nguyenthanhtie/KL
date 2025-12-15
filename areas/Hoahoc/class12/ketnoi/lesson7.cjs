module.exports = {
  classId: 12,
  curriculumType: 'ketnoi',
  chapterId: 2,
  chapterName: 'Chương 2: Carbohydrate',
  lessonId: 7,
  title: 'Bài 7: Ôn tập chương 2',
  description: 'Tóm tắt cấu trúc, tính chất, phản ứng đặc trưng của monosaccharide và polysaccharide.',
  level: 'Intermediate',
  order: 7,
  theory: `
    <h2>Ôn tập chương 2: Carbohydrate</h2>
    <p style="margin:8px 0; color:#334155;">Tổng hợp mạch kiến thức từ monosaccharide đến polysaccharide, phân biệt đường khử/không khử, bài tập thuỷ phân và ứng dụng.</p>

    <div style="display:grid; gap:12px; grid-template-columns:repeat(auto-fit,minmax(260px,1fr)); margin:12px 0;">
      <div style="padding:12px; border:1px solid #e2e8f0; border-radius:10px; background:#f8fafc;">
        <h4 style="margin:0 0 6px; color:#0f172a;">Nhận biết & tính khử</h4>
        <ul style="margin:0; padding-left:18px; color:#475569;">
          <li>Đường khử: glucose, fructose (sau chuyển hoá), maltose; cho Tollens/Fehling dương tính.</li>
          <li>Đường không khử: saccharose; cần thuỷ phân mới khử.</li>
          <li>Thử Molisch (tổng quát), Barfoed (mono vs di khử), Iot (tinh bột), không màu với xenlulozơ.</li>
        </ul>
      </div>
      <div style="padding:12px; border:1px solid #fde68a; border-radius:10px; background:#fffbeb; color:#92400e;">
        <h4 style="margin:0 0 6px;">Phản ứng & chuyển hoá</h4>
        <ul style="margin:0; padding-left:18px;">
          <li>Thuỷ phân: saccharose → glucose + fructose; tinh bột/xenlulozơ → glucose.</li>
          <li>Lên men: glucose → etanol/CO2; vi khuẩn lactic → axit lactic.</li>
          <li>Ester hoá nhiều –OH; oxi hoá nhẹ bằng Br2 (aldose) vs mạnh bằng HNO3 (tạo dicarboxylic).</li>
        </ul>
      </div>
      <div style="padding:12px; border:1px dashed #cbd5e1; border-radius:10px; background:#f8fafc; color:#475569;">
        <h4 style="margin:0 0 6px;">Kỹ năng bài tập</h4>
        <ul style="margin:0; padding-left:18px;">
          <li>Cân bằng khối lượng, bảo toàn e trong phản ứng tráng bạc/Fehling để tính mol đường khử.</li>
          <li>Phân biệt tinh bột vs xenlulozơ bằng thử iot, độ tan, thuỷ phân.</li>
          <li>Tính hiệu suất chuyển hoá: khối lượng tinh bột → glucose → etanol/CO2.</li>
        </ul>
      </div>
    </div>

    <div style="display:grid; gap:12px; grid-template-columns:repeat(auto-fit,minmax(260px,1fr)); margin:12px 0;">
      <div style="padding:12px; border-radius:12px; border:1px solid #cbd5e1; background:linear-gradient(135deg,#eef2ff,#f8fafc); color:#0f172a;">
        <h4 style="margin:0 0 6px;">Bảng phân biệt nhanh</h4>
        <ul style="margin:0; padding-left:18px; color:#334155;">
          <li>Đường khử: glucose, fructose, maltose → Tollens/Fehling (+); không khử: saccharose (trừ khi thuỷ phân).</li>
          <li>Poly: tinh bột (+ I2 xanh tím), xenlulozơ (không màu, sợi bền), glycogen (đỏ nâu).</li>
          <li>Thử Barfoed: mono khử nhanh, di khử chậm; Biuret (peptide), Molisch (mọi carbo).</li>
        </ul>
      </div>
      <div style="padding:12px; border:1px dashed #cbd5e1; border-radius:10px; background:#fffaf0; color:#92400e;">
        <h4 style="margin:0 0 6px;">Case & mẹo thi</h4>
        <ul style="margin:0; padding-left:18px;">
          <li>Câu hiệu suất etanol: 1 mol glucose → 2 mol etanol; trừ hao CO2 thoát, nhân % hiệu suất.</li>
          <li>Đề phân biệt: luôn nghĩ “thuỷ phân saccharose rồi thử Tollens/Fehling” để chắc chắn.</li>
          <li>Mẹo nhớ màu: tinh bột xanh tím, glycogen đỏ nâu, dextrin tím nhạt → cho thấy mức thuỷ phân.</li>
        </ul>
      </div>
      <div style="padding:12px; border:1px solid #e2e8f0; border-radius:10px; background:#f8fafc; color:#475569;">
        <h4 style="margin:0 0 6px;">Ôn bài tập</h4>
        <ul style="margin:0; padding-left:18px;">
          <li>Phản ứng tráng bạc: n mol Ag sinh ra → n/2 mol đường aldose; fructose tính như aldose khi trong kiềm.</li>
          <li>Thuỷ phân tinh bột: (C6H10O5)n + nH2O → nC6H12O6; áp dụng bảo toàn khối lượng.</li>
          <li>Lên men hỗn hợp: nếu đề cho sản phẩm khí và rượu, tính theo mol, chú ý hiệu suất từng giai đoạn.</li>
        </ul>
      </div>
    </div>
  `,
  game: [
    {
      type: 'multiple-choice',
      question: 'Đường nào sau đây không khử?',
      options: ['Glucose', 'Fructose', 'Maltose', 'Saccharose'],
      correctAnswer: 3,
      explanation: 'Saccharose không có nhóm hemiacetal tự do.',
      points: 10
    },
    {
      type: 'multiple-choice',
      question: 'Thuốc thử Iot dùng để nhận biết:',
      options: ['Đường khử', 'Tinh bột', 'Xenlulozơ', 'Maltose'],
      correctAnswer: 1,
      explanation: 'Tinh bột cho màu xanh tím với I2/KI.',
      points: 10
    },
    {
      type: 'true-false',
      question: 'Barfoed giúp phân biệt monosaccharide khử với disaccharide khử.',
      correctAnswer: true,
      explanation: 'Monosaccharide khử Cu2+ nhanh hơn ở môi trường axit yếu.',
      points: 10
    },
    {
      type: 'multiple-choice',
      question: 'Sản phẩm thuỷ phân tinh bột hoàn toàn:',
      options: ['Maltose', 'Glucose', 'Fructose', 'Saccharose'],
      correctAnswer: 1,
      explanation: 'Tinh bột → glucose.',
      points: 10
    },
    {
      type: 'multiple-choice',
      question: 'Glucose lên men etylic tạo 90% hiệu suất. Từ 180 g glucose thu tối đa etanol (khối lượng gần đúng):',
      options: ['46 g', '82,8 g', '92 g', '184 g'],
      correctAnswer: 2,
      explanation: 'Lý thuyết: 180 → 92 g etanol; 90% → 82,8 g.',
      points: 10
    },
    {
      type: 'true-false',
      question: 'Fructose phải thuỷ phân mới cho phản ứng tráng bạc.',
      correctAnswer: false,
      explanation: 'Trong môi trường kiềm fructose tự đồng phân hoá thành aldose, nên vẫn cho Tollens/Fehling.',
      points: 10
    },
    {
      type: 'multiple-choice',
      question: 'Tinh bột bị thuỷ phân nhanh nhất bởi:',
      options: ['Nước lạnh', 'Enzym amylase', 'Dung dịch NaOH', 'Dung dịch NaCl'],
      correctAnswer: 1,
      explanation: 'Amylase xúc tác cắt liên kết α-1,4.',
      points: 10
    },
    {
      type: 'fill-in-blank',
      question: 'Saccharose thuỷ phân tạo glucose và ______.',
      correctAnswer: 'fructose',
      explanation: 'Đường mía → đường nghịch đảo chứa hai monosaccharide.',
      points: 10
    },
    {
      type: 'multiple-choice',
      question: 'Xenlulozơ không tan trong nước do:',
      options: ['Phân tử lượng thấp', 'Chuỗi thẳng nhiều liên kết H nội/ngoại chuỗi', 'Tính ion cao', 'Có nhiều nhánh'],
      correctAnswer: 1,
      explanation: 'Liên kết H bền tạo vi sợi chặt chẽ.',
      points: 10
    },
    {
      type: 'true-false',
      question: 'Maltose là disaccharide khử.',
      correctAnswer: true,
      explanation: 'Còn một đầu hemiacetal tự do.',
      points: 10
    }
  ]
};
