import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';

export default function Tasks({ user }) {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [editingTask, setEditingTask] = useState(null);

  // Load tasks from localStorage
  useEffect(() => {
    if (user && user.username) {
      const storedTasks = JSON.parse(localStorage.getItem(`tasks_${user.username}`)) || [];
      setTasks(storedTasks);
    }
  }, [user]);

  // Add a new task
  const addTask = (e) => {
    e.preventDefault();
    if (!newTask.trim()) {
      toast.error('Task cannot be empty!');
      return;
    }
    if (tasks.some((task) => task.text === newTask.trim())) {
      toast.error('Task already exists!');
      return;
    }
    const newTasks = [
      ...tasks,
      {
        id: Date.now(),
        text: newTask,
        completed: false,
        createdAt: new Date().toLocaleString(),
      },
    ];
    setTasks(newTasks);
    localStorage.setItem(`tasks_${user.username}`, JSON.stringify(newTasks));
    setNewTask('');
    toast.success('Task added successfully!');
  };

  // Toggle task completion
  const toggleTask = (id) => {
    const updatedTasks = tasks.map((task) =>
      task.id === id ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
    localStorage.setItem(`tasks_${user.username}`, JSON.stringify(updatedTasks));
  };

  // Delete a task
  const deleteTask = (id) => {
    const updatedTasks = tasks.filter((task) => task.id !== id);
    setTasks(updatedTasks);
    localStorage.setItem(`tasks_${user.username}`, JSON.stringify(updatedTasks));
    toast.success('Task deleted!');
  };

  // Start editing a task
  const editTask = (task) => {
    setEditingTask({ ...task });
  };

  // Save edited task **(Fixed Issue)**
  const saveTask = () => {
    if (!editingTask.text.trim()) {
      toast.error('Task cannot be empty!');
      return;
    }

    // First, set editingTask to null to trigger re-render immediately
    setEditingTask(null);

    // Then, update the tasks state
    setTasks((prevTasks) =>
      prevTasks.map((t) => (t.id === editingTask.id ? { ...t, text: editingTask.text } : t))
    );

    // Store the updated tasks in localStorage
    localStorage.setItem(
      `tasks_${user.username}`,
      JSON.stringify(
        tasks.map((t) =>
          t.id === editingTask.id ? { ...t, text: editingTask.text } : t
        )
      )
    );

    toast.success('Task updated!');
  };

  return (
    <div className="container mx-auto p-6 bg-indigo-50 min-h-screen flex flex-col items-center">
      <h2 className="text-2xl font-bold mb-4 text-indigo-800">Task Manager</h2>

      {/* Add Task Form */}
      <form onSubmit={addTask} className="mb-6 flex w-full max-w-md">
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          className="flex-grow p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
          placeholder="Add new task..."
        />
        <button
          type="submit"
          className="bg-purple-500 hover:bg-purple-600 text-white py-2 px-4 rounded-lg ml-3"
        >
          Add
        </button>
      </form>

      {/* Task List */}
      <ul className="w-full max-w-md">
        {tasks.length === 0 && <p className="text-gray-500 text-center">No tasks available.</p>}
        {tasks.map((task) => (
          <li
            key={task.id}
            className={`flex flex-col md:flex-row items-start md:items-center justify-between mb-4 p-4 rounded-lg transition-all duration-300 w-full ${
              task.completed ? 'bg-green-100' : 'bg-white'
            }`}
          >
            <div className="flex flex-col w-full">
              {/* Editing Mode */}
              {editingTask && editingTask.id === task.id ? (
                <input
                  type="text"
                  value={editingTask.text}
                  onChange={(e) => setEditingTask({ ...editingTask, text: e.target.value })}
                  className="border p-2 rounded-lg outline-none mb-2"
                />
              ) : (
                <span
                  className={`text-lg ${
                    task.completed ? 'line-through text-gray-500' : 'text-gray-900'
                  }`}
                >
                  {task.text}
                </span>
              )}
              <span className="text-sm text-gray-500">Created: {task.createdAt}</span>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center mt-2 md:mt-0">
              <button
                onClick={() => toggleTask(task.id)}
                className={`mr-2 ${
                  task.completed ? 'bg-green-500' : 'bg-purple-500'
                } hover:bg-purple-600 text-white py-1 px-3 text-sm rounded-lg`}
              >
                {task.completed ? 'Undo' : 'Done'}
              </button>
              <button
                onClick={() => deleteTask(task.id)}
                className="bg-red-500 hover:bg-red-600 text-white py-1 px-3 text-sm rounded-lg"
              >
                Delete
              </button>
              {!editingTask && (
                <button
                  onClick={() => editTask(task)}
                  className="bg-blue-500 hover:bg-blue-600 text-white py-1 px-3 text-sm rounded-lg ml-2"
                >
                  Edit
                </button>
              )}
              {editingTask && editingTask.id === task.id && (
                <>
                  <button
                    onClick={saveTask}
                    className="bg-green-500 hover:bg-green-600 text-white py-1 px-3 text-sm rounded-lg ml-2"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => setEditingTask(null)}
                    className="bg-gray-500 hover:bg-gray-600 text-white py-1 px-3 text-sm rounded-lg ml-2"
                  >
                    Cancel
                  </button>
                </>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
