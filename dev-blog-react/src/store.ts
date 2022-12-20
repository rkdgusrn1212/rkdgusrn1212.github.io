import { configureStore } from '@reduxjs/toolkit';
import { postInfoByIdxSlice } from './services/postInfoByIdxSlice';

const store = configureStore({
  reducer: {
    postInfo: postInfoByIdxSlice.reducer,
  },
});
export default store;
