import React, { useEffect, useState } from "react";
import { Loader } from "@googlemaps/js-api-loader";
import { recenterMap } from "../../utils/centerMap";

const GoogleMap = ({ locations }) => {
  const [markers, setMarkers] = useState([]);
  const [infoWindows, setInfoWindows] = useState([]);

  useEffect(() => {
    if (!locations || locations.length === 0) {
      return;
    }

    const loader = new Loader({
      apiKey: 'AIzaSyC1jbQOJoSOWU-vTp1-JV-ugTHcK6i99WI',
      version: "weekly",
    });

    loader.load().then(async () => {
      const { Map } = await google.maps.importLibrary("maps");

      const map = new Map(document.getElementById("map"), {
        center: { lat: 37.7749, lng: -122.4194 }, // Default center coordinates (San Francisco)
        zoom: 12,
      });

      const customMarkerIcon = {
        url: "https://icons8.com/icon/12869/hamburger",
        scaledSize: new google.maps.Size(40, 40),
      };

      const newMarkers = locations.map((location) => {
        const marker = new google.maps.Marker({
          position: { lat: location.coordinates.latitude, lng: location.coordinates.longitude },
          map,
          title: location.name,
          // TODO : custom icon based on cuisine type of restaurant.
          // icon: customMarkerIcon, 
        });

        const infoWindow = new google.maps.InfoWindow({
          content: `<div><h3>${location.name}</h3><div class="map_hover"}><h5>Rating ${location.rating}</h5><h5>Price ${location.price}</h5></div></div>`,
        });

        marker.addListener("mouseover", () => {
          infoWindow.open(map, marker);
        });

        marker.addListener("mouseout", () => {
          infoWindow.close();
        });

        marker.addListener("click", () => {
            window.open(location.url, "_blank") //to open new page
        })

        return marker;
      });

      setMarkers(newMarkers);
      recenterMap(map, newMarkers);
    });
  }, [locations]);

  return (
    <div>
      <div id="map" style={{ height: "400px" }}></div>
    </div>
  );
};

export default GoogleMap;
