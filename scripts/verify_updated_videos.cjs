/**
 * Script để xác minh các video YouTube đã cập nhật hoạt động
 * Chạy: node scripts/verify_updated_videos.cjs
 */

const https = require('https');

// Các video đã xác minh hoạt động
const workingVideos = {
  H: '6rdmpx39PRk',  // ✓ Hydrogen
  C: 'QuW4_bRHbUk',  // ✓ Carbon
  N: 'gjsMV1MglA4',  // ✓ Nitrogen (Leidenfrost)
  O: 'v3rhQc666Sg',  // ✓ Oxygen
  F: 'vtWp45Eewtw',  // ✓ Fluorine
  Na: 'ODf_sPexS2Q', // ✓ Sodium
  P: 'ckSoDW2-wrc',  // ✓ Phosphorus
  Fe: 'BqLH-nTZEOc', // ✓ Iron
  Ga: 'cvRcUeWjBu0', // ✓ Gallium
  Cs: 'uixxJtJPVXk', // ✓ Cesium
  Pt: 'kq7DDk8eLs8', // ✓ Platinum
  Hg: 'ZiWlthrtneU', // ✓ Mercury
  U: 'TRL7o2kPqw0',  // ✓ Uranium
  Pu: '89UNPdNtOoE', // ✓ Plutonium
  FALLBACK: 'rz4Dd1I_fX0' // Video tổng quan bảng tuần hoàn
};

async function checkVideo(symbol, videoId) {
  return new Promise((resolve) => {
    const url = `https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${videoId}&format=json`;
    
    https.get(url, (res) => {
      resolve({ symbol, videoId, status: res.statusCode, working: res.statusCode === 200 });
    }).on('error', (err) => {
      resolve({ symbol, videoId, status: 'error', working: false, error: err.message });
    });
  });
}

async function main() {
  console.log('=== XÁC MINH VIDEO YOUTUBE ĐÃ CẬP NHẬT ===\n');
  
  const entries = Object.entries(workingVideos);
  let workingCount = 0;
  
  for (const [symbol, videoId] of entries) {
    const result = await checkVideo(symbol, videoId);
    const status = result.working ? '✓ HOẠT ĐỘNG' : '✗ KHÔNG HOẠT ĐỘNG';
    console.log(`${symbol}: ${status} (${videoId})`);
    if (result.working) workingCount++;
    
    // Delay giữa các request
    await new Promise(r => setTimeout(r, 100));
  }
  
  console.log(`\n=== KẾT QUẢ ===`);
  console.log(`Hoạt động: ${workingCount}/${entries.length} video`);
  console.log(`\nTất cả các nguyên tố còn lại sử dụng FALLBACK_VIDEO (video tổng quan về bảng tuần hoàn)`);
}

main().catch(console.error);
