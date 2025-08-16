import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { Text, Button, Card, Title, Paragraph, IconButton, Avatar } from 'react-native-paper';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../store';
import { 
  playTrack, 
  nextTrack, 
  previousTrack, 
  fetchCurrentPlayback 
} from '../store/slices/spotifySlice';
import { BeatricTheme } from '../utils/theme';
import { SpotifyTrack } from '../config/spotify';

interface MusicPlayerProps {
  track?: SpotifyTrack;
  onTrackEnd?: () => void;
}

const MusicPlayer: React.FC<MusicPlayerProps> = ({ track, onTrackEnd }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { isAuthenticated, currentPlayback, loading, playbackError, isPlaying } = useSelector(
    (state: RootState) => state.spotify
  );

  const [currentTrack, setCurrentTrack] = useState<SpotifyTrack | null>(null);

  useEffect(() => {
    // Only set track from prop if there's no currentPlayback
    // This prevents prop from overriding Redux state
    if (track && !currentPlayback) {
      setCurrentTrack(track);
      console.log('🎵 MusicPlayer: Set initial track from prop:', track.name);
    }
  }, [track, currentPlayback]);

  useEffect(() => {
    if (currentPlayback && currentPlayback.item) {
      const newTrack = {
        id: currentPlayback.item.id,
        name: currentPlayback.item.name,
        artists: currentPlayback.item.artists,
        album: currentPlayback.item.album,
        duration_ms: currentPlayback.item.duration_ms,
        popularity: currentPlayback.item.popularity,
        uri: currentPlayback.item.uri,
        external_urls: currentPlayback.item.external_urls,
      };
      
      // Only update if the track actually changed
      if (!currentTrack || currentTrack.id !== newTrack.id) {
        setCurrentTrack(newTrack);
        console.log('🎵 MusicPlayer: Updated currentTrack from playback:', newTrack.name);
      }
    } else if (!currentPlayback && currentTrack) {
      // Clear track if no playback and we had a track
      setCurrentTrack(null);
      console.log('🎵 MusicPlayer: Cleared currentTrack - no playback');
    }
  }, [currentPlayback, currentTrack]);

  // Fetch current playback on component mount and periodically
  useEffect(() => {
    if (isAuthenticated) {
      dispatch(fetchCurrentPlayback());
      
      // Set up periodic refresh every 5 seconds
      const interval = setInterval(() => {
        dispatch(fetchCurrentPlayback());
      }, 5000);
      
      return () => clearInterval(interval);
    }
  }, [isAuthenticated, dispatch]);

  // Debug logging for state changes
  useEffect(() => {
    console.log('MusicPlayer - isPlaying state changed:', isPlaying);
    console.log('MusicPlayer - currentPlayback:', currentPlayback);
  }, [isPlaying, currentPlayback]);

  const handleNext = async () => {
    if (!isAuthenticated) return;

    try {
      console.log('🎵 MusicPlayer: Skipping to next track...');
      await dispatch(nextTrack()).unwrap();
      // Refresh current playback state immediately and after a delay
      dispatch(fetchCurrentPlayback());
      setTimeout(() => {
        dispatch(fetchCurrentPlayback());
      }, 1000);
    } catch (error) {
      console.error('Next track error:', error);
    }
  };

  const handlePrevious = async () => {
    if (!isAuthenticated) return;

    try {
      console.log('🎵 MusicPlayer: Going to previous track...');
      await dispatch(previousTrack()).unwrap();
      // Refresh current playback state immediately and after a delay
      dispatch(fetchCurrentPlayback());
      setTimeout(() => {
        dispatch(fetchCurrentPlayback());
      }, 1000);
    } catch (error) {
      console.error('Previous track error:', error);
    }
  };

  const handlePlayTrack = async (trackToPlay: SpotifyTrack) => {
    if (!isAuthenticated) return;

    try {
      console.log('🎵 MusicPlayer: Playing track:', trackToPlay.name);
      await dispatch(playTrack({ trackUri: trackToPlay.uri })).unwrap();
      
      // Don't set local state immediately - let Redux handle it
      // The currentPlayback will update and trigger the useEffect
      console.log('🎵 MusicPlayer: Track play request sent, waiting for Redux update...');
      
      // Refresh current playback immediately and after a delay
      dispatch(fetchCurrentPlayback());
      setTimeout(() => {
        dispatch(fetchCurrentPlayback());
      }, 1000);
    } catch (error) {
      console.error('Play track error:', error);
    }
  };

  const formatDuration = (ms: number) => {
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  if (!isAuthenticated) {
    return (
      <Card style={styles.card}>
        <Card.Content>
          <Title style={styles.title}>🎵 Music Player</Title>
          <Paragraph style={styles.subtitle}>Connect to Spotify to play music</Paragraph>
        </Card.Content>
      </Card>
    );
  }

  return (
    <Card style={styles.card}>
      <Card.Content>
        <Title style={styles.title}>🎵 Now Playing</Title>
        
        {currentTrack ? (
          <View style={styles.trackInfo}>
            {currentTrack.album.images && currentTrack.album.images[0] ? (
              <Image 
                source={{ uri: currentTrack.album.images[0].url }} 
                style={styles.albumArt}
              />
            ) : (
              <Avatar.Icon 
                size={80} 
                icon="music" 
                style={styles.albumArt}
                color={BeatricTheme.primary}
              />
            )}
            <View style={styles.trackDetails}>
              <Text style={styles.trackName} numberOfLines={2}>
                {loading ? 'Updating...' : currentTrack.name}
              </Text>
              <Text style={styles.artistName} numberOfLines={1}>
                {loading ? 'Please wait...' : currentTrack.artists.map(artist => artist.name).join(', ')}
              </Text>
              <Text style={styles.albumName} numberOfLines={1}>
                {loading ? '' : currentTrack.album.name}
              </Text>
            </View>
          </View>
        ) : (
          <Paragraph style={styles.noTrack}>
            {loading ? 'Loading track info...' : 'No track playing'}
          </Paragraph>
        )}

        {/* Music Controls - Play/Pause removed for now */}
        <View style={styles.controls}>
          <IconButton
            icon="skip-previous"
            size={32}
            onPress={handlePrevious}
            disabled={loading || !currentTrack}
            iconColor={BeatricTheme.primary}
          />
          
          <IconButton
            icon="skip-next"
            size={32}
            onPress={handleNext}
            disabled={loading}
            iconColor={BeatricTheme.primary}
          />
        </View>
        
        {/* Debug info - remove in production */}
        {__DEV__ && (
          <View style={styles.debugInfo}>
            <Text style={styles.debugText}>Debug: isPlaying = {isPlaying.toString()}</Text>
            <Text style={styles.debugText}>Loading: {loading.toString()}</Text>
            <Text style={styles.debugText}>Has Track: {(currentTrack !== null).toString()}</Text>
          </View>
        )}

        {currentTrack && (
          <View style={styles.trackStats}>
            <Text style={styles.duration}>
              Duration: {formatDuration(currentTrack.duration_ms)}
            </Text>
            <Text style={styles.popularity}>
              Popularity: {currentTrack.popularity}%
            </Text>
          </View>
        )}

        {playbackError && (
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>{playbackError}</Text>
          </View>
        )}
      </Card.Content>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: BeatricTheme.surface,
    marginBottom: 16,
    elevation: 2,
  },
  title: {
    color: BeatricTheme.textPrimary,
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  subtitle: {
    color: BeatricTheme.textSecondary,
    fontSize: 14,
  },
  trackInfo: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  albumArt: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 12,
  },
  trackDetails: {
    flex: 1,
    justifyContent: 'center',
  },
  trackName: {
    color: BeatricTheme.textPrimary,
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  artistName: {
    color: BeatricTheme.primary,
    fontSize: 14,
    marginBottom: 2,
  },
  albumName: {
    color: BeatricTheme.textSecondary,
    fontSize: 12,
  },
  noTrack: {
    color: BeatricTheme.textSecondary,
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 16,
  },
  controls: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  trackStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  duration: {
    color: BeatricTheme.textSecondary,
    fontSize: 12,
  },
  popularity: {
    color: BeatricTheme.textSecondary,
    fontSize: 12,
  },
  errorContainer: {
    marginTop: 8,
    padding: 8,
    backgroundColor: BeatricTheme.error + '20',
    borderRadius: 4,
  },
  errorText: {
    color: BeatricTheme.error,
    fontSize: 12,
    textAlign: 'center',
  },
  debugInfo: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 8,
    padding: 8,
    backgroundColor: BeatricTheme.surface + '20',
    borderRadius: 4,
  },
  debugText: {
    color: BeatricTheme.textSecondary,
    fontSize: 12,
  },
});

export default MusicPlayer;
