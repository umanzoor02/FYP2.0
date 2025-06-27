/* Frontend: DeepSeekChat.jsx */
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

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
      console.log('Token refreshed:', res.data.access);
      return res.data.access;
    } catch (err) {
      console.error('Token refresh error:', err.response?.data || err.message);
      setError(
        err.response?.data?.detail ||
        'Failed to refresh token. Please log in again.'
      );
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
      console.error('Generate quiz error:', err.response?.data || err.message);
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

      // Expect answers as an array of { question_number, answer }
      if (!Array.isArray(res.data.answers)) {
        throw new Error('Invalid answer format from server.');
      }
      setAnswers(res.data.answers);
    } catch (err) {
      console.error('Get answers error:', err.response?.data || err.message);
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
    if (questions.length === 0) {
      return <p style={{ color: 'red' }}>Error: Unable to parse quiz questions.</p>;
    }

    return questions.map((question, index) => {
      const answerObj = answers.find((ans) => ans.question_number === index + 1);
      return (
        <div
          key={index}
          style={{
            background: '#ffffff',
            border: '1px solid #ddd',
            borderRadius: '10px',
            padding: '15px',
            marginBottom: '15px',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
          }}
        >
          <p style={{ marginBottom: '10px', fontWeight: '500' }}>{question}</p>
          {answerObj && (
            <div
              style={{
                color: 'green',
                fontWeight: 'bold',
                whiteSpace: 'pre-wrap', // Handle multi-line answers
                marginTop: '10px',
              }}
            >
              Answer: {answerObj.answer}
            </div>
          )}
        </div>
      );
    });
  };

  return (
    <div style={{ maxWidth: 800, margin: 'auto', padding: 20, fontFamily: 'sans-serif' }}>
      <h2 style={{ textAlign: 'center', marginBottom: 20 }}>Generate a Personalized Quiz</h2>

      {error && (
        <div style={{ color: 'red', textAlign: 'center', marginBottom: 10 }}>
          {error}
          {error.includes('log in again') && (
            <button
              onClick={handleLogout}
              style={{
                marginLeft: 10,
                padding: '5px 10px',
                backgroundColor: '#dc3545',
                color: '#fff',
                border: 'none',
                borderRadius: 5,
                cursor: 'pointer',
              }}
            >
              Log Out
            </button>
          )}
        </div>
      )}
      {loading && (
        <div style={{ textAlign: 'center', marginBottom: 10 }}>Loading quiz...</div>
      )}
      {answerLoading && (
        <div style={{ textAlign: 'center', marginBottom: 10 }}>Fetching answers...</div>
      )}

      <div style={{ marginBottom: 20, textAlign: 'center' }}>
        <select
          aria-label="Select class"
          value={selectedClass}
          onChange={(e) => setSelectedClass(e.target.value)}
          style={{
            padding: 10,
            fontSize: '1rem',
            borderRadius: 5,
            border: '1px solid #ccc',
            marginRight: 10,
          }}
        >
          <option value="">Select Class</option>
          {classes.map((cls) => (
            <option key={cls} value={cls}>
              Class {cls}
            </option>
          ))}
        </select>

        {selectedClass &&
          subjects.map((s) => (
            <button
              key={s.key}
              onClick={() => handleGenerateQuiz(s.key)}
              disabled={loading}
              style={{
                margin: '5px',
                padding: '10px 15px',
                backgroundColor: loading ? '#ccc' : '#007bff',
                color: '#fff',
                border: 'none',
                borderRadius: '5px',
                cursor: loading ? 'not-allowed' : 'pointer',
                fontSize: '1rem',
              }}
            >
              {s.label}
            </button>
          ))}
      </div>

      {quiz && (
        <div style={{ marginTop: 30 }}>
          <h3 style={{ marginBottom: 20 }}>Quiz:</h3>
          {renderQuizCards()}
          <div style={{ textAlign: 'center' }}>
            {!answers.length && (
              <button
                onClick={handleGetAnswers}
                disabled={answerLoading}
                style={{
                  margin: '10px',
                  padding: '10px 20px',
                  backgroundColor: answerLoading ? '#ccc' : '#28a745',
                  color: '#fff',
                  border: 'none',
                  borderRadius: 5,
                  cursor: answerLoading ? 'not-allowed' : 'pointer',
                }}
              >
                Show Answers
              </button>
            )}
            <button
              onClick={handleReset}
              style={{
                margin: '10px',
                padding: '10px 20px',
                backgroundColor: '#dc3545',
                color: '#fff',
                border: 'none',
                borderRadius: 5,
                cursor: 'pointer',
              }}
            >
              Reset Quiz
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default DeepSeekChat;