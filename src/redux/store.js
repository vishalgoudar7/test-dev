


import { configureStore } from '@reduxjs/toolkit';
import templeReducer from './templeSlice';

const store = configureStore({
  reducer: {
    temple: templeReducer,
  },
});

export default store;





