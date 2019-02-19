//---------------------BASIC IMPORTS-----------------
import React from 'react';
import {Amplitude}from 'expo';

// react native:
import {
  NativeModules,
  LayoutAnimation,
  Text,
  View,
  Button,
  Image,
  TouchableOpacity,
  Animated,
  PanResponder,
  Dimensions,
  Platform,
  Alert,
  BackHandler
} from 'react-native';
import SlidingUpPanel from 'rn-sliding-up-panel';
import ModalSelector from 'react-native-modal-selector'
import { Constant, Notifications, Permissions } from 'expo';

import { Asset, Audio, Font, Video } from 'expo';
//components creted by us:
import {FoodList} from '../../../components/main/FoodList';
import {PopUpMenu} from '../../../components/main/PopUpMenu';
import {Slice} from '../../../components/main/Slice';
//stylesheets
import styles from './styles';
import SVG, {Svg, G} from 'react-native-svg';

import { PieChart } from 'react-native-svg-charts';
import { absoluteFill } from 'react-native-extended-stylesheet';

const { UIManager } = NativeModules;

Amplitude.initialize("8a8476a30e9af690b3dc1f1d7b637e4b")

async function getiOSNotificationPermission() {
  const { status } = await Permissions.getAsync(
    Permissions.NOTIFICATIONS
  );
  if (status !== 'granted') {
    alert('Hey! You might want to enable notifications for the app, they are good.');
    await Permissions.askAsync(Permissions.NOTIFICATIONS);
  }
}

let {height, width} = Dimensions.get('window');

UIManager.setLayoutAnimationEnabledExperimental &&
  UIManager.setLayoutAnimationEnabledExperimental(true);




export default class PlatingScreen extends React.Component {
  constructor(props){
    super(props);

    const soundObject = new Expo.Audio.Sound();

    this.state = {
      vertAnim : new Animated.Value(25),
      horAnim : new Animated.Value(0),
      heightAnim: 150,
      widthAnim: 75,
      backOp: new Animated.Value(1),
      sodaOp: new Animated.Value(0),
      isBig: false,
      indexOfAdj1: 30,
      indexOfAdj2: 30,
      indexOfAdj3: 30,
      indexToComp: 0,
      data: [
        {
          number: 33,
          startAngle: 0,
          endAngle: Math.PI * 2/3,
      },
      {
          number: 33,
          startAngle: Math.PI * 2/3,
          endAngle: Math.PI * 4/3,
      },
      {
          number: 33,
          startAngle: Math.PI * 4/3,
          endAngle: Math.PI * 2,
      },
      ],
    }

    playAudio = async () => {
      try{
        await soundObject.loadAsync(require('./src/sound/Puzzle-Game_Looping.mp3'));
        await soundObject.playAsync();
        await soundObject.setIsLoopingAsync(20);

      // Your sound is playing!
      }
      catch (error) {
      // An error occurred!
      }
    }

    pauseAudio = async () => {
      try{
        await soundObject.pauseAsync();
      // Your sound stopped playing!
      }
      catch (error) {
      // An error occurred!
      }
    }


    this.adj1Anim = new Animated.Value(0);

    this.adj2Anim = new Animated.Value(0.33);

    this.adj3Anim = new Animated.Value(0.66);


    var range = 1, snapshot = 50, radius = 120;

    //translateX
    var inputRange = [];
    this.outputRangeX = [];
    for (let i = 0; i <= snapshot; ++i){
      var value = i/snapshot;
      var move = Math.sin(value * Math.PI * 2) * radius;
      inputRange.push(value);
      this.outputRangeX.push(move);
    }
    this.translate1_X = this.adj1Anim.interpolate({ inputRange, outputRange: this.outputRangeX });
    this.translate2_X = this.adj2Anim.interpolate({ inputRange, outputRange: this.outputRangeX });
    this.translate3_X = this.adj3Anim.interpolate({ inputRange, outputRange: this.outputRangeX });
    /// translateY
    var inputRange = [];
    this.outputRangeY = [];

    for (var i=0; i<=snapshot; ++i) {
        var value = i/snapshot;
        var move = -Math.cos(value * Math.PI * 2) * radius;
        inputRange.push(value);
        this.outputRangeY.push(move);
    }
    this.translate1_Y = this.adj1Anim.interpolate({ inputRange, outputRange : this.outputRangeY });
    this.translate2_Y = this.adj2Anim.interpolate({ inputRange, outputRange : this.outputRangeY });
    this.translate3_Y = this.adj3Anim.interpolate({ inputRange, outputRange : this.outputRangeY });

    this.outputRangeY = this.outputRangeY.map(x => x+120 + (height * 0.24));
    this.outputRangeX = this.outputRangeX.map(x => x+ (width * 0.44));

    this.spin1 = this.adj1Anim.interpolate({inputRange: [0,1], outputRange: ['0deg', '360deg']})
    this.spin2 = this.adj2Anim.interpolate({inputRange: [0,1], outputRange: ['0deg', '360deg']})
    this.spin3 = this.adj3Anim.interpolate({inputRange: [0,1], outputRange: ['0deg', '360deg']})

    //what happens when you move the adjuster 1
    this._panResponder1 = PanResponder.create(
      {
        onStartShouldSetPanResponder: (evt, gesture) =>true,
        onPanResponderMove: (evt, gesture) => {

          //we need the distance between the points and get the index of the minimum distance
          distances = [];
          for(var i = 0; i < 50; i++){
            var a = this.outputRangeX[i] - gesture.moveX;
            var b = this.outputRangeY[i] - gesture.moveY + 120;
            distances.push(Math.sqrt(a*a + b*b));
          }


          var minInd = distances.indexOf(Math.min(...distances));
          this.setState({indexOfAdj1 : minInd});
          this.adj1Anim.setValue((1/50)* minInd);





          var isPos1 = minInd/50;
          var isPos2 = (minInd)/50;
          if(minInd>30){
            isPos1 = -1 * ((50-minInd)/50);
            isPos2 = minInd/50;
            this.setState({data: [
              {
                number: 1,
                startAngle: isPos1* Math.PI * 2,
                endAngle: this.state.data[0].endAngle,
            },
            {
                number: 30,
                startAngle: this.state.data[1].startAngle,
                endAngle: this.state.data[1].endAngle,
            },
            {
                number: 1,
                startAngle: this.state.data[1].endAngle,
                endAngle: isPos2* Math.PI * 2,
            },
            ]});
          }else{
            this.setState({data: [
              {
                number: 1,
                startAngle: isPos1* Math.PI * 2,
                endAngle: this.state.data[0].endAngle,
            },
            {
                number: 30,
                startAngle: this.state.data[1].startAngle,
                endAngle: this.state.data[1].endAngle,
            },
            {
                number: 1,
                startAngle: -((Math.PI * 2)-this.state.data[1].endAngle),
                endAngle: isPos2* Math.PI * 2,
            },
            ]});
          }












          //now the data will need to change

        }
      }
    )

    //what happens when you move the adjuster 2
    this._panResponder2 = PanResponder.create(
      {
        onStartShouldSetPanResponder: (evt, gesture) =>true,
        onPanResponderMove: (evt, gesture) => {

          //we need the distance between the points and get the index of the minimum distance
          distances = [];

          for(var i = 0; i < 50; i++){
            var a = this.outputRangeX[i] - gesture.moveX;
            var b = this.outputRangeY[i] - gesture.moveY + 120;
            distances.push(Math.sqrt(a*a + b*b));
          }
          var minInd = distances.indexOf(Math.min(...distances));
          this.setState({indexOfAdj2 : minInd});
          this.adj2Anim.setValue((1/50)* minInd);





          var isPos1 = minInd/50;
          var isPos2 = (minInd)/50;
          if(minInd>30){
            isPos1 = -1 * ((50-minInd)/50);
            isPos2 = minInd/50;
            this.setState({data: [
              {
                number: 1,
                startAngle: this.state.data[0].startAngle,
                endAngle: isPos1* Math.PI * 2,
            },
            {
                number: 30,
                startAngle: isPos2* Math.PI * 2,
                endAngle: this.state.data[1].endAngle,
            },
            {
                number: 1,
                startAngle: this.state.data[2].startAngle,
                endAngle: this.state.data[2].endAngle,
            },
            ]});
          }else{
            this.setState({data: [
              {
                number: 1,
                startAngle: this.state.data[0].startAngle,
                endAngle: isPos1* Math.PI * 2,
            },
            {
                number: 30,
                startAngle: isPos2* Math.PI * 2,
                endAngle: this.state.data[1].endAngle,
            },
            {
                number: 1,
                startAngle: this.state.data[2].startAngle,
                endAngle: this.state.data[2].endAngle,
            },
            ]});
          }
        }
      }
    )

    //what happens when you move the adjuster 3
    this._panResponder3 = PanResponder.create(
      {
        onStartShouldSetPanResponder: (evt, gesture) =>true,
        onPanResponderMove: (evt, gesture) => {

          //we need the distance between the points and get the index of the minimum distance
          distances = [];

          for(var i = 0; i < 50; i++){
            var a = this.outputRangeX[i] - gesture.moveX;
            var b = this.outputRangeY[i] - gesture.moveY + 120;
            distances.push(Math.sqrt(a*a + b*b));
          }
          var minInd = distances.indexOf(Math.min(...distances));
          this.setState({indexOfAdj3 : minInd});
          this.adj3Anim.setValue((1/50)* minInd);



          var isPos1 = minInd/50;
          var isPos2 = (minInd)/50;
          if(minInd>30){
            isPos1 = -1 * ((50-minInd)/50);
            isPos2 = minInd/50;
            this.setState({data: [
              {
                number: 1,
                startAngle: this.state.data[0].startAngle,
                endAngle: this.state.data[0].endAngle,
            },
            {
                number: 30,
                startAngle: this.state.data[0].endAngle,
                endAngle: isPos2* Math.PI * 2,
            },
            {
                number: 1,
                startAngle: isPos1* Math.PI * 2,
                endAngle: this.state.data[0].startAngle,
            },
            ]});
          }else{
            this.setState({data: [
              {
                number: 1,
                startAngle: this.state.data[0].startAngle,
                endAngle: this.state.data[0].endAngle,
            },
            {
                number: 30,
                startAngle: this.state.data[0].endAngle,
                endAngle: isPos2* Math.PI * 2,
            },
            {
                number: 1,
                startAngle: -((Math.PI * 2)-(isPos1* Math.PI * 2)),
                endAngle: this.state.data[0].startAngle,
            },
            ]});
          }
        }
      }
    )

  }


  _handleButtonPress = () => {
    const localnotification = {
      title: 'NutriPlotter!',
      body: 'You have not used the app for 2 days now',
      android: {
        sound: true,
      },
      ios: {
        sound: true,
      },
    };
    let sendAfterFiveSeconds = Date.now();
    sendAfterFiveSeconds += 5000;

    const schedulingOptions = { time: sendAfterFiveSeconds };
    Notifications.scheduleLocalNotificationAsync(
      localnotification,
      schedulingOptions
    );
  }


  listenForNotifications = () => {
    Notifications.addListener(notification => {
      if (notification.origin === 'received' && Platform.OS === 'ios') {
        Alert.alert(notification.title, notification.body);
      }
    });
  }

  componentWillMount() {
    getiOSNotificationPermission();
    this.listenForNotifications();
  }


  menuButtonHandler = (opt) => {
    if(opt.key == 1){
      pauseAudio();
      console.log('Restart');
      Amplitude.logEvent('Restart');
      this.props.navigation.navigate('Plating');
    }else if(opt.key == 2){
      console.log('Sound Off');
      Amplitude.logEvent('Sound Off');
      pauseAudio();
    }else if(opt.key == 3){
      //this.BackHandler.exitApp();
      console.log('Exit');
      pauseAudio();
      Amplitude.logEvent('Back to Home Screen');
      this.props.navigation.navigate('Home');
    }else if(opt.key == 4){
      console.log('Send a notification');
      this._handleButtonPress();
    }
  }




  sodaAnim = () => {
    if(this.state.isBig){
      LayoutAnimation.configureNext({
        duration: 1000,
        create: {
          type: LayoutAnimation.Types.linear,
          property: LayoutAnimation.Properties.opacity,
        },
        update: {
          type: LayoutAnimation.Types.linear,
        },});

      this.setState({widthAnim: 75, heightAnim: 150});



      Animated.parallel([
        Animated.timing(                  // Animate over time
          this.state.vertAnim,            // The animated value to drive
          {
            toValue: 25,                   // Animate to opacity: 1 (opaque)
            duration: 1000,              // Make it take a while
          }
        ),
        Animated.timing(this.state.horAnim,
          {
            toValue: 0,                   // Animate to opacity: 1 (opaque)
            duration: 1000,              // Make it take a while
          }
        ),

        Animated.timing(this.state.backOp,
          {
            toValue: 1,                   // Animate to opacity: 1 (opaque)
            duration: 1000,              // Make it take a while
          }
        ),
        Animated.timing(this.state.sodaOp,
          {
            toValue: 0,                   // Animate to opacity: 1 (opaque)
            duration: 1000,              // Make it take a while
          }
        ),
      ]).start();
    }else{
      LayoutAnimation.configureNext({
        duration: 1000,
        create: {
          type: LayoutAnimation.Types.linear,
          property: LayoutAnimation.Properties.opacity,
        },
        update: {
          type: LayoutAnimation.Types.linear,
        },});

      this.setState({widthAnim: 250, heightAnim: 500});



      Animated.parallel([
        Animated.timing(                  // Animate over time
          this.state.vertAnim,            // The animated value to drive
          {
            toValue: 250,                   // Animate to opacity: 1 (opaque)
            duration: 1000,              // Make it take a while
          }
        ),
        Animated.timing(this.state.horAnim,
          {
            toValue: 30,                   // Animate to opacity: 1 (opaque)
            duration: 1000,              // Make it take a while
          }
        ),
        Animated.timing(this.state.backOp,
          {
            toValue: 0,                   // Animate to opacity: 1 (opaque)
            duration: 1000,              // Make it take a while
          }
        ),
        Animated.timing(this.state.sodaOp,
          {
            toValue: 1,                   // Animate to opacity: 1 (opaque)
            duration: 1000,              // Make it take a while
          }
        ),
      ]).start();
    }

    this.setState({isBig : !this.state.isBig})


  }




  render() {
    playAudio();
    let { vertAnim, horAnim, heightAnim, widthAnim, backOp, sodaOp } = this.state;
    const transform1 = [
      {translateX: this.translate1_X},
      {translateY: this.translate1_Y},
      {rotate: this.spin1}
    ];
    const transform2 = [
      {translateX: this.translate2_X},
      {translateY: this.translate2_Y},
      {rotate: this.spin2}
    ];
    const transform3 = [
      {translateX: this.translate3_X},
      {translateY: this.translate3_Y},
      {rotate: this.spin3}
    ];

    let index = 0;
    const data = [
        { key: index++, section: true, label: 'More Options' },
        { key: index++, label: 'Restart' },
        { key: index++, label: 'Sound Off' },
        { key: index++, label: 'Exit' },
        { key: index++, label: 'Send a notification' },
        ];





      return (
        <View style={styles.maincontainer}>
        <View style={{position: 'absolute', width: '100%'}}>
          <View style={styles.conttop}>
            <View style = {styles.menucontainer}>
            <ModalSelector
                  data={data}
                  animationType="fade"
                  ref={selector => { this.selector = selector; }}
                  customSelector={
                    <TouchableOpacity onPress={() => {
                      this.selector.open();
                      Amplitude.logEvent('More Options button pressed');
                    }
                  }>
                      <Image
                        style={{ alignSelf: 'center' }}
                        source={require('./src/more-options.png')}
                      />
                    </TouchableOpacity>
                  }
                  onChange={(option) => this.menuButtonHandler(option)}
              />
            </View>
            <Animated.View
                style={{
                  alignItems: 'flex-end',
                  top: vertAnim, //------> bind anim to vertical translation
                  right: horAnim,
                  width: 83,
                  height: 150,
                  marginLeft: 50,
                }}>
              <TouchableOpacity style = {styles.cupholder} onPress={()=>{
                this.sodaAnim();
                Amplitude.logEvent('Drink cup pressed');
              }}>

                <Image
                    style={{
                      width: widthAnim, // 75  -> 250
                      height: heightAnim //150 -> 500
                    }}
                    source={require('./src/cup.png')}/>

              </TouchableOpacity>
            </Animated.View>
          </View>
          <Animated.View
              style={[styles.adjCont, {transform: transform1}] }
              {...this._panResponder1.panHandlers}
              >
            <Image
                source={require('../../../assets/images/adjust.png')}
                style={styles.adjuster}
            />
          </Animated.View>
          <Animated.View
              style={[styles.adjCont, {transform: transform2}] }
              {...this._panResponder2.panHandlers}
              >
            <Image
                source={require('../../../assets/images/adjust.png')}
                style={styles.adjuster}
            />
          </Animated.View>
          <Animated.View
              style={[styles.adjCont, {transform: transform3}] }
              {...this._panResponder3.panHandlers}
              >
            <Image
                source={require('../../../assets/images/adjust.png')}
                style={styles.adjuster}
            />
          </Animated.View>

          {/* graph */}
          <Animated.View style={[styles.plate, {zIndex: -1, opacity: backOp}]}>


          <Svg
                    width={210}
                    style={styles.pieSVG}
                    height={210}
                    viewBox={`-100 -100 200 200`}
                >
                    <G>


                      <Slice
                          index={0}
                          startAngle={this.state.data[0].startAngle}
                          endAngle={this.state.data[0].endAngle}
                          color={'#0d2f51'}
                          data={this.state.data}
                          key={'pie_shape_0'}
                      />
                      <Slice
                          index={1}
                          startAngle={this.state.data[1].startAngle}
                          endAngle={this.state.data[1].endAngle}
                          color={'#28BD8B'}
                          data={this.state.data}
                          key={'pie_shape_1'}
                      />
                      <Slice
                          index={2}
                          startAngle={this.state.data[2].startAngle}
                          endAngle={this.state.data[2].endAngle}
                          color={'#F66A6A'}
                          data={this.state.data}
                          key={'pie_shape_2'}
                      />


                    </G>
                </Svg>
          </Animated.View>


          {/* Soda choices */}
          <Animated.View style={{
                  opacity: sodaOp,
                  flexDirection: 'row',
                  position: 'absolute',
                  top: 170,
                  justifyContent: 'center',
                  width: '100%',
                  }}>
            <TouchableOpacity style={styles.sodaBox}><Text style={{color: 'white'}}>Water</Text></TouchableOpacity>
            <TouchableOpacity style={styles.sodaBox}><Text style={{color: 'white'}}>Milk</Text></TouchableOpacity>
            <TouchableOpacity style={styles.sodaBox}><Text style={{color: 'white'}}>Cola</Text></TouchableOpacity>
            <TouchableOpacity style={styles.sodaBox}><Text style={{color: 'white'}}>Beer</Text></TouchableOpacity>
            <TouchableOpacity style={styles.sodaBox}><Text style={{color: 'white'}}>Wine</Text></TouchableOpacity>
          </Animated.View>
        </View>





          <SlidingUpPanel
          visible={true}
          draggableRange={{top: 800, bottom: 80}}
          startCollapsed
          showBackdrop={false}
          >
          <View style={styles.container}>
            <View
              style={styles.top}
              >
              <View style={styles.left}>
              <TouchableOpacity
                onPress={()=> {
                  this.props.navigation.navigate('PlateDiv');
                  Amplitude.logEvent('Plate Type Screen button pressed');
                }
              }>
                  <Image
                    source={require('./src/plate.png')}
                    style={styles.img}
                    resizeMode="contain"
                  />
              </TouchableOpacity>
              </View>

              <View
                style={styles.centre}
                borderLeftWidth={1}
                borderRightWidth={1}
                >
                <Image
                  source={require('./src/up.png')}
                  style={styles.imgcentre}
                  resizeMode="contain"
                />
                <Text>Swipe up to choose!</Text>
              </View>
              <View style={styles.right}>
                <TouchableOpacity
                onPress={()=> {
                  this.props.navigation.navigate('Data');
                  Amplitude.logEvent('Plate Type Screen button pressed');
                }
              }>
                  <Image
                    source={require('./src/chart.png')}
                    style={styles.img}
                    resizeMode="contain"
                  />
                </TouchableOpacity>
              </View>

            </View>
            <View style={styles.bod}>
              <FoodList  />


            </View>

          </View>

        </SlidingUpPanel>
        </View>

      );}
  }
