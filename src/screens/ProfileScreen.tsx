import React from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { Button, Surface, Avatar, Card, Title, Paragraph } from 'react-native-paper';
import { useSelector, useDispatch } from 'react-redux';
import { signOut } from 'firebase/auth';
import { auth } from '../config/firebase';
import { logout } from '../store/slices/authSlice';
import { RootState } from '../store';
import { BeatricTheme } from '../utils/theme';

const ProfileScreen = ({ navigation }: any) => {
  const user = useSelector((state: RootState) => state.auth.user);
  const dispatch = useDispatch();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      dispatch(logout());
      navigation.replace('Login');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <View style={styles.container}>
      {/* Fixed Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Beatric Profile</Text>
        <Text style={styles.subtitle}>Manage your account</Text>
      </View>

      {/* Scrollable Content */}
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Surface style={styles.profileCard}>
          <Avatar.Text 
            size={80} 
            label={user?.displayName?.charAt(0) || 'U'} 
            style={[styles.avatar, { backgroundColor: BeatricTheme.primary }]}
            color={BeatricTheme.textPrimary}
          />
          <Text style={styles.userName}>{user?.displayName}</Text>
          <Text style={styles.userEmail}>{user?.email}</Text>
        </Surface>

        <Card style={styles.card}>
          <Card.Content>
            <Title style={styles.cardTitle}>Account Settings</Title>
            <Paragraph style={styles.cardText}>Manage your profile and preferences</Paragraph>
          </Card.Content>
          <Card.Actions>
            <Button 
              mode="outlined" 
              disabled
              textColor={BeatricTheme.primary}
              style={styles.outlinedButton}
            >
              Edit Profile (Coming Soon)
            </Button>
          </Card.Actions>
        </Card>

        <Card style={styles.card}>
          <Card.Content>
            <Title style={styles.cardTitle}>Preferences</Title>
            <Paragraph style={styles.cardText}>Customize your workout experience</Paragraph>
          </Card.Content>
          <Card.Actions>
            <Button 
              mode="outlined" 
              disabled
              textColor={BeatricTheme.primary}
              style={styles.outlinedButton}
            >
              Settings (Coming Soon)
            </Button>
          </Card.Actions>
        </Card>

        <Card style={styles.card}>
          <Card.Content>
            <Title style={styles.cardTitle}>Data & Privacy</Title>
            <Paragraph style={styles.cardText}>Manage your data and privacy settings</Paragraph>
          </Card.Content>
          <Card.Actions>
            <Button 
              mode="outlined" 
              disabled
              textColor={BeatricTheme.primary}
              style={styles.outlinedButton}
            >
              Privacy Settings (Coming Soon)
            </Button>
          </Card.Actions>
        </Card>

        <Button
          mode="contained"
          onPress={handleLogout}
          style={styles.logoutButton}
          buttonColor={BeatricTheme.error}
          textColor={BeatricTheme.textPrimary}
        >
          Sign Out
        </Button>

        <Surface style={styles.statusCard}>
          <Text style={styles.statusTitle}>Phase 1.4 - Basic UI Framework</Text>
          <Text style={styles.status}>✅ Profile Screen Layout</Text>
          <Text style={styles.status}>✅ User Authentication</Text>
          <Text style={styles.status}>✅ Logout Functionality</Text>
          <Text style={styles.next}>Next: Core Features & API Integrations</Text>
        </Surface>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BeatricTheme.background,
  },
  header: {
    paddingTop: 40, // bring header slightly down
    paddingBottom: 15,
    paddingHorizontal: 20,
    backgroundColor: BeatricTheme.surface,
    borderBottomWidth: 1,
    borderBottomColor: BeatricTheme.border,
    zIndex: 10,
    elevation: 3,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: BeatricTheme.primary,
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 16,
    color: BeatricTheme.textSecondary,
  },
  scrollContent: {
    padding: 20,
    paddingTop: 10, // so content doesn't overlap header
  },
  profileCard: {
    padding: 20,
    marginBottom: 15,
    borderRadius: 10,
    elevation: 2,
    alignItems: 'center',
    backgroundColor: BeatricTheme.surface,
  },
  avatar: {
    marginBottom: 15,
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: BeatricTheme.textPrimary,
    marginBottom: 5,
  },
  userEmail: {
    fontSize: 16,
    color: BeatricTheme.textSecondary,
  },
  card: {
    marginBottom: 15,
    elevation: 2,
    backgroundColor: BeatricTheme.surface,
  },
  cardTitle: {
    color: BeatricTheme.textPrimary,
  },
  cardText: {
    color: BeatricTheme.textSecondary,
  },
  outlinedButton: {
    borderColor: BeatricTheme.primary,
  },
  logoutButton: {
    marginTop: 10,
    marginBottom: 20,
    paddingVertical: 8,
  },
  statusCard: {
    padding: 20,
    marginTop: 20,
    borderRadius: 10,
    elevation: 2,
    backgroundColor: BeatricTheme.surface,
  },
  statusTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 15,
    color: BeatricTheme.primary,
  },
  status: {
    fontSize: 14,
    color: BeatricTheme.success,
    marginBottom: 5,
    textAlign: 'center',
  },
  next: {
    fontSize: 14,
    color: BeatricTheme.info,
    marginTop: 10,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default ProfileScreen;
