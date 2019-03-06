import EStyleSheet from 'react-native-extended-stylesheet';
import StyleSheet from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';


export default EStyleSheet.create({
    container:{
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'gray',
      height: '100%'
    },
    img:{
    },
    btn:{
      marginTop: hp('10%')
    }
  });
