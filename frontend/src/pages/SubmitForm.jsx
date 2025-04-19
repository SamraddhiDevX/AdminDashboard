import React, { useState } from 'react';
import { axiosIns } from '../lib/axios.js';
import { toast } from 'react-toastify';

export default function SubmitForm() {
  const [formData, setFormData] = useState({
    ngoId: '',
    month: '',
    peopleHelped: '',
    eventsConducted: '',
    fundsUtilized: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { ngoId, month, peopleHelped, eventsConducted, fundsUtilized } = formData;

    if (!ngoId || !month || !peopleHelped || !eventsConducted || !fundsUtilized) {
      toast.error('Please fill in all fields.');
      return;
    }

    try {
      await axiosIns.post('/form/report', {
        ...formData,
        peopleHelped: Number(peopleHelped),
        eventsConducted: Number(eventsConducted),
        fundsUtilized: Number(fundsUtilized),
      });

      toast.success('Report submitted successfully!');

      setFormData({
        ngoId: '',
        month: '',
        peopleHelped: '',
        eventsConducted: '',
        fundsUtilized: '',
      });
    } catch (err) {
      console.error(err);
      toast.error('Failed to submit. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-gray-50 p-6 rounded-2xl shadow-lg"
      >
        <h2 className="text-2xl font-semibold mb-6 text-center text-gray-700">Submit Monthly Report</h2>

        {[
          { label: 'NGO ID', name: 'ngoId', type: 'text' },
          { label: 'Month', name: 'month', type: 'month' },
          { label: 'People Helped', name: 'peopleHelped', type: 'number' },
          { label: 'Events Conducted', name: 'eventsConducted', type: 'number' },
          { label: 'Funds Utilized', name: 'fundsUtilized', type: 'number' },
        ].map(({ label, name, type }) => (
          <div className="mb-4" key={name}>
            <label className="block text-gray-700 mb-1">{label}</label>
            <input
              type={type}
              name={name}
              value={formData[name]}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>
        ))}

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-xl transition mt-4"
        >
          Submit Report
        </button>
      </form>
    </div>
  );
}
