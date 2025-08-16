import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text, Card, Title, Paragraph, Chip, Button, IconButton, Divider } from 'react-native-paper';
import { BeatricTheme } from '../utils/theme';
import { Exercise } from '../data/exercises';

const ExerciseDetailScreen = ({ route, navigation }: any) => {
  const { exercise }: { exercise: Exercise } = route.params;

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
          <Text style={styles.title}>{exercise.name}</Text>
          <Text style={styles.subtitle}>
            {exercise.category.charAt(0).toUpperCase() + exercise.category.slice(1)} • {exercise.subcategory}
          </Text>
        </View>
      </View>

      <ScrollView style={styles.content}>
        {/* Exercise Overview */}
        <Card style={styles.card}>
          <Card.Content>
            <View style={styles.overviewHeader}>
              <Title style={styles.cardTitle}>Exercise Overview</Title>
              <Chip
                mode="outlined"
                style={[styles.difficultyChip, { borderColor: getDifficultyColor(exercise.difficulty) }]}
                textStyle={[styles.difficultyText, { color: getDifficultyColor(exercise.difficulty) }]}
              >
                {exercise.difficulty.charAt(0).toUpperCase() + exercise.difficulty.slice(1)}
              </Chip>
            </View>
            
            <Paragraph style={styles.description}>{exercise.description}</Paragraph>

            {/* Stats Row */}
            <View style={styles.statsRow}>
              {exercise.estimatedDuration && (
                <View style={styles.stat}>
                  <Text style={styles.statLabel}>Duration</Text>
                  <Text style={styles.statValue}>{exercise.estimatedDuration} min</Text>
                </View>
              )}
              {exercise.caloriesPerMinute && (
                <View style={styles.stat}>
                  <Text style={styles.statLabel}>Calories</Text>
                  <Text style={styles.statValue}>{exercise.caloriesPerMinute}/min</Text>
                </View>
              )}
              {exercise.bpmRange && (
                <View style={styles.stat}>
                  <Text style={styles.statLabel}>BPM Range</Text>
                  <Text style={styles.statValue}>{exercise.bpmRange.min}-{exercise.bpmRange.max}</Text>
                </View>
              )}
            </View>
          </Card.Content>
        </Card>

        {/* Muscle Groups */}
        <Card style={styles.card}>
          <Card.Content>
            <Title style={styles.cardTitle}>Muscle Groups</Title>
            <View style={styles.muscleGroups}>
              {exercise.muscleGroups.map((muscle, index) => (
                <Chip
                  key={index}
                  mode="outlined"
                  style={styles.muscleChip}
                  textStyle={styles.muscleChipText}
                >
                  {muscle}
                </Chip>
              ))}
            </View>
          </Card.Content>
        </Card>

        {/* Equipment */}
        {exercise.equipment.length > 0 && (
          <Card style={styles.card}>
            <Card.Content>
              <Title style={styles.cardTitle}>Equipment Needed</Title>
              <View style={styles.equipmentList}>
                {exercise.equipment.map((item, index) => (
                  <Chip
                    key={index}
                    mode="outlined"
                    style={styles.equipmentChip}
                    textStyle={styles.equipmentChipText}
                  >
                    {item}
                  </Chip>
                ))}
              </View>
            </Card.Content>
          </Card>
        )}

        {/* Instructions */}
        <Card style={styles.card}>
          <Card.Content>
            <Title style={styles.cardTitle}>How to Perform</Title>
            {exercise.instructions.map((instruction, index) => (
              <View key={index} style={styles.instructionItem}>
                <View style={styles.instructionNumber}>
                  <Text style={styles.instructionNumberText}>{index + 1}</Text>
                </View>
                <Text style={styles.instructionText}>{instruction}</Text>
              </View>
            ))}
          </Card.Content>
        </Card>

        {/* Benefits */}
        <Card style={styles.card}>
          <Card.Content>
            <Title style={styles.cardTitle}>Benefits</Title>
            {exercise.benefits.map((benefit, index) => (
              <View key={index} style={styles.benefitItem}>
                <Text style={styles.benefitBullet}>•</Text>
                <Text style={styles.benefitText}>{benefit}</Text>
              </View>
            ))}
          </Card.Content>
        </Card>

        {/* Action Buttons */}
        <View style={styles.actionButtons}>
          <Button
            mode="outlined"
            onPress={() => navigation.navigate('WorkoutTemplates')}
            textColor={BeatricTheme.primary}
            style={styles.actionButton}
          >
            Add to Workout
          </Button>
          <Button
            mode="contained"
            onPress={() => navigation.navigate('StartWorkout', { exercise })}
            buttonColor={BeatricTheme.primary}
            textColor={BeatricTheme.textPrimary}
            style={styles.actionButton}
          >
            Start Exercise
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
  cardTitle: {
    fontSize: 18,
    color: BeatricTheme.textPrimary,
    flex: 1,
  },
  difficultyChip: {
    backgroundColor: 'transparent',
  },
  difficultyText: {
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
  muscleGroups: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  muscleChip: {
    backgroundColor: BeatricTheme.primary + '20',
    marginBottom: 4,
  },
  muscleChipText: {
    fontSize: 12,
    color: BeatricTheme.primary,
  },
  equipmentList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  equipmentChip: {
    backgroundColor: BeatricTheme.secondary + '20',
    marginBottom: 4,
  },
  equipmentChipText: {
    fontSize: 12,
    color: BeatricTheme.secondary,
  },
  instructionItem: {
    flexDirection: 'row',
    marginBottom: 12,
    alignItems: 'flex-start',
  },
  instructionNumber: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: BeatricTheme.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
    marginTop: 2,
  },
  instructionNumberText: {
    color: BeatricTheme.textPrimary,
    fontSize: 12,
    fontWeight: 'bold',
  },
  instructionText: {
    flex: 1,
    fontSize: 16,
    color: BeatricTheme.textSecondary,
    lineHeight: 24,
  },
  benefitItem: {
    flexDirection: 'row',
    marginBottom: 8,
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

export default ExerciseDetailScreen;
