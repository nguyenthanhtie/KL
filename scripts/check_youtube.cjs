const https = require('https');

// Danh sách các video ID cần kiểm tra
const videoIds = {
  H: 'qOTgeeTB_kA',
  He: 'mLHToVIHHkw',
  Li: 'LiB1wGVL56g',
  Be: 'RNn6LNTP3pg',
  B: 'r69lFN4WkMY',
  C: 'QuW4_bRHbUk',
  N: 'lSoWxG30rb0',
  O: 'MN-VN7mMLUM',
  F: 'vtWp45Eewtw',
  Ne: 'xL-QCfDYvN0',
  Na: 'dmcfsEVUppw',
  Mg: 'VO8YJLAF4Nw',
  Al: 'K-nvqZgHXf4',
  Si: 'g0x3NqQ4Z44',
  P: 'j6dl38LZQSY',
  S: 'yL2vGOXxrjE',
  Cl: 'gBGdQhQkBVM',
  Ar: 'KPqd4x0CQlk',
  K: 'DPm9_Oxjvnw',
  Ca: 'DlQKdLRqzqM'
  
};

function checkVideo(element, videoId) {
  return new Promise((resolve) => {
    const url = `https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${videoId}&format=json`;
    
    https.get(url, (res) => {
      if (res.statusCode === 200) {
        let data = '';
        res.on('data', chunk => data += chunk);
        res.on('end', () => {
          try {
            const json = JSON.parse(data);
            console.log(`✓ ${element}: ${videoId} - OK (${json.title.substring(0, 50)}...)`);
            resolve({ element, videoId, status: 'ok', title: json.title });
          } catch (e) {
            console.log(`✗ ${element}: ${videoId} - Parse Error`);
            resolve({ element, videoId, status: 'error' });
          }
        });
      } else {
        console.log(`✗ ${element}: ${videoId} - Status ${res.statusCode}`);
        resolve({ element, videoId, status: 'not_found' });
      }
    }).on('error', (e) => {
      console.log(`✗ ${element}: ${videoId} - Network Error`);
      resolve({ element, videoId, status: 'error' });
    });
  });
}

async function main() {
  console.log('Kiểm tra các video YouTube...\n');
  
  const results = [];
  for (const [element, videoId] of Object.entries(videoIds)) {
    const result = await checkVideo(element, videoId);
    results.push(result);
    await new Promise(r => setTimeout(r, 500)); // Delay để tránh rate limit
  }
  
  console.log('\n=== Kết quả ===');
  const working = results.filter(r => r.status === 'ok').length;
  const notWorking = results.filter(r => r.status !== 'ok').length;
  console.log(`Hoạt động: ${working}/${results.length}`);
  console.log(`Không hoạt động: ${notWorking}/${results.length}`);
  
  if (notWorking > 0) {
    console.log('\nCác video không hoạt động:');
    results.filter(r => r.status !== 'ok').forEach(r => {
      console.log(`  - ${r.element}: ${r.videoId}`);
    });
  }
}

main();
