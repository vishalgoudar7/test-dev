import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../api/api';
import '../styles/EventDetails.css';
import moment from 'moment';

const EventDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const BASE_URL = process.env.REACT_APP_API_BASE_URL || 'https://beta.devalayas.com';

  useEffect(() => {
    const fetchEventDetails = async () => {
      try {
        // Fetch specific event details using the search API
        const response = await api.get(`/api/v1/devotee/event/?search=${id}`);
        const eventData = response.data?.results?.[0];
        
        if (eventData) {
          setEvent(eventData);
        } else {
          setError('Event not found');
        }
      } catch (err) {
        console.error('API Error:', err);
        setError('Failed to load event details');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchEventDetails();
    }
  }, [id]);

  const getImageUrl = (event) => {
    if (event.temple?.images && event.temple.images.length > 0) {
      const imagePath = event.temple.images[0].image;
      return imagePath.startsWith('http') ? imagePath : `${BASE_URL}${imagePath}`;
    }
    return 'https://via.placeholder.com/600x400?text=Event+Image';
  };

  const formatDateRange = (startDate, endDate) => {
    const start = moment(startDate);
    const end = moment(endDate);
    
    if (start.isSame(end, 'day')) {
      return start.format('MMMM Do, YYYY [at] h:mm A');
    } else {
      return `${start.format('MMM Do, YYYY [at] h:mm A')} - ${end.format('MMM Do, YYYY [at] h:mm A')}`;
    }
  };

  const handleParticipate = () => {
    // Handle participation logic here
    alert('Participation functionality will be implemented here!');
    console.log('Participate in event:', event);
  };

  const handleGoBack = () => {
    navigate('/events');
  };

  if (loading) {
    return (
      <div className="event-details-container">
        <div className="loading-skeleton">
          <div className="skeleton-image"></div>
          <div className="skeleton-content">
            <div className="skeleton-title"></div>
            <div className="skeleton-text"></div>
            <div className="skeleton-text"></div>
            <div className="skeleton-button"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !event) {
    return (
      <div className="event-details-container">
        <div className="error-message">
          <h2>Event Not Found</h2>
          <p>{error || 'The requested event could not be found.'}</p>
          <button onClick={handleGoBack} className="back-button">
            Back to Events
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="event-details-container">
      <button onClick={handleGoBack} className="back-button">
        ← Back to Events
      </button>
      
      <div className="event-details-card">
        <div className="event-image-section">
          <img
            src={getImageUrl(event)}
            alt={event.name}
            className="event-detail-image"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = 'https://via.placeholder.com/600x400?text=Event+Image';
            }}
          />
        </div>
        
        <div className="event-content-section">
          <div className="event-header">
            <h1 className="event-title">{event.name}</h1>
            <div className="event-status">
              {event.is_expired ? (
                <span className="status-expired">Expired</span>
              ) : (
                <span className="status-active">Active</span>
              )}
            </div>
          </div>
          
          <div className="event-details-info">
            <div className="info-section">
              <h3>Event Details</h3>
              <p className="event-description">{event.details}</p>
            </div>
            
            <div className="info-section">
              <h3>Schedule</h3>
              <p className="event-schedule">
                <strong>Duration:</strong> {formatDateRange(event.start, event.end)}
              </p>
            </div>
            
            <div className="info-section">
              <h3>Temple Information</h3>
              <div className="temple-info">
                <p><strong>Name:</strong> {event.temple.name}</p>
                <p><strong>Location:</strong> {event.temple.address}, {event.temple.city}, {event.temple.state}</p>
                <p><strong>District:</strong> {event.temple.district}</p>
                <p><strong>Pincode:</strong> {event.temple.pincode}</p>
              </div>
            </div>
            
            {event.pooja && (
              <div className="info-section">
                <h3>Pooja Details</h3>
                <div className="pooja-info">
                  <p><strong>Pooja Name:</strong> {event.pooja.name}</p>
                  <p><strong>Description:</strong> {event.pooja.details}</p>
                  <p><strong>Included:</strong> {event.pooja.included}</p>
                  <div className="cost-breakdown">
                    <p><strong>Original Cost:</strong> ₹{event.pooja.original_cost}</p>
                    <p><strong>Convenience Fee:</strong> ₹{event.pooja.convenience_fee}</p>
                    <p><strong>Tax Amount:</strong> ₹{event.pooja.tax_amount}</p>
                    <p className="final-total"><strong>Total Cost:</strong> ₹{event.pooja.final_total}</p>
                  </div>
                  {event.pooja.prasad_delivery && (
                    <p className="prasad-delivery">✓ Prasad delivery available</p>
                  )}
                </div>
              </div>
            )}
            
            {event.pujari && (
              <div className="info-section">
                <h3>Pujari Information</h3>
                <div className="pujari-info">
                  <p><strong>Name:</strong> {event.pujari.name}</p>
                  <p><strong>Location:</strong> {event.pujari.city}, {event.pujari.district}</p>
                  <p><strong>Status:</strong> {event.pujari.is_active ? 'Active' : 'Inactive'}</p>
                </div>
              </div>
            )}
          </div>
          
          <div className="event-actions">
            {!event.is_expired && (
              <button 
                onClick={handleParticipate} 
                className="participate-button"
                disabled={event.is_expired}
              >
                PARTICIPATE IN EVENT
              </button>
            )}
            {event.is_expired && (
              <p className="expired-message">This event has expired and is no longer available for participation.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetails;
