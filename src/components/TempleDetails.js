import React, { useEffect, useState } from 'react';
import CartDrawer from './CartDrawer';
import { useParams } from 'react-router-dom';
import '../styles/TempleDetails.css';
import api from '../api/api';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

const TempleDetails = () => {
  const { id } = useParams();
  const [temple, setTemple] = useState(null);
  const [tabNo, setTabNo] = useState(2);
  const [search, setSearch] = useState('');
  const [filteredData, setFilteredData] = useState([]);
  const [cartDrawerOpen, setCartDrawerOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [zoomedImage, setZoomedImage] = useState(null);

  const BASE_IMAGE_URL = process.env.REACT_APP_API_BASE_URL;

  useEffect(() => {
    const fetchTempleAndPoojas = async () => {
      try {
        const templeRes = await api.get(`/api/v1/devotee/temple/${id}`);
        let prasadamData = [];
        try {
          const prasadamRes = await api.get(`/api/v1/devotee/prasadam/?temple=${id}`);
          prasadamData = prasadamRes.data.results || [];
        } catch (prasadamErr) {
          console.warn('Failed to load prasadam:', prasadamErr);
        }
        const poojaRes = await api.get(`/api/v1/devotee/pooja/?temple=${id}`);
        setTemple({
          ...templeRes.data,
          prasadam: prasadamData,
        });
        setFilteredData(poojaRes.data.results || []);
      } catch (err) {
        console.error('Error loading data:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchTempleAndPoojas();
  }, [id]);

  const handleAddToCart = (item) => {
    let cart = [];
    try {
      cart = JSON.parse(localStorage.getItem('cart')) || [];
    } catch {
      cart = [];
    }
    if (!cart.find((c) => c.id === item.id)) {
      cart.push(item);
      localStorage.setItem('cart', JSON.stringify(cart));
      window.dispatchEvent(new Event('storage'));
    }
    setCartDrawerOpen(true);
  };

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
      const res = await api.get(`/api/v1/devotee/pooja/?temple=${id}&search=${query}`);
      setFilteredData(res.data.results || []);
    } catch (err) {
      console.error('Search failed:', err);
    }
  };

  const getFullImageUrl = (imgPath) => {
    if (!imgPath || imgPath === 'null') return require('../assets/Default.png');
    return imgPath.startsWith('http') ? imgPath : `${BASE_IMAGE_URL}${imgPath.startsWith('/') ? '' : '/'}${imgPath}`;
  };

  const handleImageClick = (imageUrl) => setZoomedImage(imageUrl);
  const closeZoomedImage = () => setZoomedImage(null);

  const renderCards = (data) => (
    <div className="row">
      {data.map((p) => (
        <div className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4" key={p.id}>
          <div className="card h-100 shadow-sm border-0 rounded-4" style={{ background: '#fff7ec' }}>
            <div className="card-body d-flex flex-column justify-content-between p-3">
              <h5 className="fw-bold text-danger text-center mb-3">🌸 {p.name}</h5>
              <div className="text-center mb-3">
                <img
                  src={getFullImageUrl(p.images?.[0]?.image)}
                  alt={p.name}
                  onClick={() => handleImageClick(getFullImageUrl(p.images?.[0]?.image))}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = require('../assets/Default.png');
                  }}
                  className="img-fluid rounded shadow-sm"
                  style={{
                    height: '180px', width: '100%', objectFit: 'cover',
                    borderRadius: '10px', border: '2px solid #ffc107'
                  }}
                />
              </div>
              <div className="text-dark small mb-3">
                <p><strong className="text-danger">Details:</strong><br />{p.details || 'N/A'}</p>
                <p><strong className="text-danger">Includes:</strong><br />{p.included || 'N/A'}</p>
                <p><strong className="text-danger">Benefits:</strong><br />{p.benefits || '-'}</p>
                <p><strong className="text-danger">Cost:</strong><br />₹ {p.original_cost || p.cost || 'N/A'} /-</p>
              </div>
              <div className="text-center mt-auto">
                <button
                  className="btn btn-warning fw-semibold px-4"
                  onClick={() => handleAddToCart({ ...p, type: 'pooja', cost: p.original_cost || p.cost })}
                >
                  Participate ➜
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  const renderPrasadam = () => (
    <div className="row">
      {temple?.prasadam?.length ? temple.prasadam.map((p) => (
        <div className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4" key={p.id}>
          <div className="card h-100 shadow-lg border-0 rounded-3" style={{ background: '#ffe9d6' }}>
            <div className="card-body d-flex flex-column justify-content-between">
              <h5 className="fw-bold text-danger">🍛 {p.name}</h5>
              <div className="text-left my-3">
                <img
                  src={getFullImageUrl(p.image)}
                  alt={p.name}
                  className="card-img-fixed-size"
                  onClick={() => handleImageClick(getFullImageUrl(p.image))}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = require('../assets/Default.png');
                  }}
                />
              </div>
              <div className="mt-2 small text-dark">
                <p><strong className="text-danger">Details:</strong><br />{p.details || 'N/A'}</p>
                <p><strong className="text-danger">Includes:</strong><br />{p.included || 'N/A'}</p>
                <p><strong className="text-danger">Benefits:</strong><br />{p.benefits || '-'}</p>
                <p><strong className="text-danger">Cost:</strong><br />₹ {p.original_cost || 'N/A'} /-</p>
              </div>
              <div className="d-flex justify-content-center mt-3">
                <button
                  className="btn btn-warning px-4 fw-semibold shadow-sm"
                  onClick={() => handleAddToCart({ ...p, type: 'prasadam', cost: p.original_cost || 'N/A' })}
                >
                  Participate ➜
                </button>
              </div>
            </div>
          </div>
        </div>
      )) : <p className="text-center">No prasadam available for this temple.</p>}
    </div>
  );

  if (loading) return <p>Loading temple details...</p>;
  if (!temple) return <p>No temple found.</p>;

  return (
    <>
      <CartDrawer open={cartDrawerOpen} onClose={() => setCartDrawerOpen(false)} />
      {zoomedImage && (
        <div className="zoomed-image-overlay" onClick={closeZoomedImage}>
          <div className="zoomed-image-container">
            <img src={zoomedImage} alt="Zoomed" className="zoomed-image" onClick={(e) => e.stopPropagation()} />
            <button className="close-zoomed-image" onClick={closeZoomedImage}>&times;</button>
          </div>
        </div>
      )}

      <main className="temple-main">
        <section className="temple-container-td container">
          <h2 className="temple-name">{temple.name}</h2>

          {temple.images?.length > 0 && (
            <div className="temple-images-section text-center">
              <Carousel
                showArrows={true}
                showStatus={false}
                showThumbs={false}
                infiniteLoop={true}
                autoPlay={true}
                interval={3000}
                transitionTime={300}
                className="main-temple-carousel"
                onClickItem={(index, item) => handleImageClick(item.props.src)}
              >
                {temple.images.map((img, idx) => (
                  <div key={idx} className="carousel-image-wrapper">
                    <img
                      src={getFullImageUrl(img.image)}
                      alt={`Temple ${idx}`}
                      className="main-temple-carousel-img"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = require('../assets/Default.png');
                      }}
                    />
                  </div>
                ))}
              </Carousel>
            </div>
          )}

          <ul className="nav nav-tabs justify-content-center mt-4 temple-tabs">
            <li className="nav-item" onClick={() => handleTabSwitch(2)}>
              <span className={`nav-link ${tabNo === 2 ? 'active' : ''}`}>Puja / Udi / Chadava</span>
            </li>
            <li className="nav-item" onClick={() => handleTabSwitch(4)}>
              <span className={`nav-link ${tabNo === 4 ? 'active' : ''}`}>Prasadam</span>
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
              filteredData.length > 0 ? renderCards(filteredData) : <p className="text-center">No items found.</p>
            )}
            {tabNo === 4 && <div className="prasadam-section my-5">{renderPrasadam()}</div>}
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
                        <img
                          src={getFullImageUrl(img.image)}
                          className="gallery-img-fixed-size"
                          alt={`Temple ${i + 1}`}
                          onClick={() => handleImageClick(getFullImageUrl(img.image))}
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = require('../assets/Default.png');
                          }}
                        />
                      </div>
                    ))}
                  </div>
                </div>
                <div className="col-md-4 order-md-2">
                  <ul className="list-group">
                    <li className="list-group-item"><strong>Taluk:</strong> {temple.taluk}</li>
                    <li className="list-group-item"><strong>District:</strong> {temple.district}</li>
                    <li className="list-group-item"><strong>City:</strong> {temple.city}</li>
                    <li className="list-group-item"><strong>State:</strong> {temple.state}</li>
                    <li className="list-group-item"><strong>Pincode:</strong> {temple.pincode}</li>
                    <li className="list-group-item"><strong>Website:</strong> {temple.website || '-'}</li>
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
