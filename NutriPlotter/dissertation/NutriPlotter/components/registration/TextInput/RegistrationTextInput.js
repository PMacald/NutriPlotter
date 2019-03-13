//---------------------BASIC IMPORTS-----------------
import React, {Component} from 'react';
import PropTypes from 'prop-types';

import {Text, TextInput, TouchableHighlight, View} from 'react-native';

import styles from './styles';

export default class RegistrationTextInput extends Component {
  constructor(props){
    super(props);
    this.state = {data: ""};
  }


  componentDidUpdate(){
    //update the data in basic data screen
    if(this.props.canUpdateState == true){
      this.props.updateState(this.state.data);
    }
  }

  render(){
    return (
      <View
        style={styles.container}>



        <TextInput
          underlineColorAndroid='rgba(0,0,0,0)'
          style={styles.input}
          placeholder = {this.props.textPH}
          placeholderTextColor = 'black'
          textAlign = 'center'
          keyboardType = {this.props.keyboardType}
          secureTextEntry = {this.props.passOn}
          onChangeText={(data) => this.setState({data})}
        />
      </View>
    )
  }
}
