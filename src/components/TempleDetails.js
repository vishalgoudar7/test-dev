// import React, { useEffect, useState } from 'react';
// import CartDrawer from './CartDrawer';
// import { useParams } from 'react-router-dom';
// import '../styles/TempleDetails.css'; // Ensure this path is correct
// import api from '../api/api'; // Ensure this path is correct              

// const TempleDetails = () => {
//   const { id } = useParams();
//   const [temple, setTemple] = useState(null);
//   const [tabNo, setTabNo] = useState(2);
//   const [tabNoImage, setTabNoImage] = useState(0); // Tracks selected image index for main display
//   const [search, setSearch] = useState('');
//   const [filteredData, setFilteredData] = useState([]);
//   const [cartDrawerOpen, setCartDrawerOpen] = useState(false);
//   const [loading, setLoading] = useState(true);
//   const [zoomedImage, setZoomedImage] = useState(null); // State to hold the URL of the image to be zoomed

//   const BASE_IMAGE_URL = process.env.REACT_APP_API_BASE_URL;

//   useEffect(() => {
//     const fetchTempleAndPoojas = async () => {
//       try {
//         const templeRes = await api.get(`/api/v1/devotee/temple/${id}`);

//         let prasadamData = [];
//         try {
//           const prasadamRes = await api.get(`/api/v1/devotee/prasadam/?temple=${id}`);
//           prasadamData = prasadamRes.data.results || [];
//         } catch (prasadamErr) {
//           console.warn('Failed to load prasadam:', prasadamErr);
//         }

//         const poojaRes = await api.get(`/api/v1/devotee/pooja/?temple=${id}`);

//         setTemple({
//           ...templeRes.data,
//           prasadam: prasadamData,
//         });

//         setFilteredData(poojaRes.data.results || []);
//       } catch (err) {
//         console.error('Error loading data:', err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchTempleAndPoojas();
//   }, [id]);

//   const handleAddToCart = (item) => {
//     let cart = [];

//     try {
//       cart = JSON.parse(localStorage.getItem('cart')) || [];
//     } catch {
//       cart = [];
//     }

//     if (!cart.find((c) => c.id === item.id)) {
//       cart.push(item);
//       localStorage.setItem('cart', JSON.stringify(cart));
//       window.dispatchEvent(new Event('storage'));
//     }

//     setCartDrawerOpen(true);
//   };

//   const handleTabSwitch = (tab) => {
//     setTabNo(tab);
//     setSearch('');
//     if (tab === 2) {
//       handleSearch(''); // Refreshes Pooja/Udi/Chadava list
//     } else {
//       setFilteredData([]); // Clears search results if switching tabs
//     }
//   };

//   const handleSearch = async (query = search) => {
//     try {
//       const res = await api.get(`/api/v1/devotee/pooja/?temple=${id}&search=${query}`);
//       setFilteredData(res.data.results || []);
//     } catch (err) {
//       console.error('Search failed:', err);
//     }
//   };

//   const getFullImageUrl = (imgPath) => {
//     // If no path or 'null', return default image
//     if (!imgPath || imgPath === 'null') return require('../assets/Default.png');
//     // If it's already a full URL, return as is. Otherwise, prepend base URL.
//     return imgPath.startsWith('http') ? imgPath : `${BASE_IMAGE_URL}${imgPath.startsWith('/') ? '' : '/'}${imgPath}`;
//   };

//   // Function to open the zoomed image modal
//   const handleImageClick = (imageUrl) => {
//     setZoomedImage(imageUrl);
//   };

//   // Function to close the zoomed image modal
//   const closeZoomedImage = () => {
//     setZoomedImage(null);
//   };

//   const renderCards = (data) => {
//     const rows = [];
//     // Group items into rows of 3 for display
//     for (let i = 0; i < data.length; i += 3) {
//       rows.push(data.slice(i, i + 3));
//     }

//     return rows.map((row, rowIdx) => (
//       <div className="row" key={rowIdx}>
//         {row.map((p) => (
//           <div className="col-md-3 mb-2" key={p.id}>
//             <div className="card h-100 shadow-lg border-0 rounded-3" style={{ background: '#ffe9d6' }}>
//               <div className="card-body d-flex flex-column justify-content-between">
//                 <h5 className="fw-bold text-danger">🌸 {p.name}</h5>
//                 <div className="text-center my-3">
//                   <img
//                     src={getFullImageUrl(p.images?.[0]?.image)}
//                     alt={p.name}
//                     className="card-img-fixed-size" // Applies fixed size and object-fit: contain
//                     onClick={() => handleImageClick(getFullImageUrl(p.images?.[0]?.image))} // Click to zoom
//                     onError={(e) => {
//                       e.target.onerror = null;
//                       e.target.src = require('../assets/Default.png'); // Fallback to default image on error
//                     }}
//                   />
//                 </div>
//                 <div className="mt-2 small text-dark">
//                   <p><strong className="text-danger">Details:</strong><br />{p.details}</p>
//                   <p><strong className="text-danger">Includes:</strong><br />{p.included || 'N/A'}</p>
//                   <p><strong className="text-danger">Benefits:</strong><br />{p.benefits || '-'}</p>
//                   <p><strong className="text-danger">Cost:</strong><br />₹ {p.original_cost || p.cost || 'N/A'} /-</p>
//                 </div>
//                 <div className="d-flex justify-content-center mt-3">
//                   <button className="btn btn-warning px-4 fw-semibold shadow-sm" onClick={() => handleAddToCart({ ...p, type: 'pooja', cost: p.original_cost || p.cost })}>
//                     Participate ➜
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//     ));
//   };

//   const renderPrasadam = () => {
//     if (!temple?.prasadam || temple.prasadam.length === 0) {
//       return <p className="text-center">No prasadam available for this temple.</p>;
//     }

//     const rows = [];
//     // Group items into rows of 3 for display
//     for (let i = 0; i < temple.prasadam.length; i += 3) {
//       rows.push(temple.prasadam.slice(i, i + 3));
//     }

//     return rows.map((row, rowIdx) => (
//       <div className="row" key={rowIdx}>
//         {row.map((p) => (
//           <div className="col-md-3 mb-2" key={p.id}>
//             <div className="card h-100 shadow-lg border-0 rounded-3" style={{ background: '#ffe9d6' }}>
//               <div className="card-body d-flex flex-column justify-content-between">
//                 <h5 className="fw-bold text-danger">🍛 {p.name}</h5>
//                 <div className="text-left my-3">
//                   <img
//                     src={getFullImageUrl(p.image)}
//                     alt={p.name}
//                     className="card-img-fixed-size" // Applies fixed size and object-fit: contain
//                     onClick={() => handleImageClick(getFullImageUrl(p.image))} // Click to zoom
//                     onError={(e) => {
//                       e.target.onerror = null;
//                       e.target.src = require('../assets/Default.png'); // Fallback to default image on error
//                     }}
//                   />
//                 </div>
//                 <div className="mt-2 small text-dark">
//                   <p><strong className="text-danger">Details:</strong><br />{p.details || 'N/A'}</p>
//                   <p><strong className="text-danger">Includes:</strong><br />{p.included || 'N/A'}</p>
//                   <p><strong className="text-danger">Benefits:</strong><br />{p.benefits || '-'}</p>
//                   <p><strong className="text-danger">Cost:</strong><br />₹ {p.original_cost || 'N/A'} /-</p>
//                 </div>
//                 <div className="d-flex justify-content-center mt-3">
//                   <button className="btn btn-warning px-4 fw-semibold shadow-sm" onClick={() => handleAddToCart({ ...p, type: 'prasadam', cost: p.original_cost || 'N/A' })}>
//                     Participate ➜
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//     ));
//   };

//   if (loading) return <p>Loading temple details...</p>;
//   if (!temple) return <p>No temple found.</p>;

//   return (
//     <>
//       <CartDrawer open={cartDrawerOpen} onClose={() => setCartDrawerOpen(false)} />

//       {/* Zoomed Image Modal Overlay */}
//       {zoomedImage && (
//         <div className="zoomed-image-overlay" onClick={closeZoomedImage}>
//           <div className="zoomed-image-container">
//             <img src={zoomedImage} alt="Zoomed" className="zoomed-image" onClick={(e) => e.stopPropagation()} />
//             <button className="close-zoomed-image" onClick={closeZoomedImage}>&times;</button>
//           </div>
//         </div>
//       )}

//       <main className="temple-main">
//         <section className="temple-container container">
//           <h2 className="temple-name">{temple.name}</h2>
//           {/* <p className="temple-address">📍 {temple.address}</p> */}

//           {/* Main Temple Image + Thumbnail Preview */}
//           {temple.images?.length > 0 && (
//             <div className="temple-images-section text-center">
//               <img
//                 src={getFullImageUrl(temple.images[tabNoImage]?.image || temple.images[0]?.image)}
//                 alt="Main Temple"
//                 className="main-temple-img"
//                 onClick={() => handleImageClick(getFullImageUrl(temple.images[tabNoImage]?.image || temple.images[0]?.image))} // Click to zoom main image
//               />
//               <div className="thumbnail-row d-flex justify-content-center flex-wrap mt-3">
//                 {temple.images.map((img, idx) => (
//                   <img
//                     key={idx}
//                     src={getFullImageUrl(img.image)}
//                     alt={`Thumb ${idx}`}
//                     className={`thumbnail-img ${tabNoImage === idx ? 'selected' : ''}`}
//                     onClick={() => setTabNoImage(idx)}
//                   />
//                 ))}
//               </div>
//             </div>
//           )}

//           {/* Navigation Tabs */}
//           <ul className="nav nav-tabs justify-content-center mt-4 temple-tabs">
//             <li className="nav-item" onClick={() => handleTabSwitch(2)}>
//               <span className={`nav-link ${tabNo === 2 ? 'active' : ''}`}>Puja / Udi / Chadava</span>
//             </li>
//             <li className="nav-item" onClick={() => handleTabSwitch(4)}>
//               <span className={`nav-link ${tabNo === 4 ? 'active' : ''}`}>Prasadam</span>
//             </li>
//             <li className="nav-item" onClick={() => handleTabSwitch(3)}>
//               <span className={`nav-link ${tabNo === 3 ? 'active' : ''}`}>e-Services</span>
//             </li>
//             <li className="nav-item" onClick={() => handleTabSwitch(1)}>
//               <span className={`nav-link ${tabNo === 1 ? 'active' : ''}`}>About Temple</span>
//             </li>
//           </ul>

//           {/* Tab Content Section */}
//           <div className="tab-content mt-4">
//             {tabNo === 2 && (
//               <div className="row">
//                 {filteredData.length > 0 ? renderCards(filteredData) : <p className="text-center">No items found.</p>}
//               </div>
//             )}

//             {tabNo === 4 && (
//               <div className="prasadam-section my-5">
//                 {/* <h4 className="mb-4 text-center">Prasadam</h4> */}
//                 {renderPrasadam()}
//               </div>
//             )}

//             {tabNo === 3 && <h4 className="text-center text-muted">e-Services coming soon...</h4>}

//             {tabNo === 1 && (
//               <div className="row mt-4">
//                 <div className="col-md-8">
//                   <h4>Description</h4>
//                   <p>{temple.details}</p>

//                   <h4 className="mt-4">Image Gallery</h4>
//                   <div className="row g-3">
//                     {temple.images?.map((img, i) => (
//                       <div className="col-md-4" key={i}>
//                         <img
//                           src={getFullImageUrl(img.image)}
//                           className="gallery-img-fixed-size" // Applies fixed size and object-fit: contain
//                           alt={`Temple ${i + 1}`}
//                           onClick={() => handleImageClick(getFullImageUrl(img.image))} // Click to zoom gallery images
//                           onError={(e) => {
//                             e.target.onerror = null;
//                             e.target.src = require('../assets/Default.png'); // Fallback to default image on error
//                           }}
//                         />
//                       </div>
//                     ))}
//                   </div>
//                 </div>

//                 <div className="col-md-4 order-md-2">
//                   <ul className="list-group">
//                     <li className="list-group-item"><strong>Taluk:</strong> {temple.taluk}</li>
//                     <li className="list-group-item"><strong>District:</strong> {temple.district}</li>
//                     <li className="list-group-item"><strong>City:</strong> {temple.city}</li>
//                     <li className="list-group-item"><strong>State:</strong> {temple.state}</li>
//                     <li className="list-group-item"><strong>Pincode:</strong> {temple.pincode}</li>
//                     <li className="list-group-item"><strong>Website:</strong> {temple.website || '-'}</li>
//                   </ul>
//                 </div>
//               </div>
//             )}
//           </div>
//         </section>
//       </main>
//     </>
//   );
// };

// export default TempleDetails;








import React, { useEffect, useState } from 'react';
import CartDrawer from './CartDrawer';
import { useParams } from 'react-router-dom';
import '../styles/TempleDetails.css'; // Ensure this path is correct
import api from '../api/api'; // Ensure this path is correct
import { Carousel } from 'react-responsive-carousel'; // Import Carousel
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // Import carousel styles

const TempleDetails = () => {
  const { id } = useParams();
  const [temple, setTemple] = useState(null);
  const [tabNo, setTabNo] = useState(2);
  // tabNoImage is no longer directly used for display in Carousel, but can remain for other potential uses
  const [tabNoImage, setTabNoImage] = useState(0);
  const [search, setSearch] = useState('');
  const [filteredData, setFilteredData] = useState([]);
  const [cartDrawerOpen, setCartDrawerOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [zoomedImage, setZoomedImage] = useState(null); // State to hold the URL of the image to be zoomed

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
      handleSearch(''); // Refreshes Pooja/Udi/Chadava list
    } else {
      setFilteredData([]); // Clears search results if switching tabs
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
    // If no path or 'null', return default image
    if (!imgPath || imgPath === 'null') return require('../assets/Default.png');
    // If it's already a full URL, return as is. Otherwise, prepend base URL.
    return imgPath.startsWith('http') ? imgPath : `${BASE_IMAGE_URL}${imgPath.startsWith('/') ? '' : '/'}${imgPath}`;
  };

  // Function to open the zoomed image modal
  const handleImageClick = (imageUrl) => {
    setZoomedImage(imageUrl);
  };

  // Function to close the zoomed image modal
  const closeZoomedImage = () => {
    setZoomedImage(null);
  };

  const renderCards = (data) => {
    const rows = [];
    // Group items into rows of 3 for display
    for (let i = 0; i < data.length; i += 3) {
      rows.push(data.slice(i, i + 3));
    }

    return rows.map((row, rowIdx) => (
      <div className="row" key={rowIdx}>
        {row.map((p) => (
          <div className="col-md-3 mb-2" key={p.id}>
            <div className="card h-100 shadow-lg border-0 rounded-3" style={{ background: '#ffe9d6' }}>
              <div className="card-body d-flex flex-column justify-content-between">
                <h5 className="fw-bold text-danger">🌸 {p.name}</h5>
                <div className="text-center my-3">
                  <img
                    src={getFullImageUrl(p.images?.[0]?.image)}
                    alt={p.name}
                    className="card-img-fixed-size" // Applies fixed size and object-fit: contain
                    onClick={() => handleImageClick(getFullImageUrl(p.images?.[0]?.image))} // Click to zoom
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = require('../assets/Default.png'); // Fallback to default image on error
                    }}
                  />
                </div>
                <div className="mt-2 small text-dark">
                  <p><strong className="text-danger">Details:</strong><br />{p.details}</p>
                  <p><strong className="text-danger">Includes:</strong><br />{p.included || 'N/A'}</p>
                  <p><strong className="text-danger">Benefits:</strong><br />{p.benefits || '-'}</p>
                  <p><strong className="text-danger">Cost:</strong><br />₹ {p.original_cost || p.cost || 'N/A'} /-</p>
                </div>
                <div className="d-flex justify-content-center mt-3">
                  <button className="btn btn-warning px-4 fw-semibold shadow-sm" onClick={() => handleAddToCart({ ...p, type: 'pooja', cost: p.original_cost || p.cost })}>
                    Participate ➜
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    ));
  };

  const renderPrasadam = () => {
    if (!temple?.prasadam || temple.prasadam.length === 0) {
      return <p className="text-center">No prasadam available for this temple.</p>;
    }

    const rows = [];
    // Group items into rows of 3 for display
    for (let i = 0; i < temple.prasadam.length; i += 3) {
      rows.push(temple.prasadam.slice(i, i + 3));
    }

    return rows.map((row, rowIdx) => (
      <div className="row" key={rowIdx}>
        {row.map((p) => (
          <div className="col-md-3 mb-2" key={p.id}>
            <div className="card h-100 shadow-lg border-0 rounded-3" style={{ background: '#ffe9d6' }}>
              <div className="card-body d-flex flex-column justify-content-between">
                <h5 className="fw-bold text-danger">🍛 {p.name}</h5>
                <div className="text-left my-3">
                  <img
                    src={getFullImageUrl(p.image)}
                    alt={p.name}
                    className="card-img-fixed-size" // Applies fixed size and object-fit: contain
                    onClick={() => handleImageClick(getFullImageUrl(p.image))} // Click to zoom
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = require('../assets/Default.png'); // Fallback to default image on error
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
                  <button className="btn btn-warning px-4 fw-semibold shadow-sm" onClick={() => handleAddToCart({ ...p, type: 'prasadam', cost: p.original_cost || 'N/A' })}>
                    Participate ➜
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    ));
  };

  if (loading) return <p>Loading temple details...</p>;
  if (!temple) return <p>No temple found.</p>;

  return (
    <>
      <CartDrawer open={cartDrawerOpen} onClose={() => setCartDrawerOpen(false)} />

      {/* Zoomed Image Modal Overlay */}
      {zoomedImage && (
        <div className="zoomed-image-overlay" onClick={closeZoomedImage}>
          <div className="zoomed-image-container">
            <img src={zoomedImage} alt="Zoomed" className="zoomed-image" onClick={(e) => e.stopPropagation()} />
            <button className="close-zoomed-image" onClick={closeZoomedImage}>&times;</button>
          </div>
        </div>
      )}

      <main className="temple-main">
        <section className="temple-container container">
          <h2 className="temple-name">{temple.name}</h2>
          {/* <p className="temple-address">📍 {temple.address}</p> */}

          {/* Main Temple Image Carousel */}
          {temple.images?.length > 0 && (
            <div className="temple-images-section text-center">
              <Carousel
                showArrows={true}
                showStatus={false}
                showThumbs={false} // Hide default thumbnails, we use our own thumbnails or remove if you just want arrows/dots
                infiniteLoop={true}
                autoPlay={true}           // Auto-play enabled
                interval={3000}           // Time in ms between slides (e.g., 3000ms = 3 seconds)
                transitionTime={300}      // Increased slide speed (e.g., 300ms = 0.3 seconds)
                className="main-temple-carousel"
                onClickItem={(index, item) => handleImageClick(item.props.src)} // Click to zoom
              >
                {temple.images.map((img, idx) => (
                  <div key={idx} className="carousel-image-wrapper">
                    <img
                      src={getFullImageUrl(img.image)}
                      alt={`Temple ${idx}`}
                      className="main-temple-carousel-img" // New class for carousel images
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = require('../assets/Default.png'); // Fallback to default image on error
                      }}
                    />
                  </div>
                ))}
              </Carousel>
              {/* If you still want custom thumbnails, you can keep the thumbnail-row div here,
                  but you'd need to manually control the Carousel's selected item based on clicks.
                  For a simple slide, removing it is cleaner.
              */}
              {/*
              <div className="thumbnail-row d-flex justify-content-center flex-wrap mt-3">
                {temple.images.map((img, idx) => (
                  <img
                    key={idx}
                    src={getFullImageUrl(img.image)}
                    alt={`Thumb ${idx}`}
                    className={`thumbnail-img ${tabNoImage === idx ? 'selected' : ''}`}
                    onClick={() => setTabNoImage(idx)} // This would need to set the Carousel's selected item
                  />
                ))}
              </div>
              */}
            </div>
          )}

          {/* Navigation Tabs */}
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

          {/* Tab Content Section */}
          <div className="tab-content mt-4">
            {tabNo === 2 && (
              <div className="row">
                {filteredData.length > 0 ? renderCards(filteredData) : <p className="text-center">No items found.</p>}
              </div>
            )}

            {tabNo === 4 && (
              <div className="prasadam-section my-5">
                {/* <h4 className="mb-4 text-center">Prasadam</h4> */}
                {renderPrasadam()}
              </div>
            )}

            {tabNo === 3 && <h4 className="text-center text-muted">e-Services coming soon...</h4>}

            {/* {tabNo === 1 && (
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
                          className="gallery-img-fixed-size" // Applies fixed size and object-fit: contain
                          alt={`Temple ${i + 1}`}
                          onClick={() => handleImageClick(getFullImageUrl(img.image))} // Click to zoom gallery images
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = require('../assets/Default.png'); // Fallback to default image on error
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
            )} */}
           {tabNo === 1 && (
              <div className="row mt-4">
                <div className="col-md-8">
                  <h4>Description</h4> {/* Heading for description */}
                  <p>{temple.details}</p> {/* Temple description */}

                  <h4 className="mt-4">Image Gallery</h4> {/* Heading for gallery */}
                  <div className="row g-3"> {/* Image gallery container */}
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
                  <ul className="list-group"> {/* Temple information list */}
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

