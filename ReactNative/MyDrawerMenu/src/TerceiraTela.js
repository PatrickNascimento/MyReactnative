import React, {Component} from 'react';
import {Text, View, Button} from 'react-native';

export default class TerceiraTela extends Component{
constructor(props){
  super(props);
  this.state = {}
}

render(){
  return(
  <View style={{flex:1,marginTop:25}}>
  <Text>Ola sou a Terceira tela</Text>
  <Button title="Abrir Menu" onPress={() =>this.props.navigation.navigate('DrawerToggle')} />
  </View>  
  );
}
}