import * as AuthSession from 'expo-auth-session';

// Generate the redirect URI
const generatedRedirectUri = AuthSession.makeRedirectUri({
  path: 'spotify-auth-callback',
});

console.log('Generated Redirect URI:', generatedRedirectUri);

// Spotify API Configuration
export const SPOTIFY_CONFIG = {
  // TODO: Replace these with your actual Spotify app credentials
  CLIENT_ID: '6bb3a9aa75f745ed927736f693db2a85',
  CLIENT_SECRET: '3c3c3ab8fd3a4b36bf89722431470412',

  // Dynamically generated redirect URI (works in Expo Go, standalone apps, and production)
  REDIRECT_URI: generatedRedirectUri,

  AUTH_URL: 'https://accounts.spotify.com/authorize',
  TOKEN_URL: 'https://accounts.spotify.com/api/token',
  API_BASE_URL: 'https://api.spotify.com/v1',

  SCOPES: [
    'user-read-private',
    'user-read-email',
    'user-read-playback-state',
    'user-modify-playback-state',
    'user-read-currently-playing',
    'playlist-read-private',
    'playlist-read-collaborative',
    'playlist-modify-public',
    'playlist-modify-private',
    'user-library-read',
    'user-library-modify',
    'user-top-read',
    'user-read-recently-played',
    'user-follow-read',
    'user-follow-modify'
  ].join(' ')
};


// Spotify API endpoints
export const SPOTIFY_ENDPOINTS = {
  // User endpoints
  PROFILE: '/me',
  TOP_TRACKS: '/me/top/tracks',
  RECENTLY_PLAYED: '/me/player/recently-played',
  PLAYLISTS: '/me/playlists',
  
  // Playback endpoints
  CURRENT_PLAYBACK: '/me/player',
  PLAY_TRACK: '/me/player/play',
  PAUSE_PLAYBACK: '/me/player/pause',
  NEXT_TRACK: '/me/player/next',
  PREVIOUS_TRACK: '/me/player/previous',
  SEEK_POSITION: '/me/player/seek',
  SET_VOLUME: '/me/player/volume',
  
  // Search endpoints
  SEARCH: '/search',
  
  // Track endpoints
  TRACK_FEATURES: '/audio-features',
  TRACK_ANALYSIS: '/audio-analysis',
  
  // Playlist endpoints
  CREATE_PLAYLIST: '/users/{user_id}/playlists',
  ADD_TO_PLAYLIST: '/playlists/{playlist_id}/tracks',
  
  // Recommendations
  RECOMMENDATIONS: '/recommendations'
};

// Workout music genres and BPM ranges
export const WORKOUT_MUSIC_CONFIG = {
  GENRES: {
    CARDIO: ['pop', 'dance', 'electronic', 'hip-hop', 'rock'],
    STRENGTH: ['rock', 'metal', 'hip-hop', 'electronic'],
    YOGA: ['ambient', 'classical', 'jazz', 'folk'],
    COOLDOWN: ['ambient', 'classical', 'jazz', 'chill']
  },
  
  BPM_RANGES: {
    WARMUP: { min: 80, max: 100 },
    CARDIO: { min: 120, max: 140 },
    HIGH_INTENSITY: { min: 140, max: 160 },
    STRENGTH: { min: 100, max: 130 },
    COOLDOWN: { min: 60, max: 80 }
  },
  
  ENERGY_LEVELS: {
    LOW: { min: 0.2, max: 0.4 },
    MEDIUM: { min: 0.4, max: 0.7 },
    HIGH: { min: 0.7, max: 1.0 }
  }
};

// Spotify authentication response types
export interface SpotifyAuthResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
  refresh_token: string;
  scope: string;
}

export interface SpotifyUser {
  id: string;
  display_name: string;
  email: string;
  images: Array<{ url: string; height: number; width: number }>;
  country: string;
  product: string;
  type: string;
  uri: string;
}

export interface SpotifyTrack {
  id: string;
  name: string;
  artists: Array<{ id: string; name: string }>;
  album: {
    id: string;
    name: string;
    images: Array<{ url: string; height: number; width: number }>;
  };
  duration_ms: number;
  popularity: number;
  uri: string;
  external_urls: { spotify: string };
}

export interface SpotifyPlaylist {
  id: string;
  name: string;
  description: string;
  images: Array<{ url: string; height: number; width: number }>;
  tracks: {
    total: number;
    items: Array<{ track: SpotifyTrack }>;
  };
  owner: {
    id: string;
    display_name: string;
  };
  public: boolean;
  collaborative: boolean;
}

export interface SpotifyAudioFeatures {
  id: string;
  danceability: number;
  energy: number;
  key: number;
  loudness: number;
  mode: number;
  speechiness: number;
  acousticness: number;
  instrumentalness: number;
  liveness: number;
  valence: number;
  tempo: number;
  duration_ms: number;
  time_signature: number;
}

export interface SpotifyRecommendations {
  tracks: SpotifyTrack[];
  seeds: Array<{
    afterFilteringSize: number;
    afterRelinkingSize: number;
    href: string;
    id: string;
    initialPoolSize: number;
    type: string;
  }>;
}
