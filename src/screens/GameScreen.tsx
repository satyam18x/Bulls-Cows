import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  FlatList,
} from 'react-native';

const GameScreen = ({ navigation }: any) => {
  const [guess, setGuess] = useState('');

  const guessHistory = [
    { id: '1', guess: '1234', result: '1 Bull, 2 Cows' },
    { id: '2', guess: '5678', result: '0 Bulls, 1 Cow' },
    { id: '3', guess: '9012', result: '2 Bulls, 1 Cow' },
  ];

  return (
    <View style={styles.container}>

      <Text style={styles.title}>BULLS & COWS</Text>

      <View style={styles.secretContainer}>
        <Text style={styles.label}>
          Your Secret Number
        </Text>

        <Text style={styles.secretNumber}>
          4271
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

      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>
          Submit Guess
        </Text>
      </TouchableOpacity>

      <Text style={styles.historyTitle}>
        Guess History
      </Text>

      <FlatList
        data={guessHistory}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.historyCard}>
            <Text style={styles.historyGuess}>
              {item.guess}
            </Text>

            <Text style={styles.historyResult}>
              {item.result}
            </Text>
          </View>
        )}
      />

      {/* Temporary */}
      <TouchableOpacity
        style={styles.resultButton}
        onPress={() => navigation.navigate('Result')}
      >
        <Text style={styles.buttonText}>
          Go To Result
        </Text>
      </TouchableOpacity>

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
  },

  resultButton: {
    backgroundColor: '#51E927',
    padding: 15,
    borderRadius: 10,
    marginTop: 10,
  },
});