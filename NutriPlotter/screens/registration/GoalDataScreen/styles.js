import EStyleSheet from 'react-native-extended-stylesheet';
import StyleSheet from 'react-native';

export default EStyleSheet.create({
    container: {
      paddingTop: '4%',
      flex: 1,
      backgroundColor: '#FFB677',
      alignItems: "center",
      justifyContent: 'center',
      width: '$windowWidth',
      height: '$windowHeight',
    },
    title: {
      fontFamily: 'pacifico',
      textAlign: 'center',
      fontSize: 35,
      width: 200,
      marginBottom: 10,
    },
    slider: {
      alignItems: 'stretch',
      width: '80%'
    }
  });
