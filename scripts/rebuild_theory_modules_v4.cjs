/**
 * Script rebuild theoryModules - v4: Xử lý cả H3+list không trong box
 * Chạy: node scripts/rebuild_theory_modules_v4.cjs
 */

const fs = require('fs');
const path = require('path');

// Giữ lại inline formatting
function preserveInlineFormatting(html) {
  if (!html) return '';
  return html
    .replace(/&nbsp;/g, ' ')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/<(strong|b)>(.*?)<\/\1>/gi, '**$2**')
    .replace(/<(em|i)>(.*?)<\/\1>/gi, '*$2*')
    .replace(/<sub>(.*?)<\/sub>/gi, '₍$1₎')
    .replace(/<sup>(.*?)<\/sup>/gi, '⁽$1⁾')
    .replace(/<[^>]*>/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

// Xác định box type từ style
function detectBoxType(style) {
  if (!style) return { type: 'infoBox', color: 'blue' };
  const s = style.toLowerCase();
  
  if (s.includes('#fff7ed') || s.includes('#9a3412') || s.includes('#7c2d12')) 
    return { type: 'warningBox', color: 'orange' };
  if (s.includes('#f0fdf4') || s.includes('#14532d') || s.includes('#166534') || s.includes('dcfce7'))
    return { type: 'tipBox', color: 'green' };
  if (s.includes('#eff6ff') || s.includes('#1d4ed8') || s.includes('#1e3a8a') || s.includes('#dbeafe') || s.includes('#f0f9ff'))
    return { type: 'infoBox', color: 'blue' };
  if (s.includes('linear-gradient') || s.includes('#eef2ff') || s.includes('#312e81'))
    return { type: 'infoBox', color: 'purple' };
  if (s.includes('#fef2f2') || s.includes('#dc2626'))
    return { type: 'warningBox', color: 'red' };
  if (s.includes('#f8fafc') || s.includes('#f9fafb'))
    return { type: 'infoBox', color: 'gray' };
  
  return { type: 'infoBox', color: 'blue' };
}

// Parse HTML thành modules - xử lý theo thứ tự xuất hiện
function parseHtmlToModules(html) {
  if (!html || typeof html !== 'string') return [];
  
  const modules = [];
  let moduleId = 1;
  const createId = () => `mod-${moduleId++}`;
  
  // Tìm tất cả elements với vị trí của chúng
  const elements = [];
  
  // 1. Tìm H2 (tiêu đề chính)
  const h2Regex = /<h2[^>]*>(.*?)<\/h2>/gi;
  let match;
  while ((match = h2Regex.exec(html)) !== null) {
    elements.push({
      index: match.index,
      type: 'heading',
      level: 'h2',
      text: preserveInlineFormatting(match[1])
    });
  }
  
  // 2. Tìm các div boxes (có padding và background)
  const boxRegex = /<div\s+style="([^"]*padding[^"]*(?:background|border)[^"]*)"[^>]*>([\s\S]*?)<\/div>/gi;
  while ((match = boxRegex.exec(html)) !== null) {
    const style = match[1];
    const content = match[2];
    
    // Bỏ qua grid containers
    if (style.includes('display:grid') || style.includes('gap:') && !style.includes('padding:14')) continue;
    
    // Tìm title (h3/h4 trong box)
    const h3Match = content.match(/<h3[^>]*>(.*?)<\/h3>/is);
    const h4Match = content.match(/<h4[^>]*>(.*?)<\/h4>/is);
    const title = h3Match ? preserveInlineFormatting(h3Match[1]) : 
                  h4Match ? preserveInlineFormatting(h4Match[1]) : '';
    
    // Tìm list items
    const items = [];
    const liRegex = /<li[^>]*>(.*?)<\/li>/gi;
    let liMatch;
    while ((liMatch = liRegex.exec(content)) !== null) {
      const itemText = preserveInlineFormatting(liMatch[1]);
      if (itemText) items.push(itemText);
    }
    
    const isNumberedList = /<ol[^>]*>/i.test(content);
    
    // Tìm paragraphs (không phải trong list)
    const paragraphs = [];
    const contentNoList = content.replace(/<[ou]l[^>]*>[\s\S]*?<\/[ou]l>/gi, '');
    const pRegex = /<p[^>]*>(.*?)<\/p>/gi;
    let pMatch;
    while ((pMatch = pRegex.exec(contentNoList)) !== null) {
      const pText = preserveInlineFormatting(pMatch[1]);
      if (pText && pText.length > 5) paragraphs.push(pText);
    }
    
    if (title || items.length > 0 || paragraphs.length > 0) {
      const boxInfo = detectBoxType(style);
      let contentText = items.join('\n');
      if (paragraphs.length > 0) {
        if (contentText) contentText += '\n';
        contentText += paragraphs.join('\n');
      }
      
      elements.push({
        index: match.index,
        type: 'box',
        boxType: boxInfo.type,
        title,
        content: contentText,
        color: boxInfo.color,
        listType: isNumberedList ? 'number' : 'bullet'
      });
    }
  }
  
  // 3. Tìm H3 KHÔNG nằm trong div box (standalone sections)
  // Đánh dấu vị trí các boxes
  const boxPositions = elements.filter(e => e.type === 'box').map(e => e.index);
  
  const h3Regex = /<h3[^>]*>(.*?)<\/h3>/gi;
  while ((match = h3Regex.exec(html)) !== null) {
    // Kiểm tra xem H3 này có nằm trong box không
    const h3Index = match.index;
    let isInsideBox = false;
    
    // Tìm ngược lại xem có div mở trước H3 không
    const beforeH3 = html.substring(0, h3Index);
    const lastDivStart = beforeH3.lastIndexOf('<div style="');
    if (lastDivStart !== -1) {
      // Kiểm tra xem div này đã đóng chưa
      const betweenText = html.substring(lastDivStart, h3Index);
      const divOpenCount = (betweenText.match(/<div/g) || []).length;
      const divCloseCount = (betweenText.match(/<\/div>/g) || []).length;
      if (divOpenCount > divCloseCount) {
        // H3 nằm trong div
        const divStyle = html.substring(lastDivStart).match(/style="([^"]*)"/);
        if (divStyle && (divStyle[1].includes('padding') || divStyle[1].includes('background'))) {
          isInsideBox = true;
        }
      }
    }
    
    if (!isInsideBox) {
      // Đây là H3 standalone - tìm ul/ol theo sau
      const afterH3 = html.substring(match.index + match[0].length);
      const nextListMatch = afterH3.match(/^\s*(<[ou]l[^>]*>[\s\S]*?<\/[ou]l>)/i);
      
      if (nextListMatch) {
        const items = [];
        const liRegex = /<li[^>]*>(.*?)<\/li>/gi;
        let liMatch;
        while ((liMatch = liRegex.exec(nextListMatch[1])) !== null) {
          const itemText = preserveInlineFormatting(liMatch[1]);
          if (itemText) items.push(itemText);
        }
        
        const isNumberedList = /<ol[^>]*>/i.test(nextListMatch[1]);
        
        elements.push({
          index: match.index,
          type: 'box',
          boxType: 'infoBox',
          title: preserveInlineFormatting(match[1]),
          content: items.join('\n'),
          color: 'blue',
          listType: isNumberedList ? 'number' : 'bullet'
        });
      } else {
        // H3 không có list theo sau - chỉ là heading
        elements.push({
          index: match.index,
          type: 'heading',
          level: 'h3',
          text: preserveInlineFormatting(match[1])
        });
      }
    }
  }
  
  // 4. Tìm paragraphs ở top level (có style margin, không trong box)
  const pRegex = /<p\s+style="[^"]*margin[^"]*"[^>]*>(.*?)<\/p>/gi;
  while ((match = pRegex.exec(html)) !== null) {
    const pIndex = match.index;
    
    // Kiểm tra có nằm trong box không
    let isInsideBox = false;
    const beforeP = html.substring(0, pIndex);
    const lastDivStart = beforeP.lastIndexOf('<div style="');
    if (lastDivStart !== -1) {
      const betweenText = html.substring(lastDivStart, pIndex);
      const divOpenCount = (betweenText.match(/<div/g) || []).length;
      const divCloseCount = (betweenText.match(/<\/div>/g) || []).length;
      if (divOpenCount > divCloseCount) {
        const divStyle = html.substring(lastDivStart).match(/style="([^"]*)"/);
        if (divStyle && (divStyle[1].includes('padding') || divStyle[1].includes('background'))) {
          isInsideBox = true;
        }
      }
    }
    
    if (!isInsideBox) {
      const text = preserveInlineFormatting(match[1]);
      if (text && text.length > 10) {
        elements.push({
          index: match.index,
          type: 'paragraph',
          text
        });
      }
    }
  }
  
  // Sort theo vị trí
  elements.sort((a, b) => a.index - b.index);
  
  // Remove duplicates (cùng index)
  const seen = new Set();
  const uniqueElements = elements.filter(el => {
    const key = `${el.index}-${el.type}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
  
  // Convert sang modules
  for (const el of uniqueElements) {
    if (el.type === 'heading') {
      modules.push({
        id: createId(),
        type: 'heading',
        content: { text: el.text, level: el.level }
      });
    } else if (el.type === 'paragraph') {
      modules.push({
        id: createId(),
        type: 'paragraph',
        content: { text: el.text }
      });
    } else if (el.type === 'box') {
      modules.push({
        id: createId(),
        type: el.boxType,
        content: {
          title: el.title,
          content: el.content,
          color: el.color,
          listType: el.listType
        }
      });
    }
  }
  
  return modules;
}

// Format modules thành JS string
function formatModules(modules) {
  if (modules.length === 0) return '[]';
  
  const lines = ['['];
  
  for (let i = 0; i < modules.length; i++) {
    const mod = modules[i];
    lines.push('    {');
    lines.push(`        id: '${mod.id}',`);
    lines.push(`        type: '${mod.type}',`);
    lines.push('        content: {');
    
    const contentKeys = Object.keys(mod.content);
    for (let j = 0; j < contentKeys.length; j++) {
      const key = contentKeys[j];
      let value = mod.content[key];
      
      if (typeof value === 'string') {
        value = value.replace(/\\/g, '\\\\').replace(/'/g, "\\'").replace(/\n/g, '\\n');
        lines.push(`            ${key}: '${value}'${j < contentKeys.length - 1 ? ',' : ''}`);
      } else {
        lines.push(`            ${key}: ${JSON.stringify(value)}${j < contentKeys.length - 1 ? ',' : ''}`);
      }
    }
    
    lines.push('        }');
    lines.push(`    }${i < modules.length - 1 ? ',' : ''}`);
  }
  
  lines.push('  ]');
  return lines.join('\n');
}

// Process file
function processFile(filePath) {
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    
    const theoryMatch = content.match(/theory:\s*`([\s\S]*?)`/);
    if (!theoryMatch) {
      console.log(`⚠️  No theory: ${path.basename(filePath)}`);
      return false;
    }
    
    const modules = parseHtmlToModules(theoryMatch[1]);
    if (modules.length === 0) {
      console.log(`⚠️  No modules: ${path.basename(filePath)}`);
      return false;
    }
    
    const modulesStr = formatModules(modules);
    
    if (content.includes('theoryModules:')) {
      content = content.replace(
        /theoryModules:\s*\[[\s\S]*?\],\s*(?=game:|$)/,
        `theoryModules: ${modulesStr},\n  `
      );
    } else {
      content = content.replace(
        /(theory:\s*`[\s\S]*?`,)/,
        `$1\n  theoryModules: ${modulesStr},`
      );
    }
    
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`✅ ${path.basename(filePath)}: ${modules.length} modules`);
    return true;
    
  } catch (error) {
    console.error(`❌ ${path.basename(filePath)}: ${error.message}`);
    return false;
  }
}

// Test
function testOne(filename) {
  const testFile = path.join(__dirname, '..', 'areas', 'Hoahoc', 'class10', 'ketnoi', filename);
  const content = fs.readFileSync(testFile, 'utf8');
  const theoryMatch = content.match(/theory:\s*`([\s\S]*?)`/);
  
  if (theoryMatch) {
    const modules = parseHtmlToModules(theoryMatch[1]);
    console.log(`=== TEST ${filename} ===`);
    modules.forEach((m, i) => {
      const preview = m.content.title || m.content.text?.substring(0, 40) || '';
      console.log(`${i+1}. [${m.type}] ${preview}`);
    });
    console.log('========================\n');
  }
}

// Main
function main() {
  // Test
  testOne('lesson15.cjs');
  testOne('lesson1.cjs');
  
  const areasPath = path.join(__dirname, '..', 'areas', 'Hoahoc');
  const classes = ['class8', 'class9', 'class10', 'class11', 'class12'];
  
  let total = 0, success = 0;
  
  for (const cls of classes) {
    const ketnoiPath = path.join(areasPath, cls, 'ketnoi');
    if (!fs.existsSync(ketnoiPath)) continue;
    
    const files = fs.readdirSync(ketnoiPath).filter(f => f.startsWith('lesson') && f.endsWith('.cjs'));
    console.log(`\n📁 ${cls}/ketnoi (${files.length} files)`);
    
    for (const file of files) {
      total++;
      if (processFile(path.join(ketnoiPath, file))) success++;
    }
  }
  
  console.log(`\n✅ Converted: ${success}/${total} files\n`);
}

main();
