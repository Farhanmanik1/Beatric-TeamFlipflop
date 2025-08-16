import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text, Card, Title, Paragraph, Button, IconButton, Chip } from 'react-native-paper';
import { BeatricTheme } from '../utils/theme';
import { WorkoutTemplate } from '../data/workoutTemplates';
import { getExerciseById } from '../data/exercises';

const TemplateDetailScreen = ({ route, navigation }: any) => {
  const { template }: { template: WorkoutTemplate } = route.params;

  const getExercisesWithDetails = () => {
    return template.exercises.map(ex => ({
      ...ex,
      exercise: getExerciseById(ex.exerciseId)
    })).filter(item => item.exercise);
  };

  const exercises = getExercisesWithDetails();

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner':
        return BeatricTheme.success;
      case 'intermediate':
        return BeatricTheme.warning;
      case 'advanced':
        return BeatricTheme.error;
      default:
        return BeatricTheme.primary;
    }
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
          <Text style={styles.title}>{template.name}</Text>
          <Text style={styles.subtitle}>
            {template.type.charAt(0).toUpperCase() + template.type.slice(1)} • {template.difficulty}
          </Text>
        </View>
      </View>

      <ScrollView style={styles.content}>
        {/* Template Overview */}
        <Card style={styles.card}>
          <Card.Content>
            <Title style={styles.cardTitle}>Template Overview</Title>
            <Paragraph style={styles.description}>{template.description}</Paragraph>

            {/* Stats Row */}
            <View style={styles.statsRow}>
              <View style={styles.stat}>
                <Text style={styles.statLabel}>Duration</Text>
                <Text style={styles.statValue}>{template.estimatedDuration} min</Text>
              </View>
              <View style={styles.stat}>
                <Text style={styles.statLabel}>Exercises</Text>
                <Text style={styles.statValue}>{exercises.length}</Text>
              </View>
              {template.caloriesTarget && (
                <View style={styles.stat}>
                  <Text style={styles.statLabel}>Calories</Text>
                  <Text style={styles.statValue}>~{template.caloriesTarget}</Text>
                </View>
              )}
            </View>

            {/* Difficulty */}
            <View style={styles.difficultySection}>
              <Text style={styles.difficultyLabel}>Difficulty Level:</Text>
              <Chip
                mode="outlined"
                style={[styles.difficultyChip, { borderColor: getDifficultyColor(template.difficulty) }]}
                textStyle={[styles.difficultyText, { color: getDifficultyColor(template.difficulty) }]}
              >
                {template.difficulty.charAt(0).toUpperCase() + template.difficulty.slice(1)}
              </Chip>
            </View>

            {/* BPM Target */}
            {template.targetBPM && (
              <View style={styles.bpmSection}>
                <Text style={styles.bpmLabel}>Target BPM Range:</Text>
                <Text style={styles.bpmValue}>{template.targetBPM.min} - {template.targetBPM.max} BPM</Text>
              </View>
            )}
          </Card.Content>
        </Card>

        {/* Exercise Details */}
        <Card style={styles.card}>
          <Card.Content>
            <Title style={styles.cardTitle}>Exercise Breakdown</Title>
            {exercises.map((item, index) => (
              <View key={index} style={styles.exerciseItem}>
                <View style={styles.exerciseHeader}>
                  <View style={styles.exerciseInfo}>
                    <Text style={styles.exerciseName}>
                      {index + 1}. {item.exercise?.name}
                    </Text>
                    <Text style={styles.exerciseCategory}>
                      {item.exercise?.category} • {item.exercise?.difficulty}
                    </Text>
                  </View>
                  <Chip mode="outlined" style={styles.setsChip}>
                    {item.sets} sets
                  </Chip>
                </View>

                <Paragraph style={styles.exerciseDescription}>
                  {item.exercise?.description}
                </Paragraph>

                {/* Exercise Details */}
                <View style={styles.exerciseDetails}>
                  {item.reps && (
                    <View style={styles.detailItem}>
                      <Text style={styles.detailLabel}>Reps:</Text>
                      <Text style={styles.detailValue}>{item.reps}</Text>
                    </View>
                  )}
                  {item.duration && (
                    <View style={styles.detailItem}>
                      <Text style={styles.detailLabel}>Duration:</Text>
                      <Text style={styles.detailValue}>{Math.floor(item.duration / 60)} min</Text>
                    </View>
                  )}
                  <View style={styles.detailItem}>
                    <Text style={styles.detailLabel}>Rest:</Text>
                    <Text style={styles.detailValue}>{item.restTime} sec</Text>
                  </View>
                </View>

                {/* Muscle Groups */}
                <View style={styles.muscleGroups}>
                  <Text style={styles.muscleLabel}>Muscle Groups:</Text>
                  <View style={styles.muscleChips}>
                    {item.exercise?.muscleGroups.slice(0, 3).map((muscle, muscleIndex) => (
                      <Chip
                        key={muscleIndex}
                        mode="outlined"
                        compact
                        style={styles.muscleChip}
                        textStyle={styles.muscleChipText}
                      >
                        {muscle}
                      </Chip>
                    ))}
                  </View>
                </View>

                {index < exercises.length - 1 && <View style={styles.divider} />}
              </View>
            ))}
          </Card.Content>
        </Card>

        {/* Benefits */}
        <Card style={styles.card}>
          <Card.Content>
            <Title style={styles.cardTitle}>Workout Benefits</Title>
            <View style={styles.benefitsList}>
              <View style={styles.benefitItem}>
                <Text style={styles.benefitBullet}>•</Text>
                <Text style={styles.benefitText}>Improves overall fitness and endurance</Text>
              </View>
              <View style={styles.benefitItem}>
                <Text style={styles.benefitBullet}>•</Text>
                <Text style={styles.benefitText}>Builds strength and muscle tone</Text>
              </View>
              <View style={styles.benefitItem}>
                <Text style={styles.benefitBullet}>•</Text>
                <Text style={styles.benefitText}>Enhances cardiovascular health</Text>
              </View>
              <View style={styles.benefitItem}>
                <Text style={styles.benefitBullet}>•</Text>
                <Text style={styles.benefitText}>Burns calories and promotes weight loss</Text>
              </View>
              <View style={styles.benefitItem}>
                <Text style={styles.benefitBullet}>•</Text>
                <Text style={styles.benefitText}>Reduces stress and improves mood</Text>
              </View>
            </View>
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
            Back to Templates
          </Button>
          <Button
            mode="contained"
            onPress={() => navigation.navigate('StartWorkout', { template })}
            buttonColor={BeatricTheme.primary}
            textColor={BeatricTheme.textPrimary}
            style={styles.actionButton}
          >
            Start This Workout
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
  cardTitle: {
    fontSize: 18,
    color: BeatricTheme.textPrimary,
    marginBottom: 12,
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
  difficultySection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  difficultyLabel: {
    fontSize: 14,
    color: BeatricTheme.textSecondary,
    marginRight: 8,
  },
  difficultyChip: {
    backgroundColor: 'transparent',
  },
  difficultyText: {
    fontSize: 12,
    fontWeight: 'bold',
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
    marginBottom: 16,
  },
  exerciseHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
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
  exerciseCategory: {
    fontSize: 14,
    color: BeatricTheme.textSecondary,
  },
  setsChip: {
    backgroundColor: BeatricTheme.primary + '20',
  },
  exerciseDescription: {
    fontSize: 14,
    color: BeatricTheme.textSecondary,
    lineHeight: 20,
    marginBottom: 12,
  },
  exerciseDetails: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
    marginBottom: 12,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  detailLabel: {
    fontSize: 14,
    color: BeatricTheme.textSecondary,
    marginRight: 4,
  },
  detailValue: {
    fontSize: 14,
    fontWeight: 'bold',
    color: BeatricTheme.primary,
  },
  muscleGroups: {
    marginBottom: 8,
  },
  muscleLabel: {
    fontSize: 14,
    color: BeatricTheme.textSecondary,
    marginBottom: 6,
  },
  muscleChips: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  muscleChip: {
    backgroundColor: BeatricTheme.primary + '20',
  },
  muscleChipText: {
    fontSize: 12,
    color: BeatricTheme.primary,
  },
  divider: {
    height: 1,
    backgroundColor: BeatricTheme.border,
    marginTop: 16,
  },
  benefitsList: {
    gap: 8,
  },
  benefitItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  benefitBullet: {
    fontSize: 16,
    color: BeatricTheme.primary,
    marginRight: 8,
    marginTop: 2,
  },
  benefitText: {
    flex: 1,
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

export default TemplateDetailScreen;
