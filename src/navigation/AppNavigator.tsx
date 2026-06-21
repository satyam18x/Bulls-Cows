import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from '../screens/HomeScreen';
import CreateRoomScreen from '../screens/CreateRoom';
import JoinRoomScreen from '../screens/JoinRoom';
import GameScreen from '../screens/GameScreen';
import ResultScreen from '../screens/ResultScreen';
import SecretSetup from '../screens/SecretSetup';
import HostLobbyScreen from '../screens/HostLobbyScreen';
import JoinLobbyScreen from '../screens/JoinLobbyScreen';


export type RootStackParamList = {
  Home: undefined;

  CreateRoom: undefined;

  JoinRoom: undefined;

  SecretSetup: {
    roomCode: string;
    role: "HOST" | "JOINER";
  };

  Game: {
    roomCode: string;
    role: "HOST" | "JOINER";
  };

  Result: {
    roomCode: string;
  };
  HostLobby: undefined;   
  JoinLobby: undefined;   
};


const Stack =
  createNativeStackNavigator<RootStackParamList>();

function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false
        }}
      >
        <Stack.Screen
          name="Home"
          component={HomeScreen}
        />

        <Stack.Screen
          name="CreateRoom"
          component={CreateRoomScreen}
        />

        <Stack.Screen
          name="JoinRoom"
          component={JoinRoomScreen}
        />

        <Stack.Screen
          name="SecretSetup"
          component={SecretSetup}
        />

        <Stack.Screen
          name="Game"
          component={GameScreen}
        />

        <Stack.Screen
          name="Result"
          component={ResultScreen}
        />
        <Stack.Screen name="HostLobby" component={HostLobbyScreen} />
        <Stack.Screen name="JoinLobby" component={JoinLobbyScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AppNavigator;