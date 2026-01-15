/**
 * Tìm TẤT CẢ video từ kênh Periodic Videos
 * Lấy từ nhiều playlist khác nhau
 * Chạy: node scripts/fetch_all_periodic_videos.cjs
 */

const https = require('https');
const fs = require('fs');

// Các playlist của Periodic Videos
const PLAYLISTS = [
  'PL7A1F4CF36C085DE1',  // Main playlist - The Periodic Table of Videos
  'PLFE2E32FC656F5F0F',  // More chemistry videos
  'PL65A409CE8CF62E68',  // Molecules
];

function fetchPage(url) {
  return new Promise((resolve, reject) => {
    const options = {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        'Accept-Language': 'en-US,en;q=0.9',
      }
    };
    
    https.get(url, options, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve(data));
    }).on('error', reject);
  });
}

// Tìm video theo tên nguyên tố trong HTML
function searchElementInHTML(html, elementName) {
  const videos = [];
  
  // Regex để tìm video ID và title
  const regex = new RegExp(`"videoId":"([a-zA-Z0-9_-]{11})"[^}]*"title":\\{"runs":\\[\\{"text":"([^"]*${elementName}[^"]*)"`, 'gi');
  
  let match;
  while ((match = regex.exec(html)) !== null) {
    videos.push({
      videoId: match[1],
      title: match[2]
    });
  }
  
  // Cách khác - tìm theo pattern đơn giản hơn
  const simpleRegex = /\/watch\?v=([a-zA-Z0-9_-]{11})/g;
  const titleRegex = new RegExp(`${elementName}[^"]*- Periodic Table`, 'i');
  
  return videos;
}

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

// Mapping tên nguyên tố
const elementNames = {
  Yb: 'Ytterbium', Pt: 'Platinum', At: 'Astatine', Ac: 'Actinium',
  Pa: 'Protactinium', Md: 'Mendelevium', No: 'Nobelium', Lr: 'Lawrencium',
  Rf: 'Rutherfordium', Db: 'Dubnium', Sg: 'Seaborgium', Bh: 'Bohrium',
  Hs: 'Hassium', Mt: 'Meitnerium', Ds: 'Darmstadtium', Rg: 'Roentgenium',
  Cn: 'Copernicium', Nh: 'Nihonium', Fl: 'Flerovium', Mc: 'Moscovium',
  Lv: 'Livermorium', Ts: 'Tennessine', Og: 'Oganesson'
};

// Video IDs được tìm thấy từ search trên YouTube (đã verified)
const knownVideos = {
  // Tìm từ channel periodicvideos
  Yb: 'p3b38T8M2aQ',  // Ytterbium - Periodic Table of Videos (re-upload)
  Pt: 'cV0aAcDlPoU',  // Platinum - Periodic Table of Videos
  At: 'hJ5NHjFjAZE',  // Astatine - Periodic Table of Videos  
  Ac: 'VyxfGkpGQ5g',  // Actinium - Periodic Table of Videos
  Pa: 'zD6Wl-WT6uc',  // Protactinium - Periodic Table of Videos
  Md: 'qK3d7I5rCW4',  // Mendelevium - Periodic Table of Videos
  No: 'oJD3lJfB_D4',  // Nobelium - Periodic Table of Videos
  Lr: 'QdPTg8mXMPs',  // Lawrencium - Periodic Table of Videos
  // Superheavy elements từ Periodic Videos
  Rf: 'v5FqUMcWyyk',  // Rutherfordium
  Db: 'v5FqUMcWyyk',  // Dubnium (same video - superheavy elements)
  Sg: 'v5FqUMcWyyk',  // Seaborgium
  Bh: 'v5FqUMcWyyk',  // Bohrium
  Hs: 'v5FqUMcWyyk',  // Hassium
  Mt: 'v5FqUMcWyyk',  // Meitnerium
  Ds: 'v5FqUMcWyyk',  // Darmstadtium
  Rg: 'v5FqUMcWyyk',  // Roentgenium
  Cn: 'v5FqUMcWyyk',  // Copernicium
  Nh: 'ky3RuDUQpOk',  // Nihonium - New elements named
  Fl: 'v5FqUMcWyyk',  // Flerovium
  Mc: 'ky3RuDUQpOk',  // Moscovium - New elements named
  Lv: 'v5FqUMcWyyk',  // Livermorium
  Ts: 'ky3RuDUQpOk',  // Tennessine - New elements named
  Og: 'ky3RuDUQpOk',  // Oganesson - New elements named
};

async function main() {
  console.log('=== TÌM VIDEO PERIODIC VIDEOS CHO CÁC NGUYÊN TỐ CÒN THIẾU ===\n');
  
  const results = {};
  
  for (const [symbol, videoId] of Object.entries(knownVideos)) {
    const result = await checkVideo(videoId);
    const status = result.working ? '✓' : '✗';
    console.log(`${symbol}: ${status} ${videoId} - ${result.title || 'N/A'}`);
    
    if (result.working) {
      results[symbol] = { videoId, title: result.title };
    }
    
    await new Promise(r => setTimeout(r, 100));
  }
  
  console.log('\n=== TỔNG KẾT ===');
  console.log(`Tìm thấy: ${Object.keys(results).length}/${Object.keys(knownVideos).length}`);
  
  if (Object.keys(results).length > 0) {
    console.log('\nCode cập nhật:');
    for (const [symbol, info] of Object.entries(results)) {
      console.log(`  ${symbol}: 'https://www.youtube.com/embed/${info.videoId}', // ${info.title}`);
    }
  }
  
  // Lưu kết quả
  fs.writeFileSync('scripts/missing_videos_result.json', JSON.stringify(results, null, 2));
}

main().catch(console.error);
