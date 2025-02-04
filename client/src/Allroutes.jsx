import React from 'react'
import {
  Routes,
  Route,
  Navigate
} from 'react-router-dom'


import FAQ from './components/FAQ'
import DashboardCombined from './components/admin/dashboard/DashboardCombined'
import AddFaq from './components/AddFaq'
import UpdateFaQ from './components/admin/UpdateFaQ'
import Login from './components/auth/Login'
import Signup from './components/auth/Signup'

const Allroutes = () => {

  const isAuthenticated = () => {
    // Replace this with your actual authentication logic
    return localStorage.getItem('Profile') !== null;
  };

  const ProtectedRoute = ({ element }) => {
    return isAuthenticated() ? element : <Navigate to="/login" />;
  };

  return (
    <Routes>
      <Route path="/" element={<FAQ />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />

      {/* Protected Route Starts */}
      <Route path="/add-faq" element={<ProtectedRoute element={<AddFaq />} />} />
      <Route path="/admin" element={<ProtectedRoute element={<DashboardCombined />} />} />
      <Route path='/update-faq/:id' element={<ProtectedRoute element={<UpdateFaQ />} />} />
      {/* Protected Route Ends  */}

    </Routes>
  );
}

export default Allroutes
