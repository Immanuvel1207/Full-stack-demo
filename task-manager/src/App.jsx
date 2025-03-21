import React, { useState, useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import Dashboard from './pages/Dashboard';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/Register';
import ProfilePage from './pages/ProfilePage';
import Tasks from './pages/Tasks';
import Navbar from './components/Navbar';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [currentPage, setCurrentPage] = useState('dashboard');

  // Check if user is already logged in on page load
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setIsAuthenticated(true);
    } else {
      setCurrentPage('login');
    }
  }, []);

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
    setIsAuthenticated(false);
    setCurrentPage('login');
  };

  // Render login/register if not authenticated
  if (!isAuthenticated) {
    return (
      <div>
        <Toaster position="top-right" />
        {currentPage === 'login' ? (
          <LoginPage 
            setIsAuthenticated={setIsAuthenticated} 
            setUser={setUser}
            setCurrentPage={setCurrentPage}
          />
        ) : (
          <RegisterPage setCurrentPage={setCurrentPage} />
        )}
      </div>
    );
  }

  // Render app content if authenticated
  return (
    <div>
      <Toaster position="top-right" />
      <Navbar 
        currentPage={currentPage} 
        setCurrentPage={setCurrentPage} 
        handleLogout={handleLogout}
      />
      
      <div className="container mx-auto">
        {currentPage === 'dashboard' && <Dashboard user={user} />}
        {currentPage === 'tasks' && <Tasks user={user} />}
        {currentPage === 'profile' && (
          <ProfilePage user={user} setUser={setUser} />
        )}
      </div>
    </div>
  );
}

export default App;