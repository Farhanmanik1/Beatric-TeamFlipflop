import React from 'react';
import { StyleSheet, Text, View, ScrollView, Alert } from 'react-native';
import { Button, Surface, Avatar, Card, Title, Paragraph } from 'react-native-paper';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { BeatricTheme } from '../utils/theme';
import { testDatabaseConnection } from '../utils/databaseTest';
import { simpleDatabaseTest } from '../utils/simpleDatabaseTest';

const HomeScreen = ({ navigation }: any) => {
  const user = useSelector((state: RootState) => state.auth.user);

  const handleTestDatabase = async () => {
    if (!user?.uid) {
      Alert.alert('Error', 'User not logged in');
      return;
    }

    try {
      Alert.alert('Testing Database', 'Starting simple database connection test...');
      
      // First try simple test
      const simpleSuccess = await simpleDatabaseTest(user.uid);
      
      if (simpleSuccess) {
        Alert.alert('Success', 'Simple database test passed! Now trying full test...');
        
        // Then try full test
        const fullSuccess = await testDatabaseConnection(user.uid);
        
        if (fullSuccess) {
          Alert.alert('Success', 'All database tests passed! Check console for details.');
        } else {
          Alert.alert('Partial Success', 'Simple test passed but full test failed. Check console for details.');
        }
      } else {
        Alert.alert('Error', 'Simple database test failed. Check console for details.');
      }
    } catch (error) {
      Alert.alert('Error', 'Database test failed: ' + error);
    }
  };

  const handleTestSpotify = async () => {
    try {
      Alert.alert('Testing Spotify', 'Checking Spotify configuration...');
      
      // Check if Spotify credentials are set
      const { SPOTIFY_CONFIG } = require('../config/spotify');
      
      if (SPOTIFY_CONFIG.CLIENT_ID === '6bb3a9aa75f745ed927736f693db2a85') {
        Alert.alert('Spotify Issue', 'Spotify credentials are still using placeholder values. Please update them in src/config/spotify.ts');
      } else {
        Alert.alert('Spotify Config', 'Spotify credentials appear to be set. Try connecting to Spotify.');
      }
    } catch (error) {
      Alert.alert('Error', 'Spotify test failed: ' + error);
    }
  };

  return (
    <View style={styles.container}>
      {/* Fixed Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Beatric Dashboard</Text>
        <Text style={styles.subtitle}>Your fitness overview</Text>
      </View>

      {/* Scrollable Content */}
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Surface style={styles.welcomeCard}>
          <Avatar.Text
            size={50}
            label={user?.displayName?.charAt(0) || 'U'}
            style={[styles.avatar, { backgroundColor: BeatricTheme.primary }]}
            color={BeatricTheme.textPrimary}
          />
          <Text style={styles.welcomeText}>Welcome back, {user?.displayName}!</Text>
          <Text style={styles.userEmail}>{user?.email}</Text>
        </Surface>

        <Card style={styles.card}>
          <Card.Content>
            <Title style={styles.cardTitle}>Today's Summary</Title>
            <Paragraph style={styles.cardText}>No workouts completed today</Paragraph>
          </Card.Content>
          <Card.Actions>
            <Button
              mode="contained"
              disabled
              buttonColor={BeatricTheme.primary}
              textColor={BeatricTheme.textPrimary}
            >
              Start Workout (Coming Soon)
            </Button>
          </Card.Actions>
        </Card>

        <Card style={styles.card}>
          <Card.Content>
            <Title style={styles.cardTitle}>Quick Actions</Title>
            <Paragraph style={styles.cardText}>Access your most used features</Paragraph>
          </Card.Content>
          <Card.Actions>
            <Button
              mode="outlined"
              disabled
              textColor={BeatricTheme.primary}
              style={styles.outlinedButton}
            >
              View Progress (Coming Soon)
            </Button>
          </Card.Actions>
        </Card>

        <Card style={styles.card}>
          <Card.Content>
            <Title style={styles.cardTitle}>🎵 Music Integration</Title>
            <Paragraph style={styles.cardText}>Connect your Spotify account for personalized workout music</Paragraph>
          </Card.Content>
          <Card.Actions>
            <Button
              mode="contained"
              onPress={() => navigation.navigate('SpotifyAuth')}
              buttonColor={BeatricTheme.secondary}
              textColor={BeatricTheme.textPrimary}
            >
              Connect Spotify
            </Button>
          </Card.Actions>
        </Card>

        <Card style={styles.card}>
          <Card.Content>
            <Title style={styles.cardTitle}>🗄️ Database Test</Title>
            <Paragraph style={styles.cardText}>Test Firebase Firestore database connectivity and operations</Paragraph>
          </Card.Content>
          <Card.Actions>
            <Button
              mode="outlined"
              onPress={handleTestDatabase}
              textColor={BeatricTheme.primary}
              style={styles.outlinedButton}
            >
              Test Database
            </Button>
          </Card.Actions>
        </Card>

        <Card style={styles.card}>
          <Card.Content>
            <Title style={styles.cardTitle}>🎵 Spotify Test</Title>
            <Paragraph style={styles.cardText}>Check Spotify configuration and credentials</Paragraph>
          </Card.Content>
          <Card.Actions>
            <Button
              mode="outlined"
              onPress={handleTestSpotify}
              textColor={BeatricTheme.primary}
              style={styles.outlinedButton}
            >
              Test Spotify Config
            </Button>
          </Card.Actions>
        </Card>

        <Surface style={styles.statusCard}>
          <Text style={styles.statusTitle}>Phase 1.4 - Basic UI Framework</Text>
          <Text style={styles.status}>✅ Bottom Tab Navigation</Text>
          <Text style={styles.status}>✅ Dashboard Layout</Text>
          <Text style={styles.status}>✅ Screen Structure Complete</Text>
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
  welcomeCard: {
    padding: 20,
    marginBottom: 15,
    borderRadius: 10,
    elevation: 2,
    alignItems: 'center',
    backgroundColor: BeatricTheme.surface,
  },
  avatar: {
    marginBottom: 10,
  },
  welcomeText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: BeatricTheme.textPrimary,
    marginBottom: 5,
  },
  userEmail: {
    fontSize: 14,
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

export default HomeScreen;
