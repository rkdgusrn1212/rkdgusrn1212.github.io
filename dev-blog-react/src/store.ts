import { configureStore } from '@reduxjs/toolkit';
import { postInfoByIdxSlice } from './services/postInfoByIdxSlice';
import { useDispatch } from 'react-redux';
import postApi from 'services/postApi';

const store = configureStore({
  reducer: {
    postInfo: postInfoByIdxSlice.reducer,
    postApi: postApi.reducer,
  },
  middleware: (gDM) => gDM().concat(postApi.middleware),
});
export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
