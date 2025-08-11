# API Contract — Beatric

**Version:** 1.0\
**Last Updated:** 2025-08-11

This document defines the agreed communication between the frontend and backend for the MVP build of the **Biometric Workout Playlist Curator** (Beatric).\
It is the single source of truth for all API interactions.\
Following this contract ensures frontend and backend teams can work independently without integration issues.

---

## Table of Contents

1. [Data Models](#data-models)
2. [Endpoints Overview](#endpoints-overview)
3. [Endpoint Details](#endpoint-details)
   - [Login with Spotify](#1-login-with-spotify)
   - [Send Latest Heart Rate](#2-send-latest-heart-rate)
   - [Get Recommended Track](#3-get-recommended-track)
   - [Play Track on Spotify](#4-play-track-on-spotify)
   - [Health Check](#5-health-check)
4. [Error Codes Reference](#error-codes-reference)

---

## Data Models

### User

```json
{
  "id": "string",
  "name": "string",
  "email": "string",
  "spotify_access_token": "string",
  "spotify_refresh_token": "string"
}
```

### HeartRateReading

```json
{
  "timestamp": "ISO8601 string",
  "bpm": "number"
}
```

### Track

```json
{
  "id": "string",
  "name": "string",
  "artist": "string",
  "bpm": "number",
  "uri": "string",
  "preview_url": "string"
}
```

---

## Endpoints Overview

| Feature               | Method | Path                 | Description                    |
| --------------------- | ------ | -------------------- | ------------------------------ |
| Login with Spotify    | GET    | /auth/spotify        | Authenticate user with Spotify |
| Send Heart Rate       | POST   | /api/heart-rate      | Send heart rate from frontend  |
| Get Recommended Track | GET    | /api/recommend-track | Get track matching given BPM   |
| Play Track            | POST   | /api/play-track      | Start Spotify track playback   |
| Health Check          | GET    | /health              | Verify backend is running      |

---

## Endpoint Details

### 1. Login with Spotify

**Method:** GET\
**Path:** `/auth/spotify`\
**Description:** Redirects user to Spotify login and handles OAuth flow.

**Request:**\
N/A (handled via browser redirect).

**Success Response (200 OK)**

```json
{
  "message": "Login successful",
  "user": {
    "id": "string",
    "name": "string",
    "spotify_access_token": "string",
    "spotify_refresh_token": "string"
  }
}
```

**Error Response (401 Unauthorized)**

```json
{
  "error": "Spotify authentication failed"
}
```

---

### 2. Send Latest Heart Rate

**Method:** POST\
**Path:** `/api/heart-rate`\
**Description:** Receives real-time HR data from frontend to process.

**Request Body:**

```json
{
  "bpm": 140,
  "timestamp": "2025-08-11T14:23:00Z"
}
```

**Success Response (200 OK)**

```json
{
  "message": "Heart rate received",
  "status": "ok"
}
```

**Error Response (400 Bad Request)**

```json
{
  "error": "Invalid heart rate data"
}
```

---

### 3. Get Recommended Track

**Method:** GET\
**Path:** `/api/recommend-track`\
**Description:** Returns a single recommended track object based on the provided BPM.

**Query Params:**

- **bpm** (required): number — current heart rate in BPM.

**Example:**

```
/api/recommend-track?bpm=140
```

**Success Response (200 OK)**

```json
{
  "track": {
    "id": "6rqhFgbbKwnb9MLmUQDhG6",
    "name": "Eye of the Tiger",
    "artist": "Survivor",
    "bpm": 139,
    "uri": "spotify:track:6rqhFgbbKwnb9MLmUQDhG6",
    "preview_url": "https://p.scdn.co/mp3-preview/example"
  }
}
```

**Error Response (404 Not Found)**

```json
{
  "error": "No track found for given BPM"
}
```

---

### 4. Play Track on Spotify

**Method:** POST\
**Path:** `/api/play-track`\
**Description:** Uses Spotify Connect to start playback on the user’s active device via the server-side Spotify credentials or delegated user token.

**Request Body:**

```json
{
  "uri": "spotify:track:6rqhFgbbKwnb9MLmUQDhG6"
}
```

**Success Response (200 OK)**

```json
{
  "message": "Track playback started",
  "uri": "spotify:track:6rqhFgbbKwnb9MLmUQDhG6"
}
```

**Error Response (403 Forbidden)**

```json
{
  "error": "Spotify Premium required for playback"
}
```

---

### 5. Health Check

**Method:** GET\
**Path:** `/health`\
**Description:** Simple check to verify backend status.

**Success Response (200 OK)**

```json
{
  "status": "ok",
  "timestamp": "2025-08-11T14:25:00Z"
}
```

---

## Error Codes Reference

- **400 Bad Request** — Invalid or missing data in the request.
- **401 Unauthorized** — User not logged in or token expired.
- **403 Forbidden** — Spotify Premium required for playback.
- **404 Not Found** — Resource (track/user) not found.
- **500 Internal Server Error** — Unexpected server issue.

