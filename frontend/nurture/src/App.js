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
import Home from './Home';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import DeepSeekChatPage from './pages/DeepSeekChatPage'; // ✅ Renamed properly

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<StartPage />} />
        <Route path="/home" element={<Home />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/add-child" element={<AddChildForm />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/ask-ai" element={<DeepSeekChatPage />} />

        {/* Child-specific routes */}
        <Route path="/child/:childId/dashboard" element={<ChildDashboard />} />
        {/* <Route path="/child/:childId/dashboard/hobby" element={<HobbyPredictor />} /> */}
        <Route path="/child/:childId/dashboard/ask-ai" element={<MentalHealthAssessment />} />
        <Route path="/child/:childId/dashboard/ask-ai" element={<MentalHealthAssessment />} />
        <Route path="/child/:childId/dashboard/mental-health" element={<MentalHealthAssessment />} />
        <Route path="/child/:childId/dashboard/physical-health" element={<PhysicalAssessment />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
