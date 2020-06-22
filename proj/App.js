import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, Button, KeyboardAvoidingView, TouchableOpacity } from 'react-native';
import { RadioButton, Paragraph } from 'react-native-paper';
import Draggable from 'react-native-draggable';
import { Provider } from 'react-redux';
import store from './src/store';
import Tela from './src/screens/PrimaryScreen';
import { createStackNavigator } from '@react-navigation/stack';
import Home from './HomeScreen';
import Result from './ResultScreen';
import { NavigationContainer } from '@react-navigation/native';

const Stack = createStackNavigator();

function MyStack() {
  return (
    <Stack.Navigator  headerMode="none">
      <Stack.Screen name="Principal" component={Home} />
      <Stack.Screen name="Resultados" component={Result} />
    </Stack.Navigator>
  );
}

 export default class App extends Component {

  render() {
    return (
      <NavigationContainer>
        <MyStack/>
      </NavigationContainer>
    );
  }
}