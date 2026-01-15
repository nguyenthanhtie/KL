/**
 * Sử dụng Invidious API để tìm video
 * Invidious là frontend YouTube không cần API key
 * Chạy: node scripts/invidious_search.cjs
 */

const https = require('https');
const fs = require('fs');

// Invidious instances
const INVIDIOUS_INSTANCES = [
  'vid.puffyan.us',
  'invidious.snopyta.org',
  'yewtu.be',
  'invidious.kavin.rocks',
];

function fetchJSON(url) {
  return new Promise((resolve, reject) => {
    const urlObj = new URL(url);
    const options = {
      hostname: urlObj.hostname,
      path: urlObj.pathname + urlObj.search,
      headers: {
        'User-Agent': 'Mozilla/5.0',
        'Accept': 'application/json',
      }
    };
    
    https.get(options, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          resolve(JSON.parse(data));
        } catch (e) {
          resolve(null);
        }
      });
    }).on('error', () => resolve(null));
  });
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

// Mapping nguyên tố
const missingElements = {
  Yb: 'Ytterbium', 
  Pt: 'Platinum', 
  At: 'Astatine', 
  Ac: 'Actinium',
  Pa: 'Protactinium', 
  Md: 'Mendelevium', 
  No: 'Nobelium', 
  Lr: 'Lawrencium',
  Rf: 'Rutherfordium', 
  Db: 'Dubnium', 
  Sg: 'Seaborgium', 
  Bh: 'Bohrium',
  Hs: 'Hassium', 
  Mt: 'Meitnerium', 
  Ds: 'Darmstadtium', 
  Rg: 'Roentgenium',
  Cn: 'Copernicium', 
  Nh: 'Nihonium', 
  Fl: 'Flerovium', 
  Mc: 'Moscovium',
  Lv: 'Livermorium', 
  Ts: 'Tennessine', 
  Og: 'Oganesson'
};

async function searchInvidious(query, instance) {
  const url = `https://${instance}/api/v1/search?q=${encodeURIComponent(query)}&type=video`;
  return await fetchJSON(url);
}

async function main() {
  console.log('=== TÌM VIDEO QUA INVIDIOUS API ===\n');
  
  const instance = INVIDIOUS_INSTANCES[0];
  console.log(`Sử dụng instance: ${instance}\n`);
  
  const results = {};
  
  for (const [symbol, name] of Object.entries(missingElements)) {
    const query = `${name} periodic table of videos`;
    console.log(`Tìm kiếm: ${symbol} (${name})...`);
    
    try {
      const searchResults = await searchInvidious(query, instance);
      
      if (searchResults && Array.isArray(searchResults)) {
        // Tìm video từ channel periodicvideos
        for (const video of searchResults.slice(0, 5)) {
          if (video.videoId) {
            const check = await checkVideo(video.videoId);
            if (check.working && 
                (check.title.toLowerCase().includes('periodic') ||
                 check.title.toLowerCase().includes(name.toLowerCase()))) {
              console.log(`  ✓ ${video.videoId} - ${check.title}`);
              results[symbol] = { videoId: video.videoId, title: check.title };
              break;
            }
          }
        }
      }
      
      if (!results[symbol]) {
        console.log(`  ✗ Không tìm thấy`);
      }
      
    } catch (e) {
      console.log(`  Lỗi: ${e.message}`);
    }
    
    await new Promise(r => setTimeout(r, 300));
  }
  
  console.log(`\n=== KẾT QUẢ ===`);
  console.log(`Tìm thấy: ${Object.keys(results).length}/${Object.keys(missingElements).length}`);
  
  if (Object.keys(results).length > 0) {
    console.log('\nCode cập nhật:');
    for (const [symbol, info] of Object.entries(results)) {
      console.log(`  ${symbol}: 'https://www.youtube.com/embed/${info.videoId}', // ${info.title}`);
    }
  }
  
  fs.writeFileSync('scripts/invidious_results.json', JSON.stringify(results, null, 2));
}

main().catch(console.error);
