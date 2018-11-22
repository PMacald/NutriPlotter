import React from 'react';
import {
  KeyboardAvoidingView,
  Image,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Alert,
  ScrollView
} from 'react-native';


import {RegistrationTextInputWithSwitch} from '../../../components/TextInputWithSwitch';
import {RegistrationTextInput} from '../../../components/TextInput';
import {SwipeArrow} from '../../../components/SwipeArrow';

import styles from './styles';






//constants are capital cased usually
const BASE_NAME_PH = "Name"; // PH - Placeholder
const BASE_AGE_PH = "Age";
const BASE_MAIL_PH = "E-Mail";
const BASE_PASS_PH = "Password";

export default class BasicDataScreen extends React.Component {
  constructor(props){
    super(props);
    this.submitName = this.submitName.bind();
  }
   handleOptionA = () => {
     Alert.alert("option A is pressed");

   }

   handleOptionB = () => {
     Alert.alert("option B is pressed");

   }

   submitName(name){
     onSubmit(name);
   }
  render() {

      return (

        <KeyboardAvoidingView
          style={styles.container}
          behavior='position'
          >
            <View style={styles.container}>


            <View style={styles.welcomeContainer}>
              <Text style={styles.title}>Welcome to Nutriplotter</Text>
            </View>

            <Image
              style={{width:100, height:100}}
              source={require('../src/plusicon.png')}/>

            <RegistrationTextInput
              textPH = {BASE_NAME_PH}
            />
            <RegistrationTextInputWithSwitch
              textPH = {BASE_AGE_PH}
              handleOptionA = {this.handleOptionA}
              handleOptionB = {this.handleOptionB}
            />
            <RegistrationTextInput
              textPH = {BASE_MAIL_PH}
              keyboardType = 'email-address'

            />
            <RegistrationTextInput
              textPH = {BASE_PASS_PH}
              passOn = {true}
            />


          <SwipeArrow imageSource={require('../src/arrows.png')}/>
</View>
        </KeyboardAvoidingView>
      );}
  }
