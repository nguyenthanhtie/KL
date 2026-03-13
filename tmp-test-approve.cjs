require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/User.cjs');
const ClassRoom = require('./models/ClassRoom.cjs');

async function testApproval() {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/chemistry_learning', {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('Connected to MongoDB');

    // 1. Get teacher 1
    const teacher = await User.findOne({ email: 'teacher1@test.com' });
    if (!teacher) {
      console.log('Teacher not found');
      return;
    }

    // 2. Get students
    const student1 = await User.findOne({ email: 'student1@test.com' });
    const student2 = await User.findOne({ email: 'student2@test.com' });

    // 3. Get or Create Class
    let classRoom = await ClassRoom.findOne({ teacher: teacher._id });
    if (!classRoom) {
      const code = await ClassRoom.generateClassCode();
      classRoom = new ClassRoom({
        name: 'Lớp Hóa Học Nâng Cao',
        code,
        grade: 12,
        teacher: teacher._id,
        settings: { requireApproval: true, maxStudents: 50 }
      });
      await classRoom.save();
      console.log('Created new class:', classRoom.name, classRoom.code);
    }

    console.log('Using class:', classRoom.name, 'Code:', classRoom.code);

    // 4. Clear class students for clean test
    classRoom.students = [];
    await classRoom.save();

    console.log('\n--- Step 1: Add student 1 as Pending ---');
    classRoom.students.push({
      student: student1._id,
      enrolledAt: new Date(),
      status: 'pending'
    });
    await classRoom.save();
    console.log('Added student1 as pending');

    // MOCK TEACHER APPROVAL
    console.log('\n--- Step 2: Testing Approve Logic ---');
    const studentIdStr = student1._id.toString();
    const studentEntry = classRoom.students.find(s => s.student.toString() === studentIdStr);
    
    if (studentEntry && studentEntry.status === 'pending') {
      studentEntry.status = 'active';
      studentEntry.enrolledAt = new Date();
      await classRoom.save();

      // Ensure enrolledClasses is correct
      if (!student1.enrolledClasses) student1.enrolledClasses = [];
      const hasEnrollment = student1.enrolledClasses.some(e => e.classId.toString() === classRoom._id.toString());
      if (!hasEnrollment) {
        student1.enrolledClasses.push({ classId: classRoom._id, enrolledAt: new Date() });
      }
      student1.assignedTeacher = teacher._id;
      await student1.save();
      
      // Ensure teacher has student in list
      await User.findByIdAndUpdate(teacher._id, { $addToSet: { students: student1._id } });
      
      console.log('✓ Approval logic executed successfully');
    }

    // Verify
    const updatedClass = await ClassRoom.findById(classRoom._id);
    const updatedStudent1 = await User.findById(student1._id);
    console.log('Class student status:', updatedClass.students[0].status);
    console.log('Student enrolled classes count:', updatedStudent1.enrolledClasses.length);
    console.log('Student assigned teacher:', updatedStudent1.assignedTeacher);
    
    // MOCK TEACHER REJECT
    console.log('\n--- Step 3: Add student 2 as Pending ---');
    updatedClass.students.push({
      student: student2._id,
      enrolledAt: new Date(),
      status: 'pending'
    });
    await updatedClass.save();
    
    console.log('\n--- Step 4: Testing Reject Logic ---');
    const student2IdStr = student2._id.toString();
    const st2Index = updatedClass.students.findIndex(s => s.student.toString() === student2IdStr);
    if(st2Index !== -1 && updatedClass.students[st2Index].status === 'pending') {
        updatedClass.students.splice(st2Index, 1);
        await updatedClass.save();
        await User.findByIdAndUpdate(student2._id, {
            $pull: { enrolledClasses: { classId: updatedClass._id } }
        });
        console.log('✓ Reject logic executed successfully');
    }

    const finalClass = await ClassRoom.findById(classRoom._id);
    console.log('Final class student count:', finalClass.students.length);
    
  } catch (err) {
    console.error(err);
  } finally {
    mongoose.disconnect();
    console.log('\nDone.');
  }
}

testApproval();
