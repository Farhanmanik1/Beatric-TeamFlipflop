# Beatric - Smart Fitness App

Beatric is a modern fitness application designed to provide a personalized workout experience with music integration and heart rate monitoring.

## 🎨 Design Theme

Beatric features a sleek dark theme with vibrant orange-red accents:

- **Background**: Pure black (#000000)
- **Surface**: Dark gray (#1A1A1A)
- **Primary**: Vibrant orange-red (#FF6B35)
- **Secondary**: Material Design orange (#FF5722)
- **Text**: White and light gray for optimal contrast

## 🚀 Features

### Current Features (Phase 1.4)
- ✅ User authentication with Firebase
- ✅ Dark theme with orange-red color palette
- ✅ Bottom tab navigation
- ✅ Dashboard with user profile
- ✅ Workout screen layout
- ✅ Analytics screen structure
- ✅ Profile management
- ✅ Responsive design

### Planned Features
- 🎵 Spotify music integration
- ❤️ Heart rate monitoring
- 📊 Advanced analytics and charts
- 🏋️ Exercise library
- 🎯 Personalized workout plans
- 📱 Real-time notifications

## 🛠️ Tech Stack

- **Framework**: React Native with Expo
- **State Management**: Redux Toolkit
- **Navigation**: React Navigation
- **UI Components**: React Native Paper
- **Authentication**: Firebase Auth
- **Database**: Firebase Firestore
- **Language**: TypeScript

## 📱 Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd SmartWorkoutApp
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

4. Run on your preferred platform:
```bash
# iOS
npm run ios

# Android
npm run android

# Web
npm run web
```

## 🔧 Configuration

### Firebase Setup
1. Create a Firebase project
2. Enable Authentication and Firestore
3. Update the Firebase configuration in `src/config/firebase.ts`

### Environment Variables
Create a `.env` file in the root directory with your Firebase configuration.

## 📁 Project Structure

```
src/
├── config/
│   └── firebase.ts          # Firebase configuration
├── navigation/
│   └── MainNavigator.tsx    # Bottom tab navigation
├── screens/
│   ├── LoginScreen.tsx      # User login
│   ├── RegisterScreen.tsx   # User registration
│   ├── HomeScreen.tsx       # Dashboard
│   ├── WorkoutScreen.tsx    # Workout interface
│   ├── AnalyticsScreen.tsx  # Analytics and charts
│   └── ProfileScreen.tsx    # User profile
├── store/
│   ├── index.ts             # Redux store configuration
│   └── slices/
│       └── authSlice.ts     # Authentication state
├── types/
│   └── index.ts             # TypeScript type definitions
└── utils/
    ├── dateUtils.ts         # Date utility functions
    └── theme.ts             # Beatric theme configuration
```

## 🎯 Development Roadmap

### Phase 1: Foundation ✅
- [x] Basic UI framework
- [x] Navigation structure
- [x] Authentication system
- [x] Dark theme implementation

### Phase 2: Core Features (In Progress)
- [ ] Spotify API integration
- [ ] Heart rate monitoring
- [ ] Workout tracking
- [ ] Exercise database

### Phase 3: Advanced Features
- [ ] Machine learning recommendations
- [ ] Social features
- [ ] Advanced analytics
- [ ] Wearable device integration

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For support and questions, please open an issue in the repository.

---

**Beatric** - Where fitness meets technology with style. 🏃‍♂️🎵
