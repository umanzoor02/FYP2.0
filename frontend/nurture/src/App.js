// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import StartPage from './pages/StartPage';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import Dashboard from './pages/Dashboard';
import AddChildForm from './components/AddChildForm';
import Logout from './components/Logout';
import ChildDashboard from './pages/ChildDashboard';
import HobbyPredictor from './pages/HobbyPredictor';
import MentalHealthAssessment from './pages/MentalHealthAssessment';
import PhysicalAssessment from './pages/PhysicalAssessment';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<StartPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/add-child" element={<AddChildForm />} />
        <Route path="/logout" element={<Logout />} />

        {/* Old dashboard with all features (if still needed) */}
        <Route path="/child/:childId" element={<ChildDashboard />} />

        {/* New structured child dashboard */}
        <Route path="/child/:childId/dashboard" element={<ChildDashboard />} />
        <Route path="/child/:childId/dashboard/hobby" element={<HobbyPredictor />} />
        <Route path="/child/:childId/dashboard/mental-health" element={<MentalHealthAssessment />} />
        <Route path="/child/:childId/dashboard/physical-health" element={<PhysicalAssessment />} />
      </Routes>
    </Router>
  );
}

export default App;
