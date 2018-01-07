import React from 'react';
import { Provider } from 'react-redux'; // 5.0.6
import { init } from '@rematch/core'; // 0.1.0-beta.8
import AppStateLayer from './AppStateLayer';
import Main from './Main';

import * as models from './models';

import '@expo/vector-icons'; // 6.2.1
import 'redux'; // 3.7.2

const store = init({
  models,
});

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}><AppStateLayer><Main /></AppStateLayer></Provider>
    );
  }
}
