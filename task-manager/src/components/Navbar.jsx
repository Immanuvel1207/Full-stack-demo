import React from 'react';

function Navbar({ currentPage, setCurrentPage, handleLogout }) {
  return (
    <nav className="bg-indigo-600 text-white p-4 mb-6">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-xl font-bold">Task Manager</div>
        
        <div className="flex space-x-4">
          <button 
            onClick={() => setCurrentPage('dashboard')}
            className={`flex items-center space-x-1 px-3 py-2 rounded-lg transition ${
              currentPage === 'dashboard' ? 'bg-indigo-800' : 'hover:bg-indigo-700'
            }`}
          >
            <span>Dashboard</span>
          </button>
          
          <button 
            onClick={() => setCurrentPage('tasks')}
            className={`flex items-center space-x-1 px-3 py-2 rounded-lg transition ${
              currentPage === 'tasks' ? 'bg-indigo-800' : 'hover:bg-indigo-700'
            }`}
          >
            <span>Tasks</span>
          </button>
          
          <button 
            onClick={() => setCurrentPage('profile')}
            className={`flex items-center space-x-1 px-3 py-2 rounded-lg transition ${
              currentPage === 'profile' ? 'bg-indigo-800' : 'hover:bg-indigo-700'
            }`}
          >
            <span>Profile</span>
          </button>
          
          <button 
            onClick={handleLogout}
            className="px-3 py-2 bg-red-500 hover:bg-red-600 rounded-lg transition"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;