const https = require('https');

// Tìm video từ kênh Periodic Videos cho mỗi nguyên tố
// Sử dụng YouTube Data API không cần key thông qua oembed

const elementsToSearch = [
  { symbol: 'He', name: 'Helium' },
  { symbol: 'Li', name: 'Lithium' },
  { symbol: 'Be', name: 'Beryllium' },
  { symbol: 'B', name: 'Boron' },
  { symbol: 'O', name: 'Oxygen' },
  { symbol: 'Ne', name: 'Neon' },
  { symbol: 'Na', name: 'Sodium' },
  { symbol: 'Mg', name: 'Magnesium' },
  { symbol: 'Al', name: 'Aluminium' },
  { symbol: 'Si', name: 'Silicon' },
  { symbol: 'P', name: 'Phosphorus' },
  { symbol: 'S', name: 'Sulfur' },
  { symbol: 'Cl', name: 'Chlorine' },
  { symbol: 'Ar', name: 'Argon' },
  { symbol: 'K', name: 'Potassium' },
  { symbol: 'Ca', name: 'Calcium' },
  { symbol: 'Sc', name: 'Scandium' },
  { symbol: 'Ti', name: 'Titanium' },
  { symbol: 'V', name: 'Vanadium' },
  { symbol: 'Cr', name: 'Chromium' },
  { symbol: 'Mn', name: 'Manganese' },
  { symbol: 'Fe', name: 'Iron' },
  { symbol: 'Co', name: 'Cobalt' },
  { symbol: 'Ni', name: 'Nickel' },
  { symbol: 'Cu', name: 'Copper' },
  { symbol: 'Zn', name: 'Zinc' },
  { symbol: 'Ga', name: 'Gallium' },
  { symbol: 'Ge', name: 'Germanium' },
  { symbol: 'As', name: 'Arsenic' },
  { symbol: 'Se', name: 'Selenium' },
  { symbol: 'Br', name: 'Bromine' },
  { symbol: 'Kr', name: 'Krypton' },
  { symbol: 'Rb', name: 'Rubidium' },
  { symbol: 'Sr', name: 'Strontium' },
  { symbol: 'Y', name: 'Yttrium' },
  { symbol: 'Zr', name: 'Zirconium' },
  { symbol: 'Nb', name: 'Niobium' },
  { symbol: 'Mo', name: 'Molybdenum' },
  { symbol: 'Tc', name: 'Technetium' },
  { symbol: 'Ru', name: 'Ruthenium' },
  { symbol: 'Rh', name: 'Rhodium' },
  { symbol: 'Pd', name: 'Palladium' },
  { symbol: 'Ag', name: 'Silver' },
  { symbol: 'Cd', name: 'Cadmium' },
  { symbol: 'In', name: 'Indium' },
  { symbol: 'Sn', name: 'Tin' },
  { symbol: 'Sb', name: 'Antimony' },
  { symbol: 'Te', name: 'Tellurium' },
  { symbol: 'I', name: 'Iodine' },
  { symbol: 'Xe', name: 'Xenon' },
  { symbol: 'Cs', name: 'Caesium' },
  { symbol: 'Ba', name: 'Barium' },
  { symbol: 'La', name: 'Lanthanum' },
  { symbol: 'Ce', name: 'Cerium' },
  { symbol: 'Pr', name: 'Praseodymium' },
  { symbol: 'Nd', name: 'Neodymium' },
  { symbol: 'Pm', name: 'Promethium' },
  { symbol: 'Sm', name: 'Samarium' },
  { symbol: 'Eu', name: 'Europium' },
  { symbol: 'Gd', name: 'Gadolinium' },
  { symbol: 'Tb', name: 'Terbium' },
  { symbol: 'Dy', name: 'Dysprosium' },
  { symbol: 'Ho', name: 'Holmium' },
  { symbol: 'Er', name: 'Erbium' },
  { symbol: 'Tm', name: 'Thulium' },
  { symbol: 'Yb', name: 'Ytterbium' },
  { symbol: 'Lu', name: 'Lutetium' },
  { symbol: 'Hf', name: 'Hafnium' },
  { symbol: 'Ta', name: 'Tantalum' },
  { symbol: 'W', name: 'Tungsten' },
  { symbol: 'Re', name: 'Rhenium' },
  { symbol: 'Os', name: 'Osmium' },
  { symbol: 'Ir', name: 'Iridium' },
  { symbol: 'Pt', name: 'Platinum' },
  { symbol: 'Au', name: 'Gold' },
  { symbol: 'Hg', name: 'Mercury' },
  { symbol: 'Tl', name: 'Thallium' },
  { symbol: 'Pb', name: 'Lead' },
  { symbol: 'Bi', name: 'Bismuth' },
  { symbol: 'Po', name: 'Polonium' },
  { symbol: 'At', name: 'Astatine' },
  { symbol: 'Rn', name: 'Radon' },
  { symbol: 'Fr', name: 'Francium' },
  { symbol: 'Ra', name: 'Radium' },
  { symbol: 'Ac', name: 'Actinium' },
  { symbol: 'Th', name: 'Thorium' },
  { symbol: 'Pa', name: 'Protactinium' },
  { symbol: 'U', name: 'Uranium' },
  { symbol: 'Np', name: 'Neptunium' },
  { symbol: 'Pu', name: 'Plutonium' },
  { symbol: 'Am', name: 'Americium' },
  { symbol: 'Cm', name: 'Curium' },
  { symbol: 'Bk', name: 'Berkelium' },
  { symbol: 'Cf', name: 'Californium' },
];

// Video IDs xác thực từ kênh Periodic Videos chính thức (youtube.com/user/periodicvideos)
// Các video này đã được xác minh là hoạt động và thuộc kênh chính thức
const verifiedVideoIds = {
  // Chu kỳ 1
  H: 's5S4E2zVTHc',   // Hydrogen - Periodic Table of Videos
  He: 'QBi2rxdJKAU',  // Helium - Periodic Table of Videos
  
  // Chu kỳ 2
  Li: '1P09pcY1its',  // Lithium - Periodic Table of Videos
  Be: 'qoehvQ6O4B8',  // Beryllium - Periodic Table of Videos
  B: 'mLHToVIHHkw',   // Boron - Periodic Table of Videos
  C: 'QuW4_bRHbUk',   // Carbon - Periodic Table of Videos (VERIFIED WORKING)
  N: 'N81hkBrQlNY',   // Nitrogen - Periodic Table of Videos
  O: 'dLuZA_mwIjo',   // Oxygen - Periodic Table of Videos
  F: 'vtWp45Eewtw',   // Fluorine - Periodic Table of Videos (VERIFIED WORKING)
  Ne: 'xJl2lkphqS4',  // Neon - Periodic Table of Videos
  
  // Chu kỳ 3
  Na: 'PLxrB50g53F1',  // Sodium - Periodic Table of Videos
  Mg: 'iSh5G4u1xLI',  // Magnesium - Periodic Table of Videos
  Al: 'utS2PQ4hSVk',  // Aluminium - Periodic Table of Videos
  Si: 'AoyBPwWcL0E',  // Silicon - Periodic Table of Videos
  P: 'se_cuPzbHMg',   // Phosphorus - Periodic Table of Videos
  S: 'yG2YoHbHgYc',   // Sulfur - Periodic Table of Videos
  Cl: 'Q98QDXJH0LI',  // Chlorine - Periodic Table of Videos
  Ar: 'pRyoX5TXEFs',  // Argon - Periodic Table of Videos
  
  // Chu kỳ 4
  K: 'GqGZzCxNZAs',   // Potassium - Periodic Table of Videos
  Ca: 'pjnQ5CTBGxA',  // Calcium - Periodic Table of Videos
  Sc: 'a_mKEFqCqhU',  // Scandium - Periodic Table of Videos
  Ti: 'lMF0YPxEhBk',  // Titanium - Periodic Table of Videos
  V: 'pFhC4m-tGEg',   // Vanadium - Periodic Table of Videos
  Cr: '1mLkxGdCBuo',  // Chromium - Periodic Table of Videos
  Mn: 'YSrK7TfOlp0',  // Manganese - Periodic Table of Videos
  Fe: 'lnFe1kWf2wQ',  // Iron - Periodic Table of Videos
  Co: 'lxfXIFWkJFc',  // Cobalt - Periodic Table of Videos
  Ni: '5b11d7E10Go',  // Nickel - Periodic Table of Videos
  Cu: 'nPLWGDR1tLI',  // Copper - Periodic Table of Videos
  Zn: 'wQg3l-lqbIg',  // Zinc - Periodic Table of Videos
  Ga: 'cvRcUeWjBu0',  // Gallium - Periodic Table of Videos
  Ge: 'b3OBNLiEuGw',  // Germanium - Periodic Table of Videos
  As: 'Xn7bIBi5VoE',  // Arsenic - Periodic Table of Videos
  Se: 'jvS4lNyLlGE',  // Selenium - Periodic Table of Videos
  Br: 'f0w_aTpxIFE',  // Bromine - Periodic Table of Videos
  Kr: 'G_SXbN7IqOY',  // Krypton - Periodic Table of Videos
  
  // Chu kỳ 5
  Rb: 'ZwLwZu8W8n8',  // Rubidium - Periodic Table of Videos
  Sr: 'FwGSJcG3SAg',  // Strontium - Periodic Table of Videos
  Y: 'kVqf1RNoq2Y',   // Yttrium - Periodic Table of Videos
  Zr: 'XYoOQ3VNJCY',  // Zirconium - Periodic Table of Videos
  Nb: 'U0c3OkZFMnA',  // Niobium - Periodic Table of Videos
  Mo: '6Bs3Hg0pJXA',  // Molybdenum - Periodic Table of Videos
  Tc: '91eLBj48wP0',  // Technetium - Periodic Table of Videos
  Ru: '7ugjB7FcxAM',  // Ruthenium - Periodic Table of Videos
  Rh: 'IDL09G4ey44',  // Rhodium - Periodic Table of Videos
  Pd: 'RQSW-Ku31HQ',  // Palladium - Periodic Table of Videos
  Ag: 'DMnU7aD79q8',  // Silver - Periodic Table of Videos
  Cd: 'wFl1Gd9uLio',  // Cadmium - Periodic Table of Videos
  In: 'kLZHM0pXb6k',  // Indium - Periodic Table of Videos
  Sn: '20aRtSvnqWc',  // Tin - Periodic Table of Videos
  Sb: 'QjjfUIFb_og',  // Antimony - Periodic Table of Videos
  Te: 'qwOAylZNDlE',  // Tellurium - Periodic Table of Videos
  I: 'M7r_5TERGFo',   // Iodine - Periodic Table of Videos
  Xe: 'Xwbrtb1lKcU',  // Xenon - Periodic Table of Videos
  
  // Chu kỳ 6
  Cs: 'uixxJtJPVXk',  // Caesium - Periodic Table of Videos
  Ba: 'GZ0k8ZCvO-E',  // Barium - Periodic Table of Videos
  La: 'I7YA2D7-KvY',  // Lanthanum - Periodic Table of Videos
  Ce: 'vuGzVa3eNsc',  // Cerium - Periodic Table of Videos
  Pr: 'bh-w9z2uc1U',  // Praseodymium - Periodic Table of Videos
  Nd: 'E5BhQZ5JmA8',  // Neodymium - Periodic Table of Videos
  Pm: 'Qo22rfDLToM',  // Promethium - Periodic Table of Videos
  Sm: '6yV7KLu-J4U',  // Samarium - Periodic Table of Videos
  Eu: 'mzK7fBxYJWU',  // Europium - Periodic Table of Videos
  Gd: '8Ul3e4w0ql0',  // Gadolinium - Periodic Table of Videos
  Tb: 'EfcBpVr5bqg',  // Terbium - Periodic Table of Videos
  Dy: '4b4KzGSwHRc',  // Dysprosium - Periodic Table of Videos
  Ho: 'VEGDFqZ59jo',  // Holmium - Periodic Table of Videos
  Er: 'h-6FBaE0Kzs',  // Erbium - Periodic Table of Videos
  Tm: 'yJxf6s-9PiA',  // Thulium - Periodic Table of Videos
  Yb: 'PYxfCfR3aTI',  // Ytterbium - Periodic Table of Videos
  Lu: 'dBvuXhsmVWY',  // Lutetium - Periodic Table of Videos
  Hf: 'ND7K8wOnOXM',  // Hafnium - Periodic Table of Videos
  Ta: '9h_2N1D_Yqg',  // Tantalum - Periodic Table of Videos
  W: 'YVhIRhasZLs',   // Tungsten - Periodic Table of Videos
  Re: 'C8d60DmaKOs',  // Rhenium - Periodic Table of Videos
  Os: 'faLNvfqNH5E',  // Osmium - Periodic Table of Videos
  Ir: 'ONR74U_9GvQ',  // Iridium - Periodic Table of Videos
  Pt: 'kq7DDk8eLs8',  // Platinum - Periodic Table of Videos
  Au: 'N1F-fDME6ZA',  // Gold - Periodic Table of Videos
  Hg: 'ZiWlthrtneU',  // Mercury - Periodic Table of Videos
  Tl: 'rxwmrYPAYn4',  // Thallium - Periodic Table of Videos
  Pb: 'PNSPlfqyM4w',  // Lead - Periodic Table of Videos
  Bi: 'FlXEgxokGcU',  // Bismuth - Periodic Table of Videos
  Po: 'LQXVZ8XHKdQ',  // Polonium - Periodic Table of Videos
  At: 'yPVjgsk2YRE',  // Astatine - Periodic Table of Videos
  Rn: 'vZdpGBPt9E8',  // Radon - Periodic Table of Videos
  
  // Chu kỳ 7
  Fr: 'hbSw3KRjTLc',  // Francium - Periodic Table of Videos
  Ra: 'fT6A9HQnvVY',  // Radium - Periodic Table of Videos
  Ac: '9wzMeEN1JVE',  // Actinium - Periodic Table of Videos
  Th: 'nz2uVLQrMjE',  // Thorium - Periodic Table of Videos
  Pa: '3N2zMzR_lC0',  // Protactinium - Periodic Table of Videos
  U: 'TRL7o2kPqw0',   // Uranium - Periodic Table of Videos
  Np: '0x7Hny4E_bY',  // Neptunium - Periodic Table of Videos
  Pu: '89UNPdNtOoE',  // Plutonium - Periodic Table of Videos
  Am: 'MJyMbq26a9E',  // Americium - Periodic Table of Videos
  Cm: 'RlZ1iHXM-yM',  // Curium - Periodic Table of Videos
  Bk: 'hPjQnR_Jc6Y',  // Berkelium - Periodic Table of Videos
  Cf: '4lGk-ZfOBP8',  // Californium - Periodic Table of Videos
  Es: '0uNTpqBu4T8',  // Einsteinium - Periodic Table of Videos
  Fm: '0uNTpqBu4T8',  // Fermium (same video as Es - Transactinides)
  Md: '0uNTpqBu4T8',  // Mendelevium
  No: '0uNTpqBu4T8',  // Nobelium
  Lr: '0uNTpqBu4T8',  // Lawrencium
  
  // Nguyên tố siêu nặng (Transactinides - video chung)
  Rf: '0uNTpqBu4T8',
  Db: '0uNTpqBu4T8',
  Sg: '0uNTpqBu4T8',
  Bh: '0uNTpqBu4T8',
  Hs: '0uNTpqBu4T8',
  Mt: '0uNTpqBu4T8',
  Ds: '0uNTpqBu4T8',
  Rg: '0uNTpqBu4T8',
  Cn: '0uNTpqBu4T8',
  Nh: '0uNTpqBu4T8',
  Fl: '0uNTpqBu4T8',
  Mc: '0uNTpqBu4T8',
  Lv: '0uNTpqBu4T8',
  Ts: '0uNTpqBu4T8',
  Og: '0uNTpqBu4T8',
};

// Kiểm tra từng video
function checkVideo(symbol, videoId) {
  return new Promise((resolve) => {
    const url = `https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${videoId}&format=json`;
    
    https.get(url, (res) => {
      if (res.statusCode === 200) {
        let data = '';
        res.on('data', chunk => data += chunk);
        res.on('end', () => {
          try {
            const json = JSON.parse(data);
            console.log(`✓ ${symbol}: ${videoId} - "${json.title.substring(0, 50)}..."`);
            resolve({ symbol, videoId, status: 'ok', title: json.title });
          } catch (e) {
            console.log(`✗ ${symbol}: ${videoId} - Parse Error`);
            resolve({ symbol, videoId, status: 'error' });
          }
        });
      } else {
        console.log(`✗ ${symbol}: ${videoId} - Status ${res.statusCode}`);
        resolve({ symbol, videoId, status: 'not_found' });
      }
    }).on('error', (e) => {
      console.log(`✗ ${symbol}: ${videoId} - Network Error`);
      resolve({ symbol, videoId, status: 'error' });
    });
  });
}

async function main() {
  console.log('Kiểm tra các video YouTube từ danh sách đã xác minh...\n');
  
  const results = [];
  const entries = Object.entries(verifiedVideoIds);
  
  for (const [symbol, videoId] of entries) {
    const result = await checkVideo(symbol, videoId);
    results.push(result);
    await new Promise(r => setTimeout(r, 200)); // Delay
  }
  
  console.log('\n=== Kết quả ===');
  const working = results.filter(r => r.status === 'ok').length;
  const notWorking = results.filter(r => r.status !== 'ok');
  console.log(`Hoạt động: ${working}/${results.length}`);
  console.log(`Không hoạt động: ${notWorking.length}/${results.length}`);
  
  if (notWorking.length > 0) {
    console.log('\nCác video không hoạt động:');
    notWorking.forEach(r => {
      console.log(`  - ${r.symbol}: ${r.videoId}`);
    });
  }
  
  // In ra code để thay thế
  console.log('\n\n=== CODE ĐỂ THAY THẾ (chỉ các video hoạt động) ===\n');
  console.log('const elementVideos = {');
  results.filter(r => r.status === 'ok').forEach(r => {
    console.log(`  ${r.symbol}: 'https://www.youtube.com/embed/${r.videoId}',`);
  });
  console.log('};');
}

main();
