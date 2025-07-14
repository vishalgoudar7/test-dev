
// // src/api/api.js
// import axios from 'axios';

// // ✅ Centralized BASE_URL and TOKEN
// const BASE_URL = 'https://beta.devalayas.com';
// // const LIVE_TOKEN = '46c1e874b116778356a8f7dca5420b2e740d9ac7'; 
// const LIVE_TOKEN = 'c91ae32509fa4ce4e8c21aa4a86118100f97c4f2';

// // ✅ Create Axios instance
// const api = axios.create({
//   baseURL: BASE_URL,
//   headers: {
//     'Content-Type': 'application/json',
//   },
// });

// // ✅ Attach token to every request
// api.interceptors.request.use(
//   (config) => {
//     config.headers['Authorization'] = `Token ${LIVE_TOKEN}`;
//     return config;
//   },
//   (error) => Promise.reject(error)
// );

// // ✅ Helper: Convert object to x-www-form-urlencoded
// const toFormUrlEncoded = (obj) =>
//   Object.keys(obj)
//     .map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(obj[key])}`)
//     .join('&');

// // ✅ Send mobile OTP
// export const sendMobileOtp = async (mobile_number) => {
//   const payload = {
//     mobile_number,
//     login_token: '123',
//     app_version: '1',
//     device_model: 'Browser',
//     user_type: 'Devotee',
//     lang: 'en',
//   };

//   const response = await api.post(
//     '/api/v1/auth/',
//     toFormUrlEncoded(payload),
//     {
//       headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
//     }
//   );

//   return response.data;
// };

// // ✅ Verify mobile login
// export const loginWithMobile = async (mobile_number, otp) => {
//   const payload = {
//     mobile_number,
//     otp,
//     login_token: '123',
//     app_version: '1',
//     device_model: 'Browser',
//     user_type: 'Devotee',
//   };

//   const response = await api.post(
//     '/api/v1/devotee/login/',
//     toFormUrlEncoded(payload),
//     {
//       headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
//     }
//   );

//   return response.data;
// };

// // ✅ Verify email login
// export const loginWithEmail = async (email, otp) => {
//   const payload = {
//     email,
//     otp,
//     login_token: '123',
//     app_version: '1',
//     device_model: 'Browser',
//     user_type: 'Devotee',
//   };

//   const response = await api.post(
//     '/api/v1/devotee/login/',
//     toFormUrlEncoded(payload),
//     {
//       headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
//     }
//   );

//   return response.data;
// };

// export default api;


























import axios from 'axios';

// ✅ Server config for beta/live
const API_CONFIG = {
  servers: {
    beta: {
      base: "https://beta.devalayas.com",
      token: "94c4c11bfac761ba896de08bd383ca187d4e4dc4"
    },
    live: {
      base: "https://live.devalayas.com",
      token: "18a6c4adbef1a4398a1869347358a926689bbdb8"
    }
  },
  // 🔁 Switch between 'beta' or 'live' here
  current: 'beta',

  get baseURL() {
    return this.servers[this.current].base;
  },
  get token() {
    return this.servers[this.current].token;
  }
};

// ✅ Axios instance
const api = axios.create({
  baseURL: API_CONFIG.baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// ✅ Attach token to all requests
api.interceptors.request.use(
  (config) => {
    config.headers['Authorization'] = `Token ${API_CONFIG.token}`;
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
    // ✅ DO NOT duplicate /api/v1/
    '/api/v1/auth/',
    toFormUrlEncoded(payload),
    {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    }
  );

  return response.data;
};

// ✅ Login with mobile
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
    '/login/',
    toFormUrlEncoded(payload),
    {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    }
  );

  return response.data;
};

// ✅ Login with email
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
    '/login/',
    toFormUrlEncoded(payload),
    {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    }
  );

  return response.data;
};

export default api;
