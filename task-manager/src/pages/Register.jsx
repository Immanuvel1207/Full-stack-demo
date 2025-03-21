import React, { useState } from 'react';
import toast from 'react-hot-toast';

function Register({ setCurrentPage }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [photo, setPhoto] = useState('');

  const handlePhotoChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      
      reader.onloadend = () => {
        setPhoto(reader.result);
      };
      
      reader.readAsDataURL(file);
    }
  };

  const handleRegister = (e) => {
    e.preventDefault();
    
    // Validate inputs
    if (!username || !password || !photo) {
      toast.error('All fields are required');
      return;
    }
    
    // Get existing users
    const usersJson = localStorage.getItem('users');
    const users = usersJson ? JSON.parse(usersJson) : [];
    
    // Check if username already exists
    if (users.some(u => u.username === username)) {
      toast.error('Username already exists');
      return;
    }
    
    // Create new user
    const newUser = { 
      username, 
      password,
      photo,
      createdAt: new Date().toISOString()
    };
    
    // Save to localStorage
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
    
    // Show success message and redirect to login
    toast.success('Account created successfully!');
    setCurrentPage('login');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-500 to-pink-500">
      <div className="bg-white p-8 rounded-2xl shadow-2xl w-96 transform transition hover:scale-105">
        <h2 className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
          Create Account
        </h2>
        <form onSubmit={handleRegister} className="space-y-4">
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
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Profile Photo
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handlePhotoChange}
              className="w-full"
              required
            />
            {photo && (
              <div className="mt-2">
                <img 
                  src={photo || "/placeholder.svg"} 
                  alt="Preview" 
                  className="w-20 h-20 rounded-full object-cover mx-auto border-4 border-purple-200"
                />
              </div>
            )}
          </div>
          <button 
            type="submit" 
            className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white p-3 rounded-lg hover:opacity-90 transform transition"
          >
            Register
          </button>
        </form>
        <p className="mt-6 text-center text-gray-600">
          Already have an account? {' '}
          <button 
            onClick={() => setCurrentPage('login')}
            className="text-purple-600 hover:text-pink-600 font-semibold"
          >
            Login
          </button>
        </p>
      </div>
    </div>
  );
}

export default Register;