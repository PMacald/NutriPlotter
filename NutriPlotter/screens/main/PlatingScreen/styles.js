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
      marginTop: 80,
      marginLeft: -20,
      marginRight: 100,
      //backgroundColor: 'green', //<-- TAKES A LOT OF AREA ON SCREEN
      height: 200,
      width: 200,

    },
    cupholder:{
      zIndex: 0,
      position: 'absolute',
    },
    sodaBox: {
      width: 50,
      height: 50,
      backgroundColor: 'gray',
      marginLeft: 10,
      marginRight: 10,
      alignItems: 'center',
      justifyContent: 'center',

    },
    conttop:{
      flexDirection: 'row',

      height: 200,
      alignItems: 'stretch'
    },
    maincontainer:{
      position: 'absolute',
      zIndex: 0,
      width: '100%',
      height: '100%',
    },
    adjuster:{
      width: 50,
      height: 25,
    },
    adjCont:{
      position: "absolute",
      top: "$windowHeight * 0.28",
      left: "$windowWidth * 0.44",
      width: 50,
    },
    plate:{
      top: "$windowHeight * 0.16",
      left: "$windowWidth * 0.255"
    },
    pieSVG:{
    }

  });
