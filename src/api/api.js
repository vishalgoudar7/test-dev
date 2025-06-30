
// import axios from 'axios';

// const api = axios.create({
//   baseURL: 'https://beta.devalayas.com',
// });

// export default api;





// import axios from 'axios';

// const api = axios.create({
//   baseURL: 'https://beta.devalayas.com',
// });

// // Firebase Placeholder (if needed)
// const initializeFirebase = () => {
//   // firebase.initializeApp({...});
// };

// const fetchTemple = async (templeId) => {
//   try {
//     const response = await api.get(`/devotee/temple/${templeId}`);
//     return response.data;
//   } catch (err) {
//     console.error(err);
//     return {};
//   }
// };

// const fetchPoojas = async (templeId, search) => {
//   try {
//     const response = await api.get(`/devotee/pooja/?temple=${templeId}&search=${search}`);
//     const results = response.data.results;
//     const regex = new RegExp('prasad', 'i');
//     return {
//       poojas: results.filter(item => !regex.test(item.name)),
//       prasads: results.filter(item => regex.test(item.name)),
//     };
//   } catch (err) {
//     console.error(err);
//     return { poojas: [], prasads: [] };
//   }
// };

// const fetchConstants = async () => {
//   try {
//     const response = await api.get("/devotee/constants/");
//     return response.data;
//   } catch (err) {
//     console.error(err);
//     return {};
//   }
// };

// const requestPooja = async (poojaId) => {
//   try {
//     await api.get(`/devotee/pooja/${poojaId}/request`);
//     return true;
//   } catch (err) {
//     console.error(err);
//     return false;
//   }
// };

// const fetchPaymentKey = async () => {
//   try {
//     const response = await api.get("/devotee/payment_key/");
//     return response.data.key;
//   } catch (err) {
//     console.error(err);
//     return "";
//   }
// };

// const placeOrder = async (rz_response, paymentId, orderId) => {
//   try {
//     const data = {
//       razorpay_response: rz_response,
//       request_id: paymentId,
//     };
//     await api.post("/devotee/pooja_request/payment/", data);
//     return true;
//   } catch (err) {
//     console.error(err);
//     return false;
//   }
// };

// const bulkPoojaRequest = async (cart) => {
//   try {
//     const payload = { requests: cart };
//     const response = await api.post('/devotee/bulk_pooja_request/', payload);
//     return response.data;
//   } catch (err) {
//     console.error(err.response?.data?.errors?.[0]?.message?.[0] || 'Error in bulk request');
//     return [];
//   }
// };

// // ✅ Add this at the end
// export default api;






// import axios from "axios";

// // Create Axios instance
// const api = axios.create({
//   baseURL: "https://beta.devalayas.com", // Use the correct base URL
//   headers: {
//     "Content-Type": "application/json",
//   },
// });

// // Optional: Automatically attach token for authenticated requests
// api.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem("token");
//     if (token) {
//       config.headers["Authorization"] = `Token ${token}`;
//     }
//     return config;
//   },
//   (error) => Promise.reject(error)
// );

// // API to login with mobile + OTP
// export const loginWithMobile = async (mobile_number, otp) => {
//   try {
//     const response = await api.post("/api/v1/devotee/login/", {
//       mobile_number,
//       otp,
//       login_token: "123",
//       app_version: "1",
//       device_model: "Browser",
//       user_type: "Devotee",
//     });
//     return response.data;
//   } catch (error) {
//     throw error.response?.data?.message || "Mobile login failed.";
//   }
// };

// // API to login with email + OTP
// export const loginWithEmail = async (email, otp) => {
//   try {
//     const response = await api.post("/api/v1/devotee/login/", {
//       email,
//       otp,
//       login_token: "123",
//       app_version: "1",
//       device_model: "Browser",
//       user_type: "Devotee",
//     });
//     return response.data;
//   } catch (error) {
//     throw error.response?.data?.message || "Email login failed.";
//   }
// };

// export default api;





import axios from "axios";

// Axios instance
const api = axios.create({
  baseURL: "https://beta.devalayas.com",
  headers: {
    "Content-Type": "application/x-www-form-urlencoded",
  },
});

// Helper to convert object to x-www-form-urlencoded
const toFormUrlEncoded = (obj) =>
  Object.keys(obj)
    .map((key) => encodeURIComponent(key) + "=" + encodeURIComponent(obj[key]))
    .join("&");

// ✅ Send OTP via mobile
export const sendMobileOtp = async (mobile_number) => {
  const payload = {
    mobile_number,
    login_token: "123",
    app_version: "1",
    device_model: "Browser",
    user_type: "Devotee",
    lang: "en",
  };

  try {
    const response = await api.post("/api/v1/auth/", toFormUrlEncoded(payload));
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || "Failed to send OTP.";
  }
};

// ✅ Login using mobile number + OTP
export const loginWithMobile = async (mobile_number, otp) => {
  const payload = {
    mobile_number,
    otp,
    login_token: "123",
    app_version: "1",
    device_model: "Browser",
    user_type: "Devotee",
  };

  try {
    const response = await api.post(
      "/api/v1/devotee/login/",
      toFormUrlEncoded(payload)
    );
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || "Mobile login failed.";
  }
};

// ✅ Login using email + OTP
export const loginWithEmail = async (email, otp) => {
  const payload = {
    email,
    otp,
    login_token: "123",
    app_version: "1",
    device_model: "Browser",
    user_type: "Devotee",
  };

  try {
    const response = await api.post(
      "/api/v1/devotee/login/",
      toFormUrlEncoded(payload)
    );
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || "Email login failed.";
  }
};

// ✅ Export default api instance for use in templeSlice, etc.
export default api;
