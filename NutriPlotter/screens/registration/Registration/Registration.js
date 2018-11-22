import React from 'react';
import { Platform, StatusBar, StyleSheet, View, Dimensions, ScrollView, Text} from 'react-native';
import { AppLoading, Asset, Font, Icon } from 'expo';
import {BasicDataScreen} from '../BasicDataScreen';
import {GoalDataScreen} from '../GoalDataScreen';

import styles from './styles';





export default class Registration extends React.Component {
  constructor(props){
    super(props);
    //things were fetching with the registration process
    this.state = {
                  name: "",
                  age: 0,
                  email: "",
                  password: "",
                  gender: 0,
                  maxCal: 0,
                  goal: 0
                };
    this.onNameSubmit = this.onNameSubmit.bind(this);
  }



  //state updating function
  onNameSubmit(name) {
    this.setState({ name });
}


  render(){
    return (
      <ScrollView
          horizontal={true}
          pagingEnabled = {true}
          snapToAlignment = "center"
      >
            <View style={styles.screen}><BasicDataScreen onSubmit={this.onNameSubmit}/></View>
            <View style={styles.screen}><GoalDataScreen /></View>

      </ScrollView>
  );}
}
//<View><BasicDataScreen /></View>
//<View><BasicDataScreen /></View>
