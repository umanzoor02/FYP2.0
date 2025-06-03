import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { LOGIN_API } from "../api";
import "bootstrap/dist/css/bootstrap.min.css";

const LoginForm = () => {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await axios.post(LOGIN_API, formData);
      const { access, username } = response.data;

      localStorage.setItem("jwtToken", access);
      localStorage.setItem("username", username);

      navigate("/dashboard");
    } catch (err) {
      console.error("Login error:", err);
      setError("Invalid credentials. Please try again.");
    }
  };

  return (
    <div style={{ backgroundColor: "#f3e5f5", minHeight: "100vh", padding: "20px" }}>
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-6 col-lg-4">
            <div className="card shadow" style={{ borderRadius: "12px" }}>
              <div className="card-body">
                <h2 className="text-center mb-4" style={{ color: "#6f42c1" }}>
                  Welcome Back!
                </h2>
                <p className="text-center mb-4" style={{ color: "#6f42c1" }}>
                  Please enter your login details below
                </p>

                {error && <div className="alert alert-danger">{error}</div>}

                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label htmlFor="username" className="form-label" style={{ color: "#6f42c1" }}>
                      Username:
                    </label>
                    <input
                      type="text"
                      id="username"
                      name="username"
                      value={formData.username}
                      onChange={handleChange}
                      className="form-control"
                      required
                      style={{ borderColor: "#6f42c1", borderRadius: "8px" }}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="password" className="form-label" style={{ color: "#6f42c1" }}>
                      Password:
                    </label>
                    <input
                      type="password"
                      id="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      className="form-control"
                      required
                      style={{ borderColor: "#6f42c1", borderRadius: "8px" }}
                    />
                  </div>
                  <button
                    type="submit"
                    className="btn w-100"
                    style={{
                      backgroundColor: "#6f42c1",
                      borderColor: "#6f42c1",
                      color: "white",
                      borderRadius: "8px",
                      padding: "10px 20px",
                      fontSize: "1.1rem",
                      fontWeight: "500",
                      boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                    }}
                  >
                    Login
                  </button>
                </form>

                <p className="mt-3 text-center" style={{ color: "#6f42c1" }}>
                  Don't have an account?{" "}
                  <Link to="/register" className="text-decoration-none" style={{ color: "#6f42c1" }}>
                    Sign Up
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
