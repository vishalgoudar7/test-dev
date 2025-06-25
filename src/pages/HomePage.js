
// src/pages/HomePage.js
import React from 'react';
import bannerImage from '../assets/banner.png';
import '../styles/HomePage.css';
import '../styles/CardSection.css';
import ExploreTemples from '../components/ExploreTemples';
import carouselImage from '../assets/11.jpg';
import carouselImage1 from '../assets/22.jpg';
import carouselImage2 from '../assets/33.jpg';
import googlePlay from '../assets/googlePlay.png';
import appStore from '../assets/appStore.png';

const HomePage = () => {
  return (
    <>
      <div className="homepage">
        <div className="homepage-container row mx-0">
          {/* Left: Carousel and Title */}
          <div className="homepage-left col-md-6 d-flex flex-column justify-content-center align-items-center">
            <div className="heading_container">
              <h2>Ongoing Event's</h2>
            </div>
            <div className="event-carousel-box p-3 shadow rounded w-100">
              <div id="eventCarousel" className="carousel slide" data-bs-ride="carousel">
                <div className="carousel-inner">
                  <div className="carousel-item active">
                    <img src={carouselImage} className="d-block w-100" alt="Slide 1" />
                  </div>
                  <div className="carousel-item">
                    <img src={carouselImage1} className="d-block w-100" alt="Slide 2" />
                  </div>
                  <div className="carousel-item">
                    <img src={carouselImage2} className="d-block w-100" alt="Slide 3" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Banner Image and App Links */}
          <div className="homepage-right col-md-6 d-flex align-items-center justify-content-center">
            <div className="image-wrapper">
              <img src={bannerImage} alt="Phone Display" className="phone-image img-fluid" />
              <div className="app-download-container">
                <div className="app-download-buttons d-flex gap-3 mt-4">
                  <a href="https://play.google.com/store/apps/details?id=com.devalaya.devotee" target="_blank" rel="noopener noreferrer">
                    <img src={googlePlay} alt="Download on Google Play" style={{ width: '150px', height: '45px' }} />
                  </a>
                  <a href="https://play.google.com/store/apps/details?id=com.devalaya.devotee" target="_blank" rel="noopener noreferrer">
                    <img src={appStore} alt="Download on App Store" style={{ width: '150px', height: '45px' }} />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Explore Temples Section */}
      <ExploreTemples />
    </>
  );
};

export default HomePage;
