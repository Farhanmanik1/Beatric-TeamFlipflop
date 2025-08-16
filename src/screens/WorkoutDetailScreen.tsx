import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text, Card, Title, Paragraph, Button, IconButton, Chip } from 'react-native-paper';
import { BeatricTheme } from '../utils/theme';

const WorkoutDetailScreen = ({ route, navigation }: any) => {
  const { workout }: { workout: any } = route.params;

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'cardio':
        return BeatricTheme.error;
      case 'strength':
        return BeatricTheme.primary;
      case 'yoga':
        return BeatricTheme.success;
      case 'flexibility':
        return BeatricTheme.secondary;
      default:
        return BeatricTheme.textSecondary;
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
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
          <Text style={styles.title}>Workout Details</Text>
          <Text style={styles.subtitle}>{formatDate(workout.date)}</Text>
        </View>
      </View>

      <ScrollView style={styles.content}>
        {/* Workout Overview */}
        <Card style={styles.card}>
          <Card.Content>
            <View style={styles.overviewHeader}>
              <Title style={styles.workoutName}>{workout.name}</Title>
              <Chip
                mode="outlined"
                style={[styles.typeChip, { borderColor: getTypeColor(workout.type) }]}
                textStyle={[styles.typeChipText, { color: getTypeColor(workout.type) }]}
              >
                {workout.type.charAt(0).toUpperCase() + workout.type.slice(1)}
              </Chip>
            </View>
            
            <Paragraph style={styles.description}>
              Completed workout session with {workout.exercises} exercises
            </Paragraph>

            {/* Stats Row */}
            <View style={styles.statsRow}>
              <View style={styles.stat}>
                <Text style={styles.statLabel}>Duration</Text>
                <Text style={styles.statValue}>{workout.duration} min</Text>
              </View>
              <View style={styles.stat}>
                <Text style={styles.statLabel}>Calories</Text>
                <Text style={styles.statValue}>{workout.calories}</Text>
              </View>
              <View style={styles.stat}>
                <Text style={styles.statLabel}>Exercises</Text>
                <Text style={styles.statValue}>{workout.exercises}</Text>
              </View>
            </View>
          </Card.Content>
        </Card>

        {/* Performance Metrics */}
        <Card style={styles.card}>
          <Card.Content>
            <Title style={styles.cardTitle}>Performance Metrics</Title>
            
            <View style={styles.metricsGrid}>
              <View style={styles.metric}>
                <Text style={styles.metricLabel}>Average Heart Rate</Text>
                <Text style={styles.metricValue}>142 BPM</Text>
              </View>
              <View style={styles.metric}>
                <Text style={styles.metricLabel}>Peak Heart Rate</Text>
                <Text style={styles.metricValue}>168 BPM</Text>
              </View>
              <View style={styles.metric}>
                <Text style={styles.metricLabel}>Calories/Min</Text>
                <Text style={styles.metricValue}>{Math.round(workout.calories / workout.duration)}</Text>
              </View>
              <View style={styles.metric}>
                <Text style={styles.metricLabel}>Workout Score</Text>
                <Text style={styles.metricValue}>8.5/10</Text>
              </View>
            </View>
          </Card.Content>
        </Card>

        {/* Exercise Breakdown */}
        <Card style={styles.card}>
          <Card.Content>
            <Title style={styles.cardTitle}>Exercise Breakdown</Title>
            
            <View style={styles.exerciseList}>
              <View style={styles.exerciseItem}>
                <View style={styles.exerciseInfo}>
                  <Text style={styles.exerciseName}>Jumping Jacks</Text>
                  <Text style={styles.exerciseDetails}>3 sets • 30 reps</Text>
                </View>
                <Text style={styles.exerciseDuration}>5 min</Text>
              </View>
              
              <View style={styles.exerciseItem}>
                <View style={styles.exerciseInfo}>
                  <Text style={styles.exerciseName}>Push-ups</Text>
                  <Text style={styles.exerciseDetails}>3 sets • 15 reps</Text>
                </View>
                <Text style={styles.exerciseDuration}>8 min</Text>
              </View>
              
              <View style={styles.exerciseItem}>
                <View style={styles.exerciseInfo}>
                  <Text style={styles.exerciseName}>Squats</Text>
                  <Text style={styles.exerciseDetails}>3 sets • 20 reps</Text>
                </View>
                <Text style={styles.exerciseDuration}>7 min</Text>
              </View>
              
              <View style={styles.exerciseItem}>
                <View style={styles.exerciseInfo}>
                  <Text style={styles.exerciseName}>Plank</Text>
                  <Text style={styles.exerciseDetails}>3 sets • 30 sec</Text>
                </View>
                <Text style={styles.exerciseDuration}>5 min</Text>
              </View>
            </View>
          </Card.Content>
        </Card>

        {/* Achievements */}
        <Card style={styles.card}>
          <Card.Content>
            <Title style={styles.cardTitle}>Achievements</Title>
            
            <View style={styles.achievementsList}>
              <View style={styles.achievement}>
                <IconButton
                  icon="trophy"
                  size={20}
                  iconColor={BeatricTheme.primary}
                />
                <Text style={styles.achievementText}>Completed workout streak: 5 days</Text>
              </View>
              
              <View style={styles.achievement}>
                <IconButton
                  icon="fire"
                  size={20}
                  iconColor={BeatricTheme.error}
                />
                <Text style={styles.achievementText}>Burned 1000+ calories this week</Text>
              </View>
              
              <View style={styles.achievement}>
                <IconButton
                  icon="star"
                  size={20}
                  iconColor={BeatricTheme.warning}
                />
                <Text style={styles.achievementText}>Achieved personal best duration</Text>
              </View>
            </View>
          </Card.Content>
        </Card>

        {/* Notes */}
        <Card style={styles.card}>
          <Card.Content>
            <Title style={styles.cardTitle}>Workout Notes</Title>
            <Paragraph style={styles.notes}>
              Great session today! Felt strong throughout the workout. 
              The cardio intervals were challenging but manageable. 
              Need to focus on form during push-ups next time.
            </Paragraph>
          </Card.Content>
        </Card>

        {/* Action Buttons */}
        <View style={styles.actionButtons}>
          <Button
            mode="outlined"
            onPress={() => navigation.goBack()}
            textColor={BeatricTheme.primary}
            style={styles.actionButton}
          >
            Back to History
          </Button>
          <Button
            mode="contained"
            onPress={() => navigation.navigate('StartWorkout', { 
              template: { name: workout.name, type: workout.type } 
            })}
            buttonColor={BeatricTheme.primary}
            textColor={BeatricTheme.textPrimary}
            style={styles.actionButton}
          >
            Repeat Workout
          </Button>
        </View>
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
  overviewHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  workoutName: {
    fontSize: 20,
    color: BeatricTheme.textPrimary,
    flex: 1,
  },
  typeChip: {
    backgroundColor: 'transparent',
  },
  typeChipText: {
    fontSize: 12,
    fontWeight: 'bold',
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
  cardTitle: {
    fontSize: 18,
    color: BeatricTheme.textPrimary,
    marginBottom: 16,
  },
  metricsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  metric: {
    flex: 1,
    minWidth: '45%',
    alignItems: 'center',
    paddingVertical: 12,
    backgroundColor: BeatricTheme.background,
    borderRadius: 8,
  },
  metricLabel: {
    fontSize: 12,
    color: BeatricTheme.textSecondary,
    marginBottom: 4,
    textAlign: 'center',
  },
  metricValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: BeatricTheme.primary,
  },
  exerciseList: {
    gap: 12,
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
  exerciseDuration: {
    fontSize: 14,
    fontWeight: 'bold',
    color: BeatricTheme.primary,
  },
  achievementsList: {
    gap: 12,
  },
  achievement: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  achievementText: {
    flex: 1,
    fontSize: 14,
    color: BeatricTheme.textSecondary,
    marginLeft: 8,
  },
  notes: {
    fontSize: 16,
    color: BeatricTheme.textSecondary,
    lineHeight: 24,
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 20,
    marginBottom: 40,
  },
  actionButton: {
    flex: 1,
  },
});

export default WorkoutDetailScreen;
