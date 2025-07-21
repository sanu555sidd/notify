
   import { useState } from 'react';
   import axios from 'axios';

   function NoteForm({ onNoteCreated }) {
     const [title, setTitle] = useState('');
     const [content, setContent] = useState('');
     const [category, setCategory] = useState('');
     const [error, setError] = useState('');

     const handleSubmit = async (e) => {
       e.preventDefault();
       try {
         const token = localStorage.getItem('token') || sessionStorage.getItem('token');
         const res = await axios.post('/api/notes', { title, content, category }, {
           headers: { Authorization: `Bearer ${token}` }
         });
         onNoteCreated(res.data);
         setTitle('');
         setContent('');
         setCategory('');
         setError('');
       } catch (error) {
         setError('Failed to create note. Please try again.');
         console.error(error);
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
           <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">
             Save Note
           </button>
           {error && <p className="text-red-500 text-sm">{error}</p>}
         </form>
       </div>
     );
   }

   export default NoteForm;
   