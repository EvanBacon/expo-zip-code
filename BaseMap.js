import React from 'react';
// import 
import { MapView } from 'expo';

export default ({ children, theme, mapRef, ...props }) => (
    <MapView
        ref={mapRef}
        {...props}
    >
        <MapView.UrlTile
            /**
            * The url template of the tile server. The patterns {x} {y} {z} will be replaced at runtime
            * For example, http://c.tile.openstreetmap.org/{z}/{x}/{y}.png
            */
            urlTemplate={`http://10.basemaps.cartocdn.com/${theme}_all/{z}/{x}/{y}.png`}
        />
        {children}
    </MapView>
)