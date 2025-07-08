// src/api/api.js
import axios from 'axios';

// Axios instance
const api = axios.create({
  baseURL: 'https://beta.devalayas.com',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Attach token automatically on each request
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Token ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Helper to convert object to x-www-form-urlencoded
const toFormUrlEncoded = (obj) =>
  Object.keys(obj)
    .map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(obj[key])}`)
    .join('&');

// Send OTP to mobile
export const sendMobileOtp = async (mobile_number) => {
  const payload = {
    mobile_number,
    login_token: '123',
    app_version: '1',
    device_model: 'Browser',
    user_type: 'Devotee',
    lang: 'en',
  };

  const response = await api.post(
    '/api/v1/auth/',
    toFormUrlEncoded(payload),
    {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    }
  );

  return response.data;
};

// Login with mobile + OTP
export const loginWithMobile = async (mobile_number, otp) => {
  const payload = {
    mobile_number,
    otp,
    login_token: '123',
    app_version: '1',
    device_model: 'Browser',
    user_type: 'Devotee',
  };

  const response = await api.post(
    '/api/v1/devotee/login/',
    toFormUrlEncoded(payload),
    {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    }
  );

  if (response.data.token) {
    localStorage.setItem('token', response.data.token);
  }

  return response.data;
};

// Login with email + OTP
export const loginWithEmail = async (email, otp) => {
  const payload = {
    email,
    otp,
    login_token: '123',
    app_version: '1',
    device_model: 'Browser',
    user_type: 'Devotee',
  };

  const response = await api.post(
    '/api/v1/devotee/login/',
    toFormUrlEncoded(payload),
    {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    }
  );

  if (response.data.token) {
    localStorage.setItem('token', response.data.token);
  }

  return response.data;
};

export default api;
