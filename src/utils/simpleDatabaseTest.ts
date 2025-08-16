/**
 * Simple Database Test
 * Basic test to check Firebase Firestore connectivity
 */

import { db } from '../config/firebase';
import { doc, setDoc, getDoc } from 'firebase/firestore';

export const simpleDatabaseTest = async (uid: string) => {
  try {
    console.log('🧪 Simple database test starting...');
    
    // Test 1: Try to write a simple document
    console.log('📝 Test 1: Writing test document...');
    const testDocRef = doc(db, 'test', uid);
    await setDoc(testDocRef, {
      test: true,
      timestamp: new Date().toISOString(),
      message: 'Database connection test'
    });
    console.log('✅ Test document written successfully');
    
    // Test 2: Try to read the document back
    console.log('📖 Test 2: Reading test document...');
    const docSnap = await getDoc(testDocRef);
    if (docSnap.exists()) {
      console.log('✅ Test document read successfully:', docSnap.data());
    } else {
      console.log('❌ Test document not found');
    }
    
    console.log('🎉 Simple database test passed!');
    return true;
    
  } catch (error) {
    console.error('❌ Simple database test failed:', error);
    return false;
  }
};
