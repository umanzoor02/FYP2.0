"use client"

import { useState } from "react"
import axios from "axios"
import 'bootstrap-icons/font/bootstrap-icons.css'
import 'bootstrap/dist/css/bootstrap.min.css'

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
    try {
      const normalizedData = normalizeInputs(bmiInputs)
      const response = await axios.post("http://127.0.0.1:8000/physical/bmi-calculate/", normalizedData)
      setBmiResult(response.data)
    } catch (error) {
      console.error("BMI calculation failed:", error.response?.data || error.message)
    }
  }

  const getBmiCategoryColor = (category) => {
    if (!category) return "text-secondary"
    const lowerCategory = category.toLowerCase()
    if (lowerCategory.includes("underweight")) return "text-primary"
    if (lowerCategory.includes("normal") || lowerCategory.includes("healthy")) return "text-success"
    if (lowerCategory.includes("overweight")) return "text-warning"
    if (lowerCategory.includes("obese")) return "text-danger"
    return "text-secondary"
  }

  return (
    <div className="min-vh-100 bg-light py-5">
      <div className="container">
        <div className="bg-primary text-white rounded p-4 mb-4">
          <div className="d-flex align-items-center mb-2">
            <i className="bi bi-bar-chart fs-2 me-2"></i>
            <h1 className="h3 mb-0">NURTURE</h1>
          </div>
          <div className="d-flex align-items-center">
            <i className="bi bi-bounding-box me-2"></i>
            <h2 className="h5 mb-0">Physical Health Assessment</h2>
          </div>
        </div>

        <div className="bg-white shadow rounded p-4">
          <h3 className="mb-3 d-flex align-items-center">
            <i className="bi bi-calculator text-primary me-2"></i> Child's Physical Health Assessment
          </h3>
          <p className="text-muted">Collecting your child info to assess their growth and health status.</p>

          <form onSubmit={handleBmiSubmit} className="mt-4">
            <div className="mb-3">
              <label htmlFor="sex" className="form-label">
                <i className="bi bi-person me-1 text-primary"></i> Sex
              </label>
              <select
                id="sex"
                name="sex"
                value={bmiInputs.sex}
                onChange={handleInputChange}
                className="form-select"
                required
              >
                <option value="">Select Sex</option>
                <option value="boy">Boy</option>
                <option value="girl">Girl</option>
              </select>
            </div>

            <div className="row">
              <div className="col-md-6 mb-3">
                <label htmlFor="age_years" className="form-label">
                  <i className="bi bi-calendar me-1 text-primary"></i> Age (Years)
                </label>
                <input
                  type="number"
                  id="age_years"
                  name="age_years"
                  value={bmiInputs.age_years}
                  onChange={handleInputChange}
                  min={0}
                  className="form-control"
                  placeholder="e.g. 10"
                  required
                />
              </div>
              <div className="col-md-6 mb-3">
                <label htmlFor="age_months" className="form-label">
                  <i className="bi bi-calendar me-1 text-primary"></i> Extra Months
                </label>
                <input
                  type="number"
                  id="age_months"
                  name="age_months"
                  value={bmiInputs.age_months}
                  onChange={handleInputChange}
                  min={0}
                  max={11}
                  className="form-control"
                  placeholder="0 - 11"
                  required
                />
              </div>
            </div>

            <h5 className="mt-4 mb-2">
              <i className="bi bi-rulers text-primary me-2"></i> Height Measurements
            </h5>
            <div className="row">
              <div className="col-md-4 mb-3">
                <label htmlFor="height_ft" className="form-label">Feet</label>
                <input
                  type="number"
                  id="height_ft"
                  name="height_ft"
                  value={bmiInputs.height_ft}
                  onChange={handleInputChange}
                  min={0}
                  className="form-control"
                  placeholder="e.g. 4"
                  required
                />
              </div>
              <div className="col-md-4 mb-3">
                <label htmlFor="height_in" className="form-label">Inches</label>
                <input
                  type="number"
                  id="height_in"
                  name="height_in"
                  value={bmiInputs.height_in}
                  onChange={handleInputChange}
                  min={0}
                  max={11}
                  className="form-control"
                  placeholder="e.g. 7"
                  required
                />
              </div>
              <div className="col-md-4 mb-3">
                <label htmlFor="height_fraction" className="form-label">Fraction</label>
                <input
                  type="number"
                  id="height_fraction"
                  name="height_fraction"
                  value={bmiInputs.height_fraction}
                  onChange={handleInputChange}
                  min={0}
                  max={1}
                  step={0.01}
                  className="form-control"
                  placeholder="e.g. 0.5"
                  required
                />
              </div>
            </div>

            <div className="mb-4">
              <label htmlFor="weight_lbs" className="form-label">
                <i className="bi bi-weight text-primary me-2"></i> Weight (lbs)
              </label>
              <input
                type="number"
                id="weight_lbs"
                name="weight_lbs"
                value={bmiInputs.weight_lbs}
                onChange={handleInputChange}
                min={0}
                className="form-control"
                placeholder="e.g. 90"
                required
              />
            </div>

            <button type="submit" className="btn btn-primary w-100 d-flex justify-content-center align-items-center gap-2">
              <i className="bi bi-calculator"></i> Assess
            </button>
          </form>

          {bmiResult && (
            <div className="mt-4 p-3 bg-light border-start border-4 border-primary rounded">
              <div className="d-flex align-items-center mb-3">
                <div className="bg-white shadow rounded-circle p-3 me-3">
                  <i className="bi bi-bounding-box fs-4 text-primary"></i>
                </div>
                <div>
                  <h5 className="mb-0">Physical Assessment Results</h5>
                  <small className="text-muted">Based on your child's measurements</small>
                </div>
              </div>

              <div className="bg-white p-3 rounded shadow-sm">
                <div className="text-center mb-3">
                  <h3 className="mb-1">BMI: {bmiResult.bmi}</h3>
                  <p className={`fw-semibold ${getBmiCategoryColor(bmiResult.category)}`}>{bmiResult.category}</p>
                </div>
                {bmiResult.recommendation && (
                  <div className="pt-3 border-top">
                    <h6>Recommendation:</h6>
                    <p className="mb-0">{bmiResult.recommendation}</p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        <div className="text-center mt-4 text-muted">
          <small>
            BMI calculations are for reference only. Please consult with a healthcare professional for comprehensive
            health assessment.
          </small>
        </div>
      </div>
    </div>
  )
}

export default PhysicalAssessment
