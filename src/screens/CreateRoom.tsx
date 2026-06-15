import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

const CreateRoomScreen = ({ navigation }: any) => {
  const roomCode = 'ABC123';

  return (
    <View style={styles.container}>
      <Text style={styles.title}>CREATE ROOM</Text>

      <Text style={styles.label}>Room Code</Text>

      <View style={styles.codeBox}>
        <Text style={styles.code}>{roomCode}</Text>
      </View>

      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Copy Code</Text>
      </TouchableOpacity>

      <Text style={styles.waiting}>
        Waiting for opponent...
      </Text>

      {/* Temporary button for testing */}

      <TouchableOpacity
        style={styles.startButton}
        onPress={() => navigation.navigate('Game')}
      >
        <Text style={styles.buttonText}>
          Start Test Game
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default CreateRoomScreen;

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
    fontSize: 18,
    marginBottom: 10,
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

  startButton: {
    backgroundColor: '#51E927',
    marginTop: 30,
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