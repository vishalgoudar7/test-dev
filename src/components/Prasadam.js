// import React, { useEffect, useState } from 'react';
// import api from '../api/api';
// import '../styles/Prasadam.css';

// const Prasadam = () => {
//   const [prasadamList, setPrasadamList] = useState([]);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchPrasadam = async () => {
//       try {
//         const response = await api.get('/api/v1/devotee/pooja/');
//         const allItems = response.data?.results || [];

//         // Filter only items with 'prasadam' or 'prasad' in the name
//         const filtered = allItems.filter((item) =>
//           item.name?.toLowerCase().includes('prasadam') ||
//           item.name?.toLowerCase().includes('prasad')
//         );

//         setPrasadamList(filtered);
//       } catch (err) {
//         console.error('Prasadam API Error:', err);
//         setError('Failed to load prasadam data.');
//       }
//     };

//     fetchPrasadam();
//   }, []);

//   const addToCart = (item) => {
//     try {
//       const cart = JSON.parse(localStorage.getItem('cart')) || [];
//       const existingItem = cart.find((cartItem) => cartItem.id === item.id);

//       if (existingItem) {
//         existingItem.quantity += 1;
//       } else {
//         const poojaPrasadam = item.pooja_prasadam || {};
//         cart.push({
//           ...item,
//           quantity: 1,
//           cost: poojaPrasadam.cost || item.cost,
//           final_total: poojaPrasadam.original_cost || item.original_cost,
//         });
//       }

//       localStorage.setItem('cart', JSON.stringify(cart));
//       window.dispatchEvent(new Event('storage'));
//       window.dispatchEvent(new Event('open-cart-drawer'));
//     } catch (error) {
//       console.error('Failed to add to cart:', error);
//       alert('Could not add item to cart.');
//     }
//   };

//   if (error) return <div className="prasadam-error">{error}</div>;
//   if (!prasadamList.length) return <div className="prasadam-error">No prasadam available.</div>;

//   return (
//     <div className="prasadam-container">
//       {prasadamList.map((prasadam) => {
//         const poojaPrasadam = prasadam.pooja_prasadam || {};
//         const imageUrl =
//           prasadam.temple?.images?.[0]?.image ||
//           poojaPrasadam.temple?.images?.[0]?.image;
//         const temple = prasadam.temple || poojaPrasadam.temple || {};

//         return (
//           <div key={prasadam.id} className="prasadam-card">
//             <h3>🪔 {prasadam.name || poojaPrasadam.name || 'Prasadam'}</h3>

//             {imageUrl && (
//               <img
//                 src={imageUrl}
//                 alt={prasadam.name}
//                 className="prasadam-image"
//                 onError={(e) => {
//                   console.error('Image failed to load:', imageUrl);
//                   e.target.style.display = 'none';
//                 }}
//               />
//             )}

//             <div className="prasadam-card-content">
//               <p><strong>Details:</strong> {prasadam.details || poojaPrasadam.details || 'N/A'}</p>
//               <p><strong>Includes:</strong> {poojaPrasadam.included || 'N/A'}</p>
//               <p><strong>Benefits:</strong> {poojaPrasadam.excluded || '-'}</p>
//               <p><strong>Temple:</strong> {temple.name || 'N/A'}</p>
//               <p><strong>Cost:</strong> ₹ {poojaPrasadam.original_cost || poojaPrasadam.cost || 'N/A'}</p>
//             </div>

//             <button
//               className="prasadam-add-btn"
//               onClick={() => addToCart(prasadam)}
//             >
//               ADD TO CART ➡️
//             </button>
//           </div>
//         );
//       })}
//     </div>
//   );
// };

// export default Prasadam;







// import React, { useEffect, useState } from 'react';
// import api from '../api/api';
// import '../styles/Prasadam.css';

// const Prasadam = () => {
//   const [prasadamList, setPrasadamList] = useState([]);
//   const [error, setError] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchPrasadam = async () => {
//       try {
//         setLoading(true);
//         const response = await api.get('/api/v1/devotee/pooja/');
//         const allItems = response.data?.results || [];

//         const filtered = allItems.filter((item) =>
//           item.name?.toLowerCase().includes('prasadam') ||
//           item.name?.toLowerCase().includes('prasad')
//         );

//         setPrasadamList(filtered);
//         setLoading(false);
//       } catch (err) {
//         console.error('Prasadam API Error:', err);
//         setError('Failed to load prasadam data.');
//         setLoading(false);
//       }
//     };

//     fetchPrasadam();
//   }, []);

//   const addToCart = (item) => {
//     try {
//       const cart = JSON.parse(localStorage.getItem('cart')) || [];
//       const existingItem = cart.find((cartItem) => cartItem.id === item.id);

//       const poojaPrasadam = item.pooja_prasadam || {};

//       const cost = poojaPrasadam.cost || item.cost || 0;
//       const finalTotal = poojaPrasadam.original_cost || item.original_cost || cost;

//       if (existingItem) {
//         existingItem.quantity += 1;
//       } else {
//         cart.push({
//           ...item,
//           quantity: 1,
//           cost,
//           final_total: finalTotal,
//         });
//       }

//       localStorage.setItem('cart', JSON.stringify(cart));
//       window.dispatchEvent(new Event('storage'));
//       window.dispatchEvent(new Event('open-cart-drawer'));
//     } catch (error) {
//       console.error('Failed to add to cart:', error);
//       alert('Could not add item to cart.');
//     }
//   };

//   if (loading) {
//     return (
//       <div className="prasadam-loading">
//         <div className="loader"></div>
//         <p>Loading prasadam...</p>
//       </div>
//     );
//   }

//   if (error) return <div className="prasadam-error">{error}</div>;
//   if (!prasadamList.length) return <div className="prasadam-error">No prasadam available.</div>;

//   return (
//     <div className="prasadam-container">
//       {prasadamList.map((prasadam) => {
//         const poojaPrasadam = prasadam.pooja_prasadam || {};
//         const imageUrl =
//           prasadam.temple?.images?.[0]?.image ||
//           poojaPrasadam.temple?.images?.[0]?.image;
//         const temple = prasadam.temple || poojaPrasadam.temple || {};

//         const includes = poojaPrasadam.included || prasadam.included || 'Not specified';
//         const benefits = poojaPrasadam.excluded || prasadam.excluded || '-';
//         const cost = poojaPrasadam.original_cost || poojaPrasadam.cost || prasadam.cost || 'Not specified';

//         return (
//           <div key={prasadam.id} className="prasadam-card">
//             <h3>🪔 {prasadam.name || poojaPrasadam.name || 'Prasadam'}</h3>

//             {imageUrl && (
//               <img
//                 src={imageUrl}
//                 alt={prasadam.name}
//                 className="prasadam-image"
//                 onError={(e) => {
//                   console.error('Image failed to load:', imageUrl);
//                   e.target.style.display = 'none';
//                 }}
//               />
//             )}

//             <div className="prasadam-card-content">
//               <p><strong>Details:</strong> {prasadam.details || poojaPrasadam.details || 'N/A'}</p>
//               <p><strong>Includes:</strong> {includes}</p>
//               <p><strong>Benefits:</strong> {benefits}</p>
//               <p><strong>Temple:</strong> {temple.name || 'N/A'}</p>
//               <p><strong>Cost:</strong> ₹ {cost}</p>
//             </div>

//             <button
//               className="prasadam-add-btn"
//               onClick={() => addToCart(prasadam)}
//             >
//               ADD TO CART ➡️
//             </button>
//           </div>
//         );
//       })}
//     </div>
//   );
// };

// export default Prasadam;















import React, { useEffect, useState } from 'react';
import api from '../api/api';
import '../styles/Prasadam.css';

const Prasadam = () => {
  const [prasadamList, setPrasadamList] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPrasadam = async () => {
      try {
        setLoading(true);
        const response = await api.get('/api/v1/devotee/pooja/');
        const allItems = response.data?.results || [];

        const filtered = allItems.filter((item) =>
          item.name?.toLowerCase().includes('prasadam') ||
          item.name?.toLowerCase().includes('prasad')
        );

        setPrasadamList(filtered);
        setLoading(false);
      } catch (err) {
        console.error('Prasadam API Error:', err);
        setError('Failed to load prasadam data.');
        setLoading(false);
      }
    };

    fetchPrasadam();
  }, []);

  const addToCart = (item) => {
    try {
      const cart = JSON.parse(localStorage.getItem('cart')) || [];
      const existingItem = cart.find((cartItem) => cartItem.id === item.id);

      const poojaPrasadam = item.pooja_prasadam || {};
      const cost = poojaPrasadam.cost || item.cost || 0;
      const finalTotal = poojaPrasadam.original_cost || item.original_cost || cost;

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        cart.push({
          ...item,
          quantity: 1,
          cost,
          final_total: finalTotal,
        });
      }

      localStorage.setItem('cart', JSON.stringify(cart));
      window.dispatchEvent(new Event('storage'));
      window.dispatchEvent(new Event('open-cart-drawer'));
    } catch (error) {
      console.error('Failed to add to cart:', error);
      alert('Could not add item to cart.');
    }
  };

  if (loading) {
    return (
      <div className="prasadam-loading">
        <div className="loader"></div>
        <p>Loading prasadam...</p>
      </div>
    );
  }

  if (error) return <div className="prasadam-error">{error}</div>;
  if (!prasadamList.length) return <div className="prasadam-error">No prasadam available.</div>;

  return (
    <div className="prasadam-container">
      {prasadamList.map((prasadam, index) => {
        console.log(`Prasadam #${index + 1}`, prasadam);

        const poojaPrasadam = prasadam.pooja_prasadam || {};
        const imageUrl =
          prasadam.temple?.images?.[0]?.image ||
          poojaPrasadam.temple?.images?.[0]?.image;
        const temple = prasadam.temple || poojaPrasadam.temple || {};

        const includes = poojaPrasadam.included || prasadam.included || 'Not specified';
        const benefits = poojaPrasadam.excluded || prasadam.excluded || '-';

        const rawCost =
          poojaPrasadam.original_cost ||
          poojaPrasadam.cost ||
          prasadam.original_cost ||
          prasadam.cost ||
          null;

        const costDisplay = rawCost && !isNaN(rawCost) ? `₹ ${rawCost}` : 'Not Available';

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

            <div className="prasadam-card-content">
              <p><strong>Details:</strong> {prasadam.details || poojaPrasadam.details || 'N/A'}</p>
              <p><strong>Includes:</strong> {includes}</p>
              <p><strong>Benefits:</strong> {benefits}</p>
              <p><strong>Temple:</strong> {temple.name || 'N/A'}</p>
              <p><strong>Cost:</strong> {costDisplay}</p>
            </div>

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
