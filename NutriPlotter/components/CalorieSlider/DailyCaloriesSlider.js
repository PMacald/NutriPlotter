import React from 'react';
import {StyleSheet, Text, View, Slider} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import styles from './styles';

class DailyCalorieSlider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 1200,
    };
  }

  change(value) {
    this.setState(() => {
      return {
        value: parseInt(value),
      };
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>{this.state.value}</Text>
        <Slider
          step={1}
          minimumValue={1000}
          maximumValue={5000}
          onValueChange={this.change.bind(this)}
          value={value}
        />
      </View>
    );
  }
}

export default DailyCalorieSlider
