import React from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { Button, Surface, Card, Title, Paragraph, Chip } from 'react-native-paper';
import { BeatricTheme } from '../utils/theme';
import { WORKOUT_TEMPLATES, getTemplatesByType } from '../data/workoutTemplates';
import { EXERCISES } from '../data/exercises';

const WorkoutScreen = ({ navigation }: any) => {
  return (
    <View style={styles.container}>
      {/* Fixed Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Beatric Workout</Text>
        <Text style={styles.subtitle}>Start your fitness journey</Text>
      </View>

      {/* Scrollable Content */}
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Quick Start Workout */}
        <Card style={styles.card}>
          <Card.Content>
            <Title style={styles.cardTitle}>Quick Start</Title>
            <Paragraph style={styles.cardText}>Begin a workout session with music and heart rate monitoring</Paragraph>
          </Card.Content>
          <Card.Actions>
            <Button 
              mode="contained" 
              onPress={() => navigation.navigate('WorkoutTemplates')}
              buttonColor={BeatricTheme.primary}
              textColor={BeatricTheme.textPrimary}
            >
              Start Workout
            </Button>
          </Card.Actions>
        </Card>

        {/* Exercise Library */}
        <Card style={styles.card}>
          <Card.Content>
            <Title style={styles.cardTitle}>Exercise Library</Title>
            <Paragraph style={styles.cardText}>Browse through gym, yoga, and cardio exercises</Paragraph>
            <View style={styles.statsRow}>
              <Chip mode="outlined" style={styles.statChip}>
                {EXERCISES.length} Exercises
              </Chip>
              <Chip mode="outlined" style={styles.statChip}>
                {WORKOUT_TEMPLATES.length} Templates
              </Chip>
            </View>
          </Card.Content>
          <Card.Actions>
            <Button 
              mode="outlined" 
              onPress={() => navigation.navigate('ExerciseLibrary')}
              textColor={BeatricTheme.primary}
              style={styles.outlinedButton}
            >
              Browse Exercises
            </Button>
          </Card.Actions>
        </Card>

        {/* Workout Templates */}
        <Card style={styles.card}>
          <Card.Content>
            <Title style={styles.cardTitle}>Workout Templates</Title>
            <Paragraph style={styles.cardText}>Choose from pre-designed workout routines</Paragraph>
            <View style={styles.templatePreview}>
              {getTemplatesByType('cardio').slice(0, 2).map((template) => (
                <Chip key={template.id} mode="outlined" style={styles.templateChip}>
                  {template.name}
                </Chip>
              ))}
            </View>
          </Card.Content>
          <Card.Actions>
            <Button 
              mode="outlined" 
              onPress={() => navigation.navigate('WorkoutTemplates')}
              textColor={BeatricTheme.primary}
              style={styles.outlinedButton}
            >
              View Templates
            </Button>
          </Card.Actions>
        </Card>

        {/* Workout History */}
        <Card style={styles.card}>
          <Card.Content>
            <Title style={styles.cardTitle}>Workout History</Title>
            <Paragraph style={styles.cardText}>View your previous workout sessions and progress</Paragraph>
          </Card.Content>
          <Card.Actions>
            <Button 
              mode="outlined" 
              onPress={() => navigation.navigate('WorkoutHistory')}
              textColor={BeatricTheme.primary}
              style={styles.outlinedButton}
            >
              View History
            </Button>
          </Card.Actions>
        </Card>

        <Card style={styles.card}>
          <Card.Content>
            <Title style={styles.cardTitle}>🎵 Music Controls</Title>
            <Paragraph style={styles.cardText}>Control your workout music with Spotify</Paragraph>
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

        <Surface style={styles.statusCard}>
          <Text style={styles.statusTitle}>Phase 1.4 - Basic UI Framework</Text>
          <Text style={styles.status}>✅ Navigation Structure Created</Text>
          <Text style={styles.status}>✅ Bottom Tab Navigation</Text>
          <Text style={styles.status}>✅ Screen Layouts Ready</Text>
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
  statsRow: {
    flexDirection: 'row',
    marginTop: 12,
    gap: 8,
  },
  statChip: {
    backgroundColor: BeatricTheme.primary + '20',
  },
  templatePreview: {
    flexDirection: 'row',
    marginTop: 12,
    gap: 8,
  },
  templateChip: {
    backgroundColor: BeatricTheme.secondary + '20',
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

export default WorkoutScreen;
