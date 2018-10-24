import React, { Component } from 'react';
import { View, AppRegistry, TextInput, Text, Button, StyleSheet } from 'react-native';

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = { text: '' };
    this.state = { pass: ''};
  }

  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style= {styles.container}>       
  
      
      <Button
      onPress={() => { navigate('visualizarOS')} }
      title="VisualizarOS"
      />

      <Button
      onPress={() => { navigate('index')} }
      title="Index"      
      />    
      
      </View>
    );
  }
}

const styles = StyleSheet.create({
container:{
    paddingHorizontal: 30,
     paddingVertical: 100,
     

}
  
})
  



