import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice'; // Import the authSlice reducer

const store = configureStore({
  reducer: {
    auth: authReducer, // Assign the auth reducer
  },
});

// Export types for usage in components
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
