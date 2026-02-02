/**
 * Script rebuild theoryModules - FIX: H3 trong box phải là title của box
 * Chạy: node scripts/rebuild_theory_modules_v3.cjs
 */

const fs = require('fs');
const path = require('path');

// Giữ lại inline formatting (strong, em, b, i, sub, sup)
function preserveInlineFormatting(html) {
  if (!html) return '';
  return html
    .replace(/&nbsp;/g, ' ')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    // Giữ lại các tag inline formatting
    .replace(/<(strong|b)>(.*?)<\/\1>/gi, '**$2**')
    .replace(/<(em|i)>(.*?)<\/\1>/gi, '*$2*')
    .replace(/<sub>(.*?)<\/sub>/gi, '₍$1₎')
    .replace(/<sup>(.*?)<\/sup>/gi, '⁽$1⁾')
    // Remove các tag khác
    .replace(/<[^>]*>/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

// Xác định box type từ style
function detectBoxType(style) {
  if (!style) return { type: 'infoBox', color: 'blue' };
  
  const styleLower = style.toLowerCase();
  
  // Orange/Warning
  if (styleLower.includes('#fff7ed') || styleLower.includes('#9a3412') || 
      styleLower.includes('#7c2d12') || styleLower.includes('orange')) {
    return { type: 'warningBox', color: 'orange' };
  }
  // Green/Tip
  if (styleLower.includes('#f0fdf4') || styleLower.includes('#14532d') || 
      styleLower.includes('#166534') || styleLower.includes('dcfce7')) {
    return { type: 'tipBox', color: 'green' };
  }
  // Blue
  if (styleLower.includes('#eff6ff') || styleLower.includes('#1d4ed8') || 
      styleLower.includes('#1e3a8a') || styleLower.includes('#dbeafe') ||
      styleLower.includes('#f0f9ff')) {
    return { type: 'infoBox', color: 'blue' };
  }
  // Purple/gradient
  if (styleLower.includes('linear-gradient') || styleLower.includes('#eef2ff') || 
      styleLower.includes('#312e81')) {
    return { type: 'infoBox', color: 'purple' };
  }
  // Red
  if (styleLower.includes('#fef2f2') || styleLower.includes('#dc2626') || 
      styleLower.includes('#b91c1b')) {
    return { type: 'warningBox', color: 'red' };
  }
  // Gray
  if (styleLower.includes('#f8fafc') || styleLower.includes('#f9fafb')) {
    return { type: 'infoBox', color: 'gray' };
  }
  
  return { type: 'infoBox', color: 'blue' };
}

// Parse một div box - lấy H3/H4 làm title
function parseBox(divHtml, style) {
  // Tìm h3 hoặc h4 title TRONG box
  const h3Match = divHtml.match(/<h3[^>]*>(.*?)<\/h3>/is);
  const h4Match = divHtml.match(/<h4[^>]*>(.*?)<\/h4>/is);
  const title = h3Match ? preserveInlineFormatting(h3Match[1]) : 
                h4Match ? preserveInlineFormatting(h4Match[1]) : '';
  
  // Tìm list items (ul hoặc ol)
  const items = [];
  const liRegex = /<li[^>]*>(.*?)<\/li>/gis;
  let liMatch;
  while ((liMatch = liRegex.exec(divHtml)) !== null) {
    const itemText = preserveInlineFormatting(liMatch[1]);
    if (itemText) items.push(itemText);
  }
  
  // Kiểm tra xem có phải numbered list không
  const isNumberedList = /<ol[^>]*>/i.test(divHtml);
  
  // Tìm paragraphs trong box (không phải trong list)
  const paragraphs = [];
  // Loại bỏ ul/ol trước khi tìm p
  const divWithoutList = divHtml.replace(/<[ou]l[^>]*>[\s\S]*?<\/[ou]l>/gi, '');
  const pRegex = /<p[^>]*>(.*?)<\/p>/gis;
  let pMatch;
  while ((pMatch = pRegex.exec(divWithoutList)) !== null) {
    const pText = preserveInlineFormatting(pMatch[1]);
    if (pText && pText.length > 5) paragraphs.push(pText);
  }
  
  const boxInfo = detectBoxType(style);
  
  return {
    type: boxInfo.type,
    title,
    items,
    paragraphs,
    isNumberedList,
    color: boxInfo.color
  };
}

// Parse HTML thành modules
function parseHtmlToModules(html) {
  if (!html || typeof html !== 'string') return [];
  
  const modules = [];
  let moduleId = 1;
  
  // Tạo ID cho module
  const createId = () => `mod-${moduleId++}`;
  
  // 1. Tìm H2 heading (tiêu đề chính của bài)
  const h2Match = html.match(/<h2[^>]*>(.*?)<\/h2>/is);
  if (h2Match) {
    modules.push({
      id: createId(),
      type: 'heading',
      content: {
        text: preserveInlineFormatting(h2Match[1]),
        level: 'h2'
      }
    });
  }
  
  // 2. Tìm paragraph đầu tiên (mục tiêu/giới thiệu)
  const firstPMatch = html.match(/<p\s+style="[^"]*margin[^"]*"[^>]*>(.*?)<\/p>/is);
  if (firstPMatch) {
    const text = preserveInlineFormatting(firstPMatch[1]);
    if (text && text.length > 10) {
      modules.push({
        id: createId(),
        type: 'paragraph',
        content: { text }
      });
    }
  }
  
  // 3. Tìm tất cả các inner divs (boxes) có padding và background
  // Regex tìm div có style chứa padding VÀ background (box)
  const boxDivRegex = /<div\s+style="([^"]*(?:padding)[^"]*(?:background|border)[^"]*)"[^>]*>([\s\S]*?)<\/div>(?=\s*<\/div>|\s*<div|\s*$)/gi;
  
  // Dùng cách khác: tìm từng cụm div
  let workingHtml = html;
  
  // Tìm các grid containers và inner boxes
  const gridRegex = /<div\s+style="[^"]*(?:display:\s*grid|gap:)[^"]*"[^>]*>([\s\S]*?)<\/div>\s*<\/div>/gi;
  const standaloneBoxRegex = /<div\s+style="([^"]*padding[^"]*(?:background|border-radius)[^"]*)"[^>]*>([\s\S]*?)<\/div>/gi;
  
  // Parse theo thứ tự xuất hiện trong HTML
  // Tách HTML thành các phần theo thứ tự
  const parts = [];
  let lastIndex = 0;
  
  // Tìm tất cả các div có padding (boxes)
  const allBoxRegex = /<div\s+style="([^"]*padding[^"]*)"[^>]*>([\s\S]*?)(?=<\/div>\s*<\/div>|<\/div>\s*<div\s+style="|$)/gi;
  
  let match;
  // Reset regex
  const boxRegex2 = /<div\s+style="([^"]*(?:padding:\s*1[0-9]px)[^"]*)"[^>]*>([\s\S]*?)<\/div>/gi;
  
  while ((match = boxRegex2.exec(html)) !== null) {
    const style = match[1];
    const content = match[2];
    
    // Bỏ qua grid containers
    if (style.includes('display:grid') || style.includes('display: grid')) continue;
    if (!style.includes('background') && !style.includes('border-radius') && !style.includes('border:')) continue;
    
    const box = parseBox(match[0], style);
    
    // Chỉ thêm nếu có nội dung
    if (box.title || box.items.length > 0 || box.paragraphs.length > 0) {
      let contentText = '';
      if (box.items.length > 0) {
        contentText = box.items.join('\n');
      }
      if (box.paragraphs.length > 0) {
        if (contentText) contentText += '\n';
        contentText += box.paragraphs.join('\n');
      }
      
      modules.push({
        id: createId(),
        type: box.type,
        content: {
          title: box.title,
          content: contentText,
          color: box.color,
          listType: box.isNumberedList ? 'number' : 'bullet'
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
        // Escape special chars
        value = value
          .replace(/\\/g, '\\\\')
          .replace(/'/g, "\\'")
          .replace(/\n/g, '\\n');
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

// Test với 1 file trước
function testOne() {
  const testFile = path.join(__dirname, '..', 'areas', 'Hoahoc', 'class8', 'ketnoi', 'lesson1.cjs');
  const content = fs.readFileSync(testFile, 'utf8');
  const theoryMatch = content.match(/theory:\s*`([\s\S]*?)`/);
  
  if (theoryMatch) {
    const modules = parseHtmlToModules(theoryMatch[1]);
    console.log('=== TEST lesson1.cjs ===');
    modules.forEach((m, i) => {
      console.log(`${i+1}. [${m.type}] ${m.content.title || m.content.text?.substring(0, 50) || ''}`);
    });
    console.log('========================\n');
  }
}

// Main
function main() {
  // Test trước
  testOne();
  
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
