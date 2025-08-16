/**
 * Database Test Utility
 * Used to test Firebase Firestore connectivity and operations
 */

import { database } from '../services/database';
import { getCurrentDateISO } from './dateUtils';

export const testDatabaseConnection = async (uid: string) => {
  try {
    console.log('🧪 Testing database connection...');
    
    // Test 1: Save user data
    console.log('📝 Test 1: Saving user data...');
    await database.createOrUpdateUser({
      uid,
      email: 'test@example.com',
      displayName: 'Test User',
      createdAt: getCurrentDateISO(),
      updatedAt: getCurrentDateISO(),
      lastLogin: getCurrentDateISO(),
    });
    console.log('✅ User data saved successfully');
    
    // Test 2: Retrieve user data
    console.log('📖 Test 2: Retrieving user data...');
    const userData = await database.getUserProfile(uid);
    if (userData) {
      console.log('✅ User data retrieved successfully:', userData.displayName);
    } else {
      console.log('❌ User data not found');
    }
    
    // Test 3: Save a test workout
    console.log('💪 Test 3: Saving test workout...');
    const workoutId = await database.saveWorkout({
      userId: uid,
      type: 'cardio',
      duration: 1800, // 30 minutes
      caloriesBurned: 250,
      heartRateData: [],
      exercises: [],
      createdAt: getCurrentDateISO(),
      updatedAt: getCurrentDateISO(),
    });
    console.log('✅ Test workout saved with ID:', workoutId);
    
    // Test 4: Retrieve user workouts
    console.log('📊 Test 4: Retrieving user workouts...');
    const workouts = await database.getUserWorkouts(uid, 10);
    console.log('✅ Retrieved', workouts.length, 'workouts');
    
    // Test 5: Save heart rate reading
    console.log('❤️ Test 5: Saving heart rate reading...');
    const readingId = await database.saveHeartRateReading({
      userId: uid,
      workoutId,
      heartRate: 140,
      timestamp: getCurrentDateISO(),
    });
    console.log('✅ Heart rate reading saved with ID:', readingId);
    
    // Test 6: Get workout statistics
    console.log('📈 Test 6: Getting workout statistics...');
    const stats = await database.getUserWorkoutStats(uid);
    console.log('✅ Workout stats:', stats);
    
    console.log('🎉 All database tests passed!');
    return true;
    
  } catch (error) {
    console.error('❌ Database test failed:', error);
    return false;
  }
};

export const clearTestData = async (uid: string) => {
  try {
    console.log('🧹 Clearing test data...');
    
    // Get all user workouts
    const workouts = await database.getUserWorkouts(uid, 1000);
    
    // Delete each workout (this will cascade delete related data)
    for (const workout of workouts) {
      if (workout.type === 'cardio' && workout.duration === 1800) {
        await database.deleteWorkout(workout.id);
      }
    }
    
    console.log('✅ Test data cleared');
    return true;
  } catch (error) {
    console.error('❌ Failed to clear test data:', error);
    return false;
  }
};
