import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

import { gameEngine } from '../game/GameManager';

const ResultScreen = ({ navigation }: any) => {

  const totalGuesses =
    gameEngine.getHistory().length;

  const secretNumber =
    gameEngine.getSecretNumber();

  return (
    <View style={styles.container}>

      <Text style={styles.emoji}>
        🎉
      </Text>

      <Text style={styles.resultText}>
        YOU WIN!
      </Text>

      <View style={styles.infoCard}>

        <Text style={styles.label}>
          Secret Number
        </Text>

        <Text style={styles.secretNumber}>
          {secretNumber}
        </Text>

      </View>

      <View style={styles.infoCard}>

        <Text style={styles.label}>
          Total Guesses
        </Text>

        <Text style={styles.secretNumber}>
          {totalGuesses}
        </Text>

      </View>

      <TouchableOpacity
        style={styles.button}
        onPress={() =>
          navigation.navigate(
            'CreateRoom'
          )
        }
      >
        <Text style={styles.buttonText}>
          Play Again
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[
          styles.button,
          styles.homeButton
        ]}
        onPress={() =>
          navigation.navigate(
            'Home'
          )
        }
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
  backgroundColor: 'white',
},

 buttonText: {
  textAlign: 'center',
  color: '#000',
  fontSize: 16,
  fontWeight: 'bold',
},
});