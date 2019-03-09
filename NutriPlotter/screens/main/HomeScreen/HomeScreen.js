//---------------------BASIC IMPORTS-----------------
import React from 'react';
import {Amplitude}from 'expo';

//Firebase imports
import ApiKeys from '../../../constants/ApiKeys.js';
import * as firebase from 'firebase';
if (!firebase.apps.length) { firebase.initializeApp(ApiKeys.FirebaseConfig); }

// react native:
import {
  KeyboardAvoidingView,
  Image,
  Text,
  View,
  Alert,
  TouchableOpacity,
  StyleSheet,
  Navigation,
  Button
} from 'react-native';

Amplitude.initialize("8a8476a30e9af690b3dc1f1d7b637e4b")

import AwesomeButtonRick from 'react-native-really-awesome-button/src/themes/rick';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
//stylesheet
import styles from './styles';

export default class HomeScreen extends React.Component {
  render() {

      return (
        <View
          style={styles.container}
          >
          <Image source={require('./src/logo.png')} style={styles.img} />
          <AwesomeButtonRick
            style={styles.btn}
            backgroundColor='#d3d3d3'
            backgroundShadow='#808080'
            height={hp("10%")}
            width={wp("60%")}
            textSize={hp("3%")}
            textColor='#808080'
            borderColor='#808080'
            type="primary"
            onPress={()=> {
                Amplitude.logEvent('Button pressed to create a meal');
                this.props.navigation.navigate('Plating',{prevScreen: "Home", size: "big", comps: 3});
            }}
            >Create a Meal! </AwesomeButtonRick>

          </View>
      );}

  }
