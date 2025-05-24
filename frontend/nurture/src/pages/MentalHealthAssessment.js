import React, { useState } from 'react';
import axios from 'axios';

const MentalHealthAssessment = () => {
  const token = localStorage.getItem('jwtToken');
  const [anxietyInputs, setAnxietyInputs] = useState({
    Age: '',
    Gender: '',
    Sleep_Duration: '',
    Dietary_Habits: '',
    Financial_Stress: '',
    Academic_Pressure: '',
    Study_Satisfaction: '',
    Work_Study_Hours: '',
    Family_History: ''
  });

  const [anxietyResult, setAnxietyResult] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAnxietyInputs((prev) => ({ ...prev, [name]: value }));
  };

  const normalizeInputs = (inputs) => {
    return {
      Age: parseInt(inputs.Age),
      Gender: capitalize(inputs.Gender),
      Sleep_Duration: inputs.Sleep_Duration.trim(),
      Dietary_Habits: capitalize(inputs.Dietary_Habits),
      Financial_Stress: parseFloat(inputs.Financial_Stress),
      Academic_Pressure: parseFloat(inputs.Academic_Pressure),
      Study_Satisfaction: parseFloat(inputs.Study_Satisfaction),
      Work_Study_Hours: parseInt(inputs.Work_Study_Hours),
      Family_History: capitalize(inputs.Family_History),
    };
  };

  const capitalize = (str) => {
    if (!str) return '';
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  };

  const handleAnxietySubmit = async (e) => {
    e.preventDefault();
    try {
      const normalizedData = normalizeInputs(anxietyInputs);
      const response = await axios.post('http://127.0.0.1:8000/predictor/predict/', normalizedData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setAnxietyResult(response.data.prediction);
    } catch (error) {
      console.error('Anxiety prediction failed:', error.response?.data || error.message);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">Mental Health Assessment</h2>
      <form onSubmit={handleAnxietySubmit} className="space-y-3">

        <input
          type="number"
          name="Age"
          placeholder="Enter Age (e.g., 6)"
          value={anxietyInputs.Age}
          onChange={handleInputChange}
          className="block p-2 border rounded"
        />

        <select name="Gender" value={anxietyInputs.Gender} onChange={handleInputChange} className="block p-2 border rounded">
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>

        <select name="Sleep_Duration" value={anxietyInputs.Sleep_Duration} onChange={handleInputChange} className="block p-2 border rounded">
          <option value="">Select Sleep Duration</option>
          <option value="Less than 5 hours">Less than 5 hours</option>
          <option value="5-6 hours">5-6 hours</option>
          <option value="7-9 hours">7-9 hours</option>
        </select>

        <select name="Dietary_Habits" value={anxietyInputs.Dietary_Habits} onChange={handleInputChange} className="block p-2 border rounded">
          <option value="">Select Dietary Habits</option>
          <option value="Healthy">Healthy</option>
          <option value="Moderate">Moderate</option>
          <option value="Unhealthy">Unhealthy</option>
        </select>

        <input
          type="number"
          name="Financial_Stress"
          placeholder="Enter Financial Stress (e.g., 2.5)"
          value={anxietyInputs.Financial_Stress}
          onChange={handleInputChange}
          className="block p-2 border rounded"
        />

        <input
          type="number"
          name="Academic_Pressure"
          placeholder="Enter Academic Pressure"
          value={anxietyInputs.Academic_Pressure}
          onChange={handleInputChange}
          className="block p-2 border rounded"
        />

        <input
          type="number"
          name="Study_Satisfaction"
          placeholder="Enter Study Satisfaction"
          value={anxietyInputs.Study_Satisfaction}
          onChange={handleInputChange}
          className="block p-2 border rounded"
        />

        <input
          type="number"
          name="Work_Study_Hours"
          placeholder="Enter Work/Study Hours"
          value={anxietyInputs.Work_Study_Hours}
          onChange={handleInputChange}
          className="block p-2 border rounded"
        />

        <select name="Family_History" value={anxietyInputs.Family_History} onChange={handleInputChange} className="block p-2 border rounded">
          <option value="">Family History of Mental Illness?</option>
          <option value="Yes">Yes</option>
          <option value="No">No</option>
        </select>

        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          Predict Depression
        </button>
      </form>

      {anxietyResult && (
        <p className="mt-4 text-lg font-medium">
          <strong>Depression Prediction:</strong> {anxietyResult}
        </p>
      )}
    </div>
  );
};

export default MentalHealthAssessment;
