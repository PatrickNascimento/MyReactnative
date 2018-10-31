import React, { Component } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import {AppLoading, Font} from 'expo';

import 'react-native-console-time-polyfill';

export default class App extends Component {
  state = {
    loaded: false,
  }
  
  componentWillMount() {
    this._loadFontsAsync();
    console.log ('Carregando')
  }
  
  
  _loadFontsAsync = async () => {
    console.time('Carregando Fonts');
    await Font.loadAsync(
        {Phenomena: require('./assets/fonts/Phenomena-Regular.otf')}
    );            
    await Font.loadAsync(      
         {Lato: require('./assets/fonts/Lato-Semibold.ttf')}            
    );        
    await Font.loadAsync(      
      {Exo: require('./assets/fonts/Exo-Medium.ttf')}            
    );        
    await Font.loadAsync(      
      {Alcubierre: require('./assets/fonts/Alcubierre.otf')}            
    );        
    
    this.setState({loaded: true});
    console.timeEnd('Carregando Fonts');  }
  
  render() {
    if (! this.state.loaded) {
      console.log('Fonts não encontradas...');
      return <AppLoading/>
    } else {
      console.log('Fonte Carregada com sucesso');
    }
    
    return (
      <View style = {styles.container}>        
        <Text style = {styles.font1}>WELCOME TO WORLD!</Text>
        <Text style = {styles.font2}>WELCOME TO WORLD!</Text>
        <Text style = {styles.font3}>WELCOME TO WORLD!</Text>
        <Text style = {styles.font4}>WELCOME TO WORLD!</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#dfe6e9',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20
  },
  font1: {
    fontFamily:'Exo',
    fontSize: 20,
  },
  font2: {
    fontFamily:'Phenomena',
    fontSize: 20,
  },
  font3: {
    fontFamily:'Lato',
    fontSize: 20,
  },
  font4: {
    fontFamily:'Alcubierre',
    fontSize: 20,
  }

})

