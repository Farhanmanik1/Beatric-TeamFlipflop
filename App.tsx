import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { Provider as PaperProvider, MD3DarkTheme } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider as StoreProvider, useSelector, useDispatch } from 'react-redux';
import { store, RootState } from './src/store';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './src/config/firebase';
import { setUser, logout, saveUserToDatabase, loadUserFromDatabase } from './src/store/slices/authSlice';
import { getCurrentDateISO } from './src/utils/dateUtils';
import { BeatricTheme } from './src/utils/theme';

// Import screens
import LoginScreen from './src/screens/LoginScreen';
import RegisterScreen from './src/screens/RegisterScreen';
import MainNavigator from './src/navigation/MainNavigator';

// Import Firebase config
import './src/config/firebase';

// Create stack navigator
const Stack = createStackNavigator();

// Custom Beatric theme for React Native Paper
const beatricPaperTheme = {
  ...MD3DarkTheme,
  colors: {
    ...MD3DarkTheme.colors,
    primary: BeatricTheme.primary,
    secondary: BeatricTheme.secondary,
    background: BeatricTheme.background,
    surface: BeatricTheme.surface,
    surfaceVariant: BeatricTheme.surfaceLight,
    onPrimary: BeatricTheme.textPrimary,
    onSecondary: BeatricTheme.textPrimary,
    onBackground: BeatricTheme.textPrimary,
    onSurface: BeatricTheme.textPrimary,
    onSurfaceVariant: BeatricTheme.textSecondary,
    outline: BeatricTheme.border,
    outlineVariant: BeatricTheme.borderLight,
  },
};

// Auth Navigator Component
const AuthNavigator = () => {
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);

  return (
    <Stack.Navigator 
      screenOptions={{ 
        headerShown: false,
        cardStyle: { backgroundColor: BeatricTheme.background }
      }}
    >
      {!isAuthenticated ? (
        <>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Register" component={RegisterScreen} />
        </>
      ) : (
        <Stack.Screen name="Main" component={MainNavigator} />
      )}
    </Stack.Navigator>
  );
};

// Main App Component
const AppContent = () => {
  const [initializing, setInitializing] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    console.log('Setting up auth listener...');
    
    // Add a timeout to prevent infinite loading
    const timeout = setTimeout(() => {
      console.log('Auth timeout, setting initializing to false');
      setInitializing(false);
    }, 5000);

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      console.log('Auth state changed:', user ? 'User logged in' : 'User logged out');
      clearTimeout(timeout);
      
      if (user) {
        // User is signed in
        console.log('User details:', user.email);
        // Try to load user from database first, then save if not found
        setTimeout(async () => {
          try {
            // Try to load existing user data from database
            const result = await dispatch(loadUserFromDatabase(user.uid)).unwrap();
            
            if (result) {
              // User exists in database, update last login
              dispatch(saveUserToDatabase({
                ...result,
                lastLogin: getCurrentDateISO(),
              }));
            } else {
              // New user, create in database
              dispatch(saveUserToDatabase({
                uid: user.uid,
                email: user.email || '',
                displayName: user.displayName || 'User',
                createdAt: getCurrentDateISO(),
                updatedAt: getCurrentDateISO(),
                lastLogin: getCurrentDateISO(),
              }));
            }
          } catch (error) {
            console.error('Error handling user data:', error);
            // Fallback to just setting user in Redux
            dispatch(setUser({
              uid: user.uid,
              email: user.email || '',
              displayName: user.displayName || 'User',
              createdAt: getCurrentDateISO(),
              updatedAt: getCurrentDateISO(),
              lastLogin: getCurrentDateISO(),
            }));
          }
        }, 100);
      } else {
        // User is signed out
        console.log('No user, logging out');
        dispatch(logout());
      }
      setInitializing(false);
    });

    return () => {
      clearTimeout(timeout);
      unsubscribe();
    };
  }, [dispatch]);

  if (initializing) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Loading Beatric...</Text>
      </View>
    );
  }

  return <AuthNavigator />;
};

export default function App() {
  return (
    <StoreProvider store={store}>
      <PaperProvider theme={beatricPaperTheme}>
        <NavigationContainer>
          <AppContent />
        </NavigationContainer>
        <StatusBar style="light" backgroundColor={BeatricTheme.background} />
      </PaperProvider>
    </StoreProvider>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    backgroundColor: BeatricTheme.background,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingText: {
    fontSize: 18,
    color: BeatricTheme.textPrimary,
    fontWeight: '600',
  },
});
