//---------------------BASIC IMPORTS-----------------
import React from 'react';
import {Amplitude}from 'expo';

// react native:
import {View, Text, TouchableOpacity, Image} from 'react-native';
import { Container, Header, Left, Body, Right, Button, Icon, Title, Content } from 'native-base';
//components creted by us:
import {FoodList} from '../../../components/main/FoodList';
//stylesheets
import styles from './styles';
import {Svg} from 'expo';


import {Slice} from '../../../components/main/Slice';

Amplitude.initialize("8a8476a30e9af690b3dc1f1d7b637e4b")

export default class PlateDivScreen extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      platecomps : 3,
      platesize : "bigplate",
      changed : false,
    };
  }




  render() {
    if(this.state.changed == true){
      this.props.navigation.navigate("Plating", {prevScreen: "Platediv",size: this.state.platesize, comps: this.state.platecomps});
    }
    const back = this.props.navigation.goBack;
    
    const data2 = [{start: 0, end: Math.PI, color: "#1AB385"},
                    {start: Math.PI, end: 2*Math.PI, color: "#C32148"}];
    const data3 = [ {start: 0, end: (2/3)*Math.PI, color: "#1AB385"},
                    {start: (2/3)*Math.PI, end: (4/3)*Math.PI, color: "#C32148"},
                    {start: (4/3)*Math.PI, end: 2*Math.PI, color: "#4AE1E0"},]
    const data4 = [ {start: 0, end: (1/2)*Math.PI, color: "#1AB385"},
                    {start: (1/2)*Math.PI, end: Math.PI, color: "#C32148"},
                    {start: Math.PI, end: (3/2)*Math.PI, color: "#4AE1E0"},
                    {start: (3/2)*Math.PI, end: 2*Math.PI, color: "#751F35"},]
    const data5 = [ {start: 0, end: (2/5)*Math.PI, color: "#1AB385"},
                    {start: (2/5)*Math.PI, end: (4/5)*Math.PI, color: "#C32148"},
                    {start: (4/5)*Math.PI, end: (6/5)*Math.PI, color: "#4AE1E0"},
                    {start: (6/5)*Math.PI, end: (8/5)*Math.PI, color: "#751F35"},
                    {start: (8/5)*Math.PI, end: 2*Math.PI, color: "#20B2AA"},]
    const data6 = [ {start: 0, end: (1/3)*Math.PI, color: "#1AB385"},
                    {start: (1/3)*Math.PI, end: (2/3)*Math.PI, color: "#C32148"},
                    {start: (2/3)*Math.PI, end: Math.PI, color: "#4AE1E0"},
                    {start: Math.PI, end: (4/3)*Math.PI, color: "#751F35"},
                    {start: (4/3)*Math.PI, end: (5/3)*Math.PI, color: "#20B2AA"},
                    {start: (5/3)*Math.PI, end: 2*Math.PI, color: "#F69DD1"},]



      return (
          <Container>
            <Header style={{height: 100}}>
              <Left>
                <Button transparent onPress={() =>
                  {
                    back();
                    Amplitude.logEvent('Back button pressed from plate types screen');
                  }
                }>
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
                  console.log('Updated Plate Type to small plate, 2 components');
                  this.setState({mainplate: this.pieData2, platesize:"smallplate"});
                  this.props.navigation.navigate('Plating', {prevScreen: "Platediv",size: "small", comps: 2});
                  Amplitude.logEvent('Chosen: Small Plate, 2 Components');
                }}>
                  <Svg
                    width={130}
                    height={130}
                    viewBox={`-100 -100 200 200`}
                    style={styles.svgs}
                ><Slice
                        style={ styles.chrtsmall }
                        startAngle={data2[0].start}
                        endAngle={data2[0].end}
                        color={data2[0].color}
                        pressIt={false}
                        
                    />
                    <Slice
                        style={ styles.chrtsmall }
                        startAngle={data2[1].start}
                        endAngle={data2[1].end}
                        color={data2[1].color}
                        pressIt={false}
                        
                    />
                  </Svg>
                </TouchableOpacity>
                <TouchableOpacity style={styles.chrtcont} onPress={()=>{
                  console.log('Updated Plate Type to big plate, 2 components');
                  this.setState({mainplate: this.pieData2, platesize:"bigplate"});
                  this.props.navigation.navigate('Plating', {prevScreen: "Platediv",size: "big", comps: 2});
                  Amplitude.logEvent('Chosen: Big Plate, 2 Components');

                }}>
                <Svg
                    width={190}
                    height={190}
                    viewBox={`-100 -100 200 200`}
                    style={styles.svgb}
                >
                  <Slice
                      style={ styles.chrtbig }
                      startAngle={data2[0].start}
                      endAngle={data2[0].end}
                      color={data2[0].color}
                      pressIt={false}
                  />
                  <Slice
                      style={ styles.chrtbig }
                      startAngle={data2[1].start}
                      endAngle={data2[1].end}
                      color={data2[1].color}
                      pressIt={false}
                  />
                </Svg>
                </TouchableOpacity>
              </View>
              <Text style={styles.sectext}>2 Sections</Text>
              <View style={styles.hr}></View>

              <View style={styles.section}>
                <TouchableOpacity style={styles.chrtcont} onPress={()=>
                  {
                    console.log('Updated Plate Type to small plate, 3 components');
                    this.setState({mainplate: this.pieData3, platesize:"smallplate"});
                    this.props.navigation.navigate('Plating', {prevScreen: "Platediv",size: "small", comps: 3});
                    Amplitude.logEvent('Chosen: Small Plate, 3 Components');
                  }
                }>
                  <PieChart
                      style={ styles.chrtsmall }
                      startAngle={data3[2].start}
                      endAngle={data3[2].end}
                      color={data3[2].color}
                      pressIt={false}
                  />
                  </Svg>
                </TouchableOpacity>
                <TouchableOpacity style={styles.chrtcont} onPress={()=>
                  {
                    console.log('Updated Plate Type to big plate, 3 components');
                    this.setState({mainplate: this.pieData3, platesize:"bigplate"});
                    this.props.navigation.navigate('Plating', {prevScreen: "Platediv",size: "big", comps: 3});
                    Amplitude.logEvent('Chosen: Big Plate, 3 Components');
                  }
                }>
                <Svg
                    width={190}
                    height={190}
                    viewBox={`-100 -100 200 200`}
                    style={styles.svgb}
                >
                  <Slice
                      style={ styles.chrtbig }
                      startAngle={data3[0].start}
                      endAngle={data3[0].end}
                      color={data3[0].color}
                      pressIt={false}
                  />
                  <Slice
                      style={ styles.chrtbig}
                      startAngle={data3[1].start}
                      endAngle={data3[1].end}
                      color={data3[1].color}
                      pressIt={false}
                  />
                  <Slice
                      style={ styles.chrtbig }
                      startAngle={data3[2].start}
                      endAngle={data3[2].end}
                      color={data3[2].color}
                      pressIt={false}
                  />
                  </Svg>
                </TouchableOpacity>
              </View>
              <Text style={styles.sectext}>3 Sections</Text>
              <View style={styles.hr}></View>

              <View style={styles.section}>
                <TouchableOpacity style={styles.chrtcont} onPress={()=>
                  {
                    console.log('Updated Plate Type to small plate, 4 components');
                    this.setState({mainplate: this.pieData4, platesize:"smallplate"});
                    this.props.navigation.navigate('Plating', {prevScreen: "Platediv",size: "small", comps: 4});
                    Amplitude.logEvent('Chosen: Small Plate, 4 Components');
                  }
                  }>
                  <Svg
                    width={130}
                    height={130}
                    viewBox={`-100 -100 200 200`}
                    style={styles.svgs}
                >
                  <Slice
                      style={ styles.chrtsmall }
                      startAngle={data4[0].start}
                      endAngle={data4[0].end}
                      color={data4[0].color}
                      pressIt={false}
                  />
                  <Slice
                      style={ styles.chrtsmall }
                      startAngle={data4[1].start}
                      endAngle={data4[1].end}
                      color={data4[1].color}
                      pressIt={false}
                  />
                  <Slice
                      style={ styles.chrtsmall }
                      startAngle={data4[2].start}
                      endAngle={data4[2].end}
                      color={data4[2].color}
                      pressIt={false}
                  />
                  <Slice
                      style={ styles.chrtsmall }
                      startAngle={data4[3].start}
                      endAngle={data4[3].end}
                      color={data4[3].color}
                      pressIt={false}
                  />
                  </Svg>
                </TouchableOpacity>
                <TouchableOpacity style={styles.chrtcont} onPress={()=>{
                  console.log('Updated Plate Type to big plate, 4 components');
                  this.setState({mainplate: this.pieData4, platesize:"bigplate"});
                  this.props.navigation.navigate('Plating', {prevScreen: "Platediv",size: "big", comps: 4});
                  Amplitude.logEvent('Chosen: Big Plate, 4 Components');
                }}>
                <Svg
                    width={190}
                    height={190}
                    viewBox={`-100 -100 200 200`}
                    style={styles.svgb}
                >
                  <Slice
                      style={ styles.chrtbig }
                      startAngle={data4[0].start}
                      endAngle={data4[0].end}
                      color={data4[0].color}
                      pressIt={false}
                      
                  />
                  <Slice
                      style={ styles.chrtbig }
                      startAngle={data4[1].start}
                      endAngle={data4[1].end}
                      color={data4[1].color}
                      pressIt={false}
                      
                  />
                  <Slice
                      style={ styles.chrtbig }
                      startAngle={data4[2].start}
                      endAngle={data4[2].end}
                      color={data4[2].color}
                      pressIt={false}
                      
                  />
                  <Slice
                      style={ styles.chrtbig }
                      startAngle={data4[3].start}
                      endAngle={data4[3].end}
                      color={data4[3].color}
                      pressIt={false}
                      
                  />
                  </Svg>
                </TouchableOpacity>
              </View>
              <Text style={styles.sectext}>4 Sections</Text>
              <View style={styles.hr}></View>

              <View style={styles.section}>
                <TouchableOpacity style={styles.chrtcont} onPress={()=>{
                  console.log('Updated Plate Type to small plate, 5 components');
                  this.setState({mainplate: this.pieData4, platesize:"smallplate"});
                  this.props.navigation.navigate('Plating', {prevScreen: "Platediv",size: "small", comps: 5});
                  Amplitude.logEvent('Chosen: Small Plate, 5 Components');
                }}>
                <Svg
                    width={130}
                    height={130}
                    viewBox={`-100 -100 200 200`}
                    style={styles.svgs}
                >
                  <Slice
                      style={ styles.chrtbig }
                      startAngle={data5[0].start}
                      endAngle={data5[0].end}
                      color={data5[0].color}
                      pressIt={false}
                  />
                  <Slice
                      style={ styles.chrtbig }
                      startAngle={data5[1].start}
                      endAngle={data5[1].end}
                      color={data5[1].color}
                      pressIt={false}
                  />
                  <Slice
                      style={ styles.chrtbig }
                      startAngle={data5[2].start}
                      endAngle={data5[2].end}
                      color={data5[2].color}
                      pressIt={false}
                  />
                  <Slice
                      style={ styles.chrtbig }
                      startAngle={data5[3].start}
                      endAngle={data5[3].end}
                      color={data5[3].color}
                      pressIt={false}
                  />
                  <Slice
                      style={ styles.chrtbig }
                      startAngle={data5[4].start}
                      endAngle={data5[4].end}
                      color={data5[4].color}
                      pressIt={false}
                  />
                  </Svg>
                </TouchableOpacity>
                <TouchableOpacity style={styles.chrtcont} onPress={()=>{
                  console.log('Updated Plate Type to big plate, 5 components');
                  this.setState({mainplate: this.pieData4, platesize:"bigplate"});
                  this.props.navigation.navigate('Plating', {prevScreen: "Platediv",size: "big", comps: 5});
                  Amplitude.logEvent('Chosen: Big Plate, 5 Components');
                }}>
                <Svg
                    width={190}
                    height={190}
                    viewBox={`-100 -100 200 200`}
                    style={styles.svgb}
                >
                  <Slice
                      style={ styles.chrtbig }
                      startAngle={data5[0].start}
                      endAngle={data5[0].end}
                      color={data5[0].color}
                      pressIt={false}
                  />
                  <Slice
                      style={ styles.chrtbig }
                      startAngle={data5[1].start}
                      endAngle={data5[1].end}
                      color={data5[1].color}
                      pressIt={false}
                  />
                  <Slice
                      style={ styles.chrtbig }
                      startAngle={data5[2].start}
                      endAngle={data5[2].end}
                      color={data5[2].color}
                      pressIt={false}
                  />
                  <Slice
                      style={ styles.chrtbig }
                      startAngle={data5[3].start}
                      endAngle={data5[3].end}
                      color={data5[3].color}
                      pressIt={false}
                  />
                  <Slice
                      style={ styles.chrtbig }
                      startAngle={data5[4].start}
                      endAngle={data5[4].end}
                      color={data5[4].color}
                      pressIt={false}
                  />
                  </Svg>
                </TouchableOpacity>
              </View>
              <Text style={styles.sectext}>5 Sections</Text>
              <View style={styles.hr}></View>
            </Content>
          </Container>
      );}
  }
