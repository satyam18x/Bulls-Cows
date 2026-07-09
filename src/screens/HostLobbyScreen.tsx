import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert
} from 'react-native';
import Zeroconf from 'react-native-zeroconf';
import { GameServer } from '../network/GameServer';
import { GameMessage } from '../network/MessageTypes';
import { roomManager } from '../game/gameInstance';
import { validateSecret } from '../utils/validateSecret';

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

    // Broadcast this device so joiners can find it
    zeroconf.publishService('bullscows', 'tcp', 'local.', 'BullsCowsGame', 8080);

    return () => {
      zeroconf.unpublishService('BullsCowsGame');
      server.stop();
    };
  }, []);

  const startGame = () => {
    const error = validateSecret(secret);
    if (error) {
      Alert.alert('Invalid Secret', error);
      return;
    }

    server.send({ type: 'GAME_START', payload: { hostSecret: secret } });

    const room = roomManager.createRoom();
    roomManager.setHostSecret(room.roomCode, secret);
    roomManager.setJoinerSecret(room.roomCode, joinerSecret);
    roomManager.startGame(room.roomCode);

    navigation.navigate('Game', {
      roomCode: room.roomCode,
      role: 'HOST',
      server,
      client: null,
    });
  };
const handleSecretChange = (value: string) => {
  if (value.length === 0) {
    setSecret('');
    return;
  }

  const lastChar = value[value.length - 1];

  // Block 0 as first digit
  if (value.length === 1 && lastChar === '0') {
    Alert.alert('Invalid', 'First digit cannot be 0.');
    setSecret(''); // clear it
    return;
  }

  // Block duplicates
  if (value.length > 1 && value.slice(0, -1).includes(lastChar)) {
    Alert.alert('Invalid', `${lastChar} is already in your secret.`);
    setSecret(value.slice(0, -1)); // remove the duplicate
    return;
  }

  setSecret(value);
};
  return (
    <View style={styles.container}>

      <Text style={styles.title}>Host Game</Text>

      <View style={styles.statusBox}>
        {joinerConnected ? (
          <>
            <Text style={styles.statusIcon}>✅</Text>
            <Text style={styles.statusText}>Friend Connected!</Text>
            <Text style={styles.statusSub}>Your friend has joined the lobby</Text>
          </>
        ) : (
          <>
            <Text style={styles.statusIcon}>📡</Text>
            <Text style={styles.statusText}>Waiting for friend...</Text>
            <Text style={styles.statusSub}>
              Ask your friend to connect to your hotspot or same WiFi, then open the app and tap "Join Room"
            </Text>
          </>
        )}
      </View>

      <Text style={styles.label}>Your 4-digit Secret</Text>
      <TextInput
        style={styles.input}
        placeholder="1234"
        placeholderTextColor="#888"
        keyboardType="numeric"
        maxLength={4}
        value={secret}
        onChangeText={handleSecretChange}  // ← change this
      />
    {/* Notes below input */}
<View style={styles.notesBox}>
  <Text style={styles.note}>• First digit cannot be 0</Text>
  <Text style={styles.note}>• All digits must be unique</Text>
</View>
      <TouchableOpacity
        style={[
          styles.button,
          (!joinerConnected || secret.length !== 4) && styles.buttonDisabled,
        ]}
        onPress={startGame}
        disabled={!joinerConnected || secret.length !== 4}
      >
        <Text style={styles.buttonText}>
          {!joinerConnected
            ? 'Waiting for friend...'
            : secret.length !== 4
              ? 'Enter your secret first'
              : '🎮 Start Game'}
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
    marginBottom: 30,
    letterSpacing: 2,
  },
 notesBox: {
  width: '100%',
  backgroundColor: '#1a1a1a',
  borderLeftWidth: 3,
  borderLeftColor: '#51E927',
  borderRadius: 6,
  paddingVertical: 10,
  paddingHorizontal: 14,
  marginBottom: 24,
  gap: 6,
},

note: {
  color: '#AAA',
  fontSize: 13,
  lineHeight: 20,
},
  statusBox: {
    backgroundColor: '#1F1F1F',
    padding: 24,
    borderRadius: 14,
    width: '100%',
    alignItems: 'center',
    marginBottom: 30,
  },
  statusIcon: {
    fontSize: 36,
    marginBottom: 10,
  },
  statusText: {
    color: '#51E927',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  statusSub: {
    color: '#888',
    fontSize: 13,
    textAlign: 'center',
    lineHeight: 20,
  },
  label: {
    color: '#AAA',
    fontSize: 16,
    marginBottom: 8,
    alignSelf: 'flex-start',
  },
  input: {
    backgroundColor: '#1F1F1F',
    color: 'white',
    padding: 15,
    borderRadius: 10,
    width: '100%',
    marginBottom: 20,
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