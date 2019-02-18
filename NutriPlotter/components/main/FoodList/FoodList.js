//---------------------BASIC IMPORTS-----------------
import React, {Component} from 'react';


import {Text, FlatList, TouchableOpacity, View, Image} from 'react-native';

import {FoodItem} from '../FoodItem';

import styles from './styles';

export default class FoodList extends Component {

  render(){
    return (
      <FlatList
        data={[{key: 'Chicken'}, {key: 'Rice'}, {key: 'Bread'}, {key: 'Popcorn'}, {key: 'Pasta'}]}
        renderItem={({item}) => <FoodItem name={item.key} src={require('../../../assets/images/chicken.png')}/>}
        numColumns={2}
      />
    )
  }
}
