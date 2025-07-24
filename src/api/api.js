// src/api/api.js
import axios from 'axios';

// ✅ Dynamic environment config
const API_CONFIG = {
  servers: {
    beta: {
      base: "https://beta.devalayas.com",
      token: "9e65dcf08308a3f623c34491a92b282707edbe2c"
    },
    live: {
      base: "https://live.devalayas.com",
      token: "e52a308c58887782d13a6fce7ae0258f8b6dfde1"
    }
  },
  // 🔁 Switch between 'beta' or 'live' here
  current: 'beta'
};

// ✅ Get current server settings
const { base, token } = API_CONFIG.servers[API_CONFIG.current];

// ✅ Create Axios instance
const api = axios.create({
  baseURL: base,
  headers: {
    'Content-Type': 'application/json',
  },
});

// ✅ Attach token to every request
api.interceptors.request.use(
  (config) => {
    config.headers['Authorization'] = `Token ${token}`;
    return config;
  },
  (error) => Promise.reject(error)
);

// ✅ Helper: Convert object to x-www-form-urlencoded
const toFormUrlEncoded = (obj) =>
  Object.keys(obj)
    .map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(obj[key])}`)
    .join('&');

// ✅ Send mobile OTP
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

// ✅ Verify mobile login
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

  return response.data;
};

// ✅ Verify email login
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

  return response.data;
};

// ✅ Get devotee profile data
export const getDevoteeProfile = async () => {
  try {
    const response = await api.get('/api/v1/devotee/profile/');
    return response.data;
  } catch (error) {
    console.error('Error fetching devotee profile:', error);
    throw error;
  }
};

export default api;

