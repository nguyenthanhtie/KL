module.exports = {
  classId: 8,
  chapterId: 1,
  lessonId: 4,
  title: "Bài 4: Nguyên tố hóa học",
  description: "Khái niệm nguyên tố, ký hiệu hóa học, số hiệu nguyên tử",
  level: "Beginner",
  order: 4,
  theory: `
      <h2>🧬 Nguyên tố hóa học là gì?</h2>
      <p><strong>Nguyên tố hóa học</strong> là tập hợp các nguyên tử có cùng số proton (cùng số hiệu nguyên tử Z).</p>
      
      <h3>📝 Ký hiệu hóa học</h3>
      <div style="background: #f0f9ff; padding: 15px; border-left: 4px solid #0284c7; margin: 15px 0;">
        <p>Mỗi nguyên tố được ký hiệu bằng 1 hoặc 2 chữ cái viết hoa hoặc viết hoa + viết thường.</p>
        <p><strong>Ví dụ:</strong></p>
        <p>• H (Hidro) • O (Oxi) • C (Cacbon) • Fe (Sắt) • Cu (Đồng)</p>
      </div>

      <h3>🔢 Số hiệu nguyên tử (Z)</h3>
      <div style="background: #dcfce7; padding: 15px; border-left: 4px solid #16a34a; margin: 15px 0;">
        <p><strong>Z = Số proton = Số electron</strong> (trong nguyên tử trung hòa)</p>
        <p>Số hiệu nguyên tử xác định tính chất hóa học của nguyên tố.</p>
      </div>

      <h3>📊 Một số nguyên tố quan trọng</h3>
      <table style="width: 100%; border-collapse: collapse; margin: 15px 0;">
        <tr style="background: #e5e7eb;">
          <th style="border: 1px solid #9ca3af; padding: 10px;">Tên</th>
          <th style="border: 1px solid #9ca3af; padding: 10px;">Ký hiệu</th>
          <th style="border: 1px solid #9ca3af; padding: 10px;">Số hiệu Z</th>
        </tr>
        <tr><td style="border: 1px solid #9ca3af; padding: 8px;">Hidro</td><td style="border: 1px solid #9ca3af; padding: 8px;">H</td><td style="border: 1px solid #9ca3af; padding: 8px;">1</td></tr>
        <tr><td style="border: 1px solid #9ca3af; padding: 8px;">Oxi</td><td style="border: 1px solid #9ca3af; padding: 8px;">O</td><td style="border: 1px solid #9ca3af; padding: 8px;">8</td></tr>
        <tr><td style="border: 1px solid #9ca3af; padding: 8px;">Cacbon</td><td style="border: 1px solid #9ca3af; padding: 8px;">C</td><td style="border: 1px solid #9ca3af; padding: 8px;">6</td></tr>
        <tr><td style="border: 1px solid #9ca3af; padding: 8px;">Sắt</td><td style="border: 1px solid #9ca3af; padding: 8px;">Fe</td><td style="border: 1px solid #9ca3af; padding: 8px;">26</td></tr>
      </table>
    `,
  game: {
    // 🌱 CẤP ĐỘ CƠ BẢN
    basic: [
      {
            "type": "multiple-choice",
            "question": "Nguyên tố hóa học là gì?",
            "options": [
                  "Tập hợp các nguyên tử có cùng khối lượng",
                  "Tập hợp các nguyên tử có cùng số proton",
                  "Tập hợp các nguyên tử có cùng số neutron",
                  "Tập hợp các nguyên tử có cùng số electron"
            ],
            "correctAnswer": 1,
            "explanation": "✅ Nguyên tố là tập hợp các nguyên tử có cùng số proton (số hiệu Z).",
            "points": 10
      },
      {
            "type": "true-false",
            "question": "Ký hiệu hóa học của Oxi là O.",
            "correctAnswer": true,
            "explanation": "✅ Đúng! O là ký hiệu của nguyên tố Oxi.",
            "points": 10
      },
      {
            "type": "multiple-choice",
            "question": "Số hiệu nguyên tử Z là gì?",
            "options": [
                  "Số neutron",
                  "Số proton",
                  "Số electron ở lớp ngoài",
                  "Tổng số hạt"
            ],
            "correctAnswer": 1,
            "explanation": "✅ Z = số proton trong hạt nhân nguyên tử.",
            "points": 10
      },
      {
            "type": "true-false",
            "question": "Trong nguyên tử trung hòa, số proton bằng số electron.",
            "correctAnswer": true,
            "explanation": "✅ Đúng! Nguyên tử trung hòa có số proton = số electron.",
            "points": 10
      },
      {
            "type": "multiple-choice",
            "question": "Ký hiệu nào là ký hiệu hóa học đúng?",
            "options": [
                  "fe",
                  "FE",
                  "Fe",
                  "fE"
            ],
            "correctAnswer": 2,
            "explanation": "✅ Fe là ký hiệu đúng (chữ đầu viết hoa, chữ sau viết thường).",
            "points": 10
      }
],

    // 🔥 CẤP ĐỘ TRUNG BÌNH
    intermediate: [
      {
            "type": "matching",
            "question": "🔗 Ghép nguyên tố với ký hiệu",
            "pairs": [
                  {
                        "left": "Hidro",
                        "right": "H"
                  },
                  {
                        "left": "Oxi",
                        "right": "O"
                  },
                  {
                        "left": "Cacbon",
                        "right": "C"
                  },
                  {
                        "left": "Sắt",
                        "right": "Fe"
                  }
            ],
            "explanation": "✅ Tuyệt vời! Bạn đã nhớ các ký hiệu hóa học.",
            "points": 15
      },
      {
            "type": "fill-in-blank",
            "question": "Số hiệu nguyên tử Z bằng số ___ trong hạt nhân.",
            "correctAnswer": "proton",
            "hint": "💡 Loại hạt mang điện dương",
            "explanation": "✅ Z = số PROTON trong hạt nhân.",
            "points": 15
      },
      {
            "type": "multiple-choice",
            "question": "Hai nguyên tử của cùng một nguyên tố phải có cùng:",
            "options": [
                  "Số neutron",
                  "Số proton",
                  "Khối lượng",
                  "Số electron ở lớp ngoài"
            ],
            "correctAnswer": 1,
            "explanation": "✅ Cùng nguyên tố ⟹ cùng số proton (Z).",
            "points": 15
      },
      {
            "type": "fill-in-blank",
            "question": "Nguyên tử có Z = 6 thuộc nguyên tố ___.",
            "correctAnswer": "cacbon",
            "hint": "💡 Nguyên tố quan trọng trong hóa hữu cơ",
            "explanation": "✅ Z = 6 là nguyên tố CACBON (C).",
            "points": 15
      },
      {
            "type": "ordering",
            "question": "📋 Sắp xếp các nguyên tố theo số hiệu Z tăng dần",
            "options": [
                  "Oxi (Z=8)",
                  "Hidro (Z=1)",
                  "Cacbon (Z=6)",
                  "Sắt (Z=26)"
            ],
            "correctOrder": [
                  "Hidro (Z=1)",
                  "Cacbon (Z=6)",
                  "Oxi (Z=8)",
                  "Sắt (Z=26)"
            ],
            "explanation": "✅ Đúng thứ tự theo Z: H(1) < C(6) < O(8) < Fe(26).",
            "points": 15
      }
],

    // ⚡ CẤP ĐỘ NÂNG CAO
    advanced: [
      {
            "type": "drag-drop",
            "question": "🧩 Hoàn thành: Nguyên tố hóa học là tập hợp các nguyên tử có cùng số ___.",
            "inline": true,
            "slots": [
                  {
                        "id": 1,
                        "label": "Thành phần quyết định",
                        "correct": "proton"
                  }
            ],
            "options": [
                  "proton",
                  "neutron",
                  "electron",
                  "khối lượng"
            ],
            "explanation": "✅ Hoàn hảo! Cùng nguyên tố = cùng số PROTON.",
            "points": 20
      },
      {
            "type": "multiple-choice",
            "question": "Tại sao số proton quyết định tính chất hóa học của nguyên tố?",
            "options": [
                  "Vì proton nặng nhất",
                  "Vì số proton quyết định số electron, từ đó quyết định cấu hình electron",
                  "Vì proton ở ngoài cùng",
                  "Vì proton tham gia phản ứng trực tiếp"
            ],
            "correctAnswer": 1,
            "explanation": "✅ Số proton → số electron → cấu hình electron → tính chất hóa học.",
            "points": 20
      },
      {
            "type": "fill-in-blank",
            "question": "Nguyên tử có 11 proton và 12 neutron thuộc nguyên tố có Z = ___.",
            "correctAnswer": "11",
            "hint": "💡 Z = số proton",
            "explanation": "✅ Xuất sắc! Z = số proton = 11 (Natri).",
            "points": 20
      },
      {
            "type": "matching",
            "question": "🧠 Ghép Z với nguyên tố",
            "pairs": [
                  {
                        "left": "Z = 1",
                        "right": "Hidro"
                  },
                  {
                        "left": "Z = 6",
                        "right": "Cacbon"
                  },
                  {
                        "left": "Z = 8",
                        "right": "Oxi"
                  },
                  {
                        "left": "Z = 26",
                        "right": "Sắt"
                  }
            ],
            "explanation": "✅ Tuyệt vời! Bạn nhớ số hiệu các nguyên tố.",
            "points": 20
      },
      {
            "type": "multiple-choice",
            "question": "Hai nguyên tử cùng nguyên tố nhưng khác số neutron được gọi là gì?",
            "options": [
                  "Đồng vị",
                  "Đồng phân",
                  "Đồng đẳng",
                  "Đồng hình"
            ],
            "correctAnswer": 0,
            "explanation": "✅ Đồng vị: cùng Z (cùng số proton) nhưng khác số neutron.",
            "points": 20
      }
]
  }
};
