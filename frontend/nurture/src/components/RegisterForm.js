import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { REGISTER_API } from "../api";
import "bootstrap/dist/css/bootstrap.min.css";

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

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
      await axios.post(REGISTER_API, formData);
      navigate("/login");
    } catch (err) {
      if (err.response && err.response.data) {
        const errors = err.response.data;
        let msg = "";
        for (let field in errors) msg += `${field}: ${errors[field]}\n`;
        setError(msg);
      } else {
        setError("Registration failed. Please try again.");
      }
    }
  };

  return (
    <div style={{ backgroundColor: "#f3e5f5", minHeight: "100vh", padding: "20px" }}>
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-6 col-lg-4">
            <div
              className="card shadow"
              style={{
                border: "none",
                borderRadius: "12px",
                backgroundColor: "white",
              }}
            >
              <div className="card-body">
                <h2 className="card-title text-center mb-4" style={{ color: "#6f42c1" }}>
                  Create Your Account
                </h2>
                <p className="text-center mb-4" style={{ color: "#6f42c1" }}>
                  Provide the following details to get started
                </p>

                {error && (
                  <div className="alert alert-danger" role="alert" style={{ whiteSpace: "pre-line" }}>
                    {error}
                  </div>
                )}

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
                    <label htmlFor="email" className="form-label" style={{ color: "#6f42c1" }}>
                      Email:
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
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
                    Sign Up
                  </button>
                </form>

                <p className="mt-3 text-center" style={{ color: "#6f42c1" }}>
                  Already have an account?{" "}
                  <Link to="/login" className="text-decoration-none" style={{ color: "#6f42c1" }}>
                    Sign In
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

export default RegisterForm;
