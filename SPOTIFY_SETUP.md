# 🎵 Spotify Integration Setup Guide

This guide will help you set up Spotify integration for your Beatric app.

## Prerequisites

1. **Spotify Premium Account**: You need a Spotify Premium account for full API access
2. **Spotify App Installed**: Make sure you have the Spotify app installed on your device
3. **Developer Account**: You'll need to create a Spotify Developer account

## Step 1: Create a Spotify App

1. Go to [Spotify Developer Dashboard](https://developer.spotify.com/dashboard)
2. Log in with your Spotify account
3. Click "Create App"
4. Fill in the app details:
   - **App name**: `Beatric Workout App`
   - **App description**: `Fitness app with music integration`
   - **Website**: `https://your-website.com` (optional)
   - **Redirect URI**: `exp://192.168.81.71:8081/spotify-auth-callback`
   - **API/SDKs**: Select "Web API"
5. Accept the terms and click "Save"

## Step 2: Get Your Credentials

After creating the app, you'll get:
- **Client ID**: (Your actual client ID from the dashboard)
- **Client Secret**: (Your actual client secret from the dashboard)

## Step 3: Update Configuration

1. Open `src/config/spotify.ts`
2. Replace the placeholder values with your actual credentials:
   ```typescript
   export const SPOTIFY_CONFIG = {
     CLIENT_ID: 'YOUR_ACTUAL_CLIENT_ID_HERE',        // Replace this
     CLIENT_SECRET: 'YOUR_ACTUAL_CLIENT_SECRET_HERE', // Replace this
     // ... rest of config
   };
   ```

## Step 4: Add Users to Your App (IMPORTANT!)

**⚠️ CRITICAL**: Spotify apps in development mode require manual user addition!

1. Go to [Spotify Developer Dashboard](https://developer.spotify.com/dashboard)
2. Select your app
3. Go to **"Users"** tab
4. Click **"Add New User"**
5. Enter the **Spotify email address** of users who want to test
6. **Maximum 25 users** allowed in development mode

**Why This is Required:**
- Spotify apps start in **"Development Mode"** by default
- Only added users can authenticate with your app
- This prevents unauthorized access during development
- You must manually add each user who wants to test

**To Remove This Limitation:**
- Submit your app for review to move to **"Production Mode"**
- This allows unlimited users but requires Spotify approval
- Only recommended for production apps

## Step 5: Update Redirect URI

The redirect URI in your Spotify app settings should match:
```
exp://192.168.81.71:8081/spotify-auth-callback
```

**IMPORTANT**: 
- Remove the `--` from the redirect URI
- Use your current IP address: `192.168.81.71`
- The port should match your Expo server (usually 8081)

## Step 5: Test the Integration

1. Start your Expo development server:
   ```bash
   npx expo start --lan
   ```

2. Open the app on your device

3. Navigate to Home → "Connect Spotify" or Workout → "Connect Spotify"

4. Tap "Connect Spotify" and follow the authentication flow

5. Grant the requested permissions when prompted

## Troubleshooting

### "invalid_client" Error
This error occurs when:
1. **Client ID is incorrect** - Double-check your Spotify app credentials
2. **Client Secret is incorrect** - Verify the secret matches your app
3. **App not properly configured** - Ensure your app is created and active in the dashboard

**To fix:**
1. Go to [Spotify Developer Dashboard](https://developer.spotify.com/dashboard)
2. Select your app
3. Copy the exact Client ID and Client Secret
4. Update `src/config/spotify.ts` with these values
5. Restart your Expo server

### "invalid redirect url" Error
This error occurs when:
1. **IP address changed** - Your computer's IP address may have changed
2. **Port mismatch** - Expo is running on a different port
3. **Redirect URI mismatch** - Spotify dashboard doesn't match your app

**To fix:**
1. Check your current IP: `ipconfig` (Windows) or `ifconfig` (Mac/Linux)
2. Update the redirect URI in Spotify dashboard to match
3. Update the redirect URI in your app if needed
4. Restart Expo server

### Authentication Keeps Loading
This usually means:
1. **Redirect URI mismatch** - The callback isn't working properly
2. **Network issues** - Check your internet connection
3. **App permissions** - Ensure you granted all requested permissions

### Pause Button Restarts Song
This issue occurs when:
1. **State synchronization problem** - Local state doesn't match Spotify state
2. **Network delay** - Spotify API response takes time to reflect

**To fix:**
1. **Restart the app** - This refreshes the state
2. **Check Spotify app** - Ensure it's not playing on another device
3. **Wait a moment** - Sometimes there's a delay in state updates
4. **Use Spotify app directly** - For immediate control

**Note**: This is a known issue with Spotify Web API integration and has been fixed in the latest version of the app.

## Features Available

Once connected, you'll have access to:

### 🎵 Music Features
- **Workout Recommendations**: Get music suggestions based on workout type
- **Playback Control**: Play, pause, skip tracks during workouts
- **Volume Control**: Adjust music volume
- **Playlist Management**: Create and manage workout playlists

### 🏃‍♂️ Workout Integration
- **BPM Matching**: Music matched to workout intensity
- **Genre Selection**: Different genres for different workout types
- **Energy Levels**: High-energy music for cardio, calming for yoga

### 📊 Analytics
- **Music Preferences**: Track your favorite workout music
- **Performance Correlation**: See how music affects your workout performance

## Workout Music Types

The app provides different music recommendations based on workout type:

| Workout Type | Genres | BPM Range | Energy Level |
|--------------|--------|-----------|--------------|
| **Cardio** | Pop, Dance, Electronic, Hip-hop, Rock | 120-140 | High |
| **Strength** | Rock, Metal, Hip-hop, Electronic | 100-130 | Medium-High |
| **Yoga** | Ambient, Classical, Jazz, Folk | 60-80 | Low |
| **Cooldown** | Ambient, Classical, Jazz, Chill | 60-80 | Low |

## Troubleshooting

### Common Issues

1. **"Invalid redirect URI" error**
   - Make sure the redirect URI in Spotify app settings matches exactly
   - Check for extra spaces or typos

2. **"Authentication failed" error**
   - Verify your Client ID and Client Secret are correct
   - Make sure you're using a Spotify Premium account

3. **"No active device" error**
   - Open the Spotify app on your device
   - Make sure you're logged in
   - Try playing a song in Spotify first

4. **"Permission denied" error**
   - Check that you granted all requested permissions
   - Try disconnecting and reconnecting

### Debug Mode

To enable debug logging, add this to your app:

```typescript
// In your main App.tsx or where you initialize Spotify
if (__DEV__) {
  console.log('Spotify Debug Mode Enabled');
}
```

## Security Notes

- **Never commit your Client Secret** to version control
- Use environment variables for production
- The Client Secret should be kept secure on your backend

## Production Setup

For production deployment:

1. Create a separate Spotify app for production
2. Use environment variables for credentials
3. Update redirect URIs for your production domain
4. Implement proper error handling and retry logic

## API Limits

Be aware of Spotify API rate limits:
- **User Profile**: 25 requests per second
- **Playback Control**: 25 requests per second
- **Search**: 25 requests per second
- **Recommendations**: 25 requests per second

## Support

If you encounter issues:

1. Check the [Spotify Web API documentation](https://developer.spotify.com/documentation/web-api/)
2. Verify your app settings in the Spotify Developer Dashboard
3. Check the console logs for detailed error messages
4. Ensure your Spotify account has the required permissions

## Next Steps

After setting up Spotify integration:

1. **Test all features** thoroughly
2. **Customize music recommendations** for your users
3. **Add more workout types** and music genres
4. **Implement offline music caching** for better performance
5. **Add music analytics** to track user preferences

---

🎉 **Congratulations!** Your Beatric app now has full Spotify integration for an enhanced workout experience!
