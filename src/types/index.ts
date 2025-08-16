// User Types
export interface User {
  uid: string;
  email: string | null;
  displayName: string;
  age?: number;
  weight?: number;
  height?: number;
  fitnessLevel?: 'beginner' | 'intermediate' | 'advanced';
  createdAt: string; // ISO string instead of Date
  updatedAt: string; // ISO string instead of Date
  lastLogin: string; // ISO string instead of Date
  profileImageUrl?: string;
}

export interface UserPreferences {
  userId: string;
  spotifyPlaylistId?: string;
  autoMusicEnabled: boolean;
  heartRateAlertsEnabled: boolean;
  maxHeartRateThreshold: number;
  minHeartRateThreshold: number;
  motivationalQuotesEnabled: boolean;
  preferredGenres: string[];
  workoutIntensity: 'low' | 'medium' | 'high';
  musicVolume: number;
}

// Workout Types
export interface Workout {
  workoutId: string;
  userId: string;
  exerciseType: string;
  startTime: string; // ISO string instead of Date
  endTime?: string; // ISO string instead of Date
  duration: number;
  avgHeartRate: number;
  maxHeartRate: number;
  minHeartRate: number;
  caloriesBurned: number;
  status: 'active' | 'completed' | 'paused';
  notes?: string;
}

export interface HeartRateReading {
  readingId: string;
  workoutId: string;
  userId: string;
  heartRate: number;
  timestamp: string; // ISO string instead of Date
  songPlayingId?: string;
  zone: 'rest' | 'light' | 'moderate' | 'high';
  location?: string;
}

// Music Types
export interface Song {
  songId: string;
  spotifyId: string;
  title: string;
  artist: string;
  album: string;
  bpm: number;
  genre: string;
  duration: number;
  energyLevel: number;
  valence: number;
  danceability: number;
  popularity: number;
}

export interface WorkoutSong {
  workoutId: string;
  songId: string;
  playedAt: string; // ISO string instead of Date
  userRating?: number;
  heartRateImpact?: number;
  skipCount: number;
  likeCount: number;
  playDuration: number;
}

// Exercise Types
export interface Exercise {
  exerciseId: string;
  name: string;
  category: 'gym' | 'yoga' | 'cardio';
  difficultyLevel: 'beginner' | 'intermediate' | 'advanced';
  description: string;
  muscleGroups: string[];
  equipmentNeeded: string[];
  instructions: string[];
  videoUrl?: string;
  imageUrl?: string;
  estimatedCalories: number;
}

export interface UserExerciseHistory {
  userId: string;
  exerciseId: string;
  workoutId: string;
  sets: number;
  reps: number;
  weight?: number;
  duration: number;
  date: string; // ISO string instead of Date
  performance: number;
  notes?: string;
}

// Quote Types
export interface MotivationalQuote {
  quoteId: string;
  quote: string;
  author: string;
  category: string;
  difficultyLevel: 'beginner' | 'intermediate' | 'advanced';
  language: string;
  tags: string[];
}

// Activity Types
export interface UserActivityLog {
  logId: string;
  userId: string;
  activityType: string;
  timestamp: string; // ISO string instead of Date
  duration: number;
  heartRateData: number[];
  location?: string;
  weather?: string;
  mood?: string;
}
