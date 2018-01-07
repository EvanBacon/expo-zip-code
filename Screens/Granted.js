import React, { Component } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { Constants } from 'expo';

// or any pure javascript modules available in npm
import { Card } from 'react-native-elements'; // 0.17.0

import ZipCodeMap from '../ZipCodeMap';
import resizeImageAsync from '../resizeImageAsync';

/*
  Yay everything worked out, we have the users location, we can now start showing: `Charlie Cheever fans in your area`!
  Now the user could always go back and turn off the permissions... D: 
  But because of how we setup our redux we can be prepared for that!! :D
*/
export default class App extends Component {
  componentDidMount() {}

  render() {
    // const { location } = this.state;
    // if (!location) {
    //   return null;
    // }
    // const {latitude, longitude} = location.coords;
    return <ZipCodeMap />;
  }
}
