/**
 * Xác minh tất cả video từ yt-dlp và cập nhật
 * Chạy: node scripts/verify_all_118.cjs
 */

const https = require('https');
const fs = require('fs');

// Video mới tìm được từ yt-dlp cho 23 nguyên tố còn thiếu
const newVideos = {
  Yb: 'H8XtiaWm5eY', // Ytterbium - Periodic Table of Videos
  Pt: 'byzaoji_9kk', // Platinum - Periodic Table of Videos  
  At: 'GP8jJgzEmwE', // Astatine - Periodic Table of Videos
  Ac: 'rKm0ShaJNFM', // Actinium - Periodic Table of Videos
  Pa: 'bsIMMa7iEKU', // Protactinium - Periodic Table of Videos
  Md: '0JlshAo8DuE', // Mendelevium - Periodic Table of Videos
  No: 't_ZpauMxapY', // Nobelium - Periodic Table of Videos
  Lr: '_zBsnnJOkyA', // Lawrencium - Periodic Table of Videos
  Rf: 'dOj9ZjKnJcY', // Rutherfordium - Periodic Table of Videos
  Db: '5d4VekfRnMs', // Dubnium - Periodic Table of Videos
  Sg: 'UWq0djr790E', // Seaborgium - Periodic Table of Videos
  Bh: 'okJnQIjELY4', // Bohrium - Periodic Table of Videos
  Hs: 'u4GEVxbLego', // Hassium - Periodic Table of Videos
  Mt: 'N8VR7Qscq4k', // Meitnerium - Periodic Table of Videos
  Ds: 'lhvMqva3-7M', // Darmstadtium - Periodic Table of Videos
  Rg: 'MTq1hzhCF0g', // Roentgenium - Periodic Table of Videos
  Cn: 'QHcbQfcwegY', // Copernicium - Periodic Table of Videos
  Nh: '-HcSEKuYGM8', // Nihonium - Periodic Table of Videos
  Fl: '5L-NNFPiRog', // Flerovium - Periodic Table of Videos
  Mc: 'ewQAJtbgr7w', // Moscovium - Periodic Table of Videos
  Lv: 'YWKlqO9niuY', // Livermorium - Periodic Table of Videos
  Ts: '1RGlXh9eC5E', // Tennessine - Periodic Table of Videos
  Og: 'VMv44bIBdQI', // Oganesson - Periodic Table of Videos
};

async function checkVideo(symbol, videoId) {
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
        resolve({ symbol, videoId, working: res.statusCode === 200, title });
      });
    }).on('error', () => {
      resolve({ symbol, videoId, working: false, title: '' });
    });
  });
}

async function main() {
  console.log('=== XÁC MINH 23 VIDEO MỚI TỪ YT-DLP ===\n');
  
  let workingCount = 0;
  const results = {};
  
  for (const [symbol, videoId] of Object.entries(newVideos)) {
    const result = await checkVideo(symbol, videoId);
    const status = result.working ? '✓' : '✗';
    console.log(`${symbol}: ${status} ${videoId} - ${result.title || 'N/A'}`);
    
    if (result.working) {
      workingCount++;
      results[symbol] = { videoId, title: result.title };
    }
    
    await new Promise(r => setTimeout(r, 100));
  }
  
  console.log(`\n=== KẾT QUẢ ===`);
  console.log(`✓ Hoạt động: ${workingCount}/23`);
  
  if (workingCount === 23) {
    console.log('\n🎉 TẤT CẢ 23 VIDEO ĐỀU HOẠT ĐỘNG!');
    console.log('\n=== CODE CẬP NHẬT ===\n');
    
    for (const [symbol, info] of Object.entries(results)) {
      console.log(`  ${symbol}: 'https://www.youtube.com/embed/${info.videoId}', // ✓ ${info.title}`);
    }
  }
  
  fs.writeFileSync('scripts/final_23_videos.json', JSON.stringify(results, null, 2));
}

main().catch(console.error);
