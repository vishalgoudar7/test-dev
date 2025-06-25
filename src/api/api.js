// // src/api/api.js
// import axios from "axios";

// const BASE_URL = "https://beta.devalayas.com";

// const api = axios.create({
//   baseURL: BASE_URL,
//   headers: {
//     "Content-Type": "application/json",
//   },
// });

// // ✅ Interceptor to attach the token
// api.interceptors.request.use((config) => {
//   const token = localStorage.getItem("c91ae32509fa4ce4e8c21aa4a86118100f97c4f2");
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }
//   return config;
// });

// export default api;




// src/api/api.js
// import axios from "axios";

// const BASE_URL = "https://beta.devalayas.com";

// const api = axios.create({
//   baseURL: BASE_URL,
//   headers: {
//     "Content-Type": "application/json",
//   },
// });

// // ✅ Attach token from localStorage (stored as "authToken")
// api.interceptors.request.use((config) => {
//   const token = localStorage.getItem("authToken","c91ae32509fa4ce4e8c21aa4a86118100f97c4f2");
//   if (token) {
//     config.headers.Authorization = `Token ${token}`; // ✅ DRF format
//   }
//   return config;
// });

// export default api;




// src/api/api.js
import axios from "axios";

const BASE_URL = "https://beta.devalayas.com";

// ✅ Axios instance
const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// ✅ Interceptor to attach token from localStorage
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("authToken"); // ✅ Correct: only one argument
  if (token) {
    config.headers.Authorization = `Token ${token}`; // ✅ Correct: DRF-style auth
  }
  return config;
});

export default api;
