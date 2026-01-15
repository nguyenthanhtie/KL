/**
 * Phương pháp 2: Lấy video từ playlist KHÔNG CẦN API Key
 * Sử dụng YouTube initial data từ HTML page
 * 
 * Chạy: node scripts/fetch_playlist_no_api.cjs
 */

const https = require('https');
const fs = require('fs');

const PLAYLIST_URL = 'https://www.youtube.com/playlist?list=PL7A1F4CF36C085DE1';

function fetchPage(url) {
  return new Promise((resolve, reject) => {
    const options = {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept-Language': 'en-US,en;q=0.9',
      }
    };
    
    https.get(url, options, (res) => {
      if (res.statusCode === 302 || res.statusCode === 301) {
        fetchPage(res.headers.location).then(resolve).catch(reject);
        return;
      }
      
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve(data));
    }).on('error', reject);
  });
}

function extractVideosFromHTML(html) {
  const videos = [];
  
  // Tìm ytInitialData trong HTML
  const match = html.match(/var ytInitialData = ({.+?});/);
  if (!match) {
    console.log('Không tìm thấy ytInitialData, thử regex khác...');
    
    // Thử tìm video IDs bằng regex đơn giản
    const videoIdRegex = /\/watch\?v=([a-zA-Z0-9_-]{11})/g;
    const titleRegex = /"title":\s*{\s*"runs":\s*\[\s*{\s*"text":\s*"([^"]+)"/g;
    
    let match2;
    const videoIds = new Set();
    while ((match2 = videoIdRegex.exec(html)) !== null) {
      videoIds.add(match2[1]);
    }
    
    console.log(`Tìm thấy ${videoIds.size} video IDs từ HTML`);
    
    for (const videoId of videoIds) {
      videos.push({
        videoId,
        title: 'Unknown',
        url: `https://www.youtube.com/embed/${videoId}`
      });
    }
    
    return videos;
  }
  
  try {
    const data = JSON.parse(match[1]);
    
    // Navigate to playlist contents
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
            url: `https://www.youtube.com/embed/${video.videoId}`
          });
        }
      }
    }
  } catch (e) {
    console.log('Lỗi parse JSON:', e.message);
  }
  
  return videos;
}

// Mapping tên nguyên tố
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

async function main() {
  console.log('=== LẤY VIDEO TỪ PLAYLIST (KHÔNG CẦN API) ===\n');
  console.log('Đang tải playlist page...\n');
  
  try {
    const html = await fetchPage(PLAYLIST_URL);
    console.log(`Đã tải HTML (${html.length} bytes)\n`);
    
    const videos = extractVideosFromHTML(html);
    console.log(`Tìm thấy ${videos.length} video\n`);
    
    if (videos.length === 0) {
      console.log('Không thể lấy video từ HTML. YouTube có thể đã thay đổi cấu trúc.');
      console.log('\nPhương pháp thay thế: Dùng yt-dlp');
      console.log('1. Cài đặt: pip install yt-dlp');
      console.log('2. Chạy: yt-dlp --flat-playlist --print "%(id)s %(title)s" "https://www.youtube.com/playlist?list=PL7A1F4CF36C085DE1"');
      return;
    }
    
    // Match với nguyên tố
    const elementVideos = {};
    for (const video of videos) {
      const symbol = extractElementSymbol(video.title);
      if (symbol && !elementVideos[symbol]) {
        elementVideos[symbol] = video;
      }
    }
    
    console.log('=== KẾT QUẢ ===\n');
    for (const [symbol, video] of Object.entries(elementVideos)) {
      console.log(`${symbol}: '${video.url}', // ${video.title}`);
    }
    
    console.log(`\n✓ Tìm thấy ${Object.keys(elementVideos).length} nguyên tố`);
    
    // Lưu file
    fs.writeFileSync('scripts/playlist_result.json', JSON.stringify({
      videos,
      elementVideos
    }, null, 2));
    console.log('📁 Đã lưu: scripts/playlist_result.json');
    
  } catch (error) {
    console.error('Lỗi:', error.message);
  }
}

main();
