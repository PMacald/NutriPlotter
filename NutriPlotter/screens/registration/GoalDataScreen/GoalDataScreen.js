//---------------------BASIC IMPORTS-----------------
import React from 'react';
//react native:
import {
  KeyboardAvoidingView,
  Image,
  Text,
  View,
  Button
} from 'react-native';

//from library:
import Slider from "react-native-slider";
//by us:
import {RegistrationTextInputWithSwitch} from '../../../components/TextInputWithSwitch';
import {RegistrationTextInput} from '../../../components/TextInput';
import {SwipeArrow} from '../../../components/SwipeArrow';
import {DailyCalorieSlider} from '../../../components/CalorieSlider';
//stylesheet:
import styles from './styles';





export default class GoalDataScreen extends React.Component {


  handleClick = () => {
      this.props.updateState();
  };

  render() {

      return (
        <KeyboardAvoidingView
          style={styles.container}
          behavior='position'
          >
          <View style={styles.container}>


            <View style={styles.welcomeContainer}>
              <Text style={styles.title}>Nutriplotter</Text>
            </View>
            <View>
              <DailyCalorieSlider/>
            </View>
            <Button
              title="submit"
              onPress={this.handleClick}
            />

          <SwipeArrow imageSource={require('../src/arrows.png')}/>
        </View>
      </KeyboardAvoidingView>
      )};
}
