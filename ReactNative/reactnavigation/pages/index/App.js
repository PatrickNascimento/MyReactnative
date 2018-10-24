import { TabNavigator, StackNavigator } from 'react-navigation'; 
import React from 'react';

import Web from './src/web/Web';
import Lista from './src/lista/Lista';
import Mapa from './src/mapa/Mapa';


export default TabNavigator(  

  {
  Lista: {screen: Lista},
  Web: {screen: Web},
  Mapa: {screen: Mapa},
  
  },
  {
    initialRouteName: 'Lista',
    tabBarOptions : {
      style: {
        
        backgroundColor: 'lightblue',
      },
      activeTintColor: 'crimson',
      inactiveTintColor: 'blue',
      activeBackgroundColot:'blue',
      //showIcon: true
    },
    tabBarPosition:'bottom'
    
  }

)



