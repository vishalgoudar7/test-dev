import React, { useState, useEffect } from 'react';
import '../styles/CheckoutModal.css';

const CheckoutModal = ({ open, onClose }) => {
  const [showConfirm, setShowConfirm] = useState(false);
  const [cart, setCart] = useState([]);
  const [address, setAddress] = useState({
    bookingDate: '',
    devoteeName: '',
    devoteeMobile: '',
    sankalpa: '',
    street1: '',
    street2: '',
    area: '',
    city: '',
    state: '',
    pincode: '',
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (open) {
      try {
        const stored = JSON.parse(localStorage.getItem('cart')) || [];
        setCart(stored.map(item => ({ ...item, quantity: item.quantity || 1 })));
      } catch {
        setCart([]);
      }
    }
  }, [open]);

  // Charges (dynamic)
  const prasadCost = cart.reduce((sum, item) => sum + (Number(item.prasad_cost) || 0) * (item.quantity || 1), 0);
  const convinceCharge = cart.reduce((sum, item) => sum + (Number(item.convince_charge) || 0) * (item.quantity || 1), 0);
  const shippingCharge = cart.reduce((sum, item) => sum + (Number(item.shipping_charge) || 0) * (item.quantity || 1), 0);
  const subtotal = cart.reduce((sum, item) => sum + (Number(item.final_total) || Number(item.cost) || 0) * (item.quantity || 1), 0);
  const gst = cart.reduce((sum, item) => sum + (Number(item.gst) || 0) * (item.quantity || 1), 0) || Math.round(subtotal * 0.05);
  const total = subtotal + prasadCost + convinceCharge + shippingCharge + gst;


  if (!open) return null;

  return (
    <div className="checkout-modal-overlay" onClick={() => setShowConfirm(true)}>
      <div className="checkout-modal" onClick={e => e.stopPropagation()}>
        {/* Modal Top Header with Logo, Title, Close Button */}
        <div className="checkout-modal-header-bar">
          <img src={require('../assets/logo.png')} alt="Logo" className="checkout-modal-logo" />
          <h4 className="checkout-modal-title">Checkout Details</h4>
          <button className="checkout-modal-top-close-btn" onClick={() => setShowConfirm(true)} aria-label="Close">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          </button>
        </div>
        <div className="checkout-modal-content">
          {/* Left: Address Form */}
          <div className="checkout-modal-left">
      {showConfirm && (
        <div className="checkout-confirm-overlay" onClick={e => e.stopPropagation()}>
          <div className="checkout-confirm-dialog">
            <div className="checkout-confirm-title">Are you sure?</div>
            <div className="checkout-confirm-message">Do you want to close the payment.</div>
            <div className="checkout-confirm-actions">
              <button className="btn btn-danger me-2" onClick={() => { setShowConfirm(false); onClose(); }}>Confirm</button>
              <button className="btn btn-secondary" onClick={() => setShowConfirm(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
            <div className="checkout-modal-left-header" />
            <div className="checkout-modal-address-label">
              <span>Address</span>
            </div>
            <div className="checkout-modal-left-scroll">
              <form className="checkout-address-form" onSubmit={e => {
                e.preventDefault();
                // Basic validation
                const newErrors = {};
                if (!address.bookingDate) newErrors.bookingDate = 'Required';
                if (!address.devoteeName) newErrors.devoteeName = 'Required';
                if (!address.devoteeMobile || !/^\d{10}$/.test(address.devoteeMobile)) newErrors.devoteeMobile = 'Valid 10-digit mobile required';
                if (!address.street1) newErrors.street1 = 'Required';
                if (!address.area) newErrors.area = 'Required';
                if (!address.city) newErrors.city = 'Required';
                if (!address.state) newErrors.state = 'Required';
                if (!address.pincode || !/^\d{6}$/.test(address.pincode)) newErrors.pincode = 'Valid 6-digit pincode required';
                setErrors(newErrors);
                if (Object.keys(newErrors).length === 0) {
                  // Proceed to payment logic here
                  alert('Proceeding to payment...');
                }
              }}>
                <div className="checkout-form-row">
                  <label>
                    Booking Date *
                    <input type="date" value={address.bookingDate} onChange={e => setAddress({ ...address, bookingDate: e.target.value })} />
                    {errors.bookingDate && <span className="checkout-error">{errors.bookingDate}</span>}
                  </label>
                </div>
                <div className="checkout-form-row">
                  <label>
                    Devotee Name *
                    <input type="text" placeholder="Full Name" value={address.devoteeName} onChange={e => setAddress({ ...address, devoteeName: e.target.value })} />
                    {errors.devoteeName && <span className="checkout-error">{errors.devoteeName}</span>}
                  </label>
                </div>
                <div className="checkout-form-row">
                  <label>
                    Devotee Mobile Number *
                    <input type="tel" placeholder="10-digit Mobile" value={address.devoteeMobile} maxLength={10} onChange={e => setAddress({ ...address, devoteeMobile: e.target.value.replace(/[^0-9]/g, '') })} />
                    {errors.devoteeMobile && <span className="checkout-error">{errors.devoteeMobile}</span>}
                  </label>
                </div>
                <div className="checkout-form-row">
                  <label>
                    Sankalpa
                    <input type="text" placeholder="Sankalpa (optional)" value={address.sankalpa} onChange={e => setAddress({ ...address, sankalpa: e.target.value })} />
                  </label>
                </div>
                <div className="checkout-form-row">
                  <label>
                    Street Address 1 *
                    <input type="text" placeholder="Street Address 1" value={address.street1} onChange={e => setAddress({ ...address, street1: e.target.value })} />
                    {errors.street1 && <span className="checkout-error">{errors.street1}</span>}
                  </label>
                </div>
                <div className="checkout-form-row">
                  <label>
                    Street Address 2
                    <input type="text" placeholder="Street Address 2 (optional)" value={address.street2} onChange={e => setAddress({ ...address, street2: e.target.value })} />
                  </label>
                </div>
                <div className="checkout-form-row">
                  <label>
                    Area *
                    <input type="text" placeholder="Area" value={address.area} onChange={e => setAddress({ ...address, area: e.target.value })} />
                    {errors.area && <span className="checkout-error">{errors.area}</span>}
                  </label>
                </div>
                <div className="checkout-form-row">
                  <label>
                    City *
                    <input type="text" placeholder="City" value={address.city} onChange={e => setAddress({ ...address, city: e.target.value })} />
                    {errors.city && <span className="checkout-error">{errors.city}</span>}
                  </label>
                </div>
                <div className="checkout-form-row">
                  <label>
                    State *
                    <input type="text" placeholder="State" value={address.state} onChange={e => setAddress({ ...address, state: e.target.value })} />
                    {errors.state && <span className="checkout-error">{errors.state}</span>}
                  </label>
                </div>
                <div className="checkout-form-row">
                  <label>
                    Pincode *
                    <input type="text" placeholder="6-digit Pincode" value={address.pincode} maxLength={6} onChange={e => setAddress({ ...address, pincode: e.target.value.replace(/[^0-9]/g, '') })} />
                    {errors.pincode && <span className="checkout-error">{errors.pincode}</span>}
                  </label>
                </div>
                <button className="checkout-proceed-btn" type="submit">Proceed to Payment</button>
              </form>
            </div>
          </div>

          {/* Right: Cart/Price Details */}
          <div className="checkout-modal-right">
            <h5>Cart</h5>
            <div className="checkout-cart-list">
              {cart.map(item => (
                <div className="checkout-cart-item" key={item.id}>
                  {item.image && <img src={item.image} alt={item.name} className="checkout-cart-img" />}
            <div className="checkout-cart-info d-flex align-items-center gap-2 mb-1">
              {item.image && (
                <img src={item.image} alt={item.name} style={{ width: 48, height: 48, objectFit: 'cover', borderRadius: 8, border: '1.5px solid #ffa500', background: '#fffbe6', marginRight: 8 }} />
              )}
              <div>
                <div className="checkout-cart-title">{item.name}</div>
                <div className="checkout-cart-qty">{item.quantity} x ₹{item.final_total || item.cost}</div>
              </div>
            </div>
                  <div className="checkout-cart-price">₹{(item.final_total || item.cost) * item.quantity}</div>
                </div>
              ))}
            </div>
            <div className="checkout-cart-summary">
              <div className="checkout-summary-row"><span>Subtotal</span><span>₹{subtotal}</span></div>
              <div className="checkout-summary-row"><span>Prasad Cost</span><span>₹{prasadCost}</span></div>
              <div className="checkout-summary-row"><span>Convince Charge</span><span>₹{convinceCharge}</span></div>
              <div className="checkout-summary-row"><span>Shipping Charge</span><span>₹{shippingCharge}</span></div>
              <div className="checkout-summary-row"><span>GST</span><span>₹{gst}</span></div>
              <div className="checkout-summary-row checkout-summary-total"><span>Total (inc. all taxes)</span><span>₹{total}</span></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutModal;
