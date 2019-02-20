//---------------------BASIC IMPORTS-----------------
import React from 'react';
// react native:
import {View, Text, TouchableOpacity, Image} from 'react-native';
import { Container, Header, Left, Body, Right, Button, Icon, Title, Content } from 'native-base';
//components creted by us:
import {FoodList} from '../../../components/main/FoodList';
//stylesheets
import styles from './styles';

import { PieChart } from 'react-native-svg-charts';


export default class PlateDivScreen extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      mainplate : this.pieData2,
      platesize : "bigplate",
    };
  }
  render() {
    const back = this.props.navigation.goBack;
    const sixth = (100/6);
    const data2 = [ 50, 50]
    const data3 = [ 33, 33, 33]
    const data4 = [ 25, 25, 25, 25]
    const data5 = [ 20, 20, 20, 20, 20]
    const data6 = [ sixth,sixth,sixth,sixth,sixth,sixth ]

    const rand1 = ('#' + (Math.random() * 0xFFFFFF << 0).toString(16) + '000000').slice(0, 7);
    const rand2 = ('#' + (Math.random() * 0xFFFFFF << 0).toString(16) + '000000').slice(0, 7);
    const rand3 = ('#' + (Math.random() * 0xFFFFFF << 0).toString(16) + '000000').slice(0, 7);
    const rand4 = ('#' + (Math.random() * 0xFFFFFF << 0).toString(16) + '000000').slice(0, 7);
    const rand5 = ('#' + (Math.random() * 0xFFFFFF << 0).toString(16) + '000000').slice(0, 7);
    const rand6 = ('#' + (Math.random() * 0xFFFFFF << 0).toString(16) + '000000').slice(0, 7);
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
    const pieData2 = data2
        .filter(value => value > 0)
        .map((value, index) => ({
            value,
            svg: {
                fill: randomColor(index),
            },
            key: `pie-${index}`,
        }))

    const pieData3 = data3
        .filter(value => value > 0)
        .map((value, index) => ({
            value,
            svg: {
                fill: randomColor(index),
            },
            key: `pie-${index}`,
        }))
    const pieData4 = data4
        .filter(value => value > 0)
        .map((value, index) => ({
            value,
            svg: {
                fill: randomColor(index),
            },
            key: `pie-${index}`,
        }))
    const pieData5 = data5
        .filter(value => value > 0)
        .map((value, index) => ({
            value,
            svg: {
                fill: randomColor(index),
            },
            key: `pie-${index}`,
        }))
    const pieData6 = data6
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
                <Button transparent onPress={() => back()}>
                    <Image source={require('./src/back.png')}
                            style={{width: 35, height: 35}}/>
                </Button>
              </Left>
              <Body>
                <Title style={{width: 250}}>Choose plate type!</Title>
              </Body>
              <Right>
                <Button transparent>
                </Button>
              </Right>
            </Header>
            <Content>
              <View style={{height: 50, width: '100%', backgroundColor: 'gray', flexDirection: 'row', alignItems:'center'}}>
                <Text style={{width: '50%', textAlign: 'center', fontSize: 25}}>Small Plate</Text>
                <Text style={{width: '50%', textAlign: 'center', fontSize: 25}}>Big Plate</Text>
              </View>

              <View style={styles.section}>
                <TouchableOpacity style={styles.chrtcont} onPress={()=>{
                  this.props.navigation.navigate('Plating', {prevScreen: "Platediv",size: "small", comps: 2});
                }}>
                  <PieChart
                      style={ styles.chrtsmall }
                      data={ pieData2 }
                  />
                </TouchableOpacity>
                <TouchableOpacity style={styles.chrtcont} onPress={()=>{
                  console.log('Updated Plate Type to big plate, 2 components');
                  this.props.navigation.navigate('Plating', {prevScreen: "Platediv",size: "big", comps: 2});
                }}>
                  <PieChart
                      style={ styles.chrtbig }
                      data={ pieData2 }
                  />
                </TouchableOpacity>
              </View>
              <Text style={styles.sectext}>2 Sections</Text>
              <View style={styles.hr}></View>

              <View style={styles.section}>
                <TouchableOpacity style={styles.chrtcont} onPress={()=>
                  {
                    console.log('Updated Plate Type to small plate, 3 components');
                    this.props.navigation.navigate('Plating', {prevScreen: "Platediv",size: "small", comps: 3});
                  }
                }>
                  <PieChart
                      style={ styles.chrtsmall }
                      data={ pieData3 }
                  />
                </TouchableOpacity>
                <TouchableOpacity style={styles.chrtcont} onPress={()=>
                  {
                    console.log('Updated Plate Type to big plate, 3 components');
                    this.setState({mainplate: this.pieData3, platesize:"bigplate"});
                    this.props.navigation.navigate('Plating', {prevScreen: "Platediv",size: "big", comps: 3});
                  }
                }>
                  <PieChart
                      style={ styles.chrtbig }
                      data={ pieData3 }
                  />
                </TouchableOpacity>
              </View>
              <Text style={styles.sectext}>3 Sections</Text>
              <View style={styles.hr}></View>

              <View style={styles.section}>
                <TouchableOpacity style={styles.chrtcont} onPress={()=>
                  {
                    console.log('Updated Plate Type to small plate, 4 components');
                    this.props.navigation.navigate('Plating', {prevScreen: "Platediv",size: "small", comps: 4});
                  }
                  }>
                    <PieChart
                        style={ styles.chrtsmall }
                        data={ pieData4 }
                    />
                </TouchableOpacity>
                <TouchableOpacity style={styles.chrtcont} onPress={()=>{
                  console.log('Updated Plate Type to big plate, 4 components');
                  this.props.navigation.navigate('Plating', {prevScreen: "Platediv",size: "big", comps: 4});
                }}>
                    <PieChart
                        style={ styles.chrtbig }
                        data={ pieData4 }
                    />
                </TouchableOpacity>
              </View>
              <Text style={styles.sectext}>4 Sections</Text>
              <View style={styles.hr}></View>

              <View style={styles.section}>
                <TouchableOpacity style={styles.chrtcont} onPress={()=>{
                  console.log('Updated Plate Type to small plate, 5 components');
                  this.props.navigation.navigate('Plating', {prevScreen: "Platediv",size: "small", comps: 5});
                }}>
                    <PieChart
                        style={ styles.chrtsmall }
                        data={ pieData5 }
                    />
                </TouchableOpacity>
                <TouchableOpacity style={styles.chrtcont} onPress={()=>{
                  console.log('Updated Plate Type to big plate, 5 components');
                  this.props.navigation.navigate('Plating', {prevScreen: "Platediv",size: "big", comps: 5});
                }}>
                    <PieChart
                        style={ styles.chrtbig }
                        data={ pieData5 }
                    />
                </TouchableOpacity>
              </View>
              <Text style={styles.sectext}>5 Sections</Text>
              <View style={styles.hr}></View>
            </Content>
          </Container>
      );}
  }
