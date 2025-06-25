

// import React from 'react';
// import '../styles/ContactUs.css';
// import bgImage from '../assets/imagecopy.jpg'; // Replace with your actual image path

// const ContactUs = () => {
//   return (
//     <section className="contact-section">
//       <div className="contact-wrapper" style={{ backgroundImage: `url(${bgImage})` }}>
//         <div className="form-card">
//           <h2>Contact Us</h2>
//           <form>
//             <input type="text" placeholder="Enter your Name" required />
//             <input type="email" placeholder="Enter a valid email address" required />
//             <textarea placeholder="Enter your message" rows="4" required />
//             <button type="submit">SUBMIT</button>
//           </form>
//         </div>

//         <div className="info-card">
//           <div className="info-item">
//             <h4>📞 CALL US</h4>
//             <p>1 (234) 567-891,<br />1 (234) 987-654</p>
//           </div>
//           <div className="info-item">
//             <h4>📍 LOCATION</h4>
//             <p>121 Rock Street, 21 Avenue,<br />New York, NY 92103-9000</p>
//           </div>
//           <div className="info-item">
//             <h4>⏰ HOURS</h4>
//             <p>Mon – Fri … 11 am – 8 pm,<br />Sat, Sun … 6 am – 8 pm</p>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default ContactUs;


// import React from 'react';
// import '../styles/ContactUs.css';
// import bgImage from '../assets/shiv.jpeg'; // Replace with your actual image path

// const ContactUs = () => {
//   return (
//     <section className="contact-section">
//       <div className="contact-box">
//         <div className="form-card">
//           <h2>Contact Us</h2>
//           <form>
//             <input type="text" placeholder="Enter your Name" required />
//             <input type="email" placeholder="Enter a valid email address" required />
//             <textarea placeholder="Enter your message" rows="4" required />
//             <button type="submit">SUBMIT</button>
//           </form>
//         </div>

//         <div className="image-side">
//           <img src={bgImage} alt="Decor" />
//         </div>

//         <div className="info-card">
//           <div className="info-item">
//             <h4>📞 CALL US</h4>
//             <p>1 (234) 567-891,<br />1 (234) 987-654</p>
//           </div>
//           <div className="info-item">
//             <h4>📍 LOCATION</h4>
//             <p>121 Rock Street, 21 Avenue,<br />New York, NY 92103-9000</p>
//           </div>
//           <div className="info-item">
//             <h4>⏰ HOURS</h4>
//             <p>Mon – Fri … 11 am – 8 pm,<br />Sat, Sun … 6 am – 8 pm</p>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default ContactUs;




// src/components/ContactUs.js
import React from 'react';

import '../styles/ContactUs.css';  // ✅ correct if CSS is in src/styles/

import bgImage from '../assets/bac.webp'; // Make sure the image is placed here

const ContactUs = () => {
  return (
    <div className="contact-wrapper">
      <div className="background-image">
        <img src={bgImage} alt="Shiva" />
      </div>

      <div className="contact-card">
        <div className="form-side">
          <h2>Contact Us</h2>
          <form>
            <input type="text" placeholder="Enter your Name" required />
            <input type="email" placeholder="Enter a valid email address" required />
            <textarea placeholder="Enter your message" rows="4" required></textarea>
            <button type="submit">Submit</button>
          </form>
        </div>
      </div>

      <div className="info-card">
        <div>
          <h4>📍ADDRESS</h4>
          <p>CTS NO 4824/C7,<br />S P OFFICE ROAD, BELAGAVI,<br />Karnataka, 590016</p>
        </div>
        <div>
          <h4>📞 CALL US</h4>
          <p>+91 8951 269 111<br />+91 8296 443 111</p>
        </div>
        <div>
         <h4>📧 EMAIL</h4>
    <p>info@devalayas.com</p>
        </div>
      </div>
    </div>
     
  );
};

export default ContactUs;
