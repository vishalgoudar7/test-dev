// src/components/AppInfoSection.
import '../styles/AppInfoSection.css';
import downloadIcon from '../assets/downloadIcon.png';
import worshiperIcon from '../assets/worshiperIcon.png';
import pujaIcon from '../assets/pujaIcon.png';
import templeIcon from '../assets/templeIcon.png';
import '../styles/AppInfoSection.css';
import React from 'react'
import CountUp from 'react-countup';

function AppInfoSection() {
  return (
  <div className="container-fluid bg-gradient-purple">
  <div className="row align-items-center ps-5" style={{ minHeight: '450px' }}>
    <div className="col-12 col-md-5 text-white px-4 py-5">
      <p className="fw-bold ps-4 text-primary">
        Trusted by more than 300k devotees in India and over 10k NRIs.
      </p>
      <h1 className="fw-bold text-dark mt-2 ps-4">
        The Devotional & Astrology App Cherished By Many In India.
      </h1>
      <p className="fw-bold mt-4 ps-4 text-dark">
        We embark on a mission to support one billion Indians in their spiritual and devotional
        endeavors, leading them toward a state of happiness, peace, and contentment.
      </p>
    </div>
    <div className="col-12 col-md-7 text-white px-4 py-5 text-center">
  <div className="row">
    {/* Card 1 */}
    <div className="col-md-6 mb-4">
                <div
                  className="card text-white text-center p-1"
                  style={{
                    backgroundColor: "#ef5b0c",
                    border: "2px solid #E3DCD8",
                    borderRadius: "12px",
                    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.3)"
                  }}
                >
                  <div>
                    <div style={{ fontSize: "50px" }}>⬇️</div>
                  </div>

                  <div className="d-flex justify-content-center align-items-baseline mb-1">
                    <h2 className="mb-0 font-weight-bold mr-2">
                      <CountUp end={50000} duration={1000} /> {/* Rolling number */}
                    </h2>
                    <h5 className="mb-0">+ Downloads</h5>
                  </div>

                  <p className="mb-2" style={{ fontSize: "16px" }}>
                    Building Trust, One Crore Users Strong:<br/> Your Journey, Our Commitment!.
                  </p>
                </div>
              </div>

    {/* Card 2 */}
    <div className="col-md-6 mb-4">
                <div
                  className="card text-white text-center p-1"
                  style={{
                    backgroundColor: "#ef5b0c",
                    border: "2px solid #E3DCD8",
                    borderRadius: "12px",
                    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.3)"
                  }}
                >
                  <div>
                    <div style={{ fontSize: "50px" }}>🙏</div>
                  </div>

                  <div className="d-flex justify-content-center align-items-baseline mb-1">
                    <h2 className="mb-0 font-weight-bold mr-2">
                      <CountUp end={350000} duration={1000} /> {/* Rolling number */}
                    </h2>
                    <h5 className="mb-0"> +Worshipers</h5>
                  </div>

                  <p className="mb-2" style={{ fontSize: "16px" }}>
                    Have placed their trust in us during their<br /> spiritual journey.
                  </p>
                </div>
              </div>

    {/* Card 3 */}
    <div className="col-md-6 mb-4">
                <div
                  className="card text-white text-center p-1"
                  style={{
                    backgroundColor: "#ef5b0c",
                    border: "2px solid #E3DCD8",
                    borderRadius: "12px",
                    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.3)"
                  }}
                >
                  <div>
                    <div style={{ fontSize: "50px" }}>🪔</div>
                  </div>

                  <div className="d-flex justify-content-center align-items-baseline mb-1">
                    <h2 className="mb-0 font-weight-bold mr-2">
                      <CountUp end={100000} duration={1000} /> {/* Rolling number */}
                    </h2>
                    <h5 className="mb-0">+ Puja's</h5>
                  </div>

                  <p className="mb-2" style={{ fontSize: "16px" }}>
                    Countless worshipers seek divine, blessings<br/>at top Indian temples through our platform
                  </p>
                </div>
              </div>

    {/* Card 4 */}
              <div className="col-md-6 mb-4">
                <div
                  className="card text-white text-center p-1"
                  style={{
                    backgroundColor: "#ef5b0c",
                    border: "2px solid #E3DCD8",
                    borderRadius: "12px",
                    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.3)"
                  }}
                >
                  <div>
                    <div style={{ fontSize: "50px" }}>🛕</div>
                  </div>

                  <div className="d-flex justify-content-center align-items-baseline mb-1">
                    <h2 className="mb-0 font-weight-bold mr-2">
                      <CountUp end={800} duration={100} /> {/* Rolling number */}
                    </h2>
                    <h5 className="mb-0">+ Temples</h5>
                  </div>

                  <p className="mb-2" style={{ fontSize: "16px" }}>
                    Have placed their trust in over 800+ active<br />
                    temples and devoted priests.
                  </p>
                </div>
              </div>
      </div>
    </div>
  </div>
</div>
  )
}

export default AppInfoSection;

