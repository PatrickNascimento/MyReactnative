import React, { Component } from 'react';
import {View, StyleSheet, CheckBox, Text } from 'react-native';
import { Constants } from 'expo';
export default class App extends Component {
  constructor()
{
  super();
  this.state={
    check:true,
    check2:true
  }
}
  checkBoxChange()
  {
   this.setState({check:!this.state.check})   
   console.log('ch1 -> '+!this.state.check)
   console.log('ch2 -> '+this.state.check2)
  }
  checkBoxChange2()
  {
   this.setState({check2:!this.state.check2})   
   console.log('ch2 -> '+!this.state.check2)
   console.log('ch1 -> '+this.state.check)
  }

  render() {
    return (
      <View style={styles.container}>
      <Text>
      CheckBox
      </Text>
        <CheckBox value={this.state.check} 
        onChange={()=>this.checkBoxChange()}/>
        <CheckBox value={this.state.check2} 
        onChange={()=>this.checkBoxChange2()}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
  },
});
