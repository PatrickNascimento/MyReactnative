import {DrawerNavigator} from 'react-navigation'; // 1.0.3
import React, {Component} from 'react'
import { Button, Image, View, Text } from 'react-native';

import PrimeiraTela from './src/PrimeiraTela';
import SegundaTela from './src/SegundaTela';
import TerceiraTela from './src/TerceiraTela';

class App extends Component{
 render(){
   return(
      <Navegador />
   );
 } 
}

class LogoTitle extends React.Component {
  render() {
    return (
    <Text>123</Text>
    );
  }
}


const Navegador = DrawerNavigator(
{
  Home:{screen:PrimeiraTela },
  Test:{screen:SegundaTela},
  Terceira:{screen:TerceiraTela}
}, {
  drawerPosition:'left',
  drawerWidth:200,
  drawerBackgroundColor:'#333333',
  contentOptions:{
    activeTintColor:'#ffffff',
    inactiveTintColor:'#000000',
    activeBackgroundColor:'#ff5500',
    inactiveBackgroundColor:'#ffffff',
    itemsContainerStyle:{
     marginTop:20 
    },
    itemStyle:{
      marginTop:10
    },
    labelStyle:{
      fontSize:16
    },
    iconContainerStyle:{
      backgroundColor:"#000000"
    }
  }
});

export default App;
