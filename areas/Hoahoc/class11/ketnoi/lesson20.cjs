module.exports = {
  classId: 11,
  curriculumType: 'ketnoi',
  chapterId: 5,
  chapterName: 'Chương 5: Dẫn xuất halogen - alcohol - phenol',
  lessonId: 20,
  title: 'Bài 20: Alcohol',
  description: 'R–OH: phân loại mono/đa chức, no/không no, phản ứng đặc trưng.',
  level: 'Intermediate',
  order: 20,
  theory: `
    <h2>Ancol</h2>
    <p style="margin:8px 0; color:#334155;">Phân loại ancol theo bậc và số nhóm –OH, tính chất H-bond và các phản ứng đặc trưng.</p>

    <div style="display:grid; gap:12px; grid-template-columns:repeat(auto-fit,minmax(260px,1fr)); margin:12px 0;">
      <div style="padding:12px; border:1px solid #e2e8f0; border-radius:10px; background:#f8fafc;">
        <h4 style="margin:0 0 6px; color:#0f172a;">Cấu tạo & tính chất vật lí</h4>
        <ul style="margin:0; padding-left:18px; color:#475569;">
          <li>Liên kết O–H phân cực; H-bond làm tăng T sôi, độ tan (ancol mạch ngắn tan tốt).</li>
          <li>Bậc ancol: bậc 1 (–CH2OH), bậc 2 (–CHOH–), bậc 3 (–C(OH)–).</li>
          <li>Đa chức: glyxerin (propane-1,2,3-triol) sánh, hút ẩm mạnh.</li>
        </ul>
      </div>
      <div style="padding:12px; border:1px solid #e2e8f0; border-radius:10px; background:#fff7ed;">
        <h4 style="margin:0 0 6px; color:#9a3412;">Phản ứng thế & tách</h4>
        <ul style="margin:0; padding-left:18px; color:#7c2d12;">
          <li>Thế –OH: ROH + HX (ZnCl2) → RX + H2O; PCl3/SOCl2 thay –OH bằng halogen.</li>
          <li>Tách nước: 140°C (H2SO4) → ete đối xứng; 170–180°C → anken (quy tắc Zaitsev).</li>
        </ul>
      </div>
    </div>

    <div style="display:grid; gap:12px; grid-template-columns:repeat(auto-fit,minmax(260px,1fr)); margin:12px 0;">
      <div style="padding:12px; border-radius:12px; border:1px solid #cbd5e1; background:#f8fafc; color:#475569;">
        <h4 style="margin:0 0 6px;">Phản ứng oxi hoá</h4>
        <ul style="margin:0; padding-left:18px;">
          <li>Ancol bậc 1: oxi hoá nhẹ → anđehit, mạnh → axit (KMnO4/K2Cr2O7, t°, axit).</li>
          <li>Ancol bậc 2: → xeton; bậc 3: khó oxi hoá (phân huỷ mạch).</li>
        </ul>
      </div>
      <div style="padding:12px; border-radius:12px; border:1px solid #cbd5e1; background:linear-gradient(135deg,#eef2ff,#f8fafc); color:#334155;">
        <h4 style="margin:0 0 6px; color:#312e81;">Ứng dụng & sản xuất</h4>
        <ul style="margin:0; padding-left:18px;">
          <li>Ethanol: lên men tinh bột/đường; dùng làm dung môi, nhiên liệu sinh học.</li>
          <li>Metanol: tổng hợp từ CO + 2H2 (xúc tác CuO/ZnO/Cr2O3); nhiên liệu, nguyên liệu sản xuất formaldehyde.</li>
        </ul>
      </div>
    </div>
  `,
  game: [
    {
      type: 'multiple-choice',
      question: 'Ancol bậc 1 bị oxi hoá nhẹ tạo:',
      options: ['Xeton', 'Anđehit', 'Ancol bậc 2', 'Không phản ứng'],
      correctAnswer: 1,
      explanation: 'Ancol bậc 1 → anđehit (oxi hoá nhẹ).',
      points: 10
    },
    {
      type: 'multiple-choice',
      question: 'Phản ứng tách nước ở 170–180°C của ancol cho chủ yếu:',
      options: ['Ete', 'Anken', 'Axetilen', 'Halogenoankan'],
      correctAnswer: 1,
      explanation: 'Nhiệt độ cao → tách nội phân tử tạo anken.',
      points: 10
    },
    {
      type: 'true-false',
      question: 'Ancol bậc 3 khó bị oxi hoá thành xeton.',
      correctAnswer: true,
      explanation: 'Không có H α gắn với C mang –OH, bị oxi hoá sẽ phân huỷ mạch.',
      points: 10
    },
    {
      type: 'multiple-choice',
      question: 'Điều kiện thay –OH bằng Cl dùng:',
      options: ['HBr', 'SOCl2 hoặc PCl5', 'KMnO4', 'Na'],
      correctAnswer: 1,
      explanation: 'SOCl2/PCl5/PCl3 chuyển –OH thành Cl.',
      points: 10
    },
    {
      type: 'multiple-choice',
      question: 'Ethanol đun với H2SO4 đậm đặc 140°C tạo chủ yếu:',
      options: ['Eten', 'Dietyl ete', 'Metan', 'Axit axetic'],
      correctAnswer: 1,
      explanation: '140°C ưu tiên ete hoá giữa 2 phân tử etanol.',
      points: 10
    },
    {
      type: 'true-false',
      question: 'Liên kết hidro làm tăng nhiệt độ sôi của ancol.',
      correctAnswer: true,
      explanation: 'H-bond giữa phân tử nâng nhiệt độ sôi so với hiđrocacbon cùng khối lượng.',
      points: 10
    },
    {
      type: 'multiple-choice',
      question: 'Metanol công nghiệp được tổng hợp từ:',
      options: ['C + O2', 'CO + H2', 'CO2 + H2O', 'CH4 + Cl2'],
      correctAnswer: 1,
      explanation: 'Khí tổng hợp CO + 2H2 trên xúc tác Cu/ZnO/Cr2O3.',
      points: 10
    },
    {
      type: 'multiple-choice',
      question: 'Nhiệt độ sôi tăng theo dãy nào?',
      options: ['CH4 < CH3OH < H2O', 'CH3OH < CH4 < H2O', 'H2O < CH3OH < CH4', 'CH4 < H2O < CH3OH'],
      correctAnswer: 0,
      explanation: 'Do H-bond: CH4 không tạo, CH3OH tạo một, H2O tạo hai.',
      points: 10
    },
    {
      type: 'true-false',
      question: 'Glyxerin hút ẩm mạnh.',
      correctAnswer: true,
      explanation: 'Ba nhóm –OH tạo nhiều H-bond, dùng làm chất giữ ẩm.',
      points: 10
    },
    {
      type: 'fill-in-blank',
      question: 'C6H12O6 (lên men) → 2C2H5OH + 2_____',
      correctAnswer: 'CO2',
      explanation: 'Lên men rượu tạo etanol và khí CO2.',
      points: 10
    }
  ]
};
