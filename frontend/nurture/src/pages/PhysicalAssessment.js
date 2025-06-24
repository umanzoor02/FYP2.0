"use client"

import { useState } from "react"
import {
  Activity,
  Heart,
  User,
  Calendar,
  Ruler,
  Weight,
  CheckCircle,
  AlertCircle,
  ArrowRight,
  Shield,
  Target,
  TrendingUp,
} from "lucide-react"

const PhysicalAssessment = () => {
  const [bmiInputs, setBmiInputs] = useState({
    sex: "",
    age_years: "",
    age_months: "",
    height_ft: "",
    height_in: "",
    height_fraction: "",
    weight_lbs: "",
  })

  const [bmiResult, setBmiResult] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [currentSection, setCurrentSection] = useState("personal")

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setBmiInputs((prev) => ({ ...prev, [name]: value }))
  }

  const normalizeInputs = (inputs) => {
    return {
      sex: inputs.sex.trim().toLowerCase(),
      age_years: Number.parseInt(inputs.age_years),
      age_months: Number.parseInt(inputs.age_months),
      height_ft: Number.parseInt(inputs.height_ft),
      height_in: Number.parseInt(inputs.height_in),
      height_fraction: Number.parseFloat(inputs.height_fraction),
      weight_lbs: Number.parseFloat(inputs.weight_lbs),
    }
  }

  const handleBmiSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate loading time
    await new Promise((resolve) => setTimeout(resolve, 1500))

    try {
      const normalizedData = normalizeInputs(bmiInputs)

      // Simulated BMI calculation for demo
      const heightInInches = normalizedData.height_ft * 12 + normalizedData.height_in + normalizedData.height_fraction
      const bmi = ((normalizedData.weight_lbs / (heightInInches * heightInInches)) * 703).toFixed(1)

      let category = "Normal weight"
      let recommendation =
        "Your child's BMI is within the healthy range. Continue maintaining a balanced diet and regular physical activity."
      let percentile = "50th-85th percentile"

      if (bmi < 18.5) {
        category = "Underweight"
        percentile = "Below 5th percentile"
        recommendation =
          "Your child may be underweight. Consider consulting with a healthcare provider about nutrition and healthy weight gain strategies."
      } else if (bmi >= 25) {
        category = "Overweight"
        percentile = "85th-95th percentile"
        recommendation =
          "Your child may be overweight. Consider consulting with a healthcare provider about healthy eating habits and physical activity."
      } else if (bmi >= 30) {
        category = "Obese"
        percentile = "Above 95th percentile"
        recommendation =
          "Your child may be obese. It's important to consult with a healthcare provider for a comprehensive health plan."
      }

      setBmiResult({ bmi, category, recommendation, percentile })
      window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" })
    } catch (error) {
      console.error("BMI calculation failed:", error.response?.data || error.message)
    } finally {
      setIsLoading(false)
    }
  }

  const sections = {
    personal: {
      title: "Personal Information",
      icon: User,
      fields: ["sex", "age_years", "age_months"],
    },
    measurements: {
      title: "Physical Measurements",
      icon: Ruler,
      fields: ["height_ft", "height_in", "height_fraction", "weight_lbs"],
    },
  }

  const getFieldConfig = (name) => {
    const configs = {
      sex: {
        type: "select",
        options: ["Boy", "Girl"],
        icon: User,
        label: "Child's Sex",
      },
      age_years: {
        type: "number",
        placeholder: "Enter age in years (e.g., 10)",
        icon: Calendar,
        min: 1,
        max: 19,
        label: "Age (Years)",
      },
      age_months: {
        type: "number",
        placeholder: "Extra months (0-11)",
        icon: Calendar,
        min: 0,
        max: 11,
        label: "Extra Months",
      },
      height_ft: {
        type: "number",
        placeholder: "Feet (e.g., 4)",
        icon: Ruler,
        min: 0,
        max: 8,
        label: "Height - Feet",
      },
      height_in: {
        type: "number",
        placeholder: "Inches (0-11)",
        icon: Ruler,
        min: 0,
        max: 11,
        label: "Height - Inches",
      },
      height_fraction: {
        type: "number",
        placeholder: "Fraction (e.g., 0.5)",
        icon: Ruler,
        min: 0,
        max: 1,
        step: 0.01,
        label: "Height - Fraction",
      },
      weight_lbs: {
        type: "number",
        placeholder: "Weight in pounds (e.g., 90)",
        icon: Weight,
        min: 0,
        max: 500,
        label: "Weight (lbs)",
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
            {config.label}
          </label>
          <select
            name={name}
            value={bmiInputs[name]}
            onChange={handleInputChange}
            className="form-select form-select-lg border-purple"
            required
          >
            <option value="">Select {config.label}</option>
            {config.options.map((option) => (
              <option key={option} value={option.toLowerCase()}>
                {option === "Boy" ? "👦 Boy" : "👧 Girl"}
              </option>
            ))}
          </select>
        </div>
      )
    } else {
      return (
        <div className="form-group mb-4" key={name}>
          <label className="form-label fw-semibold d-flex align-items-center mb-2">
            <Icon className="me-2 text-purple" size={18} />
            {config.label}
          </label>
          <input
            type={config.type}
            name={name}
            placeholder={config.placeholder}
            value={bmiInputs[name]}
            onChange={handleInputChange}
            className="form-control form-control-lg border-purple"
            min={config.min}
            max={config.max}
            step={config.step}
            required
          />
        </div>
      )
    }
  }

  const getResultDetails = () => {
    if (!bmiResult) return null

    const category = bmiResult.category.toLowerCase()

    if (category.includes("underweight")) {
      return {
        title: "Underweight Range",
        description: "Your child's BMI indicates they may be underweight for their age and height.",
        icon: AlertCircle,
        color: "info",
        emoji: "📊",
        recommendations: [
          "Consult with a pediatrician or nutritionist",
          "Focus on nutrient-dense, calorie-rich foods",
          "Ensure regular meal times and healthy snacks",
          "Monitor growth patterns over time",
        ],
      }
    } else if (category.includes("overweight") || category.includes("obese")) {
      return {
        title: category.includes("obese") ? "Obesity Range" : "Overweight Range",
        description: `Your child's BMI indicates they may be ${category} for their age and height.`,
        icon: AlertCircle,
        color: "warning",
        emoji: "⚖️",
        recommendations: [
          "Consult with a pediatrician for a comprehensive plan",
          "Focus on balanced, nutritious meals",
          "Encourage regular physical activity",
          "Limit processed foods and sugary drinks",
        ],
      }
    } else {
      return {
        title: "Healthy Weight Range",
        description: "Your child's BMI is within the healthy range for their age and height.",
        icon: CheckCircle,
        color: "success",
        emoji: "🎯",
        recommendations: [
          "Continue maintaining healthy eating habits",
          "Keep up regular physical activity",
          "Ensure adequate sleep and hydration",
          "Schedule regular check-ups with pediatrician",
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
        .bmi-display {
          font-size: 3rem;
          font-weight: bold;
          color: white;
          text-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
      `}</style>

      <div className="bg-gradient-main min-vh-100 py-5">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-10">
              {/* Header */}
              <div className="d-flex align-items-center justify-content-between mb-4">
                <div className="d-flex align-items-center">
                  <Activity className="text-purple me-2" size={28} />
                  <h1 className="h3 fw-bold mb-0 text-purple">NURTURE</h1>
                </div>
                <div className="d-flex align-items-center gap-2">
                  <span className="badge bg-purple px-3 py-2">Physical Health</span>
                  <span className="badge bg-purple-light text-purple px-3 py-2">Assessment</span>
                </div>
              </div>

              {/* Form Section */}
              <div className="form-section mb-4">
                <div className="card-header-purple">
                  <div className="d-flex align-items-center">
                    <Heart className="me-2" size={20} />
                    <h2 className="h5 fw-semibold mb-0">Physical Health Assessment</h2>
                  </div>
                  <p className="mb-0 mt-2 opacity-75">Assess your child's growth and physical development</p>
                </div>

                <div className="p-4">
                  <div className="row">
                    <div className="col-md-3 mb-4 mb-md-0">
                      <div className="section-nav sticky-md-top" style={{ top: "1rem" }}>
                        {Object.entries(sections).map(([key, section]) => {
                          const Icon = section.icon
                          const isActive = currentSection === key
                          const isCompleted = section.fields.every((field) => bmiInputs[field])

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
                      <form onSubmit={handleBmiSubmit}>
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

                          {currentSection !== "measurements" ? (
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
                                  Calculating...
                                </>
                              ) : (
                                <>
                                  <Target size={18} />
                                  Calculate BMI Assessment
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
              {bmiResult && (
                <div className="result-card mb-4">
                  {(() => {
                    const result = getResultDetails()
                    const ResultIcon = result.icon

                    return (
                      <div className={`bg-${result.color} text-white p-4`}>
                        <div className="text-center mb-4">
                          <div className="emoji-large">{result.emoji}</div>
                          <div className="bmi-display mb-2">BMI: {bmiResult.bmi}</div>
                          <h3 className="fw-bold mb-2">{result.title}</h3>
                          <p className="mb-2">{result.description}</p>
                          <span className="badge bg-white text-dark px-3 py-2">
                            <TrendingUp size={14} className="me-1" />
                            {bmiResult.percentile}
                          </span>
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
                              setBmiInputs({
                                sex: "",
                                age_years: "",
                                age_months: "",
                                height_ft: "",
                                height_in: "",
                                height_fraction: "",
                                weight_lbs: "",
                              })
                              setBmiResult(null)
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
                BMI calculations are for reference only and should not replace professional medical advice.
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

export default PhysicalAssessment;
