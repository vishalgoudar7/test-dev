// src/components/ContactUs.js
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
              <div>
                <p>Classique Hts, Ayodhya Nagar,</p>
                <p className="adjust-line">Belagavi - 590016</p>
              </div>
            </div>

            <div className="info-item">
              <FaPhoneAlt className="info-icon" />
              <p>
                +91 8951 269 111<br />
                +91 8296 443 111
              </p>
            </div>

            <div className="info-item">
              <FaEnvelope className="info-icon" />
              <p>info@devalayas.com</p>
            </div>
          </div>

          {/* Right Form Card */}
          <div className="contactus-form">
            <form
              action="https://formsubmit.co/info@devalayas.com"
              method="POST"
              target="_blank"
            >
              {/* Hidden fields for FormSubmit */}
              <input
                type="hidden"
                name="_cc"
                value="preetham2u@gmail.com,arthur.ps@gmail.com,info@devalayas.com"
              />
              <input
                type="hidden"
                name="_subject"
                value="DEVALAYAS.IN New Form Submission!"
              />

              {/* Form Fields */}
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                required
              />
              <input
                type="tel"
                name="phone"
                placeholder="Mobile Number"
                required
              />
              <input
                type="email"
                name="email"
                placeholder="Your Email"
                required
              />
              <textarea
                name="message"
                placeholder="Your Message"
                rows="4"
                required
              ></textarea>
              <button type="submit">Send Message</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;