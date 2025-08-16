import React from 'react';
import { View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { BeatricTheme } from '../utils/theme';

// Import screens
import HomeScreen from '../screens/HomeScreen';
import WorkoutScreen from '../screens/WorkoutScreen';
import AnalyticsScreen from '../screens/AnalyticsScreen';
import ProfileScreen from '../screens/ProfileScreen';
import SpotifyAuthScreen from '../screens/SpotifyAuthScreen';
import ExerciseLibraryScreen from '../screens/ExerciseLibraryScreen';
import WorkoutTemplatesScreen from '../screens/WorkoutTemplatesScreen';
import ExerciseDetailScreen from '../screens/ExerciseDetailScreen';
import StartWorkoutScreen from '../screens/StartWorkoutScreen';
import TemplateDetailScreen from '../screens/TemplateDetailScreen';
import WorkoutSessionScreen from '../screens/WorkoutSessionScreen';
import WorkoutHistoryScreen from '../screens/WorkoutHistoryScreen';
import WorkoutDetailScreen from '../screens/WorkoutDetailScreen';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: keyof typeof MaterialCommunityIcons.glyphMap = 'circle-outline';

          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Workout') {
            iconName = focused ? 'dumbbell' : 'dumbbell';
          } else if (route.name === 'Analytics') {
            iconName = focused ? 'chart-line' : 'chart-line';
          } else if (route.name === 'Profile') {
            iconName = focused ? 'account' : 'account-outline';
          }

          return <MaterialCommunityIcons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: BeatricTheme.primary,
        tabBarInactiveTintColor: BeatricTheme.textTertiary,
        headerShown: false,
        tabBarStyle: {
          backgroundColor: BeatricTheme.surface,
          borderTopWidth: 1,
          borderTopColor: BeatricTheme.border,
          paddingBottom: 5,
          paddingTop: 5,
          height: 60,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '500',
        },
      })}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{ title: 'Home' }}
      />
      <Tab.Screen
        name="Workout"
        component={WorkoutScreen}
        options={{ title: 'Workout' }}
      />
      <Tab.Screen
        name="Analytics"
        component={AnalyticsScreen}
        options={{ title: 'Analytics' }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{ title: 'Profile' }}
      />
    </Tab.Navigator>
  );
};

const MainNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="MainTabs" component={TabNavigator} />
      <Stack.Screen name="SpotifyAuth" component={SpotifyAuthScreen} />
      <Stack.Screen name="ExerciseLibrary" component={ExerciseLibraryScreen} />
      <Stack.Screen name="WorkoutTemplates" component={WorkoutTemplatesScreen} />
      <Stack.Screen name="ExerciseDetail" component={ExerciseDetailScreen} />
      <Stack.Screen name="StartWorkout" component={StartWorkoutScreen} />
      <Stack.Screen name="TemplateDetail" component={TemplateDetailScreen} />
      <Stack.Screen name="WorkoutSession" component={WorkoutSessionScreen} />
      <Stack.Screen name="WorkoutHistory" component={WorkoutHistoryScreen} />
      <Stack.Screen name="WorkoutDetail" component={WorkoutDetailScreen} />
    </Stack.Navigator>
  );
};

export default MainNavigator;
