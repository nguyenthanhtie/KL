/**
 * Script chuyển đổi bài học - tạo theoryModules từ theory HTML
 * Phân tích chính xác hơn cấu trúc HTML
 * Chạy: node scripts/rebuild_theory_modules.cjs
 */

const fs = require('fs');
const path = require('path');

// Helper: strip HTML tags
function stripHtml(html) {
  if (!html) return '';
  return html
    .replace(/<[^>]*>/g, '')
    .replace(/&nbsp;/g, ' ')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/\s+/g, ' ')
    .trim();
}

// Xác định loại box dựa trên background color
function detectBoxType(style) {
  if (!style) return { type: 'infoBox', color: 'blue' };
  
  if (style.includes('#fff7ed') || style.includes('orange') || style.includes('#9a3412') || style.includes('#7c2d12')) {
    return { type: 'warningBox', color: 'orange' };
  }
  if (style.includes('#f0fdf4') || style.includes('#14532d') || style.includes('#166534') || style.includes('green')) {
    return { type: 'tipBox', color: 'green' };
  }
  if (style.includes('#eff6ff') || style.includes('#1d4ed8') || style.includes('#1e3a8a')) {
    return { type: 'infoBox', color: 'blue' };
  }
  if (style.includes('#fef2f2') || style.includes('#dc2626') || style.includes('red')) {
    return { type: 'warningBox', color: 'red' };
  }
  if (style.includes('#f5f3ff') || style.includes('#7c3aed') || style.includes('purple')) {
    return { type: 'tipBox', color: 'purple' };
  }
  if (style.includes('linear-gradient') || style.includes('#eef2ff') || style.includes('#312e81')) {
    return { type: 'infoBox', color: 'blue' };
  }
  
  return { type: 'infoBox', color: 'gray' };
}

// Parse HTML thành modules chính xác
function parseHtmlToModules(html) {
  if (!html || typeof html !== 'string') return [];
  
  const modules = [];
  let moduleId = 1;
  
  // Tìm tất cả các block chính
  // 1. Headings (h2, h3)
  const h2Regex = /<h2[^>]*>(.*?)<\/h2>/gi;
  const h3Regex = /<h3[^>]*>(.*?)<\/h3>/gi;
  
  // 2. Paragraphs ở top level
  const pRegex = /<p[^>]*style="[^"]*margin[^"]*"[^>]*>(.*?)<\/p>/gi;
  
  // 3. Grid divs chứa các box
  const gridRegex = /<div[^>]*style="[^"]*display:\s*grid[^"]*"[^>]*>([\s\S]*?)<\/div>\s*(?=<div|<h|$)/gi;
  
  // 4. Standalone styled divs (boxes)
  const boxRegex = /<div[^>]*style="([^"]*(?:padding|border|background)[^"]*)"[^>]*>([\s\S]*?)<\/div>(?=\s*<\/div>|\s*<div|\s*$)/gi;

  let match;
  const blocks = [];
  
  // Parse H2 headings
  while ((match = h2Regex.exec(html)) !== null) {
    const text = stripHtml(match[1]);
    if (text) {
      blocks.push({
        index: match.index,
        type: 'heading',
        level: 'h2',
        text: text
      });
    }
  }
  
  // Parse H3 headings
  while ((match = h3Regex.exec(html)) !== null) {
    const text = stripHtml(match[1]);
    if (text) {
      blocks.push({
        index: match.index,
        type: 'heading',
        level: 'h3',
        text: text
      });
    }
  }
  
  // Parse top-level paragraphs
  while ((match = pRegex.exec(html)) !== null) {
    const text = stripHtml(match[1]);
    if (text && text.length > 15) {
      blocks.push({
        index: match.index,
        type: 'paragraph',
        text: text
      });
    }
  }
  
  // Parse individual boxes within grids
  const innerBoxRegex = /<div[^>]*style="([^"]*(?:padding|background)[^"]*)"[^>]*>([\s\S]*?)<\/div>/gi;
  
  while ((match = innerBoxRegex.exec(html)) !== null) {
    const style = match[1];
    const content = match[2];
    
    // Bỏ qua grid containers
    if (style.includes('display:grid') || style.includes('display: grid')) continue;
    
    // Tìm title (h4)
    const h4Match = content.match(/<h4[^>]*>(.*?)<\/h4>/i);
    const title = h4Match ? stripHtml(h4Match[1]) : '';
    
    // Tìm list items
    const items = [];
    const liRegex = /<li[^>]*>(.*?)<\/li>/gi;
    let liMatch;
    while ((liMatch = liRegex.exec(content)) !== null) {
      const itemText = stripHtml(liMatch[1]);
      if (itemText) items.push(itemText);
    }
    
    // Tìm paragraphs trong box
    const boxParagraphs = [];
    const boxPRegex = /<p[^>]*>(.*?)<\/p>/gi;
    let pMatch;
    while ((pMatch = boxPRegex.exec(content)) !== null) {
      const pText = stripHtml(pMatch[1]);
      if (pText && pText.length > 10) boxParagraphs.push(pText);
    }
    
    if (title || items.length > 0) {
      const boxInfo = detectBoxType(style);
      blocks.push({
        index: match.index,
        type: boxInfo.type,
        title: title,
        items: items,
        paragraphs: boxParagraphs,
        color: boxInfo.color
      });
    }
  }
  
  // Sort by index
  blocks.sort((a, b) => a.index - b.index);
  
  // Remove duplicates (same title appearing multiple times)
  const seenTitles = new Set();
  const uniqueBlocks = blocks.filter(block => {
    if (block.type === 'heading') {
      if (seenTitles.has(block.text)) return false;
      seenTitles.add(block.text);
    }
    return true;
  });
  
  // Convert to modules
  for (const block of uniqueBlocks) {
    const id = `mod-${moduleId++}`;
    
    switch (block.type) {
      case 'heading':
        modules.push({
          id,
          type: 'heading',
          content: {
            text: block.text,
            level: block.level
          }
        });
        break;
        
      case 'paragraph':
        modules.push({
          id,
          type: 'paragraph',
          content: {
            text: block.text
          }
        });
        break;
        
      case 'infoBox':
      case 'warningBox':
      case 'tipBox':
        // Tạo nội dung từ items
        let contentText = '';
        if (block.items && block.items.length > 0) {
          contentText = block.items.join('\n');
        }
        if (block.paragraphs && block.paragraphs.length > 0) {
          if (contentText) contentText += '\n';
          contentText += block.paragraphs.join('\n');
        }
        
        if (block.title || contentText) {
          modules.push({
            id,
            type: block.type,
            content: {
              title: block.title || '',
              content: contentText,
              color: block.color
            }
          });
        }
        break;
    }
  }
  
  return modules;
}

// Format modules thành JavaScript string
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
      
      // Escape single quotes and handle special chars
      if (typeof value === 'string') {
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

// Process a single file
function processFile(filePath) {
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Extract theory
    const theoryMatch = content.match(/theory:\s*`([\s\S]*?)`/);
    if (!theoryMatch) {
      console.log(`⚠️  No theory: ${path.basename(filePath)}`);
      return false;
    }
    
    const theoryHtml = theoryMatch[1];
    const modules = parseHtmlToModules(theoryHtml);
    
    if (modules.length === 0) {
      console.log(`⚠️  No modules: ${path.basename(filePath)}`);
      return false;
    }
    
    const modulesStr = formatModules(modules);
    
    // Check if theoryModules already exists
    if (content.includes('theoryModules:')) {
      // Replace existing theoryModules
      content = content.replace(
        /theoryModules:\s*\[[\s\S]*?\],\s*(?=game:|$)/,
        `theoryModules: ${modulesStr},\n  `
      );
    } else {
      // Add theoryModules after theory
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
  
  let total = 0;
  let success = 0;
  
  for (const cls of classes) {
    const ketnoiPath = path.join(areasPath, cls, 'ketnoi');
    if (!fs.existsSync(ketnoiPath)) continue;
    
    const files = fs.readdirSync(ketnoiPath).filter(f => f.startsWith('lesson') && f.endsWith('.cjs'));
    console.log(`\n📁 ${cls}/ketnoi (${files.length} files)`);
    
    for (const file of files) {
      total++;
      if (processFile(path.join(ketnoiPath, file))) {
        success++;
      }
    }
  }
  
  console.log(`\n========================================`);
  console.log(`📊 Converted: ${success}/${total} files`);
  console.log(`========================================\n`);
}

main();
