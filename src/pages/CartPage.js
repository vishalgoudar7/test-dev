import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import CheckoutModal from '../components/CheckoutModal';

const CartPage = () => {
  const [cart, setCart] = useState([]);
  const [showCheckout, setShowCheckout] = useState(false);
  const navigate = useNavigate();

  const BASE_URL = process.env.REACT_APP_API_BASE_URL || '';

  useEffect(() => {
    try {
      const stored = JSON.parse(localStorage.getItem('cart')) || [];
      setCart(stored.map(item => ({ ...item, quantity: item.quantity || 1 })));
    } catch {
      setCart([]);
    }
  }, []);

  const updateCart = (newCart) => {
    setCart(newCart);
    localStorage.setItem('cart', JSON.stringify(newCart));
    window.dispatchEvent(new Event('storage'));
  };

  const increment = (id) => {
    const newCart = cart.map(item =>
      item.id === id ? { ...item, quantity: item.quantity + 1 } : item
    );
    updateCart(newCart);
  };

  const decrement = (id) => {
    const newCart = cart
      .map(item =>
        item.id === id ? { ...item, quantity: Math.max(1, item.quantity - 1) } : item
      )
      .filter(item => item.quantity > 0);
    updateCart(newCart);
  };

  const removeItem = (id) => {
    const newCart = cart.filter(item => item.id !== id);
    updateCart(newCart);
  };

  const handleCheckout = () => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login?redirect=/cart');
    } else {
      setShowCheckout(true);
    }
  };

  const subtotal = cart.reduce(
    (sum, item) =>
      sum +
      (item.payment_data?.original_cost
        ? Number(item.payment_data.original_cost)
        : Number(item.final_total) || Number(item.cost) || 0) *
        (item.quantity || 1),
    0
  );

  const getImageUrl = (item) => {
    const image = item?.images?.[0]?.image;
    if (!image || image === 'null') return '';
    if (image.startsWith('http')) return image;
    if (image.startsWith('/')) return `${BASE_URL}${image}`;
    return `${BASE_URL}/${image}`;
  };

  return (
    <div className="container py-5" style={{ minHeight: '80vh' }}>
      <h1 className="text-center mb-5 fw-bold" style={{ fontSize: '2.5rem' }}>
        Pooja Selections
      </h1>

      {cart.length === 0 ? (
        <div className="text-center">
          <p className="fs-5">Your cart is currently empty.</p>
          <Link to="/" className="btn btn-primary mt-3">
            Continue Shopping
          </Link>
        </div>
      ) : (
        <div className="row g-4">
          {/* Cart Items Column */}
          <div className="col-lg-8">
            <div className="list-group">
              {cart.map((item) => (
                <div key={item.id} className="list-group-item p-3 d-flex flex-column flex-md-row align-items-md-center">
                  <div className="d-flex align-items-center mb-3 mb-md-0">
                    <img
                      src={getImageUrl(item)}
                      alt={item.name}
                      style={{
                        width: '100px',
                        height: '100px',
                        objectFit: 'cover',
                        borderRadius: '8px',
                        background: '#f8f9fa',
                        border: '1px solid #dee2e6',
                      }}
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.style.display = 'none';
                      }}
                      className="me-3"
                    />
                    <div className="flex-grow-1">
                      <h5 className="mb-1 fw-bold">{item.name}</h5>
                      <p className="text-muted mb-0">{item.details}</p>
                    </div>
                  </div>

                  <div className="d-flex align-items-center justify-content-between mt-3 mt-md-0 ms-md-auto" style={{ width: '100%', maxWidth: '300px' }}>
                    <div className="text-center">
                      <span className="d-block text-muted">Price</span>
                      <span className="d-block fw-bold fs-5 mt-1">Rs. {item.final_total || item.cost}</span>
                    </div>

                    <div className="d-flex align-items-center mx-4">
                      <button className="btn btn-sm btn-outline-secondary" onClick={() => decrement(item.id)}>-</button>
                      <span className="mx-2 fw-bold">{item.quantity}</span>
                      <button className="btn btn-sm btn-outline-secondary" onClick={() => increment(item.id)}>+</button>
                    </div>

                    <div className="text-center">
                      <span className="d-block text-muted">Total</span>
                      <span className="d-block fw-bold fs-5 mt-1">Rs. {(item.final_total || item.cost) * item.quantity}</span>
                    </div>

                    <button
                      className="btn btn-link text-danger ms-3"
                      onClick={() => removeItem(item.id)}
                      title="Remove"
                    >
                      <span role="img" aria-label="delete" className="fs-4">🗑️</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <Link to="/" className="btn btn-link mt-3 fw-bold text-dark">
              &larr; Continue Shopping
            </Link>
          </div>

          {/* Cart Summary Column */}
          <div className="col-lg-4">
            <div className="p-4 bg-light rounded-3 sticky-top" style={{ top: '2rem' }}>
              <h4 className="mb-4 fw-bold">Order Summary</h4>
              <div className="d-flex justify-content-between fs-5 fw-bold mb-3">
                <span>Subtotal</span>
                <span>Rs. {subtotal}</span>
              </div>
              <p className="text-muted" style={{ fontSize: '0.9rem' }}>
                Taxes and shipping will be calculated at checkout.
              </p>
              <button
                className="btn btn-primary btn-lg w-100 fw-bold mt-3"
                style={{ background: '#c44a1c', borderColor: '#c44a1c' }}
                onClick={handleCheckout}
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        </div>
      )}

      {showCheckout && (
        <CheckoutModal
          open={showCheckout}
          onClose={() => setShowCheckout(false)}
          cart={cart}
          setCart={setCart}
        />
      )}
    </div>
  );
};

export default CartPage;