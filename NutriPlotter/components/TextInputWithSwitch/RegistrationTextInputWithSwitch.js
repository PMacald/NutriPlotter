import React from 'react';
import PropTypes from 'prop-types';

import {Text, TextInput, TouchableHighlight, View} from 'react-native';
import MultiSwitch from 'rn-slider-switch';
import styles from './styles';
/*
class RegistrationTextInputWithSwitch2 extends React.Component {
  constructor(props){
    super(props);
  }
  state = {
    isFemale: props.isFemale,
  }
}


*/

const RegistrationTextInputWithSwitch = ({handleOptionA,
                                          handleOptionB,
                                          textPH,
                                          isFemale}) => (
  <View style={styles.container}>
    <TouchableHighlight
      onPress={handleOptionA}
      style={styles.switchActive}
    >
      <Text style={styles.switchText}>Male</Text>
    </TouchableHighlight>

    <View style={styles.border}/>

    <TouchableHighlight
      onPress={handleOptionB}
      style={styles.switchActive}
      >
      <Text style={styles.switchText}>Female</Text>
    </TouchableHighlight>

    <TextInput
      underlineColorAndroid='rgba(0,0,0,0)'
      style={styles.input}
      placeholder = {textPH}
      placeholderTextColor = 'black'
      keyboardType = 'numeric'
      textAlign = 'center'
    />


  </View>
);

RegistrationTextInputWithSwitch.propTypes = {
  onSubmit: PropTypes.func,
  textPH: PropTypes.string
}

export default RegistrationTextInputWithSwitch;
