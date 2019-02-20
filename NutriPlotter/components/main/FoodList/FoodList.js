//---------------------BASIC IMPORTS-----------------
import React, {Component} from 'react';


import {Text, FlatList, TouchableOpacity, View, Image} from 'react-native';

import {FoodItem} from '../FoodItem';

import styles from './styles';

export default class FoodList extends Component {

  render(){
    return (
      <FlatList
        data={[
          {key: 'Chicken', path: require('../../../assets/images/chicken.png')}, 
          {key: 'Rice', path: require('../../../assets/images/ricecartoon.png')}, 
          {key: 'Bread', path: require('../../../assets/images/breadcartoon.png')}, 
          {key: 'Popcorn', path: require('../../../assets/images/popcorncartoon.png')}, 
          {key: 'Pasta', path: require('../../../assets/images/pastacartoon.png')}]}
        renderItem={({item}) => <FoodItem name={item.key} src={item.path}/>}
        numColumns={2}
      />
    )
  }
}
