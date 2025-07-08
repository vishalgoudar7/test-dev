// // src/api/temples.js
// import axios from 'axios';

// export const getTemples = (page = 1, size = 10) => {
//   return axios.get('https://beta.devalayas.com/api/v1/devotee/temple/', {
//     params: { page, size }
//   });
// };




import axios from 'axios';

const BASE_URL = process.env.REACT_APP_BASE_URL;

export const getTemples = (page = 1, size = 10) => {
  return axios.get(`${BASE_URL}/devotee/temple/`, {
    params: { page, size }
  });
};
