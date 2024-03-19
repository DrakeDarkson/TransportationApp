import React from 'react';
import { GoogleMap, DirectionsRenderer } from '@react-google-maps/api';

const MapComponent = ({ mapContainerStyle, center, zoom, response }) => {
  return (
    <div className="map">
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        center={center}
        zoom={zoom}
      >
        {response && (
          <DirectionsRenderer
            options={{
              directions: response
            }}
          />
        )}
      </GoogleMap>
    </div>
  );
};

export default MapComponent;
