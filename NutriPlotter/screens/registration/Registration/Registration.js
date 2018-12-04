//---------------------BASIC IMPORTS-----------------
import React from 'react';
//react native:
import {
  View,
  ScrollView,
  AsyncStorage} from 'react-native';

//components creted by us:
import {BasicDataScreen} from '../BasicDataScreen';
import {GoalDataScreen} from '../GoalDataScreen';

//stylesheet
import styles from './styles';

//--------------start of Registration class--------------
export default class Registration extends React.Component {
  //to initialise state it needs to be the very first thing the component does

  state = {
                canSubmit: false,
                name: "",
                age: 0,
                email: "",
                password: "",
                sex: null,
                maxCal: 0,
                goal: 0
              };



  //state updating function
  updateState = () => {
      this.setState({
          canSubmit: !this.state.canSubmit
      });

    }
  updateBasicState = (nameIn, ageIn, emailIn, passwordIn, sexIn) => {
    this.setState({
      name: nameIn,
      age: ageIn,
      email: emailIn,
      password: passwordIn,
      sex: sexIn,
      canSubmit: !this.state.canSubmit
    });
  }
  setStorage = () => {

    //set name:
    AsyncStorage.setItem('name', this.state.name);
    //set age
    AsyncStorage.setItem('age', this.state.age);
    //set email
    AsyncStorage.setItem('email', this.state.email);
    //set password
    AsyncStorage.setItem('password', this.state.password);
    //set sex
    AsyncStorage.setItem('sex', this.state.sex);
  }

  getStorage = () => {
    //set name:
    console.log(AsyncStorage.getItem('name'));
    //set age
    console.log(AsyncStorage.getItem('age'));
    //set email
    console.log(AsyncStorage.getItem('email'));
    //set password
    console.log(AsyncStorage.getItem('password'));
    //set sex
    console.log(AsyncStorage.getItem('sex'));
  }

  componentDidUpdate(){

    console.log("updated state: ");
    console.log(this.state);

    //this.setStorage();
    //this.getStorage();
  }
  render(){




    return (
      <ScrollView
          horizontal={true}
          pagingEnabled = {true}
          snapToAlignment = "center"
      >
            <View style={styles.screen}>
              <BasicDataScreen
                updateState = {this.updateBasicState}
                canUpdateState = {this.state.canSubmit}
              />
            </View>
            <View style={styles.screen}><GoalDataScreen updateState = {this.updateState}/></View>

      </ScrollView>
  );}
}
//<View><BasicDataScreen /></View>
//<View><BasicDataScreen /></View>
