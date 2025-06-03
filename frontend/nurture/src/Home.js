import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="container-fluid p-0">
      {/* Hero Section */}
      <div className="bg-primary text-white text-center py-5">
        <h1 className="display-4">Welcome to Nurture AI</h1>
        <p className="lead">Empowering child development through intelligent analysis and personalized learning</p>
        <button className="btn btn-light mt-3" onClick={() => navigate('/login')}>Get Started</button>
      </div>

      {/* Features Section */}
      <div className="container my-5">
        <h2 className="text-center mb-4">Key Features</h2>
        <div className="row text-center">
          <div className="col-md-3">
            <div className="card h-100 shadow-sm">
              <div className="card-body">
                <h5 className="card-title">Behavior Analysis</h5>
                <p className="card-text">Analyze children's behavior patterns to understand emotional and mental growth.</p>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="card h-100 shadow-sm">
              <div className="card-body">
                <h5 className="card-title">Growth Quizzes</h5>
                <p className="card-text">Interactive quizzes to track mind development and cognitive abilities.</p>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="card h-100 shadow-sm">
              <div className="card-body">
                <h5 className="card-title">Homeschool Content</h5>
                <p className="card-text">Curated content for personalized learning at home, aligned with development goals.</p>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="card h-100 shadow-sm">
              <div className="card-body">
                <h5 className="card-title">Tutor Assignment</h5>
                <p className="card-text">Smart matching with verified tutors based on child's needs and interests.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-dark text-white text-center py-3 mt-5">
        <p className="mb-0">© 2025 Nurture AI. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Home;
