import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import Zeroconf from 'react-native-zeroconf';
import { GameServer } from '../network/GameServer';
import { GameMessage } from '../network/MessageTypes';
import { roomManager } from '../game/gameInstance';

const zeroconf = new Zeroconf();
let server: GameServer;

export default function HostLobbyScreen({ navigation }: any) {
  const [secret, setSecret] = useState('');
  const [joinerConnected, setJoinerConnected] = useState(false);
  const [joinerSecret, setJoinerSecret] = useState('');

  useEffect(() => {
    server = new GameServer((msg: GameMessage) => {
      if (msg.type === 'SET_SECRET') {
        setJoinerSecret(msg.payload.secret);
        setJoinerConnected(true);
      }
    });

    server.start(8080);

    // Broadcast this device on the local network
    zeroconf.publishService('bullscows', 'tcp', 'local.', 'BullsCowsGame', 8080);

    return () => {
      zeroconf.unpublishService('BullsCowsGame');
      server.stop();
    };
  }, []);

  const startGame = () => {
    server.send({ type: 'GAME_START', payload: { hostSecret: secret } });

    const room = roomManager.createRoom();
    roomManager.setHostSecret(room.roomCode, secret);
    roomManager.setJoinerSecret(room.roomCode, joinerSecret);
    roomManager.startGame(room.roomCode);

    navigation.navigate('Game', {
      roomCode: room.roomCode,
      role: 'HOST',
      server,
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Host Game</Text>

      <View style={styles.statusBox}>
        <Text style={styles.statusText}>
          {joinerConnected
            ? '✅ Friend connected!'
            : '📡 Waiting for friend to join...'}
        </Text>
        <Text style={styles.hint}>
          Make sure both phones are on the same WiFi or hotspot
        </Text>
      </View>

      <Text style={styles.label}>Your 4-digit Secret</Text>
      <TextInput
        style={styles.input}
        placeholder="1234"
        placeholderTextColor="#888"
        keyboardType="numeric"
        maxLength={4}
        value={secret}
        onChangeText={setSecret}
      />

      <TouchableOpacity
        style={[
          styles.button,
          (!joinerConnected || secret.length !== 4) && styles.buttonDisabled,
        ]}
        onPress={startGame}
        disabled={!joinerConnected || secret.length !== 4}
      >
        <Text style={styles.buttonText}>Start Game</Text>
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
  statusBox: {
    backgroundColor: '#1F1F1F',
    padding: 20,
    borderRadius: 12,
    width: '100%',
    alignItems: 'center',
    marginBottom: 30,
  },
  statusText: {
    color: '#51E927',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  hint: {
    color: '#888',
    fontSize: 13,
    textAlign: 'center',
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