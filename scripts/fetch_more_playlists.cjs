/**
 * Lấy video từ nhiều playlist của Periodic Videos
 * Chạy: node scripts/fetch_more_playlists.cjs
 */

const https = require('https');
const fs = require('fs');

// Element mapping
const elementMap = {
  'Hydrogen': 'H', 'Helium': 'He', 'Lithium': 'Li', 'Beryllium': 'Be', 'Boron': 'B',
  'Carbon': 'C', 'Nitrogen': 'N', 'Oxygen': 'O', 'Fluorine': 'F', 'Neon': 'Ne',
  'Sodium': 'Na', 'Magnesium': 'Mg', 'Aluminium': 'Al', 'Aluminum': 'Al', 'Silicon': 'Si',
  'Phosphorus': 'P', 'Sulfur': 'S', 'Sulphur': 'S', 'Chlorine': 'Cl', 'Argon': 'Ar',
  'Potassium': 'K', 'Calcium': 'Ca', 'Scandium': 'Sc', 'Titanium': 'Ti', 'Vanadium': 'V',
  'Chromium': 'Cr', 'Manganese': 'Mn', 'Iron': 'Fe', 'Cobalt': 'Co', 'Nickel': 'Ni',
  'Copper': 'Cu', 'Zinc': 'Zn', 'Gallium': 'Ga', 'Germanium': 'Ge', 'Arsenic': 'As',
  'Selenium': 'Se', 'Bromine': 'Br', 'Krypton': 'Kr', 'Rubidium': 'Rb', 'Strontium': 'Sr',
  'Yttrium': 'Y', 'Zirconium': 'Zr', 'Niobium': 'Nb', 'Molybdenum': 'Mo', 'Technetium': 'Tc',
  'Ruthenium': 'Ru', 'Rhodium': 'Rh', 'Palladium': 'Pd', 'Silver': 'Ag', 'Cadmium': 'Cd',
  'Indium': 'In', 'Tin': 'Sn', 'Antimony': 'Sb', 'Tellurium': 'Te', 'Iodine': 'I',
  'Xenon': 'Xe', 'Caesium': 'Cs', 'Cesium': 'Cs', 'Barium': 'Ba', 'Lanthanum': 'La',
  'Cerium': 'Ce', 'Praseodymium': 'Pr', 'Neodymium': 'Nd', 'Promethium': 'Pm', 'Samarium': 'Sm',
  'Europium': 'Eu', 'Gadolinium': 'Gd', 'Terbium': 'Tb', 'Dysprosium': 'Dy', 'Holmium': 'Ho',
  'Erbium': 'Er', 'Thulium': 'Tm', 'Ytterbium': 'Yb', 'Lutetium': 'Lu', 'Hafnium': 'Hf',
  'Tantalum': 'Ta', 'Tungsten': 'W', 'Rhenium': 'Re', 'Osmium': 'Os', 'Iridium': 'Ir',
  'Platinum': 'Pt', 'Gold': 'Au', 'Mercury': 'Hg', 'Thallium': 'Tl', 'Lead': 'Pb',
  'Bismuth': 'Bi', 'Polonium': 'Po', 'Astatine': 'At', 'Radon': 'Rn', 'Francium': 'Fr',
  'Radium': 'Ra', 'Actinium': 'Ac', 'Thorium': 'Th', 'Protactinium': 'Pa', 'Uranium': 'U',
  'Neptunium': 'Np', 'Plutonium': 'Pu', 'Americium': 'Am', 'Curium': 'Cm', 'Berkelium': 'Bk',
  'Californium': 'Cf', 'Einsteinium': 'Es', 'Fermium': 'Fm', 'Mendelevium': 'Md', 'Nobelium': 'No',
  'Lawrencium': 'Lr', 'Rutherfordium': 'Rf', 'Dubnium': 'Db', 'Seaborgium': 'Sg', 'Bohrium': 'Bh',
  'Hassium': 'Hs', 'Meitnerium': 'Mt', 'Darmstadtium': 'Ds', 'Roentgenium': 'Rg', 'Copernicium': 'Cn',
  'Nihonium': 'Nh', 'Flerovium': 'Fl', 'Moscovium': 'Mc', 'Livermorium': 'Lv', 'Tennessine': 'Ts',
  'Oganesson': 'Og'
};

function extractElementSymbol(title) {
  for (const [name, symbol] of Object.entries(elementMap)) {
    if (title.toLowerCase().includes(name.toLowerCase())) {
      return symbol;
    }
  }
  return null;
}

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

async function fetchPlaylist(playlistId) {
  const url = `https://www.youtube.com/playlist?list=${playlistId}`;
  console.log(`Đang tải playlist ${playlistId}...`);
  
  try {
    const html = await fetchPage(url);
    const videos = [];
    
    // Extract video data from ytInitialData
    const match = html.match(/var ytInitialData = ({.+?});/);
    if (match) {
      try {
        const data = JSON.parse(match[1]);
        const contents = data?.contents?.twoColumnBrowseResultsRenderer?.tabs?.[0]
          ?.tabRenderer?.content?.sectionListRenderer?.contents?.[0]
          ?.itemSectionRenderer?.contents?.[0]?.playlistVideoListRenderer?.contents;
        
        if (contents) {
          for (const item of contents) {
            const video = item.playlistVideoRenderer;
            if (video) {
              videos.push({
                videoId: video.videoId,
                title: video.title?.runs?.[0]?.text || 'Unknown',
              });
            }
          }
        }
      } catch (e) {}
    }
    
    // Fallback: regex extraction
    if (videos.length === 0) {
      const regex = /\/watch\?v=([a-zA-Z0-9_-]{11})/g;
      const seen = new Set();
      let m;
      while ((m = regex.exec(html)) !== null) {
        if (!seen.has(m[1])) {
          seen.add(m[1]);
          videos.push({ videoId: m[1], title: 'Unknown' });
        }
      }
    }
    
    console.log(`  → Tìm thấy ${videos.length} video`);
    return videos;
  } catch (e) {
    console.log(`  Lỗi: ${e.message}`);
    return [];
  }
}

async function main() {
  console.log('=== LẤY VIDEO TỪ NHIỀU PLAYLIST ===\n');
  
  // Playlist chính đã lấy
  const mainPlaylist = JSON.parse(fs.readFileSync('scripts/playlist_result.json', 'utf8'));
  const elementVideos = mainPlaylist.elementVideos;
  
  console.log(`Đã có video cho ${Object.keys(elementVideos).length} nguyên tố\n`);
  
  // Các nguyên tố còn thiếu
  const missingElements = ['Yb', 'Pt', 'At', 'Ac', 'Pa', 'Md', 'No', 'Lr',
    'Rf', 'Db', 'Sg', 'Bh', 'Hs', 'Mt', 'Ds', 'Rg', 'Cn', 'Nh', 'Fl', 'Mc', 'Lv', 'Ts', 'Og'];
  
  console.log(`Cần tìm video cho: ${missingElements.join(', ')}\n`);
  
  // Thử tải thêm video từ playlist chính với scroll
  // (playlist có thể chứa >100 video nhưng chỉ load 100 đầu tiên)
  
  // Lấy playlist "More chemistry" và "New videos"
  const additionalPlaylists = [
    'PLFE2E32FC656F5F0F',  // More chemistry videos  
    'PLmEpMPpwZLzNaR5f4d0Q_mHb1c1v2JV3l',  // Uploads/new
  ];
  
  const allVideos = [...mainPlaylist.videos];
  
  for (const plId of additionalPlaylists) {
    const videos = await fetchPlaylist(plId);
    allVideos.push(...videos);
    await new Promise(r => setTimeout(r, 500));
  }
  
  console.log(`\nTổng cộng: ${allVideos.length} video từ tất cả playlist\n`);
  
  // Tìm nguyên tố còn thiếu trong tất cả video
  console.log('Tìm kiếm trong tất cả video...\n');
  
  const found = {};
  for (const video of allVideos) {
    const symbol = extractElementSymbol(video.title);
    if (symbol && missingElements.includes(symbol) && !found[symbol]) {
      found[symbol] = video;
      console.log(`✓ ${symbol}: ${video.videoId} - ${video.title}`);
    }
  }
  
  console.log(`\nTìm thấy thêm: ${Object.keys(found).length} nguyên tố`);
  
  // Các nguyên tố vẫn chưa có
  const stillMissing = missingElements.filter(e => !found[e]);
  console.log(`\nVẫn còn thiếu: ${stillMissing.join(', ')}`);
  
  // Lưu kết quả
  fs.writeFileSync('scripts/additional_videos.json', JSON.stringify(found, null, 2));
}

main().catch(console.error);
