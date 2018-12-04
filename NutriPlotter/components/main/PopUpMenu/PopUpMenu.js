import React, { Component } from 'react'
import { Alert, Button, StyleSheet, View, TouchableOpacity, Text } from 'react-native'
import { Feather } from '@expo/vector-icons';
import {
  Menu,
  MenuProvider,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from 'react-native-popup-menu';

import styles from './styles';
const PopUpMenu = () => (
   <MenuProvider style={styles.menuhead}>
     <Menu onSelect={value => alert(`Selected number: ${value}`)}>
     <MenuTrigger>
      <Feather
         name = 'menu'
         size = {50}
         color = {'black'}
         />
     </MenuTrigger>
       <MenuOptions>

         <MenuOption value ={666}>
            <Text style={styles.TextStyle}>Start Over</Text>
         </MenuOption>

         <MenuOption value ={2}>
            <Text style={styles.TextStyle}>Exit</Text>
         </MenuOption>

       </MenuOptions>
     </Menu>
   </MenuProvider>
 );



export default PopUpMenu;
