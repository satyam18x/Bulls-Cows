import React from 'react';

import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

import { roomManager }
from '../game/gameInstance';

const ResultScreen = ({
  navigation,
  route,
}: any) => {

  const {
    roomCode,
    role,
  } = route.params;

  const room =
    roomManager.getRoom(
      roomCode
    );

  if (
    !room ||
    !room.gameEngine
  ) {

    return (
      <View style={styles.container}>
        <Text style={styles.resultText}>
          No Game Found
        </Text>
      </View>
    );

  }

  const winner =
    room.gameEngine.getWinner();

  const isWinner =
    winner === role;

  const handlePlayAgain =
    () => {

      roomManager.destroyRoom(
        roomCode
      );

      navigation.reset({
        index: 0,
        routes: [
          {
            name: 'Home',
          },
        ],
      });

    };

  return (

    <View style={styles.container}>

      <Text style={styles.title}>
        GAME OVER
      </Text>

      <Text style={styles.resultText}>

        {isWinner
          ? '🏆 YOU WIN!'
          : '💀 YOU LOSE!'}

      </Text>

      <Text style={styles.info}>

        Winner:
        {' '}
        {winner}

      </Text>

      <TouchableOpacity
        style={styles.button}
        onPress={
          handlePlayAgain
        }
      >

        <Text
          style={
            styles.buttonText
          }
        >
          Back To Home
        </Text>

      </TouchableOpacity>

    </View>

  );

};

export default ResultScreen;

const styles =
  StyleSheet.create({

    container: {
      flex: 1,
      backgroundColor:
        '#121212',
      justifyContent:
        'center',
      alignItems:
        'center',
      padding: 20,
    },

    title: {
      color: '#51E927',
      fontSize: 32,
      fontWeight: 'bold',
      marginBottom: 30,
    },

    resultText: {
      color: 'white',
      fontSize: 28,
      fontWeight: 'bold',
      marginBottom: 20,
    },

    info: {
      color: '#AAA',
      fontSize: 18,
      marginBottom: 40,
    },

    button: {
      backgroundColor:
        '#51E927',
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