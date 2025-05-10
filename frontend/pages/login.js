// pages/login.js
import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import api from '../utils/api';

export default function LoginPage() {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const res = await api.post('/auth/login', { email, password });
      const user = res.data;
      const token = 'fake'; // Placeholder token, if your backend uses cookies
      login(user, token);
    } catch (err) {
      alert(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-500 to-purple-500">
      <form onSubmit={handleSubmit} className="bg-white p-12 shadow-xl rounded-lg w-1/3">
        <h2 className="text-4xl mb-8 font-semibold text-center text-indigo-700">Login</h2>
        <div className="mb-6">
          <input
            type="email"
            placeholder="Email"
            className="w-full p-5 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="mb-8">
          <input
            type="password"
            placeholder="Password"
            className="w-full p-5 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-4 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          Login
        </button>
      </form>
    </div>
  );
}
