import React, {Component} from 'react';
import PropTypes from 'prop-types';

import {Text, TextInput, TouchableHighlight, View} from 'react-native';
import SwitchSelector from 'react-native-switch-selector';
import styles from './styles';

const options = [
    { label: 'Male', value: false },
    { label: 'Female', value: true }
];

export default class RegistrationTextInputWithSwitch extends Component {
  constructor(props){
    super(props);
    this.state = {data: "", sex:null};
  }

  componentDidUpdate(){
    //update the data in basic data screen
    if(this.props.canUpdateState == true){
      this.props.updateState(this.state.data, this.state.sex);
    }
  }


  render(){
    return (
      <View style={styles.container}>
        <SwitchSelector
          style = {styles.switcherlad}
          buttonColor = {'#96C5E2'}
          options={options}
          initial={0}
          onPress={value => this.setState({sex : value})}
        />


        <TextInput
          underlineColorAndroid='rgba(0,0,0,0)'
          style={styles.input}
          placeholder = {this.props.textPH}
          placeholderTextColor = 'black'
          keyboardType = 'numeric'
          textAlign = 'center'
          onChangeText={(data) => this.setState({data})}
        />


      </View>
    );
  }




}/*
<TouchableHighlight
  onPress={this.props.handleOptionA}
  style={(this.props.styleSwitcher) ? styles.switchA : styles.switchAnot}
>
  <Text style={styles.switchText}>Male</Text>
</TouchableHighlight>

<View style={styles.border}/>

<TouchableHighlight
  onPress={this.props.handleOptionB}
  style={styles.switchB}
  >
  <Text style={styles.switchText}>Female</Text>
</TouchableHighlight>

*/
