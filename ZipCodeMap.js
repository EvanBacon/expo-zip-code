import React, { Component } from 'react';
import { MapView } from 'expo';
import resizeImageAsync from './resizeImageAsync';
import { Text, TouchableOpacity, View } from 'react-native';
// You can import from local files

// or any pure javascript modules available in npm

import testZip from './testZip';
import getGeoForZipAsync from './getGeoForZipAsync';
import getZipCodeAsync from './getZipCodeAsync';
import Geojson from './GeoJSON';
import BaseMap from './BaseMap';
import watchLocationAsync from './watchLocationAsync';

import { FontAwesome } from '@expo/vector-icons'; // 6.2.0

const ThemeButton = ({ theme, onPress, style }) => (
  <TouchableOpacity
    onPress={onPress}
    style={[{ backgroundColor: 'transparent' }, style]}
  >
    <View
      style={{
        backgroundColor: theme === 'dark' ? 'white' : 'black',
        width: 48,
        aspectRatio: 1,
        borderRadius: 24,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <FontAwesome
        color={theme === 'dark' ? 'black' : 'white'}
        size={24}
        name={theme === 'dark' ? 'sun-o' : 'moon-o'}
      />
    </View>
  </TouchableOpacity>
);

export default class App extends Component {
  state = {
    theme: 'dark',
    location: { latitude: 37.459091, longitude: -122.132095 },
    // zipcode: '94303',
    // json: testZip,
    image: require('./assets/expo.png'),
  };
  async componentWillMount() {
    watchLocationAsync(async ({ coords: location }) => {
      const zipcode = await getZipCodeAsync(location);
      const json = await getGeoForZipAsync(zipcode);
      console.log(zipcode, json);
      this.setState({ location, zipcode, json });
    });
    // const json = await getGeoForZipAsync('90210');
    // this.setState({json})
  }

  coords = [];

  fit = () => {
    if (!this.map || !this.coords) return;
    const padding = 10;
    this.map.fitToCoordinates(this.coords, {
      edgePadding: {
        top: padding,
        right: padding,
        bottom: padding,
        left: padding,
      },
      animated: false,
    });
  };

  // <Image source={this.state.image} />
  renderLocation = ({ latitude, longitude }) => (
    <MapView.Marker coordinate={{ latitude, longitude }}>
      <View
        style={{
          width: 36,
          borderRadius: 36 / 2,
          backgroundColor: '#4039E2',
          justifyContent: 'center',
          alignItems: 'center',
          aspectRatio: 1,
        }}
      >
        <Text
          style={{
            backgroundColor: 'transparent',
            textAlign: 'center',
            color: 'white',
          }}
        >
          You
        </Text>
      </View>
    </MapView.Marker>
  );

  renderPoly = () => (
    <Geojson
      color={'#4039E2'}
      onCoords={coords => {
        this.coords = coords;
        this.fit();
      }}
      theme={this.state.theme}
      geojson={this.state.json}
      strokeColor={'#4039E2'}
      fillColor={'rgba(64,57,226, 0.1)'}
    />
  );

  render() {
    if (!this.state.image) {
      return null;
    }
    return (
      <View style={{ flex: 1 }}>
        <BaseMap
          theme={this.state.theme}
          mapRef={ref => (this.map = ref)}
          style={{ flex: 1 }}
        >
          {this.state.json && this.renderPoly()}

          {this.renderLocation(this.state.location)}
        </BaseMap>

        <View
          style={{
            position: 'absolute',
            bottom: 16,
            left: 16,
            right: 16,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <View
            onPress={() => this.fit()}
            style={{
              paddingHorizontal: 24,
              height: 36,
              borderRadius: 36 / 2,
              backgroundColor: 'rgba(255,255,255,0.8)',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Text
              style={{
                textAlign: 'center',
                color: 'black',
                fontSize: 24,
                backgroundColor: 'transparent',
              }}
            >
              {this.state.zipcode}
            </Text>
          </View>
        </View>

        {false && (
          <ThemeButton
            theme={this.state.theme}
            onPress={() =>
              this.setState({
                theme: this.state.theme === 'dark' ? 'light' : 'dark',
              })
            }
            style={{ position: 'absolute', bottom: 16, left: 16 }}
          />
        )}
      </View>
    );
  }
}
