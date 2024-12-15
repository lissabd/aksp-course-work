import React from 'react';
import ReactDOM from 'react-dom/client';


import { Routes, Route, BrowserRouter } from 'react-router-dom';
import LoginPage from './pages/LoginPage/LoginPage';
import Register from './pages/RegisterPage/RegisterPage';

import { CssBaseline } from '@mui/material';
import UserDashboard from './pages/UserDashboard/UserDashboard';
import TestsList from './pages/TestsListPage/TestListPage';
import TestPage from './pages/TestPage/TestPage';
import TestResults from './pages/TestResultsPage/TestResultsPage';
import AdminDashboard from './pages/AdminDashboard/AdminDashboard';
import CreateTestPage from './pages/AdminDashboard/CreateTest/CreateTest';

const enableMocking = async() => {
  const {worker} = await import('./mocks/browser');
  return worker.start();
} 


enableMocking().then(() => {
  const rootElement = document.getElementById('root');
  if (rootElement) {
    const root = ReactDOM.createRoot(rootElement);
    root.render( <React.StrictMode>
      <CssBaseline />
      <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<UserDashboard />} />
        <Route path="/tests" element={<TestsList />} />
        <Route path="/test/:id" element={<TestPage />} />
        <Route path="/test/results/:id" element={<TestResults />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/create-test" element={<CreateTestPage />} />
      </Routes>
      </BrowserRouter>
    </React.StrictMode>);
  } else {
    console.error('Element with id "root" not found');
  }
})
.catch((error) => {
  console.log('Enable mocks', error);
});





