module.exports = {
  classId: 12,
  curriculumType: 'ketnoi',
  chapterId: 3,
  chapterName: 'Chương 3: Hợp chất chứa nitrogen',
  lessonId: 8,
  title: 'Bài 8: Amine',
  description: 'Phân loại amine, tính bazơ, phản ứng thế, ankyl hoá và điều chế.',
  level: 'Intermediate',
  order: 8,
  theory: `
    <h2>Amine</h2>
    <p style="margin:8px 0; color:#334155;">Nắm cấu trúc, tính bazơ và các phản ứng đặc trưng của amine, đặc biệt anilin và dẫn xuất thơm.</p>

    <div style="display:grid; gap:12px; grid-template-columns:repeat(auto-fit,minmax(260px,1fr)); margin:12px 0;">
      <div style="padding:12px; border:1px solid #e2e8f0; border-radius:10px; background:#f8fafc;">
        <h4 style="margin:0 0 6px; color:#0f172a;">Phân loại & danh pháp</h4>
        <ul style="margin:0; padding-left:18px; color:#475569;">
          <li>Bậc 1/2/3 dựa vào số gốc alkyl/aryl gắn N; amoni bậc 4 là muối.</li>
          <li>Danh pháp: alkyl amine; anilin cho nhân thơm.</li>
          <li>Tính bazơ: amine béo > amoniac > anilin (do -M của vòng benzene).</li>
        </ul>
      </div>
      <div style="padding:12px; border:1px solid #fde68a; border-radius:10px; background:#fffbeb; color:#92400e;">
        <h4 style="margin:0 0 6px;">Tính chất & phản ứng</h4>
        <ul style="margin:0; padding-left:18px;">
          <li>Bazơ yếu, tạo muối amoni với axit; tan tốt khi proton hoá.</li>
          <li>Alkyl hoá/acyl hoá: R–X, anhiđrit/ClOCOR.</li>
          <li>Anilin dễ bị brom hoá: C6H5NH2 + 3Br2 → 2,4,6-tribromanilin (kết tủa trắng).</li>
          <li>Diazoni hoá anilin (≤5°C, HCl + NaNO2) → muối diazoni, thuận lợi cho phản ứng ghép azo.</li>
        </ul>
      </div>
      <div style="padding:12px; border:1px dashed #cbd5e1; border-radius:10px; background:#f8fafc; color:#475569;">
        <h4 style="margin:0 0 6px;">Điều chế & ứng dụng</h4>
        <ul style="margin:0; padding-left:18px;">
          <li>Khử hợp chất nitro (nitrobenzene → anilin), khử oxime, Hofmann (amide → amine bậc 1).</li>
          <li>Amine thơm: nguyên liệu thuốc nhuộm azo, dược phẩm, cao su lưu hoá.</li>
          <li>Phân tích: thử nhóm NH2 bằng nitrit/axit → khí N2 (amine bậc 1 thơm tạo muối diazoni).</li>
        </ul>
      </div>
    </div>

    <div style="display:grid; gap:12px; grid-template-columns:repeat(auto-fit,minmax(260px,1fr)); margin:12px 0;">
      <div style="padding:12px; border-radius:12px; border:1px solid #cbd5e1; background:linear-gradient(135deg,#eef2ff,#f8fafc); color:#0f172a;">
        <h4 style="margin:0 0 6px;">So sánh bazơ & phản ứng</h4>
        <ul style="margin:0; padding-left:18px; color:#334155;">
          <li>Bazơ: amine béo > NH3 > anilin; do +I alkyl vs –M vòng benzene.</li>
          <li>Alkyl hoá dễ quá đà → bậc cao; muốn dừng ở bậc 1 dùng phương pháp Gabriel/Hofmann.</li>
          <li>Anilin phản ứng điện ly kém → khi cần thế trên vòng, phải bảo vệ NH2 (acyl hoá) rồi brom hoá/chlor hoá.</li>
        </ul>
      </div>
      <div style="padding:12px; border:1px dashed #cbd5e1; border-radius:10px; background:#fffaf0; color:#92400e;">
        <h4 style="margin:0 0 6px;">Case & mẹo</h4>
        <ul style="margin:0; padding-left:18px;">
          <li>Nhận biết anilin: dung dịch Br2 → kết tủa trắng vàng tribromanilin + mất màu.</li>
          <li>Kiềm yếu: anilin tan tốt trong HCl (tạo muối), tách ra bằng NaOH; mẹo tách hỗn hợp amine béo/anilin.</li>
          <li>Muối diazoni dùng ngay ở 0–5°C; ghép azo với phenol/amine hoạt hoá tạo phẩm nhuộm.</li>
        </ul>
      </div>
      <div style="padding:12px; border:1px solid #e2e8f0; border-radius:10px; background:#f8fafc; color:#475569;">
        <h4 style="margin:0 0 6px;">Ôn bài tập</h4>
        <ul style="margin:0; padding-left:18px;">
          <li>Tính lượng AgNO2/NaNO2 cần diazoni hóa: 1 mol anilin ↔ 1 mol nitrit.</li>
          <li>Chuỗi tổng hợp: nitrobenzene → anilin (khử) → acetanilide (bảo vệ) → brom hoá → thu hydrolysis.</li>
          <li>Phân biệt bậc amine: thử Hinsberg (benzensulfonyl chloride) để tách 1°, 2°, 3°.</li>
        </ul>
      </div>
    </div>
  `,
  game: [
    {
      type: 'multiple-choice',
      question: 'Nguyên nhân anilin bazơ yếu hơn metylamin:',
      options: ['Hiệu ứng +I mạnh', 'Hiệu ứng -M của vòng benzene kéo e khỏi N', 'Do trọng lượng phân tử lớn', 'Do có nhiều NH2'],
      correctAnswer: 1,
      explanation: 'M- làm giảm mật độ e trên N, giảm khả năng nhận H+. ',
      points: 10
    },
    {
      type: 'multiple-choice',
      question: 'Thuốc thử nhận biết anilin bằng kết tủa trắng là:',
      options: ['Br2 (dung dịch)', 'AgNO3', 'Cu(OH)2', 'KMnO4'],
      correctAnswer: 0,
      explanation: 'Anilin bị brom hoá mạnh tạo 2,4,6-tribromanilin kết tủa trắng vàng.',
      points: 10
    },
    {
      type: 'true-false',
      question: 'Muối diazoni bền ở nhiệt độ phòng.',
      correctAnswer: false,
      explanation: 'Muối diazoni thơm bền ở 0–5°C, phân huỷ khi nóng.',
      points: 10
    },
    {
      type: 'multiple-choice',
      question: 'Phản ứng Hofmann cho sản phẩm chính là:',
      options: ['Amine bậc 3', 'Amine bậc 1 có số C giảm 1', 'Amide', 'Axit cacboxylic'],
      correctAnswer: 1,
      explanation: 'Khử amide bằng Br2/NaOH loại nhóm C=O, tạo amine bậc 1.',
      points: 10
    },
    {
      type: 'multiple-choice',
      question: 'Anilin tác dụng với HCl tạo:',
      options: ['Muối anilinium chloride tan', 'Kết tủa anilin', 'Anhydrit', 'Diazoni'],
      correctAnswer: 0,
      explanation: 'C6H5NH2 + HCl → C6H5NH3+Cl- tan tốt.',
      points: 10
    },
    {
      type: 'true-false',
      question: 'Axit mạnh làm giảm độ tan của muối amoni trong nước.',
      correctAnswer: false,
      explanation: 'Muối amoni tan tốt trong nước do tính ion.',
      points: 10
    },
    {
      type: 'multiple-choice',
      question: 'Phản ứng tạo azo thường bắt đầu từ:',
      options: ['Amine bậc 2', 'Muối diazoni của anilin', 'Ancol', 'Phenol'],
      correctAnswer: 1,
      explanation: 'Diazoni ghép với nhân thơm hoạt hoá (phenol/amine thơm) tạo thuốc nhuộm azo.',
      points: 10
    },
    {
      type: 'fill-in-blank',
      question: 'CH3CH2Br + NH3 dư (đun) tạo chủ yếu ______ amin.',
      correctAnswer: 'ethyl',
      explanation: 'Alkyl hoá tạo etylamin (và sản phẩm bậc cao khi NH3 không dư).',
      points: 10
    },
    {
      type: 'multiple-choice',
      question: 'Dãy giảm dần tính bazơ trong dung dịch nước:',
      options: ['Anilin > NH3 > C2H5NH2', 'C2H5NH2 > NH3 > anilin', 'NH3 > C2H5NH2 > anilin', 'Anilin > C2H5NH2 > NH3'],
      correctAnswer: 1,
      explanation: 'Hiệu ứng +I alkyl tăng bazơ, anilin yếu do -M.',
      points: 10
    },
    {
      type: 'true-false',
      question: 'Muối amoni bị NaOH giải phóng amine tự do.',
      correctAnswer: true,
      explanation: 'Bazơ mạnh tách H+ tạo amine và muối.',
      points: 10
    }
  ]
};
