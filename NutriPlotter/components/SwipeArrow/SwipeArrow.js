import React from 'react';
import PropTypes from 'prop-types';

import {View, Image, Text} from 'react-native';

import styles from './styles';

//stateless function!
const SwipeArrow = ({imageSource}) => (
    <View
      style={styles.container}
    >
    <Text style={styles.swipeText}>Swipe to next page</Text>
    <Image source={imageSource}/>

    </View>
);

SwipeArrow.propTypes = {
  imageSource: Image.propTypes.source,
}

export default SwipeArrow;
