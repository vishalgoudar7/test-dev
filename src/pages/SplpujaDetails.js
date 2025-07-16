// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import api from "../api/api";
// import "../styles/SplpujaDetails.css";

// const fallbackImage = "/assets/images/placeholder.png";

// const SplpujaDetails = () => {
//   const { subCategoryId } = useParams();
//   const [pujaDetails, setPujaDetails] = useState(null);

//   useEffect(() => {
//     if (subCategoryId) {
//       fetchPujaDetails();
//     }
//   }, [subCategoryId]);

//   const fetchPujaDetails = async () => {
//     try {
//       const res = await api.get(`/api/v1/category/sub_category/?id=${subCategoryId}`);
//       const allResults = res.data?.results || [];

//       // 🛠️ Find the matching sub-category by ID
//       const matched = allResults.find(
//         (item) => String(item.id) === String(subCategoryId)
//       );

//       if (matched) {
//         setPujaDetails(matched);
//       } else {
//         console.warn("Subcategory not found for ID:", subCategoryId);
//       }
//     } catch (error) {
//       console.error("Failed to fetch puja details", error);
//     }
//   };

//   if (!pujaDetails) {
//     return (
//       <div className="text-center mt-5">
//         <h4>Loading puja details...</h4>
//       </div>
//     );
//   }

//   return (
//     <div className="spl-puja-details container mt-5">
//       <div className="row">
//         <div className="col-md-5">
//           <img
//             src={pujaDetails.image || fallbackImage}
//             alt={pujaDetails.name}
//             className="spl-puja-image"
//           />
//         </div>
//         <div className="col-md-7">
//           <h2 className="spl-puja-title">🙏 {pujaDetails.name}</h2>
//           <p className="spl-puja-description">
//             {pujaDetails.description || "No description provided for this puja."}
//           </p>

//           <button className="spl-book-btn mt-4">Book This Puja</button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SplpujaDetails;









// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import api from "../api/api";
// import "../styles/SplpujaDetails.css";

// const fallbackImage = "/assets/images/placeholder.png";

// const SplpujaDetails = () => {
//   const { subCategoryId } = useParams();
//   const [pujaDetails, setPujaDetails] = useState(null);

//   useEffect(() => {
//     if (subCategoryId) {
//       fetchPujaDetails();
//     }
//   }, [subCategoryId]);

//   const fetchPujaDetails = async () => {
//     try {
//       const res = await api.get(`/api/v1/category/sub_category/?id=${subCategoryId}`);
//       const matched = res.data.results.find(
//         (item) => String(item.id) === String(subCategoryId)
//       );
//       setPujaDetails(matched || null);
//     } catch (error) {
//       console.error("Error fetching puja details:", error);
//     }
//   };

//   if (!pujaDetails) {
//     return <div className="loading">Loading puja details...</div>;
//   }

//   return (
//     <div className="puja-details-container container">
//       <div className="puja-card">
//         <div className="puja-image-section">
//           <img
//             src={pujaDetails.image || fallbackImage}
//             alt={pujaDetails.name}
//             className="puja-image"
//           />
//           {pujaDetails?.category?.length > 0 && (
//             <div className="category-label">
//               {pujaDetails.category[0]?.name || "Category"}
//             </div>
//           )}
//         </div>

//         <div className="puja-content">
//           <h2 className="puja-title">{pujaDetails.name}</h2>
//           <p className="puja-description">{pujaDetails.description}</p>
//           <h4 className="puja-price">₹ {pujaDetails.price || "21000.00"}</h4>

//           <button className="participate-button">➕ Participate</button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SplpujaDetails;












// src/pages/SplpujaDetails.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../api/api';
import BookingDialog from '../components/BookingDialog';
import OrderDetails from '../components/OrderDetails';
import '../styles/SplpujaDetails.css';

const SplpujaDetails = () => {
  const { categoryId, subCategoryId } = useParams(); // from route like /List/category/:categoryId/sub_category/:subCategoryId
  const [splPoojas, setSplPoojas] = useState([]);
  const [selectedPooja, setSelectedPooja] = useState(null);
  const [showBookingDialog, setShowBookingDialog] = useState(false);
  const [showOrderDetails, setShowOrderDetails] = useState(false);
  const [bookingData, setBookingData] = useState({});
  const [payment, setPayment] = useState({});

  useEffect(() => {
    if (categoryId && subCategoryId) {
      api.get(`/devotee/pooja/?category=${categoryId}&sub_category=${subCategoryId}`)
        .then(res => setSplPoojas(res.data.results))
        .catch(console.error);
    }
  }, [categoryId, subCategoryId]);

  const handleParticipate = (pooja) => {
    setSelectedPooja(pooja);
    setBookingData({
      ...bookingData,
      pooja_name: pooja.name,
      mobile_no: localStorage.getItem('mobileNumber') || '',
    });
    setShowBookingDialog(true);
  };

  const closeBookingDialog = () => {
    setShowBookingDialog(false);
  };

  const handleConfirmBooking = () => {
    api.post('/devotee/pooja_request/', {
      ...bookingData,
      pooja: selectedPooja.id,
    })
      .then((res) => {
        setPayment(res.data);
        setShowOrderDetails(true);
        setShowBookingDialog(false);
      })
      .catch(console.error);
  };

  const handleRazorpay = () => {
    alert('Proceeding to payment...');
  };

  return (
    <main style={{ backgroundColor: '#fde5d1' }}>
      <div className="container pt-4 text-start">
        {splPoojas.map(pooja => (
          <div key={pooja.id} className="card card-body border mb-4">
            <div className="position-relative">
              <img
                src={pooja.images[0]?.image}
                alt={pooja.name}
                className="img-fluid"
                style={{ height: '300px', objectFit: 'cover' }}
              />
              <div className="card-img-overlay p-3">
                <span className="badge bg-success">{pooja.god.avatar}</span>
              </div>
            </div>
            <h5 className="card-title mt-3">{pooja.name}</h5>
            <p>{pooja.details}</p>
            <div dangerouslySetInnerHTML={{ __html: pooja.included }} />
            <div className="d-flex justify-content-between align-items-center mt-3">
              <h5>₹{pooja.original_cost}</h5>
              <button onClick={() => handleParticipate(pooja)} className="btn btn-primary">
                <i className="bi bi-plus-lg"></i> Participate
              </button>
            </div>
          </div>
        ))}

        {showBookingDialog && (
          <BookingDialog
            request={true}
            tabNo={2}
            close={closeBookingDialog}
            bookingData={bookingData}
            setBookingData={setBookingData}
            handleConfirmBooking={handleConfirmBooking}
          />
        )}

        {showOrderDetails && (
          <OrderDetails
            payment={payment?.payment_data || {}}
            booking={bookingData}
            razorpayPayment={handleRazorpay}
            closeDialog={() => setShowOrderDetails(false)}
          />
        )}
      </div>
    </main>
  );
};

export default SplpujaDetails;
