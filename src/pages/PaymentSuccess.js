import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const PaymentSuccess = () => {
  const location = useLocation();
  const navigate = useNavigate();
  // Data passed via navigate state
  const { orderId, devoteeName, templeName, templeImg } = location.state || {};

  if (!orderId) {
    // If accessed directly, redirect to home
    setTimeout(() => navigate('/'), 2000);
    return <div style={{ padding: 40, textAlign: 'center' }}>No payment info found. Redirecting...</div>;
  }

  return (
    <div style={{ maxWidth: 420, margin: '40px auto', background: '#fff', borderRadius: 12, boxShadow: '0 2px 12px rgba(0,0,0,0.08)', padding: 32, textAlign: 'center' }}>
      <h2 style={{ color: '#2e7d32', marginBottom: 16 }}>Payment Successful!</h2>
      <img src={templeImg} alt={templeName} style={{ width: 120, height: 120, objectFit: 'cover', borderRadius: 12, marginBottom: 18, border: '2px solid #c1440e' }} />
      <div style={{ fontSize: 18, fontWeight: 600, marginBottom: 8 }}>{templeName}</div>
      <div style={{ fontSize: 16, marginBottom: 8 }}>Devotee: <b>{devoteeName}</b></div>
      <div style={{ fontSize: 16, marginBottom: 8 }}>Order ID: <b>{orderId}</b></div>
      <button style={{ marginTop: 24, background: '#c1440e', color: '#fff', border: 'none', borderRadius: 8, padding: '10px 28px', fontWeight: 600, fontSize: 16, cursor: 'pointer' }} onClick={() => navigate('/')}>Go to Home</button>
    </div>
  );
};

export default PaymentSuccess;
