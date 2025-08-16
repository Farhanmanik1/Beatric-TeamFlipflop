/**
 * Database Service for Beatric App
 * Handles all Firebase Firestore operations
 */

import { 
  collection, 
  doc, 
  setDoc, 
  getDoc, 
  getDocs, 
  updateDoc, 
  deleteDoc, 
  query, 
  where, 
  orderBy, 
  limit, 
  addDoc,
  serverTimestamp,
  Timestamp 
} from 'firebase/firestore';
import { db } from '../config/firebase';
import { User, Workout, HeartRateReading, WorkoutSong, UserExerciseHistory, UserActivityLog } from '../types';

// Collection names
const COLLECTIONS = {
  USERS: 'users',
  WORKOUTS: 'workouts',
  HEART_RATE_READINGS: 'heartRateReadings',
  WORKOUT_SONGS: 'workoutSongs',
  EXERCISE_HISTORY: 'exerciseHistory',
  ACTIVITY_LOGS: 'activityLogs',
  SPOTIFY_DATA: 'spotifyData'
};

export class DatabaseService {
  private static instance: DatabaseService;

  private constructor() {}

  public static getInstance(): DatabaseService {
    if (!DatabaseService.instance) {
      DatabaseService.instance = new DatabaseService();
    }
    return DatabaseService.instance;
  }

  // ==================== USER OPERATIONS ====================

  /**
   * Create or update user profile
   */
  async createOrUpdateUser(userData: User): Promise<void> {
    try {
      const userRef = doc(db, COLLECTIONS.USERS, userData.uid);
      await setDoc(userRef, {
        ...userData,
        updatedAt: new Date().toISOString()
      }, { merge: true });
      console.log('User data saved successfully');
    } catch (error) {
      console.error('Error saving user data:', error);
      throw error;
    }
  }

  /**
   * Get user profile by UID
   */
  async getUserProfile(uid: string): Promise<User | null> {
    try {
      const userRef = doc(db, COLLECTIONS.USERS, uid);
      const userSnap = await getDoc(userRef);
      
      if (userSnap.exists()) {
        return userSnap.data() as User;
      }
      return null;
    } catch (error) {
      console.error('Error getting user profile:', error);
      throw error;
    }
  }

  /**
   * Update user profile fields
   */
  async updateUserProfile(uid: string, updates: Partial<User>): Promise<void> {
    try {
      const userRef = doc(db, COLLECTIONS.USERS, uid);
      await updateDoc(userRef, {
        ...updates,
        updatedAt: new Date().toISOString()
      });
      console.log('User profile updated successfully');
    } catch (error) {
      console.error('Error updating user profile:', error);
      throw error;
    }
  }

  // ==================== WORKOUT OPERATIONS ====================

  /**
   * Save a new workout
   */
  async saveWorkout(workout: Omit<Workout, 'id'>): Promise<string> {
    try {
      const workoutData = {
        ...workout,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      
      const workoutRef = await addDoc(collection(db, COLLECTIONS.WORKOUTS), workoutData);
      console.log('Workout saved successfully with ID:', workoutRef.id);
      return workoutRef.id;
    } catch (error) {
      console.error('Error saving workout:', error);
      throw error;
    }
  }

  /**
   * Get user's workouts
   */
  async getUserWorkouts(uid: string, limitCount: number = 20): Promise<Workout[]> {
    try {
      const workoutsRef = collection(db, COLLECTIONS.WORKOUTS);
      const q = query(
        workoutsRef,
        where('userId', '==', uid),
        orderBy('createdAt', 'desc'),
        limit(limitCount)
      );
      
      const querySnapshot = await getDocs(q);
      const workouts: Workout[] = [];
      
      querySnapshot.forEach((doc) => {
        workouts.push({
          id: doc.id,
          ...doc.data()
        } as Workout);
      });
      
      return workouts;
    } catch (error) {
      console.error('Error getting user workouts:', error);
      throw error;
    }
  }

  /**
   * Update workout
   */
  async updateWorkout(workoutId: string, updates: Partial<Workout>): Promise<void> {
    try {
      const workoutRef = doc(db, COLLECTIONS.WORKOUTS, workoutId);
      await updateDoc(workoutRef, {
        ...updates,
        updatedAt: new Date().toISOString()
      });
      console.log('Workout updated successfully');
    } catch (error) {
      console.error('Error updating workout:', error);
      throw error;
    }
  }

  /**
   * Delete workout
   */
  async deleteWorkout(workoutId: string): Promise<void> {
    try {
      const workoutRef = doc(db, COLLECTIONS.WORKOUTS, workoutId);
      await deleteDoc(workoutRef);
      console.log('Workout deleted successfully');
    } catch (error) {
      console.error('Error deleting workout:', error);
      throw error;
    }
  }

  // ==================== HEART RATE OPERATIONS ====================

  /**
   * Save heart rate reading
   */
  async saveHeartRateReading(reading: Omit<HeartRateReading, 'id'>): Promise<string> {
    try {
      const readingData = {
        ...reading,
        createdAt: new Date().toISOString()
      };
      
      const readingRef = await addDoc(collection(db, COLLECTIONS.HEART_RATE_READINGS), readingData);
      console.log('Heart rate reading saved successfully');
      return readingRef.id;
    } catch (error) {
      console.error('Error saving heart rate reading:', error);
      throw error;
    }
  }

  /**
   * Get user's heart rate readings
   */
  async getUserHeartRateReadings(uid: string, limitCount: number = 100): Promise<HeartRateReading[]> {
    try {
      const readingsRef = collection(db, COLLECTIONS.HEART_RATE_READINGS);
      const q = query(
        readingsRef,
        where('userId', '==', uid),
        orderBy('createdAt', 'desc'),
        limit(limitCount)
      );
      
      const querySnapshot = await getDocs(q);
      const readings: HeartRateReading[] = [];
      
      querySnapshot.forEach((doc) => {
        readings.push({
          id: doc.id,
          ...doc.data()
        } as HeartRateReading);
      });
      
      return readings;
    } catch (error) {
      console.error('Error getting heart rate readings:', error);
      throw error;
    }
  }

  // ==================== WORKOUT SONGS OPERATIONS ====================

  /**
   * Save workout song
   */
  async saveWorkoutSong(song: Omit<WorkoutSong, 'id'>): Promise<string> {
    try {
      const songData = {
        ...song,
        createdAt: new Date().toISOString()
      };
      
      const songRef = await addDoc(collection(db, COLLECTIONS.WORKOUT_SONGS), songData);
      console.log('Workout song saved successfully');
      return songRef.id;
    } catch (error) {
      console.error('Error saving workout song:', error);
      throw error;
    }
  }

  /**
   * Get workout songs
   */
  async getWorkoutSongs(workoutId: string): Promise<WorkoutSong[]> {
    try {
      const songsRef = collection(db, COLLECTIONS.WORKOUT_SONGS);
      const q = query(
        songsRef,
        where('workoutId', '==', workoutId),
        orderBy('createdAt', 'asc')
      );
      
      const querySnapshot = await getDocs(q);
      const songs: WorkoutSong[] = [];
      
      querySnapshot.forEach((doc) => {
        songs.push({
          id: doc.id,
          ...doc.data()
        } as WorkoutSong);
      });
      
      return songs;
    } catch (error) {
      console.error('Error getting workout songs:', error);
      throw error;
    }
  }

  // ==================== EXERCISE HISTORY OPERATIONS ====================

  /**
   * Save exercise history
   */
  async saveExerciseHistory(history: Omit<UserExerciseHistory, 'id'>): Promise<string> {
    try {
      const historyData = {
        ...history,
        createdAt: new Date().toISOString()
      };
      
      const historyRef = await addDoc(collection(db, COLLECTIONS.EXERCISE_HISTORY), historyData);
      console.log('Exercise history saved successfully');
      return historyRef.id;
    } catch (error) {
      console.error('Error saving exercise history:', error);
      throw error;
    }
  }

  /**
   * Get user's exercise history
   */
  async getUserExerciseHistory(uid: string, limitCount: number = 50): Promise<UserExerciseHistory[]> {
    try {
      const historyRef = collection(db, COLLECTIONS.EXERCISE_HISTORY);
      const q = query(
        historyRef,
        where('userId', '==', uid),
        orderBy('createdAt', 'desc'),
        limit(limitCount)
      );
      
      const querySnapshot = await getDocs(q);
      const history: UserExerciseHistory[] = [];
      
      querySnapshot.forEach((doc) => {
        history.push({
          id: doc.id,
          ...doc.data()
        } as UserExerciseHistory);
      });
      
      return history;
    } catch (error) {
      console.error('Error getting exercise history:', error);
      throw error;
    }
  }

  // ==================== ACTIVITY LOGS OPERATIONS ====================

  /**
   * Save activity log
   */
  async saveActivityLog(log: Omit<UserActivityLog, 'id'>): Promise<string> {
    try {
      const logData = {
        ...log,
        createdAt: new Date().toISOString()
      };
      
      const logRef = await addDoc(collection(db, COLLECTIONS.ACTIVITY_LOGS), logData);
      console.log('Activity log saved successfully');
      return logRef.id;
    } catch (error) {
      console.error('Error saving activity log:', error);
      throw error;
    }
  }

  /**
   * Get user's activity logs
   */
  async getUserActivityLogs(uid: string, limitCount: number = 100): Promise<UserActivityLog[]> {
    try {
      const logsRef = collection(db, COLLECTIONS.ACTIVITY_LOGS);
      const q = query(
        logsRef,
        where('userId', '==', uid),
        orderBy('createdAt', 'desc'),
        limit(limitCount)
      );
      
      const querySnapshot = await getDocs(q);
      const logs: UserActivityLog[] = [];
      
      querySnapshot.forEach((doc) => {
        logs.push({
          id: doc.id,
          ...doc.data()
        } as UserActivityLog);
      });
      
      return logs;
    } catch (error) {
      console.error('Error getting activity logs:', error);
      throw error;
    }
  }

  // ==================== SPOTIFY DATA OPERATIONS ====================

  /**
   * Save Spotify user data
   */
  async saveSpotifyUserData(uid: string, spotifyData: any): Promise<void> {
    try {
      const spotifyRef = doc(db, COLLECTIONS.SPOTIFY_DATA, uid);
      await setDoc(spotifyRef, {
        ...spotifyData,
        updatedAt: new Date().toISOString()
      }, { merge: true });
      console.log('Spotify data saved successfully');
    } catch (error) {
      console.error('Error saving Spotify data:', error);
      throw error;
    }
  }

  /**
   * Get Spotify user data
   */
  async getSpotifyUserData(uid: string): Promise<any | null> {
    try {
      const spotifyRef = doc(db, COLLECTIONS.SPOTIFY_DATA, uid);
      const spotifySnap = await getDoc(spotifyRef);
      
      if (spotifySnap.exists()) {
        return spotifySnap.data();
      }
      return null;
    } catch (error) {
      console.error('Error getting Spotify data:', error);
      throw error;
    }
  }

  // ==================== ANALYTICS OPERATIONS ====================

  /**
   * Get workout statistics for user
   */
  async getUserWorkoutStats(uid: string): Promise<{
    totalWorkouts: number;
    totalDuration: number;
    averageHeartRate: number;
    favoriteWorkoutType: string;
  }> {
    try {
      const workouts = await this.getUserWorkouts(uid, 1000);
      const heartRateReadings = await this.getUserHeartRateReadings(uid, 1000);
      
      const totalWorkouts = workouts.length;
      const totalDuration = workouts.reduce((sum, workout) => sum + (workout.duration || 0), 0);
      
      const averageHeartRate = heartRateReadings.length > 0 
        ? heartRateReadings.reduce((sum, reading) => sum + reading.heartRate, 0) / heartRateReadings.length
        : 0;
      
      // Find favorite workout type
      const workoutTypes = workouts.map(w => w.type);
      const typeCounts = workoutTypes.reduce((acc, type) => {
        acc[type] = (acc[type] || 0) + 1;
        return acc;
      }, {} as Record<string, number>);
      
      const favoriteWorkoutType = Object.keys(typeCounts).reduce((a, b) => 
        typeCounts[a] > typeCounts[b] ? a : b, 'cardio'
      );
      
      return {
        totalWorkouts,
        totalDuration,
        averageHeartRate: Math.round(averageHeartRate),
        favoriteWorkoutType
      };
    } catch (error) {
      console.error('Error getting workout stats:', error);
      throw error;
    }
  }
}

// Export singleton instance
export const database = DatabaseService.getInstance();
