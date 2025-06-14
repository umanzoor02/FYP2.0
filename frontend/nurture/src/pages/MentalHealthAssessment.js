"use client"

import { useState } from "react"
import axios from "axios"
import {
  Brain,
  Heart,
  User,
  Clock,
  Utensils,
  DollarSign,
  GraduationCap,
  BookOpen,
  Users,
  AlertCircle,
  CheckCircle,
  ArrowRight,
  Shield,
} from "lucide-react"

const MentalHealthAssessment = () => {
  const token = localStorage.getItem("jwtToken")
  const [anxietyInputs, setAnxietyInputs] = useState({
    Age: "",
    Gender: "",
    Sleep_Duration: "",
    Dietary_Habits: "",
    Financial_Stress: "",
    Academic_Pressure: "",
    Study_Satisfaction: "",
    Work_Study_Hours: "",
    Family_History: "",
  })

  const [anxietyResult, setAnxietyResult] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [currentSection, setCurrentSection] = useState("personal")

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setAnxietyInputs((prev) => ({ ...prev, [name]: value }))
  }

  const normalizeInputs = (inputs) => {
    return {
      Age: Number.parseInt(inputs.Age),
      Gender: capitalize(inputs.Gender),
      Sleep_Duration: inputs.Sleep_Duration.trim(),
      Dietary_Habits: capitalize(inputs.Dietary_Habits),
      Financial_Stress: Number.parseFloat(inputs.Financial_Stress),
      Academic_Pressure: Number.parseFloat(inputs.Academic_Pressure),
      Study_Satisfaction: Number.parseFloat(inputs.Study_Satisfaction),
      Work_Study_Hours: Number.parseInt(inputs.Work_Study_Hours),
      Family_History: capitalize(inputs.Family_History),
    }
  }

  const capitalize = (str) => {
    if (!str) return ""
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase()
  }

  const handleAnxietySubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    try {
      const normalizedData = normalizeInputs(anxietyInputs)
      const response = await axios.post("http://127.0.0.1:8000/predictor/predict/", normalizedData, {
        headers: { Authorization: `Bearer ${token}` },
      })
      setAnxietyResult(response.data.prediction)
      window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" })
    } catch (error) {
      console.error("Anxiety prediction failed:", error.response?.data || error.message)
    } finally {
      setIsLoading(false)
    }
  }

  const sections = {
    personal: {
      title: "Personal Information",
      icon: User,
      fields: ["Age", "Gender"],
    },
    lifestyle: {
      title: "Lifestyle Factors",
      icon: Heart,
      fields: ["Sleep_Duration", "Dietary_Habits"],
    },
    academic: {
      title: "Academic & Stress Factors",
      icon: GraduationCap,
      fields: ["Financial_Stress", "Academic_Pressure", "Study_Satisfaction", "Work_Study_Hours"],
    },
    medical: {
      title: "Medical History",
      icon: Shield,
      fields: ["Family_History"],
    },
  }

  const getFieldConfig = (name) => {
    const configs = {
      Age: {
        type: "number",
        placeholder: "Enter your age (up to 19)",
        icon: User,
        min: 1,
        max: 19,
      },
      Gender: {
        type: "select",
        options: ["Male", "Female", "Other"],
        icon: User,
      },
      Sleep_Duration: {
        type: "select",
        options: ["Less than 5 hours", "5-6 hours", "7-9 hours", "More than 9 hours"],
        icon: Clock,
      },
      Dietary_Habits: {
        type: "select",
        options: ["Healthy", "Moderate", "Unhealthy"],
        icon: Utensils,
      },
      Financial_Stress: {
        type: "range",
        min: 0,
        max: 5,
        step: 0.5,
        placeholder: "Rate from 0 (none) to 5 (severe)",
        icon: DollarSign,
      },
      Academic_Pressure: {
        type: "range",
        min: 0,
        max: 5,
        step: 0.5,
        placeholder: "Rate from 0 (none) to 5 (severe)",
        icon: GraduationCap,
      },
      Study_Satisfaction: {
        type: "range",
        min: 0,
        max: 5,
        step: 0.5,
        placeholder: "Rate from 0 (unsatisfied) to 5 (very satisfied)",
        icon: BookOpen,
      },
      Work_Study_Hours: {
        type: "number",
        placeholder: "Hours per week",
        icon: Clock,
        min: 0,
        max: 168,
      },
      Family_History: {
        type: "select",
        options: ["Yes", "No"],
        icon: Users,
      },
    }
    return configs[name]
  }

  const renderField = (name) => {
    const config = getFieldConfig(name)
    const Icon = config.icon

    if (config.type === "select") {
      return (
        <div className="form-group mb-4" key={name}>
          <label className="form-label fw-semibold d-flex align-items-center mb-2">
            <Icon className="me-2 text-purple" size={18} />
            {name.replace(/_/g, " ")}
          </label>
          <select
            name={name}
            value={anxietyInputs[name]}
            onChange={handleInputChange}
            className="form-select form-select-lg border-purple"
            required
          >
            <option value="">Select {name.replace(/_/g, " ")}</option>
            {config.options.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
      )
    } else if (config.type === "range") {
      return (
        <div className="form-group mb-4" key={name}>
          <label className="form-label fw-semibold d-flex align-items-center mb-2">
            <Icon className="me-2 text-purple" size={18} />
            {name.replace(/_/g, " ")}
          </label>
          <div className="d-flex align-items-center gap-3">
            <input
              type="range"
              name={name}
              min={config.min}
              max={config.max}
              step={config.step}
              value={anxietyInputs[name] || 0}
              onChange={handleInputChange}
              className="form-range flex-grow-1"
              required
            />
            <span className="badge bg-purple px-3 py-2 fs-6 fw-semibold">{anxietyInputs[name] || 0}</span>
          </div>
          <small className="text-muted">{config.placeholder}</small>
        </div>
      )
    } else {
      return (
        <div className="form-group mb-4" key={name}>
          <label className="form-label fw-semibold d-flex align-items-center mb-2">
            <Icon className="me-2 text-purple" size={18} />
            {name.replace(/_/g, " ")}
          </label>
          <input
            type={config.type}
            name={name}
            placeholder={config.placeholder}
            value={anxietyInputs[name]}
            onChange={handleInputChange}
            className="form-control form-control-lg border-purple"
            min={config.min}
            max={config.max}
            required
          />
        </div>
      )
    }
  }

  const getResultDetails = () => {
    if (anxietyResult === 1) {
      return {
        title: "Depression Risk Detected",
        description:
          "Based on your responses, our assessment indicates potential signs of depression. This is not a diagnosis, but we recommend consulting with a mental health professional.",
        icon: AlertCircle,
        color: "danger",
        emoji: "😔",
        recommendations: [
          "Speak with a mental health professional",
          "Practice self-care and mindfulness",
          "Maintain regular sleep patterns",
          "Connect with supportive friends and family",
        ],
      }
    } else {
      return {
        title: "No Depression Risk Detected",
        description:
          "Based on your responses, our assessment does not indicate signs of depression. Continue maintaining your mental well-being with healthy habits.",
        icon: CheckCircle,
        color: "success",
        emoji: "😊",
        recommendations: [
          "Continue your healthy lifestyle habits",
          "Practice regular mindfulness",
          "Maintain social connections",
          "Get regular physical activity",
        ],
      }
    }
  }

  const getCurrentSectionIcon = () => {
    return sections[currentSection].icon
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
        .bg-purple {
          background-color: #7c3aed !important;
        }
        .bg-purple-light {
          background-color: rgba(124, 58, 237, 0.1) !important;
        }
        .text-purple {
          color: #7c3aed !important;
        }
        .border-purple {
          border-color: #e9d5ff !important;
        }
        .border-purple:focus {
          border-color: #7c3aed !important;
          box-shadow: 0 0 0 0.25rem rgba(124, 58, 237, 0.25) !important;
        }
        .btn-purple {
          background: linear-gradient(135deg, #8b5cf6, #7c3aed);
          border: none;
          color: white;
          box-shadow: 0 4px 15px rgba(139, 92, 246, 0.3);
        }
        .btn-purple:hover {
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
        .card-header-purple {
          background: linear-gradient(135deg, #8b5cf6, #7c3aed);
          color: white;
          border: none;
          padding: 1.5rem;
          border-radius: 15px 15px 0 0;
        }
        .form-section {
          background: white;
          border-radius: 15px;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
          overflow: hidden;
          transition: all 0.3s ease;
        }
        .form-section:hover {
          box-shadow: 0 15px 40px rgba(139, 92, 246, 0.15);
          transform: translateY(-5px);
        }
        .section-nav {
          background: rgba(255, 255, 255, 0.8);
          backdrop-filter: blur(10px);
          border-radius: 15px;
          padding: 1rem;
          border: 1px solid rgba(139, 92, 246, 0.1);
        }
        .section-nav-item {
          padding: 0.75rem 1rem;
          border-radius: 10px;
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }
        .section-nav-item:hover {
          background: rgba(139, 92, 246, 0.05);
        }
        .section-nav-item.active {
          background: rgba(139, 92, 246, 0.1);
          color: #7c3aed;
          font-weight: 600;
        }
        .section-indicator {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #e9d5ff;
          transition: all 0.3s ease;
        }
        .section-indicator.active {
          background: #7c3aed;
        }
        .section-indicator.completed {
          background: #10b981;
        }
        .form-range::-webkit-slider-thumb {
          background: #7c3aed;
        }
        .form-range::-moz-range-thumb {
          background: #7c3aed;
        }
        .form-range::-ms-thumb {
          background: #7c3aed;
        }
        .loading-spinner {
          border: 3px solid rgba(139, 92, 246, 0.3);
          border-top: 3px solid #7c3aed;
          border-radius: 50%;
          width: 24px;
          height: 24px;
          animation: spin 1s linear infinite;
          display: inline-block;
        }
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        .result-card {
          border-radius: 15px;
          overflow: hidden;
          transition: all 0.3s ease;
          animation: fadeIn 0.5s ease-out;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .recommendation-item {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 10px;
          padding: 0.75rem 1rem;
          margin-bottom: 0.5rem;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }
        .emoji-large {
          font-size: 3rem;
          line-height: 1;
          margin-bottom: 1rem;
        }
      `}</style>

      <div className="bg-gradient-main min-vh-100 py-5">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-10">
              {/* Header */}
              <div className="d-flex align-items-center justify-content-between mb-4">
                <div className="d-flex align-items-center">
                  <Brain className="text-purple me-2" size={28} />
                  <h1 className="h3 fw-bold mb-0 text-purple">NURTURE</h1>
                </div>
                <div className="d-flex align-items-center gap-2">
                  <span className="badge bg-purple px-3 py-2">Mental Health</span>
                  <span className="badge bg-purple-light text-purple px-3 py-2">Assessment</span>
                </div>
              </div>

              {/* Form Section */}
              <div className="form-section mb-4">
                <div className="card-header-purple">
                  <div className="d-flex align-items-center">
                    <Heart className="me-2" size={20} />
                    <h2 className="h5 fw-semibold mb-0">Mental Health Assessment</h2>
                  </div>
                  <p className="mb-0 mt-2 opacity-75">Complete this assessment to understand your mental well-being</p>
                </div>

                <div className="p-4">
                  <div className="row">
                    <div className="col-md-3 mb-4 mb-md-0">
                      <div className="section-nav sticky-md-top" style={{ top: "1rem" }}>
                        {Object.entries(sections).map(([key, section]) => {
                          const Icon = section.icon
                          const isActive = currentSection === key
                          const isCompleted = section.fields.every((field) => anxietyInputs[field])

                          return (
                            <div
                              key={key}
                              className={`section-nav-item ${isActive ? "active" : ""}`}
                              onClick={() => setCurrentSection(key)}
                            >
                              <span
                                className={`section-indicator ${isActive ? "active" : ""} ${
                                  isCompleted ? "completed" : ""
                                }`}
                              ></span>
                              <Icon size={16} />
                              <span>{section.title}</span>
                            </div>
                          )
                        })}
                      </div>
                    </div>

                    <div className="col-md-9">
                      <form onSubmit={handleAnxietySubmit}>
                        <h3 className="h5 fw-bold text-purple mb-4 d-flex align-items-center">
                          {getCurrentSectionIcon() && <getCurrentSectionIcon className="me-2" size={20} />}
                          {sections[currentSection].title}
                        </h3>

                        {sections[currentSection].fields.map((field) => renderField(field))}

                        <div className="d-flex justify-content-between mt-4">
                          {currentSection !== "personal" && (
                            <button
                              type="button"
                              className="btn btn-outline-purple px-4 py-2"
                              onClick={() => {
                                const keys = Object.keys(sections)
                                const currentIndex = keys.indexOf(currentSection)
                                if (currentIndex > 0) {
                                  setCurrentSection(keys[currentIndex - 1])
                                }
                              }}
                            >
                              Previous
                            </button>
                          )}

                          {currentSection !== "medical" ? (
                            <button
                              type="button"
                              className="btn btn-purple px-4 py-2 ms-auto"
                              onClick={() => {
                                const keys = Object.keys(sections)
                                const currentIndex = keys.indexOf(currentSection)
                                if (currentIndex < keys.length - 1) {
                                  setCurrentSection(keys[currentIndex + 1])
                                }
                              }}
                            >
                              Next <ArrowRight size={16} className="ms-1" />
                            </button>
                          ) : (
                            <button
                              type="submit"
                              className="btn btn-purple px-4 py-2 d-flex align-items-center gap-2 ms-auto"
                              disabled={isLoading}
                            >
                              {isLoading ? (
                                <>
                                  <div className="loading-spinner"></div>
                                  Analyzing...
                                </>
                              ) : (
                                <>
                                  <Brain size={18} />
                                  Predict Depression Risk
                                </>
                              )}
                            </button>
                          )}
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>

              {/* Result Section */}
              {anxietyResult !== "" && (
                <div className="result-card mb-4">
                  {(() => {
                    const result = getResultDetails()
                    const ResultIcon = result.icon

                    return (
                      <div className={`bg-${result.color} text-white p-4`}>
                        <div className="text-center mb-4">
                          <div className="emoji-large">{result.emoji}</div>
                          <h3 className="fw-bold mb-2">{result.title}</h3>
                          <p className="mb-0">{result.description}</p>
                        </div>

                        <div className="mt-4">
                          <h5 className="fw-semibold mb-3">Recommendations:</h5>
                          <div>
                            {result.recommendations.map((rec, index) => (
                              <div key={index} className="recommendation-item">
                                <CheckCircle size={16} />
                                <span>{rec}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="d-flex justify-content-center mt-4">
                          <button
                            className="btn btn-light text-dark px-4 py-2 fw-semibold"
                            onClick={() => {
                              setAnxietyInputs({
                                Age: "",
                                Gender: "",
                                Sleep_Duration: "",
                                Dietary_Habits: "",
                                Financial_Stress: "",
                                Academic_Pressure: "",
                                Study_Satisfaction: "",
                                Work_Study_Hours: "",
                                Family_History: "",
                              })
                              setAnxietyResult("")
                              setCurrentSection("personal")
                              window.scrollTo({ top: 0, behavior: "smooth" })
                            }}
                          >
                            Take Assessment Again
                          </button>
                        </div>
                      </div>
                    )
                  })()}
                </div>
              )}

              {/* Disclaimer */}
              <div className="bg-white p-3 rounded-3 text-center text-muted small">
                <Shield size={16} className="me-1" />
                This assessment is for informational purposes only and should not replace professional medical advice.
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

export default MentalHealthAssessment
