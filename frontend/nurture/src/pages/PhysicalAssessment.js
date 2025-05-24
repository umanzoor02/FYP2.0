import React, { useState } from 'react';
import axios from 'axios';

const PhysicalAssessment = () => {
  const [bmiInputs, setBmiInputs] = useState({
    sex: '',
    age_years: '',
    age_months: '',
    height_ft: '',
    height_in: '',
    height_fraction: '',
    weight_lbs: ''
  });

  const [bmiResult, setBmiResult] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBmiInputs((prev) => ({ ...prev, [name]: value }));
  };

  const normalizeInputs = (inputs) => {
    return {
      sex: inputs.sex.trim().toLowerCase(),
      age_years: parseInt(inputs.age_years),
      age_months: parseInt(inputs.age_months),
      height_ft: parseInt(inputs.height_ft),
      height_in: parseInt(inputs.height_in),
      height_fraction: parseFloat(inputs.height_fraction),
      weight_lbs: parseFloat(inputs.weight_lbs),
    };
  };

  const handleBmiSubmit = async (e) => {
    e.preventDefault();
    try {
      const normalizedData = normalizeInputs(bmiInputs);
      const response = await axios.post('http://127.0.0.1:8000/physical/bmi-calculate/', normalizedData);
      setBmiResult(response.data);
    } catch (error) {
      console.error('BMI calculation failed:', error.response?.data || error.message);
    }
  };

  return (
    <div className="p-6 max-w-xl mx-auto bg-white rounded-lg shadow-lg">
      <h3 className="text-2xl font-bold mb-6 text-center text-gray-800">Child's BMI Calculator</h3>

      <form onSubmit={handleBmiSubmit} className="space-y-5">
        <div>
          <label htmlFor="sex" className="block text-sm font-medium text-gray-700 mb-1">Sex</label>
          <select
            id="sex"
            name="sex"
            value={bmiInputs.sex}
            onChange={handleInputChange}
            className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          >
            <option value="">Select Sex</option>
            <option value="boy">Boy</option>
            <option value="girl">Girl</option>
          </select>
        </div>

        <div>
          <label htmlFor="age_years" className="block text-sm font-medium text-gray-700 mb-1">Age (Years)</label>
          <input
            type="number"
            id="age_years"
            name="age_years"
            value={bmiInputs.age_years}
            onChange={handleInputChange}
            min={0}
            placeholder="e.g. 10"
            className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label htmlFor="age_months" className="block text-sm font-medium text-gray-700 mb-1">Extra Months</label>
          <input
            type="number"
            id="age_months"
            name="age_months"
            value={bmiInputs.age_months}
            onChange={handleInputChange}
            min={0}
            max={11}
            placeholder="0 - 11"
            className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label htmlFor="height_ft" className="block text-sm font-medium text-gray-700 mb-1">Height (Feet)</label>
          <input
            type="number"
            id="height_ft"
            name="height_ft"
            value={bmiInputs.height_ft}
            onChange={handleInputChange}
            min={0}
            placeholder="e.g. 4"
            className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label htmlFor="height_in" className="block text-sm font-medium text-gray-700 mb-1">Height (Inches)</label>
          <input
            type="number"
            id="height_in"
            name="height_in"
            value={bmiInputs.height_in}
            onChange={handleInputChange}
            min={0}
            max={11}
            placeholder="e.g. 7"
            className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label htmlFor="height_fraction" className="block text-sm font-medium text-gray-700 mb-1">Height Fraction (Decimal)</label>
          <input
            type="number"
            id="height_fraction"
            name="height_fraction"
            value={bmiInputs.height_fraction}
            onChange={handleInputChange}
            min={0}
            max={1}
            step={0.01}
            placeholder="e.g. 0.5"
            className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label htmlFor="weight_lbs" className="block text-sm font-medium text-gray-700 mb-1">Weight (lbs)</label>
          <input
            type="number"
            id="weight_lbs"
            name="weight_lbs"
            value={bmiInputs.weight_lbs}
            onChange={handleInputChange}
            min={0}
            placeholder="e.g. 90"
            className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full py-3 bg-blue-600 text-white font-bold rounded hover:bg-blue-700 transition duration-200"
        >
          Calculate BMI
        </button>
      </form>

      {bmiResult && (
        <div className="mt-6 p-4 border border-gray-300 rounded bg-gray-50 text-center">
          <p className="text-xl font-semibold text-gray-800 mb-2">
            BMI: {bmiResult.bmi} ({bmiResult.category})
          </p>
          <p className="text-gray-700">{bmiResult.recommendation}</p>
        </div>
      )}
    </div>
  );
};

export default PhysicalAssessment;
