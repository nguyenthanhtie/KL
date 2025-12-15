module.exports = {
  classId: 12,
  curriculumType: 'ketnoi',
  chapterId: 4,
  chapterName: 'Chương 4: Polymer',
  lessonId: 13,
  title: 'Bài 13: Vật liệu polymer',
  description: 'Ứng dụng và tính chất của nhựa, cao su, tơ sợi; môi trường và tái chế.',
  level: 'Intermediate',
  order: 13,
  theory: `
    <h2>Vật liệu polymer</h2>
    <p style="margin:8px 0; color:#334155;">Khám phá nhựa, cao su, tơ sợi – tính chất, ứng dụng và xu hướng bền vững.</p>

    <div style="display:grid; gap:12px; grid-template-columns:repeat(auto-fit,minmax(260px,1fr)); margin:12px 0;">
      <div style="padding:12px; border:1px solid #e2e8f0; border-radius:10px; background:#f8fafc;">
        <h4 style="margin:0 0 6px; color:#0f172a;">Nhựa</h4>
        <ul style="margin:0; padding-left:18px; color:#475569;">
          <li>Nhiệt dẻo: PE, PP, PVC, PS, PET – nóng chảy khi gia nhiệt, tái chế được.</li>
          <li>Nhiệt rắn: Bakelit (PF), nhựa epoxy – mạng không gian, khó tái chế, chịu nhiệt tốt.</li>
          <li>Thuộc tính: độ bền kéo, độ cứng, Tg, Tm, khả năng chống hoá chất.</li>
        </ul>
      </div>
      <div style="padding:12px; border:1px solid #fde68a; border-radius:10px; background:#fffbeb; color:#92400e;">
        <h4 style="margin:0 0 6px;">Cao su</h4>
        <ul style="margin:0; padding-left:18px;">
          <li>Thiên nhiên: polyisopren cis; lưu hoá với S tạo cầu nối –S–S– tăng đàn hồi, bền nhiệt.</li>
          <li>Tổng hợp: Buna (SBR), butyl, neopren – dùng lốp, gioăng, găng tay.</li>
          <li>Tính đàn hồi nhờ mạch dài cuộn tự do, phục hồi khi bỏ lực.</li>
        </ul>
      </div>
      <div style="padding:12px; border:1px dashed #cbd5e1; border-radius:10px; background:#f8fafc; color:#475569;">
        <h4 style="margin:0 0 6px;">Tơ sợi</h4>
        <ul style="margin:0; padding-left:18px;">
          <li>Tơ tổng hợp: nylon-6,6; tơ polyeste (PET); tơ acrylic.</li>
          <li>Tơ nhân tạo: visco, axetat từ xenlulozơ.</li>
          <li>Tính chất: bền kéo, hút ẩm (visco tốt, nylon kém), chịu nhiệt (polyester cao).</li>
        </ul>
      </div>
      <div style="padding:12px; border:1px solid #cbd5e1; border-radius:10px; background:linear-gradient(135deg,#eef2ff,#f8fafc); color:#334155;">
        <h4 style="margin:0 0 6px;">Môi trường & bền vững</h4>
        <ul style="margin:0; padding-left:18px;">
          <li>Vấn đề: vi nhựa, khó phân huỷ, phát thải khi đốt.</li>
          <li>Giải pháp: tái chế cơ học/hoá học, polymer phân huỷ sinh học (PLA), tái sử dụng.</li>
          <li>Phân loại nhựa tái chế theo ký hiệu 1–7; ưu tiên sử dụng R-PET, R-PP.</li>
        </ul>
      </div>
    </div>

    <div style="display:grid; gap:12px; grid-template-columns:repeat(auto-fit,minmax(260px,1fr)); margin:12px 0;">
      <div style="padding:12px; border-radius:12px; border:1px solid #cbd5e1; background:#f8fafc; color:#0f172a;">
        <h4 style="margin:0 0 6px;">So sánh nhanh</h4>
        <ul style="margin:0; padding-left:18px; color:#334155;">
          <li>Nhựa: đàn hồi thấp, định hình tốt; cao su: đàn hồi cao; tơ: bền kéo, dạng sợi.</li>
          <li>Nhiệt dẻo (PE/PP/PET) tái chế được; nhiệt rắn (Bakelit/epoxy) khó tái chế.</li>
          <li>Hút ẩm: visco > nylon > polyester; chịu nhiệt: polyester ≈ nylon > visco.</li>
        </ul>
      </div>
      <div style="padding:12px; border:1px dashed #cbd5e1; border-radius:10px; background:#fffaf0; color:#92400e;">
        <h4 style="margin:0 0 6px;">Case & ứng dụng</h4>
        <ul style="margin:0; padding-left:18px;">
          <li>Chọn nhựa bao bì: PET cho chai nước (trong, rào cản), PP cho hộp vi sóng (chịu nhiệt).</li>
          <li>Cao su chịu dầu: nitrile; chịu thời tiết/ozon: EPDM; găng tay y tế: latex/nitrile.</li>
          <li>Tơ may: polyester ít nhăn, nylon bền mài mòn, visco mát và hút ẩm. </li>
        </ul>
      </div>
      <div style="padding:12px; border:1px solid #e2e8f0; border-radius:10px; background:#f8fafc; color:#475569;">
        <h4 style="margin:0 0 6px;">Ôn bài tập</h4>
        <ul style="margin:0; padding-left:18px;">
          <li>Xác định loại vật liệu từ gợi ý tính chất (Tg, Tm, đàn hồi, hút ẩm).</li>
          <li>Nhận diện mã nhựa 1–7; liên hệ monomer (PET: etylen glycol + terephtalat; PS: styren).</li>
          <li>Tính % lưu hoá cao su: dựa vào lượng S thêm và khối lượng sản phẩm.</li>
        </ul>
      </div>
    </div>
  `,
  game: [
    {
      type: 'multiple-choice',
      question: 'Nhựa nhiệt dẻo có đặc điểm:',
      options: ['Không nóng chảy', 'Nóng chảy khi gia nhiệt, tái chế được', 'Luôn đàn hồi', 'Chịu nhiệt cao và không tái chế'],
      correctAnswer: 1,
      explanation: 'Nhiệt dẻo mềm chảy khi nóng, đông lại khi nguội.',
      points: 10
    },
    {
      type: 'multiple-choice',
      question: 'Cầu nối lưu hoá cao su là:',
      options: ['C–C', 'C–O', 'S–S', 'H-bond'],
      correctAnswer: 2,
      explanation: 'Lưu huá tạo cầu disulfide giữa các mạch polyisopren.',
      points: 10
    },
    {
      type: 'true-false',
      question: 'Bakelit là nhựa nhiệt rắn.',
      correctAnswer: true,
      explanation: 'Phenol-formaldehyde tạo mạng không gian không nóng chảy lại.',
      points: 10
    },
    {
      type: 'multiple-choice',
      question: 'Tơ nào có nguồn gốc từ xenlulozơ?',
      options: ['Nylon-6,6', 'Visco', 'Acrylic', 'Polyester'],
      correctAnswer: 1,
      explanation: 'Visco (rayon) từ dung dịch xenlulozơ.',
      points: 10
    },
    {
      type: 'multiple-choice',
      question: 'Nhựa PET thuộc nhóm ký hiệu tái chế:',
      options: ['1', '2', '4', '6'],
      correctAnswer: 0,
      explanation: 'PET có mã số 1 (triangular chasing arrows).',
      points: 10
    },
    {
      type: 'true-false',
      question: 'Polymer phân huỷ sinh học luôn an toàn tuyệt đối cho môi trường.',
      correctAnswer: false,
      explanation: 'Cần điều kiện thích hợp; phụ gia và sản phẩm phân huỷ vẫn phải được đánh giá.',
      points: 10
    },
    {
      type: 'multiple-choice',
      question: 'Tính đàn hồi của cao su do:',
      options: ['Mạch cứng thẳng', 'Mạch linh động cuộn xoắn', 'Liên kết ion', 'Tính kết tinh cao'],
      correctAnswer: 1,
      explanation: 'Mạch dài cuộn xoắn, khi kéo duỗi, sau đó trở lại nhờ lực đàn hồi entropy.',
      points: 10
    },
    {
      type: 'fill-in-blank',
      question: 'Nhựa polystyren có mã tái chế số ___ .',
      correctAnswer: '6',
      explanation: 'PS được ký hiệu 6.',
      points: 10
    },
    {
      type: 'multiple-choice',
      question: 'Quy trình tái chế hoá học nhắm tới:',
      options: ['Nghiền, nấu chảy', 'Phân cắt polymer về monomer/oligomer', 'Đốt lấy năng lượng', 'Chôn lấp'],
      correctAnswer: 1,
      explanation: 'Depolymerization thu monomer (ví dụ PET → BHET).',
      points: 10
    },
    {
      type: 'true-false',
      question: 'Nylon-6,6 là polyamid.',
      correctAnswer: true,
      explanation: 'Nhóm –CO–NH– lặp lại trong chuỗi.',
      points: 10
    }
  ]
};
