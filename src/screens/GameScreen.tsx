import React, { useState, useEffect } from 'react';
import { gameEngine } from '../game/GameManager';

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

const GameScreen = ({ navigation }: any) => {

  const [guess, setGuess] = useState('');

  const [history, setHistory] = useState(
    gameEngine.getHistory()
  );

  useEffect(() => {

    const backAction = () => {

      Alert.alert(
        'Exit Game',
        'Are you sure you want to leave the game?',
        [
          {
            text: 'Cancel',
            style: 'cancel',
          },
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

    const subscription =
      BackHandler.addEventListener(
        'hardwareBackPress',
        backAction
      );

    return () => {
      subscription.remove();
    };

  }, [navigation]);

  const handleExitGame = () => {

    Alert.alert(
      'Exit Game',
      'Are you sure you want to leave the game?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
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

      gameEngine.submitGuess(
        guess
      );

      setHistory([
        ...gameEngine.getHistory()
      ]);

      setGuess('');

      if (
        gameEngine.isGameOver()
      ) {

        navigation.navigate(
          'Result'
        );

      }

    } catch (error: any) {

      Alert.alert(
        'Invalid Guess',
        error.message
      );

    }

  };

  return (

    <View style={styles.container}>

      <View style={styles.header}>

        <TouchableOpacity
          onPress={handleExitGame}
        >
          <Text style={styles.backButton}>
            ← Back
          </Text>
        </TouchableOpacity>

      </View>

      <Text style={styles.title}>
        BULLS & COWS
      </Text>

      <View style={styles.secretContainer}>

        <Text style={styles.label}>
          Your Secret Number
        </Text>

        <Text style={styles.secretNumber}>
          ****
        </Text>

      </View>

      <View style={styles.turnBox}>

        <Text style={styles.turnText}>
          Your Turn
        </Text>

      </View>

      <Text style={styles.label}>
        Enter Guess
      </Text>

      <TextInput
        style={styles.input}
        placeholder="1234"
        placeholderTextColor="#888"
        keyboardType="numeric"
        maxLength={4}
        value={guess}
        onChangeText={setGuess}
      />

      <TouchableOpacity
        style={styles.button}
        onPress={submitGuess}
      >
        <Text style={styles.buttonText}>
          Submit Guess
        </Text>
      </TouchableOpacity>

      <Text style={styles.historyTitle}>
        Guess History
      </Text>

      <FlatList
        data={history}
        keyExtractor={(_, index) =>
          index.toString()
        }
        renderItem={({ item }) => (

          <View style={styles.historyCard}>

            <Text style={styles.historyGuess}>
              {item.guess}
            </Text>

            <Text style={styles.historyResult}>
              {item.result.bulls}B {item.result.cows}C
            </Text>

          </View>

        )}
      />

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

  buttonText: {
    textAlign: 'center',
    color: 'black',
    fontWeight: 'bold',
  },

  historyTitle: {
    color: '#51E927',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },

  historyCard: {
    backgroundColor: '#1F1F1F',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  historyGuess: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },

  historyResult: {
    color: '#51E927',
    fontWeight: 'bold',
  },

});