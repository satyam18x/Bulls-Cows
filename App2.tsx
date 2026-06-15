import { View, Text,ScrollView } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
import React from 'react'
import Flatcards from './tutorialComponents/Flatcards';
import ElevatedCards from './tutorialComponents/ElevatedCards';
import FancyCards from './tutorialComponents/FancyCards';
import ActionCard from './tutorialComponents/ActionCard';
import ContactList from './tutorialComponents/ContactList';


const App2 = () => {
  return (

   <SafeAreaView>
      
         <ScrollView>
          <Flatcards></Flatcards>
          <ElevatedCards></ElevatedCards>
          <FancyCards></FancyCards>
          <ActionCard></ActionCard>
          <ContactList></ContactList>
         </ScrollView>
   </SafeAreaView>
  )
}

export default App2