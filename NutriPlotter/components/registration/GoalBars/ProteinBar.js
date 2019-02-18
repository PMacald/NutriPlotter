import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import styles from './styles';

const ProteinBar = () =>(
    <View
      style={styles.container}
    >
        <Text 
        style={styles.barText}> Protein : 100g </Text>
    </View>
);

export default ProteinBar;