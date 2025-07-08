// // src/components/BookingDialog.js
// import React from 'react';
// import '../styles/BookingDialog.css';

// const BookingDialog = ({ booking, setBooking, error, setError, request, tabNo, bookingDateRange, poojaSelections, closeDialog }) => {
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setBooking({ ...booking, [name]: value });
//   };

//   const handleAddressChange = (e) => {
//     const { name, value } = e.target;
//     setBooking({
//       ...booking,
//       prasadam_address: { ...booking.prasadam_address, [name]: value },
//     });
//   };

//   return (
//     <div className="card shadow">
//       <div className="card-header border-bottom d-flex justify-content-between align-items-center">
//         <h5 className="mb-0">Booking Details</h5>
//         <i className="fas fa-times-circle" onClick={closeDialog}></i>
//       </div>
//       <div className="card-body">
//         <form>
//           <div className="form-group">
//             <label>Devotee Name</label>
//             <input type="text" name="name" className="form-control" value={booking.name} onChange={handleChange} />
//             {error.name && <small className="text-danger">{error.name}</small>}
//           </div>
//           <div className="form-group">
//             <label>Mobile Number</label>
//             <input type="text" name="mobile_no" className="form-control" value={booking.mobile_no} onChange={handleChange} />
//             {error.mobile_no && <small className="text-danger">{error.mobile_no}</small>}
//           </div>
//           <div className="form-group">
//             <label>Booking Date</label>
//             <input type="date" name="booking_date" className="form-control" value={booking.booking_date} onChange={handleChange} />
//             {error.booking_date && <small className="text-danger">{error.booking_date}</small>}
//           </div>

//           {booking.prasadam && (
//             <>
//               <div className="form-group">
//                 <label>Street Address 1</label>
//                 <input type="text" name="street_address_1" className="form-control" value={booking.prasadam_address.street_address_1} onChange={handleAddressChange} />
//                 {error.address_1 && <small className="text-danger">{error.address_1}</small>}
//               </div>
//               <div className="form-group">
//                 <label>Area</label>
//                 <input type="text" name="area" className="form-control" value={booking.prasadam_address.area} onChange={handleAddressChange} />
//                 {error.area && <small className="text-danger">{error.area}</small>}
//               </div>
//               <div className="form-group">
//                 <label>City</label>
//                 <input type="text" name="city" className="form-control" value={booking.prasadam_address.city} onChange={handleAddressChange} />
//                 {error.city && <small className="text-danger">{error.city}</small>}
//               </div>
//               <div className="form-group">
//                 <label>State</label>
//                 <input type="text" name="state" className="form-control" value={booking.prasadam_address.state} onChange={handleAddressChange} />
//                 {error.state && <small className="text-danger">{error.state}</small>}
//               </div>
//               <div className="form-group">
//                 <label>Pincode</label>
//                 <input type="text" name="pincode" className="form-control" value={booking.prasadam_address.pincode} onChange={handleAddressChange} />
//                 {error.pincode && <small className="text-danger">{error.pincode}</small>}
//               </div>
//             </>
//           )}

//           <button type="button" className="btn btn-primary mt-3 w-100" onClick={poojaSelections}>Continue</button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default BookingDialog;

// // Temple.js, TempleDetails.js, OrderDetails.js, TempleSlice.js and TempleList.js will follow next...







import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './BookingDialog.css';
import { useUserAuth } from '../context/UserAuthContext';

const BookingDialog = ({ request, tabNo, close }) => {
  const { profile } = useUserAuth();
  const [booking, setBooking] = useState({
    pooja_name: '',
    booking_date: null,
    name: '',
    mobile_no: profile?.phone || '',
    rashi: '',
    comment: '',
    prasadam: false,
    prasadam_address: {
      street_address_1: '',
      street_address_2: '',
      area: '',
      city: '',
      district: '',
      state: '',
      pincode: ''
    },
    prasad_delivery: false
  });

  const [error, setError] = useState({});

  const validateMobileNumber = (e) => {
    const val = e.target.value;
    if (/^\d{0,10}$/.test(val)) {
      setBooking({ ...booking, mobile_no: val });
    }
  };

  const handleChange = (field, value) => {
    setBooking(prev => ({ ...prev, [field]: value }));
  };

  const handleAddressChange = (field, value) => {
    setBooking(prev => ({
      ...prev,
      prasadam_address: { ...prev.prasadam_address, [field]: value }
    }));
  };

  const poojaSelections = () => {
    console.log('Added to cart:', booking);
  };

  return (
    <dialog id="payment" className="dialtag" open={request}>
      <div className="card shadow mb-4">
        <div className="card-header border-bottom">
          <div className="close-btn" onClick={close}>
            <i className="fas fa-times-circle"></i>
          </div>
          <h5>Booking Details</h5>
        </div>
        <div className="card-body">
          <div className="mb-2">
            <label>Pooja Name <span className="text-red">*</span></label>
            <input type="text" value={booking.pooja_name} disabled className="form-control" placeholder="Pooja Name" />
          </div>
          <div className="mb-2">
            <label>Booking Date <span className="text-red">*</span></label>
            <DatePicker
              selected={booking.booking_date}
              onChange={date => handleChange('booking_date', date)}
              dateFormat="dd/MM/yyyy"
              minDate={new Date()}
              className="form-control"
              placeholderText="Select Booking Date"
              disabled={!request}
            />
          </div>
          <div className="mb-2">
            <label>Devotee Name <span className="text-red">*</span></label>
            <input
              type="text"
              value={booking.name}
              onChange={e => handleChange('name', e.target.value)}
              className="form-control"
              disabled={!request}
            />
          </div>
          <div className="mb-2">
            <label>Devotee Mobile Number <span className="text-red">*</span></label>
            <input
              type="text"
              value={profile?.phone || ''}
              readOnly
              className="form-control"
              disabled
            />
          </div>

          {tabNo === 2 && (
            <>
              <div className="mb-2">
                <label>Rashi, Nakshatra, Gotra</label>
                <textarea
                  value={booking.rashi}
                  onChange={e => handleChange('rashi', e.target.value)}
                  className="form-control"
                  disabled={!request}
                />
              </div>
              <div className="mb-2">
                <label>Sankalpa</label>
                <textarea
                  value={booking.comment}
                  onChange={e => handleChange('comment', e.target.value)}
                  className="form-control"
                  disabled={!request}
                />
              </div>
              <div className="mb-2">
                <label>
                  <input
                    type="checkbox"
                    checked={booking.prasadam}
                    onChange={e => handleChange('prasadam', e.target.checked)}
                    disabled={!request}
                  /> Do you want Prasadam?
                </label>
              </div>
            </>
          )}

          {(booking.prasadam || tabNo === 4) && (
            <>
              {['street_address_1', 'street_address_2', 'area', 'city', 'district', 'state', 'pincode'].map((field, i) => (
                <div className="mb-2" key={i}>
                  <label>{field.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase())}</label>
                  <input
                    type="text"
                    value={booking.prasadam_address[field] || ''}
                    onChange={e => handleAddressChange(field, e.target.value)}
                    className="form-control"
                  />
                </div>
              ))}
            </>
          )}

          <div className="mb-0">
            <button onClick={poojaSelections} className="btn btn-primary w-100">Add to Cart</button>
            <p className="note">Note: Video availability is subject to temple consent</p>
          </div>
        </div>
      </div>
    </dialog>
  );
};

export default BookingDialog;
