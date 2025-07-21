
import { useState, useEffect } from 'react';
import axios from 'axios';
import NoteCard from '../components/NoteCard';
import NoteForm from '../components/NoteForm';

function MyNotes({ user }) {
  const [notes, setNotes] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [sentiment, setSentiment] = useState(null);
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    fetchNotes();
  }, [user]);

  // Real-time search when searchQuery changes
  useEffect(() => {
    if (searchQuery.trim()) {
      const debounceTimer = setTimeout(() => {
        fetchNotes(searchQuery);
      }, 300); // Debounce search by 300ms
      
      return () => clearTimeout(debounceTimer);
    } else {
      fetchNotes(); // Load all notes when search is empty
    }
  }, [searchQuery]);

  const fetchNotes = async (query = '') => {
    try {
      setIsSearching(true);
      const token = localStorage.getItem('token') || sessionStorage.getItem('token');
      const url = query ? `/api/notes/search?query=${encodeURIComponent(query)}` : '/api/notes';
      const res = await axios.get(url, { headers: { Authorization: `Bearer ${token}` } });
      setNotes(Array.isArray(res.data) ? res.data : []);
    } catch (error) {
      console.error('Error fetching notes:', error);
      setNotes([]);
    } finally {
      setIsSearching(false);
    }
  };

  const handleNoteCreated = async (newNote) => {
    try {
      // Add the note to the list immediately
      const noteWithMood = { ...newNote, sentiment: 'analyzing' };
      setNotes([...notes, noteWithMood]);
      setShowForm(false);

      // Analyze sentiment using TextBlob-like analysis
      const sentiment = await analyzeSentiment(newNote.content);
      
      // Update the note with the analyzed sentiment
      setNotes(prevNotes => 
        prevNotes.map(note => 
          note._id === newNote._id 
            ? { ...note, sentiment: sentiment.mood }
            : note
        )
      );
      
      setSentiment({ noteId: newNote._id, mood: sentiment.mood, score: sentiment.score });
    } catch (error) {
      console.error('Sentiment analysis failed:', error);
      // Update with neutral sentiment if analysis fails
      setNotes(prevNotes => 
        prevNotes.map(note => 
          note._id === newNote._id 
            ? { ...note, sentiment: 'neutral' }
            : note
        )
      );
      setSentiment({ noteId: newNote._id, mood: 'neutral' });
    }
  };

  const analyzeSentiment = async (text) => {
    try {
      // Using a free sentiment analysis API
      const response = await axios.post('https://api.meaningcloud.com/sentiment-2.1', null, {
        params: {
          key: '07b47b3dd0a9d9ef3e7d9de7e4b89b9e', // Free API key (replace with your own)
          txt: text,
          lang: 'en',
        },
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        }
      });

      const data = response.data;
      const confidence = parseInt(data.confidence) || 0;
      const scoreTag = data.score_tag;
      
      // Enhanced mood mapping based on score and confidence
      let mood = 'neutral';
      let emotionalKeywords = text.toLowerCase();
      
      // Check for specific emotional keywords
      if (emotionalKeywords.includes('love') || emotionalKeywords.includes('adore') || emotionalKeywords.includes('heart')) {
        mood = 'love';
      } else if (emotionalKeywords.includes('excited') || emotionalKeywords.includes('amazing') || emotionalKeywords.includes('fantastic')) {
        mood = 'excited';
      } else if (emotionalKeywords.includes('angry') || emotionalKeywords.includes('furious') || emotionalKeywords.includes('mad')) {
        mood = 'angry';
      } else if (emotionalKeywords.includes('grateful') || emotionalKeywords.includes('thankful') || emotionalKeywords.includes('blessed')) {
        mood = 'grateful';
      } else {
        // Use API sentiment score
        switch (scoreTag) {
          case 'P+': // Strong positive
            mood = confidence > 80 ? 'excited' : 'happy';
            break;
          case 'P': // Positive
            mood = 'happy';
            break;
          case 'NEU': // Neutral
            mood = 'neutral';
            break;
          case 'N': // Negative
            mood = 'sad';
            break;
          case 'N+': // Strong negative
            mood = confidence > 80 ? 'angry' : 'sad';
            break;
          default:
            mood = 'neutral';
        }
      }

      return {
        mood,
        score: confidence,
        sentiment: scoreTag
      };
    } catch (error) {
      console.error('API sentiment analysis failed, using fallback:', error);
      
      // Fallback local sentiment analysis
      const text_lower = text.toLowerCase();
      const positiveWords = ['happy', 'joy', 'love', 'excited', 'amazing', 'wonderful', 'great', 'awesome', 'fantastic', 'excellent'];
      const negativeWords = ['sad', 'angry', 'hate', 'terrible', 'awful', 'bad', 'horrible', 'disgusting', 'annoying'];
      const loveWords = ['love', 'adore', 'heart', 'romantic', 'affection', 'cherish'];
      const excitedWords = ['excited', 'thrilled', 'pumped', 'energetic', 'amazing', 'fantastic'];
      
      if (loveWords.some(word => text_lower.includes(word))) {
        return { mood: 'love', score: 75 };
      } else if (excitedWords.some(word => text_lower.includes(word))) {
        return { mood: 'excited', score: 80 };
      } else if (positiveWords.some(word => text_lower.includes(word))) {
        return { mood: 'happy', score: 70 };
      } else if (negativeWords.some(word => text_lower.includes(word))) {
        return { mood: 'sad', score: 70 };
      } else {
        return { mood: 'neutral', score: 50 };
      }
    }
  };

  const handleNoteUpdated = (updatedNote) => {
    setNotes(notes.map(note => note._id === updatedNote._id ? updatedNote : note));
  };

  const handleNoteDeleted = (noteId) => {
    setNotes(notes.filter(note => note._id !== noteId));
  };

  const handleNoteLiked = (noteId, isLiked) => {
    setNotes(notes.map(note => note._id === noteId ? { ...note, isLiked } : note));
  };

  // Calculate mood statistics
  const getMoodStats = () => {
    const moodCounts = notes.reduce((acc, note) => {
      const mood = note.sentiment || 'neutral';
      acc[mood] = (acc[mood] || 0) + 1;
      return acc;
    }, {});
    
    return moodCounts;
  };

  const moodStats = getMoodStats();

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h2 className="text-4xl font-light text-gray-700 mb-6">Welcome Back {user.name}...</h2>
      
      {/* Search Bar */}
      <div className="mb-6">
        <div className="flex space-x-2">
          <div className="flex-1 relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search notes by title, content, or category..."
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            {isSearching && (
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-500"></div>
              </div>
            )}
          </div>
          <button 
            type="button"
            onClick={() => setSearchQuery('')}
            className="bg-gray-500 text-white px-6 py-3 rounded-lg hover:bg-gray-600 transition duration-200"
          >
            Clear
          </button>
        </div>
        {searchQuery && (
          <p className="text-sm text-gray-600 mt-2">
            {isSearching ? 'Searching...' : `Found ${notes.length} note${notes.length !== 1 ? 's' : ''} matching "${searchQuery}"`}
          </p>
        )}
      </div>

      <div className="mb-6">
        <button onClick={() => setShowForm(!showForm)} className="bg-blue-600 text-white font-semibold py-2 px-4 rounded hover:bg-blue-700 transition duration-200">
          Create New Note
        </button>
      </div>

      {/* Mood Dashboard */}
      {notes.length > 0 && Object.keys(moodStats).length > 0 && (
        <div className="mb-6 bg-white p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-gray-700 mb-3">📊 Your Mood Overview</h3>
          <div className="flex flex-wrap gap-3">
            {Object.entries(moodStats).map(([mood, count]) => {
              const getMoodEmoji = (mood) => {
                switch (mood) {
                  case 'happy': return '😊';
                  case 'sad': return '😢';
                  case 'love': return '❤️';
                  case 'excited': return '🎉';
                  case 'grateful': return '🙏';
                  case 'angry': return '😠';
                  case 'analyzing': return '🔄';
                  default: return '😐';
                }
              };
              
              return (
                <div key={mood} className="flex items-center space-x-2 bg-gray-50 px-3 py-2 rounded-full">
                  <span className="text-lg">{getMoodEmoji(mood)}</span>
                  <span className="text-sm font-medium text-gray-700 capitalize">{mood}</span>
                  <span className="text-sm bg-blue-100 text-blue-800 px-2 py-1 rounded-full">{count}</span>
                </div>
              );
            })}
          </div>
        </div>
      )}
      {showForm && <NoteForm onNoteCreated={handleNoteCreated} />}
      <div className="space-y-4">
        {notes.length > 0 ? (
          notes.map(note => (
            <NoteCard
              key={note._id}
              note={note}
              onUpdate={handleNoteUpdated}
              onDelete={handleNoteDeleted}
              onLike={handleNoteLiked}
            />
          ))
        ) : (
          <p className="text-gray-500">No notes available.</p>
        )}
      </div>
    </div>
  );
}

export default MyNotes;