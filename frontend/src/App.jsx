import React from 'react';
import { useNavigate } from 'react-router-dom';

function App() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center p-6">
      <h1 className="text-4xl font-bold mb-8 text-center text-gray-800">NGO Reporting Portal</h1>

      <div className="space-y-4 w-full max-w-xs">
        <button
          onClick={() => navigate('/submit')}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-2xl text-lg shadow-lg transition"
        >
          Submit Report
        </button>
        <button
          onClick={() => navigate('/admin')}
          className="w-full bg-gray-800 hover:bg-gray-900 text-white py-3 px-6 rounded-2xl text-lg shadow-lg transition"
        >
          Admin Login
        </button>
      </div>
    </div>
  );
}

export default App;
