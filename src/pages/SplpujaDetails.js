// import React, { useEffect, useState } from 'react';
// import { Link,useParams } from 'react-router-dom';
// import api from '../api/api';
// import '../styles/SplpujaDetails.css';


// const SplpujaDetails = () => {
//   const { categoryId, subCategoryId } = useParams();
//   const [poojas, setPoojas] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchPoojas = async () => {
//       try {
//         const response = await api.get('/api/v1/devotee/pooja/', {
//           params: {
//             category: categoryId,
//             sub_category: subCategoryId,
//           },
//         });
//         setPoojas(response.data.results || []);
//       } catch (error) {
//         console.error("Error fetching poojas:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     if (categoryId && subCategoryId) {
//       fetchPoojas();
//     }
//   }, [categoryId, subCategoryId]);

//   if (loading) return <p className="loading">Loading...</p>;

//   return (
//     <div className="splpuja-wrapper">
//       {poojas.length === 0 ? (
//         <p>No poojas available.</p>
//       ) : (
//         poojas.map((pooja) => (
//           <div className="splpuja-card" key={pooja.id}>
//             <img
//               src={pooja.images?.[0]?.image || 'https://via.placeholder.com/200'}
//               alt={pooja.name}
//               className="splpuja-image"
//             />
//             <div className="splpuja-content">
//               <h3 className="splpuja-title">{pooja.name}</h3>
//               <ul className="splpuja-description">
//                 {pooja.details?.split('.').filter(line => line.trim()).map((point, idx) => (
//                   <li key={idx}>• {point.trim()}</li>
//                 ))}
//               </ul>
//               <div className="splpuja-bottom">
//   <span className="splpuja-price">₹ {pooja.original_cost}</span>
//   <Link
//     to={`/book?pujaName=${encodeURIComponent(pooja.name)}`}
//     className="splpuja-button"
//   >
//     Participate
//   </Link>
// </div>
//         </div>
//           </div>
//         ))
//       )}
//     </div>
//   );
// };

// export default SplpujaDetails;





import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../api/api';
import '../styles/SplpujaDetails.css';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for redirection

const SplpujaDetails = () => {
  const { categoryId, subCategoryId } = useParams();
  const [poojas, setPoojas] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate(); // Initialize useNavigate

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
        console.error("Error fetching poojas:", error);
      } finally {
        setLoading(false);
      }
    };

    if (categoryId && subCategoryId) {
      fetchPoojas();
    }
  }, [categoryId, subCategoryId]);

  // Handler for when the "Participate" button is clicked
  const handleParticipateClick = (pooja) => {
    // Get current cart from localStorage
    const currentCart = JSON.parse(localStorage.getItem('cart')) || [];

    // Check if the item already exists in the cart
    const existingItemIndex = currentCart.findIndex(item => item.id === pooja.id);

    // Always create the 'details' string as "city, district" for the cart item
    const itemDetailsForCart = (pooja.temple && pooja.temple.city && pooja.temple.district)
      ? `${pooja.temple.city}, ${pooja.temple.district}`
      : ''; // Provide an empty string if location details are missing

    // Construct the item object exactly as desired for the cart
    const newItem = {
      id: pooja.id, // Use pooja.id
      name: pooja.name, // Use pooja.name
      city: pooja.temple?.city, // Include city if available
      district: pooja.temple?.district, // Include district if available
      images: pooja.images, // Use pooja.images
      quantity: 1,
      cost: pooja.original_cost || 100, // Use pooja.original_cost
      final_total: pooja.original_cost || 100, // Use pooja.original_cost
      details: itemDetailsForCart // This is the key change: always city, district
    };

    if (existingItemIndex > -1) {
      // If item exists, increment its quantity
      currentCart[existingItemIndex].quantity = (currentCart[existingItemIndex].quantity || 1) + 1;
      // Also update details and other properties in case the item structure changed
      currentCart[existingItemIndex].name = newItem.name;
      currentCart[existingItemIndex].city = newItem.city;
      currentCart[existingItemIndex].district = newItem.district;
      currentCart[existingItemIndex].images = newItem.images;
      currentCart[existingItemIndex].cost = newItem.cost;
      currentCart[existingItemIndex].final_total = newItem.final_total;
      currentCart[existingItemIndex].details = newItem.details;
    } else {
      // If item doesn't exist, add the newly constructed item to the cart
      currentCart.push(newItem);
    }

    // Save the updated cart back to localStorage
    localStorage.setItem('cart', JSON.stringify(currentCart));
    // Dispatch a custom event to notify other components (like CartPage) of the storage change
    window.dispatchEvent(new Event('storage'));

    // Navigate the user to the cart page
    navigate('/cart');
  };

  if (loading) return <p className="loading">Loading...</p>;

  return (
    <div className="splpuja-wrapper">
      {poojas.length === 0 ? (
        <p>No poojas available.</p>
      ) : (
        poojas.map((pooja) => (
          <div className="splpuja-card" key={pooja.id}>
            <img
              src={pooja.images?.[0]?.image || 'https://via.placeholder.com/200'}
              alt={pooja.name}
              className="splpuja-image"
            />
            <div className="splpuja-content">
              <h3 className="splpuja-title">{pooja.name}</h3>
              {/* Display temple location if available on SplpujaDetails page */}
              {pooja.temple && pooja.temple.city && pooja.temple.district && (
                <div className="splpuja-location">
                  {pooja.temple.city}, {pooja.temple.district}
                </div>
              )}
              {/* This section ensures full puja details are displayed on SplpujaDetails page */}
              <ul className="splpuja-description">
                {pooja.details?.split('.').filter(line => line.trim()).map((point, idx) => (
                  <li key={idx}>• {point.trim()}</li>
                ))}
              </ul>
              <div className="splpuja-bottom">
                <span className="splpuja-price">₹ {pooja.original_cost}</span>
                <button
                  onClick={() => handleParticipateClick(pooja)}
                  className="splpuja-button"
                >
                  Participate
                </button>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default SplpujaDetails;
