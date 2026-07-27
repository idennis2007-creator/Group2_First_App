import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, Button, Image } from 'react-native';
import {useState} from 'react';
import {NavigationContainer, StackActions} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


export default function App() {
  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component = {MainScreen}/>
      </Stack.Navigator>
    </NavigationContainer>
  ); 
}

function MainScreen() {
  const [Name, setName] = useState('');
  const [Surname, setSurname] = useState(''); 

  console.log("App works!");

  return (
    <View> 

      <View style= {styles.mainPicture}>
        <Image style={styles.imageImg} source = {require('./assets/fifa.jpg')}/> 
      </View>

      <Text style = {styles.welcomeTxt}>Welcome to my app!</Text>

      <Text style={styles.headingTxt}>Enter your name:</Text>
      <TextInput style={styles.inputBoxtTxt} placeholder="Heric"
        onChangeText={newText => setName(newText)}/>
      <Text style={styles.headingTxt}>Enter your surname:</Text>
      <TextInput style={styles.inputBoxtTxt} placeholder="Baptista"
        onChangeText={newText => setSurname(newText)}/>

      <Button title="Add user"
        onPress={() => {
          console.log("Name: " + Name + ", Surname: " + Surname);
        }}/>

      <StatusBar style="auto" />
    </View>
    
  );
}

const styles = StyleSheet.create({
  welcomeTxt: {
    paddingTop: 50,
    color: "Pink",
    fontWeight: "bold",
    fontSize: 35,
    textAlign: "center",
  },
  headingTxt: {
    paddingTop: 20, 
    color: "Black",
    fontWeight: "600",
    fontSize: 18,
  },

  inputBoxtTxt: {
    borderWidth: 1,
  },

  mainPicture: {
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 30,
  },
  imageImg: {
    width: 300,
    height: 200,
    resizeMode: "contain",
  },
  inputFlex: {
    marginTop: 20,
    justifyContent: 'space-evenly',
  }
});
