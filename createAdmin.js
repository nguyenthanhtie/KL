require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/User.cjs');
const bcrypt = require('bcryptjs');

const createAdmin = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB');

    const adminEmail = 'admin@klt.com';
    const adminUsername = 'admin_klt';
    const adminPassword = 'AdminPassword123!';

    // Check if admin already exists
    const existingAdmin = await User.findOne({ $or: [{ email: adminEmail }, { username: adminUsername }] });
    
    if (existingAdmin) {
      console.log('Admin account already exists.');
      console.log('User:', existingAdmin.username, 'Email:', existingAdmin.email, 'Role:', existingAdmin.role);
      
      // Update role to admin if it's not already
      if (existingAdmin.role !== 'admin') {
        const hashedPassword = await bcrypt.hash(adminPassword, 10);
        await User.updateOne(
          { _id: existingAdmin._id }, 
          { 
            role: 'admin',
            password: hashedPassword,
            adminInfo: {
              permissions: ['all'],
              assignedAt: new Date()
            }
          }
        );
        console.log('Updated existing user to admin role.');
      }
    } else {
      // Create new admin
      const hashedPassword = await bcrypt.hash(adminPassword, 10);
      const newAdmin = new User({
        username: adminUsername,
        email: adminEmail,
        password: hashedPassword,
        displayName: 'System Admin',
        role: 'admin',
        adminInfo: {
          permissions: ['all'],
          assignedAt: new Date()
        }
      });

      await newAdmin.save();
      console.log('Successfully created new admin account!');
    }

    console.log('\n--- ADMIN CREDENTIALS ---');
    console.log(`Username: ${adminUsername}`);
    console.log(`Email: ${adminEmail}`);
    console.log(`Password: ${adminPassword}`);
    console.log('-------------------------\n');

  } catch (error) {
    console.error('Error creating admin account:', error);
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
    process.exit(0);
  }
};

createAdmin();
