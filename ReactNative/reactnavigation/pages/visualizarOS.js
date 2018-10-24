
import React, { Component } from 'react';
import { View, AppRegistry, TextInput, Text,Icon, Button,TouchableOpacity,StyleSheet } from 'react-native';

export default class Cadastrar extends Component {
  constructor(props) {
    super(props);

    this.state = { 
       	names: [
			{
				id: 0,
				name: '43857 - RODRIGO FELIPE BORSATTI (CORTESIA) - (Videira) - SÃO CRISTOVÃO',
			},
			{
				id: 1,
				name: '43857 - RODRIGO FELIPE BORSATTI (CORTESIA) - (Videira) - SÃO CRISTOVÃO',
			},
			{
				id: 2,
				name: '43857 - EVERTON JOSÉ - (Videira) - SÃO CRISTOVÃO',
			},
			{
				id: 3,
				name: '43857 - ROBSON DE LIMA (CORTESIA) - (Videira) - SÃO CRISTOVÃO',
			}
		] };   
  }

 
    render() {
      const { navigate } = this.props.navigation;
      return (
        <View>
          {this.state.names.map((item, index) => (
            <TouchableOpacity
              key={item.id}
              style={styles.list}
              //onPress={() => Navigation.push('visualizarOS')}
              onPress={() => { navigate('index')} }
              //onPress={() => this._Press(item)}
              //onLongPress={() => this._LongPress(item)}
            >
              <View style={{ ...styles.flexLine, ...styles.padding }}>                
                <View style={styles.marginLeft}>
                  <Text style={{ ...styles.paddingRight }}>
                    {item.name}
                  </Text>
                  <View style={styles.flexLine}>
                    <Text style={styles.bold}>
                      Agendado:
                    </Text>
                    <Text> 16 de outubro às 16:00</Text>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      )
    }
}
const styles = StyleSheet.create({
container:{
    paddingHorizontal: 30,
     paddingVertical: 100,
     

},
  input: {
    height: 40, borderColor: 'gray', borderWidth: 1,
  }
  
})