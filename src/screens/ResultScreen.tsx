import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

const ResultScreen = ({ navigation }: any) => {
  const isWinner = true; // Change later based on game result

  return (
    <View style={styles.container}>
      <Text style={styles.emoji}>
        {isWinner ? '🎉' : '😢'}
      </Text>

      <Text style={styles.resultText}>
        {isWinner ? 'YOU WIN!' : 'YOU LOSE!'}
      </Text>

      <View style={styles.infoCard}>
        <Text style={styles.label}>
          Opponent's Secret Number
        </Text>

        <Text style={styles.secretNumber}>
          5832
        </Text>
      </View>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Game')}
      >
        <Text style={styles.buttonText}>
          Play Again
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, styles.homeButton]}
        onPress={() => navigation.navigate('Home')}
      >
        <Text style={styles.buttonText}>
          Back To Home
        </Text>
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
    padding: 25,
  },

  emoji: {
    fontSize: 70,
    marginBottom: 15,
  },

  resultText: {
    color: '#51E927',
    fontSize: 34,
    fontWeight: 'bold',
    marginBottom: 30,
  },

  infoCard: {
    width: '100%',
    backgroundColor: '#1F1F1F',
    padding: 20,
    borderRadius: 15,
    alignItems: 'center',
    marginBottom: 40,
  },

  label: {
    color: '#AAA',
    fontSize: 16,
    marginBottom: 10,
  },

  secretNumber: {
    color: '#51E927',
    fontSize: 36,
    fontWeight: 'bold',
    letterSpacing: 4,
  },

  button: {
    width: '100%',
    backgroundColor: '#51E927',
    padding: 15,
    borderRadius: 12,
    marginBottom: 15,
  },

  homeButton: {
    backgroundColor: '#3A3A3A',
  },

  buttonText: {
    textAlign: 'center',
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold',
  },
});