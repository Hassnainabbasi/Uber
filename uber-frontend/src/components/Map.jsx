import React, { useEffect, useRef } from "react";
import L from "leaflet";
import MapLocalStorage from "./MapLocalStorage";
import MapGeoLocation from "./MapGeoLocation";
import GpsFixedIcon from "@mui/icons-material/GpsFixed";

export const Map = () => {
  const mapRef = useRef(null);
  const userMarkerRef = useRef(null);

  const [userPosition, setUserPosition] = MapLocalStorage("USER_MAKER", {
    latitude: 0,
    longitude: 0,
  });

  const [nearbyMarkers, setNearbyMarkers] = MapLocalStorage(
    "NEARBY_MARKERS",
    []
  );

  const location = MapGeoLocation();

  function addRemovableMarker(map, lat, lng) {
    const marker = L.marker([lat, lng]).addTo(map);
    marker.on("click", () => {
      map.removeLayer(marker);
      setNearbyMarkers((prev) =>
        prev.filter((p) => !(p.latitude === lat && p.longitude === lng))
      );
    });
  }

  function removeMarkerAt(map, lat, lng) {
    map.eachLayer((layer) => {
      if (layer instanceof L.Marker) {
        const pos = layer.getLatLng();
        if (pos.lat === lat && pos.lng === lng) map.removeLayer(layer);
      }
    });
  }

  useEffect(() => {
    const map = L.map("map", {
      scrollWheelZoom: true, 
      dragging: true, 
    }).setView(
      [userPosition.latitude || 24.8607, userPosition.longitude || 67.0011],
      13
    );

    L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    }).addTo(map);

    nearbyMarkers.forEach(({ latitude, longitude }) =>
      addRemovableMarker(map, latitude, longitude)
    );

    map.on("click", (e) => {
      const { lat, lng } = e.latlng;

      const index = nearbyMarkers.findIndex(
        (m) => m.latitude === lat && m.longitude === lng
      );

      if (index !== -1) {
        removeMarkerAt(map, lat, lng);
        const updated = [...nearbyMarkers.slice(0, index), ...nearbyMarkers.slice(index + 1)];
        setNearbyMarkers(updated);
      } else {
        addRemovableMarker(map, lat, lng);
        setNearbyMarkers([...nearbyMarkers, { latitude: lat, longitude: lng }]);
      }
    });

    mapRef.current = map;
    return () => map.remove();
  }, []);


  useEffect(() => {
    if (!mapRef.current || !location.latitude || !location.longitude) return;
    const redDot = L.divIcon({
      className: "",
      html: `<div class="w-5 h-5 bg-red-600 rounded-full border-2 border-white shadow-md"></div>`,
      iconSize: [20, 20],
      iconAnchor: [10, 10],
    });
    if (userMarkerRef.current) {
      userMarkerRef.current.setLatLng([location.latitude, location.longitude]);
    } else {
      userMarkerRef.current = L.marker(
        [location.latitude, location.longitude],
        {
          icon: redDot,
        }
      )
        .addTo(mapRef.current)
        .bindPopup("You are here")
        .openPopup();
      
    }
    mapRef.current.setView([location.latitude, location.longitude], 15);
    setUserPosition({
      latitude: location.latitude,
      longitude: location.longitude,
    });
  }, [location, setUserPosition]);
  return (
    <>
      <div id="map" className="absolute inset-0 z-0" />
      <button
        className="absolute bottom-5 right-5 z-10 bg-white rounded-full p-3 shadow-lg hover:bg-gray-100 transition"
        onClick={() => {
          if (
            mapRef.current &&
            location.latitude !== 0 &&
            location.longitude !== 0
          ) {
            mapRef.current.setView([location.latitude, location.longitude], 15);
            if (userMarkerRef.current) {
              userMarkerRef.current.openPopup();
            }
          }
        }}
      >
        <GpsFixedIcon className="w-6 h-6 text-blue-500" />
      </button>
    </>
  );  
};
