
// import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import api from '../api/api';
// import '../styles/PujaDetails.css';

// const PujaDetails = () => {
//   const { id } = useParams();
//   const [puja, setPuja] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');
//   const [activeTab, setActiveTab] = useState('about');

//   useEffect(() => {
//     const fetchPujaDetails = async () => {
//       try {
//         const response = await api.get(`/api/v1/devotee/pooja/${id}`);
//         setPuja(response.data);
//       } catch (err) {
//         setError('Failed to load puja details');
//         console.error('Error:', err.response?.data || err.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchPujaDetails();
//   }, [id]);

//   if (loading) return <div className="loading">Loading...</div>;
//   if (error) return <div className="error">{error}</div>;
//   if (!puja) return <div>No puja found</div>;

//   const imageUrl =
//     puja.image ||
//     (puja.images?.length > 0 && puja.images[0].image) ||
//     'https://via.placeholder.com/500x300?text=No+Image+Available';

//   return (
//     <div className="puja-details-container">
//       <h2 className="puja-title">{puja.name}</h2>
//       <div className="puja-flex-wrapper">
//         <div className="puja-image-box">
//           <img src={imageUrl} alt={puja.name} className="puja-main-image" />
//         </div>
//         <div className="puja-text-box">
//           <p><strong>Details:</strong> {puja.details || 'No details available'}</p>
//           <p><strong>Included:</strong> {puja.included || 'N/A'}</p>
//           <p><strong>Excluded:</strong> {puja.excluded || 'N/A'}</p>
//           <p><strong>Price:</strong> ₹{puja.cost || '0.00'}</p>
//           <p><strong>God:</strong> {puja.god?.name || 'N/A'}</p>
//           <p><strong>Prasad Delivery:</strong> {puja.prasad_delivery ? 'Yes' : 'No'}</p>
//           <p><strong>Approval Status:</strong> {puja.approval_status || 'N/A'}</p>

//           <div className="participate-button-wrapper">
//             <button className="participate-btn">PARTICIPATE</button>
//           </div>
//         </div>
//       </div>

//       {/* Tab Navigation */}
//       <div className="tab-nav">
//         <button className={activeTab === 'about' ? 'active' : ''} onClick={() => setActiveTab('about')}>About Puja</button>
//         <button className={activeTab === 'benefits' ? 'active' : ''} onClick={() => setActiveTab('benefits')}>Benefits</button>
//         <button className={activeTab === 'temple' ? 'active' : ''} onClick={() => setActiveTab('temple')}>Temple Details</button>
//         <button className={activeTab === 'packages' ? 'active' : ''} onClick={() => setActiveTab('packages')}>Packages</button>
//       </div>

//       {/* Tab Content */}
//       <div className="tab-content">
//         {activeTab === 'about' && (
//           <div>
//             <h3>About Puja</h3>
//             <p>{puja.details || 'Information coming soon.'}</p>
//           </div>
//         )}
//         {activeTab === 'benefits' && (
//           <div>
//             <h3>Benefits</h3>
//             <p>{puja.benefits || 'This puja is beneficial for spiritual harmony and inner peace.'}</p>
//           </div>
//         )}
//         {activeTab === 'temple' && (
//           <div>
//             <h3>Temple Details</h3>
//             <p>{puja.temple_details || 'This puja is conducted at a sacred temple location.'}</p>
//           </div>
//         )}
//         {activeTab === 'packages' && (
//           <div>
//             <h3>Packages</h3>
//             <p>{puja.packages || 'Various participation packages are available for this puja.'}</p>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default PujaDetails;






// src/pages/PujaDetails.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../api/api';
import '../styles/PujaDetails.css';

const PujaDetails = () => {
  const { id } = useParams();
  const [puja, setPuja] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('about');

  useEffect(() => {
    const fetchPujaDetails = async () => {
      try {
        const response = await api.get(`/api/v1/devotee/pooja/${id}`);
        setPuja(response.data);
      } catch (err) {
        setError('Failed to load puja details');
        console.error('Error:', err.response?.data || err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPujaDetails();
  }, [id]);

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">{error}</div>;
  if (!puja) return <div>No puja found</div>;

  const imageUrl =
    puja.image ||
    (puja.images?.length > 0 && puja.images[0].image) ||
    'https://via.placeholder.com/500x300?text=No+Image+Available';

  return (
    <div className="puja-details-container">
      <h2 className="puja-title">{puja.name}</h2>

      <div className="puja-flex-wrapper">
        <div className="puja-image-box">
          <img src={imageUrl} alt={puja.name} className="puja-main-image" />
        </div>
        <div className="puja-text-box">
          <p><strong>Details:</strong> {puja.details || 'No details available'}</p>
          <p><strong>Included:</strong> {puja.included || 'N/A'}</p>
          <p><strong>Excluded:</strong> {puja.excluded || 'N/A'}</p>
          <p><strong>Price:</strong> ₹{puja.cost || '0.00'}</p>
          <p><strong>God:</strong> {puja.god?.name || 'N/A'}</p>
          <p><strong>Prasad Delivery:</strong> {puja.prasad_delivery ? 'Yes' : 'No'}</p>
          <p><strong>Approval Status:</strong> {puja.approval_status || 'N/A'}</p>

          <div className="participate-button-wrapper">
            <button className="participate-btn">PARTICIPATE</button>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="tab-nav">
        <button className={activeTab === 'about' ? 'active' : ''} onClick={() => setActiveTab('about')}>About Puja</button>
        <button className={activeTab === 'benefits' ? 'active' : ''} onClick={() => setActiveTab('benefits')}>Benefits</button>
        <button className={activeTab === 'temple' ? 'active' : ''} onClick={() => setActiveTab('temple')}>Temple Details</button>
        <button className={activeTab === 'packages' ? 'active' : ''} onClick={() => setActiveTab('packages')}>Packages</button>
      </div>

      <div className="tab-content">
        {activeTab === 'about' && (
          <div>
            <h3>About Puja</h3>
            <p>{puja.details || 'Information coming soon.'}</p>
          </div>
        )}
        {activeTab === 'benefits' && (
          <div>
            <h3>Benefits</h3>
            <p>{puja.benefits || 'This puja is beneficial for spiritual harmony and inner peace.'}</p>
          </div>
        )}
        {activeTab === 'temple' && (
          <div>
            <h3>Temple Details</h3>
            <p>{puja.temple_details || 'This puja is conducted at a sacred temple location.'}</p>
          </div>
        )}
        {activeTab === 'packages' && (
          <div>
            <h3>Packages</h3>
            <p>{puja.packages || 'Various participation packages are available for this puja.'}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PujaDetails;
