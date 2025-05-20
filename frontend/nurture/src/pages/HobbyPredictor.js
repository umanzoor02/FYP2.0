import React, { useState } from 'react';
import axios from 'axios';

const HobbyPredictor = () => {
  const token = localStorage.getItem('jwtToken');

  const [hobbyInputs, setHobbyInputs] = useState({
    Olympiad_Participation: '',
    Scholarship: '',
    School: '',
    Fav_sub: '',
    Projects: '',
    Grasp_pow: '',
    Time_sprt: '',
    Medals: '',
    Career_sprt: '',
    Act_sprt: '',
    Fant_arts: '',
    Won_arts: '',
    Time_art: ''
  });

  const [hobbyResult, setHobbyResult] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setHobbyInputs(prev => ({ ...prev, [name]: value }));
  };

  const handleHobbySubmit = async (e) => {
    e.preventDefault();
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
    };

    try {
      const response = await axios.post('http://127.0.0.1:8000/edu/predict/', formattedInputs, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setHobbyResult(response.data.predicted_hobby);
    } catch (error) {
      console.error('Hobby prediction failed:', error);
    }
  };

  return (
    <div className="p-4">
      <h2>Hobby Predictor</h2>
      <form onSubmit={handleHobbySubmit}>
        {[{ name: 'Olympiad_Participation', label: 'Has your child participated in any Science/Maths Olympiad?' },
          { name: 'School', label: "Loves going to school?" },
          { name: 'Fav_sub', label: "What is your child's favorite subject?" },
          { name: 'Projects', label: "Has done any academic projects before?" },
          { name: 'Grasp_pow', label: "Grasping power (1-6)" },
          { name: 'Time_sprt', label: "Time spent on games (hours per week)" },
          { name: 'Medals', label: "Medals won in sports?" },
          { name: 'Career_sprt', label: "Wants to pursue a career in sports?" },
          { name: 'Act_sprt', label: "Regular in sports activities?" },
          { name: 'Fant_arts', label: "Loves creating fantasy paintings?" },
          { name: 'Won_arts', label: "Won art competitions?" },
          { name: 'Time_art', label: "Time utilized in arts (hours per week)" }
        ].map(({ name, label }) => (
          <div key={name} className="mb-2">
            <label>{label}</label>
            <input
              name={name}
              value={hobbyInputs[name]}
              onChange={handleInputChange}
              className="block w-full p-1 border"
            />
          </div>
        ))}
        <button type="submit">Predict Hobby</button>
      </form>
      {hobbyResult && <p><strong>Predicted Hobby:</strong> {hobbyResult}</p>}
    </div>
  );
};

export default HobbyPredictor;
