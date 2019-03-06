//---------------------BASIC IMPORTS-----------------
import React from 'react';
import {Amplitude}from 'expo';

// react native:
import {
  Text,
  View,
  Image,
  TouchableOpacity
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






  render() {
    const carb = 60
    const protein = 80
    const fat =  20

    const nutdata = [carb,protein,fat]
    const piedata = []
    const sum = carb + protein + fat

    for (const i = 0;i < 3;i++){
      //calculate percentage
      piedata.push((nutdata[i] / sum) * 100)
    }

    const back = this.props.navigation.goBack;

    const data = [ 50, 10, 40, 95, -4, -24, 85, 91, 35, 53, -53, 24, 50, -20, -80 ]
    const rand1 = ('#' + (Math.random() * 0xFFFFFF << 0).toString(16) + '000000').slice(0, 7);
    const rand2 = ('#' + (Math.random() * 0xFFFFFF << 0).toString(16) + '000000').slice(0, 7);
    const rand3 = ('#' + (Math.random() * 0xFFFFFF << 0).toString(16) + '000000').slice(0, 7);

    const randomColor = (index) => {
        switch (index){
          case 0:
            return rand1;
          case 1:
            return rand2;
          case 2:
            return rand3;
          case 3:
            return rand4;
          case 4:
            return rand5;
          case 5:
            return rand6;

        }
    }

    const pieData3 = piedata
        .filter(value => value > 0)
        .map((value, index) => ({
            value,
            svg: {
                fill: randomColor(index),
            },
            key: `pie-${index}`,
        }))

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
            <View style={{height: 50, width: '100%', backgroundColor: 'gray', flexDirection: 'row', alignItems:'center'}}>
              <Text style={{width: '50%', textAlign: 'center', fontSize: 25, fontFamily:'NunitoSans', color:'white'}}>Calories:</Text>
              <Text style={{width: '50%', textAlign: 'center', fontSize: 25, fontFamily:'NunitoSans', color:'white'}}>800</Text>
            </View>
            <PieChart
               style={{ height: 200 }}
               outerRadius={'70%'}
               innerRadius={30}
               data={pieData3}
           />
           <View style={{height: 50, width: '100%', backgroundColor: 'gray', flexDirection: 'row', alignItems:'center'}}>
             <Text style={styles.text}>Protein:</Text>
             <Text style={styles.text}>60g</Text>
           </View>
           <View style={{height: 50, width: '100%', backgroundColor: 'gray', flexDirection: 'row', alignItems:'center'}}>
             <Text style={styles.text}>Carbohydrates:</Text>
             <Text style={styles.text}>60g</Text>
           </View>
           <View style={{height: 50, width: '100%', backgroundColor: 'gray', flexDirection: 'row', alignItems:'center'}}>
             <Text style={styles.text}>Fats:</Text>
             <Text style={styles.text}>60g</Text>
           </View>
           <View style={{height: 50, width: '100%', backgroundColor: 'gray', flexDirection: 'row', alignItems:'center'}}>
             <Text style={styles.text}>Sugar:</Text>
             <Text style={styles.text}>60g</Text>
           </View>
           <View style={{height: 50, width: '100%', backgroundColor: 'gray', flexDirection: 'row', alignItems:'center'}}>
             <Text style={styles.text}>Fibre:</Text>
             <Text style={styles.text}>60g</Text>
           </View>

          </Content>
        </Container>
      );}
  }
