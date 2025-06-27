import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

function DeepSeekChat() {
  const [selectedClass, setSelectedClass] = useState('');
  const [quiz, setQuiz] = useState('');
  const [answers, setAnswers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [answerLoading, setAnswerLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000';
  const classes = ['1', '2', '3', '4', '5', '6', '7', '8'];
  const subjects = [
    { key: 'english', label: 'English' },
    { key: 'math', label: 'Maths' },
    { key: 'science', label: 'Science' },
    { key: 'cognitive', label: 'Cognitive Nourishing' },
  ];

  const refreshToken = async () => {
    const refresh = localStorage.getItem('refreshToken');
    if (!refresh) {
      setError('No refresh token available. Please log in again.');
      navigate('/login');
      return null;
    }
    try {
      const res = await axios.post(`${API_BASE_URL}/api/token/refresh/`, { refresh });
      localStorage.setItem('jwtToken', res.data.access);
      return res.data.access;
    } catch (err) {
      setError(err.response?.data?.detail || 'Failed to refresh token. Please log in again.');
      navigate('/login');
      return null;
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('jwtToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('username');
    setError('Session expired. Please log in again.');
    navigate('/login');
  };

  const handleGenerateQuiz = async (subjectKey) => {
    if (!selectedClass) {
      setError('Please select a class before generating a quiz.');
      return;
    }
    setLoading(true);
    setError('');
    setAnswers([]);
    setQuiz('');

    let token = localStorage.getItem('jwtToken');
    if (!token || !/^[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+$/.test(token)) {
      setError('Invalid or missing token. Please log in again.');
      setLoading(false);
      navigate('/login');
      return;
    }

    try {
      let res = await axios.post(
        `${API_BASE_URL}/edu/ai/generate-quiz/`,
        { class: selectedClass, subject: subjectKey },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (res.status === 401) {
        token = await refreshToken();
        if (!token) {
          setLoading(false);
          return;
        }
        res = await axios.post(
          `${API_BASE_URL}/edu/ai/generate-quiz/`,
          { class: selectedClass, subject: subjectKey },
          { headers: { Authorization: `Bearer ${token}` } }
        );
      }

      setQuiz(res.data.quiz);
    } catch (err) {
      setError(
        err.response?.status === 401
          ? 'Authentication failed. Please log in again.'
          : err.response?.data?.error || 'Network error: Unable to connect to the server.'
      );
      if (err.response?.status === 401) navigate('/login');
    } finally {
      setLoading(false);
    }
  };

  const handleGetAnswers = async () => {
    if (!quiz) {
      setError('No quiz available to fetch answers for.');
      return;
    }
    setAnswerLoading(true);
    setError('');

    let token = localStorage.getItem('jwtToken');
    if (!token || !/^[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+$/.test(token)) {
      setError('Invalid or missing token. Please log in again.');
      setAnswerLoading(false);
      navigate('/login');
      return;
    }

    try {
      let res = await axios.post(
        `${API_BASE_URL}/edu/ai/get-answers/`,
        { quiz },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (res.status === 401) {
        token = await refreshToken();
        if (!token) {
          setAnswerLoading(false);
          return;
        }
        res = await axios.post(
          `${API_BASE_URL}/edu/ai/get-answers/`,
          { quiz },
          { headers: { Authorization: `Bearer ${token}` } }
        );
      }

      if (!Array.isArray(res.data.answers)) throw new Error('Invalid answer format from server.');
      setAnswers(res.data.answers);
    } catch (err) {
      setError(
        err.response?.status === 401
          ? 'Authentication failed. Please log in again.'
          : err.response?.data?.error || 'Failed to fetch answers. Please try again.'
      );
      if (err.response?.status === 401) navigate('/login');
    } finally {
      setAnswerLoading(false);
    }
  };

  const handleReset = () => {
    setQuiz('');
    setAnswers([]);
    setSelectedClass('');
    setError('');
  };

  const renderQuizCards = () => {
    const questions = quiz.split(/\n(?=\d+\.)/).filter((q) => q.trim() !== '');
    if (questions.length === 0) return <p className="text-danger">Error: Unable to parse quiz questions.</p>;

    return questions.map((question, index) => {
      const answerObj = answers.find((ans) => ans.question_number === index + 1);
      return (
        <div className="card mb-3 shadow-sm" key={index}>
          <div className="card-body">
            <p className="card-text fw-medium">{question}</p>
            {answerObj && <div className="text-success fw-bold mt-2">Answer: {answerObj.answer}</div>}
          </div>
        </div>
      );
    });
  };

  return (
    <div className="container py-5">
      

      <h2 className="text-center mt-4 mb-4">Generate a Personalized Quiz</h2>

      {error && (
        <div className="alert alert-danger text-center">
          {error}
          {error.includes('log in again') && (
            <button className="btn btn-sm btn-light ms-2" onClick={handleLogout}>Log Out</button>
          )}
        </div>
      )}

      {loading && <div className="text-center text-primary mb-3">Loading quiz...</div>}
      {answerLoading && <div className="text-center text-primary mb-3">Fetching answers...</div>}

      <div className="text-center mb-3">
        <select
          className="form-select w-auto d-inline-block me-2"
          value={selectedClass}
          onChange={(e) => setSelectedClass(e.target.value)}
        >
          <option value="">Select Class</option>
          {classes.map((cls) => (
            <option key={cls} value={cls}>Class {cls}</option>
          ))}
        </select>

        {selectedClass && subjects.map((s) => (
          <button
            key={s.key}
            className="btn btn-primary m-1"
            onClick={() => handleGenerateQuiz(s.key)}
            disabled={loading}
            style={{ backgroundColor: '#7453DB', borderColor: '#7453DB' }}
          >
            {s.label}
          </button>
        ))}
      </div>

      {quiz && (
        <div className="mt-4">
          <h4 className="mb-3">Quiz:</h4>
          {renderQuizCards()}
          <div className="text-center mt-3">
            {!answers.length && (
              <button
                className="btn btn-success m-2"
                onClick={handleGetAnswers}
                disabled={answerLoading}
              >
                Show Answers
              </button>
            )}
            <button className="btn btn-danger m-2" onClick={handleReset}>Reset Quiz</button>
          </div>
        </div>
      )}

      
    </div>
  );
}

export default DeepSeekChat;
