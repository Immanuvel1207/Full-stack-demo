import { useState, useEffect } from 'react';

export default function Dashboard() {
  const [stats, setStats] = useState({
    total: 0,
    completed: 0,
    pending: 0
  });
  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    const tasks = JSON.parse(localStorage.getItem(`tasks_${user.username}`)) || [];
    const completed = tasks.filter(task => task.completed).length;
    setStats({
      total: tasks.length,
      completed: completed,
      pending: tasks.length - completed
    });
  }, [user.username]);

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-6">Dashboard</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-blue-100 p-6 rounded-lg shadow">
          <h3 className="text-xl font-semibold mb-2">Total Tasks</h3>
          <p className="text-3xl font-bold">{stats.total}</p>
        </div>
        <div className="bg-green-100 p-6 rounded-lg shadow">
          <h3 className="text-xl font-semibold mb-2">Completed</h3>
          <p className="text-3xl font-bold">{stats.completed}</p>
        </div>
        <div className="bg-yellow-100 p-6 rounded-lg shadow">
          <h3 className="text-xl font-semibold mb-2">Pending</h3>
          <p className="text-3xl font-bold">{stats.pending}</p>
        </div>
      </div>
    </div>
  );
}
