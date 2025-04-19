import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { axiosIns } from '../lib/axios.js';
import { toast } from 'react-toastify';

export default function AdminLogin() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  // Check if user is already authenticated
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await axiosIns.get('/auth/check', {
          withCredentials: true,
        });
        if (res.status === 200) {
          navigate('/dashboard');
        }
      } catch (err) {
        // You can log it or show a toast; just don't crash the UI
        toast.info('Please login to continue');
      }
    };
    checkAuth();
  }, [navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(''); // reset previous error
    try {
      const res = await axiosIns.post(
        '/auth/login',
        { username, password },
        { withCredentials: true }
      );
      if (res.status === 200) {
        navigate('/dashboard');
      }
    } catch (err) {
      setError('Invalid username or password');
      toast.error('Login Failed');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20 p-6 border rounded shadow">
      <h2 className="text-2xl font-semibold mb-4 text-center">Admin Login</h2>
      <form onSubmit={handleLogin} className="space-y-4">
        <input
          type="text"
          placeholder="Username"
          className="w-full p-2 border rounded"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full p-2 border rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded">
          Login
        </button>
      </form>
    </div>
  );
}
