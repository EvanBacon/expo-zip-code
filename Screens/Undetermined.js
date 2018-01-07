import React, { Component } from 'react';
import { View, Button, StyleSheet } from 'react-native';
import { Constants } from 'expo';
import { dispatch } from '@rematch/core'; // 0.1.0-beta.8
import { connect } from 'react-redux'; // 5.0.6
import { Card } from 'react-native-elements'; // 0.17.0

import 'redux'; // 3.7.2
import '@expo/vector-icons'; // 6.2.1


/*
  This is the initial state - the user hasn't indicated if they trust us or not.
  Nowadays it's really cool to explain in a nice pretty way (with pazazz), why we need a permission.
  Then after we've dazzled them, we show the standard alert...
*/
class Undetermined extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Card title="I WANT TO KNOW WHERE YOU ARE 😈">
          <Button onPress={this.props.askAsync} title="Please 🙏" />
        </Card>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
  },
});

export default connect(() => ({
  askAsync: dispatch.locationPermission.askAsync,
}))(Undetermined);
