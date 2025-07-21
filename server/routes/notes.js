const express = require('express');
const router = express.Router();
const Note = require('../models/Note');
const auth = require('../middleware/auth');

router.post('/', auth, async (req, res) => {
  const { title, content, category } = req.body;
  
  // Validate required fields - check for empty strings and undefined/null
  if (!title || title.trim() === '' || !content || content.trim() === '' || !category || category.trim() === '') {
    return res.status(400).json({ 
      message: 'All fields (title, content, category) are required and cannot be empty' 
    });
  }

  try {
    const note = new Note({ 
      title: title.trim(), 
      content: content.trim(), 
      category: category.trim(), 
      userId: req.user.id 
    });
    await note.save();
    res.json(note);
  } catch (error) {
    console.error('Note creation error:', error);
    res.status(500).json({ 
      message: 'Failed to create note',
      error: error.message 
    });
  }
});

router.get('/', auth, async (req, res) => {
  try {
    const notes = await Note.find({ userId: req.user.id });
    res.json(notes);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

router.get('/search', auth, async (req, res) => {
  const { query } = req.query;
  try {
    const notes = await Note.find({ 
      userId: req.user.id,
      $or: [
        { title: { $regex: query, $options: 'i' } },
        { content: { $regex: query, $options: 'i' } },
        { category: { $regex: query, $options: 'i' } }
      ]
    });
    res.json(notes);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

router.put('/:id', auth, async (req, res) => {
  const { title, content, category } = req.body;
  try {
    const note = await Note.findOne({ _id: req.params.id, userId: req.user.id });
    if (!note) return res.status(404).json({ message: 'Note not found' });

    note.title = title || note.title;
    note.content = content || note.content;
    note.category = category || note.category;
    await note.save();

    res.json(note);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

router.delete('/:id', auth, async (req, res) => {
  try {
    const note = await Note.findOneAndDelete({ _id: req.params.id, userId: req.user.id });
    if (!note) return res.status(404).json({ message: 'Note not found' });
    res.json({ message: 'Note deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;