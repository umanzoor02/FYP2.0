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
    try {
      const normalizedData = normalizeInputs(anxietyInputs)
      const response = await axios.post(
        "http://127.0.0.1:8000/predictor/predict/",
        normalizedData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      setAnxietyResult(response.data.prediction)
    } catch (error) {
      console.error("Anxiety prediction failed:", error.response?.data || error.message)
    }
  }

  return (
    <div className="container py-5 bg-light min-vh-100">
      <div className="card shadow border-0">
        {/* Header */}
        <div className="card-header bg-gradient text-white" style={{ background: "linear-gradient(to right, #7453DB, #7C3AED)" }}>
          <div className="d-flex align-items-center mb-3">
            <Brain className="me-2" />
            <h1 className="h4 fw-bold mb-0">NURTURE</h1>
          </div>
          <div className="d-flex align-items-center">
            <Heart className="me-2" />
            <h2 className="h5 fw-semibold mb-0">Mental Health Assessment</h2>
            <div className="ms-3 d-flex gap-2">
              <span className="rounded-circle bg-white opacity-50" style={{ width: "8px", height: "8px" }}></span>
              <span className="rounded-circle bg-white opacity-75" style={{ width: "8px", height: "8px" }}></span>
              <span className="rounded-circle bg-white" style={{ width: "8px", height: "8px" }}></span>
            </div>
          </div>
        </div>

        {/* Body */}
        <form className="card-body" onSubmit={handleAnxietySubmit}>
          <h3 className="h5 fw-bold text-dark mb-3">Depression Prediction Assessment</h3>
          <p className="text-muted mb-4">
            Please fill out the following information to get your mental health assessment.
          </p>

          <div className="row">
            {[
              ["Age", "number", "Enter your age (upto 19)", User],
              ["Financial_Stress", "number", "Enter level (e.g., 2.5)", DollarSign],
              ["Academic_Pressure", "number", "Enter pressure level", GraduationCap],
              ["Study_Satisfaction", "number", "Enter satisfaction level", BookOpen],
              ["Work_Study_Hours", "number", "Enter hours per week", Clock],
            ].map(([name, type, placeholder, Icon]) => (
              <div className="col-md-6 mb-3" key={name}>
                <label className="form-label fw-semibold d-flex align-items-center">
                  <Icon className="me-2 text-primary" />
                  {name.replace(/_/g, " ")}
                </label>
                <input
                  type={type}
                  name={name}
                  placeholder={placeholder}
                  value={anxietyInputs[name]}
                  onChange={handleInputChange}
                  className="form-control"
                />
              </div>
            ))}

            {[
              ["Gender", ["Male", "Female", "Other"], User],
              ["Sleep_Duration", ["Less than 5 hours", "5-6 hours", "7-9 hours"], Clock],
              ["Dietary_Habits", ["Healthy", "Moderate", "Unhealthy"], Utensils],
              ["Family_History", ["Yes", "No"], Users],
            ].map(([name, options, Icon]) => (
              <div
                className={`mb-3 ${name === "Family_History" ? "col-md-12" : "col-md-6"}`}
                key={name}
              >
                <label className="form-label fw-semibold d-flex align-items-center">
                  <Icon className="me-2 text-primary" />
                  {name.replace(/_/g, " ")}
                </label>
                <select
                  name={name}
                  value={anxietyInputs[name]}
                  onChange={handleInputChange}
                  className="form-select"
                >
                  <option value="">Select {name.replace(/_/g, " ")}</option>
                  {options.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>
            ))}
          </div>

          {/* Submit Button */}
          <div className="text-center mt-4">
            <button type="submit" className="btn btn-primary d-flex align-items-center gap-2 px-4 py-2">
              <Brain />
              Predict Depression Risk
            </button>
          </div>

          {/* Result */}
          {anxietyResult !== "" && (
            <div
              className={`alert mt-4 d-flex align-items-center ${
                anxietyResult === 1 ? "alert-danger" : "alert-success"
              }`}
              role="alert"
            >
              <div className="me-3">
                {anxietyResult === 1 ? (
                  <span className="fs-3">😟</span>
                ) : (
                  <span className="fs-3">😊</span>
                )}
              </div>
              <div>
                <h4 className="alert-heading">Assessment Result</h4>
                <p className="mb-0 fw-bold">
                  {anxietyResult === 1 ? "Depression Predicted" : "No Depression"}
                </p>
              </div>
            </div>
          )}
        </form>

        {/* Footer */}
        <div className="card-footer text-center text-muted small">
          This assessment is for informational purposes only and should not replace professional medical advice.
        </div>
      </div>
    </div>
  )
}

export default MentalHealthAssessment
