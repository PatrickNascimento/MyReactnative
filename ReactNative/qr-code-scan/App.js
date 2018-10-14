import React, { Component } from 'react';
import Scanner from './container/Scanner';
import DetailView from './container/DetailView';

import {
  createRouter,
  NavigationProvider,
  StackNavigation,
} from '@expo/ex-navigation';

const Router = createRouter(() => ({
  home: () => Scanner,
  detailview: () => DetailView
}));

export default class App extends Component {
  
  render() {
    return (
      <NavigationProvider router={Router}>
        <StackNavigation initialRoute={Router.getRoute('home')} />
      </NavigationProvider>
    );
  }
}