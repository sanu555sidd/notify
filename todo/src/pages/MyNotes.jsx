
   import { useState, useEffect } from 'react';
   import axios from 'axios';
   import NoteCard from '../components/NoteCard';
   import NoteForm from '../components/NoteForm';

   function MyNotes({ user }) {
     const [notes, setNotes] = useState([]);
     const [showForm, setShowForm] = useState(false);
     const [searchQuery, setSearchQuery] = useState('');

     useEffect(() => {
       fetchNotes();
     }, [user]); // Refetch notes when user changes (e.g., after login)

     const fetchNotes = async (query = '') => {
       try {
         const token = localStorage.getItem('token') || sessionStorage.getItem('token');
         const url = query ? `/api/notes/search?query=${query}` : '/api/notes';
         const res = await axios.get(url, {
           headers: { Authorization: `Bearer ${token}` }
         });
         setNotes(Array.isArray(res.data) ? res.data : []);
       } catch (error) {
         console.error(error);
         setNotes([]);
       }
     };

     const handleSearch = (e) => {
       e.preventDefault();
       fetchNotes(searchQuery);
     };

     const handleNoteCreated = (newNote) => {
       setNotes([...notes, newNote]);
       setShowForm(false);
     };

     const handleNoteUpdated = (updatedNote) => {
       setNotes(notes.map(note => note._id === updatedNote._id ? updatedNote : note));
     };

     const handleNoteDeleted = (noteId) => {
       setNotes(notes.filter(note => note._id !== noteId));
     };

     return (
       <div className="min-h-screen bg-gray-100 p-6">
         <h2 className="text-4xl font-light text-gray-700 mb-6">
           Welcome Back {user.name}...
         </h2>
         <div className="mb-6">
           <button
             onClick={() => setShowForm(!showForm)}
             className="bg-blue-600 text-white font-semibold py-2 px-4 rounded hover:bg-blue-700 transition duration-200"
           >
             Create New Note
           </button>
         </div>
         {showForm && <NoteForm onNoteCreated={handleNoteCreated} />}
         <div className="space-y-4">
           {notes.length > 0 ? (
             notes.map(note => (
               <NoteCard
                 key={note._id}
                 note={note}
                 onUpdate={handleNoteUpdated}
                 onDelete={handleNoteDeleted}
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
   