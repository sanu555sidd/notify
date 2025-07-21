const express = require('express');
const axios = require('axios');
const auth = require('../middleware/auth');

const router = express.Router();

// Translate text endpoint
router.post('/', auth, async (req, res) => {
  try {
    const { text, targetLanguage } = req.body;

    if (!text || !targetLanguage) {
      return res.status(400).json({ message: 'Text and target language are required' });
    }

    // Make request to LibreTranslate API from server
    const response = await axios.post('https://libretranslate.de/translate', {
      q: text,
      source: 'auto',
      target: targetLanguage,
      format: 'text',
    }, {
      headers: {
        'Content-Type': 'application/json',
      }
    });

    res.json({ translatedText: response.data.translatedText });
  } catch (error) {
    console.error('Translation error:', error);
    res.status(500).json({ 
      message: 'Translation failed',
      error: error.response?.data?.error || 'Server error'
    });
  }
});

module.exports = router;
