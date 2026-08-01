# 🐂 Bulls & Cows — Multiplayer Mobile Game

A real-time multiplayer number guessing game built with **React Native**, playable over **WiFi or mobile hotspot** no internet required.

---

## 📱 About the Game

Bulls & Cows is a classic code-breaking game where two players secretly choose a 4-digit number and take turns guessing each other's number.

- **Bull** = Correct digit in the correct position
- **Cow** = Correct digit in the wrong position
- First player to get **4 Bulls** wins

---

## ✨ Features

- 🔴 **Real-time multiplayer** over local WiFi or mobile hotspot
- 📡 **Auto-discovery** — no IP address needed, games appear automatically
- 🎮 **Custom in-app keyboard** for guess input
- 📜 **Live guess history** for both players on the same screen
- 🔒 **Secret number validation** — no duplicates, no leading zero
- 🚪 **Exit detection** — opponent is notified if you leave mid-game
- 🏆 **Result screen** showing winner and the opponent's secret number
- 📴 **Works offline** — no internet or server needed

---

## 🛠️ Tech Stack

| Technology | Usage |
|---|---|
| React Native (CLI) | Cross-platform mobile framework |
| TypeScript | Type-safe codebase |
| react-native-tcp-socket | TCP server/client for local multiplayer |
| react-native-zeroconf | Auto-discovery of games on local network |
| react-native-network-info | Fetching device local IP |
| React Navigation | Screen navigation |

---

## 🏗️ Architecture

```
src/
├── game/
│   ├── gameInstance.ts          # Singleton RoomManager
│   └── RoomManager.ts           # Room lifecycle management
├── models/
│   ├── Room.ts                  # Room model
│   ├── GuessRecord.ts           # Guess history model
│   └── GuessResult.ts           # Bulls & cows result model
├── network/
│   ├── GameServer.ts            # TCP server (runs on host device)
│   ├── GameClient.ts            # TCP client (runs on joiner device)
│   └── MessageTypes.ts          # Shared message type definitions
├── screens/
│   ├── HomeScreen.tsx           # Landing screen
│   ├── HostLobbyScreen.tsx      # Host creates game, waits for joiner
│   ├── JoinLobbyScreen.tsx      # Joiner scans and joins available game
│   ├── GameScreen.tsx           # Main gameplay screen
│   └── ResultScreen.tsx         # Game over screen
├── services/
│   └── GameEngine.ts            # Core game logic (guessing, scoring)
├── navigation/
│   └── AppNavigator.tsx         # Stack navigator setup
└── utils/
    └── validateSecret.ts        # Secret number validation logic
```

---

## 🔌 How Multiplayer Works

```
HOST phone                          JOINER phone
────────────────────────────────────────────────
Starts TCP server on port 8080
Broadcasts via Zeroconf (mDNS)
                                Scans local network
                                Sees game card appear
                                Taps to join → connects
Receives joiner's secret
Shows "Friend Connected ✅"
Enters own secret → Start Game
Sends GAME_START message ──────────────────────►
                                Navigates to GameScreen
HOST guesses → GUESS msg ──────────────────────►
                                Screen updates
                                JOINER guesses ◄── GUESS msg
HOST screen updates
... until 4 Bulls → Result screen
```

Both phones must be on the **same WiFi or hotspot**. No internet required.

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- React Native CLI
- Android Studio + JDK 17
- Android device or emulator

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/bulls-and-cows.git
cd bulls-and-cows

# Install dependencies
npm install

# Run on Android
npx react-native run-android
```

### Build Release APK

```bash
cd android
./gradlew assembleRelease
```

APK will be at:
```
android/app/build/outputs/apk/release/app-release.apk
```

---

## 🎮 How to Play

1. **Host** opens the app → taps **Create Room**
2. Host enters their secret 4-digit number and waits
3. **Joiner** connects to host's WiFi/hotspot → opens app → taps **Join Room**
4. Joiner sees the game card appear → enters their secret → taps to join
5. Host sees "Friend Connected" → taps **Start Game**
6. Both players take turns guessing — HOST goes first
7. After each guess, Bulls & Cows feedback is shown
8. First to 4 Bulls wins!

### Secret Number Rules
- Must be exactly 4 digits
- No repeating digits
- Cannot start with 0

---

