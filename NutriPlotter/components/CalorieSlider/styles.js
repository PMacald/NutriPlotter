import EStyleSheet from 'react-native-extended-stylesheet';
import StyleSheet from 'react-native';
const INPUT_HEIGHT = 36;

export default EStyleSheet.create({
  container:{
    width: '$windowWidth - 20',
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    width: '90%',
    height: INPUT_HEIGHT,
    borderBottomColor: 'black',
    borderBottomWidth: 2,
    fontFamily: 'NunitoSans',
    fontSize: 20,
    marginLeft:10,
  },
});
