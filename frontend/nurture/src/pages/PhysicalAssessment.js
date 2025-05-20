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

  const handleBmiSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://127.0.0.1:8000/physical/bmi-calculate/', bmiInputs);
      setBmiResult(response.data);
    } catch (error) {
      console.error('BMI calculation failed:', error);
    }
  };

  return (
    <div className="p-4">
      <h3>Calculate Child's BMI</h3>
      <form onSubmit={handleBmiSubmit}>
        {[{
          name: 'sex', type: 'text', placeholder: 'Enter sex (boy/girl)'
        }, {
          name: 'age_years', type: 'number', placeholder: 'Enter age in years'
        }, {
          name: 'age_months', type: 'number', placeholder: 'Enter extra months'
        }, {
          name: 'height_ft', type: 'number', placeholder: 'Enter height (feet)'
        }, {
          name: 'height_in', type: 'number', placeholder: 'Enter height (inches)'
        }, {
          name: 'height_fraction', type: 'number', placeholder: 'Enter height fraction (0.0-1.0)'
        }, {
          name: 'weight_lbs', type: 'number', placeholder: 'Enter weight (lbs)'
        }].map(({ name, type, placeholder }) => (
          <input
            key={name}
            type={type}
            name={name}
            placeholder={placeholder}
            value={bmiInputs[name]}
            onChange={handleInputChange}
            className="block mb-2 p-1 border"
          />
        ))}
        <button type="submit" className="mt-2 px-4 py-2 bg-blue-500 text-white">Calculate BMI</button>
      </form>

      {bmiResult && (
        <div className="mt-4">
          <p><strong>BMI:</strong> {bmiResult.bmi} ({bmiResult.category})</p>
          <p><strong>Recommendation:</strong> {bmiResult.recommendation}</p>
        </div>
      )}
    </div>
  );
};

export default PhysicalAssessment;
