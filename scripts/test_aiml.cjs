/**
 * Test AIML API connection
 */
require('dotenv').config();

const API_KEY = process.env.AIML_API_KEY;

async function testAIMLAPI() {
  console.log('Using AIML API Key:', API_KEY ? API_KEY.substring(0, 10) + '...' : 'NOT SET');
  
  if (!API_KEY) {
    console.error('❌ AIML_API_KEY not found in .env');
    return;
  }

  const prompt = `Tạo 2 câu hỏi trắc nghiệm hóa học lớp 11 về hidrocacbon.
Trả về JSON array với format:
[{"id": 1, "question": "...", "options": ["A. ...", "B. ...", "C. ...", "D. ..."], "correctAnswer": "A. ...", "explanation": "..."}]`;

  try {
    // Test with gpt-4o-mini model
    const response = await fetch('https://api.aimlapi.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${API_KEY}`
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: 'Bạn là trợ lý tạo câu hỏi Hóa học. Chỉ trả về JSON.' },
          { role: 'user', content: prompt }
        ],
        temperature: 0.3,
        max_tokens: 1500
      })
    });

    console.log('Status:', response.status);
    
    const data = await response.json();
    
    if (!response.ok) {
      console.error('❌ API Error:', data.error?.message || JSON.stringify(data));
      return;
    }

    const content = data.choices[0].message.content;
    console.log('\n=== RAW RESPONSE ===');
    console.log(content);

    // Try to parse JSON
    let cleaned = content.trim()
      .replace(/```json\s*/gi, '')
      .replace(/```\s*/g, '');
    
    const jsonMatch = cleaned.match(/\[[\s\S]*\]/);
    if (jsonMatch) {
      const questions = JSON.parse(jsonMatch[0]);
      console.log('\n=== PARSED JSON ===');
      console.log('Số câu hỏi:', questions.length);
      
      questions.forEach((q, i) => {
        console.log(`\n--- Câu ${i + 1} ---`);
        console.log('Q:', q.question);
        console.log('Options:', q.options?.join(' | '));
        console.log('Answer:', q.correctAnswer);
      });
      
      console.log('\n✅ AIML API hoạt động tốt!');
    } else {
      console.log('⚠️ Không parse được JSON từ response');
    }

  } catch (error) {
    console.error('❌ Fetch error:', error.message);
  }
}

testAIMLAPI();
