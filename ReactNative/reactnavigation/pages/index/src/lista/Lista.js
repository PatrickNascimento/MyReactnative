import React from 'react';
import Expo, { SQLite } from 'expo';
import { StyleSheet, Text, View, SectionList,FlatList,TouchableOpacity } from 'react-native';
const datasource = [
  {key:'1',name:'Patrick Souza do Nascimento'},
  {key:'2',name:'Mark Zuckerberg'},
  {key:'3',name:'William Henry Gates III'},
  {key:'4',name:'Senor Abravanel'}
  ]

export default class App extends React.Component {

 renderItem = (source) => {
    return(    

       <TouchableOpacity onPress={this._onPress}>
        <View>
          <Text>
            {source.item.key+' - '}{source.item.name}
          </Text>
        </View>
      </TouchableOpacity>
    )
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>FlatList</Text>
        <FlatList
            data={datasource}
            renderItem={this.renderItem}
            />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text:{
  fontSize: 18,
  color:  'rgba(0,0,0,.5)'
  }
});
