import { auth } from '../config/firebase';
import { onAuthStateChanged } from 'firebase/auth';

export const testAuthConnection = () => {
  return new Promise((resolve, reject) => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      unsubscribe();
      if (user) {
        console.log('✅ Auth connection successful - User logged in:', user.email);
        resolve(user);
      } else {
        console.log('✅ Auth connection successful - No user logged in');
        resolve(null);
      }
    }, (error) => {
      console.error('❌ Auth connection failed:', error);
      reject(error);
    });
  });
};
