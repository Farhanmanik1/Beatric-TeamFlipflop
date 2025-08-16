import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../../types';
import { database } from '../../services/database';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
}

// Async thunks
export const saveUserToDatabase = createAsyncThunk(
  'auth/saveUserToDatabase',
  async (userData: User) => {
    await database.createOrUpdateUser(userData);
    return userData;
  }
);

export const loadUserFromDatabase = createAsyncThunk(
  'auth/loadUserFromDatabase',
  async (uid: string) => {
    const userData = await database.getUserProfile(uid);
    return userData;
  }
);

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setUser: (state, action: PayloadAction<User | null>) => {
      state.user = action.payload;
      state.isAuthenticated = !!action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Save user to database
      .addCase(saveUserToDatabase.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(saveUserToDatabase.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(saveUserToDatabase.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to save user data';
      })
      // Load user from database
      .addCase(loadUserFromDatabase.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loadUserFromDatabase.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload) {
          state.user = action.payload;
          state.isAuthenticated = true;
        }
      })
      .addCase(loadUserFromDatabase.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to load user data';
      });
  },
});

export const { setLoading, setUser, setError, logout } = authSlice.actions;
export default authSlice.reducer;
