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
  ScrollView,
  Button
} from 'react-native';

import Slider from "react-native-slider";

import {RegistrationTextInputWithSwitch} from '../../../components/TextInputWithSwitch';
import {RegistrationTextInput} from '../../../components/TextInput';
import {SwipeArrow} from '../../../components/SwipeArrow';

import styles from './styles';





export default class GoalDataScreen extends React.Component {
  constructor(props){
    super(props);
    this.state = {calValue : 500};
    
  }

  sliderOn = () => {
    cv = this.state.calValue;
    this.props.isSliding(cv);
  }
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
            <View style = {styles.slider}>
              <Slider
                value={this.state.calValue}
                onValueChange={(calValue) => {
                  this.setState({calValue});
                  this.sliderOn.bind(this);
                }}
                minimumValue = {500}
                maximumValue = {5000}

                />
              <Text>value: {this.state.calValue}</Text>
            </View>
            <Button
              title="submit"

            />

          <SwipeArrow imageSource={require('../src/arrows.png')}/>
        </View>
        </KeyboardAvoidingView>
      )};
  }
