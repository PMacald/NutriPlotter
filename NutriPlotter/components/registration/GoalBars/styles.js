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
    
    barText:{
    color: '#EBEBEB',
    marginBottom: 5,
    fontSize: 20,
    fontFamily: 'Palanquin'
    }
                                  
 });