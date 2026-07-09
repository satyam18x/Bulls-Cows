import React from 'react';

import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

import { roomManager } from '../game/gameInstance';

const ResultScreen = ({
  navigation,
  route,
}: any) => {

  const {
    roomCode,
    role,
  } = route.params;

  const room = roomManager.getRoom(roomCode);

  if (!room || !room.gameEngine) {
    return (
      <View style={styles.container}>
        <Text style={styles.resultText}>No Game Found</Text>
      </View>
    );
  }

  const winner = room.gameEngine.getWinner();
  const isWinner = winner === role;
  const state = room.gameEngine.getState();

  // The number you were guessing = opponent's secret
  // The number opponent was guessing = your secret
  const mySecret = role === 'HOST'
    ? room.hostSecret
    : room.joinerSecret;

  const opponentSecret = role === 'HOST'
    ? room.joinerSecret
    : room.hostSecret;

  const handlePlayAgain = () => {
    roomManager.destroyRoom(roomCode);
    navigation.reset({
      index: 0,
      routes: [{ name: 'Home' }],
    });
  };

  return (
    <View style={styles.container}>

      <Text style={styles.title}>GAME OVER</Text>

      <Text style={styles.resultText}>
        {isWinner ? '🏆 YOU WIN!' : '💀 YOU LOSE!'}
      </Text>

      <Text style={styles.winnerLabel}>
        Winner: {winner}
      </Text>

      <View style={styles.secretsBox}>
  <Text style={styles.secretLabel}>
    {isWinner ? '🎯 You cracked it!' : '❌ The number was...'}
  </Text>
  <Text style={styles.secretNumber}>
    {opponentSecret ?? '????'}
  </Text>
  <Text style={styles.secretHint}>
    This was the Secret number
  </Text>
</View>

      <View style={styles.statsBox}>
        <Text style={styles.statsText}>
          Your guesses: {state.myHistory.length}
        </Text>
        <Text style={styles.statsText}>
          Opponent's guesses: {state.opponentHistory.length}
        </Text>
      </View>

      <TouchableOpacity style={styles.button} onPress={handlePlayAgain}>
        <Text style={styles.buttonText}>Back To Home</Text>
      </TouchableOpacity>

    </View>
  );

};

export default ResultScreen;

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#121212',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },

  title: {
    color: '#51E927',
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 16,
  },

  resultText: {
    color: 'white',
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 8,
  },

  winnerLabel: {
    color: '#AAA',
    fontSize: 16,
    marginBottom: 30,
  },

  secretsBox: {
  backgroundColor: '#1F1F1F',
  borderRadius: 14,
  width: '100%',
  padding: 24,
  alignItems: 'center',
  marginBottom: 20,
},

  secretCard: {
    flex: 1,
    alignItems: 'center',
  },

  secretLabel: {
    color: '#AAA',
    fontSize: 13,
    marginBottom: 8,
  },

  secretNumber: {
    color: '#51E927',
    fontSize: 36,
    fontWeight: 'bold',
    letterSpacing: 4,
    marginBottom: 6,
  },

  secretHint: {
    color: '#555',
    fontSize: 11,
    textAlign: 'center',
  },

  divider: {
    width: 1,
    height: '100%',
    backgroundColor: '#333',
    marginHorizontal: 10,
  },

  statsBox: {
    backgroundColor: '#1F1F1F',
    borderRadius: 10,
    width: '100%',
    padding: 16,
    marginBottom: 30,
    gap: 6,
  },

  statsText: {
    color: '#AAA',
    fontSize: 14,
    textAlign: 'center',
  },

  button: {
    backgroundColor: '#51E927',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 10,
  },

  buttonText: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 16,
  },

});