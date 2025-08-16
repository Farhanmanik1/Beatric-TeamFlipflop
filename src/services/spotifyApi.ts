/**
 * Spotify API Service
 * Handles all Spotify API calls for music operations
 */

import { spotifyAuth } from './spotifyAuth';
import { 
  SPOTIFY_CONFIG, 
  SPOTIFY_ENDPOINTS, 
  WORKOUT_MUSIC_CONFIG,
  SpotifyTrack, 
  SpotifyPlaylist, 
  SpotifyAudioFeatures, 
  SpotifyRecommendations 
} from '../config/spotify';

export class SpotifyApiService {
  private static instance: SpotifyApiService;

  private constructor() {}

  public static getInstance(): SpotifyApiService {
    if (!SpotifyApiService.instance) {
      SpotifyApiService.instance = new SpotifyApiService();
    }
    return SpotifyApiService.instance;
  }

  /**
   * Search for tracks
   */
  async searchTracks(query: string, limit: number = 20): Promise<SpotifyTrack[]> {
    try {
      const token = await spotifyAuth.getValidAccessToken();
      if (!token) throw new Error('No valid access token');

      const response = await fetch(
        `${SPOTIFY_CONFIG.API_BASE_URL}${SPOTIFY_ENDPOINTS.SEARCH}?q=${encodeURIComponent(query)}&type=track&limit=${limit}`,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        return data.tracks.items;
      } else {
        throw new Error(`Search failed: ${response.statusText}`);
      }
    } catch (error) {
      console.error('Search tracks error:', error);
      return [];
    }
  }

  /**
   * Get workout music recommendations based on workout type
   */
  async getWorkoutRecommendations(
    workoutType: 'cardio' | 'strength' | 'yoga' | 'cooldown',
    limit: number = 20
  ): Promise<SpotifyTrack[]> {
    try {
      const token = await spotifyAuth.getValidAccessToken();
      if (!token) throw new Error('No valid access token');

      const genres = WORKOUT_MUSIC_CONFIG.GENRES[workoutType.toUpperCase() as keyof typeof WORKOUT_MUSIC_CONFIG.GENRES];
      const bpmRange = WORKOUT_MUSIC_CONFIG.BPM_RANGES[workoutType.toUpperCase() as keyof typeof WORKOUT_MUSIC_CONFIG.BPM_RANGES];
      const energyLevel = this.getEnergyLevelForWorkoutType(workoutType);

      const params = new URLSearchParams({
        seed_genres: genres.slice(0, 5).join(','), // Spotify allows max 5 seed genres
        target_tempo: ((bpmRange.min + bpmRange.max) / 2).toString(),
        min_tempo: bpmRange.min.toString(),
        max_tempo: bpmRange.max.toString(),
        target_energy: energyLevel.toString(),
        min_energy: (energyLevel - 0.2).toString(),
        max_energy: (energyLevel + 0.2).toString(),
        limit: limit.toString(),
        market: 'from_token',
      });

      const response = await fetch(
        `${SPOTIFY_CONFIG.API_BASE_URL}${SPOTIFY_ENDPOINTS.RECOMMENDATIONS}?${params}`,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        const data: SpotifyRecommendations = await response.json();
        return data.tracks;
      } else {
        throw new Error(`Recommendations failed: ${response.statusText}`);
      }
    } catch (error) {
      console.error('Get workout recommendations error:', error);
      return [];
    }
  }

  /**
   * Get user's top tracks
   */
  async getTopTracks(limit: number = 20): Promise<SpotifyTrack[]> {
    try {
      const token = await spotifyAuth.getValidAccessToken();
      if (!token) throw new Error('No valid access token');

      const response = await fetch(
        `${SPOTIFY_CONFIG.API_BASE_URL}${SPOTIFY_ENDPOINTS.TOP_TRACKS}?limit=${limit}&time_range=short_term`,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        return data.items;
      } else {
        throw new Error(`Get top tracks failed: ${response.statusText}`);
      }
    } catch (error) {
      console.error('Get top tracks error:', error);
      return [];
    }
  }

  /**
   * Get user's playlists
   */
  async getUserPlaylists(limit: number = 20): Promise<SpotifyPlaylist[]> {
    try {
      const token = await spotifyAuth.getValidAccessToken();
      if (!token) throw new Error('No valid access token');

      const response = await fetch(
        `${SPOTIFY_CONFIG.API_BASE_URL}${SPOTIFY_ENDPOINTS.PLAYLISTS}?limit=${limit}`,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        return data.items;
      } else {
        throw new Error(`Get playlists failed: ${response.statusText}`);
      }
    } catch (error) {
      console.error('Get user playlists error:', error);
      return [];
    }
  }

  /**
   * Get playlist tracks
   */
  async getPlaylistTracks(playlistId: string, limit: number = 50): Promise<SpotifyTrack[]> {
    try {
      const token = await spotifyAuth.getValidAccessToken();
      if (!token) throw new Error('No valid access token');

      const response = await fetch(
        `${SPOTIFY_CONFIG.API_BASE_URL}/playlists/${playlistId}/tracks?limit=${limit}`,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        return data.items.map((item: any) => item.track).filter((track: any) => track !== null);
      } else {
        throw new Error(`Get playlist tracks failed: ${response.statusText}`);
      }
    } catch (error) {
      console.error('Get playlist tracks error:', error);
      return [];
    }
  }

  /**
   * Get audio features for tracks
   */
  async getAudioFeatures(trackIds: string[]): Promise<SpotifyAudioFeatures[]> {
    try {
      const token = await spotifyAuth.getValidAccessToken();
      if (!token) throw new Error('No valid access token');

      const response = await fetch(
        `${SPOTIFY_CONFIG.API_BASE_URL}${SPOTIFY_ENDPOINTS.TRACK_FEATURES}?ids=${trackIds.join(',')}`,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        return data.audio_features.filter((features: SpotifyAudioFeatures) => features !== null);
      } else {
        throw new Error(`Get audio features failed: ${response.statusText}`);
      }
    } catch (error) {
      console.error('Get audio features error:', error);
      return [];
    }
  }

  /**
   * Get current playback state
   */
  async getCurrentPlayback(): Promise<any> {
    try {
      const token = await spotifyAuth.getValidAccessToken();
      if (!token) throw new Error('No valid access token');

      const response = await fetch(
        `${SPOTIFY_CONFIG.API_BASE_URL}${SPOTIFY_ENDPOINTS.CURRENT_PLAYBACK}`,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        }
      );

      // Handle 204 No Content (no active playback)
      if (response.status === 204) {
        console.log('No active playback found');
        return null;
      }

      if (response.ok) {
        const text = await response.text();
        if (!text) {
          console.log('Empty response from Spotify API');
          return null;
        }
        
        try {
          return JSON.parse(text);
        } catch (parseError) {
          console.error('JSON parse error:', parseError, 'Response text:', text);
          return null;
        }
      } else {
        console.error(`Get current playback failed: ${response.status} ${response.statusText}`);
        return null;
      }
    } catch (error) {
      console.error('Get current playback error:', error);
      return null;
    }
  }

  /**
   * Resume playback (resume from where it was paused)
   */
  async resumePlayback(): Promise<{ success: boolean; error?: string }> {
    try {
      console.log('🟢 ResumePlayback: Starting resume request...');
      const token = await spotifyAuth.getValidAccessToken();
      if (!token) throw new Error('No valid access token');

      // Always get the current playback state to get the most recent position
      const currentPlayback = await this.getCurrentPlayback();
      if (!currentPlayback || !currentPlayback.item) {
        return { success: false, error: 'No track to resume' };
      }

      console.log('🟢 ResumePlayback: Got current playback, resuming track:', currentPlayback.item.name);
      console.log('🟢 ResumePlayback: Current position:', currentPlayback.progress_ms, 'ms');

      // Resume by playing the same track from the current position
      const response = await fetch(
        `${SPOTIFY_CONFIG.API_BASE_URL}${SPOTIFY_ENDPOINTS.PLAY_TRACK}`,
        {
          method: 'PUT',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            uris: [currentPlayback.item.uri],
            position_ms: currentPlayback.progress_ms || 0,
          }),
        }
      );

      console.log('🟢 ResumePlayback: Response status:', response.status);

      if (response.ok) {
        console.log('🟢 ResumePlayback: Resume successful!');
        return { success: true };
      } else {
        const errorText = await response.text();
        console.error('🟢 ResumePlayback: Resume failed:', response.status, errorText);
        
        if (response.status === 403) {
          return { success: false, error: 'Premium account required for playback control' };
        } else if (response.status === 404) {
          return { success: false, error: 'No active device found. Open Spotify app first' };
        } else {
          return { success: false, error: `Resume failed: ${response.status} ${response.statusText}` };
        }
      }
    } catch (error) {
      console.error('🟢 ResumePlayback: Error occurred:', error);
      return { success: false, error: 'Network error occurred' };
    }
  }

  /**
   * Play a track or playlist
   */
  async playTrack(trackUri: string, positionMs: number = 0): Promise<{ success: boolean; error?: string }> {
    try {
      const token = await spotifyAuth.getValidAccessToken();
      if (!token) throw new Error('No valid access token');

      const response = await fetch(
        `${SPOTIFY_CONFIG.API_BASE_URL}${SPOTIFY_ENDPOINTS.PLAY_TRACK}`,
        {
          method: 'PUT',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            uris: [trackUri],
            position_ms: positionMs,
          }),
        }
      );

      if (response.ok) {
        return { success: true };
      } else {
        const errorText = await response.text();
        console.error('Play track failed:', response.status, errorText);
        
        if (response.status === 403) {
          return { success: false, error: 'Premium account required for playback control' };
        } else if (response.status === 404) {
          return { success: false, error: 'No active device found. Open Spotify app first' };
        } else if (response.status === 429) {
          return { success: false, error: 'Rate limit exceeded. Try again later' };
        } else {
          return { success: false, error: `Playback failed: ${response.status} ${response.statusText}` };
        }
      }
    } catch (error) {
      console.error('Play track error:', error);
      return { success: false, error: 'Network error occurred' };
    }
  }

  /**
   * Play a playlist
   */
  async playPlaylist(playlistUri: string, trackOffset: number = 0): Promise<boolean> {
    try {
      const token = await spotifyAuth.getValidAccessToken();
      if (!token) throw new Error('No valid access token');

      const response = await fetch(
        `${SPOTIFY_CONFIG.API_BASE_URL}${SPOTIFY_ENDPOINTS.PLAY_TRACK}`,
        {
          method: 'PUT',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            context_uri: playlistUri,
            offset: { position: trackOffset },
          }),
        }
      );

      return response.ok;
    } catch (error) {
      console.error('Play playlist error:', error);
      return false;
    }
  }

  /**
   * Pause playback
   */
  async pausePlayback(): Promise<{ success: boolean; error?: string }> {
    try {
      console.log('🔴 PausePlayback: Starting pause request...');
      const token = await spotifyAuth.getValidAccessToken();
      if (!token) throw new Error('No valid access token');

      console.log('🔴 PausePlayback: Got valid token, making API request...');
      const response = await fetch(
        `${SPOTIFY_CONFIG.API_BASE_URL}${SPOTIFY_ENDPOINTS.PAUSE_PLAYBACK}`,
        {
          method: 'PUT',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        }
      );

      console.log('🔴 PausePlayback: Response status:', response.status);
      console.log('🔴 PausePlayback: Response headers:', Object.fromEntries(response.headers.entries()));

      if (response.ok) {
        console.log('🔴 PausePlayback: Pause successful!');
        return { success: true };
      } else {
        const errorText = await response.text();
        console.error('🔴 PausePlayback: Pause failed:', response.status, errorText);
        
        if (response.status === 403) {
          return { success: false, error: 'Premium account required for playback control' };
        } else if (response.status === 404) {
          return { success: false, error: 'No active device found. Open Spotify app first' };
        } else {
          return { success: false, error: `Pause failed: ${response.status} ${response.statusText}` };
        }
      }
    } catch (error) {
      console.error('🔴 PausePlayback: Error occurred:', error);
      return { success: false, error: 'Network error occurred' };
    }
  }

  /**
   * Skip to next track
   */
  async nextTrack(): Promise<{ success: boolean; error?: string }> {
    try {
      const token = await spotifyAuth.getValidAccessToken();
      if (!token) throw new Error('No valid access token');

      const response = await fetch(
        `${SPOTIFY_CONFIG.API_BASE_URL}${SPOTIFY_ENDPOINTS.NEXT_TRACK}`,
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        return { success: true };
      } else {
        const errorText = await response.text();
        console.error('Next track failed:', response.status, errorText);
        
        if (response.status === 403) {
          return { success: false, error: 'Premium account required for playback control' };
        } else if (response.status === 404) {
          return { success: false, error: 'No active device found. Open Spotify app first' };
        } else {
          return { success: false, error: `Skip failed: ${response.status} ${response.statusText}` };
        }
      }
    } catch (error) {
      console.error('Next track error:', error);
      return { success: false, error: 'Network error occurred' };
    }
  }

  /**
   * Skip to previous track
   */
  async previousTrack(): Promise<{ success: boolean; error?: string }> {
    try {
      const token = await spotifyAuth.getValidAccessToken();
      if (!token) throw new Error('No valid access token');

      const response = await fetch(
        `${SPOTIFY_CONFIG.API_BASE_URL}${SPOTIFY_ENDPOINTS.PREVIOUS_TRACK}`,
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        return { success: true };
      } else {
        const errorText = await response.text();
        console.error('Previous track failed:', response.status, errorText);
        
        if (response.status === 403) {
          return { success: false, error: 'Premium account required for playback control' };
        } else if (response.status === 404) {
          return { success: false, error: 'No active device found. Open Spotify app first' };
        } else {
          return { success: false, error: `Previous failed: ${response.status} ${response.statusText}` };
        }
      }
    } catch (error) {
      console.error('Previous track error:', error);
      return { success: false, error: 'Network error occurred' };
    }
  }

  /**
   * Set playback volume
   */
  async setVolume(volumePercent: number): Promise<boolean> {
    try {
      const token = await spotifyAuth.getValidAccessToken();
      if (!token) throw new Error('No valid access token');

      const response = await fetch(
        `${SPOTIFY_CONFIG.API_BASE_URL}${SPOTIFY_ENDPOINTS.SET_VOLUME}?volume_percent=${Math.max(0, Math.min(100, volumePercent))}`,
        {
          method: 'PUT',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        }
      );

      return response.ok;
    } catch (error) {
      console.error('Set volume error:', error);
      return false;
    }
  }

  /**
   * Create a workout playlist
   */
  async createWorkoutPlaylist(
    name: string, 
    description: string, 
    trackUris: string[]
  ): Promise<string | null> {
    try {
      const token = await spotifyAuth.getValidAccessToken();
      if (!token) throw new Error('No valid access token');

      const userData = spotifyAuth.getUserData();
      if (!userData) throw new Error('No user data available');

      // Create playlist
      const createResponse = await fetch(
        `${SPOTIFY_CONFIG.API_BASE_URL}${SPOTIFY_ENDPOINTS.CREATE_PLAYLIST.replace('{user_id}', userData.id)}`,
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name,
            description,
            public: false,
          }),
        }
      );

      if (!createResponse.ok) {
        throw new Error(`Create playlist failed: ${createResponse.statusText}`);
      }

      const playlist = await createResponse.json();

      // Add tracks to playlist
      if (trackUris.length > 0) {
        const addTracksResponse = await fetch(
          `${SPOTIFY_CONFIG.API_BASE_URL}${SPOTIFY_ENDPOINTS.ADD_TO_PLAYLIST.replace('{playlist_id}', playlist.id)}`,
          {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              uris: trackUris,
            }),
          }
        );

        if (!addTracksResponse.ok) {
          console.error('Failed to add tracks to playlist');
        }
      }

      return playlist.id;
    } catch (error) {
      console.error('Create workout playlist error:', error);
      return null;
    }
  }

  /**
   * Get energy level for workout type
   */
  private getEnergyLevelForWorkoutType(workoutType: string): number {
    switch (workoutType) {
      case 'cardio':
        return 0.8;
      case 'strength':
        return 0.7;
      case 'yoga':
        return 0.3;
      case 'cooldown':
        return 0.2;
      default:
        return 0.5;
    }
  }
}

// Export singleton instance
export const spotifyApi = SpotifyApiService.getInstance();
