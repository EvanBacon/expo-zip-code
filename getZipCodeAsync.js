import Secret from './Secret';

/*
  Secret.js

  export default "API_KEY";
*/

const key = 'debug'; // Get a Google Maps API Key

import Geocoder from 'react-native-geocoding'; // 0.2.0

Geocoder.setApiKey(key); // use a valid API key

async function getZipCodeAsync({ latitude, longitude }) {
  const findZipcode = a => {
    for (let item of a) {
      const { types } = item;
      for (let type of types) {
        if (type === 'postal_code') {
          return item.long_name;
        }
      }
    }
  };

  if (key === 'debug') {
    return '78701'; /// this is Austin, Texas
  }

  return new Promise((res, rej) =>
    Geocoder.getFromLatLng(latitude, longitude).then(({ results }) => {
      const { address_components } = results[0];
      const zipcode = findZipcode(address_components);
      res(zipcode);
    }, rej)
  );
}

export default getZipCodeAsync;
