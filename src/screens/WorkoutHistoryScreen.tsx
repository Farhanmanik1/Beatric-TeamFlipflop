import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, FlatList } from 'react-native';
import { Text, Card, Title, Paragraph, Button, IconButton, Chip, Searchbar } from 'react-native-paper';
import { BeatricTheme } from '../utils/theme';

// Mock data for workout history
const MOCK_WORKOUT_HISTORY = [
  {
    id: '1',
    name: 'Beginner Cardio Blast',
    type: 'cardio',
    date: '2024-01-15',
    duration: 25,
    calories: 180,
    exercises: 4,
    status: 'completed',
  },
  {
    id: '2',
    name: 'Strength Training',
    type: 'strength',
    date: '2024-01-13',
    duration: 45,
    calories: 320,
    exercises: 6,
    status: 'completed',
  },
  {
    id: '3',
    name: 'Yoga Flow',
    type: 'yoga',
    date: '2024-01-10',
    duration: 30,
    calories: 120,
    exercises: 8,
    status: 'completed',
  },
  {
    id: '4',
    name: 'High Intensity Interval',
    type: 'cardio',
    date: '2024-01-08',
    duration: 20,
    calories: 250,
    exercises: 5,
    status: 'completed',
  },
  {
    id: '5',
    name: 'Core Focus',
    type: 'strength',
    date: '2024-01-05',
    duration: 35,
    calories: 200,
    exercises: 7,
    status: 'completed',
  },
];

const WorkoutHistoryScreen = ({ navigation }: any) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState<string | null>(null);

  const filters = ['all', 'cardio', 'strength', 'yoga', 'flexibility'];

  const getFilteredWorkouts = () => {
    let filtered = MOCK_WORKOUT_HISTORY;

    if (selectedFilter && selectedFilter !== 'all') {
      filtered = filtered.filter(workout => workout.type === selectedFilter);
    }

    if (searchQuery) {
      filtered = filtered.filter(workout =>
        workout.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    return filtered;
  };

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
      weekday: 'short',
      month: 'short',
      day: 'numeric',
    });
  };

  const renderWorkoutCard = ({ item }: { item: any }) => (
    <Card style={styles.workoutCard}>
      <Card.Content>
        <View style={styles.workoutHeader}>
          <View style={styles.workoutInfo}>
            <Title style={styles.workoutName}>{item.name}</Title>
            <Text style={styles.workoutDate}>{formatDate(item.date)}</Text>
          </View>
          <Chip
            mode="outlined"
            style={[styles.typeChip, { borderColor: getTypeColor(item.type) }]}
            textStyle={[styles.typeChipText, { color: getTypeColor(item.type) }]}
          >
            {item.type.charAt(0).toUpperCase() + item.type.slice(1)}
          </Chip>
        </View>

        <View style={styles.workoutStats}>
          <View style={styles.stat}>
            <Text style={styles.statLabel}>Duration</Text>
            <Text style={styles.statValue}>{item.duration} min</Text>
          </View>
          <View style={styles.stat}>
            <Text style={styles.statLabel}>Calories</Text>
            <Text style={styles.statValue}>{item.calories}</Text>
          </View>
          <View style={styles.stat}>
            <Text style={styles.statLabel}>Exercises</Text>
            <Text style={styles.statValue}>{item.exercises}</Text>
          </View>
        </View>

        <View style={styles.workoutActions}>
          <Button
            mode="outlined"
            onPress={() => navigation.navigate('StartWorkout', { 
              template: { name: item.name, type: item.type } 
            })}
            textColor={BeatricTheme.primary}
            style={styles.actionButton}
          >
            Repeat Workout
          </Button>
          <Button
            mode="text"
            onPress={() => navigation.navigate('WorkoutDetail', { workout: item })}
            textColor={BeatricTheme.textSecondary}
            style={styles.actionButton}
          >
            View Details
          </Button>
        </View>
      </Card.Content>
    </Card>
  );

  const renderFilterChip = (filter: string) => (
    <Chip
      key={filter}
      mode={selectedFilter === filter ? "flat" : "outlined"}
      selected={selectedFilter === filter}
      onPress={() => setSelectedFilter(selectedFilter === filter ? null : filter)}
      style={styles.filterChip}
      textStyle={styles.filterChipText}
    >
      {filter.charAt(0).toUpperCase() + filter.slice(1)}
    </Chip>
  );

  const filteredWorkouts = getFilteredWorkouts();

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
          <Text style={styles.title}>Workout History</Text>
          <Text style={styles.subtitle}>Track your fitness journey</Text>
        </View>
      </View>

      <ScrollView style={styles.content}>
        {/* Search Bar */}
        <Searchbar
          placeholder="Search workouts..."
          onChangeText={setSearchQuery}
          value={searchQuery}
          style={styles.searchBar}
          iconColor={BeatricTheme.primary}
          inputStyle={styles.searchInput}
        />

        {/* Filters */}
        <View style={styles.filterSection}>
          <Text style={styles.filterLabel}>Filter by Type:</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filterScroll}>
            {filters.map(renderFilterChip)}
          </ScrollView>
        </View>

        {/* Stats Summary */}
        <Card style={styles.statsCard}>
          <Card.Content>
            <Title style={styles.statsTitle}>This Month</Title>
            <View style={styles.statsRow}>
              <View style={styles.summaryStat}>
                <Text style={styles.summaryStatValue}>{MOCK_WORKOUT_HISTORY.length}</Text>
                <Text style={styles.summaryStatLabel}>Workouts</Text>
              </View>
              <View style={styles.summaryStat}>
                <Text style={styles.summaryStatValue}>
                  {MOCK_WORKOUT_HISTORY.reduce((sum, w) => sum + w.duration, 0)}
                </Text>
                <Text style={styles.summaryStatLabel}>Minutes</Text>
              </View>
              <View style={styles.summaryStat}>
                <Text style={styles.summaryStatValue}>
                  {MOCK_WORKOUT_HISTORY.reduce((sum, w) => sum + w.calories, 0)}
                </Text>
                <Text style={styles.summaryStatLabel}>Calories</Text>
              </View>
            </View>
          </Card.Content>
        </Card>

        {/* Results Count */}
        <View style={styles.resultsHeader}>
          <Text style={styles.resultsCount}>
            {filteredWorkouts.length} workout{filteredWorkouts.length !== 1 ? 's' : ''} found
          </Text>
        </View>

        {/* Workout List */}
        <FlatList
          data={filteredWorkouts}
          renderItem={renderWorkoutCard}
          keyExtractor={(item) => item.id}
          scrollEnabled={false}
          showsVerticalScrollIndicator={false}
        />

        {/* Empty State */}
        {filteredWorkouts.length === 0 && (
          <Card style={styles.emptyCard}>
            <Card.Content>
              <Text style={styles.emptyTitle}>No workouts found</Text>
              <Text style={styles.emptyText}>
                {searchQuery || selectedFilter 
                  ? 'Try adjusting your search or filters'
                  : 'Start your first workout to see your history here!'
                }
              </Text>
              <Button
                mode="contained"
                onPress={() => navigation.navigate('WorkoutTemplates')}
                buttonColor={BeatricTheme.primary}
                textColor={BeatricTheme.textPrimary}
                style={styles.startButton}
              >
                Start Your First Workout
              </Button>
            </Card.Content>
          </Card>
        )}
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
  statsCard: {
    marginHorizontal: 20,
    marginBottom: 16,
    backgroundColor: BeatricTheme.surface,
    elevation: 2,
  },
  statsTitle: {
    fontSize: 18,
    color: BeatricTheme.textPrimary,
    marginBottom: 12,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  summaryStat: {
    alignItems: 'center',
  },
  summaryStatValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: BeatricTheme.primary,
  },
  summaryStatLabel: {
    fontSize: 12,
    color: BeatricTheme.textSecondary,
    marginTop: 4,
  },
  resultsHeader: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  resultsCount: {
    fontSize: 14,
    color: BeatricTheme.textSecondary,
  },
  workoutCard: {
    marginHorizontal: 20,
    marginBottom: 12,
    backgroundColor: BeatricTheme.surface,
    elevation: 2,
  },
  workoutHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  workoutInfo: {
    flex: 1,
  },
  workoutName: {
    fontSize: 18,
    color: BeatricTheme.textPrimary,
    marginBottom: 4,
  },
  workoutDate: {
    fontSize: 14,
    color: BeatricTheme.textSecondary,
  },
  typeChip: {
    backgroundColor: 'transparent',
  },
  typeChipText: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  workoutStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 16,
    paddingVertical: 8,
    backgroundColor: BeatricTheme.background,
    borderRadius: 8,
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
  workoutActions: {
    flexDirection: 'row',
    gap: 8,
  },
  actionButton: {
    flex: 1,
  },
  emptyCard: {
    marginHorizontal: 20,
    marginTop: 20,
    backgroundColor: BeatricTheme.surface,
    elevation: 2,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: BeatricTheme.textPrimary,
    textAlign: 'center',
    marginBottom: 8,
  },
  emptyText: {
    fontSize: 14,
    color: BeatricTheme.textSecondary,
    textAlign: 'center',
    marginBottom: 16,
    lineHeight: 20,
  },
  startButton: {
    marginTop: 8,
  },
});

export default WorkoutHistoryScreen;
