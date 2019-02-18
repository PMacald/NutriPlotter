//---------------------BASIC IMPORTS-----------------
import React from 'react';
//react native:
import {
  Platform,
  StatusBar,
  StyleSheet,
  View,
  Dimensions,
  Text,
  ListView
        } from 'react-native';
//expo:
import {
  AppLoading,
  Asset,
  Font,
  Icon,
  Permissions,
  Notifications
} from 'expo';
import { Ionicons } from '@expo/vector-icons';

//components creted by us:
import {HomeScreen} from './screens/main/HomeScreen';
import {PlatingScreen} from './screens/main/PlatingScreen';
import {PlateDivScreen} from './screens/main/PlateDivScreen';
import {DataScreen} from './screens/main/DataScreen';

//stylesheets:
import EStyleSheet from 'react-native-extended-stylesheet';

import {createStackNavigator} from 'react-navigation';

//Firebase imports
import ApiKeys from './constants/ApiKeys';
import * as firebase from 'firebase';

var data = []
// Initialize firebase...
if (!firebase.apps.length) { firebase.initializeApp(ApiKeys.FirebaseConfig); }

//variables:
let {height, width} = Dimensions.get('window');

const RootStack = createStackNavigator({
  Home: {
    screen: HomeScreen,
    },
  Plating:{
    screen: PlatingScreen,
  },
  Data: {
    screen: DataScreen,
  },
  PlateDiv : {
    screen: PlateDivScreen,
  }
  },{
    headerMode: 'none',
    initialRouteName: 'Home'
  } )


// always call EStyleSheet.build() even if you don't use global variables!
EStyleSheet.build({
  $textColor: '#FFB677',
  $windowHeight: height,
  $windowWidth: width,
  $baseBlue: '#EBEBEB',

});


//-----------------start of the main component APP--------------
export default class App extends React.Component<{}> {
  state = {
    isLoadingComplete: false,
  };

  async componentWillMount() {
    let result = await Permissions.getAsync(Permissions.NOTIFICATIONS);
    if (result.status === 'granted') {
     console.log('Notification permissions granted.');
     this.setNotifications();
    } else {
        console.log('No Permission', Constants.lisDevice);
    }

    this.listenForNotifications();
  }

  getNotification(date) {
    const localNotification = {
        title: `Create A Meal`,
        body: 'Swipe to enter the app and create a healthy meal', // (string) — body text of the notification.
        ios: { // (optional) (object) — notification configuration specific to iOS.
          sound: true // (optional) (boolean) — if true, play a sound. Default: false.
        },
        android: // (optional) (object) — notification configuration specific to Android.
        {
          sound: true, // (optional) (boolean) — if true, play a sound. Default: false.
          priority: 'high', // (optional) (min | low | high | max) — android may present notifications according to the priority, for example a high priority notification will likely to be shown as a heads-up notification.
          sticky: false, // (optional) (boolean) — if true, the notification will be sticky and not dismissable by user. The notification must be programmatically dismissed. Default: false.
          vibrate: true // (optional) (boolean or array) — if true, vibrate the device. An array can be supplied to specify the vibration pattern, e.g. - [ 0, 500 ].
        }
    };
    return localNotification;
  }

  setNotifications() {
    Notifications.cancelAllScheduledNotificationsAsync();

    for (let i = 0; i< 4; i++) { //Maximum schedule notification is 64 on ios.
        let t = new Date();
        if (i === 0){
            t.setSeconds(t.getSeconds() + 1);
        } else {
            t.setMinutes(t.getMinutes() + 1 + (i * 210)); // 3:30 hours
        }
        const schedulingOptions = {
            time: t, // (date or number) — A Date object representing when to fire the notification or a number in Unix epoch time. Example: (new Date()).getTime() + 1000 is one second from now.
            repeat: "day",
        };
        Notifications.scheduleLocalNotificationAsync(this.getNotification(t), schedulingOptions);
    }
  }

  listenForNotifications = () => {
    Notifications.addListener(notification => {
      console.log('received notification', notification);
    });
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
      return (<RootStack/>);
    }
  }



//--------------LOADING DEPENDENCIES---------------
  _loadResourcesAsync = async () => {
    return Promise.all([
      Asset.loadAsync([
        require('./assets/images/robot-dev.png'),
        require('./assets/images/robot-prod.png'),
        require('./screens/main/PlatingScreen/src/cup.png'),
        require('./screens/main/PlatingScreen/src/more-options.png'),
        require('./screens/main/PlatingScreen/src/up.png'),
        require('./screens/main/PlatingScreen/src/plate.png'),
        require('./screens/main/PlatingScreen/src/chart.png')
      ]),
      Font.loadAsync({
        // This is the font that we are using for our tab bar

        // We include SpaceMono because we use it in HomeScreen.js. Feel free
        // to remove this if you are not using it in your app
        'space-mono': require('./assets/fonts/SpaceMono-Regular.ttf'),
        pacifico: require("./assets/fonts/Pacifico-Regular.ttf"),
        NunitoSans: require("./assets/fonts/NunitoSans-LightItalic.ttf"),
        Palanquin: require("./assets/fonts/Palanquin-Light.ttf"),
        Roboto: require("native-base/Fonts/Roboto.ttf"),
        Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf")
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
    backgroundColor: '#EBEBEB',
  },
});
