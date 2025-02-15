import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

export default function Navbar({ setIsAuthenticated }) {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));

  const handleLogout = () => {
    localStorage.removeItem('user');
    setIsAuthenticated(false);
    toast.success('Logged out successfully');
    navigate('/login');
  };

  return (
    <nav className="bg-gradient-to-r from-purple-600 to-pink-600 p-4 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-white font-bold text-2xl">
          ✨ TaskMaster
        </Link>
        <div className="flex items-center space-x-6">
          <Link to="/" className="text-white hover:text-pink-200 transition">
            Dashboard
          </Link>
          <Link to="/tasks" className="text-white hover:text-pink-200 transition">
            Tasks
          </Link>
          <div className="flex items-center space-x-4">
            <Link to="/profile" className="flex items-center">
              <img 
                src={user?.photo} 
                alt="Profile" 
                className="w-10 h-10 rounded-full object-cover border-2 border-white hover:border-pink-200 transition"
              />
            </Link>
            <button 
              onClick={handleLogout}
              className="bg-white text-purple-600 px-4 py-2 rounded-full hover:bg-pink-100 transition"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}