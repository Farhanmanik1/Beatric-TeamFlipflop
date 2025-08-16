export interface Exercise {
  id: string;
  name: string;
  category: 'cardio' | 'strength' | 'yoga' | 'flexibility' | 'balance';
  subcategory: string;
  muscleGroups: string[];
  equipment: string[];
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  description: string;
  instructions: string[];
  benefits: string[];
  bpmRange?: { min: number; max: number };
  estimatedDuration?: number; // in minutes
  caloriesPerMinute?: number;
  imageUrl?: string;
}

export const EXERCISES: Exercise[] = [
  // Cardio Exercises
  {
    id: 'cardio-001',
    name: 'Running',
    category: 'cardio',
    subcategory: 'Running',
    muscleGroups: ['Legs', 'Core', 'Cardiovascular'],
    equipment: ['Running Shoes'],
    difficulty: 'beginner',
    description: 'High-intensity cardiovascular exercise that improves endurance and burns calories.',
    instructions: [
      'Start with a 5-minute warm-up walk',
      'Gradually increase your pace to a comfortable running speed',
      'Maintain good posture with shoulders relaxed',
      'Land on the middle of your foot, not your heel',
      'Keep your arms at a 90-degree angle and swing naturally'
    ],
    benefits: [
      'Improves cardiovascular health',
      'Burns calories effectively',
      'Strengthens leg muscles',
      'Releases endorphins',
      'Improves bone density'
    ],
    bpmRange: { min: 120, max: 160 },
    estimatedDuration: 30,
    caloriesPerMinute: 10
  },
  {
    id: 'cardio-002',
    name: 'Cycling',
    category: 'cardio',
    subcategory: 'Cycling',
    muscleGroups: ['Legs', 'Core', 'Cardiovascular'],
    equipment: ['Bicycle', 'Helmet'],
    difficulty: 'beginner',
    description: 'Low-impact cardiovascular exercise that strengthens leg muscles and improves endurance.',
    instructions: [
      'Adjust your seat height so your leg is almost straight when pedaling',
      'Keep your back straight and shoulders relaxed',
      'Pedal at a consistent rhythm',
      'Use proper hand positioning on the handlebars',
      'Maintain a steady breathing pattern'
    ],
    benefits: [
      'Low-impact exercise',
      'Improves leg strength',
      'Enhances cardiovascular fitness',
      'Can be done indoors or outdoors',
      'Good for joint health'
    ],
    bpmRange: { min: 110, max: 150 },
    estimatedDuration: 45,
    caloriesPerMinute: 8
  },
  {
    id: 'cardio-003',
    name: 'Jump Rope',
    category: 'cardio',
    subcategory: 'Jumping',
    muscleGroups: ['Legs', 'Shoulders', 'Core', 'Cardiovascular'],
    equipment: ['Jump Rope'],
    difficulty: 'intermediate',
    description: 'High-intensity cardio exercise that improves coordination and burns calories quickly.',
    instructions: [
      'Stand with feet shoulder-width apart',
      'Hold the rope handles at hip level',
      'Jump on the balls of your feet',
      'Keep your elbows close to your body',
      'Maintain a steady rhythm'
    ],
    benefits: [
      'Excellent calorie burner',
      'Improves coordination',
      'Strengthens multiple muscle groups',
      'Portable and convenient',
      'Improves bone density'
    ],
    bpmRange: { min: 140, max: 180 },
    estimatedDuration: 15,
    caloriesPerMinute: 12
  },

  // Strength Exercises
  {
    id: 'strength-001',
    name: 'Push-ups',
    category: 'strength',
    subcategory: 'Bodyweight',
    muscleGroups: ['Chest', 'Triceps', 'Shoulders', 'Core'],
    equipment: [],
    difficulty: 'beginner',
    description: 'Classic bodyweight exercise that builds upper body strength and core stability.',
    instructions: [
      'Start in a plank position with hands slightly wider than shoulders',
      'Lower your body until your chest nearly touches the floor',
      'Keep your body in a straight line from head to heels',
      'Push back up to the starting position',
      'Breathe steadily throughout the movement'
    ],
    benefits: [
      'Builds upper body strength',
      'Improves core stability',
      'No equipment needed',
      'Can be modified for different fitness levels',
      'Improves functional strength'
    ],
    bpmRange: { min: 80, max: 120 },
    estimatedDuration: 10,
    caloriesPerMinute: 6
  },
  {
    id: 'strength-002',
    name: 'Squats',
    category: 'strength',
    subcategory: 'Bodyweight',
    muscleGroups: ['Legs', 'Glutes', 'Core'],
    equipment: [],
    difficulty: 'beginner',
    description: 'Fundamental lower body exercise that builds leg and glute strength.',
    instructions: [
      'Stand with feet shoulder-width apart',
      'Lower your body as if sitting back into a chair',
      'Keep your knees behind your toes',
      'Lower until your thighs are parallel to the ground',
      'Push through your heels to return to standing'
    ],
    benefits: [
      'Builds leg and glute strength',
      'Improves balance and stability',
      'Enhances functional movement',
      'Can be done anywhere',
      'Improves posture'
    ],
    bpmRange: { min: 70, max: 110 },
    estimatedDuration: 10,
    caloriesPerMinute: 5
  },
  {
    id: 'strength-003',
    name: 'Plank',
    category: 'strength',
    subcategory: 'Core',
    muscleGroups: ['Core', 'Shoulders', 'Back'],
    equipment: [],
    difficulty: 'beginner',
    description: 'Isometric exercise that builds core strength and stability.',
    instructions: [
      'Start in a forearm plank position',
      'Keep your body in a straight line from head to heels',
      'Engage your core muscles',
      'Hold the position without letting your hips sag',
      'Breathe steadily throughout the hold'
    ],
    benefits: [
      'Builds core strength',
      'Improves posture',
      'Enhances stability',
      'Reduces back pain',
      'Improves balance'
    ],
    bpmRange: { min: 60, max: 100 },
    estimatedDuration: 5,
    caloriesPerMinute: 3
  },

  // Yoga Exercises
  {
    id: 'yoga-001',
    name: 'Sun Salutation',
    category: 'yoga',
    subcategory: 'Vinyasa',
    muscleGroups: ['Full Body', 'Core', 'Flexibility'],
    equipment: ['Yoga Mat'],
    difficulty: 'beginner',
    description: 'Dynamic yoga sequence that warms up the body and improves flexibility.',
    instructions: [
      'Start in Mountain Pose (Tadasana)',
      'Forward fold with hands to feet',
      'Half lift with flat back',
      'Step back to Plank Pose',
      'Lower to Chaturanga',
      'Upward Dog',
      'Downward Dog',
      'Step forward and repeat'
    ],
    benefits: [
      'Improves flexibility',
      'Builds strength',
      'Enhances breathing',
      'Reduces stress',
      'Improves circulation'
    ],
    bpmRange: { min: 60, max: 90 },
    estimatedDuration: 15,
    caloriesPerMinute: 4
  },
  {
    id: 'yoga-002',
    name: 'Warrior Pose',
    category: 'yoga',
    subcategory: 'Standing',
    muscleGroups: ['Legs', 'Core', 'Balance'],
    equipment: ['Yoga Mat'],
    difficulty: 'beginner',
    description: 'Powerful standing pose that builds strength and improves balance.',
    instructions: [
      'Step one foot back into a lunge position',
      'Turn your back foot out 45 degrees',
      'Bend your front knee to 90 degrees',
      'Raise your arms overhead',
      'Keep your core engaged and chest lifted'
    ],
    benefits: [
      'Builds leg strength',
      'Improves balance',
      'Enhances focus',
      'Opens hips and chest',
      'Improves posture'
    ],
    bpmRange: { min: 50, max: 80 },
    estimatedDuration: 10,
    caloriesPerMinute: 3
  },

  // Flexibility Exercises
  {
    id: 'flexibility-001',
    name: 'Hamstring Stretch',
    category: 'flexibility',
    subcategory: 'Static Stretching',
    muscleGroups: ['Hamstrings', 'Lower Back'],
    equipment: [],
    difficulty: 'beginner',
    description: 'Gentle stretch that improves hamstring flexibility and reduces lower back tension.',
    instructions: [
      'Sit on the floor with legs extended',
      'Keep your back straight',
      'Reach forward toward your toes',
      'Hold the stretch for 30 seconds',
      'Breathe deeply throughout'
    ],
    benefits: [
      'Improves hamstring flexibility',
      'Reduces lower back pain',
      'Improves posture',
      'Enhances range of motion',
      'Reduces injury risk'
    ],
    bpmRange: { min: 50, max: 70 },
    estimatedDuration: 5,
    caloriesPerMinute: 2
  }
];

export const getExercisesByCategory = (category: Exercise['category']): Exercise[] => {
  return EXERCISES.filter(exercise => exercise.category === category);
};

export const getExercisesByDifficulty = (difficulty: Exercise['difficulty']): Exercise[] => {
  return EXERCISES.filter(exercise => exercise.difficulty === difficulty);
};

export const getExerciseById = (id: string): Exercise | undefined => {
  return EXERCISES.find(exercise => exercise.id === id);
};

export const getExercisesByMuscleGroup = (muscleGroup: string): Exercise[] => {
  return EXERCISES.filter(exercise => 
    exercise.muscleGroups.some(muscle => 
      muscle.toLowerCase().includes(muscleGroup.toLowerCase())
    )
  );
};
