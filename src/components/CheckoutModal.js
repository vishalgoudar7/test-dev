import React, { useState, useEffect } from 'react';
import { useUserAuth } from '../context/UserAuthContext';
import '../styles/CheckoutModal.css';

const CheckoutModal = ({ open, onClose }) => {
  const { profile } = useUserAuth();
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
  const [savedAddresses, setSavedAddresses] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('savedAddresses')) || [];
    } catch {
      return [];
    }
  });
  const [showAddressForm, setShowAddressForm] = useState(true);
  // Prefill devoteeName and devoteeMobile from profile if available
  useEffect(() => {
    if (profile) {
      setAddress(prev => ({
        ...prev,
        devoteeName: profile.firstName && profile.lastName ? `${profile.firstName} ${profile.lastName}` : (profile.firstName || prev.devoteeName),
        devoteeMobile: profile.phone || prev.devoteeMobile,
      }));
    }
  }, [profile, open]);
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

  // Charges (dynamic, recalculate on pincode change)
  const [charges, setCharges] = useState({
    prasadCost: 0,
    convinceCharge: 0,
    shippingCharge: 0,
    subtotal: 0,
    gst: 0,
    total: 0,
  });

  useEffect(() => {
    // If cart has payment_data from API, use those values for charges
    if (cart.length > 0 && cart.every(item => item.payment_data && item.payment_data.final_total)) {
      let subtotal = cart.reduce((sum, item) => sum + (Number(item.payment_data.original_cost) || 0) * (item.quantity || 1), 0);
      let convinceCharge = cart.reduce((sum, item) => sum + (Number(item.payment_data.convenience_fee) || 0) * (item.quantity || 1), 0);
      let shippingCharge = cart.reduce((sum, item) => sum + (Number(item.payment_data.delivery_charge) || 0) * (item.quantity || 1), 0);
      let gst = cart.reduce((sum, item) => sum + (Number(item.payment_data.total_tax) || 0) * (item.quantity || 1), 0);
      let total = cart.reduce((sum, item) => sum + (Number(item.payment_data.final_total) || 0) * (item.quantity || 1), 0);
      setCharges({ prasadCost: 0, convinceCharge, shippingCharge, subtotal, gst, total });
    } else {
      // Fallback to local calculation if API data not present
      let prasadCost = cart.reduce((sum, item) => sum + (Number(item.prasad_cost) || 0) * (item.quantity || 1), 0);
      let convinceCharge = cart.reduce((sum, item) => sum + (Number(item.convince_charge) || 0) * (item.quantity || 1), 0);
      let subtotal = cart.reduce((sum, item) => sum + (Number(item.final_total) || Number(item.cost) || 0) * (item.quantity || 1), 0);
      let shippingCharge = 0;
      if (address.pincode && /^\d{6}$/.test(address.pincode)) {
        if (address.pincode.startsWith('56')) {
          shippingCharge = 0;
        } else {
          shippingCharge = 50;
        }
      }
      let gst = Math.round(subtotal * 0.05);
      let total = subtotal + prasadCost + convinceCharge + shippingCharge + gst;
      setCharges({ prasadCost, convinceCharge, shippingCharge, subtotal, gst, total });
    }
  }, [cart, address.pincode]);


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
            <div style={{marginBottom: 12}}>
              <label style={{ fontWeight: 600, fontSize: '1.08rem', display: 'block', marginBottom: 4 }}>Select Your Puja Date</label>
              <input
                type="date"
                required
                placeholder="Booking Date *"
                value={address.bookingDate}
                onChange={e => setAddress({ ...address, bookingDate: e.target.value })}
                style={{ width: '100%', padding: 8, borderRadius: 6, marginBottom: 8 }}
              />
              {errors && errors.bookingDate && <span className="checkout-error">{errors.bookingDate}</span>}
            </div>
            <div className="checkout-modal-address-label">
              <span>Address</span>
            </div>
            <div className="checkout-modal-left-scroll">
              {/* Address selection and add new address button */}
              {savedAddresses.length > 0 && (
                <div style={{ marginBottom: 16 }}>
                  <label style={{ fontWeight: 500, marginBottom: 4, display: 'block' }}>Select Address</label>
                  <select
                    value={JSON.stringify(address)}
                    onChange={e => {
                      const selected = JSON.parse(e.target.value);
                      setAddress(selected);
                      setShowAddressForm(false);
                      // Trigger charges recalculation by updating address state
                      setTimeout(() => setAddress(a => ({ ...a })), 0);
                    }}
                    style={{ width: '100%', padding: 8, borderRadius: 6, marginBottom: 8 }}
                  >
                    {savedAddresses.map((addr, idx) => (
                      <option key={idx} value={JSON.stringify(addr)}>
                        {addr.street1}, {addr.city}, {addr.state} - {addr.pincode}
                      </option>
                    ))}
                  </select>
                  <div style={{ display: 'flex', gap: 8, marginBottom: 8 }}>
                    <button type="button" onClick={() => { setShowAddressForm(true); setAddress({ bookingDate: '', devoteeName: address.devoteeName, devoteeMobile: address.devoteeMobile, sankalpa: '', street1: '', street2: '', area: '', city: '', state: '', pincode: '' }); }}>Add New Address</button>
                    <button
                      type="button"
                      onClick={() => {
                        // Edit selected address
                        setShowAddressForm(true);
                        setAddress(JSON.parse(JSON.stringify(address)));
                        // Remove the address being edited from savedAddresses temporarily
                        setSavedAddresses(savedAddresses.filter(a => JSON.stringify(a) !== JSON.stringify(address)));
                      }}
                    >Edit</button>
                    <button
                      type="button"
                      style={{ color: 'white', background: 'red', border: 'none', borderRadius: 4, padding: '0 12px' }}
                      onClick={() => {
                        const filtered = savedAddresses.filter(a => JSON.stringify(a) !== JSON.stringify(address));
                        setSavedAddresses(filtered);
                        localStorage.setItem('savedAddresses', JSON.stringify(filtered));
                        // Reset to add new address mode if no addresses left
                        if (filtered.length === 0) {
                          setShowAddressForm(true);
                          setAddress({ bookingDate: '', devoteeName: address.devoteeName, devoteeMobile: address.devoteeMobile, sankalpa: '', street1: '', street2: '', area: '', city: '', state: '', pincode: '' });
                        } else {
                          setAddress(filtered[0]);
                        }
                      }}
                    >Delete</button>
                  </div>
                  <button
                    className="checkout-proceed-btn"
                    style={{ marginTop: 8, width: '100%' }}
                    onClick={async () => {
                      // Prepare payload for API
                      const payload = cart.map(item => ({
                        pooja: item.id,
                        pooja_date: address.bookingDate,
                        name: address.devoteeName,
                        devotee_number: address.devoteeMobile,
                        is_prasadam_delivery: true,
                        prasadam_delivery_address: `${address.street1}, ${address.area}, ${address.city}, ${address.state} - ${address.pincode}`,
                        quantity: item.quantity,
                        // Add more fields as needed
                      }));
                      try {
                        // Get token from localStorage
                        const token = localStorage.getItem('token');
                        const response = await fetch('https://beta.devalayas.com/api/v1/devotee/bulk_pooja_request/', {
                          method: 'POST',
                          headers: {
                            'Content-Type': 'application/json',
                            ...(token ? { 'Authorization': `Token ${token}` } : {})
                          },
                          body: JSON.stringify(payload),
                        });
                        if (!response.ok) throw new Error('Failed to fetch cost from server');
                        const data = await response.json();
                        // Update cart with payment_data from API
                        if (Array.isArray(data)) {
                          const updatedCart = cart.map(item => {
                            const found = data.find(d => d.pooja === item.id);
                            return found && found.payment_data ? { ...item, payment_data: found.payment_data, final_total: found.payment_data.final_total } : item;
                          });
                          setCart(updatedCart);
                          localStorage.setItem('cart', JSON.stringify(updatedCart));
                          window.dispatchEvent(new Event('storage'));
                          alert('Cost updated from server. Please review and proceed to payment.');
                        } else {
                          alert('Unexpected response from server.');
                        }
                      } catch (err) {
                        alert('Error fetching cost: ' + err.message);
                      }
                    }}
                  >
                    Proceed to Payment
                  </button>
                </div>
              )}
              {showAddressForm && (
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
                    // Save address to localStorage
                    const updatedAddresses = [...savedAddresses, address];
                    setSavedAddresses(updatedAddresses);
                    localStorage.setItem('savedAddresses', JSON.stringify(updatedAddresses));
                    setShowAddressForm(false);
                    alert('Address saved! Proceeding to payment...');
                  }
                }}>
                  {/* Booking date is now above address section */}
                  <div className="checkout-form-row">
                    <div>
                      <input type="text" required placeholder="Devotee Name *" value={address.devoteeName} onChange={e => setAddress({ ...address, devoteeName: e.target.value })} />
                      {errors.devoteeName && <span className="checkout-error">{errors.devoteeName}</span>}
                    </div>
                  </div>
                  <div className="checkout-form-row">
                    <div>
                      <input type="tel" required placeholder="Devotee Mobile Number * (10-digit Mobile)" value={address.devoteeMobile} maxLength={10} onChange={e => setAddress({ ...address, devoteeMobile: e.target.value.replace(/[^0-9]/g, '') })} />
                      {errors.devoteeMobile && <span className="checkout-error">{errors.devoteeMobile}</span>}
                    </div>
                  </div>
                  <div className="checkout-form-row">
                    <div>
                      <input type="text" placeholder="Sankalpa (optional)" value={address.sankalpa} onChange={e => setAddress({ ...address, sankalpa: e.target.value })} />
                    </div>
                  </div>
                  <div className="checkout-form-row">
                    <div>
                      <input type="text" required placeholder="Street Address 1 *" value={address.street1} onChange={e => setAddress({ ...address, street1: e.target.value })} />
                      {errors.street1 && <span className="checkout-error">{errors.street1}</span>}
                    </div>
                  </div>
                  <div className="checkout-form-row">
                    <div>
                      <input type="text" placeholder="Street Address 2 (optional)" value={address.street2} onChange={e => setAddress({ ...address, street2: e.target.value })} />
                    </div>
                  </div>
                  <div className="checkout-form-row">
                    <div>
                      <input type="text" required placeholder="Area *" value={address.area} onChange={e => setAddress({ ...address, area: e.target.value })} />
                      {errors.area && <span className="checkout-error">{errors.area}</span>}
                    </div>
                  </div>
                  <div className="checkout-form-row">
                    <div>
                      <input type="text" required placeholder="City *" value={address.city} onChange={e => setAddress({ ...address, city: e.target.value })} />
                      {errors.city && <span className="checkout-error">{errors.city}</span>}
                    </div>
                  </div>
                  <div className="checkout-form-row">
                    <div>
                      <input type="text" required placeholder="State *" value={address.state} onChange={e => setAddress({ ...address, state: e.target.value })} />
                      {errors.state && <span className="checkout-error">{errors.state}</span>}
                    </div>
                  </div>
                  <div className="checkout-form-row">
                    <div>
                      <input type="text" required placeholder="Pincode * (6-digit Pincode)" value={address.pincode} maxLength={6} onChange={e => setAddress({ ...address, pincode: e.target.value.replace(/[^0-9]/g, '') })} />
                      {errors.pincode && <span className="checkout-error">{errors.pincode}</span>}
                    </div>
                  </div>
                  <button className="checkout-proceed-btn" type="submit">Save Address &amp; Proceed to Payment</button>
                </form>
              )}
            </div>
          </div>

          {/* Right: Cart/Price Details */}
          <div className="checkout-modal-right">
            <h5>Cart</h5>
            <div className="checkout-cart-list">
              {cart.map(item => (
                <div className="checkout-cart-item" key={item.id}>
                  {item.images?.[0]?.image && (
                    <img
                      src={
                        item.images[0].image && item.images[0].image !== 'null'
                          ? (item.images[0].image.startsWith('http')
                              ? item.images[0].image
                              : item.images[0].image.startsWith('/media')
                                ? `https://beta.devalayas.com${item.images[0].image}`
                                : item.images[0].image.startsWith('/')
                                  ? `https://beta.devalayas.com${item.images[0].image}`
                                  : `https://beta.devalayas.com/${item.images[0].image}`)
                          : require('../assets/Default.png')
                      }
                      alt={item.name}
                      className="checkout-cart-img"
                    />
                  )}
                  <div className="checkout-cart-info d-flex align-items-center gap-2 mb-1">
                    <div>
                      <div className="checkout-cart-title">{item.name}</div>
                      <div className="checkout-cart-qty">{item.quantity} x ₹{Number(item.final_total || item.cost).toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} = ₹{(item.quantity * Number(item.final_total || item.cost)).toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
                    </div>
                  </div>
                  {/* Remove duplicate price, now shown above with quantity */}
                </div>
              ))}
            </div>
            <div className="checkout-cart-summary">
              <div className="checkout-summary-row"><span>Subtotal</span><span>₹{charges.subtotal}</span></div>
              <div className="checkout-summary-row"><span>Convince Charge</span><span>₹{charges.convinceCharge}</span></div>
              <div className="checkout-summary-row"><span>Shipping Charge</span><span>₹{charges.shippingCharge}</span></div>
              <div className="checkout-summary-row"><span>GST</span><span>₹{charges.gst}</span></div>
              <div className="checkout-summary-row checkout-summary-total"><span>Total (inc. all taxes)</span><span>₹{charges.total}</span></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutModal;
