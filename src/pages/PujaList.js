
// src/pages/PujaList.js
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/api';
import '../styles/PujaList.css';

const PujaList = () => {
  const [pujas, setPujas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState(''); // Added state for search term
  const navigate = useNavigate();  // Initialize useNavigate

  const BASE_URL = 'https://beta.devalayas.com';

  // Fetch puja data when component is mounted
  useEffect(() => {
    const fetchPujas = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          setError('Authentication token missing. Please log in first.');
          setLoading(false);
          return;
        }

        const response = await api.get('/api/v1/devotee/pooja/');
        setPujas(response.data?.results || []);
      } catch (err) {
        console.error('API Error:', err);
        setError('Failed to load puja list');
      } finally {
        setLoading(false);
      }
    };

    fetchPujas();
  }, []);

  // This function checks the image URL and ensures it is properly formed
  const getImageUrl = (imagePath) => {
    if (!imagePath) return null; // No image path
    return imagePath.startsWith('http') ? imagePath : `${BASE_URL}${imagePath}`;
  };

  // This function will navigate to the PujaDetails page
  const handlePujaClick = (id) => {
    navigate(`/puja/${id}`);  // Navigate to PujaDetails page
  };

  // Filter pujas based on search term
  const filteredPujas = pujas.filter((puja) =>
    puja.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (puja.included && puja.included.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="puja-list-container">
      <h2 className="puja-heading">AVAILABLE PUJA'S</h2>
      
      {/* Search box for filtering pujas */}
      <div className="search-box">
        <input
          type="text"
          placeholder="Search Pujas..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
        <button
          onClick={() => {}}
          className="search-button"
        >
          Search
        </button>
      </div>

      {loading && <p>Loading...</p>}
      {error && <p className="error">{error}</p>}

      <div className="puja-cards">
        {filteredPujas.length === 0 ? (
          <p>No Pujas found for the search term.</p>
        ) : (
          filteredPujas.map((puja) => (
            <div
              className="puja-card"
              key={puja.id}
              onClick={() => handlePujaClick(puja.id)}  // Add click event for puja card
            >
              {/* Handle images and fallback if image doesn't exist */}
              {puja.images && puja.images[0]?.image ? (
                <img
                  src={getImageUrl(puja.images[0].image)}  // Use the first image from the 'images' array
                  alt={puja.name}
                  className="puja-image"
                />
              ) : (
                <div className="no-image">No Image</div>  // Fallback for no image
              )}
              <h3>{puja.name || 'Untitled Puja'}</h3>

              {/* Use the 'included' field for description */}
              <p>{puja.included ? puja.included : 'No description available.'}</p>

              {/* Use the 'cost' field for price */}
              <p><strong>Price:</strong> ₹{puja.cost || 'N/A'}</p>

              <button className="book-button">PARTICIPATE</button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default PujaList;
