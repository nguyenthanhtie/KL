/**
 * Xác minh và cập nhật video từ Periodic Videos playlist
 * Chạy: node scripts/verify_and_update.cjs
 */

const https = require('https');
const fs = require('fs');

// Video từ playlist đã lấy được
const playlistVideos = {
  H: '6rdmpx39PRk', // Hydrogen
  He: 'M6xZZiaLOV4', // Helium
  Li: 'LfS10ArXTBA', // Lithium
  Be: 'qy8JyQShZRA', // Beryllium
  B: 'JzqdHkpXuy4', // Boron
  C: 'QuW4_bRHbUk', // Carbon
  N: 'H8XNdqA18-M', // Nitrogen
  O: 'WuG5WTId-IY', // Oxygen
  F: 'vtWp45Eewtw', // Fluorine
  Ne: 'ILkvZKSVRI4', // Neon
  Na: '7IT2I3LtlNE', // Sodium
  Mg: 'FKkWdizutxI', // Magnesium
  Al: '4AhZ8503WPs', // Aluminium
  Si: 'a2aWO5cL410', // Silicon
  P: 'LSYLUat03A4', // Phosphorus
  S: 'mGMR72X8V-U', // Sulfur
  Cl: 'BXCfBl4rmh0', // Chlorine
  Ar: 'N0Gw6-xMLlo', // Argon
  K: 'pPdevJTGAYY', // Potassium
  Ca: 'V9fuY8_ffFg', // Calcium
  Sc: 'gab_2a7gyLU', // Scandium
  Ti: 'MpFTQYynrc4', // Titanium
  V: 'MbCmaQzrZoc', // Vanadium
  Cr: '9NPjdDS11C4', // Chromium
  Mn: 'uTVtBuY9Q-0', // Manganese
  Fe: 'euQUgp5AY-Y', // Iron
  Co: 'MWtL3pvGC68', // Cobalt
  Ni: 'AUmoaZn9bek', // Nickel
  Cu: 'kop1sWzTK-I', // Copper
  Zn: '99wPiMb-k0o', // Zinc
  Ga: 'N6ccRvKKwZQ', // Gallium
  Ge: 'osrKWVknkgs', // Germanium
  As: 'yD8Vz-mFHgI', // Arsenic
  Se: 'IHrUtKjcAFE', // Selenium
  Br: 'Slt3_5upuSs', // Bromine
  Kr: 'il4OOY7Zseg', // Krypton
  Rb: '0XLGopBovoI', // Rubidium
  Sr: 'd5ztPGrsgNQ', // Strontium
  Y: 'NxbOQ1FhqdQ', // Yttrium
  Zr: 'gNJE2MPktvg', // Zirconium
  Nb: '2ciPAsVTq6c', // Niobium
  Mo: 'ZRQ3vBGskds', // Molybdenum
  Tc: 'ud5c1TVkcnU', // Technetium
  Ru: 'wl5ZYb0hDTc', // Ruthenium
  Rh: 'PPSO5798k2I', // Rhodium
  Pd: '4ALTGeqmNFM', // Palladium
  Ag: 'pPd5qAb4J50', // Silver
  Cd: 'boRius1DYdQ', // Cadmium
  In: 'TviX7V-ay5I', // Indium
  Sn: 'rXZscASelkc', // Tin
  Sb: 'kcc6qNT3BoU', // Antimony
  Te: '5ChFbVu4Mpk', // Tellurium
  I: 'JUBsJLRSM64', // Iodine
  Xe: 'Ejoct_6pQ74', // Xenon
  Cs: '5aD6HwUE2c0', // Caesium
  Ba: '9srJdQU3NOo', // Barium
  La: 'Q21clW0s0B8', // Lanthanum
  Ce: 'frD3126ry8o', // Cerium
  Pr: 'IL06CzXF3ns', // Praseodymium
  Nd: 'PBbl-3_R3mk', // Neodymium
  Pm: 'HplP_MY78NQ', // Promethium
  Sm: 'RBTO5f8U218', // Samarium
  Eu: '88YOmg_FUVo', // Europium
  Gd: 'uUo7pY38fGY', // Gadolinium
  Tb: 'On5LjH9TQxY', // Terbium
  Dy: '8TE3iRXVcmY', // Dysprosium
  Ho: 'HQahtzCU0BU', // Holmium
  Er: 'E-DY_RT4fJ4', // Erbium
  Tm: 'vS0vhYdOGMc', // Thulium
  Yb: 'W43RjHww0e0', // Ytterbium (bổ sung)
  Lu: '7wrDfRnRHqI', // Lutetium
  Hf: 'Qb9f5uBKJhg', // Hafnium
  Ta: '51xFP1Yn3g0', // Tantalum
  W: '59ph6I0DoQE', // Tungsten
  Re: 'YOmStzA2azw', // Rhenium
  Os: 'AdX-T2Vv68Y', // Osmium
  Ir: 'cuovE4OQi2g', // Iridium
  Pt: 'GB86mnBY3DI', // Platinum (bổ sung từ channel)
  Au: '7dF0QTzcuac', // Gold
  Hg: 'oL0M_6bfzkU', // Mercury
  Tl: '4SVhSZ-rfLM', // Thallium
  Pb: '2ERfPN5JLX8', // Lead
  Bi: 'vyIo-c7VmIM', // Bismuth
  Po: 'bbr5yWwsI1o', // Polonium
  At: 'hJ5NHjFjAZE', // Astatine (bổ sung)
  Rn: 'mTuC_LrEfbU', // Radon
  Fr: 'hpYxllgfMSg', // Francium
  Ra: '5_I6vj-lXNM', // Radium
  Ac: '3bSTHWHE8Ag', // Actinium (bổ sung)
  Th: '2yZGcr0mpw0', // Thorium
  Pa: 'Z7u2F0YGEAQ', // Protactinium (bổ sung)
  U: 'B8vVZTvJNGk', // Uranium
  Np: '1D75B0_URbE', // Neptunium
  Pu: '89UNPdNtOoE', // Plutonium
  Am: 'CC-L-CITg3k', // Americium
  Cm: 'sZobqPFNcwg', // Curium
  Bk: '7p1D9C1qkZY', // Berkelium
  Cf: 'E0wtKOG8trE', // Californium
  Es: 'UdJeLlwrVUI', // Einsteinium
  Fm: 'SQhI52sqanA', // Fermium
  Md: 'hUgAqPj3xBA', // Mendelevium (bổ sung)
  No: 'VxzjPUc3IjM', // Nobelium (bổ sung)
  Lr: 'kJy3E9xYNIs', // Lawrencium (bổ sung)
};

// Các nguyên tố không có video riêng - dùng fallback
const FALLBACK_VIDEO = 'rz4Dd1I_fX0';
const missingElements = ['Rf', 'Db', 'Sg', 'Bh', 'Hs', 'Mt', 'Ds', 'Rg', 'Cn', 'Nh', 'Fl', 'Mc', 'Lv', 'Ts', 'Og'];

async function checkVideo(symbol, videoId) {
  return new Promise((resolve) => {
    const url = `https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${videoId}&format=json`;
    
    https.get(url, (res) => {
      resolve({ symbol, videoId, working: res.statusCode === 200 });
    }).on('error', () => {
      resolve({ symbol, videoId, working: false });
    });
  });
}

async function main() {
  console.log('=== XÁC MINH VIDEO TỪ PERIODIC VIDEOS PLAYLIST ===\n');
  
  const entries = Object.entries(playlistVideos);
  const results = { working: [], notWorking: [] };
  
  for (let i = 0; i < entries.length; i += 5) {
    const batch = entries.slice(i, i + 5);
    const checks = await Promise.all(batch.map(([s, v]) => checkVideo(s, v)));
    
    for (const r of checks) {
      if (r.working) {
        results.working.push(r);
        process.stdout.write(`✓`);
      } else {
        results.notWorking.push(r);
        process.stdout.write(`✗`);
      }
    }
    
    await new Promise(r => setTimeout(r, 100));
  }
  
  console.log(`\n\n=== KẾT QUẢ ===`);
  console.log(`✓ Hoạt động: ${results.working.length}/${entries.length}`);
  console.log(`✗ Không hoạt động: ${results.notWorking.length}`);
  
  if (results.notWorking.length > 0) {
    console.log('\nVideo không hoạt động:');
    for (const r of results.notWorking) {
      console.log(`  - ${r.symbol}: ${r.videoId}`);
    }
  }
  
  // Tạo code để cập nhật PeriodicTable.jsx
  console.log('\n=== TẠO CODE CẬP NHẬT ===\n');
  
  let code = `// Video data cho các nguyên tố - Cập nhật từ Periodic Videos playlist
// Nguồn: https://www.youtube.com/playlist?list=PL7A1F4CF36C085DE1
// Cập nhật: ${new Date().toISOString().split('T')[0]}
const FALLBACK_VIDEO = 'https://www.youtube.com/embed/${FALLBACK_VIDEO}';

const elementVideos = {\n`;
  
  // Thêm video hoạt động
  for (const r of results.working) {
    code += `  ${r.symbol}: 'https://www.youtube.com/embed/${r.videoId}', // ✓ Periodic Videos\n`;
  }
  
  // Thêm fallback cho video không hoạt động
  for (const r of results.notWorking) {
    code += `  ${r.symbol}: FALLBACK_VIDEO, // Video gốc không hoạt động\n`;
  }
  
  // Thêm nguyên tố siêu nặng
  for (const el of missingElements) {
    code += `  ${el}: FALLBACK_VIDEO, // Không có video riêng\n`;
  }
  
  code += `};\n`;
  
  fs.writeFileSync('scripts/updated_elementVideos.js', code, 'utf8');
  console.log('📁 Đã lưu code: scripts/updated_elementVideos.js');
  
  // Lưu danh sách video hoạt động
  const workingList = {};
  for (const r of results.working) {
    workingList[r.symbol] = r.videoId;
  }
  fs.writeFileSync('scripts/working_videos.json', JSON.stringify(workingList, null, 2), 'utf8');
  console.log('📁 Đã lưu danh sách: scripts/working_videos.json');
}

main().catch(console.error);
