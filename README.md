# 🏋️ Beatric - Smart Workout App

A React Native mobile application that combines fitness tracking with intelligent music integration powered by Spotify.

## 🎯 Project Overview

Beatric is a comprehensive workout application that provides:
- **Smart Music Integration**: Automatic music selection based on workout intensity
- **Exercise Library**: Extensive database of exercises with detailed instructions
- **Workout Templates**: Pre-designed workout routines for different fitness levels
- **User Authentication**: Secure login/registration with Firebase
- **Progress Tracking**: Monitor your fitness journey with detailed analytics

## ✨ Features

### 🎵 Music Integration
- **Spotify Authentication**: Seamless OAuth 2.0 PKCE flow
- **Smart Playlists**: Automatic music recommendations for workouts
- **Playback Controls**: Next/Previous track controls
- **Workout Music**: Curated playlists for different exercise types

### 💪 Fitness Features
- **Exercise Library**: 50+ exercises with detailed instructions
- **Workout Templates**: Pre-designed routines (Beginner, Intermediate, Advanced)
- **Custom Workouts**: Create your own workout routines
- **Progress Tracking**: Monitor your fitness journey

### 🔐 User Management
- **Firebase Authentication**: Secure user registration and login
- **Profile Management**: User profiles with workout history
- **Data Persistence**: Cloud storage with Firebase Firestore

### 🎨 User Interface
- **Modern Design**: Black background with orange-red accent colors
- **Responsive Layout**: Optimized for mobile devices
- **Intuitive Navigation**: Tab-based navigation with stack screens
- **Material Design**: Built with React Native Paper components

## 🛠️ Technology Stack

- **Frontend**: React Native with Expo
- **State Management**: Redux Toolkit
- **Authentication**: Firebase Auth
- **Database**: Firebase Firestore
- **Music API**: Spotify Web API
- **UI Components**: React Native Paper
- **Navigation**: React Navigation v6
- **Language**: TypeScript

## 📱 Screenshots

*[Screenshots will be added here]*

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- Expo CLI
- Android Studio (for Android development)
- Xcode (for iOS development, macOS only)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/FarhanManik1/Beatric-TeamFlipflop.git
   cd Beatric-TeamFlipflop
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   - Copy `env.template` to `.env`
   - Add your Firebase configuration
   - Add your Spotify API credentials

4. **Start the development server**
   ```bash
   npx expo start
   ```

5. **Run on device**
   - Install Expo Go on your mobile device
   - Scan the QR code from the terminal

## 🔧 Configuration

### Firebase Setup
1. Create a Firebase project
2. Enable Authentication and Firestore
3. Add your Firebase config to `src/config/firebase.ts`

### Spotify Setup
1. Create a Spotify Developer account
2. Register your application
3. Add your Client ID and Secret to `src/config/spotify.ts`
4. Configure redirect URIs

See `SPOTIFY_SETUP.md` for detailed instructions.

## 📁 Project Structure

```
SmartWorkoutApp/
├── src/
│   ├── components/          # Reusable UI components
│   ├── config/             # Configuration files
│   ├── navigation/         # Navigation setup
│   ├── screens/            # App screens
│   ├── services/           # API services
│   ├── store/              # Redux store and slices
│   ├── types/              # TypeScript type definitions
│   └── utils/              # Utility functions
├── assets/                 # Images and static files
├── App.tsx                 # Main app component
└── package.json           # Dependencies
```

## 🎯 Milestone Status

**✅ 50% Milestone Requirements (COMPLETED):**
- ✅ Project initialization with React Native
- ✅ Core UI components (navigation, screens, music player)
- ✅ Backend API connection (Firebase Firestore)
- ✅ Basic responsiveness (mobile-first design)

**🚀 Additional Features (Beyond 50%):**
- ✅ Spotify music integration
- ✅ User authentication system
- ✅ Custom theme implementation
- ✅ Music playback controls
- ✅ Exercise library
- ✅ Workout templates
- ✅ Database integration

## 🤝 Contributing

This is a team project for educational purposes. For contributions:
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📄 License

This project is created for educational purposes as part of a course assignment.

## 👥 Team

**Team Flipflop**
- Farhan Manik - Lead Developer

## 🔗 Links

- **GitHub Repository**: https://github.com/FarhanManik1/Beatric-TeamFlipflop.git
- **Spotify Setup Guide**: See `SPOTIFY_SETUP.md`
- **Firebase Setup Guide**: See `FIREBASE_SPOTIFY_SETUP.md`

## 📞 Support

For technical support or questions about the project, please refer to the documentation files or create an issue in the GitHub repository.

---

**Built with ❤️ using React Native and Expo**
