import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import spotifyReducer from './slices/spotifySlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    spotify: spotifyReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
