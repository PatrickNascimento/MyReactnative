import React, {Component} from 'react';
import {Text, View, Button} from 'react-native';

export default class PrimeiraTela extends Component{
constructor(props){
  super(props);
  this.state = {}
}


render(){
  return(
  <View style={{ flex: 1, alignItems: 'left', justifyContent: 'left' }}>
  <Text>Tela Inicial</Text>
  <Button title="..." onPress={() =>this.props.navigation.navigate('DrawerToggle')} />
  </View>  
  );
}

}