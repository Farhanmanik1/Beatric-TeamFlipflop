import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Button, IconButton } from 'react-native-paper';
import { BeatricTheme } from '../utils/theme';

const WorkoutSessionScreen = ({ navigation }: any) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <IconButton
          icon="arrow-left"
          size={24}
          iconColor={BeatricTheme.primary}
          onPress={() => navigation.goBack()}
        />
        <Text style={styles.title}>Workout Session</Text>
      </View>
      
      <View style={styles.content}>
        <Text style={styles.message}>
          🚧 Workout Session Screen Coming Soon! 🚧
        </Text>
        <Text style={styles.description}>
          This screen will contain the actual workout tracking interface with:
        </Text>
        <View style={styles.features}>
          <Text style={styles.feature}>• Exercise timer and progress tracking</Text>
          <Text style={styles.feature}>• Heart rate monitoring integration</Text>
          <Text style={styles.feature}>• Music controls and BPM matching</Text>
          <Text style={styles.feature}>• Set/rep counting and rest timers</Text>
          <Text style={styles.feature}>• Real-time workout statistics</Text>
        </View>
        
        <Button
          mode="contained"
          onPress={() => navigation.goBack()}
          buttonColor={BeatricTheme.primary}
          textColor={BeatricTheme.textPrimary}
          style={styles.button}
        >
          Go Back
        </Button>
      </View>
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
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: BeatricTheme.primary,
    marginLeft: 10,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  message: {
    fontSize: 24,
    fontWeight: 'bold',
    color: BeatricTheme.primary,
    textAlign: 'center',
    marginBottom: 20,
  },
  description: {
    fontSize: 16,
    color: BeatricTheme.textSecondary,
    textAlign: 'center',
    marginBottom: 20,
    lineHeight: 24,
  },
  features: {
    marginBottom: 30,
  },
  feature: {
    fontSize: 16,
    color: BeatricTheme.textSecondary,
    marginBottom: 8,
    textAlign: 'center',
  },
  button: {
    marginTop: 20,
  },
});

export default WorkoutSessionScreen;
