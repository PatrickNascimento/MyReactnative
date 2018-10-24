import React, { Component } from 'react';
import { Text, View, StyleSheet, WebView } from 'react-native';
import { Constants } from 'expo';



export default class Web extends Component {
  
  static navigationOptions = {
    title: 'Web'
  };
  
  render() {
     const { navigate } = this.props.navigation;
    return (
      
      <View style={styles.container}>
        <WebView
        source={{uri: 'https://www.google.com.br/'}}
        
      />
      </View>
       
    );
  }
}

const styles = StyleSheet.create({
  container: {
   flex: 1,
   
  },
  
});
