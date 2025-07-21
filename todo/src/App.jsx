
   import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
   import { useState, useEffect } from 'react';
   import axios from 'axios';
   import Home from './pages/Home';
   import Login from './pages/Login';
   import Signup from './pages/Signup';
   import ForgotPassword from './pages/ForgotPassword';
   import ResetPassword from './pages/ResetPassword';
   import MyNotes from './pages/MyNotes';
   import Profile from './pages/Profile';
   import Navbar from './components/Navbar';

   function App() {
     const [user, setUser] = useState(null);
     const location = useLocation();

     useEffect(() => {
       const fetchUser = async () => {
         const token = localStorage.getItem('token') || sessionStorage.getItem('token');
         if (token) {
           try {
             const res = await axios.get('/api/auth/me', {
               headers: { Authorization: `Bearer ${token}` }
             });
             setUser(res.data);
           } catch (error) {
             localStorage.removeItem('token');
             sessionStorage.removeItem('token');
           }
         }
       };
       fetchUser();
     }, []);

     const showNavbar = location.pathname !== '/';

     return (
       <div className="min-h-screen bg-gray-100">
         {showNavbar && <Navbar user={user} setUser={setUser} />}
         <Routes>
           <Route path="/" element={<Home />} />
           <Route path="/login" element={user ? <Navigate to="/mynotes" /> : <Login setUser={setUser} />} />
           <Route path="/signup" element={user ? <Navigate to="/mynotes" /> : <Signup setUser={setUser} />} />
           <Route path="/forgot-password" element={<ForgotPassword />} />
           <Route path="/reset-password" element={<ResetPassword />} />
           <Route path="/mynotes" element={user ? <MyNotes user={user} /> : <Navigate to="/login" />} />
           <Route path="/profile" element={user ? <Profile user={user} setUser={setUser} /> : <Navigate to="/login" />} />
         </Routes>
       </div>
     );
   }

   export default App;
   