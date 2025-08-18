import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../api/api';
import '../styles/SplpujaDetails.css';
import { useNavigate } from 'react-router-dom';

const SplpujaDetails = () => {
  const { categoryId, subCategoryId } = useParams();
  const [poojas, setPoojas] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPoojas = async () => {
      try {
        const response = await api.get('/api/v1/devotee/pooja/', {
          params: {
            category: categoryId,
            sub_category: subCategoryId,
          },
        });
        setPoojas(response.data.results || []);
      } catch (error) {
        console.error('Error fetching poojas:', error);
      } finally {
        setLoading(false);
      }
    };

    if (categoryId && subCategoryId) {
      fetchPoojas();
    }
  }, [categoryId, subCategoryId]);

  const handleParticipateClick = (pooja) => {
    const currentCart = JSON.parse(localStorage.getItem('cart')) || [];
    const existingItemIndex = currentCart.findIndex(item => item.id === pooja.id);

    const itemDetailsForCart = (pooja.temple && pooja.temple.city && pooja.temple.district)
      ? `${pooja.temple.city}, ${pooja.temple.district}`
      : '';

    const newItem = {
      id: pooja.id,
      name: pooja.name,
      city: pooja.temple?.city,
      district: pooja.temple?.district,
      images: pooja.images,
      quantity: 1,
      cost: pooja.original_cost || 100,
      final_total: pooja.original_cost || 100,
      details: itemDetailsForCart,
    };

    if (existingItemIndex > -1) {
      currentCart[existingItemIndex].quantity += 1;
      Object.assign(currentCart[existingItemIndex], newItem);
    } else {
      currentCart.push(newItem);
    }

    localStorage.setItem('cart', JSON.stringify(currentCart));
    window.dispatchEvent(new Event('storage'));
    navigate('/cart');
  };

  if (loading) return <p className="loading">Loading...</p>;

  return (
    <div className="splpuja-wrapper">
      {poojas.length === 0 ? (
        <p>No poojas available.</p>
      ) : (
        poojas.map((pooja) => {
          // Mock rating data (replace with API data if available)
          const rating = pooja.rating || 5.0;
          const devoteeCount = pooja.devotee_count || '10002+';

          return (
            <div className="splpuja-card" key={pooja.id}>
              {/* 🔖 Top Left Label */}
              <div className="splpuja-top-label">
                {pooja.puja_type || 'Special Puja'}
              </div>

              {/* Image */}
              <img
                src={pooja.images?.[0]?.image || 'https://via.placeholder.com/350x250'}
                alt={pooja.name}
                className="splpuja-image"
                onError={(e) => {
                  e.target.src = 'https://via.placeholder.com/350x250?text=No+Image';
                }}
              />

              {/* Content */}
              <div className="splpuja-content">
                <h3 className="splpuja-title">{pooja.name}</h3>

                {/* Location */}
                {pooja.temple && pooja.temple.city && pooja.temple.district && (
                  <div className="splpuja-location">
                    {pooja.temple.city}, {pooja.temple.district}
                  </div>
                )}

               

                {/* Description */}
                <ul className="splpuja-description">
                  {pooja.details
                    ?.split('.')
                    .filter(line => line.trim())
                    .map((point, idx) => (
                      <li key={idx}>• {point.trim()}</li>
                    ))}
                </ul>
                 {/* Rating & Devotees */}
                <div className="splpuja-rating">
                  <div className="rating-devotees">
                    <span className="devotees-icon">👥</span>
                    <span className="devotees-count">{devoteeCount} Devotees</span>
                  </div>
                  <div className="rating-stars">
                    <span className="stars">★★★★★</span>
                    <span className="rating-score">({rating.toFixed(1)}/5)</span>
                  </div>
                </div>

                {/* Bottom Section */}
                <div className="splpuja-bottom">
                  <span className="splpuja-price">₹ {pooja.original_cost || 'N/A'}</span>
                  <button
                    className="splpuja-button"
                    onClick={() => handleParticipateClick(pooja)}
                  >
                    <span className="plus-icon">+</span> Participate
                  </button>
                </div>
              </div>
            </div>
          );
        })
      )}
    </div>
  );
};

export default SplpujaDetails;