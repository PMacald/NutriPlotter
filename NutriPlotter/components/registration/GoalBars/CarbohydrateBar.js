import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import styles from './styles';

const CarbohydrateBar = () =>(
    <View
      style={styles.container}
    >
        <Text 
        style={styles.barText}> Carbohydrate : 100g </Text>
    </View>
);

export default CarbohydrateBar;