
const express = require('express');
const router = express.Router();
const Note = require('../models/Note');
const auth = require('../middleware/auth');

router.post('/', auth, async (req, res) => {
  const { title, content, category } = req.body;

  // Validate required fields
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
      userId: req.user.id,
    });
    const savedNote = await note.save();
    res.status(201).json(savedNote); // 201 for resource creation
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
    console.error('Error fetching notes:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

router.get('/search', auth, async (req, res) => {
  const { query } = req.query;
  if (!query || query.trim() === '') {
    return res.status(400).json({ message: 'Search query is required' });
  }

  try {
    const notes = await Note.find({
      userId: req.user.id,
      $or: [
        { title: { $regex: query.trim(), $options: 'i' } },
        { content: { $regex: query.trim(), $options: 'i' } },
        { category: { $regex: query.trim(), $options: 'i' } },
      ],
    });
    res.json(notes);
  } catch (error) {
    console.error('Error searching notes:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

router.put('/:id', auth, async (req, res) => {
  const { title, content, category } = req.body;

  try {
    const note = await Note.findOne({ _id: req.params.id, userId: req.user.id });
    if (!note) return res.status(404).json({ message: 'Note not found' });

    note.title = title?.trim() || note.title;
    note.content = content?.trim() || note.content;
    note.category = category?.trim() || note.category;
    const updatedNote = await note.save();

    res.json(updatedNote);
  } catch (error) {
    console.error('Error updating note:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

router.delete('/:id', auth, async (req, res) => {
  try {
    const note = await Note.findOneAndDelete({ _id: req.params.id, userId: req.user.id });
    if (!note) return res.status(404).json({ message: 'Note not found' });
    res.json({ message: 'Note deleted' });
  } catch (error) {
    console.error('Error deleting note:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

router.get('/liked', auth, async (req, res) => {
  try {
    const notes = await Note.find({ userId: req.user.id, isLiked: true });
    res.json(notes);
  } catch (error) {
    console.error('Error fetching liked notes:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

router.post('/:id/like', auth, async (req, res) => {
  try {
    const note = await Note.findOne({ _id: req.params.id, userId: req.user.id });
    if (!note) return res.status(404).json({ message: 'Note not found' });

    note.isLiked = !note.isLiked;
    const updatedNote = await note.save();
    res.json(updatedNote);
  } catch (error) {
    console.error('Error liking note:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
