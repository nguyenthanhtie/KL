module.exports = {
  classId: 8,
  curriculumType: 'chantroicangtao',
  chapterId: 1,
  lessonId: 2,
  title: 'Bài 2: Biến đổi vật lí và biến đổi hóa học',
  theory: `
    <h2>🔍 Bài 2: Biến đổi vật lí và biến đổi hóa học</h2>
    <p style="margin:10px 0; color:#334155;">Mục tiêu: phân biệt biến đổi vật lí/hóa học, nắm dấu hiệu nhận biết và ví dụ thực tế.</p>

    <div style="display:grid; gap:12px; grid-template-columns:repeat(auto-fit,minmax(240px,1fr)); margin:14px 0;">
      <div style="padding:12px; border:1px solid #e2e8f0; border-radius:10px; background:#f8fafc;">
        <h4 style="margin:0 0 8px; color:#0f172a;">Biến đổi vật lí</h4>
        <ul style="margin:0; padding-left:18px; color:#475569;">
          <li>Thay đổi hình dạng, trạng thái, kích thước.</li>
          <li><strong>Không tạo chất mới.</strong></li>
          <li>Ví dụ: nước đá tan, nước bay hơi, uốn dây đồng.</li>
        </ul>
      </div>
      <div style="padding:12px; border:1px solid #e2e8f0; border-radius:10px; background:#fff7ed;">
        <h4 style="margin:0 0 8px; color:#9a3412;">Biến đổi hóa học</h4>
        <ul style="margin:0; padding-left:18px; color:#7c2d12;">
          <li>Có chất mới sinh ra.</li>
          <li>Dấu hiệu: khí, kết tủa, đổi màu, tỏa/thu nhiệt, mùi mới.</li>
          <li>Ví dụ: sắt gỉ, gỗ cháy, Zn + HCl → ZnCl₂ + H₂.</li>
        </ul>
      </div>
    </div>

    <div style="margin:16px 0; padding:14px; border-radius:12px; border:1px solid #cbd5e1; background:linear-gradient(135deg,#eef2ff,#f8fafc);">
      <h3 style="margin:0 0 8px; color:#312e81;">Nhận biết nhanh phản ứng hóa học</h3>
      <ul style="margin:0; padding-left:18px; color:#334155;">
        <li>Xuất hiện chất mới (dấu hiệu cốt lõi).</li>
        <li>Đổi màu dung dịch (vd: quỳ tím đổi đỏ/xanh).</li>
        <li>Sủi bọt khí, có mùi đặc trưng.</li>
        <li>Hình thành kết tủa (AgCl↓, CaCO₃↓...).</li>
        <li>Tỏa/thu nhiệt, phát sáng.</li>
      </ul>
    </div>

    <div style="margin:14px 0; display:grid; gap:12px; grid-template-columns:repeat(auto-fit,minmax(240px,1fr));">
      <div style="padding:12px; border:1px solid #e2e8f0; border-radius:10px; background:#ecfeff;">
        <h4 style="margin:0 0 8px; color:#0e7490;">Ví dụ minh họa</h4>
        <ul style="margin:0; padding-left:18px; color:#0f172a;">
          <li><strong>Vật lí:</strong> Nước đá → nước (chỉ đổi trạng thái).</li>
          <li><strong>Hóa học:</strong> 2Mg + O₂ → 2MgO (cháy sáng, tạo chất mới).</li>
          <li><strong>Hóa học:</strong> AgNO₃ + NaCl → AgCl↓ + NaNO₃ (kết tủa trắng).</li>
        </ul>
      </div>
      <div style="padding:12px; border:1px solid #e2e8f0; border-radius:10px; background:#f0f9ff;">
        <h4 style="margin:0 0 8px; color:#0f172a;">Mini quiz đọc nhanh</h4>
        <ol style="margin:0; padding-left:18px; color:#334155;">
          <li>Tiêu chí chính để phân biệt biến đổi vật lí/hóa học?</li>
          <li>Hiện tượng nào gợi ý phản ứng hóa học?</li>
          <li>Đốt gỗ là biến đổi gì? Vì sao?</li>
        </ol>
        <p style="margin:8px 0 0; font-size:13px; color:#475569;">Tự trả lời trước khi làm test 10 câu.</p>
      </div>
    </div>

    <div style="margin:16px 0; padding:12px; border:1px dashed #cbd5e1; border-radius:10px; background:#f8fafc; text-align:center; color:#475569;">
      <p style="margin:0 0 6px;"><strong>Placeholder hình/sơ đồ</strong>:</p>
      <p style="margin:0 0 4px;">Sơ đồ so sánh biến đổi vật lí/hóa học: <em>/images/hoahoc/lesson2-compare.png</em></p>
      <p style="margin:0;">Bảng dấu hiệu phản ứng: <em>/images/hoahoc/lesson2-signs.png</em></p>
    </div>
  `,
  game: [
    {
      question: 'Tiêu chí quan trọng nhất để nhận biết biến đổi hóa học là:',
      options: ['Có chất mới tạo thành', 'Chỉ đổi trạng thái', 'Chỉ thay đổi kích thước', 'Chỉ cần khuấy'],
      correctAnswer: 0
    },
    {
      question: 'Nước đá tan là:',
      options: ['Biến đổi hóa học', 'Biến đổi vật lí', 'Phản ứng oxi hóa', 'Trao đổi ion'],
      correctAnswer: 1
    },
    {
      question: 'Dấu hiệu không đặc trưng cho phản ứng hóa học là:',
      options: ['Kết tủa', 'Khí thoát ra', 'Đổi màu', 'Thay đổi hình dạng do cắt gọt'],
      correctAnswer: 3
    },
    {
      question: 'Phản ứng Zn + 2HCl → ZnCl₂ + H₂ có hiện tượng:',
      options: ['Khí thoát ra', 'Đổi trạng thái rắn → lỏng', 'Chỉ cô đặc dung dịch', 'Không có gì'],
      correctAnswer: 0
    },
    {
      question: 'Đốt gỗ là biến đổi:',
      options: ['Vật lí', 'Hóa học vì tạo chất mới và tỏa nhiệt', 'Không đổi', 'Chỉ bay hơi nước'],
      correctAnswer: 1
    },
    {
      question: 'Kéo sợi đồng dài ra là biến đổi:',
      options: ['Hóa học', 'Vật lí', 'Oxi hóa', 'Trao đổi'],
      correctAnswer: 1
    },
    {
      question: 'Sắt gỉ ngoài trời là biến đổi:',
      options: ['Vật lí', 'Hóa học (tạo oxit sắt mới)', 'Không đổi', 'Hòa tan vật lí'],
      correctAnswer: 1
    },
    {
      question: 'Dấu hiệu nào gợi ý phản ứng trao đổi ion đã xảy ra?',
      options: ['Chỉ đổi trạng thái rắn → lỏng', 'Xuất hiện kết tủa hoặc khí', 'Không màu → có màu', 'Cô đặc dung dịch'],
      correctAnswer: 1
    },
    {
      question: 'Phản ứng 2Mg + O₂ → 2MgO có đặc điểm:',
      options: ['Tỏa nhiệt, phát sáng, tạo chất mới', 'Chỉ biến đổi vật lí', 'Không có hiện tượng', 'Thay đổi hình dạng'],
      correctAnswer: 0
    },
    {
      question: 'Khi dung dịch đổi màu, có khí xì ra, đây là dấu hiệu:',
      options: ['Đã cô đặc', 'Có phản ứng hóa học xảy ra', 'Chỉ nguội đi', 'Chỉ hòa tan vật lí'],
      correctAnswer: 1
    }
  ]
};
