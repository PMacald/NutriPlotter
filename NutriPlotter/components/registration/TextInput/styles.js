import EStyleSheet from 'react-native-extended-stylesheet';
import StyleSheet from 'react-native';
const INPUT_HEIGHT = 36;

export default EStyleSheet.create({
  container:{
    width: '$windowWidth',
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input:{
    width: '90%',
    height: INPUT_HEIGHT,
    borderBottomColor: 'black',
    borderBottomWidth: 2,
    fontFamily: 'NunitoSans',
    fontSize: 20,
    marginLeft:10,
  }
});
