
// import axios from 'axios';

// const api = axios.create({
//   baseURL: 'https://beta.devalayas.com',
// });

// export default api;





import axios from 'axios';

const api = axios.create({
  baseURL: 'https://beta.devalayas.com',
});

// Firebase Placeholder (if needed)
const initializeFirebase = () => {
  // firebase.initializeApp({...});
};

const fetchTemple = async (templeId) => {
  try {
    const response = await api.get(`/devotee/temple/${templeId}`);
    return response.data;
  } catch (err) {
    console.error(err);
    return {};
  }
};

const fetchPoojas = async (templeId, search) => {
  try {
    const response = await api.get(`/devotee/pooja/?temple=${templeId}&search=${search}`);
    const results = response.data.results;
    const regex = new RegExp('prasad', 'i');
    return {
      poojas: results.filter(item => !regex.test(item.name)),
      prasads: results.filter(item => regex.test(item.name)),
    };
  } catch (err) {
    console.error(err);
    return { poojas: [], prasads: [] };
  }
};

const fetchConstants = async () => {
  try {
    const response = await api.get("/devotee/constants/");
    return response.data;
  } catch (err) {
    console.error(err);
    return {};
  }
};

const requestPooja = async (poojaId) => {
  try {
    await api.get(`/devotee/pooja/${poojaId}/request`);
    return true;
  } catch (err) {
    console.error(err);
    return false;
  }
};

const fetchPaymentKey = async () => {
  try {
    const response = await api.get("/devotee/payment_key/");
    return response.data.key;
  } catch (err) {
    console.error(err);
    return "";
  }
};

const placeOrder = async (rz_response, paymentId, orderId) => {
  try {
    const data = {
      razorpay_response: rz_response,
      request_id: paymentId,
    };
    await api.post("/devotee/pooja_request/payment/", data);
    return true;
  } catch (err) {
    console.error(err);
    return false;
  }
};

const bulkPoojaRequest = async (cart) => {
  try {
    const payload = { requests: cart };
    const response = await api.post('/devotee/bulk_pooja_request/', payload);
    return response.data;
  } catch (err) {
    console.error(err.response?.data?.errors?.[0]?.message?.[0] || 'Error in bulk request');
    return [];
  }
};

// ✅ Add this at the end
export default api;
