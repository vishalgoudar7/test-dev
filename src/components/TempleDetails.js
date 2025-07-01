import React, { useEffect, useState } from 'react';
import CartDrawer from './CartDrawer';
import { useParams,} from 'react-router-dom';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import '../styles/TempleDetails.css';
import api from '../api/api';

// <<<<<<< HEAD
// =======



// >>>>>>> c9daa4caa3ed45011e36037f51c3f4ad3e574080
const TempleDetails = () => {
  const { id } = useParams();
  const [temple, setTemple] = useState(null);
  const [tabNo, setTabNo] = useState(2); // default: Pooja
  const [search, setSearch] = useState('');
  const [filteredData, setFilteredData] = useState([]);
  const [cartDrawerOpen, setCartDrawerOpen] = useState(false);
  // Add to cart handler
  const handleAddToCart = (item) => {
    // Get cart from localStorage
    let cart = [];
    try {
      cart = JSON.parse(localStorage.getItem('cart')) || [];
    } catch {
      cart = [];
    }
    // Prevent duplicates
    if (!cart.find((c) => c.id === item.id)) {
      cart.push(item);
      localStorage.setItem('cart', JSON.stringify(cart));
      // Trigger storage event for other tabs/components
      window.dispatchEvent(new Event('storage'));
    }
    setCartDrawerOpen(true);
  };

  const token = 'c91ae32509fa4ce4e8c21aa4a86118100f97c4f2';

  useEffect(() => {
    const fetchTempleAndPoojas = async () => {
      try {
        const templeRes = await api.get(`/api/v1/devotee/temple/${id}`, {
          headers: { Authorization: `Token ${token}` },
        });
        setTemple(templeRes.data);

        const poojaRes = await api.get(`/api/v1/devotee/pooja/?temple=${id}`, {
          headers: { Authorization: `Token ${token}` },
        });
        setFilteredData(poojaRes.data.results || []);
      } catch (err) {
        console.error('Error loading data:', err);
      }
    };

    fetchTempleAndPoojas();
  }, [id]);

  const handleTabSwitch = (tab) => {
    setTabNo(tab);
    setSearch('');
    if (tab === 2) {
      handleSearch('');
    } else {
      setFilteredData([]);
    }
  };

  const handleSearch = async (query = search) => {
    try {
      const res = await api.get(`/api/v1/devotee/pooja/?temple=${id}&search=${query}`, {
        headers: { Authorization: `Token ${token}` },
      });
      setFilteredData(res.data.results || []);
    } catch (err) {
      console.error('Search failed:', err);
    }
  };

  const renderCards = (data) => {
    // Group data into rows of 3
    const rows = [];
    for (let i = 0; i < data.length; i += 3) {
      rows.push(data.slice(i, i + 3));
    }
    return rows.map((row, rowIdx) => (
      <div className="row" key={rowIdx}>
        {row.map((p) => (
          <div className="col-md-4 mb-4" key={p.id}>
            <div className="card h-100 shadow-sm border-0 rounded-3" style={{ background: '#fffaf6' }}>
              <div className="card-body d-flex flex-column justify-content-between">
                <h5 className="fw-bold text-danger">
                  <span role="img" aria-label="flower">🌸</span> {p.name}
                </h5>
                <div className="text-center my-3">
                  <img
                    src={
                      p.image && p.image !== 'null'
                        ? (p.image.startsWith('http')
                            ? p.image
                            : p.image.startsWith('/media')
                              ? `https://beta.devalayas.com${p.image}`
                              : p.image.startsWith('/')
                                ? `https://beta.devalayas.com${p.image}`
                                : `https://beta.devalayas.com/${p.image}`)
                        : require('../assets/Default.png')
                    }
                    alt={p.name}
                    className="img-fluid rounded"
                    style={{
                      border: '3px solid orange',
                      padding: '6px',
                      borderRadius: '12px',
                      maxHeight: '180px',
                      objectFit: 'contain',
                    }}
                    onError={e => {
                      if (!e.target.src.endsWith('Default.png')) {
                        e.target.onerror = null;
                        e.target.src = require('../assets/Default.png');
                      }
                    }}
                  />
                </div>
                <div className="mt-2 small text-dark">
                  <p><strong className="text-danger">Details:</strong><br />{p.details}</p>
                  <p><strong className="text-danger">Include's:</strong><br />{p.included || 'N/A'}</p>
                  <p><strong className="text-danger">Benefits:</strong><br />{p.benefits || '-'}</p>
                  <p><strong className="text-danger">Cost:</strong><br />₹ {p.final_total || p.cost || 'N/A'} /-</p>
                </div>
                <div className="d-flex justify-content-center mt-3">
                  <button className="btn btn-warning px-4 fw-semibold shadow-sm" onClick={() => handleAddToCart(p)}>
                    Book <span className="ms-1">➜</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    ));
  };


  if (!temple) return <p>Loading...</p>;

  return (
    <>
      <CartDrawer open={cartDrawerOpen} onClose={() => setCartDrawerOpen(false)} />
      <main className="temple-main">
        <section className="temple-container container py-5">
          <h2 className="temple-name">{temple.name}</h2>
          <p className="temple-address">📍 {temple.address}</p>

          <Carousel
            autoPlay
            infiniteLoop
            showThumbs={false}
            showStatus={false}
            interval={4000}
            transitionTime={500}
            centerMode
            centerSlidePercentage={33.33}
            className="temple-carousel"
          >
            {temple.images?.map((img, idx) => (
              <div key={idx}>
                <img src={img.image} alt={`Temple ${idx + 1}`} className="rounded temple-carousel-img" />
              </div>
            ))}
          </Carousel>

          <ul className="nav nav-tabs justify-content-center mt-4 tab-list">
            <li className="nav-item" onClick={() => handleTabSwitch(2)}>
              <span className={`nav-link ${tabNo === 2 ? 'active' : ''}`}>Puja / Udi / Chadava</span>
            </li>
            <li className="nav-item" onClick={() => handleTabSwitch(3)}>
              <span className={`nav-link ${tabNo === 3 ? 'active' : ''}`}>e-Services</span>
            </li>
            <li className="nav-item" onClick={() => handleTabSwitch(1)}>
              <span className={`nav-link ${tabNo === 1 ? 'active' : ''}`}>About Temple</span>
            </li>
          </ul>

          <div className="tab-content mt-4">
            {tabNo === 2 && (
              <>
                <div className="row mb-4">
                  <div className="col-md-10">
                    <input
                      type="text"
                      className="form-control form-control-lg"
                      placeholder="Search for Pooja or Prasadam"
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                    />
                  </div>
                  <div className="col-md-2">
                    <button className="btn btn-lg btn-primary w-100" onClick={handleSearch}>Search</button>
                  </div>
                </div>

                <div className="row">
                  {filteredData.length > 0 ? renderCards(filteredData) : <p className="text-center">No items found.</p>}
                </div>
              </>
            )}

            {tabNo === 3 && <h4 className="text-center text-muted">e-Services coming soon...</h4>}

            {tabNo === 1 && (
              <div className="row mt-4">
                <div className="col-md-8">
                  <h4>Description</h4>
                  <p>{temple.details}</p>

                  <h4 className="mt-4">Image Gallery</h4>
                  <div className="row g-3">
                    {temple.images?.map((img, i) => (
                      <div className="col-md-4" key={i}>
                        <img src={img.image} className="img-fluid rounded" alt={`Temple ${i + 1}`} />
                      </div>
                    ))}
                  </div>
                </div>

                <div className="col-md-4">
                  <h5>Get Directions</h5>
                  <ul className="list-group">
                    <li className="list-group-item"><strong>Taluk:</strong> {temple.taluk}</li>
                    <li className="list-group-item"><strong>District:</strong> {temple.district}</li>
                    <li className="list-group-item"><strong>City:</strong> {temple.city}</li>
                    <li className="list-group-item"><strong>State:</strong> {temple.state}</li>
                    <li className="list-group-item"><strong>Pincode:</strong> {temple.pincode}</li>
                    <li className="list-group-item"><strong>Website:</strong> {temple.website}</li>
                  </ul>
                </div>
              </div>
            )}
          </div>
        </section>
      </main>
    </>
  );
};

export default TempleDetails;
