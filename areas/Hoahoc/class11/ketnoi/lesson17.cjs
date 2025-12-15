module.exports = {
  classId: 11,
  curriculumType: 'ketnoi',
  chapterId: 4,
  chapterName: 'Chương 4: Hydrocarbon',
  lessonId: 17,
  title: 'Bài 17: Arene (Hydrocarbon thơm)',
  description: 'Benzen và đồng đẳng: cấu trúc vòng thơm, phản ứng thế, định hướng thế.',
  level: 'Intermediate',
  order: 17,
  theory: `
    <h2>Hiđrocacbon thơm</h2>
    <p style="margin:8px 0; color:#334155;">Nhấn mạnh tính thơm (quy tắc Hückel), phản ứng thế điện ly và quy tắc định hướng thay thế.</p>

    <div style="display:grid; gap:12px; grid-template-columns:repeat(auto-fit,minmax(260px,1fr)); margin:12px 0;">
      <div style="padding:12px; border:1px solid #e2e8f0; border-radius:10px; background:#f8fafc;">
        <h4 style="margin:0 0 6px; color:#0f172a;">Cấu trúc benzen</h4>
        <ul style="margin:0; padding-left:18px; color:#475569;">
          <li>Phẳng, sáu C lai hoá sp2, góc 120°; hệ π liên hợp vòng, 6e π thỏa Hückel (4n+2, n=1).</li>
          <li>Liên kết C–C bằng nhau (~1,39 Å), năng lượng cộng hưởng lớn → ổn định thơm.</li>
        </ul>
      </div>
      <div style="padding:12px; border:1px solid #e2e8f0; border-radius:10px; background:#fff7ed;">
        <h4 style="margin:0 0 6px; color:#9a3412;">Phản ứng đặc trưng</h4>
        <ul style="margin:0; padding-left:18px; color:#7c2d12;">
          <li>Thế electrophin (SEAr): halogen hoá (Cl2/FeCl3), nitro hoá (HNO3 đặc/H2SO4), sulfo hoá (fuming H2SO4), Friedel–Crafts (RCl/AlCl3 hoặc RCOCl/AlCl3).</li>
          <li>Hiđro hoá khó: cần Ni, t° cao → cyclohexan.</li>
          <li>Cháy toả nhiệt, muội than do C/H cao.</li>
        </ul>
      </div>
    </div>

    <div style="display:grid; gap:12px; grid-template-columns:repeat(auto-fit,minmax(260px,1fr)); margin:12px 0;">
      <div style="padding:12px; border-radius:12px; border:1px solid #cbd5e1; background:#f8fafc; color:#475569;">
        <h4 style="margin:0 0 6px;">Định hướng thế</h4>
        <ul style="margin:0; padding-left:18px;">
          <li>Nhóm hoạt hoá/đẩy e (+I, +M) định hướng ortho, para: –OH, –NH2, –CH3, –OCH3.</li>
          <li>Nhóm rút e mạnh (–NO2, –CF3, –COOH, –SO3H, –CHO) định hướng meta.</li>
          <li>Halogen rút e cảm ứng nhưng cho e liên hợp (+M) → định hướng o,p và làm giảm hoạt tính.</li>
        </ul>
      </div>
      <div style="padding:12px; border-radius:12px; border:1px solid #cbd5e1; background:linear-gradient(135deg,#eef2ff,#f8fafc); color:#334155;">
        <h4 style="margin:0 0 6px; color:#312e81;">Ứng dụng & an toàn</h4>
        <ul style="margin:0; padding-left:18px;">
          <li>Nguyên liệu hoá dầu: styren (→ polystyren), cumen (→ phenol, axeton), nitrobenzen (→ anilin).</li>
          <li>Benzen độc, dễ bay hơi; thao tác nơi thoáng, tránh hít/hấp thụ qua da.</li>
        </ul>
      </div>
    </div>
  `,
  game: [
    {
      type: 'multiple-choice',
      question: 'Điều kiện thơm của Hückel áp dụng cho benzen là:',
      options: ['4e π, phẳng', '6e π, phẳng, vòng liên hợp', '8e π, không phẳng', '10e π, vòng bị bão hoà'],
      correctAnswer: 1,
      explanation: 'Benzen có 6e π, phẳng, liên hợp, thoả 4n+2 (n=1).',
      points: 10
    },
    {
      type: 'multiple-choice',
      question: 'Chất xúc tác nitro hoá benzen:',
      options: ['FeCl3', 'H2SO4 đặc cùng HNO3', 'Ni', 'KMnO4'],
      correctAnswer: 1,
      explanation: 'Hỗn hợp HNO3 đặc/H2SO4 đặc tạo ion nitronium NO2+. ',
      points: 10
    },
    {
      type: 'true-false',
      question: 'Halogen trên vòng benzen định hướng nhóm thế mới vào vị trí ortho/para.',
      correctAnswer: true,
      explanation: 'Halogen rút e cảm ứng nhưng cho e liên hợp, nên định hướng o,p.',
      points: 10
    },
    {
      type: 'multiple-choice',
      question: 'Phản ứng Friedel–Crafts ankyl hoá cần xúc tác:',
      options: ['AlCl3', 'FeSO4', 'Ni', 'KMnO4'],
      correctAnswer: 0,
      explanation: 'AlCl3 (hoặc FeCl3) hoạt hoá halogenua ankyl tạo cation.',
      points: 10
    },
    {
      type: 'multiple-choice',
      question: 'Nhóm nào định hướng meta?',
      options: ['–CH3', '–NH2', '–OH', '–NO2'],
      correctAnswer: 3,
      explanation: '–NO2 rút e mạnh → định hướng meta.',
      points: 10
    },
    {
      type: 'true-false',
      question: 'Benzen dễ cộng Br2 giống anken khi có ánh sáng.',
      correctAnswer: false,
      explanation: 'Vòng thơm ưu tiên phản ứng thế; cộng cần điều kiện khắc nghiệt/hydrogenation.',
      points: 10
    },
    {
      type: 'multiple-choice',
      question: 'Sản phẩm chính khi brom hoá toluen (Br2/FeBr3) là:',
      options: ['p-bromotoluen và o-bromotoluen', 'm-bromotoluen', '1,3,5-tribromotoluen', 'Brom benzen'],
      correctAnswer: 0,
      explanation: '–CH3 hoạt hoá, định hướng o,p → hỗn hợp o, p ưu thế p.',
      points: 10
    },
    {
      type: 'multiple-choice',
      question: 'Hiđro hoá hoàn toàn benzen cần:',
      options: ['Ni, 25°C', 'Ni, áp suất cao, t° cao', 'KMnO4', 'Ánh sáng'],
      correctAnswer: 1,
      explanation: 'Vòng thơm bền, cần Ni/Pt, T cao, P cao để thành cyclohexan.',
      points: 10
    },
    {
      type: 'true-false',
      question: 'Benzen cháy cho nhiều muội than do tỉ lệ C/H cao.',
      correctAnswer: true,
      explanation: 'Hàm lượng C cao → dễ tạo muội khi cháy.',
      points: 10
    },
    {
      type: 'fill-in-blank',
      question: 'Ion điện li tham gia SEAr nitro hoá là ______',
      correctAnswer: 'NO2+',
      explanation: 'Ion nitronium NO2+ sinh ra từ HNO3/H2SO4.',
      points: 10
    }
  ]
};
