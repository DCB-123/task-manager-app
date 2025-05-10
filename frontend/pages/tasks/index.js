import { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import api from '../../utils/api';

export default function TasksPage() {
  const { user } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [editTask, setEditTask] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    dueDate: '',
    priority: 'Low',
    status: 'Pending',
  });

  useEffect(() => {
    if (user) fetchTasks();
  }, [user]);

  const fetchTasks = async () => {
    try {
      const res = await api.get('/tasks');
      setTasks(res.data);
    } catch (err) {
      console.error('Failed to fetch tasks:', err);
    }
  };

  const handleCreateTask = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post('/tasks', formData);
      setTasks([...tasks, res.data]);
      resetForm();
    } catch (err) {
      console.error('Failed to create task:', err);
    }
  };

  const handleUpdateTask = async (e) => {
    e.preventDefault();
    try {
      const res = await api.put(`/tasks/${editTask._id}`, formData);
      setTasks(tasks.map((task) => (task._id === editTask._id ? res.data : task)));
      resetForm();
    } catch (err) {
      console.error('Failed to update task:', err);
    }
  };

  const handleDeleteTask = async (id) => {
    try {
      await api.delete(`/tasks/${id}`);
      setTasks(tasks.filter((task) => task._id !== id));
    } catch (err) {
      console.error('Failed to delete task:', err);
    }
  };

  const handleEditTask = (task) => {
    setEditTask(task);
    setFormData({
      title: task.title,
      description: task.description,
      dueDate: task.dueDate.split('T')[0],
      priority: task.priority,
      status: task.status,
    });
  };

  const resetForm = () => {
    setEditTask(null);
    setFormData({
      title: '',
      description: '',
      dueDate: '',
      priority: 'Low',
      status: 'Pending',
    });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  if (!user) return <p className="p-4">Please log in to view tasks.</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Tasks</h1>

      <form onSubmit={editTask ? handleUpdateTask : handleCreateTask} className="bg-white p-4 shadow-md rounded mb-6">
        <h2 className="text-lg font-semibold mb-3">{editTask ? 'Edit Task' : 'Create a New Task'}</h2>
        <input
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Title"
          className="w-full mb-2 p-2 border rounded"
          required
        />
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Description"
          className="w-full mb-2 p-2 border rounded"
          required
        />
        <input
          type="date"
          name="dueDate"
          value={formData.dueDate}
          onChange={handleChange}
          className="w-full mb-2 p-2 border rounded"
          required
        />
        <select name="priority" value={formData.priority} onChange={handleChange} className="w-full mb-2 p-2 border rounded">
          <option>Low</option>
          <option>Medium</option>
          <option>High</option>
        </select>
        <select name="status" value={formData.status} onChange={handleChange} className="w-full mb-4 p-2 border rounded">
          <option>Pending</option>
          <option>In Progress</option>
          <option>Completed</option>
        </select>

        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
          {editTask ? 'Update Task' : 'Create Task'}
        </button>
        {editTask && (
          <button
            type="button"
            onClick={resetForm}
            className="ml-2 bg-gray-500 text-white px-4 py-2 rounded"
          >
            Cancel
          </button>
        )}
      </form>

      <h2 className="text-lg font-semibold mb-3">Your Tasks</h2>
      <ul className="space-y-4">
        {tasks.map((task) => (
          <li key={task._id} className="bg-white p-4 shadow-md rounded flex justify-between">
            <div>
              <h3 className="text-xl font-bold">{task.title}</h3>
              <p>{task.description}</p>
              <p className="text-sm text-gray-500">Due: {task.dueDate?.split('T')[0]}</p>
              <p className="text-sm">Priority: {task.priority}</p>
              <p className="text-sm">Status: {task.status}</p>
            </div>
            <div className="flex flex-col justify-center gap-2">
              <button onClick={() => handleEditTask(task)} className="bg-green-600 text-white px-3 py-1 rounded">
                Edit
              </button>
              <button onClick={() => handleDeleteTask(task._id)} className="bg-red-600 text-white px-3 py-1 rounded">
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
