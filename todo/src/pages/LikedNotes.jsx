
import { useState, useEffect } from 'react';
import axios from 'axios';
import NoteCard from '../components/NoteCard';

function LikedNotes({ user }) {
  const [likedNotes, setLikedNotes] = useState([]);

  useEffect(() => {
    fetchLikedNotes();
  }, [user]);

  const fetchLikedNotes = async () => {
    try {
      const token = localStorage.getItem('token') || sessionStorage.getItem('token');
      const res = await axios.get('/api/notes/liked', { headers: { Authorization: `Bearer ${token}` } });
      setLikedNotes(Array.isArray(res.data) ? res.data : []);
    } catch (error) {
      console.error(error);
      setLikedNotes([]);
    }
  };

  const handleNoteUpdated = (updatedNote) => {
    setLikedNotes(likedNotes.map(note => note._id === updatedNote._id ? updatedNote : note));
  };

  const handleNoteDeleted = (noteId) => {
    setLikedNotes(likedNotes.filter(note => note._id !== noteId));
  };

  const handleNoteLiked = (noteId, isLiked) => {
    if (!isLiked) {
      setLikedNotes(likedNotes.filter(note => note._id !== noteId));
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h2 className="text-4xl font-light text-gray-700 mb-6">Liked Notes</h2>
      <div className="space-y-4">
        {likedNotes.length > 0 ? (
          likedNotes.map(note => (
            <NoteCard
              key={note._id}
              note={note}
              onUpdate={handleNoteUpdated}
              onDelete={handleNoteDeleted}
              onLike={handleNoteLiked}
            />
          ))
        ) : (
          <p className="text-gray-500">No liked notes available.</p>
        )}
      </div>
    </div>
  );
}

export default LikedNotes;