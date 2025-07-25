import React, { useEffect, useState } from "react";
import api from "../api/api";
import "../styles/MyBookings.css";
import Pagination from "../components/Pagination";

const MyBookings = () => {
  const [meta, setMeta] = useState({
    page: 1,
    size: 10,
    count: 0,
    maxPage: 1,
    lastPage: 1,
    search: "",
  });

  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    getBookings();
  }, [meta.page]);

  const getBookings = async () => {
    try {
      const response = await api.get(
        `/api/v1/devotee/pooja_request/list/?page=${meta.page}&size=${meta.size}&search=${meta.search}`
      );
      const count = response.data.count;
      const bookingsData = response.data.results;
      setBookings(bookingsData);
      
      setMeta((prev) => ({
        ...prev,
        count: count,
        lastPage: Math.ceil(count / meta.size),
        maxPage: Math.ceil(count / meta.size) >= 3 ? 3 : Math.ceil(count / meta.size),
      }));
    } catch (error) {
      console.warn("Failed to load bookings", error);
    }
  };



  const handleSearch = (e) => {
    if (e.key === "Enter") {
      setMeta((prev) => ({ ...prev, page: 1 }));
      getBookings();
    }
  };

  const videoPlay = async (id) => {
    try {
      const response = await api.get(`/api/v1/devotee/pooja_request/${id}`);
      const videoUrl = response.data.videos[0].video;
      const newTab = window.open(videoUrl, "_blank");
      if (!newTab) alert("Please allow popups.");
    } catch (error) {
      console.warn("Video not available", error);
    }
  };

  const downloadInvoice = async (invoiceUrl, orderId) => {
    try {
      if (invoiceUrl) {
        const link = document.createElement('a');
        link.href = invoiceUrl;
        link.download = `Invoice_${orderId}.pdf`;
        link.target = '_blank';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } else {
        alert('Invoice not available for download');
      }
    } catch (error) {
      console.warn("Failed to download invoice", error);
      alert('Failed to download invoice');
    }
  };

  return (
    <div className="my-bookings-page">
      <div className="bookings-container">
        <div className="bookings-header">
          <h2 className="bookings-title">🕉️ MY BOOKINGS</h2>
          <p className="bookings-subtitle">Track your spiritual journey and pooja bookings</p>
        </div>

        <div className="search-container-my-bookings">
          <div className="search-wrapper-my-bookings">
            <i className="fas fa-search search-icon-my-bookings"></i>
            <input
              type="text"
              className="search-input-my-bookings"
              placeholder="Search by order ID, devotee name, or temple..."
              value={meta.search}
              onChange={(e) => setMeta({ ...meta, search: e.target.value })}
              onKeyDown={handleSearch}
            />
          </div>
        </div>

        {/* Desktop Table View */}
        <div className="table-responsive desktop-view">
          <table className="bookings-table">
            <thead>
              <tr>
                <th>Temple & Pooja</th>
                <th>Order Details</th>
                <th>Devotee Info</th>
                <th>Date & Status</th>
                <th>Amount</th>
                <th>Actions / Invoice</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((b, index) => {
                const templeImage = b.temple?.images?.[0]?.image || require('../assets/Default.png');
                
                return (
                  <tr key={index} className="booking-row">
                    <td className="temple-cell">
                      <div className="temple-info">
                        <img 
                          src={templeImage}
                          alt={b.temple?.name || 'Temple'}
                          className="temple-image-small"
                          onError={(e) => {
                            e.target.src = require('../assets/Default.png');
                          }}
                        />
                        <div className="temple-details">
                          <div className="temple-name-mybookings">{b.temple?.name || 'Temple'}</div>
                          <div className="pooja-name">{b.pooja?.name || 'Pooja'}</div>
                        </div>
                      </div>
                    </td>
                    <td className="order-details">
                      <div className="order-id">{b.order_id}</div>
                      <div className="booking-date">Booked: {new Date(b.created_at || b.pooja_date).toLocaleDateString()}</div>
                    </td>
                    <td className="devotee-info">
                      <div className="devotee-name">{b.name}</div>
                      <div className="devotee-mobile">{b.devotee_number}</div>
                    </td>
                    <td className="date-status">
                      <div className="pooja-date">📅 {new Date(b.pooja_date).toLocaleDateString()}</div>
                      <span
                        className={`status-badge ${
                          b.status === "Pending"
                            ? "status-pending"
                            : b.status === "Completed"
                            ? "status-completed"
                            : b.status === "Expired"
                            ? "status-expired"
                            : "status-default"
                        }`}
                      >
                        {b.status}
                      </span>
                    </td>
                    <td className="amount">₹{parseFloat(b.total_cost).toLocaleString('en-IN')}</td>
                    <td className="actions-cell">
                      <div className="action-buttons">
                        <button
                          className="btn-action btn-download"
                          onClick={() => downloadInvoice(b.invoice, b.order_id)}
                          title="Download Invoice"
                        >
                          <i className="fas fa-download"></i>
                        </button>
                        
                        {b.invoice && (
                          <a
                            href={b.invoice}
                            target="_blank"
                            rel="noreferrer"
                            className="btn-action btn-view"
                            title="View Invoice"
                          >
                            <i className="fas fa-eye"></i>
                          </a>
                        )}
                        
                        {b.status === "Completed" && (
                          <button 
                            className="btn-action btn-video" 
                            onClick={() => videoPlay(b.id)}
                            title="Play Pooja Video"
                          >
                            <i className="fas fa-play"></i>
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Mobile Card View */}
        <div className="mobile-view">
          {bookings.map((b, index) => {
            const templeImage = b.temple?.images?.[0]?.image || require('../assets/Default.png');
            
            return (
              <div key={index} className="booking-card">
                <div className="card-header">
                  <div className="temple-info-mobile">
                    <img 
                      src={templeImage}
                      alt={b.temple?.name || 'Temple'}
                      className="temple-image-mobile"
                      onError={(e) => {
                        e.target.src = require('../assets/Default.png');
                      }}
                    />
                    <div className="temple-details-mobile">
                      <div className="temple-name-mobile">{b.temple?.name || 'Temple'}</div>
                      <div className="pooja-name-mobile">{b.pooja?.name || 'Pooja'}</div>
                    </div>
                  </div>
                  <span
                    className={`status-badge-mobile ${
                      b.status === "Pending"
                        ? "status-pending"
                        : b.status === "Completed"
                        ? "status-completed"
                        : b.status === "Expired"
                        ? "status-expired"
                        : "status-default"
                    }`}
                  >
                    {b.status}
                  </span>
                </div>
                
                <div className="card-body">
                  <div className="booking-info-row">
                    <div className="info-item">
                      <span className="info-label">Order ID:</span>
                      <span className="info-value order-id-mobile">{b.order_id}</span>
                    </div>
                    <div className="info-item">
                      <span className="info-label">Amount:</span>
                      <span className="info-value amount-mobile">₹{parseFloat(b.total_cost).toLocaleString('en-IN')}</span>
                    </div>
                  </div>
                  
                  <div className="booking-info-row">
                    <div className="info-item">
                      <span className="info-label">Devotee:</span>
                      <span className="info-value">{b.name}</span>
                    </div>
                    <div className="info-item">
                      <span className="info-label">Mobile:</span>
                      <span className="info-value">{b.devotee_number}</span>
                    </div>
                  </div>
                  
                  <div className="booking-info-row">
                    <div className="info-item">
                      <span className="info-label">Pooja Date:</span>
                      <span className="info-value">📅 {new Date(b.pooja_date).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
                
                <div className="card-footer">
                  <div className="action-buttons-mobile">
                    <button
                      className="btn-action-mobile btn-download"
                      onClick={() => downloadInvoice(b.invoice, b.order_id)}
                    >
                      <i className="fas fa-download"></i>
                      <span>Invoice</span>
                    </button>
                    
                    {b.invoice && (
                      <a
                        href={b.invoice}
                        target="_blank"
                        rel="noreferrer"
                        className="btn-action-mobile btn-view"
                      >
                        <i className="fas fa-eye"></i>
                        
                        <span>View</span>
                      </a>
                    )}
                    
                    {b.status === "Completed" && (
                      <button 
                        className="btn-action-mobile btn-video" 
                        onClick={() => videoPlay(b.id)}
                      >
                        <i className="fas fa-play"></i>
                        <span>Video</span>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {bookings.length === 0 && (
          <div className="no-bookings">
            <div className="no-bookings-icon">🕉️</div>
            <h3>No Bookings Found</h3>
            <p>You haven't made any pooja bookings yet. Start your spiritual journey today!</p>
          </div>
        )}

        {bookings.length > 0 && meta.lastPage > 1 && (
          <div className="pagination-wrapper">
            <Pagination
              currentPage={meta.page}
              totalPages={meta.lastPage}
              onPageChange={(page) => {
                if (page >= 1 && page <= meta.lastPage) {
                  setMeta((prev) => ({ ...prev, page }));
                }
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default MyBookings;
