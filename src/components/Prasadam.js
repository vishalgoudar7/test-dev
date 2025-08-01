import React, { useEffect, useState } from 'react';
import api from '../api/api';
import '../styles/Prasadam.css';

const Prasadam = () => {
  const [prasadamList, setPrasadamList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPrasadam = async () => {
      try {
        const response = await api.get('/api/v1/devotee/prasadam/');
        if (Array.isArray(response.data.results)) {
          setPrasadamList(response.data.results);
        } else {
          setError('Unexpected API response format.');
        }
      } catch (err) {
        console.error('Prasadam API Error:', err);
        setError('Failed to load prasadam data.');
      } finally {
        setLoading(false);
      }
    };

    fetchPrasadam();
  }, []);

  const addToCart = (item) => {
  try {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const existingItem = cart.find((cartItem) => cartItem.id === item.id);

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      const poojaPrasadam = item.pooja_prasadam || {};
      cart.push({ 
        ...item, 
        quantity: 1, 
        cost: poojaPrasadam.cost, 
        final_total: poojaPrasadam.original_cost 
      });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    window.dispatchEvent(new Event('storage'));
    // setCartDrawerOpen(true); // ❌ remove this line if no drawer
  } catch (error) {
    console.error('Failed to add to cart:', error);
    alert('Could not add item to cart.');
  }
};

  if (error) return <div className="prasadam-error">{error}</div>;
  if (!prasadamList.length) return <div className="prasadam-error">No prasadam available.</div>;

  return (
    <div className="prasadam-container">
      {prasadamList.map((prasadam) => {
        const poojaPrasadam = prasadam.pooja_prasadam || {};
        const imageUrl = prasadam.temple?.images?.[0]?.image || poojaPrasadam.temple?.images?.[0]?.image;
        const god = poojaPrasadam.god || {};
        const temple = prasadam.temple || poojaPrasadam.temple || {};

        return (
          <div key={prasadam.id} className="prasadam-card">
            <h3>🪔 {prasadam.name || poojaPrasadam.name || 'Prasadam'}</h3>

            {imageUrl && (
              <img
                src={imageUrl}
                alt={prasadam.name}
                className="prasadam-image"
                onError={(e) => {
                  console.error('Image failed to load:', imageUrl);
                  e.target.style.display = 'none';
                }}
              />
            )}

            <p><strong>Details:</strong> {prasadam.details || poojaPrasadam.details || 'N/A'}</p>
            <p><strong>Includes:</strong> {poojaPrasadam.included || 'N/A'}</p>
            <p><strong>Benefits:</strong> {poojaPrasadam.excluded || '-'}</p>
            <p><strong>Temple:</strong> {temple.name || 'N/A'}</p>
            <p><strong>Cost:</strong> ₹ {poojaPrasadam.original_cost || poojaPrasadam.cost || 'N/A'}</p>
            {/* <p><strong>God:</strong> {god.name || '—'}</p> */}

            <button
              className="prasadam-add-btn"
              onClick={() => addToCart(prasadam)}
            >
              ADD TO CART ➡️
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default Prasadam;
