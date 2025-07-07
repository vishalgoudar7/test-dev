


// import { configureStore } from '@reduxjs/toolkit';
// import templeReducer from './templeSlice';

// const store = configureStore({
//   reducer: {
//     temple: templeReducer,
//   },
// });

// export default store;







import pujaReducer from './pujaSlice';
import templeReducer from './templeSlice';

const store = configureStore({
  reducer: {
    puja: pujaReducer,
    temple: templeReducer,
  },
});

