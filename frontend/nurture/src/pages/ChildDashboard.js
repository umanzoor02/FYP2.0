// src/pages/ChildDashboardHome.js
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const ChildDashboard = () => {
  const navigate = useNavigate();
  const { childId } = useParams();

  return (
    <div className="p-4">
      <h2 className="text-xl mb-4">Child Dashboard</h2>
      <p className="mb-6 text-gray-600">Select a feature to explore:</p>

      <button onClick={() => navigate(`/child/${childId}/dashboard/hobby`)} className="block mb-3 p-3 bg-blue-600 text-white rounded">
        Predict Hobby
      </button>

      <button onClick={() => navigate(`/child/${childId}/dashboard/mental-health`)} className="block mb-3 p-3 bg-green-600 text-white rounded">
        Assess Mental Health Condition
      </button>

      <button onClick={() => navigate(`/child/${childId}/dashboard/physical-health`)} className="block mb-3 p-3 bg-purple-600 text-white rounded">
        Assess Physical Condition
      </button>
    </div>
  );
};

export default ChildDashboard;
