//---------------------BASIC IMPORTS-----------------
import React from 'react';
// react native:
import {
  Text,
  View,
  Button,
  Image
} from 'react-native';
import SlidingUpPanel from 'rn-sliding-up-panel';
//components creted by us:
import {FoodList} from '../../../components/main/FoodList';
import {PopUpMenu} from '../../../components/main/PopUpMenu';
//stylesheets
import styles from './styles';

import { PieChart } from 'react-native-svg-charts'


export default class PlatingScreen extends React.Component {





  render() {
    const data = [ 50, 10, 40, 95, -4, -24, 85, 91, 35, 53, -53, 24, 50, -20, -80 ]

    const randomColor = () => ('#' + (Math.random() * 0xFFFFFF << 0).toString(16) + '000000').slice(0, 7)

    const pieData = data
        .filter(value => value > 0)
        .map((value, index) => ({
            value,
            svg: {
                fill: randomColor(),
                onPress: () => console.log('press', index),
            },
            key: `pie-${index}`,
        }))


      return (
        <View style={styles.maincontainer}>
        <View style={styles.conttop}>
          <View style = {styles.menucontainer}>
             <PopUpMenu/>
           </View>

           <View style = {styles.cupholder}>
              <Image
                style={styles.cup}
                source={require('./src/cup.png')}/>
            </View>
          </View>



         <PieChart
                style={ { height: 350, marginTop: 100 } }
                data={ pieData }
            />


        <SlidingUpPanel
          visible={true}
          draggableRange={{top: 700, bottom: 50}}
          startCollapsed
          >
          <View style={styles.container}>
            <View
              style={styles.top}
              >
              <View style={styles.left}>
                <Image
                  source={require('./src/plate.png')}
                  style={styles.img}
                  resizeMode="contain"
                />
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
                <Image
                  source={require('./src/chart.png')}
                  style={styles.img}
                  resizeMode="contain"
                />
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
