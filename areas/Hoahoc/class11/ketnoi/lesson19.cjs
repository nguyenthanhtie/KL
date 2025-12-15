module.exports = {
  classId: 11,
  curriculumType: 'ketnoi',
  chapterId: 5,
  chapterName: 'Chương 5: Dẫn xuất halogen - alcohol - phenol',
  lessonId: 19,
  title: 'Bài 19: Dẫn xuất halogen',
  description: 'Halogenoankan: danh pháp, phản ứng thế, loại H-X, ứng dụng.',
  level: 'Intermediate',
  order: 19,
  theory: `
    <h2>Dẫn xuất halogen</h2>
    <p style="margin:8px 0; color:#334155;">Xác định bậc halogenoankan, phân biệt SN1/SN2, E1/E2 và ứng dụng phản ứng Grignard.</p>

    <div style="display:grid; gap:12px; grid-template-columns:repeat(auto-fit,minmax(260px,1fr)); margin:12px 0;">
      <div style="padding:12px; border:1px solid #e2e8f0; border-radius:10px; background:#f8fafc;">
        <h4 style="margin:0 0 6px; color:#0f172a;">Cấu tạo & phân loại</h4>
        <ul style="margin:0; padding-left:18px; color:#475569;">
          <li>Công thức R–X (X = F, Cl, Br, I); bậc 1/2/3 tùy carbon gắn X.</li>
          <li>Liên kết C–X phân cực (Cδ+, Xδ−); độ bền: C–F > C–Cl > C–Br > C–I.</li>
        </ul>
      </div>
      <div style="padding:12px; border:1px solid #e2e8f0; border-radius:10px; background:#fff7ed;">
        <h4 style="margin:0 0 6px; color:#9a3412;">Phản ứng thay thế nucleophin</h4>
        <ul style="margin:0; padding-left:18px; color:#7c2d12;">
          <li>SN2: 1 bước, nghịch hướng (inversion), ưu tiên bậc 1, tác nhân mạnh, dung môi phân cực kém.</li>
          <li>SN1: 2 bước qua carbocation, ưu tiên bậc 3, dung môi phân cực, có thể tạo hỗn hợp lập thể.</li>
          <li>Ví dụ: R–X + OH− → R–OH + X−.</li>
        </ul>
      </div>
    </div>

    <div style="display:grid; gap:12px; grid-template-columns:repeat(auto-fit,minmax(260px,1fr)); margin:12px 0;">
      <div style="padding:12px; border-radius:12px; border:1px solid #cbd5e1; background:#f8fafc; color:#475569;">
        <h4 style="margin:0 0 6px;">Phản ứng loại (E1/E2)</h4>
        <ul style="margin:0; padding-left:18px;">
          <li>E2: 1 bước, base mạnh, nhiệt → tạo anken theo quy tắc Zaitsev (tạo anken thế hơn).</li>
          <li>E1: qua carbocation (giống SN1), có thể kèm tái sắp xếp.</li>
        </ul>
      </div>
      <div style="padding:12px; border-radius:12px; border:1px solid #cbd5e1; background:linear-gradient(135deg,#eef2ff,#f8fafc); color:#334155;">
        <h4 style="margin:0 0 6px; color:#312e81;">Thuốc thử Grignard</h4>
        <ul style="margin:0; padding-left:18px;">
          <li>RMgX tạo từ R–X + Mg khan trong ete khan; là bazơ và nucleophin mạnh.</li>
          <li>Ứng dụng: cộng vào C=O tạo ancol (R–MgX + HCHO → ancol bậc 1; + aldehyde → ancol bậc 2; + xeton → ancol bậc 3).</li>
        </ul>
      </div>
    </div>

    <div style="padding:12px; border-radius:12px; border:1px dashed #cbd5e1; background:#f8fafc; color:#475569;">
      <h4 style="margin:0 0 6px;">Ứng dụng & an toàn</h4>
      <ul style="margin:0; padding-left:18px;">
        <li>Dung môi (CH2Cl2), chất làm lạnh (CCl2F2 - hạn chế do phá ozone), thuốc trừ sâu (DDT - bị cấm).</li>
        <li>Lưu ý độc tính và tác động môi trường; ưu tiên hóa chất thân thiện hơn.</li>
      </ul>
    </div>
  `,
  game: [
    {
      type: 'multiple-choice',
      question: 'Liên kết C–X yếu nhất là với:',
      options: ['F', 'Cl', 'Br', 'I'],
      correctAnswer: 3,
      explanation: 'C–I dài và yếu nhất nên phản ứng dễ hơn.',
      points: 10
    },
    {
      type: 'multiple-choice',
      question: 'SN2 ưu tiên xảy ra với:',
      options: ['Halogenoankan bậc 3', 'Halogenoankan bậc 1', 'Công thức vòng thơm', 'Vinyl halide'],
      correctAnswer: 1,
      explanation: 'Bậc 1 ít cản trở không gian, thuận lợi cho tấn công ngược hướng.',
      points: 10
    },
    {
      type: 'true-false',
      question: 'SN1 tạo carbocation trung gian.',
      correctAnswer: true,
      explanation: 'SN1 tách X trước, tạo cation rồi nucleophin tấn công.',
      points: 10
    },
    {
      type: 'multiple-choice',
      question: 'Phản ứng loại E2 cần:',
      options: ['Base mạnh, một bước', 'Acid mạnh, hai bước', 'Nucleophin yếu', 'Không cần nhiệt'],
      correctAnswer: 0,
      explanation: 'E2 xảy ra đồng thời, base mạnh lấy H β.',
      points: 10
    },
    {
      type: 'multiple-choice',
      question: 'Quy tắc Zaitsev áp dụng cho:',
      options: ['Thế gốc tự do', 'Cộng electrophin', 'Phản ứng loại tạo anken ưu tiên thế hơn', 'Trùng hợp'],
      correctAnswer: 2,
      explanation: 'Zaitsev: anken bền hơn (thế hơn) ưu tiên.',
      points: 10
    },
    {
      type: 'true-false',
      question: 'Thuốc thử Grignard phải làm trong ete khan.',
      correctAnswer: true,
      explanation: 'RMgX rất nhạy nước; ete tạo phức bền và khan.',
      points: 10
    },
    {
      type: 'multiple-choice',
      question: 'RMgX cộng HCHO rồi thủy phân cho:',
      options: ['Ancol bậc 1', 'Ancol bậc 2', 'Ancol bậc 3', 'Axit'],
      correctAnswer: 0,
      explanation: 'Aldehyde formic cho ancol bậc 1 sau proton hoá.',
      points: 10
    },
    {
      type: 'multiple-choice',
      question: 'Halogenoankan bậc 3 thuận lợi cho:',
      options: ['SN2', 'SN1/E1', 'Phản ứng bạc', 'Trùng hợp'],
      correctAnswer: 1,
      explanation: 'Carbocation bậc 3 bền → SN1/E1 dễ.',
      points: 10
    },
    {
      type: 'true-false',
      question: 'CCl2F2 thân thiện môi trường nên dùng rộng rãi.',
      correctAnswer: false,
      explanation: 'CFC phá hủy tầng ozone, bị hạn chế theo Nghị định thư Montreal.',
      points: 10
    },
    {
      type: 'fill-in-blank',
      question: 'Phản ứng: CH3CH2Br + KOH (etanol) → ______ + KBr + H2O',
      correctAnswer: 'CH2=CH2',
      explanation: 'Môi trường base mạnh/etanol ưu tiên tách HX (E2) tạo etylen.',
      points: 10
    }
  ]
};
