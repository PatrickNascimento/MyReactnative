/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';
import Timeline from 'react-native-timeline-listview'

export default class Example extends Component {
  constructor(){
    super()
    this.onEventPress = this.onEventPress.bind(this)
    this.renderSelected = this.renderSelected.bind(this)
    this.data = [
      {time: '07:00', title: 'Inicio do Trabalho', description: 'Inicio das atividades diárias, trabalhando diretamente com ReactNative, NodeJS, GraphQL. Aplicando estilização a todo o projeto',lineColor:'#009688', icon: require('./img/archery.png')},
      {time: '11:30', title: 'Jogar', description: 'Reservo está meia hora para jogar meus games.', icon: require('./img/badminton.png')},
      {time: '12:00', title: 'Almoço', icon: require('./img/lunch.png')},
      {time: '13:30', title: 'Segundo Tempo', description: 'Hora de pegar firme no segundo do tempo da jornada de trabalho',lineColor:'#009688', icon: require('./img/soccer.png')},
      {time: '16:30', title: 'Treino', description: 'Hota de praticar os treinos diários, corrida e muito peso', icon: require('./img/dumbbell.png')}
    ]
    this.state = {selected: null}
  } 

  onEventPress(data){
    this.setState({selected: data})
  }

  renderSelected(){
      if(this.state.selected)
        return <Text style={{marginTop:10}}>Selected event: {this.state.selected.title} at {this.state.selected.time}</Text>
  }

  render() {
    return (
      <View style={styles.container}>
        {this.renderSelected()}
        <Timeline 
          style={styles.list}
          data={this.data}
          circleSize={20}
          circleColor='rgba(0,0,0,0)'
          lineColor='rgb(45,156,219)'
          timeContainerStyle={{minWidth:52, marginTop: -5}}
          timeStyle={{textAlign: 'center', backgroundColor:'#ff9797', color:'white', padding:5, borderRadius:13}}
          descriptionStyle={{color:'gray'}}
          options={{
            style:{paddingTop:5}
          }}
          innerCircle={'icon'}
          onEventPress={this.onEventPress}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
	paddingTop:65,
    backgroundColor:'white'
  },
  list: {
    flex: 1,
    marginTop:20,
  },
});
