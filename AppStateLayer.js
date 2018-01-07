import React from 'react';
import { View, AppState } from 'react-native';
import { dispatch } from '@rematch/core'; // 0.1.0-beta.8
import { connect } from 'react-redux'; // 5.0.6
import 'redux'; // 3.7.2

class AppStateLayer extends React.Component {
  
  /*
    The only way a user can change the permissions is to leave the app and go to settings. 
    So we don't need to subscribe to permission changes if we just check the AppState!
    
    When this component mounts we want to subscribe to AppState events:
    - When the user leaves the experience
    - Opens the App switcher
    - Opens a notification
    - Turns the phone off
    - Other events that make you leave the app :-}
  */
  componentDidMount() {
    AppState.addEventListener('change', this.handleAppStateChangeAsync);
  }

  /*
    Do some clean up!
  */
  componentWillUnmount() {
    AppState.removeEventListener('change', this.handleAppStateChangeAsync);
  }
  
  /*
  This calls our nifty redux method which will check the permission for us
  */
  handleAppStateChangeAsync = async () => this.props.getAsync();

  /*
    So we really just want the `componentDidMount` & `componentWillUnmount` so lets just pass all the props back to the child...
  */
  render() {
    const { children } = this.props;
    return children
  }
}

/*
  Let's connect our rematch effect
*/
export default connect(() => ({
  getAsync: dispatch.locationPermission.getAsync,
}))(AppStateLayer);
