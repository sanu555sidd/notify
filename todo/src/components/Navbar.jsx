import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Navbar({ user, setUser }) {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    setUser(null);
    navigate('/login');
  };

  return (
    <nav className="bg-blue-600 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-white text-2xl font-bold">NOTIFY</Link>
        <div className="flex items-center space-x-4">
          {user && (
            <Link to="/mynotes" className="text-white hover:text-gray-200">My Notes</Link>
          )}
          {user ? (
            <div className="relative">
              <button 
                onClick={() => setIsOpen(!isOpen)} 
                className="text-white hover:text-gray-200"
              >
                Me
              </button>
              {isOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg">
                  <Link 
                    to="/profile" 
                    className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                    onClick={() => setIsOpen(false)}
                  >
                    My Profile
                  </Link>
                  <button 
                    onClick={() => {
                      handleLogout();
                      setIsOpen(false);
                    }} 
                    className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-100"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link to="/login" className="text-white hover:text-gray-200">Login</Link>
              <Link to="/signup" className="text-white hover:text-gray-200">Signup</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;