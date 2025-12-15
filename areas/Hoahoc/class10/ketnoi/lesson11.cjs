module.exports = {
  classId: 10,
  curriculumType: 'ketnoi',
  chapterId: 3,
  chapterName: 'Chương 3: Liên kết hóa học',
  lessonId: 11,
  title: 'Bài 11: Liên kết ion',
  description: 'Liên kết ion: hình thành, tính chất tinh thể, điều kiện tạo thành.',
  level: 'Beginner',
  order: 2,
  theory: `
    <h2>Liên kết ion</h2>
    <p style="margin:10px 0; color:#334155;">Mục tiêu: hiểu điều kiện hình thành, đặc điểm tinh thể ion, yếu tố ảnh hưởng độ bền (lattice) và tính tan/dẫn điện.</p>

    <div style="display:grid; gap:12px; grid-template-columns:repeat(auto-fit,minmax(250px,1fr)); margin:12px 0;">
      <div style="padding:12px; border:1px solid #e2e8f0; border-radius:10px; background:#f8fafc;">
        <h4 style="margin:0 0 6px; color:#0f172a;">Hình thành</h4>
        <ul style="margin:0; padding-left:18px; color:#475569;">
          <li>Kim loại (ΔEN thấp) nhường e → cation; phi kim nhận e → anion.</li>
          <li>Lực hút tĩnh điện đa hướng giữa ion trái dấu tạo mạng tinh thể ion (không hướng).</li>
          <li>Tỉ lệ ion theo hoá trị tối giản: NaCl 1:1, CaCl2 1:2, Al2O3 2:3.</li>
        </ul>
      </div>
      <div style="padding:12px; border:1px solid #e2e8f0; border-radius:10px; background:#fff7ed;">
        <h4 style="margin:0 0 6px; color:#9a3412;">Tính chất chính</h4>
        <ul style="margin:0; padding-left:18px; color:#7c2d12;">
          <li>Rắn kết tinh, nóng chảy/sôi cao, giòn (trượt lớp → ion cùng dấu đẩy nhau).</li>
          <li>Tan tốt trong dung môi phân cực (H2O); dẫn điện khi nóng chảy/hoà tan do ion tự do.</li>
          <li>Không dẫn điện ở trạng thái rắn (ion cố định). Không bay hơi dễ.</li>
        </ul>
      </div>
    </div>

    <div style="display:grid; gap:12px; grid-template-columns:repeat(auto-fit,minmax(260px,1fr)); margin:12px 0;">
      <div style="padding:12px; border-radius:12px; border:1px solid #cbd5e1; background:linear-gradient(135deg,#eef2ff,#f8fafc);">
        <h4 style="margin:0 0 6px; color:#312e81;">Độ bền mạng (lattice energy)</h4>
        <ul style="margin:0; padding-left:18px; color:#334155;">
          <li>Điện tích ion lớn, bán kính nhỏ → lực hút mạnh → bền hơn (MgO > NaCl).</li>
          <li>Độ bền tăng → nhiệt độ nóng chảy cao, ít tan hơn.</li>
        </ul>
      </div>
      <div style="padding:12px; border:1px dashed #cbd5e1; border-radius:10px; background:#f8fafc; color:#475569;">
        <h4 style="margin:0 0 6px;">Tránh nhầm lẫn</h4>
        <ul style="margin:0; padding-left:18px;">
          <li>Liên kết ion không chia sẻ cặp e (khác cộng hoá trị).</li>
          <li>Chất ion rắn không dẫn; cần ion di động (nóng chảy hoặc dung dịch).</li>
          <li>Muối ít tan (BaSO4, CaCO3) vẫn là ion, chỉ khác độ tan do năng lượng mạng/hydrat hóa.</li>
        </ul>
      </div>
    </div>
  `,
  game: [
    {
      type: 'multiple-choice',
      question: 'Chất nào chủ yếu có liên kết ion?',
      options: ['CO2', 'H2O', 'NaCl', 'NH3'],
      correctAnswer: 2,
      explanation: 'NaCl tạo từ Na+ và Cl- → liên kết ion điển hình.',
      points: 10
    },
    {
      type: 'multiple-choice',
      question: 'Đặc điểm nào đúng với tinh thể ion?',
      options: ['Dẫn điện ở trạng thái rắn', 'Dễ bay hơi', 'Nóng chảy cao', 'Mềm, dễ uốn'],
      correctAnswer: 2,
      explanation: 'Liên kết ion mạnh → mạng tinh thể bền, nhiệt độ nóng chảy cao.',
      points: 10
    },
    {
      type: 'true-false',
      question: 'Liên kết ion hình thành do chia sẻ electron.',
      correctAnswer: false,
      explanation: 'Liên kết ion do trao đổi e tạo ion trái dấu, không dùng chung e.',
      points: 10
    },
    {
      type: 'multiple-choice',
      question: 'Điều kiện thuận lợi hình thành liên kết ion:',
      options: ['Hai phi kim gần nhau', 'Phi kim với kim loại có ΔEN lớn', 'Hai kim loại kiềm', 'Hai phi kim giống EN'],
      correctAnswer: 1,
      explanation: 'Chênh lệch độ âm điện lớn thúc đẩy trao đổi e.',
      points: 10
    },
    {
      type: 'multiple-choice',
      question: 'Tỉ lệ ion trong Al2O3 là:',
      options: ['1 Al3+ : 1 O2-', '2 Al3+ : 3 O2-', '2 Al3+ : 3 O−', '3 Al3+ : 2 O2-'],
      correctAnswer: 3,
      explanation: 'Điện tích cân bằng: 2 Al3+ (6+) và 3 O2- (6-).',
      points: 10
    },
    {
      type: 'multiple-choice',
      question: 'Chất nào dẫn điện trong dung dịch nhưng không ở trạng thái rắn?',
      options: ['NaCl', 'Cu', 'S', 'C (graphit)'],
      correctAnswer: 0,
      explanation: 'Tinh thể ion dẫn điện khi nóng chảy/hoà tan do ion tự do.',
      points: 10
    },
    {
      type: 'true-false',
      question: 'Liên kết ion không có hướng rõ rệt.',
      correctAnswer: true,
      explanation: 'Lực hút tĩnh điện đa hướng trong mạng tinh thể.',
      points: 10
    },
    {
      type: 'multiple-choice',
      question: 'Hiện tượng “giòn” của tinh thể ion do:',
      options: ['Các lớp ion dễ trượt làm cùng dấu gần nhau, đẩy nhau', 'Mạng liên kết kim loại', 'Không có lực hút tĩnh điện', 'Nhiệt độ nóng chảy thấp'],
      correctAnswer: 0,
      explanation: 'Trượt làm các ion cùng dấu tiếp xúc → đẩy mạnh → vỡ.',
      points: 10
    },
    {
      type: 'multiple-choice',
      question: 'Ví dụ phản ứng tạo liên kết ion:',
      options: ['2Na + Cl2 → 2NaCl', 'H2 + Cl2 → 2HCl', 'C + O2 → CO2', 'N2 + 3H2 → 2NH3'],
      correctAnswer: 0,
      explanation: 'NaCl là muối ion tạo từ Na và Cl2.',
      points: 10
    },
    {
      type: 'multiple-choice',
      question: 'Liên kết ion bền nhờ:',
      options: ['Lực hút tĩnh điện giữa ion trái dấu', 'Dùng chung cặp e', 'Liên kết kim loại', 'Lực van der Waals'],
      correctAnswer: 0,
      explanation: 'Bản chất là lực hút Coulomb giữa cation và anion.',
      points: 10
    }
  ]
};
