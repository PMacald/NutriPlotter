import React from 'react';
import {
  KeyboardAvoidingView,
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Alert
} from 'react-native';
import { Font } from 'expo';
//import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import {RegistrationTextInputWithSwitch} from '../components/TextInputWithSwitch';
import {RegistrationTextInput} from '../components/TextInput';
import {SwipeArrow} from '../components/SwipeArrow';

//constants are capital cased usually
const BASE_NAME_PH = "Name"; // PH - Placeholder
const BASE_AGE_PH = "Age";
const BASE_MAIL_PH = "E-Mail";
const BASE_PASS_PH = "Password";





export default class HomeScreen extends React.Component {
  state = {
    isFontLoaded: false,
  }
  componentWillMount() {
     this._loadAssetsAsync();
  }

  _loadAssetsAsync = async () => {
   await Font.loadAsync({
     pacifico: require("../assets/fonts/Pacifico-Regular.ttf"),
     NunitoSans: require("../assets/fonts/NunitoSans-LightItalic.ttf"),
     Palanquin: require("../assets/fonts/Palanquin-Light.ttf"),
   });

   handleOptionA = () => {
     Alert.alert("option A is pressed");
     this.state.isFemale = false;
     console.log(this.state);
   }

   handleOptionB = () => {
     Alert.alert("option B is pressed");
     this.state.isFemale = true;
     console.log(this.state);
   }


   this.setState({
      isFontLoaded: true,
      isFemale: null,
   });
 };

  static navigationOptions = {
    header: null,
  };
  render() {
    if (!this.state.isFontLoaded){
      return (<Text>Loading...</Text>)
    }else{
      return (

        <KeyboardAvoidingView
          style={styles.container}
          behavior='position'
          ><View style={styles.container}>


            <View style={styles.welcomeContainer}>
              <Text style={styles.title}>Welcome to Nutriplotter</Text>
            </View>

            <Image style={{width:100, height:100}}source={require('../assets/images/plusicon.png')}/>

            <RegistrationTextInput
              textPH = {BASE_NAME_PH}
            />
            <RegistrationTextInputWithSwitch
              textPH = {BASE_AGE_PH}
              handleOptionA = {handleOptionA}
              handleOptionB = {handleOptionB}
              isFemale = {this.state.isFemale}
            />
            <RegistrationTextInput
              textPH = {BASE_MAIL_PH}
              keyboardType = 'email-address'

            />
            <RegistrationTextInput
              textPH = {BASE_PASS_PH}
              passOn = {true}
            />


          <SwipeArrow imageSource={require('../assets/images/arrows.png')}/>

</View>
        </KeyboardAvoidingView>
      );}
  }



}

const styles = StyleSheet.create({
  container: {
    paddingTop: '4%',
    flex: 1,
    backgroundColor: '#FFB677',
    alignItems: 'center',
    justifyContent: 'center'

  },
  title: {
    fontFamily: 'pacifico',
    textAlign: 'center',
    fontSize: 35,
    width: 200,
    marginBottom: 10,
  }

  /*
  developmentModeText: {
    marginBottom: 20,
    color: 'rgba(0,0,0,0.4)',
    fontSize: 14,
    lineHeight: 19,
    textAlign: 'center',
  },
  contentContainer: {
    paddingTop: 30,
  },
  welcomeContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  welcomeImage: {
    width: 100,
    height: 80,
    resizeMode: 'contain',
    marginTop: 3,
    marginLeft: -10,
  },
  getStartedContainer: {
    alignItems: 'center',
    marginHorizontal: 50,
  },
  homeScreenFilename: {
    marginVertical: 7,
  },
  codeHighlightText: {
    color: 'rgba(96,100,109, 0.8)',
  },
  codeHighlightContainer: {
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 3,
    paddingHorizontal: 4,
  },
  getStartedText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    lineHeight: 24,
    textAlign: 'center',
  },
  tabBarInfoContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 20,
      },
    }),
    alignItems: 'center',
    backgroundColor: '#fbfbfb',
    paddingVertical: 20,
  },
  tabBarInfoText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    textAlign: 'center',
  },
  navigationFilename: {
    marginTop: 5,
  },
  helpContainer: {
    marginTop: 15,
    alignItems: 'center',
  },
  helpLink: {
    paddingVertical: 15,
  },
  helpLinkText: {
    fontSize: 14,
    color: '#2e78b7',
  },*/
});
