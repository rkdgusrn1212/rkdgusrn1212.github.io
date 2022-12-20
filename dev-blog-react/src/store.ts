import { configureStore } from '@reduxjs/toolkit';
import { postInfoByIdxSlice } from './services/postInfoByIdxSlice';
import { useDispatch } from 'react-redux';

export const useAppDispatch = () => useDispatch<typeof store.dispatch>();

const store = configureStore({
  reducer: {
    postInfo: postInfoByIdxSlice.reducer,
  },
});
export default store;
