const text = `Câu 1: Nguyên tử khối của Oxi là bao nhiêu?
A. 8 B. 16
C. 32 D. 1
Đáp án: B

Câu 2: Công thức hóa học của nước là gì? A. H2O2 B. HO2 C. H2O D. OH Đáp án: C

Câu 3:
Khí nào duy trì sự cháy?
A. Nito
B. Oxi
C. Hidro
D. CO2
Đáp án: B`;

function parse(text) {
  const qs = [];
  // Split by "Câu X:" or "X." at start of line or after newline
  const blocks = text.split(/(?=C[aâ]u\s*\d+|^\d+\.)/gmi);
  
  for (let b of blocks) {
    b = b.trim();
    if (!b) continue;
    
    // Extract answer
    const ansMatch = b.match(/(?:Đ[aá]p\s*[aá]n|ĐA|=>|Trả lời)[.:)\s]*([A-Da-d])/i);
    let ans = ansMatch ? ansMatch[1].toUpperCase() : null;
    if (ansMatch) b = b.replace(ansMatch[0], '').trim();
    
    // Extract options
    const optRegex = /([A-Da-d])[.)]\s+([^A-Da-d]*?(?=(?:[A-Da-d][.)]\s+)|$))/gi;
    const options = [];
    let qText = b;
    let firstOptIdx = b.length;
    let m;
    
    // We must reset lastIndex if we reuse regex but here it's newly created
    while ((m = optRegex.exec(b)) !== null) {
      if (firstOptIdx === b.length) firstOptIdx = m.index;
      options.push(m[2].trim());
    }
    
    if (firstOptIdx < b.length) {
      qText = b.substring(0, firstOptIdx).trim();
    }
    
    // remove Câu 1: prefix from question text
    qText = qText.replace(/^(?:C[aâ]u\s*\d+|^\d+)[.:)\/]\s*/i, '').trim();
    
    if (!qText) continue;
    
    qs.push({ 
      question: qText, 
      options, 
      correctAnswer: ans ? ans.charCodeAt(0)-65 : 0 
    });
  }
  return qs;
}

console.dir(parse(text), {depth: null});
