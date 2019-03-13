import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import styles from './styles';

const FatBar = () =>(
    <View
      style={styles.container}
    >
        <Text 
        style={styles.barText}> Fat : 25g </Text>
    </View>
);

export default FatBar;