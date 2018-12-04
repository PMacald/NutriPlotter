import EStyleSheet from 'react-native-extended-stylesheet';
import StyleSheet from 'react-native';

export default EStyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      width: '$windowWidth',
      height: '$windowHeight * 0.8',
      backgroundColor: 'gray'
    },
    bod: {
      width: '100%',
      flex: 1,
      flexDirection: 'row',
    },
    img: {
      width: 80,
      height: 70,
    },
    imgcentre: {
      width: 80,
      height: 30,
    },
    right:{
      paddingLeft: 10,
    },
    left:{
      paddingRight: 10,
    },
    top: {
      flexDirection: 'row',
      width: '$windowWidth',
      justifyContent: 'center',
    },
    centre:{
      justifyContent: 'center',
      alignItems: 'center',
      width: '55%',
      height: 70,
    },
    menucontainer:{
      marginTop: 50,
      marginLeft: 25,
      //backgroundColor: 'green', //<-- TAKES A LOT OF AREA ON SCREEN
      height: 200,
      width: 200

    },
    cupholder:{
      alignItems: 'flex-end',
      marginTop: 50,
      marginRight: 25,
      width: 100,
      height: 250,
      marginLeft: 50
    },
    cup:{
      width:75,
      height: 150
    },
    conttop:{
      flexDirection: 'row',

      height: 200,
      alignItems: 'stretch'
    },
    maincontainer:{
      width: '100%',
      height: '100%',
    }

  });
