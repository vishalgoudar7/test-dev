import React from 'react';
import CountUp from 'react-countup';
import '../styles/AppInfoSection.css';

// Image imports
import downloadIcon from '../assets/downloadIcon.png';
import worshiperIcon from '../assets/worshiperIcon.png';
import pujaIcon from '../assets/pujaIcon.png';
import templeIcon from '../assets/templeIcon.png';

function AppInfoSection() {
  return (
    <div className="container-fluid bg-gradient-purple">
      <div className="row align-items-center info-section px-3">
        <div className="col-12 col-md-5 text-white px-3 py-4 text-center text-md-start">
          <p className="highlight-text">
            Trusted by more than 300k devotees in India and over 10k NRIs.
          </p>
          <h1 className="bellow-highlight-text">
            The Devotional & Astrology App Cherished By Many In India.
          </h1>
          <p className="fw-bold mt-4 text-dark">
            We embark on a mission to support one billion Indians in their spiritual and devotional
            endeavors, leading them toward a state of happiness, peace, and contentment.
          </p>
        </div>

        <div className="col-12 col-md-7 text-white px-3 py-4 text-center">
          <div className="row justify-content-center">

            {/* Card 1 - Downloads */}
            <div className="col-12 col-sm-6 col-lg-6 mb-4">
              <div className="app-card">
                <img src={downloadIcon} alt="Download Icon" className="app-icon" />
                <div className="counter-text">
                  <h2><CountUp end={50000} duration={100} /></h2>
                  <h5>+ Downloads</h5>
                </div>
                <p>Building Trust, One Crore Users Strong:<br />Your Journey, Our Commitment!</p>
              </div>
            </div>

            {/* Card 2 - Worshipers */}
            <div className="col-12 col-sm-6 col-lg-6 mb-4">
              <div className="app-card">
                <img src={worshiperIcon} alt="Worshiper Icon" className="app-icon" />
                <div className="counter-text">
                  <h2><CountUp end={350000} duration={100} /></h2>
                  <h5>+ Worshipers</h5>
                </div>
                <p>Have placed their trust in us during their<br />spiritual journey.</p>
              </div>
            </div>

            {/* Card 3 - Pujas */}
            <div className="col-12 col-sm-6 col-lg-6 mb-4">
              <div className="app-card">
                <img src={pujaIcon} alt="Puja Icon" className="app-icon" />
                <div className="counter-text">
                  <h2><CountUp end={100000} duration={100} /></h2>
                  <h5>+ Puja's</h5>
                </div>
                <p>Countless worshipers seek divine blessings<br />through our platform.</p>
              </div>
            </div>

            {/* Card 4 - Temples */}
            <div className="col-12 col-sm-6 col-lg-6 mb-4">
              <div className="app-card">
                <img src={templeIcon} alt="Temple Icon" className="app-icon" />
                <div className="counter-text">
                  <h2><CountUp end={800} duration={100} /></h2>
                  <h5>+ Temples</h5>
                </div>
                <p>Over 800+ active temples and devoted<br />priests trust our platform.</p>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

export default AppInfoSection;
