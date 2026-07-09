import React, { useEffect, useState, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Alert,
  ActivityIndicator,
} from 'react-native';
import Zeroconf from 'react-native-zeroconf';
import { GameClient } from '../network/GameClient';
import { GameMessage } from '../network/MessageTypes';
import { roomManager } from '../game/gameInstance';
import { validateSecret } from '../utils/validateSecret';

let client: GameClient;

interface DiscoveredHost {
  name: string;
  host: string;
  port: number;
}

export default function JoinLobbyScreen({ navigation }: any) {
  const [secret, setSecret] = useState('');
  const [hosts, setHosts] = useState<DiscoveredHost[]>([]);
  const [connecting, setConnecting] = useState(false);
  const zeroconfRef = useRef<any>(null);

  useEffect(() => {
    const zeroconf = new Zeroconf();
    zeroconfRef.current = zeroconf;

    setHosts([]);

    zeroconf.scan('bullscows', 'tcp', 'local.');

    zeroconf.on('resolved', (service: any) => {
      setHosts((prev) => {
        const exists = prev.find((h) => h.name === service.name);
        if (exists) return prev;
        return [...prev, {
          name: service.name,
          host: service.addresses[0],
          port: service.port,
        }];
      });
    });

    zeroconf.on('remove', (name: string) => {
      setHosts((prev) => prev.filter((h) => h.name !== name));
    });

    return () => {
      zeroconf.stop();
      zeroconf.removeDeviceListeners();
      zeroconfRef.current = null;
    };
  }, []);

  const connectToHost = (host: DiscoveredHost) => {
    if (secret.length === 0) {
      Alert.alert('Missing Secret', 'Please enter your 4-digit secret number first.');
      return;
    }

    if (secret.length !== 4) {
      Alert.alert('Incomplete Secret', 'Your secret must be exactly 4 digits.');
      return;
    }

    const error = validateSecret(secret);
    if (error) {
      Alert.alert('Invalid Secret', error);
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
          server: null,
          client,
        });
      }
    });

    client.connect(
      host.host,
      host.port,
      () => {
        client.send({ type: 'SET_SECRET', payload: { secret } });
      },
      (reason: string) => {
        setConnecting(false);
        Alert.alert(
          'Connection Failed',
          reason === 'timeout'
            ? 'Timed out. Make sure you are on the same WiFi or hotspot.'
            : 'Could not connect. Try again.'
        );
      }
    );
  };

  const handleSecretChange = (value: string) => {
    if (value.length === 0) {
      setSecret('');
      return;
    }

    const lastChar = value[value.length - 1];

    if (value.length === 1 && lastChar === '0') {
      Alert.alert('Invalid', 'First digit cannot be 0.');
      setSecret('');
      return;
    }

    if (value.length > 1 && value.slice(0, -1).includes(lastChar)) {
      Alert.alert('Invalid', `${lastChar} is already in your secret.`);
      setSecret(value.slice(0, -1));
      return;
    }

    setSecret(value);
  };

  return (
    <View style={styles.container}>

      <Text style={styles.title}>Join Game</Text>

      <Text style={styles.label}>Your 4-digit Secret</Text>
      <TextInput
        style={styles.input}
        placeholder="1234"
        placeholderTextColor="#888"
        keyboardType="numeric"
        maxLength={4}
        value={secret}
        onChangeText={handleSecretChange}
      />

      <View style={styles.notesBox}>
        <Text style={styles.note}>• First digit cannot be 0</Text>
        <Text style={styles.note}>• All digits must be unique</Text>
      </View>

      <View style={styles.scanHeader}>
        <Text style={styles.sectionTitle}>Available Games</Text>
        <ActivityIndicator
          size="small"
          color="#51E927"
          animating={hosts.length === 0}
        />
      </View>

      <FlatList
        data={hosts}
        keyExtractor={(item) => item.name}
        style={styles.list}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[
              styles.hostCard,
              (connecting || secret.length !== 4) && styles.hostCardDisabled,
            ]}
            onPress={() => connectToHost(item)}
            disabled={connecting}
          >
            <View style={styles.hostCardLeft}>
              <Text style={styles.hostIcon}>🎮</Text>
              <View>
                <Text style={styles.hostName}>Game Available</Text>
                <Text style={styles.hostSub}>
                  {connecting ? 'Connecting...' : 'Tap to join'}
                </Text>
              </View>
            </View>
            <Text style={styles.hostArrow}>→</Text>
          </TouchableOpacity>
        )}
        ListEmptyComponent={
          <View style={styles.emptyBox}>
            <Text style={styles.emptyIcon}>🔍</Text>
            <Text style={styles.emptyText}>Scanning for games...</Text>
            <Text style={styles.emptySub}>
              Make sure your friend tapped "Create Room" and you are connected to their hotspot or the same WiFi.
            </Text>
          </View>
        }
      />

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    padding: 20,
    paddingTop: 60,
  },
  title: {
    color: '#51E927',
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 24,
    textAlign: 'center',
    letterSpacing: 2,
  },
  label: {
    color: '#AAA',
    fontSize: 16,
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#1F1F1F',
    color: 'white',
    padding: 15,
    borderRadius: 10,
    width: '100%',
    marginBottom: 10,
    fontSize: 18,
    textAlign: 'center',
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
  scanHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  sectionTitle: {
    color: '#51E927',
    fontSize: 18,
    fontWeight: 'bold',
  },
  list: {
    flex: 1,
  },
  hostCard: {
    backgroundColor: '#1F1F1F',
    padding: 18,
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#51E927',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  hostCardDisabled: {
    borderColor: '#2a5c12',
    opacity: 0.6,
  },
  hostCardLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  hostIcon: {
    fontSize: 28,
  },
  hostName: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  hostSub: {
    color: '#888',
    fontSize: 13,
    marginTop: 3,
  },
  hostArrow: {
    color: '#51E927',
    fontSize: 20,
    fontWeight: 'bold',
  },
  emptyBox: {
    alignItems: 'center',
    marginTop: 40,
    padding: 20,
  },
  emptyIcon: {
    fontSize: 40,
    marginBottom: 12,
  },
  emptyText: {
    color: '#51E927',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  emptySub: {
    color: '#555',
    fontSize: 13,
    textAlign: 'center',
    lineHeight: 20,
  },
});