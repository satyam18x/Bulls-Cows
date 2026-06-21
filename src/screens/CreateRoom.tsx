import React, { useState, useEffect } from 'react';

import { roomManager } from '../game/gameInstance';

import {
  View,
  Text,
  StyleSheet,
  TextInput,
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

  const [guess, setGuess] = useState('');
  const [currentTurn, setCurrentTurn] = useState(gameEngine.getState().currentTurn);

  const [myHistory, setMyHistory] = useState(
    gameEngine.getState().myHistory
  );

  const [opponentHistory, setOpponentHistory] = useState(
    gameEngine.getState().opponentHistory
  );

  // Listen for opponent's guess coming over the network
  useEffect(() => {
    const connection = role === 'HOST' ? server : client;
    if (!connection) return;

    connection.onMessage = (msg: any) => {
      if (msg.type === 'GUESS') {
        try {
          gameEngine.submitGuess(msg.payload.role, msg.payload.guess);
          const state = gameEngine.getState();
          setMyHistory([...state.myHistory]);
          setOpponentHistory([...state.opponentHistory]);
          setCurrentTurn(state.currentTurn);

          if (gameEngine.isGameOver()) {
            navigation.navigate('Result', { roomCode, role });
          }
        } catch (e: any) {
          console.log('Opponent guess error:', e.message);
        }
      }
    };
  }, []);

  useEffect(() => {
    const backAction = () => {
      Alert.alert(
        'Exit Game',
        'Are you sure you want to leave the game?',
        [
          { text: 'Cancel', style: 'cancel' },
          {
            text: 'Exit',
            onPress: () => {
              navigation.reset({
                index: 0,
                routes: [{ name: 'Home' }],
              });
            },
          },
        ]
      );
      return true;
    };

    const subscription = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction
    );

    return () => subscription.remove();
  }, [navigation]);

  const handleExitGame = () => {
    Alert.alert(
      'Exit Game',
      'Are you sure you want to leave the game?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Exit',
          onPress: () => {
            navigation.reset({
              index: 0,
              routes: [{ name: 'Home' }],
            });
          },
        },
      ]
    );
  };

  const submitGuess = () => {
    try {
      gameEngine.submitGuess(role, guess);
      const state = gameEngine.getState();
      setMyHistory([...state.myHistory]);
      setOpponentHistory([...state.opponentHistory]);
      setCurrentTurn(state.currentTurn);

      // Send guess to opponent over network
      const connection = role === 'HOST' ? server : client;
      if (connection) {
        connection.send({ type: 'GUESS', payload: { guess, role } });
      }

      setGuess('');

      if (gameEngine.isGameOver()) {
        navigation.navigate('Result', { roomCode, role });
      }
    } catch (error: any) {
      Alert.alert('Invalid Guess', error.message);
    }
  };

  return (
    <View style={styles.container}>

      <View style={styles.header}>
        <TouchableOpacity onPress={handleExitGame}>
          <Text style={styles.backButton}>← Back</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.title}>BULLS & COWS</Text>

      <View style={styles.secretContainer}>
        <Text style={styles.label}>Player</Text>
        <Text style={styles.secretNumber}>{role}</Text>
      </View>

      <View style={styles.turnBox}>
        <Text style={styles.turnText}>
          Current Turn: {currentTurn}
        </Text>
      </View>

      <Text style={styles.label}>Enter Guess</Text>

      <TextInput
        style={styles.input}
        placeholder="1234"
        placeholderTextColor="#888"
        keyboardType="numeric"
        maxLength={4}
        value={guess}
        onChangeText={setGuess}
        editable={currentTurn === role}
      />

      <TouchableOpacity
        style={[
          styles.button,
          currentTurn !== role && styles.buttonDisabled,
        ]}
        onPress={submitGuess}
        disabled={currentTurn !== role}
      >
        <Text style={styles.buttonText}>
          {currentTurn === role ? 'Submit Guess' : "Opponent's Turn..."}
        </Text>
      </TouchableOpacity>

      <View style={styles.historyHeader}>
        <Text style={styles.historyTitle}>Opponent</Text>
        <Text style={styles.historyTitle}>Host</Text>
      </View>

      <View style={styles.historyColumns}>

        <FlatList
          style={styles.historyColumn}
          data={opponentHistory}
          keyExtractor={(_, i) => 'opp-' + i}
          renderItem={({ item }) => (
            <View style={styles.historyCard}>
              <Text style={styles.historyGuess}>{item.guess}</Text>
              <Text style={styles.historyResult}>
                {item.bulls}B {item.cows}C
              </Text>
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
              <Text style={styles.historyResult}>
                {item.bulls}B {item.cows}C
              </Text>
            </View>
          )}
          ListEmptyComponent={
            <Text style={styles.emptyText}>No guesses yet</Text>
          }
        />

      </View>

    </View>
  );

};

export default GameScreen;

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#121212',
    padding: 20,
  },

  header: {
    marginTop: 20,
    marginBottom: 10,
  },

  backButton: {
    color: '#51E927',
    fontSize: 18,
    fontWeight: 'bold',
  },

  title: {
    fontSize: 28,
    color: '#51E927',
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 20,
    marginBottom: 20,
  },

  secretContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },

  label: {
    color: '#AAA',
    fontSize: 16,
  },

  secretNumber: {
    color: '#51E927',
    fontSize: 32,
    fontWeight: 'bold',
    marginTop: 8,
  },

  turnBox: {
    backgroundColor: '#1F1F1F',
    padding: 12,
    borderRadius: 10,
    marginBottom: 20,
  },

  turnText: {
    color: '#51E927',
    textAlign: 'center',
    fontWeight: 'bold',
  },

  input: {
    backgroundColor: '#1F1F1F',
    color: 'white',
    padding: 15,
    borderRadius: 10,
    marginTop: 10,
  },

  button: {
    backgroundColor: '#51E927',
    padding: 15,
    borderRadius: 10,
    marginTop: 15,
    marginBottom: 25,
  },

  buttonDisabled: {
    backgroundColor: '#2a5c12',
  },

  buttonText: {
    textAlign: 'center',
    color: 'black',
    fontWeight: 'bold',
  },

  historyHeader: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 8,
  },

  historyTitle: {
    color: '#51E927',
    fontSize: 18,
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
    padding: 12,
    borderRadius: 10,
    marginBottom: 10,
    alignItems: 'center',
  },

  historyGuess: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },

  historyResult: {
    color: '#51E927',
    fontWeight: 'bold',
    marginTop: 4,
  },

  emptyText: {
    color: '#555',
    fontSize: 13,
    textAlign: 'center',
    marginTop: 10,
  },

});