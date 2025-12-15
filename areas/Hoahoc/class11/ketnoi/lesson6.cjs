module.exports = {
  classId: 11,
  curriculumType: 'ketnoi',
  chapterId: 2,
  chapterName: 'Chương 2: Nitrogen – sulfur',
  lessonId: 6,
  title: 'Bài 6: Một số hợp chất của nitrogen với oxygen',
  description: 'NO, NO2, N2O, N2O5: cấu tạo, tính oxi hoá/khử, điều chế, ứng dụng.',
  level: 'Intermediate',
  order: 6,
  theory: `
    <h2>Hợp chất nitrogen – oxygen</h2>
    <p style="margin:8px 0; color:#334155;">So sánh cấu tạo, hoá trị, tính oxi hoá/khử và các phản ứng quan trọng của dãy oxit nitrogen.</p>

    <div style="display:grid; gap:12px; grid-template-columns:repeat(auto-fit,minmax(260px,1fr)); margin:12px 0;">
      <div style="padding:12px; border:1px solid #e2e8f0; border-radius:10px; background:#f8fafc;">
        <h4 style="margin:0 0 6px; color:#0f172a;">NO (nitric oxide)</h4>
        <ul style="margin:0; padding-left:18px; color:#475569;">
          <li>Khí không màu, tan ít; hoá nâu ngoài không khí do oxi hoá: 2NO + O2 → 2NO2.</li>
          <li>Cấu tạo: phân tử có electron lẻ (gốc tự do) → hoạt động.</li>
          <li>Tính khử nhẹ: 3Cu + 8HNO3(loãng) → 3Cu(NO3)2 + 2NO↑ + 4H2O.</li>
        </ul>
      </div>
      <div style="padding:12px; border:1px solid #e2e8f0; border-radius:10px; background:#fff7ed;">
        <h4 style="margin:0 0 6px; color:#9a3412;">NO2 / N2O4</h4>
        <ul style="margin:0; padding-left:18px; color:#7c2d12;">
          <li>NO2: khí nâu đỏ, mùi hắc; dimer hoá thuận nghịch: 2NO2 ⇌ N2O4 (khí không màu, ưu thế ở nhiệt độ thấp).</li>
          <li>Tính oxi hoá mạnh, đồng thời có tính axit: NO2 + H2O + O2 → 2HNO3.</li>
          <li>Trong phòng thí nghiệm tạo từ Cu + HNO3 đặc; công nghiệp: từ oxi hoá xúc tác NH3 (quá trình Ostwald).</li>
        </ul>
      </div>
      <div style="padding:12px; border:1px dashed #cbd5e1; border-radius:10px; background:#f8fafc; color:#475569;">
        <h4 style="margin:0 0 6px;">N2O (dinitrogen monoxide)</h4>
        <ul style="margin:0; padding-left:18px;">
          <li>Khí không màu, vị ngọt, gây mê nhẹ ("khí cười").</li>
          <li>Oxi hoá ở nhiệt độ cao: 2N2O + O2 → 2N2 + 2O2 (phân huỷ) hoặc O2 cung cấp cho đốt nhiên liệu.</li>
          <li>Điều chế: đun nóng (NH4)2NO3 cẩn thận: (NH4)2NO3 → N2O + 2H2O (tránh quá nhiệt gây nổ).</li>
        </ul>
      </div>
      <div style="padding:12px; border:1px solid #cbd5e1; border-radius:10px; background:linear-gradient(135deg,#eef2ff,#f8fafc);">
        <h4 style="margin:0 0 6px; color:#312e81;">N2O5 (dinitrogen pentoxide)</h4>
        <ul style="margin:0; padding-left:18px; color:#334155;">
          <li>Rắn trắng, hút ẩm, là anhiđrit axit của HNO3: N2O5 + H2O → 2HNO3.</li>
          <li>Tính oxi hoá rất mạnh; không bền nhiệt, phân huỷ tạo NO2 và O2.</li>
          <li>Dùng sản xuất HNO3 khan, thuốc tẩy trắng; xử lí phải khô ráo, mát.</li>
        </ul>
      </div>
    </div>

    <div style="padding:12px; border-radius:12px; border:1px solid #e2e8f0; background:#f1f5f9; color:#334155;">
      <h4 style="margin:0 0 6px; color:#0f172a;">Chuỗi phản ứng – sản xuất HNO3 (Ostwald)</h4>
      <ol style="margin:0; padding-left:20px;">
        <li>4NH3 + 5O2 (Pt, 800°C) → 4NO + 6H2O.</li>
        <li>2NO + O2 → 2NO2.</li>
        <li>4NO2 + O2 + 2H2O → 4HNO3.</li>
      </ol>
      <p style="margin:6px 0 0;">NO tái sinh trong hấp thụ, quay lại oxi hoá → tăng hiệu suất.</p>
    </div>

    <div style="padding:12px; border-radius:12px; border:1px dashed #cbd5e1; background:#fff; color:#475569; margin-top:12px;">
      <h4 style="margin:0 0 6px;">An toàn & môi trường</h4>
      <ul style="margin:0; padding-left:18px;">
        <li>NO2 độc, gây kích ứng phổi; thao tác trong tủ hút, tránh hít phải.</li>
        <li>NOx là tiền chất mưa axit, sương mù quang hoá; cần kiểm soát khí thải (SCR, hấp thụ HNO3).</li>
        <li>N2O là khí nhà kính mạnh; hạn chế rò rỉ trong y tế và công nghiệp.</li>
      </ul>
    </div>
  `,
  game: [
    {
      type: 'multiple-choice',
      question: 'Phản ứng làm NO hoá nâu ngoài không khí là:',
      options: ['2NO + O2 → 2NO2', 'NO + H2O → HNO2', 'NO + Cl2 → NOCl', '2NO → N2 + O2'],
      correctAnswer: 0,
      explanation: 'NO bị oxi hoá chậm bởi O2 thành NO2 màu nâu đỏ.',
      points: 10
    },
    {
      type: 'multiple-choice',
      question: 'Ở nhiệt độ thấp, NO2 chuyển một phần thành:',
      options: ['N2O', 'N2O4', 'NO', 'N2O5'],
      correctAnswer: 1,
      explanation: '2NO2 ⇌ N2O4, cân bằng chuyển phải khi hạ nhiệt độ.',
      points: 10
    },
    {
      type: 'true-false',
      question: 'N2O được gọi là khí cười và có thể gây mê nhẹ.',
      correctAnswer: true,
      explanation: 'N2O không màu, vị ngọt, dùng liều nhỏ gây cảm giác hưng phấn/gây mê.',
      points: 10
    },
    {
      type: 'multiple-choice',
      question: 'Anhiđrit axit của HNO3 là:',
      options: ['NO', 'N2O', 'N2O5', 'NO2'],
      correctAnswer: 2,
      explanation: 'N2O5 + H2O → 2HNO3, nên N2O5 là anhiđrit của HNO3.',
      points: 10
    },
    {
      type: 'multiple-choice',
      question: 'Bước đầu của quá trình Ostwald oxi hoá NH3 tạo:',
      options: ['NO', 'NO2', 'N2O', 'N2O5'],
      correctAnswer: 0,
      explanation: '4NH3 + 5O2 (Pt, 800°C) → 4NO + 6H2O.',
      points: 10
    },
    {
      type: 'true-false',
      question: 'NO2 là chất khử mạnh hơn NO.',
      correctAnswer: false,
      explanation: 'NO2 chủ yếu thể hiện tính oxi hoá; NO thiên về tính khử nhẹ.',
      points: 10
    },
    {
      type: 'multiple-choice',
      question: 'Tính chất nào đúng với N2O5?',
      options: ['Bền nhiệt cao', 'Tính oxi hoá mạnh, hút ẩm', 'Tạo kết tủa với BaCl2', 'Là khí nâu đỏ'],
      correctAnswer: 1,
      explanation: 'N2O5 hút ẩm, oxi hoá mạnh, phân huỷ khi đun nóng.',
      points: 10
    },
    {
      type: 'multiple-choice',
      question: 'Khi hấp thụ NO2 vào nước có oxi, sản phẩm chính là:',
      options: ['HNO2', 'HNO3', 'NH4NO3', 'N2O'],
      correctAnswer: 1,
      explanation: '4NO2 + O2 + 2H2O → 4HNO3.',
      points: 10
    },
    {
      type: 'true-false',
      question: 'N2O phát thải là một nguyên nhân gây hiệu ứng nhà kính mạnh.',
      correctAnswer: true,
      explanation: 'N2O có hệ số gây ấm cao hơn CO2 nhiều lần.',
      points: 10
    },
    {
      type: 'fill-in-blank',
      question: 'Phương trình dimer hoá: 2NO2 ⇌ ______',
      correctAnswer: 'N2O4',
      explanation: 'NO2 dimer hoá thuận nghịch tạo N2O4 không màu.',
      points: 10
    }
  ]
};
