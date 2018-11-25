//---------------------BASIC IMPORTS-----------------
import React from 'react';
// react native:
import {
  KeyboardAvoidingView,
  Image,
  Text,
  View,
  Alert,
} from 'react-native';

//components creted by us:
import {RegistrationTextInputWithSwitch} from '../../../components/TextInputWithSwitch';
import {RegistrationTextInput} from '../../../components/TextInput';
import {SwipeArrow} from '../../../components/SwipeArrow';

//stylesheets
import styles from './styles';

//constants are capital cased usually
const BASE_NAME_PH = "Name"; // PH - Placeholder
const BASE_AGE_PH = "Age";
const BASE_MAIL_PH = "E-Mail";
const BASE_PASS_PH = "Password";

let data = {
  name: "1",
  age: "2",
  email: "3",
  password: "4",
  sex: null
}


export default class BasicDataScreen extends React.Component {


  updateNameState = (name) => data.name = name;

  updateAgeState = (age, sex) => {
    data.age = parseInt(age);
    data.sex = sex;
  }

  updateMailState = (email) => data.email = email;

  updatePassState = (password) => data.password = password;

   handleOptionA = () => {
     data.sex = false;
     (data.sex) ? console.log("A") : console.log("B");
   }

   handleOptionB = () => {
     data.sex = true;
     (data.sex) ? console.log("A") : console.log("B");
   }

   componentDidUpdate(){
     //update the state of register

     if(this.props.canUpdateState == true){

       this.props.updateState(data.name, data.age, data.email, data.password, data.sex);
     }

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
                updateState = {this.updateNameState}
                canUpdateState = {this.props.canUpdateState}
              />
              <RegistrationTextInputWithSwitch
                textPH = {BASE_AGE_PH}
                handleOptionA = {this.handleOptionA}
                handleOptionB = {this.handleOptionB}
                styleSwitcher = {data.sex}
                updateState = {this.updateAgeState}
                canUpdateState = {this.props.canUpdateState}
              />
              <RegistrationTextInput
                textPH = {BASE_MAIL_PH}
                keyboardType = 'email-address'
                updateState = {this.updateMailState}
                canUpdateState = {this.props.canUpdateState}

              />
              <RegistrationTextInput
                textPH = {BASE_PASS_PH}
                passOn = {true}
                canUpdateState = {this.props.canUpdateState}
                updateState = {this.updatePassState}
              />



            <SwipeArrow imageSource={require('../src/arrows.png')}/>
          </View>
        </KeyboardAvoidingView>
      );}
  }
