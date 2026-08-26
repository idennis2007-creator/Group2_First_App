import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, Button, Image, SafeAreaView, ScrollView, Animated, ViewStyle, StyleProp } from 'react-native';
import {useState, useRef, useEffect, ReactNode} from 'react';
import {NavigationContainer,} from '@react-navigation/native';
import {createNativeStackNavigator, NativeStackScreenProps} from '@react-navigation/native-stack'; 
import {RadioButton} from 'react-native-paper';
import { Easing } from 'react-native';
import { ImageSourcePropType } from 'react-native;

type RootStackParamList = {
  Home: undefined;
  View: {
    NameSend: string;
    SurnameSend: string;
  };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

type MainScreenProps = NativeStackScreenProps<
RootStackParamList,
'Home'
>;

type ViewDetailsProps = NativeStackScreenProps<
RootStackParamList,
'View'
>;

export default function App() {  
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component= {MainScreen}/>
        <Stack.Screen name="View" component= {ViewDetails}/>
      </Stack.Navigator>
    </NavigationContainer>
  ); 
}

function MainScreen({navigation}: MainScreenProps){
  const [Name, setName] = useState('');
  const [Surname, setSurname] = useState(''); 
  const [Error, setError] = useState('');

  console.log("App works!");

  return (
    <View> 
        <SafeAreaView>
          <ScrollView>
        <Image style={styles.imageImg} 
        source = {require('./assets/fifa.jpg')}/> 

        <Text style = {styles.welcomeTxt}>Welcome to my app!</Text>

      <FadeInView>
        <Text style={styles.redTxt}>{Error}</Text>
        <View style={styles.inputFlex}>
          <Text style ={styles.headingTxt}>Enter your name:</Text>
          <TextInput style={styles.inputBoxtTxt}
          placeholder ="Heric"
          onChangeText={(text)=> setName(text)}/>

          <Text style ={styles.headingTxt}>Enter your surname:</Text>
          <TextInput style={styles.inputBoxtTxt}
          placeholder ="Baptista"
          onChangeText={(text)=> setSurname(text)}/> 
        </View>
      </FadeInView>

      <Button title="Add user"
        onPress={() => {

          if (isEmpty(Name) || isEmpty(Surname) == false)
          {
            
            navigation.navigate('View', {
              NameSend: Name,
              SurnameSend: Surname,
            });
            setError('');
          }
          else{
            setError('Fields are empty!');
          }
        

          console.log("Name: " + Name + ", Surname: " + Surname);
        }}/>

      <StatusBar style="auto" />
      </ScrollView>
      </SafeAreaView>
    </View>
  );
}

function ViewDetails({ navigation, route}: ViewDetailsProps){

  const NameGet = route.params.NameSend;
  const SurnameGet = route.params.SurnameSend; 
  const [selectedValue, setSelectedValue] = useState('0');
  const [ImageBlock, setImage] = useState<ImageSourcePropType | undefined>(undefined); 


  return (
    <View style = {{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <View style = {{flex: 0, justifyContent: 'center', alignItems: 'center'}}> 
        <Text style = {{fontWeight: 'bold', fontSize: 20}}>Welcome {NameGet} {SurnameGet}!</Text>
        <Text> Please choose a Language:</Text>
      </View>

      <View style ={styles.radioContainer}>
        <View style ={styles.radioGroup}>
          <View style ={styles.radioButton}>
            <RadioButton.Android
            value = "1"
            status = {selectedValue == "1" ? 'checked' : 'unchecked'}
            onPress = {() => setSelectedValue("1")}
            color = "rgb(0, 166, 255)"
            />
            <Text style={styles.radioLabel}>React Native</Text>
          </View><RadioButton.Android
            value = "1"
            status = {selectedValue == "2" ? 'checked' : 'unchecked'}
            onPress = {() => setSelectedValue("2")}
            color = "rgb(0, 115, 255)"
            />
            <Text style={styles.radioLabel}>Kotlin</Text>
          </View><RadioButton.Android
            value = "1"
            status = {selectedValue == "3" ? 'checked' : 'unchecked'}
            onPress = {() => setSelectedValue("3")}
            color = "rgb(0, 66,255)"
            />
            <Text style={styles.radioLabel}>HTML and CSS</Text>
          </View>
          <View>
            <View style = { {flex: 1 } }>
              <Text style = { {fontWeight: "bold",flex: 0,paddingTop: 40,
                justifyContent: 'center',textAlign: 'center', alignItems: 'center'} }>
                  Generate your Language
              </Text>

              <Button title = "Generate"
              onPress = {() => {

                switch (selectedValue)
                {
                  case "1":
                    setImage (require('./images/react-native.png'))
                  case "2":
                    setImage (require('./images/kotlin.png'))
                  case "3":
                    setImage (require('./images/html.png')) 
                    default: 
                    setImage(undefined); 


                }
              }}
              />
              </View style = {styles.container}
              <Image source={imageBlock} style={styles,ViewImage}></Image>
          </View>
    
  );
};

function isEmpty(value: any) {
  return(
    (value === null) || 

    (value .hasOwnProperty('length') && value.length === 0) || 

    (value.constructor === Object && Object.keys(value).length === 0)
  )
};

interface FadeInViewProps {
  style?: StyleProp<ViewStyle>;
  children?: ReactNode;
}

const FadeInView =({style, children}: FadeInViewProps) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  
  useEffect(() => {
    Animated.timing(
      fadeAnim,
      {
        toValue: 1,
        duration: 3000, 
        useNativeDriver: false
      }
  ).start();
}, [fadeAnim])

   return (
    <Animated.View style ={{
      ...(style as object),
      opacity: fadeAnim
    }}>
      {children}

    </Animated.View>
   )
}

  function AppNavigator() {
    return (
      <Stack.Navigator>
        <Stack.Screen name="Home" 
      component={MainScreen} options={{ animation: 
      'slide_from_right'}} />
        <Stack.Screen name= "View" 
        component={ViewDetails} options ={{animation:
         'fade_from_bottom'}} />
      </Stack.Navigator>
    )
  }

  function SlideIn({children}) {
    const t = useRef(new Animated.Value(100)).current;
    const o = useRef(new Animated.Value(0)).current;

    useEffect(() => {
      Animated.parallel([
        Animated.timing(t, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: false
        }),
        Animated.timing(o, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: false
        }),
      ]). start();
    }, []);
    
    return (
      <Animated.View style={{transform:[{translateY: t}], opacity: o}}>
        {children}
      </Animated.View>
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
  },

  redTxt: {
    color: "red",
    fontWeight: "bold",
    fontSize: 20,
    textAlign: "center",
  },

  radioContainer: {
    flex: 0, 
    backgroundColor: 'rgb(255, 0, 128)',
    justifyContent: 'center', 
    alignItems: 'center', 
  },

  radioButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  radioLabel:{
    marginLeft: 6,
    fontSize: 16,
    color: '#000000',
  },

  radioGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginTop: 20, 
    borderRadius: 10, 
    backgroundColor: '#f0f0f0',
    padding: 12, 
    elevation: 6, 
    shadowColor: '#b30086',
    shadowOffset: {
      width: 0, 
      height: 2
    }, 
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    viewImage: {
      width: 350, 
      height: 350, 
      alignContent: 'center'
    }, 

    container: {
      flex: 0
    }

    
  }

});
