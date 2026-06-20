import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Alert
} from 'react-native';

import { NumberGenerator } from '../services/NumberGenerator';
import { NumberValidator } from '../services/NumberValidator';
import { createGame } from '../game/GameManager';

const CreateRoomScreen = ({ navigation }: any) => {

  const [secretNumber, setSecretNumber] =
    useState('');

  const roomCode = 'ABC123';

  const handleGenerate = () => {

    const generated =
      NumberGenerator.generate();

    setSecretNumber(generated);
  };

  const handleStartGame = () => {

    if (
      !NumberValidator.isValid(
        secretNumber
      )
    ) {

     Alert.alert(
  'Invalid Number',
  'Enter a valid 4 digit unique number'
);
      return;
    }

    createGame(secretNumber);

    navigation.navigate(
      'Game'
    );
  };

  return (

    <View style={styles.container}>

      <Text style={styles.title}>
        CREATE ROOM
      </Text>

     <TouchableOpacity
  style={styles.button}
  onPress={() =>
    navigation.navigate(
      'SecretSetup'
    )
  }
>
  <Text style={styles.buttonText}>
    Test Secret Setup
  </Text>
</TouchableOpacity>

      <Text style={styles.label}>
        Room Code
      </Text>

      <View style={styles.codeBox}>
        <Text style={styles.code}>
          {roomCode}
        </Text>
      </View>

      <TouchableOpacity
        style={styles.button}
      >
        <Text style={styles.buttonText}>
          Copy Code
        </Text>
      </TouchableOpacity>

      <View style={styles.statusBox}>

  <Text style={styles.waiting}>
    Waiting for opponent...
  </Text>

  <Text style={styles.status}>
    Status: Not Connected
  </Text>

</View>
    </View>
  );
};

export default CreateRoomScreen;

const styles = StyleSheet.create({

  statusBox: {
  marginTop: 25,
  alignItems: 'center',
},

status: {
  color: '#FFB74D',
  marginTop: 10,
  fontSize: 15,
},

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
    fontSize: 18,
    marginBottom: 10,
  },

  input: {
    backgroundColor: '#1F1F1F',
    color: 'white',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
  },

  codeBox: {
    backgroundColor: '#1F1F1F',
    padding: 20,
    borderRadius: 12,
    alignItems: 'center',
  },

  code: {
    color: '#51E927',
    fontSize: 28,
    fontWeight: 'bold',
    letterSpacing: 3,
  },

  button: {
    backgroundColor: '#51E927',
    marginTop: 20,
    padding: 15,
    borderRadius: 10,
  },


  buttonText: {
    textAlign: 'center',
    fontWeight: 'bold',
    color: 'black',
  },

  waiting: {
    color: '#999',
    marginTop: 25,
    textAlign: 'center',
    fontSize: 16,
  },

});