
// // src/api/api.js

// import axios from 'axios';

// // ✅ Create axios instance with baseURL
// const api = axios.create({
//   baseURL: 'https://beta.devalayas.com',
//   headers: {
//     'Content-Type': 'application/json', // Use JSON for GET and standard requests
//   },
// });

// // ✅ Helper to convert object to x-www-form-urlencoded
// const toFormUrlEncoded = (obj) =>
//   Object.keys(obj)
//     .map((key) => encodeURIComponent(key) + '=' + encodeURIComponent(obj[key]))
//     .join('&');

// // ✅ Attach token dynamically for authenticated requests
// api.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem('token'); // ensure you call login first
//     if (token) {
//       config.headers['Authorization'] = `Token ${token}`;
//     }
//     return config;
//   },
//   (error) => Promise.reject(error)
// );

// // ✅ Send OTP via mobile
// export const sendMobileOtp = async (mobile_number) => {
//   const payload = {
//     mobile_number,
//     login_token: '123',
//     app_version: '1',
//     device_model: 'Browser',
//     user_type: 'Devotee',
//     lang: 'en',
//   };

//   try {
//     const response = await api.post(
//       '/api/v1/auth/',
//       toFormUrlEncoded(payload),
//       { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
//     );
//     return response.data;
//   } catch (error) {
//     throw error.response?.data?.message || 'Failed to send OTP.';
//   }
// };

// // ✅ Login using mobile + OTP
// export const loginWithMobile = async (mobile_number, otp) => {
//   const payload = {
//     mobile_number,
//     otp,
//     login_token: '123',
//     app_version: '1',
//     device_model: 'Browser',
//     user_type: 'Devotee',
//   };

//   try {
//     const response = await api.post(
//       '/api/v1/devotee/login/',
//       toFormUrlEncoded(payload),
//       { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
//     );

//     if (response.data.token) {
//       localStorage.setItem('token', response.data.token);
//     }

//     return response.data;
//   } catch (error) {
//     throw error.response?.data?.message || 'Mobile login failed.';
//   }
// };

// // ✅ Login using email + OTP
// export const loginWithEmail = async (email, otp) => {
//   const payload = {
//     email,
//     otp,
//     login_token: '123',
//     app_version: '1',
//     device_model: 'Browser',
//     user_type: 'Devotee',
//   };

//   try {
//     const response = await api.post(
//       '/api/v1/devotee/login/',
//       toFormUrlEncoded(payload),
//       { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
//     );

//     if (response.data.token) {
//       localStorage.setItem('token', response.data.token);
//     }

//     return response.data;
//   } catch (error) {
//     throw error.response?.data?.message || 'Email login failed.';
//   }
// };

// // ✅ Export both api and the form encoder
// export { toFormUrlEncoded };
// export default api;








// src/api/api.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'https://beta.devalayas.com',
  headers: {
    'Content-Type': 'application/json',
  },
});

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

const toFormUrlEncoded = (obj) =>
  Object.keys(obj)
    .map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(obj[key])}`)
    .join('&');

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
    { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
  );

  return response.data;
};

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
    { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
  );

  if (response.data.token) {
    localStorage.setItem('token', response.data.token);
  }

  return response.data;
};

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
    { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
  );

  if (response.data.token) {
    localStorage.setItem('token', response.data.token);
  }

  return response.data;
};

export default api;
