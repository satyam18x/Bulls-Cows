import { StyleSheet, Text, View , ScrollView} from 'react-native'
import React from 'react'

export default function ElevatedCards() {
  return (
    <View>
      <Text style={styles.headingtext}>ElevatedCards</Text>
      <ScrollView horizontal={true} style={styles.container}>
       <View style={[styles.card , styles.Elevatedcards]}>
        <Text>Tap</Text>
       </View>
       <View style={[styles.card , styles.Elevatedcards]}>
        <Text>Me</Text>
       </View>
       <View style={[styles.card , styles.Elevatedcards]}>
        <Text>to</Text>
       </View>
       <View style={[styles.card , styles.Elevatedcards]}>
        <Text>Scroll</Text>
       </View>
       <View style={[styles.card , styles.Elevatedcards]}>
        <Text>More...</Text>
       </View>
    </ScrollView>
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
    container:{
        padding:20

    },
    card : {
        flex:1,
         width:100,
        height:100,
        justifyContent : "center",
        alignItems : "center",
        margin : 7,
        borderRadius : 8

    },
    Elevatedcards:{
            backgroundColor : "yellow",
    }

})