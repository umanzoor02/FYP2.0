"use client"
import { useState } from "react"
import axios from "axios"

const HobbyPredictor = () => {
  const token = localStorage.getItem("jwtToken")

  const [hobbyInputs, setHobbyInputs] = useState({
    Olympiad_Participation: "",
    Scholarship: "",
    School: "",
    Fav_sub: "",
    Projects: "",
    Grasp_pow: "",
    Time_sprt: "",
    Medals: "",
    Career_sprt: "",
    Act_sprt: "",
    Fant_arts: "",
    Won_arts: "",
    Time_art: "",
  })

  const [hobbyResult, setHobbyResult] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [currentStep, setCurrentStep] = useState(1)

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setHobbyInputs((prev) => ({ ...prev, [name]: value }))
  }

  const handleHobbySubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)

    const formattedInputs = {
      ...hobbyInputs,
      Olympiad_Participation: hobbyInputs.Olympiad_Participation.toLowerCase() === "yes" ? 1 : 0,
      Scholarship: hobbyInputs.Scholarship.toLowerCase() === "yes" ? 1 : 0,
      School: hobbyInputs.School.toLowerCase() === "yes" ? 1 : 0,
      Projects: hobbyInputs.Projects.toLowerCase() === "yes" ? 1 : 0,
      Medals: hobbyInputs.Medals.toLowerCase() === "yes" ? 1 : 0,
      Career_sprt: hobbyInputs.Career_sprt.toLowerCase() === "yes" ? 1 : 0,
      Act_sprt: hobbyInputs.Act_sprt.toLowerCase() === "yes" ? 1 : 0,
      Fant_arts: hobbyInputs.Fant_arts.toLowerCase() === "yes" ? 1 : 0,
      Won_arts: hobbyInputs.Won_arts.toLowerCase() === "yes" ? 1 : 0,
      Grasp_pow: hobbyInputs.Grasp_pow,
      Time_sprt: hobbyInputs.Time_sprt,
      Time_art: hobbyInputs.Time_art,
      Fav_sub: hobbyInputs.Fav_sub,
    }

    try {
      const response = await axios.post("http://127.0.0.1:8000/edu/predict/", formattedInputs, {
        headers: { Authorization: `Bearer ${token}` },
      })
      setHobbyResult(response.data.predicted_hobby)
    } catch (error) {
      console.error("Hobby prediction failed:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const formSections = [
    {
      title: "Academic Interests",
      icon: "📚",
      fields: [
        {
          name: "Olympiad_Participation",
          label: "Has your child participated in any Science/Maths Olympiad?",
          type: "select",
          options: ["Yes", "No"],
        },
        {
          name: "Scholarship",
          label: "Has your child received any academic scholarships?",
          type: "select",
          options: ["Yes", "No"],
        },
        { name: "School", label: "Does your child love going to school?", type: "select", options: ["Yes", "No"] },
        {
          name: "Fav_sub",
          label: "What is your child's favorite subject?",
          type: "select",
          options: ["Math", "Science", "English", "History", "Art", "Music", "Physical Education"],
        },
        {
          name: "Projects",
          label: "Has your child done any academic projects before?",
          type: "select",
          options: ["Yes", "No"],
        },
        {
          name: "Grasp_pow",
          label: "How would you rate your child's grasping power?",
          type: "select",
          options: ["1 - Very Slow", "2 - Slow", "3 - Average", "4 - Good", "5 - Very Good", "6 - Excellent"],
        },
      ],
    },
    {
      title: "Sports & Physical Activities",
      icon: "⚽",
      fields: [
        {
          name: "Time_sprt",
          label: "How many hours per week does your child spend on sports/games?",
          type: "number",
          placeholder: "Enter hours (0-20)",
        },
        { name: "Medals", label: "Has your child won any medals in sports?", type: "select", options: ["Yes", "No"] },
        {
          name: "Career_sprt",
          label: "Does your child want to pursue a career in sports?",
          type: "select",
          options: ["Yes", "No"],
        },
        {
          name: "Act_sprt",
          label: "Is your child regular in sports activities?",
          type: "select",
          options: ["Yes", "No"],
        },
      ],
    },
    {
      title: "Arts & Creativity",
      icon: "🎨",
      fields: [
        {
          name: "Fant_arts",
          label: "Does your child love creating fantasy paintings or artwork?",
          type: "select",
          options: ["Yes", "No"],
        },
        { name: "Won_arts", label: "Has your child won any art competitions?", type: "select", options: ["Yes", "No"] },
        {
          name: "Time_art",
          label: "How many hours per week does your child spend on arts?",
          type: "number",
          placeholder: "Enter hours (0-20)",
        },
      ],
    },
  ]

  const renderField = (field) => {
    if (field.type === "select") {
      return (
        <select
          name={field.name}
          value={hobbyInputs[field.name]}
          onChange={handleInputChange}
          className="form-select form-select-lg"
          required
        >
          <option value="">Choose an option...</option>
          {field.options.map((option) => (
            <option key={option} value={option.includes("-") ? option.split(" - ")[0] : option}>
              {option}
            </option>
          ))}
        </select>
      )
    } else {
      return (
        <input
          type={field.type}
          name={field.name}
          value={hobbyInputs[field.name]}
          onChange={handleInputChange}
          className="form-control form-control-lg"
          placeholder={field.placeholder}
          min="0"
          max="20"
          required
        />
      )
    }
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
        }
        .form-section {
          background: rgba(255, 255, 255, 0.9);
          border: 1px solid rgba(139, 92, 246, 0.1);
          border-radius: 20px;
          padding: 2rem;
          margin-bottom: 2rem;
          backdrop-filter: blur(10px);
          transition: all 0.3s ease;
        }
        .form-section:hover {
          box-shadow: 0 10px 30px rgba(139, 92, 246, 0.15);
          transform: translateY(-2px);
        }
        .section-icon {
          width: 60px;
          height: 60px;
          background: linear-gradient(135deg, #8b5cf6, #7c3aed);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.5rem;
          color: white;
          margin: 0 auto 1rem;
        }
        .form-control, .form-select {
          border: 2px solid #e9d5ff;
          border-radius: 12px;
          padding: 0.75rem 1rem;
          transition: all 0.3s ease;
        }
        .form-control:focus, .form-select:focus {
          border-color: #8b5cf6;
          box-shadow: 0 0 0 0.2rem rgba(139, 92, 246, 0.25);
        }
        .progress-bar-custom {
          background: linear-gradient(135deg, #8b5cf6, #7c3aed);
          border-radius: 10px;
        }
        .result-card {
          background: linear-gradient(135deg, #8b5cf6, #7c3aed);
          color: white;
          border-radius: 20px;
          padding: 2rem;
          text-align: center;
          box-shadow: 0 15px 35px rgba(139, 92, 246, 0.3);
          animation: slideUp 0.5s ease-out;
        }
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .loading-spinner {
          border: 3px solid rgba(139, 92, 246, 0.3);
          border-top: 3px solid #8b5cf6;
          border-radius: 50%;
          width: 40px;
          height: 40px;
          animation: spin 1s linear infinite;
          margin: 0 auto;
        }
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        .text-purple-dark {
          color: #7c3aed;
        }
        .welcome-badge {
          background: rgba(139, 92, 246, 0.1);
          color: #7c3aed;
          border: 1px solid rgba(139, 92, 246, 0.2);
        }
      `}</style>

      <div className="bg-gradient-main min-vh-100">
        <div className="container py-5">
          {/* Header */}
          <div className="row justify-content-center text-center mb-5">
            <div className="col-lg-8">
              <span className="badge welcome-badge px-3 py-2 mb-3 fs-6 fw-medium">AI-Powered Discovery</span>
              <h1 className="display-4 fw-bold mb-3">
                <span className="gradient-text">Hobby Predictor</span>
              </h1>
              <p className="lead text-muted mb-4">
                Discover your child's perfect hobby through our intelligent assessment. Answer a few questions about
                your child's interests and abilities.
              </p>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="row justify-content-center mb-4">
            <div className="col-lg-8">
              <div className="progress" style={{ height: "8px", borderRadius: "10px" }}>
                <div
                  className="progress-bar progress-bar-custom"
                  style={{ width: `${(currentStep / formSections.length) * 100}%` }}
                ></div>
              </div>
              <div className="text-center mt-2">
                <small className="text-muted">
                  Step {currentStep} of {formSections.length}
                </small>
              </div>
            </div>
          </div>

          <form onSubmit={handleHobbySubmit}>
            <div className="row justify-content-center">
              <div className="col-lg-8">
                {formSections.map((section, index) => (
                  <div key={index} className="form-section">
                    <div className="section-icon">{section.icon}</div>
                    <h3 className="text-center fw-bold mb-4 text-purple-dark">{section.title}</h3>

                    <div className="row">
                      {section.fields.map((field, fieldIndex) => (
                        <div key={field.name} className="col-md-6 mb-4">
                          <label className="form-label fw-semibold text-purple-dark mb-2">{field.label}</label>
                          {renderField(field)}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}

                {/* Submit Button */}
                <div className="text-center mb-4">
                  <button type="submit" className="btn btn-gradient btn-lg px-5 py-3 fw-semibold" disabled={isLoading}>
                    {isLoading ? (
                      <>
                        <div
                          className="loading-spinner me-2"
                          style={{ width: "20px", height: "20px", display: "inline-block" }}
                        ></div>
                        Analyzing...
                      </>
                    ) : (
                      <>🔮 Predict My Child's Hobby</>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </form>

          {/* Result Section */}
          {hobbyResult && (
            <div className="row justify-content-center mt-5">
              <div className="col-lg-6">
                <div className="result-card">
                  <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>🎯</div>
                  <h3 className="fw-bold mb-3">Perfect Hobby Match Found!</h3>
                  <h2 className="display-5 fw-bold mb-3">{hobbyResult}</h2>
                  <p className="lead mb-4">
                    Based on your child's interests and abilities, this hobby would be an excellent fit for their
                    development and enjoyment.
                  </p>
                  <div className="d-flex justify-content-center gap-3 flex-wrap">
                    <button className="btn btn-light btn-lg fw-semibold">📋 Get Hobby Guide</button>
                    <button className="btn btn-outline-light btn-lg fw-semibold">🔄 Try Again</button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Tips Section */}
          <div className="row justify-content-center mt-5">
            <div className="col-lg-8">
              <div className="form-section text-center">
                <h4 className="fw-bold mb-3 text-purple-dark">💡 Helpful Tips</h4>
                <div className="row">
                  <div className="col-md-4 mb-3">
                    <div className="p-3">
                      <div className="mb-2" style={{ fontSize: "2rem" }}>
                        🎯
                      </div>
                      <h6 className="fw-bold text-purple-dark">Be Honest</h6>
                      <small className="text-muted">Answer based on your child's actual interests and abilities</small>
                    </div>
                  </div>
                  <div className="col-md-4 mb-3">
                    <div className="p-3">
                      <div className="mb-2" style={{ fontSize: "2rem" }}>
                        ⏰
                      </div>
                      <h6 className="fw-bold text-purple-dark">Take Your Time</h6>
                      <small className="text-muted">Think carefully about each question for accurate results</small>
                    </div>
                  </div>
                  <div className="col-md-4 mb-3">
                    <div className="p-3">
                      <div className="mb-2" style={{ fontSize: "2rem" }}>
                        🌟
                      </div>
                      <h6 className="fw-bold text-purple-dark">Stay Positive</h6>
                      <small className="text-muted">Every child has unique talents waiting to be discovered</small>
                    </div>
                  </div>
                </div>
              </div>
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

export default HobbyPredictor
