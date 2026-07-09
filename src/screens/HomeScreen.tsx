import React from "react";

import {
    View,
    Text,
    StyleSheet,
    useColorScheme,
    ScrollView,
    TouchableOpacity,
} from "react-native";
import { roomManager } from '../game/gameInstance';

function HomeScreen({ navigation }: any) {
    
    const isDarkMode = useColorScheme() === "dark";

    const textColor = isDarkMode ? styles.wText : styles.darkText;
    const handleDevTest = () => {
  const room = roomManager.createRoom();
  roomManager.setHostSecret(room.roomCode, '1234');
  roomManager.setJoinerSecret(room.roomCode, '5678');
  roomManager.startGame(room.roomCode);
  navigation.navigate('Game', { roomCode: room.roomCode, role: 'HOST' });
};

    return (
        <View
            style={[
                styles.container,
                { backgroundColor: isDarkMode ? "#121212" : "#F5F5F5" },
            ]}
        >

            <View style={styles.titleContainer}>
                <Text style={styles.gameTitle}>BULLS & COWS</Text>
                <Text style={styles.subtitle}>A Multiplayer Game</Text>
            </View>

            <View>
                <TouchableOpacity
                    style={styles.button}
                   onPress={() => navigation.navigate('HostLobby')}
                >
                    <Text style={styles.buttonText}>Create Room</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.button}
                    onPress={() => navigation.navigate('JoinLobby')}
                >
                    <Text style={styles.buttonText}>Join Room</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.rules}>
                <Text style={styles.rulesTitle}>RULES</Text>

                <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={styles.rulesContainer}>
                        <Text style={textColor}>
                            1. Each player secretly chooses a 4-digit number.
                        </Text>

                        <Text style={textColor}>
                            2. All digits must be unique (no repeated digits).
                        </Text>

                        <Text style={textColor}>
                            3. Players take turns guessing the opponent's secret number.
                        </Text>

                        <Text style={textColor}>
                            4. After each guess:
                        </Text>

                        <Text style={textColor}>
                            • Bull = Correct digit in the correct position.
                        </Text>

                        <Text style={textColor}>
                            • Cow = Correct digit in the wrong position.
                        </Text>

                        <Text style={textColor}>
                            5. Use the feedback to narrow down the opponent's number.
                        </Text>

                        <Text style={textColor}>
                            6. The first player to guess the opponent's number correctly
                            (4 Bulls) wins the game.
                        </Text>

                        <Text style={[textColor, styles.exampleTitle]}>
                            Example:
                        </Text>

                        <Text style={textColor}>
                            Secret Number: 4271
                        </Text>

                        <Text style={textColor}>
                            Guess: 1234
                        </Text>

                        <Text style={textColor}>
                            Result: 1 Bull, 2 Cows
                        </Text>
                    </View>
                </ScrollView>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 20,
        paddingTop: 50,
    },

    titleContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },

    gameTitle: {
        fontSize: 34,
        fontWeight: "bold",
        color: "#51E927",
        letterSpacing: 2,
    },

    subtitle: {
        marginTop: 10,
        fontSize: 18,
        color: "#888",
        fontWeight: "500",
    },

    rules: {
        borderTopWidth: 1,
        borderTopColor: "#444",
        paddingTop: 15,
        paddingBottom: 20,
        maxHeight: "45%",
    },

    rulesTitle: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#51E927",
        marginBottom: 10,
    },

    rulesContainer: {
        width: "100%",
    },

    wText: {
        color: "#FFFFFF",
        fontSize: 14,
        lineHeight: 22,
        marginVertical: 2,
        textAlign: "left",
    },

    darkText: {
        color: "#000000",
        fontSize: 14,
        lineHeight: 22,
        marginVertical: 2,
        textAlign: "left",
    },

    exampleTitle: {
        marginTop: 12,
        fontWeight: "bold",
    },
    buttonContainer: {
        marginBottom: 25,
    },

    button: {
        backgroundColor: "#51E927",
        paddingVertical: 14,
        borderRadius: 12,
        marginBottom: 12,
        alignItems: "center",
    },

    buttonText: {
        color: "#121212",
        fontSize: 16,
        fontWeight: "bold",
    },
});

export default HomeScreen;