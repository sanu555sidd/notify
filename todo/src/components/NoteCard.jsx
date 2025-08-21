
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Heart, Smile, Frown, Heart as HeartIcon, Zap, ThumbsUp, Meh } from 'lucide-react';
import { API_BASE_URL } from '../config/api';

function NoteCard({ note, onUpdate, onDelete, onLike }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(note.title);
  const [content, setContent] = useState(note.content);
  const [category, setCategory] = useState(note.category);
  const [isLiked, setIsLiked] = useState(note.isLiked || false);

  // Update local state when note prop changes
  useEffect(() => {
    setIsLiked(note.isLiked || false);
    setTitle(note.title);
    setContent(note.content);
    setCategory(note.category);
  }, [note]);

  // Function to get mood icon and color
  const getMoodDisplay = (sentiment) => {
    switch (sentiment) {
      case 'happy':
        return { icon: <Smile className="w-5 h-5" />, color: 'text-yellow-500', bg: 'bg-yellow-100', label: 'Happy' };
      case 'sad':
        return { icon: <Frown className="w-5 h-5" />, color: 'text-blue-500', bg: 'bg-blue-100', label: 'Sad' };
      case 'love':
        return { icon: <HeartIcon className="w-5 h-5" />, color: 'text-red-500', bg: 'bg-red-100', label: 'Love' };
      case 'excited':
        return { icon: <Zap className="w-5 h-5" />, color: 'text-orange-500', bg: 'bg-orange-100', label: 'Excited' };
      case 'grateful':
        return { icon: <ThumbsUp className="w-5 h-5" />, color: 'text-green-500', bg: 'bg-green-100', label: 'Grateful' };
      case 'angry':
        return { icon: <Frown className="w-5 h-5" />, color: 'text-red-600', bg: 'bg-red-100', label: 'Angry' };
      case 'analyzing':
        return { icon: <div className="w-4 h-4 border-2 border-gray-400 border-t-transparent rounded-full animate-spin" />, color: 'text-gray-400', bg: 'bg-gray-100', label: 'Analyzing...' };
      default:
        return { icon: <Meh className="w-5 h-5" />, color: 'text-gray-500', bg: 'bg-gray-100', label: 'Neutral' };
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token') || sessionStorage.getItem('token');
      const res = await axios.put(`${API_BASE_URL}/notes/${note._id}`, { title, content, category }, { headers: { Authorization: `Bearer ${token}` } });
      onUpdate(res.data);
      setIsEditing(false);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async () => {
    const confirmed = window.confirm('Are you sure you want to delete this note?');
    if (!confirmed) return;
    try {
      const token = localStorage.getItem('token') || sessionStorage.getItem('token');
      await axios.delete(`${API_BASE_URL}/notes/${note._id}`, { headers: { Authorization: `Bearer ${token}` } });
      onDelete(note._id);
    } catch (error) {
      console.error(error);
    }
  };

  const handleShare = () => {
    const message = `**Note Title:** ${note.title}\n**Category:** ${note.category}\n**Content:** ${note.content}\n*Shared via Note Zipper*`;
    const whatsappUrl = `whatsapp://send?text=${encodeURIComponent(message)}`;
    window.location.href = whatsappUrl;
  };

  const handleLike = async () => {
    try {
      const token = localStorage.getItem('token') || sessionStorage.getItem('token');
      const response = await axios.post(`${API_BASE_URL}/notes/${note._id}/like`, {}, { 
        headers: { Authorization: `Bearer ${token}` } 
      });
      
      // Update local state with the response from server
      const updatedNote = response.data;
      setIsLiked(updatedNote.isLiked);
      
      // Notify parent component
      if (onLike) {
        onLike(note._id, updatedNote.isLiked);
      }
    } catch (error) {
      console.error('Error toggling like:', error);
      // Revert the optimistic update if there was an error
    }
  };

  const moodDisplay = getMoodDisplay(note.sentiment);

  return (
  <div className="bg-white dark:bg-gray-800 p-4 rounded shadow border border-gray-200 dark:border-gray-700">
      <div className="cursor-pointer flex justify-between items-center" onClick={() => setIsExpanded(!isExpanded)}>
        <div className="flex items-center space-x-3">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">{note.title}</h3>
          {/* Mood indicator */}
          {note.sentiment && (
            <div className={`flex items-center space-x-1 px-2 py-1 rounded-full ${moodDisplay.bg}`}>
              <span className={moodDisplay.color}>
                {moodDisplay.icon}
              </span>
              <span className={`text-xs font-medium ${moodDisplay.color}`}>
                {moodDisplay.label}
              </span>
            </div>
          )}
        </div>
        <div className="space-x-2">
          <button onClick={(e) => { e.stopPropagation(); setIsEditing(true); setIsExpanded(true); }} className="bg-blue-500 text-white py-1 px-3 rounded hover:bg-blue-600 transition duration-200">
            Edit
          </button>
          <button onClick={(e) => { e.stopPropagation(); handleDelete(); }} className="bg-red-500 text-white py-1 px-3 rounded hover:bg-red-600 transition duration-200">
            Delete
          </button>
          <button onClick={(e) => { e.stopPropagation(); handleShare(); }} className="bg-green-500 text-white py-1 px-3 rounded hover:bg-green-600 transition duration-200">
            Share
          </button>
          <button onClick={(e) => { e.stopPropagation(); handleLike(); }} className={`p-1 rounded ${isLiked ? 'bg-red-500 text-white' : 'bg-gray-200'}`}>
            <Heart size={16} fill={isLiked ? 'red' : 'none'} />
          </button>
        </div>
      </div>
      {isExpanded && (
  <div className="mt-2 text-gray-600 dark:text-gray-300">
          {isEditing ? (
            <form onSubmit={handleUpdate} className="space-y-2">
              <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} className="w-full p-2 border rounded bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100" placeholder="Title" />
              <input type="text" value={category} onChange={(e) => setCategory(e.target.value)} className="w-full p-2 border rounded bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100" placeholder="Category" />
              <textarea value={content} onChange={(e) => setContent(e.target.value)} className="w-full p-2 border rounded bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100" placeholder="Content" />
              <div className="flex space-x-2">
                <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Save</button>
                <button type="button" onClick={() => setIsEditing(false)} className="bg-gray-500 text-white px-4 py-2 rounded">Cancel</button>
              </div>
            </form>
          ) : (
            <>
              <div className="flex items-center space-x-2 mb-2">
                <span className="bg-green-500 text-white text-sm py-1 px-2 rounded">Category: {note.category}</span>
              </div>
              <p className="text-gray-700 dark:text-gray-200">{note.content}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">- Created On: {new Date(note.createdAt).toLocaleDateString()}</p>
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default NoteCard;