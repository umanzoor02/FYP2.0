import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const Footer = () => {
  return (
    <footer className="bg-light py-3 mt-4">
      <div className="container">
        <div className="row text-center text-md-start">
          <div className="col-md-4 mb-3">
            <h5>About Us</h5>
            <p className="mb-0">We are a company dedicated to providing the best service in the industry.</p>
          </div>
          <div className="col-md-4 mb-3">
            <h5>Contact Us</h5>
            <ul className="list-unstyled mb-0">
              <li>Email: info@example.com</li>
              <li>Phone: +123 456 7890</li>
              <li>Address: 123 Main St, Anytown, USA</li>
            </ul>
          </div>
          <div className="col-md-4 d-flex align-items-center justify-content-center justify-content-md-end">
            <small className="text-muted">&copy; {new Date().getFullYear()} Your Company. All rights reserved.</small>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
