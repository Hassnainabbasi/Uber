import React, { useEffect, useState } from "react";

export default function MapGeoLocation() {
  const [postion, setPosition] = useState({
    latitude: 0,
    longitude: 0,
  });

  useEffect(() => {
    const geo = navigator.geolocation;

    function onSuccess(position) {
      setPosition({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      });
    }

    function onError(error) {
      console.error("Error getting location: ", error);
    }

    const watch = geo.watchPosition(onSuccess, onError);
    return () => {
      geo.clearWatch(watch);
    };
  },[]);
  return postion
}
