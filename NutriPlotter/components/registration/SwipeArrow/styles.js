import EStyleSheet from 'react-native-extended-stylesheet';
import StyleSheet from 'react-native';
const INPUT_HEIGHT = 36;

export default EStyleSheet.create({
  container:{
    width: '$windowWidth',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  swipeText:{
    color: '#EBEBEB',
    marginBottom: 5,
    fontSize: 12,
    fontFamily: 'Palanquin'
  }
});
