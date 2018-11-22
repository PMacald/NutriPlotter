import React from 'react';
import { View,
        ScrollView,
        StyleSheet,
        TextInput,
        Image,
        Text} from 'react-native';


export default class LinksScreen extends React.Component {


  render() {
    return (

          <Image source={require('../assets/images/demohome.png')} style={{width:'100%'}}/>


    );
  }
}

const styles = StyleSheet.create({
  container: {

  },
});
