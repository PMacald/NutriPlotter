//---------------------BASIC IMPORTS-----------------
import React from 'react';
import {Amplitude, Audio}from 'expo';
import * as firebase from 'firebase';

// react native:
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  Dimensions,
  ActivityIndicator,
} from 'react-native';

import { Container, Header, Left, Body, Right,Button, Title, Content } from 'native-base';

import SlidingUpPanel from 'rn-sliding-up-panel';
//components creted by us:
import {FoodList} from '../../../components/main/FoodList';
import {PopUpMenu} from '../../../components/main/PopUpMenu';
//stylesheets
import styles from './styles';

import { PieChart } from 'react-native-svg-charts'

Amplitude.initialize("8a8476a30e9af690b3dc1f1d7b637e4b")

export default class DataScreen extends React.Component {
  constructor(props){
    super(props);


    this.state = {
      totalCals : 0,
      totalProtein : 0,
      totalCarbs: 0,
      totalFat: 0,
      totalFibre: 0,
      totalSugar: 0,
      currentCals: 0,
      currentProtein: 0,
      currentCarbs: 0,
      currentFat: 0,
      currentSugar: 0,
      currentFibre: 0,
      selectedSlice: {
        label: '',
        value: 0,
      },
      labelWidth: 0,
      status:false,
      balanced: true,
      done: false,
    }

  }


  async componentDidMount(){
    await this.readFoodData("Baked Potato", "BP", 0.3);
    await this.readFoodData("Chicken Breast", "BP", 0.2);
    await this.readFoodData("Broccoli", "BP", 0.5);
    await this.readDrinkData("Wine");
    console.log("Done adding")
    await this.checkIfBalanced();
    if (this.state.balanced){
      await this.playBalancedAudio();
    }
    else {
      await this.playUnbalancedAudio();
    }
    this.setState({done: true});

  }

  async readFoodData(foodItem, plateType, anglePercentage){
    //Gets nutritional data from database
    //Calculates the nutritional data for the whole plate
    //Calculates the nutritional data for the angle on the plate

    await firebase.database().ref('foods/' + foodItem + "/Per 100g").once('value', function (snapshot) {
      const foodItemData = snapshot.val();
      let calories = foodItemData.Calories;
      let protein = foodItemData.Protein;
      let carbs = foodItemData.Carbs;
      let fat = foodItemData.Fat;
      let sugar = foodItemData.Sugar;
      let fibre = foodItemData.Fibre;

      this.setState({
        currentCals: calories,
        currentProtein: protein,
        currentCarbs: carbs,
        currentFat: fat,
        currentSugar: sugar,
        currentFibre: fibre,
      });
    }.bind(this));

    await firebase.database().ref('foods/' + foodItem + "/Per "+ plateType).once('value').then(function (snapshot) {
      var foodOnPlate = snapshot.val();
      factor = foodOnPlate/100;
      calories = this.state.currentCals*factor*anglePercentage;
      protein = this.state.currentProtein*factor*anglePercentage;
      carbs = this.state.currentCarbs*factor*anglePercentage;
      fat = this.state.currentFat*factor*anglePercentage;
      sugar = this.state.currentSugar*factor*anglePercentage;
      fibre = this.state.currentFibre*factor*anglePercentage;

      //Update total states
      this.setState( (state) => ({
        totalFat : state.totalFat + fat,
        totalCals : state.totalCals + calories,
        totalCarbs : state.totalCarbs + carbs,
        totalFibre: state.totalFibre + fibre,
        totalProtein : state.totalProtein + protein,
        totalSugar : state.totalSugar + sugar,
      }))
    }.bind(this));

  }

  checkIfBalanced(){
    console.log("Checking if balanced");
    const balancedMAX = [800, 80, 80, 30, 30, 20]
    const balancedMIN = [500, 15, 5, 0, 0, 0]

    if(this.state.totalCals < balancedMIN[0] || this.state.totalCals > balancedMAX[0] ){
      console.log(this.state.totalCals);
      console.log("Calories unbalanced");
      this.setState({
        balanced: false,
      })
    }
    console.log("Checked cals");
    if (this.state.totalProtein < balancedMIN[1] || this.state.totalProtein > balancedMAX[1]){
      console.log(this.state.totalCals);
      console.log("Protein unbalanced");
      this.setState({
        balanced: false,
      })
    }
    console.log("Checked protein");
    if (this.state.totalCarbs < balancedMIN[2] || this.state.totalCarbs > balancedMAX[2]){
      console.log("Carbs unbalanced");
      this.setState({
        balanced: false,
      })
    }
    console.log("Checked Carbs");
    if (this.state.totalFat < balancedMIN[3] || this.state.totalFat > balancedMAX[3]){
      console.log("Fats unbalanced");
      this.setState({
        balanced: false,
      })
    }
    console.log("Checked fats");
    if (this.state.totalSugar < balancedMIN[4] || this.state.totalSugar > balancedMAX[4]){
      console.log("Sugar unbalanced");
      this.setState({
        balanced: false,
      })
    }
    console.log("Checked sugar");
    if (this.state.totalFibre < balancedMIN[5] || this.state.totalFibre > balancedMAX[5]){
      console.log("Fibre unbalanced");
      this.setState({
        balanced: false,
      })
    }
    console.log("Checked fibre");
  }

  async readDrinkData(drinkItem){
    await firebase.database().ref('drinks/' + drinkItem + "/Per glass").once('value').then(function (snapshot) {
      var drinkItemData = snapshot.val();
      let calories = drinkItemData.Calories;
      let protein = drinkItemData.Protein;
      let carbs = drinkItemData.Carbs;
      let fats = drinkItemData.Fat;
      let sugar = drinkItemData.Sugar;
      let fibre = drinkItemData.Fibre;

      //Update states
      this.setState((state) => ({
        totalFat : this.state.totalFat + fats,
        totalCals : this.state.totalCals + calories,
        totalCarbs : this.state.totalCarbs + carbs,
        totalFibre: this.state.totalFibre + fibre,
        totalProtein : this.state.totalProtein + protein,
        totalSugar : this.state.totalSugar + sugar,
      }))
    }.bind(this));

  }

  getTextStyle() {
    if(this.state.balanced == true) {
      return {
        height: 50, width: '100%', backgroundColor: '#A6D49F', flexDirection: 'row', alignItems:'center'
      }
    }
    else {
      return {
        height: 50, width: '100%', backgroundColor: '#C73E1D', flexDirection: 'row', alignItems:'center'
      }
    }
  }

  async playUnbalancedAudio() {
    const soundObject = new Expo.Audio.Sound();

    try{
      console.log("sound playing");
      await soundObject.loadAsync(require('./src/sound/Unbalanced.mp3'));
      await soundObject.playAsync();
    // Your sound is playing!
    }
    catch (error) {
      console.log(error);
    // An error occurred!
    }
  }
  async playBalancedAudio() {
    const soundObject = new Expo.Audio.Sound();

    try{
      await soundObject.loadAsync(require('./src/sound/Balanced.mp3'));
      await soundObject.playAsync();
    // Your sound is playing!
    }
    catch (error) {
    // An error occurred!
    }
  }
  render() {

    const { labelWidth, selectedSlice } = this.state;
    const { label, value } = selectedSlice;
    const keys = ['Carbs', 'Protein', 'Fat'];
    const sum = this.state.totalCarbs + this.state.totalProtein + this.state.totalFat;
    const values = [this.state.totalCarbs/sum*100,this.state.totalProtein/sum*100,this.state.totalFat/sum*100];
    const colors = ['#53B3CB', '#F9C22E', '#F15946']
    const data = keys.map((key, index) => {
      return {
        key,
        value: values[index],
        svg: { fill: colors[index] },
        arc: { outerRadius: (70 + values[index]) + '%', padAngle: label === key ? 0.1 : 0 },
        onPress: () => this.setState({ selectedSlice: { label: key, value: values[index] }, status: true })
      }
    })
    const deviceWidth = Dimensions.get('window').width

    const back = this.props.navigation.goBack;

    if (!this.state.done) {
      return (
        <Container style={styles.container}>
          <View style={styles.indicator}>
            <ActivityIndicator size="large" color="white" animating={true}/>
          </View>
          <View>
            <Text  style={{width: '50%', textAlign: 'center', fontSize: 25, fontFamily:'NunitoSans', color:'black'}}>Please wait</Text>
          </View>
          <View>
          <Text  style={{width: '50%', textAlign: 'center', fontSize: 25, fontFamily:'NunitoSans', color:'black'}}>We are calculating your plate</Text>
          </View>
        </Container>

      );
    }

    return (
      <Container>
      <Header style={{height: 100}}>
      <Left>
      <Button transparent onPress={() => {
        back();
        Amplitude.logEvent('Back button pressed from data screen');
      }
    }>
    <Image source={require('./src/back.png')}
    style={{width: 35, height: 35}}/>
    </Button>
    </Left>
    <Body>
    <Title style={{width: 250}}>Nutritional Information</Title>
    </Body>
    <Right>
    <Button transparent>

    </Button>
    </Right>
    </Header>
    <Content>
    <View style={this.getTextStyle()}>
    <Text style={{width: '50%', textAlign: 'center', fontSize: 25, fontFamily:'NunitoSans', color:'white'}}>Calories:</Text>
    <Text style={{width: '50%', textAlign: 'center', fontSize: 25, fontFamily:'NunitoSans', color:'white'}}>{this.state.totalCals.toFixed(0)}</Text>
    </View>
    <View style={{ justifyContent: 'center', flex: 1 }}>
    <PieChart
    style={{ height: 200 }}
    outerRadius={'80%'}
    innerRadius={'45%'}
    data={data}
    />
    {
      //Only show Label and percentage when pressed
      this.state.status ? <Text
      onLayout={({ nativeEvent: { layout: { width } } }) => {
        this.setState({ labelWidth: width });
      }}
      style={{
        position: 'absolute',
        left: deviceWidth / 2 - labelWidth / 2,
        textAlign: 'center'
      }}>
      {`${label} \n ${value.toFixed(0)}%`}
      </Text> : null
    }
    </View>
    <View style={{height: 50, width: '100%', backgroundColor: 'gray', flexDirection: 'row', alignItems:'center'}}>
    <Text style={styles.text}>Protein:</Text>
    <Text style={styles.text}>{this.state.totalProtein.toFixed(1)}g</Text>
    </View>
    <View style={{height: 50, width: '100%', backgroundColor: 'gray', flexDirection: 'row', alignItems:'center'}}>
    <Text style={styles.text}>Carbohydrates:</Text>
    <Text style={styles.text}>{this.state.totalCarbs.toFixed(1)}g</Text>
    </View>
    <View style={{height: 50, width: '100%', backgroundColor: 'gray', flexDirection: 'row', alignItems:'center'}}>
    <Text style={styles.text}>Fats:</Text>
    <Text style={styles.text}>{this.state.totalFat.toFixed(1)}g</Text>
    </View>
    <View style={{height: 50, width: '100%', backgroundColor: 'gray', flexDirection: 'row', alignItems:'center'}}>
    <Text style={styles.text}>Sugar:</Text>
    <Text style={styles.text}>{this.state.totalSugar.toFixed(1)}g</Text>
    </View>
    <View style={{height: 50, width: '100%', backgroundColor: 'gray', flexDirection: 'row', alignItems:'center'}}>
    <Text style={styles.text}>Fibre:</Text>
    <Text style={styles.text}>{this.state.totalFibre.toFixed(1)}g</Text>
    </View>

    </Content>
    </Container>
  );}
}
