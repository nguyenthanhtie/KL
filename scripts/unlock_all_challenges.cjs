/**
 * Script mở khóa tất cả thử thách cho user
 * 
 * Cách dùng:
 * node scripts/unlock_all_challenges.cjs <username_hoặc_email>
 * 
 * Ví dụ:
 * node scripts/unlock_all_challenges.cjs test@example.com
 * node scripts/unlock_all_challenges.cjs testuser
 */

require('dotenv').config();
const mongoose = require('mongoose');
const User = require('../models/User.cjs');

// Danh sách tất cả challenge slugs (từ folder 11 và 12)
const ALL_CHALLENGE_SLUGS = [
  // Lớp 8
  'doan_hinh_bat_chu_08',
  'phong_thi_nghiem_08', 
  'pha_che_dung_dich_08',
  'quan_sat_phan_ung_08',
  'can_bang_phuong_trinh_08',
  'tinh_khoi_luong_mol_08',
  'oxi_khong_khi_08',
  'nhan_biet_dung_dich_08',
  'tong_ket_lop_8_08',
  
  // Lớp 9
  'hop_chat_vo_co_09',
  'kim_loai_09',
  'phi_kim_halogen_09',
  'hidrocacbon_09',
  'hidrocacbon_polime_09',
  'tong_hop_09',
  
  // Lớp 10
  'cau_truc_nguyen_tu_10',
  'ghep_nguyen_tu_10',
  'xay_dung_phan_tu_10',
  'tinh_oxi_hoa_10',
  'suy_luan_phan_ung_10',
  'chat_tan_dung_moi_10',
  'pha_che_dung_dich_nang_cao_10',
  'nhom_halogen_10',
  'oxi_luu_huynh_10',
  
  // Lớp 11
  'can_bang_phan_ung_11',
  'can_bang_phan_ung_nang_cao_11',
  'nito_luu_huynh_11',
  'dai_cuong_hoa_huu_co_11',
  'hidrocacbon_11',
  'dan_xuat_halogen_ancol_phenol_11',
  'hop_chat_carbonyl_carboxylic_11',
  'hoa_hoc_cuoc_song_11',
  
  // Lớp 12
  'este_lipit_12',
  'cacbohidrat_12',
  'amin_aminoaxit_protein_12',
  'polime_12',
  'dai_cuong_kim_loai_12',
  'sat_dong_hop_kim_12',
  'kim_loai_kiem_kiem_tho_nhom_12'
];

// Danh sách tất cả lesson IDs cần hoàn thành để unlock challenges
// Format: classId * 1000 + lessonId
// Ví dụ: lớp 11 bài 1 = 11001, lớp 11 bài 2 = 11002
const ALL_LESSON_IDS = [
  // Lớp 8: bài 1-20
  ...Array.from({length: 20}, (_, i) => 8001 + i),
  // Lớp 9: bài 1-20
  ...Array.from({length: 20}, (_, i) => 9001 + i),
  // Lớp 10: bài 1-25
  ...Array.from({length: 25}, (_, i) => 10001 + i),
  // Lớp 11: bài 1-25
  ...Array.from({length: 25}, (_, i) => 11001 + i),
  // Lớp 12: bài 1-30
  ...Array.from({length: 30}, (_, i) => 12001 + i),
];

async function unlockAllChallenges(userIdentifier) {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✓ Connected to MongoDB');

    // Find user by username or email
    const user = await User.findOne({
      $or: [
        { username: userIdentifier },
        { email: userIdentifier }
      ]
    });

    if (!user) {
      console.error(`❌ User not found: ${userIdentifier}`);
      process.exit(1);
    }

    console.log(`✓ Found user: ${user.username} (${user.email})`);

    // Find chemistry program
    let chemistryProgram = user.programs.find(p => p.programId === 'chemistry');
    
    if (!chemistryProgram) {
      console.log('⚠️ User not enrolled in chemistry, creating program...');
      user.programs.push({
        programId: 'chemistry',
        programName: 'Hóa học',
        currentClass: 11,
        curriculumType: 'ketnoi',
        isActive: true,
        placementTestCompleted: true,
        progress: {
          completedLessons: [],
          completedChallenges: [],
          lessonStars: new Map(),
          challengeStars: new Map(),
          challengeProgress: new Map(),
          challengeHistory: []
        }
      });
      chemistryProgram = user.programs[user.programs.length - 1];
    }

    // Ensure progress exists
    if (!chemistryProgram.progress) {
      chemistryProgram.progress = {
        completedLessons: [],
        completedChallenges: [],
        lessonStars: new Map(),
        challengeStars: new Map(),
        challengeProgress: new Map(),
        challengeHistory: []
      };
    }

    // Current completed challenges
    const currentCompleted = chemistryProgram.progress.completedChallenges || [];
    const currentLessons = chemistryProgram.progress.completedLessons || [];
    console.log(`📊 Current completed challenges: ${currentCompleted.length}`);
    console.log(`📚 Current completed lessons: ${currentLessons.length}`);

    // ============ THÊM TẤT CẢ LESSONS ĐỂ MỞ KHÓA CHALLENGES ============
    let addedLessonsCount = 0;
    for (const lessonId of ALL_LESSON_IDS) {
      if (!currentLessons.includes(lessonId)) {
        chemistryProgram.progress.completedLessons.push(lessonId);
        addedLessonsCount++;
        
        // Add stars for lessons
        if (!chemistryProgram.progress.lessonStars) {
          chemistryProgram.progress.lessonStars = new Map();
        }
        chemistryProgram.progress.lessonStars.set(String(lessonId), 3);
      }
    }
    console.log(`📚 Added ${addedLessonsCount} lessons`);

    // ============ THÊM TẤT CẢ CHALLENGES ============
    // Add all challenges to completedChallenges
    let addedCount = 0;
    for (const slug of ALL_CHALLENGE_SLUGS) {
      if (!currentCompleted.includes(slug)) {
        chemistryProgram.progress.completedChallenges.push(slug);
        addedCount++;
        
        // Add to challengeHistory with 3 stars
        if (!chemistryProgram.progress.challengeHistory) {
          chemistryProgram.progress.challengeHistory = [];
        }
        
        const existingHistory = chemistryProgram.progress.challengeHistory.find(h => h.challengeSlug === slug);
        if (!existingHistory) {
          chemistryProgram.progress.challengeHistory.push({
            challengeSlug: slug,
            challengeId: ALL_CHALLENGE_SLUGS.indexOf(slug) + 1,
            score: 100,
            maxScore: 100,
            percentage: 100,
            stars: 3,
            timeSpent: 300,
            completedAt: new Date()
          });
        }
        
        // Add stars
        if (!chemistryProgram.progress.challengeStars) {
          chemistryProgram.progress.challengeStars = new Map();
        }
        chemistryProgram.progress.challengeStars.set(slug, 3);
      }
    }

    // Add XP bonus
    user.xp = (user.xp || 0) + (addedCount * 100) + (addedLessonsCount * 50);
    
    // Save
    await user.save();
    
    console.log(`\n✅ SUCCESS!`);
    console.log(`📚 Added ${addedLessonsCount} lessons (unlock prerequisites)`);
    console.log(`📈 Added ${addedCount} new challenges`);
    console.log(`🏆 Total completed lessons: ${chemistryProgram.progress.completedLessons.length}`);
    console.log(`🏆 Total completed challenges: ${chemistryProgram.progress.completedChallenges.length}`);
    console.log(`⭐ XP added: ${addedCount * 100 + addedLessonsCount * 50}`);
    console.log(`💎 Total XP: ${user.xp}`);

  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  } finally {
    await mongoose.disconnect();
    console.log('\n✓ Disconnected from MongoDB');
  }
}

// Main
const userIdentifier = process.argv[2];

if (!userIdentifier) {
  console.log('❌ Please provide username or email');
  console.log('Usage: node scripts/unlock_all_challenges.cjs <username_or_email>');
  console.log('Example: node scripts/unlock_all_challenges.cjs test@example.com');
  process.exit(1);
}

unlockAllChallenges(userIdentifier);
