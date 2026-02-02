/**
 * Script xóa field theory khỏi tất cả các file lesson
 * Vì đã có theoryModules, không cần theory HTML nữa
 */

const fs = require('fs');
const path = require('path');

const AREAS_DIR = path.join(__dirname, '..', 'areas', 'Hoahoc');
const CLASSES = ['class8', 'class9', 'class10', 'class11', 'class12'];

let totalFiles = 0;
let modifiedFiles = 0;

function processLessonFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8');
  
  // Regex để match theory: ` ... `, (bao gồm cả dấu phẩy cuối)
  // Có thể là template literal hoặc string thường
  const theoryRegex = /\s*theory:\s*`[\s\S]*?`,?\n?/;
  const theoryRegex2 = /\s*theory:\s*'[\s\S]*?',?\n?/;
  const theoryRegex3 = /\s*theory:\s*"[\s\S]*?",?\n?/;
  
  let newContent = content;
  let modified = false;
  
  if (theoryRegex.test(content)) {
    newContent = content.replace(theoryRegex, '\n');
    modified = true;
  } else if (theoryRegex2.test(content)) {
    newContent = content.replace(theoryRegex2, '\n');
    modified = true;
  } else if (theoryRegex3.test(content)) {
    newContent = content.replace(theoryRegex3, '\n');
    modified = true;
  }
  
  if (modified) {
    // Clean up: remove double empty lines
    newContent = newContent.replace(/\n\s*\n\s*\n/g, '\n\n');
    fs.writeFileSync(filePath, newContent, 'utf-8');
    modifiedFiles++;
    console.log(`✅ Removed theory from: ${path.basename(filePath)}`);
  } else {
    console.log(`⚠️ No theory field found: ${path.basename(filePath)}`);
  }
  
  totalFiles++;
}

function processDirectory(dirPath) {
  if (!fs.existsSync(dirPath)) return;
  
  const files = fs.readdirSync(dirPath);
  
  for (const file of files) {
    if (file.startsWith('lesson') && file.endsWith('.cjs')) {
      processLessonFile(path.join(dirPath, file));
    }
  }
}

console.log('🗑️ Removing theory field from all lesson files...\n');

for (const className of CLASSES) {
  const ketnoiDir = path.join(AREAS_DIR, className, 'ketnoi');
  console.log(`\n📁 Processing ${className}/ketnoi:`);
  processDirectory(ketnoiDir);
}

console.log(`\n✨ Done! Modified ${modifiedFiles}/${totalFiles} files.`);
