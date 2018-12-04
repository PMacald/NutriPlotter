//---------------------BASIC IMPORTS-----------------
import React from 'react';
//react native:
import {
  Platform,
  StatusBar,
  StyleSheet,
  View,
  Dimensions
        } from 'react-native';
//expo:
import {
  AppLoading,
  Asset,
  Font,
  Icon
} from 'expo';

//components creted by us:
import {MainScreen} from './screens/main/MainScreen';

//stylesheets:
import EStyleSheet from 'react-native-extended-stylesheet';

//variables:
let {height, width} = Dimensions.get('window');



// always call EStyleSheet.build() even if you don't use global variables!
EStyleSheet.build({
  $textColor: '#FFB677',
  $windowHeight: height,
  $windowWidth: width,
  $baseBlue: '#96C5E2',

});


//-----------------start of the main component APP--------------
export default class App extends React.Component {
  state = {
    isLoadingComplete: false,
  };

  render() {
    if (!this.state.isLoadingComplete && !this.props.skipLoadingScreen) {
      return (
        <AppLoading
          startAsync={this._loadResourcesAsync}
          onError={this._handleLoadingError}
          onFinish={this._handleFinishLoading}
        />
      );
    } else {
      return (
        <View style={styles.container}>
          {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
          <MainScreen />
        </View>
      );
    }
  }



//--------------LOADING DEPENDENCIES---------------
  _loadResourcesAsync = async () => {
    return Promise.all([
      Asset.loadAsync([
        require('./assets/images/robot-dev.png'),
        require('./assets/images/robot-prod.png'),
      ]),
      Font.loadAsync({
        // This is the font that we are using for our tab bar
        ...Icon.Ionicons.font,
        // We include SpaceMono because we use it in HomeScreen.js. Feel free
        // to remove this if you are not using it in your app
        'space-mono': require('./assets/fonts/SpaceMono-Regular.ttf'),
        pacifico: require("./assets/fonts/Pacifico-Regular.ttf"),
        NunitoSans: require("./assets/fonts/NunitoSans-LightItalic.ttf"),
        Palanquin: require("./assets/fonts/Palanquin-Light.ttf"),
      }),
    ]);
  };

  _handleLoadingError = error => {
    // In this case, you might want to report the error to your error
    // reporting service, for example Sentry
    console.warn(error);
  };

  _handleFinishLoading = () => {
    this.setState({ isLoadingComplete: true });
  };
}

//---------------style---------------------
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFB677',
  },
});
