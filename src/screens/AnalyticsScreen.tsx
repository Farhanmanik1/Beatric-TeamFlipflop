import React from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { Button, Surface, Card, Title, Paragraph } from 'react-native-paper';
import { BeatricTheme } from '../utils/theme';

const AnalyticsScreen = () => {
  return (
    <View style={styles.container}>
      {/* Fixed Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Beatric Analytics</Text>
        <Text style={styles.subtitle}>Track your fitness progress</Text>
      </View>

      {/* Scrollable Content */}
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Card style={styles.card}>
          <Card.Content>
            <Title style={styles.cardTitle}>Workout Statistics</Title>
            <Paragraph style={styles.cardText}>View detailed analytics of your workout sessions</Paragraph>
          </Card.Content>
          <Card.Actions>
            <Button 
              mode="contained" 
              disabled
              buttonColor={BeatricTheme.primary}
              textColor={BeatricTheme.textPrimary}
            >
              View Stats (Coming Soon)
            </Button>
          </Card.Actions>
        </Card>

        <Card style={styles.card}>
          <Card.Content>
            <Title style={styles.cardTitle}>Heart Rate Analysis</Title>
            <Paragraph style={styles.cardText}>Monitor your heart rate patterns and zones</Paragraph>
          </Card.Content>
          <Card.Actions>
            <Button 
              mode="outlined" 
              disabled
              textColor={BeatricTheme.primary}
              style={styles.outlinedButton}
            >
              View Analysis (Coming Soon)
            </Button>
          </Card.Actions>
        </Card>

        <Card style={styles.card}>
          <Card.Content>
            <Title style={styles.cardTitle}>Music Preferences</Title>
            <Paragraph style={styles.cardText}>Analyze your music choices during workouts</Paragraph>
          </Card.Content>
          <Card.Actions>
            <Button 
              mode="outlined" 
              disabled
              textColor={BeatricTheme.primary}
              style={styles.outlinedButton}
            >
              View Preferences (Coming Soon)
            </Button>
          </Card.Actions>
        </Card>

        <Surface style={styles.statusCard}>
          <Text style={styles.statusTitle}>Phase 1.4 - Basic UI Framework</Text>
          <Text style={styles.status}>✅ Analytics Screen Layout</Text>
          <Text style={styles.status}>✅ Data Visualization Ready</Text>
          <Text style={styles.status}>✅ Chart Components Planned</Text>
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

export default AnalyticsScreen;
