module.exports = {
  classId: 9,
  curriculumType: 'ketnoi',
  chapterId: 9,
  chapterName: 'Chương 9: Lipid. Carbohydrate. Protein. Polymer',
  lessonId: 32,
  title: 'Bài 32: Polime',
  description: 'Khái niệm polime, ví dụ và ứng dụng thông dụng.',
  level: 'Beginner',
  order: 15,
  theory: `
    <h2>🧵 Polime</h2>
    <p style="margin:10px 0; color:#334155;">Mục tiêu: hiểu khái niệm, phân loại, phương pháp tạo, tính chất và tác động môi trường của polime.</p>

    <div style="display:grid; gap:12px; grid-template-columns:repeat(auto-fit,minmax(240px,1fr)); margin:12px 0;">
      <div style="padding:14px; border:1px solid #e2e8f0; border-radius:10px; background:#f8fafc;">
        <h4 style="margin:0 0 8px; color:#0f172a;">Khái niệm &amp; phân loại</h4>
        <ul style="margin:0; padding-left:18px; color:#475569;">
          <li>Phân tử rất lớn từ nhiều monome lặp lại.</li>
          <li>Tự nhiên: xenlulozơ, protein, tinh bột.</li>
          <li>Nhân tạo/tổng hợp: PE, PP, PVC, PS, nylon; bán tổng hợp: cao su buna-N.</li>
        </ul>
      </div>
      <div style="padding:14px; border:1px solid #e2e8f0; border-radius:10px; background:#fff7ed;">
        <h4 style="margin:0 0 8px; color:#9a3412;">Phản ứng tạo polime</h4>
        <ul style="margin:0; padding-left:18px; color:#7c2d12;">
          <li><strong>Trùng hợp:</strong> mở liên kết đôi/ba của monome không no (CH₂=CH₂ → –CH₂–CH₂–)ₙ.</li>
          <li><strong>Trùng ngưng:</strong> monome có nhóm –COOH, –NH₂... tách nhỏ H₂O/HCl (VD: hexametylen điamin + axit adipic → nylon-6,6).</li>
          <li>Đồng trùng hợp: ghép 2+ monome khác nhau (butadien + acrylonitrin → buna-N).</li>
        </ul>
      </div>
    </div>

    <div style="display:grid; gap:12px; grid-template-columns:repeat(auto-fit,minmax(240px,1fr)); margin:12px 0;">
      <div style="padding:14px; border:1px solid #e2e8f0; border-radius:10px; background:#ecfeff;">
        <h4 style="margin:0 0 8px; color:#0e7490;">Tính chất &amp; ví dụ</h4>
        <ul style="margin:0; padding-left:18px; color:#0f172a;">
          <li>Thường bền, nhẹ, cách điện, không tan nước.</li>
          <li>PE mềm, dẻo; PVC bền, chống cháy; PS cứng, trong; cao su đàn hồi.</li>
          <li>PLA từ tinh bột: có thể phân huỷ sinh học.</li>
        </ul>
      </div>
      <div style="padding:14px; border:1px solid #e2e8f0; border-radius:10px; background:#f0f9ff;">
        <h4 style="margin:0 0 8px; color:#0f172a;">Môi trường &amp; ứng dụng</h4>
        <ul style="margin:0; padding-left:18px; color:#334155;">
          <li>Vấn đề: rác nhựa khó phân huỷ → cần tái chế, phân loại, dùng vật liệu sinh học.</li>
          <li>Ứng dụng: nhựa bao bì, sợi (nylon, polyester), cao su, keo dán, y sinh.</li>
          <li>Giải pháp: giảm dùng nhựa dùng một lần, tăng tái chế, phát triển biopolymer.</li>
        </ul>
      </div>
    </div>

    <div style="margin:14px 0; padding:14px; border-radius:12px; border:1px solid #cbd5e1; background:linear-gradient(135deg,#eef2ff,#f8fafc);">
      <h3 style="margin:0 0 8px; color:#312e81;">Bảng tóm tắt nhanh</h3>
      <ul style="margin:0; padding-left:18px; color:#334155;">
        <li>Polime = chuỗi monome; có trùng hợp, trùng ngưng, đồng trùng hợp.</li>
        <li>Tính chất: bền, nhẹ, cách điện; một số khó phân huỷ → rác nhựa.</li>
        <li>Ưu tiên tái chế, chọn vật liệu sinh học khi có thể.</li>
      </ul>
    </div>

    <div style="margin:14px 0; padding:12px; border:1px dashed #cbd5e1; border-radius:10px; background:#f8fafc; color:#475569;">
      <p style="margin:0 0 6px;"><strong>Gợi ý hình</strong>:</p>
      <p style="margin:0 0 4px;">So sánh trùng hợp vs trùng ngưng: <em>/images/hoahoc9/lesson32-polymerization.png</em></p>
      <p style="margin:0;">Vòng đời nhựa và tái chế: <em>/images/hoahoc9/lesson32-recycle.png</em></p>
    </div>

    <div style="margin:14px 0; padding:14px; border:1px solid #e2e8f0; border-radius:10px; background:#fff7ed;">
      <h3 style="margin:0 0 8px; color:#9a3412;">Mini quiz đọc nhanh</h3>
      <ul style="margin:0; padding-left:18px; color:#7c2d12;">
        <li>PE sinh ra từ monome nào và thuộc phản ứng gì?</li>
        <li>Vì sao nhựa PVC không nên đốt bừa bãi?</li>
        <li>Biện pháp nào giúp giảm rác nhựa khó phân huỷ?</li>
      </ul>
      <p style="margin:8px 0 0; font-size:13px; color:#854d0e;">Tự trả lời rồi luyện bộ trắc nghiệm.</p>
    </div>
  `,
  game: [
    {
      type: 'multiple-choice',
      question: 'Polietilen (PE) được tạo từ monome nào?',
      options: ['Etilen', 'Propylen', 'Vinyl clorua', 'Styren'],
      correctAnswer: 0,
      explanation: 'PE trùng hợp từ etilen (CH2=CH2).' 
    },
    {
      type: 'true-false',
      question: 'Xenlulozơ là polime tự nhiên.',
      correctAnswer: true,
      explanation: 'Xenlulozơ là polisaccarit tự nhiên.'
    },
    {
      type: 'multiple-choice',
      question: 'Nylon-6,6 là ví dụ polime được tạo bởi phản ứng:',
      options: ['Trùng hợp', 'Trùng ngưng', 'Điện phân', 'Ngưng tụ với kim loại'],
      correctAnswer: 1,
      explanation: 'Nylon-6,6 hình thành qua trùng ngưng giữa điamin và điacid.'
    },
    {
      type: 'fill-in-blank',
      question: 'PVC có monome là vinyl ___',
      correctAnswer: 'clorua',
      explanation: 'Monome: CH2=CHCl.'
    },
    {
      type: 'multiple-choice',
      question: 'Vấn đề môi trường của polime nhân tạo là:',
      options: ['Phát tia UV', 'Khó phân huỷ, rác thải nhựa', 'Phát mùi thơm', 'Không tồn tại'],
      correctAnswer: 1,
      explanation: 'Nhiều polime khó phân huỷ, gây ô nhiễm nhựa.'
    },
    {
      type: 'multiple-choice',
      question: 'Loại polime nào phân huỷ sinh học tốt hơn?',
      options: ['PE thông thường', 'PVC', 'PLA từ tinh bột', 'PS (xốp)'],
      correctAnswer: 2,
      explanation: 'PLA (polylactic acid) từ nguồn tái tạo có khả năng phân huỷ sinh học.'
    },
    {
      type: 'true-false',
      question: 'Trùng hợp là phản ứng ghép các monome không no thành chuỗi dài.',
      correctAnswer: true,
      explanation: 'Monome có liên kết đôi/ba được mở ra tạo polime (VD etilen → PE).' 
    },
    {
      type: 'fill-in-blank',
      question: 'Polystyren được tạo từ monome styren (C6H5-CH=CH2) qua phản ứng ___ hợp.',
      correctAnswer: 'trùng',
      explanation: 'Trùng hợp mở liên kết đôi tạo chuỗi polystyren.'
    },
    {
      type: 'multiple-choice',
      question: 'Cao su buna-N được tạo từ butadien và:',
      options: ['Etylen', 'Vinyl clorua', 'Acrylonitrin', 'Cloroform'],
      correctAnswer: 2,
      explanation: 'Buna-N là đồng trùng hợp butadien và acrylonitrin.'
    },
    {
      type: 'multiple-choice',
      question: 'Tính chất chung của đa số polime:',
      options: ['Dẫn điện tốt', 'Bền, nhẹ, dễ gia công', 'Dễ bay hơi', 'Tan tốt trong nước'],
      correctAnswer: 1,
      explanation: 'Polime thường bền, nhẹ, dễ gia công nhưng không dẫn điện và khó tan nước.'
    }
  ]
};
