import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import LoginPage from './pages/LoginPage';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Tasks from './pages/Tasks';
import Profile from './pages/Profile';
import Navbar from './components/Navbar';

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const loggedInUser = localStorage.getItem('user');
    if (loggedInUser) {
      setIsAuthenticated(true);
    }
  }, []);

  const PrivateRoute = ({ children }) => {
    return isAuthenticated ? (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50">
        <Navbar setIsAuthenticated={setIsAuthenticated} />
        {children}
      </div>
    ) : (
      <Navigate to="/login" />
    );
  };

  return (
    <>
      <Router>
        <div className="min-h-screen">
          <Routes>
            <Route path="/login" element={<LoginPage setIsAuthenticated={setIsAuthenticated} />} />
            <Route path="/register" element={<Register />} />
            <Route path="/" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
            <Route path="/tasks" element={<PrivateRoute><Tasks /></PrivateRoute>} />
            <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
          </Routes>
        </div>
      </Router>
      <Toaster 
        position="top-right"
        toastOptions={{
          style: {
            background: '#363636',
            color: '#fff',
          },
          success: {
            duration: 3000,
            theme: {
              primary: '#4F46E5',
            },
          },
        }}
      />
    </>
  );
}
