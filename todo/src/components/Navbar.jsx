import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { User, LogOut, Sun, Moon } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

function Navbar({ user, setUser }) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const dropdownRef = useRef(null);

  const handleLogout = () => {
    localStorage.removeItem('token');
    sessionStorage.removeItem('token');
    setUser(null);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <nav className="bg-blue-600 dark:bg-gray-800 p-4 text-white flex justify-between items-center">
      <div className="flex items-center space-x-4">
        <span className="text-xl font-bold cursor-pointer">NOTIFY</span>

        {/* Theme toggle */}
        <button
          onClick={toggleTheme}
          className="ml-4 p-2 rounded-full cursor-pointer bg-white/10 hover:bg-white/20 dark:bg-gray-700 dark:hover:bg-gray-600 transition-colors"
          title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
        >
          {theme === 'dark' ? (
            <Sun className="w-5 h-5 text-yellow-300" />
          ) : (
            <Moon className="w-5 h-5 text-gray-800" />
          )}
        </button>
      </div>

      {user ? (
        <div className="flex items-center space-x-4">
          <Link to="/liked-notes" className="hover:underline cursor-pointer">Liked Notes</Link>
          <Link to="/mynotes" className="hover:underline cursor-pointer">My Notes</Link>

          {/* Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center space-x-2 cursor-pointer"
            >
              <span>{user.name}</span>
              <User size={20} />
            </button>

            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white text-black rounded shadow-lg">
                <Link
                  to="/profile"
                  className="block px-4 py-2 hover:bg-gray-200 cursor-pointer"
                  onClick={() => setIsDropdownOpen(false)}
                >
                  My Profile
                </Link>
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 hover:bg-gray-200 cursor-pointer flex items-center space-x-2"
                >
                  <LogOut size={16} /> <span>Logout</span>
                </button>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="space-x-4">
          <Link to="/login" className="hover:underline cursor-pointer">Login</Link>
          <Link to="/signup" className="hover:underline cursor-pointer">Signup</Link>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
