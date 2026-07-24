import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, Button, Image } from 'react-native';


export default function App() {
  return (
    <View>

      <View style={styles.mainPicture}>
        <Image style={styles.imageImg} source={require('./assets/fifa.jpg')}/>
      </View>

      <Text style={styles.welcomeTxt}>Welcome to my app!</Text>

      <Text style={styles.headingTxt}>Enter your name:</Text>
      <TextInput style={styles.inputBoxtTxt} placeholder="Heric"/>

      <Text style={styles.headingTxt}>Enter your surname:</Text>
      <TextInput style={styles.inputBoxtTxt} placeholder="Baptista"/>


      <Button title="Add user"/>
    
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
    borderColor: "gray",
    borderRadius: 5,
    padding: 10,
    marginVertical: 10,
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
});
