import axios from 'axios';

// 🔧 Config
const API_CONFIG = {
  servers: {
    beta: {
      base: "https://beta.devalayas.com",
    },
    live: {
      base: "https://live.devalayas.com",
    },
  },
  current: 'beta',
};

const { base } = API_CONFIG.servers[API_CONFIG.current];

// ✅ Axios instance
const api = axios.create({
  baseURL: base,
  headers: {
    'Content-Type': 'application/json',
  },
});

// ✅ Inject token into every request
api.interceptors.request.use(
  (config) => {
    const userToken = localStorage.getItem('authToken');
    const isAuthEndpoint =
      config.url.includes('/api/v1/auth/') ||
      config.url.includes('/api/v1/devotee/login/');

    if (!isAuthEndpoint && userToken) {
      config.headers['Authorization'] = `Token ${userToken}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// ✅ Helper: x-www-form-urlencoded encoder
const toFormUrlEncoded = (obj) =>
  Object.keys(obj)
    .map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(obj[key])}`)
    .join('&');

// ✅ Auto-generate token on app initialization
export const autoGenerateToken = async () => {
  const storedMobileNumber = localStorage.getItem('mobileNumber');
  const mobileNumber =
    storedMobileNumber &&
    storedMobileNumber !== 'null' &&
    storedMobileNumber !== '+919080706050'
      ? storedMobileNumber
      : '+919080706050';

  const payload = {
    mobile_number: mobileNumber,
    login_token: '123',
    app_version: '1',
    device_model: 'Browser',
    user_type: 'Devotee',
    lang: 'en',
  };

  try {
    const response = await api.post('/api/v1/auth/', toFormUrlEncoded(payload), {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    });

    const data = response.data;

    if (data?.token) {
      localStorage.setItem('authToken', data.token);
      localStorage.setItem('devoteeProfile', JSON.stringify(data));
      if (mobileNumber !== '+919080706050') {
        localStorage.setItem('mobileNumber', mobileNumber);
      }
    }

    return data;
  } catch (error) {
    console.error('❌ Auto token generation failed:', error.response?.data || error.message);
    throw error;
  }
};

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

  const response = await api.post('/api/v1/auth/', toFormUrlEncoded(payload), {
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
  });

  const data = response.data;

  if (data?.token) {
    localStorage.setItem('authToken', data.token);
    localStorage.setItem('devoteeProfile', JSON.stringify(data));
  }

  return data;
};

// ✅ Login with mobile/email OTP
export const loginWithOtp = async ({ mobile_number, email, otp }) => {
  const payload = {
    otp,
    login_token: '123',
    app_version: '1',
    device_model: 'Browser',
    user_type: 'Devotee',
  };

  if (mobile_number) payload.mobile_number = mobile_number;
  if (email) payload.email = email;

  const response = await api.post('/api/v1/devotee/login/', toFormUrlEncoded(payload), {
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
  });

  const data = response?.data?.data;

  if (data?.token) {
    localStorage.setItem('authToken', data.token);
    localStorage.setItem('devoteeProfile', JSON.stringify(data));
  }

  return data;
};

// ✅ Get devotee profile
export const getDevoteeProfile = async () => {
  try {
    const response = await api.get('/api/v1/devotee/profile/');
    return response.data;
  } catch (error) {
    console.error('❌ Error fetching profile:', error.response?.data || error.message);
    throw error;
  }
};

// ✅ Logout user
export const logout = async () => {
  try {
    // Logout from server
    await api.get('/api/v1/auth/logout/');
  } catch (error) {
    console.warn('⚠️ Logout request failed, continuing with client logout.');
  }

  // Client-side cleanup
  localStorage.removeItem('authToken');
  localStorage.removeItem('devoteeProfile');
  localStorage.removeItem('mobileNumber');
};

export default api;
