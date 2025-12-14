module.exports = {
  classId: 8,
  curriculumType: 'ketnoi',
  chapterId: 1,
  lessonId: 2,
  title: 'Nguyên tử',
  theory: `
    <h2>Bài 2: Nguyên tử</h2>
    
    <h3>1. Cấu tạo nguyên tử</h3>
    <p>Nguyên tử gồm:</p>
    <ul>
      <li><strong>Hạt nhân</strong> (ở tâm): chứa proton (+) và neutron (không mang điện)</li>
      <li><strong>Vỏ nguyên tử</strong>: chứa electron (-) chuyển động xung quanh hạt nhân</li>
    </ul>
    
    <h3>2. Đặc điểm của nguyên tử</h3>
    <ul>
      <li>Nguyên tử trung hòa về điện: số proton = số electron</li>
      <li>Khối lượng nguyên tử tập trung ở hạt nhân (proton và neutron)</li>
      <li>Kích thước nguyên tử rất nhỏ: khoảng 10⁻¹⁰ m</li>
    </ul>
    
    <h3>3. Số hiệu nguyên tử (Z)</h3>
    <p>Số hiệu nguyên tử = Số proton = Số electron (trong nguyên tử trung hòa)</p>
    
    <h3>4. Khối lượng nguyên tử</h3>
    <p>Đơn vị khối lượng nguyên tử: u (unified atomic mass unit)</p>
    <p>1u = 1/12 khối lượng của nguyên tử carbon-12</p>
    <p><strong>Khối lượng nguyên tử ≈ Số proton + Số neutron</strong></p>
    
    <div class="example">
      <h4>Ví dụ:</h4>
      <p>Nguyên tử oxygen có 8 proton, 8 neutron, 8 electron</p>
      <p>→ Số hiệu nguyên tử Z = 8</p>
      <p>→ Khối lượng nguyên tử ≈ 8 + 8 = 16u</p>
    </div>
  `,
  game: [
    {
      question: 'Hạt nhân nguyên tử gồm những hạt nào?',
      options: ['Proton và electron', 'Proton và neutron', 'Neutron và electron', 'Chỉ có proton'],
      correctAnswer: 1
    },
    {
      question: 'Nguyên tử trung hòa về điện vì:',
      options: ['Không có điện tích', 'Số proton = số neutron', 'Số proton = số electron', 'Số electron = số neutron'],
      correctAnswer: 2
    },
    {
      question: 'Số hiệu nguyên tử bằng:',
      options: ['Số neutron', 'Số proton', 'Số proton + số neutron', 'Số electron - số proton'],
      correctAnswer: 1
    },
    {
      question: 'Nguyên tử nitrogen có 7 proton, 7 neutron. Số electron của nguyên tử nitrogen là:',
      options: ['7', '14', '21', '0'],
      correctAnswer: 0
    },
    {
      question: 'Khối lượng nguyên tử tập trung chủ yếu ở đâu?',
      options: ['Vỏ nguyên tử', 'Hạt nhân', 'Electron', 'Toàn bộ nguyên tử'],
      correctAnswer: 1
    }
  ]
};
