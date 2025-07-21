
import { useState } from 'react';
import axios from 'axios';

function NoteCard({ note, onUpdate, onDelete }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(note.title);
  const [content, setContent] = useState(note.content);
  const [category, setCategory] = useState(note.category);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const res = await axios.put(`/api/notes/${note._id}`, 
        { title, content, category },
        { headers: { Authorization: `Bearer ${token}` } }
      );
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
      const token = localStorage.getItem('token');
      await axios.delete(`/api/notes/${note._id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      onDelete(note._id);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="bg-white p-4 rounded shadow border border-gray-200">
      <div 
        className="cursor-pointer flex justify-between items-center"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <h3 className="text-lg font-semibold text-gray-800">{note.title}</h3>
        <div className="space-x-2">
          <button
            onClick={(e) => { e.stopPropagation(); setIsEditing(true); }}
            className="bg-blue-500 text-white py-1 px-3 rounded hover:bg-blue-600 transition duration-200"
          >
            Edit
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); handleDelete(); }}
            className="bg-red-500 text-white py-1 px-3 rounded hover:bg-red-600 transition duration-200"
          >
            Delete
          </button>
        </div>
      </div>
      {isExpanded && (
        <div className="mt-2 text-gray-600">
          {isEditing ? (
            <form onSubmit={handleUpdate} className="space-y-2">
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full p-2 border rounded"
                placeholder="Title"
              />
              <input
                type="text"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full p-2 border rounded"
                placeholder="Category"
              />
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="w-full p-2 border rounded"
                placeholder="Content"
              />
              <div className="flex space-x-2">
                <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
                  Save
                </button>
                <button 
                  type="button" 
                  onClick={() => setIsEditing(false)}
                  className="bg-gray-500 text-white px-4 py-2 rounded"
                >
                  Cancel
                </button>
              </div>
            </form>
          ) : (
            <>
              <div className="flex items-center space-x-2 mb-2">
                <span className="bg-green-500 text-white text-sm py-1 px-2 rounded">
                  Category: {note.category}
                </span>
              </div>
              <p className="text-gray-700">{note.content}</p>
              <p className="text-sm text-gray-500 mt-1">
                - Created On: {new Date(note.createdAt).toLocaleDateString()}
              </p>
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default NoteCard;
