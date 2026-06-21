import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import { GameClient } from '../network/GameClient';
import { GameMessage } from '../network/MessageTypes';
import { roomManager } from '../game/gameInstance';

let client: GameClient;

export default function JoinLobbyScreen({ navigation }: any) {
  const [hostIP, setHostIP] = useState('');
  const [secret, setSecret] = useState('');
  const [connecting, setConnecting] = useState(false);

  const connect = () => {
    if (!hostIP) {
      Alert.alert('Missing IP', 'Please enter the host IP address.');
      return;
    }
    if (secret.length !== 4) {
      Alert.alert('Missing Secret', 'Please enter your 4-digit secret number.');
      return;
    }

    setConnecting(true);

    client = new GameClient((msg: GameMessage) => {
      if (msg.type === 'GAME_START') {
        const room = roomManager.createRoom();
        roomManager.setHostSecret(room.roomCode, msg.payload.hostSecret);
        roomManager.setJoinerSecret(room.roomCode, secret);
        roomManager.startGame(room.roomCode);

        navigation.navigate('Game', {
          roomCode: room.roomCode,
          role: 'JOINER',
          client,
        });
      }
    });

    // Send secret only after socket is confirmed open — no setTimeout
    client.connect(hostIP, 8080, () => {
      client.send({ type: 'SET_SECRET', payload: { secret } });
    });
  };

  return (
    <View style={styles.container}>

      <Text style={styles.title}>Join Game</Text>

      <Text style={styles.label}>Host IP Address</Text>
      <TextInput
        style={styles.input}
        value={hostIP}
        onChangeText={setHostIP}
        placeholder="192.168.x.x"
        placeholderTextColor="#888"
        keyboardType="numeric"
      />

      <Text style={styles.label}>Your 4-digit Secret</Text>
      <TextInput
        style={styles.input}
        value={secret}
        onChangeText={setSecret}
        placeholder="1234"
        placeholderTextColor="#888"
        keyboardType="numeric"
        maxLength={4}
      />

      <TouchableOpacity
        style={[styles.button, connecting && styles.buttonDisabled]}
        onPress={connect}
        disabled={connecting}
      >
        <Text style={styles.buttonText}>
          {connecting ? 'Connecting...' : 'Connect & Join'}
        </Text>
      </TouchableOpacity>

    </View>
  );
}

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
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 40,
    letterSpacing: 2,
  },
  label: {
    color: '#AAA',
    fontSize: 16,
    alignSelf: 'flex-start',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#1F1F1F',
    color: 'white',
    padding: 15,
    borderRadius: 10,
    width: '100%',
    marginBottom: 24,
    fontSize: 18,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#51E927',
    padding: 15,
    borderRadius: 10,
    width: '100%',
    alignItems: 'center',
  },
  buttonDisabled: {
    backgroundColor: '#2a5c12',
  },
  buttonText: {
    color: '#121212',
    fontWeight: 'bold',
    fontSize: 16,
  },
});