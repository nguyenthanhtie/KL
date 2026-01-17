// ==================== NOTIFICATION SCHEDULER ====================
// Service để lên lịch và gửi thông báo tự động

const cron = require('node-cron');
const User = require('../models/User.cjs');
const notificationService = require('./notificationService.cjs');

class NotificationScheduler {
  constructor() {
    this.jobs = new Map();
  }

  // Khởi động tất cả scheduled jobs
  start() {
    console.log('🔔 Starting notification scheduler...');

    // Job 1: Kiểm tra và gửi nhắc nhở học tập mỗi phút
    this.scheduleStudyReminders();

    // Job 2: Kiểm tra streak và cảnh báo - chạy mỗi giờ
    this.scheduleStreakWarnings();

    // Job 3: Gửi báo cáo tuần - chạy vào Chủ nhật 9:00 sáng
    this.scheduleWeeklyReports();

    // Job 4: Dọn dẹp tokens không hợp lệ - chạy mỗi ngày lúc 3:00 sáng
    this.scheduleTokenCleanup();

    console.log('✅ Notification scheduler started');
  }

  // Dừng tất cả jobs
  stop() {
    this.jobs.forEach((job, name) => {
      job.stop();
      console.log(`⏹️ Stopped job: ${name}`);
    });
    this.jobs.clear();
  }

  // ==================== NHẮC NHỞ HỌC TẬP ====================
  scheduleStudyReminders() {
    // Chạy mỗi phút để kiểm tra xem có ai cần nhắc nhở không
    const job = cron.schedule('* * * * *', async () => {
      try {
        const now = new Date();
        const currentHour = now.getHours();
        const currentMinute = now.getMinutes();
        const currentTime = `${currentHour.toString().padStart(2, '0')}:${currentMinute.toString().padStart(2, '0')}`;
        const currentDay = now.getDay(); // 0-6

        // Tìm users có lịch nhắc nhở vào thời điểm này
        const users = await User.find({
          'notificationSettings.studyReminder.enabled': true,
          'notificationSettings.studyReminder.time': currentTime,
          'notificationSettings.studyReminder.days': currentDay
        });

        for (const user of users) {
          // Kiểm tra xem user đã học hôm nay chưa
          const program = user.programs.find(p => p.programId === 'chemistry');
          if (program) {
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            
            const lastStudy = program.studyStreak?.lastStudyDate 
              ? new Date(program.studyStreak.lastStudyDate)
              : null;
            
            if (lastStudy) {
              lastStudy.setHours(0, 0, 0, 0);
            }

            // Chỉ gửi nhắc nhở nếu chưa học hôm nay
            if (!lastStudy || lastStudy.getTime() < today.getTime()) {
              await notificationService.sendNotification(user, 'study_reminder', {
                currentStreak: program.studyStreak?.currentStreak || 0,
                level: user.level,
                actionUrl: '/chemistry'
              });
              console.log(`📚 Sent study reminder to: ${user.username}`);
            }
          }
        }
      } catch (error) {
        console.error('❌ Study reminder job error:', error);
      }
    });

    this.jobs.set('studyReminders', job);
  }

  // ==================== CẢNH BÁO STREAK ====================
  scheduleStreakWarnings() {
    // Chạy mỗi giờ vào phút 30
    const job = cron.schedule('30 * * * *', async () => {
      try {
        const now = new Date();
        const currentHour = now.getHours();

        // Chỉ gửi cảnh báo từ 18:00-22:00
        if (currentHour < 18 || currentHour > 22) return;

        // Tìm users có streak > 0 và chưa học hôm nay
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const users = await User.find({
          'notificationSettings.streakReminder.enabled': true,
          'programs.studyStreak.currentStreak': { $gt: 0 }
        });

        for (const user of users) {
          const program = user.programs.find(p => p.programId === 'chemistry');
          if (program && program.studyStreak?.currentStreak > 0) {
            const lastStudy = program.studyStreak.lastStudyDate 
              ? new Date(program.studyStreak.lastStudyDate)
              : null;
            
            if (lastStudy) {
              lastStudy.setHours(0, 0, 0, 0);
              
              // Nếu chưa học hôm nay, gửi cảnh báo
              if (lastStudy.getTime() < today.getTime()) {
                await notificationService.sendNotification(user, 'streak_warning', {
                  currentStreak: program.studyStreak.currentStreak,
                  actionUrl: '/chemistry'
                });
                console.log(`⚠️ Sent streak warning to: ${user.username} (${program.studyStreak.currentStreak} days)`);
              }
            }
          }
        }
      } catch (error) {
        console.error('❌ Streak warning job error:', error);
      }
    });

    this.jobs.set('streakWarnings', job);
  }

  // ==================== BÁO CÁO TUẦN ====================
  scheduleWeeklyReports() {
    // Chạy vào 9:00 sáng Chủ nhật
    const job = cron.schedule('0 9 * * 0', async () => {
      try {
        console.log('📊 Starting weekly reports...');

        const users = await User.find({
          'notificationSettings.weeklyReport.enabled': true
        });

        for (const user of users) {
          const program = user.programs.find(p => p.programId === 'chemistry');
          if (program) {
            // Tính toán thống kê tuần
            const weekAgo = new Date();
            weekAgo.setDate(weekAgo.getDate() - 7);

            const weeklyStats = {
              lessonsCompleted: 0, // TODO: tính từ history
              challengesCompleted: 0,
              xpEarned: 0,
              studyTime: 0
            };

            // Tính từ streak history
            if (program.studyStreak?.streakHistory) {
              const weekHistory = program.studyStreak.streakHistory.filter(h => {
                const date = new Date(h.date);
                return date >= weekAgo;
              });
              weeklyStats.studyTime = weekHistory.reduce((sum, h) => sum + (h.duration || 0), 0);
            }

            await notificationService.sendNotification(user, 'weekly_report', {
              ...weeklyStats,
              username: user.displayName || user.username,
              actionUrl: '/profile'
            });
          }
        }

        console.log(`✅ Sent weekly reports to ${users.length} users`);
      } catch (error) {
        console.error('❌ Weekly report job error:', error);
      }
    });

    this.jobs.set('weeklyReports', job);
  }

  // ==================== DỌN DẸP TOKENS ====================
  scheduleTokenCleanup() {
    // Chạy lúc 3:00 sáng mỗi ngày
    const job = cron.schedule('0 3 * * *', async () => {
      try {
        const thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

        // Xóa tokens không sử dụng trong 30 ngày
        const result = await User.updateMany(
          {},
          {
            $pull: {
              fcmTokens: { lastUsed: { $lt: thirtyDaysAgo } }
            }
          }
        );

        console.log(`🧹 Token cleanup: ${result.modifiedCount} users updated`);
      } catch (error) {
        console.error('❌ Token cleanup job error:', error);
      }
    });

    this.jobs.set('tokenCleanup', job);
  }

  // ==================== MANUAL TRIGGERS ====================
  // Gửi thông báo khi user lên level
  async notifyLevelUp(userId, newLevel, totalXP) {
    try {
      const user = await User.findById(userId);
      if (user && user.notificationSettings?.achievementNotification?.enabled) {
        await notificationService.sendNotification(user, 'level_up', {
          newLevel,
          totalXP,
          actionUrl: '/profile'
        });
      }
    } catch (error) {
      console.error('❌ Level up notification error:', error);
    }
  }

  // Gửi thông báo khi đạt thành tựu
  async notifyAchievement(userId, achievement) {
    try {
      const user = await User.findById(userId);
      if (user && user.notificationSettings?.achievementNotification?.enabled) {
        await notificationService.sendNotification(user, 'achievement', {
          achievementName: achievement.name,
          achievementIcon: achievement.icon,
          achievementDescription: achievement.description,
          xpReward: achievement.xpReward,
          actionUrl: '/profile'
        });
      }
    } catch (error) {
      console.error('❌ Achievement notification error:', error);
    }
  }

  // Gửi thông báo khi mở khóa challenge
  async notifyChallengeUnlock(userId, challenge) {
    try {
      const user = await User.findById(userId);
      if (user && user.notificationSettings?.newContentNotification?.enabled) {
        await notificationService.sendNotification(user, 'challenge_unlock', {
          challengeName: challenge.name,
          challengeId: challenge._id,
          actionUrl: `/chemistry/challenges/${challenge._id}`
        });
      }
    } catch (error) {
      console.error('❌ Challenge unlock notification error:', error);
    }
  }

  // Gửi thông báo khi mất streak
  async notifyStreakLost(userId, lostStreak, longestStreak) {
    try {
      const user = await User.findById(userId);
      if (user) {
        await notificationService.sendNotification(user, 'streak_lost', {
          lostStreak,
          longestStreak,
          actionUrl: '/chemistry'
        });
      }
    } catch (error) {
      console.error('❌ Streak lost notification error:', error);
    }
  }
}

module.exports = new NotificationScheduler();
