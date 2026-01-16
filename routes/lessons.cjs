const express = require('express');
const Lesson = require('../models/Lesson.cjs');
const router = express.Router();

// Get all lessons
router.get('/', async (req, res) => {
  try {
    const lessons = await Lesson.find().sort({ pathId: 1, order: 1 }).lean();
    res.json(lessons);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get lessons grouped by classId -> chapterId -> lessons (with optional curriculum filter)
router.get('/grouped', async (req, res) => {
  try {
    const { curriculumType } = req.query;
    
    // Build query filter
    const filter = {};
    if (curriculumType) {
      filter.curriculumType = curriculumType;
    }
    
    const lessons = await Lesson.find(filter).sort({ classId: 1, chapterId: 1, lessonId: 1 }).lean();

    const grouped = {};
    lessons.forEach((l) => {
      const cId = l.classId || 0;
      const chId = l.chapterId || 0;
      if (!grouped[cId]) grouped[cId] = {};
      if (!grouped[cId][chId]) grouped[cId][chId] = { lessons: [], chapterName: l.chapterName };
      // Keep first non-empty chapterName encountered
      if (!grouped[cId][chId].chapterName && l.chapterName) {
        grouped[cId][chId].chapterName = l.chapterName;
      }
      grouped[cId][chId].lessons.push(l);
    });

    // convert to array structure
    const result = Object.keys(grouped).map((c) => ({
      classId: parseInt(c, 10),
      chapters: Object.keys(grouped[c]).map((ch) => ({
        chapterId: parseInt(ch, 10),
        chapterName: grouped[c][ch].chapterName,
        lessons: grouped[c][ch].lessons
      }))
    }));

    res.json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get class statistics summary
router.get('/statistics', async (req, res) => {
  try {
    const lessons = await Lesson.find().lean();
    
    // Group lessons by classId
    const classStats = {};
    
    lessons.forEach(lesson => {
      const classId = lesson.classId;
      if (!classStats[classId]) {
        classStats[classId] = {
          classId,
          chapters: new Set(),
          lessons: 0,
          topics: new Set()
        };
      }
      
      classStats[classId].lessons++;
      if (lesson.chapterId) {
        classStats[classId].chapters.add(lesson.chapterId);
      }
    });
    
    // Convert to array and format
    const result = Object.values(classStats).map(stat => ({
      grade: stat.classId,
      chapters: stat.chapters.size,
      lessons: stat.lessons,
      topics: [] // Topics will need to be defined separately or extracted from chapter names
    })).sort((a, b) => a.grade - b.grade);
    
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get lessons by path (with optional curriculum filter)
router.get('/class/:classId/chapter/:chapterId', async (req, res) => {
  try {
    const { curriculumType } = req.query;
    
    const filter = {
      classId: parseInt(req.params.classId),
      chapterId: parseInt(req.params.chapterId)
    };
    
    if (curriculumType) {
      filter.curriculumType = curriculumType;
    }
    
    const lessons = await Lesson.find(filter).sort({ order: 1 }).lean();

    res.json(lessons);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get specific lesson by classId, chapterId, lessonId (with optional curriculum filter)
router.get('/class/:classId/chapter/:chapterId/lesson/:lessonId', async (req, res) => {
  try {
    const { curriculumType } = req.query;
    
    const filter = {
      classId: parseInt(req.params.classId),
      chapterId: parseInt(req.params.chapterId),
      lessonId: parseInt(req.params.lessonId)
    };
    
    if (curriculumType) {
      filter.curriculumType = curriculumType;
    }
    
    const lesson = await Lesson.findOne(filter).lean();
    
    if (!lesson) {
      return res.status(404).json({ message: 'Lesson not found' });
    }
    
    res.json(lesson);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get specific lesson (legacy route - kept for backward compatibility)
router.get('/:pathId/:lessonId', async (req, res) => {
  try {
    const lesson = await Lesson.findOne({ 
      pathId: parseInt(req.params.pathId),
      lessonId: parseInt(req.params.lessonId)
    }).lean();
    
    if (!lesson) {
      return res.status(404).json({ message: 'Lesson not found' });
    }
    
    res.json(lesson);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create new lesson (admin only)
router.post('/', async (req, res) => {
  const lesson = new Lesson(req.body);
  
  try {
    const newLesson = await lesson.save();
    res.status(201).json(newLesson);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update lesson (admin only)
router.patch('/:id', async (req, res) => {
  try {
    const lesson = await Lesson.findById(req.params.id);
    if (!lesson) {
      return res.status(404).json({ message: 'Lesson not found' });
    }
    
    Object.assign(lesson, req.body);
    const updatedLesson = await lesson.save();
    res.json(updatedLesson);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete lesson (admin only)
router.delete('/:id', async (req, res) => {
  try {
    const lesson = await Lesson.findById(req.params.id);
    if (!lesson) {
      return res.status(404).json({ message: 'Lesson not found' });
    }
    
    await lesson.deleteOne();
    res.json({ message: 'Lesson deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
