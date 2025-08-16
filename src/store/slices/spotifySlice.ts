import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { spotifyAuth } from '../../services/spotifyAuth';
import { spotifyApi } from '../../services/spotifyApi';
import { SpotifyTrack, SpotifyPlaylist, SpotifyUser } from '../../config/spotify';

// Async thunks
export const authenticateSpotify = createAsyncThunk(
  'spotify/authenticate',
  async () => {
    const result = await spotifyAuth.authenticate();
    return result;
  }
);

export const fetchUserProfile = createAsyncThunk(
  'spotify/fetchUserProfile',
  async () => {
    const userData = await spotifyAuth.fetchUserProfile();
    return userData;
  }
);

export const fetchTopTracks = createAsyncThunk(
  'spotify/fetchTopTracks',
  async (limit: number = 20) => {
    const tracks = await spotifyApi.getTopTracks(limit);
    return tracks;
  }
);

export const fetchUserPlaylists = createAsyncThunk(
  'spotify/fetchUserPlaylists',
  async (limit: number = 20) => {
    const playlists = await spotifyApi.getUserPlaylists(limit);
    return playlists;
  }
);

export const fetchPlaylistTracks = createAsyncThunk(
  'spotify/fetchPlaylistTracks',
  async ({ playlistId, limit }: { playlistId: string; limit?: number }) => {
    const tracks = await spotifyApi.getPlaylistTracks(playlistId, limit || 50);
    return { playlistId, tracks };
  }
);

export const playPlaylist = createAsyncThunk(
  'spotify/playPlaylist',
  async ({ playlistUri, trackOffset }: { playlistUri: string; trackOffset?: number }) => {
    const success = await spotifyApi.playPlaylist(playlistUri, trackOffset || 0);
    return { success, playlistUri };
  }
);

export const getWorkoutRecommendations = createAsyncThunk(
  'spotify/getWorkoutRecommendations',
  async ({ workoutType, limit }: { workoutType: 'cardio' | 'strength' | 'yoga' | 'cooldown'; limit: number }) => {
    const tracks = await spotifyApi.getWorkoutRecommendations(workoutType, limit);
    return { workoutType, tracks };
  }
);

export const searchTracks = createAsyncThunk(
  'spotify/searchTracks',
  async ({ query, limit }: { query: string; limit: number }) => {
    const tracks = await spotifyApi.searchTracks(query, limit);
    return { query, tracks };
  }
);

export const playTrack = createAsyncThunk(
  'spotify/playTrack',
  async ({ trackUri, positionMs }: { trackUri?: string; positionMs?: number }, thunkAPI) => {
    const token = await spotifyAuth.getValidAccessToken();
    if (!token) return thunkAPI.rejectWithValue('No token');

    let body: any = {};
    if (trackUri) body.uris = [trackUri];
    if (positionMs !== undefined) body.position_ms = positionMs;

    const res = await fetch('https://api.spotify.com/v1/me/player/play', {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(Object.keys(body).length ? body : undefined),
    });

    if (res.status === 204) return { success: true };
    else throw new Error(await res.text());
  }
);


export const pausePlayback = createAsyncThunk(
  'spotify/pausePlayback',
  async (_, thunkAPI) => {
    const result = await spotifyApi.pausePlayback();
    return result;
  }
);


export const resumePlayback = createAsyncThunk(
  'spotify/resumePlayback',
  async () => {
    const result = await spotifyApi.resumePlayback();
    return result;
  }
);

export const nextTrack = createAsyncThunk(
  'spotify/nextTrack',
  async () => {
    const result = await spotifyApi.nextTrack();
    return result;
  }
);

export const previousTrack = createAsyncThunk(
  'spotify/previousTrack',
  async () => {
    const result = await spotifyApi.previousTrack();
    return result;
  }
);

export const fetchCurrentPlayback = createAsyncThunk(
  'spotify/fetchCurrentPlayback',
  async () => {
    const playback = await spotifyApi.getCurrentPlayback();
    return playback;
  }
);

// Spotify state interface
interface SpotifyState {
  // Authentication
  isAuthenticated: boolean;
  user: SpotifyUser | null;
  authLoading: boolean;
  authError: string | null;

  // Music data
  topTracks: SpotifyTrack[];
  userPlaylists: SpotifyPlaylist[];
  playlistTracks: { [playlistId: string]: SpotifyTrack[] };
  searchResults: SpotifyTrack[];
  workoutRecommendations: {
    cardio: SpotifyTrack[];
    strength: SpotifyTrack[];
    yoga: SpotifyTrack[];
    cooldown: SpotifyTrack[];
  };
  
  // Playback
  currentTrack: SpotifyTrack | null;
  currentPlayback: any | null;
  isPlaying: boolean;
  playbackLoading: boolean;
  playbackError: string | null;
  
  // UI state
  loading: boolean;
  error: string | null;
  
  // Internal flags
  isPauseInProgress: boolean;
  pauseTimestamp: number | null;
}

// Initial state
const initialState: SpotifyState = {
  isAuthenticated: false,
  user: null,
  authLoading: false,
  authError: null,
  
  topTracks: [],
  userPlaylists: [],
  playlistTracks: {},
  searchResults: [],
  
  workoutRecommendations: {
    cardio: [],
    strength: [],
    yoga: [],
    cooldown: [],
  },
  
  currentTrack: null,
  currentPlayback: null,
  isPlaying: false,
  playbackLoading: false,
  playbackError: null,
  
  loading: false,
  error: null,
  
  isPauseInProgress: false,
  pauseTimestamp: null,
};

// Spotify slice
const spotifySlice = createSlice({
  name: 'spotify',
  initialState,
  reducers: {
    // Initialize Spotify auth
    initializeSpotify: (state) => {
      state.authLoading = true;
    },
    
    // Set authentication state
    setAuthenticated: (state, action: PayloadAction<boolean>) => {
      state.isAuthenticated = action.payload;
      state.authLoading = false;
      if (!action.payload) {
        state.user = null;
        state.authError = null;
      }
    },
    
    // Set user data
    setUser: (state, action: PayloadAction<SpotifyUser>) => {
      state.user = action.payload;
      state.authLoading = false;
      state.authError = null;
    },
    
    // Set current track
    setCurrentTrack: (state, action: PayloadAction<SpotifyTrack | null>) => {
      state.currentTrack = action.payload;
    },
    
    // Set playing state
    setPlaying: (state, action: PayloadAction<boolean>) => {
      state.isPlaying = action.payload;
    },
    
    // Clear search results
    clearSearchResults: (state) => {
      state.searchResults = [];
    },
    
    // Clear errors
    clearError: (state) => {
      state.error = null;
      state.authError = null;
      state.playbackError = null;
    },
    
    // Logout
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      state.topTracks = [];
      state.userPlaylists = [];
      state.searchResults = [];
      state.workoutRecommendations = {
        cardio: [],
        strength: [],
        yoga: [],
        cooldown: [],
      };
      state.currentTrack = null;
      state.isPlaying = false;
      state.authError = null;
      state.playbackError = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Authenticate Spotify
      .addCase(authenticateSpotify.pending, (state) => {
        state.authLoading = true;
        state.authError = null;
      })
      .addCase(authenticateSpotify.fulfilled, (state, action) => {
        state.authLoading = false;
        state.isAuthenticated = !!action.payload;
        if (!action.payload) {
          state.authError = 'Authentication failed';
        }
      })
      .addCase(authenticateSpotify.rejected, (state, action) => {
        state.authLoading = false;
        state.authError = action.error.message || 'Authentication failed';
      })
      
      // Fetch user profile
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        state.user = action.payload;
        state.authLoading = false;
      })
      .addCase(fetchUserProfile.rejected, (state, action) => {
        state.authError = action.error.message || 'Failed to fetch user profile';
        state.authLoading = false;
      })
      
      // Fetch top tracks
      .addCase(fetchTopTracks.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTopTracks.fulfilled, (state, action) => {
        state.topTracks = action.payload;
        state.loading = false;
      })
      .addCase(fetchTopTracks.rejected, (state, action) => {
        state.error = action.error.message || 'Failed to fetch top tracks';
        state.loading = false;
      })
      
      // Fetch user playlists
      .addCase(fetchUserPlaylists.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUserPlaylists.fulfilled, (state, action) => {
        state.userPlaylists = action.payload;
        state.loading = false;
      })
      .addCase(fetchUserPlaylists.rejected, (state, action) => {
        state.error = action.error.message || 'Failed to fetch playlists';
        state.loading = false;
      })
      
      // Fetch playlist tracks
      .addCase(fetchPlaylistTracks.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchPlaylistTracks.fulfilled, (state, action) => {
        const { playlistId, tracks } = action.payload;
        state.playlistTracks[playlistId] = tracks;
        state.loading = false;
      })
      .addCase(fetchPlaylistTracks.rejected, (state, action) => {
        state.error = action.error.message || 'Failed to fetch playlist tracks';
        state.loading = false;
      })
      
      // Play playlist
      .addCase(playPlaylist.pending, (state) => {
        state.playbackLoading = true;
        state.playbackError = null;
      })
      .addCase(playPlaylist.fulfilled, (state, action) => {
        state.playbackLoading = false;
        if (action.payload.success) {
          state.isPlaying = true;
        } else {
          state.playbackError = 'Failed to play playlist';
        }
      })
      .addCase(playPlaylist.rejected, (state, action) => {
        state.playbackLoading = false;
        state.playbackError = action.error.message || 'Failed to play playlist';
      })
      
      // Get workout recommendations
      .addCase(getWorkoutRecommendations.pending, (state) => {
        state.loading = true;
      })
      .addCase(getWorkoutRecommendations.fulfilled, (state, action) => {
        const { workoutType, tracks } = action.payload;
        state.workoutRecommendations[workoutType] = tracks;
        state.loading = false;
      })
      .addCase(getWorkoutRecommendations.rejected, (state, action) => {
        state.error = action.error.message || 'Failed to get recommendations';
        state.loading = false;
      })
      
      // Search tracks
      .addCase(searchTracks.pending, (state) => {
        state.loading = true;
      })
      .addCase(searchTracks.fulfilled, (state, action) => {
        state.searchResults = action.payload.tracks;
        state.loading = false;
      })
      .addCase(searchTracks.rejected, (state, action) => {
        state.error = action.error.message || 'Search failed';
        state.loading = false;
      })
      
      // Play track
      .addCase(playTrack.pending, (state) => {
        state.playbackLoading = true;
        state.playbackError = null;
        state.isPauseInProgress = false; // Clear pause flags when playing
        state.pauseTimestamp = null;
      })
      .addCase(playTrack.fulfilled, (state, action) => {
        state.playbackLoading = false;
        if (action.payload.success) {
          state.isPlaying = true;
          console.log('🟢 Redux: Play successful, isPlaying set to true');
        } else {
          // playTrack doesn't return error property, so use generic message
          state.playbackError = 'Failed to play track';
        }
      })
      .addCase(playTrack.rejected, (state, action) => {
        state.playbackLoading = false;
        state.playbackError = action.error.message || 'Failed to play track';
      })
      
      // Pause playback
      .addCase(pausePlayback.pending, (state) => {
        state.playbackLoading = true;
        state.isPauseInProgress = true;
        state.pauseTimestamp = Date.now();
      })
      .addCase(pausePlayback.fulfilled, (state, action) => {
        state.playbackLoading = false;
        if (action.payload.success) {
          state.isPlaying = false;
          console.log('🔴 Redux: Pause successful, isPlaying set to false');
        } else {
          // pausePlayback doesn't return error property, so use generic message
          state.playbackError = 'Failed to pause playback';
          state.isPauseInProgress = false;
          state.pauseTimestamp = null;
        }
      })
      .addCase(pausePlayback.rejected, (state, action) => {
        state.playbackLoading = false;
        state.playbackError = action.error.message || 'Failed to pause playback';
        state.isPauseInProgress = false;
        state.pauseTimestamp = null;
      })
      
      // Resume playback
      .addCase(resumePlayback.pending, (state) => {
        state.playbackLoading = true;
        state.playbackError = null;
        state.isPauseInProgress = false; // Clear pause flags when resuming
        state.pauseTimestamp = null;
      })
      .addCase(resumePlayback.fulfilled, (state, action) => {
        state.playbackLoading = false;
        if (action.payload.success) {
          state.isPlaying = true;
          console.log('🟢 Redux: Resume successful, isPlaying set to true');
        } else {
          // resumePlayback doesn't return error property, so use generic message
          state.playbackError = 'Failed to resume playback';
        }
      })
      .addCase(resumePlayback.rejected, (state, action) => {
        state.playbackLoading = false;
        state.playbackError = action.error.message || 'Failed to resume playback';
      })
      
      // Next track
      .addCase(nextTrack.pending, (state) => {
        state.playbackLoading = true;
      })
      .addCase(nextTrack.fulfilled, (state, action) => {
        state.playbackLoading = false;
        if (!action.payload.success) {
          state.playbackError = action.payload.error || 'Failed to skip track';
        }
      })
      .addCase(nextTrack.rejected, (state, action) => {
        state.playbackLoading = false;
        state.playbackError = action.error.message || 'Failed to skip track';
      })
      
      // Previous track
      .addCase(previousTrack.pending, (state) => {
        state.playbackLoading = true;
      })
      .addCase(previousTrack.fulfilled, (state, action) => {
        state.playbackLoading = false;
        if (!action.payload.success) {
          state.playbackError = action.payload.error || 'Failed to go to previous track';
        }
      })
      .addCase(previousTrack.rejected, (state, action) => {
        state.playbackLoading = false;
        state.playbackError = action.error.message || 'Failed to go to previous track';
      })
      
      // Fetch current playback
      .addCase(fetchCurrentPlayback.pending, (state) => {
        state.playbackLoading = true;
      })
      .addCase(fetchCurrentPlayback.fulfilled, (state, action) => {
        state.currentPlayback = action.payload;
        
        if (action.payload && action.payload.is_playing !== undefined) {
          const now = Date.now();
          const timeSincePause = state.pauseTimestamp ? now - state.pauseTimestamp : 0;
          
          if (!state.isPauseInProgress || timeSincePause > 3000) {
            state.isPlaying = action.payload.is_playing;
            console.log('🔄 Redux: Fetch updated isPlaying to:', action.payload.is_playing);
          } else {
            console.log('🔄 Redux: Fetch ignored - pause in progress, time since pause:', timeSincePause, 'ms');
          }
          
          if (state.isPauseInProgress && timeSincePause > 3000) {
            state.isPauseInProgress = false;
            state.pauseTimestamp = null;
            console.log('🔄 Redux: Pause flags cleared');
          }
        }
        
        state.playbackLoading = false;
      })
      .addCase(fetchCurrentPlayback.rejected, (state, action) => {
        state.playbackLoading = false;
        state.playbackError = action.error.message || 'Failed to fetch current playback';
      });
  },
});

export const {
  initializeSpotify,
  setAuthenticated,
  setUser,
  setCurrentTrack,
  setPlaying,
  clearSearchResults,
  clearError,
  logout,
} = spotifySlice.actions;

export default spotifySlice.reducer;
