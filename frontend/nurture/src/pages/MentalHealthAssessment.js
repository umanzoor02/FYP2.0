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
    setAnxietyInputs(prev => ({ ...prev, [name]: value }));
  };

  const handleAnxietySubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://127.0.0.1:8000/predictor/predict/', anxietyInputs, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setAnxietyResult(response.data.prediction);
    } catch (error) {
      console.error('Anxiety prediction failed:', error);
    }
  };

  return (
    <div className="p-4">
      <h2>Mental Health Assessment</h2>
      <form onSubmit={handleAnxietySubmit}>
        {[{
          name: 'Age', type: 'number', placeholder: 'Enter Age (e.g., 20)'
        }, {
          name: 'Gender', type: 'text', placeholder: 'Enter Gender (male/female)'
        }, {
          name: 'Sleep_Duration', type: 'text', placeholder: 'Enter Sleep Duration'
        }, {
          name: 'Dietary_Habits', type: 'text', placeholder: 'Enter Dietary Habit'
        }, {
          name: 'Financial_Stress', type: 'number', placeholder: 'Enter Financial Stress'
        }, {
          name: 'Academic_Pressure', type: 'number', placeholder: 'Enter Academic Pressure'
        }, {
          name: 'Study_Satisfaction', type: 'number', placeholder: 'Enter Study Satisfaction'
        }, {
          name: 'Work_Study_Hours', type: 'number', placeholder: 'Enter Work Hours'
        }, {
          name: 'Family_History', type: 'text', placeholder: 'Family History of Mental Illness?'
        }].map(({ name, type, placeholder }) => (
          <input
            key={name}
            type={type}
            name={name}
            placeholder={placeholder}
            value={anxietyInputs[name]}
            onChange={handleInputChange}
            className="block mb-2 p-1"
          />
        ))}
        <button type="submit">Predict Depression</button>
      </form>
      {anxietyResult && <p><strong>Depression Prediction:</strong> {anxietyResult}</p>}
    </div>
  );
};

export default MentalHealthAssessment;
