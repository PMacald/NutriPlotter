import EStyleSheet from 'react-native-extended-stylesheet';
import StyleSheet from 'react-native';

export default EStyleSheet.create({
    section:{
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: 40,
    },
    chrtsmall: {
      height: 130,
      
    },
    chrtbig: {
      height: 180,
    },
    hr:{
      borderBottomColor: 'lightgray',
      borderWidth: .5,
      
    },
    sectext:{
      textAlign: 'center',
      fontSize: 20,
      marginTop: 20,
      marginBottom: 20
    },
    chrtcont:{
      width: '50%',
    },
    svgs:{
      left: 40
    },
    svgb:{
      left: 10
    }


  });





/*
alignItems: 'center',
      justifyContent: 'center',
      width: '$windowWidth',
      height: '$windowHeight * 0.8',
      backgroundColor: 'lightgray'

*/