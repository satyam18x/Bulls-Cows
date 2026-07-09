import React, { useState, useEffect, useRef } from 'react';

import { roomManager } from '../game/gameInstance';

import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Alert,
  BackHandler,
} from 'react-native';

const GameScreen = ({
  navigation,
  route,
}: any) => {

  const {
    roomCode,
    role,
    server,
    client,
  } = route.params;

  const room = roomManager.getRoom(roomCode);

  if (!room || !room.gameEngine) {
    return (
      <View style={styles.container}>
        <Text style={{ color: 'white', textAlign: 'center' }}>
          Game not started
        </Text>
      </View>
    );
  }

  const gameEngine = room.gameEngine;
  const connectionRef = useRef<any>(role === 'HOST' ? server : client);
  const opponentExited = useRef(false);

  const [guess, setGuess] = useState('');
  const [currentTurn, setCurrentTurn] = useState(gameEngine.getState().currentTurn);
  const [myHistory, setMyHistory] = useState(
    role === 'HOST'
      ? gameEngine.getState().myHistory
      : gameEngine.getState().opponentHistory
  );

  const [opponentHistory, setOpponentHistory] = useState(
    role === 'HOST'
      ? gameEngine.getState().opponentHistory
      : gameEngine.getState().myHistory
  );

  // Listen for opponent messages
  useEffect(() => {
    const connection = connectionRef.current;
    if (!connection) return;

    connection.onMessage = (msg: any) => {
      if (msg.type === 'GUESS') {
        try {
          gameEngine.submitGuess(msg.payload.role, msg.payload.guess);
          const state = gameEngine.getState();
          setMyHistory([...(role === 'HOST' ? state.myHistory : state.opponentHistory)]);
          setOpponentHistory([...(role === 'HOST' ? state.opponentHistory : state.myHistory)]);
          Now:
          setCurrentTurn(state.currentTurn);

          if (gameEngine.isGameOver()) {
            navigation.navigate('Result', { roomCode, role });
          }
        } catch (e: any) {
          console.log('Opponent guess error:', e.message);
        }
      }

      if (msg.type === 'PLAYER_EXIT') {
        opponentExited.current = true;
        roomManager.destroyRoom(roomCode);
        Alert.alert(
          '😔 Opponent Left',
          'Your opponent has exited the game.',
          [
            {
              text: 'Back to Home',
              onPress: () => {
                navigation.reset({
                  index: 0,
                  routes: [{ name: 'Home' }],
                });
              },
            },
          ]
        );
      }
    };
  }, []);

  // Send exit message and navigate home
  const exitGame = () => {
    if (!opponentExited.current) {
      const connection = connectionRef.current;
      if (connection) {
        try {
          connection.send({ type: 'PLAYER_EXIT', payload: {} });
        } catch (e) {
          console.log('Could not send exit message', e);
        }
      }
    }
    roomManager.destroyRoom(roomCode);
    navigation.reset({
      index: 0,
      routes: [{ name: 'Home' }],
    });
  };

  const handleExitGame = () => {
    Alert.alert(
      'Exit Game',
      'Are you sure you want to leave the game?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Exit',
          style: 'destructive',
          onPress: exitGame,
        },
      ]
    );
  };

  useEffect(() => {
    const backAction = () => {
      handleExitGame();
      return true;
    };

    const subscription = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction
    );

    return () => subscription.remove();
  }, [navigation]);

  const submitGuess = () => {
    try {
      gameEngine.submitGuess(role, guess);
      const state = gameEngine.getState();
      setMyHistory([...state.myHistory]);
      setOpponentHistory([...state.opponentHistory]);
      setCurrentTurn(state.currentTurn);
      setGuess('');

      const connection = connectionRef.current;
      if (connection) {
        connection.send({ type: 'GUESS', payload: { guess, role } });
      }

      if (gameEngine.isGameOver()) {
        navigation.navigate('Result', { roomCode, role });
      }
    } catch (error: any) {
      Alert.alert('Invalid Guess', error.message);
    }
  };

  const handleKey = (key: string) => {
    if (key === '⌫') {
      setGuess((prev) => prev.slice(0, -1));
    } else if (key === '✓') {
      if (guess.length === 4 && currentTurn === role) submitGuess();
    } else {
      if (guess.length >= 4) return;

      if (guess.length === 0 && key === '0') {
        Alert.alert('Invalid', 'First digit cannot be 0.');
        return;
      }

      if (guess.includes(key)) {
        Alert.alert('Invalid', `${key} is already in your guess.`);
        return;
      }

      setGuess((prev) => prev + key);
    }
  };

  const keyRows = [
    ['1', '2', '3'],
    ['4', '5', '6'],
    ['7', '8', '9'],
    ['⌫', '0', '✓'],
  ];

  const isMyTurn = currentTurn === role;

  return (
    <View style={styles.container}>

      <View style={styles.header}>
        <TouchableOpacity onPress={handleExitGame}>
          <Text style={styles.backButton}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.title}>BULLS & COWS</Text>
        <View style={styles.roleBox}>
          <Text style={styles.roleText}>{role}</Text>
        </View>
      </View>

      <View style={[styles.turnBox, isMyTurn ? styles.turnBoxActive : styles.turnBoxWaiting]}>
        <Text style={styles.turnText}>
          {isMyTurn ? '🟢 Your Turn' : '⏳ Opponent\'s Turn...'}
        </Text>
      </View>

      <View style={styles.historyHeader}>
        <Text style={styles.historyTitle}>Opponent</Text>
        <Text style={styles.historyTitle}>You</Text>
      </View>

      <View style={styles.historyColumns}>
        <FlatList
          style={styles.historyColumn}
          data={opponentHistory}
          keyExtractor={(_, i) => 'opp-' + i}
          renderItem={({ item }) => (
            <View style={styles.historyCard}>
              <Text style={styles.historyGuess}>{item.guess}</Text>
              <Text style={styles.historyResult}>{item.bulls}B {item.cows}C</Text>
            </View>
          )}
          ListEmptyComponent={
            <Text style={styles.emptyText}>No guesses yet</Text>
          }
        />

        <FlatList
          style={styles.historyColumn}
          data={myHistory}
          keyExtractor={(_, i) => 'host-' + i}
          renderItem={({ item }) => (
            <View style={styles.historyCard}>
              <Text style={styles.historyGuess}>{item.guess}</Text>
              <Text style={styles.historyResult}>{item.bulls}B {item.cows}C</Text>
            </View>
          )}
          ListEmptyComponent={
            <Text style={styles.emptyText}>No guesses yet</Text>
          }
        />
      </View>

      <View style={styles.bottomSection}>

        <View style={styles.guessDisplay}>
          {['0', '1', '2', '3'].map((_, i) => (
            <View key={i} style={styles.guessDigitBox}>
              <Text style={styles.guessDigit}>
                {guess[i] ?? '_'}
              </Text>
            </View>
          ))}
        </View>

        <View style={[styles.keyboard, !isMyTurn && styles.keyboardDisabled]}>
          {keyRows.map((row, rowIndex) => (
            <View key={rowIndex} style={styles.keyboardRow}>
              {row.map((key) => (
                <TouchableOpacity
                  key={key}
                  style={[
                    styles.key,
                    key === '✓' && styles.keySubmit,
                    key === '⌫' && styles.keyDelete,
                    key === '✓' && (guess.length !== 4 || !isMyTurn) && styles.keyDisabled,
                  ]}
                  onPress={() => handleKey(key)}
                  disabled={!isMyTurn}
                >
                  <Text style={[
                    styles.keyText,
                    key === '✓' && styles.keySubmitText,
                    key === '⌫' && styles.keyDeleteText,
                  ]}>
                    {key}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          ))}
        </View>

      </View>

    </View>
  );

};

export default GameScreen;

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#121212',
    padding: 16,
    paddingTop: 40,
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },

  backButton: {
    color: '#51E927',
    fontSize: 16,
    fontWeight: 'bold',
  },

  title: {
    fontSize: 20,
    color: '#51E927',
    fontWeight: 'bold',
    letterSpacing: 2,
  },

  roleBox: {
    backgroundColor: '#1F1F1F',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 8,
  },

  roleText: {
    color: '#51E927',
    fontWeight: 'bold',
    fontSize: 13,
  },

  turnBox: {
    padding: 10,
    borderRadius: 10,
    marginBottom: 12,
    alignItems: 'center',
  },

  turnBoxActive: {
    backgroundColor: '#1a3d0f',
    borderWidth: 1,
    borderColor: '#51E927',
  },

  turnBoxWaiting: {
    backgroundColor: '#1F1F1F',
    borderWidth: 1,
    borderColor: '#444',
  },

  turnText: {
    color: '#51E927',
    fontWeight: 'bold',
    fontSize: 14,
  },

  historyHeader: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 6,
  },

  historyTitle: {
    color: '#51E927',
    fontSize: 16,
    fontWeight: 'bold',
  },

  historyColumns: {
    flex: 1,
    flexDirection: 'row',
    gap: 10,
  },

  historyColumn: {
    flex: 1,
  },

  historyCard: {
    backgroundColor: '#1F1F1F',
    padding: 10,
    borderRadius: 10,
    marginBottom: 8,
    alignItems: 'center',
  },

  historyGuess: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 15,
  },

  historyResult: {
    color: '#51E927',
    fontWeight: 'bold',
    marginTop: 2,
    fontSize: 13,
  },

  emptyText: {
    color: '#555',
    fontSize: 12,
    textAlign: 'center',
    marginTop: 10,
  },

  bottomSection: {
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#2a2a2a',
    marginTop: 8,
  },

  guessDisplay: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 10,
    marginBottom: 12,
  },

  guessDigitBox: {
    width: 56,
    height: 56,
    backgroundColor: '#1F1F1F',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#51E927',
    justifyContent: 'center',
    alignItems: 'center',
  },

  guessDigit: {
    color: '#51E927',
    fontSize: 28,
    fontWeight: 'bold',
  },

  keyboard: {
    gap: 8,
  },

  keyboardDisabled: {
    opacity: 0.3,
  },

  keyboardRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 10,
  },

  key: {
    backgroundColor: '#1F1F1F',
    width: 90,
    height: 50,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#333',
  },

  keyText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },

  keySubmit: {
    backgroundColor: '#51E927',
    borderColor: '#51E927',
  },

  keySubmitText: {
    color: '#121212',
  },

  keyDelete: {
    backgroundColor: '#2a2a2a',
    borderColor: '#444',
  },

  keyDeleteText: {
    color: '#FF5555',
  },

  keyDisabled: {
    opacity: 0.4,
  },

});