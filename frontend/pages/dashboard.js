import { useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useRouter } from 'next/router';

export default function DashboardPage() {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push('/login');
    }
  }, [user]);

  if (!user) return null; // optional loading state

  // Handle Add New Task Button click
  const handleAddTaskClick = () => {
    router.push('/add-task'); // Navigate to the add task page
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-500 via-purple-600 to-pink-600 text-white">
      <div className="max-w-4xl mx-auto p-8">
        {/* Dashboard Header */}
        <div className="bg-white p-6 rounded-lg shadow-lg mb-8">
          <h1 className="text-3xl font-semibold text-indigo-800">Welcome, {user.email}!</h1>
          <p className="text-lg text-gray-700 mt-2">This is your dashboard.</p>
        </div>

        {/* Quick Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-lg hover:bg-indigo-50">
            <h2 className="text-xl font-semibold text-indigo-700">Tasks Overview</h2>
            <p className="text-gray-600">You have 5 tasks pending.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg hover:bg-indigo-50">
            <h2 className="text-xl font-semibold text-indigo-700">Team Collaboration</h2>
            <p className="text-gray-600">3 team members are online.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg hover:bg-indigo-50">
            <h2 className="text-xl font-semibold text-indigo-700">Recent Activity</h2>
            <p className="text-gray-600">You added a new task 2 hours ago.</p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-8 flex space-x-4">
          <button
            className="bg-indigo-600 text-white py-3 px-6 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            onClick={handleAddTaskClick} // Trigger function to navigate
          >
            Add New Task
          </button>
          <button className="bg-purple-600 text-white py-3 px-6 rounded-lg hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500">
            View My Tasks
          </button>
        </div>
      </div>
    </div>
  );
}
