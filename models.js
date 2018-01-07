import { dispatch } from '@rematch/core'; // 0.1.0-beta.8
import Expo from 'expo';
import { AppState } from 'react-native';


/*
  This is a basic rematch structure that manages the single permission. 
  We wrap our calls just in case we need to do anything else on a global level.
*/
export const locationPermission = {
  state: null,
  reducers: {
    update: (state, payload) => payload,
  },
  effects: {
    getAsync: async () => {
      const { status } = await Expo.Permissions.getAsync(
        Expo.Permissions.LOCATION
      );
      dispatch.locationPermission.update(status);
    },
    askAsync: async () => {
      const { status } = await Expo.Permissions.askAsync(
        Expo.Permissions.LOCATION
      );
      dispatch.locationPermission.update(status);
    },
  },
};


/*
  Let's manage our `AppState` as well. When we update the `AppState` we will also update our `locationPermission`! 
  Pretty cool right :D
*/
export const appState = {
  state: AppState.currentState,
  reducers: {
    update: (state, payload) => {
      if (state.match(/inactive|background/) && payload === 'active') {
        console.log('App has come to the foreground!');
        dispatch.locationPermission.getAsync();
      } else {
        console.log('App has left foreground :/');
      }
      return payload;
    },
  },
  effects: {},
};
