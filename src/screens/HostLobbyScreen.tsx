import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { NetworkInfo } from 'react-native-network-info';
import { GameServer } from '../network/GameServer';
import { GameMessage } from '../network/MessageTypes';
import { roomManager } from '../game/gameInstance';

let server: GameServer;

export default function HostLobbyScreen({ navigation }: any) {
  const [ip, setIp] = useState('');
  const [secret, setSecret] = useState('');
  const [joinerConnected, setJoinerConnected] = useState(false);
  const [joinerSecret, setJoinerSecret] = useState('');

  useEffect(() => {
    NetworkInfo.getIPAddress().then((addr) => setIp(addr ?? ''));

    server = new GameServer((msg: GameMessage) => {
      if (msg.type === 'SET_SECRET') {
        setJoinerSecret(msg.payload.secret);
        setJoinerConnected(true);
      }
    });

    server.start(8080);
    return () => server.stop();
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
      <Text style={styles.label}>Your IP Address</Text>
      <Text style={styles.ip}>{ip || 'Loading...'}</Text>
      <Text style={styles.hint}>Share this IP with the other player</Text>

      <Text style={styles.status}>
        {joinerConnected ? '✅ Joiner Connected!' : '⏳ Waiting for joiner...'}
      </Text>

      <TextInput
        style={styles.input}
        placeholder="Your 4-digit secret"
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
  label: {
    color: '#AAA',
    fontSize: 16,
    marginBottom: 8,
  },
  ip: {
    color: '#51E927',
    fontSize: 32,
    fontWeight: 'bold',
    letterSpacing: 2,
    marginBottom: 12,
  },
  hint: {
    color: '#888',
    fontSize: 14,
    marginBottom: 20,
  },
  status: {
    color: '#51E927',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 24,
  },
  input: {
    backgroundColor: '#1F1F1F',
    color: 'white',
    padding: 15,
    borderRadius: 10,
    width: '100%',
    marginBottom: 16,
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