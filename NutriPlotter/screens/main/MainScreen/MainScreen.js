//---------------------BASIC IMPORTS-----------------
import React from 'react';

// react native:
import {
  KeyboardAvoidingView,
  Image,
  Text,
  View,
  Alert,
  TouchableOpacity,
  StyleSheet,
  Navigation
} from 'react-native';

import {
  Scene,
  Router,
  Actions,
  Reducer,
  ActionConst,
  Overlay,
  Tabs,
  Modal,
  Drawer,
  Stack,
  Lightbox,
} from 'react-native-router-flux';

//stylesheet
import styles from './styles';

export default class MainScreen extends React.Component {
  render() {
    const App = () => (
            <Router>
              <Stack key="root">
                <Scene key="mealpage" component={MealPage} title="Meal Page"/>
                <Scene key="home" component={MainScreen}/>
              </Stack>
            </Router>
          );
      return (

        <KeyboardAvoidingView
          style={styles.container}
          behavior='position'
          >
          <View style={styles.container}>
              <Image
                style={{width:241,height:231}}
                source={require('../src/logo.png')}/>
          </View>
          <View style={styles.container}>
            <TouchableOpacity onPress = {() => Actions.MealPage}>
                  <View style = {{backgroundColor: 'lightgray', alignItems: 'center',
                                  justifyContent: 'center', borderRadius: 25, width:300,height:80}}
                         >
                      <Text style ={styles.ButtonText}>Create A Meal</Text>
                  </View>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      );}

  }
