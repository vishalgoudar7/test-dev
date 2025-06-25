
import { configureStore } from '@reduxjs/toolkit';
import templeReducer from './templeSlice';

export const store = configureStore({
  reducer: {
    temple: templeReducer, // 'temple' will be used in useSelector like: state.temple
  },
});






