module.exports = {
  classId: 8,
  chapterId: 1,
  lessonId: 3,
  title: "Bài 3: Nguyên tử",
  description: "Cấu tạo nguyên tử: hạt nhân, lớp vỏ electron",
  level: "Beginner",
  order: 3,
  theory: `
      <h2>⚛️ Nguyên tử là gì?</h2>
      <p><strong>Nguyên tử</strong> là hạt vô cùng nhỏ, là đơn vị cấu tạo nên chất.</p>
      <p><em>Kích thước:</em> 1 nguyên tử ≈ 10⁻¹⁰ m</p>
      
      <h3>🔬 Cấu tạo nguyên tử</h3>
      <div style="background: #f0f9ff; padding: 15px; border-left: 4px solid #0284c7; margin: 15px 0;">
        <h4>1. Hạt nhân nguyên tử</h4>
        <p>• Gồm: <strong>Proton</strong> (điện tích +) và <strong>Neutron</strong> (không điện tích)</p>
        <p>• Khối lượng tập trung gần như toàn bộ ở hạt nhân</p>
      </div>
      
      <div style="background: #dcfce7; padding: 15px; border-left: 4px solid #16a34a; margin: 15px 0;">
        <h4>2. Lớp vỏ electron</h4>
        <p>• Gồm: <strong>Electron</strong> (điện tích -)</p>
        <p>• Chuyển động xung quanh hạt nhân</p>
      </div>

      <h3>⚖️ Điện tích của nguyên tử</h3>
      <p style="text-align: center; font-size: 18px; color: #0284c7;">
        <strong>Số proton (+) = Số electron (-)</strong>
      </p>
    `,
  game: {
    // 🌱 CẤP ĐỘ CƠ BẢN
    basic: [
      {
            "type": "multiple-choice",
            "question": "Nguyên tử được cấu tạo từ những gì?",
            "options": [
                  "Chỉ có hạt nhân",
                  "Chỉ có electron",
                  "Hạt nhân và lớp vỏ electron",
                  "Chỉ có proton"
            ],
            "correctAnswer": 2,
            "explanation": "✅ Nguyên tử gồm hạt nhân (proton + neutron) và lớp vỏ electron.",
            "points": 10
      },
      {
            "type": "true-false",
            "question": "Electron mang điện tích âm (-).",
            "correctAnswer": true,
            "explanation": "✅ Đúng! Electron mang điện tích âm, proton mang điện tích dương.",
            "points": 10
      },
      {
            "type": "multiple-choice",
            "question": "Hạt nào nằm trong hạt nhân nguyên tử?",
            "options": [
                  "Chỉ có proton",
                  "Proton và neutron",
                  "Chỉ có electron",
                  "Electron và neutron"
            ],
            "correctAnswer": 1,
            "explanation": "✅ Hạt nhân chứa proton (điện tích +) và neutron (không điện tích).",
            "points": 10
      },
      {
            "type": "true-false",
            "question": "Nguyên tử trung hòa về điện vì số proton bằng số electron.",
            "correctAnswer": true,
            "explanation": "✅ Đúng! Điện tích (+) của proton cân bằng với điện tích (-) của electron.",
            "points": 10
      },
      {
            "type": "multiple-choice",
            "question": "Hạt nào có khối lượng nhỏ nhất?",
            "options": [
                  "Proton",
                  "Neutron",
                  "Electron",
                  "Cả ba bằng nhau"
            ],
            "correctAnswer": 2,
            "explanation": "✅ Electron có khối lượng nhỏ nhất.",
            "points": 10
      }
],

    // 🔥 CẤP ĐỘ TRUNG BÌNH
    intermediate: [
      {
            "type": "matching",
            "question": "🔗 Ghép hạt với đặc điểm tương ứng",
            "pairs": [
                  {
                        "left": "Proton",
                        "right": "Điện tích dương (+)"
                  },
                  {
                        "left": "Neutron",
                        "right": "Không có điện tích"
                  },
                  {
                        "left": "Electron",
                        "right": "Điện tích âm (-)"
                  }
            ],
            "explanation": "✅ Tuyệt vời! Bạn đã hiểu đặc điểm của từng hạt.",
            "points": 15
      },
      {
            "type": "fill-in-blank",
            "question": "Nguyên tử trung hòa về điện vì số ___ bằng số ___.",
            "correctAnswer": "proton, electron",
            "hint": "💡 Hai loại hạt mang điện tích trái dấu",
            "explanation": "✅ Số PROTON (+) = Số ELECTRON (-).",
            "points": 15
      },
      {
            "type": "multiple-choice",
            "question": "Khối lượng nguyên tử tập trung chủ yếu ở đâu?",
            "options": [
                  "Lớp vỏ electron",
                  "Hạt nhân",
                  "Phân bố đều",
                  "Khoảng trống"
            ],
            "correctAnswer": 1,
            "explanation": "✅ Khối lượng tập trung ở hạt nhân (proton + neutron).",
            "points": 15
      },
      {
            "type": "fill-in-blank",
            "question": "Hạt nhân nguyên tử gồm hai loại hạt là ___ và ___.",
            "correctAnswer": "proton, neutron",
            "hint": "💡 Một loại mang điện +, một loại không mang điện",
            "explanation": "✅ Hạt nhân gồm PROTON và NEUTRON.",
            "points": 15
      },
      {
            "type": "ordering",
            "question": "📋 Sắp xếp các hạt theo khối lượng tăng dần",
            "options": [
                  "Electron",
                  "Proton",
                  "Neutron"
            ],
            "correctOrder": [
                  "Electron",
                  "Proton",
                  "Neutron"
            ],
            "explanation": "✅ Electron nhẹ nhất, proton và neutron nặng hơn.",
            "points": 15
      }
],

    // ⚡ CẤP ĐỘ NÂNG CAO
    advanced: [
      {
            "type": "drag-drop",
            "question": "🧩 Hoàn thành: Nguyên tử có hạt nhân chứa ___ và ___, xung quanh có ___.",
            "inline": true,
            "slots": [
                  {
                        "id": 1,
                        "label": "Hạt 1",
                        "correct": "proton"
                  },
                  {
                        "id": 2,
                        "label": "Hạt 2",
                        "correct": "neutron"
                  },
                  {
                        "id": 3,
                        "label": "Hạt 3",
                        "correct": "electron"
                  }
            ],
            "options": [
                  "proton",
                  "neutron",
                  "electron",
                  "ion"
            ],
            "explanation": "✅ Hoàn hảo! Hạt nhân có PROTON và NEUTRON, lớp vỏ có ELECTRON.",
            "points": 20
      },
      {
            "type": "multiple-choice",
            "question": "Tại sao nguyên tử có kích thước lớn nhưng khối lượng tập trung ở hạt nhân?",
            "options": [
                  "Vì electron rất nặng",
                  "Vì khoảng trống rất lớn, electron có khối lượng nhỏ",
                  "Vì hạt nhân rỗng",
                  "Vì electron không có khối lượng"
            ],
            "correctAnswer": 1,
            "explanation": "✅ Đúng! Nguyên tử phần lớn là khoảng trống, electron rất nhẹ.",
            "points": 20
      },
      {
            "type": "fill-in-blank",
            "question": "Nếu một nguyên tử có 6 proton thì sẽ có ___ electron.",
            "correctAnswer": "6",
            "hint": "💡 Số proton = số electron",
            "explanation": "✅ Xuất sắc! Phải có 6 electron để trung hòa điện.",
            "points": 20
      },
      {
            "type": "matching",
            "question": "🧠 Ghép hạt với vai trò",
            "pairs": [
                  {
                        "left": "Proton",
                        "right": "Quyết định tính chất hóa học"
                  },
                  {
                        "left": "Neutron",
                        "right": "Ảnh hưởng đến khối lượng"
                  },
                  {
                        "left": "Electron",
                        "right": "Tham gia phản ứng hóa học"
                  }
            ],
            "explanation": "✅ Tuyệt vời! Bạn hiểu vai trò của từng hạt.",
            "points": 20
      },
      {
            "type": "multiple-choice",
            "question": "Tính chất hóa học của nguyên tử do yếu tố nào quyết định?",
            "options": [
                  "Số neutron",
                  "Số proton (số hiệu nguyên tử)",
                  "Khối lượng nguyên tử",
                  "Kích thước nguyên tử"
            ],
            "correctAnswer": 1,
            "explanation": "✅ Số proton (số hiệu nguyên tử Z) quyết định tính chất hóa học.",
            "points": 20
      }
]
  }
};
