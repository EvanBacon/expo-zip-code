import React from 'react';
import { connect } from 'react-redux'; // 5.0.6
import 'redux'; // 3.7.2
import { dispatch } from '@rematch/core'; // 0.1.0-beta.8

import Denied from './Screens/Denied';
import Granted from './Screens/Granted';
import Undetermined from './Screens/Undetermined';


/*
This is just a switch statement for our permission. 
Here is where we show different screens for each case.
*/
class Main extends React.Component {
  componentWillMount() {
    /*
    Here is where we will get the permission for the first time. 
    We do this in `componentWillMount` so that we get the results ASAP!
    */
    this.props.getAsync();
  }
  
  render() {
    switch (this.props.permission) {
      case 'granted':
        return <Granted />;
      case 'undetermined':
        return <Undetermined />;
      case 'denied':
        return <Denied />;
      default:
        /* This is what will show while we load the initial permission - this is very fast */
        return null;
    }
  }
}

// Use react-redux's connect
export default connect(({ locationPermission: permission }) => ({
  permission,
  getAsync: dispatch.locationPermission.getAsync
}))(Main);
