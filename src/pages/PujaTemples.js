import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import api from '../api/api';

const PujaTemples = () => {
  const [searchParams] = useSearchParams();
  const pujaName = searchParams.get('puja');
  const [temples, setTemples] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTemples = async () => {
      try {
        const response = await api.get('/api/v1/devotee/pooja/');
        const pujaList = response.data?.results || [];

        const templeMap = {};
        pujaList.forEach((puja) => {
          if (
            puja.name === pujaName &&
            puja.temple &&
            puja.temple.id &&
            puja.temple.name
          ) {
            templeMap[puja.temple.id] = { ...puja.temple, pujaId: puja.id, cost: puja.amount || 100 };
          }
        });
        setTemples(Object.values(templeMap));
      } finally {
        setLoading(false);
      }
    };
    fetchTemples();
  }, [pujaName]);

  // ✅ UPDATED LINE: Store selected temple in cart and navigate to /cart
  const handleParticipate = (temple) => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];

    const alreadyExists = cart.find(item => item.id === temple.id);
    if (!alreadyExists) {
      const item = {
        id: temple.id,
        name: temple.name,
        city: temple.city,
        district: temple.district,
        images: temple.images,
        quantity: 1,
        cost: temple.cost || 100,
        final_total: temple.cost || 100,
        details: `${temple.city}, ${temple.district}`
      };
      cart.push(item);
      localStorage.setItem('cart', JSON.stringify(cart));
      window.dispatchEvent(new Event('storage'));
    }

    navigate('/cart');
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>{pujaName} is available at:</h2>
      <div style={styles.cardsWrapper}>
        {loading ? (
          <div>Loading...</div>
        ) : temples.length === 0 ? (
          <p>No temples found for this puja.</p>
        ) : (
          temples.map((temple, idx) => (
            <div key={temple.id || idx} style={styles.card}>
              <div style={styles.cardContent}>
                {temple.images && temple.images.length > 0 ? (
                  <img
                    src={temple.images[0].image}
                    alt={temple.name}
                    style={styles.image}
                    onError={(e) => {
                      e.target.src = 'https://via.placeholder.com/300x140?text=No+Image';
                    }}
                  />
                ) : (
                  <div style={styles.noImage}>No Image</div>
                )}
                <div style={styles.templeName}>{temple.name}</div>
                <div style={styles.templeLocation}>
                  {temple.city}, {temple.district}
                </div>
              </div>
              <div style={styles.buttonGroup}>
                <button
                  style={styles.viewButton}
                  onClick={() => navigate(`/puja-details/${temple.pujaId}`)}
                >
                  View Details
                </button>
                <button
                  style={styles.participateButton}
                  onClick={() => handleParticipate(temple)}
                >
                  Participate
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

const styles = {
  container: {
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
    backgroundColor: '#fef5ec',
    minHeight: '100vh',
  },
  heading: {
    textAlign: 'center',
    marginBottom: '20px',
    fontSize: '35px',
    color: 'black',
  },
  cardsWrapper: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
    gap: '20px',
  },
  card: {
    background: '#fff',
    borderRadius: '12px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
    padding: '10px',
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    height: '340px',
  },
  cardContent: {
    flexGrow: 1,
  },
  image: {
    width: '100%',
    height: '140px',
    objectFit: 'contain',
    borderRadius: '10px',
    marginBottom: '10px',
    display: 'block',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  noImage: {
    height: '140px',
    background: '#eee',
    borderRadius: '10px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#999',
    fontSize: '14px',
    marginBottom: '10px',
  },
  templeName: {
    fontWeight: 'bold',
    fontSize: '16px',
    color: '#333',
    marginBottom: '4px',
  },
  templeLocation: {
    color: '#666',
    fontSize: '14px',
    marginBottom: '10px',
  },
  buttonGroup: {
    display: 'flex',
    justifyContent: 'space-between',
    gap: '10px',
    marginTop: '10px',
  },
  viewButton: {
    flex: 1,
    padding: '8px',
    fontSize: '14px',
    borderRadius: '6px',
    border: 'none',
    backgroundColor: '#ff9933',
    color: '#fff',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  },
  participateButton: {
    flex: 1,
    padding: '8px',
    fontSize: '14px',
    borderRadius: '6px',
    border: 'none',
    backgroundColor: '#f44336',
    color: '#fff',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  },
};

export default PujaTemples;
