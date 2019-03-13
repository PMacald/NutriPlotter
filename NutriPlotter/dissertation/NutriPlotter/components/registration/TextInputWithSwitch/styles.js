import EStyleSheet from 'react-native-extended-stylesheet';
import StyleSheet from 'react-native';
const INPUT_HEIGHT = 36;

export default EStyleSheet.create({
  container:{
    width: '$windowWidth - 20',
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  switchA:{
    width: '15%',
    height: INPUT_HEIGHT,
    width: 80,
    backgroundColor: '$baseBlue',
    alignItems: 'center',
    justifyContent: 'center',

  },
  switchAnot:{
    width: '15%',
    height: INPUT_HEIGHT,
    width: 80,
    backgroundColor: 'red',
    alignItems: 'center',
    justifyContent: 'center',

  },
  switcherlad:{
    width: '42%'
  },
  switchB:{
    width: '15%',
    height: INPUT_HEIGHT,
    width: 80,
    backgroundColor: '$baseBlue',
    alignItems: 'center',
    justifyContent: 'center',

  },

  boder:{
    height: INPUT_HEIGHT,
    width: '100%',
    backgroundColor: 'white',
  },
  switchText:{
    fontFamily: 'Palanquin',
    fontSize: 20,
  },
  input:{
    width: '50%',
    height: INPUT_HEIGHT,
    borderBottomColor: 'black',
    borderBottomWidth: 2,
    fontFamily: 'NunitoSans',
    fontSize: 20,
    marginLeft:10,
  },

});
