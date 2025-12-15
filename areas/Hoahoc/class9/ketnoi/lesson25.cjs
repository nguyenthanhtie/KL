module.exports = {
  classId: 9,
  curriculumType: 'ketnoi',
  chapterId: 7,
  chapterName: 'Chương 7: Giới thiệu về chất hữu cơ. Hydrocarbon và nguồn nhiên liệu',
  lessonId: 25,
  title: 'Bài 25: Nguồn nhiên liệu',
  description: 'Tổng quan nhiên liệu hoá thạch và tái tạo, ưu nhược điểm và bảo vệ môi trường.',
  level: 'Beginner',
  order: 8,
  theory: `
    <h2>🔥 Nguồn nhiên liệu &amp; môi trường</h2>
    <p style="margin:10px 0; color:#334155;">Mục tiêu: phân biệt hoá thạch – sinh học – tái tạo, hiểu ưu/nhược điểm và biện pháp giảm phát thải.</p>

    <div style="display:grid; gap:12px; grid-template-columns:repeat(auto-fit,minmax(240px,1fr)); margin:12px 0;">
      <div style="padding:14px; border:1px solid #e2e8f0; border-radius:10px; background:#f8fafc;">
        <h4 style="margin:0 0 8px; color:#0f172a;">Nhiên liệu hoá thạch</h4>
        <ul style="margin:0; padding-left:18px; color:#475569;">
          <li>Than đá, dầu mỏ, khí tự nhiên (giàu hydrocarbon).</li>
          <li>Ưu: mật độ năng lượng cao, hạ tầng sẵn.</li>
          <li>Nhược: phát thải CO₂, SO₂, NOx → mưa axit, khí nhà kính.</li>
        </ul>
      </div>
      <div style="padding:14px; border:1px solid #e2e8f0; border-radius:10px; background:#ecfeff;">
        <h4 style="margin:0 0 8px; color:#0e7490;">Nhiên liệu sinh học</h4>
        <ul style="margin:0; padding-left:18px; color:#0f172a;">
          <li>Khí sinh học (CH₄ biogas), etanol E5/E10, biodiesel.</li>
          <li>Ưu: tái tạo, giảm CO/PM khi pha xăng.</li>
          <li>Lưu ý: cần quản lí đất nông nghiệp, xử lí tạp chất.</li>
        </ul>
      </div>
    </div>

    <div style="display:grid; gap:12px; grid-template-columns:repeat(auto-fit,minmax(240px,1fr)); margin:12px 0;">
      <div style="padding:14px; border:1px solid #e2e8f0; border-radius:10px; background:#fff7ed;">
        <h4 style="margin:0 0 8px; color:#9a3412;">Năng lượng tái tạo</h4>
        <ul style="margin:0; padding-left:18px; color:#7c2d12;">
          <li>Điện mặt trời, gió, thuỷ điện, địa nhiệt.</li>
          <li>Không phát CO₂ trong vận hành, nhưng cần vật liệu/đất đai.</li>
          <li>Phù hợp kết hợp lưu trữ (pin, thuỷ điện tích năng).</li>
        </ul>
      </div>
      <div style="padding:14px; border:1px solid #e2e8f0; border-radius:10px; background:#f0f9ff;">
        <h4 style="margin:0 0 8px; color:#0f172a;">Biện pháp giảm phát thải</h4>
        <ul style="margin:0; padding-left:18px; color:#334155;">
          <li>Tăng hiệu suất thiết bị, thu hồi nhiệt.</li>
          <li>Lọc khí thải (SO₂, NOx, bụi), dùng CCS cho nguồn lớn.</li>
          <li>Chuyển dịch sang tái tạo, tiết kiệm năng lượng, giao thông sạch.</li>
        </ul>
      </div>
    </div>

    <div style="margin:14px 0; padding:14px; border-radius:12px; border:1px solid #cbd5e1; background:linear-gradient(135deg,#eef2ff,#f8fafc);">
      <h3 style="margin:0 0 8px; color:#312e81;">Bảng tóm tắt nhanh</h3>
      <ul style="margin:0; padding-left:18px; color:#334155;">
        <li><strong>Hoá thạch</strong>: năng lượng cao, phát thải lớn.</li>
        <li><strong>Sinh học</strong>: giảm CO/PM, cần xử lí tạp chất.</li>
        <li><strong>Tái tạo</strong>: sạch khi vận hành, phụ thuộc thời tiết/lưu trữ.</li>
      </ul>
    </div>

    <div style="margin:14px 0; padding:12px; border:1px dashed #cbd5e1; border-radius:10px; background:#f8fafc; color:#475569;">
      <p style="margin:0 0 6px;"><strong>Gợi ý hình</strong>:</p>
      <p style="margin:0 0 4px;">Biểu đồ phát thải CO₂ theo loại nhiên liệu: <em>/images/hoahoc9/lesson25-co2.png</em></p>
      <p style="margin:0;">Chu trình biogas: <em>/images/hoahoc9/lesson25-biogas.png</em></p>
    </div>

    <div style="margin:14px 0; padding:14px; border:1px solid #e2e8f0; border-radius:10px; background:#fff7ed;">
      <h3 style="margin:0 0 8px; color:#9a3412;">Mini quiz đọc nhanh</h3>
      <ul style="margin:0; padding-left:18px; color:#7c2d12;">
        <li>So sánh phát thải CO₂ của khí tự nhiên vs than đá.</li>
        <li>Vì sao xăng E5 giúp giảm CO và bụi?</li>
        <li>Nêu 2 biện pháp lọc khí thải nhà máy nhiệt điện than.</li>
      </ul>
      <p style="margin:8px 0 0; font-size:13px; color:#854d0e;">Tự trả lời trước khi vào bộ 10 câu trắc nghiệm.</p>
    </div>
  `,
  game: [
    {
      type: 'multiple-choice',
      question: 'Nhiên liệu hoá thạch chủ yếu chứa:',
      options: ['CO2 sẵn', 'H2O', 'Hydrocarbon', 'Kim loại'],
      correctAnswer: 2,
      explanation: 'Than, dầu, khí chứa chủ yếu hydrocarbon.'
    },
    {
      type: 'true-false',
      question: 'Khí sinh học (biogas) chủ yếu là CH4.',
      correctAnswer: true,
      explanation: 'Biogas chứa ~50-70% CH4.'
    },
    {
      type: 'multiple-choice',
      question: 'Phát thải nào gây mưa axit từ nhiên liệu hoá thạch?',
      options: ['CO2 và N2', 'SO2 và NOx', 'O2', 'He'],
      correctAnswer: 1,
      explanation: 'SO2, NOx tạo H2SO4, HNO3 trong mưa axit.'
    },
    {
      type: 'fill-in-blank',
      question: 'Năng lượng tái tạo không phát ___ trong quá trình phát điện.',
      correctAnswer: 'CO2',
      explanation: 'Điện gió, mặt trời không phát CO2 khi vận hành.'
    },
    {
      type: 'multiple-choice',
      question: 'Biodiesel thường được điều chế từ:',
      options: ['Dầu thực vật/mỡ động vật', 'Đá vôi', 'Thuỷ ngân', 'Pha lê'],
      correctAnswer: 0,
      explanation: 'Biodiesel xuất phát từ lipid (dầu thực vật/mỡ động vật) qua transester hoá.'
    },
    {
      type: 'multiple-choice',
      question: 'Than đá, dầu mỏ, khí tự nhiên đều hình thành từ:',
      options: ['Quá trình phong hoá đá', 'Sự phân huỷ sinh vật hàng triệu năm', 'Đóng hoá kim loại', 'Sự đóng băng nước biển'],
      correctAnswer: 1,
      explanation: 'Nhiên liệu hoá thạch hình thành từ tàn tích sinh vật bị chôn vùi lâu dài.'
    },
    {
      type: 'true-false',
      question: 'Ethanol có thể pha vào xăng để giảm phát thải.',
      correctAnswer: true,
      explanation: 'Xăng E5/E10 dùng etanol từ sinh khối giúp giảm CO và bụi.'
    },
    {
      type: 'fill-in-blank',
      question: 'Khi đốt nhiên liệu hoá thạch cần hạn chế ___ để giảm khí nhà kính.',
      correctAnswer: 'CO2',
      explanation: 'CO2 là khí nhà kính chính sinh ra khi đốt hydrocarbon.'
    },
    {
      type: 'multiple-choice',
      question: 'Biện pháp nào không phải năng lượng tái tạo?',
      options: ['Điện gió', 'Điện mặt trời', 'Đốt than đá', 'Thuỷ điện'],
      correctAnswer: 2,
      explanation: 'Đốt than đá là năng lượng hoá thạch, không phải tái tạo.'
    },
    {
      type: 'multiple-choice',
      question: 'Khí tự nhiên sau xử lí làm bớt mùi chủ yếu là:',
      options: ['N2', 'O2', 'CH4', 'CO2'],
      correctAnswer: 2,
      explanation: 'Thành phần chính của khí tự nhiên là metan (CH4).' 
    }
  ]
};
