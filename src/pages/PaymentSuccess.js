import React, { useState, useEffect, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import api from '../api/api';
import '../styles/PaymentSuccess.css';


const PaymentSuccess = () => {
  const location = useLocation();
  const navigate = useNavigate();


  const [bookingDetails, setBookingDetails] = useState(null);
  const [allBookings, setAllBookings] = useState([]);
  const [templeDetails, setTempleDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  const params = new URLSearchParams(location.search);
  const orderId = params.get('order_id') || (location.state && location.state.orderId);
  const status = params.get('status');
  const error = params.get('error');
  const paymentId = params.get('payment_id') || (location.state && location.state.paymentId);
  const devoteeName = (location.state && location.state.devoteeName) || '';
  const templeName = (location.state && location.state.templeName) || '';
  const templeImg = (location.state && location.state.templeImg) || '';

  const isSuccess = status === 'success' || (!status && !error);

  useEffect(() => {
    if (!orderId && !paymentId) {
      setTimeout(() => navigate('/'), 2000);
    }
  }, [orderId, paymentId, navigate]);

  // ✅ Clear cart on success
  useEffect(() => {
    if (isSuccess && orderId) {
      // Redux
      // dispatch(clearCart());

      // Context API
      // clearCart();

      // LocalStorage
      localStorage.removeItem('cart');
      // Notify other components (like navbar cart count) that cart has changed
      window.dispatchEvent(new Event("cartUpdated"));
    }
  }, [isSuccess, orderId]);

  const fetchBookingDetails = useCallback(async () => {
    setLoading(true);
    try {
      const listResponse = await api.get(`/api/v1/devotee/pooja_request/list/?search=${orderId}`);
      if (listResponse.data.results && listResponse.data.results.length > 0) {
        const allBookingsData = listResponse.data.results;
        setAllBookings(allBookingsData);
        
        const firstBooking = allBookingsData[0];
        const bookingId = firstBooking.id;

        if (!bookingId) {
          setBookingDetails(firstBooking);
          setLoading(false);
          return;
        }

        try {
          const detailResponse = await api.get(`/api/v1/devotee/pooja_request/${bookingId}/`);
          const detailedBooking = detailResponse.data;
          setBookingDetails(detailedBooking);

          if (detailedBooking.temple_id) {
            try {
              const templeResponse = await api.get(`/api/v1/devotee/temple/${detailedBooking.temple_id}`);
              setTempleDetails(templeResponse.data);
            } catch (templeError) {
              console.warn('Failed to fetch temple details:', templeError);
            }
          }
        } catch (detailError) {
          setBookingDetails(firstBooking);
          if (firstBooking.temple_id) {
            try {
              const templeResponse = await api.get(`/api/v1/devotee/temple/${firstBooking.temple_id}`);
              setTempleDetails(templeResponse.data);
            } catch (templeError) {
              console.warn('Failed to fetch temple details:', templeError);
            }
          }
        }
      } else {
        console.warn('No booking found for order ID:', orderId);
      }
    } catch (error) {
      console.error('Failed to fetch booking details:', error);
    } finally {
      setLoading(false);
    }
  }, [orderId]); // setLoading is a stable function from useState, not needed as a dependency

  useEffect(() => {
    if (orderId) {
      fetchBookingDetails();
    } else {
      setLoading(false);
    }
  }, [orderId, fetchBookingDetails]);

  const downloadInvoice = async () => {
    if (bookingDetails?.invoice) {
      try {
        const link = document.createElement('a');
        link.href = bookingDetails.invoice;
        link.download = `Invoice_${orderId}.pdf`;
        link.target = '_blank';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } catch (error) {
        alert('Failed to download invoice');
      }
    }
  };

  if (!orderId && !paymentId) {
    return (
      <div className="payment-success-page">
        <div className="payment-container">
          <div className="no-payment-info">
            <i className="fas fa-exclamation-triangle"></i>
            <h3>No payment information found</h3>
            <p>Redirecting to home page...</p>
          </div>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="payment-success-page">
        <div className="payment-container">
          <div className="loading-spinner">
            <div className="spinner"></div>
            <p>Loading payment details...</p>
          </div>
        </div>
      </div>
    );
  }

  const displayTempleName = templeDetails?.name || templeName || 'Devalaya';
  const displayDevoteeName = bookingDetails?.name || devoteeName || 'Devotee';
  
  // Calculate total cost from all bookings for bulk orders
  const calculateTotalCost = () => {
    if (allBookings.length > 1) {
      // Multiple bookings - sum all costs
      return allBookings.reduce((total, booking) => {
        return total + (parseFloat(booking.total_cost) || 0);
      }, 0);
    } else if (bookingDetails?.total_cost) {
      // Single booking
      return parseFloat(bookingDetails.total_cost);
    }
    return 0;
  };
  
  const totalCost = calculateTotalCost();

  return (
    <div className="payment-success-page">
      <div className="payment-container">
        <div className="payment-card">
          <div className="status-header">
            <div className="status-icon">
              {isSuccess ? (
                <div className="success-icon"><i className="fas fa-check-circle"></i></div>
              ) : (
                <div className="error-icon"><i className="fas fa-times-circle"></i></div>
              )}
            </div>

            <h1 className={`status-title ${isSuccess ? 'success' : 'error'}`}>
              {isSuccess ? '🕉️ Payment Successful!' : '❌ Payment Failed'}
            </h1>

            <p className="status-subtitle">
              {isSuccess
                ? 'Your pooja booking has been confirmed. May your prayers be answered!'
                : 'There was an issue processing your payment. Please try again.'}
            </p>
          </div>

          <div className="three-column-layout">
            <div className="column-ps temple-column">
              <div className="temple-image-container">
                <img
                  src={
                    bookingDetails?.temple?.images?.[0]?.image
                      ? (bookingDetails.temple.images[0].image.startsWith('http')
                          ? bookingDetails.temple.images[0].image
                          : `https://beta.devalayas.com${bookingDetails.temple.images[0].image}`)
                      : (
                          templeImg?.startsWith('http')
                            ? templeImg
                            : `https://beta.devalayas.com${templeImg || ''}`
                        )
                  }
                  alt={displayTempleName}
                  className="temple-image"
                  onError={(e) => {
                    e.target.src = require('../assets/logo.png');
                  }}
                />
              </div>
              <h3 className="temple-namepay">{bookingDetails?.temple?.name || displayTempleName}</h3>
            </div>

            <div className="column-ps details-column">
              <h3 className="column-title">Payment Details</h3>
              <div className="details-list">
                <div className="detail-item">
                  <span className="detail-label">Devotee Name</span>
                  <span className="detail-value">{displayDevoteeName}</span>
                </div>
                {paymentId && (
                  <div className="detail-item">
                    <span className="detail-label">Payment ID</span>
                    <span className="detail-value">{paymentId}</span>
                  </div>
                )}
                {orderId && (
                  <div className="detail-item">
                    <span className="detail-label">Order ID</span>
                    <span className="detail-value">{orderId}</span>
                  </div>
                )}
                {bookingDetails?.pooja_date && (
                  <div className="detail-item">
                    <span className="detail-label">Pooja Date</span>
                    <span className="detail-value">{new Date(bookingDetails.pooja_date).toLocaleDateString()}</span>
                  </div>
                )}
                {totalCost > 0 && (
                  <div className="detail-item">
                    <span className="detail-label">Amount Paid</span>
                    <span className="detail-value amount">₹{totalCost.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                  </div>
                )}
                {allBookings.length > 1 && (
                  <div className="detail-item">
                    <span className="detail-label">Total Bookings</span>
                    <span className="detail-value">{allBookings.length} Pooja(s)</span>
                  </div>
                )}
              </div>
            </div>

            <div className="column-ps actions-column">
              <h3 className="column-title">Actions</h3>
              <div className="action-buttons-vertical">
                {isSuccess && bookingDetails?.invoice && (
                  <>
                    <button className="btn-action-pays btn-download-pays" onClick={downloadInvoice}>
                      <i className="fas fa-download"></i> Download Invoice
                    </button>
                    <a
                      href={bookingDetails.invoice}
                      target="_blank"
                      rel="noreferrer"
                      className="btn-action-pays btn-view"
                    >
                      <i className="fas fa-eye"></i> View Invoice
                    </a>
                  </>
                )}
                <button className="btn-action-pays btn-bookings" onClick={() => navigate('/bookings')}>
                  <i className="fas fa-list"></i> View My Bookings
                </button>
                <button className="btn-action-pays btn-home" onClick={() => navigate('/')}>
                  <i className="fas fa-home"></i> Go to Home
                </button>
              </div>
            </div>
          </div>

          {error && (
            <div className="error-details">
              <h4>Error Details:</h4>
              <p>{decodeURIComponent(error)}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;
