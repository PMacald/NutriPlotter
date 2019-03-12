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
import {Svg} from 'expo';
import { PieChart } from 'react-native-svg-charts';
import { absoluteFill } from 'react-native-extended-stylesheet';

const { UIManager } = NativeModules;

Amplitude.initialize("8a8476a30e9af690b3dc1f1d7b637e4b")


let {height, width} = Dimensions.get('window');

UIManager.setLayoutAnimationEnabledExperimental &&
  UIManager.setLayoutAnimationEnabledExperimental(true);




export default class PlatingScreen extends React.Component {
  constructor(props){
    super(props);

    const soundObject = new Expo.Audio.Sound();

    this.state = {
      vertAnim : new Animated.Value(height/20),
      horAnim : new Animated.Value(0),
      heightAnim: height/4,
      widthAnim: width/4,
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
      plateSize: "big",
      plateComps: 3,
      plateUpdate: false,
      drinkChoice: "",
    }




    this.adj1Anim = new Animated.Value(0);

    this.adj2Anim = new Animated.Value(0.33);

    this.adj3Anim = new Animated.Value(0.66);


    var range = 1, snapshot = 50, radius = 130;

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
    console.log(this.props.navigation.state.params.comps);
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

  async playAudio() {
    try{
      await soundObject.loadAsync(require('./src/sound/yarblat_smb_techno.mp3'));
      await soundObject.playAsync();
      await soundObject.setIsLoopingAsync(20);

    // Your sound is playing!
    }
    catch (error) {
    // An error occurred!
    }
  }

  async pauseAudio() {
    try{
      await soundObject.pauseAsync();
    // Your sound stopped playing!
    }
    catch (error) {
    // An error occurred!
    }
  }
  renderAdjusters(transforms){
    switch(this.props.navigation.state.params.comps){
      case 2:
      return (
        <View>
          <Animated.View
              style={[styles.adjCont, {transform: transforms[0]}] }
              {...this._panResponder1.panHandlers}
              >
              <Image
                  source={require('../../../assets/images/adjust.png')}
                  style={styles.adjuster}
              />
            </Animated.View>
            <Animated.View
                style={[styles.adjCont, {transform: transforms[1]}] }
                {...this._panResponder2.panHandlers}
                >
                <Image
                    source={require('../../../assets/images/adjust.png')}
                    style={styles.adjuster}
                />
            </Animated.View>
        </View>
      )
        break;
      case 4:
        break;
      case 5:
        break;
      default:
        return (
          <View>
            <Animated.View
              style={[styles.adjCont, {transform: transforms[0]}] }
              {...this._panResponder1.panHandlers}
              >
              <Image
                  source={require('../../../assets/images/adjust.png')}
                  style={styles.adjuster}
              />
            </Animated.View>
            <Animated.View
                style={[styles.adjCont, {transform: transforms[1]}] }
                {...this._panResponder2.panHandlers}
                >
                <Image
                    source={require('../../../assets/images/adjust.png')}
                    style={styles.adjuster}
                />
            </Animated.View>
            <Animated.View
                style={[styles.adjCont, {transform: transforms[2]}] }
                {...this._panResponder3.panHandlers}
                >
              <Image
                  source={require('../../../assets/images/adjust.png')}
                  style={styles.adjuster}
              />
            </Animated.View>


          </View>
        );
        break;
    }
  }
  renderSlices(){
    switch(this.props.navigation.state.params.comps){
      case 2:
        return (
          <Svg.G>
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
          </Svg.G>
        );
        break;

      case 4:
        console.log("4");
        break;
      case 5:
        console.log("5");
        break;
      default:

        return (
          <Svg.G>
            <Slice
                index={0}
                startAngle={this.state.data[0].startAngle}
                endAngle={this.state.data[0].endAngle}
                color={'#FF5733'}
                data={this.state.data}
                key={'pie_shape_0'}
            />
            <Slice
                index={1}
                startAngle={this.state.data[1].startAngle}
                endAngle={this.state.data[1].endAngle}
                color={'#33FF39'}
                data={this.state.data}
                key={'pie_shape_1'}
            />
            <Slice
                index={2}
                startAngle={this.state.data[2].startAngle}
                endAngle={this.state.data[2].endAngle}
                color={'#4633FF'}
                data={this.state.data}
                key={'pie_shape_2'}
            />
          </Svg.G>
        );
        break;
    }



  }

  async componentDidMount(){
    await this.playAudio();
  }

  componentWillUpdate(){
    if(this.state.plateUpdate){
      //here if the plate is being updated in platediv screen, this will adjust the plate components
      this.setState({
                 plateSize: this.props.navigation.state.params.size,
                 plateComps:this.props.navigation.state.params.comps,
                 plateUpdate: false});
      console.log("plate updated");
      //different settings = different gesture locators
      switch(this.props.navigation.state.params.comps){
        case 2:
        this.setState({data: [
          {
            number: 1,
            startAngle:  0,
            endAngle: Math.PI,
        },
        {
            number: 1,
            startAngle: Math.PI,//this.state.data[1].startAngle,
            endAngle: Math.PI*2,//isPos1* Math.PI * 2,
        },
        {
          number: 33,
          startAngle: Math.PI * 4/3,
          endAngle: Math.PI * 2,
      },
        ]});
          this.adj1Anim.setValue(0);
          this.adj2Anim.setValue(0.5);
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
                if(minInd>25){
                  isPos1 = -1 * ((50-minInd)/50);
                  isPos2 = minInd/50;
                  this.setState({data: [
                    {
                      number: 1,
                      startAngle: isPos1* Math.PI * 2,
                      endAngle: this.state.data[0].endAngle,
                  },
                  {
                      number: 1,
                      startAngle: this.state.data[0].endAngle,//this.state.data[1].startAngle,
                      endAngle: isPos2* Math.PI * 2,//isPos1* Math.PI * 2,
                  },
                  {
                    number: 33,
                    startAngle: Math.PI * 4/3,
                    endAngle: Math.PI * 2,
                },
                  ]});
                }else{
                  var constspot = this.state.data[0].endAngle;
                  isPos1 = -1 * ((50-minInd)/50);
                  isPos2 = minInd/50;
                  this.setState({data: [
                    {
                      number: 1,
                      startAngle: isPos2* Math.PI * 2, //stays constant
                      endAngle: constspot,
                  },
                  {
                      number: 1,
                      startAngle: constspot,
                      endAngle: isPos2* Math.PI * 2 + Math.PI*2,
                  },
                  {
                    number: 33,
                    startAngle: Math.PI * 4/3,
                    endAngle: Math.PI * 2,
                },
                  ]});
                }

                //now the data will need to change

              }
            }
          )

          //what happens when you move the adjuster 2 -- done
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
                var constspot = this.state.data[0].startAngle;
                if(true){//moving left
                  isPos1 = -1 * ((50-minInd)/50);
                  isPos2 = minInd/50;
                  this.setState({data: [
                    {
                      number: 1,
                      startAngle: constspot, //stays constant
                      endAngle: isPos2* Math.PI * 2,
                  },
                  {
                      number: 1,
                      startAngle: isPos1* Math.PI * 2,
                      endAngle: constspot,
                  },
                  {
                    number: 33,
                    startAngle: Math.PI * 4/3,
                    endAngle: Math.PI * 2,
                },
                  ]});
                }
              }
            }
          )

          break;
        case 4:

        case 5:

        default:
          this.adj1Anim.setValue(0);
          this.adj2Anim.setValue(0.33);
          this.adj3Anim.setValue(0.66);
          this.setState({data:
            [
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
            ]
          });

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
    }
    //console.log("data length " + this.state.data.length)
    //console.log(this.state.plateComps)

  }

  menuButtonHandler = (opt) => {
    if(opt.key == 1){
      this.pauseAudio();
      console.log('Restart');
      Amplitude.logEvent('Restart');
      this.props.navigation.navigate('Plating');
    }else if(opt.key == 2){
      console.log('Sound Off');
      Amplitude.logEvent('Sound Off');
      this.pauseAudio();
    }else if(opt.key == 3){
      //this.BackHandler.exitApp();
      console.log('Exit');
      this.pauseAudio();
      Amplitude.logEvent('Back to Home Screen');
      this.props.navigation.navigate('Home');
    }
  }




  sodaAnim = () => {
    console.log(height, width);//896 414
    // For when cup reverts to 'small'

    // marginTop: vertAnim, //------> bind anim to vertical translation
    // marginRight: horAnim,
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


      this.setState({widthAnim: width/4.5, heightAnim: height/4.7});//75-150



      Animated.parallel([
        Animated.timing(                  // Animate over time
          this.state.vertAnim,            // The animated value to drive
          {
            toValue: height/20,                   // Animate to opacity: 1 (opaque)
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

      this.setState({widthAnim: width/1.6, heightAnim: height/1.7});



      Animated.parallel([
        Animated.timing(                  // Animate over time
          this.state.vertAnim,            // The animated value to drive
          {
            toValue: height/3.3,                   // Animate to opacity: 1 (opaque)
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
    console.log(height,width);
    this.playAudio();

    let { vertAnim, horAnim, heightAnim, widthAnim, backOp, sodaOp } = this.state;
    //console.log(vertAnim);
    //console.log("heightAnim: " + heightAnim);

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
    const transform4 = [
      {translateX: this.translate4_X},
      {translateY: this.translate4_Y},
      {rotate: this.spin3}
    ];
    const transform5 = [
      {translateX: this.translate5_X},
      {translateY: this.translate5_Y},
      {rotate: this.spin3}
    ];


    let index = 0;
    const data = [
        { key: index++, section: true, label: 'More Options' },
        { key: index++, label: 'Restart' },
        { key: index++, label: 'Sound Off' },
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
                    <TouchableOpacity onPress={() => {
                      this.selector.open();
                      Amplitude.logEvent('More Options button pressed');
                    }
                  }>
                      {/* Image to represent menu button */}
                      <Image

                        style={{ resizeMode: 'contain', paddingLeft:width*0.5,  width:width*0.1, height:height*0.1  }}
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
                  // marginTop: this.state.vertAnim, //------> bind anim to vertical translation
                  // marginRight: this.state.horAnim,
                  width: 83,
                  height: 150

                }}>
              <TouchableOpacity style = {styles.cupholder} onPress={()=>{
                this.sodaAnim();
                Amplitude.logEvent('Drink cup pressed');
              }}>

                <Image
                    style={{
                      width: this.state.widthAnim, // 75  -> 250
                      height: this.state.heightAnim, //150 -> 500
                    }}
                    source={require('./src/cup.png')}/>

              </TouchableOpacity>
            </Animated.View>
          </View>

          {/* graph */}
          <Animated.View style={[{zIndex: -1, opacity: backOp, width: width, height: height*0.7, paddingBottom:80}]}>
          {this.renderAdjusters([transform1, transform2, transform3, transform4, transform5])}

            <Animated.View style={[styles.plate]}>


            <Svg
                      width={width*0.5}
                      style={styles.pieSVG}
                      height={width*0.5}
                      viewBox={`-100 -100 200 200`}
                  >


                        {this.renderSlices()}


                  </Svg>
            </Animated.View>
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
            <TouchableOpacity
                  style={styles.sodaBox}
                  onPress={()=> {
                    this.setState({drinkChoice: "Water"});
                    Amplitude.logEvent("Chose Water as drink option");
                    console.log("Water");
            }}>
            <Text style={{color: 'white'}}>Water</Text>
            </TouchableOpacity>
            <TouchableOpacity
                  style={styles.sodaBox}
                  onPress={()=> {
                    this.setState({drinkChoice: "Milk"});
                    Amplitude.logEvent("Chose Milk as drink option");
                    console.log("Milk");
            }}>
            <Text style={{color: 'white'}}>Milk</Text></TouchableOpacity>
            <TouchableOpacity
                  style={styles.sodaBox}
                  onPress={()=> {
                    this.setState({drinkChoice: "Cola"});
                    Amplitude.logEvent("Chose Cola as drink option");
                    console.log("Cola");
            }}>
            <Text style={{color: 'white'}}>Cola</Text></TouchableOpacity>
            <TouchableOpacity
                  style={styles.sodaBox}
                  onPress={()=> {
                    this.setState({drinkChoice: "Beer"});
                    Amplitude.logEvent("Chose Beer as drink option");
                    console.log("Beer");
            }}>
            <Text style={{color: 'white'}}>Beer</Text></TouchableOpacity>
            <TouchableOpacity
                  style={styles.sodaBox}
                  onPress={()=> {
                    this.setState({drinkChoice: "Wine"});
                    Amplitude.logEvent("Chose Wine as drink option");
                    console.log("Wine");
            }}>
            <Text style={{color: 'white'}}>Wine</Text></TouchableOpacity>
          </Animated.View>
        </View>





          <SlidingUpPanel
          visible={true}
          draggableRange={{top: height, bottom: 80}}
          startCollapsed={true}
          showBackdrop={false}
          >
          <View style={styles.container}>
            <View
              style={styles.top}
              >
              <View style={styles.left}>
              <TouchableOpacity
                onPress={()=> {
                  this.setState({plateUpdate: true});
                  Amplitude.logEvent('Plate Type Screen button pressed');
                  this.props.navigation.navigate('PlateDiv');
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

                borderColor="white"
                >
                <Image
                  source={require('./src/up.png')}
                  style={styles.imgcentre}
                  resizeMode="contain"
                />
                <Text style={{color: 'white'}}>Swipe up to choose!</Text>
              </View>
              <View style={styles.right}>
                <TouchableOpacity
                onPress={()=> {
                  //change here after calculation
                  //get the length of data )which is a list of objects
                  proportionToPlate = [];
                  for (let i = 0; i < this.props.navigation.state.params.comps; i++){
                    angleDifference = ((this.state.data[i].endAngle - this.state.data[i].startAngle)/(Math.PI * 2)).toFixed(3);
                    proportionToPlate.push(angleDifference);
                  }
                  console.log(proportionToPlate);
                  Amplitude.logEvent('Data Screen button pressed');
                  this.pauseAudio();
                  this.props.navigation.navigate('Data',
                        {drinkChoice: this.state.drinkChoice,
                         angles: proportionToPlate,
                         plateType: this.state.plateSize,
                         foodChosen: ["Chicken Breast","Jacket Potato","Broccoli"],
                        }
                      );
                }}>

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
