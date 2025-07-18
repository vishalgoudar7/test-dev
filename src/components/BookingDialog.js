// import React, { useState } from 'react';
// import DatePicker from 'react-datepicker';
// import 'react-datepicker/dist/react-datepicker.css';
// import '../styles/BookingDialog.css';
// import { useUserAuth } from '../context/UserAuthContext';

// const BookingDialog = ({ request, tabNo, close }) => {
//   const { profile } = useUserAuth();
//   const [booking, setBooking] = useState({
//     pooja_name: '',
//     booking_date: null,
//     name: '',
//     mobile_no: profile?.phone || '',
//     rashi: '',
//     comment: '',
//     prasadam: false,
//     prasadam_address: {
//       street_address_1: '',
//       street_address_2: '',
//       area: '',
//       city: '',
//       district: '',
//       state: '',
//       pincode: ''
//     },
//     prasad_delivery: false
//   });

//   const [error, setError] = useState({});

//   const validateMobileNumber = (e) => {
//     const val = e.target.value;
//     if (/^\d{0,10}$/.test(val)) {
//       setBooking({ ...booking, mobile_no: val });
//     }
//   };

//   const handleChange = (field, value) => {
//     setBooking(prev => ({ ...prev, [field]: value }));
//   };

//   const handleAddressChange = (field, value) => {
//     setBooking(prev => ({
//       ...prev,
//       prasadam_address: { ...prev.prasadam_address, [field]: value }
//     }));
//   };

//   const poojaSelections = () => {
//     console.log('Added to cart:', booking);
//   };

//   return (
//     <dialog id="payment" className="dialtag" open={request}>
//       <div className="card shadow mb-4">
//         <div className="card-header border-bottom">
//           <div className="close-btn" onClick={close}>
//             <i className="fas fa-times-circle"></i>
//           </div>
//           <h5>Booking Details</h5>
//         </div>
//         <div className="card-body">
//           <div className="mb-2">
//             <label>Pooja Name <span className="text-red">*</span></label>
//             <input type="text" value={booking.pooja_name} disabled className="form-control" placeholder="Pooja Name" />
//           </div>
//           <div className="mb-2">
//             <label>Booking Date <span className="text-red">*</span></label>
//             <DatePicker
//               selected={booking.booking_date}
//               onChange={date => handleChange('booking_date', date)}
//               dateFormat="dd/MM/yyyy"
//               minDate={new Date()}
//               className="form-control"
//               placeholderText="Select Booking Date"
//               disabled={!request}
//             />
//           </div>
//           <div className="mb-2">
//             <label>Devotee Name <span className="text-red">*</span></label>
//             <input
//               type="text"
//               value={booking.name}
//               onChange={e => handleChange('name', e.target.value)}
//               className="form-control"
//               disabled={!request}
//             />
//           </div>
//           <div className="mb-2">
//             <label>Devotee Mobile Number <span className="text-red">*</span></label>
//             <input
//               type="text"
//               value={profile?.phone || ''}
//               readOnly
//               className="form-control"
//               disabled
//             />
//           </div>

//           {tabNo === 2 && (
//             <>
//               <div className="mb-2">
//                 <label>Rashi, Nakshatra, Gotra</label>
//                 <textarea
//                   value={booking.rashi}
//                   onChange={e => handleChange('rashi', e.target.value)}
//                   className="form-control"
//                   disabled={!request}
//                 />
//               </div>
//               <div className="mb-2">
//                 <label>Sankalpa</label>
//                 <textarea
//                   value={booking.comment}
//                   onChange={e => handleChange('comment', e.target.value)}
//                   className="form-control"
//                   disabled={!request}
//                 />
//               </div>
//               <div className="mb-2">
//                 <label>
//                   <input
//                     type="checkbox"
//                     checked={booking.prasadam}
//                     onChange={e => handleChange('prasadam', e.target.checked)}
//                     disabled={!request}
//                   /> Do you want Prasadam?
//                 </label>
//               </div>
//             </>
//           )}

//           {(booking.prasadam || tabNo === 4) && (
//             <>
//               {['street_address_1', 'street_address_2', 'area', 'city', 'district', 'state', 'pincode'].map((field, i) => (
//                 <div className="mb-2" key={i}>
//                   <label>{field.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase())}</label>
//                   <input
//                     type="text"
//                     value={booking.prasadam_address[field] || ''}
//                     onChange={e => handleAddressChange(field, e.target.value)}
//                     className="form-control"
//                   />
//                 </div>
//               ))}
//             </>
//           )}

//           <div className="mb-0">
//             <button onClick={poojaSelections} className="btn btn-primary w-100">Add to Cart</button>
//             <p className="note">Note: Video availability is subject to temple consent</p>
//           </div>
//         </div>
//       </div>
//     </dialog>
//   );
// };

// export default BookingDialog;






















// src/components/BookingDialog.js
import React, { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import '../styles/BookingDialog.css';
import { useUserAuth } from '../context/UserAuthContext';
import moment from 'moment';

const BookingDialog = ({ request, tabNo, close, bookingDataFromParent, setBookingDataFromParent, handleConfirmBooking, pooja }) => {
  const { profile } = useUserAuth();

  const [error, setError] = useState({});

  useEffect(() => {
    if (pooja && setBookingDataFromParent) {
      setBookingDataFromParent(prev => ({
        ...prev,
        pooja_id: pooja.id,
        pooja_name: pooja.name,
        name: prev.name || profile?.name || '',
        mobile_no: prev.mobile_no || profile?.phone || localStorage.getItem("mobileNumber") || '',
        booking_date: prev.booking_date || null,
        rashi: prev.rashi || '',
        nakshatra: prev.nakshatra || '',
        gotra: prev.gotra || '',
        comment: prev.comment || '',
        prasadam: prev.prasadam || false,
        prasadam_address: prev.prasadam_address || {
          street_address_1: '', street_address_2: '', area: '', city: '', state: '', pincode: ''
        },
      }));
    }
  }, [pooja, profile, setBookingDataFromParent]);

  const handleChange = (field, value) => {
    setBookingDataFromParent(prev => ({ ...prev, [field]: value }));
    setError(prev => ({ ...prev, [field]: undefined }));
  };

  const handleAddressChange = (field, value) => {
    setBookingDataFromParent(prev => ({
      ...prev,
      prasadam_address: { ...prev.prasadam_address, [field]: value }
    }));
    setError(prev => ({ ...prev, [field]: undefined }));
  };

  const handleMobileNoChange = (e) => {
    const val = e.target.value;
    if (/^\d{0,10}$/.test(val)) {
      handleChange('mobile_no', val);
    }
  };

  const validateForm = () => {
    let newErrors = {};
    let isValid = true;

    if (!pooja?.name) {
      newErrors.pooja_name = "Pooja name is missing.";
      isValid = false;
    }

    if (!bookingDataFromParent.booking_date) {
      newErrors.booking_date = "The booking date is required.";
      isValid = false;
    }

    if (!bookingDataFromParent.name.trim()) {
      newErrors.name = "The devotee name is required.";
      isValid = false;
    } else {
      const regName_1 = /^[a-zA-Z]+ [a-zA-Z]+$/;
      const regName_2 = /^[a-zA-Z]+$/;
      if (!regName_1.test(bookingDataFromParent.name) && !regName_2.test(bookingDataFromParent.name)) {
        newErrors.name = "Please enter a valid full name (e.g., John Doe or John).";
        isValid = false;
      }
    }

    if (!bookingDataFromParent.mobile_no) {
      newErrors.mobile_no = "The devotee mobile number is required.";
      isValid = false;
    } else {
      if (!/^\d{10}$/.test(bookingDataFromParent.mobile_no)) {
        newErrors.mobile_no = "Enter a valid 10-digit mobile number.";
        isValid = false;
      }
    }

    if (bookingDataFromParent.prasadam) {
      const address = bookingDataFromParent.prasadam_address;
      if (!address.street_address_1.trim()) {
        newErrors.street_address_1 = "Street Address 1 is required for prasadam delivery.";
        isValid = false;
      }
      if (!address.area.trim()) {
        newErrors.area = "Area is required for prasadam delivery.";
        isValid = false;
      }
      if (!address.city.trim()) {
        newErrors.city = "City is required for prasadam delivery.";
        isValid = false;
      }
      if (!address.state.trim()) {
        newErrors.state = "State is required for prasadam delivery.";
        isValid = false;
      }
      if (!address.pincode.trim()) {
        newErrors.pincode = "Pincode is required for prasadam delivery.";
        isValid = false;
      } else if (!/^\d{6}$/.test(address.pincode)) {
        newErrors.pincode = "Pincode should be of 6 digits.";
        isValid = false;
      }
    }

    setError(newErrors);
    return isValid;
  };

  const handleConfirm = () => {
    if (validateForm()) {
      handleConfirmBooking(bookingDataFromParent);
    } else {
      console.log('Form validation failed:', error);
    }
  };

  return (
    <dialog id="payment" className="dialtag" open={request}>
      <div className="card shadow mb-4">
        <div className="card-header border-bottom">
          <div className="close-btn" onClick={close} style={{ cursor: 'pointer' }}>
            <i className="fas fa-times-circle"></i>
          </div>
          <h5>Booking Details</h5>
        </div>
        <div className="card-body" style={{ textAlign: 'left' }}>
          <div className="mb-2">
            <label className="form-label">Pooja Name <span className="text-danger">*</span></label>
            <input
              type="text"
              value={pooja?.name || ''}
              className="form-control"
              placeholder="Pooja Name"
              disabled
            />
            {error.pooja_name && <div className="text-danger small">{error.pooja_name}</div>}
          </div>
          <div className="mb-2">
            <label className="form-label">Booking Date <span className="text-danger">*</span></label>
            <DatePicker
              selected={bookingDataFromParent.booking_date}
              onChange={date => handleChange('booking_date', date)}
              dateFormat="dd/MM/yyyy"
              minDate={new Date()}
              className={`form-control ${error.booking_date ? 'is-invalid' : ''}`}
              placeholderText="Select Booking Date"
            />
            {error.booking_date && <div className="invalid-feedback d-block">{error.booking_date}</div>}
          </div>
          <div className="mb-2">
            <label className="form-label">Devotee Name <span className="text-danger">*</span></label>
            <input
              type="text"
              value={bookingDataFromParent.name}
              onChange={e => handleChange('name', e.target.value)}
              className={`form-control ${error.name ? 'is-invalid' : ''}`}
              placeholder="Devotee Name"
            />
            {error.name && <div className="invalid-feedback d-block">{error.name}</div>}
          </div>
          <div className="mb-2">
            <label className="form-label">Devotee Mobile Number <span className="text-danger">*</span></label>
            <input
              type="text"
              value={bookingDataFromParent.mobile_no}
              onChange={handleMobileNoChange}
              className={`form-control ${error.mobile_no ? 'is-invalid' : ''}`}
              placeholder="Devotee Mobile Number"
              maxLength="10"
            />
            {error.mobile_no && <div className="invalid-feedback d-block">{error.mobile_no}</div>}
          </div>

          {tabNo === 2 && (
            <>
              <div className="mb-2">
                <label className="form-label">Rashi</label>
                <textarea
                  value={bookingDataFromParent.rashi}
                  onChange={e => handleChange('rashi', e.target.value)}
                  className="form-control"
                  placeholder="Rashi"
                ></textarea>
              </div>
              <div className="mb-2">
                <label className="form-label">Nakshatra</label>
                <textarea
                  value={bookingDataFromParent.nakshatra}
                  onChange={e => handleChange('nakshatra', e.target.value)}
                  className="form-control"
                  placeholder="Nakshatra"
                ></textarea>
              </div>
              <div className="mb-2">
                <label className="form-label">Gotra</label>
                <textarea
                  value={bookingDataFromParent.gotra}
                  onChange={e => handleChange('gotra', e.target.value)}
                  className="form-control"
                  placeholder="Gotra"
                ></textarea>
              </div>
              <div className="mb-2">
                <label className="form-label">Sankalpa (Your Prayer/Intention)</label>
                <textarea
                  value={bookingDataFromParent.comment}
                  onChange={e => handleChange('comment', e.target.value)}
                  className="form-control"
                  placeholder="Sankalpa"
                ></textarea>
              </div>
              <div className="mb-2 form-check">
                <input
                  id="prasadamCheckbox"
                  type="checkbox"
                  checked={bookingDataFromParent.prasadam}
                  onChange={e => handleChange('prasadam', e.target.checked)}
                  className="form-check-input"
                />
                <label className="form-check-label" htmlFor="prasadamCheckbox">Do you want Prasadam?</label>
              </div>
            </>
          )}

          {bookingDataFromParent.prasadam && (
            <div className="prasadam-address-section mt-3 p-3 border rounded">
              <h6>Prasadam Delivery Address</h6>
              {['street_address_1', 'street_address_2', 'area', 'city', 'state', 'pincode'].map((field) => (
                <div className="mb-2" key={field}>
                  <label className="form-label">{field.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase())} <span className="text-danger">*</span></label>
                  <input
                    type="text"
                    value={bookingDataFromParent.prasadam_address[field] || ''}
                    onChange={e => handleAddressChange(field, e.target.value)}
                    className={`form-control ${error[field] ? 'is-invalid' : ''}`}
                    placeholder={field.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase())}
                  />
                  {error[field] && <div className="invalid-feedback d-block">{error[field]}</div>}
                </div>
              ))}
            </div>
          )}

          <div className="mb-0 mt-3">
            <button
              onClick={handleConfirm}
              className="btn btn-primary w-100"
            >
              Confirm Booking
            </button>
            <label className="note">Note: Video availability is subject to temple consent</label>
          </div>
        </div>
      </div>
    </dialog>
  );
};

export default BookingDialog;
