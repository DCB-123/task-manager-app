// pages/register.js
import { useState } from 'react';
import { useRouter } from 'next/router';
import api from '../utils/api';

export default function RegisterPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await api.post('/auth/register', { name: email.split('@')[0], email, password });
      alert('Registration successful');
      router.push('/login');
    } catch (err) {
      alert(err.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-500 to-purple-500">
      <form onSubmit={handleSubmit} className="bg-white p-16 shadow-xl rounded-lg w-1/4">
        <h2 className="text-5xl mb-12 font-semibold text-center text-indigo-700">Register</h2>
        <div className="mb-8">
          <input
            type="email"
            placeholder="Email"
            className="w-full p-6 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="mb-10">
          <input
            type="password"
            placeholder="Password"
            className="w-full p-6 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-6 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          Register
        </button>
      </form>
    </div>
  );
}
