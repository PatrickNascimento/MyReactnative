import React from 'react';
import { MapView } from 'expo';

export default class Mapa extends React.Component {
    static navigationOptions = {
    title: 'Mapa'
  };
  render() {
         const { navigate } = this.props.navigation;

    return (
      <MapView
        style={{ flex: 1 }}
        initialRegion={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      />
    );
  }
}