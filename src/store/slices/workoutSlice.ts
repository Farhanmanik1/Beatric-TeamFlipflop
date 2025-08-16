import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Workout, HeartRateReading } from '../../types';

interface WorkoutState {
  currentWorkout: Workout | null;
  heartRateReadings: HeartRateReading[];
  isWorkoutActive: boolean;
  loading: boolean;
  error: string | null;
}

const initialState: WorkoutState = {
  currentWorkout: null,
  heartRateReadings: [],
  isWorkoutActive: false,
  loading: false,
  error: null,
};

const workoutSlice = createSlice({
  name: 'workout',
  initialState,
  reducers: {
    setCurrentWorkout: (state, action: PayloadAction<Workout | null>) => {
      state.currentWorkout = action.payload;
      state.isWorkoutActive = !!action.payload;
    },
    addHeartRateReading: (state, action: PayloadAction<HeartRateReading>) => {
      state.heartRateReadings.push(action.payload);
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    clearWorkoutData: (state) => {
      state.currentWorkout = null;
      state.heartRateReadings = [];
      state.isWorkoutActive = false;
    },
  },
});

export const { 
  setCurrentWorkout, 
  addHeartRateReading, 
  setLoading, 
  setError, 
  clearWorkoutData 
} = workoutSlice.actions;
export default workoutSlice.reducer;
