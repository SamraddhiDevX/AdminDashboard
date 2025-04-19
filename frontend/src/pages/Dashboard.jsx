import { useState, useEffect } from 'react';
import { axiosIns } from '../lib/axios.js';
import {
  PieChart, Pie, Cell, Tooltip, ResponsiveContainer
} from 'recharts';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Dashboard() {
  const [month, setMonth] = useState('2025-01'); // Default month
  const [data, setData] = useState(null);
  const [distributionData, setDistributionData] = useState({
    peopleHelped: [],
    eventsConducted: [],
    fundsUtilized: [],
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (month) {
      fetchDashboardData(month);
    }
  }, [month]);

  const fetchDashboardData = async (selectedMonth) => {
    setLoading(true);
    try {
      const res = await axiosIns.get(`/dashboard/data?month=${selectedMonth}`, {
        withCredentials: true,
      });
      setData(res.data.totals);
      setDistributionData(res.data.distribution);
    } catch (err) {
      console.error('Error fetching data:', err);
      toast.error('Failed to fetch dashboard data.');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await axiosIns.post('/auth/logout', {}, { withCredentials: true });
      toast.success('Logged out successfully');
      navigate('/');
    } catch (err) {
      console.error('Error logging out:', err);
      toast.error('Logout failed');
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 px-4">
      {/* Header with Logout */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Admin Dashboard</h2>
        <button
          onClick={handleLogout}
          className="p-2 bg-red-500 text-white rounded"
        >
          Logout
        </button>
      </div>

      {/* Month Selector */}
      <label className="block mb-2 text-gray-700">Select Month</label>
      <input
        type="month"
        className="border p-2 rounded mb-6"
        value={month}
        onChange={(e) => setMonth(e.target.value)}
      />

      {loading ? (
        <p>Loading...</p>
      ) : data ? (
        <>
          {/* Stats */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <StatCard label="NGOs Reporting" value={data.totalNGOs} />
            <StatCard label="People Helped" value={data.totalPeopleHelped} />
            <StatCard label="Events Conducted" value={data.totalEventsConducted} />
            <StatCard label="Funds Utilized" value={`₹${data.totalFundsUtilized}`} />
          </div>

          {/* Pie Charts */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <PieCard
              title="People Helped Distribution"
              data={distributionData.peopleHelped}
              colors={COLORS}
            />
            <PieCard
              title="Events Conducted Distribution"
              data={distributionData.eventsConducted}
              colors={COLORS}
            />
          </div>
        </>
      ) : (
        <p>Select a month to see data.</p>
      )}
    </div>
  );
}

function StatCard({ label, value }) {
  return (
    <div className="p-4 bg-white rounded shadow">
      <p className="text-gray-500 text-sm">{label}</p>
      <p className="text-xl font-bold">{value}</p>
    </div>
  );
}

function PieCard({ title, data, colors }) {
  return (
    <div className="bg-white p-4 shadow rounded">
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={100}
            label={({ name }) => `NGO ID: ${name}`}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

function CustomTooltip({ payload }) {
  if (!payload || payload.length === 0) return null;
  const { name, value } = payload[0];
  return (
    <div className="bg-white p-2 shadow rounded text-sm">
      <p><strong>NGO ID:</strong> {name}</p>
      <p><strong>Value:</strong> {value}</p>
    </div>
  );
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#FF3464'];
