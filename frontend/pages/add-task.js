import { useState } from 'react';
import { useRouter } from 'next/router';
import api from '../utils/api';

export default function AddTaskPage() {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await api.post('/tasks', { title, description, dueDate });
      alert('Task added successfully');
      router.push('/dashboard');
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to add task');
    }
  };

  return (
    <div className="min-h-screen flex items-start justify-center bg-gradient-to-r from-indigo-500 via-purple-600 to-pink-600 py-16 px-4">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-semibold text-center mb-4 text-gray-800">Add New Task</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="title" className="block text-gray-800 font-semibold">Task Title</label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={e => setTitle(e.target.value)}
              required
              className="w-full p-2 border rounded mt-2 text-black"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="description" className="block text-gray-800 font-semibold">Description</label>
            <textarea
              id="description"
              value={description}
              onChange={e => setDescription(e.target.value)}
              required
              className="w-full p-2 border rounded mt-2 text-black"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="dueDate" className="block text-gray-800 font-semibold">Due Date</label>
            <input
              type="date"
              id="dueDate"
              value={dueDate}
              onChange={e => setDueDate(e.target.value)}
              required
              className="w-full p-2 border rounded mt-2 text-black"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700"
          >
            Add Task
          </button>
        </form>
      </div>
    </div>
  );
}
