// // src/pages/PujaList.js
// import React, { useEffect, useState } from 'react';
// import axios from '../api/api'; // Ensure this has the baseURL and token setup
// import '../styles/PujaList.css';
//  // Optional: create this for styling

// const PujaList = () => {
//   const [pujas, setPujas] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');

//   useEffect(() => {
//     const fetchPujas = async () => {
//       try {
//         const response = await axios.get('/api/v1/devotee/pooja/');
//         setPujas(response.data);
//       } catch (err) {
//         setError('Failed to load puja list');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchPujas();
//   }, []);

//   return (
//     <div className="puja-list-container">
//       <h2 className="puja-heading">Available Pujas</h2>
//       {loading && <p>Loading...</p>}
//       {error && <p className="error">{error}</p>}
//       <div className="puja-cards">
//         {pujas.map((puja) => (
//           <div className="puja-card" key={puja.id}>
//             <h3>{puja.name}</h3>
//             <p>{puja.description}</p>
//             <p><strong>Price:</strong> ₹{puja.price}</p>
//             <button className="book-button">Book Now</button>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default PujaList;





// import React, { useEffect, useState } from 'react';
// import api from '../api/api';
// import '../styles/PujaList.css';

// const PujaList = () => {
//   const [pujas, setPujas] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');

//   useEffect(() => {
//     const fetchPujas = async () => {
//       try {
//         const token = localStorage.getItem('token');
//         if (!token) {
//           setError('Authentication token missing. Please log in first.');
//           setLoading(false);
//           return;
//         }

//         const response = await api.get('/api/v1/devotee/pooja');
//         console.log('Fetched Pujas:', response.data);

//         const pujaList = response.data?.results || response.data || [];
//         setPujas(pujaList);
//       } catch (err) {
//         console.error('API Error:', err.response?.data || err.message);
//         setError('Failed to load puja list');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchPujas();
//   }, []);

//   return (
//     <div className="puja-list-container">
//       <h2 className="puja-heading">Available Pujas</h2>

//       {loading && <p>Loading...</p>}
//       {error && <p className="error">{error}</p>}

//       <div className="puja-cards">
//         {pujas.map((puja) => (
//           <div className="puja-card" key={puja.id}>
//             {puja.image || puja.image_url || puja.imageUrl ? (
//               <img
//                 src={puja.image || puja.image_url || puja.imageUrl}
//                 alt={puja.name}
//                 className="puja-image"
//               />
//             ) : (
//               <img
//                 src="/default-image.jpg" // fallback image
//                 alt="Default"
//                 className="puja-image"
//               />
//             )}
//             <h3>{puja.name}</h3>
//             <p>{puja.description}</p>
//             <p><strong>Price:</strong> ₹{puja.price}</p>
//             <button className="book-button">Book Now</button>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default PujaList;







// import React, { useEffect, useState } from 'react';
// import api from '../api/api';
// import '../styles/PujaList.css';

// const PujaList = () => {
//   const [pujas, setPujas] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');

//   const fetchPujas = async () => {
//     try {
//       const token = localStorage.getItem('token');
//       if (!token) {
//         setError('Authentication token missing. Please log in first.');
//         setLoading(false);
//         return;
//       }

//       const response = await api.get('/api/v1/devotee/pooja');
//       const pujaData = response.data?.results || [];

//       setPujas(pujaData);
//     } catch (err) {
//       console.error('API Error:', err.response?.data || err.message);
//       setError('Failed to load puja list');
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchPujas();
//   }, []);

//   return (
//     <div className="puja-list-container">
//       <h2 className="puja-heading">Available Pujas</h2>

//       {loading && <p>Loading...</p>}
//       {error && <p className="error">{error}</p>}

//       <div className="puja-cards">
//         {pujas.map((puja) => (
//           <div className="puja-card" key={puja.id}>
//             {puja.image && (
//               <img
//                 src={puja.image}
//                 alt={puja.name}
//                 className="puja-image"
//                 onError={(e) => (e.target.style.display = "none")}
//               />
//             )}
//             <h3>{puja.name}</h3>
//             <p>{puja.description}</p>
//             <p><strong>Price:</strong> ₹{puja.price}</p>
//             <button className="book-button">Book Now</button>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default PujaList;




// // src/pages/PujaList.js
// import React, { useEffect, useState } from 'react';
// import api from '../api/api';
// import '../styles/PujaList.css';

// const PujaList = () => {
//   const [pujas, setPujas] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');

//   useEffect(() => {
//     const fetchPujas = async () => {
//       try {
//         const token = localStorage.getItem('token');
//         if (!token) {
//           setError('Authentication token missing. Please log in first.');
//           setLoading(false);
//           return;
//         }

//         const response = await api.get('/api/v1/devotee/pooja/');
//         setPujas(response.data?.results || []);
//       } catch (err) {
//         console.error('API Error:', err);
//         setError('Failed to load puja list');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchPujas();
//   }, []);

//   return (
//     <div className="puja-list-container">
//       <h2 className="puja-heading">Available Pujas</h2>
//       {loading && <p>Loading...</p>}
//       {error && <p className="error">{error}</p>}

//       <div className="puja-cards">
//         {pujas.map((puja) => (
//           <div className="puja-card" key={puja.id}>
//             {puja.image && (
//               <img src={puja.image} alt={puja.name} className="puja-image" />
//             )}
//             <h3>{puja.name}</h3>
//             <p>{puja.description}</p>
//             <p><strong>Price:</strong> ₹{puja.price}</p>
//             <button className="book-button">Book Now</button>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default PujaList;




// // src/pages/PujaList.js
// import React, { useEffect, useState } from 'react';
// import api from '../api/api';
// import '../styles/PujaList.css';

// const PujaList = () => {
//   const [pujas, setPujas] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');

//   useEffect(() => {
//     const fetchPujas = async () => {
//       try {
//         const token = localStorage.getItem('token');
//         if (!token) {
//           setError('Authentication token missing. Please log in first.');
//           setLoading(false);
//           return;
//         }

//         const response = await api.get('/api/v1/devotee/pooja/');
//         setPujas(response.data?.results || []);
//       } catch (err) {
//         console.error('API Error:', err);
//         setError('Failed to load puja list');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchPujas();
//   }, []);

//   return (
//     <div className="puja-list-container">
//       <h2 className="puja-heading">Available Pujas</h2>
//       {loading && <p>Loading...</p>}
//       {error && <p className="error">{error}</p>}

//       <div className="puja-cards">
//         {pujas.map((puja) => (
//           <div className="puja-card" key={puja.id}>
//             {puja.image ? (
//               <img src={puja.image} alt={puja.name} className="puja-image" />
//             ) : (
//               <div className="puja-placeholder">No Image</div>
//             )}
//             <h3>{puja.name}</h3>
//             <p>{puja.description}</p>
//             <p><strong>Price:</strong> ₹{puja.price}</p>
//             <button className="book-button">Book Now</button>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default PujaList;






// import React, { useEffect, useState } from 'react';
// import api from '../api/api';
// import '../styles/PujaList.css';

// const PujaList = () => {
//   const [pujas, setPujas] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');

//   // ✅ Add your domain prefix for images
//   const BASE_URL = 'https://beta.devalayas.com';

//   useEffect(() => {
//     const fetchPujas = async () => {
//       try {
//         const token = localStorage.getItem('token');
//         if (!token) {
//           setError('Authentication token missing. Please log in first.');
//           setLoading(false);
//           return;
//         }

//         // ✅ Attach token to API request
//         const response = await api.get('/api/v1/devotee/pooja/', {
//           headers: {
//             Authorization: `Token ${token}`,
//           },
//         });

//         setPujas(response.data?.results || []);
//       } catch (err) {
//         console.error('API Error:', err);
//         setError('Failed to load puja list');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchPujas();
//   }, []);

//   // ✅ Construct full image URL
//   const getImageUrl = (imagePath) => {
//     if (!imagePath) return null;
//     return imagePath.startsWith('http') ? imagePath : `${BASE_URL}${imagePath}`;
//   };

//   return (
//     <div className="puja-list-container">
//       <h2 className="puja-heading">Available Pujas</h2>
//       {loading && <p>Loading...</p>}
//       {error && <p className="error">{error}</p>}

//       <div className="puja-cards">
//         {pujas.map((puja) => (
//           <div className="puja-card" key={puja.id}>
//             {puja.image ? (
//               <img
//                 src={getImageUrl(puja.image)}
//                 alt={puja.name}
//                 className="puja-image"
//               />
//             ) : (
//               <div className="puja-image no-image">No Image</div>
//             )}
//             <h3>{puja.name}</h3>
//             <p>{puja.description}</p>
//             <p><strong>Price:</strong> ₹{puja.price}</p>
//             <button className="book-button">Book Now</button>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default PujaList;



import React, { useEffect, useState } from 'react';
import api from '../api/api';
import '../styles/PujaList.css';

const PujaList = () => {
  const [pujas, setPujas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

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

  return (
    <div className="puja-list-container">
      <h2 className="puja-heading">Available Pujas</h2>
      {loading && <p>Loading...</p>}
      {error && <p className="error">{error}</p>}

      <div className="puja-cards">
        {pujas.map((puja) => (
          <div className="puja-card" key={puja.id}>
            {puja.image ? (
              <img
                src={puja.image.startsWith('http') ? puja.image : `https://beta.devalayas.com${puja.image}`}
                alt={puja.name}
                className="puja-image"
              />
            ) : (
              <div className="no-image">No Image</div>
            )}
            <h3>{puja.name || 'Untitled Puja'}</h3>
            <p>{puja.description || 'No description available.'}</p>
            <p><strong>Price:</strong> ₹{puja.price || 'N/A'}</p>
            <button className="book-button">Book Now</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PujaList;
