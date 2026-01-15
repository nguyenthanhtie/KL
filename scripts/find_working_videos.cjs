const https = require('https');

// Danh sách các video ID để kiểm tra - từ các kênh khoa học uy tín
// Nguồn: Periodic Videos, NileRed, Thoisoi2, Action Lab, SciShow, etc.
const testVideoIds = {
  // === HYDROGEN GROUP ===
  H_test1: '6rdmpx39PRk',   // Current in file
  H_test2: 'p_0wCOdqUAM',   // Hydrogen - NileRed
  H_test3: 'Xxe_Hg-c4Zc',   // Hydrogen explosion
  
  // === HELIUM GROUP ===
  He_test1: 'QBi2rxdJKAU',  // Helium
  He_test2: 'mLHToVIHHkw',  // Current
  He_test3: 'HQvI3CXKKAM',  // Helium voice
  
  // === LITHIUM GROUP ===
  Li_test1: '1P09pcY1its',  // Lithium
  Li_test2: 'K6bRpCZPZGs',  // Lithium reaction
  
  // === SODIUM GROUP ===
  Na_test1: 'MTcgo46nxNE',  // Sodium in water
  Na_test2: 'ODf_sPexS2Q',  // Sodium metal
  Na_test3: 'HY7mTCMvpEM',  // Sodium explosion
  
  // === POTASSIUM GROUP ===
  K_test1: 'NTFBXJ3Sh_o',   // Potassium in water  
  K_test2: 'KVLVr5bOjdU',   // Potassium
  
  // === MAGNESIUM GROUP ===
  Mg_test1: 'DdHBddIsPR8',  // Magnesium burning
  Mg_test2: 'HDVSYA4bZf0',  // Magnesium reaction
  
  // === IRON GROUP ===
  Fe_test1: 'gH2SzJGckH0',  // Iron reaction
  Fe_test2: 'BqLH-nTZEOc',  // Iron
  
  // === COPPER GROUP ===
  Cu_test1: 'dsy5IKFyEhs',  // Copper
  Cu_test2: 'tG1gJ-nu_M8',  // Copper reaction
  
  // === ZINC GROUP ===
  Zn_test1: '6RRn2dQ-Q6c',  // Zinc
  
  // === SILVER GROUP ===
  Ag_test1: '0e4G4xZMWq0',  // Silver
  
  // === GOLD GROUP ===
  Au_test1: 'SmyXpgTuL5o',  // Gold
  Au_test2: 'g-S2G-JVpqI',  // Making gold
  
  // === OXYGEN GROUP ===  
  O_test1: 'AAj3pj3ObvY',   // Oxygen
  O_test2: 'v3rhQc666Sg',   // Liquid oxygen
  
  // === NITROGEN GROUP ===
  N_test1: 'DPYqDcQ1f48',   // Nitrogen
  N_test2: 'gjsMV1MglA4',   // Liquid nitrogen
  
  // === SULFUR GROUP ===
  S_test1: '9NI2Xhdr94c',   // Sulfur
  
  // === PHOSPHORUS GROUP ===
  P_test1: 'VVWhXnm_dDM',   // Phosphorus
  
  // === CHLORINE GROUP ===
  Cl_test1: 'YEvNwA1C1zg',  // Chlorine
  
  // === BROMINE GROUP ===
  Br_test1: 'zpmjBD9fq6c',  // Bromine
  
  // === IODINE GROUP ===
  I_test1: 'wgBjj2Y79jE',   // Iodine
  
  // === MERCURY GROUP ===
  Hg_test1: 'ZiWlthrtneU',  // Already verified working
  Hg_test2: 'DpiF1DH3sgo',  // Mercury
  
  // === URANIUM GROUP ===
  U_test1: 'rN9lJNl3Gxs',   // Uranium
  
  // === GALLIUM GROUP ===
  Ga_test1: 'cvRcUeWjBu0',  // Already verified working
  
  // === CESIUM GROUP ===
  Cs_test1: 'uixxJtJPVXk',  // Already verified working
  
  // === FLUORINE GROUP ===
  F_test1: 'vtWp45Eewtw',   // Already verified working
  
  // === CARBON GROUP ===
  C_test1: 'QuW4_bRHbUk',   // Already verified working
};

// Kiểm tra từng video
function checkVideo(key, videoId) {
  return new Promise((resolve) => {
    const url = `https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${videoId}&format=json`;
    
    https.get(url, (res) => {
      if (res.statusCode === 200) {
        let data = '';
        res.on('data', chunk => data += chunk);
        res.on('end', () => {
          try {
            const json = JSON.parse(data);
            console.log(`✓ ${key}: ${videoId} - "${json.title.substring(0, 60)}..."`);
            resolve({ key, videoId, status: 'ok', title: json.title });
          } catch (e) {
            console.log(`✗ ${key}: ${videoId} - Parse Error`);
            resolve({ key, videoId, status: 'error' });
          }
        });
      } else {
        console.log(`✗ ${key}: ${videoId} - Status ${res.statusCode}`);
        resolve({ key, videoId, status: 'not_found' });
      }
    }).on('error', (e) => {
      console.log(`✗ ${key}: ${videoId} - Network Error: ${e.message}`);
      resolve({ key, videoId, status: 'error' });
    });
  });
}

async function main() {
  console.log('Kiểm tra các video YouTube từ nhiều nguồn khác nhau...\n');
  
  const results = [];
  const entries = Object.entries(testVideoIds);
  
  for (const [key, videoId] of entries) {
    const result = await checkVideo(key, videoId);
    results.push(result);
    await new Promise(r => setTimeout(r, 300)); // Delay to avoid rate limiting
  }
  
  console.log('\n=== Kết quả ===');
  const working = results.filter(r => r.status === 'ok');
  console.log(`Hoạt động: ${working.length}/${results.length}`);
  
  // Nhóm theo nguyên tố
  const elementMap = {};
  working.forEach(r => {
    const element = r.key.split('_')[0];
    if (!elementMap[element]) {
      elementMap[element] = [];
    }
    elementMap[element].push(r);
  });
  
  console.log('\n=== VIDEO HOẠT ĐỘNG THEO NGUYÊN TỐ ===\n');
  Object.entries(elementMap).forEach(([element, videos]) => {
    console.log(`${element}:`);
    videos.forEach(v => {
      console.log(`  - ${v.videoId}: ${v.title}`);
    });
  });
}

main();
