
import React, { useState, useEffect } from 'react';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import { useUserAuth } from '../context/UserAuthContext';
import '../styles/CheckoutModal.css';

// Razorpay script loader
function loadRazorpayScript(src) {
  return new Promise((resolve) => {
    const script = document.createElement('script');
    script.src = src;
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
}

// Custom date picker with close on select
function DatePickerWithClose({ selectedDate, onDateChange, error }) {
  const [open, setOpen] = React.useState(false);
  // Convert string to Date for DayPicker (fix timezone offset)
  const selected = selectedDate ? new Date(selectedDate + 'T00:00:00') : undefined;
  return (
    <div style={{ position: 'relative', marginBottom: 8 }}>
      <input
        type="text"
        readOnly
        value={selected ? selected.toLocaleDateString() : ''}
        placeholder="Booking Date *"
        style={{ width: '100%', padding: 8, borderRadius: 6, marginBottom: 0, cursor: 'pointer', background: '#fff' }}
        onClick={() => setOpen(true)}
      />
      {open && (
        <div style={{ position: 'absolute', zIndex: 10, top: 44, left: 0, background: '#fff', borderRadius: 8, boxShadow: '0 2px 8px rgba(0,0,0,0.12)', padding: 8 }}>
          <DayPicker
            mode="single"
            selected={selected}
            onSelect={date => {
              if (date) {
                // Format as yyyy-mm-dd in local time, not UTC
                const year = date.getFullYear();
                const month = String(date.getMonth() + 1).padStart(2, '0');
                const day = String(date.getDate()).padStart(2, '0');
                onDateChange(`${year}-${month}-${day}`);
                setOpen(false);
              }
            }}
            fromDate={new Date()}
            required
          />
        </div>
      )}
      {error && <span className="checkout-error">{error}</span>}
    </div>
  );
}


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
  // Show address form only if no saved address exists
  const [showAddressForm, setShowAddressForm] = useState(() => {
    try {
      const saved = JSON.parse(localStorage.getItem('savedAddresses')) || [];
      return saved.length === 0;
    } catch {
      return true;
    }
  });
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

  // When modal opens, if there are saved addresses, select the first one and hide address form
  useEffect(() => {
    if (open) {
      try {
        const saved = JSON.parse(localStorage.getItem('savedAddresses')) || [];
        if (saved.length > 0) {
          setAddress(a => ({ ...saved[0], bookingDate: a.bookingDate || '' }));
          setShowAddressForm(false);
        } else {
          setShowAddressForm(true);
        }
      } catch {
        setShowAddressForm(true);
      }
    }
  }, [open]);
  const [errors, setErrors] = useState({});
  // Edit address modal state
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editAddress, setEditAddress] = useState(null);

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

  // Helper to check if address is valid
  const isAddressValid = () => {
    return (
      address.bookingDate &&
      address.devoteeName &&
      /^\d{10}$/.test(address.devoteeMobile) &&
      address.street1 &&
      address.area &&
      address.city &&
      address.state &&
      /^\d{6}$/.test(address.pincode)
    );
  };

  const API_TOKEN = '94c4c11bfac761ba896de08bd383ca187d4e4dc4';

  // Helper to fetch Razorpay key
  async function fetchRazorpayKey() {
    try {
      const response = await fetch('https://beta.devalayas.com/api/v1/devotee/payment_key/', {
        headers: {
          'Authorization': `Token ${API_TOKEN}`
        }
      });
      if (!response.ok) throw new Error('Failed to fetch Razorpay key');
      const data = await response.json();
      return data.key;
    } catch (err) {
      alert('Unable to fetch payment key.');
      return null;
    }
  }

  // Place order after successful payment
  async function placeOrder(rz_response, paymentId, orderId) {
    // Show a loading indicator (replace with your loader if needed)
    alert('Processing your order...');
    try {
      const data = {
        razorpay_payment_id: rz_response.razorpay_payment_id,
        razorpay_order_id: rz_response.razorpay_order_id,
        razorpay_signature: rz_response.razorpay_signature,
        request_id: paymentId,
      };
      const response = await fetch('/api/v1/devotee/pooja_request/payment/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error('Order confirmation failed');
      // On success, navigate to order page
      window.location.href = `/order?payment_id=${rz_response.razorpay_payment_id}&order_id=${orderId}`;
    } catch (err) {
      alert('Order failed: ' + err.message);
    }
  }

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
          <div className="checkout-modal-left" style={{ position: 'relative' }}>
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
              <DatePickerWithClose
                selectedDate={address.bookingDate}
                onDateChange={date => setAddress({ ...address, bookingDate: date })}
                error={errors && errors.bookingDate}
              />
            </div>

            <div className="checkout-modal-address-label">
              <span>Address</span>
            </div>
            <div className="checkout-modal-left-scroll">
              {/* Address selection and add new address button */}
              {savedAddresses.length > 0 && !showAddressForm && (
                <div style={{ marginBottom: 16, opacity: address.bookingDate ? 1 : 0.5, pointerEvents: address.bookingDate ? 'auto' : 'none' }}>
                  <label style={{ fontWeight: 500, marginBottom: 4, display: 'block' }}>Shipping address</label>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 16, maxHeight: savedAddresses.length > 2 ? 220 : 'none', overflowY: savedAddresses.length > 2 ? 'auto' : 'visible' }}>
                    {savedAddresses.map((addr, idx) => {
                      const isSelected = (() => {
                        const { bookingDate: _1, ...a1 } = addr;
                        const { bookingDate: _2, ...a2 } = address;
                        return JSON.stringify(a1) === JSON.stringify(a2);
                      })();
                      return (
                        <div
                          key={idx}
                          className="address-card"
                          style={{
                            border: isSelected ? '2px solid #c1440e' : '1.5px solid #ddd',
                            borderRadius: 10,
                            padding: '16px 18px 12px 18px',
                            background: isSelected ? '#fff8f2' : '#fff',
                            boxShadow: isSelected ? '0 2px 8px rgba(193,68,14,0.08)' : '0 1px 4px rgba(0,0,0,0.03)',
                            position: 'relative',
                            cursor: address.bookingDate ? 'pointer' : 'not-allowed',
                            minHeight: 80,
                            transition: 'border 0.2s, box-shadow 0.2s',
                          }}
                          onClick={() => {
                            if (!address.bookingDate) return;
                            setAddress(a => ({ ...addr, bookingDate: a.bookingDate }));
                            setShowAddressForm(false);
                          }}
                        >
                          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
                            <div style={{ fontWeight: 600, fontSize: '1.08rem', marginBottom: 2 }}>{addr.devoteeName}</div>
                            {isSelected && (
                              <span style={{ color: '#c1440e', fontWeight: 700, fontSize: 22, marginLeft: 8, lineHeight: 1 }}>&#10003;</span>
                            )}
                          </div>
                          <div style={{ fontSize: 15, color: '#333', marginBottom: 2 }}>
                            {addr.street1}{addr.street2 ? `, ${addr.street2}` : ''}, {addr.area}, {addr.city}, {addr.state} - {addr.pincode}
                          </div>
                          <div style={{ fontSize: 14, color: '#666', marginBottom: 2 }}>{addr.devoteeMobile}</div>
                          <div style={{ fontSize: 14, color: '#666', marginBottom: 2 }}>{addr.sankalpa ? `Sankalpa: ${addr.sankalpa}` : ''}</div>
                          <button
                            type="button"
                            style={{ position: 'absolute', top: 10, right: 16, background: 'none', border: 'none', color: '#c1440e', fontWeight: 500, fontSize: 16, cursor: address.bookingDate ? 'pointer' : 'not-allowed', textDecoration: 'underline' }}
                            onClick={e => {
                              if (!address.bookingDate) return;
                              e.stopPropagation();
                              setEditAddress(addr);
                              setEditModalOpen(true);
                            }}
                          >edit</button>
                        </div>
                      );
                    })}
                  </div>
                  <button
                    type="button"
                    style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 18, background: 'none', border: 'none', color: '#c1440e', fontWeight: 500, fontSize: 17, cursor: address.bookingDate ? 'pointer' : 'not-allowed', padding: 0 }}
                    onClick={() => {
                      if (!address.bookingDate) return;
                      setShowAddressForm(true);
                      setAddress(a => ({
                        bookingDate: a.bookingDate || '',
                        devoteeName: a.devoteeName,
                        devoteeMobile: a.devoteeMobile,
                        sankalpa: '',
                        street1: '',
                        street2: '',
                        area: '',
                        city: '',
                        state: '',
                        pincode: ''
                      }));
                    }}
                  >
                    <span style={{ fontSize: 22, fontWeight: 600, color: '#c1440e', marginRight: 2 }}>+</span> Add new address
                  </button>
                  {!address.bookingDate && (
                    <div style={{ color: '#c1440e', fontSize: 14, marginTop: 8, fontWeight: 500 }}>
                      Please select your Puja date first.
                    </div>
                  )}
                  {editModalOpen && (
                    <div className="checkout-confirm-overlay" style={{zIndex: 1000}}>
                      <div className="checkout-confirm-dialog" style={{maxWidth: 420, width: '100%'}}>
                        <div className="checkout-confirm-title">Edit Address</div>
                        <form onSubmit={e => {
                          e.preventDefault();
                          // Validate
                          const newErrors = {};
                          if (!editAddress.devoteeName) newErrors.devoteeName = 'Required';
                          if (!editAddress.devoteeMobile || !/^[\d]{10}$/.test(editAddress.devoteeMobile)) newErrors.devoteeMobile = 'Valid 10-digit mobile required';
                          if (!editAddress.street1) newErrors.street1 = 'Required';
                          if (!editAddress.area) newErrors.area = 'Required';
                          if (!editAddress.city) newErrors.city = 'Required';
                          if (!editAddress.state) newErrors.state = 'Required';
                          if (!editAddress.pincode || !/^[\d]{6}$/.test(editAddress.pincode)) newErrors.pincode = 'Valid 6-digit pincode required';
                          setErrors(newErrors);
                          if (Object.keys(newErrors).length === 0) {
                            // Update address in savedAddresses
                            setSavedAddresses(addrs => addrs.map(a => {
                              const { bookingDate: _1, ...a1 } = a;
                              const { bookingDate: _2, ...a2 } = editAddress;
                              return JSON.stringify(a1) === JSON.stringify(a2) ? {...editAddress} : a;
                            }));
                            setAddress(a => ({...editAddress, bookingDate: a.bookingDate}));
                            setEditModalOpen(false);
                            setTimeout(() => setAddress(a => ({ ...a })), 0);
                            localStorage.setItem('savedAddresses', JSON.stringify(savedAddresses.map(a => {
                              const { bookingDate: _1, ...a1 } = a;
                              const { bookingDate: _2, ...a2 } = editAddress;
                              return JSON.stringify(a1) === JSON.stringify(a2) ? {...editAddress} : a;
                            })));
                          }
                        }}>
                          <div className="checkout-form-row"><input type="text" required placeholder="Devotee Name *" value={editAddress.devoteeName} onChange={e => setEditAddress({ ...editAddress, devoteeName: e.target.value })} style={{ width: '100%' }} />{errors.devoteeName && <span className="checkout-error">{errors.devoteeName}</span>}</div>
                          <div className="checkout-form-row"><input type="tel" required placeholder="Devotee Mobile *" value={editAddress.devoteeMobile} maxLength={10} onChange={e => setEditAddress({ ...editAddress, devoteeMobile: e.target.value.replace(/[^0-9]/g, '') })} style={{ width: '100%' }} />{errors.devoteeMobile && <span className="checkout-error">{errors.devoteeMobile}</span>}</div>
                          <div className="checkout-form-row"><input type="text" placeholder="Sankalpa (optional)" value={editAddress.sankalpa} onChange={e => setEditAddress({ ...editAddress, sankalpa: e.target.value })} style={{ width: '100%' }} /></div>
                          <div className="checkout-form-row"><input type="text" required placeholder="Street Address 1 *" value={editAddress.street1} onChange={e => setEditAddress({ ...editAddress, street1: e.target.value })} style={{ width: '100%' }} />{errors.street1 && <span className="checkout-error">{errors.street1}</span>}</div>
                          <div className="checkout-form-row"><input type="text" placeholder="Street Address 2 (optional)" value={editAddress.street2} onChange={e => setEditAddress({ ...editAddress, street2: e.target.value })} style={{ width: '100%' }} /></div>
                          <div className="checkout-form-row"><input type="text" required placeholder="Area *" value={editAddress.area} onChange={e => setEditAddress({ ...editAddress, area: e.target.value })} style={{ width: '100%' }} />{errors.area && <span className="checkout-error">{errors.area}</span>}</div>
                          <div className="checkout-form-row"><input type="text" required placeholder="City *" value={editAddress.city} onChange={e => setEditAddress({ ...editAddress, city: e.target.value })} style={{ width: '100%' }} />{errors.city && <span className="checkout-error">{errors.city}</span>}</div>
                          <div className="checkout-form-row"><input type="text" required placeholder="State *" value={editAddress.state} onChange={e => setEditAddress({ ...editAddress, state: e.target.value })} style={{ width: '100%' }} />{errors.state && <span className="checkout-error">{errors.state}</span>}</div>
                          <div className="checkout-form-row"><input type="text" required placeholder="Pincode * (6-digit Pincode)" value={editAddress.pincode} maxLength={6} onChange={e => setEditAddress({ ...editAddress, pincode: e.target.value.replace(/[^0-9]/g, '') })} style={{ width: '100%' }} />{errors.pincode && <span className="checkout-error">{errors.pincode}</span>}</div>
                          <div style={{ display: 'flex', gap: 8, marginTop: 12 }}>
                          <button type="submit" className="checkout-proceed-btn">Save</button>
                          <button type="button" className="btn btn-secondary" onClick={() => setEditModalOpen(false)}>Cancel</button>
                        </div>
                        <button
                          type="button"
                          style={{
                            marginTop: 18,
                            width: '100%',
                            background: '#fff0f0',
                            color: '#c1440e',
                            border: '1.5px solid #c1440e',
                            borderRadius: 8,
                            padding: '10px 0',
                            fontWeight: 600,
                            fontSize: 16,
                            cursor: 'pointer',
                            transition: 'background 0.2s',
                          }}
                          onClick={() => {
                            if (!window.confirm('Are you sure you want to delete this address?')) return;
                            setSavedAddresses(addrs => {
                              const filtered = addrs.filter(a => {
                                const { bookingDate: _1, ...a1 } = a;
                                const { bookingDate: _2, ...a2 } = editAddress;
                                return JSON.stringify(a1) !== JSON.stringify(a2);
                              });
                              localStorage.setItem('savedAddresses', JSON.stringify(filtered));
                              // If the deleted address was selected, select the first remaining address
                              if (filtered.length > 0) {
                                setAddress(a => ({ ...filtered[0], bookingDate: a.bookingDate }));
                              } else {
                                setShowAddressForm(true);
                                setAddress(a => ({
                                  bookingDate: a.bookingDate || '',
                                  devoteeName: '',
                                  devoteeMobile: '',
                                  sankalpa: '',
                                  street1: '',
                                  street2: '',
                                  area: '',
                                  city: '',
                                  state: '',
                                  pincode: ''
                                }));
                              }
                              setEditModalOpen(false);
                              return filtered;
                            });
                          }}
                        >Delete Address</button>
                        <button
                          type="button"
                          className="checkout-proceed-btn"
                          style={{
                            marginTop: 12,
                            width: '100%',
                            background: '#c1440e',
                            color: '#fff',
                            border: 'none',
                            borderRadius: 8,
                            padding: '12px 0',
                            fontWeight: 700,
                            fontSize: 17,
                            cursor: 'pointer',
                            transition: 'background 0.2s',
                          }}
                          onClick={e => {
                            e.preventDefault();
                            // Optionally, add validation or trigger payment logic here
                            setEditModalOpen(false);
                            // You can call your payment/checkout handler here
                          }}
                        >Proceed to Checkout / Make Payment</button>
                        </form>
                      </div>
                    </div>
                  )}
                </div>
              )}
              {showAddressForm && (
                <form className="checkout-address-form" style={{ position: 'relative' }} onSubmit={e => {
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
                  <div style={{ display: 'flex', alignItems: 'center', marginBottom: 8 }}>
                    <span style={{ fontWeight: 600, fontSize: '1.08rem', whiteSpace: 'nowrap' }}>Add Address</span>
                    <div style={{ flex: 1 }} />
                  </div>
                  {/* Booking date is now above address section */}
                  <div className="checkout-form-row">
                    <div>
                      <input type="text" required placeholder="Devotee Name *" value={address.devoteeName} onChange={e => setAddress({ ...address, devoteeName: e.target.value })} style={{ width: '100%' }} />
                      {errors.devoteeName && <span className="checkout-error">{errors.devoteeName}</span>}
                    </div>
                  </div>
                  <div className="checkout-form-row">
                    <div>
                      <input type="tel" required placeholder="Devotee Mobile Number * (10-digit Mobile)" value={address.devoteeMobile} maxLength={10} onChange={e => setAddress({ ...address, devoteeMobile: e.target.value.replace(/[^0-9]/g, '') })} style={{ width: '100%' }} />
                      {errors.devoteeMobile && <span className="checkout-error">{errors.devoteeMobile}</span>}
                    </div>
                  </div>
                  <div className="checkout-form-row">
                    <div>
                      <input type="text" placeholder="Sankalpa (optional)" value={address.sankalpa} onChange={e => setAddress({ ...address, sankalpa: e.target.value })} style={{ width: '100%' }} />
                    </div>
                  </div>
                  <div className="checkout-form-row">
                    <div>
                      <input type="text" required placeholder="Street Address 1 *" value={address.street1} onChange={e => setAddress({ ...address, street1: e.target.value })} style={{ width: '100%' }} />
                      {errors.street1 && <span className="checkout-error">{errors.street1}</span>}
                    </div>
                  </div>
                  <div className="checkout-form-row">
                    <div>
                      <input type="text" placeholder="Street Address 2 (optional)" value={address.street2} onChange={e => setAddress({ ...address, street2: e.target.value })} style={{ width: '100%' }} />
                    </div>
                  </div>
                  <div className="checkout-form-row">
                    <div>
                      <input type="text" required placeholder="Area *" value={address.area} onChange={e => setAddress({ ...address, area: e.target.value })} style={{ width: '100%' }} />
                      {errors.area && <span className="checkout-error">{errors.area}</span>}
                    </div>
                  </div>
                  <div className="checkout-form-row">
                    <div>
                      <input type="text" required placeholder="City *" value={address.city} onChange={e => setAddress({ ...address, city: e.target.value })} style={{ width: '100%' }} />
                      {errors.city && <span className="checkout-error">{errors.city}</span>}
                    </div>
                  </div>
                  <div className="checkout-form-row">
                    <div>
                      <input type="text" required placeholder="State *" value={address.state} onChange={e => setAddress({ ...address, state: e.target.value })} style={{ width: '100%' }} />
                      {errors.state && <span className="checkout-error">{errors.state}</span>}
                    </div>
                  </div>
                  <div className="checkout-form-row">
                    <div>
                      <input type="text" required placeholder="Pincode * (6-digit Pincode)" value={address.pincode} maxLength={6} onChange={e => setAddress({ ...address, pincode: e.target.value.replace(/[^0-9]/g, '') })} style={{ width: '100%' }} />
                      {errors.pincode && <span className="checkout-error">{errors.pincode}</span>}
                    </div>
                  </div>
                  <button className="checkout-proceed-btn" type="submit">Save Address &amp; Proceed to Payment</button>
                </form>
              )}
            {/* Main Proceed to Checkout button at the bottom of the modal */}
            {(!showAddressForm && isAddressValid()) && (
              <div style={{ marginTop: 24, display: 'flex', justifyContent: 'flex-end' }}>
                <button
                  type="button"
                  className="checkout-proceed-btn"
                  style={{
                    width: 'auto',
                    minWidth: 140,
                    background: isAddressValid() ? '#c1440e' : '#ccc',
                    color: '#fff',
                    border: 'none',
                    borderRadius: 8,
                    padding: '12px 18px',
                    fontWeight: 700,
                    fontSize: 16,
                    cursor: isAddressValid() ? 'pointer' : 'not-allowed',
                    boxShadow: '0 2px 8px rgba(193,68,14,0.08)',
                    opacity: isAddressValid() ? 1 : 0.6,
                  }}
                  disabled={!isAddressValid()}
                  onClick={async () => {
                    if (!isAddressValid()) return;
                    // Razorpay integration (fetch key and use API url)
                    const res = await loadRazorpayScript('https://checkout.razorpay.com/v1/checkout.js');
                    if (!res) {
                      alert('Razorpay SDK failed to load. Are you online?');
                      return;
                    }
                    const rzKey = await fetchRazorpayKey();
                    if (!rzKey) return;
                    const amount = Math.round((charges.total || 1) * 100); // INR to paise
                    const order_id = 'order_QoYYUgHuUvgRbB'; // Replace with your real order_id logic
                    var options = {
                      key: rzKey,
                      amount: amount,
                      currency: 'INR',
                      name: 'Devalaya',
                      description: 'Payment towards Event Pooja',
                      image: 'https://cdn.shopify.com/s/files/1/0735/5895/0166/files/unnamed_copy_ac3ece77-8a3a-44b7-b0f2-820c39455044.jpg?v=1679241399&width=500',
                      order_id: order_id,
                      handler: function (response) {
                        placeOrder(response, /* paymentId */ 'REPLACE_WITH_PAYMENT_ID', /* orderId */ 'REPLACE_WITH_ORDER_ID');
                      },
                      prefill: {
                        name: address.devoteeName,
                        email: profile?.email || '',
                        contact: address.devoteeMobile,
                      },
                      notes: {
                        address: 'Devalaya',
                      },
                      theme: {
                        color: '#df3002',
                      },
                    };
                    var rzp1 = new window.Razorpay(options);
                    rzp1.on('payment.failed', function (response) {
                      alert(JSON.stringify(response));
                    });
                    rzp1.open();
                  }}
                >Proceed to Checkout / Make Payment</button>
              </div>
            )}
          {/* End of checkout-modal-left */}
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
