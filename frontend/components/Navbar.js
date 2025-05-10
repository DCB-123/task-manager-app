// components/Navbar.js
import Link from 'next/link';
import { useAuth } from '../contexts/AuthContext';

export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <nav className="bg-gray-800 p-4 text-white flex justify-between items-center">
      <div className="text-xl font-semibold">
        <Link href="/">TaskManager</Link>
      </div>
      <div className="space-x-4">
        {user ? (
          <>
            <Link href="/dashboard">Dashboard</Link>
            <Link href="/tasks">Tasks</Link>
            <button onClick={logout} className="bg-red-500 px-3 py-1 rounded">
              Logout
            </button>
          </>
        ) : (
          <>
            <Link href="/login">Login</Link>
            <Link href="/register">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
}
