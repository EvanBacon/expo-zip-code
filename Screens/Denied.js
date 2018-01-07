import React, { Component } from 'react';
import { View, Button, StyleSheet } from 'react-native';
import { Constants } from 'expo';
import { Card } from 'react-native-elements'; // 0.17.0

import openSetting from '../openSettings';


/*
   This is an example of what we might display when the user has denied the permission. 
   If your app needs the permission then we should prevent the user from using the appexperience until we get it.
   In iOS (and maybe Android) when the user has denied a permission you cannot ask again.
   The best thing we can do is tell them why we need the permission then instruct them how to turn it on in the settings.
   Then we can have a button that links the user to the Settings -> App, using a cool Linking trick `app-settings:`!
*/
export default class App extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Card title="Denied">
          <Button
            onPress={openSetting}
            title="Go to settings to enable permissions"
          />
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
