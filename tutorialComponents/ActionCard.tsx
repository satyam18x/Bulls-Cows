import { StyleSheet, Text, View, Linking, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import ElevatedCards from './ElevatedCards'

export default function ActionCard() {
    function openWebsite(websiteLink: string) {
        Linking.openURL(websiteLink)
    }
    return (
        <View>
            <Text style={styles.headingText}>Blog Card</Text>
            <View style={[styles.card, styles.elevatedCards]}>
                <View style={styles.headingContainer}>
                    <Text style={styles.header}>What's new in Javascript 21 - ES12</Text>
                </View>
                <Image source={{
                    uri: 'https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGphdmFzY3JpcHR8ZW58MHx8MHx8fDA%3D'

                }} style={styles.cardImage} />

                <View style={styles.bodycontainer}>
                    <Text numberOfLines={3} style={styles.bodyText}>
                        Just like every year, Javascript brings in new features. This year
                        javascript is bringing 4 new features, which are almost in
                        production rollout. I won't be wasting much more time and directly
                        jump to code with easy to understand examples.
                    </Text>
                </View>
                <View style={styles.footer}>
                    <TouchableOpacity onPress={() => openWebsite('https://github.com/satyam18x/React-Native')} >
                        <Text style={styles.socialLinks}>Read More</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => openWebsite('https://www.linkedin.com/in/satyam-haldkar-b9b366310')} >
                        <Text style={styles.socialLinks}>Follow Me</Text>
                    </TouchableOpacity>


                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    headingText: {
        color: "white",
        fontSize : 24,
        fontWeight : "bold",
        paddingHorizontal : 8,
    },
    card: {
       
        width : 365,
        height : 370,
        marginHorizontal :14,
        marginVertical : 16,
        borderRadius : 8,
    },
    elevatedCards: {
        backgroundColor : "black",
        elevation : 3,
        shadowOffset: {
            width: 1,
            height: 1
        },
        shadowColor : "white"

    },
    headingContainer: {
        height : 40,
        flexDirection :"row",
        alignItems : "center",
        justifyContent : "center"
    },
    header: {
        color: "white",
        fontSize : 16,
        fontWeight : "500"
    },
    cardImage: {
        height : 190
    },
    bodycontainer: {
        padding : 10,
    },
    bodyText: {
        color: "white"
    },
    footer: {
        
padding :8,
flexDirection : "row",
justifyContent :"space-around"
    },
    socialLinks: {
        backgroundColor : "white",
        padding : 10,
        borderRadius : 10,
        
    }

})