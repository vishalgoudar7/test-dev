import React from 'react';
import '../styles/ContactUs.css';
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope } from 'react-icons/fa';

const ContactUs = () => {
  return (
    <div className="contactus-section">
      <div className="contactus-overlay">
        <h2 className="contactus-heading">LET'S GET IN TOUCH</h2>
        <div className="contactus-container">
          {/* Left Info Card */}
          <div className="contactus-info">
            <div className="info-item">
              <FaMapMarkerAlt className="info-icon" />
              <p>
                Classique Hts,Ayodhya Nagar,
               </p>
               <p className="adjust-line">Belagavi - 590016</p>
            </div>
            <div className="info-item">
              <FaPhoneAlt className="info-icon" />
              <p>+91 8951 269 111<br />+91 8296 443 111</p>
            </div>
            <div className="info-item">
              <FaEnvelope className="info-icon" />
               <p>info@devalayas.com</p>
            </div>
          </div>

          {/* Right Form Card */}
          <div className="contactus-form">
            <form>
              <input type="text" placeholder="Your Name" required />
              <input type="mobile number" placeholder="Mobile Number" required />
              <input type="email" placeholder="Your Email" required />
              <textarea placeholder="Your Message" required></textarea>
              <button type="submit">Send Message</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
