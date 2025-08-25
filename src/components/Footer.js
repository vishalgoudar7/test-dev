import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.png';
import google from '../assets/google.jpg';
import apple from '../assets/apple.jpg';
import incubatedAt from '../assets/ginserve.jpg';
import winnerOf from '../assets/1.png';
import supported1 from '../assets/digitalindia-logo.jpg';
import supported2 from '../assets/2.png';
import supported3 from '../assets/3.png';
import supported4 from '../assets/4.jpeg';
import supported5 from '../assets/5.jpeg';
import supported6 from '../assets/6.png';

import {
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaInstagram,
  FaYoutube,
  FaMapMarkerAlt,
  FaEnvelope,
  FaPhoneAlt
} from 'react-icons/fa';
import '../styles/Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-wrapper">
        <div className="footer-top">

          {/* Logo + About */}
          <div className="footer-column about-column">
            <div className="about-header">
              <img className="footer-logo" src={logo} alt="Devalaya Logo" />
              <h6 className="footer-tagline">WITH TRUST & DEVOTION</h6>
            </div>
            <p className="about-text">
              DEVALAYA is an innovative spiritual tech platform to fulfil the needs of Devotee & Pandit ji across the globe.
              We aim to bring local traditions into the global platform, so that rituals and traditions are not lost in the backdrop of modern advancements.
            </p>
          </div>

          {/* Support Links */}
          <div className="footer-column support-column">
            <h5>SUPPORT</h5>
            <div className="footer-links">
              <Link to="/" aria-label="Navigate to Home page">Home</Link>
              <Link to="/about" aria-label="Navigate to About page">About</Link>
              <Link to="/TermsAndConditions">Terms and Conditions</Link>
              <Link to="/CancellationPolicy">Cancellation Policy</Link>
              <Link to="/RefundPolicy">Refund Policy</Link>
              <Link to="/PrivacyPolicy">Privacy Policy</Link>
            </div>
          </div>

          {/* Contact */}
          <div className="footer-column contact-column contact-shift">
            <h5>CONTACT</h5>
            <div className="contact-item">
              <FaMapMarkerAlt className="contact-icon" />
              <div>
                <strong>Address:</strong>
                <p>CTS NO 4824/C7, S P Office Road,<br />Belagavi, Karnataka, 590016.</p>
              </div>
            </div>
            <div className="contact-item">
              <FaEnvelope className="contact-icon" />
              <div>
                <strong>Email:</strong>
                <p>info@devalayas.com</p>
              </div>
            </div>
            <div className="contact-item">
              <FaPhoneAlt className="contact-icon" />
              <div>
                <strong>Phone:</strong>
                <p>+91 8951269111<br />+91 8296443111</p>
              </div>
            </div>
          </div>

          {/* Social + Download */}
          <div className="footer-column download-column">
            <h5>FOLLOW US</h5>
            <div className="social-icons social-shift">
              <a href="https://facebook.com/devalayaonlinepujaapp/" target="_blank" rel="noreferrer"><FaFacebookF /></a>
              <a href="https://instagram.com/devalaya_app/" target="_blank" rel="noreferrer"><FaInstagram /></a>
              <a href="http://linkedin.com/in/devalayaonlinepujaapp" target="_blank" rel="noreferrer"><FaLinkedinIn /></a>
              <a href="https://twitter.com/devalayas_app" target="_blank" rel="noreferrer"><FaTwitter /></a>
              <a href="https://youtube.com/channel/UCRcWjnz7ybHWy2DfxlHlBpw" target="_blank" rel="noreferrer"><FaYoutube /></a>
            </div>

            <div className="get-app">
              <h5>GET THE APP</h5>
              <div className="download-buttons">
                <a href="https://play.google.com/store/apps/details?id=com.devalaya.devotee" target="_blank" rel="noopener noreferrer">
                  <img src={google} alt="Google Play" />
                </a>
                <a href="https://play.google.com/store/apps/details?id=com.devalaya.devotee" target="_blank" rel="noopener noreferrer">
                  <img src={apple} alt="App Store" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Honors Row */}
        <div className="footer-honors-row">
          <div className="honor-item">
            <h4>Incubated At</h4>
            <img src={incubatedAt} alt="Incubated At" />
          </div>
          <div className="honor-item">
            <h4>Supported By</h4>
            <div className="supported-logos">
              <img src={supported1} alt="Supported 1" />
              <img src={supported2} alt="Supported 2" />
              <img src={supported3} alt="Supported 3" />
              <img src={supported4} alt="Supported 4" />
              <img src={supported5} alt="Supported 5" />
              <img src={supported6} alt="Supported 6" />
            </div>
          </div>
          <div className="honor-item">
            <h4>Winner Of</h4>
            <img src={winnerOf} alt="Winner Of" />
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="footer-bottom">
          © {new Date().getFullYear()} Devalaya. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;