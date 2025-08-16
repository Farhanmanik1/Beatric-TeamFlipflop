import { Exercise } from '../data/exercises';

export interface WorkoutSet {
  id: string;
  exerciseId: string;
  reps?: number;
  weight?: number; // in kg
  duration?: number; // in seconds
  distance?: number; // in meters
  notes?: string;
  completed: boolean;
}

export interface WorkoutExercise {
  id: string;
  exercise: Exercise;
  sets: WorkoutSet[];
  order: number;
  restTime: number; // in seconds
  completed: boolean;
}

export interface WorkoutSession {
  id: string;
  userId: string;
  name: string;
  type: 'cardio' | 'strength' | 'yoga' | 'flexibility' | 'mixed';
  exercises: WorkoutExercise[];
  startTime: string; // ISO string
  endTime?: string; // ISO string
  duration?: number; // in minutes
  caloriesBurned?: number;
  notes?: string;
  status: 'planned' | 'in-progress' | 'completed' | 'cancelled';
  musicPlaylist?: string; // Spotify playlist URI
  heartRateData?: HeartRateReading[];
}

export interface HeartRateReading {
  id: string;
  workoutId: string;
  timestamp: string; // ISO string
  bpm: number;
  zone: 'rest' | 'warmup' | 'fat-burn' | 'cardio' | 'peak';
}

export interface WorkoutTemplate {
  id: string;
  name: string;
  description: string;
  type: 'cardio' | 'strength' | 'yoga' | 'flexibility' | 'mixed';
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  estimatedDuration: number; // in minutes
  exercises: {
    exerciseId: string;
    sets: number;
    reps?: number;
    weight?: number;
    duration?: number;
    restTime: number;
  }[];
  targetBPM?: { min: number; max: number };
  caloriesTarget?: number;
}

export interface WorkoutStats {
  totalWorkouts: number;
  totalDuration: number; // in minutes
  totalCalories: number;
  averageWorkoutDuration: number;
  favoriteExercise: string;
  mostFrequentType: string;
  weeklyProgress: {
    week: string;
    workouts: number;
    duration: number;
    calories: number;
  }[];
  monthlyProgress: {
    month: string;
    workouts: number;
    duration: number;
    calories: number;
  }[];
}

export interface ExerciseProgress {
  exerciseId: string;
  exerciseName: string;
  totalSessions: number;
  totalSets: number;
  totalReps: number;
  maxWeight: number;
  maxReps: number;
  averageWeight: number;
  averageReps: number;
  lastPerformed: string; // ISO string
  improvement: number; // percentage improvement
}

export interface MusicWorkoutData {
  workoutId: string;
  playlistUri: string;
  tracksPlayed: string[];
  totalPlayTime: number; // in seconds
  averageBPM: number;
  bpmMatches: number; // count of tracks that matched workout intensity
  favoriteGenres: string[];
  energyLevel: 'low' | 'medium' | 'high';
}
