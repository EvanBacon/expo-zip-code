import { Linking } from 'react-native';
export default () => {
  Linking.canOpenURL('app-settings:')
    .then(supported => {
      if (!supported) {
        console.warn("Can't handle settings url");
      } else {
        return Linking.openURL('app-settings:');
      }
    })
    .catch(err => console.error('An error occurred', err));
};
