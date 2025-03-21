import React, { useState } from 'react';
import toast from 'react-hot-toast';

function LoginPage({ setIsAuthenticated, setUser, setCurrentPage }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    
    // Get users from localStorage
    const usersJson = localStorage.getItem('users');
    const users = usersJson ? JSON.parse(usersJson) : [];
    
    // Find matching user
    const user = users.find(u => u.username === username && u.password === password);

    if (user) {
      // Store user in localStorage for persistence
      localStorage.setItem('user', JSON.stringify(user));
      
      // Update app state
      setUser(user);
      setIsAuthenticated(true);
      setCurrentPage('dashboard');
      toast.success('Welcome back! 🎉');
    } else {
      toast.error('Invalid credentials');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-500 to-pink-500">
      <div className="bg-white p-8 rounded-2xl shadow-2xl w-96 transform transition hover:scale-105">
        <h2 className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
          Welcome Back
        </h2>
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <input
              type="text"
              placeholder="Username"
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div>
            <input
              type="password"
              placeholder="Password"
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button 
            type="submit" 
            className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white p-3 rounded-lg hover:opacity-90 transform transition"
          >
            Login
          </button>
        </form>
        <p className="mt-6 text-center text-gray-600">
          New here? {' '}
          <button 
            onClick={() => setCurrentPage('register')}
            className="text-purple-600 hover:text-pink-600 font-semibold"
          >
            Create Account
          </button>
        </p>
      </div>
    </div>
  );
}

export default LoginPage;