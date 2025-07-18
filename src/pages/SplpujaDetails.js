
// // src/pages/SplpujaDetails.js
// import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import api from '../api/api';
// import BookingDialog from '../components/BookingDialog';
// import OrderDetails from '../components/OrderDetails';
// import '../styles/SplpujaDetails.css';

// const SplpujaDetails = () => {
//   const { categoryId, subCategoryId } = useParams(); // from route like /List/category/:categoryId/sub_category/:subCategoryId
//   const [splPoojas, setSplPoojas] = useState([]);
//   const [selectedPooja, setSelectedPooja] = useState(null);
//   const [showBookingDialog, setShowBookingDialog] = useState(false);
//   const [showOrderDetails, setShowOrderDetails] = useState(false);
//   const [bookingData, setBookingData] = useState({});
//   const [payment, setPayment] = useState({});

//   useEffect(() => {
//     if (categoryId && subCategoryId) {
//       api.get(`/devotee/pooja/?category=${categoryId}&sub_category=${subCategoryId}`)
//         .then(res => setSplPoojas(res.data.results))
//         .catch(console.error);
//     }
//   }, [categoryId, subCategoryId]);

//   const handleParticipate = (pooja) => {
//     setSelectedPooja(pooja);
//     setBookingData({
//       ...bookingData,
//       pooja_name: pooja.name,
//       mobile_no: localStorage.getItem('mobileNumber') || '',
//     });
//     setShowBookingDialog(true);
//   };

//   const closeBookingDialog = () => {
//     setShowBookingDialog(false);
//   };

//   const handleConfirmBooking = () => {
//     api.post('/devotee/pooja_request/', {
//       ...bookingData,
//       pooja: selectedPooja.id,
//     })
//       .then((res) => {
//         setPayment(res.data);
//         setShowOrderDetails(true);
//         setShowBookingDialog(false);
//       })
//       .catch(console.error);
//   };

//   const handleRazorpay = () => {
//     alert('Proceeding to payment...');
//   };

//   return (
//     <main style={{ backgroundColor: '#fde5d1' }}>
//       <div className="container pt-4 text-start">
//         {splPoojas.map(pooja => (
//           <div key={pooja.id} className="card card-body border mb-4">
//             <div className="position-relative">
//               <img
//                 src={pooja.images[0]?.image}
//                 alt={pooja.name}
//                 className="img-fluid"
//                 style={{ height: '300px', objectFit: 'cover' }}
//               />
//               <div className="card-img-overlay p-3">
//                 <span className="badge bg-success">{pooja.god.avatar}</span>
//               </div>
//             </div>
//             <h5 className="card-title mt-3">{pooja.name}</h5>
//             <p>{pooja.details}</p>
//             <div dangerouslySetInnerHTML={{ __html: pooja.included }} />
//             <div className="d-flex justify-content-between align-items-center mt-3">
//               <h5>₹{pooja.original_cost}</h5>
//               <button onClick={() => handleParticipate(pooja)} className="btn btn-primary">
//                 <i className="bi bi-plus-lg"></i> Participate
//               </button>
//             </div>
//           </div>
//         ))}

//         {showBookingDialog && (
//           <BookingDialog
//             request={true}
//             tabNo={2}
//             close={closeBookingDialog}
//             bookingData={bookingData}
//             setBookingData={setBookingData}
//             handleConfirmBooking={handleConfirmBooking}
//           />
//         )}

//         {showOrderDetails && (
//           <OrderDetails
//             payment={payment?.payment_data || {}}
//             booking={bookingData}
//             razorpayPayment={handleRazorpay}
//             closeDialog={() => setShowOrderDetails(false)}
//           />
//         )}
//       </div>
//     </main>
//   );
// };

// export default SplpujaDetails;













// src/pages/SplpujaDetails.js
import React, { useEffect, useState, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../api/api';
import BookingDialog from '../components/BookingDialog';
import OrderDetails from '../components/OrderDetails';
import '../styles/SplpujaDetails.css';
import { useUserAuth } from '../context/UserAuthContext';
import moment from 'moment';

const fallbackPoojaImage = "https://placehold.co/600x300/E0E0E0/333333?text=Pooja+Image";

const SplpujaDetails = () => {
  const { categoryId: c_id, subCategoryId: s_id } = useParams();
  const navigate = useNavigate();
  const { profile, signInMbl } = useUserAuth();

  const [splPoojaDetails, setSplPoojaDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [showBookingDialog, setShowBookingDialog] = useState(false);
  const [showOrderDetails, setShowOrderDetails] = useState(false);
  const [selectedPoojaForBooking, setSelectedPoojaForBooking] = useState(null);

  const [bookingData, setBookingData] = useState({
    pooja_id: "",
    name: "",
    mobile_no: profile?.phone || localStorage.getItem("mobileNumber") || "",
    booking_date: null,
    rashi: "",
    nakshatra: "",
    gotra: "",
    comment: "",
    prasadam: false,
    prasadam_address: {
      street_address_1: "",
      street_address_2: "",
      area: "",
      city: "",
      state: "",
      pincode: "",
    },
  });

  const [paymentDetails, setPaymentDetails] = useState({});
  const [razorpayKey, setRazorpayKey] = useState("");
  const [orderId, setOrderId] = useState("");

  useEffect(() => {
    if (c_id && s_id) {
      fetchPoojaDetails();
    } else {
      setLoading(false);
      setError("Pooja details cannot be loaded. Category or Sub-Category ID is missing.");
    }
    window.scrollTo(0, 0);
  }, [c_id, s_id]);

  useEffect(() => {
    if (showOrderDetails && Object.keys(paymentDetails).length > 0) {
      fetchRazorpayKey();
    }
  }, [showOrderDetails, paymentDetails]);

  const placeOrder = useCallback(async (rz_response) => {
    try {
      const data = {
        razorpay_response: rz_response,
        request_id: paymentDetails.id,
      };
      await api.post("devotee/pooja_request/payment/", data);
      navigate(`/order/${rz_response.razorpay_payment_id}/${orderId}`);
    } catch (err) {
      console.error("Error placing order after Razorpay:", err);
      alert("Payment verification failed. Please contact support.");
    }
  }, [navigate, paymentDetails.id, orderId]);

  const fetchPoojaDetails = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await api.get(`/pooja?category=${c_id}&sub_category=${s_id}`);
      setSplPoojaDetails(res.data.results.length > 0 ? res.data.results[0] : null);
      if (res.data.results.length === 0) {
        setError("No pooja details found for this selection.");
      }
    } catch (err) {
      console.error("Error fetching special pooja details:", err);
      if (err.response && err.response.status === 404) {
        setError("Pooja details not found for this category and sub-category. Please check the URL.");
      } else {
        setError("Failed to load pooja details. Please try again later.");
      }
    } finally {
      setLoading(false);
    }
  };

  const fetchRazorpayKey = async () => {
    try {
      const response = await api.get("devotee/payment_key/");
      setRazorpayKey(response.data.key);
    } catch (err) {
      console.error("Error fetching Razorpay key:", err);
    }
  };

  const handleParticipate = async (pooja) => {
    setSelectedPoojaForBooking(pooja);
    setBookingData(prev => ({
      ...prev,
      pooja_id: pooja.id,
      pooja_name: pooja.name,
      name: prev.name || profile?.name || "",
      mobile_no: prev.mobile_no || profile?.phone || localStorage.getItem("mobileNumber") || "",
      booking_date: prev.booking_date || null,
      rashi: prev.rashi || "", nakshatra: prev.nakshatra || "", gotra: prev.gotra || "", comment: prev.comment || "",
      prasadam: prev.prasadam || false,
      prasadam_address: prev.prasadam_address || { street_address_1: "", street_address_2: "", area: "", city: "", state: "", pincode: "" },
    }));

    if (!signInMbl) {
      alert("Please sign in to participate in the pooja.");
      return;
    }

    setShowBookingDialog(true);
  };

  const closeBookingDialog = () => {
    setShowBookingDialog(false);
    setSelectedPoojaForBooking(null);
  };

  const handleConfirmBooking = async (currentBookingData) => {
    try {
      const payload = {
        pooja: currentBookingData.pooja_id,
        pooja_date: moment(currentBookingData.booking_date).format("YYYY-MM-DD"),
        name: currentBookingData.name,
        devotee_number: currentBookingData.mobile_no,
        is_prasadam_delivery: currentBookingData.prasadam,
        family_member: [{
          id: null,
          name: currentBookingData.name,
          father_name: "", kula: "",
          gotra: currentBookingData.gotra,
          rashi: currentBookingData.rashi,
          nakshatra: currentBookingData.nakshatra,
          caste: "", subcaste: "", age: "",
          save_for_future: false,
          date_of_birth: null, place_of_birth: null, time_of_birth: null,
        }],
        comment: `${currentBookingData.comment || ''} (Nakshatra: ${currentBookingData.nakshatra || ''})(Gotra: ${currentBookingData.gotra || ''})(Rashi: ${currentBookingData.rashi || ''})`,
        booked_by: "CSC",
      };

      if (currentBookingData.prasadam) {
        payload.prasadam_address = {
          street_address_1: currentBookingData.prasadam_address.street_address_1,
          street_address_2: currentBookingData.prasadam_address.street_address_2,
          area: currentBookingData.prasadam_address.area,
          city: currentBookingData.prasadam_address.city,
          state: currentBookingData.prasadam_address.state,
          pincode: currentBookingData.prasadam_address.pincode,
        };
      }

      const res = await api.post("devotee/pooja_request/", payload);
      setPaymentDetails(res.data);
      setOrderId(res.data.order_id);
      setShowBookingDialog(false);
      setShowOrderDetails(true);
    } catch (err) {
      console.error("Error confirming booking:", err.response ? err.response.data : err.message);
      alert("Failed to confirm booking: " + (err.response?.data?.detail || err.message || "Please try again."));
    }
  };

  const handleRazorpayPayment = () => {
    if (!razorpayKey || !paymentDetails?.payment_order_id || !paymentDetails?.payment_data?.final_total) {
      alert("Payment details are incomplete. Please try again or contact support.");
      return;
    }

    const amountInPaisa = paymentDetails.payment_data.final_total * 100;

    const options = {
      key: razorpayKey,
      amount: amountInPaisa,
      currency: "INR",
      name: "Devalaya",
      description: "Payment towards Event Pooja",
      image: "https://cdn.shopify.com/s/files/1/0735/5895/0166/files/unnamed_copy_ac3ece77-8a3a-44b7-b0f2-820c39455044.jpg?v=1679241399&width=500",
      order_id: paymentDetails.payment_order_id,
      handler: function (response) {
        placeOrder(response);
      },
      prefill: {
        name: bookingData.name,
        email: profile?.email || "",
        contact: bookingData.mobile_no,
      },
      notes: {
        address: "Devalaya",
      },
      theme: {
        color: "#df3002",
      },
    };

    if (window.Razorpay) {
      const rzp1 = new window.Razorpay(options);
      rzp1.on("payment.failed", function (response) {
        alert("Payment failed: " + response.error.description);
        console.error("Razorpay Payment Failed:", response.error);
      });
      rzp1.open();
    } else {
      alert("Razorpay SDK not loaded. Please try again.");
      console.error("Razorpay SDK (window.Razorpay) is not available.");
    }
  };

  const closeOrderDetails = () => {
    setShowOrderDetails(false);
    setPaymentDetails({});
    setOrderId("");
  };

  if (loading) {
    return (
      <main style={{ backgroundColor: '#fde5d1', minHeight: 'calc(100vh - 60px)' }} className="d-flex justify-content-center align-items-center">
        <div className="text-center">Loading pooja details...</div>
      </main>
    );
  }

  if (error) {
    return (
      <main style={{ backgroundColor: '#fde5d1', minHeight: 'calc(100vh - 60px)' }} className="d-flex justify-content-center align-items-center">
        <div className="alert alert-danger text-center">{error}</div>
      </main>
    );
  }

  if (!splPoojaDetails) {
    return (
      <main style={{ backgroundColor: '#fde5d1', minHeight: 'calc(100vh - 60px)' }} className="d-flex justify-content-center align-items-center">
        <div className="text-center">No pooja details available for this selection.</div>
      </main>
    );
  }

  return (
    <main style={{ backgroundColor: '#fde5d1', minHeight: 'calc(100vh - 60px)' }}>
      <div className="container pt-4 text-start">
        <div key={splPoojaDetails.id} className="card card-body border mb-4 shadow-sm">
          <div className="position-relative">
            <img
              src={splPoojaDetails.images && splPoojaDetails.images.length > 0 ? splPoojaDetails.images[0].image : fallbackPoojaImage}
              alt={splPoojaDetails.name}
              className="img-fluid rounded"
              style={{ height: '300px', objectFit: 'cover', width: '100%' }}
              onError={(e) => { e.target.onerror = null; e.target.src = fallbackPoojaImage; }}
            />
            <div className="card-img-overlay p-3 text-end">
              <span className="badge bg-success">{splPoojaDetails.god?.avatar || 'God'}</span>
            </div>
          </div>
          <h5 className="card-title mt-3">{splPoojaDetails.name}</h5>
          <div className="d-flex align-items-center flex-wrap">
            <span className="me-2" dangerouslySetInnerHTML={{ __html: splPoojaDetails.details }}></span>
            {splPoojaDetails.included && (
              <span className="me-2" dangerouslySetInnerHTML={{ __html: splPoojaDetails.included }}></span>
            )}
          </div>

          {splPoojaDetails.excluded && (
            <>
              <h6 className="mt-3">What's Excluded:</h6>
              <div dangerouslySetInnerHTML={{ __html: splPoojaDetails.excluded }} />
            </>
          )}
          {splPoojaDetails.instructions && (
            <>
              <h6 className="mt-3">Instructions:</h6>
              <div dangerouslySetInnerHTML={{ __html: splPoojaDetails.instructions }} />
            </>
          )}

          <div className="d-sm-flex justify-content-between mt-4 border-top pt-3">
            <div className="hstack gap-1">
              <h5 className="mb-0">₹ {splPoojaDetails.original_cost}</h5>
            </div>
            <div className="mt-2 mt-sm-0">
              <button
                onClick={() => handleParticipate(splPoojaDetails)}
                className="button btn btn-sm btn-primary mb-0 px-4"
              >
                <i className="bi bi-plus-lg me-2"></i> Participate
              </button>
            </div>
          </div>
        </div>

        {showBookingDialog && (
          <BookingDialog
            request={showBookingDialog}
            tabNo={2}
            close={closeBookingDialog}
            bookingDataFromParent={bookingData}
            setBookingDataFromParent={setBookingData}
            handleConfirmBooking={handleConfirmBooking}
            pooja={selectedPoojaForBooking}
          />
        )}

        {showOrderDetails && (
          <OrderDetails
            payment={paymentDetails}
            booking={bookingData}
            razorpayPayment={handleRazorpayPayment}
            closeDialog={closeOrderDetails}
          />
        )}
      </div>
    </main>
  );
};

export default SplpujaDetails;
