// src/api/temples.js
import axios from 'axios';

export const getTemples = (page = 1, size = 10) => {
  return axios.get('https://live.devalayas.com/api/v1/devotee/temple/', {
    params: { page, size }
  });
};
