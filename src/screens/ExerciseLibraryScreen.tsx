import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, FlatList } from 'react-native';
import { Text, Card, Title, Paragraph, Chip, Button, Searchbar, IconButton } from 'react-native-paper';
import { EXERCISES, getExercisesByCategory, getExercisesByDifficulty, getExercisesByMuscleGroup } from '../data/exercises';
import { Exercise } from '../data/exercises';
import { BeatricTheme } from '../utils/theme';

const ExerciseLibraryScreen = ({ navigation }: any) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedDifficulty, setSelectedDifficulty] = useState<string | null>(null);
  const [selectedMuscleGroup, setSelectedMuscleGroup] = useState<string | null>(null);

  const categories = ['cardio', 'strength', 'yoga', 'flexibility', 'balance'];
  const difficulties = ['beginner', 'intermediate', 'advanced'];
  const muscleGroups = ['Legs', 'Core', 'Chest', 'Back', 'Shoulders', 'Arms', 'Cardiovascular', 'Full Body'];

  const getFilteredExercises = (): Exercise[] => {
    let filtered = EXERCISES;

    if (selectedCategory) {
      filtered = filtered.filter(exercise => exercise.category === selectedCategory);
    }

    if (selectedDifficulty) {
      filtered = filtered.filter(exercise => exercise.difficulty === selectedDifficulty);
    }

    if (selectedMuscleGroup) {
      filtered = filtered.filter(exercise => 
        exercise.muscleGroups.some(muscle => 
          muscle.toLowerCase().includes(selectedMuscleGroup.toLowerCase())
        )
      );
    }

    if (searchQuery) {
      filtered = filtered.filter(exercise =>
        exercise.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        exercise.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        exercise.muscleGroups.some(muscle => 
          muscle.toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
    }

    return filtered;
  };

  const renderExerciseCard = ({ item }: { item: Exercise }) => (
    <Card style={styles.exerciseCard} onPress={() => navigation.navigate('ExerciseDetail', { exercise: item })}>
      <Card.Content>
        <View style={styles.exerciseHeader}>
          <View style={styles.exerciseInfo}>
            <Title style={styles.exerciseName}>{item.name}</Title>
            <Paragraph style={styles.exerciseCategory}>
              {item.category.charAt(0).toUpperCase() + item.category.slice(1)} • {item.difficulty}
            </Paragraph>
          </View>
          <IconButton
            icon="chevron-right"
            size={24}
            iconColor={BeatricTheme.primary}
          />
        </View>

        <Paragraph style={styles.exerciseDescription} numberOfLines={2}>
          {item.description}
        </Paragraph>

                 <View style={styles.exerciseTags}>
           {item.muscleGroups.slice(0, 2).map((muscle, index) => (
             <Chip
               key={index}
               mode="outlined"
               compact
               style={styles.muscleChip}
               textStyle={styles.chipText}
             >
               {muscle}
             </Chip>
           ))}
           {item.muscleGroups.length > 2 && (
             <Chip
               mode="outlined"
               compact
               style={styles.muscleChip}
               textStyle={styles.chipText}
             >
               +{item.muscleGroups.length - 2}
             </Chip>
           )}
         </View>

        <View style={styles.exerciseStats}>
          {item.estimatedDuration && (
            <View style={styles.stat}>
              <Text style={styles.statLabel}>Duration</Text>
              <Text style={styles.statValue}>{item.estimatedDuration} min</Text>
            </View>
          )}
          {item.caloriesPerMinute && (
            <View style={styles.stat}>
              <Text style={styles.statLabel}>Calories</Text>
              <Text style={styles.statValue}>{item.caloriesPerMinute}/min</Text>
            </View>
          )}
          {item.bpmRange && (
            <View style={styles.stat}>
              <Text style={styles.statLabel}>BPM</Text>
              <Text style={styles.statValue}>{item.bpmRange.min}-{item.bpmRange.max}</Text>
            </View>
          )}
        </View>
      </Card.Content>
    </Card>
  );

  const renderFilterChip = (
    items: string[],
    selectedItem: string | null,
    onSelect: (item: string | null) => void,
    label: string
  ) => (
    <View style={styles.filterSection}>
      <Text style={styles.filterLabel}>{label}</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filterScroll}>
        <Chip
          mode={selectedItem === null ? "flat" : "outlined"}
          selected={selectedItem === null}
          onPress={() => onSelect(null)}
          style={styles.filterChip}
          textStyle={styles.filterChipText}
        >
          All
        </Chip>
        {items.map((item) => (
          <Chip
            key={item}
            mode={selectedItem === item ? "flat" : "outlined"}
            selected={selectedItem === item}
            onPress={() => onSelect(selectedItem === item ? null : item)}
            style={styles.filterChip}
            textStyle={styles.filterChipText}
          >
            {item.charAt(0).toUpperCase() + item.slice(1)}
          </Chip>
        ))}
      </ScrollView>
    </View>
  );

  const filteredExercises = getFilteredExercises();

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Exercise Library</Text>
        <Text style={styles.subtitle}>Browse exercises by category and difficulty</Text>
      </View>

      <ScrollView style={styles.content}>
        {/* Search Bar */}
        <Searchbar
          placeholder="Search exercises..."
          onChangeText={setSearchQuery}
          value={searchQuery}
          style={styles.searchBar}
          iconColor={BeatricTheme.primary}
          inputStyle={styles.searchInput}
        />

        {/* Filters */}
        {renderFilterChip(categories, selectedCategory, setSelectedCategory, 'Category')}
        {renderFilterChip(difficulties, selectedDifficulty, setSelectedDifficulty, 'Difficulty')}
        {renderFilterChip(muscleGroups, selectedMuscleGroup, setSelectedMuscleGroup, 'Muscle Groups')}

        {/* Results Count */}
        <View style={styles.resultsHeader}>
          <Text style={styles.resultsCount}>
            {filteredExercises.length} exercise{filteredExercises.length !== 1 ? 's' : ''} found
          </Text>
        </View>

        {/* Exercise List */}
        <FlatList
          data={filteredExercises}
          renderItem={renderExerciseCard}
          keyExtractor={(item) => item.id}
          scrollEnabled={false}
          showsVerticalScrollIndicator={false}
        />
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
    paddingTop: 40,
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
  content: {
    flex: 1,
  },
  searchBar: {
    margin: 20,
    marginBottom: 10,
    backgroundColor: BeatricTheme.surface,
    elevation: 2,
  },
  searchInput: {
    color: BeatricTheme.textPrimary,
  },
  filterSection: {
    marginBottom: 15,
  },
  filterLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: BeatricTheme.textPrimary,
    marginLeft: 20,
    marginBottom: 8,
  },
  filterScroll: {
    paddingHorizontal: 20,
  },
  filterChip: {
    marginRight: 8,
    backgroundColor: BeatricTheme.surface,
  },
  filterChipText: {
    color: BeatricTheme.textPrimary,
  },
  resultsHeader: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  resultsCount: {
    fontSize: 14,
    color: BeatricTheme.textSecondary,
  },
  exerciseCard: {
    marginHorizontal: 20,
    marginBottom: 12,
    backgroundColor: BeatricTheme.surface,
    elevation: 2,
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
    fontSize: 18,
    color: BeatricTheme.textPrimary,
    marginBottom: 4,
  },
  exerciseCategory: {
    fontSize: 14,
    color: BeatricTheme.textSecondary,
  },
  exerciseDescription: {
    fontSize: 14,
    color: BeatricTheme.textSecondary,
    marginBottom: 12,
    lineHeight: 20,
  },
  exerciseTags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 12,
  },
  muscleChip: {
    marginRight: 6,
    marginBottom: 4,
    backgroundColor: BeatricTheme.primary + '20',
  },
  chipText: {
    fontSize: 12,
    color: BeatricTheme.primary,
  },
  exerciseStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderTopWidth: 1,
    borderTopColor: BeatricTheme.border,
    paddingTop: 12,
  },
  stat: {
    alignItems: 'center',
  },
  statLabel: {
    fontSize: 12,
    color: BeatricTheme.textSecondary,
    marginBottom: 2,
  },
  statValue: {
    fontSize: 14,
    fontWeight: 'bold',
    color: BeatricTheme.primary,
  },
});

export default ExerciseLibraryScreen;
