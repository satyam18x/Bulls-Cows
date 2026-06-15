import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

export default function Flatcards() {
  return (
    <View>
      <Text style={styles.headingtext}>Flatcards</Text>
      <View style={styles.container}>
        <View style={[styles.cards , styles.cardOne]}>
            <Text>Blue</Text>

        </View>
        <View style={[styles.cards , styles.cardTwo]}>
            <Text>white</Text>

        </View>
        <View style={[styles.cards , styles.cardThree]}>
            <Text>Green</Text>

        </View>
         <View style={[styles.cards , styles.cardFour]}>
            <Text>Green</Text>

        </View>
        
      </View>
    </View>
  )
}

const styles = StyleSheet.create({

    headingtext : {
        fontSize : 24,
        color : "white",
        fontWeight : "bold",
        paddingHorizontal : 10
    },
    container : {
          flex :1,
          flexDirection : "row",
          padding : 10,
          justifyContent : "space-between"
          
          
},
    cards :{
        width : 100,
        height : 100,
        borderRadius : 7,
        justifyContent : "center",
        alignItems : "center"
        
    },

    cardOne : {
        backgroundColor : "cyan"


    },
     cardTwo : {
        backgroundColor : "white"


    },
     cardThree : {
        backgroundColor : "lightgreen"


    },
     cardFour : {
        backgroundColor : "grey"


    }

})