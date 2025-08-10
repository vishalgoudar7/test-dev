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
  const [tabNo, setTabNo] = useState(4); // Default to Prasadam
  const [search, setSearch] = useState('');
  const [filteredData, setFilteredData] = useState([]);
  const [cartDrawerOpen, setCartDrawerOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [zoomedImage, setZoomedImage] = useState(null);
  const BASE_IMAGE_URL = process.env.REACT_APP_API_BASE_URL;

  useEffect(() => {
    const fetchTempleAndPrasadam = async () => {
      try {
        // Fetch temple details
        const templeRes = await api.get(`/api/v1/devotee/temple/${id}`);
        const templeData = templeRes.data;

        // Fetch prasadam from BOTH APIs
        let prasadamFromPooja = [];
        let prasadamFromPrasadamAPI = [];

        // API 1: /pooja/?search=prasadam (existing)
        try {
          const res1 = await api.get(`/api/v1/devotee/pooja/?temple=${id}&search=prasadam`);
          prasadamFromPooja = res1.data.results || [];
        } catch (err) {
          console.warn('Failed to load prasadam from /pooja API:', err);
        }

        // API 2: /prasadam (new dedicated endpoint)
        try {
          const res2 = await api.get(`/api/v1/devotee/prasadam/?temple=${id}`);
          // Optional: Filter by temple if backend returns all prasadam
          // prasadamFromPrasadamAPI = (res2.data.results || []).filter(p => p.temple === parseInt(id));
          prasadamFromPrasadamAPI = res2.data.results || [];
        } catch (err) {
          console.warn('Failed to load prasadam from /prasadam API:', err);
        }

        // Combine and deduplicate by ID
        const combined = [...prasadamFromPooja, ...prasadamFromPrasadamAPI];
        const uniqueMap = new Map();
        combined.forEach(item => {
          if (item.id) uniqueMap.set(item.id, item);
        });
        const uniquePrasadam = Array.from(uniqueMap.values());

        // Fetch all puja/udi items for Puja tab
        const poojaRes = await api.get(`/api/v1/devotee/pooja/?temple=${id}`);
        const poojaList = poojaRes.data.results || [];

        // Set final data
        setTemple({
          ...templeData,
          prasadam: uniquePrasadam,
        });
        setFilteredData(poojaList);
      } catch (err) {
        console.error('Error loading temple data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchTempleAndPrasadam();
  }, [id]);

  const handleAddToCart = (item) => {
    let cart = [];
    try {
      cart = JSON.parse(localStorage.getItem('cart')) || [];
    } catch {
      cart = [];
    }
    if (!cart.find(c => c.id === item.id)) {
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
      {data
        .filter(p => !p.name.toLowerCase().includes('prasadam'))
        .map(p => (
          <div className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4" key={p.id}>
            <div className="card h-100 shadow-sm border-0 rounded-4" style={{ background: '#fff7ec' }}>
              <div className="card-body d-flex flex-column justify-content-between p-3" style={{ border: '1px solid #e0e0e0', borderRadius: '10px' }}>
                <h5 className="fw-bold text-danger text-start mb-3">🌸 {p.name}</h5>
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
                      height: '180px',
                      width: '100%',
                      objectFit: 'cover',
                      borderRadius: '10px',
                      border: '2px solid #ffc107'
                    }}
                  />
                </div>
                <div className="text-dark small mb-3">
                  <p><strong className="text-danger">Details:</strong><br />{p.details || 'N/A'}</p>
                  <p><strong className="text-danger">Includes:</strong><br />{p.included || 'N/A'}</p>
                  <p><strong className="text-danger">Benefits:</strong><br />{p.excluded || '-'}</p>
                  <p><strong className="text-danger">Cost:</strong><br />₹ {p.original_cost || p.cost || 'N/A'} /-</p>
                </div>
                <div className="text-center mt-auto">
                  <button
                    className="btn btn-warning fw-semibold px-4"
                    style={{ backgroundColor: '#ff5722', color: 'white' }}
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
      {temple?.prasadam && temple.prasadam.length > 0 ? (
        temple.prasadam.map(p => (
          <div className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4" key={p.id}>
            <div className="card h-100 shadow-sm border-0 rounded-4" style={{ background: '#fff7ec' }}>
              <div className="card-body d-flex flex-column justify-content-between p-3" style={{ border: '1px solid #e0e0e0', borderRadius: '10px' }}>
                <h5 className="fw-bold text-danger text-start mb-3">🍛 {p.name}</h5>
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
                      height: '180px',
                      width: '100%',
                      objectFit: 'cover',
                      borderRadius: '10px',
                      border: '2px solid #ffc107'
                    }}
                  />
                </div>
                <div className="text-dark small mb-3">
                  <p><strong className="text-danger">Details:</strong><br />{p.details || p.pooja_prasadam.details || 'N/A'}</p>
                  <p><strong className="text-danger">Includes:</strong><br />{p.included || p.pooja_prasadam.included || 'N/A'}</p>
                  <p><strong className="text-danger">Benefits:</strong><br />{p.excluded || p.pooja_prasadam.excluded || '-'}</p>
                  <p><strong className="text-danger">Cost:</strong><br />₹ {p.original_cost || p.cost || p.pooja_prasadam.original_cost || 'N/A'} /-</p>
                </div>
                <div className="text-center mt-auto">
                  <button
                    className="btn fw-semibold px-4"
                    style={{ backgroundColor: '#ff5722', color: 'white' }}
                    onClick={() => handleAddToCart({
                      ...p,
                      id: p.pooja_prasadam && p.pooja_prasadam.id ? p.pooja_prasadam.id : (p.id || (p.prasadam && p.prasadam.id)),
                      type: 'prasadam',
                      cost: p.original_cost || p.cost || (p.pooja_prasadam && p.pooja_prasadam.original_cost)
                    })}
                  >
                    Participate ➜
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))
      ) : (
        <p className="text-center">No prasadam available for this temple.</p>
      )}
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

          {/* Temple Image Carousel */}
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

          {/* Updated Tab Order: Prasadam → Puja → e-Services → About */}
          <ul className="nav nav-tabs justify-content-center mt-4 temple-tabs">
            {/* 1. Prasadam */}
            <li className="nav-item" onClick={() => handleTabSwitch(4)}>
              <span className={`nav-link ${tabNo === 4 ? 'active' : ''}`}>Prasadam</span>
            </li>

            {/* 2. Puja / Udi / Chadava */}
            <li className="nav-item" onClick={() => handleTabSwitch(2)}>
              <span className={`nav-link ${tabNo === 2 ? 'active' : ''}`}>Puja / Udi / Chadava</span>
            </li>

            {/* 3. e-Services */}
            <li className="nav-item" onClick={() => handleTabSwitch(3)}>
              <span className={`nav-link ${tabNo === 3 ? 'active' : ''}`}>e-Services</span>
            </li>

            {/* 4. About Temple */}
            <li className="nav-item" onClick={() => handleTabSwitch(1)}>
              <span className={`nav-link ${tabNo === 1 ? 'active' : ''}`}>About Temple</span>
            </li>
          </ul>

          {/* Tab Content */}
          <div className="tab-content mt-4">
            {/* Prasadam Tab */}
            {tabNo === 4 && <div className="prasadam-section my-2">{renderPrasadam()}</div>}

            {/* Puja / Udi / Chadava Tab */}
            {tabNo === 2 && (
              filteredData.length > 0 ? renderCards(filteredData) : <p className="text-center">No items found.</p>
            )}

            {/* e-Services Tab */}
            {tabNo === 3 && <h4 className="text-center text-muted">e-Services coming soon...</h4>}

            {/* About Temple Tab */}
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