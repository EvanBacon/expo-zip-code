///// from here https://www.npmjs.com/package/react-native-geojson but proptypes is broken so im boojie coding it 
import React, { Component } from 'react';
import { View } from 'react-native';
import { MapView } from 'expo'; // 0.19.0
import uuid from 'uuid'; // 3.1.0

import PropTypes from "prop-types"; // 15.6.0

export const makeOverlays = features => {
  const points = features
    .filter(f => f.geometry && (f.geometry.type === 'Point' || f.geometry.type === 'MultiPoint'))
    .map(feature => makeCoordinates(feature).map(coordinates => makeOverlay(coordinates, feature)))
    .reduce(flatten, [])
    .map(overlay => ({ ...overlay, type: 'point' }));

  const lines = features
    .filter(
      f => f.geometry && (f.geometry.type === 'LineString' || f.geometry.type === 'MultiLineString')
    )
    .map(feature => makeCoordinates(feature).map(coordinates => makeOverlay(coordinates, feature)))
    .reduce(flatten, [])
    .map(overlay => ({ ...overlay, type: 'polyline' }));

  const multipolygons = features
    .filter(f => f.geometry && f.geometry.type === 'MultiPolygon')
    .map(feature => makeCoordinates(feature).map(coordinates => makeOverlay(coordinates, feature)))
    .reduce(flatten, []);

  const polygons = features
    .filter(f => f.geometry && f.geometry.type === 'Polygon')
    .map(feature => makeOverlay(makeCoordinates(feature), feature))
    .reduce(flatten, [])
    .concat(multipolygons)
    .map(overlay => ({ ...overlay, type: 'polygon' }));

  return points.concat(lines).concat(polygons);
};

const flatten = (prev, curr) => prev.concat(curr);

const makeOverlay = (coordinates, feature) => {
  let overlay = {
    feature,
    id: feature.id ? feature.id : uuid(),
  };
  if (feature.geometry.type === 'Polygon' || feature.geometry.type === 'MultiPolygon') {
    overlay.coordinates = coordinates[0];
    if (coordinates.length > 1) {
      overlay.holes = coordinates.slice(1);
    }
  } else {
    overlay.coordinates = coordinates;
  }
  return overlay;
};

const makePoint = c => ({ latitude: c[1], longitude: c[0] });

const makeLine = l => l.map(makePoint);

const makeCoordinates = feature => {
  const g = feature.geometry;
  if (g.type === 'Point') {
    return [makePoint(g.coordinates)];
  } else if (g.type === 'MultiPoint') {
    return g.coordinates.map(makePoint);
  } else if (g.type === 'LineString') {
    return [makeLine(g.coordinates)];
  } else if (g.type === 'MultiLineString') {
    return g.coordinates.map(makfeatureeLine);
  } else if (g.type === 'Polygon') {
    return g.coordinates.map(makeLine);
  } else if (g.type === 'MultiPolygon') {
    return g.coordinates.map(p => p.map(makeLine));
  } else {
    return [];
  }
};

const Geojson = props => {
  const overlays = makeOverlays(props.geojson.features);
  
  let coords = [];
  
  for (let overlay of overlays) {
    coords = coords.concat(overlay.coordinates)
  }
  props.onCoords(coords)
  return (
    <View>
      {overlays.map(overlay => {
        if (overlay.type === 'point') {
          console.log('overlay', overlay);
          return (
            <MapView.Marker
              key={props.theme + overlay.id}
              coordinate={overlay.coordinates}
              pinColor={props.color}
            />
          );
        }
        if (overlay.type === 'polygon') {
          return (
            <MapView.Polygon
              key={props.theme + overlay.id}
              coordinates={overlay.coordinates}
              holes={overlay.holes}
              strokeColor={props.strokeColor}
              fillColor={props.fillColor}
              strokeWidth={props.strokeWidth}
            />
          );
        }
        if (overlay.type === 'polyline') {
          return (
            <MapView.Polyline
              key={props.theme + overlay.id}
              coordinates={overlay.coordinates}
              strokeColor={props.strokeColor}
              strokeWidth={props.strokeWidth}
            />
          );
        }
      })}
    </View>
  );
};

export default Geojson;
