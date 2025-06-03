// src/components/Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const token = localStorage.getItem('jwtToken');

  return (
    <nav
      className="navbar navbar-expand-lg"
      style={{ backgroundColor: '#e6e6fa' }} // light lavender
    >
      <div className="container-fluid">
        <Link className="navbar-brand fw-bold text-dark" to="/">Nurture AI</Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            {!token ? (
              <>
                <li className="nav-item">
                  <Link className="nav-link text-dark" to="/register">Register</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link text-dark" to="/login">Login</Link>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link className="nav-link text-dark" to="/add-child">Add Child</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link text-dark" to="/logout">Logout</Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
