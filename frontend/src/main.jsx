import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SubmitForm from './pages/SubmitForm.jsx';
import AdminLogin from './pages/AdminLogin.jsx';
import Dashboard from './pages/Dashboard';
import { ToastContainer } from 'react-toastify';

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
  <>
    <ToastContainer position="top-right" autoClose={3000} />
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/submit" element={<SubmitForm />} />
      <Route path="/admin" element={<AdminLogin />} />
      <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
    </>
  </BrowserRouter>
);
