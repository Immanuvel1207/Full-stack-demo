import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

export default function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [editingTask, setEditingTask] = useState(null);
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    const storedTasks = localStorage.getItem(`tasks_${user.username}`);
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks));
    }
  }, [user.username]);

  const addTask = (e) => {
    e.preventDefault();
    if (!newTask.trim()) return;
    const newTasks = [
      ...tasks,
      { id: Date.now(), text: newTask, completed: false },
    ];
    setTasks(newTasks);
    localStorage.setItem(`tasks_${user.username}`, JSON.stringify(newTasks));
    setNewTask('');
  };

  const deleteTask = (taskId) => {
    const updatedTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(updatedTasks);
    localStorage.setItem(`tasks_${user.username}`, JSON.stringify(updatedTasks));
  };

  const toggleTask = (taskId) => {
    if (editingTask && editingTask.id === taskId) {
      setEditingTask(null);
    } else {
      const updatedTasks = tasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      );
      setTasks(updatedTasks);
      localStorage.setItem(`tasks_${user.username}`, JSON.stringify(updatedTasks));
      setEditingTask(updatedTasks.find((task) => task.id === taskId));
    }
  };

  return (
    <div className="container mx-auto p-4 bg-indigo-50 min-h-screen">
      <h2 className="text-2xl font-bold mb-6 text-indigo-800">Tasks</h2>
      <form onSubmit={addTask} className="mb-6">
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
          placeholder="Add new task"
        />
        <button
          type="submit"
          className="bg-purple-500 hover:bg-purple-600 text-white py-2 px-4 rounded-lg ml-4"
        >
          Add
        </button>
      </form>
      <ul>
        {tasks.map((task) => (
          <li
            key={task.id}
            className={`flex items-center justify-between mb-4 p-4 rounded-lg ${
              task.completed ? 'bg-green-100' : 'bg-white'
            }`}
          >
            <div className="flex items-center">
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => toggleTask(task.id)}
                className="form-checkbox h-6 w-6 text-purple-600 mr-4"
              />
              {editingTask && editingTask.id === task.id ? (
                <input
                  type="text"
                  value={editingTask.text}
                  onChange={(e) =>
                    setEditingTask({ ...editingTask, text: e.target.value })
                  }
                  className="ml-3 bg-transparent outline-none"
                />
              ) : (
                <span
                  className={`ml-3 ${
                    task.completed ? 'line-through text-gray-500' : 'text-gray-900'
                  }`}
                >
                  {task.text}
                </span>
              )}
            </div>
            <div className="flex items-center">
              <button
                onClick={() => deleteTask(task.id)}
                className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-lg"
              >
                Delete
              </button>
              {editingTask && editingTask.id === task.id ? (
                <button
                  onClick={() => {
                    const updatedTasks = tasks.map((t) =>
                      t.id === task.id ? editingTask : t
                    );
                    setTasks(updatedTasks);
                    localStorage.setItem(
                      `tasks_${user.username}`,
                      JSON.stringify(updatedTasks)
                    );
                    setEditingTask(null);
                  }}
                  className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-lg ml-4"
                >
                  Save
                </button>
              ) : (
                <button
                  onClick={() => setEditingTask(task)}
                  className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg ml-4"
                >
                  Edit
              </button>
            )}
        ))}
      </ul>
    </div>
  );
}