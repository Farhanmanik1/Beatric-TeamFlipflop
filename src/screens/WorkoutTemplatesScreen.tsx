import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, FlatList } from 'react-native';
import { Text, Card, Title, Paragraph, Chip, Button, Searchbar, IconButton } from 'react-native-paper';
import { WORKOUT_TEMPLATES, getTemplatesByType, getTemplatesByDifficulty } from '../data/workoutTemplates';
import { WorkoutTemplate } from '../data/workoutTemplates';
import { BeatricTheme } from '../utils/theme';

const WorkoutTemplatesScreen = ({ navigation }: any) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [selectedDifficulty, setSelectedDifficulty] = useState<string | null>(null);

  const types = ['cardio', 'strength', 'yoga', 'flexibility', 'mixed'];
  const difficulties = ['beginner', 'intermediate', 'advanced'];

  const getFilteredTemplates = (): WorkoutTemplate[] => {
    let filtered = WORKOUT_TEMPLATES;

    if (selectedType) {
      filtered = filtered.filter(template => template.type === selectedType);
    }

    if (selectedDifficulty) {
      filtered = filtered.filter(template => template.difficulty === selectedDifficulty);
    }

    if (searchQuery) {
      filtered = filtered.filter(template =>
        template.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        template.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    return filtered;
  };

  const renderTemplateCard = ({ item }: { item: WorkoutTemplate }) => (
    <Card style={styles.templateCard}>
      <Card.Content>
        <View style={styles.templateHeader}>
          <View style={styles.templateInfo}>
            <Title style={styles.templateName}>{item.name}</Title>
            <Paragraph style={styles.templateType}>
              {item.type.charAt(0).toUpperCase() + item.type.slice(1)} • {item.difficulty}
            </Paragraph>
          </View>
          <IconButton
            icon="play-circle"
            size={32}
            iconColor={BeatricTheme.primary}
            onPress={() => navigation.navigate('StartWorkout', { template: item })}
          />
        </View>

        <Paragraph style={styles.templateDescription}>
          {item.description}
        </Paragraph>

        <View style={styles.templateStats}>
          <View style={styles.stat}>
            <Text style={styles.statLabel}>Duration</Text>
            <Text style={styles.statValue}>{item.estimatedDuration} min</Text>
          </View>
          <View style={styles.stat}>
            <Text style={styles.statLabel}>Exercises</Text>
            <Text style={styles.statValue}>{item.exercises.length}</Text>
          </View>
          {item.caloriesTarget && (
            <View style={styles.stat}>
              <Text style={styles.statLabel}>Calories</Text>
              <Text style={styles.statValue}>~{item.caloriesTarget}</Text>
            </View>
          )}
        </View>

        {item.targetBPM && (
          <View style={styles.bpmSection}>
            <Text style={styles.bpmLabel}>Target BPM Range:</Text>
            <Text style={styles.bpmValue}>{item.targetBPM.min} - {item.targetBPM.max} BPM</Text>
          </View>
        )}

                 <View style={styles.exercisePreview}>
           <Text style={styles.exercisePreviewLabel}>Exercises:</Text>
           <View style={styles.exerciseChipsContainer}>
             {item.exercises.slice(0, 3).map((exercise, index) => (
               <Chip
                 key={index}
                 mode="outlined"
                 compact
                 style={styles.exerciseChip}
                 textStyle={styles.exerciseChipText}
               >
                 {exercise.sets} sets
               </Chip>
             ))}
             {item.exercises.length > 3 && (
               <Chip
                 mode="outlined"
                 compact
                 style={styles.exerciseChip}
                 textStyle={styles.exerciseChipText}
               >
                 +{item.exercises.length - 3} more
               </Chip>
             )}
           </View>
         </View>
      </Card.Content>
      <Card.Actions>
        <Button
          mode="outlined"
          onPress={() => navigation.navigate('TemplateDetail', { template: item })}
          textColor={BeatricTheme.primary}
          style={styles.detailButton}
        >
          View Details
        </Button>
        <Button
          mode="contained"
          onPress={() => navigation.navigate('StartWorkout', { template: item })}
          buttonColor={BeatricTheme.primary}
          textColor={BeatricTheme.textPrimary}
        >
          Start Workout
        </Button>
      </Card.Actions>
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

  const filteredTemplates = getFilteredTemplates();

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Workout Templates</Text>
        <Text style={styles.subtitle}>Choose from pre-designed workout routines</Text>
      </View>

      <ScrollView style={styles.content}>
        {/* Search Bar */}
        <Searchbar
          placeholder="Search templates..."
          onChangeText={setSearchQuery}
          value={searchQuery}
          style={styles.searchBar}
          iconColor={BeatricTheme.primary}
          inputStyle={styles.searchInput}
        />

        {/* Filters */}
        {renderFilterChip(types, selectedType, setSelectedType, 'Workout Type')}
        {renderFilterChip(difficulties, selectedDifficulty, setSelectedDifficulty, 'Difficulty')}

        {/* Results Count */}
        <View style={styles.resultsHeader}>
          <Text style={styles.resultsCount}>
            {filteredTemplates.length} template{filteredTemplates.length !== 1 ? 's' : ''} found
          </Text>
        </View>

        {/* Template List */}
        <FlatList
          data={filteredTemplates}
          renderItem={renderTemplateCard}
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
  templateCard: {
    marginHorizontal: 20,
    marginBottom: 16,
    backgroundColor: BeatricTheme.surface,
    elevation: 2,
  },
  templateHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  templateInfo: {
    flex: 1,
  },
  templateName: {
    fontSize: 18,
    color: BeatricTheme.textPrimary,
    marginBottom: 4,
  },
  templateType: {
    fontSize: 14,
    color: BeatricTheme.textSecondary,
  },
  templateDescription: {
    fontSize: 14,
    color: BeatricTheme.textSecondary,
    marginBottom: 12,
    lineHeight: 20,
  },
  templateStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 12,
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
  bpmSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
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
  exercisePreview: {
    marginBottom: 16,
  },
  exercisePreviewLabel: {
    fontSize: 14,
    fontWeight: 'bold',
    color: BeatricTheme.textPrimary,
    marginBottom: 8,
  },
  exerciseChipsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  exerciseChip: {
    backgroundColor: BeatricTheme.primary + '20',
  },
  exerciseChipText: {
    fontSize: 12,
    color: BeatricTheme.primary,
  },
  detailButton: {
    borderColor: BeatricTheme.primary,
  },
});

export default WorkoutTemplatesScreen;
