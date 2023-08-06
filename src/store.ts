import { configureStore } from '@reduxjs/toolkit';
import postApi from 'services/postApi';

const store = configureStore({
  reducer: {
    postApi: postApi.reducer,
  },
  middleware: (gDM) => gDM().concat(postApi.middleware),
});
export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
