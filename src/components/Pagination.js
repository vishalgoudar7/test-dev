// import React from "react";
// import "../styles/Pagination.css";

// const Pagination = ({ currentPage, totalPages, onPageChange }) => {
//   return (
//     <div className="custom-pagination">
//       <button
//         className="page-btn"
//         onClick={() => onPageChange(currentPage - 1)}
//         disabled={currentPage === 1}
//       >
//         ←
//       </button>
//       <span className="page-number">
//         {currentPage} / {totalPages}
//       </span>
//       <button
//         className="page-btn"
//         onClick={() => onPageChange(currentPage + 1)}
//         disabled={currentPage === totalPages}
//       >
//         →
//       </button>
//     </div>
//   );
// };

// export default Pagination;





// src/components/OrderDetails.js
import React from 'react';
import '../styles/OrderDetails.css';

const OrderDetails = ({ payment, booking, razorpayPayment, closeDialog }) => {
  const safePaymentData = payment?.payment_data || {};
  const safeBooking = booking || {};

  const orderItems = [
    { label: "Pooja Cost", key: "original_cost" },
    { label: "Prasadam Delivery", key: "delivery_charge", condition: safeBooking.prasadam },
    { label: "Convenience Fee", key: "convenience_fee" },
    { label: "Tax", key: "total_tax" },
  ];

  return (
    <div className="card shadow">
      <div className="card-header border-bottom d-flex justify-content-between align-items-center">
        <h5 className="mb-0">Order Details</h5>
        <div className="close-btn" style={{ cursor: 'pointer' }}>
          <i className="fas fa-times-circle" onClick={closeDialog}></i>
        </div>
      </div>
      <div className="card-body">
        <ul className="list-group list-group-borderless mb-3">
          {orderItems.map((item, index) => (
            (item.condition === undefined || item.condition) && (
              <li key={index} className="list-group-item py-2 d-flex justify-content-between align-items-center">
                <span className="h6 fw-light mb-0">{item.label}</span>
                <span className="h6 fw-light mb-0">
                  ₹{safePaymentData[item.key] !== undefined ? safePaymentData[item.key] : '0.00'}
                </span>
              </li>
            )
          ))}
          <li className="list-group-item py-2">
            <hr className="my-0" />
          </li>
          <li className="list-group-item d-flex justify-content-between pb-0">
            <div>
              <h5 className="fw-normal mb-0">Total</h5>
              <small>Inc. of all taxes</small>
            </div>
            <span className="h5 fw-normal mb-0">
              ₹{safePaymentData.final_total !== undefined ? safePaymentData.final_total : '0.00'}
            </span>
          </li>
        </ul>
        <button
          onClick={razorpayPayment}
          className="btn btn-primary w-100 mb-0"
        >
          Place Order
        </button>
      </div>
    </div>
  );
};

export default OrderDetails;
