import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Alert,
} from 'react-native';
import Zeroconf from 'react-native-zeroconf';
import { GameClient } from '../network/GameClient';
import { GameMessage } from '../network/MessageTypes';
import { roomManager } from '../game/gameInstance';

const zeroconf = new Zeroconf();
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

  useEffect(() => {
    // Start scanning for hosts on the network
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
    };
  }, []);

  const connectToHost = (host: DiscoveredHost) => {
    if (secret.length !== 4) {
      Alert.alert('Missing Secret', 'Enter your 4-digit secret first.');
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

    client.connect(host.host, host.port);

    setTimeout(() => {
      client.send({ type: 'SET_SECRET', payload: { secret } });
    }, 500);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Join Game</Text>

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

      <Text style={styles.sectionTitle}>
        {hosts.length === 0
          ? '🔍 Scanning for hosts...'
          : 'Available Games'}
      </Text>

      <FlatList
        data={hosts}
        keyExtractor={(item) => item.name}
        style={styles.list}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.hostCard}
            onPress={() => connectToHost(item)}
            disabled={connecting}
          >
            <Text style={styles.hostName}>🎮 {item.name}</Text>
            <Text style={styles.hostSub}>Tap to join</Text>
          </TouchableOpacity>
        )}
        ListEmptyComponent={
          <Text style={styles.emptyText}>
            No games found. Make sure your friend tapped "Create Room" and both phones are on the same WiFi or hotspot.
          </Text>
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
    marginBottom: 30,
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
    marginBottom: 30,
    fontSize: 18,
    textAlign: 'center',
  },
  sectionTitle: {
    color: '#51E927',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
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
  },
  hostName: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  hostSub: {
    color: '#888',
    fontSize: 13,
    marginTop: 4,
  },
  emptyText: {
    color: '#555',
    fontSize: 14,
    textAlign: 'center',
    marginTop: 20,
    lineHeight: 22,
  },
});