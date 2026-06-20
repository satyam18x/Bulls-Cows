import React, { useState } from 'react';

import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';

import { createGame } from '../game/GameManager';
import { NumberGenerator } from '../services/NumberGenerator';
import { NumberValidator } from '../services/NumberValidator';

const SecretSetup = ({ navigation }: any) => {

  const [secret, setSecret] = useState('');

  const handleGenerate = () => {

    const generated =
      NumberGenerator.generate();

    setSecret(generated);
  };

  const handleReady = () => {

    if (
      !NumberValidator.isValid(secret)
    ) {

      Alert.alert(
        'Invalid Number',
        'Enter a valid 4-digit number with unique digits.'
      );

      return;
    }

    createGame(secret);

    navigation.navigate(
      'Game'
    );
  };

  return (

    <View style={styles.container}>

      <Text style={styles.title}>
        SECRET NUMBER
      </Text>

      <Text style={styles.label}>
        Enter your secret number
      </Text>

      <TextInput
        style={styles.input}
        value={secret}
        onChangeText={setSecret}
        keyboardType="numeric"
        maxLength={4}
        placeholder="4271"
        placeholderTextColor="#666"
      />

      <TouchableOpacity
        style={styles.button}
        onPress={handleGenerate}
      >
        <Text style={styles.buttonText}>
          Generate Number
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={handleReady}
      >
        <Text style={styles.buttonText}>
          Ready
        </Text>
      </TouchableOpacity>

    </View>
  );
};

export default SecretSetup;

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#121212',
    justifyContent: 'center',
    padding: 25,
  },

  title: {
    color: '#51E927',
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 40,
  },

  label: {
    color: 'white',
    marginBottom: 10,
    fontSize: 16,
  },

  input: {
    backgroundColor: '#1F1F1F',
    color: 'white',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
  },

  button: {
    backgroundColor: '#51E927',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
  },

  buttonText: {
    textAlign: 'center',
    color: 'black',
    fontWeight: 'bold',
  },

});