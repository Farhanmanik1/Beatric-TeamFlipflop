/**
 * Beatric App Theme Configuration
 * Color palette: Black background with orange-red shades
 */

export const BeatricTheme = {
  // Primary Colors
  primary: '#FF6B35', // Vibrant orange-red
  primaryLight: '#FF8A65', // Lighter orange-red
  primaryDark: '#E55A2B', // Darker orange-red
  
  // Secondary Colors
  secondary: '#FF5722', // Material Design orange
  secondaryLight: '#FF8A50', // Light orange
  secondaryDark: '#C41E3A', // Dark red-orange
  
  // Background Colors
  background: '#000000', // Pure black
  surface: '#1A1A1A', // Dark gray (almost black)
  surfaceLight: '#2D2D2D', // Slightly lighter dark gray
  surfaceDark: '#0D0D0D', // Very dark gray
  
  // Text Colors
  textPrimary: '#FFFFFF', // White text
  textSecondary: '#E0E0E0', // Light gray text
  textTertiary: '#BDBDBD', // Medium gray text
  textDisabled: '#757575', // Dark gray for disabled text
  
  // Accent Colors
  accent: '#FF4500', // Orange-red accent
  accentLight: '#FF6347', // Light orange-red
  accentDark: '#CC3700', // Dark orange-red
  
  // Status Colors
  success: '#4CAF50', // Green
  warning: '#FF9800', // Orange
  error: '#F44336', // Red
  info: '#2196F3', // Blue
  
  // Gradient Colors
  gradientStart: '#FF6B35',
  gradientEnd: '#FF5722',
  
  // Border Colors
  border: '#333333', // Dark gray border
  borderLight: '#404040', // Lighter border
  
  // Shadow Colors
  shadow: 'rgba(255, 107, 53, 0.3)', // Orange-red shadow
  shadowDark: 'rgba(0, 0, 0, 0.8)', // Dark shadow
};

export const BeatricColors = {
  // Main brand colors
  beatricOrange: '#FF6B35',
  beatricRed: '#FF5722',
  beatricDark: '#1A1A1A',
  beatricBlack: '#000000',
  
  // UI Colors
  background: BeatricTheme.background,
  surface: BeatricTheme.surface,
  primary: BeatricTheme.primary,
  secondary: BeatricTheme.secondary,
  text: BeatricTheme.textPrimary,
  textSecondary: BeatricTheme.textSecondary,
  
  // Interactive Colors
  buttonPrimary: BeatricTheme.primary,
  buttonSecondary: BeatricTheme.secondary,
  buttonDisabled: BeatricTheme.textDisabled,
  
  // Status Colors
  success: BeatricTheme.success,
  warning: BeatricTheme.warning,
  error: BeatricTheme.error,
  info: BeatricTheme.info,
};

export default BeatricTheme;
