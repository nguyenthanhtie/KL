const https = require('https');

// Danh sách các video ID đã xác nhận hoạt động + các ID mới cần kiểm tra
// Từ các kênh: Periodic Videos, NileRed, Thoisoi2, SciShow, Veritasium, Crash Course, etc.
const testVideoIds = {
  // === ĐÃ XÁC NHẬN HOẠT ĐỘNG ===
  H: '6rdmpx39PRk',       // ✓ Hydrogen - Periodic Videos
  C: 'QuW4_bRHbUk',       // ✓ Carbon - Periodic Videos  
  F: 'vtWp45Eewtw',       // ✓ Fluorine - Periodic Videos
  Na: 'ODf_sPexS2Q',      // ✓ Sodium in Water
  Ga: 'cvRcUeWjBu0',      // ✓ Gallium spoon
  Cs: 'uixxJtJPVXk',      // ✓ Alkali metals in water
  Hg: 'ZiWlthrtneU',      // ✓ Mercury - Element Series
  
  // === CẦN TÌM VIDEO MỚI ===
  He: 'T9k3WPmubpk',      // Helium - Crash Course Chemistry
  Li: '2xt2o7y_iws',      // Lithium 
  Be: 'jVXR3UkM8dM',      // Beryllium
  B: 'QqJ_RZYf5Ow',       // Boron
  N: 'gjsMV1MglA4',       // ✓ Liquid Nitrogen - Leidenfrost
  O: 'v3rhQc666Sg',       // ✓ Oxygen
  Ne: 'AVQ8byG2mY8',      // Neon
  Mg: '0d8VOqxEcBg',      // Magnesium
  Al: 'lkLUPonV9D8',      // Aluminum
  Si: 'N3LVKQ0SXFY',      // Silicon
  P: 'ckSoDW2-wrc',       // Phosphorus
  S: '8pD4TuLv1Sk',       // Sulfur  
  Cl: 'P3MvKwR0G_8',      // Chlorine
  Ar: 'HsNQwKZVimc',      // Argon
  K: 'wZVQIgz3X1Y',       // Potassium
  Ca: 'b3fDC64M-Cc',      // Calcium
  Sc: 'RZNxsVe6nxU',      // Scandium
  Ti: 'YW3OU4l9JMM',      // Titanium
  V: 'V0u9LnHZqLY',       // Vanadium
  Cr: 'Ib-Wfz-yHgM',      // Chromium
  Mn: 'SGnWV2l-lHc',      // Manganese
  Fe: 'BqLH-nTZEOc',      // ✓ Iron
  Co: 'XjxhwN7YYsc',      // Cobalt
  Ni: 'WxMM2uxrE4k',      // Nickel
  Cu: 'YSabRCKUwlY',      // Copper
  Zn: 'GS52dpXNR7c',      // Zinc
  Ge: 'qXVApxLbBcs',      // Germanium
  As: 'P-f6KnZPgxs',      // Arsenic
  Se: 'rvBfp-iUjQI',      // Selenium
  Br: '5lq4OFscSkA',      // Bromine
  Kr: 'g8EUIFwVnU8',      // Krypton
  Rb: 'NL2TjpRRX8U',      // Rubidium
  Sr: 'BTZ4oj6bkNg',      // Strontium
  Y: 'HpEj0dI_Lac',       // Yttrium
  Zr: 'JUXH2PGD9es',      // Zirconium
  Nb: '0XjvyLIDfWc',      // Niobium
  Mo: 'e90I7Z3U1oc',      // Molybdenum
  Tc: 'PKXFXT5xRfQ',      // Technetium
  Ru: 'PHxvMLoKRWg',      // Ruthenium
  Rh: 'E7kF4e4xIV0',      // Rhodium
  Pd: '0j6lTPHMQKM',      // Palladium
  Ag: 'tMPiXE0H5y0',      // Silver
  Cd: 'P9QWdY6ywZ0',      // Cadmium
  In: 'yCHlQ0zVJCs',      // Indium
  Sn: 'mIHYDDpG2HE',      // Tin
  Sb: 'qThcMvYn2xI',      // Antimony
  Te: 'RKHc--pHq3s',      // Tellurium
  I: 'MRggHJ7vNCM',       // Iodine
  Xe: 'YJe_eDCJLlQ',      // Xenon
  Ba: 'yC-a3w2VqFM',      // Barium
  La: 'VBM7l7nH3PQ',      // Lanthanum
  Ce: 'RVhSxQf3jEY',      // Cerium
  Pr: 'Ou-SNgdW3cg',      // Praseodymium
  Nd: 'EHLxiJEjFdc',      // Neodymium
  Pm: 'x7eRs7bpWQs',      // Promethium
  Sm: 'nAD-sYY_dJ0',      // Samarium
  Eu: 'Ln_jITNcuJ8',      // Europium
  Gd: 'p2NRW8n5Vk4',      // Gadolinium
  Tb: 'kWjvPjFjyJI',      // Terbium
  Dy: 'sHwJdYXCGI4',      // Dysprosium
  Ho: 'aY2_WDVhgqQ',      // Holmium
  Er: 'yToQQU6Wbh4',      // Erbium
  Tm: 'x8kMq0Kz-Bs',      // Thulium
  Yb: 'X8cfuAy0OU0',      // Ytterbium
  Lu: 'cKJv0lPw9YE',      // Lutetium
  Hf: 'nY1qSCRLQKQ',      // Hafnium
  Ta: 'OJP5xQJxVVQ',      // Tantalum
  W: 'lFQ2PCw0gwg',       // Tungsten
  Re: 'r3GDSj9NsKE',      // Rhenium
  Os: 'QySbzp6KKr4',      // Osmium
  Ir: 'WwkkVjZFZ84',      // Iridium
  Pt: 'kq7DDk8eLs8',      // ✓ Platinum (verified earlier)
  Au: 'sCU4lQz-jnc',      // Gold
  Tl: 'dqP8yV4roFM',      // Thallium
  Pb: 'Kq2WmS3LPBs',      // Lead
  Bi: 'sM0LNxcGG0w',      // Bismuth
  Po: 'bz0wlnhyp6U',      // Polonium
  At: 'Z0HY3SvUFCc',      // Astatine
  Rn: 'A7qx8SQD-uQ',      // Radon
  Fr: 'QxC9iq_jKCE',      // Francium
  Ra: 'E1B2xpEtGCE',      // Radium
  Ac: 'XPXJJYYoBd0',      // Actinium
  Th: 'PnEsHgSwXlE',      // Thorium
  Pa: 'x7eRs7bpWQs',      // Protactinium
  U: 'TRL7o2kPqw0',       // ✓ Uranium (verified earlier)
  Np: 'uXqVCEw2EV0',      // Neptunium
  Pu: '89UNPdNtOoE',      // ✓ Plutonium (verified earlier)
  Am: 'nDTaZybQphQ',      // Americium
  Cm: 'fC0nMn0eTKg',      // Curium
  Bk: 'oQQK0lv0sPM',      // Berkelium
  Cf: 'oQQK0lv0sPM',      // Californium
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
            console.log(`✓ ${symbol}: ${videoId}`);
            resolve({ symbol, videoId, status: 'ok', title: json.title });
          } catch (e) {
            resolve({ symbol, videoId, status: 'error' });
          }
        });
      } else {
        console.log(`✗ ${symbol}: ${videoId}`);
        resolve({ symbol, videoId, status: 'not_found' });
      }
    }).on('error', (e) => {
      resolve({ symbol, videoId, status: 'error' });
    });
  });
}

async function main() {
  console.log('Kiểm tra danh sách video YouTube toàn diện...\n');
  
  const results = [];
  const entries = Object.entries(testVideoIds);
  
  for (const [symbol, videoId] of entries) {
    const result = await checkVideo(symbol, videoId);
    results.push(result);
    await new Promise(r => setTimeout(r, 150));
  }
  
  const working = results.filter(r => r.status === 'ok');
  const notWorking = results.filter(r => r.status !== 'ok');
  
  console.log(`\n\n=== KẾT QUẢ: ${working.length}/${results.length} video hoạt động ===\n`);
  
  // Tạo object JavaScript để copy/paste
  console.log('// Video YouTube đã xác minh hoạt động');
  console.log('const elementVideos = {');
  
  working.forEach(r => {
    console.log(`  ${r.symbol}: 'https://www.youtube.com/embed/${r.videoId}', // ${r.title ? r.title.substring(0, 40) : ''}`);
  });
  
  console.log('};');
  
  if (notWorking.length > 0) {
    console.log(`\n\n// Các nguyên tố cần tìm video mới (${notWorking.length}):`);
    notWorking.forEach(r => {
      console.log(`// ${r.symbol}`);
    });
  }
}

main();
