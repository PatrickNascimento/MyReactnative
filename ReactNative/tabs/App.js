import Expo from 'expo';
import React,{ Component }  from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Container, Header, Content, Tab, Tabs } from 'native-base';
import Tab1 from './tabone';
import Tab2 from './tabone';
import Tab3 from './tabone';

export default class App extends Component {
 
  render() {
    return (
      <Container>
        <Header hasTabs />
        <Tabs>
          <Tab heading="Tab1">
            <Tab1 />
          </Tab>
          <Tab heading="Tab2">
            <Tab2 />
          </Tab>
          <Tab heading="Tab3">
            <Tab3 />
          </Tab>
        </Tabs>
      </Container>
    );
  }
}
