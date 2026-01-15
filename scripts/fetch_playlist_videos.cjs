/**
 * Script để lấy tất cả video từ YouTube Playlist
 * Playlist: Periodic Videos - https://www.youtube.com/playlist?list=PL7A1F4CF36C085DE1
 * 
 * HƯỚNG DẪN SỬ DỤNG:
 * 1. Lấy API Key từ Google Cloud Console (https://console.cloud.google.com/)
 *    - Tạo project mới
 *    - Bật YouTube Data API v3
 *    - Tạo API Key trong Credentials
 * 
 * 2. Thay YOUR_API_KEY bằng API Key của bạn
 * 
 * 3. Chạy: node scripts/fetch_playlist_videos.cjs
 */

const https = require('https');
const fs = require('fs');

// ⚠️ THAY API KEY CỦA BẠN VÀO ĐÂY
const API_KEY = 'AIzaSyCVfvpEW0HzFmn0ocvYJZQdB5IYOF6HERs';

// Playlist ID từ URL: https://www.youtube.com/playlist?list=PL7A1F4CF36C085DE1
const PLAYLIST_ID = 'PL7A1F4CF36C085DE1';

// Số video mỗi request (max 50)
const MAX_RESULTS = 50;

function fetchPlaylistPage(pageToken = '') {
  return new Promise((resolve, reject) => {
    const params = new URLSearchParams({
      part: 'snippet',
      playlistId: PLAYLIST_ID,
      maxResults: MAX_RESULTS,
      key: API_KEY,
    });
    
    if (pageToken) {
      params.append('pageToken', pageToken);
    }

    const url = `https://www.googleapis.com/youtube/v3/playlistItems?${params}`;
    
    https.get(url, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          const json = JSON.parse(data);
          if (json.error) {
            reject(new Error(`API Error: ${json.error.message}`));
          } else {
            resolve(json);
          }
        } catch (e) {
          reject(e);
        }
      });
    }).on('error', reject);
  });
}

async function getAllPlaylistVideos() {
  const allVideos = [];
  let pageToken = '';
  let pageNum = 1;
  
  console.log('=== LẤY VIDEO TỪ PLAYLIST PERIODIC VIDEOS ===\n');
  
  do {
    console.log(`Đang tải trang ${pageNum}...`);
    
    try {
      const response = await fetchPlaylistPage(pageToken);
      
      for (const item of response.items) {
        const video = {
          videoId: item.snippet.resourceId.videoId,
          title: item.snippet.title,
          description: item.snippet.description.substring(0, 200),
          thumbnail: item.snippet.thumbnails?.default?.url,
          position: item.snippet.position,
        };
        allVideos.push(video);
      }
      
      console.log(`  → Đã lấy ${response.items.length} video (Tổng: ${allVideos.length})`);
      
      pageToken = response.nextPageToken || '';
      pageNum++;
      
      // Delay để tránh rate limit
      await new Promise(r => setTimeout(r, 200));
      
    } catch (error) {
      console.error('Lỗi:', error.message);
      break;
    }
    
  } while (pageToken);
  
  return allVideos;
}

// Hàm trích xuất tên nguyên tố từ title video
function extractElementSymbol(title) {
  // Periodic Videos thường có format: "Element Name - Periodic Table of Videos"
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
  
  for (const [name, symbol] of Object.entries(elementMap)) {
    if (title.toLowerCase().includes(name.toLowerCase())) {
      return symbol;
    }
  }
  return null;
}

async function main() {
  if (API_KEY === 'YOUR_API_KEY') {
    console.log('⚠️  CHƯA CÓ API KEY!');
    console.log('\nHướng dẫn lấy API Key:');
    console.log('1. Vào https://console.cloud.google.com/');
    console.log('2. Tạo project mới hoặc chọn project có sẵn');
    console.log('3. Tìm và bật "YouTube Data API v3"');
    console.log('4. Vào Credentials → Create Credentials → API Key');
    console.log('5. Copy API Key và thay vào biến API_KEY trong file này');
    console.log('\n🔗 Link trực tiếp: https://console.cloud.google.com/apis/library/youtube.googleapis.com');
    return;
  }
  
  try {
    const videos = await getAllPlaylistVideos();
    
    console.log(`\n=== TỔNG CỘNG: ${videos.length} VIDEO ===\n`);
    
    // Tạo object mapping element -> videoId
    const elementVideos = {};
    const unmatchedVideos = [];
    
    for (const video of videos) {
      const symbol = extractElementSymbol(video.title);
      if (symbol && !elementVideos[symbol]) {
        elementVideos[symbol] = {
          videoId: video.videoId,
          title: video.title,
          url: `https://www.youtube.com/embed/${video.videoId}`
        };
      } else if (!symbol) {
        unmatchedVideos.push(video);
      }
    }
    
    // In kết quả
    console.log('=== VIDEO THEO NGUYÊN TỐ ===\n');
    const sortedElements = Object.entries(elementVideos).sort((a, b) => a[0].localeCompare(b[0]));
    
    for (const [symbol, info] of sortedElements) {
      console.log(`${symbol}: '${info.url}', // ${info.title}`);
    }
    
    console.log(`\n✓ Tìm thấy video cho ${sortedElements.length} nguyên tố`);
    console.log(`✗ ${unmatchedVideos.length} video không match với nguyên tố cụ thể`);
    
    // Lưu kết quả ra file
    const output = {
      fetchedAt: new Date().toISOString(),
      totalVideos: videos.length,
      elementVideos: elementVideos,
      unmatchedVideos: unmatchedVideos.slice(0, 20) // Chỉ lưu 20 video đầu
    };
    
    fs.writeFileSync(
      'scripts/playlist_videos_result.json', 
      JSON.stringify(output, null, 2),
      'utf8'
    );
    
    console.log('\n📁 Đã lưu kết quả vào: scripts/playlist_videos_result.json');
    
    // Tạo code snippet để copy vào PeriodicTable.jsx
    let codeSnippet = 'const elementVideos = {\n';
    for (const [symbol, info] of sortedElements) {
      codeSnippet += `  ${symbol}: '${info.url}',\n`;
    }
    codeSnippet += '};\n';
    
    fs.writeFileSync('scripts/elementVideos_code.js', codeSnippet, 'utf8');
    console.log('📁 Đã tạo code snippet: scripts/elementVideos_code.js');
    
  } catch (error) {
    console.error('Lỗi:', error.message);
  }
}

main();
