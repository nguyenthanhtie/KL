// Test Gemini API
require('dotenv').config();

const apiKey = process.env.GEMINI_API_KEY;
console.log('Using Gemini API Key:', apiKey ? apiKey.slice(0, 10) + '...' : 'MISSING');

async function testGemini() {
  try {
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: `Tạo 2 câu hỏi trắc nghiệm Hóa học lớp 11 về hợp chất hữu cơ. 
Trả về ĐÚNG định dạng JSON (không có text khác):
[
  {
    "id": 1,
    "question": "Câu hỏi...",
    "options": ["A", "B", "C", "D"],
    "correctAnswer": "Đáp án đúng",
    "explanation": "Giải thích..."
  }
]`
          }]
        }],
        generationConfig: { temperature: 0.3, maxOutputTokens: 1500 }
      })
    });

    console.log('Status:', response.status);
    
    if (!response.ok) {
      const error = await response.json();
      console.error('Error:', JSON.stringify(error, null, 2));
      return;
    }

    const data = await response.json();
    const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
    
    console.log('\n=== RAW RESPONSE ===');
    console.log(text?.slice(0, 2000));
    
    // Try to parse JSON
    console.log('\n=== PARSED JSON ===');
    const jsonMatch = text.match(/\[[\s\S]*\]/);
    if (jsonMatch) {
      const questions = JSON.parse(jsonMatch[0]);
      console.log('Số câu hỏi:', questions.length);
      questions.forEach((q, i) => {
        console.log(`\n--- Câu ${i+1} ---`);
        console.log('Q:', q.question?.slice(0, 100));
        console.log('Options:', q.options?.join(' | '));
        console.log('Answer:', q.correctAnswer);
      });
      console.log('\n✅ Gemini API hoạt động tốt!');
    }
  } catch (err) {
    console.error('❌ Error:', err.message);
  }
}

testGemini();
