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

  constructor(props) {
        super(props);

        this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })

        this.state = {
            listViewData: data,
            newContact: "",
            currentUser: ""
        }

    }


  componentDidMount() {
          var currentUser
          var that = this
          listener = firebase.auth().signInAnonymously()
              .then((user) =>{
                    currentUser = user
                    that.registerForPushNotificationsAsync(currentUser.user)
                    console.log('Anonymous user successfully logged in', user);

                })
              .catch((err) => {
                    console.log('Anonymous user signin error', err);
              });



          firebase.database().ref('/contacts').on('child_added', function (data) {

              var newData = [...that.state.listViewData]
              newData.push(data)
              that.setState({ listViewData: newData })

          })
      }

      loadSubscribers = () => {
          var messages = []

          //return the main promise
          return firebase.database().ref('/subscribers').once('value').then(function (snapshot) {
              snapshot.forEach(function (childSnapshot) {

                  var childKey = childSnapshot.key;

                  messages.push({
                      "to": childKey,
                      "sound": "default",
<<<<<<< HEAD
                      "body": "Time to log food"
=======
                      "body": "New Note Added"
>>>>>>> 6f747ae3fd404a3ac6ebab85c8f590cf88e7411f
                  });
              });
              //firebase.database then() respved a single promise that resolves
              //once all the messages have been resolved
              return Promise.all(messages)

          }).catch(error => {
              console.log(error)
          })

      }
      registerForPushNotificationsAsync = async (currentUser) => {
        const { status: existingStatus } = await Permissions.getAsync(
          Permissions.NOTIFICATIONS
        );
        let finalStatus = existingStatus;

        // only ask if permissions have not already been determined, because
        // iOS won't necessarily prompt the user a second time.
        if (existingStatus !== 'granted') {
          // Android remote notification permissions are granted during the app
          // install, so this will only ask on iOS
          const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
          finalStatus = status;
        }

        // Stop here if the user did not grant permissions
        if (finalStatus !== 'granted') {
          return;
        }
        // Get the token that uniquely identifies this device
        let token = await Notifications.getExpoPushTokenAsync();
        // POST the token to our backend so we can use it to send pushes from there
        var updates = {}
        updates['/expoToken'] = token
        await firebase.database().ref('/users/' + currentUser.uid).update(updates)
        //call the push notification
      }


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
