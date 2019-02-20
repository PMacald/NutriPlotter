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
  Navigation,
  Button
} from 'react-native';
import AwesomeButtonRick from 'react-native-really-awesome-button/src/themes/rick';
//stylesheet
import styles from './styles';

export default class HomeScreen extends React.Component {
  render() {

      return (
        <View
          style={styles.container}
          >
          <Image source={require('./src/logo.png')} style={styles.img}/>
          <AwesomeButtonRick
            style={styles.btn}
            backgroundColor='#d3d3d3'
            backgroundShadow='#808080'
            textSize={18}
            textColor='#808080'
            borderColor='#808080'
            type="primary"
            onPress={()=> this.props.navigation.navigate('Plating',{prevScreen: "Home", size: "big", comps: 3})}
            >Create a Meal! </AwesomeButtonRick>

          </View>
      );}

  }
