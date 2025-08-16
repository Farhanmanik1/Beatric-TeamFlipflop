import { initializeApp } from 'firebase/app';
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import { getFirestore } from 'firebase/firestore';
import { getDatabase } from 'firebase/database';
import { getStorage } from 'firebase/storage';

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC_mv3EqlUytY8nuQT-vlNT0CS9kZbNkMg",
  authDomain: "smartworkoutapp-745e4.firebaseapp.com",
  projectId: "smartworkoutapp-745e4",
  storageBucket: "smartworkoutapp-745e4.firebasestorage.app",
  messagingSenderId: "525507846271",
  appId: "1:525507846271:web:1f188fd1738a5222db5f4a",
  measurementId: "G-RFQ6Q0T6XB",
  databaseURL: "https://smartworkoutapp-745e4-default-rtdb.firebaseio.com"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Auth with persistence
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});

export const db = getFirestore(app);
export const realtimeDb = getDatabase(app);
export const storage = getStorage(app);

export default app;
