//---------------------BASIC IMPORTS-----------------
import React from 'react';
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
  PanResponder
} from 'react-native';
import SlidingUpPanel from 'rn-sliding-up-panel';
import ModalSelector from 'react-native-modal-selector'
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

const demoData = [
  {
      number: 30,
      color: '#0d2f51'
  },
  {
      number: 30,
      color: '#28BD8B'
  },
  {
      number: 30,
      color: '#F66A6A'
  },
];


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
      SoundOff: soundObject.StopASync
    }


    this.adjAnim = new Animated.Value(0);

    playAudio = async () => {
      try{
        await soundObject.loadAsync(require('./src/sound/Puzzle-Game_Looping.mp3'));
        await soundObject.playAsync();
      // Your sound is playing!
      }
      catch (error) {
      // An error occurred!
      }
    }

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
    this.translateX = this.adjAnim.interpolate({ inputRange, outputRange: this.outputRangeX });
    /// translateY
    var inputRange = [];
    this.outputRangeY = [];
    for (var i=0; i<=snapshot; ++i) {
        var value = i/snapshot;
        var move = -Math.cos(value * Math.PI * 2) * radius;
        inputRange.push(value);
        this.outputRangeY.push(move);
    }
    this.translateY = this.adjAnim.interpolate({ inputRange, outputRange : this.outputRangeY });
    console.log(this.outputRangeX);
    console.log(this.outputRangeY);


    this.spin = this.adjAnim.interpolate({inputRange: [0,1], outputRange: ['0deg', '360deg']})


    this._panResponder = PanResponder.create(
      {
        onStartShouldSetPanResponder: (evt, gesture) =>true,
        onPanResponderMove: (evt, gesture) => {
          console.log("check moves", gesture.dx, gesture.dy);



          this.adjAnim.setValue(0.5);
        }
      }
    )

  }

    animateAdjuster = () => {
      console.log('wub');
      this.adjAnim.setValue(0);

      Animated.timing(this.adjAnim, {
        toValue: 1,
        duration: 1000,
      }).start();



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
    const transform = [
              {translateX: this.translateX},
              {translateY: this.translateY},
              {rotate: this.spin}
            ];
    let index = 0;
    const data = [
        { key: index++, section: true, label: 'More Options' },
        { key: index++, label: 'Restart' },
        { key: index++, label: 'Sound On/Off' },
        { key: index++, label: 'Exit' },
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
                    <TouchableOpacity onPress={() => this.selector.open()}>
                      <Image
                        style={{ alignSelf: 'center' }}
                        source={require('./src/more-options.png')}
                      />
                    </TouchableOpacity>
                  }
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
              <TouchableOpacity style = {styles.cupholder} onPress={()=>this.sodaAnim()}>

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
              style={[styles.adjCont, {transform}] }
              {...this._panResponder.panHandlers}
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
                          endAngle={2*Math.PI}
                          color={demoData[0].color}
                          data={demoData}
                          key={'pie_shape_0'}
                      />
                      <Slice
                          index={1}
                          endAngle={2*Math.PI}
                          color={demoData[1].color}
                          data={demoData}
                          key={'pie_shape_1'}
                      />
                      <Slice
                          index={2}
                          endAngle={2*Math.PI}
                          color={demoData[2].color}
                          data={demoData}
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
                onPress={()=> this.animateAdjuster()}>
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
                onPress={()=> this.props.navigation.navigate('Data')}>
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
//this.props.navigation.navigate('PlateDiv')
