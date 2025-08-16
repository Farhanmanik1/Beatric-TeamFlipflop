import React, { useState } from 'react';
import {
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
} from 'react-native-paper';
import { useDispatch } from 'react-redux';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth } from '../config/firebase';
import { setUser } from '../store/slices/authSlice';
import { getCurrentDateISO } from '../utils/dateUtils';
import { BeatricTheme } from '../utils/theme';

const RegisterScreen = ({ navigation }: any) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const dispatch = useDispatch();

  const handleRegister = async () => {
    if (!name || !email || !password || !confirmPassword) {
      setError('Please fill in all fields');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      
      // Update user profile with display name
      await updateProfile(user, {
        displayName: name,
      });
      
      dispatch(setUser({
        uid: user.uid,
        email: user.email,
        displayName: name,
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
          <Text style={styles.title}>Create Account</Text>
          <Text style={styles.subtitle}>Join Beatric</Text>

          {error ? (
            <Text style={styles.error}>{error}</Text>
          ) : null}

          <TextInput
            label="Full Name"
            value={name}
            onChangeText={setName}
            mode="outlined"
            style={styles.input}
            autoCapitalize="words"
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

          <TextInput
            label="Confirm Password"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
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
            onPress={handleRegister}
            style={styles.button}
            loading={loading}
            disabled={loading}
            buttonColor={BeatricTheme.primary}
            textColor={BeatricTheme.textPrimary}
          >
            Create Account
          </Button>

          <Button
            mode="text"
            onPress={() => navigation.navigate('Login')}
            style={styles.linkButton}
            textColor={BeatricTheme.primary}
          >
            Already have an account? Sign in
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
    fontSize: 28,
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

export default RegisterScreen;
