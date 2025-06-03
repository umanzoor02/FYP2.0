// src/pages/ChildDashboardHome.js
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const ChildDashboard = () => {
  const navigate = useNavigate();
  const { childId } = useParams();

  const cardStyle = {
    cursor: 'pointer',
    transition: 'transform 0.2s',
  };

  const handleHover = (e, entering) => {
    e.currentTarget.style.transform = entering ? 'scale(1.02)' : 'scale(1)';
  };

  return (
    <div className="container py-4" style={{ backgroundColor: '#f3e8ff', minHeight: '100vh' }}>
      <h2 className="text-center mb-4">Child Dashboard</h2>
      <p className="text-center text-muted mb-5">Select a feature to explore:</p>

      <div className="row justify-content-center">
        {/* Hobby Card */}
        <div
          className="col-md-4 mb-4"
          onClick={() => navigate(`/child/${childId}/dashboard/hobby`)}
          onMouseEnter={(e) => handleHover(e, true)}
          onMouseLeave={(e) => handleHover(e, false)}
        >
          <div className="card text-white bg-primary h-100" style={cardStyle}>
            <div className="card-body">
              <h5 className="card-title">Predict Hobby</h5>
              <p className="card-text">Discover what hobbies suit your child based on personality and preferences.</p>
            </div>
          </div>
        </div>

        {/* Mental Health Card */}
        <div
          className="col-md-4 mb-4"
          onClick={() => navigate(`/child/${childId}/dashboard/mental-health`)}
          onMouseEnter={(e) => handleHover(e, true)}
          onMouseLeave={(e) => handleHover(e, false)}
        >
          <div className="card text-white bg-success h-100" style={cardStyle}>
            <div className="card-body">
              <h5 className="card-title">Assess Mental Health</h5>
              <p className="card-text">Analyze emotional well-being with interactive assessments.</p>
            </div>
          </div>
        </div>

        {/* Physical Health Card */}
        <div
          className="col-md-4 mb-4"
          onClick={() => navigate(`/child/${childId}/dashboard/physical-health`)}
          onMouseEnter={(e) => handleHover(e, true)}
          onMouseLeave={(e) => handleHover(e, false)}
        >
          <div className="card text-white bg-purple h-100" style={{ ...cardStyle, backgroundColor: '#9b59b6' }}>
            <div className="card-body">
              <h5 className="card-title">Assess Physical Condition</h5>
              <p className="card-text">Track fitness and physical development with simple tools.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChildDashboard;
