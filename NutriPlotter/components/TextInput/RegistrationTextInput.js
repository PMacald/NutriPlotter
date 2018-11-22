import React from 'react';
import PropTypes from 'prop-types';

import {Text, TextInput, TouchableHighlight, View} from 'react-native';

import styles from './styles';

//stateless function!
const RegistrationTextInput = ({onSubmit,
                                textPH,
                                keyboardType,
                                passOn}) => (
  <View
    style={styles.container}>



    <TextInput
      underlineColorAndroid='rgba(0,0,0,0)'
      style={styles.input}
      placeholder = {textPH}
      placeholderTextColor = 'black'
      textAlign = 'center'
      keyboardType = {keyboardType}
      secureTextEntry = {passOn}
    />


</View>
);

RegistrationTextInput.propTypes = {

  textPH: PropTypes.string
}

export default RegistrationTextInput;
