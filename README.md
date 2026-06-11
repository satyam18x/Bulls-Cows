# Multiplayer Game

A simple 2-player online multiplayer game built using React Native and Spring Boot.

## Tech Stack

### Frontend

* React Native

### Backend

* Spring Boot
* WebSocket

### Version Control

* GitHub

---

## MVP Features

* Create Room
* Join Room using Room Code
* Real-time communication using WebSockets
* 2 Player Gameplay
* Winner / Loser Result Screen

---

## Screens

### 1. Home Screen

* Create Room
* Join Room

### 2. Create Room Screen

* Display Room Code
* Copy Room Code
* Waiting for Opponent

### 3. Join Room Screen

* Enter Room Code
* Join Room

### 4. Gameplay Screen

* Main Game Interface
* Game State
* Turn Management

### 5. Result Screen

* Winner / Loser
* Play Again (Optional)
* Exit

---

## Game Flow

Home Screen
↓
Create Room / Join Room
↓
Share Room Code
↓
Opponent Joins
↓
Game Starts
↓
Gameplay
↓
Result Screen

---

## Architecture

Player A
↕
Spring Boot Server (WebSocket)
↕
Player B

The server handles:

* Room Creation
* Room Joining
* Game State
* Turn Validation
* Winner Detection

---

## MVP Scope

Included:

* Online Multiplayer
* Room System
* Real-time Updates
* Gameplay

Not Included:

* Login / Signup
* User Profiles
* Database
* Chat System
* Leaderboards
* Friends List
* Notifications

---

## Development Roles

### Frontend (React Native)

* UI/UX
* Navigation
* WebSocket Client
* Game Screens

### Backend (Spring Boot)

* Room Management
* WebSocket Server
* Game Logic
* Match Flow
