import React, { useState } from 'react';

import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';

import { roomManager }
from '../game/gameInstance';

const JoinRoomScreen = ({
  navigation,
}: any) => {

  const [roomCode, setRoomCode] =
    useState('');

  const handleJoinRoom =
    () => {

      try {

        const room =
          roomManager.joinRoom(
            roomCode
          );

        navigation.navigate(
          'SecretSetup',
          {
            roomCode:
              room.roomCode,
            role:
              'JOINER',
          }
        );

      } catch (error: any) {

        Alert.alert(
          'Join Failed',
          error.message
        );

      }

    };

  return (

    <View style={styles.container}>

      <Text style={styles.title}>
        JOIN ROOM
      </Text>

      <Text style={styles.label}>
        Enter Room Code
      </Text>

      <TextInput
        style={styles.input}
        placeholder="1234"
        placeholderTextColor="#888"
        value={roomCode}
        onChangeText={
          setRoomCode
        }
        autoCapitalize="characters"
      />

      <TouchableOpacity
        style={styles.button}
        onPress={
          handleJoinRoom
        }
      >
        <Text
          style={
            styles.buttonText
          }
        >
          Join Room
        </Text>
      </TouchableOpacity>

    </View>

  );

};

export default JoinRoomScreen;

const styles =
  StyleSheet.create({

    container: {
      flex: 1,
      backgroundColor:
        '#121212',
      justifyContent:
        'center',
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
      backgroundColor:
        '#1F1F1F',
      color: 'white',
      padding: 15,
      borderRadius: 10,
      fontSize: 18,
    },

    button: {
      backgroundColor:
        '#51E927',
      padding: 15,
      borderRadius: 10,
      marginTop: 20,
    },

    buttonText: {
      textAlign: 'center',
      fontWeight: 'bold',
      color: 'black',
      fontSize: 16,
    },

  });