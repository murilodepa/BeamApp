import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, Button, KeyboardAvoidingView, TouchableOpacity } from 'react-native';
import { RadioButton, Paragraph } from 'react-native-paper';
import Draggable from 'react-native-draggable';
import { Provider } from 'react-redux';
import store from './src/store';
import Tela from './src/screens/PrimaryScreen'



export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <View  style={{flex:1}}>
          <Tela></Tela>
        </View>
      </Provider>
    );
  }
}