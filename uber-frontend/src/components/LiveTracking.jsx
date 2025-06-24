import React, { useEffect, useState } from 'react';
import { LoadScript, GoogleMap, Marker } from '@react-google-maps/api';
import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

const containerStyle = {
  width: '100%',
  height: '400px',
};

export const LiveTracking = () => {
  const [position, setPosition] = useState({ lat: 28.6139, lng: 77.209 }); // Default to Delhi
  const [error, setError] = useState(null);

  useEffect(() => {
    let watchId;
    if (navigator.geolocation) {
      watchId = navigator.geolocation.watchPosition(
        (pos) => {
          setPosition({
            lat: pos.coords.latitude,
            lng: pos.coords.longitude,
          });
        },
        (err) => {
          setError('Unable to retrieve your location');
        },
        { enableHighAccuracy: true, maximumAge: 0, timeout: 10000 }
      );
    } else {
      setError('Geolocation is not supported by this browser.');
    }
    return () => {
      if (navigator.geolocation && watchId) {
        navigator.geolocation.clearWatch(watchId);
      }
    };
  }, []);

  return (
    <div>
      <h2>Live Tracking</h2>
      {error && <div style={{ color: "red" }}>{error}</div>}
      <LoadScript
        googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY || ""}
      >
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={position}
          zoom={16}
        >
          <Marker position={position} />
        </GoogleMap>
      </LoadScript>
    </div>
  );
};