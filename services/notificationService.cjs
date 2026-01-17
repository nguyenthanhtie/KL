// ==================== NOTIFICATION SERVICE ====================
// Service để gửi thông báo qua nhiều kênh: Push, Email, In-App

const nodemailer = require('nodemailer');

// ==================== EMAIL CONFIGURATION ====================
// Cấu hình Nodemailer - sử dụng SMTP
const createEmailTransporter = () => {
  // Sử dụng Gmail SMTP (cần bật 2FA và tạo App Password)
  // Hoặc có thể dùng các service khác như SendGrid, Mailgun, etc.
  return nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER || 'your-email@gmail.com',
      pass: process.env.EMAIL_PASSWORD || 'your-app-password'
    }
  });
};

// ==================== EMAIL TEMPLATES ====================
const emailTemplates = {
  // Template nhắc nhở học tập
  study_reminder: (data) => ({
    subject: '📚 Đến giờ học rồi! - ChemLearn',
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
          body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f5f5f5; margin: 0; padding: 20px; }
          .container { max-width: 600px; margin: 0 auto; background: white; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.1); }
          .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; text-align: center; }
          .header h1 { color: white; margin: 0; font-size: 24px; }
          .header .emoji { font-size: 48px; margin-bottom: 10px; display: block; }
          .content { padding: 30px; }
          .content p { color: #333; line-height: 1.6; font-size: 16px; }
          .stats { background: #f8f9fa; border-radius: 12px; padding: 20px; margin: 20px 0; }
          .stats-item { display: flex; justify-content: space-between; margin: 10px 0; }
          .stats-label { color: #666; }
          .stats-value { font-weight: bold; color: #667eea; }
          .button { display: inline-block; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 15px 40px; text-decoration: none; border-radius: 30px; font-weight: bold; margin: 20px 0; }
          .footer { background: #f8f9fa; padding: 20px; text-align: center; color: #666; font-size: 12px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <span class="emoji">📚</span>
            <h1>Đến giờ học rồi!</h1>
          </div>
          <div class="content">
            <p>Xin chào <strong>${data.username || 'bạn'}</strong>! 👋</p>
            <p>Đã đến giờ học Hóa học theo lịch của bạn. Hãy dành vài phút mỗi ngày để củng cố kiến thức nhé!</p>
            
            ${data.currentStreak > 0 ? `
            <div class="stats">
              <div class="stats-item">
                <span class="stats-label">🔥 Chuỗi học hiện tại</span>
                <span class="stats-value">${data.currentStreak} ngày</span>
              </div>
              <div class="stats-item">
                <span class="stats-label">📊 Level</span>
                <span class="stats-value">${data.level || 1}</span>
              </div>
            </div>
            ` : ''}
            
            <center>
              <a href="${process.env.FRONTEND_URL || 'http://localhost:5173'}/chemistry" class="button">
                Bắt đầu học ngay 🚀
              </a>
            </center>
            
            <p style="color: #888; font-size: 14px; margin-top: 20px;">
              💡 Mẹo: Học đều đặn 15-20 phút mỗi ngày hiệu quả hơn học dồn một lần!
            </p>
          </div>
          <div class="footer">
            <p>ChemLearn - Học Hóa học thú vị hơn</p>
            <p><a href="${process.env.FRONTEND_URL || 'http://localhost:5173'}/profile">Quản lý thông báo</a></p>
          </div>
        </div>
      </body>
      </html>
    `
  }),

  // Template cảnh báo streak
  streak_warning: (data) => ({
    subject: '⚠️ Chuỗi học ${data.currentStreak} ngày sắp bị mất! - ChemLearn',
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f5f5f5; margin: 0; padding: 20px; }
          .container { max-width: 600px; margin: 0 auto; background: white; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.1); }
          .header { background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%); padding: 30px; text-align: center; }
          .header h1 { color: white; margin: 0; font-size: 24px; }
          .header .emoji { font-size: 64px; margin-bottom: 10px; display: block; }
          .content { padding: 30px; text-align: center; }
          .streak-number { font-size: 72px; font-weight: bold; color: #f5576c; }
          .streak-label { color: #666; font-size: 18px; }
          .button { display: inline-block; background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%); color: white; padding: 15px 40px; text-decoration: none; border-radius: 30px; font-weight: bold; margin: 20px 0; }
          .footer { background: #f8f9fa; padding: 20px; text-align: center; color: #666; font-size: 12px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <span class="emoji">🔥</span>
            <h1>Đừng để mất chuỗi học!</h1>
          </div>
          <div class="content">
            <div class="streak-number">${data.currentStreak}</div>
            <div class="streak-label">ngày học liên tiếp sắp bị mất!</div>
            <p style="color: #666; margin: 20px 0;">
              Bạn chưa học hôm nay! Hãy hoàn thành ít nhất 1 bài học để giữ chuỗi nhé.
            </p>
            <a href="${process.env.FRONTEND_URL || 'http://localhost:5173'}/chemistry" class="button">
              Bảo vệ chuỗi ngay! 🛡️
            </a>
          </div>
          <div class="footer">
            <p>ChemLearn - Học Hóa học thú vị hơn</p>
          </div>
        </div>
      </body>
      </html>
    `
  }),

  // Template mất streak
  streak_lost: (data) => ({
    subject: '😢 Chuỗi học đã bị reset - ChemLearn',
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f5f5f5; margin: 0; padding: 20px; }
          .container { max-width: 600px; margin: 0 auto; background: white; border-radius: 16px; overflow: hidden; }
          .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; text-align: center; }
          .header h1 { color: white; margin: 0; }
          .content { padding: 30px; text-align: center; }
          .button { display: inline-block; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 15px 40px; text-decoration: none; border-radius: 30px; font-weight: bold; margin: 20px 0; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Chuỗi học đã reset 😢</h1>
          </div>
          <div class="content">
            <p>Đừng nản chí! Chuỗi ${data.lostStreak || 0} ngày của bạn đã reset, nhưng đây là cơ hội để bắt đầu lại mạnh mẽ hơn!</p>
            <p><strong>Kỷ lục của bạn:</strong> ${data.longestStreak || 0} ngày</p>
            <a href="${process.env.FRONTEND_URL || 'http://localhost:5173'}/chemistry" class="button">
              Bắt đầu chuỗi mới! 💪
            </a>
          </div>
        </div>
      </body>
      </html>
    `
  }),

  // Template đạt thành tựu
  achievement: (data) => ({
    subject: `🏆 Bạn đã đạt thành tựu: ${data.achievementName}! - ChemLearn`,
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f5f5f5; margin: 0; padding: 20px; }
          .container { max-width: 600px; margin: 0 auto; background: white; border-radius: 16px; overflow: hidden; }
          .header { background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%); padding: 30px; text-align: center; }
          .header h1 { color: white; margin: 0; }
          .content { padding: 30px; text-align: center; }
          .achievement-icon { font-size: 80px; margin: 20px 0; }
          .achievement-name { font-size: 24px; font-weight: bold; color: #333; }
          .button { display: inline-block; background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%); color: white; padding: 15px 40px; text-decoration: none; border-radius: 30px; font-weight: bold; margin: 20px 0; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>🎉 Chúc mừng!</h1>
          </div>
          <div class="content">
            <div class="achievement-icon">${data.achievementIcon || '🏆'}</div>
            <div class="achievement-name">${data.achievementName}</div>
            <p style="color: #666;">${data.achievementDescription || 'Bạn đã đạt được một thành tựu mới!'}</p>
            ${data.xpReward ? `<p><strong>+${data.xpReward} XP</strong></p>` : ''}
            <a href="${process.env.FRONTEND_URL || 'http://localhost:5173'}/profile" class="button">
              Xem thành tựu
            </a>
          </div>
        </div>
      </body>
      </html>
    `
  }),

  // Template lên level
  level_up: (data) => ({
    subject: `🎊 Bạn đã lên Level ${data.newLevel}! - ChemLearn`,
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f5f5f5; margin: 0; padding: 20px; }
          .container { max-width: 600px; margin: 0 auto; background: white; border-radius: 16px; overflow: hidden; }
          .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; text-align: center; }
          .header h1 { color: white; margin: 0; }
          .content { padding: 30px; text-align: center; }
          .level-badge { font-size: 80px; margin: 20px 0; }
          .level-number { font-size: 48px; font-weight: bold; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
          .button { display: inline-block; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 15px 40px; text-decoration: none; border-radius: 30px; font-weight: bold; margin: 20px 0; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>🎊 Level Up!</h1>
          </div>
          <div class="content">
            <div class="level-badge">⬆️</div>
            <div class="level-number">Level ${data.newLevel}</div>
            <p style="color: #666;">Tuyệt vời! Bạn đã tiến bộ rất nhiều!</p>
            <p><strong>Tổng XP:</strong> ${data.totalXP || 0}</p>
            <a href="${process.env.FRONTEND_URL || 'http://localhost:5173'}/chemistry" class="button">
              Tiếp tục học
            </a>
          </div>
        </div>
      </body>
      </html>
    `
  }),

  // Template báo cáo tuần
  weekly_report: (data) => ({
    subject: '📊 Báo cáo học tập tuần này - ChemLearn',
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f5f5f5; margin: 0; padding: 20px; }
          .container { max-width: 600px; margin: 0 auto; background: white; border-radius: 16px; overflow: hidden; }
          .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; text-align: center; }
          .header h1 { color: white; margin: 0; }
          .content { padding: 30px; }
          .stats-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 15px; margin: 20px 0; }
          .stat-card { background: #f8f9fa; padding: 20px; border-radius: 12px; text-align: center; }
          .stat-value { font-size: 32px; font-weight: bold; color: #667eea; }
          .stat-label { color: #666; font-size: 14px; }
          .button { display: inline-block; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 15px 40px; text-decoration: none; border-radius: 30px; font-weight: bold; margin: 20px 0; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>📊 Báo cáo tuần</h1>
          </div>
          <div class="content">
            <p>Xin chào <strong>${data.username}</strong>! Đây là tổng kết học tập của bạn trong tuần qua:</p>
            
            <div class="stats-grid">
              <div class="stat-card">
                <div class="stat-value">${data.lessonsCompleted || 0}</div>
                <div class="stat-label">Bài học hoàn thành</div>
              </div>
              <div class="stat-card">
                <div class="stat-value">${data.challengesCompleted || 0}</div>
                <div class="stat-label">Thử thách</div>
              </div>
              <div class="stat-card">
                <div class="stat-value">${data.xpEarned || 0}</div>
                <div class="stat-label">XP kiếm được</div>
              </div>
              <div class="stat-card">
                <div class="stat-value">${data.studyTime || 0}p</div>
                <div class="stat-label">Thời gian học</div>
              </div>
            </div>
            
            <center>
              <a href="${process.env.FRONTEND_URL || 'http://localhost:5173'}/profile" class="button">
                Xem chi tiết
              </a>
            </center>
          </div>
        </div>
      </body>
      </html>
    `
  }),

  // Template thông báo hệ thống
  system: (data) => ({
    subject: `📢 ${data.title || 'Thông báo từ ChemLearn'}`,
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f5f5f5; margin: 0; padding: 20px; }
          .container { max-width: 600px; margin: 0 auto; background: white; border-radius: 16px; overflow: hidden; }
          .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; text-align: center; }
          .header h1 { color: white; margin: 0; font-size: 24px; }
          .content { padding: 30px; }
          .content p { color: #333; line-height: 1.6; }
          .button { display: inline-block; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 15px 40px; text-decoration: none; border-radius: 30px; font-weight: bold; margin: 20px 0; }
          .footer { background: #f8f9fa; padding: 20px; text-align: center; color: #666; font-size: 12px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>📢 ${data.title || 'Thông báo'}</h1>
          </div>
          <div class="content">
            <p>Xin chào <strong>${data.username || 'bạn'}</strong>!</p>
            <p>${data.body || data.message || 'Bạn có thông báo mới từ ChemLearn.'}</p>
            <center>
              <a href="${process.env.FRONTEND_URL || 'http://localhost:5173'}" class="button">
                Truy cập ChemLearn
              </a>
            </center>
          </div>
          <div class="footer">
            <p>ChemLearn - Học Hóa học thú vị hơn</p>
          </div>
        </div>
      </body>
      </html>
    `
  }),

  // Template nội dung mới
  new_content: (data) => ({
    subject: `✨ Nội dung mới: ${data.title || 'Bài học mới'} - ChemLearn`,
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f5f5f5; margin: 0; padding: 20px; }
          .container { max-width: 600px; margin: 0 auto; background: white; border-radius: 16px; overflow: hidden; }
          .header { background: linear-gradient(135deg, #11998e 0%, #38ef7d 100%); padding: 30px; text-align: center; }
          .header h1 { color: white; margin: 0; }
          .content { padding: 30px; text-align: center; }
          .button { display: inline-block; background: linear-gradient(135deg, #11998e 0%, #38ef7d 100%); color: white; padding: 15px 40px; text-decoration: none; border-radius: 30px; font-weight: bold; margin: 20px 0; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>✨ Nội dung mới!</h1>
          </div>
          <div class="content">
            <p style="font-size: 18px; color: #333;"><strong>${data.title || 'Bài học mới'}</strong></p>
            <p style="color: #666;">${data.body || 'Có nội dung mới đang chờ bạn khám phá!'}</p>
            <a href="${data.actionUrl || process.env.FRONTEND_URL || 'http://localhost:5173'}/chemistry" class="button">
              Khám phá ngay
            </a>
          </div>
        </div>
      </body>
      </html>
    `
  }),

  // Template test notification
  test: (data) => ({
    subject: '🧪 Test Notification - ChemLearn',
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f5f5f5; margin: 0; padding: 20px; }
          .container { max-width: 600px; margin: 0 auto; background: white; border-radius: 16px; overflow: hidden; }
          .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; text-align: center; }
          .header h1 { color: white; margin: 0; }
          .content { padding: 30px; text-align: center; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>🧪 Test Notification</h1>
          </div>
          <div class="content">
            <p>Xin chào <strong>${data.username || 'bạn'}</strong>!</p>
            <p>Đây là email thông báo test từ ChemLearn.</p>
            <p style="color: #888;">Nếu bạn nhận được email này, hệ thống thông báo đang hoạt động tốt! ✅</p>
          </div>
        </div>
      </body>
      </html>
    `
  }),

  // Template mở khóa challenge
  challenge_unlock: (data) => ({
    subject: `🔓 Mở khóa thử thách mới! - ChemLearn`,
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f5f5f5; margin: 0; padding: 20px; }
          .container { max-width: 600px; margin: 0 auto; background: white; border-radius: 16px; overflow: hidden; }
          .header { background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%); padding: 30px; text-align: center; }
          .header h1 { color: white; margin: 0; }
          .content { padding: 30px; text-align: center; }
          .button { display: inline-block; background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%); color: white; padding: 15px 40px; text-decoration: none; border-radius: 30px; font-weight: bold; margin: 20px 0; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>🔓 Thử thách mới!</h1>
          </div>
          <div class="content">
            <p style="font-size: 48px;">🎮</p>
            <p style="font-size: 18px; color: #333;"><strong>${data.challengeName || 'Thử thách mới'}</strong></p>
            <p style="color: #666;">Bạn đã mở khóa một thử thách mới! Hãy chinh phục nó ngay!</p>
            <a href="${process.env.FRONTEND_URL || 'http://localhost:5173'}/challenges" class="button">
              Chinh phục ngay
            </a>
          </div>
        </div>
      </body>
      </html>
    `
  }),

  // Template mất streak
  streak_lost: (data) => ({
    subject: '😢 Chuỗi học đã bị mất - ChemLearn',
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f5f5f5; margin: 0; padding: 20px; }
          .container { max-width: 600px; margin: 0 auto; background: white; border-radius: 16px; overflow: hidden; }
          .header { background: linear-gradient(135deg, #636363 0%, #a2ab58 100%); padding: 30px; text-align: center; }
          .header h1 { color: white; margin: 0; }
          .content { padding: 30px; text-align: center; }
          .button { display: inline-block; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 15px 40px; text-decoration: none; border-radius: 30px; font-weight: bold; margin: 20px 0; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>😢 Đừng bỏ cuộc!</h1>
          </div>
          <div class="content">
            <p>Chuỗi học <strong>${data.lostStreak || 0} ngày</strong> của bạn đã bị mất.</p>
            <p style="color: #666;">Đừng lo, hãy bắt đầu lại ngay hôm nay!</p>
            <a href="${process.env.FRONTEND_URL || 'http://localhost:5173'}/chemistry" class="button">
              Bắt đầu lại 💪
            </a>
          </div>
        </div>
      </body>
      </html>
    `
  }),

  // Template promotion/khuyến mãi
  promotion: (data) => ({
    subject: `🎁 ${data.title || 'Ưu đãi đặc biệt'} - ChemLearn`,
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f5f5f5; margin: 0; padding: 20px; }
          .container { max-width: 600px; margin: 0 auto; background: white; border-radius: 16px; overflow: hidden; }
          .header { background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%); padding: 30px; text-align: center; }
          .header h1 { color: white; margin: 0; }
          .content { padding: 30px; text-align: center; }
          .button { display: inline-block; background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%); color: white; padding: 15px 40px; text-decoration: none; border-radius: 30px; font-weight: bold; margin: 20px 0; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>🎁 ${data.title || 'Ưu đãi đặc biệt'}</h1>
          </div>
          <div class="content">
            <p style="font-size: 48px;">🎉</p>
            <p style="color: #333;">${data.body || data.message || 'Bạn có ưu đãi đặc biệt!'}</p>
            <a href="${data.actionUrl || process.env.FRONTEND_URL || 'http://localhost:5173'}" class="button">
              Xem ngay
            </a>
          </div>
        </div>
      </body>
      </html>
    `
  })
};

// ==================== NOTIFICATION SERVICE CLASS ====================
class NotificationService {
  constructor() {
    this.emailTransporter = null;
    this.firebaseAdmin = null;
  }

  // Khởi tạo email transporter
  initEmail() {
    if (!this.emailTransporter) {
      this.emailTransporter = createEmailTransporter();
    }
    return this.emailTransporter;
  }

  // Khởi tạo Firebase Admin (cho push notifications)
  async initFirebaseAdmin() {
    if (!this.firebaseAdmin) {
      try {
        const admin = require('firebase-admin');
        
        // Kiểm tra xem đã khởi tạo chưa
        if (admin.apps.length === 0) {
          // Sử dụng service account từ environment variable hoặc file
          const serviceAccount = process.env.FIREBASE_SERVICE_ACCOUNT 
            ? JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT)
            : require('../config/firebase-service-account.json');
          
          admin.initializeApp({
            credential: admin.credential.cert(serviceAccount)
          });
        }
        
        this.firebaseAdmin = admin;
      } catch (error) {
        console.error('❌ Firebase Admin init error:', error.message);
        // Không throw error, cho phép app chạy mà không có push notifications
      }
    }
    return this.firebaseAdmin;
  }

  // ==================== GỬI EMAIL ====================
  async sendEmail(to, type, data) {
    try {
      const transporter = this.initEmail();
      const template = emailTemplates[type];
      
      if (!template) {
        console.error(`❌ Email template not found: ${type}`);
        return { success: false, error: 'Template not found' };
      }

      const { subject, html } = template(data);

      const mailOptions = {
        from: `"ChemLearn" <${process.env.EMAIL_USER || 'noreply@chemlearn.com'}>`,
        to,
        subject,
        html
      };

      const result = await transporter.sendMail(mailOptions);
      console.log(`✅ Email sent to ${to}: ${type}`);
      return { success: true, messageId: result.messageId };
    } catch (error) {
      console.error(`❌ Email send error:`, error);
      return { success: false, error: error.message };
    }
  }

  // ==================== GỬI PUSH NOTIFICATION ====================
  async sendPushNotification(tokens, notification, data = {}) {
    try {
      const admin = await this.initFirebaseAdmin();
      if (!admin) {
        return { success: false, error: 'Firebase Admin not initialized' };
      }

      // Lọc tokens hợp lệ
      const validTokens = tokens.filter(t => t && typeof t === 'string' && t.length > 0);
      if (validTokens.length === 0) {
        return { success: false, error: 'No valid tokens' };
      }

      const message = {
        notification: {
          title: notification.title,
          body: notification.body,
          ...(notification.icon && { imageUrl: notification.icon })
        },
        data: {
          ...data,
          click_action: data.actionUrl || '/'
        },
        webpush: {
          notification: {
            icon: notification.icon || '/images/notification-icon.png',
            badge: '/images/badge-icon.png',
            vibrate: [100, 50, 100],
            actions: [
              { action: 'open', title: 'Mở ứng dụng' }
            ]
          },
          fcmOptions: {
            link: data.actionUrl || '/'
          }
        }
      };

      // Gửi đến nhiều tokens
      const results = await Promise.all(
        validTokens.map(async (token) => {
          try {
            await admin.messaging().send({ ...message, token });
            return { token, success: true };
          } catch (error) {
            return { token, success: false, error: error.message };
          }
        })
      );

      const successful = results.filter(r => r.success).length;
      const failed = results.filter(r => !r.success);

      console.log(`✅ Push sent: ${successful}/${validTokens.length} successful`);
      
      return { 
        success: successful > 0, 
        sent: successful, 
        failed: failed.length,
        failedTokens: failed.map(f => f.token)
      };
    } catch (error) {
      console.error(`❌ Push notification error:`, error);
      return { success: false, error: error.message };
    }
  }

  // ==================== GỬI THÔNG BÁO TOÀN DIỆN ====================
  async sendNotification(user, type, data, options = {}) {
    const Notification = require('../models/Notification.cjs');
    const results = {
      inApp: false,
      push: false,
      email: false
    };

    const notificationData = {
      title: data.title || this.getDefaultTitle(type),
      body: data.body || this.getDefaultBody(type, data),
      icon: data.icon || this.getDefaultIcon(type),
      actionUrl: data.actionUrl || '/'
    };

    // 1. Tạo in-app notification
    try {
      await Notification.createNotification({
        userId: user._id,
        type,
        title: notificationData.title,
        body: notificationData.body,
        icon: notificationData.icon,
        actionUrl: notificationData.actionUrl,
        data,
        sentVia: { inApp: true, push: false, email: false }
      });
      results.inApp = true;

      // Cập nhật unread count
      const User = require('../models/User.cjs');
      await User.findByIdAndUpdate(user._id, { $inc: { unreadNotifications: 1 } });
    } catch (error) {
      console.error('❌ In-app notification error:', error);
    }

    // 2. Gửi push notification nếu được bật
    if (user.notificationSettings?.pushEnabled && user.fcmTokens?.length > 0) {
      const tokens = user.fcmTokens.map(t => t.token);
      const pushResult = await this.sendPushNotification(tokens, notificationData, data);
      results.push = pushResult.success;

      // Xóa tokens không hợp lệ
      if (pushResult.failedTokens?.length > 0) {
        const User = require('../models/User.cjs');
        await User.findByIdAndUpdate(user._id, {
          $pull: { fcmTokens: { token: { $in: pushResult.failedTokens } } }
        });
      }
    }

    // 3. Gửi email nếu được bật
    if (user.notificationSettings?.emailEnabled && user.email && !options.skipEmail) {
      const emailResult = await this.sendEmail(user.email, type, {
        ...data,
        username: user.displayName || user.username
      });
      results.email = emailResult.success;
    }

    return results;
  }

  // ==================== HELPER METHODS ====================
  getDefaultTitle(type) {
    const titles = {
      study_reminder: '📚 Đến giờ học rồi!',
      streak_warning: '⚠️ Chuỗi học sắp bị mất!',
      streak_lost: '😢 Chuỗi học đã reset',
      achievement: '🏆 Thành tựu mới!',
      level_up: '🎊 Level Up!',
      new_content: '✨ Nội dung mới!',
      challenge_unlock: '🔓 Mở khóa thử thách mới!',
      weekly_report: '📊 Báo cáo tuần',
      system: '📢 Thông báo hệ thống',
      promotion: '🎁 Ưu đãi đặc biệt!'
    };
    return titles[type] || 'Thông báo';
  }

  getDefaultBody(type, data) {
    const bodies = {
      study_reminder: 'Hãy dành vài phút để học Hóa học nhé!',
      streak_warning: `Chuỗi ${data.currentStreak || 0} ngày sắp bị mất! Học ngay để giữ streak.`,
      streak_lost: 'Chuỗi học đã reset. Bắt đầu lại nào!',
      achievement: `Bạn đã đạt: ${data.achievementName || 'Thành tựu mới'}`,
      level_up: `Chúc mừng bạn lên Level ${data.newLevel || '?'}!`,
      new_content: 'Có bài học/thử thách mới dành cho bạn!',
      challenge_unlock: `Thử thách "${data.challengeName || 'mới'}" đã được mở khóa!`,
      weekly_report: 'Xem tổng kết học tập tuần qua của bạn.',
      system: data.message || 'Có thông báo mới từ hệ thống.',
      promotion: data.message || 'Bạn có ưu đãi đặc biệt!'
    };
    return bodies[type] || 'Bạn có thông báo mới';
  }

  getDefaultIcon(type) {
    const icons = {
      study_reminder: '📚',
      streak_warning: '🔥',
      streak_lost: '😢',
      achievement: '🏆',
      level_up: '⬆️',
      new_content: '✨',
      challenge_unlock: '🔓',
      weekly_report: '📊',
      system: '📢',
      promotion: '🎁'
    };
    return icons[type] || '🔔';
  }
}

// Export singleton instance
module.exports = new NotificationService();
