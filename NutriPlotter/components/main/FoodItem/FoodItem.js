//---------------------BASIC IMPORTS-----------------
import React, {Component} from 'react';


import {Text, TextInput, TouchableOpacity, View, Image} from 'react-native';

import styles from './styles';

export default class FoodItem extends Component {

  render(){
    return (
      <TouchableOpacity
        style={styles.master}
        onPress={() => {console.log('item chosen')}}>
      <View
        style={styles.container}
        borderRadius={150}
        aspectRatio={1}>
          <Image
            source={this.props.src}
            style={styles.img}
            resizeMode="contain"
            />
          <Text>{this.props.name}</Text>
      </View>
      </TouchableOpacity>
    )
  }
}
