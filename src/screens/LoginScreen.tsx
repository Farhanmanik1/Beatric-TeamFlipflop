import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import {
  TextInput,
  Button,
  Text,
  Surface,
  useTheme,
} from 'react-native-paper';
import { useDispatch } from 'react-redux';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../config/firebase';
import { setUser } from '../store/slices/authSlice';
import { getCurrentDateISO } from '../utils/dateUtils';
import { BeatricTheme } from '../utils/theme';

const LoginScreen = ({ navigation }: any) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const theme = useTheme();
  
  const dispatch = useDispatch();

  const handleLogin = async () => {
    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      
      dispatch(setUser({
        uid: user.uid,
        email: user.email,
        displayName: user.displayName || 'User',
        createdAt: getCurrentDateISO(),
        updatedAt: getCurrentDateISO(),
        lastLogin: getCurrentDateISO(),
      }));
      
      // Navigation will happen automatically via conditional rendering
      // No need to manually navigate
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Surface style={styles.surface}>
          <Text style={styles.title}>Beatric</Text>
          <Text style={styles.subtitle}>Sign in to continue</Text>

          {error ? (
            <Text style={styles.error}>{error}</Text>
          ) : null}

          <TextInput
            label="Email"
            value={email}
            onChangeText={setEmail}
            mode="outlined"
            style={styles.input}
            keyboardType="email-address"
            autoCapitalize="none"
            theme={{
              colors: {
                primary: BeatricTheme.primary,
                background: BeatricTheme.surface,
                surface: BeatricTheme.surface,
                onSurface: BeatricTheme.textPrimary,
                placeholder: BeatricTheme.textTertiary,
              },
            }}
          />

          <TextInput
            label="Password"
            value={password}
            onChangeText={setPassword}
            mode="outlined"
            style={styles.input}
            secureTextEntry
            theme={{
              colors: {
                primary: BeatricTheme.primary,
                background: BeatricTheme.surface,
                surface: BeatricTheme.surface,
                onSurface: BeatricTheme.textPrimary,
                placeholder: BeatricTheme.textTertiary,
              },
            }}
          />

          <Button
            mode="contained"
            onPress={handleLogin}
            style={styles.button}
            loading={loading}
            disabled={loading}
            buttonColor={BeatricTheme.primary}
            textColor={BeatricTheme.textPrimary}
          >
            Sign In
          </Button>

          <Button
            mode="text"
            onPress={() => navigation.navigate('Register')}
            style={styles.linkButton}
            textColor={BeatricTheme.primary}
          >
            Don't have an account? Sign up
          </Button>
        </Surface>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BeatricTheme.background,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 20,
  },
  surface: {
    padding: 20,
    borderRadius: 10,
    elevation: 4,
    backgroundColor: BeatricTheme.surface,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
    color: BeatricTheme.primary,
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 30,
    color: BeatricTheme.textSecondary,
  },
  input: {
    marginBottom: 15,
    backgroundColor: BeatricTheme.surfaceLight,
  },
  button: {
    marginTop: 10,
    marginBottom: 20,
    paddingVertical: 8,
  },
  linkButton: {
    marginTop: 10,
  },
  error: {
    color: BeatricTheme.error,
    textAlign: 'center',
    marginBottom: 15,
  },
});

export default LoginScreen;
