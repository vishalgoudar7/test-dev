import React, { useEffect } from 'react';

import bannerImage from '../assets/banner.png'; // Phone image
import backgroundImage from '../assets/background.png'; // Orange pattern background
import '../styles/HomePage.css';
import '../styles/CardSection.css'; // Keep if you have card-specific styles

import TempleList from '../components/TempleList';
import { getDevoteeProfile } from '../api/api';

import carouselImage1 from '../assets/d1.png';
import carouselImage2 from '../assets/d2.png';
import carouselImage3 from '../assets/d3.png';

import googlePlay from '../assets/googlePlay.png';
import appStore from '../assets/appStore.png';

const HomePage = () => {
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await getDevoteeProfile();
        console.log('Profile data:', data);
      } catch (err) {
        console.error('Error fetching profile:', err);
      }
    };

    fetchProfile();
  }, []);

  return (
    <div className="homepage">
      {/* Hero Section with Background */}
      <div className="homepage-hero-section">
        {/* This div now controls the max-width and centering of the content within the hero section */}
        <div className="homepage-content">
          <div className="homepage-row">
            {/* Left: Carousel and Text */}
            <div className="homepage-left">
              <h2 className="section-title">
                <span className="highlight-letter">D</span>ivine access. Anytime
              </h2>
              {/* This is the descriptive text you want to keep as is */}
              <p>Book Puja and Darshan with ease and Devotion. Deliver the Blessing from Temple to your home.</p>
              
              <div className="image-card-overlap">
                <img src={carouselImage1} alt="Temple 1" className="event-img img-left" />
                <img src={carouselImage2} alt="Temple 2" className="event-img img-center" />
                <img src={carouselImage3} alt="Temple 3" className="event-img img-right" />
              </div>
            </div>

            {/* Right: Banner + Download buttons */}
            <div className="homepage-right">
              <img src={bannerImage} alt="Phone Display" className="banner-img" />
              {/* This is the "Trusted by 50000+ people" text */}
              {/* <p className="trust-text">Trusted by 50000+ people</p> */}
              <div className="download-buttons">
                <a
                  href="https://play.google.com/store/apps/details?id=com.devalaya.devotee"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img src={googlePlay} alt="Google Play" />
                </a>
                <a
                  href="https://play.google.com/store/apps/details?id=com.devalaya.devotee"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img src={appStore} alt="App Store" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Temple List Section */}
      <div className="temple-list-section">
        {/* Use homepage-content to center this section too */}
        <div className="homepage-content">
           
            <TempleList />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
