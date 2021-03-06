import Expo from 'expo';

async function watchLocationAsync(callback) {
  const { Location, Permissions } = Expo;

  /*
    You never know what could happen so it's always best to check the permission first... 
    In our case we would already have handled this and we would be showing a helpful screen!  
    But say we use this function in the wrong place, we would throw an error that would help us in development.
  */
  const { status } = await Permissions.askAsync(Permissions.LOCATION);
  if (status === 'granted') {
    Location.watchPositionAsync({ enableHighAccuracy: false, timeInterval: 50000, distanceInterval: 50 }, callback);
  } else {
    throw new Error('Location permission not granted');
  }
}
export default watchLocationAsync;
