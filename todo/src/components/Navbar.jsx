import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Menu, User, LogOut } from 'lucide-react';

function Navbar({ user, setUser }) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('token');
    sessionStorage.removeItem('token');
    setUser(null);
  };

  return (
    <nav className="bg-blue-600 p-4 text-white flex justify-between items-center">
      <div className="flex items-center space-x-4">
        <Link to="/" className="text-xl font-bold">NOTIFY</Link>
        
      </div>
      {user ? (
        <div className="flex items-center space-x-4">
          <Link to="/liked-notes" className="hover:underline">Liked Notes</Link>
          <Link to="/mynotes" className="hover:underline">My Notes</Link>
          <div className="relative">
            <button onClick={() => setIsDropdownOpen(!isDropdownOpen)} className="flex items-center space-x-2">
              <span>{user.name}</span>
              <User size={20} />
            </button>
            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white text-black rounded shadow-lg">
                <Link to="/profile" className="block px-4 py-2 hover:bg-gray-200" onClick={() => setIsDropdownOpen(false)}>My Profile</Link>
                <button onClick={handleLogout} className="w-full text-left px-4 py-2 hover:bg-gray-200"><LogOut size={16} /> Logout</button>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="space-x-4">
          <Link to="/login" className="hover:underline">Login</Link>
          <Link to="/signup" className="hover:underline">Signup</Link>
        </div>
      )}
    </nav>
  );
}

export default Navbar;