module.exports = {
  classId: 12,
  curriculumType: 'ketnoi',
  chapterId: 2,
  chapterName: 'Chương 2: Carbohydrate',
  lessonId: 4,
  title: 'Bài 4: Giới thiệu carbohydrate. Glucose và fructose',
  description: 'Cấu tạo, tính chất hoá học cơ bản của glucose, fructose; thử Tollens/Fehling.',
  level: 'Intermediate',
  order: 4,
  theory: `
    <h2>Glucose và fructose</h2>
    <p style="margin:8px 0; color:#334155;">Hai monosaccharide quan trọng: nguồn năng lượng, chất khử, tham gia nhiều phản ứng đặc trưng của nhóm carbonyl và polyol.</p>

    <div style="display:grid; gap:12px; grid-template-columns:repeat(auto-fit,minmax(260px,1fr)); margin:12px 0;">
      <div style="padding:12px; border:1px solid #e2e8f0; border-radius:10px; background:#f8fafc;">
        <h4 style="margin:0 0 6px; color:#0f172a;">Cấu trúc & dạng tồn tại</h4>
        <ul style="margin:0; padding-left:18px; color:#475569;">
          <li>Glucose: aldose C6H12O6; tồn tại mạch hở và vòng pyranose (α/β-glucose).</li>
          <li>Fructose: ketohexose; vòng furanose chủ yếu; có thể chuyển hoá kiềm → enediol → glucose.</li>
          <li>Nhiều nhóm –OH tạo liên kết H → tan mạnh trong nước, vị ngọt.</li>
        </ul>
      </div>
      <div style="padding:12px; border:1px solid #fde68a; border-radius:10px; background:#fffbeb; color:#92400e;">
        <h4 style="margin:0 0 6px;">Tính chất hoá học</h4>
        <ul style="margin:0; padding-left:18px;">
          <li>Tính khử: tráng bạc, Fehling (glucose trực tiếp; fructose sau đồng phân hoá trong kiềm).</li>
          <li>Oxi hoá: Br<sub>2</sub> nước → gluconic; HNO3 → glucozic (mất hai đầu).</li>
          <li>Khử: NaBH4/H2 → sobitol (sorbitol) từ glucose; manitol từ fructose.</li>
          <li>Phản ứng với anhidric axetic: tạo este penta-/hexa-acetat (chứng minh có nhiều –OH). </li>
        </ul>
      </div>
      <div style="padding:12px; border:1px dashed #cbd5e1; border-radius:10px; background:#f8fafc; color:#475569;">
        <h4 style="margin:0 0 6px;">Sinh học & công nghệ</h4>
        <ul style="margin:0; padding-left:18px;">
          <li>Lên men: nấm men chuyển glucose → etanol + CO2; lên men lactic trong cơ.</li>
          <li>Ứng dụng fructose (HFCS) làm chất tạo ngọt; kiểm soát sức khoẻ (GI thấp hơn glucose).</li>
          <li>Định tính định lượng: phản ứng Molisch, Barfoed, thuốc thử Tollens/Fehling.</li>
        </ul>
      </div>
    </div>

    <div style="display:grid; gap:12px; grid-template-columns:repeat(auto-fit,minmax(260px,1fr)); margin:12px 0;">
      <div style="padding:12px; border-radius:12px; border:1px solid #cbd5e1; background:linear-gradient(135deg,#eef2ff,#f8fafc); color:#0f172a;">
        <h4 style="margin:0 0 6px;">Nhận biết nhanh</h4>
        <ul style="margin:0; padding-left:18px; color:#334155;">
          <li>Molisch: vòng hoa tím → mọi carbohydrate; Barfoed: monosaccharide khử nhanh hơn disaccharide.</li>
          <li>Cu(OH)2 ở nhiệt độ thường: tạo dung dịch xanh lam chứng tỏ nhiều –OH liền kề (đa polyol).</li>
          <li>Tollens/Fehling: glucose (+), fructose (+) sau đồng phân hoá; saccharose (–) nếu không thuỷ phân.</li>
        </ul>
      </div>
      <div style="padding:12px; border:1px dashed #cbd5e1; border-radius:10px; background:#fffaf0; color:#92400e;">
        <h4 style="margin:0 0 6px;">Sức khoẻ & dinh dưỡng</h4>
        <ul style="margin:0; padding-left:18px;">
          <li>Fructose ngọt hơn, GI thấp hơn → hấp thu chậm hơn glucose; nhưng dùng quá nhiều HFCS vẫn gây rối loạn chuyển hoá lipid.</li>
          <li>Sorbitol dùng cho thực phẩm “không đường” nhưng có thể gây nhuận tràng nếu dùng nhiều.</li>
          <li>Kiểm soát đường huyết: ưu tiên tinh bột hấp thu chậm; hạn chế dung nạp đường đơn nhanh.</li>
        </ul>
      </div>
      <div style="padding:12px; border:1px solid #e2e8f0; border-radius:10px; background:#f8fafc; color:#475569;">
        <h4 style="margin:0 0 6px;">Ôn bài tập</h4>
        <ul style="margin:0; padding-left:18px;">
          <li>Tính hiệu suất lên men: bảo toàn C và khối lượng; chú ý khí CO2 thoát.</li>
          <li>Bài tráng bạc: 1 mol glucose tạo 2 mol Ag; fructose trong kiềm → 2 Ag sau đồng phân hoá.</li>
          <li>Từ lượng HNO3 tiêu thụ khi oxi hoá hoàn toàn → suy số nhóm –CHO/–CH2OH bị oxi hoá thành –COOH.</li>
        </ul>
      </div>
    </div>
  `,
  game: [
    {
      type: 'multiple-choice',
      question: 'Trong môi trường kiềm, fructose có thể cho phản ứng tráng bạc vì:',
      options: ['Có nhóm –CHO sẵn', 'Đồng phân hoá thành glucose/aldose', 'Bị oxi hoá bởi kiềm', 'Do chứa nhóm –COOH'],
      correctAnswer: 1,
      explanation: 'Fructose chuyển thành enediol rồi thành glucose → tạo Ag gương.',
      points: 10
    },
    {
      type: 'multiple-choice',
      question: 'Sản phẩm khử hoàn toàn glucose bằng NaBH4 là:',
      options: ['Gluconic acid', 'Sorbitol', 'Gluconolacton', 'Mannitol'],
      correctAnswer: 1,
      explanation: 'NaBH4 khử nhóm –CHO → –CH2OH tạo sobitol (sorbitol).',
      points: 10
    },
    {
      type: 'true-false',
      question: 'Glucose tạo kết tủa Cu2O đỏ gạch với thuốc thử Fehling.',
      correctAnswer: true,
      explanation: 'Do tính khử của nhóm –CHO (aldose).',
      points: 10
    },
    {
      type: 'multiple-choice',
      question: 'Phản ứng chứng minh có 5 nhóm –OH trong glucose thường dùng:',
      options: ['Tollens', 'Ester hoá với anhidric axetic', 'Brom hóa', 'Nitr hoá'],
      correctAnswer: 1,
      explanation: 'Tạo penta-/hexa-axetat cho thấy nhiều nhóm –OH.',
      points: 10
    },
    {
      type: 'multiple-choice',
      question: 'Thuốc thử Barfoed phân biệt:',
      options: ['Monosaccharide khử và disaccharide khử', 'Aldose và ketose', 'Glucose và fructose', 'Tinh bột và xenlulozơ'],
      correctAnswer: 0,
      explanation: 'Monosaccharide khử Cu2+ nhanh hơn disaccharide khử.',
      points: 10
    },
    {
      type: 'true-false',
      question: 'Fructose ngọt hơn glucose.',
      correctAnswer: true,
      explanation: 'Fructose có độ ngọt cao hơn, dùng trong HFCS.',
      points: 10
    },
    {
      type: 'multiple-choice',
      question: 'Glucose tác dụng với Br2 nước tạo:',
      options: ['Gluconic acid', 'Gluconolacton', 'Sorbitol', 'CO2'],
      correctAnswer: 0,
      explanation: 'Br2 là chất oxi hoá nhẹ → axit gluconic (oxi hoá nhóm –CHO).',
      points: 10
    },
    {
      type: 'fill-in-blank',
      question: 'Phương trình lên men rượu: C6H12O6 → 2C2H5OH + 2_____',
      correctAnswer: 'CO2',
      explanation: 'Glucose lên men etylic cho ethanol và khí CO2.',
      points: 10
    },
    {
      type: 'multiple-choice',
      question: 'Dạng vòng chủ yếu của fructose trong dung dịch là:',
      options: ['Pyranose', 'Furanose', 'Cả hai như nhau', 'Không vòng'],
      correctAnswer: 1,
      explanation: 'Fructose ưu tiên tạo vòng 5 cạnh (furanose).',
      points: 10
    },
    {
      type: 'true-false',
      question: 'Glucose là chất rắn kết tinh, vị ngọt, dễ tan nước.',
      correctAnswer: true,
      explanation: 'Nhiều nhóm –OH tạo liên kết H với nước → tan tốt.',
      points: 10
    }
  ]
};
