import { useState } from 'react';

export default function Profile() {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));
  const [newPassword, setNewPassword] = useState('');
  const [newPhoto, setNewPhoto] = useState('');

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setNewPhoto(reader.result);
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleUpdateProfile = (e) => {
    e.preventDefault();
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const updatedUsers = users.map(u => {
      if (u.username === user.username) {
        return { 
          ...u, 
          password: newPassword || u.password,
          photo: newPhoto || u.photo
        };
      }
      return u;
    });

    const updatedUser = {
      ...user,
      password: newPassword || user.password,
      photo: newPhoto || user.photo
    };

    localStorage.setItem('users', JSON.stringify(updatedUsers));
    localStorage.setItem('user', JSON.stringify(updatedUser));
    setUser(updatedUser);
    setNewPassword('');
    alert('Profile updated successfully!');
  };

  return (
    <div className="container mx-auto p-4 bg-indigo-50 min-h-screen">
      <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-indigo-800">Profile</h2>
        
        <div className="mb-6 text-center">
          <img 
            src={user.photo} 
            alt="Profile" 
            className="w-32 h-32 rounded-full mx-auto object-cover border-4 border-indigo-200"
          />
        </div>

        <div className="mb-6">
          <p className="text-gray-600">Username</p>
          <p className="text-xl font-semibold text-indigo-800">{user.username}</p>
        </div>
        
        <form onSubmit={handleUpdateProfile}>
          <div className="mb-4">
            <label className="block text-gray-600 mb-2">Change Password</label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full p-2 border rounded focus:border-indigo-500 focus:outline-none"
              placeholder="Enter new password"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-600 mb-2">Update Profile Photo</label>
            <input
              type="file"
              accept="image/*"
              onChange={handlePhotoChange}
              className="w-full"
            />
            {newPhoto && (
              <div className="mt-2">
                <img src={newPhoto} alt="New photo preview" className="w-20 h-20 rounded-full object-cover" />
              </div>
            )}
          </div>

          <button 
            type="submit"
            className="w-full bg-indigo-600 text-white p-2 rounded hover:bg-indigo-700"
          >
            Update Profile
          </button>
        </form>
      </div>
    </div>
  );
}