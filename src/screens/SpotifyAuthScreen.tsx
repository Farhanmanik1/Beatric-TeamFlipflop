import React, { useEffect } from 'react';
import { View, StyleSheet, ScrollView, Alert } from 'react-native';
import { Text, Button, Card, Title, Paragraph, Surface, IconButton } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { AppDispatch } from '../store';
import { authenticateSpotify, fetchUserProfile, fetchTopTracks, fetchUserPlaylists, playTrack, fetchPlaylistTracks, playPlaylist } from '../store/slices/spotifySlice';
import { BeatricTheme } from '../utils/theme';
import MusicPlayer from '../components/MusicPlayer';

const SpotifyAuthScreen = ({ navigation }: any) => {
  const dispatch = useDispatch<AppDispatch>();
  const { isAuthenticated, user, authLoading, authError, loading, topTracks, userPlaylists, playlistTracks } = useSelector(
    (state: RootState) => state.spotify
  );

  const handlePlayTrack = async (track: any) => {
    try {
      const result = await dispatch(playTrack({ trackUri: track.uri })).unwrap();
      if (result.success) {
        Alert.alert('Success', `Playing: ${track.name}`);
      } else {
        Alert.alert('Playback Error', result.error || 'Failed to play track');
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to play track. Make sure Spotify app is open on your device.');
    }
  };

  const handlePlayPlaylist = async (playlist: any) => {
    try {
      await dispatch(playPlaylist({ playlistUri: playlist.uri })).unwrap();
      Alert.alert('Success', `Playing playlist: ${playlist.name}`);
    } catch (error) {
      Alert.alert('Error', 'Failed to play playlist. Make sure Spotify app is open on your device.');
    }
  };

  const handleViewPlaylistTracks = async (playlist: any) => {
    try {
      await dispatch(fetchPlaylistTracks({ playlistId: playlist.id })).unwrap();
      Alert.alert('Success', `Loaded ${playlistTracks[playlist.id]?.length || 0} tracks from ${playlist.name}`);
    } catch (error) {
      Alert.alert('Error', 'Failed to load playlist tracks.');
    }
  };

  useEffect(() => {
    // Check if already authenticated
    if (isAuthenticated && user) {
      // Load user data
      dispatch(fetchTopTracks(10));
      dispatch(fetchUserPlaylists(10));
      console.log('Spotify user loaded:', user);
    }
  }, [isAuthenticated, user, dispatch]);

  const handleConnectSpotify = async () => {
    try {
      const result = await dispatch(authenticateSpotify()).unwrap();
      if (result) {
        // Fetch user profile after successful authentication
        await dispatch(fetchUserProfile()).unwrap();
        Alert.alert('Success', 'Spotify connected successfully!');
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to connect Spotify. Please try again.');
    }
  };

  const handleDisconnectSpotify = () => {
    Alert.alert(
      'Disconnect Spotify',
      'Are you sure you want to disconnect your Spotify account?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Disconnect', style: 'destructive', onPress: () => {
          // TODO: Implement disconnect logic
          Alert.alert('Disconnected', 'Spotify account disconnected.');
        }},
      ]
    );
  };

  const formatDuration = (ms: number) => {
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <Surface style={styles.header}>
        <Title style={styles.title}>Beatric Music</Title>
        <Paragraph style={styles.subtitle}>Connect your Spotify account</Paragraph>
      </Surface>

      <ScrollView style={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Spotify Connection Card */}
        <Card style={styles.card}>
          <Card.Content>
            <Title style={styles.cardTitle}>Spotify Integration</Title>
            <Paragraph style={styles.cardText}>
              Connect your Spotify account to get personalized workout music recommendations and control playback during your workouts.
            </Paragraph>
            
            {!isAuthenticated ? (
              <Button
                mode="contained"
                onPress={handleConnectSpotify}
                loading={authLoading}
                disabled={authLoading}
                style={styles.connectButton}
                buttonColor={BeatricTheme.primary}
                textColor={BeatricTheme.textPrimary}
              >
                {authLoading ? 'Connecting...' : 'Connect Spotify'}
              </Button>
            ) : (
              <View style={styles.connectedSection}>
                <View style={styles.userInfo}>
                  <Title style={styles.userName}>{user?.display_name}</Title>
                  <Paragraph style={styles.userEmail}>{user?.email}</Paragraph>
                </View>
                <Button
                  mode="outlined"
                  onPress={handleDisconnectSpotify}
                  style={styles.disconnectButton}
                  textColor={BeatricTheme.error}
                  buttonColor="transparent"
                >
                  Disconnect
                </Button>
              </View>
            )}

            {authError && (
              <Text style={styles.errorText}>{authError}</Text>
            )}
          </Card.Content>
        </Card>

        {/* Features Card */}
        <Card style={styles.card}>
          <Card.Content>
            <Title style={styles.cardTitle}>Features</Title>
            <View style={styles.featureList}>
              <View style={styles.featureItem}>
                <Text style={styles.featureIcon}>🎵</Text>
                <View style={styles.featureText}>
                  <Text style={styles.featureTitle}>Workout Music</Text>
                  <Text style={styles.featureDescription}>Get music recommendations based on your workout type</Text>
                </View>
              </View>
              
              <View style={styles.featureItem}>
                <Text style={styles.featureIcon}>🎧</Text>
                <View style={styles.featureText}>
                  <Text style={styles.featureTitle}>Playback Control</Text>
                  <Text style={styles.featureDescription}>Control music playback during workouts</Text>
                </View>
              </View>
              
              <View style={styles.featureItem}>
                <Text style={styles.featureIcon}>📊</Text>
                <View style={styles.featureText}>
                  <Text style={styles.featureTitle}>Music Analytics</Text>
                  <Text style={styles.featureDescription}>Track your music preferences and workout performance</Text>
                </View>
              </View>
              
              <View style={styles.featureItem}>
                <Text style={styles.featureIcon}>🎯</Text>
                <View style={styles.featureText}>
                  <Text style={styles.featureTitle}>BPM Matching</Text>
                  <Text style={styles.featureDescription}>Music matched to your workout intensity</Text>
                </View>
              </View>
            </View>
          </Card.Content>
        </Card>

        {/* Music Player */}
        {isAuthenticated && (
          <MusicPlayer />
        )}

        {/* User's Top Tracks */}
        {isAuthenticated && topTracks.length > 0 && (
          <Card style={styles.card}>
            <Card.Content>
              <Title style={styles.cardTitle}>Your Top Tracks</Title>
              <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.tracksScroll}>
                {topTracks.slice(0, 5).map((track, index) => (
                  <View key={track.id} style={styles.trackItem}>
                    <Text style={styles.trackName} numberOfLines={2}>
                      {track.name}
                    </Text>
                    <Text style={styles.trackArtist} numberOfLines={1}>
                      {track.artists[0]?.name}
                    </Text>
                    <IconButton
                      icon="play"
                      size={20}
                      iconColor={BeatricTheme.primary}
                      onPress={() => handlePlayTrack(track)}
                      style={styles.playButton}
                    />
                  </View>
                ))}
              </ScrollView>
            </Card.Content>
          </Card>
        )}

        {/* User's Playlists */}
        {isAuthenticated && userPlaylists.length > 0 && (
          <Card style={styles.card}>
            <Card.Content>
              <Title style={styles.cardTitle}>Your Playlists</Title>
              <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.playlistsScroll}>
                {userPlaylists.slice(0, 5).map((playlist) => (
                  <View key={playlist.id} style={styles.playlistItem}>
                    <Text style={styles.playlistName} numberOfLines={2}>
                      {playlist.name}
                    </Text>
                    <Text style={styles.playlistTracks}>
                      {playlist.tracks.total} tracks
                    </Text>
                    <View style={styles.playlistButtons}>
                      <IconButton
                        icon="play"
                        size={16}
                        iconColor={BeatricTheme.primary}
                        onPress={() => handlePlayPlaylist(playlist)}
                        style={styles.playlistButton}
                      />
                      <IconButton
                        icon="playlist-music"
                        size={16}
                        iconColor={BeatricTheme.secondary}
                        onPress={() => handleViewPlaylistTracks(playlist)}
                        style={styles.playlistButton}
                      />
                    </View>
                  </View>
                ))}
              </ScrollView>
            </Card.Content>
          </Card>
        )}

        {/* Playlist Tracks Display */}
        {isAuthenticated && Object.keys(playlistTracks).length > 0 && (
          <Card style={styles.card}>
            <Card.Content>
              <Title style={styles.cardTitle}>Playlist Tracks</Title>
              {Object.entries(playlistTracks).map(([playlistId, tracks]) => (
                <View key={playlistId} style={styles.playlistTracksContainer}>
                  <Text style={styles.playlistTracksTitle}>
                    {userPlaylists.find(p => p.id === playlistId)?.name || 'Playlist'} ({tracks.length} tracks)
                  </Text>
                  <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.tracksScroll}>
                    {tracks.slice(0, 10).map((track, index) => (
                      <View key={track.id} style={styles.trackItem}>
                        <Text style={styles.trackName} numberOfLines={2}>
                          {track.name}
                        </Text>
                        <Text style={styles.trackArtist} numberOfLines={1}>
                          {track.artists[0]?.name}
                        </Text>
                        <IconButton
                          icon="play"
                          size={16}
                          iconColor={BeatricTheme.primary}
                          onPress={() => handlePlayTrack(track)}
                          style={styles.playButton}
                        />
                      </View>
                    ))}
                  </ScrollView>
                </View>
              ))}
            </Card.Content>
          </Card>
        )}

        {/* Setup Instructions */}
        <Card style={styles.card}>
          <Card.Content>
            <Title style={styles.cardTitle}>Setup Instructions</Title>
            <Paragraph style={styles.cardText}>
              To use Spotify integration, you need to:
            </Paragraph>
            <View style={styles.instructions}>
              <Text style={styles.instructionText}>1. Have a Spotify Premium account</Text>
              <Text style={styles.instructionText}>2. Have Spotify app installed on your device</Text>
              <Text style={styles.instructionText}>3. Be logged into Spotify on your device</Text>
              <Text style={styles.instructionText}>4. Grant permissions when prompted</Text>
            </View>
          </Card.Content>
        </Card>

        {/* Navigation */}
        <View style={styles.navigationSection}>
          <Button
            mode="contained"
            onPress={() => navigation.navigate('MainTabs')}
            style={styles.navButton}
            buttonColor={BeatricTheme.secondary}
            textColor={BeatricTheme.textPrimary}
          >
            Go to Workout
          </Button>
          
          <Button
            mode="outlined"
            onPress={() => navigation.goBack()}
            style={styles.navButton}
            textColor={BeatricTheme.primary}
            buttonColor="transparent"
          >
            Back
          </Button>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BeatricTheme.background,
  },
  header: {
    backgroundColor: BeatricTheme.surface,
    paddingTop: 60,
    paddingBottom: 20,
    paddingHorizontal: 20,
    elevation: 4,
    zIndex: 1,
  },
  title: {
    color: BeatricTheme.textPrimary,
    fontSize: 28,
    fontWeight: 'bold',
  },
  subtitle: {
    color: BeatricTheme.textSecondary,
    fontSize: 16,
    marginTop: 4,
  },
  scrollContent: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  card: {
    backgroundColor: BeatricTheme.surface,
    marginBottom: 16,
    elevation: 2,
  },
  cardTitle: {
    color: BeatricTheme.textPrimary,
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  cardText: {
    color: BeatricTheme.textSecondary,
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 16,
  },
  connectButton: {
    marginTop: 8,
    borderRadius: 8,
  },
  connectedSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    color: BeatricTheme.textPrimary,
    fontSize: 18,
    fontWeight: 'bold',
  },
  userEmail: {
    color: BeatricTheme.textSecondary,
    fontSize: 14,
  },
  disconnectButton: {
    borderColor: BeatricTheme.error,
  },
  errorText: {
    color: BeatricTheme.error,
    fontSize: 14,
    marginTop: 8,
  },
  featureList: {
    marginTop: 8,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  featureIcon: {
    fontSize: 24,
    marginRight: 12,
  },
  featureText: {
    flex: 1,
  },
  featureTitle: {
    color: BeatricTheme.textPrimary,
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 2,
  },
  featureDescription: {
    color: BeatricTheme.textSecondary,
    fontSize: 14,
    lineHeight: 18,
  },
  instructions: {
    marginTop: 8,
  },
  instructionText: {
    color: BeatricTheme.textSecondary,
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 4,
  },
  navigationSection: {
    marginTop: 20,
    marginBottom: 40,
  },
  navButton: {
    marginBottom: 12,
    borderRadius: 8,
  },
  tracksScroll: {
    marginTop: 8,
  },
  trackItem: {
    backgroundColor: BeatricTheme.background,
    padding: 12,
    marginRight: 12,
    borderRadius: 8,
    minWidth: 120,
    maxWidth: 150,
  },
  trackName: {
    color: BeatricTheme.textPrimary,
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  trackArtist: {
    color: BeatricTheme.textSecondary,
    fontSize: 12,
  },
  playlistsScroll: {
    marginTop: 8,
  },
  playlistItem: {
    backgroundColor: BeatricTheme.background,
    padding: 12,
    marginRight: 12,
    borderRadius: 8,
    minWidth: 120,
    maxWidth: 150,
  },
  playlistName: {
    color: BeatricTheme.textPrimary,
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  playlistTracks: {
    color: BeatricTheme.textSecondary,
    fontSize: 12,
  },
  playButton: {
    marginTop: 4,
  },
  playlistButtons: {
    flexDirection: 'row',
    marginTop: 4,
  },
  playlistButton: {
    marginRight: 4,
  },
  playlistTracksContainer: {
    marginBottom: 16,
  },
  playlistTracksTitle: {
    color: BeatricTheme.textPrimary,
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
});

export default SpotifyAuthScreen;
