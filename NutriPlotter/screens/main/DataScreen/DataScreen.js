//---------------------BASIC IMPORTS-----------------
import React from 'react';
// react native:
import {
  Text,
  View,
  Image,
  TouchableOpacity
} from 'react-native';
import { Container, Header, Left, Body, Right,Button, Title, Content } from 'native-base';

//stylesheets
import styles from './styles';

import {Svg} from 'expo';
import {Slice} from '../../../components/main/Slice';

export default class DataScreen extends React.Component {





  render() {
    const back = this.props.navigation.goBack;

    const data = [ 50, 10, 40, 95, -4, -24, 85, 91, 35, 53, -53, 24, 50, -20, -80 ]
    const data3 = [ 33, 33, 33]
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

    const pieData3 = data3
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
            <Svg
                    width={160}
                    style={styles.pieSVG}
                    height={160}
                    viewBox={`-100 -100 200 200`}
                >
              <Slice
                  index={0}
                  startAngle={0}
                  endAngle={Math.PI}
                  color={'#0d2f51'}
                  key={'pie_shape_0'}
              />
              <Slice
                  index={1}
                  startAngle={Math.PI}
                  endAngle={2*Math.PI}
                  color={'#28BD8B'}
                  key={'pie_shape_1'}
              />
          </Svg>
          
            {/**Pie chart comes here */}
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
