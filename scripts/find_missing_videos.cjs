/**
 * Tìm video cho các nguyên tố còn thiếu từ Periodic Videos
 * Chạy: node scripts/find_missing_videos.cjs
 */

const https = require('https');

// Các nguyên tố đang dùng FALLBACK cần tìm video
const missingElements = [
  'Yb', 'Pt', 'At', 'Ac', 'Pa', 'Md', 'No', 'Lr',  // video không hoạt động
  'Rf', 'Db', 'Sg', 'Bh', 'Hs', 'Mt', 'Ds', 'Rg', 'Cn', 'Nh', 'Fl', 'Mc', 'Lv', 'Ts', 'Og'  // siêu nặng
];

// Danh sách video ID tiềm năng từ Periodic Videos channel
// Tìm từ nhiều nguồn khác nhau
const potentialVideos = {
  // Từ playlist khác hoặc tìm kiếm trực tiếp
  Yb: ['Av5-npo4sJs', 'PYxfCfR3aTI', 'qzDsaJwuemI'],  // Ytterbium
  Pt: ['U4hnPCXngaE', 'T2DTB1_Hy0U', 'GB86mnBY3DI'],  // Platinum
  At: ['hJ5NHjFjAZE', 'yPVjgsk2YRE', '3bSTHWHE8Ag'],  // Astatine
  Ac: ['3bSTHWHE8Ag', '9wzMeEN1JVE', 'VyxfGkpGQ5g'],  // Actinium
  Pa: ['Z7u2F0YGEAQ', '3N2zMzR_lC0', 'zD6Wl-WT6uc'],  // Protactinium
  Md: ['hUgAqPj3xBA', '2-F2PKlE1fQ', 'qK3d7I5rCW4'],  // Mendelevium
  No: ['VxzjPUc3IjM', '2-F2PKlE1fQ', 'oJD3lJfB_D4'],  // Nobelium
  Lr: ['kJy3E9xYNIs', '2-F2PKlE1fQ', 'QdPTg8mXMPs'],  // Lawrencium
  // Nguyên tố siêu nặng - Periodic Videos có video về superheavy elements
  Rf: ['aFrcB4yXMv8', '2-F2PKlE1fQ'],  // Rutherfordium
  Db: ['aFrcB4yXMv8', '2-F2PKlE1fQ'],  // Dubnium
  Sg: ['aFrcB4yXMv8', '2-F2PKlE1fQ'],  // Seaborgium
  Bh: ['aFrcB4yXMv8', '2-F2PKlE1fQ'],  // Bohrium
  Hs: ['aFrcB4yXMv8', '2-F2PKlE1fQ'],  // Hassium
  Mt: ['aFrcB4yXMv8', '2-F2PKlE1fQ'],  // Meitnerium
  Ds: ['aFrcB4yXMv8', '2-F2PKlE1fQ'],  // Darmstadtium
  Rg: ['aFrcB4yXMv8', '2-F2PKlE1fQ'],  // Roentgenium
  Cn: ['aFrcB4yXMv8', '2-F2PKlE1fQ'],  // Copernicium
  Nh: ['4lGk-ZfOBP8', 'aFrcB4yXMv8'],  // Nihonium (element 113)
  Fl: ['dGT4BeqBlvg', 'aFrcB4yXMv8'],  // Flerovium (element 114)
  Mc: ['4lGk-ZfOBP8', 'aFrcB4yXMv8'],  // Moscovium (element 115)
  Lv: ['dGT4BeqBlvg', 'aFrcB4yXMv8'],  // Livermorium (element 116)
  Ts: ['ky3RuDUQpOk', 'aFrcB4yXMv8'],  // Tennessine (element 117)
  Og: ['ky3RuDUQpOk', 'aFrcB4yXMv8'],  // Oganesson (element 118)
};

async function checkVideo(videoId) {
  return new Promise((resolve) => {
    const url = `https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${videoId}&format=json`;
    
    https.get(url, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        let title = '';
        try {
          const json = JSON.parse(data);
          title = json.title || '';
        } catch (e) {}
        resolve({ videoId, working: res.statusCode === 200, title });
      });
    }).on('error', () => {
      resolve({ videoId, working: false, title: '' });
    });
  });
}

async function main() {
  console.log('=== TÌM VIDEO CHO CÁC NGUYÊN TỐ CÒN THIẾU ===\n');
  
  const foundVideos = {};
  
  for (const element of missingElements) {
    const candidates = potentialVideos[element] || [];
    console.log(`\n${element}:`);
    
    let found = false;
    for (const videoId of candidates) {
      const result = await checkVideo(videoId);
      const status = result.working ? '✓' : '✗';
      console.log(`  ${status} ${videoId} - ${result.title || 'N/A'}`);
      
      if (result.working && !found) {
        foundVideos[element] = { videoId, title: result.title };
        found = true;
      }
      
      await new Promise(r => setTimeout(r, 100));
    }
    
    if (!found) {
      console.log(`  ⚠️ Không tìm thấy video hoạt động`);
    }
  }
  
  console.log('\n\n=== KẾT QUẢ ===\n');
  console.log('Đã tìm thấy video cho:');
  for (const [el, info] of Object.entries(foundVideos)) {
    console.log(`  ${el}: '${info.videoId}', // ${info.title}`);
  }
  
  console.log('\n\nCode để cập nhật:');
  for (const [el, info] of Object.entries(foundVideos)) {
    console.log(`  ${el}: 'https://www.youtube.com/embed/${info.videoId}', // ${info.title}`);
  }
}

main().catch(console.error);
