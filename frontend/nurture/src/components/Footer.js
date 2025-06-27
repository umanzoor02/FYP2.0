import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const Footer = () => {
  return (
    <footer className="bg-light py-3 mt-4">
      <div className="container">
        <div className="row text-center text-md-start">
          <div className="col-md-4 mb-3">
            <h6 className="fw-semibold mt-4" style={{ color: '#7453DB' }}>
              👨‍👩‍👧‍👦 Made with ❤️ for Parents Who Care
            </h6>

            <p className="mb-0 small ms-2 text-muted">
                  Every feature we create is designed with your child’s future in mind.
            </p>

          </div>
          <div className="col-md-4 mb-3">
            <h6 className="fw-semibold mt-4">Contact Us</h6>
            <ul className="list-unstyled mb-0">
              <li className='mb-0 small ms-2 text-muted'>Follow us on:<a href='https://www.instagram.com/mynurtureai?utm_source=qr&igsh=ZTNrOGdkMTAzZDR4' className="text-decoration-none"> Instagram 📸</a> </li>
              <li className='mb-0 small ms-2 text-muted'>Join our community<a href='https://www.facebook.com/groups/704485105546898/?ref=share&mibextid=CTbP7E'className="text-decoration-none"> 🌐</a> </li>
            
  
           
              
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
