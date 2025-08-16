import { WorkoutTemplate } from '../types/workout';

export const WORKOUT_TEMPLATES: WorkoutTemplate[] = [
  // Beginner Cardio
  {
    id: 'cardio-beginner-001',
    name: 'Beginner Cardio Blast',
    description: 'Perfect for beginners starting their fitness journey. Low-impact cardio workout.',
    type: 'cardio',
    difficulty: 'beginner',
    estimatedDuration: 20,
    exercises: [
      {
        exerciseId: 'cardio-001', // Running
        sets: 1,
        duration: 1200, // 20 minutes
        restTime: 0
      }
    ],
    targetBPM: { min: 120, max: 140 },
    caloriesTarget: 150
  },

  // Beginner Strength
  {
    id: 'strength-beginner-001',
    name: 'Beginner Bodyweight Strength',
    description: 'Full-body strength workout using only bodyweight exercises.',
    type: 'strength',
    difficulty: 'beginner',
    estimatedDuration: 25,
    exercises: [
      {
        exerciseId: 'strength-002', // Squats
        sets: 3,
        reps: 10,
        restTime: 60
      },
      {
        exerciseId: 'strength-001', // Push-ups
        sets: 3,
        reps: 5,
        restTime: 60
      },
      {
        exerciseId: 'strength-003', // Plank
        sets: 3,
        duration: 30,
        restTime: 45
      }
    ],
    targetBPM: { min: 80, max: 120 },
    caloriesTarget: 120
  },

  // Beginner Yoga
  {
    id: 'yoga-beginner-001',
    name: 'Beginner Yoga Flow',
    description: 'Gentle yoga sequence for beginners focusing on flexibility and breathing.',
    type: 'yoga',
    difficulty: 'beginner',
    estimatedDuration: 30,
    exercises: [
      {
        exerciseId: 'yoga-001', // Sun Salutation
        sets: 3,
        duration: 600, // 10 minutes
        restTime: 30
      },
      {
        exerciseId: 'yoga-002', // Warrior Pose
        sets: 2,
        duration: 300, // 5 minutes each side
        restTime: 30
      }
    ],
    targetBPM: { min: 60, max: 90 },
    caloriesTarget: 80
  },

  // Intermediate Cardio
  {
    id: 'cardio-intermediate-001',
    name: 'Intermediate HIIT Cardio',
    description: 'High-intensity interval training for intermediate fitness levels.',
    type: 'cardio',
    difficulty: 'intermediate',
    estimatedDuration: 30,
    exercises: [
      {
        exerciseId: 'cardio-003', // Jump Rope
        sets: 5,
        duration: 300, // 5 minutes each
        restTime: 60
      }
    ],
    targetBPM: { min: 140, max: 170 },
    caloriesTarget: 250
  },

  // Intermediate Strength
  {
    id: 'strength-intermediate-001',
    name: 'Intermediate Strength Circuit',
    description: 'Circuit training combining strength and cardio elements.',
    type: 'mixed',
    difficulty: 'intermediate',
    estimatedDuration: 35,
    exercises: [
      {
        exerciseId: 'strength-002', // Squats
        sets: 4,
        reps: 15,
        restTime: 45
      },
      {
        exerciseId: 'strength-001', // Push-ups
        sets: 4,
        reps: 12,
        restTime: 45
      },
      {
        exerciseId: 'cardio-003', // Jump Rope
        sets: 3,
        duration: 180, // 3 minutes
        restTime: 30
      },
      {
        exerciseId: 'strength-003', // Plank
        sets: 3,
        duration: 60,
        restTime: 30
      }
    ],
    targetBPM: { min: 100, max: 140 },
    caloriesTarget: 200
  },

  // Flexibility Focus
  {
    id: 'flexibility-beginner-001',
    name: 'Full Body Stretch',
    description: 'Comprehensive stretching routine for improved flexibility.',
    type: 'flexibility',
    difficulty: 'beginner',
    estimatedDuration: 20,
    exercises: [
      {
        exerciseId: 'flexibility-001', // Hamstring Stretch
        sets: 3,
        duration: 60,
        restTime: 30
      }
    ],
    targetBPM: { min: 50, max: 70 },
    caloriesTarget: 40
  }
];

export const getTemplatesByType = (type: WorkoutTemplate['type']): WorkoutTemplate[] => {
  return WORKOUT_TEMPLATES.filter(template => template.type === type);
};

export const getTemplatesByDifficulty = (difficulty: WorkoutTemplate['difficulty']): WorkoutTemplate[] => {
  return WORKOUT_TEMPLATES.filter(template => template.difficulty === difficulty);
};

export const getTemplateById = (id: string): WorkoutTemplate | undefined => {
  return WORKOUT_TEMPLATES.find(template => template.id === id);
};

export const getTemplatesByDuration = (maxDuration: number): WorkoutTemplate[] => {
  return WORKOUT_TEMPLATES.filter(template => template.estimatedDuration <= maxDuration);
};
