"use client"

import { useState, useEffect } from "react"

const StartPage = () => {
  const [currentSlide, setCurrentSlide] = useState(0)

  const slides = [
    {
      id: 1,
      title: "Connect with Fellow Caregivers",
      description:
        "Join a supportive community of nurturers who understand your journey. Share experiences, find encouragement, and build lasting friendships with people who care just like you do.",
      icon: "🤝",
      gradientClass: "bg-gradient-purple-light",
      bgClass: "bg-purple-ultra-light",
    },
    {
      id: 2,
      title: "Access Mental Health Resources",
      description:
        "Take care of your own well-being with our curated collection of mental health tools, guided meditations, stress management techniques, and professional counseling resources.",
      icon: "🧠",
      gradientClass: "bg-gradient-purple-medium",
      bgClass: "bg-purple-light",
    },
    {
      id: 3,
      title: "Track Your Caregiving Journey",
      description:
        "Monitor your progress, set personal goals, and celebrate your achievements as a caregiver. Keep a journal of your experiences and watch yourself grow stronger every day.",
      icon: "📈",
      gradientClass: "bg-gradient-purple-dark",
      bgClass: "bg-purple-medium-light",
    },
  ]

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [slides.length])

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
  }

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
        .gradient-text-alt {
          background: linear-gradient(135deg, #7c3aed, #8b5cf6, #a855f7);
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
        .btn-outline-purple {
          border: 2px solid #8b5cf6;
          color: #8b5cf6;
          background: transparent;
        }
        .btn-outline-purple:hover {
          background: #8b5cf6;
          color: white;
          transform: translateY(-2px);
          box-shadow: 0 4px 15px rgba(139, 92, 246, 0.3);
        }
        .hero-bg {
          background: radial-gradient(circle at 30% 20%, rgba(168, 85, 247, 0.15) 0%, transparent 50%),
                      radial-gradient(circle at 70% 80%, rgba(124, 58, 237, 0.15) 0%, transparent 50%);
        }
        .slide-transition {
          transition: transform 0.5s ease-in-out;
        }
        .slide-indicator {
          width: 12px;
          height: 12px;
          border-radius: 50%;
          border: none;
          background-color: #e9d5ff;
          transition: all 0.3s ease;
        }
        .slide-indicator.active {
          background: linear-gradient(135deg, #8b5cf6, #7c3aed);
          transform: scale(1.2);
        }
        .slider-btn {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          z-index: 10;
          width: 50px;
          height: 50px;
          border-radius: 50%;
          border: none;
          background: white;
          box-shadow: 0 4px 15px rgba(139, 92, 246, 0.2);
          font-size: 1.5rem;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s ease;
          color: #8b5cf6;
        }
        .slider-btn:hover {
          background: #faf5ff;
          transform: translateY(-50%) scale(1.1);
          box-shadow: 0 6px 20px rgba(139, 92, 246, 0.3);
        }
        .slider-btn.prev {
          left: 20px;
        }
        .slider-btn.next {
          right: 20px;
        }
        .welcome-badge {
          background: rgba(139, 92, 246, 0.1);
          color: #7c3aed;
          border: 1px solid rgba(139, 92, 246, 0.2);
        }
        .text-purple {
          color: #8b5cf6;
        }
        .text-purple-dark {
          color: #7c3aed;
        }
        .text-purple-light {
          color: #a855f7;
        }
        .card-purple {
          border: 1px solid rgba(139, 92, 246, 0.1);
          background: rgba(255, 255, 255, 0.9);
          backdrop-filter: blur(10px);
        }
        .shadow-purple {
          box-shadow: 0 10px 40px rgba(139, 92, 246, 0.15);
        }
        .stats-section {
          background: rgba(139, 92, 246, 0.05);
          border-radius: 20px;
          padding: 3rem 2rem;
          margin: 2rem 0;
        }
        .stat-number {
          font-size: 3rem;
          font-weight: 800;
          color: #7c3aed;
        }
        .stat-label {
          color: #64748b;
          font-weight: 500;
        }
        @media (max-width: 768px) {
          .slider-btn.prev {
            left: 10px;
          }
          .slider-btn.next {
            right: 10px;
          }
          .stat-number {
            font-size: 2rem;
          }
        }
      `}</style>

      <div className="bg-gradient-main min-vh-100">
        {/* Hero Section */}
        <div className="hero-bg position-relative overflow-hidden">
          <div className="container py-5">
            <div className="row justify-content-center text-center py-5">
              <div className="col-lg-8">
                <span className="badge welcome-badge px-3 py-2 mb-4 fs-6 fw-medium">
                  Supporting Caregivers Everywhere
                </span>

                <h1 className="display-1 fw-bold mb-4 lh-1">
                  <span className="gradient-text">NURTURING THE</span>
                  <br />
                  <span className="gradient-text-alt">NURTURERS</span>
                </h1>

                <p className="lead fs-4 text-muted mb-5 mx-auto" style={{ maxWidth: "700px" }}>
                  You dedicate your life to caring for others. Now it's time to care for yourself. Join our community of
                  caregivers who support each other through every challenge and celebrate every victory together.
                </p>

                <div className="d-flex flex-column flex-sm-row gap-3 justify-content-center">
                  <button className="btn btn-gradient btn-lg px-4 py-3 fs-5 fw-semibold">Join Our Community →</button>
                  <button className="btn btn-outline-purple btn-lg px-4 py-3 fs-5 fw-semibold">
                    Learn How It Works
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="container py-4">
          <div className="stats-section">
            <div className="row text-center">
              <div className="col-md-4 mb-4 mb-md-0">
                <div className="stat-number">15K+</div>
                <div className="stat-label">Active Caregivers</div>
              </div>
              <div className="col-md-4 mb-4 mb-md-0">
                <div className="stat-number">24/7</div>
                <div className="stat-label">Community Support</div>
              </div>
              <div className="col-md-4">
                <div className="stat-number">98%</div>
                <div className="stat-label">Feel Less Alone</div>
              </div>
            </div>
          </div>
        </div>

        {/* Slider Section */}
        <div className="container py-5">
          <div className="row justify-content-center text-center mb-5">
            <div className="col-lg-8">
              <h2 className="display-4 fw-bold mb-4 text-purple-dark">How We Support You</h2>
              <p className="lead fs-5 text-muted">
                Discover the tools and community that will help you thrive as a caregiver while taking care of your own
                well-being
              </p>
            </div>
          </div>

          <div className="row justify-content-center">
            <div className="col-lg-10">
              <div className="card border-0 shadow-purple rounded-4 overflow-hidden position-relative card-purple">
                <div className="position-relative overflow-hidden">
                  <div className="d-flex slide-transition" style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
                    {slides.map((slide, index) => (
                      <div key={slide.id} className="w-100 flex-shrink-0">
                        <div className="row g-0" style={{ minHeight: "400px" }}>
                          <div className="col-lg-6 d-flex align-items-center">
                            <div className="p-4 p-lg-5">
                              <div
                                className={`${slide.gradientClass} rounded-circle d-inline-flex align-items-center justify-content-center mb-4 text-white`}
                                style={{ width: "60px", height: "60px", fontSize: "1.5rem" }}
                              >
                                {slide.icon}
                              </div>

                              <h3 className="display-6 fw-bold mb-3 text-purple-dark">{slide.title}</h3>
                              <p className="lead text-muted mb-4">{slide.description}</p>
                              <button className="btn btn-gradient fw-semibold">Get Started →</button>
                            </div>
                          </div>

                          <div className={`col-lg-6 ${slide.bgClass} d-flex align-items-center justify-content-center`}>
                            <div
                              className="bg-white rounded-4 shadow d-flex align-items-center justify-content-center"
                              style={{
                                width: "200px",
                                height: "200px",
                                fontSize: "4rem",
                                boxShadow: "0 10px 30px rgba(139, 92, 246, 0.1)",
                              }}
                            >
                              <span style={{ opacity: "0.7" }}>{slide.icon}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <button className="slider-btn prev" onClick={prevSlide}>
                  ‹
                </button>
                <button className="slider-btn next" onClick={nextSlide}>
                  ›
                </button>
              </div>

              {/* Slide Indicators */}
              <div className="d-flex justify-content-center gap-2 mt-4">
                {slides.map((_, index) => (
                  <button
                    key={index}
                    className={`slide-indicator ${index === currentSlide ? "active" : ""}`}
                    onClick={() => setCurrentSlide(index)}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Testimonial Section */}
        <div className="container py-5">
          <div className="row justify-content-center">
            <div className="col-lg-8 text-center">
              <div className="bg-white rounded-4 shadow-purple p-5 card-purple">
                <div className="mb-4">
                  <span className="text-purple" style={{ fontSize: "3rem" }}>
                    💜
                  </span>
                </div>
                <blockquote className="blockquote mb-4">
                  <p className="lead fst-italic">
                    "Nurture App helped me realize I wasn't alone in my caregiving journey. The community support and
                    resources have been life-changing. I finally learned how to take care of myself while caring for my
                    loved one."
                  </p>
                </blockquote>
                <footer className="blockquote-footer">
                  <cite title="Source Title">Sarah M., Family Caregiver for 3 years</cite>
                </footer>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="container py-5">
          <div className="row justify-content-center text-center">
            <div className="col-lg-6">
              <h2 className="display-5 fw-bold mb-4 text-purple-dark">You Don't Have to Do This Alone</h2>
              <p className="lead text-muted mb-4">
                Join thousands of caregivers who have found strength, support, and hope in our community. Your journey
                matters, and so do you.
              </p>
              <button className="btn btn-gradient btn-lg px-4 py-3 fs-5 fw-semibold mb-3">
                Start Your Journey Today
              </button>
              <div className="text-muted small">Free to join • No credit card required • Instant access</div>
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

export default StartPage
