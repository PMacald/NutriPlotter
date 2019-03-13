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
  BackHandler,
  NativeEventEmitter
} from 'react-native';
import * as React from 'react';
//import App from '../App.js';
import * as renderer from 'react-test-renderer';
import NavigationTestUtils from 'react-navigation/NavigationTestUtils';
import { FoodList } from '../components/main/FoodList'
import { FoodItem } from '../components/main/FoodItem'
import { Slice } from '../components/main/Slice'
import { GoalBars } from '../components/registration/GoalBars'
import { PopUpMenu } from '../components/main/PopUpMenu'
import { SwipeArrow } from '../components/registration/SwipeArrow'
import { RegistrationTextInput } from '../components/registration/TextInput'
import { RegistrationTextInputWithSwitch } from '../components/registration/TextInputWithSwitch'
import { Svg } from 'expo'

it('Food list test against snapshot', () => {
const tree = renderer.create(<FoodList></FoodList>).toJSON();
expect(tree).toMatchSnapshot();
});

it('FoodItem test against snapshot (using chicken)', () => {
const tree = renderer.create(<FoodItem name={'Chicken'} src={require('../assets/images/chicken.png')}/>).toJSON();
expect(tree).toMatchSnapshot();
});

it('SwipeArrow test against snapshot', () => {
const tree = renderer.create(<SwipeArrow imageSource={require('../screens/registration/src/arrows.png')}/>).toJSON();
expect(tree).toMatchSnapshot();
});


it('RegistrationTextInput test against snapshot', () => {
const tree = renderer.create(<RegistrationTextInput
  textPH = {"name"}
  updateState = {this.updateNameState}
  canUpdateState = {false}
/>).toJSON();
expect(tree).toMatchSnapshot();
});

it('RegistrationTextInputWithSwitch test against snapshot', () => {
const tree = renderer.create(<RegistrationTextInputWithSwitch
  textPH = {"Age"}
  handleOptionA = {this.handleOptionA}
  handleOptionB = {this.handleOptionB}
  styleSwitcher = {null}
  updateState = {this.updateAgeState}
  canUpdateState = {false}
/>).toJSON();
expect(tree).toMatchSnapshot();
});
