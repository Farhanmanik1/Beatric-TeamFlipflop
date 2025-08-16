import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text, Card, Title, Paragraph, Button, IconButton, Chip, Surface } from 'react-native-paper';
import { BeatricTheme } from '../utils/theme';
import { WorkoutTemplate } from '../data/workoutTemplates';
import { Exercise, getExerciseById } from '../data/exercises';

const StartWorkoutScreen = ({ route, navigation }: any) => {
  const { template, exercise }: { template?: WorkoutTemplate; exercise?: Exercise } = route.params;
  const [selectedMusic, setSelectedMusic] = useState<string | null>(null);

  const workoutData = template || exercise;
  const isTemplate = !!template;

  const getWorkoutExercises = () => {
    if (template) {
      return template.exercises.map(ex => ({
        ...ex,
        exercise: getExerciseById(ex.exerciseId)
      })).filter(item => item.exercise);
    }
    return exercise ? [{ exercise, sets: 1, reps: 10, restTime: 60 }] : [];
  };

  const exercises = getWorkoutExercises();

  const handleStartWorkout = () => {
    // TODO: Implement actual workout session
    navigation.navigate('WorkoutSession', { 
      template, 
      exercise, 
      musicPlaylist: selectedMusic 
    });
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <IconButton
          icon="arrow-left"
          size={24}
          iconColor={BeatricTheme.primary}
          onPress={() => navigation.goBack()}
        />
        <View style={styles.headerContent}>
          <Text style={styles.title}>Start Workout</Text>
          <Text style={styles.subtitle}>
            {isTemplate ? 'Template Workout' : 'Individual Exercise'}
          </Text>
        </View>
      </View>

      <ScrollView style={styles.content}>
        {/* Workout Overview */}
        <Card style={styles.card}>
          <Card.Content>
            <Title style={styles.cardTitle}>
              {workoutData?.name || 'Custom Workout'}
            </Title>
            <Paragraph style={styles.description}>
              {workoutData?.description || 'Get ready to start your workout session!'}
            </Paragraph>

            {/* Workout Stats */}
            <View style={styles.statsRow}>
              <View style={styles.stat}>
                <Text style={styles.statLabel}>Duration</Text>
                <Text style={styles.statValue}>
                  {template?.estimatedDuration || exercise?.estimatedDuration || 20} min
                </Text>
              </View>
              <View style={styles.stat}>
                <Text style={styles.statLabel}>Exercises</Text>
                <Text style={styles.statValue}>{exercises.length}</Text>
              </View>
              {template?.caloriesTarget && (
                <View style={styles.stat}>
                  <Text style={styles.statLabel}>Calories</Text>
                  <Text style={styles.statValue}>~{template.caloriesTarget}</Text>
                </View>
              )}
            </View>

            {/* BPM Target */}
            {(template?.targetBPM || exercise?.bpmRange) && (
              <View style={styles.bpmSection}>
                <Text style={styles.bpmLabel}>Target BPM Range:</Text>
                <Text style={styles.bpmValue}>
                  {template?.targetBPM ? 
                    `${template.targetBPM.min} - ${template.targetBPM.max}` :
                    `${exercise?.bpmRange?.min} - ${exercise?.bpmRange?.max}`
                  } BPM
                </Text>
              </View>
            )}
          </Card.Content>
        </Card>

        {/* Exercise List */}
        <Card style={styles.card}>
          <Card.Content>
            <Title style={styles.cardTitle}>Exercises</Title>
            {exercises.map((item, index) => (
              <View key={index} style={styles.exerciseItem}>
                <View style={styles.exerciseInfo}>
                  <Text style={styles.exerciseName}>
                    {item.exercise?.name || 'Unknown Exercise'}
                  </Text>
                  <Text style={styles.exerciseDetails}>
                    {item.sets} sets • {item.reps || item.duration ? 
                      (item.reps ? `${item.reps} reps` : `${Math.floor((item.duration || 0) / 60)} min`) : 
                      'Custom'
                    }
                  </Text>
                </View>
                <Chip mode="outlined" style={styles.difficultyChip}>
                  {item.exercise?.difficulty || 'Custom'}
                </Chip>
              </View>
            ))}
          </Card.Content>
        </Card>

        {/* Music Selection */}
        <Card style={styles.card}>
          <Card.Content>
            <Title style={styles.cardTitle}>🎵 Music</Title>
            <Paragraph style={styles.description}>
              Choose music that matches your workout intensity
            </Paragraph>
            
            <View style={styles.musicOptions}>
              <Button
                mode={selectedMusic === 'high-energy' ? "contained" : "outlined"}
                onPress={() => setSelectedMusic('high-energy')}
                style={styles.musicButton}
                textColor={selectedMusic === 'high-energy' ? BeatricTheme.textPrimary : BeatricTheme.primary}
                buttonColor={selectedMusic === 'high-energy' ? BeatricTheme.primary : 'transparent'}
              >
                High Energy (140-180 BPM)
              </Button>
              
              <Button
                mode={selectedMusic === 'medium-energy' ? "contained" : "outlined"}
                onPress={() => setSelectedMusic('medium-energy')}
                style={styles.musicButton}
                textColor={selectedMusic === 'medium-energy' ? BeatricTheme.textPrimary : BeatricTheme.primary}
                buttonColor={selectedMusic === 'medium-energy' ? BeatricTheme.primary : 'transparent'}
              >
                Medium Energy (120-140 BPM)
              </Button>
              
              <Button
                mode={selectedMusic === 'low-energy' ? "contained" : "outlined"}
                onPress={() => setSelectedMusic('low-energy')}
                style={styles.musicButton}
                textColor={selectedMusic === 'low-energy' ? BeatricTheme.textPrimary : BeatricTheme.primary}
                buttonColor={selectedMusic === 'low-energy' ? BeatricTheme.primary : 'transparent'}
              >
                Low Energy (80-120 BPM)
              </Button>
              
              <Button
                mode={selectedMusic === 'spotify' ? "contained" : "outlined"}
                onPress={() => navigation.navigate('SpotifyAuth')}
                style={styles.musicButton}
                textColor={selectedMusic === 'spotify' ? BeatricTheme.textPrimary : BeatricTheme.secondary}
                buttonColor={selectedMusic === 'spotify' ? BeatricTheme.secondary : 'transparent'}
              >
                Connect Spotify
              </Button>
            </View>
          </Card.Content>
        </Card>

        {/* Preparation Tips */}
        <Card style={styles.card}>
          <Card.Content>
            <Title style={styles.cardTitle}>Preparation Tips</Title>
            <View style={styles.tipsList}>
              <View style={styles.tipItem}>
                <Text style={styles.tipBullet}>•</Text>
                <Text style={styles.tipText}>Warm up for 5-10 minutes before starting</Text>
              </View>
              <View style={styles.tipItem}>
                <Text style={styles.tipBullet}>•</Text>
                <Text style={styles.tipText}>Stay hydrated throughout your workout</Text>
              </View>
              <View style={styles.tipItem}>
                <Text style={styles.tipBullet}>•</Text>
                <Text style={styles.tipText}>Listen to your body and take breaks if needed</Text>
              </View>
              <View style={styles.tipItem}>
                <Text style={styles.tipBullet}>•</Text>
                <Text style={styles.tipText}>Focus on proper form over speed</Text>
              </View>
            </View>
          </Card.Content>
        </Card>

        {/* Start Button */}
        <Surface style={styles.startSection}>
          <Button
            mode="contained"
            onPress={handleStartWorkout}
            buttonColor={BeatricTheme.primary}
            textColor={BeatricTheme.textPrimary}
            style={styles.startButton}
            contentStyle={styles.startButtonContent}
          >
            <IconButton
              icon="play"
              size={24}
              iconColor={BeatricTheme.textPrimary}
            />
            <Text style={styles.startButtonText}>Start Workout</Text>
          </Button>
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
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 40,
    paddingBottom: 15,
    paddingHorizontal: 20,
    backgroundColor: BeatricTheme.surface,
    borderBottomWidth: 1,
    borderBottomColor: BeatricTheme.border,
    zIndex: 10,
    elevation: 3,
  },
  headerContent: {
    flex: 1,
    marginLeft: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: BeatricTheme.primary,
    marginBottom: 2,
  },
  subtitle: {
    fontSize: 14,
    color: BeatricTheme.textSecondary,
  },
  content: {
    flex: 1,
    padding: 20,
  },
  card: {
    marginBottom: 16,
    backgroundColor: BeatricTheme.surface,
    elevation: 2,
  },
  cardTitle: {
    fontSize: 18,
    color: BeatricTheme.textPrimary,
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
    color: BeatricTheme.textSecondary,
    lineHeight: 24,
    marginBottom: 16,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 12,
    backgroundColor: BeatricTheme.background,
    borderRadius: 8,
    marginBottom: 12,
  },
  stat: {
    alignItems: 'center',
  },
  statLabel: {
    fontSize: 12,
    color: BeatricTheme.textSecondary,
    marginBottom: 4,
  },
  statValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: BeatricTheme.primary,
  },
  bpmSection: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    backgroundColor: BeatricTheme.secondary + '20',
    borderRadius: 8,
    paddingHorizontal: 12,
  },
  bpmLabel: {
    fontSize: 14,
    color: BeatricTheme.textSecondary,
    marginRight: 8,
  },
  bpmValue: {
    fontSize: 14,
    fontWeight: 'bold',
    color: BeatricTheme.secondary,
  },
  exerciseItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: BeatricTheme.border,
  },
  exerciseInfo: {
    flex: 1,
  },
  exerciseName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: BeatricTheme.textPrimary,
    marginBottom: 4,
  },
  exerciseDetails: {
    fontSize: 14,
    color: BeatricTheme.textSecondary,
  },
  difficultyChip: {
    backgroundColor: BeatricTheme.primary + '20',
  },
  musicOptions: {
    gap: 12,
  },
  musicButton: {
    marginBottom: 8,
  },
  tipsList: {
    gap: 8,
  },
  tipItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  tipBullet: {
    fontSize: 16,
    color: BeatricTheme.primary,
    marginRight: 8,
    marginTop: 2,
  },
  tipText: {
    flex: 1,
    fontSize: 16,
    color: BeatricTheme.textSecondary,
    lineHeight: 24,
  },
  startSection: {
    padding: 20,
    marginTop: 20,
    marginBottom: 40,
    borderRadius: 12,
    backgroundColor: BeatricTheme.surface,
    elevation: 4,
  },
  startButton: {
    borderRadius: 8,
  },
  startButtonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
  },
  startButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 8,
  },
});

export default StartWorkoutScreen;
