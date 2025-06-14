"use client"
import { useNavigate, useParams } from "react-router-dom"

const ChildDashboard = () => {
  const navigate = useNavigate()
  const { childId } = useParams()

  const dashboardFeatures = [
    {
      id: "hobby",
      title: "Discover Hobbies",
      description:
        "Help your child explore new interests and discover hobbies that match their unique personality and talents.",
      icon: "🎨",
      route: `/child/${childId}/dashboard/hobby`,
      gradientClass: "bg-gradient-purple-light",
      bgClass: "bg-purple-ultra-light",
    },
    {
      id: "mental-health",
      title: "Mental Wellness",
      description:
        "Support your child's emotional well-being with age-appropriate assessments and mindfulness activities.",
      icon: "🧠",
      route: `/child/${childId}/dashboard/mental-health`,
      gradientClass: "bg-gradient-purple-medium",
      bgClass: "bg-purple-light",
    },
    {
      id: "physical-health",
      title: "Physical Development",
      description: "Track your child's physical growth and encourage healthy habits through fun activities and games.",
      icon: "💪",
      route: `/child/${childId}/dashboard/physical-health`,
      gradientClass: "bg-gradient-purple-dark",
      bgClass: "bg-purple-medium-light",
    },
  ]

  return (
    <>
      {/* Bootstrap CSS */}
      <link
        href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css"
        rel="stylesheet"
        integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN"
        crossOrigin="anonymous"
      />

      {/* Purple Theme Styles */}
      <style jsx>{`
        .bg-gradient-main {
          background: linear-gradient(135deg, #faf5ff 0%, #f3e8ff 50%, #e9d5ff 100%);
        }
        .gradient-text {
          background: linear-gradient(135deg, #a855f7, #8b5cf6, #7c3aed);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .bg-gradient-purple-light {
          background: linear-gradient(135deg, #c084fc, #a855f7);
        }
        .bg-gradient-purple-medium {
          background: linear-gradient(135deg, #8b5cf6, #7c3aed);
        }
        .bg-gradient-purple-dark {
          background: linear-gradient(135deg, #7c3aed, #6b21a8);
        }
        .bg-purple-ultra-light {
          background-color: rgba(196, 132, 252, 0.1);
        }
        .bg-purple-light {
          background-color: rgba(139, 92, 246, 0.1);
        }
        .bg-purple-medium-light {
          background-color: rgba(124, 58, 237, 0.1);
        }
        .feature-card {
          transition: all 0.3s ease;
          border: 1px solid rgba(139, 92, 246, 0.1);
          background: rgba(255, 255, 255, 0.9);
          backdrop-filter: blur(10px);
          cursor: pointer;
          overflow: hidden;
          position: relative;
        }
        .feature-card:hover {
          transform: translateY(-10px);
          box-shadow: 0 20px 40px rgba(139, 92, 246, 0.2);
          border-color: rgba(139, 92, 246, 0.3);
        }
        .feature-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 4px;
          background: linear-gradient(135deg, #8b5cf6, #7c3aed);
          transform: scaleX(0);
          transition: transform 0.3s ease;
        }
        .feature-card:hover::before {
          transform: scaleX(1);
        }
        .feature-icon {
          width: 80px;
          height: 80px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 2rem;
          color: white;
          margin: 0 auto 1.5rem;
          position: relative;
          overflow: hidden;
        }
        .feature-icon::after {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(255, 255, 255, 0.1);
          border-radius: 50%;
          transform: scale(0);
          transition: transform 0.3s ease;
        }
        .feature-card:hover .feature-icon::after {
          transform: scale(1);
        }
        .text-purple-dark {
          color: #7c3aed;
        }
        .welcome-badge {
          background: rgba(139, 92, 246, 0.1);
          color: #7c3aed;
          border: 1px solid rgba(139, 92, 246, 0.2);
        }
        .hero-bg {
          background: radial-gradient(circle at 30% 20%, rgba(168, 85, 247, 0.15) 0%, transparent 50%),
                      radial-gradient(circle at 70% 80%, rgba(124, 58, 237, 0.15) 0%, transparent 50%);
        }
        .btn-gradient {
          background: linear-gradient(135deg, #8b5cf6, #7c3aed);
          border: none;
          color: white;
          box-shadow: 0 4px 15px rgba(139, 92, 246, 0.3);
        }
        .btn-gradient:hover {
          background: linear-gradient(135deg, #7c3aed, #6b21a8);
          color: white;
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(139, 92, 246, 0.4);
        }
        .stats-card {
          background: rgba(255, 255, 255, 0.8);
          border: 1px solid rgba(139, 92, 246, 0.1);
          border-radius: 16px;
          padding: 1.5rem;
          text-align: center;
          transition: all 0.3s ease;
        }
        .stats-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 30px rgba(139, 92, 246, 0.15);
        }
        .stats-number {
          font-size: 2rem;
          font-weight: 800;
          color: #7c3aed;
        }
        @media (max-width: 768px) {
          .feature-icon {
            width: 60px;
            height: 60px;
            font-size: 1.5rem;
          }
        }
      `}</style>

      <div className="bg-gradient-main min-vh-100">
        {/* Header Section */}
        <div className="hero-bg position-relative overflow-hidden">
          <div className="container py-5">
            <div className="row justify-content-center text-center">
              <div className="col-lg-8">
                <span className="badge welcome-badge px-3 py-2 mb-3 fs-6 fw-medium">Child Development Hub</span>

                <h1 className="display-4 fw-bold mb-3">
                  <span className="gradient-text">Child Dashboard</span>
                </h1>

                <p className="lead fs-5 text-muted mb-4">
                  Nurture your child's growth with personalized tools and insights designed to support their unique
                  journey
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="container py-4">
          <div className="row g-3">
            <div className="col-md-4">
              <div className="stats-card">
                <div className="stats-number">3</div>
                <div className="text-muted small">Development Areas</div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="stats-card">
                <div className="stats-number">24/7</div>
                <div className="text-muted small">Support Available</div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="stats-card">
                <div className="stats-number">100%</div>
                <div className="text-muted small">Child-Focused</div>
              </div>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="container py-5">
          <div className="row justify-content-center text-center mb-5">
            <div className="col-lg-8">
              <h2 className="display-6 fw-bold mb-3 text-purple-dark">Choose Your Path</h2>
              <p className="lead text-muted">Select a development area to begin nurturing your child's potential</p>
            </div>
          </div>

          <div className="row g-4 justify-content-center">
            {dashboardFeatures.map((feature, index) => (
              <div key={feature.id} className="col-lg-4 col-md-6">
                <div className="card feature-card h-100 border-0" onClick={() => navigate(feature.route)}>
                  <div className="card-body p-4 text-center">
                    <div className={`feature-icon ${feature.gradientClass} mb-3`}>{feature.icon}</div>

                    <h4 className="card-title fw-bold mb-3 text-purple-dark">{feature.title}</h4>

                    <p className="card-text text-muted mb-4 lh-base">{feature.description}</p>

                    <button className="btn btn-gradient fw-semibold px-4">Get Started →</button>
                  </div>

                  <div className={`${feature.bgClass} p-3`}>
                    <div className="d-flex align-items-center justify-content-center">
                      <small className="text-muted fw-medium">Click to explore this area</small>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Encouragement Section */}
        <div className="container py-5">
          <div className="row justify-content-center">
            <div className="col-lg-8 text-center">
              <div
                className="bg-white rounded-4 p-5 shadow"
                style={{
                  border: "1px solid rgba(139, 92, 246, 0.1)",
                  background: "rgba(255, 255, 255, 0.9)",
                  backdropFilter: "blur(10px)",
                }}
              >
                <div className="mb-3">
                  <span style={{ fontSize: "2.5rem" }}>🌟</span>
                </div>
                <h3 className="fw-bold mb-3 text-purple-dark">Every Child is Unique</h3>
                <p className="lead text-muted mb-4">
                  Our tools are designed to celebrate your child's individual strengths and support their personal
                  growth journey.
                </p>
                <div className="d-flex justify-content-center gap-3 flex-wrap">
                  <span className="badge bg-light text-purple-dark px-3 py-2">Personalized</span>
                  <span className="badge bg-light text-purple-dark px-3 py-2">Age-Appropriate</span>
                  <span className="badge bg-light text-purple-dark px-3 py-2">Fun & Engaging</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="container pb-5">
          <div className="row justify-content-center text-center">
            <div className="col-lg-6">
              <h3 className="fw-bold mb-3 text-purple-dark">Ready to Begin?</h3>
              <p className="text-muted mb-4">Choose any area above to start your child's development journey today.</p>
              <button
                className="btn btn-gradient btn-lg px-4 py-3 fw-semibold"
                onClick={() => navigate(dashboardFeatures[0].route)}
              >
                Start with Hobby Discovery
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bootstrap JS */}
      <script
        src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"
        integrity="sha384-C6RzsynM9kWDrMNeT87bh95OGNyZPhcTNXj1NW7RuBCsyN/o0jlpcV8Qyq46cDfL"
        crossOrigin="anonymous"
      ></script>
    </>
  )
}

export default ChildDashboard
