module.exports = {
  classId: 10,
  curriculumType: 'ketnoi',
  chapterId: 4,
  chapterName: 'Chương 4: Phản ứng oxi hóa - khử',
  lessonId: 15,
  title: 'Bài 15: Phản ứng oxi hóa - khử',
  description: 'Hiểu oxi hóa/khử, chất oxi hóa/khử, quy tắc số oxi hóa và cân bằng e.',
  level: 'Intermediate',
  order: 1,
  theory: `
    <h2>Phản ứng oxi hóa - khử</h2>
    <h3>Khái niệm & nhận diện</h3>
    <ul>
      <li>Oxi hóa: số oxi hóa (SOX) tăng → mất e. Khử: SOX giảm → nhận e.</li>
      <li>Chất oxi hóa nhận e (bị khử), chất khử nhường e (bị oxi hóa).</li>
      <li>Nhận diện bằng biến thiên SOX của nguyên tố trước/sau phản ứng.</li>
      <li>SOX nhanh: nhóm IA, IIA thường +1, +2; F = -1; O ≈ -2 (trừ trong peroxit), H = +1 (trừ khi với kim loại → -1).</li>
    </ul>
    <h3>Cân bằng phản ứng (phương pháp electron)</h3>
    <ul>
      <li>B1: Xác định nguyên tố thay đổi SOX, viết bán phản ứng oxi hóa/khử với e.</li>
      <li>B2: Nhân hệ số để e nhường = e nhận.</li>
      <li>B3: Cân bằng nguyên tử khác (H, O), cuối cùng cân bằng điện tích (thêm H2O, H+, OH- nếu môi trường dung dịch).</li>
      <li>B4: Kiểm tra nguyên tử và điện tích toàn phương trình.</li>
    </ul>
    <h3>Tác nhân thường gặp</h3>
    <ul>
      <li>Oxi hóa: KMnO4, K2Cr2O7, Cl2, O2, HNO3 đặc, H2SO4 đặc nóng.</li>
      <li>Khử: kim loại hoạt động (Zn, Fe), SO2, H2S, I-, S2O3^{2-}.</li>
    </ul>
  `,
  game: [
    {
      type: 'multiple-choice',
      question: 'Trong phản ứng 2Fe^{2+} + Cl2 → 2Fe^{3+} + 2Cl^{-}, chất oxi hóa là?',
      options: ['Fe^{2+}', 'Fe^{3+}', 'Cl2', 'Cl^{-}'],
      correctAnswer: 2,
      explanation: 'Cl2 nhận e (bị khử) nên là chất oxi hóa.',
      points: 10
    },
    {
      type: 'multiple-choice',
      question: 'Quá trình nào là oxi hóa?',
      options: ['Fe^{3+} → Fe^{2+}', 'S^{0} → S^{-2}', 'Zn → Zn^{2+}', 'Cl2 → Cl^{-}'],
      correctAnswer: 2,
      explanation: 'Zn mất e, số oxi hóa tăng từ 0 lên +2 (oxi hóa).',
      points: 10
    },
    {
      type: 'true-false',
      question: 'Tổng electron cho bằng tổng electron nhận trong phản ứng khử - oxi hóa.',
      correctAnswer: true,
      explanation: 'Nguyên tắc cân bằng e: bảo toàn điện tích/electron.',
      points: 10
    },
    {
      type: 'multiple-choice',
      question: 'SOX của O trong H2O2 là:',
      options: ['-2', '-1', '0', '+1'],
      correctAnswer: 1,
      explanation: 'Trong peroxit, O thường -1.',
      points: 10
    },
    {
      type: 'multiple-choice',
      question: 'Trong phản ứng Fe + CuSO4 → FeSO4 + Cu, chất khử là:',
      options: ['Fe', 'Cu^{2+}', 'Fe^{2+}', 'SO4^{2-}'],
      correctAnswer: 0,
      explanation: 'Fe nhường e thành Fe^{2+} → chất khử.',
      points: 10
    },
    {
      type: 'true-false',
      question: 'Chất oxi hóa là chất nhận electron.',
      correctAnswer: true,
      explanation: 'Nhận e (bị khử) nhưng làm chất khác bị oxi hóa.',
      points: 10
    },
    {
      type: 'multiple-choice',
      question: 'Bước nào KHÔNG nằm trong cân bằng e?',
      options: ['Xác định nguyên tố đổi SOX', 'Viết bán phản ứng và thêm e', 'Nhân hệ số để e cho = e nhận', 'Cộng thêm H2O tuỳ ý không kiểm tra điện tích'],
      correctAnswer: 3,
      explanation: 'Thêm H2O/H+/OH- phải để cân bằng nguyên tử và điện tích.',
      points: 10
    },
    {
      type: 'multiple-choice',
      question: 'Trong môi trường axit, để cân bằng O trong bán phản ứng, thêm:',
      options: ['H2O', 'OH-', 'H+', 'e'],
      correctAnswer: 0,
      explanation: 'Thêm H2O để bổ sung O, rồi thêm H+ để cân bằng H.',
      points: 10
    },
    {
      type: 'multiple-choice',
      question: 'SOX của N trong NO3^{-} là:',
      options: ['+3', '+4', '+5', '-1'],
      correctAnswer: 2,
      explanation: 'Tổng SOX = -1 → N + 3(-2) = -1 ⇒ N = +5.',
      points: 10
    },
    {
      type: 'true-false',
      question: 'Trong phản ứng oxi hóa - khử, số electron cho bằng số electron nhận.',
      correctAnswer: true,
      explanation: 'Nguyên tắc bảo toàn e bắt buộc khi cân bằng.',
      points: 10
    }
  ]
};
