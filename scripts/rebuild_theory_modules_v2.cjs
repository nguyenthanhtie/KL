/**
 * Script rebuild theoryModules - giữ formatting và đúng thứ tự
 * Chạy: node scripts/rebuild_theory_modules_v2.cjs
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
function detectBoxType(style, content) {
  if (!style) return { type: 'infoBox', color: 'blue' };
  
  const styleLower = style.toLowerCase();
  const contentLower = (content || '').toLowerCase();
  
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
      styleLower.includes('#b91c1c')) {
    return { type: 'warningBox', color: 'red' };
  }
  
  return { type: 'infoBox', color: 'gray' };
}

// Parse một div box
function parseBox(divHtml, style, index) {
  // Tìm h4 title
  const h4Match = divHtml.match(/<h4[^>]*>(.*?)<\/h4>/is);
  const title = h4Match ? preserveInlineFormatting(h4Match[1]) : '';
  
  // Tìm list items
  const items = [];
  const liRegex = /<li[^>]*>(.*?)<\/li>/gis;
  let liMatch;
  while ((liMatch = liRegex.exec(divHtml)) !== null) {
    const itemText = preserveInlineFormatting(liMatch[1]);
    if (itemText) items.push(itemText);
  }
  
  // Tìm ol items (numbered list)
  const olMatch = divHtml.match(/<ol[^>]*>(.*?)<\/ol>/is);
  const isNumberedList = !!olMatch;
  
  // Tìm paragraphs trong box
  const paragraphs = [];
  const pRegex = /<p[^>]*>(.*?)<\/p>/gis;
  let pMatch;
  while ((pMatch = pRegex.exec(divHtml)) !== null) {
    const pText = preserveInlineFormatting(pMatch[1]);
    if (pText && pText.length > 5) paragraphs.push(pText);
  }
  
  const boxInfo = detectBoxType(style, divHtml);
  
  return {
    index,
    type: boxInfo.type,
    title,
    items,
    paragraphs,
    isNumberedList,
    color: boxInfo.color
  };
}

// Parse HTML thành modules với thứ tự chính xác
function parseHtmlToModules(html) {
  if (!html || typeof html !== 'string') return [];
  
  const modules = [];
  let moduleId = 1;
  
  // Tìm tất cả elements theo thứ tự xuất hiện
  const elements = [];
  
  // 1. Tìm H2 headings
  const h2Regex = /<h2[^>]*>(.*?)<\/h2>/gis;
  let match;
  while ((match = h2Regex.exec(html)) !== null) {
    elements.push({
      index: match.index,
      type: 'heading',
      level: 'h2',
      text: preserveInlineFormatting(match[1])
    });
  }
  
  // 2. Tìm H3 headings (trong div hoặc standalone)
  const h3Regex = /<h3[^>]*>(.*?)<\/h3>/gis;
  while ((match = h3Regex.exec(html)) !== null) {
    elements.push({
      index: match.index,
      type: 'heading',
      level: 'h3',
      text: preserveInlineFormatting(match[1])
    });
  }
  
  // 3. Tìm paragraphs ở top level (có style margin)
  const pRegex = /<p\s+style="[^"]*margin[^"]*"[^>]*>(.*?)<\/p>/gis;
  while ((match = pRegex.exec(html)) !== null) {
    const text = preserveInlineFormatting(match[1]);
    if (text && text.length > 10) {
      elements.push({
        index: match.index,
        type: 'paragraph',
        text
      });
    }
  }
  
  // 4. Tìm các inner divs (boxes) - không phải grid container
  const innerDivRegex = /<div\s+style="([^"]*(?:padding|background)[^"]*)"[^>]*>([\s\S]*?)<\/div>(?=\s*<\/div>|\s*<div\s+style="[^"]*(?:padding|background)|\s*$)/gis;
  while ((match = innerDivRegex.exec(html)) !== null) {
    const style = match[1];
    const content = match[2];
    
    // Bỏ qua grid containers
    if (style.includes('display:grid') || style.includes('display: grid')) continue;
    if (style.includes('gap:') && !style.includes('padding:')) continue;
    
    const box = parseBox(content, style, match.index);
    if (box.title || box.items.length > 0 || box.paragraphs.length > 0) {
      elements.push(box);
    }
  }
  
  // 5. Tìm images
  const imgRegex = /<img[^>]*src="([^"]*)"[^>]*(?:alt="([^"]*)")?[^>]*>/gi;
  while ((match = imgRegex.exec(html)) !== null) {
    elements.push({
      index: match.index,
      type: 'image',
      url: match[1],
      alt: match[2] || ''
    });
  }
  
  // 6. Tìm videos (YouTube iframe)
  const videoRegex = /<iframe[^>]*src="([^"]*(?:youtube|youtu\.be)[^"]*)"[^>]*>/gi;
  while ((match = videoRegex.exec(html)) !== null) {
    elements.push({
      index: match.index,
      type: 'video',
      url: match[1]
    });
  }
  
  // Sort by index để giữ đúng thứ tự
  elements.sort((a, b) => a.index - b.index);
  
  // Loại bỏ duplicate headings (cùng text)
  const seenHeadings = new Set();
  const uniqueElements = elements.filter(el => {
    if (el.type === 'heading') {
      const key = `${el.level}-${el.text}`;
      if (seenHeadings.has(key)) return false;
      seenHeadings.add(key);
    }
    return true;
  });
  
  // Convert sang modules
  for (const el of uniqueElements) {
    const id = `mod-${moduleId++}`;
    
    switch (el.type) {
      case 'heading':
        modules.push({
          id,
          type: 'heading',
          content: {
            text: el.text,
            level: el.level
          }
        });
        break;
        
      case 'paragraph':
        modules.push({
          id,
          type: 'paragraph',
          content: {
            text: el.text
          }
        });
        break;
        
      case 'infoBox':
      case 'warningBox':
      case 'tipBox':
        let contentText = '';
        if (el.items && el.items.length > 0) {
          contentText = el.items.join('\n');
        }
        if (el.paragraphs && el.paragraphs.length > 0) {
          if (contentText) contentText += '\n';
          contentText += el.paragraphs.join('\n');
        }
        
        modules.push({
          id,
          type: el.type,
          content: {
            title: el.title || '',
            content: contentText,
            color: el.color,
            listType: el.isNumberedList ? 'number' : 'bullet'
          }
        });
        break;
        
      case 'image':
        modules.push({
          id,
          type: 'image',
          content: {
            url: el.url,
            alt: el.alt || '',
            caption: ''
          }
        });
        break;
        
      case 'video':
        modules.push({
          id,
          type: 'video',
          content: {
            url: el.url,
            caption: ''
          }
        });
        break;
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

// Main
function main() {
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
