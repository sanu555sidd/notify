
import { useState } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../config/api';

function NoteForm({ onNoteCreated }) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('');
  const [error, setError] = useState('');
  const [showLanguageDropdown, setShowLanguageDropdown] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('en'); // Default to English
  const [languages] = useState([
    { code: 'en', name: 'English' },
    { code: 'es', name: 'Spanish' },
    { code: 'fr', name: 'French' },
    { code: 'de', name: 'German' },
    { code: 'hi', name: 'Hindi' },
    { code: 'zh', name: 'Chinese' },
  ]);

  const translateText = async () => {
    if (!content) {
      setError('Please enter content to translate.');
      return;
    }
    try {
      const response = await axios.get('https://api.mymemory.translated.net/get', {
        params: {
          q: content,
          langpair: `en|${selectedLanguage}`, // Source is English, target is selected language
        },
      });
      setContent(response.data.responseData.translatedText);
      setError(''); // Clear error on success
    } catch (error) {
      setError('Failed to translate. Using original text. Please try again later.');
      console.error('Translation error:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Debug: Check the values before sending
    console.log('Form data:', { title, content, category });
    
    // Validate on frontend too
    if (!title.trim() || !content.trim() || !category.trim()) {
      setError('All fields are required and cannot be empty.');
      return;
    }
    
    try {
      const token = localStorage.getItem('token') || sessionStorage.getItem('token');
      
      if (!token) {
        setError('No authentication token found. Please log in again.');
        return;
      }

      const res = await axios.post(`${API_BASE_URL}/notes`, { 
        title: title.trim(), 
        content: content.trim(), 
        category: category.trim() 
      }, {
        headers: { 
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      onNoteCreated(res.data);
      setTitle('');
      setContent('');
      setCategory('');
      setError('');
    } catch (error) {
      console.error('Note creation error:', error);
      if (error.response?.status === 401) {
        setError('Authentication failed. Please log in again.');
      } else if (error.response?.status === 400) {
        setError(error.response?.data?.message || 'Invalid data. Please check all fields.');
      } else if (error.response?.status === 500) {
        setError('Server error. Please try again later.');
      } else {
        setError(error.response?.data?.message || 'Failed to create note. Please try again.');
      }
    }
  };

  return (
    <div className="bg-white p-4 rounded shadow mb-4">
      <form onSubmit={handleSubmit} className="space-y-2">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-2 border rounded"
          placeholder="Title"
          required
        />
        <input
          type="text"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full p-2 border rounded"
          placeholder="Category"
          required
        />
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full p-2 border rounded"
          placeholder="Content"
          required
        />
        <div className="relative">
          <button
            type="button"
            onClick={() => setShowLanguageDropdown(!showLanguageDropdown)}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Language
          </button>
          {showLanguageDropdown && (
            <div className="absolute z-10 mt-2 w-48 bg-white border rounded shadow-lg">
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => {
                    setSelectedLanguage(lang.code);
                    setShowLanguageDropdown(false);
                  }}
                  className="w-full text-left px-4 py-2 hover:bg-gray-100"
                >
                  {lang.name}
                </button>
              ))}
            </div>
          )}
          <button
            type="button"
            onClick={translateText}
            className="bg-green-500 text-white px-4 py-2 rounded ml-2 hover:bg-green-600"
          >
            Apply Changes
          </button>
        </div>
        <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">
          Save Note
        </button>
        {error && <p className="text-red-500 text-sm">{error}</p>}
      </form>
    </div>
  );
}

export default NoteForm;