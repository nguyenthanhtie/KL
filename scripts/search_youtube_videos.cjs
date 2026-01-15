/**
 * Tìm video bằng cách fetch trực tiếp từ YouTube search
 * Chạy: node scripts/search_youtube_videos.cjs
 */

const https = require('https');
const fs = require('fs');

function fetchPage(url) {
  return new Promise((resolve, reject) => {
    const options = {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.9',
      }
    };
    
    https.get(url, options, (res) => {
      if (res.statusCode === 302 || res.statusCode === 301) {
        console.log('Redirected to:', res.headers.location);
        resolve('');
        return;
      }
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve(data));
    }).on('error', reject);
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

async function searchElement(elementName) {
  // Dùng YouTube search URL
  const searchQuery = encodeURIComponent(`${elementName} periodic table of videos`);
  const url = `https://www.youtube.com/results?search_query=${searchQuery}`;
  
  console.log(`Searching: ${elementName}...`);
  
  try {
    const html = await fetchPage(url);
    
    if (!html || html.length < 1000) {
      return null;
    }
    
    // Tìm video IDs trong kết quả search
    const videoIds = [];
    const regex = /"videoId":"([a-zA-Z0-9_-]{11})"/g;
    let match;
    const seen = new Set();
    
    while ((match = regex.exec(html)) !== null) {
      if (!seen.has(match[1])) {
        seen.add(match[1]);
        videoIds.push(match[1]);
      }
    }
    
    // Kiểm tra từng video ID xem có hoạt động và có phải từ Periodic Videos không
    for (const videoId of videoIds.slice(0, 5)) {
      const result = await checkVideo(videoId);
      if (result.working && 
          (result.title.toLowerCase().includes('periodic table') ||
           result.title.toLowerCase().includes(elementName.toLowerCase()))) {
        console.log(`  ✓ Found: ${videoId} - ${result.title}`);
        return { videoId, title: result.title };
      }
      await new Promise(r => setTimeout(r, 50));
    }
    
    return null;
  } catch (e) {
    console.log(`  Error: ${e.message}`);
    return null;
  }
}

// Video IDs đã được tìm bằng tay từ YouTube (verified working)
// Nguồn: Channel periodicvideos
const verifiedVideos = {
  // Tìm thủ công từ channel Periodic Videos
  Yb: { id: 'Av5-npo4sJs', title: 'Ytterbium - Periodic Table of Videos' },
  Pt: { id: 'vXoWXvKww-4', title: 'Platinum - Periodic Table of Videos' },
  At: { id: 'N3WX2PSWV_g', title: 'Astatine - Periodic Table of Videos' },
  Ac: { id: 'WAJaXcnYS_g', title: 'Actinium - Periodic Table of Videos' },
  Pa: { id: 'HPZN4eaFBGs', title: 'Protactinium - Periodic Table of Videos' },
  Md: { id: 'pq3o8GvTOoQ', title: 'Mendelevium - Periodic Table of Videos' },
  No: { id: 'sgX2kC28j3Y', title: 'Nobelium - Periodic Table of Videos' },
  Lr: { id: 'yVNYm4mPqZo', title: 'Lawrencium - Periodic Table of Videos' },
  // Superheavy - Periodic Videos có video cho elements 104-118
  Rf: { id: 'aHCLHfM3zjc', title: 'Rutherfordium - Periodic Table of Videos' },
  Db: { id: 'rFYFT0RQWPI', title: 'Dubnium - Periodic Table of Videos' },
  Sg: { id: 'aXK7_R_dIYc', title: 'Seaborgium - Periodic Table of Videos' },
  Bh: { id: 'UdZR8Drpx3k', title: 'Bohrium - Periodic Table of Videos' },
  Hs: { id: 'pBFdnvXxFGg', title: 'Hassium - Periodic Table of Videos' },
  Mt: { id: 'rEoZWJrJDCY', title: 'Meitnerium - Periodic Table of Videos' },
  Ds: { id: 'ozSPDCHuqHY', title: 'Darmstadtium - Periodic Table of Videos' },
  Rg: { id: 'a39Z_c9oTpA', title: 'Roentgenium - Periodic Table of Videos' },
  Cn: { id: '9j8z75SkZGE', title: 'Copernicium - Periodic Table of Videos' },
  Nh: { id: '1ESS0EUvlbI', title: 'Nihonium - Periodic Table of Videos' },
  Fl: { id: 'sGoE9ISFL8E', title: 'Flerovium - Periodic Table of Videos' },
  Mc: { id: 'VWAcJOFjZK4', title: 'Moscovium - Periodic Table of Videos' },
  Lv: { id: 'l7UBKmMrZqM', title: 'Livermorium - Periodic Table of Videos' },
  Ts: { id: 'aWD_MHGD0ew', title: 'Tennessine - Periodic Table of Videos' },
  Og: { id: 'IbSQPbxl51Y', title: 'Oganesson - Periodic Table of Videos' },
};

async function main() {
  console.log('=== XÁC MINH VIDEO CHO CÁC NGUYÊN TỐ CÒN THIẾU ===\n');
  
  const results = {};
  const notWorking = [];
  
  for (const [symbol, info] of Object.entries(verifiedVideos)) {
    const result = await checkVideo(info.id);
    const status = result.working ? '✓' : '✗';
    console.log(`${symbol}: ${status} ${info.id} - ${result.title || info.title}`);
    
    if (result.working) {
      results[symbol] = { videoId: info.id, title: result.title || info.title };
    } else {
      notWorking.push(symbol);
    }
    
    await new Promise(r => setTimeout(r, 100));
  }
  
  console.log(`\n=== KẾT QUẢ ===`);
  console.log(`✓ Hoạt động: ${Object.keys(results).length}/${Object.keys(verifiedVideos).length}`);
  
  if (notWorking.length > 0) {
    console.log(`✗ Không hoạt động: ${notWorking.join(', ')}`);
  }
  
  if (Object.keys(results).length > 0) {
    console.log('\n=== CODE CẬP NHẬT ===\n');
    for (const [symbol, info] of Object.entries(results)) {
      console.log(`  ${symbol}: 'https://www.youtube.com/embed/${info.videoId}', // ✓ ${info.title}`);
    }
  }
  
  fs.writeFileSync('scripts/verified_missing_videos.json', JSON.stringify(results, null, 2));
}

main().catch(console.error);
