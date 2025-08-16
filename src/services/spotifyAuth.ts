/**
 * Spotify Authentication Service
 * Handles OAuth flow and token management for Spotify integration
 */

import * as AuthSession from 'expo-auth-session';
import * as Crypto from 'expo-crypto';
import * as WebBrowser from 'expo-web-browser';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SPOTIFY_CONFIG, SpotifyAuthResponse, SpotifyUser } from '../config/spotify';

// Polyfill for btoa in React Native
const btoa = (str: string): string => {
  return global.btoa ? global.btoa(str) : Buffer.from(str, 'binary').toString('base64');
};

// Complete the auth session
WebBrowser.maybeCompleteAuthSession();

// Storage keys for tokens
const STORAGE_KEYS = {
  ACCESS_TOKEN: 'spotify_access_token',
  REFRESH_TOKEN: 'spotify_refresh_token',
  TOKEN_EXPIRY: 'spotify_token_expiry',
  USER_DATA: 'spotify_user_data',
  CODE_VERIFIER: 'spotify_code_verifier'
};

export class SpotifyAuthService {
  private static instance: SpotifyAuthService;
  private accessToken: string | null = null;
  private refreshToken: string | null = null;
  private tokenExpiry: number | null = null;
  private userData: SpotifyUser | null = null;

  private constructor() {}

  public static getInstance(): SpotifyAuthService {
    if (!SpotifyAuthService.instance) {
      SpotifyAuthService.instance = new SpotifyAuthService();
    }
    return SpotifyAuthService.instance;
  }

  /**
   * Generate a proper PKCE code verifier
   */
  private generateCodeVerifier(): string {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-._~';
    let result = '';
    for (let i = 0; i < 128; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  }

  /**
   * Initialize the auth service and load stored tokens
   */
  async initialize(): Promise<void> {
    try {
      // Clear any old code verifiers
      await AsyncStorage.removeItem(STORAGE_KEYS.CODE_VERIFIER);
      
      await this.loadStoredTokens();
      await this.loadUserData();
    } catch (error) {
      console.log('No stored Spotify tokens found');
    }
  }

  /**
   * Start the Spotify OAuth flow
   */
  async authenticate(): Promise<SpotifyAuthResponse | null> {
    try {
      // Generate PKCE challenge with proper length (43-128 characters)
      const codeVerifier = this.generateCodeVerifier();
      
      // Store the code verifier for later use
      await AsyncStorage.setItem(STORAGE_KEYS.CODE_VERIFIER, codeVerifier);
      
      const codeChallenge = await Crypto.digestStringAsync(
        Crypto.CryptoDigestAlgorithm.SHA256,
        codeVerifier,
        { encoding: Crypto.CryptoEncoding.BASE64 }
      );
      
      // Convert BASE64 to BASE64URL (replace + with -, / with _, remove =)
      const codeChallengeUrl = codeChallenge.replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '');

      console.log('Code verifier stored:', codeVerifier.substring(0, 10) + '...');
      console.log('Code verifier length:', codeVerifier.length);
      console.log('Code challenge:', codeChallengeUrl.substring(0, 10) + '...');

      // Create auth URL manually since we can't use hooks in a service class
      const authUrl = new URL(SPOTIFY_CONFIG.AUTH_URL);
      authUrl.searchParams.append('client_id', SPOTIFY_CONFIG.CLIENT_ID);
      authUrl.searchParams.append('response_type', 'code');
      authUrl.searchParams.append('redirect_uri', SPOTIFY_CONFIG.REDIRECT_URI);
      authUrl.searchParams.append('scope', SPOTIFY_CONFIG.SCOPES);
      authUrl.searchParams.append('code_challenge_method', 'S256');
      authUrl.searchParams.append('code_challenge', codeChallengeUrl);

      // Use WebBrowser to open the auth URL with timeout
      const result = await Promise.race([
        WebBrowser.openAuthSessionAsync(
          authUrl.toString(),
          SPOTIFY_CONFIG.REDIRECT_URI
        ),
        new Promise((_, reject) => 
          setTimeout(() => reject(new Error('Authentication timeout')), 60000)
        )
      ]) as any;

      console.log('Auth result:', result);

      if (result.type === 'success' && result.url) {
        console.log('Success URL:', result.url);
        
        try {
          // Extract code from URL
          const url = new URL(result.url);
          const code = url.searchParams.get('code');
          const error = url.searchParams.get('error');
          
          console.log('Extracted code:', code);
          console.log('Extracted error:', error);
          
          if (error) {
            console.error('Spotify auth error:', error);
            return null;
          }
          
          if (code) {
            // Get the stored code verifier
            const storedCodeVerifier = await AsyncStorage.getItem(STORAGE_KEYS.CODE_VERIFIER);
            if (!storedCodeVerifier) {
              console.error('No stored code verifier found');
              return null;
            }
            
            console.log('Retrieved code verifier:', storedCodeVerifier.substring(0, 10) + '...');
            console.log('Retrieved code verifier length:', storedCodeVerifier.length);
            console.log('Retrieved code verifier full:', storedCodeVerifier);
            
            // Exchange code for tokens
            const tokens = await this.exchangeCodeForTokens(code, storedCodeVerifier);
            if (tokens) {
              await this.saveTokens(tokens);
              await this.fetchUserProfile();
              // Clean up the stored code verifier
              await AsyncStorage.removeItem(STORAGE_KEYS.CODE_VERIFIER);
              return tokens;
            }
          } else {
            console.error('No authorization code found in URL');
          }
        } catch (urlError) {
          console.error('Error parsing redirect URL:', urlError);
          console.log('Raw URL:', result.url);
        }
      } else if (result.type === 'cancel') {
        console.log('User cancelled authentication');
        // Clean up the stored code verifier
        await AsyncStorage.removeItem(STORAGE_KEYS.CODE_VERIFIER);
      } else {
        console.log('Auth failed or was dismissed');
        // Clean up the stored code verifier
        await AsyncStorage.removeItem(STORAGE_KEYS.CODE_VERIFIER);
      }

      return null;
    } catch (error) {
      console.error('Spotify authentication error:', error);
      // Clean up the stored code verifier on error
      await AsyncStorage.removeItem(STORAGE_KEYS.CODE_VERIFIER);
      return null;
    }
  }

  /**
   * Exchange authorization code for access tokens
   */
  private async exchangeCodeForTokens(code: string, codeVerifier: string): Promise<SpotifyAuthResponse | null> {
    try {
      console.log('Exchanging code for tokens...');
      console.log('Code:', code.substring(0, 10) + '...');
      console.log('Code verifier:', codeVerifier.substring(0, 10) + '...');
      console.log('Redirect URI:', SPOTIFY_CONFIG.REDIRECT_URI);
      
      // Create the request body as a string with client credentials
      const bodyString = `grant_type=authorization_code&code=${encodeURIComponent(code)}&redirect_uri=${encodeURIComponent(SPOTIFY_CONFIG.REDIRECT_URI)}&code_verifier=${encodeURIComponent(codeVerifier)}&client_id=${encodeURIComponent(SPOTIFY_CONFIG.CLIENT_ID)}&client_secret=${encodeURIComponent(SPOTIFY_CONFIG.CLIENT_SECRET)}`;
      
      console.log('Request body:', bodyString);
      console.log('Code verifier being sent:', codeVerifier);
      console.log('Code verifier length being sent:', codeVerifier.length);

      const response = await fetch(SPOTIFY_CONFIG.TOKEN_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: bodyString,
      });

      console.log('Token exchange response status:', response.status);
      console.log('Response headers:', Object.fromEntries(response.headers.entries()));

      if (response.ok) {
        const data = await response.json();
        console.log('Token exchange successful');
        return data as SpotifyAuthResponse;
      } else {
        const errorText = await response.text();
        console.error('Token exchange failed:', errorText);
        console.error('Response status:', response.status);
        
        // Try to parse error as JSON for better debugging
        try {
          const errorJson = JSON.parse(errorText);
          console.error('Error details:', errorJson);
        } catch (e) {
          console.error('Raw error text:', errorText);
        }
        
        return null;
      }
    } catch (error) {
      console.error('Token exchange error:', error);
      return null;
    }
  }

  /**
   * Refresh the access token using refresh token
   */
  async refreshAccessToken(): Promise<boolean> {
    if (!this.refreshToken) {
      return false;
    }

    try {
      const response = await fetch(SPOTIFY_CONFIG.TOKEN_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Authorization': `Basic ${btoa(`${SPOTIFY_CONFIG.CLIENT_ID}:${SPOTIFY_CONFIG.CLIENT_SECRET}`)}`,
        },
        body: new URLSearchParams({
          grant_type: 'refresh_token',
          refresh_token: this.refreshToken,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        const tokens: SpotifyAuthResponse = {
          access_token: data.access_token,
          token_type: data.token_type,
          expires_in: data.expires_in,
          refresh_token: data.refresh_token || this.refreshToken,
          scope: data.scope,
        };

        await this.saveTokens(tokens);
        return true;
      } else {
        console.error('Token refresh failed:', await response.text());
        return false;
      }
    } catch (error) {
      console.error('Token refresh error:', error);
      return false;
    }
  }

  /**
   * Fetch user profile from Spotify
   */
  async fetchUserProfile(): Promise<SpotifyUser | null> {
    try {
      const token = await this.getValidAccessToken();
      if (!token) return null;

      const response = await fetch(`${SPOTIFY_CONFIG.API_BASE_URL}/me`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const userData = await response.json();
        this.userData = userData;
        await this.saveUserData(userData);
        return userData;
      } else {
        console.error('Failed to fetch user profile:', await response.text());
        return null;
      }
    } catch (error) {
      console.error('Fetch user profile error:', error);
      return null;
    }
  }

  /**
   * Get a valid access token (refresh if needed)
   */
  async getValidAccessToken(): Promise<string | null> {
    if (!this.accessToken) {
      return null;
    }

    // Check if token is expired or will expire soon (within 5 minutes)
    if (this.tokenExpiry && Date.now() > this.tokenExpiry - 300000) {
      const refreshed = await this.refreshAccessToken();
      if (!refreshed) {
        return null;
      }
    }

    return this.accessToken;
  }

  /**
   * Check if user is authenticated
   */
  isAuthenticated(): boolean {
    return !!this.accessToken && !!this.tokenExpiry && Date.now() < this.tokenExpiry;
  }

  /**
   * Get current user data
   */
  getUserData(): SpotifyUser | null {
    return this.userData;
  }

  /**
   * Logout and clear all stored data
   */
  async logout(): Promise<void> {
    this.accessToken = null;
    this.refreshToken = null;
    this.tokenExpiry = null;
    this.userData = null;

    await AsyncStorage.multiRemove([
      STORAGE_KEYS.ACCESS_TOKEN,
      STORAGE_KEYS.REFRESH_TOKEN,
      STORAGE_KEYS.TOKEN_EXPIRY,
      STORAGE_KEYS.USER_DATA,
    ]);
  }

  /**
   * Save tokens to storage
   */
  private async saveTokens(tokens: SpotifyAuthResponse): Promise<void> {
    this.accessToken = tokens.access_token;
    this.refreshToken = tokens.refresh_token;
    this.tokenExpiry = Date.now() + tokens.expires_in * 1000;

    await AsyncStorage.multiSet([
      [STORAGE_KEYS.ACCESS_TOKEN, tokens.access_token],
      [STORAGE_KEYS.REFRESH_TOKEN, tokens.refresh_token],
      [STORAGE_KEYS.TOKEN_EXPIRY, this.tokenExpiry.toString()],
    ]);
  }

  /**
   * Load stored tokens from storage
   */
  private async loadStoredTokens(): Promise<void> {
    const [accessToken, refreshToken, tokenExpiry] = await AsyncStorage.multiGet([
      STORAGE_KEYS.ACCESS_TOKEN,
      STORAGE_KEYS.REFRESH_TOKEN,
      STORAGE_KEYS.TOKEN_EXPIRY,
    ]);

    if (accessToken[1] && refreshToken[1] && tokenExpiry[1]) {
      this.accessToken = accessToken[1];
      this.refreshToken = refreshToken[1];
      this.tokenExpiry = parseInt(tokenExpiry[1]);
    }
  }

  /**
   * Save user data to storage
   */
  private async saveUserData(userData: SpotifyUser): Promise<void> {
    await AsyncStorage.setItem(STORAGE_KEYS.USER_DATA, JSON.stringify(userData));
  }

  /**
   * Load user data from storage
   */
  private async loadUserData(): Promise<void> {
    const userData = await AsyncStorage.getItem(STORAGE_KEYS.USER_DATA);
    if (userData) {
      this.userData = JSON.parse(userData);
    }
  }
}

// Export singleton instance
export const spotifyAuth = SpotifyAuthService.getInstance();
